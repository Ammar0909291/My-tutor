# math.calc.line-integrals

## Identity

- **KG ID**: `math.calc.line-integrals`
- **Domain**: Calculus (`math.calc`)
- **Title**: Line Integrals
- **Requires**: `math.calc.parametric-curves`, `math.geom.vectors-3d`
- **Unlocks**: `math.calc.greens-theorem`
- **Cross-links**: (none)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 10

## Learning Objective

By the end of this concept, the learner can set up and compute both a
scalar line integral $\int_C f\,ds$ (an arc-length-weighted sum) and a
vector line integral $\int_C\mathbf{F}\cdot d\mathbf{r}$ (work done by a
force field), each by parametrizing the curve $C$ and reducing to an
ordinary single-variable integral — and can correctly explain why the
scalar integral is unchanged under path reversal while the vector integral
flips sign.

## Core Understanding

`parametric-curves` supplies the tool this entire concept is built on:
representing a curve $C$ as $\mathbf{r}(t)=(x(t),y(t),z(t))$ for
$t\in[a,b]$. `vectors-3d` supplies the dot-product machinery needed for the
vector case. Line integrals extend ordinary single-variable integration
from "integrating over an interval on the number line" to "integrating
along an arbitrary curve in space" — and there are two structurally
different quantities to integrate, both reducible to the same
parametrization-then-single-variable-integral recipe.

The **scalar line integral** $\int_C f\,ds$ uses the arc-length element
$ds=\|\mathbf{r}'(t)\|\,dt$ — built from a NORM, always nonnegative,
capturing the total of $f$'s values weighted by distance traveled (e.g. the
total mass of a wire whose density varies along its length). The **vector
line integral** $\int_C\mathbf{F}\cdot d\mathbf{r}$ uses the vector
differential $d\mathbf{r}=\mathbf{r}'(t)\,dt$ — retaining the actual
direction of travel, dotted against the force field $\mathbf{F}$ to capture
work done (how much of the force acts ALONG the direction of motion at each
instant).

The concept's central structural payoff is the two integrals' genuinely
different behavior under path reversal. Reversing direction along $C$
leaves the scalar line integral completely UNCHANGED — arc length and
$f$'s values along the geometric path don't care which way you walked it.
But reversing direction FLIPS THE SIGN of the vector line integral — work
done moving WITH a force is positive; work done moving AGAINST the same
force along the same physical path is negative. This is not a computational
coincidence; it follows directly from the fact that $ds$ is built from a
norm (direction-independent) while $d\mathbf{r}$ retains the actual tangent
vector (whose direction flips under reversal).

## Mental Models

**Level 1 (concrete)**: Walking along a mountain trail. A scalar line
integral is like totaling up how much sun exposure you get, weighted by how
far you walked at each temperature — walking the trail backward gives the
identical total. A vector line integral is like totaling the work a
headwind does against you — walking the SAME trail backward turns that
headwind into a tailwind, flipping the sign of the work.

**Level 2 (representational)**: Both integral types follow one recipe
(parametrize, substitute, reduce to a single-variable integral over $t$)
but differ in exactly what gets substituted — $ds=\|\mathbf{r}'(t)\|\,dt$
(a nonnegative scalar) for the scalar case, $d\mathbf{r}=\mathbf{r}'(t)\,dt$
(a full vector, dotted with $\mathbf{F}$) for the vector case.

**Level 3 (structural)**: The reversal behavior is a direct structural
consequence of one being built from a NORM (nonnegative, direction-blind)
and the other from a genuine VECTOR (direction-sensitive) — a property
derivable from the setup itself, not a rule to be memorized independently.

**Level 4 (abstract)**: The vector line integral around a CLOSED curve is
exactly the diagnostic tool `math.calc.vector-fields` used to test
conservativeness (a nonzero closed-loop integral proves no potential
function exists) — this concept's machinery is the computational engine
underlying that entire test, and it sets up `math.calc.greens-theorem`'s
relationship between a closed-curve vector line integral and a double
integral over the enclosed region.

