# math.linalg.positive-definite

## Identity
- **KG id**: `math.linalg.positive-definite`
- **Domain**: math.linalg
- **Requires**: `math.linalg.spectral-theorem`
- **Unlocks**: `math.linalg.cholesky`
- **Cross-links**: `math.opt.convex-function` (Blueprint's own Component 7 checked at
  BLUEPRINT-write-time and correctly found unauthored then — the EDUCATIONAL-BRAIN corpus HAS
  since authored this concept, and its own EB entry reciprocally cross-links back to THIS
  concept — upgraded to a genuine cross-link probe here, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Define positive definiteness via the quadratic-form condition $v^TAv>0$ for EVERY nonzero $v$; use
the eigenvalue characterization — positive definite IFF every eigenvalue is STRICTLY positive —
DERIVED directly from the Spectral Theorem's factorization (never asserted as a separate fact);
and distinguish positive SEMI-definite (allowing $v^TAv\ge0$, zero eigenvalues permitted) from
positive definite (never treating the two as interchangeable, since a zero eigenvalue is exactly
the boundary that separates them).

## Core Understanding
THE EIGENVALUE TEST IS DERIVED FROM THE SPECTRAL THEOREM — NEVER AN INDEPENDENTLY ASSERTED FACT:
substituting $A=Q\Lambda Q^T$ into $v^TAv$: with $w=Q^Tv$ (nonzero exactly when $v$ is, since
$Q^{-1}=Q^T$): $v^TAv=w^T\Lambda w=\sum_i\lambda_iw_i^2$ — a sum of squares WEIGHTED by the
eigenvalues. This sum is guaranteed positive for EVERY nonzero $w$ if and only if EVERY
$\lambda_i>0$: if even one eigenvalue were $\le0$, choosing $w$ along that eigenvector's direction
(all other components zero) makes the sum $\le0$. "Positive definite" and "all eigenvalues
positive" are literally the SAME fact — the Spectral Theorem's factorization IS the proof, never
a coincidentally-matching separate condition.

A ZERO EIGENVALUE IS THE EXACT BOUNDARY BETWEEN PSD AND POSITIVE DEFINITE — NEVER
INTERCHANGEABLE: for $A=\begin{pmatrix}1&1\\1&1\end{pmatrix}$: eigenvalues $\lambda=0,2$. Since one
eigenvalue is EXACTLY zero, $A$ is NOT positive definite — but IS positive semi-definite (all
eigenvalues $\ge0$). Verify directly: for the zero-eigenvalue eigenvector $v=(1,-1)$: $v^TAv=
1-2+1=0$ — the quadratic form GENUINELY equals zero for this nonzero $v$, confirming $A$ fails
strict positive definiteness (which requires $v^TAv>0$ for EVERY nonzero $v$, no exceptions)
while still qualifying as PSD. PSD allows the quadratic form to touch zero; genuinely positive
definite matrices never do, for any nonzero input at all.

## Mental Models
- **"Positive definite means the quadratic form never dips to zero or negative for any nonzero
  input — and this is EXACTLY the same fact as every eigenvalue being strictly positive, proven
  directly via the Spectral Theorem's factorization."**
- **"A zero eigenvalue is the precise boundary — PSD allows touching zero, positive definite never
  does."**

## Why Students Fail

### MC-1: POSITIVE-DEFINITE-AND-PSD-TREATED-AS-INTERCHANGEABLE
- **Surface form**: believes positive definite and positive semi-definite are the same condition,
  missing that a zero eigenvalue distinguishes them exactly at the strict/non-strict boundary.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the terms sound close
  enough, and the distinction only manifests at a specific boundary case that's easy to overlook).
- **Repair**: re-walk the direct demonstration that the quadratic form equals exactly zero for a
  specific nonzero $v$ in the zero-eigenvalue case.

### MC-2: POSITIVE-DEFINITENESS-CHECKED-ON-NON-SYMMETRIC-MATRIX
- **Surface form**: attempts to apply the positive-definiteness eigenvalue test to a non-symmetric
  matrix, missing that the Spectral Theorem (and hence the entire eigenvalue-based equivalence)
  only applies to symmetric matrices.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the eigenvalue test's
  simplicity invites applying it without checking the symmetry precondition first).
- **Repair**: re-anchor on "the entire eigenvalue-equivalence argument used the Spectral Theorem's
  $A=Q\Lambda Q^T$ factorization, which requires symmetry."

### MC-3: ONE-EIGENVALUE-CHECKED-INSTEAD-OF-ALL
- **Surface form**: concludes a matrix is positive definite after verifying only one or a few
  eigenvalues are positive, rather than confirming EVERY eigenvalue is positive.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a partial check can feel
  sufficient, especially for larger matrices where checking every eigenvalue is more work).
- **Repair**: re-anchor on "EVERY eigenvalue must be positive — a single negative or zero
  eigenvalue disqualifies the whole matrix."

## Misconceptions

### MC-1: POSITIVE-DEFINITE-AND-PSD-TREATED-AS-INTERCHANGEABLE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: POSITIVE-DEFINITENESS-CHECKED-ON-NON-SYMMETRIC-MATRIX
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: ONE-EIGENVALUE-CHECKED-INSTEAD-OF-ALL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Positive definiteness is a unanimous vote — every single eigenvalue must vote 'positive,' and
  even one dissenting zero or negative eigenvalue disqualifies the whole matrix."**
