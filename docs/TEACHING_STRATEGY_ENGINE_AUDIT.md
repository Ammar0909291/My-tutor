# Teaching Strategy Engine Audit — Sprint H, Task 1

## 1. Current flow: Student Question → Tutor Max → AI Response → Visual Detection → Visual Rendering

```
STUDENT types a message
   │
   ▼
POST /api/learn/chat  (src/app/api/learn/chat/route.ts)
   │  - loads session/curriculum/learner-profile context
   │  - builds the system prompt (knowledge graph, the EXISTING adaptive
   │    TeachingStrategy from src/lib/school/adaptive/teachingStrategy.ts,
   │    worked-example state, etc.) — none of this is touched by Sprint H
   │  - calls routeAI() → OpenRouter primary / Gemini fallback
   ▼
Tutor Max's plain-text response ("cleanText")
   │
   ▼
buildVisualSpec(cleanText)   (src/lib/visuals/visualSpecBuilder.ts)
   │  1. detectVisualConcept(cleanText)  — deterministic regex/keyword rules,
   │     no AI reasoning (src/lib/visuals/visualConceptDetector.ts)
   │     → DetectedConcept | null  (graph | number_line | triangle | rectangle
   │       | circle | angle | process_flow)
   │  2. map the concept straight onto a raw VisualSpec object
   │  3. parseVisualSpec() — zod validation, fail-safe to null
   ▼
VisualSpec | undefined  (attached to the JSON response, never persisted)
   │
   ▼
Client (src/components/learn/LessonScreen.tsx)
   │  - re-validates with parseVisualSpec() defensively
   │  - stores it on the chat message
   ▼
<VisualRenderer spec={...} />  (src/components/visuals/VisualRenderer.tsx)
   │  - dispatches on spec.type to GraphRenderer / NumberLineRenderer /
   │    GeometryRenderer / ProcessFlowRenderer
   ▼
STUDENT sees the visual under the tutor's message
```

**This flow is entirely text-in → text-out today.** The AI model never emits a structured visual tag, never decides "show a graph," and never decides "make this interactive" or "grade this." Every one of those decisions is currently made — or rather, *not* made — by the same deterministic regex pass over the tutor's final prose.

## 2. Current limitations

1. **Detection is necessary but not sufficient for good pedagogy.** `detectVisualConcept()` fires whenever its keyword/regex rules match, regardless of whether a visual actually *helps* at that moment — e.g. a tutor response that merely *mentions* "y = x + 2" while explaining something else entirely still triggers a graph.
2. **No notion of interaction or assessment exists in the detection→build path at all.** Sprint F/G's `interactive`/`challenge` fields are fully implemented in every renderer and the zod schema, but **nothing in the live chat pipeline ever sets them** — they were, until this sprint, only ever hand-authored on the `/dev/visual-demo` page. A student in a real lesson never sees a draggable graph or a graded challenge today, even though the rendering code fully supports it.
3. **One-size-fits-all**: every detected concept gets exactly the same (currently absent) interaction/assessment treatment. A linear-equation explanation and a "what is the capital of France"-style factual answer that happens to contain a stray number are treated identically by the rendering layer — both either get a static visual or nothing, with no concept of "this deserves manipulation" vs. "this deserves a quick illustration only."
4. **The existing adaptive "Teaching Strategy"** (`src/lib/school/adaptive/teachingStrategy.ts`, 7 pedagogical modes like `FOUNDATION_REBUILD`/`MOMENTUM_RECOVERY`) only feeds the AI's system prompt as text instructions. It has zero connection to the visual pipeline — it cannot say "this student needs more hands-on practice, so make the next visual interactive."
5. **No single seam to extend.** Because detection, building, and rendering are three separate, narrowly-scoped modules (by design, for Sprint B–G's incremental delivery), there was no place to add "should this be a visual at all, and how rich should it be" without either bloating the detector (mixing "what is this" with "what should we do about it") or bloating every renderer.

## 3. Orchestration gaps

- **No decision layer between "what was detected" and "what gets rendered."** Detection answers *what* concept is present; the builder answers *how to represent it as data*; nothing answers *whether and how richly to present it*.
- **No deterministic mapping from concept type/task to interaction/assessment policy.** Sprint F and G proved per-renderer interaction/assessment is safe and regression-proof; Sprint H's gap is that nothing decides *when* to turn those flags on for real chat traffic.
- **No formal contract type** a future caller (this sprint's `VisualTeachingStrategy`, or eventually a learner-profile-aware module) can produce and have the rest of the pipeline honor. Today "decide to show a visual" is implicit in `detectVisualConcept` returning non-null; there's no separate, inspectable strategy object.

## 4. Future Universal-Learning compatibility

- **Universal Learning** (not touched, not built here) will eventually need the same kind of "what to show, how richly" decision across many more domains. A `VisualTeachingStrategy` contract that is *purely a function of (content, detected concept)* today can later accept additional, optional inputs (a learner profile, a subject, a difficulty signal) **without changing its output shape** — callers downstream (the spec builder, the renderer) never need to change, because they only ever consume the same `{ explanation, visualization, interaction, assessment }` shape.
- Keeping the strategy selector **pure and synchronous** (no AI call, no database read) means it can be safely called on every chat turn with zero latency/cost impact, and ports cleanly into any future surface (Universal Learning, a quiz generator, an offline worksheet renderer) that already has a piece of text and wants the same yes/no decisions.
- Because the strategy is computed from the *already-detected* concept rather than re-deriving its own detection, any future, richer detector (e.g. an eventual Universal Learning concept tagger) only needs to keep emitting the same `DetectedConcept` shape — the strategy layer (and everything downstream of it) doesn't need to know how detection internally changed.

## 5. What Sprint H adds (forward reference — see the Sprint H report for full detail)

A new, additive module `src/lib/visuals/teachingStrategy.ts` introduces:
- `VisualTeachingStrategy` — the Task 2 contract.
- `selectTeachingStrategy(content, concept)` — the Task 3 deterministic selector.
- `planVisualTeaching(content)` — the Task 4 integration point, wired into `src/app/api/learn/chat/route.ts` in place of the bare `buildVisualSpec()` call, gating whether a visual appears at all and whether it carries `interactive`/`challenge`.

No existing renderer, schema, detector, or builder function changed signature; no database, curriculum, or Tutor Max prompt changed.
