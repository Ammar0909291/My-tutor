# Teaching Blueprint: Jordan Normal Form (`math.linalg.jordan-form`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.jordan-form` |
| name | Jordan Normal Form |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.linalg.eigenvalues`, `math.linalg.diagonalization` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Every matrix over ℂ is similar to a block-diagonal matrix with Jordan blocks Jₖ(λ) on the diagonal. Generalizes diagonalization to non-diagonalizable matrices. Jordan blocks have λ on the diagonal and 1s on the superdiagonal.

 |

## Component 1 — Learning Objectives

- LO1: State that EVERY matrix over $\mathbb{C}$ (even a non-diagonalizable one) is similar to a JORDAN NORMAL FORM — a block-diagonal matrix built from Jordan blocks $J_k(\lambda)$, each having $\lambda$ on the diagonal and 1's on the SUPERDIAGONAL (immediately above the diagonal), with all other entries 0.
- LO2: Determine the SIZE and NUMBER of Jordan blocks for a given eigenvalue from the gap between its ALGEBRAIC multiplicity (total multiplicity as a characteristic-polynomial root) and its GEOMETRIC multiplicity (eigenspace dimension) — a diagonalizable matrix is exactly the special case where every Jordan block has size 1 (i.e., algebraic = geometric multiplicity for every eigenvalue).
- LO3: Recognize Jordan form as the GENERALIZATION of diagonalization, not a replacement for it — when a matrix IS diagonalizable, its Jordan form IS simply the diagonal matrix $D$ (all blocks size 1); Jordan form only introduces genuinely new structure (superdiagonal 1's) when diagonalization fails.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.eigenvalues` (needed for algebraic multiplicities) and `math.linalg.diagonalization` (needed to recognize Jordan form as its generalization, and to understand the algebraic-vs-geometric-multiplicity gap that Jordan blocks resolve).

## Component 3 — Core Explanation

**Jordan Normal Form** is the key insight that resolves `math.linalg.diagonalization`'s central limitation: while not every matrix is diagonalizable, EVERY matrix over $\mathbb{C}$ IS similar to a block-diagonal matrix built from **Jordan blocks**. A Jordan block $J_k(\lambda)$ is a $k\times k$ matrix with $\lambda$ repeated along the diagonal and 1's on the SUPERDIAGONAL (the entries immediately above the diagonal) — e.g. $J_3(\lambda)=\begin{pmatrix}\lambda&1&0\\0&\lambda&1\\0&0&\lambda\end{pmatrix}$.

The SIZE and NUMBER of Jordan blocks for each eigenvalue $\lambda$ are determined by the gap between $\lambda$'s ALGEBRAIC multiplicity (its multiplicity as a root of the characteristic polynomial) and its GEOMETRIC multiplicity (the eigenspace's dimension — the number of independent eigenvectors) — recall from `math.linalg.diagonalization` that this exact gap is what made a matrix non-diagonalizable. Jordan form doesn't eliminate the gap; it EXPLAINS it structurally: each eigenvalue contributes as many Jordan blocks as its geometric multiplicity (independent eigenvectors), with block sizes summing to its algebraic multiplicity.

