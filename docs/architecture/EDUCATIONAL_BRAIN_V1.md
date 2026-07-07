# My Tutor — Educational Brain v1.0 — Architecture Freeze

**Status: FROZEN.** This document, and the five documents alongside it
(`ENGINE_REFERENCE.md`, `DATA_FLOW.md`, `DEPENDENCY_RULES.md`,
`EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md`) are the permanent
reference for the Educational Brain as it exists today. They describe code
that already exists and works. Nothing in this freeze adds a feature,
changes behavior, or renames anything — it is a snapshot, witnessed and
written down.

Every future engineer or AI working on My Tutor's teaching intelligence
**must read this set of documents before changing or extending the
Educational Brain**, and must extend this architecture rather than
replace it (see `EXTENSION_GUIDE.md`).

---

## 1. What the Educational Brain is

The Educational Brain is the collection of deterministic, rule-based
engines that decide *what* a student should learn next, *whether* they've
mastered it, *how* it should be taught this turn, and *what shape* the
lesson should take — all computed **before** any LLM is called. The LLM
(via the AI Router) only renders the conversational turn; it never makes
a pedagogical decision. Every "intelligence" block injected into the
tutor's system prompt is **advisory text**, built from data the engine
already had — never invented prose, never a second LLM call.

This is the load-bearing design rule of the whole platform:

> **Decisions are deterministic. Only the words are generated.**

## 2. System architecture (text diagram)

```
                         ┌─────────────────────────────┐
                         │   Canonical Knowledge Graph   │
                         │  docs/{subject}/kg/graph.json │
                         │  (immutable runtime asset)     │
                         └───────────────┬────────────────┘
                                         │ read-only
                  ┌──────────────────────┼───────────────────────┐
                  │                      │                       │
        ┌─────────▼─────────┐  ┌─────────▼─────────┐   ┌─────────▼─────────┐
        │ Generic Subject    │  │ Knowledge Graph    │   │ Curriculum         │
        │ Adapter             │  │ Validator (CLI)    │   │ Authority Brain    │
        │ subjectKgAdapter.ts │  │ validate-knowledge- │   │ engine.ts +        │
        │                     │  │ graph.ts            │   │ subjectCatalog.ts │
        └─────────┬───────────┘  └────────────────────┘   └────────────────────┘
                  │ ConceptNode[]
                  │
        ┌─────────▼──────────────────────────────────────────────────────┐
        │                      STUDENT MEMORY ENGINE                      │
        │  src/lib/memory/{repository,service,update-pipeline,types}.ts   │
        │  sole owner of longitudinal learner state (Retention/Review)    │
        └─────────┬──────────────────────────────────────────────┬────────┘
                  │ LearnerMemory / TeachingMemorySnapshot         │ fire-and-forget
                  │                                                 │ writes (post-turn)
        ┌─────────▼─────────┐  ┌────────────────────┐  ┌──────────▼─────────┐
        │ Mastery            │  │ Assessment          │  │ Recommendation      │
        │ Intelligence        │  │ Intelligence        │  │ Intelligence cluster │
        │ masteryIntelligence │  │ assessmentIntelligence│  │ (nextBestAction,    │
        │ .ts                 │  │ .ts                  │  │ learningOrchestrator,│
        └─────────┬───────────┘  └──────────┬───────────┘  │ weakTopics, dailyPlan,│
                  │                          │              │ studyPlan, examReadi-│
                  │                          │              │ ness, spacedRevision)│
                  │                          │              └──────────┬───────────┘
                  └────────────┬─────────────┘                         │ advisory only,
                               │                                       │ never called by
                  ┌────────────▼─────────────┐                        │ Teaching Engine
                  │      TEACHING ENGINE      │                        │
                  │  src/lib/teaching-engine/  │                        │
                  │  decide() — FROZEN, pure   │◄───────────────────────┘ (parallel path,
                  └────────────┬─────────────┘                           same UI turn)
                               │ TeachingDecision
                  ┌────────────▼─────────────┐
                  │ Teaching Action Generator  │
                  │ (TAG) teachingActionGenerator.ts │
                  └────────────┬─────────────┘
                               │ TeachingAction
                  ┌────────────▼─────────────┐
                  │  Dynamic Lesson Composer   │
                  │  lessonComposer.ts          │
                  └────────────┬─────────────┘
                               │ LessonPlan (stage sequence)
                               │
                  ┌────────────▼─────────────┐         ┌─────────────────────────┐
                  │   systemPrompt assembly    │────────▶│       AI Router          │
                  │  (api/learn/chat/route.ts) │         │  src/lib/ai/router.ts     │
                  └────────────────────────────┘         │  Groq primary / Yandex    │
                                                          │  (Russia-only) fallback   │
                                                          └────────────┬────────────┘
                                                                       │ raw text
                                                          ┌────────────▼────────────┐
                                                          │   Response Parser tags    │
                                                          │ VISUAL: / [HINT] /        │
                                                          │ [INLINE_PRACTICE]         │
                                                          └────────────┬────────────┘
                                                                       │
                                                          ┌────────────▼────────────┐
                                                          │            UI             │
                                                          └────────────────────────────┘
```

