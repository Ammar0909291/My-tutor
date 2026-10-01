# math.num.numerical-differentiation

## Identity
- **KG id**: `math.num.numerical-differentiation`
- **Domain**: math.num
- **Requires**: `math.calc.derivative-definition`, `math.num.error-analysis`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Derive the forward difference $f'(x)\approx[f(x+h)-f(x)]/h$ ($O(h)$) and central difference
$f'(x)\approx[f(x+h)-f(x-h)]/(2h)$ ($O(h^2)$) from Taylor expansion; explain that smaller $h$ is
NEVER always better — truncation error decreases as $h\to0$ but ROUNDOFF error increases,
producing an optimal $h^*$; and apply Richardson extrapolation to eliminate the leading error
term, gaining two orders.

## Core Understanding
SMALLER $h$ IS NEVER ALWAYS BETTER — ROUNDOFF ERROR GROWS AS $h\to0$: computing
$[f(1+h)-f(1)]/h$ for $f=\sin$ at $h=10^{-8}$ gives error $\approx10^{-8}$ (near optimal), but at
$h=10^{-15}$, $f(1+h)$ and $f(1)$ become INDISTINGUISHABLE in double precision — the difference
quotient degrades to $0$, NOT $f'(x)$. For $h=10^{-12}$, catastrophic cancellation leaves only
~4 significant digits reliable in the difference, so the quotient has only ~4 digits of accuracy,
never 15. Believing smaller $h$ always reduces error, without realizing roundoff eventually
dominates, misses the finite-precision floor the calculus limit definition never mentions — the
error curve is U-SHAPED: decreasing (truncation dominates) then increasing (roundoff dominates)
as $h\to0$.

