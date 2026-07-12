# TEACHING BLUEPRINT — math.alg.term

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.alg.term |
| concept_name | Term |
| domain | algebra |
| difficulty | developing |
| bloom | remember |
| estimated_hours | 2 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.alg.expression]
**unlocks:** []
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** A term is a single number, variable, or product of numbers and variables in an algebraic expression. Terms are separated from other terms by + or − signs. Each term has a coefficient (numerical factor) and a variable part (symbolic factor). The coefficient of a constant term is the constant itself; the coefficient of a pure variable is 1 (implied).

**Knowledge prerequisites activated:**
- math.alg.expression: expressions are built from terms connected by + and −; the + and − are separators between terms, not part of a term

**Concept structure:**
1. **Term types**: constant term (e.g., 7), variable term (e.g., x), monomial (e.g., 3x², −5y, xy)
2. **Coefficient**: the numerical factor of a term (in −4x², coefficient = −4; in x, coefficient = 1)
3. **Variable part**: the symbolic factor (in −4x², variable part = x²)
4. **Separator rule**: + and − between terms are separators; they define where one term ends and another begins

**Target understanding:** Given an algebraic expression, the learner identifies every term, counts the terms correctly, names the coefficient of any specified term, and recognises constant terms as valid terms.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | TERM-INCLUDES-OPERATIONS | Shown 3x+2y, asked to identify terms | Calls the entire expression "one term" or counts incorrectly by not recognising + as a separator between two terms | B01 |
| MC-2 | CONSTANT-NOT-A-TERM | Shown 4x²−3x+7, asked to count terms | Ignores the constant 7, saying "terms must have variables"; counts only 2 terms | B02 |
| MC-3 | COEFFICIENT-AS-SEPARATE-TERM | Shown 5y³, asked to identify its parts | Treats 5 and y³ as two separate terms rather than one product forming a single term | B03 |

**FOUNDATIONAL MC:** MC-1 (TERM-INCLUDES-OPERATIONS) — the + and − separator rule is the definition boundary; must be established before coefficient and constant errors are addressed.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Ingredient model: write each term on a separate card. The + or − sign is a connector card placed between ingredient cards. Count cards to count terms.

