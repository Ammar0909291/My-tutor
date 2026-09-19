# math.opt.quadratic-programming

## Identity
- **KG id**: `math.opt.quadratic-programming`
- **Domain**: math.opt
- **Requires**: `math.opt.linear-programming`, `math.linalg.positive-definite`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Classify a QP $\min\frac12x^TQx+c^Tx$ s.t. $Ax\le b$ as convex ($Q\succeq0$) or non-convex ($Q$
indefinite) by checking eigenvalues (never assumed convex by default); write the KKT conditions
and recognize they are GLOBALLY SUFFICIENT only when $Q\succeq0$ (never trusted as sufficient for
non-convex QPs); and distinguish QP from unconstrained least squares (a special case with a
closed form, never confused with the harder constrained problem).

## Core Understanding
A QP IS CONVEX ONLY IF $Q\succeq0$ — NEVER ASSUMED CONVEX BY DEFAULT: for $Q=\begin{pmatrix}1&3\\
3&1\end{pmatrix}$: $\det(Q)=1-9=-8<0$ — Q is INDEFINITE (one positive, one negative eigenvalue:
$\lambda_1=4,\lambda_2=-2$), so $\min\frac12x^TQx$ is NOT convex — a SADDLE surface, never a bowl.
For $Q=\begin{pmatrix}2&1\\1&2\end{pmatrix}$: eigenvalues $\lambda_1=3,\lambda_2=1$, BOTH positive
— $Q\succeq0$ (in fact PD), the problem IS strictly convex. $Q$ must ALWAYS be checked before
assuming any solver or convexity property applies — never assumed by default from the problem
"looking quadratic."

KKT IS GLOBALLY SUFFICIENT ONLY WHEN $Q\succeq0$ — NEVER TRUSTED FOR NON-CONVEX QPS: for
$Q=\begin{pmatrix}1&3\\3&1\end{pmatrix}$ (indefinite): the stationary point $x^*=0$ satisfies KKT
($\nabla f=Qx=0$) — but $f(1,-1)=\frac12(1-3-3+1)=-2<f(0)=0$, so $x^*=0$ is NOT a minimum despite
satisfying KKT. KKT conditions are ALWAYS necessary at any optimum, but are SUFFICIENT to
guarantee a global minimum ONLY for CONVEX problems — a KKT point of a non-convex QP can be a
saddle point, never automatically trusted as optimal.

LEAST SQUARES IS A SPECIAL, UNCONSTRAINED CASE OF QP — NEVER THE SAME AS THE GENERAL CONSTRAINED
PROBLEM: $\min\frac12\|Ax-b\|^2=\frac12x^TA^TAx-(A^Tb)^Tx+\frac12\|b\|^2$ IS a QP with
$Q=A^TA\succeq0$, $c=-A^Tb$, UNCONSTRAINED — with a CLOSED-FORM solution
$x^*=(A^TA)^{-1}A^Tb$. Adding CONSTRAINTS $Ax\le b$ to the general QP FUNDAMENTALLY changes the
problem — NO closed form exists anymore; active-set or interior-point methods are required.
Least squares is the unconstrained SPECIAL case; constrained QP is the harder GENERAL problem —
never interchangeable despite both having "quadratic objectives."

## Mental Models
- **"Q is a matrix, not a number — check its eigenvalues before trusting any convexity claim."**
- **"KKT is a necessary checkpoint everywhere, but a sufficient certificate of global optimality
  only when Q is positive semidefinite."**
- **"Least squares is QP with the constraints stripped away — the closed form disappears the
  moment constraints come back."**

## Why Students Fail

### MC-1: QP-ALWAYS-CONVEX
- **Surface form**: assumes any QP is convex, does not check whether $Q$ is positive
  semidefinite, attempts to apply convex solvers to non-convex QPs.
- **Birth type**: Type 5 instruction-induced (Blueprint's own declared birth type — QPs are
  usually introduced with convex examples; non-convex QPs are harder and mentioned later).
- **Repair**: compute eigenvalues of an indefinite $Q$ directly, confirming the saddle structure.

### MC-2: KKT-SUFFICIENT-WITHOUT-CONVEXITY
- **Surface form**: applies KKT conditions and concludes a solution is globally optimal without
  verifying convexity; a KKT point of a non-convex QP may be a saddle point.
- **Birth type**: Type 1 overgeneralization (Blueprint's own declared birth type — KKT necessary
  always; sufficient only for convex problems).
- **Repair**: re-verify the indefinite-$Q$ example, showing the KKT point $x^*=0$ is not a
  minimum.

