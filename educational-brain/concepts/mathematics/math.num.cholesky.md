# math.num.cholesky

## Identity
- **KG id**: `math.num.cholesky`
- **Domain**: math.num
- **Requires**: `math.linalg.cholesky`, `math.num.lu-factorization`
- **Unlocks**: none
- **Cross-links**: `math.linalg.cholesky`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
Compute $A=LL^T$ for a symmetric positive definite (SPD) matrix $A$; explain that SPD is
NECESSARY for the factorization to succeed — a symmetric-but-indefinite matrix produces a
negative value under a square root; recognize Cholesky costs $\approx\frac13n^3$ flops, HALF of
LU's $\frac23n^3$, NEVER the same cost; and recognize positive definiteness is about the
QUADRATIC FORM $x^TAx>0$, NEVER about individual entries being positive.

## Core Understanding
SPD IS NECESSARY FOR CHOLESKY TO SUCCEED — NEVER JUST SYMMETRY ALONE: $A=[[1,2],[2,1]]$ is
symmetric but has eigenvalues $3$ and $-1$ (NOT SPD). Attempting Cholesky: $L_{11}=1$,
$L_{21}=2/1=2$, $L_{22}=\sqrt{1-4}=\sqrt{-3}$ — FAILS. The diagonal entry $L_{jj}=\sqrt{a_{jj}-
\sum_{k<j}L_{jk}^2}$ requires a NONNEGATIVE argument; if $A$ has a negative eigenvalue, at some
step this expression becomes negative and no real square root exists. Applying Cholesky to a
symmetric-but-indefinite matrix and expecting success is WRONG — symmetry ALONE is NEVER
sufficient; positive definiteness is an independent, equally necessary condition.

CHOLESKY COSTS HALF OF LU — NEVER THE SAME COST AS LU APPLIED TO A SYMMETRIC MATRIX: LU computes
BOTH $L$ and $U$ separately ($\approx\frac23n^3$ flops total). Cholesky exploits $A=LL^T$: since
$U=L^T$ is EXACTLY the transpose of $L$, only $L$ needs computing — HALF the entries, giving
$\approx\frac13n^3$ flops (and half the memory, $n(n+1)/2$ versus $n^2$). Believing Cholesky is
"just LU applied to a symmetric matrix" with the SAME cost misses that Cholesky is a
fundamentally different algorithm computing only ONE factor and deriving the other for free — the
cost saving is real and substantial, never negligible.

POSITIVE DEFINITE MEANS $x^TAx>0$ FOR ALL $x\ne0$ — NEVER THAT ALL ENTRIES ARE POSITIVE: for
$A=[[2,-3],[-3,5]]$ (containing a NEGATIVE off-diagonal entry): attempting Cholesky:
$L_{11}=\sqrt2\approx1.414$, $L_{21}=-3/\sqrt2\approx-2.121$, $L_{22}=\sqrt{5-(-2.121)^2}=
\sqrt{0.5}\approx0.707$ — ALL steps SUCCEED, so $A$ IS positive definite (confirmed: eigenvalues
$\approx6.85,0.15$, both positive). Believing a matrix is SPD only if ALL its entries are positive
confuses positive ENTRIES with positive EIGENVALUES — the negative off-diagonal entry does NOT
prevent positive definiteness when the overall quadratic form stays positive; the actual
definition is about the quadratic form, never about the sign of individual entries.

## Mental Models
- **"Cholesky's diagonal square root is a built-in SPD detector — a negative argument means the
  matrix was never positive definite to begin with."**
- **"Cholesky computes half the work of LU because L^T comes for free — never the same cost as
  computing both L and U separately."**
- **"Positive definite describes the whole quadratic form x^TAx, never the individual entries —
  negative off-diagonal entries can coexist with a genuinely positive-definite matrix."**

## Why Students Fail

### MC-1: CHOLESKY-WORKS-FOR-ANY-SYMMETRIC
- **Surface form**: applies Cholesky to a symmetric but indefinite matrix (negative eigenvalues)
  and does not understand why it fails — encounters a negative number under a square root.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — symmetry is necessary,
  positive-definiteness is also necessary but harder to visualize; students remember "symmetric"
  and forget "positive definite").
- **Repair**: re-walk the $A=[[1,2],[2,1]]$ counter-example, confirming the square-root failure at
  $L_{22}$.

### MC-2: CHOLESKY-IS-LU-WITH-SYMMETRY
- **Surface form**: does not understand why Cholesky costs half of LU; believes Cholesky is just
  LU applied to a symmetric matrix with the same cost.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — Cholesky is
  introduced as a special case of LU for symmetric matrices, correct, but the cost saving from
  exploiting symmetry is often not emphasized numerically).
- **Repair**: re-count the flop and memory costs explicitly, confirming $\frac13n^3$ versus
  $\frac23n^3$.

