# math.linalg.diagonalization

## Identity
- **KG id**: `math.linalg.diagonalization`
- **Domain**: math.linalg
- **Requires**: `math.linalg.eigenvalues`, `math.linalg.eigenspace`, `math.linalg.matrix-inverse`
- **Unlocks**: `math.linalg.matrix-exponential`
- **Cross-links**: `math.de.systems-matrix-method` (not yet authored, independence mode)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
State the diagonalizability criterion — $A$ is diagonalizable IFF it has $n$ LINEARLY INDEPENDENT
eigenvectors — and build $A=PDP^{-1}$ with eigenvectors as $P$'s columns and eigenvalues as $D$'s
diagonal IN MATCHING ORDER (never mismatched); compute matrix powers efficiently via
$A^k=PD^kP^{-1}$ (diagonal powers computed ENTRYWISE); and recognize non-diagonalizability arises
when algebraic multiplicity EXCEEDS geometric multiplicity (never assuming a repeated eigenvalue
automatically determines diagonalizability either way).

## Core Understanding
$P$'S COLUMNS AND $D$'S DIAGONAL MUST BE IN MATCHING ORDER — NEVER MISMATCHED: for
$A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ with $\lambda_1=5$ (eigenvector $(1,1)$) and $\lambda_2=2$
(eigenvector $(1,-2)$): $P=\begin{pmatrix}1&1\\1&-2\end{pmatrix}$, $D=\begin{pmatrix}5&0\\0&2
\end{pmatrix}$ — column 1 of $P$ (the $\lambda_1=5$ eigenvector) MUST pair with $D$'s first
diagonal entry. Mismatching the order (e.g. keeping $P$'s columns as-is but writing
$D=\text{diag}(2,5)$) produces a factorization that provably does NOT reconstruct $A$ when
multiplied out — the pairing is not optional bookkeeping, it's essential to the factorization's
correctness.

DIAGONAL POWERS ARE COMPUTED ENTRYWISE — THE ENTIRE PRACTICAL PAYOFF: $A^k=(PDP^{-1})^k=PD^kP^{-1}$
(the $P^{-1}P$ pairs cancel in between). Computing $A^{10}$ for the above: $D^{10}=
\begin{pmatrix}5^{10}&0\\0&2^{10}\end{pmatrix}=\begin{pmatrix}9765625&0\\0&1024\end{pmatrix}$ —
computed by raising each diagonal entry independently, avoiding 10 successive $2\times2$ matrix
multiplications entirely. This dramatic efficiency gain is diagonalization's central practical
reason for existing.

A REPEATED EIGENVALUE IS A WARNING TO CHECK — NEVER AN AUTOMATIC VERDICT EITHER WAY: for
$A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$: $\lambda=2$ has ALGEBRAIC multiplicity 2, but solving
$(A-2I)v=0$ gives only a ONE-dimensional eigenspace (GEOMETRIC multiplicity 1). Since geometric
(1) $<$ algebraic (2), there's only 1 independent eigenvector, not the 2 needed — $A$ is NOT
diagonalizable. But contrast $A=2I$: ALSO a repeated eigenvalue (2, multiplicity 2), yet ALREADY
diagonal with geometric multiplicity 2 — trivially diagonalizable. Assuming ANY repeated eigenvalue
automatically means non-diagonalizable (or automatically means diagonalizable) is wrong either
way — the actual comparison of algebraic versus geometric multiplicity must always be checked
directly.

## Mental Models
- **"Match the columns of P to the diagonal entries of D — the SAME eigenvector-eigenvalue pairing
  must be preserved, or the factorization is simply wrong."**
- **"Diagonal matrices make powers trivial — raise each entry separately, never multiply the full
  matrix by itself repeatedly."**
- **"A repeated eigenvalue is a flag to actually compare algebraic and geometric multiplicity —
  never a verdict by itself."**

## Why Students Fail

### MC-1: EIGENVECTOR-EIGENVALUE-ORDER-MISMATCHED-BETWEEN-P-AND-D
- **Surface form**: places eigenvectors in $P$ and eigenvalues in $D$ without matching column
  order, producing an incorrect factorization.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the pairing
  requirement is easy to overlook once both $P$ and $D$ are constructed separately).
- **Repair**: re-build $P$ and $D$ with explicit column labels, verifying the reconstruction.

### MC-2: REPEATED-EIGENVALUE-DIAGONALIZABILITY-ASSUMED-WITHOUT-CHECKING-MULTIPLICITIES
- **Surface form**: assumes a repeated eigenvalue automatically determines diagonalizability
  (either way) without comparing algebraic and geometric multiplicities.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a repeated eigenvalue
  feels like a clear signal, obscuring that the actual comparison must be checked directly).
- **Repair**: re-compute both multiplicities explicitly for the failing case and the trivial
  $A=2I$ counterexample, confirming the comparison rule.

## Misconceptions

