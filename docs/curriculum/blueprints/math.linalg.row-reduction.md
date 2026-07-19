# Teaching Blueprint: Row Reduction (`math.linalg.row-reduction`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.row-reduction` |
| name | Row Reduction |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.augmented-matrix` |
| unlocks | `math.linalg.row-echelon`, `math.linalg.lu-factorization` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — systematically eliminating one variable at a time in a specific 3-equation system before naming the general procedure |
| description (KG) | Three elementary row operations (swap, scale, add multiple of one row to another) transform Ax=b without changing its solution set. Systematic application yields row echelon or reduced row echelon form. |

## Component 1 — Learning Objectives

- LO1: Apply the three elementary row operations (swap two rows, scale a row by a nonzero constant, add a multiple of one row to another) **systematically** — not haphazardly — to eliminate variables from an augmented matrix, working column by column from left to right.
- LO2: Recognize **row echelon form** (each row's leading nonzero entry, or "pivot," is strictly to the right of the pivot in the row above, and all-zero rows are at the bottom) as the systematic goal of row reduction, and correctly identify whether a given matrix is already in this form.
- LO3: Use the completed row echelon form to solve the system via **back-substitution**, working from the bottom row upward — directly refuting the misconception that row reduction alone (without the subsequent back-substitution step) already yields the numeric solution values.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.augmented-matrix` (constructing $[A\,|\,b]$, and the guarantee — already established there — that the three row operations preserve the underlying system's solution set).

## Component 3 — Core Explanation

**Systematic elimination, column by column**: row reduction applies the three already-guaranteed-safe row operations (from `math.linalg.augmented-matrix`) in a **specific, disciplined order**: working left to right through the columns, use each column's pivot row to eliminate all entries BELOW it in that column (via "add a multiple of one row to another"), then move to the next column. This systematic left-to-right, top-to-bottom sweep is what distinguishes row reduction from simply applying row operations in an arbitrary, ad hoc order — the same three legal moves, but organized into a repeatable procedure.

**Row echelon form (REF)**: the target shape of this systematic process is **row echelon form**: each nonzero row's leading (leftmost nonzero) entry — its **pivot** — sits strictly to the right of the pivot in the row directly above it, and any fully-zero rows are pushed to the bottom. This staircase-like pattern is exactly what falls out of the column-by-column elimination sweep, and it is the signal that no further elimination is needed below any pivot.

**Back-substitution — the step after row reduction, not row reduction itself**: row echelon form is not yet the numeric answer — it is a SIMPLER system, equivalent to the original (same solution set, by the row-operation guarantee), but not yet solved. **Back-substitution** extracts the actual values: starting from the BOTTOM row (which, in REF, typically involves the fewest unknowns — often just one), solve for that variable, then substitute it upward into the row above to solve for the next variable, and so on, working from bottom to top. Row reduction transforms the system into a form where this substitution process becomes easy; it does not perform the substitution itself.

## Component 4 — Worked Examples

**Example 1 (LO1 — systematic column-by-column elimination)**: For $\left(\begin{array}{ccc|c}1&2&1&4\\2&5&3&10\\1&0&2&3\end{array}\right)$: eliminate column 1 below the pivot ($1$ in row 1): Row2 $\to$ Row2$-2\times$Row1 gives $(0,1,1,2)$; Row3 $\to$ Row3$-$Row1 gives $(0,-2,1,-1)$. Now the matrix is $\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&-2&1&-1\end{array}\right)$. Next, eliminate column 2 below its pivot ($1$ in row 2): Row3 $\to$ Row3$+2\times$Row2 gives $(0,0,3,3)$. Final: $\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&0&3&3\end{array}\right)$ — achieved by working through columns 1, then 2, in strict order, never jumping ahead.