## Why Students Fail

Students meeting "line integral" for the first time see one unifying
phrase covering two integrals that behave in genuinely opposite ways under
a natural operation (path reversal) — and because both integrals share the
same setup procedure (parametrize, substitute, integrate), it is easy to
assume they must also share the same behavioral properties. The failure is
compounded by the visual similarity between $ds$ and $d\mathbf{r}$, which
can be swapped in a formula without the substitution error being obviously
wrong at a glance.

## Misconceptions

**MC-1: BOTH-INTEGRAL-TYPES-ASSUMED-TO-FLIP-SIGN-UNDER-REVERSAL**
The student believes both the scalar and vector line integral flip sign
under path reversal, rather than recognizing only the vector line integral
does. Example: reversing the direction of travel on a segment from $(0,0)$
to $(3,4)$, the student expects $\int_C f\,ds$ to change value, when in
fact arc length and $f$'s values along the geometric path are identical
regardless of direction — only $\int_C\mathbf{F}\cdot d\mathbf{r}$ (e.g. a
constant force $\mathbf{F}=(1,0)$, giving forward work $3$ and reversed
work $-3$) genuinely flips sign.
*Birth type*: Type 1 (overgeneralization). Both integrals are introduced
under the single umbrella term "line integral" and share an identical setup
procedure, so a genuine behavioral difference between the two is
overgeneralized away — the shared name and shared recipe create an
expectation of shared properties that the underlying mathematics does not
support.

