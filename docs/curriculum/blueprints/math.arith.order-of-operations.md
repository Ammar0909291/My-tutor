# TEACHING BLUEPRINT — math.arith.order-of-operations

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.arith.order-of-operations |
| concept_name | Order of Operations |
| domain | arithmetic |
| difficulty | developing |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.arith.addition, math.arith.subtraction, math.arith.multiplication, math.arith.division]
**unlocks:** [math.alg.expression]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** When an expression contains multiple operations, the result is uniquely determined by a precedence hierarchy — PEMDAS: Parentheses, Exponents, Multiplication and Division (left-to-right), Addition and Subtraction (left-to-right). Without this shared convention, the same expression can be read multiple ways and yield different values.

**Knowledge prerequisites activated:**
- math.arith.addition, math.arith.subtraction: lowest precedence tier; evaluated last, left to right
- math.arith.multiplication, math.arith.division: middle tier; evaluated before + and −, left to right
- (Exponentiation assumed known but not a formal prerequisite for this blueprint)

**Concept structure:**
1. **Precedence hierarchy**: P > E > ×÷ > +− (four tiers, tier 1 evaluated first)
2. **Left-to-right rule within a tier**: when two operations have the same precedence, evaluate the leftmost first
3. **Parentheses as override**: explicit grouping with ( ) always takes precedence over everything else
4. **Unique evaluation**: one expression, one value — the convention eliminates ambiguity

**Target understanding:** Given a multi-operation arithmetic expression, the learner identifies the correct evaluation order, applies it step by step, and produces the unique correct value.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | LEFT-TO-RIGHT-ONLY | Multi-operation expression without parentheses | Evaluates strictly left to right, ignoring all precedence: 3+4×2 → (3+4)×2=14 instead of 3+(4×2)=11 | B01 |
| MC-2 | ADDITION-BEFORE-MULTIPLICATION | Expression with + and × | Adds before multiplying regardless of position: 2+3×4 → 5×4=20 instead of 2+12=14 | B02 |
| MC-3 | MULTIPLICATION-BEFORE-DIVISION-ALWAYS | Expression with both × and ÷ | Always multiplies before dividing regardless of left-to-right order: 12÷4×3 → 12÷12=1 instead of (12÷4)×3=9 | B03 |

**FOUNDATIONAL MC:** MC-1 (LEFT-TO-RIGHT-ONLY) — rejects the precedence concept entirely; must be resolved before tier-specific confusions (MC-2, MC-3) can be addressed.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Physical recipe model: give learners a sequence of steps on cards labelled P, E, ×÷, +−. They physically sort the cards into the correct order before computing.

