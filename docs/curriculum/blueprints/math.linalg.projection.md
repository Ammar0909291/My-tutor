# Teaching Blueprint: Orthogonal Projection (`math.linalg.projection`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.projection` |
| name | Orthogonal Projection |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.orthogonality`, `math.linalg.inner-product` |
| unlocks | `math.linalg.least-squares` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — dropping a perpendicular from a point to a line before the symbolic formula |
| description (KG) | The projection of v onto subspace W is the closest point in W to v, with v−proj_W(v) ⊥ W. For one vector: proj_u(v) = (v·u/u·u)u. For a subspace with ONB {e₁,…,eₖ}: proj = ∑⟨v,eᵢ⟩eᵢ. |

## Component 1 — Learning Objectives

- LO1: Define the **orthogonal projection** of $v$ onto a subspace $W$, $\text{proj}_W(v)$, as the **closest point in $W$ to $v$**, characterized by the defining property that the **residual** $v - \text{proj}_W(v)$ is orthogonal to every vector in $W$.
- LO2: Compute the projection onto a **single vector's span** (a line) using $\text{proj}_u(v) = \frac{v\cdot u}{u\cdot u}u$, and correctly recognize this as a scaled copy of $u$ (never $v$'s own direction), directly refuting the misconception that the projection formula's numerator/denominator ratio is somehow applied to $v$ itself.
- LO3: Compute the projection onto a subspace with an **orthonormal basis** $\{e_1,\dots,e_k\}$ via $\text{proj}_W(v) = \sum_i\langle v,e_i\rangle e_i$ (directly reusing `math.linalg.orthogonal-basis`'s coordinate-extraction formula), and explain why this sum-of-single-vector-projections formula requires the basis to be **orthogonal** (or orthonormal) — it does not work for a general, non-orthogonal basis of $W$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.orthogonality` (two vectors are orthogonal iff their dot product/inner product is zero, and orthogonal vectors are automatically linearly independent) and `math.linalg.inner-product` (the inner product $\langle\cdot,\cdot\rangle$ as a generalization of the dot product, inducing a norm).

## Component 3 — Core Explanation

**The projection as the closest point, characterized by orthogonality of the residual**: given a subspace $W$ and a vector $v$ (possibly not in $W$), the **orthogonal projection** $\text{proj}_W(v)$ is the point of $W$ closest to $v$. The defining algebraic characterization of this closest point is that the **residual** $v - \text{proj}_W(v)$ is **orthogonal to every vector in $W$** — geometrically, the "leftover" part of $v$ not captured by $W$ points in a direction completely perpendicular to $W$ itself, which is exactly why no other point of $W$ could be closer.

