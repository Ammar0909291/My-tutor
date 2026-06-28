# Changelog — Educational Brain

Newest first. One entry per work session/commit batch.

---

## Phase 2, Milestone 1 — bootstrap Project Memory + additive schema + physics seed

- Discovered that no "Educational Brain Constitution" file and no
  `docs/project-memory/` directory existed in the repo, despite being
  referenced as already-existing in the task instructions. Resolved by
  treating `docs/educational-brain/` (the 12 Phase-1 docs) as the
  Constitution/Phase-1 record, and creating `docs/project-memory/`
  (this file, `PROJECT_STATE.md`, `NEXT_ACTION.md`) as the first act of
  Phase 2.
- Added 22 new Prisma models (`Eb`-prefixed) to `prisma/schema.prisma`,
  implementing the doc 10 database-strategy schema sketch almost
  verbatim — the only deviation is the `Eb` prefix, needed because doc
  10's sketch used an unprefixed `Curriculum` model name that collides
  with the existing legacy `Curriculum` model. Pure additive change; no
  existing table/column touched.
  - Fixed one schema error during this work: `EbAssetScore`'s composite
    `@@id` referenced an optional `learningStyle String?` field, which
    Prisma forbids (`@@id` fields must be required) — changed to
    `String @default("")`.
  - Omitted the `pgvector` `embedding` columns from `EbAssetIdentity` and
    `EbSourceSegment` (present in doc 10's sketch) pending confirmation
    that the `pgvector` extension is available in the target Postgres —
    tracked in `NEXT_ACTION.md`.
- Ran `npx prisma db push` (additive only, confirmed) and
  `npx prisma generate`. Validated `npx tsc --noEmit` (0 errors) and
  `npm run build` (succeeds) after the schema change.
- Added `scripts/seed-eb-physics.mjs`: deterministic, idempotent backfill
  of `EbConcept`/`EbConceptEdge` from `physicsKnowledgeGraph.ts` (29
  nodes) and `EbMisconception`/`EbConceptMisconception` from the
  physics-tagged rules in `misconceptionEngine.ts` (4 misconceptions, 6
  concept-links). Ran it once against the local dev database; verified
  row counts directly via `psql`.
- This is doc 10 §9 steps 1-3, scoped to one subject (physics), per the
  doc 11 §2 Milestone 1 plan ("spine + asset catalogue for ONE
  subject").
