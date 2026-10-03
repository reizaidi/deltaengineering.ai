import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { DeltaMethod } from "@/components/motion/DeltaMethod";
import { Reveal } from "@/components/motion/Reveal";
import { TradeoffTriangle } from "@/components/motion/TradeoffTriangle";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/content/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "The Delta Method: discover, design, build, evaluate, operate. How we keep AI systems measurable, inspectable and under human control.",
  alternates: { canonical: "/approach" },
};

const gates = [
  { metric: "Task quality", how: "Graded evaluation set built from your real cases, compared with the agreed baseline." },
  { metric: "Groundedness", how: "Share of answers fully supported by cited sources; unsupported claims block release." },
  { metric: "Latency", how: "p50 and p95 end-to-end response time against the agreed budget." },
  { metric: "Cost per task", how: "Model, retrieval and infrastructure cost per completed task, tracked per release." },
  { metric: "Safety", how: "Red-team prompts, permission checks on tools and human approval for consequential actions." },
  { metric: "Operability", how: "Traces, alerts and a runbook in place, with a named owner, before go-live." },
];

const toolbox = [
  "LangGraph", "Model Context Protocol", "pgvector", "Hybrid search + rerankers", "LangSmith",
  "Docker", "Kubernetes", "GitHub Actions", "LoRA / QLoRA fine-tuning", "Next.js", "Connect RPC", "XState",
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="Measurable, inspectable, and under human control."
        lead="The Delta Method keeps every AI engagement honest: agree the change, build the simplest system that can produce it, prove it, and keep proving it."
      />

      <section aria-labelledby="stages-h" className="mx-auto mt-16 max-w-shell px-5">
        <h2 id="stages-h" className="sr-only">Stages</h2>
        <DeltaMethod />
      </section>

      <section aria-labelledby="gates-h" className="mx-auto mt-32 max-w-shell px-5">
        <SectionHeading
          id="gates-h"
          eyebrow="Release gates"
          title="What has to be true before anything ships."
          lead="These gates are set per engagement. The numbers come from your baseline, never from a generic benchmark."
        />
        <div className="mt-10 overflow-hidden rounded-[var(--radius-glass)] ring-1 ring-line">
          <table className="w-full border-collapse bg-white/80 text-left text-sm">
            <caption className="sr-only">Release gates and how each is measured</caption>
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-display font-bold text-ink sm:w-56">Gate</th>
                <th scope="col" className="px-5 py-4 font-display font-bold text-ink">How it is measured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {gates.map((g) => (
                <tr key={g.metric}>
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-ink">{g.metric}</th>
                  <td className="px-5 py-4 text-ink-2">{g.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="tradeoff2-h" className="mx-auto mt-32 max-w-shell px-5">
        <SectionHeading id="tradeoff2-h" eyebrow="Budgets" title="Quality, latency and cost are design inputs." />
        <Reveal className="mt-10">
          <TradeoffTriangle />
        </Reveal>
      </section>

      <section aria-labelledby="principles2-h" className="mx-auto mt-32 max-w-shell px-5">
        <SectionHeading id="principles2-h" eyebrow="Principles" title="How we make decisions." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title}>
              <GlassCard className="h-full p-6">
                <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
              </GlassCard>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tools-h" className="mx-auto mt-32 max-w-shell px-5">
        <SectionHeading
          id="tools-h"
          eyebrow="Toolbox"
          title="Tools we work with."
          lead="Chosen per project against your constraints. We are not resellers or certified partners of any vendor listed."
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {toolbox.map((t) => (
            <li key={t} className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/10">{t}</li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
