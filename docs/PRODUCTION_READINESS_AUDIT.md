# My Tutor — Production Readiness & Operational Safety Audit

Sprint FB · Branch `claude/my-tutor-foundation-KDSUO` · 2026-06-16

---

## 1. Deployment Dependency Map

| Layer | Technology | Requirement |
|---|---|---|
| Runtime | Node.js 18+, Next.js 14 App Router | Required |
| Database | PostgreSQL (Neon recommended) | Required |
| Auth | NextAuth v5 JWT | Required — `AUTH_SECRET` |
| AI (primary) | Groq (`llama-3.1-8b-instant`) | Required — `GROQ_API_KEY` |
| AI (Russia) | YandexGPT | Optional — falls back to Groq |
| Rate limiting | Redis | Optional — in-memory fallback |
| OAuth | Google OAuth | Optional — email/password still works |
| Email | SMTP (Gmail/SES) | Required for password reset |
| Monitoring | Sentry / webhook | Optional — strongly recommended |
| Cron | Vercel Cron | Optional — for streak reset etc. |
| Telegram | Bot token | Optional — reminder feature |

---

## 2. Prisma Migration Audit

### Current State

The project uses **`prisma migrate`** (migration files exist, NOT `db push`-only):

```
prisma/migrations/
  0_baseline/
  20260612000000_school_mode_profile_fields/
  20260612000001_profile_speech_rate/
  20260612000002_practice_session_chapter/
  20260612000003_practice_session_kind/
  20260612000004_learning_checkpoint/
  migration_lock.toml
```

Schema uses `directUrl` for `DIRECT_URL` — correct pattern for Neon pooled + direct split.

### Risk Assessment

| Risk | Level | Notes |
|---|---|---|
| `db push` in CI/prod | **CRITICAL** | `db push` drops/recreates — never safe on prod data |
| No migration for `idempotencyKey @unique` (HIGH-6) | **HIGH** | Added in Batch 2 but may not have a migration file |
| `migration_lock.toml` mismatch | Medium | Must match target DB provider |
| Schema drift between dev/prod | Medium | Baseline migration covers initial state; incremental migrations cover all additions |

### Action Items

1. **Verify** that `PracticeSession.idempotencyKey @unique` (added in HIGH-6 fix) has a migration or is in baseline.
2. **Never** run `npx prisma db push` against production — use `prisma migrate deploy`.
3. **Add** `npx prisma migrate deploy` to CI/CD deploy step.
4. **Take a full DB backup** before every migration run.

### Recommended Production Deploy Command

```bash
npx prisma migrate deploy   # apply pending migrations only
npm run build               # next build
```

---

## 3. Environment Variable Audit

### Required (app broken without these)

| Variable | Purpose | Missing Behavior |
|---|---|---|
| `DATABASE_URL` | Prisma primary connection (pooled) | Hard crash on startup |
| `DIRECT_URL` | Prisma direct (migrations only) | `prisma migrate` fails |
| `AUTH_SECRET` | JWT signing key | Auth broken |
| `GROQ_API_KEY` | AI responses | AI returns empty; learning non-functional |
| `SMTP_USER` + `SMTP_PASS` | Password reset email | Reset emails silently fail |

### Optional (degraded but safe without)

| Variable | Purpose | Missing Behavior |
|---|---|---|
| `REDIS_URL` | Distributed rate limiting | Falls back to in-memory (per-process) |
| `GOOGLE_CLIENT_ID/SECRET` | Google OAuth | OAuth login unavailable; email/password works |
| `YANDEX_API_KEY/FOLDER_ID` | Russian AI routing | Falls back to Groq automatically |
| `SENTRY_DSN` | Error reporting | Errors logged to stderr only |
| `MONITORING_WEBHOOK_URL` | Ops alerting | No webhook alerts |
| `AI_GLOBAL_RPM` | Per-minute AI budget cap | Unlimited (Groq quota only protection) |
| `ADMIN_EMAILS` | Admin access list | No admin access |
| `CRON_SECRET` | Secure cron endpoints | Cron endpoints unprotected |
| `TELEGRAM_BOT_TOKEN` | Telegram reminders | Feature disabled |

### Security Concerns

- `ADMIN_EMAILS` — comma-separated email list gating admin access. If empty, no one is admin. If leaked, attackers know which emails to target. **Treat as secret.**
- `AUTH_SECRET` — must be ≥32 bytes random. Rotation requires all users to re-login. **Never commit.**
- `CRON_SECRET` — if unset, cron endpoints are unauthenticated. **Set in production.**

---

## 4. Secrets & Configuration Safety

### Findings

| Item | Status |
|---|---|
| `.env.example` committed, `.env` gitignored | ✅ Safe |
| No hardcoded credentials found in source | ✅ Safe |
| Logging: `console.error` used throughout, never logs passwords or tokens | ✅ Safe |
| Admin bootstrap via `ADMIN_EMAILS` env var (not DB flag) | ✅ Correct pattern |
| `captureError()` in `monitoring.ts` explicitly avoids sending credentials | ✅ Safe |
| `CRON_SECRET` — cron endpoints check `Authorization: Bearer ${CRON_SECRET}` | ✅ If set |
| `passwordHash` stored (bcrypt, cost=12), never `password` column | ✅ Safe |
| VerificationToken stores SHA-256 hash, not raw token (MED-11) | ✅ Fixed |

