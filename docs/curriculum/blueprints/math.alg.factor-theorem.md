# Teaching Blueprint — math.alg.factor-theorem

## Component 0 — Metadata
concept_id: math.alg.factor-theorem
concept_name: Factor Theorem
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 3
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.alg.remainder-theorem]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** (x−a) is a factor of polynomial p(x) if and only if p(a)=0. This is the Remainder Theorem at the special case r=0: the remainder equals p(a), and the remainder being zero is exactly what it means to divide without remainder (i.e., to be a factor). Application: test potential roots by evaluating p(a); when p(a)=0, divide p(x) by (x−a) to obtain the quotient and continue factorising.

**Conceptual progression:**
1. Factor Theorem statement: p(a)=0 ↔ (x−a)|p(x).
2. Root-finding strategy: test integer divisors of the constant term (Rational Root candidates) via the theorem; first success gives the first linear factor.
3. Deflation: once (x−a) is found, divide p(x)÷(x−a) to get a lower-degree quotient q(x); apply the theorem to q(x) for next root.
4. Complete factorisation: repeated application of steps 2–3 until q(x) is linear or irreducible quadratic.
5. Connection to Remainder Theorem: Factor Theorem IS the Remainder Theorem with r=0. No new machinery — just the special case with important consequences.

**CPA arc (entry: P):**
- Pictorial: table of trial evaluations p(a) for several a-values; root identified; synthetic division array showing q(x); tree of successive factorisations.
- Abstract: p(a)=0 ↔ (x−a)|p(x); p(x)=(x−a)q(x).

**Prior knowledge activated:** Remainder Theorem (math.alg.remainder-theorem) — p(a) is the remainder when p(x)÷(x−a); synthetic division; polynomial evaluation.

---

## Component 2 — Misconception Registry

### MC-1: SUBSTITUTE-WRONG-SIGN [FOUNDATIONAL]
**Description:** For a divisor of the form (x+c), the learner tests p(c) instead of p(−c). Sees "(x+3)" and computes p(3) instead of p(−3), producing a wrong remainder and a false positive/negative factor test.
**Surface form:** "Testing (x+2): p(2)=8+4−2+4=14≠0, so (x+2) is not a factor."
**Root cause:** Identical to the Remainder Theorem misconception: the learner reads the sign of the constant term rather than solving (x+c)=0 for x. For (x+c): solving x+c=0 gives x=−c, not x=c.
**Trigger condition:** Any factor test where the divisor has a positive constant (equivalently, a negative root is being tested).
**Repair target:** TA-B01.

### MC-2: FACTOR-FOUND-MEANS-DONE
**Description:** Learner identifies one root a and writes p(x)=(x−a) as the complete factorisation, ignoring the remaining quotient q(x) of degree n−1. Does not perform deflation (dividing p(x) by the found factor to obtain q(x) for further analysis).
**Surface form:** "p(2)=0 so (x−2) is a factor and the factorisation is just (x−2)."
**Root cause:** The theorem is understood as "find a factor," not "find a factor AND reduce the degree." The iterative deflation process was never shown or practised.
**Trigger condition:** Any polynomial of degree ≥ 2 where multiple factors need to be found.
**Repair target:** TA-B02.

### MC-3: RATIONAL-ROOT-NOT-NEEDED
**Description:** Learner tries random values for a without a systematic strategy; misses roots or wastes time on fractions and irrationals. Does not use the Rational Root candidates (divisors of constant term ÷ divisors of leading coefficient) to restrict the search.
**Surface form:** "I'll try a=5, a=7, a=−4 … none of these work. I give up."
**Root cause:** The Rational Root theorem was not connected to the Factor Theorem as the search strategy. Learner treats trial-and-error as open-ended.
**Trigger condition:** Any cubic or higher-degree polynomial with integer coefficients where roots are not immediately obvious.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "State the Remainder Theorem. What does p(a)=0 tell you about (x−a) and p(x)?" If the learner recalls remainder=p(a) and identifies that p(a)=0 means (x−a)|p(x), proceed to A01. This confirms that the Factor Theorem is understood as a corollary, not a new concept.

