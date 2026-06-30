# The Educational Brain Bible

**Status: LIVING DOCUMENT — single source of truth.** This document is
the top-level entry point for the entire Educational Brain architecture.
It is updated by every Architecture Decision Record (ADR) from this point
forward. If anything in this document conflicts with a detail document
or an ADR, **this document wins** — and the conflict must be resolved by
editing the losing document, never by leaving two true-sounding answers
in the repository.

**Governance rule:** every ADR, on completion, must update this Bible
(at minimum: the ADR index, the relevant flow section, and the risk
register if it introduces or resolves a risk). An ADR that does not
update the Bible is not finished.

**Authorship date:** 2026-06-30. **Author role:** Chief Educational Brain
Architect (AI-assisted, human-directed). **Scope:** architecture only —
this document describes a design, much of which is already built (the
canonical pipeline) and some of which is proposed and unimplemented (every
ADR-08-and-later finding). Each section below states which is which.

---

## 0. How to read this Bible

1. §1–§2 — what the Educational Brain is and the one rule that governs it.
2. §3 — the complete engine map (every engine, every file, current status).
3. §4 — engine responsibilities, by tier, with pointers to full contracts.
4. §5 — component interaction diagram.
5. §6 — the twelve flows (data, decision, student learning, knowledge,
   memory, evidence, recommendation, visualization, AI interaction, plus
   three cross-cutting strategies: scalability, versioning, validation).
6. §7 — risk register.
7. §8 — architecture glossary.
8. §9 — ADR index (every ADR, one line each, current status).
9. §10 — roadmap status (where the 8-item plan stands).
10. §11 — document map (this Bible vs. the detail documents it indexes).
11. §12 — change log of this Bible itself.

This Bible **indexes and synthesizes** the detail documents
(`ENGINE_REFERENCE.md`, `DATA_FLOW.md`, `DEPENDENCY_RULES.md`,
`EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md`, `EDUCATIONAL_BRAIN_V1.md`)
rather than duplicating their full content. Where a flow needs more detail
than fits here, the section says so and names the document to open next.

---

## 1. What the Educational Brain is

The Educational Brain is the collection of deterministic, rule-based
engines that decide *what* a student should learn next, *whether* they've
mastered it, *how* it should be taught this turn, and *what shape* the
lesson should take — all computed **before** any LLM is called. The LLM
renders the conversational turn; it never makes a pedagogical decision.
Every "intelligence" block injected into the tutor's system prompt is
advisory text built from data the engine already had — never invented
prose, never a second LLM call.

The question every ADR must answer, restated as the standing design test
for every future change:

> **How does this make the Educational Brain think and teach more like a
> world-class human teacher?**

A world-class human teacher: knows exactly what a student has and hasn't
mastered (not a guess); never re-explains what's already understood;
notices a misconception before it calcifies; adapts explanation style to
the individual, not the average; chooses the right representation (words,
diagram, simulation, worked example) for the concept at hand; remembers
the student's history across sessions, not just this one; and gets more
effective over time, not just more complex. Each engine below exists to
serve one of these capabilities.

## 2. The one governing rule

> **Decisions are deterministic. Only the words are generated.**

Every engine upstream of the AI Router is deterministic, pure (or
read-then-pure), and produces structured output, not prose. The AI Router
is the **only** probabilistic component in the entire system (Permanent
Rule 9, `ARCHITECTURE_DECISIONS.md`). This is the load-bearing design
constraint of the whole platform — every ADR's "Selected design" must
preserve it, and any design that requires a second LLM call to make a
*decision* (as opposed to render text) is rejected on sight.

---

## 3. Complete engine map

Status legend: **LIVE** = runs in production today. **DORMANT** = code
exists, zero/flagged-off live traffic. **PROPOSED** = ADR written,
nothing implemented. **ORPHANED** = code exists, confirmed zero callers,
not deleted (content layer) or deleted (dead decision-engine duplicate,
see ADR 03).

