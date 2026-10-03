import { describe, expect, it, vi } from "vitest";
import { create } from "@bufbuild/protobuf";
import { Code, ConnectError, type HandlerContext } from "@connectrpc/connect";
import { SubmitInquiryRequestSchema, EngagementType } from "@/gen/delta/v1/inquiry_pb";
import { createInquiryHandler } from "@/server/inquiry-service";

const ctx = (ip: string) => ({ requestHeader: new Headers({ "x-real-ip": ip }) }) as unknown as HandlerContext;

const req = (over: Partial<Record<string, unknown>> = {}) =>
  create(SubmitInquiryRequestSchema, {
    name: "Ada Lovelace",
    email: "ada@example.com",
    engagement: EngagementType.AGENTIC_SYSTEMS,
    message: "We need an agent that drafts replies for review.",
    consent: true,
    idempotencyKey: crypto.randomUUID(),
    ...over,
  });

describe("InquiryService.submitInquiry", () => {
  it("delivers a valid inquiry and returns a reference", async () => {
    const deliver = vi.fn().mockResolvedValue(undefined);
    const res = await createInquiryHandler(deliver)(req(), ctx("198.51.100.1"));
    expect(res.reference).toMatch(/^DAI-[0-9A-F]{8}$/);
    expect(deliver).toHaveBeenCalledOnce();
  });

  it("deduplicates by idempotency key", async () => {
    const deliver = vi.fn().mockResolvedValue(undefined);
    const h = createInquiryHandler(deliver);
    const r = req({ idempotencyKey: "dup-1" });
    const a = await h(r, ctx("198.51.100.2"));
    const b = await h(r, ctx("198.51.100.2"));
    expect(a.reference).toBe(b.reference);
    expect(deliver).toHaveBeenCalledOnce();
  });

  it("silently drops honeypot submissions", async () => {
    const deliver = vi.fn();
    const res = await createInquiryHandler(deliver)(req({ website: "spam.example" }), ctx("198.51.100.3"));
    expect(res.reference).toMatch(/^DAI-/);
    expect(deliver).not.toHaveBeenCalled();
  });

  it("rejects invalid input with InvalidArgument", async () => {
    const h = createInquiryHandler(vi.fn());
    await expect(h(req({ email: "not-an-email" }), ctx("198.51.100.4"))).rejects.toMatchObject({ code: Code.InvalidArgument });
    await expect(h(req({ consent: false }), ctx("198.51.100.4"))).rejects.toBeInstanceOf(ConnectError);
  });

  it("rate-limits after 5 requests per IP window", async () => {
    const h = createInquiryHandler(vi.fn().mockResolvedValue(undefined));
    for (let i = 0; i < 5; i++) await h(req(), ctx("198.51.100.5"));
    await expect(h(req(), ctx("198.51.100.5"))).rejects.toMatchObject({ code: Code.ResourceExhausted });
  });
});