**Scaffolding ladder:**
- Rung 1 (pictorial): table with candidate a-values, p(a) evaluations, and a "factor?" column; learner fills it in for a given cubic.
- Rung 2 (structured): first root found and marked; synthetic division array provided with learner completing the entries to get q(x); factoring q(x) by standard methods.
- Rung 3 (full apply): learner performs the complete sequence (rational root candidates → trial evaluation → synthetic division → factor q(x)) independently.

**Pacing note:** h=3 estimated hours; A01 + A02 in sessions 1–2; mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Integer divisibility.
"Does 3 divide 147? Test: 147÷3=49, no remainder → 3|147. Equivalently: 147 mod 3 = 0."
Strategy: to find factors of 147, try small primes — 2 (no: odd), 3 (yes: 147÷3=49), then factor 49=7×7.

TARGET DOMAIN: Polynomial factorisation.
"Does (x−2) divide p(x)=x³−7x+6? Test: p(2)=8−14+6=0 → (x−2)|p(x). Divide: x³−7x+6=(x−2)(x²+2x−3)=(x−2)(x+3)(x−1)."
Strategy: to find factors of p(x), try integer roots a that divide the constant term (6 here: ±1,±2,±3,±6).

BRIDGE MAPPING:
| Integer case | Polynomial case |
|---|---|
| Test 3|147 by checking 147 mod 3 = 0 | Test (x−a)|p(x) by checking p(a)=0 |
| 147÷3=49 (quotient) | p(x)÷(x−a)=q(x) (quotient polynomial) |
| Candidates: prime factors of 147 | Candidates: divisors of constant term of p |
| 147=3×7×7 (complete) | p(x)=(x−a)·q(x), continue with q(x) |

SIGN RULE (from Remainder Theorem): to find a, solve the divisor = 0.
- (x−2)=0 → a=2, test p(2).
- (x+3)=0 → a=−3, test p(−3).

**Assessment primitive: P49**

PROBE: "Is (x+3) a factor of p(x) = x³+3x²−4x−12?"
- CORRECT: "a=−3; p(−3)=−27+27+12−12=0 → (x+3) IS a factor. Divide: x³+3x²−4x−12=(x+3)(x²−4)=(x+3)(x−2)(x+2)." → proceed to A02.
- PARTIAL: correct p(−3)=0 conclusion but stops without factoring fully → "Good: (x+3) is a factor. Now divide p(x) by (x+3): use synthetic with c=−3. Coefficients [1,3,−4,−12]. Quotient x²−4=(x−2)(x+2)."
- INCORRECT: tests p(3)=27+27−12−12=30≠0 and concludes not a factor → Repair with B01 (SUBSTITUTE-WRONG-SIGN). "For (x+3)=0, solve: x=−3, not +3."
- NO_RESPONSE: "Solve (x+3)=0: x=−3. Compute p(−3)=(−3)³+3(−3)²−4(−3)−12=−27+27+12−12=0. Since p(−3)=0, (x+3) is a factor."

---

### TA-B01 — Repair for MC-1 (SUBSTITUTE-WRONG-SIGN)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'for (x+3), test p(3).' The Factor Theorem uses the root of the divisor: solve (x+3)=0 → x=−3. Test p(−3), not p(3)."

