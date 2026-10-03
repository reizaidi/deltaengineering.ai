# Delta AI Engineering website: research, recommendation and build report

Prepared 2026-10-03 for Rei (REI I. ZAIDI). Revised the same day for the deep-violet identity (COLOUR-CONCEPT.txt). Every version, price and standard below was checked on 2026-10-03; sources and confidence levels are in [`evidence-register.md`](evidence-register.md). "Top 0.1%" is treated as an aspiration throughout: nothing here claims a ranking, and every score is an internal rubric score with its evidence.

---

## 1. Executive recommendation

Build the Delta AI Engineering site as a statically prerendered Next.js 16 application with an original light "Delta Glass" theme, three explainer animations that teach how the company works, and one typed server endpoint (Connect RPC) for inquiries. That is what has been built and tested here.

What sets it apart from the six competitor sites reviewed: they all lead with "AI-native" or "agentic" slogans and rely on client logos. Delta has no published clients yet, so the site earns trust a different way, by showing its engineering judgement interactively:

1. **Trade-off triangle**: visitors drag a marker between quality, latency and cost and watch the recommended architecture change.
2. **Grounded-answer pipeline**: hybrid retrieval, reranking and a cited answer, step by step.
3. **The Delta Method**: a five-stage tour (Discover, Design, Build, Evaluate, Operate) driven by an XState machine, each stage naming the evidence it leaves behind.

Measured results (local lab, details in section 11): Lighthouse Accessibility, Best Practices and SEO are 100 on nearly every page; Performance is 100 on desktop and 87 to 96 on simulated mobile; zero axe WCAG 2.2 AA violations on 7 pages at desktop and mobile sizes; 42 automated tests pass. The one target missed is simulated mobile LCP (2.8 to 3.1 s against a 2.5 s budget).

Three decisions need you before launch: confirm the name risk (section 5), confirm the founder facts (section 2), and set up the inquiry mailbox.

## 2. Assumptions and essential open questions

| # | Assumption used | Why it matters | Reversible? |
|---|---|---|---|
| A1 | Scope is research, design and build; web only | Tauri desktop marked "not required at launch" | Yes |
| A2 | Company name stays "Delta AI Engineering"; naming work covers the method and platform names inside it | Renaming is a business decision | Yes |
| A3 | Corporate software-house site with a short founder section, not a personal portfolio | Shapes IA and copy | Yes |
| A4 | REI I. ZAIDI is the founder of Delta AI Engineering | The About page says so | Yes, one line in `src/content/site.ts` |
| A5 | Location shown as Karachi, Pakistan | From your profile | Yes |
| A6 | Contact address `hello@deltaengineering.ai` | **Mailbox not verified to exist** | Yes, env var |
| A7 | No clients, case studies, metrics, awards or testimonials are published | None were supplied; inventing them is excluded | Add when you have permission and records |

**Open questions (one word answers are enough):**

1. Do you own `deltaengineering.ai`? (It is registered on Cloudflare DNS with no site live; owner could not be checked from here.)
2. Is Delta AI Engineering a Phoenix Group company, or separate? The site currently does not mention Phoenix Group.
3. Which founder facts may be published? The About page uses only: AI engineer and software architect, career since December 2010 (computed as 15+ years today), and four focus areas. Degrees, employers and publications are deliberately left off until you confirm them.
4. Can any past work be named as a case study, with the client's written permission?

## 3. Research findings and evidence register

Full register with URLs, dates, limitations and confidence: [`evidence-register.md`](evidence-register.md). The findings that changed the build:

| Finding | Type | Effect on the build |
|---|---|---|
| Next.js 16.3.8 is current; 16.0 made Turbopack the default and replaced `middleware.ts` with `proxy.ts` | Verified fact | Used 16.3.8, no middleware needed |
| `@connectrpc/connect-next` documents only the Pages Router and pulls in `connect-node` (Node ≥ 22) | Verified fact | Mounted Connect's universal fetch handler on an App Router Route Handler instead; no extra adapter |
| Motion's package is `motion`, imported from `motion/react`; v14.0.0 shipped 2026-10-02 with only internal API removals | Verified fact | Used `motion@14.0.0`; watch for early patches |
| Tailwind v4 needs Safari 16.4, Chrome 111, Firefox 128, stricter than Next's Firefox 111 | Verified fact | Effective browser floor is Firefox 128 |
| TypeScript 7 works with `next build` only through an experimental flag Next marks "not recommended for production" | Verified fact | Stayed on TypeScript 5 (the create-next-app default) |
| Apple's HIG says Liquid Glass belongs to the controls layer, not content, and "use sparingly"; NN/g and MacRumors report legibility complaints | Verified fact | Glass used for navigation, cards and panels with high-opacity fills; opaque under `prefers-reduced-transparency`, `prefers-contrast: more` and when `backdrop-filter` is unsupported |
| "Liquid Glass" is Apple's term | Inference | The site's system is called Delta Glass and copies no Apple assets |
| CWV "good" thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75 | Verified fact | Adopted as budgets |
| WCAG 2.2 (Dec 2024 edition) is current; WCAG 3 is an incomplete draft | Verified fact | Target WCAG 2.2 AA |
| `backdrop-filter` became Baseline only in Sep 2024 | Verified fact | Fallbacks are required, not optional |

