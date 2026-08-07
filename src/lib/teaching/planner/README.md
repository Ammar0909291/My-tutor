# Teaching Planner

The orchestration layer. Decides **which subsystem should execute, and on
what concept** — nothing else.

```
Student
  ↓
Conversation Understanding
  ↓
Teaching Planner        ← this module
  ↓  TeachingPlan
Explanation Engine · VIE → ADR 12 → Renderer · Assessment · Lesson flow
  ↓
Student
```

## What problem this solves

The runtime investigation proved the current chat route is **lesson-locked**:
`convConceptId` is derived only from the active lesson (`currentLesson.topicSlug`),
never from the student's message. There is no code path that can express
"answer this other thing for a moment, then come back". That single missing
concept is why off-topic questions get the lesson's visualization.

The planner introduces that expressiveness as data (`LessonMode`,
`ExcursionPlan`) so the runtime has something to act on. It does not fix the
route — integration is deliberately deferred.

## What it does NOT do

No teaching. No rendering. No explanation generation. No LLM calls. No
database, no Prisma. `planTeachingTurn()` is a pure, synchronous, deterministic
function over its inputs.

## Reuse, not duplication

- **`detectLearnerRequest()`** (`masteryGate.ts`) is *consumed*, not
  reimplemented — the caller passes its result as `PlannerInputs.learnerRequest`
  and the planner maps `diagram` → `VISUALIZE_CONCEPT`, `real_life_example` →
  `REAL_WORLD_EXAMPLE`.
  - One deliberate widening: `VISUALIZATION_NOUN_RE` adds the **noun** forms
    ("visualization", "visuals"). The existing `DIAGRAM_RE` matches only the
    verb forms, which is why *"Explain X with visualization"* produced no
    signal at all. The planner adds the nouns only; it does not restate the
    verbs the existing detector owns.
- **Concept resolution is an injected port** (`ConceptResolver`). The planner
  does not import the Knowledge Graph, so it stays pure and the runtime can
  supply whatever KG-backed resolver it already has.

## Rule order is the contract

`classifyIntent()` walks an explicitly ordered list and returns on first
match. The order encodes real precedence:

1. `RETURN_TO_LESSON` — an explicit instruction about where to be outranks all inference.
2. `CHANGE_TOPIC` — deliberate move; **no return owed**.
3. `COMPARE_CONCEPTS` — requires a comparison marker **and** ≥2 resolved concepts.
4. `QUIZ_ME` → 5. `SOLVE_PROBLEM` → 6. `REVISE_TOPIC`
7. `VISUALIZE_CONCEPT` — outranks plain explanation ("explain X with a diagram"
   is both; the visual is the part the current runtime gets wrong). Still
   requires an explanation — a visual alone is not teaching.
8. `REAL_WORLD_EXAMPLE` → 9. `DEFINE_TERM` (needs a named concept)
10. `EXPLAIN_CONCEPT` — a named concept with no other marker.
11. `FOLLOW_UP` — a continuation marker, or a *question* referring back by
    pronoun. Bare acknowledgements ("ok, got it") also contain pronouns, so the
    pronoun branch requires interrogative framing.
12. `CONTINUE_LESSON` — unmarked message while a lesson is active.
13. `UNKNOWN`.

## Derived fields

- **`targetConceptId`** — a named concept wins for concept-directed intents;
  otherwise the turn is about wherever we already are (current excursion first,
  then the lesson).
- **`lessonMode`** — `TEMPORARY_EXCURSION` when the target differs from the
  active lesson; `LESSON_CHANGED` only for `CHANGE_TOPIC`; `NO_LESSON` when
  none is active.
- **`executionSequence`** — revision → explanation → worked solution →
  visualization → assessment, then `LESSON_RESUME` if an excursion is open.
  Visualization runs *after* the explanation it accompanies, so the VIE builds
  a `VisualIntent` for the concept the explanation just addressed.
- **`reasoning`** — always populated. Per the Educational Brain's provenance
  rule, an unexplainable decision is an invented decision.

## Status

Built, tested (26 tests), **not wired into the runtime**. Integration requires
the route to accept a `TeachingPlan` as its concept authority instead of
`currentLesson.topicSlug` — a separate, larger change.
