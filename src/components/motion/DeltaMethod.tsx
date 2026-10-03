"use client";

import { useMachine } from "@xstate/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, type KeyboardEvent } from "react";
import { lifecycle } from "@/content/site";
import { lifecycleMachine, LIFECYCLE_LAST } from "@/machines/lifecycle";
import { cn } from "@/lib/cn";

/**
 * The Delta Method explainer: five stages on a straight track. A delta marker
 * travels between stages; the panel explains the question each stage answers
 * and the artefact it leaves behind. State lives in an XState machine.
 */
export function DeltaMethod() {
  const reduce = useReducedMotion();
  const [state, send] = useMachine(lifecycleMachine, { input: { autoplay: !reduce } });
  const { index } = state.context;
  const playing = state.matches("playing");
  const stage = lifecycle[index];
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: KeyboardEvent) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index >= LIFECYCLE_LAST ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index <= 0 ? LIFECYCLE_LAST : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = LIFECYCLE_LAST;
    if (next === null) return;
    e.preventDefault();
    send({ type: "SELECT", index: next });
    tabs.current[next]?.focus();
  }

  return (
    <div className="glass p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-ink-2">
          Stage <span className="font-semibold text-ink">{index + 1}</span> of {lifecycle.length}
        </p>
        <button
          type="button"
          onClick={() => send({ type: playing ? "PAUSE" : "PLAY" })}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-white"
        >
          {playing ? (
            <svg aria-hidden viewBox="0 0 16 16" className="size-4"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : (
            <svg aria-hidden viewBox="0 0 16 16" className="size-4"><path d="M5 3l8 5-8 5z" fill="currentColor" /></svg>
          )}
          {playing ? "Pause tour" : "Play tour"}
        </button>
      </div>

      {/* Track */}
      <div className="relative mt-8">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[22px] h-px bg-line" />
        <motion.div
          aria-hidden
          className="absolute left-[10%] top-[22px] h-px origin-left bg-delta-600"
          animate={{ width: `${(index / LIFECYCLE_LAST) * 80}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div role="tablist" aria-label="Delta Method stages" className="relative grid grid-cols-5" onKeyDown={onKeyDown}>
          {lifecycle.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={active}
                aria-controls="method-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => send({ type: "SELECT", index: i })}
                className="group flex flex-col items-center gap-3 rounded-xl px-1 pb-2"
              >
                <span className="relative flex size-11 items-center justify-center">
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border bg-white transition-[border-color,box-shadow] duration-300",
                      active ? "border-delta-600 shadow-[0_0_0_6px_rgb(232_16_26/0.1)]" : i < index ? "border-delta-600/50" : "border-line group-hover:border-ink/30",
                    )}
                  />
                  {active && (
                    <motion.svg
                      layoutId="method-delta"
                      viewBox="0 0 20 18"
                      className="relative size-4"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden
                    >
                      <path d="M10 1 L19 17 L1 17 Z" fill="#c90e17" />
                    </motion.svg>
                  )}
                  {!active && (
                    <span className={cn("relative font-display text-xs font-bold", i < index ? "text-delta-700" : "text-muted")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  {active && playing && (
                    <svg aria-hidden viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
                      <motion.circle
                        key={`p-${index}`}
                        cx="22"
                        cy="22"
                        r="21"
                        fill="none"
                        stroke="#c90e17"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4.2, ease: "linear" }}
                      />
                    </svg>
                  )}
                </span>
                <span className={cn("text-xs font-semibold sm:text-sm", active ? "text-ink" : "text-ink-2")}>{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div
        id="method-panel"
        role="tabpanel"
        aria-labelledby={`tab-${stage.id}`}
        aria-live={playing ? "off" : "polite"}
        className="relative mt-6 min-h-[13rem] overflow-hidden rounded-2xl bg-white/70 p-6 ring-1 ring-ink/5 sm:min-h-[11rem] sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end"
          >
            <div>
              <p className="font-display text-xl font-bold text-ink text-balance sm:text-2xl">{stage.question}</p>
              <p className="mt-3 leading-relaxed text-ink-2">{stage.detail}</p>
            </div>
            <div className="rounded-xl border border-dashed border-delta-600/40 p-4">
              <p className="eyebrow !text-[0.65rem]">Leaves behind</p>
              <p className="mt-2 font-semibold text-ink">{stage.artefact}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
