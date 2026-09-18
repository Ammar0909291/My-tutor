# math.de.systems-ode

## Identity
- **KG id**: `math.de.systems-ode`
- **Domain**: math.de
- **Requires**: `math.de.second-order-ode`, `math.linalg.matrix`, `math.linalg.eigenvalues`
- **Unlocks**: none
- **Cross-links**: `math.linalg.diagonalization` (not yet authored — verified via `ls`;
  independence mode used, see Blueprint References)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
Define a system of ODEs as $\vec x'=A\vec x+\vec b$ involving MULTIPLE dependent variables;
convert a higher-order scalar ODE into an equivalent first-order system via STATE-VECTOR
REDUCTION (introducing a new variable for each derivative up to order $n-1$); and solve a
homogeneous linear system $\vec x'=A\vec x$ via `math.linalg.eigenvalues`'s own eigenvalue
equation, correctly recognizing this method requires ENOUGH INDEPENDENT EIGENVECTORS — never
automatic for every matrix.

## Core Understanding
STATE-VECTOR REDUCTION TURNS A HIGHER-ORDER SCALAR ODE INTO A FIRST-ORDER SYSTEM: for
$y''=f(y',y,t)$, let $x_1=y,x_2=y'$. Then $x_1'=y'=x_2$ BY DEFINITION, and $x_2'=y''=f(x_2,x_1,t)$
by substituting the original equation — TWO first-order equations, exactly equivalent to the
original second-order one. For $y''-5y'+6y=0$: $x_1'=x_2$, $x_2'=5x_2-6x_1$, giving matrix form
$\vec x'=A\vec x$ with $A=\begin{pmatrix}0&1\\-6&5\end{pmatrix}$ — directly extending
`math.linalg.matrix`'s own notation to a differential setting.

THE EIGENVALUE EQUATION FROM `math.linalg.eigenvalues` SOLVES THE SYSTEM DIRECTLY: seeking
$\vec x(t)=\vec ve^{\lambda t}$ in $\vec x'=A\vec x$, substitution gives $\lambda\vec v=A\vec v$
— EXACTLY the eigenvalue equation. For $A=\begin{pmatrix}0&1\\-6&5\end{pmatrix}$: $\det(A-\lambda
I)=\lambda^2-5\lambda+6=0$ — the IDENTICAL polynomial as the original ODE's characteristic
equation, giving $\lambda=2,3$ matching $r_1=2,r_2=3$ exactly; the resulting solution's first
component reproduces the already-known scalar solution $y=c_1e^{2t}+c_2e^{3t}$ precisely — the
eigenvalue method and the characteristic-equation method are the SAME underlying idea in two
formalisms, never two independent facts.

A REPEATED EIGENVALUE CAN SUPPLY TOO FEW INDEPENDENT EIGENVECTORS, REQUIRING ADDITIONAL
TECHNIQUE: for $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$, $\lambda=2$ is repeated, but solving
$(A-2I)\vec v=0$ gives only ONE independent direction $(1,0)$ — insufficient for a genuine
two-parameter general solution via "one term per eigenvalue." This parallels
`math.de.second-order-ode`'s own repeated-root case ($y=(C_1+C_2x)e^{rx}$) — the naive method
requires a genuine, checkable condition (enough independent eigenvectors) that is never
automatic for every matrix.

## Mental Models
- **"State-vector reduction is bookkeeping: name every derivative you'd otherwise track
  informally, and the messy higher-order equation becomes a clean team of first-order ones."**
- **"The eigenvalue method and the characteristic-equation method are the same computation
  wearing two different formalisms — not two separate techniques to memorize."**

## Why Students Fail

### MC-1: EIGENVALUE-METHOD-ASSUMED-ALWAYS-SUFFICIENT
- **Surface form**: believes the eigenvalue-eigenvector method always produces a complete general
  solution with one term per eigenvalue.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the method's success on distinct-eigenvalue examples generalizes silently to the repeated case).
- **Repair**: re-count independent eigenvectors directly for the matrix in question, confirming
  the naive method is incomplete whenever the count falls short of the matrix's size.

### MC-2: STATE-VECTOR-REDUCTION-VARIABLES-MISASSIGNED
- **Surface form**: incorrectly assigns the new state variables during reduction (e.g. not
  correctly setting $x_2=y'$, or misforming the equation for $x_2'$).
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  without an explicit, repeated pattern, the assignment step is easy to perform inconsistently).
- **Repair**: re-derive the reduction explicitly, confirming $x_1'=x_2$ by definition and
  $x_2'=y''$ from directly solving the original equation.

### MC-3: SYSTEM-AND-SCALAR-CHARACTERISTIC-EQUATIONS-TREATED-AS-UNRELATED
- **Surface form**: fails to recognize that the matrix's characteristic equation and the original
  scalar ODE's characteristic equation are the identical polynomial.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity —
  presented via different formalisms, the two methods' underlying identity is easy to miss).
- **Repair**: re-walk the direct side-by-side comparison confirming both polynomials match term
  for term.

## Misconceptions

### MC-1: EIGENVALUE-METHOD-ASSUMED-ALWAYS-SUFFICIENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: STATE-VECTOR-REDUCTION-VARIABLES-MISASSIGNED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SYSTEM-AND-SCALAR-CHARACTERISTIC-EQUATIONS-TREATED-AS-UNRELATED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A repeated eigenvalue with too few eigenvectors is the matrix-world twin of a repeated root
  in a scalar ODE — both need an extra structural fix, not a doubled copy of the same solution."**
