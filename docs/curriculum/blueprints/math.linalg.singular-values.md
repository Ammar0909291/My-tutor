# Teaching Blueprint: Singular Values (`math.linalg.singular-values`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.singular-values` |
| name | Singular Values |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.linalg.svd`, `math.linalg.eigenvalues` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The singular values σᵢ = √(eigenvalues of AᵀA) = √(eigenvalues of AAᵀ). They generalize eigenvalues to non-square matrices; σ₁ = |A| (operator 2-norm). Encode the "strength" of each mode of the transformation.

 |

## Component 1 — Learning Objectives

- LO1: Compute singular values as $\sigma_i=\sqrt{\text{eigenvalues of }A^TA}$ (EQUIVALENTLY $\sqrt{\text{eigenvalues of }AA^T}$ — both give the SAME nonzero singular values, since $A^TA$ and $AA^T$ share the same nonzero eigenvalues even though they may have different sizes).
- LO2: State that singular values GENERALIZE eigenvalues to NON-SQUARE matrices — while eigenvalues are only defined for square matrices, EVERY matrix (any shape) has singular values, making them the more universally meaningful "strength" measure.
- LO3: Identify $\sigma_1$ (the LARGEST singular value) as the matrix's OPERATOR 2-NORM $|A|$ — the maximum "stretching factor" $A$ applies to any unit vector — and recognize each $\sigma_i$ as encoding the strength of a specific transformation "mode" (direction).

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.svd` (singular values are SVD's diagonal entries) and `math.linalg.eigenvalues` (singular values are derived from eigenvalues of $A^TA$ or $AA^T$).

## Component 3 — Core Explanation

**Singular values** $\sigma_i$ of a matrix $A$ are defined as $\sigma_i=\sqrt{\text{eigenvalues of }A^TA}=\sqrt{\text{eigenvalues of }AA^T}$ — these two formulas give the SAME set of nonzero singular values, since $A^TA$ and $AA^T$ (even though possibly different sizes, $n\times n$ vs. $m\times m$) always share the same nonzero eigenvalues.

Their central significance is generalizing EIGENVALUES to matrices of ANY shape: eigenvalues are only defined for SQUARE matrices, but singular values exist for EVERY matrix, square or rectangular — making them the more universal way to measure a linear transformation's "strength" or "size."

The LARGEST singular value $\sigma_1$ has a special meaning: it equals the matrix's OPERATOR 2-NORM $|A|$ — the maximum factor by which $A$ can stretch any unit vector. More generally, each singular value $\sigma_i$ encodes the "strength" of one specific transformation MODE (direction) — larger singular values correspond to directions where $A$ has a bigger effect, smaller ones to directions with a weaker effect (or none, if $\sigma_i=0$).

## Component 4 — Worked Examples

**Example 1 (LO1 — computing singular values, breaking MC-1)**: For $A=\begin{pmatrix}3&0\\0&4\end{pmatrix}$, compute $A^TA=\begin{pmatrix}9&0\\0&16\end{pmatrix}$ (eigenvalues 9, 16), giving singular values $\sigma_1=\sqrt{16}=4$, $\sigma_2=\sqrt9=3$ (sorted DECREASING). A common error reports the singular values as 9 and 16 directly (forgetting the square root) — the singular values are the SQUARE ROOTS of $A^TA$'s eigenvalues, never the eigenvalues themselves.

**Example 2 (LO2 — singular values for a non-square matrix)**: For a $3\times2$ matrix $A$ (non-square, so eigenvalues aren't even defined for $A$ itself), $A^TA$ is a $2\times2$ symmetric matrix WITH well-defined eigenvalues, giving 2 singular values — demonstrating that singular values exist for this rectangular matrix precisely BECAUSE they come from the always-square, always-symmetric $A^TA$, not from $A$ directly.

**Example 3 (LO3 — σ₁ as the operator norm, breaking MC-2)**: For $A=\begin{pmatrix}3&0\\0&4\end{pmatrix}$ (Example 1), the operator 2-norm $|A|=\sigma_1=4$ — the maximum stretching factor over ALL unit vectors is achieved specifically along the direction corresponding to the SECOND coordinate axis (since 4 > 3). A common error assumes the operator norm should be some AVERAGE or SUM of the singular values (e.g. $3+4=7$ or the average $3.5$), rather than recognizing it's specifically the LARGEST singular value alone — the operator norm asks "what is the MAXIMUM possible stretching," not a blended or total measure across all directions.

## Component 5 — Teaching Actions

### Teaching Action A01 — Singular Values Are Square Roots of A^TA's Eigenvalues (Primitive P64: Conceptual Shift)

Work Example 1, explicitly showing the square-root step and the descending sort convention.

- **MC-1 hook**: check whether the square root is correctly taken (not skipped).

### Teaching Action A02 — Singular Values Exist Even When Eigenvalues Don't (Primitive P11: Representation Shift)

Work Example 2, explicitly contrasting "eigenvalues undefined for non-square $A$" against "singular values well-defined via $A^TA$."

### Teaching Action A03 — Operator Norm Is the Largest Singular Value Alone, Not an Average (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct answer ($\sigma_1=4$ alone) against incorrect averaging/summing alternatives.

- **MC-2 hook**: this directly targets MC-2 (assuming the operator norm is some blend of all singular values, rather than the maximum alone).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given $A^TA$ has eigenvalues 25 and 4, compute the singular values sorted descending.
  2. Explain, in one sentence, why a $5\times2$ matrix (non-square) has well-defined singular values even though it has no eigenvalues of its own.
  3. Given singular values 6, 2, and 1 for some matrix $A$, state the operator 2-norm $|A|$.
  4. Explain why $A^TA$ and $AA^T$ (possibly different sizes) share the same nonzero singular values.
- **P76 (Transfer Probe, mode = independence)**: "An image-compression algorithm computes the singular values of a grayscale image's pixel-intensity matrix (a genuinely rectangular matrix, e.g. 480×640) and finds most of the 'energy' concentrated in the first 20 singular values (out of 480), with the remaining singular values very close to zero. (a) Explain what a near-zero singular value implies about that particular transformation 'mode' of the image data — connecting to the 'strength' interpretation from this lesson. (b) Explain, conceptually, why keeping only the top 20 singular values (and treating the rest as zero) should still reconstruct an image that looks very close to the original, using the operator-norm/mode-strength framing."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGULAR-VALUES-REPORTED-AS-A-TRANSPOSE-A-EIGENVALUES-WITHOUT-SQUARE-ROOT | Reporting A^TA's eigenvalues directly as the singular values, skipping the required square root step | Foundational |
| MC-2 | OPERATOR-NORM-COMPUTED-AS-AVERAGE-OR-SUM-OF-SINGULAR-VALUES-RATHER-THAN-THE-LARGEST | Computing the operator 2-norm as an average or sum of all singular values, rather than recognizing it equals the single largest singular value | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Singular Values Reported as A^TA Eigenvalues Without Square Root") → P41 (detect: present Example 1 and check whether the square root step is applied) → P64 (conceptual shift: re-derive from the SVD relation $A^TA=V\Sigma^2V^T$, showing $\Sigma$'s entries are square roots of $A^TA$'s eigenvalues).
- **B02 (targets MC-2)**: P27 ("Operator Norm Computed as Average or Sum of Singular Values Rather Than the Largest") → P41 (detect: present Example 3 and check whether an averaged/summed value is given instead of $\sigma_1$ alone) → P64 (conceptual shift: re-state the operator norm's definition as the MAXIMUM stretching factor, directly identifying it with $\sigma_1$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.svd`, `math.linalg.eigenvalues`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.linalg.svd`.

## Component 8 — Teaching Notes

- difficulty = expert and estimated_hours = 4 reflect that this concept requires carefully connecting three related but distinct quantities (eigenvalues of $A^TA$/$AA^T$, singular values, and the operator norm).
- Both misconceptions were ranked Foundational because each produces a plausible-looking but numerically WRONG value without an obvious internal check.
- The image-compression transfer probe was deliberately chosen because singular-value-based low-rank approximation (keeping only the largest few) is one of SVD's most concrete, visually verifiable applications, directly reinforcing the "mode strength" interpretation from LO3.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.svd`, `math.linalg.eigenvalues`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
