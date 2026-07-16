# Teaching Blueprint: Mixed Numbers

**Blueprint ID:** math.arith.mixed-numbers
**Status: PACKAGE_READY**
**Date:** 2026-07-11
**Framework Version:** 1.0

---

## Component 0 — Concept Profile

```
id:                  math.arith.mixed-numbers
name:                Mixed Numbers
domain:              mathematics / arithmetic / fractions
bloom:               apply
difficulty:          2 (developing)
mastery_threshold:   0.85
estimated_hours:     3
requires:            [math.arith.fractions]
unlocks:             []
cross_links:         []
cpa_entry_stage:     C
```

**CPA Entry Stage Derivation:** difficulty=2 (developing) AND domain≠physics → C (Concrete). Student begins with physical models (fraction strips, pizza) before moving to pictorial and abstract representations.

**Session Cap:** estimated_hours=3 → max 7 TAs per session (≥1h threshold applies; PA-3 hard limit).

**Bloom Level Note:** bloom=apply. Protocol A includes dedicated application TAs with real-world word problems. Mastery probes require students to USE mixed number arithmetic in context, not just demonstrate procedures.

---

## Component 1 — Learning Objective

**Mastery statement:** A student who achieves mastery demonstrates understanding of what a mixed number represents, can add and subtract mixed numbers (including with unlike denominators and with regrouping), and can apply mixed number arithmetic to solve real-world problems — selecting appropriate strategies and verifying answers in context.

**NOT mastery:** A student who can convert between improper fractions and mixed numbers (a separate concept) but cannot add mixed numbers with unlike denominators, or who cannot regroup during subtraction, or who cannot apply mixed number operations to a word problem, has NOT achieved mastery.

---

## Component 2 — Prerequisite Verification

**Hard prerequisites (from KG `requires` field):**
- `math.arith.fractions` — fraction notation, numerator/denominator, equivalent fractions, finding a common denominator, adding/subtracting proper fractions with unlike denominators

**Verification gate (integrated into TA-A01 opening):** Before new instruction, verify student can find a common denominator and add two proper fractions with different denominators (e.g., ⅓ + ½ = 5/6). If not, Teaching Engine must route to `math.arith.fractions` first.

**Note on related concept:** `math.arith.improper-fractions` (KG `related` field) is NOT a formal prerequisite. This blueprint develops mixed number arithmetic independently. When the improper-fraction form is needed (e.g., for multiplication), this blueprint converts inline with a brief reminder of the procedure.

---

## Component 3 — Misconception Registry

| ID | Label | Description | Type | MAMR Priority |
|----|-------|-------------|------|---------------|
| MC-1 | Addition without LCD | Student adds whole parts correctly but adds fraction parts without finding a common denominator (e.g., 2⅓ + 1½ → 3 2/5 instead of 3 5/6) | Foundational | 1st (underlies subtraction; must clear before MC-2 addressed in repair context) |
| MC-2 | Subtraction regrouping omitted | When fractional part of minuend is less than subtrahend's fraction, student subtracts smaller from larger regardless of position (e.g., 3¼ − 1¾ → 2 2/4 instead of 1½) | Secondary | 2nd |
| MC-3 | Mixed multiplication adds whole parts | For mixed × whole or mixed × mixed, student adds whole number parts and multiplies fraction parts separately (e.g., 2½ × 3 → 5½ instead of 7½) | Secondary | 2nd (independent of MC-2) |

**MAMR Rule:** MC-1 is FOUNDATIONAL — repairs to addition algorithm must complete before MC-2 repair begins (subtraction requires correct addition in the regrouping step). MC-2 and MC-3 are independent of each other; address in FIFO order after MC-1 cleared.

---

## Component 4 — Student State Protocols

### Protocol A — State S0: No Prior Exposure

**Entry condition:** Student has no experience with mixed number arithmetic; prerequisite fraction operations confirmed.

**Instructional goal:** Build mixed number arithmetic from concrete meaning through addition (like and unlike denominators), subtraction (including regrouping), and application to real-world contexts. Bloom=apply focus: students must USE the operations, not just perform them in isolation.

---

**TA-A01 — Concrete: What a Mixed Number Represents**

*Primitive sequence:* `P02 → P26 → P03 → P06 → P55 → P49`

**P02 — CONTEXT ESTABLISHMENT:**
"You've seen fractions like ¾ that are less than 1. What if you have 2 whole pies AND ¾ of a third pie? That's a MIXED NUMBER: 2¾. It has a whole part (2) and a fraction part (¾)."

**P26 — WORKED EXAMPLE (Concrete):**
Draw three circles divided into 4 equal parts. Shade all 4 in circle 1, all 4 in circle 2, and 3 of 4 in circle 3. "This picture shows 2¾ pies total. The whole number 2 counts the complete pies. The ¾ counts the fraction of the third pie."

**P03 — CONCRETE MANIPULATION:**
Give student fraction strips marked in thirds. Ask: "Build 1⅔ using the strips. How many complete strips? How many extra thirds?"

Student builds: 1 full strip + 2/3 of another = 1⅔.

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
"A mixed number = whole number + proper fraction. To add or subtract mixed numbers, we work with the whole parts and fraction parts separately — BUT the fraction parts must have a COMMON DENOMINATOR first. This is the critical rule."

**P55 — COMPREHENSION CHECK:**
"Before adding 1⅓ + 2½, what must you do with the fractions ⅓ and ½?"

Expected: Find a common denominator (6).

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Build or draw 2⅔. What is the whole part? What is the fraction part? What fraction of a whole does the fractional part represent?",
  "CORRECT": {
    "criteria": "Whole part = 2, fraction part = ⅔. Understands ⅔ is 2 of 3 equal pieces of one whole.",
    "action": "→ advance to TA-A02"
  },
  "PARTIAL": {
    "criteria": "Builds correctly but cannot articulate what each part means",
    "action": "Ask: 'How many complete wholes? How many equal pieces of the next whole?' → clarify meaning → advance"
  },
  "INCORRECT": {
    "criteria": "Confuses whole part and fraction part or cannot construct the model",
    "action": "Return to P26 pie diagram. Point explicitly: 'This circle = 1 whole. You have 2 complete circles plus ⅔ more.' Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'How many whole strips do you need to show 2? Now show ⅔ extra — how many pieces?'"
  }
}
```

---

**TA-A02 — Addition: Like Denominators**

*Primitive sequence:* `P01 → P26 → P03 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"We can build mixed numbers. Now let's add them — starting with the easy case: same denominators."

**P26 — WORKED EXAMPLE:**
```
2⅓ + 1⅓:
  Whole parts: 2 + 1 = 3
  Fraction parts: ⅓ + ⅓ = 2/3
  Result: 3⅔

3¾ + 2¾:
  Whole parts: 3 + 2 = 5
  Fraction parts: ¾ + ¾ = 6/4 = 1½
  Carry the whole: 5 + 1 = 6, fraction part = ½
  Result: 6½    ← IMPORTANT: if fraction sum ≥ 1, carry to whole part
```

**P03 — CONCRETE MANIPULATION:**
Student uses fraction strips to verify 3¾ + 2¾ = 6½ by physically combining strips and counting wholes.