## 4. Competitive comparison and differentiation

Observed on 2026-10-03 from homepages only; nothing here describes their private architecture or results.

| Site | Lead message (observed) | Proof shown | CTA |
|---|---|---|---|
| Thoughtworks | "We do AI that works" | Case studies, named client | Get in touch |
| Netguru | "AI-native commerce" | Named client logos | Estimate project |
| 10Clouds | "Agentic financial institutions" | Case studies with metrics, Clutch rating | Talk to our team |
| 10Pearls | "AI-Native Global Digital Engineering Partner" | Case studies | Discovery call |
| Arbisoft | "Engineering Software Solutions Since 2007" | KAYAK, edX stories | Scoping form with budget |
| Systems Limited | "AI-native technology" | Scale claims, insights | Get in touch |

**Gap Delta can take:** none of them lets a visitor see how they make engineering trade-offs. Delta's site shows its method, budgets and release gates in the open, and says plainly what it will not claim. The differentiators are the three explainers, published release gates (Approach page), and an honest inquiry flow that tells the visitor what happens next.

**Gap Delta must close:** every competitor shows named work. Case studies are the highest-value addition once you have permission (section 12).

## 5. Name shortlist and recommended identity

**Name risk on the company name (important).** Screening found an AI consultancy called "Delta AI" in Madrid (delta-ai.com) offering overlapping services, plus "Delta AI Solutions" in Brazil, and two AI products named "Delta AI". This is search screening only, not trademark clearance. Recommendation: always use the full "Delta AI Engineering" (never "Delta AI" alone), and have a trademark attorney search Pakistan IPO, WIPO, EUIPO and USPTO before investing further in the brand.

**Names inside the brand** (for the method, the design system and a future product line). Only the top three were screened, and only by web search on 2026-10-03; domains and handles were not checked because the sandbox blocks registry lookups.

| Name | Use | Notes |
|---|---|---|
| **The Delta Method** (recommended, in use) | Delivery methodology | Plain, ties Δ to "measurable change"; generic phrase, so a descriptor rather than a trademark |
| **Delta Glass** (in use) | Design system name | Avoids Apple's "Liquid Glass" term |
| **Vertex** | Product line (e.g. Delta Vertex evaluation tooling) | Crowded word in AI (Google Vertex AI); not recommended |
| Trigon | Product line | Not screened |
| Facet | Retrieval product | Not screened |
| Apex Gate | Release-gate tooling | Not screened |
| Fulcrum | Trade-off advisor | Not screened |
| Keel | Platform engineering offer | Not screened |

**Identity:** positioning "Production AI, engineered for measurable change"; tagline "Intelligence for a brighter tomorrow" (from your logo); voice: plain, specific, evidence-first, no superlatives. Visual direction (revised 2026-10-03): the deep-violet ribbon mark and ink wordmark on a near-white canvas, primary violet #24124D, ink #100C20, silver #E5E7EB, and muted gold #C5A467 used sparingly; a fine engineering grid and triangle geometry instead of curves or waves. No bright purple, pink, neon or glow.

## 6. Product scope, user journeys and success metrics

**Launch scope (built):** Home, Services, Approach, About (with founder section), Contact (working form), Privacy, 404, sitemap, robots, manifest, Open Graph image, JSON-LD Organization.

**Later:** case studies, insights/blog, careers, Urdu localisation, analytics dashboard.

| Visitor | Journey | What the site gives them |
|---|---|---|
| Enterprise buyer | Home → Services → Approach → Contact | Capabilities, deliverables, release gates, low-friction form |
| Technical evaluator | Home explainers → Approach toolbox | Evidence of engineering judgement |
| Partner or recruiter | About → founder links | Mission, pillars, founder profile |