### Admin Bootstrap Risk

`ADMIN_EMAILS` is the sole admin gate. If this env var is lost or misconfigured, admin access is locked out. **Recommendation:** document the recovery procedure (set env var, redeploy).

---

## 5. AI Provider Architecture

### Documented vs Actual

| Source | Claimed Providers |
|---|---|
| Old `CLAUDE.md` | OpenRouter (primary), Gemini (fallback) |
| Actual `src/lib/ai/router.ts` | **Groq** (primary/global), **YandexGPT** (Russia) |
| Actual `src/lib/ai/client.ts` | **Groq** only |

**CLAUDE.md is outdated.** The AI architecture was migrated from OpenRouter/Gemini to Groq + YandexGPT. The working directory's `CLAUDE.md` should be updated.

### Provider Configuration

- Groq: 20s timeout, 2 retries, model `llama-3.1-8b-instant`
- YandexGPT: 25s timeout via `AbortSignal.timeout`, falls back to Groq on any failure
- JSON generation (`routeJSON`): always Groq, never throws (returns `null` on failure)
- Budget: `AI_GLOBAL_RPM` cap via `consumeAIBudget()` — exceeding returns `null` from `routeJSON`, graceful fallback message from chat routes

---

## 6. Backup & Recovery

### Current State

No automated backup configuration is present in this repository. Backup responsibility falls to the database provider (Neon).

### Recommendations

| Action | Priority |
|---|---|
| Enable Neon point-in-time recovery (PITR) — available on paid plans | **CRITICAL** |
| Take manual DB snapshot before every `prisma migrate deploy` | **CRITICAL** |
| Export schema + data weekly with `pg_dump` to cold storage | High |
| Document restore procedure in ops runbook | High |
| Test restore procedure in staging before launch | High |

### Recovery Procedure (Neon)

```bash
# Restore from Neon branch/snapshot via dashboard or CLI:
neonctl branches restore <branch-id> --timestamp <iso-timestamp>
# Then point DATABASE_URL at restored branch for verification
```

---

## 7. Observability Audit

### What's Instrumented

| System | Instrumentation |
|---|---|
| Auth failures | `console.error` in signIn callback |
| AI failures | `captureError()` → Sentry + `recordFailure()` counter |
| Rate limit hits | `rateLimitResponse()` returns 429 (no alerting) |
| Email failures | `console.error('[forgot-password] email send failed')` |
| Onboarding errors | `console.error('[onboarding] ERROR')` |
| Assessment errors | `console.error` in route handlers |
| `routeJSON` errors | `captureError()` |

### Blind Spots

| Blind Spot | Risk |
|---|---|
| No alert when rate limit hit rate spikes (potential attack) | High |
| No dashboard for AI budget consumption vs quota | Medium |
| `routeJSON` returns `null` silently — caller may not detect failure | Medium |
| No health endpoint (`/api/health`) checking DB + AI connectivity | Medium |
| Failure counters (`getFailureCounters()`) not exposed via any endpoint | Low |
| Telegram bot webhook failures not tracked | Low |

### Recommendation

Add `/api/health` endpoint returning:
```json
{ "db": "ok|error", "ai": "ok|error", "redis": "ok|unavailable", "version": "..." }
```

---

## 8. CI/CD Gate Review

### Current State

**No CI/CD pipeline files found** (no `.github/workflows/`, no `vercel.json` CI gates).

### Mandatory Gates (must be enforced before merge/deploy)

```yaml
# Recommended GitHub Actions gate (add to .github/workflows/ci.yml)
- run: npm ci
- run: npx prisma generate
- run: npx tsc --noEmit
- run: npm test              # 464 tests, all must pass
- run: npm run build
```

### Deployment Gate

```yaml
# Pre-deploy (never skip)
- run: npx prisma migrate deploy
- run: npm run build
```

**Risk:** Without CI gates, a broken commit can reach production undetected. **Add CI before launch.**

---

## 9. Live-Integration Test Checklist

The following tests require a real environment and must be run before launch:

