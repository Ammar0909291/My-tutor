# math.num.iterative-linear

## Identity
- **KG id**: `math.num.iterative-linear`
- **Domain**: math.num
- **Requires**: `math.linalg.linear-system`, `math.num.error-analysis`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Apply Jacobi and Gauss-Seidel iterations, recognizing iterative methods are NEVER categorically
slower than direct LU — fill-in makes direct methods impractical for large sparse systems;
recognize Jacobi/Gauss-Seidel do NOT always converge — convergence requires the spectral radius
$\rho(M)<1$, NEVER guaranteed automatically; and recognize Conjugate Gradient requires $A$
SYMMETRIC POSITIVE DEFINITE — NEVER applied indiscriminately to any linear system.

## Core Understanding
ITERATIVE METHODS ARE NEVER CATEGORICALLY SLOWER THAN DIRECT METHODS — FILL-IN MAKES DIRECT
METHODS IMPRACTICAL FOR LARGE SPARSE SYSTEMS: for a 3D PDE on an $n\times n\times n$ grid
($N=n^3$ unknowns), sparse LU produces fill-in yielding nearly DENSE factors, costing $O(N^2)$
memory and $O(N^3)$ flops — for $N=10^6$, that's $10^{12}$ flops and $10^{12}$ bytes, INFEASIBLE.
Iterative methods need only $O(\text{nnz})=O(N)$ memory and $O(N)$ flops per iteration, with
$O(\sqrt N)$ iterations (CG) giving total cost $O(N^{3/2})$ — feasible even for $N=10^9$. Assuming
iterative methods are inferior to direct LU because they converge gradually rather than solving
exactly, without accounting for fill-in's cost explosion on sparse matrices, is WRONG — for large
sparse systems, iterative methods are often the ONLY feasible option.

JACOBI AND GAUSS-SEIDEL DO NOT ALWAYS CONVERGE — CONVERGENCE REQUIRES $\rho(M)<1$: for
$A=[[1,2],[2,1]]$: the Jacobi iteration matrix $M=D^{-1}(L+U)=[[0,2],[2,0]]$ has eigenvalues
$\pm2$, so $\rho(M)=2>1$ — Jacobi DIVERGES on this matrix, despite $A$ being invertible
($\det=-3$, unique solution exists). Believing Jacobi or Gauss-Seidel ALWAYS converges to the
solution, without checking $\rho(M)<1$, is WRONG — diagonal dominance is only a SUFFICIENT
condition (guaranteeing $\rho(M)<1$), never a necessary one, and its ABSENCE does not
automatically mean divergence, but its presence never guarantees anything beyond what $\rho(M)<1$
itself certifies — the spectral radius condition must always be checked, never assumed.

CONJUGATE GRADIENT REQUIRES $A$ SYMMETRIC POSITIVE DEFINITE — NEVER APPLIED INDISCRIMINATELY: CG
is derived from minimizing the quadratic form $\phi(x)=\frac12x^TAx-b^Tx$, which has a UNIQUE
minimum at $x=A^{-1}b$ EXACTLY when $A$ is SPD. Applying CG to the non-symmetric matrix arising
from a convection-diffusion discretization: after 100 iterations, the residual does NOT decrease
— because $A$ is NOT symmetric, the $A$-norm CG minimizes is not even well-defined, and iterates
may STAGNATE or diverge. Applying CG to ANY linear system, not recognizing it requires $A$ SPD, is
WRONG — for non-symmetric systems, GMRES or BiCGSTAB are the correct alternatives, never CG.

## Mental Models
- **"Direct methods can explode in cost on sparse matrices due to fill-in — iterative methods
  aren't a lesser substitute, they're often the only feasible choice for large sparse systems."**
- **"Convergence of Jacobi/Gauss-Seidel is never automatic — always check the spectral radius,
  never assume it from diagonal dominance being absent or present."**
- **"CG's entire mathematical foundation requires SPD — applying it to a non-SPD system isn't
  just suboptimal, it's using an undefined minimization objective."**

## Why Students Fail

### MC-1: ITERATIVE-ALWAYS-SLOWER
- **Surface form**: assumes iterative methods are inferior to direct LU because they converge
  gradually rather than solving exactly, not accounting for fill-in.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — LU is taught as the
  "proper" solution method; iterative methods are presented as approximations implying
  inferiority, without discussing sparsity).
- **Repair**: re-derive the fill-in cost explosion for a 3D PDE, confirming direct LU becomes
  infeasible while iterative methods remain tractable.

### MC-2: JACOBI-AND-GS-ALWAYS-CONVERGE
- **Surface form**: believes Jacobi or Gauss-Seidel always converges, not realizing convergence
  requires the spectral radius of the iteration matrix to be less than 1.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — textbook examples
  always use diagonally dominant matrices; students don't check the convergence condition for
  other matrices).
- **Repair**: re-compute $\rho(M)=2$ for the $A=[[1,2],[2,1]]$ divergence example.

