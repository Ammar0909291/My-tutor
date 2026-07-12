# Teaching Blueprint — math.alg.polynomial-division

## Component 0 — Metadata
concept_id: math.alg.polynomial-division
concept_name: Polynomial Division
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 6
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.alg.polynomial-operations]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** Dividing polynomial p(x) by d(x) produces a unique quotient q(x) and remainder r(x) such that p(x)=d(x)q(x)+r(x) with deg r < deg d (the Division Algorithm for polynomials). Two methods: (1) long division — mirrors integer long division, works for any divisor; (2) synthetic division — compact scheme for linear divisors of the form (x−c). The remainder theorem states p(c)=r when d(x)=x−c.

**Conceptual progression:**
1. Division algorithm: p(x)=d(x)q(x)+r(x), deg r < deg d. Non-zero remainder is permitted.
2. Long division: repeatedly divide the leading term of the current remainder by the leading term of d(x); subtract; repeat until remainder degree is less than d(x) degree.
3. Synthetic division: when d(x)=x−c, carry only the coefficients (including zero placeholders); sum and multiply by c iteratively.
4. Remainder theorem: p(c)=r. Corollary: x=c is a root of p(x) iff (x−c) divides p(x) with remainder 0.

**CPA arc (entry: P):**
- Pictorial: long division layout mirroring integer long division; synthetic division array with annotated steps
- Abstract: p(x)=d(x)q(x)+r(x); p(c)=r (Remainder Theorem)

**Prior knowledge activated:** polynomial operations (math.alg.polynomial-operations) — specifically polynomial subtraction and the leading term; degree of a polynomial; evaluating p(c) by substitution

---

## Component 2 — Misconception Registry

### MC-1: REMAINDER-MUST-BE-ZERO [FOUNDATIONAL]
**Description:** Learner believes polynomial division must come out evenly — that a non-zero remainder indicates an error. Stops midway, re-does the division, or reports no quotient when a remainder exists.
**Surface form:** "I got a remainder of −1, so I must have made a mistake — division of polynomials should always work out."
**Root cause:** Experience with integer factoring and polynomial factoring exercises always produces a zero remainder. The general Division Algorithm (remainder possible) was never made explicit. Learner assumes the pattern from easy exercises is a universal law.
**Trigger condition:** Any division where d(x) does not exactly divide p(x).
**Repair target:** TA-B01.

### MC-2: DIVIDE-WRONG-TERM
**Description:** Learner determines the quotient term by dividing the last term or constant of the current remainder by the leading term of d(x) instead of dividing the LEADING TERMS of both.
**Surface form:** In (x³+2x²−5x−6)÷(x−2): at step 2, instead of dividing 6x by x to get 6, divides −6 by x to get −6/x (rational term).
**Root cause:** Confusion about the algorithm: "match the last term with the last term" — a false memory from integer long division appearance. The algorithm matches LEADING terms at each step.
**Trigger condition:** Any long division step past the first.
**Repair target:** TA-B02.

### MC-3: SYNTHETIC-FOR-ANY-DIVISOR
**Description:** Learner applies synthetic division when the divisor is not of the form (x−c) — for example, trying to use synthetic division for (2x+3) or (x²+1).
**Surface form:** "I'll use synthetic division with c=3 for the divisor 2x+3."
**Root cause:** Synthetic division's compact form is attractive; learner generalises it without checking the restriction: the divisor must be exactly (x−c), a monic linear polynomial.
**Trigger condition:** Any problem with a non-monic linear divisor or higher-degree divisor.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Compute (6x³−3x²+9x)÷(3x) by dividing term-by-term." If the learner gets 2x²−x+3 correctly, proceed to A01. This monomial-divisor warm-up confirms ability to divide term-by-term (prerequisite for the leading-term strategy in long division).

**Scaffolding ladder:**
- Rung 1 (pictorial): show integer division 137÷7=19 remainder 4 side-by-side with polynomial long division; label each step in both.
- Rung 2 (structured): complete a long division with the framework already drawn — learner fills in each term of the quotient and each subtraction.
- Rung 3 (full apply): learner sets up and executes both methods independently.

**Pacing note:** h=6 estimated hours; A01 in session 1; A02 in sessions 2–3; A03 + mastery gate in sessions 3–4.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Integer long division.
"29÷7: 7 goes into 29 four times (4×7=28), remainder 1. So 29=7·4+1. The remainder (1) is less than the divisor (7) — that's the stopping rule."

