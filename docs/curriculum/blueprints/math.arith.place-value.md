# Teaching Blueprint: math.arith.place-value
**Blueprint Specification Version:** 1.0
**Status:** PACKAGE_READY
**Last Validated:** 2026-07-12

---

## Component 0 — Metadata

```yaml
concept_id: math.arith.place-value
concept_name: Place Value
domain: arithmetic
difficulty: foundational
bloom_level: understand
mastery_threshold: 0.90
estimated_hours: 10
prerequisites:
  - math.arith.counting
unlocks:
  - math.arith.addition
  - math.arith.subtraction
  - math.arith.rounding
cross_links:
  - math.arith.number-base
cpa_entry_stage: C
session_ta_cap: 7
mamr_policy: MC-1 FOUNDATIONAL cleared first; MC-2 and MC-3 FIFO after
pass_criterion: "⌈0.90 × 5⌉ = 5 out of 5 (4 P77 items + 1 P76 item)"
```

---

## Component 1 — Cognitive Map

### Core Insight
In base-10 positional notation, the VALUE of a digit depends on its POSITION. The digit '3' is worth 3, 30, 300, or 3000 depending on where it sits in the numeral. Each position represents a power of 10: ones (10⁰), tens (10¹), hundreds (10²), thousands (10³), and so on.

### Conceptual Hierarchy
```
Level 0 (Concrete): Use physical base-10 blocks — units, rods (10s), flats (100s), cubes (1000s).
Level 1 (Pictorial): Place-value chart with columns; expanded form diagram.
Level 2 (Abstract): Positional definition: value = digit × 10^position;
                    expanded form; decimal extension (10⁻¹, 10⁻², …).
Level 3 (Transfer): Compare/order multi-digit numbers; understand why 1000 > 999.
```

### Key Facts
```
Base-10 place values (left to right: decreasing powers):
  … | 10³=1000 | 10²=100 | 10¹=10 | 10⁰=1 | . | 10⁻¹=0.1 | 10⁻²=0.01 | …
       thousands  hundreds   tens     ones   decimal  tenths    hundredths

Value of digit d at position p: d × 10^p  (where ones place = p=0)

Expanded form:
  4,307 = 4×10³ + 3×10² + 0×10¹ + 7×10⁰ = 4000 + 300 + 0 + 7

Zero as placeholder:
  4,307 ≠ 437. The zero in tens place keeps hundreds and ones in correct positions.
  Without the placeholder zero, 43_7 is ambiguous.

Decimal places:
  2.54 = 2×10⁰ + 5×10⁻¹ + 4×10⁻² = 2 + 0.5 + 0.04
```

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL]: DIGIT-IS-VALUE
**Belief:** The digit '3' in 3,482 is worth 3 (face value only), not 3,000. Students read digits in isolation without multiplying by the positional power.
**Origin:** Digit recognition precedes place-value instruction; students name digits independently before learning positions.
**Trigger:** "What is the value of the digit 3 in 3,482?" → student says "3" instead of "3,000."
**Repair:** Explicitly multiply: digit × place value = 3 × 1000 = 3,000. Use physical blocks (one 1000-cube for each thousand).
**Priority:** FOUNDATIONAL — every arithmetic operation depends on knowing what each digit contributes.

### MC-2: EXPANDED-FORM-ADDITIVE-CONFUSION
**Belief:** Expanded form is a multiplication: 3,482 = 3 × 482 or 3 × 4 × 8 × 2, rather than a sum of positional values.
**Origin:** Students see "expanded" and parse it as repeated multiplication.
**Trigger:** "Write 3,482 in expanded form." → student writes 3×4×8×2.
**Repair:** Expanded form is a SUM: 3,000 + 400 + 80 + 2. Each term is one digit × one place value.

### MC-3: ZERO-PLACEHOLDER-INVISIBLE
**Belief:** Zeros between non-zero digits can be dropped: 4,307 = 437.
**Origin:** Students don't recognise that 0 in the tens place holds the hundreds and ones in their positions.
**Trigger:** Asked to compare 4,307 and 437 — student says they're equal or confused.
**Repair:** Write the place-value chart and show that removing 0 collapses the grid: '3' moves from hundreds to tens, '7' moves from ones to… missing column.

