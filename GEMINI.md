# Gemini CLI — NAVYA MYTHOS Cleaning Services: 2026 AI-Native Enterprise Standards

> **Project:** NAVYA MYTHOS Cleaning Services Platform | **Deploy:** https://cleaning-services-website-teal.vercel.app | **Repo:** https://github.com/navyapdh11/march-cleaning | **Monorepo:** `C:\Users\User\Documents\navya-cleaning-april\cleaning-services-website/`

---

This project operates at **2026 AI-Native Enterprise Grade** standards.

## 1. Architecture & Tech Stack (2026)

- **Framework:** Next.js 14.2.35 (App Router) — all 17 CVEs from 14.2.3 patched.
- **Runtime:** React 18.3.1, TypeScript 5.
- **Database:** Prisma ORM v5.22 — SQLite (dev) / PostgreSQL (production), 14 models.
- **Auth:** bcryptjs + SHA256 session tokens, HttpOnly SameSite=Strict cookies.
- **Styling:** Tailwind CSS v4 (Oxide engine), Framer Motion.
- **3D:** Three.js + @react-three/fiber + @react-three/drei (dynamic import, ssr: false).
- **Icons:** lucide-react.
- **Build/Lint:** ESLint + eslint-config-next 14.2.35, tsc (strict mode).
- **Deployment:** Vercel.

### API Routes
| Route | Methods | Auth | Purpose |
|-------|---------|------|---------|
| `/api/mythos` | POST/GET | Mixed (legacy) | 30+ action handlers, checkAdmin() wired to 18 write actions |
| `/api/admin` | GET/POST/PATCH/DELETE | ✅ Session | Dedicated admin CRUD for 10 resources |
| `/api/admin/login` | POST | N/A | bcrypt auth + session cookie |
| `/api/customer` | GET/POST | Public | Customer bookings + dispatch submission |

### Dashboards
- **Admin (`/admin`):** 911 lines, 11 tabs, full CRUD for all Prisma models
- **Customer (`/dashboard`):** 219 lines, 5 tabs (overview, dispatches, vault, billing, settings)
- **Access:** Homepage cards + Navbar dropdown + Footer links — all routes visible

### Security Status
| Check | Status |
|-------|--------|
| bcrypt password hashing | ✅ Implemented |
| SHA256 session tokens | ✅ Implemented |
| HttpOnly cookies | ✅ Implemented |
| checkAdmin() on write actions | ✅ 18 actions protected |
| Next.js CVEs | ✅ All 17 patched (14.2.3 → 14.2.35) |
| Security headers | ⚠️ Not yet implemented |
| Customer dashboard auth | ⚠️ Not yet implemented |

### Performance
| Metric | Value |
|--------|-------|
| Booking bundle | 2.09 kB (was 230 kB, 99% reduction via dynamic import) |
| Shared JS bundle | 87.5 kB |
| Static pages | 36 total, all generated |
| 3D components | Dynamic import with ssr: false |

## 2. 2026 Engineering Patterns

### Next.js 14 → 16 Upgrade Path
- **Current:** 14.2.35 with implicit App Router caching
- **Target:** Next.js 16.2.2 with Turbopack, explicit `"use cache"`, `proxy.ts`
- **Migration:** Update next → 16.x, react → 19.x, migrate middleware.ts → proxy.ts, enable reactCompiler, add `"use cache"` directives

### AI, UX/UI, SEO & Agentic Standards (2026)
- **UX/UI:** WCAG 2.2 (ISO 40500:2025) compliance. Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1. Human-crafted aesthetics — anti-AI-fatigue design. Ensure admin bento grid text remains readable. Semantic HTML, skip links, `prefers-reduced-motion`, keyboard navigation.
- **SEO:** E-E-A-T, JSON-LD structured data (`LocalBusiness`, `Service`, `FAQPage`, `Article`), XML sitemap, canonical URLs, mobile-first indexing, unique metadata per page.
- **AEO:** Featured snippet optimization (40-60 word opening definitions), FAQ schema with standalone answers, voice search targeting ("best cleaning near me", bond cleaning cost queries).
- **GEO:** Factual authority, provenance chains, H1→H2→H3 hierarchy, bulleted lists, comparison tables (pricing), AI crawler access (`GPTBot`, `ClaudeBot`, `PerplexityBot`), human editorial oversight.
- **AI Integration:** Server-side LLM calls, streaming responses, graceful fallbacks, AI-assisted content with human review, SMLM (Flash Attention 3, RoPE, Muon).

### DeepSeek V4 Optimizer
- **Architecture:** 671B total parameters, 37B activated per token via DeepSeekMoE (256 experts). Multi-head Latent Attention (MLA) for efficient context modeling.
- **FP8 Mixed Precision:** Native FP8 weights with BF16 fallback. W8A8 quantization for inference acceleration.
- **Multi-Token Prediction (MTP):** Enables speculative decoding for 2-3× faster inference. Improves training signal density.
- **Auxiliary-Loss-Free Load Balancing:** MoE expert routing without auxiliary loss penalties.
- **Integration:** Use `deepseek-v4-flash` for rapid inference (booking summarization, customer query extraction). Use `deepseek-v4-pro` for complex reasoning (pricing optimization, compliance analysis). Enable `thinking` mode for multi-step tasks. Stream responses (`stream: true`).
- **Context Management:** Sliding window + summary compression. Truncate history while preserving semantic continuity.
- **Safety:** Validate all LLM outputs before downstream execution. Request confidence markers for critical decisions.

### Agentic Integration
- Multi-agent orchestration (Coordinator → Specialists → Verifier), least-privilege execution, API-first design, structured JSON outputs, dual-interface (human + agent).

### Security Priorities
- **Auth Hardening:** Secure `/admin` (done) and `/dashboard` (pending).
- **Security Headers:** HSTS, CSP, X-Frame-Options, X-Content-Type-Options (pending).
- **SEO:** Structured data (JSON-LD), dynamic `sitemap.ts`, robots.txt.
- **Interactivity:** Minimize `"use client"` — favor Server Components.

---

## 3. Tooling Standards (2026)

- **TypeScript:** `tsc --noEmit` strict mode.
- **Build:** `next build` — zero errors, zero warnings.
- **Testing:** Vitest (unit), Playwright (E2E). 80%+ coverage for business logic.
- **Prisma:** `npx prisma generate` after schema changes. `npx prisma studio` for inspection.

---

## 4. Supersession Log

| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14.2.3 (17 CVEs) | Next.js 14.2.35 | Security patches |
| 2026-04 | Plaintext passwords | bcrypt + SHA256 session tokens | Security hardening |
| 2026-04 | Dead checkAdmin() | Wired to 18 write actions | API write protection |
| 2026-04 | Booking bundle 230 kB | Dynamic import, 2.09 kB | 99% bundle reduction |
| 2026-04 | Empty pricing page | Full static content + FAQ | 8 services, trust guarantees |
| 2026-04 | Hidden dashboards | Navbar + Footer + Homepage access | Full visibility |
| 2026-04 | Implicit UX guidelines | WCAG 2.2, Core Web Vitals, human-crafted aesthetics | WCAG 2.2 (ISO 40500:2025), INP < 200ms |
| 2026-04 | Basic SEO | E-E-A-T, AEO, GEO | AI-overview optimization, provenance chains |
| 2026-04 | No AI/agentic standards | Server-side AI, multi-agent orchestration | Safe LLM integration, hierarchical agents |

---

*Maintained by Gemini CLI 2026 Agentic Suite — updated April 2026*
