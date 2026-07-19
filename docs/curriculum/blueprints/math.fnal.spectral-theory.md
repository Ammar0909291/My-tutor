# Teaching Blueprint: Spectral Theory (`math.fnal.spectral-theory`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.spectral-theory` |
| name | Spectral Theory |
| domain | Functional Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.fnal.bounded-operator`, `math.fnal.hilbert-space` |
| unlocks | `math.fnal.compact-operator-spectrum` |
| cross_links | `math.linalg.eigenvalues`, `math.linalg.spectral-theorem` |
| CPA_entry_stage | A (Abstract) — research-tier learner already fluent in both prerequisites and both cross-linked finite-dimensional concepts; the spectrum is introduced directly as their infinite-dimensional generalization |
| description (KG) | Spectrum σ(T) = {λ : T−λI not invertible}. Resolvent ρ(T) = ℂ\σ(T). For self-adjoint operators: σ(T)⊆ℝ. Spectral theorem: every normal operator on Hilbert space diagonalizes via a spectral measure. Generalizes matrix diagonalization to infinite dimensions. |

## Component 1 — Learning Objectives

- LO1: Define the **spectrum** $\sigma(T) = \{\lambda\in\mathbb{C} : T-\lambda I \text{ is not invertible (with bounded inverse)}\}$ and the **resolvent set** $\rho(T)=\mathbb{C}\setminus\sigma(T)$ for a bounded operator $T$ on a Hilbert space — directly generalizing `math.linalg.eigenvalues`' finite-dimensional definition ($\lambda$ an eigenvalue iff $A-\lambda I$ is singular iff $\det(A-\lambda I)=0$) to infinite dimensions, where determinants no longer exist and "not invertible" must replace "$\det=0$" as the defining condition — and recognize that, unlike in finite dimensions, a point of $\sigma(T)$ need **not** be an actual eigenvalue (an eigenvector for that $\lambda$ need not exist at all).
- LO2: State that for **self-adjoint** bounded operators, $\sigma(T)\subseteq\mathbb{R}$ — directly generalizing `math.linalg.spectral-theorem`'s finding that real symmetric matrices have real eigenvalues — and recognize that this infinite-dimensional fact is verified through operator-theoretic invertibility arguments, NOT by finding roots of a characteristic polynomial (which does not exist for a general infinite-dimensional operator).
- LO3 (orientation level — full spectral-measure construction beyond this corpus's current scope): state the general **Spectral Theorem** — every normal (in particular self-adjoint) bounded operator on a Hilbert space "diagonalizes" via a **spectral measure**, a genuinely more general object than `math.linalg.spectral-theorem`'s finite sum $A=Q\Lambda Q^T$ — and recognize that a spectral measure can represent a **continuous** spectrum (uncountably many spectral values with no discrete eigenvector basis at all), not merely "the same finite construction with more terms."

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.bounded-operator` ($\|T\|=\sup_{\|x\|\le1}\|Tx\|<\infty$; bounded iff continuous for linear maps; $B(X,Y)$ as a normed, often Banach, space) and `math.fnal.hilbert-space` (a complete inner product space; the Projection Theorem at orientation level; Hilbert $\Rightarrow$ Banach but not conversely).

## Component 3 — Core Explanation

**From determinants to invertibility — the spectrum as the infinite-dimensional generalization of eigenvalues**: `math.linalg.eigenvalues` found eigenvalues by solving $\det(A-\lambda I)=0$, exploiting the fact that a finite-dimensional linear map is singular (has a nontrivial kernel) exactly when its determinant vanishes. In infinite dimensions, there is no determinant at all — so the spectrum is defined directly via **invertibility**: $\sigma(T) = \{\lambda\in\mathbb{C} : T-\lambda I \text{ is not invertible as a bounded operator with bounded inverse}\}$, with $\rho(T)=\mathbb{C}\setminus\sigma(T)$ (the **resolvent set**) collecting every $\lambda$ for which $(T-\lambda I)^{-1}$ exists and is itself bounded. In finite dimensions, "not invertible" and "has a nontrivial kernel (an eigenvector)" are the SAME condition (by rank-nullity, a square matrix is either bijective or has a nonzero kernel — no other option). In infinite dimensions, this equivalence **breaks**: $T-\lambda I$ can fail to be invertible for reasons that have nothing to do with an actual eigenvector existing — it might be injective but fail to be surjective, or fail to have a *bounded* inverse even where an unbounded algebraic inverse exists. So $\sigma(T)$ can genuinely contain points that are not eigenvalues at all.

