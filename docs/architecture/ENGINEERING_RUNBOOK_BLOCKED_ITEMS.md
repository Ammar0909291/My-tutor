# Engineering Runbook — Blocked Items (2026-07-26)

Four engineering-designed tasks are ready to execute but were blocked in
this session by sandbox/tool constraints (no raw Postgres TCP; Supabase
MCP unavailable for part of the session). Each entry below is a
copy-paste runbook — any engineer with production Supabase/Vercel access
should be able to execute each in under 15 minutes.

---

## 1. Chemistry AssetIdentity Seeding

**Why it's blocked here:** the seed script connects to Postgres directly
via Prisma (`DATABASE_URL`), which this sandbox's network policy blocks
(HTTPS-only proxy, no raw TCP). Needs a real environment with DB access
(local dev machine, CI runner, or a Supabase MCP session).

**Files involved:**
- `scripts/brain/seed-knowledge-assets.ts` (the script)
- `src/lib/teaching/assets/chemistrySeedAssets.ts` (the content — already
  authored, ~744 conceptId references, verified complete in a prior
  session)

**Exact commands:**
```bash
# 1. Confirm current chemistry row count is 0 (expected before seeding)
npx tsx -e "
import { prisma } from './src/lib/db/prisma'
prisma.assetIdentity.count({ where: { conceptId: { startsWith: 'chem.' } } })
  .then(n => console.log('chemistry rows:', n)).finally(() => prisma.\$disconnect())
"

# 2. Dry run first (writes nothing, just prints what would be created)
npx tsx scripts/brain/seed-knowledge-assets.ts --dry-run

# 3. Seed as DRAFT (recommended — keeps promotion under manual review,
#    matching this program's own standing decision to promote via
#    /api/admin/knowledge-assets rather than bulk-activate)
npx tsx scripts/brain/seed-knowledge-assets.ts --draft
```

**Expected output:** `KG check passed: N concept ids resolved against
live canonical KGs`, followed by one `created EXPLANATION (DRAFT): ...`
or `created PROBE (DRAFT): ...` line per new asset, ending with
`Done. created=<N> skipped=0 status=DRAFT`. `skipped` should be 0 on a
first run (idempotent — reruns after this will show `skipped=<N>,
created=0`).

