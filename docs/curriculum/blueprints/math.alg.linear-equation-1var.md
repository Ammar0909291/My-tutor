# Teaching Blueprint — math.alg.linear-equation-1var

## Component 0 — Metadata
concept_id: math.alg.linear-equation-1var
concept_name: Linear Equation in One Variable
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: developing
bloom: apply
estimated_hours: 8
mastery_threshold: 0.90
CPA_entry_stage: C
requires: [math.alg.equation, math.alg.simplification]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A linear equation in one variable has the form ax + b = c (a ≠ 0), with a unique solution x = (c − b)/a found by isolating the variable through inverse operations applied equally to both sides.

**Conceptual progression:**
1. Equations represent balance — both sides must remain equal throughout solving.
2. Inverse operations (add/subtract, multiply/divide) undo operations while preserving equality.
3. The isolation sequence: simplify each side → move variable terms to one side → move constants to the other → divide by coefficient.
4. Solutions can be verified by substitution back into the original equation.

**CPA arc (entry: C):**
- Concrete: balance scales — physical or drawn — with objects representing the unknown; adding/removing equal weights on both sides
- Pictorial: balance diagrams with symbolic weights (x-tiles and unit tiles); bar models showing partitioned totals
- Abstract: symbolic manipulation with inverse operations; general form ax + b = c → x = (c − b)/a

**Prior knowledge activated:** equation as a statement of equality; variable as placeholder for an unknown value; simplification (combining like terms, distributing); arithmetic inverse operations

**Threshold concept:** The balance principle — any operation performed on one side must be performed identically on the other; this preserves equality and is the single invariant across all solution methods.

---

## Component 2 — Misconception Registry

### MC-1: BALANCE-NOT-MAINTAINED [FOUNDATIONAL]
**Description:** Learner applies an operation to only one side of the equation.
**Surface form:** From 3x + 5 = 20, subtracts 5 to get 3x = 20 (instead of 3x = 15).
**Root cause:** Treats the equation as a string to manipulate rather than a balanced relationship; equation-as-symbol not equation-as-constraint.
**Trigger condition:** Any step requiring a constant to move across the equals sign.
**Repair target:** TA-B01 → P27 + P41 + P64 restoring the balance-as-invariant frame.

### MC-2: WRONG-OPERATION-ORDER
**Description:** Learner divides by the coefficient before removing the constant, producing a fractional intermediate.
**Surface form:** From 3x + 5 = 20, divides by 3 first → x + 5/3 = 20/3, then struggles with fractions.
**Root cause:** Applies PEMDAS in reverse (division before subtraction) without understanding that subtraction first simplifies the arithmetic path.
**Trigger condition:** Equations with a coefficient ≠ 1 and a constant term.
**Repair target:** TA-B02.

### MC-3: SIGN-ERROR-TRANSPOSING
**Description:** Learner moves a term across the equals sign without changing its sign.
**Surface form:** From 3x + 5 = 20, writes 3x = 20 + 5 = 25.
**Root cause:** Treats "moving" as physical relocation, not as applying the inverse operation to both sides.
**Trigger condition:** Any subtraction step required to isolate the variable term.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** Present 2x = 10 (no constant). If correct → begin TA-A01. If incorrect → repair prerequisite (math.alg.equation).

**Scaffolding ladder:**
1. Balance-scale stories with integer unknowns (C stage)
2. Equations of form x + b = c (one-step, addition inverse only)
3. Equations of form ax = c (one-step, multiplication inverse only)
4. Equations of form ax + b = c (two-step, both inverses)
5. Equations requiring simplification first: distribution, like terms

**Worked example progression (P07):**
- WE-1: Two-step direct: 3x + 5 = 20 → subtract 5 both sides → 3x = 15 → divide by 3 → x = 5
- WE-2: Simplification-first: 3(2x − 1) + 2x = 10 → distribute → 8x − 3 = 10 → 8x = 13 → x = 13/8

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 90%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — Balance Principle and One-Step Equations
**Primitive sequence:** P03 → P49

**P03 — ANALOGY BRIDGE:**
> "Imagine a balance scale perfectly in balance. Each side holds exactly the same total weight. Now: if I add 5 kg to the left side only, what happens? The scale tips. To keep it balanced, I must add 5 kg to the right side too. An equation works exactly like this scale. The equals sign IS the balance point. Whatever operation you perform on one side, you must perform on the other — or you've broken the balance."

Concrete anchor: 3 identical boxes and 5 loose weights on the left; 20 loose weights on the right. The 'x' is the unknown weight of one box. To find x: remove 5 weights from each side (balance preserved) → 3 boxes = 15 weights → each box = 5 weights.

Formal mapping: 3x + 5 = 20. Subtract 5 from both sides: 3x = 15. Divide both sides by 3: x = 5.