| # | Engine | Tier | Primary file(s) | Status | Canonical ADR |
|---|---|---|---|---|---|
| 1 | Curriculum Authority Brain | Knowledge | `curriculum/engine.ts`, `subjectCatalog.ts` | LIVE | — |
| 2 | Canonical Knowledge Graph System | Knowledge | `curriculum/knowledgeGraph.ts` | LIVE | ADR 06 (consumption gate proposed) |
| 3 | Generic Subject Adapter | Knowledge | `curriculum/subjectKgAdapter.ts` | LIVE | ADR 05 (2 fields unexposed), ADR 06 |
| 4 | Knowledge Graph Validator | Knowledge | `scripts/validate-knowledge-graph.ts` | LIVE (manual CLI, no CI wiring) | ADR 06 |
| 5 | Subject Knowledge Graphs (data) | Knowledge | `docs/{subject}/kg/graph.json` × 5 | LIVE (Curriculum Production Pipeline authority) | ADR 06 |
| 6 | Student Memory Engine | Memory | `memory/{repository,service,update-pipeline,types}.ts` | LIVE | — (ADR 10 upcoming) |
| 7 | Mastery Intelligence | Mastery | `school/adaptive/masteryIntelligence.ts` | LIVE, School-Mode-only | ADR 07 (Library extension proposed) |
| 8 | Assessment Intelligence | Assessment | `school/adaptive/assessmentIntelligence.ts` | LIVE | — |
| 9 | Subject Assessment Requirements | Assessment | `assessment/subjectValidator.ts` | LIVE | — |
| 10 | Teaching Engine (FROZEN) | Teaching | `teaching-engine/{index,types}.ts` | LIVE, mode-agnostic by construction | ADR 08 (Library extension proposed via callers) |
| 11 | Teaching Action Generator (TAG) | Teaching | `school/adaptive/teachingActionGenerator.ts` | LIVE, School-Mode-only in practice | ADR 08 (Library extension proposed) |
| 12 | Dynamic Lesson Composer | Teaching | `school/adaptive/lessonComposer.ts` | LIVE, School-Mode-only in practice; recomputes from stage 1 every turn, no cross-turn continuity | ADR 08 (Library extension proposed); ADR 09 (cross-turn stage continuity proposed) |
| 13 | Confidence Calibration | Teaching support | `confidenceCalibration.ts` | LIVE | — |
| 14 | Learning Momentum | Teaching support | `learningMomentum.ts` | LIVE | — |
| 15 | Teaching Strategy Orchestrator (Teaching Posture Intelligence) | Teaching support | `teachingStrategy.ts` | LIVE, both modes (ADR 02) | ADR 02, ADR 08 (relationship to TAG formalized) |
| 16 | Teaching Output Bias | Teaching support | `teachingOutputBias.ts` | LIVE | — |
| 17 | Teaching Style Detector | Teaching support | `teachingStyle.ts` | LIVE | — |
| 18 | Misconception Engine | Teaching support | `misconceptionEngine.ts` | LIVE | — |
| 19 | Concept Transfer | Teaching support | `conceptTransfer.ts` | LIVE | — |
| 20 | Strategy Effectiveness | Teaching support | `strategyEffectiveness.ts` | LIVE | — |
| 21 | Lesson Planner (chapter roadmap) | Lesson | `lessonPlanner.ts` | LIVE, both modes (ADR 02) | ADR 02 |
| 22 | Next-Best-Action | Recommendation | `nextBestAction.ts` | **Split**: `getChapterNextStep()` LIVE; `getNextBestAction()`/`nextActionHref()`/`NEXT_ACTION_LABELS` ORPHANED | ADR 04 (proposal, permanently unexecuted) |
| 23 | Learning Orchestrator | Recommendation | `learningOrchestrator.ts` | LIVE, primary aggregator | ADR 04, ADR 11 upcoming |
| 24 | Weak Topics | Recommendation | `weakTopics.ts` | LIVE | — |
| 25 | Daily Plan | Recommendation | `dailyPlan.ts` | LIVE | — |
| 26 | Study Plan | Recommendation | `studyPlan.ts` | LIVE | — |
| 27 | Exam Readiness | Recommendation | `examReadiness.ts` | LIVE | — |
| 28 | Spaced Revision | Recommendation | `spacedRevision.ts` | LIVE, both modes (ADR 02) | ADR 02 |
| 29 | Prerequisite Recovery | Recommendation | `prerequisiteRecovery.ts` | LIVE, School-Mode-only (KG_BY_ID coupling) | ADR 02 §7 |
| 30 | Learning Narrative | Recommendation | `learningNarrative.ts` | LIVE | — |
| 31 | Learning Profile | Recommendation | `learningProfile.ts` | LIVE, independent mastery re-classification | ADR 07 (consolidation proposed) |
| 32 | Visual Type System | Visual | `school/visuals/{visualTypes,detectVisual}.ts` | LIVE | — (ADR 12 upcoming) |
| 33 | AI Router | Generation | `ai/router.ts` | LIVE, the only probabilistic component | — (ADR 13 upcoming) |
| 34 | Educational Brain Decision Pipeline | Experimental | `educationalBrain/*` | DORMANT (flag off) | — |
| 35 | Teaching Assets Platform (content layer) | Legacy/orphaned | `curriculum/{teachingAssetSchema,teachingAssetAdapter,teachingAssets}.ts` | ORPHANED (content, zero importers) | ADR 03 |
| — | Teaching Action Engine (decision duplicate of #11) | Legacy | `curriculum/teachingActionEngine.ts` | **DELETED** 2026-06-30 | ADR 03 |

Full per-engine contract (inputs/outputs/public functions/failure
behavior/guarantees/MUST NOT) lives in `ENGINE_REFERENCE.md` — this table
is the map, that document is the territory.

---

## 4. Engine responsibilities, by tier

**Knowledge tier** — owns "what exists to be learned." The Canonical
Knowledge Graph (`docs/{subject}/kg/graph.json`) is produced exclusively
by the external Curriculum Production Pipeline and is treated as an
immutable runtime asset (Permanent Rule 1). The Generic Subject Adapter
is the only code that reads the raw JSON; every other engine reads
`ConceptNode`/`KnowledgeNode`, never the file directly.

**Memory tier** — owns "what does this specific student know, right now,
longitudinally." The Student Memory Engine is the sole owner of
`RetentionMetric`/`ReviewSchedule` writes (Permanent Rule 5) and the sole
aggregation/projection layer over the broader Learner Longitudinal State
bucket (18 Prisma models, most written directly by their owning feature
routes — see `DATA_FLOW.md` §2).

**Mastery / Assessment tier** — owns "has this student mastered this
concept" and "should we test them right now." Both are read-only over
Memory, never write, and never teach (Permanent Rules 6, 7).

**Teaching tier** — owns "what should happen in this specific turn."
The Teaching Engine (`decide()`) is frozen, pure, zero I/O — the one
engine every other engine depends on, so it depends on nothing
(`DEPENDENCY_RULES.md`). TAG and the Lesson Composer consume its output
and only add fields, never overwrite it (Permanent Rule 4). Eight
teaching-support satellites feed signal into the system prompt directly;
none of them are callable *by* the core teaching chain.

**Recommendation tier** — owns "what should the student do across
sessions, today, this week, before the exam." Reads Mastery/Memory's
already-computed conclusions; never independently scores mastery
(Permanent Rule 7). Never called by, and never calls, the Teaching tier
(hard DAG boundary, Permanent Rule 12).

**Visual tier** — owns "what representation fits this concept." A leaf
dependency: everything calls into it, it calls into nothing.

**Generation tier** — the AI Router. The only probabilistic component in
the system (Permanent Rule 9); never makes a pedagogical decision
(Permanent Rule 10); never reads any Educational Brain engine directly,
only the already-assembled prompt.

---

## 5. Component interaction diagram

```
                    ┌──────────────────────────────┐
                    │  Canonical Knowledge Graph     │   ◄── Curriculum Production
                    │  docs/{subject}/kg/graph.json  │        Pipeline (external,
                    │  (immutable runtime asset)      │        sole authority)
                    └───────────────┬─────────────────┘
                                    │ read-only
                    ┌───────────────▼─────────────────┐
                    │     Generic Subject Adapter        │
                    └───────────────┬─────────────────┘
                                    │ ConceptNode[]
        ┌───────────────────────────▼────────────────────────────────────┐
        │                    STUDENT MEMORY ENGINE                        │
        │   sole owner of longitudinal learner state (read+write path)    │
        └─────────┬──────────────────────────────────────────┬───────────┘
                  │ TeachingMemorySnapshot                    │ fire-and-forget
        ┌─────────▼─────────┐  ┌──────────────────┐  ┌────────▼──────────┐
        │ Mastery             │  │ Assessment        │  │ Recommendation     │
        │ Intelligence         │  │ Intelligence      │  │ cluster (9 engines) │
        └─────────┬─────────────┘  └────────┬──────────┘  └────────┬───────────┘
                  └─────────────┬───────────┘                       │ advisory,
                  ┌─────────────▼─────────────┐                     │ parallel path
                  │       TEACHING ENGINE        │                     │ (never feeds
                  │   decide() — frozen, pure     │◄─────────────────────┘ back into
                  └─────────────┬─────────────┘                       Teaching tier)
                                │ TeachingDecision
                  ┌─────────────▼─────────────┐
                  │ Teaching Action Generator    │
                  └─────────────┬─────────────┘
                                │ TeachingAction
                  ┌─────────────▼─────────────┐
                  │  Dynamic Lesson Composer      │
                  └─────────────┬─────────────┘
                                │ LessonPlan
                  ┌─────────────▼─────────────┐        ┌─────────────────────┐
                  │   systemPrompt assembly      │───────▶│      AI Router        │
                  │  (api/learn/chat/route.ts)   │        │  Groq / YandexGPT      │
                  └────────────────────────────────┘        │  (only probabilistic │
                                                            │   component)          │
                                                            └─────────┬───────────┘
                                                                      │ raw text
                                                            ┌─────────▼───────────┐
                                                            │  Response Parser tags  │
                                                            └─────────┬───────────┘
                                                                      ▼
                                                                    UI
```

A second, dormant pipeline (`educationalBrain/*`) runs fire-and-forget
beside this one, fed by the same chat turn, writing only to `EbEvidenceEvent`.
It has no read or write edge to anything in the diagram above and zero
effect on the response unless explicitly enabled — see Permanent Rule
set, Part 2 of `ARCHITECTURE_DECISIONS.md`.

---

## 6. The flows

Each flow below states what's **LIVE today**, what's **PROPOSED**, and
which document has the full trace.

### 6.1 Data flow (the chat-turn pipeline)

LIVE. Full 65-step ordered trace through `api/learn/chat/route.ts` (1688
lines) — every dynamic import, every `systemPrompt +=` block, in
execution order, plus the two pre-LLM gates, the one LLM call, and three
post-LLM gates. **Full detail: `DATA_FLOW.md` §1.**

### 6.2 Decision flow (Teaching Engine)

LIVE. `StudentState + ConceptNode + LearningHistory → TeachingDecision`
via `decide()` — frozen, pure, zero I/O, zero calls to any other engine.
This is the single decision point for "what should happen this turn"; TAG
and the Lesson Composer only elaborate its output, never re-decide.
**Full detail: `DATA_FLOW.md` §4 (Teaching flow), `ENGINE_REFERENCE.md`
Engine 10.**

**ADR 08 finding (Teaching Action Intelligence, roadmap item #3 —
DONE):** two distinct-grain layers answer "how to teach this turn" —
**Teaching Posture Intelligence** (`teachingStrategy.ts`, a 7-value
longitudinal-signal-synthesized posture, LIVE in both School and Library
modes since ADR 02) and **Teaching Action Intelligence**
(`decide()` → TAG → Dynamic Lesson Composer, the concrete-form layer:
`action_type`/`presentation_mode`/`visual_type`/`interaction_level`/
`bloom_level`/lesson-stage sequence). ADR 08 designates both as
canonical, at their respective grains, and does **not** merge them.
It also found that the Action layer — though every one of its three
engines (`decide()`, TAG's pure core, the Composer's pure core) is
mode-agnostic by construction — runs **only in School Mode in practice**,
because the one piece of state that seeds the chain
(`learnSession.contextSnapshot.currentConceptNodeId`) has exactly one
write site in the codebase, and it sits inside `if (schoolCtx)`
(`route.ts` ~1701). **PROPOSED, ADR 08:** a Library-mode seed-and-persist
path for `currentConceptNodeId`, using the same trivial-`Chapter`-shape/
unused-`board`/`grade`-parameter evidence pattern ADR 02 and ADR 07
already established — blocked on KG v1 freeze + explicit approval, same
as every other proposed extension in this Bible.

**ADR 09 finding (Dynamic Lesson Composition, roadmap item #4 — DONE):**
a separate, downstream gap from ADR 08's existence question. Even where
the Action layer already runs, `composeLessonPlan()` recomputes a full
`LessonPlan` from scratch every turn — its signature carries no
turn-history input, and `contextSnapshot` (the established continuity
store for this tier) has no equivalent of the stage progress the
rendered prompt text claims to be a "multi-turn pacing guide" for. The
codebase already has a proven answer to this exact class of problem,
narrowly scoped: the Interactive Worked Examples sub-system
(`workedExamples.ts`) emits a structured `[WE:concept|step|total]` tag,
parses it server-side, persists it to `contextSnapshot.currentWorkedExample`,
and reframes the next turn's prompt as "already in progress, do NOT
restart." **PROPOSED, ADR 09:** generalize that exact pattern to the
Lesson Composer's `LessonPlan` via a new
`contextSnapshot.lessonStageProgress` key, a new AI-emitted progress tag
+ parser, and an optional resume-framing parameter on
`buildLessonPlanBlock()` — all kept in the calling code (`route.ts`),
never inside `composeLessonPlan()`'s pure core, preserving its existing
purity guarantee. A `planSignature` fingerprint (computed in the calling
code from plan *shape*, not content) distinguishes a genuine continuation
from a genuine replan (e.g. a misconception resolved or a practice
threshold crossed) — a mismatch is treated as an intentional replan
event, not an error. Blocked on KG v1 freeze + explicit approval, same as
every other proposed extension in this Bible.

### 6.3 Student learning flow (one turn, end to end)

LIVE, synthesized across §6.1/6.2/6.4/6.5: Knowledge Graph node →
Student Memory read → Mastery/Assessment read → Teaching Engine decision
→ TAG → Lesson Composer → system prompt → AI Router → parsed response →
UI → (separately, on practice/assessment submit, not the chat turn)
Student Memory write-back. No step in this chain is generated prose
except the final LLM render.

### 6.4 Knowledge flow

LIVE. `graph.json` (immutable, 10-field canonical schema) → Generic
Subject Adapter (`inferDomain`/`inferConceptType`, derived, never stored)
→ `knowledgeGraph.ts` registry → fans out to Teaching Engine, TAG/Composer,
Recommendation cluster, AI-prompt context strings. The Knowledge Graph
Validator reads the same file offline, never in the runtime request path.
**Full detail: `DATA_FLOW.md` §3.** Two of the 10 authored fields
(`cross_links`, `mastery_threshold`) are parsed but never exposed past
the adapter — **PROPOSED, ADR 05**, blocked on Canonical KG v1 freeze.
The consumption gate itself (version/status/shape validation between
producer and consumer) is **PROPOSED, ADR 06**, same block condition.

### 6.5 Memory flow

LIVE (read path every turn; write path only from practice/assessment
submit routes, never the chat turn itself). Repository → `service.ts`
`aggregate()` → `LearnerMemory` → `toTeachingSnapshot()` →
`TeachingMemorySnapshot` → Teaching Engine input. Writes are idempotent
upserts to `RetentionMetric`/`ReviewSchedule` only — the only two tables
this engine writes, per Permanent Rule 14. **Full detail: `DATA_FLOW.md`
§6.** A dedicated audit of the long-term learner model — persistent vs.
short-term memory, retrieval strategy, a forgetting model, and how
evidence updates flow into it — is roadmap item #5, **ADR 10, upcoming**.

### 6.6 Evidence flow

**Partially audited; full audit deferred to ADR 10.** Two distinct,
non-unified evidence representations exist today: (a) `EvidenceRecord`
(canonical Prisma model, Learner Longitudinal State bucket), read/written
by a separate visual-mastery/intelligence-tracking subsystem
(`visuals/visualMasteryPersistence.ts`, `intelligence/improvementTracking.ts`,
and their API routes) — **not** wired into the canonical Teaching pipeline
described in §6.1–6.3; (b) `EbEvidenceEvent` (dormant `Eb*` pipeline,
write-only, fire-and-forget, the only table the experimental pipeline
writes — Permanent Rule per `DEPENDENCY_RULES.md`). These two have not
been confirmed related or unrelated by a focused audit; that audit is
explicitly scoped into ADR 10 rather than asserted here without evidence.

### 6.7 Recommendation flow

LIVE. Nine-engine Recommendation cluster, read-only over Mastery/Memory's
conclusions, never independently scoring mastery (Permanent Rule 7),
never called by/calling the Teaching tier (Permanent Rule 12).
`learningOrchestrator.ts` is the confirmed primary 8-tier cross-engine
aggregator (`DashboardV2` consumes it via `learningNavigator.ts`).
`nextBestAction.ts` is a split file — one live export
(`getChapterNextStep()`), three confirmed-dead exports (proposal to
remove them, **ADR 04, permanently unexecuted** by explicit user
instruction). A unification/strategy audit across the full cluster
(short-term recommendations, long-term plans, weakness recovery,
goal-based learning) is roadmap item #6, **ADR 11, upcoming**.

### 6.8 Visualization flow

LIVE for selection (`detectVisual()`, deterministic, keyword/subject-based,
no LLM); the Visual Type System is a leaf dependency every other engine
can call. A dedicated audit of visualization *and simulation* selection —
graphs, animations, interactive simulations, scene generation, and
rendering independence from any one provider — is roadmap item #7,
**ADR 12, upcoming**.

### 6.9 AI interaction flow

LIVE. The AI Router (`routeAI()`) is the sole call site for any LLM:
Groq primary (`openai/gpt-oss-20b`), YandexGPT fallback (Russia-only,
itself falling back to Groq on missing credentials or error). One call
per turn, no chained/agentic calls, no second LLM call to make a
decision. Receives only the already-assembled system prompt + message
history; never reads any Educational Brain engine directly (Permanent
Rules 9, 10). A dedicated roadmap audit of how to measure and reduce AI
dependency over time — promoting validated deterministic/cached assets
over fresh generation, and a knowledge-acquisition strategy that doesn't
re-derive the same explanation every time — is roadmap item #8, **ADR
13, upcoming**.

### 6.10 Scalability strategy

**LIVE characteristics, synthesized from the engines as built (no new
design yet — a dedicated cross-cutting scalability pass happens
implicitly across ADRs 08-13, each scoring its own design against
"millions of learners," per the binding ADR template):**
- The Knowledge Graph is static, file-based, process-lifetime-cached —
  reads scale with file size, not with student count, and are O(1) per
  request after first load.
- The Teaching Engine is pure with zero I/O — horizontally scales
  trivially, no shared state, no lock contention.
- Student Memory writes are idempotent upserts keyed per-student — safe
  under retries and safe to shard by `userId` if ever needed.
- The one non-deterministic, rate-limited, externally-metered component
  (the AI Router) is also the one component every other engine is
  explicitly forbidden from depending on for *decisions* — meaning an
  LLM outage degrades response *quality*, never decision *correctness*.
- Per-ADR scalability scoring to date: ADR 06's KG consumption gate is
  O(1) per subject load (validated once per process lifetime, not per
  request); ADR 07's proposed Library Mode extension reuses an existing
  per-request function with no new query pattern.
- **Not yet centrally specified:** a target learner count, a database
  sharding strategy, a caching tier strategy beyond the existing
  process-lifetime KG cache, and a load-testing plan. These gaps are
  carried in the risk register (§7) and are explicit inputs to ADR 10
  (Student Memory at scale) and ADR 13 (AI cost/dependency at scale).

### 6.11 Versioning strategy

**LIVE component:** none today — confirmed zero version gate exists
between the Curriculum Production Pipeline's `graph.json` output and the
runtime adapter (ADR 06 finding). **PROPOSED, ADR 06:** a Schema Version
Gate (major-version compatibility check) plus a Status Gate (draft vs.
frozen) sitting between producer and consumer, additive, zero changes to
existing types. **PROPOSED, ADR 07:** mastery/progression vocabularies
(`MasteryLevel`, `TrackLevel`, `LevelBand`) remain independently versioned
by scope (chapter-tier, pedagogical-tier, placement-tier) rather than
merged into one schema, bridged only by a proposed static mapping table —
this is itself a versioning decision: translate at the boundary, don't
force one vocabulary to version in lockstep with another that serves a
different purpose. **ADR numbering itself** is the versioning scheme for
this Bible's own proposals — each ADR is immutable once written; a
superseding ADR must say so explicitly (§9) rather than silently
overriding.

### 6.12 Validation strategy

**LIVE:** `npx tsc --noEmit` (typecheck gate), the offline assertion
suite (2066+ assertions, `TEST_RESULTS.md`), and the Knowledge Graph
Validator (`scripts/validate-knowledge-graph.ts`, 9 named checks,
**manual-only — confirmed zero CI wiring**, ADR 06 finding).
**PROPOSED, ADR 06:** wiring the validator into the consumption gate so
schema/status/shape problems fail loud instead of silently degrading.
**PROPOSED, ADR 07:** an equivalence-validation report specifically for
the `learningProfile.ts` consolidation (flagged as the one real
behavior-change risk in that ADR) before any future implementation turn.
Every ADR's "Validation strategy" section (per the 14-section template,
§9.5 of this Bible) is the authoritative per-proposal validation plan;
this section is the cross-cutting summary, not a replacement for them.

---

## 7. Risk register

| # | Risk | Status | Evidence | Mitigation (proposed or live) |
|---|---|---|---|---|
| R1 | Implementation begins before Canonical KG v1 is frozen, building against a moving target | Open, structurally prevented | Standing instruction: implementation blocked on explicit Curriculum Pipeline v1 freeze AND user approval | Process control, not code — every ADR states this gate explicitly |
| R2 | Constant drift: `learningProfile.ts` hardcodes `70` instead of importing `ASSESSMENT_PASS_THRESHOLD` | **Already realized in production** | ADR 07 Finding 8, `learningProfile.ts:91` | PROPOSED fix in ADR 07 extension (b), unexecuted |
| R3 | `mastery_threshold` authored with real per-concept variation (0.35–0.95) has zero runtime effect; every engine reads a flat constant instead | **Already realized in production** | ADR 05 Finding 7 | PROPOSED Phase 1/2 in ADR 05, blocked on KG v1 freeze |
| R4 | Two generations of curriculum/concept-graph representation coexist unsynchronized (file-based KG vs. `Eb*` DB tables) | Open, documented, not scheduled for resolution | Finding 5, `DATA_FLOW.md` §2 | None proposed yet — explicitly out of scope until an ADR names it |
| R5 | Dormant `Eb*` Educational Brain Decision Pipeline could silently diverge from the canonical pipeline's data model if either evolves without the other in mind | Open, low likelihood while flag stays off | `ARCHITECTURE_DECISIONS.md` Part 2 | Mitigated by strict non-dependency rule (`DEPENDENCY_RULES.md`); re-evaluate before any flag-flip |
| R6 | No CI wiring for the Knowledge Graph Validator — a malformed `graph.json` could reach runtime undetected | Open | ADR 06 finding | PROPOSED 4-part gate in ADR 06, blocked on KG v1 freeze |
| R7 | Five non-unified mastery/progression vocabularies risk further silent drift the longer they're not bridged | Open, partially mitigated by documentation | ADR 07 Finding 8 | PROPOSED mapping table, unexecuted |
| R8 | No centrally specified scalability target (learner count, sharding, caching tier) | Open | §6.10 | To be specified across ADR 10 (Memory) and ADR 13 (AI cost) |
| R9 | Evidence flow (`EvidenceRecord` vs. `EbEvidenceEvent`) not yet confirmed related or unrelated | Open, audit deferred | §6.6 | Scoped into ADR 10 |
| R10 | Two unrelated engines share the name `LessonPlan`/`buildLessonPlanBlock` — real readability hazard, no runtime collision | Open, low severity | Finding 1 | Rename recommended for a future, separately-approved cleanup phase — not scheduled |
| R11 | `nextBestAction.ts` carries three confirmed-dead exports that will never be removed (ADR 04 permanently unexecuted by explicit user instruction) | Open by design, accepted | Finding 4, ADR 04 | None — explicitly accepted as a permanent state, not a risk requiring closure |
| R12 | Teaching Action Intelligence (`decide()` → TAG → Lesson Composer) — the concrete HOW-to-teach layer — never runs for Library/general learners, though none of its three engines requires School context; the gap is an unseeded piece of session state, not a designed boundary | **Already realized in production** | ADR 08 Finding 9 (`ARCHITECTURE_DECISIONS.md`) | PROPOSED Library-mode seed-and-persist extension in ADR 08 §4(a), blocked on KG v1 freeze |
| R13 | Dynamic Lesson Composer recomputes the full stage sequence from stage 1 every turn — no persisted cross-turn continuity, despite its own rendered prompt text framing it as a "multi-turn pacing guide" | **Already realized in production** | ADR 09 Finding 10 (`ARCHITECTURE_DECISIONS.md`) | PROPOSED `contextSnapshot.lessonStageProgress` + tag-based continuity extension in ADR 09 §4, blocked on KG v1 freeze |

---

## 8. Architecture glossary

- **Canonical Knowledge Graph (KG)** — the per-subject `graph.json` file,
  10-field schema, authored exclusively by the external Curriculum
  Production Pipeline, treated as an immutable runtime asset.
- **`ConceptNode`** — the frozen Teaching Engine's knowledge-graph input
  type, produced by the Generic Subject Adapter.
- **Teaching Engine** — `src/lib/teaching-engine/index.ts`'s `decide()`,
  frozen, pure, zero I/O. The one engine everything else depends on.
- **`TeachingDecision`** — the Teaching Engine's frozen 6-field output
  (goal/mode/action/difficulty/estimated_time/+1).
- **TAG (Teaching Action Generator)** — consumes a `TeachingDecision`,
  produces a `TeachingAction`; never re-decides.
- **Dynamic Lesson Composer** — consumes `TeachingDecision` +
  `TeachingAction`, produces a `LessonPlan` (stage sequence); never
  generates content, only templates.
- **Student Memory Engine** — sole owner/aggregator of longitudinal
  learner state; sole writer of `RetentionMetric`/`ReviewSchedule`.
- **`MasteryLevel`** — Mastery Intelligence's 4-value chapter-scoped
  classification (`TRUE_MASTERY | DEVELOPING | FALSE_MASTERY | AT_RISK`).
  Designated canonical mastery representation, ADR 07.
- **`TrackLevel`** — the Teaching Engine's frozen 5-tier pedagogical
  progression vocabulary (`T0`–`T4`).
- **`LevelBand`** — the goal/placement subsystem's 6-tier enum
  (`COMPLETE_BEGINNER`…`EXPERT`), unrelated to `TrackLevel`/`MasteryLevel`
  today.
- **School Mode / Library Mode** — the two session contexts. School Mode
  is board/grade/chapter-coupled (`schoolCtx` gate in
  `api/learn/chat/route.ts`); Library Mode is the general/subject-only
  chat path. Several engines (Teaching Strategy, Spaced Revision, Lesson
  Planner — ADR 02) already run in both; Mastery Intelligence does not
  yet (ADR 07 proposes extending it).
- **AI Router** — `src/lib/ai/router.ts`'s `routeAI()`, the only
  probabilistic component in the system; one LLM call per turn.
- **`Eb*` pipeline / Educational Brain Decision Pipeline** — the
  experimental, flag-gated (`ENABLE_EDUCATIONAL_BRAIN_PIPELINE`, default
  off), fire-and-forget, never-awaited second pipeline. Dormant — never
  executes against live traffic unless explicitly enabled.
- **ADR (Architecture Decision Record)** — a proposal-only document under
  `docs/architecture/ADR_NN_*.md`, following the binding template (§9.5);
  never implemented without explicit approval and the Canonical KG v1
  freeze.
- **Permanent Rule** — one of the 15 numbered rules in
  `ARCHITECTURE_DECISIONS.md` Part 1; describes existing discipline the
  code already follows, not a new restriction.
- **Finding** — a documented architectural observation (naming overlap,
  duplication, drift, fragmentation) recorded in
  `ARCHITECTURE_DECISIONS.md` Part 3; documented, not necessarily fixed.

---

## 9. ADR index

| ADR | Title | Status | One-line finding |
|---|---|---|---|
| ADR 02 | General Learner Diagnostic Layer | **Executed** | Extended `teachingStrategy`/`spacedRevision`/`lessonPlanner` to Library Mode (unused board/grade params were the evidence pattern) |
| ADR 03 | Retire Orphaned Teaching Action Engine | **Executed** | Deleted confirmed-dead `teachingActionEngine.ts`/`teachingActionSchema.ts`; content layer (`teachingAssets.ts` family) left intact |
| ADR 04 | Next-Best-Action Retirement Proposal | **Proposal, permanently unexecuted** (explicit user instruction) | 3 of 4 `nextBestAction.ts` exports confirmed dead; documentation-only is the final state |
| ADR 05 | Knowledge Graph Consumption Architecture | **Proposal, blocked on KG v1 freeze** | `cross_links`/`mastery_threshold` parsed but never exposed past the adapter |
| ADR 06 | KG Consumption Pipeline | **Proposal, blocked on KG v1 freeze** | Zero version/status/shape gate exists between Curriculum Pipeline output and the runtime adapter |
| ADR 07 | Mastery Intelligence Architecture | **Proposal, blocked on KG v1 freeze** | Five non-unified mastery/progression representations; `MasteryLevel` designated canonical |
| ADR 08 | Teaching Action Intelligence (roadmap 3/8) | **Proposal, blocked on KG v1 freeze** | The concrete Action layer (`decide()`→TAG→Composer) is School-Mode-only in practice despite being mode-agnostic by construction; Library extension proposed, Posture/Action layer relationship formalized |
| ADR 09 | Dynamic Lesson Composition (roadmap 4/8) | **Proposal, blocked on KG v1 freeze** | `composeLessonPlan()` has zero persisted cross-turn stage continuity; proposes generalizing the proven Worked Examples tag-emit/parse/persist/resume pattern via `contextSnapshot.lessonStageProgress` + a `planSignature` continuation/replan fingerprint |
| ADR 10 | Student Memory Evolution (roadmap 5/8) | Not started | — |
| ADR 11 | Recommendation Intelligence (roadmap 6/8) | Not started | — |
| ADR 12 | Visualization & Simulation Architecture (roadmap 7/8) | Not started | — |
| ADR 13 | AI Independence Roadmap (roadmap 8/8) | Not started | — |

**Template note:** ADRs 02–07 were written under the prior 13-section
template (`Chosen architecture`, no standalone Teaching Engine section).
ADR 08 onward use the current binding 14-section template: Problem,
Evidence, Alternative designs, Selected design, Trade-offs, Scalability,
AI independence impact, Backward compatibility, Validation strategy,
Migration strategy, Relationship to previous ADRs, Relationship to the
Canonical Knowledge Graph, Relationship to the Teaching Engine, Future
implementation plan. This is a template upgrade, not new evidence against
ADRs 02–07 — none of them are superseded by this note alone.

---

## 10. Roadmap status

4 of 8 items complete (specification-only, per the standing
implementation-blocked rule):

1. KG Consumption Pipeline — **DONE**, ADR 06
2. Mastery Intelligence Architecture — **DONE**, ADR 07
3. Teaching Action Intelligence — **DONE**, ADR 08 (Action layer is
   School-Mode-only in practice; Library extension + Posture/Action
   relationship proposed, not implemented)
4. Dynamic Lesson Composition — **DONE**, ADR 09 (Lesson Composer has no
   cross-turn stage continuity; tag-based continuity extension proposed,
   not implemented)
5. Student Memory Evolution — **next**
6. Recommendation Intelligence — not started
7. Visualization & Simulation Architecture — not started
8. AI Independence Roadmap — not started

When all 8 are complete, the next and final deliverable is the
**Architecture Completion Report** (Bible summary, full ADR index,
architecture summary, engine dependency map, remaining implementation
work, known risks, readiness assessment, final recommendation) — not due
yet.

---

## 11. Document map

| Document | Role relative to this Bible |
|---|---|
| `EDUCATIONAL_BRAIN_BIBLE.md` (this file) | Top-level synthesis, single source of truth, entry point |
| `EDUCATIONAL_BRAIN_V1.md` | Detailed freeze narrative + system diagram this Bible's §3/§5 summarize |
| `ENGINE_REFERENCE.md` | Full per-engine contract detail behind this Bible's §3/§4 |
| `DATA_FLOW.md` | Full step-by-step trace behind this Bible's §6.1–6.6 |
| `DEPENDENCY_RULES.md` | Full may-read/must-not-call matrix behind this Bible's §4/§5 |
| `EXTENSION_GUIDE.md` | How-to recipes for extending without drift — unchanged, still authoritative |
| `ARCHITECTURE_DECISIONS.md` | Permanent rules + findings ledger behind this Bible's §2/§7 |
| `ADR_NN_*.md` | Individual proposals indexed in this Bible's §9 |
| `docs/project-memory/PROJECT_STATE.md` | Session-by-session execution log (process record, not architecture) |

---

## 12. Change log of this Bible

- **2026-06-30 — created.** Established as the single living master
  document per binding user directive, consolidating `EDUCATIONAL_BRAIN_V1.md`
  + companions into one top-level synthesis and adding the cross-cutting
  sections that didn't exist anywhere yet (scalability strategy,
  versioning strategy, validation strategy, risk register, glossary, ADR
  index). No production code changed. Supersedes `EDUCATIONAL_BRAIN_V1.md`
  as the canonical entry point; `EDUCATIONAL_BRAIN_V1.md` remains valid as
  detail-layer content, not superseded in substance.
- **2026-06-30 — updated for ADR 08 (Teaching Action Intelligence).**
  §3 engine map rows #10-12 and #15 updated to record that the Action
  layer (`decide()` → TAG → Dynamic Lesson Composer) is mode-agnostic by
  construction but School-Mode-only in practice (also corrects a
  pre-existing inaccuracy in row #12, which previously read "LIVE, both
  modes"); §6.2 gains a new paragraph tracing the root cause to the single
  unseeded `currentConceptNodeId` write site; §7 risk register gains R12;
  §9 ADR index updated for ADR 08; §10 roadmap status moved to 3 of 8. No
  production code changed.
- **2026-06-30 — updated for ADR 09 (Dynamic Lesson Composition).** §3
  engine map row #12 updated to record that the Composer recomputes from
  stage 1 every turn with no cross-turn continuity; §6.2 gains a new
  paragraph naming the gap and the proposed generalization of the proven
  Worked Examples tag-emit/parse/persist/resume pattern; §7 risk register
  gains R13; §9 ADR index updated for ADR 09; §10 roadmap status moved to
  4 of 8. No production code changed.
