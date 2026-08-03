# Teaching Blueprint: Characteristic Polynomial (`math.linalg.characteristic-polynomial`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.characteristic-polynomial` |
| name | Characteristic Polynomial |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.eigenvalues`, `math.linalg.determinant` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | p(λ) = det(A−λI); eigenvalues are its roots. Degree n polynomial for n×n matrix. Cayley-Hamilton theorem states A satisfies its own characteristic polynomial: p(A)=0.

 |

## Component 1 — Learning Objectives

- LO1: Construct the characteristic polynomial $p(\lambda)=\det(A-\lambda I)$ for a given matrix $A$.
- LO2: Find eigenvalues by solving $p(\lambda)=0$ (the roots of the characteristic polynomial).
- LO3: State the Cayley-Hamilton theorem: $A$ satisfies its OWN characteristic polynomial, $p(A)=0$ (substituting the MATRIX $A$ itself into $p$, treating the constant term as a multiple of the identity matrix, yields the ZERO matrix).

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.eigenvalues` (what eigenvalues are) and `math.linalg.determinant` (the computation this polynomial is built from).

## Component 3 — Core Explanation

The **characteristic polynomial** of an $n\times n$ matrix $A$ is $p(\lambda)=\det(A-\lambda I)$ — a degree-$n$ polynomial in the variable $\lambda$. Its ROOTS are exactly the EIGENVALUES of $A$ (values $\lambda$ for which $A-\lambda I$ is singular, i.e. $Av=\lambda v$ has a nonzero solution $v$).

The **Cayley-Hamilton theorem** states that $A$ satisfies its OWN characteristic polynomial: substituting the MATRIX $A$ itself in place of $\lambda$ (with the constant term multiplied by the identity matrix $I$, since a "bare number" can't be added to a matrix directly) gives $p(A)=0$ (the zero matrix) — a remarkable, non-obvious structural fact useful for computing matrix powers and inverses efficiently.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the polynomial, breaking MC-1)**: For $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}$: $A-\lambda I=\begin{pmatrix}3-\lambda&1\\0&2-\lambda\end{pmatrix}$. $p(\lambda)=\det(A-\lambda I)=(3-\lambda)(2-\lambda)-1(0)=(3-\lambda)(2-\lambda)=\lambda^2-5\lambda+6$. A common error forgets to subtract $\lambda$ from EVERY diagonal entry (subtracting it from only one, or not accounting for the identity matrix's structure correctly) — $\lambda I$ affects ONLY the diagonal entries, adding $-\lambda$ to each, never the off-diagonal entries.

**Example 2 (LO2 — finding eigenvalues as roots)**: From Example 1, solve $p(\lambda)=\lambda^2-5\lambda+6=0\Rightarrow(\lambda-2)(\lambda-3)=0\Rightarrow\lambda=2$ or $\lambda=3$ — these are $A$'s eigenvalues.

**Example 3 (LO3 — Cayley-Hamilton theorem, breaking MC-2)**: For $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}$ with $p(\lambda)=\lambda^2-5\lambda+6$, Cayley-Hamilton states $A^2-5A+6I=0$ (the zero matrix). Verify: $A^2=\begin{pmatrix}3&1\\0&2\end{pmatrix}\begin{pmatrix}3&1\\0&2\end{pmatrix}=\begin{pmatrix}9&5\\0&4\end{pmatrix}$. $A^2-5A+6I=\begin{pmatrix}9&5\\0&4\end{pmatrix}-5\begin{pmatrix}3&1\\0&2\end{pmatrix}+6\begin{pmatrix}1&0\\0&1\end{pmatrix}=\begin{pmatrix}9-15+6&5-5+0\\0-0+0&4-10+6\end{pmatrix}=\begin{pmatrix}0&0\\0&0\end{pmatrix}$ ✓. A common error substitutes $A$ for $\lambda$ in the CONSTANT term directly (writing "$+6$" as a bare scalar added to a matrix, which is not a valid matrix operation), rather than correctly using $+6I$ (the constant times the identity matrix) — this substitution rule requires converting every constant term into a matching multiple of the identity matrix.

## Component 5 — Teaching Actions

### Teaching Action A01 — Subtract λ Only from the Diagonal (Primitive P64: Conceptual Shift)

Work Example 1, explicitly forming $A-\lambda I$ entry by entry, showing $\lambda I$ contributes $-\lambda$ to EVERY diagonal position and ZERO to off-diagonal positions.

- **MC-1 hook**: check whether $\lambda$ is subtracted correctly from all and only the diagonal entries.

