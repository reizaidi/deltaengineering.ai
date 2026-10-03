"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { markFacets } from "@/components/brand/DeltaMark";

/**
 * Hero visual: "signals become decisions".
 * - A triangular lattice (the delta's own geometry) carries data signals that
 *   hop edge by edge toward the centre.
 * - The ribbon mark assembles from its three facets.
 * - Around it, an agent loop (Retrieve → Reason → Act) circulates, with a
 *   human checkpoint before Act.
 * Everything animates transforms/opacity only. Reduced motion: static composition.
 */

const W = 600;
const H = 520;
const S = 40; // lattice spacing
const RH = (S * Math.sqrt(3)) / 2;
const CX = 300;
const CY = 292;

type Pt = { x: number; y: number };

function lattice() {
  const pts: Pt[][] = [];
  for (let r = 0; r * RH <= H + RH; r++) {
    const row: Pt[] = [];
    for (let c = -1; c * S <= W + S; c++) row.push({ x: c * S + (r % 2 ? S / 2 : 0), y: r * RH });
    pts.push(row);
  }
  const edges: string[] = [];
  pts.forEach((row, r) =>
    row.forEach((p, c) => {
      const right = row[c + 1];
      if (right) edges.push(`M${p.x} ${p.y}L${right.x} ${right.y}`);
      const next = pts[r + 1];
      if (!next) return;
      const dl = r % 2 ? next[c] : next[c - 1];
      const dr = r % 2 ? next[c + 1] : next[c];
      if (dl) edges.push(`M${p.x} ${p.y}L${dl.x} ${dl.y}`);
      if (dr) edges.push(`M${p.x} ${p.y}L${dr.x} ${dr.y}`);
    }),
  );
  return { pts, d: edges.join("") };
}

/** Walk from a start node toward the centre, always taking the closest lattice neighbour. */
function walk(pts: Pt[][], r0: number, c0: number, hops: number): Pt[] {
  const path: Pt[] = [];
  let r = r0;
  let c = c0;
  for (let i = 0; i <= hops; i++) {
    const p = pts[r]?.[c];
    if (!p) break;
    path.push(p);
    const odd = r % 2 === 1;
    const candidates: Array<[number, number]> = [
      [r, c - 1], [r, c + 1],
      [r - 1, odd ? c : c - 1], [r - 1, odd ? c + 1 : c],
      [r + 1, odd ? c : c - 1], [r + 1, odd ? c + 1 : c],
    ];
    let best: [number, number] = [r, c];
    let bestD = Infinity;
    for (const [nr, nc] of candidates) {
      const q = pts[nr]?.[nc];
      if (!q) continue;
      const d = (q.x - CX) ** 2 + (q.y - CY) ** 2;
      if (d < bestD) {
        bestD = d;
        best = [nr, nc];
      }
    }
    [r, c] = best;
  }
  return path;
}

const STARTS: Array<[number, number]> = [
  [1, 2], [2, 13], [0, 8], [6, 0], [7, 15], [13, 3], [14, 12], [11, 15], [4, 1], [12, 8],
];

// Geometry is deterministic, so compute it once per module, not per render.
const LATTICE = lattice();
const SIGNALS = STARTS.map(([r, c]) => walk(LATTICE.pts, r, c, 6));

const LOOP = { top: { x: 300, y: 92 }, right: { x: 512, y: 448 }, left: { x: 88, y: 448 } };

