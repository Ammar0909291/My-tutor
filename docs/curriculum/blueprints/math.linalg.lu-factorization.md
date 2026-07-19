# Teaching Blueprint: LU Factorization (`math.linalg.lu-factorization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.lu-factorization` |
| name | LU Factorization |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.linalg.row-reduction`, `math.linalg.matrix-multiplication` |
| unlocks | none |
| cross_links | `math.num.lu-factorization` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — factoring one specific $3\times3$ matrix (reusing `math.linalg.row-reduction`'s own worked system) before naming the general $A=LU$ procedure |
| description (KG) | Decomposes $A=LU$ (or $PA=LU$ with pivoting), where $L$ is lower triangular and $U$ is upper triangular. Enables efficient solution of multiple systems with the same $A$ via forward/back substitution. |

## Component 1 — Learning Objectives

- LO1: Recognize that the row-reduction ELIMINATION steps `math.linalg.row-reduction` already performs (to reach row echelon form $U$) can be recorded as multipliers, and that these multipliers assemble directly into a LOWER TRIANGULAR matrix $L$ satisfying $A=LU$ — LU factorization is not new arithmetic, it is BOOKKEEPING of row reduction's own elimination steps.
- LO2: Recognize the PAYOFF of having $A=LU$ once computed: solving $Ax=b$ for MULTIPLE different $b$ vectors (with the SAME $A$) becomes two cheap triangular solves — forward substitution for $Ly=b$, then back substitution for $Ux=y$ — avoiding re-doing the full elimination from scratch for every new $b$.
- LO3 (orientation level — full pivoting theory deferred): recognize, without full derivation, that when a pivot position is zero (or dangerously small), a ROW SWAP is needed, requiring a permutation matrix $P$ and the modified factorization $PA=LU$, deferred to `math.num.lu-factorization`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.row-reduction` (the systematic column-by-column elimination process reaching row echelon form, and back-substitution as its own separate follow-up step) and `math.linalg.matrix-multiplication` (computing matrix products, needed to VERIFY $LU=A$).

## Component 3 — Core Explanation

**LU factorization is row reduction's own elimination steps, recorded rather than discarded**: `math.linalg.row-reduction` eliminates entries below each pivot using row operations of the form "Row$_k\to$Row$_k-m\cdot$Row$_i$" — and ordinarily, once elimination is done, the multipliers $m$ used along the way are thrown away, leaving only the final echelon form $U$. LU factorization's insight is that these multipliers, if RECORDED instead of discarded, assemble into a lower-triangular matrix $L$ (with $1$s on the diagonal and each multiplier $m_{ki}$ placed in position $(k,i)$) satisfying exactly $A=LU$ — the SAME elimination arithmetic already performed, just packaged into two matrices instead of one final result.

**The payoff — solving $Ax=b$ for many different $b$, cheaply**: once $A=LU$ is known, solving $Ax=b$ becomes $LUx=b$; setting $y=Ux$, this splits into $Ly=b$ (solved by FORWARD substitution, top to bottom, since $L$ is lower triangular) followed by $Ux=y$ (solved by BACK substitution, bottom to top, exactly as in `math.linalg.row-reduction`). Crucially, if a SECOND right-hand side $b'$ arises later (same $A$, new data), the expensive elimination work (computing $L$ and $U$) does NOT need to be redone — only two cheap triangular solves are needed, one for each new $b$.

