# Teaching Blueprint: Compact Operators (`math.fnal.compact-operator-spectrum`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.compact-operator-spectrum` |
| name | Compact Operators |
| domain | Functional Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 7 |
| requires | `math.fnal.spectral-theory` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in spectral theory and Banach/Hilbert spaces; compact operators are analyzed by comparison with the finite-dimensional theory they most closely resemble |
| description (KG) | T is compact if it maps bounded sets to precompact sets. Compact operators have discrete spectrum (only 0 is possible accumulation point); non-zero eigenvalues have finite multiplicity. Fredholm alternative: Tx=λx has a theory analogous to finite-dimensional systems. |

## Component 1 — Learning Objectives

- LO1: Define a **compact operator** $T:X\to Y$ as a bounded linear operator that maps every bounded set to a **precompact** (relatively compact: has compact closure) set, and correctly reformulate this as: every bounded sequence $(x_n)$ in $X$ has a subsequence $(x_{n_k})$ such that $(Tx_{n_k})$ converges in $Y$ — and distinguish compactness from boundedness (every compact operator is bounded, but most bounded operators are not compact in infinite dimensions).
- LO2: State the **spectral properties of compact operators on Banach spaces** — the spectrum of a compact operator $T$ is at most countable with 0 as the only possible accumulation point; every nonzero spectral value $\lambda$ is an eigenvalue with finite-dimensional eigenspace; if $X$ is infinite-dimensional, $0\in\sigma(T)$ always — and correctly analyze which spectral properties hold for compact vs. general bounded operators.
- LO3: State the **Fredholm alternative** for a compact operator $T$ and scalar $\lambda\neq0$: either $\lambda I-T$ is invertible (the equation $(\lambda I-T)x=y$ has a unique solution for every $y$), or $\lambda$ is an eigenvalue of $T$ (and $(\lambda I-T)x=y$ has a solution iff $y$ is orthogonal to $\ker(\lambda I-T^*)$) — a direct analogue of the finite-dimensional "either $Ax=b$ has a unique solution, or $Ax=0$ has a nontrivial solution."

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.spectral-theory` (spectrum, resolvent, eigenvalues, spectral radius; properties of the spectrum for general bounded operators on Banach/Hilbert spaces).

## Component 3 — Core Explanation

A bounded linear operator $T:X\to Y$ is **compact** if $\overline{T(B_X)}$ is compact in $Y$ (the closure of the image of the unit ball is compact). Equivalently: every bounded sequence in $X$ has a subsequence whose image under $T$ converges. In finite dimensions, every bounded linear operator is compact (Bolzano-Weierstrass). In infinite dimensions, compact operators are a proper subclass: they are "almost finite-dimensional" in a precise sense.

**Key examples**: every finite-rank operator (image is finite-dimensional) is compact. Integral operators $T(f)(x)=\int K(x,y)f(y)\,dy$ with continuous kernel $K$ on a compact domain are compact (by the Arzelà-Ascoli theorem). The identity operator $I$ on an infinite-dimensional Banach space is NOT compact (the sequence $e_n$ of standard basis vectors is bounded but $\{e_n\}$ has no convergent subsequence in $\ell^2$ under the norm topology — $\|e_n-e_m\|=\sqrt{2}$ for all $n\neq m$).

**Spectral theory of compact operators**: let $T$ be compact on an infinite-dimensional Banach space $X$. Then:
(1) $0\in\sigma(T)$ always ($I$ not compact, so $T$ not invertible unless $X$ is finite-dimensional).
(2) Every nonzero $\lambda\in\sigma(T)$ is an eigenvalue (point spectrum only, no continuous spectrum for nonzero values).
(3) Each eigenspace $\ker(\lambda I-T)$ for $\lambda\neq0$ is finite-dimensional.
(4) The nonzero eigenvalues are at most countable, with no accumulation point except possibly $0$ — so the nonzero spectrum is a discrete sequence (or finite set) $\lambda_1,\lambda_2,\dots\to0$.
This is exactly the structure of finite-dimensional linear algebra (all eigenvalues, finite-dimensional eigenspaces, finitely many of them) extended to infinite dimensions with the caveat that $0$ can now be an accumulation point.

**Fredholm alternative**: for compact $T$ and $\lambda\neq0$, exactly one of the following holds: (I) $\lambda I-T$ is bijective (unique solution to $(\lambda I-T)x=y$ for every $y$), or (II) $\ker(\lambda I-T)\neq\{0\}$ ($\lambda$ is an eigenvalue). In case (II), $(\lambda I-T)x=y$ has a solution if and only if $y\perp\ker(\lambda I-T^*)$ (solvability condition). This is the direct infinite-dimensional analogue of the linear algebra fact: either $A-\lambda I$ is invertible or $\lambda$ is an eigenvalue of $A$.

## Component 4 — Worked Examples

**Example 1 (LO1 — compact vs. bounded, and integral operators, breaking MC-1)**: The Volterra integral operator $T:L^2([0,1])\to L^2([0,1])$, $(Tf)(x)=\int_0^x f(t)\,dt$, is compact. To see why: by Arzelà-Ascoli, the image of the unit ball of $L^2$ under $T$ is equicontinuous and uniformly bounded in $C([0,1])$ (since $|(Tf)(x)-(Tf)(y)|\le|x-y|^{1/2}\|f\|_{L^2}$ by Cauchy-Schwarz), hence has compact closure in $C([0,1])\hookrightarrow L^2([0,1])$. Contrast: the identity $I:L^2([0,1])\to L^2([0,1])$ is bounded (norm 1) but NOT compact — the standard orthonormal basis $(e_n)$ is a bounded sequence with no convergent subsequence in norm ($\|e_n\|=1$, $\|e_n-e_m\|=\sqrt{2}$ for $n\neq m$).

**Example 2 (LO2 — spectral properties of a compact operator on $\ell^2$, breaking MC-2)**: Let $T:\ell^2\to\ell^2$, $T(x_1,x_2,\dots)=(x_1/1,x_2/2,x_3/3,\dots)$ — a diagonal compact operator (each diagonal entry $1/n\to0$, so the image of the unit ball is precompact). Eigenvalues: $Te_n=(1/n)e_n$, so $\lambda_n=1/n$ is an eigenvalue with one-dimensional eigenspace $\mathrm{span}(e_n)$. These eigenvalues form the sequence $1,1/2,1/3,\dots\to0$ — accumulating only at 0. The full spectrum $\sigma(T)=\{1/n:n\ge1\}\cup\{0\}$, with $0$ the only accumulation point, all eigenspaces one-dimensional (finite). Compare with a general bounded operator on $\ell^2$ (e.g., the unilateral shift): its spectrum can be an entire closed disk, with no eigenvalues at all — a very different picture.

**Example 3 (LO3 — the Fredholm alternative applied)**: For the compact operator $T$ from Example 2, take $\lambda=1/2$. The equation $(1/2\cdot I-T)x=y$, i.e., $(1/2-1/n)x_n=y_n$ for all $n$, has solution $x_n=y_n/(1/2-1/n)$ for $n\neq2$ and requires $y_2=0$ when $n=2$ (since $(1/2-1/2)x_2=y_2$ must hold). So: either $y_2=0$ (solvable, unique solution) or $y_2\neq0$ (no solution). The Fredholm alternative classifies this: $\lambda=1/2$ IS an eigenvalue of $T$ (with eigenvector $e_2$), so by alternative (II), the equation $(1/2\cdot I-T)x=y$ is solvable iff $y\perp e_2$ (since $T^*=T$ here — $T$ is self-adjoint), i.e., iff $y_2=0$ — exactly what the direct calculation shows.

## Component 5 — Teaching Actions

### Teaching Action A01 — Compact Operators: Definition and Core Examples (Primitive P06: Contrast Pair)

State the definition (bounded sequences have image subsequences converging). Contrast directly: the identity on $\ell^2$ is bounded but NOT compact (exhibit $e_n$ as a bounded sequence with no convergent image subsequence). Then: the operator from Example 1 IS compact (Arzelà-Ascoli). Emphasize: "compact operators behave like finite-dimensional operators in a very precise sense — they compress infinite-dimensional bounded sets into something sequentially compact."

- **MC-1 hook**: ask "in infinite-dimensional spaces, is every bounded operator compact?" — a "yes" answer reveals MC-1 (conflating boundedness with compactness — this fails spectacularly in infinite dimensions, where the identity is not compact).

### Teaching Action A02 — Spectral Properties: Discrete Spectrum and Finite Eigenspaces (Primitive P37: Classify)

Work Example 2's diagonal compact operator: read off eigenvalues $\{1/n\}$, verify they accumulate only at $0$, check each eigenspace is one-dimensional. State the general theorem (LO2) as a classification: every compact operator has at most countably many nonzero eigenvalues, accumulating only at $0$, each with finite-dimensional eigenspace — "the infinite-dimensional analogue of finite-dimensional linear algebra's full diagonalizability picture, but now with $0$ as a possible accumulation point."

- **MC-2 hook**: ask "can a compact operator on an infinite-dimensional space have a nonzero eigenvalue that is an accumulation point of other eigenvalues?" — a "yes" answer reveals MC-2 (missing the spectral discreteness theorem for compact operators).

### Teaching Action A03 — The Fredholm Alternative (Primitive P25: Deductive)

State the Fredholm alternative for compact $T$ and $\lambda\neq0$: either unique solvability, or eigenvalue with solvability-condition structure. Work Example 3's explicit check. Connect to finite-dimensional linear algebra: "either $Ax=b$ has a unique solution (when $\lambda$ is not an eigenvalue) or $Ax=0$ has a nontrivial solution (when $\lambda$ IS an eigenvalue) — this is the same dichotomy, now valid in infinite dimensions because compactness makes $\lambda I-T$ 'almost finite-dimensional.'"

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Define compactness for a linear operator, and prove or disprove: the identity on $\ell^2$ is compact. (Construct an explicit bounded sequence with no convergent image subsequence.)
  2. For the compact diagonal operator $T:\ell^2\to\ell^2$, $T(x_n)=(x_n/n^2)$, describe the spectrum $\sigma(T)$ completely: list all eigenvalues, their eigenspaces, and identify the only possible accumulation point.
  3. Using the Fredholm alternative, determine for which right-hand sides $y\in\ell^2$ the equation $(I-T)x=y$ has a solution, where $T$ is from Problem 2. (Is $\lambda=1$ an eigenvalue? Use the spectral description from Problem 2.)
  4. Explain why $0$ is always in the spectrum of a compact operator on an infinite-dimensional Banach space. (Hint: would $T$ be invertible if $0\notin\sigma(T)$? What would that imply about $I=T\cdot T^{-1}$?)
- **P76 (Transfer Probe, mode = independence)**: "Integral equations of the form $\int_0^1 K(x,y)u(y)\,dy = f(x)$ or $u(x) - \lambda\int_0^1 K(x,y)u(y)\,dy = f(x)$ (Fredholm integral equations of the first and second kind) arise throughout physics and engineering. (a) Using this lesson's definition, explain why the integral operator $Ku(x)=\int_0^1 K(x,y)u(y)\,dy$ with continuous $K$ on $[0,1]^2$ is compact on $L^2([0,1])$, and why this makes the equation $u-\lambda Ku=f$ a Fredholm-type problem. (b) Using the Fredholm alternative, state the two possible outcomes for $u-\lambda Ku=f$ when $\lambda\neq0$ is given: when is there always a unique solution, and when might there be no solution for some $f$? (c) Explain why the equation $Ku=f$ (no $\lambda$, i.e., $\lambda=1/1$ but the operator is $K$ not $\lambda I-K$) is intrinsically harder: relate this to the fact that $0$ is always in $\sigma(K)$ for a compact $K$ on an infinite-dimensional space."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BOUNDED-IMPLIES-COMPACT-IN-INFINITE-DIMENSIONS | Believing that every bounded linear operator on an infinite-dimensional Banach space is compact, missing that compactness is a strictly stronger property not shared by operators like the identity | Foundational |
| MC-2 | COMPACT-SPECTRUM-NOT-NECESSARILY-DISCRETE | Believing that compact operators can have nonzero eigenvalues that accumulate at nonzero points, missing the spectral discreteness theorem (nonzero spectrum of a compact operator is at most countable, with $0$ as the only possible accumulation point) | Foundational |
| MC-3 | FREDHOLM-ALTERNATIVE-APPLIES-TO-ALL-OPERATORS | Believing the Fredholm alternative's dichotomy (unique-solvability or eigenvalue structure) holds for general bounded operators, not just compact ones — missing that this finite-dimensional-like structure requires compactness | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Bounded Implies Compact in Infinite Dimensions") → P41 (detect: ask whether the identity on $\ell^2$ is compact, checking for "yes") → P64 (conceptual shift: exhibit $(e_n)$ as a bounded sequence with $\|e_n-e_m\|=\sqrt{2}$ — no convergent subsequence, so the identity fails the definition of compactness).
- **B02 (targets MC-2)**: P27 (name it: "Compact Spectrum Not Necessarily Discrete") → P41 (detect: ask whether a compact operator can have a nonzero accumulation point in its spectrum) → P64 (conceptual shift: re-walk Example 2's eigenvalue sequence $1,1/2,1/3,\dots\to0$ and state the general theorem — nonzero spectrum is at most countable, accumulating only at $0$).
- **B03 (targets MC-3)**: P27 (name it: "Fredholm Alternative Applies to All Operators") → P41 (detect: ask whether the Fredholm dichotomy holds for any bounded operator, e.g. the shift on $\ell^2$) → P64 (conceptual shift: the shift has no eigenvalues but $I$ is not bijective in the usual sense — the Fredholm alternative requires compactness to get the sharp eigenvalue/invertibility dichotomy).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.spectral-theory` (spectrum, resolvent, eigenvalues — the spectral language this concept's LO2 and LO3 use and extend to the compact case).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/analyze bloom tag and mastery_threshold = 0.6 (MAMR 3/5) places this at the upper tier of research-level content — the MAMR threshold is lower (3/5 rather than 4/5) reflecting the genuine depth and technicality of the Fredholm alternative proof. The teaching approach (3 TAs + gate) covers the definition and examples (A01), the spectral properties (A02), and the Fredholm alternative (A03) as the three distinct structural layers, with the gate testing all three.
- The Fredholm alternative is stated without a full proof at this level — the proof requires Riesz theory and the structure of compact perturbations of the identity at a level beyond this blueprint's stated bloom tag (analyze). The gate's Problem 4 asks for an argument about why $0\in\sigma(T)$, which is a short deduction from the non-compactness of the identity, fitting the analyze bloom level.
- The integral-equation transfer probe was chosen because Fredholm integral equations are the historical origin of the Fredholm alternative and remain its primary application in physics and engineering — connecting the abstract functional-analytic theorem to its concrete motivating problem.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.fnal.spectral-theory`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in spectral theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
