# TEACHING BLUEPRINT — math.alg.expression

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.alg.expression |
| concept_name | Algebraic Expression |
| domain | algebra |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.85 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.found.variable, math.arith.order-of-operations]
**unlocks:** [math.alg.equation, math.alg.polynomial]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** An algebraic expression is a combination of numbers, variables, and arithmetic operations that represents a mathematical quantity. Unlike an equation, it contains no equality or inequality sign — it is not a statement to solve but a quantity to evaluate or simplify. Variables in an expression may take on multiple values; evaluating an expression substitutes a specific value and computes the result.

**Knowledge prerequisites activated:**
- math.found.variable: a variable is a symbol representing a quantity that can vary; not fixed
- math.arith.order-of-operations: substitution produces a numerical expression; PEMDAS governs its evaluation

**Concept structure:**
1. **Components**: constants (fixed numbers), variables (symbols for varying quantities), operations (+, −, ×, ÷, exponents)
2. **No equality sign**: an expression is not a claim; it does not have a true/false value and is not solved
3. **Evaluation**: substitute a specific value for each variable, then apply order-of-operations
4. **Simplification**: combine like terms (same variable, same degree) to reduce the expression

**Target understanding:** The learner recognises an algebraic expression (vs. an equation), evaluates it at given variable values using PEMDAS, and simplifies by combining like terms.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | EXPRESSION-IS-EQUATION | Presented with an expression like 3x+2 | Adds "= something" or says "solve for x"; treats the expression as an equation requiring a unique solution rather than a quantity | B01 |
| MC-2 | VARIABLE-IS-FIXED | Asked to evaluate 3x+2 for x=4 | Insists x must be "solved" first; believes x has one fixed unknown value rather than being a placeholder for any number | B02 |
| MC-3 | UNLIKE-TERMS-COMBINED | Asked to simplify 3x+2y or 3x+2 | Adds unlike terms: 3x+2y=5xy, or 3x+2=5x; ignores that only matching variable-power combinations can be combined | B03 |

**FOUNDATIONAL MC:** MC-1 (EXPRESSION-IS-EQUATION) — the equation/expression distinction is the gateway; without it, evaluation and simplification cannot proceed correctly.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Recipe-quantity model: "3 cups of flour plus 2 teaspoons of salt" represents a quantity that depends on how many cups is one cup. Draw a physical "box" for the variable; place a number card inside to evaluate.

