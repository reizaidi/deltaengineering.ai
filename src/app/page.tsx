import Link from "next/link";
import { HeroDelta } from "@/components/motion/HeroDelta";
import { DeltaMethod } from "@/components/motion/DeltaMethod";
import { RetrievalDemo } from "@/components/motion/RetrievalDemo";
import { Reveal } from "@/components/motion/Reveal";
import { TradeoffTriangle } from "@/components/motion/TradeoffTriangle";
import { CtaBand } from "@/components/layout/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { principles, services, site } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* Hero: text is server-rendered and never animated in, so it can paint as LCP immediately. */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24">
        <div>
          <p className="eyebrow">{site.tagline}</p>
          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-ink text-balance sm:text-6xl lg:text-[4.1rem]">
            Production AI, engineered for <span className="text-delta-500">measurable</span> change.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            We design, build and operate agentic systems, retrieval platforms and the cloud engineering beneath them.
            Every engagement starts with a baseline and ends with evidence.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/approach" variant="glass">
              See how we work
            </ButtonLink>
          </div>
          <ul className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold tracking-[0.3em] text-muted" aria-label="Our pillars">
            {site.pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="h-3 w-px bg-gold-500" />}
                {p.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        <HeroDelta />
      </section>

      {/* Services */}
      <section aria-labelledby="services-h" className="mx-auto mt-32 max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            id="services-h"
            eyebrow="What we build"
            title="Six capabilities, one standard of evidence."
            lead="From the first architecture decision to the dashboard that proves the system still works."
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <GlassCard className="group h-full p-6 transition-transform duration-500 ease-[var(--ease-delta)] hover:-translate-y-1">
                  <ServiceGlyph glyph={s.glyph} />
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">
                    <Link href={`/services#${s.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{s.summary}</p>
                  <span aria-hidden className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-delta-700">
                    Details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Trade-offs */}
      <section aria-labelledby="tradeoff-h" className="mx-auto mt-32 max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            id="tradeoff-h"
            eyebrow="Quality · Latency · Cost"
            title="Every AI system is a trade-off. We make it explicit."
            lead="Move the marker to see how priorities change the architecture. In a real engagement these budgets are agreed in writing and tracked like any other requirement."
          />
        </Reveal>
        <Reveal className="mt-10">
          <TradeoffTriangle />
        </Reveal>
      </section>

      {/* Retrieval */}
      <section aria-labelledby="rag-h" className="mx-auto mt-32 grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading
            id="rag-h"
            eyebrow="Grounded answers"
            title="Answers that show their sources, or admit they have none."
            lead="Hybrid retrieval finds candidates by keyword and meaning. A reranker scores each passage against the question. Only passages that clear the bar reach the model, and every claim is cited."
          />
        </Reveal>
        <Reveal>
          <RetrievalDemo />
        </Reveal>
      </section>

      {/* Method */}
      <section aria-labelledby="method-h" className="mx-auto mt-32 max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            id="method-h"
            eyebrow="The Delta Method"
            title="Five stages. Each one answers a question and leaves evidence behind."
          />
        </Reveal>
        <Reveal className="mt-10">
          <DeltaMethod />
        </Reveal>
        <div className="mt-6">
          <ButtonLink href="/approach" variant="ghost" arrow className="px-0">
            Read the full approach
          </ButtonLink>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-h" className="mx-auto mt-32 max-w-6xl px-5">
        <h2 id="principles-h" className="sr-only">Principles</h2>
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-glass)] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.title} className="bg-white/80 p-6">
              <span className="font-display text-xs font-bold text-delta-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-base font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
