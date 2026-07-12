# Teaching Blueprint — math.alg.system-linear-equations

## Component 0 — Metadata
concept_id: math.alg.system-linear-equations
concept_name: Systems of Linear Equations
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 12
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.alg.linear-equation-2var]
cross_links: [math.linalg.linear-system]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A system of linear equations is a set of two or more linear equations in the same variables; a solution is a tuple of values satisfying ALL equations simultaneously. For two equations in two unknowns, three cases exist: one solution (lines intersect), no solution (parallel lines), or infinitely many solutions (same line). The two principal solution methods are substitution (isolate one variable, substitute into the other equation) and elimination (add/subtract multiples of equations to cancel one variable).

**Conceptual progression:**
1. Geometric interpretation: each equation is a line in ℝ²; the solution set is the intersection of the lines.
2. Three cases: unique solution (∃!), no solution (∅), infinitely many solutions (ℝ¹ — a line).
3. Substitution method: isolate a variable in one equation, substitute the expression into the other, solve, back-substitute.
4. Elimination (addition) method: multiply equations by constants so one variable's coefficients are additive inverses; add to eliminate that variable.
5. Consistency check: always substitute the solution back into BOTH original equations.

**CPA arc (entry: P):**
- Pictorial: two lines on a coordinate plane — one intersection point (unique), parallel (no solution), overlapping (infinite solutions); labelled intersection as the solution
- Abstract: algebraic manipulation; substitution and elimination steps; 0=0 vs. 0=k detection

**Prior knowledge activated:** linear equations in two variables (math.alg.linear-equation-2var) — standard form ax+by=c, slope-intercept form y=mx+b, solving for y; evaluating expressions by substituting a value for a variable

---

## Component 2 — Misconception Registry

### MC-1: SUBSTITUTE-INTO-SAME-EQUATION [FOUNDATIONAL]
**Description:** Learner substitutes the expression from one equation back into that SAME equation instead of the OTHER equation, creating a tautology (0=0 or 5=5) and concluding that infinitely many solutions exist or that the method has "failed."
**Surface form:** From {x+y=5, x=3−y}: substituting x=3−y into the same first equation where x was expressed: "(3−y)+y=5 → 3=5 ✗ [confused]" OR "always true — infinitely many solutions."
**Root cause:** Learner does not distinguish between "the equation I solved FROM" and "the other equation." When substituting back into the same equation, the substitution is circular — the equation becomes an identity or a contradiction instead of revealing the value of the remaining variable.
**Trigger condition:** Substitution method, especially when the isolated expression is substituted.
**Repair target:** TA-B01.

### MC-2: ELIMINATION-WRONG-SIGN
**Description:** Learner adds equations when subtracting is needed, or vice versa — failing to make the target variable's coefficients cancel. For example, to eliminate x from {3x+2y=13, 3x−y=7}, learner adds (getting 6x+y=20) instead of subtracting (getting 3y=6).
**Surface form:** "I added the two equations to eliminate x: (3x+3x)+(2y+(−y))=(13+7) → 6x+y=20. Now what?"
**Root cause:** The strategy — "make coefficients cancel" — requires the coefficients to be additive inverses (opposite signs). Learner adds regardless of sign, or does not multiply to create opposite signs before adding.
**Trigger condition:** Elimination method when the coefficients of the target variable have the same sign.
**Repair target:** TA-B02.

### MC-3: ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION
**Description:** When elimination yields 0=0 (an identity, indicating infinitely many solutions), learner concludes there is no solution. Confuses "0=0" (any value works) with "0=k, k≠0" (contradiction, no solution).
**Surface form:** "I got 0=0. That means nothing works — no solution."
**Root cause:** "Nothing is left after elimination" is interpreted as "nothing satisfies the equation." The learner has not connected 0=0 (a true statement for all values) to the geometric picture of coincident lines (every point on the line is a solution).
**Trigger condition:** Any dependent system (both equations describe the same line).
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Solve 2x+3=9. Now solve y=2x−1 for x given y=5." If the learner finds x=3 in the first and x=3 in the second, proceed to A01. If the learner cannot isolate a variable in a single linear equation, review math.alg.linear-equation-2var first.

**Scaffolding ladder:**
- Rung 1 (pictorial): graph both equations on the same axes; identify the intersection point visually before solving algebraically. Verify the algebraic answer matches the graph.
- Rung 2 (substitution): always highlight (circle) which equation an expression was obtained FROM; draw an arrow to the OTHER equation where it will be substituted.
- Rung 3 (elimination): write the target variable's coefficients explicitly; note whether they are equal or opposite; decide to add or subtract; write the operation clearly before executing.

