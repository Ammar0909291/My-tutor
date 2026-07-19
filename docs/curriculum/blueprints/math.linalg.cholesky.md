# Teaching Blueprint: Cholesky Decomposition (`math.linalg.cholesky`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.cholesky` |
| name | Cholesky Decomposition |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.linalg.positive-definite`, `math.linalg.lu-factorization` |
| unlocks | none |
| cross_links | `math.num.cholesky` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has positive-definiteness and LU factorization; the specialization to $A=LL^T$ is introduced directly |
| description (KG) | A positive definite matrix $A=LL^T$ where $L$ is lower triangular with positive diagonal. More efficient than LU for symmetric positive definite systems (half the work). Widely used in numerical linear algebra. |

## Component 1 — Learning Objectives

- LO1: Recognize that for a SYMMETRIC positive definite matrix $A$ (from `math.linalg.positive-definite`), the general LU factorization $A=LU$ (from `math.linalg.lu-factorization`) SPECIALIZES to $A=LL^T$ — a single lower-triangular factor $L$ with positive diagonal entries, exploiting symmetry to avoid storing $L$ and $U$ separately.
- LO2: Compute the Cholesky factor $L$ for a small symmetric positive definite matrix directly via the recursive column-by-column formulas, and VERIFY $LL^T=A$.
- LO3 (orientation level — full complexity analysis deferred): recognize, without full derivation, that Cholesky is roughly HALF the computational work of general LU factorization on the same matrix, because symmetry lets $L$ alone encode all the information $L$ and $U$ together would otherwise carry, deferred to `math.num.cholesky`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.positive-definite` (the definition $x^TAx>0$ for all nonzero $x$, and its equivalent characterizations) and `math.linalg.lu-factorization` (the general $A=LU$ factorization, its bookkeeping-of-elimination-multipliers construction, and its two-triangular-solve payoff).

## Component 3 — Core Explanation

**Cholesky is $A=LU$ specialized by symmetry, not a separate factorization method**: `math.linalg.lu-factorization` factors ANY (suitably pivotable) matrix as $A=LU$, with $L$ lower triangular (unit diagonal) and $U$ upper triangular. When $A$ is additionally SYMMETRIC and positive definite, it can be shown that $U$ is always a positive multiple of $L^T$ — specifically, $U=DL^T$ for a diagonal matrix $D$ of positive entries (following from $A=A^T$ applied to $A=LDL^T$), and absorbing $\sqrt{D}$ into $L$ gives the single-factor form $A=LL^T$ with $L$'s diagonal entries now positive. Symmetry is what makes storing ONE triangular factor sufficient instead of two.

**Computing $L$ directly via recursive formulas**: rather than running general LU elimination and then symmetrizing, $L$'s entries can be computed directly, column by column: $L_{11}=\sqrt{A_{11}}$; for $i>1$, $L_{i1}=A_{i1}/L_{11}$; and in general each diagonal entry $L_{jj}=\sqrt{A_{jj}-\sum_{k<j}L_{jk}^2}$ (guaranteed to have a positive quantity under the square root exactly because $A$ is positive definite), with off-diagonal entries $L_{ij}=\frac{1}{L_{jj}}\left(A_{ij}-\sum_{k<j}L_{ik}L_{jk}\right)$ for $i>j$.

**Half the work of general LU (orientation level)**: because $A=LL^T$ needs only $L$ (not a separate $U$), and $L$'s entries can be computed using only the LOWER triangle of $A$ (the upper triangle is redundant information under symmetry), Cholesky decomposition takes roughly HALF the arithmetic operations of general LU factorization on the same size matrix. Full operation-counting is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — recognizing $A=LU$ specializing under symmetry, breaking MC-1)**: for the symmetric positive definite matrix $A=\begin{pmatrix}4&2\\2&5\end{pmatrix}$ (verified positive definite via `math.linalg.positive-definite`'s leading-principal-minors test: $4>0$ and $\det A=20-4=16>0$), ordinary LU factorization (via `math.linalg.lu-factorization`) gives $L_0=\begin{pmatrix}1&0\\0.5&1\end{pmatrix}$, $U=\begin{pmatrix}4&2\\0&4\end{pmatrix}$. Observe $U=DL_0^T$ with $D=\begin{pmatrix}4&0\\0&4\end{pmatrix}$: indeed $DL_0^T=\begin{pmatrix}4&0\\0&4\end{pmatrix}\begin{pmatrix}1&0.5\\0&1\end{pmatrix}=\begin{pmatrix}4&2\\0&4\end{pmatrix}=U$ ✓. Absorbing $\sqrt{D}=\begin{pmatrix}2&0\\0&2\end{pmatrix}$ into $L_0$ gives the Cholesky factor $L=L_0\sqrt{D}=\begin{pmatrix}2&0\\1&2\end{pmatrix}$ — this is exactly the symmetrized specialization of the general LU factorization already computed.

