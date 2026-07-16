# TEACHING BLUEPRINT — math.linalg.matrix

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.linalg.matrix |
| concept_name | Matrix |
| domain | linear_algebra |
| difficulty | proficient |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | P |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.linalg.vector]
**unlocks:** [math.linalg.determinant, math.linalg.linear-system, math.linalg.linear-map]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** A matrix is a rectangular array of numbers arranged in m rows and n columns, written as an m×n matrix. The entry in row i and column j is denoted aᵢⱼ. Matrices generalize vectors (a column vector is m×1; a row vector is 1×n) to a two-dimensional structure that encodes linear transformations, systems of linear equations, and tabular data. Position (i,j) is semantically significant — the matrix is not a bag of numbers.

**Knowledge prerequisites activated:**
- math.linalg.vector: a vector is a 1D ordered list of numbers; a matrix extends this to a 2D ordered grid; column and row vectors are special cases of matrices

**Concept structure:**
1. **Rectangular array**: m rows (horizontal strips) and n columns (vertical strips); every entry occupies a specific position
2. **Dimension notation**: m×n — rows first, columns second; "m by n"
3. **Entry notation**: aᵢⱼ — row index i first, column index j second; reads "a sub i j"
4. **Special cases**: row vector (1×n matrix), column vector (m×1 matrix), square matrix (m = n)
5. **Position carries meaning**: swapping entries aᵢⱼ and aⱼᵢ generally produces a different matrix

**Target understanding:** Given a matrix, the learner states its dimensions correctly (rows×columns), locates specified entries by (i,j) index, and recognizes that position within the array is structurally meaningful.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | MATRIX-DIMENSION-REVERSED | Shown a 2×3 matrix, asked for its dimensions | States "3×2" — counts columns before rows; reverses the standard row-first, column-second convention | B01 |
| MC-2 | MATRIX-ENTRY-INDEXED-WRONG | Shown matrix M, asked for M₂₃ | Locates row 3, column 2 instead of row 2, column 3 — reverses i and j in the subscript | B02 |
| MC-3 | MATRIX-IS-JUST-NUMBERS | Asked whether swapping two entries changes the matrix | Says "no" — treats the matrix as an unordered collection of numbers; ignores that position (i,j) carries meaning | B03 |

**FOUNDATIONAL MC:** MC-1 (MATRIX-DIMENSION-REVERSED) — if the learner cannot correctly read m×n, the dimension incompatibility rule for matrix operations and every downstream index operation is unreachable.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** P — Pictorial
"Coordinate grid" model: a matrix entry aᵢⱼ is located like a cell on a spreadsheet — row i selects the horizontal band, column j selects the vertical position within that band. The spreadsheet analogy (row letter or number before column letter) matches the aᵢⱼ subscript convention.

