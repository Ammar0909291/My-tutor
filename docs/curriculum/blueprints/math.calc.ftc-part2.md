<!-- BLUEPRINT: math.calc.ftc-part2 -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Fundamental Theorem of Calculus Part 2
**Concept ID:** `math.calc.ftc-part2`
**KG Fields:** difficulty=advanced | bloom=apply | estimated_hours=5 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.calc.ftc-part2 |
| name | Fundamental Theorem of Calculus Part 2 |
| difficulty | advanced |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.calc.ftc-part1, math.calc.antiderivatives |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.calc.ftc-part1**: d/dx[∫ₐˣ f(t)dt] = f(x); accumulation function; area-under-curve geometric meaning; signed area
- **math.calc.antiderivatives**: antiderivative family F(x)+C; reverse power rule; antiderivatives of eˣ, trig functions; +C interpretation

### Target Knowledge State
Student fluently evaluates definite integrals using the Evaluation Theorem ∫ₐᵇ f(x)dx = F(b)−F(a), where F is any antiderivative of f; correctly applies the subtraction order (upper minus lower); recognises that +C cancels and is omitted; distinguishes definite (numeric output) from indefinite (family) integrals; and applies the theorem to area, net-change, and applied problems.

### Conceptual Obstacles
1. Evaluating F(a)−F(b) instead of F(b)−F(a) — reversing the subtraction order negates the answer; especially dangerous when the result is negative by correct calculation
2. Appending +C to the definite-integral result — failing to see that C cancels: [F(b)+C]−[F(a)+C] = F(b)−F(a)
3. Evaluating the antiderivative at only one bound — writing F(b) or −F(a) and forgetting the subtraction, or evaluating at both but taking the wrong one as the full answer

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | BOUNDS-SWAPPED | Student writes ∫ₐᵇ f(x)dx = F(a)−F(b), reversing upper and lower; error flips the sign of every answer | Any definite integral; especially visible when bounds are numbers with a < b but F(a) > F(b) |
| MC-2 | C-IN-DEFINITE-INTEGRAL | Student writes [F(x)+C]ₐᵇ = F(b)−F(a)+C or adds +C after evaluating, treating the definite result as an indefinite antiderivative | Transition from indefinite to definite evaluation; especially after extensive practice with +C |
| MC-3 | SINGLE-BOUND-EVALUATION | Student evaluates the antiderivative at only the upper bound (or only the lower), writing ∫ₐᵇ f(x)dx = F(b) without subtracting F(a) | Multi-step problems; students who copy the differentiation pattern "evaluate at the point" |

**Foundational Misconception:** MC-1 (BOUNDS-SWAPPED) — sign error propagates silently into every area, net-change, and applied problem; masking the error by always taking absolute values prevents the student from recognising negative net displacement or net loss contexts.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — advanced learner counts discrete rectangles for ∫₀³(2x+1)dx before seeing the antiderivative shortcut, making the area-number connection concrete before the algebraic procedure.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: approximate ∫₀³(2x+1)dx via 3 unit rectangles; P: shaded area diagram with exact value labelled 12; A: FTC Part 2 statement, bracket notation [F(x)]ₐᵇ, +C cancellation proof
2. **A02 P07 WORKED EXAMPLE PAIR** — WE1: polynomial integrand ∫₀³(2x+1)dx; WE2: radical integrand ∫₁⁴√x dx
3. **A03 P06 CONTRAST PAIR** — definite vs indefinite; bounds-swapped sign change; +C present vs. cancelled
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — From Area Approximation to the Evaluation Theorem

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Root FTC Part 2 in geometric intuition before the algebraic rule; make the two-bound subtraction structurally inevitable; show +C cancellation explicitly to preempt MC-2

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (rectangle approximation for ∫₀³(2x+1)dx):**

Consider the region under f(x) = 2x+1 from x=0 to x=3.

