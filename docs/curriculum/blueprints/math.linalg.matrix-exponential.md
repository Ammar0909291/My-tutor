# Teaching Blueprint: Matrix Exponential (`math.linalg.matrix-exponential`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.matrix-exponential` |
| name | Matrix Exponential |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.linalg.diagonalization`, `math.seq.series` |
| unlocks | (none in KG) |
| cross_links | `math.de.systems-matrix-method` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | e^A = ∑_{k=0}^∞ Aᵏ/k!. For diagonalizable A=PDP⁻¹: e^A = Pe^DP⁻¹. Used to express solutions to x′=Ax as x(t)=e^{At}x(0). Satisfies d/dt e^{At} = Ae^{At}.

 |

## Component 1 — Learning Objectives

- LO1: State the matrix exponential's SERIES DEFINITION $e^A=\sum_{k=0}^{\infty}\frac{A^k}{k!}=I+A+\frac{A^2}{2!}+\frac{A^3}{3!}+\cdots$ — the direct matrix analogue of the scalar exponential's Taylor series.
- LO2: For a DIAGONALIZABLE matrix $A=PDP^{-1}$, compute $e^A=Pe^DP^{-1}$ efficiently, where $e^D$ is diagonal with entries $e^{\lambda_i}$ (NOT $\lambda_i$ itself, and NOT computed by exponentiating $D$'s entries via the series — the diagonal case collapses the whole series into simple scalar exponentials).
- LO3: Use $x(t)=e^{At}x(0)$ to express the solution to the linear system of differential equations $x'=Ax$, and state the defining property $\frac{d}{dt}e^{At}=Ae^{At}$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.diagonalization` (needed for the efficient $Pe^DP^{-1}$ computation) and `math.seq.series` (needed to understand the infinite-series definition and its convergence).

## Component 3 — Core Explanation

The **matrix exponential** of a square matrix $A$ is defined by the same infinite series as the scalar exponential function: $e^A=\sum_{k=0}^{\infty}\frac{A^k}{k!}=I+A+\frac{A^2}{2!}+\frac{A^3}{3!}+\cdots$ — a genuine, well-defined (convergent) matrix, not merely a symbolic notation.

Computing this series directly is impractical, but for a DIAGONALIZABLE matrix $A=PDP^{-1}$, it simplifies dramatically: $e^A=Pe^DP^{-1}$, where $e^D=\text{diag}(e^{\lambda_1},\ldots,e^{\lambda_n})$ — each diagonal entry becomes $e^{\lambda_i}$ (the SCALAR exponential of that eigenvalue), because $D^k=\text{diag}(\lambda_1^k,\ldots,\lambda_n^k)$ makes the whole matrix series decouple into $n$ independent scalar exponential series.

This has a major application: the linear system of differential equations $x'=Ax$ has solution $x(t)=e^{At}x(0)$ — a direct matrix generalization of the scalar ODE $x'=ax\Rightarrow x(t)=e^{at}x(0)$. The matrix exponential satisfies the analogous derivative property $\frac{d}{dt}e^{At}=Ae^{At}$, which is exactly what makes $x(t)=e^{At}x(0)$ solve $x'=Ax$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — computing e^A via diagonalization, breaking MC-1)**: Compute $e^A$ for $A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$ (already diagonal, with $D=A$, $P=I$). $e^D=\begin{pmatrix}e^2&0\\0&e^{-1}\end{pmatrix}$. A common error computes the diagonal entries as $2^e$/$(-1)^e$ or simply LEAVES the eigenvalues unchanged (writing $e^D=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$, forgetting to exponentiate at all) rather than correctly computing $e^{\lambda_i}$ for each eigenvalue $\lambda_i$ — the diagonal entries of $e^D$ are $e$ raised to each eigenvalue's power, not the eigenvalues raised to any power, and not the eigenvalues left unchanged.

**Example 2 (LO2 — a genuinely non-diagonal case)**: For $A=\begin{pmatrix}3&1\\0&1\end{pmatrix}$ with eigenvalues $\lambda_1=3$ (eigenvector $(1,0)$), $\lambda_2=1$ (eigenvector $(1,-2)$), so $P=\begin{pmatrix}1&1\\0&-2\end{pmatrix}$: compute $e^A=Pe^DP^{-1}$ where $e^D=\text{diag}(e^3,e^1)$ — the SAME diagonalization machinery from `math.linalg.diagonalization`, now applied to build $e^A$ rather than $A^k$.

