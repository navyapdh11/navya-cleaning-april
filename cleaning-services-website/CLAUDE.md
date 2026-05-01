# Claude Code — NAVYA MYTHOS Cleaning Services Website

> **Project:** NAVYA MYTHOS Cleaning Services Website | **Deploy:** https://cleaning-services-website-teal.vercel.app | **Parent:** `C:\Users\User\Documents\navya-cleaning-april\`

See parent config for full standards: `../CLAUDE.md`

## Quick Reference

### Stack
- Next.js 14.2.35 (App Router), React 18.3.1, TypeScript 5
- Prisma ORM v5.22 — SQLite (dev) / PostgreSQL (prod)
- Tailwind CSS v4, Framer Motion, Three.js + @react-three/fiber/drei
- Vercel hosting

### Key Routes
- `/` — Hero, quoting engine, enterprise portals, bento grid, dashboard access
- `/services`, `/services/[slug]` — Service catalog + detail with EndOfLeaseCalculator
- `/pricing` — Pricing tables + FAQ
- `/booking` — 5-step flow (dynamic import, 2.09 kB bundle)
- `/compliance` — AEO dashboard
- `/enterprise/ndis`, `/enterprise/real-estate`, `/enterprise/corporate`
- `/locations/[state]` — 8 state pages
- `/dashboard` — Customer dashboard (5 tabs)
- `/admin` — Full CMS (11 tabs, 911 lines)

### API Routes
| Route | Methods | Auth |
|-------|---------|------|
| `/api/mythos` | POST/GET | Mixed (18 write actions protected) |
| `/api/admin` | GET/POST/PATCH/DELETE | ✅ Session |
| `/api/admin/login` | POST | N/A |
| `/api/customer` | GET/POST | Public |

### Verify
- `tsc --noEmit` — zero errors
- `next build` — zero errors, zero warnings
- `eslint` with eslint-config-next 14.2.35
- `npx prisma generate` after schema changes

### Active Priorities
- JSON-LD structured data (LocalBusiness, Service, FAQPage)
- Security headers in next.config.mjs
- Customer dashboard auth
- AEO/GEO optimization
- E2E tests for booking flow (Playwright)
- Next.js 14 → 16 migration plan

### All Skills & Standards
Full skills (UX/UI, SEO, AEO, GEO, AI Integration, Agentic Integration, Remotion, Global Patterns) defined in parent: `../CLAUDE.md` §7.

---

*Maintained by Claude Code 2026 Agentic Engineering — updated April 2026*
