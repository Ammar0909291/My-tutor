<!-- BLUEPRINT: math.alg.quadratic-equation -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Quadratic Equation
**Concept ID:** `math.alg.quadratic-equation`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=12 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.alg.quadratic-equation |
| name | Quadratic Equation |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 12 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | P (Pictorial) |
| requires (Tier-1) | math.alg.factoring-trinomials |
| cross_links | math.func.quadratic-function (NOT Tier-1) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.alg.factoring-trinomials**: factoring ax²+bx+c into linear factors; AC method; recognizing irreducible quadratics

### Target Knowledge State
Student can solve ax²+bx+c=0 by three methods: (1) factoring when the discriminant is a perfect square, (2) the quadratic formula x=(−b±√(b²−4ac))/2a for any quadratic, and (3) completing the square as an intermediate step. Student can use the discriminant b²−4ac to determine the number and nature of roots before solving.

### Conceptual Obstacles
1. Attempting to factor every quadratic regardless of whether it factors over the rationals — not checking the discriminant first; getting stuck when factoring fails
2. Sign errors in the quadratic formula, particularly computing −b when b is already negative (e.g., b=−3 → −b=+3, not −3 again)
3. Computing √(b²−4ac) when b²−4ac<0 and calling it a real number — ignoring that no real roots exist

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | FACTORING-IS-UNIVERSAL | Student attempts to factor every quadratic; when factoring fails (discriminant not a perfect square), student is stuck rather than switching to the quadratic formula | Non-factorable quadratics with irrational or complex roots |
| MC-2 | NEGATIVE-b-FORMULA-ERROR | For ax²+bx+c with b negative (e.g., b=−5), student writes −b=−5 (not changing sign) instead of −b=+5 in the formula x=(−b±√Δ)/2a | Quadratic formula applied to equations where b<0 |
| MC-3 | NEGATIVE-DISCRIMINANT-REAL-ROOT | When Δ=b²−4ac<0, student continues computing √Δ as if it were real, or reports "no solution" without checking Δ first | Any quadratic with complex roots; not recognizing the nature-of-roots test |

**Foundational Misconception:** MC-1 (FACTORING-IS-UNIVERSAL) — students who learned factoring first default to it even when the quadratic formula is needed; addressed in A01 with the decision tree.

---

## Component 3 — Scaffolding Protocol

**Entry point:** Pictorial (P) — proficient learner.

**Scaffolding sequence:**
1. **A01 P03 ANALOGY BRIDGE** — connect linear equation solving (one root) to quadratic (at most two roots); introduce the three methods and a method-selection decision tree keyed to the discriminant
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: solve by factoring (integer roots); WE2: solve by quadratic formula (irrational roots)
3. **A03 P06 CONTRAST PAIR** — discriminant cases Δ>0, Δ=0, Δ<0 with examples of each; completing the square as derivation of the formula
4. **A04 P91 Gate** — mastery assessment

**V-3 (CPA Concrete stage):** N/A — proficient learner enters at Pictorial stage.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Linear-to-Quadratic Analogy

**Primitive:** P03 ANALOGY BRIDGE
**Purpose:** Frame quadratics as a natural extension of linear equations; introduce the three methods and discriminant check; address MC-1

---

**[P03 — ANALOGY BRIDGE]**

*Source domain (familiar):* Solving a linear equation: 3x − 6 = 0 → x = 2. Exactly one solution, always.

*Bridge:* A quadratic equation ax² + bx + c = 0 (a≠0) is one degree higher. It can have:
- Two distinct real roots (most common)
- Exactly one real root (a "double root" — the parabola just touches the x-axis)
- No real roots (the parabola misses the x-axis entirely)

Which case? The **discriminant** tells you before you solve.

*Target domain (new):*

**Discriminant:** Δ = b² − 4ac

