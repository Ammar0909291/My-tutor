# Teaching Blueprint: Augmented Matrix (`math.linalg.augmented-matrix`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.augmented-matrix` |
| name | Augmented Matrix |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.linalg.linear-system` |
| unlocks | `math.linalg.row-reduction` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — writing a specific small system's coefficients and constants side by side before naming the general notation |
| description (KG) | The matrix [A\|b] formed by appending the right-hand side column b to the coefficient matrix A. Row operations on [A\|b] preserve the solution set and are used to row-reduce to echelon form. |

## Component 1 — Learning Objectives

- LO1: Construct the **augmented matrix** $[A\,|\,b]$ for a linear system $Ax=b$ by appending the right-hand-side column $b$ to the coefficient matrix $A$, correctly separating coefficients (in $A$) from constants (in $b$) for each equation.
- LO2: Explain why the augmented matrix is a **compact bookkeeping device**, not a new mathematical object with its own separate meaning — it packages exactly the same information as the original system of equations, in a form convenient for systematic row operations.
- LO3: State that **row operations** performed on $[A\,|\,b]$ **preserve the solution set** of the underlying system — directly refuting the misconception that manipulating the augmented matrix's rows could accidentally change which values of the unknowns actually solve the system, provided only the three legal row operations (swap, scale by a nonzero constant, add a multiple of one row to another) are used.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.linear-system` (a system of $m$ linear equations in $n$ unknowns written in matrix form $Ax=b$, and the three possible outcomes: unique solution, no solution, or infinitely many solutions, governed by rank).

## Component 3 — Core Explanation

**Constructing $[A\,|\,b]$**: given the linear system $Ax=b$ (coefficient matrix $A$, right-hand-side column $b$), the **augmented matrix** $[A\,|\,b]$ is formed by literally appending $b$ as an extra column to the right of $A$ (the vertical bar is just a visual separator, not a mathematical operation). Each ROW of $[A\,|\,b]$ corresponds to exactly one equation of the original system: the row's entries in the $A$-part are that equation's coefficients, and the row's entry in the $b$-part is that equation's constant term.

**A bookkeeping device, not a new object**: the augmented matrix does not introduce any new mathematics — it is simply a compact way of writing down the exact same system of equations, dropping the variable names ($x_1,x_2,\dots$) and the "$=$" signs since their positions are now implied by the matrix's structure. Every operation performed on the augmented matrix is really an operation on the underlying equations; the matrix notation exists purely to make those operations mechanical and systematic (setting up for `math.linalg.row-reduction`'s row-echelon process).

**Row operations preserve the solution set**: the three legal row operations — (1) swapping two rows, (2) multiplying a row by a nonzero constant, (3) adding a multiple of one row to another — each correspond to a manipulation of the underlying EQUATIONS that is well known (from ordinary algebra) not to change which values of $x_1,\dots,x_n$ satisfy the system: swapping two equations doesn't change what solves both; multiplying an equation by a nonzero constant doesn't change its solution set; adding a multiple of one equation to another is the standard elimination technique, which also preserves the solution set. Because $[A\,|\,b]$'s rows directly correspond to these equations, the same three guarantees apply directly to row operations on the matrix.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the augmented matrix)**: For the system $2x+3y=7$, $x-y=1$: the coefficient matrix is $A=\begin{pmatrix}2&3\\1&-1\end{pmatrix}$, and $b=\begin{pmatrix}7\\1\end{pmatrix}$. The augmented matrix is $[A\,|\,b] = \left(\begin{array}{cc|c}2&3&7\\1&-1&1\end{array}\right)$ — row 1 directly encodes "$2x+3y=7$" (coefficients $2,3$, constant $7$), row 2 encodes "$x-y=1$" (coefficients $1,-1$, constant $1$).

