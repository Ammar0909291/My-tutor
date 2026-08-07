# Concept Understanding Engine

Understands **which concept the student is talking about**, before any
teaching decision is made.

```
Student
  ↓
Conversation Understanding   (src/lib/understanding/ — affect, phase, placement)
  ↓
Concept Understanding        ← this module
  ↓  ConceptUnderstanding.primaryConceptId
Teaching Planner             (src/lib/teaching/planner/)
  ↓  TeachingPlan
Teaching systems
```

## Naming

This repo already has a **Conversation** Understanding Engine abbreviated
`CUE` (`src/lib/understanding/`). This is the **Concept** Understanding
Engine. To keep the acronym unambiguous, this subsystem is always referred to
by name, never as "CUE". The two are complementary, not competing:
Conversation Understanding runs first and supplies the context this engine
reads.

## What problem this solves

The Teaching Planner needs a `targetConceptId`. Nothing in the runtime could
produce one — `convConceptId` is derived solely from `currentLesson.topicSlug`,
which is why every turn inherits the lesson concept and off-topic questions
get the lesson's visualization. This engine is the missing producer.

## What it does NOT do

No teaching. No rendering. No LLM. No Prisma. No lesson execution. No stored
state. `understandConcepts()` is pure, synchronous and deterministic.

Conversation context is **read, never owned**: the caller passes
`context.previousConceptId`; this engine never stores or mutates it.

## Files

| File | Role |
|---|---|
| `conceptUnderstanding.ts` | Contract: `ConceptUnderstanding`, `ExtractionMethod`, `METHOD_CONFIDENCE`. Data + enums only. |
| `conceptIndex.ts` | Normalization, alias table, deterministic matcher. Zero imports. |
| `conceptUnderstandingEngine.ts` | `understandConcepts()` — the 4-stage resolution. |
| `conceptIndexSource.ts` | The **only** KG-touching file; reuses `getKnowledgeGraph()`/`getAllNodes()`. |

## Resolution order

1. **Concepts named in the message** — strongest evidence wins.
2. **Back-reference** ("explain it again") resolved from supplied context.
3. **Active lesson concept** — an *explicit, low-confidence* fallback.
4. **Unresolved** — reported honestly, never guessed.

Stage 3 is deliberately visible and scored 0.5: it is exactly the assumption
the lesson-locked runtime made *silently* on every turn. Making it an
explicit, low-confidence branch is the point.

## Extraction methods and confidence

| Method | Confidence | Matches |
|---|---|---|
| `CONCEPT_ID` | 1.00 | a literal canonical KG id in the text |
| `EXACT_TITLE` | 0.95 | the exact KG title |
| `ALIAS` | 0.90 | a registered alias (`F=ma`, `law of inertia`, …) |
| `NORMALIZED_TITLE` | 0.85 | after case/punctuation/possessive/plural normalization |
| `ACRONYM` | 0.70 | a derived acronym, **only** when written in caps |
| `CONVERSATION_REFERENCE` | 0.60 | resolved from supplied context |
| `LESSON_CONTEXT` | 0.50 | active-lesson fallback |
| `UNRESOLVED` | 0 | nothing resolvable |

These are constants, never computed — identical matches always score
identically.

## Determinism

Ranking is **confidence desc → matched span length desc → conceptId asc**.
The final tie-break guarantees a stable primary even for genuinely equal
readings. Normalization is conservative by design: `singularize()` handles
only the three unambiguous English patterns, so `mass`, `radius` and `gas`
survive intact.

No semantic/AI matching, per scope. Pure text.

## Ambiguity — never guess silently

When two or more concepts compete for the **same text span** at the same
strength, the engine:

- still names a `primaryConceptId` (deterministic tie-break),
- sets `ambiguityDetected: true`,
- lists every reading in `ambiguityCandidates`,
- **multiplies confidence by 0.6** so the caller sees reduced certainty
  rather than a false one.

## Comparison

`comparisonConceptIds` is populated only when comparison framing
("difference between", "versus", "compare") appears **and** ≥2 distinct
concepts resolve. A marker with one concept is not a comparison; two concepts
with no marker is not either.

## Status

Built, tested (33 tests), **not integrated into the runtime**, per scope.
