# math.de.sturm-liouville

## Identity
- **KG id**: `math.de.sturm-liouville`
- **Domain**: math.de
- **Requires**: `math.de.second-order-linear`, `math.de.bvp`, `math.linalg.inner-product`
- **Unlocks**: `math.de.eigenfunction-expansion`
- **Cross-links**: `math.fnal.spectral-theory` (Blueprint's own Component 7 claimed this concept
  authored — this checked the wrong corpus; the EDUCATIONAL-BRAIN corpus does NOT yet have this
  concept authored — corrected to independence mode, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 8

## Learning Objective
Define the Sturm-Liouville problem $(p(x)y')'+q(x)y+\lambda w(x)y=0$ on $[a,b]$ with $\lambda$ as
an UNKNOWN parameter (never a fixed given constant); recognize that MOST $\lambda$ give ONLY the
trivial solution, while special discrete EIGENVALUES $\lambda_n$ admit a genuine nonzero
eigenfunction $\varphi_n$; and state that eigenfunctions are orthogonal under the WEIGHTED inner
product $\int_a^bf g\,w\,dx$ (never the unweighted integral in general), forming a complete set —
a concrete instance of the general Spectral Theorem for self-adjoint operators.

## Core Understanding
MOST VALUES OF $\lambda$ GIVE ONLY THE TRIVIAL SOLUTION — NEVER A GENERIC GUARANTEE OF A
NONTRIVIAL SOLUTION: for $y''+\lambda y=0$ on $[0,\pi]$, $y(0)=y(\pi)=0$: with $\lambda=2$: general
solution $y=A\cos(\sqrt2x)+B\sin(\sqrt2x)$; $y(0)=A=0$; $y(\pi)=B\sin(\sqrt2\pi)=0$ — since
$\sqrt2\pi$ is not an integer multiple of $\pi$, $\sin(\sqrt2\pi)\ne0$, forcing $B=0$ TOO — ONLY
the trivial solution exists. With $\lambda=1$: $y(\pi)=B\sin(\pi)=0$ is AUTOMATICALLY satisfied
for ANY $B$ (since $\sin\pi=0$ exactly) — $\lambda_1=1$ IS a genuine eigenvalue with eigenfunction
$\varphi_1(x)=\sin(x)$. In general $\lambda_n=n^2$, $\varphi_n(x)=\sin(nx)$.

ORTHOGONALITY USES THE WEIGHT $w(x)$ FROM THE ORIGINAL EQUATION — NEVER THE PLAIN UNWEIGHTED
INTEGRAL IN GENERAL: for this example ($w=1$): $\langle\varphi_1,\varphi_2\rangle=
\int_0^\pi\sin(x)\sin(2x)\,dx=0$. But for a GENERAL Sturm-Liouville problem with $w(x)\ne1$,
orthogonality is $\int_a^b\varphi_m\varphi_nw(x)\,dx=0$ — the SAME weight from the differential
equation MUST be included; the unweighted integral would check the WRONG inner product entirely, a
distinction this simplest $w=1$ example happens to hide.

THE COMPLETE ORTHOGONAL EIGENFUNCTION SET IS A CONCRETE INSTANCE OF THE GENERAL SPECTRAL THEOREM —
NEVER AN ISOLATED, UNRELATED FACT: the operator $L[y]=-y''$ (rewriting $y''+\lambda y=0$ as
$Ly=\lambda y$) is self-adjoint with respect to the weighted inner product — matching the general
self-adjoint-operator guarantee of REAL eigenvalues (indeed $\lambda_n=n^2$ are real and
positive). The eigenfunctions $\{\sin(nx)\}$ forming a complete set in $L^2([0,\pi])$ is EXACTLY
the completeness underlying Fourier sine series — Sturm-Liouville theory is the general machinery
explaining WHY Fourier series work, generalized to other weights and operators.

## Mental Models
- **"Most λ leave you with nothing but the zero solution — genuine eigenfunctions live only at
  special, discrete values."**
- **"The weight function w(x) is baked into the orthogonality integral — omit it and you're
  checking the wrong inner product entirely."**

## Why Students Fail

### MC-1: STURM-LIOUVILLE-BVP-ASSUMED-SOLVABLE-FOR-EVERY-LAMBDA
- **Surface form**: believes the Sturm-Liouville BVP has a genuine nonzero solution for every
  value of $\lambda$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a BVP feels like it
  should generically have a solution, missing the eigenvalue-specific structure).
- **Repair**: re-walk the $\lambda=2$-versus-$\lambda=1$ contrast, confirming only special
  discrete values admit a nonzero solution.

### MC-2: ORTHOGONALITY-ASSUMED-UNWEIGHTED
- **Surface form**: believes eigenfunction orthogonality always uses the plain unweighted integral.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the simplest example's
  $w=1$ makes the weight's role invisible).
- **Repair**: re-walk the explicit flag that $w=1$ here specifically but the general formula
  requires $w(x)$ from the original equation.

### MC-3: STURM-LIOUVILLE-TREATED-AS-ISOLATED-FROM-SPECTRAL-THEORY
- **Surface form**: believes the eigenfunction-completeness result is a special, isolated fact
  unique to this equation.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the concrete, computable
  nature of this example obscures its connection to abstract general theory).