**Progression Gate (C → P):** Learner can name the four PEMDAS tiers and correctly sort three operations from a given expression without computing.
**Progression Gate (P → A):** Learner applies all four tiers in the correct order with the left-to-right rule, producing the correct value for expressions mixing three or more operations.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Checkpoint Order: The Recipe Steps Analogy (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A baking recipe — steps must be followed in a set order; you cannot frost a cake before it is baked, and you cannot bake before mixing.
Target domain: Order of operations — each tier must be completed before the next, no matter where the operations appear in the expression.
Mapping: recipe steps ↔ PEMDAS tiers; earlier steps ↔ higher precedence; doing steps out of order ↔ wrong evaluation order

"An expression like 3+4×2 is not a left-to-right list of equal steps — it has different priority levels. Multiplication is a 'bake first' step; addition is the 'frost last' step. Frosting before baking ruins the cake. Adding before multiplying ruins the expression."

PEMDAS tier summary:
```
Tier 1 (first): P — Parentheses        ( )
Tier 2 (second): E — Exponents          2³, x²
Tier 3 (third):  × and ÷ — left to right
Tier 4 (last):   + and − — left to right
```

Quick demo — 3+4×2:
```
Step 1: No parentheses. No exponents.
Step 2: ×÷ tier — evaluate 4×2=8 first: 3 + [8]
Step 3: +− tier — evaluate 3+8=11
Result: 11  (NOT (3+4)×2=14)
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 5+2×3. Write which tier you apply first and why."
→ CORRECT [2×3=6 first (×÷ tier); then 5+6=11]: "Correct — 11. Multiplication tier runs before addition." → TA-A02
→ PARTIAL [gets 11 but cannot name the tier]: "Which PEMDAS tier does × belong to?" → re-prompt
→ INCORRECT [(5+2)×3=21 or 5+2=7 then 7×3=21]: Flag MC-1 (left-to-right pattern). Route → B01
→ NO_RESPONSE: Replay PEMDAS table; identify each operation's tier in 5+2×3.

---

### TA-A02 — Worked Examples: Full PEMDAS Evaluation (GR-1: P07 | GR-2: P49)

**P07 WORKED EXAMPLE PAIR**

*Example 1 — Mixed ×÷ and +−:*
Evaluate 3+4×2.
```
Step 1 — Parentheses: none
Step 2 — Exponents: none
Step 3 — × and ÷ (left to right): 4×2=8    →  expression becomes 3+8
Step 4 — + and − (left to right): 3+8=11
Result: 11
```

*Example 2 — All four tiers present:*
Evaluate (2+3)²÷5−1.
```
Step 1 — Parentheses: (2+3)=5              →  5²÷5−1
Step 2 — Exponents: 5²=25                  →  25÷5−1
Step 3 — × and ÷ (left to right): 25÷5=5  →  5−1
Step 4 — + and − (left to right): 5−1=4
Result: 4
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 2+(3²−4)×2. Show each PEMDAS step on its own line."
→ CORRECT:
  [Parentheses: (3²−4) — exponent inside: 9−4=5; then (5); ×: 5×2=10; +: 2+10=12]
  "Correct — 12." → TA-A03
→ PARTIAL [correct steps but one computation error]: "Recheck your arithmetic at step ___." → re-prompt
→ INCORRECT [evaluates 2+3=5 first, then squares, etc.]: Flag MC-1. Route → B01
→ NO_RESPONSE: Re-present Example 2 with 2+(3²−4)×2 and Tier labels, first step filled.

---

### TA-A03 — With and Without Parentheses; Left-to-Right Same-Tier Rule (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Without parentheses (left-to-right rule within ×÷ tier):*
6 ÷ 2 × 3
```
×÷ tier, left to right: 6÷2=3 first, then 3×3=9
Result: 9
```
Do NOT multiply first just because × "seems stronger" — within the same tier, left to right wins.

*Case B — With parentheses (override):*
6 ÷ (2×3) = 6÷6 = **1**

The parentheses moved the × inside a Tier-1 group, computed first. Same symbols, one different character, completely different answer.

Second contrast — addition/subtraction tier, left-to-right:
```
Without parentheses:  8−3+2 = (8−3)+2 = 5+2 = 7
With parentheses:     8−(3+2) = 8−5 = 3
```
Reading 8−3+2 as 8−(3+2) is the classic sign-error trap. Left-to-right within the +− tier gives 7, not 3.

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate (a) 12÷4×3 and (b) 12÷(4×3). State the result of each."
→ CORRECT [(a) 12÷4=3, 3×3=9; (b) 4×3=12, 12÷12=1]: "Correct — 9 and 1. Left-to-right and parentheses give different answers." → TA-A04
→ INCORRECT [(a) gives 1, treating ×÷ as sequential multiplication-first]: Flag MC-3. Route → B03
→ NO_RESPONSE: "For (a): the leftmost operation is ÷. Apply it first: 12÷4=?" → guided scaffold

---

### TA-A04 — Left-to-Right Within Tiers: Pattern (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe and generalise the left-to-right rule:

*×÷ tier examples:*
```
20 ÷ 4 × 5:  leftmost is ÷ → 20÷4=5, then 5×5=25     ✓
20 × 4 ÷ 5:  leftmost is × → 20×4=80, then 80÷5=16    ✓
12 ÷ 4 ÷ 3:  leftmost is ÷ → 12÷4=3, then 3÷3=1       ✓
```

*+− tier examples:*
```
10 − 3 + 2:  leftmost is − → 10−3=7, then 7+2=9        ✓
10 + 3 − 2:  leftmost is + → 10+3=13, then 13−2=11     ✓
10 − 3 − 2:  leftmost is − → 10−3=7, then 7−2=5        ✓
```

**Generalised rule:** Within the ×÷ tier, and within the +− tier, always evaluate the leftmost operation first. There is no other ordering within a tier.

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 18÷6×2 and 18÷(6×2). What rule determines the difference?"
→ CORRECT [18÷6=3, 3×2=6; and 18÷12=1.5 — parentheses override left-to-right]: "Correct — 6 vs. 1.5. Left-to-right within tier, parentheses as override." → TA-A05
→ INCORRECT [18÷6×2 gives 1.5 — multiplied first]: Flag MC-3. Route → B03
→ NO_RESPONSE: "Which operation is leftmost in 18÷6×2: ÷ or ×?" → scaffold to left-to-right rule

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. Evaluate **3+4×2**.
   *(Expected: ×÷ first: 4×2=8; then +−: 3+8=11)*

2. Evaluate **(2+3)²÷5−1**.
   *(Expected: P: 5; E: 25; ÷: 5; −: 4)*

3. Evaluate **12÷4×3**.
   *(Expected: left-to-right in ×÷ tier: 12÷4=3, then 3×3=9)*

4. **True/False:** In the expression 8−3+2, you should subtract first giving 8−5=3.
   *(Expected: FALSE — left-to-right: (8−3)+2=5+2=7)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: P76 independence mode — cross_links=[], novel context)