**P41 — MISCONCEPTION DETECTOR**
"For divisor (x+5), which value of a do you test?
(A) a=5, because the constant in (x+5) is 5.
(B) a=−5, because solving x+5=0 gives x=−5."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The Factor Theorem says (x−a) is a factor when p(a)=0. The value a is the ROOT of the divisor: the x that makes the divisor equal zero. For (x+5)=(x−(−5)): a=−5. For (x−7): a=+7. Reliable rule: 'write the divisor in the form (x−□); whatever is in the □ is a.' (x+5) = (x−(−5)): □=−5. Never read the sign directly; always solve divisor=0."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Full factorisation by repeated application:
p(x) = x³−6x²+11x−6.
Constant term: 6. Integer divisor candidates: ±1, ±2, ±3, ±6.
Test a=1: p(1)=1−6+11−6=0 ✓. First factor: (x−1).
Deflate: synthetic with c=1, coefficients [1,−6,11,−6].
Array: 1; 1×1=1, −6+1=−5; −5×1=−5, 11−5=6; 6×1=6, −6+6=0.
Quotient: x²−5x+6. Remainder: 0.
Factor quotient: x²−5x+6=(x−2)(x−3).
Complete factorisation: p(x)=(x−1)(x−2)(x−3). Roots: 1,2,3.

WORKED EXAMPLE 2 — Cubic with one irrational quotient:
q(x) = x³−x²−x−2.
Constant: 2. Candidates: ±1, ±2.
p(1)=1−1−1−2=−3≠0. p(−1)=−1−1+1−2=−3≠0. p(2)=8−4−2−2=0 ✓. Factor: (x−2).
Deflate: c=2, coefficients [1,−1,−1,−2].
Array: 1; 2, −1+2=1; 2, −1+2=1; 2, −2+2=0.
Quotient: x²+x+1. Discriminant: 1−4=−3<0 → irreducible over ℝ.
Complete factorisation: q(x)=(x−2)(x²+x+1). No further real roots.

FACTORISATION PROCEDURE (algorithmic):
1. List divisors of the constant term (and leading coefficient if non-monic) as candidates.
2. Evaluate p(a) for each candidate until p(a)=0.
3. Divide p(x) by (x−a) using synthetic division → quotient q(x).
4. Repeat from step 1 with q(x) until degree ≤ 2.
5. Factor any remaining quadratic by discriminant/formula.

**Assessment primitive: P49**

PROBE: "Fully factorise p(x) = x³+2x²−x−2."
- CORRECT: "Constant term: 2. Try a=1: p(1)=1+2−1−2=0 ✓. Divide: c=1, [1,2,−1,−2]. Quotient x²+3x+... wait: 1; 1,3; 3,2; 2,0 → quotient x²+3x+2=(x+1)(x+2). Full: (x−1)(x+1)(x+2)." [Note: any correct factorisation order valid.]
- PARTIAL: finds one factor, stops → "Good — (x−1) is a factor. But you must now divide p(x) by (x−1) to get the quotient q(x), then factor q(x) to complete the factorisation. The theorem gives one factor at a time — continue until degree 1 or irreducible."
- INCORRECT: tries large candidates before small ones (inefficient); eventually times out → Repair with B03 (RATIONAL-ROOT-NOT-NEEDED).
- NO_RESPONSE: "List candidates: ±1, ±2. Test a=1: 1+2−1−2=0. (x−1) is a factor. Synthetic: [1,2,−1,−2] with c=1. Quotient: x²+3x+2=(x+1)(x+2). Full: (x−1)(x+1)(x+2)."

---

### TA-B02 — Repair for MC-2 (FACTOR-FOUND-MEANS-DONE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'finding p(a)=0 and stating (x−a) is a factor is the complete factorisation.' This is only the FIRST step. A cubic has degree 3 and generically THREE linear factors; finding one reduces it to a quadratic that still needs to be factored."

**P41 — MISCONCEPTION DETECTOR**
"p(x)=x³−6x²+11x−6 and you've found p(1)=0, so (x−1) is a factor. Is the factorisation now complete?
(A) Yes — (x−1) is the answer.
(B) No — divide p(x) by (x−1) to get a quadratic q(x), then factor q(x) to find two more roots."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The factor theorem gives: p(x)=(x−1)·q(x) where q(x) is the quotient polynomial. The degree of q is deg(p)−1=2. q(x) may have further roots and further linear factors. DEFLATION means finding q(x) by division, then factoring q(x) separately. Only when q(x) is linear (degree 1) or irreducible quadratic (negative discriminant) is the factorisation complete. For a degree-3 polynomial: one Factor Theorem application + one quadratic factoring gives the full answer."

