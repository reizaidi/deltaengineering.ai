"use client";

import { ConnectError } from "@connectrpc/connect";
import { useMachine } from "@xstate/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { fromPromise } from "xstate";
import { Button } from "@/components/ui/Button";
import { inquiryMachine, type SubmitInput } from "@/machines/inquiry";
import { engagementOptions, type InquiryInput } from "@/lib/inquiry-schema";
import { inquiryClient } from "@/lib/rpc-client";
import { cn } from "@/lib/cn";

const newKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

async function submit({ input }: { input: SubmitInput }) {
  try {
    const res = await inquiryClient.submitInquiry(
      {
        name: input.values.name,
        email: input.values.email,
        company: input.values.company ?? "",
        engagement: input.values.engagement,
        message: input.values.message,
        consent: Boolean(input.values.consent),
        idempotencyKey: input.idempotencyKey,
        website: input.honeypot,
      },
      { timeoutMs: 15000 },
    );
    return { reference: res.reference };
  } catch (err) {
    const e = ConnectError.from(err);
    throw new Error(e.rawMessage || "We could not reach the server. Check your connection and try again.");
  }
}

const fieldLabels: Record<keyof InquiryInput, string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  engagement: "What do you need help with?",
  message: "Project details",
  consent: "Consent",
};

