# math.trig.angle-measure

## Identity

- **KG ID**: `math.trig.angle-measure`
- **Domain**: Trigonometry (`math.trig`)
- **Title**: Angle Measure
- **Requires**: `math.geom.angle-measurement`
- **Unlocks**: `math.trig.right-triangle-trig`, `math.trig.unit-circle`
- **Cross-links**: (none)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective

By the end of this concept, the learner can place an angle in standard
position and identify its rotation direction and quadrant, find
coterminal angles (recognizing that angles differing by a full revolution
share the same terminal side), compute arc length via $s=r\theta$ with
$\theta$ correctly in radians, and reduce any angle to its reference
angle.

## Core Understanding

`math.geom.angle-measurement` established the mechanics of measuring
angles physically and converting between degrees and radians. This
concept builds the richer STRUCTURE of angle measure needed for
trigonometry: an angle in **standard position** has its vertex at the
origin and its initial side on the positive $x$-axis, measured by a signed
rotation — positive (counterclockwise) or negative (clockwise) — from the
initial to the terminal side.

Two angles that share the same terminal side are **coterminal**, differing
by a multiple of a full revolution: $\alpha=\theta+360°k$ (or
$\theta+2\pi k$) for any integer $k$. This is the concept's central
insight: rotating a FULL circle brings the terminal side back to EXACTLY
the same position, so any multiple of $360°$ is "invisible" to where the
terminal side actually points — a fact that will later explain why
trigonometric functions are periodic.

When an arc of a circle of radius $r$ subtends angle $\theta$ (in
RADIANS), the arc length is $s=r\theta$ — the formula requires radians
specifically because one radian is DEFINED as the angle subtended when arc
length equals radius, so $s=r\theta$ (radians) directly produces $s$ in
the same length units as $r$; degrees carry no such geometric meaning and
substituting them produces a numerically wrong result. The **reference
angle** of a non-quadrantal angle is the acute positive angle between the
terminal side and the NEAREST part of the $x$-axis, computed by a
quadrant-specific formula ($\theta$ in Q I; $180°-\theta$ in Q II;
$\theta-180°$ in Q III; $360°-\theta$ in Q IV).

## Mental Models

**Level 1 (concrete)**: Standing on a turntable facing east (the positive
$x$-axis); turning counterclockwise is positive rotation, clockwise is
negative — a quarter-turn CCW faces north, a quarter-turn CW faces south.

**Level 2 (representational)**: The angle $120°$ represented three ways at
once — verbally ("120° counterclockwise from the positive $x$-axis"), as
a diagram (terminal side in quadrant II), and as a coterminal family
($120°$, $480°$, $-240°$, all pointing to the identical terminal side).

**Level 3 (structural)**: Coterminal angles as a genuine equivalence class
— $\theta+360°k$ for any integer $k$ all describe the SAME terminal
position, so "the angle" and "the terminal side's position" are related
many-to-one, not one-to-one, which is the structural root of trigonometric
periodicity.

**Level 4 (abstract)**: This concept's arc-length formula, with $r=1$,
gives $s=\theta$ directly — the arc length along a UNIT circle equals the
angle itself in radians, the exact fact `math.trig.unit-circle` builds its
entire coordinate system on.

## Why Students Fail

Having only worked with angles as static, bounded measurements (never
exceeding a single "trip around" in prior geometry work), students have no
prior reason to think of an angle as a genuinely UNBOUNDED, signed rotation
that can wrap around a full circle and keep going — so treating $30°$ and
$390°$ as visibly "different numbers" naturally reads as "different
angles" unless the wraparound is explicitly demonstrated. Separately, the
arc-length formula's radian requirement and the negative-angle-versus-
supplement distinction are both easy to blur without an explicit,
side-by-side contrast.

## Misconceptions

**MC-1: COTERMINAL-MEANS-DIFFERENT**
The student claims that $30°$ and $390°$ are "different angles" pointing
to different terminal positions, not understanding that a full revolution
($360°$) brings the terminal side back to exactly the same ray. Example:
drawing $30°$ and $390°$ as two visibly different terminal sides in
standard position, when both point to the identical ray in quadrant I.
*Birth type*: Type 2 (perceptual intuition). A larger numerical rotation
value ($390°$ vs. $30°$) intuitively suggests "more distance traveled,
therefore a different destination" — a natural spatial/perceptual
inference that fails to account for the cyclical, wraparound nature of
rotation, where "more rotation" past a full circle returns to the exact
starting position rather than continuing to a new one.