**Progression Gate (C → P):** Learner places term cards correctly, with one card per term including the constant.
**Progression Gate (P → A):** Learner names coefficient and variable part of any given term from an expression with three or more terms.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Ingredients and Connecting Steps: The Recipe Analogy (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A recipe ingredient list — "3 cups flour + 2 eggs + 1 tsp salt". Each ingredient is distinct; the + is the separator between items on the list, not part of any one ingredient.
Target domain: Algebraic expression — "3x² + 2y − 5". Each term is a distinct algebraic object; + and − separate them.
Mapping: individual ingredient ↔ term; + (combining) ↔ + or − separator; ingredient count ↔ term count

"In 3x²+2y−5: 3x² is one ingredient, 2y is another, and −5 is a third. The + and − separate them. There are three terms, just as there are three ingredients."

Anatomy of a term:
```
Term: −4x²
      │ └─ variable part (x²)
      └─── coefficient (−4)

Term:  7
      └─── constant term (coefficient = 7, no variable part)

Term:  x
      └─── coefficient = 1 (implied), variable part = x
```

**P49 ADAPTIVE CHECKPOINT**
Q: "How many terms does 5a−3b+2 have? Name each term."
→ CORRECT [3 terms: 5a, −3b, 2]: "Correct — three terms separated by + and −." → TA-A02
→ INCORRECT [says 1 term or only counts 2]: Flag MC-1 (if missed separator) or MC-2 (if missed constant). Route → B01 or B02 respectively.
→ NO_RESPONSE: "Place each part on a card: [5a] [−3b] [2]. How many cards?" → guided

---

### TA-A02 — Coefficients, Variables, and Constants (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same expression 4x²−3xy+7:

| Representation | Form | Terms Identified |
|---|---|---|
| Concrete (cards) | [4x²] [−3xy] [7] | 3 cards = 3 terms |
| Labelled | coefficient·variable part | 4·x², (−3)·xy, 7 (constant) |
| Symbolic | standard form | 4x² − 3xy + 7 |

Coefficient extraction rule:
```
Term      Coefficient   Variable part
4x²       4             x²
−3xy      −3            xy
7         7             (none — constant term)
x         1             x     (coefficient 1 is implicit)
−y        −1            y     (coefficient −1 is implicit)
```

Constants are terms: a standalone number like 7 is a constant term with no variable part. Its coefficient is the number itself.

**P49 ADAPTIVE CHECKPOINT**
Q: "For the expression 6m³−m+9, state: (a) the number of terms, (b) the coefficient of the m-term."
→ CORRECT [(a) 3 terms; (b) coefficient of −m is −1]: "Correct — three terms; the implied coefficient on −m is −1." → TA-A03
→ PARTIAL [(b) says coefficient is 1, misses the sign]: "The term is −m = (−1)·m. The negative sign belongs to the coefficient." → re-prompt
→ INCORRECT [says 2 terms, ignoring 9]: Flag MC-2. Route → B02
→ NO_RESPONSE: Show the card representation for 6m³−m+9 step by step.

---

### TA-A03 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **How many terms does 4x²−3xy+7 have? Name each term.**
   *(Expected: 3 terms — 4x², −3xy, 7)*

2. **What is the coefficient of the term 5y³?**
   *(Expected: 5)*

3. **True/False:** In the expression 2x+5, the entire expression "2x+5" is one term.
   *(Expected: FALSE — the + separates two terms: 2x and 5)*

4. **Is −8 a term? If so, what type?**
   *(Expected: YES — −8 is a constant term with coefficient −8 and no variable part)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Business model context:*

"A company's monthly profit (in dollars) is modelled by P = 3t²−2t+500, where t is months since launch.

(a) How many terms does this expression have? List them.
(b) What is the coefficient of the t-term?
(c) The constant term is 500. What does this value represent in context (when t=0)?"

*(Expected:*
*(a) 3 terms: 3t², −2t, 500*
*(b) The t-term is −2t; coefficient = −2*
*(c) At t=0: P=3(0)²−2(0)+500=500. The constant 500 is the profit at the moment of launch — before any time has passed.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 TERM-INCLUDES-OPERATIONS first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now identify every term in an algebraic expression, count terms correctly using the + and − separators, extract coefficients (including implied ±1), and recognise constant terms. This vocabulary is the foundation for equations, polynomials, and all algebraic manipulation."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: TERM-INCLUDES-OPERATIONS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"The most common error: treating an entire expression as one term, or miscounting by not recognising + and − as separators. In 3x+2y, the + is not part of either term — it separates two distinct terms: 3x and 2y."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In 3x+2y, is there one term or two? How did you count?"
→ "One term" or "I don't see the boundary": MC-1 confirmed. Continue B01.
→ "Two terms (3x and 2y)": MC-1 not active. Exit B01 → next flagged MC or TA-A03.

**P64 CONCEPTUAL SHIFT**
"The rule: every + or − that is not inside parentheses and not part of a number is a term separator.

Procedure: underline each + or − separator in the expression, then count the parts between them (including before the first and after the last).

```
3x + 2y − 5
   ^     ^   ← 2 separators → 3 parts → 3 terms
[3x] [2y] [−5]
```
The sign immediately in front of a term (the leading sign of each part) belongs to that term's coefficient — it is not a separator."

**P49 ADAPTIVE CHECKPOINT**
Q: "Using the underline method, count the terms in 7p−4q+1."
→ CORRECT [2 separators → 3 terms: 7p, −4q, 1]: "Correct." Exit B01 → B02 if flagged, else TA-A03.
→ INCORRECT: Guide through underlining each separator in 7p−4q+1. → re-prompt.

---

### TA-B02 — Repair: CONSTANT-NOT-A-TERM (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Some learners only count terms with variables, ignoring standalone constants. In 4x²−3x+7, the number 7 is a constant term — fully valid as a term despite having no variable."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In 4x²−3x+7, how many terms are there?"
→ "Two" (ignoring 7): MC-2 confirmed. Continue B02.
→ "Three": MC-2 not active. Exit B02 → B03 if flagged, else TA-A03.

**P64 CONCEPTUAL SHIFT**
"The definition: a term is a number, variable, or product of numbers and variables. A standalone number satisfies 'a number' — it qualifies as a term.

```
4x²−3x+7:
[4x²] [−3x] [7]
                ↑ constant term — no variable, but still a term
```
Constant terms appear when there is a fixed amount that does not depend on the variable. They are separated by + or − just like any other term."

**P49 ADAPTIVE CHECKPOINT**
Q: "Count the terms in x³−5x+12. Is 12 a term?"
→ CORRECT [3 terms; 12 is a constant term]: "Correct — 12 is a constant term." Exit B02 → B03 if flagged, else TA-A03.
→ INCORRECT: "Underline each separator. After the last separator, what remains?" → guided.

---

### TA-B03 — Repair: COEFFICIENT-AS-SEPARATE-TERM (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"In a term like 5y³, the 5 and y³ are two factors of the same term — not two separate terms. A term is a product; its factors (number and variable) are not separated by + or − and therefore form one unit."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In the expression 5y³+2, how many terms are there — two or three?"
→ "Three (5, y³, and 2)": MC-3 confirmed. Continue B03.
→ "Two (5y³ and 2)": MC-3 not active. Exit B03 → TA-A03.

**P64 CONCEPTUAL SHIFT**
"Multiplication within a term does not create new terms. 5y³ = 5×y³: one product, one term.

Only + or − (outside parentheses, between parts) creates a new term.

```
5y³+2:
   ↑  ← one + separator → 2 terms: [5y³] [2]
   5 and y³ are FACTORS of the first term, not separate terms.
```
Terms are divided by + and −; factors within a term are divided by multiplication (implicit or explicit)."

**P49 ADAPTIVE CHECKPOINT**
Q: "Identify the terms in 3ab−7. Is 3 a separate term?"
→ CORRECT [2 terms: 3ab and −7; 3 is a factor (coefficient) of the first term, not separate]: "Correct." Exit B03 → TA-A03.
→ INCORRECT: "Is there a + or − between 3 and ab? No — they are multiplied, so they are one term." → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Counting terms using separator rule | "How many terms in 5x²−3x+2?" (3) |
| Day 3 | Identifying coefficients including implied ±1 | "Coefficient of −y in 4x−y+8?" (−1) |
| Day 7 | Constant terms and coefficient extraction | "Terms, coefficients in 2a³−7b+1" |
| Day 30 | Transfer: identify terms in multi-variable expression | "Terms in 3mn²−4m+n−6?" (4 terms) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.alg.expression (required): terms are the atomic components of an expression; + and − in an expression act as term separators

**Enables:**
- (none in Tier 1 directly) — term vocabulary is foundational for math.alg.polynomial and all polynomial operations

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **The leading sign belongs to the term:** In 3x−2y+5, the − before 2y is part of that term's coefficient (−2), not a standalone operator. This must be explicit; learners who detach signs make sign errors in simplification.

2. **Implied coefficient of 1:** The term x has coefficient 1 (not 0). The term −x has coefficient −1. These must be practised explicitly; they are invisible in the notation.

3. **h=2 lean structure:** Only 2 main TAs (A01, A02) plus the mastery gate. The concept is definitional — focus on precision of identification rather than computation.

4. **Scope of this blueprint:** Term identification and coefficient extraction only. Like-term combination and simplification were covered in math.alg.expression (Component 4, TA-A03). This blueprint sharpens the vocabulary, not the operation.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.alg.expression ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A03 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A03 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A03 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (business profit model probe) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=remember → P07 not required; P11 REPRESENTATION SHIFT used in A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (monthly profit model) | PASS |
| V-18 | MC-1 TERM-INCLUDES-OPERATIONS designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
