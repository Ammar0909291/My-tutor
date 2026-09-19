# math.linalg.singular-values

## Identity
- **KG id**: `math.linalg.singular-values`
- **Domain**: math.linalg
- **Requires**: `math.linalg.svd`, `math.linalg.eigenvalues`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Compute singular values as $\sigma_i=\sqrt{\text{eigenvalues of }A^TA}$ (equivalently
$\sqrt{\text{eigenvalues of }AA^T}$ — never the eigenvalues themselves, since the square root is
always required); state that singular values GENERALIZE eigenvalues to NON-SQUARE matrices (never
limited to square matrices like eigenvalues are); and identify $\sigma_1$ as the operator 2-norm
$\|A\|$ — the SINGLE LARGEST singular value alone (never an average or sum of all singular
values).

## Core Understanding
SINGULAR VALUES ARE THE SQUARE ROOTS OF $A^TA$'S EIGENVALUES — NEVER THE EIGENVALUES THEMSELVES:
for $A=\begin{pmatrix}3&0\\0&4\end{pmatrix}$: $A^TA=\begin{pmatrix}9&0\\0&16\end{pmatrix}$
(eigenvalues 9, 16), giving singular values $\sigma_1=\sqrt{16}=4$, $\sigma_2=\sqrt9=3$ (sorted
DECREASING). Reporting 9 and 16 directly as the singular values (forgetting the square root) is
wrong — the singular values are specifically the SQUARE ROOTS of $A^TA$'s eigenvalues, a genuinely
different set of numbers.

SINGULAR VALUES EXIST FOR EVERY MATRIX — GENERALIZING EIGENVALUES BEYOND SQUARE MATRICES: for a
$3\times2$ matrix $A$ (non-square, so EIGENVALUES aren't even DEFINED for $A$ itself): $A^TA$ is a
$2\times2$ SYMMETRIC matrix with well-defined eigenvalues, giving 2 singular values. Singular
values exist for this rectangular matrix PRECISELY BECAUSE they come from the always-square,
always-symmetric $A^TA$, never from $A$ directly — making them the more universal "strength"
measure, applicable where eigenvalues simply don't apply.

$\sigma_1$ IS THE OPERATOR 2-NORM — THE LARGEST SINGULAR VALUE ALONE, NEVER AN AVERAGE OR SUM: for
$A=\begin{pmatrix}3&0\\0&4\end{pmatrix}$: the operator 2-norm $\|A\|=\sigma_1=4$ — the MAXIMUM
stretching factor over ALL unit vectors, achieved along the direction where $A$'s effect is
strongest (here, $4>3$). Assuming the operator norm is some AVERAGE ($3.5$) or SUM ($7$) of the
singular values misunderstands the question being asked: the operator norm asks "what is the
MAXIMUM possible stretching," never a blended or total measure across all directions.

## Mental Models
- **"Singular values are square roots of AᵀA's eigenvalues — never the eigenvalues directly,
  always with the square root taken."**
- **"Singular values generalize eigenvalues to any shape of matrix — they come from AᵀA, which is
  always square and symmetric, even when A isn't."**
- **"The operator norm is the single largest singular value — the maximum stretching, never an
  average or sum across all modes."**

## Why Students Fail

### MC-1: SINGULAR-VALUES-REPORTED-AS-A-TRANSPOSE-A-EIGENVALUES-WITHOUT-SQUARE-ROOT
- **Surface form**: reports $A^TA$'s eigenvalues directly as the singular values, skipping the
  required square root step.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the direct connection
  to $A^TA$'s eigenvalues invites skipping the extra square-root step).
- **Repair**: re-derive from the SVD relation $A^TA=V\Sigma^2V^T$, showing $\Sigma$'s entries are
  square roots of $A^TA$'s eigenvalues.

### MC-2: OPERATOR-NORM-COMPUTED-AS-AVERAGE-OR-SUM-OF-SINGULAR-VALUES-RATHER-THAN-THE-LARGEST
- **Surface form**: computes the operator 2-norm as an average or sum of all singular values,
  rather than recognizing it equals the single largest singular value.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "norm" can evoke a
  blended or total measure rather than specifically the maximum).
