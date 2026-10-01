# math.linalg.matrix-exponential

## Identity
- **KG id**: `math.linalg.matrix-exponential`
- **Domain**: math.linalg
- **Requires**: `math.linalg.diagonalization`, `math.seq.series`
- **Unlocks**: none
- **Cross-links**: `math.de.systems-matrix-method`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
State the matrix exponential's series definition $e^A=\sum_{k=0}^\infty A^k/k!$; for
diagonalizable $A=PDP^{-1}$, compute $e^A=Pe^DP^{-1}$ with $e^D$'s diagonal entries $e^{\lambda_i}$
(never $\lambda_i$ raised to $e$, never left unchanged); and use $x(t)=e^{At}x(0)$ to solve
$x'=Ax$, recognizing $e^{At}$ as a genuinely $t$-DEPENDENT matrix (never $t$ times the fixed
matrix $e^A$).

## Core Understanding
$e^D$'S DIAGONAL ENTRIES ARE $e^{\lambda_i}$ — NEVER $\lambda_i^e$ OR $\lambda_i$ UNCHANGED: for
$A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$ (already diagonal): $e^D=\begin{pmatrix}e^2&0\\0&e^{-1}
\end{pmatrix}$. A common error computes the diagonal entries as $2^e$ or $(-1)^e$, or simply
LEAVES the eigenvalues unchanged (writing $e^D=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$, forgetting
to exponentiate at all) — because $D^k=\mathrm{diag}(\lambda_1^k,\dots,\lambda_n^k)$ makes the
matrix series DECOUPLE into $n$ independent SCALAR exponential series, each entry becomes $e$
RAISED TO the eigenvalue's power, never the eigenvalue raised to $e$ and never left as-is.

$e^{At}$ IS A GENUINELY $t$-DEPENDENT MATRIX — NEVER $t$ TIMES THE FIXED MATRIX $e^A$: for
$A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$, $x(0)=(3,5)$: the solution
$x(t)=e^{At}x(0)=\begin{pmatrix}e^{2t}&0\\0&e^{-t}\end{pmatrix}\begin{pmatrix}3\\5\end{pmatrix}=
\begin{pmatrix}3e^{2t}\\5e^{-t}\end{pmatrix}$. A common error writes $x(t)=e^A\cdot t\cdot x(0)$
— confusing $e^{At}$ (the matrix exponential of $At$, substituting $t$ INSIDE the exponent, giving
a genuinely different matrix RECOMPUTED for each $t$) with $t$ TIMES the fixed matrix $e^A$, an
entirely different and incorrect object — substituting $At$ into the series makes EVERY power of
$t$ appear ($t,t^2,t^3,\dots$), never just a single linear factor.

THE SERIES DEFINITION IS THE MATRIX GENERALIZATION OF THE SCALAR EXPONENTIAL — DIAGONALIZATION
COLLAPSES IT TO SCALAR EXPONENTIALS: $e^A=I+A+A^2/2!+A^3/3!+\cdots$ is a genuine, well-defined
CONVERGENT matrix, never merely symbolic notation. Computing this series directly is impractical
— but for a diagonalizable $A=PDP^{-1}$, the SAME $P,D,P^{-1}$ machinery from
`math.linalg.diagonalization` (previously used for $A^k$) now builds $e^A$ instead, with the
derivative property $\frac{d}{dt}e^{At}=Ae^{At}$ being EXACTLY what makes $x(t)=e^{At}x(0)$ solve
$x'=Ax$ — a direct matrix generalization of the scalar ODE $x'=ax\Rightarrow x(t)=e^{at}x(0)$.

## Mental Models
- **"e^D exponentiates the EIGENVALUES themselves, as exponents of e — never the other way
  around, never left unchanged."**
- **"e^{At} is a movie playing out over t — a genuinely different matrix at each moment, never a
  single fixed frame scaled by t."**
- **"The same diagonalization toolkit that computes A^k also computes e^A — just swap A^k's
  eigenvalue powers for e^A's eigenvalue exponentials."**

## Why Students Fail

### MC-1: E-TO-D-DIAGONAL-ENTRIES-COMPUTED-INCORRECTLY
- **Surface form**: computes $e^D$'s diagonal entries as the eigenvalue raised to $e$, or leaves
  them unchanged, instead of $e$ raised to each eigenvalue's power.
- **Birth type**: Foundational severity (Blueprint's own declared severity — produces a
  plausible-looking but numerically wrong result with no obvious internal check).
- **Repair**: re-derive from the series definition applied entrywise to the diagonal case.

### MC-2: E-TO-AT-CONFUSED-WITH-T-TIMES-E-TO-A
- **Surface form**: treats $e^{At}$ as $t$ times the fixed matrix $e^A$, rather than a genuinely
  $t$-dependent matrix recomputed for each $t$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — produces a
  plausible-looking but structurally wrong result with no obvious internal check).
