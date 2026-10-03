import { assign, fromPromise, setup } from "xstate";
import { validateInquiry, type InquiryFieldErrors, type InquiryInput } from "@/lib/inquiry-schema";

export type SubmitInput = { values: InquiryInput; idempotencyKey: string; honeypot: string };

type Ctx = {
  values: InquiryInput;
  honeypot: string;
  errors: InquiryFieldErrors;
  touched: Partial<Record<keyof InquiryInput, boolean>>;
  idempotencyKey: string;
  newKey: () => string;
  reference: string | null;
  failure: string | null;
  attempts: number;
  /** True once the user has pressed submit on this draft; gates the error summary. */
  submitted: boolean;
};

export const emptyInquiry: InquiryInput = {
  name: "",
  email: "",
  company: "",
  engagement: 0,
  message: "",
  consent: false as unknown as true,
};

/**
 * Inquiry form lifecycle: editing → submitting → success | failure.
 * The idempotency key is fixed per draft, so a retry after a network error
 * cannot create a duplicate inquiry.
 */
export const inquiryMachine = setup({
  types: {
    context: {} as Ctx,
    input: {} as { newKey: () => string },
    events: {} as
      | { type: "CHANGE"; field: keyof InquiryInput; value: InquiryInput[keyof InquiryInput] }
      | { type: "HONEYPOT"; value: string }
      | { type: "BLUR"; field: keyof InquiryInput }
      | { type: "SUBMIT" }
      | { type: "RETRY" }
      | { type: "RESET" },
  },
  actors: {
    // Replaced at runtime with machine.provide(); see ContactForm.
    submit: fromPromise<{ reference: string }, SubmitInput>(async () => {
      throw new Error("submit actor not provided");
    }),
  },
  guards: {
    isValid: ({ context }) => validateInquiry(context.values).ok,
  },
  actions: {
    revalidateTouched: assign({
      errors: ({ context }) => {
        const result = validateInquiry(context.values);
        if (result.ok) return {};
        const visible: InquiryFieldErrors = {};
        for (const k of Object.keys(result.errors) as Array<keyof InquiryInput>) {
          if (context.touched[k]) visible[k] = result.errors[k];
        }
        return visible;
      },
    }),
    showAllErrors: assign(({ context }) => {
      const result = validateInquiry(context.values);
      return {
        errors: result.ok ? {} : result.errors,
        touched: { name: true, email: true, company: true, engagement: true, message: true, consent: true },
      };
    }),
  },
}).createMachine({
  id: "inquiry",
  context: ({ input }) => ({
    values: { ...emptyInquiry },
    honeypot: "",
    errors: {},
    touched: {},
    idempotencyKey: input.newKey(),
    newKey: input.newKey,
    reference: null,
    failure: null,
    attempts: 0,
    submitted: false,
  }),
  initial: "editing",
  states: {
    editing: {
      on: {
        CHANGE: {
          actions: [
            assign({ values: ({ context, event }) => ({ ...context.values, [event.field]: event.value }) }),
            "revalidateTouched",
          ],
        },
        HONEYPOT: { actions: assign({ honeypot: ({ event }) => event.value }) },
        BLUR: {
          actions: [
            assign({ touched: ({ context, event }) => ({ ...context.touched, [event.field]: true }) }),
            "revalidateTouched",
          ],
        },
        SUBMIT: [
          { guard: "isValid", target: "submitting", actions: assign({ submitted: true }) },
          { actions: ["showAllErrors", assign({ submitted: true })], target: "invalid" },
        ],
      },
    },
    // Transient state so the UI can move focus to the error summary.
    invalid: {
      always: "editing",
    },
    submitting: {
      entry: assign({ failure: null, attempts: ({ context }) => context.attempts + 1 }),
      invoke: {
        src: "submit",
        input: ({ context }) => ({
          values: context.values,
          idempotencyKey: context.idempotencyKey,
          honeypot: context.honeypot,
        }),
        onDone: { target: "success", actions: assign({ reference: ({ event }) => event.output.reference }) },
        onError: {
          target: "failure",
          actions: assign({
            failure: ({ event }) =>
              event.error instanceof Error ? event.error.message : "Something went wrong. Please try again.",
          }),
        },
      },
    },
    failure: {
      on: {
        RETRY: "submitting",
        CHANGE: {
          target: "editing",
          actions: assign({ values: ({ context, event }) => ({ ...context.values, [event.field]: event.value }) }),
        },
      },
    },
    success: {
      on: { RESET: "editing" },
      exit: assign(({ context }) => ({
        values: { ...emptyInquiry },
        errors: {},
        touched: {},
        submitted: false,
        reference: null,
        idempotencyKey: context.newKey(),
      })),
    },
  },
});