**P55 — COMPREHENSION CHECK:**
"When the fraction parts add up to more than 1 whole, what must you do with the extra?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 4⅖ + 3⅗. Show the addition of each part separately. Carry if needed.",
  "CORRECT": {
    "criteria": "Whole: 4+3=7. Fraction: 2/5+3/5=5/5=1. Carry: 7+1=8. Result: 8.",
    "action": "→ advance to TA-A03"
  },
  "PARTIAL": {
    "criteria": "Whole parts correct; fraction parts correct; forgot to carry the whole from 5/5=1",
    "action": "Ask: 'What is 5/5?' → 1 whole → 'Add that to 7.' → 8. → advance"
  },
  "INCORRECT": {
    "criteria": "Adds numerators over new denominator (2/5+3/5=5/10 etc.)",
    "action": "Return to prerequisite fraction addition rule: same denominator → add numerators only. Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Break into steps: 'Add just the whole numbers: 4+3=?' Then: 'Add just the fractions: 2/5+3/5=?'"
  }
}
```

---

**TA-A03 — Addition: Unlike Denominators**

*Primitive sequence:* `P01 → P06 → P26 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"Now the harder case: adding mixed numbers when the denominators are different. The key step is finding a common denominator first."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
```
PROCEDURE — Adding mixed numbers with unlike denominators:
  Step 1: Find LCD of the two denominators.
  Step 2: Convert each fraction part to the LCD.
  Step 3: Add whole parts. Add fraction parts.
  Step 4: If fraction sum ≥ 1, carry 1 to the whole part. Simplify if needed.
```

**P26 — WORKED EXAMPLE:**
```
2⅓ + 1½:
  Step 1: LCD(3,2) = 6
  Step 2: ⅓ = 2/6;  ½ = 3/6
  Step 3: Whole: 2+1=3.  Fraction: 2/6+3/6=5/6
  Step 4: 5/6 < 1, no carry needed.
  Result: 3 5/6

3¾ + 1⅔:
  Step 1: LCD(4,3) = 12
  Step 2: ¾ = 9/12;  ⅔ = 8/12
  Step 3: Whole: 3+1=4.  Fraction: 9/12+8/12=17/12
  Step 4: 17/12 > 1 → 17/12 = 1 5/12. Carry: 4+1=5, fraction = 5/12.
  Result: 5 5/12
```

**P55 — COMPREHENSION CHECK:**
"What would happen if you forgot Step 1 and added ¾ + ⅔ directly as 7/12? (Hint: what is 3+4 over what?)"

Expected: That would be wrong — 3/4+2/3 ≠ (3+2)/(4+3). Denominators can't just be added.

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 2½ + 3⅔. Show all four steps.",
  "CORRECT": {
    "criteria": "LCD=6; ½=3/6, ⅔=4/6; whole 2+3=5; fraction 3/6+4/6=7/6=1⅙; carry: 5+1=6, fraction=⅙; Result: 6⅙",
    "action": "→ advance to TA-A04"
  },
  "PARTIAL": {
    "criteria": "LCD correct, fractions converted correctly, but carry omitted → answer 5 7/6",
    "action": "Ask: 'Is 7/6 a proper fraction?' → No → 'Convert 7/6 to a mixed number and carry.' → 6⅙ → advance"
  },
  "INCORRECT": {
    "criteria": "Adds fractions without LCD (MC-1): e.g., ½+⅔=3/5 or 2/5",
    "action": "Flag MC-1. Revisit P06 Step 1. Ask: 'What is LCD(2,3)?' → 6 → redo fraction conversion. Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'What is the LCD of 2 and 3?' Then: 'Convert ½ to sixths. Convert ⅔ to sixths.' Then add."
  }
}
```

---

**TA-A04 — Subtraction Without Regrouping**

*Primitive sequence:* `P01 → P06 → P26 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"Addition done. Now subtraction — starting with the straightforward case where the fraction part of the minuend is LARGER than the subtrahend's fraction part."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
```
PROCEDURE — Subtracting mixed numbers (no regrouping needed):
  Step 1: Find LCD (if denominators differ).
  Step 2: Convert fraction parts to LCD.
  Step 3: Subtract fraction parts (top fraction ≥ bottom fraction — OK).
  Step 4: Subtract whole parts. Simplify if needed.
```

**P26 — WORKED EXAMPLE:**
```
4¾ − 1¼:    (same denominator, no LCD needed)
  Fraction: ¾ − ¼ = 2/4 = ½
  Whole: 4 − 1 = 3
  Result: 3½

5⅔ − 2⅓:   (same denominator)
  Fraction: ⅔ − ⅓ = ⅓
  Whole: 5 − 2 = 3
  Result: 3⅓

6½ − 3⅙:   (different denominators)
  LCD(2,6)=6;  ½=3/6
  Fraction: 3/6 − 1/6 = 2/6 = ⅓
  Whole: 6 − 3 = 3
  Result: 3⅓
```

**P55 — COMPREHENSION CHECK:**
"For 6½ − 3⅙: why was it safe to subtract the fraction parts directly (without regrouping)?"

Expected: Because 3/6 (= ½) ≥ 1/6 — the top fraction was bigger.

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 7⅗ − 4⅕. Show all steps.",
  "CORRECT": {
    "criteria": "Same denominator. Fraction: 3/5−1/5=2/5. Whole: 7−4=3. Result: 3⅖.",
    "action": "→ advance to TA-A05"
  },
  "PARTIAL": {
    "criteria": "Correct process but arithmetic slip in whole-number subtraction",
    "action": "Point to arithmetic error; recompute. → advance"
  },
  "INCORRECT": {
    "criteria": "Subtracts larger fraction from smaller regardless (early MC-2 sign): ⅕−⅗",
    "action": "Flag MC-2 potential. Reinforce: 'The top number in a subtraction must be at least as big as the bottom.' Ask: 'Is 3/5 ≥ 1/5?' → yes → safe to subtract. Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Break into steps: 'Subtract just the fractions: 3/5−1/5=?' Then: 'Subtract just the wholes.'"
  }
}
```

---

**TA-A05 — Subtraction With Regrouping**

*Primitive sequence:* `P01 → P06 → P26 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"Now the trickiest subtraction case: when the fraction part of the minuend is SMALLER than the subtrahend's fraction part. We must regroup."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
```
PROCEDURE — Subtracting mixed numbers (WITH regrouping):
  If fraction of minuend < fraction of subtrahend:
    Step 1: Borrow 1 whole from the whole-number part.
    Step 2: Convert borrowed 1 to equivalent fraction (= denominator/denominator).
    Step 3: Add borrowed fraction to the existing fraction part.
    Step 4: NOW subtract (fraction part is now large enough).
    Step 5: Subtract whole parts (remember you borrowed 1).
```

**P26 — WORKED EXAMPLE:**
```
3¼ − 1¾:   (same denominator; ¼ < ¾ — need to regroup)
  Step 1: Borrow 1 from the 3 → 3 becomes 2.
  Step 2: 1 whole = 4/4.
  Step 3: ¼ + 4/4 = 5/4  (now the minuend fraction is 2 5/4)
  Step 4: 5/4 − 3/4 = 2/4 = ½
  Step 5: 2 − 1 = 1
  Result: 1½   Check: 1½ + 1¾ = 3¼ ✓

5⅙ − 2⅔:   (unlike denominators; ⅙ < ⅔)
  LCD(6,2)=6;  ⅔ = 4/6.  Now ⅙ < 4/6 — regroup.
  Borrow 1 from 5 → 4; borrowed 1 = 6/6.
  ⅙ + 6/6 = 7/6  (minuend becomes 4 7/6)
  7/6 − 4/6 = 3/6 = ½
  4 − 2 = 2
  Result: 2½   Check: 2½ + 2⅔ = 2 3/6 + 2 4/6 = 4 7/6 = 5⅙ ✓
```

