# math.geom.triangle

## Identity
- **KG ID**: `math.geom.triangle`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.angle`, `math.geom.line-segment`
- **Unlocks**: `math.geom.pythagorean-theorem`, `math.trig.right-triangle-trig`
- **Cross-links**: `math.trig.right-triangle-trig` (Tier 1, Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 20
- **Blueprint**: `docs/curriculum/blueprints/math.geom.triangle.md` (reused by reference throughout this entry).

## Learning Objective
The student will apply the interior angle sum (always exactly 180°) to find a missing angle, classify any triangle simultaneously along two independent axes — by side length (scalene/isosceles/equilateral) and by angle type (acute/right/obtuse) — and correctly distinguish the altitude (a perpendicular auxiliary segment) from the triangle's three genuine sides.

## Core Understanding
Per the Blueprint's Component 1: a triangle is a polygon formed by three line segments meeting at three vertices, enclosing three interior angles whose measures always sum to exactly 180°, regardless of the triangle's size or shape. Triangles are classified along two independent axes that both apply simultaneously to the same triangle: by side length (scalene — all different; isosceles — exactly two equal; equilateral — all three equal) and by angle type (acute — all angles under 90°; right — exactly one angle equal to 90°; obtuse — exactly one angle over 90°). No side-class label conflicts with any angle-class label — any combination is possible (e.g. "isosceles right," "scalene obtuse"). The altitude from a vertex is the perpendicular segment from that vertex to the line containing the opposite side; it is a measurement auxiliary, genuinely distinct from — and generally a different length than — any of the triangle's three sides.

## Mental Models
1. **The three-legged-stool model** (Blueprint TA-A01, P03): a stool's three legs (sides) meet the seat at three joints (vertices); the always-stable, always-180°-summing structure mirrors the triangle's guaranteed angle sum.
2. **The two-independent-axes model** (Blueprint TA-A04, P04): side-length classification and angle-type classification are two separate label systems — a triangle always receives one label from each, and no combination is forbidden.
3. **The fourth-segment model** (Blueprint TA-A04, P49): the altitude is a new, auxiliary segment drawn from a vertex to the opposite side (or its extension) — never one of the three sides themselves, and generally a different length from any of them.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is using 360° instead of 180° for the interior angle sum, producing impossible angle values or believing the sum depends on the triangle's size. A second failure is treating all six classification labels (scalene, isosceles, equilateral, acute, right, obtuse) as one single mutually exclusive set, incorrectly concluding a triangle cannot be, for instance, both isosceles and right-angled at once. A third failure is naming one of the three sides (a leg or the hypotenuse) as "the altitude," failing to distinguish the perpendicular measurement auxiliary from the triangle's boundary.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — ANGLE-SUM-NOT-180** (FOUNDATIONAL)
  - **Blueprint description**: using 360° instead of 180° for the interior angle sum; obtaining impossible angle values or believing the sum depends on triangle size.
  - **Birth type**: Type 1, overgeneralization — the full-rotation sum of 360° (the angle sum around a point) is over-applied to the interior angles of a triangle, which occupy only half the plane and thus sum to half of 360°.
  - **Repair approach**: Blueprint Repair Action TA-B01 — the direct contrast between the 360°-around-a-point case and the 180°-inside-a-triangle case, re-anchored with a concrete numeric example.

- **MC-2 — TRIANGLE-TYPE-IS-EXCLUSIVE** (Secondary)
  - **Blueprint description**: treating all six classification labels as a single mutually exclusive set; saying a right isosceles triangle is impossible.
  - **Birth type**: Type 1, overgeneralization — since a triangle receives only one label when children first learn each classification system in isolation, the two systems are wrongly merged into one exclusive list once both are introduced.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the two-independent-axes table, showing a triangle takes exactly one label from each axis simultaneously, with no forbidden combinations.

- **MC-3 — ALTITUDE-IS-A-SIDE** (Secondary)
  - **Blueprint description**: naming a leg or the hypotenuse as the altitude; not distinguishing the perpendicular auxiliary from the boundary sides.
  - **Birth type**: Type 6, analogy overextension — in a right triangle, each leg genuinely IS the altitude to the other leg, and this special-case coincidence is over-applied to the altitude-to-the-hypotenuse case, where the altitude is a distinct fourth segment.
  - **Repair approach**: Blueprint Repair Action TA-B03 — the 3-4-5 right triangle worked example, computing the altitude to the hypotenuse (2.4) and showing it differs from both legs (3, 4).

## Analogies
- **The three-legged-stool analogy** (Blueprint TA-A01, P03): a stool's three legs meeting the seat at three joints, always stable on flat ground, mirrors a triangle's three sides meeting at three vertices with an angle sum that is always exactly 180°.

## Demonstrations
- Finding a missing angle from two given angles using the 180° sum (Blueprint TA-A01, P49), targeting MC-1.
- Classifying the same triangle (sides 5,5,7.07; angles 90°,45°,45°) with both an "isosceles" and a "right" label simultaneously (Blueprint TA-A04, pattern table), targeting MC-2.
- Computing the altitude to the hypotenuse in a 3-4-5 right triangle (h=2.4), confirming it differs from both legs (Blueprint TA-B03, P64), targeting MC-3.

## Discovery Questions
1. "Do the three interior angles of every triangle sum to the same number, no matter the triangle's size or shape?"
2. "Can a triangle be both isosceles and right-angled at the same time?"
3. "Is the altitude of a triangle always one of its three sides?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (angle sum and anatomy, three-legged-stool analogy) → TA-A02 (side-length classification) → TA-A03 (angle-type classification) → TA-A04 (combined classification and altitude) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the three-legged-stool bridge to triangle anatomy and the guaranteed angle sum (Blueprint TA-A01).
- **DO: Worked Example** — finding a missing angle from the 180° sum (Blueprint TA-A01, P49), targeting MC-1.
- **ORGANIZE: Concept Map** — the two-independent-axes classification table, pairing every side-class with every angle-class (Blueprint TA-A04, P04), targeting MC-2.
- **TEST-THINKING: Error Analysis** — the 3-4-5 right triangle's altitude-to-hypotenuse computation, distinguishing it from either leg (Blueprint TA-B03), targeting MC-3.

## Voice Teaching Notes
Before accepting a missing-angle answer, ask "does your third angle make the total exactly 180°?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.trig.right-triangle-trig` per the Blueprint's Component 0 — cross_links includes this Tier 1 target)**: reused verbatim from the Blueprint's Component 4 TA-A05 — the 30-60-90 right triangle scenario finding the missing angle via the 180° sum, then framing (without evaluating) the sin(30°)=opposite/hypotenuse ratio.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 4 TA-A05), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to state "180°" out loud as the very first step before any missing-angle computation, subtracting the given angles from it explicitly, until the 360°-substitution error stops recurring.

## Memory Hooks
- "A triangle's three angles always add up to 180° — never 360°."
- "Every triangle gets one label from the side-length list AND one from the angle-type list — both at once."
- "The altitude is a new segment to the opposite side — it's never one of the sides itself."

## Transfer Connections
- `math.geom.pythagorean-theorem` (unlocks) requires the right-triangle definition and side identification this concept's angle-type classification establishes.
- `math.trig.right-triangle-trig` (unlocks, cross-link) requires the angle sum and side-labeling conventions this concept develops to determine all three angles and set up trigonometric ratios.
- `math.geom.angle` and `math.geom.line-segment` (require) supply the angle measurement and side-length concepts this concept's anatomy and classification directly build on.

## Cross-Subject Connections
- Physics: force-triangle and vector-addition diagrams routinely rely on triangle angle-sum reasoning and side/angle classification established here.

## Blueprint References
`docs/curriculum/blueprints/math.geom.triangle.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 5.
