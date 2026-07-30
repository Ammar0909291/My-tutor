# Blueprint: math.num.numerical-integration

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.numerical-integration |
| name | Numerical Integration |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.calc.definite-integral, math.num.interpolation |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a function or dataset, the student applies the rectangle rule (left, right, midpoint), the Trapezoidal Rule, and Simpson's Rule to approximate ∫ₐᵇ f(x) dx; derives the error bounds O(h²) for the Trapezoid Rule and O(h⁴) for Simpson's Rule via the Euler–Maclaurin expansion; chooses the optimal rule for smooth vs. tabulated data; and implements composite integration with n subintervals to achieve a prescribed accuracy.

## Component 2 — CPA Entry Stage
**C — Concrete** (estimate the area under a smooth curve drawn on graph paper by counting full and partial squares — before any quadrature formula)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | MORE-POINTS-ALWAYS-BETTER | Student increases n without limit, not realising that for smooth f the O(h⁴) Simpson error converges fast enough that n=100 is already excessive — and for noisy data, very fine grids amplify noise | Type 5 — instruction-induced (convergence tables always show error decreasing; the diminishing returns or noise-amplification regime is rarely shown) |
| MC-2 | TRAPEZOID-SAME-AS-SIMPSON | Student treats the Trapezoid Rule and Simpson's Rule as equivalent because both use the endpoints — does not recognise that Simpson uses the midpoint as a third evaluation point and achieves a higher order of accuracy | Type 3 — language contamination ("both trap the area under a curve" — the word "trapezoid" focuses attention on the shape of the region rather than the polynomial degree of the quadrature rule) |
| MC-3 | RECTANGLE-RULE-IS-WRONG | Student dismisses the midpoint rectangle rule as inaccurate, not knowing it has the same O(h²) error constant as the Trapezoid Rule and beats the left/right rules by a factor of 2 | Type 5 — instruction-induced (left-rectangle rule is introduced as the naive method and immediately replaced; the midpoint rule is presented later, after the student has mentally categorised all rectangle rules as "inaccurate") |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of the Trapezoidal Rule:**

| Representation | Content |
|---|---|
| Geometric | Area of each trapezoid: (h/2)[f(xᵢ)+f(xᵢ₊₁)] summed over n subintervals |
| Algebraic | T_n = (h/2)[f(x₀)+2f(x₁)+…+2f(xₙ₋₁)+f(xₙ)], h=(b−a)/n |
| Error formula | |E_T| ≤ (b−a)³/(12n²) · max|f''(x)|; error is O(h²) |
| Code | h=(b-a)/n; s=f(a)+f(b); for i in 1..n-1: s+=2*f(a+i*h); T=s*h/2 |

**Rule comparison:**
| Rule | Polynomial degree | Error order | Evaluations per interval |
|---|---|---|---|
| Left/Right rectangle | 0 (constant) | O(h) | 1 |
| Midpoint rectangle | 1 (constant + correction) | O(h²) | 1 |
| Trapezoidal | 1 (linear) | O(h²) | 2 |
| Simpson's | 2 (quadratic) | O(h⁴) | 3 |

**Simpson's Rule:** S_n = (h/3)[f(x₀)+4f(x₁)+2f(x₂)+4f(x₃)+…+4f(xₙ₋₁)+f(xₙ)], n must be even. Error: |E_S| ≤ (b−a)⁵/(180n⁴) · max|f⁽⁴⁾(x)|.

**P49 checkpoint:**
- CORRECT → "Trapezoidal Rule approximates ∫f by summing trapezoid areas: T_n=(h/2)[f(x₀)+2Σf(xᵢ)+f(xₙ)]. Error O(h²). Simpson's uses quadratic arcs: error O(h⁴), same cost per subinterval asymptotically." → A02
- PARTIAL (knows formula but cannot state error order) → "Derive the error by applying Euler–Maclaurin: the leading error term for the Trapezoid Rule is −(h²/12)(f'(b)−f'(a)), so halving h reduces error by 4× — that's O(h²)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Approximate ∫₀¹ x² dx = 1/3 using the Trapezoid Rule with n=4 sub-intervals. Compare with the exact value. What is the error?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Convergence gallery:**

**Smooth function (f(x)=sin(x), [0,π], true value = 2):**
| n | T_n | Error | Ratio |
|---|---|---|---|
| 4 | 1.8961 | 0.1039 | — |
| 8 | 1.9742 | 0.0258 | 4.03 |
| 16 | 1.9936 | 0.0064 | 4.01 |

**Ratio ≈ 4 each time the number of points doubles → confirms O(h²) for Trapezoidal Rule.**

**Same with Simpson's Rule (n=4):** S_4 = 2.0001 — already 4 significant digits with just 5 function evaluations. Error ratio across doublings ≈ 16 → confirms O(h⁴).

**Tabulated data (f known only at fixed points):** Trapezoid is the natural choice — no assumption of high-order smoothness, no need for derivative estimates. Simpson's Rule can still be applied to pairs of sub-intervals when n is even.

