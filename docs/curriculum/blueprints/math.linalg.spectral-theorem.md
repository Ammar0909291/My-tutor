# Teaching Blueprint: Spectral Theorem (`math.linalg.spectral-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.spectral-theorem` |
| name | Spectral Theorem |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.linalg.symmetric-matrix`, `math.linalg.eigenvalues`, `math.linalg.orthogonal-basis` |
| unlocks | `math.linalg.positive-definite` |
| cross_links | `math.fnal.spectral-theory` (unauthored — see Component 7) |
| CPA_entry_stage | A (Abstract) — direct synthesis of three already-mastered concepts into one factorization theorem |
| description (KG) | Every real symmetric (or complex Hermitian) matrix is orthogonally (unitarily) diagonalizable: A=QΛQᵀ with Q orthogonal and Λ real diagonal. Eigenvalues are real; eigenvectors from different eigenspaces are orthogonal. |

## Component 1 — Learning Objectives

- LO1: State the **Spectral Theorem** precisely: every real symmetric matrix $A$ can be written as $A=Q\Lambda Q^T$, where $Q$ is an **orthogonal** matrix (its columns are an orthonormal set of eigenvectors of $A$) and $\Lambda$ is a **real diagonal** matrix (of $A$'s eigenvalues) — directly delivering the full statement that `math.linalg.symmetric-matrix` only previewed at orientation level.
- LO2: Construct the factorization $A=Q\Lambda Q^T$ explicitly for a given symmetric matrix, by finding its eigenvalues and (normalized) eigenvectors and assembling them into $Q$ and $\Lambda$ — directly reusing `math.linalg.eigenvalues`'s computation and `math.linalg.orthogonal-basis`'s normalization procedure.
- LO3: Recognize why $Q$ being **orthogonal** ($Q^T=Q^{-1}$) is the crucial structural fact that makes this factorization special compared to diagonalizing a general (non-symmetric) matrix — directly refuting the misconception that any diagonalizable matrix's diagonalization $A=PDP^{-1}$ is "basically the same thing" as the Spectral Theorem's $A=Q\Lambda Q^T$, when computing $P^{-1}$ in general requires real work, while $Q^{-1}=Q^T$ is free.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.symmetric-matrix` ($A=A^T$, and the orientation-level preview that symmetric matrices have real eigenvalues and orthogonal eigenvectors for different eigenvalues), `math.linalg.eigenvalues` ($Av=\lambda v$, finding eigenvalues via $\det(A-\lambda I)=0$), and `math.linalg.orthogonal-basis` (normalizing vectors to unit length, and the direct-coordinate formula $\text{proj}=\sum\langle v,e_i\rangle e_i$ for an orthonormal basis).

## Component 3 — Core Explanation

**The full statement, delivering on the earlier preview**: `math.linalg.symmetric-matrix` stated (at orientation level, without proof) that a symmetric matrix's eigenvalues are real and its eigenvectors (for different eigenvalues) are orthogonal. The Spectral Theorem packages this into a complete FACTORIZATION: $A = Q\Lambda Q^T$, where the COLUMNS of $Q$ are an orthonormal set of $A$'s eigenvectors (normalized to unit length), and $\Lambda$ is the diagonal matrix of the corresponding eigenvalues, in matching order. This says $A$ is not merely diagonalizable in the general sense — it is diagonalizable using an ORTHOGONAL change-of-basis matrix specifically.

**Constructing the factorization**: find $A$'s eigenvalues via the characteristic equation $\det(A-\lambda I)=0$ (`math.linalg.eigenvalues`), find the corresponding eigenvectors, NORMALIZE each to unit length (`math.linalg.orthogonal-basis`'s normalization step), and assemble the normalized eigenvectors as the columns of $Q$ (in the same order as the corresponding eigenvalues down the diagonal of $\Lambda$). Since $A$ is symmetric, eigenvectors from DIFFERENT eigenvalues are automatically orthogonal (the fact stated at orientation level in `math.linalg.symmetric-matrix`), so $Q$'s columns form a genuine orthonormal set — verifying $Q$ is orthogonal, i.e. $Q^TQ=I$.

**Why orthogonality of Q is the crucial, special fact**: for a GENERAL diagonalizable matrix, the diagonalization $A=PDP^{-1}$ requires computing $P^{-1}$ — genuinely nontrivial matrix inversion work in general. But for a symmetric matrix's factorization $A=Q\Lambda Q^T$, because $Q$ is orthogonal, $Q^{-1}=Q^T$ EXACTLY — the inverse is simply the transpose, requiring NO computation beyond what was already needed to build $Q$ itself. This is not a minor convenience; it's the structural reason symmetric matrices are so computationally favorable (and why the Spectral Theorem, not general diagonalizability, is the headline result for this matrix class).

## Component 4 — Worked Examples