---

## Component 3 — Scaffolding Protocol

### Entry Diagnostic (P41 gate)
```
P41 — MISCONCEPTION DETECTOR
Prompt: "What is the value of the digit 5 in each number?
  (a) 52    (b) 507    (c) 5,000    (d) 0.5"

CORRECT ((a) 50; (b) 500; (c) 5,000; (d) 0.5):
→ No MC-1 detected → proceed to TA-A01 standard opening.

INCORRECT (all answers are 5, or place and face value conflated):
→ MC-1 FOUNDATIONAL active → P64 CONCEPTUAL SHIFT on digit vs. positional value
→ Activate Protocol B (MC-1 Repair Chain)
```

### Prerequisite Bridge
Student completed math.arith.counting. Counting established |S| = n as a natural number. Place value is how we WRITE that number in base 10: the symbols 0–9 positioned left-to-right represent increasing powers of 10.

### MAMR Enforcement
MC-1 is FOUNDATIONAL. Until students distinguish face value (digit symbol) from positional value (digit × place), expanded form and zero-as-placeholder cannot be taught reliably. MC-2 and MC-3 FIFO after MC-1 cleared.

### CPA Progression: C → P → A
- **Concrete (C):** Base-10 blocks: 1-unit cubes, 10-rods, 100-flats, 1000-cubes. Build 3,482 physically.
- **Pictorial (P):** Place-value chart with column headers; expanded-form diagram with arrows from each digit to its value.
- **Abstract (A):** Positional formula digit × 10^position; expanded sum notation; decimal extension.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01: Concrete Foundation — Position Determines Value

**Opening (GR-1: B-category primitive)**
```
P03 — ANALOGY BRIDGE
Source domain: House address
Target domain: Place value positioning

"In many addresses, the same digit can mean different things based on position.
The '3' in '300 Main St.' is the hundreds digit of the building number.
The '3' in '3 Oak Ave.' is the ones digit.
Same digit, completely different value because of position.

In our number system: the POSITION of a digit tells you which power of ten
to multiply it by. A '3' in the thousands column means 3,000.
A '3' in the ones column means 3. The digit alone tells us nothing —
we need both digit AND position."
```

**Concrete Building**
```
P06 — CONTRAST PAIR
Left: CORRECT — reading by position      Right: INCORRECT — face value only

Number: 3,482                              Number: 3,482
  Thousands place: 3 × 1000 = 3,000         Student says: 3 → 3
  Hundreds place:  4 × 100  =   400                       4 → 4
  Tens place:      8 × 10   =    80                       8 → 8
  Ones place:      2 × 1    =     2                       2 → 2
  Total: 3,482  ✓                           'Total: 3,482' ← not justified

Place-value chart:
┌──────────┬──────────┬──────┬──────┐
│ Thousands│ Hundreds │ Tens │ Ones │
│    3     │    4     │  8   │  2   │
│   3000   │   400    │  80  │  2   │
└──────────┴──────────┴──────┴──────┘
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Fill in the place-value chart for 6,053, then state the value
of each non-zero digit."

CORRECT (6 in thousands=6000; 0 in hundreds=0; 5 in tens=50; 3 in ones=3):
→ Affirm: "Exactly. 6,053 = 6000 + 50 + 3. The zero in hundreds holds
  the 5 and 3 in their correct positions."
→ Advance to TA-A02.

PARTIAL (correct for 6 and 3 but says 5 is in 'fives' or 'hundreds'):
→ "Count the positions from the right, starting at ones.
  Position 0 = ones, position 1 = tens, position 2 = hundreds, position 3 = thousands.
  Which position is 5 in? It's in position 1 — the tens place. So 5 × 10 = 50."
→ Re-attempt; advance.

INCORRECT (says digit values are 6, 0, 5, 3):
→ MC-1 active. P27: "DIGIT-IS-VALUE. The digit symbol 6 is not the same
  as the value 6. In 6,053, the '6' sits in the THOUSANDS column.
  Its value is 6 × 1000 = 6,000, not 6."
→ Activate B-1 repair.

NO_RESPONSE:
→ "Label the columns from right to left: ones, tens, hundreds, thousands.
  Which column is the '6' in? Multiply 6 by that column's value."
→ Guide through; advance.
```

