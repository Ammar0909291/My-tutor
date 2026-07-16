# Teaching Blueprint — math.alg.polynomial

## Component 0 — Metadata
concept_id: math.alg.polynomial
concept_name: Polynomial
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 10
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.alg.expression, math.arith.exponent-rules]
cross_links: [math.func.polynomial-function, math.abst.polynomial-ring]
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A polynomial in x is an expression of the form aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀ where n ∈ ℕ₀ (non-negative integer) and all aᵢ ∈ ℝ with aₙ ≠ 0 (if n>0). The degree is n (the highest exponent); the leading coefficient is aₙ; the constant term is a₀. Polynomials are closed under addition, subtraction, and multiplication — they form a ring. The degree-n polynomial has AT MOST n real roots; over ℂ, exactly n roots counting multiplicity.

**Conceptual progression:**
1. Recognising polynomials: every term has a non-negative integer exponent; exponents like −1, 1/2, or 2.7 disqualify an expression.
2. Anatomy: degree, leading coefficient, leading term, constant term; standard form (descending exponent order).
3. Monomial, binomial, trinomial, polynomial: number of terms; a monomial (one term) IS a polynomial.
4. Degree and graph shape: degree 0 → constant; degree 1 → line; degree 2 → parabola; degree n → at most n roots; even degree → same end behaviour both sides; odd degree → opposite end behaviour.
5. Leading term dominance: for large |x|, aₙxⁿ overwhelms all lower-degree terms.

**CPA arc (entry: P):**
- Pictorial: expression written in standard form with labelled parts (degree, leading coefficient, constant); graph sketches showing degree-1/2/3/4 shapes; table of coefficients as a list
- Abstract: Σₖ₌₀ⁿ aₖxᵏ notation; degree and coefficient definitions; root count theorem

**Prior knowledge activated:** algebraic expressions (math.alg.expression); exponent rules including x⁰=1, x¹=x, xᵐxⁿ=xᵐ⁺ⁿ (math.arith.exponent-rules); function evaluation p(a) for substituting x=a

---

## Component 2 — Misconception Registry

### MC-1: DEGREE-IS-LARGEST-COEFFICIENT [FOUNDATIONAL]
**Description:** Learner identifies the degree of a polynomial as the numerically largest coefficient rather than the highest exponent. For example, in 5x²+3x³, learner reports degree=5 (largest coefficient) instead of degree=3 (highest exponent).
**Surface form:** "The degree of 10x²+2x³ is 10 because 10 is the biggest number."
**Root cause:** "Degree" is an unfamiliar term; the most salient large number in the expression is the coefficient. Learner has not internalised that degree refers to the exponent (power) of x, not the coefficient (multiplier of xⁿ).
**Trigger condition:** Any question asking for the degree of a polynomial, especially when coefficients are larger than exponents.
**Repair target:** TA-B01.

### MC-2: MONOMIAL-IS-NOT-A-POLYNOMIAL
**Description:** Learner believes a polynomial must have more than one term — that "poly" (many) means the count of terms must exceed 1. Consequently, rejects monomials (one term, e.g., 7x³) and binomials (two terms, but learner may also doubt) as polynomials.
**Surface form:** "7x³ is a monomial, not a polynomial — polynomials have more than one term."
**Root cause:** Etymological over-literalism: "poly" = "many" in Greek. Learner interprets this as requiring multiple terms. The standard mathematical definition includes single-term polynomials.
**Trigger condition:** Any classification problem involving single-term expressions, or questions asking whether a monomial is a polynomial.
**Repair target:** TA-B02.