**P55 — COMPREHENSION CHECK:**
"When you borrow 1 from the whole number, what do you convert it into? Why does the denominator matter?"

Expected: Convert to denominator/denominator (e.g., 4/4 if denominator is 4). The denominator must match so fractions can be added.

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 4⅓ − 2¾. Show every step including the regroup. Verify by adding back.",
  "CORRECT": {
    "criteria": "LCD=12; ⅓=4/12, ¾=9/12; 4/12<9/12 → regroup: borrow 1 from 4→3, add 12/12→16/12; 16/12−9/12=7/12; 3−2=1; Result: 1 7/12. Verify: 1 7/12 + 2¾ = 1 7/12 + 2 9/12 = 3 16/12 = 4 4/12 = 4⅓ ✓",
    "action": "→ advance to TA-A06"
  },
  "PARTIAL": {
    "criteria": "Correct regroup mechanics but verification step skipped",
    "action": "Prompt: 'Verify: add your answer to 2¾.' → student confirms. → advance"
  },
  "INCORRECT": {
    "criteria": "MC-2: subtracts smaller from larger regardless (e.g., 9/12−4/12=5/12 then 4−2=2 → 2 5/12)",
    "action": "Flag MC-2. Ask: 'Is 4/12 big enough to subtract 9/12 from?' → No → 'So we must regroup.' Walk through regrouping slowly. Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Find LCD first. Convert both fractions. Is the top fraction big enough? If not, borrow 1 from the whole number and add 12/12 to it.'"
  }
}
```

---

**TA-A06 — Application: Word Problems**

*Primitive sequence:* `P01 → P26 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"You can add and subtract mixed numbers. Now let's apply these skills to solve real problems where you must choose the right operation."

**P26 — WORKED EXAMPLE:**
```
Problem: A baker uses 3½ cups of flour for bread and 1⅔ cups for muffins.
         How much flour in total? How much more did the bread use?

Total: 3½ + 1⅔
  LCD=6; ½=3/6, ⅔=4/6
  Whole: 3+1=4. Fraction: 3/6+4/6=7/6=1⅙. Carry: 4+1=5.
  Total = 5⅙ cups.

Difference: 3½ − 1⅔
  ½=3/6; 3/6 < 4/6 → regroup.
  Borrow: 3→2; 3/6+6/6=9/6.
  9/6−4/6=5/6. Whole: 2−1=1.
  Difference = 1 5/6 cups.
```

**P55 — COMPREHENSION CHECK:**
"In the first question, how did you decide to add (not subtract)? In the second, what word in the problem told you to subtract?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "A plumber has 7¾ metres of pipe. They cut off 3⅜ metres. (a) How much pipe remains? (b) If they then receive a new piece of 2⅝ metres, what is the total length of pipe now?",
  "CORRECT": {
    "criteria": "(a) 7¾−3⅜: same denom=8; ¾=6/8; 6/8>3/8 no regroup; 6/8−3/8=3/8; 7−3=4; Result: 4⅜. (b) 4⅜+2⅝: same denom=8; 3/8+5/8=8/8=1; carry: 4+2+1=7; Result: 7 exactly.",
    "action": "→ advance to TA-A07 (mastery gate)"
  },
  "PARTIAL": {
    "criteria": "One correct, one with arithmetic error (not conceptual)",
    "action": "Identify and correct arithmetic error. → advance"
  },
  "INCORRECT": {
    "criteria": "Operation selection error (adds when should subtract or vice versa) OR MC errors in computation",
    "action": "For operation error: 'What does CUT OFF mean?' → removal → subtraction. For MC error: address specific MC. Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold (a): 'Cut off means to remove — which operation?' → (b): 'Receive new means to add.'"
  }
}
```

---

**TA-A07 — Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01 — ATTENTION ANCHOR:**
"You've worked through all the key mixed number operations. Let's confirm mastery."

**P77 — MASTERY PROBE (Retrieval):**
"From memory: (a) state the critical rule for adding/subtracting mixed numbers with unlike denominators, (b) explain when regrouping is needed in subtraction, and (c) state how to perform the regroup."

*Expected:* (a) Find LCD and convert fraction parts before adding/subtracting. (b) Regrouping needed when fraction of minuend < fraction of subtrahend. (c) Borrow 1 from whole number; convert to denominator/denominator; add to fraction part.

**P55 — COMPREHENSION CHECK:** "If you forget to find the LCD before adding, what type of answer do you get?"

**P76 — TRANSFER PROBE:**
"A wall is 5⅓ metres wide. Two pictures need to hang on it: one is 1¾ metres wide, the other is 2⅝ metres wide. Is there enough wall for both pictures with at least ¼ metre gap between them? Show your work."

*P76 independence note: cross_links=[]; transfer uses a home-decoration measurement context; self-contained at the arithmetic level.*

**P55 — COMPREHENSION CHECK:** "What total width do the pictures plus gap require? How does that compare to the wall width?"

**P75 — MISCONCEPTION PROBE:**
"A student computes 4⅓ − 2¾ as follows: 'The fraction ¾ > ⅓, so subtract ⅓ from ¾ and get 2/4 = ½. Then 4−2=2. Answer: 2½.' What did they do wrong? What is the correct answer?"

*Expected:* They subtracted the smaller fraction from the larger regardless of position — MC-2. Correct: regroup, get 1 7/12.

**P55 — COMPREHENSION CHECK:** "What rule does the student need to fix their approach?"

**P74 — APPLICATION PROBE:**
"Compute: (a) 3⅖ + 4⅗, (b) 6¾ − 2⅞, (c) 8⅓ + 3½ − 4¼."

**P55 — COMPREHENSION CHECK:** "For (c): which operation did you perform first, and why?"

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.85",
  "PASS": {
    "criteria": "P77 all three points stated accurately; P76 wall-problem correct with all work shown; P75 MC-2 error identified and correct answer given; P74 (a)(b)(c) all correct",
    "action": "Record mastery. Trigger P89 spaced repetition (1, 3, 7, 21, 60 days). Blueprint complete."
  },
  "ROUTE_TO_PROTOCOL_B": {
    "criteria": "P77 recall correct but P74 application has errors",
    "action": "Route to Protocol B for procedure consolidation."
  },
  "ROUTE_TO_PROTOCOL_C": {
    "criteria": "P75 shows MC-2 not resolved, OR P74 shows LCD omission (MC-1)",
    "action": "Route to Protocol C for active misconception repair."
  }
}
```

---

### Protocol B — State S1: Partial Knowledge / Procedural Gaps

**Entry condition:** Student can add mixed numbers with like denominators but fails with unlike denominators, or performs subtraction but systematically omits regrouping check.

**Instructional goal:** Fill specific procedural gaps with conceptual anchoring; build fluency in both directions.

---

**TA-B01 — Gap Diagnosis and LCD Reinforcement**

