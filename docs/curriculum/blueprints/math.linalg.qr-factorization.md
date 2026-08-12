# Teaching Blueprint: QR Factorization (`math.linalg.qr-factorization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.qr-factorization` |
| name | QR Factorization |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.linalg.gram-schmidt` |
| unlocks | (none in KG) |
| cross_links | `math.num.qr-algorithm` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A = QR where Q is orthogonal (Qᵀ=Q⁻¹) and R is upper triangular. Computed by Gram-Schmidt or Householder reflections. Used for least squares, eigenvalue computation (QR algorithm).

 |

## Component 1 — Learning Objectives

- LO1: Construct the QR factorization $A=QR$ of a matrix $A$ (with linearly independent columns) by applying Gram-Schmidt to $A$'s columns to get $Q$'s orthonormal columns, then computing $R$ as the matrix of projection coefficients.
- LO2: State that $Q$ is ORTHOGONAL ($Q^T=Q^{-1}$) and $R$ is UPPER TRIANGULAR — and recognize that $R$'s upper-triangular structure comes DIRECTLY from Gram-Schmidt's sequential construction (each new orthonormalized vector depends only on the PREVIOUS columns, never later ones).
- LO3: Use QR factorization's practical applications — solving least-squares problems ($Ax\approx b$ becomes the directly solvable $Rx=Q^Tb$) — WITHOUT needing to explicitly compute $A^{-1}$ or the more numerically unstable normal equations $A^TA$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.gram-schmidt` (the orthonormalization process that directly produces $Q$'s columns and $R$'s entries).

## Component 3 — Core Explanation

**QR factorization** decomposes a matrix $A$ (with linearly independent columns) as $A=QR$, where $Q$ is an ORTHOGONAL matrix ($Q^TQ=I$, so $Q^T=Q^{-1}$) and $R$ is UPPER TRIANGULAR.

This factorization comes directly from applying Gram-Schmidt to $A$'s columns $a_1,\ldots,a_n$: $Q$'s columns are the resulting orthonormal vectors $q_1,\ldots,q_n$, and $R$'s entries are the projection coefficients used along the way — specifically $R_{ij}=q_i\cdot a_j$ for $i\le j$ (and 0 for $i>j$, since Gram-Schmidt's $i$-th orthonormal vector $q_i$ is built ONLY from $a_1,\ldots,a_i$, never depending on later columns $a_j$ for $j>i$ — this is exactly why $R$ ends up upper triangular).

A major practical use: solving a least-squares problem $Ax\approx b$ (when $Ax=b$ has no exact solution, e.g. an overdetermined system). Substituting $A=QR$: $QRx\approx b\implies Rx\approx Q^Tb$ (multiplying both sides by $Q^T$, using $Q^TQ=I$) — and since $R$ is upper triangular, $Rx=Q^Tb$ can be solved directly by BACK-SUBSTITUTION, avoiding the numerically less stable route through the normal equations $A^TAx=A^Tb$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — constructing Q and R, breaking MC-1)**: Factor $A=\begin{pmatrix}1&1\\1&0\\0&1\end{pmatrix}$ (columns $a_1=(1,1,0)$, $a_2=(1,0,1)$). Gram-Schmidt: $q_1=a_1/|a_1|=(1,1,0)/\sqrt2$. Projection coefficient $R_{11}=q_1\cdot a_1=\sqrt2$, $R_{12}=q_1\cdot a_2=1/\sqrt2$. Subtract the projection: $a_2-(q_1\cdot a_2)q_1=(1,0,1)-\frac{1}{\sqrt2}\cdot\frac{(1,1,0)}{\sqrt2}=(1,0,1)-(1/2,1/2,0)=(1/2,-1/2,1)$, normalize to get $q_2$. $R_{22}=$ this remainder's norm; $R_{21}=0$ (upper triangular, by construction). A common error tries to compute $R_{21}$ (below the diagonal) as if it were a genuine projection coefficient, rather than recognizing it must be EXACTLY 0 by the very structure of how Gram-Schmidt builds $q_2$ (orthogonal to $q_1$ by construction).

