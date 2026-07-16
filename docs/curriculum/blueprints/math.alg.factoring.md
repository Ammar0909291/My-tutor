# Teaching Blueprint — math.alg.factoring

## Component 0 — Metadata
concept_id: math.alg.factoring
concept_name: Factoring Polynomials
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 15
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.alg.polynomial, math.alg.factor-theorem]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** Factoring a polynomial means expressing it as a product of lower-degree polynomial factors that are irreducible over ℝ. The process requires a systematic strategy: (1) always extract the greatest common factor (GCF) first; (2) recognise special patterns (difference of squares, difference/sum of cubes, perfect square trinomial); (3) factor trinomials by trial (monic) or ac-method (non-monic); (4) use the Factor Theorem to test roots for degree-3+ polynomials; (5) verify completeness — check each factor cannot be factored further.

**Conceptual progression:**
1. GCF extraction: identify and factor out the GCF of all terms as the mandatory first step.
2. Monic trinomial (x²+bx+c): find two integers with product c and sum b.
3. Non-monic trinomial (ax²+bx+c, a≠1): compute ac; find pair summing to b with product ac; split middle term; factor by grouping.
4. Special patterns: a²−b²=(a−b)(a+b); a²+2ab+b²=(a+b)²; a³−b³=(a−b)(a²+ab+b²); a³+b³=(a+b)(a²−ab+b²).
5. Irreducibility over ℝ: a²+b² (b≠0) is irreducible; negative discriminant confirms no real linear factors.
6. Higher-degree factoring: use the Factor Theorem to find rational roots (rational root theorem candidates), then deflate by synthetic division.

**CPA arc (entry: P):**
- Pictorial: factor trees for integers (24=2²×3) paired with polynomial factor diagrams; box method for non-monic trinomials.
- Abstract: systematic decision tree — GCF → count terms → identify pattern → factor; verify by expansion.

**Prior knowledge activated:** polynomial structure (math.alg.polynomial) — degree, coefficients, leading coefficient; Factor Theorem (math.alg.factor-theorem) — p(a)=0 ↔ (x−a) is a factor; synthetic division; substitution and evaluation.

---

## Component 2 — Misconception Registry

### MC-1: GCF-THEN-DONE [FOUNDATIONAL]
**Description:** Learner extracts the GCF and stops without factoring the remaining polynomial further.
**Surface form:** "6x³−21x²−12x = 3x(2x²−7x−4). Done — I've factored out the GCF."
**Root cause:** The GCF step feels like a complete factorisation because it is the dominant visible pattern; the learner does not check whether the residual factor (here 2x²−7x−4) is itself factorable.
**Trigger condition:** Any polynomial where the GCF step yields a composite residual factor.
**Repair target:** TA-B01.

### MC-2: AC-METHOD-ONLY-FOR-MONIC
**Description:** Learner applies the simple trial-factor method (find pair summing to b with product c) to non-monic trinomials, ignoring the leading coefficient; or applies the ac-method incorrectly by forgetting to divide by a.
**Surface form:** For 2x²+7x+3: "Product 3, sum 7: can't find two integers. I can't factor this."
**Root cause:** The monic method (product=c, sum=b) is learned first and over-generalised; the ac-method substitutes product=ac, sum=b, which differs from the monic case.
**Trigger condition:** Any trinomial with leading coefficient a ≠ 1.
**Repair target:** TA-B02.

### MC-3: IRREDUCIBLE-QUADRATIC-FACTORABLE
**Description:** Learner attempts to factor a²+b² (sum of squares) as a product of real linear factors, or factors x²+k (k>0) as (x+√k)(x−√k) by confusing sum with difference.
**Surface form:** "x²+9 = (x+3)(x−3)? No wait — (x+3i)(x−3i)? Let me try (x+3)(x+3)."
**Root cause:** The difference-of-squares pattern a²−b²=(a−b)(a+b) is over-generalised to the sum case; learners forget that a²+b² is irreducible over ℝ.
**Trigger condition:** Any polynomial containing a sum of squares as a residual factor.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Factor 12x² + 8x by extracting the GCF." Correct answer (4x(3x+2)) confirms GCF skill. Then: "Is 3x+2 factorable further?" (No — degree 1.) This establishes the completeness-check habit.

