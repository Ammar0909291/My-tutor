# Teaching Blueprint: Cross Product (`math.linalg.cross-product`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.cross-product` |
| name | Cross Product |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.vector`, `math.linalg.dot-product` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — right-hand-rule diagrams before symbolic component formula |
| description (KG) | Defined in ℝ³: a×b = (a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁). Result is perpendicular to both a and b; magnitude is \|a\|\|b\|sin θ (area of parallelogram). Anti-commutative.

 |

## Component 1 — Learning Objectives

- LO1: Compute the cross product $a\times b$ of two vectors in $\mathbb{R}^3$ using the component formula $(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)$.
- LO2: State and use the two key GEOMETRIC properties: the result is PERPENDICULAR to both $a$ and $b$, and its MAGNITUDE equals $|a||b|\sin\theta$ (the area of the parallelogram spanned by $a,b$).
- LO3: Apply ANTI-COMMUTATIVITY: $a\times b=-(b\times a)$ — reversing the order of the cross product NEGATES the result, unlike the (commutative) dot product.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.vector` (vectors in $\mathbb{R}^n$) and `math.linalg.dot-product` (the OTHER vector product this concept is directly contrasted against).

## Component 3 — Core Explanation

The **cross product**, defined only in $\mathbb{R}^3$, is $a\times b=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)$ — a genuinely NEW vector (unlike the dot product, which produces a scalar). Geometrically: the result is PERPENDICULAR to BOTH $a$ and $b$ (normal to the plane they span), and its magnitude equals $|a||b|\sin\theta$, exactly the AREA of the parallelogram formed by $a$ and $b$.

The cross product is ANTI-COMMUTATIVE: $a\times b=-(b\times a)$ — swapping the order REVERSES the sign (and hence direction) of the result, a genuinely different behavior from the dot product's commutativity ($a\cdot b=b\cdot a$).

## Component 4 — Worked Examples

**Example 1 (LO1 — component computation)**: Compute $(1,2,3)\times(4,5,6)$. Using the formula: first component $=2(6)-3(5)=12-15=-3$; second component $=3(4)-1(6)=12-6=6$; third component $=1(5)-2(4)=5-8=-3$. Result: $(-3,6,-3)$.

**Example 2 (LO2 — perpendicularity and magnitude, breaking MC-1)**: Verify $(-3,6,-3)$ from Example 1 is perpendicular to BOTH $(1,2,3)$ and $(4,5,6)$: dot product with $(1,2,3)$: $(-3)(1)+(6)(2)+(-3)(3)=-3+12-9=0$ ✓ (perpendicular); dot product with $(4,5,6)$: $(-3)(4)+(6)(5)+(-3)(6)=-12+30-18=0$ ✓ (perpendicular). A common error assumes the cross product's MAGNITUDE alone (without checking perpendicularity via a dot-product test) confirms correctness — a computational slip could produce a wrong-magnitude but still nonzero vector; the PERPENDICULARITY check (dot product = 0 with both original vectors) is the more diagnostic verification, since any correct cross product must satisfy it exactly.

**Example 3 (LO3 — anti-commutativity, breaking MC-2)**: Compute $(4,5,6)\times(1,2,3)$ (the REVERSED order from Example 1). Using the formula: first component $=5(3)-6(2)=15-12=3$; second $=6(1)-4(3)=6-12=-6$; third $=4(2)-5(1)=8-5=3$. Result: $(3,-6,3)$ — exactly the NEGATION of Example 1's result $(-3,6,-3)$, confirming anti-commutativity. A common error expects the SAME result regardless of order (by analogy with the commutative dot product), rather than recognizing the cross product genuinely flips sign when the operand order is reversed.

## Component 5 — Teaching Actions

### Teaching Action A01 — Component Formula, Computed Systematically (Primitive P64: Conceptual Shift)

Work Example 1, computing each of the three components in a consistent cyclic pattern (2,3 / 3,1 / 1,2 index pairs), reducing the chance of index-mixing errors.