export function HeroDelta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { d } = LATTICE;
  const signals = SIGNALS;

  // Pointer parallax (fine pointers only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.6 });
  const markX = useTransform(sx, (v) => v * 10);
  const markY = useTransform(sy, (v) => v * 10);
  const chipX = useTransform(sx, (v) => v * -6);
  const chipY = useTransform(sy, (v) => v * -6);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  const markScale = 0.17;
  const markW = 1380 * markScale;
  const markH = 1110 * markScale;

  const facetIn = (i: number, dx: number, dy: number) => ({
    initial: reduce ? false : { opacity: 0, x: dx, y: dy },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 1.1, delay: 0.25 + i * 0.16, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="glass specular relative aspect-[600/520] w-full overflow-hidden"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="hero-fade" cx="50%" cy="56%" r="60%">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-mask">
            <rect width={W} height={H} fill="url(#hero-fade)" />
          </mask>
          <linearGradient id="hero-sweep" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="hero-mark-clip">
            <path d={markFacets.right} />
            <path d={markFacets.left} />
            <path d={markFacets.base} />
          </clipPath>
        </defs>

        {/* Lattice */}
        <g mask="url(#hero-mask)">
          <path d={d} stroke="#100c20" strokeOpacity="0.09" strokeWidth="1" fill="none" />
          {/* Signals: data hopping toward the decision point */}
          {!reduce &&
            signals.map((path, i) => (
              <motion.circle
                key={i}
                r={3.2}
                cx={0}
                cy={0}
                fill={i % 3 === 0 ? "#c5a467" : "#24124d"}
                initial={{ opacity: 0, x: path[0].x, y: path[0].y }}
                animate={{
                  x: path.map((p) => p.x),
                  y: path.map((p) => p.y),
                  opacity: path.map((_, k) => (k === 0 || k === path.length - 1 ? 0 : 0.9)),
                }}
                transition={{
                  duration: 3.6,
                  delay: 1.2 + i * 0.45,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: "linear",
                }}
              />
            ))}
        </g>

        {/* Agent loop */}
        <motion.g style={{ x: chipX, y: chipY }}>
          <path
            d={`M${LOOP.top.x} ${LOOP.top.y}L${LOOP.right.x} ${LOOP.right.y}L${LOOP.left.x} ${LOOP.left.y}Z`}
            fill="none"
            stroke="#100c20"
            strokeOpacity="0.22"
            strokeWidth="1.2"
            strokeDasharray="3 7"
          />
          {!reduce && (
            <motion.circle
              r={5}
              fill="#c5a467"
              cx={0}
              cy={0}
              initial={{ x: LOOP.top.x, y: LOOP.top.y }}
              animate={{
                x: [LOOP.top.x, LOOP.right.x, LOOP.left.x, LOOP.top.x],
                y: [LOOP.top.y, LOOP.right.y, LOOP.left.y, LOOP.top.y],
              }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.36, 0.68, 1] }}
            />
          )}
        </motion.g>

        {/* Mark assembly */}
        <motion.g style={{ x: markX, y: markY }}>
          <g transform={`translate(${CX - markW / 2} ${CY - markH / 2 + 8}) scale(${markScale})`}>
            <defs>
              <linearGradient id="hr" x1="600" y1="150" x2="1300" y2="1100" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2c1660" />
                <stop offset="0.22" stopColor="#43207a" />
                <stop offset="0.6" stopColor="#2a1559" />
                <stop offset="1" stopColor="#120a26" />
              </linearGradient>
              <linearGradient id="hl" x1="660" y1="300" x2="120" y2="1080" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#120a26" />
                <stop offset="0.55" stopColor="#2a1559" />
                <stop offset="1" stopColor="#43207a" />
              </linearGradient>
              <linearGradient id="hb" x1="20" y1="1100" x2="840" y2="700" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#120a26" />
                <stop offset="0.6" stopColor="#271452" />
                <stop offset="1" stopColor="#43207a" />
              </linearGradient>
            </defs>
            <motion.path d={markFacets.left} fill="url(#hl)" {...facetIn(0, -260, 120)} />
            <motion.path d={markFacets.base} fill="url(#hb)" {...facetIn(1, 120, 260)} />
            <motion.path d={markFacets.right} fill="url(#hr)" {...facetIn(2, 220, -200)} />
            {!reduce && (
              <g clipPath="url(#hero-mark-clip)">
                <motion.rect
                  y={0}
                  height={1110}
                  width={420}
                  fill="url(#hero-sweep)"
                  initial={{ x: -600 }}
                  animate={{ x: 1600 }}
                  transition={{ duration: 1.6, delay: 2.2, repeat: Infinity, repeatDelay: 5, ease: [0.45, 0, 0.2, 1] }}
                />
              </g>
            )}
          </g>
        </motion.g>
      </svg>

      {/* Loop labels (HTML for crisp text at any size) */}
      <LoopChip style={{ left: `${(LOOP.top.x / W) * 100}%`, top: `${(LOOP.top.y / H) * 100}%` }} label="Retrieve" index="01" />
      <LoopChip style={{ left: `${(LOOP.right.x / W) * 100}%`, top: `${(LOOP.right.y / H) * 100}%` }} label="Reason" index="02" />
      <LoopChip style={{ left: `${(LOOP.left.x / W) * 100}%`, top: `${(LOOP.left.y / H) * 100}%` }} label="Act" index="03" />
      <div className="absolute left-4 top-4 hidden sm:block">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[0.7rem] font-semibold text-ink-2 shadow-sm ring-1 ring-ink/5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-delta-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-delta-600" />
          </span>
          Human approval before consequential actions
        </span>
      </div>
    </div>
  );
}

function LoopChip({ style, label, index }: { style: React.CSSProperties; label: string; index: string }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={style}>
      <span className="glass glass-strong inline-flex items-center gap-1.5 !rounded-full px-3 py-1.5 text-xs font-semibold text-ink">
        <span className="font-display text-[0.6rem] text-delta-700">{index}</span>
        {label}
      </span>
    </div>
  );
}
