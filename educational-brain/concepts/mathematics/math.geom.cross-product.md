## Identity

- **KG ID**: `math.geom.cross-product`
- **Name**: Cross Product
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5
- **Requires**: `math.geom.vectors-3d`
- **Unlocks**: (none in current KG)
- **Cross-links**: `math.geom.dot-product`

## Learning Objective

Given two 3D vectors **a** and **b**, the student:

(a) computes **a** × **b** using the determinant/component formula, stating the result is a VECTOR;  
(b) states that |**a** × **b**| = |**a**||**b**| sin θ and identifies this as the area of the parallelogram spanned by **a** and **b**;  
(c) applies the right-hand rule to determine the direction of **a** × **b**;  
(d) recognizes anti-commutativity: **a** × **b** = −(**b** × **a**);  
(e) distinguishes the cross product (vector output) from the dot product (scalar output) by inspection.

## Core Understanding

The cross product **a** × **b** produces a **vector** — perpendicular to both **a** and **b**, with magnitude |**a**||**b**| sin θ. This is the area of the parallelogram spanned by **a** and **b**.

**Direction**: the right-hand rule — point fingers along **a**, curl toward **b**, thumb points along **a** × **b**.

**Anti-commutativity**: reversing the order flips the vector: **a** × **b** = −(**b** × **a**). Unlike the commutative dot product, ORDER MATTERS for the cross product.

**Only in ℝ³**: the cross product is defined specifically for 3D vectors. It does not generalize to ℝ² in the same way.

**Parallelism test**: **a** × **b** = **0** if and only if **a** and **b** are parallel (sin θ = 0). This is the cross product's orthogonality analog — but for parallelism, not perpendicularity.

## Mental Models

- **Spinning a bottle**: lay a bottle along **a**'s direction; twist it toward **b**. The axis your right hand's thumb follows IS the cross product's direction. The faster the "spin" (larger sin θ, further from parallel), the longer the cross product vector.
- **Parallelogram area factory**: the cross product packages two geometric facts — the perpendicular direction AND the area of the span — into a single vector. The magnitude gives area; the direction gives orientation.
- **Cross vs. dot**:  dot = alignment (cosine, scalar); cross = perpendicular axis (sine, vector). They measure complementary aspects of how two vectors relate.

## Why Students Fail

Students confuse the cross product with the dot product and report a scalar result. They also forget anti-commutativity — assuming **a** × **b** = **b** × **a** by analogy with ordinary multiplication. The right-hand rule is forgotten under pressure (students substitute "point from **a** to **b**" without using the hand orientation). Students also struggle with the determinant formula, frequently dropping a sign in the middle row or confusing the subscript order.

## Misconceptions

