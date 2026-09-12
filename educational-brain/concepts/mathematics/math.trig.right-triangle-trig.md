# math.trig.right-triangle-trig

## Identity

- **KG ID**: `math.trig.right-triangle-trig`
- **Domain**: Trigonometry (`math.trig`)
- **Title**: Right-Triangle Trigonometry
- **Requires**: `math.geom.right-triangle`, `math.geom.similar-triangles`, `math.trig.angle-measure`
- **Unlocks**: `math.trig.unit-circle`, `math.trig.law-of-sines`, `math.trig.law-of-cosines`
- **Cross-links**: (none)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 10

## Learning Objective

By the end of this concept, the learner can correctly label a right
triangle's sides (opposite, adjacent, hypotenuse) relative to a chosen
acute angle $\theta$, compute all three trigonometric ratios
($\sin\theta=\text{opp/hyp}$, $\cos\theta=\text{adj/hyp}$,
$\tan\theta=\text{opp/adj}$), apply them to find missing sides or angles,
and derive exact values for the $30$-$60$-$90$ and $45$-$45$-$90$ special
triangles.

## Core Understanding

`math.geom.similar-triangles` supplies the WHY behind this entire concept:
all right triangles sharing the same acute angle $\theta$ are similar, so
their side ratios are CONSTANT regardless of the triangle's size — this is
exactly what makes $\sin\theta$, $\cos\theta$, $\tan\theta$ well-defined
functions of the angle alone, not of any particular triangle.
`math.trig.angle-measure` supplies the angle-labeling conventions this
concept extends into the triangle setting.

For a right triangle with acute angle $\theta$: $\sin\theta=
\text{opposite}/\text{hypotenuse}$, $\cos\theta=\text{adjacent}/
\text{hypotenuse}$, $\tan\theta=\text{opposite}/\text{adjacent}$
(SOH-CAH-TOA). Crucially, "opposite" and "adjacent" are labels RELATIVE to
the CHOSEN angle $\theta$ — the hypotenuse is always the side opposite the
right angle (fixed), but which leg counts as "opposite" versus "adjacent"
SWAPS depending on which of the two acute angles is chosen as $\theta$.

Two families of exact values anchor the concept: the $30$-$60$-$90$
triangle (side ratio $1:\sqrt3:2$) and the $45$-$45$-$90$ triangle (side
ratio $1:1:\sqrt2$), both derivable from first principles rather than
memorized as isolated facts. These ratios let a learner compute a missing
side given one side and one angle, or find an angle given two sides
(previewing inverse trigonometric functions).

## Mental Models

**Level 1 (concrete)**: Walking up a hill — "steepness" is rise over run,
exactly $\tan\theta=\text{opposite}/\text{adjacent}$ for the right
triangle the hill's slope forms; a person standing at angle $\theta$ has
the "opposite" side as the wall they face (across the room) and the
"adjacent" side as the floor they stand on (right next to them).

**Level 2 (representational)**: The three ratios as three different
QUESTIONS about the same triangle — $\tan\theta$ answers "how steep,"
$\sin\theta$ answers "what fraction of the path length is vertical rise,"
$\cos\theta$ answers "what fraction of the path length is horizontal run."

**Level 3 (structural)**: The ratios are well-defined FUNCTIONS of
$\theta$ alone (not of triangle size) because similar triangles sharing
$\theta$ have proportional sides — enlarging or shrinking the triangle
changes every side length but leaves every ratio unchanged.

**Level 4 (abstract)**: This concept's ratios are defined only for
$0°<\theta<90°$ — `math.trig.unit-circle` generalizes them to ALL angles
by re-deriving the same three ratios from coordinates on a circle of
radius $1$, an extension this concept deliberately previews without
teaching.

## Why Students Fail

The everyday-English sense of "adjacent" (meaning simply "next to" or
"touching") applies loosely to BOTH the true adjacent side AND the
hypotenuse, since both technically touch $\theta$ — so the technical
distinction (adjacent touches $\theta$ but is NOT the hypotenuse; opposite
does not touch $\theta$ at all) requires overriding a natural but
imprecise everyday reading of the word itself. Separately, the hypotenuse
is often the most visually striking, longest side in a diagram, inviting
its use as "the" denominator for every ratio rather than specifically for
sine and cosine only.

## Misconceptions

**MC-1: OPPOSITE-ADJACENT-SWAP**
The student confuses which side is "opposite" and which is "adjacent" —
particularly when the reference angle is not at a conventional position —
writing $\sin\theta=\text{adjacent}/\text{hypotenuse}$ (the formula for
$\cos\theta$). Example: given a right triangle with $\theta$ at vertex
$A$, mistaking side $AC$ (touching $\theta$, not the hypotenuse — the true
ADJACENT side) as the OPPOSITE side, simply because it is visually "next
to" $\theta$.
*Birth type*: Type 3 (language contamination). Everyday English uses
"adjacent" to mean "next to" — and the side nearest the angle genuinely
IS "next to" it in that loose sense — but the technical distinction
(adjacent touches $\theta$ but is NOT the hypotenuse; opposite is across
from $\theta$, not touching it at all) requires the learner to override
the word's natural everyday reading with a stricter, relative-to-the-angle
technical meaning.

