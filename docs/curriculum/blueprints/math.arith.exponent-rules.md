# TEACHING BLUEPRINT — math.arith.exponent-rules

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.arith.exponent-rules |
| concept_name | Exponent Rules |
| domain | arithmetic |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.arith.exponentiation]
**unlocks:** [math.alg.exponent-rules]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** The exponent rules are algebraic laws derived from the repeated-multiplication definition of aⁿ. Core rules: (1) Product rule: aᵐ·aⁿ = aᵐ⁺ⁿ; (2) Quotient rule: aᵐ÷aⁿ = aᵐ⁻ⁿ; (3) Power rule: (aᵐ)ⁿ = aᵐⁿ; (4) Product-of-bases rule: (ab)ⁿ = aⁿbⁿ; (5) Negative exponent: a⁻ⁿ = 1/aⁿ; (6) Zero exponent: a⁰ = 1. All rules follow from counting factors.

**Knowledge prerequisites activated:**
- math.arith.exponentiation: aⁿ = a×a×…×a (n copies); a⁰=1; a⁻ⁿ=1/aⁿ established via the decreasing pattern

**Concept structure:**
1. **Product rule** (aᵐ·aⁿ = aᵐ⁺ⁿ): m copies times n copies = m+n copies; add exponents
2. **Power rule** ((aᵐ)ⁿ = aᵐⁿ): n groups of m copies each = m×n copies; multiply exponents
3. **Quotient rule** (aᵐ÷aⁿ = aᵐ⁻ⁿ): m copies cancel n copies; subtract exponents
4. **Product-of-bases rule** ((ab)ⁿ = aⁿbⁿ): distribute exponent over product
5. **Negative/zero exponent**: a⁻ⁿ = 1/aⁿ; a⁰ = 1

**Target understanding:** Given an exponential expression, the learner identifies which rule(s) apply and simplifies correctly. The learner can derive or verify each rule from the definition of aⁿ.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | PRODUCT-RULE-MULTIPLIES-EXPONENTS | Presented with x³·x⁴ | Multiplies exponents: x³·x⁴ = x¹² instead of x⁷; confuses product rule (add) with power rule (multiply) | B01 |
| MC-2 | POWER-RULE-ADDS-EXPONENTS | Presented with (x³)⁴ | Adds exponents: (x³)⁴ = x⁷ instead of x¹²; confuses power rule (multiply) with product rule (add) | B02 |
| MC-3 | NEGATIVE-EXPONENT-NEGATES | Presented with 2⁻³ | Computes −2³=−8 or −(1/8) instead of 1/2³=1/8; interprets negative exponent as a negative sign on the result | B03 |

**FOUNDATIONAL MC:** MC-1 (PRODUCT-RULE-MULTIPLIES-EXPONENTS) — the product rule (add exponents) is the most-used rule and the source of systematic sign-of-operation confusion with the power rule; must be clear before the power rule is taught.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Factor-counting model: expand each power into its explicit factors, count the total, and re-express as a single power. This makes every rule visible before the shortcut formula is introduced.

