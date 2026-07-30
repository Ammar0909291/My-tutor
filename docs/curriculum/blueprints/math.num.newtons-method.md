# Blueprint: math.num.newtons-method

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.newtons-method |
| Title | Newton's Method |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.num.root-finding, math.calc.derivative-definition |
| Cross-links | math.opt.gradient-methods |
| Unlocks | — |

## Component 1 — Learning Objective
Given a differentiable function f, the student derives the Newton iteration xₙ₊₁=xₙ−f(xₙ)/f'(xₙ) from the tangent-line approximation, applies it to locate a root to prescribed precision, identifies failure modes (zero derivative, divergence from a bad initial guess, oscillation, cycle), quantifies quadratic convergence (the number of correct digits approximately doubles each iteration for simple roots), and modifies the iteration xₙ₊₁=xₙ−m·f(xₙ)/f'(xₙ) to restore quadratic convergence for roots of multiplicity m.

## Component 2 — CPA Entry Stage
**C — Concrete** (draw tangent lines by hand on y=x²−2 starting at x=2, computing each tangent-intercept point before writing the formula)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | NEWTON-ALWAYS-CONVERGES | Student believes Newton's method converges for any continuous function and any starting point; does not consider divergence, cycles, or failure at flat regions | Type 5 — instruction-induced (Newton's method is introduced with examples where it converges beautifully; failure cases are deferred or omitted; the convergence theorem's assumption of "sufficiently close initial guess" is stated but not enforced) |
| MC-2 | INITIAL-GUESS-IRRELEVANT | Student picks an arbitrary starting point and expects convergence; does not use sign changes, graphs, or bracketing to find a good initial guess | Type 1 — overgeneralization (in problems with nice quadratic-convergence examples, any reasonable starting point works; student does not realise the basin of attraction can be small or fractal-shaped for complex functions) |
| MC-3 | LINEAR-CONVERGENCE-MEANS-SLOW | Student incorrectly discards a method showing linear convergence as "too slow to be useful," not recognising that linear convergence with factor 0.01 (say) still adds 2 significant digits per iteration | Type 3 — language contamination (the word "linear" is associated with "first-order" = slow compared with "quadratic" = fast; the RATE 0.01 matters more than the ORDER label) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Newton's method:**

| Representation | Content |
|---|---|
| Geometric | Draw tangent to y=f(x) at (xₙ, f(xₙ)); the tangent hits the x-axis at xₙ₊₁ |
| Algebraic (derivation) | Tangent: y−f(xₙ)=f'(xₙ)(x−xₙ); set y=0: x=xₙ−f(xₙ)/f'(xₙ) |
| Convergence table | f(x)=x²−2, x₀=2: x₁≈1.5, err≈0.086; x₂≈1.4167, err≈0.0025; x₃≈1.41422, err≈2×10⁻⁶; x₄≈1.414213562, err≈2×10⁻¹² |
| Code | x = 2.0; for _ in range(4): x = x - (x**2-2)/(2*x) |

**Derivation — quadratic convergence:**
Let α be the simple root (f(α)=0, f'(α)≠0). Define eₙ=xₙ−α. Taylor: f(xₙ)=f'(α)eₙ+½f''(α)eₙ²+O(eₙ³). Then:
eₙ₊₁=xₙ₊₁−α=eₙ−f(xₙ)/f'(xₙ)≈−[f''(α)/(2f'(α))]eₙ²+O(eₙ³).
So |eₙ₊₁|≈C·eₙ² — **quadratic convergence**: the error squares each step.

**P49 checkpoint:**
- CORRECT → "Newton's method: xₙ₊₁=xₙ−f(xₙ)/f'(xₙ). Geometric derivation: tangent line to y=f(x) crosses x-axis at next iterate. Quadratic convergence for simple roots: correct digits approximately doubles each iteration." → A02
- PARTIAL (can apply the formula but cannot explain why it converges quadratically) → "Write down the Taylor expansion of f(xₙ) around the root α. Divide by f'(xₙ)≈f'(α). What power of eₙ=xₙ−α remains in eₙ₊₁?" → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Draw y=x²−2. At x=2, draw the tangent. Where does it cross the x-axis? That's x₁. Now repeat at x₁." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Convergence gallery — success and failure:**

**Success — simple root, good start:** f(x)=x³−x−2, x₀=2. Root α≈1.5214. Iteration converges in 5 steps to 15 digits.

**Failure 1 — zero derivative:** f(x)=x^{1/3}, f'(x)=(1/3)x^{-2/3}. Newton: xₙ₊₁=xₙ−x^{1/3}_{n}/(x^{-2/3}_{n}/3)=xₙ−3xₙ=−2xₙ. Iteration DIVERGES (doubling distance each step).

**Failure 2 — bad initial guess / oscillation:** f(x)=x³−x, roots at 0, ±1. Starting at x₀=1/√5 causes a 2-cycle: the method oscillates between two points indefinitely.

