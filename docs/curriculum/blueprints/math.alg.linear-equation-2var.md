# Teaching Blueprint — math.alg.linear-equation-2var

## Component 0 — Metadata
concept_id: math.alg.linear-equation-2var
concept_name: Linear Equation in Two Variables
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: developing
bloom: apply
estimated_hours: 5
mastery_threshold: 0.85
CPA_entry_stage: C
requires: [math.alg.linear-equation-1var]
cross_links: [math.func.linear-function, math.geom.line-equation]
P76_mode: independence (cross_links T1 = [] — math.func.linear-function and math.geom.line-equation are not Tier 1)

---

## Component 1 — Cognitive Map

**Core concept:** A linear equation in two variables has the form ax + by = c. Unlike an equation in one variable, it has infinitely many solutions — each solution is an ordered pair (x, y). The complete solution set forms a straight line in the coordinate plane. Verifying a solution requires checking that BOTH x and y satisfy the equation simultaneously.

**Conceptual progression:**
1. A two-variable equation cannot be "solved for a number" — it can only be solved for an ordered pair.
2. Infinitely many pairs (x, y) satisfy the equation; any one point on the line is a solution.
3. A point NOT on the line does not satisfy the equation.
4. To generate solutions: fix one variable (choose any value for x), solve for y (as a 1-variable equation), get one solution pair.
5. The solution set — all solutions plotted together — forms a straight line.

**CPA arc (entry: C):**
- Concrete: budget constraint story — spending $a per x items and $b per y items for a total of $c; many valid purchase combinations exist
- Pictorial: table of solutions (x, y); plotting pairs in a coordinate plane; seeing the line emerge
- Abstract: general form ax + by = c; parametric family of solutions (x, t) → y = (c−ax)/b for any real t

**Prior knowledge activated:** linear equation in one variable (balance principle, isolation technique); ordered pairs (x, y) in the coordinate plane; substitution to verify an equation

**Threshold concept:** A two-variable equation is a CONSTRAINT, not a unique answer — it describes an entire relationship between two quantities, not a single value.

---

## Component 2 — Misconception Registry

### MC-1: ONE-SOLUTION-EXPECTED [FOUNDATIONAL]
**Description:** Learner expects the equation to yield a unique numerical solution, as in the one-variable case.
**Surface form:** Given 2x + 3y = 12, learner tries to "solve for x" and gets x = (12−3y)/2, then says "I need another equation to find a number."
**Root cause:** Direct transfer of the one-variable solving schema; learner has not yet encountered the concept of a solution set as a set of ordered pairs.
**Trigger condition:** Any initial encounter with a two-variable equation presented in isolation (not as a system).
**Repair target:** TA-B01.

### MC-2: SOLUTION-IS-JUST-X
**Description:** Learner solves for x only (or y only) and considers that alone to be the solution, ignoring the paired variable.
**Surface form:** Given 2x + 3y = 12, sets y=0 and finds x=6, then reports "x=6" as the solution rather than "(6, 0)."
**Root cause:** Applies the one-variable schema — isolate a variable, report that value — without recognising that a solution is always a complete pair (x, y).
**Trigger condition:** Any problem asking "find a solution" without specifying that a pair is expected.
**Repair target:** TA-B01.

### MC-3: ARBITRARY-PAIR-IS-SOLUTION
**Description:** Learner believes any pair (x, y) satisfies the equation, not just pairs on the line.
**Surface form:** Given 2x + 3y = 12, tests (1, 1): 2(1)+3(1)=5≠12, but still reports it as a solution because "x and y can be anything."
**Root cause:** Misinterprets "infinitely many solutions" as "any pair works," rather than "all pairs that make the equation true."
**Trigger condition:** Any problem asking whether a specific pair is a solution.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** "How many solutions does 3x = 9 have?" and "Can you name a pair (x, y) that makes 2x + y = 8 true?" If first correct and second answered with a valid pair → begin TA-A01. If learner cannot produce a pair → TA-B01.

**Scaffolding ladder:**
1. Budget story: spend $2 per apple and $3 per orange for $12 total — list valid (apple, orange) pairs
2. Fix x=0: solve for y. Fix x=3: solve for y. Fix x=6: solve for y. Observe the pattern.
3. Plot all found pairs and observe they form a line
4. Verify that (1, 4) is NOT on the line 2x+3y=12 by substitution

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 85%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — The Solution Set Is Infinite
**Primitive sequence:** P03 → P49