### Teaching Action A02 — Eigenvalues Are the Polynomial's Roots (Primitive P64: Conceptual Shift, second instance)

Work Example 2, connecting the already-familiar root-finding process directly to the eigenvalue-finding task, reinforcing this concept's practical payoff.

### Teaching Action A03 — Cayley-Hamilton: Constant Term Becomes a Multiple of the Identity (Primitive P06: Contrast Pair)

Work Example 3's full verification, explicitly contrasting the correct $+6I$ substitution against the flawed "add 6 directly" attempt (which isn't even a valid matrix operation, since you can't add a scalar to a matrix). State the rule: "when substituting $A$ for $\lambda$ in the characteristic polynomial, every CONSTANT term must become that constant TIMES the identity matrix $I$ — this is what makes the substitution a valid matrix equation."

- **MC-2 hook**: this directly targets MC-2 (mishandling the constant term's substitution in the Cayley-Hamilton verification).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Construct the characteristic polynomial of $\begin{pmatrix}4&2\\1&3\end{pmatrix}$.
  2. Find the eigenvalues of the matrix from problem 1 by solving $p(\lambda)=0$.
  3. Construct the characteristic polynomial of $\begin{pmatrix}5&0\\0&5\end{pmatrix}$ and find its eigenvalue(s).
  4. State the Cayley-Hamilton theorem for a matrix with characteristic polynomial $\lambda^2-4\lambda+3$, writing out the resulting matrix equation.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to compute $A^3$ for a $2\times2$ matrix $A$ with characteristic polynomial $p(\lambda)=\lambda^2-3\lambda+2$, without directly multiplying $A$ by itself three times. (a) Use the Cayley-Hamilton theorem to express $A^2$ in terms of $A$ and $I$ (i.e., solve $A^2-3A+2I=0$ for $A^2$). (b) Use this expression to find $A^3=A\cdot A^2$ in terms of $A$ and $I$ only, explaining how this Cayley-Hamilton-based approach could be more efficient than directly computing higher powers of $A$ by repeated matrix multiplication."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAMBDA-SUBTRACTED-FROM-WRONG-ENTRIES | Subtracting $\lambda$ from off-diagonal entries, or failing to subtract it from all diagonal entries, when forming $A-\lambda I$ | Foundational |
| MC-2 | CAYLEY-HAMILTON-CONSTANT-TERM-NOT-CONVERTED-TO-IDENTITY-MULTIPLE | Substituting $A$ for $\lambda$ but leaving the constant term as a bare scalar rather than converting it to that scalar times the identity matrix | Foundational |
| MC-3 | CHARACTERISTIC-POLYNOMIAL-DEGREE-MISMATCHED-TO-MATRIX-SIZE | Producing a characteristic polynomial of the wrong degree (not matching the matrix's size $n$), typically from a determinant computation error | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Lambda Subtracted from Wrong Entries") → P41 (detect: present Example 1 and check whether $\lambda$ appears only on the diagonal of $A-\lambda I$) → P64 (conceptual shift: re-derive $\lambda I$ explicitly as a full matrix first, then subtract it entry-by-entry from $A$).
- **B02 (targets MC-2)**: P27 ("Cayley-Hamilton Constant Term Not Converted to Identity Multiple") → P41 (detect: present Example 3 and check whether "+6" or the correct "+6I" is used) → P64 (conceptual shift: re-state that EVERY term of the polynomial, including the constant, must become a matrix — the constant term specifically becomes that number times $I$).
- **B03 (targets MC-3)**: P27 ("Characteristic Polynomial Degree Mismatched to Matrix Size") → P41 (detect: review a submitted characteristic polynomial for the wrong degree relative to the matrix's size) → P64 (conceptual shift: re-derive the determinant computation carefully, verifying the degree of the resulting polynomial matches $n$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.eigenvalues`, `math.linalg.determinant`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.eigenspace` (the eigenvectors found once eigenvalues are known via this polynomial).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept combines determinant computation, root-finding, and the genuinely subtle Cayley-Hamilton substitution rule into one unit.
- MC-2 was ranked most severe alongside MC-1 because it reflects a fundamental confusion about what "substituting a matrix into a polynomial" actually means — treating a constant term as a bare scalar addable to a matrix is not merely an arithmetic slip but a category error about valid matrix operations.
- The matrix-power transfer probe was deliberately chosen because Cayley-Hamilton's practical utility (efficiently computing high matrix powers by reducing them via the theorem) is a genuine computational technique, giving this abstract theorem concrete applied value beyond a verification exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.eigenvalues`, `math.linalg.determinant`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
