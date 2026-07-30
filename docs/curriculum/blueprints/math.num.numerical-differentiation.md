# Blueprint: math.num.numerical-differentiation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.numerical-differentiation |
| name | Numerical Differentiation |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.calc.derivative-definition, math.num.error-analysis |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a function f known only at discrete points or expensive to differentiate analytically, the student derives the forward difference f'(x)≈[f(x+h)−f(x)]/h (O(h) truncation error) and central difference f'(x)≈[f(x+h)−f(x−h)]/(2h) (O(h²) truncation error) from Taylor expansion; explains the trade-off between truncation error (decreases as h→0) and roundoff error (increases as h→0) with optimal step size h*≈√u for forward difference and h*≈u^{1/3} for central; applies Richardson extrapolation to eliminate leading error terms and improve accuracy; and derives the second-derivative formula f''(x)≈[f(x+h)−2f(x)+f(x−h)]/h² (O(h²) error).

## Component 2 — CPA Entry Stage
**C — Concrete** (compute the forward difference for f(x)=sin(x) at x=1 for h=0.1, 0.01, 0.001, 0.0001, 0.00001 and tabulate the result; observe that error first decreases then INCREASES for tiny h — before the error analysis)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | SMALLER-H-ALWAYS-BETTER | Student keeps decreasing h to reduce error, not realising that roundoff error grows as h→0 and eventually dominates; tries h=10⁻¹⁵ and gets a result of 0 | Type 5 — instruction-induced (the derivative is defined as a limit as h→0, so students carry over the limit intuition to finite-h computation; the finite-precision floor is never mentioned in the calculus definition) |
| MC-2 | FORWARD-AND-CENTRAL-DIFFERENCE-SAME-ACCURACY | Student assumes both formulas have the same accuracy since both approximate the same derivative | Type 1 — overgeneralization (both formulas are called "finite difference approximations" with no immediate visible difference; the O(h) vs. O(h²) distinction is only apparent from the Taylor expansion, which students may not carry out) |
| MC-3 | NUMERICAL-DERIVATIVE-CONVERGES-TO-EXACT | Student expects that as h→0, the numerical formula always converges to the exact derivative, ignoring the catastrophic cancellation of f(x+h)−f(x) for small h | Type 5 — instruction-induced (the limit is defined as h→0 and students believe any computation that "approaches the limit" converges; the transition from exact arithmetic to finite precision is not emphasised) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of numerical differentiation:**

| Representation | Forward difference f'(x)≈[f(x+h)−f(x)]/h |
|---|---|
| Limit definition | f'(x)=lim_{h→0}[f(x+h)−f(x)]/h (exact, requires h→0) |
| Taylor expansion derivation | f(x+h)=f(x)+hf'(x)+(h²/2)f''(ξ); rearrange: [f(x+h)−f(x)]/h = f'(x)+(h/2)f''(ξ) |
| Error formula | Truncation error = (h/2)f''(ξ) = O(h); total error = (h/2)|f''| + 2u|f|/h |
| Table (f=sin, x=1) | h=0.1: error≈0.042; h=0.01: error≈0.0042; h=0.001: error≈4.2×10⁻⁴; h=10⁻⁷: error≈10⁻⁸ (optimal); h=10⁻¹⁵: error≈1 (catastrophic) |

**Central difference (O(h²)):**
f(x+h)=f(x)+hf'(x)+(h²/2)f''(x)+(h³/6)f'''(ξ₁)
f(x−h)=f(x)−hf'(x)+(h²/2)f''(x)−(h³/6)f'''(ξ₂)
Subtract: f(x+h)−f(x−h)=2hf'(x)+(h³/3)f'''(ξ)
Divide by 2h: f'(x)=[f(x+h)−f(x−h)]/(2h) + (h²/6)f'''(ξ). Truncation error: O(h²).