**P03 — ANALOGY BRIDGE:**
> "Imagine you have $12 to spend. Apples cost $2 each and oranges cost $3 each. The constraint is: 2·(apples) + 3·(oranges) = 12. You can buy: 6 apples and 0 oranges (2·6+3·0=12 ✓). Or 3 apples and 2 oranges (2·3+3·2=12 ✓). Or 0 apples and 4 oranges (2·0+3·4=12 ✓). Each valid (apples, oranges) pair is a solution. There's no single 'the answer' — there's a whole family of them."

Formal mapping: the equation 2x + 3y = 12 is satisfied by (6,0), (3,2), (0,4), and infinitely many other pairs. The equation is a constraint, not a unique determination.

How to generate solutions:
- Choose any value of x (e.g., x=1): then 2(1)+3y=12 → 3y=10 → y=10/3. Solution: (1, 10/3).
- Choose x=−3: 2(−3)+3y=12 → 3y=18 → y=6. Solution: (−3, 6).

**P49 — ADAPTIVE CHECKPOINT:**
"Find TWO different solutions to the equation 3x + y = 9."

- CORRECT (any two valid pairs, e.g., (0,9) and (3,0)): "Excellent — both pairs satisfy 3x+y=9. Each is a legitimate solution." → TA-A02
- PARTIAL (found one valid pair but reported only one number, not a pair): "You found that x=3 works when y=0. A solution to a two-variable equation is always an ordered PAIR: (3, 0). Now find a second pair." → TA-A02
- INCORRECT (reported x=3 as the solution with no mention of y): "In a two-variable equation, a solution must specify BOTH variables. x=3 alone doesn't tell us y. Try: if x=0, substitute: 3(0)+y=9 → y=9. So (0, 9) is a solution. Now find another." → TA-B01
- NO_RESPONSE: "Choose x=0: 3(0)+y=9 → y=9. Solution: (0,9). Choose x=2: 3(2)+y=9 → 6+y=9 → y=3. Solution: (2,3). Two solutions found. Notice: they're different pairs, both valid." → TA-A02

---

### TA-A02 — Verifying Solutions and Non-Solutions
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: Verifying a solution*
Is (4, −1) a solution to 2x + 3y = 5?
Substitute: 2(4) + 3(−1) = 8 − 3 = 5. Left side = right side = 5 ✓.
Yes, (4, −1) is a solution.

*Worked Example 2: Verifying a non-solution*
Is (2, 3) a solution to 2x + 3y = 5?
Substitute: 2(2) + 3(3) = 4 + 9 = 13. Left side = 13 ≠ 5 = right side ✗.
No, (2, 3) is NOT a solution. The equation is not satisfied.

Key distinction: being a solution means BOTH substituted values make the equation true simultaneously.

**P49 — ADAPTIVE CHECKPOINT:**
"Is (3, 2) a solution to 2x + 3y = 12? Show your work."

- CORRECT (2(3)+3(2)=6+6=12=12 ✓, yes): "Correct substitution and verification: 2(3)+3(2)=12." → TA-A03
- PARTIAL (substituted correctly but made arithmetic error — e.g., said 6+6=13): "Check: 2×3=6 and 3×2=6. Sum: 6+6=12. Does 12=12? Yes — (3,2) is a solution." → TA-A03
- INCORRECT (said not a solution because 3×2=6 and not 12, substituting only one variable): "You must substitute BOTH: x=3 AND y=2. Put both into 2x+3y: 2(3)+3(2)=6+6=12. Both satisfied simultaneously — (3,2) is a solution." → TA-B02
- NO_RESPONSE: "Substitute x=3, y=2 into 2x+3y: 2(3)+3(2)=6+6=12. Right side is 12. 12=12 ✓. (3,2) is a solution." → TA-A03

---

### TA-A03 — Contrast: One-Variable vs. Two-Variable Equations
**Primitive sequence:** P06 → P49

**P06 — CONTRAST PAIR:**

| Feature | One-variable: 2x + 6 = 10 | Two-variable: 2x + 3y = 12 |
|---|---|---|
| Number of solutions | Exactly 1: x=2 | Infinitely many: (0,4), (3,2), (6,0), … |
| What a solution is | A single number | An ordered pair (x, y) |
| How to verify | Substitute x: 2(2)+6=10 ✓ | Substitute both: check ax+by=c |
| Geometric picture | A single point on a number line | A straight line in the coordinate plane |
| How many values to report | 1 | 2 |