**Self-adjoint operators still have real spectrum — but proven differently**: `math.linalg.spectral-theorem` established that a real symmetric matrix has only real eigenvalues, verified (implicitly, via the characteristic polynomial machinery `math.linalg.eigenvalues` built) using finite-dimensional linear algebra. The infinite-dimensional analog — a self-adjoint bounded operator $T$ (satisfying $\langle Tx,y\rangle=\langle x,Ty\rangle$ for all $x,y$) has $\sigma(T)\subseteq\mathbb{R}$ — is STILL true, but is proven through genuinely different, operator-theoretic means (showing $T-\lambda I$ is invertible directly whenever $\lambda$ has nonzero imaginary part, using the self-adjointness relation and boundedness estimates), since there is no characteristic polynomial whose roots could be examined.

**The Spectral Theorem: a measure replaces a finite sum**: `math.linalg.spectral-theorem` packaged a symmetric matrix's diagonalization as the FINITE factorization $A=Q\Lambda Q^T$ — a finite sum (in fact, a finite list) of eigenvalue/eigenvector pairs. The general Spectral Theorem states that every **normal** operator (a class including all self-adjoint operators) on a Hilbert space similarly "diagonalizes," but via a **spectral measure** — an assignment of an orthogonal projection to each (Borel) subset of $\sigma(T)$, integrated against $\lambda$ to reconstruct $T$. When $\sigma(T)$ happens to be a finite set of genuine eigenvalues, this measure reduces exactly to the familiar finite sum of eigenprojections — but when $\sigma(T)$ contains a continuous range of values with no eigenvectors at all (as LO1 already showed is possible), the spectral measure is a qualitatively richer object than any finite or even countable sum could ever be — a genuinely new kind of "diagonalization," not merely a longer version of the finite-dimensional one.

## Component 4 — Worked Examples

**Example 1 (LO1 — spectrum containing a non-eigenvalue point, breaking MC-1)**: On the Hilbert space $\ell^2(\mathbb{N})$ (square-summable sequences), define the (unilateral) **right shift operator** $S(x_1,x_2,x_3,\ldots) = (0,x_1,x_2,\ldots)$ — a bounded operator with $\|S\|=1$. Check $\lambda=0$: is $S$ invertible? $S$ is **injective** (if $Sx=0$, then $(0,x_1,x_2,\ldots)=(0,0,0,\ldots)$ forces every $x_i=0$), but $S$ is **NOT surjective** (the sequence $(1,0,0,\ldots)$ is never in the range of $S$, since every output of $S$ starts with a $0$) — so $S$ has no inverse at all, meaning $0\in\sigma(S)$. But is $0$ an actual EIGENVALUE? $Sx=0\cdot x=0$ forces $x=0$ (shown above) — there is **no nonzero eigenvector** for $\lambda=0$. So $0\in\sigma(S)$, yet $0$ is not an eigenvalue of $S$ at all — exactly the phenomenon `math.linalg.eigenvalues`' finite-dimensional world never produces.