| Metric | Target (proposed) | How to measure |
|---|---|---|
| Qualified inquiries | Baseline in first 60 days, then set target | Inquiry references in email |
| Contact conversion | Baseline first | Privacy-friendly analytics (Plausible) |
| Core Web Vitals (field) | p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 | Search Console CrUX once traffic exists |
| Accessibility | 0 axe violations in CI | Playwright + axe on every PR |

## 7. Verified technology stack and compatibility

| Purpose | Choice | Version / status (2026-10-03) | Why | Alternatives | Cost | Trade-off |
|---|---|---|---|---|---|---|
| Framework | Next.js App Router | 16.3.8, stable | Static prerender + one server route; your preferred stack | Astro, Remix | Free | Larger JS than Astro for a mostly static site |
| UI | React | 19.2.8 in lockfile (19.3.0 also compatible) | Required by Next | — | Free | — |
| Styling | Tailwind CSS v4 | 4.x | Tokens in CSS via `@theme` | CSS Modules | Free | Firefox 128 floor |
| Motion | Motion (`motion/react`) | 14.0.0 (1 day old) | Layout animations, spring physics, reduced-motion support | CSS only, GSAP | Free | ~45 KB gzip chunk |
| Workflow state | XState 5 + @xstate/react 6 | 5.33.2 / 6.1.0 | Inquiry form and tour have real states (submitting, failure, retry, paused) | useReducer | Free | Overkill for trivial state, so used only where states matter |
| Contracts | Protobuf + Connect RPC | connect 2.2.0, protobuf-es 2.16.0, buf 1.73.0 | Typed, versioned API; JSON on the wire, debuggable with curl | Server Actions, tRPC | Free | Codegen step; App Router adapter not official, so handler is mounted manually |
| Validation | zod/mini | 4.6.5 | Same rules on client and server; mini cut the contact page bundle from 128 KB to 54 KB gzip | valibot | Free | — |
| Email | Resend HTTP API | Free tier 3,000/month | No SDK needed | Postmark, SES | $0 at launch | Vendor dependency |
| Analytics | Plausible (recommended, not wired) | $9/month for 10k views | No cookies, keeps the privacy notice true | GA4 | $9/month | Paid |
| Hosting | Vercel Pro, or Cloudflare Workers + OpenNext | Pro $20/month incl. 1 seat; Workers free tier 100k req/day | Vercel is zero-config for Next; Cloudflare is cheapest | Netlify | $0 to $20/month | Vercel Hobby is non-commercial only |
| Desktop | Tauri v2 | 2.12.1 | **Not required at launch.** A marketing site gains nothing from a desktop app, and Tauri needs static export, which drops the inquiry API | — | — | Revisit if a client-facing tool ships |
| Data store, auth, search, jobs, payments | — | — | **Not required at launch** | — | — | — |
| Tests | Vitest, Playwright, axe-core, Lighthouse | 5.0.3, 1.63.0, 4.13.0, 13.5.0 | Unit, e2e, accessibility and performance in one pipeline | — | Free | — |
| CI | GitHub Actions workflow included | Not yet run (no repo linked) | lint, typecheck, buf lint and breaking check, tests, build, e2e | — | Free tier | — |

**Rendering and boundaries.** Every page is static (`○` in the build output). Client components are limited to interactive parts: header, explainers, form and page transition. Copy lives in server components. XState holds workflow state (form lifecycle, tour); local UI state stays in `useState`; server data is a single RPC call with no client cache needed.

**Connect specifics.** Connect protocol with JSON, POST only, 64 KB request cap, gRPC and gRPC-web disabled. Schema evolution: package `delta.v1`, additive fields only, `buf breaking` runs in CI. No authentication (public form); abuse controls are a honeypot, a per-IP rate limit and idempotency keys.

## 8. Architecture and Delta Glass design specification

```
Browser ──static HTML/CSS/JS (CDN)──> pages: / services approach about contact privacy
   │
   └─ POST /api/delta.v1.InquiryService/SubmitInquiry  (Connect, JSON)
          └─ Route Handler → Connect router → submitInquiry()
                 ├─ rate limit (per IP, 5 per 10 min)   ├─ honeypot
                 ├─ idempotency key de-duplication       ├─ zod validation
                 └─ Resend email  (or "unavailable" if not configured)
```

**Tokens** (`src/app/globals.css`, deep-violet identity):

