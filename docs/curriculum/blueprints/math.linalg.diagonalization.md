# Teaching Blueprint: Diagonalization (`math.linalg.diagonalization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.diagonalization` |
| name | Diagonalization |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.linalg.eigenvalues`, `math.linalg.eigenspace`, `math.linalg.matrix-inverse` |
| unlocks | `math.linalg.matrix-exponential` |
| cross_links | `math.de.systems-matrix-method` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A is diagonalizable iff it has n linearly independent eigenvectors. Then A=PDP⁻¹ where D=diag(λ₁,…,λₙ) and P has eigenvectors as columns. Powers: Aᵏ=PDᵏP⁻¹.

 |

## Component 1 — Learning Objectives

- LO1: State the diagonalizability criterion — an $n\times n$ matrix $A$ is diagonalizable IF AND ONLY IF it has $n$ LINEARLY INDEPENDENT eigenvectors — and build $A=PDP^{-1}$ by placing eigenvectors as columns of $P$ and the corresponding eigenvalues as $D=\text{diag}(\lambda_1,\ldots,\lambda_n)$, IN MATCHING ORDER.
- LO2: Compute matrix powers efficiently via $A^k=PD^kP^{-1}$ — raising a DIAGONAL matrix to a power is just raising each diagonal entry to that power, avoiding repeated matrix multiplication.
- LO3: Recognize when a matrix is NOT diagonalizable — when an eigenvalue's algebraic multiplicity exceeds its eigenspace's dimension (geometric multiplicity), there aren't enough independent eigenvectors to fill $P$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.eigenvalues` (computing $\lambda$), `math.linalg.eigenspace` (finding eigenvectors and their span), and `math.linalg.matrix-inverse` (needed to form $P^{-1}$).

## Component 3 — Core Explanation

An $n\times n$ matrix $A$ is **diagonalizable** if and only if it has $n$ LINEARLY INDEPENDENT eigenvectors. When this holds, $A=PDP^{-1}$, where $P$'s columns are these eigenvectors and $D=\text{diag}(\lambda_1,\ldots,\lambda_n)$ is diagonal with the CORRESPONDING eigenvalues in the SAME column order as $P$'s eigenvectors — column $i$ of $P$ must pair with $D$'s $i$-th diagonal entry.

This factorization makes computing powers dramatically easier: $A^k=(PDP^{-1})^k=PD^kP^{-1}$ (the $P^{-1}P$ pairs cancel in between), and $D^k$ is trivial — just raise each diagonal entry to the $k$-th power, since a diagonal matrix's powers are computed entrywise.

Not every matrix is diagonalizable: if some eigenvalue's ALGEBRAIC multiplicity (multiplicity as a root of the characteristic polynomial) exceeds its GEOMETRIC multiplicity (the eigenspace's dimension), there are too few independent eigenvectors to build a full-rank $P$, and $A$ is not diagonalizable over the reals (or at all, in some cases).

## Component 4 — Worked Examples

**Example 1 (LO1 — building P and D, breaking MC-1)**: Diagonalize $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$, with eigenvalues $\lambda_1=5$ (eigenvector $(1,1)$) and $\lambda_2=2$ (eigenvector $(1,-2)$). Build $P=\begin{pmatrix}1&1\\1&-2\end{pmatrix}$ (eigenvectors as columns) and $D=\begin{pmatrix}5&0\\0&2\end{pmatrix}$ — column 1 of $P$ (the $\lambda_1=5$ eigenvector) MUST pair with $D$'s first diagonal entry (5). A common error mismatches the order — e.g. placing $(1,1)$ in $P$'s first column but writing $D=\text{diag}(2,5)$ — which produces an entirely WRONG factorization (verify: $PDP^{-1}$ with mismatched order does NOT reconstruct $A$).

**Example 2 (LO2 — efficient power computation)**: Using Example 1's diagonalization, compute $A^{10}$. $A^{10}=PD^{10}P^{-1}$, where $D^{10}=\begin{pmatrix}5^{10}&0\\0&2^{10}\end{pmatrix}=\begin{pmatrix}9765625&0\\0&1024\end{pmatrix}$ — computed entrywise, avoiding 10 successive $2\times2$ matrix multiplications entirely.

**Example 3 (LO3 — a non-diagonalizable case, breaking MC-2)**: Determine whether $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$ is diagonalizable. The characteristic polynomial gives $\lambda=2$ with ALGEBRAIC multiplicity 2 (a repeated root). Solving $(A-2I)v=0$: $\begin{pmatrix}0&1\\0&0\end{pmatrix}v=0$ gives only a ONE-dimensional eigenspace (GEOMETRIC multiplicity 1) — spanned by $(1,0)$. Since geometric multiplicity (1) $<$ algebraic multiplicity (2), there is only 1 independent eigenvector, not the 2 needed — $A$ is NOT diagonalizable. A common error assumes ANY matrix with a repeated eigenvalue is automatically non-diagonalizable (or, conversely, always diagonalizable) without actually checking whether the eigenspace's dimension matches the multiplicity — repeated eigenvalues CAN still be diagonalizable if their eigenspace happens to be full-dimensional (e.g. $A=2I$ itself, trivially diagonal already).

