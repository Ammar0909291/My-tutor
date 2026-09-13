# math.calc.triple-integrals

## Identity

- **KG ID**: `math.calc.triple-integrals`
- **Domain**: Calculus (`math.calc`)
- **Title**: Triple Integrals
- **Requires**: `math.calc.double-integrals`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 10

## Learning Objective

By the end of this concept, the learner can set up and evaluate a triple
integral $\iiint_E f(x,y,z)\,dV$ as an iterated integral by determining
bounds that form a genuine nested hierarchy, convert to cylindrical
coordinates (including the necessary extra factor of $r$) for circularly
symmetric regions, and convert to spherical coordinates (including BOTH
the $\rho^2$ and $\sin\phi$ factors) for spherically symmetric regions.

## Core Understanding

`double-integrals` established the strategic pattern this concept extends
by one dimension: iterated integration with careful bound analysis, and
switching coordinate systems (there, polar) when a region's symmetry makes
it advantageous, always including the geometrically necessary scaling
factor. A **triple integral** $\iiint_E f(x,y,z)\,dV$ integrates over a 3D
region $E$, evaluated as three nested single-variable integrals. Setting up
correct bounds demands careful analysis of $E$'s shape: the OUTERMOST
integral's bounds must be CONSTANTS, the MIDDLE integral's bounds may
depend on the outermost variable, and the INNERMOST integral's bounds may
depend on BOTH outer variables — a genuine NESTED hierarchy, where each
variable's bounds depend only on variables integrated LATER (still
"outside" it in the iteration order), never on variables at the same or a
more-inner stage.

For regions with CIRCULAR symmetry around the $z$-axis, converting to
**cylindrical coordinates** $(r,\theta,z)$ — $x=r\cos\theta$,
$y=r\sin\theta$, $z=z$ — uses volume element $dV=r\,dr\,d\theta\,dz$: the
extra factor of $r$ is essential, coming from the identical
Jacobian-scaling idea already established for 2D polar coordinates in
`double-integrals`, now simply carried unchanged into the third dimension.