**Optimal step size (balancing truncation and roundoff):**
- Forward difference: total error ≈ (h/2)|f''| + 2u|f|/h; minimised at h*=2√(u|f|/|f''|)≈√u≈10⁻⁸.
- Central difference: total error ≈ (h²/6)|f'''| + 2u|f|/h; minimised at h*≈(3u|f|/|f'''|)^{1/3}≈u^{1/3}≈10⁻⁵.

**P49 checkpoint:**
- CORRECT → "Forward difference: O(h) truncation error, optimal h*≈√u≈10⁻⁸. Central difference: O(h²) truncation error, optimal h*≈u^{1/3}≈10⁻⁵. Both have a U-shaped total error curve in h — decreasing for large h (truncation dominates) and increasing for small h (roundoff dominates)." → A02
- PARTIAL (can use the formulas but cannot derive the truncation error from Taylor) → "Expand f(x+h) in a Taylor series: f(x+h)=f(x)+hf'(x)+(h²/2)f''(x)+…. Subtract f(x) and divide by h. The leading remainder term is (h/2)f''(x). This is the truncation error: proportional to h." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Compute [sin(1.1)−sin(1)]/0.1 and compare with cos(1)≈0.5403. What is the error? What happens when h=0.01?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Order of accuracy gallery:**

**Forward difference O(h):** Double h, error doubles. Error at h: ≈(h/2)|f''(x)|. Table for f=sin(x), x=1:
| h | error |
|---|---|
| 0.1 | 4.2×10⁻² |
| 0.01 | 4.2×10⁻³ |
| 0.001 | 4.2×10⁻⁴ |
| 10⁻⁷ | ~10⁻⁸ (near optimal) |
| 10⁻¹⁵ | ~1 (catastrophic cancellation) |

**Central difference O(h²):** Halve h, error quarters. Fewer function evaluations for same accuracy vs. forward.

**Second derivative O(h²):** f''(x)≈[f(x+h)−2f(x)+f(x−h)]/h². Derivation: add the two Taylor expansions (not subtract). Truncation error: (h²/12)f^{(4)}(ξ). Optimal h*≈u^{1/4}≈10⁻⁴ (larger because the formula involves 4 terms summing to near zero).

**Richardson extrapolation (improving order):**
If D(h)=f'(x)+c·h²+O(h⁴) (central difference), then D(h/2)=f'(x)+c·(h/2)²+O(h⁴).
Eliminate the c·h² term: [4D(h/2)−D(h)]/3 = f'(x)+O(h⁴). This gives a 4th-order formula at the cost of two function evaluations.

**Pattern:** Each Richardson extrapolation step improves the order by 2 for central-difference-based formulas. Romberg integration applies the same idea to the trapezoidal rule.

**P49 checkpoint:**
- CORRECT → "Forward O(h), central O(h²), Richardson-extrapolated central O(h⁴). Second derivative: [f(x+h)−2f(x)+f(x−h)]/h², O(h²). All have an optimal h where truncation = roundoff; going beyond that optimal h makes things worse." → A03
- PARTIAL (knows the formulas but not Richardson extrapolation) → "You have D(h) and D(h/2), both approximations of f'. Both have error ≈c·h². Write two equations with two unknowns: D(h)=f'+c·h² and D(h/2)=f'+c·(h²/4). Solve for f'. The answer is the Richardson extrapolation formula." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Compute [sin(1.001)−sin(0.999)]/(2×0.001) and compare with cos(1). Compare the error to the forward-difference error at h=0.001. Which is more accurate?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Optimal step size gate:**

**Gate question (MC-1):** "A student computes [f(x+h)−f(x)]/h for h=10⁻¹⁵ and gets the same value as for h=10⁻¹⁰. Is smaller h always better? What is happening?"

For h=10⁻¹⁵, the floating-point values of x+h and x are indistinguishable in double precision (u≈2.2×10⁻¹⁶, so x+h=x+0 in many cases). Then f(x+h)=f(x) and the difference quotient is 0/10⁻¹⁵=0 — the result is 0, not f'(x).