**Scaffolding ladder:**
- Rung 1 (pictorial): integer factor tree for 60 = 2²×3×5; parallel polynomial factor diagram for 6x²+12x = 6x(x+2); confirm "factored completely means no factor can be broken down further."
- Rung 2 (structured): monic trinomial x²+7x+10 → find pair (2,5): product 10, sum 7 → (x+2)(x+5).
- Rung 3 (full apply): non-monic and multi-step factoring independently.

**Pacing note:** h=15 estimated hours; A01 in sessions 1–2, A02 in sessions 3–6, A03 in sessions 7–10; mastery gate in sessions 11–12.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Integer factoring.
"Factor 60. Strategy: (1) pull smallest prime — 60 = 2·30; (2) repeat — 30 = 2·15; (3) repeat — 15 = 3·5. Complete: 60 = 2²·3·5. You stop only when every factor is prime — irreducible."

TARGET DOMAIN: Polynomial factoring.
"Factor 6x³+12x². Strategy: (1) GCF first — GCF(6x³,12x²) = 6x² → 6x²(x+2); (2) check residual (x+2) — degree 1, already irreducible. Complete: 6x²(x+2)."

BRIDGE MAPPING:
| Integer factoring | Polynomial factoring |
|---|---|
| Factor 60: pull GCF = 4 from 60 and 12? No — GCF must divide ALL. | GCF divides every term: GCF(6x³,12x²) = 6x². |
| "Prime" factor = no further factoring | "Irreducible" factor = no real linear factors |
| 60 = 4×15 (incomplete) vs 2²×3×5 (complete) | 6x³+12x² = 6x²(x+2) vs 3x(2x²+4x) (missed common factor) |
| Always check: can each factor be broken down? | Always check: degree ≥ 2 factors may factor further |

DECISION TREE FOR COMPLETE FACTORING:
```
1. Extract GCF from all terms.
2. Look at the residual factor:
   - 1 term: already irreducible.
   - 2 terms: check a²−b² → (a−b)(a+b); or a³±b³ cubes pattern.
   - 3 terms: check perfect square (a±b)²; else use ac-method (monic or non-monic).
   - 4 terms: try grouping.
3. Repeat step 2 on each new factor.
4. Stop when every factor is degree 1 or an irreducible degree-2 (negative discriminant).
```

SIGN-CHECK RULE for GCF:
- GCF is always positive (factor out the negative sign separately if needed).
- GCF of 12x³ and −8x² is 4x²; write 4x²(3x − 2), not −4x²(−3x+2).

**Assessment primitive: P49**

PROBE: "Factor 12x³ − 8x² + 4x completely. What is the GCF and what remains?"
- CORRECT: "GCF = 4x; 12x³−8x²+4x = 4x(3x²−2x+1). Check: discriminant of 3x²−2x+1 is 4−12=−8<0 → irreducible. Complete factorisation: 4x(3x²−2x+1)." → proceed to A02.
- PARTIAL: correct GCF but coefficient error in residual (e.g., 4x(3x²−2x+4)) → "Divide each term: 12x³÷4x=3x²; −8x²÷4x=−2x; 4x÷4x=1. Residual: 3x²−2x+1."
- INCORRECT: extracts 4 but misses x-factor: "4(3x³−2x²+x)" → B01 partial. "What is the lowest power of x common to all three terms? It is x¹. GCF = 4·x = 4x."
- NO_RESPONSE: "Step 1: numerical GCF of 12, 8, 4 is 4. Step 2: lowest power of x in 12x³, 8x², 4x is x¹. So GCF = 4x. Divide: 12x³÷4x=3x², −8x²÷4x=−2x, 4x÷4x=1. Result: 4x(3x²−2x+1)."

---