**Projection onto a single vector (a line)**: for $W=\text{span}(u)$ (a one-dimensional subspace, a line through the origin), $\text{proj}_u(v) = \frac{v\cdot u}{u\cdot u}u$. The scalar $\frac{v\cdot u}{u\cdot u}$ is a single NUMBER (how far along $u$'s direction to go), and multiplying it by $u$ gives a vector that lies exactly ALONG $u$'s direction — the projection is always a scalar multiple of $u$, never a scalar multiple of $v$ itself (since the whole point is to land somewhere IN the subspace $W=\text{span}(u)$, not to rescale $v$).

**Projection onto a subspace with an orthonormal basis**: for a subspace $W$ with orthonormal basis $\{e_1,\dots,e_k\}$, the projection is $\text{proj}_W(v) = \sum_{i=1}^k \langle v,e_i\rangle e_i$ — precisely the sum of $v$'s individual projections onto each basis vector $e_i$ separately. This formula directly reuses `math.linalg.orthogonal-basis`'s coordinate-extraction shortcut ($\langle v,e_i\rangle$ as the $i$-th coordinate), and it works as a simple SUM specifically because the $e_i$ are mutually orthogonal — projecting onto each one separately and adding does not "double count" or interfere between the different basis directions, a property that fails for a non-orthogonal basis of $W$.

## Component 4 — Worked Examples

**Example 1 (LO1 — the residual is orthogonal to W, verified directly)**: Let $W = \text{span}((1,0,0))$ (the $x$-axis in $\mathbb{R}^3$) and $v=(3,4,5)$. The projection onto this line: $\text{proj}_W(v) = \frac{v\cdot(1,0,0)}{(1,0,0)\cdot(1,0,0)}(1,0,0) = \frac{3}{1}(1,0,0) = (3,0,0)$. The residual $v-\text{proj}_W(v) = (3,4,5)-(3,0,0)=(0,4,5)$. Checking orthogonality to $W$: $(0,4,5)\cdot(1,0,0) = 0$ ✓ — the residual is indeed orthogonal to every vector in $W$ (here, just the $x$-direction), confirming $(3,0,0)$ really is the closest point of the $x$-axis to $(3,4,5)$.

**Example 2 (LO2 — the projection lands along u's direction, not v's, breaking MC-1)**: For $u=(1,1)$ and $v=(4,0)$: $\text{proj}_u(v) = \frac{v\cdot u}{u\cdot u}u = \frac{4}{2}(1,1) = (2,2)$. Notice the result $(2,2)$ is a scalar multiple of $u=(1,1)$ (specifically $2u$) — it lies exactly on the line through $u$, NOT on the line through $v=(4,0)$. A student who mistakenly computed "$\frac{v\cdot u}{u\cdot u}v$" (using $v$ instead of $u$ in the final multiplication) would get $\frac{4}{2}(4,0)=(8,0)$ — a point along $v$'s OWN direction, which cannot be correct since the projection must land IN $W=\text{span}(u)$, and $(8,0)$ is not a multiple of $(1,1)$ at all.

**Example 3 (LO3 — projecting onto a 2D subspace via an orthonormal basis, and why orthogonality matters)**: Let $W=\text{span}(e_1,e_2)$ with $e_1=(1,0,0)$, $e_2=(0,1,0)$ (already orthonormal — the $xy$-plane in $\mathbb{R}^3$), and $v=(3,4,5)$. $\text{proj}_W(v) = \langle v,e_1\rangle e_1 + \langle v,e_2\rangle e_2 = 3(1,0,0)+4(0,1,0) = (3,4,0)$ — matching the geometrically obvious answer (drop straight down onto the $xy$-plane). This sum-of-individual-projections formula relies on $e_1,e_2$ being orthogonal: if instead a NON-orthogonal spanning set for the same plane were used (e.g. $(1,0,0)$ and $(1,1,0)$), naively summing individual projections onto each would NOT give the correct joint projection — the individual projections would "interfere" with each other, since the two directions aren't independent in the orthogonal sense.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Projection as Closest Point, Residual Perpendicular (Primitive P11: Representation Shift)

Draw a point $v$ above a line $W$, with a dropped perpendicular landing at $\text{proj}_W(v)$, and the leftover segment (the residual) drawn perpendicular to the line. State: "the projection is defined by ONE property: whatever's left over after you subtract it from $v$ points straight away from $W$ — that's exactly what makes it the CLOSEST point." Work Example 1's direct orthogonality verification.

### Teaching Action A02 — The Projection Lands Along u, Never Along v (Primitive P28: Conflict Evidence)

Present Example 2's direct conflict: the correct computation $(2,2)$ (a multiple of $u$) versus the incorrect "using $v$ in the final multiply" result $(8,0)$ (a multiple of $v$, which fails to even lie in $W$). State: "the scalar $\frac{v\cdot u}{u\cdot u}$ tells you HOW FAR along $u$ to go — the projection must end up as a multiple of $u$, because that's the only way to land inside $W=\text{span}(u)$."

- **MC-1 hook**: ask "in the formula $\text{proj}_u(v)=\frac{v\cdot u}{u\cdot u}u$, could you instead multiply the scalar by $v$ and still get a valid projection?" — a "yes" answer reveals MC-1 (misapplying the formula's final multiplication to $v$ instead of $u$, producing a vector that doesn't even lie in the target subspace).

### Teaching Action A03 — Summing Individual Projections Requires Orthogonality (Primitive P06: Contrast Pair)

Work Example 3's direct computation via the orthonormal basis, then state the caveat explicitly: "this sum-of-projections shortcut only works because $e_1$ and $e_2$ are orthogonal to each other — if your subspace's spanning vectors weren't orthogonal, summing their individual projections would NOT correctly reconstruct the joint projection onto the whole subspace."

- **MC-2 hook**: ask "would the sum-of-individual-projections formula still work if the subspace's basis vectors were NOT orthogonal to each other?" — a "yes" answer reveals MC-2 (over-generalizing the sum formula to non-orthogonal bases, missing that orthogonality is what prevents the individual projections from interfering).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $u=(2,1)$ and $v=(3,6)$, compute $\text{proj}_u(v)$, and verify the residual $v-\text{proj}_u(v)$ is orthogonal to $u$.
  2. For $u=(0,1,0)$ and $v=(5,7,2)$, compute $\text{proj}_u(v)$, and confirm your answer is a scalar multiple of $u$, not of $v$.
  3. Using the orthonormal basis $e_1=(1,0)$, $e_2=(0,1)$ for $W=\mathbb{R}^2$ itself, compute $\text{proj}_W(v)$ for $v=(6,9)$ via the sum formula, and explain why the answer should equal $v$ itself.
  4. Explain, in your own words, why the sum-of-individual-projections formula for a subspace requires the basis vectors to be orthogonal, referencing Example 3's caveat.
- **P76 (Transfer Probe, mode = independence)**: "A data-compression engineer wants to approximate a high-dimensional data vector $v$ using only its 'shadow' on a lower-dimensional subspace $W$ spanned by an orthonormal set of 'feature directions' $e_1,\dots,e_k$. (a) Explain why $\text{proj}_W(v) = \sum_i\langle v,e_i\rangle e_i$ gives the BEST possible approximation of $v$ within $W$, citing the closest-point/orthogonal-residual characterization from Component 3. (b) If the engineer's feature directions were NOT mutually orthogonal, explain what would go wrong with simply summing the individual projections onto each direction. (c) Explain, using the residual $v-\text{proj}_W(v)$, what information about the original vector $v$ is LOST when compressing it down to just its projection onto $W$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PROJECTION-FORMULA-FINAL-MULTIPLICATION-MISAPPLIED | Multiplying the scalar $\frac{v\cdot u}{u\cdot u}$ by $v$ instead of $u$, producing a result that doesn't lie in the target subspace at all | Foundational |
| MC-2 | SUM-OF-PROJECTIONS-FORMULA-OVERGENERALIZED-TO-NON-ORTHOGONAL-BASES | Applying the sum-of-individual-projections shortcut to a non-orthogonal spanning set, missing that orthogonality is required to prevent interference between the individual projections | Foundational |
| MC-3 | RESIDUAL-ORTHOGONALITY-CHECK-SKIPPED | Computing a projection without verifying (or understanding how to verify) that the residual is genuinely orthogonal to the subspace, treating the formula as a black box rather than a characterized closest-point property | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Projection-Formula Final-Multiplication Misapplication") → P41 (detect: ask a student to compute $\text{proj}_u(v)$ and check whether their final answer is a scalar multiple of $u$ or of $v$) → P64 (conceptual shift: re-walk Example 2's direct contrast, re-anchoring on "the projection must land IN the subspace $\text{span}(u)$ — that only happens if the final multiplication uses $u$").
- **B02 (targets MC-2)**: P27 (name it: "Sum-of-Projections Overgeneralization") → P41 (detect: give a non-orthogonal spanning set for a subspace and ask whether summing individual projections onto each vector gives the correct joint projection) → P64 (conceptual shift: re-anchor on Example 3's explicit caveat — the sum formula depends on orthogonality preventing interference between directions, exactly parallel to `math.linalg.orthogonal-basis`'s own coordinate-shortcut requiring orthonormality).
- **B03 (targets MC-3)**: P27 (name it: "Residual-Orthogonality Check Skipped") → P41 (detect: ask a student to verify that a computed projection is correct, and observe whether they check the residual's orthogonality or simply trust the formula's output) → P64 (conceptual shift: re-walk Example 1's explicit residual computation and dot-product check, re-anchoring on "the orthogonal-residual property IS the definition — always available as a check, not just a formula to memorize").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.orthogonality` (the dot-product-zero orthogonality test this concept's defining residual property directly uses), `math.linalg.inner-product` (the general inner product $\langle\cdot,\cdot\rangle$ this concept's formulas are stated in terms of).
- **Unlocks**: `math.linalg.least-squares` (least-squares approximation is defined directly as finding the orthogonal projection onto a subspace of achievable outcomes).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the closest-point/orthogonal-residual definition), A02 (the single-vector formula and its correct final multiplication), and A03 (the sum formula and its orthogonality requirement) each target a distinct LO, appropriate for a concept combining one geometric characterization with two related but distinct computational formulas.
- This blueprint deliberately connects Example 3's sum-formula caveat directly back to `math.linalg.orthogonal-basis`'s own coordinate-shortcut requirement (both rely on orthogonality to prevent cross-terms/interference) — Teaching Notes name this parallel explicitly so a student who mastered that earlier concept recognizes the recurring structural pattern rather than treating this as an unrelated new rule.
- Example 2 was deliberately constructed with a non-orthogonal-to-axes $u=(1,1)$ specifically to make the "projection must be a multiple of $u$, not $v$" point vivid — using an axis-aligned $u$ would have made the correct and incorrect answers look suspiciously similar and easier to conflate.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: dropping a perpendicular before the symbolic formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
