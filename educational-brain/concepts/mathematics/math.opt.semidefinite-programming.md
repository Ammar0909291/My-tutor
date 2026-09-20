# math.opt.semidefinite-programming

## Identity
- **KG id**: `math.opt.semidefinite-programming`
- **Domain**: math.opt
- **Requires**: `math.opt.convex-optimization`, `math.linalg.positive-definite`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 8

## Learning Objective
Recognize SDP's matrix variable $X\succeq0$ as STRUCTURALLY DIFFERENT from QP's vector variable —
NEVER treat SDP as "just a QP with a symmetric matrix"; verify the PSD cone $\{X:X\succeq0\}$ IS
convex despite its eigenvalue-based definition — NEVER assume a nonlinear-looking condition means
a non-convex set; and recognize an SDP relaxation's optimal $X^*$ can have ANY rank — NEVER assume
SDP solutions are always rank-1.

## Core Understanding
SDP'S MATRIX VARIABLE IS STRUCTURALLY DIFFERENT FROM QP'S VECTOR VARIABLE — NEVER "JUST A QP WITH
A SYMMETRIC MATRIX": QP minimizes $\frac12x^TQx+c^Tx$ with $Q$ FIXED in the objective and $x\in
\mathbb{R}^n$ the variable. SDP minimizes $\mathrm{tr}(CX)$ with $C$ fixed and $X\in\mathbb{S}^n$
(an $n\times n$ symmetric MATRIX) the variable, subject to $X\succeq0$ as a CONSTRAINT. If
$X=xx^T$ (a RANK-1, non-convex constraint), then $\mathrm{tr}(CX)=x^TCx$ — this recovers QP; SDP
DROPS the rank-1 constraint to $X\succeq0$, a genuine convex relaxation. Believing SDP with
$X=xx^T$ is "the same as" QP because $\mathrm{tr}(CX)=x^TCx$ is WRONG — the SDP allows any
$X\succeq0$ (rank 1 to $n$), not just rank-1 $X$; this is precisely why SDP is polynomial-time
solvable while the exact rank-1 problem is NP-hard in general.

THE PSD CONE IS CONVEX — NEVER ASSUME A NONLINEAR-LOOKING CONDITION MEANS A NON-CONVEX SET: for
$X,Y\succeq0$ and $t\in[0,1]$: for ANY $z$, $z^T(tX+(1-t)Y)z=t\cdot z^TXz+(1-t)\cdot z^TYz\ge0$
since $z^TXz\ge0$ and $z^TYz\ge0$ — so $tX+(1-t)Y\succeq0$, proving the PSD cone is CONVEX.
Believing the set of PSD matrices $\{X:X\succeq0\}$ is not convex, because the eigenvalue
condition "looks nonlinear," is WRONG — the CONSTRAINT $X\succeq0$ (all eigenvalues $\ge0$) is
indeed a nonlinear-looking condition, but the SET it defines is closed under convex combinations;
nonlinear condition never implies non-convex set.

AN SDP RELAXATION'S OPTIMAL SOLUTION CAN HAVE ANY RANK — NEVER ASSUME IT'S ALWAYS RANK-1: for the
MAX-CUT SDP relaxation, $\max\frac14\sum_{(i,j)\in E}(1-X_{ij})$ s.t. $X_{ii}=1,X\succeq0$: the
optimal $X^*$ can factor as $X^*=V^TV$ with columns $v_i$ genuine unit vectors in $\mathbb{R}^n$
for ANY $n$, not necessarily $n=1$. Goemans-Williamson ROUNDING (a random hyperplane cut,
$x_i=\mathrm{sign}(v_i^Tr)$) is needed precisely BECAUSE $X^*$ is generally NOT rank-1. Believing
SDP solutions are expected to be rank-1 matrices (outer products $vv^T$), confusing the SDP
relaxation with the original problem's exact optimal solution, is WRONG — high rank means the
relaxation is "loose" relative to the combinatorial problem, and rounding is required exactly
because the rank-1 structure was dropped.

## Mental Models
- **"SDP replaces a vector variable with a matrix variable and a box constraint with a PSD cone
  constraint — structurally different from QP, not merely QP dressed up."**
- **"A nonlinear-looking eigenvalue condition can still define a convex set — check the convex-
  combination definition directly, don't judge convexity by how the condition looks."**
- **"SDP drops the rank-1 constraint entirely — the optimal X* can be any rank, and rounding
  exists precisely to recover a rank-1 answer from a higher-rank relaxation."**

## Why Students Fail

### MC-1: SDP-IS-JUST-QP
- **Surface form**: treats SDP as a QP with a symmetric matrix variable; does not recognize that
  PSD constraints ($X\succeq0$) are fundamentally different from simple box or polyhedral
  constraints on matrix entries.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — QP has a PD matrix in
  the objective; SDP has a PSD matrix as the variable — structurally different despite superficial
  notational similarity).
- **Repair**: contrast QP's fixed-matrix-in-objective structure against SDP's matrix-as-variable
  structure, and re-derive the rank-1-to-relaxation connection.

### MC-2: PSD-CONE-IS-NOT-CONVEX
- **Surface form**: believes the set of PSD matrices $\{X:X\succeq0\}$ is not convex, because it
  "involves a nonlinear condition."
- **Birth type**: perceptual intuition (Blueprint's own declared birth type — eigenvalue
  conditions look nonlinear; the set LOOKS complicated).
