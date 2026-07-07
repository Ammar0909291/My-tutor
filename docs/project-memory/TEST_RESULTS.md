# Test Results — Educational Brain

> Latest validation run. Update at the end of every work session.
> Branch: `claude/my-tutor-foundation-KDSUO`.

---

## Last run: Phase 2 Educational Brain continuation session

Environment: sandbox (no outbound network, no DATABASE_URL). DB-dependent
checks (`prisma db push`, the physics seed, live pipeline verification) require
a live Postgres instance and are not re-runnable here. See `verify-eb-live.ts`
for the DB-side verification script.

### Type check
```
npx tsc --noEmit
```
Result: **clean — zero errors.**

### Offline harness suite
```
for f in scripts/test-*.ts; do npx tsx "$f"; done
```
Result: **2108 assertions passing, 0 failing.**

| Script | Assertions | Notes |
|--------|-----------|-------|
| test-eb-pipeline.ts | 66 | Decision Pipeline stages 0,1,3 + feature flag + edge cases |
| test-misconception-rules.ts | 444 | Largest suite — all misconception pattern checks |
| test-lesson-plan-card-items.ts | 67 | |
| test-logic-gate-scene.ts | 66 | |
| test-teaching-output-bias.ts | 63 | |
| All others | ~1302 | See per-file list in session output |
| **Excluded (live)** | — | `test-scene-extraction-live.ts`, `test-visualization-tiebreaker.ts` require `GROQ_API_KEY` |

### Benchmark (offline stages 0+1+3)
```
npx tsx scripts/benchmark-eb-pipeline.ts
```
Result: **full offline pipeline p99 = 0.038 ms** — leaves 600 ms headroom for DB stages (doc 03 §8 target: p99 ≤ 600 ms total).

## Reproduce locally
```
npm install
npx prisma generate
npx tsc --noEmit
for f in scripts/test-*.ts; do echo "--- $f ---"; npx tsx "$f"; done
# DB-side (needs DATABASE_URL):
npx prisma db push
npx tsx scripts/seed-eb-physics.mjs
```