Approximate with 3 rectangles of width 1 (left endpoints):
- Rectangle 1: height f(0)=1, area=1
- Rectangle 2: height f(1)=3, area=3
- Rectangle 3: height f(2)=5, area=5
- Total ≈ 9 (underestimate; exact answer is 12)

The approximation improves as rectangles get thinner — but computing exact areas by summing infinitely many rectangles is impractical. FTC Part 2 provides the shortcut: **find any antiderivative F, evaluate at both bounds, subtract**.

**Stage P — Pictorial (evaluation diagram):**

```
f(x) = 2x+1
          *
         *|
        * |   exact area = 12
       *  |
      *   |
     *____|
   x=0   x=3

F(x) = x²+x  (antiderivative of 2x+1)
F(3) = 9+3 = 12
F(0) = 0+0 =  0
∫₀³(2x+1)dx = F(3)−F(0) = 12−0 = 12 ✓
```

**Stage A — Abstract (FTC Part 2 and +C cancellation):**

**Theorem (FTC Part 2 — Evaluation Theorem):** If F is any antiderivative of f on [a,b], then
$$\int_a^b f(x)\,dx = F(b) - F(a) = \bigl[F(x)\bigr]_a^b$$

**+C cancellation (addressing MC-2):** Any antiderivative works because:
$$\bigl[F(x)+C\bigr]_a^b = \bigl(F(b)+C\bigr) - \bigl(F(a)+C\bigr) = F(b) - F(a)$$
The constant C cancels exactly. Therefore we never write +C in definite integral evaluations.

**Notation reminder:** [F(x)]ₐᵇ means "evaluate F at b, then subtract the value of F at a." Upper bound is evaluated first (MC-1 prevention).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Evaluate ∫₀²(3x²)dx using any antiderivative of 3x².

**CORRECT:** Student identifies F(x)=x³, writes [x³]₀² = 8−0 = 8.
→ Confirm: "Correct. F(2)=8, F(0)=0, result is 8. No +C needed." → Proceed to A02.

**PARTIAL:** Student writes F(x)=x³+C and gives answer "8+C" (MC-2).
→ "You found the right antiderivative. Now show what happens to C: [x³+C]₀² = (8+C)−(0+C) = 8. The C cancels. Final answer: 8, no C."

**INCORRECT:** Student writes F(0)−F(2) = 0−8 = −8 (MC-1).
→ "Check the subtraction order: ∫ₐᵇ = F(b)−F(a). Upper bound b=2 comes first: F(2)−F(0)=8−0=8. Reversing bounds negates the answer."

**NO_RESPONSE:** → "The antiderivative of 3x² is x³ (reverse power rule: increase power by 1, divide by new power). Now evaluate at x=2: (2)³=8. At x=0: (0)³=0. Subtract upper minus lower: 8−0=8."

---

### Teaching Action A02 — Worked Example Pair: Applying the Evaluation Theorem

**Primitive:** P07 WORKED EXAMPLE PAIR
**Purpose:** Build computational fluency across polynomial and radical integrands; model the bracket notation and two-step evaluation (find antiderivative, evaluate-and-subtract) so students internalise the correct pattern before independent practice

---

**[P07 — WORKED EXAMPLE PAIR]**

**WE1 — Polynomial integrand: ∫₀³(2x+1)dx**

**Step 1 — Find an antiderivative:**
$$F(x) = x^2 + x \quad \text{(reverse power rule, no } {+C} \text{)}$$

**Step 2 — Apply the bracket notation:**
$$\bigl[x^2+x\bigr]_0^3 = \bigl(3^2+3\bigr) - \bigl(0^2+0\bigr) = 12 - 0 = \boxed{12}$$

**Step 3 — Geometric check:** f(x)=2x+1 is a line from y=1 to y=7 over [0,3]. Area of trapezoid = ½(1+7)·3 = 12. ✓

---

**WE2 — Radical integrand: ∫₁⁴√x dx**

**Step 1 — Rewrite as power:**
$$\sqrt{x} = x^{1/2}$$

