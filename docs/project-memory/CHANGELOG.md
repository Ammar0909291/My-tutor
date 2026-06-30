# Changelog — Educational Brain

Newest first. One entry per work session/commit batch.

---

## ADR 05 — Knowledge Graph Consumption Architecture (documentation only, NOT executed) + priority pivot

Operating under a revised standing directive: ADR 04 is confirmed by the
user to remain **permanently** documentation-only (not pending — final).
Further dead-code/cleanup auditing is deprioritized; the new priority is
forward-looking Educational Brain architecture across 12+ named domains
(KG consumption, Teaching Action Intelligence, Student Memory, Lesson
Composition, Evidence Engine, Recommendation Intelligence, Mastery
Engine, Visualization, Simulation, Assessment, Beginner→Intermediate→
Expert progression, entrance exam framework, curriculum mapping, AI
independence, scalability). This is the first finding under that pivot.

- **No code changed.** This entry is documentation only.
- Audited how the canonical 10-field KG schema's authored output is
  actually consumed downstream of `subjectKgAdapter.ts` (the Generic
  Subject Adapter). Found two of the 10 fields — `cross_links` and
  `mastery_threshold` — are parsed into the adapter's internal
  `RawKGConcept` type but **never exposed** by `SubjectAdapter`'s public
  `getNodes()`/`getConceptNode()`; neither the frozen Teaching Engine
  input type (`ConceptNode`) nor the curriculum-layer type
  (`KnowledgeNode`) carries either field.
- `mastery_threshold` is authored with genuine per-concept variation in
  mathematics (12 distinct values, 0.35–0.95 across 908 concepts) and is
  **completely unused at runtime**: confirmed by repo-wide grep, 15+ call
  sites (`assessmentIntelligence.ts`, `masteryIntelligence.ts`,
  `evaluateAssessment.ts`, `nextBestAction.ts`, `dailyPlan.ts`,
  `learningOrchestrator.ts`, `learningNarrative.ts`, `examReadiness.ts`,
  `achievementEngine.ts`, `progressReport.ts`) all read a single flat
  `ASSESSMENT_PASS_THRESHOLD = 70` constant instead — also a unit
  mismatch (KG: 0–1 fraction, runtime: 0–100 scale).
- Found and **corrected** a documentation inaccuracy:
  `ENGINE_REFERENCE.md` §2 claimed `cross_links` are "always inter-graph
  by design." Direct inspection of `docs/mathematics/kg/graph.json` (363
  `cross_links` edges, the only subject with meaningful usage — physics
  has zero, chemistry/CS/biology have 6/10/10 concepts respectively)
  found **100% are intra-subject**, zero true cross-subject links exist
  in the corpus today.
- Wrote `docs/architecture/ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`
  — proposes a 3-phase resolution, **none executed**: Phase 1 (two new
  additive `SubjectAdapter` accessors — `getConceptMasteryThreshold()`,
  `getCrossLinkedConceptIds()` — zero changes to existing methods/frozen
  types; self-evaluated as clearing all 4 STRICT MODE conditions but
  execution deferred pending explicit approval, same pattern as ADR 04);
  Phase 2 (wire the mastery accessor into `assessmentIntelligence.ts`'s
  chapter output only, explicitly excluding the other ~9
  `ASSESSMENT_PASS_THRESHOLD` call sites as a separate future candidate;
  condition 4 flagged as approval-required); Phase 3 (a `cross_links`-
  driven "Related Concepts" consumer, deliberately left undesigned
  pending product intent).
- Updated `ARCHITECTURE_DECISIONS.md` (new Finding 7 + Part 4 update
  note), `ENGINE_REFERENCE.md` (§2 correction, §4 open-finding note),
  `PROJECT_STATE.md` (new §4b + phase-status row + constraints update),
  and `CLAUDE.md` (new Educational Brain bullet) to cross-reference ADR 05
  and record the priority pivot.

---

## ADR 04 — Next-Best-Action retirement proposal (documentation only, NOT executed)

Operating under the new "Chief Educational Brain Architect — STRICT MODE"
standing directive: code changes now require explicit prior user approval,
gated by a 4-condition proof; default action when uncertain is to document
a proposal rather than execute it. Sharpens `ARCHITECTURE_DECISIONS.md`
Finding 4's evidence; proposes (does not execute) a resolution.

- **No code deleted, no code modified.** This entry is documentation only.
- Confirmed via exhaustive per-symbol grep across `src/`:
  `nextBestAction.ts`'s `getNextBestAction()` (the 5-tier engine),
  `nextActionHref()`, and its own `NEXT_ACTION_LABELS` export have zero
  callers anywhere in the codebase. The file's fourth export,
  `getChapterNextStep()`, is genuinely live (`api/learn/chat/route.ts`,
  the chapter workspace page) and is explicitly excluded from the
  proposed deletion scope.
- Discovered and confirmed a second, adjacent orphan:
  `src/components/dashboard/SchoolDashboard.tsx` (zero importers anywhere
  in `src/`) — the live `/dashboard` route renders `DashboardV2` instead,
  whose data source (`getDashboardV2Data.ts`) sources recommendations via
  `learningOrchestrator.ts`'s `getTopRecommendation()`, with zero
  references to `nextBestAction.ts` anywhere in the v2 stack.
- Wrote `docs/architecture/ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md`
  — a proposal (Option C: surgically remove the three dead exports from
  `nextBestAction.ts`, delete `SchoolDashboard.tsx` in full, fix a stale
  comment in `assessmentIntelligence.ts`) explicitly marked **not
  executed**, awaiting the user's explicit sign-off per STRICT MODE's
  four-condition gate (condition 4, production-behavior impact, is
  treated as requiring approval for a UI-component deletion rather than
  self-clearing from grep evidence alone).