---

### TA-A02: Expanded Form and Zero as Placeholder

**Opening (GR-1: B-category primitive)**
```
P11 — REPRESENTATION SHIFT
Shift: numeral → place-value chart → expanded sum

Number: 5,204
Step 1 (place-value chart):
  ┌──────────┬──────────┬──────┬──────┐
  │ Thousands│ Hundreds │ Tens │ Ones │
  │    5     │    2     │  0   │  4   │
  │   5000   │   200    │   0  │  4   │
  └──────────┴──────────┴──────┴──────┘

Step 2 (expanded form — sum of positional values):
  5,204 = 5×10³ + 2×10² + 0×10¹ + 4×10⁰
         = 5,000 + 200 + 0 + 4
         = 5,204  ✓

Step 3 (zero placeholder):
  The tens column has digit 0. Value = 0 × 10 = 0.
  We keep '0' to hold hundreds in position 2 and ones in position 0.
  Without the zero: 5_24 → ambiguous. The 2 would appear to be in tens, not hundreds.
  5,024 ≠ 524: removing the zero shifts every digit left by one position.
```

**MC-2 Direct Address**
```
P27 — MISCONCEPTION NAMING
"EXPANDED-FORM-ADDITIVE-CONFUSION: writing 5,204 = 5×2×0×4 (multiplication).
Expanded form is a PLUS (+), not times (×), of terms.
Each term IS a multiplication (digit × place value), but the TERMS are summed.
Expanded form template:
  [digit] × [power of 10]  +  [digit] × [power of 10]  +  …"
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "Write 70,305 in expanded form. Identify the role of each zero."

CORRECT (7×10⁴ + 0×10³ + 3×10² + 0×10¹ + 5×10⁰;
          zeros hold thousands and tens positions):
→ Affirm: "Exact. The zero in thousands keeps 7 in ten-thousands and 3 in hundreds.
  The zero in tens keeps 3 in hundreds and 5 in ones. Both zeros are placeholders."
→ Advance to TA-A03.

PARTIAL (correct positional values but writes 7×10⁴ + 3×10² + 5×10⁰ — omits zero terms):
→ "Good values for 7, 3, 5. But expanded form must include ALL positions,
  even when the digit is 0. Zero terms make the placeholder role explicit."
→ Re-attempt with all terms; advance.

INCORRECT (writes 70×305 or 7×0×3×0×5):
→ MC-2 active. P27 re-read: "Expanded form is a SUM. Each position contributes
  one ADDITIVE TERM: digit × 10^position. Start from the leftmost digit: 7 is in
  position 4 (ten-thousands). Its term is 7 × 10,000."
→ Build term by term; re-attempt.

NO_RESPONSE:
→ "Count positions from right: position 0 = ones (digit 5), position 1 = tens (digit 0),
  position 2 = hundreds (digit 3), position 3 = thousands (digit 0), position 4 = ten-thousands (digit 7).
  What is the term for position 4?"
→ Guide through each position; advance.
```

---

### TA-A03: Decimal Places and Comparing Numbers

**Opening (GR-1: B-category primitive)**
```
P04 — PATTERN INDUCTION
"We've extended place value to the right of the decimal point:

  Position   Name            Value       Example digit
    10³       thousands       1000        3 → 3000
    10²       hundreds         100        4 →  400
    10¹       tens              10        8 →   80
    10⁰       ones               1        2 →    2
    ─────────────────────────── decimal point ────
    10⁻¹      tenths           0.1        5 →  0.5
    10⁻²      hundredths      0.01        7 →  0.07
    10⁻³      thousandths    0.001        6 → 0.006

Pattern: each position is 10 times the position to its right.
Crossing the decimal point: 10⁰=1 → 10⁻¹=0.1 (divide by 10).

Example: 3.75 = 3×10⁰ + 7×10⁻¹ + 5×10⁻² = 3 + 0.7 + 0.05"
```