**Example 3 (LO3 — the ODE solution formula, breaking MC-2)**: For the system $x'=Ax$ with $A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$ (Example 1's matrix) and initial condition $x(0)=(3,5)$, write the solution $x(t)=e^{At}x(0)=\begin{pmatrix}e^{2t}&0\\0&e^{-t}\end{pmatrix}\begin{pmatrix}3\\5\end{pmatrix}=\begin{pmatrix}3e^{2t}\\5e^{-t}\end{pmatrix}$. A common error writes the solution as $x(t)=e^At\cdot x(0)$ or $x(t)=e^{A}\cdot t\cdot x(0)$ — confusing $e^{At}$ (the matrix exponential of $At$, a genuinely different matrix for each $t$) with $t$ times the FIXED matrix $e^A$, which is an entirely different (and incorrect) object.

## Component 5 — Teaching Actions

### Teaching Action A01 — e^D Exponentiates Eigenvalues as Scalar Exponents, Not Bases or Unchanged Values (Primitive P64: Conceptual Shift)

Work Example 1, explicitly writing out the series definition applied to the diagonal case to show why $e^{\lambda_i}$ (not $\lambda_i^e$ or $\lambda_i$ itself) is the correct entry.

- **MC-1 hook**: check whether $e^D$'s diagonal entries are correctly computed as $e$ raised to each eigenvalue.

### Teaching Action A02 — Applying Diagonalization to e^A (reused procedure)

Work Example 2, reusing the exact $P,D,P^{-1}$ construction from `math.linalg.diagonalization`, now building $e^D$ instead of $D^k$.

### Teaching Action A03 — e^{At} Is a t-Dependent Matrix, Not t Times a Fixed Matrix (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct $e^{At}$ (recomputed with $t$ inside the exponent for every $t$) against the incorrect $t\cdot e^A$ (a fixed matrix merely scaled by $t$), showing they diverge for any $t\ne1$.

- **MC-2 hook**: this directly targets MC-2 (confusing $e^{At}$ with $t\cdot e^A$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $e^A$ for $A=\begin{pmatrix}0&0\\0&5\end{pmatrix}$.
  2. Given $A=PDP^{-1}$ with $D=\text{diag}(1,-2)$, write $e^D$ explicitly.
  3. Write the solution $x(t)=e^{At}x(0)$ for $A=\text{diag}(4,-3)$ and $x(0)=(2,1)$.
  4. Explain, in one sentence, why $e^{At}$ cannot simply be written as $t\cdot e^A$.
- **P76 (Transfer Probe, mode = independence)**: "A chemical reaction network's concentration vector $x(t)$ (two interacting species) evolves according to $x'=Ax$ with $A=\begin{pmatrix}-2&0\\0&-0.5\end{pmatrix}$ (each species decaying at its own independent rate) and initial concentrations $x(0)=(10,10)$. (a) Write the solution $x(t)=e^{At}x(0)$ explicitly, and evaluate the concentration of each species at $t=1$. (b) Explain, using the eigenvalue signs, why BOTH concentrations decay toward 0 as $t\to\infty$, and why the first species (eigenvalue $-2$) decays much FASTER than the second (eigenvalue $-0.5$)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | E-TO-D-DIAGONAL-ENTRIES-COMPUTED-INCORRECTLY | Computing e^D's diagonal entries as the eigenvalue raised to e, or leaving them unchanged, instead of e raised to each eigenvalue's power | Foundational |
| MC-2 | E-TO-AT-CONFUSED-WITH-T-TIMES-E-TO-A | Treating e^{At} as t times the fixed matrix e^A, rather than a genuinely t-dependent matrix recomputed for each t | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("e^D Diagonal Entries Computed Incorrectly") → P41 (detect: present Example 1 and check whether $e^{\lambda_i}$ or an incorrect alternative is used) → P64 (conceptual shift: re-derive from the series definition applied entrywise to the diagonal case).
- **B02 (targets MC-2)**: P27 ("e^{At} Confused with t Times e^A") → P41 (detect: present Example 3 and check whether $x(t)$ is computed as $t\cdot e^A x(0)$) → P64 (conceptual shift: re-substitute $At$ into the series definition directly, showing every power of $t$ appears, not just a single linear factor).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.diagonalization`, `math.seq.series`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.de.systems-matrix-method` (the matrix exponential is the closed-form solution technique for linear systems of differential equations).

## Component 8 — Teaching Notes

- difficulty = expert and estimated_hours = 5 reflect that this concept combines two substantial prerequisites (diagonalization, infinite series) into a genuinely advanced synthesis with real differential-equations applications.
- Both misconceptions were ranked Foundational because each produces a plausible-looking but numerically or structurally WRONG result without an obvious internal check.
- The chemical-decay transfer probe was deliberately chosen because independent-rate exponential decay is a concrete, intuitive special case (diagonal $A$) that makes the abstract $e^{At}$ formula immediately meaningful, directly previewing `math.de.systems-matrix-method`.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.diagonalization`, `math.seq.series`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.de.systems-matrix-method`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
