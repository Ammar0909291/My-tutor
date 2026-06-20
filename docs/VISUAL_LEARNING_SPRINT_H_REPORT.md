# Visual Learning Sprint H — Teaching Strategy Engine

## 1. Files Changed

| File | Change |
|---|---|
| `docs/TEACHING_STRATEGY_ENGINE_AUDIT.md` | New — Task 1 audit (current flow, limitations, orchestration gaps, future Universal-Learning compatibility) |
| `docs/VISUAL_LEARNING_SPRINT_H_REPORT.md` | New — this report |
| `src/lib/visuals/teachingStrategy.ts` | New — `VisualTeachingStrategy` contract (Task 2), `selectTeachingStrategy()` deterministic selector (Task 3), `planVisualTeaching()` integration entry point (Task 4) |
| `src/app/api/learn/chat/route.ts` | One call-site change: the bare `buildVisualSpec(cleanText)` detection call is now routed through `planVisualTeaching(cleanText).spec` — same variable, same JSON response shape, no other line touched |

No renderer, no zod schema, no detector, no spec builder, no database model, no curriculum content, and no Tutor Max system prompt was changed. `GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`, `ProcessFlowRenderer.tsx`, `visualSpec.ts`, `visualConceptDetector.ts`, and `visualSpecBuilder.ts` are byte-for-byte unchanged from the end of Sprint G.

## 2. Teaching Strategy Architecture

```
Student message
   │
   ▼
Tutor Max (AI response, prompt unchanged)
   │
   ▼
detectVisualConcept(text)        ── Sprint C, unchanged
   │  DetectedConcept | null
   ▼
selectTeachingStrategy(text, concept)   ── NEW (Sprint H)
   │  VisualTeachingStrategy { explanation, visualization, interaction, assessment }
   ▼
buildVisualSpec(text)            ── Sprint C, unchanged — only called when strategy.visualization is non-null
   │  VisualSpec | null
   ▼
merge strategy.interaction/assessment onto the spec, re-validate (parseVisualSpec)  ── NEW (Sprint H)
   │  VisualSpec | null
   ▼
JSON response { ..., visualSpec }   ── same shape as Sprint C–G
   │
   ▼
VisualRenderer / GraphRenderer / NumberLineRenderer / GeometryRenderer / ProcessFlowRenderer  ── unchanged
```

`planVisualTeaching(content)` is the single new entry point gluing these steps together; it is the only thing `route.ts` now calls in place of the old bare `buildVisualSpec(cleanText)`. It is **fail-safe**: any unexpected shape, parse failure, or thrown error yields `{ strategy: explanation-only, spec: null }`, exactly matching the pre-Sprint-H fallback behavior (no visual, lesson text renders normally).

The contract type is deliberately named `VisualTeachingStrategy`, not `TeachingStrategy`, to avoid any confusion with the pre-existing, unrelated `TeachingStrategy` in `src/lib/school/adaptive/teachingStrategy.ts` (a pedagogical-approach selector for the AI system prompt — untouched, orthogonal, lives in a different file). The two can be imported side-by-side without collision.

## 3. Selection Rules (Task 3 / Task 5 / Task 6)