- **Repair**: re-state the operator norm's definition as the MAXIMUM stretching factor, directly
  identifying it with $\sigma_1$.

## Misconceptions

### MC-1: SINGULAR-VALUES-REPORTED-AS-A-TRANSPOSE-A-EIGENVALUES-WITHOUT-SQUARE-ROOT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: OPERATOR-NORM-COMPUTED-AS-AVERAGE-OR-SUM-OF-SINGULAR-VALUES-RATHER-THAN-THE-LARGEST
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Singular values are like a transformation's individual muscle strengths along different
  directions — the operator norm is just the strongest single muscle, never the team average."**
- **Anti-analogy**: singular values are not "eigenvalues renamed" — they're specifically the
  square roots of AᵀA's eigenvalues, and they exist even where ordinary eigenvalues don't (for
  non-square matrices).

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct square-root derivation for
  $A=\begin{pmatrix}3&0\\0&4\end{pmatrix}$'s singular values.
- **Demonstration 2 (positive case)**: the non-square $3\times2$ matrix example, showing singular
  values exist via $A^TA$ where eigenvalues of $A$ itself don't.
- **Demonstration 3 (targets MC-2)**: the operator-norm-as-largest-singular-value contrast against
  incorrect averaging/summing alternatives.

## Discovery Questions
1. "Are the singular values the same as AᵀA's eigenvalues, or their square roots?"
2. "Does a non-square matrix have eigenvalues? Does it have singular values?"
3. "Is the operator 2-norm the average of all singular values, or something else specifically?"

## Teaching Sequence
1. **Conceptual shift**: the square-root derivation, working Demonstration 1, isolating MC-1.
2. **Representation shift**: singular values existing where eigenvalues don't, working
   Demonstration 2.
3. **Contrast pair**: the operator-norm-as-largest-singular-value distinction, working
   Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct singular-value computation from given eigenvalues, a
   correct explanation of why a non-square matrix has singular values but no eigenvalues, and a
   correct operator-norm identification, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept $A^TA$'s eigenvalues reported directly as singular values without the square root.
- Never accept the operator norm computed as an average or sum of singular values.

## Voice Teaching Notes
- Say "have you taken the square root?" whenever singular values are computed from $A^TA$'s
  eigenvalues.
- Ask "is that the maximum, or some blend of all the singular values?" whenever the operator norm
  is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes singular values as square roots of given
  eigenvalues, sorted descending.
- **Rung 2 (application)**: learner correctly explains why singular values exist for a non-square
  matrix that has no eigenvalues.
- **Rung 3 (transfer)**: learner correctly identifies the operator norm as the largest singular
  value alone, and explains near-zero singular values' implication for low-rank image compression.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive from the SVD relation $A^TA=V\Sigma^2V^T$.
- If MC-2 recurs, re-state the operator norm's maximum-stretching definition.

## Memory Hooks
- "Singular values are square roots of AᵀA's eigenvalues — never skip that step."
- "Singular values exist for every matrix — eigenvalues only for square ones."
- "The operator norm is the single largest singular value — never an average or sum."

## Transfer Connections
- `math.linalg.svd` (already authored, this campaign, Batch 177): supplies the factorization
  $A=U\Sigma V^T$ whose diagonal entries this concept identifies and interprets.
- `math.linalg.eigenvalues` (already authored, certified domain): supplies the eigenvalue
  computation this concept's singular values are derived from via $A^TA$ or $AA^T$.

## Cross-Subject Connections
- Image compression: near-zero singular values indicating negligible transformation "modes,"
  enabling low-rank approximation by discarding them.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.singular-values.md`, reused by
  reference for its diagonal-matrix singular-value computation, its non-square-matrix existence
  demonstration, its operator-norm identification, and its two-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying singular-value "mode
  strength" interpretation to an image-compression low-rank-approximation scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.svd`/`math.linalg.eigenvalues`, unlocks none, cross_links none, expert/understand,
  mastery_threshold 0.8, estimated_hours 4) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 178): authored. First entry this batch. Companion batch concept:
  `math.linalg.pseudoinverse`.
