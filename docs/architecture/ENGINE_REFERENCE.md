# Engine Reference — Educational Brain v1.0

Frozen interface documentation for every engine in the Educational Brain.
Each entry: Responsibility, Inputs, Outputs, Public functions, Expected
behavior, Failure behavior, Guarantees, Side effects, Deterministic or
probabilistic, and what the engine **MUST NOT** do.

All file paths are relative to the repo root.

---

## 1. Curriculum Authority Brain

**Files:** `src/lib/curriculum/engine.ts`, `src/lib/curriculum/subjectCatalog.ts`

**Responsibility:** Owns the "what subject, at what level, in what order"
question for the Library/roadmap surface — the Subject Library catalog (22
subjects), module sequencing within a subject, and simple roadmap
generation between a current and target level.

**Inputs:** subject code/slug, current level (string or number), target
level (string/number or null).

**Outputs:** `Roadmap { subject, currentLevel, targetLevel, milestones }`;
`CurriculumModule[]`; rendered curriculum-tree text; `LibrarySubject`
records.

**Public functions:**
```ts
generateRoadmap(subjectCode, currentLevel, targetLevel): Roadmap | null
buildTutorRoadmapContext(roadmap): string
findLibrarySubject(slug): LibrarySubject | undefined
modulesForLevelSpan(subject, currentLevel, targetLevel): CurriculumModule[]
renderCurriculumTree(subject): string
```

**Expected behavior:** Pure in-memory lookups over the static
`SUBJECT_LIBRARY` array; no I/O.

**Failure behavior:** Returns `null`/`undefined`/`[]` for unknown
subjects or levels — never throws.

**Guarantees:** Subject module trees form a DAG by construction (every
prerequisite points to an earlier-numbered lesson).

**Side effects:** None.

**Deterministic:** Yes.

**MUST NOT:** Replace or duplicate `TECH_REGISTRY` (it is explicitly
additive). Must not become subject-specific branching logic outside the
catalog data itself.

---

## 2. Knowledge Graph Validator (also the de facto Curriculum Validator)

**File:** `scripts/validate-knowledge-graph.ts` (CLI, not imported by
application code)

**Responsibility:** Validates a canonical `graph.json` (any subject)
against 9 checks: duplicate IDs, broken edge references, disconnected
nodes, cycles (DAG requirement), reachability from root nodes, required-
field completeness, Teaching Engine field compatibility, enum validity,
numeric range sanity.

> **Naming note:** the freeze brief's platform list names "Curriculum
> Validator Brain" and "Knowledge Graph Validator" as two separate
> components. In code there is only **one** validator, and it performs
> both jobs at once (curriculum-sequencing checks — DAG/cycles/
> reachability — *and* KG schema checks, in the same script). This is
> recorded as a finding in `ARCHITECTURE_DECISIONS.md`, not silently
> merged or split.

**Inputs:** path to a `graph.json` file (CLI arg; defaults to
`docs/mathematics/kg/graph.json`).

**Outputs:** console report; `process.exit(0)` (pass / pass-with-warnings)
or `process.exit(1)` (fail).

**Public functions:** none exported for reuse — it is a standalone script,
invoked as `npx tsx scripts/validate-knowledge-graph.ts [path]`.

**Expected behavior:** `requires`/`unlocks` edges must resolve unless
prefixed as cross-subject "aspirational" links (`math.phys.`, `math.cs.`,
`math.eng.`); `cross_links` are always inter-graph by design and never
fail/warn; `domain`/`concept_type` absence is informational only (both are
adapter-derived, not authoring requirements).

**Failure behavior:** Exits non-zero on any FAIL-severity check; missing
file throws a Node fs error.

**Guarantees:** Read-only — never mutates the graph it checks.

**Side effects:** `fs.readFileSync` only.

**Deterministic:** Yes.

**MUST NOT:** Create or repair curriculum content. It reports; it never
writes.

---

## 3. Canonical Knowledge Graph System

**File:** `src/lib/curriculum/knowledgeGraph.ts`

**Responsibility:** The single bridge exposing `KGNode`/`KnowledgeGraph`
to the rest of the app. Routes each subject either to a canonical adapter
(mathematics, physics, chemistry, computer_science, biology) or to a
legacy 54-node hardcoded KG (english, social_science/socials).

**Inputs:** subject slug, node id, completed-node sets.

**Outputs:** `KnowledgeGraph { subject, modules: KGModule[] }`;
`KGNode[]`; plain-text AI-prompt context blocks.

**Public functions:**
```ts
getKGNode(id): KGNode | undefined
getNodesForTopic(topicSlug): KGNode[]
getKnowledgeGraph(subjectSlug?): KnowledgeGraph | null
getAvailableNodes(graph, completedSlugs?): KGNode[]
buildKnowledgeGraphContext(graphOrSubject, completedSlugsInput?, inProgressSlug?): string
getDirectUnlocks(graph, nodeSlug): KGNode[]
getAllNodes(graph): KGNode[]
```