### MC-1 — CROSS-PRODUCT-IS-A-SCALAR
**Birth type**: Type 3 (language contamination — both dot and cross products are called "vector products" in some texts; confusion with `math.geom.dot-product`'s scalar result)
**Mechanism**: The student has also computed dot products and applies the same "combine two vectors → get a number" expectation. The cross product notation **a** × **b** looks like ordinary multiplication, which students associate with scalar × scalar = scalar.
**Diagnostic probe**: "Compute **i** × **j**. What type of result do you get?" — watch for the answer "0" or "1" (scalar) rather than **k** (a vector).
**Characteristic phrases**: "The cross product is 1" / "Isn't the cross product just a number?" / "I thought it was like the dot product."

### MC-2 — CROSS-PRODUCT-IS-COMMUTATIVE
**Birth type**: Type 2 (perceptual intuition — ordinary multiplication is commutative; the × symbol reinforces this)
**Mechanism**: Students transpose the order of two cross products without changing the sign. In multi-step problems this often cancels with another sign error and goes undetected, masking the misconception.
**Diagnostic probe**: "If **a** × **b** = ⟨1, 2, 3⟩, what is **b** × **a**?" — watch for ⟨1, 2, 3⟩ rather than ⟨−1, −2, −3⟩.
**Characteristic phrases**: "It doesn't matter which order" / "Shouldn't **a** × **b** = **b** × **a**?"

### MC-3 — WRONG-SIGN-IN-DETERMINANT-FORMULA
**Birth type**: Type 4 (notation-induced — the alternating-sign pattern in the cofactor expansion is non-obvious; the middle term carries a minus sign)
**Mechanism**: Students write the cross product as (a₂b₃ − a₃b₂, a₁b₃ − a₃b₁, a₁b₂ − a₂b₁) — dropping the minus on the **j** component, or using the wrong pair in the **k** component. Errors in the middle component are especially common.
**Diagnostic probe**: "Compute ⟨1,2,3⟩ × ⟨4,5,6⟩ step by step." — watch for the middle component; correct is −(1·6 − 3·4) = −(6 − 12) = 6, not the unsigned version.
**Characteristic phrases**: "I get ⟨−3, −6, −3⟩" (a common wrong answer) / "Why is there a minus in the middle?"

## Analogies

- **Wrench torque**: when you turn a bolt, the torque vector points along the bolt's axis in the direction your right hand's thumb points when you curl fingers in the turning direction. Torque = **r** × **F** — the cross product computes the turning axis AND the turning "strength" (torque magnitude) simultaneously.
- **Spinning top**: the angular momentum of a spinning body (I**ω**) and the torque applied to it are both cross-product quantities. The cross product captures the "axis of effect" that scalar arithmetic cannot.

## Demonstrations

1. **Standard basis verification**: compute **î** × **ĵ** by the determinant formula → **k̂**. Apply the right-hand rule to confirm. Then compute **ĵ** × **î** → −**k̂**, confirming anti-commutativity. Both results match the geometric picture (the xy-plane's normal is the z-axis, and swapping order flips orientation).
2. **Parallelogram area**: take **a** = ⟨3, 0, 0⟩ and **b** = ⟨0, 4, 0⟩. Compute **a** × **b** = ⟨0, 0, 12⟩; magnitude 12. The parallelogram they span is a 3×4 rectangle; area = 12. ✓
3. **Anti-commutativity physical demo**: use your right hand to compute **î** × **ĵ** = **k̂** (thumb up). Then switch and apply **ĵ** × **î** — right-hand rule gives **−k̂** (thumb down). The reversed order literally flips the axis.

## Discovery Questions

- "If **a** × **b** = **0** and neither vector is zero, what does that tell you about **a** and **b**? Can you produce an example?"
- "If you double **a**, how does the cross product **a** × **b** change? What if you reverse **a**'s direction?"
- "Why does the cross product only exist in 3D? What goes wrong if you try to define it in 2D?"

## Teaching Sequence

1. Recall the dot product: scalar, commutative, measures alignment.
2. Motivate: "what if we want the perpendicular direction instead of the alignment?"
3. State the right-hand rule and direction geometrically before any formula.
4. State the magnitude formula |**a** × **b**| = |**a**||**b**| sin θ; connect to parallelogram area.
5. Introduce the determinant formula; drill sign pattern with ĵ's minus sign explicitly labeled.
6. Verify anti-commutativity: **î** × **ĵ** = **k̂**, **ĵ** × **î** = **−k̂**.
7. Explicitly contrast: "dot = scalar, commutative; cross = vector, anti-commutative."
8. Assessment gate.

## Tutor Actions

- **Blueprint Teaching Action A01**: contrast dot product (scalar) vs. cross product (vector) before any computation; require student to state the result type before computing.
- **Blueprint Teaching Action A02**: determinant formula with explicit sign labeling on the middle component; three drill problems.
- **Blueprint Teaching Action A03**: anti-commutativity and right-hand rule applications.
- **MC-1 intervention**: restate: "the cross product of two vectors is a vector, never a number." Contrast with dot product side-by-side.
- **MC-2 intervention**: compute **a** × **b** and **b** × **a** for the same pair; show the results are negatives of each other; repeat with two more pairs.
- **MC-3 intervention**: write the determinant template on paper; underline the minus sign on the **ĵ** term in red every time. Require the student to write it in before filling in any numbers.

## Voice Teaching Notes

- Say "the cross product of **a** and **b**" — never "**a** cross **b**" alone; the word "cross" without "product" can slip into "multiplication" thinking.
- When applying the right-hand rule, narrate the hand motion aloud: "fingers along **a**, curl toward **b**, thumb points..." — the kinesthetic action is the memory anchor.
- Latency signal: a pause before the sign of the middle component almost always signals MC-3; prompt with "what's the sign on the **ĵ** term in the cofactor expansion?"

## Assessment Signals

- **Entry check**: compute |**v**| for **v** = ⟨1, −2, 2⟩ (confirms `math.geom.vectors-3d`); name the angle between two parallel vectors (confirms geometric intuition).
- **Vector-type probe**: "What type of quantity is **a** × **b**?" — must answer "vector."
- **Component probe**: **a** = ⟨2, 1, −1⟩, **b** = ⟨0, 3, 4⟩; compute **a** × **b**.
- **Anti-commutativity probe**: given **a** × **b** = ⟨3, −1, 2⟩, state **b** × **a** without recomputing.
- **Mastery gate**: 4/5 problems including one right-hand rule direction problem and one anti-commutativity check.

## Tutor Recovery Strategy

- **MC-1 (scalar confusion)**: restate the definition: "the cross product takes two vectors and outputs a new vector." Put the dot product formula and the cross product formula side by side; point to the scalar vs. vector nature of each result. Ask: "is ⟨0,0,1⟩ a number?"
- **MC-2 (commutativity)**: use the unit vectors: compute **î** × **ĵ** = **k̂** and **ĵ** × **î** = **−k̂** together. Then say: "reversing the order flips the vector. This is true for any two vectors — reversing the order always flips the result."
- **MC-3 (sign error in determinant)**: have the student write the full determinant template — **î**(a₂b₃ − a₃b₂) **− ĵ**(a₁b₃ − a₃b₁) **+ k̂**(a₁b₂ − a₂b₁) — and circle the minus sign on the **ĵ** component in a different color every single time before computing.

## Memory Hooks

- **Cross = vector**: "cross product crosses the room — it goes somewhere (vector), it doesn't just measure (scalar)."
- **Anti-commutativity**: "switch and flip" — switch the order, flip the sign.
- **Magnitude**: "sine of the gap" — the cross product's magnitude uses sin θ, measuring the gap from parallel; the dot product uses cos θ, measuring alignment.

## Transfer Connections

- `math.geom.dot-product`: the complementary vector product; dot → scalar via cosine (alignment); cross → vector via sine (perpendicular axis). Together they fully encode the relationship between two 3D vectors.
- `math.linalg.inner-product-space`: the dot product generalizes to inner product spaces; the cross product does not — it is specific to ℝ³ (and ℝ⁷). This asymmetry is worth noting explicitly when students reach linear algebra.

## Cross-Subject Connections

- Physics: torque **τ** = **r** × **F**; angular momentum **L** = **r** × **p**; the Lorentz force **F** = q(**v** × **B**) — all three of classical mechanics' most important "turning" quantities are cross products.
- Computer graphics: computing surface normals for lighting calculations is a direct application of the cross product; a surface's normal at a point is the cross product of two tangent vectors there.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.cross-product.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Component 1 (Learning Objectives LO1-LO3), misconceptions MC-1 (scalar confusion), MC-2 (commutativity), MC-3 (sign error).
- Worked examples, mastery-probe specifications, and teaching-action sequences live in the Blueprint — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.cross-product:EXPLANATION:en` (DRAFT, live-capture)
- Probe assets: `math.geom.cross-product:PROBE:en` (DRAFT, live-capture; probes should target MC-1 result-type, MC-2 anti-commutativity, MC-3 determinant sign)

## Curriculum Feedback

None at this time.

## Version History

- v1.0 — initial entry authored 2026-08-03