**Example 1 (LO2 — constructing the full factorization)**: For $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ (symmetric, matching `math.linalg.symmetric-matrix`'s own Example 2), the eigenvalues are $\lambda=1,3$ with (unnormalized) eigenvectors $v_1=(1,-1)$ for $\lambda=1$ and $v_2=(1,1)$ for $\lambda=3$. Normalizing: $e_1 = \frac{1}{\sqrt2}(1,-1)$, $e_2=\frac{1}{\sqrt2}(1,1)$. Assembling: $Q=\begin{pmatrix}1/\sqrt2&1/\sqrt2\\-1/\sqrt2&1/\sqrt2\end{pmatrix}$, $\Lambda=\begin{pmatrix}1&0\\0&3\end{pmatrix}$. Verify $A=Q\Lambda Q^T$ directly by multiplying out (confirming the product reconstructs the original $A$).

**Example 2 (LO3 — Q's orthogonality means Q⁻¹=Qᵀ is free, breaking MC-1)**: Continuing Example 1, verify $Q^TQ=I$ directly: $Q^TQ = \begin{pmatrix}1/\sqrt2&-1/\sqrt2\\1/\sqrt2&1/\sqrt2\end{pmatrix}\begin{pmatrix}1/\sqrt2&1/\sqrt2\\-1/\sqrt2&1/\sqrt2\end{pmatrix} = \begin{pmatrix}1&0\\0&1\end{pmatrix}$ ✓ — confirming $Q^{-1}=Q^T$ exactly, with NO matrix inversion computation required beyond transposing. Contrast with a general (non-symmetric) diagonalizable matrix, e.g. $B=\begin{pmatrix}2&1\\0&3\end{pmatrix}$: its eigenvectors are $(1,0)$ for $\lambda=2$ and $(1,1)$ for $\lambda=3$, giving $P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ — but $P^TP = \begin{pmatrix}1&1\\1&2\end{pmatrix}\ne I$, so $P$ is NOT orthogonal, and $P^{-1}$ genuinely requires computing $\begin{pmatrix}1&-1\\0&1\end{pmatrix}$ via actual matrix inversion — real extra work the symmetric case never needed.

**Example 3 (LO1 — real eigenvalues and orthogonal eigenvectors as guaranteed consequences, verified)**: For the symmetric $A$ from Example 1, both eigenvalues ($1,3$) are real (as guaranteed), and the eigenvectors $(1,-1)$ and $(1,1)$ satisfy $(1,-1)\cdot(1,1) = 1-1=0$ — genuinely orthogonal, confirming both headline consequences of symmetry hold exactly as `math.linalg.symmetric-matrix` promised, now delivered as part of a COMPLETE, constructive factorization rather than an isolated stated fact.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Full Factorization, Delivering the Earlier Promise (Primitive P11: Representation Shift)

State: "back in `math.linalg.symmetric-matrix`, you were told (without full derivation) that symmetric matrices have real eigenvalues and orthogonal eigenvectors. Here's the complete package: $A=Q\Lambda Q^T$, built directly from those eigenvalues and eigenvectors." Work Example 1's full construction, reusing that concept's own example matrix.

### Teaching Action A02 — Q's Orthogonality: Free Inverse, Not a Minor Convenience (Primitive P28: Conflict Evidence)

Present Example 2's direct contrast: verifying $Q^TQ=I$ for the symmetric case (no extra work), versus the general diagonalizable matrix $B$ whose change-of-basis matrix $P$ genuinely requires computing $P^{-1}$ via real matrix inversion. State: "this is THE structural reason symmetric matrices get special treatment — orthogonality of $Q$ means the 'hard part' of ordinary diagonalization (computing the inverse) is free here."

- **MC-1 hook**: ask "is the Spectral Theorem's factorization $A=Q\Lambda Q^T$ basically the same idea as ordinary diagonalization $A=PDP^{-1}$ for any diagonalizable matrix?" — a "yes, basically the same" answer reveals MC-1 (missing that $Q$'s orthogonality — giving $Q^{-1}=Q^T$ for free — is the genuinely special, non-generic feature that distinguishes this theorem from ordinary diagonalizability).

### Teaching Action A03 — Verifying the Guaranteed Consequences Directly (Primitive P11: Representation Shift)

Work Example 3's direct verification of both real eigenvalues and orthogonal eigenvectors on the concrete example, connecting back explicitly to the orientation-level claims from `math.linalg.symmetric-matrix`.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the eigenvalues and normalized eigenvectors of $A=\begin{pmatrix}3&2\\2&3\end{pmatrix}$, and assemble the full factorization $A=Q\Lambda Q^T$.
  2. Verify $Q^TQ=I$ for your $Q$ from problem 1.
  3. Verify (by direct matrix multiplication) that $Q\Lambda Q^T$ from problem 1 reconstructs the original matrix $A$.
  4. Explain, in your own words, why computing $Q^{-1}$ for the Spectral Theorem's factorization never requires genuine matrix inversion work, referencing Example 2's contrast with the general diagonalizable case.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.fnal.spectral-theory` is not yet authored; a future revision may add a genuine cross-link probe into the general (possibly infinite-dimensional) spectral theory framework once that entry exists)**: "A physicist working with a symmetric matrix representing a quantum mechanical observable needs to both (a) find the matrix's eigenvalues (representing possible measurement outcomes) and (b) efficiently convert between the 'standard basis' and the 'eigenbasis' representation of quantum states, which requires computing $Q^{-1}$ repeatedly. (a) Explain why the Spectral Theorem guarantees this observable matrix can be factored as $Q\Lambda Q^T$ in the first place, citing the property of the matrix that makes this guaranteed. (b) Explain why the physicist's repeated need to compute $Q^{-1}$ is computationally trivial here, in a way it would NOT be for an arbitrary (non-symmetric) matrix representing some other physical quantity. (c) Explain what would go wrong — specifically, which step of the Spectral Theorem's guarantee would fail — if the physicist mistakenly tried to apply this same easy-inverse reasoning to a general non-symmetric matrix."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SPECTRAL-THEOREM-CONFLATED-WITH-ORDINARY-DIAGONALIZATION | Believing the Spectral Theorem's $A=Q\Lambda Q^T$ is basically the same as ordinary diagonalization $A=PDP^{-1}$ for any diagonalizable matrix, missing that Q's orthogonality (giving a free inverse) is the genuinely special feature | Foundational |
| MC-2 | EIGENVECTOR-NORMALIZATION-STEP-OMITTED | Assembling $Q$ from unnormalized eigenvectors (not scaled to unit length), producing a matrix that is not actually orthogonal | Foundational |
| MC-3 | SAME-EIGENVALUE-EIGENVECTORS-ASSUMED-AUTOMATICALLY-ORTHOGONAL | Assuming eigenvectors corresponding to the SAME (repeated) eigenvalue are automatically orthogonal to each other, when in fact only eigenvectors from DIFFERENT eigenvalues are guaranteed orthogonal by symmetry alone (same-eigenvalue eigenvectors may need an extra orthogonalization step, e.g. Gram-Schmidt) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Spectral-Theorem-as-Ordinary-Diagonalization Conflation") → P41 (detect: ask whether computing $Q^{-1}$ in the Spectral Theorem requires the same work as computing $P^{-1}$ in general diagonalization) → P64 (conceptual shift: re-walk Example 2's direct contrast — $Q^TQ=I$ trivially for the symmetric case, versus genuine matrix inversion for the non-symmetric case — re-anchoring on "orthogonality of $Q$ is the special, guaranteed feature here, not a coincidence of the example").
- **B02 (targets MC-2)**: P27 (name it: "Eigenvector Normalization Omitted") → P41 (detect: ask a student to assemble $Q$ and check whether they use the raw eigenvectors, e.g. $(1,-1)$, rather than the normalized $\frac{1}{\sqrt2}(1,-1)$) → P64 (conceptual shift: re-walk Example 1's explicit normalization step, re-anchoring on "$Q$ orthogonal means UNIT-length columns, not just mutually perpendicular ones — normalize before assembling").
- **B03 (targets MC-3)**: P27 (name it: "Same-Eigenvalue Eigenvectors Assumed Orthogonal") → P41 (detect: ask whether two eigenvectors sharing the SAME eigenvalue are automatically guaranteed orthogonal by the symmetric-matrix property alone) → P64 (conceptual shift: re-anchor on "the guarantee is specifically for DIFFERENT eigenvalues — eigenvectors within the same eigenspace (repeated eigenvalue) may need to be explicitly chosen orthogonally, e.g. via Gram-Schmidt, since the theorem's automatic guarantee doesn't cover that case").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.symmetric-matrix` ($A=A^T$ and the orientation-level preview this concept fully delivers on), `math.linalg.eigenvalues` (the eigenvalue/eigenvector computation this factorization is built from), `math.linalg.orthogonal-basis` (the normalization and orthonormal-basis machinery used to construct $Q$).
- **Unlocks**: `math.linalg.positive-definite` (positive-definiteness is defined directly in terms of the sign of a symmetric matrix's eigenvalues, exactly as organized by this factorization).
- **Cross-link**: KG lists `math.fnal.spectral-theory` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.fnal.spectral-theory.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the general (possibly infinite-dimensional) spectral theory framework once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/understand tag places this at a "3 TAs + gate" tier — A01 (the full factorization statement), A02 (why Q's orthogonality is special), and A03 (verifying the guaranteed consequences) each target a distinct LO, appropriate for a capstone concept synthesizing three already-mastered prerequisites into one named theorem.
- This blueprint deliberately reuses `math.linalg.symmetric-matrix`'s own worked example matrix ($\begin{pmatrix}2&1\\1&2\end{pmatrix}$) throughout Examples 1-3, both to reinforce that concept and to make vivid that this concept is DELIVERING on a promise made there (real eigenvalues, orthogonal eigenvectors), not introducing an unrelated new topic.
- Example 2's contrast with a general non-symmetric diagonalizable matrix was deliberately included as its own dedicated example (rather than a passing remark) because MC-1 (conflating this theorem with ordinary diagonalization) is the single most likely way a student under-appreciates why symmetric matrices receive dedicated theoretical attention at all.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all 3) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.fnal.spectral-theory not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct synthesis of three already-mastered concepts) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
