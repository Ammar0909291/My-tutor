# Blueprint: math.disc.linear-recurrence

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.linear-recurrence |
| name | Linear Recurrences |
| Domain | math.disc |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.disc.recurrence-relation, math.alg.polynomial-roots |
| Cross-links | math.de.char-equation |
| Unlocks | — |

## Component 1 — Learning Objective
The student solves linear recurrences with constant coefficients by the characteristic equation method: for aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ⋯ + cₖaₙ₋ₖ, form the characteristic polynomial r^k = c₁r^{k−1} + ⋯ + cₖ; find its roots; write the general solution as a linear combination of terms rⁿ for distinct roots or nʲrⁿ for a root r of multiplicity j+1; apply initial conditions to determine the constants; solves the Fibonacci recurrence explicitly (Binet's formula); handles non-homogeneous recurrences by adding a particular solution; and recognises the connection to linear ODEs with constant coefficients.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the Fibonacci sequence as a table: n=0,1,2,3,4,5,6 → Fₙ=0,1,1,2,3,5,8; write the recurrence Fₙ=Fₙ₋₁+Fₙ₋₂; show the characteristic equation r²=r+1 → r²−r−1=0 → roots φ=(1+√5)/2 and ψ=(1−√5)/2; annotate: "general solution: Fₙ=Aφⁿ+Bψⁿ; initial conditions F₀=0, F₁=1 give A=1/√5, B=−1/√5 → Binet's formula: Fₙ=(φⁿ−ψⁿ)/√5")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CHARACTERISTIC-ROOT-IS-THE-TERM | Student confuses the characteristic root r with the term aₙ; writes "aₙ=r" or "the root is aₙ" instead of understanding that each root r contributes the term rⁿ (or nrⁿ for repeated roots) to the general solution; doesn't see that the solution to a recurrence is a FUNCTION of n, not a constant | Type 4 — notation-induced (the characteristic equation r²=c₁r+c₂ uses r as the unknown, and solving it gives numbers r₁,r₂; students conflate these numbers with the sequence values; the leap "root r → term rⁿ" is the conceptual bridge that needs explicit articulation — it mirrors the ODE substitution eˡᵗ where λ is the root of the characteristic equation) |
| MC-2 | REPEATED-ROOT-OMITS-POLYNOMIAL-FACTOR | Student correctly identifies that r is a repeated root but writes the general solution as c₁rⁿ + c₂rⁿ = (c₁+c₂)rⁿ — a single term — instead of c₁rⁿ + c₂nrⁿ; loses the n-polynomial factor that multiplies repeated-root terms | Type 4 — notation-induced (for distinct roots, the formula is c₁r₁ⁿ+c₂r₂ⁿ — the two terms look similar; when r₁=r₂=r, students mechanically write two copies of the same formula: c₁rⁿ+c₂rⁿ = (c₁+c₂)rⁿ; the polynomial factor n that must distinguish them is not taught as an analogy until ODEs are studied; the analogy to e^{rt} and te^{rt} for repeated ODE roots is the correct model) |
| MC-3 | GENERAL-SOLUTION-WITHOUT-INITIAL-CONDITIONS-IS-THE-ANSWER | Student writes the general solution (with undetermined constants A, B) and reports it as the answer without applying the initial conditions to fix A and B; the general solution represents an infinite family of sequences satisfying the recurrence — the SPECIFIC sequence matching the problem's initial values is found only by solving the system of equations from the initial conditions | Type 5 — instruction-induced (instructors often spend more time deriving the general solution than solving for constants; the "general solution" is emphasised as the conceptual achievement; students disengage after finding it, missing the final concrete step of pinning the constants from the given aₙ values at small n) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Homogeneous linear recurrences with constant coefficients:**

**Standard form:** aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ⋯ + cₖaₙ₋ₖ (homogeneous: no extra term).

**Step 1 — Characteristic polynomial:** substitute the trial solution aₙ = rⁿ into the recurrence:
rⁿ = c₁rⁿ⁻¹ + c₂rⁿ⁻² + ⋯ + cₖrⁿ⁻ᵏ. Divide by rⁿ⁻ᵏ: **rᵏ − c₁rᵏ⁻¹ − c₂rᵏ⁻² − ⋯ − cₖ = 0**.

**Step 2 — Find roots.**

**Step 3 — General solution (distinct roots r₁,…,rₖ):**
aₙ = A₁r₁ⁿ + A₂r₂ⁿ + ⋯ + Aₖrₖⁿ.

**Repeated roots:** if r is a root of multiplicity m, its contribution is (A₀ + A₁n + A₂n² + ⋯ + Aₘ₋₁nᵐ⁻¹)rⁿ.

**Step 4 — Apply initial conditions:** substitute n=0,1,…,k−1 (known values) to get k equations in k unknowns A₁,…,Aₖ; solve the linear system.

**Fibonacci recurrence:**
Fₙ = Fₙ₋₁ + Fₙ₋₂, F₀=0, F₁=1.
Characteristic equation: r² − r − 1 = 0. Roots: φ=(1+√5)/2 ≈ 1.618 (golden ratio), ψ=(1−√5)/2 ≈ −0.618.
General solution: Fₙ = Aφⁿ + Bψⁿ.
F₀=0: A+B=0 → B=−A. F₁=1: Aφ+Bψ=1 → A(φ−ψ)=1 → A=1/(φ−ψ)=1/√5.
**Binet's formula:** Fₙ = (φⁿ − ψⁿ)/√5.

**P49 checkpoint:**
- CORRECT → "Char. poly: rᵏ−c₁rᵏ⁻¹−⋯−cₖ=0. Distinct roots: Σ Aᵢrᵢⁿ. Repeated root r multiplicity m: (A₀+A₁n+⋯+Aₘ₋₁nᵐ⁻¹)rⁿ. Apply ICs to get constants. Fibonacci: Binet's formula." → A02
- PARTIAL (MC-2: repeated root omits polynomial) → "Repeated root r of multiplicity 2: you need TWO LINEARLY INDEPENDENT solutions for a second-order recurrence. If you take rⁿ twice you get rⁿ and rⁿ — they're the same function! You need a SECOND independent solution: nrⁿ (verified: substitute nrⁿ into aₙ=c₁aₙ₋₁+c₂aₙ₋₂; if r is a double root, nrⁿ satisfies the recurrence exactly). General solution: (A+Bn)rⁿ. This is the exact analogue of the ODE solution (A+Bt)e^{rt} for a double root of the characteristic polynomial." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "aₙ=6aₙ₋₁−9aₙ₋₂, a₀=2, a₁=3. Char. eq.: r²−6r+9=0 → (r−3)²=0 → r=3, double root. General solution: (A+Bn)·3ⁿ. IC a₀=2: A·1=2 → A=2. IC a₁=3: (2+B)·3=3 → 2+B=1 → B=−1. Solution: aₙ=(2−n)·3ⁿ." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Non-homogeneous recurrences and the connection to ODEs:**

**Non-homogeneous form:** aₙ = c₁aₙ₋₁ + ⋯ + cₖaₙ₋ₖ + f(n), where f(n) ≠ 0.

**Method of undetermined coefficients (particular solution):**
- f(n) = dⁿ: try aₙ^(p) = Cdⁿ (if d is not a characteristic root); if d IS a root of multiplicity m, try Cnᵐdⁿ.
- f(n) = polynomial of degree t: try aₙ^(p) = polynomial of degree t; if 1 is a characteristic root of multiplicity m, multiply by nᵐ.
- f(n) = combination: superposition principle — try sum of corresponding particular forms.

**General solution = homogeneous solution + particular solution:**
aₙ = (homogeneous general solution with free constants) + (particular solution).
Then apply initial conditions to fix the free constants.

**Example — aₙ = 2aₙ₋₁ + 3, a₀=1:**
Homogeneous: aₙ^(h) = A·2ⁿ.
Particular (f(n)=3, constant = polynomial of degree 0, 1 not a char. root): try aₙ^(p)=C.
C=2C+3 → −C=3 → C=−3.
General: aₙ=A·2ⁿ−3. IC: a₀=1 → A−3=1 → A=4.
Solution: aₙ=4·2ⁿ−3=2^{n+2}−3. Verify: a₁=4·2−3=5, and 2·1+3=5. ✓

**Connection to linear ODEs with constant coefficients:** the recurrence equation aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ is the discrete analogue of y'' = c₁y' + c₂y. The characteristic equation is the same. Solutions rⁿ in discrete = eˡᵗ in continuous (r = eˡ). Repeated roots → polynomial factors in both settings. Non-homogeneous: particular solution methods identical.

**P49 checkpoint:**
- CORRECT → "Non-homogeneous: particular solution (undetermined coefficients) + homogeneous general solution. Superposition for sums. Apply ICs to fix constants AFTER adding particular solution. Same characteristic equation structure as linear ODEs." → Gate (P91)
- PARTIAL (MC-3: general solution is the answer) → "The general solution (with free constants A,B,...) is a FAMILY of sequences — one for each assignment of values to A, B. The specific problem specifies initial conditions a₀, a₁, …. You MUST substitute these into the general solution to solve for A, B, giving the UNIQUE solution to the initial value problem. Skipping this step leaves an infinite-parameter family, not a specific sequence. Example: for Fₙ=Aφⁿ+Bψⁿ, both A=0,B=0 (all zeros) and A=1/√5, B=−1/√5 (Fibonacci) satisfy the recurrence — only the ICs distinguish them." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "aₙ = 5aₙ₋₁ − 6aₙ₋₂ + 2ⁿ, a₀=1, a₁=2. Homogeneous: r²−5r+6=0 → (r−2)(r−3)=0, roots r=2,3. aₙ^(h)=A·2ⁿ+B·3ⁿ. Particular: f(n)=2ⁿ, but r=2 IS a char. root → try aₙ^(p)=Cn·2ⁿ. Substitute: Cn·2ⁿ=5C(n−1)2ⁿ⁻¹−6C(n−2)2ⁿ⁻²+2ⁿ. Factor out 2ⁿ⁻²: C·4n=5C·2(n−1)−6C(n−2)+4 → 4Cn=10Cn−10C−6Cn+12C+4 → 4Cn=4Cn+2C+4 → 2C=−4 → C=−2. So aₙ=A·2ⁿ+B·3ⁿ−2n·2ⁿ=(A−2n)·2ⁿ+B·3ⁿ. ICs: a₀=A+B=1; a₁=(A−2)·2+B·3=2→2A+3B=6. Solve: A=−3,B=4. Solution: (−3−2n)·2ⁿ+4·3ⁿ." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "The trial solution derivation: we GUESS aₙ=rⁿ and check if it works. Substitute into aₙ=c₁aₙ₋₁+c₂aₙ₋₂: rⁿ=c₁rⁿ⁻¹+c₂rⁿ⁻². Divide by rⁿ⁻²: r²=c₁r+c₂. So rⁿ IS a solution whenever r is a root of r²−c₁r−c₂=0. The root r gives the GEOMETRIC SEQUENCE aₙ=rⁿ as a solution. The general solution is a LINEAR COMBINATION of all such geometric sequences."
Step 2 — "Repeated-root derivation: if r₀ is a double root of r²−c₁r−c₂=0, then both r₀ⁿ AND (d/dr[rⁿ])|_{r=r₀}=nr₀ⁿ⁻¹ satisfy the recurrence. (This is the 'differentiation trick' that exactly parallels the ODE case.) Rescaling by r₀: nr₀ⁿ is also a solution. Verify: does nr₀ⁿ satisfy aₙ=c₁aₙ₋₁+c₂aₙ₋₂? Substitute: nr₀ⁿ=c₁(n−1)r₀ⁿ⁻¹+c₂(n−2)r₀ⁿ⁻²=r₀ⁿ⁻²[c₁(n−1)r₀+c₂(n−2)]; expand and use the double-root conditions r₀²=c₁r₀+c₂ and 2r₀=c₁. One can verify this closes. Accept this and memorise: double root r₀ → terms r₀ⁿ and nr₀ⁿ."
Step 3 — "Concrete check: aₙ=4aₙ₋₁−4aₙ₋₂, a₀=1, a₁=4. Char. eq.: r²−4r+4=(r−2)²=0, r=2 double. General: (A+Bn)·2ⁿ. a₀=A=1. a₁=(A+B)·2=4→1+B=2→B=1. Solution: (1+n)·2ⁿ. Check: a₂=(1+2)·4=12; 4·a₁−4·a₀=16−4=12. ✓ a₃=(1+3)·8=32; 4·12−4·4=48−16=32. ✓"

**TB-R02 (MC-3 CONSTANTS FROM INITIAL CONDITIONS):**
Step 1 — "Every linear recurrence of order k has an infinite family of solutions parametrised by k free constants. The initial conditions provide exactly k equations to determine the k constants. Step 1: write the general solution with undetermined constants A₁,…,Aₖ. Step 2: substitute n=0 → equation 1; n=1 → equation 2; …; n=k−1 → equation k. Step 3: solve the k×k linear system (usually by substitution for small k)."
Step 2 — "Non-homogeneous: the particular solution must be added BEFORE applying initial conditions. If you apply ICs to the homogeneous general solution alone, you get constants that ignore f(n) and the final sequence will not match the problem's initial values. Procedure: find aₙ^(h), find aₙ^(p), write aₙ=aₙ^(h)+aₙ^(p), THEN apply ICs to the FULL general solution."
Step 3 — "Verification always: after finding the specific solution, verify a₀ and a₁ match, then compute a₂ from the recurrence formula and from the closed form and check they agree. This catches constant-solving errors before they propagate."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve each recurrence with the given initial conditions: (a) aₙ=5aₙ₋₁−6aₙ₋₂, a₀=1, a₁=0; (b) aₙ=4aₙ₋₁−4aₙ₋₂, a₀=0, a₁=1; (c) aₙ=2aₙ₋₁−aₙ₋₂, a₀=3, a₁=4; (d) aₙ=aₙ₋₁+aₙ₋₂+aₙ₋₃, a₀=0, a₁=0, a₂=1.
2. Prove Binet's formula Fₙ=(φⁿ−ψⁿ)/√5 where φ=(1+√5)/2 and ψ=(1−√5)/2 by: (a) verifying Fₙ satisfies the Fibonacci recurrence; (b) checking F₀=0 and F₁=1.
3. Solve the non-homogeneous recurrence aₙ=3aₙ₋₁+2ⁿ, a₀=1. Identify whether 2 is a characteristic root; handle accordingly.
4. The Lucas numbers satisfy Lₙ=Lₙ₋₁+Lₙ₋₂ with L₀=2, L₁=1. Solve using the characteristic equation (same as Fibonacci) and express Lₙ in terms of φ and ψ. Show Lₙ=φⁿ+ψⁿ.
5. A savings account starts with £100. Each month, the balance grows by 1% interest and £50 is deposited. Write and solve the non-homogeneous recurrence for the balance aₙ after n months. (Hint: aₙ=1.01aₙ₋₁+50; particular solution: try C·1.01ⁿ... but wait, 1.01 IS the characteristic root; handle appropriately.)

**P55 — Reflect & Consolidate:** "Homogeneous: char. eq. rᵏ−c₁rᵏ⁻¹−⋯=0; distinct roots: Σ Aᵢrᵢⁿ; repeated root r mult. m: polynomial factor nᵐ⁻¹ times rⁿ. Non-homogeneous: particular solution + homogeneous; apply ICs to full solution. Fibonacci: Binet's formula. Connection to ODEs: rⁿ ↔ eˡᵗ."

**P76 — Transfer Probe (Cross-link mode: math.de.char-equation):**
(a) Generating functions and linear recurrences: the ordinary generating function A(x)=Σaₙxⁿ for a linear recurrence can be found by multiplying the recurrence by xⁿ and summing over n. For Fibonacci: A(x)=x/(1−x−x²); partial fractions in terms of φ and ψ give the closed form, identical to the characteristic equation method. Derive A(x) for Fibonacci and verify that the coefficient extraction matches Binet's formula. (b) Matrix diagonalisation: the recurrence vector (aₙ, aₙ₋₁) = M·(aₙ₋₁, aₙ₋₂) where M is the companion matrix of the characteristic polynomial. Then (aₙ, aₙ₋₁)=Mⁿ·(a₁,a₀). For Fibonacci, M=[[1,1],[1,0]]; Mⁿ has entries involving Fibonacci numbers. Show Mⁿ=P·diag(φⁿ,ψⁿ)·P⁻¹ where P is the matrix of eigenvectors, and that this gives Binet's formula directly. (c) The Skolem–Mahler–Lech theorem: for a linear recurrence aₙ with rational initial conditions and rational coefficients, the set {n : aₙ=0} is eventually periodic. This is a deep number-theoretic fact. Compare with the trivial observation that an nth-degree polynomial has at most n roots — linear recurrences behave much more regularly than arbitrary sequences but are harder to analyse than polynomials.

**P75 — Mastery Assessment:**
"(a) Solve aₙ=2aₙ₋₁+aₙ₋₂−2aₙ₋₃, a₀=1, a₁=0, a₂=−1. Find the characteristic polynomial, its roots, and apply initial conditions. (b) Show that for any linear recurrence with distinct real characteristic roots r₁>r₂>0, the ratio aₙ/aₙ₋₁→r₁ as n→∞ (the dominant root dominates). Use this to show Fₙ₊₁/Fₙ→φ≈1.618. (c) Find the general solution to aₙ=aₙ₋₂+2n. Is the particular solution a polynomial? Of what degree? Apply to find the specific solution with a₀=0, a₁=0. (d) What is the relationship between the recurrence aₙ=paₙ₋₁+qaₙ₋₂ having two real roots vs. complex roots vs. a repeated root, in terms of the discriminant p²+4q? Describe the qualitative behavior of each type of sequence."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the repeated-root polynomial factor and the non-homogeneous particular solution method
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.recurrence-relation or math.alg.polynomial-roots; reassign

**P78 — Completion:** Linear Recurrences certified. Student sets up and solves the characteristic equation for homogeneous linear recurrences; writes the correct general solution for distinct and repeated roots; applies initial conditions to determine constants; solves non-homogeneous recurrences by adding a particular solution; derives Binet's formula for Fibonacci; and recognises the structural parallel with linear ODEs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.de.char-equation])
Target: Generating functions reproduce the characteristic-equation solution; matrix diagonalisation via companion matrix; Skolem–Mahler–Lech zero-set theorem
Skill tested: Connect the algebraic recurrence-solving method to generating functions, linear algebra (diagonalisation), and number theory (zero-set periodicity)

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