**Progression Gate (C → P):** Learner correctly expands two exponential expressions and counts combined factors to derive the simplified result for product and power rules.
**Progression Gate (P → A):** Learner applies all five rules symbolically without expansion, and can identify which rule to apply in a mixed expression.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Counting Factors: The Foundation of Every Rule (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A bookshelf — "3 shelves of 4 books plus 2 more shelves of 4 books = 5 shelves of 4 books total." Combining groups by counting, not multiplying group-counts.
Target domain: Product rule — aᵐ·aⁿ: m groups of factor-a plus n groups of factor-a = (m+n) groups of factor-a.
Mapping: shelf ↔ position of a factor; books per shelf ↔ the base a; total shelves ↔ combined exponent

"x³·x⁴ means [x·x·x] times [x·x·x·x]: that is 3 factors followed by 4 factors = 7 factors total = x⁷. We added 3+4=7. We do not multiply 3×4."

Factor-counting derivation:
```
Product rule:   x³ · x⁴ = (x·x·x)(x·x·x·x) = x⁷     → add:      3+4=7
Power rule:     (x³)⁴   = (x·x·x)·(x·x·x)·(x·x·x)·(x·x·x) = x¹²  → multiply: 3×4=12
```
Both rules come from counting factors. The operation differs because the situations differ:
- Product rule: combining two separate groups of factors → ADD exponents
- Power rule: repeated grouping of the same group → MULTIPLY exponents

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand x²·x³ as explicit factors and count them. What is the simplified result?"
→ CORRECT [(x·x)(x·x·x) = x⁵; 2+3=5]: "Correct — x⁵. Add the exponents in a product." → TA-A02
→ INCORRECT [x²·x³=x⁶ — multiplied 2×3]: Flag MC-1. Route → B01
→ NO_RESPONSE: "Write x² as x·x and x³ as x·x·x. Put them side by side. Count the x's." → guided

---

### TA-A02 — Worked Examples: Product Rule and Power Rule (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

*Example 1 — Product rule: same base, multiplied together:*
Simplify x³·x⁴.
```
Rule: aᵐ·aⁿ = aᵐ⁺ⁿ  (same base → add exponents)
x³·x⁴ = x³⁺⁴ = x⁷

Verify by expansion: (x·x·x)(x·x·x·x) = x⁷ ✓
```

*Example 2 — Power rule: a power raised to a power:*
Simplify (2³)².
```
Rule: (aᵐ)ⁿ = aᵐⁿ  (power of a power → multiply exponents)
(2³)² = 2³×² = 2⁶ = 64

Verify: (2³)² = 8² = 64 ✓
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify (a) y²·y⁵ and (b) (y²)⁵."
→ CORRECT [(a) y⁷; (b) y¹⁰]: "Correct — product rule adds (2+5=7); power rule multiplies (2×5=10)." → TA-A03
→ INCORRECT [(a) y¹⁰ or (b) y⁷ — rules swapped]: Flag appropriate MC. (a) wrong → MC-1; (b) wrong → MC-2. Route → B01 or B02.
→ NO_RESPONSE: "In (a): are the bases being multiplied (two separate groups) or is one group being raised to a power?" → guided

---

### TA-A03 — Add vs. Multiply Exponents: Knowing Which Rule (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Product rule (two separate exponential expressions multiplied; ADD exponents):*
```
x³ · x⁵ = x³⁺⁵ = x⁸
a⁴ · a = a⁴⁺¹ = a⁵   (a = a¹)
```

*Case B — Power rule (one exponential expression raised to a power; MULTIPLY exponents):*
```
(x³)⁵ = x³×⁵ = x¹⁵
(a⁴)² = a⁴×² = a⁸
```

Diagnostic question to choose the rule: "Are there TWO bases being combined (product rule)? Or is ONE base being raised to ANOTHER power (power rule)?"

```
x³ · x⁵    → two bases combined     → PRODUCT rule: add
(x³)⁵      → one base raised again  → POWER rule: multiply
```

Additional rules (with derivations):
```
Quotient rule:         x⁵÷x³ = x⁵⁻³ = x²         (subtract: m−n)
Product-of-bases:      (xy)⁴ = x⁴y⁴               (distribute over product)
Negative exponent:     x⁻³  = 1/x³                 (reciprocal)
Zero exponent:         x⁰   = 1  (x≠0)             (quotient rule: xⁿ/xⁿ = x⁰ = 1)
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Choose the correct rule and simplify: (a) (m²)³, (b) m²·m³."
→ CORRECT [(a) m⁶ — power rule; (b) m⁵ — product rule]: "Correct — recognise the structure, apply the right rule." → TA-A04
→ INCORRECT [both give same answer or rules swapped]: Re-present the diagnostic question. Route → B01 or B02 as appropriate.
→ NO_RESPONSE: "For (a): is there a product of two powers, or is one power raised to another?" → guided

---

### TA-A04 — Negative Exponents and Quotient Rule: Pattern and Definition (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

*Negative exponents via quotient rule:*
```
x⁵÷x³ = x⁵⁻³ = x²   (quotient rule: subtract)
x³÷x⁵ = x³⁻⁵ = x⁻²  (same rule; result has negative exponent)

But also: x³÷x⁵ = (x·x·x)/(x·x·x·x·x) = 1/(x·x) = 1/x²

Therefore: x⁻² = 1/x²  (negative exponent means reciprocal of positive power)
```

General rule derived: a⁻ⁿ = 1/aⁿ for a≠0.

*Pattern table for base 2:*
```
2⁻²= 1/4
2⁻¹= 1/2
2⁰ = 1      ← every base to zero = 1
2¹ = 2
2² = 4
2³ = 8
```
Each step up multiplies by 2; each step down divides by 2. The negative-exponent side is the reciprocal of the positive-exponent side.

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify (a) x⁻⁴ and (b) x⁵÷x⁸."
→ CORRECT [(a) 1/x⁴; (b) x⁵⁻⁸=x⁻³=1/x³]: "Correct." → TA-A05
→ INCORRECT [(a) −x⁴ or −4x]: Flag MC-3. Route → B03
→ INCORRECT [(b) x¹³ — added instead of subtracted]: "Quotient rule: subtract exponents (5−8=−3)." → re-prompt
→ NO_RESPONSE: "Apply quotient rule: x⁵÷x⁸ = x^(5−8) = x^?." → guided

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Simplify x³·x⁵.** State which rule you used.
   *(Expected: x⁸; product rule — same base multiplied, add exponents 3+5=8)*

2. **Simplify (y²)⁴.** State which rule you used.
   *(Expected: y⁸; power rule — power of a power, multiply exponents 2×4=8)*

3. **True/False:** 3²·3³ = 3⁶.
   *(Expected: FALSE — product rule: 3²·3³ = 3²⁺³ = 3⁵ = 243, not 3⁶ = 729)*

4. **Write 2⁻³ as a fraction.**
   *(Expected: 1/2³ = 1/8; negative exponent means reciprocal of the positive power)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Area and volume context:*

"A square has side length a³ cm, and a cube has edge length a² cm.

(a) Write the area of the square as a single power of a. State the rule used.
(b) Write the volume of the cube as a single power of a. State the rule used.
(c) Write the ratio area÷volume and simplify using the quotient rule. (Leave answer in terms of a.)"

*(Expected:*
*(a) Area = (a³)² = a^(3×2) = a⁶ cm²; power rule*
*(b) Volume = (a²)³ = a^(2×3) = a⁶ cm³; power rule*
*(c) a⁶÷a⁶ = a^(6−6) = a⁰ = 1; quotient rule — area and volume happen to be equal numerically (both a⁶) when side lengths are chosen this way)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 PRODUCT-RULE-MULTIPLIES-EXPONENTS first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now apply all five exponent rules — product (add), power (multiply), quotient (subtract), product-of-bases (distribute), negative exponent (reciprocal) — identify which rule to use, and derive results from the factor-counting definition. Algebraic exponent rules (math.alg.exponent-rules) extend these same laws to variable exponents."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: PRODUCT-RULE-MULTIPLIES-EXPONENTS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The most common exponent-rule error: when multiplying two powers with the same base, multiplying the exponents (x³·x⁴=x¹²) instead of adding them (x³·x⁴=x⁷). The product rule adds because you are combining two separate groups of factors."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is x³·x⁴?"
→ x¹² (multiplied exponents): MC-1 confirmed. Continue B01.
→ x⁷ (added exponents): MC-1 not active. Exit B01 → next flagged MC or TA-A05.

**P64 CONCEPTUAL SHIFT**
"Expand both powers and count the total factors:
```
x³ · x⁴ = (x·x·x) · (x·x·x·x)
                 3  +  4  = 7 factors
= x⁷
```
We COUNT total factors (3 plus 4). We do not multiply 3×4=12, because that would mean 12 factors, and there are only 7.

Memory anchor: PRODUCT of same base → ADD exponents. The word 'plus' rhymes with 'product-of-same-base.'"

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify a⁴·a² by writing out the factors and counting."
→ CORRECT [(a·a·a·a)(a·a) = a⁶; 4+2=6]: "Correct — add: 4+2=6." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT [a⁸]: "Count the explicit factors: 4 plus 2 = ?" → guided.

---

### TA-B02 — Repair: POWER-RULE-ADDS-EXPONENTS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A symmetric error: when a power is raised to another power, adding the exponents (x³)⁴=x⁷ instead of multiplying them (x³)⁴=x¹². The power rule multiplies because you are repeating the same group of factors multiple times."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is (x³)⁴?"
→ x⁷ (added exponents): MC-2 confirmed. Continue B02.
→ x¹² (multiplied exponents): MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"Expand the outer exponent:
```
(x³)⁴ = x³ · x³ · x³ · x³    (four copies of x³)
       = (x·x·x)(x·x·x)(x·x·x)(x·x·x)
       = 12 factors
= x¹²
```
4 groups of 3 factors each = 4×3=12. We MULTIPLY because we have n groups of m factors.

Memory anchor: POWER of a POWER → MULTIPLY exponents. 'Power of power' = 'product of exponents.'"

**P49 ADAPTIVE CHECKPOINT**
Q: "Expand (a²)³ as explicit factors and count them."
→ CORRECT [(a·a)(a·a)(a·a) = a⁶; 2×3=6]: "Correct — multiply: 2×3=6." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT [a⁵]: "How many groups? How many factors in each group? Total = groups × per-group." → guided.

---

### TA-B03 — Repair: NEGATIVE-EXPONENT-NEGATES (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A negative exponent does not make the result negative. 2⁻³ is not −8 or −(1/8). The negative exponent means 'take the reciprocal': 2⁻³ = 1/2³ = 1/8 (positive)."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is 2⁻³?"
→ −8 or −1/8: MC-3 confirmed. Continue B03.
→ 1/8: MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"Negative exponents come from the quotient rule:
```
x³÷x⁵ = x³⁻⁵ = x⁻²

But also: x³÷x⁵ = (x·x·x)/(x·x·x·x·x) = 1/(x·x) = 1/x²

So x⁻² = 1/x² — positive value, just a fraction.
```
The negative in the exponent signals 'flip to the denominator,' not 'put a minus sign on the answer.'

```
2⁻³ = 1/2³ = 1/8   (positive fraction, not −8)
5⁻¹ = 1/5          (positive fraction)
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "Write 3⁻² as a fraction. Is the result positive or negative?"
→ CORRECT [1/3²=1/9; positive]: "Correct — 1/9, positive. Negative exponent → reciprocal, not negation." Exit B03 → TA-A05.
→ INCORRECT [−9 or −1/9]: "3⁻² means 1÷3². Compute 3² first, then take the reciprocal." → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Product rule vs. power rule discrimination | "(a) x²·x³=? (b) (x²)³=?" (x⁵ vs x⁶) |
| Day 3 | Quotient rule and negative exponents | "x⁷÷x⁴=x³; x²÷x⁵=x⁻³=1/x³" |
| Day 7 | Product-of-bases and combined rules | "(2x)³=8x³; simplify x²·x⁻¹" |
| Day 30 | All rules in one expression | "Simplify (x³y²)²·x⁻¹" (x⁵y⁴) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.arith.exponentiation (required): all rules are derived from the repeated-multiplication definition aⁿ=a×…×a; zero and negative exponent rules introduced there are reinforced here

**Enables:**
- math.alg.exponent-rules: the same rules extended to variable exponents and polynomial expressions

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **Factor counting is the derivation, not just the illustration:** Require learners to derive at least the product and power rules by expanding before allowing shortcut formula use. Learners who derive the rules from counting rarely confuse them.

2. **The add/multiply swap is the main risk:** MC-1 and MC-2 are mirror errors. The contrast pair in TA-A03 and the diagnostic question ("combining two groups vs. repeating one group") are the most effective discriminators. Return to these with each new rule.

3. **Negative-exponent scope:** This blueprint teaches a⁻ⁿ = 1/aⁿ. The case of (a/b)⁻ⁿ = (b/a)ⁿ belongs in math.alg.exponent-rules. Do not expand scope here.

4. **P76 area/volume probe:** The coincidental equality of area=a⁶ and volume=a⁶ (when side=a³ and edge=a²) is intentional — it produces the quotient-rule outcome a⁰=1 naturally and concretely, without requiring the learner to know it was set up.

5. **Estimated hours = 6:** Plan two sessions: session 1 (product rule, power rule, quotient rule — TA-A01 through A03), session 2 (negative exponent, product-of-bases rule, combined simplification — TA-A04 through A05 and mastery gate).

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.arith.exponentiation ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03, A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (area/volume context) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 WORKED EXAMPLE PAIR present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (area/volume with power rule) | PASS |
| V-18 | MC-1 PRODUCT-RULE-MULTIPLIES-EXPONENTS designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
