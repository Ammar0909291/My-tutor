# Teaching Blueprint: Row Echelon Form (`math.linalg.row-echelon`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.row-echelon` |
| name | Row Echelon Form |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.row-reduction` |
| unlocks | `math.linalg.rank`, `math.linalg.null-space` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — continuing an already-row-reduced system into its further-reduced form, before the general theory |
| description (KG) | REF: zeros below each pivot; RREF: additionally, zeros above each pivot and each pivot equals 1. RREF is unique. Pivot columns correspond to basic variables; non-pivot columns to free variables. |

## Component 1 — Learning Objectives

- LO1: Convert a matrix already in **row echelon form (REF)** — zeros below each pivot, from `math.linalg.row-reduction` — into **reduced row echelon form (RREF)** by additionally clearing zeros ABOVE each pivot (back-elimination) and scaling each pivot row so the pivot itself equals exactly $1$.
- LO2: State and use the fact that **RREF is unique** for a given matrix — unlike REF itself (which can differ depending on the specific sequence of row operations chosen), every valid path of row operations leads to the SAME final RREF — directly refuting the misconception that different valid row-reduction sequences might produce different "correct" RREF results.
- LO3: Identify **pivot columns** (corresponding to **basic variables**, uniquely determined by the system) and **non-pivot columns** (corresponding to **free variables**, which can take any value), and use this distinction to write the **general solution** of a system with infinitely many solutions in parametric form.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.row-reduction` (the systematic column-by-column elimination producing REF — pivots forming a rightward staircase, zeros below each pivot — and back-substitution for systems with a unique solution).

## Component 3 — Core Explanation

**Division of labor with `math.linalg.row-reduction`**: that prerequisite concept already fully covers reaching REF (zeros below each pivot) and solving a UNIQUE-solution system via back-substitution. This concept's distinct job is twofold: (1) pushing REF one step FURTHER into RREF, and (2) handling the case `math.linalg.row-reduction`'s own examples never encountered — a system with MORE unknowns than pivots, having infinitely many solutions, requiring free-variable parametrization rather than simple back-substitution.

