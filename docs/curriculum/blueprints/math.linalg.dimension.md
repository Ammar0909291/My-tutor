# Teaching Blueprint: Dimension (`math.linalg.dimension`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.dimension` |
| name | Dimension |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.basis` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The number of vectors in any basis of V; all bases of V have the same cardinality. dim(ℝⁿ)=n. For subspaces: dim(U)+dim(U⊥)=dim(V).

 |

## Component 1 — Learning Objectives

- LO1: State the dimension of a vector space $V$ as the NUMBER OF VECTORS in ANY basis of $V$, and compute $\dim(\mathbb{R}^n)=n$.
- LO2: State the non-obvious theorem that ALL bases of a given vector space have the SAME number of vectors (cardinality) — dimension is a well-defined, basis-independent property.
- LO3: Apply the orthogonal-complement dimension formula $\dim(U)+\dim(U^\perp)=\dim(V)$ for a subspace $U$ of $V$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.basis` (a linearly independent spanning set) — dimension is the SIZE of any such basis.

## Component 3 — Core Explanation

The **dimension** of a vector space $V$ is the number of vectors in ANY basis of $V$. The standard space $\mathbb{R}^n$ has dimension $n$ (its standard basis $e_1,\ldots,e_n$ has exactly $n$ vectors).

A NON-OBVIOUS but foundational theorem underlies this definition: EVERY basis of a given vector space has the SAME number of vectors — dimension is therefore a well-defined property of the SPACE itself, not dependent on which particular basis happens to be chosen. (This is provable but non-trivial — different-looking bases could, in principle, have different sizes, except that they provably never do.)

For a SUBSPACE $U$ of $V$, with orthogonal complement $U^\perp$ (all vectors orthogonal to every vector in $U$): $\dim(U)+\dim(U^\perp)=\dim(V)$ — the two complementary subspaces' dimensions always sum to the full space's dimension.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic dimension computation)**: $\dim(\mathbb{R}^4)=4$ (the standard basis $e_1,e_2,e_3,e_4$ has 4 vectors). A subspace spanned by 2 linearly independent vectors (forming a basis of that subspace) has dimension 2, regardless of how many dimensions the AMBIENT space $\mathbb{R}^4$ itself has.

**Example 2 (LO2 — all bases have the same size, breaking MC-1)**: Consider $\mathbb{R}^2$. One basis: $\{(1,0),(0,1)\}$ — 2 vectors. A DIFFERENT, equally valid basis: $\{(1,1),(1,-1)\}$ (verify these are linearly independent and span $\mathbb{R}^2$) — ALSO exactly 2 vectors, never more or fewer. A common error assumes dimension might vary depending on which specific basis is examined (e.g. believing a "simpler-looking" basis like the standard one might be smaller than a more complex-looking alternative) — dimension is a fixed, basis-independent property of the SPACE, and this theorem guarantees every valid basis has the identical count.

