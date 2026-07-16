<!-- BLUEPRINT: math.cx.complex-numbers-analysis -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Complex Numbers (Analysis)
**Concept ID:** `math.cx.complex-numbers-analysis`
**KG Fields:** difficulty=advanced | bloom=understand | estimated_hours=3 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.cx.complex-numbers-analysis |
| name | Complex Numbers (Analysis) |
| difficulty | advanced |
| bloom | understand |
| estimated_hours | 3 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.complex-numbers, math.trig.polar-form-complex |
| cross_links | math.trig.eulers-formula (NOT Tier-1) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.complex-numbers**: algebraic form z=a+bi; basic operations; i²=−1
- **math.trig.polar-form-complex**: z=r(cosθ+i·sinθ); modulus r=|z|; quadrant-aware argument; De Moivre's theorem

### Target Knowledge State
Student understands ℂ as a structured set {x+iy: x,y∈ℝ} with a rigorous metric |z|=√(x²+y²); can write z in exponential polar form re^{iθ} using Euler's formula e^{iθ}=cosθ+i·sinθ; computes z̄=x−iy, extracts Re(z) and Im(z) via conjugate formulas; and verifies the fundamental identity |z|²=z·z̄.

### Conceptual Obstacles
1. Computing |z| as |x|+|y| or |x−y| rather than √(x²+y²) (L¹ norm confusion)
2. Writing z̄=−x−iy (negating both parts) instead of z̄=x−iy (negating imaginary part only)
3. Confusing z·z̄=|z|² (a real non-negative number) with z² (which has an imaginary part unless y=0)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | MODULUS-IS-SUM | Student computes |z|=|x|+|y| (sum of absolute coordinates) instead of √(x²+y²) | Any modulus computation, especially for z where x and y are both non-zero |
| MC-2 | CONJUGATE-NEGATES-BOTH | Student writes z̄=−x−iy, negating both real and imaginary parts instead of only the imaginary part | Any conjugation step; also z̄=−z is written |
| MC-3 | ZZ-BAR-AS-Z-SQUARED | Student confuses z·z̄=|z|² (always real and positive) with z²=(x²−y²)+2xyi (complex in general) | Problems using z·z̄ to compute modulus or find |z|² |

**Foundational Misconception:** MC-1 (MODULUS-IS-SUM) — immediately leads to wrong metric, wrong Argand distances, wrong polar coordinates; addressed in A01.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: concrete vector in ℝ² with Euclidean distance (known); P: Argand plane with modulus as distance from origin; A: algebraic definition |z|=√(x²+y²), polar z=re^{iθ}, Euler's formula
2. **A02 P06 CONTRAST PAIR** — conjugation z̄ vs. negation −z; product z·z̄ vs. z²; key identities
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Three Representations

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Unify algebraic, geometric, and exponential forms; introduce the metric |z|; address MC-1

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (ℝ² vector with Euclidean distance):**

A point P=(3, 4) in the plane has coordinates (x,y)=(3,4). Its distance from the origin is:
d = √(3²+4²) = √(9+16) = √25 = **5**

This is the Pythagorean (Euclidean) distance — not 3+4=7.

**Stage P — Pictorial (Argand plane):**

Map z=3+4i to the point (3, 4) in the **Argand diagram** (complex plane):

```
Im
 4 ·──────────● z = 3+4i
 3 │         /
 2 │        /  |z| = 5
 1 │       /
 0 ─────────────── Re
   0  1  2  3
```

The modulus |z|=5 is the Euclidean distance from the origin. The argument θ=arctan(4/3)≈53.1°.

**Stage A — Algebraic (three equivalent forms):**

For z = x + iy:

| Form | Expression | Meaning |
|------|-----------|---------|
| Algebraic | x + iy | Real and imaginary parts |
| Polar | r(cosθ + i·sinθ) | r=|z|, θ=arg(z) |
| Exponential | re^{iθ} | Euler: e^{iθ}=cosθ+i·sinθ |

