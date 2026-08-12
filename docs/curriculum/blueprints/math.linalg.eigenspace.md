# Teaching Blueprint: Eigenspace (`math.linalg.eigenspace`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.eigenspace` |
| name | Eigenspace |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.eigenvalues`, `math.linalg.null-space` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | E_λ = ker(A−λI) = {v : Av=λv}; a subspace of ℝⁿ. Its dimension is the geometric multiplicity of λ. Algebraic multiplicity ≥ geometric multiplicity; equality holds for diagonalizable matrices.

 |

## Component 1 — Learning Objectives

- LO1: Find the eigenspace $E_\lambda=\ker(A-\lambda I)=\{v:Av=\lambda v\}$ for a given eigenvalue $\lambda$, by solving the homogeneous system $(A-\lambda I)v=0$.
- LO2: Determine the GEOMETRIC MULTIPLICITY of $\lambda$ as $\dim(E_\lambda)$, and compare it against the ALGEBRAIC MULTIPLICITY (the root's multiplicity in the characteristic polynomial).
- LO3: State the inequality: algebraic multiplicity $\ge$ geometric multiplicity ALWAYS, with EQUALITY specifically characterizing when a matrix is DIAGONALIZABLE (for every eigenvalue).

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.eigenvalues` (what eigenvalues are) and `math.linalg.null-space` (the kernel-computation technique this eigenspace directly applies).

## Component 3 — Core Explanation

The **eigenspace** $E_\lambda=\ker(A-\lambda I)=\{v:Av=\lambda v\}$ for a specific eigenvalue $\lambda$ is the set of ALL eigenvectors corresponding to $\lambda$ (plus the zero vector) — a SUBSPACE of $\mathbb{R}^n$, found by solving the homogeneous system $(A-\lambda I)v=0$.

The eigenspace's DIMENSION is the **geometric multiplicity** of $\lambda$ — how many linearly independent eigenvectors correspond to that eigenvalue. This is distinguished from the **algebraic multiplicity** — how many times $\lambda$ appears as a root of the characteristic polynomial (its multiplicity as a polynomial root).

A fundamental inequality: algebraic multiplicity $\ge$ geometric multiplicity, ALWAYS (never the reverse). EQUALITY for EVERY eigenvalue characterizes exactly when a matrix is DIAGONALIZABLE.

## Component 4 — Worked Examples

**Example 1 (LO1 — finding an eigenspace)**: For $A=\begin{pmatrix}2&0\\0&2\end{pmatrix}$ with eigenvalue $\lambda=2$: solve $(A-2I)v=0$: $A-2I=\begin{pmatrix}0&0\\0&0\end{pmatrix}$ — the ZERO matrix, meaning EVERY vector satisfies $(A-2I)v=0$. So $E_2=\mathbb{R}^2$ (the entire space), with $\dim(E_2)=2$.

**Example 2 (LO2, LO3 — comparing algebraic and geometric multiplicity, breaking MC-1)**: For $A=\begin{pmatrix}3&1\\0&3\end{pmatrix}$: characteristic polynomial $p(\lambda)=(3-\lambda)^2$, so $\lambda=3$ has ALGEBRAIC multiplicity 2. Find $E_3$: solve $(A-3I)v=0$: $A-3I=\begin{pmatrix}0&1\\0&0\end{pmatrix}$; row-reducing, this has rank 1, so the solution space (null space) has dimension $2-1=1$ — $\dim(E_3)=1$, the GEOMETRIC multiplicity. Here, algebraic multiplicity (2) is STRICTLY GREATER than geometric multiplicity (1) — this matrix is NOT diagonalizable (a defective matrix). A common error assumes algebraic and geometric multiplicity are ALWAYS equal (perhaps generalizing from simpler examples like Example 1, where they happened to match), missing that strict inequality is a genuine, common possibility.

**Example 3 (LO3 — equality across all eigenvalues means diagonalizable)**: For $A=\begin{pmatrix}2&0&0\\0&2&0\\0&0&5\end{pmatrix}$: eigenvalue $\lambda=2$ has algebraic multiplicity 2 (a repeated root); solving $(A-2I)v=0$ gives $E_2$ spanned by $(1,0,0)$ and $(0,1,0)$, so geometric multiplicity is ALSO 2 — EQUAL. Eigenvalue $\lambda=5$ has algebraic multiplicity 1, and $E_5$ is spanned by $(0,0,1)$, geometric multiplicity 1 — also EQUAL. Since algebraic equals geometric multiplicity for EVERY eigenvalue, $A$ IS diagonalizable.

