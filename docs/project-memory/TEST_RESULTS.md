# Test Results — Educational Brain

> Latest validation run. Update at the end of every work session.
> Branch: `claude/my-tutor-foundation-KDSUO`.

---

## Last run: handoff verification session

Environment: sandbox (no outbound network, no DATABASE_URL). DB-dependent
checks (`prisma db push`, the physics seed) are recorded in `PROJECT_STATE.md`
§3 from the session that had a live DB; they are not re-runnable here.

### Setup performed first (fresh container)
```
npx prisma generate      # Prisma client was absent → regenerated
npm install              # declared dep 'katex' was uninstalled → installed
```

### Type check
```
npx tsc --noEmit
```
Result: **clean — zero errors.**
(The errors seen before setup — missing `teachingStrategyEvent`,
`visualizationCache`, `COMPUTER_SCIENCE` enum, `katex` — were all
environmental: ungenerated Prisma client + uninstalled dependency. None were
code defects.)

### Offline harness suite
```
for f in scripts/test-*.ts; do npx tsx "$f"; done
```
Result: **2066 assertions passing, 0 failing.**

| Note | Detail |
|------|--------|
| Fixed this session | `scripts/test-build-scenespec.ts` — 6 stale assertions updated to match the intentionally-narrowed `VECTOR_RE` (bare `vector`/`force`/`velocity`/`acceleration` now correctly return null; multi-word vector-addition phrases fire). Now 25/25. |
| Excluded (live/demo, need Groq+network) | `scripts/test-scene-extraction-live.ts`, `scripts/test-visualization-tiebreaker.ts` — no assertion summary by design; require `GROQ_API_KEY`. |

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