Verification step: Substitute back — 3(5) + 5 = 15 + 5 = 20 ✓. The balance check closes the loop.

**P49 — ADAPTIVE CHECKPOINT:**
"Solve: 2x + 3 = 11"

- CORRECT (x=4): "Excellent — you maintained the balance perfectly. Let's move to equations that need simplification first." → TA-A02
- PARTIAL (operation correct, arithmetic error): "Your strategy is right — subtract 3 from both sides, then divide by 2. Check: 11 − 3 = 8, then 8 ÷ 2 = 4. Does that change your answer?" → re-attempt → TA-A02
- INCORRECT (MC-1 pattern — only one side operated on): "Notice your equation after that step — are both sides still equal? Substitute your answer back: does 2(?) + 3 = 11?" → TA-B01
- NO_RESPONSE: "Let me show the balance approach step by step: 2x + 3 = 11. I want to isolate x. Step 1: remove the +3 from the left — but balance demands I subtract 3 from the RIGHT too: 2x = 8. Step 2: I need one x, not two — divide BOTH sides by 2: x = 4. Now you try: 5x + 2 = 17." → TA-A02

---

### TA-A02 — Solving Two-Step and Simplification Equations
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: Negative coefficient*
Solve 7 − 2x = 1.
Step 1: Subtract 7 from both sides: −2x = 1 − 7 = −6.
Step 2: Divide both sides by −2: x = −6 ÷ (−2) = 3.
Verify: 7 − 2(3) = 7 − 6 = 1 ✓.

Note on negative coefficient: dividing by a negative flips the sign of both sides.

*Worked Example 2: Simplification required first*
Solve 3(2x − 1) + 2x = 10.
Step 1: Distribute: 6x − 3 + 2x = 10.
Step 2: Combine like terms: 8x − 3 = 10.
Step 3: Add 3 to both sides: 8x = 13.
Step 4: Divide by 8: x = 13/8.
Verify: 3(2·(13/8) − 1) + 2·(13/8) = 3(13/4 − 1) + 13/4 = 3(9/4) + 13/4 = 27/4 + 13/4 = 40/4 = 10 ✓.

**P49 — ADAPTIVE CHECKPOINT:**
"Solve: 4(x − 1) + 2 = 14"

- CORRECT (x=4): "You simplified first, then applied the balance principle — perfect two-stage execution." → TA-A03
- PARTIAL (distributed but sign error — gets 4x + 2 = 14 from −4 becoming +4): "Check your distribution: 4(x − 1) means 4·x + 4·(−1). What is 4 × (−1)?" → self-correct → TA-A03
- INCORRECT (skipped distribution — wrote 4x − 1 + 2 = 14): "The parentheses mean distribute the 4: 4·x AND 4·(−1). Both terms inside get multiplied." → TA-B02
- NO_RESPONSE: "Start with the parentheses: 4(x−1) = 4x − 4. Rewrite: 4x − 4 + 2 = 14. Simplify left: 4x − 2 = 14. Add 2 both sides: 4x = 16. Divide by 4: x = 4." → TA-A03

---

### TA-A03 — Contrast: Valid vs. Invalid Solution Strategies
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | CORRECT strategy | INCORRECT strategy |
|---|---|---|
| Equation | 5x + 10 = 30 | 5x + 10 = 30 |
| Step 1 | Subtract 10 both sides: 5x = 20 | Divide by 5 first: x + 2 = 6 |
| Step 2 | Divide by 5 both sides: x = 4 | Subtract 2: x = 4 |
| Why it matters | Integer arithmetic throughout | Introduces fractions unnecessarily |

Second contrast — a case where wrong order causes errors:

| Feature | CORRECT | INCORRECT |
|---|---|---|
| Equation | 6x + 9 = 27 | 6x + 9 = 27 |
| Step 1 | Subtract 9: 6x = 18 | Divide by 6: x + 9/6 = 27/6 |
| Step 2 | Divide by 6: x = 3 | Subtract 9/6: x = 27/6 − 9/6 = 18/6 = 3 |
| Strategy quality | Clean, integer path | Fraction-heavy, error-prone |

Key insight: Both paths are valid (balance principle preserved), but subtracting the constant first always avoids fractions when the constant is not divisible by the coefficient.

**P49 — ADAPTIVE CHECKPOINT:**
"Which first step produces the cleanest solution to 4x − 12 = 8? (A) Divide by 4. (B) Add 12 to both sides."

