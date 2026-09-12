# math.calc.vector-fields

## Identity

- **KG ID**: `math.calc.vector-fields`
- **Domain**: Calculus (`math.calc`)
- **Title**: Vector Fields
- **Requires**: `math.calc.gradient`, `math.geom.vectors-3d`
- **Unlocks**: `math.calc.line-integrals`
- **Cross-links**: (none)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 8

## Learning Objective

By the end of this concept, the learner can define a vector field as an
assignment of a vector to every point in a region, recognize that the
gradient $\nabla f$ is only one special example of a vector field (not a
synonym for it), determine whether a given field is conservative by finding
an explicit potential function or applying the necessary partial-derivative
test, and correctly conclude that when that test fails, no potential
function exists at all — confirmed by a nonzero line integral around a
closed loop.

## Core Understanding

`gradient` introduced $\nabla f$ as a specific vector built from a scalar
function's partial derivatives — one vector per point, pointing in the
direction of steepest ascent. This concept generalizes that entire picture:
a **vector field** $\mathbf{F}(x,y,z)$ is simply an assignment of a vector to
every point in a region — a "wind map" or "flow map" — with NO requirement
that it come from differentiating any scalar function at all. The gradient
is one particular, special kind of vector field; most vector fields
(rotational fields, for instance) are not gradients of anything.

The concept then asks the natural follow-up question: which vector fields
DO happen to be gradients? A field $\mathbf{F}$ is called **conservative**
if there exists a scalar potential function $f$ with $\mathbf{F}=\nabla f$.
This is a genuinely restrictive, testable property, not a default. When it
holds, the payoff is substantial: the Fundamental Theorem for Line
Integrals says $\int_C\mathbf{F}\cdot d\mathbf{r}=f(\text{end})-f(\text{start})$
— the line integral depends ONLY on the two endpoints, never on which path
connects them. Finding an explicit $f$ is therefore a single, complete proof
of path-independence for every possible path at once, not merely suggestive
evidence requiring further checks.

Testing for conservativeness uses a necessary condition
($\partial P/\partial y=\partial Q/\partial x$ for $\mathbf{F}=(P,Q)$,
following from Clairaut's theorem on the shared potential's mixed partials).
When this condition fails, the concept insists on a precise conclusion: no
potential function exists AT ALL — not an approximate one, not a partial
one. The clearest confirming signature is a nonzero line integral around
some closed loop; a conservative field's closed-loop integral is always
exactly zero (since start and end are the same point), so any nonzero
result is direct, conclusive proof that no shortcut is available.

## Mental Models

**Level 1 (concrete)**: A weather map showing wind direction and speed at
every location — an arrow drawn at each point on the map, with no
assumption that this wind pattern came from "the gradient of" some
temperature or pressure map.

**Level 2 (representational)**: $\nabla f$ as a NAMED, SPECIAL kind of
vector field — one built by a specific recipe (partial derivatives of a
scalar function) — sitting inside the much larger, unstructured category of
"any assignment of a vector to each point."

**Level 3 (structural)**: Conservativeness as a binary, testable PROPERTY of
a vector field, not a default assumption — a field either has a potential
function (and gets the path-independence payoff) or it genuinely has none
at all, with the necessary-condition test and the closed-loop-integral
check as the two tools for telling which.

**Level 4 (abstract)**: The relationship between vector fields and their
potentials previews a recurring structural theme in vector calculus (later
formalized by Green's/Stokes' Theorems): a field's "circulation" around
closed curves is the deep obstruction to it being conservative, and this
concept's closed-loop test is the first, most concrete instance of that
much larger idea.

## Why Students Fail

Having just spent an entire concept (`gradient`) working exclusively with
$\nabla f$ as THE example of a vector field, students naturally treat
"vector field" and "$\nabla f$-built vector field" as synonyms — nothing in
their recent experience has shown them a vector field that ISN'T a
gradient. When conservativeness is then introduced as a testable property,
many students expect it to be automatic (since every field they've seen so
far has, implicitly, been conservative) rather than genuinely restrictive.

## Misconceptions

**MC-1: EVERY-VECTOR-FIELD-ASSUMED-CONSERVATIVE**
The student believes every vector field is automatically the gradient of
some scalar function, treating "vector field" and "conservative vector
field" as synonymous. Example: presented with the rotational field
$\mathbf{F}(x,y)=(-y,x)$, the student assumes some potential function must
exist simply because it is "a vector field," without checking.
*Birth type*: Type 1 (overgeneralization). Every vector field example
encountered in `gradient` was, by construction, a gradient — so "vector
field" and "gradient-built vector field" have never yet been distinguished
in the learner's experience, and the category is overgeneralized from its
only observed instances to the whole (much larger) class.