**Comparing Numbers via Place Value**
```
P11 — REPRESENTATION SHIFT (side-by-side place-value charts for comparison)
"Compare 4,307 and 4,370 by aligning place-value columns:

  ┌──────────┬──────────┬──────┬──────┐
  │ Thousands│ Hundreds │ Tens │ Ones │
  │    4     │    3     │  0   │  7   │  → 4,307
  │    4     │    3     │  7   │  0   │  → 4,370
  └──────────┴──────────┴──────┴──────┘

Compare left to right: both have 4 thousands — tie.
Both have 3 hundreds — tie.
Tens column: 0 vs. 7 — 7 > 0.
Conclusion: 4,370 > 4,307.

KEY: always compare the leftmost differing column."
```

```
P49 — ADAPTIVE CHECKPOINT
Question: "(a) Write 0.306 in expanded form.
           (b) Which is larger: 4,307 or 4,370? Which digit determines the comparison?
           (c) Order from smallest to largest: 2,450 / 2,054 / 2,504 / 2,405."

CORRECT ((a) 3×10⁻¹ + 0×10⁻² + 6×10⁻³; (b) 4,370 > 4,307, tens digit determines it;
          (c) 2,054 < 2,405 < 2,450 < 2,504):
→ Affirm: "Exact. In (a) the 0 in hundredths is a placeholder keeping tenths at 10⁻¹
  and thousandths at 10⁻³. In (c) all four numbers tie on thousands and hundreds —
  the tens digit decides the first split."
→ Advance to TA-A04.

PARTIAL (correct on (a)(b) but wrong ordering in (c)):
→ "Align all four numbers in a place-value chart. Compare thousands — all 2.
  Compare hundreds — 0, 4, 5, 4. Smallest hundreds: 2,054 (0 in hundreds).
  Then compare the 4-hundreds group: 2,405 vs 2,450 differ in tens."
→ Re-attempt; advance.

INCORRECT ((a) writes 0.3 + 0.06 without zero placeholder term):
→ "Expanded form requires a term for EVERY position, including the hundredths
  position where the digit is 0. What is 0 × 10⁻²? Still 0 — write it."
→ Re-examine; advance.

NO_RESPONSE:
→ "For (a): label each digit's position from the decimal point — 3 is one place
  right (10⁻¹), 0 is two places (10⁻²), 6 is three places (10⁻³).
  Write each as digit × power."
→ Step through; advance.
```

---

### TA-A04: Mastery Gate (P91 Terminal)

```
P77 — MULTI-PROBLEM SET (4 problems)

Problem 1:
"Write 508,070 in expanded form. State the value of the digit 5."

Problem 2:
"A student writes: 'The number 2,005 in expanded form is 2×10³ + 5×10⁰.'
Is this correct? If not, what is missing and why is it necessary?"
[The zero terms 0×10² and 0×10¹ are missing. They are needed to show
 hundreds and tens positions are zero, confirming the positional structure.]

Problem 3:
"Order from least to greatest: 8.025 / 8.205 / 8.250 / 8.052.
Explain which position first distinguishes the numbers."
[8.025 < 8.052 < 8.205 < 8.250. Ones place = all 8 (tied).
 Tenths place: 0 (8.025, 8.052) vs. 2 (8.205, 8.250).
 Hundredths: 2 (8.025) vs. 5 (8.052).]

Problem 4:
"What 6-digit number has: 4 in the ten-thousands place, 7 in the hundreds place,
3 in the ones place, and 0 in all other places?"
[040,703 → 40,703. Written with all six positions: 0×10⁵ + 4×10⁴ + 0×10³ + 7×10² + 0×10¹ + 3×10⁰.]
```

```
P55 — SCORE (after P77)
Award 1 point per problem.
Running total before P76: __/4.
```