- Updated `ARCHITECTURE_DECISIONS.md` Finding 4 and `PROJECT_STATE.md`'s
  findings list to reflect the sharpened evidence and proposal status.

---

## ADR 03 — Retire the orphaned Teaching Action Engine (code deletion + docs)

Operating under the "Educational Brain Architect — Architecture Only"
standing directive (no `route.ts` changes, no curriculum content changes).
Resolved `ARCHITECTURE_DECISIONS.md` Finding 2.

- **Deleted** `src/lib/curriculum/teachingActionEngine.ts` (169 lines,
  `decideAction()`) and its private `teachingActionSchema.ts` (60 lines,
  the 15-value `TeachingActionType` duplicate). Confirmed via exhaustive
  grep: zero callers anywhere in `src/` (including tests) for either
  file's exports; git history showed zero functional changes since
  original authoring (`d446b45`) beyond two archive-comment-only commits.
  Pure decision logic, zero subject content — safe infrastructure
  hygiene, no curriculum overlap.
- **Left untouched**, deliberately: `teachingAssetSchema.ts`,
  `teachingAssetAdapter.ts`, `teachingAssets.ts`, and the real on-disk
  `docs/{subject}/teaching-assets/assets.json` content for all five
  subjects. This is curriculum content (misconceptions, worked examples,
  concept summaries) — out of scope for this session to modify or wire
  into the live route per the current standing directive; recorded as an
  explicit open question for a future, content-aware decision.
- Full rationale, evidence, options comparison (delete vs. merge into TAG
  vs. leave as-is), and validation strategy in
  `docs/architecture/ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`.
- Updated cross-references in `ARCHITECTURE_DECISIONS.md`,
  `ENGINE_REFERENCE.md` (Engine 34, rescoped to content-layer-only),
  `DEPENDENCY_RULES.md`, `EDUCATIONAL_BRAIN_V1.md`, `EXTENSION_GUIDE.md`,
  `EDUCATIONAL_BRAIN_CONSOLIDATION.md`, `PROJECT_STATE.md`, and added a
  retirement notice to `docs/TEACHING_ACTION_ENGINE_REPORT.md` (original
  report kept as historical record, not rewritten).
- Zero `route.ts`, `prisma/schema.prisma`, or `docs/{subject}/kg/`/
  `teaching-assets/` changes.

---

## Educational Brain v1.0 — Architecture Freeze (docs only, no code changes)

Documentation-only freeze of the canonical (non-experimental) pipeline, per
the standing instruction to stop building new features/engines/subjects and
instead produce the permanent architecture reference.

**Created** `docs/architecture/{EDUCATIONAL_BRAIN_V1,ENGINE_REFERENCE,
DATA_FLOW,DEPENDENCY_RULES,EXTENSION_GUIDE,ARCHITECTURE_DECISIONS}.md`:
- System architecture diagram, full canonical pipeline trace (65 ordered
  steps through `api/learn/chat/route.ts`), 36-engine reference (inputs/
  outputs/public functions/failure behavior/guarantees/deterministic vs.
  probabilistic/MUST NOT per engine), per-engine dependency rules + a
  circular-dependency-free summary matrix, 8 extension recipes for future
  subjects/engines/visual types/assessment types/teaching actions/memory
  signals/recommendation signals, and 15 permanent architecture rules.
- 6 honest findings recorded (not fixed — out of scope for a freeze):
  `lessonPlanner.ts`/`lessonComposer.ts` `LessonPlan` naming overlap;
  orphaned zero-caller `teachingActionEngine.ts` + Teaching Assets
  Platform overlapping TAG; "Curriculum Validator Brain" and "Knowledge
  Graph Validator" are the same script; two coexisting Recommendation
  Intelligence generations (`nextBestAction.ts` vs
  `learningOrchestrator.ts`); two coexisting curriculum representations
  (file-based KG vs. `Eb*` DB models); a stale `ReviewSchedule` schema
  comment.
- Validation: PASS — no circular engine dependencies, no undocumented
  public interfaces or data flow, no functional/runtime conflicts.

Updated `docs/project-memory/PROJECT_STATE.md` with a new freeze-summary
section. Zero `src/`, `prisma/`, or `docs/{subject}/kg/` files touched.

---

## Phase 2, Milestone 1 — Critical fix: concept IDs + composition enrichment + coverage (b415b0e)

**Critical bug fix**: intentStage was surfacing synthetic concept IDs that don't
exist in the DB. retrievalStage would always return null conceptContext, making
the pipeline silently inert. Fixed: all 28 patterns now map to the exact
`physicsKnowledgeGraph.ts` IDs (`physics.kinematics_1d`, `physics.laws_of_motion`,
etc.). Coverage expanded from 15 to 28 patterns — all 29 KG nodes now addressed.

**compositionStage enrichment**: `composedContextNote` now includes question shape,
student emotion, and available asset summary (explanation/visual/probe counts).
Ready for prompt injection in future turns.

**New scripts**:
- `scripts/benchmark-eb-pipeline.ts`: 1000-iter latency benchmark. p99=0.038ms offline.
- `scripts/verify-eb-live.ts`: 19-assertion live pipeline verifier (requires DB).

**Seed extended**: `seed-eb-physics.mjs` now upserts 1 `EbCurriculum` + 9 `EbModule`
rows (awaiting live DB).

**Tests**: 71/71 assertions in test-eb-pipeline.ts. 2108+ total offline assertions, 0 failures.
`npx tsc --noEmit` clean.

---

## Phase 2, Milestone 1 — Test expansion + latency benchmark + seed extension (d1398e7)

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
