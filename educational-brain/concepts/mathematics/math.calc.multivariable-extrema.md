# math.calc.multivariable-extrema

## Identity

- **KG ID**: `math.calc.multivariable-extrema`
- **Domain**: Calculus (`math.calc`)
- **Title**: Extrema of Multivariable Functions
- **Requires**: `math.calc.gradient`, `math.calc.higher-order-derivatives`
- **Unlocks**: `math.opt.lagrange-multipliers`
- **Cross-links**: `math.opt.lagrange-multipliers`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 8

## Learning Objective

By the end of this concept, the learner can find candidate extrema of a
two-variable function by solving $\nabla f=0$, and classify each candidate
using the Hessian discriminant test $D=f_{xx}f_{yy}-f_{xy}^2$ — correctly
recognizing that $D=0$ is genuinely INCONCLUSIVE (requiring direct
examination of $f$ near the point, not a "weak" or "borderline" verdict),
and that classification must consider the function's full two-dimensional
behavior around a point rather than any single one-dimensional slice through
it.

## Core Understanding

`gradient` established that $\nabla f=0$ is the multivariable generalization
of "$f'(x)=0$" — the condition every candidate extremum must satisfy.
`higher-order-derivatives` established how to compute the four second
partial derivatives $f_{xx}, f_{yy}, f_{xy}, f_{yx}$ (with Clairaut's theorem
guaranteeing $f_{xy}=f_{yx}$ under mild smoothness, providing a useful
cross-check). This concept combines both into a full classification
procedure: find critical points via $\nabla f=0$, then compute the Hessian
discriminant $D=f_{xx}f_{yy}-f_{xy}^2$ at each one.

The single-variable Second Derivative Test (from `local-extrema`) has a
direct multivariable analogue, but with a genuinely new third possibility.
If $D>0$ and $f_{xx}>0$: local minimum. If $D>0$ and $f_{xx}<0$: local
maximum. If $D<0$: the point is a SADDLE — a genuinely new classification
with no single-variable analogue, where the function increases in one
direction and decreases in another simultaneously. And if $D=0$: the test
gives NO information whatsoever — not a weak signal, a complete absence of
one — and the point's true nature must be determined by directly examining
$f$'s values near the critical point.

The concept's central caution, emphasized across all three of its worked
examples, is that classification depends on the function's FULL local
behavior in every direction, not on checking just one direction (one
"slice" through the critical point) and assuming the rest follows. A
function can look like a minimum along one line through a point and a
maximum along a different line through the very same point — this is
exactly the saddle case, and only the full discriminant test (which uses
information from all directions via the mixed partial $f_{xy}$) correctly
identifies it.

## Mental Models

**Level 1 (concrete)**: A mountain pass — walking along the ridge, you're at
a local maximum (the highest point along the ridge line); walking
perpendicular to the ridge, down into the valleys on either side, you're at
a local minimum. The SAME point is simultaneously a peak in one direction
and a valley in another — a saddle.

**Level 2 (representational)**: The Hessian discriminant $D$ as a single
number computed from the three second partial derivatives, playing the same
diagnostic role $f''(x)$ played in one variable — but now with THREE
possible verdicts (min, max, saddle) instead of two, plus a fourth
"inconclusive" state when $D=0$.

**Level 3 (structural)**: Classifying a critical point requires knowledge
about the function's behavior in EVERY direction around that point
simultaneously, not just along one or two convenient slices — a genuinely
higher-dimensional idea that has no shortcut back to single-variable
reasoning, which is exactly why checking only $f_{xx}$ or only one
directional slice is insufficient.

**Level 4 (abstract)**: This concept is the two-variable case of a fully
general theory (extended in linear algebra to eigenvalues of the Hessian
matrix in any number of dimensions) — the sign pattern of $D$ and $f_{xx}$
used here is a low-dimensional shortcut for a definiteness question that,
in higher dimensions, requires the Hessian matrix's full eigenvalue
structure.

## Why Students Fail

Having just learned a clean single-variable rule (positive second
derivative means minimum, negative means maximum, nothing else possible),
students expect the multivariable version to behave the same way — a clean
binary classification with no ambiguous case and no need to consider more
than one piece of second-derivative information. The genuinely new
possibilities this concept introduces (a saddle point, and a test that can
be flatly inconclusive) both violate that expectation, and both require
the learner to accept that "checking one number" ($f_{xx}$ alone, or a
single directional slope) is not enough in two dimensions the way it was in
one.