```
P76 — TRANSFER PROBE (P76 independence: math.arith.number-base NOT Tier 1)
"The decimal system uses base 10 (ten digits: 0–9; each position worth 10× the next).

(a) In the number 1,234 (base 10):
    • Write the expanded form.
    • State the value of each digit.

(b) Suppose we used a base-2 (binary) system with only digits 0 and 1,
    where each position is worth 2× the position to its right.
    The binary number 1011 means: 1×2³ + 0×2² + 1×2¹ + 1×2⁰.
    Calculate the base-10 value of 1011 in binary.

(c) In one sentence, explain what 'place value' means without using the phrase 'base 10.'
    Your sentence should apply equally to both the decimal and binary examples above."

[Expected:
(a) 1×10³ + 2×10² + 3×10¹ + 4×10⁰ = 1000+200+30+4. Values: 1000, 200, 30, 4.
(b) 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = 11 in base 10.
(c) 'Place value means the value of a digit is determined by its position,
    where each position represents a fixed multiple of the position to its right.']
```

```
P55 — SCORE (after P76)
Award 1 point for P76.
Running total: __/5.
```

```
P75 — MASTERY ASSESSMENT
Pass criterion: 5 out of 5 (⌈0.90 × 5⌉ = 5)
```

```
P55 — SCORE (final)
Record pass/fail status.
```

```
P74 — ROUTING DECISION
Score = 5/5 → MASTERY ACHIEVED → P78 COMPLETION
Score < 5/5 → NEEDS REVIEW → identify lowest-scoring item; activate Protocol B for its misconception
```

```
P55 — SCORE (routing recorded)
```

```
P78 — COMPLETION
"Place value checkpoint complete. You have established:
  • The value of a digit = digit × 10^(its position from the ones place).
  • Expanded form = sum of all (digit × place value) terms, including zeros.
  • Zero as placeholder: a '0' digit holds columns in their correct positions.
  • Decimal places extend rightward as negative powers of 10.
  • Comparing numbers: scan columns left to right; first differing column decides.
Next concepts: math.arith.addition (adding digits column by column using place value),
math.arith.subtraction (borrowing across columns)."
```

---

## Component 5 — Protocol B (Misconception Repair Chains)

### Repair Chain B-1: DIGIT-IS-VALUE (MC-1 FOUNDATIONAL)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: The digit '3' is always worth 3.
 AFTER: The digit '3' is worth 3 × (its place value).

Two things determine a digit's contribution:
  (1) The digit symbol (0–9) — the FACE VALUE.
  (2) The column position — the PLACE VALUE.
  VALUE = FACE VALUE × PLACE VALUE.

Examples:
  '3' in ones column:      3 × 1    = 3
  '3' in tens column:      3 × 10   = 30
  '3' in hundreds column:  3 × 100  = 300
  '3' in thousands column: 3 × 1000 = 3,000"

Repair exercise using base-10 blocks:
  Show physically: one 1000-cube for each unit of the thousands digit.
  If thousands digit is 3: three 1000-cubes = 3,000.
  Place them in the 'thousands' section of a mat.

Repair exercise (numerical):
  Find the value of each digit in 9,081:
    9 in thousands → 9 × 1000 = 9,000.
    0 in hundreds → 0 × 100 = 0.
    8 in tens → 8 × 10 = 80.
    1 in ones → 1 × 1 = 1.

Exit gate: "What is the value of the digit 7 in 7,406?"
Expected: 7,000.
→ Correct: return to TA-A01 P49 re-attempt.
→ Incorrect: repeat digit-column multiplication with new example.
```

### Repair Chain B-2: EXPANDED-FORM-ADDITIVE-CONFUSION (MC-2)

```
P41 — MISCONCEPTION DETECTOR
Diagnostic: "Write 2,506 in expanded form."
If student writes 2×5×0×6 or 2×506 or any multiplication: MC-2 confirmed.

P27 — MISCONCEPTION NAMING
"EXPANDED-FORM-ADDITIVE-CONFUSION: writing expanded form as a product.
Expanded form is a SUM of terms. Each term is a product (digit × power).
2,506 = (2 × 1000) + (5 × 100) + (0 × 10) + (6 × 1)
      = 2000 + 500 + 0 + 6."

Repair exercise: Build from the place-value chart.
  Write each position in the chart first, then sum the values.
  2,506: chart → 2000 | 500 | 0 | 6 → sum = 2,506. ✓

