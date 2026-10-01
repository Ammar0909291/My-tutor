# math.de.systems-matrix-method

## Identity
- **KG id**: `math.de.systems-matrix-method`
- **Domain**: math.de
- **Requires**: `math.de.systems-ode`, `math.linalg.eigenvalues`, `math.linalg.diagonalization`
- **Unlocks**: none
- **Cross-links**: `math.linalg.matrix-exponential`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
Write $x'=Ax$'s solution as $x(t)=v\,e^{\lambda t}$ — NEVER as the scalar $e^{\lambda t}$ alone,
missing the eigenvector direction; extract REAL solutions from a complex conjugate eigenvalue
pair via $\mathrm{Re}$ and $\mathrm{Im}$ — NEVER report a complex-valued solution to a real
system; and compute $e^A$ via the power series/diagonalization — NEVER as the matrix of
component-wise entrywise exponentials.

## Core Understanding
THE SOLUTION IS $v\cdot e^{\lambda t}$ — NEVER THE SCALAR $e^{\lambda t}$ ALONE: for
$x'=\begin{pmatrix}3&1\\0&2\end{pmatrix}x$: eigenvalues $\lambda_1=3,\lambda_2=2$, eigenvectors
$v_1=[1;0]$, $v_2=[1;-1]$. General solution $x(t)=c_1[1;0]e^{3t}+c_2[1;-1]e^{2t}$. Writing merely
$x(t)=e^{\lambda t}$ (a scalar) plugs the eigenvalue in correctly but FORGETS the eigenvector — the
scalar $e^{\lambda t}$ gives the RATE of growth, but the eigenvector $v$ gives the DIRECTION;
without $v$, the answer is a scalar, never the actual vector-valued solution the system requires.

COMPLEX CONJUGATE EIGENVALUES $\lambda=\alpha\pm\beta i$ MUST BE CONVERTED TO A REAL SOLUTION PAIR
VIA $\mathrm{Re}$/$\mathrm{Im}$ — NEVER LEFT AS A COMPLEX-VALUED ANSWER: for $\lambda=2\pm i$ with
complex eigenvector $v=[1;0]+i[0;-1]$: the complex solution
$ve^{(2+i)t}=e^{2t}([1;0]+i[0;-1])(\cos t+i\sin t)$ splits into REAL solutions
$x_1=e^{2t}[\cos t;\sin t]$, $x_2=e^{2t}[\sin t;-\cos t]$, giving the real general solution
$x=c_1x_1+c_2x_2$. Writing $x(t)=ve^{(\alpha+\beta i)t}$ and reporting a complex-valued solution
directly is WRONG for a real physical system — a real matrix's complex eigenvalues come in
conjugate pairs precisely so that $\mathrm{Re}[ve^{\lambda t}]$ and $\mathrm{Im}[ve^{\lambda t}]$
give two REAL, independent solutions; the complex form must always be converted.

THE MATRIX EXPONENTIAL IS $e^A=I+A+A^2/2!+\cdots$ — NEVER THE MATRIX OF ENTRYWISE EXPONENTIALS:
for $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}=PDP^{-1}$: $e^A=Pe^DP^{-1}$ where
$e^D=\mathrm{diag}(e^3,e^2)$ — the EIGENVALUES are exponentiated, not the raw entries $3,1,0,2$.
Checking $A=0$: the series gives $e^0=I$ (all higher terms vanish), matching $x(t)=e^{At}x_0$ at
$t=0$ correctly returning $x_0$. Believing $e^A$ is the matrix whose $(i,j)$ entry is $e^{a_{ij}}$
is WRONG — that entrywise reading would give $e^0$ as a matrix of 1's, not the identity $I$,
contradicting the required initial-condition check.

## Mental Models
- **"The scalar eλt is the RATE; the eigenvector v is the DIRECTION — a solution needs both, never
  the scalar alone."**
