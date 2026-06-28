# Next Action

> *Single source of truth for "what should I do next." Read this first.
> Update it before stopping any work session.*

---

## Immediately next (Milestone 1 continuation)

1. **Decision Pipeline runtime, stages 0-2 only** (doc 03), scoped to
   physics, read-only against the new `Eb*` tables:
   - Stage 0 Frame — build `TurnContext` from the incoming chat request.
   - Stage 1 Intent — deterministic regex classification (doc 03), no
     LLM call.
   - Stage 2 Retrieval — query `EbConcept` (+ `EbConceptEdge` for
     neighborhood) by a normalized topic key. This is new, additive code
     — it must not replace or modify the existing `/api/learn/chat`
     pipeline; it should live behind a feature flag
     (`ENABLE_EDUCATIONAL_BRAIN_PIPELINE`, default off) so the legacy path
     keeps serving 100% of traffic until the new path is validated.
2. **`EbCurriculum`/`EbModule` backfill for physics** (doc 10 §9 step 4):
   one `EbCurriculum` row mapping to the existing physics subject in
   `SUBJECT_LIBRARY`, `EbModule` rows from the existing chapter/unit
   structure if one exists for physics in the legacy schema (check
   `Curriculum` model, `subjectCode` field, in `prisma/schema.prisma`)
   — confirm before assuming a 1:1 mapping exists.
3. **Confirm pgvector availability** in the target Postgres before adding
   `embedding` columns — run `CREATE EXTENSION IF NOT EXISTS vector;`
   against the dev DB and record the result here. If unavailable in this
   sandbox, note that as an environment limitation, not an architecture
   problem (doc 09 already assumes pgvector; this is just sequencing).
4. Only after 1-3 are stable: minimal Composition + Persist stages, so a
   single retrieval-only turn can be served end-to-end and measured
   against doc 03 §8's "p99 ≤ 600ms, retrieval-only" budget — this is the
   doc 11 §2 Milestone 1 success criterion ("the new pipeline serves a
   real physics question end-to-end, with a retrieved Explanation asset,
   with Evidence emitted, in less than 600 ms p99").

## Do NOT do yet (explicitly out of scope for this milestone)

- Do not touch `/api/learn/chat` (the production route) to remove or
  bypass any existing logic. New pipeline code is additive and
  feature-flagged.
- Do not start steps 6-9 of doc 10 §9 (dual-write migrations, legacy
  table retirement) — those are post-validation cleanup, scheduled for
  "Phase 2 month 5+" per the doc.
- Do not expand backfill beyond physics until Milestone 1's single-subject
  success criterion is met and measured.
- Do not begin Phase 3 without explicit user approval (standing
  instruction, repeated across multiple prior messages).

## Open questions for the user (raise, don't guess)

- None blocking right now. The schema/seed work just completed didn't
  require a product decision. The next step that *will* need a decision:
  which feature-flag rollout percentage and which specific physics
  topic(s) to pilot stage-2 retrieval against — bring this up once the
  pipeline code exists and is ready to flag on for real traffic.

## Validation checklist to run before every future commit in this track

```
npx prisma format          # schema still valid
npx prisma db push         # still purely additive — check the printed diff
npx prisma generate
npx tsc --noEmit
npm run build
npx tsx scripts/seed-eb-physics.mjs   # idempotent re-run, confirm row counts stable
```