Crucially, Jordan form GENERALIZES diagonalization rather than replacing it: when a matrix IS diagonalizable (algebraic = geometric multiplicity for every eigenvalue), every Jordan block has size 1 (no superdiagonal 1's at all), and the Jordan form IS simply $D$, the ordinary diagonal matrix.

## Component 4 — Worked Examples

**Example 1 (LO1 — Jordan block structure, breaking MC-1)**: Write the Jordan block $J_2(3)$. This is $\begin{pmatrix}3&1\\0&3\end{pmatrix}$ — $\lambda=3$ on the diagonal, a single 1 on the superdiagonal (above-right of each diagonal entry). A common error places the 1 on the SUBDIAGONAL instead (below the diagonal), writing $\begin{pmatrix}3&0\\1&3\end{pmatrix}$ — the convention is specifically the superdiagonal, and this matters for how Jordan blocks interact with generalized eigenvectors in later applications.

**Example 2 (LO2 — determining block structure from multiplicities, breaking MC-2)**: For a matrix $A$ with eigenvalue $\lambda=5$ having algebraic multiplicity 3 but geometric multiplicity 1 (only ONE independent eigenvector), determine the Jordan block structure for this eigenvalue. Since geometric multiplicity is 1, there is exactly ONE Jordan block for $\lambda=5$, and since block sizes must sum to the algebraic multiplicity (3), this single block must be $J_3(5)$ (size 3). A common error assumes the algebraic multiplicity (3) directly tells you the NUMBER of blocks (incorrectly concluding "three $1\times1$ blocks," which would actually just mean $A$ IS diagonalizable) — it's the GEOMETRIC multiplicity that gives the number of blocks; the algebraic multiplicity gives the blocks' total combined size.

**Example 3 (LO3 — Jordan form of an already-diagonalizable matrix)**: Find the Jordan form of $A=\begin{pmatrix}2&0\\0&7\end{pmatrix}$ (already diagonal, hence diagonalizable, with each eigenvalue's algebraic multiplicity 1 equal to its geometric multiplicity 1). The Jordan form is simply $A$ itself — two $1\times1$ Jordan blocks, $J_1(2)$ and $J_1(7)$, with NO superdiagonal 1's anywhere, confirming that diagonalizable matrices are exactly the case where Jordan form introduces no new structure.

## Component 5 — Teaching Actions

### Teaching Action A01 — Jordan Blocks Have 1's on the SUPERdiagonal (Primitive P64: Conceptual Shift)

Work Example 1, explicitly pointing at the superdiagonal position and contrasting it visually against the (incorrect) subdiagonal placement.

- **MC-1 hook**: check whether the 1's are correctly placed on the superdiagonal.

### Teaching Action A02 — Geometric Multiplicity Gives Block Count, Algebraic Gives Total Size (Primitive P06: Contrast Pair)

Work Example 2, explicitly separating the two questions ("how MANY blocks?" answered by geometric multiplicity; "how big IN TOTAL?" answered by algebraic multiplicity), reusing the algebraic-vs-geometric distinction from `math.linalg.diagonalization`.

- **MC-2 hook**: this directly targets MC-2 (confusing which multiplicity answers which question).

### Teaching Action A03 — Diagonalizable Matrices Are Jordan Form with All Size-1 Blocks (Primitive P11: Representation Shift)

Work Example 3, explicitly connecting back to `math.linalg.diagonalization`'s $D$ matrix as the special, simplest case of Jordan form.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Write the Jordan block $J_3(-2)$ explicitly as a $3\times3$ matrix.
  2. For eigenvalue $\lambda=4$ with algebraic multiplicity 4 and geometric multiplicity 2, determine the possible Jordan block sizes (noting there may be more than one valid partition summing to 4 with exactly 2 blocks — e.g. sizes 2+2 or 3+1 — both consistent with geometric multiplicity 2).
  3. For eigenvalue $\lambda=1$ with algebraic multiplicity 2 and geometric multiplicity 2, determine the Jordan block structure and state whether this eigenvalue's contribution is genuinely diagonalizable.
  4. Explain, in one sentence, why a matrix's Jordan form equals its diagonalization exactly when every eigenvalue's algebraic and geometric multiplicities match.
- **P76 (Transfer Probe, mode = independence)**: "A mechanical system's state matrix $A$ has a single eigenvalue $\lambda=0$ with algebraic multiplicity 3, but the system exhibits genuinely 'resonant' behavior where perturbations grow polynomially (not just exponentially) over time — a signature that the system is NOT diagonalizable. (a) Given this resonant behavior, what can you conclude about the geometric multiplicity of $\lambda=0$ relative to its algebraic multiplicity (3)? (b) If the geometric multiplicity turns out to be exactly 1, determine the Jordan block structure, and explain how a SINGLE large Jordan block (versus multiple smaller ones) connects to the system exhibiting this more complex, non-decoupled resonant behavior."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | JORDAN-BLOCK-ONES-PLACED-ON-SUBDIAGONAL-INSTEAD-OF-SUPERDIAGONAL | Placing the Jordan block's 1's below the diagonal instead of on the superdiagonal (immediately above) | Moderate |
| MC-2 | ALGEBRAIC-MULTIPLICITY-CONFUSED-WITH-BLOCK-COUNT-RATHER-THAN-TOTAL-BLOCK-SIZE | Using algebraic multiplicity to determine the NUMBER of Jordan blocks, rather than recognizing geometric multiplicity gives the block count and algebraic multiplicity gives the blocks' combined size | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Jordan Block Ones Placed on Subdiagonal Instead of Superdiagonal") → P41 (detect: present Example 1 and check the position of the 1's) → P64 (conceptual shift: re-write the block with explicit row/column labels, confirming the superdiagonal convention).
- **B02 (targets MC-2)**: P27 ("Algebraic Multiplicity Confused with Block Count Rather Than Total Block Size") → P41 (detect: present Example 2 and check whether algebraic multiplicity (3) is used directly as the block count) → P64 (conceptual shift: re-derive using geometric multiplicity (1) for the count and algebraic multiplicity (3) for the total size, reusing the `math.linalg.diagonalization` multiplicity distinction).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.eigenvalues`, `math.linalg.diagonalization`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.diagonalization` (Jordan form is its direct generalization to non-diagonalizable matrices).

## Component 8 — Teaching Notes

- difficulty = expert, bloom = analyze, and estimated_hours = 7 (the highest hour count in the domain so far) reflect that this concept requires genuinely synthesizing and extending the diagonalization framework, not just applying a new formula.
- MC-2 was ranked Foundational because it directly inverts which multiplicity answers which structural question — a serious conceptual confusion, not merely a computational slip.
- The mechanical-resonance transfer probe was deliberately chosen because polynomial (rather than purely exponential) growth in a dynamical system is a genuinely observable physical signature of non-diagonalizability, giving Jordan form real predictive meaning beyond pure matrix algebra.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.eigenvalues`, `math.linalg.diagonalization`) |
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