### TA-B01 — Repair for MC-1 (GCF-THEN-DONE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'After extracting the GCF, factoring is complete.' Extracting the GCF is the first step, not the last. After the GCF, every residual factor with degree ≥ 2 must be checked for further factoring."

**P41 — MISCONCEPTION DETECTOR**
"Factor 2x³ + 6x² − 8x.
GCF = 2x → 2x(x² + 3x − 4). Is the factorisation complete?
(A) Yes — I've pulled out the GCF.
(B) No — x²+3x−4 has degree 2 and may factor further."
[If A: learner holds MC-1.]
"Factor x²+3x−4. Product −4, sum 3: try (4)(−1)=−4, 4+(−1)=3 ✓. So x²+3x−4=(x+4)(x−1)."

**P64 — CONCEPTUAL SHIFT**
"Complete factoring is like a factor tree: you don't stop at the first branch. After pulling the GCF, ask: 'Is the residual factor irreducible?' For polynomials, a factor is irreducible if it is degree 1 OR a degree-2 with negative discriminant (b²−4ac < 0). If the residual is a degree-2 trinomial with b²−4ac ≥ 0, it CAN be factored further and MUST be. Rule: always test the residual; stop only at irreducible factors."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — GCF + non-monic trinomial (ac-method):
Factor 6x³ − 21x² − 12x completely.

Step 1 — GCF: terms are 6x³, −21x², −12x. GCF = 3x.
6x³−21x²−12x = 3x(2x²−7x−4).

Step 2 — Factor 2x²−7x−4 (non-monic: a=2, b=−7, c=−4):
Compute ac = 2×(−4) = −8.
Find two integers with product −8 and sum −7: try (−8)(+1) = −8 ✓; (−8)+(+1) = −7 ✓.
Split middle term: 2x²−8x+x−4.
Group: 2x(x−4)+1(x−4) = (2x+1)(x−4).

Step 3 — Assemble: 6x³−21x²−12x = 3x(2x+1)(x−4).

Step 4 — Verify: 3x·(2x+1)·(x−4). Check by expanding last two: (2x+1)(x−4) = 2x²−8x+x−4 = 2x²−7x−4. Then 3x(2x²−7x−4) = 6x³−21x²−12x ✓.

ANNOTATED ac-METHOD:
"(1) Multiply a·c. (2) Find pair (p,q) with pq=ac and p+q=b. (3) Rewrite bx as px+qx. (4) Factor by grouping — the binomial (?) will appear in both groups. (5) Write the result."

---

WORKED EXAMPLE 2 — Nested difference of squares:
Factor x⁴ − 81 completely.

Step 1 — GCF: GCF = 1 (no common factor).
Step 2 — 2 terms; check difference of squares: x⁴−81 = (x²)²−9² = (x²−9)(x²+9).
Step 3 — Factor x²−9: again difference of squares, 3² = 9. So x²−9 = (x−3)(x+3).
Step 4 — Factor x²+9: discriminant = 0²−4(1)(9) = −36 < 0. IRREDUCIBLE over ℝ.
Complete: x⁴−81 = (x−3)(x+3)(x²+9). THREE factors; cannot simplify further over ℝ.

KEY CONTRAST: WE1 requires GCF-first strategy with ac-method for the residual. WE2 requires recognising nested special patterns and stopping when a quadratic is irreducible (sum of squares).

**Assessment primitive: P49**

PROBE: "Factor 2x² + 5x + 3 completely."
- CORRECT: "ac = 6; pair (2)(3)=6, 2+3=5. Rewrite: 2x²+2x+3x+3 = 2x(x+1)+3(x+1) = (2x+3)(x+1)." → proceed to A03.
- PARTIAL: correct split but grouping error: "2x²+2x+3x+3 = 2x(x+1)+3(x+1) = ?" stuck → "(2x+3) and (x+1) are the two factors. Write (2x+3)(x+1). Verify: (2x+3)(x+1)=2x²+2x+3x+3=2x²+5x+3 ✓."
- INCORRECT: ignores leading coefficient, tries (x+3)(x+1)=x²+4x+3 ≠ 2x²+5x+3 → Repair B02 (AC-METHOD-ONLY-FOR-MONIC). "The leading coefficient is 2 ≠ 1; the simple monic method (find factors of c summing to b) doesn't apply here. Use the ac-method."
- NO_RESPONSE: "Step 1: a=2, c=3, ac=6. Step 2: find integers with product 6 and sum 5: (2)(3)=6, 2+3=5 ✓. Step 3: 2x²+2x+3x+3. Step 4: group: 2x(x+1)+3(x+1). Step 5: (2x+3)(x+1)."

