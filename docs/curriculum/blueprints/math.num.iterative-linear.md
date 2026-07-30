# Blueprint: math.num.iterative-linear

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.iterative-linear |
| name | Iterative Methods for Linear Systems |
| Domain | math.num |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 6 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.linalg.linear-system, math.num.error-analysis |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a large sparse linear system Ax=b, the student applies the Jacobi and Gauss–Seidel iterations, states the convergence condition (spectral radius of the iteration matrix ρ(M)<1), explains why direct methods (LU) are impractical for large sparse systems (fill-in), derives the conjugate gradient method as the optimal Krylov subspace solver for symmetric positive definite A, and selects a preconditioner to accelerate convergence.

## Component 2 — CPA Entry Stage
**C — Concrete** (guess x=0 for a 2×2 system; update each variable by "solving for it from the equation, treating the other as fixed" — several rounds by hand — before any matrix notation)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ITERATIVE-ALWAYS-SLOWER | Student assumes iterative methods are inferior to direct LU because they converge gradually rather than solving exactly — does not account for fill-in, which makes direct methods O(n³) even on sparse matrices | Type 5 — instruction-induced (LU is taught as the "proper" solution method for linear systems; iterative methods are presented as approximations, implying inferiority, without discussing sparsity) |
| MC-2 | JACOBI-AND-GS-ALWAYS-CONVERGE | Student believes Jacobi or Gauss–Seidel always converges to the solution, not realising convergence requires the spectral radius of the iteration matrix to be less than 1 | Type 1 — overgeneralization (convergence examples in textbooks are always chosen with diagonally dominant matrices; students do not check the convergence condition for other matrices and assume the methods always work) |
| MC-3 | CG-FOR-ANY-SYSTEM | Student applies the Conjugate Gradient method to any linear system, not recognising it requires A to be symmetric positive definite (SPD) — applying CG to a non-SPD system produces divergent iterates | Type 5 — instruction-induced (CG is presented as "the best iterative method" without sufficient emphasis on the SPD requirement; students apply it indiscriminately) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Jacobi iteration:**

| Representation | Content |
|---|---|
| Scalar update | For each i: xᵢ^{new} = (bᵢ − Σⱼ≠ᵢ aᵢⱼxⱼ^{old}) / aᵢᵢ |
| Matrix form | x^{k+1} = D⁻¹(b − (L+U)x^k) where A=D+L+U (diagonal, lower, upper) |
| Convergence | Converges if spectral radius ρ(D⁻¹(L+U))<1; sufficient: A diagonally dominant |
| Cost per iteration | O(nnz) where nnz = number of non-zeros in A; vs. direct O(n³) with fill-in |

**Gauss–Seidel:** Uses the updated values xᵢ^{new} immediately (not next iteration). Often converges 2× faster than Jacobi. Matrix form: x^{k+1}=(D+L)⁻¹(b−Ux^k).

**Sparsity and fill-in:** A 2D Poisson equation on an n×n grid gives A with ~5n² non-zeros. Direct LU on this matrix introduces fill-in, producing a dense L, U with O(n⁴) non-zeros total. Iterative: O(n²) cost per iteration × O(n²) iterations → O(n⁴) total, same asymptotically, but memory O(n²) vs. O(n⁴) for direct. For 3D problems, iterative methods win decisively.

**P49 checkpoint:**
- CORRECT → "Jacobi: update each xᵢ using old values of all others; GS uses new values immediately. Convergence: ρ(M)<1. Diagonal dominance is sufficient. Iterative methods exploit sparsity that direct LU destroys via fill-in." → A02
- PARTIAL (knows the update formulas but not the convergence condition) → "The iteration matrix M=D⁻¹(L+U). Each iteration multiplies the error by M: eₖ=Mᵏe₀. This decays to zero iff ρ(M)=max|λᵢ(M)|<1 — the spectral radius. Diagonal dominance (|aᵢᵢ|>Σⱼ≠ᵢ|aᵢⱼ|) guarantees ρ(M)<1 for Jacobi." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Solve [[5,1],[1,5]][x₁;x₂]=[6;6] by Jacobi. Start with x=0. After one iteration: x₁=(6−1·0)/5=1.2, x₂=(6−1·0)/5=1.2. True solution: [1,1]. Continue 3 more iterations. Does it converge?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Convergence rate gallery:**

