"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useReducer } from "react";
import { cn } from "@/lib/cn";

/**
 * Explains grounded answering in three visible steps:
 * hybrid retrieval → semantic reranking → cited answer.
 * Data is an illustrative example, labelled as such in the UI.
 */

type Doc = { id: string; title: string; kw: number; vec: number; rerank: number };

const QUERY = "How long do customers on annual plans have to request a refund?";

const DOCS: Doc[] = [
  { id: "a", title: "Pricing FAQ: monthly vs annual", kw: 0.82, vec: 0.58, rerank: 0.41 },
  { id: "b", title: "Refund policy v4, section 3.2: annual plans", kw: 0.64, vec: 0.91, rerank: 0.96 },
  { id: "c", title: "Support macro: refund request template", kw: 0.71, vec: 0.66, rerank: 0.62 },
  { id: "d", title: "Changelog: billing portal update", kw: 0.55, vec: 0.31, rerank: 0.08 },
  { id: "e", title: "Terms of service, section 9: cancellations", kw: 0.38, vec: 0.79, rerank: 0.83 },
];

const STEPS = ["Query", "Retrieve", "Rerank", "Answer"] as const;

type State = { step: number; playing: boolean };
type Action = { type: "go"; step: number } | { type: "play" } | { type: "tick" } | { type: "stop" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "go":
      return { step: a.step, playing: false };
    case "play":
      return { step: 0, playing: true };
    case "tick":
      return s.step >= STEPS.length - 1 ? { ...s, playing: false } : { ...s, step: s.step + 1 };
    case "stop":
      return { ...s, playing: false };
  }
}

export function RetrievalDemo() {
  const [{ step, playing }, dispatch] = useReducer(reducer, { step: 3, playing: false });

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => dispatch({ type: "tick" }), step === 0 ? 900 : 1700);
    return () => clearTimeout(t);
  }, [playing, step]);

  const hybrid = (d: Doc) => 0.5 * d.kw + 0.5 * d.vec;
  const ordered =
    step >= 2 ? [...DOCS].sort((x, y) => y.rerank - x.rerank) : [...DOCS].sort((x, y) => hybrid(y) - hybrid(x));
  const kept = (d: Doc) => step < 2 || d.rerank >= 0.6;

  return (
    <div className="glass p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ol className="flex flex-wrap gap-1.5" aria-label="Steps">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => dispatch({ type: "go", step: i })}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-xs font-semibold ring-1 transition-colors sm:text-sm",
                  i === step ? "bg-ink text-white ring-ink" : i < step ? "bg-white text-ink ring-delta-600/40" : "bg-white/60 text-ink-2 ring-ink/10 hover:bg-white",
                )}
              >
                <span className={cn("font-display text-[0.65rem]", i === step ? "text-delta-100" : "text-delta-700")}>{i + 1}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => dispatch({ type: playing ? "stop" : "play" })}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-delta-700 ring-1 ring-delta-600/30 hover:bg-delta-50"
        >
          {playing ? "Stop" : "Run the pipeline"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white/80 p-4 ring-1 ring-ink/5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Question</p>
        <p className="mt-1 font-medium text-ink">{QUERY}</p>
      </div>

      <div className="relative mt-4 min-h-[22rem]" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {step === 0 && (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[22rem] items-center justify-center text-sm text-muted"
            >
              The question is embedded and tokenised for search.
            </motion.p>
          )}
        </AnimatePresence>

        {step >= 1 && step <= 2 && (
          <LayoutGroup>
            <div className="mb-2 flex justify-between px-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
              <span>{step === 1 ? "Hybrid candidates (keyword + vector)" : "Reranked by a cross-encoder"}</span>
              <span>{step === 1 ? "Scores" : "Relevance"}</span>
            </div>
            <ul className="space-y-2">
              {ordered.map((d, i) => (
                <motion.li
                  layout
                  key={d.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: kept(d) ? 1 : 0.35, y: 0 }}
                  transition={{ layout: { type: "spring", stiffness: 300, damping: 30 }, delay: step === 1 ? i * 0.08 : 0 }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1",
                    step === 2 && kept(d) ? "ring-delta-600/30" : "ring-ink/5",
                  )}
                >
                  <DocIcon />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{d.title}</span>
                  {step === 1 ? (
                    <span className="flex w-28 shrink-0 flex-col gap-1">
                      <Bar value={d.kw} tone="ink" label="Keyword" />
                      <Bar value={d.vec} tone="red" label="Vector" />
                    </span>
                  ) : (
                    <span className="flex w-28 shrink-0 items-center gap-2">
                      <Bar value={d.rerank} tone={kept(d) ? "red" : "ink"} label="Relevance" />
                      <span className="w-8 text-right font-mono text-xs text-ink-2">{d.rerank.toFixed(2)}</span>
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
            {step === 2 && (
              <p className="mt-3 text-xs text-muted">Below the relevance threshold, passages are dropped before generation.</p>
            )}
          </LayoutGroup>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-5 ring-1 ring-delta-600/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Grounded answer</p>
            <p className="mt-2 leading-relaxed text-ink">
              Annual-plan customers can request a full refund within 30 days of purchase or renewal
              <Cite n={1} />. After that, cancellation stops the next renewal but the current term is not refunded
              <Cite n={2} />.
            </p>
            <ol className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm text-ink-2">
              <li><span className="font-semibold text-delta-700">[1]</span> Refund policy v4, section 3.2: annual plans</li>
              <li><span className="font-semibold text-delta-700">[2]</span> Terms of service, section 9: cancellations</li>
            </ol>
            <p className="mt-4 text-xs text-muted">If no passage clears the threshold, the system says it does not know.</p>
          </motion.div>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">Illustrative example with sample documents.</p>
    </div>
  );
}

function Bar({ value, tone, label }: { value: number; tone: "ink" | "red"; label: string }) {
  return (
    <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8" title={`${label} ${value.toFixed(2)}`}>
      <motion.span
        className={cn("block h-full rounded-full", tone === "red" ? "bg-delta-600" : "bg-ink/70")}
        initial={{ width: 0 }}
        animate={{ width: `${value * 100}%` }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 rounded bg-delta-50 px-1 font-semibold text-delta-700">
      <span className="sr-only">source </span>
      {n}
    </sup>
  );
}

function DocIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-5 shrink-0 text-ink/40">
      <path d="M5 2h7l4 4v12H5z M12 2v4h4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
