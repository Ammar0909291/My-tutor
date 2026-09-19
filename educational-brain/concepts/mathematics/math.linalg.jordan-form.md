# math.linalg.jordan-form

## Identity
- **KG id**: `math.linalg.jordan-form`
- **Domain**: math.linalg
- **Requires**: `math.linalg.eigenvalues`, `math.linalg.diagonalization`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 7

## Learning Objective
State that EVERY matrix over $\mathbb C$ is similar to a Jordan normal form built from Jordan
blocks $J_k(\lambda)$ with 1's on the SUPERDIAGONAL (never the subdiagonal); determine block
size and count from the GEOMETRIC multiplicity (block count) versus ALGEBRAIC multiplicity
(total combined size), never swapping which multiplicity answers which question; and recognize
Jordan form as a GENERALIZATION of diagonalization (diagonalizable matrices are exactly the
all-size-1-blocks case), never a replacement.

## Core Understanding
JORDAN BLOCKS PLACE 1'S ON THE SUPERDIAGONAL — NEVER THE SUBDIAGONAL: $J_2(3)=\begin{pmatrix}3&1
\\0&3\end{pmatrix}$ — $\lambda=3$ on the diagonal, a single 1 ABOVE-RIGHT of each diagonal entry
(the superdiagonal). A common error places the 1 BELOW the diagonal, writing
$\begin{pmatrix}3&0\\1&3\end{pmatrix}$ instead — the convention is SPECIFICALLY the superdiagonal,
and this matters for how Jordan blocks interact with generalized eigenvectors in later
applications.

GEOMETRIC MULTIPLICITY GIVES THE BLOCK COUNT; ALGEBRAIC MULTIPLICITY GIVES THE TOTAL SIZE — NEVER
THE REVERSE: for $\lambda=5$ with algebraic multiplicity 3 but geometric multiplicity 1 (only ONE
independent eigenvector): since geometric multiplicity is 1, there is EXACTLY ONE Jordan block
for $\lambda=5$; since block sizes must sum to the algebraic multiplicity (3), this single block
must be $J_3(5)$. A common error uses the algebraic multiplicity (3) directly as the NUMBER of
blocks, incorrectly concluding "three $1\times1$ blocks" — which would actually mean $A$ IS
diagonalizable. It's the GEOMETRIC multiplicity that gives the block COUNT; the algebraic
multiplicity gives the blocks' combined SIZE.

JORDAN FORM GENERALIZES DIAGONALIZATION — NEVER REPLACES IT: for $A=\begin{pmatrix}2&0\\0&7
\end{pmatrix}$ (already diagonal, each eigenvalue's algebraic multiplicity 1 equal to geometric
multiplicity 1): the Jordan form is SIMPLY $A$ itself — two $1\times1$ blocks $J_1(2)$, $J_1(7)$,
with NO superdiagonal 1's anywhere. When a matrix IS diagonalizable (algebraic = geometric
multiplicity for every eigenvalue), Jordan form introduces genuinely NEW structure ONLY when
diagonalization fails — the diagonal matrix $D$ from `math.linalg.diagonalization` IS the Jordan
form's special, simplest case, never a separate or competing framework.

## Mental Models
- **"Jordan blocks have their 1's climbing UP-and-to-the-right — the superdiagonal, never
  below."**
- **"Geometric multiplicity counts HOW MANY blocks; algebraic multiplicity counts their TOTAL
  size — two different questions, two different multiplicities answer them."**
- **"Jordan form is diagonalization's natural extension — when diagonalization already works,
  Jordan form just IS the diagonal matrix, with nothing new added."**

## Why Students Fail

### MC-1: JORDAN-BLOCK-ONES-PLACED-ON-SUBDIAGONAL-INSTEAD-OF-SUPERDIAGONAL
- **Surface form**: places the Jordan block's 1's below the diagonal instead of on the
  superdiagonal.
- **Birth type**: Moderate severity (Blueprint's own declared severity — without a firm visual
  anchor, the superdiagonal-vs-subdiagonal convention is easy to invert).
- **Repair**: re-write the block with explicit row/column labels, confirming the superdiagonal
  convention.

### MC-2: ALGEBRAIC-MULTIPLICITY-CONFUSED-WITH-BLOCK-COUNT-RATHER-THAN-TOTAL-BLOCK-SIZE
- **Surface form**: uses algebraic multiplicity to determine the NUMBER of Jordan blocks, rather
  than recognizing geometric multiplicity gives the block count.
- **Birth type**: Foundational severity (Blueprint's own declared severity — this directly
  inverts which multiplicity answers which structural question, a serious conceptual confusion).