**Jacobi on the 2D Poisson equation:** Convergence rate ρ≈1−π²/n² for an n×n grid. For n=100: ρ≈1−0.001 — need ~4000 iterations for 10⁻⁴ accuracy. Slow.

**Successive over-relaxation (SOR):** xᵢ^{new}=ωxᵢ^{Gauss-Seidel}+(1−ω)xᵢ^{old}. Optimal ω≈2/(1+sin(π/n)) for the 2D Poisson equation, giving ρ_opt≈1−2π/n. For n=100: ρ≈1−0.063 — need ~100 iterations. 40× faster than Jacobi.

**Conjugate Gradient (CG) for SPD A:** Exact solution in n iterations (in exact arithmetic). In floating-point, convergence in O(√κ(A)) iterations where κ(A) is the condition number. For the 2D Poisson equation: κ≈n², so CG needs O(n) iterations. With a preconditioner (e.g. incomplete Cholesky), O(√κ_P) iterations where κ_P≪κ(A).

**Cost comparison for n×n grid (2D Poisson, N=n²):**
| Method | Iterations | Cost |
|---|---|---|
| Jacobi | O(N) | O(N²) |
| SOR | O(√N) | O(N^{3/2}) |
| CG | O(√N) | O(N^{3/2}) |
| CG + ILU preconditioner | O(1) to O(N^{α}), α<1/2 | Near-linear |
| Direct sparse LU | 1 | O(N^{3/2}) |

**Pattern:** For large sparse SPD systems, preconditioned CG achieves O(√κ) convergence; each iteration costs O(nnz). The right method depends on sparsity, symmetry, and condition number.

**P49 checkpoint:**
- CORRECT → "Jacobi: slow convergence (ρ≈1 for large sparse systems). SOR: 40× faster with optimal ω. CG: optimal for SPD systems, O(√κ) iterations. Preconditioner reduces κ and speeds convergence." → A03
- PARTIAL (understands CG needs SPD but cannot explain why) → "CG minimises the A-norm of the error ‖eₖ‖_A over the Krylov subspace Kₖ(A,r₀). The A-norm ‖e‖_A=√(eᵀAe) is only a valid norm if A is SPD — that's why CG requires SPD. For non-symmetric A, use GMRES or BiCGSTAB instead." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "For a 100×100 grid, the 2D Poisson matrix has N=10,000 unknowns and ρ_Jacobi≈0.999. How many Jacobi iterations are needed to reduce the error by a factor of 1000?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**CG applicability gate:**

**Gate question (MC-3):** "A student applies CG to the linear system arising from discretising the convection-diffusion equation ∇²u−Pe·∂u/∂x=f (with Péclet number Pe>0). The matrix A is NOT symmetric. After 100 CG iterations, the residual has not decreased. What has gone wrong?"

CG requires A to be symmetric positive definite. The convection-diffusion discretisation produces a non-symmetric A (the convection term ∂u/∂x introduces an asymmetric contribution). CG applied to a non-symmetric matrix does not minimise the A-norm (A is not SPD, so the A-norm is not defined), and the iterates may diverge or stagnate.

**Correct choice:** Use GMRES (Generalized Minimal RESidual), which minimises the 2-norm of the residual over the full Krylov subspace — valid for non-symmetric A. Alternative: BiCGSTAB for non-symmetric systems with less memory than GMRES.

