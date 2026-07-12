# Teaching Blueprint — math.found.complex-numbers

## Component 0 — Metadata
concept_id: math.found.complex-numbers
concept_name: Complex Numbers
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 8
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.found.real-numbers]
cross_links: [math.cx.complex-numbers-analysis, math.trig.polar-form-complex]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** The complex numbers ℂ = {a+bi : a,b ∈ ℝ, i² = −1} extend the reals by adjoining a number i whose square is −1. This extension is algebraically complete (every polynomial has a root, Fundamental Theorem of Algebra) and geometrically rich (ℂ = ℝ² with a multiplication that encodes rotation and scaling). Every real number a = a+0i is complex; ℝ ⊂ ℂ.

**Conceptual progression:**
1. Motivation: x²+1=0 has no real solution — we need a new number satisfying i²=−1.
2. Definition: ℂ = {a+bi : a,b ∈ ℝ}; i is defined by i²=−1, not computed.
3. Arithmetic: (a+bi)+(c+di)=(a+c)+(b+d)i; (a+bi)(c+di)=(ac−bd)+(ad+bc)i (substitute i²=−1).
4. Complex plane: a+bi ↔ point (a,b); real axis horizontal, imaginary axis vertical; |a+bi|=√(a²+b²).
5. Powers of i: i¹=i, i²=−1, i³=−i, i⁴=1 — cycle of period 4; iⁿ determined by n mod 4.
6. Subset relations: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ; purely real (b=0); purely imaginary (a=0).

**CPA arc (entry: P):**
- Pictorial: complex plane with labelled axes; points (a,b) representing a+bi; |z| as distance from origin; multiplication as rotation+scaling shown via diagram
- Abstract: a+bi notation, i²=−1, powers-of-i cycle, arithmetic rules

**Prior knowledge activated:** real number line (math.found.real-numbers); square roots and why x²=−1 has no real solution; Pythagorean theorem for distance in ℝ²

---

## Component 2 — Misconception Registry

### MC-1: SQRT-NEGATIVE-UNDEFINED [FOUNDATIONAL]
**Description:** Learner believes i is computed as √(−1), and since square roots of negatives are undefined, i doesn't exist or is a fiction. Does not understand that i is DEFINED by the rule i²=−1, not derived by computation.
**Surface form:** "You can't take the square root of −1, so i is not a real mathematical object."
**Root cause:** Prior instruction in ℝ correctly states √(−1) is undefined; learner applies that rule without realising we are now extending the number system by definition.
**Trigger condition:** Any problem involving i, or the question "what is i?"
**Repair target:** TA-B01.

### MC-2: I-IS-JUST-A-SYMBOL
**Description:** Learner treats i as an unspecified algebraic variable like x, leaving i² unsimplified in answers. Does not apply the operative rule i²=−1 to reduce expressions.
**Surface form:** "(2+i)(3+i) = 6+2i+3i+i² = 6+5i+i²" (stops without substituting i²=−1).
**Root cause:** Standard algebraic manipulation leaves symbolic terms; learner has not internalised that i²=−1 is a mandatory substitution, not optional simplification.
**Trigger condition:** Any multiplication or higher-power computation involving i.
**Repair target:** TA-B02.

### MC-3: COMPLEX-NUMBERS-ARE-NOT-REAL
**Description:** Learner interprets "complex" as meaning "not real," believing ℝ and ℂ are disjoint. Does not recognise that every real number is also a complex number with b=0.
**Surface form:** "7 is not complex — it's real, not imaginary."
**Root cause:** The word "complex" in everyday English means "complicated" or "not simple." Learner maps this onto "not real." The subset relation ℝ ⊂ ℂ is counterintuitive if the label "complex" connotes a different category.
**Trigger condition:** Any problem asking whether a real number is complex, or involving the classification of numbers.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Compute (2+3i)+(1−i) and simplify (if possible) 4i²." If the learner can sum the real and imaginary parts to get 3+2i and recognise 4i²=4(−1)=−4, proceed directly to A01. If 4i² is left as 4i², address MC-2 before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): provide a blank complex plane; learner plots five given complex numbers and labels each with its a+bi form.
- Rung 2 (partial abstract): learner identifies real/imaginary parts, computes |z|=√(a²+b²) for given z.
- Rung 3 (full abstract): learner applies i²=−1 to multiply two complex numbers and simplify; applies powers-of-i cycle.

