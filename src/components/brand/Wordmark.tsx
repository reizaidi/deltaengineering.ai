import { DeltaGlyph, DeltaMark } from "./DeltaMark";

/**
 * Lockup: ribbon mark + "DELTA AI / ENGINEERING". The A's are drawn as the
 * brand chevron glyph, as in the supplied wordmark. The accessible name is
 * provided once via sr-only text.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-ink">
      <DeltaMark idPrefix="hdr" className="h-8 w-auto shrink-0" />
      <span className="sr-only">Delta AI Engineering</span>
      <span aria-hidden className="flex flex-col leading-none">
        <span className="flex items-end font-display text-[1.05rem] font-extrabold tracking-[0.02em]">
          DELT
          <DeltaGlyph className="mx-[0.04em] h-[0.9em] w-auto translate-y-[0.06em]" />
          <span className="ml-[0.22em]" />
          <DeltaGlyph className="mr-[0.04em] h-[0.9em] w-auto translate-y-[0.06em]" />I
        </span>
        {!compact && (
          <span className="mt-1 font-display text-[0.5rem] font-medium tracking-[0.62em] text-ink-2">
            ENGINEERING
          </span>
        )}
      </span>
    </span>
  );
}
