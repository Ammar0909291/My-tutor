# Teaching Blueprint: Slope Field (`math.de.slope-field`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.slope-field` |
| name | Slope Field |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.de.first-order-ode` |
| unlocks | `math.de.phase-plane` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — advanced learner already solves first-order ODEs algebraically; the task is a genuinely different, PICTORIAL way of understanding a solution's behavior without solving at all |
| description (KG) | A graphical representation of a first-order ODE by drawing short tangent-line segments at a grid of points $(x,y)$, revealing the qualitative behavior of solutions without solving explicitly. |

## Component 1 — Learning Objectives

- LO1: Construct a slope field for a given first-order ODE $y'=f(x,y)$ by computing $f(x,y)$ (the PRESCRIBED SLOPE) at a grid of sample points and drawing a short line segment of that slope at each point — and correctly recognize that the ODE ITSELF, via `math.de.first-order-ode`'s own $y'=f(x,y)$ form, is DIRECTLY a formula for the slope at every point in the plane, with no solving required to compute it.
- LO2: Sketch an APPROXIMATE solution curve through a given initial point by following the slope field's local tangent directions continuously — and correctly explain WHY this sketch approximates the TRUE solution curve through that point: a genuine solution's graph, by definition, has slope $f(x,y)$ at every point it passes through, EXACTLY matching the slope field's own prescribed directions there.
- LO3: Use a slope field to correctly predict QUALITATIVE long-run behavior (e.g., solutions converging to a constant value, diverging, or oscillating) WITHOUT solving the ODE algebraically — and correctly contrast this qualitative, picture-based understanding against `math.de.first-order-ode`'s own explicit solving techniques (separation of variables, integrating factors, etc.), recognizing slope fields as valuable specifically when an ODE resists those explicit methods.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.first-order-ode` (an ODE of the form $y'=f(x,y)$; solving techniques including separation of variables, integrating factors, exact equations).

## Component 3 — Core Explanation

**The ODE itself IS the slope formula — no solving needed to draw the field**: `math.de.first-order-ode`'s own standard form $y'=f(x,y)$ already SPECIFIES, at every point $(x,y)$ in the plane, exactly what slope any solution curve passing through that point must have. Constructing a slope field means literally EVALUATING $f(x,y)$ at a grid of sample points and drawing a short segment of that computed slope at each — a purely COMPUTATIONAL, algebraic-solving-free procedure, since $f(x,y)$ is directly given by the ODE's own right-hand side.

**Sketching a solution curve means following the local tangent directions continuously**: `math.de.first-order-ode`'s own definition of a solution $y(x)$ requires $y'(x)=f(x,y(x))$ at EVERY point along the curve — meaning the solution's graph must be TANGENT, at every single point it passes through, to the slope field's own prescribed direction there. Sketching an approximate solution through a specific initial point $(x_0,y_0)$ means starting there and continuously drawing a curve that stays tangent to the LOCAL slope-field direction at each point along the way — a direct, visual instantiation of what "solving the ODE" MEANS, without ever writing down an explicit formula.

**Slope fields reveal qualitative behavior even when explicit solving fails or is unnecessary**: `math.de.first-order-ode`'s own explicit techniques (separation of variables, integrating factors, etc.) each require the equation to have a SPECIFIC solvable STRUCTURE — many first-order ODEs simply do not fit any of these patterns, and explicit closed-form solutions may not exist at all (or may be needlessly complicated to extract). A slope field sidesteps this entirely: examining the PATTERN of tangent segments (e.g., segments converging toward a horizontal line, or diverging away from one) reveals qualitative long-run behavior — solutions approaching an EQUILIBRIUM value, diverging to infinity, or oscillating — directly from the PICTURE, without ever needing an explicit formula.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing a slope field by direct computation, breaking MC-1)**: for $y'=x-y$: computing the prescribed slope at several sample points WITHOUT solving the ODE: at $(0,0)$: slope $=0-0=0$ (a horizontal segment); at $(1,0)$: slope $=1-0=1$; at $(0,1)$: slope $=0-1=-1$; at $(2,2)$: slope $=2-2=0$ (horizontal again). Plotting these segments directly at their respective grid points, using ONLY the ODE's own right-hand side $f(x,y)=x-y$ evaluated numerically — confirming LO1's claim that slope-field construction is a purely computational procedure requiring no algebraic solving of the ODE at all.

**Example 2 (LO2 — sketching an approximate solution by following tangent directions, breaking MC-2)**: continuing Example 1's slope field for $y'=x-y$, sketching the approximate solution through $(0,2)$: starting there, the local slope is $f(0,2)=0-2=-2$ (steeply decreasing) — following this direction briefly, then re-checking the NEW local slope at the updated position, and continuing to follow the UPDATED local direction (this is literally Euler's-method-style continuous tangent-following, done visually rather than numerically) — tracing out a curve that STAYS tangent to the slope field everywhere it passes, exactly matching `math.de.first-order-ode`'s own solution definition, without ever solving for an explicit $y(x)$ formula.

**Example 3 (LO3 — reading qualitative long-run behavior directly from the picture, breaking MC-3)**: continuing the SAME slope field for $y'=x-y$: examining the pattern of segments near the line $y=x$ (where $f(x,y)=x-y=0$, giving HORIZONTAL segments): solutions starting ABOVE this line (where $f<0$, segments point downward) get pulled DOWN toward the line; solutions starting BELOW it (where $f>0$, segments point upward) get pulled UP toward it — revealing, directly from the slope field's own pattern (with NO algebraic solving performed), that ALL solutions qualitatively APPROACH the line $y=x$ as $x$ grows — a genuine long-run behavioral prediction obtained purely pictorially, confirming LO3's claimed capability concretely.

## Component 5 — Teaching Actions

### Teaching Action A01 — The ODE's Own Right-Hand Side IS the Slope Formula — Construction Needs No Solving (Primitive P11: Representation Shift)

State: "`math.de.first-order-ode`'s own $y'=f(x,y)$ ALREADY tells you the slope at every point — constructing a slope field is just evaluating this already-given formula at a grid of points and drawing the corresponding segments; there's no algebra to solve." Walk Example 1's direct point-by-point slope computation.

- **MC-1 hook**: ask "does constructing a slope field require first solving the ODE to know what slopes to draw, or can the slopes be computed directly from the ODE's own right-hand side $f(x,y)$?" — a "requires solving first" answer reveals MC-1 (missing that the ODE's own formula already IS the slope, computable directly).

### Teaching Action A02 — A Sketched Solution Must Stay Tangent to the Field Everywhere, Not Just at the Start (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: sketching through $(0,2)$ requires continuously RE-CHECKING and following the LOCAL slope at each new position along the curve, not just the initial slope at $(0,2)$ alone. State: "a genuine solution curve must be tangent to the slope field's own prescribed direction at EVERY point it passes through — not merely start off in the right direction and then wander freely."

- **MC-2 hook**: ask "does sketching an approximate solution curve through a given point only require matching the slope-field direction AT that starting point, or must the curve stay tangent to the field continuously along its entire path?" — an "only at the start" answer reveals MC-2 (missing that tangency must hold at every point along the curve, exactly matching `math.de.first-order-ode`'s own solution definition).

### Teaching Action A03 — Qualitative Long-Run Behavior Is Readable Directly From the Picture, Without Solving (Primitive P06: Contrast Pair)

Contrast the LABORIOUS route of solving $y'=x-y$ explicitly (via an integrating factor, `math.de.first-order-ode`'s own technique) to determine long-run behavior against Example 3's PICTURE-BASED reading of the same conclusion (solutions converge toward $y=x$) directly from the slope field's own pattern. State: "slope fields let you read off qualitative long-run behavior directly from the picture — genuinely useful especially when an ODE resists `math.de.first-order-ode`'s own explicit solving techniques, or when an explicit solution just isn't needed."

- **MC-3 hook**: ask "is reading qualitative long-run solution behavior from a slope field only possible AFTER first solving the ODE explicitly, or can it be done directly from the picture, independent of any explicit solution?" — an "only after solving explicitly" answer reveals MC-3 (missing that slope fields provide genuine qualitative insight without any explicit solving).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $y'=y-x$, compute the prescribed slope at the points $(0,0)$, $(1,0)$, and $(0,1)$, without solving the ODE.
  2. Explain why the segments in your problem-1 slope field are horizontal exactly where $y=x$.
  3. Sketch (in words, describing the qualitative shape) an approximate solution to $y'=y-x$ starting at $(0,3)$, describing how the curve's direction changes as it moves.
  4. For $y'=-y$, examine the slope field's pattern near $y=0$ and predict the qualitative long-run behavior of solutions starting at positive $y$-values, without solving explicitly.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A biologist models a population's growth rate using an ODE $y'=f(t,y)$ that is too complicated to solve explicitly with any of `math.de.first-order-ode`'s own standard techniques (it doesn't fit the separable, linear, exact, or Bernoulli patterns). The biologist still wants to understand qualitatively whether the population will stabilize, grow without bound, or decline, for various starting population sizes. (a) Explain why constructing a slope field for this equation is possible EVEN THOUGH no explicit solution formula can be found. (b) Explain what specific FEATURE of the slope field's pattern (e.g., horizontal segments at certain $y$-values) the biologist should look for to identify potential stabilization points. (c) Explain why sketching several approximate solution curves, starting from several different initial population sizes, gives the biologist a genuinely useful qualitative picture of the model's behavior across different starting conditions, without ever solving the equation explicitly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SLOPE-FIELD-ASSUMED-TO-REQUIRE-SOLVING-FIRST | Believing constructing a slope field requires first solving the ODE, missing that the slopes are computed directly from the ODE's own right-hand side $f(x,y)$ | Foundational |
| MC-2 | SOLUTION-SKETCH-ASSUMED-ONLY-NEEDS-INITIAL-TANGENCY | Believing a sketched solution curve only needs to match the slope field's direction at its starting point, missing that tangency must hold continuously along the entire curve | High |
| MC-3 | QUALITATIVE-BEHAVIOR-ASSUMED-TO-REQUIRE-EXPLICIT-SOLVING | Believing reading qualitative long-run behavior from a slope field requires first solving the ODE explicitly, missing that this can be done directly from the picture | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Slope Field Assumed to Require Solving First") → P41 (detect: ask whether constructing the field requires solving the ODE first) → P64 (conceptual shift: re-walk Example 1's direct point-by-point computation).
- **B02 (targets MC-2)**: P27 (name it: "Solution Sketch Assumed Only Needs Initial Tangency") → P41 (detect: ask whether tangency is only needed at the starting point) → P64 (conceptual shift: re-walk Example 2's continuous tangent-following process).
- **B03 (targets MC-3)**: P27 (name it: "Qualitative Behavior Assumed to Require Explicit Solving") → P41 (detect: ask whether qualitative behavior requires solving explicitly first) → P64 (conceptual shift: re-walk Example 3's direct picture-based reading of convergence toward $y=x$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.first-order-ode` (the standard form $y'=f(x,y)$ this concept's slope computation directly uses, and the solution definition this concept's tangent-following sketch directly instantiates).
- **Unlocks**: `math.de.phase-plane` (extending this concept's single-equation slope-field picture to systems of ODEs, visualized in the phase plane).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 2 with an advanced/understand tag supports the "3 TAs + gate" tier, with LO1 establishing the purely computational construction procedure, LO2 given full depth on the continuous-tangency requirement, and LO3 demonstrating genuine qualitative insight without explicit solving.
- **Division of labor**: `math.de.first-order-ode` already owns the standard form $y'=f(x,y)$ and the full suite of explicit solving techniques (verified by grep — no slope-field or direction-field content found there at all). This concept owns the entirely NEW, genuinely pictorial approach: constructing the field, sketching approximate solutions by tangent-following, and reading qualitative behavior directly from the picture — none of which appear in the prerequisite.
- Examples 1 through 3's deliberate reuse of the SAME equation ($y'=x-y$) across all three worked examples (rather than three unrelated equations) was chosen so the construction (Example 1), the tangent-following sketch (Example 2), and the qualitative-behavior reading (Example 3) all build on a single, increasingly-understood picture, rather than requiring the student to re-orient to a new equation for each learning objective.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.de.phase-plane`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: advanced learner already solves ODEs algebraically; task is a genuinely different pictorial understanding) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