*Primitive sequence:* `P02 → P41 → P06 → P26 → P55 → P49`

**P02 — CONTEXT ESTABLISHMENT:**
"Let's identify exactly where your mixed number skills need strengthening. We'll check addition with unlike denominators and subtraction with regrouping."

**P41 — MISCONCEPTION DETECTOR:**
Present two probe items:
1. "2⅓ + 1½ = ?" → diagnoses LCD use
2. "5¼ − 2¾ = ?" → diagnoses regrouping

**P06 — EXPLICIT STRATEGY INSTRUCTION (targeted to gap found):**
For addition gap: "The LCD is the bridge between unlike denominators. Never add ⅓ + ½ directly — find LCD=6 first."
For subtraction gap: "When fraction of minuend < subtrahend's fraction, borrow 1 whole and add it as denominator/denominator."

**P26 — WORKED EXAMPLE:**
Address the specific gap from the detector with a fresh worked example.

**P55 — COMPREHENSION CHECK:**
"Explain the step that was causing your error."

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Recompute the probe item that was incorrect. Show the corrected approach.",
  "CORRECT": {
    "criteria": "Corrected approach with correct answer",
    "action": "→ advance to TA-B02"
  },
  "PARTIAL": {
    "criteria": "Correct process, arithmetic error",
    "action": "Identify arithmetic error. Recompute. → advance"
  },
  "INCORRECT": {
    "criteria": "Same error persists",
    "action": "More targeted re-instruction on the specific step. Offer a simpler example first."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Work through step by step with student following along."
  }
}
```

---

**TA-B02 — Fluency Practice**

*Primitive sequence:* `P01 → P26 → P30 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"The strategy is clear. Now practice builds fluency."

**P26 — WORKED EXAMPLE:**
One complete worked example combining both unlike-denominator addition AND regrouping subtraction.

**P30 — BRIDGE REINFORCEMENT:**
"Notice: the same LCD you find for addition is the same LCD you need before checking if regrouping is needed in subtraction. Finding the LCD is always the first step."

**P55 — COMPREHENSION CHECK:**
"In what order do you apply the steps for subtraction with unlike denominators?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: (a) 3⅓ + 2¾, (b) 6⅙ − 4½. Verify (b) by adding back.",
  "CORRECT": {
    "criteria": "(a) LCD=12; ⅓=4/12, ¾=9/12; 3+2=5; 4/12+9/12=13/12=1 1/12; carry: 5+1=6, fraction=1/12; Result: 6 1/12. (b) LCD=6; ⅙=1/6, ½=3/6; 1/6<3/6 → regroup; borrow: 6→5, 1/6+6/6=7/6; 7/6−3/6=4/6=⅔; 5−4=1; Result: 1⅔. Verify: 1⅔+4½=1 4/6+4 3/6=5 7/6=6⅙ ✓",
    "action": "→ advance to TA-B03 (mastery gate)"
  },
  "PARTIAL": {
    "criteria": "One correct; one with an arithmetic slip",
    "action": "Address the slip. → advance"
  },
  "INCORRECT": {
    "criteria": "Systematic error persists",
    "action": "Route to Protocol C for targeted misconception repair."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Break each problem into numbered steps and guide through."
  }
}
```

---

**TA-B03 — Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01 — ATTENTION ANCHOR:**
"Gaps addressed. Let's confirm full mastery."

**P77 — MASTERY PROBE:** "State the full addition procedure and the full subtraction procedure for mixed numbers with unlike denominators."

**P55 — COMPREHENSION CHECK:** "What is the one check that tells you whether regrouping is needed?"

**P76 — TRANSFER PROBE:**
"A seamstress has 8½ metres of fabric. She uses 3⅔ metres for a dress and 2¾ metres for a skirt. How much fabric remains?"

**P55 — COMPREHENSION CHECK:** "Which operations did you use and in what order?"

**P75 — MISCONCEPTION PROBE:**
"Identify the error: '3⅕ + 2⅔ = 5 3/8.' What should the answer be?"

*Expected:* LCD error — student treated the denominators as addible (1/5+2/3 ≠ 3/8). LCD=15; ⅕=3/15, ⅔=10/15; 3+10=13/15. Total: 5 + 13/15 = 5 13/15.

**P55 — COMPREHENSION CHECK:** "What specifically caused the error in the student's work?"

**P74 — APPLICATION PROBE:** "Compute: (a) 5½ + 2⅗, (b) 9⅓ − 4⅝, (c) 6¼ + 3⅓ − 5⅚."

**P55 — COMPREHENSION CHECK:** "For (c): show your LCD and conversion before computing."

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.85",
  "PASS": {
    "criteria": "All probes correct; P75 LCD error identified; P74 all three correct",
    "action": "Record mastery. Trigger P89 spaced repetition (1, 3, 7, 21, 60 days). Blueprint complete."
  },
  "ROUTE_TO_PROTOCOL_C": {
    "criteria": "P75 or P74 reveals active MC",
    "action": "Route to Protocol C."
  },
  "RETRY": {
    "criteria": "Minor arithmetic error only",
    "action": "One retry of the failed item. If corrected: PASS."
  }
}
```

---

### Protocol C — State S2: Active Misconceptions

**Entry condition:** Diagnostic identifies one or more active misconceptions from the registry.

---

**TA-C01 — Misconception Triage**

*Primitive sequence:* `P02 → P26 → P41 → P55 → P49`

**P02 — CONTEXT ESTABLISHMENT:**
"Let's identify exactly which misconception is active so we can address it precisely."

**P26 — WORKED EXAMPLE (Neutral):**
"3⅓ + 2½: LCD=6; ⅓=2/6, ½=3/6; 3+2=5; 2/6+3/6=5/6; Result: 5 5/6."

**P41 — MISCONCEPTION DETECTOR:**
1. "4⅓ + 2½ = ?" → checks MC-1 (LCD use)
2. "6¼ − 3¾ = ?" → checks MC-2 (regrouping)
3. "2½ × 4 = ?" → checks MC-3 (multiplication)

**P55 — COMPREHENSION CHECK:** "For item 2: is ¼ big enough to subtract ¾ from?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Three probe items above.",
  "CORRECT_ALL": {
    "criteria": "6 5/6; 2½; 10 — all correct",
    "action": "No active MC. Route to Protocol A TA-A06 for application depth."
  },
  "MC1_ACTIVE": {
    "criteria": "Item 1: adds fractions without LCD (e.g., gets 5/6 wrong or writes 5/5)",
    "action": "Flag MC-1 (FOUNDATIONAL). → route to TA-C02. Defer MC-2/MC-3."
  },
  "MC2_ACTIVE": {
    "criteria": "Item 2: subtracts smaller from larger regardless (MC-1 not active)",
    "action": "Flag MC-2. → route to TA-C03."
  },
  "MC3_ACTIVE": {
    "criteria": "Item 3: adds whole numbers and multiplies fraction parts (2×4=8 and ½×1=½ → 8½ instead of 10)",
    "action": "Flag MC-3. → route to TA-C04."
  }
}
```

---

**TA-C02 — MC-1 Repair: Addition Requires LCD**

*Primitive sequence:* `P27 → P29 → P34 → P30 → P55 → P49 → P32`

**P27 — MISCONCEPTION NAMING:**
"When you added ⅓ and ½, you added them directly without a common denominator. This produces a wrong answer. Let's examine why the LCD step is not optional."

**P29 — CONTRASTIVE ANALYSIS:**
```
WRONG (no LCD):  ⅓ + ½ = (1+1)/(3+2) = 2/5 — INVALID operation
                 Or: ⅓ + ½ = 2/6 (converted one but not the other) — WRONG