### MC-3: NEGATIVE-EXPONENTS-ALLOWED
**Description:** Learner includes terms with negative, fractional, or irrational exponents in polynomials — e.g., 3x⁻¹+2 or x^{1/2}+5x. Does not apply the restriction that all exponents must be non-negative integers.
**Surface form:** "3x⁻¹+2 is a polynomial — it's just x to the power of −1 plus a constant."
**Root cause:** Learner knows that any expression in x is "algebraic," and conflates polynomials with the broader class of algebraic expressions. The specific restriction (non-negative integer exponents only) has not been made salient.
**Trigger condition:** Classification problems where non-polynomial algebraic expressions are presented.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Write 3x−2x³+5+x² in standard form and identify its degree." If the learner can write −2x³+x²+3x+5 and state degree=3, proceed to A01. If the degree is misidentified (e.g., degree=3 found correctly but stated as "coefficient of x³"), clarify the definition before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): label the parts of a given polynomial: underline the leading term, circle the degree (exponent), box the leading coefficient, bracket the constant term.
- Rung 2 (classification): given a list of ten expressions, classify each as polynomial (yes/no) and state why.
- Rung 3 (full abstract): given a polynomial, state all properties (degree, leading coeff, constant term, number of roots) and sketch the end behaviour.

**Pacing note:** h=10 estimated hours; A01–A02 in sessions 1–3; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

OBJECT: The polynomial p(x) = 2x³ − 5x² + 3x − 1.

REPRESENTATION 1 (algebraic expression — standard form):
2x³ − 5x² + 3x − 1
- Degree: 3 (highest exponent is 3).
- Leading term: 2x³; leading coefficient: 2.
- Constant term: −1 (the term with x⁰=1).
- Three nonconstant terms plus one constant = 4 terms total.

REPRESENTATION 2 (coefficient list):
Exponent:    3      2      1      0
Coefficient: 2    −5      3     −1
Reading left-to-right: [2, −5, 3, −1]. Degree is the POSITION INDEX of the leftmost nonzero entry.
Used in computer algebra systems; makes the pattern of coefficients explicit.

REPRESENTATION 3 (graph — shape and end behaviour):
- Odd degree (3), positive leading coefficient (2).
- End behaviour: x→+∞ → p→+∞; x→−∞ → p→−∞ (both ends diverge, but in opposite directions).
- Shape: cubic — one inflection, at most 3 real roots.
- Near origin: dominated by 3x (low-degree terms); far from origin: dominated by 2x³ (leading term).

BRIDGE 1→2: "The coefficient list [2,−5,3,−1] is just a concise notation for the polynomial. The INDEX of each coefficient IS the exponent. Degree = highest index with a nonzero coefficient."
BRIDGE 2→3: "The degree (3) and leading coefficient (2) together determine the shape and end behaviour of the graph. Lower-degree terms fine-tune the curve but don't change its fundamental character."

**Assessment primitive: P49**

PROBE: "Write the coefficient list for q(x)=x⁴−3x+7. State its degree and leading coefficient."
- CORRECT: [1,0,0,−3,7]; degree=4; leading coefficient=1 → "Correct — the zero entries at x³ and x² positions are important. Degree=4 because the highest exponent with nonzero coefficient is 4."
- PARTIAL: lists [1,−3,7] (omits zero coefficients) → "Good identification of the nonzero terms. The coefficient list must include EVERY exponent from degree down to 0, inserting 0 for missing terms: x⁴ has coefficient 1, x³ has coefficient 0, x² has coefficient 0, x has coefficient −3, constant is 7. Full list: [1,0,0,−3,7]."
- INCORRECT: states degree=7 or degree=3 → Repair with B01 (DEGREE-IS-LARGEST-COEFFICIENT).
- NO_RESPONSE: "List exponents from highest to lowest: 4,3,2,1,0. Find the coefficient of each: x⁴→1, x³→0 (not present), x²→0 (not present), x→−3, x⁰→7. Write in order: [1,0,0,−3,7]. Degree = highest exponent = 4."

---

### TA-B01 — Repair for MC-1 (DEGREE-IS-LARGEST-COEFFICIENT)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'the degree is the largest number in the polynomial — the biggest coefficient.' Degree is about EXPONENTS, not coefficients."

