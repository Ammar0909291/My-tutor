# Deployment & Operations Guide

Created in Sprint AR. Covers production environment setup, deployment,
rollback, database restore, and monitoring/alerting.

Assumed stack: **Vercel** (region `sin1`, see `vercel.json`) + **Neon
PostgreSQL** + **Upstash Redis** + **Groq** + **Sentry**. Everything below
also applies to self-hosted deployments with the obvious substitutions.

---

## 1. Production environment checklist

Set these in Vercel → Project → Settings → Environment Variables.

### Required — the app is broken or unsafe without these

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Neon **pooled** URL with `?sslmode=require&connection_limit=1&pool_timeout=20` |
| `DIRECT_URL` | Neon **direct** (non-pooled) URL — used only by `prisma migrate deploy` / `db push` |
| `AUTH_SECRET` | `openssl rand -base64 32` — never reuse between environments |
| `GROQ_API_KEY` | Core AI provider; every tutor/coach/quiz feature fails without it |
| `NEXT_PUBLIC_APP_URL` | Public URL (e.g. `https://app.example.com`) — used in emails, referral links, Telegram links |
| `CRON_SECRET` | `openssl rand -hex 32` — the reminders cron denies all requests when unset |
| `REDIS_URL` | Upstash/any Redis. **All rate limiting (per-user, per-IP, global AI budget) is silently OFF without it** |

### Strongly recommended

| Variable | Notes |
|---|---|
| `SENTRY_DSN` | Error reporting (no-op when unset). Free tier is enough |
| `AI_GLOBAL_RPM` | Global AI budget shared by all users. Set to your Groq per-minute quota (free tier: `30`). Unset/0 = disabled |

### Optional — feature degrades cleanly when unset

| Variable | Feature lost when unset |
|---|---|
| `SMTP_HOST/PORT/SECURE/USER/PASS/FROM` | Password reset + welcome emails |
| `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` | Google login (button hidden) |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_WEBHOOK_SECRET` | Telegram reminders/webhook |
| `YANDEX_API_KEY` + `YANDEX_FOLDER_ID` | Russia-region AI/TTS (falls back to Groq) |
| `ADMIN_EMAILS` | Admin analytics access (empty = nobody) |

---

## 2. Deployment checklist

The schema is now managed by **Prisma Migrate** (baseline `0_baseline`,
Sprint AR). Never run `prisma db push` against production again.

### One-time: baseline the production database

The local/dev database has already been baselined. Production (or any
existing environment with data) must be baselined ONCE before the first
`migrate deploy`:

```bash
# Tell Migrate the production DB already matches 0_baseline.
# This only writes a row to _prisma_migrations — it does NOT touch data.
DATABASE_URL=<prod pooled> DIRECT_URL=<prod direct> \
  npx prisma migrate resolve --applied 0_baseline
```

### Every deployment

1. CI green: `npm run type-check && npm run lint && npm run build`
2. New schema changes? Create them as migrations during development:
   `npx prisma migrate dev --name <change>` (never edit the DB directly)
3. Apply migrations to production **before** the new code serves traffic:
   `npx prisma migrate deploy`
   - On Vercel, set the build command to:
     `prisma generate && prisma migrate deploy && next build`
     (requires `DIRECT_URL` in build-time env)
4. Deploy; then verify:
   - `GET /api/health` returns `{"status":"ok","db":true,"redis":"ok"}`
     with an empty `config.missing` array (non-empty means a required
     env var from section 1 is unset — fix before treating the deploy
     as healthy, even though the endpoint still returns 200/503 based
     on DB reachability alone)
   - log in, send one tutor message, open one insights panel
5. Watch Sentry + Vercel logs for 10 minutes after deploy.

### Knowledge Assets / Explanation Memory seeding (one-time, then as-needed)

`assembleLesson()` (the canonical authored-content serving path — see
`docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` §6.3) only ever serves
content that has already been seeded as `ACTIVE` `AssetIdentity` rows.
This is easy to overlook because the app degrades silently and
correctly without it (every turn falls back to the LLM) — nothing
breaks, but no production deployment actually serves authored content
until this has been run at least once:

```bash
# Seeds the authored Educational Brain concept entries as ACTIVE
# AssetIdentity rows (idempotent — existing canonicalSlug rows are
# skipped, never duplicated or overwritten).
DATABASE_URL=<prod pooled> DIRECT_URL=<prod direct> \
  npm run seed:brain-assets