For regions with SPHERICAL symmetry, converting to **spherical
coordinates** $(\rho,\phi,\theta)$ uses volume element
$dV=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ — TWO independent scaling
factors are required together: $\rho^2$ (from the radial direction, since
a sphere's surface area grows with the square of its radius) AND
$\sin\phi$ (from how circles of constant longitude shrink toward the
poles, exactly as latitude lines shrink toward the poles on a globe).
Omitting either factor produces an incorrect volume element.

## Mental Models

**Level 1 (concrete)**: A can of soup (cylindrical symmetry — circular
cross-sections stacked along an axis) versus a basketball (spherical
symmetry — the same shape viewed from any direction), each suggesting a
different natural coordinate system for describing points inside it.

**Level 2 (representational)**: The bound-setting process as peeling an
onion from the inside out — the innermost layer's extent depends on
everything still outside it, and the outermost layer's extent is fixed,
with no variable left to depend on.

**Level 3 (structural)**: The extra scaling factors in cylindrical
($r$) and spherical ($\rho^2\sin\phi$) coordinates are both instances of
the SAME general principle already established in `double-integrals`: a
coordinate transformation's volume (or area) element must be corrected by
a factor derived from how that transformation locally stretches or
compresses space — never a fixed, memorized constant, but a genuine
geometric consequence of the specific coordinate change.

**Level 4 (abstract)**: This concept is the direct 3D generalization of
`double-integrals`'s entire coordinate-system-choice strategy — the
learner's task in both concepts is fundamentally the same: recognize a
region's symmetry, choose the coordinate system that matches it, and apply
the correctly-derived scaling factor for that specific transformation.

## Why Students Fail

Setting up bounds for a THIRD nested variable is qualitatively harder than
for two, because it is possible to write down bounds where the dependency
direction is inconsistent (e.g. one variable's bounds secretly depending on
a variable that itself depends back on it) without the error being
visually obvious the way it might be with only two variables. Separately,
having just learned in `double-integrals` that polar conversion needs
exactly ONE extra factor, students often assume every coordinate
conversion needs exactly one factor too — under-preparing them for
spherical coordinates' genuinely TWO independent factors.

## Misconceptions

**MC-1: ITERATED-INTEGRAL-BOUNDS-SET-UP-WITH-CIRCULAR-DEPENDENCY**
The student sets up triple integral bounds where variables depend on each
other circularly, rather than forming a genuine nested hierarchy. Example:
for the region $0\le x\le1$, $0\le y\le x$, $0\le z\le x+y$, incorrectly
writing the $x$-bounds as depending on $y$ WHILE the $y$-bounds also depend
on $x$ — a circular dependency, rather than the correct hierarchy where $x$
(outermost) uses only constants, $y$ (middle) depends only on $x$, and $z$
(innermost) may depend on both.
*Birth type*: Type 5 (instruction-induced). Writing three nested integral
signs does not visually enforce that the dependency structure between
variables must form a genuine hierarchy — that verification is a
procedural discipline that must be explicitly checked (does each
variable's bounds depend only on variables integrated LATER?) rather than
assumed automatic from the act of writing the integral down.

**MC-2: COORDINATE-CONVERSION-VOLUME-ELEMENT-SCALING-FACTOR-OMITTED**
The student omits the required scaling factor(s) — $r$ for cylindrical;
$\rho^2$ and/or $\sin\phi$ for spherical — when converting the volume
element to a new coordinate system. Example: converting a triple integral
over a cylinder to cylindrical coordinates but writing $dr\,d\theta\,dz$
instead of $r\,dr\,d\theta\,dz$; or, for a sphere, writing only
$\rho\,d\rho\,d\phi\,d\theta$ (missing either the correct power of $\rho$
or the $\sin\phi$ factor entirely).
*Birth type*: Type 1 (overgeneralization). This is the identical
overgeneralization mechanism already documented for `double-integrals`'
own MC-1 (the Cartesian $dA=dx\,dy$ pattern, needing no extra factor,
overgeneralized to polar coordinates) — here recurring twice in the SAME
concept: once as the cylindrical case (a direct 3D echo of the 2D polar
factor), and once as the spherical case, where the added subtlety is that
TWO independent factors, not one, must both be included.

## Analogies

**Best analogy — slicing an onion versus peeling a globe.** Setting up
nested bounds is like slicing an onion from the outside in: each cut's
extent is determined by what remains after the outer cuts, never the other
way around. Converting to spherical coordinates is like describing a point
on a globe by latitude and longitude: circles of longitude genuinely shrink
near the poles (contributing the $\sin\phi$ factor), exactly as circles of
constant radius genuinely grow with distance from a sphere's center
(contributing the $\rho^2$ factor) — two independent, physically real
distortions, both needing separate correction.

**Anti-analogy — "just add one extra factor when converting coordinates."**
This overgeneralized rule of thumb, carried over uncritically from the 2D
polar case, actively reinforces MC-2's spherical variant: spherical
coordinates genuinely need TWO independent scaling factors working
together, not one, because two separate geometric distortions (radial
growth and polar shrinkage) are both present simultaneously.

## Demonstrations

Trace the Blueprint's own bound-setup example: $E$ bounded by $0\le x\le1$,
$0\le y\le x$, $0\le z\le x+y$, giving the correctly nested iterated
integral $\int_0^1\int_0^x\int_0^{x+y}f\,dz\,dy\,dx$ — outermost ($x$)
constant, middle ($y$) depending on $x$ alone, innermost ($z$) depending on
both. Then trace a cylinder of radius $2$ converted to cylindrical
coordinates: $\iiint_E f\,dV = \iiint f(r\cos\theta,r\sin\theta,z)\cdot
r\,dr\,d\theta\,dz$ — the extra factor of $r$ carried over unchanged from
2D polar coordinates. Finally, trace a solid sphere of radius $3$ converted
to spherical coordinates: $\iiint_E f\,dV = \iiint
f(\rho\sin\phi\cos\theta,\rho\sin\phi\sin\theta,\rho\cos\phi)\cdot
\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ — BOTH the $\rho^2$ and $\sin\phi$
factors present together; omitting either (writing just $\rho\,d\rho\,d\phi
\,d\theta$, for instance) produces an incorrect, incomplete volume element.

## Discovery Questions

1. "For a region described by $0\le x\le1$, $0\le y\le x$, $0\le z\le
   x+y$ — does the innermost variable's bounds depend on variables that are
   themselves still 'outside' it in the iteration order, or could there be
   a circular dependency hiding in a proposed setup?"
2. "You already know polar coordinates in 2D need exactly one extra
   factor, $r$. Does converting to spherical coordinates in 3D also need
   exactly one extra factor, or could more than one independent
   geometric distortion be happening at once?"
3. "What physical difference between 'distance from the center' and
   'angle from the pole' would explain why spherical coordinates need TWO
   separate scaling factors rather than one?"

## Teaching Sequence

1. Recall `double-integrals`'s coordinate-system-choice strategy and its
   single polar scaling factor $r$ — already mastered.
2. Introduce triple integral bound-setting via the Blueprint's own $0\le
   x\le1,0\le y\le x,0\le z\le x+y$ example, explicitly verifying the
   nested hierarchy.
3. Ask Discovery Question 1 with a deliberately circular-dependency
   proposal before revealing the correct nested version, to surface MC-1.
4. Introduce cylindrical coordinates as the direct 3D carry-over of 2D
   polar coordinates, with the identical extra factor of $r$.
5. Introduce spherical coordinates; ask Discovery Question 2 before
   revealing both required factors, to surface MC-2's spherical variant.
6. Demonstrate the with/without-factors contrast for the solid sphere,
   showing that omitting either $\rho^2$ or $\sin\phi$ alone produces an
   incorrect result.

## Tutor Actions

- If the learner proposes bounds where two variables' ranges depend on
  each other, ask them to identify which variable is integrated first
  (innermost) and confirm its bounds depend only on variables integrated
  later.
- If the learner converts to cylindrical or spherical coordinates and
  omits a scaling factor, ask them to re-derive the factor from the
  coordinate transformation's own geometric stretching, rather than simply
  supplying the correct formula.
- If the learner includes only one of the two spherical factors, ask them
  to name the two SEPARATE geometric distortions (radial growth, polar
  shrinkage) each factor accounts for.

## Voice Teaching Notes

Introduce spherical coordinates only after cylindrical is solid, and make
the "two factors, not one" point explicit and early, rather than letting
the learner discover a missing factor through a wrong answer. When a
learner circularly cross-references two variables' bounds, ask them to
identify, out loud, which variable is genuinely "outermost" before
continuing.

## Assessment Signals

- **Early band**: Correctly sets up triple-integral bounds forming a
  genuine nested hierarchy for a simple region.
- **Middle band**: Correctly converts a circularly symmetric region to
  cylindrical coordinates, including the extra factor of $r$.
- **Advanced band**: Correctly converts a spherically symmetric region to
  spherical coordinates, including BOTH the $\rho^2$ and $\sin\phi$
  factors, and explains the separate geometric origin of each.

## Tutor Recovery Strategy

If the learner has committed MC-1, have them explicitly trace, for each
variable, which OTHER variables its bounds are allowed to depend on given
the chosen iteration order. If the learner has committed MC-2's
cylindrical variant, have them recompute a known volume with and without
the factor of $r$ and compare. If the learner has committed MC-2's
spherical variant, have them identify separately which factor accounts
for radial growth and which for polar shrinkage, then confirm both are
present in their setup.

## Memory Hooks

"Bounds nest like an onion — never circular, always outside-in."
"Cylindrical carries over polar's factor of $r$ unchanged." "Spherical
needs BOTH $\rho^2$ (radial growth) and $\sin\phi$ (polar shrinkage) —
two separate distortions, two separate factors."

## Transfer Connections

Directly extends `double-integrals`'s coordinate-system-choice strategy
into three dimensions, completing the "choose the coordinate system that
matches the region's symmetry" skill across both 2D and 3D. The bound-
nesting discipline established here (each variable depending only on
variables integrated later) generalizes to any higher-dimensional
iterated-integral setup.

## Cross-Subject Connections

Physics: computing the mass, center of mass, or moment of inertia of a 3D
object with cylindrical symmetry (a solid cylinder or cone) or spherical
symmetry (a planet, modeled with radially varying density, per this
concept's own transfer probe) are standard triple-integral applications.
Engineering: computing the volume or heat distribution within a
cylindrical tank or spherical pressure vessel relies on exactly this
coordinate-conversion technique.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.triple-integrals.md`
(reused by reference, not restated): LO1's nested-bound-hierarchy
requirement; LO2's cylindrical conversion and its extra factor of $r$;
LO3's spherical conversion and its two required factors; Example 1's
bound-setup trace (reused above as this entry's own Demonstrations
section); Example 2's cylindrical conversion; Example 3's spherical
conversion; A03's planetary-mass transfer probe; and the Blueprint's own
two-misconception classification
(ITERATED-INTEGRAL-BOUNDS-SET-UP-WITH-CIRCULAR-DEPENDENCY,
COORDINATE-CONVERSION-VOLUME-ELEMENT-SCALING-FACTOR-OMITTED), neither of
which carried an explicit birth-type column — both independently
classified above per this program's standing birth-taxonomy diagnostic
procedure, with MC-2 explicitly cross-referenced to `double-integrals`'
own MC-1 as the identical scaling-factor-omission mechanism recurring in
two coordinate systems within this single concept.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires`
(`math.calc.double-integrals`), `unlocks` (empty), `cross_links` (empty),
`difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` all match
the live KG exactly, verified via direct query against
`docs/mathematics/kg/graph.json`.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 51 of the Mathematics
  Educational Brain completion campaign. First of three concepts in this
  batch.