**Example 2 (LO2 — computing $L$ directly via the recursive formulas, breaking MC-2)**: for the SAME $A=\begin{pmatrix}4&2\\2&5\end{pmatrix}$, apply the direct formulas: $L_{11}=\sqrt{4}=2$; $L_{21}=A_{21}/L_{11}=2/2=1$; $L_{22}=\sqrt{A_{22}-L_{21}^2}=\sqrt{5-1}=2$. This gives $L=\begin{pmatrix}2&0\\1&2\end{pmatrix}$ — matching Example 1's result exactly, but obtained directly without running general elimination first. Verifying: $LL^T=\begin{pmatrix}2&0\\1&2\end{pmatrix}\begin{pmatrix}2&1\\0&2\end{pmatrix}=\begin{pmatrix}4&2\\2&5\end{pmatrix}=A$ ✓.

**Example 3 (LO3, orientation level — half the work, breaking MC-3)**: for a $3\times3$ symmetric positive definite matrix, general LU factorization computes and stores BOTH a full lower-triangular $L$ (3 nontrivial multiplier entries) and a full upper-triangular $U$ (6 entries, including the diagonal) — 9 stored numbers beyond the trivial unit diagonal of $L$. Cholesky, by contrast, computes and stores ONLY the lower-triangular $L$ (6 entries total, including its own diagonal) — roughly half as many numbers to compute and store, because $L^T$ is never separately computed; it is simply $L$'s transpose, free of additional work. This pattern of "half the storage, half the arithmetic" scales up for larger matrices, though the precise operation count is not derived here.

## Component 5 — Teaching Actions

### Teaching Action A01 — Cholesky Is LU Specialized By Symmetry, Not a New Method (Primitive P11: Representation Shift)

State: "you're not learning a brand-new factorization technique — symmetry lets the general $A=LU$ you already know collapse into a single factor $L$ with $A=LL^T$." Walk Example 1's derivation of $U=DL_0^T$ from ordinary LU output.

- **MC-1 hook**: ask "is Cholesky decomposition an entirely separate factorization method from LU factorization?" — a "yes" answer reveals MC-1 (missing that Cholesky is exactly LU factorization specialized by symmetry into a single triangular factor).

### Teaching Action A02 — $L$ Can Be Computed Directly, Without Running LU First (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the recursive formulas produced the identical $L$ as Example 1's symmetrization route, without ever running general elimination. State: "in practice, you never actually run LU first and then symmetrize — the recursive column formulas compute $L$ directly, in one pass."

- **MC-2 hook**: ask "must you run general LU factorization first and then symmetrize to obtain the Cholesky factor $L$?" — a "yes" answer reveals MC-2 (missing that $L$'s entries can be computed directly via the recursive formulas, without a separate LU step).

### Teaching Action A03 — One Triangular Factor Is Genuinely Cheaper Than Two (Primitive P06: Contrast Pair)

Contrast general LU's TWO stored triangular factors ($L$ and $U$, Example 3's 9-number count) against Cholesky's single stored factor $L$ (6-number count). State: "storing and computing only $L$ — with $L^T$ coming for free by transposition — is genuinely less work than computing $L$ and $U$ separately, which is exactly why Cholesky is preferred whenever $A$ is symmetric positive definite."