export function ContactForm({ email }: { email: string }) {
  const machine = useMemo(() => inquiryMachine.provide({ actors: { submit: fromPromise(submit) } }), []);
  const [state, send] = useMachine(machine, { input: { newKey } });
  const { values, errors, reference, failure } = state.context;
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submitting = state.matches("submitting");
  const errorEntries = Object.entries(errors).filter(([, v]) => v) as Array<[keyof InquiryInput, string]>;

  // Move focus to the error summary after a failed submit, and to the
  // confirmation after success, so screen-reader users hear the outcome.
  const isSuccess = state.matches("success");
  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send({ type: "SUBMIT" });
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const change = (field: keyof InquiryInput) => (value: InquiryInput[keyof InquiryInput]) =>
    send({ type: "CHANGE", field, value });
  const blur = (field: keyof InquiryInput) => () => send({ type: "BLUR", field });

  if (state.matches("success")) {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass glass-strong p-8 outline-none sm:p-10"
      >
        <SuccessGlyph />
        <h2 className="mt-6 font-display text-2xl font-bold text-ink">Thank you. Your inquiry is in.</h2>
        <p className="mt-3 text-ink-2">
          Your reference is <strong className="font-semibold text-ink">{reference}</strong>. We reply from{" "}
          <a className="font-medium text-delta-700 underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
          ; quote the reference if you write to us in the meantime.
        </p>
        <Button variant="glass" className="mt-8" onClick={() => send({ type: "RESET" })}>
          Send another inquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="glass glass-strong p-6 sm:p-10" aria-busy={submitting}>
      <div ref={summaryRef} tabIndex={-1} className="outline-none">
        <AnimatePresence initial={false}>
          {errorEntries.length > 0 && state.context.submitted && (
            <motion.div
              key="summary"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden rounded-xl border border-delta-600/30 bg-delta-50 p-4 text-sm text-ink"
            >
              <p className="font-semibold">Please fix {errorEntries.length === 1 ? "this field" : `these ${errorEntries.length} fields`}:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errorEntries.map(([k, msg]) => (
                  <li key={k}>
                    <a className="underline underline-offset-2" href={`#f-${k}`}>
                      {fieldLabels[k]}: {msg}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={fieldLabels.name} error={errors.name} required>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => change("name")(e.target.value)}
            onBlur={blur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "e-name" : undefined}
            className={inputCls(errors.name)}
          />
        </Field>
        <Field id="email" label={fieldLabels.email} error={errors.email} required>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => change("email")(e.target.value)}
            onBlur={blur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "e-email" : undefined}
            className={inputCls(errors.email)}
          />
        </Field>
        <Field id="company" label={fieldLabels.company} error={errors.company} hint="Optional">
          <input
            id="f-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => change("company")(e.target.value)}
            onBlur={blur("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "e-company" : undefined}
            className={inputCls(errors.company)}
          />
        </Field>
        <Field id="engagement" label={fieldLabels.engagement} error={errors.engagement} required>
          <select
            id="f-engagement"
            name="engagement"
            value={values.engagement}
            onChange={(e) => change("engagement")(Number(e.target.value))}
            onBlur={blur("engagement")}
            aria-invalid={Boolean(errors.engagement)}
            aria-describedby={errors.engagement ? "e-engagement" : undefined}
            className={cn(inputCls(errors.engagement), "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%3E%3Cpath%20d=%22M4%206l4%204%204-4%22%20fill=%22none%22%20stroke=%22%230e1726%22%20stroke-width=%221.6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10")}
          >
            <option value={0}>Choose one</option>
            {engagementOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field
            id="message"
            label={fieldLabels.message}
            error={errors.message}
            required
            hint="The workflow, the people involved, and what a good outcome looks like."
          >
            <textarea
              id="f-message"
              name="message"
              rows={6}
              value={values.message}
              onChange={(e) => change("message")(e.target.value)}
              onBlur={blur("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={cn("h-message", errors.message && "e-message")}
              className={cn(inputCls(errors.message), "min-h-36 resize-y py-3")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input
          id="f-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => send({ type: "HONEYPOT", value: e.target.value })}
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2" htmlFor="f-consent">
          <input
            id="f-consent"
            type="checkbox"
            checked={Boolean(values.consent)}
            onChange={(e) => change("consent")(e.target.checked as true)}
            onBlur={blur("consent")}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "e-consent" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-delta-600)]"
          />
          <span>
            You may use these details to reply to this inquiry. See our{" "}
            <a href="/privacy" className="font-medium text-delta-700 underline underline-offset-4">
              privacy notice
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="e-consent" className="mt-2 pl-8 text-sm font-medium text-delta-700">
            {errors.consent}
          </p>
        )}
      </div>

      <AnimatePresence>
        {state.matches("failure") && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col gap-3 rounded-xl border border-delta-600/30 bg-delta-50 p-4 text-sm text-ink sm:flex-row sm:items-center sm:justify-between"
          >
            <p>
              {failure} You can also email{" "}
              <a className="font-medium underline underline-offset-2" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>
            <Button type="button" variant="glass" onClick={() => send({ type: "RETRY" })}>
              Try again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">We reply to every genuine inquiry. No mailing lists.</p>
        <Button type="submit" disabled={submitting} arrow={!submitting} className="min-w-44">
          {submitting ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : (
            "Send inquiry"
          )}
        </Button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {submitting ? "Sending your inquiry." : ""}
      </p>
    </form>
  );
}

function inputCls(error?: string) {
  return cn(
    "block min-h-12 w-full rounded-xl border bg-white/90 px-4 text-[0.95rem] text-ink shadow-[inset_0_1px_2px_rgb(14_23_38/0.06)]",
    "transition-[border-color,box-shadow] duration-200 placeholder:text-muted",
    "focus:border-delta-600 focus:shadow-[0_0_0_4px_rgb(232_16_26/0.12)] focus:outline-none",
    error ? "border-delta-600" : "border-line hover:border-ink/25",
  );
}

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
        <span>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-delta-600">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </span>
        {hint === "Optional" && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {hint && hint !== "Optional" && (
        <p id={`h-${id}`} className="-mt-1 mb-2 text-xs text-muted">
          {hint}
        </p>
      )}
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`e-${id}`}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm font-medium text-delta-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessGlyph() {
  return (
    <svg viewBox="0 0 64 56" className="h-14 w-16" aria-hidden>
      <motion.path
        d="M32 4 L60 52 L4 52 Z"
        fill="none"
        stroke="#c90e17"
        strokeWidth="3"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M21 34 L29 42 L44 25"
        fill="none"
        stroke="#0e1726"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </svg>
  );
}
