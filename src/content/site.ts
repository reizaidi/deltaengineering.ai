/**
 * Site content. Every factual statement here is either about services offered
 * (a commitment, not a claim of past results) or comes from first-party
 * material supplied by the founder. Items marked VERIFY in docs/evidence must be
 * confirmed before launch. Do not add clients, metrics, awards or testimonials
 * without a source record.
 */

export const site = {
  name: "Delta AI Engineering",
  shortName: "Delta AI",
  tagline: "Intelligence for a brighter tomorrow",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://deltaengineering.ai",
  // VERIFY: confirm this mailbox exists before launch.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@deltaengineering.ai",
  location: "Karachi, Pakistan",
  description:
    "Delta AI Engineering designs, builds and operates production AI: agentic systems, retrieval and knowledge platforms, and the cloud engineering beneath them, with human oversight and measurable outcomes.",
  pillars: ["People", "Technology", "Solutions", "Impact"] as const,
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  glyph: "agents" | "retrieval" | "platform" | "eval" | "data" | "strategy";
};

export const services: Service[] = [
  {
    slug: "agentic-systems",
    title: "Agentic systems",
    summary:
      "Multi-agent workflows that plan, call tools and hand off to people at the right moment, built on explicit state so every step can be inspected.",
    outcomes: [
      "Tool use with typed contracts and permission boundaries",
      "Human approval checkpoints for consequential actions",
      "Traces for every run, replayable for debugging",
    ],
    deliverables: ["Workflow graph and state model", "Tool and MCP integrations", "Evaluation suite", "Runbook"],
    glyph: "agents",
  },
  {
    slug: "retrieval-knowledge",
    title: "Retrieval and knowledge",
    summary:
      "Grounded answers from your own documents using hybrid search, semantic reranking and citations people can check.",
    outcomes: [
      "Hybrid keyword and vector retrieval",
      "Reranking tuned on your queries, not a demo set",
      "Answers that cite their sources or decline",
    ],
    deliverables: ["Ingestion pipeline", "Index and reranker", "Answer service with citations", "Quality dashboard"],
    glyph: "retrieval",
  },
  {
    slug: "platform-engineering",
    title: "Cloud and platform engineering",
    summary:
      "The foundation AI runs on: containerised services, CI/CD, infrastructure as code and observability from the first commit.",
    outcomes: [
      "Repeatable environments with Docker and Kubernetes",
      "Automated delivery pipelines with gated releases",
      "Logs, metrics and traces wired before launch",
    ],
    deliverables: ["Reference architecture", "IaC modules", "CI/CD pipelines", "Observability stack"],
    glyph: "platform",
  },
  {
    slug: "evaluation-llmops",
    title: "Evaluation and LLMOps",
    summary:
      "Measure quality, latency and cost continuously so model or prompt changes ship on evidence instead of intuition.",
    outcomes: [
      "Task-specific evaluation sets and graders",
      "Regression gates in CI for prompts and models",
      "Cost and latency budgets per workflow",
    ],
    deliverables: ["Eval harness", "Baseline report", "Release gates", "Monitoring alerts"],
    glyph: "eval",
  },
  {
    slug: "data-analytics",
    title: "Applied data science",
    summary:
      "From raw records to decision-ready reporting, with modelling choices explained in language your stakeholders can act on.",
    outcomes: [
      "Data quality assessment before modelling",
      "Interpretable models where decisions affect people",
      "Reporting designed for the reader, not the analyst",
    ],
    deliverables: ["Data audit", "Model and validation notes", "Dashboards", "Handover session"],
    glyph: "data",
  },
  {
    slug: "ai-strategy",
    title: "AI strategy and architecture",
    summary:
      "A short, structured engagement to decide where AI earns its place, what to build first and what it should cost to run.",
    outcomes: [
      "Use cases ranked by value, feasibility and risk",
      "Build, buy or wait recommendations",
      "Architecture and budget for the first release",
    ],
    deliverables: ["Opportunity map", "Architecture decision records", "Delivery plan", "Risk register"],
    glyph: "strategy",
  },
];

export const lifecycle = [
  {
    id: "discover",
    title: "Discover",
    question: "What change should this system produce, and how will we measure it?",
    detail:
      "We map the workflow, the people in it and the data behind it, then agree a baseline and a success metric before any model is chosen.",
    artefact: "Outcome brief with baseline metric",
  },
  {
    id: "design",
    title: "Design",
    question: "What is the simplest architecture that can meet the target?",
    detail:
      "We choose models, retrieval and tooling against explicit quality, latency and cost budgets, and record each decision so it can be revisited.",
    artefact: "Architecture decision records",
  },
  {
    id: "build",
    title: "Build",
    question: "Can we ship a thin, complete slice end to end?",
    detail:
      "One production-shaped vertical slice first, with typed contracts, tests and observability, before widening scope.",
    artefact: "Working vertical slice",
  },
  {
    id: "evaluate",
    title: "Evaluate",
    question: "Does it beat the baseline on the cases that matter?",
    detail:
      "Task-specific evaluations, red-team prompts and human review run on every change. Nothing ships on a demo alone.",
    artefact: "Evaluation report and release gate",
  },
  {
    id: "operate",
    title: "Operate",
    question: "Is it still delivering the change we agreed?",
    detail:
      "Monitoring, cost tracking and a feedback loop keep the system honest after launch, with a named owner for every alert.",
    artefact: "Runbook and live dashboard",
  },
] as const;

export type LifecycleStageId = (typeof lifecycle)[number]["id"];

export const principles = [
  {
    title: "Measured, not assumed",
    body: "Every engagement starts with a baseline and ends with a comparison against it.",
  },
  {
    title: "People stay in control",
    body: "Consequential actions pause for human approval. Automation earns autonomy gradually.",
  },
  {
    title: "Explicit over clever",
    body: "State machines, typed contracts and written decisions make systems easier to trust and to change.",
  },
  {
    title: "Budgets are features",
    body: "Quality, latency and cost targets are agreed up front and tracked like any other requirement.",
  },
];

export const engagementModels = [
  {
    title: "Discovery sprint",
    body: "A fixed, short engagement that ends with a ranked opportunity map, an architecture and a costed plan.",
    fit: "You know AI could help but not where to start.",
  },
  {
    title: "Build a vertical slice",
    body: "One production-ready workflow, delivered end to end with evaluation and monitoring.",
    fit: "You have a priority use case and want it live.",
  },
  {
    title: "Embedded engineering",
    body: "Our engineers join your team to deliver, review and mentor, with shared ownership of outcomes.",
    fit: "You are scaling AI work and need senior capacity.",
  },
];

/**
 * Founder profile. Source: first-party material supplied by the founder
 * (see docs/evidence-register.md). Career length is computed, not hard-coded.
 */
export const founder = {
  publicName: "REI ZAIDI",
  professionalName: "REI I. ZAIDI",
  role: "Founder",
  careerStart: new Date("2010-12-01"),
  linkedin: "https://linkedin.com/in/reizaidi",
  portfolio: "https://ruksheibadat.com",
  focus: [
    "Multi-agent systems and LLM orchestration",
    "Retrieval-augmented generation and reranking",
    "Enterprise software and cloud architecture",
    "Applied data science for healthcare and inclusive education",
  ],
};

export function yearsSince(start: Date, now = new Date()): number {
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}