**Example 2 (LO2 — verifying orthogonality of Q)**: Confirm $Q^TQ=I$ for the $Q$ built in Example 1 (columns $q_1,q_2$, both unit length and orthogonal to each other by Gram-Schmidt's construction) — $Q^TQ=\begin{pmatrix}q_1\cdot q_1&q_1\cdot q_2\\q_2\cdot q_1&q_2\cdot q_2\end{pmatrix}=\begin{pmatrix}1&0\\0&1\end{pmatrix}=I$, confirming $Q^T=Q^{-1}$.

**Example 3 (LO3 — least squares via QR, breaking MC-2)**: Solve the least-squares problem $Ax\approx b$ using $A=QR$ from Example 1's factorization and some vector $b$. Compute $Q^Tb$ (a simple matrix-vector product), then solve $Rx=Q^Tb$ by BACK-SUBSTITUTION (since $R$ is upper triangular, solve for the LAST unknown first, then substitute upward). A common error attempts to solve $Rx=Q^Tb$ using GENERAL Gaussian elimination (forward elimination) rather than recognizing that $R$'s upper-triangular structure allows the much simpler and more efficient BACK-substitution shortcut directly, without any further row operations.

## Component 5 — Teaching Actions

### Teaching Action A01 — R's Upper-Triangular Structure Comes from Gram-Schmidt's Sequential Order (Primitive P64: Conceptual Shift)

Work Example 1, explicitly connecting each entry of $R$ to a specific Gram-Schmidt projection step, and explaining WHY entries below the diagonal are forced to be exactly 0.

- **MC-1 hook**: check whether below-diagonal $R$ entries are correctly recognized as exactly 0 by construction, not merely "small" or "approximately zero."

### Teaching Action A02 — Verifying Q's Orthogonality Directly (Primitive P77 sub-step reused as demonstration)

Work Example 2, computing $Q^TQ$ explicitly to confirm the identity matrix results.

### Teaching Action A03 — Back-Substitution Is the Efficient Solve for Upper-Triangular R (Primitive P11: Representation Shift)

Work Example 3, contrasting general Gaussian elimination (unnecessary extra work) against direct back-substitution (the efficient shortcut R's structure enables).

- **MC-2 hook**: this directly targets MC-2 (not recognizing that $R$'s upper-triangular form allows a simpler back-substitution solve).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given the Gram-Schmidt vectors $q_1,q_2$ for columns $a_1,a_2$ of a matrix $A$, write down $R$'s four entries in terms of the appropriate dot products.
  2. Explain, in one sentence, why $R_{21}=0$ is guaranteed by Gram-Schmidt's construction (not just a numerical coincidence).
  3. Given $Q^Tb=(3,-1)$ and $R=\begin{pmatrix}2&1\\0&4\end{pmatrix}$, solve $Rx=Q^Tb$ by back-substitution.
  4. Explain why solving a least-squares problem via QR factorization is generally preferred over directly forming and solving the normal equations $A^TAx=A^Tb$.
- **P76 (Transfer Probe, mode = independence)**: "A structural engineer has more strain-gauge sensor readings (5 equations) than unknown stress parameters (3 unknowns) — an overdetermined system $Ax\approx b$ with no exact solution, requiring a least-squares fit. (a) Explain how QR factorization of the $5\times3$ matrix $A$ turns this into a directly solvable triangular system, and identify which step (computing $Q^Tb$, or solving $Rx=Q^Tb$) is the back-substitution step. (b) Explain, in practical engineering terms, why the QR approach is preferred over normal equations when working with real sensor data that may contain small measurement errors — connecting to numerical stability."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | R-BELOW-DIAGONAL-ENTRIES-NOT-RECOGNIZED-AS-EXACTLY-ZERO-BY-CONSTRUCTION | Treating R's below-diagonal entries as needing computation or as merely "small," rather than recognizing they are exactly 0 by Gram-Schmidt's sequential construction | Foundational |
| MC-2 | GENERAL-ELIMINATION-USED-INSTEAD-OF-BACK-SUBSTITUTION-FOR-UPPER-TRIANGULAR-R | Solving Rx=Q^Tb via general Gaussian elimination instead of the simpler, more efficient back-substitution that R's upper-triangular structure directly enables | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("R Below-Diagonal Entries Not Recognized as Exactly Zero by Construction") → P41 (detect: present Example 1 and check whether $R_{21}$ is treated as needing computation) → P64 (conceptual shift: re-derive why $q_2$ is orthogonal to $q_1$ by Gram-Schmidt's own subtraction step, forcing $R_{21}=q_2\cdot a_1$-type entries to vanish).
- **B02 (targets MC-2)**: P27 ("General Elimination Used Instead of Back-Substitution for Upper-Triangular R") → P41 (detect: present Example 3 and check whether unnecessary row operations are performed) → P64 (conceptual shift: re-solve using back-substitution directly, solving for the last variable first).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.gram-schmidt`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.lu-factorization` (another matrix factorization technique, contrasting triangular structure origin).
- **Cross-links**: `math.num.qr-algorithm` (QR factorization is the core repeated step in the iterative QR algorithm for eigenvalue computation).

## Component 8 — Teaching Notes

- difficulty = expert and estimated_hours = 5 reflect that this concept synthesizes Gram-Schmidt into a genuinely useful factorization with real numerical-computing applications (least squares, eigenvalue algorithms).
- MC-2 was ranked Moderate (not Foundational) because using general elimination instead of back-substitution still produces a CORRECT answer, just inefficiently — unlike MC-1, which if mishandled could lead to genuinely wrong reasoning about R's structure.
- The structural-engineering transfer probe was deliberately chosen because least-squares fitting from noisy real-world sensor data is one of QR factorization's most concrete and widely-used applications, and directly previews the numerical-stability theme central to `math.num.qr-algorithm`.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.gram-schmidt`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.num.qr-algorithm`) |
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