**Expected behavior:** First call per subject triggers the adapter's lazy
file read (see Generic Subject Adapter); subsequent calls are served from
the adapter's process-lifetime cache.

**Failure behavior:** Returns `null`/`undefined`/`[]` for unknown
subjects/ids — never throws into callers.

**Guarantees:** Adding a new canonical subject requires only a
`graph.json` file + one `SUBJECT_ADAPTERS` registry entry — no new
branching code in this file.

**Side effects:** Indirect file read via the adapter (cached).

**Deterministic:** Yes.

**MUST NOT:** Require subject-specific branching beyond the registry
entry. Must not be the place new per-subject logic gets added.

---

## 4. Generic Subject Adapter

**File:** `src/lib/curriculum/subjectKgAdapter.ts`

**Responsibility:** Platform infrastructure (explicitly self-described as
"not subject-specific code") that turns any `docs/{subject}/kg/graph.json`
into `KnowledgeNode[]`/`ConceptNode` shapes, deriving `domain` and
`concept_type` at runtime rather than reading them from the JSON.

**Inputs:** subject string (the `docs/` directory name).

**Outputs:** `SubjectAdapter { getNodes(), getConceptNode(id) }`.

**Public functions:**
```ts
inferDomain(id): string                 // "math.found.x" → "math.found"
inferConceptType(bloom): ConceptType    // remember/understand→conceptual, apply→application, analyze/evaluate/create→problem_solving
createSubjectAdapter(subject): SubjectAdapter
```

**Expected behavior:** Lazy-loads `graph.json` on first
`getNodes()`/`getConceptNode()` call; caches in a closure for the process
lifetime.

**Failure behavior:** Not separately documented to swallow a missing
file — callers (`knowledgeGraph.ts`, `route.ts`) wrap usage in `try`/
`catch` or check before invoking.

**Guarantees:** `domain`/`concept_type` are **never** read from
`graph.json` — always computed. This is the canonical 10-field schema
boundary (see `ARCHITECTURE_DECISIONS.md` rule list).

**Side effects:** `fs.readFileSync`, cached.

**Deterministic:** Yes.

**MUST NOT:** Require new adapter code per subject. Must not write to
`graph.json`.

---

## 5. Subject Knowledge Graphs (data, not code)

**Files:** `docs/mathematics/kg/graph.json` (908 concepts, `math.`),
`docs/physics/kg/graph.json` (194, `phys.`), `docs/chemistry/kg/graph.json`
(187, `chem.`), `docs/computer-science/kg/graph.json` (119, `cs.`),
`docs/biology/kg/graph.json` (89, `bio.`).

**Responsibility:** The immutable runtime asset every other Knowledge-tier
engine reads. Canonical 10-field schema only: `id, name, requires, unlocks,
cross_links, difficulty, bloom, mastery_threshold, estimated_hours,
description`. `domain` and `concept_type` are **never** present in the
JSON — confirmed directly against `docs/biology/kg/graph.json`.

**Inputs/Outputs:** N/A — static data.

**Guarantees:** Immutable at runtime; the only legitimate way to change
one is to edit the JSON file and re-run the Knowledge Graph Validator.

**MUST NOT:** Be modified by any running engine. Must not gain a 11th
field without updating the validator's `REQUIRED_FIELDS`/
`TEACHING_ENGINE_FIELDS` and every adapter that reads it.

---

## 6. Student Memory Engine

**Files:** `src/lib/memory/{types,repository,service,update-pipeline,index}.ts`

**Responsibility:** The sole owner of longitudinal learner state.
`repository.ts` runs parallel Prisma reads; `service.ts` aggregates them
into `LearnerMemory` and projects to `TeachingMemorySnapshot`;
`update-pipeline.ts` is the **only** writer of `RetentionMetric` and
`ReviewSchedule` anywhere in `src/`.

**Inputs:** `userId, subjectSlug, subjectId`, optional `sessionId`;
write-path also takes `topicUpdates: { topicSlug, masteryPct, passed }[]`.

**Outputs:** `LearnerMemory` (full shape — mastered/in-progress/weak
concepts, active misconceptions, learning speed, confidence level,
preferred style, per-topic retention, due-for-review list, track level,
fatigue level, recent topics, success rate, error patterns, time on task);
`TeachingMemorySnapshot` (the Teaching-Engine-facing projection).

**Public functions:**
```ts
// repository.ts
fetchRawLearnerData(userId, subjectSlug, subjectId, sessionId?): Promise<RawLearnerData>
fetchSupplementalData(userId, subjectSlug, subjectId, sessionId?): Promise<...>

// service.ts
readLearnerMemory(userId, subjectSlug, subjectId, opts?): Promise<LearnerMemory>
readLearnerMemoryFromPreload(userId, subjectSlug, subjectId, preloaded, opts?): Promise<LearnerMemory>
toTeachingSnapshot(memory): TeachingMemorySnapshot

// update-pipeline.ts — all fire-and-forget, idempotent (upsert, not create)
updateMemoryFromPractice(userId, subjectId, topicUpdates): Promise<void>
updateMemoryFromAssessment(userId, subjectId, topicUpdates): Promise<void>
updateMemoryFromLesson(userId, subjectId, topicSlug, masteryPct): Promise<void>
```

