# Teaching Blueprint: Percentile (`math.stats.percentile`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.percentile` |
| name | Percentile |
| domain | Statistics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.stats.measures-of-spread` |
| unlocks | (none in KG) |
| cross_links | `math.prob.quantile` |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The p-th percentile is the value below which p% of the data fall. Q1=25th percentile, Q2=median=50th, Q3=75th. IQR=Q3−Q1.

 |

## Component 1 — Learning Objectives

- LO1: Define the $p$-th percentile as the value BELOW which $p\%$ of the data falls — and correctly interpret this as a statement about the PROPORTION of data below a threshold, not a raw score or count.
- LO2: Identify the three QUARTILES as specific percentiles: $Q_1$ (25th percentile), $Q_2$ (50th percentile, which is EXACTLY the MEDIAN), and $Q_3$ (75th percentile) — recognizing $Q_2$ isn't a coincidentally similar but separate concept from the median; they are the SAME value.
- LO3: Compute the Interquartile Range $\text{IQR}=Q_3-Q_1$ — the SPREAD of the MIDDLE 50% of the data — and recognize the IQR is ROBUST to outliers (like the median), since it depends only on the two quartile positions, ignoring the extreme tails entirely.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.measures-of-spread` — percentiles and IQR are a refinement of spread-measurement concepts.

## Component 3 — Core Explanation

The **$p$-th percentile** is the value below which $p\%$ of the data falls — e.g. being at the 90th percentile on a test means 90% of test-takers scored LOWER than you (NOT that you scored 90% of the questions correctly, a common confusion between percentile RANK and raw SCORE percentage).

Three special percentiles are called **quartiles**: $Q_1$ (the 25th percentile), $Q_2$ (the 50th percentile — this is EXACTLY the same value as the MEDIAN, not merely analogous to it), and $Q_3$ (the 75th percentile).

The **Interquartile Range** $\text{IQR}=Q_3-Q_1$ measures the spread of the MIDDLE 50% of the data (between the 25th and 75th percentiles), deliberately EXCLUDING the extreme upper and lower quarters. Because it ignores the tails entirely, the IQR is ROBUST to outliers — much like the median, an extreme value at either end has little to no effect on $Q_1$ or $Q_3$'s positions.

## Component 4 — Worked Examples

**Example 1 (LO1 — percentile as proportion below, breaking MC-1)**: A student scores at the 85th percentile on a standardized test. Explain what this means. It means 85% of OTHER test-takers scored LOWER than this student — it says NOTHING directly about what fraction of TEST QUESTIONS the student answered correctly (which could be entirely different, e.g. 92% of questions correct). A common error confuses "85th percentile" with "scored 85% of the questions correctly" — percentile RANK (relative standing among test-takers) and raw SCORE percentage (fraction of questions correct) are entirely DIFFERENT quantities that can differ substantially.

**Example 2 (LO2 — Q2 equals the median, breaking MC-2)**: For the dataset $\{3,5,7,9,11\}$, find $Q_2$ and separately find the median, and compare. Sorted, the middle value is $7$. Both the median AND $Q_2$ are exactly $7$ — they are the SAME quantity, not two separately-computed values that happen to coincide. A common error treats $Q_2$ and the median as requiring SEPARATE computation methods that might occasionally disagree — $Q_2$ IS the median by definition; there's no scenario where a correctly-computed $Q_2$ differs from the correctly-computed median.

**Example 3 (LO3 — IQR robustness, breaking MC-3 combined earlier)**: For $\{2,4,6,8,10,12,100\}$ (with an outlier, 100), compute $Q_1$, $Q_3$, and the IQR, and compare to the full RANGE (max$-$min). With the data sorted (already sorted here), $Q_1=4$, $Q_3=12$ (using the lower/upper half's medians), so $\text{IQR}=12-4=8$ — barely affected by the outlier 100. The full RANGE $=100-2=98$ — DRASTICALLY inflated by the single outlier. This confirms the IQR's robustness compared to the outlier-sensitive full range.

## Component 5 — Teaching Actions

### Teaching Action A01 — Percentile Rank Is Proportion Below, Not a Raw Score Percentage (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting percentile rank against raw score percentage as genuinely different quantities.

- **MC-1 hook**: this directly targets MC-1 (confusing percentile rank with raw score percentage).

### Teaching Action A02 — Q2 IS the Median, Not a Separately-Computed Value (reused procedure)

Work Example 2, explicitly verifying $Q_2$ and the median produce identical results.

- **MC-2 hook**: this directly targets MC-2 (treating $Q_2$ and the median as separate quantities that might disagree).

### Teaching Action A03 — IQR Is Robust to Outliers, Unlike the Full Range (Primitive P64: Conceptual Shift)

Work Example 3, explicitly contrasting the IQR's stability against the full range's outlier sensitivity.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Explain what it means for a value to be at the 40th percentile of a dataset.
  2. For $\{10,20,30,40,50\}$, find $Q_2$ and verify it matches the median.
  3. For $\{1,3,5,7,9,11,13\}$, find $Q_1$, $Q_3$, and the IQR.
  4. Explain, in one sentence, why the IQR is more robust to outliers than the full range (max minus min).
- **P76 (Transfer Probe, mode = independence)**: "A pediatrician tells a parent their child's height is 'at the 60th percentile' for their age group. (a) Explain what this specifically means about the child's height relative to other children the same age. (b) Explain why this is a fundamentally different statement than saying 'the child is 60% as tall as the tallest child in the group.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERCENTILE-RANK-CONFUSED-WITH-RAW-SCORE-PERCENTAGE | Confusing percentile rank (proportion of data below a value) with raw score percentage (fraction of items answered correctly), treating them as the same quantity | Foundational |
| MC-2 | Q2-TREATED-AS-A-SEPARATELY-COMPUTED-VALUE-FROM-THE-MEDIAN | Treating Q2 (the 50th percentile) as requiring separate computation from the median, rather than recognizing they are the identical quantity by definition | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Percentile Rank Confused with Raw Score Percentage") → P41 (detect: present Example 1 and check whether percentile rank is (incorrectly) equated with raw score percentage) → P64 (conceptual shift: re-state the percentile definition explicitly as "proportion of data below," distinguishing it from a raw score fraction).
- **B02 (targets MC-2)**: P27 ("Q2 Treated as a Separately Computed Value from the Median") → P41 (detect: present Example 2 and check whether $Q_2$ and the median are (incorrectly) treated as potentially different) → P64 (conceptual shift: re-verify both computations arrive at the identical value, confirming they are the same quantity by definition).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.measures-of-spread`.
- **Unlocks**: none recorded in the KG.
- **Cross-links**: `math.prob.quantile` (the probability-theory generalization of this concept).

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that percentile interpretation is a foundational skill with genuine everyday relevance (test scores, growth charts, etc.).
- MC-1 was ranked Foundational because it produces a genuinely wrong interpretation of reported data, a very common real-world misunderstanding, while MC-2 was ranked Moderate as primarily a conceptual redundancy-recognition issue rather than a computational error.
- The pediatric-growth-percentile transfer probe was deliberately chosen because growth chart percentiles are a genuinely common, high-stakes context where percentile-rank/raw-percentage confusion could cause real parental misunderstanding.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.measures-of-spread`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (`math.prob.quantile`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
