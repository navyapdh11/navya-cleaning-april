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

## 6. Project Context & Memory

### Supersession Log
| Date | Superseded | Replaced By | Reason |
|------|-----------|-------------|--------|
| 2026-04 | Next.js 14 implicit caching | Next.js 16 explicit `"use cache"` (planned) | Opt-in caching, predictable invalidation |
| 2026-04 | `middleware.ts` | `proxy.ts` (planned) | Clear Node.js runtime boundary |
| 2026-04 | Plaintext passwords | bcrypt + SHA256 session tokens | Security hardening |
| 2026-04 | Dead checkAdmin() | Wired to 18 write actions | API write protection |
| 2026-04 | Next.js 14.2.3 (17 CVEs) | Next.js 14.2.35 | Security patches |

### Active Priorities
- Plan Next.js 14 → 16 migration
- Implement security headers in next.config.mjs
- Add customer dashboard authentication
- Add JSON-LD structured data for local business SEO
- Add E2E tests for booking flow
- Wire EnterpriseClient and AuditLog models to API

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