→ Return to A02.

---

### TA-B03 — Repair for MC-3 (RATIONAL-ROOT-NOT-NEEDED)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'try random values for a until p(a)=0.' For polynomials with integer coefficients, the Rational Root Theorem gives a finite list of candidates: divisors of the constant term divided by divisors of the leading coefficient. Always start there."

**P41 — MISCONCEPTION DETECTOR**
"For p(x)=x³−3x²−4x+12, which values of a are rational root candidates?
(A) Any integer: 1,2,3,4,5,6,7,8,9,10,11,12, …
(B) Only the divisors of 12 divided by divisors of 1: ±1,±2,±3,±4,±6,±12."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Rational Root Theorem: if p(x)=aₙxⁿ+…+a₀ has a rational root p/q (in lowest terms), then p|a₀ and q|aₙ. For monic polynomials (aₙ=1), q=1, so all rational roots are integers dividing the constant term. For p(x)=x³−3x²−4x+12: constant=12, leading=1. Candidates: ±1,±2,±3,±4,±6,±12. Test in order of size: a=1: 1−3−4+12=6≠0. a=−1: −1−3+4+12=12≠0. a=2: 8−12−8+12=0 ✓. Found root a=2 in the third try. Always have a finite, ordered list."

→ Return to A02.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (SUBSTITUTE-WRONG-SIGN)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (FACTOR-FOUND-MEANS-DONE)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (RATIONAL-ROOT-NOT-NEEDED)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Factorise p(x) = 2x³+x²−5x+2 completely over ℝ."
[Expected: Leading=2, constant=2. Rational candidates: ±1,±2,±1/2. p(1)=2+1−5+2=0 ✓. Divide by (x−1): synthetic [2,1,−5,2] c=1 → quotient 2x²+3x−2=(2x−1)(x+2). Full: (x−1)(2x−1)(x+2). Roots: 1, 1/2, −2.]

**Day 10 prompt:**
"p(x) is a monic cubic with roots 2, −1, and 3. Write p(x) in expanded form."
[Expected: p(x)=(x−2)(x+1)(x−3). Expand: (x−2)(x+1)=x²−x−2; then (x²−x−2)(x−3)=x³−3x²−x²+3x−2x+6=x³−4x²+x+6.]

**Day 30 prompt:**
"Show that xⁿ−aⁿ is always divisible by (x−a) for any positive integer n, using the Factor Theorem."
[Expected: Let p(x)=xⁿ−aⁿ. Evaluate p(a)=aⁿ−aⁿ=0. By Factor Theorem, (x−a)|p(x). This holds for all n≥1. (Bonus: the quotient is xⁿ⁻¹+axⁿ⁻²+…+aⁿ⁻¹ — geometric sum.)]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.remainder-theorem — p(a) is the remainder when p(x)÷(x−a); the Factor Theorem is the Remainder Theorem restricted to r=0; synthetic division for deflation