- **Repair**: re-substitute $At$ into the series definition directly, showing every power of $t$
  appears.

## Misconceptions

### MC-1: E-TO-D-DIAGONAL-ENTRIES-COMPUTED-INCORRECTLY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: E-TO-AT-CONFUSED-WITH-T-TIMES-E-TO-A
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"e^D takes each eigenvalue and asks 'e to THIS power' — never 'this to the power e,' never
  'leave it as is.'"**
- **Anti-analogy**: $e^{At}$ is not a fixed snapshot scaled up — it's a fresh matrix computed at
  every instant $t$, with every power of $t$ genuinely entering the computation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $e^D$ computation for $A=\mathrm{diag}(2,-1)$, showing
  $e^2$ and $e^{-1}$ as the correct entries.
- **Demonstration 2**: the $P,D,P^{-1}$ construction reused from diagonalization, now building
  $e^A$ for a genuinely non-diagonal $A$.
- **Demonstration 3 (targets MC-2)**: the $x(t)=e^{At}x(0)$ solution contrasted against the
  incorrect $t\cdot e^A\cdot x(0)$.

## Discovery Questions
1. "Are $e^D$'s diagonal entries computed as $e$ raised to each eigenvalue, or some other
   combination?"
2. "Can $e^{At}$ simply be written as $t$ times the fixed matrix $e^A$?"
3. "Why does the matrix exponential series collapse into simple scalar exponentials for a
   diagonal matrix?"

## Teaching Sequence
1. **Conceptual shift**: the series definition applied entrywise to the diagonal case, working
   Demonstration 1, isolating MC-1.
2. **Procedure reuse**: the diagonalization machinery applied to a genuinely non-diagonal matrix,
   working Demonstration 2.
3. **Contrast pair**: the $e^{At}$-versus-$t\cdot e^A$ comparison, working Demonstration 3,
   isolating MC-2.
4. **Mastery gate**: require a correct $e^A$ computation for a diagonal matrix, a correct
   $e^D$ construction from given eigenvalues, and a correct $x(t)=e^{At}x(0)$ solution
   construction, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept $e^D$'s diagonal entries computed as eigenvalues raised to $e$ or left unchanged.
- Never accept $e^{At}$ treated as $t$ times the fixed matrix $e^A$.
- Never accept the matrix exponential series presented as merely symbolic rather than a genuine
  convergent matrix.

## Voice Teaching Notes
- Say "is that e raised to the eigenvalue, or the eigenvalue raised to e?" whenever $e^D$ is
  computed.
- Ask "does t appear inside the exponent, or as an outside multiplier?" whenever $e^{At}$ is
  computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $e^A$ for a diagonal matrix.
- **Rung 2 (application)**: learner correctly applies the $P,D,P^{-1}$ machinery to compute
  $e^A$ for a genuinely non-diagonal matrix.
- **Rung 3 (transfer)**: learner correctly writes and interprets the solution $x(t)=e^{At}x(0)$
  for a linear system, including the decay-rate comparison across eigenvalues.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive $e^D$ from the series definition applied entrywise.
- If MC-2 recurs, re-substitute $At$ into the series definition directly.

## Memory Hooks
- "e to the eigenvalue — never the eigenvalue to the e, never unchanged."
- "e^{At} is recomputed at every t — never a fixed matrix times t."
- "Diagonalization's P, D, P⁻¹ toolkit builds e^A the same way it builds A^k."

## Transfer Connections
- `math.linalg.diagonalization` (already authored, this campaign): supplies the $P,D,P^{-1}$
  machinery this concept directly reuses to compute $e^A$ efficiently.
- `math.seq.series` (already authored, certified domain): supplies the infinite-series
  convergence framework this concept's $e^A=\sum A^k/k!$ definition is built on.
- `math.de.systems-matrix-method` (not yet authored): the closed-form solution technique for
  linear systems of differential equations, this concept's genuine cross-link.

## Cross-Subject Connections
- Differential equations: solving $x'=Ax$ via $x(t)=e^{At}x(0)$, the primary application this
  concept establishes.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.matrix-exponential.md`, reused by
  reference for its diagonal $e^D$ computation, its non-diagonal $P,D,P^{-1}$ example, its
  $e^{At}$-versus-$t\cdot e^A$ contrast, and its two-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a chemical reaction network's
  independent-rate decay, connecting eigenvalue signs to decay behavior and relative decay
  speeds.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.diagonalization`/`math.seq.series`, unlocks none, cross_links
  `math.de.systems-matrix-method`, expert/apply, mastery_threshold 0.8, estimated_hours 5) was
  directly verified against the live KG and matches exactly. `math.de.systems-matrix-method`
  independently re-confirmed NOT YET authored, exactly matching the Blueprint's own correctly
  scoped independence-mode transfer probe.

## Version History
- 2026-09-19 (Batch 193): authored. Second entry this batch. Companion batch concept:
  `math.linalg.jordan-form`.
