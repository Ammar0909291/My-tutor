# Teaching Blueprint: Rank of a Matrix (`math.linalg.rank`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.rank` |
| name | Rank of a Matrix |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.row-echelon` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The number of pivots in REF; equals the dimension of the column space (column rank) and row space (row rank). Column rank = row rank always. Rank determines existence and uniqueness of solutions to Ax=b.

 |

## Component 1 — Learning Objectives

- LO1: Compute a matrix's rank by row-reducing to row echelon form (REF) and counting the number of PIVOTS.
- LO2: State that ROW RANK equals COLUMN RANK always — the dimension of the row space and the dimension of the column space are the same number, a non-obvious but universal fact.
- LO3: Use rank to determine the EXISTENCE and UNIQUENESS of solutions to $Ax=b$: comparing the rank of $A$ against the rank of the augmented matrix $[A|b]$, and against the number of unknowns.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.row-echelon` (row reduction, producing the pivot structure this concept counts).

## Component 3 — Core Explanation

The **rank** of a matrix is the number of PIVOTS in its row echelon form (REF) — equivalently, the dimension of its COLUMN SPACE (the span of its columns) or its ROW SPACE (the span of its rows). A remarkable, non-obvious fact: ROW RANK always EQUALS COLUMN RANK, for any matrix — despite rows and columns seeming like structurally different objects.

Rank determines the SOLVABILITY of $Ax=b$: (1) a solution EXISTS if and only if $\text{rank}(A)=\text{rank}([A|b])$ (the augmented matrix, appending $b$ as an extra column) — if adding $b$ increases the rank, the system is INCONSISTENT; (2) if a solution exists, it is UNIQUE if and only if $\text{rank}(A)$ equals the number of UNKNOWNS (variables) — otherwise, infinitely many solutions exist (free variables remain).

## Component 4 — Worked Examples

**Example 1 (LO1 — computing rank via REF)**: Find the rank of $\begin{pmatrix}1&2&3\\2&4&7\\1&2&5\end{pmatrix}$. Row reduce: $R_2\to R_2-2R_1$: $\begin{pmatrix}1&2&3\\0&0&1\\1&2&5\end{pmatrix}$; $R_3\to R_3-R_1$: $\begin{pmatrix}1&2&3\\0&0&1\\0&0&2\end{pmatrix}$; $R_3\to R_3-2R_2$: $\begin{pmatrix}1&2&3\\0&0&1\\0&0&0\end{pmatrix}$. Pivots: 2 (one in column 1, one in column 3). Rank $=2$.

**Example 2 (LO3 — using rank to check existence, breaking MC-1)**: For the system $Ax=b$ with $\text{rank}(A)=2$ (3 equations, 3 unknowns) and $\text{rank}([A|b])=3$: since these ranks DIFFER, the system is INCONSISTENT (no solution exists) — appending $b$ genuinely increased the rank, meaning $b$ is not in the column space of $A$. A common error checks only whether $\text{rank}(A)$ is "full" (equal to the number of equations or unknowns) without comparing it against $\text{rank}([A|b])$ specifically — existence of a solution depends on this COMPARISON, not on $\text{rank}(A)$'s value alone.

**Example 3 (LO3 — using rank to check uniqueness, breaking MC-2)**: For a consistent system ($\text{rank}(A)=\text{rank}([A|b])=2$) with 3 UNKNOWNS: since $\text{rank}(A)=2<3$ (the number of unknowns), the solution is NOT unique — there is 1 FREE VARIABLE, giving infinitely many solutions (a whole line or plane of solutions, not a single point). A common error assumes a CONSISTENT system (existence confirmed) automatically has a UNIQUE solution, without separately checking rank against the number of unknowns — existence and uniqueness are TWO SEPARATE questions, each requiring its own rank comparison.

## Component 5 — Teaching Actions

### Teaching Action A01 — Row Reduce, Count Pivots (Primitive P64: Conceptual Shift)

Work Example 1 in full, row-reducing step by step and explicitly circling each pivot as it's identified, connecting the final pivot count directly to the rank.

### Teaching Action A02 — Existence Requires Comparing rank(A) to rank([A|b]) (Primitive P06: Contrast Pair)

Work Example 2, explicitly computing BOTH ranks and comparing them, showing the mismatch signals inconsistency. State the rule: "existence of a solution is about whether $b$ 'fits' within $A$'s column space — check by comparing $\text{rank}(A)$ to $\text{rank}([A|b])$, not by looking at $\text{rank}(A)$ in isolation."

