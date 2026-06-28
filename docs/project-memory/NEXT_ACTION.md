# Next Action

> *Single source of truth for "what should I do next." Read this first.
> Update it before stopping any work session.*

---

## Repo status at last handoff (b04094c)

Clean working tree. `npx tsc --noEmit` clean. Decision Pipeline stages 0–2
implemented and tested (36/36 offline assertions). Feature flag
`ENABLE_EDUCATIONAL_BRAIN_PIPELINE` default OFF.

---

## Immediately next (Milestone 1 continuation)

1. **EbCurriculum/EbModule backfill for physics** (doc 10 §9 step 4):
   - One `EbCurriculum` row mapping to the physics subject.
   - `EbModule` rows from the existing chapter structure.
   - Extend `scripts/seed-eb-physics.mjs` or add a new seed script.
   - Must be idempotent (upsert), run `npx tsx scripts/seed-eb-physics.mjs`
     to verify no new errors after the change.

2. **Confirm pgvector availability** in the target Postgres:
   - `CREATE EXTENSION IF NOT EXISTS vector;` against the dev DB.
   - Record result in `PROJECT_STATE.md`. If unavailable, note as
     environment limitation (not architecture problem).

3. **Minimal Composition + Persist** so a single retrieval-only turn
   can be served end-to-end and measured against doc 03 §8 (p99 ≤ 600ms):
   - Add `compositionStage.ts` — takes `TurnContext` with `conceptContext`
     and appends a brief tutor context note (no LLM; format only).
   - Add `persistStage.ts` — writes one `EbEvidenceEvent` row for the
     retrieval (marks that the concept was surfaced for this user turn).
   - Add to `pipeline.ts` after retrievalStage.
   - This completes the Milestone 1 success criterion from doc 11 §2.

4. **Wire pipeline into `/api/learn/chat/route.ts`** as a PARALLEL,
   non-blocking side-car — ONLY when the flag is `true`. Pattern:
   ```ts
   // In route.ts, after the existing response is assembled:
   runEducationalBrainPipeline({ userId, sessionId, subjectSlug, userMessage })
     .catch(() => {}) // non-fatal, never awaited on the critical path
   ```
   This is additive: the pipeline runs asynchronously alongside the
   existing response, does NOT block the chat reply, does NOT replace
   any existing behaviour.

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
