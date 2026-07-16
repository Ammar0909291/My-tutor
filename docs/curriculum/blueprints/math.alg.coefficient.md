# TEACHING BLUEPRINT — math.alg.coefficient

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.alg.coefficient |
| concept_name | Coefficient |
| domain | algebra |
| difficulty | developing |
| bloom | remember |
| estimated_hours | 1 |
| mastery_threshold | 0.95 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.95 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.alg.term]
**unlocks:** []
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** The coefficient of a term is the numerical (non-variable) factor that multiplies the variable part. In 3x², the coefficient is 3 and the variable part is x². When no number is written, the coefficient is 1 (for x) or −1 (for −x). For a constant term, the coefficient is the constant itself.

**Knowledge prerequisites activated:**
- math.alg.term: a term is a product of numerical and variable factors; coefficient is the numerical factor of that product

**Concept structure:**
1. **Coefficient = numerical factor**: the number in front of the variable part
2. **Implied coefficients**: x has coefficient 1; −x has coefficient −1 (both written without an explicit number)
3. **Constant terms**: coefficient equals the constant itself (no variable part)
4. **Coefficient sign**: the sign attached to a term belongs to the coefficient (−4y has coefficient −4)

**Target understanding:** Given any term, the learner extracts the coefficient, handles implied ±1, identifies the coefficient of a constant term, and distinguishes the coefficient from the variable part.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | COEFFICIENT-IS-VARIABLE | Shown 3x², asked for the coefficient | Names the variable part (x or x²) as the coefficient, or names the entire term as the coefficient | B01 |
| MC-2 | IMPLIED-COEFFICIENT-MISSING | Shown x or −x, asked for coefficient | Says "no coefficient" or "there is no number"; does not recognise the implied 1 or −1 | B02 |
| MC-3 | COEFFICIENT-INCLUDES-VARIABLE | Shown 5y³, asked for coefficient | Gives 5y or 5y³; includes part of the variable factor in the coefficient | B03 |

**FOUNDATIONAL MC:** MC-1 (COEFFICIENT-IS-VARIABLE) — if the learner cannot separate the numerical from the variable part of a term, all other coefficient work is blocked.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
"How many?" model: 3x² means "3 copies of x²." The number 3 answers "how many?" — that is the coefficient. Cover the variable part and ask "what number is left?" — that is the coefficient.

