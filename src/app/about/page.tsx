import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { DeltaMark } from "@/components/brand/DeltaMark";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { founder, site, yearsSince } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an AI engineering company based in ${site.location}. Founded by ${founder.professionalName}.`,
  alternates: { canonical: "/about" },
};

const pillarCopy: Record<(typeof site.pillars)[number], string> = {
  People: "Systems are built for the people who use them and the people they affect. Humans approve what matters.",
  Technology: "Proven tools, typed contracts and explicit state, chosen for the problem rather than the trend.",
  Solutions: "Working software in production, not slideware. One complete slice before broad scope.",
  Impact: "A baseline at the start, evidence at the end, and monitoring that keeps the result honest.",
};

export default function AboutPage() {
  const years = yearsSince(founder.careerStart);
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Why &ldquo;Delta&rdquo;?</>}
        lead="In engineering, Δ means change. We exist to produce a specific, measurable change in how an organisation works, and to prove it happened."
      />

      <section aria-labelledby="pillars-h" className="mx-auto mt-16 max-w-6xl px-5">
        <h2 id="pillars-h" className="sr-only">Our pillars</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.pillars.map((p, i) => (
            <li key={p}>
              <Reveal delay={i * 0.06} className="h-full">
                <GlassCard className="h-full p-6">
                  <p className="font-display text-xs font-bold tracking-[0.3em] text-delta-700">{p.toUpperCase()}</p>
                  <p className="mt-4 leading-relaxed text-ink-2">{pillarCopy[p]}</p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="founder-h" className="mx-auto mt-32 max-w-6xl px-5">
        <GlassCard className="grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative flex aspect-square max-w-sm items-center justify-center rounded-2xl bg-gradient-to-br from-white to-delta-50 ring-1 ring-ink/5">
            <DeltaMark idPrefix="fd" className="w-1/2" />
          </div>
          <div>
            <SectionHeading
              id="founder-h"
              eyebrow="Founder"
              title={founder.professionalName}
              lead={`AI engineer and software architect with ${years}+ years in software, from enterprise engineering and cloud architecture to production AI. She founded ${site.name} to bring that engineering discipline to applied AI: reliable execution, human oversight and measurable outcomes.`}
            />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {founder.focus.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-2">
                  <svg aria-hidden viewBox="0 0 12 11" className="mt-1 size-3 shrink-0"><path d="M6 0 L12 11 L0 11 Z" fill="#c90e17" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
              <a href={founder.linkedin} rel="noopener noreferrer" target="_blank" className="text-delta-700 underline underline-offset-4 hover:text-ink">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={founder.portfolio} rel="noopener noreferrer" target="_blank" className="text-delta-700 underline underline-offset-4 hover:text-ink">
                Portfolio<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </GlassCard>
      </section>

      <section aria-labelledby="where-h" className="mx-auto mt-32 max-w-6xl px-5">
        <SectionHeading
          id="where-h"
          eyebrow="Where we work"
          title={`Based in ${site.location}. Working across time zones.`}
          lead="We work remotely with teams in other regions, with overlap hours agreed at the start of every engagement."
        />
      </section>

      <CtaBand />
    </>
  );
}