### MC-3: POSITIVE-DEFINITE-MEANS-ALL-POSITIVE-ENTRIES
- **Surface form**: believes a matrix is SPD if all its entries are positive — confuses positive
  entries with positive eigenvalues.
- **Birth type**: language contamination (Blueprint's own declared birth type — "positive" in
  "positive definite" sounds like it describes the entries; the actual definition $x^TAx>0$ is
  more abstract).
- **Repair**: re-attempt Cholesky on $A=[[2,-3],[-3,5]]$, confirming success despite the negative
  entry, and re-verify via eigenvalues.

## Misconceptions

### MC-1: CHOLESKY-WORKS-FOR-ANY-SYMMETRIC
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: CHOLESKY-IS-LU-WITH-SYMMETRY
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: POSITIVE-DEFINITE-MEANS-ALL-POSITIVE-ENTRIES
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Cholesky's square-root step is a built-in lie detector for SPD — a negative reading under
  the root means the claim of positive definiteness was false."**
- **Anti-analogy**: a matrix with a negative entry isn't automatically "not positive definite" —
  like a tug-of-war with unequal individual pulls that still nets a positive overall force, the
  quadratic form can stay positive despite negative cross terms.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $A=[[1,2],[2,1]]$ Cholesky-failure counter-example.
- **Demonstration 2 (targets MC-2)**: the $\frac13n^3$-versus-$\frac23n^3$ flop-count and
  memory-savings comparison.
- **Demonstration 3 (targets MC-3)**: the $A=[[2,-3],[-3,5]]$ negative-entry-but-SPD verification.

## Discovery Questions
1. "Does Cholesky succeed for every symmetric matrix, or only for symmetric positive definite
   ones?"
2. "Does Cholesky cost the same as LU, or does exploiting symmetry save real work?"
3. "Does a negative entry in a matrix rule out positive definiteness?"

## Teaching Sequence
1. **Representation shift**: the four-representation Cholesky derivation (matching entries, why
   SPD is needed, cost comparison, SPD test), working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the cost-and-stability gallery, working Demonstration 2, isolating MC-2.
3. **Misconception detector**: the SPD-test gate question, working Demonstration 3, isolating
   MC-3.
4. **Mastery gate**: require a correct Cholesky factorization, a correct flop-count comparison
   against LU, and a correct SPD determination for a matrix with a negative entry, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept Cholesky attempted on a matrix without first noting SPD is required (not just
  symmetry).
- Never accept Cholesky described as costing the same as LU.
- Never accept a matrix judged non-SPD solely because it contains a negative entry.

## Voice Teaching Notes
- Say "is this matrix just symmetric, or genuinely positive definite too?" whenever Cholesky is
  applied.
- Ask "does a negative entry actually rule out positive definiteness, or do you need to check the
  quadratic form?" whenever SPD is being assessed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Cholesky factorization for a given SPD
  matrix.
- **Rung 2 (application)**: learner correctly counts Cholesky's flop cost and compares it to LU's.
- **Rung 3 (transfer)**: learner correctly derives the LDLT factorization from Cholesky and
  explains when it is preferred for symmetric indefinite systems.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the symmetric-but-indefinite counter-example.
- If MC-2 recurs, re-count the flop and memory costs explicitly.
- If MC-3 recurs, re-attempt Cholesky on the negative-entry example and re-verify via eigenvalues.

## Memory Hooks
- "Cholesky needs SPD, not just symmetric — a negative square root argument proves it."
- "Cholesky is ⅓n³ — half of LU's ⅔n³, never the same."
- "Positive definite is about x^TAx, never about individual entries' signs."

## Transfer Connections
- `math.linalg.cholesky` (already authored, certified domain; cross-link): supplies the general
  Cholesky factorization theory this concept applies with explicit numerical cost and stability
  analysis.
- `math.num.lu-factorization` (already authored, this campaign, Batch 218): supplies the general
  LU framework this concept's cost comparison and pivoting-free stability claim directly build
  on.

## Cross-Subject Connections
- Gaussian process regression: solving $(K+\sigma^2I)x=y$ for an SPD kernel matrix via Cholesky,
  and computing the log-determinant as a free byproduct, is a standard machine learning
  application.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.cholesky.md`, reused by reference for
  its four-representation Cholesky derivation, its cost-and-stability gallery, its SPD-test gate
  question, and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.linalg.cholesky`) on deriving
  the LDLT factorization and Bunch-Kaufman pivoting for symmetric indefinite matrices.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.cholesky`/`math.num.lu-factorization`, unlocks none, cross_links
  `math.linalg.cholesky`, proficient/apply, mastery_threshold 0.8, estimated_hours 3) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 219): authored. First entry this batch. Companion batch concept:
  `math.num.euler-method`.
