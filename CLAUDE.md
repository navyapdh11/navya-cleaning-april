# Claude Code Instructions — NAVYA MYTHOS Cleaning Services

> **Project:** NAVYA MYTHOS Cleaning Services Platform | **Deploy:** https://cleaning-services-website-teal.vercel.app | **Repo:** https://github.com/navyapdh11/march-cleaning | **Monorepo:** `C:\Users\User\Documents\navya-cleaning-april\cleaning-services-website/`

---

## 1. Core Mandates

### Agentic Engineering
- **Research First:** Always `grep_search` existing patterns before editing. Understand → Plan → Execute → Verify.
- **Verification Mandatory:** Every change must pass `tsc --noEmit`, `biome check`, and `next build`.
- **No Hacks:** Do not suppress linter warnings or bypass TypeScript. Fix the root cause.
- **Security:** Never commit secrets. Protect `.env`, `.git`, and system configs.

### Linggen Anchors
- When code files contain `// linggen anchor: <path>` comments, read the referenced file under `.linggen/anchor/` for authoritative context.
- Primary anchor: `.linggen/anchor/best_practices_2026.md` — 2026 industry standards.

---

## 2. Architecture & Tech Stack

### Current Stack (2026)
- **Framework:** Next.js 14.2.3 (App Router) — **upgrade path to Next.js 16 planned**
- **Runtime:** React 18.3.1, TypeScript 5
- **Database:** Prisma ORM — SQLite (local) / PostgreSQL (production), better-sqlite3 fallback
- **Styling:** Tailwind CSS v4, Framer Motion
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Icons:** lucide-react
- **Deployment:** Vercel

### Public Routes
- `/` — Hero, quoting engine, enterprise portals, national coverage, bento grid
- `/services` — Service catalog
- `/services/[slug]` — Service detail (with EndOfLeaseCalculator)
- `/pricing` — Pricing tables
- `/booking` — 5-step booking flow
- `/compliance` — AEO dashboard
- `/enterprise/ndis` — NDIS portal
- `/enterprise/real-estate` — Real estate portal
- `/enterprise/corporate` — Corporate portal
- `/locations/[state]` — Location pages
- `/dashboard` — Customer dashboard

### Admin Dashboard (`/admin`)
Full CMS with 3D tilt bento grid + glassmorphism:
- **Overview:** Stats cards (bookings, services, flashcards, ads, testimonials, team), recent bookings table
- **Services & Prices:** CRUD for services, pricing management
- **Bookings:** Pipeline management, status tracking
- **Gallery CMS:** Image management, portfolio
- **Analytics:** Traffic, conversion metrics
- **Team Management:** Staff profiles, roles

---

## 3. 2026 Best Practices for This Project

### Next.js 14 → 16 Upgrade Path
- **Current:** Next.js 14.2.3 with implicit App Router caching
- **Target:** Next.js 16.2.2 with Turbopack, explicit `"use cache"`, `proxy.ts`
- **Migration Steps:**
  1. Update `next` to `16.x`, `react` to `19.x`
  2. Migrate `middleware.ts` → `proxy.ts` (Node.js runtime boundary)
  3. Enable `reactCompiler: true` for auto-memoization
  4. Convert implicit caching → explicit `"use cache"` directives
  5. Async route APIs: `const params = await props.params`
  6. Update `next.config.ts` — `experimental.turbopack` → top-level `turbopack`

### Security Priorities
1. **Auth Hardening:** Protect `/admin` with proper authentication. Role-based access control.
2. **Security Headers:** HSTS, X-Frame-Options, CSP, X-Content-Type-Options in `next.config.ts`.
3. **OWASP LLM Top 10:** If AI features are added, apply prompt injection prevention, output validation.
4. **Database Security:** Parameterized queries via Prisma. No raw SQL with user input.
5. **Secrets:** Zero committed credentials. `.env.local` for dev, Vercel Env Vars for prod.

### Database & Prisma
- **Local:** SQLite via better-sqlite3 for development
- **Production:** PostgreSQL via Vercel Postgres or Neon
- **Migrations:** `npx prisma migrate dev` for local, `npx prisma migrate deploy` for prod
- **Seed:** `npx prisma db seed` for initial data

### Performance
- **Caching:** Use Next.js 16 `"use cache"` with `revalidateTag(tag, cacheLifeProfile)` for SWR.
- **Server Actions:** `updateTag()` for read-your-writes, `refresh()` for uncached data.
- **Image Security:** `images.remotePatterns` configuration. `images.maximumRedirects: 3`.
- **Bundle Analysis:** Run `@next/bundle-analyzer` to identify oversized dependencies.
- **SSR Strategy:** Prefer SSR + caching over massive SSG for location pages.

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

- **Formatting/Linting:** Biome for JS/TS (`biome check --write`). Ruff for Python (`ruff check --fix`).
- **Type Checking:** `tsc --noEmit` strict mode.
- **Build:** `next build` — zero errors, zero warnings.
- **Testing:** Vitest for unit tests. Playwright for E2E.
- **Pre-Commit:** Secret scanning with `scripts/security_check.py`.
- **Prisma:** `npx prisma generate` after schema changes. `npx prisma studio` for DB inspection.

---

## 6. Project Context & Memory

### Supersession Log
| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` (planned) | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` (planned) | Clear Node.js runtime boundary |
| 2026-04 | Prettier + ESLint | Biome | 10-100× faster, unified tool |

### Active Priorities
- Plan Next.js 14 → 16 migration
- Harden `/admin` authentication
- Implement security headers
- Add JSON-LD structured data for local business SEO
- Optimize location pages with SSR + caching
- Add E2E tests for booking flow

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