**Expected behavior:** Read path is called from the chat turn
(`readLearnerMemoryFromPreload` → `toTeachingSnapshot` → feeds
`decide()`). Write path is triggered **only** from
`api/school/practice/submit/route.ts` and
`api/school/assessment/submit/route.ts` — never from the chat turn
itself. `updateMemoryFromLesson` is exported and wired in `index.ts` but
has **no current caller** anywhere in `src/`.

**Failure behavior:** Read-path callers (`assessmentIntelligence.ts`, the
chat route) wrap calls in `.catch(() => null)` — a memory-read failure
degrades gracefully, never blocks the turn. Write-path functions are
documented as fire-and-forget: "callers wrap them in
`Promise.resolve().then(...).catch(() => {})` so a pipeline failure never
surfaces to the learner."

**Guarantees:** Every write is an `upsert`, never a `create` — retries
converge to the same state (idempotent). `updateMemoryFromLesson`
explicitly skips topics with `masteryPct <= 0` "to avoid phantom rows."

**Side effects:** Reads: `TopicProgress`, `MistakeRecord`,
`LearningProfile`, `RetentionMetric`, `ReviewSchedule`,
`SubjectAnalytics`, `Message` (count), `LearnSession`. Writes (this
engine only): `RetentionMetric`, `ReviewSchedule`.

**Deterministic:** The aggregation (`toTeachingSnapshot`) is a pure
projection. `service.ts`'s internal aggregate step is otherwise
deterministic given its raw input, except `computedAt: new Date()` and
elapsed-time decay math, which are time-dependent.

**MUST NOT:** No other module may write `RetentionMetric` or
`ReviewSchedule`. The chat route may only **read** memory — it must never
call `update-pipeline.ts` directly.

> **Known stale comment (flagged, not fixed):** `prisma/schema.prisma`
> carries a comment above `model ReviewSchedule` claiming no writer
> exists yet. `update-pipeline.ts` is exactly that writer now. See
> `ARCHITECTURE_DECISIONS.md`.

---

## 7. Mastery Intelligence

**File:** `src/lib/school/adaptive/masteryIntelligence.ts`

**Responsibility:** Classifies per-concept mastery into one of
`TRUE_MASTERY | DEVELOPING | FALSE_MASTERY | AT_RISK` and renders an
advisory block.

**Public functions (known from prior sessions and call sites):**
`getMasteryProfile(...)`, `buildMasteryIntelligenceBlock(...)`.

**Inputs:** learner progress/practice/checkpoint data for the chapter's
KG nodes.

**Outputs:** a per-concept `MasteryLevel` profile + system-prompt text
block.

**Deterministic:** Yes — threshold/rule based, no LLM.

**Side effects:** Read-only DB queries.

**MUST NOT:** Write to the database. Must not decide *what to teach next*
— that is the Teaching Engine's job; Mastery Intelligence only classifies
current state.

---

## 8. Assessment Intelligence

**File:** `src/lib/school/adaptive/assessmentIntelligence.ts`

**Responsibility:** Decides whether an assessment is due this turn, and
if so, what kind/difficulty/question-count/target-concepts/mastery-
threshold.

**Inputs:** `userId, board, grade, subjectSlug, subjectId, chapter`.
Internally calls `readLearnerMemory()` (Student Memory), chapter progress
details, and `getMasteryProfile()` (Mastery Intelligence) in parallel via
`Promise.all`.

**Outputs:** `AssessmentDecision { assessment_required, assessment_type,
difficulty, question_count, target_concepts, mastery_threshold, reason,
recommended_after, confidence }` where `AssessmentType = guided | standard
| challenge | reassessment`.

**Public functions:** `getAssessmentDecision(userId, board, grade,
subjectSlug, subjectId, chapter)`, `buildAssessmentIntelligenceBlock(...)`.

**Expected behavior:** A failed `readLearnerMemory()` call degrades to
`null` via `.catch()` — Assessment Intelligence treats Student Memory as a
fault-tolerant upstream dependency, not a hard requirement.

**Failure behavior:** Non-fatal on any upstream failure; falls back to
conservative defaults.

**Guarantees:** Pure decision function over already-fetched data; no LLM.

**Side effects:** Read-only.

**Deterministic:** Yes.

**MUST NOT:** Teach. It decides *whether/what* to assess, never *how* to
explain a concept — that is the Teaching Engine / TAG / Lesson Composer's
job.

---

## 9. Subject Assessment Requirements

**File:** `src/lib/assessment/subjectValidator.ts`

**Responsibility:** A static, category-keyed lookup
(`CATEGORY_REQUIREMENTS`) of assessment requirements per subject category
(programming, computer_science, etc.) — required/minScore/type/
questionFocus/answer-grading instructions. Feeds the "ASSESSMENT
PROTOCOL" system-prompt block (multilingual "assess me" trigger phrasing).

