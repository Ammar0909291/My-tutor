# math.num.svd

## Identity
- **KG id**: `math.num.svd`
- **Domain**: math.num
- **Requires**: `math.linalg.svd`, `math.num.qr-algorithm`
- **Unlocks**: none
- **Cross-links**: `math.linalg.svd`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 5

## Learning Objective
Distinguish SVD ($A=U\Sigma V^T$) from eigendecomposition ($A=PDP^{-1}$) — NEVER the same
except for symmetric PSD matrices; recognize truncated SVD $A_k$ is the PROVABLY OPTIMAL rank-$k$
approximation (Eckart-Young), NEVER a heuristic "throwing away random information"; and recognize
NUMERICAL rank requires a THRESHOLD $\varepsilon\|A\|_2$, NEVER counting exactly-zero singular
values in floating-point.

## Core Understanding
SVD IS NEVER THE SAME AS EIGENDECOMPOSITION — EXCEPT FOR SYMMETRIC PSD MATRICES: for
$A=[[1,2],[3,4]]$: eigenvalues are $5.37,-0.37$, but singular values are $\sigma_1=\sqrt{\lambda_
{\max}(A^TA)}\approx5.46$, $\sigma_2\approx0.37$ — GENUINELY DIFFERENT numbers. Eigenvalues can
be NEGATIVE or complex; singular values are ALWAYS non-negative. For non-symmetric $A$, SVD's
$U\ne V$ (two DIFFERENT orthogonal matrices), while eigendecomposition's $P$ is generally NOT
orthogonal. Believing singular values equal eigenvalues and $U,V$ are eigenvector matrices is
WRONG — only for symmetric positive semidefinite matrices does eigendecomposition coincide with
SVD ($U=V=Q$, $\Sigma=\Lambda$); this is a SPECIAL case, never the general rule.

TRUNCATED SVD $A_k$ IS THE PROVABLY OPTIMAL RANK-$k$ APPROXIMATION — NEVER A HEURISTIC LOSS: the
Eckart-Young theorem states: among ALL rank-$k$ matrices $C$, $A_k=U_k\Sigma_kV_k^T$ MINIMIZES
$\|A-C\|_2$, with $\|A-A_k\|_2=\sigma_{k+1}$ — a mathematical OPTIMALITY guarantee, never a
coincidental approximation. Believing $A_k$ loses "random" information misses that it discards
EXACTLY the LEAST IMPORTANT rank-1 components (those with the SMALLEST singular values); no other
rank-$k$ matrix can be CLOSER to $A$ — for image compression, a rank-10 truncation of a
$1000\times1000$ image achieves 99% storage compression while discarding only the fine
detail/noise corresponding to the smallest singular values.

NUMERICAL RANK REQUIRES A THRESHOLD $\varepsilon\|A\|_2$ — NEVER COUNTING EXACTLY-ZERO SINGULAR
VALUES: for $A=[[1,2,3],[2,4,6],[3,6,9]]$ (exact rank 1): floating-point SVD gives
$\sigma_1\approx12.85$, $\sigma_2\approx3\times10^{-16}$, $\sigma_3\approx10^{-16}$ — NOT exactly
zero, but tiny (roundoff-sized). Using a count of EXACTLY-zero values to determine rank in
floating-point code is WRONG — every computed singular value carries roundoff of magnitude
$\approx u\|A\|_2$; the NUMERICAL rank is the count of $\sigma_i>\varepsilon\cdot\|A\|_2$ for a
chosen tolerance (typically $\varepsilon=n\cdot u$) — never a bare `sum(s>0)` check, which always
returns the full dimension in floating point.

## Mental Models
- **"Singular values and eigenvalues are different numbers from different questions — never the
  same, except in the special symmetric PSD case."**
- **"Truncated SVD discards the LEAST important information, provably optimally — never a random
  or heuristic loss."**
- **"Floating-point SVD never gives exactly-zero singular values for a rank-deficient matrix —
  numerical rank always needs a threshold."**

## Why Students Fail

### MC-1: SVD-AND-EIGENDECOMPOSITION-ARE-THE-SAME
- **Surface form**: treats SVD ($A=U\Sigma V^T$) as the same as eigendecomposition
  ($A=PDP^{-1}$), believing singular values are eigenvalues and $U,V$ are eigenvector matrices.
- **Birth type**: language contamination (Blueprint's own declared birth type — both involve a
  diagonal matrix of "special values" and matrices of "special vectors"; for symmetric matrices
  the two coincide, and students overgeneralize this special case).
- **Repair**: re-compute both decompositions for a non-symmetric matrix, confirming the singular
  values and eigenvalues genuinely differ.

### MC-2: TRUNCATED-SVD-DISCARDS-INFORMATION
- **Surface form**: believes the best rank-$k$ approximation $A_k$ loses "random" information,
  not recognizing the Eckart-Young theorem proves $A_k$ is optimal.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — "truncation" sounds
  like loss; "throwing away" singular values sounds destructive).
