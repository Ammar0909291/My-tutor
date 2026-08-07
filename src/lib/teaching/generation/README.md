# Teaching Prompt Orchestrator — single-generation runtime

**Supersedes the multi-dispatcher execution model.** The Brain orchestrates
**prompt assembly**, not LLM execution.

```
ExecutionPlan
  ↓
Teaching Prompt Orchestrator     ← this module
  ↓  TeachingGenerationRequest
Prompt construction (separate concern, downstream)
  ↓
ONE LLM CALL
  ↓  TeachingGenerationResponse
VIE → ADR 12 → Renderer          (deterministic, after generation)
  ↓
Student
```

## Why this replaced the dispatcher model

Production already performs one LLM generation per turn. Dispatching
explanation, lesson, quiz and assessment as independent LLM-powered engines
would add latency, multiply tokens, duplicate context, fragment teaching
coherence, and require multiple calls. The plan's steps are therefore
**folded into one request** rather than executed as separate calls.

This also resolves the blocker the previous iteration hit: there is no
Assessment Engine or Lesson Engine to dispatch to, because those were never
separate systems — they are facets of the single generation.

## What changed, and what did not

**Replaced:** the runtime execution layer only.

**Untouched and consumed exactly as they exist:** Conversation Understanding,
Concept Understanding, Teaching Planner, Execution Planner, VIE, VKR, VAP,
ADR 12, Knowledge Graph, Explanation Memory. The previous
`runtime/runtimeExecutor.ts` + dispatchers remain in the tree; nothing was
deleted.

## The orchestrator does not write prompts

It emits **structured data only** — ids, enums, booleans, and authored
knowledge pulled from the VKR (objectives, misconception guards, emphasis
targets, accessibility requirements, assessment hints). It never composes
sentences addressed to a model. Prompt construction is a separate downstream
concern, deliberately not implemented here. A test asserts the output
contains no instruction-shaped text.

## `TeachingGenerationRequest`

Everything needed for one generation, in ten sections:

| Section | Carries |
|---|---|
| `concept` | target id, title, comparison ids, ambiguity + candidates |
| `lesson` | lesson/execution mode, excursion state, resume target |
| `explanation` | required?, learning objectives, prerequisites, definition-only |
| `visualization` | required?, **`VisualIntent`**, emphasis, narration, a11y |
| `assessment` | required?, hints, must-not-reveal, expects-response |
| `workedExample` / `revision` | required?, step/retrieval flags |
| `misconceptions` | authored misconception + guardance pairs |
| `constraints` | max actions/questions, must-end-with-question, withheld claims, language |
| `conversation` | previous concept, student message, learnerRequest (read-only) |
| `metadata` | executionId, intent, **folded** steps, **excluded** steps + reasons |

`visualization.intent` is the VIE's `VisualIntent` — **never** a renderer, a
`VisualType`, or an ADR 12 identifier. Renderer selection stays downstream and
deterministic, which is what keeps the original visualization bug fixed.

`metadata.excludedSteps` records what was deliberately *not* folded and why
(`UNDERSTAND` already ran upstream; `WAIT_FOR_STUDENT` is control flow;
`LESSON_FLOW`/`LESSON_RESUME` are expressed as lesson context) — so the fold
is auditable rather than lossy-by-accident.

## `TeachingGenerationResponse`

A **contract only** — no LLM is implemented, called, or parsed in this
iteration. `validateTeachingGenerationResponse()` checks structural
conformance against the request that produced it: id match, non-empty content,
assessment presence matching the requirement, disambiguation candidates when
asked for, excursion return honoured, and no withheld claim leaked. It never
judges teaching quality, which is not a structural property.

Note `visualReferenced`: the model reports only whether its content assumes a
visual. It does not select one.

## Determinism

`requestId` is an FNV-1a content hash of executionId + concept + folded steps
— no clock, no randomness. **Exactly one request per ExecutionPlan**, however
many steps the plan carries; that invariant is the architectural point and is
asserted directly.

## Status

Built, tested (31 tests), **not integrated into the runtime**, per scope.