**Step 2 — Find antiderivative (reverse power rule):**
$$F(x) = \frac{x^{3/2}}{3/2} = \frac{2}{3}x^{3/2}$$

**Step 3 — Evaluate:**
$$\left[\frac{2}{3}x^{3/2}\right]_1^4 = \frac{2}{3}(4)^{3/2} - \frac{2}{3}(1)^{3/2} = \frac{2}{3}(8) - \frac{2}{3}(1) = \frac{16}{3} - \frac{2}{3} = \frac{14}{3}$$

**Note on (4)^{3/2}:** 4^{3/2} = (√4)³ = 2³ = 8. Always simplify the power at each bound separately before subtracting.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Evaluate ∫₁²(4x³ − 6x)dx.

**CORRECT:** F(x)=x⁴−3x²; [x⁴−3x²]₁² = (16−12)−(1−3) = 4−(−2) = 6.
→ "Correct. Note that F(1)=−2, so subtracting a negative adds: 4+2=6." → Proceed to A03.

**PARTIAL:** Student gets F(x) right but evaluates F(2) only, giving 4 (MC-3).
→ "You evaluated at the upper bound correctly. Now subtract the value at the lower bound: F(1)=1−3=−2. So 4−(−2)=6."

**INCORRECT:** Student writes F(2)−F(1) = (16−12)−(1−3) = 4+2 = 6 ✓ but then says "minus, so 4−2=2" (arithmetic).
→ "Be careful: F(1)=1⁴−3(1)²=1−3=−2. You are computing 4−(−2)=4+2=6."

**NO_RESPONSE:** → "Find F(x) by integrating term by term: ∫4x³dx=x⁴ and ∫6x dx=3x². So F(x)=x⁴−3x². Evaluate at x=2: 16−12=4. At x=1: 1−3=−2. Subtract: 4−(−2)=6."

---

### Teaching Action A03 — Contrast Pair: What Changes and What Doesn't

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Sharpen the definite/indefinite distinction; address MC-1 by showing that swapping bounds negates; demonstrate that any antiderivative (different C) yields the same definite answer

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Definite vs indefinite integral:**

| Feature | Indefinite ∫f(x)dx | Definite ∫ₐᵇf(x)dx |
|---------|-------------------|-------------------|
| Output | Family of functions F(x)+C | A single number |
| +C | Required | Cancels; omit |
| Notation | ∫(2x+1)dx = x²+x+C | ∫₀³(2x+1)dx = 12 |
| Geometric | Curve family | Signed area |

**Contrast 2 — Correct vs reversed bounds (MC-1):**

$$\int_0^3(2x+1)dx = [x^2+x]_0^3 = 12-0 = \mathbf{12}$$
$$\int_3^0(2x+1)dx = [x^2+x]_3^0 = 0-12 = \mathbf{-12}$$

Swapping the bounds negates: ∫ₐᵇf(x)dx = −∫ᵦᵃf(x)dx. The upper bound always comes first in the subtraction.

**Contrast 3 — Different antiderivatives, same definite answer:**

Using F₁(x)=x²+x (C=0): [x²+x]₀³ = 12−0 = 12
Using F₂(x)=x²+x+7 (C=7): [(x²+x+7)]₀³ = (12+7)−(0+7) = 19−7 = 12

The constant C always cancels. Students may choose any antiderivative; the simplest (C=0) is conventional.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** True or false, and explain: ∫₂⁵ x dx = ∫₅² x dx.

**CORRECT:** False; swapping bounds negates. ∫₂⁵ x dx=[x²/2]₂⁵=25/2−2=21/2; ∫₅² x dx=2−25/2=−21/2.
→ "Correct. Swapping bounds negates the integral." → Proceed to A04.

**PARTIAL:** Student says "False" but can't compute the values.
→ "Right instinct. Let F(x)=x²/2. ∫₂⁵=[x²/2]₂⁵=25/2−4/2=21/2. ∫₅²=[x²/2]₅²=4/2−25/2=−21/2. The swap negates."