- **MC-3 hook**: ask "does Cholesky decomposition require roughly the same amount of computational work as general LU factorization on the same matrix?" — a "yes" answer reveals MC-3 (missing that computing only one triangular factor, with the other coming free by transposition, is roughly half the work).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $A=\begin{pmatrix}9&3\\3&5\end{pmatrix}$, verify positive-definiteness via leading principal minors, then compute the Cholesky factor $L$ directly using the recursive formulas.
  2. Verify $LL^T=A$ for your answer to problem 1.
  3. Explain why the Cholesky factor's diagonal entries are guaranteed to be REAL and POSITIVE (rather than requiring a complex square root) whenever $A$ is genuinely positive definite.
  4. Without full derivation, explain why Cholesky decomposition uses roughly half the arithmetic of general LU factorization for the same symmetric matrix.
- **P76 (Transfer Probe, mode = independence)**: "A structural engineering system produces a symmetric positive definite stiffness matrix $K=\begin{pmatrix}16&4\\4&5\end{pmatrix}$ that must be factored repeatedly for different load vectors across a design iteration. (a) Verify $K$ is positive definite. (b) Compute its Cholesky factor $L$ directly via the recursive formulas. (c) Explain, citing both the symmetry-specialization argument and the half-the-work argument, why an engineer would deliberately choose Cholesky over general LU factorization for this matrix, given that $K$ is known in advance to be symmetric positive definite."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHOLESKY-ASSUMED-SEPARATE-METHOD | Believing Cholesky decomposition is an entirely separate factorization technique, missing that it is LU factorization specialized by symmetry into a single triangular factor | Foundational |
| MC-2 | CHOLESKY-ASSUMED-TO-REQUIRE-LU-FIRST | Believing the Cholesky factor $L$ must be obtained by running general LU factorization first and then symmetrizing, missing that $L$ can be computed directly via recursive formulas | High |
| MC-3 | CHOLESKY-ASSUMED-SAME-COST-AS-LU | Believing Cholesky decomposition costs roughly the same computational work as general LU factorization, missing that computing only one triangular factor is roughly half the work | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Cholesky Assumed Separate Method") → P41 (detect: ask whether Cholesky decomposition is an entirely separate factorization technique from LU) → P64 (conceptual shift: re-walk Example 1's symmetrization derivation, re-anchoring on "Cholesky is LU specialized by symmetry into one factor").
- **B02 (targets MC-2)**: P27 (name it: "Cholesky Assumed to Require LU First") → P41 (detect: ask whether general LU factorization must be run first to obtain $L$) → P64 (conceptual shift: re-walk Example 2's direct recursive computation, re-anchoring on "$L$ can be computed directly, in one pass, without a separate LU step").
- **B03 (targets MC-3)**: P27 (name it: "Cholesky Assumed Same Cost as LU") → P41 (detect: ask whether Cholesky costs roughly the same as general LU on the same matrix) → P64 (conceptual shift: re-walk Example 3's storage-count contrast, re-anchoring on "one triangular factor, with the other free by transposition, is roughly half the work").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.positive-definite` (the definition and leading-principal-minors test certifying $A$'s positive-definiteness, the precondition for Cholesky's real positive diagonal) and `math.linalg.lu-factorization` (the general $A=LU$ factorization this concept specializes by symmetry).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.num.cholesky`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the symmetrization derivation and the direct recursive computation) and LO3 kept orientation-level, appropriately surveying the half-the-work claim without deriving precise operation counts.
- **Division of labor**: `math.linalg.lu-factorization` owns the general $A=LU$ construction and its elimination-bookkeeping insight; this concept owns the SPECIALIZATION exploiting symmetry into $A=LL^T$ and the direct recursive computation formulas — deliberately reusing the SAME $2\times2$ matrix $\begin{pmatrix}4&2\\2&5\end{pmatrix}$ across Examples 1 and 2 so the symmetrization route and the direct-formula route are shown to agree on one concrete case.
- Example 3's deliberate choice of comparing STORAGE counts (9 vs. 6 numbers) rather than a full operation-count derivation was chosen to make the "half the work" claim concrete and verifiable at this concept's scope, while explicitly deferring the precise flop-count analysis to `math.num.cholesky`.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.num.cholesky` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has positive-definiteness and LU factorization; specialization introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
