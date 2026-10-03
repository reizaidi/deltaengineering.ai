"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and on Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "glass mx-auto flex max-w-6xl items-center justify-between gap-4 px-3 py-2 transition-[box-shadow,background] duration-500 sm:px-4",
          scrolled ? "glass-strong" : "",
        )}
      >
        <Link href="/" className="rounded-lg px-1 py-1">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                      active ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white shadow-[inset_0_0_0_1px_rgb(16_12_32/0.08),0_4px_14px_-6px_rgb(16_12_32/0.25)]"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-delta-700 sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden viewBox="0 0 24 24" className="size-6">
              <motion.path
                d="M4 8h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={open ? { d: "M6 6l12 12" } : { d: "M4 8h16" }}
              />
              <motion.path
                d="M4 16h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={open ? { d: "M6 18L18 6" } : { d: "M4 16h16" }}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-strong mx-auto mt-2 max-w-6xl p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {[...nav, { href: "/contact", label: "Start a project" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-medium text-ink hover:bg-white/80 aria-[current=page]:bg-white"
                  >
                    {item.label}
                    <span aria-hidden className="text-delta-600">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