**Pacing note:** h=12 estimated hours; A01 in sessions 1–2; A02 in sessions 3–4; A03 + mastery gate in sessions 5–6.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Two roads on a map.
"Road A runs from southwest to northeast; Road B runs from northwest to southeast. There is exactly one crossroads where both roads meet — that is the 'solution': the one location on BOTH roads. If both roads run in exactly the same direction (parallel), they never meet — no crossroads, no solution. If the roads are actually the same road with different names, every point is on both roads — infinitely many solutions."

TARGET DOMAIN: System of two linear equations.
"Each equation describes a line in the xy-plane. The solution is the point (x,y) on BOTH lines simultaneously — the intersection. Three cases:
- Lines intersect at one point → exactly one solution.
- Lines are parallel (same slope, different intercept) → no solution (inconsistent system).
- Lines coincide (same equation, different appearance) → infinitely many solutions (dependent system)."

GEOMETRIC PREVIEW:
- System {x+y=5, x−y=1}: lines intersect. Solve: add equations → 2x=6 → x=3, y=2. Point (3,2).
- System {x+y=5, x+y=7}: parallel lines (same slope 1, different intercepts). No solution — no point satisfies both.
- System {x+y=5, 2x+2y=10}: same line (second = 2× first). Every point on x+y=5 is a solution.

**Assessment primitive: P49**

PROBE: "Without solving algebraically, how many solutions does {3x+y=4, 6x+2y=8} have? What about {3x+y=4, 6x+2y=9}?"
- CORRECT: "First system: 6x+2y=8 is exactly 2×(3x+y=4) — same line, infinitely many solutions. Second: 6x+2y=9 but 2×4=8≠9 — parallel lines (same slope, different intercept), no solution." → proceed to A02.
- PARTIAL: correct on first, wrong on second → "First is right. For the second: if both equations were the same line, 6x+2y would equal 2×4=8. But the right-hand side is 9≠8 — the lines are parallel, not coincident. Parallel lines never intersect → no solution."
- INCORRECT: attempts to solve algebraically without geometric insight → "Before algebra: compare the equations. Does multiplying {3x+y=4} by 2 give exactly {6x+2y=8}? Yes → same line. Does multiplying by 2 give {6x+2y=9}? No (8≠9) → different parallel lines. Use this check before solving."
- NO_RESPONSE: "Multiply the first equation by 2: 2·(3x+y)=2·4 → 6x+2y=8. Compare to the second equation in each system. First: 6x+2y=8 ✓ → identical lines. Second: 6x+2y=9 ≠ 6x+2y=8 → parallel lines (no solution)."

---

### TA-B01 — Repair for MC-1 (SUBSTITUTE-INTO-SAME-EQUATION)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'I found x in terms of y from equation 1 — so I substitute back into equation 1 to find y.' This creates a circular identity, not a new equation for y."

**P41 — MISCONCEPTION DETECTOR**
"System {x+y=5, x=3}. Step 1: From equation 2, x=3. Step 2: where do you substitute x=3?
(A) Back into equation 2: 3=3 → trivially true, no new info.
(B) Into equation 1 (the OTHER equation): 3+y=5 → y=2."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The goal of substitution is to create an equation with ONLY ONE UNKNOWN so you can solve for it. If you substitute back into the equation you solved from, you already used that equation — substituting back just reproduces it as an identity (always true) and gives no information about y. You MUST substitute into the OTHER equation — one you haven't fully used yet. Treat it as a rule: 'substitute into the equation you DID NOT use to get the expression.'"

→ Return to A02.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Substitution method:

System: {2x+y=7, x−y=2}

Step 1 — Choose easier equation to isolate a variable. From equation 2: x=y+2. [Solved FROM equation 2.]
Step 2 — Substitute into the OTHER equation (equation 1): 2(y+2)+y=7.
Step 3 — Solve: 2y+4+y=7 → 3y=3 → y=1.
Step 4 — Back-substitute into x=y+2: x=1+2=3.
Solution: (x,y)=(3,1).
Verify in BOTH original equations: 2(3)+1=7 ✓; 3−1=2 ✓.

WORKED EXAMPLE 2 — Elimination (addition) method:

System: {3x+2y=13, x−2y=−1}

Step 1 — Identify which variable to eliminate: y has coefficients +2 and −2 — already additive inverses!
Step 2 — Add both equations: (3x+x)+(2y+(−2y))=13+(−1) → 4x=12 → x=3.
Step 3 — Substitute x=3 into either original equation (use equation 2): 3−2y=−1 → 2y=4 → y=2.
Solution: (x,y)=(3,2).
Verify: 3(3)+2(2)=9+4=13 ✓; 3−2(2)=3−4=−1 ✓.