**Euler's formula (bridge from polar to exponential):**
e^{iθ} = cosθ + i·sinθ

Key values: e^{iπ/2}=i; e^{iπ}=−1; e^{i2π}=1; e^{i·0}=1

*Example conversion:* z=−1+i√3. r=√(1+3)=2; θ=π−arctan(√3)=π−π/3=**2π/3** (second quadrant).
z = 2e^{i2π/3} = 2(cos(2π/3)+i·sin(2π/3)) = 2(−1/2+i·√3/2) = −1+i√3 ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* z=5+12i. What is |z|?

(A) 17 (= 5+12)
(B) √(25+144) = √169 = 13
(C) √(5²−12²) = √(−119) — undefined
(D) 5·12 = 60

*Branch CORRECT (B):* |z| = √(5²+12²) = √169 = 13. ✓ This is the Pythagorean distance, not the sum of the parts. Proceed to A02.

*Branch PARTIAL:* You set up the formula correctly but may have simplified √169 as something other than 13. 5²+12²=25+144=169 and √169=13. Proceed to A02.

*Branch INCORRECT (A):* Answer A computes 5+12=17 — that is the L¹ norm, not the modulus. The modulus is the Euclidean distance: |z|=√(x²+y²)=√(25+144)=13. (MC-1 directly). Proceed to A02.

*Branch NO_RESPONSE:* |z| = √(x²+y²). Here x=5, y=12: |z|=√(25+144)=√169=13. Always use the Pythagorean formula, not the sum. Proceed to A02.

---

### Teaching Action A02 — Conjugate and Modulus Identity

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish z̄ from −z; prove |z|²=z·z̄; address MC-2 and MC-3

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Conjugate z̄ vs. Negation −z**

For z = a + bi:

| Operation | Formula | Geometric effect |
|-----------|---------|-----------------|
| Conjugate z̄ | a − bi | Reflect across the real axis |
| Negation −z | −a − bi | Rotate 180° about origin |
| Both: −z̄ | −a + bi | Reflect across imaginary axis |

*Example with z = 2 + 3i:*
- z̄ = 2 − 3i (same real part, negated imaginary part — MC-2 addressed)
- −z = −2 − 3i (both parts negated)
- −z̄ = −2 + 3i

```
Im
 3 ·         ● z = 2+3i
             |
─────────────┼─────────── Re
             |
-3 ·    -z̄ = ● −2+3i reflected wrong
  3 ·         ●  z̄ = 2−3i (correct conjugate)
```

**Contrast 2 — z·z̄ vs. z²**

For z = x + iy:

| | z·z̄ | z² |
|--|------|-----|
| Formula | (x+iy)(x−iy) = x²+y² | (x+iy)² = (x²−y²)+2xyi |
| Result type | Real, non-negative | Complex in general |
| Equals | **|z|²** | Not |z|² (unless y=0) |

*Key identity:* **z·z̄ = |z|²** (MC-3 addressed)

Applications:
- Find |z|: compute z·z̄ then take √
- Find Re(z) and Im(z): Re(z) = (z+z̄)/2; Im(z) = (z−z̄)/(2i)
- Division: z/w = z·w̄ / (w·w̄) = z·w̄ / |w|² — multiply by conjugate of denominator

*Example:* z = 1+2i. Compute z·z̄ and z²:
- z·z̄ = (1+2i)(1−2i) = 1+4 = 5 = |z|² ✓ (|z|=√5)
- z² = (1+2i)² = 1+4i+4i² = 1+4i−4 = −3+4i ≠ real number

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* z = 3 − 4i. Which is z·z̄?

(A) 9 − 16 = −7
(B) 9 + 16 = 25
(C) (3−4i)² = 9−24i−16 = −7−24i
(D) 3 + 4i (the conjugate, not the product)

*Branch CORRECT (B):* z̄ = 3+4i; z·z̄ = (3−4i)(3+4i) = 9−16i²=9+16=25=|z|². ✓ Always real and non-negative. Proceed to A03.