A second, **experimental and disabled-by-default** pipeline exists
alongside this one: the **Educational Brain Decision Pipeline**
(`src/lib/educationalBrain/`, gated by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`).
It is fire-and-forget, never awaited, and has zero effect on the response
seen by the student unless explicitly enabled. See `ARCHITECTURE_DECISIONS.md`
§"Two pipelines" and `ENGINE_REFERENCE.md` for details.

## 3. The canonical execution pipeline

```
Knowledge Graph (JSON, immutable)
  → Generic Subject Adapter (inferDomain/inferConceptType)
    → Student Memory Engine (readLearnerMemoryFromPreload → toTeachingSnapshot)
      → Mastery Intelligence (masteryIntelligence.ts, read-only, parallel input)
        → Assessment Intelligence (assessmentIntelligence.ts, reads Memory + Mastery)
          → Teaching Engine (decide(): StudentState + ConceptNode + LearningHistory → TeachingDecision)
            → Teaching Action Generator (TeachingDecision + ConceptNode + context → TeachingAction)
              → Dynamic Lesson Composer (TeachingDecision + TeachingAction + AssessmentDecision + Memory → LessonPlan)
                → systemPrompt assembly (api/learn/chat/route.ts — every block above appended as advisory text)
                  → AI Router (routeAI(): Groq primary, YandexGPT Russia-only fallback)
                    → LLM (single call per turn, no chained/agentic LLM calls)
                      → Response Parser (parseVisualTag / parseHintTag / parseInlinePracticeTag)
                        → UI (text + visual + hint + inline practice)
                          → Student Memory write-back (update-pipeline.ts, triggered from
                            practice/assessment submit routes — NOT from the chat turn itself)
```

This is the actual, code-grounded pipeline (see `DATA_FLOW.md` for the
full 65-step trace through `api/learn/chat/route.ts`). It refines the
illustrative example in the freeze brief
(`KG → Memory → Mastery → Assessment → Teaching → TAG → Composer → AI Router
→ LLM → Parser → UI`) with one correction worth stating plainly:
**Recommendation Intelligence is not in this chain.** It runs in a parallel
advisory path (its own block in the system prompt, e.g. "STUDENT STATUS" /
"DAILY STUDY PLAN" / "ROADMAP PROGRESS"), and is also surfaced on
dashboard/chapter pages outside the chat turn entirely. The Teaching Engine
never calls it and never depends on its output — see `DEPENDENCY_RULES.md`.

## 4. Engine inventory (by ownership tier)

| Tier | Engine | Primary file(s) | Deterministic? |
|---|---|---|---|
| Knowledge | Curriculum Authority Brain | `src/lib/curriculum/engine.ts`, `subjectCatalog.ts` | Yes |
| Knowledge | Canonical Knowledge Graph System | `src/lib/curriculum/knowledgeGraph.ts` | Yes |
| Knowledge | Generic Subject Adapter | `src/lib/curriculum/subjectKgAdapter.ts` | Yes |
| Knowledge | Knowledge Graph Validator (also covers curriculum-sequencing validation) | `scripts/validate-knowledge-graph.ts` | Yes (CLI, offline) |
| Knowledge | Subject Knowledge Graphs (data) | `docs/{mathematics,physics,chemistry,computer-science,biology}/kg/graph.json` | N/A (data) |
| Memory | Student Memory Engine | `src/lib/memory/{repository,service,update-pipeline,types,index}.ts` | Read path: yes. Write path: idempotent upserts. |
| Mastery | Mastery Intelligence | `src/lib/school/adaptive/masteryIntelligence.ts` | Yes |
| Assessment | Assessment Intelligence | `src/lib/school/adaptive/assessmentIntelligence.ts` | Yes |
| Assessment | Subject Assessment Requirements | `src/lib/assessment/subjectValidator.ts` | Yes (static lookup table) |
| Teaching | Teaching Engine (FROZEN) | `src/lib/teaching-engine/{index,types}.ts` | Yes |
| Teaching | Teaching Action Generator (TAG) | `src/lib/school/adaptive/teachingActionGenerator.ts` | Yes |
| Teaching | Dynamic Lesson Composer | `src/lib/school/adaptive/lessonComposer.ts` | Yes |
| Teaching (supporting) | Confidence Calibration | `confidenceCalibration.ts` | Yes |
| Teaching (supporting) | Learning Momentum | `learningMomentum.ts` | Yes |
| Teaching (supporting) | Teaching Strategy Orchestrator | `teachingStrategy.ts` | Yes |
| Teaching (supporting) | Teaching Output Bias | `teachingOutputBias.ts` | Yes |
| Teaching (supporting) | Teaching Style Detector | `teachingStyle.ts` | Yes |
| Teaching (supporting) | Misconception Engine | `misconceptionEngine.ts` | Yes |
| Teaching (supporting) | Concept Transfer | `conceptTransfer.ts` | Yes |
| Teaching (supporting) | Strategy Effectiveness | `strategyEffectiveness.ts` | Yes |
| Lesson (chapter-scoped) | Lesson Planner (Sprint BY) | `lessonPlanner.ts` | Yes |
| Recommendation | Next-Best-Action | `nextBestAction.ts` | Yes |
| Recommendation | Learning Orchestrator (primary cross-engine aggregator) | `learningOrchestrator.ts` | Yes |
| Recommendation | Weak Topics | `weakTopics.ts` | Yes |
| Recommendation | Daily Plan | `dailyPlan.ts` | Yes |
| Recommendation | Study Plan | `studyPlan.ts` | Yes |
| Recommendation | Exam Readiness | `examReadiness.ts` | Yes |
| Recommendation | Spaced Revision | `spacedRevision.ts` | Yes |
| Recommendation | Prerequisite Recovery | `prerequisiteRecovery.ts` | Yes |
| Recommendation | Learning Narrative | `learningNarrative.ts` | Yes |
| Recommendation | Learning Profile | `learningProfile.ts` | Yes |
| Visual | Visual Type System | `src/lib/school/visuals/{visualTypes,detectVisual}.ts` | Yes |
| Generation | AI Router | `src/lib/ai/router.ts` | No (the only probabilistic component) |
| Experimental | Educational Brain Decision Pipeline | `src/lib/educationalBrain/*` | Yes, but disabled by default |
| Legacy/orphaned | Teaching Assets Platform (content layer; the duplicate decision-engine half was deleted — see ADR 03) | `src/lib/curriculum/{teachingAssetSchema,teachingAssetAdapter,teachingAssets}.ts` | Yes, but **unwired** — see `ARCHITECTURE_DECISIONS.md` |
| Historical | Closed Beta Stabilization | (completed sprints; see `ENGINE_REFERENCE.md`) | N/A — finished work, not a running engine |
| Historical | Data Integrity Foundation | `src/lib/db/prisma.ts` (`withRetry`), `$transaction` sites | N/A — finished hardening, now load-bearing code |

Full per-engine detail (inputs/outputs/public functions/failure
behavior/guarantees/MUST NOT) is in `ENGINE_REFERENCE.md`.

## 5. Database ownership (one-paragraph summary)

The Prisma schema (`prisma/schema.prisma`, 84 models) splits cleanly into
six ownership buckets: **Auth/Identity**, **Conversation/Session State**,
**Learner Longitudinal State** (owned exclusively by the Student Memory
Engine's write path), **Curriculum/Subject Configuration**, **Assessment**,
and **Billing/Gamification**. A separate, newer, more normalized `Eb*`-
prefixed model family (24 models) implements a second-generation
knowledge-graph-in-the-database design that coexists with, but does not yet
replace, the file-based canonical KG. See `DATA_FLOW.md` §"Database
ownership" for the full per-bucket model list and `ARCHITECTURE_DECISIONS.md`
for the explicit two-generations-coexisting finding.

## 6. Documents in this set

| Document | Contents |
|---|---|
| `EDUCATIONAL_BRAIN_V1.md` (this file) | Overview, system diagram, pipeline, engine inventory |
| `ENGINE_REFERENCE.md` | Per-engine frozen interface: inputs/outputs/public functions/behavior/guarantees/MUST NOT |
| `DATA_FLOW.md` | Full ordered trace of `api/learn/chat/route.ts`, DB ownership tables, flow diagrams (knowledge/teaching/assessment/memory) |
| `DEPENDENCY_RULES.md` | Per-engine may-read / may-not-call matrix |
| `EXTENSION_GUIDE.md` | How to add a subject, an engine, a visual type, an assessment type, a teaching action, a memory signal, a recommendation signal — without architectural drift |
| `ARCHITECTURE_DECISIONS.md` | Permanent rules, plus the honest record of every naming/duplication finding from this freeze |

## 7. Scope discipline

Per the freeze brief, this work:
- Does **not** add a feature.
- Does **not** add a new intelligence engine.
- Does **not** add a new subject.
- Does **not** redesign anything that already works — including the two
  naming/duplication findings documented in `ARCHITECTURE_DECISIONS.md`,
  which are recorded as findings for a future, explicitly-approved cleanup
  phase, not fixed here.

Future phases extend this architecture (see `EXTENSION_GUIDE.md`); they do
not replace it.
