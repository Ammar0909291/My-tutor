# Teaching Blueprint: Matrix Inverse (`math.linalg.matrix-inverse`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.matrix-inverse` |
| name | Matrix Inverse |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.matrix-multiplication`, `math.linalg.determinant` |
| unlocks | `math.linalg.cramer-rule` |
| cross_links | `math.abst.group-inverse` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in already-known determinant/multiplication facts |
| description (KG) | A square matrix A is invertible iff det(A)≠0, iff rank(A)=n, iff columns are linearly independent. The inverse A⁻¹ satisfies AA⁻¹=A⁻¹A=I. Computed via [A|I] → [I|A⁻¹] by row reduction. |

## Component 1 — Learning Objectives

- LO1: Define the **inverse** $A^{-1}$ of a square matrix $A$ as the (unique, when it exists) matrix satisfying $AA^{-1}=A^{-1}A=I$, and state the key equivalence: $A$ is invertible **iff** $\det(A)\neq0$ (equivalently, iff rank$(A)=n$, iff the columns are linearly independent).
- LO2: Compute $A^{-1}$ for a $2\times2$ matrix using the direct formula $A^{-1}=\frac{1}{\det(A)}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ for $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, and for larger matrices using **row reduction** on the augmented matrix $[A|I]\to[I|A^{-1}]$.
- LO3: Correctly identify when a matrix is **singular** (non-invertible, $\det(A)=0$) BEFORE attempting to compute an inverse, and explain why row reduction on a singular matrix's augmented form will fail to reach $[I|\ldots]$ — recognizing this failure as diagnostic, not a computational error.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.matrix-multiplication` (computing $AB$, and that matrix multiplication is generally non-commutative) and `math.linalg.determinant` (computing $\det(A)$, and that $\det(A)\neq0$ iff $A$ is invertible — already stated there as a key fact, now put to full use here).

## Component 3 — Core Explanation

For a square matrix $A$, the **inverse** $A^{-1}$ (if it exists) is the unique matrix satisfying:
$$AA^{-1} = A^{-1}A = I$$
($I$ the identity matrix). Not every square matrix has an inverse — $A$ is called **invertible** (or non-singular) exactly when $\det(A)\neq0$; equivalently, when rank$(A)=n$ (full rank), equivalently when its columns are linearly independent. A matrix failing any of these (equivalently, all of these, since they're equivalent conditions) is called **singular**, and has NO inverse.

**Computing the $2\times2$ inverse directly**: for $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$,
$$A^{-1} = \frac{1}{\det(A)}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}, \qquad \det(A)=ad-bc$$
(swap the diagonal entries, negate the off-diagonal entries, divide by the determinant).

**Computing larger inverses via row reduction**: form the augmented matrix $[A|I]$ (matrix $A$ next to the identity, same size), and perform row-reduction operations to transform the LEFT side into $I$ — whatever operations achieve this, applied simultaneously to the right side, transform it into $A^{-1}$: $[A|I]\to[I|A^{-1}]$.

**Row reduction failing to reach $[I|\ldots]$ is diagnostic, not a mistake**: if $A$ is singular ($\det(A)=0$), row reduction will get "stuck" — a row of the left side will become entirely zeros partway through, meaning $I$ can never be reached on the left. This is not a computational error to fix; it's the row-reduction process itself CONFIRMING $A$ has no inverse, exactly matching the $\det(A)=0$ diagnosis.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — the 2×2 formula)**: Find $A^{-1}$ for $A=\begin{pmatrix}3&2\\1&4\end{pmatrix}$. $\det(A)=3(4)-2(1)=10$. $A^{-1}=\frac{1}{10}\begin{pmatrix}4&-2\\-1&3\end{pmatrix}$. Verify: $AA^{-1} = \begin{pmatrix}3&2\\1&4\end{pmatrix}\cdot\frac{1}{10}\begin{pmatrix}4&-2\\-1&3\end{pmatrix} = \frac{1}{10}\begin{pmatrix}12-2&-6+6\\4-4&-2+12\end{pmatrix}=\frac{1}{10}\begin{pmatrix}10&0\\0&10\end{pmatrix}=I$. ✓

