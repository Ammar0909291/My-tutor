# TEACHING BLUEPRINT — math.alg.equation

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | math.alg.equation |
| concept_name | Equation |
| domain | algebra |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.90 |
| CPA_ENTRY | C |
| MAMR | MC-1 FOUNDATIONAL cleared first; secondary MCs FIFO after |
| session_ta_cap | max 7 conditional repair TAs (≥1h session) |

**PASS CRITERION:** ⌈0.90 × 5⌉ = 5/5 (P77 items=4, P76 item=1)

**prerequisites:** [math.alg.expression]
**unlocks:** [math.alg.linear-equation-1var, math.alg.inequality]
**cross_links:** [] — none

---

## Component 1 — Cognitive Map

**Core concept:** An equation is a statement asserting that two algebraic expressions are equal, written with an = sign between them. Unlike an expression (which is evaluated), an equation is solved — finding all values of the variable(s) that make the statement true. A solution is a value that, when substituted, produces a true equality. Equations may have one solution, no solutions, or infinitely many solutions.

**Knowledge prerequisites activated:**
- math.alg.expression: the left-hand side (LHS) and right-hand side (RHS) of an equation are each algebraic expressions

**Concept structure:**
1. **Structure**: LHS = RHS — two expressions connected by the = sign
2. **Solving vs. evaluating**: equations are solved (find variable values making LHS=RHS true); expressions are evaluated (substitute a specific value to get a number)
3. **Solution verification**: substitute the candidate value into both sides; if LHS=RHS, it is a solution
4. **Solution counts**: one unique solution (most linear equations), no solution (contradiction), infinitely many (identity)

**Target understanding:** The learner distinguishes an equation from an expression, verifies whether a given value is a solution by substitution, understands that the goal of solving is finding values that make the equality true, and recognises that not every equation has exactly one solution.

---

## Component 2 — Misconception Registry

| ID | Name | Trigger Signature | Error Pattern | Repair TA |
|---|---|---|---|---|
| MC-1 | EQUATION-IS-EXPRESSION | Shown 2x+3=7; asked what to do with it | Evaluates or simplifies as if no = sign exists; treats it as an expression to compute rather than a statement to satisfy | B01 |
| MC-2 | SOLVING-MEANS-SIMPLIFYING | Working on 2x+3=7 | Simplifies to 2x=4 then stops; does not isolate the variable to x=2; confuses "simplified form" with "solved" | B02 |
| MC-3 | SOLUTION-IS-UNIQUE-ALWAYS | Asked about x+3=x+3 or x+1=x | Insists every equation must have exactly one solution; cannot process no-solution or all-values cases | B03 |

**FOUNDATIONAL MC:** MC-1 (EQUATION-IS-EXPRESSION) — the = sign is what transforms an expression into a statement requiring a solution; this must be established before any solving concept can land.

---

## Component 3 — Scaffolding Protocol

**CPA Entry Stage:** C — Concrete
Balance-scale model: an equation is a balanced scale. Each side holds weights (expressions). Solving means finding the unknown weight that keeps the scale balanced.

**Progression Gate (C → P):** Learner can identify LHS and RHS of a given equation and correctly substitute a value to verify or refute it as a solution.
**Progression Gate (P → A):** Learner distinguishes expression from equation by the = sign, verifies solutions by substitution, and states how many solutions a given simple equation has.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — The Balance Scale: Equations as Balanced Claims (GR-1: P03 | GR-2: P49)

**P03 ANALOGY BRIDGE**

Source domain: A balance scale — two pans must hold equal weight. If you know weights on one pan, you look for the weight on the other pan that keeps it level.
Target domain: Equation — LHS and RHS are the two pans. Solving finds the variable value that keeps the scale balanced (LHS = RHS).
Mapping: left pan ↔ LHS; right pan ↔ RHS; balanced ↔ equation true; unbalanced ↔ equation false; unknown weight ↔ variable value

"2x+3=7: the left pan holds '2x+3' worth of weight; the right holds '7'. We need to find x so the scale balances. When x=2: 2(2)+3=7 ✓ — balanced."

