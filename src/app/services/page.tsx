import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { engagementModels, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Agentic systems, retrieval and knowledge platforms, cloud and platform engineering, evaluation and LLMOps, applied data science, and AI strategy.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we design, build and run."
        lead="Each service ends in working software or a decision you can act on, with the evidence that it meets the target we agreed."
      />

      <div className="mx-auto mt-16 max-w-shell space-y-6 px-5">
        {services.map((s) => (
          <Reveal key={s.slug}>
            <GlassCard id={s.slug} className="group scroll-mt-28 p-6 sm:p-10">
              <article className="grid gap-8 lg:grid-cols-[1.1fr_1fr_0.8fr]">
                <div>
                  <ServiceGlyph glyph={s.glyph} />
                  <h2 className="mt-5 font-display text-2xl font-bold text-ink">{s.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-2">{s.summary}</p>
                </div>
                <div>
                  <h3 className="eyebrow">What you get</h3>
                  <ul className="mt-4 space-y-3">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex gap-3 text-[0.95rem] text-ink-2">
                        <svg aria-hidden viewBox="0 0 12 11" className="mt-1.5 size-3 shrink-0"><path d="M6 0 L12 11 L0 11 Z" fill="#3b2380" /></svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow">Deliverables</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-ink/10">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <section aria-labelledby="models-h" className="mx-auto mt-32 max-w-shell px-5">
        <SectionHeading id="models-h" eyebrow="Ways to work together" title="Start small, or embed with your team." />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {engagementModels.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <GlassCard className="flex h-full flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{m.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{m.body}</p>
                  <p className="mt-5 border-t border-line pt-4 text-sm text-ink">
                    <span className="font-semibold text-delta-700">Best when: </span>
                    {m.fit}
                  </p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
