# Blueprint: math.de.systems-matrix-method

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.systems-matrix-method |
| name | Matrix Method for Systems of ODEs |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 8 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.de.systems-ode, math.linalg.eigenvalues, math.linalg.diagonalization |
| Cross-links | math.linalg.matrix-exponential |
| Unlocks | — |

## Component 1 — Learning Objective
The student writes a first-order linear system x' = Ax in matrix form; computes the eigenvalues and eigenvectors of A; assembles the general solution x(t) = c₁v₁eλ₁ᵗ + c₂v₂eλ₂ᵗ for real distinct eigenvalues; handles complex eigenvalues λ=α±βi by expressing the solution in real form using e^{αt}(cos(βt), sin(βt)); handles repeated eigenvalues using the Jordan block structure with a generalised eigenvector; defines the matrix exponential eᴬᵗ and explains how it unifies all cases; and applies initial conditions to find the particular solution x(t)=eᴬᵗx₀.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 2×2 system x₁'=ax₁+bx₂, x₂'=cx₁+dx₂ side by side with its matrix form [x₁;x₂]' = [[a,b];[c,d]][x₁;x₂]; draw arrows: "find eigenvalues of A" → "find eigenvectors" → "write solution xᵢ=vᵢeλᵢᵗ" → "combine: x=c₁v₁eλ₁ᵗ+c₂v₂eλ₂ᵗ"; annotate below: "This is EXACTLY the scalar method y=eλᵗ promoted to vectors")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | EIGENVECTOR-SOLUTION-IS-SCALAR | Student writes the solution as x(t) = eλᵗ (a scalar) rather than x(t) = v·eλᵗ (scalar-times-eigenvector); plugs eigenvalue into the ODE correctly but forgets the eigenvector | Type 5 — instruction-induced (the scalar ODE solution eλᵗ is learned first; students import the scalar form into the vector problem without realising that eλᵗ must be the COMPONENT of the direction, i.e., each component of x grows like eλᵗ along the corresponding eigenvector direction) |
| MC-2 | COMPLEX-EIGENVALUE-GIVES-COMPLEX-SOLUTION | When λ=α+βi, student writes x(t) = ve^{(α+βi)t} and reports a complex-valued solution; doesn't take real and imaginary parts to form two real independent solutions | Type 5 — instruction-induced (Euler's formula e^{iβt}=cosβt+i sinβt is taught in isolation; applying it to extract REAL solutions from complex eigenvalues requires an additional step — forming Re[ve^{λt}] and Im[ve^{λt}] — that is often stated without sufficient emphasis) |
| MC-3 | MATRIX-EXPONENTIAL-IS-COMPONENT-EXPONENTIAL | Student believes eᴬ = matrix whose (i,j) entry is e^{aᵢⱼ}; doesn't know that eᴬ = I + A + A²/2! + ⋯ (the matrix power series definition) | Type 1 — overgeneralisation (the scalar identity e^a = scalar; students apply "exponentiation" component-wise, which is not how matrix functions work — e^{[[0,1],[0,0]]} ≠ [[1,e],[1,1]] but equals [[1,1],[0,1]]) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Real distinct eigenvalues:**

**Setup:** x' = Ax where A is n×n. Try x(t) = veλᵗ (vector ansatz).
Then x' = λveλᵗ and Ax = Aveλᵗ.
Substituting: λv = Av → (A−λI)v = 0.
So λ must be an eigenvalue and v the corresponding eigenvector.

**General solution (2×2, distinct real λ₁ ≠ λ₂):**
x(t) = c₁v₁eλ₁ᵗ + c₂v₂eλ₂ᵗ.

**Worked example:**
x' = [[3,1],[0,2]]x. Eigenvalues: det(A−λI) = (3−λ)(2−λ) = 0 → λ₁=3, λ₂=2.
Eigenvector for λ₁=3: (A−3I)v = [[0,1],[0,−1]]v = 0 → v₁=[1;0].
Eigenvector for λ₂=2: (A−2I)v = [[1,1],[0,0]]v = 0 → v₁+v₂=0 → v₂=[1;−1].
General solution: x(t) = c₁[1;0]e³ᵗ + c₂[1;−1]e²ᵗ.

