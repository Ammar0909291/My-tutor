# Teaching Blueprint: Cross Product (`math.geom.cross-product`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.cross-product` |
| name | Cross Product |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.geom.vectors-3d` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The cross product a × b is a vector perpendicular to both a and b with magnitude |a||b|sin θ; defined only in ℝ³ (and ℝ⁷).

 |

## Component 1 — Learning Objectives

- LO1: Compute the cross product $a\times b$ using the determinant/component formula, and state that the result is a VECTOR (not a scalar) — a common confusion with `math.geom.dot-product`, which produces a scalar.
- LO2: State the cross product's geometric properties: $a\times b$ is PERPENDICULAR to BOTH $a$ AND $b$, with MAGNITUDE $|a||b|\sin\theta$ (where $\theta$ is the angle between them) — and recognize this magnitude equals the AREA of the parallelogram spanned by $a$ and $b$.
- LO3: Apply the RIGHT-HAND RULE to determine the cross product's DIRECTION, and recognize the cross product is ANTI-COMMUTATIVE: $a\times b=-(b\times a)$ — REVERSING the order FLIPS the sign (direction), unlike the dot product, which is fully commutative.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.vectors-3d` — the cross product is specifically a 3D vector operation.

## Component 3 — Core Explanation

The **cross product** $a\times b$ of two 3D vectors produces a NEW VECTOR (not a scalar, in contrast to `math.geom.dot-product`) that is PERPENDICULAR to BOTH $a$ and $b$ simultaneously, with MAGNITUDE $|a\times b|=|a||b|\sin\theta$ (where $\theta$ is the angle between $a$ and $b$) — this magnitude has a direct geometric meaning: it equals the AREA of the parallelogram whose two sides are $a$ and $b$.

The cross product's DIRECTION (which of the two possible perpendicular directions) is determined by the RIGHT-HAND RULE: point the fingers of your right hand along $a$, curl them toward $b$, and your thumb points in the direction of $a\times b$.

A crucial algebraic property: the cross product is ANTI-COMMUTATIVE, $a\times b=-(b\times a)$ — swapping the order of the two vectors FLIPS the resulting vector's direction (sign), rather than leaving the result unchanged as the (fully commutative) dot product does.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing the cross product, breaking MC-1)**: Compute $a\times b$ for $a=(1,0,0)$ and $b=(0,1,0)$ (the standard $x$ and $y$ unit vectors). Using the determinant formula: $a\times b=(0\cdot0-0\cdot1,\ 0\cdot0-1\cdot0,\ 1\cdot1-0\cdot0)=(0,0,1)$ — a VECTOR result (the $z$-direction unit vector). A common error confuses this with the DOT product's SCALAR result (which for these vectors would be $1\cdot0+0\cdot1+0\cdot0=0$) — the cross product's result is a genuine VECTOR (with its own direction and magnitude), never a single number.

**Example 2 (LO2 — magnitude as parallelogram area)**: For the vectors in Example 1 (both unit vectors, perpendicular to each other, so $\theta=90°$), verify $|a\times b|=|a||b|\sin90°=1\times1\times1=1$ — matching the computed result $(0,0,1)$'s magnitude of 1, and confirming this equals the area of the UNIT SQUARE (a degenerate parallelogram) spanned by these two perpendicular unit vectors.

**Example 3 (LO3 — anti-commutativity and the right-hand rule, breaking MC-2)**: Compute $b\times a$ for the same vectors from Example 1 ($a=(1,0,0)$, $b=(0,1,0)$), and compare to $a\times b=(0,0,1)$. $b\times a=(1\cdot0-0\cdot0,\ 0\cdot0-0\cdot1,\ 0\cdot0-1\cdot0)=(0,0,-1)$ — the EXACT NEGATIVE of $a\times b$, confirming anti-commutativity. A common error assumes the cross product is commutative like ordinary multiplication or the dot product (expecting $a\times b=b\times a$) — swapping the order genuinely FLIPS the sign (direction) of the result, a fundamentally different behavior from the dot product's full commutativity.

## Component 5 — Teaching Actions

### Teaching Action A01 — Cross Product Produces a Vector, Dot Product a Scalar (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the cross product's vector result against the dot product's scalar result for the same input vectors.

- **MC-1 hook**: this directly targets MC-1 (confusing the cross product's vector-valued result with the dot product's scalar result).

### Teaching Action A02 — Magnitude as Parallelogram Area (reused procedure)

Present Example 2, connecting the magnitude formula to the geometric area interpretation.

### Teaching Action A03 — Anti-Commutativity: Swapping Order Flips the Sign (Primitive P64: Conceptual Shift)

Work Example 3, explicitly computing both orders and confirming the sign flip.

- **MC-2 hook**: this directly targets MC-2 (assuming the cross product is commutative like the dot product).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $a\times b$ for $a=(2,0,0)$ and $b=(0,3,0)$.
  2. Compute $b\times a$ for the same vectors in problem 1, and verify it is the negative of your answer.
  3. Given $|a|=4$, $|b|=5$, and the angle between them is $30°$, find $|a\times b|$.
  4. Explain, in one sentence, why the cross product's result is a vector while the dot product's result is a scalar.
- **P76 (Transfer Probe, mode = independence)**: "A mechanical engineer calculates the TORQUE (rotational force) applied to a bolt, using the formula $\tau=r\times F$ (the cross product of the position vector $r$ from the rotation axis to where force is applied, and the force vector $F$ itself). (a) Explain why torque is naturally represented as a cross product rather than a dot product, connecting to torque's own vector nature (it has both a magnitude AND a rotational direction/axis). (b) Explain what would physically change if the engineer accidentally swapped the order, computing $F\times r$ instead of $r\times F$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CROSS-PRODUCT-VECTOR-RESULT-CONFUSED-WITH-DOT-PRODUCT-SCALAR-RESULT | Confusing the cross product's vector-valued result with the dot product's scalar result | Foundational |
| MC-2 | CROSS-PRODUCT-ASSUMED-COMMUTATIVE-LIKE-THE-DOT-PRODUCT | Assuming the cross product is commutative (order doesn't matter) like the dot product, rather than recognizing it is anti-commutative | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Cross Product Vector Result Confused with Dot Product Scalar Result") → P41 (detect: present Example 1 and check whether a scalar is (incorrectly) reported as the cross product result) → P64 (conceptual shift: re-compute using the determinant/component formula explicitly, confirming a three-component vector results).
- **B02 (targets MC-2)**: P27 ("Cross Product Assumed Commutative Like the Dot Product") → P41 (detect: present Example 3 and check whether $a\times b$ and $b\times a$ are (incorrectly) assumed equal) → P64 (conceptual shift: re-compute both orders explicitly, confirming the sign flip).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.vectors-3d`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.dot-product` (the contrasting scalar-valued vector operation).

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects the genuine conceptual weight of introducing a fundamentally new type of vector operation (vector-valued, anti-commutative, geometrically rich).
- Both misconceptions were ranked Foundational because each reflects a genuine confusion between the cross and dot products' fundamentally different natures, not a minor computational slip.
- The torque transfer probe was deliberately chosen because torque's own vector nature (magnitude plus rotational axis direction) makes the cross product's vector-valued, order-sensitive properties immediately physically meaningful, rather than abstract algebra.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.vectors-3d`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