- CORRECT (B): "Yes — adding 12 first gives 4x = 20, then x = 5. Dividing first gives x − 3 = 2, then x = 5 — same answer but via integers anyway in this case. The cleaner habit: eliminate constants first." → TA-A04
- PARTIAL (chose A but recognised fractions were harder in general): "You noticed the strategy point. Both paths work here. The eliminate-constants-first habit saves time especially when coefficients don't divide evenly into the constant." → TA-A04
- INCORRECT (chose A with no recognition of strategy): "Try path B: add 12 → 4x = 20 → x = 5. Now try path A: divide by 4 → x − 3 = 2 → x = 5. Both work — but which felt simpler?" → TA-A04
- NO_RESPONSE: Demonstrate both paths side by side as in the contrast table above. → TA-A04

---

### TA-A04 — Pattern: Isolation Sequence
**Primitive sequence:** P04 → P49

**P04 — PATTERN INDUCTION:**
Study these solutions and identify the pattern:

Example 1: 2x + 3 = 11 → subtract 3 → 2x = 8 → divide by 2 → x = 4
Example 2: 5x − 7 = 18 → add 7 → 5x = 25 → divide by 5 → x = 5
Example 3: −3x + 6 = 15 → subtract 6 → −3x = 9 → divide by −3 → x = −3
Example 4: 4(x + 2) = 20 → divide by 4 → x + 2 = 5 → subtract 2 → x = 3

Pattern extraction questions:
1. What type of operation is always performed LAST? (Division/multiplication — the coefficient operation)
2. In examples 1–3, what is always the FIRST step? (Eliminate the constant term using addition or subtraction)
3. In example 4, why is dividing first better? (No constant to eliminate first; dividing by 4 simplifies the parenthesised structure immediately)
4. What is the universal last check? (Substitute back into the original equation)

Canonical isolation sequence: [Simplify each side] → [Eliminate constants] → [Isolate variable term] → [Divide by coefficient] → [Verify by substitution]

**P49 — ADAPTIVE CHECKPOINT:**
"Solve 3(2x + 1) − 5 = 16 using the isolation sequence."

- CORRECT (x=3): "You applied all four stages of the isolation sequence correctly. 3(2x+1)−5=16 → 6x+3−5=16 → 6x−2=16 → 6x=18 → x=3." → TA-A05
- PARTIAL (correct up to arithmetic slip): "Your sequence is right. Trace: distribute → 6x+3−5=16 → 6x−2=16 → 6x=18 → x=3." → TA-A05
- INCORRECT (missing the distribute step): "Before adding 5 to both sides, rewrite 3(2x+1) without parentheses: 3·2x + 3·1 = 6x + 3." → re-attempt → TA-A05
- NO_RESPONSE: Walk through all four stages for this example, then give 5x − 4 = 21 for immediate practice. → TA-A05

---

### TA-A05 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 90% → PASS requires ⌈0.90 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: Solve 3x + 5 = 20. [Answer: x = 5]
Item 2: Solve 7 − 2x = 1. [Answer: x = 3]
Item 3: True or False — the solution to 2x + 6 = 10 is x = 5. [Answer: FALSE; 2(5)+6=16≠10; correct solution is x=2]
Item 4: Solve 4(x − 1) + 2 = 14. [Answer: x = 4; distribute → 4x−4+2=14 → 4x−2=14 → 4x=16 → x=4]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — cross_links: []):**
Word problem: A taxi charges a flat fee of $3 plus $2 per kilometre. A passenger pays $17 in total. How many kilometres did they travel?

Model the situation as a linear equation: 3 + 2d = 17.
Solve: subtract 3 from both sides → 2d = 14 → divide by 2 → d = 7 km.
Verify: 3 + 2(7) = 3 + 14 = 17 ✓.