**Example 2 (LO2 — the matrix as pure bookkeeping, breaking MC-1)**: Continuing Example 1, perform the row operation "Row 2 $\to$ Row 2 $-$ (1/2)Row 1" on $[A\,|\,b]$: $\left(\begin{array}{cc|c}2&3&7\\1-1&-1-1.5&1-3.5\end{array}\right) = \left(\begin{array}{cc|c}2&3&7\\0&-2.5&-2.5\end{array}\right)$. Translating this new row 2 back into equation form: $-2.5y=-2.5$, i.e. $y=1$ — and this is EXACTLY the same elimination step you would perform directly on the original equations ($2x+3y=7$ minus half of... actually eliminating $x$ by combining the two equations algebraically), just tracked via matrix entries instead of full equations with variable names written out. The matrix operation and the equation-level elimination are the identical mathematical step, merely notated differently.

**Example 3 (LO3 — row operations preserve the solution set, verified directly)**: The original system from Example 1 has solution $x=2,y=1$ (verify: $2(2)+3(1)=7$ ✓, $2-1=1$ ✓). After the row operation in Example 2, the new augmented matrix $\left(\begin{array}{cc|c}2&3&7\\0&-2.5&-2.5\end{array}\right)$ corresponds to the NEW system $2x+3y=7$, $-2.5y=-2.5$. Solving this new system: from the second equation, $y=1$; substituting into the first, $2x+3(1)=7 \Rightarrow x=2$ — the EXACT same solution, $x=2,y=1$, as the original system. The row operation changed what the equations LOOK like, but not which $(x,y)$ pair satisfies them.

## Component 5 — Teaching Actions

### Teaching Action A01 — Building the Augmented Matrix Row by Row (Primitive P11: Representation Shift)

Write the system $2x+3y=7$, $x-y=1$ directly above its augmented matrix, drawing arrows connecting each equation's coefficients and constant to the matching matrix row. State: "each row of the augmented matrix is just one equation, with the variable names and equals signs stripped out because their positions are now implied by which column they're in." Work Example 1's direct construction.

### Teaching Action A02 — The Matrix Is Bookkeeping, Not New Math (Primitive P11: Representation Shift)

Present Example 2's row operation side by side with the equivalent equation-level elimination step, showing they produce the identical resulting equation ($y=1$ derivable either way). State: "nothing new is happening mathematically when you manipulate the augmented matrix — you're doing the exact same algebra you'd do on the equations directly, just with a notation that makes it fast and systematic to repeat many times."

### Teaching Action A03 — Row Operations Preserve the Solution Set (Primitive P28: Conflict Evidence)

Present Example 3's direct verification: the original system and the row-operated system, despite looking different, share the EXACT same solution $(2,1)$. State clearly: "the three legal row operations are guaranteed — by the same algebra that lets you add/subtract/scale equations — to never change which values solve the system. This is exactly why row reduction (transforming the augmented matrix into a simpler form) is a safe, solution-preserving strategy, not a risky shortcut."

- **MC-1 hook**: ask "when you perform a row operation on the augmented matrix, could you accidentally end up with a different solution than the original system had?" — a "yes" answer reveals MC-1 (fearing that legal row operations might silently alter the solution set, rather than recognizing they are guaranteed to preserve it).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write the augmented matrix for the system $x+2y-z=4$, $3y+z=5$, $2x-y=1$.
  2. Given the augmented matrix $\left(\begin{array}{cc|c}1&2&5\\0&3&9\end{array}\right)$, write out the corresponding system of equations explicitly, with variable names restored.
  3. Perform the row operation "Row 1 $\to$ 2$\times$Row 1" on $\left(\begin{array}{cc|c}1&2&5\\0&3&9\end{array}\right)$, and verify (by solving both the original and the new system) that the solution set is unchanged.
  4. Explain, in your own words, why performing a row operation on an augmented matrix can never change the underlying system's solution set, referencing the equivalent equation-level operation each row operation corresponds to.
