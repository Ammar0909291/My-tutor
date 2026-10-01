# math.num.qr-algorithm

## Identity
- **KG id**: `math.num.qr-algorithm`
- **Domain**: math.num
- **Requires**: `math.linalg.qr-factorization`, `math.linalg.eigenvalues`
- **Unlocks**: none
- **Cross-links**: `math.linalg.qr-factorization`
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Distinguish the QR ALGORITHM (an iterative eigenvalue method) from QR FACTORIZATION (a one-shot
decomposition $A=QR$) — NEVER the same thing; recognize each iteration step is an orthogonal
SIMILARITY transformation preserving eigenvalues, so the eigenvectors are NEVER given directly by
individual $Q_k$ factors; and recognize a shift $\sigma$ NEVER permanently changes the
eigenvalues — it is subtracted, then added back.

## Core Understanding
THE QR ALGORITHM ITERATES QR FACTORIZATION — IT IS NEVER THE SAME AS A ONE-SHOT QR FACTORIZATION:
QR factorization finds $Q,R$ such that $A=QR$ ONCE. The QR ALGORITHM iterates: factor
$A_{k-1}=Q_kR_k$, then REVERSE the factors: $A_k=R_kQ_k$, repeated dozens of times. For
$A=[[4,1],[2,3]]$: the diagonal of $R$ from the ONE-SHOT factorization $A=QR$ is NOT the
eigenvalues (it depends on Gram-Schmidt norms) — the true eigenvalues are $5,2$ (from
$\lambda^2-7\lambda+10=0$). Believing "the diagonal of $R$ gives the eigenvalues" confuses the
factorization's own output with the ALGORITHM's converged result — after the QR ALGORITHM
converges, the DIAGONAL OF $A_k$ (the full reassembled matrix, never $R$ alone) contains the
eigenvalues.

INDIVIDUAL $Q_k$ FACTORS ARE NEVER THE EIGENVECTORS DIRECTLY: $A_k=R_kQ_k=Q_k^TA_{k-1}Q_k$ — an
orthogonal SIMILARITY transformation at every step, so all $A_k$ share the SAME eigenvalues as
$A$ (similarity transformations preserve the characteristic polynomial). But each individual
$Q_k$ depends on the CURRENT (partially converged) iterate, never the original $A$ — believing
$Q_k$ is directly the eigenvector matrix is WRONG. Only the ACCUMULATED product
$Z_k=Q_1Q_2\cdots Q_k$ converges, after FULL convergence, to the Schur vectors — for a symmetric
$A$, these equal the eigenvectors; for non-symmetric $A$, they are merely a basis in which $A$ is
upper triangular, never the eigenvectors themselves without further work.

A SHIFT $\sigma$ NEVER PERMANENTLY CHANGES THE EIGENVALUES — IT IS SUBTRACTED THEN ADDED BACK:
shifted QR replaces $A$ with $A-\sigma I$ at each step, iterates, then ADDS $\sigma I$ back:
$A_{k+1}=R_k(A_k-\sigma I)Q_k+\sigma I$. The eigenvalues of $A-\sigma I$ are $(\lambda_i-\sigma)$;
after adding $\sigma I$ back, the eigenvalues RETURN to $\lambda_i$ exactly. Believing shifting
$A-\sigma I$ changes the eigenvalues of the ORIGINAL problem is WRONG — the shift accelerates
CONVERGENCE to the eigenvalue nearest $\sigma$ (with the Wilkinson shift achieving cubic
convergence), never moving the eigenvalues themselves; it is subtracted purely to make the
iteration converge faster, then restored.

## Mental Models
- **"QR factorization is a noun — one decomposition. QR algorithm is a verb — it iterates that
  decomposition repeatedly, never the same operation performed once."**
- **"Only the FULLY accumulated product of every Qₖ approximates the eigenvector basis — never
  any single step's Qₖ along the way."**
- **"A shift is subtracted then restored, like weighing luggage by zeroing out the trolley's known
  weight — the true weight never actually changes."**

## Why Students Fail

### MC-1: QR-ALGORITHM-IS-QR-FACTORIZATION
- **Surface form**: confuses the QR algorithm (an iterative eigenvalue method) with QR
  factorization (a one-shot decomposition $A=QR$) — believes they are the same thing applied
  differently.
- **Birth type**: language contamination (Blueprint's own declared birth type — "QR algorithm"
  shares the name "QR" with QR factorization, and the algorithm uses QR factorization at each
  step, intensifying the confusion).
- **Repair**: re-state the noun-versus-verb distinction explicitly — factorization solves $A=QR$
  once; the algorithm applies it repeatedly to drive $A$ toward triangular form.

### MC-2: QR-GIVES-EIGENVECTORS-DIRECTLY
- **Surface form**: believes the matrices $Q_k$ from each QR step are the eigenvectors, not
  understanding that only after full convergence does the accumulated product $Q_1Q_2\cdots Q_k$
  approximate the eigenvector matrix.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — the notation $Q_k$
  appears at every step and $Q$ is the eigenvector matrix in the spectral theorem, so students
  conflate any $Q$ in a QR step with the eigenvector matrix).
- **Repair**: re-derive the accumulated-product convergence, distinguishing Schur vectors from
  eigenvectors for the non-symmetric case.