---

### TA-B02 — Repair for MC-2 (AC-METHOD-ONLY-FOR-MONIC)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'For a trinomial ax²+bx+c, find two numbers with product c and sum b.' That works only when a=1 (monic). For a≠1, use the ac-method: find two numbers with product ac and sum b."

**P41 — MISCONCEPTION DETECTOR**
"Factor 3x²+7x+2. Two numbers with product 2 and sum 7: (2)(1)=2 but 2+1=3≠7. Stuck?
(A) This trinomial can't be factored.
(B) Use product = 3×2 = 6 and sum = 7: find (1)(6)=6, 1+6=7 ✓. Then split 7x as 1x+6x and group."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The ac-method generalises monic factoring. For ax²+bx+c: (1) compute ac; (2) find p,q with pq=ac and p+q=b; (3) rewrite bx as px+qx; (4) factor by grouping. For a=1 this reduces to the monic case (pq=c, p+q=b). Practice: 3x²+7x+2 → ac=6, pair (1,6): 3x²+x+6x+2 = x(3x+1)+2(3x+1) = (x+2)(3x+1). Verify: (x+2)(3x+1) = 3x²+x+6x+2 = 3x²+7x+2 ✓."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

CONTRAST 1 — Monic vs non-monic trinomials:
| Trinomial | Method | Factorisation |
|---|---|---|
| x²+5x+6 | Monic: product 6, sum 5 → (2)(3) | (x+2)(x+3) |
| 2x²+5x+3 | ac-method: ac=6, sum 5 → (2)(3); group | (2x+3)(x+1) |
| x²−4x+4 | Monic: product 4, sum −4 → (−2)(−2) | (x−2)² perfect square |
| 4x²−12x+9 | Check: (2x−3)²=4x²−12x+9 | (2x−3)² perfect square |

CONTRAST 2 — Difference vs sum of squares:
| Expression | Factorable over ℝ? | Result |
|---|---|---|
| x²−9 = x²−3² | YES — difference of squares | (x−3)(x+3) |
| x²+9 | NO — sum of squares; disc=−36<0 | Irreducible over ℝ |
| x⁴−16 = (x²)²−4² | YES — nested difference of squares | (x²−4)(x²+4) → (x−2)(x+2)(x²+4) |
| 4x²−25 = (2x)²−5² | YES | (2x−5)(2x+5) |

"x²+k for k>0 has no real roots (discriminant = −4k < 0). Do not try to factor it over ℝ."

CONTRAST 3 — Complete vs incomplete factorisation:
| Polynomial | Incomplete | Complete |
|---|---|---|
| 4x²−36 | 4(x²−9) | 4(x−3)(x+3) |
| 2x³+6x²−8x | 2x(x²+3x−4) | 2x(x+4)(x−1) |
| x³−x²−4x+4 | — (need grouping or Factor Theorem) | (x−2)(x+2)(x−1) [test: p(1)=1−1−4+4=0 → (x−1) factor; divide; etc.] |

"After every factoring step, ask: 'Can any factor be factored further?' Stop only at degree 1 or irreducible degree 2."

**Assessment primitive: P49**