**MC-2: ARC-LENGTH-IN-DEGREES**
The student computes $s=r\theta$ using degree measure (e.g. $s=r\times30$
for $\theta=30°$) instead of converting to radians first ($s=r\times
\pi/6$). Example: for a wheel of radius $10$ cm rotating $30°$, computing
$s=10\times30=300$ (meaningless, mixing units) instead of converting to
$\pi/6$ radians first, giving $s=10\times\pi/6=5\pi/3\approx5.24$ cm.
*Birth type*: Type 5 (instruction-induced). The formula $s=r\theta$ is
often memorized as a bare equation without the learner internalizing WHY
it specifically requires radians — the radian's own definition (the angle
where arc length equals radius) is the derivation that makes the
requirement non-arbitrary, but that derivation must be explicitly taught
rather than assumed obvious from the formula's appearance alone.

**MC-3: NEGATIVE-ANGLE-MISREAD**
The student interprets $-30°$ as the supplement ($150°$) or complement
($60°$) rather than as $30°$ CLOCKWISE from the positive $x$-axis.
Example: treating $-60°$ (terminal side in quadrant IV, a clockwise
rotation) as equivalent to $120°$ (the supplement of $60°$, terminal side
in quadrant II) — genuinely different terminal positions.
*Birth type*: Type 3 (language contamination). The word "negative" carries
a strong everyday-language association with "opposite" or "reversed,"
which pulls toward the geometrically unrelated notion of a supplementary
or complementary angle — the mathematical meaning (clockwise rotation
direction) shares no actual connection with those everyday senses of
"opposite," but the word itself invites the substitution.

## Analogies

**Best analogy — a turntable and a full-circle ride.** Standing on a
turntable facing east and rotating a FULL $360°$ brings you back to facing
exactly east again — the SAME direction, not a new one. Any additional
full turn is completely invisible to where you end up facing, exactly as
any multiple of $360°$ added to an angle leaves its terminal side
unchanged.

**Anti-analogy — "a bigger angle number means you've gone further, so
you're somewhere different."** This natural but incomplete intuition,
true for angles under $360°$, actively reinforces MC-1 once rotation
exceeds a full circle: "further" in terms of total rotation TRAVELED is
not the same as "different" in terms of final POSITION, since the
position wraps back around after each complete revolution.

## Demonstrations

Trace the Blueprint's own coterminal demonstration: $30°$ and $390°$ share
the identical terminal side, since $30°+360°=390°$ — after rotating
$30°$ CCW, an additional full $360°$ brings the terminal side all the way
around and back to exactly the same position. Trace the arc-length
contrast: for a wheel of radius $10$ cm, $\theta=30°$ used directly gives
the meaningless $s=300$; converting to $\pi/6$ radians first gives the
correct $s=5\pi/3\approx5.24$ cm; for $\theta=180°=\pi$ radians, the
correct computation gives $s=10\pi\approx31.4$ cm, matching half the
circle's circumference exactly. Trace the negative-angle contrast: $-60°$
(clockwise, terminal side in quadrant IV) versus $120°$ (the supplement
of $60°$, terminal side in quadrant II) — genuinely different terminal
positions despite the surface-level "opposite of $60°$" framing both
might seem to share.

## Discovery Questions

1. "If you rotate a full $360°$ starting from the positive $x$-axis, where
   do you end up facing? What does that tell you about $30°$ versus
   $390°$?"
2. "In the formula $s=r\theta$, does it matter whether $\theta$ is
   measured in degrees or radians? Try computing a wheel's arc length both
   ways and compare."
3. "Is $-60°$ the same terminal position as $120°$ (the supplement of
   $60°$)? Draw both and check."

## Teaching Sequence

1. Recall `math.geom.angle-measurement`'s degree-radian conversion —
   already mastered.
2. Introduce standard position and directed rotation via the turntable
   analogy.
3. Ask Discovery Question 1 with the $30°$/$390°$ pair before revealing
   the coterminal-angle definition, to surface MC-1.
4. Introduce the arc-length formula; ask Discovery Question 2 with a
   degrees-versus-radians comparison, to surface MC-2.
5. Introduce reference angles by quadrant; ask Discovery Question 3
   contrasting a negative angle against its supplement, to surface MC-3.

## Tutor Actions

