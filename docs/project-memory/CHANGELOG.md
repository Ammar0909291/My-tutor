# Changelog — Educational Brain

Newest first. One entry per work session/commit batch.

---

## Phase 2, Milestone 1 — Test expansion + latency benchmark + seed extension (pending commit)

- `scripts/seed-eb-physics.mjs`: extended with EbCurriculum (1 row,
  `eb.physics.cbse_11_12`) and EbModule (9 rows mapping to PHYSICS_TREE
  slugs). Awaiting live DB to run; code complete and idempotent.
- `scripts/benchmark-eb-pipeline.ts` (NEW): measures offline stage latency
  (stages 0,1,3) over 1000 iterations. Result: p99 = 0.038 ms total —
  leaves full 600 ms budget for DB stages (doc 03 §8 target).
- `scripts/verify-eb-live.ts` (NEW): 19-assertion live verification script
  for when DB is available; validates seed counts, full pipeline,
  EbEvidenceEvent write, composedContextNote, and latency < 600 ms.
- `src/lib/educationalBrain/intentStage.ts`: kinematics pattern extended
  to recognize equation-of-motion notation (`v=u+at`, `s=ut`, "equations
  of motion") in addition to natural-language keywords.
- `scripts/test-eb-pipeline.ts`: expanded from 47 to 66 assertions —
  19 new edge-case checks for Composition (description boundary, neighbor
  filtering), Intent (case-insensitive, equations, emotion+topic combo),
  and Frame (UUID uniqueness, null slug, long message).
- `npx tsc --noEmit`: zero errors. All 2108 offline assertions pass.

---

## Phase 2, Milestone 1 — Decision Pipeline stages 3-4 + route wire-up (0724396)

- `src/lib/educationalBrain/compositionStage.ts`: Stage 3 — pure. Formats
  CONCEPT CONTEXT note from ConceptContext; description truncated at 200 chars;
  prerequisite neighbors only (≤3); passthrough on shortCircuit/no concept.
- `src/lib/educationalBrain/persistStage.ts`: Stage 4 — async. Writes
  EbEvidenceEvent (ASSET_SHOWN / CONCEPT_SURFACE / strength=0.5) per turn that
  surfaces a concept. Non-fatal; skips on shortCircuit.
- `src/lib/educationalBrain/types.ts`: added `composedContextNote: string | null`
  field to TurnContext.
- `src/lib/educationalBrain/frameStage.ts`: initialises `composedContextNote: null`.
- `src/lib/educationalBrain/pipeline.ts`: updated to run all 5 stages; adds
  wall-clock `[EB] pipeline Xms` log.
- `src/app/api/learn/chat/route.ts`: fire-and-forget side-car via
  `void import(...).then(run).catch(() => {})` — never blocks chat response.
- `scripts/test-eb-pipeline.ts`: expanded to 47 assertions (Stage 3 section added).
- `npx tsc --noEmit`: zero errors. All 47 offline assertions pass.

---

## Phase 2, Milestone 1 — Decision Pipeline stages 0–2 (b04094c)

- `src/lib/educationalBrain/types.ts`: TurnContext, IntentClassification,
  ConceptContext, AssetBundle, PipelineSpan types.
- `src/lib/educationalBrain/frameStage.ts`: Stage 0 — builds TurnContext
  from userId/sessionId/subjectSlug/userMessage. Pure, synchronous.
- `src/lib/educationalBrain/intentStage.ts`: Stage 1 — deterministic regex
  classification. questionShape (5 classes), studentEmotion (4+null),
  topicSurfaces (15 physics concept patterns → EbConcept ids). No LLM.
- `src/lib/educationalBrain/retrievalStage.ts`: Stage 2 — read-only Prisma
  queries. Loads EbConcept + EbConceptEdge neighborhood (up to 10 edges) +
  EbAssetIdentity bundle. Never throws; shortCircuit on DB error.
- `src/lib/educationalBrain/pipeline.ts`: orchestrator with
  ENABLE_EDUCATIONAL_BRAIN_PIPELINE flag (default OFF). Returns null
  immediately when off — zero overhead on prod traffic.
- `scripts/test-eb-pipeline.ts`: 36 offline assertions, 36/36 pass.
- `/api/learn/chat/route.ts` NOT modified.
- `npx tsc --noEmit` clean.

---

## Phase 2, Milestone 1 — verification pass + stale-test fix (handoff session)

- Goal of this session: finish the in-progress Milestone-1 work, run all
  validation/tests possible without DB/network, fix any failures, refresh
  Project Memory, and leave the repo clean for the next session.
- Synced local to the remote tip of `claude/my-tutor-foundation-KDSUO`
  (the prior session's `ba65966`, which already contained the additive
  `Eb*` schema + `seed-eb-physics.mjs` + the bootstrap memory files).
  No divergent/duplicate work was force-pushed.
- Restored the sandbox build environment: `npx prisma generate` (Prisma
  client was absent in the fresh container) and `npm install` (the
  declared `katex` dependency was not installed). After both, `npx tsc
  --noEmit` is **fully clean** — the earlier errors were purely
  environmental (ungenerated client, uninstalled dep), not code defects.
- Fixed a **stale test**, not a code regression: `buildSceneSpec.ts`'s
  `VECTOR_RE` had been intentionally narrowed (documented inline) to match
  only genuine vector-ADDITION phrases, so bare `vector`/`force`/`velocity`/
  `acceleration`/`displacement` no longer emit a misleading single-arrow
  scene. `scripts/test-build-scenespec.ts` still asserted the old
  bare-keyword behavior (6 failures). Updated the harness to assert the
  documented intended behavior: multi-word phrases (`vector addition`,
  `resultant vector`, `head-to-tail`, `parallelogram law`) fire the scene;
  bare motion words now return null (added as regression cases). 25/25 pass.
- Full offline harness suite: **2066 assertions passing, 0 failing**
  across all `scripts/test-*.ts` (excludes the two live/demo scripts that
  require a `GROQ_API_KEY` + network: `test-scene-extraction-live.ts`,
  `test-visualization-tiebreaker.ts`). See `TEST_RESULTS.md`.
- No schema, runtime, or pipeline code changed this session — the only
  edit was the stale test. Milestone-1 data-side scope is unchanged and
  remains complete; the Decision Pipeline runtime (next chunk) was **not**
  started, per "do not start new milestones / leave no partial work."

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