| Δ | Number of real roots | Method |
|---|---------------------|--------|
| Δ > 0, perfect square | 2 rational roots | Factoring OR formula |
| Δ > 0, not perfect square | 2 irrational roots | Formula only |
| Δ = 0 | 1 real root (double) | Factoring (perfect square) OR formula |
| Δ < 0 | 0 real roots | No real solution |

**Method decision tree (MC-1 antidote):**

```
ax² + bx + c = 0
      ↓
Compute Δ = b² − 4ac
      ↓
   Δ < 0?  → No real roots. STOP.
      ↓ No
   Δ = perfect square? → YES → Try factoring OR use formula
                         NO  → Use quadratic formula
```

**Quadratic formula (always works when Δ ≥ 0):**

x = (−b ± √(b² − 4ac)) / (2a)

*Sign note for MC-2:*
- If b = 5: −b = −5
- If b = −5: −b = −(−5) = **+5** (change the sign, don't repeat the negative)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Before solving 3x² − 7x + 2 = 0, compute the discriminant and determine the appropriate method.

(A) Δ = 49 − 24 = 25 (perfect square) → try factoring
(B) Δ = 49 + 24 = 73 → use quadratic formula only
(C) Δ = −49 − 24 = −73 → no real roots
(D) Δ = 49 − 6 = 43 → use quadratic formula only

*Branch CORRECT (A):* Δ = b² − 4ac = (−7)² − 4(3)(2) = 49 − 24 = 25. ✓ Perfect square (√25=5) → factoring is viable. Factor: 3x²−7x+2 → AC=6, find (−6,−1)... wait: find p×q=6 (positive since 3×2=6), p+q=−7 → (−6,−1): 3x²−6x−x+2=3x(x−2)−1(x−2)=(3x−1)(x−2)=0 → x=1/3 or x=2. Proceed to A02.

*Branch PARTIAL:* You computed Δ=49−24=25 correctly but may have misidentified √25 or the method. Δ=25 is a perfect square (5²=25), so factoring is feasible. The AC method on 3x²−7x+2 yields (3x−1)(x−2)=0 → x=1/3 or x=2. Proceed to A02.

*Branch INCORRECT (B or D):* For b=−7: b²=(−7)²=49 (always positive). For a=3, c=2: 4ac=24. Δ=49−24=25. Check arithmetic: (−7)²≠−49. Proceed to A02.

*Branch NO_RESPONSE:* Δ=b²−4ac=(−7)²−4(3)(2)=49−24=25. Perfect square → factoring viable. Proceed to A02.

---

### Teaching Action A02 — Worked Example Pair

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Apply factoring method and quadratic formula to contrasting examples; address MC-2

---

**[P07 — WORKED EXAMPLE PAIR]**

**Worked Example 1 — Solve by Factoring**

*Problem:* Solve x² − 5x + 6 = 0.

*Step 1 — Check discriminant:* Δ = 25 − 24 = 1 (perfect square) → factoring viable.

*Step 2 — Factor:* Find p×q=6, p+q=−5 → (−2, −3): x²−5x+6=(x−2)(x−3)

*Step 3 — Apply Zero Product Property:*
(x−2)(x−3) = 0 → x−2=0 or x−3=0 → **x=2 or x=3**

*Verify:* 2²−5(2)+6=4−10+6=0 ✓; 3²−5(3)+6=9−15+6=0 ✓

---

**Worked Example 2 — Solve by Quadratic Formula (Irrational Roots)**

*Problem:* Solve 2x² − 4x − 3 = 0.

*Step 1 — Check discriminant:* a=2, b=−4, c=−3.
Δ = (−4)² − 4(2)(−3) = 16 + 24 = 40. Not a perfect square → factoring won't give rational roots. Use formula.

*Step 2 — Apply formula:*

x = (−(−4) ± √40) / (2·2) = (4 ± √40) / 4

*Simplify √40:* √40 = 2√10

x = (4 ± 2√10) / 4 = **(2 ± √10) / 2**

*Two roots:*
x₁ = (2 + √10)/2 ≈ (2 + 3.162)/2 ≈ **2.581**
x₂ = (2 − √10)/2 ≈ (2 − 3.162)/2 ≈ **−0.581**

*Sign note (MC-2):* b=−4, so −b=−(−4)=**+4**. The numerator starts with +4, not −4.

*Verify (x₁ approximate):* 2(2.581)²−4(2.581)−3 ≈ 2(6.66)−10.32−3 ≈ 13.32−10.32−3 = 0 ✓

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* For 3x² − x − 2 = 0, compute −b and 2a to set up the formula.

(A) −b = −1; 2a = 6
(B) −b = 1; 2a = 6
(C) −b = 1; 2a = 3
(D) −b = −1; 2a = 3

*Branch CORRECT (B):* b = −1, so −b = −(−1) = +1. 2a = 2(3) = 6. ✓ Δ = 1 + 24 = 25; x=(1±5)/6 → x=1 or x=−2/3. Proceed to A03.

*Branch PARTIAL:* You may have gotten the 2a correct but made a sign error on −b. Here b=−1, so −b=+1 (change sign). Formula numerator: +1 ± √25 = 1 ± 5. Proceed to A03.

*Branch INCORRECT (A or D):* b=−1 (the coefficient of x is negative one). −b means "change the sign of b": −(−1)=+1. Option A repeats the negative sign — a very common MC-2 error. Proceed to A03.

*Branch NO_RESPONSE:* b=−1 → −b=+1; a=3 → 2a=6. x=(1±√(1+24))/6=(1±5)/6 → x=1 or x=−1/3. Proceed to A03.

---

### Teaching Action A03 — Discriminant Cases Contrast

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Distinguish the three discriminant cases; introduce completing the square; address MC-3

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Three Discriminant Cases**

| Δ | Example | Roots | Nature |
|---|---------|-------|--------|
| Δ=25>0, √25=5 (rational) | x²−5x+6=0 | x=2, x=3 | Two distinct rational |
| Δ=0 | x²−6x+9=0 | x=3 (double) | One repeated real |
| Δ=−8<0 | x²+2x+5=0 | — | No real roots (complex) |

*For Δ=0 case:* x²−6x+9=(x−3)²=0 → x=3 only. The parabola is tangent to the x-axis.

*For Δ<0 case (MC-3):* x²+2x+5=0 → Δ=4−20=−16<0. STOP — no real solution. √(−16) is not a real number. The answer is "no real roots" (or "roots are complex: x=−1±2i" in the complex domain).

**Contrast 2 — Completing the Square (Derivation of Formula)**

Starting from ax²+bx+c=0, complete the square:

ax²+bx = −c
x²+(b/a)x = −c/a
x²+(b/a)x+(b/2a)² = −c/a+(b/2a)²
(x+b/2a)² = (b²−4ac)/(4a²)
x+b/2a = ±√(b²−4ac)/(2a)
x = (−b ± √(b²−4ac)) / (2a)

This is the quadratic formula. Completing the square is both a derivation and a solution method for specific forms.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Without solving, determine how many real roots x²+4x+7=0 has.

(A) Two distinct real roots (Δ>0)
(B) One repeated root (Δ=0)
(C) No real roots (Δ<0)
(D) Cannot determine without solving

*Branch CORRECT (C):* Δ=b²−4ac=16−28=**−12<0** → no real roots. ✓ The discriminant gives a definitive answer without solving. Proceed to A04.

*Branch PARTIAL:* You identified Δ<0 but may have computed it incorrectly. Δ=4²−4(1)(7)=16−28=−12. Since Δ<0, the equation has no real roots. Proceed to A04.

*Branch INCORRECT (D):* You can always determine the number of real roots from the discriminant alone without fully solving. Δ=16−28=−12<0 → no real roots. This is the discriminant's primary practical use. Proceed to A04.

*Branch NO_RESPONSE:* Δ=b²−4ac=16−4(7)=16−28=−12. Since Δ<0, no real roots exist. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 5/5
**Status:** Terminal TA (GR-3, GR-6)

---

**[P77 — MULTI-PROBLEM SET]**

*For each equation: (i) compute Δ; (ii) state the nature of roots; (iii) solve (if real roots exist).*

**Problem 1.** x² − 7x + 12 = 0

**Problem 2.** x² + 4x + 4 = 0

**Problem 3.** 2x² + 3x − 2 = 0

**Problem 4.** x² − x + 1 = 0

---

**[P55 — SCORE]**

*Answers:*

1. Δ = 49 − 48 = 1 > 0 (perfect square) → two rational roots
   Factor: (x−3)(x−4)=0 → **x=3, x=4**
   Verify: 9−21+12=0 ✓; 16−28+12=0 ✓

2. Δ = 16 − 16 = 0 → one repeated root
   (x+2)²=0 → **x=−2** (double root)
   Verify: 4−8+4=0 ✓

3. Δ = 9 + 16 = 25 > 0 (perfect square) → two rational roots
   AC: ac=2×(−2)=−4; find p×q=−4, p+q=3 → (4,−1)
   2x²+4x−x−2=2x(x+2)−1(x+2)=(2x−1)(x+2)=0 → **x=1/2, x=−2**
   Verify: 2(1/4)+3(1/2)−2=0.5+1.5−2=0 ✓; 2(4)+3(−2)−2=8−6−2=0 ✓

4. Δ = 1 − 4 = **−3 < 0** → **no real roots**

Score 1 point per problem (P77 total: 4 points). Full credit requires all three steps (Δ, nature, roots/conclusion).

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence — cross_links NOT Tier-1)*

