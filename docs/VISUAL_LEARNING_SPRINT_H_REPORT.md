# Visual Learning Sprint H — Teaching Strategy Engine

## 1. Files Changed

| File | Change |
|---|---|
| `docs/TEACHING_STRATEGY_AUDIT.md` | Task 1 audit (renamed from `TEACHING_STRATEGY_ENGINE_AUDIT.md` and revised) — full pipeline trace distinguishing Concept Detection from Visual Detection, current flow, limitations, decision gaps, future Universal-Learning compatibility |
| `docs/TEACHING_STRATEGY_RULES.md` | New — Task 5 educational policy document: when to use each visual engine, when to enable interaction, when to enable assessment, and when NOT to use each |
| `docs/VISUAL_LEARNING_SPRINT_H_REPORT.md` | This report, rewritten to the refined structure |
| `src/lib/visuals/teachingStrategy.ts` | `VisualTeachingStrategy` contract (Task 2), `selectTeachingStrategy()` deterministic selector (Task 3), `planVisualTeaching()` integration entry point (Task 4). One rule changed from the first draft: graph assessment is now `true` for every detected graph (linear or quadratic), not just linear ones — see Section 3 |
| `src/app/api/learn/chat/route.ts` | One call-site change (unchanged from the first draft): the bare `buildVisualSpec(cleanText)` detection call is routed through `planVisualTeaching(cleanText).spec` — same variable, same JSON response shape, no other line touched |

No renderer, no zod schema, no detector, no spec builder, no database model, no curriculum content, and no Tutor Max system prompt was changed. `GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`, `ProcessFlowRenderer.tsx`, `visualSpec.ts`, `visualConceptDetector.ts`, and `visualSpecBuilder.ts` are byte-for-byte unchanged from the end of Sprint G. No new visual engine, timeline, or simulation was built. No interactive layer or visual assessment layer was rebuilt — both are reused exactly as Sprint F/G left them.

## 2. Teaching Strategy Architecture

