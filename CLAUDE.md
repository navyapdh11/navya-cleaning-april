# Claude Code Instructions — NAVYA MYTHOS Cleaning Services

> **Project:** NAVYA MYTHOS Cleaning Services Platform | **Deploy:** https://cleaning-services-website-teal.vercel.app | **Repo:** https://github.com/navyapdh11/march-cleaning | **Monorepo:** `C:\Users\User\Documents\navya-cleaning-april\cleaning-services-website/`

---

## 1. Core Mandates

### Agentic Engineering
- **Research First:** Always `grep_search` existing patterns before editing. Understand → Plan → Execute → Verify.
- **Verification Mandatory:** Every change must pass `tsc --noEmit` and `next build`.
- **No Hacks:** Do not suppress linter warnings or bypass TypeScript. Fix the root cause.
- **Security:** Never commit secrets. Protect `.env`, `.git`, and system configs.

### Linggen Anchors
- When code files contain `// linggen anchor: <path>` comments, read the referenced file under `.linggen/anchor/` for authoritative context.
- Primary anchor: `.linggen/anchor/best_practices_2026.md` — 2026 industry standards.

---

## 2. Architecture & Tech Stack

### Current Stack (2026)
- **Framework:** Next.js 14.2.35 (App Router) — patched all 17 CVEs from 14.2.3
- **Runtime:** React 18.3.1, TypeScript 5
- **Database:** Prisma ORM v5.22 — SQLite (local dev) / PostgreSQL (production)
- **Auth:** bcryptjs + SHA256 session tokens, HttpOnly cookies
- **Styling:** Tailwind CSS v4, Framer Motion
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Icons:** lucide-react
- **Deployment:** Vercel

### Public Routes
| Route | Purpose |
|-------|---------|
| `/` | Hero, quoting engine, enterprise portals, national coverage, bento grid, **dashboard access cards** |
| `/services` | Service catalog (8 services from data.ts) |
| `/services/[slug]` | Service detail with EndOfLeaseCalculator |
| `/pricing` | Pricing tables with trust guarantees + FAQ |
| `/booking` | 5-step booking flow (dynamic import, 2.09 kB bundle) |
| `/compliance` | AEO dashboard |
| `/enterprise/ndis` | NDIS participant portal |
| `/enterprise/real-estate` | Real estate B2B portal |
| `/enterprise/corporate` | Corporate cleaning portal |
| `/locations/[state]` | 8 state location pages |
| `/dashboard` | **Customer dashboard** (5 tabs: overview, dispatches, vault, billing, settings) |

### Admin Dashboard (`/admin`)
Full CMS with 3D tilt bento grid + glassmorphism, **911 lines, 11 tabs**:
- **Overview:** Stats cards (bookings, services, flashcards, ads, testimonials, team), recent bookings table
- **Services & Prices:** CRUD for services, pricing management
- **Page Content:** CMS for page text across 7 pages
- **Media Library:** Image/video upload and management
- **Ad Campaigns:** CRUD for marketing campaigns with budget tracking
- **Analytics:** GTM configuration, page views, conversion metrics
- **Flashcards:** Homepage content nodes with 3D tilt display
- **Bookings:** Pipeline management, status tracking
- **Testimonials:** Customer review management
- **Team Access:** Admin user CRUD with role management
- **Settings:** Site configuration (title, phone, email)

### API Routes
| Route | Methods | Auth | Purpose |
|-------|---------|------|---------|
| `/api/mythos` | POST/GET | Mixed (legacy) | Single catch-all API with 30+ action handlers |
| `/api/admin` | GET/POST/PATCH/DELETE | ✅ Session token | Dedicated admin CRUD for 10 resources |
| `/api/admin/login` | POST | N/A | bcrypt auth + session cookie |
| `/api/admin/stats` | GET | ✅ Session token | Dashboard KPI stats |
| `/api/customer` | GET/POST | Public | Customer bookings + dispatch submission |

### Navigation
- **Navbar:** Home, Services, Pricing, Compliance, Locations dropdown, **Dashboards dropdown** (Admin Control + Customer Portal), Booking CTA
- **Footer:** Main nav links + **Dashboards section** (Admin Control, Customer Portal)
- **Homepage:** **"Access Your Dashboard" section** with 2 cards (Admin + Customer)

---

## 3. 2026 Best Practices for This Project

