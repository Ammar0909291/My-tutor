# Teaching Strategy Rules — Educational Policy (Sprint H, Task 5)

This document is the human-readable policy behind `selectTeachingStrategy()`
in `src/lib/visuals/teachingStrategy.ts`. It exists so the deterministic
rules are reviewable as pedagogy, not just as code. No rule here calls an
LLM or reads a prompt — every decision is a plain function of the
already-detected concept (and, for two rules, a keyword check on the
tutor's own text).

## When to use each visual engine

| Engine | Use when | Do NOT use when |
|---|---|---|
| `graph` | The tutor's text states an equation in `y = ...` form (linear or non-linear) — slope/intercept discussions, parabolas, any plotted function. | The text merely mentions a number or coordinate without an equation (e.g. "she scored 5 out of 10") — no equation, no graph. |
| `number_line` | The text compares, orders, or places integers/rationals on a line (e.g. "compare -3 and 5"). | The numbers are quantities, not positions/comparisons (e.g. "there are 5 planets") — a bare count isn't a number-line concept. |
| `geometry` | The text names a shape (triangle/rectangle/circle/angle) with at least one concrete dimension. | The shape is mentioned abstractly with no dimensions to draw (e.g. "triangles have three sides" with no numbers) — Visual Detection itself won't fire here, so the strategy layer never sees it. |
| `process_flow` | The text describes a fixed, ordered sequence of named stages that has a known curriculum definition (photosynthesis, digestion, water cycle, etc.). | The text is a one-off list with no canonical order, or describes a single event rather than a sequence. |
| *(none — explanation only)* | The response is a definition, a fact, or doesn't match any of the above (e.g. "the capital of France is Paris"). | — |

## When to enable interaction

**Rule of thumb: interaction is on whenever the chosen engine's drag affordance is unconditionally safe.** Every Sprint F renderer handle is already clamped/bounded and fails closed for unsupported shapes, so today interaction is **on for every engine that gets selected at all** — there is currently no engine for which dragging is unsafe.

- **On**: graph (pan/zoom, plus drag handles on a recognized linear model), number_line (dragging highlighted points, always clamped to the visible range), geometry (drag handles always bounded to the shape's own valid range), process_flow (reorder mode is the entire reason to show the diagram).
- **Off**: only when `visualization` itself is `null` — there is nothing to interact with. Interaction is never decoupled from "is there a visual at all" today; a future sprint could introduce a visual-but-static case (e.g. a finished worked example shown for reference only), but no such case exists yet.

## When to enable assessment

**Rule of thumb: assessment is on when checking the student's answer is meaningful, even if no live numeric target exists yet.**

- **Graph**: always on. Exploring any equation — linear or not — is worth a "did you find something" check. A *live, numeric* target (slope/intercept) only exists for the compact linear `y = mx + b` form GraphRenderer itself can parse; for non-linear equations the challenge object carries no targets (empty), so the student still sees the interactive graph but no live pass/fail readout. This is a known, documented limitation (see the Sprint H report's Failure Modes), not a guess at a non-existent target.
- **Number line**: off, by design, not by gap. Comparing/placing numbers can be either "show this is true" (illustrative) or "find this value" (a real task), and the same sentence often contains both an illustrative number and what looks like a target — there is no safe, deterministic way to tell them apart without guessing. Left off until a future sprint can disambiguate target vs. illustrative numbers from the text itself.
- **Geometry**: on only when the text contains an explicit task keyword (`area`, `perimeter`, `circumference`, `measure`). A bare shape mention ("a triangle has three sides") doesn't imply the student is meant to compute anything; a sentence that says "find the area..." does.
- **Process flow**: always on. A sequence inherently has a "did you get the order right" check — there is no version of "explain a process" that doesn't imply "and here's the right order," so assessment is never ambiguous here.
- **Explanation only (`visualization: null`)**: assessment is always off — there is no visual to grade.

## When NOT to use any of the above

- **No detected concept at all.** If `detectVisualConcept()` returns `null`, the strategy is always `{ visualization: null, interaction: false, assessment: false }` — explanation only. This is the overwhelming majority of real tutor turns (most responses are prose with no graph/number-line/geometry/process keyword), and the strategy engine adds zero overhead or risk to those turns.
- **No new visual engine is ever selected.** The strategy can only ever choose among the four existing engines (`graph`, `number_line`, `geometry`, `process_flow`) or `null`. It never invents a fifth.
- **No challenge target is ever guessed from ambiguous text.** Where a safe, unambiguous target can't be derived (number lines; non-linear graph equations), the rule is to leave assessment off (number lines) or on-but-targetless (non-linear graphs) rather than fabricate a plausible-looking but unjustified number.