PROBE: "Fully factor 4x² − 36."
- CORRECT: "GCF=4: 4(x²−9). Now x²−9=(x−3)(x+3). Complete: 4(x−3)(x+3)." → proceed to A04.
- PARTIAL: "4(x²−9)" stops there (MC-1 instance) → "x²−9 is a difference of squares: x²−3²=(x−3)(x+3). So 4(x²−9)=4(x−3)(x+3). Always factor each piece completely."
- INCORRECT: "4(x²+9)(x²−9)" or similar misidentification → "4x²−36: GCF=4 gives 4(x²−9), not 4(x²+9). Here the sign is minus. x²−9 is a difference of squares."
- NO_RESPONSE: "Step 1: GCF of 4x² and 36 is 4 → 4(x²−9). Step 2: x²−9 = (x−3)(x+3) by difference of squares (a=x, b=3). Final: 4(x−3)(x+3)."

---

### TA-B03 — Repair for MC-3 (IRREDUCIBLE-QUADRATIC-FACTORABLE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'x²+9 can be factored as (x+3)(x−3).' That is INCORRECT. (x+3)(x−3)=x²−9 (difference, not sum). x²+9 is a SUM of squares and is IRREDUCIBLE over ℝ."

**P41 — MISCONCEPTION DETECTOR**
"Expand (x+3)(x−3). What do you get?
(A) x²+9.
(B) x²−9."
[If A: learner has sign confusion.]
"(x+3)(x−3) = x²−3x+3x−9 = x²−9. The middle terms cancel but the constant is NEGATIVE 9. x²+9 has no real linear factors."

**P64 — CONCEPTUAL SHIFT**
"Diagnostic: compute the discriminant. For x²+9: b²−4ac = 0−4(1)(9) = −36 < 0. Negative discriminant → no real roots → no real linear factors → IRREDUCIBLE over ℝ. The difference-of-squares formula a²−b² = (a−b)(a+b) requires SUBTRACTION. a²+b² has no analogous real factoring identity. When you encounter x²+k (k>0) as a residual factor, stop — it is irreducible and the factorisation is complete."

→ Return to A03.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (GCF-THEN-DONE)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (AC-METHOD-ONLY-FOR-MONIC)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (IRREDUCIBLE-QUADRATIC-FACTORABLE)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Factor completely: (a) x³−8; (b) x³+27; (c) 6x²−5x−6."
[Expected: (a) (x−2)(x²+2x+4) [sum-of-cubes pattern a=x,b=2]; (b) (x+3)(x²−3x+9); (c) ac=−36; pair (−9)(4)=−36, −9+4=−5; rewrite 6x²−9x+4x−6=3x(2x−3)+2(2x−3)=(3x+2)(2x−3).]

**Day 10 prompt:**
"Factor x⁴−5x²+4 completely. Hint: let u=x²."
[Expected: u²−5u+4=(u−1)(u−4)=(x²−1)(x²−4)=(x−1)(x+1)(x−2)(x+2). Four linear factors.]

**Day 30 prompt:**
"A polynomial p(x) has roots at x=−2, x=1 (multiplicity 2), and x=3 with leading coefficient 2. Write p(x) in completely factored form. Then expand to standard form."
[Expected: p(x)=2(x+2)(x−1)²(x−3)=2(x+2)(x²−2x+1)(x−3). Expanding: 2(x+2)(x−3)(x²−2x+1)=2(x²−x−6)(x²−2x+1)=2(x⁴−2x³+x²−x³+2x²−x−6x²+12x−6)=2(x⁴−3x³−3x²+11x−6)=2x⁴−6x³−6x²+22x−12.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.polynomial — polynomial structure, degree, leading coefficient, coefficient notation; needed to identify terms and their GCF
- math.alg.factor-theorem — p(a)=0 ↔ (x−a) is a factor; rational root candidates; synthetic division for deflation; needed for degree-3+ polynomial factoring

**Unlocked blueprints:**
- math.alg.polynomial-roots — solving polynomial equations using complete factorisation; zeroproduct property
- math.alg.rational-expressions — simplifying rational expressions requires factoring numerator and denominator

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (GCF-THEN-DONE) is the highest-frequency error. Build the habit early: after every step, ask "can any factor be factored further?" This completeness-check loop must become automatic.

**ac-method fluency:** The ac-method is the hardest procedural skill in this blueprint. Learners often find the pair (p,q) correctly but then group incorrectly. The reliable approach: after splitting bx = px+qx, group the first two and last two terms; the common binomial must appear in both groups.

**Irreducibility check:** Teach the discriminant test (b²−4ac < 0 → irreducible) as a quick verification tool. This also addresses MC-3 automatically: students who check discriminants never confuse sum with difference of squares.

**Verification habit:** Always verify by expanding the factored form. This catches sign errors (MC-3) and partial GCF mistakes (MC-1) at once.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 11 fields populated)
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
- [x] V-14: P76 independence probe is a novel problem (4x³−4x²−15x not seen in P77)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: all factorisation examples verified by expansion; ac-method derivations correct; irreducibility via discriminant verified; GCF extractions arithmetically confirmed

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Factor 3x² + 12x completely."
[Expected: GCF = 3x; 3x(x+4). Check: 3x is degree 1 (irreducible); x+4 is degree 1 (irreducible). Complete: 3x(x+4).]