**Adaptive quadrature motivation:** When f has local high-curvature regions, a uniform grid wastes evaluations in the flat part. Adaptive methods (e.g. Gaussian quadrature, adaptive Simpson) concentrate evaluations where error is largest.

**Gaussian quadrature (brief mention):** Uses n optimally chosen points and weights for [−1,1] to integrate degree-(2n−1) polynomials exactly. Not applicable when f is tabulated at fixed points.

**P49 checkpoint:**
- CORRECT → "Trapezoidal error halves 4× when step size halves (O(h²)). Simpson's error shrinks 16× (O(h⁴)). For smooth functions, use composite Simpson's; for tabulated data, use composite Trapezoid." → A03
- PARTIAL (knows convergence rates but cannot explain the ratio test) → "The convergence ratio tells you the order p: if halving h reduces error by 2^p, then error is O(hᵖ). For Trapezoid, 4=2², so p=2. For Simpson's, 16=2⁴, so p=4." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "In the table above, why does the Trapezoid error ratio approach 4 when n doubles (h halves)?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Method selection gate:**

**Gate question (MC-2):** "A student wants to compute ∫₀¹ e^{x²} dx to 6 decimal places. They use the Trapezoid Rule with n=100. How many sub-intervals would Simpson's Rule need to achieve the same accuracy?"

Trapezoid Rule error bound: |E_T| ≤ (1)³/(12n²) · max|f''| ≈ (5.3)/(12 × 100²) ≈ 4.4×10⁻⁵ — not 6 decimal places. To reach 10⁻⁶ with Trapezoid: solve 5.3/(12n²)≤10⁻⁶ → n≥666.

Simpson's error bound: |E_S| ≤ (1)⁵/(180n⁴) · max|f⁽⁴⁾| ≈ (76.2)/(180n⁴). For 10⁻⁶: n⁴≥76.2/(180×10⁻⁶) ≈ 4.2×10⁵ → n≥26 (even, so n=26). Simpson's needs 26 sub-intervals; Trapezoid needs 666 — a 25× cost saving.

**P49 checkpoint:**
- CORRECT → "For smooth functions, Simpson's Rule achieves target accuracy with far fewer evaluations than Trapezoid, because its O(h⁴) error converges much faster. For non-smooth data or tabulated grids, Trapezoid is the appropriate choice." → Gate (P91)
- PARTIAL (correct method selection but cannot compute required n) → "Use the error formula |E_S|≤(b−a)⁵/(180n⁴)·max|f⁽⁴⁾|. Set this ≤ε and solve for n. The key is that n enters as n⁴, making the convergence very fast for smooth functions." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "If Simpson's Rule error is O(h⁴) and Trapezoid is O(h²), how many times more intervals does Trapezoid need to match Simpson's accuracy when h is small?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 MORE-POINTS-ALWAYS-BETTER):**
Step 1 — "For smooth functions, the error decreases as a power of h: Trapezoid O(h²) means doubling n already reduces error by 4×. Beyond roughly n=1000 for typical smooth functions, the total rounding error (≈n·u·|f|, accumulating floating-point errors from n additions) begins to dominate, and further refinement makes accuracy worse, not better." Step 2 — Demonstration: ∫₀¹ e^x dx, exact=e−1. Trapezoid with n=10: error≈4.2×10⁻⁴. n=100: error≈4.2×10⁻⁶. n=10⁶: error≈2.2×10⁻¹⁰ (theoretical) but rounding accumulation ≈10⁻¹⁰ as well — accuracy stops improving. Step 3 — "Rule: for smooth f, pick the smallest n that satisfies your target accuracy. Use the error bound formula to estimate n before computing. For adaptive quadrature, let the algorithm distribute points automatically."

**TB-R02 (MC-2 TRAPEZOID-SAME-AS-SIMPSON):**
Step 1 — "The Trapezoid Rule approximates f by a line (degree-1 polynomial) on each sub-interval; its error is proportional to f''(x)·h³ per interval, giving O(h²) total. Simpson's Rule approximates by a parabola (degree-2) through three points; by a happy cancellation (the O(h³) error from odd terms cancels), the error is O(h⁵) per interval, giving O(h⁴) total." Step 2 — Concrete: on [0,1] with f(x)=x⁴, n=2. Trapezoid: T₂ = ½[0+2(1/16)+1] = 9/16 = 0.5625; exact = 1/5 = 0.2. Error = 0.3625. Simpson: S₂ = (1/3)[0+4(1/16)+1] = 5/16×(1/3)… = 0.2083 — much closer to 0.2. Step 3 — "Simpson's uses the midpoint of each pair of sub-intervals as an additional evaluation point. That third point is what allows it to fit a parabola — and it is the parabola fit that delivers the O(h⁴) accuracy gain."

