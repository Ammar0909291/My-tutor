# Blueprint: math.nt.pells-equation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.pells-equation |
| name | Pell's Equation |
| Domain | math.nt |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 8 |
| Mastery threshold | 0.65 |
| MAMR | 4/5 |
| Prerequisites | math.nt.general-diophantine |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student states Pell's equation x²−Dy²=1 (D a positive non-square integer) and recognises that it always has infinitely many positive integer solutions; identifies the fundamental solution (x₁,y₁) as the smallest positive-integer solution; generates all solutions from the fundamental solution via the recurrence xₙ₊₁=x₁xₙ+Dy₁yₙ, yₙ₊₁=x₁yₙ+y₁xₙ (equivalently via (xₙ+yₙ√D)=(x₁+y₁√D)ⁿ); finds the fundamental solution by computing the continued-fraction expansion of √D; and explains the historical misattribution of the equation to John Pell.

## Component 2 — CPA Entry Stage
**P — Pictorial** (plot the hyperbola x²−2y²=1 on a grid; mark integer points: (1,0) is trivial; (3,2): 9−8=1 ✓; (17,12): 289−288=1 ✓; (99,70): 9801−9800=1 ✓; the lattice points on this hyperbola are the solutions, spaced further and further apart but never ending)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | PELL-HAS-ONLY-TRIVIAL-SOLUTION | Student believes (1,0) (and (−1,0)) are the only solutions to x²−Dy²=1; doesn't recognise that nontrivial solutions always exist and form an infinite family | Type 1 — overgeneralization (the related equation x²−Dy²=0 has only the trivial solution x=y=0 for non-square D; students conflate the two and conclude Pell only has trivial solutions) |
| MC-2 | NEGATIVE-D-CASE-IS-ANALOGOUS | Student treats x²+Dy²=1 (positive D) the same as x²−Dy²=1; doesn't realise that x²+Dy²=1 with D>0 has only finitely many integer solutions (in fact only (±1,0)) | Type 5 — instruction-induced (the sign of D in the equation is visually minor; instructors who present x²−Dy²=1 quickly may not contrast with the positive-sign version; the finiteness of solutions for the positive-sign case is a sharp but easily missed distinction) |
| MC-3 | SOLUTIONS-ARE-GENERATED-BY-ADDITION | Student tries to generate new Pell solutions from (x₁,y₁) by adding (x₁,y₁) repeatedly: (2x₁, 2y₁), etc.; doesn't know the correct recurrence/composition rule | Type 1 — overgeneralization (the harmonic series and arithmetic sequences suggest "add to get more"; the correct operation is multiplication in the ring ℤ[√D]: (x₁+y₁√D)ⁿ for n=1,2,3,… which is NOT simple addition of components) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four lenses on Pell's equation:**

| Lens | Content |
|---|---|
| Algebraic identity | (x₁²+Dy₁²) is a norm in ℤ[√D]; the product (x₁+y₁√D)(x₁−y₁√D)=x₁²−Dy₁²=1; composing norms gives the recurrence |
| Continued fractions | [a₀;a₁,a₂,…] for √D is periodic; the convergents pₙ/qₙ satisfy pₙ²−Dqₙ²=±1; the first pₙ/qₙ with +1 gives the fundamental solution (or the second if the period is even and convergents only give −1) |
| Hyperbola geometry | x²−Dy²=1 is a hyperbola; (x,y) are lattice points on it; they form a group under the composition law (x,y)*(a,b)=(xa+Dyb, xb+ya) |
| Historical note | Brahmagupta (628 CE) and Bhāskara II (1150 CE) solved it; Euler named it after John Pell (1611–1685) by mistake — Pell did not work on it |

**Continued-fraction method for D=2:**
√2 = 1+( √2−1) = 1+1/(1+√2) = 1+1/(2+1/(2+1/(2+…))) → CF = [1;2,2,2,…]