**Pacing note:** h=8 estimated hours; A01–A02 in sessions 1–2; A03 + mastery gate in sessions 3–4.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

OBJECT: The complex number z = 1+i.

REPRESENTATION 1 (algebraic): z = 1+i, where a=1 (real part) and b=1 (imaginary part); i is defined by i²=−1. Operations: (1+i)+(2−3i)=3−2i; (1+i)²=1+2i+i²=1+2i−1=2i.

REPRESENTATION 2 (geometric — complex plane): z corresponds to the point (1,1); the real axis is horizontal (real part), the imaginary axis is vertical (imaginary part). Distance from origin: |z|=√(1²+1²)=√2.

REPRESENTATION 3 (transformation): z = 1+i encodes a scale of √2 and a rotation of 45° (π/4 radians) from the positive real axis. Multiplying any complex number w by z scales |w| by √2 and rotates it 45° anticlockwise.

BRIDGE 1→2: "The pair (a,b) IS the complex number. The complex plane is ℝ² with a specific multiplication rule — that multiplication is what makes it more than a coordinate plane."

BRIDGE 2→3: "|z|=√(a²+b²) is the distance from the origin; θ=arctan(b/a) is the angle. Together (|z|,θ) is the polar form — a preview of where cross-links lead."

**Assessment primitive: P49**

PROBE: "Write z=3−4i as a point on the complex plane and compute |z|."
- CORRECT: point (3,−4); |z|=√(9+16)=√25=5 → "Correct. 3−4i is 3 units right, 4 units down; distance 5 (a 3-4-5 right triangle)." → proceed to A02.
- PARTIAL: correct point, error in |z| → "You placed it correctly at (3,−4). The distance uses Pythagoras: |z|=√(3²+(−4)²)=√(9+16)=5. The imaginary part is 4 in magnitude even though b=−4."
- INCORRECT: tries to evaluate √(3²−4²) or similar → Repair with B01 (SQRT-NEGATIVE-UNDEFINED); then re-probe.
- NO_RESPONSE: "The complex plane has the real part on the x-axis and the imaginary part on the y-axis. z=3−4i sits at x=3, y=−4. The distance from the origin is √(x²+y²)=√(9+16)=5."

---

### TA-B01 — Repair for MC-1 (SQRT-NEGATIVE-UNDEFINED)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'i = √(−1), but square roots of negatives are undefined — so i cannot exist.' This conflates a computation with a definition."

**P41 — MISCONCEPTION DETECTOR**
"Two statements:
(A) i is defined as the result of computing √(−1).
(B) i is a new number we declare to exist, defined by the rule i²=−1.
Which is correct? Hint: how did we define √2 — did we compute it from something, or did we declare it as the positive number whose square is 2?"

**P64 — CONCEPTUAL SHIFT**
"Statement (B) is correct. We do NOT compute i from anything. We EXTEND ℝ by declaring: 'there exists a number i satisfying i²=−1.' This is the same move as extending ℚ by declaring √2 exists. The word 'defined' is key. Once we accept the definition, all of algebra works consistently. The Fundamental Theorem of Algebra — that every polynomial has a root — is the payoff: it holds in ℂ but not in ℝ."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Real numbers ℝ:
- The equation x²+1=0 has NO solution. √(−1) is undefined over ℝ.
- ℝ is a number LINE — one-dimensional.
- Multiplication of real numbers stays on the line; sign determines direction.
- Subset chain: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.

PAIR B — Complex numbers ℂ:
- The equation x²+1=0 has solutions x=i and x=−i. Every polynomial has a root in ℂ (Fundamental Theorem of Algebra).
- ℂ is a number PLANE — two-dimensional; a+bi ↔ (a,b).
- Multiplication encodes ROTATION+SCALING: multiplying by i rotates 90° anticlockwise.
- Subset chain: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ. Every real number a = a+0i is in ℂ.

CRITICAL CONTRASTS:
| Feature | ℝ | ℂ |
|---|---|---|
| Dimension | 1 (line) | 2 (plane) |
| x²+1=0 | No solution | Solutions ±i |
| Ordering | Total order (a<b) | No ordering |
| Multiplication | Scale only | Rotation + scale |
| Contains ℝ? | Is ℝ | Yes, as b=0 subset |