**MC-2: PATH-INDEPENDENCE-ASSUMED-TO-NEED-MULTI-PATH-VERIFICATION**
The student believes confirming a line integral is path-independent
requires computing it along several different paths and checking that the
values agree, rather than recognizing that finding an explicit potential
function is a single, complete, direct proof for every path at once.
*Birth type*: Type 5 (instruction-induced). Nothing about finding a
potential function visually announces "this settles every path
simultaneously" — the shortcut's completeness is a logical consequence of
the Fundamental Theorem for Line Integrals that must be explicitly
demonstrated, or the learner defaults to the more familiar (and far more
laborious) empirical-verification habit of trying several cases and hoping
they agree.

**MC-3: APPROXIMATE-POTENTIAL-ASSUMED-AVAILABLE-FOR-NON-CONSERVATIVE-FIELDS**
The student believes a field that fails the conservativeness test might
still have some approximate or partial potential function usable as a
shortcut, missing that no potential function exists at all in that case.
*Birth type*: Type 1 (overgeneralization). Many other areas of mathematics
reward "getting close" (approximation methods, partial credit for a
mostly-correct method) — this concept's binary all-or-nothing existence
question is overgeneralized against that broader, more forgiving pattern,
when in fact the necessary condition's failure is a clean, absolute proof
of nonexistence with no partial version available.

## Analogies

**Best analogy — a weather map versus a "temperature-gradient" map.** Any
weather map assigning a wind arrow to every location is a legitimate vector
field. A SPECIAL kind of wind map — one built by always blowing directly
"downhill" from high pressure to low pressure, with speed proportional to
how steep the pressure change is — would be a gradient field (of the
pressure function). Most real wind patterns, with genuine rotation and
circulation, are NOT built this way at all; they are vector fields with no
underlying "pressure function" they descend from.

**Anti-analogy — "every force field has a potential energy."** This
physics-adjacent phrasing, if left unqualified, actively reinforces MC-1:
in introductory physics, nearly every force field a student meets early on
(gravity, springs, electrostatics) genuinely IS conservative, so the
phrase's implicit universality is exactly backwards for the general
mathematical category — friction and magnetic forces are standard physics
counterexamples of non-conservative fields, and this concept's own
rotational-field example is a mathematical analogue of the same idea.

## Demonstrations

