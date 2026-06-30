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
| Phase 2 — Milestone 1: spine + asset catalogue for ONE subject (physics) | **In progress.** Steps 1-3 done (schema, Concept+Edge+Misconception backfill). Decision Pipeline stages 0-4 (Frame/Intent/Retrieval/Composition/Persist) implemented at 0724396. Route side-car wired. Steps 4+ (EbCurriculum/EbModule, pgvector, latency measurement) not yet started. |
| Educational Brain v1.0 — Architecture Freeze (`docs/architecture/`) | **Complete.** Permanent reference for the whole canonical pipeline + 36-engine inventory frozen this session. Documentation only — zero code changes. See §5 below. |
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

### Milestone 1 remaining (requires live DB)

- **EbCurriculum/EbModule backfill**: `scripts/seed-eb-physics.mjs` is extended
  with `PHYSICS_CURRICULUM` + `PHYSICS_MODULES` (9 modules matching subjectCatalog
  PHYSICS_TREE). Awaiting live DB to run. Code is complete and idempotent.
- **pgvector**: Not yet confirmed in target Postgres. `CREATE EXTENSION IF NOT EXISTS vector;` needed.
- **Live pipeline validation**: `scripts/verify-eb-live.ts` is ready — 19 assertions
  covering seed data, full pipeline execution, EbEvidenceEvent write, latency.
  Awaiting live DB.
- **Curator UI** for `EbExplanation` authoring — not started (Phase 2 M1 item).
- **1% feature flag routing** — the feature flag is in place; routing a percentage
  of users requires a runtime config mechanism (Phase 2 M1 item).

### Milestone 1 done (offline-verifiable)

- Decision Pipeline stages 0–4 implemented and tested (66/66 offline assertions).
- Side-car integration in `/api/learn/chat/route.ts`.
- `scripts/seed-eb-physics.mjs` extended with EbCurriculum/EbModule (code complete).
- Latency benchmark: offline stages p99 = 0.038 ms (trivial overhead vs 600 ms budget).

### Milestones 2–5

Not started. Require explicit user approval to begin each milestone per
standing instruction (do NOT begin Phase 3 without approval; same applies
to each milestone as a gate).

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

## 4a. Educational Brain v1.0 — Architecture Freeze (this session)

Documentation-only freeze of the canonical (non-experimental) pipeline and
every engine around it, per the standing instruction *"freeze the
architecture into the permanent reference... do NOT redesign architecture."*
Zero source files were modified.

**Files created** (`docs/architecture/`):
- `EDUCATIONAL_BRAIN_V1.md` — overview, system diagram, canonical pipeline,
  36-row engine inventory table, DB-ownership summary.
- `ENGINE_REFERENCE.md` — 36 numbered engine entries (responsibility,
  inputs, outputs, public functions, failure behavior, guarantees,
  deterministic/probabilistic, MUST NOT).
- `DATA_FLOW.md` — full 65-step trace of `api/learn/chat/route.ts`, full
  84-model DB-ownership breakdown, 4 flow diagrams (knowledge/teaching/
  assessment/memory).
- `DEPENDENCY_RULES.md` — per-engine may-read/must-NOT-call rules + a
  summary matrix confirming no circular dependencies.
- `EXTENSION_GUIDE.md` — 8 extension recipes (new subject, new intelligence
  engine, new visual type, new assessment type, new teaching action type,
  new memory signal, new recommendation signal, frozen-forever list).
- `ARCHITECTURE_DECISIONS.md` — 15 permanent rules, the two-pipelines
  rationale (canonical vs. experimental EB pipeline), 6 honest findings
  (documented, not fixed — see below), validation results.

**Honest findings recorded (none fixed, all flagged for a future
separately-approved cleanup phase)**:
1. `lessonPlanner.ts` and `lessonComposer.ts` both export a type/function
   named `LessonPlan`/`buildLessonPlanBlock` — distinct, correctly-scoped
   engines, no runtime collision, naming hazard only.
2. ~~`src/lib/curriculum/teachingActionEngine.ts` (`decideAction()`)...~~
   **RESOLVED 2026-06-30** — confirmed genuinely dead (zero callers, zero
   subject content) duplicate of TAG and **deleted**, see
   `docs/architecture/ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`.
   The separate `TeachingAsset` content layer (`teachingAssetSchema.ts`/
   `teachingAssetAdapter.ts`/`teachingAssets.ts`) was left untouched —
   real curriculum content, out of scope to remove unilaterally.
3. "Curriculum Validator Brain" and "Knowledge Graph Validator" are the
   same script (`scripts/validate-knowledge-graph.ts`), not two engines.
4. Two Recommendation Intelligence generations coexist:
   `nextBestAction.ts` (narrower, earlier) and `learningOrchestrator.ts`
   (8-tier, primary aggregator). Neither deprecated.
5. Two curriculum/concept-graph representations coexist: the file-based
   canonical KG (`docs/{subject}/kg/graph.json`) and the DB-backed `Eb*`
   model family (24 models, used only by the experimental pipeline). Not
   synchronized, not unified.
6. `prisma/schema.prisma`'s comment above `ReviewSchedule` claims no writer
   exists — stale; `update-pipeline.ts` has been the writer since the
   Student Memory write-path was built.

**Validation: PASS** — no circular engine dependencies, every engine has
one owner (two documented naming exceptions above), no undocumented
public interfaces, no undocumented data flow, no functional/runtime
conflicts.

---

## 4. Constraints carried forward (unchanged, still binding)

- Do NOT create PRs unless explicitly asked. Do NOT push to branches
  other than `claude/my-tutor-foundation-KDSUO`.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject
  architecture.
- Do NOT redesign Phase-1-approved architecture without documenting
  objective evidence of a flaw and getting approval first (per the
  Phase 2 kickoff instructions).