KEY CONTRAST: In WE1 we used substitution (best when a variable has coefficient 1 or −1). In WE2 we used elimination (best when coefficients of one variable are already additive inverses, or can be made so with multiplication).

**Assessment primitive: P49**

PROBE: "Solve by your choice of method: {4x+3y=10, 2x−y=4}."
- CORRECT: e.g., from eq 2 y=2x−4; substitute: 4x+3(2x−4)=10 → 4x+6x−12=10 → 10x=22 → x=2.2; y=2(2.2)−4=0.4. Verify: 4(2.2)+3(0.4)=8.8+1.2=10 ✓; 2(2.2)−0.4=4.4−0.4=4 ✓ → "Correct."
- PARTIAL: correct method, arithmetic slip → "Method is right. Recheck arithmetic: 10x=10+12=22 → x=22/10=11/5=2.2. Then y=2(11/5)−4=22/5−20/5=2/5=0.4."
- INCORRECT: substitutes into same equation → Repair with B01 (SUBSTITUTE-INTO-SAME-EQUATION).
- NO_RESPONSE: "Substitution: from equation 2, isolate y: y=2x−4. Now substitute this expression for y into equation 1 (the other equation): 4x+3(2x−4)=10. Expand and solve for x, then find y."

---

### TA-B02 — Repair for MC-2 (ELIMINATION-WRONG-SIGN)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'I can add (or subtract) equations regardless of sign — elimination works either way.' Elimination requires the target variable's coefficients to be additive inverses (same magnitude, opposite sign) so they sum to zero."

**P41 — MISCONCEPTION DETECTOR**
"System {3x+2y=13, 3x−y=7}. To eliminate x by adding:
(A) (3x+2y)+(3x−y)=13+7 → 6x+y=20. x is NOT eliminated.
(B) To eliminate x, SUBTRACT equation 2 from equation 1: (3x+2y)−(3x−y)=13−7 → 3y=6 → y=2. x IS eliminated."
[If A: learner planned to add despite same-sign x coefficients.]

**P64 — CONCEPTUAL SHIFT**
"The rule: to eliminate a variable by addition, its coefficients in the two equations must sum to zero (e.g., +3 and −3). If they have the SAME sign (both +3), you must SUBTRACT one equation from the other — then +3x−3x=0. Alternatively, negate one equation first: if you multiply equation 2 by −1, 3x becomes −3x, and THEN adding eliminates x. Always write out the coefficients of the target variable and check: do they sum to zero? If yes, add. If not, multiply by −1 or another scalar first."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Unique solution:
System {x+y=5, x−y=1}: add → 2x=6 → x=3; y=2. One intersection point: (3,2). Geometric: two lines with different slopes (1 and 1 resp… wait, slopes are −1 and +1) crossing at one point.

PAIR B1 — No solution (inconsistent):
System {2x+y=5, 4x+2y=8}: multiply first by 2 → 4x+2y=10 ≠ 4x+2y=8 → subtract → 0=2. Contradiction. Geometric: parallel lines (same slope, different y-intercept); no intersection.
When elimination gives 0=k (k≠0): NO SOLUTION.

PAIR B2 — Infinitely many solutions (dependent):
System {2x+y=5, 4x+2y=10}: multiply first by 2 → 4x+2y=10 = 4x+2y=10 → subtract → 0=0. Tautology. Geometric: same line; every point satisfying one satisfies both.
When elimination gives 0=0: INFINITELY MANY SOLUTIONS; express as a general solution, e.g., y=5−2x for any x.

CONTRAST TABLE:
| Result of elimination | Interpretation | Geometric |
|---|---|---|
| Unique value for remaining variable | Exactly one solution (x,y) | Lines intersect at one point |
| 0 = k (k≠0) | No solution | Parallel lines |
| 0 = 0 | Infinitely many solutions | Coincident lines (same line) |

**Assessment primitive: P49**

PROBE: "System {3x−y=4, 9x−3y=12}. Solve or classify."
- CORRECT: "Multiply first by 3: 9x−3y=12 = 9x−3y=12 → 0=0 → infinitely many solutions. The two equations describe the same line: 9x−3y=12 is exactly 3×(3x−y=4). General solution: y=3x−4 for any x." → proceed to A04.
- PARTIAL: identifies dependent but doesn't express general solution → "Right that it's infinitely many. General form: from 3x−y=4, y=3x−4. For every value of x, the point (x,3x−4) satisfies the system. Example solutions: (0,−4), (1,−1), (2,2)."
- INCORRECT: concludes no solution → Repair with B03 (ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION).
- NO_RESPONSE: "Multiply equation 1 by 3: 9x−3y=12. Is this the same as equation 2? Yes: 9x−3y=12 ✓. Subtracting gives 0=0. This means the equations are identical — the same line. Every point on 3x−y=4 is a solution."