**P49 checkpoint:**
- CORRECT → "CG requires A to be SPD. For non-symmetric systems (convection-diffusion, non-self-adjoint PDEs), use GMRES or BiCGSTAB. The choice among iterative methods depends on: symmetry of A, positive-definiteness, cost of matrix–vector product, memory budget." → Gate (P91)
- PARTIAL (knows CG needs SPD but cannot name the alternative) → "For non-symmetric A, the Krylov subspace methods are GMRES (minimises ‖r‖₂, any non-singular A, full restart needed) and BiCGSTAB (short recurrences, less memory, may be less stable). Both reduce to CG when A is SPD." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "GMRES vs. CG: both build a Krylov subspace Kₖ(A,r₀)=span{r₀,Ar₀,…,Aᵏ⁻¹r₀}. CG minimises ‖eₖ‖_A; GMRES minimises ‖rₖ‖₂. Which additional property of A makes CG's minimisation problem well-defined?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 ITERATIVE-ALWAYS-SLOWER):**
Step 1 — "For a 3D PDE on an n×n×n grid (N=n³ unknowns), sparse LU has fill-in that produces nearly dense factors, costing O(N²) memory and O(N³) flops. For N=10⁶, that is 10¹² flops and 10¹² bytes of memory — impossible. Iterative methods need O(nnz)=O(N) memory (just the sparse matrix) and O(N) flops per iteration. With O(√N) iterations (CG), total cost is O(N^{3/2}) — feasible even for N=10⁹." Step 2 — Real example: electromagnetic field simulation with N=10⁹ degrees of freedom. A modern workstation with 128 GB RAM can store the sparse matrix (≈5×N floats≈40 GB). Direct LU would need 10¹⁸ bytes — more than all the storage on earth. Iterative methods are the only option. Step 3 — "Rule: for large sparse systems (N>10⁴), always try iterative first. Direct methods win for dense systems or when the factorisation will be reused many times (many right-hand sides with the same A)."

**TB-R02 (MC-2 JACOBI-AND-GS-ALWAYS-CONVERGE):**
Step 1 — "Convergence of Jacobi and Gauss–Seidel depends on the spectral radius ρ(M) of the iteration matrix M. ρ(M)<1 is necessary AND sufficient. Diagonal dominance is only SUFFICIENT — there are non-diagonally-dominant matrices for which the methods still converge." Step 2 — Non-convergence example: A=[[1,2],[2,1]]. Jacobi iteration matrix M=D⁻¹(L+U)=[[0,2],[2,0]]. Eigenvalues of M: ±2. ρ(M)=2>1 — Jacobi DIVERGES on this matrix, despite A being invertible (det=1−4=−3, so the system has a unique solution). Step 3 — "Always check: does A satisfy diagonal dominance? |aᵢᵢ|>Σⱼ≠ᵢ|aᵢⱼ| for all i. If not, compute ρ(M) numerically before trusting convergence. If ρ(M)≥1, consider SOR, CG, or direct methods."

**TB-R03 (MC-3 CG-FOR-ANY-SYSTEM):**
Step 1 — "The Conjugate Gradient method is derived from minimising the quadratic form φ(x)=½xᵀAx−bᵀx, which has a unique minimum at x=A⁻¹b exactly WHEN A is SPD. If A is not symmetric, φ(x) is not a quadratic; if A is not positive definite, φ has no minimum — it is a saddle point or unbounded. In either case, the CG algorithm has no theoretically valid minimisation objective and may produce arbitrary iterates." Step 2 — Symptom: if you apply CG to a non-SPD system, the residuals will not monotonically decrease, and the iterates may diverge even if A is non-singular and the true solution exists. Step 3 — "Decision tree: (1) Is A SPD? Use CG or PCG (preconditioned CG). (2) Is A symmetric indefinite? Use MINRES. (3) Is A non-symmetric? Use GMRES (memory-intensive) or BiCGSTAB (short recurrences, may be less stable). Always check symmetry and positive-definiteness first."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Solve [[5,−1,−1],[−1,5,−1],[−1,−1,5]]x=[3,3,3]ᵀ using Jacobi iteration starting at x=0. Perform 5 iterations. Check diagonal dominance. Estimate the convergence rate from the spectral radius.
2. Apply SOR with ω=1.2 to the system in problem 1. Compare the convergence rate with Jacobi. Compute the optimal ω analytically if the spectral radius of the Jacobi iteration matrix is known.
3. For A=[[4,1],[1,3]], apply 5 steps of CG starting with x₀=0 and b=[5,4]ᵀ. Verify that the exact solution is found in at most 2 iterations (in exact arithmetic). Confirm A is SPD.
4. Construct a 3×3 matrix A that is NOT diagonally dominant and show that Jacobi iteration diverges on Ax=b=[1,1,1]ᵀ. Confirm that GMRES converges to the solution in at most 3 steps.