| Token | Value | Use | Contrast on white / canvas #F6F6F9 |
|---|---|---|---|
| ink | #100C20 | Headings, primary buttons | 19.17 / 17.77 |
| ink-2 | #2A2540 | Body text | 14.61 / 13.55 |
| muted | #5A5670 | Captions | 7.00 / 6.49 |
| delta-700 (primary violet) | #24124D | Eyebrows, links, CTA band field | 16.55 / 15.35 |
| delta-600 | #3B2380 | Focus ring, active states, accents | 12.08 / 11.20 |
| delta-500 | #4A2A8A | Hero highlight word, fills | 10.56 / 9.79 |
| silver / line | #E5E7EB | Borders, dividers | decorative |
| gold-500 | #C5A467 | Separators, progress, data points; CTA button on violet (ink text 8.11:1) | **2.36 / 2.19, fails as text on light, so never used for text there** |
| gold-700 | #7A5F26 | Reserved for gold text on light if ever needed | 6.01 / 5.57 |
| danger-700 | #B42318 | Form errors only (functional, not brand) | 6.57 / 6.05 |

On the violet CTA field: white 16.55:1, lavender #D9D2EF body text 11.36:1, gold accent 6.5:1.

Type: Montserrat 500 to 800 for display (closest Google font to the wordmark), Inter for text. Radius 20 px for glass, pill buttons, 44 px minimum targets.

**Glass recipe:** 160° white gradient at 74% → 50% opacity, `backdrop-filter: blur(20px) saturate(170%)`, a white top highlight, a faint navy edge, and a soft shadow. A pointer-following specular highlight runs in `requestAnimationFrame` with no React re-renders. Fallbacks go fully opaque for no `backdrop-filter`, `prefers-reduced-transparency`, `prefers-contrast: more`, and `forced-colors`.

**Motion rules:** transforms and opacity only; 250 to 700 ms with a single easing curve; `MotionConfig reducedMotion="user"` plus a CSS kill-switch; the tour auto-advances only while playing, pauses on any interaction and starts paused for reduced-motion users (WCAG 2.2.2). The first page load is not animated, so the server HTML is the LCP.

**States covered:** buttons (hover, focus, active, disabled, loading); form fields (default, focus, error, with an error summary that takes focus); submission (sending, success with reference, failure with retry and email fallback); 404.

## 9. Phased plan, costs, dependencies and risks

| Phase | Work | Depends on | Cost |
|---|---|---|---|
| 0. Done | Research, design system, 6 pages, explainers, RPC, tests, CI file | — | — |
| 1. Launch | Push to GitHub, connect host, set env vars, verify mailbox and domain, legal review of privacy notice | Answers to section 2 | Hosting $0 to $20/month; Resend $0 |
| 2. First 60 days | Plausible, Search Console, first 2 case studies, field CWV baseline | Client permissions | $9/month |
| 3. 2027 | Insights section, Urdu localisation, shared rate-limit store, nonce or SRI CSP | Traffic data | Mostly engineering time |
| 4. 2028 to 2029 | Re-evaluate Next and React majors, TypeScript 7 once Next drops the experimental flag, WCAG 3 when it is final | Upstream releases | — |

| Risk | Likelihood | Mitigation |
|---|---|---|
| Name conflict with "Delta AI" (Madrid) | Medium | Use full name; trademark search |
| Motion 14 is one day old | Low | Lockfile pins it; patch upgrades via CI |
| In-memory rate limiter on multi-instance hosting | Medium | Move to Upstash or Cloudflare binding in phase 3 |
| Inquiries lost if email not configured | Low | API returns "unavailable" and the form shows the email address |
| CSP allows inline scripts | Low | Upgrade to nonces (makes pages dynamic) or Next's experimental SRI |

## 10. Working deliverables

- Source code: `delta-ai-site` (this repository), also provided as `delta-ai-site-source.tar.gz`.
- Screenshots: desktop and mobile for every page.
- Lighthouse HTML reports: `reports/lighthouse/` (regenerate locally; JSON and HTML are git-ignored, the summary is kept).
- This report and the evidence register.

## 11. Validation results and scorecards

**Test conditions:** production build (`next build && next start`) on a Linux container, Chromium 141.0.7390 (preinstalled), localhost. Lighthouse 13.5.0 default mobile (simulated slow 4G, 4× CPU) and desktop presets. These are **lab** numbers; no field data exists yet.

**Automated results (2026-10-03):**