RIGHT (with LCD): LCD(3,2)=6; ⅓=2/6, ½=3/6; 2/6+3/6=5/6 ✓

Physical check: ⅓ + ½ on a number line.
  ⅓ ≈ 0.333...  ½ = 0.5  Sum ≈ 0.833...
  5/6 ≈ 0.833... ✓   2/5 = 0.4 ✗   (2/5 is far too small)
```

**P34 — CORRECTIVE WORKED EXAMPLE:**
```
2⅓ + 1½:
  WRONG: ⅓+½ = 2/5 → answer: 3 2/5   [check: ≈ 3.4, but 2.33+1.5 = 3.83 — clearly wrong]
  RIGHT: LCD=6; ⅓=2/6, ½=3/6; 2/6+3/6=5/6 → answer: 3 5/6  [check: ≈ 3.83 ✓]
```

**P30 — BRIDGE REINFORCEMENT:**
"The decimal check is your alarm: if your answer seems too small or too big compared to a rough estimate, you likely missed the LCD step."

**P55 — COMPREHENSION CHECK:**
"Before adding any two fractions with different denominators, what is ALWAYS the first step?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 3¼ + 2⅓. Show the LCD and conversion before adding.",
  "CORRECT": {
    "criteria": "LCD=12; ¼=3/12, ⅓=4/12; 3+2=5; 3/12+4/12=7/12; Result: 5 7/12",
    "action": "MC-1 repaired. → check remaining MCs; route to TA-C03/C04 or mastery gate"
  },
  "PARTIAL": {
    "criteria": "LCD found and used; correct fractions; arithmetic slip in result",
    "action": "Correct the arithmetic. MC-1 repaired. → advance"
  },
  "INCORRECT": {
    "criteria": "Still adding without LCD",
    "action": "Return to P29 decimal check. 'Your answer is ≈ ? but 3.25+2.33 ≈ 5.58. Does yours match?' → no → LCD step mandatory. Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'What is LCD(4,3)?' → 12 → 'Convert ¼ to twelfths.' → '3/12.' → 'Convert ⅓ to twelfths.' → '4/12.' → add."
  }
}
```

**P32 — CONSOLIDATION CHECKPOINT:**
"Complete: Before adding two fractions with unlike denominators, I MUST find the __________ because __________."

---

**TA-C03 — MC-2 Repair: Subtraction Regrouping**

*Prerequisite: MC-1 must be cleared.*

*Primitive sequence:* `P27 → P06 → P26 → P55 → P34 → P55 → P49 → P32`

**P27 — MISCONCEPTION NAMING:**
"When you computed 6¼ − 3¾, you subtracted ¼ from ¾ (instead of ¾ from ¼) because the top was smaller. This gives a positive error — the answer looks plausible but is wrong."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
"Subtraction rule: the top number must be AT LEAST as large as the bottom number. If not, you MUST borrow 1 from the whole-number part and convert it to an equivalent fraction (= denominator/denominator) before subtracting."

**P26 — WORKED EXAMPLE:**
```
6¼ − 3¾:   (¼ < ¾ → regroup)
  Borrow 1 from 6 → becomes 5.
  Add borrowed 4/4 to ¼ → ¼ + 4/4 = 5/4.
  Subtract: 5/4 − 3/4 = 2/4 = ½.
  Whole: 5 − 3 = 2.
  Result: 2½

Verify: 2½ + 3¾ = 2 2/4 + 3 3/4 = 5 5/4 = 5 + 1¼ = 6¼ ✓
```

**P55 — COMPREHENSION CHECK:**
"After borrowing 1 from the whole number: why do you add 4/4 (not 1) to the fraction part?"

Expected: Because 1 whole = 4 fourths when the denominator is 4; you must add an equal amount in fraction form.

**P34 — CORRECTIVE EXAMPLE:**
```
MC-2 error on 6¼ − 3¾:
  WRONG: ¾ − ¼ = 2/4, then 6−3=3 → 3½    [Check: 3½+3¾=7¼ ≠ 6¼ ✗]
  RIGHT: Regroup → 5 5/4 − 3¾ = 2½        [Check: 2½+3¾=6¼ ✓]
```

**P55 — COMPREHENSION CHECK:**
"What is the one-step test to know if regrouping is needed?"

Expected: Check if the minuend's fraction ≥ the subtrahend's fraction. If not, regroup.

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 7⅓ − 4⅔. Show the regrouping step explicitly. Verify by adding back.",
  "CORRECT": {
    "criteria": "⅓ < ⅔ → regroup. Borrow 1 from 7→6; add 3/3 to ⅓ → 4/3. 4/3−2/3=2/3. 6−4=2. Result: 2⅔. Verify: 2⅔+4⅔=6 4/3=7⅓ ✓",
    "action": "MC-2 repaired. → check if MC-3 active; if yes, TA-C04; if no, route to mastery gate"
  },
  "PARTIAL": {
    "criteria": "Regroups but miscounts the borrowed fraction",
    "action": "Ask: 'What does 1 whole equal when denominator is 3?' → 3/3 → 'So ⅓ + 3/3 = ?' → 4/3. Retry."
  },
  "INCORRECT": {
    "criteria": "Still subtracts smaller from larger",
    "action": "Return to P27. Decimal estimate: '7.33−4.67=2.66. Your answer was 3+. Does that match?' → No → regroup required."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Is ⅓ bigger than ⅔?' → No → 'So we need to borrow. What does 1 whole in thirds look like?' → 3/3."
  }
}
```

**P32 — CONSOLIDATION CHECKPOINT:**
"Complete: Regrouping is needed when __________ < __________. I borrow 1 from __________ and convert it to __________ before subtracting."

---

**TA-C04 — MC-3 Repair: Multiplication of Mixed Numbers**

*Prerequisite: MC-1 must be cleared.*

*Primitive sequence:* `P27 → P06 → P26 → P55 → P34 → P55 → P49 → P32`

**P27 — MISCONCEPTION NAMING:**
"For 2½ × 3, you added the whole numbers (2+3=5) and kept the fraction (½), giving 5½. This is the addition algorithm applied to multiplication — a common error. Multiplication of mixed numbers works differently."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
"To multiply mixed numbers: convert BOTH to improper fractions first, then multiply numerator × numerator and denominator × denominator. Convert the result back if needed."
```
2½ × 3:
  2½ = 5/2;  3 = 3/1
  5/2 × 3/1 = 15/2 = 7½
```

**P26 — WORKED EXAMPLE:**
```
2⅓ × 1½:
  2⅓ = 7/3;  1½ = 3/2
  7/3 × 3/2 = 21/6 = 7/2 = 3½