**Example 2 (LO2 — self-adjoint, real spectrum, verified without any polynomial, breaking MC-2)**: On $L^2[0,1]$, define the **multiplication operator** $(Mf)(x) = x\cdot f(x)$. $M$ is self-adjoint ($\langle Mf,g\rangle=\int_0^1 xf(x)\overline{g(x)}\,dx = \langle f,Mg\rangle$, since $x$ is real) and bounded ($\|M\|\le1$, since $x\in[0,1]$). For $\lambda\notin[0,1]$: $M-\lambda I$ acts as multiplication by $(x-\lambda)$, which is invertible with bounded inverse (multiplication by $1/(x-\lambda)$, which stays bounded on $[0,1]$ since $\lambda$ is outside that interval). For $\lambda\in[0,1]$: $1/(x-\lambda)$ is UNBOUNDED near $x=\lambda$, so no bounded inverse exists. Hence $\sigma(M)=[0,1]$ — entirely real, confirming the self-adjoint $\Rightarrow$ real-spectrum fact, verified directly via invertibility of the multiplication map, with **no characteristic polynomial computed anywhere** in the argument.

**Example 3 (LO3 — a continuous spectrum with no eigenvectors at all, orientation level, breaking MC-3)**: Continuing with $M$ from Example 2: for any $\lambda\in[0,1]$, $Mf=\lambda f$ means $(x-\lambda)f(x)=0$ for almost every $x$ — forcing $f(x)=0$ for every $x\neq\lambda$, but a single point has ZERO measure in $L^2[0,1]$, so $f=0$ as an $L^2$ element. So $M$, exactly like Example 1's shift operator $S$, has **no eigenvectors whatsoever** — yet $\sigma(M)=[0,1]$, an entire continuous INTERVAL of spectral values. Contrast this directly with `math.linalg.spectral-theorem`'s Example 1 ($A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, a FINITE two-term decomposition using exactly the eigenvalues $1,3$ and their eigenvectors): $M$'s "diagonalization" cannot be written as any finite (or even countable) sum of eigenprojections, since there are no eigenvectors to sum over at all — the general Spectral Theorem's spectral MEASURE (here, essentially "multiplication by the coordinate itself," assigning to each subinterval of $[0,1]$ the projection onto functions supported there) is a genuinely different KIND of object, not simply a finite sum stretched out to more terms.

## Component 5 — Teaching Actions

### Teaching Action A01 — From Determinants to Invertibility (Primitive P11: Representation Shift)

State: "`math.linalg.eigenvalues` used $\det(A-\lambda I)=0$; that formula needs a determinant, which doesn't exist for a general bounded operator on an infinite-dimensional space — so the spectrum is defined directly through INVERTIBILITY of $T-\lambda I$ instead, a condition that still makes sense in any dimension." Introduce $\sigma(T)$ and $\rho(T)$ via this direct definitional generalization.

### Teaching Action A02 — A Spectral Point That Is Not an Eigenvalue (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the shift operator $S$ has $0\in\sigma(S)$ (since $S$ is not surjective), yet $0$ is not an eigenvalue (since $S$ is injective, forcing the only solution of $Sx=0$ to be $x=0$). State: "in finite dimensions, 'not invertible' and 'has an eigenvector' were the same thing — rank-nullity guaranteed it. In infinite dimensions that guarantee is gone: a spectral value can arise purely from a failure of surjectivity, with no eigenvector attached at all."

- **MC-1 hook**: ask "if $\lambda\in\sigma(T)$, does that mean $T$ must have an eigenvector for $\lambda$?" — a "yes" answer reveals MC-1 (carrying the finite-dimensional equivalence between "non-invertible" and "has an eigenvector" into infinite dimensions, where it no longer holds).

### Teaching Action A03 — Real Spectrum Without a Polynomial, and a Measure Instead of a Finite Sum (Primitive P06: Contrast Pair)

Contrast Example 2's verification that $\sigma(M)\subseteq\mathbb{R}$ (in fact $\sigma(M)=[0,1]$) — reached entirely through checking invertibility of a multiplication map, with no polynomial anywhere — against `math.linalg.spectral-theorem`'s characteristic-polynomial-based method for a finite symmetric matrix. State: "the SAME conclusion — self-adjoint means real spectrum — but reached through a completely different kind of argument, because there is no polynomial to factor here at all."

