## Identity

- **KG ID**: `math.geom.dot-product`
- **Name**: Dot Product
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 5
- **Requires**: `math.geom.vectors-3d`, `math.trig.trig-functions`
- **Unlocks**: `math.linalg.inner-product-space`
- **Cross-links**: `math.linalg.inner-product-space`

## Learning Objective

Given two vectors **a** and **b** in ℝ² or ℝ³, the student:

(a) computes **a** · **b** using the component formula a₁b₁ + a₂b₂ + a₃b₃;  
(b) computes **a** · **b** using the geometric formula |**a**||**b**| cos θ;  
(c) determines the angle between two vectors using the dot product;  
(d) identifies orthogonal vectors (dot product = 0) by inspection and confirms by computation;  
(e) uses the dot product to find the scalar projection of one vector onto another.

## Core Understanding

The dot product of two vectors is a **scalar** that encodes their mutual alignment. Two representations of the same operation:

- **Component form**: **a** · **b** = a₁b₁ + a₂b₂ + a₃b₃ — multiply corresponding components, sum the results.
- **Geometric form**: **a** · **b** = |**a**| |**b**| cos θ — the product of the magnitudes times the cosine of the included angle.

Setting these equal gives the angle formula: cos θ = (**a** · **b**) / (|**a**| |**b**|).

**Critical orthogonality test**: **a** · **b** = 0 if and only if **a** ⊥ **b** (or one vector is zero). This is the single most-used application of the dot product in all downstream work.

**Sign interpretation**: positive dot product → angle < 90° (vectors point "generally the same direction"); negative → angle > 90° (vectors point "generally opposite directions"); zero → perpendicular.

## Mental Models

- **Shadow model**: |**b**| cos θ is the length of **a**'s shadow cast onto **b** when the light shines perpendicular to **b**. The dot product is that shadow-length times |**a**|.
- **Component alignment meter**: the dot product measures "how much" two vectors agree direction by direction. When they point in opposite directions (antiparallel), every component pair contributes negatively, and the dot product is maximally negative. When parallel, maximally positive.
- **Work in physics**: force · displacement (both vectors) gives the work done. Only the component of force along the displacement contributes — that component IS the projection, which IS the dot product divided by |displacement|.

## Why Students Fail

Students confuse the dot product with ordinary multiplication and expect a vector result. They also conflate cos θ with θ itself, skipping the arccos step when finding the angle. The orthogonality test (dot product = 0 means perpendicular) is known but forgotten under pressure or misapplied (they test for dot product = 1 instead). Students also struggle with the directionality asymmetry of projections — **a** projected onto **b** is not the same length as **b** projected onto **a** unless |**a**| = |**b**|.

## Misconceptions

### MC-1 — DOT-PRODUCT-IS-A-VECTOR
**Birth type**: Type 3 (language contamination — "multiply" is associated with vector × vector = vector from cross product)
**Mechanism**: The student has also seen the cross product (which does yield a vector) and does not distinguish the two operations. When asked to compute the dot product, they may write a vector or get confused about whether the result should have direction.
**Diagnostic probe**: "Compute **a** · **b** where **a** = ⟨1, 2, 3⟩ and **b** = ⟨4, 5, 6⟩. What type of quantity is the answer?" — watch for a vector response or uncertainty about the type.
**Characteristic phrases**: "The dot product is 4, 10, 18" / "Do I get a vector or a number?" / "Isn't that like the cross product?"

### MC-2 — ORTHOGONALITY-TEST-INVERTED
**Birth type**: Type 2 (perceptual intuition — "perpendicular" feels like it should produce something special like 1, not 0)
**Mechanism**: Students who remember the Pythagorean theorem (c² = a² + b², involving 1) or the identity matrix (diagonal of 1s) sometimes expect perpendicular vectors to have dot product 1. The dot product = 0 result feels like "nothing" and therefore counterintuitive.
**Diagnostic probe**: "Are ⟨3, 4⟩ and ⟨−4, 3⟩ perpendicular? How do you know?" — watch for an attempt to find dot product = 1 or an inability to connect dot product = 0 to perpendicularity.
**Characteristic phrases**: "Perpendicular should give 1, not 0" / "The dot product is 0 but they don't look perpendicular to me."

### MC-3 — ANGLE-FORMULA-SKIPS-ARCCOS
**Birth type**: Type 4 (notation-induced — cos θ = value looks like it IS θ)
**Mechanism**: After computing cos θ = **a** · **b** / (|**a**| |**b**|), the student reports the result as θ without applying arccos, or reports θ = the decimal value of the cosine directly.
**Diagnostic probe**: "Find the angle between ⟨1, 0⟩ and ⟨1, 1⟩." — a student with MC-3 reports θ = 0.707 (the value of cos 45°) rather than θ = 45°.
**Characteristic phrases**: "The angle is 0.5" / "cos θ = 0.866 so θ = 0.866."

## Analogies

- **Measuring agreement**: two people deciding how much to tip — if one suggests 20% and the other 18%, they're "nearly aligned" (large dot product); one says 30% and the other says 5%, they're "nearly opposed" (negative dot product).
- **Efficiency of effort**: pushing a box across the floor — only the horizontal component of your force does useful work. The dot product computes exactly how much of your push is "wasted" on lifting vs. how much moves the box forward.

