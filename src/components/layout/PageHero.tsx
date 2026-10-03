import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="mx-auto max-w-shell px-5 pt-16 sm:pt-24">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
      <div aria-hidden className="hairline mt-12 max-w-md opacity-60" />
    </section>
  );
}