Trace the same field, $\mathbf{F}(x,y)=(-y,x)$, across two roles (the
Blueprint's own deliberate reuse). First, as a plain example of ANY vector
field (Component 4, Example 1): at $(1,0)$, $\mathbf{F}=(0,1)$, pointing
"up" and perpendicular to the position vector — consistent with rotational
circulation, no potential function claimed or assumed. Later (Example 3),
the SAME field is tested for conservativeness: $P=-y,Q=x$ gives
$\partial P/\partial y=-1$ and $\partial Q/\partial x=1$ — these do NOT
match, so the necessary condition fails and no potential exists. Confirming
directly: the closed-loop integral around the unit circle,
$\mathbf{r}(t)=(\cos t,\sin t)$, gives $\int_0^{2\pi}1\,dt=2\pi$ — nonzero,
even though the loop starts and ends at the identical point $(1,0)$,
conclusively proving no potential function exists for this field at all.
Separately, $\mathbf{F}(x,y)=(2xy,x^2)$ (Example 2) IS conservative: trying
$f(x,y)=x^2y$ confirms $\partial f/\partial x=2xy$ and $\partial f/\partial
y=x^2$ both match, so $\int_C\mathbf{F}\cdot d\mathbf{r}$ from $(0,0)$ to
$(1,2)$ equals $f(1,2)-f(0,0)=2$ regardless of the specific path chosen.

## Discovery Questions

1. "Is every vector field automatically the gradient of some scalar
   function — or is being a gradient a special, extra property a field
   might or might not have?"
2. "If I find a function $f$ with $\nabla f=\mathbf{F}$, have I proven the
   line integral is path-independent for every possible path at once, or
   do I still need to check a few specific paths to be sure?"
3. "If a field fails the necessary condition for conservativeness, could it
   still have SOME rough potential function that gets close, or does none
   exist at all?"

## Teaching Sequence

1. Recall `gradient`'s $\nabla f$ as a SPECIFIC construction from a scalar
   function — already mastered.
2. Generalize: introduce a vector field as ANY assignment of a vector to
   each point, with no scalar function required, using the rotational
   example $\mathbf{F}(x,y)=(-y,x)$ with no conservativeness claim yet.
3. Demonstrate MC-1 directly: ask whether this field must be a gradient of
   something, before revealing the answer.
4. Introduce conservativeness as a testable property; work the conservative
   example $\mathbf{F}(x,y)=(2xy,x^2)$, finding $f=x^2y$ and showing the
   endpoint-only evaluation.
5. Demonstrate MC-2: contrast "found $f$, done, for every path" against the
   more laborious "test two or three paths and hope they match" habit.
6. Return to the rotational field, now testing it against the necessary
   condition and finding it fails; demonstrate MC-3 by asking whether an
   approximate potential might still help.
7. Confirm the failure directly via the nonzero closed-loop integral,
   $2\pi\ne0$, contrasted explicitly with what a conservative field's
   closed loop must give (always exactly $0$).

## Tutor Actions

- If the learner assumes a newly-introduced vector field must have a
  potential function without checking, ask: "how would you find out for
  sure — is there a test, or do you just assume it?"
- If the learner, after finding a potential function, proposes trying a
  second path "to be safe," ask: "does the Fundamental Theorem for Line
  Integrals already guarantee something about every path, once you've
  found $f$?"
- If the learner asks whether an approximate potential might work after a
  failed test, ask them to name what "approximately zero net force around
  a full loop" would even mean physically, given the closed-loop
  computation gave a definite nonzero number.

## Voice Teaching Notes

Introduce the rotational field ($\mathbf{F}=(-y,x)$) with genuine curiosity
— "is THIS one a gradient too?" — rather than announcing the answer,
letting the failed test and the nonzero closed loop land as a discovery
rather than a rule. When a learner reaches for "try another path" language,
redirect toward what the Fundamental Theorem for Line Integrals already
promises once a potential function is found.

## Assessment Signals

- **Early band**: Correctly distinguishes "a vector field" from "a
  conservative vector field," recognizing the gradient as one special
  example rather than a synonym.
- **Middle band**: Correctly finds an explicit potential function for a
  given conservative field and uses it directly to evaluate a line integral
  between two endpoints, without testing any additional path.
- **Advanced band**: Correctly applies the necessary condition to determine
  that a field is NOT conservative, and confirms this via a nonzero
  closed-loop line integral, explicitly contrasting it with the always-zero
  closed-loop result a conservative field would give.

## Tutor Recovery Strategy

If the learner has committed MC-1, present the rotational field and ask
them to attempt the necessary-condition test themselves before concluding
anything. If the learner has committed MC-2, ask them to state, in their
own words, what the Fundamental Theorem for Line Integrals says happens
once $f$ is found — does it mention "for this one path" or "for every
path"? If the learner has committed MC-3, ask them to compute the
closed-loop integral directly and compare it to what a genuine potential
function would require (exactly zero).

## Memory Hooks

"A vector field is just an arrow at every point — being a gradient is
extra, not automatic." "Find $f$ once, and every path is settled — no
double-checking needed." "When the test fails, there is no potential at
all — not a rough one, not a partial one."

## Transfer Connections

Directly sets up `math.calc.line-integrals`'s general parametrization-based
method as the necessary fallback whenever a field is non-conservative — the
"no shortcut available" case this concept's LO3 explicitly points toward.
The conservativeness test previews the much larger circulation-based
machinery of Green's and Stokes' Theorems, where a field's closed-loop
behavior around curves becomes the central diagnostic tool.

## Cross-Subject Connections

Physics: conservative force fields (gravity, ideal springs, electrostatics)
have potential energy functions with exactly the path-independence property
this concept establishes; non-conservative forces (friction, magnetic
forces on a moving charge) are the standard physical counterexamples.
Engineering: fluid-flow fields are frequently tested for whether they are
"irrotational" (a closely related property to conservativeness), which
determines whether a velocity potential exists for simplifying flow
calculations.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.vector-fields.md` (reused
by reference, not restated): LO1's general vector-field definition and its
relationship to `math.calc.gradient`; LO2's conservative-field definition
and the Fundamental Theorem for Line Integrals; LO3's necessary condition
and nonzero-closed-loop signature; Example 1's rotational field as a
general vector field with no conservativeness claim; Example 2's conservative
field with explicit potential-function verification (reused above as this
entry's own Demonstrations section); Example 3's deliberate reuse of
Example 1's SAME rotational field, now tested and shown non-conservative;
A03's spring-force transfer probe; and the Blueprint's own three-
misconception classification (EVERY-VECTOR-FIELD-ASSUMED-CONSERVATIVE,
PATH-INDEPENDENCE-ASSUMED-TO-NEED-MULTI-PATH-VERIFICATION,
APPROXIMATE-POTENTIAL-ASSUMED-AVAILABLE-FOR-NON-CONSERVATIVE-FIELDS), none
of which carried an explicit birth-type column — all three independently
classified above per this program's standing birth-taxonomy diagnostic
procedure.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires` (both prerequisites),
`unlocks` (`math.calc.line-integrals`), `cross_links` (empty), `difficulty`,
`bloom`, `mastery_threshold`, and `estimated_hours` all match the live KG
exactly, verified via direct query against `docs/mathematics/kg/graph.json`.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 49 of the Mathematics
  Educational Brain completion campaign. First of three concepts in this
  batch, and the first of math.calc's final 3 remaining concepts — closes
  the ENTIRE topologically-ready frontier available at batch start.