### MC-3: QP-SAME-AS-LS
- **Surface form**: confuses unconstrained QP $\min\frac12\|Ax-b\|^2$ with the general QP
  $\min\frac12x^TQx+c^Tx$, not seeing least squares as a special case with a closed form while
  constrained QP is harder.
- **Birth type**: Type 3 language contamination (Blueprint's own declared birth type —
  "quadratic objective" sounds the same in both).
- **Repair**: re-derive the closed form for the unconstrained case and contrast it with the
  constrained problem's lack of one.

## Misconceptions

### MC-1: QP-ALWAYS-CONVEX
- **Surface form**: as described above.
- **Root cause (Type 5 instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: KKT-SUFFICIENT-WITHOUT-CONVEXITY
- **Surface form**: as described above.
- **Root cause (Type 1 overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: QP-SAME-AS-LS
- **Surface form**: as described above.
- **Root cause (Type 3 language contamination)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Q's eigenvalues are a bowl-or-saddle test — never assume the shape without checking the
  sign of every eigenvalue."**
- **Anti-analogy**: a KKT point is not automatically a trophy — for a non-convex QP it might just
  be a saddle wearing the disguise of a stationary point.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $Q=\begin{pmatrix}1&3\\3&1\end{pmatrix}$
  eigenvalue/indefiniteness computation.
- **Demonstration 2 (targets MC-2)**: the same indefinite $Q$'s KKT point $x^*=0$ failing to be a
  minimum.
- **Demonstration 3 (targets MC-3)**: the least-squares closed form contrasted with the general
  constrained QP's lack of one.

## Discovery Questions
1. "Is every quadratic program automatically convex?"
2. "If a point satisfies the KKT conditions, is it automatically a global minimum?"
3. "Is unconstrained least squares the same problem as a general constrained QP?"

## Teaching Sequence
1. **Representation shift**: the QP standard form and convexity classification table.
2. **Misconception detector**: the indefinite-$Q$ convexity check, working Demonstration 1,
   isolating MC-1, then the KKT-point failure, working Demonstration 2, isolating MC-2.
3. **Contrast pair**: hard-margin vs. soft-margin SVM as convex QPs, and the least-squares
   special case, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct convexity classification via eigenvalues, a correct KKT
   solve for a small constrained QP, and a correct explanation of why SVM training is a QP, at
   the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a QP assumed convex without checking $Q$'s eigenvalues or Sylvester's criterion.
- Never accept a KKT point concluded to be a global minimum without verifying convexity first.
- Never accept unconstrained least squares treated as identical to the general constrained QP.

## Voice Teaching Notes
- Say "have you checked Q's eigenvalues, or just assumed convexity?" whenever a QP's convexity is
  claimed.
- Ask "is this problem actually convex — does KKT sufficiency even apply here?" whenever a KKT
  point is declared optimal.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a QP as convex or non-convex from $Q$'s
  eigenvalues.
- **Rung 2 (application)**: learner correctly writes and solves the KKT system for a small
  constrained QP.
- **Rung 3 (transfer)**: learner correctly identifies SVM training (hard- and soft-margin) as a
  convex QP, and correctly reformulates LASSO's $\ell_1$ penalty as a QP via auxiliary variables.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute eigenvalues for an indefinite $Q$ example.
- If MC-2 recurs, re-verify the indefinite-$Q$ KKT-point-not-a-minimum example.
- If MC-3 recurs, re-derive the least-squares closed form and contrast with the constrained case.

## Memory Hooks
- "Check Q's eigenvalues before trusting convexity — never assume it."
- "KKT is necessary everywhere; sufficient only when Q⪰0."
- "Least squares is QP with no constraints — add constraints and the closed form disappears."

## Transfer Connections
- `math.opt.linear-programming` (already authored, certified domain): supplies the polyhedral
  constraint framework this concept's QP directly extends with a quadratic objective.
- `math.linalg.positive-definite` (already authored, certified domain): supplies the
  positive-semidefiniteness test this concept's convexity classification directly relies on.

## Cross-Subject Connections
- Machine learning: support vector machine (SVM) training and LASSO regression both reduce to
  quadratic programs, the primary motivating applications this concept establishes.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.quadratic-programming.md`, reused by
  reference for its convexity classification table, its indefinite-$Q$ KKT-failure example, its
  hard-/soft-margin SVM contrast, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe reformulating LASSO's $\ell_1$
  penalty as a convex QP via auxiliary variable lifting.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.opt.linear-programming`/`math.linalg.positive-definite`, unlocks none, cross_links none,
  expert/apply, mastery_threshold 0.75, estimated_hours 5) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 196): authored. First entry this batch. Companion batch concept:
  `math.opt.stochastic-gradient`.
