# TEACHING BLUEPRINT — math.alg.like-terms

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.alg.like-terms |
| concept_name | Like Terms |
| domain | algebra |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 3 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.alg.term, math.alg.coefficient]
**unlocks:** [math.alg.simplification]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** Terms with identical variable parts (same variables raised to the same powers) are like terms. Only like terms can be combined: add or subtract their coefficients and keep the variable part unchanged. Terms whose variable parts differ cannot be combined.

**Knowledge prerequisites activated:**
- math.alg.term: a term is a product of a coefficient and a variable part; like terms share the same variable part
- math.alg.coefficient: the numerical factor of a term; when combining like terms, it is the coefficients that are added or subtracted

**Concept structure:**
1. **Like terms**: same variable part — 3x², −5x², x² are like (all share x²); 3x and 3y are unlike (different variables)
2. **Identifying like terms**: compare variable parts symbol-by-symbol including exponents; coefficients are irrelevant for identification
3. **Unlike terms**: different variable parts — x² and x³ cannot be combined; xy and x²y cannot be combined
4. **Combining like terms**: add/subtract coefficients only; variable part is unchanged (3x² + (−5x²) = (3 − 5)x² = −2x²)
5. **Multi-variable terms**: 3xy and 5xy are like (variable part xy); 3xy and 5x²y are unlike (xy ≠ x²y)

**Target understanding:** Given an expression, the learner identifies all sets of like terms, combines them by operating on their coefficients, and leaves unlike terms unchanged.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | VARIABLE-PARTS-IGNORED | Shown 3x + 2y, asked to simplify | Combines all terms regardless of variable part; gives 5x, 5y, or 5xy; ignores that x and y are distinct variable parts | B01 |
| MC-2 | EXPONENT-ADDS-WHEN-COMBINING | Shown 3x² + 2x², asked to simplify | Gives 5x⁴ — adds the exponents as if applying the product rule; confuses coefficient addition with exponent arithmetic | B02 |
| MC-3 | UNLIKE-TERMS-FORCED | Shown x + x², asked to simplify | Gives 2x or 2x² — treats x and x² as like terms because "both have x"; ignores the exponent difference | B03 |

**FOUNDATIONAL MC:** MC-1 (VARIABLE-PARTS-IGNORED) — if the learner cannot compare variable parts, they cannot determine which terms are like, blocking all combining operations.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
"Supermarket grouping" model: apples and oranges are different items and are counted separately. 3 apples + 2 apples = 5 apples; 3 apples + 2 oranges stays as 3 apples + 2 oranges — you cannot add apples to oranges. Like terms are the "same item"; the coefficient counts how many.

