"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Quality / latency / cost trade-off triangle. The handle's barycentric
 * weights drive an illustrative architecture recommendation. Keyboard and
 * screen-reader users use the preset radio group; dragging is an enhancement.
 * The mapping is a design heuristic for explanation, not a benchmark.
 */

type W = { q: number; l: number; c: number };

const V = { q: { x: 200, y: 24 }, l: { x: 376, y: 328 }, c: { x: 24, y: 328 } };

const presets: Array<{ id: string; label: string; w: W }> = [
  { id: "balanced", label: "Balanced", w: { q: 1 / 3, l: 1 / 3, c: 1 / 3 } },
  { id: "quality", label: "Quality first", w: { q: 0.7, l: 0.15, c: 0.15 } },
  { id: "latency", label: "Latency first", w: { q: 0.15, l: 0.7, c: 0.15 } },
  { id: "cost", label: "Cost first", w: { q: 0.15, l: 0.15, c: 0.7 } },
];

const toPoint = (w: W) => ({
  x: w.q * V.q.x + w.l * V.l.x + w.c * V.c.x,
  y: w.q * V.q.y + w.l * V.l.y + w.c * V.c.y,
});

function toWeights(x: number, y: number): W {
  const { q, l, c } = V;
  const det = (l.y - c.y) * (q.x - c.x) + (c.x - l.x) * (q.y - c.y);
  let wq = ((l.y - c.y) * (x - c.x) + (c.x - l.x) * (y - c.y)) / det;
  let wl = ((c.y - q.y) * (x - c.x) + (q.x - c.x) * (y - c.y)) / det;
  let wc = 1 - wq - wl;
  // Clamp into the triangle, keeping a small floor so no axis is ever "zero".
  const floor = 0.05;
  wq = Math.max(floor, wq);
  wl = Math.max(floor, wl);
  wc = Math.max(floor, wc);
  const sum = wq + wl + wc;
  return { q: wq / sum, l: wl / sum, c: wc / sum };
}

function recommend(w: W) {
  const top = w.q >= w.l && w.q >= w.c ? "q" : w.l >= w.c ? "l" : "c";
  const model =
    w.q > 0.5 ? "Most capable model tier, extended reasoning on hard cases"
    : w.c > 0.5 ? "Small or distilled model, escalate only when confidence is low"
    : w.l > 0.5 ? "Fast model tier with streamed responses"
    : "Mid-tier model with routing to a larger model for hard cases";
  const retrieval =
    w.q > 0.5 ? "Deep hybrid retrieval (≈50 candidates) with cross-encoder reranking"
    : w.l > 0.5 ? "Shallow hybrid retrieval (≈10 candidates), rerank skipped"
    : w.c > 0.5 ? "Hybrid retrieval (≈20 candidates), lightweight rerank"
    : "Hybrid retrieval (≈25 candidates) with reranking";
  const caching =
    w.c > 0.4 || w.l > 0.4 ? "Aggressive prompt and semantic-response caching" : "Prompt caching on shared context";
  const review = w.q > 0.5 ? "Human review on low-confidence answers" : "Sampled human review with drift alerts";
  return { top, model, retrieval, caching, review };
}

export function TradeoffTriangle() {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [w, setW] = useState<W>(presets[0].w);
  const [dragging, setDragging] = useState(false);
  const p = toPoint(w);
  const rec = recommend(w);
  const activePreset = presets.find((pr) => Math.abs(pr.w.q - w.q) < 0.01 && Math.abs(pr.w.l - w.l) < 0.01)?.id;

  function fromEvent(e: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 400;
    const y = ((e.clientY - r.top) / r.height) * 352;
    setW(toWeights(x, y));
  }

  const pct = (n: number) => `${Math.round(n * 100)}%`;

  return (
    <div className="glass grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <svg
          ref={svgRef}
          viewBox="0 0 400 352"
          className={cn("w-full touch-none select-none", dragging ? "cursor-grabbing" : "cursor-grab")}
          aria-hidden
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setDragging(true);
            fromEvent(e);
          }}
          onPointerMove={(e) => dragging && fromEvent(e)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        >
          <defs>
            <linearGradient id="tri-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8101a" stopOpacity="0.1" />
              <stop offset="1" stopColor="#142235" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d={`M${V.q.x} ${V.q.y}L${V.l.x} ${V.l.y}L${V.c.x} ${V.c.y}Z`} fill="url(#tri-fill)" stroke="#0e1726" strokeOpacity="0.18" />
          {/* Guides from the handle to each vertex: line weight shows pull. */}
          {(["q", "l", "c"] as const).map((k) => (
            <motion.line
              key={k}
              x1={V[k].x}
              y1={V[k].y}
              animate={{ x2: p.x, y2: p.y, strokeWidth: 0.5 + w[k] * 5 }}
              transition={reduce || dragging ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
              stroke={k === rec.top ? "#c90e17" : "#0e1726"}
              strokeOpacity={k === rec.top ? 0.8 : 0.25}
              strokeLinecap="round"
            />
          ))}
          <motion.g
            animate={{ x: p.x, y: p.y }}
            initial={false}
            transition={reduce || dragging ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
          >
            <circle r="18" fill="#fff" stroke="#c90e17" strokeWidth="2" />
            <path d="M0 -8 L7 5 L-7 5 Z" fill="#c90e17" />
          </motion.g>
          <VertexLabel x={V.q.x} y={V.q.y - 4} anchor="middle" label="Quality" value={pct(w.q)} above />
          <VertexLabel x={V.l.x} y={V.l.y + 20} anchor="end" label="Latency" value={pct(w.l)} />
          <VertexLabel x={V.c.x} y={V.c.y + 20} anchor="start" label="Cost" value={pct(w.c)} />
        </svg>
        <p className="mt-2 text-center text-xs text-muted">Drag the marker, or choose a priority below.</p>
      </div>

      <div>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Priority</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((pr) => (
              <label
                key={pr.id}
                className={cn(
                  "relative inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-medium ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-delta-600",
                  activePreset === pr.id ? "bg-ink text-white ring-ink" : "bg-white/70 text-ink ring-ink/10 hover:bg-white",
                )}
              >
                <input
                  type="radio"
                  name="priority"
                  className="sr-only"
                  checked={activePreset === pr.id}
                  onChange={() => setW(pr.w)}
                />
                {pr.label}
              </label>
            ))}
          </div>
        </fieldset>

        <dl className="mt-6 divide-y divide-line rounded-2xl bg-white/70 ring-1 ring-ink/5" aria-live="polite">
          <Row term="Model" value={rec.model} />
          <Row term="Retrieval" value={rec.retrieval} />
          <Row term="Caching" value={rec.caching} />
          <Row term="Oversight" value={rec.review} />
        </dl>
        <p className="mt-3 text-xs text-muted">
          Illustrative design heuristics. Real choices are set by your evaluation results and budgets.
        </p>
      </div>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 px-5 py-3.5 text-sm">
      <dt className="font-semibold text-ink">{term}</dt>
      <dd className="text-ink-2">{value}</dd>
    </div>
  );
}

function VertexLabel({
  x,
  y,
  anchor,
  label,
  value,
  above,
}: {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  label: string;
  value: string;
  above?: boolean;
}) {
  return (
    <text x={x} y={above ? y - 2 : y} textAnchor={anchor} className="fill-ink font-display text-[13px] font-bold">
      {label} <tspan className="fill-delta-700 font-sans font-semibold">{value}</tspan>
    </text>
  );
}