- **"A real matrix's complex eigenvalues always come in conjugate pairs precisely so Re and Im of
  the complex solution give two real, independent solutions — never report a complex answer."**
- **"eᴬ is a power series in A, computed via its eigenvalues under diagonalization — never the
  matrix of entrywise exponentials of A's raw entries."**

## Why Students Fail

### MC-1: EIGENVECTOR-SOLUTION-IS-SCALAR
- **Surface form**: writes the solution as $x(t)=e^{\lambda t}$ (a scalar) rather than
  $x(t)=v\cdot e^{\lambda t}$ (scalar-times-eigenvector); plugs the eigenvalue into the ODE
  correctly but forgets the eigenvector.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — the scalar ODE
  solution $e^{\lambda t}$ is learned first, and students import the scalar form into the vector
  problem without realizing each component grows like $e^{\lambda t}$ along the eigenvector
  direction).
- **Repair**: re-anchor "the eigenvector v is the DIRECTION — the scalar $e^{\lambda t}$ says HOW
  FAST; without the eigenvector, you have a scalar, not a vector."

### MC-2: COMPLEX-EIGENVALUE-GIVES-COMPLEX-SOLUTION
- **Surface form**: when $\lambda=\alpha+\beta i$, writes $x(t)=ve^{(\alpha+\beta i)t}$ and reports
  a complex-valued solution; doesn't take real and imaginary parts to form two real independent
  solutions.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — Euler's formula is
  taught in isolation; extracting real solutions requires an additional, often under-emphasized
  step).
- **Repair**: re-form $\mathrm{Re}[ve^{\lambda t}]$ and $\mathrm{Im}[ve^{\lambda t}]$ explicitly,
  confirming both are real-valued and independent.

### MC-3: MATRIX-EXPONENTIAL-IS-COMPONENT-EXPONENTIAL
- **Surface form**: believes $e^A$ is the matrix whose $(i,j)$ entry is $e^{a_{ij}}$; doesn't know
  $e^A=I+A+A^2/2!+\cdots$ (the matrix power series definition).
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the scalar identity
  $e^a$ is applied component-wise, which is not how matrix functions work).
- **Repair**: re-derive via diagonalization, $e^A=P\,\mathrm{diag}(e^{\lambda_1},\ldots,
  e^{\lambda_n})\,P^{-1}$, checking the $A=0$ case gives $I$, never a matrix of 1's.

## Misconceptions

### MC-1: EIGENVECTOR-SOLUTION-IS-SCALAR
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: COMPLEX-EIGENVALUE-GIVES-COMPLEX-SOLUTION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: MATRIX-EXPONENTIAL-IS-COMPONENT-EXPONENTIAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An eigenvector solution is like a compass direction paired with a speed — reporting only the
  speed (the scalar eλt) leaves out which way you're actually traveling."**
- **Anti-analogy**: $e^A$ isn't like exponentiating a list of numbers one at a time — it's a single
  infinite sum of matrix POWERS, only reducible to entrywise-looking exponentials in the special
  diagonal case, via the eigenvalues, never the raw entries.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\begin{pmatrix}3&1\\0&2\end{pmatrix}$ real-distinct-
  eigenvalue solution construction.
- **Demonstration 2 (targets MC-2)**: the $\lambda=2\pm i$ complex-to-real solution-pair extraction.
- **Demonstration 3 (targets MC-3)**: the $A=0$ matrix-exponential sanity check, $e^0=I$ versus a
  matrix of 1's.

## Discovery Questions
1. "Is the solution to x'=Ax just eλt, or does it need an eigenvector too?"
2. "If the eigenvalues are complex, should the reported solution to a real system be complex?"
3. "Is eᴬ the matrix with entries e raised to A's individual entries, or something else?"

## Teaching Sequence
1. **Representation shift**: work the real-distinct-eigenvalue derivation and Demonstration 1,
   isolating MC-1.
