# Architecture Decisions — Educational Brain v1.0

Permanent rules, the rationale behind the two-pipeline / two-generation
designs, and an honest record of every naming/duplication finding
surfaced while writing this freeze. Findings are documented, not fixed —
this freeze does not redesign anything (see `EDUCATIONAL_BRAIN_V1.md` §7).

---

## Part 1 — Permanent architecture rules

Continuing the verbatim examples given in the freeze brief, in the same
voice:

1. **Knowledge Graphs are immutable runtime assets.** Every canonical
   `docs/{subject}/kg/graph.json` is read-only at runtime. The only
   legitimate way to change one is to edit the file and re-run the
   Knowledge Graph Validator.

2. **Teaching Engine never performs database writes.** `decide()` is a
   pure function over three parameters; it has zero I/O.

3. **Lesson Composer never generates educational content.** Every string
   `lessonComposer.ts` produces is a template built from data the caller
   already had — `decision.goal`, concept ids, assessment numbers — never
   invented prose, never an LLM call.

4. **Teaching Action Generator never modifies Teaching Decisions.**
   `deriveTeachingAction()` reads `decision.goal`/`decision.estimated_time`
   verbatim; it only adds fields, never overwrites the Teaching Engine's
   output.

5. **Student Memory is the only owner of longitudinal learner state.**
   `RetentionMetric` and `ReviewSchedule` are written exclusively by
   `src/lib/memory/update-pipeline.ts`. No other file in `src/` writes
   either model.

6. **Assessment Intelligence never teaches.** It decides whether/what to
   assess; it never explains a concept or chooses a presentation format.

7. **Recommendation Engine never evaluates mastery.** Every engine in the
   Recommendation cluster reads Mastery Intelligence's or Student
   Memory's already-computed conclusions; none independently scores
   mastery.

8. **Curriculum Validator never creates curriculum.** The Knowledge Graph
   Validator (`scripts/validate-knowledge-graph.ts`) only reports; it
   never writes to the file it checks.

9. **The AI Router is the only probabilistic component.** Every engine
   upstream of it — Knowledge Graph, Student Memory, Mastery, Assessment,
   Teaching Engine, TAG, Lesson Composer, every satellite — is
   deterministic. Randomness/non-determinism is confined to exactly one
   call site: `routeAI()`.

10. **The AI Router never makes a pedagogical decision.** It renders
    text from an already-assembled system prompt; it has no awareness of
    the Knowledge Graph, Student Memory, or any engine's internal state.

11. **A satellite advisory engine degrading to null/empty must never
    block a turn.** Every dynamically-imported block in
    `api/learn/chat/route.ts` is wrapped in `try`/`catch`, and every
    async engine call chains `.catch(() => null)` or equivalent. This is
    load-bearing: a bug in any one of ~30 advisory blocks must not be
    able to 500 the chat endpoint.

12. **No engine downstream of the Teaching Engine may call back upstream
    of it.** TAG and Lesson Composer may *consume* a `TeachingDecision`;
    neither may call `decide()` itself or feed a result back into Student
    Memory, Mastery Intelligence, or Assessment Intelligence within the
    same turn. This keeps the pipeline a DAG (see `DEPENDENCY_RULES.md`
    closing table).

13. **The canonical 10-field KG schema never gains `domain` or
    `concept_type` as authored fields.** Both are derived at runtime by
    the Generic Subject Adapter (`inferDomain`, `inferConceptType`). This
    is enforced by the Knowledge Graph Validator treating their absence
    as informational, not a failure.

14. **Every Student Memory write is an `upsert`, never a `create`.**
    Idempotency is a hard requirement of the fire-and-forget write
    pattern — a retried or duplicated call must converge to the same
    state, not create a duplicate row.

15. **A new subject requires zero new adapter/validator/Teaching-Engine
    code** — only a `graph.json` file and one registry entry. If adding a
    subject ever requires a new `if (subjectSlug === ...)` branch outside
    a registry array, that is architectural drift, not a normal
    extension (see `EXTENSION_GUIDE.md` §1).

---

## Part 2 — Two pipelines, by design

There are two execution paths in this codebase that both touch "teaching
intelligence," and they are intentionally separate, not a migration in
progress:

1. **The canonical pipeline** — everything documented in
   `DATA_FLOW.md` §1, running synchronously inside every chat turn,
   100% deterministic engines feeding one LLM call via the AI Router.