"ℝ ⊂ ℂ means every real number is also complex. The word 'complex' is historical — it does not mean 'not real.'"

**Assessment primitive: P49**

PROBE: "Is 7 a complex number? Is −5i a real number? Is 0 both real and complex?"
- CORRECT: "7=7+0i is complex (b=0). −5i=0−5i is purely imaginary, not real (a=0, b≠0). 0=0+0i is both real and complex — it is the only number that is both real and purely imaginary." → proceed to A03.
- PARTIAL: correct on 7, error on 0 → "7 is correct — a+0i with a=7. For 0: 0=0+0i fits both a=0 (purely imaginary condition) and b=0 (real condition), so 0 is the intersection — the only number in both ℝ and the purely imaginary set."
- INCORRECT: claims 7 is not complex → Repair with B03 (COMPLEX-NUMBERS-ARE-NOT-REAL).
- NO_RESPONSE: "Purely real means b=0; purely imaginary means a=0. Write each as a+bi and check: 7=7+0i, so b=0 → real (and also complex). −5i=0+(−5)i, so a=0 → purely imaginary."

---

### TA-B03 — Repair for MC-3 (COMPLEX-NUMBERS-ARE-NOT-REAL)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'real numbers and complex numbers are separate categories — a number cannot be both.' This treats ℝ and ℂ as disjoint, but they are nested: ℝ ⊂ ℂ."

**P41 — MISCONCEPTION DETECTOR**
"Where does the number 5 live on the complex plane?
(A) It doesn't appear — 5 is real, not complex.
(B) It appears at the point (5,0) — 5 = 5+0i, on the real axis."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Every real number a = a+0i is a complex number with zero imaginary part. The set ℝ is the real AXIS of the complex plane — it is a proper subset of ℂ, not a separate category. 'Complex' is a historical term meaning 'a+bi form'; it does not mean 'non-real.' The purely imaginary numbers (a=0, b≠0) are the ones that are NOT real — they are the imaginary axis. Real numbers ARE complex numbers, with b=0."

→ Return to A02.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

INSTANCE 1: i¹ = i
INSTANCE 2: i² = −1 (definition)
INSTANCE 3: i³ = i²·i = (−1)·i = −i
INSTANCE 4: i⁴ = i³·i = (−i)·i = −i² = −(−1) = 1
INSTANCE 5: i⁵ = i⁴·i = 1·i = i (same as i¹ — cycle restarts)

PATTERN: powers of i cycle with period 4:
- n ≡ 1 (mod 4) → iⁿ = i
- n ≡ 2 (mod 4) → iⁿ = −1
- n ≡ 3 (mod 4) → iⁿ = −i
- n ≡ 0 (mod 4) → iⁿ = 1

CONJECTURE TESTS:
- i^{22}: 22 mod 4 = 2 → i^{22} = −1. Verify: i^{22}=(i²)^{11}=(−1)^{11}=−1 ✓
- i^{47}: 47 mod 4 = 3 → i^{47} = −i. Verify: i^{47}=i^{44}·i³=1·(−i)=−i ✓
- i^{100}: 100 mod 4 = 0 → i^{100} = 1. Verify: i^{100}=(i⁴)^{25}=1^{25}=1 ✓

ALGEBRAIC STRUCTURE: {1, i, −1, −i} is a cyclic group of order 4 under multiplication. Multiplication by i rotates 90° anticlockwise on the complex plane (a geometric interpretation of the cycle).

APPLICATION — SIMPLIFYING PRODUCTS:
(2+3i)(1−2i) = 2−4i+3i−6i² = 2−i−6(−1) = 2−i+6 = 8−i.
Rule: expand algebraically, then substitute i²=−1 to eliminate i² (and higher powers).

**Assessment primitive: P49**