**INCORRECT:** Student says "True" (ignores bound order).
→ "The order of bounds matters. FTC Part 2 says ∫ₐᵇ=F(b)−F(a). Swapping a and b gives F(a)−F(b)=−[F(b)−F(a)]. Compute both: you get 21/2 and −21/2."

**NO_RESPONSE:** → "Apply FTC Part 2 to each. ∫₂⁵ x dx=[x²/2]₂⁵=25/2−2=21/2. For ∫₅² x dx, now a=5 and b=2: [x²/2]₅²=4/2−25/2=−21/2. Different signs — the integrals are negatives of each other."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess fluent, transfer-ready application of the Evaluation Theorem

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Evaluate ∫₀¹(6x²−4x+1)dx.

*Solution:* F(x)=2x³−2x²+x; [2x³−2x²+x]₀¹ = (2−2+1)−0 = **1**

**Problem 2:** Evaluate ∫₁⁴(3/√x)dx. [Rewrite as 3x^{−1/2}.]

*Solution:* F(x)=6√x; [6√x]₁⁴ = 6(2)−6(1) = 12−6 = **6**

**Problem 3:** Evaluate ∫₀^{π/2} cos(x) dx.

*Solution:* F(x)=sin(x); [sin(x)]₀^{π/2} = sin(π/2)−sin(0) = 1−0 = **1**

**Problem 4:** Evaluate ∫₀²(eˣ+2x)dx.

*Solution:* F(x)=eˣ+x²; [eˣ+x²]₀² = (e²+4)−(1+0) = **e²+3** ≈ 10.39

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A factory produces widgets at a rate R(t) = 30−2t units per hour (t in hours, 0 ≤ t ≤ 10). Set up and evaluate a definite integral to find the total number of widgets produced during the first 6 hours. Then find the time interval [0,T] during which production is positive.

**Expected solution:**
- Total widgets: ∫₀⁶(30−2t)dt = [30t−t²]₀⁶ = (180−36)−0 = **144 widgets**
- Production is positive when R(t)=30−2t>0, i.e., t<15; so on [0,10] production is always positive (T=10)
- Verification: at t=6, R(6)=30−12=18>0 (rate still positive, consistent)
- Net-change interpretation: the definite integral gives total output (net change in total widgets), not the rate

