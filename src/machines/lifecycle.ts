import { assign, setup } from "xstate";
import { lifecycle } from "@/content/site";

export const LIFECYCLE_LAST = lifecycle.length - 1;

/**
 * Drives the Delta Method explainer. Auto-advances while "playing"; any
 * direct interaction (select, next, prev) pauses so the reader keeps control
 * (WCAG 2.2.2 Pause, Stop, Hide). Reduced-motion users start paused.
 */
export const lifecycleMachine = setup({
  types: {
    context: {} as { index: number; autoplay: boolean },
    input: {} as { autoplay: boolean },
    events: {} as
      | { type: "NEXT" }
      | { type: "PREV" }
      | { type: "SELECT"; index: number }
      | { type: "PAUSE" }
      | { type: "PLAY" },
  },
  delays: { dwell: 4200 },
  actions: {
    next: assign({ index: ({ context }) => (context.index >= LIFECYCLE_LAST ? 0 : context.index + 1) }),
    prev: assign({ index: ({ context }) => (context.index <= 0 ? LIFECYCLE_LAST : context.index - 1) }),
    select: assign({
      index: ({ context, event }) =>
        event.type === "SELECT" ? Math.max(0, Math.min(LIFECYCLE_LAST, event.index)) : context.index,
    }),
  },
}).createMachine({
  id: "lifecycle",
  context: ({ input }) => ({ index: 0, autoplay: input.autoplay }),
  initial: "init",
  states: {
    init: {
      always: [{ guard: ({ context }) => context.autoplay, target: "playing" }, { target: "paused" }],
    },
    playing: {
      after: { dwell: { actions: "next", target: "playing", reenter: true } },
      on: {
        PAUSE: "paused",
        SELECT: { actions: "select", target: "paused" },
        NEXT: { actions: "next", target: "paused" },
        PREV: { actions: "prev", target: "paused" },
      },
    },
    paused: {
      on: {
        PLAY: "playing",
        SELECT: { actions: "select" },
        NEXT: { actions: "next" },
        PREV: { actions: "prev" },
      },
    },
  },
});