- **MC-1 hook**: this directly targets MC-1 (checking only $\text{rank}(A)$'s value without the augmented-matrix comparison).

### Teaching Action A03 — Uniqueness Is a Separate Question from Existence (Primitive P06: Contrast Pair, second pairing)

Work Example 3, explicitly separating the existence check (already passed) from the SEPARATE uniqueness check (rank vs. number of unknowns), showing a consistent system can still have infinitely many solutions. State the rule: "existence and uniqueness are TWO DIFFERENT questions, each with its own rank comparison — a consistent system is not automatically a uniquely-solvable one."

- **MC-2 hook**: this directly targets MC-2 (assuming consistency automatically implies uniqueness).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the rank of $\begin{pmatrix}1&0&2\\2&1&5\\0&1&1\end{pmatrix}$ via row reduction.
  2. Given $\text{rank}(A)=3$ and $\text{rank}([A|b])=3$ for a system with 3 unknowns, determine whether the system has a unique solution, no solution, or infinitely many, and justify.
  3. Given $\text{rank}(A)=2$ and $\text{rank}([A|b])=3$, determine the solvability of the system.
  4. Given $\text{rank}(A)=2$ and $\text{rank}([A|b])=2$ for a system with 4 unknowns, determine whether the solution (if it exists) is unique, and justify.
- **P76 (Transfer Probe, mode = independence)**: "A structural engineer sets up a system of equations $Ax=b$ modeling forces in a truss with 4 unknown tension values and 4 equilibrium equations. Row-reducing the coefficient matrix $A$ gives rank 3 (not full rank 4), and the augmented matrix $[A|b]$ also has rank 3. (a) Determine whether this system has a solution, and if so, whether it is unique — explain your reasoning using both rank comparisons from this lesson. (b) Explain, in engineering terms, what 'infinitely many solutions' might mean physically for a truss system (hint: consider whether some tension values might be under-determined by the given equilibrium equations alone)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXISTENCE-CHECKED-VIA-RANK-A-ALONE | Checking only $\text{rank}(A)$'s value to determine solution existence, without comparing it against $\text{rank}([A|b])$ | Foundational |
| MC-2 | CONSISTENCY-ASSUMED-TO-IMPLY-UNIQUENESS | Believing a consistent (solvable) system automatically has a unique solution, without separately checking rank against the number of unknowns | Foundational |
| MC-3 | PIVOT-COUNT-MISCOMPUTED-DURING-ROW-REDUCTION | Miscounting pivots during row reduction, e.g. counting a row of all zeros as contributing a pivot | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Existence Checked via Rank(A) Alone") → P41 (detect: present Example 2 and check whether $\text{rank}([A|b])$ is computed and compared) → P64 (conceptual shift: re-derive both ranks explicitly, showing the comparison — not $\text{rank}(A)$ alone — determines existence).
- **B02 (targets MC-2)**: P27 ("Consistency Assumed to Imply Uniqueness") → P41 (detect: present Example 3 and check whether "unique solution" is (incorrectly) concluded from consistency alone) → P64 (conceptual shift: re-check $\text{rank}(A)$ against the number of unknowns separately, identifying the free variable).
- **B03 (targets MC-3)**: P27 ("Pivot Count Miscomputed") → P41 (detect: review a submitted row-reduction for a pivot miscounted, e.g. from an all-zero row) → P64 (conceptual shift: re-verify each claimed pivot is a genuinely nonzero leading entry in its row, per `math.linalg.row-echelon`'s definition).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.row-echelon`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.rank-nullity` (the theorem directly extending this concept's dimension-counting logic).

## Component 8 — Teaching Notes

- estimated_hours = 3 and bloom = understand reflect that this concept's computation (LO1) is straightforward reuse of row reduction, while its genuine conceptual weight lies in the existence/uniqueness interpretation (LO2, LO3).
- MC-1 and MC-2 are both ranked foundational because each collapses a TWO-PART diagnostic (existence AND uniqueness, each needing its own rank comparison) into a single, incomplete check — a structurally identical error pattern applied to two different but related questions.
- The truss-engineering transfer probe was deliberately chosen because rank-deficient systems in structural analysis have genuine physical meaning (statically indeterminate structures), giving the abstract "infinitely many solutions" outcome concrete engineering significance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.row-echelon`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