**Multiple root — linear convergence:** f(x)=(x−1)², f'(x)=2(x−1). Newton: xₙ₊₁=xₙ−(xₙ−1)²/(2(xₙ−1))=xₙ−(xₙ−1)/2=(1+xₙ)/2. This is a fixed-point iteration with ratio ½ — **linear convergence** (one correct digit per ~3 iterations).

**Modified Newton for multiple roots:** If f has a root of multiplicity m: xₙ₊₁=xₙ−m·f(xₙ)/f'(xₙ). Restores quadratic convergence but requires knowing m.

**Pattern:** Simple root + good start → quadratic convergence. Zero/small derivative → divergence. Multiple root → linear convergence (or use modified method).

**P49 checkpoint:**
- CORRECT → "Newton's method converges quadratically only for simple roots from a sufficiently close starting point. Zero derivative causes division-by-zero or extreme step. Multiple roots cause linear convergence; the modified method m·f/f' restores quadratic convergence." → A03
- PARTIAL (names failure modes but cannot describe the oscillation case) → "For f(x)=x³−x at x₀=1/√5: compute x₁=x₀−f(x₀)/f'(x₀). Then x₂ from x₁. Do you return to x₀? This is a 2-cycle: the method loops forever without converging." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "For f(x)=(x−1)², apply Newton starting at x=2. How many iterations to get |error|<10⁻⁶? Compare with a simple root." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Convergence failure gate:**

**Gate question (MC-1):** "A student starts Newton's method for f(x)=x−tan(x) at x₀=4.5 and observes the iterates diverging. What has gone wrong, and how should they recover?"

f(x)=x−tan(x) has roots at 0, ±π, ±2π, etc. Between π and 3π/2, tan(x)→±∞ and f'(x)=1−sec²(x)=−tan²(x) can be very large or very small. Starting at x₀=4.5 (near a vertical asymptote of tan), the Newton step −f(x₀)/f'(x₀) is huge, sending the iterate far away.

**Recovery strategies:**
1. Use a bracketing method (bisection) first to narrow down to an interval containing one root.
2. Combine bisection + Newton (e.g. Brent's method): use Newton when it would stay within the bracket, else bisect.
3. Plot f to identify a good starting interval, then switch to Newton once close.

**P49 checkpoint:**
- CORRECT → "Newton's method requires a good initial guess (within the basin of attraction). For functions with vertical asymptotes, oscillatory behavior, or multiple roots, start with bracketing or a graph. Brent's method combines safety (bracketing) with quadratic convergence (Newton/secant)." → Gate (P91)
- PARTIAL (identifies the divergence but does not know a recovery strategy) → "Bisection is the fallback: it always converges from a bracket [a,b] with f(a)f(b)<0. Once bisection has narrowed the interval to 10⁻³ precision, switch to Newton for quadratic speed-up. This hybrid is Brent's method in spirit." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Plot f(x)=x−tan(x) near x=4.5. What happens to tan(x) near x=3π/2≈4.71? Can the tangent line from x₀=4.5 give a useful crossing with the x-axis?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 NEWTON-ALWAYS-CONVERGES):**
Step 1 — "Newton's method converges quadratically only when: (a) f is twice differentiable, (b) f'(α)≠0 at the root α, (c) the starting point x₀ is sufficiently close to α. The theorem never says 'for any x₀.' For functions with multiple roots or complicated graphs, the basin of attraction can be tiny or even a fractal (Newton fractals for complex polynomials)." Step 2 — Counter-example: f(x)=x^{1/3}. Apply Newton: xₙ₊₁=−2xₙ. Starting at x₀=1: x₁=−2, x₂=4, x₃=−8, … . The iterates grow without bound. The issue: f'(0)=0 at the root — Newton's method is undefined there. Step 3 — "Rule: before applying Newton, check (a) that f is differentiable near the root, (b) that f'≠0 at the suspected root (no multiple root), (c) that a reasonable starting point can be obtained from a graph or bracketing. When in doubt, start with a method that is guaranteed to converge (bisection) and switch to Newton once close."

**TB-R02 (MC-2 INITIAL-GUESS-IRRELEVANT):**
Step 1 — "For Newton's method to converge, x₀ must lie in the 'basin of attraction' of the root — a neighborhood that may be small and hard to identify analytically. For simple polynomials with well-separated roots, any reasonable x₀ converges. For functions with many roots close together, oscillations, or flat regions, the basin can be very small." Step 2 — Strategy: plot f(x) over the domain of interest. Identify the sign change nearest your target root. Use the midpoint of that interval as x₀. Alternatively, run a few bisection steps to get within 0.01 of the root, then switch to Newton. Step 3 — "In practice: never apply Newton without first bounding the root with a sign-change interval. Use Newton only to refine, not to search. The secant method avoids computing f' by using a finite-difference approximation — also useful when f' is expensive or unavailable."

