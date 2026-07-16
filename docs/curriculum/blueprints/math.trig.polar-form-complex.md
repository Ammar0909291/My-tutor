# Teaching Blueprint — math.trig.polar-form-complex

## Component 0 — Metadata
concept_id: math.trig.polar-form-complex
concept_name: Polar Form of Complex Numbers
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: apply
estimated_hours: 8
mastery_threshold: 0.75
CPA_entry_stage: C
requires: [math.found.complex-numbers, math.trig.trig-functions, math.geom.polar-coordinates]
cross_links: [math.cx.complex-numbers-analysis]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** A complex number z = a + bi is fully described by its modulus r = |z| = √(a²+b²) (distance from origin in the Argand plane) and argument θ = arg(z) (angle from positive real axis). The polar form is z = r(cosθ + i sinθ), and by Euler's formula z = re^(iθ). Conversion between Cartesian and polar requires quadrant-aware angle computation. Multiplication in polar form is geometrically elegant: z₁z₂ = r₁r₂(cos(θ₁+θ₂) + i sin(θ₁+θ₂)) — multiply moduli, add arguments. De Moivre's theorem follows immediately: zⁿ = rⁿ(cos(nθ) + i sin(nθ)).

**Conceptual progression:**
1. The Argand plane: horizontal axis = Re(z); vertical axis = Im(z); complex number z = a+bi is the point (a,b).
2. Modulus: r = |z| = √(a²+b²) (distance from origin; always non-negative).
3. Argument: θ = arg(z) = angle from positive real axis, measured counterclockwise; quadrant of (a,b) determines the correct range.
4. Cartesian → polar: r = √(a²+b²); θ determined from quadrant and arctan(|b/a|).
5. Polar → Cartesian: a = r cosθ; b = r sinθ.
6. Multiplication: (r₁e^{iθ₁})(r₂e^{iθ₂}) = r₁r₂e^{i(θ₁+θ₂)}.
7. De Moivre: (re^{iθ})ⁿ = rⁿe^{inθ} = rⁿ(cos(nθ) + i sin(nθ)).

**CPA arc (entry: C):**
- Concrete: compass/radar analogy — a location described by (distance r from origin, direction θ from north); multiplication rotates and scales.
- Pictorial: Argand diagram with r as arrow length, θ as arrow angle; multiplying z₁z₂ visualised as composing rotations and scaling.
- Abstract: polar form z=r(cosθ+i sinθ)=re^{iθ}; multiplication rule; De Moivre's theorem.

**Prior knowledge activated:** complex numbers (math.found.complex-numbers) — Cartesian form a+bi, modulus, conjugate; trig functions (math.trig.trig-functions) — sin, cos, values at key angles, quadrant signs; polar coordinates (math.geom.polar-coordinates) — (r,θ) coordinate system, Cartesian↔polar conversion.

---

## Component 2 — Misconception Registry

### MC-1: ARGUMENT-FROM-ARCTAN-ONLY [FOUNDATIONAL]
**Description:** Learner computes θ = arctan(b/a) without adjusting for quadrant, giving a wrong angle for z in Q2, Q3, or Q4.
**Surface form:** "z = −1+i: arctan(1/−1) = arctan(−1) = −π/4. So θ = −π/4." Correct: Q2 → θ = π − π/4 = 3π/4.
**Root cause:** The arctan function returns values in (−π/2, π/2) (only Q1 and Q4). Learners use it directly without identifying which quadrant (a,b) lies in.
**Trigger condition:** Any complex number with a < 0 (Q2 or Q3) or any with a > 0, b < 0 (Q4 close to boundary).
**Repair target:** TA-B01.

### MC-2: MODULUS-SQUARED-AS-MODULUS
**Description:** Learner computes |z| = a²+b² (omitting the square root), or writes |z|² for the modulus.
**Surface form:** "z = 3+4i: |z| = 3²+4² = 25." Correct: |z| = √(9+16) = √25 = 5.
**Root cause:** Conflating |z|² = a²+b² (the modulus squared, used in z·z̄ = |z|²) with |z| = √(a²+b²). The squared formula appears in conjugate-product calculations and is easily over-generalised.
**Trigger condition:** Any modulus computation, especially when a²+b² is a perfect square (camouflages the error).
**Repair target:** TA-B02.

