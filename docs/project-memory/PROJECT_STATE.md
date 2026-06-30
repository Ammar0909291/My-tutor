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
| Knowledge Graph Consumption Architecture (`ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`) | **Proposal written, not executed.** Per explicit user instruction (2026-06-30, second pivot): Phase 1 must NOT be implemented — no canonical KG field (`mastery_threshold`, `cross_links`, or any other) may be exposed until the Curriculum Production Pipeline freezes the Canonical Knowledge Graph v1 specification. Status downgraded from "awaiting go-ahead" to "blocked on external v1 freeze + future approval." See §4b below. |
| KG Consumption Pipeline contract (`ADR_06_KG_CONSUMPTION_PIPELINE.md`) | **Specification written, not implemented.** Opened 2026-06-30, item #1 of the user's 8-item forward-architecture roadmap. Specifies the version/status/shape gate that must sit between the Curriculum Pipeline's output and the Educational Brain's adapter — found zero such gate exists today (no version check, no status check, no runtime shape validation, no CI wiring). Implementation blocked on the same two conditions as ADR 05 Phase 1. See §4c below. |
| Educational Brain forward-architecture roadmap (8 ADRs, user-specified priority order) | **In progress — item 1 of 8 done (ADR 06).** Items 2-8 (Mastery Intelligence, Teaching Action Intelligence, Dynamic Lesson Composition, Student Memory Evolution, Recommendation Intelligence, Visualization & Simulation Architecture, AI Independence Roadmap) not yet started. Strict constraint for the whole roadmap: design/document only, zero production code changes without explicit per-ADR approval. See §4c below. |

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
   (8-tier, primary aggregator). **Evidence sharpened 2026-06-30**: this
   is a split-file case, not a clean two-engine overlap — `nextBestAction.ts`'s
   `getNextBestAction()`/`nextActionHref()`/`NEXT_ACTION_LABELS` are
   confirmed zero-caller dead code (their one plausible consumer,
   `SchoolDashboard.tsx`, is itself an orphaned, unrendered component —
   `DashboardV2` sources recommendations via `learningOrchestrator.ts`
   instead), while `nextBestAction.ts`'s fourth export,
   `getChapterNextStep()`, remains genuinely live. A resolution is
   **proposed, not executed** — see
   `docs/architecture/ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md`,
   awaiting explicit user approval before any deletion under the current
   STRICT MODE directive.
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

## 4b. Knowledge Graph Consumption Architecture — ADR 05 (this session, proposal only)

**Priority pivot, recorded verbatim in spirit:** as of 2026-06-30, the
standing directive shifted from dead-code/duplication auditing (ADR 03,
ADR 04) to forward-looking Educational Brain system design. ADR 04 is
explicitly confirmed by the user to remain **permanently** documentation-
only — not pending, not an interim state, simply not to be executed.
Further cleanup work is deprioritized unless it directly blocks one of
the 12+ named high-impact domains (KG consumption, Teaching Action
Intelligence, Student Memory evolution, Dynamic Lesson Composition,
Evidence Engine, Recommendation Intelligence, Mastery Engine,
Visualization selection, Simulation architecture, Assessment
architecture, Beginner→Intermediate→Expert progression, Entrance
examination framework, Curriculum mapping, AI independence, long-term
scalability).

**First finding under the new priority — `docs/architecture/ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`:**
- Two of the canonical 10-field KG schema's authored fields —
  `cross_links` and `mastery_threshold` — are parsed into
  `subjectKgAdapter.ts`'s internal `RawKGConcept` type but never exposed
  by `SubjectAdapter.getNodes()`/`getConceptNode()`. Neither
  `ConceptNode` (frozen Teaching Engine input) nor `KnowledgeNode`
  (curriculum layer) carries either field.
- `mastery_threshold` is authored with real per-concept variation in
  mathematics (12 distinct values, 0.35–0.95 across 908 concepts;
  physics/chemistry/CS/biology vary less, 3–4 distinct values each) and
  has **zero runtime effect** — 15+ call sites (`assessmentIntelligence.ts`,
  `masteryIntelligence.ts`, `evaluateAssessment.ts`, `nextBestAction.ts`,
  `dailyPlan.ts`, `learningOrchestrator.ts`, `learningNarrative.ts`,
  `examReadiness.ts`, `achievementEngine.ts`, `progressReport.ts`) all
  read the single flat `ASSESSMENT_PASS_THRESHOLD = 70` constant instead.
  Units also mismatch (KG: 0–1 fraction; runtime constant: 0–100 scale).
- `cross_links` documentation was wrong: `ENGINE_REFERENCE.md` claimed
  "always inter-graph by design." Direct inspection of
  `docs/mathematics/kg/graph.json` (363 edges, the only subject with
  meaningful usage) found 100% intra-subject, zero cross-subject —
  corrected in `ENGINE_REFERENCE.md` §2 this session.
- **Proposed 3-phase resolution (ADR 05 §4/§9), none executed yet:**
  - **Phase 1** — add two new additive `SubjectAdapter` accessors,
    `getConceptMasteryThreshold(id)` and `getCrossLinkedConceptIds(id)`;
    zero changes to existing methods or frozen types. Self-evaluated
    against the 4-condition gate as clearing all four. **Awaiting
    explicit go-ahead before execution**, per the same end-of-turn-
    approval-request pattern used for ADR 04.
  - **Phase 2** — wire the mastery-threshold accessor into
    `assessmentIntelligence.ts`'s chapter-scoped output specifically
    (not the other ~9 call sites, deferred). Condition 4 flagged as
    requiring explicit approval (alters scored output).
  - **Phase 3** — a `cross_links`-driven "Related Concepts" consumer.
    Deliberately left undesigned pending product-intent confirmation.