**Validation after running:**
```bash
npx tsx -e "
import { prisma } from './src/lib/db/prisma'
prisma.assetIdentity.count({ where: { conceptId: { startsWith: 'chem.' } } })
  .then(n => console.log('chemistry rows after seed:', n)).finally(() => prisma.\$disconnect())
"
```
Row count should now be ~744 (matches the source file's entry count).
All rows should be `status: DRAFT` (verify via
`SELECT status, count(*) FROM asset_identity WHERE "conceptId" LIKE
'chem.%' GROUP BY status;`) — 0 ACTIVE until reviewed.

**Rollback:** the script only ever creates rows (never updates/deletes),
so rollback is a straightforward delete:
```sql
DELETE FROM asset_identity WHERE "conceptId" LIKE 'chem.%';
```
(Cascades to `explanation_assets`/`probe_assets` via the FK relation —
confirm cascade behavior in `prisma/schema.prisma` before running in
production; if not cascading, delete children first.)

**Estimated time:** 5–10 minutes (script runtime for ~744 inserts is the
dominant cost; everything else is copy-paste).

---

## 2. Explanation Asset Promotion (DRAFT → ACTIVE)

**Why it's blocked here:** the only supported promotion path is the
authenticated admin endpoint (`PATCH /api/admin/knowledge-assets`),
which requires a real browser session as an `ADMIN_EMAILS`-listed admin.
Confirmed (twice, across two sessions) that no CLI/script/migration
path exists — this is by design, not a gap.

**Files involved:**
- `src/app/api/admin/knowledge-assets/route.ts` (GET to list, PATCH to
  approve/reject)
- `src/lib/teaching/assets/explanationMemory.ts` /
  `versioning.ts` (the underlying review functions)

**Exact steps (via the deployed app, as an admin user):**
```bash
# 1. List DRAFT explanation assets awaiting review (as an authenticated
#    admin, via browser fetch or curl with a valid session cookie)
curl -s 'https://<your-deployment>/api/admin/knowledge-assets?family=explanation&status=DRAFT' \
  -H 'Cookie: <admin session cookie>' | jq

# 2. Approve one asset
curl -s -X PATCH 'https://<your-deployment>/api/admin/knowledge-assets' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: <admin session cookie>' \
  -d '{"family":"explanation","assetId":"<assetId from step 1>","action":"approve"}'
```
Realistically this is done through whatever admin UI wraps this
endpoint, not raw curl — but the endpoint itself is the ground truth.

**Expected output:** `{"success":true,"asset":{...,"status":"ACTIVE"}}`

**Quality pre-check (already done, no need to repeat):** all 694 current
DRAFT explanation rows were verified in a prior session to pass every
automated quality gate in `src/lib/teaching/assets/validation.ts`
(language, familyKind, min length, placeholder/degenerate-text
detection, concept-id-resolves-against-KG). Manual review is now a
content-quality judgment call, not a technical gate.

**Validation after promoting a batch:**
```bash
npx tsx -e "
import { prisma } from './src/lib/db/prisma'
prisma.assetIdentity.count({ where: { family: 'EXPLANATION', status: 'ACTIVE' } })
  .then(n => console.log('ACTIVE explanation assets:', n)).finally(() => prisma.\$disconnect())
"
```
Then confirm `assembleLesson()` actually serves one: trigger a real chat
turn for a concept with a newly-ACTIVE asset and confirm the response
includes `provider: "memory"` (check server logs / response metadata in
`src/app/api/learn/chat/route.ts`'s assembleLesson() call site, ~line
1698).

**Rollback:** `action: "reject"` via the same endpoint sets status back
to a non-serving state — no data loss, fully reversible per-row.

**Estimated time:** varies with how many rows you choose to review per
sitting — 5 minutes per batch of ~20 rows at a skim-review pace, or
longer for careful per-row reading. Not a single 15-minute task if
reviewing all 694 thoughtfully; is a 15-minute task if reviewing a
first small batch to validate the pipeline end-to-end.

---

## 3. Supabase Pool Verification

**Why it's blocked here:** requires Supabase dashboard/API access to
confirm pooler mode (transaction vs session), which this session's MCP
tool did not surface directly (only Postgres-level `connection_limit`
was confirmed via the app's own `DATABASE_URL` params).

**What's already known (from a prior session, verified):**
- `src/lib/db/poolConfig.ts` appends `connection_limit=15`,
  `pool_timeout=20`, `statement_timeout=15000`, `socket_timeout=20` to
  `DATABASE_URL` at client construction (P0 fix, 2026-07-22).
- `src/instrumentation.ts`'s cold-start bootstrap client now uses the
  same params (P5 fix, this program, commit `43d7e748`).
- 2 real pool-exhaustion events in production logs over ~10 days
  (2026-07-15, 2026-07-25), both AFTER the connection_limit=15 fix was
  already live — consistent with genuine traffic bursts against an
  already-reasonably-sized pool, not a misconfiguration.

**What still needs confirming (requires Supabase dashboard or MCP):**
```
1. Supabase Dashboard → Project Settings → Database → Connection Pooling
   - Confirm "Pool Mode": should be "Transaction" for a serverless app
     like this (Vercel functions), NOT "Session" — session mode holds
     a dedicated Postgres connection per pooled connection, which
     defeats the purpose of pooling for a high-concurrency serverless
     workload.
   - Confirm the pooler's own connection ceiling (separate from this
     app's connection_limit=15 param) — if the pooler's own limit is
     close to or below the sum of what all serverless function
     instances might request concurrently, that's the real ceiling,
     not the app's per-instance connection_limit.
2. Confirm DATABASE_URL (used by Prisma at runtime) points at the
   POOLED connection string (port 6543 typically, pgbouncer), and
   DIRECT_URL points at the direct connection (port 5432) — used only
   for migrations. Check both in Vercel's environment variables.
```

**If pool mode is wrong (Session instead of Transaction):** switching
requires Supabase dashboard action (not app code) — flip to Transaction
mode, then re-validate the app still works (transaction mode has
restrictions on session-level features like prepared statements /
advisory locks / `SET` commands outside a transaction — Prisma
generally works fine in transaction mode, but worth a smoke test).

**Rollback:** revert the pooler mode setting in the Supabase dashboard.

**Estimated time:** 10 minutes (mostly dashboard navigation + one
smoke-test request).

---

## 4. Migration Strategy Verification

**Why it's blocked here:** requires querying production's
`_prisma_migrations` table directly, which needs live DB/Supabase
access.

**The concern, precisely:** `vercel.json`'s `buildCommand` runs
`prisma generate && prisma migrate deploy && next build` — but
CLAUDE.md documents this project as `db push`-only, "no migration
files." Yet `prisma/migrations/` genuinely contains 10 real migration
directories on disk (`0_baseline` through
`20260720103826_add_memory_serving_events`) plus `migration_lock.toml`.
This is either (a) harmless — `migrate deploy` is idempotent and simply
no-ops if `_prisma_migrations` already reflects these as applied via a
prior `db push`-based baseline, or (b) a real risk if the migration
history and the actual schema have drifted (e.g. a column added via
`db push` or a raw `ALTER TABLE` in `src/lib/db/prisma.ts`'s
`ensureColumns()` was never captured in the migration history, so
`migrate deploy` might try to reapply something already present, or a
genuinely pending migration might silently fail the build).

**Exact commands to resolve this:**
```bash
# 1. Check what migrations Prisma believes are applied vs. pending,
#    against the REAL production database
npx prisma migrate status

# Expected healthy output: "Database schema is up to date!"
# Concerning output: "following migration(s) have not yet been
#    applied" or "database schema is not in sync"

# 2. If status shows drift, diff the actual schema against what
#    migrations expect
npx prisma migrate diff \
  --from-migrations ./prisma/migrations \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script
```

**Expected output:** `prisma migrate status` reporting "up to date" is
the goal. If it reports pending/failed migrations, that needs
investigation before touching anything further — do NOT run
`migrate resolve` or `migrate deploy` against production without
understanding exactly what's pending first.

**Validation:** after confirming status, spot-check one table each from
before/after the `20260707120000_sync_untracked_schema_drift` migration
(named specifically for this exact class of concern in its own
migration name) still has the expected columns via
`\d <table>` in `psql` or an equivalent Supabase SQL query.

**Rollback:** N/A — this task is verification-only; no changes are
made unless step 1's output reveals something needing a real fix,
which should be scoped as its own separate, carefully-reviewed task.

**Estimated time:** 5 minutes to run `migrate status` and read the
result; more if it reveals drift requiring investigation.