## Component 5 — Teaching Actions

### Teaching Action A01 — Solve (A−λI)v = 0 to Find the Eigenspace (Primitive P64: Conceptual Shift)

Work Example 1, explicitly forming $A-\lambda I$ and solving the resulting homogeneous system, connecting directly to `math.linalg.null-space`'s already-mastered technique.

### Teaching Action A02 — Algebraic and Geometric Multiplicity Can Genuinely Differ (Primitive P06: Contrast Pair)

Work Example 2's full derivation, showing algebraic multiplicity 2 but geometric multiplicity only 1, explicitly contrasting against Example 1's case where they happened to match. State the rule: "algebraic multiplicity (root count in the polynomial) and geometric multiplicity (eigenspace dimension) are computed by DIFFERENT methods and can genuinely differ — algebraic is always $\ge$ geometric, never the reverse."

- **MC-1 hook**: this directly targets MC-1 (assuming algebraic and geometric multiplicity are always equal).

### Teaching Action A03 — Equality for Every Eigenvalue Means Diagonalizable (Primitive P11: Representation Shift)

Work Example 3, checking BOTH eigenvalues' multiplicities match, connecting this equality directly to the diagonalizability conclusion.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the eigenspace $E_4$ for $A=\begin{pmatrix}4&0\\0&4\end{pmatrix}$.
  2. For $A=\begin{pmatrix}5&1\\0&5\end{pmatrix}$, find the algebraic and geometric multiplicity of $\lambda=5$, and determine whether they're equal.
  3. Given a matrix with an eigenvalue of algebraic multiplicity 3 and geometric multiplicity 2, determine whether the matrix is diagonalizable, and justify.
  4. Explain, in one sentence, why geometric multiplicity can never EXCEED algebraic multiplicity.
- **P76 (Transfer Probe, mode = independence)**: "A vibration-analysis engineer computes a structure's stiffness matrix and finds an eigenvalue $\lambda=10$ (representing a resonant frequency) with algebraic multiplicity 3 (a repeated root in the characteristic polynomial). (a) Explain what it would mean PHYSICALLY if the geometric multiplicity turns out to be LESS than 3 (say, only 2) — specifically, that fewer independent vibration mode shapes exist at this frequency than the algebraic count alone would suggest. (b) Explain, using this lesson's diagonalizability criterion, why this specific mismatch (algebraic 3, geometric 2) would mean the structure's full stiffness matrix is NOT diagonalizable, and why this could matter for the engineer's subsequent analysis techniques (which often assume diagonalizability for simplification)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ALGEBRAIC-AND-GEOMETRIC-MULTIPLICITY-ASSUMED-ALWAYS-EQUAL | Believing algebraic and geometric multiplicity must always match, missing that strict inequality (algebraic > geometric) is a genuine, common possibility | Foundational |
| MC-2 | GEOMETRIC-MULTIPLICITY-COMPUTED-WITHOUT-ROW-REDUCTION | Guessing or assuming an eigenspace's dimension rather than actually row-reducing $(A-\lambda I)$ to find its null space dimension precisely | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Algebraic and Geometric Multiplicity Assumed Always Equal") → P41 (detect: present Example 2 and check whether geometric multiplicity is assumed to equal 2 (matching algebraic) without actually solving for the eigenspace) → P64 (conceptual shift: re-derive $E_3$ explicitly via row reduction, showing its true dimension is only 1).
- **B02 (targets MC-2)**: P27 ("Geometric Multiplicity Computed Without Row Reduction") → P41 (detect: review a submitted geometric multiplicity claim for a missing row-reduction derivation) → P64 (conceptual shift: re-derive by explicitly row-reducing $(A-\lambda I)$ and counting free variables in the resulting system).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.eigenvalues`, `math.linalg.null-space`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.characteristic-polynomial` (the algebraic-multiplicity source), `math.linalg.diagonalization` (the concept this equality criterion directly enables).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that eigenspace computation directly reuses null-space technique, with the genuine new content being the algebraic-vs-geometric multiplicity distinction and its diagonalizability implication.
- MC-1 was ranked most severe because it represents a structurally important gap — a student who assumes equality will systematically miscompute diagonalizability for every DEFECTIVE (non-diagonalizable) matrix they encounter, a genuinely common case in practice.
- The vibration-analysis transfer probe was deliberately chosen because algebraic/geometric multiplicity mismatches have direct physical meaning in structural engineering (fewer independent vibration modes than the "multiplicity count" alone suggests), giving this abstract distinction concrete, high-stakes applied significance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.eigenvalues`, `math.linalg.null-space`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