**Item 2:**
"Factor x² + 7x + 10 completely."
[Expected: monic; find pair with product 10 and sum 7: (2)(5). Complete: (x+2)(x+5).]

**Item 3:**
"Factor 4x² − 9 completely."
[Expected: no GCF; 2 terms; difference of squares: (2x)²−3²=(2x−3)(2x+3). Complete: (2x−3)(2x+3).]

**Item 4:**
"Factor 2x² + x − 3 completely."
[Expected: ac = 2×(−3) = −6; find pair with product −6 and sum 1: (3)(−2)=−6, 3+(−2)=1 ✓. Rewrite: 2x²+3x−2x−3 = x(2x+3)−1(2x+3) = (x−1)(2x+3). Complete: (x−1)(2x+3).]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Factor 4x³ − 4x² − 15x completely. Show all steps."

[Expected:
Step 1 — GCF: GCF(4x³, 4x², 15x) = x → x(4x²−4x−15).
Step 2 — Factor 4x²−4x−15 (non-monic, a=4, c=−15):
ac = 4×(−15) = −60.
Find pair with product −60 and sum −4: (−10)(+6) = −60 ✓; −10+6 = −4 ✓.
Split: 4x²−10x+6x−15 = 2x(2x−5)+3(2x−5) = (2x+3)(2x−5).
Step 3 — Complete: x(2x+3)(2x−5).
Verify: (2x+3)(2x−5) = 4x²−10x+6x−15 = 4x²−4x−15; ×x = 4x³−4x²−15x ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if GCF extraction, ac-method, and final three-factor form are all correct; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can apply GCF extraction, monic and non-monic trinomial factoring, and difference-of-squares pattern to completely factor polynomials.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (incomplete GCF) or P76 (GCF missing or wrong): → TA-B01 (GCF-THEN-DONE repair), then re-gate
- FAIL on Item 4 or P76 (ac-method error, leading coefficient ignored): → TA-B02 (AC-METHOD-ONLY-FOR-MONIC repair), then re-gate
- FAIL on Item 3 (factored sum instead of difference, or stopped incomplete): → TA-B03 (IRREDUCIBLE-QUADRATIC-FACTORABLE repair), then re-gate
- FAIL on Item 2 (monic error only): → return to A02 WE1 pattern; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated the ability to factor polynomials completely: GCF extraction, monic and non-monic trinomials, and special patterns including difference of squares.

Key anchors to carry forward:
- ALWAYS extract the GCF first; ALWAYS check whether the residual factor can be factored further.
- Non-monic trinomial ax²+bx+c: use ac-method (find pair with product ac and sum b; split; group).
- a²−b² = (a−b)(a+b); a²+b² is irreducible over ℝ (discriminant negative).
- Complete factorisation ends when every factor is degree 1 or has negative discriminant.

Next concepts: math.alg.polynomial-roots (solve polynomial equations by setting each factor to zero), math.alg.rational-expressions (simplify by factoring numerator and denominator)."
