# Dependency Rules — Educational Brain v1.0

For every engine: what it may read, and what it must never call. These
rules are extracted from how the code is already written — they describe
existing discipline, they do not impose new restrictions.

Format: `✓ may read` / `✗ must NOT call`.

---

## Knowledge Graph System

**Curriculum Authority Brain** (`curriculum/engine.ts`, `subjectCatalog.ts`)
- ✓ Static `SUBJECT_LIBRARY` data only
- ✗ Knowledge Graph System, Student Memory, any adaptive/* engine, the LLM

**Knowledge Graph Validator** (`scripts/validate-knowledge-graph.ts`)
- ✓ A `graph.json` file path (fs read only)
- ✗ Any other engine, any database, the LLM. It is a standalone CLI,
  never imported by application code.

**Canonical Knowledge Graph System** (`curriculum/knowledgeGraph.ts`)
- ✓ Generic Subject Adapter, the legacy 54-node hardcoded KG
- ✗ Student Memory, Teaching Engine, any adaptive/* engine, the LLM, the database

**Generic Subject Adapter** (`curriculum/subjectKgAdapter.ts`)
- ✓ `docs/{subject}/kg/graph.json` (fs read, cached)
- ✗ Any other engine, the database, the LLM

**Subject Knowledge Graphs** (`docs/{subject}/kg/graph.json`)
- N/A — static data, reads nothing, is read by the Generic Subject Adapter only

---

## Student Memory Engine

`src/lib/memory/{repository,service,update-pipeline}.ts`
- ✓ Prisma (`TopicProgress, MistakeRecord, LearningProfile,
  RetentionMetric, ReviewSchedule, SubjectAnalytics, Message, LearnSession`)
- ✗ Knowledge Graph System, Teaching Engine, TAG, Lesson Composer, any
  Recommendation engine, the LLM. Student Memory is upstream of all of
  them and must never read back from them (no circular dependency).
- write path (`update-pipeline.ts`) ✗ must not be called from the chat
  turn (`api/learn/chat/route.ts`) — only from practice/assessment submit routes.

---

## Mastery Intelligence

`school/adaptive/masteryIntelligence.ts`
- ✓ Student Memory (or its underlying Prisma models directly), chapter
  progress data
- ✗ Teaching Engine, TAG, Lesson Composer, Assessment Intelligence,
  Recommendation engines, the LLM, database writes

---

## Assessment Intelligence

`school/adaptive/assessmentIntelligence.ts`
- ✓ Student Memory (`readLearnerMemory`), Mastery Intelligence
  (`getMasteryProfile`), chapter progress details
- ✗ Teaching Engine, TAG, Lesson Composer (it informs them; they never
  inform it back), Recommendation engines, the LLM, database writes
- Per the example rule in the freeze brief: **Assessment Intelligence
  never teaches.**

**Subject Assessment Requirements** (`assessment/subjectValidator.ts`)
- ✓ `subjectCatalog.findLibrarySubject` (category lookup only)
- ✗ Assessment Intelligence, Student Memory, any other engine — this is a
  static table, intentionally isolated

---

## Teaching Engine (FROZEN)

`teaching-engine/{index,types}.ts`
- ✓ Its own three input parameters (`StudentState`, `ConceptNode`,
  `LearningHistory`) — nothing else
- ✗ **Everything.** Per the explicit example rule in the freeze brief:
  *"Teaching Engine may read: ✓ Student Memory ✓ Knowledge Graph; may NOT
  call: ✗ Recommendation Engine ✗ Lesson Composer."* In the actual code,
  the Teaching Engine doesn't even read Student Memory or the Knowledge
  Graph directly — the **caller** (`api/learn/chat/route.ts`) reads both
  and passes the already-shaped `StudentState`/`ConceptNode` in. The
  Teaching Engine itself performs **zero** I/O and calls **zero** other
  engines. This is stricter than the brief's example, and that is by
  design — it is the one engine every other engine depends on, so it must
  depend on nothing.
- ✗ Database writes, ever.

---

## Teaching Action Generator (TAG)

`school/adaptive/teachingActionGenerator.ts`
- ✓ `TeachingDecision` (from caller), `ConceptNode` (from caller),
  `TeachingActionContext` (caller-supplied weak concepts/misconceptions),
  Assessment Intelligence (`getAssessmentDecision`, async wrapper only —
  for the challenge-problem signal), Visual Type System (`detectVisual`)
- ✗ Teaching Engine (must not call `decide()` itself — only consumes its
  already-computed output), Lesson Composer, Student Memory directly,
  Recommendation engines, database writes
- **Teaching Action Generator never modifies Teaching Decisions** — it
  reads `decision.goal`/`decision.estimated_time` verbatim and only ever
  *adds* fields, never overwrites the source.

---

## Dynamic Lesson Composer

`school/adaptive/lessonComposer.ts`
- ✓ `TeachingDecision`, `TeachingAction` (both from caller), Assessment
  Intelligence (`getAssessmentDecision`, async wrapper), `ConceptNode`,
  `LessonComposerContext` (caller-supplied misconceptions/review-due ids)
- ✗ Teaching Engine, TAG (must not call `deriveTeachingAction()` itself —
  only consumes its output), Knowledge Graph System directly, Student
  Memory directly, Recommendation engines, the LLM, database writes
- **Lesson Composer never generates educational content** — every string
  it produces is a template built from data already in hand.

---

## Teaching-support satellite engines

(Confidence Calibration, Learning Momentum, Teaching Strategy
Orchestrator, Teaching Output Bias, Teaching Style, Misconception Engine,
Concept Transfer, Strategy Effectiveness)
- ✓ Prisma (their own specific models — see `ENGINE_REFERENCE.md` per
  engine), each other only where explicitly noted (e.g. Strategy
  Effectiveness reads `TeachingStrategyEvent`, which Teaching Strategy
  Orchestrator writes)
- ✗ Teaching Engine, TAG, Lesson Composer (these engines feed the system
  prompt directly; they are never called *by* the core teaching chain),
  the LLM, writes to any model outside their own documented scope

---

## Lesson Planner (Sprint BY, chapter-scoped)

`school/adaptive/lessonPlanner.ts`
- ✓ Prisma (`TopicProgress, LearningCheckpoint, PracticeSession`),
  `KnowledgeNode[]` (caller-supplied, from `@/lib/education`)
- ✗ Dynamic Lesson Composer (these are independent engines — neither may
  call the other; see `ARCHITECTURE_DECISIONS.md`), Teaching Engine, TAG,
  any other adaptive/* engine

---

## Recommendation Intelligence cluster

(Next-Best-Action, Learning Orchestrator, Weak Topics, Daily Plan, Study
Plan, Exam Readiness, Spaced Revision, Prerequisite Recovery, Learning
Narrative, Learning Profile)
- ✓ Prisma (their own models), the static KG (`@/lib/education`), and
  each other in documented chains only (e.g. Learning Orchestrator reads
  Prerequisite Recovery, Spaced Revision, Weak Topics, Exam Readiness;
  Daily Plan reads Weak Topics + Spaced Revision + several others; Exam
  Readiness reads Spaced Revision's interval constants)
- ✗ **Teaching Engine, TAG, Lesson Composer — none of these may be called
  by, or call, the Recommendation cluster.** Per the example rule in the
  freeze brief: **Recommendation Engine never evaluates mastery** — every
  engine in this cluster *reads* Mastery Intelligence's or Student
  Memory's prior conclusions; none of them independently scores mastery.
- ✗ Database writes, with one documented exception: `spacedRevision.ts`'s
  `advanceRevision()` updates `TopicProgress` directly (it owns the
  spaced-repetition *stage* field on that row, distinct from Student
  Memory's `RetentionMetric`/`ReviewSchedule` write ownership)

---

## Visual Type System

`school/visuals/{visualTypes,detectVisual}.ts`
- ✓ `{subjectSlug, chapterTitle, lessonTitle}` (caller-supplied)
- ✗ Every other engine — this is a leaf dependency. Everything calls
  into it; it calls into nothing.

---

## AI Router

`ai/router.ts`
- ✓ The fully-assembled system prompt + message history (built by the
  caller from every engine above), `country` (for provider routing), AI
  budget tracking
- ✗ **Any Educational Brain engine.** The AI Router never reads the
  Knowledge Graph, Student Memory, or any adaptive engine directly — it
  only ever receives the already-assembled text. This is the hard
  boundary between deterministic decision-making and probabilistic
  generation.

---

## Educational Brain Decision Pipeline (experimental)

`src/lib/educationalBrain/*`
- ✓ `FrameInput` (raw turn context, caller-supplied), Prisma
  (`EbEvidenceEvent` write only)
- ✗ Every other Educational Brain engine documented above. It is an
  independent, optional, fire-and-forget parallel pipeline — not a
  dependency of, and not depended on by, the canonical pipeline.

---

## Legacy Teaching Action Engine + Teaching Assets Platform (orphaned)

`curriculum/{teachingActionEngine,teachingAssetSchema,teachingAssetAdapter,teachingAssets}.ts`
- ✓ `StudentState`, `TeachingDecision`, `ConceptNode` (caller-supplied),
  `docs/{subject}/teaching-assets/assets.json` (fs read, cached)
- ✗ Currently called by **nothing** in `src/`. No live dependency edges
  exist to or from this subsystem today.

---

## Summary table (✓ = may read, blank = no relationship, ✗ = forbidden)

| Engine | KG | Memory | Mastery | Assessment | Teaching Eng. | TAG | Lesson Composer | Recommendation | LLM | DB write |
|---|---|---|---|---|---|---|---|---|---|---|
| Curriculum Authority Brain | | | | | | | | | | ✗ |
| KG Validator | (file only) | | | | | | | | | ✗ |
| Canonical KG System | ✓(adapter) | | | | | | | | | ✗ |
| Generic Subject Adapter | (file only) | | | | | | | | | ✗ |
| Student Memory | | (self) | | | | | | | | ✓(RetentionMetric, ReviewSchedule only) |
| Mastery Intelligence | | ✓ | (self) | | | | | | | ✗ |
| Assessment Intelligence | | ✓ | ✓ | (self) | | | | | | ✗ |
| Teaching Engine | (caller-supplied) | (caller-supplied) | | | (self) | ✗ | ✗ | ✗ | ✗ | ✗ |
| TAG | (via Visual System) | | | ✓(async, narrow) | ✓(consumes only) | (self) | ✗ | ✗ | ✗ | ✗ |
| Lesson Composer | | | | ✓(async, narrow) | ✓(consumes only) | ✓(consumes only) | (self) | ✗ | ✗ | ✗ |
| Lesson Planner (Sprint BY) | (caller-supplied) | | | | | ✗ | ✗ | | | ✗ |
| Recommendation cluster | ✓ | ✓ | ✓(reads, never scores) | | ✗ | ✗ | ✗ | (each other, documented) | | ✓(spacedRevision only) |
| Visual Type System | | | | | | | | | | ✗ |
| AI Router | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | (self) | ✗ |
| EB Decision Pipeline (experimental) | | | | | | | | | ✗ | ✓(EbEvidenceEvent only) |
| Legacy Teaching Action Engine (orphaned) | (caller-supplied) | | | | (caller-supplied) | | | | ✗ | ✗ |

No cell in this table creates a cycle — every arrow points strictly
downstream in the pipeline order documented in `DATA_FLOW.md` §1.