- Unit tests (Vitest): 10/10 pass, covering both machines, idempotent retry, honeypot, validation, rate limit and career-year maths.
- End-to-end (Playwright, desktop + Pixel 7): 32/32 pass, covering axe WCAG 2.2 AA on 7 pages, landmarks and skip link, reduced motion, navigation, keyboard tabs, trade-off presets, form validation and successful RPC submission, server-side rejection, 404 route and security headers.
- `eslint`, `tsc --noEmit`, `buf lint`: clean.

| Page | Device | Perf | A11y | Best pr. | SEO | LCP (sim.) | TBT | CLS | LCP (observed) |
|---|---|---|---|---|---|---|---|---|---|
| Home | mobile | 90 | 100 | 100 | 100 | 3.1 s | 230 ms | 0 | 284 ms |
| Home | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 | 327 ms |
| Services | mobile | 95 | 100 | 100 | 100 | 2.8 s | 120 ms | 0 | 232 ms |
| Services | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 ms | 0 | 287 ms |
| Approach | mobile | 95 | 100 | 100 | 100 | 2.9 s | 70 ms | 0 | 269 ms |
| Approach | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 | 403 ms |
| About | mobile | 96 | 100 | 100 | 100 | 2.8 s | 60 ms | 0 | 203 ms |
| About | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 | 285 ms |
| Contact | mobile | 87 | 100 | 100 | 100 | 3.1 s | 310 ms | 0 | 268 ms |
| Contact | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 | 311 ms |

Notes: these numbers are from the re-run after the violet retheme. Simulated mobile LCP misses the 2.5 s budget even though the observed LCP element (the hero heading) paints at first paint; Lighthouse's simulation counts the JavaScript requested before it. INP cannot be measured in the lab; TBT is the proxy.

**Internal rubric** (your scoring model; not a certification or ranking):

| Criterion | Max | Score | Evidence | Deductions |
|---|---|---|---|---|
| Visual identity | 20 | 17 | Deep-violet mark rebuilt as vector, supplied favicon used exactly, single token set, screenshots | Wordmark "A" glyph is lighter than the letters; the mark is a reconstruction, not a master vector (the supplied violet files are raster review assets); no photography |
| Usability and IA | 20 | 17 | 3-item nav, CTA on every page, e2e nav tests | No case studies; no user testing done |
| Accessibility | 20 | 18 | 0 axe violations, Lighthouse a11y 100, keyboard and reduced-motion tests | Manual screen-reader testing (NVDA, VoiceOver) **not evaluated** |
| Responsive and performance | 20 | 15 | Desktop 100, CLS 0 everywhere | Simulated mobile LCP 2.8 to 3.1 s over budget; no field data |
| **Core experience** | **80** | **67** | | |
| Security and privacy | 10 | 8 | Headers test, server validation, honeypot, rate limit, no cookies | `unsafe-inline` in CSP; in-memory limiter; IP header trust depends on host |
| Reliability and maintainability | 10 | 8 | Typed contracts, 42 tests, CI workflow, single content file | CI has not run on GitHub yet |
| **Production readiness** | **100** | **83** | | |
| Validated usefulness and differentiation | 10 | 3 | Differentiators reasoned from competitor review | No user research, analytics or inquiries yet |
| Operational readiness and docs | 10 | 6 | README, env example, rollback note, CI | Not deployed; no monitoring or alerting configured |
| **Complete product** | **120** | **92** | | |

## 12. Remaining gaps and next actions

1. Answer the four questions in section 2.
2. Run a trademark search before more brand spend (section 5).
3. Link GitHub so the code can be pushed and CI can run.
4. Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` and confirm the mailbox.
5. Send master vector (SVG/AI) files of the violet logo so the site uses exact geometry.
6. Bring simulated mobile LCP under 2.5 s: try `LazyMotion` with `m` components to shrink the Motion chunk, and defer the explainers below the fold with `next/dynamic`.
7. Manual screen-reader pass on VoiceOver (iOS, macOS) and NVDA (Windows).
8. Add 2 to 3 case studies with written client permission.
9. Have the privacy notice reviewed for the jurisdictions you serve.

**What was researched:** stack versions and compatibility, standards (WCAG 2.2, CWV, OWASP 2025, security headers), Apple's Liquid Glass guidance and criticism, six competitor homepages, hosting and email pricing, name and domain screening.
**What was built:** the full site, RPC API, state machines, tests, CI workflow and docs.
**What was tested:** everything listed in section 11, in a lab environment.
**What is unverified:** founder credentials, domain ownership, mailbox existence, trademark availability, field performance, screen-reader behaviour, and how the CI workflow behaves on GitHub.