---

### TA-B03 — Repair for MC-3 (ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: '0=0 means no solution — nothing satisfies the equation.' This confuses two different algebraic outcomes. 0=0 is a TAUTOLOGY (always true for any variable value); 0=k (k≠0) is a CONTRADICTION (no variable value works)."

**P41 — MISCONCEPTION DETECTOR**
"After elimination you get 0=0. What does this mean?
(A) No solution — the equation is useless.
(B) Infinitely many solutions — the two equations were actually the same line all along."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"0=0 says 'zero equals zero' — this is TRUE for EVERY value of x and y. The variable disappeared because both equations described exactly the same line; eliminating produced a trivially true statement. Geometrically: same line = every point on it is a solution (infinitely many). Contrast with 0=5: '0=5' is NEVER true — no (x,y) satisfies it; this is the NO-SOLUTION case (parallel, not coincident, lines). Rule: 0=0 → infinitely many; 0≠0 → none."

→ Return to A03.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (SUBSTITUTE-INTO-SAME-EQUATION)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B02 — Repair for MC-2 (ELIMINATION-WRONG-SIGN)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Solve the system {3x+4y=18, 5x−2y=4} by elimination. Show each step."
[Expected: multiply second by 2: 10x−4y=8. Add to first: 13x=26 → x=2. Then 3(2)+4y=18 → y=3. Solution (2,3). Verify: 3(2)+4(3)=18 ✓; 5(2)−2(3)=10−6=4 ✓.]

**Day 10 prompt:**
"For which value of k does {2x+y=5, 4x+2y=k} have (a) no solution, (b) infinitely many solutions?"
[Expected: multiply first by 2: 4x+2y=10. (a) k≠10 → parallel lines, no solution. (b) k=10 → same line, infinitely many solutions. The system never has a unique solution (the lines can only be parallel or coincident — never transversal — because they have the same slope).]

**Day 30 prompt:**
"Three friends together have 18 coins. Alice has twice as many as Bob. Bob has 3 more than Carol. Set up a system of 3 equations in 3 unknowns and solve."
[Expected: A+B+C=18; A=2B; B=C+3. Sub: 2B+B+(B−3)=18 → 4B=21? Recheck: A+B+C=18, A=2B, B=C+3 → C=B−3. So 2B+B+(B−3)=18 → 4B−3=18 → 4B=21. This doesn't give integer values. Let me fix the problem.

Actually: Alice has twice as many as Bob, Bob has 3 MORE than Carol.
A=2B; B=C+3; A+B+C=18. Sub A=2B: 2B+B+C=18 → 3B+C=18. Sub C=B−3: 3B+B−3=18 → 4B=21 → B=21/4. Non-integer. Adjust problem.

New version: Alice has twice as many as Bob. Bob has 3 more than Carol. Together they have 21.
A=2B; B=C+3; A+B+C=21. Sub: 2B+B+C=21 → 3B+C=21. Sub C=B−3: 4B−3=21 → 4B=24 → B=6. A=12, C=3. Check: 12+6+3=21 ✓; A=2B ✓; B=C+3 ✓.

Let me adjust to use 21 total.]