FORWARD AND CENTRAL DIFFERENCE HAVE GENUINELY DIFFERENT ACCURACY ORDERS — NEVER THE SAME: from
Taylor expansion, forward difference has truncation error $(h/2)f''(\xi)=O(h)$ — doubling $h$
DOUBLES the error. Central difference (subtracting the Taylor expansions of $f(x+h)$ and $f(x-h)$)
has truncation error $(h^2/6)f'''(\xi)=O(h^2)$ — halving $h$ QUARTERS the error. At $h=0.01$ for
$f=\sin$ at $x=1$: forward error $\approx4.2\times10^{-3}$; central error $\approx5.6\times10^{-6}$
— the central difference is 750× MORE accurate at the SAME step size, at the cost of one extra
function evaluation. Assuming both formulas have the same accuracy since both approximate the
same derivative misses this genuine $O(h)$-versus-$O(h^2)$ distinction, visible only from the
Taylor expansion.

RICHARDSON EXTRAPOLATION ELIMINATES THE LEADING ERROR TERM — GAINING TWO ORDERS FOR FREE: if
$D(h)=f'(x)+ch^2+O(h^4)$ (central difference), then $D(h/2)=f'(x)+c(h/2)^2+O(h^4)$. Solving these
two equations to eliminate the $ch^2$ term: $[4D(h/2)-D(h)]/3=f'(x)+O(h^4)$ — a 4th-order formula
at the cost of two extra function evaluations, NEVER requiring a fundamentally new method.

## Mental Models
- **"The derivative's limit definition is exact in exact arithmetic — but floating-point has a
  precision floor the limit never accounts for, and going below it makes things worse, never
  better."**
- **"Central difference isn't just 'the other formula' — it's a genuinely higher accuracy order,
  quartering error where forward only halves it."**
- **"Richardson extrapolation combines two approximations at different step sizes to cancel out
  the leading error term — a free upgrade, never a new derivation."**

## Why Students Fail

### MC-1: SMALLER-H-ALWAYS-BETTER
- **Surface form**: keeps decreasing $h$ to reduce error, not realizing roundoff error grows as
  $h\to0$ and eventually dominates; tries $h=10^{-15}$ and gets a result of 0.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — the derivative is
  defined as a limit as $h\to0$, and the finite-precision floor is never mentioned in the calculus
  definition).
- **Repair**: re-demonstrate the U-shaped error curve, confirming the optimal $h^*\approx\sqrt u$
  (forward) or $u^{1/3}$ (central).

### MC-2: FORWARD-AND-CENTRAL-DIFFERENCE-SAME-ACCURACY
- **Surface form**: assumes both formulas have the same accuracy since both approximate the same
  derivative.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — both are called
  "finite difference approximations" with no immediately visible difference).
- **Repair**: re-derive the $O(h)$ versus $O(h^2)$ distinction from the Taylor expansion,
  confirming the 750× accuracy gap at $h=0.01$.

### MC-3: NUMERICAL-DERIVATIVE-CONVERGES-TO-EXACT
- **Surface form**: expects the numerical formula always converges to the exact derivative as
  $h\to0$, ignoring catastrophic cancellation of $f(x+h)-f(x)$ for small $h$.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — the limit is defined
  as $h\to0$, and the transition from exact arithmetic to finite precision is not emphasized).
- **Repair**: re-plot the error curve, confirming it diverges from the exact-arithmetic limit
  below the optimal $h^*$.

## Misconceptions

### MC-1: SMALLER-H-ALWAYS-BETTER
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: FORWARD-AND-CENTRAL-DIFFERENCE-SAME-ACCURACY
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: NUMERICAL-DERIVATIVE-CONVERGES-TO-EXACT
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Shrinking h is like zooming a camera closer and closer — past a certain point, sensor noise
  (roundoff) swamps the image, never revealing more detail."**
- **Anti-analogy**: the numerical derivative isn't a faithful shadow of the exact limit all the
  way down to h=0 — it's a good approximation only in a middle range, diverging again at both
  extremes.

## Demonstrations
- **Demonstration 1 (targets MC-1/MC-3)**: the $h=0.1\to10^{-7}\to10^{-15}$ error table for
  $f=\sin$ at $x=1$, showing the U-shaped curve and catastrophic failure at $h=10^{-15}$.
- **Demonstration 2 (targets MC-2)**: the forward-versus-central 750×-accuracy-gap comparison at
  $h=0.01$.
- **Demonstration 3**: the Richardson extrapolation derivation, $[4D(h/2)-D(h)]/3=f'(x)+O(h^4)$.

## Discovery Questions
1. "If you keep shrinking h toward machine epsilon, does the error keep shrinking too?"
2. "Do forward and central difference formulas have the same order of accuracy?"
3. "Can you combine two central-difference approximations at different step sizes to get a
   higher-order result without deriving a new formula from scratch?"

## Teaching Sequence
1. **Representation shift**: the four-representation derivation (limit, Taylor, error formula,
   table), working Demonstration 1, isolating MC-1 and MC-3.
2. **Pattern induction**: the order-of-accuracy gallery, working Demonstration 2, isolating MC-2.
3. **Misconception detector**: the optimal-step-size gate question, isolating MC-1.
4. **Reused procedure**: the Richardson extrapolation derivation, working Demonstration 3.
5. **Mastery gate**: require a correct Taylor-based derivation of both difference formulas, a
   correct optimal step-size estimate, and a correct Richardson-extrapolated formula, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that shrinking $h$ indefinitely always reduces error.
- Never accept forward and central difference treated as equally accurate.
- Never accept the numerical derivative assumed to converge to the exact value at arbitrarily
  small $h$.

## Voice Teaching Notes
- Say "what happens to roundoff error as h gets smaller — does it vanish too?" whenever a step
  size is being chosen.
- Ask "is this the O(h) formula or the O(h²) formula — and how do you know?" whenever a
  finite-difference formula is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the forward and central difference formulas
  from Taylor expansion.
- **Rung 2 (application)**: learner correctly estimates the optimal step size balancing
  truncation and roundoff error.
- **Rung 3 (transfer)**: learner correctly derives and evaluates the complex-step derivative,
  explaining why it avoids cancellation error entirely.

## Tutor Recovery Strategy
- If MC-1 or MC-3 recur, re-demonstrate the U-shaped error curve.
- If MC-2 recurs, re-derive the $O(h)$-versus-$O(h^2)$ distinction from Taylor expansion.

## Memory Hooks
- "Smaller h isn't always better — roundoff takes over below the optimal h*."
- "Central difference quarters error when halving h; forward only halves it."
- "Richardson extrapolation cancels the leading error term — a free upgrade, never a new
  method."

## Transfer Connections
- `math.calc.derivative-definition` (already authored, certified domain): supplies the exact
  limit definition this concept's finite-difference formulas approximate.
- `math.num.error-analysis` (already authored, this campaign, Batch 217): supplies the roundoff-
  versus-truncation framework and condition-number reasoning this concept's optimal-step-size
  analysis directly applies.

## Cross-Subject Connections
- Scientific computing and optimization: estimating a Jacobian matrix for a black-box numerical
  code via forward or central differences (or Richardson-extrapolated variants) is a standard
  practical technique when analytic derivatives are unavailable.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.numerical-differentiation.md`, reused
  by reference for its four-representation Taylor derivation, its order-of-accuracy gallery, its
  optimal-step-size gate question, its Richardson extrapolation derivation, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on the complex-step derivative,
  deriving it from a Taylor expansion with imaginary perturbation and explaining its absence of
  cancellation error.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.calc.derivative-definition`/`math.num.error-analysis`, unlocks none, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 218): authored. First entry this batch. Companion batch concept:
  `math.num.lu-factorization`.
