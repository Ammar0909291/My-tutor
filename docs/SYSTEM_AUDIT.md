# My Tutor — System Audit

**Date:** 2026-06-16  
**Branch:** `claude/my-tutor-foundation-KDSUO`  
**Auditor:** Claude Code (read-only, no code changes)

---

## Executive Summary

| Area | Status | Severity ceiling |
|---|---|---|
| Build & Types | ⚠️ tsc fails; build succeeds | HIGH |
| Schema Integrity | ✅ Schema correct; generated client stale | HIGH |
| Auth & Access | ⚠️ API routes unprotected by middleware | MEDIUM |
| AI Layer | 🔴 CLAUDE.md wrong; console.logs in prod | HIGH |
| Feature Flags | ⚠️ SCHOOL_MODE_ENABLED not an env var | MEDIUM |
| Data Safety | ⚠️ No migration rollback path | HIGH |
| Dead Code / Debt | ⚠️ _legacy dashboard, undocumented env var | LOW–MEDIUM |
| Security Quick Pass | ⚠️ Debug stubs, undocumented var | LOW |
| Test Coverage | 🔴 Zero tests | CRITICAL |

---

## 1. Build & Types

### Finding B-1 — `npx tsc --noEmit` fails with 34 errors
**Severity:** HIGH  
**Files:** `src/app/admin/_actions/users.ts`, `src/app/admin/page.tsx`, `src/app/admin/users/[id]/page.tsx`, `src/app/admin/users/page.tsx`, `src/app/dashboard/_legacy/page.tsx`, `src/lib/auth/admin.ts`

**Root cause:** The Prisma Client is generated at build time (`npm run build` → `prisma generate && next build`). Running `npx tsc --noEmit` without first running `prisma generate` uses a stale generated client that is missing `User.role`, `User.profile`, and `User.studentProgress` — all of which DO exist in `prisma/schema.prisma`. This is not a schema gap; it is a developer ergonomics gap.

**Evidence:**
```
src/lib/auth/admin.ts(9,82): 'role' does not exist in type 'UserSelect<DefaultArgs>'
src/app/admin/users/[id]/page.tsx(51,37): Parameter 'p' implicitly has an 'any' type.
```

**Breakdown of the 34 errors by root cause:**
| Root cause | Error count |
|---|---|
| Stale Prisma client — `User.role` not in generated types | 19 |
| Stale Prisma client — `User.profile` not in generated types | 10 |
| Stale Prisma client — `User.studentProgress` not in generated types | 3 |
| `implicit any` on `.map()` callbacks (separate TS issue) | 2 |

**Fix:** `npx prisma generate` before `npx tsc --noEmit`. The two `implicit any` parameters in `_legacy` page (lines 341, 68) are separate and require explicit typing. CLAUDE.md should be updated to document the `prisma generate` prerequisite for type-checking.

---

### Finding B-2 — `npm run build` succeeds
**Severity:** INFO  
**Evidence:** Build output lists all routes (57 pages, no errors). The `build` script already calls `prisma generate && next build`, so the production artifact is correct.

---