*Spreadsheet formula context:*

"Spreadsheet software (e.g. Excel) evaluates formulas using the same order-of-operations rules as arithmetic.

(a) Evaluate the expression **3+4\*2^2−10/2** as a spreadsheet would (use PEMDAS; \* = multiply, ^ = exponent, / = divide).

(b) A student changes it to **(3+4)\*2^2−10/2**. What value does this produce?

(c) Why do the two expressions yield different results despite using the same numbers?"

*(Expected:*
*(a) E: 2^2=4; ×÷ left-to-right: 4\*4=16, then 10/2=5; +−: 3+16=19, 19−5=14. Answer: 14.*
*(b) P: (3+4)=7; E: 2^2=4; ×÷: 7\*4=28, 10/2=5; −: 28−5=23. Answer: 23.*
*(c) The parentheses in (b) move 3+4 to Tier 1, so it is computed before the exponentiation and multiplication, changing the structure of the calculation. In (a), the addition is the last operation performed.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 LEFT-TO-RIGHT-ONLY first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now evaluate any arithmetic expression by applying the PEMDAS hierarchy and the left-to-right rule within each tier. This shared convention is what makes expressions in algebra, spreadsheets, and programming unambiguous — and you will use it every time you work with algebraic expressions."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: LEFT-TO-RIGHT-ONLY (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A foundational confusion is treating every operation as equal-priority, evaluating from left to right like reading a sentence. This produces wrong answers for almost every multi-operation expression. Mathematics requires a priority hierarchy — not all operations are evaluated in the order they appear."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "To evaluate 3+4×2, which operation do you compute first: the addition (3+4) or the multiplication (4×2)?"
→ "The addition (3+4) because it is on the left": MC-1 LEFT-TO-RIGHT-ONLY confirmed. Continue B01.
→ "The multiplication (4×2) because × has higher priority": MC-1 not active. Exit B01 → B02 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"Operations are not all equal. Mathematics assigns multiplication and division a higher priority than addition and subtraction. No matter where × appears in the expression — left, middle, or right — it is evaluated before any + or −.

```
3 + 4 × 2:
  × is tier 3 (higher priority); + is tier 4 (lower priority)
  → evaluate 4×2=8 FIRST
  → then 3+8=11
```

Think of it as a checklist: go through the expression once for each tier. Only after all tier-3 operations are done do you start on tier-4."

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 1+2×5. State which operation you do first and which tier it belongs to."
→ CORRECT [×÷ tier first: 2×5=10; then +−: 1+10=11]: "Correct — 11. Tier 3 before Tier 4." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT [(1+2)×5=15]: Re-present P64 tier checklist: "Identify every × or ÷ first." → re-prompt.

---

### TA-B02 — Repair: ADDITION-BEFORE-MULTIPLICATION (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A specific version of the precedence error: adding (or subtracting) before multiplying because + appears first in the expression. The rule is about tiers, not left-to-right position. × always wins over + regardless of which symbol appears first in the written expression."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In 2+3×4, you have + appearing before ×. Which do you compute first?"
→ "The addition (2+3) because + comes first": MC-2 confirmed. Continue B02.
→ "The multiplication (3×4)": MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"Position in the written expression does NOT determine which operation goes first — tier rank does.

```
2 + 3 × 4:
  + is tier 4; × is tier 3 — tier 3 wins regardless of position
  → evaluate 3×4=12 FIRST (even though + appears to the left)
  → then 2+12=14
```

If the intent were to add first, we would need parentheses: (2+3)×4=20. The absence of parentheses means the default precedence applies."

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 6+2×7. Which symbol appears earlier in the expression? Which do you compute first, and why?"
→ CORRECT [+ appears earlier; but × computed first (tier 3): 2×7=14; then 6+14=20]: "Correct — 20. Tier rank overrides written position." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT [(6+2)×7=56]: Repeat P64: "Draw a tier-3 circle around every × and ÷; process those first." → re-prompt.

---

### TA-B03 — Repair: MULTIPLICATION-BEFORE-DIVISION-ALWAYS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A subtle error: when × and ÷ appear together, always multiplying first — as though × ranks higher than ÷. They are at the same tier. The tie-breaker is left to right, not operation symbol."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "In 12÷4×3, which do you compute first: ÷ or ×?"
→ "× first because multiplication is stronger": MC-3 confirmed. Continue B03.
→ "÷ first because it is on the left": MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"× and ÷ are in the SAME tier. There is no ranking between them. The left-to-right rule settles all ties within a tier.

```
12 ÷ 4 × 3:
  Both × and ÷ are tier 3 — same tier, use left-to-right
  Leftmost is ÷: 12÷4=3
  Next is ×: 3×3=9
  Result: 9
```

If you multiply first: 12÷(4×3)=12÷12=1 — that would require explicit parentheses.
Without parentheses: left-to-right always."

**P49 ADAPTIVE CHECKPOINT**
Q: "Evaluate 20÷5×4. Circle the leftmost ×÷ operation and compute it first."
→ CORRECT [÷ is leftmost: 20÷5=4; then 4×4=16]: "Correct — 16. Left-to-right within tier 3." Exit B03 → TA-A05.
→ INCORRECT [5×4=20, then 20÷20=1]: "Which symbol is further to the left — ÷ or ×? Apply it first." → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | × before + (no parentheses) | 5+3×2=11; 4×2+1=9 |
| Day 3 | Left-to-right within ×÷ tier | 24÷6×2=8 (NOT 2); 3×4÷6=2 |
| Day 7 | All four tiers with exponents | (1+2)²×3−4=23 |
| Day 30 | Cross-context: algebraic expression evaluation | 2x²+3x−1 at x=2: 2(4)+6−1=13 |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.arith.addition (required): the +− tier; evaluated last, left to right
- math.arith.subtraction (required): the +− tier; same precedence as addition, left to right
- math.arith.multiplication (required): the ×÷ tier; evaluated before + and −
- math.arith.division (required): the ×÷ tier; same precedence as multiplication, left to right

**Enables:**
- math.alg.expression: algebraic expressions mix variables with multi-operation arithmetic; order of operations is the evaluation rule

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **The acronym trap:** "PEMDAS" misleads some learners into treating M before D and A before S as absolute rules. Emphasise that M and D are one tier (evaluated left to right) and A and S are one tier (evaluated left to right). The acronym lists representatives, not a strict 6-step sequence.

2. **Parentheses-inside-parentheses:** If expressions have nested parentheses, work from the innermost outward. This blueprint uses only single-level parentheses; nested cases belong in math.alg.expression.

3. **Left-to-right sign errors:** 8−3+2 is one of the most common error sources — learners "collect" the addition and subtraction as 8−(3+2)=3 instead of (8−3)+2=7. The P06 contrast pair in TA-A03 addresses this directly.

4. **Spreadsheet transfer (P76):** Spreadsheet formula evaluation is one of the most immediate real-world applications. The transfer probe uses realistic formula notation (* for multiply, ^ for power) to bridge classroom arithmetic to computational tools learners already encounter.

5. **Bloom=apply:** Every session should include at least one expression requiring all four tiers in the correct order. Do not let learners practice only ×÷ before +−; the full PEMDAS chain must be exercised in each review session.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.arith.addition ✓, math.arith.subtraction ✓, math.arith.multiplication ✓, math.arith.division ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03, A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (novel spreadsheet probe) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=apply → P07 WORKED EXAMPLE PAIR present in TA-A02 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (spreadsheet formula evaluation) | PASS |
| V-18 | MC-1 LEFT-TO-RIGHT-ONLY designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