**Inputs:** subject slug (via `findLibrarySubject`).

**Outputs:** `AssessmentRequirement`.

**Deterministic:** Yes — static table lookup, `validateSubjectAnswer` is
currently a stub that always returns `{ valid: true, errors: [] }`.

**MUST NOT:** Be confused with Assessment Intelligence — this engine
defines *what an assessment for this subject category should look like
structurally*; Assessment Intelligence decides *whether one should happen
now and at what difficulty*. They are complementary, not duplicates.

---

## 10. Teaching Engine (FROZEN)

**Files:** `src/lib/teaching-engine/{index,types}.ts`

**Responsibility:** The single authority for "what should we teach next,
in what mode, at what difficulty, for how long, with what goal." This
engine predates and is consumed by every Phase 2H/3A/3B engine; it is
explicitly frozen and must never be modified to accommodate them.

**Inputs:** `StudentState { level, current_concepts_mastered,
weak_concepts, misconceptions, retention_score, learning_speed,
fatigue_level }`, `ConceptNode { id, domain, prerequisites, unlocks,
difficulty, concept_type, estimated_hours?, bloom?, name? }`,
`LearningHistory { recently_attempted, success_rate, time_on_task,
error_patterns }`.

**Outputs:** `TeachingDecision { next_concept, action_type, mode,
difficulty, estimated_time, goal }` where `action_type` ∈
`VISUAL_EXPLANATION | STEP_BY_STEP_GUIDED | INTERACTIVE_QUESTIONING |
PROBLEM_SOLVING_SESSION | MISCONCEPTION_FIX | RAPID_REVIEW` and `mode` ∈
`teach | reinforce | remediate | accelerate`.

**Public functions:** `decide(student, concept, history): TeachingDecision`
(internal helper `decideActionType(...)`, not exported).

**Expected behavior:** Pure function — same inputs always produce the
same `TeachingDecision`.

**Failure behavior:** N/A — no I/O to fail. Called from
`src/app/api/teaching-engine/route.ts` and from `api/learn/chat/route.ts`.

**Guarantees:** Never performs a database write. Never calls any other
engine. Never imports an LLM client.

**Side effects:** None.

**Deterministic:** Yes — fully pure.

**MUST NOT:** Perform database writes. Call Recommendation Intelligence,
Lesson Composer, or TAG. Be modified to add new `ActionType`/`TeachingMode`
values for the convenience of a downstream consumer — downstream engines
must adapt to this frozen vocabulary, not the other way around.

---

## 11. Teaching Action Generator (TAG) — Phase 3A

**File:** `src/lib/school/adaptive/teachingActionGenerator.ts`

**Responsibility:** Converts the Teaching Engine's 6-value `ActionType`
into a richer 10-value `TeachingActionType` vocabulary describing *how* to
teach this turn — presentation mode, visual type, interaction level,
pacing, bloom level, prerequisites to review.

**Inputs:** `TeachingDecision`, `ConceptNode`,
`TeachingActionContext { subjectSlug, chapterTitle, weakConcepts,
misconceptions, assessmentType }`.

**Outputs:** `TeachingAction { action_type, presentation_mode,
visual_type, interaction_level, estimated_minutes, objective, bloom_level,
prerequisites_to_review }`. `TeachingActionType` ∈ `visual_explanation |
worked_example | interactive_question | guided_derivation | simulation |
analogy | misconception_fix | experiment | recap | challenge_problem`.

**Public functions:**
```ts
deriveTeachingAction(decision, concept, context): TeachingAction   // pure
getTeachingAction(decision, concept, context): Promise<TeachingAction>  // resolves AssessmentDecision internally
buildTeachingActionBlock(action): string
```

**Expected behavior:** `objective` is `decision.goal` verbatim;
`estimated_minutes` is `decision.estimated_time` unchanged except a small,
explicit ×1.2 bump for `challenge_problem`. Visual type is read straight
from `detectVisual()` — never reinvented.

**Failure behavior:** `getTeachingAction`'s internal
`getAssessmentDecision` call is wrapped in `.catch(() => null)` —
degrades to `assessmentType: null`, never throws.

**Guarantees:** Never overrides or modifies a `TeachingDecision` field.

**Side effects:** None (pure mapping); the async wrapper performs a
read-only Assessment Intelligence lookup.

**Deterministic:** Yes — first-match-wins table mapping.

**MUST NOT:** Modify `TeachingDecision`. Re-derive the visual taxonomy
(must reuse `detectVisual()`/`VisualType` as the single source of truth).

---

## 12. Dynamic Lesson Composer — Phase 3B

**File:** `src/lib/school/adaptive/lessonComposer.ts`

**Responsibility:** Converts `TeachingDecision` + `TeachingAction` +
`AssessmentDecision` + Student Memory signals + `ConceptNode` into a
deterministic, ordered `LessonPlan` of pedagogical stages for **this
single turn's pacing guidance** — never content.

**Inputs:** `TeachingDecision`, `TeachingAction`,
`AssessmentDecision | null`, `ConceptNode`,
`LessonComposerContext { activeMisconceptions, reviewDueConceptIds }`.