**MC-2: TRIG-APPLIES-TO-ALL-TRIANGLES**
The student applies SOH-CAH-TOA to non-right triangles, calling the
longest side the "hypotenuse" even without a right angle present. Example:
for a triangle with angles $40°$, $60°$, $80°$ and longest side $10$,
computing $\sin40°=\text{opposite}/10$, treating $10$ as "the hypotenuse"
simply because it is the longest side.
*Birth type*: Type 1 (overgeneralization). The definition "opposite over
hypotenuse" works correctly for right triangles, and the learner
overgeneralizes it to ALL triangles, without recognizing that
"hypotenuse" is DEFINED specifically as the side opposite a $90°$ angle —
a definition that simply does not exist in a triangle with no right angle.

**MC-3: TAN-IS-OPP-OVER-HYP**
The student computes $\tan\theta$ as $\text{opposite}/\text{hypotenuse}$
(the formula for $\sin\theta$) instead of $\text{opposite}/
\text{adjacent}$. Example: in a $3$-$4$-$5$ right triangle with $\theta$
opposite the side of length $3$, computing $\tan\theta=3/5$ (actually
$\sin\theta$) instead of the correct $\tan\theta=3/4$.
*Birth type*: Type 2 (perceptual intuition). The hypotenuse is typically
the longest, most visually prominent side in a triangle diagram — its
visual salience invites defaulting to it as the denominator for EVERY
ratio, including $\tan\theta$, where the true denominator (the adjacent
leg) is a comparatively less visually distinctive side.

## Analogies

**Best analogy — a person facing a wall.** A person standing at angle
$\theta$ faces a wall directly across the room (the OPPOSITE side — not
touching them at all) while standing on the floor right beneath their feet
(the ADJACENT side — touching them, but distinct from the hypotenuse,
which is the diagonal line from where they entered the room to the far
corner). Both the wall and the floor are, in a loose sense, "near" the
person, but only the floor is technically adjacent.

**Anti-analogy — "the longest side is always the hypotenuse."** This
overgeneralized rule of thumb, true only within right triangles (where the
hypotenuse IS always the longest side), actively reinforces MC-2 by
omitting the actual DEFINING property (opposite the $90°$ angle) in favor
of a merely correlated one (being the longest side) — a property that
exists and is calculable in ANY triangle, right or not, unlike the
hypotenuse itself.

## Demonstrations

Trace the Blueprint's own $3$-$4$-$5$ triangle with $\theta$ at vertex
$A$: opposite side $=3$, adjacent $=4$, hypotenuse $=5$, giving
$\sin\theta=3/5$, $\cos\theta=4/5$, $\tan\theta=3/4$; for the OTHER acute
angle $\phi$ (opposite $=4$, adjacent $=3$), the labels SWAP:
$\sin\phi=4/5$, $\cos\phi=3/5$, $\tan\phi=4/3$ — confirming
"opposite"/"adjacent" are relative to whichever angle is chosen. Verify
the Pythagorean identity directly: $\sin^2\theta+\cos^2\theta=
(3/5)^2+(4/5)^2=9/25+16/25=1$. Derive the $30$-$60$-$90$ triangle from a
hypotenuse of $12$ cm: short leg (opposite $30°$) $=12/2=6$ cm; long leg
(opposite $60°$) $=6\sqrt3$ cm; verify via $\sin30°=1/2=6/12$. Derive the
$45$-$45$-$90$ triangle with legs both $5$: hypotenuse $=5\sqrt2$,
$\cos45°=5/(5\sqrt2)=\sqrt2/2$.

## Discovery Questions

1. "In a right triangle with $\theta$ at one vertex, which side touches
   $\theta$ but is NOT the hypotenuse? Which side does not touch $\theta$
   at all?"
2. "Can you apply $\sin\theta=\text{opposite}/\text{hypotenuse}$ to a
   triangle with no right angle? What word in the formula requires a
   right angle to even make sense?"
3. "In a $3$-$4$-$5$ triangle, which side is the LONGEST? Is that side the
   denominator for EVERY trig ratio, or only some of them?"

## Teaching Sequence

1. Recall `math.geom.similar-triangles`'s constant-ratio property and
   `math.trig.angle-measure`'s angle-labeling conventions — both already
   mastered.
2. Introduce the three ratios via the hill-slope analogy, working the
   $3$-$4$-$5$ triangle fully for both acute angles to show the label
   swap.