**From REF to RREF**: reduced row echelon form additionally requires (beyond REF's "zeros below each pivot"): zeros ABOVE each pivot too, and each pivot itself scaled to exactly $1$. Starting from an REF matrix, achieve this by working from the BOTTOM pivot upward: scale each pivot row to make its pivot $1$, then use that row to eliminate all entries above it in that same column (an "upward" elimination pass, mirroring the "downward" pass that produced REF in the first place).

**RREF's uniqueness**: while REF itself is not unique (different valid sequences of row operations can produce REF matrices that look different from each other, though they represent the same underlying system), the FULLY reduced RREF is provably unique — no matter which legal sequence of row operations you choose, you always arrive at the exact same final RREF matrix. This uniqueness is what makes RREF (rather than just any REF) the standard reference form for reading off a system's solution structure unambiguously.

**Pivot columns (basic variables) vs. non-pivot columns (free variables)**: in RREF, columns containing a pivot correspond to **basic variables** — their values are uniquely DETERMINED by the system (once free variables are assigned). Columns WITHOUT a pivot correspond to **free variables** — they can take ANY value, with the basic variables then expressed in terms of them. When free variables exist, the system has INFINITELY many solutions, and the general solution is written parametrically: each basic variable expressed as a formula in terms of the free variable(s).

## Component 4 — Worked Examples

**Example 1 (LO1 — REF to RREF, back-eliminating upward)**: Starting from `math.linalg.row-reduction`'s own REF result, $\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&0&3&3\end{array}\right)$: first scale row 3 by $1/3$: $\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&0&1&1\end{array}\right)$. Eliminate above the row-3 pivot: Row2 $\to$ Row2 $-$ Row3 gives $(0,1,0,1)$; Row1 $\to$ Row1 $-$ Row3 gives $(1,2,0,3)$. Now: $\left(\begin{array}{ccc|c}1&2&0&3\\0&1&0&1\\0&0&1&1\end{array}\right)$. Finally eliminate above the row-2 pivot: Row1 $\to$ Row1 $-2\times$Row2 gives $(1,0,0,1)$. Final RREF: $\left(\begin{array}{ccc|c}1&0&0&1\\0&1&0&1\\0&0&1&1\end{array}\right)$ — reading off DIRECTLY (no back-substitution needed at all): $x=1,y=1,z=1$, matching that concept's own back-substitution answer exactly, but obtained here with zero additional computation once RREF is reached.

**Example 2 (LO2 — RREF is the same regardless of the operation sequence, orientation check)**: Suppose a different student row-reduces the SAME original system from Example 1 using a different valid ordering of operations (e.g. clearing column 2 partially before finishing column 1). Regardless of the specific path taken, as long as every step is a legal row operation, the FINAL RREF is guaranteed to be the identical $\left(\begin{array}{ccc|c}1&0&0&1\\0&1&0&1\\0&0&1&1\end{array}\right)$ — this uniqueness is why two students' RREF results can always be directly compared for correctness, unlike intermediate REF forms, which may legitimately look different between two equally correct approaches.

**Example 3 (LO3 — free variables and parametric general solution, breaking MC-1)**: Row-reduce $\left(\begin{array}{ccc|c}1&2&-1&3\\2&4&1&12\end{array}\right)$: Row2 $\to$ Row2$-2\times$Row1 gives $(0,0,3,6)$, then scale by $1/3$: $(0,0,1,2)$. RREF: $\left(\begin{array}{ccc|c}1&2&0&5\\0&0&1&2\end{array}\right)$ (after eliminating the $-1$ in row 1's third column using the new row 2). Pivot columns are 1 and 3 (variables $x,z$ — BASIC variables); column 2 (variable $y$) has NO pivot — $y$ is a FREE variable. Reading off: $x+2y=5\Rightarrow x=5-2y$, and $z=2$. The general solution, parametrized by the free variable $y=t$: $(x,y,z)=(5-2t,\ t,\ 2)$ for ANY real $t$ — infinitely many solutions, none of which can be found by ordinary back-substitution alone (there's no single numeric answer for $y$ to substitute), requiring this free-variable framework instead.

## Component 5 — Teaching Actions

### Teaching Action A01 — From REF to RREF: One More Pass, Upward (Primitive P11: Representation Shift)

State: "you already know how to get zeros BELOW each pivot. RREF just asks for the mirror-image cleanup — zeros ABOVE each pivot too, plus scaling every pivot to exactly 1." Work Example 1's full upward elimination, directly continuing from `math.linalg.row-reduction`'s own REF result.

### Teaching Action A02 — RREF's Uniqueness: A Guarantee Worth Trusting (Primitive P11: Representation Shift)

State: "REF can look different depending on which order you did things in — but RREF is always the SAME final answer, no matter what legal path you took to get there." Present Example 2's orientation check, contrasting REF's non-uniqueness with RREF's guaranteed uniqueness.

### Teaching Action A03 — Free Variables: When Back-Substitution Alone Isn't Enough (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: a system where one column has no pivot, meaning back-substitution (from `math.linalg.row-reduction`) has no single number to assign that variable. State: "when a column has no pivot, that variable is FREE — it can be anything, and the other (basic) variables get expressed IN TERMS OF it. This is how you handle a system with infinitely many solutions, which never showed up in the earlier unique-solution examples."

- **MC-1 hook**: ask "if a row-reduced system has a column with no pivot, does that mean the system has no solution?" — a "yes" answer reveals MC-1 (confusing a free-variable column, which signals infinitely many solutions, with the genuinely different case of an inconsistent system having no solution at all).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Starting from the REF matrix $\left(\begin{array}{cc|c}1&3&7\\0&2&6\end{array}\right)$, complete the reduction to RREF, showing each step.
  2. Read the numeric solution directly off your RREF result from problem 1, with no back-substitution required.
  3. Row-reduce $\left(\begin{array}{ccc|c}1&1&2&4\\2&2&5&11\end{array}\right)$ to RREF, identify the pivot and non-pivot columns, and write the general solution parametrically in terms of the free variable.
  4. Explain, in your own words, why RREF's uniqueness is useful for checking whether two students' row-reduction work is correct, even if their intermediate steps looked completely different.
- **P76 (Transfer Probe, mode = independence)**: "An economist sets up a system of equations modeling supply-and-demand equilibrium across 3 markets with 4 unknown price variables, and row-reduces the system to RREF, finding pivots in only 3 of the 4 columns. (a) Explain what this tells the economist about the number of basic variables versus free variables in this system. (b) Explain why the economist should NOT conclude the system has no solution, given that one column lacks a pivot — what does this column's lack of a pivot actually indicate instead? (c) Explain how the economist would write the general solution for the price variables, using the free variable as a parameter, and what this means practically (e.g., that the equilibrium isn't fully pinned down without additional information)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FREE-VARIABLE-COLUMN-CONFUSED-WITH-NO-SOLUTION | Believing a non-pivot (free-variable) column signals that the system has no solution, rather than correctly recognizing it as a sign of infinitely many solutions | Foundational |
| MC-2 | RREF-ASSUMED-NON-UNIQUE-LIKE-REF | Believing RREF, like ordinary REF, can differ depending on the specific row-operation sequence chosen, missing the guarantee that RREF is always unique | Foundational |
| MC-3 | PIVOT-SCALING-TO-1-STEP-OMITTED | Achieving zeros above and below each pivot but forgetting to scale each pivot row so the pivot itself equals exactly 1, producing an REF-like result that is not genuinely RREF | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Free-Variable-Column-as-No-Solution Confusion") → P41 (detect: present Example 3's system, with its non-pivot column, and ask whether it has no solution) → P64 (conceptual shift: re-walk Example 3's parametric general solution directly, re-anchoring on "a missing pivot means a FREE variable — infinitely many solutions — completely different from an inconsistent row like $[0\ 0\ 0\,|\,c]$ with $c\ne0$, which is what actually signals no solution").
- **B02 (targets MC-2)**: P27 (name it: "RREF Non-Uniqueness Assumption") → P41 (detect: ask whether two students following different valid row-reduction paths could end up with genuinely different RREF results for the same system) → P64 (conceptual shift: re-anchor on Example 2's uniqueness guarantee, contrasting explicitly with REF's own acknowledged non-uniqueness from `math.linalg.row-reduction`).
- **B03 (targets MC-3)**: P27 (name it: "Pivot-Scaling-to-1 Step Omitted") → P41 (detect: ask a student to verify whether their "RREF" result has every pivot equal to exactly 1, not just zeros above and below) → P64 (conceptual shift: re-walk Example 1's explicit scaling step ($\times1/3$ on row 3), re-anchoring on "RREF requires BOTH zeros above/below AND pivots scaled to 1 — missing either one means it's not fully reduced yet").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.row-reduction` (the REF result and back-substitution procedure this concept extends into RREF and free-variable parametrization).
- **Unlocks**: `math.linalg.rank` (the rank of a matrix is defined directly as the number of pivots in its RREF), `math.linalg.null-space` (found directly from RREF's free-variable parametrization of solutions to $Ax=0$).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (REF to RREF), A02 (RREF's uniqueness), and A03 (free variables and parametric solutions) each target a distinct LO, appropriate for a concept that extends an already-mastered procedure (REF) into its fully reduced form plus one genuinely new case (systems with free variables).
- **Explicit division of labor with `math.linalg.row-reduction`** (stated directly in Component 3): that concept owns reaching REF and solving UNIQUE-solution systems via back-substitution; this concept owns the further reduction to RREF, RREF's uniqueness, and — critically — the free-variable/infinitely-many-solutions case that concept's own examples never encountered (all of them were square, unique-solution systems).
- Example 1 was deliberately built by continuing `math.linalg.row-reduction`'s own worked example forward into RREF, both to reinforce that prerequisite and to make vivid the payoff of full reduction: the final answer is read off directly with zero further computation, in contrast to that concept's own back-substitution requirement.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: continuing an already-row-reduced system into RREF) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