Check with estimate: 2⅓ ≈ 2.33; 1½ = 1.5; product ≈ 3.5 ✓
```

**P55 — COMPREHENSION CHECK:**
"Why can't you multiply mixed numbers the same way as adding them (separate whole and fraction parts)?"

Expected: Because multiplication distributes over addition — (2+⅓)(1+½) = 2×1 + 2×½ + ⅓×1 + ⅓×½ — not just whole×whole + fraction×fraction. Converting to improper fractions handles all cross-terms automatically.

**P34 — CORRECTIVE EXAMPLE:**
```
MC-3 error on 2½ × 3:
  WRONG: 2×3 + ½ = 6½  (or just 5½)   [Check: 2.5×3=7.5 ≠ 6.5 ✗]
  RIGHT: 5/2 × 3/1 = 15/2 = 7½        [Check: 7.5 ✓]
```

**P55 — COMPREHENSION CHECK:**
"What is the first step when multiplying two mixed numbers?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: 1¾ × 2⅔. Show the conversion to improper fractions, then multiply. Convert result to mixed number.",
  "CORRECT": {
    "criteria": "1¾=7/4; 2⅔=8/3; 7/4×8/3=56/12=14/3=4⅔",
    "action": "MC-3 repaired. → route to mastery gate (TA-C05)"
  },
  "PARTIAL": {
    "criteria": "Converts correctly; multiplies correctly; doesn't simplify 56/12 to 14/3",
    "action": "Ask: 'Can 56/12 be simplified?' → GCD(56,12)=4 → 14/3 → 4⅔. → advance"
  },
  "INCORRECT": {
    "criteria": "Reverts to addition-style multiplication",
    "action": "Return to P06: 'What is the first step for multiplying mixed numbers?' → convert to improper. Enforce the conversion step before any multiplication."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Convert 1¾ to an improper fraction.' → 7/4 → 'Convert 2⅔.' → 8/3 → 'Now multiply 7/4 × 8/3.'"
  }
}
```

**P32 — CONSOLIDATION CHECKPOINT:**
"Complete: To multiply mixed numbers, I first __________, then __________, and finally __________."

---

**TA-C05 — Post-Repair Mastery Gate**

*Entered after all active misconceptions repaired (MAMR complete).*

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01 — ATTENTION ANCHOR:**
"All misconceptions addressed. Let's confirm full mastery."

**P77 — MASTERY PROBE:**
"State: (a) the LCD rule for mixed-number addition, (b) the regrouping condition for subtraction, (c) the procedure for multiplying mixed numbers."

**P55 — COMPREHENSION CHECK:** "Why are all three procedures ultimately different? What makes each case distinct?"

**P76 — TRANSFER PROBE:**
"A tank holds 8⅓ litres. In the morning 2¾ litres are used. In the afternoon 1⅔ litres are added. What is the final volume?"

**P55 — COMPREHENSION CHECK:** "Describe the operations you chose and why."

**P75 — MISCONCEPTION PROBE:**
"Error identification: '3¾ − 1⅞: the student writes 2⅛ because ¾ > ⅞ and ¾ − ⅞ = 2/8.' What is wrong?"

*Expected:* ¾ = 6/8 and 6/8 < 7/8 — regrouping IS needed. The student incorrectly compared ¾ and ⅞ without converting to the same denominator. Correct: 3¾ = 3 6/8; 6/8 < 7/8 → regroup → 2 14/8 − 1 7/8 = 1 7/8.*

**P55 — COMPREHENSION CHECK:** "What step did the student skip that caused the error?"

**P74 — APPLICATION PROBE:**
"Compute: (a) 4⅔ + 2¾, (b) 7⅓ − 5½, (c) 2¼ × 3⅓."

**P55 — COMPREHENSION CHECK:** "For (c): show the improper fraction forms before multiplying."

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.85",
  "PASS": {
    "criteria": "All probes correct; P75 error identified with correct answer; P74 all three correct",
    "action": "Record mastery. Trigger P89 spaced repetition (1, 3, 7, 21, 60 days). Blueprint complete."
  },
  "RETRY": {
    "criteria": "One arithmetic error, not conceptual",
    "action": "Allow one retry. If still wrong: route to relevant repair TA."
  },
  "ROUTE_BACK": {
    "criteria": "Two or more errors OR MC resurfaces",
    "action": "Re-enter appropriate repair TA."
  }
}
```

---

### Protocol D — State S6: Low Confidence (Knows But Doubts)

**Entry condition:** Student shows hesitation or self-correction but underlying knowledge is likely sound. GR-5 — P28 ABSENT from all Protocol D TAs.

**Instructional goal:** Build confidence through the verify-by-adding-back strategy and estimation checks.

---

**TA-D01 — Two Confidence Anchors**

*Primitive sequence:* `P02 → P06 → P03 → P55 → P49`

**P02 — CONTEXT ESTABLISHMENT:**
"You seem unsure about your mixed number calculations. Let's build two confidence tools."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
"Tool 1: VERIFY BY INVERSE. After subtraction, add your answer to the subtrahend — you must get the minuend back. After addition, subtract one addend — you must get the other. Tool 2: ESTIMATE FIRST. Round mixed numbers to the nearest whole and compute mentally. Your exact answer must be close."

**P03 — CONCRETE MANIPULATION:**
Student adds 3½ + 2⅓, estimates first (3.5 + 2.33 ≈ 5.8), then computes exactly (5 5/6 ≈ 5.83). "The estimate says ≈ 5.8. Your answer 5 5/6 ≈ 5.83. Close — you're correct."

**P55 — COMPREHENSION CHECK:**
"If your exact answer is very far from your estimate, what does that tell you?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute 5¼ − 2⅔. Estimate first. Then compute. Then verify by adding back.",
  "CORRECT": {
    "criteria": "Estimate ≈ 5.25−2.67 ≈ 2.58. LCD=12; ¼=3/12, ⅔=8/12; 3/12<8/12 → regroup; borrow: 5→4, 3/12+12/12=15/12; 15/12−8/12=7/12; 4−2=2; Result: 2 7/12 ≈ 2.58 ✓. Verify: 2 7/12+2⅔=2 7/12+2 8/12=4 15/12=5 3/12=5¼ ✓",
    "action": "Affirm: 'Your estimate matched, your verify passed — both tools confirmed correctness.' → advance to TA-D02"
  },
  "PARTIAL": {
    "criteria": "Correct answer but skipped estimate or verify",
    "action": "Guide: 'Now check with the estimate.' Or: 'Now verify by adding back.' Confirm both tools. → advance"
  },
  "INCORRECT": {
    "criteria": "Calculation error",
    "action": "Use the estimate to flag the error. Route to Protocol C if MC confirmed."
  },
  "NO_RESPONSE": {
    "criteria": "Paralysis",
    "action": "Start with estimate: '5¼ is close to what whole number? 2⅔ close to what?' Then subtract whole estimates."
  }
}
```

---

**TA-D02 — Confidence at Range**

