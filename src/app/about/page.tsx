import type { Metadata } from "next";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import Image from "next/image";
import { CtaBand } from "@/components/layout/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  coreStack,
  expertise,
  founderBio,
  founderExperience,
  founderMission,
  founderMotto,
  founderPhoto,
  founderRoles,
  founderStats,
  manuscripts,
  marsResults,
  recognition,
  timeline,
  training,
  ventures,
} from "@/content/founder-profile";
import { founder, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an AI engineering company based in ${site.location}, founded by ${founder.professionalName}: AI engineer, software architect and researcher.`,
  alternates: { canonical: "/about" },
};

const pillarCopy: Record<(typeof site.pillars)[number], string> = {
  People: "Systems are built for the people who use them and the people they affect. Humans approve what matters.",
  Technology: "Proven tools, typed contracts and explicit state, chosen for the problem rather than the trend.",
  Solutions: "Working software in production, not slideware. One complete slice before broad scope.",
  Impact: "A baseline at the start, evidence at the end, and monitoring that keeps the result honest.",
};

function Tri({ className = "fill-delta-600" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 11" className={`mt-1.5 size-2.5 shrink-0 ${className}`}>
      <path d="M6 0 L12 11 L0 11 Z" />
    </svg>
  );
}

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank" className="font-semibold text-delta-700 underline underline-offset-4 hover:text-ink">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function AboutPage() {

  return (
    <>
      {/* Founder hero */}
      <section aria-labelledby="about-h" className="mx-auto max-w-shell px-5 pt-14 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">About · Founder</p>
            <h1 id="about-h" className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {founder.professionalName}
            </h1>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-display text-sm font-semibold tracking-wide text-delta-700">
              {founderRoles.map((r, i) => (
                <span key={r} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="size-1 rotate-45 bg-gold-500" />}
                  {r}
                </span>
              ))}
            </p>
            <p className="mt-2 text-sm text-muted">Founder of {site.name} and Phoenix Group · {site.location}</p>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-2">
              {founderBio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">Work with us</ButtonLink>
              <ButtonLink href={founder.linkedin} variant="glass" target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
              <External href={founder.portfolio}>Portfolio</External>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm px-4 py-6 sm:px-0 lg:max-w-[21rem] xl:max-w-[26rem] min-[96rem]:max-w-[30rem]">
            <div aria-hidden className="absolute inset-0 -z-10 rounded-full sm:-inset-10 bg-[radial-gradient(closest-side,rgb(74_42_138/0.14),transparent)]" />
            <div className="float-bob relative">
              <div aria-hidden className="ring-pulse pointer-events-none absolute -inset-3.5 rounded-[1.9rem] border-2 border-delta-600/20" />
              <div aria-hidden className="ring-pulse ring-pulse-late pointer-events-none absolute -inset-5 sm:-inset-7 rounded-[2.4rem] border border-gold-500/35" />
              <div className="glass overflow-hidden p-2">
                <Image
                  src={founderPhoto.src}
                  width={founderPhoto.width}
                  height={founderPhoto.height}
                  alt={founderPhoto.alt}
                  priority
                  sizes="(min-width: 1024px) 416px, 90vw"
                  className="aspect-[4/5] w-full rounded-[1rem] object-cover"
                />
              </div>
            </div>
            <p className="chip float-bob-chip absolute top-10 -left-10 hidden sm:flex">
              <span className="font-display text-lg font-bold text-delta-700">{founderExperience.ai}</span>
              <span className="font-semibold text-ink">years in AI</span>
              <span className="text-xs text-muted">· {founderExperience.software} in software</span>
            </p>
            <p className="chip float-bob-chip absolute top-1/2 -right-12 hidden sm:flex lg:-right-8 xl:-right-12 [animation-delay:-1.5s]">
              <span aria-hidden className="size-1.5 rotate-45 bg-gold-500" /> MSc AI · NED University
            </p>
            <p className="chip float-bob-chip absolute bottom-12 -left-6 hidden sm:flex [animation-delay:-3s]">
              <span aria-hidden className="pulse-dot size-2 rounded-full bg-delta-600" /> Founder · Delta AI Engineering
            </p>
          </div>
        </div>
      </section>

      {/* Mission banner */}
      <section aria-labelledby="why-h" className="mx-auto mt-24 max-w-shell px-5">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-delta-700 px-6 py-12 text-white sm:px-12 sm:py-16">
          <svg aria-hidden viewBox="0 0 200 180" className="absolute -right-10 -bottom-12 w-72 opacity-15">
            <path d="M100 4 L196 176 L4 176 Z" fill="none" stroke="#c5a467" strokeWidth="2" />
            <path d="M100 52 L156 152 L44 152 Z" fill="none" stroke="#c5a467" strokeWidth="1.5" />
          </svg>
          <p className="font-display text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">Why &ldquo;Delta&rdquo;</p>
          <h2 id="why-h" className="mt-4 max-w-3xl font-display text-3xl font-bold text-balance sm:text-4xl">
            In engineering, Δ means change. We exist to produce a specific, measurable change in how an organisation works, and to prove it happened.
          </h2>
          <figure className="mt-10 max-w-3xl border-l-2 border-gold-500 pl-5">
            <blockquote className="text-lg leading-relaxed text-delta-100">&ldquo;{founderMission}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-white">{founder.professionalName}, founder</figcaption>
          </figure>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Stats */}
      <section aria-labelledby="numbers-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading id="numbers-h" eyebrow="In numbers" title="The work behind the name" />
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {founderStats.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.06} className="glass h-full p-6">
              <dt className="text-sm font-semibold text-ink">{s.label}</dt>
              <dd className="mt-2 font-display text-4xl font-bold text-delta-700">
                {s.value}
              </dd>
              {"highlight" in s && s.highlight ? (
                <dd className="mt-3 inline-flex items-center gap-2 rounded-full bg-delta-700 px-3.5 py-1.5 text-sm font-semibold text-white">
                  <span aria-hidden className="size-1.5 rotate-45 bg-gold-500" />
                  {s.note}
                </dd>
              ) : (
                <dd className="mt-2 text-sm text-muted">{s.note}</dd>
              )}
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Expertise */}
      <section aria-labelledby="expertise-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading
          id="expertise-h"
          eyebrow="Expertise"
          title="What is proven, what is built, what is next"
          lead="Skills are grouped by where they have been used, so production experience is never confused with study."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {expertise.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.08} className="h-full">
              <GlassCard className="h-full p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-ink">{col.title}</h3>
                <p className="text-sm text-muted">{col.lead}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-ink-2">
                      <Tri className={i === 0 ? "fill-delta-700" : i === 1 ? "fill-delta-500" : "fill-gold-500"} />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Career */}
      <section aria-labelledby="career-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading
          id="career-h"
          eyebrow="Career"
          title={`${founderExperience.ai} years in AI, built on ${founderExperience.software} years in software`}
          lead="Applied AI in production is the focus. Enterprise software engineering, practised since December 2010, is the foundation underneath it."
        />
        <div className="mt-12">
          <CareerTimeline entries={timeline} />
        </div>
      </section>

      {/* Ventures */}
      <section aria-labelledby="ventures-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading
          id="ventures-h"
          eyebrow="Ventures"
          title="Phoenix Group"
          lead="Founded in January 2022, Phoenix Group brings together the founder's research, shared AI infrastructure, healthcare and education products. Every product carries its real status."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={(i % 2) * 0.06} className="h-full">
              <GlassCard className="flex h-full flex-col p-6 sm:p-8">
                <p className="font-display text-xs font-semibold tracking-[0.18em] text-delta-700 uppercase">{v.role}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{v.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{v.detail}</p>
                {v.products.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${v.name} products`}>
                    {v.products.map((p) => (
                      <li key={p.name} className="rounded-full bg-white/80 px-3 py-1 text-sm ring-1 ring-ink/10">
                        <span className="font-semibold text-ink">{p.name}</span>
                        <span className="text-muted"> · {p.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {"href" in v && v.href && (
                  <p className="mt-auto pt-5 text-sm">
                    <External href={v.href}>{v.href.replace("https://", "")}</External>
                  </p>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARS-MINDS */}
      <section aria-labelledby="mars-h" className="mx-auto mt-28 max-w-shell px-5">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-ink px-6 py-12 text-white sm:px-12 sm:py-14">
          <div aria-hidden className="absolute inset-0 opacity-30 [background:radial-gradient(40rem_20rem_at_90%_0%,#4a2a8a,transparent_60%)]" />
          <div className="relative">
            <p className="font-display text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">Research · MSc thesis</p>
            <h2 id="mars-h" className="mt-4 font-display text-3xl font-bold sm:text-4xl">MARS-MINDS</h2>
            <p className="mt-1 text-delta-100">Martian Intelligent Navigation and Decision System</p>
            <p className="mt-5 max-w-3xl leading-relaxed text-white/85">
              Deep learning on orbital imagery to classify terrain, find habitat sites, judge landing hazards, plan missions and forecast dust storms. Version 2, in development since March 2026, coordinates five specialist models with a reinforcement-learning controller across 21 public NASA and ESA datasets.
            </p>
            <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {marsResults.map((r) => (
                <div key={r.label} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/15">
                  <dt className="text-sm text-white/80">{r.label}</dt>
                  <dd className="mt-2 font-display text-3xl font-bold text-gold-500">{r.value}</dd>
                  <dd className="mt-1 text-xs text-white/70">{r.model}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs text-white/70">
              Results as reported by the author from thesis experiments. NASA, JPL and ESA imagery is public data; its use does not imply affiliation with any space agency.
            </p>
          </div>
        </div>
      </section>

      {/* Research pipeline */}
      <section aria-labelledby="research-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading
          id="research-h"
          eyebrow="Research pipeline"
          title="Six manuscripts in preparation"
          lead="Targeting Elsevier Q1 (Scopus) and IEEE venues. None is presented as published."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {manuscripts.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <GlassCard className="h-full p-6">
                  <p className="font-display text-xs font-bold text-gold-700">0{i + 1} · In preparation</p>
                  <h3 className="mt-3 font-semibold leading-snug text-ink">{m.title}</h3>
                  <p className="mt-3 text-sm text-muted">{m.focus}</p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">Earlier certificates and publications appear under the name Ruksh E Ibadat.</p>
      </section>

      {/* Recognition and credentials */}
      <section aria-labelledby="recognition-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading id="recognition-h" eyebrow="Recognition and credentials" title="The paper trail" />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink">Recognition and roles</h3>
            <ul className="mt-5 space-y-4">
              {recognition.map((r) => (
                <li key={r.title} className="flex gap-3">
                  <Tri className="fill-gold-500" />
                  <span>
                    <span className="font-semibold text-ink">{r.title}.</span> <span className="text-ink-2">{r.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard className="p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink">Degrees and training</h3>
            <ul className="mt-5 space-y-3 text-ink-2">
              <li className="flex gap-3"><Tri /><span><span className="font-semibold text-ink">MSc Artificial Intelligence</span>, NED University of Engineering and Technology (2023–2025)</span></li>
              <li className="flex gap-3"><Tri /><span><span className="font-semibold text-ink">BS Computer Science</span>, Hamdard University (2007–2010)</span></li>
              {training.map((t) => (
                <li key={t} className="flex gap-3 text-sm"><Tri className="fill-delta-500" />{t}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted">
              Training certificates inform the design of healthcare and special-education products. They do not confer clinical licensure.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Stack and motto */}
      <section aria-labelledby="stack-h" className="mx-auto mt-28 max-w-shell px-5">
        <SectionHeading id="stack-h" eyebrow="Everyday stack" title="Tools she reaches for" />
        <ul className="mt-8 flex flex-wrap gap-2">
          {coreStack.map((t) => (
            <li key={t} className="glass rounded-full px-4 py-2 text-sm font-medium text-ink">{t}</li>
          ))}
        </ul>
        <figure className="mt-16 text-center">
          <blockquote className="mx-auto max-w-2xl font-display text-2xl font-semibold text-balance text-delta-700 sm:text-3xl">
            &ldquo;{founderMotto}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-sm text-muted">{founder.publicName}, personal motto</figcaption>
        </figure>
      </section>

      <section aria-labelledby="where-h" className="mx-auto mt-28 max-w-shell px-5">
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