**Progression Gate (P → A):** Learner consistently reads dimensions as rows-first and locates entries using (row, column) order in novel matrices.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — "Rows Then Columns": Matrix Anatomy (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

| Feature | Column vector | Row vector | General m×n matrix |
|---|---|---|---|
| Shape | m×1 (tall) | 1×n (wide) | m×n (rectangular) |
| Example | [3; 1; 4] (3×1) | [3  1  4] (1×3) | [[3 1]; [4 1]; [5 9]] (3×2) |
| Dimension | "3 by 1" — 3 rows, 1 column | "1 by 3" — 1 row, 3 columns | "3 by 2" — 3 rows, 2 columns |
| Indexing | single index aᵢ | single index aⱼ | double index aᵢⱼ (row i, column j) |

Matrix anatomy — read rows first, then columns:
```
           Column 1   Column 2   Column 3
  Row 1  [   a₁₁       a₁₂       a₁₃  ]
  Row 2  [   a₂₁       a₂₂       a₂₃  ]

  Dimensions: 2 rows × 3 columns = 2×3 matrix
```

Memory cue: **RC** — Row Count first, Column Count second.
(Same as reading a page: rows scan left-to-right, columns track position within each row.)

**P49 ADAPTIVE CHECKPOINT**
Q: "State the dimensions of [[1 2 3]; [4 5 6]] and identify entry a₂₃."
→ CORRECT [2×3; a₂₃ = 6]: "Correct — 2 rows, 3 columns; row 2, column 3 is 6." → TA-A02
→ INCORRECT [dimensions '3×2']: Flag MC-1. Route → B01.
→ INCORRECT [a₂₃ = 2 or a₂₃ = 5]: Flag MC-2. Route → B02.
→ NO_RESPONSE: "Count horizontal rows, then vertical columns. State rows × columns." → guided.

---

### TA-A02 — Matrices as Structured Data (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same 2×3 matrix:

| Representation | Form | What it emphasizes |
|---|---|---|
| Tabular | Labeled row/column grid | Each cell is a named position |
| Algebraic | aᵢⱼ notation with i=1..m, j=1..n | Position (i,j) is the address of each number |
| Geometric | Each column is a vector in ℝᵐ | Column j is an m-component vector; an m×n matrix contains n such vectors |

Position is not optional — swapping two entries produces a different matrix:
```
Original:   [[3  7]     Swap a₁₂ and a₂₁:    [[3  1]
             [1  9]]                            [7  9]]

These are DIFFERENT matrices.
a₁₂ = 7 in the original; a₁₂ = 1 after the swap.
The numbers are the same; the structure has changed.
```

**P49 ADAPTIVE CHECKPOINT**
Q: "In the matrix M = [[3 0 −1]; [−2 5 4]], locate M₁₃ and M₂₂."
→ CORRECT [M₁₃ = −1; M₂₂ = 5]: "Correct — row 1 col 3 is −1; row 2 col 2 is 5." → TA-A03
→ INCORRECT [M₁₃ = −2]: Flag MC-2. Route → B02.
→ INCORRECT [swaps M₁₃ and M₂₂]: Flag MC-2. Route → B02.
→ NO_RESPONSE: "First subscript = row; second subscript = column. For M₁₃: go to row 1, then column 3." → guided.

---

### TA-A03 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **State the dimensions of A = [[2 −1 0]; [3 4 7]; [1 −5 2]].**
   *(Expected: 3×3 — 3 rows, 3 columns; this is a square matrix)*

2. **In matrix B = [[1 2]; [3 4]; [5 6]], what is b₃₁?**
   *(Expected: b₃₁ = 5 — row 3, column 1)*

3. **True/False:** In a 4×2 matrix, the entry a₂₄ exists.
   *(Expected: FALSE — the matrix has only 2 columns; column 4 does not exist; the valid column indices are 1 and 2)*

4. **A column vector v = [7; 2; 9] can be written as what type of matrix? State its dimensions.**
   *(Expected: 3×1 matrix — 3 rows, 1 column)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Tabular data context:*

"A weather monitoring system records daily high temperatures (°C) for 2 days across 3 cities. The data is stored as matrix T:

```
         City 1   City 2   City 3
Day 1  [   18       22       15   ]
Day 2  [   20       25       23   ]
```

(a) State the dimensions of T.
(b) What is the entry t₂₃? What does it represent in the weather context?
(c) A colleague reorganises the same data into a 3×2 matrix S with cities as rows and days as columns. What are the dimensions of S, and what does s₃₁ represent?"

*(Expected:
(a) T is 2×3 — 2 rows (days), 3 columns (cities)
(b) t₂₃ = 23; temperature recorded in City 3 on Day 2
(c) S is 3×2; s₃₁ = temperature of City 3 on Day 1 = 15)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 MATRIX-DIMENSION-REVERSED first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now state the dimensions of any matrix using rows-first notation, locate any entry using (i,j) indexing, and recognize that position within a matrix carries meaning. This foundation enables matrix arithmetic, determinants, linear systems, and the encoding of linear maps."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: MATRIX-DIMENSION-REVERSED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A very common error: stating the column count before the row count. The convention is invariably m×n — rows first, columns second. An m×n matrix has m rows and n columns."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "State the dimensions of the matrix [[1 2 3]; [4 5 6]]."
→ "2×3" (2 rows, 3 columns): MC-1 not active. Exit B01 → next flagged MC or TA-A03.
→ "3×2" or "3 rows, 2 columns": MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"Count horizontal bands (rows) first; count vertical bands (columns) second.

```
[[1  2  3]    ← Row 1  (one horizontal strip containing 3 entries)
 [4  5  6]]   ← Row 2  (one horizontal strip containing 3 entries)

Rows:    2   (there are 2 horizontal strips)
Columns: 3   (each strip has 3 entries — so there are 3 vertical columns)
Dimensions: 2×3

Memory rule: RC — Row Count before Column Count.
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "State the dimensions of [[a b]; [c d]; [e f]]."
→ CORRECT [3×2]: "Correct — 3 rows, 2 columns." Exit B01 → B02 if flagged, else TA-A03.
→ INCORRECT [2×3]: "Count horizontal rows first: there are ___ of them. Then columns per row: ___. State rows×columns." → re-prompt.

---

### TA-B02 — Repair: MATRIX-ENTRY-INDEXED-WRONG (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"In the entry notation aᵢⱼ, the subscript order matches the dimension order: i is the row index and j is the column index. Reversing the subscripts (reading j as row and i as column) gives a different entry — one that may not even exist in the matrix."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In the matrix [[1 2]; [3 4]], what is a₁₂?"
→ "2" (row 1, column 2): MC-2 not active. Exit B02 → B03 if flagged, else TA-A03.
→ "3" (treating row 2, column 1): MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"Read aᵢⱼ as a two-step address: first find row i, then within that row find column j.

```
Matrix: [[1  2  3]
         [4  5  6]
         [7  8  9]]

Find a₂₃:
  Step 1: go to row i=2   → [4  5  6]
  Step 2: go to column j=3 → 6
  Answer: a₂₃ = 6

NOT a₃₂ = 8 (which would be row 3, column 2 — the subscripts reversed).
```

Always: first subscript = row, second subscript = column."

**P49 ADAPTIVE CHECKPOINT**
Q: "In the matrix [[5 10 15]; [20 25 30]], find a₁₃ and a₂₂."
→ CORRECT [a₁₃ = 15; a₂₂ = 25]: "Correct." Exit B02 → B03 if flagged, else TA-A03.
→ INCORRECT: "For a₁₃: go to row 1 (first horizontal strip). Within it, count to position 3." → guided.

---

### TA-B03 — Repair: MATRIX-IS-JUST-NUMBERS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Some learners treat a matrix as simply a collection of numbers that can be listed or rearranged freely. In a matrix, every number lives at a specific (i,j) address — rearranging entries produces a genuinely different matrix with different mathematical properties."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "If I swap the entries a₁₂ and a₂₁ in a matrix, do I get the same matrix or a different one?"
→ "A different matrix — positions (1,2) and (2,1) are distinct addresses": MC-3 not active. Exit B03 → TA-A03.
→ "The same matrix" or "the same numbers": MC-3 confirmed. Continue B03.

**P64 CONCEPTUAL SHIFT**
"Every entry in a matrix has a permanent address (i,j). Swapping two entries moves numbers to different addresses — the matrix changes:

```
Original A:  [[3  7]     Swap a₁₂=7 and a₂₁=1:   B = [[3  1]
              [1  9]]                                    [7  9]]

A ≠ B  because A[1][2]=7 but B[1][2]=1.

In the weather matrix [[18 22 15]; [20 25 23]]:
  t₁₂ = 22  (City 2, Day 1)
  t₂₁ = 20  (City 1, Day 2)
Swapping them would say City 2 had temperature 20 on Day 1 — factually wrong.
Position IS the meaning.
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "Matrix A = [[2 8]; [5 3]]. If I swap a₁₂ and a₂₁, write the resulting matrix B. Is A = B?"
→ CORRECT [B = [[2 5]; [8 3]]; A ≠ B]: "Correct — position carries meaning; swapping entries changes the matrix." Exit B03 → TA-A03.
→ INCORRECT: "Write out A entry by entry. Now write what each position holds after the swap. Compare position (1,2)." → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Dimension reading and entry indexing | "Dimensions of a 4×2 matrix; find a₃₁" |
| Day 3 | Structural interpretation of position | "Does swapping rows 1 and 2 of a matrix give the same matrix?" (No) |
| Day 7 | Column-as-vector perspective | "Extract column 2 of [[1 2]; [3 4]; [5 6]] as a column vector" ([2; 4; 6]) |
| Day 30 | Transfer to matrix multiplication prerequisite | "For product AB to exist, what must be true about the dimensions of A (m×n) and B (p×q)?" (n = p) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.linalg.vector (required): a vector is a 1D ordered list; a matrix is its 2D generalization; row/column vectors are 1×n and m×1 special cases

**Enables:**
- math.linalg.determinant: defined for square matrices; requires matrix structure and notation
- math.linalg.linear-system: a linear system Ax = b requires matrix and vector notation
- math.linalg.linear-map: a linear map between vector spaces is represented by a matrix

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **h=4 lean structure:** Matrix is a definitional vocabulary concept; only 2 main TAs + gate are needed to establish dimension-reading and (i,j) entry-indexing. Downstream concepts handle arithmetic.

2. **CPA_ENTRY = P for proficient difficulty:** Proficient learners have mathematical maturity and prior vector experience. The pictorial grid notation (spreadsheet analogy) is the natural entry point — no physical concrete model needed.

3. **RC mnemonic:** The "RC — Row Count, Column Count" cue is introduced in TA-A01 and reinforced in B01. Linking it to the well-known "RC circuit" label gives a retention hook independent of mathematics.

4. **Column-as-vector in TA-A02:** The third representation (each column is a vector in ℝᵐ) foreshadows matrix–vector multiplication and linear maps without requiring those concepts yet. It plants the geometric interpretation that makes subsequent operations meaningful.

5. **P76 transpose preview:** The P76 probe introduces the idea that transposing rows and columns (2×3 → 3×2) reorganises the same data differently. The concept name "transpose" is deliberately withheld here — it will appear naturally in math.linalg.linear-map or a future blueprint.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.linalg.vector ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | N/A — difficulty is proficient; CPA_ENTRY = P (pictorial entry appropriate for proficient learners) |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P06) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A03 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A03 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A03 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (weather station tabular data) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P06, P11 used | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (weather station 2-day × 3-city data matrix) | PASS |
| V-18 | MC-1 MATRIX-DIMENSION-REVERSED designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
