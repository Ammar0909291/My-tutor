# Teaching Blueprint — math.alg.factoring-gcf

## Component 0 — Metadata
concept_id: math.alg.factoring-gcf
concept_name: Factoring out the GCF
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: developing
bloom: apply
estimated_hours: 3
mastery_threshold: 0.9
CPA_entry_stage: C
requires: [math.alg.factoring]
cross_links: [math.nt.gcd]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The distributive law in reverse: a·b + a·c = a(b + c). To factor out the GCF from a polynomial expression, identify the largest factor (numerical and variable) common to every term, then write the expression as GCF × (remaining sum). The remaining terms inside the parentheses are each term divided by the GCF. Verification by expanding confirms correctness.

**Conceptual progression:**
1. GCF of integers: GCF(12, 8) = 4 because 4 is the largest integer dividing both 12 and 8.
2. GCF of monomials: GCF(6x³, 4x²) = 2x² — take GCF of numerical coefficients AND the lowest power of each shared variable.
3. Apply distributive law in reverse: 6x³ + 4x² = 2x²(3x + 2).
4. Multi-term expressions: apply GCF to all terms simultaneously; divide each term by the GCF.
5. Verification: expand GCF × (residual) and confirm it reproduces the original expression.

**CPA arc (entry: C):**
- Concrete: physical tile grouping — 12 red tiles and 8 blue tiles arranged into 4 equal groups of (3 red + 2 blue) mirrors 12 + 8 = 4(3 + 2).
- Pictorial: area model — rectangle with width = GCF and partitioned length (term 1 / GCF + term 2 / GCF).
- Abstract: GCF extraction algorithm — numerical GCF of coefficients times lowest shared variable power; then divide each coefficient by numerical GCF and each variable factor by the GCF variable part.

**Prior knowledge activated:** math.alg.factoring — systematic factoring strategy, including GCF as the first step; distributive law a(b+c) = ab+ac; monomial arithmetic (multiplying and dividing terms like 12x³ ÷ 4x²).

---

## Component 2 — Misconception Registry

### MC-1: MISSING-VARIABLE-IN-GCF [FOUNDATIONAL]
**Description:** Learner correctly identifies the numerical GCF of the coefficients but ignores the variable factor, leaving x-terms un-extracted.
**Surface form:** "6x² + 4x: numerical GCF is 2 → 2(3x² + 2x)." Correct: GCF = 2x → 2x(3x + 2).
**Root cause:** The learner focuses only on the integer GCF algorithm and does not extend it to variable factors; the variable part is treated as part of the "content" rather than as a factor to be extracted.
**Trigger condition:** Any expression where the variable factor contributes to the GCF (most polynomial GCF problems).
**Repair target:** TA-B01.

### MC-2: HIGHEST-POWER-IN-GCF
**Description:** Learner takes the highest power of the variable shared across terms rather than the lowest power.
**Surface form:** "4x³ + 8x²: common factor is x³ → x³(4 + 8x²/x³)." Correct: GCF includes x² (the lower power); x³ does not divide 8x².
**Root cause:** Confusion between LCM (highest powers, used for adding fractions) and GCF (lowest powers, used for factoring out). Learner applies the LCM strategy to GCF.
**Trigger condition:** Any expression where terms have different powers of the same variable.
**Repair target:** TA-B02.

### MC-3: QUOTIENT-ARITHMETIC-ERROR
**Description:** Learner correctly identifies the GCF but makes errors when dividing individual terms by the GCF, producing wrong residual terms inside the parentheses.
**Surface form:** "12x³ + 8x² = 4x(3x³ + 2x)" — divides numerically by 4 but fails to account for the x in the GCF when dividing the variable parts (12x³ ÷ 4x = 3x², not 3x³).
**Root cause:** The learner divides the numerical part of each term by the numerical GCF correctly but does not apply the subtraction of exponents rule for the variable part (x^m ÷ x^k = x^(m−k)).
**Trigger condition:** Any expression where the GCF contains a variable factor.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Compute GCF(12, 8) and GCF(x³, x²)." Correct responses (4; x²) confirm both the numerical GCF and the variable GCF algorithm from prerequisite knowledge. Follow up: "If GCF(12x³, 8x²) = 4x², what are 12x³ ÷ 4x² and 8x² ÷ 4x²?" (Expected: 3x and 2.) This primes division of monomials by the GCF before full extraction.