## Demonstrations

1. **Unit vectors**: compute **î** · **ĵ** (= 0) and **î** · **î** (= 1) by both component and geometric formulas simultaneously. This makes the orthogonality test concrete and memorizable at the same time.
2. **Angle verification**: take ⟨1, 0⟩ and ⟨1, 1⟩. Compute dot product = 1; magnitudes = 1 and √2. cos θ = 1/√2 → θ = 45°. Draw these vectors in the plane and visually confirm 45° is correct.
3. **Physical work**: draw a force vector at 30° to a horizontal surface, a displacement vector along the surface. Compute the work done = F · d = |F||d| cos 30°. Then show the component calculation gives the same answer: horizontal component of F = |F| cos 30°, times |d|.

## Discovery Questions

- "Can the dot product be negative? What does a negative value tell you about the two vectors?"
- "If two nonzero vectors have dot product = 0, what does that tell you geometrically? Can you name a pair of vectors with this property?"
- "If you triple the length of one vector, how does the dot product change? What if you reverse its direction?"

## Teaching Sequence

1. Recall vectors: magnitude, components, geometric representation.
2. Motivate via projection: "how much of this force is acting in this direction?"
3. Define component formula; compute several examples.
4. State geometric formula; verify it matches the component formula for a pair with a known angle.
5. Derive the angle formula from equating the two representations.
6. Establish orthogonality test as the immediate consequence.
7. Introduce scalar projection as the formal name for the "shadow" operation.
8. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: component formula with multiple numerical examples.
- **Blueprint Teaching Action A02**: geometric formula and angle computation.
- **Blueprint Teaching Action A03**: orthogonality applications and scalar projection.
- **MC-1 intervention**: explicitly contrast "dot product = scalar" vs. "cross product = vector" before any computation; make the student state the type of the result before computing.
- **MC-3 intervention**: write the template cos(θ) = ___  →  θ = arccos(___) on the board; require the student to fill in both blanks every time.

## Voice Teaching Notes

- Say "dot product" (not "scalar product" unless introducing the synonym) — the word "dot" connects directly to the notation **a** · **b**.
- When teaching the orthogonality test, say "dot equals zero means the vectors are at right angles" — connect the word zero to "right angle" explicitly, multiple times.
- Latency signal: a long pause before applying arccos often indicates MC-3; prompt with "and now what do you do with the cosine value?"

## Assessment Signals

- **Entry check**: compute a magnitude |**v**| for a 3D vector (confirms `math.geom.vectors-3d`); state cos 90° and cos 0° without a calculator (confirms trig prerequisite).
- **Component probe**: **a** = ⟨2, −1, 3⟩, **b** = ⟨4, 0, −1⟩; compute **a** · **b**.
- **Angle probe**: find the angle between ⟨1, 2⟩ and ⟨3, 4⟩ to the nearest degree.
- **Orthogonality probe**: given **a** = ⟨3, k⟩, find k such that **a** ⊥ ⟨4, −3⟩.
- **Mastery gate**: 4/5 problems including one orthogonality problem and one angle-finding problem.

## Tutor Recovery Strategy

- **MC-1 (vector-result confusion)**: restate the definition: "the dot product takes two vectors and outputs a single number." Ask the student to check: "is a number a vector?" — use arithmetic analogy: 3 × 4 = 12 (a single number), not a pair.
- **MC-2 (inverted orthogonality test)**: draw **î** and **ĵ** — student confirms they are perpendicular — compute **î** · **ĵ** = 0. Then: "perpendicular means dot product exactly zero, always." Repeat three times with different orthogonal pairs.
- **MC-3 (arccos skipped)**: start from the unit circle. cos(45°) = √2/2 ≈ 0.707 — the cosine VALUE is 0.707, the ANGLE is 45°. "cos θ = value" means θ = arccos(value). Drill this with three explicit cases before returning to vector problems.

## Memory Hooks

- **Dot product = scalar**: "dot = drop the direction."
- **Orthogonality test**: "zero dot = zero turn" (no turn left or right between them — they're at a right angle to each other, which is the one angle where no alignment is captured).
- **Angle formula**: "cosine θ = (dot product) over (both magnitudes)" — state it like a fraction.

## Transfer Connections

- `math.linalg.inner-product-space`: the dot product is the prototype inner product; all inner product spaces generalize this construction.
- `math.geom.cross-product`: the two vector multiplication operations; dot gives a scalar encoding angle; cross gives a vector encoding the perpendicular direction.
- `math.trig.trig-functions`: cos θ appears in the geometric formula; computing the angle requires arccos.

## Cross-Subject Connections

- Physics: work = **F** · **d**; Gauss's law integrand **E** · d**A**; the dot product is the workhorse of classical mechanics and electromagnetism.
- Computer graphics: surface normals, lighting calculations, and view-frustum culling all use dot products to measure alignment between vectors.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.dot-product.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 6 (Misconception Registry MC-1 to MC-3, repair protocols).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.dot-product:EXPLANATION:en` (DRAFT, live-capture; HUMAN_CURATOR seed pending)
- Probe assets: `math.geom.dot-product:PROBE:en` (DRAFT, live-capture; probes should target MC-1 orthogonality test, MC-3 angle formula)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03