- **P76 (Transfer Probe, mode = independence)**: "A student is solving a system of 4 equations in 4 unknowns by hand, tracking their work using an augmented matrix. After several row operations, they arrive at a row that reads $\left(\begin{array}{cccc|c}0&0&0&5&10\end{array}\right)$. (a) Translate this row back into an equation, and solve for the corresponding variable. (b) Explain why the student can trust that this variable's value is correct for the ORIGINAL system, even though this specific row never appeared in the original augmented matrix. (c) A classmate suggests that using an augmented matrix is 'just for organization' and doesn't actually change how the algebra works underneath — explain whether this is an accurate description, using Component 3's bookkeeping-device framing."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ROW-OPERATIONS-FEARED-TO-ALTER-SOLUTION-SET | Believing legal row operations on an augmented matrix might accidentally change the underlying system's solution set, rather than recognizing they are guaranteed to preserve it | Foundational |
| MC-2 | AUGMENTED-MATRIX-COLUMN-ORDER-MISALIGNED | Placing a variable's coefficient in the wrong column (misaligning which column corresponds to which variable, especially when a variable is absent from an equation, e.g. a missing $x$ term should be recorded as $0$, not omitted) | Foundational |
| MC-3 | AUGMENTED-MATRIX-TREATED-AS-A-DIFFERENT-MATHEMATICAL-OBJECT | Treating the augmented matrix as introducing new mathematical content beyond the original system, rather than recognizing it as a pure notational repackaging of the same equations | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Row-Operations-Alter-Solution-Set Fear") → P41 (detect: ask a student whether they trust the final row-reduced answer as much as they would trust directly solving the original system by substitution) → P64 (conceptual shift: re-walk Example 3's direct side-by-side solving of both the original and row-operated systems, confirming the identical solution both ways).
- **B02 (targets MC-2)**: P27 (name it: "Column-Order Misalignment") → P41 (detect: give a system where one equation is missing a variable, e.g. $2x+5=3$ with no $y$ term, and ask the student to write the augmented matrix row, checking whether they correctly place a $0$ in the missing variable's column) → P64 (conceptual shift: re-anchor on "every row must have exactly one entry per column, in the SAME variable order across every row — a missing variable means writing $0$ in that column, never skipping or shifting the column").
- **B03 (targets MC-3)**: P27 (name it: "Augmented-Matrix-as-New-Object Misconception") → P41 (detect: ask what mathematical operation the augmented matrix ADDS beyond what solving the equations directly would give) → P64 (conceptual shift: re-walk Example 2's side-by-side comparison, showing the matrix row operation and the direct equation elimination produce the identical resulting equation — nothing new was computed, only re-notated).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.linear-system` (the system $Ax=b$ this concept's augmented matrix directly packages).
- **Unlocks**: `math.linalg.row-reduction` (the systematic process of applying row operations to $[A\,|\,b]$ to reach echelon form, built directly on this concept's construction and solution-preservation guarantee).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 1 with a proficient/understand tag places this at a "3 TAs + gate" tier, but each TA is intentionally brief — A01 (construction), A02 (bookkeeping framing), and A03 (solution-preservation) — appropriate for a genuinely small, single-hour concept whose content is almost entirely notational rather than computational, sitting between two more substantial concepts (`math.linalg.linear-system` and `math.linalg.row-reduction`).
- This blueprint deliberately frames the augmented matrix as "pure bookkeeping" (MC-3's target) as the single most important conceptual anchor, because every subsequent row-reduction technique's validity rests on students trusting that matrix manipulation is equation manipulation in disguise — undermining this trust (MC-1) would make the entire row-reduction method feel unjustified rather than mechanically reliable.
- Example 2 and Example 3 deliberately reuse the identical system from Example 1 throughout, rather than introducing new numbers each time, so that the row operation's effect and the solution-preservation guarantee can be verified against the exact same known answer without any risk of arithmetic differences obscuring the conceptual point.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a specific small system's coefficients written out before general notation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
