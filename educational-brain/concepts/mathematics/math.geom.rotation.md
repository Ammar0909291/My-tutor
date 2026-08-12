## Identity

- **KG ID**: `math.geom.rotation`
- **Name**: Rotation
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 4
- **Requires**: `math.geom.transformations`, `math.trig.trig-functions`
- **Unlocks**: (none in current KG)
- **Cross-links**: (none in KG)

## Learning Objective

Given a point and a center of rotation, the student:

(a) applies a rotation by angle θ about the origin using the 2×2 rotation matrix;  
(b) recognizes that counterclockwise is the positive convention for angle θ;  
(c) applies the correct three-step process (translate–rotate–translate-back) for rotation about a non-origin center;  
(d) verifies that rotation preserves distance from the center;  
(e) connects the rotation matrix entries directly to `math.trig.trig-functions`.

## Core Understanding

A **rotation** turns every point by the same angle θ about a fixed center, preserving distance from that center. For rotation about the **origin**:

> (x', y') = (x cos θ − y sin θ,  x sin θ + y cos θ)

Written as a matrix: **R**(θ) = [[cos θ, −sin θ], [sin θ, cos θ]].

The **−sin θ in the top-right** position is the critical sign to get right; the matrix rotates counterclockwise for positive θ.

For a center OTHER than the origin: translate the center to the origin → rotate → translate back. Skipping any step produces an incorrect result.

## Mental Models

- **Clock hand**: a clock's hands rotate about the center of the clock face. To move a point "like a clock hand rotates," the rotation formula is the mathematical version of that motion.
- **Pinwheel pivot**: a pinwheel spins about a pin at one end. Each arm point traces a circle centered on the pin — rotation preserves that circle's radius. The matrix is the formula that moves each arm point to its new position on its circle.
- **Matrix as a lookup table**: the rotation matrix encodes cos θ and sin θ in specific positions because those are exactly the formulas for how x and y coordinates transform when you rotate a point. The matrix is not arbitrary — each entry has a specific trigonometric meaning.

## Why Students Fail

Students apply the origin-centered matrix directly to points when rotating about a different center. They also confuse the sign convention — some textbooks use the clockwise-positive convention (transposing the matrix), leading to sign errors when switching between sources. The three-step process (translate → rotate → translate back) is known as a procedure but the translate-back step is often omitted. Students also forget that rotation matrices come in two standard forms depending on whether the convention is active or passive transformation.

## Misconceptions

### MC-1 — WRONG-MATRIX-SIGN-CONVENTION
**Birth type**: Type 4 (notation-induced — different textbooks use clockwise vs. counterclockwise as positive, producing the transposed matrix; the minus sign position differs)
**Mechanism**: A student who learned the matrix from one source and encounters a problem from another source with a different convention applies the wrong matrix. The errors are systematic and plausible-looking, making them hard to detect without explicit sign checking.
**Diagnostic probe**: "Rotate (1, 0) by 90° counterclockwise. What is the result?" — correct answer (0, 1); watch for (0, −1) which comes from the clockwise matrix.
**Characteristic phrases**: "I used the rotation matrix and got a negative answer" / "The matrix I have gives the wrong direction."

### MC-2 — SKIP-TRANSLATE-FOR-NON-ORIGIN-CENTER
**Birth type**: Type 5 (instruction-induced — the formula for origin-centered rotation is taught and drilled extensively; the non-origin case is presented as a brief addendum and the procedure is under-practiced)
**Mechanism**: The student applies **R**(θ) directly to the original point coordinates, treating the non-origin center as if it were irrelevant. The result is geometrically incorrect but not obviously wrong without checking against a diagram.
**Diagnostic probe**: "Rotate (5, 4) by 90° about the center (2, 4)." — watch for a student who applies the rotation matrix to (5, 4) directly rather than first translating to (3, 0), rotating, then translating back to get (2, 7).
**Characteristic phrases**: "I just multiplied the point by the matrix" / "Why do I need to translate?"

### MC-3 — ROTATION-CHANGES-DISTANCE-FROM-CENTER
**Birth type**: Type 2 (perceptual intuition — students who watch the coordinates change dramatically may intuit that the distance from the center "must have changed")
**Mechanism**: Students do not verify the key invariant (distance from center is preserved) and mistakenly believe the point has moved "further away" or "closer in." This misconception rarely causes a computational error but signals a missing geometric understanding.
**Diagnostic probe**: "After rotating (3, 0) by 90° about the origin to get (0, 3), is the point closer to, farther from, or the same distance from the origin?" — watch for "farther" or "closer."
**Characteristic phrases**: "But the coordinates changed, so the distance must be different" / "It moved, so it's at a new distance."

## Analogies

- **Revolving door**: every panel of a revolving door sweeps through the same angle about the central pivot — the geometry of rotation. The rotation matrix is the formula that computes each panel-point's new coordinates after the door turns by angle θ.
- **Compass bearing**: a navigator turning on the spot by angle θ faces a new direction. Their feet don't move; only their orientation changes. Rotation in the plane is mathematically identical — the "feet" are the center of rotation, and the "facing direction" is the displaced point.

## Demonstrations

