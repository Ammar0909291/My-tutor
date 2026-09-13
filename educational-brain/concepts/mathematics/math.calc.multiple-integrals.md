# math.calc.multiple-integrals

## Identity

- **KG ID**: `math.calc.multiple-integrals`
- **Domain**: Calculus (`math.calc`)
- **Title**: Multiple Integrals
- **Requires**: `math.calc.definite-integral`, `math.calc.multivariable-intro`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 15

## Learning Objective

By the end of this concept, the learner can interpret a double integral
$\iint_R f(x,y)\,dA$ as signed volume, compute it over a rectangular region
as an iterated integral applying Fubini's Theorem to justify swapping
integration order, and set up the correctly variable (function-dependent)
bounds required for a non-rectangular region.

## Core Understanding

`definite-integral` established the single-variable integral as signed
AREA under a curve over an interval. `multivariable-intro` established
functions of several variables with domains in $\mathbb{R}^n$. This concept
combines both: the **double integral** $\iint_R f(x,y)\,dA$ over a region
$R$ extends "area under a curve" to "signed VOLUME between the surface
$z=f(x,y)$ and the $xy$-plane" — the direct two-dimensional analogue.

Computing a double integral over a rectangular region $R=[a,b]\times[c,d]$
proceeds by **iterated integration**: integrate with respect to one
variable first (holding the other fixed, exactly as `multivariable-intro`
treats other variables as constants when computing a partial derivative),
producing a function of the remaining variable, then integrate that result.
**Fubini's Theorem** guarantees that, for $f$ continuous on the rectangle,
either order of integration — $x$ first or $y$ first — yields the identical
final value, a genuine freedom the learner can exploit for computational
convenience.

The concept's central subtlety arises for **non-rectangular regions**: when
$R$ is bounded above by one curve and below by another (rather than fixed
horizontal/vertical lines), the INNER integral's bounds must be expressed
as FUNCTIONS of the outer variable, not constants. For the region between
$y=x^2$ and $y=x$ over $0\le x\le1$, the correct setup is
$\int_0^1\int_{x^2}^{x} f(x,y)\,dy\,dx$ — the bounds $x^2$ and $x$
genuinely change depending on which $x$-slice is being examined, reflecting
the region's actual changing vertical extent.

## Mental Models

**Level 1 (concrete)**: A solid shape — a box-like base with a curved
ceiling $z=f(x,y)$ sitting over it — whose total volume the double integral
computes, exactly as a single integral computes the area of a flat shape
under a curve.

**Level 2 (representational)**: An iterated integral as "peeling off one
variable at a time," treating the other as temporarily fixed, exactly
mirroring the partial-derivative habit of holding all-but-one variable
constant.