**Unlocked blueprints:**
- math.alg.polynomial-roots — complete root-finding strategy for polynomials; multiplicity of roots; relationship between roots and coefficients (Vieta's formulas)

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (SUBSTITUTE-WRONG-SIGN) is the same error as in the Remainder Theorem and carries over directly. Address it at first occurrence with the same fix: "solve divisor=0; use that solution."

**Deflation as the key skill:** The Factor Theorem alone is a single-step tool; its power comes from iterative deflation. Present deflation explicitly as a second algorithm step that must follow every successful factor test. Learners who understand deflation see the Factor Theorem as the engine of polynomial factorisation, not just a root-detection test.

**Complete factorisation criterion:** A factorisation is complete when no remaining factor has degree ≥ 2 with real roots. Check: (1) all factors are linear (x−a) or (2) any quadratic factor has negative discriminant (irreducible over ℝ).

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A03 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A03 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel polynomial (x³+x²−4x−4 ÷ factor test and full factorisation)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: Factor Theorem statement, deflation procedure, Rational Root Theorem, and all polynomial evaluations consistent with standard algebra; p(x)=(x−1)(x−2)(x−3) and q(x)=(x−2)(x²+x+1) verified

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A03 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Is (x−3) a factor of p(x) = x³−4x²+x+6?"
[Expected: p(3)=27−36+3+6=0 ✓. Yes, (x−3) is a factor. Quotient: x²−x−2=(x−2)(x+1). Full: (x−3)(x−2)(x+1).]

**Item 2:**
"Is (x+2) a factor of q(x) = x³+3x²+3x+1?"
[Expected: Divisor (x+2): a=−2. q(−2)=−8+12−6+1=−1≠0. No, (x+2) is not a factor. (q(x)=(x+1)³.)]

**Item 3:**
"Fully factorise r(x) = x³−2x²−5x+6."
[Expected: Candidates: ±1,±2,±3,±6. r(1)=1−2−5+6=0. Divide by (x−1): quotient x²−x−6=(x−3)(x+2). Full: (x−1)(x−3)(x+2).]

**Item 4:**
True or False: "If p(−3)=0 then (x+3) is a factor of p(x)."
[Expected: TRUE. p(−3)=0 means the remainder when p(x)÷(x−(−3))=p(x)÷(x+3) is 0. By the Factor Theorem, (x+3)=(x−(−3)) is a factor.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Let p(x) = x³+x²−4x−4.

(a) Use the Factor Theorem to find one factor of p(x). Show the factor test.
(b) Use synthetic division to find the quotient after dividing by your factor.
(c) Fully factorise p(x) over ℝ."

[Expected:
(a) Candidates: ±1,±2,±4. p(1)=1+1−4−4=−6≠0. p(−1)=−1+1+4−4=0 ✓. Factor: (x+1)=(x−(−1)).
(b) Synthetic with c=−1, coefficients [1,1,−4,−4]:
    −1 | 1   1  −4  −4
       |    −1   0   4
       | 1   0  −4   0
Quotient: x²−4.
(c) x²−4=(x−2)(x+2). Full factorisation: p(x)=(x+1)(x−2)(x+2).]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) correctly identifies (x+1) or another valid first factor with the factor test shown, (b) gives the correct quotient, and (c) gives the correct complete factorisation; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can test factors, identify correct substitution values, perform deflation, and complete the factorisation of a cubic.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Items 1/2 with wrong sign substitution: → TA-B01 (SUBSTITUTE-WRONG-SIGN), then re-gate
- FAIL on Item 3 or P76(c) (partial factorisation only): → TA-B02 (FACTOR-FOUND-MEANS-DONE), then re-gate
- FAIL on Item 4 (FALSE): → return to A01; re-clarify Factor Theorem statement and sign; re-gate
- FAIL on Item 3 (no systematic search): → TA-B03 (RATIONAL-ROOT-NOT-NEEDED); re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to apply the Factor Theorem to identify factors, perform deflation, and completely factorise polynomials.

Key anchors to carry forward:
- Factor Theorem: p(a)=0 ↔ (x−a)|p(x). The value a solves the divisor = 0.
- Deflation: after finding (x−a), divide p(x)÷(x−a) synthetically to get q(x); continue factoring q.
- Rational Root candidates: divisors of constant term ÷ divisors of leading coefficient.
- Factorisation is complete when all remaining factors are linear or irreducible quadratic.

Next concept: math.alg.polynomial-roots — multiplicity of roots, repeated factors, connection to graph behaviour at roots."
