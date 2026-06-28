# Next Action

> *Single source of truth for "what should I do next." Read this first.
> Update it before stopping any work session.*

---

## Repo status at last handoff (a6f1fb1 + uncommitted changes being committed now)

Clean working tree after current commit. `npx tsc --noEmit` zero errors.
Decision Pipeline stages 0–4 implemented and tested (66/66 offline assertions,
2108 total assertions across all test scripts). Fire-and-forget side-car wired
into `/api/learn/chat/route.ts`. EbCurriculum/EbModule seed code complete.
Offline latency benchmark: p99 = 0.038 ms (trivial vs 600 ms budget).

---

## Immediately next — requires a live Postgres DB

All offline code is complete. The remaining Milestone 1 items need a database:

1. **Run the extended seed script** (EbCurriculum + EbModule now included):
   ```
   npx tsx scripts/seed-eb-physics.mjs
   ```
   Expected output: `Seeded 29 EbConcept, 29 EbConceptEdge, 4 EbMisconception,
   6 EbConceptMisconception links, 1 EbCurriculum, 9 EbModule.`

2. **Confirm pgvector availability**:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
   Record result in `PROJECT_STATE.md`. If unavailable, document as environment
   limitation; architecture is unchanged.

3. **Run live verification** (19 assertions, all must pass):
   ```
   DATABASE_URL=... npx tsx scripts/verify-eb-live.ts
   ```
   Covers: seed row counts, full pipeline, EbEvidenceEvent written,
   composedContextNote generated, latency < 600 ms.

4. **Latency measurement via dev server**:
   ```
   ENABLE_EDUCATIONAL_BRAIN_PIPELINE=true npm run dev
   ```
   Send `POST /api/learn/chat` with a physics question. Read `[EB] pipeline Xms`
   from server logs. Target p99 ≤ 600 ms (doc 03 §8).

## After live verification passes

Request user approval to begin Phase 2 Milestone 2 (Evidence Engine on).
Do NOT begin without explicit approval per standing instruction.

## Do NOT do

- Do NOT await the pipeline on the critical chat response path.
- Do NOT remove or modify any existing chat route logic.
- Do NOT expand beyond physics until the single-subject criterion is met.
- Do NOT begin Phase 3 without explicit user approval.
- Do NOT begin Milestone 2+ without explicit user approval.

## Validation checklist before every commit

```
npx tsc --noEmit
npx tsx scripts/test-eb-pipeline.ts   # 66/66 expected
```