- Cross-references updated this session: `ARCHITECTURE_DECISIONS.md`
  (new Finding 7), `ENGINE_REFERENCE.md` §2 (correction) and §4 (open
  finding note), `CLAUDE.md` (new bullet).

**Second pivot (same day, 2026-06-30):** the user accepted ADR 05 as
documentation only and explicitly forbade implementing Phase 1 — no
canonical KG field may be exposed (`mastery_threshold`, `cross_links`, or
any other) until the Curriculum Production Pipeline freezes the
Canonical Knowledge Graph v1 specification. The user also defined a full
8-item forward-architecture roadmap (below) and instructed: design only,
no implementation, no runtime/route/schema changes without explicit
per-item approval.

---

## 4c. Educational Brain Forward-Architecture Roadmap (8 ADRs, user-specified order)

Per the user's second pivot, the autonomous loop now works through this
list in order, one ADR per turn, architecture-only:

1. **Educational Brain Knowledge Graph Consumption Pipeline** — **DONE**,
   `ADR_06_KG_CONSUMPTION_PIPELINE.md` (specification only, not
   implemented). Designed the version/status/shape gate that should sit
   between the Curriculum Pipeline's `graph.json` output and
   `subjectKgAdapter.ts`. Found: zero version gate, zero status gate,
   zero runtime shape validation, zero CI wiring exist today (the
   validator script is manual-only, not referenced in `package.json` or
   any `.github/workflows` file). All 5 live `graph.json` files already
   carry `version`/`status`/`build_date` wrapper metadata that is
   silently discarded by `getRaw()` (`subjectKgAdapter.ts:86-92`) before
   reaching any consumer. Proposes a 4-part gate (Schema Version Gate,
   Status Gate, Runtime Shape Validation, diagnostic-only Metadata
   Surface) as a new layer between producer and consumer — zero changes
   to `ConceptNode`/`KnowledgeNode`/existing `SubjectAdapter` methods.
   Explicitly does not re-propose exposing `cross_links`/
   `mastery_threshold` (that stays exactly where ADR 05 left it).
   Implementation blocked on Curriculum Pipeline v1 freeze + explicit
   approval, per the standing instruction.
2. **Mastery Intelligence Architecture** — not started. Static vs.
   evidence-adjusted mastery, global vs. personalized mastery, Beginner→
   Intermediate→Expert progression, entrance examinations, mastery
   validation.
3. **Teaching Action Intelligence** — not started. Decision hierarchy,
   explanation/visualization/simulation/assessment/remediation selection.
4. **Dynamic Lesson Composition** — not started. Knowledge-Asset
   assembly, adaptive sequencing, multi-modal teaching, recovery paths.
5. **Student Memory Evolution** — not started. Long-term learner model,
   persistent/short-term memory, retrieval strategy, forgetting model,
   evidence updates.
6. **Recommendation Intelligence** — not started. Short-term
   recommendations, long-term learning plans, weakness recovery,
   goal-based learning.
7. **Visualization & Simulation Architecture** — not started. Visual
   selection, graphs, animations, interactive simulations, scene
   generation, rendering independence.
8. **AI Independence Roadmap** — not started. Measuring/reducing AI
   dependency, promoting validated assets, knowledge acquisition
   strategy.

**Per-ADR discipline (binding for all 8):** gather evidence, compare
multiple architectural approaches, choose the simplest long-term design,
document trade-offs, produce implementation specs, validation specs, and
a migration strategy, estimate scalability to millions of learners,
preserve backward compatibility with Educational Brain v1 — design only,
no implementation without separate explicit approval per item.

---

## 4. Constraints carried forward (unchanged, still binding)

- Do NOT create PRs unless explicitly asked. Do NOT push to branches
  other than `claude/my-tutor-foundation-KDSUO`.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject
  architecture.
- Do NOT redesign Phase-1-approved architecture without documenting
  objective evidence of a flaw and getting approval first (per the
  Phase 2 kickoff instructions).
- ADR 04 is permanently documentation-only by explicit user instruction
  — do not execute it, do not re-raise it for approval.
- Current priority (2026-06-30 onward): forward-looking Educational
  Brain architecture (KG consumption, Teaching Action Intelligence,
  Student Memory, Lesson Composition, Evidence Engine, Recommendation
  Intelligence, Mastery Engine, Visualization, Simulation, Assessment,
  progression framework, entrance exam framework, curriculum mapping, AI
  independence, scalability) over dead-code/cleanup auditing. Do not
  propose or execute further cleanup unless it blocks one of these.
- **Strict architecture-only mode (2026-06-30, second pivot, binding for
  all 8 roadmap ADRs in §4c):** do NOT implement adapter functions, do
  NOT modify runtime/routes/schemas/production code, without explicit
  per-item user approval. Do NOT expose `mastery_threshold`,
  `cross_links`, or any other Canonical Knowledge Graph field until the
  Curriculum Production Pipeline freezes the Canonical Knowledge Graph
  v1 specification. ADR 05 Phase 1 specifically remains un-executed
  under this rule, not merely "awaiting go-ahead."