What does the balance principle look like in this context? (The total cost is fixed at $17 — every rearrangement must preserve that total.)

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (if balance-principle errors) or TA-B02 (if procedure/sign errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Linear equations in one variable: mastered. You can model real-world constraints algebraically, apply the balance principle reliably, and solve equations with distribution and simplification. This underpins everything from quadratic equations to systems of equations."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Balance-Not-Maintained
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "There's a specific and very common error that's appearing here: BALANCE-NOT-MAINTAINED. When solving 3x + 5 = 20, some learners subtract 5 only from the left side and write 3x = 20. This breaks the balance — the left side is now 5 less than the right side. The equals sign has become false."

**P41 — MISCONCEPTION DETECTOR:**
> "Look at this work: '3x + 5 = 20, so 3x = 20.' Is the equation still balanced? Substitute x = 5 into BOTH the original equation and the modified one. Original: 3(5)+5=20 ✓. Modified: 3(5)=20 → 15≠20. The balance was broken at the first step."

**P64 — CONCEPTUAL SHIFT:**
> "Reframe the operation: you are not 'removing' the 5 from the left. You are SUBTRACTING 5 FROM THE ENTIRE EQUATION — which means subtracting 5 from both sides. Every step is an operation on the whole equation, not on one side."

Practice with explicit two-column format:

Left side | Right side
3x + 5 − 5 = | 20 − 5
3x = | 15
→ TA-A02

---

### TA-B02 — Repair: Sign Error / Wrong Operation Order
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two related errors often appear together. SIGN-ERROR-TRANSPOSING: moving a term across the equals sign without changing its sign (e.g., 3x + 5 = 20 → 3x = 20 + 5). WRONG-OPERATION-ORDER: dividing by the coefficient before removing constants, which introduces avoidable fractions."

**P41 — MISCONCEPTION DETECTOR:**
> "If you write 3x + 5 = 20 → 3x = 20 + 5 = 25, substitute x = 25/3 into the original: 3(25/3)+5 = 25+5 = 30 ≠ 20. The sign flip gave a wrong answer. Subtracting 5 from the right means −5, not +5."

**P64 — CONCEPTUAL SHIFT:**
> "The inverse operation principle: to undo +5 on the left, you SUBTRACT 5. When you do the same to the right, it becomes 20 − 5 = 15. There is no 'moving' — only applying the same inverse to both sides. Mnemonic: opposite sign, same magnitude, both sides."

Two-column isolation drill:
Equation: 7 − 2x = 1
Step: Subtract 7 from both sides → left: −2x; right: 1−7=−6
Step: Divide both sides by −2 → x = 3
Verify: 7 − 2(3) = 7 − 6 = 1 ✓
→ TA-A03

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.alg.linear-equation-1var
  MAMR: 0.90
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Solve 5x − 8 = 22."
  session_3_probe: "A train ticket costs $4 plus $1.50 per station. Maria paid $16. How many stations?"
  session_7_probe: "Solve 2(3x + 4) − 5 = 19."
  session_14_probe: "Solve −4x + 7 = −9. Verify your answer."
  session_30_probe: "Write and solve a linear equation modeling: three consecutive integers sum to 72."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.alg.equation — equation as equality statement, variable notation [BLUEPRINT EXISTS]
- math.alg.simplification — distribution, combining like terms [BLUEPRINT EXISTS]

**Unlocks:**
- math.alg.linear-equation-2var — systems of two linear equations
- math.alg.inequalities — linear inequalities (same balance logic, flipped for negatives)
- math.alg.quadratic-equation — quadratic equations (isolation technique extended)

**Cross-links:** [] — no Tier 1 cross-links.

**GR-8 satisfied:** all prerequisite and unlock relationships documented above.
**GR-9 satisfied:** P76 independence mode applied (cross_links empty).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The balance metaphor (P03) must be established concretely before any symbolic manipulation. Learners who skip the concrete anchor reliably develop MC-1 (BALANCE-NOT-MAINTAINED).

**Common teaching error to avoid:** Do not present "move the term to the other side and change the sign" as the primary rule. This shortcut is a surface observation about what happens when you subtract from both sides — but learners who learn the shortcut first almost universally develop MC-3 (SIGN-ERROR-TRANSPOSING) when they misapply the movement metaphor.

**Verification habit:** Establish substitution-back as a compulsory final step, not optional checking. This habit transfers to quadratic equations and systems where guessing is harder.

**Distribution-first rule:** When parentheses are present, always distribute (or factor out) before applying the isolation sequence. Students who skip this step conflate MC-2 and distribution errors.

**V-3 check (CPA_ENTRY=C for developing difficulty):** TA-A01 opens with a concrete balance-scale analogy (boxes and weights) before introducing formal notation — V-3 satisfied.

**GR-10 — MAMR enforcement:** MAMR = 90%. A learner who scores 4/5 on the P91 gate does NOT receive mastery credit and routes to repair (TA-B01 or TA-B02 depending on error type), then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P03 (B-category primitive for developing/apply)
- [x] GR-2: Each non-gate TA (A01–A04) contains P49
- [x] GR-3: TA-A05 is terminal (P91 contains P74 → either P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A05; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A05 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links = [] → P76 independence mode applied; probe is a real-world word problem
- [x] GR-10: MAMR = 90% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.alg.linear-equation-1var)
- [x] V-2: difficulty=developing, bloom=apply, h=8, thresh=0.90 match KG
- [x] V-3: CPA_ENTRY=C (developing difficulty → concrete entry stage); TA-A01 opens with balance-scale analogy
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P03 correctly anchors TA-A01 (analogy bridge for balance scale)
- [x] V-6: P07 present in TA-A02 (bloom=apply requires worked example pair)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.90 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items are distinct, non-repetitive, cover key skill facets
- [x] V-13: P76 probe is genuine transfer (word problem context, not symbolic repetition)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain matches h=8 scope (4 main TAs + gate — within spec for h≥6)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and key pedagogical warnings

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: No concept introduced without prerequisite activation; no shortcut rules taught without conceptual grounding ✓
- Robust: TA chain matches h=8 scope; P91 gate enforces 90% threshold ✓

**STATUS: PACKAGE_READY**
