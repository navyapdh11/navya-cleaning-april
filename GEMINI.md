# Gemini CLI — NAVYA MYTHOS Cleaning Services: 2026 Enterprise Standards

> **Project:** NAVYA MYTHOS Cleaning Services Platform | **Deploy:** https://cleaning-services-website-teal.vercel.app | **Repo:** https://github.com/navyapdh11/march-cleaning | **Monorepo:** `C:\Users\User\Documents\navya-cleaning-april\cleaning-services-website/`

---

This project operates at **2026 AI-Native Enterprise Grade** standards.

## 1. Architecture & Tech Stack

### Current Stack
- **Framework:** Next.js 14.2.3 (App Router) — **upgrade to Next.js 16.2.2 planned**
- **Runtime:** React 18.3.1, TypeScript 5
- **Database:** Prisma ORM — SQLite (local) / PostgreSQL (production)
- **Styling:** Tailwind CSS v4, Framer Motion
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Icons:** lucide-react
- **Deployment:** Vercel

### Full-Stack Features
- **Public:** Hero, quoting engine, enterprise portals (NDIS, real estate, corporate), service catalog, pricing, 5-step booking, compliance dashboard, location pages
- **Admin CMS:** 3D tilt bento grid + glassmorphism — overview stats, services CRUD, bookings pipeline, gallery CMS, analytics, team management
- **Customer Dashboard:** Bookings, payments, loyalty program, reviews, cart

---

## 2. 2026 AI-Native Standards

### Shift-Left Security
- **Pre-Commit:** `scripts/security_check.py` — secret detection, dependency supply-chain auditing.
- **SBOM:** Automated Software Bill of Materials for all projects.
- **OWASP LLM Top 10:** Prompt injection prevention, output validation, least-privilege plugin design for AI features.
- **Web Security (OWASP 2025/2026):** Role-based access control, security headers (HSTS, CSP, X-Frame-Options), parameterized queries, rate limiting.
- **Secrets:** Zero committed credentials. `.env.local` for dev, Vercel Env Vars for prod.

### Performance & GreenOps
- **Next.js 16 Upgrade Path:**
  - Turbopack default (2–5× faster builds, 10× faster refresh)
  - Explicit `"use cache"` directive replacing implicit App Router caching
  - `proxy.ts` replacing `middleware.ts` for clear Node.js runtime boundary
  - React Compiler (`reactCompiler: true`) for auto-memoization
  - Async route APIs: `const params = await props.params`
- **SSR over SSG:** Prefer SSR + caching for location pages. Reduces build time, stale content.
- **Bundle Optimization:** Code splitting, dynamic imports, tree shaking.
- **Image Security:** `images.remotePatterns` replaces `images.domains`. `images.localPatterns` required.
- **Compute Efficiency:** Optimize for token throughput. Minimize redundant renders with React Compiler.

### Database & Prisma
- **Local:** SQLite via better-sqlite3 for development
- **Production:** PostgreSQL via Vercel Postgres or Neon
- **Migrations:** `npx prisma migrate dev` (local) / `npx prisma migrate deploy` (prod)
- **Seed:** `npx prisma db seed` for initial data
- **Security:** Parameterized queries. No raw SQL with user input.

---

## 3. Tooling Standards (2026)

- **JS/TS Formatting & Linting:** Biome (replacing Prettier + ESLint). 10-100× faster. Flat config format.
- **Python:** Ruff (replacing flake8, isort, pyupgrade). Unified formatter + linter.
- **TypeScript:** `tsc --noEmit` strict mode. No `any` without justification.
- **Testing:** Vitest for unit tests. Playwright for E2E. 80%+ coverage for business logic.
- **Build:** `next build` — zero errors, zero warnings.
- **Prisma:** `npx prisma generate` after schema changes. `npx prisma studio` for DB inspection.

---

## 4. Supersession Log

| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` (planned) | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` (planned) | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | 10-100× faster, unified tool |
| 2026-04 | Manual `useMemo`/`useCallback` | React Compiler auto-memoization | Zero manual code changes |

---

## 5. Active Priorities

- Plan Next.js 14 → 16 migration (Turbopack, cache components, proxy.ts)
- Harden `/admin` authentication with role-based access
- Implement security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)
- Add JSON-LD structured data for local business SEO
- Optimize location pages with SSR + caching
- Add E2E tests for 5-step booking flow
- Wire Prisma to database (currently SQLite local / PostgreSQL prod)

---

*Maintained by Gemini CLI 2026 Agentic Suite — updated April 2026*