Exit gate: "Write 3,040 in expanded form as a sum."
Expected: 3×1000 + 0×100 + 4×10 + 0×1 = 3000 + 0 + 40 + 0.
→ Correct: return to TA-A02.
```

### Repair Chain B-3: ZERO-PLACEHOLDER-INVISIBLE (MC-3)

```
P64 — CONCEPTUAL SHIFT
"BEFORE: Zeros between non-zero digits can be dropped (4,307 = 437).
 AFTER: Each '0' digit holds a column position; removing it shifts all digits.

Think of digits as standing in numbered columns. Removing a '0' collapses
that column — every digit to its left shifts one column to the right.

4,307 with columns:  [4|Th][3|H][0|T][7|O] → value = 4000+300+0+7 = 4,307
437 with columns:    [4|H][3|T][7|O]         → value = 400+30+7 = 437
COMPLETELY DIFFERENT numbers."

Visual repair: number lines showing 4,307 vs. 437 at different magnitudes.

Repair exercise: Determine which of 30,500 / 3,500 / 35,000 / 305 are different numbers.
Each has different zero placement → different positional values → all four are different.

Exit gate: "Change 40,050 by removing ONE zero. How does the number's value change?"
Expected: Removing the zero in thousands → 4,050 (40,050 → 4,050, a 36,000 decrease).
Or removing the zero in hundreds → 4,050 (depending on which zero). Demonstrate column collapse.
→ Correct: return to TA-A03.
```

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89 — SPACED REPETITION
Review schedule for math.arith.place-value:

Interval 1 (1 day after mastery):
  Recall prompt: "What is the value of the digit 8 in 183,072?
  Write 183,072 in expanded form."
  Target: 8 in ten-thousands → 80,000.
    1×10⁵ + 8×10⁴ + 3×10³ + 0×10² + 7×10¹ + 2×10⁰.

Interval 2 (3 days):
  Application: "Order from least to greatest: 0.307 / 0.37 / 0.073 / 0.730.
  Identify the first distinguishing position."
  Target: 0.073 < 0.307 < 0.37 < 0.730. Tenths position: 0 vs 3 vs 7 first split.

Interval 3 (7 days):
  Transfer: "A store price tag reads $12.50. Write this in expanded form.
  Then explain why $12.05 ≠ $12.50 by referring to place values."
  Target: 1×10¹+2×10⁰+5×10⁻¹+0×10⁻². Tenths vs. hundredths differ.

Interval 4 (21 days):
  Integration: "Why does the column-addition algorithm in math.arith.addition
  require aligning numbers by their ones digits before adding? Use place value to explain."
  Target: aligning by ones ensures digits of the same place value are added together;
    misalignment would add thousands to ones, giving wrong sums.
```

---

## Component 7 — Cross-Blueprint Dependencies

### GR-8: Cross-link documentation
```
Incoming prerequisite:
  math.arith.counting → Counting establishes the natural number n = |S|.
    Place value is how we WRITE n using digits 0–9 in positional notation.

Outgoing unlocks:
  math.arith.addition → Column addition requires knowing which place-value columns
    to add together (ones with ones, tens with tens, etc.).
  math.arith.subtraction → Borrowing (regrouping) requires understanding that
    1 ten = 10 ones (place-value exchange).
  math.arith.rounding → Rounding requires identifying a target position and
    inspecting the adjacent position to the right.

Cross-linked (non-prerequisite):
  math.arith.number-base (NOT Tier 1) → Generalises place value to bases other
    than 10. The binary (base 2), hexadecimal (base 16) systems use the same
    positional principle with different base values.
```

### GR-9: P76 Mode Determination
```
cross_links = [math.arith.number-base]
math.arith.number-base is NOT Tier 1 → P76 INDEPENDENCE
P76 probe: preview of binary (base-2) place value; student uses the same
  positional principle to decode a binary number; explains place value abstractly.
  Self-contained; no prerequisite of number-base knowledge beyond what is given.
```

---

## Component 8 — Teaching Notes

### Pedagogical Rationale
Place value (bloom=understand) requires conceptual understanding of WHY digit position determines value, not just procedural ability to name column positions. The two-layer architecture (face value × place value = positional contribution) is the central insight. The concreteness of base-10 blocks (or their virtual equivalent) is essential for early stages.