Even before complete equality: for h=10⁻¹², the difference f(x+h)−f(x) involves catastrophic cancellation (both values are ≈f(x) to 12 decimal places), so only ~4 significant digits of the difference are reliable. The quotient [f(x+h)−f(x)]/h then has only ~4 digits of accuracy, not 15.

**Optimal h rule:** Use h≈√(u)≈10⁻⁸ for forward difference, h≈u^{1/3}≈10⁻⁵ for central difference.

**P49 checkpoint:**
- CORRECT → "Smaller h is not always better. For h below the optimal step size, roundoff error from catastrophic cancellation in f(x+h)−f(x) dominates. The optimal step size balances truncation (decreases with h) and roundoff (increases with h). Forward difference: h*≈10⁻⁸; central difference: h*≈10⁻⁵." → Gate (P91)
- PARTIAL (understands the concept but cannot estimate h*) → "Total error = truncation + roundoff ≈ (h/2)|f''| + 2u|f|/h. Minimise over h: d/dh[(h/2)|f''|+2u|f|/h]=|f''|/2−2u|f|/h²=0 → h²=4u|f|/|f''| → h*=2√(u|f|/|f''|)≈2√u≈4.5×10⁻⁸ for typical functions." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Compute [sin(1+h)−sin(1)]/h for h=10⁻⁸ and h=10⁻¹⁵. Compare each with cos(1)≈0.5403023. Which h gives a better approximation?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 SMALLER-H-ALWAYS-BETTER):**
Step 1 — "The limit definition h→0 is exact because it uses exact arithmetic. In floating-point, h→0 means f(x+h) and f(x) become identical bit strings at some point, so their DIFFERENCE is 0 — and 0/h=0, not f'(x). The finite-precision floor prevents the limit from being realised." Step 2 — Demonstration: compute [f(1+h)−f(1)]/h for f(x)=sin(x) with h=10⁻⁸, 10⁻¹⁰, 10⁻¹², 10⁻¹⁵ in any numerical tool. The error first decreases (h=10⁻⁸ near optimal) then increases, and at h=10⁻¹⁵ the result degrades to a crude approximation or 0. Step 3 — "Rule: the optimal step size is h*≈√u≈10⁻⁸ (forward difference) or u^{1/3}≈10⁻⁵ (central difference). Do not use h smaller than this. For the second derivative, h*≈u^{1/4}≈10⁻⁴ (larger, because the formula is already more sensitive to cancellation)."

**TB-R02 (MC-2 FORWARD-AND-CENTRAL-DIFFERENCE-SAME-ACCURACY):**
Step 1 — "The forward difference uses one extra function evaluation at x+h. The central difference uses two: f(x+h) and f(x−h). The additional evaluation pays off: the central difference formula is O(h²) instead of O(h), which means halving h reduces the error by 4× instead of 2×." Step 2 — Concrete comparison at h=0.01 for f=sin(x) at x=1: forward error≈4.2×10⁻³; central error≈5.6×10⁻⁶ — the central difference is 750× more accurate at the same step size. Step 3 — "When should you use forward vs. central? Forward: when you can only evaluate f at x and x+h (e.g., you have only future time steps, not past). Central: whenever both x+h and x−h are available — it gives much higher accuracy for the same cost. In practice, use central difference by default."