Convergents:
- p₀/q₀ = 1/1: 1²−2×1²=−1
- p₁/q₁ = 3/2: 9−8=1 ✓ → fundamental solution (3,2)
- p₂/q₂ = 7/5: 49−50=−1
- p₃/q₃ = 17/12: 289−288=1 ✓
- p₄/q₄ = 41/29: 1681−1682=−1

**Recurrence:** from (x₁,y₁)=(3,2):
- (x₂,y₂): x₂=3×3+2×2×2=9+8=17; y₂=3×2+2×3=6+6=12. Check: 289−288=1 ✓
- (x₃,y₃): x₃=3×17+2×2×12=51+48=99; y₃=3×12+2×17=36+34=70. Check: 9801−9800=1 ✓

**P49 checkpoint:**
- CORRECT → "Pell x²−Dy²=1 always has ∞ solutions. Fundamental solution from CF of √D. Recurrence: (xₙ+yₙ√D)=(x₁+y₁√D)ⁿ. Solutions grow roughly as (x₁+y₁√D)ⁿ." → A02
- PARTIAL (can find fundamental solution but can't generate the family) → "Once (x₁,y₁) is known, generate the family via the norm composition: (x₂,y₂)=(x₁²+Dy₁², 2x₁y₁) for the 'doubling' formula, or generally xₙ₊₁=x₁xₙ+Dy₁yₙ, yₙ₊₁=x₁yₙ+y₁xₙ. This comes from (x₁+y₁√D)(xₙ+yₙ√D)=x_{n+1}+y_{n+1}√D." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Find two positive-integer solutions to x²−3y²=1. Start by checking small values of y: y=1 gives x²=4, so x=2 ✓. Is (2,1) the fundamental solution? Find the next one." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Patterns in Pell solutions:**

**Growth rate:** xₙ+yₙ√D = (x₁+y₁√D)ⁿ grows exponentially. For D=2: x₁+y₁√2=3+2√2≈5.83; xₙ≈(5.83)ⁿ/2.

**Approximation quality:** yₙ/xₙ → 1/√D; in fact |xₙ/yₙ − √D| < 1/yₙ². Pell solutions are the BEST rational approximations to √D (the convergents of the CF expansion).

**Connection to units in ℤ[√D]:** the solutions to x²−Dy²=±1 are exactly the units of norm ±1 in the ring ℤ[√D]. The fundamental solution corresponds to the fundamental unit. This ring is a subring of the algebraic integers (see math.nt.algebraic-integers).

**Special cases:**
- D=1 is a perfect square, not considered (x²−y²=(x+y)(x−y)=1 → x+y=x−y=1 or x+y=x−y=−1 → trivial)
- D=n²m with m square-free: x²−n²my²=1 has the same solutions as x²−my²=1 scaled appropriately
- Negative Pell x²−Dy²=−1: solvable iff the period of the CF of √D is ODD; e.g. D=2 has period 1 (odd) so (1,1): 1−2=−1 ✓ before the fundamental solution to +1

**P49 checkpoint:**
- CORRECT → "Solutions grow as (x₁+y₁√D)ⁿ. Best approximations to √D. Units in ℤ[√D] correspond to solutions to norm-1 equations. Negative Pell x²−Dy²=−1: solvable iff CF period is odd." → A03
- PARTIAL (doesn't connect to best rational approximations) → "The continued fraction convergents pₙ/qₙ of √D are the rational numbers closest to √D for their denominator size — they're the 'best' approximations in the sense that no p/q with q≤qₙ is closer to √D. Pell solutions (xₙ,yₙ) ARE these convergent numerators and denominators, so solving Pell's equation is equivalent to finding the best rational approximations to √D." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Pell for D=5: √5=[2;4,4,4,…]. First convergent 2/1: 4−5=−1. Second: (2×4+2)/(4×1+1)=10/4... simplify: p₁=4×2+2=10? No, use the recurrence: p₋₁=1,p₀=2; pₙ=aₙpₙ₋₁+pₙ₋₂. So p₁=4×2+1=9, q₁=4×1+0=4. Check: 81−80=1 ✓. So (9,4) is fundamental." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**Solution-generation gate:**

**Gate question (MC-3):** "A student found the fundamental solution (3,2) to x²−2y²=1. They try to find the next solution by computing (3+2, 2+2)=(5,4). Check: 25−32=−7 ≠ 1. What went wrong?"

The student added coordinates, which doesn't work. The correct operation is MULTIPLICATION in ℤ[√2]: the next solution corresponds to (3+2√2)²=9+12√2+8=17+12√2, giving (17,12). The composition law is (x,y)*(a,b)=(xa+2yb, xb+ya): here (3,2)*(3,2)=(9+8, 6+6)=(17,12). Check: 17²−2×12²=289−288=1 ✓.

**P49 checkpoint:**
- CORRECT → "Generate Pell solutions by norm composition: (x₁+y₁√D)ⁿ, equivalently using the recurrence xₙ₊₁=x₁xₙ+Dy₁yₙ, yₙ₊₁=x₁yₙ+y₁xₙ. NOT by adding." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Compute (3+2√2)² by expanding. What are the rational and irrational parts? This gives the next Pell solution (17,12). Now compute (3+2√2)³ to get the one after that." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 PELL-HAS-ONLY-TRIVIAL-SOLUTION):**
Step 1 — "Verify: (3,2) satisfies x²−2y²=1 since 9−8=1. Both x=3 and y=2 are positive integers — this is a nontrivial solution, not the trivial (1,0)." Step 2 — "Pell's equation always has infinitely many solutions for non-square D. The continued-fraction theory proves this: √D always has a periodic continued fraction, and the convergents provide arbitrarily large solutions." Step 3 — "Contrast with x²+2y²=1: the only integer solution is (±1,0). The sign matters enormously. x²−2y²=1 is a hyperbola (extends to infinity, hitting infinitely many lattice points); x²+2y²=1 is an ellipse (bounded, only finitely many lattice points)."

**TB-R02 (MC-2 NEGATIVE-D-CASE-IS-ANALOGOUS):**
Step 1 — "x²+Dy²=1 with D>0: the left side is at least 1 when y=0 (giving x=±1) and grows for y≠0 (since Dy²>0). So x²=1−Dy²≤1, meaning y must be 0. The only integer solutions are (±1,0) — not the infinite family Pell gives." Step 2 — "Geometrically: x²+Dy²=1 is an ellipse (bounded region, finitely many lattice points). x²−Dy²=1 is a hyperbola (two branches extending to infinity, where the lattice-point density on the branches is eventually non-zero)." Step 3 — "Sign in front of Dy²: negative sign = hyperbola = infinitely many solutions. Positive sign = ellipse = finitely many (only trivial for D>0)."

**TB-R03 (MC-3 SOLUTIONS-ARE-GENERATED-BY-ADDITION):**
Step 1 — "Adding (x₁,y₁)+(x₁,y₁)=(2x₁,2y₁) gives (4x₁)²−D(4y₁)²=4(x₁²−Dy₁²)=4×1=4≠1. Addition preserves the form (x+y√D)+(a+b√D)=(x+a)+(y+b)√D, but the norm (x+a)²−D(y+b)² is not generally 1 even when x²−Dy²=a²−Db²=1." Step 2 — "The correct operation is MULTIPLICATION: (x+y√D)(a+b√D)=(xa+Dyb)+(xb+ya)√D. The norm is multiplicative: Norm((x+y√D)(a+b√D))=Norm(x+y√D)×Norm(a+b√D)=1×1=1. So the product is also a norm-1 element — another Pell solution." Step 3 — "The Pell solutions form a GROUP under multiplication in ℤ[√D]: closed under multiplication, have identity (1,0), and inverses (x,−y) (since (x+y√D)(x−y√D)=1). The generator (x₁,y₁) generates the whole infinite cyclic subgroup of positive solutions."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Find the fundamental solution to x²−3y²=1. Verify by checking small values. Then generate the next two solutions using the recurrence.
2. Find the continued-fraction expansion of √7. Use the convergents to find the fundamental solution to x²−7y²=1.
3. Find all integer solutions to x²−4y²=1. (Careful: D=4=2² is a perfect square. What happens to the equation? Factor x²−4y²=(x−2y)(x+2y)=1.)
4. Show that if (x₁,y₁) is the fundamental solution to x²−Dy²=1, then xₙ=(xₙ₊₁+xₙ₋₁)/2x₁ (i.e. xₙ satisfies a linear recurrence). Find the recurrence and characteristic equation.

**P55 — Reflect & Consolidate:** "x²−Dy²=1: always ∞ solutions for non-square D. Fundamental solution from CF of √D. Recurrence: (xₙ+yₙ√D)=(x₁+y₁√D)ⁿ. Solutions form an infinite cyclic group under norm multiplication. Best approximations to √D. Perfect-square D: not considered (factors differently)."

**P76 — Transfer Probe (Independence mode):**
(a) Archimedes' Cattle Problem (simplified): find the smallest positive integer solution to x²−4729494y²=1. You don't need to find it — explain why the continued fraction of √4729494 will eventually yield the answer, and why the solution is astronomically large (the actual solution has hundreds of thousands of digits). (b) The equation x²−2y²=−1 (negative Pell): find its fundamental solution. Explain why solutions to negative Pell automatically give solutions to positive Pell by squaring. (c) Pell-like equation x²−Dy²=N for general N: not always solvable, and the solution set has different structure. Describe the structure for N=−1 (if solvable) and give one example of N for which the equation has no solutions.

**P55 — Reflect & Consolidate:** "Negative Pell x²−2y²=−1: fundamental solution (1,1); squaring gives (1+√2)²=3+2√2, i.e. (3,2) for positive Pell. In general: if negative Pell is solvable (period of CF is odd), its solutions generate all Pell solutions of both signs. Archimedes: the large solution reflects the continued fraction's large period (almost 400,000 terms) before the first +1 convergent appears."

**P75 — Mastery Assessment:**
"(a) Find all solutions (x,y) with 0<y<50 to x²−7y²=1. List them. (b) Prove that the sequence (xₙ) satisfying the Pell recurrence is strictly increasing. (c) Prove that gcd(xₙ,yₙ)=1 for all n (all Pell solutions are primitive). (d) The equation x²−Dy²=4 appears in the theory of Chebyshev polynomials. If x=L_n (Lucas numbers) and y=F_n (Fibonacci numbers) for D=5, verify that L_n²−5F_n²=4(−1)ⁿ. [Use L₁=1,F₁=1,L₂=3,F₂=1,L₃=4,F₃=2.]"

**P55 — Reflect & Consolidate:** "Lucas-Fibonacci Pell: L_n²−5F_n²=4(−1)ⁿ — a signed Pell equation alternating between ±4. This connects Pell theory to the Fibonacci sequence via the golden ratio φ=(1+√5)/2 (which is the fundamental solution direction x₁+y₁√5=1+√5 for D=5, offset by 2)."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.pells-equation complete
- Score 3/5 → REVIEW the continued-fraction method and the composition recurrence; replay A01
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.general-diophantine; reassign

**P78 — Completion:** Pell's Equation certified. Student states solvability (always infinitely many solutions for non-square D); finds fundamental solution via continued fractions; generates the family via norm composition recurrence; distinguishes positive and negative Pell; explains the group structure of solutions.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Archimedes' Cattle Problem; negative Pell; Pell-like equations; Fibonacci/Lucas connection
Skill tested: Reason about continued-fraction period length; connect negative Pell to positive Pell via squaring

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