**Outputs:** `LessonPlan { concept_id, total_estimated_minutes, stages:
LessonStage[] }`. `LessonStageType` ∈ `prerequisite_activation |
misconception_reminder | concept_introduction | visual_explanation |
worked_example | guided_practice | interactive_questioning |
mastery_check | review_reminder | transition_to_next_concept`. Each
`LessonStage` carries `objective`, `estimated_minutes`, `bloom_level`,
`interaction_mode`, `required_visual`, `completion_criteria`.

**Public functions:**
```ts
composeLessonPlan(decision, action, assessment, concept, context): LessonPlan   // pure
getLessonPlan(decision, action, concept, context): Promise<LessonPlan>          // resolves AssessmentDecision internally
buildLessonPlanBlock(plan): string
```

**Expected behavior:** First-match-wins stage assembly in fixed
pedagogical order; every objective/completion-criteria string is a
template built from data already in hand (`decision.goal`, concept ids,
assessment numbers) — never invented prose, never an LLM call.

**Failure behavior:** `getLessonPlan`'s internal `getAssessmentDecision`
call degrades to `assessment: null` on failure.

**Guarantees:** Never generates educational content. The exhaustive
`switch` over `TeachingActionType` in `buildCoreStages` is a TypeScript
`never`-checked exhaustiveness guard — a new `TeachingActionType` value
in TAG will fail to compile here until handled.

**Side effects:** None (pure); async wrapper performs a read-only
Assessment Intelligence lookup.

**Deterministic:** Yes.

**MUST NOT:** Generate content. Modify `TeachingDecision`, `TeachingAction`,
or `AssessmentDecision`.

> **Naming overlap (flagged, not fixed):** see Engine 21
> ("Lesson Planner, Sprint BY") and `ARCHITECTURE_DECISIONS.md` — both this
> engine and the pre-existing Lesson Planner export a type named
> `LessonPlan` and a function named `buildLessonPlanBlock`, with different
> shapes and different purposes. No runtime collision (both are
> dynamically imported into separate block scopes in
> `api/learn/chat/route.ts`), but the name overlap is a documented finding.

---

## 13–20. Teaching-support satellite engines

All eight files below live in `src/lib/school/adaptive/`, are
**100% deterministic** (confirmed: zero matches for `routeAI|openai|groq|
generateText|callLLM|fetch(|axios` across all of them), read only from
Prisma + the static KG, and each renders one advisory system-prompt block.
None writes to the database.

| # | Engine | File | Responsibility |
|---|---|---|---|
| 13 | Confidence Calibration | `confidenceCalibration.ts` | Compares stated/implied confidence against actual performance; flags over/under-confidence |
| 14 | Learning Momentum | `learningMomentum.ts` | Tracks short-term trend (improving/flat/declining) in recent performance |
| 15 | Teaching Strategy Orchestrator | `teachingStrategy.ts` | Selects the per-turn `TeachingStrategyType`; logged to `TeachingStrategyEvent` for Strategy Effectiveness to read back |
| 16 | Teaching Output Bias | `teachingOutputBias.ts` | Computes output bias / hint bias (`deriveOutputBias`, `deriveHintBias`, `isOptionalInlinePractice`, `isOptionalVisual`, `isOptionalVisualTag`, `isRequiredSceneSpec`) — gates how much scaffolding the response should include |
| 17 | Teaching Style Detector | `teachingStyle.ts` | Infers `STEP_BY_STEP \| VISUAL_FIRST \| EXAMPLE_FIRST \| THEORY_FIRST` from difficulty mode, practice accuracy, checkpoint pass rate; trusts a stored "last successful style" first |
| 18 | Misconception Engine | `misconceptionEngine.ts` | Pattern-matches `MistakeRecord`/`LearningCheckpoint` topic slugs against a ~45-rule static taxonomy (math/science/English/social-science/Hindi/Sanskrit/quantum-physics/classical-mechanics/CS/data-science) to surface specific misconceptions + remediation steps |
| 19 | Concept Transfer | `conceptTransfer.ts` | Classifies `TRANSFER_STRONG \| DEVELOPING \| WEAK` by comparing pass rates on keyword-classified "routine" vs "application" checkpoint questions |
| 20 | Strategy Effectiveness | `strategyEffectiveness.ts` | Reads the `TeachingStrategyEvent` log to detect the same strategy firing 3+ times in a row on an unmastered topic ("stale mate" detector) |

**MUST NOT (all eight):** Write to the database (`spacedRevision.ts`,
listed separately below, is the one adaptive-tier exception that writes).
Call the Teaching Engine, TAG, or Lesson Composer. Generate content beyond
their fixed advisory-block templates.

---

## 21. Lesson Planner (Sprint BY) — chapter-scoped roadmap

**File:** `src/lib/school/adaptive/lessonPlanner.ts`