### MC-3: MULTIPLICATION-BY-ADDING-MODULI
**Description:** When multiplying complex numbers in polar form, learner adds the moduli (as for addition) instead of multiplying them.
**Surface form:** "z₁ = 2(cosα+i sinα), z₂ = 3(cosβ+i sinβ): z₁z₂ = 5(cos(α+β)+i sin(α+β))." Correct: modulus = 2×3 = 6, not 2+3 = 5.
**Root cause:** Confusion between the ADDITION rule (add components → not simple in polar) and the MULTIPLICATION rule (multiply moduli, add arguments). The argument-addition part is correct; the modulus-multiplication part is replaced by addition by analogy with Cartesian addition.
**Trigger condition:** Any polar-form multiplication or division; any application of De Moivre requiring a new modulus.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Convert the polar coordinate (3, π/3) to Cartesian." Correct: x=3cos(π/3)=3/2; y=3sin(π/3)=3√3/2. This confirms sin/cos fluency and polar-to-Cartesian conversion from math.geom.polar-coordinates. Then: "Plot z = 1+i on the Argand plane. What is |z|?" (|z|=√2.) This anchors the Argand-plane interpretation.

**Scaffolding ladder:**
- Rung 1 (concrete): navigator analogy — r as distance from port, θ as compass bearing; multiplying trips rotates and scales the journey.
- Rung 2 (pictorial): Argand diagram; draw z, mark r and θ; quadrant grid showing sign of sin and cos in each quadrant.
- Rung 3 (abstract): conversion formulas; multiplication rule; De Moivre for powers.

**Pacing note:** h=8 estimated hours; A01 in sessions 1–2, A02 in sessions 3–5, A03 in sessions 6–7; mastery gate in session 8.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

CONCRETE ANCHOR (CPA entry = C):
"Imagine a navigator on a ship. They describe every destination by two numbers: (1) how FAR from port (distance r); (2) which DIRECTION (angle θ from north). To reach 'point z', sail r km at bearing θ. This is the polar description of a location."

SOURCE DOMAIN: Polar coordinates (r, θ) in the Argand plane.
- Every point in the plane has a unique distance r ≥ 0 from the origin and (for r>0) an angle θ ∈ [0, 2π).
- Cartesian ↔ polar: a = r cosθ; b = r sinθ; r = √(a²+b²); θ from quadrant + arctan.