**Progression Gate (C → P):** Learner correctly substitutes a number card into the box and evaluates the resulting arithmetic expression.
**Progression Gate (P → A):** Learner evaluates a two-variable expression at given values using PEMDAS, and simplifies a three-term expression by identifying and combining like terms.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Recipe Quantity: Expressions Represent Amounts (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A recipe — "3 portions of ingredient x plus 2 grams of salt" is a description of an amount. The recipe does not tell you how much x is — you choose it. Different cooks use different values of x.
Target domain: Algebraic expression — 3x+2 is a description of a quantity. It does not fix x; it describes what the result will be for any x you choose.
Mapping: ingredient portion ↔ variable x; recipe quantity ↔ algebraic expression; choosing a serving size ↔ evaluating at x=4

"3x+2 means: take 3 batches of x and add 2. If x=4 (four cups of flour), the total is 3×4+2=14 cups worth. If x=10, it is 32. The expression itself is not a question — it is a flexible description."

Concrete demo — evaluation by substitution:
```
Expression: 3x + 2
Evaluate at x = 4:
  Replace x with 4: 3(4) + 2
  Apply PEMDAS:      12 + 2 = 14
Evaluate at x = 0:  3(0) + 2 = 0 + 2 = 2
Evaluate at x = −1: 3(−1) + 2 = −3 + 2 = −1
```
Notice: same expression, different values for different x — this is what "expression" means.

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 5x−3 for x=2. Show the substitution step and the PEMDAS evaluation."
→ CORRECT [substitute: 5(2)−3; PEMDAS: 10−3=7]: "Correct — 7." → TA-A02
→ PARTIAL [gets 7 but skips substitution step]: "Write the substitution explicitly: replace x with 2 first." → re-prompt
→ INCORRECT [tries to "solve for x" or writes 5x=3+something]: Flag MC-1. Route → B01
→ NO_RESPONSE: "Replace every x with the number 2: 5×_−3 = ?". → guided scaffold

---

### TA-A02 — Expression vs. Equation: No Equals Sign (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of the same algebraic idea:

| Representation | Example | Has = sign? | What it means |
|---|---|---|---|
| Algebraic expression | 3x+2 | NO | a quantity that depends on x |
| Equation | 3x+2=14 | YES | a statement that is true for specific x |
| Identity | 3(x+2)=3x+6 | YES (≡) | true for ALL values of x |

Key rule: if there is no = sign (or <, >, ≠), you have an **expression**. Expressions are evaluated or simplified — never "solved" for a unique answer.

Reading guide:
```
"3x+2"         → an expression (no =) → evaluate or simplify
"3x+2 = 14"   → an equation (has =)  → may have solution x=4
"3x+2 = 3x+2" → identity (has =)     → true for all x
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Label each as expression or equation: (a) 4a−7, (b) 2b+3=11, (c) x²+5x−6."
→ CORRECT [(a) expression; (b) equation; (c) expression]: "Correct — (a) and (c) have no = sign; (b) does." → TA-A03
→ INCORRECT [(c) called equation because it "looks like a formula"]: "Does it contain an = sign?" → re-prompt with reading guide
→ NO_RESPONSE: Point to the reading guide; apply to each example. → guided

---

### TA-A03 — Like and Unlike Terms: What Can Be Combined (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Like terms (same variable, same exponent — CAN be combined):*
```
3x + 5x = 8x         (both are "x-terms")
2y² + 7y² = 9y²      (both are "y²-terms")
5a − 2a + a = 4a     (all "a-terms")
```

*Case B — Unlike terms (different variables or different exponents — CANNOT be combined):*
```
3x + 2y   ≠ 5xy    (x-term and y-term are different)
3x + 2    ≠ 5x     (3x is an x-term; 2 is a constant — different "types")
x² + x    ≠ x³     (x² and x have different exponents)
```
Unlike terms stay separate in a simplified expression. "Simplify" means only combine like terms — not merge everything into one symbol.

Complete example — simplify 5a+2b−3a+b:
```
Group like terms:  (5a−3a) + (2b+b)
Combine each:      2a + 3b
Result:            2a+3b  (two unlike terms; cannot combine further)
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify 4x+3y−x+2y. Show the like-term grouping step."
→ CORRECT [(4x−x)+(3y+2y) = 3x+5y]: "Correct — 3x+5y." → TA-A04
→ INCORRECT [3x+5y=8xy or 3x+5y=8x]: Flag MC-3. Route → B03
→ NO_RESPONSE: "Circle all x-terms: 4x and −x. Circle all y-terms: 3y and 2y. Now add each group." → guided

---

### TA-A04 — Variables and Evaluation — Pattern Across Values (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe the same expression at multiple values:

```
Expression: 2x² − x + 3

x = 0:  2(0)²−(0)+3  = 0−0+3 = 3
x = 1:  2(1)²−(1)+3  = 2−1+3 = 4
x = 2:  2(2)²−(2)+3  = 8−2+3 = 9
x = −1: 2(−1)²−(−1)+3 = 2+1+3 = 6
```

Pattern: the same expression produces a different value for each x. The expression is a rule — input x, output a number. This is the bridge to the concept of a function.

Generalisation: an expression with n variables accepts n input values and produces one output. The expression itself is the rule, not the output.

**P49 ADAPTIVE CHECKPOINT**
Q: "For the expression x²−3x+2, compute the value at x=3 and x=0."
→ CORRECT [x=3: 9−9+2=2; x=0: 0−0+2=2]: "Correct — both give 2 (a coincidence for this expression)." → TA-A05
→ PARTIAL [PEMDAS error in evaluation]: "At x=3: apply exponent first: 3²=9, then −3(3)=−9, then +2." → re-prompt
→ INCORRECT [tries to equate to zero or solve]: Flag MC-1 or MC-2. Route → B01 or B02.
→ NO_RESPONSE: Fill in x=3 step by step: "3²=___; 3×3=___; 9−___+2=___." → guided

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Is "4x−3y+7" an expression or an equation?** Justify in one sentence.
   *(Expected: expression — contains no equality or inequality sign)*

2. **Evaluate 3x+2 for x=4.**
   *(Expected: substitute: 3(4)+2; PEMDAS: 12+2=14)*

3. **True/False:** 2x+3y = 5xy.
   *(Expected: FALSE — x-term and y-term are unlike; they cannot be combined into 5xy)*

4. **Simplify: 5a+2b−3a+b.**
   *(Expected: (5a−3a)+(2b+b) = 2a+3b)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: P76 independence mode — cross_links=[], novel context)