2. **Pattern induction**: work the complex-eigenvalue real-form extraction (Demonstration 2) and
   the repeated-eigenvalue generalized-eigenvector construction, isolating MC-2.
3. **Matrix exponential unification**: work Demonstration 3's $A=0$ sanity check, isolating MC-3.
4. **Mastery gate**: require correctly solving systems with real distinct, complex, and repeated
   eigenvalues, and correctly computing a matrix exponential via diagonalization, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a solution reported as $e^{\lambda t}$ alone, without the eigenvector.
- Never accept a complex-valued solution reported for a real system with complex eigenvalues.
- Never accept $e^A$ computed as the matrix of entrywise exponentials of $A$'s raw entries.

## Voice Teaching Notes
- Say "what's the eigenvector for that eigenvalue — the solution needs both" whenever only a
  scalar exponential is given.
- Ask "should that be a real answer? Have you taken the real and imaginary parts?" whenever complex
  eigenvalues appear in a real system.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly forms the eigenvalue-eigenvector solution
  $x(t)=v\,e^{\lambda t}$ for real distinct eigenvalues.
- **Rung 2 (application)**: learner correctly extracts a real solution pair from complex
  conjugate eigenvalues and constructs the generalized-eigenvector solution for a repeated
  eigenvalue.
- **Rung 3 (transfer)**: learner correctly connects the eigenvalue-based solution to $e^{At}$ as
  the fundamental matrix with $\Phi(0)=I$, and computes $e^{Jt}$ for a Jordan block directly from
  the power series.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor "eigenvector is direction, scalar is rate."
- If MC-2 recurs, re-form the real and imaginary parts of the complex solution explicitly.
- If MC-3 recurs, re-derive via diagonalization and the $A=0$ sanity check.

## Memory Hooks
- "v is the direction, eλt is the rate — a solution needs both."
- "Complex eigenvalues of a real matrix always yield a real solution pair via Re and Im."
- "eᴬ exponentiates the eigenvalues via diagonalization — never the raw matrix entries."

## Transfer Connections
- `math.de.systems-ode` (prerequisite, already authored): supplies the first-order linear system
  framework $x'=Ax$ this concept solves.
- `math.linalg.eigenvalues` (prerequisite, already authored): supplies the eigenvalue-eigenvector
  machinery this concept's solution ansatz $v\,e^{\lambda t}$ directly reuses.
- `math.linalg.diagonalization` (prerequisite, already authored): supplies the $A=PDP^{-1}$
  factorization this concept's matrix-exponential computation directly applies.
- `math.linalg.matrix-exponential` (already authored, cross-link): supplies the abstract matrix
  exponential framework this concept's fundamental-matrix and Jordan-block probe engages.

## Cross-Subject Connections
- Physics and engineering: coupled oscillator systems, RLC circuits, and linearized predator-prey
  models are all real-world $x'=Ax$ systems whose eigenvalue signs and types (real/complex)
  directly determine stability classification.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.systems-matrix-method.md`, reused by
  reference for its three eigenvalue-case teaching actions, its worked examples, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.linalg.matrix-exponential`
  on the fundamental matrix's group structure, the Cayley-Hamilton finite-computation route, and
  the Jordan-block exponential $e^{Jt}=e^{\lambda t}\begin{pmatrix}1&t\\0&1\end{pmatrix}$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.systems-ode`/`math.linalg.eigenvalues`/`math.linalg.diagonalization`, unlocks none,
  cross_links `math.linalg.matrix-exponential`, expert/apply, mastery_threshold 0.8,
  estimated_hours 8) was directly verified against the live KG and matches exactly. The cross-link
  target `math.linalg.matrix-exponential` is confirmed authored, matching the Blueprint's own
  cross-link-mode determination.

## Version History
- 2026-09-19 (Batch 226): authored. Second entry this batch. Companion batch concept:
  `math.fnal.completeness`.
