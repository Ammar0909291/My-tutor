# Blueprint: math.num.floating-point

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.floating-point |
| name | Floating-Point Arithmetic |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | understand |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.arith.scientific-notation, math.arith.significant-figures |
| Cross-links | — |
| Unlocks | math.num.error-analysis |

## Component 1 — Learning Objective
Given IEEE 754 floating-point representation, the student explains the bit-level structure (sign, exponent, mantissa), quantifies representation error using the relative error model fl(x)=x(1+ε) with |ε|≤u (machine epsilon u≈2.2×10⁻¹⁶ for double precision), identifies catastrophic cancellation in subtraction of nearly equal numbers, rewrites unstable expressions to avoid cancellation (e.g. √(x+1)−√x → 1/(√(x+1)+√x)), and recognises special values (NaN, ±∞, ±0).

## Component 2 — CPA Entry Stage
**C — Concrete** (compute 0.1 + 0.2 in Python; observe 0.30000000000000004; trace the binary representation of 0.1 to see it is not exact — before any IEEE 754 theory)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | FLOATING-POINT-IS-EXACT | Student treats floating-point as exact rational arithmetic; does not account for rounding at every operation | Type 1 — overgeneralization (integer arithmetic IS exact in computers; student extends this to floating-point without recognising the change of representation) |
| MC-2 | ADDING-SMALL-TO-LARGE-IS-SAFE | Student adds a very small number to a very large number and trusts the result; does not realise the small number is absorbed below the precision threshold | Type 5 — instruction-induced (the error bound |ε|≤u is taught as "small," suggesting all individual errors are negligible; the cumulative effect of 10⁶ additions is not emphasised) |
| MC-3 | CANCELLATION-IS-ACCURATE | Student believes that f(x)=√(x+1)−√x is accurate because both square roots are computed accurately; does not recognise that subtraction of nearly equal quantities destroys relative accuracy | Type 1 — overgeneralization (each operand is accurate; the student does not track that relative error on the difference equals absolute error on each operand divided by a tiny difference) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of a floating-point number:**

| Representation | Example: 0.1 (decimal) |
|---|---|
| Decimal | 0.1 |
| Binary fraction (exact) | 0.000110011001100… (repeating, never terminates) |
| IEEE 754 double (stored) | 3FB999999999999A₁₆ — the nearest representable double |
| Relative error | fl(0.1) = 0.1 × (1 + ε), where ε ≈ −5.5×10⁻¹⁸ < u = 2.22×10⁻¹⁶ |

**IEEE 754 double-precision bit layout (64 bits):**
- Bit 63: sign (1 bit)
- Bits 62–52: biased exponent (11 bits, bias=1023)
- Bits 51–0: significand fraction (52 bits, implicit leading 1)

**Special values:**
| Pattern | Value |
|---|---|
| Exponent all-0, fraction all-0 | ±0 |
| Exponent all-1, fraction all-0 | ±∞ |
| Exponent all-1, fraction ≠ 0 | NaN |

**Machine epsilon u = 2⁻⁵² ≈ 2.22×10⁻¹⁶:** the smallest ε such that fl(1+ε)>1. Equivalently, u = (distance from 1 to next larger double)/2.

**P49 checkpoint:**
- CORRECT → "Every real number is rounded to the nearest representable float. The relative error |fl(x)−x|/|x| ≤ u for every x in the normal range. No operation is exact (except those producing representable results exactly, e.g. addition of small integers)." → A02
- PARTIAL (knows bits but cannot connect to relative error) → "Count the 52-fraction bits. The gap between consecutive doubles near x is x·2·2⁻⁵²=x·2⁻⁵¹; the rounding error is at most half that gap, so |fl(x)−x|/|x| ≤ 2⁻⁵²=u." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Enter 0.1+0.2 in Python. What does the output say? Why is it not exactly 0.3?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Accumulation of rounding errors — gallery:**

**Example 1 — summing 1/n:** sum_{n=1}^{10⁶} (1/n) forward (small terms last, accurate) vs. backward (small terms first, slightly different result because each 1/n is rounded and added to a growing accumulator that absorbs small corrections).

**Example 2 — absorption:** x=10¹⁶; x+1.0 in double precision. Since 1.0 < u·x = 2.22×10⁻¹⁶×10¹⁶ = 2.22, the number 1.0 is below the precision threshold and is completely absorbed: fl(10¹⁶+1)=10¹⁶.