**P41 — MISCONCEPTION DETECTOR**
"For p(x)=100x+x³: which is the degree?
(A) 100 — because 100 is the largest number.
(B) 3 — because 3 is the highest exponent (power of x)."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"Degree = the highest power to which x is raised. In 100x+x³, x is raised to the 1st power (in 100x) and to the 3rd power (in x³). The highest power is 3 → degree=3. The coefficient 100 is just the multiplier of x¹ — it affects the steepness of the graph, not the degree. Think of degree as 'how many times x is multiplied by itself in the highest term,' not 'the biggest number I can see.'"

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — POLYNOMIAL expressions:
- 3x²−5x+2: exponents 2,1,0 — all non-negative integers ✓; degree=2
- 7: constant polynomial; exponent 0; degree=0 ✓
- x⁵: monomial; single term; exponent 5; degree=5 ✓ (monomial IS a polynomial)
- −4x³+2x: two terms (binomial); exponents 3,1 — both non-negative integers ✓

PAIR B — NOT polynomial expressions:
- 3x⁻¹+2: exponent −1 is negative — NOT a polynomial; this is part of a rational function
- √x+5 = x^{1/2}+5: exponent 1/2 is not an integer — NOT a polynomial
- 2^x+1: base is 2, exponent is x — this is exponential, not polynomial
- x/(x+1): a ratio of polynomials — rational function — NOT itself a polynomial

CRITICAL RULE: "A polynomial's exponents must ALL be non-negative integers (0,1,2,3,…). Any negative exponent, fractional exponent, irrational exponent, or variable in the exponent disqualifies the expression."

CLASSIFICATION TABLE:
| Expression | Polynomial? | Reason |
|---|---|---|
| 5x³ | YES | exponent 3 ≥ 0, integer |
| x^{2/3}+1 | NO | exponent 2/3 not integer |
| 4 | YES | constant; degree 0 |
| 1/x = x⁻¹ | NO | exponent −1 < 0 |
| x²+3x+1 | YES | all exponents ∈ {2,1,0} |
| 2^x | NO | variable in exponent |

**Assessment primitive: P49**

PROBE: "Classify each as polynomial or not: (a) 6x⁴−x²+3, (b) x+x^{−1}, (c) 8 (constant), (d) √(x²+1)."
- CORRECT: "(a) YES — degree 4; (b) NO — x⁻¹ has negative exponent; (c) YES — degree 0 constant; (d) NO — √(x²+1)=(x²+1)^{1/2}, fractional exponent." → proceed to A03.
- PARTIAL: correct on (a)(b) but wrong on (c) or (d) → "(c): 8=8·x⁰=8·1 — this is a degree-0 polynomial with a single constant term, which qualifies. (d): √(x²+1)≠x+1 — squaring both sides changes it; (x²+1)^{1/2} is not a polynomial because 1/2 is not a non-negative integer."
- INCORRECT: accepts (b) or (d) as polynomial → Repair with B03 (NEGATIVE-EXPONENTS-ALLOWED).
- NO_RESPONSE: "For each expression: identify every term's exponent. Is every exponent a non-negative integer (0,1,2,3,…)? If yes → polynomial. If any exponent is negative, fractional, or has x in the exponent → not polynomial."

---

### TA-B02 — Repair for MC-2 (MONOMIAL-IS-NOT-A-POLYNOMIAL)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'a polynomial must have more than one term — "poly" means many.' This is etymological overfitting. Mathematically, a polynomial includes single-term expressions."

**P41 — MISCONCEPTION DETECTOR**
"Is 5x³ a polynomial?
(A) No — it has only one term (monomial), so it's not a polynomial.
(B) Yes — its exponent (3) is a non-negative integer; the number of terms is irrelevant to the definition."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"The definition of polynomial is about EXPONENTS, not the NUMBER OF TERMS. A polynomial is any finite sum of terms aₖxᵏ with k ∈ ℕ₀ — a 'sum' can have just one term. 5x³ = 5x³+0x²+0x+0 is a polynomial (degree 3) with three zero coefficients. 'Monomial,' 'binomial,' 'trinomial' classify by term count — they are all polynomials. 'Poly' in 'polynomial' refers to the form of the expression (involving powers), not to having multiple terms."