Second contrast — the effect of restricting y:
If additional information fixes y=0 (one condition): 2x + 3(0) = 12 → 2x=12 → x=6. Now one unique solution: (6,0). This is how a SYSTEM of two equations pins down a unique point.

**P49 — ADAPTIVE CHECKPOINT:**
"The equation 4x + 2y = 20 has how many solutions? List two of them."

- CORRECT (infinitely many; e.g., (5,0) and (3,4)): "Correct — infinitely many. Any point on the line 4x+2y=20 is a solution." → TA-A04
- PARTIAL (says infinitely many but lists only one, or lists pairs without checking): "Good — infinitely many. Now verify your pairs: 4(5)+2(0)=20 ✓; 4(3)+2(4)=12+8=20 ✓." → TA-A04
- INCORRECT (says one solution): "In a two-variable equation, you can always choose a new value for x and solve for y — every such choice gives a different valid pair. There is no unique solution; there are infinitely many." → TA-B01
- NO_RESPONSE: "Choose x=5: 4(5)+2y=20 → 20+2y=20 → 2y=0 → y=0. Solution: (5,0). Choose x=0: 4(0)+2y=20 → 2y=20 → y=10. Solution: (0,10). Infinitely many solutions exist." → TA-A04

---

### TA-A04 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 85% → PASS requires ⌈0.85 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: Find two distinct solutions to 2x + 3y = 12. [Answers include: (0,4), (3,2), (6,0), (−3,6), etc. Any two correct pairs.]
Item 2: Is (3, 2) a solution to 2x + 3y = 12? Verify by substitution. [Answer: 2(3)+3(2)=6+6=12 ✓ — yes]
Item 3: True or False — the equation 3x + 2y = 18 has exactly one solution. [Answer: FALSE — infinitely many solutions form a line]
Item 4: Find the y-intercept (set x=0) and x-intercept (set y=0) of 2x + 3y = 12. [Answer: y-intercept (0,4); x-intercept (6,0)]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — T1 cross_links are empty):**
A store sells apples for $2 each and oranges for $3 each. A customer spends exactly $12.

