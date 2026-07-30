# Blueprint: math.num.error-analysis

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.error-analysis |
| name | Error Analysis |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 4 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.num.floating-point |
| Cross-links | — |
| Unlocks | math.num.newtons-method, math.num.numerical-differentiation, math.num.numerical-integration, math.num.lu-factorization, math.num.iterative-linear, math.num.euler-method |

## Component 1 — Learning Objective
Given a numerical computation, the student distinguishes absolute error (|x̃−x|), relative error (|x̃−x|/|x|), roundoff error (from floating-point representation), and truncation error (from approximating an infinite process); propagates errors through elementary operations using first-order Taylor expansion |Δf|≈|f'(x)||Δx|; computes the condition number κ of a problem and distinguishes ill-conditioned from well-conditioned inputs; applies backward error analysis (finding the exact problem that the computed answer solves exactly); and classifies algorithms as numerically stable or unstable using worked examples.

## Component 2 — CPA Entry Stage
**C — Concrete** (compute the condition number of a 2×2 linear system by comparing two nearly identical coefficient matrices and observing how small input changes produce large output changes — before any formula for κ)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | TRUNCATION-IS-ROUNDING | Student uses "truncation error" to mean floating-point roundoff (chopping a decimal), conflating two distinct error sources | Type 3 — language contamination (the word "truncate" appears in both "truncate a decimal" and "truncate a Taylor series"; students apply the more familiar arithmetic meaning to the numerical-methods context) |
| MC-2 | SMALL-RELATIVE-ERROR-MEANS-ACCURATE | Student concludes an answer is accurate because the relative error in the input is small; does not account for ill-conditioning multiplying that input error by κ | Type 5 — instruction-induced (error propagation is introduced with the formula |Δf|≈|f'||Δx|; the role of κ as the amplification factor is treated as an advanced separate topic, not integrated into the initial mental model) |
| MC-3 | BACKWARD-ERROR-IS-HARDER-TO-COMPUTE | Student avoids backward error analysis, believing it requires inverting the computation; does not realise that for many algorithms the backward error has a simple closed form | Type 1 — overgeneralization (backward analysis requires "finding what problem the algorithm solved exactly," which sounds like running the algorithm in reverse; students over-interpret this as requiring inversion of a complex chain of operations) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of numerical error:**

| Error type | Definition | Example: computing √2 ≈ 1.414 |
|---|---|---|
| Absolute error | |x̃−x| | |1.414−√2| ≈ 0.000213… |
| Relative error | |x̃−x|/|x| | 0.000213/1.41421… ≈ 1.5×10⁻⁴ |
| Roundoff error | error from fp representation | fl(√2)=1.41421356237… ≈ 1.4142135623730951, relative error ≤ u |
| Truncation error | error from approximating infinite process | stopping Newton's method after 3 iterations; error ≈ remaining correction |

**Error propagation (first-order Taylor):**
If x has absolute error Δx and f is differentiable: |Δf(x)| ≈ |f'(x)| · |Δx|.
Relative version: |Δf|/|f| ≈ |f'(x)·x/f(x)| · (|Δx|/|x|) = κ_f · (relative error in x).
The factor κ_f = |f'(x)·x/f(x)| is the **condition number** of the scalar problem.

**Examples:**
| f(x) | κ_f | Well-conditioned? |
|---|---|---|
| f(x) = x² | |2x·x/x²| = 2 | Yes (κ=2 near any x≠0) |
| f(x) = √x | |½x^{−1/2}·x/x^{1/2}| = ½ | Yes |
| f(x) = x−a (a≈x) | |x/(x−a)| → ∞ as x→a | No — catastrophic cancellation |

**P49 checkpoint:**
- CORRECT → "Absolute error = size of mistake; relative error = fractional size; truncation error = from stopping an infinite process early; roundoff error = from fp representation. Condition number κ measures input-to-output error amplification." → A02
- PARTIAL (confuses truncation and roundoff) → "Roundoff error happens at the storage level — representing a real number as a finite binary string. Truncation error happens at the algorithm level — stopping after finitely many terms of an infinite series or finitely many iterations. Both occur in most computations, independently." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "If I approximate sin(x)≈x for small x, what kind of error is that? If I represent sin(0.1) as a double, what kind of error is that?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Condition number and ill-conditioning — gallery:**

**Scalar example:** f(x,y)=x−y. If x=1.0000001 and y=1.0000000, then f=0.0000001; if x changes by 10⁻⁷ to 1.0000000, then f changes from 10⁻⁷ to 0 — a 100% relative change in output for a 10⁻⁸ relative change in input. κ→∞ for subtraction of nearly equal numbers.

**Matrix condition number:** κ(A)=‖A‖₂·‖A⁻¹‖₂ = σ_max/σ_min (ratio of largest to smallest singular value). For the system Ax=b, if A is perturbed by ΔA: ‖Δx‖/‖x‖ ≤ κ(A)·‖ΔA‖/‖A‖.

**Hilbert matrix ill-conditioning:** H_{ij}=1/(i+j−1). H_5 has κ≈4.8×10⁵; a relative perturbation of 10⁻¹⁶ (fp rounding) in b can change x by 4.8×10⁵×10⁻¹⁶=4.8×10⁻¹¹ relatively. H_{10} has κ≈10¹³ — nearly singular numerically.

**Backward error analysis:** The computed result x̃ is the EXACT solution to a perturbed problem Ãx̃=b̃ where ‖Ã−A‖/‖A‖ ≤ δ (the backward error δ). The forward error is then bounded by κ(A)·δ. Backward error often has a simple form even when the algorithm is complicated.

**Pattern:** ill-conditioned problems amplify any error (input noise, roundoff, truncation) by a large factor κ. A numerically stable algorithm keeps backward error small (≈u); the forward error is then κu — inevitable for ill-conditioned problems.

**P49 checkpoint:**
- CORRECT → "κ(A) measures worst-case amplification of input errors. Backward error = how big a perturbation of the true problem would produce exactly the computed answer. A stable algorithm has small backward error ≈u; an accurate answer additionally requires κ(A) to be small." → A03
- PARTIAL (understands condition number but not backward error) → "Backward error analysis asks: 'What problem did my algorithm actually solve?' If the answer is 'a problem that differs from the original by at most 5×10⁻¹⁵,' then the algorithm is backward-stable. This is usually EASIER to prove than bounding the forward error directly." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Solve [1 1; 1 1+10⁻¹⁰][x₁;x₂]=[2;2+10⁻¹⁰]. Perturb the (2,2) entry by 10⁻¹⁰. How much does the solution change?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Condition number gate:**

**Gate question (MC-2):** "A student computes the solution to Ax=b on a computer and reports a relative residual ‖Ax̃−b‖/‖b‖=10⁻¹⁴. Does this mean the solution x̃ is accurate to 14 decimal places?"

Not necessarily. The relative residual is the backward error δ≈10⁻¹⁴. The forward error satisfies ‖x̃−x‖/‖x‖ ≤ κ(A)·δ. If κ(A)=10¹⁰, the forward error could be as large as 10⁻¹⁴×10¹⁰=10⁻⁴ — only 4 decimal digits of accuracy in x̃, despite the tiny residual.

**Always report BOTH:**
- Backward error (residual): easy to compute without knowing the exact solution
- Condition number: characterises the problem, not the algorithm
- Their product bounds the forward error

**P49 checkpoint:**
- CORRECT → "Residual (backward error) measures whether x̃ approximately satisfies the equation. Condition number κ measures how the problem amplifies errors. Forward accuracy ≈ κ × backward error. A tiny residual on an ill-conditioned problem still means a potentially large forward error." → Gate (P91)
- PARTIAL (understands one factor but not the product) → "Think of κ as a magnifying glass: backward error 10⁻¹⁴ under a ×10¹⁰ lens becomes 10⁻⁴. Reporting only the residual is like describing a photograph by only the lens magnification — you need both the original size and the magnification." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "If κ(A)=10⁸ and the residual ‖Ax̃−b‖/‖b‖=10⁻¹² , what is the worst-case relative error in x̃?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 TRUNCATION-IS-ROUNDING):**
Step 1 — "Two completely different sources: ROUNDOFF happens at the arithmetic level — your processor cannot store π exactly, so it rounds to the nearest representable double. TRUNCATION happens at the algorithm level — you stop a Taylor series at degree 5 instead of including infinitely many terms, or you stop iterating Newton's method after 10 steps. Both produce errors; they are independent and must be tracked separately." Step 2 — Taylor expansion: sin(x)=x−x³/6+x⁵/120−… . If you keep only x−x³/6, the truncation error is |x⁵/120−…|≈x⁵/120 for small x. Then, the stored value x is itself rounded (roundoff error ≤ u|x|). These two errors add independently. Step 3 — "Rule: truncation error decreases as you take more terms or more iterations; you can control it. Roundoff error is determined by the precision of your floating-point system (u); you cannot reduce it without changing precision. Balancing them gives an optimal step size in most numerical algorithms."

**TB-R02 (MC-2 SMALL-RELATIVE-ERROR-MEANS-ACCURATE):**
Step 1 — "A small relative error in the INPUT is necessary but not sufficient for a small relative error in the OUTPUT. The condition number κ tells you how much the problem amplifies input errors. If κ=10¹⁰, an input error of 10⁻¹⁵ (near machine precision) becomes an output error of 10⁻⁵ — 10 digits are lost." Step 2 — Demonstration: solve Hx=b for the 10×10 Hilbert matrix (κ≈10¹³). In double precision (u≈10⁻¹⁶), the forward error can reach κ·u≈10⁻³. A numerically stable solver like Gaussian elimination with pivoting achieves the MINIMUM possible error of κ·u; no algorithm can do better on an ill-conditioned problem. Step 3 — "Standard diagnostic: before solving a linear system, compute κ(A) using SVD or an estimator (e.g. cond(A) in MATLAB/NumPy). If κ·u≈1, the problem is numerically rank-deficient and no algorithm gives reliable solutions."

**TB-R03 (MC-3 BACKWARD-ERROR-IS-HARDER-TO-COMPUTE):**
Step 1 — "Backward error analysis asks a conceptual question, not a computational one: 'What nearby problem does my algorithm solve exactly?' For many algorithms, the answer takes a clean form. For Gaussian elimination solving Ax=b, the computed x̃ is the exact solution to (A+ΔA)x̃=b where ‖ΔA‖≤O(nu)‖A‖ — this is Wilkinson's theorem, proved once and applied to every run." Step 2 — Practical: compute the backward error as the normalised residual ‖Ax̃−b‖/(‖A‖·‖x̃‖). This requires only the computed x̃, A, and b — NOT the exact solution. It is usually cheap and informative. Step 3 — "Backward stability is the gold standard: an algorithm is backward-stable if its backward error is ≈u. Once you know the algorithm is backward-stable, the error bound is κ·u for every input, without further analysis. This is why backward analysis is fundamental to numerical linear algebra."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. For f(x)=1/x at x=0.01, compute the condition number κ_f. If x has relative error 10⁻¹⁰, what is the bound on the relative error in 1/x? Is f ill-conditioned at x=0.01?
2. A student solves Ax=b with a backward error of 3×10⁻¹⁵ and reports κ(A)=5×10⁷. (a) Estimate the relative forward error bound. (b) How many significant figures of x can the student trust?
3. Classify each as truncation or roundoff error: (a) computing e^x as 1+x+x²/2!+x³/3! (stopping at cubic term); (b) storing the computed sum 1+1/7; (c) taking 100 instead of ∞ iterations of an iterative solver; (d) subtracting fl(1.0000001)−fl(1.0000000).
4. The matrix [[10⁻⁸, 1],[1, 0]] has a very large condition number. (a) Use Gaussian elimination WITHOUT pivoting to solve [[10⁻⁸, 1],[1, 0]][x;y]=[1;1]. (b) Now use partial pivoting (swap rows). (c) Which gives a more accurate answer and why?

**P55 — Reflect & Consolidate:** "Absolute error = size; relative error = fraction; roundoff = fp storage; truncation = stopping early. Condition number κ = error amplification factor. Backward error (≈residual) + κ → forward error bound. Backward-stable algorithms achieve the theoretical minimum forward error κ·u."

**P76 — Transfer Probe (Independence mode):**
Evaluate f(x)=ln(sin(x)) near x=π. (a) Compute κ_f = |f'(x)·x/f(x)|. What happens to κ as x→π? (b) Give a numerical demonstration: compute f(π−10⁻⁸) using direct evaluation vs. a Taylor expansion of sin(x) near x=π. What is the backward error in each? (c) Is this primarily a roundoff or truncation problem? (d) What range of x is safe for direct evaluation, and what is the transition strategy?

**P55 — Reflect & Consolidate:** "Near singularities of f (where f→0 or f′→∞), the condition number κ diverges and the problem becomes ill-conditioned regardless of algorithm. The practitioner's response: document the ill-conditioning, use alternative representations near the singularity, and report a broader uncertainty interval."

**P75 — Mastery Assessment:**
"A student uses the recurrence xₙ₊₁ = 2.5xₙ − xₙ₋₁ to compute the sequence starting at x₀=1, x₁=1.5 (the intended orbit has xₙ→1.5 always). (a) Propagate errors through one step: if xₙ has error εₙ and xₙ₋₁ has error εₙ₋₁, what is εₙ₊₁? (b) Show that the recurrence is numerically unstable (the homogeneous solution includes a term that grows like (2.5)ⁿ). (c) What is the backward error of the computed x̃ₙ (i.e. what original x₀, x₁ does the recurrence exactly reproduce)? (d) Propose a stable reformulation."

**P55 — Reflect & Consolidate:** "Numerical stability is not just about individual operations — an algorithm's error can grow exponentially through a recurrence even when each step has tiny backward error. Always check stability by analysing the homogeneous solution or by running with two slightly different initial conditions and observing how the difference grows."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.error-analysis complete
- Score 3/5 → REVIEW condition number and backward error distinction; replay A02–A03
- Score ≤ 2/5 → PREREQUISITE GAP in math.num.floating-point; reassign

**P78 — Completion:** Error analysis certified. Student distinguishes all four error types, propagates errors through a computation, interprets condition numbers, applies backward error analysis, and classifies algorithms as stable or unstable.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Condition number divergence near singularities; distinguishing roundoff from truncation near x=π; transitional strategy
Skill tested: Compute κ_f from f'; identify ill-conditioning numerically; diagnose the dominant error type; design a range-split strategy

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
