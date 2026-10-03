/**
 * Founder profile for the About page.
 *
 * Source: REI I. ZAIDI's own CV (LinkedIn export, Oct 2026) and her
 * "Portfolio 2026–2027" PDF, supplied by her on 2026-10-03. These are
 * first-party records: accuracy figures are her reported thesis results,
 * manuscripts are "in preparation", product statuses are as she labels them,
 * and training certificates are not clinical licensure. See
 * docs/evidence-register.md before adding anything new.
 */

export const founderPhoto = {
  // Replace this file to change the photo. Keep a 4:5 portrait (800 x 1000 px).
  src: "/brand/founder.jpg",
  width: 800,
  height: 1000,
  alt: "REI I. ZAIDI, founder of Delta AI Engineering",
};

export const founderRoles = [
  "AI engineer",
  "Applied data scientist",
  "Software architect",
  "Researcher",
];

export const founderBio = [
  "REI I. ZAIDI designs enterprise AI systems that connect models, knowledge, tools and business workflows, with reliable execution, human oversight and measurable outcomes.",
  "Her career began in December 2010 in .NET delivery teams and moved through enterprise SharePoint, Azure and Power Platform architecture to production generative AI. At Infixio she is a Senior AI Engineer and Applied Data Scientist, leading multi-agent LLM, retrieval and computer-vision platforms across Claude, GPT, Gemini and Mistral, with evaluation gates, tracing and cost guardrails.",
];

export const founderMission =
  "My mission is to translate research into accountable AI systems, sustainable businesses and international collaborations.";

/** Experience figures as stated by Rei (3 Oct 2026); they count active practice years, so they are not recomputed from December 2010. */
export const founderExperience = { software: "11+", ai: "5+" } as const;

export const founderMotto = "Neither a jack of all nor a king of one, but a king of all.";

/** Each stat names its source in the note so the figure can be traced. */
export const founderStats = [
  { value: "11+", label: "Years in software", note: "Including 5+ years in AI", highlight: true },
  { value: "27", label: "Systems catalogued", note: "From live products to concepts, each with a status" },
  { value: "4,460", label: "Screening records analysed", note: "Autism-screening BI, Phoenix Minds, 2024" },
  { value: "58", label: "Languages in product", note: "DRIS and LUMINA, with right-to-left support" },
  { value: "21", label: "Public Mars datasets", note: "NASA and ESA imagery, MARS-MINDS v2" },
  { value: "6", label: "Manuscripts in preparation", note: "Elsevier Q1 and IEEE targets" },
] as const;

export const expertise = [
  {
    title: "In production",
    lead: "Delivered in production or client work",
    items: [
      "LangGraph multi-agent systems",
      "Human-in-the-loop control planes",
      "MCP servers and tool use",
      "Enterprise RAG with semantic reranking",
      "Provider-agnostic model routing",
      "Regression-evaluation release gates",
      "FastAPI, PostgreSQL and pgvector",
      "Docker, Kubernetes and GitHub Actions",
      "LangSmith observability",
      ".NET, SharePoint, Azure and Power Platform",
    ],
  },
  {
    title: "Products and research",
    lead: "Built in products, prototypes, research or coursework",
    items: [
      "Refusal-aware routing with human review",
      "BM25 + FAISS hybrid retrieval",
      "Neo4j knowledge graphs",
      "PEFT, LoRA, QLoRA and DPO",
      "Computer vision for planetary imagery",
      "NVIDIA Triton serving",
      "A2A protocol hand-offs",
      "Multilingual and right-to-left NLP",
    ],
  },
  {
    title: "Exploring now",
    lead: "Current study",
    items: [
      "Deep Agents",
      "Temporal durable execution",
      "gVisor sandboxing",
      "Inspect AI evaluations",
      "OpenTelemetry tracing",
      "vLLM, batching and quantisation",
    ],
  },
] as const;

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  detail: string;
  kind: "engineering" | "ai" | "venture" | "education";
};

export const timeline: TimelineEntry[] = [
  {
    period: "2007 – 2010",
    title: "BS Computer Science",
    org: "Hamdard University, Karachi",
    detail: "The foundation for an engineering career that began the month she graduated.",
    kind: "education",
  },
  {
    period: "Dec 2010 – Jul 2015",
    title: "Junior Software Engineer → Software Engineer",
    org: "Techerz IT Consultancy Firm",
    detail:
      "ASP.NET and C# delivery, testing and deployment; later led .NET web teams, wrote specifications, ran technical interviews and set coding standards.",
    kind: "engineering",
  },
  {
    period: "Aug 2015 – Jan 2019",
    title: "Senior Software Engineer",
    org: "ExaTex Enterprise Solutions",
    detail:
      "Full-lifecycle delivery of SharePoint and Project Server solutions, business-process automation, intranets and portals.",
    kind: "engineering",
  },
  {
    period: "Feb 2019 – Oct 2023",
    title: "Lead Software Engineer → Software Architect",
    org: "Learning Pitch",
    detail:
      "Led enterprise teams, then architected secure, scalable systems on Azure, SharePoint and the Power Platform, with pre-sales and technical consulting.",
    kind: "engineering",
  },
  {
    period: "Jan 2022 – present",
    title: "Founder",
    org: "Phoenix Group",
    detail:
      "A research and AI group spanning applied research, shared AI infrastructure, healthcare and special-education AI, and commercial AI products.",
    kind: "venture",
  },
  {
    period: "Jan 2023 – Dec 2025",
    title: "MSc Artificial Intelligence",
    org: "NED University of Engineering and Technology",
    detail:
      "Department of Computer and Information Systems Engineering. Thesis: MARS-MINDS, deep learning analysis of spaceborne sensor data for the origins of Martian dust storms.",
    kind: "education",
  },
  {
    period: "Nov 2023 – present",
    title: "Senior AI Engineer and Applied Data Scientist",
    org: "Infixio",
    detail:
      "Architecture and hands-on delivery of multi-agent LLM, RAG and computer-vision platforms, with structured-output validation, regression evaluation and cost controls.",
    kind: "ai",
  },
];

