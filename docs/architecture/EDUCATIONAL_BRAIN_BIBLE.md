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
9. §10 — v1.0 completion criteria, the Gap Analysis gate, and roadmap status.
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
| 6 | Student Memory Engine | Memory | `memory/{repository,service,update-pipeline,types}.ts` | LIVE | ADR 10 (six-store taxonomy proposed: Session/Student/Knowledge/Teaching/Brain/Long-term; `ConceptMasteryRecord` + `BrainConfig` tables proposed; single-writer ownership rule formalized) |
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
| 23 | Learning Orchestrator | Recommendation | `learningOrchestrator.ts` | LIVE, cross-session planner (School Mode only); Library Mode variant proposed ADR 11 | ADR 04, ADR 11 |
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
| 36 | Visualization Decision Engine | Visual | `teaching/visualizationDecision.ts` | LIVE — decides whether to attempt a visual this turn (parametric-scene vs. legacy-visual vs. none) | — |
| 37 | Deterministic Scene Builder | Visual | `teaching/buildSceneSpec.ts` | LIVE — keyword-based heuristic that builds a `SceneSpec` without an LLM call; first fallback when Scene Router returns null | — |
| 38 | Scene Spec Router | Visual | `teaching/sceneGenerators/sceneRouter.ts` | LIVE (flag-gated: `ENABLE_PARAMETRIC_SCENE_GENERATION`); routes a cleaned AI response text to the first matching per-concept-type generator via keyword rules | — |
| 39 | Parametric Scene Generators (×29) | Visual | `teaching/sceneGenerators/{projectile,triangle,molecule,vector,circular,pendulum,electron_shells,lattice,collision,ray_optics,historical_timeline,economics_curves,calculus_graph,civics_org_chart,electric_circuit,kinematics_graphs,heights_and_distances,demographic_pyramid,coordinate_geometry_line,punnett_square,torque_diagram,gravitation_orbit,statistics_bar_chart,ecological_pyramid,logic_gate,er_diagram,periodic_trends,cell_division,dna_structure}.ts` | LIVE (same flag as #38); each generator: extract(LLM) → build(deterministic formula) → validate → consistency-check | — |
| 40 | AI Scene Generator | Visual | `teaching/generateSceneSpec.ts` | DORMANT (flag-gated: `ENABLE_AI_SCENE_GENERATION`; off by default); LLM-authored `SceneSpec` path, used when neither #37 nor #38-39 produce a result | — |
| 41 | Scene Spec Validator | Visual | `teaching/sceneSpecValidator.ts` | LIVE — structural validation of `SceneSpec` JSON; used by all three scene-generation paths (#38–40) and the Router (#38) | — |
| 42 | Dynamic Visualization Engine | Visual | `teaching/visuals/generateVisualizationCode.ts` | DORMANT (flag-gated: `ENABLE_DYNAMIC_VISUALIZATION`; off by default); LLM-authors a React component string (3D Three.js primary, 2D recharts fallback); sandboxed iframe renderer; **violates Permanent Rule 9 when enabled** (second LLM call per turn; see ADR 12) | ADR 12 |

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
dependency: everything calls into it, it calls into nothing. Comprises
two sub-clusters: (a) the legacy Visual Type System (`detectVisual.ts` /
`visualTypes.ts`, Engine 32) that detects whether a legacy `VisualSpec`
applies, and (b) the Scene Generation cluster (Engines 36-41) that
produces a typed `SceneSpec` via three cascading paths: parametric
generator (keyword-routed, 29 per-concept-type generators, flag-gated by
`ENABLE_PARAMETRIC_SCENE_GENERATION`), deterministic heuristic fallback
(`buildSceneSpec.ts`), and AI-authored fallback (`generateSceneSpec.ts`,
flag-gated by `ENABLE_AI_SCENE_GENERATION`). Both flags are off by
default; the deterministic heuristic always runs.

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
§6.**

**ADR 10 finding (Student Memory Architecture, roadmap item #5 — DONE):**
the current codebase has at least eight distinct memory surfaces
(`TopicProgress`, `RetentionMetric`, `ReviewSchedule`, `MistakeRecord`,
`LearningProfile`, `LearnSession`, `Message`, `contextSnapshot`) with no
common contract and no consistent single-writer ownership — `TopicProgress`
has four known writers and is the most bug-prone; `RetentionMetric`/
`ReviewSchedule` enforce single-writer ownership (Permanent Rule 14) and
are the most reliable. The live code also conflates *best-ever mastery*
with *current retention* using a single flat `masteryPct < 70` threshold
(`memory/types.ts:9`). **PROPOSED, ADR 10:** six formally owned memory
stores — (1) **Session Memory** (`contextSnapshot` JSONB, Redis TTL,
per-turn typed `SessionMemory` schema with `currentConceptId`,
`lessonStageProgress`, `pendingProbeId`, `activeMisconceptionsThisSession`,
etc.), (2) **Student Memory** (Postgres, forever, new `ConceptMasteryRecord`
table: `masteryScore`, `decayedScore = masteryScore × exp(-Δt/halfLife)`,
`masteryConfidence`, `masteryLevel`, `lastProbeOutcome`, `sampleSize`;
`ActiveMisconception` table replacing scattered `MistakeRecord` reads),
(3) **Knowledge Memory** (KG read-only, ADR 06), (4) **Teaching Memory**
(Evidence Engine writes, ADR 13), (5) **Brain Memory** (`BrainConfig`
versioned config store replacing all hardcoded policy constants:
`masteryThresholds`, `strategySignalWeights`, `visualPolicyByStrategy`,
`probeTargetFrequency`), (6) **Long-term Memory** (cold Parquet storage,
Phase 3). Single-writer ownership is the architectural invariant: only
one component may write each table; readers are many. Mastery update
formula: `masteryScore += step × probeDifficulty × (1 − masteryScore)`
(correct); `masteryScore −= step × masteryScore` (incorrect). All blocked
on KG v1 freeze + explicit approval, same governance gate as ADR 06–09.

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
`nextBestAction.ts` is a split file — one live export
(`getChapterNextStep()`), three confirmed-dead exports (proposal to
remove them, **ADR 04, permanently unexecuted** by explicit user
instruction).

**ADR 11 finding (Recommendation Intelligence, roadmap item #6 — DONE):**
the nine live recommendation engines serve two structurally distinct
purposes never formally distinguished: (a) **Cross-session planning**
(`learningOrchestrator.ts`, 8-priority chain, returns ONE recommendation,
consumed by `DashboardV2` via `learningNavigator.ts`) and (b) **In-session
signal injection** (`weakTopics`, `learningNarrative`, `dailyPlan`,
`examReadiness`, independently injected into `systemPrompt` with no
reconciliation). The in-session path is blind to conflicts: a
`RAPID_IMPROVEMENT` narrative and a `weak_topic` signal for the same
topic can simultaneously appear in the system prompt — the LLM must
resolve the contradiction, which is a pedagogical decision that belongs
in the deterministic Brain. Library Mode has no recommendation tier: only
a pre-aggregated `subjectAnalytics.weakTopics` string at route.ts:1099,
versus five engine calls in School Mode. **PROPOSED, ADR 11:** Two-layer
Recommendation Architecture — (1) Cross-Session Planner preserves the
existing 8-priority chain (School Mode) and adds a new subject-only
`getTopLibraryRecommendation()` function (Library Mode, reads the
already-computed `TeachingMemorySnapshot`, zero new DB queries); (2)
Session Recommendation Reconciler (new pure function) applies a
deterministic **signal priority table** (`BrainConfig`-owned) to suppress
conflicting signals before `systemPrompt +=`, capping at
`maxSessionSignals` (default 3). Signal suppression is auditable via the
`suppressedBy` field. Evidence Engine hook (ADR 13) will add an
`assetEffectivenessSignal` gate: if the current approach is not working,
the Reconciler switches from "revisit" to "try a different approach"
rather than more of the same. All blocked on KG v1 freeze + approval.

### 6.8 Visualization flow

LIVE across seven confirmed pathways (Engines 32, 36-42). The Visual tier
is a leaf dependency: everything calls into it, it calls into nothing.

**ADR 12 finding (Visualization & Simulation Architecture, roadmap item
#7 — DONE):** seven competing visual-generation pathways run with no
unified ranking model, no evidence-based selection, and two confirmed
architectural violations: (a) **P2 violation** — no concept-keyed
persistent cache exists; every turn re-generates the same visual for a
popular concept (`VisualizationCache` at `teaching/visuals/visualizationCache.ts`
keys on generated-text hash, not on `conceptId`); (b) **Permanent Rule 9
violation when enabled** — `generateVisualizationCode.ts` (Engine 42)
calls `generateAIResponse()` inline per turn when
`ENABLE_DYNAMIC_VISUALIZATION` is true, making the Dynamic Visualization
Engine a second probabilistic component in the per-turn path; (c) **two
uncoordinated visual decision points** — the Teaching Engine's
`TeachingDecision.visual_type` (pre-LLM, ADR 08) and
`visualizationDecision.ts`'s post-hoc `VisualCategory` classification are
independent; code order determines which wins. **PROPOSED, ADR 12:**
Visual Asset Model with typed renderers (`katex | scene_spec | visual_spec |
dynamic_component | animation | interactive_widget`) and two authoring
layers — (a) Retrieval layer (per-turn, O(1)): concept-keyed
`VisualizationCache` lookup by `(conceptId, renderer, language, gradeBand)`;
(b) Authoring layer (background/once-per-concept): deterministic paths
synchronous, LLM-authoring paths offline so that zero extra LLM calls
occur per turn after first-time authoring. Visual Policy table
(BrainConfig, ADR 10) maps `TeachingDecision.visual_type` → accepted
renderers in priority order; `visualizationDecision.ts` (Engine 36)
demoted to observability/logging. Every `VisualAsset` carries mandatory
`a11yDescription` (empty string fails Layer 1 validation). Parametric
`extract()` sub-call moved to authoring layer (extracted parameters
stored in `VisualAsset.specPayload`, zero extraction cost on repeat
turns for same concept). All blocked on KG v1 freeze + approval.

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
| R9 | Evidence flow (`EvidenceRecord` vs. `EbEvidenceEvent`) not yet confirmed related or unrelated | **Partially resolved, ADR 10** — audit confirmed both are in Prisma schema; `EvidenceRecord` consumed by visual-mastery subsystem (not the canonical Teaching pipeline); `EbEvidenceEvent` is dormant Eb* only; full reconciliation deferred to ADR 13 (Evidence Engine) | §6.6, ADR 10 §5 | Scoped into ADR 13 |
| R14 | `TopicProgress` multi-writer migration risk: migrating four known writers to `ConceptMasteryRecord` single-writer ownership is the highest-risk phase of ADR 10; a partially-migrated state (some writers on old table, some on new) could produce split-brain mastery reads | Open, gated | ADR 10 §10 (Migration Strategy §2c) | 4-phase additive migration (add → migrate readers → migrate writers → deprecate): never cut over atomically; canonical fallback is whichever table has a value; `masteryConfidence = 0.0` flags old-table-derived scores during transition |
| R15 | In-session signal conflicts are currently resolved by the LLM (probabilistic), not by the Brain (deterministic); a `RAPID_IMPROVEMENT` narrative and a `weak_topic` signal for the same concept can both appear in the system prompt with no priority guarantee — which one the LLM weights is non-deterministic | **Already realized in production** | ADR 11 §2 | PROPOSED Session Recommendation Reconciler (ADR 11 §4.2): deterministic signal priority table + `suppressedBy` audit field; `maxSessionSignals = 3` cap (BrainConfig-owned); blocked on KG v1 freeze |
| R16 | `generateVisualizationCode.ts` makes a second LLM call per turn when `ENABLE_DYNAMIC_VISUALIZATION` is true — a Permanent Rule 9 violation (the AI Router must be the only probabilistic component); the flag is off by default but the risk is latent in any deployment that enables it | Open, flag-gated | ADR 12 §2, route.ts:17+1597 | PROPOSED in ADR 12 §4.4: move all visual LLM calls to background authoring tasks; per-turn path serves only cached `VisualAsset` records after first-time authoring; blocked on KG v1 freeze |
| R17 | KG concept slug rename would invalidate `VisualizationCache` entries keyed on `conceptId` without a migration step; orphaned cache rows would be served for renamed concepts | Open, deferred | ADR 12 §12 | KG version gate (ADR 06) must trigger a cache migration (not just invalidation) for affected conceptIds; migration strategy to be specified in ADR 12's future implementation plan |
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
| ADR 10 | Student Memory Architecture (roadmap 5/8) | **Proposal, blocked on KG v1 freeze** | Eight fragmented memory surfaces with no common contract and four writers to `TopicProgress`; `masteryPct < 70` conflates mastery and retention; proposes six formally owned stores with single-writer invariant, `ConceptMasteryRecord` (mastery/decay split), `BrainConfig` (versioned policy constants), and a 4-phase additive migration |
| ADR 11 | Recommendation Intelligence (roadmap 6/8) | **Proposal, blocked on KG v1 freeze** | In-session signal injection has no reconciliation layer — conflicting signals (weak topic vs. improvement narrative for same concept) are handed to the LLM; Library Mode has no recommendation tier; proposes a two-layer architecture (Cross-Session Planner + Session Recommendation Reconciler) with a deterministic signal priority table and Library Mode parity |
| ADR 12 | Visualization & Simulation Architecture (roadmap 7/8) | **Proposal, blocked on KG v1 freeze** | Seven competing visual-generation pathways with no unified ranking; P2 violation (no concept-keyed cache); Permanent Rule 9 violation when `ENABLE_DYNAMIC_VISUALIZATION` is true; two uncoordinated visual decision points; proposes Visual Asset Model (typed renderers, concept-keyed cache, background authoring for all LLM visual calls, mandatory a11y, Visual Policy from BrainConfig) |
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

## 10. v1.0 completion criteria & roadmap discipline

**Superseded note:** this section previously tracked a fixed 8-item
roadmap ("KG Consumption Pipeline" through "AI Independence Roadmap"),
each item assumed to require exactly one ADR. That assumption is
**retired as of 2026-06-30 (Gap Analysis Discipline directive)**. The
objective is no longer "produce 8 ADRs" — it is **finish Educational
Brain Architecture v1.0**, defined by the 15-item completion criteria in
§10.2 below. Some criteria are already satisfied by existing engines/ADRs
with no further work needed; some require consolidation/cross-referencing
rather than a new document; only the remainder require a new ADR. ADRs
06-09 (the first four items below) were produced before this discipline
existed and are retroactively confirmed to have passed the gate (each
addressed a capability with no prior coverage and material redesign risk
if undocumented) — they are not retracted.

### 10.1 The Architecture Gap Analysis gate (binding, applies to every future ADR)

Before creating any new ADR, answer three questions in writing, with
evidence (file paths, grep results, existing Bible/ADR citations — not
assertion):

1. **Is there a major architectural capability still required** for the
   Educational Brain to function as a complete world-class teaching
   system?
2. **Is this capability fundamental enough** that implementation would be
   significantly harder, or would risk a redesign, if attempted without
   documenting it first?
3. **Is this capability not already fully covered** by the Educational
   Brain Bible, an existing ADR, or any other architecture document in
   the repository (e.g. `docs/educational-brain/*`, `EXTENSION_GUIDE.md`)?

**A new ADR may be written only if all three answers are YES.**
Otherwise: do not create an ADR. Instead, update the Bible, consolidate
existing architecture, eliminate duplication, cross-reference related
systems, and strengthen implementation guidance. Discussability is not a
gate criterion — a topic that could be discussed is not, on its own,
reason to write an ADR about it.

### 10.2 v1.0 completion criteria (supersedes the old 8-item roadmap)

| # | Capability | Status | Coverage |
|---|---|---|---|
| 1 | Canonical Knowledge Graph consumption | **DONE** | ADR 06 |
| 2 | Mastery Intelligence | **DONE** | ADR 07 |
| 3 | Teaching Action Intelligence | **DONE** | ADR 08 |
| 4 | Dynamic Lesson Composition | **DONE** | ADR 09 |
| 5 | Student Memory | **→ ADR 10** | §6.5, `docs/educational-brain/05-memory-system.md` — live code has 8+ fragmented memory surfaces with no common contract; redesign risk is high without formal design |
| 6 | Recommendation Intelligence | **→ ADR 11** | §6.7, Engines 22-31 live — 9 engines exist but no formal design for cross-engine coordination, Library-mode extension, or evidence-signal integration |
| 7 | Visualization & Simulation Architecture | **→ ADR 12** | §6.8, Engines 32,36-41 now in §3 — live code but never architecturally designed; was "upcoming" in Engine 32 row |
| 8 | Assessment & Mastery Validation | **CONSOLIDATE §6.11** | Engines 8-9 (live), ADR 07 — live assessment architecture works; gaps are documentation only, not design risk |
| 9 | Evidence Engine | **→ ADR 13** | §6.6, `docs/educational-brain/04-evidence-engine.md` — the core improvement loop (EvidenceEvent→rolling window→nightly rollup→asset ranking) has no ADR; implementing without architecture risks an ad-hoc feedback mechanism |
| 10 | AI Independence Strategy | **CONSOLIDATE §6.9** | P1-P10 principles in `docs/educational-brain/README.md` — philosophy clear, no novel design decisions; fold into §2 + §6.9 |
| 11 | Curriculum Mapping Strategy | **CONSOLIDATE §6.4** | Engine 1 (Curriculum Authority Brain, live); §6.4 covers the KG→runtime path; strengthen §6.4 with board/grade→concept mapping description |
| 12 | Knowledge Asset Lifecycle | **→ ADR 14** | `docs/educational-brain/01-knowledge-assets.md` — the foundational data model for Phase 2 (AssetIdentity, three families, versioning, validation, ranking, deprecation) has no ADR; foundational to items 5, 7, 9 implementation |
| 13 | Scalability Strategy | **CONSOLIDATE §6.10** | §6.10 partially specified; ch09 (`docs/educational-brain/`) provides detail; fold key decisions into §6.10 |
| 14 | Validation & Quality Assurance | **CONSOLIDATE §6.12** | §6.12 partially specified; P10 principle + existing validators provide the pattern; no novel design required |
| 15 | Implementation Governance | **CONSOLIDATE §10.1** | §10.1 has the Gap Analysis gate; CLAUDE.md has Chief Architect rules; consolidate into one place |

**Gap Analysis complete (2026-07-02) — evidence per item:**

*Items 5, 6, 7, 9, 12 → new ADR warranted (all three gate questions YES):*
- **5 Student Memory**: (1) YES — a learner who "resumes where they left off"
  in the wrong chapter IS a live, visible failure class; (2) YES — the current
  codebase has 8+ independent memory surfaces (`Profile`, `LearningProfile`,
  `TopicProgress`, `RetentionMetric`, `MistakeRecord`, `LearnSession`,
  `Message`, `VisualizationCache`) with no common contract and multiple
  writers to each; `docs/educational-brain/05-memory-system.md` formally
  names this exact bug class; implementing Phase 2 cross-turn state without
  a unified design will propagate all 8 existing problems; (3) YES — §6.5
  is two sentences; no ADR exists for memory architecture.
- **6 Recommendation Intelligence**: (1) YES — recommendations across
  sessions are essential to a complete tutoring system; (2) YES — 9 live
  engines with no designed coordination contract; `learningOrchestrator.ts`
  aggregates them by heuristic, not by a formal priority model; Library-mode
  extension strategy has never been designed; (3) YES — §6.7 is thin; row
  23 notes "ADR 11 upcoming."
- **7 Visualization & Simulation Architecture**: (1) YES — visual
  representation is a primary teaching modality; (2) YES — 6 engine rows
  just added to §3 (Engines 36-41) that have never been formally designed as
  a tier; how parametric/deterministic/AI paths relate, how they evolve
  toward Knowledge Asset Visual family, and what the coverage extension
  strategy is — none documented; row 32 noted "ADR 12 upcoming"; (3) YES —
  §6.8 doesn't yet exist in full; no ADR covers this.
- **9 Evidence Engine**: (1) YES — the quality-improvement feedback loop is
  what makes the Brain get better over time, not just more complex; (2) YES
  — `EvidenceRecord` table exists in Prisma (line 380) but its consumer is
  unimplemented; `EbEvidenceEvent` (the dormant `educationalBrain/*`
  pipeline) is a different, incompatible event schema; building the live
  Evidence Engine without architecture risks a third incompatible
  implementation; `docs/educational-brain/04-evidence-engine.md` provides a
  complete spec (event categories, rolling-window aggregator, nightly rollup,
  bias prevention, A/B experiments, curator triggers) — all unreconciled with
  the live `EvidenceRecord`; (3) YES — §6.6 is thin; no ADR.
- **12 Knowledge Asset Lifecycle**: (1) YES — the asset model is the
  foundational data layer for Phase 2 content serving; (2) YES — items 5, 7,
  9 all depend on the asset model schema (AssetIdentity, three families,
  versioning, ranking); designing them without this foundation risks cascading
  schema changes; (3) YES — ADR 06 covers only the consumption-side KG gate;
  `docs/educational-brain/01-knowledge-assets.md` provides the full asset
  lifecycle design but it is not an accepted ADR.

*Items 8, 10, 11, 13, 14, 15 → Bible consolidation only (gate not fully met):*
- **8 Assessment**: ADR 07 covered mastery; Engines 8-9 live and working;
  Q2 fails — implementing without further design is low risk; consolidate
  §6.11.
- **10 AI Independence**: P1-P10 principles are clear philosophy, not design
  decisions; Q2 fails — no implementation risk from omitting; consolidate
  §2/§6.9.
- **11 Curriculum Mapping**: Engine 1 (Curriculum Authority Brain) live and
  working; §6.4 covers the flow; Q2 fails; strengthen §6.4.
- **13 Scalability**: ch09 provides the strategy; Q2 fails — scaling is a
  Phase 3 concern; consolidate §6.10.
- **14 Validation & QA**: P10 + existing validators provide the pattern; Q2
  fails; consolidate §6.12.
- **15 Governance**: §10.1 + CLAUDE.md Chief Architect rules are already in
  place; Q2 fails; consolidate §10.1.

When all 15 items read **DONE**: freeze Educational Brain Architecture
v1.0, mark any remaining ADR ideas as future enhancements (not v1
requirements), produce the final Bible, and produce the final
**Architecture Completion Report** (Executive Summary, Bible, Architecture
Overview, Complete Engine Map, Component Responsibilities, System
Interactions, Decision/Knowledge/Memory/Teaching/Evidence/AI Interaction
Flows, ADR Index, Remaining Implementation Work, Known Risks, Readiness
Assessment) — not due yet.

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
| `docs/educational-brain/README.md` + `01-15-*.md` (11 chapters) | **Phase 2 implementation blueprint** — written 2026-06-29, status "Phase 1 design only, no production code until approval." Not superseded; not conflicting. Treats the current `route.ts` pipeline as input and proposes formalizing it into a 10-stage typed pipeline (`TurnContext` object) with: Knowledge Asset model (Explanation/Visual/Probe families, persisted/versioned/ranked), Evidence Engine (event log → rolling windows → nightly rollup), six Memory stores (Session/Student/Knowledge/Teaching/Brain/Long-term), and an AI Independence strategy (P1-P10 principles). Relationship to this Bible: detail documents for completion-criteria items 5 (ch 05), 7 (ch 08), 9 (ch 04), 10 (ch 06), 12 (ch 01, 07). Gap Analysis gate must be applied per item before each becomes a new ADR or Bible-consolidation task. |

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
- **2026-06-30 — Architecture Gap Analysis Discipline established
  (binding permanent rule).** §10 rewritten: the fixed 8-item
  one-ADR-per-item roadmap is retired in favor of a 15-item v1.0
  completion-criteria checklist, gated by a mandatory 3-question
  Architecture Gap Analysis before any future ADR (capability still
  required? fundamental enough to risk redesign if undocumented? not
  already covered?) — a new ADR may only be written if all three are
  YES; otherwise the work is Bible consolidation, not a new document.
  ADRs 06-09 retroactively confirmed to satisfy the gate, not retracted.
  Also discovered, mid-session, a pre-existing 11-chapter proposal
  document set (`docs/educational-brain/*`, dated 2026-06-29, never
  indexed into this Bible) covering ground overlapping 5 of the 15
  completion-criteria items, plus a live scene-generation/simulation
  subsystem (`src/lib/teaching/sceneGenerators/*`, ~7600 lines) absent
  from §3's engine map. Both are flagged "reconciliation pending" in
  §10.2; a background audit is in progress and this entry will be
  superseded by a follow-up change-log entry once it completes. No
  production code changed.
- **2026-07-02 — Reconciliation complete: docs/educational-brain/* and
  sceneGenerators/* now indexed.** §3 engine map gains 6 new rows
  (Engines 36-41) for the Scene Generation cluster: Visualization Decision
  Engine (`teaching/visualizationDecision.ts`, LIVE), Deterministic Scene
  Builder (`teaching/buildSceneSpec.ts`, LIVE), Scene Spec Router
  (`teaching/sceneGenerators/sceneRouter.ts`, LIVE flag-gated), Parametric
  Scene Generators ×29 (`teaching/sceneGenerators/*.ts`, LIVE flag-gated),
  AI Scene Generator (`teaching/generateSceneSpec.ts`, DORMANT), and Scene
  Spec Validator (`teaching/sceneSpecValidator.ts`, LIVE). §4 Visual-tier
  description expanded to describe both sub-clusters. §10.2 all five
  "reconciliation pending" items resolved — `docs/educational-brain/*`
  determined to be a complementary Phase 2 implementation blueprint: not
  superseded, not conflicting; ch03 Decision Pipeline explicitly treats the
  live `route.ts` as input; the proposed Knowledge Asset model is the
  content-layer refinement the live chain is designed to eventually serve.
  §11 Document Map gains an entry for `docs/educational-brain/*` with
  resolved status. No production code changed.
- **2026-07-02 — Architecture Gap Analysis complete (items 5-15).** §10.2
  Gap Analysis verdict recorded with cited evidence for every remaining
  completion-criteria item. Result: 5 new ADRs warranted (ADR 10 Student
  Memory, ADR 11 Recommendation Intelligence, ADR 12 Visualization &
  Simulation Architecture, ADR 13 Evidence Engine, ADR 14 Knowledge Asset
  Lifecycle); 6 items require Bible consolidation only (§6.11 Assessment,
  §2/§6.9 AI Independence, §6.4 Curriculum Mapping, §6.10 Scalability,
  §6.12 Validation & QA, §10.1 Governance). The ADR 12 and ADR 13
  upcoming-labels on Engine rows 32 and 33 in §3 are superseded by this
  renumbering. No production code changed.
- **2026-07-02 — Updated for ADR 10 (Student Memory Architecture, roadmap
  5/8).** §3 engine map row #6 updated from "ADR 10 upcoming" to full
  finding summary (six stores, `ConceptMasteryRecord`, `BrainConfig`,
  single-writer invariant). §6.5 Memory flow expanded with ADR 10's
  six-store taxonomy, mastery update formula, and `decayedScore` definition
  (replacing the prior two-sentence stub and "ADR 10 upcoming" note).
  §7 risk register: R9 partially resolved (evidence-flow audit scoped into
  ADR 13 rather than ADR 10 once confirmed), R14 added (TopicProgress
  multi-writer migration risk, mitigation: 4-phase additive migration with
  `masteryConfidence = 0.0` flag during transition). §9 ADR index row for
  ADR 10 updated from "Not started" to "Proposal, blocked on KG v1 freeze"
  with one-line finding. No production code changed.
- **2026-07-02 — Updated for ADR 12 (Visualization & Simulation Architecture,
  roadmap 7/8).** §3 engine map gains Engine 42 (Dynamic Visualization Engine,
  `teaching/visuals/generateVisualizationCode.ts`, DORMANT flag-gated, with
  explicit Permanent Rule 9 violation note). §6.8 Visualization flow expanded
  with full ADR 12 finding (seven pathways, P2 violation, Permanent Rule 9
  violation, two-decision-point problem) and Visual Asset Model proposal. §7
  risk register gains R16 (Permanent Rule 9 violation when flag is enabled)
  and R17 (KG slug rename breaks concept-keyed cache). §9 ADR index row for
  ADR 12 updated to "Proposal, blocked on KG v1 freeze." No production code
  changed.
- **2026-07-02 — Updated for ADR 11 (Recommendation Intelligence, roadmap
  6/8).** §3 engine map row #23 (Learning Orchestrator) updated to note
  School-Mode-only scope and ADR 11 Library Mode proposal. §6.7 expanded
  with ADR 11 finding: two-layer Recommendation Architecture (Cross-Session
  Planner + Session Recommendation Reconciler with deterministic signal
  priority table, `maxSessionSignals = 3` cap), Library Mode parity
  (`getTopLibraryRecommendation()`), and Evidence Engine hook (ADR 13).
  §7 risk register gains R15 (in-session signal conflicts resolved
  probabilistically by LLM rather than deterministically by Brain — already
  realized in production). §9 ADR index row for ADR 11 updated to "Proposal,
  blocked on KG v1 freeze." No production code changed.