- **Repair**: re-state the Eckart-Young optimality guarantee explicitly, confirming no other
  rank-$k$ matrix can be closer to $A$.

### MC-3: NUMERICAL-RANK-IS-EXACT-RANK
- **Surface form**: reads computed singular values as exact and uses a count of exactly-zero
  values as the rank, not recognizing floating-point SVD gives near-zero (not zero) values.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — theoretical rank
  counts exactly-zero singular values; the distinction from computed rank is not emphasized).
- **Repair**: re-compute the rank-1 matrix's floating-point singular values, confirming
  $\sigma_2,\sigma_3$ are tiny but nonzero, requiring a threshold.

## Misconceptions

### MC-1: SVD-AND-EIGENDECOMPOSITION-ARE-THE-SAME
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-2: TRUNCATED-SVD-DISCARDS-INFORMATION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: NUMERICAL-RANK-IS-EXACT-RANK
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Eigenvalues describe a matrix's own character; singular values describe how it stretches
  space — related for symmetric matrices, never generally the same."**
- **Anti-analogy**: truncated SVD isn't like randomly cropping a photo — it's like selectively
  keeping the layers that matter most and provably discarding the least important ones, guaranteed
  optimal by Eckart-Young.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $A=[[1,2],[3,4]]$ eigenvalue-versus-singular-value
  computation.
- **Demonstration 2 (targets MC-2)**: the Eckart-Young optimality statement with the image-
  compression rank-10-truncation example.
- **Demonstration 3 (targets MC-3)**: the rank-1 matrix's floating-point near-zero-but-nonzero
  singular values.

## Discovery Questions
1. "Are the singular values of a matrix the same as its eigenvalues?"
2. "Does truncating the SVD to rank k lose random information, or does it provably discard the
   least important part?"
3. "In floating-point, does a rank-deficient matrix give exactly-zero singular values?"

## Teaching Sequence
1. **Representation shift**: the four-representation SVD derivation (geometric, algebraic,
   rank-1 decomposition, algorithm), setting up the eigenvalue-versus-singular-value groundwork.
2. **Pattern induction**: the applications gallery (image compression, regularized least
   squares, numerical rank), isolating MC-2 and MC-3.
3. **Misconception detector**: the SVD-vs-eigendecomposition gate question, working
   Demonstration 1, isolating MC-1.
4. **Mastery gate**: require a correct SVD computation distinguishing singular values from
   eigenvalues, a correct rank-$k$ truncation with Eckart-Young justification, and a correct
   numerical-rank determination via threshold, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept singular values equated with eigenvalues for a non-symmetric matrix.
- Never accept truncated SVD described as discarding random or arbitrary information.
- Never accept numerical rank computed by counting exactly-zero singular values.

## Voice Teaching Notes
- Say "is A symmetric positive semidefinite — because that's the only case where these
  coincide?" whenever singular values and eigenvalues are compared.
- Ask "is that singular value exactly zero, or just very small due to roundoff?" whenever
  numerical rank is being determined.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the SVD of a small matrix and identifies
  it differs from the eigendecomposition.
- **Rung 2 (application)**: learner correctly computes the best rank-$k$ approximation and states
  its error via Eckart-Young.
- **Rung 3 (transfer)**: learner correctly applies randomized SVD reasoning to estimate speedup
  for a large sparse matrix.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute both decompositions for a non-symmetric example.
- If MC-2 recurs, re-state the Eckart-Young optimality guarantee.
- If MC-3 recurs, re-compute the rank-deficient matrix's near-zero singular values.

## Memory Hooks
- "Singular values and eigenvalues differ — except for symmetric PSD matrices."
- "Truncated SVD discards the least important part, provably optimally."
- "Floating-point SVD never gives exactly zero — numerical rank always needs a threshold."

## Transfer Connections
- `math.linalg.svd` (already authored, certified domain; cross-link): supplies the general SVD
  theory this concept applies with explicit numerical computation and stability analysis.
- `math.num.qr-algorithm` (already authored, this campaign, Batch 221): supplies the QR-iteration
  machinery the second phase of numerical SVD computation directly builds on.

## Cross-Subject Connections
- Natural language processing: computing the top singular vectors of a large sparse TF-IDF
  document-term matrix for document retrieval is a standard, large-scale SVD application.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.svd.md`, reused by reference for its
  four-representation numerical SVD derivation, its applications gallery, its SVD-vs-
  eigendecomposition gate question, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.linalg.svd`) on randomized SVD
  algorithms, deriving the approximate rank-$k$ SVD from a random sketch and estimating speedup.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.svd`/`math.num.qr-algorithm`, unlocks none, cross_links `math.linalg.svd`,
  expert/apply, mastery_threshold 0.7, estimated_hours 5) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 222): authored. First entry this batch. Companion batch concept:
  `math.num.iterative-linear`.