**Pivoting and $PA=LU$ (orientation level)**: if a pivot position happens to be zero (elimination cannot proceed as written) or dangerously close to zero (numerically unstable), rows must be SWAPPED before continuing — tracked via a permutation matrix $P$, giving the modified factorization $PA=LU$ rather than $A=LU$ directly. Full development of when and how to choose pivots is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — recording row-reduction's multipliers as $L$, breaking MC-1, reusing `math.linalg.row-reduction`'s own matrix)**: for $A=\begin{pmatrix}1&2&1\\2&5&3\\1&0&2\end{pmatrix}$ (the coefficient matrix from `math.linalg.row-reduction`'s own worked system): eliminating column 1, Row2$\to$Row2$-2\cdot$Row1 uses multiplier $m_{21}=2$; Row3$\to$Row3$-1\cdot$Row1 uses multiplier $m_{31}=1$. This gives $\begin{pmatrix}1&2&1\\0&1&1\\0&-2&1\end{pmatrix}$. Eliminating column 2, Row3$\to$Row3$+2\cdot$Row2 uses multiplier $m_{32}=-2$ (recorded as $-(-2)=2$ in $L$, since $L$ stores the multiplier needed to UNDO the elimination), giving $U=\begin{pmatrix}1&2&1\\0&1&1\\0&0&3\end{pmatrix}$ — exactly `math.linalg.row-reduction`'s own echelon form. Assembling $L=\begin{pmatrix}1&0&0\\2&1&0\\1&-2&1\end{pmatrix}$ from the recorded multipliers, direct matrix multiplication (via `math.linalg.matrix-multiplication`) confirms $LU=A$.

**Example 2 (LO2 — reusing $L,U$ to solve for a new right-hand side cheaply, breaking MC-2)**: `math.linalg.row-reduction` solved $Ax=b$ for $b=(4,10,3)^T$, getting $(x,y,z)=(1,1,1)$. Suppose a SECOND right-hand side $b'=(2,5,1)^T$ arises for the SAME $A$. Rather than re-eliminating from scratch, use the already-computed $L,U$ from Example 1: forward-substitute $Ly=b'$: $y_1=2$; $2y_1+y_2=5\Rightarrow y_2=1$; $y_1-2y_2+y_3=1\Rightarrow y_3=1$. Then back-substitute $Ux=y=(2,1,1)^T$: from $3z=1\Rightarrow z=1/3$; $y+z=1\Rightarrow y=1-1/3=2/3$; $x+2y+z=2\Rightarrow x=2-4/3-1/3=1/3$. This produced a full new solution using only two cheap triangular solves — no re-elimination of $A$ was needed.

**Example 3 (LO3, orientation level — a zero pivot forcing a row swap, breaking MC-3)**: for $A'=\begin{pmatrix}0&1&1\\2&1&3\\1&0&2\end{pmatrix}$, the $(1,1)$ pivot position is $0$ — elimination as written CANNOT proceed (dividing by a zero pivot is undefined, and no multiple of row 1 can eliminate anything below it in column 1 meaningfully). Swapping rows 1 and 2 first (recorded via a permutation matrix $P$) gives a matrix with a nonzero pivot, and elimination proceeds normally from there — yielding $PA=LU$ rather than $A=LU$ directly. This single zero-pivot case is enough to show factorization is not always as simple as "just eliminate as usual."

## Component 5 — Teaching Actions

### Teaching Action A01 — LU Factorization Records What Row Reduction Already Throws Away (Primitive P11: Representation Shift)

State: "you already computed every one of these multipliers doing ordinary row reduction — LU factorization's only new idea is to WRITE THEM DOWN instead of discarding them, assembling them into $L$." Walk Example 1's multiplier bookkeeping against `math.linalg.row-reduction`'s own elimination steps.

- **MC-1 hook**: ask "is computing $L$ and $U$ separate new arithmetic, distinct from the row-reduction elimination steps already known?" — a "yes" answer reveals MC-1 (missing that $L$'s entries are exactly the multipliers row reduction already computes, merely recorded rather than discarded).

### Teaching Action A02 — The Real Payoff Is Reuse Across Multiple $b$ Vectors (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a brand-new right-hand side $b'$ was solved completely using only two triangular solves, with ZERO re-elimination of $A$. State: "if you only ever solve $Ax=b$ once, LU factorization buys you little over plain row reduction — its real value appears the moment a SECOND $b$ shows up for the same $A$."

- **MC-2 hook**: ask "does LU factorization only matter when solving a single system $Ax=b$ once?" — a "yes" answer reveals MC-2 (missing that its real payoff is reusing the expensive $L,U$ computation across many different right-hand sides).

### Teaching Action A03 — A Zero Pivot Breaks the Simple $A=LU$ Story (Primitive P06: Contrast Pair)

Contrast Example 1's clean elimination (nonzero pivots throughout) against Example 3's zero-pivot case requiring a row swap. State: "plain $A=LU$ silently assumes every pivot position you reach is nonzero — the moment one isn't, you need a permutation matrix $P$ first, giving $PA=LU$ instead."

- **MC-3 hook**: ask "does every matrix $A$ admit a factorization $A=LU$ (with no pivoting needed) using ordinary row reduction?" — a "yes" answer reveals MC-3 (missing that a zero pivot forces a row swap, requiring the modified $PA=LU$ form).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $A=\begin{pmatrix}1&0\\3&1\end{pmatrix}\begin{pmatrix}2&1\\0&4\end{pmatrix}$ computed out to a single matrix, identify which factor is $L$ and which is $U$, and verify $LU=A$ by direct multiplication.
  2. Perform row reduction on $A=\begin{pmatrix}2&1\\4&5\end{pmatrix}$, recording the multiplier used, and assemble $L$ and $U$.
  3. Given a matrix $A$ already factored as $A=LU$ and a NEW right-hand side $b$, describe the two-step process (forward then back substitution) to solve $Ax=b$ without re-eliminating $A$.
  4. Explain, without fully carrying out the factorization, why a matrix with a zero $(1,1)$ entry cannot be factored as $A=LU$ using elimination exactly as written.
- **P76 (Transfer Probe, mode = independence)**: "An engineering firm repeatedly solves $Ax=b_k$ for the SAME stiffness matrix $A$ but many different load vectors $b_1,b_2,\dots,b_{50}$ across a design season. (a) Explain, citing the bookkeeping argument from Example 1, why computing $A=LU$ ONCE is worthwhile here even though it costs the same elimination work as one ordinary row reduction. (b) Describe the two-step process used to solve for each new $b_k$ once $L,U$ are known. (c) Suppose partway through, the firm discovers $A$'s $(2,2)$ pivot position becomes zero after the first elimination step for a redesigned structure — explain what must change about the factorization approach."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LU-COMPUTATION-ASSUMED-SEPARATE-NEW-ARITHMETIC | Believing computing $L$ and $U$ requires separate new arithmetic distinct from row reduction, missing that $L$'s entries are exactly row reduction's own multipliers, recorded rather than discarded | Foundational |
| MC-2 | LU-PAYOFF-ASSUMED-SINGLE-USE | Believing LU factorization's value applies even when solving $Ax=b$ only once, missing that its real payoff is reusing $L,U$ across multiple right-hand sides | High |
| MC-3 | A-EQUALS-LU-ASSUMED-ALWAYS-VALID | Believing every matrix admits a plain $A=LU$ factorization via ordinary elimination, missing that a zero pivot forces a row swap, requiring $PA=LU$ instead | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "LU Computation Assumed Separate New Arithmetic") → P41 (detect: ask whether computing $L$ and $U$ is separate new arithmetic from row reduction) → P64 (conceptual shift: re-walk Example 1's multiplier bookkeeping, re-anchoring on "$L$'s entries are exactly row reduction's own discarded multipliers, now recorded").
- **B02 (targets MC-2)**: P27 (name it: "LU Payoff Assumed Single-Use") → P41 (detect: ask whether LU factorization's value applies to solving $Ax=b$ only once) → P64 (conceptual shift: re-walk Example 2's cheap-reuse demonstration, re-anchoring on "the real payoff is reusing $L,U$ across many different right-hand sides").
- **B03 (targets MC-3)**: P27 (name it: "A=LU Assumed Always Valid") → P41 (detect: ask whether every matrix admits a plain $A=LU$ factorization via ordinary elimination) → P64 (conceptual shift: re-walk Example 3's zero-pivot case, re-anchoring on "a zero pivot forces a row swap, requiring $PA=LU$ instead").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.row-reduction` (the systematic elimination process this concept's $L$ directly records, and back-substitution reused unchanged for the $Ux=y$ step) and `math.linalg.matrix-multiplication` (verifying $LU=A$ by direct computation).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.num.lu-factorization`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the multiplier bookkeeping and the two-triangular-solve reuse payoff) and LO3 kept orientation-level, appropriately surveying the zero-pivot/permutation case without deriving general pivoting strategy (partial vs. complete pivoting).
- **Division of labor**: `math.linalg.row-reduction` owns the general elimination and back-substitution machinery; this concept owns the SPECIFIC insight of recording elimination's multipliers as $L$ and the resulting reuse payoff — deliberately reusing `math.linalg.row-reduction`'s own $3\times3$ matrix and solution $(1,1,1)$ across Examples 1–2 so the factorization and its practical payoff read as a direct continuation of already-mastered material, not a disconnected new topic.
- Example 3's deliberate choice of a MINIMAL single-entry perturbation (moving the nonzero pivot to a different row) was chosen to isolate the zero-pivot issue as cleanly as possible, without introducing unrelated numerical-stability complications (near-zero-but-nonzero pivots), which are deferred to `math.num.lu-factorization`.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.num.lu-factorization` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: factoring one specific matrix, reusing `math.linalg.row-reduction`'s own system, precedes naming the general procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