**Example 3 — cancellation (catastrophic):** f(x)=√(x+1)−√x at x=10¹². True value ≈ 5×10⁻⁷. √(10¹²+1)≈10⁶ and √(10¹²)=10⁶ — both computed to 16 significant digits, but the difference has only ~4 correct digits; 12 digits of relative accuracy are lost.

**Stable rewrite:** 1/(√(x+1)+√x). Rationalise the numerator: (√(x+1)−√x)(√(x+1)+√x)=1, so √(x+1)−√x = 1/(√(x+1)+√x). The rewrite adds two large positives (no cancellation), giving 15+ correct digits.

**Pattern:** Whenever two nearly equal quantities are subtracted, the number of accurate digits in the result equals the number of leading digits that DIFFER — which may be very few.

**P49 checkpoint:**
- CORRECT → "Catastrophic cancellation occurs when two nearly equal quantities are subtracted; the relative error on the difference equals the absolute error on each operand divided by a tiny difference — potentially amplified by 10⁶ or more. Stable reformulation avoids the subtraction." → A03
- PARTIAL (identifies cancellation risk but cannot quantify or reformulate) → "If a≈b and both are accurate to 15 digits but a−b≈10⁻¹², how many correct digits does a−b have? Now multiply (a−b)(a+b)=a²−b² and divide by (a+b) — how does that avoid subtracting nearly equal numbers?" → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Compute (10⁸+1)−10⁸ exactly. Now compute it in Python. Do you get 1 or 0?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**Catastrophic cancellation gate:**

**Gate question (MC-3):** "Is f(x)=1−cos(x) accurate near x=0? If not, find a stable alternative."

Near x=0: 1−cos(x) ≈ x²/2, which is very small. But cos(x) computed by floating-point ≈ 1 − x²/2 + …, so 1−cos(x) requires subtracting nearly equal values (cos(x)≈1). Relative error on 1−cos(x) can be as large as u/(x²/2) = 2u/x² → ∞ as x→0.

**Stable rewrite:** Use 2sin²(x/2) (half-angle identity: 1−cos(x)=2sin²(x/2)). Near x=0, sin(x/2)≈x/2, so 2sin²(x/2)≈x²/2 — computed without cancellation.

**Two key rules:**
- If f(x) involves subtracting nearly equal quantities, look for algebraic identities or rationalisations.
- Test near the cancellation region: the stable and unstable formulas agree away from it but diverge near it.

**P49 checkpoint:**
- CORRECT → "1−cos(x) is inaccurate near x=0 due to catastrophic cancellation; 2sin²(x/2) avoids it. General principle: whenever a formula subtracts nearly equal floats, look for an algebraic equivalent that avoids the subtraction." → Gate (P91)
- PARTIAL (identifies the problem but cannot derive the stable form) → "Use 1−cos(x)=2sin²(x/2). Why doesn't sin²(x/2) suffer cancellation? Because sin(x/2) itself is small near x=0, not the difference of two large quantities." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Compute 1−cos(0.0001) in Python. Compare with (0.0001)²/2. Are they equal? Why?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 FLOATING-POINT-IS-EXACT):**
Step 1 — "Integer arithmetic in computers is exact (within range) because integers have exact binary representations. Floating-point numbers represent real numbers, most of which have no finite binary expansion — 0.1 in binary is 0.00011001100… (repeating), just as 1/3 in decimal is 0.333… The stored number is the NEAREST representable value, not the exact value." Step 2 — Open Python: `>>> 0.1 + 0.2` returns `0.30000000000000004`. The exact sum 3/10 is not representable in binary floating-point. Step 3 — "Rule: every floating-point operation introduces a relative error ≤ u ≈ 2.22×10⁻¹⁶. This error is usually tiny but accumulates — 10⁶ additions can accumulate 10⁶u ≈ 2.22×10⁻¹⁰ of relative error. Never assume a floating-point result is exact."

**TB-R02 (MC-2 ADDING-SMALL-TO-LARGE-IS-SAFE):**
Step 1 — "When you add a small number ε to a large number M in floating-point, the result is rounded to the nearest representable float near M. If ε < u·M, then ε is completely below the precision threshold and the rounded result equals M — the small number is absorbed without any contribution." Step 2 — Compute: `>>> x = 10**16; x + 1.0 == x` returns `True` in Python. The number 1.0 is smaller than u·10¹⁶ ≈ 2.22, so it doesn't change the stored value. Step 3 — "When summing many small numbers with a large accumulator (e.g. computing a mean of a million values by accumulation), use compensated summation (Kahan algorithm) or accumulate in double–double precision."