**Responsibility:** A **different, pre-existing engine** from the Dynamic
Lesson Composer (Engine 12). Derives a lightweight **chapter roadmap** —
which KG nodes in the current chapter are `mastered`/`current`/`remaining`
— for the chapter workspace UI and a "CURRENT LESSON PLAN" system-prompt
block. Header comment, verbatim: *"Derives a lightweight chapter roadmap
from existing data — no AI, no new tables."*

**Inputs:** `userId, subjectSlug, chapterId, chapterTitle, kgNodes`.

**Outputs:** `LessonPlan { currentChapter, currentConcept,
masteredConcepts, remainingConcepts, nextConcept, recommendedCheckpoint,
recommendedPractice, estimatedCompletion }` — note: **this `LessonPlan`
type is unrelated in shape to `lessonComposer.ts`'s `LessonPlan`.**

**Public functions:**
```ts
buildLessonPlan(userId, subjectSlug, chapterId, chapterTitle, kgNodes): Promise<LessonPlan>
buildLessonPlanBlock(plan): string                    // → "CURRENT LESSON PLAN — ..." header
getLessonPlanCardItems(plan): Array<{title, status}>  // chapter workspace UI card, max 4 items
```

**Expected behavior:** `mastered` = `TopicProgress` COMPLETED/MASTERED/
REVISION, or checkpoint pass rate ≥80% over ≥2 checks in the last 14 days;
`current` = `TopicProgress` IN_PROGRESS or first non-mastered node in
order; `remaining` = everything after. Also reads the last 5
`PracticeSession` rows (kind='practice') to set `recommendedPractice`
(true if avg score <70 or none).

**Side effects:** Read-only — `prisma.topicProgress`,
`prisma.learningCheckpoint`, `prisma.practiceSession`.

**Deterministic:** Yes. No LLM calls (confirmed by grep).

**Callers:** `api/learn/chat/route.ts` (system-prompt block, hoisted as
`lessonPlanHoisted`) and
`src/app/school/[subject]/chapter/[chapterId]/page.tsx` (drives the
"Learning Journey" UI card via `getLessonPlanCardItems`).

**MUST NOT:** Generate content. Be confused with the Dynamic Lesson
Composer — see `ARCHITECTURE_DECISIONS.md` for the explicit
distinct-engines ruling.

---

## 22–30. Recommendation Intelligence cluster

These engines answer "what should the student do next" at the
session/day/subject level — **not** within a single teaching turn. None
is called by, or calls, the Teaching Engine, TAG, or Lesson Composer.

| # | Engine | File | Responsibility |
|---|---|---|---|
| 22 | Next-Best-Action | `nextBestAction.ts` | Priority-ranked next action across subjects (retake assessment → practice weak topic → continue chapter → start next chapter → spaced review). Self-labels its step 5 as "Phase 2G (Recommendation Intelligence)." |
| 23 | Learning Orchestrator | `learningOrchestrator.ts` | The broadest cross-engine aggregator — 8-tier priority chain (failed assessment → prerequisite gap → spaced revision → weak topic → exam-readiness risk → mock-test weakness → continue/start chapter) returning exactly one `LearningRecommendation`. The strongest claimant to "the" canonical Recommendation Intelligence engine; `nextBestAction.ts` is a narrower, earlier subset of the same idea and both coexist (see `ARCHITECTURE_DECISIONS.md`). |
| 24 | Weak Topics | `weakTopics.ts` | Severity-scored weak-topic detector from `MistakeRecord` + `TopicProgress`, with chapter-level revision rollup |
| 25 | Daily Plan | `dailyPlan.ts` | Max-3-task daily study plan combining failed assessments, prerequisite bridges, spaced revision, weak topics, intelligence-weighted chapter continuation |
| 26 | Study Plan | `studyPlan.ts` | Simplest engine — ≤4-step "Today/Next/Then/After" plan for one subject's active chapter |
| 27 | Exam Readiness | `examReadiness.ts` | Weighted 0–100 readiness score per subject (40% mastery coverage, 30% assessment strength, 20% revision coverage, 10% inverse weak-topic risk) |
| 28 | Spaced Revision | `spacedRevision.ts` | Forgetting-curve scheduler over fixed intervals `[1,3,7,14,30,90]` days, reusing `TopicProgress.{completedAt,revisionCount,lastRevisionAt}`. **The one adaptive-tier file in this cluster that writes** (`advanceRevision` updates `TopicProgress`). |
| 29 | Prerequisite Recovery | `prerequisiteRecovery.ts` | Walks the KG prerequisite graph from the weakest current node to find an unmastered foundational prerequisite, HIGH/MEDIUM/LOW confidence |
| 30 | Learning Narrative | `learningNarrative.ts` | Longitudinal trend classifier (`RAPID_IMPROVEMENT \| STEADY_PROGRESS \| RECOVERY_PHASE \| PLATEAU \| REGRESSION_RISK`) comparing a recent 7-day window to an earlier 8–30-day window |

Also in this tier (not strictly "next action" but feeding it):
**Learning Profile** (`learningProfile.ts`) — derives
`StudentLearningProfile` (difficulty mode, strengths/weaknesses, teaching
style, prerequisite-gap count, readiness/mastery summaries).