(a) Write a linear equation in two variables modeling this situation. [Answer: 2a + 3r = 12, where a = apples, r = oranges]
(b) Find three solutions with non-negative integer values. [Answer: (0,4), (3,2), (6,0)]
(c) If the customer must buy at least 1 apple AND at least 1 orange, which of your solutions are valid? [Answer: only (3,2) from the listed set — (0,4) has no apples, (6,0) has no oranges]
(d) Why does a CONTEXT often restrict the full solution set of a two-variable equation? [Answer: real-world constraints (non-negative quantities, integer counts, budget limits) select a subset of the infinitely many mathematical solutions]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (one-solution / incomplete-pair errors) or TA-B02 (verification / non-solution errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Linear equation in two variables: mastered. You understand that ax+by=c has infinitely many solutions forming a line, that each solution is an ordered pair (x,y), and that verification requires substituting both variables simultaneously. This is the foundation for systems of linear equations and linear functions."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: One-Solution-Expected / Solution-Is-Just-X
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two related errors: ONE-SOLUTION-EXPECTED (believing ax+by=c has a unique number as its answer) and SOLUTION-IS-JUST-X (reporting only x, not the pair (x,y)). Both come from applying the one-variable solving schema to a two-variable equation where that schema doesn't apply."

**P41 — MISCONCEPTION DETECTOR:**
> "Test ONE-SOLUTION-EXPECTED: plug x=0 into 2x+3y=12 → y=4. Plug x=3 → y=2. Plug x=6 → y=0. Every one is a valid, different solution. The equation has no single 'answer' — it has an infinitely long list of answers. Test SOLUTION-IS-JUST-X: is 'x=6' a complete answer? Not quite — what is y? If we only know x=6, we've only satisfied one part of the constraint. A solution must name BOTH x AND y."

**P64 — CONCEPTUAL SHIFT:**
> "A two-variable equation is a CONSTRAINT, not a calculation. It says: 'the relationship between x and y must satisfy this equation.' Any pair satisfying it is a solution. Think of it as a line in the plane — every point ON the line is a solution. There are infinitely many points on a line. To name one solution: choose any x, solve the resulting one-variable equation for y, report the pair."

→ TA-A02

---

### TA-B02 — Repair: Arbitrary-Pair-Is-Solution
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error here is ARBITRARY-PAIR-IS-SOLUTION — believing that any pair (x,y) satisfies a two-variable equation because 'there are infinitely many solutions.' Infinitely many does NOT mean all pairs work — it means there are infinitely many SPECIFIC pairs that make the equation true."

**P41 — MISCONCEPTION DETECTOR:**
> "Test (1,1) in 2x+3y=12: 2(1)+3(1)=2+3=5≠12. NOT a solution. Test (3,2): 2(3)+3(2)=6+6=12 ✓. Solution. The difference: only points that satisfy 2x+3y=12 are solutions. The line 2x+3y=12 contains infinitely many points — but (1,1) is not one of them."

**P64 — CONCEPTUAL SHIFT:**
> "Infinitely many solutions means the SOLUTION SET is infinite — not that every pair belongs to it. The solution set is the set of all (x,y) satisfying the equation — a line, not the entire plane. To verify any candidate (a,b): substitute into the equation and check if both sides are equal. Only then is (a,b) a solution."

→ TA-A02

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.alg.linear-equation-2var
  MAMR: 0.85
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "Find three solutions to x + 2y = 10."
  session_3_probe: "Is (4, 1) a solution to 3x − 2y = 10? Verify."
  session_7_probe: "How many solutions does 5x + y = 20 have? Find the intercepts."
  session_14_probe: "A farmer has chickens (2 legs) and cows (4 legs). There are 24 legs total. Write and explore the equation."
  session_30_probe: "Explain why a single linear equation in two variables cannot determine unique values of x and y without additional information."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.alg.linear-equation-1var — balance principle, isolation technique, solution as a single value [BLUEPRINT EXISTS]

**Unlocks:**
- math.alg.system-linear-equations — two equations together pin down a unique point
- math.func.linear-function — y = mx + b is the explicit form of ax + by = c solved for y

**Cross-links:** [math.func.linear-function, math.geom.line-equation] — neither is Tier 1; P76 independence mode applied.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** both cross_links are NOT Tier 1 → P76 independence mode applied.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The shift from "one number is the solution" to "an ordered pair is the solution" is the single hardest conceptual move here. The budget-constraint analogy (P03) must establish concretely that multiple valid combinations exist before any symbolic manipulation is introduced.

**Generate-before-verify:** Always have learners generate at least two solutions (by choosing x and solving for y) BEFORE asking them to verify a given pair. Generation proves existence of multiple solutions; verification builds the substitution skill.

**Contrast with systems:** explicitly plant the seed that a SECOND equation on the same variables would restrict the infinite solution set to a unique point — this motivates the next concept (math.alg.system-linear-equations) without derailing the current lesson.

**V-3 check (CPA_ENTRY=C for developing difficulty):** TA-A01 opens with the budget-constraint concrete story before introducing symbolic form — V-3 satisfied.

**GR-10 — MAMR enforcement:** MAMR = 85%. For n=5 (4 P77 + 1 P76), ⌈0.85×5⌉=5. A learner who scores 4/5 does NOT receive mastery credit and routes to repair, then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P03 (B-category primitive for developing/apply)
- [x] GR-2: Each non-gate TA (A01, A02, A03) contains P49
- [x] GR-3: TA-A04 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A04; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A04 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links T1 = [] → P76 independence mode applied; probe uses real-world purchase context
- [x] GR-10: MAMR = 85% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.alg.linear-equation-2var)
- [x] V-2: difficulty=developing, bloom=apply, h=5, thresh=0.85 match KG
- [x] V-3: CPA_ENTRY=C (developing difficulty → concrete entry); TA-A01 opens with budget-constraint concrete story
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P03 correctly anchors TA-A01 (analogy bridge for budget constraint)
- [x] V-6: P07 present in TA-A02 (bloom=apply requires worked example pair)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.85 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items cover solution generation, verification, T/F, and intercepts
- [x] V-13: P76 probe is genuine transfer (grocery modeling + real-world domain restriction analysis)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain matches h=5 scope (3 main TAs + gate — within spec)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 check note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: Budget-constraint analogy establishes solution multiplicity concretely before abstraction; contrast with 1-var equation solidifies the distinction ✓
- Robust: 3-TA chain matches h=5 scope; P91 gate enforces 85% threshold ✓

**STATUS: PACKAGE_READY**