### UX/UI (2026)
- **Core Web Vitals Targets:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **WCAG 2.2 Compliance:** Visible focus indicators, color contrast (4.5:1 min), descriptive aria labels, keyboard navigation, `prefers-reduced-motion`.
- **Human-Crafted Aesthetics:** Deliberately "handmade" visual design as trust signal. Avoid glassmorphism that reduces text contrast (admin bento grid is fine but ensure text readability).
- **Accessibility:** Semantic HTML landmarks, skip links, screen-reader-friendly forms, keyboard operable admin dashboard.
- **Performance:** Dynamic imports (booking page already 99% reduced), 3D components with `ssr: false`, SSR over massive SSG.

### SEO (2026)
- **E-E-A-T:** Author bios, service expertise, testimonials, credentials.
- **Structured Data (JSON-LD):** `LocalBusiness`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`, `Organization` — validated via Google Rich Results Test.
- **Technical SEO:** XML sitemap (`sitemap.ts`), robots.txt, canonical URLs, mobile-first, unique metadata per page.
- **Content:** 8 service pages with unique content, state location pages, enterprise portal pages. Topic clusters around services + locations.

### AEO (Answer Engine Optimization)
- **Featured Snippets:** Opening definitions (40-60 words) on service pages. Q&A formatting with FAQ schema.
- **Voice Search:** Conversational phrasing for "best cleaning service near me", "bond cleaning cost in [state]".
- **FAQ Schema:** `FAQPage` JSON-LD with complete standalone answers on pricing, services, compliance pages.

### GEO (Generative Engine Optimization)
- **LLM Visibility:** Factual authority, data-backed claims, verified authorship, provenance chains.
- **Content Structure:** H1→H2→H3 hierarchy, concise opening definitions, bulleted lists, comparison tables (pricing).
- **AI Crawler Access:** `robots.txt` allows `GPTBot`, `ClaudeBot`, `PerplexityBot`. Content in initial HTML.
- **Brand Authority:** Original data-backed content. Human editorial oversight on all public content.

### AI Integration (2026)
- **Server-Side AI:** LLM calls via API routes/server actions. Never expose keys client-side.
- **Streaming:** Streaming responses for conversational UI. Graceful fallback on failure.
- **Content Generation:** AI-assisted with human editorial oversight. Search engines penalize unreviewed AI content.
- **SMLM:** Flash Attention 3, RoPE, Muon optimizer for local inference.

### DeepSeek V4 Optimizer
- **Architecture:** 671B total parameters, 37B activated per token via DeepSeekMoE (256 experts). Multi-head Latent Attention (MLA) for efficient context modeling.
- **FP8 Mixed Precision:** Native FP8 weights with BF16 fallback. W8A8 quantization for inference acceleration.
- **Multi-Token Prediction (MTP):** Enables speculative decoding for 2-3× faster inference. Improves training signal density.
- **Auxiliary-Loss-Free Load Balancing:** MoE expert routing without auxiliary loss penalties.
- **Integration:** Use `deepseek-v4-flash` for rapid inference (booking summarization, customer query extraction). Use `deepseek-v4-pro` for complex reasoning (pricing optimization, compliance analysis). Enable `thinking` mode for multi-step tasks. Stream responses (`stream: true`).
- **Context Management:** Sliding window + summary compression. Truncate history while preserving semantic continuity.
- **Safety:** Validate all LLM outputs before downstream execution. Request confidence markers for critical decisions. Human review for high-impact changes.

### Agentic Integration (2026)
- **Multi-Agent Orchestration:** Coordinator → Specialists → Verifier. Parallel execution for independent work.
- **Agentic Safety:** Least-privilege, sandboxed code, approval gates for destructive actions.
- **API-First:** All admin/customer functionality via API. Structured JSON outputs with defined schemas.
- **Dual-Interface:** Serve both human users and autonomous AI agents. Semantic HTML, structured data.

### Next.js 14 → 16 Upgrade Path
- **Current:** Next.js 14.2.35 with implicit App Router caching
- **Target:** Next.js 16.2.2 with Turbopack, explicit `"use cache"`, `proxy.ts`
- **Migration Steps:**
  1. Update `next` to `16.x`, `react` to `19.x`
  2. Migrate `middleware.ts` → `proxy.ts` (Node.js runtime boundary)
  3. Enable `reactCompiler: true` for auto-memoization
  4. Convert implicit caching → explicit `"use cache"` directives
  5. Async route APIs: `const params = await props.params`
  6. Update `next.config.ts` — `experimental.turbopack` → top-level `turbopack`

### Security (Implemented)
1. ✅ **bcrypt password hashing** — AdminUser model uses bcrypt, not plaintext
2. ✅ **SHA256 session tokens** — Random 32-byte tokens, hashed for storage
3. ✅ **HttpOnly cookies** — `admin_session` cookie with SameSite=Strict
4. ✅ **checkAdmin() wired** — All 18 write actions in `/api/mythos` require valid session
5. ✅ **Dedicated admin API** — `/api/admin` route with auth on all methods
6. ✅ **Next.js 14.2.35** — All 17 CVEs from 14.2.3 patched
7. ⚠️ **Security headers** — Not yet implemented (next.config.mjs is empty)
8. ⚠️ **Customer dashboard auth** — `/dashboard` has no authentication

### Database & Prisma
- **Local:** SQLite via better-sqlite3 for development (schema adapted: Json→String, no @db.Text)
- **Production:** PostgreSQL via Vercel Postgres or Neon (schema uses Json, @db.Text)
- **Migrations:** `npx prisma migrate dev` for local, `npx prisma migrate deploy` for prod
- **Seed:** `npx prisma db seed` or `node prisma/seed-password.mjs` for admin user with bcrypt hash
- **Schema:** 14 models — Service, StateLocation, Booking, EnterpriseClient, AuditLog, Flashcard, SiteConfig, AdminUser, PageContent, Media, AdCampaign, AnalyticsConfig, Testimonial

### Performance
- **Dynamic imports:** Booking page uses `next/dynamic` — 230 kB → 2.09 kB (99% reduction)
- **3D components:** ThreeDModel loaded dynamically with ssr: false
- **Static services fallback:** /services and /pricing work without API server
- **Bundle size:** 87.5 kB shared + per-page chunks

---

## 4. Booking Flow (5-Step)

The booking form is a critical conversion path:
1. Service selection
2. Location & details
3. Date & time
4. Customer information
5. Confirmation & payment

**Requirements:**
- Server Action or API route submission with proper validation
- Error handling with user-friendly messages
- Success state with booking confirmation
- E2E test coverage with Playwright

---

## 5. Tooling Standards

- **Type Checking:** `tsc --noEmit` strict mode.
- **Build:** `next build` — zero errors, zero warnings.
- **Lint:** `eslint` with eslint-config-next 14.2.35.
- **Testing:** Vitest for unit tests. Playwright for E2E.
- **Prisma:** `npx prisma generate` after schema changes. `npx prisma studio` for DB inspection.

---

## 7. Skills & Capabilities (2026)

### AI Engineering Skill Triggers
Use the `!` prefix to invoke specialized skills as direct commands: `!<skill-name> <parameters>`.

| Skill | Trigger | Purpose |
|-------|---------|---------|
| Skill Creator | `!skill-creator` | Create/update specialized agent skills |
| WikiLLM Librarian | `!wikillm-librarian` | Self-heal wiki, bridge orphans, validate structure |
| Linter Agent | `!linter-agent` | Automated linting & Biome/Ruff formatting |
| NanoChat Optimizer | `!nanochat-optimizer` | Optimize/train SMLM models |
| Render Deploy | `!render-deploy` | Deploy services to Render infrastructure |
| Review | `!review` | Code review for security, quality, performance |

### UX/UI Engineering
- **WCAG 2.2 (ISO 40500:2025):** 9 new success criteria over 2.1 — focus appearance, drag gestures, target size (44×44px min), redundant input, accessible authentication, cognitive accessibility, mobile accessibility.
- **Core Web Vitals:** LCP < 2.5s (image compression, CDN, SSR, critical CSS), INP < 200ms (code splitting, web workers, debounced handlers, CSS containment), CLS < 0.1 (reserve space, avoid above-content insertion, CSS View Transitions).
- **Human-Crafted Aesthetics:** Deliberately "handmade" (non-AI-generated) visual design as primary trust signal for AI-fatigued users.
- **Visual Anti-Patterns:** Avoid glassmorphism reducing text contrast, animated backgrounds behind content, novelty navigation replacing established conventions.
- **Input-Agnostic Design:** Simultaneous support for mouse, keyboard, touch, voice input.
- **AI-Integrated UX:** Clear capability signaling, context-aware prompt suggestions, direct scannable answers, human escalation paths. Minimize AI chit-chat, maximize utility.
- **AI as Co-User:** Dual-interface — semantic HTML, ARIA labels, structured data, machine-readable + human-readable interaction patterns.
- **Accessibility Foundations:** Perceivable, Operable, Understandable, Robust. Skip links, `prefers-reduced-motion`, high contrast, screen-reader forms, keyboard-operable admin dashboard.
- **Responsive Imagery:** `<picture>` element + SVGs, `srcSet` and `sizes` attributes.
- **Theming:** Auto OS/browser preference adaptation (dark/light, reduced motion, high contrast).
- **Internationalization (i18n):** Multi-language prep, LTR/RTL writing modes, locale-specific formatting.
- **Design System:** Micro-layouts as reusable, context-agnostic primitives.

### SEO Engineering
- **E-E-A-T:** Experience, Expertise, Authoritativeness, Trustworthiness. Author bios, credentials, citations, external links.
- **People-First Content:** Unique, well-organized, regularly updated content solving user problems. Focus on searcher intent over keyword density.
- **Structured Data (JSON-LD):** `LocalBusiness`, `Service`, `FAQPage`, `QAPage`, `Article`, `BreadcrumbList`, `Organization` — validated via Google Rich Results Test.
- **Technical SEO:** Mobile-first indexing, CSS/JS accessibility for crawlers, descriptive URLs, `rel="canonical"` or 301 redirects, XML sitemaps (`sitemap.ts`), `robots.txt` + `noindex` control.
- **Metadata:** Concise, unique page titles and meta descriptions. `<meta name="keywords">` ignored.
- **Content Freshness:** Publication dates, update logs, canonical URLs. LLM recency checks favor fresh, versioned content.
- **Internal Linking:** Descriptive anchor text, logical site architecture, topic clusters around services + locations.
- **Backlinks:** Data-backed claims, primary source citations increase citation probability.
- **E-Commerce SEO:** Product variants, merchant return/shipping policies, loyalty program schema.

### AEO (Answer Engine Optimization)
- **Featured Snippets:** Direct-answer formatting, clear hierarchical headings, concise opening definitions (40-60 words optimal), bulleted lists. Align with LLM retrieval/extraction patterns.
- **Question-Answer Structure:** Explicit Q&A matching natural conversational queries. Target "who, what, where, when, why, how" patterns.
- **Voice Search:** Conversational phrasing, full questions (not keyword fragments), long-tail multi-turn queries ("best cleaning service near me", "bond cleaning cost in [state]"), local intent optimization.
- **FAQ Schema:** `FAQPage` JSON-LD — each FAQ is complete, standalone answer (pricing, services, compliance pages).
- **QA Schema:** `QAPage` for community Q&A — increases AI answer extraction eligibility.
- **How-To Schema:** `HowTo` with step-by-step instructions for procedural content.
- **Speakable Schema:** For text-to-speech playback content.
- **Entity Relationships:** Define clear what-is, how-to, comparison, pros-cons relationships for AI answer extraction.

### GEO (Generative Engine Optimization)
- **Factual Authority:** Data-backed claims, primary source citations, verified expert authorship. Increases LLM trust and citation probability.
- **Provenance Chain:** Clear authorship, publication dates, update history, external citations. LLMs favor verifiable provenance.
- **Anti-Hallucination Signals:** Explicit confidence markers, verifiable external links, avoid ambiguous phrasing. Reduces LLM content filtering.
- **Content Structure:** H1→H2→H3 hierarchy with semantic meaning, concise opening definitions (LLMs extract for answer generation), bulleted lists, comparison tables (pricing side-by-side with explicit criteria).
- **AI Crawler Access:** Allow `GPTBot`, `ClaudeBot`, `PerplexityBot` in `robots.txt`. Blocking reduces generative engine visibility.
- **Clean Text:** Minimal ad clutter, clear content hierarchy. LLMs parse cleaner text from uncluttered pages.
- **SSR Over CSR:** Ensure content in initial HTML. Heavy client-side rendering prevents clean text extraction.
- **Originality Over Volume:** One authoritative, data-backed article outperforms ten thin articles.
- **Human Oversight:** Strict editorial oversight for accuracy, contextual alignment, genuine value. Search engines penalize formulaic AI-generated content.
- **Brand Personality:** Preserve distinct NAVYA MYTHOS brand voice. Prevent homogenized, robotic tone that AI fatigue rejects.
- **Expert Authorship:** Named authors with verifiable credentials increase content trust signals.

### AI Integration
- **Server-Side AI:** LLM calls via API routes/server actions. Never expose keys client-side. Protect keys, control rate limiting.
- **Streaming Responses:** `stream: true` for conversational UI. Improves perceived latency and user engagement.
- **Context Window Management:** Conversation history truncation, sliding window context, summary-based compression for long conversations.
- **Fallback Patterns:** Graceful degradation on LLM API unavailability — cached responses, error states, offline functionality.
- **Content Generation:** AI-assisted with human editorial oversight. Search engines penalize unreviewed AI content.
- **Personalization:** Behavior-driven using interaction history, preferences, context. Balance AI automation with human editing.
- **Semantic Search:** Vector embeddings for query/content semantic matching beyond keyword search.
- **Automated Summarization:** Generate summaries, metadata, tags, categorization from existing content.
- **SMLM (Small Language Models):** Flash Attention 3, RoPE, Sliding-Window KV Caching. Muon optimizer. GRPO for reasoning alignment.
- **Local Inference:** LM Studio for local testing, quantized models (GGUF) for edge deployment.
- **Efficiency:** "No-Abstraction" PyTorch/Rust logic. Minimize redundant forward passes.
- **OWASP LLM Top 10:** Prompt injection prevention, output validation, least-privilege plugin design.

### Agentic Integration
- **Multi-Agent Orchestration:** Hierarchical pattern — Coordinator decomposes tasks, assigns to Specialists, Verifier validates. Parallel execution for independent work. Background execution for genuinely independent tasks.
- **Autonomous Workflows:** AI agents handle purchasing, scheduling, negotiation, data analysis. Align with actual economic workflows and user expectations.
- **Long-Running Processes:** Architecture supports extended AI processes for scientific computing, code modernization, enterprise workflows.
- **Scalable Oversight:** Automated alignment — LLMs monitor other AI processes for quality and safety.
- **Conflict Resolution:** Coordinator resolves agent conflicts by preferring most recent authoritative source.
- **Constitutional Classifiers:** Filter jailbreaks and unsafe prompts. Ensure agents remain secure during complex interactions.
- **Predictable Behavior:** Agents behave predictably and safely in production. Approval gates for destructive actions.
- **Least-Privilege Execution:** Minimum necessary access. No system-level modifications without user approval.
- **Sandboxed Execution:** Isolated environments. No network calls to unverified endpoints.
- **Frontier Safety:** Red teaming for autonomous system security implications — cybersecurity, biosecurity, data integrity.
- **API-First Design:** All functionality via API enables agent interaction. Structured JSON outputs with defined schemas.
- **Rate Limiting & Quotas:** Protect resources from abusive agent patterns. Monitor for unusual activity.
- **Audit Trails:** Log all agent actions for accountability, debugging, compliance.
- **Workflow Boundaries:** Clear boundaries for agent autonomy — what agents do independently vs. requiring human approval.

### Video Engineering (Remotion)
- **Programmatic Video:** React components mapped to video assets via Remotion.
- **Data-Driven Marketing:** Automated video generation from CMS content, testimonials, service showcases, ad campaigns.

### Global Architectural Expansion
- **China Patterns:** Bento Grid UIs (already used in admin dashboard), AI-Integrated mini-program workflows, sovereign infrastructure (PIPL compliance, local-first).
- **India Patterns:** Vernacular AI (multi-language support for NDIS/corporate portals), ONDC/Account Aggregator agents, GCC-style automated workflows.
- **Sovereign Data:** PIPL/local-first architecture, domestic vector DBs.

---

## 8. Project Context & Memory

### Supersession Log
| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` (planned) | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` (planned) | Clear Node.js runtime boundary |
| 2026-04 | Plaintext passwords | bcrypt + SHA256 session tokens | Security hardening |
| 2026-04 | Dead checkAdmin() | Wired to 18 write actions | API write protection |
| 2026-04 | Next.js 14.2.3 (17 CVEs) | Next.js 14.2.35 | Security patches |
| 2026-04 | Implicit UX guidelines | WCAG 2.2, Core Web Vitals, AI-Integrated UX | WCAG 2.2 (ISO 40500:2025), INP < 200ms |
| 2026-04 | Basic SEO | E-E-A-T, AEO, GEO | AI-overview optimization, provenance chains |
| 2026-04 | No AI/agentic standards | Server-side AI, multi-agent orchestration | Safe LLM integration, hierarchical agents |

### Active Priorities
- Implement JSON-LD structured data for local business SEO (FAQPage, Service, LocalBusiness)
- Implement security headers in next.config.mjs
- Add customer dashboard authentication
- Add AEO/GEO optimization (featured snippets, FAQ schema, AI crawler access)
- Add E2E tests for booking flow
- Wire EnterpriseClient and AuditLog models to API
- Plan Next.js 14 → 16 migration

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
