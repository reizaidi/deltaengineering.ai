import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "glass" | "ghost" | "light" | "gold";

const base =
  "group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold " +
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-[var(--ease-delta)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[0_10px_30px_-12px_rgb(16_12_32/0.6)] hover:bg-navy-800 " +
    "hover:shadow-[0_14px_34px_-12px_rgb(59_35_128/0.55)]",
  glass: "glass glass-strong text-ink hover:-translate-y-0.5",
  ghost: "text-ink hover:text-delta-700",
  gold: "bg-gold-500 text-ink hover:bg-[#d3b67e] shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)]",
  light: "bg-white text-ink hover:bg-delta-50 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)]",
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-4 transition-transform duration-300 ease-[var(--ease-delta)] group-hover:translate-x-0.5"
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
