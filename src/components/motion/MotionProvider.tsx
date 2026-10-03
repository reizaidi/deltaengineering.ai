"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honour the OS reduced-motion setting for every Motion component: transforms
 * and layout animations are disabled, opacity transitions remain. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