TARGET DOMAIN: Polar form of a complex number z = a + bi.
- The Argand plane treats z = a+bi as the point (a,b): real part a on horizontal axis, imaginary part b on vertical axis.
- Modulus: |z| = r = √(a²+b²) — distance from origin.
- Argument: arg(z) = θ — angle counterclockwise from positive real axis.
- Polar form: z = r(cosθ + i sinθ) = re^{iθ} (by Euler's formula, introduced here as a fact).

BRIDGE TABLE:
| Polar coordinate | Complex number | Interpretation |
|---|---|---|
| Distance r ≥ 0 | Modulus |z| = r | How "large" z is |
| Angle θ from +x axis | Argument arg(z) = θ | Which "direction" z points |
| (r, θ) → (r cosθ, r sinθ) | a = r cosθ, b = r sinθ | Polar → Cartesian |
| r = √(a²+b²) | |z| = √(a²+b²) | Cartesian → modulus |
| θ = quadrant-adjusted arctan | arg(z) = quadrant-adjusted arctan | Cartesian → argument |

QUADRANT-AWARE ARGUMENT RULE:
```
Given z = a + bi, compute reference angle φ = arctan(|b/a|) ∈ [0, π/2].
Q1 (a>0, b>0): θ = φ
Q2 (a<0, b>0): θ = π − φ
Q3 (a<0, b<0): θ = π + φ
Q4 (a>0, b<0): θ = 2π − φ  (or equivalently −φ)
Special: a=0,b>0 → θ=π/2; a=0,b<0 → θ=3π/2; b=0,a>0 → θ=0; b=0,a<0 → θ=π.
```

WORKED CONVERSION — Cartesian to polar:
z = 1 + i. a=1>0, b=1>0 → Q1. r=√(1+1)=√2. φ=arctan(1/1)=π/4. θ=π/4.
Polar form: z = √2(cos(π/4) + i sin(π/4)).

WORKED CONVERSION — Polar to Cartesian:
w = 4(cos(π/3) + i sin(π/3)). a=4cos(π/3)=4·(1/2)=2; b=4sin(π/3)=4·(√3/2)=2√3.
Cartesian: w = 2 + 2√3·i.

**Assessment primitive: P49**

PROBE: "Find the polar form of z = −√3 + i."
- CORRECT: "r=√(3+1)=2. a<0,b>0 → Q2. φ=arctan(1/√3)=π/6. θ=π−π/6=5π/6. Polar: 2(cos(5π/6)+i sin(5π/6))." → proceed to A02.
- PARTIAL: correct r=2 and φ=π/6 but θ=π/6 (forgot Q2 adjustment) → Repair B01. "z is in Q2 (a=−√3<0, b=1>0). Q2 rule: θ=π−φ=π−π/6=5π/6."
- INCORRECT: r=√(3+1)²=4 (MC-2, squared modulus) → Repair B02. "|z|=√(a²+b²)=√(3+1)=√4=2. The square root is required."
- NO_RESPONSE: "Step 1: r=√((−√3)²+1²)=√(3+1)=2. Step 2: a=−√3<0, b=1>0 → Q2. φ=arctan(1/√3)=π/6. θ=π−π/6=5π/6. Polar form: 2(cos(5π/6)+i sin(5π/6))."

---

### TA-B01 — Repair for MC-1 (ARGUMENT-FROM-ARCTAN-ONLY)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'arg(z) = arctan(b/a) always.' arctan returns values only in (−π/2, π/2) — it only covers Q1 and Q4. For z in Q2 or Q3, the argument must be adjusted by +π or −π."

**P41 — MISCONCEPTION DETECTOR**
"z = −1+i. arctan(1/−1) = arctan(−1) = −π/4. Plot z: is it in Q1/Q4 (where −π/4 would make sense) or Q2?
(A) arctan gives the correct angle −π/4.
(B) z = (−1,1) is in Q2; the correct angle is in (π/2, π). −π/4 ∉ (π/2,π). Adjust: θ = π−π/4 = 3π/4."
[If A: learner holds MC-1.]
"Evaluate: cos(3π/4)=−√2/2; sin(3π/4)=√2/2. So √2(cos(3π/4)+i sin(3π/4))=−1+i ✓. Evaluate cos(−π/4)=√2/2; sin(−π/4)=−√2/2 → √2(cos(−π/4)+i sin(−π/4))=1−i ✗."

**P64 — CONCEPTUAL SHIFT**
"The argument is the ACTUAL angle of the point (a,b) in standard position — it must lie in the correct quadrant. arctan gives a reference angle φ = arctan(|b/a|) ∈ [0,π/2], which is always positive. Then adjust by quadrant: Q1→φ, Q2→π−φ, Q3→π+φ, Q4→2π−φ. Alternative: always PLOT z first; the quadrant tells you the range of θ; check that your answer lands in that range. If θ ∈ (π/2,π) and a<0, b>0 ✓ (Q2); if θ=−π/4 but a<0,b>0 ✗ → wrong quadrant, fix it."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Cartesian→polar conversion in Q3, then multiplication:
Let z₁ = −2−2i and z₂ = 1+i√3.

Convert z₁: r₁=√(4+4)=2√2; Q3 (a<0,b<0): φ=arctan(2/2)=π/4; θ₁=π+π/4=5π/4.
z₁ = 2√2(cos(5π/4)+i sin(5π/4)).

Convert z₂: r₂=√(1+3)=2; Q1 (a>0,b>0): θ₂=arctan(√3/1)=π/3.
z₂ = 2(cos(π/3)+i sin(π/3)).

Multiply z₁z₂:
Modulus: r₁·r₂ = 2√2·2 = 4√2.
Argument: θ₁+θ₂ = 5π/4+π/3 = 15π/12+4π/12 = 19π/12.
z₁z₂ = 4√2(cos(19π/12)+i sin(19π/12)).

Verify (Cartesian): (−2−2i)(1+i√3) = −2−2i√3−2i−2i²√3 = −2+2√3+(−2√3−2)i.
|z₁z₂| = √((−2+2√3)²+(−2√3−2)²) = √(4−8√3+12+12+8√3+4) = √32 = 4√2 ✓.

---

WORKED EXAMPLE 2 — De Moivre's theorem for powers:
Find (1+i)⁸.

Convert 1+i: r=√2; θ=π/4. Polar: √2·(cos(π/4)+i sin(π/4)).

Apply De Moivre: (√2)⁸(cos(8·π/4)+i sin(8·π/4)) = 2⁴·(cos(2π)+i sin(2π)) = 16·(1+0) = 16.

Verify by squaring:
(1+i)² = 1+2i+i² = 2i.
(2i)² = 4i² = −4.
(−4)² = 16. ✓

KEY CONTRAST between WE1 and WE2:
- WE1: convert to polar, then multiply (moduli multiply, arguments add). Polar form makes products elegant.
- WE2: polar form makes powers trivial via De Moivre; Cartesian-form powers would require repeated multiplication.

**Assessment primitive: P49**

PROBE: "Find z·w in polar form where z = √3+i and w = 1+i√3."
- CORRECT: "z: r₁=2, θ₁=π/6. w: r₂=2, θ₂=π/3. z·w: r=4, θ=π/6+π/3=π/2. 4(cos(π/2)+i sin(π/2))=4i. Verify: (√3+i)(1+i√3)=√3+3i+i+i²√3=√3−√3+4i=4i ✓." → proceed to A03.
- PARTIAL: correct moduli r₁=2,r₂=2 but product modulus = 4 stated as 2+2=4 (MC-3 coincidence) → trigger B03 check. "How did you get modulus 4? If by 2+2, that's the wrong rule. Correct: 2×2=4. (Same answer but wrong method.)"
- INCORRECT: "r=2+2=4, θ=π/6+π/3=π/2. 4(cos(π/2)+i sin(π/2))" (MC-3: adds moduli) → Repair B03. "Multiplication rule: MULTIPLY moduli; ADD arguments. r=r₁·r₂=2·2=4."
- NO_RESPONSE: "Step 1: convert z: r=|√3+i|=√(3+1)=2; Q1: θ=arctan(1/√3)=π/6. Step 2: convert w: r=|1+i√3|=2; Q1: θ=arctan(√3)=π/3. Step 3: product: r=2·2=4; θ=π/6+π/3=π/2. Result: 4(cos(π/2)+i sin(π/2))."

---

### TA-B02 — Repair for MC-2 (MODULUS-SQUARED-AS-MODULUS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: '|z| = a²+b².' This is |z|², the SQUARED modulus. The modulus itself is |z| = √(a²+b²)."

**P41 — MISCONCEPTION DETECTOR**
"z = 3+4i. Compute (A) 3²+4² = 25; (B) √(3²+4²) = 5. Plot z: it is 5 units from the origin (by the Pythagorean theorem, hypotenuse of the 3-4-5 right triangle). Which formula gives the geometric distance?
(A) 25.
(B) 5."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"|z| is a DISTANCE — it is measured in the same units as a and b. For z = 3+4i: the point is (3,4); distance from origin = √(3²+4²) = 5 by the Pythagorean theorem. The formula a²+b² gives the SQUARE of the distance — useful in conjugate products (z·z̄ = |z|²) but NOT the modulus itself. Always take the square root: |z| = √(a²+b²) ≥ 0. Quick check: for z = i = 0+1i, |i| must be 1 (distance 1 from origin). √(0+1) = 1 ✓; (0+1) = 1 (same here, but for z=2i: √4=2 vs 4; the difference matters)."

→ Return to A01.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

CONTRAST 1 — Cartesian vs polar form: when to use each:
| Operation | Better form | Reason |
|---|---|---|
| Addition: z₁+z₂ | Cartesian (a+bi) | Add real and imaginary parts: (a₁+a₂)+(b₁+b₂)i |
| Multiplication: z₁z₂ | Polar (re^{iθ}) | Multiply moduli, add arguments |
| Powers: zⁿ | Polar (De Moivre) | rⁿ(cos nθ + i sin nθ) in one step |
| Modulus: |z| | Either | r = √(a²+b²) |
| Conjugate: z̄ | Cartesian | z̄ = a−bi; or polar: z̄ = re^{−iθ} |
| Roots (z^{1/n}) | Polar | r^{1/n}(cos((θ+2kπ)/n)+i sin(…)); n roots total |

CONTRAST 2 — Quadrant cases side-by-side:
| z | Quadrant | r | Reference φ | θ | Polar form |
|---|---|---|---|---|---|
| 1+i | Q1 | √2 | π/4 | π/4 | √2 e^{iπ/4} |
| −1+i | Q2 | √2 | π/4 | 3π/4 | √2 e^{i3π/4} |
| −1−i | Q3 | √2 | π/4 | 5π/4 | √2 e^{i5π/4} |
| 1−i | Q4 | √2 | π/4 | 7π/4 | √2 e^{i7π/4} |

"All four have the same modulus √2 and the same reference angle π/4. Only the quadrant shifts θ. Notice: rotating by π/2 between consecutive quadrants."

CONTRAST 3 — Multiplication rule vs addition confusion:
z₁ = 2e^{iπ/3}, z₂ = 3e^{iπ/6}.
- WRONG: z₁z₂ = (2+3)e^{i(π/3+π/6)} = 5e^{iπ/2} = 5i. (Added moduli.)
- CORRECT: z₁z₂ = (2·3)e^{i(π/3+π/6)} = 6e^{iπ/2} = 6i. (Multiplied moduli.)
- Division: z₁/z₂ = (r₁/r₂)e^{i(θ₁−θ₂)} = (2/3)e^{i(π/3−π/6)} = (2/3)e^{iπ/6}. (Divide moduli, subtract arguments.)

**Assessment primitive: P49**

PROBE: "Convert w = 5(cos(2π/3)+i sin(2π/3)) to Cartesian form. Then find w³."
- CORRECT: "Cartesian: a=5cos(2π/3)=5·(−1/2)=−5/2; b=5sin(2π/3)=5·(√3/2)=5√3/2. w=−5/2+5√3i/2. For w³: De Moivre: r³=125; nθ=2π. w³=125(cos2π+i sin2π)=125(1+0)=125." → proceed to A04.
- PARTIAL: correct Cartesian but error in w³ (e.g., 5³=125 correct but 3·(2π/3)=2π≠3π) → "3θ=3·(2π/3)=2π. cos(2π)=1, sin(2π)=0. So w³=125·1=125."
- INCORRECT: For Cartesian: a=5cos(2π/3) computed as 5·cos(2π)·cos(3)=wrong → "cos(2π/3): 2π/3 is 120°; cos(120°)=−1/2. So a=5·(−1/2)=−5/2."
- NO_RESPONSE: "Cartesian: a=5cos(2π/3)=5·(−1/2)=−5/2; b=5sin(2π/3)=5·(√3/2)=5√3/2. De Moivre: r=5,θ=2π/3. w³=5³(cos(3·2π/3)+i sin(3·2π/3))=125(cos2π+i sin2π)=125."

---

### TA-B03 — Repair for MC-3 (MULTIPLICATION-BY-ADDING-MODULI)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'z₁z₂ has modulus r₁+r₂ (add moduli).' The polar multiplication rule MULTIPLIES moduli and ADDS arguments: |z₁z₂| = |z₁|·|z₂|; arg(z₁z₂) = arg(z₁)+arg(z₂)."

**P41 — MISCONCEPTION DETECTOR**
"z=i (modulus 1, arg π/2); w=i (modulus 1, arg π/2). z·w = i²= −1 (modulus 1, arg π).
Using addition rule: |z·w| = 1+1 = 2. But |i²| = |−1| = 1 ≠ 2.
Using multiplication rule: |z·w| = 1·1 = 1 ✓; arg = π/2+π/2 = π ✓ (−1 is at angle π).
(A) Moduli add → |z·w|=2.
(B) Moduli multiply → |z·w|=1."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Multiplication SCALES and ROTATES. Multiplying by z₂=r₂e^{iθ₂}: scale by r₂ (multiply radius); rotate by θ₂ (add angle). Scaling by r₂ means the new radius is r₁·r₂ (not r₁+r₂). Proof: (r₁e^{iθ₁})(r₂e^{iθ₂}) = r₁r₂·e^{i(θ₁+θ₂)} — the exponent law for multiplication applies to complex exponentials. Memory cue: multiplication → multiply (moduli); add (arguments). Never mix up which operation applies where."

→ Return to A02.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (ARGUMENT-FROM-ARCTAN-ONLY)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (MODULUS-SQUARED-AS-MODULUS)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B03 — Repair for MC-3 (MULTIPLICATION-BY-ADDING-MODULI)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A02.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Let z = 1−i√3. (a) Find polar form. (b) Compute z⁶. (c) Find all cube roots of z."
[Expected: (a) r=2; Q4: φ=arctan(√3)=π/3; θ=2π−π/3=5π/3. z=2e^{i5π/3}. (b) z⁶=64e^{i·10π}=64(cos0+i sin0)=64. (c) Cube roots of 2e^{i5π/3}: r^{1/3}=2^{1/3}; θ_k=(5π/3+2kπ)/3 for k=0,1,2: θ_0=5π/9, θ_1=5π/9+2π/3=11π/9, θ_2=5π/9+4π/3=17π/9. Three roots: 2^{1/3}e^{i5π/9}, 2^{1/3}e^{i11π/9}, 2^{1/3}e^{i17π/9}.]

**Day 10 prompt:**
"Prove De Moivre's theorem by induction: (cosθ+i sinθ)ⁿ = cos(nθ)+i sin(nθ) for positive integers n."
[Expected: Base n=1: trivially true. Inductive step: assume (cosθ+i sinθ)ᵏ=cos(kθ)+i sin(kθ). Then (cosθ+i sinθ)^{k+1}=(cosθ+i sinθ)^k·(cosθ+i sinθ)=(cos(kθ)+i sin(kθ))(cosθ+i sinθ)=cos(kθ)cosθ−sin(kθ)sinθ+i(sin(kθ)cosθ+cos(kθ)sinθ)=cos((k+1)θ)+i sin((k+1)θ) using sum formulas. ∎]

**Day 30 prompt:**
"Use De Moivre to express cos(3θ) and sin(3θ) in terms of sin θ and cos θ. Then verify with cos(π/6) and sin(π/6)."
[Expected: (cosθ+i sinθ)³ = cos(3θ)+i sin(3θ). Expand: cos³θ+3cos²θ(i sinθ)+3cosθ(i sinθ)²+(i sinθ)³ = cos³θ−3cosθsin²θ+i(3cos²θsinθ−sin³θ). Real: cos3θ=cos³θ−3cosθsin²θ=4cos³θ−3cosθ. Imaginary: sin3θ=3cos²θsinθ−sin³θ=3sinθ−4sin³θ. Check θ=π/6: cos(π/2)=0; 4(√3/2)³−3(√3/2)=4·3√3/8−3√3/2=3√3/2−3√3/2=0 ✓.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.found.complex-numbers — Cartesian form a+bi, modulus |z|=√(a²+b²), conjugate z̄, arithmetic; this blueprint introduces the polar representation of the same objects
- math.trig.trig-functions — sin, cos values at key angles (π/6, π/4, π/3, π/2 and quadrant extensions); required for polar↔Cartesian conversion
- math.geom.polar-coordinates — (r,θ) coordinate system, atan2 quadrant correction, Cartesian↔polar formulas; this blueprint applies the same machinery to the complex plane

**Unlocked blueprints:** none directly in Tier 1 beyond this point (polar-form-complex is a terminal topic in its sub-branch).

**Cross-links:**
- math.cx.complex-numbers-analysis (Tier 1) — Euler's formula e^{iθ}=cosθ+i sinθ; exponential form z=re^{iθ}; complex exponential arithmetic; analytic functions on ℂ. This blueprint introduces the polar form; complex-numbers-analysis deepens it via the exponential function and its analytic properties.

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (ARGUMENT-FROM-ARCTAN-ONLY) is the most frequent error and causes systematic wrong answers for 75% of inputs (all non-Q1 cases). Build the quadrant-aware argument rule as a habit from A01: always identify quadrant first, then compute reference angle, then adjust.

**Argand diagram as anchor:** Insist on a sketch for every conversion. The diagram makes the quadrant visible and makes the argument feel like a direction rather than a formula output. Learners who skip the sketch are far more vulnerable to MC-1.

**Multiplication as geometry:** Emphasise the geometric interpretation — multiplication by re^{iθ} scales by r and rotates by θ. This makes the modulus-multiplication rule feel inevitable (scaling by r₁ then by r₂ = scaling by r₁r₂) and exposes MC-3 as a category error (adding lengths versus composing scalings).

**De Moivre as a special case:** Do not present De Moivre as a separate theorem to memorise — derive it in class as zⁿ = (re^{iθ})ⁿ = rⁿe^{inθ} using the exponential power rule. Learners who see the derivation immediately understand why De Moivre must hold.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 11 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P06
- [x] V-3: CPA_entry_stage=C (advanced difficulty); A01 opens with concrete navigator analogy ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = cross-link-probe; math.cx.complex-numbers-analysis IS Tier 1; P76 probes the structural connection to Euler's formula (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 cross-link probe uses z=−1+i√3; connects polar form to Euler's formula and complex analysis
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.75 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: all conversions verified; multiplication examples confirmed by Cartesian expansion; De Moivre examples verified by direct squaring; quadrant angle formulas are standard atan2 equivalents

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.75 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Convert z = −2−2i to polar form."
[Expected: r=√(4+4)=2√2; Q3 (a<0,b<0): φ=arctan(2/2)=π/4; θ=π+π/4=5π/4. Polar: 2√2(cos(5π/4)+i sin(5π/4)).]

**Item 2:**
"Convert w = 5(cos(2π/3)+i sin(2π/3)) to Cartesian form."
[Expected: a=5cos(2π/3)=5·(−1/2)=−5/2; b=5sin(2π/3)=5·(√3/2)=5√3/2. Cartesian: −5/2+(5√3/2)i.]

**Item 3:**
"Let z = √3+i and w = 1+i√3. Find z·w in polar form, then convert to Cartesian."
[Expected: z: r₁=2, Q1: θ₁=arctan(1/√3)=π/6. w: r₂=2, Q1: θ₂=arctan(√3/1)=π/3. z·w: r=4; θ=π/6+π/3=π/2. Polar: 4(cos(π/2)+i sin(π/2)). Cartesian: 4i. Verify: (√3+i)(1+i√3)=√3+3i+i+i²√3=(√3−√3)+(3+1)i=4i ✓.]

**Item 4:**
"Use De Moivre's theorem to find (1+i)⁶."
[Expected: r=√2; θ=π/4. (√2)⁶=8; nθ=6·π/4=3π/2. (1+i)⁶=8(cos(3π/2)+i sin(3π/2))=8(0−i)=−8i. Verify: (1+i)²=2i; (2i)³=8i³=8·(−i)=−8i ✓.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe: math.cx.complex-numbers-analysis)

"Let z = −1+i√3.

(a) Convert z to polar form and write it as re^{iθ} using Euler's formula e^{iθ} = cosθ+i sinθ.
(b) Compute z³ using the exponential form. Verify in Cartesian form.
(c) Briefly explain how the exponential form z = re^{iθ} connects polar coordinates (as used in this topic) to the complex exponential function (the foundation of complex analysis)."

[Expected:
(a) r=√(1+3)=2; Q2 (a=−1<0,b=√3>0): φ=arctan(√3/1)=π/3; θ=π−π/3=2π/3.
  z = 2e^{i2π/3} = 2(cos(2π/3)+i sin(2π/3)).
(b) z³ = (2e^{i2π/3})³ = 8e^{i·2π} = 8(cos2π+i sin2π) = 8·1 = 8.
  Cartesian verify: z=−1+i√3. z²=(−1)²+(i√3)²+2(−1)(i√3)=1−3−2i√3=−2−2i√3.
  z³=z²·z=(−2−2i√3)(−1+i√3)=2−2i√3+2i√3−2i²·3=2+6=8 ✓.
(c) Euler's formula e^{iθ}=cosθ+i sinθ gives an exponential interpretation to rotation by θ. In polar coordinates, (r,θ) describes a point geometrically. In complex analysis, re^{iθ} describes the SAME point as a complex exponential. Multiplying two such numbers obeys the exponential law e^{iθ₁}·e^{iθ₂}=e^{i(θ₁+θ₂)}, which is why multiplication in ℂ corresponds to multiplying distances and adding angles — the polar multiplication rule is a geometric consequence of the exponential structure of ℂ.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) polar form correct with exponential notation, (b) z³=8 with Cartesian verification, and (c) makes a meaningful connection between polar coordinates and the exponential form; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (4–5/5): Learner can convert complex numbers between Cartesian and polar forms (with quadrant correction), multiply/divide in polar form, apply De Moivre, and connect polar form to the complex exponential.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Items 1 or 3 with θ in wrong quadrant: → TA-B01 (ARGUMENT-FROM-ARCTAN-ONLY repair), then re-gate
- FAIL on Item 1 with r=8 (=2√2 squared) or similar: → TA-B02 (MODULUS-SQUARED-AS-MODULUS repair), then re-gate
- FAIL on Item 3 with |z·w|=4 (=2+2, added moduli): → TA-B03 (MULTIPLICATION-BY-ADDING-MODULI repair), then re-gate
- FAIL on Item 4 only (De Moivre arithmetic): → return to A02 WE2; re-practise; re-gate
- FAIL on P76 only (Euler/exponential connection not articulated): → revisit cross-link bridge in A03; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated the ability to work with the polar form of complex numbers: converting between Cartesian and polar (with correct quadrant adjustment), multiplying and dividing using modulus and argument rules, applying De Moivre's theorem for powers, and connecting polar form to the complex exponential via Euler's formula.

Key anchors to carry forward:
- |z| = √(a²+b²); arg(z) = quadrant-adjusted arctan. Always identify quadrant first.
- Polar form: z = r(cosθ+i sinθ) = re^{iθ}.
- Multiplication: MULTIPLY moduli, ADD arguments. Never add moduli.
- De Moivre: zⁿ = rⁿ(cos nθ + i sin nθ). Polar form makes powers trivial.
- Euler's formula: e^{iθ} = cosθ+i sinθ connects geometry of ℂ to complex analysis.

Next concept: math.cx.complex-numbers-analysis — analytic functions, Cauchy–Riemann equations, complex integration, building on the exponential form introduced here."
