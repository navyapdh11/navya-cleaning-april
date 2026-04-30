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

### Agentic & Creative Patterns
- **Multica:** Use for multi-agent architectural orchestration.
- **Remotion:** Use for programmatic video marketing automation.

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

---

*Maintained by Gemini CLI 2026 Agentic Suite — updated April 2026*