- **Repair**: re-derive the convex-combination proof directly, $z^T(tX+(1-t)Y)z\ge0$.

### MC-3: SDP-ALWAYS-HAS-RANK-1-SOLUTION
- **Surface form**: expects SDP solutions to be rank-1 matrices (outer products $vv^T$); confuses
  the SDP relaxation with the original problem's optimal solution, which may require rounding.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — SDP relaxations are
  introduced via rank-1 formulations; the relaxation drops the rank constraint, but this dropping
  is easy to forget).
- **Repair**: re-walk the Goemans-Williamson rounding procedure, emphasizing rounding exists
  precisely because $X^*$ is generally not rank-1.

## Misconceptions

### MC-1: SDP-IS-JUST-QP
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: PSD-CONE-IS-NOT-CONVEX
- **Surface form**: as described above.
- **Root cause (perceptual intuition)**: as described above.
- **Repair**: as described above.

### MC-3: SDP-ALWAYS-HAS-RANK-1-SOLUTION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"SDP is to QP what a matrix is to a vector — same underlying spirit (a quadratic form), but a
  genuinely richer object with its own convex geometry, the spectrahedron, that has no vertices
  to walk like a polytope."**
- **Anti-analogy**: the PSD cone's convexity isn't visually obvious the way a box's convexity is —
  you have to check the definition directly, since eigenvalue-based conditions don't "look" linear
  even when the set they define is convex.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the QP-versus-SDP structural comparison and the rank-1
  relaxation connection.
- **Demonstration 2 (targets MC-2)**: the direct convex-combination proof that the PSD cone is
  convex.
- **Demonstration 3 (targets MC-3)**: the MAX-CUT SDP relaxation and Goemans-Williamson rounding
  procedure.

## Discovery Questions
1. "Is SDP with X=xxᵀ the same as a QP because tr(CX)=xᵀCx?"
2. "Is the set of PSD matrices {X: X⪰0} convex, despite the eigenvalue condition looking
   nonlinear?"
3. "Does an SDP relaxation's optimal solution always have rank 1?"

## Teaching Sequence
1. **Representation shift**: present the four representations of SDP (standard form, LP analogy,
   geometric, special cases), proving PSD-cone convexity directly, isolating MC-2.
2. **Misconception detector**: contrast SDP against QP structurally, isolating MC-1.
3. **Pattern induction**: work the MAX-CUT SDP relaxation and Goemans-Williamson rounding,
   isolating MC-3.
4. **Contrast pair**: contrast SDP against LP structurally (variable, feasible-set geometry,
   algorithm).
5. **Mastery gate**: require a correct PSD-cone convexity proof, a correct dual-SDP derivation, a
   correct MAX-CUT SDP formulation for a small graph, and a correct Schur-complement
   justification for a quadratic constraint, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept SDP described as "just a QP" without noting the matrix-variable/PSD-constraint
  structural difference.
- Never accept the PSD cone assumed non-convex from its eigenvalue-based definition alone.
- Never accept an SDP relaxation's optimal solution assumed rank-1 without justification.

## Voice Teaching Notes
- Say "is that a fixed matrix in the objective, or the matrix variable itself?" whenever SDP is
  compared to QP.
- Ask "have you checked the convex-combination definition directly, or just judged by
  appearance?" whenever PSD-cone convexity is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly proves the PSD cone is convex via the
  convex-combination definition.
- **Rung 2 (application)**: learner correctly writes the dual SDP and formulates a small MAX-CUT
  SDP relaxation.
- **Rung 3 (transfer)**: learner correctly formulates Lyapunov stability as an SDP with two linear
  matrix inequalities.

## Tutor Recovery Strategy
- If MC-1 recurs, re-contrast QP's fixed-matrix-objective against SDP's matrix-variable structure.
- If MC-2 recurs, re-derive the convex-combination proof.
- If MC-3 recurs, re-walk the Goemans-Williamson rounding procedure.

## Memory Hooks
- "SDP's variable is a matrix constrained to be PSD — structurally different from QP's vector."
- "A nonlinear-looking condition (eigenvalues ≥0) can still define a convex set — check directly."
- "SDP drops the rank-1 constraint — rounding exists because the optimum can have any rank."

## Transfer Connections
- `math.opt.convex-optimization` (prerequisite, already authored): supplies the general convex
  optimization framework this concept specializes to matrix-variable problems.
- `math.linalg.positive-definite` (prerequisite, already authored): supplies the positive
  (semi)definiteness concept this concept's feasible-set constraint directly uses.

## Cross-Subject Connections
- Control theory: Lyapunov stability analysis for linear systems reduces directly to an SDP
  feasibility problem, finding a PSD matrix satisfying linear matrix inequalities — a canonical,
  polynomial-time stability certificate.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.semidefinite-programming.md`, reused by
  reference for its four-representation SDP derivation, its MAX-CUT relaxation and
  Goemans-Williamson rounding, and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on Lyapunov stability as an SDP
  feasibility problem, formulated via two linear matrix inequalities.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.opt.convex-optimization`/`math.linalg.positive-definite`, unlocks none, cross_links none,
  research/analyze, mastery_threshold 0.65, estimated_hours 8) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 236): authored. Second entry this batch. Companion batch concept:
  `math.cx.complex-function`.
