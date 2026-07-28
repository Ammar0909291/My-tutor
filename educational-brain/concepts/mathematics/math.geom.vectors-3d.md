## Identity

- **KG ID**: `math.geom.vectors-3d`
- **Name**: Vectors in 3D
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 6
- **Requires**: `math.geom.vectors-2d`
- **Unlocks**: `math.linalg.vector`, `math.calc.multivariable-intro`
- **Cross-links**: `math.linalg.vector`, `math.calc.multivariable-intro`

## Learning Objective

Extend 2D vector operations (addition, scalar multiplication, magnitude) to triples (a, b, c) in ℝ³; compute the dot product and cross product of two 3D vectors; interpret both products geometrically (angle, projection, perpendicularity, oriented area); and apply the right-hand rule to determine cross-product direction.

## Core Understanding

A 3D vector is an ordered triple (a, b, c), adding a z-component to the familiar 2D ordered pair. Every 2D vector operation extends component-by-component:

- **Addition**: (a₁,b₁,c₁) + (a₂,b₂,c₂) = (a₁+a₂, b₁+b₂, c₁+c₂)
- **Scalar multiplication**: k(a,b,c) = (ka,kb,kc)
- **Magnitude**: |(a,b,c)| = √(a²+b²+c²) — the Pythagorean theorem extended to three perpendicular axes

Two operations emerge in 3D that have no clean 2D analogue:

- **Dot product**: u·v = a₁a₂ + b₁b₂ + c₁c₂ (a scalar). Geometrically, u·v = |u||v| cos θ, encoding the angle between vectors. u·v = 0 if and only if u ⊥ v.
- **Cross product**: u×v is a vector perpendicular to both u and v (computed via the 3×3 determinant formula). |u×v| = |u||v| sin θ = area of the parallelogram spanned by u and v. Crucially, u×v = −(v×u) — anticommutative (the cross product is NOT commutative).

**Standard basis**: i = (1,0,0), j = (0,1,0), k = (0,0,1). Every 3D vector = ai + bj + ck.

*Scope note*: The full teaching treatment of dot product and cross product — including projections, the 3×3 determinant derivation, and misconception repair — lives in `math.geom.dot-product` and `math.geom.cross-product` respectively. This entry covers the 3D extension framework and introduces both products at the conceptual level needed before those entries.

## Mental Models

- **The 3D coordinate system as a room corner**: stand at the corner where two walls meet the floor. The floor is the xy-plane; one wall is the xz-plane; the other is the yz-plane. Any point in the room is (right/left, in/out, up/down) — the three orthogonal axes.
- **z is a full equal partner**: the z-component is not a label or annotation on a 2D vector — it is an equal coordinate with the same algebraic rights as x and y. Every formula that involves x and y separately must also involve z separately.
- **Dot product as a temperature** (scalar): the dot product collapses two vectors to a single number measuring how aligned they are. Two perpendicular vectors produce temperature zero; same-direction vectors produce the warmest (largest positive) number.
- **Cross product as a screwdriver**: u×v points in the direction a right-hand-threaded screw would advance if rotated from u toward v. This is the right-hand rule — curling the right-hand fingers from u to v, the thumb points in the direction of u×v.

## Why Students Fail

Most geometric intuition is built in the plane. The z-coordinate is invisible on a flat page and requires deliberate spatial imagination. Until a learner has truly internalized 3D as a full coordinate system, z may be treated as optional or decorative — producing magnitude errors (Pythagorean theorem applied to only two components) and dot/cross product errors (z terms omitted). Additionally, the dot product is the first operation in most curricula that takes two vectors and outputs a scalar; every prior vector operation produced a vector, so the scalar result of the dot product breaks an implicit pattern. The cross product's anticommutativity (u×v = −v×u) is frequently missed because the dot product IS commutative and learners carry that property over without checking.

## Misconceptions

### MC-1 — Z-AXIS-IS-DECORATIVE
**Birth type**: Type 2 (perceptual intuition — the z-axis is invisible on a flat page; visual intuition built from 2D diagrams does not naturally include a third axis)
**Mechanism**: The learner computes 2D magnitude or dot product formulas, omitting the z-term. The z-component appears to be an annotation rather than a full coordinate because 3D vectors must be drawn in perspective on 2D paper, making the z-axis visually peripheral.
**Diagnostic probe**: "Find the magnitude of the vector (2, 3, 6)." Watch for √(4+9) = √13 rather than √(4+9+36) = 7.
**Characteristic phrases**: "I forgot about the z" / computing |(2,3,6)| = √13 / writing u·v = a₁a₂ + b₁b₂ (missing c₁c₂).