### Teaching Action A02 — Verify Perpendicularity via the Dot Product (Primitive P06: Contrast Pair)

Work Example 2's dot-product verification against relying on magnitude alone, showing the perpendicularity check is the more rigorous confirmation. State the rule: "always verify a computed cross product by dot-producting it with BOTH original vectors — genuine cross products always give exactly zero both times."

- **MC-1 hook**: this directly targets MC-1 (not verifying perpendicularity, relying on a less diagnostic check).

### Teaching Action A03 — Anti-Commutativity: Order Matters, Sign Flips (Primitive P06: Contrast Pair, second pairing)

Work Example 3's reversed-order computation, showing the result negates exactly, contrasting explicitly against the dot product's commutative behavior. State the rule: "cross product order matters — reversing it flips the sign, unlike the dot product where order never matters."

- **MC-2 hook**: this directly targets MC-2 (expecting order-independence by incorrect analogy with the dot product).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute $(2,1,0)\times(0,3,1)$.
  2. Verify your answer to problem 1 is perpendicular to both original vectors using dot products.
  3. Compute $(0,3,1)\times(2,1,0)$ (reversed order) and confirm it is the negation of problem 1's result.
  4. Explain, in one sentence, why the cross product's magnitude equals the area of the parallelogram spanned by the two vectors.
- **P76 (Transfer Probe, mode = independence)**: "A mechanical engineer computes torque using $\tau=r\times F$ (position vector cross force vector), where $r=(2,0,0)$ meters and $F=(0,5,0)$ Newtons. (a) Compute the torque vector $\tau$. (b) A colleague computes $F\times r$ instead of $r\times F$ by mistake — explain, using this lesson's anti-commutativity property, exactly how their (incorrect) result relates to the correct torque vector, and why this order mistake matters physically (torque DIRECTION, indicating rotation axis and sense, would be reversed)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CROSS-PRODUCT-PERPENDICULARITY-NOT-VERIFIED | Not checking a computed cross product's perpendicularity to both original vectors via dot products, missing a reliable verification method | Moderate |
| MC-2 | CROSS-PRODUCT-ASSUMED-COMMUTATIVE | Expecting $a\times b=b\times a$ by incorrect analogy with the commutative dot product, missing the genuine anti-commutative sign flip | Foundational |
| MC-3 | CROSS-PRODUCT-COMPONENT-FORMULA-INDICES-MIXED-UP | Miscomputing one or more of the three cross-product components by using the wrong pair of indices from the formula | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Cross Product Perpendicularity Not Verified") → P41 (detect: review a submitted cross-product computation for a missing verification step) → P64 (conceptual shift: re-compute the dot product of the result with BOTH original vectors, confirming both equal zero).
- **B02 (targets MC-2)**: P27 ("Cross Product Assumed Commutative") → P41 (detect: ask whether $a\times b$ and $b\times a$ should be equal; check for a "yes" answer) → P64 (conceptual shift: re-compute both orders explicitly for a concrete example, confirming the sign flip).
- **B03 (targets MC-3)**: P27 ("Cross Product Component Formula Indices Mixed Up") → P41 (detect: review a submitted computation for a component using the wrong index pair) → P64 (conceptual shift: re-derive using the consistent cyclic pattern — (2,3), (3,1), (1,2) — for the three components in order).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.vector`, `math.linalg.dot-product`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.dot-product` (the contrasted scalar-valued, commutative vector product).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that the cross product's computation is mechanically straightforward once the index pattern is internalized, with the genuine conceptual content being its geometric meaning and anti-commutative behavior.
- MC-2 was ranked most severe because it represents a natural but incorrect generalization from the already-mastered dot product's commutativity — a classic case where prior correct learning (about a DIFFERENT but superficially similar operation) actively interferes with new learning.
- The torque transfer probe was deliberately chosen because it is THE canonical physical application of the cross product where order genuinely matters for real physical meaning (rotation direction), giving MC-2's correction concrete, high-stakes significance beyond an abstract algebraic rule.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.vector`, `math.linalg.dot-product`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: right-hand-rule diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
