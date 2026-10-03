"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import type { TimelineEntry } from "@/content/founder-profile";

const kindLabel: Record<TimelineEntry["kind"], string> = {
  engineering: "Engineering",
  ai: "AI practice",
  venture: "Venture",
  education: "Education",
};

/**
 * Career timeline. The gold rail fills as the list scrolls through the
 * viewport; with reduced motion MotionConfig skips the spring and the rail is
 * simply drawn. The list itself is plain, ordered markup.
 */
export function CareerTimeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      <div aria-hidden className="absolute top-2 bottom-2 left-[11px] w-px bg-ink/10 sm:left-1/2" />
      <motion.div
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gold-500 sm:left-1/2"
      />
      <ol ref={ref} className="relative space-y-10">
        {entries.map((e, i) => {
          const right = i % 2 === 1;
          return (
            <li key={e.period + e.title} className="relative pl-10 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0">
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 left-1 size-[15px] rotate-45 rounded-[3px] ring-4 ring-canvas sm:left-1/2 sm:-ml-[7px]",
                  e.kind === "venture" ? "bg-gold-500" : e.kind === "education" ? "bg-white ring-offset-0 outline outline-1 outline-delta-600" : "bg-delta-700",
                )}
              />
              <Reveal className={cn(right ? "sm:col-start-2" : "sm:col-start-1 sm:text-right")}>
                <p className="font-display text-xs font-semibold tracking-[0.18em] text-delta-700 uppercase">
                  {e.period} <span className="text-muted">· {kindLabel[e.kind]}</span>
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{e.title}</h3>
                <p className="text-sm font-medium text-ink-2">{e.org}</p>
                <p className="mt-2 leading-relaxed text-ink-2">{e.detail}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