### MC-2 — CROSS-PRODUCT-IS-COMMUTATIVE
**Birth type**: Type 6 (analogy overextension — dot product commutativity u·v = v·u is correct, and this property is incorrectly extended to the cross product)
**Mechanism**: The learner knows u·v = v·u (the dot product is commutative) and applies the same assumption to the cross product, missing that u×v = −(v×u). This produces direction errors in physics problems (torque, magnetic force) where the sign of the cross product determines direction.
**Diagnostic probe**: "If u×v = (1, −2, 3), what is v×u?" Watch for (1, −2, 3) rather than (−1, 2, −3).
**Characteristic phrases**: "The order doesn't matter" / applying commutativity to cross product / confusion about why v×u gives a different geometric direction.

### MC-3 — DOT-PRODUCT-IS-A-VECTOR
**Birth type**: Type 1 (overgeneralization — all prior vector operations (addition, scalar multiplication) produce vectors; the dot product is the first operation that maps two vectors to a scalar, breaking the pattern)
**Mechanism**: The learner computes the dot product component-by-component but retains the result as a vector rather than summing to a scalar. E.g., (3,2,1)·(1,0,2) → (3,0,2) instead of 3+0+2 = 5.
**Diagnostic probe**: "Compute (3,2,1)·(1,0,2)." Watch for the triple (3,0,2) rather than the scalar 5.
**Characteristic phrases**: producing a vector as the "dot product" answer / saying "the dot product is (3,0,2)" / confusing component-wise multiplication with summing to a scalar.

## Analogies

- **Magnitude in 3D — two Pythagorean steps**: to find the distance from (0,0,0) to (a,b,c), first find the distance in the xy-plane (√(a²+b²)), then treat that as the base of a right triangle with height c. √((√(a²+b²))² + c²) = √(a²+b²+c²). This makes the 3D Pythagorean theorem a double application of the 2D one.
- **Dot product as alignment meter**: two vectors pointing in exactly the same direction → maximum positive dot product. Perpendicular → zero. Opposite → maximum negative. Use it to check whether two things are "going the same way."
- **Cross product as a compass needle**: u×v points perpendicular to both u and v, just as a compass needle stands perpendicular to the magnetic field lines it aligns with.

## Demonstrations

1. **Room-corner axes**: in a classroom, label the corner of the room as the origin. Walk along the floor toward the front wall = +x direction; walk along the floor toward a side wall = +y direction; walk up the wall = +z direction. Ask a student to locate the point (2, 1, 3) in the room.
2. **Magnitude check**: give vector (3, 4, 0) — magnitude √(9+16) = 5. Then give (3, 4, 12) — magnitude √(9+16+144) = 13. The z-component added a full Pythagorean leg; it is not optional. Confirm with a 3D drawing.
3. **Right-hand rule physical demonstration**: hold a right hand with fingers pointing in the direction of u (e.g., i = right), curl toward v (e.g., j = toward student), thumb points upward = k. Now reverse: curl from j toward i → thumb points downward = −k. This proves i×j = k and j×i = −k in one physical gesture.

## Discovery Questions

- "What changes when you add a z-component to a 2D vector? What stays the same in the formulas?"
- "If two 3D vectors have dot product zero, what does that tell you geometrically?"
- "Why does the order matter for u×v but not for u·v?"

## Teaching Sequence

1. Activate prior knowledge: 2D vector magnitude and operations.
2. Extend to 3D: introduce (a,b,c); 3D Pythagorean magnitude via two-step derivation.
3. Standard basis vectors i, j, k; decompose any 3D vector.
4. Introduce dot product as a scalar; geometric meaning (cosθ, orthogonality test).
5. Introduce cross product conceptually — a vector perpendicular to both inputs; right-hand rule for direction.
6. Anticommutativity: derive u×v = −v×u via the right-hand rule demonstration.
7. Assessment gate.
8. Point forward to `math.geom.dot-product` and `math.geom.cross-product` for full computational treatment.

## Tutor Actions

- **Blueprint TA-A01**: analogy bridge — 2D operations extended component-wise to 3D; 3D Pythagorean magnitude via two steps.
- **MC-1 intervention**: before any computation, explicitly run through the magnitude formula in 3D with a vector that has all three components nonzero. Name the z-term equal to x and y.
- **MC-2 intervention**: demonstrate the right-hand rule for both u×v and v×u physically; show the opposing directions. Name the anticommutativity property explicitly (do not leave it as a computation to notice).
- **MC-3 intervention**: state before introducing the dot product: "this operation produces a number, not a vector — it will break the pattern of everything we've done so far." Then demonstrate the sum-of-products formula one step at a time.

## Voice Teaching Notes

- Pause after introducing the z-component and ask: "Does the formula you know for 2D magnitude still work? What do you need to add?" — let the student extend the formula rather than presenting it directly.
- When computing cross products, narrate the right-hand rule out loud: "right hand, fingers point in u's direction, curl toward v, thumb points…" — makes the physical rule memorable.
- Latency signal: a student who pauses on magnitude with three nonzero components is likely checking whether to include z — a gentle "all three components go in the formula" resolves MC-1.
- Adult register: "In physics and engineering, 3D vectors are unavoidable — this z-component is what describes height, depth, or a force with a vertical component. Leaving it out gives wrong answers in real problems."