Concrete verification:
```
Equation: 3x − 1 = 8

Test x = 3:
  LHS: 3(3)−1 = 9−1 = 8
  RHS: 8
  LHS = RHS ✓ → x=3 IS a solution

Test x = 2:
  LHS: 3(2)−1 = 6−1 = 5
  RHS: 8
  LHS ≠ RHS ✗ → x=2 is NOT a solution
```

**P49 ADAPTIVE CHECKPOINT**
Q: "Verify whether x=4 is a solution of 2x−3=5. Show LHS and RHS separately."
→ CORRECT [LHS=2(4)−3=5; RHS=5; LHS=RHS ✓; YES]: "Correct — x=4 is a solution." → TA-A02
→ PARTIAL [gets correct answer but doesn't separate LHS/RHS]: "Write LHS and RHS on separate lines." → re-prompt
→ INCORRECT [evaluates 2x−3=5 as an expression]: Flag MC-1. Route → B01
→ NO_RESPONSE: "Replace x with 4 on the left: 2(4)−3=?" → guided scaffold

---

### TA-A02 — Equation vs. Expression; LHS, RHS, and the = Sign (GR-1: P11 | GR-2: P49)

**P11 REPRESENTATION SHIFT**

Three representations of related algebra:

| Object | Example | = sign? | Action taken |
|---|---|---|---|
| Expression | 2x+3 | NO | Evaluate (substitute, compute) |
| Equation | 2x+3=7 | YES | Solve (find x making LHS=RHS) |
| Identity | 2(x+1)=2x+2 | YES (≡) | True for all x; no specific solution to find |

Anatomy of an equation:
```
2x + 3  =  7
 └─────┘  └─┘
   LHS     RHS
   (left-hand side)  (right-hand side)
   ↑
   = sign is the boundary and the claim
```

Reading: "2x+3 equals 7" is a claim. Solving asks: for which values of x is this claim true?

Verification method (substitution):
1. Choose a candidate value for x.
2. Compute LHS and RHS separately.
3. If LHS=RHS: the candidate is a solution. If LHS≠RHS: it is not.

**P49 ADAPTIVE CHECKPOINT**
Q: "Label LHS and RHS in 5y−2=3y+6. Then verify whether y=4 is a solution."
→ CORRECT [LHS=5y−2; RHS=3y+6; y=4: 18≠18... wait: 5(4)−2=18, 3(4)+6=18 ✓ — yes, solution]: "Correct — y=4 solves it." → TA-A03
→ PARTIAL [identifies LHS/RHS but skips verification]: "Substitute y=4 into each side." → re-prompt
→ INCORRECT [treats as expression]: Flag MC-1. Route → B01
→ NO_RESPONSE: Walk through the anatomy diagram; then ask: "Left side of = in 5y−2=3y+6 is?" → guided

---

### TA-A03 — Solving vs. Simplifying; The Goal of Solving (GR-1: P06 | GR-2: P49)

**P06 CONTRAST PAIR**

*Case A — Simplifying an equation (not finished):*
```
2x + 3 = 7
Subtract 3:   2x = 4   ← simplified, but not solved
```
2x=4 is still an equation with a variable. We have not yet found what x equals.

*Case B — Solving the equation (finding the value):*
```
2x + 3 = 7
Subtract 3:   2x = 4
Divide by 2:  x = 2    ← SOLVED: x=2 is the unique solution
```
Solving means arriving at "x = [number]" — the variable is isolated.

Distinction in words:
- "Simplify" → make the equation look simpler (combine like terms, collect constants)
- "Solve" → find the specific value(s) of x that make the equation true

Solving is not finished until the variable is alone on one side.

**P49 ADAPTIVE CHECKPOINT**
Q: "Is the work complete? 3x+6=15 → 3x=9. What step remains, and what is the solution?"
→ CORRECT [not complete; divide both sides by 3: x=3]: "Correct — 3x=9 is simplified, not solved. x=3 is the solution." → TA-A04
→ INCORRECT [says '3x=9 is the solution']: Flag MC-2. Route → B02
→ NO_RESPONSE: "3x=9 means 3 times something equals 9. What is that something?" → guided

---

### TA-A04 — One Solution, No Solution, Infinitely Many (GR-1: P04 | GR-2: P49)

**P04 PATTERN INDUCTION**

Observe three equation types:

*Type 1 — One unique solution:*
```
2x = 6  →  x = 3  (one value works; verified: 2(3)=6 ✓)
```

*Type 2 — No solution (contradiction):*
```
x + 1 = x + 3
Subtract x: 1 = 3  ← false for all x
No value of x makes this true → no solution
```

*Type 3 — Infinitely many solutions (identity):*
```
x + 3 = x + 3
Subtract x: 3 = 3  ← true for all x
Every value of x is a solution → infinitely many solutions
```

General rule: when simplification produces:
- "x = number" → one unique solution
- "false statement (a=b, a≠b)" → no solution
- "true statement (a=a)" → infinitely many solutions

**P49 ADAPTIVE CHECKPOINT**
Q: "How many solutions does x+3=x+3 have? Justify by simplifying."
→ CORRECT [subtract x from both sides: 3=3, always true → infinitely many solutions]: "Correct." → TA-A05
→ INCORRECT [says 'one — x=0' or 'no solution']: Flag MC-3. Route → B03
→ NO_RESPONSE: "Subtract x from both sides of x+3=x+3. What remains?" → guided

---

### TA-A05 — Mastery Gate (GR-3: P91 terminal | GR-6: P91 in this TA only | GR-7: P76)

**P91 NAMED COMPOUND: P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78**

---

**P77 MULTI-PROBLEM SET**

1. **Is 3x−4=11 an equation?** What would solving it mean?
   *(Expected: YES — an equation has an = sign; solving means finding x so that 3x−4=11)*

2. **Verify that x=5 is a solution of 3x−4=11.** Show LHS and RHS.
   *(Expected: LHS=3(5)−4=15−4=11; RHS=11; LHS=RHS ✓; YES, x=5 is a solution)*

3. **True/False:** Every equation has exactly one solution.
   *(Expected: FALSE — some have zero solutions (e.g., x=x+1), some have infinitely many (e.g., x+2=x+2))*

4. **How many solutions does x+3=x+3 have?** Show the simplification step.
   *(Expected: subtract x: 3=3, always true → infinitely many solutions)*

**P55 SCORE** (P77): ___/4

---

**P76 TRANSFER PROBE** (GR-9: independence mode — cross_links=[], novel context)

*Taxi fare context:*

"A taxi company charges a flat fee of $3 plus $2 per kilometre.

(a) Write an equation for when the total cost equals $15. Define your variable.
(b) Solve for the variable.
(c) Verify your solution by substituting back into the equation.
(d) Does this equation have one solution, no solution, or infinitely many? Why?"

*(Expected:*
*(a) Let k = kilometres; equation: 3+2k = 15*
*(b) Subtract 3: 2k=12; divide by 2: k=6*
*(c) LHS: 3+2(6)=3+12=15; RHS: 15; LHS=RHS ✓*
*(d) One unique solution — a linear equation in one variable with a non-zero coefficient of k.)*

**P55 SCORE** (P76): ___/1

---

**P75 MASTERY ASSESSMENT**
Total: P77_score + P76_score = ___/5
PASS criterion: **5/5** (threshold 0.90; ⌈0.90×5⌉ = 5)

**P55 SCORE** (total): ___/5

---

**P74 ROUTING DECISION**
→ **PASS** (5/5): → P78
→ **FAIL** (<5/5): → B01 (MAMR: clear MC-1 EQUATION-IS-EXPRESSION first; then B02 or B03 as flagged)

**P55 SCORE** (route logged): ___

---

**P78 COMPLETION**
"You can now identify an equation by its = sign, distinguish it from an expression, verify solutions by substitution, understand what solving means (isolating the variable), and recognise that equations may have one, zero, or infinitely many solutions. Linear equations in one variable build directly on this foundation."

---

## Component 5 — Protocol B (Misconception Repair)

### TA-B01 — Repair: EQUATION-IS-EXPRESSION (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"A foundational confusion: treating 2x+3=7 as an expression to simplify (e.g., computing 2x+10 or some other merge) rather than a statement to satisfy. The = sign changes everything — it makes the algebra a claim with a true/false answer for each value of x."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "What is the first thing you do with 2x+3=7?"
→ "Simplify both sides" or "combine terms" without reference to finding x: ambiguous — ask: "What is your goal?" If goal is a number not involving x: MC-1 confirmed. Continue B01.
→ "Find x so both sides are equal": MC-1 not active. Exit B01 → next flagged MC or TA-A05.

**P64 CONCEPTUAL SHIFT**
"Count the = signs. No = sign → expression (evaluate or simplify freely). Has an = sign → equation (find what makes it true).

```
2x+3         ← no = sign: expression. Evaluate at x=5 → 13.
2x+3 = 7    ← has = sign: equation. Solve: what x makes LHS=RHS?
```

The = sign is a claim ('these two things are equal') and a question ('for which x?'). An expression is a recipe; an equation is a puzzle."

**P49 ADAPTIVE CHECKPOINT**
Q: "What is the difference between '4x−1' and '4x−1=11'? What do you do with each?"
→ CORRECT [expression: evaluate (substitute a given x); equation: solve (find x making LHS=RHS)]: "Correct." Exit B01 → B02 if flagged, else TA-A05.
→ INCORRECT: Re-present the two-column table from P64. → re-prompt.

---

### TA-B02 — Repair: SOLVING-MEANS-SIMPLIFYING (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Simplifying an equation (e.g., 2x+3=7 → 2x=4) is progress toward a solution, but it is not the solution itself. Solving is finished only when the variable is isolated on one side: x = [number]."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "You reached 2x=4. Are you done? What is the solution?"
→ "Yes, the solution is 2x=4": MC-2 confirmed. Continue B02.
→ "No, I need to divide by 2 to get x=2": MC-2 not active. Exit B02 → B03 if flagged, else TA-A05.

**P64 CONCEPTUAL SHIFT**
"Solving means the variable stands alone on one side with no operations on it.

```
2x + 3 = 7         ← starting equation
2x = 4             ← simplified (still has the variable in 2x — not solved)
x = 2              ← SOLVED (x is isolated; the answer is x=2)
```

The finish line is 'x = [number]'. Every step before that is preparation, not the answer. Always ask: 'Is the variable alone?'"

**P49 ADAPTIVE CHECKPOINT**
Q: "Continue: from 3x=9, what is the final solution?"
→ CORRECT [divide by 3: x=3]: "Correct — x=3 is the solution." Exit B02 → B03 if flagged, else TA-A05.
→ INCORRECT ["3x=9 is the answer"]: "3x means 3 times x. We want x alone: 3x÷3=9÷3 → x=?" → guided.

---

### TA-B03 — Repair: SOLUTION-IS-UNIQUE-ALWAYS (GR-4: P27 + P41 + P64 | GR-2: P49)

**P27 MISCONCEPTION NAMING**
"Not every equation has exactly one solution. Some equations are contradictions (no value works) and some are identities (every value works). Recognising which case you have is part of what it means to 'solve' an equation."

**P41 MISCONCEPTION DETECTOR**
Diagnostic: "How many solutions does x+1=x+3 have?"
→ "One — I just need to find it" or tries to get a number: MC-3 confirmed. Continue B03.
→ "No solutions — subtracting x gives 1=3, which is false": MC-3 not active. Exit B03 → TA-A05.

**P64 CONCEPTUAL SHIFT**
"Simplify and watch what the variable does:

```
x+1=x+3: subtract x from both sides → 1=3   ← false; no x works → NO SOLUTION
x+3=x+3: subtract x from both sides → 3=3   ← true; every x works → INFINITELY MANY
2x=6:     divide both sides by 2    → x=3   ← specific; one x works → ONE SOLUTION
```

If you get a false number statement (like 1=3): no solution.
If you get a true number statement (like 3=3): infinitely many solutions.
If you get x = [number]: exactly one solution."

**P49 ADAPTIVE CHECKPOINT**
Q: "Simplify x+5=x+2. How many solutions does it have?"
→ CORRECT [subtract x: 5=2, false → no solution]: "Correct — contradiction, no solution." Exit B03 → TA-A05.
→ INCORRECT [tries to find a specific value]: "After subtracting x, what is left?" → guided.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Focus | Probe Type |
|---|---|---|
| Day 1 | Expression vs. equation; LHS/RHS identification | "Label LHS and RHS: 4x−1=7" |
| Day 3 | Verification by substitution | "Is x=3 a solution of 2x+1=7?" (YES: 7=7) |
| Day 7 | Solution count: one / none / infinitely many | "How many solutions: 2x=2x? x+1=x?" |
| Day 30 | Real-world equation setup and solve | Taxi fare or similar contextual equation |

---

## Component 7 — Cross-Blueprint Dependencies

**Depends on:**
- math.alg.expression (required): the LHS and RHS of every equation are algebraic expressions; the equation concept is built directly on the expression concept

**Enables:**
- math.alg.linear-equation-1var: solving linear equations in one variable — the core skill of introductory algebra; uses the solving framework established here
- math.alg.inequality: an inequality replaces = with <, >, ≤, ≥; same concept of finding values satisfying a statement

**Cross-links (GR-8):**
- (none — cross_links=[])

---

## Component 8 — Teaching Notes

1. **The = sign is the watershed:** Every teaching action should begin with "count the = signs." This single observation separates evaluation (expression) from solving (equation) and is the most high-leverage habit to build.

2. **Verification by substitution is non-negotiable:** Every solution must be verified by substituting back into the original equation. This builds the conceptual understanding (a solution makes the equation true) and catches arithmetic errors.

3. **Solution count awareness:** Many learners first encounter the idea of no-solution or all-solutions equations as a surprise. TA-A04 and TA-B03 address this proactively. Do not wait for downstream confusion in math.alg.linear-equation-1var.

4. **Solving scope:** This blueprint establishes what solving means and what a solution is. Techniques for solving (inverse operations, balancing) are the subject of math.alg.linear-equation-1var. Do not teach solving techniques here — focus on the concept.

5. **Balance-scale model limitation:** The scale model works best for equations that can be solved by balancing. For identities and no-solution cases, the simplification approach in TA-A04 is more transparent. Use both models together.

---

## Component 10 — Validation Checklist

| Rule | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG id | PASS |
| V-2 | All prerequisites have existing blueprints | PASS (math.alg.expression ✓) |
| V-3 | CPA_ENTRY = C for developing difficulty | PASS |
| V-4 | GR-1: TA-A01 opens with B-category primitive (P03) | PASS |
| V-5 | GR-2: All non-gate TAs (A01, A02, A03, A04) have P49 | PASS |
| V-6 | GR-3: Mastery gate TA-A05 is terminal | PASS |
| V-7 | GR-4: All repair TAs open with P27+P41+P64 | PASS (B01, B02, B03) |
| V-8 | GR-6: P91 compound is terminal within TA-A05 | PASS |
| V-9 | GR-7: P76 present inside mastery gate TA-A05 | PASS |
| V-10 | GR-8: cross_links documented in Component 7 (none) | PASS |
| V-11 | GR-9: cross_links=[] → P76 independence (taxi fare context) | PASS |
| V-12 | GR-10: MAMR stated in Component 0 and P74 routing | PASS |
| V-13 | PASS criterion: ⌈0.90×5⌉ = 5/5 | PASS |
| V-14 | bloom=understand → P07 not required; P06 CONTRAST PAIR used in A03 | PASS |
| V-15 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-16 | P77 has 4 items (n−1 = 4) | PASS |
| V-17 | P76 probe is novel independent context (taxi fare equation) | PASS |
| V-18 | MC-1 EQUATION-IS-EXPRESSION designated FOUNDATIONAL | PASS |
| V-19 | Three misconceptions registered (MC-1, MC-2, MC-3) | PASS |
| V-20 | Three repair TAs (B01→MC-1, B02→MC-2, B03→MC-3) | PASS |
| AIR | No AI-generated lesson content embedded; blueprint is schema and structure only | PASS |

**Blueprint Status:** PACKAGE_READY