- **MC-2 hook**: ask "to check that a self-adjoint operator's spectrum is real, do I need to compute something like a characteristic polynomial, just for a bigger (infinite-dimensional) case?" — a "yes" answer reveals MC-2 (assuming the finite-dimensional proof METHOD, not just the conclusion, must generalize).

Then present Example 3's continuous-spectrum contrast: $M$ has NO eigenvectors at all, yet $\sigma(M)=[0,1]$, an entire interval — compare directly to `math.linalg.spectral-theorem`'s finite two-eigenvalue decomposition. State: "a spectral measure isn't a finite sum with more terms bolted on — when the spectrum is a genuine continuum with no eigenvectors, the 'diagonalization' has to be a fundamentally different kind of object."

- **MC-3 hook**: ask "is the general Spectral Theorem's spectral measure basically the finite-dimensional $A=Q\Lambda Q^T$ construction, just with more (or infinitely many) terms?" — a "yes" answer reveals MC-3 (missing that a continuous spectrum with no eigenvectors requires a qualitatively different object, not an extended finite sum).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why the shift operator $S$ from Example 1 has $\|S\|=1$ and why $0\in\sigma(S)$, citing specifically which invertibility condition (injectivity or surjectivity) fails.
  2. Explain why $0$ is not an eigenvalue of $S$, even though $0\in\sigma(S)$.
  3. For the multiplication operator $M$ on $L^2[0,1]$ from Example 2, explain why $\lambda=2$ is in the resolvent set $\rho(M)$ (i.e. $M-2I$ has a bounded inverse), referencing the boundedness of $1/(x-2)$ on $[0,1]$.
  4. Explain, in your own words, why the general Spectral Theorem needs a spectral MEASURE rather than a finite sum of eigenprojections, using $M$'s complete lack of eigenvectors as your example.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.eigenvalues` and `math.linalg.spectral-theorem`)**: "Recall from `math.linalg.eigenvalues` that a finite matrix's eigenvalues are found by solving $\det(A-\lambda I)=0$, and from `math.linalg.spectral-theorem` that a real symmetric matrix factors as $A=Q\Lambda Q^T$ using a FINITE, complete list of eigenvalues and orthonormal eigenvectors. (a) Explain precisely why the determinant-based method for finding eigenvalues cannot be applied to the shift operator $S$ or the multiplication operator $M$ from this lesson's examples. (b) Both $S$ and $M$ turned out to have spectral points with NO corresponding eigenvectors — explain why this could never happen for a finite symmetric (or even general) matrix, referencing rank-nullity. (c) `math.linalg.spectral-theorem`'s $Q$ was built by collecting a FINITE list of normalized eigenvectors as columns. Explain why this exact construction is impossible for the operator $M$, and what kind of object (per this lesson's LO3) would need to replace it."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SPECTRUM-POINT-ASSUMED-TO-BE-EIGENVALUE | Carrying the finite-dimensional equivalence "not invertible = has an eigenvector" into infinite dimensions, where a spectral value can arise from a failure of surjectivity alone, with no eigenvector attached | Foundational |
| MC-2 | REAL-SPECTRUM-PROOF-METHOD-ASSUMED-POLYNOMIAL-BASED | Assuming that verifying a self-adjoint operator's spectrum is real requires computing something analogous to a characteristic polynomial, missing that the infinite-dimensional proof uses operator-theoretic invertibility arguments instead | Moderate |
| MC-3 | SPECTRAL-MEASURE-TREATED-AS-EXTENDED-FINITE-SUM | Believing the general Spectral Theorem's spectral measure is just the finite eigenvalue/eigenvector decomposition with more terms, missing that a continuous spectrum with no eigenvectors requires a qualitatively different kind of object | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Spectrum Point Assumed to Be Eigenvalue") → P41 (detect: ask a student whether every $\lambda\in\sigma(T)$ must have a corresponding eigenvector, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's shift-operator computation — $0\in\sigma(S)$ purely from failed surjectivity, with $0$ provably not an eigenvalue — re-anchoring on "rank-nullity's guarantee that 'non-invertible' means 'has an eigenvector' is a FINITE-dimensional fact, not a general one").
- **B02 (targets MC-2)**: P27 (name it: "Real-Spectrum Proof Method Assumed Polynomial-Based") → P41 (detect: ask a student how they would verify a bounded self-adjoint operator's spectrum is real, and check for a characteristic-polynomial-based answer) → P64 (conceptual shift: re-walk Example 2's direct invertibility argument for the multiplication operator $M$, re-anchoring on "no polynomial exists here — the argument is about when $T-\lambda I$ has a bounded inverse, checked directly").
- **B03 (targets MC-3)**: P27 (name it: "Spectral Measure Treated as Extended Finite Sum") → P41 (detect: ask a student to describe the general Spectral Theorem's spectral measure and check whether they describe it as "just a longer version" of the finite sum) → P64 (conceptual shift: re-walk Example 3's $M$, which has zero eigenvectors yet a full continuous spectrum $[0,1]$, re-anchoring on "when there are no eigenvectors to sum over at all, the spectral measure is doing something a finite sum structurally cannot do").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.bounded-operator` (the operator norm and $B(X,Y)$'s own structure, needed to define "bounded inverse" precisely), `math.fnal.hilbert-space` (the setting — a complete inner product space — in which this concept's operators act).
- **Unlocks**: `math.fnal.compact-operator-spectrum` (the special, more tractable case where the spectrum consists only of eigenvalues accumulating at most at $0$ — resolving, for that operator class specifically, this concept's own LO1 caveat about non-eigenvalue spectral points).
- **Cross-links (P76_mode = cross-link probe against `math.linalg.eigenvalues` and `math.linalg.spectral-theorem`, both already authored)**: `math.linalg.eigenvalues` supplies the finite-dimensional eigenvalue definition and characteristic-equation method this concept's LO1 directly generalizes (and the rank-nullity fact underlying MC-1's finite-dimensional equivalence); `math.linalg.spectral-theorem` supplies the finite factorization $A=Q\Lambda Q^T$ this concept's LO3 generalizes to a spectral measure, and its real-symmetric-matrix example is directly reused as the contrast target in Teaching Action A03.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a research/analyze tag places this among the corpus's most advanced concepts; LO1 and LO2 are taught to genuine (if example-based rather than fully general) depth using two concrete, standard operators (the shift operator $S$, the multiplication operator $M$), while LO3 (the general Spectral Theorem's full spectral-measure construction) is deliberately ORIENTATION level, per the established research-tier precedent (`math.cat.limits`, `math.fnal.banach-space`, `math.fnal.hilbert-space`, `math.cat.adjunction`) — stated and illustrated via $M$'s concrete lack of eigenvectors, not derived in full generality.
- Both worked-example operators ($S$ and $M$) were deliberately chosen as STANDARD, well-known examples from the functional-analysis literature (the unilateral shift; a multiplication operator) rather than invented ones, since both phenomena being taught (spectrum without eigenvalues; continuous spectrum with no eigenvectors at all) are genuinely delicate and benefit from using the field's own canonical illustrations rather than ad hoc constructions.
- This blueprint deliberately reuses `math.linalg.spectral-theorem`'s own Example 1 matrix ($A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$) by direct citation in Teaching Action A03 and Example 3, rather than re-deriving a fresh finite example, keeping the finite-vs-infinite contrast anchored to material the learner has already fully worked through.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both cross-links authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against both math.linalg.eigenvalues and math.linalg.spectral-theorem) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner, direct generalization of two mastered prerequisites and two cross-linked finite-dimensional concepts) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
