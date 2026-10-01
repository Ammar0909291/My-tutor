# math.stats.covariance-matrix

## Identity
- **KG id**: `math.stats.covariance-matrix`
- **Domain**: math.stats
- **Requires**: `math.prob.covariance`, `math.linalg.matrix`
- **Unlocks**: none
- **Cross-links**: `math.linalg.positive-definite`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Construct $\Sigma_{ij}=\text{Cov}(X_i,X_j)$, recognizing the diagonal $\Sigma_{ii}=\text{Var}
(X_i)$ as the SAME covariance formula applied to a variable with itself — NEVER a separately
invented rule; verify $\Sigma$ is symmetric as an AUTOMATIC consequence of covariance's own
commutativity — NEVER an extra imposed assumption; and recognize $\Sigma$ is ALWAYS positive
semidefinite, DERIVED from variance's own nonnegativity via $v^T\Sigma v=\text{Var}(v^TX)\ge0$ —
NEVER a separate property requiring independent verification.

## Core Understanding
THE DIAGONAL IS THE SAME COVARIANCE FORMULA — NEVER A SEPARATE VARIANCE RULE: for $(X,Y)$ with
$\text{Var}(X)=4$, $\text{Var}(Y)=9$, $\text{Cov}(X,Y)=2$: $\Sigma=\begin{pmatrix}4&2\\2&
9\end{pmatrix}$. The diagonal entries $4$ and $9$ are $\Sigma_{11}=\text{Cov}(X,X)=\text{Var}(X)$
and $\Sigma_{22}=\text{Cov}(Y,Y)=\text{Var}(Y)$ — directly the SAME covariance formula, with both
arguments equal to the same variable. Believing the diagonal requires its own separate,
disconnected variance formula misses that $\text{Var}(X_i)=\text{Cov}(X_i,X_i)$ is LITERALLY the
same formula, never a distinct rule.

SYMMETRY IS FORCED BY COVARIANCE'S OWN DEFINITION — NEVER AN EXTRA ASSUMPTION IMPOSED ON THE
MATRIX: for the same $\Sigma$: $\Sigma_{12}=\text{Cov}(X,Y)=2$ and $\Sigma_{21}=\text{Cov}(Y,X)=2$
— genuinely EQUAL, because $\text{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)]=E[(Y-\mu_Y)(X-\mu_X)]=
\text{Cov}(Y,X)$ (ordinary multiplication COMMUTES). $\Sigma$'s symmetry is therefore an AUTOMATIC
consequence of covariance's own commutative definition — never a convention someone imposed
separately on top.

POSITIVE SEMIDEFINITENESS IS DERIVED FROM VARIANCE'S OWN NONNEGATIVITY — NEVER A SEPARATE PROPERTY
TO CHECK: for the same $\Sigma$ and any $v=(v_1,v_2)$: $v^T\Sigma v=4v_1^2+4v_1v_2+9v_2^2=
\text{Var}(v_1X+v_2Y)$ — a direct algebraic identity linking the quadratic form to the variance of
a LINEAR COMBINATION. Since variance is NEVER negative for any random variable, $v^T\Sigma v\ge0$
for EVERY vector $v$ — confirming, via `math.linalg.positive-definite`'s own $v^TAv\ge0$
characterization, that $\Sigma$ is positive SEMIdefinite. This holds for EVERY genuine covariance
matrix automatically — never a special extra property some covariance matrices might lack.

## Mental Models
- **"The diagonal is covariance of a variable with itself — never a separate formula bolted on."**
- **"Symmetry isn't a rule we impose on Σ — it falls straight out of covariance's own
  commutativity."**
- **"Positive semidefiniteness isn't something to check — it's guaranteed, because v^TΣv is
  literally a variance, and variance is never negative."**

## Why Students Fail

### MC-1: DIAGONAL-TREATED-AS-SEPARATE-FORMULA
- **Surface form**: believes the diagonal entries of a covariance matrix require their own
  separate variance formula, missing that $\text{Var}(X_i)=\text{Cov}(X_i,X_i)$ is literally the
  same covariance formula.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the direct construction, re-anchoring on "the diagonal is the same
  covariance formula applied to a variable with itself."

### MC-2: SYMMETRY-TREATED-AS-EXTRA-ASSUMPTION
- **Surface form**: believes $\Sigma$'s symmetry is an extra convention imposed on the matrix,
  missing that it is forced automatically by covariance's own commutative definition.
