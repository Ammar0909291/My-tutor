# Teaching Blueprint: Covariance Matrix (`math.stats.covariance-matrix`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.covariance-matrix` |
| name | Covariance Matrix |
| domain | Statistics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.prob.covariance`, `math.linalg.matrix` |
| unlocks | none |
| cross_links | `math.linalg.positive-definite` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | C (Concrete) — a two-variable variance/covariance table, before the matrix packaging |
| description (KG) | Σᵢⱼ = Cov(Xᵢ,Xⱼ). Symmetric positive semidefinite matrix. Diagonal: Σᵢᵢ = Var(Xᵢ). Generalization of variance to multivariate random vectors. Key in multivariate normal distribution. |

## Component 1 — Learning Objectives

- LO1: Construct the covariance matrix $\Sigma$ for a random vector $(X_1,\dots,X_n)$: $\Sigma_{ij}=\mathrm{Cov}(X_i,X_j)$, directly reusing `math.prob.covariance`'s own definition — and recognize the DIAGONAL entries $\Sigma_{ii}=\mathrm{Cov}(X_i,X_i)=\mathrm{Var}(X_i)$ as a SPECIAL CASE of the same covariance formula (covariance of a variable with itself), not a separately-defined quantity.
- LO2: Verify $\Sigma$ is SYMMETRIC ($\Sigma_{ij}=\Sigma_{ji}$, directly from $\mathrm{Cov}(X_i,X_j)=\mathrm{Cov}(X_j,X_i)$'s own commutativity) and construct a small covariance matrix explicitly from given variance/covariance values.
- LO3 (cross-link probe, engaging `math.linalg.positive-definite`): recognize $\Sigma$ is always POSITIVE SEMIDEFINITE — by showing $v^T\Sigma v=\mathrm{Var}(v^TX)\ge0$ for any vector $v$ (since it is literally a variance, and variance is never negative) — a genuinely DERIVED fact, not a coincidental extra property to separately assume.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.covariance` ($\mathrm{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)]$ and its commutativity) and `math.linalg.matrix` (matrix entries, symmetry, and quadratic forms $v^TAv$).

## Component 3 — Core Explanation

**Constructing $\Sigma$, with the diagonal as a special case**: for a random vector $(X_1,\dots,X_n)$, the covariance matrix has entries $\Sigma_{ij}=\mathrm{Cov}(X_i,X_j)$ — directly `math.prob.covariance`'s own definition, applied to every PAIR of components. The diagonal entries, $\Sigma_{ii}=\mathrm{Cov}(X_i,X_i)$, are not a separately-invented "variance formula" plugged in as an afterthought — they are literally the SAME covariance formula applied to a variable with itself, and $\mathrm{Cov}(X_i,X_i)=E[(X_i-\mu_i)^2]=\mathrm{Var}(X_i)$ follows immediately.

**Symmetry as an automatic consequence, not an assumption**: $\Sigma_{ij}=\Sigma_{ji}$ because $\mathrm{Cov}(X_i,X_j)=E[(X_i-\mu_i)(X_j-\mu_j)]=E[(X_j-\mu_j)(X_i-\mu_i)]=\mathrm{Cov}(X_j,X_i)$ — ordinary multiplication commutes, so covariance's own definition is symmetric in its two arguments. $\Sigma$'s symmetry is therefore forced by covariance's definition, not an extra structural assumption imposed on top.

**Positive semidefiniteness, derived from variance's own nonnegativity**: for any vector $v=(v_1,\dots,v_n)$, the quadratic form $v^T\Sigma v$ can be shown (by direct algebraic expansion) to equal $\mathrm{Var}(v^TX)=\mathrm{Var}(v_1X_1+\cdots+v_nX_n)$ — the variance of the LINEAR COMBINATION of the $X_i$'s weighted by $v$. Since variance is never negative for ANY random variable, $v^T\Sigma v\ge0$ for every $v$ — which is exactly `math.linalg.positive-definite`'s own $v^TAv\ge0$ characterization of positive SEMIdefiniteness. This is a genuinely DERIVED consequence of covariance's own properties, true for EVERY covariance matrix, never an extra property that must be separately checked or assumed.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing Σ, diagonal unified with the covariance formula, breaking MC-1)**: for a random vector $(X,Y)$ with $\mathrm{Var}(X)=4$, $\mathrm{Var}(Y)=9$, $\mathrm{Cov}(X,Y)=2$: $\Sigma=\begin{pmatrix}4&2\\2&9\end{pmatrix}$. The diagonal entries $4$ and $9$ are $\Sigma_{11}=\mathrm{Cov}(X,X)=\mathrm{Var}(X)$ and $\Sigma_{22}=\mathrm{Cov}(Y,Y)=\mathrm{Var}(Y)$ — directly the SAME covariance formula, with both arguments equal to the same variable, not a separately-invented rule for the diagonal.

