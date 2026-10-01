# math.num.numerical-integration

## Identity
- **KG id**: `math.num.numerical-integration`
- **Domain**: math.num
- **Requires**: `math.calc.definite-integral`, `math.num.interpolation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Apply the Trapezoidal Rule ($O(h^2)$) and Simpson's Rule ($O(h^4)$) to approximate
$\int_a^bf(x)\,dx$; recognize more points is NEVER always better — for smooth $f$, excessive $n$
wastes evaluations or amplifies rounding, NEVER improving accuracy indefinitely; recognize
Trapezoid and Simpson's have GENUINELY different accuracy orders, NEVER the same because "both
use endpoints"; and recognize the MIDPOINT rectangle rule is $O(h^2)$, NEVER dismissed as
categorically inaccurate alongside left/right rectangle rules.

## Core Understanding
MORE POINTS IS NEVER ALWAYS BETTER — DIMINISHING RETURNS AND ROUNDING ACCUMULATION SET IN: for
$\int_0^1e^x\,dx$: Trapezoid with $n=10$ gives error $\approx4.2\times10^{-4}$; $n=100$ gives
$\approx4.2\times10^{-6}$; but at $n=10^6$, accumulated rounding error ($\approx n\cdot u\cdot|f|$
from summing $n$ terms) reaches $\approx10^{-10}$, matching the theoretical truncation error —
FURTHER refinement makes accuracy WORSE, not better. Increasing $n$ without limit, believing
Simpson's fast $O(h^4)$ convergence always justifies more points, ignores that beyond a certain
$n$ the returns diminish sharply (for smooth $f$) or rounding/noise begins to dominate — never
assume unlimited refinement helps.

TRAPEZOID AND SIMPSON'S HAVE GENUINELY DIFFERENT ACCURACY ORDERS — NEVER THE SAME BECAUSE "BOTH
USE ENDPOINTS": Trapezoid fits a LINE (degree-1) per subinterval, giving error $O(h^2)$. Simpson's
fits a PARABOLA (degree-2, using the midpoint as a THIRD evaluation point), and by a cancellation
of the odd-order error term, achieves $O(h^4)$ — a genuinely HIGHER order. For $\int_0^1e^{x^2}dx$
to $10^{-6}$ accuracy: Trapezoid needs $n\ge666$; Simpson's needs only $n\ge26$ — a 25× cost
saving. Treating the two rules as equivalent because "both trap the area under a curve" misses
that Simpson's extra midpoint evaluation point is what enables fitting a parabola, delivering the
$O(h^4)$ gain — never merely a cosmetic difference.

THE MIDPOINT RECTANGLE RULE IS $O(h^2)$ — NEVER LUMPED IN WITH THE INACCURATE LEFT/RIGHT RULES:
the LEFT rectangle rule uses $f(x_i)$ (the left endpoint) and is only $O(h)$. The MIDPOINT rule
uses $f((x_i+x_{i+1})/2)$ and achieves $O(h^2)$ — the SAME order as Trapezoid, with a SMALLER
error constant (beating Trapezoid by a factor of 2 for the same number of evaluations). Dismissing
"the rectangle rule" as categorically inaccurate, having only encountered the naive left-rectangle
introduction, misses that the midpoint variant is genuinely competitive with Trapezoid — never
assume all rectangle-rule variants share the left rule's poor $O(h)$ accuracy.

## Mental Models
- **"More points helps only up to a point — beyond diminishing returns or rounding accumulation,
  refining further makes things worse, never better."**
- **"Simpson's extra midpoint evaluation buys a genuinely higher accuracy order — never the same
  order as Trapezoid just because both integrate over the same interval."**
- **"The midpoint rectangle rule is O(h²), just like Trapezoid — never dismissed alongside the
  genuinely inaccurate O(h) left/right rules."**

## Why Students Fail

### MC-1: MORE-POINTS-ALWAYS-BETTER
- **Surface form**: increases $n$ without limit, not realizing that for smooth $f$ the $O(h^4)$
  Simpson error converges fast enough that $n=100$ is already excessive, and for noisy data very
  fine grids amplify noise.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — convergence tables
  always show error decreasing; the diminishing-returns or noise-amplification regime is rarely
  shown).
- **Repair**: re-demonstrate the $n=10\to100\to10^6$ error progression for $\int_0^1e^x\,dx$,
  confirming accuracy stops improving once rounding dominates.

### MC-2: TRAPEZOID-SAME-AS-SIMPSON
- **Surface form**: treats the Trapezoid Rule and Simpson's Rule as equivalent because both use
  the endpoints, not recognizing Simpson uses the midpoint as a third evaluation point achieving
  higher accuracy.
- **Birth type**: language contamination (Blueprint's own declared birth type — "both trap the
  area under a curve" focuses attention on shape rather than the quadrature rule's polynomial
  degree).
- **Repair**: re-derive the $O(h^2)$-versus-$O(h^4)$ distinction, confirming the 25× cost
  advantage for a fixed target accuracy.

### MC-3: RECTANGLE-RULE-IS-WRONG
- **Surface form**: dismisses the midpoint rectangle rule as inaccurate, not knowing it has the
  same $O(h^2)$ error order as Trapezoid and beats left/right rules by a factor of 2.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — the left-rectangle
  rule is introduced as naive and immediately replaced; the midpoint rule is presented later,
  after students have mentally categorized all rectangle rules as "inaccurate").
- **Repair**: re-compute the left-versus-midpoint-versus-Trapezoid error comparison, confirming
  midpoint's $O(h^2)$ order and smaller constant.

## Misconceptions

### MC-1: MORE-POINTS-ALWAYS-BETTER
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: TRAPEZOID-SAME-AS-SIMPSON
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-3: RECTANGLE-RULE-IS-WRONG
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Refining a numerical integral is like sharpening a photo — past a certain resolution, sensor
  noise (rounding) starts degrading the image instead of revealing more detail."**
- **Anti-analogy**: Simpson's Rule isn't "Trapezoid with extra decoration" — the midpoint
  evaluation genuinely changes what polynomial degree is being fit, never a cosmetic addition.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $n=10\to100\to10^6$ diminishing-returns-then-rounding
  progression for $\int_0^1e^x\,dx$.
- **Demonstration 2 (targets MC-2)**: the $\int_0^1e^{x^2}dx$ Trapezoid-$n\ge666$-versus-
  Simpson's-$n\ge26$ cost comparison.
- **Demonstration 3 (targets MC-3)**: the left-versus-midpoint-versus-Trapezoid error comparison
  for $\int_0^1x^2\,dx$.

## Discovery Questions
1. "Does increasing the number of subintervals always improve accuracy, without limit?"
2. "Do Trapezoid and Simpson's Rule have the same order of accuracy, since both use function
   values at interval endpoints?"
3. "Is the midpoint rectangle rule just as inaccurate as the left-rectangle rule?"

## Teaching Sequence
1. **Representation shift**: the four-representation Trapezoidal Rule derivation, isolating the
   error-order groundwork.
2. **Pattern induction**: the convergence gallery (Trapezoid ratio 4, Simpson's ratio 16), working
   Demonstration 2, isolating MC-2.
3. **Misconception detector**: the method-selection gate question, confirming the cost comparison
   for a target accuracy.
4. **Reused procedure**: the diminishing-returns/rounding demonstration, working Demonstration 1,
   isolating MC-1; and the rectangle-rule-variants comparison, working Demonstration 3, isolating
   MC-3.
5. **Mastery gate**: require correct Trapezoid and Simpson's computations with error bounds, a
   correct method selection for smooth-versus-tabulated data, and a correct empirical order
   verification via the convergence ratio test, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept unlimited refinement of $n$ recommended without acknowledging diminishing returns
  or rounding accumulation.
- Never accept Trapezoid and Simpson's Rule treated as equally accurate.
- Never accept the midpoint rectangle rule dismissed as inaccurate alongside the left/right
  rules.

## Voice Teaching Notes
- Say "at what point does adding more subintervals stop helping — or start hurting?" whenever a
  refinement strategy is chosen.
- Ask "is that the O(h²) rule or the O(h⁴) rule — and how do you know?" whenever a quadrature
  rule is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the Trapezoidal Rule and states its error
  order.
- **Rung 2 (application)**: learner correctly determines the required $n$ for Simpson's Rule to
  reach a target accuracy, comparing favorably against Trapezoid.
- **Rung 3 (transfer)**: learner correctly derives Romberg integration as Richardson
  extrapolation applied to Trapezoid approximations.

## Tutor Recovery Strategy
- If MC-1 recurs, re-demonstrate the diminishing-returns/rounding progression.
- If MC-2 recurs, re-derive the $O(h^2)$-versus-$O(h^4)$ distinction.
- If MC-3 recurs, re-compute the rectangle-rule-variants comparison.

## Memory Hooks
- "More points helps only up to a point — rounding accumulation eventually wins."
- "Simpson's extra midpoint buys a genuinely higher order — never the same as Trapezoid."
- "Midpoint rectangle is O(h²), just like Trapezoid — never as bad as the left rule."

## Transfer Connections
- `math.calc.definite-integral` (already authored, certified domain): supplies the exact integral
  this concept's quadrature rules approximate.
- `math.num.interpolation` (already authored, this campaign, Batch 202): supplies the polynomial-
  fitting framework (Lagrange basis, Vandermonde system) Simpson's Rule's parabolic fit directly
  builds on.

## Cross-Subject Connections
- Structural engineering: integrating a stress function measured at unevenly spaced points
  requires choosing between Trapezoid (works on irregular grids) and Simpson's (requires evenly
  spaced pairs), a genuine practical constraint.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.numerical-integration.md`, reused by
  reference for its four-representation Trapezoidal derivation, its convergence gallery, its
  method-selection gate question, its rectangle-rule-variants comparison, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on Romberg integration as Richardson
  extrapolation applied to Trapezoid approximations, deriving equivalence with Simpson's Rule.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.calc.definite-integral`/`math.num.interpolation`, unlocks none, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 220): authored. First entry this batch. Companion batch concept:
  `math.num.splines`.