### MC-3: CG-FOR-ANY-SYSTEM
- **Surface form**: applies CG to any linear system, not recognizing it requires $A$ symmetric
  positive definite.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — CG is presented as
  "the best iterative method" without sufficient emphasis on the SPD requirement).
- **Repair**: re-derive why $\phi(x)$'s minimization is only well-defined for SPD $A$, and
  identify GMRES/BiCGSTAB as the correct non-symmetric alternatives.

## Misconceptions

### MC-1: ITERATIVE-ALWAYS-SLOWER
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: JACOBI-AND-GS-ALWAYS-CONVERGE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: CG-FOR-ANY-SYSTEM
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Fill-in is like a sparse filing cabinet exploding into a dense one the moment you try to
  reorganize it by hand — the sparse structure that made direct storage cheap is destroyed."**
- **Anti-analogy**: CG on a non-SPD matrix isn't a slower version of CG on an SPD one — it's
  attempting to minimize a quantity that isn't even a valid distance measure, a fundamentally
  different (and broken) situation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the 3D-PDE fill-in cost-explosion comparison between direct
  LU and iterative methods.
- **Demonstration 2 (targets MC-2)**: the $A=[[1,2],[2,1]]$ Jacobi-divergence example,
  $\rho(M)=2$.
- **Demonstration 3 (targets MC-3)**: the convection-diffusion non-symmetric-matrix CG-stagnation
  gate question.

## Discovery Questions
1. "Is a direct method like LU always cheaper than an iterative method, regardless of sparsity?"
2. "Does Jacobi iteration always converge for an invertible matrix?"
3. "Can Conjugate Gradient be applied to any linear system, or does it require a specific
   property of A?"

## Teaching Sequence
1. **Representation shift**: the four-representation Jacobi-iteration derivation (scalar update,
   matrix form, convergence, cost per iteration), setting up the fill-in-versus-sparsity
   groundwork.
2. **Pattern induction**: the convergence-rate gallery (Jacobi, SOR, CG, preconditioned CG),
   isolating MC-1.
3. **Misconception detector**: the CG-applicability gate question, working Demonstration 3,
   isolating MC-3.
4. **Reused procedure**: the Jacobi-divergence demonstration, working Demonstration 2, isolating
   MC-2.
5. **Mastery gate**: require correct Jacobi/Gauss-Seidel iterations with a convergence check, a
   correct explanation of why direct methods become infeasible for large sparse systems, and a
   correct identification of when CG is (and is not) applicable, at the Blueprint's own stated
   MAMR of 4/5.

## Tutor Actions
- Never accept iterative methods dismissed as categorically slower without discussing fill-in.
- Never accept Jacobi or Gauss-Seidel assumed to converge without checking the spectral radius.
- Never accept CG applied to a system without first verifying $A$ is SPD.

## Voice Teaching Notes
- Say "how much fill-in would direct LU introduce here — is it still sparse afterward?" whenever
  direct-versus-iterative methods are compared for a large sparse system.
- Ask "have you checked the spectral radius, or are you assuming convergence?" whenever Jacobi or
  Gauss-Seidel is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies Jacobi iteration and checks diagonal
  dominance or the spectral radius.
- **Rung 2 (application)**: learner correctly explains why direct LU becomes infeasible for a
  large sparse 3D system due to fill-in.
- **Rung 3 (transfer)**: learner correctly diagnoses CG's failure on a non-symmetric
  convection-diffusion system and proposes GMRES or BiCGSTAB instead.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the fill-in cost explosion for a 3D PDE.
- If MC-2 recurs, re-compute the spectral radius for the divergence example.
- If MC-3 recurs, re-derive why CG's minimization objective requires SPD.

## Memory Hooks
- "Fill-in can make direct methods infeasible on sparse systems — iterative isn't just a lesser
  option."
- "Convergence needs ρ(M)<1 — never assumed automatically."
- "CG needs SPD — never applied to just any system."

## Transfer Connections
- `math.linalg.linear-system` (already authored, certified domain): supplies the general linear-
  system framework this concept's iterative solvers operate on.
- `math.num.error-analysis` (already authored, this campaign, Batch 217): supplies the condition-
  number and convergence-rate reasoning this concept's preconditioning analysis directly applies.

## Cross-Subject Connections
- Computational physics and engineering: finite-element discretizations of PDEs (heat equations,
  electromagnetic fields) routinely produce systems with millions of unknowns where iterative
  methods are the only feasible solution approach.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.iterative-linear.md`, reused by
  reference for its four-representation Jacobi derivation, its convergence-rate gallery, its
  CG-applicability gate question, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on incomplete LU (ILU)
  preconditioning, its equivalence to CG on $M^{-1}A$, and the accuracy-versus-cost trade-off of
  fill-in levels.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.linear-system`/`math.num.error-analysis`, unlocks none, cross_links none,
  expert/apply, mastery_threshold 0.75, estimated_hours 6) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 222): authored. Second entry this batch. Companion batch concept:
  `math.num.svd`.