### MC-1: EIGENVECTOR-EIGENVALUE-ORDER-MISMATCHED-BETWEEN-P-AND-D
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: REPEATED-EIGENVALUE-DIAGONALIZABILITY-ASSUMED-WITHOUT-CHECKING-MULTIPLICITIES
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"P and D are a matched pair of dance partners — swap one partner without swapping the other,
  and the choreography (the factorization) falls apart."**
- **Anti-analogy**: a repeated eigenvalue is NOT automatically a red flag for non-diagonalizability
  — it's just a reminder to actually check, since a repeated eigenvalue with a full-dimensional
  eigenspace is perfectly fine.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct $P$/$D$ construction and reconstruction check for
  $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$.
- **Demonstration 2 (positive case)**: the $A^{10}$ entrywise power computation via $D^{10}$.
- **Demonstration 3 (targets MC-2)**: the non-diagonalizable $\begin{pmatrix}2&1\\0&2\end{pmatrix}$
  case contrasted directly with the trivially-diagonalizable $A=2I$.

## Discovery Questions
1. "Do the columns of P and the diagonal entries of D need to be in matching order, or can they be
   built independently?"
2. "Once you have A=PDP⁻¹, is computing A raised to a large power still as much work as before, or
   does something become trivial?"
3. "Does a repeated eigenvalue automatically tell you whether a matrix is diagonalizable, or do you
   need to check something further?"

## Teaching Sequence
1. **Conceptual shift**: eigenvector-column-to-eigenvalue-diagonal-entry matching, working
   Demonstration 1, isolating MC-1.
2. **Representation shift**: entrywise diagonal powers as the practical payoff, working
   Demonstration 2.
3. **Contrast pair**: algebraic-versus-geometric multiplicity comparison, working Demonstration 3,
   isolating MC-2.
4. **Mastery gate**: require a correct diagonalization with matched ordering, a correct power
   computation via the diagonalized shortcut, and a correct diagonalizability determination via
   multiplicity comparison, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a diagonalization where $P$'s columns and $D$'s diagonal entries aren't in matching
  eigenvector-eigenvalue order.
- Never accept a diagonalizability verdict based solely on whether an eigenvalue is repeated,
  without comparing algebraic and geometric multiplicities.

## Voice Teaching Notes
- Say "does this column of P match this entry of D?" whenever a diagonalization is constructed.
- Ask "have you actually compared the algebraic and geometric multiplicities, or are you just
  reacting to the repeated eigenvalue?" whenever diagonalizability is being determined.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly builds $P$ and $D$ with matching eigenvector-
  eigenvalue order.
- **Rung 2 (application)**: learner correctly computes a matrix power via the diagonalized
  shortcut.
- **Rung 3 (transfer)**: learner correctly determines diagonalizability by comparing algebraic and
  geometric multiplicities, and explains long-run behavior (dominant vs. decaying eigenvalues) in
  an applied scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-build $P$ and $D$ with explicit labels and verify reconstruction.
- If MC-2 recurs, re-compute both multiplicities explicitly for contrasting cases.

## Memory Hooks
- "P's columns and D's diagonal must be matched pairs — never mixed up."
- "Diagonal powers are entrywise — that's the whole point of diagonalizing."
- "A repeated eigenvalue is a flag to check multiplicities, never a verdict by itself."

## Transfer Connections
- `math.linalg.eigenvalues` (already authored, certified domain): supplies the eigenvalues this
  concept's diagonal matrix $D$ is built from.
- `math.linalg.eigenspace` (already authored, certified domain): supplies the eigenvectors and
  their span this concept's matrix $P$'s columns come from, and the geometric-multiplicity
  concept this concept's diagonalizability criterion directly relies on.
- `math.linalg.matrix-inverse` (already authored, certified domain): supplies the $P^{-1}$ this
  concept's factorization requires.
- `math.linalg.matrix-exponential` (not yet authored, KG's declared unlock): the direct extension
  of this concept's power-computation shortcut to matrix exponentials.
- `math.linalg.spectral-theorem`, `math.linalg.jordan-form` (not yet authored, KG's declared
  related concepts): the symmetric-matrix special case and the generalization for
  non-diagonalizable matrices, respectively.

## Cross-Subject Connections
- Population dynamics/Markov chains: long-run behavior of a transition matrix via its dominant
  eigenvalue, with smaller eigenvalues decaying under repeated powering.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.diagonalization.md`, reused by
  reference for its full $P$/$D$ construction and power computation, its non-diagonalizable-versus-
  trivially-diagonalizable contrast, and its two-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe (pending
  `math.de.systems-matrix-method`'s authoring), applying diagonalization to a population-growth
  transition-matrix scenario and its long-run behavior.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.eigenvalues`/`math.linalg.eigenspace`/`math.linalg.matrix-inverse`, unlocks
  `math.linalg.matrix-exponential`, cross_links `math.de.systems-matrix-method`,
  proficient/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against the
  live KG and matches exactly. `math.de.systems-matrix-method` independently re-confirmed still
  unauthored — the Blueprint's independence-mode transfer probe remains correct.

## Version History
- 2026-09-19 (Batch 174): authored. First entry this batch. Companion batch concept:
  `math.linalg.projection`.
