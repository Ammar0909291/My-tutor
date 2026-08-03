# Teaching Blueprint: Cofactor Expansion (`math.linalg.cofactor-expansion`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.cofactor-expansion` |
| name | Cofactor Expansion |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.determinant` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | det(A) = ∑_j a_{ij}C_{ij} along any row or column, where C_{ij}=(−1)^{i+j}M_{ij} is the cofactor and M_{ij} is the (i,j) minor. Efficient for small matrices; O(n!) complexity — not used for large n.

 |

## Component 1 — Learning Objectives

- LO1: Compute a matrix's MINOR $M_{ij}$ (the determinant of the submatrix formed by deleting row $i$ and column $j$) and COFACTOR $C_{ij}=(-1)^{i+j}M_{ij}$.
- LO2: Compute a determinant via cofactor expansion along ANY row or column: $\det(A)=\sum_ja_{ij}C_{ij}$, correctly matching entries to their corresponding cofactors.
- LO3: Choose an EFFICIENT row or column for expansion (one with the most zero entries) to minimize computation, and recognize this method's factorial time complexity makes it impractical for large matrices.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.determinant` (what a determinant computes) — this concept provides a general recursive computation method.

## Component 3 — Core Explanation

**Cofactor expansion** computes a determinant recursively: $\det(A)=\sum_ja_{ij}C_{ij}$ (expanding along row $i$; an analogous formula expands along any column), where the **cofactor** $C_{ij}=(-1)^{i+j}M_{ij}$, and the **minor** $M_{ij}$ is the determinant of the SUBMATRIX obtained by deleting row $i$ and column $j$ from $A$.

The sign factor $(-1)^{i+j}$ ALTERNATES in a checkerboard pattern across the matrix's positions — this must be tracked carefully for each term. Expansion works along ANY row or column (all give the same final determinant value), so choosing a row/column with the MOST ZEROS minimizes the number of nonzero terms needing computation, significantly reducing work.

This method has $O(n!)$ time complexity (each recursive expansion multiplies the work by roughly $n$), making it computationally impractical for LARGE matrices — more efficient methods (like row reduction) are used in practice for large $n$, though cofactor expansion remains a useful, exact method for small matrices.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic 3×3 expansion, breaking MC-1)**: Compute $\det\begin{pmatrix}2&0&1\\3&1&4\\1&2&3\end{pmatrix}$ by expanding along row 1. $a_{11}=2$: $M_{11}=\det\begin{pmatrix}1&4\\2&3\end{pmatrix}=3-8=-5$; $C_{11}=(-1)^{1+1}(-5)=-5$. $a_{12}=0$: contributes $0$ regardless of its cofactor (no need to compute $C_{12}$ at all). $a_{13}=1$: $M_{13}=\det\begin{pmatrix}3&1\\1&2\end{pmatrix}=6-1=5$; $C_{13}=(-1)^{1+3}(5)=5$. Total: $\det(A)=2(-5)+0\cdot C_{12}+1(5)=-10+0+5=-5$. A common error miscomputes the ALTERNATING sign $(-1)^{i+j}$ for one or more terms — e.g. treating every cofactor's sign as the same, rather than tracking the checkerboard pattern position by position.

**Example 2 (LO3 — choosing an efficient expansion row/column, breaking MC-2)**: For the SAME matrix from Example 1, note row 1 has one ZERO entry ($a_{12}=0$), reducing the needed computation from 3 minors to just 2. A common error expands along an arbitrary row/column without first checking for zeros, doing unnecessary extra work computing a minor whose term will end up multiplied by zero anyway (though the FINAL answer is unaffected — only the amount of computational EFFORT differs).

**Example 3 (LO2 — column expansion gives the same result, breaking MC-3)**: Compute the SAME determinant from Example 1 by expanding along column 2 instead (which has entries $0,1,2$): $a_{12}=0$ contributes 0; $a_{22}=1$: $M_{22}=\det\begin{pmatrix}2&1\\1&3\end{pmatrix}=6-1=5$; $C_{22}=(-1)^{2+2}(5)=5$; $a_{32}=2$: $M_{32}=\det\begin{pmatrix}2&1\\3&4\end{pmatrix}=8-3=5$; $C_{32}=(-1)^{3+2}(5)=-5$. Total: $0+1(5)+2(-5)=5-10=-5$ — matching Example 1's result exactly. A common error believes different expansion choices could give different determinant VALUES, rather than recognizing they always agree — only the computational PATH differs, never the final answer.

## Component 5 — Teaching Actions