*Branch PARTIAL:* You may have computed correctly but simplified 9−16i² incorrectly. Since i²=−1, −16i²=+16. So z·z̄=9+16=25. Proceed to A03.

*Branch INCORRECT (A):* Answer A computes 9−16=−7, ignoring i². The factor −4i times +4i gives −16i²=+16 (since i²=−1). z·z̄=(3−4i)(3+4i)=9−16i²=9+16=25. Proceed to A03.

*Branch NO_RESPONSE:* z̄=3+4i. z·z̄=(3−4i)(3+4i)=9−(4i)²=9−16i²=9+16=25. This equals |z|²=5²=25. Proceed to A03.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A03 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*Show all work.*

**Problem 1.** z = 3 + 4i.
(a) Find |z| and z̄.
(b) Verify the identity |z|² = z·z̄.

**Problem 2.** z = −1 + i√3.
(a) Find |z| and arg(z) (use the correct quadrant).
(b) Write z in exponential polar form re^{iθ}.

**Problem 3.** Compute (1+i)⁶ using exponential polar form.
(1+i = √2·e^{iπ/4}, so (1+i)⁶ = ?)

**Problem 4.** For z = a + bi, derive Re(z) = (z+z̄)/2 and Im(z) = (z−z̄)/(2i) algebraically.

---

**[P55 — SCORE]**

*Answers:*

1. (a) |z| = √(9+16) = **5**; z̄ = **3−4i**
   (b) z·z̄ = (3+4i)(3−4i) = 9+16 = 25 = 5² = |z|² ✓

2. (a) |z| = √(1+3) = **2**; arg(z): second quadrant, ref angle=arctan(√3/1)=π/3 → θ=π−π/3=**2π/3**
   (b) **z = 2e^{i2π/3}**

3. 1+i = √2·e^{iπ/4}
   (1+i)⁶ = (√2)⁶·e^{i6π/4} = 8·e^{i3π/2} = 8(cos(3π/2)+i·sin(3π/2)) = 8(0−i) = **−8i**

4. z+z̄ = (a+bi)+(a−bi) = 2a → **(z+z̄)/2 = a = Re(z)** ✓
   z−z̄ = (a+bi)−(a−bi) = 2bi → **(z−z̄)/(2i) = 2bi/(2i) = b = Im(z)** ✓

Score 1 point per problem (P77 total: 4 points). Problem 1: both parts must be correct.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links NOT Tier-1)*

*Problem:* Let z = e^{iπ/3} (a complex number on the unit circle).

(a) Write z in algebraic form x+iy using Euler's formula.

(b) Find z̄ and verify |z|²=z·z̄=1.

(c) Compute z³ in exponential form, then convert to algebraic and verify directly by expanding (e^{iπ/3})³ = e^{iπ}.

(d) Describe the positions of z, z̄, and −z on the Argand diagram. What geometric transformation maps z to z̄? What maps z to −z?

*Expected answers:*

(a) z = cos(π/3)+i·sin(π/3) = **1/2 + i√3/2**

(b) z̄ = 1/2 − i√3/2 = e^{−iπ/3}
   z·z̄ = (1/2+i√3/2)(1/2−i√3/2) = 1/4+3/4 = **1** = |z|² ✓ (unit circle: |z|=1)

(c) z³ = e^{iπ/3·3} = e^{iπ} = cosπ+i·sinπ = **−1**
   Direct: z²=(1/2+i√3/2)²=1/4+i√3/2−3/4=−1/2+i√3/2; z³=z²·z=(−1/2+i√3/2)(1/2+i√3/2)=−1/4−i√3/4+i√3/4+i²·3/4=−1/4−3/4=**−1** ✓