All rules are pure functions of the already-detected concept (and, for two rules, simple keyword checks on the tutor's own text) — **no AI call, no LLM reasoning**, matching the deterministic style already used by `visualConceptDetector.ts`.

| Detected concept | Visualization | Interaction | Assessment | Why |
|---|---|---|---|---|
| `null` (nothing detected — simple factual question) | none | off | off | Nothing to show; explanation only |
| `graph`, equation is `y = mx + b` (linear) | `graph` | **on** | **on** | Pan/zoom is always safe; GraphRenderer can derive a live `{m, b}` model to grade against |
| `graph`, equation is non-linear (quadratic, etc.) | `graph` | **on** | off | Pan/zoom still safe (GraphRenderer's own fail-safe: no drag handles appear without a linear match); no live model exists to grade, so no challenge |
| `number_line` | `number_line` | **on** | off | Dragging highlighted points is always clamped/safe; a deterministic target value/relation/order isn't unambiguously derivable from plain detected numbers, so assessment is deliberately left off rather than guessed |
| `triangle` / `rectangle` / `circle` / `angle` | `geometry` | **on** | **on** only if the text contains a task keyword (`area`, `perimeter`, `circumference`, `measure`) | Drag handles are always bounded/safe; a challenge is only meaningful when the text actually asked for a computation, not a bare shape mention |
| `process_flow` | `process_flow` | **on** | **on** | Reorder mode is the entire reason to show a process diagram; a sequence inherently has a "did you get the order right" check |

**Interaction policy (Task 5) in one line**: interaction is on whenever the underlying renderer's drag affordance is unconditionally safe (every Sprint F handle is clamped/bounded and fails closed for unsupported shapes) — which today is *every* visual type. The audit's Task 5 examples ("graphs → usually interactive," "definitions → not interactive," "simple facts → no interaction") hold because definitions/simple facts never produce a `DetectedConcept` in the first place, so `visualization` is `null` and interaction is moot.

**Assessment policy (Task 6) in one line**: assessment is on only when a concrete, gradable target value exists *and* the text signals the student is meant to solve for something (an explicit linear model for graphs, an explicit area/perimeter task for geometry, or an inherently ordered sequence for process flows). It is off for number lines (no unambiguous deterministic target) and for bare definitional/factual responses (nothing detected at all).

## 4. Demonstration (Task 7)

Ran `planVisualTeaching()` directly against six worked examples plus a control case, using `npx tsx` against the actual module (not hand-typed expectations):

| Example text (excerpt) | Strategy | Visual engine | Interaction | Assessment | Resulting spec excerpt |
|---|---|---|---|---|---|
| "A linear equation ... y = 2x + 3 has a slope of 2 and a y-intercept of 3." | graph + interaction + assessment | `graph` | on | on | `{ equation: "y = 2x + 3", interactive: true, challenge: { targetSlope: 2, targetIntercept: 3 } }` |
| "A quadratic equation like y = x^2 - 2x - 3 forms a parabola..." | graph + interaction, no assessment | `graph` | on | off | `{ equation: "y = x^2 - 2x - 3", interactive: true }` (no `challenge` — no live model exists) |
| "Integers include positive and negative numbers... compare -3 and 5..." | number_line + interaction | `number_line` | on | off | `{ start: -5, end: 5, highlight: [-3, 5], interactive: true }` |
| "To find the area of a triangle with base 6 and height 4..." | geometry + interaction + assessment | `geometry` (triangle) | on | on | `{ shape: "triangle", base: 6, height: 4, interactive: true, challenge: { targetArea: 12, targetPerimeter: 16 } }` |
| "Explain photosynthesis: plants convert sunlight, water, and CO2..." | process_flow + assessment | `process_flow` | on | on | `{ title: "Photosynthesis", steps: [...5 steps...], interactive: true, challenge: {} }` |
| "The digestive system breaks down food... mouth, stomach, intestines." | process_flow + assessment | `process_flow` | on | on | `{ title: "Digestion", steps: [...5 steps...], interactive: true, challenge: {} }` |
| "The capital of France is Paris, a city in Western Europe." | explanation only | none | off | off | `spec: null` |

Every row matches the brief's own stated examples exactly (Linear equations → graph + interaction + assessment; Photosynthesis → process_flow + assessment; Integers → number_line + interaction; Triangle area → geometry + interaction + assessment; Simple factual questions → explanation only) plus the two extra Task 7 cases (quadratic equation, digestion) which exercise the "no live model / not gradable" and "second process-flow definition" branches respectively.

## 5. Failure Modes

- **Auto-derived challenge targets equal the spec's own initial correct value.** For graph/geometry, `deriveChallenge()` computes the target from the *same* numbers already in the spec (e.g. a triangle's `targetArea` is computed from that same triangle's own `base`/`height`). This means the challenge is technically "met" the instant it renders, before any drag — the student would need to drag away and back to see the feedback flip. This mirrors the existing precedent in `ProcessFlowRenderer` (its `isCorrect` check also compares against the spec's own, assumed-correct order) but is a known limitation worth flagging rather than silently shipping as if it were a fully designed exercise generator. Deliberately not "fixed" here, since generating a *different*, pedagogically sound starting value (e.g. a deliberately wrong initial base/height) is new exercise-authoring logic beyond this sprint's "no AI reasoning, routing only" scope — flagged below as future work.
- **Number-line assessment is off by design, not by gap.** A future sprint could add it (e.g. "place near X" using a number explicitly stated as a target in the text), but doing so safely needs a way to distinguish a target number from an already-correct illustrative number in the same sentence — left as a deliberate non-goal here to avoid guessing.
- **Graph assessment only fires for the exact compact `y = mx + b` form** that `GraphRenderer.tsx`'s own (separately maintained) `LINEAR_RE` matches. `teachingStrategy.ts` deliberately duplicates this regex (commented as intentionally mirrored) rather than importing it, because `GraphRenderer.tsx` is a `'use client'` component and `teachingStrategy.ts` must stay callable from server code (the chat route) with no React dependency. If `GraphRenderer`'s matcher is ever changed, this duplicate needs a matching update — documented in both files' comments.
- **No regression to non-detected lessons.** When `detectVisualConcept` returns `null` (the overwhelming majority of turns — most tutor responses contain no graph/number-line/geometry/process keyword at all), `planVisualTeaching` returns `{ strategy: explanation-only, spec: null }` immediately, identical to the old `buildVisualSpec` returning `null` — zero behavioral change for any non-visual turn.

## 6. Future Universal-Learning Implications

- `selectTeachingStrategy(content, concept)` is pure and synchronous — it can later accept additional optional context (a learner profile, a subject tag, a confidence/mastery signal) as extra parameters without changing its output shape, so nothing downstream (the merge step, the renderer) needs to change when that happens.
- Because the strategy is computed from an already-detected concept rather than re-implementing its own detection, a future, richer Universal-Learning-era concept detector only needs to keep emitting the same `DetectedConcept` union — `teachingStrategy.ts` and everything downstream stays untouched.
- The "starts already met" challenge-target limitation (Section 5) is the clearest signpost for where a future, more deliberate exercise-generation layer would slot in — as an additional, optional transform between `deriveChallenge()`'s current "mirror the spec's own correct value" behavior and a genuinely perturbed starting state, without touching the strategy contract itself.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → clean, no errors.
- `npm run build` → succeeded (prisma generate && next build), all routes including `/api/learn/chat` and `/dev/visual-demo` compiled.
- `src/app/dev/visual-demo/VisualDemo.tsx` and every renderer it exercises (Sprint B–G specs) are unchanged on disk — confirmed via `git diff` showing zero changes to any renderer, schema, detector, or builder file; only `route.ts` (one call-site swap) and the new `teachingStrategy.ts` file were touched.
- `/api/learn/chat`'s JSON response shape is unchanged (`{ success, text, provider, visual?, visualSpec? }`) — `planVisualTeaching(cleanText).spec` is assigned to the exact same `detectedVisualSpec` variable that previously held `buildVisualSpec(cleanText)`'s result, so every other line of `route.ts` (DB writes, snapshot updates, the final `NextResponse.json(...)`) is untouched.
- Manually exercised `planVisualTeaching()` against the seven Task 7 cases (Section 4) via `npx tsx`, confirming both the strategy and the merged spec for each — including that previously-shipped (Sprint F/G) `interactive`/`challenge` fields validate correctly when auto-populated this way (same zod schemas, no schema change needed).