PROBE: "Simplify (1+i)⁴ and compute i^{53}."
- CORRECT: "(1+i)²=1+2i+i²=1+2i−1=2i. (1+i)⁴=(2i)²=4i²=4(−1)=−4. i^{53}: 53 mod 4=1, so i^{53}=i." → proceed to A04.
- PARTIAL: correct on i^{53}, error on (1+i)⁴ → "i^{53} correct. For (1+i)⁴: first square (1+i)²=1+2i+i². Now i²=−1, so (1+i)²=2i. Then (1+i)⁴=(2i)²=4i². Apply i²=−1 again: 4(−1)=−4."
- INCORRECT: does not substitute i²=−1 → Repair with B02 (I-IS-JUST-A-SYMBOL).
- NO_RESPONSE: "(1+i)⁴=((1+i)²)². First compute (1+i)²=1+2i+i²; replace i² with −1 to get 2i. Then (2i)²=4i²=4(−1)=−4. For i^{53}: divide 53 by 4; remainder is 1; so i^{53}=i."

---

### TA-B02 — Repair for MC-2 (I-IS-JUST-A-SYMBOL)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'i is just an algebraic letter — I can leave i² in my answer as is.' This treats i like an unspecified variable, but i is a DEFINED number satisfying i²=−1."

**P41 — MISCONCEPTION DETECTOR**
"You computed (1+i)²=1+2i+i². Is i² a further simplifiable expression?
(A) No — i is a variable, i² stays as i².
(B) Yes — i²=−1 by definition, so 1+2i+i²=1+2i−1=2i."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"i is NOT a variable. It is a specific number defined by i²=−1. This is a RULE, not optional: every time i² appears, replace it with −1. This is the only difference between complex arithmetic and ordinary algebra. The step '…+i²=…+(−1)=…' is mandatory, not aesthetic. Every unsimplified i² in a final answer is incorrect — there is only one value: −1."

→ Return to A03.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (SQRT-NEGATIVE-UNDEFINED)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (I-IS-JUST-A-SYMBOL)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A03.

### TA-B03 — Repair for MC-3 (COMPLEX-NUMBERS-ARE-NOT-REAL)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Compute (3−2i)(1+4i) and simplify completely. Then plot both factors and their product on the complex plane."
[Expected: (3−2i)(1+4i)=3+12i−2i−8i²=3+10i+8=11+10i. Factors at (3,−2) and (1,4); product at (11,10).]

**Day 10 prompt:**
"Compute i^{38} and (1+i)^8 without expanding term-by-term. Explain your method."
[Expected: i^{38}: 38 mod 4=2, so i^{38}=−1. (1+i)^8=((1+i)²)⁴=(2i)⁴=16i⁴=16(1)=16.]

**Day 30 prompt:**
"Prove that every complex number z=a+bi with |z|=1 can be written as z=cosθ+i·sinθ for some θ∈[0,2π). What does this say about the set of complex numbers of modulus 1?"
[Expected: z=(a,b) on the unit circle; parameterise by angle: a=cosθ, b=sinθ; so z=cosθ+i sinθ. The set {z∈ℂ: |z|=1} is the unit circle — a group under multiplication (since |z₁z₂|=|z₁||z₂|=1 when both moduli are 1).]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.found.real-numbers — understanding of ℝ, square roots, why x²=−1 has no real solution; the motivation for extending the number system

**Unlocked blueprints:**
- math.alg.complex-polynomial-roots — roots of polynomials in ℂ; Fundamental Theorem of Algebra
- math.cx.complex-numbers-analysis — complex functions, holomorphic/analytic functions, Cauchy-Riemann equations (deep extension)
- math.trig.polar-form-complex — polar and Euler form of complex numbers: z=r·e^{iθ}

**Cross-links (both T1 — P76 cross-link probe mode):**
- math.trig.polar-form-complex (T1): polar form z=r(cosθ+i sinθ); Euler's formula z=r·e^{iθ}; multiplication as rotation+scaling with angle addition
- math.cx.complex-numbers-analysis (T1): analytic functions of a complex variable; this concept is the direct prerequisite that math.found.complex-numbers unlocks

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (SQRT-NEGATIVE-UNDEFINED) is the foundational block — if the learner believes i doesn't exist, all subsequent teaching fails. Address it immediately at the first incorrect response.

**Complex plane as the key insight:** The geometric view (ℂ = ℝ² with multiplication as rotation+scaling) is the most powerful intuition. Make the bridge from algebra to geometry explicit in A01. The 90° rotation interpretation of i (multiplying by i rotates a point 90° anticlockwise) is memorable and directly foreshadows polar form.