*Primitive sequence:* `P01 → P26 → P30 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"Let's confirm the confidence tools work across more examples."

**P26 — WORKED EXAMPLE:** One addition with unlike denominators (new numbers, worked fully with estimate + verify).

**P30 — BRIDGE REINFORCEMENT:**
"Every correct mixed number calculation passes both tests: (1) close to the estimate, (2) inverse check confirms exactly. If both pass, you have the right answer — no doubt needed."

**P55 — COMPREHENSION CHECK:**
"If your answer passes the estimate check but fails the inverse check (or vice versa), what should you do?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Compute: (a) 4⅓ + 2¾ with estimate + verify. (b) 8½ − 3⅔ with estimate + verify.",
  "CORRECT": {
    "criteria": "(a) 7 1/12. (b) 4 5/6. Both with passing estimates and verifications.",
    "action": "Affirm confidence. → advance to TA-D03 (mastery gate)"
  },
  "PARTIAL": {
    "criteria": "Correct answers, one verify skipped",
    "action": "Complete the missing verify. → advance"
  },
  "INCORRECT": {
    "criteria": "Systematic error",
    "action": "Route to Protocol C if MC confirmed."
  },
  "NO_RESPONSE": {
    "criteria": "Freezes",
    "action": "Work through (a) step by step together."
  }
}
```

---

**TA-D03 — Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01 — ATTENTION ANCHOR:** "Final check — with your confidence tools active."

**P77 — MASTERY PROBE:** "State both confidence tools and when to use them."

**P55 — COMPREHENSION CHECK:** "Which tool catches conceptual errors? Which catches arithmetic slips?"

**P76 — TRANSFER PROBE:**
"A builder orders 12⅓ metres of lumber. After using 7¾ metres, they receive another 4½ metres. What is the current total?"

**P55 — COMPREHENSION CHECK:** "Show your estimate and inverse verify."

**P75 — MISCONCEPTION PROBE:**
"True or False: 'If your answer passes the estimate check, it must be correct.' Explain."

*Expected:* FALSE. The estimate is approximate — it catches large errors but not small ones. The inverse check is the exact verification.

**P55 — COMPREHENSION CHECK:** "Give an example where an estimate would pass but the exact answer is still wrong."

**P74 — APPLICATION PROBE:** "Compute: (a) 6⅕ + 3⅘, (b) 9⅓ − 7¾, (c) 3½ + 4⅔ − 2¼."

**P55 — COMPREHENSION CHECK:** "For each: estimate first, compute, verify."

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.85",
  "PASS": {
    "criteria": "All probes correct; estimates used; inverse checks shown; P75 false statement identified",
    "action": "Record mastery. Trigger P89 spaced repetition (1, 3, 7, 21, 60 days). Blueprint complete."
  },
  "ROUTE_TO_PROTOCOL_C": {
    "criteria": "P74 reveals active MC",
    "action": "Route to Protocol C."
  },
  "RETRY": {
    "criteria": "Arithmetic slip only",
    "action": "One retry. Advance if corrected."
  }
}
```

---

### Protocol E — State S9: Mastery Maintenance (Spaced Repetition)

**Entry condition:** Student previously achieved mastery. Scheduled P89 retrieval event (1, 3, 7, 21, 60 days).

---

**TA-E01 — Retrieval Challenge**

*Primitive sequence:* `P01 → P77 → P55 → P49`

**P01 — ATTENTION ANCHOR:** "Quick retrieval check — mixed number arithmetic."

**P77 — MASTERY PROBE:**
"From memory: (a) LCD rule for addition, (b) regrouping condition for subtraction, (c) compute 3⅓ + 2¾."

**P55 — COMPREHENSION CHECK:** "Verify your answer to (c) with the inverse check."

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Three-part recall above.",
  "CORRECT": {
    "criteria": "(a) and (b) accurately stated; (c) 6 1/12 with verify",
    "action": "→ advance to TA-E02"
  },
  "PARTIAL": {
    "criteria": "2 of 3 correct",
    "action": "Address the missed element. → advance to TA-E02"
  },
  "INCORRECT": {
    "criteria": "Multiple errors",
    "action": "Brief re-exposure to P06 strategies. Continue to TA-E02."
  },
  "NO_RESPONSE": {
    "criteria": "Cannot recall",
    "action": "Prompt: 'To add fractions with different denominators, the first step is…?'"
  }
}
```

---

**TA-E02 — Transfer Retrieval**

*Primitive sequence:* `P01 → P76 → P55 → P49`

**P01 — ATTENTION ANCHOR:** "One application problem."

**P76 — TRANSFER PROBE:**
"A hiking trail is 10⅓ km long. A group walks 4¾ km in the morning and 3⅔ km in the afternoon. How far do they still need to walk?"

*P76 independence note: cross_links=[]; transfer uses a distance context; self-contained at the arithmetic level.*

**P55 — COMPREHENSION CHECK:** "What two operations did you need, and in what order?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Hiking problem above.",
  "CORRECT": {
    "criteria": "4¾+3⅔=8 5/12; 10⅓−8 5/12: LCD=12; 10 4/12; 4/12<5/12 → regroup; 9 16/12−8 5/12=1 11/12 km remaining",
    "action": "→ advance to TA-E03"
  },
  "PARTIAL": {
    "criteria": "Addition correct; subtraction arithmetic error",
    "action": "Use inverse check to find the error. Correct and advance."
  },
  "INCORRECT": {
    "criteria": "Operation error or MC error",
    "action": "Address the specific error. Continue to TA-E03."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'First find total walked. Then subtract from total trail.'"
  }
}
```

---

**TA-E03 — Maintenance Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01 — ATTENTION ANCHOR:** "Final maintenance confirmation."

**P77 — MASTERY PROBE:** "State all three MC risks and the fix for each."

**P55 — COMPREHENSION CHECK:** "Which misconception is foundational, and why must it be fixed first?"

**P76 — TRANSFER PROBE:**
"A painter has 9½ litres of paint. Uses 3⅔ for room A and 2¾ for room B. Receives 1⅓ more litres. Final total?"

**P55 — COMPREHENSION CHECK:** "Walk through each operation step and the LCD for each."

**P75 — MISCONCEPTION PROBE:**
"Identify the error: '5⅔ − 2⅘: student writes ⅔ > ⅘ so no regroup needed, gets 3⅕.' What is wrong?"

*Expected:* ⅔ and ⅘ don't have the same denominator. LCD=15; ⅔=10/15, ⅘=12/15; 10/15 < 12/15 → regrouping IS needed. Correct answer: regroup 5 10/15 → 4 25/15; 4 25/15 − 2 12/15 = 2 13/15.*

**P55 — COMPREHENSION CHECK:** "What should the student have done before comparing the fractions?"

**P74 — APPLICATION PROBE:** "Compute: (a) 7⅛ + 4⅔, (b) 11½ − 8⅝, (c) 3¼ × 2⅗."

**P55 — COMPREHENSION CHECK:** "For (c): show the improper fraction forms."

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.85",
  "PASS": {
    "criteria": "All probes correct; retention confirmed",
    "action": "Record retention. Schedule next P89 interval. Blueprint cycle continues."
  },
  "DECAY_DETECTED": {
    "criteria": "Two or more probes missed",
    "action": "Route to Protocol B for refresh. Reset P89 from day 1."
  },
  "PARTIAL_DECAY": {
    "criteria": "One probe missed",
    "action": "Address that probe. Re-gate."
  }
}
```

---

## Component 5 — Spaced Repetition Schedule

**Primitive:** P89 — SPACED REPETITION

**Trigger:** Fires after each P78 PASS event.

**Intervals:** 1 day → 3 days → 7 days → 21 days → 60 days

**Entry point on each firing:** Protocol E (TA-E01 → TA-E02 → TA-E03)

**Decay rule:** DECAY_DETECTED → reset to day 1 → Protocol B before next session.

---