TARGET DOMAIN: Polynomial long division.
"(x³−2x²+x−3)÷(x−2): the same structure applies. We repeatedly ask 'how many times does the LEADING TERM of (x−2) go into the LEADING TERM of the current remainder?' until the remainder's degree is less than the divisor's degree."

BRIDGE MAPPING:
| Integer division | Polynomial division |
|---|---|
| 29 = 7·4 + 1 | p(x) = d(x)·q(x) + r(x) |
| Quotient 4, remainder 1 | Quotient q(x), remainder r(x) |
| Stopping rule: remainder < divisor | Stopping rule: deg r < deg d |
| Remainder may be nonzero (1≠0) | Remainder may be nonzero |
| Check: 7·4+1=29 | Check: d(x)·q(x)+r(x)=p(x) |

LONG DIVISION TRACE — (x³−2x²+x−3)÷(x−2):
Step 1: Leading term of remainder = x³; leading term of d(x) = x. x³÷x = x². Write x² in quotient.
   Multiply: x²·(x−2) = x³−2x². Subtract: (x³−2x²+x−3)−(x³−2x²) = x−3.
Step 2: Leading term of remainder = x; leading term of d(x) = x. x÷x = 1. Write +1 in quotient.
   Multiply: 1·(x−2) = x−2. Subtract: (x−3)−(x−2) = −1.
Step 3: Remainder = −1, degree 0 < degree 1 of (x−2). STOP.
Quotient q(x) = x²+1, remainder r = −1.
Verify: (x−2)(x²+1)+(−1) = x³+x−2x²−2−1 = x³−2x²+x−3 ✓.

**Assessment primitive: P49**

PROBE: "Divide (x²+5x+6)÷(x+2)."
- CORRECT: "x²÷x=x; x·(x+2)=x²+2x; subtract: (x²+5x+6)−(x²+2x)=3x+6. Then 3x÷x=3; 3·(x+2)=3x+6; subtract: 0. Quotient=x+3, remainder=0." → proceed to A02.
- PARTIAL: correct first step, subtraction error → "First step is right: x. Subtraction: (x²+5x+6)−(x²+2x): x² terms cancel; 5x−2x=3x; constant stays 6. Remainder is 3x+6. Continue: 3x÷x=3; 3·(x+2)=3x+6; subtract 3x+6 from 3x+6 → 0."
- INCORRECT: remainder ≠ 0 and learner claims error → Repair with B01 (REMAINDER-MUST-BE-ZERO).
- NO_RESPONSE: "Model on integer division: 156÷12=13. Step 1: 12 goes into 15 once (1×12=12, subtract: 3); bring down 6 → 36; 12 goes into 36 three times. Same process: x²÷x=x, multiply x·(x+2), subtract, continue."

---

### TA-B01 — Repair for MC-1 (REMAINDER-MUST-BE-ZERO)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'polynomial division must produce remainder zero — a non-zero remainder means an error.' This is false. The polynomial Division Algorithm permits any remainder of degree less than the divisor."

**P41 — MISCONCEPTION DETECTOR**
"Integer division: 29÷7. What is the remainder?
(A) 0 — division always divides evenly.
(B) 1 — 29=7·4+1; the remainder is 1, which is less than 7."
[If A: learner holds MC-1 even for integers.]
"Now: (x+3)÷(x+1). Estimate the quotient and remainder before computing. Can the remainder be a nonzero constant?"

**P64 — CONCEPTUAL SHIFT**
"The Division Algorithm for polynomials states: for any p(x), d(x) (d≠0), there exist UNIQUE q(x) and r(x) such that p(x)=d(x)q(x)+r(x) with deg r < deg d. The key word is 'unique' — this always holds, with or without a zero remainder. A non-zero remainder is completely normal and correct. (x−c) divides p(x) evenly (r=0) ONLY when c is a root. In all other cases, r≠0."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Long division with missing term:

p(x) = x³+2x²−5x−6, d(x) = x−2.

(Long division — explicit steps):
Step 1: x³÷x=x². Multiply: x²(x−2)=x³−2x². Subtract: (x³+2x²)−(x³−2x²)=4x². Bring down: 4x²−5x.
Step 2: 4x²÷x=4x. Multiply: 4x(x−2)=4x²−8x. Subtract: (4x²−5x)−(4x²−8x)=3x. Bring down: 3x−6.
Step 3: 3x÷x=3. Multiply: 3(x−2)=3x−6. Subtract: (3x−6)−(3x−6)=0. STOP.
Quotient: x²+4x+3. Remainder: 0. So (x−2)(x²+4x+3)=x³+2x²−5x−6.
Factor quotient: x²+4x+3=(x+1)(x+3). Complete factorisation: p(x)=(x−2)(x+1)(x+3). Roots: x=2,−1,−3.