2. **The Educational Brain Decision Pipeline**
   (`src/lib/educationalBrain/*`) — a separate, newer, `Eb*`-table-backed
   concept-graph pipeline, gated by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`
   (default off), called fire-and-forget and never awaited from the chat
   route. It has zero effect on any response unless explicitly enabled.

**Decision:** treat these as two independent systems for this freeze. The
experimental pipeline is documented (`ENGINE_REFERENCE.md` §33) but is
**not** part of the frozen canonical pipeline's guarantees. A future phase
that wants to promote it to the live path is an explicit architectural
decision, not an extension.

---

## Part 3 — Honest findings from this freeze (documented, not fixed)

These were discovered while researching this freeze. Per the freeze
brief's explicit scope ("do NOT redesign architecture... freeze only"),
none of them were fixed. They are recorded here so the next phase starts
from an accurate map, not a flattering one.

### Finding 1 — Two unrelated engines share the name `LessonPlan` / `buildLessonPlanBlock`

- `src/lib/school/adaptive/lessonPlanner.ts` (Sprint BY, pre-existing) —
  a **chapter-scoped roadmap**: which KG nodes in the current chapter are
  mastered/current/remaining. `LessonPlan { currentChapter,
  currentConcept, masteredConcepts, remainingConcepts, nextConcept,
  recommendedCheckpoint, recommendedPractice, estimatedCompletion }`.
- `src/lib/school/adaptive/lessonComposer.ts` (Phase 3B, this campaign) —
  a **single-turn pedagogical stage sequence**. `LessonPlan { concept_id,
  total_estimated_minutes, stages: LessonStage[] }`.
- Both export a function literally named `buildLessonPlanBlock`, with
  different signatures and different system-prompt header strings
  (`"CURRENT LESSON PLAN — ..."` vs `"LESSON PLAN"`).
- Both are imported into `api/learn/chat/route.ts` (lines ~717 and
  ~1245), the only file in `src/` that imports from both modules. Each
  import is a separate dynamic `await import(...)` inside its own `try`
  block, so there is **no runtime collision** — but the shared naming is
  a real readability/maintenance hazard for the next engineer.
- **Ruling:** these are two distinct, correctly-scoped engines that
  happen to share a name. Documented in `ENGINE_REFERENCE.md` (Engine 12
  and Engine 21) as explicitly separate. **Recommendation for a future,
  separately-approved cleanup phase:** rename one — e.g.
  `lessonPlanner.ts`'s exports to `ChapterRoadmap`/
  `buildChapterRoadmapBlock` — to remove the ambiguity. Not done here.

### Finding 2 — An orphaned, fully-built "Teaching Action Engine" predates and overlaps TAG — **RESOLVED 2026-06-30, see ADR 03**

- **Original finding:** `src/lib/curriculum/teachingActionEngine.ts`
  (`decideAction()`), backed by a Zod-validated `TeachingAsset` schema
  (`teachingAssetSchema.ts`) and a working, cached, per-subject adapter
  (`teachingAssetAdapter.ts`) with real data on disk for all five
  canonical subjects (`docs/{subject}/teaching-assets/assets.json`).
  Confirmed by grep: `decideAction()`, `getTeachingAsset()`, and
  `getTeachingAssets()` had **zero callers** anywhere in `src/` outside
  their own files. It solved materially the same problem as the Phase 3A
  Teaching Action Generator (`teachingActionGenerator.ts`) — both took a
  `TeachingDecision` + `ConceptNode` and produced a "TeachingAction"
  describing how to teach — but with incompatible type shapes (15-value
  vs 10-value `TeachingActionType`, different field names) and a
  dependency TAG doesn't have (`TeachingAsset`).
- **Resolution (`docs/architecture/ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`):**
  `teachingActionEngine.ts` and its private `teachingActionSchema.ts`
  (229 lines, confirmed zero callers, pure decision logic with zero
  subject content) were **deleted**. This was pure decision-engine
  duplication of TAG with no curriculum overlap — safe infrastructure
  hygiene. The `TeachingAsset` **content** layer
  (`teachingAssetSchema.ts`, `teachingAssetAdapter.ts`,
  `teachingAssets.ts`, and the real on-disk `assets.json` data) was
  deliberately left untouched — it holds actual curriculum content
  (misconceptions, worked-example blueprints, concept summaries), so
  deciding whether/how to wire it into TAG is out of scope for an
  architecture-only pass and is left as an explicit open question for a
  future session (see ADR 03 §6, §11). `ENGINE_REFERENCE.md` Engine 34 now
  describes only the surviving content layer.

### Finding 3 — "Curriculum Validator Brain" and "Knowledge Graph Validator" are the same engine in code

- The freeze brief's platform list names these as two separate existing
  components. In the actual codebase there is exactly one validator
  (`scripts/validate-knowledge-graph.ts`), and it performs both jobs at
  once: curriculum-sequencing checks (cycle detection, DAG requirement,
  reachability from root nodes) *and* KG schema/field checks, in a single
  script with 9 named checks.
- **Ruling:** documented as one engine serving both named roles
  (`ENGINE_REFERENCE.md` §2). This is not treated as a defect — a single
  validator covering both concerns is reasonable — but it is recorded so
  future documentation doesn't go looking for a second file that doesn't
  exist.

### Finding 4 — Two generations of "Recommendation Intelligence" coexist — **EVIDENCE SHARPENED 2026-06-30, PROPOSAL WRITTEN (ADR 04), AWAITING EXPLICIT APPROVAL**

- **Original finding:** `nextBestAction.ts` (earlier, narrower — self-labels
  its step 5 as "Phase 2G (Recommendation Intelligence)") and
  `learningOrchestrator.ts` (broader, 8-tier, the stronger claimant to
  being *the* canonical cross-engine recommendation aggregator) both
  exist, both are called from different call sites, and neither has been
  deprecated in favor of the other.
- **Sharpened evidence (`docs/architecture/ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md`):**
  this is not a clean two-engines-overlap case — it is a single file with
  mixed live/dead exports. Per-symbol grep across all of `src/` confirms
  `nextBestAction.ts`'s namesake `getNextBestAction()` (the 5-tier
  engine), `nextActionHref()`, and its own `NEXT_ACTION_LABELS` export
  have **zero callers anywhere**, while a fourth export from the same
  file, `getChapterNextStep()`, is genuinely live (two real call sites:
  `api/learn/chat/route.ts`, the chapter workspace page). The dead trio's
  only plausible consumer, `src/components/dashboard/SchoolDashboard.tsx`
  (a "legacy nextAction card... fallback when orchestrator returned null"),
  is itself confirmed orphaned — zero importers anywhere in `src/`; the
  live `/dashboard` route renders `DashboardV2` instead, whose data
  function (`getDashboardV2Data.ts`) sources recommendations via
  `learningOrchestrator.ts`'s `getTopRecommendation()` (through
  `learningNavigator.ts`), with zero references to `nextBestAction.ts`
  anywhere in the v2 stack. `learningOrchestrator.ts` is confirmed the
  sole live canonical Recommendation Intelligence aggregator, with a
  near-strict-superset of `getNextBestAction()`'s logic plus 4 additional
  signals it never had.
- **Ruling:** under the current STRICT MODE directive (code changes
  require explicit prior user approval, gated by a 4-condition proof),
  this finding's resolution has been written up as **ADR 04, a proposal
  document, not executed**. ADR 04 proposes surgically removing the three
  confirmed-dead exports from `nextBestAction.ts` (keeping
  `getChapterNextStep()` in place) and deleting `SchoolDashboard.tsx` in
  full, but explicitly defers execution pending the user's sign-off —
  see ADR 04 §9 for the full four-condition analysis and why condition 4
  (production-behavior impact) is treated as requiring approval rather
  than self-clearing from grep evidence alone for a UI-component deletion.
  `learningOrchestrator.ts` remains identified as the primary aggregator
  (`ENGINE_REFERENCE.md` §22–30) in the interim; no code has been merged,
  deprecated, or deleted by this update.

### Finding 5 — Two generations of curriculum/concept-graph representation coexist

- The file-based canonical KG (`docs/{subject}/kg/graph.json`, read via
  the Generic Subject Adapter) and the database-backed `Eb*` model family
  (`EbConcept`, `EbConceptEdge`, `EbCurriculum`, `EbModule`, etc. — 24
  models) are two separate, more-and-less-normalized representations of
  similar information. The DB tables do not currently replace or
  synchronize with the JSON files.
- **Ruling:** documented in `DATA_FLOW.md` §2. Both are real, both have
  real callers (the `Eb*` family is read/written by the experimental
  Educational Brain Decision Pipeline), and unifying them is out of scope
  for this freeze.

### Finding 6 — Stale schema comment

- `prisma/schema.prisma`'s comment above `model ReviewSchedule` states
  that no writer exists yet for that table. `update-pipeline.ts` has been
  that writer since the Student Memory write-path was built. The comment
  is now incorrect.
- **Ruling:** flagged for a trivial comment-only correction in a future
  routine change; not edited in this freeze (any edit, however small,
  to a frozen-scope file is out of bounds for "freeze only" work).

### Finding 7 — Two of the canonical KG's 10 authored fields never reach a downstream consumer — **PROPOSAL WRITTEN (ADR 05), AWAITING EXPLICIT APPROVAL**

- Unlike Findings 1–6 (all surfaced during the original freeze audit),
  this finding was opened under the post-freeze "Knowledge Graph
  Consumption Architecture" priority — forward-looking design work, not a
  cleanup audit, per the standing instruction to prioritize the systems
  that consume the Curriculum Pipeline's output over further dead-code
  hunting.
- **Evidence:** `subjectKgAdapter.ts`'s internal `RawKGConcept` type
  already parses `cross_links: string[]` and `mastery_threshold: number`
  from `graph.json`, but neither `getNodes()` nor `getConceptNode()`
  exposes them — both are silently dropped before reaching `ConceptNode`
  (the frozen Teaching Engine input type) or `KnowledgeNode` (the
  curriculum-layer type). `mastery_threshold` is authored with real
  per-concept variation in mathematics (12 distinct values, 0.35–0.95
  across 908 concepts) yet has zero runtime effect: 15+ call sites across
  `assessmentIntelligence.ts`, `masteryIntelligence.ts`,
  `evaluateAssessment.ts`, `nextBestAction.ts`, `dailyPlan.ts`,
  `learningOrchestrator.ts`, `learningNarrative.ts`, `examReadiness.ts`,
  `achievementEngine.ts`, and `progressReport.ts` all read the single flat
  `ASSESSMENT_PASS_THRESHOLD = 70` constant instead (also a unit mismatch:
  KG values are 0–1 fractions, the runtime constant is 0–100). Separately,
  `ENGINE_REFERENCE.md` §2 incorrectly documented `cross_links` as
  "always inter-graph by design" — direct inspection of
  `docs/mathematics/kg/graph.json` found 363 `cross_links` edges, 100%
  intra-subject, zero true cross-subject links; that documentation claim
  has been corrected (see `ENGINE_REFERENCE.md` §2/§4).
- **Ruling:** documented as **ADR 05, a proposal, not executed**. ADR 05
  proposes a 3-phase resolution: Phase 1 (two new additive
  `SubjectAdapter` accessors — `getConceptMasteryThreshold()`,
  `getCrossLinkedConceptIds()` — plus the doc correction; self-evaluated
  against the four-condition gate as clearing all four, but execution is
  still deferred pending an explicit follow-up turn, consistent with how
  ADR 04 was handled); Phase 2 (wiring the mastery-threshold accessor
  into `assessmentIntelligence.ts`'s chapter-scoped output specifically,
  explicitly excluding the other ~9 `ASSESSMENT_PASS_THRESHOLD` call
  sites as a separate, later-scoped candidate — condition 4 flagged as
  requiring explicit approval); Phase 3 (a `cross_links`-driven "Related
  Concepts" consumer, deliberately left undesigned pending product
  intent). See `docs/architecture/ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`
  for full evidence, the per-subject distribution tables, and the
  phase-by-phase four-condition analysis. No code has been changed by
  this finding.

---

## Part 4 — Validation results

| Check | Result |
|---|---|
| No circular engine dependencies | **Pass.** See `DEPENDENCY_RULES.md` closing table — every edge points strictly downstream of the pipeline order in `DATA_FLOW.md` §1. The Teaching Engine, the one engine everything else depends on, has zero outgoing engine dependencies. |
| Every engine has one owner | **Pass, with two documented exceptions.** Findings 1 and 2 above are recorded as overlapping-but-distinct-scope cases, not ownership conflicts — each engine's actual responsibility is singular once the overlap is named. |
| No duplicated responsibility | **Pass, with two documented exceptions** (Findings 1 and 2). Both are recorded, neither is silently hidden. |
| No undocumented public interfaces | **Pass.** Every exported function across all ~35 engines is listed in `ENGINE_REFERENCE.md` with its full signature. |
| No undocumented data flow | **Pass.** `DATA_FLOW.md` traces all 65 ordered steps of the canonical pipeline plus six domain-specific flow diagrams. |
| No architectural conflicts | **Pass, with six findings disclosed** (Part 3 above) — none of which represents a functional bug (no runtime collision, no incorrect behavior observed); all are naming/duplication/staleness findings recorded for future, separately-approved cleanup. |

**Overall: PASS.** The architecture is internally consistent and free of
circular dependencies or functional conflicts. Six honest findings are
recorded for future attention; none blocks this freeze.

**Update 2026-06-30:** Finding 2 is resolved — see its entry in Part 3
and `ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`. Finding 4's
evidence is sharpened and a resolution is proposed but **not executed**,
and per explicit user instruction will **remain unexecuted indefinitely**
(documentation-only is the final state, not an interim one) — see its
entry in Part 3 and `ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md`.
Four honest findings remain fully open from the original freeze (1, 3, 5,
6). A new, seventh finding (Knowledge Graph Consumption Architecture) was
opened post-freeze under the revised "consume the KG, don't just clean up
around it" priority — see its entry in Part 3 and
`ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md` (proposal written,
not executed).