**P49 checkpoint:**
- CORRECT → "x=Ax: try veλᵗ → eigenvalue problem. Solution: Σcᵢvᵢeλᵢᵗ. ICs fix c₁,c₂." → A02
- PARTIAL (MC-1: forgot eigenvector) → "The solution is NOT just eλᵗ — it is v·eλᵗ where v is the EIGENVECTOR. The scalar eλᵗ says HOW FAST the solution grows; the eigenvector v says IN WHICH DIRECTION. Without the eigenvector, you have a scalar, not a vector." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "x' = [[0,1],[−2,−3]]x. Char. eq.: λ²+3λ+2=0 → λ₁=−1, λ₂=−2. Eigenvectors: v₁=[1;−1], v₂=[1;−2]. Solution: x=c₁[1;−1]e^{−t}+c₂[1;−2]e^{−2t}. With x(0)=[1;0]: c₁+c₂=1, −c₁−2c₂=0 → c₂=−1, c₁=2. x(t)=2[1;−1]e^{−t}−[1;−2]e^{−2t}." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Complex and repeated eigenvalues:**

**Complex eigenvalues λ=α±βi:**
With complex eigenvector v=a+ib (a,b ∈ ℝⁿ):
Complex solution: (a+ib)e^{(α+βi)t} = e^{αt}(a+ib)(cosβt+i sinβt).
Real solution pair:
x₁(t) = e^{αt}(a cosβt − b sinβt)
x₂(t) = e^{αt}(a sinβt + b cosβt)
General solution: x = c₁x₁ + c₂x₂.

**Repeated eigenvalue λ (algebraic mult. 2, geometric mult. 1):**
First solution: x₁ = v₁eλᵗ (eigenvector v₁).
Find generalised eigenvector v₂: (A−λI)v₂ = v₁.
Second solution: x₂ = (v₁t + v₂)eλᵗ.
General: x = c₁v₁eλᵗ + c₂(v₁t + v₂)eλᵗ.

**Matrix exponential (cross-link: math.linalg.matrix-exponential):**
eᴬᵗ = I + At + A²t²/2! + A³t³/3! + ⋯
Solution to x'=Ax with IC x(0)=x₀: x(t) = eᴬᵗx₀.
Computation: if A = PDP⁻¹ (diagonalisable), eᴬᵗ = Pe^{Dt}P⁻¹ where e^{Dt} = diag(eλ₁ᵗ,…,eλₙᵗ).

**P49 checkpoint:**
- CORRECT → "Complex λ=α±βi: real pair x₁,x₂ using e^{αt}(a cosβt−b sinβt) form. Repeated λ: generalised eigenvector → x₂=(v₁t+v₂)eλᵗ. Matrix exponential: eᴬᵗ=Pe^{Dt}P⁻¹." → Gate (P91)
- PARTIAL (MC-3: component-wise exponential) → "eᴬ is NOT the matrix with entries e^{aᵢⱼ}. It is defined by the power series: eᴬ = I + A + A²/2! + ⋯. For a diagonalisable A=PDP⁻¹: eᴬ = P·diag(e^{d₁},…,e^{dₙ})·P⁻¹ — the diagonal entries (eigenvalues) are exponentiated, not the matrix entries." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "x'=[[2,−1],[1,2]]x. λ=2±i. v=(A−(2+i)I)null: [[0,−1],[1,−i]]v=0 → v=[1;−i]=a+ib=[1;0]+i[0;−1]. x₁=e²ᵗ([1;0]cost−[0;−1]sint)=e²ᵗ[cost;sint]. x₂=e²ᵗ([1;0]sint+[0;−1]cost)=e²ᵗ[sint;−cost]. General: x=c₁e²ᵗ[cost;sint]+c₂e²ᵗ[sint;−cost]." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Solution anatomy: x(t) = v·eλᵗ. The eigenvector v ∈ ℝⁿ (or ℂⁿ) is the DIRECTION — it tells which combination of coordinates is growing/shrinking together. The scalar eλᵗ is the RATE — how fast that direction grows."
Step 2 — "Complex eigenvalue reality check: for real matrix A, complex eigenvalues come in conjugate pairs λ=α±βi. NEVER report a complex-valued solution to a real physical system. Always form Re[ve^{λt}] and Im[ve^{λt}] — these are real-valued and independent."
Step 3 — "Memory aid: compare to second-order scalar ODE. For r=α±βi, the scalar solution pair is e^{αt}cosβt and e^{αt}sinβt. For the system, each COMPONENT of x gets the same scalar factor — but the component coefficients are given by the real/imaginary parts of the eigenvector."