→ Return to A02.

---

### TA-B03 — Repair for MC-3 (NEGATIVE-EXPONENTS-ALLOWED)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'any algebraic expression involving x is a polynomial.' Polynomials are a strict SUBSET of algebraic expressions — they have a specific exponent restriction."

**P41 — MISCONCEPTION DETECTOR**
"Is f(x)=x+1/x a polynomial?
(A) Yes — it involves x and arithmetic operations.
(B) No — 1/x=x⁻¹ has a negative exponent (−1), which violates the definition."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"1/x = x⁻¹ has exponent −1, which is negative — the polynomial restriction explicitly requires ALL exponents to be non-negative integers: 0,1,2,3,… only. x⁻¹ belongs to the class of rational functions (ratios of polynomials), not polynomials. Similarly x^{1/2}=√x has a fractional exponent. The restriction is not arbitrary: it ensures polynomials are continuous on all of ℝ, differentiable everywhere, and closed under addition and multiplication — properties that fail for x⁻¹ (undefined at x=0)."

→ Return to A02.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: Degree determines root count and end behaviour.

INSTANCE 1 — Degree 0 (constant): p(x)=5.
Graph: horizontal line y=5. Roots: NONE (the line never crosses x-axis). End behaviour: p→5 as x→±∞.

INSTANCE 2 — Degree 1 (linear): p(x)=2x−6.
Graph: straight line, slope 2. Roots: exactly 1 (x=3). End behaviour: p→+∞ as x→+∞; p→−∞ as x→−∞.