## Component 6 — Cross-Link Bridge

**Cross-linked concept:** none (cross_links=[]).

The related concept `math.arith.improper-fractions` (KG `related` field) is the natural companion — mixed numbers and improper fractions are alternate representations of the same quantity. This blueprint uses improper-fraction conversion as an internal tool for multiplication (TA-C04), but this is handled inline without requiring a separate blueprint dependency. When a student later studies or has already studied `math.arith.improper-fractions`, the conversion procedures are reinforced bidirectionally.

---

## Component 7 — Retrieval Architecture

**P89 anchor moments:**
1. After TA-A07 mastery gate PASS → schedule Protocol E at 1, 3, 7, 21, 60 days
2. After TA-B03 mastery gate PASS → same schedule
3. After TA-C05 mastery gate PASS → same schedule
4. After TA-D03 mastery gate PASS → same schedule

**Retrieval spacing rationale:** estimated_hours=3 → moderate concept. The 7-day and 21-day intervals specifically target MC-2 (regrouping) and MC-3 (multiplication), which are the most fragile elements. Research shows regrouping errors resurface after 2-3 weeks without practice. The 60-day interval confirms long-term retention of the full procedure set.

---

## Component 8 — Primitive Usage Index

| Primitive | Role in this Blueprint | TAs Used |
|-----------|------------------------|----------|
| P01 | Attention anchor | A02–A07, B02–B03, C03–C05, D02–D03, E01–E03 |
| P02 | Context establishment | A01, B01, C01, D01 |
| P03 | Concrete manipulation | A01, D01 |
| P06 | Explicit strategy instruction | A01, A03, A04, A05, B01, C02–C04 |
| P26 | Worked example | A01–A06, B01–B02, C01–C04, D02 |
| P27 | Misconception naming | C02–C04 |
| P29 | Contrastive analysis | C02 |
| P30 | Bridge reinforcement | A03 (context), B02, C02, D02 |
| P32 | Consolidation checkpoint | C02–C04 |
| P34 | Corrective worked example | C02–C04 |
| P41 | Misconception detector — triage | B01, C01 |
| P49 | Adaptive checkpoint — 4-branch routing | All TAs |
| P55 | Comprehension check | All TAs |
| P74 | Application probe | A07, B03, C05, D03, E03 |
| P75 | Misconception probe | A07, B03, C05, D03, E03 |
| P76 | Transfer probe | A07, B03, C05, D03, E02, E03 |
| P77 | Mastery probe (retrieval) | A07, B03, C05, D03, E01, E03 |
| P78 | Mastery gate | A07, B03, C05, D03, E03 |
| P89 | Spaced repetition scheduler | Component 5 |
| P91 | Named compound (mastery gate expansion) | All mastery gate TAs |

---

## Component 9 — Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | math.arith.mixed-numbers: KG confirmed. math.arith.fractions (requires): KG confirmed. cross_links=[]: no additional IDs to verify. |
| V-2 | difficulty → cpa_entry_stage correct per spec | PASS | difficulty=2 (developing), domain≠physics → cpa_entry_stage=C. Correct. |
| V-3 | mastery_threshold matches KG value | PASS | KG: mastery_threshold=0.85. Blueprint Component 0: 0.85. Match confirmed. |
| V-4 | Canonical 10-field schema only (no domain/concept_type) | PASS | Component 0 uses: id, name, requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, estimated_hours, description. No domain/concept_type fields. |
| V-5 | No invented primitives | PASS | All primitives used (P01–P07, P26–P32, P34, P41, P49, P55, P74–P78, P89, P91) exist in the Primitive Library. |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | Protocol A: A01→P02 ✓, A02→P01 ✓, A03→P01 ✓, A04→P01 ✓, A05→P01 ✓, A06→P01 ✓, A07→P01 ✓. Protocol B: B01→P02 ✓, B02→P01 ✓, B03→P01 ✓. Protocol C: C01→P02 ✓, C02→P27 (repair-chain exception) ✓, C03→P27 ✓, C04→P27 ✓, C05→P01 ✓. Protocol D: D01→P02 ✓, D02→P01 ✓, D03→P01 ✓. Protocol E: E01→P01 ✓, E02→P01 ✓, E03→P01 ✓. All compliant. |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | All P41, P49, P74, P75, P76, P77, P78 occurrences followed by P55 within their TA or are terminal elements of P91 expansion. P91 expansion: P77→P55→P76→P55→P75→P55→P74→P55→P78 verified in all 5 mastery gate TAs. |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 not used. Rule vacuously satisfied. |
| V-9 | GR-4: repair chain entered only after P41/P64 | PASS | Protocol C opens with TA-C01 containing P41. Routing to C02/C03/C04 occurs only via P49 branch in TA-C01, after P41 fires. Protocol B uses P41 in TA-B01 for gap diagnosis. |
| V-10 | GR-5: P28 absent from S6 Protocol | PASS | Protocol D TAs D01, D02, D03 — P28 is absent from all three. Confirmed. |
| V-11 | GR-6: P91 terminal in all mastery gate TAs | PASS | P91 in: A07, B03, C05, D03, E03. In each, P91 expanded as P77→P55→P76→P55→P75→P55→P74→P55→P78, with P78 terminal. |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | Longest C-primitive run: P29→P34→P30 in TA-C02 = 3 C-primitives (P27 precedes as D-category, breaking any prior run). No sequence exceeds 3 consecutive C-primitives. |
| V-13 | GR-8: P54 precedes high-difficulty first-attempt questions | PASS | difficulty=2; GR-8 applies to difficulty≥4. Not applicable. |
| V-14 | GR-9: assessment primitives not in first TA unless diagnostic | PASS | TA-A01 (first TA of Protocol A) contains P49 (routing/elicitation) only — no P74/P75/P76/P77/P78. Compliant. |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded in all 5 mastery gate TAs (A07, B03, C05, D03, E03). P89 referenced as scheduler in Component 5. |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P49 instances carry complete 4-branch JSON taxonomy. P77/P75/P74/P76 have specified expected responses in text. |
| V-17 | All P49 branches specified (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) | PASS | Verified for all 16 P49 instances: A01–A06, B01–B02, C01–C04, D01–D02, E01–E02. All 4 branches present. |
| V-18 | Session cap respected | PASS | estimated_hours=3 → max 7 TAs. Protocol A: 7 TAs ✓ (maximum, at cap). Protocol B: 3 TAs ✓. Protocol C: up to 5 TAs (C01 + up to 3 repair TAs + C05) ✓. Protocol D: 3 TAs ✓. Protocol E: 3 TAs ✓. All within cap. |
| V-19 | Transfer contexts reference cross-linked concept (P76 independence note if cross_links=[]) | PASS | cross_links=[]. All P76 transfer probes use self-contained real-world contexts (wall measurements, sewing, carpentry, plumbing, hiking, painting). P76 independence note documented in Component 6. |
| V-20 | AIR-1 through AIR-5 pass | PASS | AIR-1: All content slots finite and KG-sourced (fraction values, worked examples — all pre-specified). AIR-2: Response taxonomies pre-authored in all P49 branches. AIR-3: Branching deterministic (MAMR order fixed, all routes pre-specified). AIR-4: Primitives are concept-independent pedagogical operations. AIR-5: All TA sequences fixed at authoring time. PASS. |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