**Example 3 (LO3 — orthogonal complement dimension formula, breaking MC-2)**: In $\mathbb{R}^3$ ($\dim=3$), a subspace $U$ (a 2-dimensional plane through the origin) has orthogonal complement $U^\perp$ (a line perpendicular to that plane, dimension 1). Check: $\dim(U)+\dim(U^\perp)=2+1=3=\dim(\mathbb{R}^3)$ ✓. A common error assumes $U$ and $U^\perp$ must have EQUAL dimensions (e.g. expecting both to be "half" of the ambient space's dimension), rather than recognizing their dimensions simply need to SUM to the total — a 2D plane's complement in 3D space is a 1D line, not another 2D subspace.

## Component 5 — Teaching Actions

### Teaching Action A01 — Dimension Is the Basis's Vector Count (Primitive P64: Conceptual Shift)

Work Example 1, explicitly counting the standard basis's vectors for $\mathbb{R}^4$, then contrasting against a smaller subspace's own, smaller basis count.

### Teaching Action A02 — Every Basis of the Same Space Has the Same Size (Primitive P06: Contrast Pair)

Work Example 2, verifying BOTH bases of $\mathbb{R}^2$ have exactly 2 vectors despite looking structurally different, grounding the basis-independence theorem concretely. State the rule: "dimension belongs to the SPACE, not to any particular basis — no matter which valid basis you pick, you'll always count the same number of vectors."

- **MC-1 hook**: this directly targets MC-1 (assuming different bases of the same space could have different sizes).

### Teaching Action A03 — Complement Dimensions Sum, They Don't Have to Match (Primitive P06: Contrast Pair, second pairing)

Work Example 3, explicitly verifying the sum $2+1=3$ rather than expecting equal split, using the plane/line geometric picture in $\mathbb{R}^3$ to ground the formula visually.

- **MC-2 hook**: this directly targets MC-2 (assuming $U$ and $U^\perp$ must have equal dimensions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State $\dim(\mathbb{R}^7)$.
  2. Verify two different proposed bases of $\mathbb{R}^3$ (given explicitly) both have exactly 3 vectors.
  3. Given a subspace $U$ of $\mathbb{R}^5$ with $\dim(U)=2$, find $\dim(U^\perp)$.
  4. Explain, in one sentence, why dimension is described as a property of the vector space itself, not of any particular basis.
- **P76 (Transfer Probe, mode = independence)**: "A data-compression algorithm represents images as vectors in a very high-dimensional space $\mathbb{R}^{10000}$ (one dimension per pixel), but finds that all actual photographs of a specific scene lie within a much smaller subspace $U$ with $\dim(U)=50$ (due to strong correlations between pixels). (a) Find $\dim(U^\perp)$, the dimension of the 'noise' subspace orthogonal to the meaningful photographic structure. (b) Explain, using this lesson's basis-independence theorem, why the compression algorithm's choice of WHICH specific 50-vector basis to use for $U$ doesn't affect the fundamental claim that only 50 dimensions of information are needed — any valid basis of $U$ would confirm the same count."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIFFERENT-BASES-ASSUMED-TO-HAVE-DIFFERENT-SIZES | Believing different valid bases of the same vector space could have different numbers of vectors, rather than recognizing dimension as basis-independent | Foundational |
| MC-2 | ORTHOGONAL-COMPLEMENT-DIMENSIONS-ASSUMED-EQUAL | Believing a subspace and its orthogonal complement must have equal dimensions, rather than recognizing their dimensions simply sum to the ambient space's dimension | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Different Bases Assumed to Have Different Sizes") → P41 (detect: present Example 2's two bases and check whether they're expected to have different counts) → P64 (conceptual shift: re-verify both bases explicitly — confirm linear independence and spanning for each — showing both genuinely contain exactly 2 vectors).
- **B02 (targets MC-2)**: P27 ("Orthogonal Complement Dimensions Assumed Equal") → P41 (detect: present Example 3 and check whether $\dim(U^\perp)$ is assumed to equal $\dim(U)$ regardless of the actual sum) → P64 (conceptual shift: re-derive using the geometric plane/line picture in $\mathbb{R}^3$, confirming the dimensions sum to 3, not split evenly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.basis`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.rank-nullity` (a related dimension-counting theorem for linear transformations).

## Component 8 — Teaching Notes

- estimated_hours = 3 and bloom = understand reflect that this concept's genuine content is the CONCEPTUAL well-definedness of dimension (LO2), a subtle theoretical fact often taken for granted without examination.
- MC-1 was ranked most severe because it undermines the very definition of dimension as a meaningful, well-defined quantity — if different bases could yield different counts, "the dimension of $V$" would be an ill-posed question rather than a genuine mathematical fact.
- The data-compression transfer probe was deliberately chosen to connect this abstract theorem to a concrete, high-value modern application (dimensionality reduction), where the basis-independence guarantee has genuine practical significance (any valid reduced basis captures the same amount of true information).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.basis`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