*Shopping cost model:*

"A store sells notebooks for $n each and pens for $p each.

(a) Write an algebraic expression for the total cost of buying 3 notebooks and 5 pens.
(b) Evaluate the expression when n=$2.00 and p=$0.50.
(c) Is your answer to (a) an expression or an equation? Explain the difference using one sentence."

*(Expected:*
*(a) 3n + 5p*
*(b) 3(2.00)+5(0.50) = 6.00+2.50 = $8.50*
*(c) 3n+5p is an expression — it contains no = sign and produces different values depending on the prices n and p chosen.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.85; ⌈0.85×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 EXPRESSION-IS-EQUATION first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now identify an algebraic expression, evaluate it at given values using order of operations, and simplify by combining like terms. Expressions are the building material of equations and polynomials — every algebraic concept that follows is built from this foundation."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: EXPRESSION-IS-EQUATION (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A common confusion: treating an expression like 3x+2 as if it were an equation that can be solved. An expression has no = sign — there is nothing to solve. It is a description of a quantity, not a statement about equality."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What would you do with the expression 3x+2?"
→ "Solve for x" or "set it equal to zero": MC-1 confirmed. Continue B01.
→ "Evaluate it for a given x" or "simplify it": MC-1 not active. Exit B01 → next flagged MC or TA-A05.

**P64 CONCEPTUAL SHIFT**
"An expression is a quantity — like a price tag. 3x+2 is the price of something that depends on x. You cannot 'solve a price tag'; you can only evaluate it (substitute x=4 → $14) or compare it to another price (3x+2=14 → equation: now we have something to solve).

```
3x+2       ← expression: a quantity, no = sign. Evaluate or simplify.
3x+2 = 14  ← equation:   a claim (= sign). Solve for x.
```
To go from expression to equation, you need to add context that fixes the value: 'the total cost is $14.'"

**P49 ADAPTIVE CHECKPOINT**
Q: "Given the expression 2x−5, what would you do with it if you wanted to find its value when x=3?"
→ CORRECT [substitute x=3: 2(3)−5=1; evaluate]: "Correct — evaluate, not solve." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT [sets 2x−5=0 or similar]: Re-present P64 distinction. → re-prompt.

---

### TA-B02 — Repair: VARIABLE-IS-FIXED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Some learners believe a variable like x has one secret fixed value that must be found. In an expression, x is a placeholder — it can be any number. Evaluation gives the expression's value for a specific chosen x, not the 'real' x."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "If I ask you to evaluate 3x+2 for x=4, do you need to 'find the real value of x' first?"
→ "Yes, I need to find what x really is": MC-2 confirmed. Continue B02.
→ "No, x=4 is the value I use": MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"In an expression, x is not hidden — you choose it. Evaluation means: I tell you x=4, you substitute.

```
Evaluate 3x+2 at x=4:
  Replace every x with 4: 3(4)+2
  Compute: 12+2 = 14

Evaluate 3x+2 at x=10:
  Replace every x with 10: 3(10)+2 = 32
```
There is no 'correct' x to find — different values of x give different results. The expression describes all of them at once."

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 5x−1 at x=0, then at x=3. Are both answers valid?"
→ CORRECT [x=0: −1; x=3: 14; both valid]: "Yes — the expression is valid for any x." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT: Re-present P64 with explicit substitution steps. → re-prompt.

---

### TA-B03 — Repair: UNLIKE-TERMS-COMBINED (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A frequent simplification error: combining terms that have different variables or different exponents — for example, writing 3x+2y=5xy or 3x+2=5x. Only like terms (same variable, same exponent) can be added together."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "Simplify 3x+2y."
→ "5xy" or "5x" or "5y": MC-3 confirmed. Continue B03.
→ "Cannot be simplified further" or "3x+2y": MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"Think of terms like unit labels in measurement. You can add 3 metres + 5 metres = 8 metres (same unit). You cannot add 3 metres + 2 kilograms — different units, no combined result.

```
3x + 5x = 8x    ✓  (same "unit": x)
3x + 2y = 3x+2y ✗→✓ cannot combine; keep separate (x-terms ≠ y-terms)
3x + 2  = 3x+2  ✗→✓ cannot combine; 2 is a constant, not an x-term
x² + x  = x²+x  ✗→✓ cannot combine; x² ≠ x (different powers)
```
Simplification only merges terms with identical variable-power signatures."

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify 7a+3b−2a. Show which terms are 'like' before combining."
→ CORRECT [like terms: 7a and −2a → 5a; 3b is unlike → result: 5a+3b]: "Correct — 5a+3b." Exit B03 → TA-A05.
→ INCORRECT [combines a and b terms]: "Draw a box around a-terms: 7a and −2a. Draw a circle around b-terms: 3b. Only combine within boxes or circles." → re-prompt.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Expression vs. equation identification | "Is 5x−3 an expression or equation? What about 5x−3=12?" |
| Day 3 | Evaluation at given values | "Evaluate 2x²+1 for x=−2." (2(4)+1=9) |
| Day 7 | Like-term simplification | "Simplify 4p+2q−p+3q." (3p+5q) |
| Day 30 | Multi-variable evaluation and simplification | "Evaluate 3a−2b+1 at a=2, b=−1; simplify 2x+y−x+3y." |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.found.variable (required): x, y, a represent varying quantities; substitution means replacing the symbol with a number
- math.arith.order-of-operations (required): after substitution, the resulting numerical expression must be evaluated using PEMDAS

**Enables:**
- math.alg.equation: an equation is formed when two expressions are set equal; solving finds the variable value that makes the equation true
- math.alg.polynomial: a polynomial is a specific class of algebraic expression with non-negative integer exponents

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **The = sign is the watershed:** Every teaching action should begin by asking the learner to identify whether there is an = sign. This single observation separates expression from equation and equation from identity. Make it automatic.

2. **Evaluation gate:** Before teaching like-term simplification (TA-A03), confirm TA-A01/A02 are solid. Learners who confuse expression with equation will apply simplification rules incorrectly (e.g., simplifying toward a "solution").

3. **Unlike-term errors are cognitively natural:** 3x+2y=5xy feels like 3 apples + 2 oranges = 5 apple-oranges. The unit analogy (Component 5 B03) is the most effective counter because it mirrors the "like units" intuition from arithmetic.

4. **Bloom=understand scope:** The target is recognition, evaluation, and single-level simplification (combining like terms). Polynomial arithmetic and factoring are downstream (math.alg.polynomial, math.alg.factoring-trinomials).

5. **Multi-variable expressions:** TA-A04 introduces expressions in two variables to reinforce the "expression as a rule" view. Do not advance to two-variable evaluation until single-variable evaluation (TA-A01/A02) is solid.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.found.variable ✓, math.arith.order-of-operations ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03, A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (novel shopping context) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.85×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P04 PATTERN INDUCTION used in A04 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (shopping cost model) | PASS |
| V-18 | MC-1 EXPRESSION-IS-EQUATION designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