**TB-R03 (MC-3 CANCELLATION-IS-ACCURATE):**
Step 1 — "Each of √(x+1) and √x is computed to full precision — about 15 significant digits. But their DIFFERENCE is much smaller than either one: for x=10¹², both are ≈10⁶ while the difference is ≈5×10⁻⁷. The absolute errors in each (≈u×10⁶≈2.22×10⁻¹⁰) are larger than the 'true' answer itself. Relative accuracy of the difference: (2.22×10⁻¹⁰)/(5×10⁻⁷) ≈ 4×10⁻⁴ — only 4 significant digits, not 15." Step 2 — Stable alternative: √(x+1)−√x = 1/(√(x+1)+√x). Both terms of the denominator are large positives; no cancellation occurs; full 15-digit accuracy is retained. Step 3 — "The test: compare the stable and unstable formulas at x=10¹². The stable formula gives ~15 digits; the unstable formula matches only the first 4-5. Whenever two operands are nearly equal, look for an algebraic reformulation that replaces the subtraction with a sum."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. (a) What is the machine epsilon u for double precision? (b) True or false: every integer n with |n|≤2⁵³ is exactly representable as a double-precision float. (c) What is fl(2⁵³+1) in double precision?
2. Evaluate f(x)=(e^x−1)/x near x=0 using direct computation and an alternative stable formula. What identity resolves the cancellation?
3. Give two examples of floating-point operations that produce special values (NaN or ±∞) and explain what each signals.
4. A loop computes s = 0; for n in range(1, N+1): s += 1.0/n. For N=10⁷, estimate the maximum accumulated rounding error in s using the error model. How does Kahan summation help?

**P55 — Reflect & Consolidate:** "Floating-point ≈ real arithmetic with relative error ≤ u ≈ 2.22×10⁻¹⁶ per operation. Catastrophic cancellation: subtracting nearly equal floats amplifies relative error by a large factor. Remedy: algebraic reformulation to avoid subtraction. Special values (NaN, ±∞) signal overflow or invalid operations."

**P76 — Transfer Probe (Independence mode):**
f(x)=ln(x+1)−ln(x) for large x. (a) Show that direct computation suffers catastrophic cancellation for large x. (b) Find a stable alternative using a single logarithm. (c) Confirm numerically at x=10¹⁰ that the stable form gives ~15 accurate digits while the unstable form loses most of its precision. (d) Identify the general algebraic technique (rationalising or combining logarithms) and state when each is appropriate.

**P55 — Reflect & Consolidate:** "The general technique for stabilising subtraction of nearly equal quantities: rewrite using algebraic identities (rationalise, trigonometric half-angle, Taylor-series-based approximation for small arguments, or combine logarithms). Always verify by testing near the cancellation region."

**P75 — Mastery Assessment:**
"f(x)=sin(x)/x near x=0. (a) Explain why direct division is not catastrophically cancelled (sin(x) is not nearly equal to x for all small x — what is sin(x) near 0?). (b) However, near x=0 the value sin(x)/x→1 and can be computed accurately. But explain why computing sin(0.0) raises a 0/0 issue. (c) A student proposes using the Taylor series (1−x²/6+x⁴/120−…) for |x|<0.01. What are the trade-offs of this approach vs. using the two-argument form atan2 or a library sinc function? (d) For x=1×10⁻¹⁵, compare sin(x)/x (direct) with the Taylor term 1−x²/6. Which is more accurate and why?"

**P55 — Reflect & Consolidate:** "Near-zero function evaluation: sometimes no cancellation occurs even when arguments are tiny (sin(x)/x→1 has no subtraction of nearly equal floats). The risk is 0/0 undefined, not cancellation. Use Taylor series for |x|<threshold, direct formula elsewhere. Choose the threshold to minimise total error."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.floating-point complete
- Score 3/5 → REVIEW catastrophic cancellation and machine epsilon; replay A02–A03
- Score ≤ 2/5 → PREREQUISITE GAP in math.arith.scientific-notation or math.arith.significant-figures; reassign

**P78 — Completion:** Floating-point arithmetic certified. Student identifies representation limits (machine epsilon, special values), recognises catastrophic cancellation, applies stable algebraic reformulations, and estimates accumulated rounding error.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Stable vs. unstable formulas involving logarithms; generalising the cancellation-avoidance principle
Skill tested: Identify cancellation in ln(x+1)−ln(x); rewrite as ln(1+1/x); verify numerically; articulate the general rationalise/combine strategy

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