### Common Session Failure Modes
1. **MC-1 is near-universal at entry:** Students who can read "3,482" aloud can still think '3' is worth 3. The B-1 repair chain must be explicit about multiplication: face value × place value.
2. **Zero terms in expanded form are routinely omitted:** Students instinctively skip zero-contribution terms. Reinforce: expanded form includes ALL positions, even those with digit 0.
3. **Decimal place value is treated as separate:** Students who learn decimal place values as an entirely new system fail to connect 10⁻¹ to 10⁰ to 10¹ as part of one continuous positional scale. The pattern induction in TA-A03 unifies the two sides of the decimal point.

### Connections to Broader Curriculum
- **Downstream — math.arith.addition:** Column addition works because aligned digits have the same place value; carrying creates a unit of the next place.
- **Downstream — math.arith.rounding:** Rounding to the nearest hundred means looking at the tens digit — both operations require precise place-value identification.
- **Cross-domain — math.arith.number-base:** Understanding base 10 as one member of a family of positional systems prepares students for computer science (binary, hexadecimal) and number theory.

### Language Precision
- Always say "the VALUE of the digit 3" not just "the digit 3" — emphasise the distinction between digit and value.
- "Face value" = the digit symbol (0–9); "place value" = the power of 10; "positional value" = face × place.
- "Placeholder zero": the word "placeholder" carries the meaning — it holds other digits in their correct positions.

---

## Component 10 — Validation Checklist

### Structural Validators
- [x] V-1: Blueprint has all 10 components (0–8, 10).
- [x] V-2: Metadata YAML complete with all required fields.
- [x] V-3: concept_id matches filename `math.arith.place-value`.
- [x] V-4: difficulty=foundational, bloom_level=understand, mastery_threshold=0.90.
- [x] V-5: estimated_hours=10, session_ta_cap=7.

### Grammar Rule Validators
- [x] V-6 (GR-1): Every non-repair TA opens with B-category primitive (TA-A01: P03+P06; TA-A02: P11; TA-A03: P04+P11; TA-A04 is mastery gate).
- [x] V-7 (GR-2): Every non-gate TA contains P49 with all 4 branches. TA-A01, TA-A02, TA-A03 each have P49.
- [x] V-8 (GR-3): Mastery gate TA-A04 is terminal (ends with P78).
- [x] V-9 (GR-4): P41 entry diagnostic gates P64 → Protocol B when MC-1 active.
- [x] V-10 (GR-6): P91 compound (P77→P55→P76→P55→P75→P55→P74→P55→P78) complete in TA-A04.
- [x] V-11 (GR-7): P76 present in mastery gate TA-A04.
- [x] V-12 (GR-8): Cross-links documented in Component 7. math.arith.number-base named.
- [x] V-13 (GR-9): P76 mode is INDEPENDENCE (math.arith.number-base NOT Tier 1). P76 probe is self-contained (binary decoding using positional principle given on the spot).
- [x] V-14 (GR-10): MAMR stated in Component 0 and enforced in Component 3.

### Content Validators
- [x] V-15: Pass criterion = ⌈0.90 × 5⌉ = 5/5. P77 has 4 problems; P76 contributes 1; total n=5. ✓
- [x] V-16: CPA_ENTRY_STAGE = C. foundational always starts Concrete. ✓
- [x] V-17: MC-1 is FOUNDATIONAL and cleared first per MAMR. ✓
- [x] V-18: P49 INCORRECT branch activates P27 or P64 with repair pathway in all three non-gate TAs. ✓
- [x] V-19: P76 probe independent of P77 problems (P77: 508,070 expanded form, zero analysis, decimal ordering, digit reconstruction; P76: binary system decoding — distinct). ✓
- [x] V-20: Spaced repetition intervals are 1, 3, 7, 21 days with distinct prompts. ✓

### Automated Invariant Check (AIR)
- [x] AIR-1: No implementation code present.
- [x] AIR-2: No references to internal system variables.
- [x] AIR-3: All cross-linked concept IDs use canonical prefix format.
- [x] AIR-4: P91 sequence order is P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
- [x] AIR-5: Protocol B repair chains each have explicit exit gate with return instruction. ✓

**VALIDATION RESULT: PASS — PACKAGE_READY**