- If the learner claims coterminal angles point to different positions,
  ask them to physically trace a full $360°$ rotation and confirm where
  they end up.
- If the learner substitutes degrees directly into $s=r\theta$, ask them
  to first state what a radian is defined as, then check whether the
  substitution respects that definition.
- If the learner treats a negative angle as a supplement, ask them to draw
  both the negative angle and its claimed supplement as separate diagrams
  and compare the terminal sides directly.

## Voice Teaching Notes

Introduce coterminal angles with the physical turntable gesture — actually
tracing a full rotation — before stating the algebraic formula
$\theta+360°k$, so the wraparound is felt rather than merely asserted.
When a learner substitutes degrees into the arc-length formula, ask them
to state the radian's own definition before correcting the computation.

## Assessment Signals

- **Early band**: Correctly places an angle in standard position and
  identifies its quadrant and rotation direction.
- **Middle band**: Correctly finds coterminal angles for a given angle,
  confirming both positive and negative examples share the same terminal
  side.
- **Advanced band**: Correctly computes arc length using $s=r\theta$ with
  radian conversion where needed, and correctly distinguishes a negative
  angle's terminal position from its supplement's.

## Tutor Recovery Strategy

If the learner has committed MC-1, have them physically trace a full
$360°$ rotation from a fixed starting direction and confirm the ending
position matches the start. If the learner has committed MC-2, have them
recall the radian's own definition (arc equals radius) before
recomputing the arc length with proper conversion. If the learner has
committed MC-3, have them draw the negative angle and its claimed
supplement as two separate diagrams and compare the terminal sides
directly.

## Memory Hooks

"A full $360°$ is invisible to where you end up facing." "Radians make
$s=r\theta$ work — degrees don't; convert first." "Negative means
clockwise, not supplement — they're unrelated ideas."

## Transfer Connections

Directly unlocks `math.trig.right-triangle-trig` (reference angles extend
right-triangle trig definitions to all quadrants; coterminal angles handle
angles outside $[0°,90°]$) and `math.trig.unit-circle` (unit-circle
coordinates are defined for angles in standard position; the arc-length
formula with $r=1$ gives $s=\theta$ directly; coterminal angles explain
trigonometric periodicity).

## Cross-Subject Connections

Physics: angular velocity and rotational motion problems use radian
measure and arc length exactly as defined here — a wheel's linear speed
relates to its angular speed via $v=r\omega$, the rate-of-change analogue
of $s=r\theta$. Engineering: gear ratios and rotational machinery
calculations rely on the same radian-based arc-length relationship.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.trig.angle-measure.md`
(reused by reference, not restated): the standard-position and directed-
rotation framework (TA-A01); the coterminal-angle definition and full-
revolution argument (TA-A02, reused above as this entry's own
Demonstrations section); the arc-length formula and its radian
requirement, plus the negative-angle-versus-supplement contrast (TA-A03);
the reference-angle formulas by quadrant; and the Blueprint's own
three-misconception registry (COTERMINAL-MEANS-DIFFERENT,
ARC-LENGTH-IN-DEGREES, NEGATIVE-ANGLE-MISREAD), none of which carried an
explicit birth-type column — all three independently classified above per
this program's standing birth-taxonomy diagnostic procedure. This
Blueprint uses a richer primitive-numbered format (P03/P11/P41/P49/P64/
P91/etc.) than this campaign's earlier math.calc Blueprints; its content
is reused by reference exactly as with those, without restating its full
scripted dialogue.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires`
(`math.geom.angle-measurement`), `unlocks`
(`math.trig.right-triangle-trig`, `math.trig.unit-circle`), `cross_links`
(empty), `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours`
all match the live KG exactly, verified via direct query against
`docs/mathematics/kg/graph.json`. This is the domain's first authored
entry, opened as a bounded cross-domain excursion from the Mathematics
Educational Brain completion campaign's `math.calc` work — `math.calc`
has 0 topologically-ready candidates remaining, and its final 14 concepts
all require a `math.trig`, `math.seq`, or `math.linalg` prerequisite not
yet authored. This entry, together with `math.trig.right-triangle-trig` in
the same batch, is a direct step in the chain toward
`math.trig.trig-functions`, which will unblock `math.calc.derivative-trig`.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 52 of the Mathematics
  Educational Brain completion campaign, cross-domain excursion into
  `math.trig`. First of three concepts in this batch.
