# Teaching Blueprint: Ordering (`math.arith.ordering`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.ordering` |
| name | Ordering |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.arith.number-line` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — number-line position before pure symbolic comparison |
| description (KG) | Determining the relative size of numbers using the relations <, >, ≤, ≥, based on their position on the number line. |

## Component 1 — Learning Objectives

- LO1: Compare two numbers and correctly state their relation using $<,>,\le,\ge$, based on their relative position on the number line (further right = greater).
- LO2: Order three or more numbers from least to greatest (or greatest to least).
- LO3: Correctly order negative numbers and decimals/fractions, where position-based intuition can conflict with digit-based or magnitude-based shortcuts.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.number-line` (the ordered spatial representation this concept's comparisons are grounded in).

## Component 3 — Core Explanation

**Ordering** determines the relative size of numbers using the relations $<$ (less than), $>$ (greater than), $\le$ (less than or equal), $\ge$ (greater than or equal). On the number line, a number further to the RIGHT is always greater — this single spatial rule underlies every numeric comparison, whether for whole numbers, negatives, fractions, or decimals.

Ordering several numbers extends pairwise comparison: arrange them according to their number-line positions, left to right for least-to-greatest.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — straightforward ordering)**: Order $7, 3, 15, 1$ from least to greatest: locate each on the number line ($1,3,7,15$ from left to right) — result: $1<3<7<15$.

**Example 2 (LO3 — negative numbers, breaking MC-1)**: Compare $-8$ and $-3$. On the number line, $-8$ is FURTHER LEFT than $-3$ (further from zero in the negative direction), so $-8<-3$ — even though $8>3$ as magnitudes. The larger the "size" of a negative number (ignoring sign), the SMALLER (more negative) it actually is — a direct reversal of the whole-number-magnitude intuition that "bigger digits mean bigger number."

**Example 3 (LO3 — decimals, breaking MC-2)**: Compare $0.45$ and $0.5$. A common error compares digit-by-digit as if longer decimals were automatically larger ("45 has more digits than 5, so 0.45 > 0.5"), but $0.5=0.50$, and comparing $0.45$ vs. $0.50$ digit by digit (after matching decimal place lengths) shows $0.45<0.50$ — the number of DIGITS after the decimal point is irrelevant; only the actual VALUE, aligned by place, determines the comparison.

## Component 5 — Teaching Actions

### Teaching Action A01 — Further Right Means Greater (Primitive P11: Representation Shift)

Plot Example 1's four numbers on a physical or drawn number line, reading off the least-to-greatest order directly from left-to-right position, before restating the same order using $<$ symbols.

- **MC-1 hook**: ask the student to compare $-8$ and $-3$ before showing the number line, and observe whether they answer based on magnitude alone (revealing MC-1: assuming a larger-magnitude negative number is "bigger," rather than checking its actual leftward position).

### Teaching Action A02 — Magnitude Intuition Fails for Negatives and Decimals (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Plot $-8$ and $-3$ on a number line side by side with $8$ and $3$, showing the POSITIVE pair's ordering ($3<8$) reverses for the NEGATIVE pair ($-8<-3$). State the rule: "for negative numbers, the number line — not raw magnitude — decides the order; more negative is always smaller."

**Contrast 2 (targets MC-2)**: Work Example 3's decimal comparison by first aligning both to the same number of decimal places ($0.45$ vs. $0.50$), then comparing digit by digit at each matched place. State the rule: "align decimals to equal length with trailing zeros before comparing digit by digit — length of the decimal string means nothing on its own."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Order $-5, 2, -1, 0$ from least to greatest.
  2. Compare $0.6$ and $0.58$ using $<$ or $>$, aligning decimal places first.
  3. Order $\frac12, \frac13, \frac14$ from least to greatest (convert to a common denominator or reason via number-line position).
  4. Compare $-12$ and $-20$, stating which is greater and why, explicitly referencing number-line position rather than magnitude.
- **P76 (Transfer Probe, mode = independence)**: "A weather report lists four recorded temperatures: $-3°C$, $2°C$, $-10°C$, $0°C$. (a) Order these temperatures from coldest to warmest. (b) A student argues '$-10°C$ must be warmer than $-3°C$ because 10 is a bigger number than 3' — explain precisely why this reasoning is incorrect, using the number-line rule from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NEGATIVE-NUMBER-MAGNITUDE-CONFUSED-WITH-ORDER | Believing a larger-magnitude negative number is "bigger," rather than recognizing it is smaller (further left/more negative) | Foundational |
| MC-2 | LONGER-DECIMAL-ASSUMED-LARGER | Comparing decimals by digit-string length rather than aligning place values, assuming more decimal digits means a larger value | Foundational |
| MC-3 | ORDERING-DIRECTION-REVERSED | Correctly identifying relative sizes but writing the final ordered sequence in the wrong direction (greatest-to-least when least-to-greatest was requested, or vice versa) | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Negative Magnitude Confused with Order") → P41 (detect: present $-8$ vs. $-3$ and check for a magnitude-based answer) → P64 (conceptual shift: re-plot both numbers on a number line, reading the order directly from position, not digit size).
- **B02 (targets MC-2)**: P27 ("Longer Decimal Assumed Larger") → P41 (detect: present $0.45$ vs. $0.5$ and check for a digit-count-based answer) → P64 (conceptual shift: re-align both decimals to two places ($0.45$ vs. $0.50$) and compare digit by digit at matched positions).
- **B03 (targets MC-3)**: P27 ("Ordering Direction Reversed") → P41 (detect: review a submitted ordered list against the requested direction — least-to-greatest vs. greatest-to-least) → P64 (re-state the requested direction explicitly before re-reading the number line left-to-right or right-to-left as needed).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.number-line`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.90 reflect that ordering is procedurally simple once the number-line rule is internalized, but errors (especially MC-1, MC-2) are common and high-stakes since ordering underlies comparisons throughout the rest of arithmetic.
- MC-1 and MC-2 are both ranked foundational because each stems from over-generalizing a rule that IS valid for positive whole numbers (bigger digits/longer strings often do mean bigger values there) into domains (negatives, decimals) where it fails — a classic overgeneralization misconception, not a random error.
- The weather-temperature transfer probe was deliberately chosen because temperature is a real-world context where negative-number ordering has immediate, checkable physical meaning (colder vs. warmer), reinforcing MC-1's correction with a concrete stake beyond abstract number comparison.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.number-line`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: number-line position before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