"Three friends together have 21 coins. Alice has twice as many as Bob. Bob has 3 more than Carol. How many coins does each have?"
[Expected: A=2B, B=C+3, A+B+C=21. Sub A=2B: 3B+C=21. Sub C=B−3: 4B=24 → B=6. A=12, C=3. Verify: 12+6+3=21 ✓.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.linear-equation-2var — solving a single linear equation in two variables; standard form ax+by=c; isolating one variable

**Unlocked blueprints:**
- math.linalg.linear-system — matrix representation Ax=b; Gaussian elimination; linear systems in n variables and m equations
- math.alg.system-3var — three equations in three unknowns; elimination cascade

**Cross-link (NOT T1 — P76 independence mode):**
- math.linalg.linear-system (not T1): the linear system in matrix form; Gaussian elimination generalises the two-equation elimination method to n equations in n unknowns

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (SUBSTITUTE-INTO-SAME-EQUATION) is the most common substitution error. The fix is a physical habit: CIRCLE the equation you solved from; draw an ARROW to the equation you will substitute into. The visual reminder prevents the error.

**Method selection guide:** Substitution is best when a coefficient is 1 or −1 (easy to isolate). Elimination is best when both equations are already in standard form ax+by=c, or when coefficients match. Both methods always work — fluency in both is important.

**Geometric interpretation is the organising framework:** Present the algebra as computing coordinates of the intersection point. Every algebraic step has a geometric meaning. This helps learners understand WHAT they are computing, not just HOW.

**Consistency check is mandatory:** After solving, always substitute both values back into BOTH original equations. This catches sign errors, arithmetic mistakes, and MC-1 (substituting into same equation gives a trivial identity that "checks" but is wrong).

**Three-case detection ritual:** Before solving, multiply one equation to match coefficients. If the right-hand sides also match → infinitely many (0=0). If they don't match → no solution (0=k≠0). Only if the equations are genuinely non-proportional → unique solution.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P06
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_link math.linalg.linear-system is NOT T1; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem ({2x+3y=12, 4x−y=10}, elimination requiring coefficient matching)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All mathematical content (substitution, elimination, three cases, geometric interpretation) consistent with KG description and standard algebra pedagogy; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Solve by substitution: {x+y=5, x−y=1}."
[Expected: Add equations: 2x=6 → x=3; y=2. Or: x=y+1 (from eq 2), substitute into eq 1: (y+1)+y=5 → y=2, x=3. Solution: (3,2). Verify: 3+2=5 ✓; 3−2=1 ✓.]

**Item 2:**
"Solve by your choice: {y=2x−1, 3x+y=14}."
[Expected: Substitute y=2x−1 into second: 3x+2x−1=14 → 5x=15 → x=3; y=5. Verify: y=2(3)−1=5 ✓; 3(3)+5=14 ✓.]

**Item 3:**
True or False: "When solving by substitution, substitute the expression into the same equation you used to find it."
[Expected: FALSE. Always substitute into the OTHER equation. Substituting back into the same equation gives a tautology and provides no new information.]

**Item 4:**
"Classify (do not solve): {2x+y=5, 4x+2y=8}."
[Expected: Multiply first equation by 2: 4x+2y=10. The second equation gives 4x+2y=8 ≠ 10. The left sides are identical but right sides differ → parallel lines → NO SOLUTION (inconsistent system).]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Solve the system: {2x+3y=12, 4x−y=10}.

(a) State which method you will use and why.
(b) Show all steps.
(c) Verify your answer in both original equations."

[Expected:
(a) Elimination: multiply second equation by 3 to make y-coefficients +3 and −3 (additive inverses). Or substitution from equation 2: y=4x−10.

Method A (elimination): 3×(4x−y=10): 12x−3y=30. Add to 2x+3y=12: 14x=42 → x=3. Sub: 2(3)+3y=12 → 3y=6 → y=2. Solution: (3,2).

Method B (substitution): y=4x−10; sub: 2x+3(4x−10)=12 → 2x+12x−30=12 → 14x=42 → x=3; y=2.

(c) Check: 2(3)+3(2)=6+6=12 ✓; 4(3)−2=12−2=10 ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if solution (3,2) is correct and both verification checks are shown, 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can solve systems by substitution and elimination, recognise all three solution cases, and substitute into the correct equation.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or Item 3 (substitution into same equation, or circular answer): → TA-B01 (SUBSTITUTE-INTO-SAME-EQUATION repair), then re-gate
- FAIL on Item 2 (sign error in elimination, or incorrect elimination): → TA-B02 (ELIMINATION-WRONG-SIGN repair), then re-gate
- FAIL on Item 4 (0=0 interpreted as no solution): → TA-B03 (ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION repair), then re-gate
- FAIL on P76 (wrong solution, or verification fails): → return to A02 (WE2 — re-demonstrate elimination steps), then re-gate
- FAIL on multiple items: → B01 then B02 then B03 as needed; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated mastery of systems of linear equations: substitution and elimination methods, the three solution cases, and the geometric interpretation as line intersections.

Key anchors to carry forward:
- Two equations, two unknowns: geometrically, two lines in ℝ². Solution = intersection point(s).
- Substitution: isolate one variable in one equation; substitute into the OTHER equation.
- Elimination: make one variable's coefficients additive inverses; add equations to eliminate it.
- Three cases: unique solution (lines cross); no solution (parallel lines, 0=k≠0); infinitely many (same line, 0=0).
- Always verify the solution in BOTH original equations.

Next concepts: math.linalg.linear-system (matrix form, Gaussian elimination for n×n systems), math.alg.system-3var (three equations, three unknowns)."
