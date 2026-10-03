import "server-only";
import { Code, ConnectError, type ConnectRouter, type HandlerContext } from "@connectrpc/connect";
import { EngagementType, InquiryService, type SubmitInquiryRequest } from "@/gen/delta/v1/inquiry_pb";
import { engagementOptions, validateInquiry } from "@/lib/inquiry-schema";

/**
 * InquiryService implementation.
 *
 * Abuse controls: honeypot field, per-IP fixed-window rate limit and
 * idempotency-key de-duplication. The limiter and idempotency cache are
 * in-memory, so they are per server instance; on multi-instance hosting move
 * them to a shared store (see docs/architecture.md).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();
const seen = new Map<string, { reference: string; at: number }>();

function rateLimited(ip: string, now = Date.now()) {
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function sweep(now = Date.now()) {
  if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
  if (seen.size > 5000) for (const [k, v] of seen) if (now - v.at > 24 * 3600 * 1000) seen.delete(k);
}

function clientIp(ctx: HandlerContext) {
  return (
    ctx.requestHeader.get("x-real-ip") ??
    ctx.requestHeader.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function newReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return "DAI-" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Inquiry = { name: string; email: string; company: string; engagement: number; message: string };

export type Deliver = (inquiry: Inquiry, reference: string) => Promise<void>;

/** Email delivery through Resend's HTTP API when configured. */
export const deliverInquiry: Deliver = async (inq, reference) => {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const label = engagementOptions.find((o) => o.value === inq.engagement)?.label ?? "Unspecified";

  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== "production" || process.env.INQUIRY_DELIVERY === "log") {
      console.info("[inquiry] delivery not configured; logged only", { reference, engagement: label });
      return;
    }
    throw new ConnectError(
      "Online inquiries are temporarily unavailable.",
      Code.Unavailable,
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": reference },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: inq.email,
      subject: `[${reference}] ${label}: ${inq.name}${inq.company ? ` (${inq.company})` : ""}`,
      html: `<p><strong>${escapeHtml(inq.name)}</strong> &lt;${escapeHtml(inq.email)}&gt;${
        inq.company ? `, ${escapeHtml(inq.company)}` : ""
      }</p><p>Engagement: ${escapeHtml(label)}</p><p style="white-space:pre-wrap">${escapeHtml(inq.message)}</p>`,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    console.error("[inquiry] delivery failed", res.status);
    throw new ConnectError("We could not send your message just now. Please try again.", Code.Unavailable);
  }
};

export function createInquiryHandler(deliver: Deliver = deliverInquiry) {
  return async function submitInquiry(req: SubmitInquiryRequest, ctx: HandlerContext) {
    const now = Date.now();
    sweep(now);

    if (rateLimited(clientIp(ctx), now)) {
      throw new ConnectError("Too many requests. Please wait a few minutes and try again.", Code.ResourceExhausted);
    }

    const key = req.idempotencyKey.slice(0, 80);
    const prior = key ? seen.get(key) : undefined;
    if (prior) return { reference: prior.reference };

    // Honeypot: look successful to the bot, deliver nothing.
    if (req.website.trim() !== "") return { reference: newReference() };

    const result = validateInquiry({
      name: req.name,
      email: req.email,
      company: req.company,
      engagement: req.engagement === EngagementType.UNSPECIFIED ? 0 : req.engagement,
      message: req.message,
      consent: req.consent,
    });
    if (!result.ok) {
      throw new ConnectError(Object.values(result.errors)[0] ?? "Invalid request.", Code.InvalidArgument);
    }

    const reference = newReference();
    await deliver(
      {
        name: result.data.name,
        email: result.data.email,
        company: result.data.company,
        engagement: result.data.engagement,
        message: result.data.message,
      },
      reference,
    );
    if (key) seen.set(key, { reference, at: now });
    return { reference };
  };
}

export function routes(router: ConnectRouter) {
  router.service(InquiryService, { submitInquiry: createInquiryHandler() });
}