WORKED EXAMPLE 2 — Synthetic division (same problem):

d(x)=x−2, so c=2. Coefficients of p(x): [1, 2, −5, −6].

Synthetic array:
  2 |  1    2   −5   −6
    |       2    8    6
    |  1    4    3    0
        ↑ quotient ↑    ↑ remainder

Steps:
- Bring down 1.
- 1×2=2; write below 2; 2+2=4.
- 4×2=8; write below −5; −5+8=3.
- 3×2=6; write below −6; −6+6=0.
Quotient: [1,4,3] → x²+4x+3. Remainder: 0. Same result as WE1 — synthetic division is a compact version of long division.

REMAINDER THEOREM CONNECTION: p(2)=8+8−10−6=0 ✓ — the remainder equals p(c) when dividing by (x−c).

**Assessment primitive: P49**

PROBE: "Use synthetic division to divide (2x³−x+3)÷(x−1)."
- CORRECT: c=1; coefficients [2,0,−1,3] (include 0 for missing x² term). Array: bring down 2; 2×1=2, 0+2=2; 2×1=2, −1+2=1; 1×1=1, 3+1=4. Quotient: 2x²+2x+1, remainder: 4. Verify: p(1)=2−1+3=4 ✓. → proceed to A03.
- PARTIAL: correct but omits zero placeholder → "The coefficient of x² is 0 (no x² term in 2x³−x+3). The array must include this: [2,0,−1,3], not [2,−1,3]. Redo with four entries."
- INCORRECT: attempts synthetic division with c=−1 (from the subtraction sign) → "For divisor (x−1): x−c=x−1, so c=+1 (not −1). The divisor is x minus c; identify c by solving x−c=0 → x=c=1."
- NO_RESPONSE: "Write the coefficients of 2x³+0x²−x+3: [2,0,−1,3]. Write c=1 to the left. Bring down 2. Multiply 2×1=2; add to next coefficient: 0+2=2. Multiply 2×1=2; add: −1+2=1. Multiply 1×1=1; add: 3+1=4. Last entry is remainder; rest is quotient."

---

### TA-B02 — Repair for MC-2 (DIVIDE-WRONG-TERM)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'match the last term of the remainder with the last term of the divisor to find the next quotient term.' The algorithm matches LEADING TERMS at each step."

**P41 — MISCONCEPTION DETECTOR**
"In the step where you have remainder 4x²−5x, and divisor x−2: which term of the remainder do you divide by the leading term of (x−2)?
(A) −5x (the last term of the remainder).
(B) 4x² (the leading term of the remainder)."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"At each step of long division, the goal is to cancel the LEADING TERM of the current remainder. You achieve this by choosing a quotient term that, when multiplied by the leading term of d(x), matches that leading term. Always: divide (leading term of remainder) by (leading term of d(x)). Then multiply the ENTIRE divisor by this quotient term and subtract. The last terms take care of themselves."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Long division: any divisor d(x), any degree:
- Works for (x²+1), (2x−3), (x³+x+1) as divisors.
- Quotient and remainder follow the general algorithm.
- Slower and more error-prone for linear divisors, but universally applicable.

PAIR B — Synthetic division: ONLY for monic linear divisors (x−c):
- c is the root of d(x)=x−c (solve x−c=0 → x=c).
- Compact array carries only coefficients; must include 0 for every missing degree.
- CANNOT be used for 2x−3 directly (not monic). Convert: divide p(x) by (2x−3) by first dividing p by (x−3/2) then adjusting OR use long division.
- Cannot be used for x²+1 (not linear).

CONTRAST TABLE:
| Feature | Long division | Synthetic division |
|---|---|---|
| Applicable to | Any divisor d(x) | Only (x−c), c constant |
| Output | Explicit polynomial q(x), r(x) | Coefficient list + remainder |
| Remainder theorem | p(c)=r requires extraction | Last entry IS p(c) |
| Error risk | Subtraction sign errors | Missing zero placeholder |
| When to prefer | Non-linear or non-monic divisor | Linear monic divisor |

REMAINDER THEOREM AS QUICK EVALUATION:
Instead of long division, evaluate p(c) directly to find the remainder when dividing by (x−c).
Example: p(x)=x⁴−3x+2 ÷ (x−1). p(1)=1−3+2=0 → remainder=0; x=1 is a root.
Example: p(x)=x³+2 ÷ (x−1). p(1)=1+2=3 → remainder=3 without full division.