(d) z is at angle π/3 on unit circle; z̄ is its reflection in the real axis (angle −π/3); −z is at angle π/3+π=4π/3 (rotation by π).
   z→z̄: **reflection in the real axis**; z→−z: **rotation by π (180°)** about the origin.

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all four parts correct).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.9 × 5⌉ = 5). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Re-examine missed item; if modulus error → B01; if conjugate error → B02; targeted repair |
| ≤ 3/5 | → Return to A01; re-engage ℝ²-to-ℂ bridge; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.cx.complex-numbers-analysis` complete. Threshold 0.9 requires 5/5 correct.

**Unlocks:** `math.cx.analytic-functions`

Next concept recommendation: `math.cx.analytic-functions` — where complex differentiability and the Cauchy-Riemann equations extend this framework.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — MODULUS-IS-SUM Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You computed |z|=|x|+|y|, the sum of coordinates. The modulus is the Euclidean (Pythagorean) distance from the origin, not the taxicab distance. The correct formula is |z|=√(x²+y²)."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* z=5+5i. Student writes |z|=10. Is this correct?
*Correct response:* No. |z|=√(25+25)=√50=5√2≈7.07. The sum gives 10 — the taxicab distance, not the Euclidean. On the Argand plane, distance is Pythagorean.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'add absolute values' → to: 'square, add, take square root' (Pythagorean theorem). Mnemonic: |z|² = x²+y² (think of the right triangle with legs x and y and hypotenuse |z|)."

---

### Repair Action B02 — CONJUGATE-NEGATES-BOTH Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote z̄=−x−iy, negating both parts. Conjugation only flips the sign of the imaginary part. z̄=x−iy — the real part is unchanged."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* z=−2+5i. What is z̄?
*Correct response:* z̄=**−2−5i** (keep real part −2; negate imaginary part +5 → −5). Not −(−2)−5i=2−5i.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'negate everything' → to: 'reflect across the real axis — only the imaginary part changes sign.' Geometrically: z̄ is the mirror image of z in the real axis. The real part (horizontal coordinate) stays the same."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | z=−3+4i. Find |z|, z̄, and verify |z|²=z·z̄. |
| R2 | 3 days | Write z=−√3+i in exponential polar form re^{iθ}. |
| R3 | 7 days | Compute (1−i)⁸ using exponential polar form. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | math.trig.eulers-formula (NOT Tier-1) |
| P76_mode | independence (cross-link NOT Tier-1) |
| Unlocks | math.cx.analytic-functions |
| Requires (Tier-1) | math.found.complex-numbers, math.trig.polar-form-complex |

**GR-8 compliance:** cross_links = [math.trig.eulers-formula]; NOT Tier-1 → documented.
**GR-9 compliance:** P76 uses an independent problem (unit circle z=e^{iπ/3}) unrelated to the non-Tier-1 cross-linked concept.

---

## Component 8 — Teaching Notes

- **Prerequisite leverage:** Students already know r(cosθ+isinθ) from math.trig.polar-form-complex. Euler's formula e^{iθ}=cosθ+isinθ is a rewrite, not a new fact — frame it that way. The exponential notation is more compact and makes De Moivre's theorem trivial: (re^{iθ})ⁿ=rⁿe^{inθ}.
- **|z|²=z·z̄ primacy:** This identity is the workhorse of complex analysis — it is used to rationalize denominators, compute moduli, and establish properties. Reinforce it as the "go-to" formula rather than squaring individually.
- **Argand diagram as ℝ²:** The bijection ℂ↔ℝ² means all ℝ² geometric intuition transfers: distance=|z−w|, midpoint=(z+w)/2, rotation by θ = multiplication by e^{iθ}. This geometric view should dominate; algebraic manipulation follows from it.
- **Riemann sphere:** Mentioned in the KG description but not gate-tested here — it is an advanced topic for future complex analysis courses. Keep it as a horizon.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=C; concrete ℝ² distance present in A01 | PASS |
| V-4 | bloom=understand → P07 not required | N/A |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A03) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (math.trig.eulers-formula, NOT T1) |
| V-11 | P76_mode = independence (GR-9, cross-link NOT Tier-1) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.9×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=3 → lean structure (2 main TAs + gate) | PASS (A01, A02, A03=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