### Finding B-3 — No `test` script in `package.json`
**Severity:** CRITICAL (see Section 9)  
```json
"scripts": {
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

---

## 2. Schema Integrity

### Finding S-1 — `User.role` exists in schema; issue is stale client only
**Severity:** INFO (clarification of previously believed CRITICAL)  
**File:** `prisma/schema.prisma:29`

`User.role` is defined as `role PlatformRole @default(STUDENT)` where `PlatformRole` is `enum PlatformRole { STUDENT; ADMIN }`. The schema is correct. The TS errors are caused entirely by running `tsc` against a stale Prisma Client.

`isAdmin()` in `src/lib/auth/admin.ts` works correctly at runtime when the generated client is current (i.e., after `prisma generate` or `npm run build`).

---

### Finding S-2 — No migration files; `db push` only
**Severity:** HIGH  
**File:** `prisma/schema.prisma`, `CLAUDE.md`

The project uses `npx prisma db push` (no migration files). This means:
- No rollback path for schema changes
- No schema history / audit trail
- Destructive column drops or renames silently mutate production data
- CI cannot gate on migration safety

Schema has 84 models and 32 enums. This is substantial schema state to manage without migrations.

---

### Finding S-3 — Schema complexity; several likely-unused models
**Severity:** LOW  
**File:** `prisma/schema.prisma`

The schema includes models that appear to have no application code referencing them: `Organization`, `OrganizationMember`, `EvidenceRecord`, `ProjectSubmission`, `ProjectFeedback`, `CapstoneProject`, `CapstoneSubmission`, `CareerProfile`, `JobReadiness`, `SocialProfile`, `ClientEvent`, `TeacherNote`, `GuardianLink`. These add migration surface area and DB complexity. They may be planned features, but should be documented.

---

### Finding S-4 — Payment processor is YooKassa (RUB only)
**Severity:** MEDIUM  
**File:** `prisma/schema.prisma` — `Payment` model: `currency String @default("RUB")`

The payment stack is hard-coded to Russian rubles (YooKassa). If the product targets non-Russian markets, a payment provider gap exists. This is not a code defect but is a business-critical constraint with no documentation.

---

## 3. Auth & Access

### Finding A-1 — Middleware does NOT enforce auth on API routes
**Severity:** MEDIUM  
**File:** `src/middleware.ts:29`

```typescript
if (pathname.startsWith('/api/')) {
  // ... rate limit only ...
  return NextResponse.next()  // ← exits before session check
}
```

All `/api/*` routes bypass the page-level session check. Each route handler is responsible for its own auth. Most do call `auth()` — but this is a convention, not enforced infrastructure. A new route added without an auth check will silently be public.

**Routes confirmed to have no auth check (and rationale):**
| Route | Status |
|---|---|
| `GET /api/health` | Intentional — health probe |
| `GET /api/subjects` | Intentional — public subject browser |
| `GET /api/certificates/[code]` | Intentional — public certificate verification |
| `POST /api/auth/forgot-password` | Intentional — pre-auth flow (has rate limit) |
| `POST /api/auth/reset-password` | Intentional — pre-auth flow (has rate limit) |
| `POST /api/auth/register` | Intentional — registration (has rate limit) |
| `POST /api/telegram/webhook` | Intentional — uses `TELEGRAM_WEBHOOK_SECRET` header |
| `POST /api/cron/reminders` | Intentional — uses `CRON_SECRET` header |
| `GET /api/debug-session` | Stub returning 404 — no data exposed |
| `GET /api/test-auth` | Stub returning 404 — no data exposed |
| `POST /api/voice/synthesize` | Returns 410 Gone — deprecated stub, safe |

All cases are safe at current code. Risk is latent: next developer adding a route may not know auth is opt-in.

---

### Finding A-2 — `/library`, `/certificates`, `/leaderboard`, `/school/*` are public pages
**Severity:** LOW  
**File:** `src/middleware.ts:7`

```typescript
const PROTECTED = ['/dashboard', '/onboarding', '/learn', '/profile', '/settings', '/coach', '/quiz', '/flashcards', '/progress']
```

`/library`, `/certificates`, `/leaderboard`, and `/school/*` are not in `PROTECTED`. These pages do call `auth()` inside the page component and redirect if no session — but the middleware does not add them to the `callbackUrl` redirect path on the way in. This is a UX gap rather than a security gap (server-side redirect still fires), but it's worth noting.

---

### Finding A-3 — ADMIN_EMAILS not set in `.env`
**Severity:** HIGH (functional gap)  
**File:** `src/lib/auth/admin.ts:28`, `.env`

`ADMIN_EMAILS` is not set in the deployed `.env` (confirmed empty). Without this, `maybeBootstrapAdmin()` never promotes any user to ADMIN at login — meaning the admin console is permanently inaccessible unless a user's `role` is manually set in the database. No admin can be created through the application UI.

**Path to admin access:** `UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';` directly in the DB, or set `ADMIN_EMAILS` in `.env` and trigger a login.

---

### Finding A-4 — `requireAdmin()` correctly gates all admin server actions
**Severity:** INFO  
**File:** `src/app/admin/_actions/users.ts`

All four server actions (`promoteUser`, `demoteUser`, `disableUser`, `enableUser`) call `await requireAdmin()` as their first statement. The admin layout also independently calls `isAdmin()` and redirects. Defense in depth is correct here.

---

## 4. AI Layer

### Finding AI-1 — CLAUDE.md documents wrong AI stack
**Severity:** HIGH  
**File:** `CLAUDE.md`, `src/lib/ai/router.ts`, `src/lib/ai/client.ts`

CLAUDE.md states: *"AI: OpenRouter primary, Gemini fallback."*

The actual stack (read from source):
- **Primary:** Groq (`llama-3.1-8b-instant`) via `groq-sdk`
- **Fallback (Russia only):** YandexGPT-lite via direct HTTP call to `llm.api.cloud.yandex.net`
- **No OpenRouter, no Gemini, no OpenAI, no Anthropic** in the codebase

Routing logic in `src/lib/ai/router.ts`:
```typescript
// country === 'ru' → YandexGPT; else → Groq
```

`src/lib/ai/client.ts` and `src/lib/ai/router.ts` both use `process.env.GROQ_API_KEY`. `.env.example` documents `GROQ_API_KEY` correctly — but CLAUDE.md is wrong and will mislead any developer using it as reference.

---

### Finding AI-2 — `console.log` and `console.warn` in production AI router
**Severity:** MEDIUM  
**File:** `src/lib/ai/router.ts`

The AI router emits operational logs to stdout on every request:
```typescript
console.log('AI Router: country =', country)
console.log('→ Routing to YandexGPT')
console.log('→ Routing to Groq')
console.warn('Yandex credentials missing — falling back to Groq')
```
Plus `console.error` in `routeJSON`. These are noise in production logs and may incidentally log PII (e.g., if `country` is derived from user data).

---

### Finding AI-3 — AI failures in `routeAI()` swallow errors silently for timeouts
**Severity:** MEDIUM  
**File:** `src/lib/ai/router.ts`

On `AbortError` (timeout), `routeAI()` returns a localised fallback string instead of throwing. While user-friendly, it means a silent degradation — the caller receives what looks like a valid AI response but is actually a static error string. Monitoring (`captureError`) is not called on timeout, so production observability is blind to persistent timeout issues.

---

### Finding AI-4 — `routeJSON()` returns `null` on all failures silently
**Severity:** MEDIUM  
**File:** `src/lib/ai/router.ts`

`routeJSON()` is used for structured JSON generation (quizzes, plans, etc.). It catches all errors and returns `null`. Callers must handle `null` returns. If they do not, downstream JSON parse failures occur silently. No callers were audited for `null` handling — this should be verified.

---

## 5. Feature Flags

### Finding F-1 — `SCHOOL_MODE_ENABLED` is a compile-time constant, not an env var
**Severity:** MEDIUM  
**File:** `src/lib/education/index.ts:4`

```typescript
export const SCHOOL_MODE_ENABLED = false
```

The admin settings UI (`src/app/admin/settings/page.tsx:17`) lists `SCHOOL_MODE_ENABLED` as a runtime-configurable flag with description *"School UI visible to students"*. However, it is a hardcoded compile-time constant. Changing it in any env-var management UI has no effect. Enabling school mode requires a code change and redeploy.

---

### Finding F-2 — `NEXT_PUBLIC_GOOGLE_ENABLED` undocumented
**Severity:** LOW  
**File:** `src/app/auth/login/page.tsx:147`, `src/app/auth/signup/page.tsx:147`, `.env.example`

Google OAuth buttons are gated by `process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true'`, but this variable is absent from `.env.example`. Developers cloning the repo will not know this flag exists. The Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) are documented — only the feature flag is missing.

---

### Finding F-3 — `AI_GLOBAL_RPM` env var with no enforcement context
**Severity:** LOW  
**File:** `src/lib/ai/budget.ts:16`

```typescript
const AI_GLOBAL_RPM = Number(process.env.AI_GLOBAL_RPM ?? 0) || 0
```

Setting this to `0` (default) disables the global AI budget limiter. This is the default in `.env.example` (""). The admin settings page lists it as a config key. If Groq rate limits are hit (free tier), the app degrades to silent fallback messages rather than explicit user feedback.

---

## 6. Data Safety

### Finding DS-1 — No migration history; `db push` is destructive on renames/drops
**Severity:** HIGH  
**File:** `CLAUDE.md`, project root (no `prisma/migrations/` directory)

`prisma db push` does not generate migration files. Any schema change that renames a column, drops a column, or changes an enum value will silently drop data in production. With 84 models and an active user dataset, this is a significant production risk.

**No `prisma/migrations/` directory exists** — the project has never used Prisma Migrate.

**Recommendation:** `prisma migrate dev --name init` to baseline the current schema, then use `prisma migrate deploy` in production.

---

### Finding DS-2 — `user/delete-account` is a soft-delete; no hard-delete or GDPR erasure
**Severity:** MEDIUM  
**File:** `src/app/api/user/delete-account/route.ts`

The delete-account endpoint sets `isDeleted: true, deletedAt: new Date()` and removes the auth session. No PII is actually deleted — name, email, image, and all related data remain in the database. If GDPR/data-erasure compliance is required, this is insufficient.

---

### Finding DS-3 — No database backup or point-in-time recovery documented
**Severity:** MEDIUM

The README and CLAUDE.md document no backup strategy. If the project uses Neon (suggested by the pooler URL pattern in `.env.example`), Neon provides PITR by default on paid plans — but this should be explicitly verified and documented.

---

## 7. Dead Code / Debt

### Finding D-1 — `src/app/dashboard/_legacy/` is a dead directory causing TS errors
**Severity:** MEDIUM  
**File:** `src/app/dashboard/_legacy/page.tsx`

This legacy dashboard is unreachable (the current v2 dashboard is at `/dashboard`). It generates 7 of the 34 TypeScript errors (`role`, `profile`, `studentProgress` references). It should be deleted or its TS errors fixed.

---

### Finding D-2 — Debug/test route stubs are safe but unnecessary dead weight
**Severity:** LOW  
**Files:** `src/app/api/debug-session/route.ts`, `src/app/api/test-auth/route.ts`

Both files are 5-line stubs returning `{ error: 'Not found' }` with status 404. They appear to be intentionally neutered versions of once-functional debug routes. They inflate the route count and could be deleted without user impact.

---

### Finding D-3 — 6 `console.log` calls in production API handlers
**Severity:** LOW  
**Files:** `src/app/api/user/delete-account/route.ts:46`, `src/app/api/tts/route.ts:89,92,96`, `src/app/api/onboarding/route.ts:187,271`

These emit operational messages on every invocation. They should be replaced with a structured logger or removed.

---

### Finding D-4 — CLAUDE.md architecture section is incorrect
**Severity:** MEDIUM  
**File:** `CLAUDE.md`

> *"AI: OpenRouter primary, Gemini fallback."*
> *"Admin gated by `ADMIN_EMAILS` env var (not a DB flag)."*

Both statements are wrong:
1. AI stack is Groq + YandexGPT (see Finding AI-1)
2. Admin is gated by DB `role` field — `ADMIN_EMAILS` is bootstrap-only (see Finding A-3)

---

### Finding D-5 — Middleware bundle is 176 kB
**Severity:** LOW  
**File:** `src/middleware.ts`

The middleware bundle (`ƒ Middleware 176 kB`) is large for an Edge function. This is likely caused by importing from `@/lib/rateLimitEdge` which may pull in heavier dependencies. Edge middleware has tight memory/size constraints. Worth profiling.

---

## 8. Security Quick Pass

### Finding SEC-1 — No secrets exposed in source
**Severity:** INFO

`.env` file exists but is gitignored. No API keys, tokens, or credentials found hardcoded in source files. `AUTH_SECRET`, `GROQ_API_KEY`, `ADMIN_EMAILS`, `YANDEX_API_KEY` are all read from `process.env`.

---

### Finding SEC-2 — Cron and Telegram webhooks use header-based secrets (correct)
**Severity:** INFO  
**Files:** `src/app/api/cron/reminders/route.ts`, `src/app/api/telegram/webhook/route.ts`

Both routes check a secret in the `Authorization` / custom header before processing. This is the correct pattern for unauthenticated webhook endpoints.

---

### Finding SEC-3 — Rate limiting is correctly layered
**Severity:** INFO  
**Files:** `src/middleware.ts`, `src/lib/rateLimitEdge.ts`, `src/lib/rateLimit.ts`

Two-layer rate limiting:
1. **Edge (in-memory, per-IP):** Applies to all `/api/*` in middleware via sliding window
2. **Node (Redis-backed, per-user/IP):** Applied per-handler on sensitive routes (`/api/auth/forgot-password`, `/api/auth/register`, `/api/auth/reset-password`, `/api/coach`, `/api/tts`, `/api/quiz/generate`, `/api/learn/chat`)

Well-structured. Note: Edge rate limit is in-memory and resets on cold starts — provides best-effort protection only.

---

### Finding SEC-4 — `voice/synthesize` route is a deprecated stub, not a data leak
**Severity:** INFO  
**File:** `src/app/api/voice/synthesize/route.ts`

Returns `410 Gone` with no data. Grep flags it as missing auth but it has no functionality to protect.

---

### Finding SEC-5 — No input sanitization audit performed
**Severity:** MEDIUM (unverified)

This audit did not trace every user-supplied string through to database writes or AI prompts. The primary risk surfaces are: `api/learn/chat` (user messages sent to Groq), `api/coach` (same), `api/quiz/generate` (user topic input), and all form routes. Prisma's parameterised queries protect against SQL injection. AI prompt injection (sending adversarial content to the LLM) is not mitigated — this is a known open problem in the field, but should be documented.

---

## 9. Test Coverage

### Finding T-1 — Zero tests exist
**Severity:** CRITICAL  
**Evidence:**
```
npm test → npm error Missing script: "test"
find . -name "*.test.ts" -o -name "*.spec.ts" → (no output)
find . -name "jest.config*" -o -name "vitest.config*" → (no output)
```

The entire application — including auth, admin actions, AI routing, school progress logic, quiz generation, XP calculations, streak engines, and adaptive planning — has no automated tests. Zero unit tests, zero integration tests, zero E2E tests.

This is the highest severity finding. Any refactor, schema change, or new feature risks silent regressions with no safety net.

---

## Ranked Fix List

| Priority | Finding | Action | Effort |
|---|---|---|---|
| 1 | **T-1** — Zero tests | Add Vitest unit tests for critical path: `isAdmin`, `routeAI`, `getDailyStudyPlan`, `getStudyStreak`, XP calculations. Add Playwright E2E for login → dashboard → learn flow. | High |
| 2 | **DS-1** — No migration history | Baseline with `prisma migrate dev --name init`; switch to `prisma migrate deploy` in CI. Stops `db push` from silently dropping columns. | Medium |
| 3 | **A-3** — ADMIN_EMAILS not set | Document in `.env.example` with a comment; set the env var in production so an admin account can be created. | Low |
| 4 | **AI-1 / D-4** — CLAUDE.md wrong | Update CLAUDE.md: AI stack is Groq + YandexGPT; admin gate is DB role (`ADMIN_EMAILS` is bootstrap only). Add note: run `npx prisma generate` before `npx tsc --noEmit`. | Trivial |
| 5 | **B-1** — TS errors on `tsc --noEmit` | Fix the 2 implicit-any errors in `_legacy` page. Delete `_legacy` directory (D-1) to eliminate the other 7 errors instantly. | Low |
| 6 | **F-1** — `SCHOOL_MODE_ENABLED` not an env var | Either: (a) convert to `process.env.SCHOOL_MODE_ENABLED === 'true'` and document in `.env.example`, or (b) remove from admin settings UI since it cannot be configured at runtime. | Low |
| 7 | **F-2** — `NEXT_PUBLIC_GOOGLE_ENABLED` undocumented | Add to `.env.example` with comment: `NEXT_PUBLIC_GOOGLE_ENABLED="false"  # Set to "true" to show Google OAuth button`. | Trivial |
| 8 | **AI-2** — Console.logs in AI router | Replace with structured logger or remove; add `captureError` on timeout. | Low |
| 9 | **DS-2** — Soft-delete only; no GDPR erasure | Add a GDPR hard-delete path if regulatory compliance is required. | Medium |
| 10 | **D-1** — `_legacy` dashboard directory | Delete `src/app/dashboard/_legacy/`. It is unreachable, causes TS errors, and documents obsolete patterns. | Trivial |
| 11 | **D-2** — Debug/test route stubs | Delete `src/app/api/debug-session/` and `src/app/api/test-auth/`. | Trivial |
| 12 | **A-1** — API auth is per-handler opt-in | Add a comment block in `src/middleware.ts` documenting this convention; consider an `api-auth-check` lint rule. | Low |
| 13 | **SEC-5** — No prompt-injection mitigation | Document known risk; add input length limits on AI-facing routes. | Low |
| 14 | **D-5** — 176 kB middleware bundle | Profile `lib/rateLimitEdge` imports; reduce bundle if possible. | Medium |

---

## Running Instructions

```bash
# Fresh setup
cp .env.example .env
# Edit .env: set DATABASE_URL, AUTH_SECRET, GROQ_API_KEY, ADMIN_EMAILS

npm install

npx prisma db push          # apply schema to DB (no migration files)
# Or (recommended): npx prisma migrate dev --name init

# Type checking (requires generated client first)
npx prisma generate
npx tsc --noEmit            # should show 2 errors (implicit any in _legacy); 0 after deleting _legacy

# Build
npm run build               # prisma generate + next build — must pass clean

# Dev server
npm run dev                 # http://localhost:3000

# Lint
npm run lint

# Tests — none exist yet (see Finding T-1)
```