- **Anti-analogy**: PSD is NOT just a looser synonym for positive definite — it specifically
  permits the boundary case (a zero eigenvalue) that positive definite strictly excludes.

## Demonstrations
- **Demonstration 1 (positive case)**: the diagonal-matrix direct quadratic-form verification for
  $A=\begin{pmatrix}2&0\\0&3\end{pmatrix}$.
- **Demonstration 2 (the derivation)**: the live substitution $v^TAv=\sum\lambda_iw_i^2$ using
  the Spectral Theorem, connecting the quadratic form to the eigenvalue test.
- **Demonstration 3 (targets MC-1)**: the zero-eigenvalue PSD-but-not-positive-definite example,
  with the specific nonzero $v$ where the quadratic form vanishes exactly.

## Discovery Questions
1. "Is the eigenvalue test for positive definiteness a separately-asserted fact, or does it follow
   directly from the Spectral Theorem's factorization?"
2. "Are 'positive definite' and 'positive semi-definite' just two names for the same condition?"
3. "If a matrix has 4 out of 5 eigenvalues positive, is it positive definite?"

## Teaching Sequence
1. **Representation shift**: the direct quadratic-form verification, working Demonstration 1.
2. **Representation shift (continued)**: the live eigenvalue-test derivation from the Spectral
   Theorem, working Demonstration 2.
3. **Conflict evidence**: the PSD-versus-positive-definite zero-eigenvalue boundary, working
   Demonstration 3, isolating MC-1.
4. **Mastery gate**: require a correct direct quadratic-form verification, a correct eigenvalue-
   based determination (checking EVERY eigenvalue), and a correct PSD-versus-positive-definite
   distinction with a specific boundary example, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept "positive definite" and "positive semi-definite" used interchangeably.
- Never accept the eigenvalue test applied to a non-symmetric matrix.
- Never accept a positive-definiteness conclusion based on checking only some, not all,
  eigenvalues.

## Voice Teaching Notes
- Say "does the quadratic form ever touch zero, or is it always strictly positive?" whenever PSD
  versus positive definite is discussed.
- Ask "is this matrix symmetric? The eigenvalue test only applies if it is." whenever the
  eigenvalue test is invoked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies positive definiteness directly via the
  quadratic form for a diagonal matrix.
- **Rung 2 (application)**: learner correctly applies the eigenvalue test, checking every
  eigenvalue, and correctly applies Sylvester's criterion as an alternative.
- **Rung 3 (transfer)**: learner correctly distinguishes PSD from positive definite via a specific
  boundary example, and applies the concept to a Hessian-based local-minimum check in optimization.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the zero-eigenvalue PSD boundary example.
- If MC-2 recurs, re-anchor on the symmetry precondition for the Spectral Theorem.
- If MC-3 recurs, re-anchor on the "every eigenvalue" requirement.

## Memory Hooks
- "Positive definite means EVERY eigenvalue is strictly positive — the Spectral Theorem proves
  this, it's not a separate fact."
- "A zero eigenvalue is the exact boundary — PSD allows it, positive definite never does."
- "The eigenvalue test needs symmetry first — it's built on the Spectral Theorem."

## Transfer Connections
- `math.linalg.spectral-theorem` (already authored, this campaign, Batch 175): supplies the
  factorization $A=Q\Lambda Q^T$ this concept's eigenvalue characterization is directly derived
  from.
- `math.linalg.symmetric-matrix` (already authored, certified domain, KG's declared related
  concept): supplies the symmetry precondition this concept's entire eigenvalue-equivalence
  argument requires.
- `math.linalg.cholesky` (not yet authored, KG's declared unlock): the decomposition that exists
  precisely for positive definite matrices.
- `math.opt.convex-function` (already authored — genuine cross-link, corrected from the
  Blueprint's original independence-mode deferral, see Curriculum Feedback): supplies the
  chord-inequality definition of convexity and its equivalence to a positive-semidefinite Hessian
  ($\nabla^2f\succeq0$), directly reusing this concept's own eigenvalue test.

## Cross-Subject Connections
- Optimization: checking whether a Hessian matrix at a critical point is positive definite
  (confirming a genuine local minimum) versus merely PSD (inconclusive, needs more information).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.positive-definite.md`, reused by
  reference for its diagonal-matrix quadratic-form example, its live Spectral-Theorem-based
  eigenvalue-test derivation, its zero-eigenvalue PSD boundary example, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own probe (independence mode originally, now supplemented by the
  genuine cross-link to `math.opt.convex-function` established here), applying the eigenvalue test
  to a Hessian-based local-minimum check in optimization.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  checked `math.opt.convex-function`'s authorship status AT THE BLUEPRINT'S OWN WRITE-TIME and
  correctly found it unauthored then, setting independence mode — but the EDUCATIONAL-BRAIN corpus
  has SINCE authored `math.opt.convex-function`, whose own EB entry reciprocally cross-links back
  to THIS concept (`math.linalg.positive-definite`) for its Hessian-positive-semidefinite
  convexity criterion — upgraded here to a genuine cross-link probe, the fourth such
  reverse-direction discrepancy this campaign (after the pre-segment Batch 131, Batch 152's
  `math.linalg.characteristic-polynomial`, Batch 156's `math.calc.taylor-series`, and Batch 165's
  `math.meas.l2-space`).
- All other fields (requires, unlocks, difficulty, bloom, mastery_threshold, estimated_hours)
  matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 176): authored. First entry this batch. Companion batch concept:
  `math.linalg.qr-factorization`.