- **Birth type**: High severity (Blueprint's own declared severity).
- **Repair**: re-walk the commutativity argument, re-anchoring on "symmetry is forced
  automatically by covariance's own definition."

### MC-3: PSD-TREATED-AS-SEPARATE-PROPERTY-TO-CHECK
- **Surface form**: believes positive semidefiniteness is a special extra property some
  covariance matrices might lack, missing that it is a derivable, automatic consequence of
  variance's own nonnegativity for EVERY covariance matrix.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-walk the derivation, re-anchoring on "PSD falls directly out of variance's own
  nonnegativity, for every covariance matrix."

## Misconceptions

### MC-1: DIAGONAL-TREATED-AS-SEPARATE-FORMULA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SYMMETRY-TREATED-AS-EXTRA-ASSUMPTION
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: PSD-TREATED-AS-SEPARATE-PROPERTY-TO-CHECK
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The covariance matrix's diagonal isn't a different ingredient — it's the same covariance
  recipe, just cooked with the same variable on both sides."**
- **Anti-analogy**: checking a covariance matrix for positive semidefiniteness "just in case" is
  like checking whether water is wet — it's guaranteed by what a covariance matrix inherently IS,
  never an independent property that could fail.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\Sigma=\begin{pmatrix}4&2\\2&9\end{pmatrix}$
  construction, identifying the diagonal as $\text{Cov}(X_i,X_i)$.
- **Demonstration 2 (targets MC-2)**: the $\text{Cov}(X,Y)=\text{Cov}(Y,X)$ commutativity
  verification.
- **Demonstration 3 (targets MC-3)**: the $v^T\Sigma v=\text{Var}(v_1X+v_2Y)\ge0$ derivation.

## Discovery Questions
1. "Does the diagonal of a covariance matrix need its own separate variance formula, or is it the
   same covariance formula?"
2. "Is Σ's symmetry an extra assumption, or does it follow automatically from covariance's
   definition?"
3. "Is positive semidefiniteness a special property some covariance matrices might lack, or is it
   guaranteed for every one?"

## Teaching Sequence
1. **Representation shift**: the diagonal-as-same-formula construction, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the automatic-symmetry derivation, working Demonstration 2, isolating
   MC-2.
3. **Contrast pair**: the derived-versus-assumed positive-semidefiniteness distinction, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct covariance matrix construction, a correct symmetry
   justification, and a correct positive-semidefiniteness derivation via the quadratic form, at
   the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the diagonal treated as requiring a separate variance formula.
- Never accept Σ's symmetry presented as an assumption rather than a derived consequence.
- Never accept positive semidefiniteness treated as a property requiring separate verification.

## Voice Teaching Notes
- Say "is that a different formula, or the same covariance formula with both arguments equal?"
  whenever the diagonal is being constructed.
- Ask "does that quadratic form remind you of a variance you already know is never negative?"
  whenever positive semidefiniteness is being assessed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a covariance matrix from given
  variance/covariance values.
- **Rung 2 (application)**: learner correctly verifies symmetry directly from covariance's
  commutativity.
- **Rung 3 (transfer)**: learner correctly derives that a portfolio's variance $v^T\Sigma v$ is
  nonnegative using this concept's quadratic-form argument, in a financial-modeling scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct construction identifying the diagonal as self-covariance.
- If MC-2 recurs, re-walk the commutativity argument.
- If MC-3 recurs, re-walk the quadratic-form-as-variance derivation.

## Memory Hooks
- "Diagonal = covariance of a variable with itself — never a separate formula."
- "Symmetry is automatic — covariance already commutes."
- "v^TΣv is a variance — never negative, never separately checked."

## Transfer Connections
- `math.prob.covariance` (already authored, certified domain): supplies the covariance
  definition and commutativity this concept's entire matrix construction directly reuses.
- `math.linalg.matrix` (already authored, certified domain): supplies matrix entries, symmetry,
  and the quadratic form $v^TAv$.
- `math.linalg.positive-definite` (cross-link; already authored): supplies the $v^TAv\ge0$
  characterization this concept derives the covariance matrix's positive semidefiniteness through.

## Cross-Subject Connections
- Portfolio finance: a covariance matrix of stock returns models the variance of any weighted
  portfolio combination directly via the quadratic form $v^T\Sigma v$, guaranteed nonnegative.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.covariance-matrix.md`, reused by
  reference for its unified $\Sigma=\begin{pmatrix}4&2\\2&9\end{pmatrix}$ construction across all
  three learning objectives, its commutativity-based symmetry derivation, its
  quadratic-form-as-variance positive-semidefiniteness derivation, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.linalg.positive-definite`) on
  a financial analyst's two-stock covariance matrix, testing positive definiteness and
  interpreting portfolio variance.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.covariance`/`math.linalg.matrix`, unlocks none, cross_links
  `math.linalg.positive-definite`, expert/apply, mastery_threshold 0.8, estimated_hours 4) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 210): authored. Second entry this batch. Companion batch concept:
  `math.stats.chi-squared-test`.