**MC-2: ARC-LENGTH-ELEMENT-CONFUSED-WITH-VECTOR-DIFFERENTIAL**
The student confuses $ds=\|\mathbf{r}'(t)\|\,dt$ (a scalar, always
positive) with $d\mathbf{r}=\mathbf{r}'(t)\,dt$ (a vector, direction-
dependent), applying the wrong substitution to the wrong integral type —
e.g. dotting $\mathbf{F}$ against a norm, or multiplying $f$ by a vector.
*Birth type*: Type 4 (notation-induced). The two differentials share nearly
identical notation ($ds$ versus $d\mathbf{r}$, differing by a single
symbol) and a nearly identical derivation (both come from
$\mathbf{r}'(t)\,dt$), so the visual and procedural similarity actively
invites conflating the norm-taking step that distinguishes them.

**MC-3: PARAMETRIZATION-DIRECTION-NOT-TRACKED-FOR-VECTOR-INTEGRALS**
When computing a vector line integral, the student fails to correctly
track which direction their chosen parametrization actually traces the
curve, leading to an unintended sign error — e.g. writing a parametrization
that runs opposite to the direction stated in the problem, without
checking.
*Birth type*: Type 5 (instruction-induced). Nothing about writing down a
parametrization visually flags which direction it traces — that check
(does $t=a$ correspond to the stated starting point?) is a procedural
verification step that must be explicitly built into the setup habit
rather than assumed automatic.

## Analogies

**Best analogy — sun exposure versus headwind work on a hike.** A hiker's
total sun exposure along a trail (weighted by how far they walked at each
temperature) is the same whether they walk the trail forward or backward —
this is the scalar line integral. The total work a headwind does against
them, however, genuinely changes: a pure headwind on the way out becomes a
pure tailwind on the way back, flipping the sign of the work — this is the
vector line integral.

**Anti-analogy — "line integrals reverse under reversal."** This
compressed phrasing, occasionally used loosely to summarize the topic,
actively reinforces MC-1 by treating "line integral" as a single behavioral
category rather than two structurally distinct objects that happen to
share a name and setup recipe.

## Demonstrations

Trace the Blueprint's own paired example on a single segment from $(0,0)$
to $(3,4)$, parametrized as $\mathbf{r}(t)=(3t,4t)$, $t\in[0,1]$,
$\mathbf{r}'(t)=(3,4)$, $\|\mathbf{r}'(t)\|=5$. Scalar case:
$\int_C(x+y)\,ds=\int_0^1(3t+4t)(5)\,dt=\int_0^1 35t\,dt=17.5$. Vector case:
for $\mathbf{F}(x,y)=(y,-x)$, $\mathbf{F}(\mathbf{r}(t))=(4t,-3t)$, and
$\mathbf{F}\cdot\mathbf{r}'=4t(3)+(-3t)(4)=0$ — this particular field
happens to give zero net work along this straight path (always
perpendicular to radial motion). To demonstrate the general reversal rule
unambiguously despite this coincidental zero, the Blueprint's own worked
extension uses a constant force $\mathbf{F}=(1,0)$ instead: forward work
$\int_0^1(1,0)\cdot(3,4)\,dt=3$; reversed work (reparametrizing as
$\mathbf{r}(t)=(3-3t,4-4t)$, giving $\mathbf{r}'(t)=(-3,-4)$)
$\int_0^1(1,0)\cdot(-3,-4)\,dt=-3$ — a genuine sign flip. Meanwhile the
scalar integral, recomputed under the SAME reversed parametrization, gives
the identical $17.5$: $\|\mathbf{r}'(t)\|=\|(-3,-4)\|=5$, unchanged.

## Discovery Questions

1. "If you reverse the direction of travel along a curve, does the scalar
   line integral $\int_C f\,ds$ change value? What about the vector line
   integral $\int_C\mathbf{F}\cdot d\mathbf{r}$?"
2. "What's the structural difference between $ds=\|\mathbf{r}'(t)\|\,dt$
   and $d\mathbf{r}=\mathbf{r}'(t)\,dt$ — one is a number, one is a vector.
   Why would that difference matter for how each behaves under reversal?"
3. "If a problem tells you a curve runs from point $A$ to point $B$, and
   you write down a parametrization — how would you check whether your
   parametrization actually traces it in that direction, rather than the
   opposite one?"

## Teaching Sequence

1. Recall `parametric-curves`'s $\mathbf{r}(t)$ representation and
   `vectors-3d`'s dot product — both already mastered.
2. Introduce the scalar line integral via the arc-length element $ds$,
   working the mass-of-a-wire framing.
3. Introduce the vector line integral via the vector differential
   $d\mathbf{r}$, working the work-done-by-a-force framing, side by side
   with the scalar case on the SAME curve.
4. Demonstrate MC-2 directly by contrasting the two substitutions
   explicitly: one takes a norm, one does not.
5. Ask the reversal question (Discovery Question 1) before revealing the
   answer, to surface MC-1.
6. Demonstrate the general reversal rule using the constant-force
   extension, since the initial example's coincidental zero would
   otherwise fail to show the sign flip unambiguously.
7. Introduce MC-3 via a problem with an ambiguously-directed curve, asking
   the learner to verify which direction their own parametrization traces
   before computing.

## Tutor Actions

- If the learner claims the scalar line integral changes under reversal,
  ask them to recompute $\|\mathbf{r}'(t)\|$ under the reversed
  parametrization and compare.
- If the learner applies a norm inside a vector line integral (or a dot
  product inside a scalar one), stop and ask which quantity — a number or
  a vector — each integral is supposed to be accumulating.
- If the learner writes a parametrization without checking its direction
  against the problem's stated endpoints, ask: "which point does $t=a$
  give you — is that the stated starting point?"

## Voice Teaching Notes

Work both integral types side by side on the identical curve from the
start, so the shared setup and the point of genuine divergence (the
reversal behavior) are both visible in the same worked trace rather than
taught as separate topics. When the learner predicts a sign flip for the
scalar case, do not correct immediately — have them recompute $\|\mathbf{r}'(t)\|$
themselves under the reversed parametrization and let the unchanged norm
speak for itself.

## Assessment Signals

- **Early band**: Correctly sets up and computes a scalar line integral
  over a simple parametrized curve, applying $ds=\|\mathbf{r}'(t)\|\,dt$.
- **Middle band**: Correctly sets up and computes a vector line integral
  (work done) over the same curve, applying $d\mathbf{r}=\mathbf{r}'(t)\,dt$
  without conflating it with the scalar differential.
- **Advanced band**: Correctly predicts and confirms that reversing a
  path leaves the scalar line integral unchanged while flipping the sign
  of the vector line integral, explaining the difference via the
  norm-versus-vector distinction between $ds$ and $d\mathbf{r}$.

## Tutor Recovery Strategy

If the learner has committed MC-1, have them recompute the scalar
integral's arc-length element under a reversed parametrization directly,
rather than reasoning abstractly. If the learner has committed MC-2, work
through both substitutions side by side from the same $\mathbf{r}'(t)$,
explicitly marking where a norm is or isn't taken. If the learner has
committed MC-3, ask them to state which point $t=a$ and $t=b$ correspond to
in their own parametrization and check it against the problem's stated
direction.

## Memory Hooks

"$ds$ is a number, $d\mathbf{r}$ is a vector — that's why one flips under
reversal and the other doesn't." "Sun exposure doesn't care which way you
walked; headwind work absolutely does." "Always check: does $t=a$ give you
the STARTING point the problem describes?"

## Transfer Connections

Directly sets up `math.calc.greens-theorem`, which relates a vector line
integral around a closed curve to a double integral over the enclosed
region — building immediately on this concept's vector line integral
machinery. The vector line integral around a closed loop is also exactly
the tool `math.calc.vector-fields` used to test whether a field is
conservative (a nonzero result there is direct proof no potential function
exists).

## Cross-Subject Connections

Physics: computing work done by a variable force along a curved path (e.g.
a charged particle moving through a non-uniform electric field) is
precisely the vector line integral; computing total mass or charge along a
wire with varying density is precisely the scalar line integral.
Engineering: fluid-flow circulation around a closed loop, a standard tool
in aerodynamics, is a vector line integral of the velocity field.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.line-integrals.md`
(reused by reference, not restated): LO1's scalar line integral setup;
LO2's vector line integral setup; LO3's path-reversal behavioral
distinction; Example 1's scalar computation and Example 2's vector
computation on the shared segment (reused above as this entry's own
Demonstrations section); Example 3's constant-force extension deliberately
added because the initial vector example's coincidental zero would
otherwise fail to demonstrate the general sign-flip rule; A03's hiking/
meteorology transfer probe; and the Blueprint's own three-misconception
classification (BOTH-INTEGRAL-TYPES-ASSUMED-TO-FLIP-SIGN-UNDER-REVERSAL,
ARC-LENGTH-ELEMENT-CONFUSED-WITH-VECTOR-DIFFERENTIAL,
PARAMETRIZATION-DIRECTION-NOT-TRACKED-FOR-VECTOR-INTEGRALS), none of which
carried an explicit birth-type column — all three independently classified
above per this program's standing birth-taxonomy diagnostic procedure.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires` (both prerequisites),
`unlocks` (`math.calc.greens-theorem`), `cross_links` (empty), `difficulty`,
`bloom`, `mastery_threshold`, and `estimated_hours` all match the live KG
exactly, verified via direct query against `docs/mathematics/kg/graph.json`.

One genuine forward observation, not developed further here: this concept's
own vector line-integral-around-a-closed-loop machinery is exactly what
`math.calc.vector-fields`' own conservativeness test relies on — the two
entries were authored in the same batch and are mutually consistent, but
`vector-fields` is the entry that CITES this concept's method as its
fallback for the non-conservative case, per its own Blueprint's
production-order note.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 49 of the Mathematics
  Educational Brain completion campaign. Second of three concepts in this
  batch.
