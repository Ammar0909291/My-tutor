# Teaching Blueprint: Cramer's Rule (`math.linalg.cramer-rule`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.cramer-rule` |
| name | Cramer's Rule |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 2 |
| requires | `math.linalg.determinant`, `math.linalg.matrix-inverse` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | For Ax=b with det(A)≠0, xᵢ = det(Aᵢ)/det(A), where Aᵢ replaces column i with b. Theoretically important (explicit formula), computationally impractical for large n.

 |

## Component 1 — Learning Objectives

- LO1: Solve $Ax=b$ using Cramer's Rule: $x_i=\frac{\det(A_i)}{\det(A)}$, where $A_i$ is $A$ with its $i$-th COLUMN replaced by $b$.
- LO2: Verify Cramer's Rule requires $\det(A)\ne0$ — recognizing that if $\det(A)=0$, the rule cannot be applied at all (the system either has no unique solution or is singular).
- LO3: Recognize Cramer's Rule's practical limitation: despite being an elegant EXPLICIT formula, its reliance on computing $n+1$ separate determinants makes it computationally IMPRACTICAL for large $n$, where more efficient methods (row reduction) are preferred.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.determinant` (the computation this rule relies on) and `math.linalg.matrix-inverse` (Cramer's Rule is, structurally, a closed-form expression of $x=A^{-1}b$).

## Component 3 — Core Explanation

**Cramer's Rule** solves $Ax=b$ (for $\det(A)\ne0$) with an explicit formula: $x_i=\frac{\det(A_i)}{\det(A)}$, where $A_i$ is the matrix $A$ with its $i$-th COLUMN REPLACED by $b$ (all other columns unchanged). This gives EACH variable's value as a ratio of two determinants, without needing to fully row-reduce or invert the matrix.

This requires $\det(A)\ne0$ — if $\det(A)=0$, the formula's denominator vanishes, and Cramer's Rule simply doesn't apply (the system is either inconsistent or has infinitely many solutions, requiring different analysis, per `math.linalg.rank`).

Despite its theoretical elegance (a single explicit formula for every variable), Cramer's Rule requires computing $n+1$ separate $n\times n$ determinants (one for $\det(A)$, plus one $A_i$ per variable) — each an $O(n!)$ computation via cofactor expansion — making it FAR less efficient than row reduction for large systems, though it remains valuable for small systems and theoretical analysis.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic 2×2 application, breaking MC-1)**: Solve $\begin{cases}2x+y=5\\x-3y=-6\end{cases}$ using Cramer's Rule. $A=\begin{pmatrix}2&1\\1&-3\end{pmatrix}$, $\det(A)=2(-3)-1(1)=-7$. For $x$: $A_1=\begin{pmatrix}5&1\\-6&-3\end{pmatrix}$ (column 1 replaced by $b=(5,-6)$), $\det(A_1)=5(-3)-1(-6)=-15+6=-9$; $x=\frac{-9}{-7}=\frac97$. For $y$: $A_2=\begin{pmatrix}2&5\\1&-6\end{pmatrix}$ (column 2 replaced), $\det(A_2)=2(-6)-5(1)=-12-5=-17$; $y=\frac{-17}{-7}=\frac{17}7$. A common error replaces the WRONG column (e.g. replacing column 2 when solving for $x_1$), or replaces a ROW instead of a column — Cramer's Rule specifically substitutes $b$ into the COLUMN matching the variable's index, never a row.

**Example 2 (LO2 — det(A) = 0 means the rule doesn't apply, breaking MC-2)**: For $\begin{cases}2x+4y=6\\x+2y=3\end{cases}$: $A=\begin{pmatrix}2&4\\1&2\end{pmatrix}$, $\det(A)=2(2)-4(1)=0$. Cramer's Rule CANNOT be applied here — the formula's denominator would be zero (undefined division). This does NOT necessarily mean no solution exists (in fact, this particular system has infinitely many solutions, since the two equations are proportional) — it means a DIFFERENT method (row reduction, checking `math.linalg.rank`) is needed to determine the system's actual solvability. A common error attempts to force the formula anyway (e.g. reporting $x=0/0$ as somehow meaningful, or concluding "no solution" automatically), rather than recognizing $\det(A)=0$ as a signal to switch methods entirely.

**Example 3 (LO3 — impracticality for large systems)**: For a $10\times10$ system, Cramer's Rule would require computing 11 separate $10\times10$ determinants (one for $\det(A)$, ten for each $A_i$) — each potentially requiring substantial computation via cofactor expansion (itself $O(n!)$ per determinant). Row reduction, by contrast, solves the ENTIRE system in a single $O(n^3)$ process. This dramatic efficiency gap is why Cramer's Rule, despite its theoretical elegance, is essentially never used for large practical systems — it remains valuable mainly for small systems, symbolic/theoretical work, and as a conceptual tool connecting determinants to solvability.

## Component 5 — Teaching Actions

### Teaching Action A01 — Replace the Matching Column with b (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly labeling which column of $A_i$ corresponds to which variable $x_i$, emphasizing the column-replacement (not row-replacement) structure.

- **MC-1 hook**: check whether the correct column (matching the variable's index) is replaced, not an arbitrary or wrong one.

### Teaching Action A02 — det(A) = 0 Signals: Switch Methods (Primitive P06: Contrast Pair)

Work Example 2, showing the formula's denominator vanishing and explicitly stating this means Cramer's Rule simply doesn't apply — the system's actual solvability (infinite solutions here) must be determined by a DIFFERENT method. State the rule: "if $\det(A)=0$, Cramer's Rule gives you no information at all — it's not 'no solution,' it's 'this tool doesn't work here, use rank/row-reduction instead.'"

- **MC-2 hook**: this directly targets MC-2 (misinterpreting a zero determinant as automatically meaning "no solution," or forcing the formula anyway).

### Teaching Action A03 — Elegant Formula, Impractical for Large Systems (Primitive P11: Representation Shift)

Work Example 3's complexity comparison, contrasting Cramer's Rule's $n+1$ separate determinant computations against row reduction's single, more efficient process.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $\begin{cases}3x+2y=8\\x-y=1\end{cases}$ using Cramer's Rule.
  2. Solve $\begin{cases}x+2y+z=6\\2x+y-z=1\\x-y+2z=5\end{cases}$ for $x$ using Cramer's Rule (finding $\det(A)$ and $\det(A_1)$).
  3. Given a system where $\det(A)=0$, explain what this means for applying Cramer's Rule, and what alternative approach would be needed.
  4. Explain, in one sentence, why Cramer's Rule becomes impractical for large systems despite being an elegant explicit formula.
- **P76 (Transfer Probe, mode = independence)**: "A small electrical circuit with 3 unknown currents is modeled by a $3\times3$ system $Ax=b$ where $\det(A)=12\ne0$. (a) Explain, using this lesson's method, how Cramer's Rule would find each current $x_i$ as a ratio of two determinants. (b) An engineer scaling this analysis up to a much larger circuit with 50 unknown currents asks whether Cramer's Rule is still the best approach — explain, using this lesson's complexity discussion, why row reduction would be strongly preferred at that scale, even though Cramer's Rule remains mathematically valid."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CRAMERS-RULE-WRONG-COLUMN-REPLACED | Replacing the wrong column (or a row instead of a column) with $b$ when forming $A_i$, rather than the column matching the target variable's index | Foundational |
| MC-2 | ZERO-DETERMINANT-MISINTERPRETED-AS-NO-SOLUTION | Concluding "no solution" automatically when $\det(A)=0$, rather than recognizing Cramer's Rule simply doesn't apply and a different method is needed to determine actual solvability | Foundational |
| MC-3 | CRAMERS-RULE-USED-FOR-LARGE-SYSTEMS-WITHOUT-EFFICIENCY-AWARENESS | Defaulting to Cramer's Rule for large systems without recognizing its computational impracticality compared to row reduction | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Cramer's Rule Wrong Column Replaced") → P41 (detect: present Example 1 and check whether $A_1$'s FIRST column, not a row or the wrong column, is replaced by $b$) → P64 (conceptual shift: re-state the rule explicitly — "$A_i$'s $i$-th COLUMN becomes $b$; every other column stays as in $A$" — and re-derive).
- **B02 (targets MC-2)**: P27 ("Zero Determinant Misinterpreted as No Solution") → P41 (detect: present Example 2 and check whether "no solution" is concluded from $\det(A)=0$ alone) → P64 (conceptual shift: re-derive the system's actual solvability via row reduction/rank, showing it in fact has infinitely many solutions here — a genuinely different outcome from "no solution").
- **B03 (targets MC-3)**: P27 ("Cramer's Rule Used for Large Systems Without Efficiency Awareness") → P41 (detect: present a large-system scenario and check whether Cramer's Rule is proposed without efficiency consideration) → P64 (conceptual shift: re-derive the determinant-count comparison explicitly for the given system size, showing the computational burden).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.determinant`, `math.linalg.matrix-inverse`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.rank` (the correct diagnostic tool when $\det(A)=0$ makes Cramer's Rule inapplicable).

## Component 8 — Teaching Notes

- estimated_hours = 2 reflects that Cramer's Rule's mechanical application is a direct, well-scoped procedure once the column-replacement structure is correctly understood.
- MC-2 was ranked most severe alongside MC-1 because it represents a genuine gap-filling error — when a tool fails to apply, the natural (but incorrect) instinct is to interpret that failure as a definitive answer ("no solution"), rather than correctly recognizing it as "this specific tool cannot answer the question here."
- The circuit-analysis transfer probe was deliberately designed with a scale-up scenario (3 unknowns to 50) to give MC-3's efficiency-awareness correction genuine engineering relevance, since real circuit analysis at scale would never actually use Cramer's Rule despite its mathematical validity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.determinant`, `math.linalg.matrix-inverse`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