**TB-R03 (MC-3 LINEAR-CONVERGENCE-MEANS-SLOW):**
Step 1 — "Linear convergence means |eₙ₊₁|≈c·|eₙ| for a constant c<1 (the convergence rate). Quadratic means |eₙ₊₁|≈C·|eₙ|². For a double root of Newton's method, the linear rate is c=½ — you gain about log₁₀(2)≈0.3 decimal digits per iteration. After 50 iterations you have 15 digits. That is perfectly practical; it's just slower than quadratic." Step 2 — Comparison: simple root (quadratic) starting with error 10⁻¹: after 1 step ~10⁻², 2 steps ~10⁻⁴, 3 steps ~10⁻⁸, 4 steps ~10⁻¹⁶. Double root (linear, c=½): after k steps, error ≈ (½)^k × 10⁻¹, so 50 steps gives 10⁻¹⁶ — same accuracy, but 50 iterations instead of 4. Step 3 — "For a double root: use the modified method xₙ₊₁=xₙ−2f(xₙ)/f'(xₙ) (multiplicity m=2 substituted). This restores quadratic convergence. Alternatively, apply Newton to g(x)=f(x)/f'(x), which has a simple root wherever f had a double root."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Apply Newton's method to f(x)=cos(x)−x to find the fixed point (Dottie number ≈ 0.739). Start at x₀=0. Perform 4 iterations by hand (to 4 decimal places) and verify quadratic convergence.
2. For f(x)=(x−3)³, apply Newton's method from x₀=4. (a) Show convergence is linear. (b) Identify the linear rate c. (c) Apply the modified Newton with m=3 and show quadratic convergence.
3. Derive the secant method xₙ₊₁=xₙ−f(xₙ)·(xₙ−xₙ₋₁)/(f(xₙ)−f(xₙ₋₁)) from Newton's method by replacing f'(xₙ) with a finite-difference approximation. What is its order of convergence (approximately 1.618)?
4. Sketch the Newton basin of attraction for f(x)=x³−x on the real line. Identify which starting intervals lead to convergence to each of the three roots (0, 1, −1).

**P55 — Reflect & Consolidate:** "Newton: xₙ₊₁=xₙ−f/f'. Quadratic convergence for simple roots. Failure modes: f'=0, bad start, multiple roots. Modified Newton (multiply by m) restores quadratic for multiplicity m. Always bracket first; use Newton only to refine."

**P76 — Transfer Probe (Cross-link: math.opt.gradient-methods):**
Newton's method for optimisation minimises g(x) by finding g'(x)=0. (a) Show that applying Newton's method to f(x)=g'(x) gives the Newton update xₙ₊₁=xₙ−g'(xₙ)/g''(xₙ). (b) Apply this to g(x)=x⁴−4x²+4 to find all local minima starting from x₀=−3, x₀=0, x₀=3. (c) Identify a starting point where Newton's method for optimization finds a local MAXIMUM or a saddle point instead. (d) Explain how this connects to gradient-descent methods (which use only g', not g''), and why Newton converges faster near critical points.

**P55 — Reflect & Consolidate:** "Newton's method for optimisation: apply the root-finding iteration to f=g'. The Hessian g'' plays the role of f'. The method converges quadratically to a local extremum from a close start. Without convexity, it can find maxima or saddle points — the same convergence analysis and failure modes apply."

**P75 — Mastery Assessment:**
"f(x)=e^x−3x. (a) Show f has exactly two roots. (b) Find good initial guesses by plotting or sign analysis. (c) Apply Newton's method to each root until |f(xₙ)|<10⁻¹⁰. (d) Classify the convergence order numerically by computing log(|eₙ₊₁|)/log(|eₙ|). (e) A student starts at x₀=0.5 and sees the iterates bouncing between two values. Diagnose the issue and propose a fix."

**P55 — Reflect & Consolidate:** "Complete Newton workflow: (1) establish root count and rough locations (sign changes, plot); (2) pick x₀ within the basin; (3) iterate until convergence criterion; (4) verify order numerically; (5) if divergence or oscillation, fall back to bisection then re-enter Newton."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.newtons-method complete
- Score 3/5 → REVIEW failure modes and basin of attraction; replay A02–A03
- Score ≤ 2/5 → PREREQUISITE GAP in math.num.root-finding or math.calc.derivative-definition; reassign

**P78 — Completion:** Newton's method certified. Student derives the iteration from the tangent line, applies it to locate roots, explains quadratic convergence for simple roots, identifies all failure modes, applies the modified method for multiple roots, and connects the method to optimisation.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.opt.gradient-methods])
Target: Newton's method for optimisation (f=g'→g''); connection to gradient descent; convergence rate at critical points
Skill tested: Derive the optimisation update; apply to a multiminimum function; identify failure when starting at a maximum; contrast with gradient descent speed

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