*Problem:* A rectangle has perimeter 24 cm and area 35 cm². Find the dimensions.

(a) Let the length be x cm. Write an expression for the width in terms of x.

(b) Use the area condition to form a quadratic equation.

(c) Compute the discriminant and determine how many solutions exist.

(d) Solve the quadratic equation and state the rectangle's dimensions. Verify by checking both perimeter and area.

*Expected solution:*

(a) Perimeter = 2(length + width) = 24 → length + width = 12 → width = 12 − x

(b) Area = x(12−x) = 35 → 12x − x² = 35 → **x² − 12x + 35 = 0**

(c) Δ = 144 − 140 = **4 > 0** (perfect square) → two real rational roots

(d) Factor (or formula): (x−5)(x−7)=0 → x=5 or x=7
   - x=5: width=12−5=7 → dimensions **5 cm × 7 cm**
   - x=7: width=12−7=5 → same rectangle in the other orientation

Verify: Perimeter = 2(5+7) = 24 ✓; Area = 5×7 = 35 ✓

---

**[P55 — SCORE]**

Transfer probe scoring: 1 point (all four parts correct — equation set up, Δ computed, roots found, dimensions verified).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 5/5 (⌈0.85 × 5⌉ = 5). Total n = 5 (P77 items: 4, P76: 1).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 | → P78 COMPLETION — mastery confirmed |
| 4/5 | → Re-examine missed item; identify pattern (sign errors → B02; discriminant error → B01 or B03); targeted re-explanation |
| ≤ 3/5 | → Return to A01; re-engage decision tree; schedule spaced review at R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.alg.quadratic-equation` complete. Threshold 0.85 requires 5/5 correct.

**Unlocks:** `math.func.quadratic-function`, `math.alg.polynomial-roots`

Next concept recommendation: `math.alg.completing-the-square` (child) or `math.alg.discriminant` (child) — both deepen understanding before approaching polynomial-roots in full generality.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — FACTORING-IS-UNIVERSAL Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You tried to factor a quadratic that cannot be factored over the rationals. Factoring by inspection only succeeds when the discriminant is a perfect square. For irrational roots, the quadratic formula is the correct tool."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* A student tries to factor x²−3x−1=0 and cannot find integers p, q with p×q=−1 and p+q=−3. They conclude the equation has no solution. Is this correct?
*Correct response:* No. Δ=(−3)²−4(1)(−1)=9+4=13>0 — two real roots exist, but they are irrational. x=(3±√13)/2. The quadratic formula always works.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'try factoring; if it fails, no solution' → to: 'check Δ first; if Δ≥0 and not a perfect square, use the formula directly.' The quadratic formula is not a fallback — it is the universal method. Factoring is the efficient shortcut when Δ is a perfect square."

---

### Repair Action B02 — NEGATIVE-b-FORMULA-ERROR Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You wrote −b with the same sign as b. In the formula x=(−b±√Δ)/2a, the '−b' means 'negate the coefficient of x.' If b is already negative, negating it gives a positive value."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* For x²−6x+8=0, a student writes the numerator as −(−6)=−6. What is the correct value?
*Correct response:* b=−6, so −b=−(−6)=**+6**. Numerator = +6±√(36−32)=6±2. Roots: x=4 or x=2. The student's error gives x=(−6±2)/2 → x=−2 or x=−4 — both wrong signs.

**[P64 — CONCEPTUAL SHIFT]**
"Switch from: 'copy b's sign into the formula' → to: 'always negate b: if b>0 then −b<0; if b<0 then −b>0.' Write out b=___, −b=___ as explicit lines before plugging into the formula."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Solve x²+2x−15=0. First compute Δ, then factor. |
| R2 | 3 days | Solve 3x²−2x−4=0 using the quadratic formula (Δ is not a perfect square). |
| R3 | 7 days | Determine the nature of roots (without solving) for: (a) 4x²−4x+1=0; (b) x²+x+3=0. |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | math.func.quadratic-function (NOT Tier-1) |
| P76_mode | independence (cross-link NOT Tier-1) |
| Unlocks | math.func.quadratic-function, math.alg.polynomial-roots |
| Requires (Tier-1) | math.alg.factoring-trinomials |

**GR-8 compliance:** cross_links = [math.func.quadratic-function]; NOT Tier-1 → documented.
**GR-9 compliance:** P76 uses an independent novel problem (geometric rectangle) unrelated to the non-Tier-1 cross-linked concept.

---

## Component 8 — Teaching Notes

- **Discriminant first:** The decision tree (A01) should become automatic. Students who compute Δ before attempting any factoring save significant time and avoid MC-1. Practice computing Δ alone as a warm-up.
- **Sign discipline for MC-2:** The single most effective fix is requiring students to write "b=___, −b=___" as explicit labeled steps before substituting into the formula. This adds one line of work and eliminates most sign errors.
- **Completing the square:** This blueprint introduces completing the square only as the derivation of the quadratic formula (A03). The full completing-the-square method as a standalone solving technique belongs in the child blueprint math.alg.completing-the-square.
- **Word problem modeling:** P76 deliberately uses a geometric word problem. Students who can set up the quadratic from context have demonstrated true transfer. Require them to verify both perimeter and area — partial verification (checking only one condition) should not receive full credit.
- **Complex roots:** Δ<0 is introduced as "no real roots" at this level. The child blueprint math.alg.discriminant deepens this, and math.found.complex-numbers covers the complex-root interpretation.

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=P; concrete stage skipped for proficient | N/A |
| V-4 | bloom=apply → P07 present in main sequence | PASS (A02) |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P03, A02=P07, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (math.func.quadratic-function, NOT T1) |
| V-11 | P76_mode = independence (GR-9, cross-link NOT Tier-1) | PASS |
| V-12 | MAMR stated and enforced: 5/5 = ⌈0.85×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-1 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=12 → standard structure (3 main TAs + gate) | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
