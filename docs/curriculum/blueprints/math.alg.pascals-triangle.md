# Teaching Blueprint: Pascal's Triangle (`math.alg.pascals-triangle`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.pascals-triangle` |
| name | Pascal's Triangle |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.binomial-theorem` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — the triangle's visual grid before symbolic binomial-coefficient formulas |
| description (KG) | A triangular array of binomial coefficients C(n,k) where each entry is the sum of the two entries above it; encodes patterns in number theory and combinatorics.

 |

## Component 1 — Learning Objectives

- LO1: Construct Pascal's Triangle row by row, using the rule that each entry is the SUM of the two entries directly above it (with edge entries always equal to 1).
- LO2: Identify a specific entry of Pascal's Triangle as the binomial coefficient $\binom{n}{k}$, correctly matching ROW number $n$ and POSITION $k$ within that row.
- LO3: Use Pascal's Triangle to quickly read off the coefficients of a binomial expansion $(x+y)^n$, connecting directly to `math.alg.binomial-theorem`'s formula.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.binomial-theorem` (binomial coefficients $\binom{n}{k}$ and their role in expanding $(x+y)^n$) — Pascal's Triangle is a visual/combinatorial organizing structure for exactly these coefficients.

## Component 3 — Core Explanation

**Pascal's Triangle** is a triangular array where each entry equals the SUM of the two entries directly above it (with each row's outer edges always equal to 1). Row $n$ (starting the count at $n=0$ for the top single-entry row) contains exactly the binomial coefficients $\binom{n}{0},\binom{n}{1},\ldots,\binom{n}{n}$ in order — the $k$-th entry (starting the count at $k=0$) of row $n$ IS $\binom{n}{k}$.

This construction rule ($\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}$) is itself a combinatorial identity, PASCAL'S RULE, provable directly: choosing $k$ items from $n$ either includes a specific fixed item (leaving $\binom{n-1}{k-1}$ ways to choose the rest) or excludes it (leaving $\binom{n-1}{k}$ ways).

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the triangle)**: Row 0: $1$. Row 1: $1,1$. Row 2: $1,2,1$ (the middle $2=1+1$, summing the two entries above it). Row 3: $1,3,3,1$ (each interior entry sums the two above: $3=1+2$, $3=2+1$). Row 4: $1,4,6,4,1$.

**Example 2 (LO2 — reading off a specific binomial coefficient, breaking MC-1)**: Find $\binom{5}{2}$ using Pascal's Triangle. Row 5 (continuing the construction): $1,5,10,10,5,1$. The entry at POSITION $k=2$ (counting positions starting from 0) is $10$ — so $\binom{5}{2}=10$. A common error miscounts either the row number (using 1-indexed rows instead of starting at row 0) or the position within the row, off by one in either direction — careful, explicit 0-indexed counting for BOTH row and position is essential.

**Example 3 (LO3 — reading off binomial expansion coefficients directly)**: Expand $(x+y)^4$ using Pascal's Triangle row 4 ($1,4,6,4,1$) directly as the coefficients: $(x+y)^4=1x^4+4x^3y+6x^2y^2+4xy^3+1y^4=x^4+4x^3y+6x^2y^2+4xy^3+y^4$ — matching exactly what `math.alg.binomial-theorem`'s formula $\sum\binom{4}{k}x^{4-k}y^k$ would compute, but read off directly from the triangle without needing to compute each $\binom{4}{k}$ separately via factorials.

## Component 5 — Teaching Actions

### Teaching Action A01 — Build Row by Row: Sum the Two Above (Primitive P64: Conceptual Shift)

Work Example 1, physically constructing several rows, explicitly pointing at the two entries directly above each new entry being computed, reinforcing the addition rule concretely.

### Teaching Action A02 — Careful 0-Indexed Row and Position Counting (Primitive P06: Contrast Pair)

Work Example 2, explicitly labeling row 5 with 0-indexed positions ($k=0,1,2,3,4,5$) before reading off $\binom{5}{2}$, contrasting against a miscounted (off-by-one) attempt. State the rule: "both the ROW number and the POSITION within the row start counting at 0, not 1 — always explicitly label both before reading off a value."

- **MC-1 hook**: this directly targets MC-1 (miscounting row or position indices).

### Teaching Action A03 — Reading Off Binomial Expansion Coefficients Directly (Primitive P11: Representation Shift)

Work Example 3, connecting the triangle's row entries directly to the binomial expansion's coefficients, positioned alongside descending/ascending powers of $x$ and $y$ respectively.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Construct rows 0 through 6 of Pascal's Triangle.
  2. Find $\binom{6}{3}$ using the triangle, being careful with 0-indexed counting.
  3. Expand $(x+y)^5$ using Pascal's Triangle's row 5 as the coefficients.
  4. Explain, in one sentence, why each entry of Pascal's Triangle equals the sum of the two entries above it, connecting to the combinatorial "include or exclude a specific item" argument.
- **P76 (Transfer Probe, mode = independence)**: "A statistics student needs the coefficients for the binomial probability expansion $(p+q)^6$ (6 independent trials) to compute the probability of exactly 4 successes. (a) Use Pascal's Triangle to find the coefficient corresponding to exactly 4 successes out of 6 trials (i.e., $\binom{6}{4}$), being careful with the 0-indexed row/position counting. (b) Explain, using this lesson's combinatorial construction-rule argument (include or exclude a specific trial), why $\binom{6}{4}=\binom{5}{3}+\binom{5}{4}$ makes intuitive sense in terms of counting successful-trial patterns."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PASCALS-TRIANGLE-ROW-OR-POSITION-MISCOUNTED | Miscounting the row number or position within a row (off-by-one errors from not consistently 0-indexing both) | Foundational |
| MC-2 | TRIANGLE-CONSTRUCTION-EDGE-ENTRIES-NOT-SET-TO-ONE | Forgetting that every row's two edge (outermost) entries are always exactly 1, attempting to compute them via the sum rule instead (which doesn't apply at the edges) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Pascal's Triangle Row/Position Miscounted") → P41 (detect: present Example 2 and check whether the correct entry (10) or an off-by-one neighbor is reported) → P64 (conceptual shift: re-construct the row with EXPLICIT 0-indexed labels above each entry before reading off the target value).
- **B02 (targets MC-2)**: P27 ("Triangle Construction Edge Entries Not Set to One") → P41 (detect: review a submitted row construction for an edge entry that isn't 1) → P64 (conceptual shift: re-state the construction rule precisely — "every row starts and ends with 1; only the INTERIOR entries are computed by summing the two above" — and re-derive the row correctly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.binomial-theorem`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.combinations`, `math.disc.binomial-theorem` (the discrete-mathematics counterparts of these same binomial-coefficient concepts).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that Pascal's Triangle is a genuinely efficient computational and organizational tool once its construction rule and indexing convention are correctly internalized.
- MC-1 was ranked most severe because indexing errors are the single most common practical mistake when using the triangle as a lookup tool, and they produce a plausible-looking but wrong binomial coefficient without any obvious internal inconsistency to signal the error.
- The statistics transfer probe was deliberately chosen to connect this visual/computational tool to its most common real application (binomial probability), while part (b) tests whether the CONSTRUCTION RULE's combinatorial justification (not just its mechanical execution) is genuinely understood.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.binomial-theorem`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: triangle grid before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
