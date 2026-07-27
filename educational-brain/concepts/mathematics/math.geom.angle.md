# math.geom.angle

## Identity
- **KG ID**: `math.geom.angle`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.ray`
- **Unlocks**: `math.geom.triangle`, `math.trig.right-triangle-trig`
- **Cross-links**: `math.trig.angle-measure` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe per the Blueprint).
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.90 (⌈0.90×6⌉ = 6/6)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.geom.angle.md` (reused by reference throughout this entry).

## Learning Objective
The student will define an angle as the figure formed by two rays sharing a common vertex, explain why angle measure (a positive amount of rotation) is independent of ray length, correctly classify angles by degree range (acute, right, obtuse, straight, reflex), convert between degree and radian measure, and correctly identify the vertex as the middle letter in angle notation.

## Core Understanding
Per the Blueprint's Component 1: an angle ∠ABC is the figure formed by two rays (→BA and →BC) sharing a common endpoint B (the vertex). Angle measure is the amount of rotation between the two sides — a positive quantity entirely independent of how long the rays are drawn. Degree measure treats a full rotation as 360°, giving five classifications: acute (0°<θ<90°), right (θ=90°), obtuse (90°<θ<180°), straight (θ=180°), reflex (180°<θ<360°). Radian measure treats a full rotation as 2π rad, converting via θ_rad = θ_deg × π/180. ∠ABC = ∠CBA (symmetric naming; the vertex letter is always in the middle, regardless of order). Complementary angles sum to 90°; supplementary angles sum to 180°.

## Mental Models
1. **The clock-hands model** (Blueprint TA-A01, P03): the hour and minute hand share a common endpoint (the clock center); the "spread" between them is the angle, independent of how long the hands are — a giant tower clock and a tiny wristwatch showing the same time have the identical angle between hands.
2. **The rotation-not-area model** (Blueprint TA-A02, P64): angle measure is captured by the arc between the rays, not the region's area or the rays' length — extending the rays adds more of the same ray without opening or closing the angle.
3. **The middle-letter-is-vertex model** (Blueprint TA-B03, P27): in ∠ABC, B (the middle letter) is always the vertex; A and C are points on the two rays, not special endpoints themselves.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a bigger angle has longer rays, or that angles with shorter drawn rays "look smaller" — conflating the visual area between rays with the angular measurement itself. A second failure is rejecting radian measure as "not a real angle," since degrees are introduced first and feel more concrete. A third failure is believing the vertex of ∠ABC is at A (the first letter encountered reading left to right), rather than correctly identifying B (the middle letter) as the vertex.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — ANGLE-DEPENDS-ON-RAY-LENGTH** (FOUNDATIONAL)
  - **Blueprint description**: believing a bigger angle has longer rays, or comparing angles by the length of their drawn rays rather than their rotation.
  - **Birth type**: Type 2, perceptual intuition — physical diagrams where wider-looking angles often happen to have longer drawn lines create a visual conflation between the area between rays and the angular measurement.
  - **Repair approach**: Blueprint Repair Action TA-B01 — the large-clock-versus-small-clock comparison at 3:00, confirming both show the identical 90° angle regardless of hand length.

- **MC-2 — ANGLE-DEGREES-ONLY** (see Blueprint Component 2)
  - **Blueprint description**: rejecting radian measure as "not real," since degrees feel concrete and radians feel abstract.
  - **Birth type**: Type 5, instruction-induced — degrees are introduced first and reinforced heavily (360° for a familiar full turn), leaving radians feeling like an unnecessary abstraction rather than an equally valid unit.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the arc-length/radius definition of a radian, grounding it as the mathematically natural unit (full rotation = 2π, the unit circle's own circumference).

- **MC-3 — ANGLE-VERTEX-IS-FIRST-LETTER** (see Blueprint Component 2)
  - **Blueprint description**: believing the vertex of ∠ABC is at A, the first letter encountered reading left to right.
  - **Birth type**: Type 3, language contamination — ordinary left-to-right reading habits assign special status to the first-encountered symbol, contradicting the geometric convention that the middle letter is the vertex.
  - **Repair approach**: Blueprint Repair Action TA-B03 — the naming table (∠ABC: vertex B; ∠PQR: vertex Q; ∠XYZ: vertex Y), reinforcing the middle-letter rule across multiple examples.

## Analogies
- **The clock-hands analogy** (Blueprint TA-A01, P03): the hour and minute hand both extend from the clock's center; the spread between them (the angle) is unaffected by whether the clock is a wristwatch or a tower clock.

## Demonstrations
- The ray-length-independence check: shortening both clock hands by half does not change the angle between them (Blueprint TA-A01, P49), targeting MC-1.
- The classification table sweeping 0°–360° into acute/right/obtuse/straight/reflex (Blueprint TA-A03, P04).
- The degree-radian conversion table (full rotation 360°=2π rad, half 180°=π rad, quarter 90°=π/2 rad) (Blueprint TA-A04, P06), targeting MC-2.

## Discovery Questions
1. "If you shorten both rays of an angle, does the angle itself get smaller?"
2. "Is π/2 radians a real angle measure, the same way 90° is?"
3. "In ∠ABC, which letter names the vertex?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (angle as two rays at a common vertex, clock-hands analogy) → TA-A02 (misconception gate for ANGLE-DEPENDS-ON-RAY-LENGTH) → TA-A03 (angle classification by degree range) → TA-A04 (degrees and radians) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the clock-hands model of an angle's rotation, independent of hand length (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — comparing angles drawn with different ray lengths but identical openings (Blueprint TA-A02), targeting MC-1.
- **ORGANIZE: Concept Map** — the acute/right/obtuse/straight/reflex classification table (Blueprint TA-A03).
- **DO: Worked Example** — converting 90° to radians and π rad to degrees (Blueprint TA-A04), targeting MC-2.

## Voice Teaching Notes
When a student compares two angles, ask "are you comparing the rotation, or how long the rays look?" as a standing check directly targeting MC-1 before any size judgment is accepted.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.trig.angle-measure` per the Blueprint's Component 7 — cross_links includes this target)**: reused verbatim from the Blueprint's Component 4 TA-A05 — the surveyor scenario, converting degrees to radians, finding a complementary angle, and confirming ray-length independence.
- **P77 (mastery gate)**: the Blueprint's 5-item problem set plus P76 (Component 4 TA-A05), MAMR 6/6.

## Tutor Recovery Strategy
If MC-1 persists, require the student to state explicitly, for any two angles being compared, "am I comparing rotation or ray length?" before making any size judgment, until the rotation-only criterion becomes automatic.

## Memory Hooks
- "An angle measures rotation, not how long the rays are drawn."
- "Radians are just as real as degrees — a full turn is 2π rad, same as 360°."
- "The middle letter is always the vertex — in ∠ABC, that's B."

## Transfer Connections
- `math.geom.triangle` (unlocks) requires angle classification for its own triangle-type taxonomy.
- `math.trig.right-triangle-trig` (unlocks) defines trigonometric ratios directly on angles in right triangles.
- `math.trig.angle-measure` (cross-link, Blueprint exists) supplies the deeper degree-radian conversion and unit-circle framing this concept's P76 previews.

## Cross-Subject Connections
- Physics: rotational quantities (torque, angular velocity) are measured using this same rotation-independent-of-arm-length angle concept.

## Blueprint References
`docs/curriculum/blueprints/math.geom.angle.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.trig.angle-measure` has a Blueprint but no Educational Brain entry) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 4 part 1.