**Example 2 (LO3 — recognizing a singular matrix before computing, breaking MC-1)**: Attempt to invert $B=\begin{pmatrix}2&4\\1&2\end{pmatrix}$. Check $\det(B)=2(2)-4(1)=0$ FIRST, before attempting row reduction — since $\det(B)=0$, $B$ is singular and has **no inverse**; attempting the row-reduction procedure would inevitably produce a zero row on the left side, confirming (not contradicting) this conclusion. Checking the determinant first avoids wasted computation.

**Example 3 (LO2 — row reduction for a 3×3 matrix)**: Find $C^{-1}$ for $C=\begin{pmatrix}1&0&2\\0&1&1\\1&1&0\end{pmatrix}$ via $[C|I]\to[I|C^{-1}]$. (Full row-reduction steps: $R_3\to R_3-R_1$ gives row $(0,1,-2)$; then $R_3\to R_3-R_2$ gives $(0,0,-3)$; scale $R_3$ by $-\frac13$; back-substitute to clear above.) The final result is $C^{-1}=\begin{pmatrix}\frac13&\frac23&-\frac13\\\frac13&-\frac13&\frac13\\-\frac13&\frac13&\frac13\end{pmatrix}$ — verified by confirming $CC^{-1}=I$ directly.

## Component 5 — Teaching Actions

### Teaching Action A01 — The 2×2 Inverse Formula, and Verifying $AA^{-1}=I$ (Primitive P11: Representation Shift)

State the defining property directly: "$A^{-1}$ is whatever matrix, multiplied by $A$ (in either order), gives back the identity." Work Example 1's direct 2×2 formula, then VERIFY the result by actually multiplying $AA^{-1}$ and confirming $I$ — emphasizing that the formula is not magic, it's a specific, checkable claim.

Shift representation to row reduction for larger matrices: state the augmented-matrix procedure $[A|I]\to[I|A^{-1}]$ conceptually before working Example 3's full computation.

- **MC-1 hook**: present matrix $B$ from Example 2 and ask "let's compute $B^{-1}$ using row reduction" WITHOUT first checking $\det(B)$ — watch whether the student attempts the full row-reduction procedure blindly, revealing MC-1 (not checking invertibility via the determinant BEFORE attempting to compute an inverse, wasting effort on a matrix that has none).

### Teaching Action A02 — Singular Matrices: Diagnosis, Not Failure (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1 ($\det=10\neq0$, invertible, formula works cleanly) directly beside Example 2 ($\det=0$, singular). State the efficient workflow: "ALWAYS check $\det(A)$ first — if it's zero, stop immediately; there's no inverse to find, and no amount of correct row-reduction technique will produce one."

**Contrast 2**: Briefly demonstrate WHY row reduction gets stuck on a singular matrix — attempting $[B|I]$ for Example 2's $B$, row-reducing partway, and showing a row becomes all zeros on the left before reaching $I$. State: "this isn't a mistake in your row-reduction work — a zero row appearing on the left side IS the row-reduction process itself confirming singularity, exactly matching what the determinant already told you."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find $A^{-1}$ for $A=\begin{pmatrix}5&3\\2&2\end{pmatrix}$ using the 2×2 formula, and verify $AA^{-1}=I$.
  2. Determine whether $B=\begin{pmatrix}4&6\\2&3\end{pmatrix}$ is invertible, by checking $\det(B)$ FIRST, before attempting any row reduction.
  3. Find $C^{-1}$ for $C=\begin{pmatrix}2&0&0\\0&3&0\\0&0&4\end{pmatrix}$ using row reduction (or by recognizing its diagonal structure directly).
  4. Explain what it means, concretely, if row reduction on $[D|I]$ produces an all-zero row on the left side partway through — is this an error to fix, or a conclusion to accept?
