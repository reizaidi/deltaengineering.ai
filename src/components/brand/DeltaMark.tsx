import type { SVGProps } from "react";

/**
 * Vector reconstruction of the supplied faceted ribbon mark: three folded
 * bands forming a delta. Paths are exported so motion components can animate
 * the same geometry.
 */
export const MARK_VIEWBOX = "0 0 1380 1110";

export const markFacets = {
  // Right band: apex down to the bottom-right, ending in the arrow notch.
  right: "M712 2 L1372 1104 L802 1104 L1077 1031 L948 816 L572 226 Z",
  // Left band: from the fold under the right band down to the bottom-left.
  left: "M572 226 L696 412 L363 916 L5 1104 Z",
  // Base band with the rising hook.
  base: "M5 1104 L363 916 L549 918 L760 638 L860 800 L629 1104 Z",
} as const;

type Props = SVGProps<SVGSVGElement> & { idPrefix?: string; title?: string };

export function DeltaMark({ idPrefix = "dm", title, ...props }: Props) {
  const g = (n: string) => `${idPrefix}-${n}`;
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={g("r")} x1="600" y1="150" x2="1300" y2="1100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2c1660" />
          <stop offset="0.22" stopColor="#43207a" />
          <stop offset="0.6" stopColor="#2a1559" />
          <stop offset="1" stopColor="#120a26" />
        </linearGradient>
        <linearGradient id={g("l")} x1="660" y1="300" x2="120" y2="1080" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#120a26" />
          <stop offset="0.55" stopColor="#2a1559" />
          <stop offset="1" stopColor="#43207a" />
        </linearGradient>
        <linearGradient id={g("b")} x1="20" y1="1100" x2="840" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#120a26" />
          <stop offset="0.6" stopColor="#271452" />
          <stop offset="1" stopColor="#43207a" />
        </linearGradient>
      </defs>
      <path d={markFacets.left} fill={`url(#${g("l")})`} />
      <path d={markFacets.base} fill={`url(#${g("b")})`} />
      <path d={markFacets.right} fill={`url(#${g("r")})`} />
    </svg>
  );
}

/** The "A" from the wordmark: an ink chevron with a violet arrow counter. */
export function DeltaGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1250 1110" aria-hidden {...props}>
      <path d="M627 152 L1213 1057 L977 1057 L627 485 L262 1057 L36 1057 Z" fill="currentColor" />
      <path d="M627 710 L847 1062 L627 975 Z" fill="#4a2a8a" />
      <path d="M627 710 L627 975 L398 1065 Z" fill="#24124d" />
    </svg>
  );
}