**P55 — Reflect & Consolidate:** "Jacobi/GS: cheap per step, converges iff ρ(M)<1, slow for large systems. CG: optimal for SPD, O(√κ) iterations. Preconditioning reduces κ. For non-symmetric A: GMRES. Iterative methods are the only option for very large sparse systems (fill-in makes direct methods infeasible)."

**P76 — Transfer Probe (Independence mode):**
The incomplete LU (ILU) preconditioner approximates A≈L̃Ũ where L̃, Ũ are sparse factors (non-zeros only where A has non-zeros). (a) Explain why a preconditioned CG with M=L̃Ũ is equivalent to CG applied to M⁻¹A (an SPD system, if L̃Ũ≈A and A is SPD). (b) Show that the condition number of M⁻¹A is smaller than κ(A) when M is a good approximation to A. (c) For the 2D Poisson equation with N unknowns, estimate the number of PCG iterations with ILU preconditioner vs. unpreconditioned CG. (d) What are the trade-offs between ILU(0) (zero fill-in) and ILU(k) (k levels of fill-in)?

**P55 — Reflect & Consolidate:** "ILU preconditioning: the approximate factorisation M≈A shifts the spectrum of M⁻¹A close to 1, reducing the effective condition number from κ(A) to κ(M⁻¹A)≪κ(A). Better fill-in (larger k in ILU(k)) gives a better preconditioner but more memory — the classic accuracy-vs-cost trade-off in scientific computing."

**P75 — Mastery Assessment:**
"A finite-element discretisation of a 3D heat equation produces an N=10⁶ SPD sparse matrix A with average 27 non-zeros per row. (a) Compare the memory requirements of dense LU and ILU-preconditioned CG for this system. (b) If κ(A)=10⁶, estimate the number of unpreconditioned CG iterations for 10⁻⁸ relative residual. (c) With an ILU(0) preconditioner reducing κ to 10², how many PCG iterations are needed? (d) The right-hand side b changes 1000 times (different time steps) but A is the same. Should you refactorize A at each step, or reuse the preconditioner?"

**P55 — Reflect & Consolidate:** "For time-dependent PDEs with a fixed spatial operator A and many right-hand sides, the preconditioner M is computed once and reused. Each PCG solve costs O(nnz × κ_P^{1/2}) operations. Factorizing A once vs. iterating multiple times is a trade-off between factorisation cost and iteration cost, depending on the number of time steps."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.iterative-linear complete
- Score 3/5 → REVIEW convergence condition and CG requirements; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.linear-system or math.num.error-analysis; reassign

**P78 — Completion:** Iterative methods for linear systems certified. Student applies Jacobi, GS, and CG; checks convergence via spectral radius; selects the right method based on symmetry and sparsity; applies preconditioning and compares direct vs. iterative costs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: ILU preconditioning; condition number reduction; PCG convergence analysis
Skill tested: Explain preconditioned CG; quantify condition-number improvement; estimate iteration counts; compare fill-in levels

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
