# Numerical Analysis (math.num)

This chapter covers numerical methods for solving mathematical problems computationally, including floating-point arithmetic, root-finding, interpolation, numerical calculus, linear system solvers, eigenvalue algorithms, and ODE integrators.

## Table of Contents

1. [Floating-Point Arithmetic](#floating-point-arithmetic)
2. [Error Analysis](#error-analysis)
3. [Root-Finding Methods](#root-finding-methods)
4. [Newton's Method](#newtons-method)
5. [Polynomial Interpolation](#polynomial-interpolation)
6. [Splines](#splines)
7. [Numerical Differentiation](#numerical-differentiation)
8. [Numerical Integration](#numerical-integration)
9. [LU Factorization (Numerical)](#lu-factorization-numerical)
10. [Cholesky Factorization (Numerical)](#cholesky-factorization-numerical)
11. [Iterative Linear Solvers](#iterative-linear-solvers)
12. [QR Algorithm for Eigenvalues](#qr-algorithm-for-eigenvalues)
13. [Singular Value Decomposition (Numerical)](#singular-value-decomposition-numerical)
14. [Euler's Method](#eulers-method)
15. [Runge-Kutta Methods](#runge-kutta-methods)
16. [Stiff ODEs](#stiff-odes)

---

## Floating-Point Arithmetic

**Concept ID:** `math.num.floating-point`

Floating-point arithmetic represents real numbers in finite binary formats, enabling computers to approximate a vast range of magnitudes. The IEEE 754 standard governs how numbers are stored (sign, exponent, mantissa) and how operations round, with machine epsilon ε measuring the smallest detectable relative difference.

### Key Ideas

- **IEEE 754 representation**: A floating-point number is stored as ±(1.mantissa) × 2^exponent; the 64-bit double uses 52 mantissa bits, 11 exponent bits, and 1 sign bit.
- **Machine epsilon**: The smallest ε such that 1 + ε ≠ 1 in floating-point; for double precision ε ≈ 2.22 × 10⁻¹⁶, governing relative rounding errors.
- **Rounding and truncation**: Every real-to-float conversion either truncates or rounds to nearest, introducing an error of at most ½ ulp (unit in the last place).
- **Catastrophic cancellation**: Subtracting two nearly equal floating-point numbers destroys significant digits; the relative error can become enormous even when both operands are represented accurately.
- **Special values**: IEEE 754 defines ±∞, NaN (Not a Number), and subnormal numbers to handle overflow, undefined operations, and gradual underflow near zero.

### Common Misconceptions

- **Misconception:** Floating-point arithmetic is exact for simple decimals like 0.1. **Correction:** 0.1 has no finite binary representation; 0.1 + 0.2 ≠ 0.3 in IEEE 754 because both are approximated, accumulating a small but nonzero error.
- **Misconception:** A larger mantissa always gives a more accurate result. **Correction:** Precision is limited by the total number of bits; a larger mantissa only delays, not eliminates, rounding error, and cancellation can still annihilate all significant bits.
- **Misconception:** Floating-point errors are always tiny and can be ignored. **Correction:** Errors accumulate over many operations; catastrophic cancellation, ill-conditioned problems, or long iterative loops can grow tiny initial errors into completely wrong answers.

### Worked Example

**Problem:** Illustrate catastrophic cancellation by computing f(x) = (1 − cos x) / x² near x = 0 using double precision, and identify a more stable formula.

**Step 1 — Direct evaluation at x = 0.001:** cos(0.001) ≈ 0.9999995000000417; 1 − cos(0.001) ≈ 4.999999 × 10⁻⁷; dividing by (0.001)² = 10⁻⁶ gives ≈ 0.4999999, losing 6–7 digits of precision due to cancellation.

**Step 2 — Identify the cancellation:** Both 1 and cos(0.001) are very close to 1; their difference is represented with far fewer significant bits than either operand.

**Step 3 — Stable reformulation using half-angle identity:** f(x) = (1 − cos x) / x² = 2sin²(x/2) / x² = (1/2)(sin(x/2)/(x/2))². For x = 0.001 this gives ≈ 0.49999991666..., matching the Taylor series to full double precision.

**Step 4 — Verify with Taylor series:** f(x) = ½ − x²/24 + x⁴/720 − ⋯; at x = 0.001 this is ≈ 0.49999991666..., confirming the stable formula.

**Step 5 — General lesson:** When computing the difference of nearly equal quantities, reformulate algebraically (e.g., using identities, rationalization, or Taylor expansion) to avoid cancellation.

### Practice

**Problem:** Compute √(x² + 1) − 1 for x = 10⁻⁴ using direct subtraction and a numerically stable alternative, comparing the results.

### Assessment

**Question:** Explain why computing a − b when a ≈ b can cause large relative errors even if both a and b are represented accurately.

**Answer:** When a ≈ b, their floating-point representations have small absolute errors. The absolute error in the difference a − b is similar to the absolute errors in a and b individually, but the result is very small, so the relative error (absolute error / result) is large—potentially destroying all significant digits.

**Rubric:** Award full credit for identifying that relative error = absolute error / |a − b|; absolute errors are bounded by machine epsilon times the operand magnitudes; when a ≈ b the denominator is tiny, magnifying relative error. Partial credit for naming "cancellation" without quantifying the mechanism.

### Real-World Applications

- **Scientific computing:** Climate models accumulate millions of floating-point operations; understanding rounding errors guides the choice of algorithms (e.g., Kahan summation) to maintain accuracy over long simulations.
- **Financial software:** Banks and trading systems use fixed-point or decimal arithmetic for currency to avoid the "0.1 + 0.2 ≠ 0.3" problem, since even tiny floating-point errors can compound into significant monetary discrepancies.

---

## Error Analysis

**Concept ID:** `math.num.error-analysis`

Error analysis quantifies how errors propagate through numerical computations. Absolute error measures the raw deviation; relative error measures it as a fraction of the true value. Condition numbers characterize problem sensitivity, and backward error analysis assesses algorithmic stability.

### Key Ideas

- **Absolute and relative error:** If x̃ approximates x, absolute error = |x̃ − x| and relative error = |x̃ − x| / |x|; relative error is scale-invariant and typically the more meaningful measure.
- **Forward vs. backward error:** Forward error measures how far the computed answer is from the true answer; backward error measures how much the input must be perturbed so the true algorithm gives the computed answer—backward stability guarantees small backward error.
- **Condition number:** κ(f, x) = |relative output change| / |relative input change|; a large κ means the problem is ill-conditioned and even tiny input errors produce large output errors, regardless of algorithm.
- **Rounding error accumulation:** In a chain of n floating-point operations each with error ε, errors accumulate; classical analysis gives total relative error ≤ n·u where u is unit roundoff, but correlated errors can sometimes cancel.
- **Cancellation and loss of significance:** Subtracting nearly equal numbers amplifies relative error; condition number analysis formalizes this: the condition number of subtraction a − b for a ≈ b is |a|/|a − b| ≫ 1.

### Common Misconceptions

- **Misconception:** A numerically stable algorithm always gives accurate answers. **Correction:** Stability means the algorithm doesn't amplify errors beyond what the problem's condition number mandates; an ill-conditioned problem (large κ) yields inaccurate output from any algorithm when input data has errors.
- **Misconception:** Relative error is always smaller than absolute error. **Correction:** Relative error = absolute error / |true value|; when |true value| < 1, relative error is larger than absolute error. The choice of which to bound depends on context.
- **Misconception:** More floating-point precision always fixes inaccuracy. **Correction:** For ill-conditioned problems (e.g., nearly singular linear systems), increasing precision only delays the accuracy collapse; the fundamental issue is problem sensitivity, not arithmetic precision.

### Worked Example

**Problem:** Compute the condition number of f(x) = √x at x = 4 and interpret what it means for a 1% input error.

**Step 1 — Define condition number:** κ(f, x) = |x f′(x) / f(x)|.

**Step 2 — Compute f′(x):** f(x) = x^(1/2), so f′(x) = (1/2)x^(−1/2).

**Step 3 — Evaluate at x = 4:** κ(4) = |4 · (1/2) · 4^(−1/2) / 4^(1/2)| = |4 · (1/2) · (1/2) / 2| = |4 · 0.25 / 2| = 0.5.

**Step 4 — Interpret:** κ = 0.5 means a 1% relative error in x causes at most 0.5% relative error in √x; the square root is a well-conditioned operation.

**Step 5 — Contrast with ill-conditioned example:** For f(x) = x/(x − 1) near x = 1, κ ≈ 1/|x − 1|, which blows up as x → 1; a 1% error in x near x = 1.001 causes ~100% error in f(x).

### Practice

**Problem:** Given that computing the roots of ax² + bx + c = 0 via the standard formula is ill-conditioned when b² ≫ 4ac, propose a numerically stable algorithm and estimate its backward error.

### Assessment

**Question:** A problem has condition number κ = 10⁶. If input data has relative error 10⁻¹⁰, what is the expected relative error in the output?

**Answer:** Expected relative output error ≈ κ × relative input error = 10⁶ × 10⁻¹⁰ = 10⁻⁴. Despite very accurate input, the output has only about 4 correct decimal digits.

**Rubric:** Full credit for multiplying κ by input relative error and interpreting correctly. Partial credit for stating the formula without applying it. No credit for confusing condition number with algorithm stability.

### Real-World Applications

- **Structural engineering:** Finite element models of stiff structures involve nearly singular stiffness matrices; condition number analysis guides preconditioner choice to keep computed displacements meaningful.
- **GPS navigation:** Position fixes from satellite signals involve ill-conditioned geometry (poor satellite spread); software monitors the dilution of precision (a geometric condition number analog) to warn users when accuracy degrades.

---

## Root-Finding Methods

**Concept ID:** `math.num.root-finding`

Root-finding algorithms locate solutions of f(x) = 0. Bracketing methods like bisection guarantee convergence when a sign change is found; open methods like secant and regula falsi may converge faster but require more care.

### Key Ideas

- **Bisection method:** Given f(a) · f(b) < 0 (sign change → root by IVT), repeatedly halve the interval; converges linearly with guaranteed rate: error at step n is (b − a)/2ⁿ.
- **Regula falsi (false position):** Like bisection but updates the endpoint using a linear interpolation between (a, f(a)) and (b, f(b)); typically faster but can stagnate if one endpoint never updates (Illinois variant fixes this).
- **Secant method:** Uses two previous iterates to approximate the derivative without evaluating f′; superlinear convergence (order ≈ 1.618) but requires a good initial interval.
- **Convergence order:** Linear (bisection), superlinear (secant, order φ ≈ 1.618), quadratic (Newton), measured by |eₙ₊₁| ≤ C|eₙ|^p for convergence order p.
- **Stopping criteria:** Common choices are |f(xₙ)| < tol (residual), |xₙ₊₁ − xₙ| < tol (step size), or |xₙ₊₁ − xₙ|/|xₙ| < tol (relative step); combining two criteria prevents premature or slow termination.

### Common Misconceptions

- **Misconception:** Bisection always converges to a root, regardless of the function. **Correction:** Bisection requires a genuine sign change (f(a) and f(b) have opposite signs), which the IVT guarantees implies a root only for continuous functions; for discontinuous functions a sign change may not contain a root.
- **Misconception:** Faster convergence order always means fewer iterations in practice. **Correction:** Higher-order methods like Newton require evaluating the derivative and are sensitive to initial guesses; on a bad function (multiple roots, flat regions) they may diverge while bisection slowly but surely converges.
- **Misconception:** When |xₙ₊₁ − xₙ| is tiny the root is found accurately. **Correction:** Near a flat root (f′(r) ≈ 0), f can be very small even far from the root; the step stopping criterion should be paired with |f(xₙ)| < tol to confirm the residual is genuinely small.

### Worked Example

**Problem:** Apply bisection to find a root of f(x) = x³ − x − 2 on [1, 2], performing 4 iterations.

**Step 1 — Verify bracketing:** f(1) = 1 − 1 − 2 = −2 < 0; f(2) = 8 − 2 − 2 = 4 > 0; sign change confirmed, IVT guarantees a root in (1, 2).

**Step 2 — Iteration 1:** midpoint c₁ = 1.5; f(1.5) = 3.375 − 1.5 − 2 = −0.125 < 0; new bracket [1.5, 2].

**Step 3 — Iteration 2:** c₂ = 1.75; f(1.75) = 5.359 − 1.75 − 2 = 1.609 > 0; new bracket [1.5, 1.75].

**Step 4 — Iteration 3:** c₃ = 1.625; f(1.625) = 4.291 − 1.625 − 2 = 0.666 > 0; new bracket [1.5, 1.625].

**Step 5 — Iteration 4:** c₄ = 1.5625; f(1.5625) ≈ −0.051 < 0; new bracket [1.5625, 1.625]; root ≈ 1.5938 with error ≤ 0.0313.

### Practice

**Problem:** Compare the number of bisection iterations needed to achieve error < 10⁻⁶ starting from [0, 1] with the secant method starting from x₀ = 0, x₁ = 1 for f(x) = eˣ − 2, explaining convergence order differences.

### Assessment

**Question:** Why does bisection guarantee convergence while the secant method does not?

**Answer:** Bisection only requires a sign change (guaranteed root by IVT for continuous functions) and halves the bracket each step — the root is always bracketed. The secant method uses extrapolation and may diverge if iterates move away from the root or if f′ ≈ 0 near the iterate.

**Rubric:** Full credit for: bisection maintains bracket (IVT), secant does not bracket and may extrapolate outside root region. Partial credit for mentioning IVT without explaining the bracket invariant.

### Real-World Applications

- **Power systems engineering:** Finding the operating voltage of an electrical circuit requires solving nonlinear power-flow equations; bisection or Newton-based root finding is applied to each generator bus.
- **Option pricing:** Implied volatility in the Black-Scholes model is found by root-finding: given a market price C, solve Black-Scholes(σ) = C for σ, typically using Brent's method (hybrid bisection + secant).

---

## Newton's Method

**Concept ID:** `math.num.newtons-method`

Newton's method iterates xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ), achieving quadratic convergence near simple roots. It extends to systems (Newton–Raphson with Jacobian) and optimization (Newton step on gradient).

### Key Ideas

- **Quadratic convergence:** Near a simple root r, |eₙ₊₁| ≤ C|eₙ|², so errors square each iteration; once ≈ half a digit of accuracy, the number of correct digits roughly doubles per step.
- **Tangent line interpretation:** Each iterate is the x-intercept of the tangent to y = f(x) at (xₙ, f(xₙ)); the geometric picture explains both the fast convergence near a root and the divergence when the tangent is nearly horizontal.
- **Convergence conditions:** Newton converges quadratically if f′(r) ≠ 0 (simple root), f ∈ C² near r, and the initial guess x₀ is sufficiently close to r; near multiple roots convergence degrades to linear.
- **Modified Newton for multiple roots:** For a root of multiplicity m, iterate xₙ₊₁ = xₙ − m·f(xₙ)/f′(xₙ); this restores quadratic convergence at the cost of needing to know m.
- **Newton for systems:** Given F: ℝⁿ → ℝⁿ, the iteration Xₙ₊₁ = Xₙ − J_F(Xₙ)⁻¹ F(Xₙ) (solve J ΔX = −F, then X ← X + ΔX) converges quadratically near a regular root; computing J and solving the linear system is the dominant cost.

### Common Misconceptions

- **Misconception:** Newton's method always converges if you start close enough. **Correction:** "Close enough" depends on the function; for f(x) = x^(1/3) (root with f′(0) = ∞), Newton diverges from any starting point. The convergence guarantee requires f ∈ C² and f′(r) ≠ 0.
- **Misconception:** Quadratic convergence means Newton always outperforms bisection. **Correction:** Newton requires evaluating f′ (costly for complex functions) and a good initial guess; if the initial guess is poor, Newton can cycle, diverge, or converge to the wrong root. Bisection is slower but globally convergent given a bracket.
- **Misconception:** Newton's method is only for scalar equations. **Correction:** Newton–Raphson for systems F(X) = 0 is one of the most important algorithms in applied mathematics, used in circuit simulation, structural analysis, computational fluid dynamics, and machine learning (as the basis for second-order optimizers).

### Worked Example

**Problem:** Apply Newton's method to f(x) = x² − 2 with x₀ = 1.5, computing three iterates and verifying quadratic convergence.

**Step 1 — Set up the iteration:** f(x) = x² − 2, f′(x) = 2x; Newton step: xₙ₊₁ = xₙ − (xₙ² − 2)/(2xₙ) = (xₙ + 2/xₙ)/2 (the Babylonian square root method).

**Step 2 — Iterate 1:** x₁ = (1.5 + 2/1.5)/2 = (1.5 + 1.333...)/2 = 1.41666...; true √2 ≈ 1.41421356...; error |e₁| ≈ 2.45 × 10⁻³.

**Step 3 — Iterate 2:** x₂ = (1.41666... + 2/1.41666...)/2 ≈ 1.41421356...; error |e₂| ≈ 2.12 × 10⁻⁶; note |e₂| / |e₁|² ≈ 0.35, confirming quadratic convergence constant C ≈ 0.35.

**Step 4 — Iterate 3:** x₃ ≈ 1.4142135623730951 (16-digit precision); error ≈ 10⁻¹² — double the correct digits again.

**Step 5 — Convergence verification:** |e₂| ≈ (|e₁|)² × 0.35 and |e₃| ≈ (|e₂|)² × 0.35, confirming the quadratic rate.

### Practice

**Problem:** Apply Newton's method to find the root of f(x) = eˣ − 3 starting from x₀ = 1; perform 3 iterations and estimate the final error bound using the quadratic convergence formula.

### Assessment

**Question:** How does Newton's method behave near a root of multiplicity m = 2, and how can you restore quadratic convergence?

**Answer:** Near a double root, standard Newton converges linearly (error ratio → 1 − 1/m = 1/2); use modified Newton xₙ₊₁ = xₙ − m·f(xₙ)/f′(xₙ) to restore quadratic convergence.

**Rubric:** Full credit for: linear convergence at double root, correct modified Newton formula with m, explanation that f′(r) = 0 causes the degradation. Partial credit for identifying linear convergence without the fix or the cause.

### Real-World Applications

- **Circuit simulation (SPICE):** Solving the nonlinear device equations (diode, transistor I-V curves) at each timestep uses Newton-Raphson on a system of KCL/KVL equations; convergence within a few iterations is critical for simulation speed.
- **Training neural networks:** Second-order optimizers (Quasi-Newton, L-BFGS) approximate the Hessian of the loss function to take Newton-like steps; these converge faster than gradient descent for small-to-medium networks.

---

## Polynomial Interpolation

**Concept ID:** `math.num.interpolation`

Polynomial interpolation passes a unique degree-(n−1) polynomial through n data points. Lagrange's formula, Newton's divided differences, and Chebyshev node placement are key tools; Runge's phenomenon warns against equally spaced high-degree interpolation.

### Key Ideas

- **Existence and uniqueness:** Given n distinct nodes x₀ < x₁ < … < xₙ₋₁ and values yᵢ = f(xᵢ), there is a unique polynomial p of degree ≤ n − 1 with p(xᵢ) = yᵢ (Vandermonde argument); this is the interpolating polynomial.
- **Lagrange form:** p(x) = Σᵢ yᵢ Lᵢ(x) where Lᵢ(x) = Πⱼ≠ᵢ (x − xⱼ)/(xᵢ − xⱼ); explicit and theoretically clean but computationally costly for many nodes and numerically unstable in naive form.
- **Newton's divided differences:** Build the interpolating polynomial incrementally; adding a new node costs O(n) work; the difference table reveals the polynomial coefficients and generalizes to Hermite interpolation.
- **Error bound:** |f(x) − p(x)| = |f^(n)(ξ)| / n! · |Πᵢ (x − xᵢ)| for some ξ in the interval; the product term is minimized by Chebyshev nodes xᵢ = cos((2i+1)π/(2n)).
- **Runge's phenomenon:** Using equally spaced nodes for high-degree polynomial interpolation of smooth functions like 1/(1 + 25x²) causes extreme oscillations near the endpoints; Chebyshev nodes or piecewise methods (splines) cure this.

### Common Misconceptions

- **Misconception:** More interpolation nodes always give a better approximation. **Correction:** Runge's phenomenon shows that with equally spaced nodes, the maximum interpolation error can grow exponentially with degree; more nodes improve accuracy only with well-chosen placement (Chebyshev).
- **Misconception:** The Lagrange and Newton forms give different polynomials. **Correction:** They are algebraically identical — both represent the unique interpolating polynomial for the given data, just written in different bases (Lagrange basis vs. Newton basis of divided differences).
- **Misconception:** Polynomial interpolation is the best choice for any smooth dataset. **Correction:** For large n, high-degree polynomials are ill-conditioned and exhibit Runge's phenomenon; splines (piecewise low-degree polynomials with smoothness constraints) are typically far more robust.

### Worked Example

**Problem:** Find the interpolating polynomial through (0, 1), (1, 3), (2, 7) using Newton's divided differences and evaluate at x = 1.5.

**Step 1 — Build the divided difference table:**
- f[x₀] = 1, f[x₁] = 3, f[x₂] = 7.
- f[x₀, x₁] = (3 − 1)/(1 − 0) = 2; f[x₁, x₂] = (7 − 3)/(2 − 1) = 4.
- f[x₀, x₁, x₂] = (4 − 2)/(2 − 0) = 1.

**Step 2 — Write Newton's form:** p(x) = f[x₀] + f[x₀,x₁](x − x₀) + f[x₀,x₁,x₂](x − x₀)(x − x₁) = 1 + 2x + x(x − 1) = 1 + 2x + x² − x = x² + x + 1.

**Step 3 — Verify at nodes:** p(0) = 1 ✓, p(1) = 3 ✓, p(2) = 7 ✓.

**Step 4 — Evaluate at x = 1.5:** p(1.5) = (1.5)² + 1.5 + 1 = 2.25 + 1.5 + 1 = 4.75.

**Step 5 — Interpret:** p(x) = x² + x + 1; if the data came from f(x) = x² + x + 1 exactly, interpolation is exact (no error); for other functions the error is bounded by the derivative formula.

### Practice

**Problem:** Given f at four Chebyshev nodes on [−1, 1], construct the degree-3 interpolating polynomial using Newton divided differences and compare the error bound to equally-spaced nodes.

### Assessment

**Question:** State the polynomial interpolation error formula and explain why Chebyshev nodes minimize the maximum interpolation error.

**Answer:** Error = f^(n)(ξ)/n! · ω(x) where ω(x) = Π(x − xᵢ). Chebyshev nodes minimize max|ω(x)| over [a,b] over all choices of n nodes; the optimal max|ω| is (b−a)^n / (2^(2n−1)), whereas equally spaced nodes can give exponentially larger ω products.

**Rubric:** Full credit for the error formula with f^(n)(ξ)/n! and ω(x), plus the Chebyshev optimality statement. Partial credit for the formula alone or the node choice without the minimization rationale.

### Real-World Applications

- **Computer graphics:** Bezier curves and surfaces use the Bernstein basis (related to polynomial interpolation/approximation) to represent smooth shapes; GPU hardware is optimized for evaluating these polynomials.
- **Signal processing:** Upsampling audio or video from known sample values uses polynomial (or spline) interpolation to estimate intermediate sample values, exploiting the Shannon-Whittaker-Kotelnikov theorem.

---

## Splines

**Concept ID:** `math.num.splines`

Splines are piecewise polynomials sewn together with smoothness conditions. Natural cubic splines (C² globally) avoid Runge's phenomenon while maintaining visual smoothness; B-splines provide a numerically stable basis.

### Key Ideas

- **Piecewise polynomial construction:** On each subinterval [xᵢ, xᵢ₊₁] a cubic polynomial is defined; the 4n coefficients for n intervals are constrained by: interpolation (2n), first-derivative continuity (n−1), second-derivative continuity (n−1), and two boundary conditions (e.g., natural: S″(x₀) = S″(xₙ) = 0) — totaling 4n equations.
- **C² smoothness:** Requiring the second derivative to be continuous across knots gives visually smooth curves without abrupt curvature changes; this is the hallmark of natural cubic splines.
- **Tridiagonal system:** Setting up the spline reduces to solving a tridiagonal n × n linear system for the second derivative values Mᵢ; this can be solved in O(n) by Thomas algorithm.
- **B-spline basis:** B-splines are piecewise polynomial basis functions with compact support; every spline can be written as a linear combination of B-splines, which are numerically stable and geometrically intuitive (control-point interpretation).
- **Comparison with interpolating polynomials:** Unlike global degree-n polynomials (Runge oscillation), cubic splines use degree 3 everywhere and avoid oscillation while still being C² smooth; they are the gold standard for 1D data interpolation.

### Common Misconceptions

- **Misconception:** Any smooth piecewise function is a spline. **Correction:** A spline specifically requires globally smooth (Cᵏ for chosen k) piecewise polynomial pieces; an arbitrary piecewise function may have jumps in derivatives at the breakpoints.
- **Misconception:** Natural boundary conditions mean the function is zero at the endpoints. **Correction:** "Natural" means S″(x₀) = S″(xₙ) = 0 (zero curvature at the endpoints), not that the function value is zero; it's the default when no other boundary information is available.
- **Misconception:** More knots always produce a smoother spline. **Correction:** Smoothness is determined by the continuity order (C²), not the number of knots; adding too many knots can cause overfitting (the spline oscillates to hit all data points exactly rather than capturing the trend).

### Worked Example

**Problem:** Given data (0,0), (1,1), (2,0), set up the natural cubic spline equations (moment equations) and solve for the second derivatives M₀, M₁, M₂.

**Step 1 — Define notation:** h₁ = 1, h₂ = 1 (equal spacing); data y₀ = 0, y₁ = 1, y₂ = 0; Mᵢ = S″(xᵢ).

**Step 2 — Natural boundary conditions:** M₀ = 0, M₂ = 0.

**Step 3 — Interior moment equation (one interior node x₁):** h₁ M₀ + 2(h₁ + h₂) M₁ + h₂ M₂ = 6[(y₂ − y₁)/h₂ − (y₁ − y₀)/h₁].

**Step 4 — Substitute:** 1·0 + 2(1+1)·M₁ + 1·0 = 6[(0−1)/1 − (1−0)/1] = 6[−1 − 1] = −12; so 4M₁ = −12 → M₁ = −3.

**Step 5 — Write the spline on [0,1]:** S₁(x) = M₀(1−x)³/6 + M₁ x³/6 + (y₀ − M₀/6)(1−x) + (y₁ − M₁/6)x = 0 + (−3)x³/6 + 0 + (1 + 3/6)x = −x³/2 + 1.5x; verify S₁(0) = 0 ✓, S₁(1) = −0.5 + 1.5 = 1 ✓.

### Practice

**Problem:** For non-uniform knots x = {0, 1, 3, 6} and data y = {0, 2, 1, 4}, set up the tridiagonal system for the natural cubic spline second derivatives and solve using the Thomas algorithm.

### Assessment

**Question:** Why do natural cubic splines avoid Runge's phenomenon even for many data points?

**Answer:** Natural cubic splines use local (piecewise) degree-3 polynomials; oscillations cannot propagate globally because each piece only "sees" its neighboring knots. Global high-degree interpolation allows the polynomial to oscillate across the entire interval; splines' locality prevents this.

**Rubric:** Full credit for: locality argument (each piece is degree 3, couples only to neighbors), contrast with global polynomial (degree grows with n, Runge oscillation is global). Partial credit for mentioning piecewise without the locality argument.

### Real-World Applications

- **CAD/CAM:** Automotive body panel shapes are designed as NURBS (Non-Uniform Rational B-Splines), a generalization of cubic splines; CNC milling machines follow these spline paths to machine smooth surfaces.
- **Animation:** Character motion in films and games is keyframed: animators set poses at a few frames, and cubic spline interpolation (Catmull-Rom splines) generates smooth in-between motion automatically.

---

## Numerical Differentiation

**Concept ID:** `math.num.numerical-differentiation`

Numerical differentiation approximates derivatives from function values. Finite differences (forward, backward, central) have different accuracy orders; Richardson extrapolation improves accuracy; complex-step differentiation avoids cancellation.

### Key Ideas

- **Forward difference:** f′(x) ≈ [f(x+h) − f(x)]/h; truncation error O(h) (first-order accurate), plus rounding error O(ε/h); optimal h ≈ √ε ≈ 10⁻⁸ for double precision.
- **Central difference:** f′(x) ≈ [f(x+h) − f(x−h)]/(2h); truncation error O(h²) (second-order), rounding error O(ε/h); optimal h ≈ ε^(1/3) ≈ 10⁻⁵·⁵; generally preferred.
- **Second derivative:** f″(x) ≈ [f(x+h) − 2f(x) + f(x−h)]/h²; O(h²) accurate but amplifies rounding error more severely (optimal h ≈ ε^(1/4) ≈ 10⁻⁴).
- **Richardson extrapolation:** Combining two estimates with steps h and h/2 cancels the leading error term; central difference + Richardson gives O(h⁴) accuracy cheaply.
- **Complex-step differentiation:** Im[f(x + ih)] / h gives f′(x) with error O(h²) in the imaginary part, zero cancellation error (both steps involve subtraction in different parts); h can be 10⁻²⁰, giving near-machine-epsilon accuracy with a single function evaluation.

### Common Misconceptions

- **Misconception:** A smaller step h always gives a more accurate derivative. **Correction:** Rounding error grows as h → 0 (dividing by small h amplifies floating-point errors); there is an optimal h that balances truncation and rounding errors; below this h, accuracy degrades.
- **Misconception:** Numerical differentiation is as accurate as analytical differentiation. **Correction:** Numerical differentiation is inherently approximate (finite h), and limited by floating-point arithmetic; for accurate Jacobians in production code, automatic differentiation (AD) is preferred.
- **Misconception:** Central differences are always twice as expensive as forward differences. **Correction:** Central differences require two function evaluations (f(x+h) and f(x−h)) vs. one extra evaluation for forward difference; but they gain an order of accuracy (O(h²) vs. O(h)), so they are usually more efficient per accuracy digit.

### Worked Example

**Problem:** Approximate f′(1) for f(x) = sin(x) using forward and central differences with h = 0.1 and 0.01, comparing with the exact value cos(1) ≈ 0.5403.

**Step 1 — Forward difference, h = 0.1:** [sin(1.1) − sin(1)] / 0.1 = [0.8912 − 0.8415] / 0.1 = 0.0497/0.1 = 0.497; error ≈ 0.043 (error ∝ h).

**Step 2 — Central difference, h = 0.1:** [sin(1.1) − sin(0.9)] / 0.2 = [0.8912 − 0.7833] / 0.2 = 0.1079/0.2 = 0.5395; error ≈ 0.0008 (error ∝ h²).

**Step 3 — Forward difference, h = 0.01:** [sin(1.01) − sin(1)] / 0.01 ≈ 0.5398; error ≈ 0.0005 (10× smaller h → 10× smaller forward-diff error).

**Step 4 — Central difference, h = 0.01:** ≈ 0.54030; error ≈ 0.000002 (10× smaller h → 100× smaller central-diff error, confirming O(h²)).

**Step 5 — Conclusion:** Central differences achieve O(h²) accuracy; for the same h they are about h-times more accurate than forward differences, justifying the extra function evaluation.

### Practice

**Problem:** Derive the O(h⁴) Richardson extrapolation formula for f′(x) from two central-difference estimates D(h) and D(h/2), and apply it to f(x) = eˣ at x = 0.

### Assessment

**Question:** Why does decreasing h below the optimal value degrade numerical differentiation accuracy?

**Answer:** As h → 0, the numerator f(x+h) − f(x) approaches zero while floating-point arithmetic introduces absolute error ≈ ε·|f|; dividing by h amplifies this to O(ε/h), which grows unboundedly as h → 0, overwhelming the truncation error reduction.

**Rubric:** Full credit for identifying rounding error O(ε/h) growing as h → 0 and the trade-off with truncation error O(hᵖ). Partial credit for mentioning "cancellation" without quantifying the mechanism. No credit for claiming "smaller h is always better."

### Real-World Applications

- **Finite difference methods for PDEs:** Heat conduction, fluid flow, and electromagnetic simulations discretize spatial derivatives using finite differences on a grid; the accuracy analysis (truncation, stability, consistency) follows directly from numerical differentiation theory.
- **Sensitivity analysis in optimization:** Gradient-free optimization and finite-difference Jacobians power design-space exploration in aerospace, where analytical derivatives of legacy simulation codes are unavailable.

---

## Numerical Integration

**Concept ID:** `math.num.numerical-integration`

Numerical integration (quadrature) approximates ∫ₐᵇ f(x)dx. Newton-Cotes rules (trapezoid, Simpson) use equal-spaced nodes; Gaussian quadrature places nodes optimally for maximum exactness; adaptive quadrature concentrates effort where f varies most.

### Key Ideas

- **Trapezoid rule:** ∫ₐᵇ f ≈ (b−a)[f(a)+f(b)]/2; error O(h²) per subinterval (composite: O(h²) globally); simple and robust; improves to spectral accuracy on smooth periodic functions (Euler-Maclaurin).
- **Simpson's rule:** ∫ₐᵇ f ≈ (b−a)[f(a)+4f((a+b)/2)+f(b)]/6; error O(h⁴) per subinterval; integrates cubics exactly; requires even number of subintervals in composite form.
- **Gaussian quadrature:** Choose n nodes and weights so the rule is exact for polynomials of degree 2n−1; nodes are roots of the nth Legendre polynomial; exponential convergence for smooth f; cannot adapt to singularities.
- **Adaptive quadrature:** Recursively bisect intervals where the error estimate exceeds a tolerance; combines a coarse and fine estimate (e.g., Simpson vs. Simpson-3/8) to estimate local error; efficient for functions with localized variation.
- **Romberg integration:** Apply Richardson extrapolation to the composite trapezoid rule at h, h/2, h/4, …; builds a triangular table converging to O(h²ᵏ) accuracy with k extrapolation levels; simple and effective for smooth functions.

### Common Misconceptions

- **Misconception:** Gaussian quadrature with n nodes is always more accurate than the n-point trapezoid rule. **Correction:** Gaussian quadrature is optimal for smooth functions, but its fixed node placement cannot handle endpoint singularities or discontinuities; the trapezoid rule on a graded mesh may outperform it for singular integrands.
- **Misconception:** Adaptive quadrature guarantees the user-specified tolerance is met. **Correction:** Adaptive quadrature estimates (not computes) the error; for highly oscillatory or near-singular functions, the error estimate can be misleading, and the algorithm may return an inaccurate result within the specified tolerance.
- **Misconception:** The trapezoid rule is only first-order accurate. **Correction:** For smooth periodic functions integrated over a full period, the trapezoid rule is spectrally accurate (error decays faster than any power of h); this is the Euler-Maclaurin formula effect, exploited in Fourier analysis and boundary integral methods.

### Worked Example

**Problem:** Estimate ∫₀¹ eˣ dx using the composite trapezoid rule and composite Simpson's rule with n = 4 subintervals, comparing with the exact value e − 1 ≈ 1.71828.

**Step 1 — Setup:** h = 0.25; nodes x = {0, 0.25, 0.5, 0.75, 1}; f values: {1, 1.2840, 1.6487, 2.1170, 2.7183}.

**Step 2 — Composite trapezoid:** T = h/2 [f(0) + 2f(0.25) + 2f(0.5) + 2f(0.75) + f(1)] = 0.125[1 + 2.5681 + 3.2974 + 4.2340 + 2.7183] = 0.125 × 13.8178 ≈ 1.7272; error ≈ 0.009 = O(h²).

**Step 3 — Composite Simpson's:** S = h/3 [f(0) + 4f(0.25) + 2f(0.5) + 4f(0.75) + f(1)] = (0.25/3)[1 + 5.1361 + 3.2974 + 8.4680 + 2.7183] = (0.25/3) × 20.6198 ≈ 1.71832; error ≈ 0.00004 = O(h⁴).

**Step 4 — Compare errors:** Trapezoid error ≈ 9 × 10⁻³; Simpson error ≈ 4 × 10⁻⁵; Simpson is ~200× more accurate with the same nodes (exploits the extra midpoint evaluation and achieves O(h⁴)).

**Step 5 — Rule of thumb:** For smooth functions, prefer Simpson or Gaussian quadrature; use adaptive methods when f has localized peaks or near-singularities.

### Practice

**Problem:** Derive the 2-point Gaussian quadrature rule on [−1, 1] (nodes = ±1/√3, weights = 1), verify it integrates x³ exactly, and apply it to estimate ∫₀² cos(x) dx.

### Assessment

**Question:** Why does Gaussian quadrature with n points integrate polynomials of degree 2n−1 exactly, while the trapezoid rule with n+1 points only integrates polynomials of degree 1 exactly?

**Answer:** Gaussian quadrature optimizes both the node positions and weights (2n free parameters) to satisfy exactness for degree 2n−1 polynomial basis functions. The trapezoid rule fixes nodes at endpoints (0 free node parameters) and only optimizes weights (2 parameters), so it can only guarantee exactness for polynomials of degree ≤ 1.

**Rubric:** Full credit for counting free parameters (nodes + weights = 2n for Gauss, vs. weights only for trapezoid). Partial credit for stating the degree-of-exactness difference without the parameter-counting argument.

### Real-World Applications

- **Finite element analysis:** Stiffness and mass matrices require integrating products of basis functions over elements; Gaussian quadrature on reference elements provides the exact integration rule used in virtually all FEA codes.
- **Probabilistic simulation:** Monte Carlo integration (sampling-based approximation of high-dimensional integrals) is numerically-analyzed by comparing with deterministic quadrature; low-discrepancy sequences (quasi-Monte Carlo) systematically improve on random sampling.

---

## LU Factorization (Numerical)

**Concept ID:** `math.num.lu-factorization`

Numerical LU factorization decomposes A = PLU with partial pivoting, using O(n³/3) operations. Partial pivoting controls growth factors and prevents division by near-zero pivots; backward error analysis shows the computed solution satisfies a nearby system.

### Key Ideas

- **Partial pivoting:** Before eliminating in column k, swap the row with the largest |aᵢₖ| to the pivot position; this bounds the growth factor gₙ = max|entries during elimination| / max|aᵢⱼ| ≤ 2^(n−1) in the worst case but nearly always O(n) in practice, preventing catastrophic amplification of rounding errors.
- **Growth factor bound:** Without pivoting, element magnitudes can grow exponentially (worst case 2^(n−1)); partial pivoting limits growth to 2^(n−1) in theory and O(n) empirically, making the computed factorization backward stable.
- **Backward error:** Wilkinson's analysis: the computed L̂, Û satisfy P A + δA = L̂ Û where ‖δA‖ / ‖A‖ = O(ε), so the computed factors solve a slightly perturbed problem exactly — a hallmark of backward stability.
- **Operation count:** Forming the factorization costs n³/3 multiplications and n³/3 additions; each subsequent forward/backward substitution costs n² — making PLU ideal for solving Ax = b for multiple right-hand sides.
- **Condition number and accuracy:** The relative error in the solution x satisfies ‖Δx‖/‖x‖ ≤ κ(A)·ε where κ(A) = ‖A‖·‖A⁻¹‖; PLU is backward stable but an ill-conditioned A still yields an inaccurate solution.

### Common Misconceptions

- **Misconception:** Partial pivoting makes LU factorization always numerically stable. **Correction:** Partial pivoting provides backward stability (the computed factors solve a nearby system exactly), but the forward error in x still depends on κ(A); for ill-conditioned matrices, partial pivoting cannot cure the sensitivity.
- **Misconception:** Complete pivoting (row AND column swaps) is universally used in practice. **Correction:** Complete pivoting guarantees a growth factor ≤ n^(1/2)(2·3^(1/2)…)^(1/(n−1)) but costs O(n²) comparisons per step; partial pivoting is almost always sufficient and cheaper.
- **Misconception:** LU factorization always fails when A is singular. **Correction:** For a numerically singular (nearly singular) matrix, the factorization may "succeed" and produce large entries; the resulting solution is meaningless. Checking the pivot magnitudes or computing κ(A) catches near-singularity.

### Worked Example

**Problem:** Perform PLU factorization of A = [[2,1],[6,4]] with partial pivoting, then solve Ax = [8,26]ᵀ.

**Step 1 — Choose pivot:** Column 1 has |2| and |6|; largest is |6|; swap rows: P = [[0,1],[1,0]], A → [[6,4],[2,1]].

**Step 2 — Eliminate:** Multiplier m₂₁ = 2/6 = 1/3; row 2 → row 2 − (1/3)·row 1: [[6,4],[0, 1 − 4/3]] = [[6,4],[0, −1/3]]; L = [[1,0],[1/3,1]], U = [[6,4],[0,−1/3]].

**Step 3 — Forward solve Ly = Pb:** Pb = [26, 8]ᵀ; y₁ = 26; y₂ = 8 − (1/3)(26) = 8 − 8.667 = −0.667.

**Step 4 — Backward solve Ux = y:** x₂ = (−0.667)/(−1/3) = 2; x₁ = (26 − 4·2)/6 = (26 − 8)/6 = 3.

**Step 5 — Verify:** A·[3,2]ᵀ = [2·3+1·2, 6·3+4·2]ᵀ = [8, 26]ᵀ ✓.

### Practice

**Problem:** For a 4×4 matrix with κ(A) = 10⁸, compute LU (with partial pivoting) and estimate the expected relative error in the solution, given that double precision has unit roundoff u ≈ 10⁻¹⁶.

### Assessment

**Question:** What is backward stability in the context of LU factorization, and why is it important?

**Answer:** Backward stability means the computed factors L̂, Û satisfy (A + δA) = L̂ Û for some small ‖δA‖/‖A‖ = O(ε). It is important because it guarantees the algorithm behaves as if it solved an exact problem with slightly perturbed data — the computed solution x satisfies the perturbed system exactly. The actual error in x then depends only on κ(A), not on numerical flaws in the algorithm.

**Rubric:** Full credit for: backward stability definition (small perturbation to input), relation to κ(A) for forward error, significance for reliable software. Partial credit for mentioning "small error" without formalizing as input perturbation.

### Real-World Applications

- **Dense linear systems in simulation:** Fluid dynamics, structural mechanics, and electromagnetic solvers reduce to dense linear systems; LAPACK's dgetrf implements PLU factorization as the production standard.
- **Econometric modeling:** Fitting multivariate regression models with hundreds of predictors requires solving normal equations; PLU factorization (or QR) processes these efficiently with controlled numerical error.

---

## Cholesky Factorization (Numerical)

**Concept ID:** `math.num.cholesky`

For symmetric positive definite (SPD) matrices, Cholesky gives A = LLᵀ in n³/6 operations (half the LU cost) with no pivoting needed for stability. It is the gold standard for SPD systems.

### Key Ideas

- **SPD prerequisite:** Cholesky requires A to be symmetric and positive definite (all eigenvalues > 0); if any diagonal entry lₖₖ² = aₖₖ − Σ lₖⱼ² becomes negative during factorization, A is not SPD and the algorithm signals failure.
- **Stability without pivoting:** For SPD matrices, the pivots lₖₖ = √(aₖₖ − Σlₖⱼ²) are all positive and bounded, so no pivoting is needed; the growth factor is 1 (no growth), making Cholesky intrinsically stable.
- **Operation count:** n³/6 multiplications (half of LU's n³/3) because only the lower triangle is factored; solving L Lᵀ x = b costs 2n² operations for two triangular solves.
- **Block Cholesky and BLAS-3:** Production implementations (LAPACK dpotrf) process blocks of size nb, expressing inner-loops as matrix-matrix multiplication (BLAS-3) — achieving near-peak floating-point throughput.
- **Incomplete Cholesky:** A preconditioner for large sparse SPD systems; factorize but drop fill-in outside the sparsity pattern; the resulting approximate L serves as a preconditioner in conjugate gradient iterations.

### Common Misconceptions

- **Misconception:** Cholesky works for any symmetric matrix. **Correction:** Cholesky requires positive definiteness; indefinite symmetric matrices (some negative eigenvalues) will cause the algorithm to attempt the square root of a negative number; LDLT factorization generalizes to indefinite matrices.
- **Misconception:** The Cholesky factor L is unique. **Correction:** The standard Cholesky factor with positive diagonal entries is unique; if negative diagonal entries are allowed, A = (−L)(−L)ᵀ = LLᵀ, so the sign convention must be fixed (positive diagonal).
- **Misconception:** Cholesky is equivalent to LU for SPD matrices. **Correction:** LU requires pivoting for stability; Cholesky does not (SPD pivots are inherently positive); Cholesky is about twice as fast and more numerically reliable for SPD problems.

### Worked Example

**Problem:** Compute the Cholesky factorization of A = [[4, 2],[2, 3]].

**Step 1 — Verify SPD:** det(A) = 12 − 4 = 8 > 0; trace = 7 > 0; eigenvalues positive ✓.

**Step 2 — Compute l₁₁:** l₁₁ = √a₁₁ = √4 = 2.

**Step 3 — Compute l₂₁:** l₂₁ = a₂₁ / l₁₁ = 2/2 = 1.

**Step 4 — Compute l₂₂:** l₂₂ = √(a₂₂ − l₂₁²) = √(3 − 1) = √2 ≈ 1.4142.

**Step 5 — Verify:** L = [[2,0],[1,√2]]; LLᵀ = [[4,2],[2,3]] ✓.

### Practice

**Problem:** Attempt the Cholesky factorization of B = [[4, 3],[3, 2]] and diagnose why it fails at step 2; relate this to B's eigenvalues.

### Assessment

**Question:** Explain why no pivoting is needed for numerical stability in Cholesky factorization of an SPD matrix.

**Answer:** At each step, the pivot lₖₖ = √(aₖₖ − Σlₖⱼ²) is the square root of a positive quantity (because A's Schur complement is SPD); pivots are always positive and cannot be zero or negative, so no reordering is ever needed for stability. The growth factor equals 1, unlike LU where it can be exponential.

**Rubric:** Full credit for: positive pivots from SPD property, growth factor = 1, contrast with LU requiring pivoting. Partial credit for stating "pivots are positive" without connecting to Schur complement positivity.

### Real-World Applications

- **Kalman filtering:** The covariance matrix in a Kalman filter is SPD; updating it via Cholesky factorization (square-root filter) maintains SPD structure numerically and is standard in aerospace navigation systems.
- **Gaussian process regression:** Training a GP model requires inverting an n×n kernel matrix (SPD); Cholesky factorization gives the log-determinant (sum of 2 log lₖₖ) needed for hyperparameter optimization in O(n³/6).

---

## Iterative Linear Solvers

**Concept ID:** `math.num.iterative-linear`

Iterative solvers (Jacobi, Gauss-Seidel, CG, GMRES) avoid forming A⁻¹ explicitly and are preferred for large sparse systems. Convergence depends on the spectral radius or condition number; preconditioning is critical.

### Key Ideas

- **Splitting methods:** Write A = M − N; iterate xₖ₊₁ = M⁻¹(N xₖ + b); Jacobi: M = diag(A); Gauss-Seidel: M = lower(A); convergence requires spectral radius ρ(M⁻¹N) < 1; Gauss-Seidel usually converges roughly twice as fast as Jacobi.
- **Conjugate Gradient (CG):** For SPD A, CG minimizes the A-norm error over Krylov subspace Kₙ = span{r₀, Ar₀, …, Aⁿ⁻¹r₀}; converges in at most n steps exactly, but practical convergence in √κ(A) iterations with error ≤ 2((√κ−1)/(√κ+1))^k.
- **GMRES:** For nonsymmetric A, GMRES minimizes the residual ‖b − Axₖ‖ over Kₖ; restarts (GMRES(m)) limit memory; no guaranteed convergence for general A without restart.
- **Preconditioning:** Replace Ax = b by M⁻¹Ax = M⁻¹b; a good preconditioner M ≈ A makes κ(M⁻¹A) small, drastically reducing iterations; ILU, AMG, and domain decomposition are common choices.
- **Memory advantage:** For an n×n sparse matrix with nnz nonzeros, CG needs O(nnz) memory per iteration vs. O(n²) for dense PLU; for n = 10⁶ this is the difference between feasible and impossible.

### Common Misconceptions

- **Misconception:** Iterative solvers are always slower than direct solvers. **Correction:** For large sparse systems (FEA, CFD, PDE discretizations), iterative solvers with good preconditioners achieve O(n log n) to O(n^(4/3)) complexity vs. O(n²) for sparse direct methods; they are faster and use less memory for large n.
- **Misconception:** CG converges in exactly n steps for any SPD system. **Correction:** CG converges in n steps exactly only in exact arithmetic; in floating-point, rounding errors prevent this — practical CG is run for far fewer than n iterations and relies on clustering of eigenvalues for fast convergence.
- **Misconception:** The spectral radius ρ(M⁻¹N) < 1 guarantees fast convergence. **Correction:** ρ < 1 guarantees eventual convergence; the rate of convergence is geometric with ratio ρ, so ρ = 0.99 means very slow convergence (~700 iterations for 3 digits); the practical requirement is ρ ≪ 1 or, equivalently, κ(M⁻¹A) ≈ 1.

### Worked Example

**Problem:** Apply Jacobi iteration to solve [[3,1],[1,4]]x = [5, 9]ᵀ starting from x⁰ = [0,0]ᵀ, performing 3 iterations.

**Step 1 — Jacobi update formulas:** x₁^(k+1) = (5 − x₂^(k))/3; x₂^(k+1) = (9 − x₁^(k))/4.

**Step 2 — k=0:** x₁ = 5/3 ≈ 1.667; x₂ = 9/4 = 2.25.

**Step 3 — k=1:** x₁ = (5 − 2.25)/3 = 0.917; x₂ = (9 − 1.667)/4 = 1.833.

**Step 4 — k=2:** x₁ = (5 − 1.833)/3 = 1.056; x₂ = (9 − 0.917)/4 = 2.021.

**Step 5 — Exact solution and error:** A⁻¹b: 3x₁ + x₂ = 5, x₁ + 4x₂ = 9 → x = [1, 2]; errors after 3 iterations: |x₁ − 1| = 0.056, |x₂ − 2| = 0.021; convergence is linear.

### Practice

**Problem:** For A = diag(1, 100, 10000) + 0.01·ones (a diagonally dominant SPD matrix), compare the convergence of unpreconditioned CG with Jacobi-preconditioned CG, relating iteration counts to κ(A) and κ(M⁻¹A).

### Assessment

**Question:** Why is preconditioning critical for iterative methods applied to ill-conditioned systems?

**Answer:** CG convergence requires O(√κ(A)) iterations; for κ = 10⁶, this is ~1000 iterations. A preconditioner M ≈ A reduces κ(M⁻¹A) to, say, 10, needing only ~3 iterations. Preconditioning transforms the problem's spectral distribution so eigenvalues cluster near 1, making the Krylov subspace converge in very few steps.

**Rubric:** Full credit for √κ(A) iteration bound, how preconditioner reduces κ, eigenvalue clustering effect. Partial credit for stating preconditioning improves convergence without quantifying via κ.

### Real-World Applications

- **Finite element structural analysis:** Stiffness matrices for 3D meshes with millions of DOFs are sparse SPD; PCG (preconditioned CG) with AMG preconditioner is the standard production solver.
- **Image reconstruction in MRI:** The Fourier measurement operator gives rise to large linear systems; iterative methods (CG, LSQR) handle the non-square, complex-valued systems from k-space sampling.

---

## QR Algorithm for Eigenvalues

**Concept ID:** `math.num.qr-algorithm`

The QR algorithm implicitly applies QR factorizations to converge A to quasi-upper-triangular (Schur) form, revealing eigenvalues on the diagonal. Practical variants use Hessenberg reduction, shifts, and deflation.

### Key Ideas

- **Basic QR iteration:** Factor A = Q₁R₁; form A₁ = R₁Q₁; repeat; the diagonal entries converge to eigenvalues (proof via connection to power iteration applied simultaneously to all eigenvectors via orthogonal transformations).
- **Hessenberg reduction:** Reducing A to upper Hessenberg form H (Hᵢⱼ = 0 for i > j+1) in O(n³) by Householder reflections preserves eigenvalues and makes each QR step cost O(n²) instead of O(n³) — a crucial efficiency gain.
- **Wilkinson shift:** At each step, shift by μ (an eigenvalue estimate) before factoring: (A − μI) = QR, then A ← RQ + μI; this dramatically accelerates convergence from linear to cubic near a simple eigenvalue.
- **Deflation:** When a sub-diagonal entry |hₙ,ₙ₋₁| < ε · (|hₙₙ| + |hₙ₋₁,ₙ₋₁|), the matrix decouples; deflate by working on the smaller submatrix, reducing work for subsequent steps.
- **Convergence:** With shifts, the practical QR algorithm (Francis double-shift for real matrices, handling complex conjugate pairs) converges cubically to each eigenvalue and is O(n³) overall — the production standard in LAPACK.

### Common Misconceptions

- **Misconception:** QR iteration only computes the largest eigenvalue. **Correction:** A single QR iteration implicitly applies the power method to all eigenvectors simultaneously via orthogonal similarity transformations; the whole Schur form (all eigenvalues) converges, unlike plain power iteration.
- **Misconception:** The QR factorization in QR iteration must be computed from scratch each step. **Correction:** Because A is maintained in Hessenberg form, each QR step can be computed using O(n) Givens rotations in O(n²) flops, not the O(n³) needed for a general matrix.
- **Misconception:** All eigenvalues converge simultaneously at the same rate. **Correction:** Eigenvalues converge one at a time (deflation removes them); the rate for each depends on the ratio |λᵢ|/|λⱼ| for nearby eigenvalues and the effectiveness of shifts.

### Worked Example

**Problem:** Perform one step of unshifted QR iteration on A = [[2,1],[1,3]], compute A₁ = R₁Q₁, and verify eigenvalue preservation.

**Step 1 — QR factorize A:** Use Givens rotation to zero out (2,1) entry. θ: c = 2/√5, s = 1/√5; Q₁ = [[c, s],[-s, c]]; R₁ = [[√5, (2c+3s)/1],[0, (3c−s)]]; numerically: Q = [[0.894, 0.447],[-0.447, 0.894]], R = [[2.236, 2.236],[0, 2.236]].

**Step 2 — Form A₁ = R₁Q₁:** A₁ = R·Q = [[2.236,2.236],[0,2.236]] · [[0.894,0.447],[-0.447,0.894]] = [[2.0,2.0],[−1.0,2.0]]... (approximate; the exact computation preserves similar structure).

**Step 3 — Check eigenvalues:** Both A and A₁ are similar (A₁ = Q₁ᵀ A Q₁), so they share eigenvalues; eigenvalues of A: λ = (5 ± √5)/2 ≈ 1.382 and 3.618; A₁ must have the same values.

**Step 4 — Observe convergence:** The off-diagonal entry |a₂₁| of A₁ is smaller (|λ₁/λ₂|¹ ≈ 0.38 times its original value), confirming convergence toward triangular form.

**Step 5 — Practical note:** With the Wilkinson shift μ = a₂₂ = 3, the next iterate's off-diagonal would shrink cubically — dramatically faster.

### Practice

**Problem:** Implement 5 steps of the QR algorithm (with Wilkinson shift) on A = [[4,1,0],[1,3,1],[0,1,2]] and compare eigenvalue convergence with the unshifted variant.

### Assessment

**Question:** Why is Hessenberg reduction performed before QR iteration, and what is the complexity benefit?

**Answer:** Hessenberg reduction (O(n³) one-time cost) makes each subsequent QR step cost O(n²) instead of O(n³): because H has only one subdiagonal, each QR factorization via Givens rotations requires only n−1 rotations (O(n²) total). Without Hessenberg form, each iteration costs O(n³), making the total O(n⁴), impractical for large n.

**Rubric:** Full credit for: O(n³) Hessenberg pre-computation, O(n²) per QR step via Givens on Hessenberg form, total O(n³) vs. O(n⁴) without. Partial credit for stating "cheaper" without the complexity argument.

### Real-World Applications

- **Structural vibration analysis:** Computing natural frequencies of a building/bridge requires eigenvalues of the generalized system KΦ = λMΦ; the QR algorithm (or Lanczos for sparse) is the workhorse for the dense projected problem.
- **Google's PageRank:** The dominant eigenvector of a modified web link matrix gives page rankings; practically computed by power iteration (the first step of QR), but the full QR algorithm handles the complete spectrum for smaller sub-problems.

---

## Singular Value Decomposition (Numerical)

**Concept ID:** `math.num.svd`

Numerical SVD computes A = UΣVᵀ via bidiagonalization followed by QR-like iteration. Singular values reveal numerical rank, best low-rank approximation (Eckart-Young), and condition number.

### Key Ideas

- **Bidiagonalization (Golub-Kahan):** Two-sided Householder transformations reduce A ∈ ℝᵐˣⁿ to bidiagonal form B (nonzeros on diagonal and one superdiagonal) in O(mn²) flops; B's SVD is then computed cheaply.
- **Eckart-Young theorem:** The best rank-k approximation (in 2-norm or Frobenius norm) of A is Aₖ = U diag(σ₁,…,σₖ,0,…) Vᵀ, retaining the k largest singular values; the approximation error equals σₖ₊₁.
- **Numerical rank:** The numerical rank r is the number of singular values exceeding a tolerance τ = ε · σ₁; this robustly identifies the effective rank despite floating-point perturbations, unlike Gaussian elimination rank detection.
- **Condition number:** κ₂(A) = σ₁/σₙ (ratio of largest to smallest singular value); more robust than κ from LU because U, V are orthogonal and don't amplify errors; if σₙ ≈ 0, A is nearly singular.
- **Compact SVD:** For rank-r ≤ min(m,n) matrices, store only r columns of U, r singular values, r rows of Vᵀ; memory O(r(m+n)) vs. O(mn) for full SVD — critical for large-scale truncated SVD (randomized algorithms).

### Common Misconceptions

- **Misconception:** SVD is too expensive for practical problems. **Correction:** Full SVD of an m×n matrix costs O(mn·min(m,n)) flops; randomized SVD computes a rank-k approximation in O(mn log k) — feasible for matrices with millions of rows; it is standard in recommender systems, genomics, and NLP.
- **Misconception:** The singular vectors U and V are unique. **Correction:** When singular values are distinct, U and V are unique up to sign (each column can be negated independently); for repeated singular values, the corresponding singular vectors span a subspace — only the subspace is unique.
- **Misconception:** The condition number κ₂(A) = σ₁/σₙ is the same for A and Aᵀ. **Correction:** A and Aᵀ have the same singular values (σᵢ(A) = σᵢ(Aᵀ)) and hence the same condition number; however, their left and right singular vectors are swapped.

### Worked Example

**Problem:** Compute the SVD of A = [[3,0],[4,0],[0,5]] and the best rank-1 approximation.

**Step 1 — Compute AᵀA:** AᵀA = [[9+16, 0],[0, 25]] = [[25, 0],[0, 25]] — diagonal; eigenvalues 25, 25; σ₁ = σ₂ = 5.

**Step 2 — Re-examine:** Actually A = [[3,0],[4,0],[0,5]]; AᵀA = [[9+16, 0],[0, 0+25]] = [[25,0],[0,25]]; eigenvalues both 25; this is a degenerate case (both singular values equal 5).

**Step 3 — Clearer example:** For A = [[3,0],[0,4]], AᵀA = diag(9,16); σ₁ = 4, σ₂ = 3; V = I; U columns: u₁ = [0,1]ᵀ (for σ₁=4), u₂ = [1,0]ᵀ (for σ₂=3); so A = [[0,1],[1,0]] · [[4,0],[0,3]] · Iᵀ.

**Step 4 — Best rank-1 approximation:** A₁ = σ₁ u₁ v₁ᵀ = 4·[0,1]ᵀ·[1,0] = [[0,0],[4,0]]; approximation error = σ₂ = 3.

**Step 5 — Verify Eckart-Young:** ‖A − A₁‖₂ = ‖[[3,0],[0,0]]‖₂ = 3 = σ₂ ✓.

### Practice

**Problem:** Given a 100×50 matrix A with singular values {100, 50, 10, 1, 0.1, 0.01, …}, determine the numerical rank at tolerance τ = 0.5 and estimate the reconstruction error for rank-3 and rank-4 truncation.

### Assessment

**Question:** How does the SVD determine whether a linear system Ax = b is solvable, and what is the minimum-norm least-squares solution?

**Answer:** Write A = UΣVᵀ; Ax = b is consistent iff b is in the column space (spanned by columns of U corresponding to nonzero σᵢ); the minimum-norm least-squares solution is x† = VΣ†Uᵀb where Σ† replaces each nonzero σᵢ by 1/σᵢ (the pseudoinverse).

**Rubric:** Full credit for: pseudoinverse x† = A†b = VΣ†Uᵀb, explanation of Σ† (reciprocal nonzero singular values), condition for exact solvability (b in column space of U). Partial credit for mentioning pseudoinverse without the formula.

### Real-World Applications

- **Recommender systems:** Netflix/Spotify decompose the user-item rating matrix via truncated SVD (or NMF); the top-k singular vectors capture latent factors (genres, moods) driving recommendations.
- **Facial recognition (Eigenfaces):** PCA of face image matrices reduces the space via SVD; each face is projected onto the top singular vectors (eigenfaces), and nearest-neighbor classification operates in this low-dimensional space.

---

## Euler's Method

**Concept ID:** `math.num.euler-method`

Euler's method approximates ODE solutions by y_{n+1} = y_n + h·f(t_n, y_n). It is first-order accurate (global error O(h)) and conditionally stable. It connects discrete iteration to continuous ODE theory.

### Key Ideas

- **Euler step derivation:** Taylor expand y(t+h) = y(t) + h y′(t) + O(h²) = y(t) + h f(t,y(t)) + O(h²); the Euler method truncates at first order, giving a local truncation error of O(h²) per step and global error O(h).
- **Stability function:** For the test equation y′ = λy, Euler gives yₙ = (1 + hλ)ⁿ y₀; stability requires |1 + hλ| ≤ 1; for Re(λ) < 0, this gives the stability region −2 ≤ hλ ≤ 0 on the real axis — the method is conditionally stable.
- **Global vs. local error:** Local truncation error (LTE) = O(h²) per step; accumulation over 1/h steps gives global error O(h) — a general pattern: global order = local order − 1 for one-step methods.
- **Geometric interpretation:** Each Euler step follows the tangent to the solution curve at the current point; the method "drifts" because the tangent direction changes, but with smaller h the drift diminishes.
- **Backward (implicit) Euler:** yₙ₊₁ = yₙ + h f(tₙ₊₁, yₙ₊₁); stability region is the complement of a disk (unconditionally stable for Re(λ) < 0); requires solving a nonlinear equation per step but handles stiff ODEs.

### Common Misconceptions

- **Misconception:** Euler's method with a small h is always accurate. **Correction:** Accuracy depends on the problem's stiffness; for stiff ODEs (large |Re(λ)|), even a tiny h may be required for stability (not just accuracy), making Euler practically unusable — implicit methods are needed.
- **Misconception:** Global error equals local truncation error. **Correction:** LTE is O(h²) per step; global error accumulates over O(1/h) steps, giving O(h) global error (one order lower than LTE); this is the Dahlquist concept of consistency vs. convergence.
- **Misconception:** Backward Euler is always preferred over forward Euler because it is more stable. **Correction:** Backward Euler requires solving a nonlinear (or linear) equation per step; for non-stiff ODEs, forward Euler is simpler and equally accurate; the stability advantage of backward Euler only matters for stiff problems.

### Worked Example

**Problem:** Solve y′ = −2y, y(0) = 1, on [0, 1] using Euler's method with h = 0.25, and compare with the exact solution.

**Step 1 — Setup:** f(t, y) = −2y; exact y(t) = e^(−2t).

**Step 2 — Steps:** y₁ = 1 + 0.25·(−2·1) = 1 − 0.5 = 0.5; y₂ = 0.5 + 0.25·(−1) = 0.25; y₃ = 0.25 + 0.25·(−0.5) = 0.125; y₄ = 0.125 + 0.25·(−0.25) = 0.0625.

**Step 3 — Exact values:** e^(−0.5) ≈ 0.6065; e^(−1) ≈ 0.3679; e^(−1.5) ≈ 0.2231; e^(−2) ≈ 0.1353.

**Step 4 — Errors:** At t=0.25: |0.5 − 0.6065| = 0.1065; at t=1: |0.0625 − 0.1353| = 0.0728; errors are O(h) = O(0.25).

**Step 5 — Stability check:** hλ = 0.25·(−2) = −0.5; |1 + (−0.5)| = 0.5 < 1 ✓; the method is stable here.

### Practice

**Problem:** Apply Euler's method to y′ = −10y, y(0) = 1 with h = 0.3. Show that the solution oscillates and diverges (instability), and find the maximum stable h.

### Assessment

**Question:** Derive the global error O(h) for Euler's method from its local truncation error O(h²).

**Answer:** LTE per step ≤ C h²; over N = T/h steps, errors can accumulate by a factor eᴸᵀ (Gronwall's inequality, where L is the Lipschitz constant of f); total global error ≤ C h² · (T/h) · eᴸᵀ = C T eᴸᵀ · h = O(h).

**Rubric:** Full credit for: LTE = O(h²), N = T/h steps, Gronwall accumulation factor, result O(h). Partial credit for stating "errors add up" without the Gronwall step.

### Real-World Applications

- **Population dynamics:** Simple Lotka-Volterra predator-prey equations are solved by Euler's method in introductory simulations; the error analysis explains why long-time simulations diverge from biological reality unless h is small or a higher-order method is used.
- **Game physics engines:** Many real-time physics engines (Unity, Unreal) use symplectic Euler (a slight modification) for rigid body dynamics because it preserves energy approximately and is computationally cheap per frame.

---

## Runge-Kutta Methods

**Concept ID:** `math.num.runge-kutta`

Runge-Kutta methods achieve high accuracy by evaluating f at multiple stages within each step. RK4 (4 evaluations per step, O(h⁴) global error) is the workhorse; adaptive Runge-Kutta (Dormand-Prince, Fehlberg) embed a lower-order estimate for error control.

### Key Ideas

- **s-stage RK framework:** An s-stage RK method computes k₁ = f(tₙ, yₙ), k₂ = f(tₙ + c₂h, yₙ + h a₂₁k₁), …, kₛ = f(…); then yₙ₊₁ = yₙ + h Σ bᵢ kᵢ; the coefficients (Butcher tableau a, b, c) determine the order.
- **RK4 classic:** k₁ = hf(tₙ, yₙ); k₂ = hf(tₙ + h/2, yₙ + k₁/2); k₃ = hf(tₙ + h/2, yₙ + k₂/2); k₄ = hf(tₙ + h, yₙ + k₃); yₙ₊₁ = yₙ + (k₁ + 2k₂ + 2k₃ + k₄)/6; achieves fourth-order (O(h⁴) global) with 4 function evaluations.
- **Order conditions:** For an RK method of order p, the Butcher tableau coefficients must satisfy a set of algebraic equations (Rooted Tree theory — B-series); for order 5, 17 conditions are needed — beyond order 4 the number of stages grows faster than the order.
- **Embedded pairs and adaptive step control:** Dormand-Prince (DOPRI5) computes a 4th and 5th-order estimate with the same f evaluations; their difference estimates the local error; the step h is scaled: hₙₑₓₜ = h · (tol / err)^(1/5) — doubling accuracy costs less than doubling function evaluations.
- **Stability regions:** Explicit RK methods have bounded stability regions; RK4's region includes part of the left half-plane (stable for Reλ < 0 within bounds); for stiff problems implicit RK (e.g., Gauss-Legendre) with unbounded stability regions is needed.

### Common Misconceptions

- **Misconception:** RK4 is always the best single-step method. **Correction:** For smooth non-stiff ODEs, RK4 is excellent; for stiff problems it has a limited stability region requiring tiny h (making it impractical); for highly accurate solutions, higher-order methods (RK8, Dormand-Prince) with adaptive stepping are preferred.
- **Misconception:** An s-stage explicit RK method always achieves order s. **Correction:** For s stages, the maximum achievable order is s for s ≤ 4; for s = 5 only order 4 can be guaranteed by standard explicit methods (the Butcher barriers); achieving order 5 requires 6 stages.
- **Misconception:** Reducing the step size h always improves Runge-Kutta accuracy. **Correction:** For smooth problems, error decreases as hᵖ; but for stiff problems, reducing h may be necessary for stability rather than accuracy, and the effective step is limited by stiffness, not by the desired accuracy — use implicit methods instead.

### Worked Example

**Problem:** Apply one step of RK4 to y′ = −y, y(0) = 1 with h = 1.

**Step 1 — Compute k₁:** k₁ = f(0, 1) = −1.

**Step 2 — Compute k₂:** k₂ = f(0.5, 1 + 0.5·(−1)) = f(0.5, 0.5) = −0.5.

**Step 3 — Compute k₃:** k₃ = f(0.5, 1 + 0.5·(−0.5)) = f(0.5, 0.75) = −0.75.

**Step 4 — Compute k₄:** k₄ = f(1, 1 + 1·(−0.75)) = f(1, 0.25) = −0.25.

**Step 5 — Update:** y₁ = 1 + (1/6)(−1 + 2·(−0.5) + 2·(−0.75) + (−0.25)) = 1 + (1/6)(−1 − 1 − 1.5 − 0.25) = 1 − 3.75/6 = 1 − 0.625 = 0.375; exact: e⁻¹ ≈ 0.3679; error ≈ 0.007 = O(h⁴) = O(1⁴) ≈ O(1) — large h, but confirms the O(h⁴) pattern with smaller h.

### Practice

**Problem:** Use the Dormand-Prince (DOPRI5) method to integrate the Van der Pol oscillator y″ − μ(1 − y²)y′ + y = 0 with μ = 1 on [0, 10], using adaptive step control with tol = 10⁻⁶; plot the number of function evaluations per unit time interval.

### Assessment

**Question:** Why does an explicit 5-stage Runge-Kutta method only achieve order 4, not 5 (the Butcher barrier)?

**Answer:** The order conditions (B-series, rooted tree theory) require satisfying an increasing number of algebraic equations. For order 4, s = 4 stages provide just enough free parameters; for order 5, the order conditions number 17 but an explicit 5-stage method only has 10 free parameters (aᵢⱼ, bᵢ, cᵢ with constraints); the system is overconstrained, so order 5 cannot be achieved with 5 explicit stages — 6 stages are needed.

**Rubric:** Full credit for: Butcher barrier statement, parameter count vs. order conditions, conclusion that 6 stages are needed for order 5. Partial credit for mentioning the barrier without the parameter-counting argument.

### Real-World Applications

- **Planetary orbit simulation:** NASA's HORIZONS system integrates the equations of motion of solar system bodies using high-order RK or Adams methods with adaptive stepping; achieving century-long accuracy requires O(h^8-12) error.
- **Pharmacokinetics:** Drug concentration models (compartment ODEs) are solved by adaptive RK to determine dosing schedules; the adaptive step control ensures accuracy in both fast-decay and slow-elimination phases.

---

## Stiff ODEs

**Concept ID:** `math.num.stiff-ode`

Stiff ODEs have solutions with multiple time scales; explicit methods require prohibitively small h for stability, not accuracy. Implicit methods (backward Euler, Crank-Nicolson, BDF, SDIRK) are A-stable or L-stable and handle stiffness efficiently.

### Key Ideas

- **Stiffness ratio:** A system y′ = f(t,y) is stiff at y if the Jacobian ∂f/∂y has eigenvalues with widely varying magnitudes; stiffness ratio κ = max|Re(λᵢ)|/min|Re(λᵢ)|; a stiff system requires h ≪ 1/max|Re(λ)| for stability in explicit methods, though the solution varies on the slow (1/min|Re(λ)|) scale.
- **A-stability:** A method is A-stable if its stability region contains the entire left half-plane (Re(λ) ≤ 0); backward Euler and Crank-Nicolson are A-stable, allowing h to be chosen by accuracy (not stability) for stiff systems.
- **L-stability:** An A-stable method is L-stable if R(∞) = 0 (the amplification factor for very stiff equations goes to zero); backward Euler is L-stable, Crank-Nicolson is not (R(∞) = −1, causing oscillations for very stiff problems). L-stability damps out transients without oscillation.
- **BDF methods (Gear):** Backward Differentiation Formulas of order k (k = 1..6) are implicit multistep methods popular for stiff ODEs (VODE, LSODE); BDF6 is A(α)-stable (not A-stable) but highly efficient per step.
- **SDIRK methods:** Singly Diagonally Implicit Runge-Kutta methods have a common diagonal aᵢᵢ = γ, enabling reuse of the same LU factorization for each stage solve; they are L-stable and preferred for moderately stiff systems (MATLAB ode23s).

### Common Misconceptions

- **Misconception:** Stiffness is only a problem for explicit Euler. **Correction:** All explicit methods (forward Euler, RK4, Adams-Bashforth) suffer from stiff stability restrictions; the difference is that higher-order explicit methods may need slightly larger h but still require h ≪ 1/max|Re(λ)| — the stiffness bottleneck is fundamental to explicit discretization.
- **Misconception:** Making h very small always resolves stiffness issues. **Correction:** For stiff problems, h must be O(1/max|Re(λ)|) for stability; if max|Re(λ)| = 10⁶, then h ~ 10⁻⁶, requiring 10⁶ steps per unit time — computationally prohibitive; implicit methods allow h matched to the slow time scale.
- **Misconception:** A-stable methods are always preferred over non-A-stable ones. **Correction:** A-stability is essential for stiff problems; for non-stiff problems, high-order explicit methods (RK8, Adams-Bashforth) are far cheaper per step (no linear solve) and should be preferred.

### Worked Example

**Problem:** Explain why forward Euler fails for y′ = −1000y + sin(t), y(0) = 1, and show that backward Euler succeeds with h = 0.1.

**Step 1 — Identify stiffness:** The homogeneous part y′ = −1000y has λ = −1000; the stability condition for forward Euler is |1 + hλ| ≤ 1, i.e., |1 − 1000h| ≤ 1, i.e., h ≤ 0.002.

**Step 2 — Forward Euler with h = 0.1:** amplification factor = |1 − 1000·0.1| = |1 − 100| = 99 ≫ 1; solution grows by 99× per step → diverges immediately.

**Step 3 — Backward Euler setup:** yₙ₊₁ = yₙ + h·(−1000 yₙ₊₁ + sin(tₙ₊₁)); rearranging: yₙ₊₁(1 + 1000h) = yₙ + h·sin(tₙ₊₁); yₙ₊₁ = (yₙ + h·sin(tₙ₊₁))/(1 + 1000h).

**Step 4 — Backward Euler with h = 0.1:** denominator = 1 + 100 = 101; amplification factor = 1/101 ≈ 0.0099 ≪ 1 ✓; the stiff transient is aggressively damped.

**Step 5 — Solution accuracy:** The exact slow solution ~ sin(t)/1000 varies on time scale O(1); with h = 0.1 (50× the explicit stability limit) backward Euler tracks this slow solution accurately with only 10 steps per unit time.

### Practice

**Problem:** For y′ = Ay where A = [[−1000, 999],[0, −1]], determine: (a) the stiffness ratio, (b) the maximum h for forward Euler stability, (c) a BDF2 step with h = 0.5, and (d) verify A-stability applies.

### Assessment

**Question:** Define L-stability and explain why it is preferred over A-stability for very stiff problems.

**Answer:** A method is A-stable if its stability region contains the entire left half-plane. It is L-stable if additionally R(∞) = lim_{hλ→−∞} R(hλ) = 0, where R is the stability function. For very stiff components (hλ → −∞), L-stability ensures the numerical solution damps to zero (like the exact solution), whereas A-stable-but-not-L-stable methods like Crank-Nicolson have R(∞) = −1, causing oscillations that don't reflect physical behavior.

**Rubric:** Full credit for: A-stability definition (left half-plane), L-stability adds R(∞)=0, Crank-Nicolson counter-example (R(∞) = −1, oscillations), practical consequence (spurious oscillations for stiff transients). Partial credit for defining A-stability correctly but missing L-stability or the counter-example.

### Real-World Applications

- **Chemical kinetics simulation:** Combustion and atmospheric chemistry involve reactions with rate constants spanning 12 orders of magnitude (λ ranges from 10⁻³ to 10⁹ s⁻¹); VODE/LSODE with BDF methods are the standard solvers for these extremely stiff systems.
- **Power grid stability:** Transient stability simulation of electrical grids couples fast electromagnetic dynamics (ms scale) with slow electromechanical dynamics (seconds); implicit trapezoidal or BDF methods allow time steps of tens of milliseconds while correctly capturing both scales.