INSTANCE 3 — Degree 2 (quadratic): p(x)=x²−4x+4=(x−2)².
Graph: parabola opening upward. Roots: x=2 (double root — touches axis but doesn't cross). At most 2 real roots (0,1, or 2). End behaviour: p→+∞ as x→±∞ (both ends up — EVEN degree, positive leading coefficient).

INSTANCE 4 — Degree 3 (cubic): p(x)=x³−x=x(x−1)(x+1).
Graph: cubic S-curve. Roots: x=0,1,−1 (exactly 3 real roots). End behaviour: p→+∞ as x→+∞; p→−∞ as x→−∞ (ODD degree, positive leading coefficient — opposite ends).

GENERALISED PATTERN:
- Degree n polynomial has AT MOST n real roots.
- ODD degree: always has at least one real root; ends go in OPPOSITE directions.
- EVEN degree: may have 0 real roots; ends go in the SAME direction.
- Leading term aₙxⁿ: if aₙ>0 and n even → both ends up; aₙ>0 and n odd → left end down, right end up. Negate aₙ to flip.

LEADING TERM DOMINANCE: For large |x|, aₙxⁿ >> aₙ₋₁xⁿ⁻¹ >> … >> a₀. Example: in 2x³−1000x²+10000, near x=1000 the cubic term dominates: 2(10³)³=2×10⁹ vs. −1000(10³)²=−10⁹. Far from origin, the graph "looks like" aₙxⁿ.

**Assessment primitive: P49**

PROBE: "p(x)=−x⁴+3x². (a) What is the degree and leading coefficient? (b) Describe end behaviour. (c) How many real roots can it have at most?"
- CORRECT: "(a) degree=4, leading coefficient=−1. (b) Both ends DOWN (even degree, negative leading coeff: x→±∞ → −x⁴→−∞). (c) At most 4 real roots." → proceed to A04.
- PARTIAL: correct degree, wrong end behaviour → "(b): Degree 4 is EVEN, so both ends behave the same. Leading coefficient −1 is NEGATIVE: for large |x|, −x⁴ dominates and is very negative. Both ends go to −∞ (down), not up."
- INCORRECT: states degree=3 or leading coeff=3 → Repair with B01 (DEGREE-IS-LARGEST-COEFFICIENT); then return.
- NO_RESPONSE: "(a): Find the highest exponent: x⁴ has exponent 4 → degree=4. Its coefficient is −1. (b): Even degree → same end on both sides. Negative leading coefficient → ends point DOWN. (c): Degree n → at most n roots → at most 4."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (DEGREE-IS-LARGEST-COEFFICIENT)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (MONOMIAL-IS-NOT-A-POLYNOMIAL)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (NEGATIVE-EXPONENTS-ALLOWED)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Is f(x)=x²+2x^{1/2}−3 a polynomial? Identify the degree and leading coefficient of g(x)=−7x³+4x⁵−2."
[Expected: f is NOT a polynomial (x^{1/2} has fractional exponent). g: write in standard form: 4x⁵−7x³−2; degree=5, leading coefficient=4.]

**Day 10 prompt:**
"Sketch (roughly) the end behaviour of p(x)=−2x⁵+100x⁴−x+3. How many real roots can it have at most? Does it have at least one real root?"
[Expected: degree=5 (odd), leading coeff=−2 (negative). End behaviour: x→+∞ → p→−∞ (leading term dominates, negative); x→−∞ → p→+∞. Opposite ends → MUST cross x-axis → at least 1 real root. At most 5 real roots.]

**Day 30 prompt:**
"Explain why the set of all polynomials with real coefficients is closed under addition and multiplication — that is, why the sum and product of two polynomials is always another polynomial. Is it closed under division? Give an example."
[Expected: Sum: if p has degree m and q has degree n, p+q has degree max(m,n) — still polynomial (finite sum, non-negative integer exponents). Product: if p(x)=Σaₖxᵏ and q(x)=Σbⱼxʲ, then p(x)q(x)=Σcₗxˡ where cₗ=Σₖ aₖbₗ₋ₖ; exponents are sums of non-negative integers → still non-negative integers → polynomial. Not closed under division: x/(x+1) is not a polynomial (rational function). This is why polynomials form a RING but not a FIELD.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.alg.expression — algebraic expressions; terms, coefficients; combining like terms
- math.arith.exponent-rules — xᵐxⁿ=xᵐ⁺ⁿ; x⁰=1; negative and fractional exponents (so learner knows x⁻¹ exists but is excluded from polynomials)

**Unlocked blueprints:**
- math.alg.factoring — factoring polynomials into irreducible factors
- math.alg.polynomial-roots — finding real roots; relationship between roots and factors; Vieta's formulas
- math.func.polynomial-function — polynomial as a function; transformations; graph analysis

**Cross-links (neither is T1 — P76 independence mode):**
- math.func.polynomial-function (not T1): polynomial viewed as a function; domain ℝ; continuity; transformations
- math.abst.polynomial-ring (not T1): algebraic structure; ℝ[x] as a ring; polynomial division algorithm in ring theory

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (DEGREE-IS-LARGEST-COEFFICIENT) is the most disruptive error because it propagates into every polynomial problem — degree determines root count, end behaviour, and many theorems. Catch and repair it at the first P49 failure.

**Standard form discipline:** Always re-write polynomials in standard form (descending exponents) at the start of every problem. This makes the degree and leading term visible by inspection. Train this habit explicitly.

**Monomial as polynomial:** Emphasise that {monomials} ⊂ {polynomials} in the concept map. A single-term polynomial is just as valid as one with four terms. The classification words (mono/bi/tri/poly-nomial) count terms, but membership in the polynomial family is about exponent type, not term count.

**End behaviour as a shortcut:** For large |x|, the graph of p(x) looks exactly like the graph of aₙxⁿ. This shortcut is useful in calculus (limits at infinity) and in sketching — teach it as a named rule, not an observation.

**Connection to later algebra:** The at-most-n-roots theorem (proved using the Factor Theorem) is one of the deepest results about polynomials. Introduce the intuition here (each root contributes one factor) without proof; the proof comes in math.alg.polynomial-roots.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links not T1; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct)
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel, unseen problem (p(x)=x³−6x²+11x−6; root evaluation; factoring)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All mathematical content (polynomial definition, exponent restriction, degree/leading coefficient, degree-n root bound, end behaviour) consistent with KG description and standard algebra pedagogy; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"What is the degree of 4x⁵ − 7x³ + 2x?"
[Expected: degree=5. The highest exponent is 5 (in the term 4x⁵).]

**Item 2:**
"Is f(x)=x^{1/2}+3 a polynomial? Why or why not?"
[Expected: NO. The term x^{1/2} has exponent 1/2, which is not a non-negative integer. Polynomials require all exponents to be in {0,1,2,3,…}.]

**Item 3:**
True or False: "A monomial like 5x² is a polynomial."
[Expected: TRUE. 5x² has exactly one term with exponent 2 (a non-negative integer). Single-term polynomials are valid polynomials; the count of terms does not affect membership in the polynomial class.]

**Item 4:**
"For p(x)=3x²−7x+2: what is the leading coefficient? The degree? The constant term?"
[Expected: leading coefficient=3; degree=2; constant term=2.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Let p(x) = x³ − 6x² + 11x − 6.

(a) State the degree, leading coefficient, and constant term.
(b) Evaluate p(1), p(2), and p(3). What do you notice?
(c) What is the maximum number of real roots p(x) can have? Is this consistent with your findings in (b)?
(d) Factor p(x) completely."

[Expected:
(a) Degree=3, leading coefficient=1, constant term=−6.
(b) p(1)=1−6+11−6=0; p(2)=8−24+22−6=0; p(3)=27−54+33−6=0. All three are roots.
(c) At most 3 real roots (degree=3). Found exactly 3 roots in (b) — consistent; the polynomial achieves its maximum.
(d) p(x)=(x−1)(x−2)(x−3). Verify: (x−1)(x−2)=x²−3x+2; times (x−3)=x³−3x²+2x−3x²+9x−6 = x³−6x²+11x−6 ✓.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (b) correctly identifies all three roots as zero and (c) connects the count to the degree bound, 0 otherwise. Partial factoring in (d) acceptable if (b)+(c) are correct.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can identify degree (not coefficient), classify polynomial vs. non-polynomial, accept monomials as polynomials, apply root-count bound, and evaluate to find roots.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (incorrect degree): → TA-B01 (DEGREE-IS-LARGEST-COEFFICIENT repair), then re-gate
- FAIL on Item 2 (accepts x^{1/2} as polynomial): → TA-B03 (NEGATIVE-EXPONENTS-ALLOWED repair), then re-gate
- FAIL on Item 3 (rejects monomial as polynomial): → TA-B02 (MONOMIAL-IS-NOT-A-POLYNOMIAL repair), then re-gate
- FAIL on Item 4 (cannot identify leading coefficient): → Return to A01 (P11 anatomy labelling), then re-gate
- FAIL on P76 (cannot evaluate or connect to degree): → Return to A03 (P04 degree-n pattern), then re-gate
- FAIL on multiple items: → Repair in order B01 → B03 → B02 based on which MCs are active; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of polynomial structure: definition, degree, leading coefficient, term count, and root-count bound.

Key anchors to carry forward:
- Polynomial = finite sum of terms aₖxᵏ with k ∈ {0,1,2,3,…} and all coefficients in ℝ.
- Degree = highest EXPONENT (not highest coefficient); leading coefficient = coefficient of the highest-degree term.
- Any monomial, binomial, or trinomial is a polynomial; x⁻¹, x^{1/2}, and 2^x are NOT.
- Degree-n polynomial: AT MOST n real roots; at least 1 real root if n is odd.
- End behaviour is determined entirely by the leading term aₙxⁿ.

Next concepts: math.alg.factoring (expressing polynomials as products of simpler factors), math.alg.polynomial-roots (finding roots; Factor Theorem; Vieta's formulas)."