3. Ask Discovery Question 1 before revealing the technical opposite/
   adjacent distinction explicitly, to surface MC-1.
4. Ask Discovery Question 2 with a non-right triangle before revealing why
   the formulas don't apply, to surface MC-2.
5. Derive the $30$-$60$-$90$ and $45$-$45$-$90$ special triangles from
   first principles.
6. Ask Discovery Question 3 before revealing the correct
   opposite/adjacent denominator for $\tan\theta$, to surface MC-3.

## Tutor Actions

- If the learner swaps opposite and adjacent, ask them to identify which
  side touches $\theta$ and which does not, before assigning either label.
- If the learner applies SOH-CAH-TOA to a triangle with no marked right
  angle, ask whether a "hypotenuse" can even be defined for that triangle.
- If the learner uses the hypotenuse as $\tan\theta$'s denominator, ask
  them to state which two sides $\tan\theta$'s definition actually
  involves.

## Voice Teaching Notes

Always draw and explicitly label a triangle's three sides relative to the
chosen angle before writing any ratio — make this a fixed, repeated habit
rather than a one-time instruction. When a learner reaches for the
hypotenuse in a $\tan\theta$ computation, ask them to state
$\tan\theta=\sin\theta/\cos\theta$ and re-derive the correct ratio from
that identity.

## Assessment Signals

- **Early band**: Correctly labels opposite, adjacent, and hypotenuse
  relative to a given acute angle in a right triangle.
- **Middle band**: Correctly computes all three trigonometric ratios for a
  given right triangle and verifies the Pythagorean identity
  $\sin^2\theta+\cos^2\theta=1$.
- **Advanced band**: Correctly derives exact trigonometric values for the
  $30$-$60$-$90$ and $45$-$45$-$90$ special triangles from first
  principles, and correctly declines to apply SOH-CAH-TOA to a non-right
  triangle.

## Tutor Recovery Strategy

If the learner has committed MC-1, have them explicitly identify which
side touches $\theta$ (adjacent, excluding the hypotenuse) and which does
not (opposite) before assigning any label. If the learner has committed
MC-2, ask them to define "hypotenuse" precisely and check whether that
definition applies to the given triangle. If the learner has committed
MC-3, have them derive $\tan\theta=\sin\theta/\cos\theta$ and recompute
using that identity.

## Memory Hooks

"Opposite doesn't touch $\theta$; adjacent touches $\theta$ but isn't the
hypotenuse." "No right angle, no hypotenuse — SOH-CAH-TOA doesn't apply."
"$\tan\theta=\sin\theta/\cos\theta$ — the hypotenuse cancels out."

## Transfer Connections

Directly unlocks `math.trig.unit-circle` (extending these ratios beyond
$0°$-$90°$ to all angles), `math.trig.law-of-sines`, and
`math.trig.law-of-cosines` (both generalizing trigonometric ratios to
NON-right triangles, precisely the case this concept's MC-2 flags as
requiring different tools).

## Cross-Subject Connections

Physics: resolving a force or velocity vector into perpendicular
components uses exactly the sine/cosine ratios established here (e.g. a
projectile's horizontal and vertical velocity components from its launch
angle). Engineering: computing heights and distances via angle-of-
elevation or angle-of-depression measurements (surveying, architecture)
is a direct real-world application of right-triangle trigonometry.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.trig.right-triangle-trig.md`
(reused by reference, not restated): the hill-slope analogy and
opposite/adjacent labeling rule (TA-A01); the $3$-$4$-$5$ triangle worked
example with both acute angles and the $30$-$60$-$90$/$45$-$45$-$90$
special-triangle derivations (TA-A02, reused above as this entry's own
Demonstrations section); the correct-versus-common-error contrast table
(TA-A03); and the Blueprint's own three-misconception registry
(OPPOSITE-ADJACENT-SWAP, TRIG-APPLIES-TO-ALL-TRIANGLES,
TAN-IS-OPP-OVER-HYP), none of which carried an explicit birth-type
column — all three independently classified above per this program's
standing birth-taxonomy diagnostic procedure. This Blueprint uses the
same richer primitive-numbered format as `math.trig.angle-measure`,
reused by reference without restating its scripted dialogue.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires` (all three
prerequisites), `unlocks` (`math.trig.unit-circle`,
`math.trig.law-of-sines`, `math.trig.law-of-cosines`), `cross_links`
(empty), `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours`
all match the live KG exactly, verified via direct query against
`docs/mathematics/kg/graph.json`. Second entry in this batch's cross-
domain excursion — the direct next step toward `math.trig.unit-circle` and
`math.trig.trig-functions`, which will unblock `math.calc.derivative-trig`.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 52 of the Mathematics
  Educational Brain completion campaign, cross-domain excursion into
  `math.trig`. Second of three concepts in this batch.