### MC-3: SHIFTS-CHANGE-THE-EIGENVALUES
- **Surface form**: thinks shifting ($A-\sigma I$) changes the eigenvalues of the original
  problem, not recognizing that $\sigma$ is subtracted and then added back.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — any modification to a
  matrix sounds like it changes the answer; "shifting" sounds like permanently "moving" the
  eigenvalues).
- **Repair**: re-derive the subtract-then-restore mechanics explicitly, using the luggage-and-
  trolley analogy.

## Misconceptions

### MC-1: QR-ALGORITHM-IS-QR-FACTORIZATION
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-2: QR-GIVES-EIGENVECTORS-DIRECTLY
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: SHIFTS-CHANGE-THE-EIGENVALUES
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"QR factorization is a single snapshot; the QR algorithm is a movie made of many snapshots,
  each reassembled and refactored — never the same single frame repeated."**
- **Anti-analogy**: a shift doesn't relocate the true eigenvalues any more than temporarily
  subtracting a known offset relocates a measurement — it's a bookkeeping trick for speed, never
  a change to the answer.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $A=[[4,1],[2,3]]$ diagonal-of-$R$-is-not-eigenvalues
  gate question.
- **Demonstration 2 (targets MC-2)**: the accumulated-product $Z_k$ Schur-vectors-versus-
  eigenvectors distinction.
- **Demonstration 3 (targets MC-3)**: the subtract-$\sigma$-then-restore-$\sigma$ eigenvalue-
  preservation derivation.

## Discovery Questions
1. "Is the QR algorithm the same thing as computing A=QR once, or does it repeat that
   factorization many times?"
2. "Are the individual Qₖ matrices from each QR step the eigenvectors of A?"
3. "Does subtracting σI before iterating permanently change A's eigenvalues?"

## Teaching Sequence
1. **Representation shift**: the four-representation QR-algorithm derivation (iterative
   procedure, similarity invariant, convergence intuition, Schur form), setting up the
   similarity-preservation groundwork.
2. **Pattern induction**: the shifts-and-deflation gallery, building toward MC-3.
3. **Misconception detector**: the QR-algorithm-vs-QR-factorization gate question, working
   Demonstration 1, isolating MC-1.
4. **Reused procedure**: the accumulated-Schur-vectors derivation, working Demonstration 2,
   isolating MC-2; and the shift-subtract-restore derivation, working Demonstration 3, isolating
   MC-3.
5. **Mastery gate**: require a correct distinction between QR factorization and the QR algorithm,
   a correct explanation of why eigenvalues are preserved via similarity, and a correct
   explanation of why shifts don't change the eigenvalues, at the Blueprint's own stated MAMR of
   4/5.

## Tutor Actions
- Never accept QR factorization and the QR algorithm treated as the same procedure.
- Never accept an individual step's $Q_k$ presented as the eigenvector matrix.
- Never accept a shift claimed to permanently alter the eigenvalues of the original matrix.

## Voice Teaching Notes
- Say "is that the one-shot factorization, or the repeated iteration?" whenever "QR" is
  mentioned without qualification.
- Ask "is σ still there at the end, or was it added back?" whenever a shift is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes QR factorization from the QR
  algorithm.
- **Rung 2 (application)**: learner correctly explains why each QR-algorithm step preserves
  eigenvalues via similarity.
- **Rung 3 (transfer)**: learner correctly connects the QR algorithm applied to $A^TA$ to SVD
  computation, comparing bidiagonalization to Hessenberg reduction.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the noun-versus-verb distinction.
- If MC-2 recurs, re-derive the accumulated-product Schur-vectors convergence.
- If MC-3 recurs, re-derive the subtract-then-restore shift mechanics.

## Memory Hooks
- "QR factorization is a noun; QR algorithm is a verb — never the same operation."
- "Only the fully accumulated Q-product approximates eigenvectors — never a single step's Qₖ."
- "A shift is subtracted then restored — the true eigenvalues never actually move."

## Transfer Connections
- `math.linalg.qr-factorization` (already authored, certified domain; cross-link): supplies the
  one-shot QR decomposition this concept applies iteratively.
- `math.linalg.eigenvalues` (already authored, certified domain): supplies the eigenvalue
  definitions and characteristic-polynomial framework this concept's similarity-invariance
  argument directly relies on.

## Cross-Subject Connections
- Machine learning (PCA): computing the top singular values and vectors of a data matrix via the
  QR algorithm applied to $A^TA$ is a standard technique, though large-scale settings favor
  Krylov-subspace or randomized alternatives.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.qr-algorithm.md`, reused by reference
  for its four-representation iterative-procedure derivation, its shifts-and-deflation gallery,
  its QR-algorithm-vs-factorization gate question, and its three-misconception registry (birth
  types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.linalg.qr-factorization`) on
  connecting the QR algorithm to SVD computation via $A^TA$, bidiagonalization, and Jacobi versus
  QR-SVD stability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.qr-factorization`/`math.linalg.eigenvalues`, unlocks none, cross_links
  `math.linalg.qr-factorization`, expert/analyze, mastery_threshold 0.75, estimated_hours 6) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 221): authored. First entry this batch. Companion batch concept:
  `math.num.runge-kutta`.