export const ventures = [
  {
    name: "Phoenix Research and AI Systems",
    role: "Research and development",
    detail: "Applied AI research and technology evaluation, home of the MARS-MINDS programme.",
    products: [{ name: "MARS-MINDS v2", status: "In development" }],
  },
  {
    name: "Phoenix Nexus",
    role: "Shared AI infrastructure",
    detail: "Model orchestration, evaluation tooling and platform services shared across the group.",
    products: [],
  },
  {
    name: "Phoenix Minds",
    role: "Healthcare and special-education AI",
    detail: "Clinical and education tools built so that professionals, not models, make the decisions.",
    href: "https://phoenixmindsai.com",
    products: [
      { name: "DRIS", status: "v1.0 live" },
      { name: "Zeta-9", status: "Operating network" },
      { name: "RAHAT-AI", status: "Prototype" },
    ],
  },
  {
    name: "Phoenix AI-AAS",
    role: "Commercial AI products",
    detail: "AI-as-a-service products for education, finance and enterprise operations.",
    products: [
      { name: "TALEEM", status: "MVP delivered" },
      { name: "LUMINA", status: "Active build" },
      { name: "Phoenix Sentinel", status: "Prototype delivered" },
      { name: "Phoenix Horizon", status: "Active build" },
    ],
  },
] as const;

export const marsResults = [
  { value: "99.91%", label: "25-class mission-planning classification", model: "EfficientNetV2 + ConvNeXtV2" },
  { value: "F1 0.97", label: "Safe-landing hazard identification", model: "MarsLanderNet, DenseNet121" },
  { value: "94.00%", label: "8-class terrain and dust-storm classification", model: "InceptionV3" },
  { value: "mAP 0.681", label: "Habitat-site detection", model: "AstroVisionNet, Faster R-CNN" },
] as const;

export const manuscripts = [
  { title: "Automated Mars Feature Classification Using InceptionV3 for Enhanced Planetary Surface Analysis", focus: "InceptionV3 · 8-class terrain" },
  { title: "MarsLanderNet: A DenseNet-Based Framework for Autonomous Safe Landing on Martian Terrain", focus: "DenseNet121 · landing hazards" },
  { title: "AstroVisionNet: AI-Driven Martian Terrain Classification for Habitat Construction and Dust Storm Risk Mitigation", focus: "Faster R-CNN + ResNet-50 · habitats" },
  { title: "Parallel Dual-Backbone Image Classification for Mars Mission Planning: EfficientNetV2 & ConvNeXtV2", focus: "Dual-backbone fusion · 25-class" },
  { title: "Mars Dust Storm Forecast", focus: "Faster R-CNN + ConvLSTM · multi-sol forecasting" },
  { title: "MARS-MINDS v1 and v2: integrated five-model frameworks", focus: "Navigation, habitat, landing, planning, dust risk" },
] as const;

export const recognition = [
  {
    title: "ASPIRE Pakistan, National Idea Bank IV",
    detail: "Pre-incubation Rank #1 finalist for Zeta-9, among 24 start-ups selected from 800 applications.",
  },
  {
    title: "AQLENTIS AI residency",
    detail: "Co-Team Lead of a 12-week AI residency with NCBC and HPCC, NED University (Batch 1, from September 2026).",
  },
] as const;

export const training = [
  "GenAI to Agentic AI: Full-Stack Development · NCBC, HPCC and NED University (2026)",
  "Postgraduate Certificate in Data Analytics and Data Mining · NED Academy (2022)",
  "Diploma in Early Childhood Education and Development · IECED Karachi (2017–2018)",
  "Skills-based CBT and DBT courses · MedicPro International Academy (2025–2026)",
] as const;

export const coreStack = [
  "Python",
  "TypeScript",
  "LangGraph",
  "MCP",
  "FastAPI",
  "PostgreSQL",
  "pgvector",
  "Neo4j",
  "PyTorch",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "LangSmith",
  "Azure",
  "Next.js",
] as const;
