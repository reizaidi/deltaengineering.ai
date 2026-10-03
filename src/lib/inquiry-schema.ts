// zod/mini: same validation semantics, much smaller client bundle than "zod".
import * as z from "zod/mini";

/** Shared validation for the inquiry form: the client uses it for inline
 * feedback, the server re-validates every request. */
export const engagementOptions = [
  { value: 1, label: "AI strategy and architecture" },
  { value: 2, label: "Agentic systems" },
  { value: 3, label: "Retrieval and knowledge" },
  { value: 4, label: "Cloud and platform engineering" },
  { value: 5, label: "Applied data science" },
  { value: 6, label: "Something else" },
] as const;

export const inquirySchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your name."), z.maxLength(120, "Name is too long.")),
  email: z.email("Please enter a valid email address.").check(z.maxLength(200)),
  company: z._default(z.optional(z.string().check(z.trim(), z.maxLength(160, "Company name is too long."))), ""),
  engagement: z.number().check(z.int(), z.minimum(1, "Please choose what you need help with."), z.maximum(6)),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(20, "Please tell us a little more (at least 20 characters)."),
      z.maxLength(4000, "Please keep it under 4,000 characters."),
    ),
  consent: z.literal(true, { error: "Please confirm we may use these details to reply." }),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryFieldErrors = Partial<Record<keyof InquiryInput, string>>;

export function validateInquiry(values: unknown):
  | { ok: true; data: z.output<typeof inquirySchema> }
  | { ok: false; errors: InquiryFieldErrors } {
  const parsed = inquirySchema.safeParse(values);
  if (parsed.success) return { ok: true, data: parsed.data };
  const errors: InquiryFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof InquiryInput | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