*Key observation:* R(t) is a linear function; answer can also be checked geometrically as a trapezoid area = ½(30+18)·6 = 144. ✓

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items, then re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.calc.u-substitution; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess in next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.calc.ftc-part2 assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — BOUNDS-SWAPPED (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"There is a specific error pattern here: the subtraction order in FTC Part 2 is F(b)−F(a), upper bound first. When a student writes F(a)−F(b), every answer is negated. This is called BOUNDS-SWAPPED."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: Evaluate ∫₁³(2x)dx.
- Correct: F(x)=x²; [x²]₁³=9−1=8
- BOUNDS-SWAPPED: 1−9=−8

If student writes −8: BOUNDS-SWAPPED confirmed → proceed to P64.

**[P64 — CONCEPTUAL SHIFT]**
"The bracket notation [F(x)]ₐᵇ means 'evaluate at top, subtract value at bottom.' Think of it as a two-slot machine: slot b (top) goes first, slot a (bottom) is subtracted. Write the formula before evaluating: ∫ₐᵇ f dx = F(b)−F(a). Let's redo: a=1, b=3. F(3)−F(1)=9−1=8."

Practice: ∫₂⁵(1)dx = [x]₂⁵ = 5−2 = 3. Confirm student writes 5 before 2.

---

### Repair Action B02 — C-IN-DEFINITE-INTEGRAL (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"When moving from indefinite to definite integrals, some students keep writing +C. This is called C-IN-DEFINITE-INTEGRAL. Let me show you why +C disappears."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: Evaluate ∫₀²(3x²)dx.
- Student answer includes +C: C-IN-DEFINITE-INTEGRAL confirmed.

**[P64 — CONCEPTUAL SHIFT]**
"Let's use F(x)=x³+C and evaluate explicitly: [x³+C]₀²=(8+C)−(0+C)=8+C−C=8. The C cancels algebraically — always. For definite integrals, omit +C from the start since it contributes nothing."

Practice: Evaluate ∫₋₁¹(4x)dx using F(x)=2x²+7 (C=7). [2x²+7]₋₁¹=(2+7)−(2+7)=0. Any C gives 0.

---

### Repair Action B03 — SINGLE-BOUND-EVALUATION (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Evaluating the antiderivative at only one bound is called SINGLE-BOUND-EVALUATION. FTC Part 2 requires two evaluations followed by a subtraction."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: Evaluate ∫₁⁴(2x)dx.
- Correct: [x²]₁⁴=16−1=15
- MC-3: Student writes only 16 or only −1

**[P64 — CONCEPTUAL SHIFT]**
"The integral accumulates change from a to b. Think of F(b) as the ending total and F(a) as the starting total; you need both to find the net change. Checklist before writing the answer: (1) Did I evaluate at the upper bound? (2) Did I evaluate at the lower bound? (3) Did I subtract upper minus lower?"

Practice: ∫₀³(1)dx=[x]₀³=3−0=3 (area of rectangle, width 3, height 1). Confirm both values written.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Evaluate ∫₀²(x²+1)dx; verify no +C, correct subtraction order |
| SR-2 | +3 days | Mixed: polynomial, radical, trig; include one negative-value integrand to probe MC-1 |
| SR-3 | +7 days | Applied problem: net displacement from velocity function v(t) |
| SR-4 | +14 days | Chain ∫ₐᵇ f(x)dx with u-substitution (after math.calc.u-substitution is introduced) |

Retrieval flag: if any SR answer includes +C or reverses bounds, re-execute B02/B01 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|--------------|
| Requires (Tier-1) | math.calc.ftc-part1 | FTC Part 1 establishes the antiderivative-area link and accumulation function; Part 2 is the computational shortcut |
| Requires (Tier-1) | math.calc.antiderivatives | Antiderivative families, reverse power rule, and the +C family are assumed fluent |
| Unlocks | math.calc.u-substitution | U-substitution extends the Evaluation Theorem to composite integrands |

**GR-9:** cross_links=[] → P76 mode = independence (transfer probe is self-contained, not a cross-subject probe).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate)
- bloom=apply → V-4 = PASS (P07 required; WE1 and WE2 in A02)
- CPA_entry = C for advanced learner: concrete rectangle approximation in A01 before algebraic rule

**Key teaching insight:** The most common error is MC-1 (BOUNDS-SWAPPED), which occurs when students copy the template "evaluate the function at the point" from differentiation. The bracket notation [F(x)]ₐᵇ with an explicit upper-first reminder (A01, A03 Contrast 2) directly counters this. The +C cancellation proof in A01 Stage A (algebraic expansion) should be written out, not just stated, because students who see C+C=2C incorrectly need to see the subtraction: (F(b)+C)−(F(a)+C).

**WE2 guidance:** (4)^{3/2} trips many students. Teach the rule: x^{3/2}=(√x)³. At x=4: (√4)³=2³=8. Having students compute each bound's power separately before subtracting prevents arithmetic errors.

**Applied problem design (P76):** The net-change interpretation (∫R(t)dt = total production) is FTC Part 2's most important applied context. The transfer probe tests whether the student can set up the integral, not just evaluate a given one.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.calc.ftc-part2 ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.calc.ftc-part1 ✓, math.calc.antiderivatives ✓ | PASS |
| V-3 | CPA entry = C for advanced difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 present | P07 in A02 (WE1=polynomial, WE2=radical) ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_links=[] → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Factory production rate; definite integral setup + evaluation; correct 144 ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
