# Project State — Educational Brain

> *Source of truth for "what phase, what sprint, what's actually built."
> Updated at the end of every work session. Cross-check against the repo,
> not against memory — if this drifts from reality, fix this file.*

---

## 0. Bootstrap note

This file (and `NEXT_ACTION.md`, `CHANGELOG.md`) did not exist before this
session. Earlier instructions referred to an "Educational Brain
Constitution" and a `docs/project-memory/` directory as already-existing,
already-read documents. Neither existed in the repository. A repo-wide
search (`find . -iname '*constitution*'`, `find . -ipath '*project*memory*'`)
returned nothing prior to this session.

**Resolution applied**: `docs/educational-brain/` (12 documents, authored
and committed in the immediately preceding session) is the only artifact
that matches the description of a Constitution / Phase-1 record, so it is
treated as that record. This directory (`docs/project-memory/`) is created
now, as the first concrete act of Phase 2, to satisfy the standing
requirement that Phase 2 work be tracked in PROJECT_STATE / NEXT_ACTION /
CHANGELOG going forward.

---

## 1. Phase status

| Phase | Status |
|-------|--------|
| Phase 1 — Architecture (design docs 01-11 under `docs/educational-brain/`) | **Complete.** Verdict A recorded in doc 11 §13: "approve, start milestone 1." |
| Phase 2 — Milestone 1: spine + asset catalogue for ONE subject (physics) | **In progress.** Step 1 (additive schema) and steps 2-3 (Concept + Misconception backfill, physics only) of doc 10 §9 are done. Steps 4-9 not started. |
| Phase 3+ | Not started. Requires explicit approval before beginning, per standing instruction. |

---

## 2. What exists in the repository right now

### Architecture record (Phase 1 — read-only reference, do not redesign without new evidence)

`docs/educational-brain/README.md` + `01` through `11` — the full design:
asset model, knowledge graph, decision pipeline, evidence engine, memory
system, AI integration, knowledge acquisition, visualization strategy,
scaling, database strategy, risks/roadmap.

### Phase 2 implementation so far

- **`prisma/schema.prisma`** — additive Educational Brain tables appended
  after `VisualizationCache` (the last legacy model). All new models are
  prefixed `Eb` (Educational Brain) to avoid colliding with the existing
  legacy `Curriculum` model (the doc 10 schema sketch used an unprefixed
  `Curriculum`, which would have collided). This is a naming-only
  deviation from doc 10; the architecture is unchanged. Models added:
  `EbConcept`, `EbConceptEdge`, `EbMisconception`, `EbConceptMisconception`,
  `EbLearningObjective`, `EbObjectiveConcept`, `EbCurriculum`, `EbModule`,
  `EbModuleObjective`, `EbAssetIdentity`, `EbExplanation`, `EbVisual`,
  `EbProbe`, `EbKnowledgeAcquisitionTrace`, `EbSourceSegment`,
  `EbLearnerConceptMastery`, `EbLearnerActiveMisconception`,
  `EbEvidenceEvent`, `EbAssetScore`, `EbBrainConfig`, `EbExperiment`,
  `EbExperimentAssignment`. Pushed via `prisma db push` (no migration files
  in this repo, per CLAUDE.md convention). `npx tsc --noEmit` and
  `npm run build` both pass after the change.
  - **Deferred, not yet implemented**: `pgvector` embedding columns
    (`AssetIdentity.embedding`, `SourceSegment.embedding` in doc 10) were
    *omitted* from the Prisma model — the sandbox Postgres instance has no
    confirmed `pgvector` extension, and adding an `Unsupported("vector(...)")`
    column without the extension installed would break `db push`. Tracked
    as a Milestone-1 follow-up: confirm `CREATE EXTENSION vector` works in
    the target environment, then add the columns additively.
  - No existing legacy table, column, or model was modified, renamed, or
    dropped. Zero risk to current production functionality.