## Misconceptions

**MC-1: D-EQUALS-ZERO-ASSUMED-CONCLUSIVE**
The student computes $D=0$ at a critical point and treats it as a weak or
borderline result — reporting a tentative classification (often
"probably a saddle" or "probably still an extremum") rather than
recognizing the test has genuinely failed to give any information at all.
Example: for $f(x,y)=x^4+y^4$ at $(0,0)$, direct computation gives $D=0$
(the test provides NO information), yet direct inspection shows
$f(x,y)\geq0$ everywhere with $f(0,0)=0$ — proving $(0,0)$ IS genuinely a
minimum, a fact the discriminant test itself cannot establish.
*Birth type*: Type 1 (overgeneralization). In the single-variable Second
Derivative Test, $f''(x)=0$ is ALSO inconclusive — but that fact is often
taught briefly and treated as a rare edge case, so students overgeneralize
"inconclusive means I should still make my best guess from the number I
have" from other zero-valued tests they may have seen work that way in
different contexts (e.g., a discriminant of zero in the quadratic formula
DOES give a genuine, specific answer — a repeated root — which primes the
expectation that "$D=0$" should still mean SOMETHING specific here too).

**MC-2: SINGLE-HESSIAN-ENTRY-CHECKED-ALONE**
The student checks only $f_{xx}$ (or only $f_{yy}$) at a critical point and
classifies based on its sign alone, without computing the full discriminant
$D=f_{xx}f_{yy}-f_{xy}^2$ or considering the mixed partial $f_{xy}$ at all.
*Birth type*: Type 1 (overgeneralization). This is a direct transplant of
the single-variable habit — "check the sign of the second derivative" — into
a setting with three second-derivative quantities instead of one, without
recognizing that the mixed partial $f_{xy}$ carries genuinely new
information (about how the function twists between the two axis
directions) that $f_{xx}$ and $f_{yy}$ alone cannot capture.

**MC-3: SINGLE-DIRECTIONAL-SLICE-ASSUMED-SUFFICIENT**
The student examines the function's behavior along just one line through
the critical point (often the $x$-axis direction, $y=0$, or the $y$-axis
direction, $x=0$) and classifies the point based on that single slice,
assuming the behavior in other directions must be the same. Example: for
$g(x,y)=x^2-y^2$ at $(0,0)$, the slice along $y=0$ gives $g(x,0)=x^2$, which
looks like a minimum; the slice along $x=0$ gives $g(0,y)=-y^2$, which looks
like a maximum — the two slices give CONTRADICTORY verdicts, and only the
full discriminant test ($D=-4<0$) correctly identifies the point as a
SADDLE, resolving the contradiction the single-slice approach could not
even detect.
*Birth type*: Type 1 (overgeneralization). This is the identical
one-dimension-into-two-dimensions overgeneralization mechanism already
documented for `multivariable-intro`'s own MC-1
(SINGLE-PATH-LIMIT-ASSUMED-SUFFICIENT) — there, checking a limit along only
one path was mistaken for checking it in every direction; here, checking
behavior along only one directional slice through a critical point is
mistaken for checking the function's full local behavior. Both misconceptions
share the same root cause: single-variable calculus never required
considering "direction" as a separate variable, so the very idea that a
function's behavior could differ from one direction to another is a
genuinely new structural feature of multivariable functions that has to be
explicitly taught rather than assumed absent.

## Analogies

**Best analogy — feeling a saddle by hand.** Running a hand along the front-
to-back line of a horse saddle, it curves downward on both sides (a local
minimum along that line). Running a hand along the side-to-side line at the
very same point, it curves upward on both sides (a local maximum along that
line). The physical saddle shape makes vivid that BOTH of these can be true
about the same single point — nothing contradictory is happening, it's
simply a shape neither pure "minimum" nor pure "maximum" can describe alone.

**Anti-analogy — "just find where it's flat and check if it curves up or
down."** This one-variable phrasing, if imported unmodified, directly
reinforces MC-2 and MC-3: "curves up or down" implicitly assumes there is
only ONE direction to check curvature in, when the entire point of this
concept is that curvature can differ by direction and a single check is
insufficient.

## Demonstrations