- **Repair**: re-walk the direct connection to the self-adjoint-operator framework's real-spectrum
  guarantee.

## Misconceptions

### MC-1: STURM-LIOUVILLE-BVP-ASSUMED-SOLVABLE-FOR-EVERY-LAMBDA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ORTHOGONALITY-ASSUMED-UNWEIGHTED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: STURM-LIOUVILLE-TREATED-AS-ISOLATED-FROM-SPECTRAL-THEORY
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Sturm-Liouville eigenvalues are like tuning-fork frequencies — only certain special
  frequencies make the fork ring (a nonzero eigenfunction); every other frequency produces
  nothing at all."**
- **Anti-analogy**: the orthogonality check is NOT a fixed unweighted integral formula — it's
  weighted by whatever $w(x)$ the original equation specifies, changing from problem to problem.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\lambda=2$ (trivial only) versus $\lambda=1$ (genuine
  eigenfunction $\sin x$) contrast.
- **Demonstration 2 (targets MC-2)**: the weighted-orthogonality computation, explicitly flagging
  $w=1$'s hidden role.
- **Demonstration 3 (targets MC-3)**: the self-adjoint-operator connection to the general Spectral
  Theorem and Fourier series.

## Discovery Questions
1. "Does the Sturm-Liouville BVP have a genuine nonzero solution for every value of λ?"
2. "Is eigenfunction orthogonality always checked using the plain, unweighted integral?"
3. "Is the Sturm-Liouville eigenfunction-completeness result a special, isolated fact unrelated to
   general operator theory?"

## Teaching Sequence
1. **Conflict evidence**: the trivial-versus-genuine-eigenfunction contrast, working
   Demonstration 1, isolating MC-1.
2. **Representation shift**: the weighted orthogonality, working Demonstration 2, isolating MC-2.
3. **Contrast pair**: the connection to the general Spectral Theorem, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct eigenvalue/eigenfunction verification, a correct weighted-
   orthogonality computation, and a correct explanation of the connection to self-adjoint operator
   theory, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a claim that the Sturm-Liouville BVP has a nonzero solution for every $\lambda$.
- Never accept orthogonality checked without the weight function $w(x)$ from the original
  equation.
- Never accept the eigenfunction-completeness result described as isolated from general
  self-adjoint operator theory.

## Voice Teaching Notes
- Say "is this λ special, or does it just give the trivial solution?" whenever a Sturm-Liouville
  eigenvalue is checked.
- When orthogonality is verified, ask "what's the weight function here, and did you include it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies whether a given $\lambda$ is an eigenvalue
  for a Sturm-Liouville BVP.
- **Rung 2 (application)**: learner correctly computes a weighted orthogonality integral for two
  eigenfunctions.
- **Rung 3 (transfer)**: learner correctly connects a Sturm-Liouville problem's eigenfunction
  completeness to the general Spectral Theorem for self-adjoint operators.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\lambda=2$-versus-$\lambda=1$ contrast.
- If MC-2 recurs, re-verify the weighted orthogonality formula.
- If MC-3 recurs, re-walk the self-adjoint-operator connection.

## Memory Hooks
- "Most λ give nothing but zero — eigenvalues are special, discrete exceptions."
- "Never drop the weight w(x) from the orthogonality integral — it comes from the equation
  itself."
- "This is a concrete, computable instance of the general Spectral Theorem — not an isolated
  trick."

## Transfer Connections
- `math.de.second-order-linear` (already authored, this campaign, Batch 150): supplies the
  standard ODE form this concept's self-adjoint form is built from.
- `math.de.bvp` (already authored, this campaign, Batch 160): supplies the two-point boundary
  conditions and "existence not guaranteed" caution this concept applies per-$\lambda$.
- `math.linalg.inner-product` (already authored, certified domain): supplies the inner-product
  framework this concept's weighted version directly generalizes.
- `math.de.eigenfunction-expansion` (not yet authored): the KG's declared unlock, expanding
  general functions in terms of these eigenfunctions.
- `math.fnal.spectral-theory` (not yet authored in this campaign): the KG's declared cross-link,
  supplying the general self-adjoint-operator framework this concept instantiates concretely.

## Cross-Subject Connections
- Physics: normal modes, quantum mechanical eigenstates.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.sturm-liouville.md`, reused by reference
  for its $y''+\lambda y=0$ eigenvalue derivation, its weighted-orthogonality example, its
  self-adjoint-operator connection, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own probe (independence mode here pending
  `math.fnal.spectral-theory`'s authoring), connecting this concept's concrete eigenvalue problem
  to the general self-adjoint-operator framework.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  claims `math.fnal.spectral-theory` is "already authored" — checked against the BLUEPRINTS
  directory, where its Blueprint does exist, not the EDUCATIONAL-BRAIN corpus, where it does NOT
  yet exist — corrected to independence mode here, the fourth such wrong-corpus discrepancy this
  campaign (after Batches 128-129, 157's convolution-theorem, and 160's legendre-equation). All
  other fields (requires `math.de.second-order-linear`/`math.de.bvp`/`math.linalg.inner-product`,
  unlocks `math.de.eigenfunction-expansion`, expert/analyze, mastery_threshold 0.7,
  estimated_hours 8) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 161): authored. First entry this batch, closing `math.de.bvp`'s declared
  unlock. Companion batch concept: `math.de.pde`.
