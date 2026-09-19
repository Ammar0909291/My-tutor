# math.de.euler-method

## Identity
- **KG id**: `math.de.euler-method`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`, `math.de.ivp`
- **Unlocks**: none
- **Cross-links**: `math.num.euler-method`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Execute Euler's method $y_{n+1}=y_n+h\,f(x_n,y_n)$ by hand for an IVP, RE-EVALUATING the slope at
each new point before every step (never freezing it at the initial value); explain why per-step
(local) error is $O(h^2)$ but GLOBAL error is only $O(h)$ — because halving $h$ quarters each
step's error while DOUBLING the number of compounding steps, so halving $h$ roughly HALVES total
error (never quarters it); and compare an Euler approximation against an exact solution, verifying
the halving behavior numerically and the systematic UNDERSHOOT direction for a convex solution.

## Core Understanding
THE SLOPE MUST BE RE-EVALUATED AT EVERY NEW POINT — NEVER FROZEN AT THE INITIAL VALUE: for
$y'=x+y,y(0)=1,h=0.1$: step 0 uses $f(0,1)=1$, giving $y_1=1.1$; step 1 uses the NEW slope
$f(0.1,1.1)=1.2$, giving $y_2=1.22$; step 2 uses $f(0.2,1.22)=1.42$, giving $y_3=1.362$. Freezing
the slope at the initial $f(0,1)=1$ throughout would instead give the plainly different, much
worse $1+3(0.1)(1)=1.3$ — the method's entire intelligence lives in this per-row re-evaluation.

PER-STEP ERROR IS $O(h^2)$ BUT GLOBAL ERROR IS ONLY $O(h)$ — HALVING $h$ HALVES, NEVER QUARTERS,
THE TOTAL ERROR: within one step, the tangent line matches the true solution's value and slope at
$x_n$, so the disagreement is the curvature term $\frac{h^2}{2}y''(\xi)$ — local error $O(h^2)$.
Reaching $x=b$ from $x_0=a$ takes $N=(b-a)/h$ steps; compounding $N$ errors of size $O(h^2)$
gives total $O(N\cdot h^2)=O(h)$ — ONE power of $h$ is lost exactly because the step COUNT grows
as $h$ shrinks. For $y'=y,y(0)=1$ approximating $e\approx2.71828$: with $h=0.5$, error is
$0.46828$; with $h=0.25$, error is $0.27687$ — ratio $\approx0.59$, roughly HALVED, emphatically
NOT quartered.

EULER'S OUTPUT IS AN APPROXIMATION WITH A SYSTEMATIC ERROR DIRECTION — NEVER THE EXACT VALUE: both
$h=0.5$'s $2.25$ and $h=0.25$'s $2.44141$ are BELOW the true $e\approx2.71828$ — a genuine
UNDERSHOOT, because $e^x$ is convex (slope increasing across every step), so the frozen
left-endpoint slope is always too small for the whole step. Different $h$ values give different
numbers, and NEITHER is "the answer" — both carry visible, measurable, systematically-directed
error.

## Mental Models
- **"Euler's method is slope-field tangent-following turned into arithmetic — follow the CURRENT
  local slope for one step, then re-check the new local slope before the next."**
- **"Halving the step size quarters each step's error but doubles how many steps compound it —
  net effect: total error only halves."**

## Why Students Fail

### MC-1: EULER-OUTPUT-ASSUMED-EXACT
- **Surface form**: treats the method's computed $y$-values as the solution's exact values,
  missing that they are step-size-dependent approximations with accumulating, directed error.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a clean numeric table
  output feels authoritative, obscuring that it's an approximation carrying visible error).
- **Repair**: re-walk the two different-$h$ approximations against the exact $e$, both carrying
  measured but different errors.

### MC-2: SLOPE-ASSUMED-FROZEN-FROM-INITIAL-POINT
- **Surface form**: computes $f$ once at $(x_0,y_0)$ and reuses that slope for every step, instead
  of re-evaluating at each new point, collapsing the method into a single straight line.
- **Birth type**: High severity (Blueprint's own declared severity — reusing an already-computed
  value feels efficient, missing that the whole method's accuracy depends on re-checking).
- **Repair**: re-walk the $y'=x+y$ table's per-row slope column, contrasting with the
  frozen-slope straight line $1.3$ it would otherwise produce.

### MC-3: LOCAL-ERROR-ORDER-ASSUMED-GLOBAL
- **Surface form**: believes halving $h$ quarters the FINAL error (from the per-step $O(h^2)$),
  missing that the doubled step count reduces the compounded global order to $O(h)$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the per-step order feels
  like it should directly transfer to the overall result).
- **Repair**: re-walk the step-count compensation argument and the measured $\approx0.59$ error
  ratio for $y'=y$.

## Misconceptions

### MC-1: EULER-OUTPUT-ASSUMED-EXACT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SLOPE-ASSUMED-FROZEN-FROM-INITIAL-POINT
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: LOCAL-ERROR-ORDER-ASSUMED-GLOBAL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Euler's method is like walking by looking only at your feet — you follow the ground's current
  slope for one short stride, then look again before the next, never trusting the very first
  glance for the whole hike."**
- **Anti-analogy**: doubling accuracy per step (halving h) does NOT double overall accuracy — you
  pay for a more accurate step with twice as many steps, netting only half the total error.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the $y'=x+y,y(0)=1,h=0.1$ three-step table, spotlighting the
  re-evaluated slope column.
- **Demonstration 2 (targets MC-3)**: the local-$O(h^2)$-to-global-$O(h)$ derivation via the
  $N=(b-a)/h$ step count.
- **Demonstration 3 (targets MC-1)**: the $y'=y,y(0)=1$ comparison against exact $e$, at two
  step sizes, both undershooting with the measured $\approx0.59$ error ratio.

## Discovery Questions
1. "At step 3 of the table, which point's slope goes into the update — the initial slope, or the
   slope at where we are now?"
2. "If halving the step size makes each individual step four times more accurate, why isn't the
   final answer four times more accurate?"
3. "Is the value in the final row of an Euler table the solution's actual value at that point?"

## Teaching Sequence
1. **Representation shift**: the update rule as arithmetic tangent-following, working
   Demonstration 1, isolating MC-2.
2. **Conflict evidence**: the local-versus-global error order derivation, working
   Demonstration 2, isolating MC-3.
3. **Contrast pair**: the approximation-with-direction framing, working Demonstration 3,
   isolating MC-1.
4. **Mastery gate**: require a correct multi-step Euler table with per-row re-evaluation, a
   correct explanation of the local-to-global error order, and a correct measured comparison
   against an exact solution identifying the undershoot direction, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept an Euler approximation's output treated as the solution's exact value.
- Never accept a slope computed once at the initial point and reused for every subsequent step.
- Never accept a claim that halving the step size quarters the total (global) error.

## Voice Teaching Notes
- Say "which point's slope are you using for this step — the one you started with, or the one
  you're at now?" whenever an Euler step is computed.
- When step size is halved, ask "does the total error quarter, or roughly halve?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly executes multiple Euler steps with per-row slope
  re-evaluation.
- **Rung 2 (application)**: learner correctly explains why local $O(h^2)$ error becomes global
  $O(h)$ error.
- **Rung 3 (transfer)**: learner correctly predicts the undershoot/overshoot direction for a
  convex/concave solution and estimates the effect of halving the step size on total error.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the two-approximations-versus-exact-value comparison.
- If MC-2 recurs, re-walk the per-row slope re-evaluation table.
- If MC-3 recurs, re-derive the local-to-global error order via the step-count argument.

## Memory Hooks
- "Re-evaluate the slope at every new point — never freeze it from the start."
- "Halving h quarters each step's error but doubles the step count — net effect: total error only
  halves."
- "Euler's output is an approximation with a direction of error, never the exact answer."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the ODE solution
  concept and the exact-solution techniques used for comparison.
- `math.de.ivp` (already authored, this campaign, Batch 146): supplies the initial-value data
  package this method starts from.
- `math.de.slope-field` (already authored, this campaign, Batch 149, KG's declared related
  concept): supplies the visual tangent-following picture this concept formalizes into arithmetic.
- `math.num.euler-method` (not yet authored, formal KG cross-link): the numerical-analysis-side
  treatment (convergence theory, stability); this entry's transfer probe stays independence-mode
  until that concept is authored, per the Blueprint's own deferral note.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.euler-method.md`, reused by reference for
  its three-step worked table, its local-to-global error derivation, its exact-solution comparison
  for $y'=y$, and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe (deferred cross-link to
  `math.num.euler-method`), applying Euler's method to a firmware-based cooling-machine
  temperature model.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`/`math.de.ivp`, unlocks none, cross_links `math.num.euler-method`,
  advanced/apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the
  live KG and matches exactly. `math.num.euler-method` confirmed not yet authored, consistent
  with the Blueprint's own independence-mode deferral note.

## Version History
- 2026-09-19 (Batch 150): authored. First entry this batch. Companion batch concept:
  `math.de.second-order-linear`.