**Progression Gate (C → P):** Learner consistently identifies which terms share the same variable part (the "item type") before attempting to combine.
**Progression Gate (P → A):** Learner extends like-term identification to multi-variable and negative-coefficient cases without a concrete model.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — "Same Item, Same Shelf": Identifying Like Terms (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A supermarket — you group apples together and oranges together when counting inventory. 3 apples + 2 apples = 5 apples; 3 apples + 2 oranges cannot be combined.
Target domain: Like terms — the variable part is the "item type." Terms with the same variable part can be combined; terms with different variable parts cannot.
Mapping: type of fruit ↔ variable part; quantity of fruit ↔ coefficient; counting apples and oranges separately ↔ keeping unlike terms separate.

Like-term identification table:
```
Expression: 5x² + 3x − 2x² + 4y + x²

Variable parts present: x², x, y

Group by variable part:
  x²-shelf:  5x²,  −2x²,  x²   ← like terms (same variable part x²)
  x-shelf:   3x                 ← no other x-terms to combine
  y-shelf:   4y                 ← no other y-terms to combine
```

Key rule: two terms are like ↔ their variable parts are letter-for-letter identical, including all exponents.

**P49 ADAPTIVE CHECKPOINT**
Q: "In 6ab + 3a − 4ab + 2b, which pairs of terms are like?"
→ CORRECT [6ab and −4ab are like; 3a and 2b are unlike each other and unlike the ab terms]: "Correct — variable parts ab, a, and b are all distinct." → TA-A02
→ INCORRECT [groups 6ab with 3a because 'both have a']: Flag MC-3. Route → B03.
→ INCORRECT [combines all four terms]: Flag MC-1. Route → B01.
→ NO_RESPONSE: "Write down the variable part of each term. Which parts are identical?" → guided.

---

### TA-A02 — Combining Like Terms in Practice (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

**Worked example 1:** Simplify 4x² + 3x − 2x² + 5.

Step 1 — Identify like terms:
```
4x² and −2x² are like (both x²)
3x is unlike both (variable part x)
5 is a constant term (no variable part)
```

Step 2 — Group and combine:
```
(4x² − 2x²) + 3x + 5
= (4 − 2)x² + 3x + 5
= 2x² + 3x + 5
```

Variable part x² is unchanged; only the coefficient changed from (4 − 2) = 2.

---

**Worked example 2:** Simplify 3ab + 2b − ab + 4a.

Step 1 — Identify like terms:
```
3ab and −ab are like (both have variable part ab)
2b is unlike (variable part b)
4a is unlike (variable part a)
```

Step 2 — Group and combine:
```
(3ab − ab) + 2b + 4a
= (3 − 1)ab + 2b + 4a
= 2ab + 2b + 4a
```

(Note: −ab means coefficient −1, so 3 − 1 = 2.)

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify 7m² + 3m − 2m² + m."
→ CORRECT [5m² + 4m]: "Correct — (7−2)m² + (3+1)m = 5m² + 4m." → TA-A03
→ INCORRECT [9m⁴ or 5m⁴]: Flag MC-2. Route → B02.
→ INCORRECT [combines m² with m]: Flag MC-3. Route → B03.
→ NO_RESPONSE: "Group all m²-terms, then all m-terms. Operate on coefficients only." → guided.

---

### TA-A03 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Identify all sets of like terms in: 5x² + 3x − 2x² + 4y + x².**
   *(Expected: {5x², −2x², x²} are like terms with variable part x²; 3x and 4y are unlike each other and unlike the x²-group)*

2. **Simplify: 7m³ + 2m − 3m³ + m.**
   *(Expected: (7m³ − 3m³) + (2m + m) = 4m³ + 3m)*

3. **True/False:** 4xy and 4x are like terms.
   *(Expected: FALSE — variable parts xy and x are different; the extra y in xy makes them unlike)*

4. **Simplify: 3a + 2b − a + 5b.**
   *(Expected: (3a − a) + (2b + 5b) = 2a + 7b)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Business revenue model:*

"A business models its weekly revenue as R = 3p + 5q + 2p − q, where p is the price of product A and q is the price of product B.

(a) Identify the like terms in R.
(b) Simplify R by combining like terms.
(c) If p = 10 and q = 4, evaluate both the original and simplified expressions and verify they agree."

*(Expected:
(a) 3p and 2p are like (variable part p); 5q and −q are like (variable part q)
(b) R = 5p + 4q
(c) Original: 3(10) + 5(4) + 2(10) − 4 = 30 + 20 + 20 − 4 = 66; Simplified: 5(10) + 4(4) = 50 + 16 = 66 ✓)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 VARIABLE-PARTS-IGNORED first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now identify like terms by comparing variable parts, combine them by operating on coefficients only, and leave unlike terms unchanged. Like-term recognition is the core skill for algebraic simplification and equation solving."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: VARIABLE-PARTS-IGNORED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A frequent error: combining all terms regardless of their variable parts. Terms can only be combined when their variable parts are identical — every letter and every exponent must match. 3x and 2y have different variable parts and cannot be added."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Simplify 4x + 3y."
→ "4x + 3y" (cannot be simplified): MC-1 not active. Exit B01 → next flagged MC or TA-A03.
→ "7x", "7y", or "7xy": MC-1 confirmed. Continue B01.

**P64 CONCEPTUAL SHIFT**
"Before combining any terms, extract and compare variable parts:

```
Expression: 4x + 3y

Term 1: 4x   → variable part: x
Term 2: 3y   → variable part: y

x ≠ y   →   4x and 3y are UNLIKE terms   →   cannot be combined

Result: 4x + 3y  (already simplified — two unlike terms remain)
```

Only when variable parts are identical (letter-for-letter, exponent-for-exponent) may you operate on the coefficients."

**P49 ADAPTIVE CHECKPOINT**
Q: "Can 5a and 3b be combined? Can 5a and 3a be combined? Explain why or why not."
→ CORRECT [5a and 3b cannot (variable parts a ≠ b); 5a and 3a can (same variable part a → 8a)]: "Correct." Exit B01 → B02 if flagged, else TA-A03.
→ INCORRECT: "Write the variable part of each term. Are they the same or different?" → guided.

---

### TA-B02 — Repair: EXPONENT-ADDS-WHEN-COMBINING (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"When combining like terms, the exponent of the variable part NEVER changes — you are adding the coefficients of the same object, not multiplying copies of the variable. Adding exponents is the rule for multiplication (x² × x³ = x⁵), not for addition."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Simplify 3x² + 2x²."
→ "5x²": MC-2 not active. Exit B02 → B03 if flagged, else TA-A03.
→ "5x⁴": MC-2 confirmed. Continue B02.

**P64 CONCEPTUAL SHIFT**
"There are two completely different operations:

```
Multiplication (exponents ADD):   x² × x³ = x⁵   ← product rule
Addition (exponents STAY):        3x² + 2x² = 5x² ← like-term combination

When combining like terms, think of x² as a unit name, like 'apples':
3 apples + 2 apples = 5 apples
3x²      + 2x²      = 5x²       ← the unit name (x²) stays the same
```

Exponents change only when you multiply, never when you add."

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify 4y³ + 3y³."
→ CORRECT [7y³]: "Correct — coefficient changes (4+3=7); exponent stays (³)." Exit B02 → B03 if flagged, else TA-A03.
→ INCORRECT [7y⁶]: "The exponent belongs to the variable part — it does not participate in the addition. What is 4+3? The variable part y³ stays." → re-prompt.

---

### TA-B03 — Repair: UNLIKE-TERMS-FORCED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Terms like x and x² both contain the letter x, but they are unlike terms — they represent different objects. x means one copy of x; x² means one copy of x-squared. These are distinct variable parts. Sharing a base letter is not sufficient for like-term status — the full variable part including exponents must be identical."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Are x and x² like terms?"
→ "No — variable parts x and x² are different": MC-3 not active. Exit B03 → TA-A03.
→ "Yes — both have x": MC-3 confirmed. Continue B03.

**P64 CONCEPTUAL SHIFT**
"The variable part is the complete expression of letters and exponents. Even one exponent difference makes the terms unlike:

```
Term     Variable part
x        x¹  (same as x)
x²       x²
x³       x³

x¹ ≠ x² ≠ x³  →  these are THREE different variable parts

Just as 'apple' ≠ 'apple juice' (despite sharing 'apple'),
x ≠ x² (despite both containing x).

Simplify x + x²:  ← these are unlike → cannot combine → x + x² is fully simplified.
```"

**P49 ADAPTIVE CHECKPOINT**
Q: "Identify which terms in 2x + 3x² + x can be combined."
→ CORRECT [2x and x are like (both variable part x); 3x² is unlike (variable part x²); result: 3x + 3x²]: "Correct." Exit B03 → TA-A03.
→ INCORRECT [combines all three]: "Write the variable part of each term separately. Which variable parts are identical?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Identify like terms | "Which pairs in 4p² + 3p − p² + 2q are like?" |
| Day 3 | Combine like terms | "Simplify 5x − 2y + 3x + y" (8x − y) |
| Day 7 | Multi-variable and negative coefficients | "Simplify 4ab − 2a + ab − 3a" (5ab − 5a) |
| Day 30 | Transfer: like terms in equations | "Collect like terms on the left side of 3x + 4 − x = 9" (2x + 4 = 9) |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.alg.term (required): a term is the unit that is classified as like or unlike; a term's variable part is the classification key
- math.alg.coefficient (required): when combining like terms, the coefficients are added or subtracted; sign of the coefficient is part of the operation

**Enables:**
- math.alg.simplification: simplifying an expression by collecting all like terms is the core operation; like-term recognition is the prerequisite skill

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **h=3 lean structure:** Like terms is definitional combined with one procedural step (combine-by-coefficients); 2 main TAs + gate is sufficient. P03 builds the model; P07 provides two worked examples for the bloom=apply requirement.

2. **Coefficient of 1 and −1:** Terms like x and −x have implied coefficients 1 and −1 respectively (from math.alg.coefficient). In P07 example 2, −ab is flagged explicitly as coefficient −1 to prevent MC-1 where the sign is ignored.

3. **Variable-part identity is the key test:** All three misconceptions stem from a weak grasp of what counts as "the same variable part." TA-A01's P03 concrete model (supermarket items) grounds this test before the symbolic level.

4. **P76 numeric verification:** The revenue-model probe includes a numerical check (step c) to let learners self-verify their simplification. For bloom=apply, this self-checking behavior is the target skill.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.alg.term ✓, math.alg.coefficient ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A03 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A03 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A03 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (business revenue model) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (revenue model with numeric verification) | PASS |
| V-18 | MC-1 VARIABLE-PARTS-IGNORED designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