**TB-R03 (MC-3 NUMERICAL-DERIVATIVE-CONVERGES-TO-EXACT):**
Step 1 — "In exact arithmetic: yes, [f(x+h)−f(x)]/h→f'(x) as h→0. In floating-point: the numerator f(x+h)−f(x) suffers catastrophic cancellation when h is small (both values round to nearly the same float), so the quotient no longer converges — it eventually returns 0." Step 2 — Plot the error curve: as h decreases from 1 to 10⁻⁸, error decreases (truncation dominates, working as expected). Below h*≈10⁻⁸, error increases sharply (roundoff dominates). This U-shaped curve is characteristic of every finite-difference formula. Step 3 — "The U-shaped error curve is a diagnostic tool: if you plot log(error) vs. log(h) and see a V shape (or J shape), you have identified the optimal step size as the bottom of the V. Always plot this curve when tuning a numerical derivative."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Derive the central difference formula for f'(x) by adding the Taylor expansions of f(x+h) and f(x−h) (correcting: you need to SUBTRACT them — identify the correct operation) and confirm the O(h²) error term.
2. Use Richardson extrapolation to derive a 4th-order approximation for f'(x) using the central difference D(h)=[f(x+h)−f(x−h)]/(2h). Verify: [4D(h/2)−D(h)]/3 has error O(h⁴).
3. Compute f''(1) for f(x)=e^x using [f(1+h)−2f(1)+f(1−h)]/h² for h=0.1, 0.01, 0.001. Confirm error is O(h²). Estimate the optimal h* for this second-derivative formula.
4. A physical measurement y=f(t) is taken at times t₀, t₀+h, t₀+2h with measurement noise σ=10⁻³. (a) Estimate the derivative error from measurement noise in the central-difference formula. (b) How does this change the optimal step size h* compared to the pure floating-point case?

**P55 — Reflect & Consolidate:** "Forward: O(h), h*≈√u≈10⁻⁸. Central: O(h²), h*≈u^{1/3}≈10⁻⁵. Second derivative: O(h²), h*≈u^{1/4}≈10⁻⁴. Richardson extrapolation: eliminate leading error term → gain two orders. The error curve is U-shaped; the optimal h balances truncation and roundoff."

**P76 — Transfer Probe (Independence mode):**
The complex-step derivative: for an analytic function f, Im[f(x+ih)]/h ≈ f'(x) with NO roundoff error from subtraction (only h² and higher order terms). (a) Derive this from the Taylor expansion of f(x+ih) treating i as a perturbation. (b) Evaluate it numerically for f=sin at x=1 with h=10⁻²⁰ and compare with the forward and central finite differences at their respective optimal step sizes. (c) Explain why there is no cancellation error (no subtraction of nearly equal quantities). (d) Identify the limitation: f must be defined for complex arguments.

**P55 — Reflect & Consolidate:** "The complex-step derivative avoids cancellation entirely by using imaginary perturbations instead of real differences. It achieves machine-precision accuracy (error ≈ u·|f|) for any h>0. This is superior to all real finite differences in the absence of noise. The trade-off: requires complex-arithmetic capability in the code."

**P75 — Mastery Assessment:**
"You are estimating the Jacobian matrix J_{ij}=∂fᵢ/∂xⱼ for a system of n=100 equations in n unknowns, where f is a black-box numerical code. (a) How many function evaluations are needed for the full Jacobian using forward differences? (b) How many using central differences? (c) What is the error order of each column of J with forward vs. central differences? (d) Propose a Richardson-extrapolated Jacobian and estimate the additional function evaluation cost. (e) When would automatic differentiation (exact derivatives via code transformation) be preferable to numerical differentiation?"

**P55 — Reflect & Consolidate:** "Jacobian estimation: forward difference needs n+1 evaluations (1 baseline + n perturbations), central needs 2n, Richardson-extrapolated central needs 4n. For large-scale systems, automatic differentiation (forward or reverse mode AD) is the standard — it gives exact derivatives at O(n) cost with no step-size tuning."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.numerical-differentiation complete
- Score 3/5 → REVIEW optimal step size and U-shaped error curve; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.calc.derivative-definition or math.num.error-analysis; reassign

**P78 — Completion:** Numerical differentiation certified. Student derives forward and central difference formulas from Taylor expansion, identifies the U-shaped error curve, computes the optimal step size, applies Richardson extrapolation, and extends analysis to second derivatives and Jacobians.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Complex-step derivative; contrast with real finite differences; limitations
Skill tested: Derive from Taylor expansion with complex h; verify numerically; explain absence of cancellation; identify when complex-step is preferable

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