### Teaching Action A01 — Compute Minors and Cofactors, Tracking the Sign Carefully (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly computing the checkerboard sign $(-1)^{i+j}$ for each position before computing the minor, reinforcing careful sign-tracking as a distinct step from the minor computation itself.

- **MC-1 hook**: check whether the sign alternation is correctly tracked across all terms, not assumed uniform.

### Teaching Action A02 — Choose the Row/Column with the Most Zeros for Efficiency (Primitive P06: Contrast Pair)

Work Example 2, contrasting the efficient zero-exploiting expansion against an arbitrary choice, showing the SAME final answer results but with less computational work. State the rule: "any row or column works, but choosing one with more zeros means fewer minors to actually compute — a purely practical efficiency choice, not a correctness requirement."

- **MC-2 hook**: this directly targets MC-2 (not strategically choosing an efficient expansion row/column).

### Teaching Action A03 — Any Row or Column Gives the Same Determinant (Primitive P11: Representation Shift)

Work Example 3's column-2 expansion, verifying it matches row-1's result from Example 1 exactly, grounding that the expansion CHOICE never affects the final value.

- **MC-3 hook**: this directly targets MC-3 (believing different expansion choices could yield different determinant values).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute the minor $M_{23}$ and cofactor $C_{23}$ of $\begin{pmatrix}1&2&3\\4&5&6\\7&8&9\end{pmatrix}$.
  2. Compute $\det\begin{pmatrix}3&0&2\\1&4&0\\5&1&2\end{pmatrix}$ by expanding along the most efficient row or column.
  3. Compute the SAME determinant from problem 2 by expanding along a DIFFERENT row/column, verifying the result matches.
  4. Explain, in one sentence, why cofactor expansion is impractical for very large matrices.
- **P76 (Transfer Probe, mode = independence)**: "A structural analysis requires computing the determinant of a $4\times4$ stiffness-related matrix that has an entire row with three zero entries. (a) Explain, using this lesson's efficiency discussion, why expanding along THAT specific row would be the smart computational choice. (b) Explain, using this lesson's complexity discussion, why for a much larger matrix (say $20\times20$), cofactor expansion would become impractical even with zero-exploiting row choices, and why engineers instead rely on other methods (like row reduction) for large-scale problems."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COFACTOR-SIGN-ALTERNATION-NOT-TRACKED-CORRECTLY | Applying the same sign to every cofactor term, rather than correctly tracking the checkerboard $(-1)^{i+j}$ pattern position by position | Foundational |
| MC-2 | EXPANSION-ROW-COLUMN-CHOSEN-WITHOUT-EFFICIENCY-CONSIDERATION | Expanding along an arbitrary row or column without checking for zeros first, doing unnecessary extra computation | Moderate |
| MC-3 | DIFFERENT-EXPANSION-CHOICES-ASSUMED-TO-GIVE-DIFFERENT-RESULTS | Believing the determinant's value could differ depending on which row/column is chosen for expansion | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Cofactor Sign Alternation Not Tracked Correctly") → P41 (detect: present Example 1 and check whether $(-1)^{1+1}$ and $(-1)^{1+3}$ are both correctly computed as positive, or whether a sign error occurs) → P64 (conceptual shift: re-derive the checkerboard pattern explicitly for a full matrix, marking every position's sign before computing any minors).
- **B02 (targets MC-2)**: P27 ("Expansion Row/Column Chosen Without Efficiency Consideration") → P41 (detect: review a submitted expansion for an inefficient choice when a zero-rich row/column was available) → P64 (conceptual shift: re-scan the matrix explicitly for the row/column with the most zeros before beginning the expansion).
- **B03 (targets MC-3)**: P27 ("Different Expansion Choices Assumed to Give Different Results") → P41 (detect: present Example 3's cross-verification and check whether the student expects a different answer from column expansion) → P64 (conceptual shift: re-compute both expansions side by side, confirming numerical agreement).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.determinant`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.det-properties` (further determinant properties this method's results must remain consistent with).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that cofactor expansion is a well-defined recursive procedure, with careful sign-tracking (MC-1) being the primary source of practical error.
- MC-3 was ranked equally foundational to MC-1 because it represents a genuine misunderstanding of the determinant's well-definedness — the method's flexibility (any row/column works) can be mistaken for ambiguity in the RESULT, when in fact only the computational path varies.
- The structural-analysis transfer probe was deliberately designed to require BOTH efficiency reasoning (part a) and complexity-limitation reasoning (part b), connecting this concept's practical computational method to its stated scalability limits within one coherent engineering scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.determinant`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
