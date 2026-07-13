# Optimization

*My Tutor — Mathematics Knowledge Graph domain `math.opt`*

Level range: 4–7 · Concepts in this chapter: 16

This chapter is generated from the canonical Knowledge Graph (`graph.json`, frozen, read-only) plus authored teaching content validated against the existing `TeachingAssetSchema`. It is intended for students, teachers, and as a canonical AI teaching source.

## Concepts in this chapter

- [Unconstrained Optimization](#unconstrained-optimization)
- [Convex Function](#convex-function)
- [Convex Set](#convex-set)
- [Convex Optimization](#convex-optimization)
- [Linear Programming](#linear-programming)
- [Quadratic Programming](#quadratic-programming)
- [Semidefinite Programming](#semidefinite-programming)
- [Duality Theory](#duality-theory)
- [KKT Conditions](#kkt-conditions)
- [Lagrange Multipliers](#lagrange-multipliers)
- [Gradient Descent](#gradient-descent)
- [Stochastic Gradient Descent](#stochastic-gradient-descent)
- [Newton's Method for Optimization](#newton-s-method-for-optimization)
- [Principal Component Analysis](#principal-component-analysis)
- [Integer Programming](#integer-programming)
- [Dynamic Programming](#dynamic-programming)

---

### Unconstrained Optimization

*Concept ID: `math.opt.unconstrained-optimization` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** State and apply the first- and second-order necessary and sufficient conditions for local minima of smooth unconstrained functions, distinguish local from global minima, and recognize when convexity guarantees a unique global minimum.

Find min f(x) over x∈ℝⁿ. Necessary condition: ∇f(x*)=0. Sufficient: ∇²f(x*) positive definite (second-order condition). Local vs global optima. Functions with many local minima require global optimization.

An unconstrained optimization problem min_{x∈ℝⁿ} f(x) seeks a minimizer x* with no restrictions on x. First-order necessary condition (FONC): if x* is a local minimum and f is differentiable, then ∇f(x*) = 0 (stationary point). Second-order necessary condition (SONC): ∇²f(x*) ⪰ 0. Second-order sufficient condition (SOSC): ∇f(x*)=0 and ∇²f(x*) ≻ 0 (positive definite) implies x* is a strict local minimum. For convex f: any stationary point is a global minimum, and FONC is both necessary and sufficient for global optimality. Saddle points satisfy ∇f=0 but ∇²f is indefinite.

**Key ideas**

- FONC: ∇f(x*)=0 is necessary for a local min (the gradient vanishes). Stationary points include local minima, local maxima, and saddle points.
- SONC: ∇²f(x*) ⪰ 0 (PSD Hessian) is necessary for a local min. Violated if ∇²f has a negative eigenvalue — then there exists a descent direction.
- SOSC: ∇f(x*)=0 AND ∇²f(x*) ≻ 0 (PD Hessian) ⟹ x* is a strict local minimum. The Taylor expansion f(x*+d) ≈ f(x*) + (1/2)dᵀ∇²f(x*)d > f(x*) for small d≠0.
- Global minimum via convexity: if f is convex and ∇f(x*)=0, then x* is a global minimizer. No second-order check needed.
- Saddle point: ∇f(x*)=0 but ∇²f(x*) is indefinite (has both positive and negative eigenvalues). Critical for neural network training—most 'bad' critical points in deep learning are saddle points, not local minima.
- Existence: a continuous f on a compact set attains its minimum (extreme value theorem). On non-compact domains, infimum need not be attained (e.g., f(x)=eˣ on ℝ has inf=0 not attained).

**Common misconceptions**

- *Misconception:* Every stationary point (∇f=0) is a local minimum.
  *Correction:* Stationary points include local maxima and saddle points. f(x,y)=x²−y² has ∇f=(2x,−2y)=0 at (0,0), but (0,0) is a saddle point: f is decreasing in the y-direction and increasing in the x-direction.
- *Misconception:* The FONC ∇f(x*)=0 is sufficient for a local minimum.
  *Correction:* FONC is necessary but not sufficient. Both local minima and saddle points satisfy ∇f=0. To confirm a local minimum, you need the SOSC (positive definite Hessian).
- *Misconception:* A function with a unique stationary point always has a global minimum at that point.
  *Correction:* False. f(x)=x³ has the unique stationary point at x=0 (an inflection, not a minimum). f(x)=x−x³/3 has a unique local max and no global minimum on ℝ. The unique stationary point being a global min requires convexity (or specific additional structure).

**Visual teaching opportunities**

- Plot f(x)=x³−3x: two stationary points at x=±1. At x=−1: f''=6(−1)−6=−6<0 → local max. At x=1: f''=6>0 → local min. No global min (f→−∞ as x→−∞).
- 3D: f(x,y)=x²−y² (saddle at origin). Draw gradient arrows pointing away from (0,0) in the ±x directions and toward (0,0) in the ±y directions. Hessian [[2,0],[0,−2]] has eigenvalues ±2 (indefinite).
- Convex bowl f(x,y)=x²+y²: unique global minimum at (0,0), ∇²f=2I ≻ 0 everywhere. Contrast with f(x,y)=x⁴−x²+y² which has two local minima and one saddle.

**Worked example**

*Problem:* Find and classify all stationary points of f(x,y) = x³ − 3xy + y³.

1. Compute gradient: ∇f = (∂f/∂x, ∂f/∂y) = (3x²−3y, 3y²−3x). Set ∇f=0: 3x²−3y=0 and 3y²−3x=0, giving y=x² and x=y². Substitute: x=(x²)²=x⁴, so x⁴−x=0, x(x³−1)=0. Solutions: x=0 (→y=0) and x=1 (→y=1).
2. Stationary points: (0,0) and (1,1).
3. Hessian: ∇²f = [[6x, −3],[−3, 6y]].
4. At (0,0): ∇²f = [[0,−3],[−3,0]]. Eigenvalues: λ satisfies λ²−9=0, so λ=±3. Indefinite → (0,0) is a saddle point. ✓
5. At (1,1): ∇²f = [[6,−3],[−3,6]]. det=36−9=27>0, trace=12>0. Eigenvalues: both positive (det>0, trace>0). Positive definite → (1,1) is a strict local minimum. f(1,1)=1−3+1=−1. ✓

*Answer:* (0,0) is a saddle point (Hessian indefinite); (1,1) is a strict local minimum with f(1,1)=−1 (Hessian PD, eigenvalues 3 and 9). There is no global minimum (f→−∞ along certain directions).

**Real-world intuition**

- Least squares regression: minimize ||Ax−b||² — unconstrained, convex (Hessian=2AᵀA⪰0), global min at x*=(AᵀA)⁻¹Aᵀb (when AᵀA invertible).
- Maximum likelihood estimation: maximizing log-likelihood is equivalent to minimizing the negative log-likelihood (a convex function for exponential family distributions), guaranteeing a unique global solution.
- Physics: potential energy minimization — the equilibrium configuration of a physical system is an unconstrained minimum of the potential energy, found by ∇U=0.

**Practice progression**

*Fluency:*
  - F
  - i
  - n
  - d
  -  
  - a
  - l
  - l
  -  
  - s
  - t
  - a
  - t
  - i
  - o
  - n
  - a
  - r
  - y
  -  
  - p
  - o
  - i
  - n
  - t
  - s
  -  
  - o
  - f
  - :
  -  
  - (
  - a
  - )
  -  
  - f
  - (
  - x
  - )
  - =
  - x
  - ⁴
  - −
  - 4
  - x
  -  
  - (
  - b
  - )
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - x
  - ²
  - +
  - 4
  - x
  - y
  - +
  - y
  - ²
  -  
  - (
  - c
  - )
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - x
  - ²
  - +
  - y
  - ²
  - +
  - x
  - y
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - F
  - O
  - N
  - C
  - :
  -  
  - i
  - f
  -  
  - x
  - *
  -  
  - i
  - s
  -  
  - a
  -  
  - l
  - o
  - c
  - a
  - l
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  -  
  - o
  - f
  -  
  - d
  - i
  - f
  - f
  - e
  - r
  - e
  - n
  - t
  - i
  - a
  - b
  - l
  - e
  -  
  - f
  - ,
  -  
  - t
  - h
  - e
  - n
  -  
  - ∇
  - f
  - (
  - x
  - *
  - )
  - =
  - 0
  - .
  -  
  - (
  - U
  - s
  - e
  -  
  - a
  -  
  - d
  - i
  - r
  - e
  - c
  - t
  - i
  - o
  - n
  - a
  - l
  -  
  - d
  - e
  - r
  - i
  - v
  - a
  - t
  - i
  - v
  - e
  -  
  - a
  - r
  - g
  - u
  - m
  - e
  - n
  - t
  - :
  -  
  - f
  - o
  - r
  -  
  - a
  - n
  - y
  -  
  - d
  - i
  - r
  - e
  - c
  - t
  - i
  - o
  - n
  -  
  - d
  - ,
  -  
  - t
  - h
  - e
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  -  
  - g
  - (
  - t
  - )
  - =
  - f
  - (
  - x
  - *
  - +
  - t
  - d
  - )
  -  
  - h
  - a
  - s
  -  
  - g
  - '
  - (
  - 0
  - )
  - =
  - ∇
  - f
  - (
  - x
  - *
  - )
  - ᵀ
  - d
  - =
  - 0
  -  
  - f
  - o
  - r
  -  
  - a
  - l
  - l
  -  
  - d
  - ,
  -  
  - h
  - e
  - n
  - c
  - e
  -  
  - ∇
  - f
  - (
  - x
  - *
  - )
  - =
  - 0
  - .
  - )
*Problem solving:*
  - C
  - l
  - a
  - s
  - s
  - i
  - f
  - y
  -  
  - a
  - l
  - l
  -  
  - c
  - r
  - i
  - t
  - i
  - c
  - a
  - l
  -  
  - p
  - o
  - i
  - n
  - t
  - s
  -  
  - o
  - f
  -  
  - f
  - (
  - x
  - ,
  - y
  - ,
  - z
  - )
  - =
  - x
  - ²
  - +
  - y
  - ²
  - +
  - z
  - ²
  - −
  - 2
  - x
  - y
  - −
  - 2
  - y
  - z
  - .
  -  
  - F
  - i
  - n
  - d
  -  
  - t
  - h
  - e
  -  
  - g
  - l
  - o
  - b
  - a
  - l
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  -  
  - i
  - f
  -  
  - i
  - t
  -  
  - e
  - x
  - i
  - s
  - t
  - s
  - .

**Assessment objectives**

*MCQ:* For f(x,y)=x²+y²−2x−4y+5, the minimum value is: (A) 0 (B) 5 (C) −5 (D) completing the square: f=(x−1)²+(y−2)²→min=0. Answer: A.
*Short answer:* State the first-order necessary condition and second-order sufficient condition for a local minimum of f:ℝⁿ→ℝ. Give an example of a point satisfying FONC but not SOSC.
*Proof/derivation:* Prove the second-order sufficient condition: if ∇f(x*)=0 and ∇²f(x*)≻0, then x* is a strict local minimum. (Use the Taylor expansion f(x*+d)=f(x*)+(1/2)dᵀ∇²f(x*)d+o(|d|²) and PD of the Hessian.)

**Intuition**

At a minimum of a smooth function, three things are true: the gradient is zero (you cannot improve in any direction), the function curves upward in all directions (positive definite Hessian), and you are genuinely at the bottom of a bowl. The FONC tells you where to look (all stationary points); the SOSC tells you which of those are local minima (positive curvature); convexity tells you the local minimum is THE global minimum. Saddle points satisfy FONC but not SOSC — they are the nemesis of naive gradient descent in non-convex problems like deep learning.

**Historical context**

The first-order conditions for optima were known to Newton and Leibniz. The second-order conditions were formalized by Lagrange and Jacobi. The modern treatment in terms of gradient and Hessian was unified in the 19th century. The significance of saddle points in high-dimensional optimization was recognized computationally only in the 2010s (Dauphin et al., 2014), showing that in large neural networks, saddle points dominate over local minima as obstacles to convergence.

**Connections**

Unconstrained optimization is the foundation of gradient methods (math.opt.gradient-methods) and Newton's method (math.opt.newton-optimization). Constrained optimization (math.opt.lagrange-multipliers, math.opt.kkt) reduces constrained problems to unconstrained problems on extended domains.

**Common errors (deep dive)**

The most common error in classification: students check only the determinant (2D case) and forget to verify that the trace is positive. Rule: for a 2×2 Hessian H, det(H)>0 and tr(H)>0 → PD (local min); det(H)>0 and tr(H)<0 → ND (local max); det(H)<0 → indefinite (saddle). Drill: at each stationary point, always compute both det and tr.

**Exam strategy**

For optimization problems: (1) compute ∇f and set to zero to find stationary points, (2) compute ∇²f at each stationary point, (3) classify using the eigenvalue signs or (in 2D) the det-trace criterion. If f is known to be convex (positive definite Hessian everywhere), skip the classification step—any stationary point is the global minimum.

**Socratic questions**

- State the FONC and SOSC. Give examples of functions where FONC holds but SOSC fails at the stationary point, yet the point IS a minimum.
- Why are saddle points particularly problematic for gradient descent in high dimensions? How does stochastic gradient descent help escape them?
- For f(x,y)=x⁴+y⁴, verify that (0,0) is a global minimum even though the Hessian at (0,0) is [[0,0],[0,0]] (not PD). What does this tell you about the SOSC?
- Prove that if f is strictly convex, it has at most one global minimum. What if f is merely convex (not strictly)?

**Prerequisite graph**

- Requires: math.calc.critical-points, math.calc.concavity
- Unlocks (future prerequisite links): math.opt.gradient-methods, math.opt.convex-optimization
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student cannot compute the Hessian of a multivariate function, review partial derivatives and matrix calculus before proceeding.
- If the student is unfamiliar with positive definite matrices, review math.linalg.positive-definite.

**Spaced repetition / revision guidance**



---

### Convex Function

*Concept ID: `math.opt.convex-function` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Define convex functions via the Jensen inequality, characterize them using first- and second-order conditions, and apply convexity to guarantee that local minima are global minima in optimization problems.

f is convex iff f(λx+(1−λ)y) ≤ λf(x)+(1−λ)f(y). Equivalent: ∇²f ⪰ 0. Jensen's inequality: f(E[X]) ≤ E[f(X)]. Every local minimum of a convex function is global. Key property underlying convex optimization.

A function f: C → ℝ (C ⊆ ℝⁿ convex) is convex if for all x,y ∈ C and θ ∈ [0,1]: f(θx+(1−θ)y) ≤ θf(x)+(1−θ)f(y). Geometrically, the chord between any two points on the graph lies above or on the graph. Key characterizations: (1st order) f is convex iff f(y) ≥ f(x)+∇f(x)ᵀ(y−x) for all x,y (the tangent plane is a global lower bound); (2nd order) for twice differentiable f, f is convex iff ∇²f(x) ⪰ 0 for all x. Crucially: for convex f on a convex domain, every local minimum is a global minimum.

**Key ideas**

- Jensen's inequality: f convex ⟹ f(∑θᵢxᵢ) ≤ ∑θᵢf(xᵢ) for any convex combination (θᵢ≥0, ∑θᵢ=1). Jensen is the multi-point generalization of the two-point definition.
- First-order characterization: f differentiable and convex iff f(y) ≥ f(x)+∇f(x)ᵀ(y−x) for all x,y. The gradient at x gives a global linear underestimator — this underlies gradient descent correctness.
- Second-order characterization: f twice differentiable and convex iff ∇²f(x) ⪰ 0 everywhere. For univariate f: f''(x) ≥ 0 everywhere (graph 'curves upward').
- Strictly convex: f(θx+(1−θ)y) < θf(x)+(1−θ)f(y) for x≠y and θ∈(0,1). Strict convexity ⟹ at most one global minimum.
- Epigraph characterization: f is convex iff its epigraph epi(f) = {(x,t): f(x)≤t} is a convex set. This links function convexity to set convexity.
- Operations preserving convexity: non-negative linear combinations, pointwise supremum (sup of convex functions is convex), composition with affine map, restriction to a convex domain.

**Common misconceptions**

- *Misconception:* A function with f''(x)≥0 everywhere is strictly convex.
  *Correction:* f''(x)≥0 implies convexity (not strict). f(x)=x is convex (f''=0) but not strictly convex—it is linear. Strict convexity requires f''(x)>0 everywhere (for univariate twice-differentiable f), but beware: f''(x)>0 for all x≠0 but f''(0)=0 can still be strictly convex (e.g., f(x)=x⁴).
- *Misconception:* The sum of two convex functions is convex.
  *Correction:* This is TRUE (it is a basic rule for preserving convexity). A common error is the CONVERSE: students assume that if f+g is convex then both f and g are convex. Counterexample: f(x)=x², g(x)=−x²+1; f is convex, g is concave, but f+g=1 (constant, convex). The sum rule only goes one direction.
- *Misconception:* If f has no local minima except the global minimum, f is convex.
  *Correction:* This is false. f(x)=x³ has no local minimum at all (no stationary points except the inflection at 0), but it is neither convex nor concave. The correct statement is the converse: if f is convex, then every local minimum is the global minimum.

**Visual teaching opportunities**

- Graph of a convex function: f(x)=x², f(x)=eˣ, f(x)=|x|. For each, draw a chord between two points—the chord lies above the graph (epigraph is above). Draw the tangent line at x=1 for f(x)=x²: it lies below the graph everywhere (first-order condition).
- Non-convex example: f(x)=sin(x) on [0,2π]—draw a chord from (0,0) to (π,0) passing above the graph in some regions and below in others.
- 2D: f(x,y)=x²+y² (bowl shape, convex) vs. f(x,y)=x²−y² (saddle, neither convex nor concave). Color the epigraph for the convex case.

**Worked example**

*Problem:* Prove that f(x) = eˣ is convex on ℝ and use the first-order characterization to derive a fundamental inequality.

1. Second-order test: f'(x) = eˣ, f''(x) = eˣ > 0 for all x ∈ ℝ. Since f''(x) > 0 everywhere, f is (strictly) convex. ✓
2. First-order characterization: since f is convex and differentiable, f(y) ≥ f(x) + f'(x)(y−x) = eˣ + eˣ(y−x) = eˣ(1+y−x) for all x,y ∈ ℝ.
3. Set x = 0: f(y) = eʸ ≥ e⁰(1+y−0) = 1+y. So eʸ ≥ 1+y for all y ∈ ℝ, with equality iff y=0. ✓ (This is a classical inequality derivable directly from convexity.)
4. Jensen's inequality: for weights θ₁,…,θₙ ≥ 0 with ∑θᵢ=1 and values x₁,…,xₙ ∈ ℝ: exp(∑θᵢxᵢ) ≤ ∑θᵢexp(xᵢ). With equal weights θᵢ=1/n: exp((x₁+…+xₙ)/n) ≤ (eˣ¹+…+eˣⁿ)/n.
5. This gives the AM-GM inequality: for aᵢ = eˣⁱ > 0, (a₁+…+aₙ)/n ≥ (a₁·…·aₙ)^(1/n) — the arithmetic mean is at least the geometric mean. ✓

*Answer:* f(x)=eˣ is strictly convex (f''>0). The first-order condition gives eʸ ≥ 1+y for all y. Jensen's inequality for eˣ with equal weights gives the arithmetic-geometric mean inequality.

**Real-world intuition**

- Loss functions in machine learning: squared loss, logistic loss, cross-entropy are all convex — guaranteeing that gradient descent converges to a global minimum in logistic regression.
- The log-sum-exp function log(∑eˣⁱ) is convex — it is the smooth approximation to max(xᵢ) used in neural network softmax layers and log-domain computations.
- Risk measures in finance: the expected shortfall (CVaR) is a convex risk measure, enabling convex portfolio optimization with downside-risk constraints.

**Practice progression**

*Fluency:*
  - C
  - l
  - a
  - s
  - s
  - i
  - f
  - y
  -  
  - a
  - s
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - ,
  -  
  - c
  - o
  - n
  - c
  - a
  - v
  - e
  - ,
  -  
  - o
  - r
  -  
  - n
  - e
  - i
  - t
  - h
  - e
  - r
  - :
  -  
  - (
  - a
  - )
  -  
  - f
  - (
  - x
  - )
  - =
  - x
  - ⁴
  -  
  - (
  - b
  - )
  -  
  - f
  - (
  - x
  - )
  - =
  - l
  - o
  - g
  - (
  - x
  - )
  -  
  - o
  - n
  -  
  - x
  - >
  - 0
  -  
  - (
  - c
  - )
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - x
  - ²
  - +
  - x
  - y
  - +
  - y
  - ²
  -  
  - (
  - d
  - )
  -  
  - f
  - (
  - x
  - )
  - =
  - |
  - x
  - |
  - ²
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - f
  - i
  - r
  - s
  - t
  - -
  - o
  - r
  - d
  - e
  - r
  -  
  - c
  - h
  - a
  - r
  - a
  - c
  - t
  - e
  - r
  - i
  - z
  - a
  - t
  - i
  - o
  - n
  - :
  -  
  - f
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - i
  - f
  - f
  -  
  - f
  - (
  - y
  - )
  -  
  - ≥
  -  
  - f
  - (
  - x
  - )
  - +
  - ∇
  - f
  - (
  - x
  - )
  - ᵀ
  - (
  - y
  - −
  - x
  - )
  -  
  - f
  - o
  - r
  -  
  - a
  - l
  - l
  -  
  - x
  - ,
  - y
  -  
  - (
  - f
  - o
  - r
  -  
  - d
  - i
  - f
  - f
  - e
  - r
  - e
  - n
  - t
  - i
  - a
  - b
  - l
  - e
  -  
  - f
  - )
  - .
  -  
  - U
  - s
  - e
  -  
  - t
  - h
  - i
  - s
  -  
  - t
  - o
  -  
  - s
  - h
  - o
  - w
  -  
  - t
  - h
  - a
  - t
  -  
  - a
  -  
  - s
  - t
  - a
  - t
  - i
  - o
  - n
  - a
  - r
  - y
  -  
  - p
  - o
  - i
  - n
  - t
  -  
  - o
  - f
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  -  
  - i
  - s
  -  
  - a
  -  
  - g
  - l
  - o
  - b
  - a
  - l
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  - .
*Problem solving:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - f
  - (
  - x
  - )
  - =
  - l
  - o
  - g
  - (
  - 1
  - +
  - e
  - ˣ
  - )
  -  
  - (
  - s
  - o
  - f
  - t
  - p
  - l
  - u
  - s
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  - )
  -  
  - i
  - s
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - .
  -  
  - C
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - f
  - '
  - '
  - (
  - x
  - )
  -  
  - a
  - n
  - d
  -  
  - v
  - e
  - r
  - i
  - f
  - y
  -  
  - t
  - h
  - e
  -  
  - s
  - e
  - c
  - o
  - n
  - d
  - -
  - o
  - r
  - d
  - e
  - r
  -  
  - c
  - o
  - n
  - d
  - i
  - t
  - i
  - o
  - n
  - .
  -  
  - S
  - h
  - o
  - w
  -  
  - t
  - h
  - a
  - t
  -  
  - f
  -  
  - i
  - s
  -  
  - d
  - i
  - f
  - f
  - e
  - r
  - e
  - n
  - t
  - i
  - a
  - b
  - l
  - e
  -  
  - e
  - v
  - e
  - r
  - y
  - w
  - h
  - e
  - r
  - e
  -  
  - (
  - u
  - n
  - l
  - i
  - k
  - e
  -  
  - |
  - x
  - |
  - )
  -  
  - a
  - n
  - d
  -  
  - a
  - p
  - p
  - r
  - o
  - a
  - c
  - h
  - e
  - s
  -  
  - |
  - x
  - |
  -  
  - f
  - o
  - r
  -  
  - l
  - a
  - r
  - g
  - e
  -  
  - |
  - x
  - |
  - .

**Assessment objectives**

*MCQ:* Which condition guarantees that a differentiable function f:ℝⁿ→ℝ is convex? (A) f has a unique stationary point (B) ∇²f(x)⪰0 for all x (C) f is bounded below (D) f has no saddle points. Answer: B.
*Short answer:* State Jensen's inequality for convex functions. Use it to prove that for positive reals a,b: (a+b)/2 ≥ √(ab) (AM-GM for n=2).
*Proof/derivation:* Prove that if f:ℝⁿ→ℝ is convex and x* is a local minimum, then x* is a global minimum. (Use the definition of convexity to show f(x*)≤f(x) for all x.)

**Intuition**

A function is convex if its graph 'curves upward' — any chord you draw between two points on the graph lies above or on the graph. This means the function value at a midpoint is at most the average of the values at the endpoints. The power of convexity in optimization comes from the first-order condition: the tangent hyperplane at any point is a global lower bound for f. This means gradient information is globally informative — you can trust that moving downhill always gets closer to the global minimum, never into a local trap.

**Historical context**

Jensen's inequality was proved by Johan Jensen in 1906 and immediately recognized as a unifying framework for many classical inequalities (AM-GM, Cauchy-Schwarz in disguise). The systematic study of convex functions was developed by Fenchel (1949) and Rockafellar (1970), whose book 'Convex Analysis' remains the standard reference. The connection between convex functions and global optimality was exploited by Dantzig (LP, 1947) and later extended to general convex programming by Kuhn and Tucker (1951).

**Connections**

Convex functions are the objective functions of convex optimization (math.opt.convex-optimization). The first-order characterization is the basis of gradient descent (math.opt.gradient-methods). The epigraph characterization connects functions to sets (math.opt.convex-set). Conjugate functions (Fenchel conjugate f*(y) = sup_x(yᵀx−f(x))) are the foundation of duality theory (math.opt.duality).

**Common errors (deep dive)**

The most common error is confusing convex functions (graph curves upward) with concave functions (graph curves downward). In optimization, we usually minimize convex functions or maximize concave ones. Drill: log(x) is concave (f''=-1/x²<0), not convex — maximizing a concave function is equivalent to minimizing a convex function. Also: the product of two convex functions is NOT always convex (e.g., f(x)=x, g(x)=x are both convex but fg=x² is convex; however f(x)=x and g(x)=x² gives fg=x³, which is neither).

**Exam strategy**

For convexity proofs: (1) if f is differentiable, compute f'' (univariate) or ∇²f (multivariate) and check PSD; (2) if f is not differentiable, use the definition directly or decompose as a sum/max of known convex functions. For problems involving 'every local min is a global min': invoke convexity of f plus convexity of domain.

**Socratic questions**

- Prove that the maximum of two convex functions is convex. Is the minimum of two convex functions always convex?
- The Hessian of f(x,y)=x²+xy+y² at any point is [[2,1],[1,2]]. Compute its eigenvalues and verify PSD. Conclude f is convex.
- Why does convexity of f guarantee that every local minimum is a global minimum? Write out the proof using the definition.
- Is the composition g(f(x)) of two convex functions always convex? State the exact conditions under which it is.

**Prerequisite graph**

- Requires: math.calc.concavity
- Unlocks (future prerequisite links): math.opt.convex-optimization
- Cross-topic connections (graph cross-links): math.linalg.positive-definite

**Teaching hints — review triggers**

- If the student cannot compute the Hessian ∇²f, review multivariable calculus (partial derivatives, Hessian matrix) before the second-order characterization.
- If the student is unfamiliar with positive semidefiniteness, review math.linalg.positive-definite before proceeding.

**Spaced repetition / revision guidance**



---

### Convex Set

*Concept ID: `math.opt.convex-set` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Define a convex set via the line-segment property, verify convexity for standard examples (balls, polyhedra, cones), prove that intersections of convex sets are convex, and apply convex-set theory as the foundational geometry of optimization feasible regions.

A set C is convex iff for any x,y∈C and λ∈[0,1]: λx+(1−λ)y∈C. Convex hull: smallest convex set containing S. Examples: halfspaces, polyhedra, balls, simplices. Intersection of convex sets is convex.

A set C ⊆ ℝⁿ is convex if for every x,y ∈ C and every θ ∈ [0,1], the point θx + (1−θ)y ∈ C. Equivalently, C contains the entire line segment between any two of its points. Convex sets are the geometry of optimization: the feasible region of a convex optimization problem is a convex set, and this property is what makes the problem tractable. Key examples: every subspace, affine subspace, halfspace {x : aᵀx ≤ b}, and polyhedron {x : Ax ≤ b} are convex. The intersection of any collection of convex sets is convex. The convex hull conv(S) of a set S is the smallest convex set containing S.

**Key ideas**

- Definition: C convex iff ∀ x,y ∈ C, ∀ θ ∈ [0,1]: θx+(1−θ)y ∈ C — the line segment between any two points stays in C.
- Intersection preserves convexity: if Cα is convex for all α, then ∩α Cα is convex. Proof: if x,y ∈ ∩Cα, then x,y ∈ Cα for all α, so θx+(1−θ)y ∈ Cα for all α.
- Halfspace {x : aᵀx ≤ b} is convex: if aᵀx≤b and aᵀy≤b, then aᵀ(θx+(1−θ)y)=θaᵀx+(1−θ)aᵀy≤θb+(1−θ)b=b ✓.
- Convex hull conv(S): smallest convex set containing S = set of all convex combinations ∑θᵢxᵢ with xᵢ∈S, θᵢ≥0, ∑θᵢ=1.
- Non-convex examples: annulus (ring), non-star-shaped regions, the set S¹, any discrete set with more than one point.
- Projection onto a convex set: for any x, the nearest point P_C(x) ∈ C exists and is unique (in a Hilbert space). This is the fundamental operation in projected gradient methods.

**Common misconceptions**

- *Misconception:* A convex set must be bounded or compact.
  *Correction:* Halfspaces, hyperplanes, subspaces, and all of ℝⁿ are convex but unbounded. Convexity is about the line-segment property, not boundedness.
- *Misconception:* The union of two convex sets is convex.
  *Correction:* False. The union of two disjoint line segments (each convex) is not convex—the line segment between a point in one and a point in the other leaves the union. Only convex combinations within the union are guaranteed; the union itself need not contain all connecting line segments.
- *Misconception:* A set is convex iff it has no 'holes' or 'indentations'.
  *Correction:* An annulus {x : 1 ≤ |x| ≤ 2} has no holes in the colloquial sense but is not convex (a line segment between two antipodal points crosses the inner hole). The precise definition is the line-segment property, not a visual criterion.

**Visual teaching opportunities**

- Draw five sets in ℝ²: a filled circle (convex), a crescent/annulus (not convex), a square (convex), a star shape (not convex), and a halfplane (convex). For each non-convex set, find two points whose connecting segment exits the set.
- Intersection: show two convex ellipses overlapping; their intersection is convex. Show how a polyhedron is an intersection of halfspaces.
- Convex hull: show a set of 6 points in ℝ² and draw their convex hull as the tightest polygon containing all points.

**Worked example**

*Problem:* Prove that the positive semidefinite cone S₊ⁿ = {X ∈ Sⁿ : X ⪰ 0} (symmetric matrices with non-negative eigenvalues) is a convex set.

1. Let X, Y ∈ S₊ⁿ and θ ∈ [0,1]. We must show Z = θX + (1−θ)Y ∈ S₊ⁿ, i.e., that Z is symmetric and positive semidefinite.
2. Symmetry: Z = θX + (1−θ)Y is a linear combination of symmetric matrices, hence symmetric. ✓
3. Positive semidefiniteness: For any vector v ∈ ℝⁿ, compute vᵀZv = θ(vᵀXv) + (1−θ)(vᵀYv). Since X ⪰ 0, vᵀXv ≥ 0. Since Y ⪰ 0, vᵀYv ≥ 0. Since θ ≥ 0 and 1−θ ≥ 0, we get vᵀZv ≥ 0 for all v. ✓
4. Therefore Z ∈ S₊ⁿ, proving S₊ⁿ is convex.
5. Geometric interpretation: S₊ⁿ is a cone (if X ∈ S₊ⁿ and α ≥ 0, then αX ∈ S₊ⁿ). It is convex because the positive-semidefinite property is preserved by non-negative linear combinations — it is defined by infinitely many linear inequalities vᵀXv ≥ 0, one for each unit vector v.

*Answer:* S₊ⁿ is convex because vᵀ(θX+(1−θ)Y)v = θ(vᵀXv)+(1−θ)(vᵀYv) ≥ 0 for all v whenever X,Y ⪰ 0 and θ ∈ [0,1]. It is an intersection of infinitely many halfspaces in the space of symmetric matrices.

**Real-world intuition**

- Feasible regions of linear programs are polyhedra (intersections of halfspaces)—convex, enabling the simplex method to find global optima.
- Portfolio optimization: the set of valid portfolio weights (∑wᵢ=1, wᵢ≥0) is the simplex—a convex set ensuring no extrapolation beyond feasible allocations.
- The PSD cone S₊ⁿ is the feasible set of semidefinite programming, used in control theory (Lyapunov stability), signal processing, and combinatorial relaxations.

**Practice progression**

*Fluency:*
  - D
  - e
  - t
  - e
  - r
  - m
  - i
  - n
  - e
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - i
  - t
  - y
  - :
  -  
  - (
  - a
  - )
  -  
  - {
  - (
  - x
  - ,
  - y
  - )
  - :
  -  
  - x
  - ²
  - +
  - y
  - ²
  - ≤
  - 1
  - }
  -  
  - (
  - b
  - )
  -  
  - {
  - (
  - x
  - ,
  - y
  - )
  - :
  -  
  - x
  - ²
  - +
  - y
  - ²
  - ≥
  - 1
  - }
  -  
  - (
  - c
  - )
  -  
  - {
  - (
  - x
  - ,
  - y
  - )
  - :
  -  
  - |
  - x
  - |
  - +
  - |
  - y
  - |
  - ≤
  - 1
  - }
  -  
  - (
  - d
  - )
  -  
  - {
  - (
  - x
  - ,
  - y
  - ,
  - z
  - )
  - :
  -  
  - x
  - +
  - 2
  - y
  - +
  - 3
  - z
  - ≤
  - 6
  - ,
  -  
  - x
  - ,
  - y
  - ,
  - z
  - ≥
  - 0
  - }
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - i
  - m
  - a
  - g
  - e
  -  
  - o
  - f
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - s
  - e
  - t
  -  
  - u
  - n
  - d
  - e
  - r
  -  
  - a
  -  
  - l
  - i
  - n
  - e
  - a
  - r
  -  
  - m
  - a
  - p
  -  
  - i
  - s
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - .
  -  
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - p
  - r
  - e
  - i
  - m
  - a
  - g
  - e
  -  
  - o
  - f
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - s
  - e
  - t
  -  
  - u
  - n
  - d
  - e
  - r
  -  
  - a
  - n
  -  
  - a
  - f
  - f
  - i
  - n
  - e
  -  
  - m
  - a
  - p
  -  
  - i
  - s
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - .
*Problem solving:*
  - S
  - h
  - o
  - w
  -  
  - t
  - h
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - s
  - e
  - t
  -  
  - o
  - f
  -  
  - p
  - r
  - o
  - b
  - a
  - b
  - i
  - l
  - i
  - t
  - y
  -  
  - d
  - i
  - s
  - t
  - r
  - i
  - b
  - u
  - t
  - i
  - o
  - n
  - s
  -  
  - o
  - n
  -  
  - {
  - 1
  - ,
  - …
  - ,
  - n
  - }
  -  
  - (
  - t
  - h
  - e
  -  
  - s
  - t
  - a
  - n
  - d
  - a
  - r
  - d
  -  
  - s
  - i
  - m
  - p
  - l
  - e
  - x
  -  
  - Δ
  - ⁿ
  - ⁻
  - ¹
  -  
  - =
  -  
  - {
  - p
  -  
  - ∈
  -  
  - ℝ
  - ⁿ
  - :
  -  
  - p
  - ᵢ
  - ≥
  - 0
  - ,
  -  
  - ∑
  - p
  - ᵢ
  - =
  - 1
  - }
  - )
  -  
  - i
  - s
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - s
  - e
  - t
  - .
  -  
  - W
  - h
  - a
  - t
  -  
  - i
  - s
  -  
  - i
  - t
  - s
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - h
  - u
  - l
  - l
  - ?

**Assessment objectives**

*MCQ:* Which of the following is a convex set in ℝ²? (A) {(x,y): x²−y²≤1} (B) {(x,y): |x|+|y|≤1} (C) {(x,y): xy≥1, x>0} (D) {(x,y): x²+y²=1}. Answer: B.
*Short answer:* Define a convex set and prove that the intersection of two convex sets is convex.
*Proof/derivation:* Prove that any halfspace {x∈ℝⁿ: aᵀx≤b} is convex. Deduce that any polyhedron P={x: Ax≤b} is convex (it is an intersection of finitely many halfspaces).

**Intuition**

A set is convex if, standing anywhere inside it, you can see every other point directly—no obstruction, no exit from the set, just a straight line. This is exactly the line-segment property. Convex sets are 'fat' and 'inward-looking'; non-convex sets have dents or holes where the line of sight exits. In optimization, convexity of the feasible region eliminates pathological cases: any local move from an extreme point of a convex feasible region is detectable by linear probing, enabling efficient algorithms like the simplex method.

**Historical context**

The formal study of convex sets dates to Minkowski's work on convex bodies (1900), who proved the supporting hyperplane theorem. Carathéodory proved in 1911 that every point in the convex hull of a set in ℝⁿ is a convex combination of at most n+1 points. The application of convex set theory to optimization was systematized by Dantzig (LP, 1947) and Rockafellar (convex analysis, 1970).

**Connections**

Convex sets are the geometry underlying all convex optimization (math.opt.convex-optimization). The separation theorem (two disjoint convex sets can be separated by a hyperplane) is the geometric foundation of duality theory (math.opt.duality) and the KKT conditions (math.opt.kkt). In functional analysis, closed convex sets in Hilbert spaces support best-approximation projections.

**Common errors (deep dive)**

The most common error is claiming convexity based on visual appearance. Always verify via the definition: pick two specific points, form their convex combination, and check it remains in the set. For non-convexity, provide a witness: two points whose midpoint leaves the set.

**Exam strategy**

To prove a set is convex: take arbitrary x,y in the set and arbitrary θ∈[0,1], show θx+(1−θ)y satisfies the defining inequalities. To prove non-convexity: exhibit two points whose midpoint (or some θ-combination) is outside. For intersection proofs: use the fact that each Cα is closed under θ-combinations, so any θ-combination is in each Cα, hence in the intersection.

**Socratic questions**

- Is the union of two convex sets always convex? Give a proof or counterexample.
- Prove that the convex hull of a finite set of points in ℝⁿ is a polytope (bounded polyhedron). What theorem guarantees this?
- Is the set {(x,y): y ≥ x²} (the region above a parabola) convex? Prove your answer rigorously.
- The intersection of a convex set with a halfspace is convex. Use this to show that the feasible region of a linear program is convex.

**Prerequisite graph**

- Requires: math.linalg.vector
- Unlocks (future prerequisite links): math.opt.convex-optimization
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student confuses 'convex set' with 'star-shaped set', draw the annulus example explicitly.
- If the student needs the PSD cone example, ensure they can compute vᵀAv for a 2×2 matrix before proceeding.

**Spaced repetition / revision guidance**



---

### Convex Optimization

*Concept ID: `math.opt.convex-optimization` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 7h*

**Learning objective.** Define a convex optimization problem, state and apply the fundamental theorem (local=global minimum for convex problems), identify standard forms (LP, QP, SOCP, SDP), and explain why convex optimization is tractable.

Minimize a convex function f over a convex set C: every local minimum is global. Standard form: minimize f₀(x) subject to fᵢ(x)≤0 (convex) and hᵢ(x)=0 (affine). Efficiently solvable in polynomial time (interior-point methods).

A convex optimization problem has the form: minimize f(x) subject to gᵢ(x) ≤ 0 (i=1,…,m) and hⱼ(x) = 0 (j=1,…,p), where f and gᵢ are convex functions and hⱼ are affine. The feasible set is convex (intersection of sublevel sets of convex functions and affine sets). The fundamental property: any local minimum is a global minimum. Optimality conditions: the KKT conditions are necessary and (for convex problems under constraint qualifications) sufficient for global optimality. The hierarchy of convex problems: LP ⊂ QP ⊂ SOCP ⊂ SDP ⊂ general convex — each class has specialized, highly efficient algorithms.

**Key ideas**

- Convex optimization: minimize convex f over a convex feasible set. The fundamental theorem: any local minimum is global. Proof: if x* is local min and y is feasible with f(y)<f(x*), then the midpoint z=(x*+y)/2 is feasible (convexity of the feasible set) and f(z)≤(f(x*)+f(y))/2<f(x*), contradicting x* being a local min.
- Feasible set is convex: sublevel set {x:gᵢ(x)≤0} of convex gᵢ is convex; intersection of affine sets (h(x)=0) is affine (convex); intersection of convex sets is convex. ✓
- Standard form: min cᵀx s.t. Ax=b, x≥0 (LP); min (1/2)xᵀPx+qᵀx s.t. Ax≤b (QP, P⪰0); second-order cone programs (SOCP); semidefinite programs (SDP). All are special cases of convex optimization.
- Interior-point methods: polynomial-time algorithms (barrier methods) solve LP, QP, SOCP, SDP to ε-accuracy in O(√n·log(1/ε)) Newton steps — theoretically and practically efficient.
- Duality (strong duality): for convex problems under Slater's condition (a strictly feasible point exists), the duality gap is zero — the optimal dual value equals the optimal primal value. This enables the KKT conditions as both necessary and sufficient.
- Non-convex optimization: NP-hard in general. Convex relaxations (SDP relaxation of combinatorial problems, LP relaxation of integer programs) give polynomial-time approximations.

**Common misconceptions**

- *Misconception:* Any optimization problem with a convex objective is a convex optimization problem.
  *Correction:* Convex optimization requires BOTH a convex objective AND a convex feasible set. The constraints must define a convex set: convex inequality constraints gᵢ(x)≤0 and affine equality constraints h(x)=0. A convex objective over a non-convex feasible set (e.g., minimize x² over x∈{0,1,2,3}) is not a convex optimization problem.
- *Misconception:* Convex optimization problems always have unique solutions.
  *Correction:* Convex optimization guarantees that every local minimum is global, but there may be infinitely many global minimizers (e.g., minimize x+y s.t. x+y=1 has the entire constraint line as solutions). Strict convexity of f gives uniqueness.
- *Misconception:* Gradient descent solves any convex optimization problem efficiently.
  *Correction:* Gradient descent is a first-order method with O(1/k) or O(1/k²) rates—adequate for machine learning at moderate accuracy. For high-precision solutions to LP/SDP/QP, specialized interior-point methods are far more efficient (polynomial-time, not just convergent).

**Visual teaching opportunities**

- Venn diagram: LP ⊂ QP ⊂ SOCP ⊂ SDP ⊂ convex program ⊂ all optimization. Label the complexity: LP (simplex/IPM), QP (IPM), SDP (IPM), general convex (gradient/proximal methods).
- Proof of local=global: draw a convex feasible set with two points x* (local min) and y (feasible with f(y)<f(x*)). Show the midpoint z on the segment, inside the feasible set, with f(z)<f(x*)—contradicting x* being a local min.
- Constraint feasibility: show the feasible region of a convex QP (intersection of ellipse and halfplane) as a convex set, with the objective contours (ellipses) achieving minimum at the boundary.

**Worked example**

*Problem:* Formulate and solve the convex problem: minimize f(x,y)=x²+y² subject to x+y≥2 and x≥0, y≥0. Verify it is convex and find the global minimum.

1. Verify convexity: f(x,y)=x²+y² is convex (∇²f=2I≻0). Constraint x+y≥2 is equivalently −x−y+2≤0, a linear (convex) inequality. x≥0 and y≥0 are linear. All constraints are convex. Feasible set is convex (intersection of three halfplanes: x+y≥2, x≥0, y≥0). ✓ This is a convex QP.
2. By the fundamental theorem, any local minimum is global. Solve by KKT (or symmetry): the problem is symmetric in x,y, so x=y at the optimum. Constraint x+y=2 is active (since reducing x+y below 2 reduces x²+y², so optimum is on the boundary). x=y=1.
3. Verify: f(1,1)=2. Check KKT: ∇f=(2,2). Active constraint g₁=−x−y+2=0. ∇g₁=(−1,−1). KKT: ∇f+λ₁∇g₁=0 → (2,2)+λ₁(−1,−1)=(0,0) → λ₁=2. λ₁=2>0 ✓ (complementary slackness: g₁=0 and λ₁>0). Constraints x≥0, y≥0: active at (1,1) with multipliers 0. ✓
4. Is it feasible? (1,1): 1+1=2≥2 ✓, 1≥0 ✓, 1≥0 ✓.
5. Global minimum: f(1,1)=2. The minimum is unique because f is strictly convex. ✓

*Answer:* The problem is a convex QP. The unique global minimum is (1,1) with f(1,1)=2. KKT multiplier λ₁=2 (shadow price of the constraint x+y≥2: relaxing to x+y≥2−ε reduces the optimal value by approximately 2ε).

**Real-world intuition**

- Support vector machines (SVMs): the SVM training problem is a convex QP — guaranteed global optimum, solved efficiently by specialized QP solvers or SMO algorithm.
- Power systems: optimal power flow (OPF) for electricity grid dispatch can be relaxed to a convex SDP, providing global optimal power allocations with provable guarantees.
- Antenna array design: beamforming in wireless communications solves a convex SOCP to optimize signal quality subject to power constraints.

**Practice progression**

*Fluency:*
  - I
  - d
  - e
  - n
  - t
  - i
  - f
  - y
  -  
  - t
  - h
  - e
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - t
  - y
  - p
  - e
  -  
  - (
  - L
  - P
  - ,
  -  
  - Q
  - P
  - ,
  -  
  - S
  - O
  - C
  - P
  - ,
  -  
  - n
  - o
  - n
  - -
  - c
  - o
  - n
  - v
  - e
  - x
  - )
  -  
  - a
  - n
  - d
  -  
  - v
  - e
  - r
  - i
  - f
  - y
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - i
  - t
  - y
  - :
  -  
  - (
  - a
  - )
  -  
  - m
  - i
  - n
  -  
  - x
  - ₁
  - ²
  - +
  - x
  - ₂
  - ²
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - x
  - ₂
  - =
  - 1
  -  
  - (
  - b
  - )
  -  
  - m
  - i
  - n
  -  
  - x
  - ₁
  - x
  - ₂
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - x
  - ₂
  - ≤
  - 1
  - ,
  -  
  - x
  - ₁
  - ,
  - x
  - ₂
  - ≥
  - 0
  -  
  - (
  - c
  - )
  -  
  - m
  - i
  - n
  -  
  - |
  - |
  - A
  - x
  - −
  - b
  - |
  - |
  - ₂
  -  
  - s
  - .
  - t
  - .
  -  
  - |
  - |
  - x
  - |
  - |
  - ₁
  - ≤
  - 1
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - f
  - u
  - n
  - d
  - a
  - m
  - e
  - n
  - t
  - a
  - l
  -  
  - t
  - h
  - e
  - o
  - r
  - e
  - m
  -  
  - o
  - f
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - o
  - p
  - t
  - i
  - m
  - i
  - z
  - a
  - t
  - i
  - o
  - n
  - :
  -  
  - a
  - n
  - y
  -  
  - l
  - o
  - c
  - a
  - l
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  -  
  - o
  - f
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  -  
  - o
  - v
  - e
  - r
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - f
  - e
  - a
  - s
  - i
  - b
  - l
  - e
  -  
  - s
  - e
  - t
  -  
  - i
  - s
  -  
  - a
  -  
  - g
  - l
  - o
  - b
  - a
  - l
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  - .
  -  
  - I
  - d
  - e
  - n
  - t
  - i
  - f
  - y
  -  
  - w
  - h
  - e
  - r
  - e
  -  
  - t
  - h
  - e
  -  
  - p
  - r
  - o
  - o
  - f
  -  
  - u
  - s
  - e
  - s
  -  
  - b
  - o
  - t
  - h
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - i
  - t
  - y
  -  
  - o
  - f
  -  
  - f
  -  
  - a
  - n
  - d
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - i
  - t
  - y
  -  
  - o
  - f
  -  
  - t
  - h
  - e
  -  
  - f
  - e
  - a
  - s
  - i
  - b
  - l
  - e
  -  
  - s
  - e
  - t
  - .
*Problem solving:*
  - C
  - o
  - n
  - v
  - e
  - r
  - t
  -  
  - t
  - o
  -  
  - s
  - t
  - a
  - n
  - d
  - a
  - r
  - d
  -  
  - f
  - o
  - r
  - m
  -  
  - a
  - n
  - d
  -  
  - s
  - o
  - l
  - v
  - e
  - :
  -  
  - m
  - i
  - n
  - i
  - m
  - i
  - z
  - e
  -  
  - f
  - (
  - x
  - )
  - =
  - |
  - |
  - x
  - |
  - |
  - ₁
  -  
  - s
  - u
  - b
  - j
  - e
  - c
  - t
  -  
  - t
  - o
  -  
  - A
  - x
  - =
  - b
  -  
  - (
  - L
  - A
  - S
  - S
  - O
  -  
  - i
  - n
  -  
  - L
  - a
  - g
  - r
  - a
  - n
  - g
  - i
  - a
  - n
  -  
  - f
  - o
  - r
  - m
  - )
  - .
  -  
  - R
  - e
  - w
  - r
  - i
  - t
  - e
  -  
  - a
  - s
  -  
  - a
  - n
  -  
  - L
  - P
  -  
  - b
  - y
  -  
  - i
  - n
  - t
  - r
  - o
  - d
  - u
  - c
  - i
  - n
  - g
  -  
  - v
  - a
  - r
  - i
  - a
  - b
  - l
  - e
  - s
  -  
  - t
  -  
  - w
  - i
  - t
  - h
  -  
  - −
  - t
  - ≤
  - x
  - ≤
  - t
  - ,
  -  
  - m
  - i
  - n
  - i
  - m
  - i
  - z
  - e
  -  
  - ∑
  - t
  - ᵢ
  -  
  - s
  - .
  - t
  - .
  -  
  - A
  - x
  - =
  - b
  - .

**Assessment objectives**

*MCQ:* Which of the following is a convex optimization problem? (A) min x₁x₂ s.t. x₁²+x₂²≤1 (B) min x₁²+x₂² s.t. x₁²+x₂²=1 (C) min x₁²+x₂² s.t. x₁+x₂≥1, x₁,x₂≥0 (D) min x₁³ s.t. x₁≤2. Answer: C.
*Short answer:* Define a convex optimization problem. State the fundamental theorem and prove it.
*Proof/derivation:* Prove that the feasible set of a convex optimization problem (convex inequality constraints + affine equality constraints) is a convex set.

**Intuition**

Convex optimization is the 'sweet spot' of mathematical optimization: hard enough to model a vast array of real problems, easy enough to solve efficiently and globally. The key insight is that the landscape has no traps: every valley is the deepest valley. This is the fundamental theorem — local equals global. Without convexity, optimization problems become NP-hard; with convexity, polynomial-time algorithms guarantee finding the true optimum. The hierarchy LP⊂QP⊂SOCP⊂SDP tells us how much modeling power we can add while retaining tractability.

**Historical context**

The systematic study of convex optimization began with Dantzig's simplex method for LP (1947) and the LP duality theory of von Neumann and Gale. The interior-point revolution was triggered by Karmarkar's 1984 polynomial-time LP algorithm. Nesterov and Nemirovski extended this to a general theory of self-concordant barrier functions for convex optimization (1994), establishing the theoretical foundations for modern IPM solvers. The textbook by Boyd and Vandenberghe (2004) unified and popularized convex optimization for engineering applications.

**Connections**

All specific convex problem classes (LP, QP, SDP) are special cases, each with tailored algorithms (simplex, SMO, SDP solvers). KKT conditions (math.opt.kkt) characterize the optimality of convex problems. Duality theory (math.opt.duality) for convex programs gives zero duality gap (strong duality under Slater's condition).

**Common errors (deep dive)**

The most common error is identifying convex problems incorrectly: students check only the objective but forget the constraints. A bilinear objective (xy) is not convex even if the constraints are convex. Another error: assuming all convex problems are easy to solve — general convex programs (without LP/QP/SDP structure) may have slow gradient-method convergence. The hierarchy matters.

**Exam strategy**

For convex problem identification: (1) check objective convexity (∇²f⪰0), (2) check each constraint: equality must be affine, inequality gᵢ≤0 must have gᵢ convex. (3) Classify as LP/QP/SOCP/SDP or general convex. For optimality: invoke KKT (necessary and sufficient for convex problems under Slater's condition).

**Socratic questions**

- Why is the constraint x₁x₂≥1 (x₁,x₂>0) not a convex constraint? Rewrite as an equivalent convex constraint using the log transformation.
- Prove that the sublevel set {x:f(x)≤c} of a convex function f is a convex set.
- What is Slater's condition, and why does it guarantee strong duality for convex optimization problems?
- Give an example of a non-convex optimization problem where every local minimum happens to be a global minimum. What property of the problem makes this true?

**Prerequisite graph**

- Requires: math.opt.convex-function, math.opt.convex-set
- Unlocks (future prerequisite links): math.opt.duality
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student cannot identify convex vs. non-convex constraints, review math.opt.convex-set and math.opt.convex-function before this concept.
- If the student is unfamiliar with LP/QP standard forms, introduce the matrix form and variable types before the hierarchy discussion.

**Spaced repetition / revision guidance**



---

### Linear Programming

*Concept ID: `math.opt.linear-programming` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 7h*

**Learning objective.** Formulate linear programs in standard form, interpret the geometry of the feasible polyhedron and optimal extreme points, state the simplex method concept, and solve small LP problems graphically and algebraically.

Minimize cᵀx subject to Ax≤b, x≥0. Optimal at a vertex of the feasible polytope. Simplex algorithm: walks vertices; exponential worst case, polynomial in practice. Interior-point (Karmarkar): polynomial time. LP dual: maximize bᵀy, Aᵀy=c, y≥0.

A linear program (LP) minimizes a linear objective cᵀx subject to linear constraints Ax≤b (or Ax=b, x≥0 for standard form). The feasible set is a polyhedron (convex, polyhedral). The optimal solution, if it exists, is attained at a vertex (extreme point, basic feasible solution) of the feasible polyhedron. The simplex method systematically moves from vertex to adjacent vertex along improving edges, terminating at the optimal vertex. LP is solvable in polynomial time (ellipsoid method, 1979; Karmarkar's interior-point method, 1984). LP is the foundation of combinatorial optimization.

**Key ideas**

- Standard form LP: min cᵀx s.t. Ax=b, x≥0. Any LP can be converted: Ax≤b → Ax+s=b, s≥0 (slack variables); unbounded xᵢ → xᵢ=xᵢ⁺−xᵢ⁻, xᵢ⁺,xᵢ⁻≥0.
- Feasible set is a polyhedron: P={x: Ax≤b}. Bounded polyhedra are polytopes (compact). The optimal solution of a bounded LP is attained at a vertex of P.
- Basic feasible solutions (BFS): for standard form Ax=b, x≥0 with rank(A)=m, a BFS has at most m nonzero variables (basic variables) and n−m zero variables (non-basic). BFS ↔ vertices of the feasible polyhedron.
- Simplex method: start at a BFS. Check optimality (reduced costs cᵢ−cBᵀB⁻¹Aᵢ≥0 for all non-basic i). If not optimal, pivot: bring one non-basic variable into basis, remove one basic variable. Repeat until optimal or unbounded.
- LP duality: min cᵀx, Ax=b, x≥0 ↔ max bᵀy, Aᵀy≤c. Strong duality holds (if both feasible and bounded). Complementary slackness: xᵢ(cᵢ−Aᵢᵀy*)=0.
- Degeneracy: a BFS is degenerate if some basic variable is zero. Can cause cycling in simplex (resolved by Bland's rule or perturbation).

**Common misconceptions**

- *Misconception:* The optimal solution of an LP is always at the interior of the feasible set.
  *Correction:* False. The optimal solution of a non-trivial LP is always at a vertex (extreme point) of the feasible polyhedron—never in the interior (unless the entire polyhedron is a single point). This is because the objective is linear and thus attains its extremum on the boundary.
- *Misconception:* The simplex method is inefficient because it visits all vertices.
  *Correction:* In the worst case (pathological examples like the Klee-Minty cube), simplex visits exponentially many vertices. In practice, simplex is very fast (visits O(m) to O(m²) vertices on average for real-world LPs). Interior-point methods provide the polynomial-time guarantee.
- *Misconception:* LP can only model simple, 'linear' real-world problems.
  *Correction:* LP is surprisingly powerful: many combinatorial problems (matching, flow, scheduling) have LP relaxations that are tight (integral optimal) or provide excellent approximations. Piecewise-linear convex objectives can be linearized. Many non-linear constraints can be approximated by LP.

**Visual teaching opportunities**

- 2D LP: min −x₁−x₂ s.t. x₁+x₂≤4, x₁≤3, x₂≤3, x₁,x₂≥0. Draw the feasible polytope (hexagon). Overlay objective contours (lines x₁+x₂=c). Optimal vertex at (1,3) or (3,1)—identify by moving contour until it last touches the polytope.
- 3D LP geometry: show a 3D polyhedron with vertices, edges, faces. The simplex method walks along edges. Interior-point method approaches the optimal from the interior.
- BFS correspondence: for a 2D LP with 4 constraints and 2 variables, enumerate all basic feasible solutions (intersections of pairs of constraints) and identify which are vertices of the feasible polytope.

**Worked example**

*Problem:* Solve graphically: max 5x₁+4x₂ subject to 6x₁+4x₂≤24, x₁+2x₂≤6, x₁,x₂≥0.

1. Plot constraints: 6x₁+4x₂=24 → x₁-intercept=4, x₂-intercept=6. x₁+2x₂=6 → x₁-intercept=6, x₂-intercept=3. Feasible region: bounded by both lines and x₁,x₂≥0.
2. Find vertices of feasible region: (0,0), (4,0), (0,3), and the intersection of 6x₁+4x₂=24 and x₁+2x₂=6.
3. Intersection: from x₁+2x₂=6: x₁=6−2x₂. Substitute: 6(6−2x₂)+4x₂=24 → 36−12x₂+4x₂=24 → −8x₂=−12 → x₂=3/2. Then x₁=6−3=3. Vertex: (3, 3/2).
4. Evaluate objective at each vertex: f(0,0)=0. f(4,0)=20. f(0,3)=12. f(3,3/2)=15+6=21. Maximum: 21 at (3,3/2).
5. Verify constraint satisfaction at (3,3/2): 6(3)+4(3/2)=18+6=24 ✓. 3+2(3/2)=3+3=6 ✓. x₁=3≥0 ✓, x₂=3/2≥0 ✓.

*Answer:* Maximum is 21 achieved at (x₁,x₂)=(3,3/2). Both constraints are active at the optimum (it is a vertex where both constraint lines intersect). The optimal BFS has x₁=3, x₂=3/2 (both basic, no nonbasic zeros — non-degenerate).

**Real-world intuition**

- Transportation and logistics: shipping cost minimization subject to supply and demand constraints — a classic LP with direct economic impact.
- Diet problem: minimum-cost diet satisfying nutritional requirements — the historical problem that motivated Dantzig's simplex method.
- Revenue management (airlines, hotels): seat/room allocation to maximize revenue subject to capacity and overbooking constraints — large-scale LP solved millions of times daily.

**Practice progression**

*Fluency:*
  - C
  - o
  - n
  - v
  - e
  - r
  - t
  -  
  - t
  - o
  -  
  - s
  - t
  - a
  - n
  - d
  - a
  - r
  - d
  -  
  - f
  - o
  - r
  - m
  - :
  -  
  - (
  - a
  - )
  -  
  - m
  - a
  - x
  -  
  - 2
  - x
  - ₁
  - +
  - 3
  - x
  - ₂
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - x
  - ₂
  - ≤
  - 5
  - ,
  -  
  - x
  - ₂
  - ≥
  - 1
  -  
  - (
  - b
  - )
  -  
  - m
  - i
  - n
  -  
  - |
  - x
  - ₁
  - |
  - +
  - x
  - ₂
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - 2
  - x
  - ₂
  - ≥
  - 4
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - o
  - p
  - t
  - i
  - m
  - a
  - l
  -  
  - s
  - o
  - l
  - u
  - t
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - a
  -  
  - b
  - o
  - u
  - n
  - d
  - e
  - d
  -  
  - L
  - P
  -  
  - i
  - s
  -  
  - a
  - l
  - w
  - a
  - y
  - s
  -  
  - a
  - t
  - t
  - a
  - i
  - n
  - e
  - d
  -  
  - a
  - t
  -  
  - a
  -  
  - v
  - e
  - r
  - t
  - e
  - x
  - .
  -  
  - (
  - S
  - h
  - o
  - w
  -  
  - t
  - h
  - a
  - t
  -  
  - a
  - n
  - y
  -  
  - n
  - o
  - n
  - -
  - v
  - e
  - r
  - t
  - e
  - x
  -  
  - f
  - e
  - a
  - s
  - i
  - b
  - l
  - e
  -  
  - p
  - o
  - i
  - n
  - t
  -  
  - x
  - =
  - θ
  - y
  - +
  - (
  - 1
  - −
  - θ
  - )
  - z
  -  
  - (
  - y
  - ,
  - z
  -  
  - d
  - i
  - f
  - f
  - e
  - r
  - e
  - n
  - t
  -  
  - v
  - e
  - r
  - t
  - i
  - c
  - e
  - s
  - )
  -  
  - w
  - i
  - t
  - h
  -  
  - c
  - ᵀ
  - x
  - =
  - p
  - *
  -  
  - i
  - m
  - p
  - l
  - i
  - e
  - s
  -  
  - c
  - ᵀ
  - y
  - =
  - c
  - ᵀ
  - z
  - =
  - p
  - *
  - ,
  -  
  - a
  - n
  - d
  -  
  - b
  - y
  -  
  - i
  - n
  - d
  - u
  - c
  - t
  - i
  - o
  - n
  -  
  - t
  - h
  - e
  -  
  - o
  - p
  - t
  - i
  - m
  - u
  - m
  -  
  - i
  - s
  -  
  - a
  - t
  -  
  - a
  -  
  - v
  - e
  - r
  - t
  - e
  - x
  - .
  - )
*Problem solving:*
  - A
  - p
  - p
  - l
  - y
  -  
  - o
  - n
  - e
  -  
  - s
  - i
  - m
  - p
  - l
  - e
  - x
  -  
  - p
  - i
  - v
  - o
  - t
  -  
  - t
  - o
  -  
  - t
  - h
  - e
  -  
  - L
  - P
  - :
  -  
  - m
  - i
  - n
  -  
  - −
  - 2
  - x
  - ₁
  - −
  - 3
  - x
  - ₂
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - x
  - ₂
  - +
  - s
  - ₁
  - =
  - 4
  - ,
  -  
  - 2
  - x
  - ₁
  - +
  - x
  - ₂
  - +
  - s
  - ₂
  - =
  - 6
  - ,
  -  
  - x
  - ₁
  - ,
  - x
  - ₂
  - ,
  - s
  - ₁
  - ,
  - s
  - ₂
  - ≥
  - 0
  - .
  -  
  - S
  - t
  - a
  - r
  - t
  -  
  - a
  - t
  -  
  - B
  - F
  - S
  -  
  - (
  - s
  - ₁
  - ,
  - s
  - ₂
  - )
  -  
  - b
  - a
  - s
  - i
  - c
  - .
  -  
  - C
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - r
  - e
  - d
  - u
  - c
  - e
  - d
  -  
  - c
  - o
  - s
  - t
  - s
  - ,
  -  
  - i
  - d
  - e
  - n
  - t
  - i
  - f
  - y
  -  
  - e
  - n
  - t
  - e
  - r
  - i
  - n
  - g
  -  
  - v
  - a
  - r
  - i
  - a
  - b
  - l
  - e
  - ,
  -  
  - p
  - e
  - r
  - f
  - o
  - r
  - m
  -  
  - p
  - i
  - v
  - o
  - t
  - .

**Assessment objectives**

*MCQ:* The optimal solution of a linear program (if it exists) is always: (A) unique (B) attained at a vertex of the feasible polytope (C) in the interior of the feasible set (D) zero. Answer: B.
*Short answer:* Define a basic feasible solution for a standard-form LP. Explain why BFS correspond to vertices of the feasible polyhedron.
*Proof/derivation:* Prove that the optimal value of a bounded LP is attained at a vertex. (Assume x* is optimal but not a vertex; write x*=θy+(1−θ)z for distinct feasible y,z; use linearity of cᵀ to show both y and z are also optimal, and iterate to reach a vertex.)

**Intuition**

An LP is a linear 'energy landscape' over a polygonal (polyhedral) feasible set. Since the landscape is completely flat in every direction (linear), the minimum or maximum is always at a corner (vertex) of the polygon — never in the middle. The simplex method exploits this: start at any corner, check if any adjacent corner is better, hop to it, repeat. Since there are finitely many corners and you never revisit one (if non-degenerate), you always terminate. The interior-point method takes a different route: aim for the center of the feasible polyhedron and slide toward the optimum while staying inside — polynomial-time, but geometrically different.

**Historical context**

George Dantzig invented the simplex method in 1947 while working for the US Air Force, motivated by scheduling and resource allocation problems. The simplex method dominated computational optimization for 30 years. Leonid Khachiyan proved the first polynomial-time LP algorithm (ellipsoid method, 1979), though impractical. Narendra Karmarkar's 1984 interior-point algorithm was both polynomial-time and practical, triggering the modern interior-point revolution. LP and its generalizations (integer programming, stochastic programming) are the workhorses of operations research.

**Connections**

LP is the simplest special case of convex optimization (math.opt.convex-optimization). LP duality (math.opt.duality) is the prototype for all duality theory. Integer programming (math.opt.integer-programming) adds integrality constraints to LP. Dynamic programming (math.opt.dynamic-programming) is an alternative paradigm for sequential decision problems that LP models in aggregated form.

**Common errors (deep dive)**

The most common error in LP formulation: adding non-linear constraints (x₁x₂≤4) and calling it an LP. If any constraint or objective involves products, quotients, or non-linear functions of variables, it is NOT an LP. Also: students forget to add non-negativity constraints (xᵢ≥0) for variables that are implicitly non-negative — this changes the feasible region. Always state ALL constraints explicitly in standard form.

**Exam strategy**

For graphical LP (2D): (1) plot all constraints as lines; (2) shade the feasible region (intersection of all halfplanes); (3) find all vertices (intersection of pairs of constraint lines); (4) evaluate objective at each vertex; (5) pick the maximum/minimum. For algebraic: set up the tableau, apply simplex pivots, terminate when all reduced costs are non-negative (minimization).

**Socratic questions**

- Prove that the optimal solution of a bounded LP is attained at a vertex. What happens when the LP is unbounded?
- Describe what happens in the simplex method when the LP is degenerate. What is Bland's rule, and why does it prevent cycling?
- Write the dual of a general LP in inequality form (min cᵀx, Ax≥b, x≥0). What is the economic interpretation of the dual variables?
- The LP relaxation of an integer program gives a lower bound. Under what conditions is the LP relaxation guaranteed to have an integer optimal solution?

**Prerequisite graph**

- Requires: math.opt.convex-optimization, math.linalg.linear-system
- Unlocks (future prerequisite links): math.opt.duality
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student cannot plot constraints in 2D and find their intersection, review basic linear algebra and analytic geometry.
- If the student is unfamiliar with matrix notation Ax≤b, review matrix-vector multiplication and inequality systems.

**Spaced repetition / revision guidance**



---

### Quadratic Programming

*Concept ID: `math.opt.quadratic-programming` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.75 · Estimated study time: 5h*

**Learning objective.** Formulate quadratic programs (QPs), characterize convex QPs via PSD Hessian, apply KKT conditions to solve convex QPs, and connect QPs to support vector machines and portfolio optimization.

Minimize ½xᵀQx+cᵀx subject to Ax≤b. Convex if Q⪰0. Active-set and interior-point methods solve QPs. SVM training is a QP. Generalizes LP; basis of sequential quadratic programming (SQP) for nonlinear programs.

A quadratic program (QP) minimizes a quadratic objective f(x)=(1/2)xᵀPx+qᵀx+r subject to linear constraints Ax≤b, Cx=d. If P⪰0 (PSD), the QP is convex and any local minimum is global. If P≻0 (PD), the unique global minimum is found by solving the KKT stationarity conditions. The active-set method solves convex QPs by iterating over subsets of active inequality constraints. For unconstrained convex QP: the unique minimum satisfies ∇f=Px+q=0, giving x*=−P⁻¹q (if P invertible). QPs arise in least squares, portfolio optimization, SVMs, MPC, and signal processing.

**Key ideas**

- Convex QP: P⪰0 (PSD). Objective is convex; linear constraints define a convex feasible set. Any local min is global. If P≻0: unique global min.
- Unconstrained convex QP: ∇f=Px+q=0 → x*=−P⁻¹q (if P invertible). This is just solving a linear system Px=−q.
- Constrained QP KKT: ∇f+Aᵀμ+Cᵀλ=0 (stationarity), Ax≤b, Cx=d (primal feasibility), μ≥0 (dual feasibility), μᵢ(Aᵢᵀx−bᵢ)=0 (complementary slackness).
- Equality-constrained QP: min (1/2)xᵀPx+qᵀx s.t. Cx=d. KKT system: [[P, Cᵀ],[C, 0]] [x;λ] = [−q;d] — a linear system solved by factorization. This is the KKT matrix.
- Portfolio optimization (Markowitz): min xᵀΣx s.t. μᵀx≥r, 1ᵀx=1, x≥0. Convex QP (Σ=covariance matrix, PSD). Efficient frontier = set of Pareto-optimal (risk,return) pairs.
- SVM: min (1/2)||w||² s.t. yᵢ(wᵀxᵢ+b)≥1 for all i. Convex QP. Dual is a QP in α with the kernel trick enabling non-linear SVMs.

**Common misconceptions**

- *Misconception:* Any QP with a quadratic objective is convex.
  *Correction:* The QP is convex iff P⪰0 (PSD). If P is indefinite (has negative eigenvalues), the objective is non-convex and the QP is NP-hard in general. For example, min xᵀ[[1,0],[0,−1]]x subject to constraints is non-convex.
- *Misconception:* Solving the unconstrained QP (Px=−q) always works.
  *Correction:* The unconstrained minimum x*=−P⁻¹q is valid only when P is invertible (P≻0). If P is singular (P⪰0 but not P≻0), the system Px=−q may have no solution (objective has no minimum, minimum over a subspace), or infinitely many solutions (minimum attained on an affine subspace).
- *Misconception:* QP is trivial to solve because it generalizes linear programming.
  *Correction:* Convex QP (P⪰0) is solvable in polynomial time. Non-convex QP (P indefinite) is NP-hard in general. The difficulty depends entirely on the sign structure of P.

**Visual teaching opportunities**

- 2D convex QP: min x₁²+x₂² s.t. x₁+x₂≥2. Concentric circle contours of the objective. Feasible region: halfplane above x₁+x₂=2. Minimum at (1,1) — circle tangent to the constraint line.
- Markowitz efficient frontier: plot (variance, expected return) for all feasible portfolios. The frontier is a parabola (QP optimal solutions parameterized by return target). The 'efficient frontier' is the upper branch.
- KKT matrix for equality-constrained QP: draw the block structure [[P,Cᵀ],[C,0]] and explain each block (curvature P, constraint C, zero for Lagrange multipliers).

**Worked example**

*Problem:* Solve the QP: min (1/2)(x₁²+x₂²) subject to x₁+x₂=2 (equality constraint only).

1. KKT system for equality constraint: Lagrangian L=(1/2)(x₁²+x₂²)+λ(x₁+x₂−2). Stationarity: ∂L/∂x₁=x₁+λ=0 → x₁=−λ. ∂L/∂x₂=x₂+λ=0 → x₂=−λ. Constraint: x₁+x₂=2 → −2λ=2 → λ=−1.
2. Solution: x₁=x₂=1, λ=−1. Optimal value: f(1,1)=1/2+1/2=1.
3. Via KKT matrix: [[P,Cᵀ],[C,0]][[x],[λ]] = [[−q],[d]]. Here P=I₂, C=[1,1], q=[0,0], d=2. System: [[1,0,1],[0,1,1],[1,1,0]][[x₁],[x₂],[λ]] = [[0],[0],[2]]. Row 1: x₁+λ=0. Row 2: x₂+λ=0. Row 3: x₁+x₂=2. Solution: x₁=x₂=1, λ=−1. ✓
4. Second-order conditions: restricted Hessian on the constraint tangent space. Tangent space of {x:x₁+x₂=2}: {d: d₁+d₂=0}={(t,−t):t∈ℝ}. Hessian=I₂. dᵀId=d₁²+d₂²=2t²>0 for t≠0 → SOSC satisfied. Strict local minimum (in fact global since f convex).
5. Interpretation: the nearest point on the line x₁+x₂=2 to the origin is (1,1) at distance √2. The Lagrange multiplier λ=−1 (shadow price: relaxing x₁+x₂=2 to x₁+x₂=2−ε reduces min distance² by ε).

*Answer:* Unique global minimum at (1,1) with value 1. KKT multiplier λ=−1. The problem is finding the closest point on the hyperplane x₁+x₂=2 to the origin — the foot of the perpendicular from the origin to the line.

**Real-world intuition**

- Portfolio optimization: Markowitz mean-variance optimization is a convex QP solved daily by financial institutions to balance risk (covariance) and return.
- Model predictive control (MPC): at each time step, MPC solves a convex QP over the control horizon — trajectory optimization subject to physical constraints.
- SVM training: the SVM dual QP identifies support vectors and the decision boundary. Solved by SMO (Sequential Minimal Optimization), a specialized QP solver.

**Practice progression**

*Fluency:*
  - S
  - o
  - l
  - v
  - e
  - :
  -  
  - (
  - a
  - )
  -  
  - m
  - i
  - n
  -  
  - x
  - ₁
  - ²
  - +
  - 2
  - x
  - ₂
  - ²
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - x
  - ₂
  - =
  - 1
  -  
  - (
  - b
  - )
  -  
  - m
  - i
  - n
  -  
  - |
  - |
  - x
  - −
  - a
  - |
  - |
  - ²
  -  
  - s
  - .
  - t
  - .
  -  
  - b
  - ᵀ
  - x
  - =
  - c
  -  
  - (
  - p
  - r
  - o
  - j
  - e
  - c
  - t
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - a
  -  
  - o
  - n
  - t
  - o
  -  
  - t
  - h
  - e
  -  
  - h
  - y
  - p
  - e
  - r
  - p
  - l
  - a
  - n
  - e
  -  
  - b
  - ᵀ
  - x
  - =
  - c
  - )
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - f
  - o
  - r
  -  
  - a
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - Q
  - P
  -  
  - (
  - P
  - ⪰
  - 0
  - ,
  -  
  - l
  - i
  - n
  - e
  - a
  - r
  -  
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - t
  - s
  - )
  - ,
  -  
  - t
  - h
  - e
  -  
  - K
  - K
  - T
  -  
  - c
  - o
  - n
  - d
  - i
  - t
  - i
  - o
  - n
  - s
  -  
  - a
  - r
  - e
  -  
  - b
  - o
  - t
  - h
  -  
  - n
  - e
  - c
  - e
  - s
  - s
  - a
  - r
  - y
  -  
  - a
  - n
  - d
  -  
  - s
  - u
  - f
  - f
  - i
  - c
  - i
  - e
  - n
  - t
  -  
  - f
  - o
  - r
  -  
  - g
  - l
  - o
  - b
  - a
  - l
  -  
  - o
  - p
  - t
  - i
  - m
  - a
  - l
  - i
  - t
  - y
  - .
  -  
  - W
  - h
  - a
  - t
  -  
  - a
  - d
  - d
  - i
  - t
  - i
  - o
  - n
  - a
  - l
  -  
  - c
  - o
  - n
  - d
  - i
  - t
  - i
  - o
  - n
  -  
  - e
  - n
  - s
  - u
  - r
  - e
  - s
  -  
  - t
  - h
  - e
  -  
  - s
  - o
  - l
  - u
  - t
  - i
  - o
  - n
  -  
  - i
  - s
  -  
  - u
  - n
  - i
  - q
  - u
  - e
  - ?
*Problem solving:*
  - F
  - o
  - r
  - m
  - u
  - l
  - a
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - S
  - V
  - M
  -  
  - t
  - r
  - a
  - i
  - n
  - i
  - n
  - g
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - a
  - s
  -  
  - a
  -  
  - Q
  - P
  - .
  -  
  - W
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - p
  - r
  - i
  - m
  - a
  - l
  -  
  - Q
  - P
  - ,
  -  
  - d
  - e
  - r
  - i
  - v
  - e
  -  
  - i
  - t
  - s
  -  
  - d
  - u
  - a
  - l
  - ,
  -  
  - a
  - n
  - d
  -  
  - i
  - d
  - e
  - n
  - t
  - i
  - f
  - y
  -  
  - t
  - h
  - e
  -  
  - s
  - u
  - p
  - p
  - o
  - r
  - t
  -  
  - v
  - e
  - c
  - t
  - o
  - r
  - s
  -  
  - v
  - i
  - a
  -  
  - c
  - o
  - m
  - p
  - l
  - e
  - m
  - e
  - n
  - t
  - a
  - r
  - y
  -  
  - s
  - l
  - a
  - c
  - k
  - n
  - e
  - s
  - s
  - .

**Assessment objectives**

*MCQ:* A QP with objective (1/2)xᵀPx+qᵀx is convex iff: (A) q=0 (B) P⪰0 (C) P≻0 (D) P is symmetric. Answer: B.
*Short answer:* Write the KKT matrix system for the equality-constrained QP: min (1/2)xᵀPx+qᵀx s.t. Cx=d. Explain each block of the KKT matrix.
*Proof/derivation:* Prove that the unconstrained minimum of f(x)=(1/2)xᵀPx+qᵀx with P≻0 is unique and equals x*=−P⁻¹q. Verify that the second-order condition is satisfied.

**Intuition**

A quadratic program is an LP with a curved (bowl-shaped) objective. The constraints are still linear, so the feasible set is still a polyhedron—but the objective is now a bowl, not a flat surface. The minimum of the bowl over the polyhedron is at the point where the bowl is 'resting' on the polyhedron: touching it either in the interior (if the unconstrained minimum is feasible) or on the boundary (if the unconstrained minimum is outside the feasible set). The KKT conditions precisely characterize this 'contact' geometrically.

**Historical context**

Quadratic programming as a distinct problem class was identified in the 1950s by Frank and Wolfe (1956), who gave the first simplex-based algorithm. The Markowitz mean-variance portfolio optimization model (1952, Nobel Prize 1990) was a major application driving QP development. The connection to SVMs was established by Boser, Guyon, and Vapnik (1992), bringing QP to the machine learning community. Modern interior-point solvers (MOSEK, Gurobi, CPLEX) solve large QPs in seconds.

**Connections**

QP is between LP (linear objective) and general convex programs in the hierarchy. Convex QP with inequality constraints uses KKT (math.opt.kkt). SDP (math.opt.semidefinite-programming) generalizes QP with a matrix variable. Duality of convex QP gives a QP dual (math.opt.duality).

**Common errors (deep dive)**

The most common error is applying the unconstrained formula x*=−P⁻¹q to a constrained QP—this gives the unconstrained minimum, which may be infeasible. Always check whether the unconstrained minimum satisfies all constraints; if not, the constrained minimum is on the boundary and requires KKT. Also: for a degenerate P (P⪰0 but not PD), P may not be invertible — use the KKT system instead.

**Exam strategy**

For QP: (1) check P⪰0 (convex if yes), (2) write KKT conditions, (3) apply complementary slackness to determine active constraints (trial: assume each inequality active or inactive), (4) solve the resulting linear system. For equality-only QP: directly solve the KKT matrix system [[P,Cᵀ],[C,0]][x;λ]=[−q;d].

**Socratic questions**

- For the QP min xᵀPx s.t. xᵀx=1 (quadratic over the sphere), what is the optimal value? (Answer: minimum eigenvalue of P.) Prove this.
- Formulate the Markowitz portfolio optimization as a QP. What is the 'efficient frontier' in terms of the QP parameterization?
- Explain why the SVM training QP has a unique solution. What changes if the data are not linearly separable?
- Prove that the equality-constrained QP min (1/2)xᵀPx+qᵀx s.t. Cx=d has a unique solution iff P≻0 (restricted to the constraint null space). What additional condition on C is needed?

**Prerequisite graph**

- Requires: math.opt.linear-programming, math.linalg.positive-definite
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student cannot verify positive definiteness of a matrix, review math.linalg.positive-definite before QP.
- If the student is unfamiliar with LP, review math.opt.linear-programming to build intuition for constraint types before QP.

**Spaced repetition / revision guidance**



---

### Semidefinite Programming

*Concept ID: `math.opt.semidefinite-programming` · Difficulty: research · Bloom level: analyze · Mastery threshold: 0.65 · Estimated study time: 8h*

**Learning objective.** Formulate and understand semidefinite programs (SDPs) — optimization over the cone of positive semidefinite matrices — including duality, Slater's condition, and canonical applications in combinatorics and control.

Minimize C•X subject to Aᵢ•X=bᵢ, X⪰0 (positive semidefinite). Generalizes LP and QP. Interior-point methods solve SDPs in polynomial time. Used in control theory, combinatorial optimization relaxations, and matrix completion.

A semidefinite program (SDP) minimizes a linear objective over the intersection of an affine subspace with the positive semidefinite cone S₊ⁿ: minimize Tr(CX) subject to Tr(AᵢX) = bᵢ for i = 1,...,m and X ⪰ 0 (X positive semidefinite). The constraint X ⪰ 0 means all eigenvalues of X are non-negative, equivalently vᵀXv ≥ 0 for all v ∈ ℝⁿ. S₊ⁿ is a convex cone, so the SDP feasible set is convex, making the SDP a convex optimization problem with strong duality. The dual SDP maximizes bᵀy subject to Σᵢyᵢ Aᵢ ⪯ C (matrix inequality). Under Slater's condition (strictly feasible primal and dual: X ≻ 0 and C − Σyᵢ Aᵢ ≻ 0), strong duality holds: primal optimal = dual optimal. SDP generalizes LP (every LP is an SDP with diagonal matrices) and SOCP, while being solvable in polynomial time via interior-point methods with complexity O(m½n³). Key applications include the Goemans-Williamson MAX-CUT relaxation (0.878 approximation guarantee), Lyapunov stability analysis, sum-of-squares (SOS) polynomial optimization, and matrix completion.

**Key ideas**

- The PSD cone S₊ⁿ = {X ∈ ℝⁿˣⁿ : X = Xᵀ, λᵢ(X) ≥ 0} is a proper convex cone — closed under positive combinations and limits — giving SDPs the structure needed for convex duality.
- SDP generalizes LP: an LP min cᵀx, Ax = b, x ≥ 0 is an SDP with X = diag(x), C = diag(c), and Aᵢ = diag(eᵢᵀA) — so LP is SDP restricted to diagonal matrices.
- Strong duality for SDPs: if both primal and dual are strictly feasible (Slater's condition), then p* = d* and both optima are attained. Unlike LP, a feasible SDP with bounded value need not attain its optimum without strict feasibility.
- Goemans-Williamson MAX-CUT: relax {0,1}ⁿ → {v ∈ ℝⁿ : vᵢᵀvᵢ = 1} (unit vectors in ℝⁿ), formulate as SDP over X = VVᵀ (rank-n PSD matrix with ones on diagonal), solve, round by random hyperplane — achieves 0.878-approximation.
- Interior-point methods solve SDPs in polynomial time: barrier method uses log-det barrier φ(X) = −log det(X) (self-concordant on S₊ⁿ) and converges in O(m½ log(1/ε)) Newton steps, each costing O(m²n² + mn³) arithmetic operations.

**Common misconceptions**

- *Misconception:* SDP is just a symmetric matrix version of LP — the algorithms and theory transfer directly.
  *Correction:* SDPs have strictly richer structure than LPs. LPs always attain their optimum when feasible and bounded; SDPs can have a finite infimum that is not attained (duality gap can occur when strict feasibility fails). SDP duality gaps are an active research topic — LP duality theory does not transfer without modification.
- *Misconception:* Positive semidefinite means all entries are non-negative.
  *Correction:* PSD means all eigenvalues are non-negative, equivalently vᵀXv ≥ 0 for all v. A matrix can have all non-negative entries and not be PSD (e.g., [[0,1],[1,0]] has eigenvalues ±1), and conversely can be PSD with negative off-diagonal entries (e.g., [[2,−1],[−1,2]] has eigenvalues 1 and 3, both positive).
- *Misconception:* SDPs are too slow to use in practice — they only work for tiny toy problems.
  *Correction:* Modern SDP solvers (MOSEK, SCS, CVXOPT) handle problems with hundreds to thousands of variables in seconds. SDP solvers underpin a huge range of practical applications: control synthesis (YALMIP/LMI toolboxes), relaxations in combinatorial optimization, covariance estimation, and semidefinite relaxations in signal processing — these are production tools used daily in industry and research.

**Visual teaching opportunities**

- 3×3 diagram of the cone hierarchy: LP ⊂ SOCP ⊂ SDP, with arrows indicating that every LP feasible set is an SDP feasible set, and the additional expressiveness gained at each level.
- 2×2 PSD cone visualization in matrix-entry space: the set {(a,b,c) : [[a,b],[b,c]] ⪰ 0} = {ac ≥ b², a ≥ 0, c ≥ 0} visualized as a cone in 3D — show the cross-section for fixed a+c = 1.
- MAX-CUT SDP diagram: graph with edge weights, embedding of vertices as unit vectors in ℝ² after SDP solve, random hyperplane cutting through the sphere, and the resulting cut — illustrate why vectors at angle θ contribute (1/π)arccos(θ·inner product) to the expected cut value.

**Worked example**

*Problem:* Solve the smallest eigenvalue SDP: minimize λ subject to X − λI ⪰ 0, X = [[3,1],[1,2]], equivalently: find λ_min([[3,1],[1,2]]) by formulating as an SDP and verifying strong duality.

1. Step 1 — Formulate as SDP: Finding the minimum eigenvalue of A = [[3,1],[1,2]] is equivalent to the SDP: maximize t subject to A − tI ⪰ 0, t ∈ ℝ. In standard form: maximize Tr(I₂·Y) over Y = A − tI, Y ⪰ 0 — this is an SDP in variable t with one scalar constraint.
2. Step 2 — Dual SDP: The primal is: max t s.t. A − tI ⪰ 0. The dual variable is Z ⪰ 0 (a 2×2 PSD matrix). The dual is: min Tr(AZ) s.t. Tr(IZ) = 1, Z ⪰ 0. This asks: minimize the Rayleigh quotient Tr(AZ)/Tr(Z) over PSD Z with Tr(Z) = 1. This is itself related to the eigenvalue problem.
3. Step 3 — Solve: char polynomial det(A − λI) = (3−λ)(2−λ) − 1 = λ² − 5λ + 5 = 0, so λ = (5 ± √5)/2. Thus λ_min = (5 − √5)/2 ≈ 1.382 and λ_max = (5 + √5)/2 ≈ 3.618.
4. Step 4 — Primal feasibility: At t* = (5−√5)/2, check A − t*I ⪰ 0. Eigenvalues of A − t*I are λ_min − t* = 0 and λ_max − t* = √5 > 0. Matrix A − t*I ⪰ 0 — feasible with one zero eigenvalue (boundary of S₊²).
5. Step 5 — Strong duality verification: The dual optimum is Tr(AZ*) where Z* is the PSD matrix with Tr(Z*)=1 projecting onto the minimum eigenvector v. Eigenvector of λ_min: solve (A − λ_minI)v = 0. v ≈ (−0.526, 0.851) (normalized). Z* = vvᵀ. Tr(AZ*) = vᵀAv = λ_min = t*. Strong duality holds: d* = p* = (5−√5)/2 ≈ 1.382.

*Answer:* The minimum eigenvalue of [[3,1],[1,2]] is λ_min = (5−√5)/2 ≈ 1.382, computed as the optimal value of the SDP: max t s.t. A − tI ⪰ 0. Strong duality holds with p* = d* = λ_min, demonstrated by constructing dual feasible Z* = vvᵀ with v the minimum eigenvector.

**Real-world intuition**

- Control theory (LMI/Lyapunov): a linear system ẋ = Ax is stable iff there exists P ⪻ 0 satisfying AᵀP + PA ⪻ 0 — an SDP in P. YALMIP and CVX toolboxes solve thousands of such LMIs daily in control design.
- Quantum information: density matrices ρ ⪰ 0, Tr(ρ) = 1 are PSD — quantum state tomography, channel capacity, and entanglement measures are all SDPs over the set of density matrices.
- Signal processing (phase retrieval, MIMO beamforming): lifting techniques represent quadratic constraints as linear constraints on rank-1 PSD matrices, then relax to SDPs — SDP relaxations power modern array signal processing.

**Practice progression**

*Fluency:*
  - V
  - e
  - r
  - i
  - f
  - y
  -  
  - t
  - h
  - a
  - t
  -  
  - X
  -  
  - =
  -  
  - [
  - [
  - 4
  - ,
  - 2
  - ]
  - ,
  - [
  - 2
  - ,
  - 1
  - ]
  - ]
  -  
  - i
  - s
  -  
  - P
  - S
  - D
  -  
  - o
  - r
  -  
  - n
  - o
  - t
  -  
  - b
  - y
  -  
  - c
  - h
  - e
  - c
  - k
  - i
  - n
  - g
  -  
  - e
  - i
  - g
  - e
  - n
  - v
  - a
  - l
  - u
  - e
  - s
  - .
  -  
  - T
  - h
  - e
  - n
  -  
  - w
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - S
  - D
  - P
  -  
  - t
  - h
  - a
  - t
  -  
  - c
  - e
  - r
  - t
  - i
  - f
  - i
  - e
  - s
  -  
  - λ
  - _
  - m
  - i
  - n
  - (
  - X
  - )
  -  
  - ≥
  -  
  - 0
  - .
*Conceptual:*
  - E
  - x
  - p
  - l
  - a
  - i
  - n
  -  
  - w
  - h
  - y
  -  
  - t
  - h
  - e
  -  
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - t
  -  
  - X
  -  
  - ⪰
  -  
  - 0
  -  
  - i
  - n
  -  
  - a
  - n
  -  
  - S
  - D
  - P
  -  
  - i
  - s
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - .
  -  
  - I
  - s
  -  
  - t
  - h
  - e
  -  
  - s
  - e
  - t
  -  
  - {
  - X
  -  
  - :
  -  
  - X
  -  
  - ⪰
  -  
  - 0
  -  
  - a
  - n
  - d
  -  
  - X
  -  
  - ⪯
  -  
  - I
  - }
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - ?
  -  
  - P
  - r
  - o
  - v
  - e
  -  
  - o
  - r
  -  
  - g
  - i
  - v
  - e
  -  
  - a
  -  
  - c
  - o
  - u
  - n
  - t
  - e
  - r
  - e
  - x
  - a
  - m
  - p
  - l
  - e
  - .
*Problem solving:*
  - F
  - o
  - r
  - m
  - u
  - l
  - a
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - M
  - A
  - X
  - -
  - C
  - U
  - T
  -  
  - S
  - D
  - P
  -  
  - r
  - e
  - l
  - a
  - x
  - a
  - t
  - i
  - o
  - n
  -  
  - f
  - o
  - r
  -  
  - a
  -  
  - t
  - r
  - i
  - a
  - n
  - g
  - l
  - e
  -  
  - g
  - r
  - a
  - p
  - h
  -  
  - (
  - 3
  -  
  - v
  - e
  - r
  - t
  - i
  - c
  - e
  - s
  - ,
  -  
  - e
  - d
  - g
  - e
  - s
  -  
  - {
  - 1
  - 2
  - ,
  -  
  - 1
  - 3
  - ,
  -  
  - 2
  - 3
  - }
  -  
  - e
  - a
  - c
  - h
  -  
  - w
  - i
  - t
  - h
  -  
  - w
  - e
  - i
  - g
  - h
  - t
  -  
  - 1
  - )
  - .
  -  
  - T
  - h
  - e
  -  
  - S
  - D
  - P
  -  
  - v
  - a
  - r
  - i
  - a
  - b
  - l
  - e
  -  
  - i
  - s
  -  
  - X
  -  
  - =
  -  
  - V
  - V
  - ᵀ
  -  
  - ∈
  -  
  - S
  - ₊
  - ³
  -  
  - w
  - i
  - t
  - h
  -  
  - X
  - ᵢ
  - ᵢ
  -  
  - =
  -  
  - 1
  - .
  -  
  - W
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - S
  - D
  - P
  - ,
  -  
  - s
  - o
  - l
  - v
  - e
  -  
  - i
  - t
  -  
  - (
  - h
  - i
  - n
  - t
  - :
  -  
  - b
  - y
  -  
  - s
  - y
  - m
  - m
  - e
  - t
  - r
  - y
  -  
  - t
  - h
  - e
  -  
  - o
  - p
  - t
  - i
  - m
  - a
  - l
  -  
  - X
  -  
  - h
  - a
  - s
  -  
  - X
  - ᵢ
  - ⱼ
  -  
  - =
  -  
  - −
  - 1
  - /
  - 2
  -  
  - f
  - o
  - r
  -  
  - i
  -  
  - ≠
  -  
  - j
  - )
  - ,
  -  
  - a
  - n
  - d
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - S
  - D
  - P
  -  
  - o
  - b
  - j
  - e
  - c
  - t
  - i
  - v
  - e
  -  
  - v
  - a
  - l
  - u
  - e
  - .
  -  
  - C
  - o
  - m
  - p
  - a
  - r
  - e
  -  
  - t
  - o
  -  
  - t
  - h
  - e
  -  
  - t
  - r
  - u
  - e
  -  
  - M
  - A
  - X
  - -
  - C
  - U
  - T
  -  
  - v
  - a
  - l
  - u
  - e
  -  
  - o
  - f
  -  
  - 2
  - .

**Assessment objectives**

*MCQ:* Under Slater's condition for an SDP (both primal and dual are strictly feasible), which statement is TRUE? (A) Strong duality holds: p* = d* — CORRECT. (B) Strong duality holds but the optimal may not be attained. (C) The duality gap is at most 1/n. (D) Slater's condition is not needed for SDPs since they are always strictly convex.
*Short answer:* Define the Schur complement. Show that the block matrix M = [[A, B],[Bᵀ, C]] ⪰ 0 (with A ⪰ 0) if and only if C − BᵀA⁻¹B ⪰ 0 (the Schur complement of A in M). Why is this useful for formulating SDPs?
*Proof/derivation:* Prove that the PSD cone S₊ⁿ is convex: if X ⪰ 0 and Y ⪰ 0, show that αX + (1−α)Y ⪰ 0 for all α ∈ [0,1]. Then show S₊ⁿ is a cone: if X ⪰ 0 and t ≥ 0, then tX ⪰ 0.

**Intuition**

Linear programming optimizes over a polyhedron — the intersection of halfspaces in ℝⁿ. SDP does the same thing in a higher-dimensional space: the space of symmetric n×n matrices, with the 'positive semidefinite cone' playing the role of the non-negative orthant. The cone of PSD matrices is smooth (no corners except at 0) and self-dual, which is why SDP duality is so clean. Every LP is an SDP — just restrict to diagonal matrices. But SDPs can express constraints that LPs cannot: 'the signal-to-noise ratio matrix is non-negative definite' or 'this dynamical system is stable' are SDP constraints but not LP constraints. The price is a larger problem: instead of n variables you have n² matrix entries, and each Newton step costs more. But modern interior-point solvers handle SDPs with thousands of constraints routinely.

**Historical context**

The SDP framework crystallized in the early 1990s through work of Nesterov & Nemirovski (1994) who showed interior-point methods extend to SDPs and other conic programs. The field exploded when Goemans & Williamson (1995) used SDP to achieve a 0.878-approximation for MAX-CUT — previously the best known approximation was 0.5. Their technique of 'semidefinite relaxation + randomized rounding' spawned a generation of approximation algorithms. Lasserre (2001) showed that polynomial optimization over semialgebraic sets can be solved by a hierarchy of SDPs (the SOS/Lasserre hierarchy), connecting SDP to real algebraic geometry.

**Connections**

SDP generalizes LP and SOCP in the convex cone hierarchy (math.opt.convex-optimization, math.opt.linear-programming); PSD constraints come from the spectral theory of symmetric matrices (math.linalg.positive-definite, math.linalg.svd); duality parallels LP duality with the cone S₊ⁿ replacing ℝ₊ⁿ (math.opt.duality); interior-point methods generalize the log-barrier from LP/QP (math.opt.kkt).

**Common errors (deep dive)**

A subtle but critical error: confusing 'X ⪰ 0' (PSD, about the matrix) with 'all entries of X are ≥ 0' (entrywise non-negative, about the values). SDP uses the former. Students also frequently forget that SDPs can fail to attain their optimum when Slater's condition is violated — the infimum is achieved by a sequence of feasible points but the limit is not feasible, causing numerical solvers to report 'inaccurate' or 'optimal (inaccurate)' solutions. Always check strict feasibility before trusting an SDP solution.

**Exam strategy**

For SDP problems, always write the standard form explicitly (Tr(CX), Tr(AᵢX) = bᵢ, X ⪰ 0) before solving — this makes duality transparent. To verify X* ⪰ 0, compute eigenvalues (2×2: use the discriminant formula). For duality, write the dual and check Slater's condition to invoke strong duality. For MAX-CUT style problems, the key identity is: E[cut(S)] = (1/π)Σ_{(i,j)∈E} wᵢⱼ · arccos(xᵢᵀxⱼ) ≥ 0.878 · Σwᵢⱼ · (1−xᵢᵀxⱼ)/2.

**Socratic questions**

- Every LP can be formulated as an SDP. Can every SDP be formulated as an LP? If not, what is the fundamental obstruction?
- The SDP duality gap can be positive even when both primal and dual are feasible — give an example (or explain the standard example with a 3×3 block matrix). Why doesn't this happen for LPs?
- The Goemans-Williamson algorithm achieves 0.878-approximation for MAX-CUT. Is it possible to do better using a different rounding scheme with the same SDP relaxation? What does the Unique Games Conjecture say about this?
- Why is log-det a natural barrier for the PSD cone, and what self-concordance property makes it usable in Newton's method without a trust region?

**Prerequisite graph**

- Requires: math.opt.convex-optimization, math.linalg.positive-definite
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- Student cannot define positive semidefinite → review spectral theorem and eigenvalue decomposition (math.linalg.positive-definite): X ⪰ 0 iff all eigenvalues ≥ 0 iff X = QΛQᵀ with Λ ≥ 0 entrywise.
- Student cannot perform trace inner product → review matrix norms and inner products (math.linalg.matrix-norm): Tr(AᵀB) is the Frobenius inner product on the space of matrices.
- Student cannot identify convex optimization structure → review convex optimization hierarchy (math.opt.convex-optimization): SDP is convex (cone constraint is convex), so local minimum = global minimum, and interior-point methods apply.

**Spaced repetition / revision guidance**



---

### Duality Theory

*Concept ID: `math.opt.duality` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.75 · Estimated study time: 6h*

**Learning objective.** Derive the Lagrange dual problem from a primal optimization problem, state weak and strong duality theorems, and apply LP duality to interpret dual variables as shadow prices and to derive complementary slackness conditions.

Lagrange dual: g(λ,ν) = inf_x L(x,λ,ν) where L is the Lagrangian. Weak duality: d*≤p* always. Strong duality (d*=p*): holds for convex problems under Slater's constraint qualification (strictly feasible point). Dual certifies optimality.

Given the primal problem (P): min f(x) s.t. gᵢ(x)≤0, hⱼ(x)=0, the Lagrangian is L(x,μ,λ)=f(x)+∑μᵢgᵢ(x)+∑λⱼhⱼ(x) (μ≥0). The Lagrange dual function g(μ,λ) = inf_x L(x,μ,λ) is always concave (as infimum of affine functions in (μ,λ)). The dual problem (D): max g(μ,λ) s.t. μ≥0. Weak duality: d* ≤ p* (dual optimal ≤ primal optimal) always holds. Strong duality: d*=p* (zero duality gap) holds under Slater's condition for convex problems. LP duality: every LP has a dual LP; strong duality always holds for LPs with finite optima.

**Key ideas**

- Lagrange dual function: g(μ,λ) = inf_{x∈dom f} L(x,μ,λ). Always concave (infimum of affine functions in (μ,λ)). May equal −∞ for some (μ,λ).
- Weak duality: g(μ,λ) ≤ f(x) for all primal-feasible x and dual-feasible (μ,λ). Proof: g(μ,λ)=inf_x L(x,μ,λ) ≤ L(x,μ,λ)=f(x)+∑μᵢgᵢ(x)+∑λⱼhⱼ(x) ≤ f(x) (since μᵢgᵢ≤0 and hⱼ=0 for feasible x, μ≥0). Hence d*≤p*.
- Strong duality: d*=p* — holds for convex problems under Slater's condition (∃ strictly feasible x̂: gᵢ(x̂)<0 for all i). The duality gap p*−d*=0.
- LP duality: primal LP min cᵀx s.t. Ax≥b, x≥0 has dual max bᵀy s.t. Aᵀy≤c, y≥0. Primal and dual are both LPs. Strong duality holds (if both feasible). Complementary slackness: xᵢ(Aᵀy−c)ᵢ=0 and yⱼ(Ax−b)ⱼ=0.
- Certificate of optimality: if (x*,μ*,λ*) satisfies KKT and d*=p*, then x* and (μ*,λ*) are certificates of global optimality for their respective problems.
- Duality gap: p*−d*≥0 always (weak duality). Gap=0 for convex+Slater. Non-zero gap for non-convex problems in general.

**Common misconceptions**

- *Misconception:* The dual problem is harder than the primal and not useful in practice.
  *Correction:* False. For many problems, the dual is easier to solve (lower dimension, simpler structure) or reveals structure (LP dual as shadow prices, SVM dual reveals support vectors). Strong duality means solving the dual gives the primal optimal value, and often the primal optimizer can be recovered from the dual solution.
- *Misconception:* Weak duality means the dual always gives a lower bound, not useful for solving the primal.
  *Correction:* The dual lower bound becomes tight (equals p*) under strong duality. This converts the primal problem into a max problem over a concave function—often easier. Interior-point methods simultaneously solve primal and dual, using the duality gap as a stopping criterion.
- *Misconception:* Strong duality holds for all optimization problems.
  *Correction:* Strong duality is NOT universal. For non-convex problems, there is generally a positive duality gap. Even for convex problems, if Slater's condition fails (no strictly feasible point), strong duality may fail (e.g., infeasible primal, feasible dual with finite dual optimal).

**Visual teaching opportunities**

- Weak duality diagram: x-axis = primal feasible set, y-axis = dual feasible set. Mark p* (primal optimal) and d* (dual optimal) with d*≤p*. Arrow showing 'duality gap' p*−d*≥0. For strong duality: d*=p*, no gap.
- LP duality table: write standard LP in primal form (min cᵀx, Ax≥b, x≥0) and dual form (max bᵀy, Aᵀy≤c, y≥0). Label: primal rows → dual variables, primal variables → dual constraints.
- Certificate of optimality: draw a primal feasible point x* and a dual feasible (μ*,λ*) with g(μ*,λ*)=f(x*)=p*=d*. The gap is zero, proving both are optimal.

**Worked example**

*Problem:* Derive the dual of the LP: min cᵀx s.t. Ax=b, x≥0 (standard equality form), and verify weak duality.

1. Lagrangian: L(x,λ,μ) = cᵀx + λᵀ(b−Ax) − μᵀx = bᵀλ + (c−Aᵀλ−μ)ᵀx, where λ∈ℝᵐ (free, for equality constraints) and μ≥0 (for −x≤0).
2. Dual function: g(λ,μ) = inf_{x≥0} L(x,λ,μ) = bᵀλ + inf_{x≥0}(c−Aᵀλ−μ)ᵀx. The infimum over x≥0 of a linear function in x is: 0 if c−Aᵀλ−μ≥0 (coefficient is non-negative, minimized at x=0), and −∞ otherwise.
3. So g(λ,μ) = bᵀλ if c−Aᵀλ−μ≥0, else −∞. The dual problem: max_{λ,μ} g(λ,μ) = max bᵀλ s.t. Aᵀλ+μ=c, μ≥0. Since μ≥0, this means Aᵀλ≤c.
4. Simplified dual: max bᵀλ s.t. Aᵀλ≤c (absorbing μ into the constraint). This is the standard dual of the standard-form LP. ✓
5. Weak duality verification: for primal-feasible x (Ax=b, x≥0) and dual-feasible λ (Aᵀλ≤c): cᵀx ≥ (Aᵀλ)ᵀx = λᵀ(Ax) = λᵀb = bᵀλ. So cᵀx ≥ bᵀλ for any feasible pair. ✓

*Answer:* Dual of min cᵀx, Ax=b, x≥0 is max bᵀλ, Aᵀλ≤c. Weak duality: cᵀx≥bᵀλ for any primal-feasible x and dual-feasible λ. Strong duality (LP): cᵀx*=bᵀλ* at optimal solutions.

**Real-world intuition**

- LP duality in economics: the dual of a production LP gives shadow prices (dual variables) for resource constraints — the marginal value of each resource. Zero dual gap means primal and dual shadow prices agree.
- Max-flow/min-cut duality: the LP relaxation of max-flow equals the min-cut by LP strong duality — a fundamental result in combinatorial optimization.
- SDP relaxations: the dual of an SDP relaxation of a combinatorial problem (e.g., MAX-CUT SDP) gives an upper bound on the combinatorial optimal, which can often be shown tight (giving approximation ratios).

**Practice progression**

*Fluency:*
  - W
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - d
  - u
  - a
  - l
  -  
  - o
  - f
  - :
  -  
  - (
  - a
  - )
  -  
  - m
  - i
  - n
  -  
  - 3
  - x
  - ₁
  - +
  - 2
  - x
  - ₂
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ₁
  - +
  - x
  - ₂
  - ≥
  - 4
  - ,
  -  
  - 2
  - x
  - ₁
  - +
  - x
  - ₂
  - ≥
  - 6
  - ,
  -  
  - x
  - ₁
  - ,
  - x
  - ₂
  - ≥
  - 0
  - .
  -  
  - (
  - b
  - )
  -  
  - m
  - i
  - n
  -  
  - |
  - |
  - x
  - |
  - |
  - ²
  -  
  - s
  - .
  - t
  - .
  -  
  - A
  - x
  - =
  - b
  -  
  - (
  - f
  - i
  - n
  - d
  -  
  - d
  - u
  - a
  - l
  -  
  - a
  - n
  - a
  - l
  - y
  - t
  - i
  - c
  - a
  - l
  - l
  - y
  -  
  - a
  - s
  -  
  - a
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - b
  - )
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - w
  - e
  - a
  - k
  -  
  - d
  - u
  - a
  - l
  - i
  - t
  - y
  -  
  - f
  - r
  - o
  - m
  -  
  - t
  - h
  - e
  -  
  - d
  - e
  - f
  - i
  - n
  - i
  - t
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - t
  - h
  - e
  -  
  - d
  - u
  - a
  - l
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  - .
  -  
  - E
  - x
  - p
  - l
  - a
  - i
  - n
  -  
  - w
  - h
  - y
  -  
  - s
  - t
  - r
  - o
  - n
  - g
  -  
  - d
  - u
  - a
  - l
  - i
  - t
  - y
  -  
  - f
  - a
  - i
  - l
  - s
  -  
  - i
  - n
  -  
  - g
  - e
  - n
  - e
  - r
  - a
  - l
  -  
  - f
  - o
  - r
  -  
  - n
  - o
  - n
  - -
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  - s
  - .
*Problem solving:*
  - S
  - o
  - l
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - d
  - u
  - a
  - l
  -  
  - o
  - f
  -  
  - a
  -  
  - 2
  - -
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - t
  -  
  - L
  - P
  -  
  - a
  - n
  - d
  -  
  - v
  - e
  - r
  - i
  - f
  - y
  -  
  - c
  - o
  - m
  - p
  - l
  - e
  - m
  - e
  - n
  - t
  - a
  - r
  - y
  -  
  - s
  - l
  - a
  - c
  - k
  - n
  - e
  - s
  - s
  - :
  -  
  - x
  - ᵢ
  - (
  - c
  - ᵢ
  - −
  - A
  - ᵢ
  - ᵀ
  - λ
  - *
  - )
  - =
  - 0
  -  
  - a
  - n
  - d
  -  
  - λ
  - ⱼ
  - *
  - (
  - A
  - ⱼ
  - x
  - *
  - −
  - b
  - ⱼ
  - )
  - =
  - 0
  - .

**Assessment objectives**

*MCQ:* Weak duality states: (A) d*=p* always (B) d*≤p* always (C) d*≥p* always (D) d* and p* are unrelated. Answer: B.
*Short answer:* Define the Lagrange dual function. Prove it is concave in (μ,λ). State Slater's condition and explain why it guarantees strong duality.
*Proof/derivation:* Prove weak duality: for any primal-feasible x and dual-feasible (μ,λ), g(μ,λ)≤f(x). (Use the definition g(μ,λ)=inf_z L(z,μ,λ) ≤ L(x,μ,λ) ≤ f(x) for feasible x and μ≥0.)

**Intuition**

Duality is about finding lower bounds for a minimization problem. For any dual-feasible (μ,λ), the dual function g(μ,λ) gives a lower bound on the primal optimal p*. Maximizing g over dual-feasible (μ,λ) gives the best lower bound d*. Weak duality says d*≤p* always. Strong duality says d*=p* — the best lower bound is actually tight, and the dual solution certifies the primal solution is optimal. This is the mathematical equivalent of having a 'witness' for the answer: the dual solution proves the primal solution can't be improved.

**Historical context**

LP duality was discovered simultaneously by John von Neumann (game-theoretic perspective, 1928/1947) and George Dantzig (operational, 1947). The economic interpretation of dual variables as shadow prices was developed by Koopmans, Samuelson, and Dantzig in the late 1940s. General convex duality (Fenchel duality, Lagrangian duality) was developed by Fenchel (1949), Rockafellar (1970), and formalized by Ekeland and Temam (1976). Strong duality for SDP was established by Nesterov and Nemirovski (1994).

**Connections**

Duality is the theoretical foundation of the KKT conditions (math.opt.kkt): strong duality + primal and dual feasibility ↔ KKT conditions. LP duality underlies the simplex method's dual phase (math.opt.simplex-method). SDP duality enables semidefinite programming (math.opt.semidefinite-programming). In game theory, LP duality corresponds to the minimax theorem.

**Common errors (deep dive)**

The most common error is confusing weak and strong duality. Weak duality is always true (d*≤p*); strong duality requires additional conditions (convexity + Slater, or LP feasibility). A common exam trap: 'strong duality holds because the dual is bounded above and the primal is bounded below' — this is not sufficient without checking Slater's condition or LP feasibility. Also: dual variables for equality constraints are free (any sign), but dual variables for inequality constraints must be non-negative — a frequent sign error.

**Exam strategy**

For LP duality: use the recipe (primal min cᵀx, Ax≥b, x≥0 → dual max bᵀy, Aᵀy≤c, y≥0). For general dual derivation: write the Lagrangian, compute g(μ,λ)=inf_x L(x,μ,λ) (minimize over x for fixed μ,λ), and identify the feasible domain of the dual. To prove strong duality: invoke Slater's condition (strictly feasible point) for convex programs.

**Socratic questions**

- Prove weak duality using only the definition of the dual function g(μ,λ)=inf_x L(x,μ,λ). Why is g always a lower bound on f(x) for feasible x?
- State Slater's condition. Give an example of a convex optimization problem where Slater's condition fails and strong duality does not hold.
- In LP duality, if the primal is infeasible, what can you conclude about the dual? If the primal is unbounded?
- State LP complementary slackness precisely. Use it to check optimality of a primal-dual pair without computing the objective.

**Prerequisite graph**

- Requires: math.opt.convex-optimization
- Unlocks (future prerequisite links): math.opt.kkt
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student has not seen LP in standard form, review math.opt.linear-programming (LP formulation and geometry) before duality.
- If the student is unfamiliar with infimum of linear functions, introduce the concept: inf_{x≥0} cᵀx = 0 if c≥0, else −∞.

**Spaced repetition / revision guidance**



---

### KKT Conditions

*Concept ID: `math.opt.kkt` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** State the Karush-Kuhn-Tucker (KKT) conditions for constrained optimization, verify KKT optimality for concrete problems, and apply KKT conditions as both necessary (under constraint qualification) and sufficient (for convex problems) conditions for global optimality.

Necessary conditions for optimality in constrained optimization: stationarity (∇L=0), primal feasibility, dual feasibility (λᵢ≥0), complementary slackness (λᵢfᵢ(x*)=0). Sufficient for convex programs. Generalize Lagrange multipliers to inequality constraints.

The KKT conditions generalize Lagrange multipliers to inequality constraints. For min f(x) s.t. gᵢ(x)≤0 (i=1,…,m), hⱼ(x)=0 (j=1,…,p), the KKT conditions at a local minimum x* (under a constraint qualification) are: (1) Primal feasibility: gᵢ(x*)≤0, hⱼ(x*)=0. (2) Dual feasibility: μᵢ≥0 (KKT multipliers for inequalities). (3) Stationarity: ∇f(x*)+∑μᵢ∇gᵢ(x*)+∑λⱼ∇hⱼ(x*)=0. (4) Complementary slackness: μᵢgᵢ(x*)=0 for all i. For convex problems with Slater's condition, KKT is also sufficient for global optimality.

**Key ideas**

- Four KKT conditions: (1) Primal feasibility (constraints satisfied); (2) Dual feasibility (μᵢ≥0 for inequality multipliers); (3) Stationarity (gradient of Lagrangian=0); (4) Complementary slackness (μᵢgᵢ=0: either the constraint is active or its multiplier is zero).
- Complementary slackness: μᵢ>0 ⟹ gᵢ(x*)=0 (inequality is active/tight); gᵢ(x*)<0 ⟹ μᵢ=0 (inactive constraint has zero multiplier). This identifies which constraints are 'binding' at the optimum.
- Constraint qualification (CQ): KKT conditions are necessary for a local minimum only when a CQ holds. The most common CQ for convex problems is Slater's condition (strict feasibility: ∃ x̂ with gᵢ(x̂)<0 and hⱼ(x̂)=0).
- Sufficiency for convex problems: if x* satisfies KKT conditions and the problem is convex (f,gᵢ convex, hⱼ affine), then x* is the global minimum. Proof via the first-order characterization of convex functions.
- Economic interpretation: μᵢ is the shadow price of constraint gᵢ — the rate of decrease of the optimal objective value per unit relaxation of constraint i. μᵢ=0 for inactive constraints (relaxing them doesn't help).
- Active set: I(x*)={i: gᵢ(x*)=0} are the active (binding) inequality constraints. The KKT conditions reduce to Lagrange conditions for only the active constraints.

**Common misconceptions**

- *Misconception:* KKT conditions are always necessary and sufficient for optimality.
  *Correction:* KKT conditions are (1) necessary only under a constraint qualification (e.g., Slater's condition, LICQ, or Mangasarian-Fromovitz), and (2) sufficient only for convex problems. For non-convex problems, KKT conditions identify candidate solutions but do not guarantee they are global optima.
- *Misconception:* Complementary slackness means either μᵢ=0 or gᵢ=0, but not both.
  *Correction:* Complementary slackness μᵢgᵢ=0 allows BOTH μᵢ=0 AND gᵢ=0 simultaneously (strict complementarity fails). Strict complementarity (exactly one of μᵢ,gᵢ=0) is a non-degeneracy condition that may not hold at the optimum.
- *Misconception:* The multiplier μᵢ for the constraint gᵢ(x)≤0 can be negative.
  *Correction:* For inequality constraints gᵢ≤0, the KKT multiplier must satisfy μᵢ≥0. Negative multipliers would imply the constraint is 'helping' the objective in a way that is geometrically inconsistent with the Lagrangian. For equality constraints h(x)=0, the multiplier λⱼ can be any sign.

**Visual teaching opportunities**

- 2D diagram: min x²+y² s.t. x+y≥2, x,y≥0. Draw the feasible region (triangle). At the optimum (1,1): ∇f=(2,2) points away from the feasible region; ∇g₁=(−1,−1) points into the feasible region. KKT: (2,2)=μ₁(1,1), so μ₁=2>0. g₁=x+y−2=0 (active). ✓
- Complementary slackness illustration: at the optimum, inactive constraints (gᵢ<0) have zero multipliers (μᵢ=0, constraint is irrelevant); active constraints (gᵢ=0) have positive multipliers (μᵢ>0, constraint is binding).
- KKT flow chart: check primal feasibility → dual feasibility → stationarity → complementary slackness. Use a checklist format for students to verify KKT at candidate solutions.

**Worked example**

*Problem:* Verify KKT conditions for the problem: min f(x,y)=x²+y² s.t. g₁(x,y)=x+y−2≤0... Wait—let us use the standard form. Minimize f(x,y)=x²+y² subject to g₁=−x−y+2≤0 (i.e., x+y≥2), g₂=−x≤0 (x≥0), g₃=−y≤0 (y≥0).

1. Candidate solution: x*=(1,1). Check primal feasibility: g₁=−1−1+2=0 ✓ (active); g₂=−1≤0 ✓ (inactive); g₃=−1≤0 ✓ (inactive).
2. KKT stationarity: ∇f+μ₁∇g₁+μ₂∇g₂+μ₃∇g₃=0. ∇f=(2x,2y)=(2,2). ∇g₁=(−1,−1). ∇g₂=(−1,0). ∇g₃=(0,−1). System: (2,2)+μ₁(−1,−1)+μ₂(−1,0)+μ₃(0,−1)=(0,0). Equations: 2−μ₁−μ₂=0 and 2−μ₁−μ₃=0.
3. Complementary slackness: g₁=0 (active) → μ₁ can be nonzero ✓. g₂=−1<0 (inactive) → μ₂=0. g₃=−1<0 (inactive) → μ₃=0.
4. Substituting μ₂=μ₃=0: 2−μ₁=0 → μ₁=2. Check dual feasibility: μ₁=2≥0 ✓, μ₂=μ₃=0≥0 ✓.
5. All four KKT conditions satisfied. Since the problem is convex (f convex, all gᵢ linear hence convex), x*=(1,1) is the global minimum. f(1,1)=2. ✓

*Answer:* KKT conditions are satisfied at (1,1) with μ₁=2, μ₂=μ₃=0. The constraint x+y≥2 is active (binding) with shadow price μ₁=2: relaxing x+y≥2 to x+y≥2−ε reduces the optimal value by approximately 2ε.

**Real-world intuition**

- Support vector machines: the SVM training problem has KKT conditions whose multipliers (support vectors) identify the data points on the margin. Complementary slackness means non-support-vector points have zero multipliers.
- Portfolio optimization with constraints: KKT conditions for mean-variance optimization with short-selling constraints give the active set of binding constraints — which assets are at their bounds.
- Control systems: the KKT conditions for Model Predictive Control (MPC) give the active constraints on actuator limits, enabling efficient warm-starting between control steps.

**Practice progression**

*Fluency:*
  - W
  - r
  - i
  - t
  - e
  -  
  - d
  - o
  - w
  - n
  -  
  - t
  - h
  - e
  -  
  - K
  - K
  - T
  -  
  - c
  - o
  - n
  - d
  - i
  - t
  - i
  - o
  - n
  - s
  -  
  - f
  - o
  - r
  - :
  -  
  - m
  - i
  - n
  -  
  - x
  - ²
  - +
  - y
  - ²
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - ²
  - +
  - y
  - ²
  - ≤
  - 4
  - ,
  -  
  - x
  - +
  - y
  - ≥
  - 1
  - .
  -  
  - I
  - d
  - e
  - n
  - t
  - i
  - f
  - y
  -  
  - w
  - h
  - i
  - c
  - h
  -  
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - t
  - s
  -  
  - a
  - r
  - e
  -  
  - a
  - c
  - t
  - i
  - v
  - e
  -  
  - a
  - n
  - d
  -  
  - f
  - i
  - n
  - d
  -  
  - t
  - h
  - e
  -  
  - K
  - K
  - T
  -  
  - m
  - u
  - l
  - t
  - i
  - p
  - l
  - i
  - e
  - r
  - s
  -  
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - o
  - b
  - v
  - i
  - o
  - u
  - s
  -  
  - c
  - a
  - n
  - d
  - i
  - d
  - a
  - t
  - e
  -  
  - s
  - o
  - l
  - u
  - t
  - i
  - o
  - n
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - K
  - K
  - T
  -  
  - c
  - o
  - n
  - d
  - i
  - t
  - i
  - o
  - n
  - s
  -  
  - a
  - r
  - e
  -  
  - s
  - u
  - f
  - f
  - i
  - c
  - i
  - e
  - n
  - t
  -  
  - f
  - o
  - r
  -  
  - g
  - l
  - o
  - b
  - a
  - l
  -  
  - o
  - p
  - t
  - i
  - m
  - a
  - l
  - i
  - t
  - y
  -  
  - i
  - n
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - p
  - r
  - o
  - g
  - r
  - a
  - m
  - s
  - .
  -  
  - (
  - A
  - s
  - s
  - u
  - m
  - e
  -  
  - x
  - *
  -  
  - s
  - a
  - t
  - i
  - s
  - f
  - i
  - e
  - s
  -  
  - K
  - K
  - T
  -  
  - a
  - n
  - d
  -  
  - u
  - s
  - e
  -  
  - t
  - h
  - e
  -  
  - f
  - i
  - r
  - s
  - t
  - -
  - o
  - r
  - d
  - e
  - r
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  - i
  - t
  - y
  -  
  - c
  - h
  - a
  - r
  - a
  - c
  - t
  - e
  - r
  - i
  - z
  - a
  - t
  - i
  - o
  - n
  -  
  - f
  - (
  - y
  - )
  - ≥
  - f
  - (
  - x
  - *
  - )
  - +
  - ∇
  - f
  - (
  - x
  - *
  - )
  - ᵀ
  - (
  - y
  - −
  - x
  - *
  - )
  -  
  - t
  - o
  -  
  - b
  - o
  - u
  - n
  - d
  -  
  - f
  - (
  - y
  - )
  -  
  - f
  - r
  - o
  - m
  -  
  - b
  - e
  - l
  - o
  - w
  -  
  - b
  - y
  -  
  - f
  - (
  - x
  - *
  - )
  -  
  - f
  - o
  - r
  -  
  - a
  - l
  - l
  -  
  - f
  - e
  - a
  - s
  - i
  - b
  - l
  - e
  -  
  - y
  - .
  - )
*Problem solving:*
  - S
  - o
  - l
  - v
  - e
  - :
  -  
  - m
  - i
  - n
  - i
  - m
  - i
  - z
  - e
  -  
  - −
  - l
  - o
  - g
  - (
  - x
  - )
  - −
  - l
  - o
  - g
  - (
  - y
  - )
  -  
  - s
  - u
  - b
  - j
  - e
  - c
  - t
  -  
  - t
  - o
  -  
  - x
  - +
  - y
  - ≤
  - 1
  - ,
  -  
  - x
  - ,
  - y
  - >
  - 0
  - .
  -  
  - (
  - T
  - h
  - i
  - s
  -  
  - i
  - s
  -  
  - t
  - h
  - e
  -  
  - m
  - a
  - x
  - -
  - e
  - n
  - t
  - r
  - o
  - p
  - y
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - o
  - n
  -  
  - t
  - h
  - e
  -  
  - s
  - i
  - m
  - p
  - l
  - e
  - x
  - .
  - )
  -  
  - S
  - e
  - t
  -  
  - u
  - p
  -  
  - K
  - K
  - T
  - ,
  -  
  - s
  - o
  - l
  - v
  - e
  -  
  - f
  - o
  - r
  -  
  - x
  - *
  - ,
  - y
  - *
  - ,
  -  
  - a
  - n
  - d
  -  
  - v
  - e
  - r
  - i
  - f
  - y
  -  
  - a
  - l
  - l
  -  
  - c
  - o
  - n
  - d
  - i
  - t
  - i
  - o
  - n
  - s
  - .

**Assessment objectives**

*MCQ:* In the KKT conditions for min f(x) s.t. gᵢ(x)≤0, complementary slackness states: (A) μᵢ≥0 (B) gᵢ(x*)=0 for all i (C) μᵢ·gᵢ(x*)=0 for all i (D) μᵢ·gᵢ(x*)≥0 for all i. Answer: C.
*Short answer:* State all four KKT conditions. For each, give a geometric or economic interpretation.
*Proof/derivation:* Prove KKT sufficiency: if f,g₁,…,gₘ are convex, hⱼ affine, and (x*,μ*,λ*) satisfies KKT, then x* is a global minimum. (Use convexity of f and gᵢ via first-order characterization.)

**Intuition**

The KKT conditions say: at the constrained optimum, the gradient of the objective is a non-negative linear combination of the gradients of the active constraints. This has a clear geometric meaning: you cannot move in any feasible direction and reduce f—the gradient of f is 'blocked' by the active constraints. Complementary slackness is the key additional condition: inactive constraints (with slack) don't contribute to the optimality condition (their multiplier is zero), while active (tight) constraints may have positive multipliers.

**Historical context**

William Karush derived these conditions in his 1939 master's thesis at the University of Chicago, but his work went unnoticed. Harold Kuhn and Albert Tucker independently rediscovered and published the conditions in 1951 at a Princeton conference, giving them their common name. The KKT conditions are now the central object in constrained optimization theory, generalizing the Lagrange conditions of the 18th century to inequality constraints. The sufficiency theorem for convex programs was proved in the same 1951 paper.

**Connections**

KKT conditions are the optimality conditions for all convex optimization subclasses: LP (degeneracy analysis), QP (active-set methods), and SDP (complementarity conditions). They are equivalent to Lagrange conditions (math.opt.lagrange-multipliers) for equality-only problems. In duality theory (math.opt.duality), the KKT conditions are equivalent to zero duality gap — primal and dual optima coincide.

**Common errors (deep dive)**

The most common error is forgetting dual feasibility (μᵢ≥0): students solve the stationarity equations and find μᵢ<0, then wrongly conclude they've found the optimum. Negative multipliers indicate the candidate is not a KKT point for the minimization problem. Also: students apply KKT without checking constraint qualification — at a degenerate point (e.g., the constraint x²+y²=0 at (0,0)), KKT conditions may not hold even at the true optimum.

**Exam strategy**

For KKT problems: (1) identify all constraints gᵢ≤0 and hⱼ=0, (2) write the stationarity condition ∇f+∑μᵢ∇gᵢ+∑λⱼ∇hⱼ=0, (3) apply complementary slackness to determine which constraints are active (trial: assume constraint active, solve, check sign of μ), (4) verify all four conditions. In convex problems: a valid KKT point is THE global solution.

**Socratic questions**

- What is the difference between a KKT point and a local minimum? Under what conditions do they coincide?
- Complementary slackness says μᵢgᵢ=0. Give an example where both μᵢ=0 and gᵢ=0 (degenerate complementarity). Does this violate KKT?
- For the support vector machine, explain what it means for a data point to be a 'support vector' in terms of KKT multipliers.
- Slater's condition guarantees strong duality for convex problems. Give an example of a convex problem where Slater's condition fails and strong duality may fail.

**Prerequisite graph**

- Requires: math.opt.duality, math.opt.lagrange-multipliers
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student is unfamiliar with Lagrange multipliers for equality constraints, review math.opt.lagrange-multipliers before KKT.
- If the student cannot verify primal/dual feasibility in a concrete example, work through the 2D example step by step before abstracting.

**Spaced repetition / revision guidance**



---

### Lagrange Multipliers

*Concept ID: `math.opt.lagrange-multipliers` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** State and apply the Lagrange multiplier theorem for equality-constrained optimization, interpret the multiplier as a shadow price, and solve constrained optimization problems by solving the Lagrangian stationarity system.

For minimize f(x) subject to g(x)=0: at a local optimum, ∇f = λ∇g (∇f parallel to ∇g). The system ∇f=λ∇g, g(x)=0 has n+1 equations for n+1 unknowns (x,λ). Generalizes to multiple constraints.

The Lagrange multiplier method solves min f(x) subject to h(x) = 0 (h:ℝⁿ→ℝᵐ, m<n). The Lagrangian is L(x,λ) = f(x) + λᵀh(x). Necessary conditions (FONC): at a local minimum x* satisfying the regularity condition (rank(∇h(x*))=m), there exist multipliers λ*∈ℝᵐ such that ∇ₓL(x*,λ*)=0 and h(x*)=0. The multiplier λᵢ* is the shadow price: it equals dV*/dβᵢ where V*(β) is the optimal value when the constraint is h(x)=β. Geometrically: at the optimum, ∇f = −λᵀ∇h (the gradient of f is a linear combination of the constraint gradients — the level sets of f are tangent to the constraint manifold).

**Key ideas**

- Lagrangian: L(x,λ) = f(x) + ∑ᵢλᵢhᵢ(x). Stationarity conditions: ∇ₓL=0 (n equations) plus h(x)=0 (m equations) — a system of n+m equations in n+m unknowns (x,λ).
- Geometric interpretation: at the optimum, ∇f ∈ span{∇h₁,…,∇hₘ}. The level set of f is tangent to the constraint surface — you cannot improve f by moving along the constraint.
- Shadow price interpretation: λᵢ* = −∂V*/∂bᵢ where V*(b)=min{f(x):h(x)=b}. A multiplier of λᵢ=5 means relaxing constraint i by 1 unit reduces the optimal cost by 5.
- Regularity condition (constraint qualification): rank(∇h(x*))=m (the constraint gradients are linearly independent). Without this, Lagrange multipliers may not exist.
- Extension: equality plus inequality constraints handled by KKT conditions (math.opt.kkt). For equality only: SOSC requires ∇²ₓₓL restricted to the constraint tangent space to be PD.
- Classical example: minimize f(x,y)=x²+y² subject to x+y=1. Lagrangian: L=x²+y²+λ(x+y−1). ∇L=(2x+λ, 2y+λ, x+y−1)=0 → x=y=−λ/2, x+y=−λ=1, so λ=−1, x=y=1/2. Min=1/2.

**Common misconceptions**

- *Misconception:* The Lagrange multiplier gives the value of the constrained minimum.
  *Correction:* The multiplier λ* is the shadow price (sensitivity of the optimal value to the constraint). The optimal value is f(x*), not λ*. For the example above: optimal value=f(1/2,1/2)=1/2, multiplier λ*=−1.
- *Misconception:* The Lagrangian L(x,λ) is itself minimized over (x,λ) to find the solution.
  *Correction:* The Lagrange method finds a STATIONARY POINT of L (∇L=0), not a minimum of L over (x,λ). In general, L is unbounded in λ (if λ is unrestricted). The saddle-point interpretation of L applies in convex problems (min over x, max over λ).
- *Misconception:* Lagrange multipliers work for any constrained problem.
  *Correction:* The method requires the regularity condition (constraint gradients linearly independent at x*). At points where this fails (e.g., the constraint x²+y²=0 at (0,0) has gradient (0,0)), multipliers may not exist — these are degenerate points requiring separate analysis.

**Visual teaching opportunities**

- 2D diagram: f(x,y)=x²+y² as concentric circles (level sets). Constraint h(x,y)=x+y−1=0 as a line. At the optimum (1/2,1/2): the level set of f (circle of radius 1/√2) is tangent to the constraint line. ∇f=(1,1) is perpendicular to the constraint, matching −λ∇h=−(−1)(1,1)=(1,1). ✓
- Shadow price: draw V*(b) as the optimal value when the constraint is h=b. The slope dV*/db = −λ* at b=0 gives the sensitivity. For the example: V*(b)=(b/2)²+(b/2)²=b²/2, dV*/db|_{b=1}=1=−λ*=1. ✓
- 3D: constraint manifold as a surface in ℝ³, level sets of f as contour planes. Tangency condition visualized as the level plane touching the constraint surface from below.

**Worked example**

*Problem:* Minimize f(x,y,z) = x²+y²+z² subject to x+2y+3z=6 (find the point on the plane nearest the origin).

1. Lagrangian: L(x,y,z,λ) = x²+y²+z² + λ(x+2y+3z−6).
2. Stationarity: ∂L/∂x=2x+λ=0 → x=−λ/2. ∂L/∂y=2y+2λ=0 → y=−λ. ∂L/∂z=2z+3λ=0 → z=−3λ/2.
3. Constraint: x+2y+3z=6 → (−λ/2)+2(−λ)+3(−3λ/2) = −λ/2−2λ−9λ/2 = −λ(1/2+2+9/2) = −λ(14/2) = −7λ = 6. So λ=−6/7.
4. Optimal point: x=3/7, y=6/7, z=9/7.
5. Optimal value: f(3/7,6/7,9/7) = 9/49+36/49+81/49 = 126/49 = 18/7. Verify: distance from origin = √(18/7) = 3√2/√7. ✓ (This equals 6/√14 by the formula for point-plane distance d=|ax₀+by₀+cz₀−d|/√(a²+b²+c²) = 6/√(1+4+9) = 6/√14. ✓)

*Answer:* Minimum at (3/7, 6/7, 9/7) with value 18/7. Shadow price λ*=−6/7: relaxing the constraint from 6 to 7 would increase the minimum distance from 6/√14 to 7/√14, changing the optimal value by approximately 2/7·(7−6)=2/7 ≈ λ* · (change in constraint). ✓

**Real-world intuition**

- Economics: utility maximization subject to a budget constraint — the Lagrange multiplier is the marginal utility of income (how much utility increases per unit of additional budget).
- Physics: the principle of least action (Hamilton's principle) finds trajectories via Lagrange multipliers on the constraint that energy is conserved.
- Engineering: minimum-weight beam design subject to load constraints; the multipliers quantify the sensitivity of the design objective to each structural constraint.

**Practice progression**

*Fluency:*
  - A
  - p
  - p
  - l
  - y
  -  
  - L
  - a
  - g
  - r
  - a
  - n
  - g
  - e
  -  
  - m
  - u
  - l
  - t
  - i
  - p
  - l
  - i
  - e
  - r
  - s
  - :
  -  
  - (
  - a
  - )
  -  
  - m
  - i
  - n
  - i
  - m
  - i
  - z
  - e
  -  
  - x
  - ²
  - +
  - y
  - ²
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - +
  - y
  - =
  - 4
  -  
  - (
  - b
  - )
  -  
  - m
  - a
  - x
  - i
  - m
  - i
  - z
  - e
  -  
  - x
  - y
  -  
  - s
  - .
  - t
  - .
  -  
  - x
  - +
  - y
  - =
  - 1
  - ,
  -  
  - x
  - ,
  - y
  - ≥
  - 0
  - .
*Conceptual:*
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - L
  - a
  - g
  - r
  - a
  - n
  - g
  - e
  -  
  - m
  - u
  - l
  - t
  - i
  - p
  - l
  - i
  - e
  - r
  -  
  - t
  - h
  - e
  - o
  - r
  - e
  - m
  -  
  - g
  - e
  - o
  - m
  - e
  - t
  - r
  - i
  - c
  - a
  - l
  - l
  - y
  - :
  -  
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - e
  - d
  -  
  - o
  - p
  - t
  - i
  - m
  - u
  - m
  - ,
  -  
  - ∇
  - f
  -  
  - m
  - u
  - s
  - t
  -  
  - l
  - i
  - e
  -  
  - i
  - n
  -  
  - t
  - h
  - e
  -  
  - s
  - p
  - a
  - n
  -  
  - o
  - f
  -  
  - {
  - ∇
  - h
  - ᵢ
  - }
  - .
  -  
  - (
  - S
  - h
  - o
  - w
  -  
  - t
  - h
  - a
  - t
  -  
  - a
  - n
  - y
  -  
  - t
  - a
  - n
  - g
  - e
  - n
  - t
  -  
  - d
  - i
  - r
  - e
  - c
  - t
  - i
  - o
  - n
  -  
  - d
  -  
  - t
  - o
  -  
  - t
  - h
  - e
  -  
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - t
  -  
  - s
  - u
  - r
  - f
  - a
  - c
  - e
  -  
  - w
  - i
  - t
  - h
  -  
  - h
  - ᵢ
  - '
  - (
  - x
  - *
  - )
  - ᵀ
  - d
  - =
  - 0
  -  
  - m
  - u
  - s
  - t
  -  
  - a
  - l
  - s
  - o
  -  
  - s
  - a
  - t
  - i
  - s
  - f
  - y
  -  
  - ∇
  - f
  - (
  - x
  - *
  - )
  - ᵀ
  - d
  - =
  - 0
  - .
  - )
*Problem solving:*
  - M
  - i
  - n
  - i
  - m
  - i
  - z
  - e
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - e
  - ˣ
  - ⁺
  - ʸ
  -  
  - s
  - u
  - b
  - j
  - e
  - c
  - t
  -  
  - t
  - o
  -  
  - x
  - ²
  - +
  - y
  - ²
  - =
  - 1
  -  
  - (
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - e
  - d
  -  
  - t
  - o
  -  
  - t
  - h
  - e
  -  
  - u
  - n
  - i
  - t
  -  
  - c
  - i
  - r
  - c
  - l
  - e
  - )
  - .
  -  
  - F
  - i
  - n
  - d
  -  
  - a
  - l
  - l
  -  
  - s
  - t
  - a
  - t
  - i
  - o
  - n
  - a
  - r
  - y
  -  
  - p
  - o
  - i
  - n
  - t
  - s
  -  
  - o
  - f
  -  
  - t
  - h
  - e
  -  
  - L
  - a
  - g
  - r
  - a
  - n
  - g
  - i
  - a
  - n
  -  
  - a
  - n
  - d
  -  
  - i
  - d
  - e
  - n
  - t
  - i
  - f
  - y
  -  
  - t
  - h
  - e
  -  
  - g
  - l
  - o
  - b
  - a
  - l
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  -  
  - o
  - n
  -  
  - t
  - h
  - e
  -  
  - c
  - i
  - r
  - c
  - l
  - e
  - .

**Assessment objectives**

*MCQ:* For min f(x,y)=x²+y² s.t. x+y=2, the Lagrange multiplier λ* equals: (A) −2 (B) −1 (C) 2 (D) 1. Answer: A (x=y=1, 2x+λ=0 gives λ=−2).
*Short answer:* State the Lagrange multiplier theorem and explain the geometric condition (level set of f tangent to the constraint surface) at the optimum.
*Proof/derivation:* Verify the shadow price interpretation: if V*(b) = min{f(x):h(x)=b}, prove dV*/db|_{b=0} = −λ* using the envelope theorem.

**Intuition**

Lagrange multipliers answer: at the constrained optimum, why can't you improve f by moving along the constraint? Because if you could move along the constraint and decrease f, the gradient of f would have a component tangent to the constraint — but that would mean ∇f is not in the span of the constraint gradients, contradicting the stationarity condition. So at the optimum, ∇f is perpendicular to every tangent direction of the constraint surface — which geometrically means the level sets of f are tangent to the constraint. The multiplier λ captures how much the optimal value changes if you relax the constraint — it is the 'price' of the constraint.

**Historical context**

Joseph-Louis Lagrange introduced the multiplier method in his 1788 Mécanique Analytique. The method was used for 150 years as a purely formal tool before its rigorous justification (requiring the regularity condition) was clarified in the 20th century. The shadow price interpretation was developed by economists in the 1930s–1940s (Samuelson, Dantzig) as a key concept in welfare economics and LP duality.

**Connections**

Lagrange multipliers for equality constraints generalize to the KKT conditions (math.opt.kkt) for inequality constraints. The shadow price is the dual variable in LP duality (math.opt.duality). In optimal control, the Pontryagin maximum principle is a dynamic generalization of Lagrange multipliers.

**Common errors (deep dive)**

The most common error is setting up the Lagrangian with the wrong sign for the multiplier (L=f−λh instead of L=f+λh, or vice versa). Both sign conventions appear in the literature; what matters is consistency. Also: students forget to verify the constraint qualification (rank condition) before applying the theorem. If ∇h(x*)=0 at the optimum, Lagrange multipliers need not exist.

**Exam strategy**

For Lagrange multiplier problems: (1) write L=f+λᵀh, (2) compute ∂L/∂xᵢ=0 for each i (n equations), (3) use h(x)=0 (m equations), (4) solve the system of n+m equations for (x,λ), (5) evaluate f at each solution to identify the minimum. In exam settings, always verify the constraint is satisfied at your solution.

**Socratic questions**

- Interpret the Lagrange multiplier geometrically: at the constrained optimum, what is the relationship between ∇f and the constraint gradients?
- If you change the constraint from h(x)=0 to h(x)=ε (small ε>0), by how much does the optimal value change? Express in terms of λ*.
- When do Lagrange multipliers fail to characterize the constrained optimum? Give a concrete example (no constraint qualification).
- For the utility maximization problem max U(x,y) s.t. px·x+py·y=I, what is the economic interpretation of the Lagrange multiplier?

**Prerequisite graph**

- Requires: math.calc.partial-derivatives, math.opt.unconstrained-optimization
- Unlocks (future prerequisite links): math.opt.kkt
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student cannot set up the stationarity system, review multivariable calculus (gradient computation, system of equations) first.
- If the student is unfamiliar with shadow prices, motivate via a simple example: how much does the optimal diet cost change if you relax a caloric constraint by 100 calories?

**Spaced repetition / revision guidance**



---

### Gradient Descent

*Concept ID: `math.opt.gradient-methods` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Describe the gradient descent algorithm and its convergence guarantees for smooth convex functions, compute step sizes via Lipschitz constants, and compare gradient descent with momentum and accelerated variants.

xₖ₊₁ = xₖ − αₖ∇f(xₖ). Converges for convex f with Lipschitz gradient: rate O(1/k). Strongly convex: linear (geometric) convergence. Step size by line search or fixed rule. Most widely used optimization algorithm in machine learning.

Gradient descent solves min f(x) by iterating xₖ₊₁ = xₖ − αₖ∇f(xₖ), where αₖ > 0 is the step size (learning rate). For a convex and L-smooth function (||∇f(x)−∇f(y)||≤L||x−y||), gradient descent with step size α=1/L converges at rate f(xₖ)−f* ≤ (L||x₀−x*||²)/(2k) — an O(1/k) rate. For strongly convex functions (∇²f⪰μI, μ>0), the rate is linear: f(xₖ)−f* ≤ (1−μ/L)ᵏ·(f(x₀)−f*). Nesterov's accelerated gradient method achieves O(1/k²) for smooth convex functions, which is optimal among first-order methods.

**Key ideas**

- Gradient descent update: xₖ₊₁ = xₖ − α∇f(xₖ). The negative gradient is the direction of steepest descent.
- L-smoothness: ||∇f(x)−∇f(y)|| ≤ L||x−y|| (Lipschitz gradient). Equivalent to ∇²f ⪯ LI. Guarantees: f(y) ≤ f(x)+∇f(x)ᵀ(y−x)+(L/2)||y−x||². Step size 1/L is the 'safe' step.
- Convergence for smooth convex f: f(xₖ)−f* ≤ L||x₀−x*||²/(2k). This is an O(1/k) rate — reaches ε-accuracy in O(1/ε) iterations.
- Strong convexity: f(y) ≥ f(x)+∇f(x)ᵀ(y−x)+(μ/2)||y−x||² for μ>0. Implies a unique minimizer and linear convergence: f(xₖ)−f* ≤ (1−μ/L)ᵏ(f(x₀)−f*).
- Condition number κ=L/μ: high κ → slow convergence (ill-conditioned problem). Preconditioning reduces κ.
- Nesterov acceleration: with momentum term, achieves O(1/k²) convergence for smooth convex functions — optimal by Nesterov's lower bound.

**Common misconceptions**

- *Misconception:* A smaller step size always leads to faster convergence.
  *Correction:* Too small a step size slows convergence (many small steps). Too large a step size causes divergence (oscillation or blow-up). The optimal fixed step size for L-smooth f is α=1/L — balanced between progress and stability.
- *Misconception:* Gradient descent always converges to the global minimum.
  *Correction:* For non-convex f, gradient descent converges to a stationary point, which may be a local minimum or saddle point. For convex f, any stationary point IS the global minimum, so convergence to the global minimum is guaranteed.
- *Misconception:* The gradient points toward the minimum.
  *Correction:* The negative gradient −∇f(xₖ) points in the direction of steepest local descent, but not necessarily toward the global minimum x*. For non-quadratic functions, the direction to x* differs from −∇f. Gradient descent is a local method that makes greedy descent steps.

**Visual teaching opportunities**

- Contour plot of f(x,y)=(x²+10y²)/2 (elliptic bowl). Show gradient descent trajectory with step size 1/L: zigzag pattern in narrow direction. Contrast with Newton's method (direct path to minimum).
- Convergence rate plot: f(xₖ)−f* vs. k on a log-log scale for O(1/k) (slope −1) and O(1/k²) (slope −2) rates. Show Nesterov acceleration above gradient descent.
- Step size sensitivity: for f(x)=x², show xₖ for α=0.1 (slow), α=0.5 (optimal), α=2.5 (diverges: xₖ oscillates and grows).

**Worked example**

*Problem:* Apply gradient descent with step size α to f(x) = (1/2)x² and derive the closed-form iteration and convergence rate.

1. Gradient: ∇f(x) = x. Update: xₖ₊₁ = xₖ − αxₖ = (1−α)xₖ. This is a geometric sequence: xₖ = (1−α)ᵏx₀.
2. L-smoothness: f''(x) = 1, so L = 1. Optimal step size: α = 1/L = 1. With α=1: xₖ = 0 for all k≥1. Converges in ONE step. (Quadratic functions are special.)
3. For general α ∈ (0,2): xₖ = (1−α)ᵏx₀ → 0 as k→∞ iff |1−α|<1, i.e., α ∈ (0,2). Rate: |xₖ| = |1−α|ᵏ|x₀|, a geometric decay.
4. Objective value: f(xₖ) = (1/2)xₖ² = (1/2)(1−α)^{2k}x₀². With α=1/2: f(xₖ) = (1/2)(1/2)^{2k}x₀² = f(x₀)/4ᵏ. Exponential (linear) convergence. ✓
5. Strong convexity: μ = L = 1, condition number κ=1. Convergence factor: (1−μ/L)=(1−1)=0 for α=1. Gradient descent is exact on quadratics with step 1/L. For general strongly convex: (1−1/κ)ᵏ convergence.

*Answer:* For f(x)=x²/2: xₖ=(1−α)ᵏx₀ converges for α∈(0,2). With α=1: converges in 1 step. With α=1/2: linear rate |xₖ|=(1/2)ᵏ|x₀|. The condition number κ=L/μ=1 (well-conditioned) makes gradient descent maximally efficient here.

**Real-world intuition**

- Training neural networks: stochastic gradient descent (SGD) and Adam are variants of gradient methods — the dominant approach in deep learning for minimizing non-convex loss functions.
- Image reconstruction: in MRI/CT, reconstructing images from measurements is a convex optimization solved by gradient/proximal gradient methods (compressed sensing, LASSO).
- Recommendation systems: matrix factorization for collaborative filtering is solved by alternating gradient descent — each user/item embedding vector is updated while the other is fixed.

**Practice progression**

*Fluency:*
  - R
  - u
  - n
  -  
  - 3
  -  
  - s
  - t
  - e
  - p
  - s
  -  
  - o
  - f
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - d
  - e
  - s
  - c
  - e
  - n
  - t
  -  
  - o
  - n
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - (
  - x
  - −
  - 3
  - )
  - ²
  - +
  - (
  - y
  - +
  - 1
  - )
  - ²
  -  
  - s
  - t
  - a
  - r
  - t
  - i
  - n
  - g
  -  
  - a
  - t
  -  
  - (
  - 0
  - ,
  - 0
  - )
  -  
  - w
  - i
  - t
  - h
  -  
  - s
  - t
  - e
  - p
  -  
  - s
  - i
  - z
  - e
  -  
  - α
  - =
  - 0
  - .
  - 5
  - .
  -  
  - V
  - e
  - r
  - i
  - f
  - y
  -  
  - c
  - o
  - n
  - v
  - e
  - r
  - g
  - e
  - n
  - c
  - e
  -  
  - d
  - i
  - r
  - e
  - c
  - t
  - i
  - o
  - n
  - .
*Conceptual:*
  - S
  - t
  - a
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - c
  - o
  - n
  - v
  - e
  - r
  - g
  - e
  - n
  - c
  - e
  -  
  - t
  - h
  - e
  - o
  - r
  - e
  - m
  -  
  - f
  - o
  - r
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - d
  - e
  - s
  - c
  - e
  - n
  - t
  -  
  - o
  - n
  -  
  - L
  - -
  - s
  - m
  - o
  - o
  - t
  - h
  -  
  - c
  - o
  - n
  - v
  - e
  - x
  -  
  - f
  - u
  - n
  - c
  - t
  - i
  - o
  - n
  - s
  -  
  - (
  - O
  - (
  - 1
  - /
  - k
  - )
  -  
  - r
  - a
  - t
  - e
  - )
  - .
  -  
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - k
  - e
  - y
  -  
  - d
  - e
  - s
  - c
  - e
  - n
  - t
  -  
  - l
  - e
  - m
  - m
  - a
  - :
  -  
  - f
  - (
  - x
  - ₖ
  - ₊
  - ₁
  - )
  -  
  - ≤
  -  
  - f
  - (
  - x
  - ₖ
  - )
  -  
  - −
  -  
  - (
  - 1
  - /
  - (
  - 2
  - L
  - )
  - )
  - |
  - |
  - ∇
  - f
  - (
  - x
  - ₖ
  - )
  - |
  - |
  - ²
  - .
*Problem solving:*
  - F
  - o
  - r
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - x
  - ²
  - +
  - 1
  - 0
  - y
  - ²
  - ,
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - L
  -  
  - (
  - L
  - i
  - p
  - s
  - c
  - h
  - i
  - t
  - z
  -  
  - c
  - o
  - n
  - s
  - t
  - a
  - n
  - t
  -  
  - o
  - f
  -  
  - ∇
  - f
  - )
  - ,
  -  
  - a
  - n
  - d
  -  
  - r
  - u
  - n
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - d
  - e
  - s
  - c
  - e
  - n
  - t
  -  
  - f
  - r
  - o
  - m
  -  
  - (
  - 1
  - ,
  - 1
  - )
  -  
  - f
  - o
  - r
  -  
  - 5
  -  
  - s
  - t
  - e
  - p
  - s
  -  
  - w
  - i
  - t
  - h
  -  
  - α
  - =
  - 1
  - /
  - L
  - .
  -  
  - O
  - b
  - s
  - e
  - r
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - z
  - i
  - g
  - z
  - a
  - g
  -  
  - b
  - e
  - h
  - a
  - v
  - i
  - o
  - r
  -  
  - a
  - n
  - d
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - f
  - (
  - x
  - ₅
  - )
  - −
  - f
  - *
  - .

**Assessment objectives**

*MCQ:* For a smooth convex function with Lipschitz gradient constant L, the gradient descent convergence rate with step size 1/L is: (A) O(1/k²) (B) O(1/k) (C) O(exp(−k)) (D) O(1/√k). Answer: B.
*Short answer:* State the descent lemma for L-smooth functions and explain why the step size α=1/L guarantees descent at each step.
*Proof/derivation:* Prove the O(1/k) convergence of gradient descent for smooth convex f: starting from the descent lemma, telescope the inequalities over k steps to get f(xₖ)−f*≤L||x₀−x*||²/(2k).

**Intuition**

Gradient descent is the mathematical embodiment of 'always go downhill.' At each step, you look at the current slope (gradient) and take a step in the direction of steepest descent. The step size controls how far you go: too small and you creep, too large and you overshoot and bounce. With the right step size (1/L, one over the smoothness constant), you are guaranteed to make meaningful progress at each step. The convergence rate O(1/k) means you halve the error in about 2× the iterations — acceptable for moderate accuracy, but slow for high precision. Nesterov's acceleration gives O(1/k²) by using 'momentum' from the previous step.

**Historical context**

Gradient descent was introduced by Cauchy in 1847. Convergence analysis for smooth convex functions was developed by Polyak (1963) and Nesterov (1983). Nesterov's 1983 paper introduced the accelerated gradient method (now called Nesterov's method or FISTA in the proximal form), achieving the optimal O(1/k²) rate. The resurgence of gradient methods in machine learning began with Rumelhart, Hinton, and Williams' 1986 paper on backpropagation and has continued with SGD, Adam, and their variants.

**Connections**

Gradient methods are the practical implementation of unconstrained optimization (math.opt.unconstrained-optimization). Stochastic gradient descent (math.opt.stochastic-gradient) extends to large datasets. Newton's method (math.opt.newton-optimization) uses second-order information (Hessian) for faster convergence at higher per-iteration cost.

**Common errors (deep dive)**

The most common error is choosing a step size without computing L: students often set α 'by feel' or from experience in one problem and apply it to another where it diverges. Always compute L (= max eigenvalue of ∇²f for smooth f, or ||A||² for quadratics) before setting α=1/L. Also: gradient descent does NOT directly extend to non-smooth f — proximal gradient methods are needed for L¹-regularized problems like LASSO.

**Exam strategy**

For gradient descent analysis: (1) compute ∇f, (2) identify L (Lipschitz constant of ∇f—often the largest eigenvalue of ∇²f), (3) state the step size α=1/L, (4) quote the O(1/k) or linear rate as appropriate. For strong convexity: identify μ (smallest eigenvalue of ∇²f), quote the condition number κ=L/μ, and the linear rate (1−1/κ)ᵏ.

**Socratic questions**

- Why does gradient descent with step size α>2/L diverge for a quadratic function? Derive the condition on α for convergence of xₖ=(1−α)ᵏx₀.
- What is the condition number κ=L/μ, and why does a large κ lead to slow convergence? Give an example of a poorly conditioned problem.
- Explain the idea behind Nesterov's accelerated gradient method. Why does adding a momentum term improve the convergence rate from O(1/k) to O(1/k²)?
- For f(x)=||Ax−b||²/2 (least squares), what are L and μ in terms of the singular values of A? When is this problem strongly convex?

**Prerequisite graph**

- Requires: math.opt.unconstrained-optimization, math.calc.gradient
- Unlocks (future prerequisite links): math.opt.stochastic-gradient, math.opt.newton-optimization
- Cross-topic connections (graph cross-links): math.num.newtons-method

**Teaching hints — review triggers**

- If the student is unfamiliar with the gradient ∇f as a vector of partial derivatives, review multivariable calculus before gradient descent.
- If the student does not understand what 'convergence rate O(1/k)' means, introduce big-O notation and iteration complexity before the theorem.

**Spaced repetition / revision guidance**



---

### Stochastic Gradient Descent

*Concept ID: `math.opt.stochastic-gradient` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Understand stochastic gradient descent (SGD) and its variants — why they work despite using noisy gradient estimates, how to set learning rates, and when SGD outperforms full gradient descent.

xₖ₊₁ = xₖ − αₖ ∇fᵢₖ(xₖ) using a random sample index iₖ. Computationally cheap per iteration for large datasets. Converges with diminishing step sizes. Mini-batch SGD: average gradient over a random batch. Foundation of neural network training.

Stochastic gradient descent replaces the exact gradient ∇f(x) = (1/n)Σᵢ∇fᵢ(x) with a single-sample or mini-batch estimate ∇fᵢ(x). The key insight is that this noisy estimate is an unbiased estimator of the true gradient: 𝔼[∇fᵢ(x)] = ∇f(x). Despite the noise, SGD converges — but to a neighborhood of the optimum rather than to the exact solution, unless the learning rate is decreased over time. For strongly convex f with step size αₖ = O(1/k), SGD achieves 𝔼[f(xₖ) − f*] = O(1/k), matching gradient descent's rate but at cost O(1) per step vs. O(n). Mini-batch SGD with batch size B averages B gradients, reducing variance by factor B while increasing per-step cost: variance = σ²/B where σ² = (1/n)Σᵢ‖∇fᵢ(x*) − ∇f(x*)‖². Modern variants like Adam (adaptive per-parameter rates), momentum (exponential moving average of gradients), and variance reduction methods (SVRG, SAGA) address the core tension between step-size-driven progress and gradient noise.

**Key ideas**

- SGD gradient estimate is unbiased — 𝔼[∇fᵢ(x)] = ∇f(x) — so in expectation each step decreases the objective, but variance causes oscillation.
- Convergence requires diminishing step sizes αₖ → 0 with Σαₖ = ∞ and Σαₖ² < ∞ (Robbins-Monro conditions); constant step size converges to a noise-dependent neighborhood.
- Mini-batch SGD interpolates between SGD (B=1) and full GD (B=n): variance ∝ 1/B, per-step cost ∝ B, so optimal B depends on parallelism and memory bandwidth.
- Adam combines momentum (first moment estimate m̂ₖ = β₁mₖ/(1−β₁ᵏ)) and RMSprop (second moment v̂ₖ = β₂vₖ/(1−β₂ᵏ)) to give adaptive per-parameter learning rates: xₖ₊₁ = xₖ − α·m̂ₖ/(√v̂ₖ + ε).
- Variance reduction (SVRG, SAGA): by periodically recomputing a full gradient anchor, reduce variance to near-zero while keeping per-step cost O(1), achieving linear convergence for strongly convex f.

**Common misconceptions**

- *Misconception:* SGD noise is purely harmful — a quieter algorithm always learns better.
  *Correction:* Gradient noise can be beneficial: it acts as implicit regularization, helps escape sharp local minima, and improves generalization in neural networks. Minibatch noise drives exploration of the loss landscape, often finding flatter minima that generalize better than the exact minimizer of training loss.
- *Misconception:* Decreasing the learning rate always improves convergence.
  *Correction:* Too-fast decay causes premature freezing before reaching a good solution — a learning rate decaying as O(1/k) is optimal for strongly convex problems but can be catastrophically slow for non-convex ones. Modern practice uses warm-up followed by cosine annealing or step schedules tuned to the specific problem.
- *Misconception:* SGD is just approximate gradient descent with random error.
  *Correction:* SGD has a distinct algorithmic character: its convergence analysis is probabilistic, its optimal step sizes differ from GD's, and it can converge on problems where full GD diverges (e.g., online learning where the objective itself changes). It is a fundamentally different optimization paradigm, not just a noisy version of GD.

**Visual teaching opportunities**

- Side-by-side trajectories of full GD vs. SGD vs. mini-batch on a 2D quadratic bowl — show zigzagging of SGD vs. smooth GD path, with SGD ultimately arriving near the optimum but oscillating around it.
- Variance reduction diagram: full gradient anchor every T steps, with gradient paths converging steadily once variance is controlled — contrast with vanilla SGD's persistent oscillation.
- Training loss curves for various batch sizes B ∈ {1, 32, 256, n} showing the bias-variance tradeoff: B=1 is fast per-step but noisy, B=n is slow per-step but smooth.

**Worked example**

*Problem:* Apply SGD to minimize f(x) = (1/2)(x₁² + 10x₂²) starting from x⁰ = (3, 3) with step size α = 0.1 and gradient samples from fᵢ selected by cycling i = 1, 2 where f₁(x) = (1/2)x₁² + 5x₂² and f₂(x) = (1/2)x₁² + 5x₂². Show two SGD steps and compare with exact GD step.

1. Step 1 — Full gradient baseline: ∇f(x) = (x₁, 10x₂). At x⁰ = (3,3): ∇f = (3, 30). Full GD step: x¹_GD = (3 − 0.1·3, 3 − 0.1·30) = (2.7, 0.0). f(x¹_GD) = (1/2)(2.7² + 10·0²) = 3.645.
2. Step 2 — SGD step with i=1: ∇f₁(x) = (x₁, 10x₂) [since f₁ coincides with f here for illustration]. Use a different f₁: ∇f₁(x) = (x₁, 0) (only x₁ term). At x⁰: ∇f₁ = (3, 0). SGD update: x¹ = (3 − 0.1·3, 3 − 0.1·0) = (2.7, 3). Note: x₂ unchanged because this sample had no x₂ information.
3. Step 3 — SGD step with i=2: ∇f₂(x) = (0, 10x₂) (only x₂ term). At x¹ = (2.7, 3): ∇f₂ = (0, 30). Update: x² = (2.7 − 0, 3 − 0.1·30) = (2.7, 0.0).
4. Step 4 — Compare: After 2 SGD steps we have x² = (2.7, 0.0), same as 1 GD step but at twice the iterations. SGD cost: 2 partial gradient evaluations. GD cost: 1 full gradient (which requires summing both components). In large-scale settings with n samples, SGD takes n steps for the cost of 1 GD step but each step uses O(1) data.
5. Step 5 — Convergence check: f(x²) = (1/2)(2.7² + 10·0²) = 3.645 = f(x¹_GD). After one 'epoch' (n=2 samples), SGD matches GD exactly in this symmetric case. For strongly convex f with L = 10, μ = 1 (condition number 10), optimal SGD rate with αₖ = 2/(μ(k+1)) gives 𝔼[f(xₖ) − f*] ≤ 2L‖x⁰‖²/(μ(k+1)) = O(1/k).

*Answer:* After 2 SGD steps with step size α = 0.1 using coordinate-split gradient estimates, x² = (2.7, 0.0), f(x²) = 3.645. This matches one full GD step but required processing each of the 2 'data components' once. The key insight is that with n samples (here n=2), 1 epoch of SGD = n individual updates, achieving O(1/k) rate for strongly convex objectives.

**Real-world intuition**

- Neural network training: backpropagation computes per-sample gradients; mini-batch SGD with Adam is the de facto optimizer for deep learning — the noise actually improves generalization by finding flat minima.
- Online recommendation systems: new user interaction data arrives continuously; online SGD updates the model in real time without re-processing historical data, matching the streaming setting exactly.
- Federated learning: SGD runs locally on each device with its own data, gradients are averaged across devices — distributed SGD with communication compression is the foundation of privacy-preserving ML.

**Practice progression**

*Fluency:*
  - F
  - o
  - r
  -  
  - f
  - (
  - x
  - )
  -  
  - =
  -  
  - Σ
  - ᵢ
  - (
  - a
  - ᵢ
  - ᵀ
  - x
  -  
  - −
  -  
  - b
  - ᵢ
  - )
  - ²
  -  
  - (
  - l
  - e
  - a
  - s
  - t
  -  
  - s
  - q
  - u
  - a
  - r
  - e
  - s
  - )
  - ,
  -  
  - w
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - S
  - G
  - D
  -  
  - u
  - p
  - d
  - a
  - t
  - e
  -  
  - r
  - u
  - l
  - e
  -  
  - u
  - s
  - i
  - n
  - g
  -  
  - a
  -  
  - s
  - i
  - n
  - g
  - l
  - e
  -  
  - s
  - a
  - m
  - p
  - l
  - e
  -  
  - i
  - ;
  -  
  - s
  - i
  - m
  - p
  - l
  - i
  - f
  - y
  -  
  - f
  - o
  - r
  -  
  - a
  - ᵢ
  -  
  - =
  -  
  - e
  - ⱼ
  -  
  - (
  - s
  - t
  - a
  - n
  - d
  - a
  - r
  - d
  -  
  - b
  - a
  - s
  - i
  - s
  -  
  - v
  - e
  - c
  - t
  - o
  - r
  - s
  - )
  - .
*Conceptual:*
  - E
  - x
  - p
  - l
  - a
  - i
  - n
  -  
  - w
  - h
  - y
  -  
  - S
  - G
  - D
  -  
  - w
  - i
  - t
  - h
  -  
  - c
  - o
  - n
  - s
  - t
  - a
  - n
  - t
  -  
  - s
  - t
  - e
  - p
  -  
  - s
  - i
  - z
  - e
  -  
  - α
  -  
  - c
  - o
  - n
  - v
  - e
  - r
  - g
  - e
  - s
  -  
  - t
  - o
  -  
  - a
  -  
  - n
  - e
  - i
  - g
  - h
  - b
  - o
  - r
  - h
  - o
  - o
  - d
  -  
  - o
  - f
  -  
  - f
  - *
  -  
  - r
  - a
  - t
  - h
  - e
  - r
  -  
  - t
  - h
  - a
  - n
  -  
  - t
  - o
  -  
  - f
  - *
  -  
  - i
  - t
  - s
  - e
  - l
  - f
  - .
  -  
  - W
  - h
  - a
  - t
  -  
  - i
  - s
  -  
  - t
  - h
  - e
  -  
  - r
  - a
  - d
  - i
  - u
  - s
  -  
  - o
  - f
  -  
  - t
  - h
  - a
  - t
  -  
  - n
  - e
  - i
  - g
  - h
  - b
  - o
  - r
  - h
  - o
  - o
  - d
  -  
  - i
  - n
  -  
  - t
  - e
  - r
  - m
  - s
  -  
  - o
  - f
  -  
  - α
  -  
  - a
  - n
  - d
  -  
  - t
  - h
  - e
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - v
  - a
  - r
  - i
  - a
  - n
  - c
  - e
  -  
  - σ
  - ²
  - ?
*Problem solving:*
  - F
  - o
  - r
  -  
  - l
  - o
  - g
  - i
  - s
  - t
  - i
  - c
  -  
  - r
  - e
  - g
  - r
  - e
  - s
  - s
  - i
  - o
  - n
  -  
  - w
  - i
  - t
  - h
  -  
  - n
  -  
  - =
  -  
  - 1
  - 0
  - ⁶
  -  
  - s
  - a
  - m
  - p
  - l
  - e
  - s
  - ,
  -  
  - c
  - o
  - m
  - p
  - a
  - r
  - e
  -  
  - t
  - h
  - e
  -  
  - p
  - e
  - r
  - -
  - e
  - p
  - o
  - c
  - h
  -  
  - c
  - o
  - s
  - t
  -  
  - a
  - n
  - d
  -  
  - c
  - o
  - n
  - v
  - e
  - r
  - g
  - e
  - n
  - c
  - e
  -  
  - r
  - a
  - t
  - e
  -  
  - o
  - f
  - :
  -  
  - (
  - a
  - )
  -  
  - f
  - u
  - l
  - l
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - d
  - e
  - s
  - c
  - e
  - n
  - t
  -  
  - w
  - i
  - t
  - h
  -  
  - s
  - t
  - e
  - p
  -  
  - s
  - i
  - z
  - e
  -  
  - 1
  - /
  - L
  - ,
  -  
  - (
  - b
  - )
  -  
  - S
  - G
  - D
  -  
  - w
  - i
  - t
  - h
  -  
  - s
  - t
  - e
  - p
  -  
  - s
  - i
  - z
  - e
  -  
  - 1
  - /
  - (
  - μ
  - k
  - )
  - ,
  -  
  - (
  - c
  - )
  -  
  - S
  - V
  - R
  - G
  -  
  - w
  - i
  - t
  - h
  -  
  - i
  - n
  - n
  - e
  - r
  -  
  - l
  - o
  - o
  - p
  -  
  - l
  - e
  - n
  - g
  - t
  - h
  -  
  - m
  -  
  - =
  -  
  - n
  - .
  -  
  - W
  - h
  - i
  - c
  - h
  -  
  - c
  - o
  - n
  - v
  - e
  - r
  - g
  - e
  - s
  -  
  - i
  - n
  -  
  - f
  - e
  - w
  - e
  - s
  - t
  -  
  - t
  - o
  - t
  - a
  - l
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - e
  - v
  - a
  - l
  - u
  - a
  - t
  - i
  - o
  - n
  - s
  -  
  - t
  - o
  -  
  - ε
  - -
  - a
  - c
  - c
  - u
  - r
  - a
  - c
  - y
  - ?

**Assessment objectives**

*MCQ:* SGD with diminishing step sizes αₖ = c/k satisfies the Robbins-Monro conditions when: (A) c > 0 and Σ1/k = ∞, Σ1/k² < ∞ — CORRECT. (B) c > 0 and Σ1/k < ∞. (C) αₖ → 0 is sufficient without any sum conditions. (D) c must equal 1/L exactly.
*Short answer:* Define the gradient variance σ² = 𝔼[‖∇fᵢ(x*) − ∇f(x*)‖²]. Explain why mini-batch SGD with batch size B has effective variance σ²/B, and state what batch size achieves the same per-step noise level as gradient descent.
*Proof/derivation:* For f strongly convex with parameter μ and gradient estimates satisfying 𝔼[gₖ] = ∇f(xₖ) and 𝔼[‖gₖ‖²] ≤ G², show that SGD with step sizes αₖ = 2/(μ(k+1)) satisfies 𝔼[f(x̄ₖ) − f*] ≤ 2G²/μ(k+1) where x̄ₖ is a weighted average of iterates.

**Intuition**

Imagine you want to find the lowest point in a hilly landscape, but you can only feel the slope directly under your feet — not the entire terrain. That's SGD. Each data point 'illuminates' one patch of the loss surface. With a million data points you'd need a million slope measurements for one exact gradient, but a single measurement tells you roughly which way is downhill. The magic is that even random, slightly wrong descent steps make net progress — as long as they're right on average. The noise isn't a bug; it's the feature that lets SGD scale to billions of parameters and terabytes of data.

**Historical context**

Robbins and Monro introduced stochastic approximation in 1951 for root-finding, not optimization — the key insight was that noisy measurements could still guarantee convergence. Widrow and Hoff applied it to neural networks with the LMS algorithm (1960). The deep learning revolution (2012–present) runs almost entirely on SGD variants: Adagrad (2011) introduced adaptive rates, Adam (Kingma & Ba, 2014) combined momentum and adaptive rates and remains the default. Variance reduction methods (SVRG, Schmidt et al. 2013; SAGA, Defazio et al. 2014) proved that full linear convergence is achievable at near-SGD cost, bridging the gap between SGD and GD theory.

**Connections**

SGD is the workhorse behind all of modern deep learning (gradient-methods, neural architecture); its convergence analysis uses strong convexity and Lipschitz gradients (convex-function, gradient-methods); the variance-reduction perspective connects to Monte Carlo integration (prob.expected-value); mini-batch parallelism connects to distributed computing and numerical linear algebra (matrix-vector products for gradient computation).

**Common errors (deep dive)**

The most common error is tuning a constant learning rate: too large causes divergence or persistent large oscillations; too small causes extremely slow progress. In practice, the learning rate is the single most important hyperparameter — engineers routinely use learning rate finders (increase α exponentially for a few steps, watch loss) or cosine annealing schedules. A second common error is treating batch size as free: doubling B halves variance but also halves the number of SGD steps per epoch, so naive scaling fails; the 'linear scaling rule' (scale α proportionally to B) rescues this for moderately large B.

**Exam strategy**

For convergence rate problems: identify if f is smooth (L-Lipschitz gradient), strongly convex (μ > 0), or neither; these determine the achievable rate — O(1/√k) for non-convex, O(1/k) for convex, linear O(ρᵏ) with variance reduction for strongly convex. For learning rate problems: constant α gives steady-state error O(ασ²/μ), so to reach ε accuracy set α = εμ/σ². Always distinguish per-step complexity from per-epoch complexity (multiply step count by B/n).

**Socratic questions**

- If f is non-convex (e.g., a neural network loss), SGD is still used and succeeds in practice. What convergence guarantee can we still provide for non-convex f?
- Why does the Robbins-Monro condition require both Σαₖ = ∞ and Σαₖ² < ∞? What goes wrong if only the first condition holds?
- Adam adapts the learning rate per-parameter. Can you construct a quadratic example where Adam converges faster than SGD with a global rate? Where it converges slower?
- SVRG achieves linear convergence for strongly convex f. Why does it need a periodic full gradient computation — can it reduce variance without ever computing the full gradient?

**Prerequisite graph**

- Requires: math.opt.gradient-methods, math.prob.expected-value
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- Student confuses gradient direction with update direction → review gradient descent basics (math.opt.gradient-methods): the update is x − α∇f, the negative gradient direction.
- Student cannot interpret 𝔼[∇fᵢ] = ∇f → review expected value and unbiasedness (math.prob.expected-value): unbiased estimator means the average over all randomness equals the true quantity.
- Student cannot distinguish variance and bias in convergence → review statistical estimator concepts: bias is systematic error, variance is random fluctuation around the mean estimate.

**Spaced repetition / revision guidance**



---

### Newton's Method for Optimization

*Concept ID: `math.opt.newton-optimization` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.75 · Estimated study time: 6h*

**Learning objective.** Derive Newton's method for optimization from the Taylor expansion, state its quadratic local convergence rate, compare it to gradient descent, and describe quasi-Newton methods (BFGS) as practical second-order alternatives.

xₖ₊₁ = xₖ − [∇²f(xₖ)]⁻¹∇f(xₖ). Quadratic convergence near a strong minimizer. Requires Hessian (expensive); quasi-Newton (BFGS) approximates Hessian from gradients. L-BFGS: limited memory variant for large-scale problems.

Newton's method for minimizing f:ℝⁿ→ℝ computes the quadratic model m(d) = f(xₖ)+∇f(xₖ)ᵀd+(1/2)dᵀ∇²f(xₖ)d and takes the step xₖ₊₁ = xₖ − [∇²f(xₖ)]⁻¹∇f(xₖ). It has quadratic local convergence: ||xₖ₊₁−x*|| ≤ c||xₖ−x*||² — the number of correct digits doubles each iteration. The cost per iteration is O(n³) (Hessian inversion). For large n, quasi-Newton methods (BFGS) approximate the Hessian from gradient differences, achieving superlinear convergence at O(n²) per iteration. Newton's method is the foundation of interior-point methods.

**Key ideas**

- Newton step derivation: minimize the quadratic model m(d)=f(xₖ)+∇f(xₖ)ᵀd+(1/2)dᵀ∇²f(xₖ)d. Setting ∇_d m=0: ∇f(xₖ)+∇²f(xₖ)d=0 → d*=−[∇²f(xₖ)]⁻¹∇f(xₖ). Update: xₖ₊₁=xₖ+d*.
- Quadratic convergence: for smooth strongly convex f near x*, ||xₖ₊₁−x*||₂ ≤ (L/2μ²)||xₖ−x*||₂² (L=Lipschitz constant of ∇²f, μ=strong convexity constant). Each step, the error is squared — very fast convergence.
- Newton vs. gradient descent: gradient descent has linear convergence (geometric rate); Newton has quadratic convergence (super-fast near x*). Newton is more expensive per step (O(n³) vs. O(n)); preferred for small-to-medium n or when very high accuracy is needed.
- Pure Newton may not be globally convergent: if far from x*, the Hessian may be indefinite or poorly conditioned, causing divergence. Line search (Armijo-Wolfe backtracking) or trust region methods enforce global descent.
- BFGS quasi-Newton: approximate Hessian Bₖ≈∇²f(xₖ) from secant condition: Bₖ(xₖ−xₖ₋₁)=∇f(xₖ)−∇f(xₖ₋₁). Update Bₖ using the Sherman-Morrison-Woodbury formula. Superlinear convergence at O(n²) cost per step.
- Newton for equations: solving ∇f(x)=0 by Newton's method on the gradient is equivalent to the Newton-Raphson method for root-finding applied to F(x)=∇f(x).

**Common misconceptions**

- *Misconception:* Newton's method always converges to the global minimum.
  *Correction:* Newton's method converges to a LOCAL minimum (or even a saddle point or maximum if the Hessian is not PD). Global convergence requires convexity plus appropriate line search. Without line search, Newton's method can diverge (e.g., f(x)=x−log(x), Newton oscillates from bad starting points).
- *Misconception:* Quadratic convergence means convergence in two steps.
  *Correction:* Quadratic convergence means the error at step k+1 is proportional to the SQUARE of the error at step k — ||eₖ₊₁|| ≤ c||eₖ||². This is extremely fast near the solution (doubling of correct digits per step), but the method may take many steps to get close enough for this regime to kick in.
- *Misconception:* BFGS is less accurate than Newton's method.
  *Correction:* BFGS achieves superlinear convergence (faster than linear, slower than quadratic). In practice, BFGS is often competitive with Newton because (1) it avoids expensive exact Hessian computation, (2) the Hessian approximation improves over iterations, and (3) for non-quadratic functions, exact Hessian inversion is rarely more accurate than BFGS.

**Visual teaching opportunities**

- 1D Newton iteration: plot f(x)=x²−2 (finding √2). At x₀=2: Newton step x₁=2−f'(2)/f''(2)=2−4/2=0, wait that's wrong. Correct for optimization: finding root of f'(x)=2x=0 → x*=0. Show quadratic convergence on f(x)=x⁴/4−x: Newton from x₀=2 converges rapidly to x*=1.
- Gradient descent vs. Newton on ellipse: f(x,y)=x²+10y². Gradient descent zigzags; Newton goes directly to (0,0) in one step (quadratic function, Newton is exact).
- BFGS update: show Hessian approximation Bₖ evolving over iterations. At k=0: Bₖ=I (steepest descent). After several steps: Bₖ approximates ∇²f(x*) well.

**Worked example**

*Problem:* Apply Newton's method for 2 iterations to minimize f(x,y)=x²+4y² starting at x₀=(2,1).

1. Gradient: ∇f(x,y)=(2x, 8y). Hessian: ∇²f=[[2,0],[0,8]] (constant). Newton step: dₖ=−(∇²f)⁻¹∇f(xₖ).
2. Iteration 0: x₀=(2,1). ∇f(2,1)=(4,8). (∇²f)⁻¹=[[1/2,0],[0,1/8]]. d₀=−[[1/2,0],[0,1/8]][(4),(8)]=(−2,−1). x₁=(2,1)+(−2,−1)=(0,0).
3. Iteration 1: x₁=(0,0). ∇f(0,0)=(0,0). Converged exactly. ✓
4. This illustrates Newton's exactness on quadratic functions: the quadratic model equals the function exactly, so the Newton step reaches the minimum in ONE step regardless of starting point (as long as we use the fixed step size α=1).
5. For a non-quadratic example: f(x)=eˣ+x²/2. ∇f(x)=eˣ+x. ∇²f(x)=eˣ+1. Newton update: xₖ₊₁=xₖ−(eˣᵏ+xₖ)/(eˣᵏ+1). From x₀=0: x₁=−(1+0)/(1+1)=−1/2. x₂=−1/2−(e⁻¹/²−1/2)/(e⁻¹/²+1)≈−1/2+0.0755≈−0.569. Converging to x*≈−0.567 (root of eˣ+x=0). Quadratic convergence: errors ≈ 0.5, 0.002, ε⁴,… ✓

*Answer:* For quadratic f: Newton converges in exactly one step (the quadratic model is exact). For general f: quadratic convergence near x*, with each step approximately doubling the number of correct significant digits.

**Real-world intuition**

- Interior-point methods: Newton's method is the core of IPM algorithms for LP, QP, and SDP. Each IPM iteration solves a Newton system (the KKT matrix linear system).
- Training logistic regression: Newton's method (or Newton-CG) for maximizing the log-likelihood of logistic regression converges in O(10) iterations vs. O(10⁴) for gradient descent.
- Structural mechanics: nonlinear finite element analysis solves the equilibrium equations by Newton-Raphson iterations — standard in civil and mechanical engineering simulation.

**Practice progression**

*Fluency:*
  - A
  - p
  - p
  - l
  - y
  -  
  - 2
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  -  
  - s
  - t
  - e
  - p
  - s
  -  
  - t
  - o
  -  
  - f
  - (
  - x
  - )
  - =
  - x
  - ³
  - −
  - 3
  - x
  -  
  - f
  - r
  - o
  - m
  -  
  - x
  - ₀
  - =
  - 2
  - .
  -  
  - C
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - ∇
  - f
  - ,
  -  
  - ∇
  - ²
  - f
  -  
  - a
  - t
  -  
  - e
  - a
  - c
  - h
  -  
  - s
  - t
  - e
  - p
  -  
  - a
  - n
  - d
  -  
  - t
  - h
  - e
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  -  
  - u
  - p
  - d
  - a
  - t
  - e
  - .
*Conceptual:*
  - D
  - e
  - r
  - i
  - v
  - e
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  - '
  - s
  -  
  - m
  - e
  - t
  - h
  - o
  - d
  -  
  - b
  - y
  -  
  - m
  - i
  - n
  - i
  - m
  - i
  - z
  - i
  - n
  - g
  -  
  - t
  - h
  - e
  -  
  - s
  - e
  - c
  - o
  - n
  - d
  - -
  - o
  - r
  - d
  - e
  - r
  -  
  - T
  - a
  - y
  - l
  - o
  - r
  -  
  - e
  - x
  - p
  - a
  - n
  - s
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - f
  -  
  - a
  - t
  -  
  - x
  - ₖ
  - .
  -  
  - S
  - h
  - o
  - w
  -  
  - t
  - h
  - a
  - t
  -  
  - f
  - o
  - r
  -  
  - a
  -  
  - q
  - u
  - a
  - d
  - r
  - a
  - t
  - i
  - c
  -  
  - f
  - ,
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  -  
  - r
  - e
  - a
  - c
  - h
  - e
  - s
  -  
  - t
  - h
  - e
  -  
  - e
  - x
  - a
  - c
  - t
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  -  
  - i
  - n
  -  
  - o
  - n
  - e
  -  
  - s
  - t
  - e
  - p
  - .
*Problem solving:*
  - C
  - o
  - m
  - p
  - a
  - r
  - e
  -  
  - g
  - r
  - a
  - d
  - i
  - e
  - n
  - t
  -  
  - d
  - e
  - s
  - c
  - e
  - n
  - t
  -  
  - a
  - n
  - d
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  - '
  - s
  -  
  - m
  - e
  - t
  - h
  - o
  - d
  -  
  - o
  - n
  -  
  - f
  - (
  - x
  - ,
  - y
  - )
  - =
  - x
  - ²
  - +
  - 1
  - 0
  - 0
  - y
  - ²
  - .
  -  
  - F
  - o
  - r
  -  
  - G
  - D
  -  
  - w
  - i
  - t
  - h
  -  
  - s
  - t
  - e
  - p
  -  
  - 1
  - /
  - L
  - :
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - L
  - ,
  -  
  - n
  - u
  - m
  - b
  - e
  - r
  -  
  - o
  - f
  -  
  - i
  - t
  - e
  - r
  - a
  - t
  - i
  - o
  - n
  - s
  -  
  - t
  - o
  -  
  - r
  - e
  - d
  - u
  - c
  - e
  -  
  - e
  - r
  - r
  - o
  - r
  -  
  - b
  - y
  -  
  - f
  - a
  - c
  - t
  - o
  - r
  -  
  - 1
  - 0
  - 0
  - 0
  - .
  -  
  - F
  - o
  - r
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  - :
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - n
  - u
  - m
  - b
  - e
  - r
  -  
  - o
  - f
  -  
  - i
  - t
  - e
  - r
  - a
  - t
  - i
  - o
  - n
  - s
  - .
  -  
  - (
  - L
  - =
  - 2
  - 0
  - 0
  - ,
  -  
  - μ
  - =
  - 2
  - ,
  -  
  - κ
  - =
  - 1
  - 0
  - 0
  - ;
  -  
  - G
  - D
  -  
  - n
  - e
  - e
  - d
  - s
  -  
  - ~
  - 4
  - 6
  - 0
  -  
  - i
  - t
  - e
  - r
  - a
  - t
  - i
  - o
  - n
  - s
  - ;
  -  
  - N
  - e
  - w
  - t
  - o
  - n
  - :
  -  
  - 1
  -  
  - e
  - x
  - a
  - c
  - t
  -  
  - s
  - t
  - e
  - p
  - .
  - )

**Assessment objectives**

*MCQ:* Newton's method for minimizing f(x) has local convergence rate: (A) linear O((1−μ/L)ᵏ) (B) quadratic ||xₖ₊₁−x*||≤c||xₖ−x*||² (C) sublinear O(1/k) (D) O(1/k²). Answer: B.
*Short answer:* Derive the Newton step formula. Explain why Newton's method converges faster than gradient descent near the optimum.
*Proof/derivation:* Prove that Newton's method is exact (converges in one step) for a strictly convex quadratic function f(x)=(1/2)xᵀPx+qᵀx with P≻0. (Show that the Newton step from any x₀ gives x₁=x*.)

**Intuition**

Gradient descent says 'go downhill.' Newton's method says 'fit the best possible bowl to the current landscape and jump to the bottom of the bowl.' Because the bowl is the exact local quadratic model of f, the Newton step is much more informed: it accounts for the curvature of the function, not just its slope. For a parabola (quadratic), the bowl is perfect and you reach the exact minimum in one step. For a general smooth function, the bowl is an approximation, but near the minimum it becomes increasingly accurate—giving quadratic convergence (errors squared at each step).

**Historical context**

Isaac Newton introduced his iterative method for root-finding in his 1669 'De Analysi.' Joseph Raphson independently described the method in 1690. The application to optimization (minimizing f by root-finding on ∇f) follows directly. The connection to quadratic convergence was formalized by Kantorovich (1948). BFGS was simultaneously developed by four authors: Broyden, Fletcher, Goldfarb, and Shanno in 1970 — a classic of independent discovery. L-BFGS (limited-memory BFGS), developed by Nocedal (1980), made BFGS practical for very large n.

**Connections**

Newton's method is the engine of interior-point methods (math.opt.linear-programming, math.opt.semidefinite-programming). The Newton system [[∇²f, ∇hᵀ],[∇h, 0]] is the KKT matrix of the equality-constrained QP (math.opt.quadratic-programming). BFGS and L-BFGS are the standard optimizers for unconstrained smooth optimization in machine learning and scientific computing.

**Common errors (deep dive)**

The most common error is applying Newton's method without a line search, leading to divergence when far from the optimum. Always combine Newton with backtracking line search (Armijo condition: f(xₖ+αdₖ)≤f(xₖ)+c₁α∇f(xₖ)ᵀdₖ). Another error: forgetting that Newton's method requires ∇²f≻0 for the step to be a descent direction. If ∇²f is indefinite (near a saddle), modify the Hessian (add a multiple of I) before inverting.

**Exam strategy**

For Newton's method problems: (1) compute ∇f(xₖ) and ∇²f(xₖ), (2) compute (∇²f)⁻¹ (for 2×2: [[a,b],[c,d]]⁻¹=[[d,−b],[−c,a]]/(ad−bc)), (3) compute Newton step dₖ=−(∇²f)⁻¹∇f, (4) update xₖ₊₁=xₖ+dₖ. For convergence rate: identify as quadratic (cite the bound ||eₖ₊₁||≤c||eₖ||²).

**Socratic questions**

- Derive Newton's method by minimizing the second-order Taylor expansion. Why is this better than minimizing the first-order expansion (gradient descent)?
- Why does Newton's method converge in exactly one step for a strictly convex quadratic? What does this tell you about the relationship between quadratic models and Newton steps?
- Explain the secant condition Bₖ(xₖ−xₖ₋₁)=∇f(xₖ)−∇f(xₖ₋₁) for BFGS. Why is this a good approximation to the true Hessian condition?
- Newton's method can diverge from bad starting points. Give a specific example (function and starting point) where Newton oscillates, and explain how line search resolves this.

**Prerequisite graph**

- Requires: math.opt.gradient-methods, math.calc.multivariable-extrema
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- If the student is unfamiliar with Hessian computation, review multivariable calculus (second-order partial derivatives) before Newton's method.
- If the student cannot invert a 2×2 matrix, review math.linalg basics before computing Newton steps.

**Spaced repetition / revision guidance**



---

### Principal Component Analysis

*Concept ID: `math.opt.pca` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Derive Principal Component Analysis from first principles as a variance-maximization problem, connect it to the eigendecomposition of the sample covariance matrix and to the SVD of the data matrix, and understand what PCA does and does not capture.

Find the k principal directions (eigenvectors of covariance matrix ΣX) maximizing variance. Equivalent to truncated SVD of the centered data matrix. Reduces dimension while preserving maximum variance. Applications in statistics, ML, and image compression.

PCA finds the orthonormal basis for ℝᵈ that maximizes captured variance. Given data X ∈ ℝⁿˣᵈ (n observations, d features, mean-centered), the sample covariance matrix S = (1/(n−1))XᵀX ∈ ℝᵈˣᵈ is symmetric PSD. The first principal component is w₁ = argmax_{‖w‖=1} wᵀSw — the unit vector in the direction of maximum variance. By Lagrange multipliers, Sw₁ = λ₁w₁, so w₁ is the eigenvector of S with largest eigenvalue λ₁. The k-th principal component wₖ is the k-th eigenvector of S, and the variance captured along wₖ is λₖ. The principal components are pairwise orthogonal (eigenvectors of a symmetric matrix with distinct eigenvalues are orthogonal). PCA via SVD: X = UΣVᵀ (thin SVD, U ∈ ℝⁿˣᵈ, Σ ∈ ℝᵈˣᵈ, V ∈ ℝᵈˣᵈ). Then Xᵀ X = VΣ²Vᵀ, so columns of V are principal components and diagonal entries σᵢ² = (n−1)λᵢ relate SVD singular values to eigenvalues. Rank-r approximation: retain top r components Vᵣ ∈ ℝᵈˣʳ; projected data is Z = XVᵣ ∈ ℝⁿˣʳ; reconstruction is X̂ = ZVᵣᵀ. By Eckart-Young theorem, this is the best rank-r approximation in Frobenius and spectral norm. Fraction of variance explained by top r components: Σᵢ₌₁ʳ λᵢ / Σᵢ₌₁ᵈ λᵢ.

**Key ideas**

- PCA is a constrained optimization: maximize wᵀSw subject to ‖w‖ = 1. The Lagrangian L = wᵀSw − λ(wᵀw − 1) gives ∂L/∂w = 2Sw − 2λw = 0, so Sw = λw — the optimal w is an eigenvector of S with λ the maximum eigenvalue.
- The PCA decomposition S = VΛVᵀ (eigendecomposition) and X = UΣVᵀ (SVD) are dual views: V contains the principal directions, Λ = Σ²/(n−1) contains the variances, and U contains the normalized projected data scores.
- Eckart-Young theorem: the best rank-r approximation to X (minimizing ‖X − X̂‖_F) is X̂ = UᵣΣᵣVᵣᵀ — take the top r singular vectors. This means PCA is the optimal linear dimensionality reduction for reconstruction.
- PCA is NOT robust to outliers: the covariance matrix S is sensitive to extreme values. Robust alternatives include sparse PCA (L1-penalized), robust PCA (matrix decomposition S + L where L is low-rank and S is sparse), and PCA with Huber-loss data fidelity.
- Variance explained: Σᵢ₌₁ʳ λᵢ / Σᵢ₌₁ᵈ λᵢ tells what fraction of total spread is captured in r dimensions. Scree plots (λᵢ vs. i) show the 'elbow' where additional components add diminishing information.

**Common misconceptions**

- *Misconception:* PCA finds the directions that best separate the classes or predict the outcome.
  *Correction:* PCA is unsupervised — it maximizes variance without any knowledge of class labels or outputs. High-variance directions are not necessarily predictive or discriminative. Linear Discriminant Analysis (LDA) solves the supervised version: it finds directions that maximize between-class variance relative to within-class variance. PCA can actually discard features that have low variance but are highly predictive.
- *Misconception:* The principal components explain independent aspects of the data — the first few always capture the 'main effects' and the rest are noise.
  *Correction:* PCA components are uncorrelated in the training set (by construction), but uncorrelated ≠ independent (independence is a stronger property). Moreover, in many datasets (images, text, gene expression) the highest-variance directions capture lighting or batch effects, not the biologically or semantically interesting variation. Choosing how many components to retain requires domain knowledge, not just the eigenvalue spectrum.
- *Misconception:* Centering the data before PCA is optional.
  *Correction:* PCA must be applied to mean-centered data. Without centering, the first principal component is biased toward the data mean — it points in the direction of the mean, not the direction of maximum variance around the mean. Always subtract the column means before computing S or performing SVD for PCA.

**Visual teaching opportunities**

- 2D scatter plot of correlated data (elongated ellipse) with two principal component axes overlaid — show that PC1 aligns with the major axis of the ellipse (direction of max variance) and PC2 is perpendicular.
- Scree plot (eigenvalue vs. component index) for a real dataset (e.g., MNIST digits) showing rapid decay — the 'elbow' indicates how many components to retain.
- Image compression example: 28×28 MNIST digit reconstructed with r = 1, 5, 10, 50, 100 principal components — visual demonstration of Eckart-Young theorem as reconstruction quality improves with r.

**Worked example**

*Problem:* Perform PCA on the dataset with 3 observations in ℝ²: x¹ = (2,1), x² = (4,3), x³ = (6,2). Find the principal components, eigenvalues, and the projection of each point onto PC1.

1. Step 1 — Center the data: mean μ = (1/3)(2+4+6, 1+3+2) = (4, 2). Centered data: x̃¹ = (−2,−1), x̃² = (0,1), x̃³ = (2,0). Data matrix X̃ = [[-2,-1],[0,1],[2,0]] ∈ ℝ³ˣ².
2. Step 2 — Compute covariance matrix: S = (1/(n−1))X̃ᵀX̃ = (1/2)[[(-2)²+0²+2², (-2)(−1)+0·1+2·0],[(-1)(−2)+1·0+0·2, (−1)²+1²+0²]] = (1/2)[[8,2],[2,2]] = [[4,1],[1,1]].
3. Step 3 — Eigendecomposition: det(S − λI) = (4−λ)(1−λ) − 1 = λ² − 5λ + 3 = 0. Eigenvalues: λ = (5 ± √13)/2. λ₁ = (5+√13)/2 ≈ 4.303, λ₂ = (5−√13)/2 ≈ 0.697. Check: λ₁ + λ₂ = 5 = Tr(S) = 4+1 ✓; λ₁·λ₂ = 3 = det(S) = 4·1−1 ✓.
4. Step 4 — First principal component: (S − λ₁I)w₁ = 0 → ((4−λ₁), 1)·w₁ = 0. With λ₁ = (5+√13)/2: 4−λ₁ = (3−√13)/2 ≈ −0.303. So −0.303·w₁₁ + w₁₂ = 0 → w₁₂ = 0.303·w₁₁. Normalizing: ‖w₁‖=1 gives w₁ ≈ (0.957, 0.290). PC2: w₂ ≈ (−0.290, 0.957) (orthogonal to w₁).
5. Step 5 — Projections onto PC1: z¹ = x̃¹ᵀw₁ = (−2)(0.957) + (−1)(0.290) = −2.204. z² = x̃²ᵀw₁ = 0·0.957 + 1·0.290 = 0.290. z³ = x̃³ᵀw₁ = 2·0.957 + 0·0.290 = 1.914. Variance along PC1: Var(z) ≈ λ₁ ≈ 4.303. Fraction explained: λ₁/(λ₁+λ₂) = (5+√13)/5 ≈ 86.1%.

*Answer:* Principal components: w₁ ≈ (0.957, 0.290) with variance λ₁ ≈ 4.303, w₂ ≈ (−0.290, 0.957) with variance λ₂ ≈ 0.697. PC1 explains ≈86.1% of total variance. Projections onto PC1: z¹ ≈ −2.204, z² ≈ 0.290, z³ ≈ 1.914 — these are the 1D representations of the 3 data points.

**Real-world intuition**

- Dimensionality reduction for visualization: reduce high-dimensional gene expression data (20,000 genes × 1,000 cells) to 2D via PCA for cluster visualization; the first two PCs separate known cell types, revealing batch effects or biological signals.
- Image compression: facial recognition datasets (eigenfaces) use PCA on the pixel matrix; top-50 eigenfaces capture the core variation in expression, lighting, and identity — basis for early face recognition systems.
- Finance (portfolio risk): PCA on the covariance matrix of asset returns reveals 'risk factors' — the first PC often corresponds to broad market movement, subsequent PCs to sector effects — enabling risk attribution and hedging.

**Practice progression**

*Fluency:*
  - G
  - i
  - v
  - e
  - n
  -  
  - S
  -  
  - =
  -  
  - [
  - [
  - 5
  - ,
  - 2
  - ]
  - ,
  - [
  - 2
  - ,
  - 2
  - ]
  - ]
  - ,
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - t
  - w
  - o
  -  
  - e
  - i
  - g
  - e
  - n
  - v
  - a
  - l
  - u
  - e
  - s
  -  
  - a
  - n
  - d
  -  
  - e
  - i
  - g
  - e
  - n
  - v
  - e
  - c
  - t
  - o
  - r
  - s
  -  
  - b
  - y
  -  
  - h
  - a
  - n
  - d
  - .
  -  
  - W
  - h
  - a
  - t
  -  
  - f
  - r
  - a
  - c
  - t
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - v
  - a
  - r
  - i
  - a
  - n
  - c
  - e
  -  
  - d
  - o
  - e
  - s
  -  
  - t
  - h
  - e
  -  
  - f
  - i
  - r
  - s
  - t
  -  
  - p
  - r
  - i
  - n
  - c
  - i
  - p
  - a
  - l
  -  
  - c
  - o
  - m
  - p
  - o
  - n
  - e
  - n
  - t
  -  
  - e
  - x
  - p
  - l
  - a
  - i
  - n
  - ?
*Conceptual:*
  - E
  - x
  - p
  - l
  - a
  - i
  - n
  -  
  - w
  - h
  - y
  -  
  - P
  - C
  - A
  -  
  - r
  - e
  - q
  - u
  - i
  - r
  - e
  - s
  -  
  - m
  - e
  - a
  - n
  - -
  - c
  - e
  - n
  - t
  - e
  - r
  - i
  - n
  - g
  - .
  -  
  - W
  - h
  - a
  - t
  -  
  - g
  - o
  - e
  - s
  -  
  - w
  - r
  - o
  - n
  - g
  -  
  - g
  - e
  - o
  - m
  - e
  - t
  - r
  - i
  - c
  - a
  - l
  - l
  - y
  -  
  - i
  - f
  -  
  - y
  - o
  - u
  -  
  - c
  - o
  - m
  - p
  - u
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - e
  - i
  - g
  - e
  - n
  - d
  - e
  - c
  - o
  - m
  - p
  - o
  - s
  - i
  - t
  - i
  - o
  - n
  -  
  - o
  - f
  -  
  - (
  - 1
  - /
  - n
  - )
  - X
  - ᵀ
  - X
  -  
  - i
  - n
  - s
  - t
  - e
  - a
  - d
  -  
  - o
  - f
  -  
  - (
  - 1
  - /
  - (
  - n
  - −
  - 1
  - )
  - )
  - X
  - ̃
  - ᵀ
  - X
  - ̃
  -  
  - (
  - w
  - h
  - e
  - r
  - e
  -  
  - X
  - ̃
  -  
  - i
  - s
  -  
  - n
  - o
  - t
  -  
  - c
  - e
  - n
  - t
  - e
  - r
  - e
  - d
  - )
  - ?
*Problem solving:*
  - A
  -  
  - d
  - a
  - t
  - a
  - s
  - e
  - t
  -  
  - i
  - n
  -  
  - ℝ
  - ¹
  - ⁰
  - ⁰
  -  
  - h
  - a
  - s
  -  
  - c
  - o
  - v
  - a
  - r
  - i
  - a
  - n
  - c
  - e
  -  
  - m
  - a
  - t
  - r
  - i
  - x
  -  
  - w
  - i
  - t
  - h
  -  
  - e
  - i
  - g
  - e
  - n
  - v
  - a
  - l
  - u
  - e
  - s
  -  
  - λ
  - ₁
  -  
  - =
  -  
  - 1
  - 0
  - 0
  - ,
  -  
  - λ
  - ₂
  -  
  - =
  -  
  - λ
  - ₃
  -  
  - =
  -  
  - 1
  - 0
  - ,
  -  
  - λ
  - ₄
  -  
  - =
  -  
  - .
  - .
  - .
  -  
  - =
  -  
  - λ
  - ₁
  - ₀
  - ₀
  -  
  - =
  -  
  - 1
  - .
  -  
  - H
  - o
  - w
  -  
  - m
  - a
  - n
  - y
  -  
  - p
  - r
  - i
  - n
  - c
  - i
  - p
  - a
  - l
  -  
  - c
  - o
  - m
  - p
  - o
  - n
  - e
  - n
  - t
  - s
  -  
  - a
  - r
  - e
  -  
  - n
  - e
  - e
  - d
  - e
  - d
  -  
  - t
  - o
  -  
  - c
  - a
  - p
  - t
  - u
  - r
  - e
  -  
  - 9
  - 0
  - %
  -  
  - o
  - f
  -  
  - t
  - h
  - e
  -  
  - t
  - o
  - t
  - a
  - l
  -  
  - v
  - a
  - r
  - i
  - a
  - n
  - c
  - e
  - ?
  -  
  - W
  - h
  - a
  - t
  -  
  - r
  - a
  - n
  - k
  - -
  - r
  -  
  - r
  - e
  - c
  - o
  - n
  - s
  - t
  - r
  - u
  - c
  - t
  - i
  - o
  - n
  -  
  - e
  - r
  - r
  - o
  - r
  -  
  - (
  - ‖
  - X
  -  
  - −
  -  
  - X
  - ̂
  - ‖
  - _
  - F
  - ²
  - )
  -  
  - r
  - e
  - s
  - u
  - l
  - t
  - s
  -  
  - f
  - r
  - o
  - m
  -  
  - k
  - e
  - e
  - p
  - i
  - n
  - g
  -  
  - o
  - n
  - l
  - y
  -  
  - t
  - h
  - e
  -  
  - t
  - o
  - p
  -  
  - 1
  -  
  - c
  - o
  - m
  - p
  - o
  - n
  - e
  - n
  - t
  - ?

**Assessment objectives**

*MCQ:* PCA is equivalent to computing the SVD of the mean-centered data matrix X̃ = UΣVᵀ. The principal components are: (A) The columns of V — CORRECT. (B) The columns of U. (C) The diagonal entries of Σ. (D) The rows of X̃.
*Short answer:* State the Eckart-Young theorem precisely. Explain why it implies that PCA gives the optimal linear dimensionality reduction for data reconstruction, and state what 'optimal' means (which norm, over which class of approximations).
*Proof/derivation:* Prove that the solution to: maximize wᵀSw subject to ‖w‖ = 1, where S ∈ ℝᵈˣᵈ is symmetric PSD, is the eigenvector of S corresponding to its largest eigenvalue. Use the method of Lagrange multipliers and the spectral theorem.

**Intuition**

Imagine your data as a cloud of points in high-dimensional space. PCA asks: 'If I had to draw a line through this cloud that best captures its shape, where would I put it?' The answer is the direction of maximum spread — the first principal component. Then: 'If I add a second perpendicular line, which direction adds the most of the remaining spread?' That's PC2. PCA is the greedy algorithm for finding the most informative orthogonal basis. It's like finding the axes of the best-fitting ellipse for your data cloud — those axes are the principal components, and the half-lengths are the square roots of the eigenvalues.

**Historical context**

Karl Pearson introduced PCA in 1901 as 'the method of fitting lines and planes to data in p-space' — framed as a least-squares fitting problem, not an eigenvalue problem. Harold Hotelling (1933) connected it to the eigendecomposition of the covariance matrix and coined the term 'principal components.' The SVD connection was developed by Golub and Reinsch (1970) and made PCA computationally stable. Modern PCA for large-scale data uses randomized SVD (Halko, Martinsson, Tropp 2011) which computes the top-r singular vectors in O(ndr) time instead of O(min(n,d)³), enabling PCA on billion-entry matrices.

**Connections**

PCA is entirely determined by the eigendecomposition (math.linalg.positive-definite) and SVD (math.linalg.svd) of the covariance matrix; the covariance matrix S connects to statistical estimation (math.stats.covariance-matrix); the optimization formulation (max variance subject to orthonormality) is a constrained optimization problem solved by Lagrange multipliers (math.opt.lagrange-multipliers); the Eckart-Young theorem connects PCA to matrix approximation theory.

**Common errors (deep dive)**

Two technical pitfalls: (1) Confusing PCA on S = XᵀX/(n−1) with PCA on the Gram matrix G = XXᵀ/(n−1) — eigenvalues are the same but eigenvectors differ (Kernel PCA uses G). (2) Applying PCA to data with different scales without standardizing — if one feature is in kilometers and another in meters, the meter feature will dominate simply due to scale. Always standardize (divide by standard deviation) before PCA when features have different units. After standardization, PCA operates on the correlation matrix rather than the covariance matrix.

**Exam strategy**

For PCA problems in exams: (1) Always mean-center first. (2) Compute S = X̃ᵀX̃/(n−1). (3) Find eigenvalues via characteristic polynomial. (4) Find eigenvectors by solving (S−λI)v=0. (5) Compute projections zᵢ = x̃ᵢᵀv₁. (6) Report fraction of variance explained = λ₁/Tr(S). For reconstruction error: ‖X̃ − X̂‖_F² = Σᵢ₌ᵣ₊₁ᵈ (n−1)λᵢ — the sum of discarded eigenvalues times (n−1).

**Socratic questions**

- PCA finds directions of maximum variance. In a supervised classification setting, is maximum variance the right objective? Can you construct a dataset where PCA discards the most discriminative direction?
- What happens to the principal components if you duplicate a feature in the data (add a column to X that is identical to an existing column)? How does this change the eigenvalues?
- Kernel PCA replaces the linear inner product with a kernel k(xᵢ,xⱼ). What is the 'feature space' implicit in kernel PCA with a Gaussian kernel, and why can kernel PCA capture nonlinear structure that PCA cannot?
- The scree plot shows the eigenvalue spectrum λ₁ ≥ λ₂ ≥ ... ≥ λᵈ. For random Gaussian data (no structure), what does the Marchenko-Pastur law predict about this spectrum?

**Prerequisite graph**

- Requires: math.linalg.svd, math.stats.covariance-matrix
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.linalg.svd

**Teaching hints — review triggers**

- Student cannot perform eigendecomposition of a 2×2 symmetric matrix → review eigenvalues and eigenvectors (math.linalg.positive-definite): use characteristic polynomial det(A−λI) = 0, then solve (A−λI)v = 0.
- Student unfamiliar with SVD → review singular value decomposition (math.linalg.svd): X = UΣVᵀ, columns of U are left singular vectors, columns of V are right singular vectors, σᵢ are singular values.
- Student does not understand variance in multivariate sense → review covariance matrices (math.stats.covariance-matrix): S_{ij} = Cov(Xᵢ, Xⱼ), diagonal entries are variances, S is symmetric PSD.

**Spaced repetition / revision guidance**



---

### Integer Programming

*Concept ID: `math.opt.integer-programming` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.7 · Estimated study time: 7h*

**Learning objective.** Formulate integer programs (IPs), understand why integer constraints make optimization NP-hard, apply LP relaxation and branch-and-bound, and recognize the structural role of total unimodularity in making integer solutions automatic.

LP with integer (or binary) constraints on variables. NP-hard in general. Solution methods: branch and bound, branch and cut, LP relaxation + cutting planes. Applications: scheduling, network design, combinatorial optimization.

An integer program (IP) minimizes a linear objective over a feasible set with the additional requirement that some or all variables take integer values: minimize cᵀx subject to Ax ≤ b, x ∈ ℤⁿ (pure IP) or x ∈ ℤᵏ × ℝⁿ⁻ᵏ (mixed-integer program, MIP). The LP relaxation replaces the integrality constraint with x ≥ 0, yielding a solvable LP whose optimal value is a lower bound for the IP. The gap between LP relaxation value and IP optimum is the integrality gap. Branch-and-bound (B&B): solve the LP relaxation; if any xᵢ is fractional (say xᵢ = 3.7), branch by creating two subproblems adding xᵢ ≤ 3 or xᵢ ≥ 4, pruning branches whose LP value exceeds the current best integer solution. Cutting plane methods (Gomory cuts, Chvátal-Gomory cuts) add valid inequalities that cut off the fractional LP optimal without removing any integer-feasible points, tightening the LP relaxation. Total unimodularity (TU): a matrix A is TU iff every square submatrix has determinant ∈ {0, ±1}. When A is TU and b is integral, the LP {Ax ≤ b, x ≥ 0} has integral extreme points — solving the LP automatically gives an integer solution. Network flow constraint matrices (incidence matrices of graphs) are TU, explaining why LP solves shortest path, max flow, and min-cost flow exactly.

**Key ideas**

- Integer constraints make problems NP-hard: LP is solvable in polynomial time (interior-point or simplex), but IP with n binary variables has 2ⁿ feasible points — the feasibility version is NP-complete (contains 3-SAT as a special case).
- LP relaxation provides a lower bound (for minimization): z_LP ≤ z_IP, with equality when the IP optimal happens to be an LP vertex. The integrality gap z_IP/z_LP measures how much the IP differs from its relaxation — for some problems this gap can be exponentially large.
- Branch-and-bound explores a tree of LPs: each node is an LP relaxation with added variable bounds. Pruning rules: (1) infeasible LP → prune; (2) LP optimal ≥ current best integer solution → prune; (3) LP optimal is integral → update incumbent. Good branching and bounding (dual bounds) are critical for practical performance.
- Total unimodularity (TU) is the magic property: if A is TU and b ∈ ℤᵐ, then all basic feasible solutions of Ax = b, x ≥ 0 are integral. Proof: BFS x = B⁻¹b — if B is a basis (invertible submatrix of A), det(B) ∈ {±1} by TU, so B⁻¹ has integer entries, and x = B⁻¹b ∈ ℤ.
- Binary IP is the foundation of combinatorial optimization: assignment problems, facility location, vehicle routing, and scheduling are all IPs with binary variables. The simplex method cannot solve them to integrality; branch-and-bound + cutting planes (implemented in commercial solvers like Gurobi, CPLEX) can solve instances with millions of variables in practice.

**Common misconceptions**

- *Misconception:* Rounding the LP relaxation solution to the nearest integer always gives the IP optimum.
  *Correction:* Naive rounding can give an infeasible solution (rounding violates constraints) or a highly suboptimal one. Even if feasible, the rounded solution can be arbitrarily far from optimal. For example, in a packing IP (0-1 knapsack), the LP optimal might have many fractional variables, and rounding all down gives a much smaller objective value than the true IP optimal.
- *Misconception:* Since IP is NP-hard, it cannot be solved for large instances.
  *Correction:* NP-hardness is a worst-case complexity statement — it says no polynomial algorithm exists for ALL instances. In practice, modern IP solvers exploit problem structure via cutting planes, preprocessing, symmetry breaking, and strong LP relaxations. Commercial solvers (Gurobi, CPLEX) routinely solve IPs with millions of variables in minutes for structured problems (logistics, scheduling), even though adversarial instances can be intractable.
- *Misconception:* The LP relaxation is just an approximation — its solution tells you nothing about the true IP optimum.
  *Correction:* The LP relaxation is a valid lower bound for the IP and is the core of the branch-and-bound algorithm. Moreover, for TU problems it gives the exact IP optimum. Even for general IPs, the LP dual provides certificates of optimality and infeasibility, and the quality of the LP bound directly determines how much B&B needs to explore.

**Visual teaching opportunities**

- 2D IP feasible region: LP relaxation polyhedron (continuous shaded region) with lattice points (integer feasible set as dots) overlaid — show the LP optimal at a fractional vertex and the nearest IP optimum at a lattice point inside the polyhedron.
- Branch-and-bound tree: 5-node tree with LP bounds at each node, pruned branches marked, incumbent solution updated as integer solutions are found — show how the tree progressively narrows down.
- Gomory cut diagram: LP feasible region with a cutting plane added that cuts off the fractional LP optimal but leaves all lattice points intact — illustrate tightening of the LP relaxation.

**Worked example**

*Problem:* Solve the integer program: maximize 5x₁ + 4x₂ subject to 6x₁ + 4x₂ ≤ 24, x₁ + 2x₂ ≤ 6, x₁, x₂ ≥ 0 and INTEGER. (This is the LP from chunk-01 with integrality constraints added.)

1. Step 1 — LP relaxation: From the LP worked example in linear-programming, the LP optimal is (x₁, x₂) = (3, 1.5), z_LP = 5(3) + 4(1.5) = 21. Since x₂ = 1.5 is fractional, the LP optimal is not integer-feasible.
2. Step 2 — Branch on x₂: Create two subproblems. Branch A: add constraint x₂ ≤ 1. Branch B: add constraint x₂ ≥ 2.
3. Step 3 — Branch A (x₂ ≤ 1): LP relaxation: max 5x₁+4x₂ s.t. 6x₁+4x₂ ≤ 24, x₁+2x₂ ≤ 6, x₂ ≤ 1, x₁,x₂ ≥ 0. With x₂ = 1 (active): 6x₁ ≤ 20 → x₁ ≤ 10/3; x₁ ≤ 4. Binding: x₁ = 10/3 ≈ 3.33, x₂ = 1. z_A = 5(10/3) + 4(1) = 50/3 + 4 ≈ 20.67. Fractional — branch on x₁. Sub-branch A1: x₁ ≤ 3, x₂ ≤ 1. Feasible; try (3,1): z = 19. Try corner (x₁=3, x₂=1): z = 5(3)+4(1) = 19. Sub-branch A2: x₁ ≥ 4, x₂ ≤ 1: 6(4)+4(1)=28 > 24 — infeasible (pruned).
4. Step 4 — Branch B (x₂ ≥ 2): LP: max 5x₁+4x₂ s.t. 6x₁+4x₂ ≤ 24, x₁+2x₂ ≤ 6, x₂ ≥ 2. With x₂ = 2: 6x₁ ≤ 16 → x₁ ≤ 8/3; x₁ ≤ 2. Optimal: x₁ = 2, x₂ = 2. z_B = 5(2)+4(2) = 18. This is integer-feasible! Incumbent updated to (2,2), z* = 18.
5. Step 5 — Pruning and conclusion: Branch A LP bound ≈ 20.67 > 18 (don't prune A yet). Sub-branch A1 integer solution (3,1) gives z = 19 > 18. Update incumbent to (3,1), z* = 19. Sub-branch A2 is infeasible (pruned). All branches processed: optimal is (x₁,x₂) = (3,1), z_IP = 19 < z_LP = 21. Integrality gap = 21 − 19 = 2.

*Answer:* IP optimal: (x₁,x₂) = (3,1) with objective value 19. LP relaxation optimal was 21 (at fractional point (3,1.5)). Integrality gap = 2. Branch-and-bound explored 4 nodes (LP relaxation + 3 branches), pruning one infeasible branch.

**Real-world intuition**

- Airline crew scheduling: assign crew members to flights subject to rest-time, certification, and cost constraints — formulated as a set-cover/set-partitioning IP with millions of binary variables, solved daily by airlines using commercial MIP solvers.
- VLSI circuit design: placement and routing problems require integer decisions (which gate goes where, which wire path to take) with hard physical constraints — MIP formulations guide chip layout optimization.
- Supply chain optimization: warehouse location (0-1 facility location), truck routing (vehicle routing problem), and inventory lot-sizing are all MIPs; commercial solvers give optimal or near-optimal solutions for real-world instances with thousands of decision points.

**Practice progression**

*Fluency:*
  - F
  - o
  - r
  - m
  - u
  - l
  - a
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - 0
  - -
  - 1
  -  
  - k
  - n
  - a
  - p
  - s
  - a
  - c
  - k
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - a
  - s
  -  
  - a
  - n
  -  
  - i
  - n
  - t
  - e
  - g
  - e
  - r
  -  
  - p
  - r
  - o
  - g
  - r
  - a
  - m
  - :
  -  
  - i
  - t
  - e
  - m
  - s
  -  
  - w
  - i
  - t
  - h
  -  
  - v
  - a
  - l
  - u
  - e
  - s
  -  
  - v
  - ᵢ
  -  
  - a
  - n
  - d
  -  
  - w
  - e
  - i
  - g
  - h
  - t
  - s
  -  
  - w
  - ᵢ
  - ,
  -  
  - k
  - n
  - a
  - p
  - s
  - a
  - c
  - k
  -  
  - c
  - a
  - p
  - a
  - c
  - i
  - t
  - y
  -  
  - W
  - .
  -  
  - W
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - I
  - P
  - ,
  -  
  - i
  - t
  - s
  -  
  - L
  - P
  -  
  - r
  - e
  - l
  - a
  - x
  - a
  - t
  - i
  - o
  - n
  - ,
  -  
  - a
  - n
  - d
  -  
  - d
  - e
  - s
  - c
  - r
  - i
  - b
  - e
  -  
  - w
  - h
  - a
  - t
  -  
  - '
  - i
  - n
  - t
  - e
  - g
  - r
  - a
  - l
  - i
  - t
  - y
  -  
  - c
  - o
  - n
  - s
  - t
  - r
  - a
  - i
  - n
  - t
  - '
  -  
  - m
  - e
  - a
  - n
  - s
  -  
  - f
  - o
  - r
  -  
  - t
  - h
  - i
  - s
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  - .
*Conceptual:*
  - D
  - e
  - f
  - i
  - n
  - e
  -  
  - t
  - o
  - t
  - a
  - l
  -  
  - u
  - n
  - i
  - m
  - o
  - d
  - u
  - l
  - a
  - r
  - i
  - t
  - y
  - .
  -  
  - P
  - r
  - o
  - v
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - i
  - n
  - c
  - i
  - d
  - e
  - n
  - c
  - e
  -  
  - m
  - a
  - t
  - r
  - i
  - x
  -  
  - o
  - f
  -  
  - a
  -  
  - b
  - i
  - p
  - a
  - r
  - t
  - i
  - t
  - e
  -  
  - g
  - r
  - a
  - p
  - h
  -  
  - (
  - r
  - o
  - w
  - s
  -  
  - =
  -  
  - v
  - e
  - r
  - t
  - i
  - c
  - e
  - s
  - ,
  -  
  - c
  - o
  - l
  - u
  - m
  - n
  - s
  -  
  - =
  -  
  - e
  - d
  - g
  - e
  - s
  - ,
  -  
  - e
  - n
  - t
  - r
  - y
  -  
  - =
  -  
  - 1
  -  
  - i
  - f
  -  
  - v
  - e
  - r
  - t
  - e
  - x
  -  
  - i
  - s
  -  
  - e
  - n
  - d
  - p
  - o
  - i
  - n
  - t
  -  
  - o
  - f
  -  
  - e
  - d
  - g
  - e
  - )
  -  
  - i
  - s
  -  
  - t
  - o
  - t
  - a
  - l
  - l
  - y
  -  
  - u
  - n
  - i
  - m
  - o
  - d
  - u
  - l
  - a
  - r
  - .
  -  
  - C
  - o
  - n
  - c
  - l
  - u
  - d
  - e
  -  
  - t
  - h
  - a
  - t
  -  
  - t
  - h
  - e
  -  
  - m
  - a
  - x
  - i
  - m
  - u
  - m
  -  
  - b
  - i
  - p
  - a
  - r
  - t
  - i
  - t
  - e
  -  
  - m
  - a
  - t
  - c
  - h
  - i
  - n
  - g
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - c
  - a
  - n
  -  
  - b
  - e
  -  
  - s
  - o
  - l
  - v
  - e
  - d
  -  
  - a
  - s
  -  
  - a
  - n
  -  
  - L
  - P
  - .
*Problem solving:*
  - F
  - o
  - r
  -  
  - t
  - h
  - e
  -  
  - s
  - e
  - t
  -  
  - c
  - o
  - v
  - e
  - r
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - (
  - g
  - i
  - v
  - e
  - n
  -  
  - s
  - e
  - t
  - s
  -  
  - S
  - ₁
  - ,
  - .
  - .
  - .
  - ,
  - S
  - ₘ
  -  
  - ⊆
  -  
  - U
  -  
  - w
  - h
  - e
  - r
  - e
  -  
  - |
  - U
  - |
  - =
  - n
  - ,
  -  
  - f
  - i
  - n
  - d
  -  
  - m
  - i
  - n
  - i
  - m
  - u
  - m
  -  
  - n
  - u
  - m
  - b
  - e
  - r
  -  
  - o
  - f
  -  
  - s
  - e
  - t
  - s
  -  
  - w
  - h
  - o
  - s
  - e
  -  
  - u
  - n
  - i
  - o
  - n
  -  
  - i
  - s
  -  
  - U
  - )
  - ,
  -  
  - f
  - o
  - r
  - m
  - u
  - l
  - a
  - t
  - e
  -  
  - a
  - s
  -  
  - a
  -  
  - 0
  - -
  - 1
  -  
  - I
  - P
  - .
  -  
  - T
  - h
  - e
  -  
  - L
  - P
  -  
  - r
  - e
  - l
  - a
  - x
  - a
  - t
  - i
  - o
  - n
  -  
  - h
  - a
  - s
  -  
  - i
  - n
  - t
  - e
  - g
  - r
  - a
  - l
  - i
  - t
  - y
  -  
  - g
  - a
  - p
  -  
  - u
  - p
  -  
  - t
  - o
  -  
  - O
  - (
  - l
  - o
  - g
  -  
  - n
  - )
  - .
  -  
  - G
  - i
  - v
  - e
  -  
  - a
  - n
  -  
  - e
  - x
  - a
  - m
  - p
  - l
  - e
  -  
  - w
  - i
  - t
  - h
  -  
  - 3
  -  
  - s
  - e
  - t
  - s
  -  
  - a
  - n
  - d
  -  
  - 4
  -  
  - e
  - l
  - e
  - m
  - e
  - n
  - t
  - s
  -  
  - w
  - h
  - e
  - r
  - e
  -  
  - t
  - h
  - e
  -  
  - L
  - P
  -  
  - g
  - i
  - v
  - e
  - s
  -  
  - a
  -  
  - f
  - r
  - a
  - c
  - t
  - i
  - o
  - n
  - a
  - l
  -  
  - s
  - o
  - l
  - u
  - t
  - i
  - o
  - n
  -  
  - w
  - i
  - t
  - h
  -  
  - v
  - a
  - l
  - u
  - e
  -  
  - <
  -  
  - t
  - h
  - e
  -  
  - I
  - P
  -  
  - o
  - p
  - t
  - i
  - m
  - a
  - l
  - ,
  -  
  - d
  - e
  - m
  - o
  - n
  - s
  - t
  - r
  - a
  - t
  - i
  - n
  - g
  -  
  - t
  - h
  - e
  -  
  - g
  - a
  - p
  - .

**Assessment objectives**

*MCQ:* A linear programming relaxation of an integer program (minimization) has optimal value 10. The true integer program optimum must be: (A) ≥ 10 — CORRECT. (B) ≤ 10. (C) Exactly 10. (D) Between 10 and 20.
*Short answer:* Explain why branch-and-bound is guaranteed to find the globally optimal integer solution despite only solving LP relaxations at each node. What property of LP ensures that we never miss better integer solutions by pruning?
*Proof/derivation:* Prove that if A ∈ ℤᵐˣⁿ is totally unimodular and b ∈ ℤᵐ, then every vertex of the polyhedron P = {x : Ax ≤ b, x ≥ 0} is integral. (Hint: use the definition of a vertex as a basic feasible solution x = B⁻¹b, and the fact that B is a nonsingular integer submatrix of A with |det(B)| = 1.)

**Intuition**

Linear programming is like finding the lowest point in a fenced-off continuous meadow — you can stand anywhere on or inside the fence. Integer programming is like the same meadow, but now you can only stand on grass tufts at integer grid positions. The LP solution might land between two tufts; IP forces you to pick a tuft. Sometimes the nearest tuft is almost as good; sometimes it's much worse. Branch-and-bound is systematic searching with smart pruning: you partition the search space into smaller fenced regions (by adding constraints xᵢ ≤ k or xᵢ ≥ k+1), solve the easier LP in each region, and throw away any region whose LP can't possibly beat your best integer solution so far.

**Historical context**

Integer programming was recognized as a fundamental problem in the 1950s during the operations research revolution. Gomory introduced the first complete algorithm (cutting planes) in 1958 — it converges theoretically but is slow in practice. Branch-and-bound was formalized by Land and Doig (1960) for general IPs. The NP-hardness of IP (via 3-SAT reduction) was established during the complexity revolution of the 1970s. Total unimodularity was developed by Hoffman and Kruskal (1956), explaining why network flow LPs give integer solutions. Modern solvers (CPLEX 1988, Gurobi 2008) use sophisticated LP relaxation tightening (presolve, cutting planes, symmetry breaking) and have made previously intractable industrial problems routinely solvable.

**Connections**

IP builds directly on LP (math.opt.linear-programming) — the LP relaxation is the computational engine. The TU property connects to graph theory and network flows (math.disc, math.linalg). Combinatorial optimization problems (assignment, matching, covering, packing) are the primary application domains of IP. Approximation algorithms (for when exact IP is too slow) connect to the theory of integrality gaps and LP duality (math.opt.duality).

**Common errors (deep dive)**

A classic error: solving the LP relaxation, rounding, and declaring the result as the IP optimum without checking feasibility. The rounded solution may violate constraints (e.g., after rounding down a fractional packing variable, total weight might still exceed capacity, or rounding up might violate it). Always verify feasibility of any candidate solution. A subtler error: assuming that tighter LP relaxations always speed up B&B — adding too many cutting planes can slow the LP solve at each node even if it reduces tree size. The balance between bound quality and node solve time is the core engineering challenge in MIP solver design.

**Exam strategy**

IP exam problems usually ask you to: (1) formulate the IP (write variables, objective, constraints), (2) solve or partially trace the LP relaxation, (3) branch on a fractional variable and trace one or two nodes of B&B, (4) verify total unimodularity for a special structure (check determinants of 2×2 submatrices, or use the known TU theorem for bipartite incidence matrices). For TU proofs, remember the equivalent characterization: A is TU iff for every subset R of rows, there is a partition R = R₁ ∪ R₂ such that |Σᵢ∈R₁ aᵢⱼ − Σᵢ∈R₂ aᵢⱼ| ≤ 1 for all j.

**Socratic questions**

- If every vertex of the LP relaxation is integral, does that mean the LP relaxation and the IP always have the same optimal solution? What additional condition on the objective function is needed?
- The integrality gap for MAX-CUT (LP relaxation vs. true MAX-CUT value) can be up to 1/0.878 ≈ 1.14 under the Unique Games Conjecture. What does this mean for the hardness of approximating MAX-CUT beyond 0.878?
- Gomory cuts are valid inequalities — they don't remove any integer-feasible point. But they do remove some continuous LP-feasible points. Can you construct a simple example where a single Gomory cut reduces the LP relaxation to the IP optimum?
- Branch-and-bound can solve IPs with millions of variables in practice. Is this contradicted by the NP-hardness of IP? Explain the relationship between worst-case complexity and average-case or structured-instance performance.

**Prerequisite graph**

- Requires: math.opt.linear-programming
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.disc.complexity-classes

**Teaching hints — review triggers**

- Student cannot solve LP relaxations → review linear programming (math.opt.linear-programming): LP is the continuous relaxation of the IP; understand simplex method and feasible vertices.
- Student does not understand what 'NP-hard' means operationally → review computational complexity basics: NP-hard means no known polynomial-time algorithm exists for worst-case instances; B&B is exponential worst-case but often fast in practice.
- Student confused about what constraints are relaxed → clarify that LP relaxation removes only the integrality constraint (xᵢ ∈ ℤ → xᵢ ∈ ℝ) while keeping all linear inequality constraints Ax ≤ b, x ≥ 0.

**Spaced repetition / revision guidance**



---

### Dynamic Programming

*Concept ID: `math.opt.dynamic-programming` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 6h*

**Learning objective.** Understand dynamic programming (DP) as optimal substructure + overlapping subproblems, formulate DP recurrences from scratch, analyze time and space complexity, and distinguish DP from greedy and divide-and-conquer.

Optimization method exploiting optimal substructure: optimal solution contains optimal solutions to subproblems. Bellman equation: V*(s) = max_a [r(s,a) + γV*(s′)]. Applications: shortest paths, knapsack, sequence alignment, reinforcement learning.

Dynamic programming solves optimization problems by decomposing them into overlapping subproblems and storing solutions to avoid redundant computation. Two conditions are necessary: (1) Optimal substructure — an optimal solution to the full problem contains optimal solutions to subproblems. (2) Overlapping subproblems — the same subproblems recur many times. Given these, we define a value function V[·] (the DP table), write a recurrence expressing V[larger] in terms of V[smaller], specify base cases, and compute in an order that resolves dependencies (top-down with memoization or bottom-up tabulation). Bellman's principle of optimality (1957) formalizes optimal substructure: 'An optimal policy has the property that whatever the initial state and decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision.' Continuous DP (Hamilton-Jacobi-Bellman equation): V(x,t) = min_u {f(x,u,t)dt + V(x+g(x,u,t)dt, t+dt)} — the continuous-time analog, central to optimal control. The curse of dimensionality (Bellman): if the state space has d dimensions each taking N values, the DP table has Nᵈ entries — exponential in d. Classic discrete DPs: shortest path (Bellman-Ford), sequence alignment (Smith-Waterman), knapsack, matrix chain multiplication, edit distance, coin change.

**Key ideas**

- Optimal substructure: the optimal solution to the problem contains optimal solutions to subproblems — this is the structural property that lets DP work. Greedy algorithms also require this, but additionally assume a greedy choice property (a locally optimal choice leads to a globally optimal solution).
- Memoization vs. tabulation: both achieve the same asymptotic complexity; memoization (top-down) only solves needed subproblems; tabulation (bottom-up) solves all subproblems in dependency order. Tabulation avoids recursion stack overhead; memoization avoids computing unnecessary subproblems.
- Bellman-Ford shortest path is DP: V[v][k] = minimum distance from source to v using at most k edges. Recurrence: V[v][k] = min(V[v][k−1], min_{(u,v)∈E} (V[u][k−1] + w(u,v))). Base: V[source][0] = 0, V[v][0] = ∞ for v ≠ source. After n−1 iterations, V[v][n−1] = shortest path distance (or −∞ if negative cycle reachable).
- DP vs. greedy: greedy makes one decision per step without reconsidering; DP considers all decisions at each step and takes the best. Greedy is O(n log n) or O(n) but incorrect for many problems; DP is slower but always finds the global optimum under optimal substructure.
- The curse of dimensionality: state space is the product of all state variable ranges. For a control problem with position, velocity, and orientation in 3D space, a discrete DP with N grid points per dimension has N⁶ states — 10⁶ for N=10, but 10¹² for N=100. This limits exact DP to low-dimensional problems; approximate DP (ADP, reinforcement learning) addresses the curse.

**Common misconceptions**

- *Misconception:* Dynamic programming is a specific algorithm, like Dijkstra's or quicksort.
  *Correction:* DP is a design paradigm — a way of thinking about and structuring recurrences — not a specific algorithm. Applying DP to a new problem means identifying the state space, writing the recurrence, and choosing the computation order. The specific algorithm varies completely across problems: knapsack DP looks nothing like sequence alignment DP, even though both are DP.
- *Misconception:* Memoization makes DP exponentially faster than brute force.
  *Correction:* Memoization eliminates redundant computation of the same subproblem, but the total number of distinct subproblems still determines the complexity. If there are exponentially many distinct subproblems, DP (with or without memoization) is still exponential. DP is polynomial when the number of distinct subproblems is polynomial — this is the key structural condition, often checked by counting distinct (parameter, value) pairs.
- *Misconception:* DP always requires a 2D table — one dimension for items, one for capacity or steps.
  *Correction:* DP tables can have any dimensionality matching the state space. Shortest path DP is 2D (vertex × step count); sequence alignment is 2D (prefix lengths); RNA folding DP is 2D (interval); all-pairs shortest paths (Floyd-Warshall) is 3D (source × destination × intermediate vertex set). The number of dimensions equals the number of independent quantities needed to describe a subproblem's state.

**Visual teaching opportunities**

- DAG of subproblems for Fibonacci: show the full recursion tree with exponential branching, then overlay the memoization table showing each subproblem computed exactly once — visual contrast of 2ⁿ nodes vs. n nodes.
- Knapsack DP table: 2D grid (items × capacity), with values filled in left-to-right, top-to-bottom — each cell uses the arrow from the previous row, showing optimal substructure in the table structure.
- Bellman-Ford on a small graph: 5-vertex graph with a few negative edges, table showing V[v][k] values for k = 0,...,4, with arrows indicating which predecessor edge achieved the minimum distance.

**Worked example**

*Problem:* Solve the 0-1 knapsack problem: items with values v = (3, 4, 5, 6) and weights w = (2, 3, 4, 5), knapsack capacity W = 8. Find the maximum value achievable.

1. Step 1 — DP formulation: Let V[i][c] = maximum value using items 1,...,i with capacity c. Recurrence: V[i][c] = max(V[i−1][c], vᵢ + V[i−1][c−wᵢ]) if c ≥ wᵢ, else V[i][c] = V[i−1][c]. Base case: V[0][c] = 0 for all c; V[i][0] = 0 for all i.
2. Step 2 — Fill table (4 items, capacity 0-8). Initialize: V[0][0...8] = 0. Item 1 (v=3, w=2): V[1][c] = 3 for c ≥ 2, else 0. Row 1: [0,0,3,3,3,3,3,3,3].
3. Step 3 — Item 2 (v=4, w=3): V[2][c] = max(V[1][c], 4 + V[1][c−3]) for c ≥ 3. c=3: max(3, 4+0)=4. c=4: max(3, 4+3)=7. c=5: max(3, 4+3)=7. c=6: max(3, 4+3)=7. c=7: max(3, 4+3)=7. c=8: max(3, 4+3)=7. Row 2: [0,0,3,4,7,7,7,7,7].
4. Step 4 — Item 3 (v=5, w=4): V[3][c] = max(V[2][c], 5+V[2][c−4]) for c ≥ 4. c=4: max(7, 5+0)=7. c=5: max(7, 5+3)=8. c=6: max(7, 5+4)=9. c=7: max(7, 5+7)=12. c=8: max(7, 5+7)=12. Row 3: [0,0,3,4,7,8,9,12,12].
5. Step 5 — Item 4 (v=6, w=5): V[4][c] = max(V[3][c], 6+V[3][c−5]) for c ≥ 5. c=5: max(8, 6+0)=8. c=6: max(9, 6+3)=9. c=7: max(12, 6+4)=12. c=8: max(12, 6+7)=13. Row 4: [0,0,3,4,7,8,9,12,13]. Answer: V[4][8] = 13. Traceback: item 4 taken (V[4][8]=13 > V[3][8]=12), c→3; item 3 not taken (V[3][3]=4); item 2 taken (V[2][3]=4 > V[1][3]=3), c→0; item 1 not taken. Items selected: {2, 4} with values 4+6=10... Wait, recheck: item 4 (v=6,w=5) taken, c=8→3; look at V[3][3]=4: item 3 not taken; V[2][3]=4: item 2 taken (v=4,w=3), c=3→0; item 1 not taken. Value = 6+4=10 ≠ 13. Try: V[4][8]=13: did we take item 4? V[3][8]=12 < 13, so YES item 4 taken. c→8−5=3. V[3][3]=4. V[2][3]=4=V[3][3], so item 3 NOT taken. V[2][3]=4. V[1][3]=3 < 4, so item 2 taken (w=3≤3). c→0. V[1][0]=0. So items {2,4}: value=4+6=10. But table says 13 at V[4][8]. Recheck row 3, c=7: item 3 taken (v=5,w=4): 5+V[2][3]=5+4=9 < V[2][7]=7? No: max(V[2][7], 5+V[2][3])=max(7,9)=9. Wait, row 2 c=7: V[2][7]=7. So V[3][7]=9. Then V[4][8]: 6+V[3][3]=6+4=10, V[3][8]=12. max(12,10)=12, not 13. Error! Let me redo row 3 c=8: max(V[2][8], 5+V[2][4])=max(7, 5+7)=max(7,12)=12. Row 3 c=8=12. V[4][8]: max(V[3][8], 6+V[3][3])=max(12, 6+4)=max(12,10)=12. So V[4][8]=12. Items: item 4 not taken (V[4][8]=V[3][8]=12). Traceback from V[3][8]=12: item 3 taken (5+V[2][4]=5+7=12=V[3][8]), c→4. V[2][4]=7: item 2 taken (4+V[1][1]=4+0=4 < 7)? No: max(V[1][4],4+V[1][1])=max(3,4)=4 ≠ 7. Hmm, V[2][4]=7 came from item 1+item2: both fit? V[1][4]=3 (item 1 taken), 4+V[1][1]=4+0=4. max(3,4)=4 ≠ 7. This means I made an error in row 2. Let me redo. Item 2 (v=4,w=3): c=4: max(V[1][4], 4+V[1][1])=max(3, 4+0)=4. NOT 7. c=5: max(V[1][5], 4+V[1][2])=max(3,4+3)=7. c=6: max(3,4+3)=7. c=7: max(3,4+3)=7. c=8: max(3,4+3)=7. So row 2: [0,0,3,4,4,7,7,7,7]. Now row 3 c=8: max(V[2][8], 5+V[2][4])=max(7,5+4)=max(7,9)=9. c=7: max(7,5+V[2][3])=max(7,5+4)=9. c=6: max(7,5+V[2][2])=max(7,5+3)=8. c=5: max(7,5+V[2][1])=max(7,5+0)=7. Row 3: [0,0,3,4,4,7,8,9,9]. V[4][8]: max(V[3][8], 6+V[3][3])=max(9,6+4)=10. V[4][7]: max(9,6+V[3][2])=max(9,6+3)=9. So V[4][8]=10. Items: take item 4 (6+V[3][3]=10 > V[3][8]=9), c→3. V[3][3]=4=V[2][3]: item 3 not taken. V[2][3]=4 > V[1][3]=3: item 2 taken (w=3,c=3→0). Item 1 not taken. Value=6+4=10. ✓

*Answer:* Optimal value = 10, achieved by selecting items 2 (value=4, weight=3) and 4 (value=6, weight=5), total weight=8=W. DP table V[4][8]=10. Time complexity O(nW) = O(4·8) = O(32) table entries; space O(nW) reducible to O(W) with rolling array.

**Real-world intuition**

- Bioinformatics (sequence alignment): Smith-Waterman and Needleman-Wunsch algorithms use DP to align DNA/protein sequences — the O(mn) DP table is the foundation of BLAST and all modern sequence databases.
- Reinforcement learning and optimal control: Q-learning (tabular RL) is DP on a Markov decision process; model predictive control solves a finite-horizon optimal control problem at each time step using DP; both connect to the Hamilton-Jacobi-Bellman equation.
- Natural language processing: the Viterbi algorithm for HMMs (part-of-speech tagging, speech recognition) is DP over a trellis; CYK parsing for context-free grammars is DP over substring intervals — DP underlies most of classical NLP.

**Practice progression**

*Fluency:*
  - S
  - t
  - a
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - r
  - e
  - c
  - u
  - r
  - r
  - e
  - n
  - c
  - e
  -  
  - f
  - o
  - r
  -  
  - t
  - h
  - e
  -  
  - e
  - d
  - i
  - t
  -  
  - d
  - i
  - s
  - t
  - a
  - n
  - c
  - e
  -  
  - (
  - L
  - e
  - v
  - e
  - n
  - s
  - h
  - t
  - e
  - i
  - n
  -  
  - d
  - i
  - s
  - t
  - a
  - n
  - c
  - e
  - )
  -  
  - b
  - e
  - t
  - w
  - e
  - e
  - n
  -  
  - s
  - t
  - r
  - i
  - n
  - g
  - s
  -  
  - s
  -  
  - (
  - l
  - e
  - n
  - g
  - t
  - h
  -  
  - m
  - )
  -  
  - a
  - n
  - d
  -  
  - t
  -  
  - (
  - l
  - e
  - n
  - g
  - t
  - h
  -  
  - n
  - )
  - .
  -  
  - W
  - h
  - a
  - t
  -  
  - a
  - r
  - e
  -  
  - t
  - h
  - e
  -  
  - b
  - a
  - s
  - e
  -  
  - c
  - a
  - s
  - e
  - s
  - ?
  -  
  - W
  - h
  - a
  - t
  -  
  - i
  - s
  -  
  - t
  - h
  - e
  -  
  - t
  - i
  - m
  - e
  -  
  - a
  - n
  - d
  -  
  - s
  - p
  - a
  - c
  - e
  -  
  - c
  - o
  - m
  - p
  - l
  - e
  - x
  - i
  - t
  - y
  - ?
*Conceptual:*
  - E
  - x
  - p
  - l
  - a
  - i
  - n
  -  
  - w
  - h
  - y
  -  
  - t
  - h
  - e
  -  
  - 0
  - -
  - 1
  -  
  - k
  - n
  - a
  - p
  - s
  - a
  - c
  - k
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - r
  - e
  - q
  - u
  - i
  - r
  - e
  - s
  -  
  - D
  - P
  -  
  - r
  - a
  - t
  - h
  - e
  - r
  -  
  - t
  - h
  - a
  - n
  -  
  - a
  -  
  - g
  - r
  - e
  - e
  - d
  - y
  -  
  - a
  - l
  - g
  - o
  - r
  - i
  - t
  - h
  - m
  - .
  -  
  - C
  - o
  - n
  - s
  - t
  - r
  - u
  - c
  - t
  -  
  - a
  -  
  - c
  - o
  - u
  - n
  - t
  - e
  - r
  - e
  - x
  - a
  - m
  - p
  - l
  - e
  -  
  - w
  - h
  - e
  - r
  - e
  -  
  - t
  - h
  - e
  -  
  - g
  - r
  - e
  - e
  - d
  - y
  -  
  - h
  - e
  - u
  - r
  - i
  - s
  - t
  - i
  - c
  -  
  - '
  - t
  - a
  - k
  - e
  -  
  - i
  - t
  - e
  - m
  -  
  - w
  - i
  - t
  - h
  -  
  - h
  - i
  - g
  - h
  - e
  - s
  - t
  -  
  - v
  - a
  - l
  - u
  - e
  - /
  - w
  - e
  - i
  - g
  - h
  - t
  -  
  - r
  - a
  - t
  - i
  - o
  - '
  -  
  - g
  - i
  - v
  - e
  - s
  -  
  - a
  -  
  - s
  - u
  - b
  - o
  - p
  - t
  - i
  - m
  - a
  - l
  -  
  - s
  - o
  - l
  - u
  - t
  - i
  - o
  - n
  - .
*Problem solving:*
  - F
  - o
  - r
  - m
  - u
  - l
  - a
  - t
  - e
  -  
  - a
  - n
  - d
  -  
  - s
  - o
  - l
  - v
  - e
  -  
  - t
  - h
  - e
  -  
  - l
  - o
  - n
  - g
  - e
  - s
  - t
  -  
  - c
  - o
  - m
  - m
  - o
  - n
  -  
  - s
  - u
  - b
  - s
  - e
  - q
  - u
  - e
  - n
  - c
  - e
  -  
  - (
  - L
  - C
  - S
  - )
  -  
  - p
  - r
  - o
  - b
  - l
  - e
  - m
  -  
  - f
  - o
  - r
  -  
  - s
  - t
  - r
  - i
  - n
  - g
  - s
  -  
  - '
  - A
  - B
  - C
  - B
  - D
  - A
  - B
  - '
  -  
  - a
  - n
  - d
  -  
  - '
  - B
  - D
  - C
  - A
  - B
  - '
  - .
  -  
  - W
  - r
  - i
  - t
  - e
  -  
  - t
  - h
  - e
  -  
  - D
  - P
  -  
  - r
  - e
  - c
  - u
  - r
  - r
  - e
  - n
  - c
  - e
  - ,
  -  
  - f
  - i
  - l
  - l
  -  
  - t
  - h
  - e
  -  
  - 7
  - ×
  - 5
  -  
  - t
  - a
  - b
  - l
  - e
  -  
  - (
  - o
  - r
  -  
  - a
  -  
  - r
  - e
  - l
  - e
  - v
  - a
  - n
  - t
  -  
  - p
  - o
  - r
  - t
  - i
  - o
  - n
  - )
  - ,
  -  
  - a
  - n
  - d
  -  
  - t
  - r
  - a
  - c
  - e
  -  
  - b
  - a
  - c
  - k
  -  
  - t
  - o
  -  
  - f
  - i
  - n
  - d
  -  
  - t
  - h
  - e
  -  
  - L
  - C
  - S
  -  
  - i
  - t
  - s
  - e
  - l
  - f
  - ,
  -  
  - n
  - o
  - t
  -  
  - j
  - u
  - s
  - t
  -  
  - i
  - t
  - s
  -  
  - l
  - e
  - n
  - g
  - t
  - h
  - .

**Assessment objectives**

*MCQ:* The 0-1 knapsack problem with n items and capacity W has DP time complexity: (A) O(nW) — CORRECT. (B) O(n²). (C) O(2ⁿ). (D) O(nW²).
*Short answer:* State Bellman's principle of optimality. Give one example problem where it holds (enabling DP) and one where it fails (DP cannot be directly applied). Explain the structural difference between the two.
*Proof/derivation:* Prove that the Bellman-Ford algorithm correctly computes shortest paths in a graph with n vertices and m edges (possibly with negative edge weights, no negative cycles) in O(nm) time. Define the DP state, write the recurrence, and argue correctness by induction on the number of edges in the optimal path.

**Intuition**

Dynamic programming is the algorithmic equivalent of writing things down so you don't have to rethink them. Fibonacci numbers: if you compute F(5) by recursion without memoization, you recompute F(3) two times, F(2) three times — exponential work. With DP, you write down F(2), F(3), ... as you compute them, and each takes one lookup. The magic is that this only works when the same subproblem keeps appearing — 'overlapping subproblems.' And it's correct because each subproblem can be solved optimally regardless of how you got there — 'optimal substructure.' DP is divide-and-conquer with a memory and a notebook.

**Historical context**

Richard Bellman developed dynamic programming while at RAND Corporation in the 1950s, initially for sequential decision problems in operations research and control theory. He coined the name deliberately to avoid government scrutiny (in the McCarthy era, 'mathematical' research was politically sensitive — 'dynamic programming' sounded practical). Bellman's 1957 book formalized the optimality principle and the Hamilton-Jacobi-Bellman equation. The applications rapidly spread to economics (Samuelson), biology (sequence alignment, 1970s), and computer science (shortest paths, string matching, parsing). Modern reinforcement learning (Q-learning, policy gradient) is best understood as approximate dynamic programming for large-scale MDPs where the full DP table cannot be stored.

**Connections**

DP is the mathematical formalization of recursion + memoization from computer science (math.disc.recurrence-relation); it connects to Markov decision processes and reinforcement learning (AI/ML); the HJB equation connects DP to optimal control and PDEs (math.calc); sequence alignment DP connects to graph shortest-path algorithms (Bellman-Ford, math.disc); the curse of dimensionality connects to approximation theory and statistical learning (math.stats).

**Common errors (deep dive)**

The most common error: writing the recurrence backwards — relating a smaller subproblem to a larger one (making the base case circular). Always define V[i][...] as the optimal value for a subproblem of size i and write it in terms of V[i−1][...] (or smaller). Second common error: wrong base cases. The base case should be the smallest subproblem that can be solved without the recurrence — this is usually V[0][·] = 0 or V[·][0] = 0, but verify carefully for each problem. Third error: filling the table in the wrong order — always fill in dependency order: if V[i][c] depends on V[i−1][c'], fill row i−1 before row i.

**Exam strategy**

For DP exam problems: (1) Define state (what does V[i][c] mean?). (2) Write recurrence (V[i][c] = max/min of what choices?). (3) Write base cases. (4) State computation order (bottom-up: increasing i from 0 to n). (5) Fill a small example table. (6) Trace back to find the solution (not just the value). (7) State time complexity O(states × transitions per state) and space complexity O(states). For well-known problems (knapsack, LCS, edit distance, Bellman-Ford), memorize the recurrence and derive the rest.

**Socratic questions**

- Fibonacci numbers satisfy F(n) = F(n−1) + F(n−2), which has optimal substructure (in a trivial sense — there's only one way to decompose). But can you construct a problem where optimal substructure fails because the choice of decomposition for the full problem constrains the subproblem solutions?
- The knapsack DP runs in O(nW) time. But W can be exponentially large (requiring exponential bits to represent). Does this mean knapsack is solvable in polynomial time? Why or why not (what is the distinction between polynomial in n vs. polynomial in n and log W)?
- In reinforcement learning, the Q-function Q(s,a) satisfies the Bellman equation Q(s,a) = r(s,a) + γ·max_{a'} Q(s',a'). What is the 'optimal substructure' that this equation expresses? What would happen if the environment were non-Markovian (the next state depends on the last k states)?
- Floyd-Warshall computes all-pairs shortest paths in O(n³). It uses a 3D DP table V[i][j][k] = shortest path from i to j using only vertices {1,...,k} as intermediates. Write the recurrence. Why is this more efficient than running Bellman-Ford from every vertex?

**Prerequisite graph**

- Requires: math.disc.recurrence-relation
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none

**Teaching hints — review triggers**

- Student cannot write a recurrence relation → review recurrences and induction (math.disc.recurrence-relation): practice writing T(n) = a·T(n/b) + f(n) for divide-and-conquer; DP recurrences are similar but have an optimization (max/min) over choices.
- Student conflates DP with brute force → clarify: DP stores (memoizes) subproblem solutions and never recomputes them; brute force recomputes every subproblem from scratch. The speedup is exponential when subproblems overlap.
- Student cannot identify the state space → practice defining states: for sequence problems, the state is usually prefix lengths or interval endpoints; for knapsack-style problems, it's (item index, remaining capacity); for graph problems, it's (vertex, number of steps used).

**Spaced repetition / revision guidance**



---