**Scaffolding ladder:**
- Rung 1 (concrete): tile grouping — split 12 red + 8 blue tiles into equal groups; confirm GCF = 4; write 12 + 8 = 4·3 + 4·2 = 4(3+2).
- Rung 2 (pictorial): area model with GCF as one dimension; label each partition with the quotient term.
- Rung 3 (abstract): full GCF extraction from 3-term polynomial; verify by expansion.

**Pacing note:** h=3 estimated hours; A01 + A02 in sessions 1–2; mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

CONCRETE ANCHOR (CPA entry = C):
"Imagine 12 red tiles and 8 blue tiles. You want to arrange them into equal groups (as many as possible):
  12 red ÷ 4 = 3 red per group; 8 blue ÷ 4 = 2 blue per group.
  Result: 4 groups, each containing (3 red + 2 blue).
  In arithmetic: 12 + 8 = 4·3 + 4·2 = 4(3 + 2).
The '4' is the GCF. Factoring it out means writing the sum as GCF × (what's left)."

SOURCE DOMAIN: Integer GCF extraction.
  "GCF(12, 18) = 6; factor out: 12 + 18 = 6·2 + 6·3 = 6(2 + 3).
   GCF(15, 25, 10) = 5; factor out: 15 + 25 + 10 = 5(3 + 5 + 2)."

TARGET DOMAIN: Polynomial GCF extraction.
  "GCF(6x², 4x) = ? Numerical: GCF(6,4) = 2. Variable: GCF(x², x) = x¹ (lowest power). Combined GCF = 2x.
   Factor out: 6x² + 4x = 2x·3x + 2x·2 = 2x(3x + 2)."

BRIDGE MAPPING:
| Integer | Polynomial | Rule |
|---|---|---|
| GCF(12, 8) = 4 | GCF(6x², 4x) = 2x | Numerical GCF × lowest variable power |
| 12 ÷ 4 = 3 | 6x² ÷ 2x = 3x | Divide coefficient; subtract exponent |
| 8 ÷ 4 = 2 | 4x ÷ 2x = 2 | Coefficient 4÷2=2; x¹÷x¹=x⁰=1 |
| 12 + 8 = 4(3 + 2) | 6x² + 4x = 2x(3x + 2) | Same structure |

STEP-BY-STEP ALGORITHM:
```
1. Find numerical GCF of all coefficients.
2. For each variable: lowest exponent across all terms is the variable's GCF exponent.
3. GCF = (numerical GCF) × (each variable raised to its GCF exponent).
4. Divide each term by the GCF to get the residual.
5. Write: original = GCF × (residual sum).
6. Verify: expand GCF × (residual); confirm original is recovered.
```

EXAMPLE: Factor 15x³y² + 10x²y³.
Step 1: GCF(15,10) = 5.
Step 2: x-GCF = x^min(3,2) = x²; y-GCF = y^min(2,3) = y².
Step 3: GCF = 5x²y².
Step 4: 15x³y² ÷ 5x²y² = 3x; 10x²y³ ÷ 5x²y² = 2y.
Step 5: 15x³y² + 10x²y³ = 5x²y²(3x + 2y).
Step 6: Verify: 5x²y²(3x) + 5x²y²(2y) = 15x³y² + 10x²y³ ✓.

**Assessment primitive: P49**

PROBE: "Factor 12x³ + 8x² by extracting the GCF. Show all steps."
- CORRECT: "GCF(12,8)=4; variable: min power of x is 2 → GCF=4x². 12x³÷4x²=3x; 8x²÷4x²=2. Result: 4x²(3x+2). Verify: 4x²·3x+4x²·2=12x³+8x² ✓." → proceed to A02.
- PARTIAL: "GCF=4 only → 4(3x³+2x²)" (MC-1: variable part missing) → Repair with B01. "The variable factor x² is also shared. Complete GCF = 4x²."
- INCORRECT: "GCF=4x³ → 4x³(3+2x²÷x³)" (MC-2: highest power) → Repair with B02. "GCF uses the LOWEST power of x. x³ does not divide 8x² (needs x at most x²). Use x²."
- NO_RESPONSE: "Step 1: GCF(12,8)=4. Step 2: min power of x in {x³,x²} is x². Step 3: GCF=4x². Step 4: 12x³÷4x²=3x; 8x²÷4x²=2. Step 5: 4x²(3x+2). Verify by expanding."

---

### TA-B01 — Repair for MC-1 (MISSING-VARIABLE-IN-GCF)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'GCF of 6x² and 4x is 2, because GCF(6,4)=2.' The GCF must account for BOTH numerical coefficients AND shared variable factors. GCF(6x², 4x) = 2x."

**P41 — MISCONCEPTION DETECTOR**
"GCF(8x³, 12x²). What is the correct GCF?
(A) GCF = 4 (only numerical part).
(B) GCF = 4x² (numerical GCF × common variable factor x^min(3,2))."
[If A: learner holds MC-1.]
"Does x² divide both 8x³ and 12x²? Check: 8x³ ÷ x² = 8x ✓; 12x² ÷ x² = 12 ✓. So x² IS a common factor."

**P64 — CONCEPTUAL SHIFT**
"The GCF of a set of monomials has two components: numerical and variable. For the variable part, use the LOWEST exponent that appears across all terms — that is the largest power that divides every term. Rule: GCF(x^a, x^b) = x^min(a,b). For 8x³ and 12x²: min(3,2) = 2 → x² is part of the GCF. Final GCF = 4x². Always check: does the claimed GCF divide EVERY term? If not, it's not the GCF."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Three-term polynomial with numerical and variable GCF:
Factor 18x⁴ − 12x³ + 6x² completely (GCF step only).

Step 1: GCF(18,12,6) = 6.
Step 2: Variable: min power of x in {x⁴, x³, x²} is x².
Step 3: GCF = 6x².
Step 4: Divide each term: 18x⁴÷6x²=3x²; −12x³÷6x²=−2x; 6x²÷6x²=1.
Step 5: 18x⁴ − 12x³ + 6x² = 6x²(3x² − 2x + 1).
Step 6: Verify: 6x²·3x²=18x⁴ ✓; 6x²·(−2x)=−12x³ ✓; 6x²·1=6x² ✓.

NOTE: The residual 3x²−2x+1 has discriminant 4−12=−8<0; it is irreducible over ℝ. The factorisation is complete.

---

WORKED EXAMPLE 2 — Negative leading coefficient and multi-variable GCF:
Factor −6x³y + 9x²y² − 3x²y (GCF step only).

Step 1: GCF(6,9,3) = 3. Convention: factor out a negative sign with the GCF when the leading term is negative: use GCF = −3x²y. This leaves positive leading term inside the parentheses.
Step 2: Variable x: min power in {x³, x², x²} = x². Variable y: min power in {y, y², y} = y. GCF = 3x²y (or −3x²y).

Using GCF = −3x²y:
Step 3: −6x³y ÷ (−3x²y) = 2x; 9x²y² ÷ (−3x²y) = −3y; −3x²y ÷ (−3x²y) = 1.
Step 4: −6x³y + 9x²y² − 3x²y = −3x²y(2x − 3y + 1).
Step 5: Verify: (−3x²y)(2x)=−6x³y ✓; (−3x²y)(−3y)=9x²y² ✓; (−3x²y)(1)=−3x²y ✓.

KEY CONTRAST between WE1 and WE2:
- WE1: all coefficients positive; straightforward GCF extraction.
- WE2: negative leading coefficient; convention is to factor out negative GCF to leave residual with positive leading coefficient; each residual term has its sign flipped.

**Assessment primitive: P49**

PROBE: "Factor 10x²y³ − 15xy² + 5xy. Show the GCF and the factored form. Verify."
- CORRECT: "GCF(10,15,5)=5; x: min(2,1,1)=1 → x; y: min(3,2,1)=1 → y. GCF=5xy. 10x²y³÷5xy=2xy²; −15xy²÷5xy=−3y; 5xy÷5xy=1. Result: 5xy(2xy²−3y+1). Verify: 5xy·2xy²=10x²y³ ✓; 5xy·(−3y)=−15xy² ✓; 5xy·1=5xy ✓." → proceed to A03.
- PARTIAL: correct GCF but quotient error (e.g., 10x²y³÷5xy=2x²y²) → "Subtract exponents: x²÷x=x^(2−1)=x; y³÷y=y^(3−1)=y². So 10x²y³÷5xy=2·x·y²=2xy²."
- INCORRECT: GCF=xy (misses factor of 5) → B01/B02 prompt. "GCF of coefficients 10,15,5 is 5. So GCF=5xy, not just xy."
- NO_RESPONSE: "Step 1: GCF(10,15,5)=5. Step 2: x-min(2,1,1)=x; y-min(3,2,1)=y. Step 3: GCF=5xy. Step 4: divide each term. Step 5: write result. Verify by expansion."

---

### TA-B02 — Repair for MC-2 (HIGHEST-POWER-IN-GCF)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'GCF uses the highest power of the shared variable.' This is the LCM rule, not the GCF rule. For GCF, use the LOWEST power — the one that divides every term."

**P41 — MISCONCEPTION DETECTOR**
"GCF(x³, x²). Can x³ divide x²?
(A) Yes — x³ divides anything.
(B) No — x² ÷ x³ = x^(2−3) = x^(−1), which is not a polynomial term."
[If A: learner holds MC-2.]
"What polynomial × x³ = x²? There is none with non-negative exponents. So x³ does NOT divide x²."

**P64 — CONCEPTUAL SHIFT**
"GCF(x^a, x^b) = x^min(a,b) because the GCF must divide BOTH terms. x^min(a,b) divides x^a (subtract exponents: min(a,b) ≤ a ✓) and divides x^b (min(a,b) ≤ b ✓). Any higher power x^k with k>min(a,b) would fail to divide the term with the lower exponent. Memory device: GCF = smallest (minimum exponent); LCM = largest (maximum exponent). For factoring out: always use GCF, always use minimum."

→ Return to A01.

---

### TA-B03 — Repair for MC-3 (QUOTIENT-ARITHMETIC-ERROR)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: '12x³ ÷ 4x = 3x³' (only the coefficient was divided). Dividing a monomial by another monomial requires dividing both the numerical parts AND the variable parts separately."

**P41 — MISCONCEPTION DETECTOR**
"Compute 12x³ ÷ 4x.
(A) 12÷4=3; carry x³ unchanged → 3x³.
(B) 12÷4=3; x³÷x=x^(3−1)=x² → 3x²."
[If A: learner holds MC-3.]
"Verify option (B): does 4x × 3x² = 12x³? Check: 4·3=12 ✓; x·x²=x³ ✓. So 4x × 3x² = 12x³ ✓."

**P64 — CONCEPTUAL SHIFT**
"Dividing monomials: (ax^m) ÷ (bx^k) = (a÷b)·x^(m−k). Both parts must be divided: coefficients by ordinary division, variable by subtracting exponents. Quick check: always verify by multiplying GCF × quotient to reconstruct the original term. If 4x × ? = 12x³, then ? = 12x³ ÷ 4x = 3x². After extracting GCF, always expand to check: GCF × residual = original. This catches quotient errors immediately."

→ Return to A02.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (MISSING-VARIABLE-IN-GCF)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (HIGHEST-POWER-IN-GCF)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B03 — Repair for MC-3 (QUOTIENT-ARITHMETIC-ERROR)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Factor completely by GCF: (a) 24a³b² − 16a²b³ + 8ab; (b) −15x⁴ + 10x³ − 5x²."
[Expected: (a) GCF=8ab; 8ab(3a²b−2ab²+1). Verify. (b) GCF=−5x²; −5x²(3x²−2x+1). Verify: −5x²·3x²=−15x⁴ ✓.]

**Day 10 prompt:**
"The expression 6x²y + 9xy² + 3xy factors as 3xy(2x + 3y + 1). A student claims GCF = xy (missing the factor of 3). Explain the error and give the correct GCF and factored form."
[Expected: GCF of coefficients 6,9,3 is 3, not 1. Correct GCF=3xy. If GCF=xy were used: xy(6x+9y+3) which is partially factored but not completely — 3 is still a common factor of 6,9,3 inside. Complete: 3xy(2x+3y+1).]

**Day 30 prompt:**
"Factor: p(x,y) = x^n·y^m + x^(n−1)·y^(m+1) for positive integers n,m with n≥1, m≥1. State the GCF and the factored form."
[Expected: GCF = x^(n−1)·y^m (minimum powers: min(n,n−1)=n−1; min(m,m+1)=m). p = x^(n−1)y^m(x + y). Verify: x^(n−1)y^m·x = x^n·y^m ✓; x^(n−1)y^m·y = x^(n−1)·y^(m+1) ✓.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.factoring — complete polynomial factoring strategy; GCF extraction is the first step of the systematic factoring algorithm; this blueprint provides a focused fluency drill on that single step

**Unlocked blueprints:** none directly (GCF fluency is a supporting skill for math.alg.factoring and downstream algebra topics).

**Cross-links:**
- math.nt.gcd — the formal number-theoretic definition of GCF/GCD (Euclidean algorithm, prime factorisation); this blueprint uses the GCF concept operationally; the GCD blueprint provides the theoretical foundation. math.nt.gcd is NOT a Tier 1 concept → P76 uses independence mode, not a cross-link probe.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (MISSING-VARIABLE-IN-GCF) is the most frequent error. It reveals that the learner does not yet think of variable factors as separable from the numerical factors. The concrete tile-grouping analogy in A01 grounds the idea that x² is itself a "group size" factor, just as 4 was in the integer example.

**Verification as core habit:** For developing-level learners, always expand the factored form to verify. This single habit catches MC-3 (quotient errors) and MC-2 (wrong power) at zero cost. Make it a non-negotiable step.

**Negative GCF convention:** When the leading coefficient is negative, factor out −|GCF| to obtain a conventional positive leading term inside. This is a style convention rather than a mathematical rule; acknowledge it but don't over-emphasise at the developing level.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 11 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07
- [x] V-3: CPA_entry_stage=C (developing difficulty); A01 opens with concrete tile-grouping anchor ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A03 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A03 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; math.nt.gcd is NOT Tier 1; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (4x⁴−12x³+8x²; not seen in P77)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.9 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: all GCF computations verified; exponent arithmetic (subtract exponents for division) correct; verification expansions confirmed

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A03 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.9 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Factor out the GCF: 6x² + 9x."
[Expected: GCF(6,9)=3; variable: min power of x is x. GCF=3x. 6x²÷3x=2x; 9x÷3x=3. Result: 3x(2x+3). Verify: 3x·2x=6x² ✓; 3x·3=9x ✓.]

**Item 2:**
"Factor out the GCF: 8x³y² − 12x²y³."
[Expected: GCF(8,12)=4; x: min(3,2)=2 → x²; y: min(2,3)=2 → y². GCF=4x²y². 8x³y²÷4x²y²=2x; −12x²y³÷4x²y²=−3y. Result: 4x²y²(2x−3y). Verify: 4x²y²·2x=8x³y² ✓; 4x²y²·(−3y)=−12x²y³ ✓.]

**Item 3:**
"Factor out the GCF: 5a²b + 10ab² + 15ab."
[Expected: GCF(5,10,15)=5; a: min(2,1,1)=1 → a; b: min(1,2,1)=1 → b. GCF=5ab. 5a²b÷5ab=a; 10ab²÷5ab=2b; 15ab÷5ab=3. Result: 5ab(a+2b+3). Verify: 5ab·a=5a²b ✓; 5ab·2b=10ab² ✓; 5ab·3=15ab ✓.]

**Item 4:**
"Identify the error: '4x³ + 8x² = 4x³(1 + 2x^{−1}).' What is the correct factored form?"
[Expected: Error — GCF should be 4x² (lowest variable power), not 4x³ (which does not divide 8x² leaving integer quotients). Correct: GCF=4x²; 4x³÷4x²=x; 8x²÷4x²=2. Result: 4x²(x+2). Verify: 4x²·x=4x³ ✓; 4x²·2=8x² ✓.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Factor out the GCF from 4x⁴ − 12x³ + 8x². Show all steps and verify by expanding."

[Expected:
Step 1: GCF(4,12,8) = 4.
Step 2: Variable x: min power in {x⁴, x³, x²} = x².
Step 3: GCF = 4x².
Step 4: 4x⁴÷4x²=x²; −12x³÷4x²=−3x; 8x²÷4x²=2.
Step 5: 4x⁴−12x³+8x² = 4x²(x²−3x+2).
Step 6: Verify: 4x²·x²=4x⁴ ✓; 4x²·(−3x)=−12x³ ✓; 4x²·2=8x² ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if GCF is correct (4x²), residual is correct (x²−3x+2), and verification is shown; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can reliably identify the full GCF (numerical + variable parts) and extract it from polynomial expressions, verifying by expansion.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (numeric GCF only, variable missed) or Item 4 (wrong power) or P76 GCF wrong: → TA-B01 or TA-B02 based on error type (MC-1 if variable missing; MC-2 if highest power used); re-gate
- FAIL on Items 2 or 3 or P76 (residual arithmetic wrong): → TA-B03 (QUOTIENT-ARITHMETIC-ERROR repair), then re-gate
- FAIL on Item 4 identification only (can't name the error): → return to A01 GCF-vs-LCM explanation; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated the ability to factor out the GCF from polynomial expressions reliably: identifying both the numerical GCF and the variable GCF (lowest shared exponent), dividing each term correctly, and verifying by expansion.

Key anchors to carry forward:
- GCF of monomials = (GCF of coefficients) × (each variable raised to its minimum exponent).
- Divide each term: coefficient ÷ numerical GCF; subtract exponents for each variable.
- Always verify: GCF × residual = original expression.
- GCF uses MINIMUM exponents; LCM uses maximum exponents — never confuse them.

This GCF skill is the first step of all systematic polynomial factoring."
