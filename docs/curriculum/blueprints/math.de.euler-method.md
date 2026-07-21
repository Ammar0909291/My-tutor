# Teaching Blueprint: Euler's Method (`math.de.euler-method`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.euler-method` |
| name | Euler's Method |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.de.first-order-ode`, `math.de.ivp` |
| unlocks | none |
| cross_links | `math.num.euler-method` (blueprint not yet authored — see Component 7) |
| CPA_entry_stage | P (Pictorial) — the learner already OWNS the picture: `math.de.slope-field`'s own solution-sketching (following the local tangent direction briefly, then re-checking the new local slope) is literally this method done visually; entry is through that picture, formalized step by step into the numeric update rule |
| description (KG) | The simplest numerical method for ODEs: step forward in x by h, updating y by y_{n+1} = y_n + h·f(x_n, y_n). Error per step O(h²); global error O(h). |

## Component 1 — Learning Objectives

- LO1: Execute Euler's method by hand for a given IVP $y'=f(x,y),\ y(x_0)=y_0$ (`math.de.ivp`'s own data package): repeatedly apply $x_{n+1} = x_n + h$ and $y_{n+1} = y_n + h\,f(x_n, y_n)$ — RE-EVALUATING the slope $f$ at each new point before every step — organizing the computation in a clean step table.
- LO2: Explain WHY the update rule works (each step follows the tangent line at the CURRENT point for a run of length $h$) and why errors accumulate: the per-step (local) error is $O(h^2)$ but the steps compound over $(b-a)/h$ of them, giving GLOBAL error $O(h)$ — so halving $h$ roughly HALVES the total error, not quarters it.
- LO3: Compare an Euler approximation against the EXACT solution for an IVP solvable by `math.de.first-order-ode`'s own explicit techniques — computing the actual error at a target point for two different step sizes, verifying the roughly-halving global-error behavior numerically, and explaining the systematic direction of the error (undershoot where the true solution curves upward/convex, since the left-endpoint slope is too small for the whole step).

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.first-order-ode` (what a first-order ODE and its solution are; explicit solution techniques for the comparison in LO3) and `math.de.ivp` (the initial-value problem as ODE + initial condition, singling out ONE solution curve — exactly the data Euler's method consumes as its starting point).

## Component 3 — Core Explanation

**Euler's method is `math.de.slope-field`'s own visual tangent-following, turned into arithmetic**: sketching a solution through a slope field means "follow the local tangent direction briefly, then re-check the NEW local slope and repeat" — Euler's method does EXACTLY this with numbers instead of eyes. From the current point $(x_n, y_n)$, the ODE itself prescribes the local slope $f(x_n, y_n)$; following that tangent line for a horizontal run of $h$ changes $y$ by slope × run, giving the update $y_{n+1} = y_n + h\,f(x_n, y_n)$, with $x_{n+1} = x_n + h$. The crucial discipline is RE-EVALUATION: the slope must be recomputed at each NEW point $(x_n, y_n)$ before every step — the method's whole intelligence lives in that re-checking, precisely as the visual sketch re-reads the field after each short advance.

**Each step is a tangent-line approximation, so each step commits a small, quantifiable error**: within one step the method pretends the slope stays FROZEN at its left-endpoint value $f(x_n, y_n)$, while the TRUE solution's slope varies continuously across the step. The gap this freezing creates in one step is $O(h^2)$ (the tangent line matches the solution's value and slope at $x_n$, so the first disagreement enters at the curvature term, proportional to $h^2$) — halve $h$ and each step's error drops by a factor of about FOUR.

**But global error is only $O(h)$, because smaller steps means MORE steps**: reaching a fixed target $x=b$ from $x_0=a$ takes $(b-a)/h$ steps, so halving $h$ quarters the per-step error while DOUBLING the number of steps that commit and compound it — the net effect is total error roughly proportional to $h$ itself: HALVING $h$ roughly HALVES the final error. This is the concept's central quantitative fact, and it also explains the error's systematic DIRECTION: where the true solution is convex (slope increasing), the frozen left-endpoint slope is too small for the whole step, so Euler UNDERSHOOTS — and these undershoots accumulate in the same direction rather than canceling.

## Component 4 — Worked Examples

**Example 1 (LO1 — executing the method with per-step slope re-evaluation, breaking MC-2)**: for $y' = x + y,\ y(0)=1$ with $h=0.1$, three steps in a table:

| $n$ | $x_n$ | $y_n$ | $f(x_n,y_n)=x_n+y_n$ | $y_{n+1} = y_n + 0.1\,f(x_n,y_n)$ |
|---|---|---|---|---|
| 0 | 0.0 | 1.000 | 1.000 | $1.000 + 0.1(1.000) = 1.100$ |
| 1 | 0.1 | 1.100 | 1.200 | $1.100 + 0.1(1.200) = 1.220$ |
| 2 | 0.2 | 1.220 | 1.420 | $1.220 + 0.1(1.420) = 1.362$ |

giving $y(0.3) \approx 1.362$. The slope column is recomputed from the CURRENT $(x_n, y_n)$ at every row — freezing it at the initial value $f(0,1)=1$ would instead give the plainly different (and much worse) $1 + 3(0.1)(1) = 1.3$.

**Example 2 (LO2 — why the rule works and where the error orders come from)**: one step is the tangent line at $(x_n,y_n)$: value and slope match the true solution there, so the true solution $y(x_n+h) = y_n + h\,y'(x_n) + \tfrac{h^2}{2}y''(\xi)$ differs from the Euler update by the curvature term $\tfrac{h^2}{2}y''(\xi)$ — the local error, $O(h^2)$. Reaching $x=b$ takes $N = (b-a)/h$ steps; compounding $N$ errors of size $O(h^2)$ gives total error $O(N \cdot h^2) = O\!\left(\tfrac{b-a}{h} \cdot h^2\right) = O(h)$ — the global order drops one power of $h$ exactly because the step COUNT grows as $h$ shrinks.

**Example 3 (LO3 — measured errors against an exact solution, verifying the halving and the undershoot, breaking MC-1 and MC-3)**: for $y'=y,\ y(0)=1$ (exact solution $y=e^x$, from `math.de.first-order-ode`'s own separation technique), approximating $y(1) = e \approx 2.71828$: with $h=0.5$ (two steps): $y_1 = 1 + 0.5(1) = 1.5$; $y_2 = 1.5 + 0.5(1.5) = 2.25$ — error $2.71828 - 2.25 = 0.46828$. With $h=0.25$ (four steps): each step multiplies by $1.25$, so $y(1) \approx (1.25)^4 = 2.44141$ — error $0.27687$. The error ratio is $0.27687/0.46828 \approx 0.59$ — roughly HALVED (approaching $\tfrac12$ as $h \to 0$), confirming global $O(h)$, and emphatically NOT quartered. Both approximations UNDERSHOOT ($2.25 < 2.44 < 2.718$): $e^x$ is convex (its slope grows across every step), so the frozen left-endpoint slope is always too small — and neither value is "the answer," both are approximations carrying visible, measured error.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Sketch You Already Do, as Arithmetic (Primitive P11: Representation Shift)

State: "`math.de.slope-field`'s own solution-sketching — follow the local tangent briefly, re-check the new local slope, repeat — IS Euler's method; today we replace the eyeball with the update rule $y_{n+1} = y_n + h\,f(x_n,y_n)$ and get numbers out instead of a picture." Walk Example 1's three-step table, spotlighting the slope column's per-row re-evaluation.

- **MC-2 hook**: ask "in step 3 of the table, which point's slope goes into the update — $f(0,1)$ from the start, or $f(0.2, 1.22)$ from where we are NOW?" — a "the initial slope, computed once" answer reveals MC-2 (freezing the slope at the initial point instead of re-evaluating every step, which collapses the method into a single straight line).

### Teaching Action A02 — Halving h Halves (Not Quarters) the Final Error (Primitive P28: Conflict Evidence)

Present Example 3's measured evidence: per-step error is $O(h^2)$, so a learner expecting "halve $h$ → quarter the error" predicts $h=0.25$'s error to be $\approx 0.117$ — but the MEASURED error is $0.277$, almost exactly HALF of $h=0.5$'s $0.468$, not a quarter. State: "halving $h$ quarters each step's error but DOUBLES how many steps compound it — the net is one factor of 2, which is exactly what global $O(h)$ means."

- **MC-3 hook**: ask "if halving the step size makes each individual step four times more accurate, why isn't the final answer four times more accurate?" — an inability to produce the doubled-step-count compensation (or an insistence that the total error does quarter) reveals MC-3 (conflating local $O(h^2)$ with global $O(h)$).

### Teaching Action A03 — The Output Is an Approximation With a Direction, Not the Answer (Primitive P06: Contrast Pair)

Contrast Example 3's Euler values ($2.25$ with $h=0.5$; $2.44141$ with $h=0.25$) against the exact $e \approx 2.71828$ side by side: two different "answers" from the same method, BOTH below the truth. State: "Euler's output depends on $h$ — it's an approximation with a measurable, systematically-directed error (undershoot here, because $e^x$ curves upward and the frozen left-endpoint slope is always too small), not the solution's exact value."

- **MC-1 hook**: ask "the table says $y(0.3) \approx 1.362$ for Example 1 — is $1.362$ the actual value of the solution at $x=0.3$?" — a "yes, that's the value" answer reveals MC-1 (treating Euler output as exact, missing that a different $h$ would produce a different number and both carry error).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $y' = x - y,\ y(0) = 2,\ h = 0.2$: carry out three Euler steps in a table, re-evaluating the slope at each row, and report the approximation to $y(0.6)$.
  2. Explain, using the tangent-line picture, why one Euler step's error is $O(h^2)$ but the global error at a fixed target is only $O(h)$.
  3. For $y' = y,\ y(0)=1$: compute the Euler approximation to $y(1)$ with $h = 0.2$ (five steps, i.e. $(1.2)^5$), find the actual error against $e \approx 2.71828$, and state whether it is an undershoot or overshoot and WHY.
  4. A classmate approximates $y(2)$ for some IVP with $h=0.1$ and gets total error $0.08$. Estimate the error they should expect with $h = 0.05$, and justify the estimate from the global error order.
- **P76 (Transfer Probe, mode = independence — cross-link target `math.num.euler-method` not yet authored; deferral noted in Component 7)**: "An engineer models the temperature $T$ of a cooling machine part with $T' = -k(T - 20)$, $T(0) = 220$, but the firmware cannot solve ODEs symbolically — it can only do arithmetic in a loop every $h$ seconds. (a) Write the exact update line of code (in formula form) the firmware should execute each tick, identifying what must be re-measured or re-computed at every tick and why using the initial cooling rate forever would fail. (b) The engineer halves the tick interval $h$ to improve accuracy and expects the accumulated temperature error after one minute to drop to a quarter; state the realistic expectation and justify it. (c) The part's true temperature curve is convex (cooling fast at first, leveling off). Will the firmware's computed temperatures run systematically above or below the true temperatures? Explain via the frozen-slope-per-step picture."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EULER-OUTPUT-ASSUMED-EXACT | Treating the method's computed $y$-values as the solution's exact values, missing that they are step-size-dependent approximations with accumulating, systematically-directed error | Foundational |
| MC-2 | SLOPE-ASSUMED-FROZEN-FROM-INITIAL-POINT | Computing $f$ once at $(x_0, y_0)$ and reusing that slope for every step, instead of re-evaluating $f(x_n, y_n)$ at each new point — collapsing the method into a single straight line | High |
| MC-3 | LOCAL-ERROR-ORDER-ASSUMED-GLOBAL | Believing halving $h$ quarters the FINAL error (from the per-step $O(h^2)$), missing that the doubled step count reduces the compounded global order to $O(h)$ — halving $h$ only roughly halves total error | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Euler Output Assumed Exact") → P41 (detect: ask whether the table's final value IS the solution's value there) → P64 (conceptual shift: re-walk Example 3's two different-$h$ answers against the exact $e$, both carrying measured error).
- **B02 (targets MC-2)**: P27 (name it: "Slope Assumed Frozen From Initial Point") → P41 (detect: ask which point's slope feeds a mid-table update) → P64 (conceptual shift: re-walk Example 1's slope column, and contrast with the frozen-slope straight line $1.3$ it would otherwise produce).
- **B03 (targets MC-3)**: P27 (name it: "Local Error Order Assumed Global") → P41 (detect: ask what halving $h$ does to the final error) → P64 (conceptual shift: re-walk Example 2's step-count compensation and Example 3's measured $\approx 0.59$ error ratio).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.first-order-ode` (what an ODE solution is; the exact-solution techniques LO3 compares against), `math.de.ivp` (the initial-value data package the method starts from).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: `math.num.euler-method` — checked on disk before authoring: NOT yet authored. $P76_{mode}=$ **independence**, with a deferral note: when `math.num.euler-method` is authored (the numerical-analysis-side treatment — convergence theory, stability, refinement into higher-order methods), its blueprint should carry the cross-link probe back to this concept's ODE-side treatment; this blueprint's P76 stays a real-world independence probe until then.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an advanced/apply tag supports the standard "3 TAs + gate" tier at brisk pacing: LO1 is procedural execution (the concept's KG bloom is apply), LO2 supplies exactly as much error theory as the KG description commits to ($O(h^2)$ per step, $O(h)$ global), and LO3 grounds both in one measured comparison.
- **Division of labor**: `math.de.slope-field` already owns the VISUAL version — its own Example 2 sketches a solution by "following the local tangent direction briefly, then re-checking the NEW local slope," explicitly naming it "Euler's-method-style continuous tangent-following, done visually rather than numerically" (verified by grep; it defers all numerics). This concept owns the numeric algorithm proper: the explicit update rule, the step table, and the error orders. Verified by grep that neither `math.de.first-order-ode` nor `math.de.ivp` contains any numerical-stepping content — the division is clean on all three sides.
- Example 3's system $y'=y$ was chosen deliberately: the exact solution is available from the learner's own prerequisite toolkit, every Euler run reduces to powers of $(1+h)$ (so the arithmetic never obscures the error story), and the convexity of $e^x$ makes the systematic undershoot visible and explainable rather than an unexplained numerical accident.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.num.euler-method` not authored → independence + deferral note) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: entry through slope-field's already-mastered tangent-following picture, formalized into the update rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