**TB-R02 (MC-3 MATRIX-EXPONENTIAL):**
Step 1 — "Matrix exponential definition: eᴬ = Σₙ Aⁿ/n! (power series, always converges). The matrix is raised to successive powers — NOT the entries."
Step 2 — "Computation via diagonalisation: if A = PDP⁻¹ with D = diag(λ₁,…,λₙ), then Aⁿ = PDⁿP⁻¹, so eᴬ = PeᴰP⁻¹ = P·diag(e^{λ₁},…,e^{λₙ})·P⁻¹. The EIGENVALUES (diagonal of D) are exponentiated, not the entries of A."
Step 3 — "Check: e⁰ = I (setting A=0 in the series: I+0+0+⋯=I). e^{At}x₀ at t=0 gives Ix₀=x₀ — the IC is satisfied automatically. Contrast: component-wise exponentiation of the zero matrix would give a matrix of 1s, not I."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve x' = [[1,2],[0,−1]]x with x(0)=[1;0].
2. Solve x' = [[0,−4],[1,0]]x. (Complex eigenvalues λ=±2i; express in real form.)
3. Solve x' = [[2,1],[0,2]]x with x(0)=[0;1]. (Repeated eigenvalue λ=2; find generalised eigenvector.)
4. Compute eᴬᵗ for A=[[3,1],[0,2]] using the diagonalisation A=PDP⁻¹. Verify that eᴬᵗx₀ at t=0 gives x₀=[1;1].
5. A 3×3 system: write the general solution of x' = Ax where A has eigenvalues 1 (with eigenvector [1;0;0]), 2 (with eigenvector [0;1;0]), and 3 (with eigenvector [0;0;1]). Without computing: what is eᴬ? (Hint: the eigenvectors are the standard basis vectors.)

**P55 — Reflect & Consolidate:** "x'=Ax: eigenvalue problem (A−λI)v=0. Real distinct λ: x=Σcᵢvᵢeλᵢᵗ. Complex λ=α±βi: real-part/imaginary-part pair with e^{αt}cos/sin factors. Repeated λ: generalised eigenvector gives x₂=(v₁t+v₂)eλᵗ. Matrix exponential: eᴬᵗ=Pe^{Dt}P⁻¹ unifies all cases; x(t)=eᴬᵗx₀."

**P76 — Transfer Probe (Cross-link mode: math.linalg.matrix-exponential):**
(a) Matrix exponential and the fundamental matrix: the fundamental matrix Φ(t) of x'=Ax (defined as the n×n matrix whose columns are n linearly independent solutions) satisfies Φ'=AΦ. Show that eᴬᵗ is the unique fundamental matrix with Φ(0)=I. Explain how Φ(t)Φ(s)=Φ(t+s) reflects the group structure of solutions. (b) Cayley-Hamilton and finite computation: the Cayley-Hamilton theorem states that A satisfies its own characteristic polynomial p(λ)=0, i.e., p(A)=0. This means Aⁿ can be expressed as a linear combination of I, A, …, Aⁿ⁻¹, so eᴬᵗ can be expressed EXACTLY as a polynomial in A of degree ≤ n−1 with t-dependent coefficients. For a 2×2 matrix, show that eᴬᵗ = α₀(t)I + α₁(t)A where α₀, α₁ satisfy the scalar ODEs derived from the eigenvalues (Putzer's algorithm). (c) Non-diagonalisable matrix exponential: for the Jordan block J = [[λ,1],[0,λ]], compute e^{Jt} directly from the power series. Show the answer is e^{λt}[[1,t],[0,1]] — the t factor is the hallmark of a repeated eigenvalue with deficient geometric multiplicity, directly explaining the (v₁t+v₂)eλᵗ solution form.

**P75 — Mastery Assessment:**
"(a) A 2×2 predator-prey linearised system: x' = [[−0.5, 0.4],[−0.3, 0.2]]x. Find the eigenvalues. Classify the equilibrium at the origin (stable/unstable node, saddle, spiral). Find the general real solution. (b) An RLC circuit network modelled as a 3×3 linear system x' = Ax. Given that A has eigenvalues −1, −2, −3 with corresponding eigenvectors v₁, v₂, v₃, write the general solution and the matrix exponential eᴬᵗ without computing eigenvectors explicitly. (c) For A=[[0,1],[0,0]] (repeated eigenvalue 0 with algebraic multiplicity 2): (i) compute eᴬᵗ using the series (A²=0, so only two terms survive); (ii) identify the generalised eigenvector v₂ satisfying Av₂=v₁; (iii) verify that x(t)=v₁t+v₂ is the second solution."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW complex eigenvalue real-form extraction and the matrix exponential connection
- Score ≤ 3/5 → PREREQUISITE GAP in math.linalg.eigenvalues or math.linalg.diagonalization; reassign

**P78 — Completion:** Matrix Method for Systems of ODEs certified. Student forms the eigenvalue problem, constructs solutions for all three eigenvalue cases (real distinct / complex / repeated), correctly computes the real-form solution from complex eigenpairs, and relates the general solution to the matrix exponential eᴬᵗ.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.linalg.matrix-exponential])
Target: Fundamental matrix and group structure; Cayley-Hamilton finite computation; Jordan block exponential
Skill tested: Connect the eigenvalue-based solution to the abstract matrix exponential framework

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
