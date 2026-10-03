import { describe, expect, it, vi } from "vitest";
import { createActor, fromPromise, waitFor } from "xstate";
import { lifecycleMachine } from "@/machines/lifecycle";
import { inquiryMachine, type SubmitInput } from "@/machines/inquiry";
import { yearsSince } from "@/content/site";

describe("lifecycleMachine", () => {
  it("starts paused when autoplay is off and wraps around", () => {
    const a = createActor(lifecycleMachine, { input: { autoplay: false } }).start();
    expect(a.getSnapshot().value).toBe("paused");
    a.send({ type: "PREV" });
    expect(a.getSnapshot().context.index).toBe(4);
    a.send({ type: "NEXT" });
    expect(a.getSnapshot().context.index).toBe(0);
  });

  it("auto-advances while playing and pauses on user selection", () => {
    vi.useFakeTimers();
    const a = createActor(lifecycleMachine, { input: { autoplay: true } }).start();
    expect(a.getSnapshot().value).toBe("playing");
    vi.advanceTimersByTime(4200);
    expect(a.getSnapshot().context.index).toBe(1);
    a.send({ type: "SELECT", index: 3 });
    expect(a.getSnapshot().value).toBe("paused");
    vi.advanceTimersByTime(10000);
    expect(a.getSnapshot().context.index).toBe(3);
    vi.useRealTimers();
  });
});

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  engagement: 2,
  message: "We need an agent that drafts replies for review.",
  consent: true as const,
};

function fill(a: ReturnType<typeof createActor<typeof inquiryMachine>>) {
  for (const [field, value] of Object.entries(valid)) a.send({ type: "CHANGE", field: field as keyof typeof valid, value });
}

describe("inquiryMachine", () => {
  it("blocks invalid submissions and shows all errors", () => {
    const a = createActor(inquiryMachine, { input: { newKey: () => "k1" } }).start();
    a.send({ type: "SUBMIT" });
    const s = a.getSnapshot();
    expect(s.value).toBe("editing");
    expect(Object.keys(s.context.errors)).toEqual(expect.arrayContaining(["name", "email", "engagement", "message", "consent"]));
  });

  it("retries with the same idempotency key after a failure", async () => {
    const calls: SubmitInput[] = [];
    let fail = true;
    const m = inquiryMachine.provide({
      actors: {
        submit: fromPromise(async ({ input }: { input: SubmitInput }) => {
          calls.push(input);
          if (fail) throw new Error("offline");
          return { reference: "DAI-TEST" };
        }),
      },
    });
    const a = createActor(m, { input: { newKey: () => "same-key" } }).start();
    fill(a);
    a.send({ type: "SUBMIT" });
    await waitFor(a, (s) => s.matches("failure"));
    expect(a.getSnapshot().context.failure).toBe("offline");
    fail = false;
    a.send({ type: "RETRY" });
    await waitFor(a, (s) => s.matches("success"));
    expect(calls.map((c) => c.idempotencyKey)).toEqual(["same-key", "same-key"]);
    expect(a.getSnapshot().context.reference).toBe("DAI-TEST");
  });
});

describe("yearsSince", () => {
  it("counts whole years from December 2010", () => {
    const start = new Date("2010-12-01");
    expect(yearsSince(start, new Date("2026-10-03"))).toBe(15);
    expect(yearsSince(start, new Date("2026-12-02"))).toBe(16);
  });
});