- **Anti-analogy**: the eigenvalue method and characteristic-equation method are NOT two
  unrelated techniques that happen to give similar answers — they are literally the same
  polynomial, solved twice.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: converting $y''+2y'-3y=0$ via $x_1=y,x_2=y'$ gives
  $x_1'=x_2$ (by definition) and $x_2'=-2x_2+3x_1$ (from solving the original equation for $y''$)
  — a fully derived, not guessed, system.
- **Demonstration 2 (targets MC-3)**: for $A=\begin{pmatrix}0&1\\-6&5\end{pmatrix}$,
  $\det(A-\lambda I)=\lambda^2-5\lambda+6=0$ matches the scalar ODE's $r^2-5r+6=0$ term for term.
- **Demonstration 3 (targets MC-1)**: $A=\begin{pmatrix}2&1\\0&2\end{pmatrix}$ has repeated
  $\lambda=2$ but only one independent eigenvector $(1,0)$ — naively writing
  $c_1(1,0)e^{2t}+c_2(1,0)e^{2t}$ fails to produce a genuine two-parameter family, since both
  terms are multiples of each other.

## Discovery Questions
1. "When you convert $y''=f(y',y,t)$ using $x_1=y,x_2=y'$, is $x_1'$ something new to derive, or
   does it follow immediately from the definitions?"
2. "Is the matrix's characteristic equation a coincidentally similar polynomial to the original
   ODE's, or are they the exact same equation?"
3. "If a matrix has a repeated eigenvalue, does the eigenvector method automatically supply a
   complete general solution?"

## Teaching Sequence
1. **Representation shift**: convert a known second-order ODE into a first-order system,
   grounding state-vector reduction in an already-familiar example.
2. **Conflict evidence**: Demonstration 2's side-by-side polynomial comparison, isolating MC-3 by
   confirming the two characteristic equations are identical.
3. **Conflict evidence**: Demonstration 3's repeated-eigenvalue case, isolating MC-1 by requiring
   independent eigenvectors counted explicitly.
4. **Mastery gate**: require a correctly derived state-vector system (isolating MC-2), a correct
   eigenvalue-to-characteristic-equation correspondence, and a correct explanation of the
   repeated-eigenvalue caveat, at the Blueprint's own stated MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept a state-vector reduction without $x_1'=x_2$ stated by definition and $x_2'$
  derived from the original equation.
- Never accept "one term per eigenvalue" as sufficient without checking the count of independent
  eigenvectors against the matrix's size.

## Voice Teaching Notes
- Say "is that new variable's derivative something you derived, or just assumed?" whenever
  state-vector reduction is performed.
- When eigenvalues are found, ask "do you have enough independent eigenvectors to match the
  matrix's size?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly converts a new higher-order ODE into a first-order
  system via state-vector reduction.
- **Rung 2 (application)**: learner correctly finds eigenvalues/eigenvectors of the resulting
  matrix and constructs the general solution.
- **Rung 3 (transfer)**: learner correctly diagnoses a NEW matrix's repeated-eigenvalue case as
  requiring additional technique, and explains why converting a higher-order model to a system is
  useful even before computing specific eigenvalues.

## Tutor Recovery Strategy
- If MC-1 recurs, re-count independent eigenvectors directly for the matrix in question.
- If MC-2 recurs, re-derive the reduction explicitly from the definitions.
- If MC-3 recurs, re-walk the direct side-by-side polynomial comparison.

## Memory Hooks
- "New variable's derivative follows from its definition — never guessed."
- "Same characteristic polynomial, two formalisms — not two separate facts."
- "Repeated eigenvalue, too few eigenvectors — the matrix version of a repeated root."

## Transfer Connections
- `math.de.second-order-ode` (already authored, this campaign, Batch 103): supplies the
  characteristic-equation method and root-case taxonomy this concept's eigenvalue method directly
  parallels and reuses.
- `math.linalg.matrix` (already authored): supplies the matrix notation $\vec x'=A\vec x$ this
  concept is built on.
- `math.linalg.eigenvalues` (already authored): supplies the $Av=\lambda v$ equation and solution
  method directly reused for solving the system.

## Cross-Subject Connections
- None formal — `math.linalg.diagonalization` is declared as a cross-link in the KG but is not
  yet authored (confirmed via `ls`), so this entry uses independence mode per the established
  convention.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.systems-ode.md`, reused by reference for
  its state-vector-reduction derivation, its identical-characteristic-polynomial demonstration,
  its repeated-eigenvalue counterexample, and its three-misconception registry (severity levels
  adopted directly as declared; birth types independently classified since this Blueprint states
  Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  predator-prey linearized system, using eigenvalues to determine oscillation/growth/decay
  behavior, and the repeated-eigenvalue caveat in that applied context.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-ode`+`math.linalg.matrix`+`math.linalg.eigenvalues`, unlocks none,
  cross_links `math.linalg.diagonalization`, expert/apply, mastery_threshold 0.8,
  estimated_hours 8) was directly verified against the live KG and matches exactly. The
  Blueprint's own correctly-declared independence P76 mode (cross-link target confirmed
  unauthored via `ls`) required no correction.

## Version History
- 2026-09-18 (Batch 104): authored. First entry this batch. Companion batch concept:
  `math.prob.bayes-theorem`. `math.de` moves 6/56 → **7/56** this batch.