Trace all three of this concept's central worked examples in sequence, each
demonstrating a different failure mode. (1) $f(x,y)=x^3-3xy+y^3$: critical
points at $(0,0)$ and $(1,1)$; at $(1,1)$, $f_{xx}=6$, $f_{yy}=6$,
$f_{xy}=-3$ (Clairaut-verified consistent with $f_{yx}$), giving
$D=(6)(6)-(-3)^2=36-9=27>0$ and $f_{xx}=6>0$, so $(1,1)$ is a local minimum —
the "clean" case, working exactly as the single-variable analogy would
predict. (2) $f(x,y)=x^4+y^4$ at $(0,0)$: $D=0$ exactly (breaks MC-1), yet
direct inspection ($f\geq0$ everywhere, equal to zero only at the origin)
proves $(0,0)$ is genuinely a minimum — demonstrating that "inconclusive"
truly means no information, not "probably an extremum." (3)
$g(x,y)=x^2-y^2$ at $(0,0)$: the two single-directional slices give
opposite-signed verdicts (breaks MC-3), while the full discriminant
$D=(2)(-2)-0^2=-4<0$ correctly and unambiguously identifies a SADDLE.

## Discovery Questions

1. "If checking the function along the $x$-direction alone suggests a
   minimum, and checking it along the $y$-direction alone suggests a
   maximum — at the very same point — what could that mean about the
   point's true shape?"
2. "If $D=0$ at a critical point, does that tell you the point IS an
   extremum, IS a saddle, or tells you nothing at all? How would you find
   out its true nature?"
3. "In one-variable calculus, you only ever checked one number,
   $f''(x)$, to classify a critical point. In two variables, why might one
   number not be enough anymore?"

## Teaching Sequence

1. Recall `gradient`'s $\nabla f=0$ condition as the multivariable analogue
   of "$f'(x)=0$" — already mastered.
2. Recall `higher-order-derivatives`'s procedure for computing all four
   second partials, plus Clairaut's theorem's cross-check that
   $f_{xy}=f_{yx}$.
3. Introduce the Hessian discriminant $D=f_{xx}f_{yy}-f_{xy}^2$ and its
   THREE-way classification rule ($D>0,f_{xx}>0\Rightarrow$min;
   $D>0,f_{xx}<0\Rightarrow$max; $D<0\Rightarrow$saddle).
4. Work through Example 1 ($f(x,y)=x^3-3xy+y^3$ at $(1,1)$) as the "clean"
   case matching single-variable intuition.
5. Demonstrate MC-3 directly using $g(x,y)=x^2-y^2$: show the two
   contradictory single-slice verdicts BEFORE revealing the discriminant
   test's unambiguous saddle classification.
6. Demonstrate MC-1 directly using $f(x,y)=x^4+y^4$: compute $D=0$,
   emphasize this means NO information, then resolve the true classification
   by direct inspection rather than by "guessing from the discriminant."
7. Apply to a composite problem (engineering stress-modeling style)
   requiring classification of multiple critical points, including at least
   one $D=0$ case and one saddle case, in the same problem.

## Tutor Actions

- If the learner reports a classification based on checking only $f_{xx}$,
  ask them to also compute $f_{yy}$ and $f_{xy}$ before concluding anything.
- If the learner reports "$D=0$ so it's probably still an extremum" (or
  "probably a saddle"), stop and ask directly: "what does $D=0$ actually
  tell you — does it point toward any particular answer, or does it tell
  you nothing at all?"
- If the learner classifies based on a single directional slice, ask them
  to check a DIFFERENT direction through the same point and compare the two
  verdicts.

## Voice Teaching Notes

Introduce the saddle case with genuine narrative weight — it is the first
entirely new kind of critical point the learner has encountered, with no
single-variable analogue, and deserves to be presented as a discovery
rather than a rule to memorize. When the learner reaches for a single
directional check, ask "which direction did you check — and is there
another direction through that same point you haven't looked at yet?"
rather than immediately supplying the discriminant formula.

## Assessment Signals

- **Early band**: Correctly computes all three second partials and the
  discriminant $D$ at a given critical point, using the correct
  three-way classification rule.
- **Middle band**: Correctly identifies $g(x,y)=x^2-y^2$ at $(0,0)$ as a
  saddle via the discriminant test, after being shown the two contradictory
  single-slice verdicts.
- **Advanced band**: Correctly recognizes $D=0$ as genuinely inconclusive
  (not a weak signal toward any particular classification) for
  $f(x,y)=x^4+y^4$ at $(0,0)$, and correctly determines the true
  classification by direct inspection of the function's values near the
  point.