**Assessment primitive: P49**

PROBE: "Divide (x³+x²−4x−4)÷(x+1). Which method is better? Execute it."
- CORRECT: "Divisor is x+1=x−(−1), so c=−1. Use synthetic division. Coefficients [1,1,−4,−4]. c=−1: bring down 1; 1×(−1)=−1+1=0; 0×(−1)=0+(−4)=−4; −4×(−1)=4+(−4)=0. Quotient x²+0x−4=x²−4=(x+2)(x−2); remainder 0. Full factorisation: (x+1)(x+2)(x−2)." → proceed to A04.
- PARTIAL: sets up synthetic with wrong c → "Divisor is x+1=x−(−1). To get c, solve x−c=0: c=−1 (NEGATIVE one). In synthetic division: c=−1 goes in the box. Redo with c=−1."
- INCORRECT: tries to use synthetic for non-monic after seeing (x+1) → address B03 if learner tried c=1 (treating x+1 as x−(−1) but forgetting −1).
- NO_RESPONSE: "Divisor x+1=(x−(−1)) is linear and monic → use synthetic with c=−1. Coefficients: 1 (x³), 1 (x²), −4 (x), −4 (constant). Run the array."

---

### TA-B03 — Repair for MC-3 (SYNTHETIC-FOR-ANY-DIVISOR)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'synthetic division works for any divisor.' Synthetic division applies ONLY when the divisor is exactly (x−c): monic (leading coefficient 1) and linear (degree 1)."

**P41 — MISCONCEPTION DETECTOR**
"Can you use synthetic division for (2x+1)?
(A) Yes — it's linear, so synthetic works.
(B) No — 2x+1 is not monic (leading coefficient is 2, not 1)."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Synthetic division encodes one specific case of long division: divisor = x−c. The 'c' in the scheme IS the ROOT of the divisor. For 2x+1=0 → x=−1/2; this gives c=−1/2, but the divisor is 2x+1 = 2(x+1/2), not x+1/2. You would need to divide by 2(x+1/2) = 2×(x−(−1/2)), which introduces a factor of 2 that synthetic division doesn't handle. Use long division for non-monic or higher-degree divisors. Alternatively, divide p(x) by (x+1/2) synthetically, then handle the leading coefficient of the divisor separately — an advanced technique not required here."

→ Return to A03.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (REMAINDER-MUST-BE-ZERO)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (DIVIDE-WRONG-TERM)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (SYNTHETIC-FOR-ANY-DIVISOR)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Divide (x⁴−1)÷(x−1) by synthetic division. What do you notice about the factorisation?"
[Expected: coefficients [1,0,0,0,−1], c=1. Array: 1; 1×1=1,0+1=1; 1×1=1,0+1=1; 1×1=1,0+1=1; 1×1=1,−1+1=0. Quotient: x³+x²+x+1, remainder 0. Factorisation: (x−1)(x³+x²+x+1)=(x−1)(x²+1)(x+1). Note: xⁿ−1 factors as (x−1)(xⁿ⁻¹+…+x+1) — the geometric series sum.]

**Day 10 prompt:**
"Without dividing, find the remainder when p(x)=x¹⁰⁰−3x+2 is divided by (x−1) and by (x+1)."
[Expected: p(1)=1−3+2=0 → remainder 0 when divided by (x−1); x=1 is a root. p(−1)=(−1)¹⁰⁰−3(−1)+2=1+3+2=6 → remainder 6 when divided by (x+1). Remainder Theorem: no division needed.]

**Day 30 prompt:**
"Prove or disprove: if p(c)=0 and p'(c)=0 (where p' is the derivative), then (x−c)² divides p(x)."
[Expected: TRUE. If (x−c) divides p(x), then p(x)=(x−c)q(x). Then p'(x)=q(x)+(x−c)q'(x). At x=c: p'(c)=q(c)+0=q(c). So p'(c)=0 → q(c)=0 → (x−c) divides q(x) → q(x)=(x−c)r(x) → p(x)=(x−c)²r(x). So (x−c)² divides p(x) iff x=c is a double root (multiplicity ≥ 2).]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.polynomial-operations — polynomial addition, subtraction, multiplication; leading term identification; these operations are used at every step of long division

