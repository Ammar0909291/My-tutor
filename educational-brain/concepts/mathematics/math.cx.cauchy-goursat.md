# math.cx.cauchy-goursat

## Identity
- **KG id**: `math.cx.cauchy-goursat`
- **Domain**: math.cx
- **Requires**: `math.cx.cauchy-theorem`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
State Cauchy-Goursat as a genuine WEAKENING of the classical Cauchy theorem's hypothesis (dropping
continuity of $f'$) — NEVER assume the classical theorem already covered this case; recognize
Goursat's proof as a COMPACTNESS/estimation argument via nested triangles — NEVER an algebraic
Green's-theorem-style calculation; and recognize the resulting holomorphic-equals-analytic
equivalence as a genuine COLLAPSE unique to complex analysis — NEVER two separately-required
properties.

## Core Understanding
CAUCHY-GOURSAT GENUINELY WEAKENS THE CLASSICAL HYPOTHESIS — NEVER ALREADY COVERED: for
$f(z)=\overline{z}$: the Cauchy-Riemann equations FAIL ($\partial_xu=1\neq-1=\partial_yv$), so $f$
is NOT holomorphic, and indeed $\oint_C\overline z\,dz=2\pi i\neq0$ on the unit circle. Contrast
$f(z)=z^2$ (holomorphic, complex derivative exists everywhere, with NO continuity assumption on
$f'$ needed): $\oint_Cz^2\,dz=0$ by Cauchy-Goursat. Believing the classical Cauchy theorem already
applies to all holomorphic functions without an extra continuity-of-$f'$ hypothesis is WRONG — the
classical proof (via Green's theorem) genuinely REQUIRED $f'$ continuous; Goursat's theorem is a
nontrivial strengthening that removes this requirement entirely.

GOURSAT'S PROOF IS A NESTED-TRIANGLE COMPACTNESS ARGUMENT — NEVER AN ALGEBRAIC CALCULATION:
supposing $\oint_Tf\,dz=I\neq0$ for triangle $T$: subdividing into four subtriangles, one subtriangle
$T_1$ satisfies $|\oint_{T_1}f\,dz|\ge|I|/4$; iterating gives nested $T_1\supset T_2\supset\cdots$
with $|\oint_{T_n}f\,dz|\ge|I|/4^n$, converging (by COMPACTNESS) to a point $z_0$. At $z_0$, ONLY
the existence of $f'(z_0)$ (not its continuity) gives a local linear approximation whose integral
error shrinks FASTER than $|I|/4^n$ — a genuine contradiction. Believing Goursat's proof is an
algebraic manipulation like the classical Green's-theorem proof is WRONG — it is a compactness and
estimation argument built entirely from nested triangles and a single pointwise derivative.

HOLOMORPHIC AND ANALYTIC GENUINELY COLLAPSE INTO ONE PROPERTY — NEVER SEPARATE REQUIREMENTS: for
$f(z)=e^z$: it is holomorphic ($f'(z)=e^z$ exists everywhere), analytic (its Taylor series
$\sum z^n/n!$ converges to it everywhere), and satisfies $\oint_Cf\,dz=0$ for every closed curve.
These are not three separately-verified facts happening to coincide for $e^z$ — Cauchy-Goursat
closes the chain (holomorphic $\Rightarrow$ Cauchy integral formula $\Rightarrow$ Taylor series)
making them EQUIVALENT for EVERY function on a simply connected domain. Believing holomorphic and
analytic are different classes of complex functions requiring separate assumptions is WRONG — in
$\mathbb{C}$ they are provably the SAME property, a collapse with NO real-analysis analog
(differentiable does not imply $C^\infty$ in $\mathbb{R}$).

## Mental Models
- **"Goursat didn't just reprove Cauchy's theorem — he proved it needs less: existence of f′ alone,
  never continuity of f′, still forces the integral to vanish."**
- **"The proof zooms in via nested triangles to a single point, then uses only the local linear
  approximation holomorphicity guarantees there — pure compactness, never algebra."**
- **"In ℂ, holomorphic, analytic, and 'integrates to zero' are the SAME fact viewed three ways —
  a genuine collapse that has no counterpart in ℝ."**

## Why Students Fail

### MC-1: CLASSICAL-CAUCHY-ALREADY-REQUIRES-NO-CONTINUITY
- **Surface form**: believes the classical Cauchy theorem already applies to all holomorphic
  functions with no continuity-of-$f'$ assumption, missing that Goursat's theorem is a genuine
  strengthening.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  classical theorem's extra hypothesis is easy to forget once Goursat's stronger result is known).
- **Repair**: re-walk the $\overline z$-versus-$z^2$ contrast, naming the removed hypothesis
  explicitly.

### MC-2: HOLOMORPHIC-AND-ANALYTIC-ARE-DIFFERENT-CLASSES
- **Surface form**: believes holomorphic and analytic are different classes of complex functions
  requiring separate assumptions, missing the equivalence collapse Cauchy-Goursat enables.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — real
  analysis's differentiable-vs-$C^\infty$ gap is incorrectly transferred to the complex setting).
- **Repair**: re-walk the holomorphic→integral-formula→Taylor-series deduction chain for $e^z$.

### MC-3: GOURSAT-PROOF-IS-ALGEBRAIC
- **Surface form**: believes Goursat's proof is an algebraic manipulation like the Green's-theorem
  proof, missing that it is a compactness/estimation argument using nested triangles.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — the classical
  Cauchy theorem's own proof IS algebraic/Green's-theorem-based, so Goursat's is assumed similar).
- **Repair**: re-walk the nested-triangle subdivision, limit point, and local-approximation
  contradiction.

## Misconceptions

### MC-1: CLASSICAL-CAUCHY-ALREADY-REQUIRES-NO-CONTINUITY
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: HOLOMORPHIC-AND-ANALYTIC-ARE-DIFFERENT-CLASSES
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: GOURSAT-PROOF-IS-ALGEBRAIC
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Goursat's theorem is like proving a bridge holds even without the safety railing everyone
  assumed was load-bearing — the weaker hypothesis (existence alone) turns out to already be
  enough."**
- **Anti-analogy**: the equivalence collapse isn't a lucky coincidence for well-behaved functions
  like $e^z$ — it's a provable, universal fact for every holomorphic function on a simply
  connected domain.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\overline z$-versus-$z^2$ hypothesis-weakening contrast.
- **Demonstration 2 (targets MC-3)**: the nested-triangle compactness proof at orientation level.
- **Demonstration 3 (targets MC-2)**: the $e^z$ holomorphic-analytic-zero-integral triple
  equivalence.

## Discovery Questions
1. "Does the classical Cauchy theorem already apply to all holomorphic functions, or does it
   require the extra assumption that f′ is continuous?"
2. "Is Goursat's proof an algebraic calculation, or does it rely on a compactness argument using
   nested triangles?"
3. "In complex analysis, does holomorphic automatically imply analytic, or is analyticity a
   separate, stronger property?"

## Teaching Sequence
1. **Representation shift**: work the $\overline z$-versus-$z^2$ contrast, isolating MC-1.
2. **Deductive**: work the nested-triangle compactness proof structure, isolating MC-3.
3. **Classify**: work the $e^z$ triple-equivalence presentation, isolating MC-2.
4. **Mastery gate**: require a correct statement of the weakened hypothesis, a correct application
   of Cauchy-Goursat to a concrete holomorphic function on a specified domain, a correct
   description of Goursat's proof strategy in the learner's own words, and a correct explanation
   of why holomorphic implies analytic via the deduction chain, at the Blueprint's own stated MAMR
   of 4/5.

## Tutor Actions
- Never accept the classical Cauchy theorem described as already covering the no-continuity case.
- Never accept Goursat's proof described as an algebraic or Green's-theorem-style calculation.
- Never accept holomorphic and analytic presented as requiring separate, independent assumptions.

## Voice Teaching Notes
- Say "what hypothesis did Goursat remove from the classical theorem?" whenever Cauchy-Goursat is
  introduced.
- Ask "is that argument algebra, or is it really about nested triangles converging to a point?"
  whenever Goursat's proof is described.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the weakened hypothesis Goursat's theorem
  removes.
- **Rung 2 (application)**: learner correctly applies Cauchy-Goursat to a concrete function on a
  specified simply connected domain.
- **Rung 3 (transfer)**: learner correctly explains why complex differentiability is genuinely
  stronger than real partial differentiability, using the Cauchy-Riemann equations as the pivot.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\overline z$-versus-$z^2$ contrast.
- If MC-2 recurs, re-walk the deduction chain from holomorphic to analytic.
- If MC-3 recurs, re-walk the nested-triangle compactness structure.

## Memory Hooks
- "Goursat proved existence of f′ alone suffices — never needing continuity too."
- "Nested triangles converge to a point — pure compactness, never algebra."
- "Holomorphic and analytic are the same fact in ℂ — a genuine collapse, no real-analysis analog."

## Transfer Connections
- `math.cx.cauchy-theorem` (prerequisite, already authored, this campaign): supplies the classical
  $C^1$-hypothesis version of the theorem this concept's weakened hypothesis is directly contrasted
  against.

## Cross-Subject Connections
- Several complex variables: Hartogs's theorem extends the holomorphic-equals-analytic equivalence
  to $\mathbb{C}^n$, directly building on the Cauchy-Goursat-enabled collapse established here for
  $n=1$.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.cauchy-goursat.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on Hartogs's theorem in several
  complex variables and the real-vs-complex partial-differentiability contrast.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.cauchy-theorem`, unlocks none, cross_links none, expert/understand, mastery_threshold
  0.8, estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 245): authored. First entry this batch. Companion batch concept:
  `math.cx.residue`.