**Level 3 (structural)**: Fubini's Theorem as a genuine FREEDOM (order
doesn't matter, for continuous integrands on a rectangle) contrasted with a
genuine CONSTRAINT (a non-rectangular region's inner bounds must track the
region's actual changing shape as functions, not fixed numbers) — two
opposite-feeling rules that both follow from correctly describing the
region being integrated over.

**Level 4 (abstract)**: The double integral (and, by direct extension, the
triple integral for three variables) is the multivariable generalization of
Riemann summation itself — a limit of sums over small pieces of area (or
volume) weighted by $f$'s values, of which the single-variable definite
integral is the one-dimensional special case.

## Why Students Fail

Nearly every worked example a student sees when first learning iterated
integration uses a rectangular region, where BOTH sets of bounds are
constants — so "the inner integral's bounds are just numbers" becomes an
unstated, unexamined default. When a non-rectangular region is introduced,
students continue applying that default (constant bounds) rather than
determining the region's actual boundary curves, producing a setup that
integrates over an entirely different — and generally larger or
differently-shaped — set of points than intended.

## Misconceptions

**MC-1: INNER-INTEGRAL-BOUNDS-ASSUMED-ALWAYS-CONSTANT**
The student believes the inner integral's bounds are always fixed numbers,
missing that a non-rectangular region requires the inner bounds to be
functions of the outer variable. Example: for the region between $y=x^2$
and $y=x$ (for $0\le x\le1$), the student sets up
$\int_0^1\int_0^1(x+y)\,dy\,dx$ — using constant bounds as if the region
were the full unit square — which integrates over an entirely WRONG region,
including points like $(0.5,0.9)$ that lie above the curve $y=x$ and are
not part of the intended region at all.
*Birth type*: Type 1 (overgeneralization). Nearly all introductory worked
examples use rectangular regions, where constant bounds genuinely are
correct — so the default is overgeneralized from the special case
(rectangle) to the general case (any region), rather than being explicitly
flagged as a rectangle-specific simplification.

**MC-2: ORDER-OF-INTEGRATION-ASSUMED-TO-ALWAYS-MATTER**
The student believes swapping the order of integration always changes the
result (or is never permitted), missing Fubini's Theorem's guarantee for
continuous integrands over the correctly re-described region. Example:
distrusting that integrating $x$ first versus $y$ first over
$R=[0,2]\times[0,3]$ for $\iint_R xy\,dA$ could give the identical answer
($9$, verified both ways), or conversely assuming order-swapping is
automatically safe even when a non-rectangular region's bounds have not
been correctly re-expressed for the new order.
*Birth type*: Type 1 (overgeneralization). Most other operations a student
has learned are order-sensitive (subtraction, division, matrix
multiplication later on) — this creates a general caution ("order usually
matters") that gets overgeneralized into distrusting Fubini's genuine
guarantee, or, in the opposite direction, into assuming order-swapping
needs no adjustment to the bounds at all.

**MC-3: REGION-BOUNDARY-CURVES-MISIDENTIFIED-AS-UPPER-OR-LOWER**
The student reverses which curve serves as the upper bound and which as
the lower bound for the inner integral, especially when the two boundary
curves cross or are visually similar in shape. Example: for the region
between $y=\sqrt{x}$ and $y=x^2$, incorrectly treating $y=x^2$ as the upper
bound throughout $[0,1]$ when in fact $y=\sqrt{x}\ge y=x^2$ on that entire
interval.
*Birth type*: Type 2 (perceptual intuition). Without directly testing a
specific value of the outer variable, a quick visual glance at two curves'
general shapes (a parabola looking "smaller" or "flatter" than another
curve) can misleadingly suggest which one sits higher, especially near
points where the curves cross or nearly coincide.

## Analogies

**Best analogy — slicing a loaf of bread with an irregular crust.** A
loaf with a perfectly rectangular cross-section can be sliced with the same
fixed top-and-bottom cut at every position — constant bounds. A loaf with
an irregularly curved crust needs the top-and-bottom cut positions to
CHANGE depending on where along the loaf you're slicing — the crust's
actual height, as a function of position, dictates the bounds at each
slice, exactly as a non-rectangular region's boundary curves dictate the
inner integral's variable bounds.

**Anti-analogy — "just integrate from the smallest to the largest value of
$y$."** This overly literal reading of "bounds," if left unqualified,
actively reinforces MC-1: for a non-rectangular region, "the smallest and
largest $y$-values overall" are usually constants (e.g. $0$ and $1$ for the
$y=x^2$/$y=x$ region), but using THOSE constants as the inner bounds is
exactly the wrong-region error Example 3 demonstrates — the inner bounds
must track the region's boundary AT the specific value of the outer
variable, not the overall extreme values across the whole region.

## Demonstrations

Trace $\iint_R xy\,dA$ over the rectangle $R=[0,2]\times[0,3]$ both ways:
integrating $x$ first gives $\int_0^3\left[\frac{x^2y}{2}\right]_0^2dy=
\int_0^3 2y\,dy=9$; integrating $y$ first gives
$\int_0^2\left[\frac{xy^2}{2}\right]_0^3dx=\int_0^2\frac{9x}{2}\,dx=9$ —
the identical value $9$, confirming Fubini's Theorem's guarantee. Then
trace $\iint_R(x+y)\,dA$ over the non-rectangular region between $y=x^2$
and $y=x$ for $0\le x\le1$ (checking at $x=0.5$: $x^2=0.25<x=0.5$, so $y$
ranges from the lower curve up to the upper curve): the correct setup
$\int_0^1\int_{x^2}^{x}(x+y)\,dy\,dx$ gives, after evaluating the inner
integral to $\frac{3x^2}{2}-x^3-\frac{x^4}{2}$ and then the outer integral,
$\frac{3}{20}$. Contrast this directly with the SAME region set up
incorrectly with constant bounds, $\int_0^1\int_0^1(x+y)\,dy\,dx$ — this
integrates over the full unit square, including points like $(0.5,0.9)$
that lie above $y=x$ and are entirely outside the intended region,
demonstrating the wrong-region consequence of MC-1 concretely.

## Discovery Questions

1. "For a region shaped like a rectangle, are the inner integral's bounds
   always the same two numbers, no matter what the outer variable's value
   is? What about a region with a curved boundary?"
2. "If I compute a double integral by integrating $x$ first, then again by
   integrating $y$ first, should I expect the same answer both times? Under
   what condition does that guarantee hold?"
3. "For two curves that cross somewhere in the region, how would you
   determine — for a SPECIFIC value of the outer variable — which curve is
   actually higher there, rather than guessing from their overall shapes?"

## Teaching Sequence

1. Recall `definite-integral`'s signed-area interpretation and
   `multivariable-intro`'s multi-variable domain framing — both already
   mastered.
2. Introduce the double integral as signed volume, connecting explicitly to
   the single-variable analogue.
3. Work the rectangular-region example fully in both orders, introducing
   Fubini's Theorem and demonstrating the order-independence guarantee.
4. Introduce a non-rectangular region and ask Discovery Question 1 before
   revealing the correct variable-bounds setup, to surface MC-1.
5. Work the correct variable-bounds computation in full.
6. Demonstrate MC-1's failure mode directly by contrasting the correct
   setup against the constant-bounds mistake over the SAME region.
7. Introduce a region with crossing or visually similar boundary curves to
   surface MC-3, having the learner test a specific value of the outer
   variable to determine which curve is actually higher there.

## Tutor Actions

- If the learner sets up constant bounds for a non-rectangular region, ask
  them to sketch (or describe) the region's actual shape at a specific
  value of the outer variable before proceeding.
- If the learner distrusts that swapping integration order gives the same
  answer over a rectangle, have them compute both orders explicitly and
  compare.
- If the learner is unsure which of two boundary curves is the upper
  bound, ask them to plug in one specific value of the outer variable into
  both curves and compare the resulting heights directly.

## Voice Teaching Notes

Introduce non-rectangular regions only after the rectangular case is
solid, and make the transition explicit — "now the region's shape actually
changes as you move across it, so the bounds have to change too." When a
learner reaches for constant bounds on a curved region, do not immediately
correct — ask them to check the region's shape at one specific point first.

## Assessment Signals

- **Early band**: Correctly computes a double integral over a rectangular
  region in one specified order.
- **Middle band**: Correctly computes the same rectangular-region integral
  in the opposite order and confirms the two answers agree, citing Fubini's
  Theorem.
- **Advanced band**: Correctly sets up the variable (function-dependent)
  bounds for a non-rectangular region and explains why constant bounds
  would integrate over the wrong set of points.

## Tutor Recovery Strategy

If the learner has committed MC-1, have them evaluate the region's actual
boundary at one specific value of the outer variable and compare it against
the constant bounds they proposed. If the learner has committed MC-2, have
them compute both integration orders explicitly over the rectangle and
compare the results directly. If the learner has committed MC-3, have them
substitute one specific numeric value of the outer variable into both
boundary curves and compare the resulting heights.

## Memory Hooks

"A rectangle's bounds are numbers; a curved region's bounds are
functions." "Fubini says order is free — but only once the bounds are set
up correctly for that order." "Pick one specific slice and check which
curve is actually on top there."

## Transfer Connections

Extends by one further dimension to the triple integral over a solid
region in $\mathbb{R}^3$ — every core idea here (iterated integration,
Fubini's order-swap guarantee, variable bounds for non-rectangular regions)
carries over directly, with an additional variable and an additional
nested integral. The variable-bounds technique for non-rectangular regions
directly parallels the region-description skill needed for triple integrals
over irregularly shaped solids.

## Cross-Subject Connections

Physics: computing the total mass of a plate with variable density (this
concept's own transfer probe), the center of mass of a two-dimensional
object, or the moment of inertia of a planar shape are all direct double-
integral applications. Engineering: computing the volume of material
removed in machining a curved surface, or the total load on an irregularly
shaped structural plate, use exactly this iterated-integration procedure.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.multiple-integrals.md`
(reused by reference, not restated): LO1's signed-volume interpretation;
LO2's iterated-integral procedure and Fubini's Theorem; LO3's non-
rectangular variable-bounds requirement; Example 1's rectangular both-
orders computation and Example 2's correct variable-bounds setup (reused
above as this entry's own Demonstrations section); Example 3's deliberate
reuse of Example 2's exact region to make the constant-bounds error
concretely checkable; A03's metal-plate-mass transfer probe; and the
Blueprint's own three-misconception classification
(INNER-INTEGRAL-BOUNDS-ASSUMED-ALWAYS-CONSTANT,
ORDER-OF-INTEGRATION-ASSUMED-TO-ALWAYS-MATTER,
REGION-BOUNDARY-CURVES-MISIDENTIFIED-AS-UPPER-OR-LOWER), none of which
carried an explicit birth-type column — all three independently classified
above per this program's standing birth-taxonomy diagnostic procedure.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires` (both prerequisites),
`unlocks` (empty), `cross_links` (empty), `difficulty`, `bloom`,
`mastery_threshold`, and `estimated_hours` all match the live KG exactly,
verified via direct query against `docs/mathematics/kg/graph.json`. This is
the SEVENTH consecutive batch of math.calc entries with zero Blueprint/KG
metadata discrepancy across every concept authored (Batches 43-49), a
streak dating back to the batch after `math.calc.arc-length`'s single
discrepancy in Batch 42.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 49 of the Mathematics
  Educational Brain completion campaign. Third of three concepts in this
  batch. **Self-correction before commit**: an earlier draft of this
  section incorrectly claimed this batch brought `math.calc` to 76/76
  DOMAIN CERTIFIED. Running `scripts/math/state.ts` fresh (per standing
  discipline) showed `eb: 55`, not 76 — `math.calc` is 76 concepts total,
  and this batch closed the topologically-ready frontier (52→55) but 21
  concepts remain, each requiring a prerequisite not yet authored (the
  trigonometric-derivative/integral family, the series/convergence family,
  and the remaining triple-integral/vector-calculus-theorem family —
  `math.calc.double-integrals`, `math.calc.triple-integrals`,
  `math.calc.greens-theorem`, `math.calc.stokes-theorem`,
  `math.calc.divergence-theorem`, and others). `math.calc` is IN PROGRESS,
  not certified — corrected here before commit, matching this program's
  own Batch 27 precedent for catching and fixing exactly this class of
  error before it reached git history.