**TB-R03 (MC-3 RECTANGLE-RULE-IS-WRONG):**
Step 1 — "The LEFT rectangle rule uses f(xᵢ) for the left endpoint of each interval. The MIDPOINT rule uses f((xᵢ+xᵢ₊₁)/2) — the midpoint. Both have O(h²) error, but the midpoint rule's error constant is (b−a)³/(24n²)·max|f''|, while the left rule is (b−a)²/(2n)·max|f'| — the left rule is only O(h), not O(h²). The midpoint rule is actually more accurate than Trapezoid for the same number of evaluations (smaller constant by 2×)." Step 2 — Numerical: ∫₀¹ x² dx = 1/3. Left rule n=4: L=0+1/16+1/4+9/16=7/8·(1/4)=0.21875; exact=0.333; error=0.115. Midpoint rule n=4: M=(1/64+9/64+25/64+49/64)·(1/4)=84/64·(1/4)=0.328; error=0.005. Trapezoid n=4: T=(0+1/4·2+1/2·2+3/4·2+1)/2·(1/4)=0.344; error=0.010. Step 3 — "Midpoint beats Trapezoid by 2× (same evaluations). Both beat the left rule by an order of convergence. Recognise that there are three different rectangle-rule variants with three very different accuracies."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Approximate ∫₀² √(1+x²) dx using (a) the Trapezoidal Rule with n=4 and (b) Simpson's Rule with n=4. Compute the error bound for each and determine which method achieves 3 decimal place accuracy.
2. Show that Simpson's Rule is exact for cubic polynomials (degree ≤ 3). Hint: the error formula involves f⁽⁴⁾(x) — what is f⁽⁴⁾ for a cubic?
3. A function f is known only at tabulated points x₀=0, x₁=0.25, x₂=0.5, x₃=0.75, x₄=1.0 with values 1, 1.064, 1.284, 1.756, 2.718. Approximate ∫₀¹ f(x) dx using (a) Trapezoid Rule and (b) Simpson's Rule (n=4, even). Which is more reliable if f has measurement noise?
4. Use the convergence ratio test to empirically determine the order of the midpoint rectangle rule. Compute ∫₀¹ cos(x) dx with n=4, 8, 16 using the midpoint rule. Compute error ratios and confirm O(h²) order.

**P55 — Reflect & Consolidate:** "Rectangle (midpoint O(h²)) < Trapezoidal O(h²) = Midpoint < Simpson's O(h⁴). For smooth functions use Simpson's to minimise evaluations. For tabulated data use Trapezoid. Convergence ratio test confirms the order empirically."

**P76 — Transfer Probe (Independence mode):**
Romberg integration extrapolates from Trapezoid approximations at step sizes h, h/2, h/4 to cancel the leading O(h²) error term and achieve O(h⁴) accuracy without explicitly implementing Simpson's Rule. (a) Let T(h) be the Trapezoid approximation with step h. Show that R(h) = (4T(h/2) − T(h))/3 equals Simpson's Rule with step h/2. (b) Apply Romberg integration to ∫₀π sin(x) dx with h=π/4 (5 evaluations). (c) Explain how further Richardson extrapolation steps produce O(h⁶), O(h⁸) accuracy. (d) Implement Romberg's method for ∫₀¹ e^x dx and confirm that three extrapolation levels give machine precision.

**P55 — Reflect & Consolidate:** "Romberg integration applies Richardson extrapolation to the Trapezoid Rule: each extrapolation level eliminates the leading error term, doubling the convergence order. It achieves high accuracy with far fewer evaluations than composite Trapezoid alone, and the Trapezoid evaluations are reused across levels."

**P75 — Mastery Assessment:**
"A structural engineer needs ∫₀⁵ σ(x) dx where σ(x) is a stress function measured at x=0,0.5,1,2,3,4,5 (unevenly spaced!). (a) Can you directly apply Simpson's Rule with these points? If not, what are your options? (b) Apply the composite Trapezoid Rule to the uneven grid. (c) Estimate the error if you assume σ is smooth (|σ''|≤10). (d) A more accurate measurement gives σ at x=0,1,2,3,4,5 and also at the midpoints. Now apply composite Simpson's. (e) How many decimal places of accuracy do you gain by adding midpoints?"

**P55 — Reflect & Consolidate:** "Real data often comes on non-uniform grids — Simpson's Rule requires evenly spaced pairs, so Trapezoid is the default for irregular grids. Adding midpoint evaluations unlocks composite Simpson's with O(h⁴) accuracy improvement."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.numerical-integration complete
- Score 3/5 → REVIEW error order derivation and method selection; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.calc.definite-integral or math.num.interpolation; reassign

**P78 — Completion:** Numerical integration certified. Student applies Trapezoid and Simpson's Rules, computes error bounds, selects the optimal rule, and uses the convergence ratio test to verify order empirically.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Romberg integration as Richardson extrapolation applied to Trapezoid approximations
Skill tested: Derive the Romberg formula from T(h) values; confirm equivalence with Simpson; extend to higher-order extrapolation

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