**Example 2 (LO2 — recognizing row echelon form)**: The final matrix from Example 1, $\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&0&3&3\end{array}\right)$, IS in row echelon form: row 1's pivot is in column 1, row 2's pivot is in column 2 (strictly right of row 1's), row 3's pivot is in column 3 (strictly right of row 2's) — a genuine staircase pattern, with no all-zero rows present here. Contrast with $\left(\begin{array}{cc|c}0&3&6\\1&2&4\end{array}\right)$: this is NOT in echelon form as written (row 1's leading nonzero entry is in column 2, to the RIGHT of row 2's leading entry in column 1 — the staircase goes the wrong way); swapping the two rows would fix this immediately.

**Example 3 (LO3 — back-substitution is a separate step, breaking MC-1)**: From Example 1's echelon form $\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&0&3&3\end{array}\right)$, translate back to equations: $x+2y+z=4$, $y+z=2$, $3z=3$. Row reduction alone stops HERE — it has not yet told us $x$, $y$, or $z$ numerically. Back-substitution: from row 3, $z=1$. Substitute into row 2: $y+1=2\Rightarrow y=1$. Substitute both into row 1: $x+2(1)+1=4\Rightarrow x=1$. The solution $(x,y,z)=(1,1,1)$ required this ADDITIONAL bottom-to-top substitution pass — reaching echelon form was necessary but not sufficient on its own.

## Component 5 — Teaching Actions

### Teaching Action A01 — Systematic Column-by-Column Elimination (Primitive P11: Representation Shift)

Work Example 1's full elimination live, narrating explicitly: "column 1 first — clear everything below the first pivot. ONLY once that's done, move to column 2." State: "this isn't random row-juggling — it's a strict left-to-right sweep, which is exactly what guarantees you'll end up with the staircase pattern."

### Teaching Action A02 — Recognizing Row Echelon Form (Primitive P06: Contrast Pair)

**Contrast** Example 2's two matrices — the genuine echelon form (staircase going the right way) versus the non-example (staircase backward). State: "check that each row's leading entry sits STRICTLY to the right of the one above it — if a row's pivot doesn't move rightward compared to the row above, it's not yet in echelon form."

### Teaching Action A03 — Back-Substitution: A Necessary Second Step (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: the echelon-form matrix, translated back to equations, still has THREE unknowns undetermined numerically — row reduction alone hasn't answered "what is $x$?" State clearly: "row reduction gets you to a SIMPLER, equivalent system — it does not, by itself, hand you the numbers. You still have to substitute bottom-to-top to actually solve for $x$, $y$, $z$."

- **MC-1 hook**: ask "once a matrix is in row echelon form, have you already solved the system?" — a "yes" answer reveals MC-1 (believing row reduction alone yields the numeric solution, without recognizing back-substitution as a required additional step).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Row-reduce $\left(\begin{array}{cc|c}2&4&10\\1&3&8\end{array}\right)$ to echelon form, showing each row operation explicitly.
  2. Determine whether $\left(\begin{array}{ccc|c}1&0&2&5\\0&0&1&3\\0&1&0&2\end{array}\right)$ is already in row echelon form, and if not, state which row operation would fix it.
  3. Given the echelon form $\left(\begin{array}{cc|c}1&3&7\\0&2&6\end{array}\right)$, perform back-substitution to find the numeric values of both unknowns.
  4. Explain, in your own words, why reaching row echelon form is not the same as "having solved the system," using the distinction between row reduction and back-substitution.
- **P76 (Transfer Probe, mode = independence)**: "A student row-reduces a 4-equation, 4-unknown system and proudly announces 'I'm done!' upon reaching $\left(\begin{array}{cccc|c}1&2&0&1&6\\0&1&3&0&5\\0&0&1&2&4\\0&0&0&1&3\end{array}\right)$. (a) Confirm this matrix is genuinely in row echelon form, citing the staircase pattern explicitly. (b) Explain what specific additional work remains before the system is actually solved. (c) Perform that remaining work (back-substitution) to find all four unknowns' numeric values."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ECHELON-FORM-MISTAKEN-FOR-SOLVED-SYSTEM | Believing reaching row echelon form already constitutes solving the system, without recognizing back-substitution as a required additional step | Foundational |
| MC-2 | ROW-OPERATIONS-APPLIED-OUT-OF-SYSTEMATIC-ORDER | Applying row operations haphazardly (jumping between columns) rather than the systematic left-to-right, top-to-bottom sweep, often leading to re-introducing nonzero entries in already-cleared columns | Foundational |
| MC-3 | ECHELON-FORM-PIVOT-PATTERN-MISJUDGED | Misjudging whether a given matrix is in echelon form, particularly failing to notice a pivot that does NOT move strictly rightward relative to the row above | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Echelon-Form-as-Solved-System Assumption") → P41 (detect: ask a student to state the numeric solution immediately upon reaching echelon form, without performing back-substitution) → P64 (conceptual shift: re-walk Example 3's explicit bottom-to-top substitution, re-anchoring on "echelon form is a SIMPLER system, not yet solved numbers").
- **B02 (targets MC-2)**: P27 (name it: "Unsystematic Row-Operation Order") → P41 (detect: observe whether a student attempts to eliminate column 2 before fully clearing column 1, causing previously-cleared entries to reappear) → P64 (conceptual shift: re-walk Example 1's strict column-by-column order, re-anchoring on "fully finish each column before moving to the next — skipping ahead undoes earlier work").
- **B03 (targets MC-3)**: P27 (name it: "Echelon-Pattern Misjudgment") → P41 (detect: present Example 2's non-example matrix and ask whether it is in echelon form) → P64 (conceptual shift: re-check each row's pivot column position explicitly against the row above, re-anchoring on "strictly rightward, every single row, no exceptions").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.augmented-matrix` (the $[A\,|\,b]$ notation and the solution-preservation guarantee this concept's systematic procedure directly relies on).
- **Unlocks**: `math.linalg.row-echelon` (the formal echelon-form theory), `math.linalg.lu-factorization` (which records the row-reduction steps themselves as a factorization).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (systematic elimination), A02 (recognizing echelon form), and A03 (back-substitution as a separate step) each target a distinct LO, appropriate for a concept whose challenge is procedural discipline (order of operations) rather than new conceptual content beyond `math.linalg.augmented-matrix`.
- MC-1 (echelon form mistaken for the solved system) was given the most teaching weight because it is the single most common point where students stop working prematurely — Example 3 deliberately continues past the echelon-form result to complete the full back-substitution, modeling the entire expected workflow rather than stopping at the "impressive-looking" staircase matrix.
- Example 1's three-equation system was deliberately sized to require exactly two elimination passes (clearing column 1, then column 2), large enough to demonstrate genuine systematic order without becoming arithmetically overwhelming.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: eliminating variables in a specific system before naming the procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