- **P76 (Transfer Probe, mode = independence)**: "A system of equations modeling a supply chain is written in matrix form $A\mathbf{x}=\mathbf{b}$, where $A$ encodes the relationships between suppliers and products. Before attempting to solve for $\mathbf{x}$ by computing $A^{-1}\mathbf{b}$, an analyst wants to verify this approach will even work. (a) Using this lesson's invertibility criterion, explain what specific property of $A$ (checkable via the determinant) must hold before $A^{-1}$ exists at all. (b) The analyst computes $\det(A)=0$ — explain what this means for the supply chain system (in terms of the columns of $A$ being linearly DEPENDENT), and why attempting $A^{-1}\mathbf{b}$ is not just difficult but genuinely impossible in this case, rather than a case requiring more computational effort."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INVERTIBILITY-NOT-CHECKED-FIRST | Attempting to compute a matrix inverse (via the 2×2 formula or row reduction) without first checking whether the determinant is nonzero, wasting effort on a singular matrix | Foundational |
| MC-2 | SINGULAR-ROW-REDUCTION-TREATED-AS-ERROR | Believing an all-zero row appearing during row reduction on $[A|I]$ indicates a computational mistake to fix, rather than recognizing it as the correct, diagnostic confirmation that $A$ is singular | Foundational |
| MC-3 | INVERSE-FORMULA-APPLIED-WITHOUT-DIVIDING-BY-DETERMINANT | When using the 2×2 inverse formula, swapping and negating the entries correctly but forgetting to divide the entire result by $\det(A)$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Invertibility Not Pre-Checked") → P41 (detect: present a singular matrix and ask the student to find its inverse, checking whether they compute $\det(A)$ first) → P64 (conceptual shift: re-anchor on "check the determinant FIRST, always — it's a one-line computation that tells you immediately whether the rest of the work is even worth attempting").
- **B02 (targets MC-2)**: P27 (name it: "Singular Row-Reduction Misread as Error") → P41 (detect: present a row-reduction attempt on a singular matrix that produces a zero row, and ask the student what to do next) → P64 (conceptual shift: re-anchor on "a zero row here is the ANSWER, not a mistake — it directly confirms what $\det(A)=0$ already told you: no inverse exists").
- **B03 (targets MC-3)**: P27 (name it: "Determinant Division Omitted") → P41 (detect: check a student's 2×2 inverse computation for the final division-by-determinant step) → P64 (conceptual shift: re-verify by multiplying the (incorrect, undivided) candidate matrix by $A$ directly, showing the result is NOT the identity until the determinant division is applied).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.matrix-multiplication` (needed to verify $AA^{-1}=I$ and to understand the row-reduction procedure's mechanics), `math.linalg.determinant` (the invertibility criterion $\det(A)\neq0$ this entire concept is built around).
- **Unlocks**: `math.linalg.cramer-rule` (Cramer's Rule uses determinants and the inverse relationship to solve linear systems directly).
- **Cross-link**: KG lists `math.abst.group-inverse` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.abst.group-inverse.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's matrix-inverse-existence criterion directly to the general abstract-algebra notion of an inverse element in a group (invertible matrices under multiplication form a group, $GL_n$, with this concept's $A^{-1}$ being exactly that group's inverse operation).

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at the "2 main TAs + gate" compact tier — A01 (the 2×2 formula plus row reduction for larger matrices, with direct verification) and A02 (the singular-matrix diagnosis contrast) jointly cover all three LOs.
- MC-1 (invertibility not checked first) and MC-2 (singular row-reduction treated as error) were deliberately paired as this blueprint's central focus, since they represent two stages of the SAME underlying gap — failing to check $\det(A)$ first (MC-1) naturally leads to encountering the zero-row situation during row reduction and then misinterpreting it (MC-2); addressing both together, with Example 2/Contrast pairing showing the SAME matrix diagnosed two ways (determinant check, then row-reduction confirmation), was judged more effective than treating them as unrelated errors.
- The supply-chain transfer probe was chosen because linear-dependence-of-columns (the KG's own third equivalent invertibility condition) has an intuitive real-world translation — a supply chain where one supplier's relationships can be expressed as a combination of others' (linear dependence) genuinely cannot be uniquely "inverted" to recover individual contributions, giving the abstract equivalence conditions concrete stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.abst.group-inverse` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known determinant/multiplication facts) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
