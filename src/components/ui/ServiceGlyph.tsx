import type { Service } from "@/content/site";

/**
 * Line glyphs built from the delta's geometry. The violet accent path draws in
 * on hover/focus of the parent `.group` (CSS only, so it costs no JS).
 */
const paths: Record<Service["glyph"], { base: string; accent: string }> = {
  agents: {
    base: "M24 6 L42 38 L6 38 Z",
    accent: "M24 6 L24 26 M42 38 L24 26 M6 38 L24 26",
  },
  retrieval: {
    base: "M8 10h20M8 18h26M8 26h16M8 34h22",
    accent: "M30 30 L38 38 M33 26 a7 7 0 1 1 -0.01 0",
  },
  platform: {
    base: "M6 34h36M10 26h28M14 18h20",
    accent: "M24 6 L34 18 L14 18 Z",
  },
  eval: {
    base: "M6 40 h36 M6 40 V8",
    accent: "M10 34 L18 26 L26 30 L40 12 M34 12 h6 v6",
  },
  data: {
    base: "M8 40 V28 M18 40 V20 M28 40 V24 M38 40 V12",
    accent: "M8 26 L18 18 L28 22 L38 10",
  },
  strategy: {
    base: "M24 4 L44 40 L4 40 Z",
    accent: "M24 18 L32 32 L16 32 Z",
  },
};

export function ServiceGlyph({ glyph }: { glyph: Service["glyph"] }) {
  const p = paths[glyph];
  return (
    <svg viewBox="0 0 48 48" className="size-11" aria-hidden>
      <path d={p.base} fill="none" stroke="#100c20" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={p.accent}
        pathLength={1}
        fill="none"
        stroke="#3b2380"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="[stroke-dasharray:1] [stroke-dashoffset:0.62] transition-[stroke-dashoffset] duration-700 ease-[var(--ease-delta)] group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