- **`scripts/seed-eb-physics.mjs`** — deterministic one-shot backfill
  (doc 10 §9 steps 2-3, scoped to one subject per Milestone 1's plan):
  reads `src/lib/education/physicsKnowledgeGraph.ts` (29
  `KnowledgeNode`s) → upserts `EbConcept` + `EbConceptEdge`
  (`prerequisite_of`, from each node's `prerequisites[]`); reads the
  physics-tagged rules in `src/lib/school/adaptive/misconceptionEngine.ts`
  → upserts `EbMisconception` + `EbConceptMisconception` (best-effort
  pattern-to-concept mapping, documented inline in the script, confidence
  0.5). Idempotent (`upsert` throughout) — safe to re-run.
  - **Verified result** (this session, against the local dev Postgres):
    29 `EbConcept` rows, 29 `EbConceptEdge` rows, 4 `EbMisconception` rows
    (of the 5 physics-tagged rules in `misconceptionEngine.ts` — one,
    `force_motion`, ended up sharing the same target concept as another
    rule via the mapping table, so distinct-misconception count is 4 with
    6 concept-links total), 6 `EbConceptMisconception` link rows.
  - Run with: `npx tsx scripts/seed-eb-physics.mjs`

### Not yet started (Milestone 1 remaining scope, per doc 11 §2 / doc 10 §9)

- Step 4: backfill `EbCurriculum`/`EbModule` views, one per existing
  subject (starting with physics).
- Step 5: lazy `EbAssetIdentity` placeholder creation for existing visual
  generator output (cache-on-first-request pattern).
- Decision Pipeline stages 0-2 (Frame, Intent, Retrieval) + minimal
  Composition + Persist, as actual runtime code (not yet started — so far
  only the data side of Milestone 1 is built).
- Curator UI for `Explanation` (now `EbExplanation`) authoring.
- Feature flag for routing 1% of physics-mode users through the new
  pipeline.
- Step 6-9 of doc 10 §9 (dual-write, `TopicProgress`→
  `EbLearnerConceptMastery` migration, `MistakeRecord`→
  `EbLearnerActiveMisconception` migration, eventual retirement of legacy
  caches) — explicitly **not** started; these are post-validation cleanup
  per doc 10 §9, scheduled for "Phase 2 month 5+."

---

## 3. Validation status

### Schema/DB checks (from the schema+seed session — require a live DB, not re-runnable in the current sandbox)

| Check | Result |
|-------|--------|
| `npx prisma format` / schema validate | ✅ passes (after fixing one `@@id` referencing an optional field) |
| `npx prisma db push` | ✅ "Your database is now in sync" — additive only, confirmed via `psql` table existence + the legacy table list unchanged |
| `npx prisma generate` | ✅ |
| `npm run build` | ✅ succeeds, all routes compile |
| `npx tsx scripts/seed-eb-physics.mjs` | ✅ ran once, idempotent re-run-safe, row counts verified directly in Postgres via `psql` |

### Re-verified this handoff session (no DB/network required)

| Check | Result |
|-------|--------|
| `npx prisma generate` | ✅ regenerated client in fresh container |
| `npm install` | ✅ installed missing declared dep (`katex`) |
| `npx tsc --noEmit` | ✅ **zero errors** (earlier sandbox errors were purely environmental: ungenerated client + uninstalled dep) |
| Offline harness suite (`scripts/test-*.ts`) | ✅ **2066 assertions passing, 0 failing** (see `TEST_RESULTS.md`) |

The `Eb*` runtime code still has no dedicated unit tests (no runtime code
exists yet — only schema + seed). The 2066 passing assertions cover the
existing deterministic visualization / adaptive / progress logic. One stale
test (`test-build-scenespec.ts`) was corrected this session to match the
intentionally-narrowed `VECTOR_RE` in `buildSceneSpec.ts` — see CHANGELOG.

---

## 4. Constraints carried forward (unchanged, still binding)

- Do NOT create PRs unless explicitly asked. Do NOT push to branches
  other than `claude/my-tutor-foundation-KDSUO`.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject
  architecture.
- Do NOT redesign Phase-1-approved architecture without documenting
  objective evidence of a flaw and getting approval first (per the
  Phase 2 kickoff instructions).