## Tutor Recovery Strategy

If the learner has committed MC-1, do not simply state the classification —
ask them to evaluate $f$ at several points very close to the critical point
in different directions and compare. If the learner has committed MC-2, ask
them to name all three second partial derivatives before proceeding — if
they can only name $f_{xx}$, that is the diagnostic moment. If the learner
has committed MC-3, explicitly ask them to check a SECOND direction through
the same point before accepting their first slice's verdict.

## Memory Hooks

"One number, three verdicts, and one 'I don't know'" — the discriminant $D$
sorts every critical point into min, max, saddle, or genuinely
inconclusive, and $D=0$ means the last of these, never a hint toward one of
the first three. "A saddle agrees with nobody" — it looks like a minimum
from one direction and a maximum from another, which is exactly why a
single directional check can never reliably detect it.

## Transfer Connections

Directly sets up `math.opt.lagrange-multipliers` (cross-linked below,
independence mode), where extrema are found subject to a CONSTRAINT rather
than freely — the unconstrained classification machinery built here
(critical points via $\nabla f=0$, discriminant-based classification) is
the necessary foundation that the constrained case then modifies. Also
connects forward to the general Hessian-matrix eigenvalue theory covered in
linear algebra, of which this concept's two-variable discriminant test is
the low-dimensional special case.

## Cross-Subject Connections

Physics: locating stable versus unstable equilibria of a two-dimensional
potential energy function uses exactly this classification (a stable
equilibrium is a local minimum of potential energy; an unstable one, in
certain directions, can be a saddle). Engineering: stress and strain
analysis on a two-dimensional surface routinely requires classifying
critical points of a stress function using this identical Hessian test.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.multivariable-extrema.md`
(reused by reference, not restated): LO1's critical-point-and-discriminant
procedure; LO2's $D=0$-is-genuinely-inconclusive statement; LO3's
full-2D-behavior-not-a-single-slice caution; Component 3's explicit
division of labor with `math.opt.unconstrained-optimization` (this concept
owns direct calculus classification, the $D=0$ case, and the
single-slice caution; that sibling concept owns the broader unconstrained
optimization framework); Example 1's $f(x,y)=x^3-3xy+y^3$ clean-case trace;
Example 2's $f(x,y)=x^4+y^4$ inconclusive-discriminant case; Example 3's
$g(x,y)=x^2-y^2$ contradictory-slices saddle case (all three reused above
as this entry's own Demonstrations section); A03's engineering stress-
modeling transfer probe; and the Blueprint's own three-misconception
classification (D-EQUALS-ZERO-ASSUMED-CONCLUSIVE,
SINGLE-HESSIAN-ENTRY-CHECKED-ALONE, SINGLE-DIRECTIONAL-SLICE-ASSUMED-
SUFFICIENT), none of which carried an explicit birth-type column — all
three independently classified above per this program's standing
birth-taxonomy diagnostic procedure, with MC-3 explicitly cross-referenced
to `multivariable-intro`'s own MC-1 as the identical one-dimension-into-
two-dimensions overgeneralization mechanism recurring at the critical-point
classification stage.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires` (both prerequisites),
`unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and
`estimated_hours` all match the live KG exactly, verified via direct query
against `docs/mathematics/kg/graph.json`.

A genuine Blueprint-STALENESS finding, not a KG discrepancy, is recorded
honestly here rather than fixed: this concept's own Blueprint states, in
its cross-link component, that `math.opt.lagrange-multipliers` "has not yet
been authored — checked via `ls docs/curriculum/blueprints/`." That claim
is now stale — `math.opt.lagrange-multipliers.md` DOES exist as a Blueprint
file on disk (independently re-verified this batch, the second such
finding in this same batch, mirroring the identical staleness class found
in `math.calc.optimization.md`'s own Curriculum Feedback above for
`math.opt.unconstrained-optimization`). However, no Educational Brain entry
exists for `math.opt.lagrange-multipliers` (`math.opt` remains an entirely
unstarted EB domain), so independence mode remains the correct choice for
THIS entry's own cross-link treatment — the Blueprint file itself is left
unmodified per this program's standing rule of recording, never fixing,
such findings.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 48 of the Mathematics
  Educational Brain completion campaign. Fourth of four concepts in this
  batch.