```
Student message
   │
   ▼
Concept Detection (general curriculum/topic tracking — pre-existing, untouched)
   │  currentConceptNodeId/nextConceptNodeId, detectWorkedExampleIntent,
   │  detectMisconceptions, evaluateConceptTransfer, getTeachingStrategy
   │  (the existing pedagogical-mode selector) — all feed the system prompt
   ▼
Tutor Max (AI response, prompt unchanged)
   │
   ▼
detectVisualConcept(text)        ── Sprint C, unchanged — "Visual Detection"
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

`planVisualTeaching(content)` is the single new entry point gluing these steps together; it is the only thing `route.ts` now calls in place of the old bare `buildVisualSpec(cleanText)`. It is **fail-safe**: any unexpected shape, parse failure, or thrown error yields `{ strategy: explanation-only, spec: null }`, exactly matching the pre-Sprint-H fallback behavior.

The contract type is deliberately named `VisualTeachingStrategy`, not `TeachingStrategy`, to avoid any confusion with the pre-existing, unrelated `TeachingStrategy` in `src/lib/school/adaptive/teachingStrategy.ts` (the pedagogical-approach selector feeding the AI system prompt — untouched, orthogonal, part of Concept Detection in Section 1's pipeline trace, lives in a different file). The two can be imported side-by-side without collision.

**Concept Detection vs. Visual Detection** (see `docs/TEACHING_STRATEGY_AUDIT.md` Section 1 for the full trace): these are two distinct, pre-existing pipeline stages, not the same stage renamed. Concept Detection decides *what curriculum topic* this turn is about and shapes Tutor Max's prose via the system prompt; Visual Detection is a narrow, separate regex/keyword pass over the tutor's *finished* text asking only "does this contain a graphable/number-line/geometric/process-flow concept." The Teaching Strategy Engine sits strictly after Visual Detection and does not call Concept Detection this sprint — that remains a documented future opportunity (Section 5), not a current integration.

## 3. Rule System (Task 3 / Task 5 / Task 6)

All rules are pure functions of the already-detected concept (and, for two rules, simple keyword checks on the tutor's own text) — **no AI call, no LLM reasoning**, matching the deterministic style already used by `visualConceptDetector.ts`. The full rationale for each rule lives in `docs/TEACHING_STRATEGY_RULES.md` (Task 5); this table is the quick-reference version.

| Detected concept | Visualization | Interaction | Assessment | Why |
|---|---|---|---|---|
| `null` (nothing detected — simple factual question / definition) | none | off | off | Nothing to show; explanation only |
| `graph` (linear, e.g. `y = mx + b`) | `graph` | **on** | **on** | Pan/zoom always safe; GraphRenderer can derive a live `{m, b}` model to grade against |
| `graph` (non-linear, e.g. quadratic) | `graph` | **on** | **on** | Pan/zoom always safe; assessment intent is on (exploring any equation is worth a check), but the challenge carries no targets — no live numeric model exists for GraphRenderer to grade against without rebuilding its model-extraction logic, which is out of scope this sprint (see Section 6) |
| `number_line` | `number_line` | **on** | off | Dragging highlighted points is always clamped/safe; a deterministic target value/relation/order isn't unambiguously derivable from plain detected numbers, so assessment is deliberately left off rather than guessed |
| `triangle` / `rectangle` / `circle` / `angle` | `geometry` | **on** | **on** only if the text contains a task keyword (`area`, `perimeter`, `circumference`, `measure`) | Drag handles are always bounded/safe; a challenge is only meaningful when the text actually asked for a computation, not a bare shape mention |
| `process_flow` | `process_flow` | **on** | **on** | Reorder mode is the entire reason to show a process diagram; a sequence inherently has a "did you get the order right" check |

**This sprint's one behavior change from the first Sprint H draft**: graph assessment is now unconditionally `true` (previously it was `isLinearEquation(equation)`, i.e. `false` for quadratics). The refined brief explicitly requires "Quadratic equations → graph → interaction → assessment." `deriveChallenge()`'s graph branch was updated to match: linear equations still get a real `{ targetSlope, targetIntercept }` challenge; non-linear equations get an **empty** `challenge: {}` object instead of `null`. `GraphRenderer.tsx` was not touched — its existing `challengeGoalText` computation is empty/falsy when no `targetSlope`/`targetIntercept` are present, so an empty challenge object renders nothing extra. The strategy-level intent ("assessment is on for this graph") is now honest for every graph, while the live, numeric grading UI still only appears where a model can actually be derived — exactly the "no Visual Assessment Layer rebuild" boundary the brief requires.

**Interaction policy in one line**: interaction is on whenever the underlying renderer's drag affordance is unconditionally safe (every Sprint F handle is clamped/bounded and fails closed for unsupported shapes) — which today is *every* visual type that gets selected at all.

**Assessment policy in one line**: assessment is on whenever checking the student's response is meaningful — always for graphs and process flows, conditionally for geometry (task keyword present), never for number lines (no safe way to disambiguate a target number from an illustrative one) or for bare definitional/factual responses (nothing detected at all).

## 4. Demonstration (Task 6)

Ran `planVisualTeaching()` directly against six worked examples plus a control case, using `npx tsx` against the actual module (not hand-typed expectations) — re-run after the quadratic-assessment rule change above:

| Example text (excerpt) | Strategy selected | Visualization | Interaction | Assessment | Resulting spec excerpt |
|---|---|---|---|---|---|
| "A linear equation ... y = 2x + 3 has a slope of 2 and a y-intercept of 3." | graph + interaction + assessment | `graph` | on | on | `{ equation: "y = 2x + 3", interactive: true, challenge: { targetSlope: 2, targetIntercept: 3 } }` |
| "A quadratic equation like y = x^2 - 2x - 3 forms a parabola..." | graph + interaction + assessment | `graph` | on | **on** | `{ equation: "y = x^2 - 2x - 3", interactive: true, challenge: {} }` — assessment intent on, no live target (see Section 3/6) |
| "Integers include positive and negative numbers... compare -3 and 5..." | number_line + interaction | `number_line` | on | off | `{ start: -5, end: 5, highlight: [-3, 5], interactive: true }` |
| "To find the area of a triangle with base 6 and height 4..." | geometry + interaction + assessment | `geometry` (triangle) | on | on | `{ shape: "triangle", base: 6, height: 4, interactive: true, challenge: { targetArea: 12, targetPerimeter: 16 } }` |
| "Explain photosynthesis: plants convert sunlight, water, and CO2..." | process_flow + interaction + assessment | `process_flow` | on | on | `{ title: "Photosynthesis", steps: [...5 steps...], interactive: true, challenge: {} }` |
| "The digestive system breaks down food... mouth, stomach, intestines." | process_flow + interaction + assessment | `process_flow` | on | on | `{ title: "Digestion", steps: [...5 steps...], interactive: true, challenge: {} }` |
| "The capital of France is Paris, a city in Western Europe." | explanation only | none | off | off | `spec: null` |

Every row matches the refined brief's own stated examples exactly: Linear equations → graph + interaction + assessment; Quadratic equations → graph + interaction + assessment; Integers → number line + interaction; Triangle area → geometry + interaction + assessment; Photosynthesis → process flow + assessment; Definitions → explanation only — plus the extra Digestion case exercising the "second process-flow definition" branch.

## 5. Universal Learning Compatibility Review (Task 7 — architecture review only, no implementation)

`selectTeachingStrategy(content, concept)` and `planVisualTeaching(content)` are pure, synchronous functions of `(text, DetectedConcept | null)`. Nothing about their shape is math/science-specific — the same `{ explanation, visualization, interaction, assessment }` output contract generalizes to any domain that can (a) detect a domain concept from text and (b) decide whether showing it, letting the student manipulate it, and grading it would help. No code below is implemented this sprint; this is a forward-looking design review only.

- **Finance**: a future "visual detection" pass over a finance lesson could recognize compound-interest formulas, amortization schedules, or budget breakdowns. The existing `graph` engine already plots arbitrary `y = ...` curves, so a compound-interest formula restated as `y = P(1+r)^x` could, in principle, reuse the *existing* graph engine with zero new rendering code — the strategy layer would simply need a finance-aware Visual Detection rule that recognizes this phrasing and emits the same `GraphConcept` shape Visual Detection already produces. Assessment policy would mirror the linear/non-linear split already established: a recognizable closed-form (e.g. a fixed interest rate) gets a live target, a scenario with too many free variables gets assessment-on-but-targetless, exactly like the quadratic case in Section 3.
- **Programming**: a sequence of code-execution steps (e.g. "first the loop initializes i, then it checks the condition, then it increments") maps naturally onto the *existing* `process_flow` engine — no new rendering needed, only a new Visual Detection rule recognizing "step 1/then/next" language in a code-walkthrough context. Assessment ("did you get the execution order right") is the same reorder-to-correct check `process_flow` already performs for biology/chemistry processes.
- **History**: a sequence of dated events (a causal chain, a timeline of a single event's stages) also maps onto `process_flow` for *ordering* — but a full chronological timeline with absolute dates would need a genuinely new timeline engine, which the brief explicitly forbids building this sprint. The honest answer here is: ordering of qualitative events fits today's `process_flow`; dated/scaled timelines do not fit any existing engine and are out of scope until a future, explicitly-authorized sprint builds one.
- **Engineering**: most diagrams here are either ordered processes (a build/assembly sequence → `process_flow`) or measured shapes (a beam's length/load, a circuit's component values → `geometry`-shaped data, reusing the existing geometry engine's bounded-dimension model). True schematic/circuit diagrams are a new visual type and explicitly out of scope.
- **Medicine**: anatomical/physiological processes (the cardiac cycle, a clotting cascade) are a strong fit for the *existing* `process_flow` engine, identically to photosynthesis/digestion today. Dosage or measurement problems with concrete numbers (e.g. "calculate the dose per kg") could fit the existing `number_line`/numeric-target pattern, with the same assessment-disambiguation caution already documented in `docs/TEACHING_STRATEGY_RULES.md` for plain numbers.

**The common thread**: every domain above either reuses one of the four existing engines (`graph`, `number_line`, `geometry`, `process_flow`) by recognizing domain-specific phrasing during Visual Detection, or it doesn't fit any existing engine and is explicitly flagged as future, separately-authorized work (timelines, circuit diagrams). `selectTeachingStrategy()` itself needs zero changes to support any of the engine-reuse cases — it would simply receive a `DetectedConcept` with the same `kind` tag from a richer future detector and apply the same interaction/assessment rules already documented in Section 3.

## 6. Failure Modes

- **Auto-derived challenge targets equal the spec's own initial correct value.** For graph/geometry, `deriveChallenge()` computes the target from the *same* numbers already in the spec (e.g. a triangle's `targetArea` is computed from that same triangle's own `base`/`height`). This means the challenge is technically "met" the instant it renders, before any drag. This mirrors the existing precedent in `ProcessFlowRenderer` (its `isCorrect` check also compares against the spec's own, assumed-correct order). Deliberately not "fixed" here — generating a deliberately wrong starting value is new exercise-authoring logic beyond this sprint's "routing only" scope.
- **Quadratic (and other non-linear) graph assessment is "on" at the strategy level but targetless.** This sprint changed `selectTeachingStrategy` to set `assessment: true` for every graph per the refined brief, but `GraphRenderer`'s model extraction remains linear-only (unchanged, per "do not rebuild the Visual Assessment Layer"). The result: a quadratic graph is interactive and *intends* to be graded, but shows no live pass/fail readout because no numeric target exists. This is the correct, minimal-blast-radius way to satisfy the brief's literal example without rebuilding the renderer — but it is worth flagging explicitly so a future sprint that extends `GraphRenderer` to extract non-linear models knows exactly where to plug in (`deriveChallenge()`'s graph branch already has the right shape to receive real targets the moment such a model exists).
- **Number-line assessment is off by design, not by gap.** A future sprint could add it (e.g. "place near X" using a number explicitly stated as a target in the text), but doing so safely needs a way to distinguish a target number from an already-correct illustrative number in the same sentence — left as a deliberate non-goal here to avoid guessing.
- **Graph assessment's live target only fires for the exact compact `y = mx + b` form** that `GraphRenderer.tsx`'s own (separately maintained) `LINEAR_RE` matches. `teachingStrategy.ts` deliberately duplicates this regex (commented as intentionally mirrored) rather than importing it, because `GraphRenderer.tsx` is a `'use client'` component and `teachingStrategy.ts` must stay callable from server code (the chat route) with no React dependency.
- **No regression to non-detected lessons.** When `detectVisualConcept` returns `null` (the overwhelming majority of turns), `planVisualTeaching` returns `{ strategy: explanation-only, spec: null }` immediately, identical to the old `buildVisualSpec` returning `null` — zero behavioral change for any non-visual turn.

## 7. Remaining Work (explicitly not done this sprint, by design)

- No timeline engine for absolute-dated history sequences.
- No circuit/schematic engine for engineering diagrams.
- No exercise-perturbation layer to make auto-derived challenges start in an "unmet" state.
- No number-line target disambiguation (target vs. illustrative number in the same sentence).
- No non-linear graph model extraction (quadratic/other curve fitting) in `GraphRenderer` — assessment intent exists at the strategy layer, live grading does not yet.
- No wiring of Concept Detection (curriculum/topic/mastery signals) into `selectTeachingStrategy()` — the function signature already has room for it (an optional extra parameter would not break any caller), but no such parameter was added this sprint since it wasn't requested and isn't needed for the current rule set.
- No new visual engines, simulations, or timelines of any kind — explicitly forbidden by the brief, and not built.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → clean, no errors.
- `npm run build` → succeeded (prisma generate && next build), all routes including `/api/learn/chat` and `/dev/visual-demo` compiled.
- `src/app/dev/visual-demo/VisualDemo.tsx` and every renderer it exercises (Sprint B–G specs) are unchanged on disk — confirmed via `git diff` showing zero changes to any renderer, schema, detector, or builder file; only `route.ts` (one call-site swap, unchanged from the first Sprint H draft), `teachingStrategy.ts` (the quadratic-assessment rule change), and the docs were touched.
- `/api/learn/chat`'s JSON response shape is unchanged (`{ success, text, provider, visual?, visualSpec? }`).
- Manually exercised `planVisualTeaching()` against the seven Section 4 cases via `npx tsx`, confirming both the strategy and the merged spec for each — including the new quadratic-assessment behavior (`challenge: {}` rendering nothing extra in `GraphRenderer`, confirmed by inspecting its existing `challengeGoalText` logic, which was not modified).
- Sprint B–G features (graphs, number lines, geometry, process flows, pan/zoom, drag handles, reorder, and Sprint G's challenge feedback for triangles/rectangles/circles/angles/process flows) are byte-for-byte unchanged and were not re-screenshotted, since no renderer or schema file changed.