- **Repair**: re-derive using geometric multiplicity for the count and algebraic multiplicity for
  the total size, reusing the `math.linalg.diagonalization` multiplicity distinction.

## Misconceptions

### MC-1: JORDAN-BLOCK-ONES-PLACED-ON-SUBDIAGONAL-INSTEAD-OF-SUPERDIAGONAL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-2: ALGEBRAIC-MULTIPLICITY-CONFUSED-WITH-BLOCK-COUNT-RATHER-THAN-TOTAL-BLOCK-SIZE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Jordan block's superdiagonal 1's are like a chain of overlapping shadows falling
  upper-right — never lower-left."**
- **Anti-analogy**: algebraic multiplicity is not a block-counter — it's a size-total; confusing
  the two swaps a correct single large block for an incorrect claim of full diagonalizability.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit $J_2(3)$ construction, contrasted against the
  incorrect subdiagonal placement.
- **Demonstration 2 (targets MC-2)**: the $\lambda=5$, algebraic-multiplicity-3,
  geometric-multiplicity-1 block-structure derivation.
- **Demonstration 3**: the already-diagonal $A=\mathrm{diag}(2,7)$ case, confirming Jordan form
  collapses to $D$ when diagonalizable.

## Discovery Questions
1. "Are a Jordan block's 1's on the superdiagonal or the subdiagonal?"
2. "Does algebraic multiplicity tell you the NUMBER of Jordan blocks, or their TOTAL combined
   size?"
3. "What does the Jordan form of an already-diagonalizable matrix look like?"

## Teaching Sequence
1. **Conceptual shift**: the explicit Jordan block construction, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the geometric-versus-algebraic multiplicity distinction, working
   Demonstration 2, isolating MC-2.
3. **Representation shift**: the already-diagonalizable case, working Demonstration 3, connecting
   back to `math.linalg.diagonalization`'s $D$.
4. **Mastery gate**: require a correct explicit Jordan block construction, a correct
   determination of block sizes from given multiplicities, and a correct explanation of why
   Jordan form equals diagonalization when multiplicities match, at the Blueprint's own stated
   MAMR of 4/5.

## Tutor Actions
- Never accept a Jordan block's 1's placed on the subdiagonal.
- Never accept algebraic multiplicity used directly as the number of Jordan blocks.
- Never accept Jordan form presented as unrelated to or replacing diagonalization.

## Voice Teaching Notes
- Say "is that 1 above or below the diagonal entry?" whenever a Jordan block is constructed.
- Ask "is that the block COUNT or the TOTAL size you're computing?" whenever multiplicities are
  used to determine block structure.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes an explicit Jordan block with 1's on the
  superdiagonal.
- **Rung 2 (application)**: learner correctly determines Jordan block sizes and count from given
  algebraic and geometric multiplicities.
- **Rung 3 (transfer)**: learner correctly connects a single large Jordan block to non-decoupled,
  polynomial-growth dynamical behavior.

## Tutor Recovery Strategy
- If MC-1 recurs, re-write the block with explicit row/column labels.
- If MC-2 recurs, re-derive block structure using geometric multiplicity for count, algebraic for
  total size.

## Memory Hooks
- "Superdiagonal, never subdiagonal."
- "Geometric = how many blocks; algebraic = how big in total."
- "Jordan form IS the diagonal matrix when diagonalization already works."

## Transfer Connections
- `math.linalg.eigenvalues` (already authored, certified domain): supplies algebraic
  multiplicity, the characteristic-polynomial root count this concept's block-size total is
  derived from.
- `math.linalg.diagonalization` (already authored, this campaign): supplies the
  algebraic-versus-geometric multiplicity distinction this concept directly reuses, and the
  diagonal matrix $D$ that Jordan form generalizes.

## Cross-Subject Connections
- Differential equations and dynamical systems: a single large Jordan block corresponds to
  polynomial (rather than purely exponential) growth in a linear system's solution — a genuinely
  observable "resonant" physical signature of non-diagonalizability.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.jordan-form.md`, reused by
  reference for its explicit Jordan block construction, its algebraic-versus-geometric
  multiplicity block-structure derivation, its already-diagonal special case, and its
  two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe connecting a single large Jordan
  block to a mechanical system's polynomial-growth resonant behavior.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.eigenvalues`/`math.linalg.diagonalization`, unlocks none, cross_links none,
  expert/analyze, mastery_threshold 0.75, estimated_hours 7) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 193): authored. First entry this batch. Companion batch concept:
  `math.linalg.matrix-exponential`.