## Assessment Signals

- **Entry check**: magnitude and component operations on 2D vectors.
- **MC-1 probe**: magnitude of a vector with all three components nonzero — watch for the 2D formula.
- **Dot product scalar probe**: "What type of result does u·v give — a vector or a number?" followed by a computation.
- **MC-2 probe**: given u×v, find v×u — watch for sign retention or reversal.
- **Orthogonality probe**: given two vectors, compute the dot product and conclude whether they are perpendicular.
- **Right-hand rule probe**: given u and v in a diagram, point in the direction of u×v without computing.

## Tutor Recovery Strategy

- **MC-1 (z-axis-is-decorative)**: Blueprint TA-B01 — two-step Pythagorean derivation in 3D makes the z-term structurally necessary, not optional. Follow with a targeted magnitude computation on a vector with a large z-component (so the z contribution is undeniably significant).
- **MC-2 (cross product commutativity)**: Blueprint TA-B02 — the right-hand rule demonstration makes direction reversal visually undeniable. Follow with u×v and v×u computed numerically (via determinant formula, when the student has `math.geom.cross-product`) confirming the sign flip component-by-component.
- **MC-3 (dot product is a vector)**: Blueprint TA-B02 (shared) — restate the definition as "multiply matching components, then ADD all three products to get a single number." Write the formula as Σ(uᵢvᵢ), then work one example slowly, emphasizing the final addition step that collapses three terms to one scalar.

## Memory Hooks

- **Magnitude rule**: a²+b²+c² under the root — "all three get squared, all three get added."
- **Dot product = scalar**: "dot and flat" — the dot product flatlines to a single number.
- **Cross product anticommutativity**: "switching the order switches the sign" — u×v = −v×u. Same magnitude, opposite direction.
- **Right-hand rule**: right hand, finger-curl from u to v, thumb = u×v direction.

## Transfer Connections

- `math.geom.dot-product`: full computational treatment of u·v including the angle formula, projection, and application to work in physics.
- `math.geom.cross-product`: full computational treatment of u×v including the 3×3 determinant formula, area of parallelogram, and normal vectors to planes.
- `math.linalg.vector`: linear algebra's general vector concept subsumes 3D geometric vectors; this entry provides the geometric grounding for linear algebra's more abstract framework.
- `math.calc.multivariable-intro`: functions of two or three variables operate in ℝ³; 3D vectors are the natural inputs and outputs.

## Cross-Subject Connections

- Physics: every force, velocity, and acceleration problem in 3D requires 3D vectors. Cross products appear in torque (τ = r×F) and magnetic force (F = qv×B). Dot products appear in work (W = F·d).
- Computer graphics: 3D scene coordinates, camera direction vectors, surface normals (cross products), and lighting calculations (dot products for angle of incidence) all use this entry's content.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.vectors-3d.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 1 (Cognitive Map, CPA arc), Component 2 (Misconception Registry MC-1 to MC-3), Component 3 (Scaffolding Protocol), Component 4 (TA-A01 analogy bridge).
- Misconception Registries cited by ID: MC-1 Z-AXIS-IS-DECORATIVE → Blueprint MC-1 (birth type Type 2 added here), MC-2 CROSS-PRODUCT-IS-COMMUTATIVE → Blueprint MC-2 (birth type Type 6), MC-3 DOT-PRODUCT-IS-A-VECTOR → Blueprint MC-3 (birth type Type 1).
- Full dot-product and cross-product teaching sequences, worked examples, mastery gates, and repair protocols deferred to `math.geom.dot-product` and `math.geom.cross-product` EB entries.

## Runtime Asset References

- Explanation assets: `math.geom.vectors-3d:EXPLANATION:en` (DRAFT, live-capture path)
- Probe assets: `math.geom.vectors-3d:PROBE:en` (DRAFT, live-capture; each probe should target one MC from the registry above)

## Curriculum Feedback

- The KG's unlocks and cross_links are identical (`math.linalg.vector`, `math.calc.multivariable-intro`). The cross-link to linear algebra's general vector concept is well-placed — 3D geometric vectors are the grounding for the abstract linear algebra entry.
- Blueprint Component 1 covers dot product and cross product fully within the vectors-3d teaching sequence, but the KG has separate nodes for both (`math.geom.dot-product`, `math.geom.cross-product`). This EB entry scopes to the 3D extension framework + conceptual introduction of both products, with full treatment deferred to those child entries — consistent with the KG's own structure.

## Version History

- v1.0 (2026-07-28): Initial entry. Blueprint-grounded (PACKAGE_READY Blueprint cited). Birth types added to MC-1–3. Scope note added deferring dot/cross product full treatment to child EB entries.