**Progression Gate (C → P):** Learner consistently identifies the "how many" number in a written term and separates it from the variable factor.
**Progression Gate (P → A):** Learner handles implied coefficients (±1) and extracts coefficients from multi-variable terms and constant terms.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — "How Many Copies?": The Coefficient Identifies Quantity (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A price tag — "3 apples" means the number 3 tells you how many copies of the item (apple) there are.
Target domain: Coefficient — in 3x², the number 3 tells you how many copies of x² there are; it is the coefficient.
Mapping: count of items ↔ coefficient; the item type ↔ variable part; "3 apples" ↔ "3x²"

Extraction procedure — "cover the variable, read the number":
```
Term: −4y³
      │  └── variable part (y³) — cover this
      └───── coefficient (−4) — what remains
```

Coefficient extraction table:
```
Term     Coefficient   Variable part
3x²      3             x²
−7ab     −7            ab
5        5             (none — constant term, coefficient is the term itself)
x        1             x       (implied — 1 is never written but always present)
−y       −1            y       (implied − sign means coefficient is −1)
2mn³     2             mn³
```

**P49 ADAPTIVE CHECKPOINT**
Q: "What is the coefficient in the term −9p²q?"
→ CORRECT [−9]: "Correct — the coefficient is −9; the variable part is p²q." → TA-A02
→ INCORRECT [p²q or 9p²q]: Flag MC-1 or MC-3. Route → B01 or B03.
→ NO_RESPONSE: "Cover p²q. What number is left, including its sign?" → guided

---

### TA-A02 — Implied Coefficients and Constants (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same fact for the term x:

| Representation | Written form | Coefficient | Meaning |
|---|---|---|---|
| Explicit | 1·x | 1 | "1 copy of x" |
| Conventional | x | 1 (implied) | coefficient 1 is never written by convention |
| Negative | −x | −1 (implied) | "−1 copy of x" |

The coefficient 1 is never written (writing "1x" is technically correct but unconventional). The coefficient −1 is written only as a minus sign with no digit. Both are still valid coefficients.

For constant terms: 
```
Term: −9   →  coefficient = −9  (the constant IS the coefficient; no variable part)
Term:  4   →  coefficient =  4
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Give the coefficients: (a) −x, (b) y, (c) −8 (as a standalone term)."
→ CORRECT [(a) −1; (b) 1; (c) −8]: "Correct — implied coefficients and constant coefficient all identified." → TA-A03
→ INCORRECT [(a) or (b) said 'no coefficient']: Flag MC-2. Route → B02
→ NO_RESPONSE: "For (a): rewrite −x as ___·x. What fills the blank?" → guided

---

### TA-A03 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **What is the coefficient in −7y⁴?**
   *(Expected: −7)*

2. **What is the coefficient of the term −x?**
   *(Expected: −1 — the implied coefficient)*

3. **True/False:** In 4ab², the coefficient is 4ab.
   *(Expected: FALSE — the coefficient is 4 (numerical factor only); the variable part is ab²)*

4. **What is the coefficient of the constant term −9 in the expression 3p−9?**
   *(Expected: −9 — a constant term's coefficient is the constant itself)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Polynomial context:*

"In the polynomial P(x) = 5x³−2x²+x−8:

(a) List the coefficient of each of the four terms.
(b) Which term has the coefficient with the greatest absolute value?
(c) The x⁴ term does not appear. What would its coefficient be?"

*(Expected:*
*(a) 5x³: coefficient 5; −2x²: coefficient −2; x: coefficient 1 (implied); −8: coefficient −8*
*(b) The constant term −8 has the greatest absolute value of 8 (compared to |5|=5, |−2|=2, |1|=1)*
*(c) The x⁴ term has coefficient 0 — a coefficient of 0 means the term is absent from the polynomial)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.95; ⌈0.95×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 COEFFICIENT-IS-VARIABLE first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now extract the coefficient from any term — including implied ±1 and constant terms — and distinguish it from the variable part. Coefficient identification is essential for every algebraic operation involving like terms, polynomial arithmetic, and function analysis."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: COEFFICIENT-IS-VARIABLE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A common confusion: naming the variable (x or x²) as the coefficient, or giving the whole term as the coefficient. The coefficient is strictly the numerical (non-variable) factor of the term."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In 5x³, what is the coefficient?"
→ "x³" or "5x³": MC-1 confirmed. Continue B01.
→ "5": MC-1 not active. Exit B01 → next flagged MC or TA-A03.

**P64 CONCEPTUAL SHIFT**
"Cover the variable part with your hand and read what is left. That number is the coefficient.

```
5x³ :  cover x³ → reads 5   → coefficient = 5
−4y :  cover y  → reads −4  → coefficient = −4
```
The coefficient is always a number. Variable symbols (x, y, x³, ab²) are never coefficients — they are the variable part."

**P49 ADAPTIVE CHECKPOINT**
Q: "Cover the variable part in 8m²n. What remains?"
→ CORRECT [8]: "Correct — the coefficient is 8." Exit B01 → B02 if flagged, else TA-A03.
→ INCORRECT: Guide the learner to physically cover "m²n" in 8m²n. → re-prompt.

---

### TA-B02 — Repair: IMPLIED-COEFFICIENT-MISSING (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"When no number is written in front of a variable, learners sometimes say 'there is no coefficient.' But x = 1·x and −x = (−1)·x — the coefficient is always present, just conventionally omitted when it equals 1 or −1."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is the coefficient of the term y?"
→ "There is no coefficient" or "just y": MC-2 confirmed. Continue B02.
→ "1": MC-2 not active. Exit B02 → B03 if flagged, else TA-A03.

**P64 CONCEPTUAL SHIFT**
"Every term has a coefficient. By convention, if the coefficient is 1, we omit writing it (because 1·x = x). If it is −1, we write only the − sign.

```
x    = 1·x    →  coefficient 1 (never written, always present)
−x   = (−1)·x →  coefficient −1 (the lone − sign represents −1)
```
Ask: if I rewrite x as ___·x, what fills the blank? That number is the coefficient."

**P49 ADAPTIVE CHECKPOINT**
Q: "Rewrite −t as ___·t and state the coefficient."
→ CORRECT [(−1)·t; coefficient −1]: "Correct — implied coefficient −1." Exit B02 → B03 if flagged, else TA-A03.
→ INCORRECT: "What times t gives −t?" → guided.

---

### TA-B03 — Repair: COEFFICIENT-INCLUDES-VARIABLE (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"In a term like 6xy², some learners give the coefficient as 6x or 6xy². The coefficient is purely the numerical factor — no variable symbols can be part of it."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In 6xy², what is the coefficient?"
→ "6x" or "6xy²": MC-3 confirmed. Continue B03.
→ "6": MC-3 not active. Exit B03 → TA-A03.

**P64 CONCEPTUAL SHIFT**
"The coefficient is defined as: the numerical factor only. In a term, there are exactly two parts: the number part and the variable part. They share no symbols.

```
6xy²:
  Number part:   6      ← coefficient (digits and sign only)
  Variable part: xy²    ← everything with variables
```
The split is clean: digits (and sign) on one side; letters (and their exponents) on the other."

**P49 ADAPTIVE CHECKPOINT**
Q: "Split −3a²b into coefficient and variable part."
→ CORRECT [coefficient: −3; variable part: a²b]: "Correct." Exit B03 → TA-A03.
→ INCORRECT: Draw a vertical line after the number: "−3 | a²b — which side is the coefficient?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Extract coefficient from standard terms | "Coefficient of −5z³? Coefficient of x?" (−5; 1) |
| Day 3 | Implied coefficients and constant terms | "Coefficients in 3m−n+7?" (3, −1, 7) |
| Day 7 | Multi-variable terms | "Coefficient of −2ab²c?" (−2) |
| Day 30 | Transfer: identify zero coefficient | "In 4x²+0x+1, what is the coefficient of x?" (0) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.alg.term (required): a term is a product of numerical and variable factors; the coefficient is the numerical factor of that product

**Enables:**
- (no direct Tier 1 unlocks) — coefficient identification is prerequisite vocabulary for polynomial arithmetic and function analysis in downstream concepts

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **h=1 lean structure:** Only 2 main TAs (A01, A02) plus the mastery gate. The concept is definitional; focus on precision of extraction, not computation.

2. **Sign belongs to the coefficient:** The −4 in −4y is one coefficient, not a "minus sign" separate from "4". Always write and state the sign as part of the coefficient.

3. **Zero coefficient edge case (P76):** A term with coefficient 0 is indistinguishable from absence. The P76 probe introduces this cleanly via a missing x⁴ term in a polynomial.

4. **thresh=0.95:** This concept is entirely definitional vocabulary. The high threshold reflects that partial understanding is insufficient — learners must be able to extract coefficients fluently and automatically for all downstream algebra.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.alg.term ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A03 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A03 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A03 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (polynomial context probe) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.95×5⌉ = 5/5 | PASS |
| V-14 | bloom=remember → P07 not required; P11 REPRESENTATION SHIFT used in A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (polynomial coefficient extraction) | PASS |
| V-18 | MC-1 COEFFICIENT-IS-VARIABLE designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
