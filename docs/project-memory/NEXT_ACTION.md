# Next Action

> *Single source of truth for "what should I do next." Read this first.
> Update it before stopping any work session.*

---

## Repo status at last handoff (0724396)

Clean working tree. `npx tsc --noEmit` zero errors. Decision Pipeline stages 0–4
implemented and tested (47/47 offline assertions). Fire-and-forget side-car
wired into `/api/learn/chat/route.ts`. Feature flag
`ENABLE_EDUCATIONAL_BRAIN_PIPELINE` default OFF.

---

## Immediately next (Milestone 1 continuation)

1. **EbCurriculum/EbModule backfill for physics** (doc 10 §9 step 4):
   - One `EbCurriculum` row mapping to the physics subject.
   - `EbModule` rows from the existing chapter structure.
   - Extend `scripts/seed-eb-physics.mjs` or add a new seed script.
   - Must be idempotent (upsert).
   - **Requires live DB** — run with `npx tsx scripts/seed-eb-physics.mjs`.

2. **Confirm pgvector availability** in the target Postgres:
   - `CREATE EXTENSION IF NOT EXISTS vector;` against the dev DB.
   - Record result in `PROJECT_STATE.md`. If unavailable, note as
     environment limitation (not architecture problem).

3. **Live end-to-end latency measurement** (doc 03 §8 — p99 ≤ 600ms):
   - Start dev server with `ENABLE_EDUCATIONAL_BRAIN_PIPELINE=true`.
   - Send a physics question through `/api/learn/chat`.
   - The `[EB] pipeline Xms` console.warn line is the wall-clock measurement.
   - Record p50/p95 in `PROJECT_STATE.md`.

4. **Curator UI for `EbExplanation` authoring** — post-validation, Phase 2 M2.

## Do NOT do

- Do NOT await the pipeline on the critical chat response path.
- Do NOT remove or modify any existing chat route logic.
- Do NOT expand beyond physics until the single-subject criterion is met.
- Do NOT begin Phase 3 without explicit user approval.

## Validation checklist before every commit

```
npx tsc --noEmit
npx tsx scripts/test-eb-pipeline.ts
```