## Component 5 — Teaching Actions

### Teaching Action A01 — Eigenvector Columns Must Match Eigenvalue Order in D (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling each column of $P$ with its source eigenvector and eigenvalue, then building $D$ column-by-column to match.

- **MC-1 hook**: check whether $P$'s columns and $D$'s diagonal entries are correctly paired.

### Teaching Action A02 — Diagonal Powers Are Entrywise (Primitive P11: Representation Shift)

Work Example 2, contrasting the effort of computing $A^{10}$ directly (10 matrix multiplications) against the diagonalized shortcut (10 scalar exponentiations plus two matrix multiplications).

### Teaching Action A03 — Check Geometric vs. Algebraic Multiplicity Before Concluding (Primitive P06: Contrast Pair)

Work Example 3, then contrast with $A=2I$ (also a repeated eigenvalue, but ALREADY diagonal, hence trivially diagonalizable with geometric multiplicity 2). State the rule: "a repeated eigenvalue is a WARNING to check, not an automatic verdict — always compare the eigenspace's actual dimension against the eigenvalue's multiplicity as a root."

- **MC-2 hook**: this directly targets MC-2 (assuming repeated eigenvalues automatically determine diagonalizability either way, without checking multiplicities).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Diagonalize $A=\begin{pmatrix}3&0\\0&1\end{pmatrix}$ having eigenvalues 3 (eigenvector $(1,0)$) and 1 (eigenvector $(0,1)$) — a case already diagonal, verify $P=D=$ identity-column setups still apply correctly.
  2. Given $A=PDP^{-1}$ with $D=\text{diag}(2,-1)$, compute $A^4$ using the diagonalized power shortcut.
  3. For a matrix with eigenvalue 3 having algebraic multiplicity 2 but a 2-dimensional eigenspace, determine diagonalizability and justify.
  4. For a matrix with eigenvalue 5 having algebraic multiplicity 3 but only a 1-dimensional eigenspace, determine diagonalizability and justify.
- **P76 (Transfer Probe, mode = independence)**: "A population-growth model uses a transition matrix $A=\begin{pmatrix}0.9&0.2\\0.1&0.8\end{pmatrix}$ (with eigenvalues 1 and 0.7, and known corresponding eigenvectors) to predict a two-region population distribution after many years. (a) Explain why diagonalizing $A$ makes computing the population distribution after, say, 50 years dramatically more practical than multiplying $A$ by itself 50 times. (b) Using the diagonalized form conceptually (without full numeric computation), explain what happens to the population distribution as the number of years grows very large, given that one eigenvalue (0.7) is less than 1 and shrinks toward 0 under repeated powering, while the other (1) does not shrink at all."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EIGENVECTOR-EIGENVALUE-ORDER-MISMATCHED-BETWEEN-P-AND-D | Placing eigenvectors in $P$ and eigenvalues in $D$ without matching column order, producing an incorrect factorization | Foundational |
| MC-2 | REPEATED-EIGENVALUE-DIAGONALIZABILITY-ASSUMED-WITHOUT-CHECKING-MULTIPLICITIES | Assuming a repeated eigenvalue automatically determines diagonalizability (either way) without comparing algebraic and geometric multiplicities | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Eigenvector-Eigenvalue Order Mismatched Between P and D") → P41 (detect: present Example 1's mismatched-order case and check whether the student catches that $PDP^{-1}$ fails to reconstruct $A$) → P64 (conceptual shift: re-build $P$ and $D$ with explicit column labels, verifying the reconstruction).
- **B02 (targets MC-2)**: P27 ("Repeated Eigenvalue Diagonalizability Assumed Without Checking Multiplicities") → P41 (detect: present Example 3 and the trivial $A=2I$ counterexample, checking whether both are (incorrectly) treated identically) → P64 (conceptual shift: re-compute both multiplicities explicitly for each case, confirming the comparison rule).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.eigenvalues`, `math.linalg.eigenspace`, `math.linalg.matrix-inverse`.
- **Unlocks**: `math.linalg.matrix-exponential`.
- **Related**: `math.linalg.spectral-theorem`, `math.linalg.jordan-form` (the generalization when a matrix is NOT diagonalizable).
- **Cross-links**: `math.de.systems-matrix-method` (diagonalization is the key technique for solving linear systems of differential equations).

## Component 8 — Teaching Notes

- estimated_hours = 5 and mastery_threshold = 0.85 reflect genuine conceptual and procedural weight — correctly pairing eigenvectors with eigenvalues and checking multiplicities are both easy to get subtly wrong.
- Both misconceptions were ranked Foundational because each produces a plausible-looking but entirely incorrect result (a wrong factorization, or a wrong diagonalizability verdict) without any obvious red flag unless explicitly checked.
- The population-growth transfer probe was deliberately chosen because the long-run behavior insight (dominant eigenvalue near 1 persists, smaller eigenvalues decay) is a genuinely important qualitative payoff of diagonalization, previewing `math.linalg.matrix-exponential` and steady-state analysis.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.eigenvalues`, `math.linalg.eigenspace`, `math.linalg.matrix-inverse`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.linalg.matrix-exponential`) |
| V-5 | cross_links checked against disk | PASS (`math.de.systems-matrix-method`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
