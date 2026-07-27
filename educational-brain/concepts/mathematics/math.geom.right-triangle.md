# math.geom.right-triangle

## Identity
- **KG ID**: `math.geom.right-triangle`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.triangle`, `math.geom.perpendicular-lines`
- **Unlocks**: `math.geom.pythagorean-theorem`, `math.trig.right-triangle-trig`
- **Cross-links**: `math.trig.right-triangle-trig` (Tier 1, Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.90 (⌈0.90×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.geom.right-triangle.md` (reused by reference throughout this entry).

## Learning Objective
The student will identify the hypotenuse of a right triangle as the side opposite the 90° angle regardless of the triangle's orientation in a diagram, compute a missing acute angle using the fact that the two acute angles are complementary (sum to 90°, not 180°), and explain why a triangle can never have two right angles.

## Core Understanding
Per the Blueprint's Component 1: a right triangle contains exactly one 90° angle. The two sides adjacent to the right angle are the legs; the side opposite the right angle is the hypotenuse — always the longest side, identified by its position (opposite the right-angle vertex) rather than by how long it happens to look in a given drawing. Because one angle is already 90°, the remaining two angles are both acute and must sum to exactly 90° (the total 180° minus the 90° already used), making them complementary to each other. A triangle cannot have two right angles: two 90° angles would already sum to 180°, leaving 0° for the third angle, which collapses the figure to a line rather than a genuine triangle.

## Mental Models
1. **The door-corner model** (Blueprint TA-A01, P03): cutting diagonally across a door frame's perfect square corner produces two short edges (the legs) and one diagonal cut (the hypotenuse) — the hypotenuse is defined by its position opposite the corner, not by its drawn length.
2. **The 90°-uses-up-half model** (Blueprint TA-A02, P64): the right angle consumes 90° of the triangle's 180° total, leaving exactly 90° to be shared between the two acute angles — subtract the right angle first, then distribute the remainder.
3. **The zero-room model** (Blueprint TA-B03, P64): two 90° angles already exhaust the full 180° angle sum, leaving 0° for a third angle — a triangle with a 0° angle has collapsed into a line, not a valid figure.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is identifying the hypotenuse by visual appearance (the side that looks longest or is drawn horizontally) rather than by its true defining property — opposite the right angle — especially when the triangle is rotated away from a standard orientation. A second failure is finding a missing acute angle by subtracting from 180° instead of 90°, ignoring that the right angle has already claimed half the total. A third failure is believing a triangle could have two right angles, not recognizing that this would leave zero degrees for the third angle.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE** (FOUNDATIONAL)
  - **Blueprint description**: identifying the side that looks longest in the diagram or the vertical/horizontal side, rather than specifically the side opposite the 90° angle.
  - **Birth type**: Type 2, perceptual intuition — most textbook diagrams draw right triangles in one standard orientation, so the visually longest-looking side and the true hypotenuse coincide often enough that learners never form the positional rule, relying instead on appearance.
  - **Repair approach**: Blueprint Repair Action B01 — the two-step procedure (find the right-angle vertex, then identify the one side not touching it) applied to a deliberately rotated triangle where the hypotenuse does not look longest.

- **MC-2 — ACUTE-ANGLES-SUM-TO-180** (Secondary)
  - **Blueprint description**: subtracting from 180° rather than 90° when finding the second acute angle, e.g. giving 180°−35°=145° instead of 90°−35°=55°.
  - **Birth type**: Type 1, overgeneralization — the general triangle angle-sum rule (subtract known angles from 180°) is applied without first accounting for the right angle already having consumed 90° of that total.
  - **Repair approach**: Blueprint Repair Action B02 — the explicit two-step subtraction (∠A+∠B+90°=180° → ∠A+∠B=90°) before ever subtracting the given acute angle.

- **MC-3 — TWO-RIGHT-ANGLES-POSSIBLE** (Secondary)
  - **Blueprint description**: believing a triangle can have two right angles, not recognizing that 90°+90°=180° exhausts the angle sum, leaving 0° for the third vertex.
  - **Birth type**: Type 1, overgeneralization — since one right angle is a valid, familiar case, a learner without an explicit angle-sum check may assume a second right angle is equally unremarkable.
  - **Repair approach**: Blueprint Repair Action B03 — the direct arithmetic (90°+90°=180°, leaving 0° for the third angle) showing the figure collapses to a line, not a triangle.

## Analogies
- **The door-corner analogy** (Blueprint TA-A01, P03): the perfect square corner of a door frame, cut diagonally, produces two frame edges (legs) and a diagonal cut (hypotenuse) — directly mirroring a right triangle's anatomy.

## Demonstrations
- Identifying the hypotenuse in a deliberately rotated right triangle where the visually longest side is not the true hypotenuse (Blueprint TA-B01, P64), targeting MC-1.
- Computing a missing acute angle via the two-step subtraction (180°−90°=90°, then 90°−given angle) (Blueprint TA-A02, P49), targeting MC-2.
- The contrast table distinguishing right, acute, and obtuse triangles by their angle conditions, confirming a right triangle cannot also be obtuse (Blueprint TA-A03, P06).

## Discovery Questions
1. "If a right triangle is drawn rotated so its hypotenuse doesn't look like the longest side, how do you still find it correctly?"
2. "Does the right angle 'use up' any of the 180° total before the two acute angles are found?"
3. "Can a triangle have two 90° angles at once?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 ("square corner" definition and parts, door-corner analogy) → TA-A02 (representation and acute angle sum) → TA-A03 (contrast with other triangle types) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the door-corner bridge to legs and hypotenuse (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — hypotenuse identification in a rotated diagram (Blueprint TA-B01), targeting MC-1.
- **DO: Worked Example** — the two-step acute-angle-sum computation (Blueprint TA-A02), targeting MC-2.
- **ORGANIZE: Concept Map** — the right/acute/obtuse contrast table, confirming exclusivity of the 90° condition (Blueprint TA-A03), targeting MC-3.

## Voice Teaching Notes
Before accepting a hypotenuse identification, ask "which vertex has the right angle — and is the side you named touching it?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.trig.right-triangle-trig` per the Blueprint's Component 0 — cross_links includes this Tier 1 target)**: reused verbatim from the Blueprint's Component 4 TA-A04 — labeling opposite/adjacent/hypotenuse relative to a 35° angle and computing the opposite side's length via a given sin value.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 4 TA-A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to explicitly name the right-angle vertex out loud before ever naming the hypotenuse, using only rotated or non-standard diagrams for practice until the positional rule overrides visual length entirely.

## Memory Hooks
- "The hypotenuse is opposite the right angle — not whichever side looks longest."
- "The right angle uses up 90° — the two acute angles share only the remaining 90°."
- "Two right angles in one triangle leave zero degrees for the third — impossible."

## Transfer Connections
- `math.geom.pythagorean-theorem` (unlocks) requires knowing which side is the hypotenuse and which are legs, since a²+b²=c² is stated in exactly those terms.
- `math.trig.right-triangle-trig` (unlocks, cross-link) requires the opposite/adjacent/hypotenuse side labeling and the acute-angle-sum this concept develops.
- `math.geom.triangle` and `math.geom.perpendicular-lines` (require) supply the angle-sum theorem and the 90°-angle definition this concept specializes.

## Cross-Subject Connections
- Physics: resolving forces or velocities into perpendicular components routinely relies on right-triangle side and angle identification established here.

## Blueprint References
`docs/curriculum/blueprints/math.geom.right-triangle.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 6.