```
LIVE INTEGRATION TEST PLAN
─────────────────────────────────────────────────────────────────
Prerequisites:
  □ Staging environment with real DATABASE_URL + DIRECT_URL
  □ Staging GROQ_API_KEY (use separate org from production)
  □ Staging SMTP credentials
  □ Staging AUTH_SECRET (separate from production)

Database:
  □ Run `npx prisma migrate deploy` on clean DB — verify no errors
  □ Run `npx prisma migrate deploy` on populated DB — verify no data loss
  □ Create user via /api/auth/register — verify row in DB
  □ Verify email normalization (uppercase → lowercase in DB)
  □ Verify PracticeSession.idempotencyKey @unique enforced by DB

Auth:
  □ Register, login, logout cycle
  □ Google OAuth login (if configured)
  □ Password reset email received + link works
  □ Banned user (isDeleted=true) cannot login
  □ Rate limit: 5 requests to /api/auth/forgot-password in 15 min → 429

AI:
  □ Send message in learning session → AI responds
  □ Groq timeout simulation → fallback message displayed
  □ AI budget cap (set AI_GLOBAL_RPM=1) → graceful degradation

Progress:
  □ Complete practice session → TopicProgress created in DB
  □ Submit same session twice → 409 returned
  □ Submit with idempotencyKey twice → second returns 409

School:
  □ School student onboarding → board/grade persisted
  □ Re-onboarding on completed profile → data not overwritten (LOW-4)

Admin:
  □ ADMIN_EMAILS set → admin user can access analytics
  □ Non-admin user → 403 on analytics routes
```

---

## 10. Launch Blocker Report

### CRITICAL — Must Fix Before Launch

| # | Item | Impact | Remediation |
|---|---|---|---|
| C1 | **No CI/CD pipeline** | Broken code can reach production | Add `.github/workflows/ci.yml` with test + build gates |
| C2 | **No automated DB backup** | Data loss on failure or bad migration | Enable Neon PITR; document backup schedule |
| C3 | **`db push` documented in CLAUDE.md** | Developer may run `db push` on prod DB | Update CLAUDE.md to use `migrate deploy` for production |

### HIGH — Must Fix Before Launch

| # | Item | Impact | Remediation |
|---|---|---|---|
| H1 | **CRON_SECRET unset → cron endpoints public** | Attackers can trigger cron jobs manually | Set `CRON_SECRET` in all environments |
| H2 | **No health endpoint** | Deployment health unknown; alerts impossible | Add `/api/health` checking DB + AI |
| H3 | **ADMIN_EMAILS loss = admin lockout** | No recovery path documented | Document admin recovery runbook |
| H4 | **CLAUDE.md AI provider section outdated** (OpenRouter/Gemini claimed) | Developer confusion; wrong credentials provisioned | Update CLAUDE.md to reflect Groq + YandexGPT |

### MEDIUM — Can Fix After Launch (monitor closely)

| # | Item | Impact | Remediation |
|---|---|---|---|
| M1 | **No rate-limit spike alerting** | Attacks may go undetected | Add monitoring alert when 429 rate exceeds threshold |
| M2 | **`routeJSON` silent null** | AI failures invisible without Sentry | Ensure `SENTRY_DSN` is set in production |
| M3 | **Redis optional but recommended** | In-memory rate limiter per-process in multi-pod | Provision Redis for production multi-replica setup |
| M4 | **Failure counters not exposed** | `recordFailure()` counts not visible | Add `/api/health` to expose counters |
| M5 | **No live integration tests in CI** | DB/AI behavior only tested locally | Add staging environment to pipeline |

### LOW — Deferred

| # | Item | Impact | Remediation |
|---|---|---|---|
| L1 | Telegram webhook secret rotation procedure undocumented | Low risk at current scale | Document in ops runbook |
| L2 | AI model (`llama-3.1-8b-instant`) not pinned to version | Model update could change behavior | Pin to specific model version when Groq supports it |
| L3 | `AI_GLOBAL_RPM` not set → Groq quota is only protection | Overspend risk on free tier | Set conservative budget in production |

---

## Operational Checklist (Before Go-Live)

```
PRE-LAUNCH CHECKLIST
─────────────────────────────────────────────────────────────────
Infrastructure:
  □ DATABASE_URL + DIRECT_URL set (Neon pooled + direct)
  □ Neon PITR enabled on production branch
  □ AUTH_SECRET generated (openssl rand -base64 32)
  □ GROQ_API_KEY provisioned
  □ CRON_SECRET generated (openssl rand -hex 32)
  □ SMTP credentials configured and tested
  □ SENTRY_DSN set
  □ ADMIN_EMAILS set

Database:
  □ npx prisma migrate deploy run successfully
  □ Schema verified against production DB
  □ Backup taken and restore tested

CI/CD:
  □ GitHub Actions workflow with: npm ci, prisma generate, tsc, npm test, build
  □ Deploy workflow runs: prisma migrate deploy, then build

Testing:
  □ All 464 unit/integration tests pass in CI
  □ Live integration checklist (Section 9) completed in staging
  □ Smoke test on production: register, login, onboard, start lesson

Monitoring:
  □ Sentry receiving events (trigger test error)
  □ MONITORING_WEBHOOK_URL set (Slack/PagerDuty)
  □ /api/health endpoint returns 200

Security:
  □ NEXTAUTH_URL set to production domain
  □ NEXT_PUBLIC_APP_URL set to production domain
  □ OAuth redirect URIs updated to production domain
```

---

*Audit produced by Sprint FB. Tests: 464 passing (463 pass, 1 skipped). Build: clean.*