**Example 2 (LO2 — symmetry verified directly from the definition, breaking MC-2)**: using the same $\Sigma=\begin{pmatrix}4&2\\2&9\end{pmatrix}$, check $\Sigma_{12}=\mathrm{Cov}(X,Y)=2$ and $\Sigma_{21}=\mathrm{Cov}(Y,X)=2$ — genuinely EQUAL, because $\mathrm{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)]=E[(Y-\mu_Y)(X-\mu_X)]=\mathrm{Cov}(Y,X)$ (ordinary multiplication commutes). $\Sigma$'s symmetry is therefore an automatic CONSEQUENCE of covariance's own commutative definition, not an extra assumption imposed on the matrix.

**Example 3 (LO3 — cross-link probe, positive semidefiniteness derived directly, breaking MC-3)**: for the same $\Sigma=\begin{pmatrix}4&2\\2&9\end{pmatrix}$ and any $v=(v_1,v_2)$: $v^T\Sigma v=4v_1^2+2v_1v_2+2v_2v_1+9v_2^2=4v_1^2+4v_1v_2+9v_2^2=\mathrm{Var}(v_1X+v_2Y)$ — a direct algebraic identity linking the quadratic form to the variance of a linear combination. Since variance is NEVER negative for any random variable, $v^T\Sigma v=\mathrm{Var}(v_1X+v_2Y)\ge0$ for EVERY vector $v$ — confirming, via `math.linalg.positive-definite`'s own $v^TAv\ge0$ characterization, that $\Sigma$ is positive SEMIdefinite. This is a genuinely DERIVED fact from covariance's own nonnegative-variance property, not an independent structural assumption that must be separately verified.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Diagonal Is the Same Formula, Not a Separate Rule (Primitive P11: Representation Shift)

State: "you don't need a separate 'variance formula' for the diagonal — it's the exact same covariance formula, just with both arguments being the same variable." Work Example 1's direct construction, explicitly identifying $\Sigma_{ii}=\mathrm{Cov}(X_i,X_i)$.

- **MC-1 hook**: ask "does the diagonal of a covariance matrix require its own separate variance formula, disconnected from the covariance formula used off the diagonal?" — a "yes" answer reveals MC-1 (missing that $\mathrm{Var}(X_i)=\mathrm{Cov}(X_i,X_i)$ is literally the same formula).

### Teaching Action A02 — Symmetry Is Forced by Covariance's Own Definition (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\mathrm{Cov}(X,Y)=\mathrm{Cov}(Y,X)$ follows immediately from ordinary multiplication commuting inside the expectation — no extra assumption required. State: "$\Sigma$'s symmetry isn't a convention someone imposed — it's an unavoidable consequence of covariance's own commutative definition."