1. **90° rotation of (1, 0)**: plug θ = 90° into the matrix — cos 90° = 0, sin 90° = 1 — giving [[0, −1], [1, 0]] × (1, 0) = (0, 1). Draw both points on the grid. Visually confirm: (1, 0) is on the positive x-axis; (0, 1) is on the positive y-axis; the angle from the origin between them is exactly 90°.
2. **Distance invariance**: measure |original point| and |rotated point| from the origin for the result above. Both equal 1. Repeat for (3, 4) rotated by 45° — confirm both distances from the origin equal 5 before and after.
3. **Non-origin center — step by step**: rotate (5, 4) by 90° about (2, 4). Show the three steps on a diagram: translate (both points shift left 2), apply the matrix, translate back. Compare to the (wrong) result of applying the matrix without translating — the incorrectness is immediately visible on the diagram.

## Discovery Questions

- "What rotation matrix corresponds to 0°? To 180°? What do these matrices do to a point?"
- "If you apply R(θ) twice in succession, is that the same as R(2θ)? Why or why not?"
- "Can rotation change the shape or size of a figure? What properties are preserved?"

## Teaching Sequence

1. Recall the transformations concept: a rotation maps each point to a new point.
2. Establish the geometric fact: rotation preserves distance from the center.
3. For origin-centered rotation, derive the matrix entries from trigonometry (how does (1, 0) move under a rotation by θ?).
4. Drill the matrix formula; emphasize the minus sign on the top-right entry.
5. Apply to 90°, 180°, 270° cases as concrete checks.
6. Introduce the non-origin case; work through the three-step process with a diagram.
7. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: apply the 2×2 rotation matrix with the correct sign convention — start with unit vectors as test cases.
- **Blueprint Teaching Action A02**: rotation about a non-origin center — full translate–rotate–translate-back sequence.
- **MC-1 intervention**: explicitly name which convention is in use ("counterclockwise positive"); verify with (1, 0) rotated 90° → (0, 1) as a standard check.
- **MC-2 intervention**: draw the center on the diagram; show why applying the matrix to the original coordinates ignores the center geometrically.

## Voice Teaching Notes

- Say "rotate counterclockwise by θ" explicitly, every time — never just "rotate by θ."
- When stating the matrix, read it as: "x-prime equals x cosine minus y sine; y-prime equals x sine plus y cosine" — speaking both components helps students identify the sign pattern.
- Latency signal: a long pause when asked about a non-origin center usually signals MC-2; prompt with "what do you do first, before rotating?"

## Assessment Signals

- **Entry check**: state sin 90° and cos 90° without a calculator; describe in words what a general transformation does to a figure (confirms `math.geom.transformations`; confirms trig prerequisite).
- **Origin-center probe**: rotate (2, −1) by 45° about the origin. Leave answer in exact form.
- **Non-origin probe**: rotate (4, 3) by 90° counterclockwise about (1, 3).
- **Invariance probe**: without computing, state the distance of the rotated point in the previous problem from the center of rotation.
- **Mastery gate**: 4/5 problems including one non-origin center problem and one distance-invariance check.

## Tutor Recovery Strategy

- **MC-1 (wrong sign)**: verify using (1, 0) → (0, 1) for θ = 90°. State: "counterclockwise positive means the point on the positive x-axis moves to the positive y-axis. Only one matrix does this — the one with minus on the top-right."
- **MC-2 (skip translate)**: draw a picture. Mark the center (2, 4). Rotate the point (5, 4) mentally by 90° about (2, 4) — it should land at (2, 7). Then show how skipping the translate gives a completely different, wrong answer. The diagram is the proof.
- **MC-3 (distance changes)**: compute distance-from-center before and after for any rotation example. State: "rotation is the one transformation where the distance from the center NEVER changes — that's the defining property."

## Memory Hooks

- **Matrix sign pattern**: "minus on top-right, plus everywhere else" — the only asymmetric entry is the top-right one.
- **Non-origin three steps**: "translate-in, spin, translate-out" — like threading a bolt: move the hole to the spinner, spin, move back.
- **Distance preserved**: "rotation = same distance, different direction" — the distance from the center is the one thing rotation never touches.

## Transfer Connections

- `math.geom.transformations`: rotation is a specific instance of the general geometric transformation family (along with translation, reflection, and dilation). All share the vocabulary of images, pre-images, and mappings.
- `math.trig.trig-functions`: the rotation matrix is the most prominent appearance of sin and cos as coordinate-transformation functions, distinct from their role as ratios in a right triangle.

## Cross-Subject Connections

- Physics: rotation matrices appear in rigid-body mechanics, where every rotation of a 3D object is described by a 3×3 orthogonal matrix (a direct generalization of the 2×2 rotation matrix here).
- Computer graphics: rotations are one of the three standard affine transformations (alongside translation and scaling) applied to every rendered object; the rotation matrix here is the 2D version of the 3D homogeneous transformation matrices used in graphics pipelines.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.rotation.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (sign convention), MC-2 (non-origin center), MC-3 (distance).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.rotation:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.rotation:PROBE:en` (DRAFT, live-capture; probes should target MC-1 sign convention, MC-2 non-origin center)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03