**MUST NOT (entire cluster):** Evaluate mastery (that is Mastery
Intelligence's job — these engines *read* mastery state, never compute
it). Teach. Be called from the Teaching Engine, TAG, or Lesson Composer.

---

## 31. Visual Type System

**Files:** `src/lib/school/visuals/{visualTypes,detectVisual}.ts`

**Responsibility:** The single source of truth for the `VisualType` union
(50+ values, including the `three_*` 3D taxonomy) and the deterministic
keyword matcher (`detectVisual()`) that picks one for a given
subject/chapter/lesson. Also parses the `VISUAL:<type>` tag out of LLM
responses (`parseVisualTag()`).

**Inputs:** `{ subjectSlug, chapterTitle, lessonTitle? }`.

**Outputs:** `VisualType | null`.

**Deterministic:** Yes — keyword matching, no LLM.

**MUST NOT:** Be re-implemented by any consumer (TAG, Lesson Composer,
the chat route's two visual-block calls) — every visual decision must
route through `detectVisual()`.

---

## 32. AI Router

**File:** `src/lib/ai/router.ts`

**Responsibility:** The **only** probabilistic component in the pipeline.
Sends the assembled system prompt + conversation history to Groq
(`openai/gpt-oss-20b`, primary) or YandexGPT (Russia-only, itself falling
back to Groq on missing credentials or any error).

**Inputs:** message history, system prompt, country, max tokens, language,
`{userId, subject}` for budget/usage tracking.

**Outputs:** `RouteAIResult { text, provider }`.

**Public functions:** `routeAI(...)`, `routeJSON(...)`.

**Expected behavior:** One explicit retry on Groq returning HTTP-200 with
null/empty content (SDK's own `maxRetries: 2` only covers HTTP-level
errors).

**Failure behavior:** Budget exhaustion throws `AIBudgetExceededError`
(→ 429 at the route level); other errors propagate and are caught/logged
by the calling route (→ 500).

**Guarantees:** Exactly one LLM call per turn — never chained/agentic.

**Side effects:** Network call; consumes the AI budget
(`consumeAIBudget()`).

**Deterministic:** No — this is the one place randomness/non-determinism
is expected and accepted in the entire pipeline.

**MUST NOT:** Make a pedagogical decision. It renders; it does not decide
what, when, or how to teach.

---

## 33. Educational Brain Decision Pipeline (experimental, disabled by default)

**Files:** `src/lib/educationalBrain/{frameStage,intentStage,retrievalStage,
compositionStage,persistStage,pipeline,types}.ts`

**Responsibility:** A separate, newer "Eb*"-backed concept-graph pipeline
(stages 0–4: Frame → Intent → Retrieval → Composition → Persist), gated by
`ENABLE_EDUCATIONAL_BRAIN_PIPELINE` (default unset/false). Persists
`EbEvidenceEvent` rows when a concept is surfaced.

**Inputs:** `FrameInput` (raw turn context).

**Outputs:** `TurnContext | null` (`null` whenever the flag is off).

**Public functions:** `isEducationalBrainEnabled()`, `runEducationalBrainPipeline(input)`.

**Expected behavior:** Called fire-and-forget, **never awaited**, from
`api/learn/chat/route.ts` post-response — has zero effect on what the
student sees unless explicitly enabled.

**Failure behavior:** Returns `null` immediately if the flag is off; the
chat route does not await it, so any internal failure cannot affect the
response already sent.

**Guarantees:** Zero overhead on production traffic when the flag is
absent/false (measured: offline stages p99 = 0.038ms).

**Side effects:** Writes `EbEvidenceEvent` (stage 4, non-fatal) when
enabled.

**Deterministic:** Yes (stages 0/1/3 are pure/synchronous; stages 2/4 are
async DB read/write but rule-based, not LLM-based).

**MUST NOT:** Be assumed live in any default deployment. Be relied upon by
any other engine — it is a parallel, optional experiment, not a
dependency of the canonical pipeline.

---

## 34. Legacy Teaching Action Engine + Teaching Assets Platform (orphaned, unwired)

**Files:** `src/lib/curriculum/teachingActionEngine.ts`,
`teachingAssetSchema.ts`, `teachingAssetAdapter.ts`, `teachingAssets.ts`

**Responsibility (as written):** A second, independent "HOW to teach"
decision layer — `decideAction(student, decision, asset, concept):
TeachingAction` — driven by a richer, Zod-validated `TeachingAsset` shape
(`learning_objective`, `real_world_applications`, `visual_teaching_
suggestions`, `practice_blueprint`, `assessment_blueprint`) loaded per
subject from `docs/{subject}/teaching-assets/assets.json` (data exists for
mathematics, physics, chemistry, biology, computer-science — confirmed on
disk).

**Confirmed status:** `decideAction()`, `getTeachingAsset()`, and
`getTeachingAssets()` have **zero callers anywhere in `src/`** outside
their own files. This is fully-built, schema-validated, data-backed code
that is not wired into any live route. It predates, and has materially
overlapping purpose with, the Phase 3A Teaching Action Generator (Engine
11) — both take a `TeachingDecision` + `ConceptNode` and produce a
"TeachingAction" describing how to teach — but with **different,
incompatible type shapes** (`TeachingActionType` here has 15 values:
`VISUAL_EXPLANATION, INTERACTIVE_DIAGRAM, ANIMATION, SIMULATION, TIMELINE,
SOCRATIC_QUESTIONING, GUIDED_PROBLEM_SOLVING, CONCEPT_COMPARISON,
PRACTICE_SESSION, RETRIEVAL_PRACTICE, MISCONCEPTION_INTERVENTION,
RAPID_REVIEW, WORKED_EXAMPLE, ANALOGY, ASSESSMENT,
EXPERIMENT_DEMONSTRATION` vs. TAG's 10).

**Deterministic:** Yes (pure, table-driven, confirmed no I/O in
`decideAction` itself).

**MUST NOT:** Be assumed live by any document or developer reading this
freeze. See `ARCHITECTURE_DECISIONS.md` for the explicit finding and
recommended (not executed) disposition.

---

## 35. Closed Beta Stabilization (historical, completed)

**Not a running engine** — a sequence of completed, scoped audit-then-fix
sprints (all on `claude/my-tutor-foundation-KDSUO`) that hardened the app
for closed-beta launch. Concrete fixes, by file:

- `src/app/auth/login/page.tsx` (`safeCallbackUrl()`) — closed an
  open-redirect phishing vector.
- `src/app/api/onboarding/route.ts` — onboarding redirect-loop auto-heal.
- Account-merge guard — `isEmailUniqueConflict()` now checks Prisma
  `P2002` + `meta.target` instead of a broad message substring.
- `src/middleware.ts` — fixed CRIT-1: a session/middleware deadlock
  (NextAuth Edge-runtime `jwt` callback was running a Prisma query,
  hanging every authenticated request after sustained uptime) — the most
  severe bug found in the beta program.
- `src/app/api/leaderboard/route.ts` — fixed soft-deleted users leaking
  into the leaderboard (missing `isDeleted: false`).
- `src/lib/tts.ts` — fixed a TTS race condition via a generation-counter
  guard.
- `/school/*` mode-leak fix (missing `?mode=library` guard).
- `src/lib/email.ts` — `reportError()` observability added for silent SMTP
  failures.

**Status:** Explicitly framed throughout its own reports as finished,
scoped work ("no redesign," "no new features," an explicit "Stop rule")
— not an ongoing process. No CI/CD gate enforces these patterns going
forward (`.github/workflows/` does not exist); the discipline lives only
in the code and its regression tests.

**MUST NOT:** Be re-opened or "continued" by a future phase without an
explicit new audit — this is closed, completed history, not a live
subsystem with an owner to extend.

---

## 36. Data Integrity Foundation (historical, now load-bearing)

**Not a single engine** — the subset of Beta Stabilization specifically
about atomic/transactional correctness, now permanent infrastructure:

- `src/lib/db/prisma.ts:60` — `withRetry()` retries Neon transient
  connection errors (P1001/P1002/P1008/P1017).
- `src/app/api/school/assessment/submit/route.ts:75` —
  `withRetry(() => prisma.$transaction(...))` wrapping `StudentProgress` +
  `TopicProgress` writes together.
- `src/app/api/practice/submit/route.ts:55,91` — two `$transaction`
  blocks: `PracticeSession.create()` + `MistakeRecord.createMany()` under
  an `idempotencyKey` guard, and a separate mastery/`TopicProgress` update
  transaction.
- `src/app/api/curriculum/progress/route.ts:72-73` — raw `$executeRaw`
  atomic `UPDATE student_progress` (not read-then-write) to block
  concurrent XP-farming/double-completion races.
- Regression tests pin these patterns to specific audit-finding IDs:
  `src/tests/transactionPatterns.test.ts`, `src/tests/xpIdempotency.test.ts`.

**Status:** One-time hardening, not an enforced ongoing gate — no CI
wiring exists. The discipline ("wrap multi-row writes in a transaction,
make idempotency-sensitive writes atomic") is documented expectation, not
a checked rule.

**MUST NOT:** Be assumed enforced by CI. Any new multi-row write path
introduced by a future phase must manually follow this same pattern —
nothing currently checks for it automatically.

---

## Cross-reference: where Recommendation Intelligence actually shows up

Per the canonical pipeline (§3 of `EDUCATIONAL_BRAIN_V1.md`),
Recommendation Intelligence is **not** in the chat-turn decision chain. Its
outputs appear in:
1. Advisory system-prompt blocks inside the chat route's big `schoolCtx`
   gate (STUDENT STATUS, DAILY STUDY PLAN, ROADMAP PROGRESS) — read
   alongside, not through, the Teaching Engine.
2. Dashboard and chapter-page UI, entirely outside any chat turn
   (`getDailyStudyPlan`, `getTopRecommendation`, `getLessonPlanCardItems`,
   etc., called directly from page server components).