- **MC-2 hook**: ask "is Σ's symmetry an extra assumption or convention, separate from the definition of covariance itself?" — a "yes" answer reveals MC-2 (missing that symmetry is forced automatically by covariance's own commutativity).

### Teaching Action A03 — Positive Semidefiniteness Is Derived, Not a Separate Property to Check (Primitive P06: Contrast Pair)

Contrast treating positive semidefiniteness as a special extra property some covariance matrices might lack against Example 3's direct derivation that $v^T\Sigma v=\mathrm{Var}(\text{linear combination})\ge0$ ALWAYS. State: "every genuine covariance matrix is automatically positive semidefinite — it's not something you check separately, it falls directly out of the fact that variance itself is never negative."

- **MC-3 hook**: ask "is positive semidefiniteness a special extra property that must be separately verified for a matrix to qualify as a genuine covariance matrix?" — a "yes" answer reveals MC-3 (missing that it is an automatic, derivable consequence for EVERY covariance matrix).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a random vector $(X,Y)$ with $\mathrm{Var}(X)=5$, $\mathrm{Var}(Y)=2$, $\mathrm{Cov}(X,Y)=-1$, construct the full covariance matrix $\Sigma$.
  2. Verify directly that your $\Sigma$ from problem 1 is symmetric, explaining why this must always be true for any covariance matrix.
  3. For your $\Sigma$ from problem 1, compute $v^T\Sigma v$ for $v=(1,1)$, and identify which random variable's variance this quantity represents.
  4. Explain why every genuine covariance matrix must be positive semidefinite, referencing the connection between the quadratic form $v^T\Sigma v$ and the variance of a linear combination.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.linalg.positive-definite`)**: "A financial analyst models the returns of two stocks as a random vector $(R_1,R_2)$ with $\mathrm{Var}(R_1)=0.04$, $\mathrm{Var}(R_2)=0.09$, $\mathrm{Cov}(R_1,R_2)=0.03$. (a) Construct the covariance matrix $\Sigma$ for this random vector. (b) Using `math.linalg.positive-definite`'s eigenvalue test (or the determinant/trace shortcut for $2\times2$ matrices), determine whether $\Sigma$ is positive definite or merely positive semidefinite. (c) A portfolio holds $v_1$ shares of stock 1 and $v_2$ shares of stock 2; explain why $v^T\Sigma v$ represents the VARIANCE of the portfolio's total return, and why this quantity can never be negative, referencing this lesson's derivation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIAGONAL-TREATED-AS-SEPARATE-FORMULA | Believing the diagonal entries of a covariance matrix require their own separate variance formula, missing that $\mathrm{Var}(X_i)=\mathrm{Cov}(X_i,X_i)$ is literally the same covariance formula | Foundational |
| MC-2 | SYMMETRY-TREATED-AS-EXTRA-ASSUMPTION | Believing Σ's symmetry is an extra convention imposed on the matrix, missing that it is forced automatically by covariance's own commutative definition | High |
| MC-3 | PSD-TREATED-AS-SEPARATE-PROPERTY-TO-CHECK | Believing positive semidefiniteness is a special extra property some covariance matrices might lack, missing that it is a derivable, automatic consequence of variance's own nonnegativity for EVERY covariance matrix | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Diagonal Treated as Separate Formula") → P41 (detect: ask whether the diagonal of Σ requires its own separate variance formula) → P64 (conceptual shift: re-walk Example 1's direct construction, re-anchoring on "the diagonal is the same covariance formula applied to a variable with itself").
- **B02 (targets MC-2)**: P27 (name it: "Symmetry Treated as Extra Assumption") → P41 (detect: ask whether Σ's symmetry is a separate convention from covariance's own definition) → P64 (conceptual shift: re-walk Example 2's commutativity argument, re-anchoring on "symmetry is forced automatically by covariance's own definition").
- **B03 (targets MC-3)**: P27 (name it: "PSD Treated as Separate Property to Check") → P41 (detect: ask whether positive semidefiniteness is a special extra property to separately verify) → P64 (conceptual shift: re-walk Example 3's derivation, re-anchoring on "PSD falls directly out of variance's own nonnegativity, for every covariance matrix").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.covariance` ($\mathrm{Cov}(X,Y)$'s definition and commutativity, which this concept's entire matrix construction directly reuses) and `math.linalg.matrix` (matrix entries, symmetry, and the quadratic form $v^TAv$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.linalg.positive-definite`, verified authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, directly applying that concept's own $v^TAv\ge0$ characterization to derive (not merely assert) that every covariance matrix is positive semidefinite.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier at a compact depth, with LO1 and LO2 at full computational depth (a genuine matrix construction and a direct symmetry derivation) and LO3 built as a cross-link probe against the single authored cross-subject target, consistent with this corpus's established single-cross-link-probe pattern.
- **Division of labor**: `math.prob.covariance` owns the covariance definition and its commutativity; `math.linalg.matrix` owns matrices and quadratic forms generally; `math.linalg.positive-definite` owns the $v^TAv\ge0$ characterization. This concept owns the SPECIALIZATION unifying all three into the covariance matrix's own structural facts, deliberately deriving (not asserting) both symmetry and positive semidefiniteness directly from covariance's own properties, since treating either as an independent axiom would obscure why they must hold.
- All three worked examples deliberately reuse the SAME $\Sigma=\begin{pmatrix}4&2\\2&9\end{pmatrix}$ throughout, so construction (LO1), symmetry (LO2), and positive semidefiniteness (LO3) read as three facts about one concrete, fully-verified object rather than three unrelated demonstrations.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.positive-definite` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a two-variable variance/covariance table, before the matrix packaging) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
