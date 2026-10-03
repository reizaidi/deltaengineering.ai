"use client";

import { useRef, type ComponentProps, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Glass surface whose specular highlight follows the pointer. Updates two CSS
 * custom properties inside rAF; no React re-render per move. Fine pointers only.
 */
export function GlassCard({ className, children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
      el.style.setProperty("--spec", "0.9");
    });
  }

  function onPointerLeave() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--spec", "0.35");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("glass specular", className)}
      {...props}
    >
      {children}
    </div>
  );
}