**Powers-of-i cycle:** A03's cycle {i, −1, −i, 1} is both computationally useful and conceptually rich — it shows i generating a cyclic group. Many students find this surprising and memorable. Use it to build confidence before the mastery gate.

**Polar form teaser:** Do NOT introduce Euler form or e^{iθ} here — save it for math.trig.polar-form-complex. The P76 probe touches polar form lightly (distance, angle) but does not require computation of e^{iπ/4}.

**Word choice:** Avoid calling ℂ "imaginary" at any point — this reinforces MC-1. Always say "complex numbers" or "the number i defined by i²=−1."

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
- [x] V-10: P76 mode = cross-link-probe; both cross_links are T1; probe connects to polar form (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct)
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 cross-link probe connects to T1 cross-links (polar form via angle+modulus; complex analysis context)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All mathematical content (ℂ = {a+bi}, i²=−1, powers of i, complex plane) consistent with KG description and standard algebra/analysis pedagogy; no fabricated identities or claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Compute (2+3i)(1−2i) and simplify completely."
[Expected: 2−4i+3i−6i²=2−i+6=8−i.]

**Item 2:**
"Compute i^{31}."
[Expected: 31 mod 4=3, so i^{31}=i³=−i.]

**Item 3:**
True or False: "Every real number is also a complex number."
[Expected: TRUE. Every real number a=a+0i, so ℝ ⊂ ℂ.]

**Item 4:**
"Plot z=−2+3i on the complex plane and find |z|."
[Expected: point at (−2,3); |z|=√(4+9)=√13.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe mode: math.trig.polar-form-complex)

"Let z₁=1+i and z₂=1−i.

(a) Find |z₁| and |z₂|. What angle does z₁ make with the positive real axis?
(b) Compute z₁·z₂ using the algebraic rule. Is the result real or complex?
(c) Interpret the product geometrically: what happens to |z| and the angle when you multiply z₁ by z₂?"

[Expected:
(a) |z₁|=√2, |z₂|=√2. z₁=(1,1) is at angle θ=arctan(1/1)=π/4=45°. z₂=(1,−1) is at angle −π/4=−45°.
(b) z₁·z₂=(1+i)(1−i)=1−i+i−i²=1+1=2. The product is real (b=0).
(c) Magnitudes multiply: |z₁|·|z₂|=√2·√2=2=|product| ✓. Angles add: π/4+(−π/4)=0, so the product lands on the positive real axis ✓. Multiplication = scale by product of magnitudes + rotate by sum of angles.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (b) z₁z₂=2 is correct and (c) includes the rotation+scaling interpretation (even partially), 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can multiply complex numbers, compute powers of i, interpret ℝ ⊂ ℂ, and read the complex plane. Ready for polar form and complex analysis.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 or Item 2 (did not substitute i²=−1): → TA-B02 (I-IS-JUST-A-SYMBOL repair), then re-gate
- FAIL on Item 3 (claims real numbers are not complex): → TA-B03 (COMPLEX-NUMBERS-ARE-NOT-REAL repair), then re-gate
- FAIL on Item 4 or P76 (complex plane unfamiliar): → Return to A01 (P11 representation shift), then re-gate
- FAIL on multiple items: → TA-B01 if Item 2 failure seems definitional; TA-B02 if algebraic; TA-B03 if classification. Re-gate after each repair.

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of the complex number system: its definition via i²=−1, its arithmetic, the complex plane as ℝ², the subset relation ℝ ⊂ ℂ, and the powers-of-i cycle.

Key anchors to carry forward:
- i is defined by i²=−1 (a definition, not a computation); every time i² appears, replace with −1.
- ℂ = {a+bi} is a two-dimensional number plane; ℝ is the real axis, a proper subset of ℂ.
- |z|=√(a²+b²) is the modulus — distance from the origin on the complex plane.
- Powers of i cycle with period 4: i¹=i, i²=−1, i³=−i, i⁴=1.
- Multiplication = scaling by product of moduli + rotating by sum of angles.

Next concepts: math.trig.polar-form-complex (Euler form r·e^{iθ}), math.alg.complex-polynomial-roots (Fundamental Theorem of Algebra)."