```

Verify it worked: after seeding, a chat turn on one of the seeded
concepts (`math.arith.fractions`, `phys.mech.newtons-first-law`,
`eng.phonics.letter-sound-correspondence`, `eng.phonics.phonemic-awareness`
as of this writing) should return `provider: "memory"` in its response
instead of `"groq"`/`"yandex"`.

Whether this has actually been run against the current production
database cannot be verified from a read-only repository audit — an
operator with production database access must confirm it directly
(query `SELECT count(*) FROM asset_identity WHERE status = 'ACTIVE'`,
or check the chat response `provider` field live).

---

## 3. Rollback checklist

1. **Code rollback** (no schema change involved): Vercel → Deployments →
   previous deployment → *Promote to Production*. Done in under a minute.
2. **Code + additive schema change** (new table/column/index): promote the
   previous deployment; the extra column/table is harmless to old code.
   Do NOT try to down-migrate while investigating.
3. **Destructive schema change went wrong** (dropped/renamed column):
   there is no automatic down path — restore the database (section 4)
   to the pre-deploy point, then promote the previous deployment.
4. After any rollback: re-check `/api/health`, then write down what
   happened before re-attempting.

Prevention: keep migrations additive whenever possible (add column →
backfill → switch reads → drop in a LATER release).

---

## 4. Database restore checklist (Neon)

Neon free tier keeps point-in-time history (~24h on free, longer on paid —
verify your plan's retention BEFORE you need it).

1. Stop writes: Vercel → pause deployments or enable maintenance page.
2. Neon Console → Branches → *Restore* → pick timestamp just before the
   incident. Neon creates a new branch at that point in time.
3. Sanity-check the restored branch (connect with psql, verify the
   affected rows).
4. Either promote the restored branch or point `DATABASE_URL`/`DIRECT_URL`
   at it (update Vercel env, redeploy).
5. Re-run `npx prisma migrate resolve --applied 0_baseline` ONLY if the
   restored branch predates the baseline row in `_prisma_migrations`.
6. Verify `/api/health`, log in, spot-check user data. Resume traffic.

Self-hosted fallback: nightly `pg_dump -Fc` to object storage + WAL
archiving. There is currently NO in-repo dump tooling — Neon PITR is the
strategy of record.

**Run a restore drill once before launch** — restoring to a throwaway
branch takes ~10 minutes and proves the runbook works.

---

## 5. Monitoring & alerting

### What exists in the codebase

- `GET /api/health` — unauthenticated probe: 200 + `{db, redis}` status,
  503 when the database is unreachable (Redis never fails the check).
- Sentry reporting via `src/lib/monitoring.ts` (`captureError`) — active
  when `SENTRY_DSN` is set. Captures: route failures in learn/chat, coach,
  onboarding, teaching-engine, and the school practice/assessment/mock
  generators; both cron jobs; swallowed AI failures
  (`generateJSON`/`routeJSON`); and database connection failures that
  survive all `withRetry` attempts. Deduped (5 min) and capped
  (20 events/min) so the free tier is not flooded.
- Global AI budget (`AI_GLOBAL_RPM`) — exhaustion returns a friendly 429
  on chat/coach and degrades to null (skip) for background generation;
  logged as `[ai/budget]` warnings.

### Recommended setup (~30 minutes total)

1. **Uptime**: UptimeRobot/Pingdom/Betterstack free tier → check
   `https://<app>/api/health` every 1-5 min, alert on non-200.
2. **Sentry alerts** (free tier includes alert rules):
   - "more than 10 events in 1 hour" → email/Slack (error spike)
   - issue alert on `route:db/withRetry` → page immediately (DB down)
   - issue alert on `stage:ai` events → AI provider failing
3. **Groq quota**: watch for `[ai/budget]` warnings in Vercel logs and
   429-rate on chat; console.groq.com shows live usage. If budget 429s
   are frequent, raise the Groq tier — do not raise `AI_GLOBAL_RPM`
   beyond the actual provider quota.
4. **Logs**: Vercel free tier retains ~1h. Add a free log drain
   (Axiom/Betterstack) for 30-day retention when real users arrive.
5. **Cron**: two scheduled jobs in `vercel.json` — `/api/cron/reminders`
   (daily, 09:00 UTC) and `/api/cron/evidence-report` (weekly, Monday
   08:00 UTC). Both require `CRON_SECRET` (deny all requests when unset)
   and both report failures via `captureError`. Vercel → Cron tab shows
   every invocation; Sentry will catch exceptions when `SENTRY_DSN` is set.