**Unlocked blueprints:**
- math.alg.remainder-theorem — formalises p(c)=r; corollary: factor theorem (x−c | p iff p(c)=0)
- math.alg.factor-theorem — (x−c) divides p(x) iff p(c)=0; systematic root-finding

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (REMAINDER-MUST-BE-ZERO) must be addressed at first occurrence because learners who expect zero remainder will redo correct work until they introduce errors. Establish early: "remainder 0" means d(x) divides p(x) exactly; non-zero remainder is the general case.

**Zero placeholder discipline:** Synthetic division requires a coefficient for EVERY degree from n down to 0. Missing terms have coefficient 0 and must be written explicitly. Enforce this habit from the first synthetic division example.

**Remainder theorem as a verification tool:** After any division by (x−c), verify the remainder by computing p(c) directly. This two-step check (divide → substitute) catches errors quickly and reinforces the theorem as a live tool, not a textbook formula.

**Method selection rule:** Linear monic divisor (x−c) → prefer synthetic; any other divisor → use long division. State this explicitly as a decision rule.

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
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (synthetic division of x³+x²−4x−4 by x−2, full factorisation)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All mathematical content (Division Algorithm, long division, synthetic division, Remainder Theorem) consistent with KG description and standard algebra pedagogy; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Divide (x²+5x+6)÷(x+2). State the quotient and remainder."
[Expected: quotient=x+3, remainder=0. (x+2)(x+3)=x²+5x+6 ✓.]

**Item 2:**
"Use synthetic division to find the quotient and remainder for (2x³−x+3)÷(x−1). (Note: include a placeholder for the missing x² term.)"
[Expected: c=1; coefficients [2,0,−1,3]. Array: 2; 2×1=2,0+2=2; 2×1=2,−1+2=1; 1×1=1,3+1=4. Quotient: 2x²+2x+1, remainder: 4. Verify: p(1)=2−1+3=4 ✓.]

**Item 3:**
True or False: "For polynomial long division, the remainder must always be zero."
[Expected: FALSE. The remainder can be any polynomial of degree less than the divisor. Zero remainder means d(x) divides p(x) exactly — a special case, not the general rule.]

**Item 4:**
"Use synthetic division to divide (x³−x²−x+1)÷(x−1)."
[Expected: c=1; coefficients [1,−1,−1,1]. Array: 1; 1×1=1,−1+1=0; 0×1=0,−1+0=−1; −1×1=−1,1+(−1)=0. Quotient: x²+0x−1=x²−1, remainder: 0. Factorisation: (x−1)(x²−1)=(x−1)(x+1)(x−1)=(x−1)²(x+1).]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Divide p(x) = x³+x²−4x−4 by (x−2).

(a) Use synthetic division with c=2. Show the full array.
(b) State the quotient q(x) and remainder r.
(c) Verify using the Remainder Theorem: compute p(2) directly. Does it match r?
(d) If r=0, factor p(x) completely."

[Expected:
(a) c=2; coefficients [1,1,−4,−4]. Array:
  2 |  1    1   −4   −4
    |       2    6    4
    |  1    3    2    0
(b) Quotient: x²+3x+2. Remainder: r=0.
(c) p(2)=8+4−8−4=0 ✓. Matches r=0.
(d) r=0 → (x−2) divides p(x). q(x)=x²+3x+2=(x+1)(x+2). Full factorisation: p(x)=(x−2)(x+1)(x+2).]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (b) gives quotient x²+3x+2 and remainder 0 correctly, and (c) confirms p(2)=0, 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can execute both long division and synthetic division, accepts non-zero remainders, and applies the Remainder Theorem.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or P76 (stops at non-zero remainder or claims error): → TA-B01 (REMAINDER-MUST-BE-ZERO repair), then re-gate
- FAIL on Item 2 (quotient term computed from wrong terms): → TA-B02 (DIVIDE-WRONG-TERM repair), then re-gate
- FAIL on Item 2 (omits zero placeholder): → return to A02; emphasise zero-placeholder rule; re-gate
- FAIL on multiple items: → B01 then B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to divide polynomials using both long division and synthetic division, and to apply the Remainder Theorem.

Key anchors to carry forward:
- Division Algorithm: p(x)=d(x)q(x)+r(x) with deg r < deg d. Non-zero remainder is normal.
- Long division: match and cancel LEADING TERMS at each step.
- Synthetic division: applies ONLY to monic linear divisors (x−c); last array entry = p(c) = remainder.
- Remainder Theorem: dividing p(x) by (x−c) gives remainder p(c). Zero remainder ↔ c is a root.

Next concepts: math.alg.remainder-theorem, math.alg.factor-theorem — building directly on this Remainder Theorem connection to identify roots and factors."
