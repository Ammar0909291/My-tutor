# math.meas.lebesgue-integral

## Identity
- **KG id**: `math.meas.lebesgue-integral`
- **Domain**: math.meas
- **Requires**: `math.meas.simple-function`
- **Unlocks**: `math.meas.convergence-theorems`, `math.meas.lp-space`
- **Cross-links**: `math.real.riemann-integral` (KG-declared and Blueprint-claimed as "authored,"
  but NOT actually authored — verified via `ls`; independence mode used instead, see Curriculum
  Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 7

## Learning Objective
Define $\int f\,d\mu=\sup\{\int\varphi\,d\mu:\varphi\text{ simple},0\le\varphi\le f\}$ for
non-negative measurable $f$ — the SUPREMUM of already-known simple-function integrals over every
simple function staying below $f$; extend to signed functions via $f=f^+-f^-$ (positive/negative
parts, both non-negative); and recognize the Lebesgue integral as a GENUINE EXTENSION beyond
classical Riemann integration — integrating strictly more functions, never merely an alternative
method for the identical class.

## Core Understanding
THE INTEGRAL IS BUILT AS A SUPREMUM OF ALREADY-KNOWN SIMPLE-FUNCTION INTEGRALS, NEVER A NEW KIND
OF COMPUTATION: for $f(x)=x^2$ on $[0,1]$, reusing `math.meas.simple-function`'s own approximating
sequence $\varphi_n$ (infimum on each of $n$ equal sub-intervals), $\int f\,d\mu$ is the SUPREMUM
of $\int\varphi_n\,d\mu$ as $n\to\infty$ — approaching $\frac13$, matching ordinary calculus. No
new integration concept is introduced; only a new way of aggregating the easy, finite-sum simple
case.

$f=f^+-f^-$ SPLITS A SIGNED FUNCTION INTO TWO NON-NEGATIVE PIECES, BOTH ALREADY INTEGRABLE VIA THE
SUPREMUM CONSTRUCTION: for $f(x)=x$ on $[-1,1]$: $f^+(x)=\max(x,0)$, $f^-(x)=\max(-x,0)$ — both
non-negative by construction. $\int f^+\,d\mu=\int_0^1x\,dx=\frac12$; $\int f^-\,d\mu=\frac12$ by
symmetry; so $\int f\,d\mu=\frac12-\frac12=0$, matching the expected symmetric cancellation,
computed entirely from two non-negative-function integrals combined by subtraction — never a
fresh signed-integration technique.

LEBESGUE INTEGRATION IS A GENUINE EXTENSION OF RIEMANN INTEGRATION, NEVER MERELY A DIFFERENT
METHOD FOR THE SAME FUNCTIONS: the Dirichlet function $f(x)=1$ on rationals, $0$ on irrationals
in $[0,1]$ is NOT Riemann integrable at all — every upper Darboux sum equals 1 (rationals dense),
every lower sum equals 0 (irrationals dense), so $\inf U\ne\sup L$. But $f$ IS measurable — it's
$\mathbb1_{\mathbb Q\cap[0,1]}$, a SIMPLE function — so $\int f\,d\mu=1\cdot\mu(\mathbb Q\cap[0,1])
=1\cdot0=0$, computed effortlessly. A function Riemann's theory cannot handle AT ALL is integrated
trivially by Lebesgue's theory, proving genuine extension, never equivalence.

## Mental Models
- **"The Lebesgue integral squeezes simple functions underneath f and takes the best (largest)
  simple-function integral achievable — a supremum, not a new kind of limit."**
- **"Riemann asks 'do upper and lower sums agree?'; Lebesgue asks 'is the function measurable?' —
  a strictly weaker, more permissive question, which is exactly why Lebesgue reaches further."**

## Why Students Fail

### MC-1: LEBESGUE-AND-RIEMANN-TREATED-AS-EQUIVALENT-THEORIES
- **Surface form**: believes the Lebesgue integral is just a different method for computing the
  same integrals Riemann integration already handles.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  both theories agree exactly on Riemann-integrable functions, making the class-difference easy to
  miss without a concrete counterexample).
- **Repair**: re-walk the Dirichlet-function evidence — Riemann-uninitegrable, yet trivially
  Lebesgue-integrable.

### MC-2: POSITIVE-NEGATIVE-PART-DECOMPOSITION-MISAPPLIED
- **Surface form**: incorrectly computes $f^+$ or $f^-$ (e.g. forgetting both must be
  non-negative everywhere, or sign errors in $f^-=\max(-f,0)$).
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Foundational severity — the
  negative sign inside $\max(-f,0)$ invites sign-error slips).
- **Repair**: re-walk the explicit $f(x)=x$ computation, re-anchoring on $f^-$ always non-negative
  by construction.

### MC-3: SUPREMUM-CONSTRUCTION-CONFUSED-WITH-A-SINGLE-APPROXIMATING-SEQUENCE
- **Surface form**: believes the Lebesgue integral's value depends on which specific approximating
  sequence of simple functions is chosen.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity — seeing
  one specific sequence used in examples invites treating it as THE definition rather than one
  instance approaching a fixed supremum).
- **Repair**: re-anchor on the supremum being over ALL simple functions below $f$ — a single fixed
  number regardless of which sequence approaches it.

## Misconceptions

### MC-1: LEBESGUE-AND-RIEMANN-TREATED-AS-EQUIVALENT-THEORIES
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: POSITIVE-NEGATIVE-PART-DECOMPOSITION-MISAPPLIED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: SUPREMUM-CONSTRUCTION-CONFUSED-WITH-A-SINGLE-APPROXIMATING-SEQUENCE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Building the Lebesgue integral is like finding the tallest box that still fits under a
  curve, using only boxes you already know how to measure — the best fit is the supremum, fixed
  regardless of which sequence of boxes you tried."**
- **Anti-analogy**: Lebesgue integration is NOT Riemann integration wearing a different notation —
  it reaches functions (like the Dirichlet function) that Riemann's theory has no answer for at
  all.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: $f(x)=x^2$ on $[0,1]$ via the reused simple-function
  sequence $\varphi_n$, supremum approaching $\frac13$.
- **Demonstration 2 (targets MC-2)**: $f(x)=x$ on $[-1,1]$: $f^+,f^-$ both non-negative,
  $\int f\,d\mu=\frac12-\frac12=0$.
- **Demonstration 3 (targets MC-1)**: the Dirichlet function — not Riemann integrable ($\inf U=1
  \ne0=\sup L$), yet trivially Lebesgue integrable as a simple function ($\int f\,d\mu=1\cdot0=0$).

## Discovery Questions
1. "Is the Lebesgue integral just a different name or method for computing the exact same integral
   Riemann integration already handles?"
2. "When splitting $f=f^+-f^-$, must both $f^+$ and $f^-$ be non-negative everywhere?"
3. "Does choosing a different approximating sequence of simple functions change the Lebesgue
   integral's value?"

## Teaching Sequence
1. **Representation shift**: state the supremum construction, working Demonstration 1's reuse of
   the simple-function sequence, isolating MC-3 by requiring the supremum recognized as a fixed
   value.
2. **Representation shift**: Demonstration 2's $f^+/f^-$ computation, isolating MC-2 by requiring
   both parts verified non-negative.
3. **Conflict evidence**: Demonstration 3's Dirichlet-function contrast, isolating MC-1 by
   requiring the genuine extension acknowledged.
4. **Mastery gate**: require a correct explanation of the supremum construction, a correct
   $f^+/f^-$ decomposition and integral for a new signed function, and a correct computation of
   the Dirichlet-type function's Lebesgue integral, at the Blueprint's own stated MAMR of 5/5
   (⌈0.85×5⌉).

## Tutor Actions
- Never accept "Lebesgue and Riemann integrate exactly the same functions" without the Dirichlet
  counterexample addressed.
- Never accept an $f^-$ computation that goes negative anywhere.

## Voice Teaching Notes
- Say "does a different approximating sequence of simple functions change the answer, or is the
  supremum fixed?" whenever the construction is discussed.
- When Lebesgue and Riemann are compared, ask "is there a function one theory handles that the
  other cannot?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why the Lebesgue integral is defined as a
  supremum rather than a limit of one specific sequence.
- **Rung 2 (application)**: learner correctly computes $f^+,f^-$ and the resulting integral for a
  new signed function.
- **Rung 3 (transfer)**: learner correctly identifies a new non-Riemann-integrable function as
  Lebesgue integrable, computing its value via the measure-zero or simple-function route.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the Dirichlet-function evidence.
- If MC-2 recurs, re-walk the explicit $f^+/f^-$ computation.
- If MC-3 recurs, re-anchor on the supremum's fixed value regardless of sequence.

## Memory Hooks
- "The supremum is fixed — any valid sequence of simple functions approaches the same number."
- "f-plus and f-minus are both non-negative by construction — never let either go negative."
- "Lebesgue reaches further than Riemann — the Dirichlet function proves it."

## Transfer Connections
- `math.meas.simple-function` (already authored, this campaign, Batch 114): supplies the exact
  finite-sum integral this concept's supremum construction is built entirely from.
- `math.meas.lebesgue-measure` (already authored, this campaign, Batch 110): supplies the
  measure-zero-rationals fact making the Dirichlet function's integral trivially computable.
- `math.meas.convergence-theorems` (not yet authored): the KG's declared unlock, developing the
  limit theorems (monotone/dominated convergence) making this integral's true power evident.
- `math.meas.lp-space` (not yet authored): the KG's declared unlock, building $L^p$ spaces
  directly from Lebesgue-integrable functions.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.meas.lebesgue-integral.md`, reused by
  reference for its supremum-over-simple-functions construction, its $f^+/f^-$ signed-function
  extension, its Dirichlet-function genuine-extension evidence, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own probe, examining precisely which step of
  the Darboux-sum construction breaks down for the Dirichlet function, and why the Lebesgue
  framework trivially handles it as an indicator function of a measure-zero set — used here in
  INDEPENDENCE mode (see Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (EIGHTH occurrence this campaign)**: the
  Blueprint's own Component 7 states `math.real.riemann-integral` was "verified authored via `ls
  docs/curriculum/blueprints/math.real.riemann-integral.md`," setting P76_mode to cross-link
  probe. Verified via `ls educational-brain/concepts/mathematics/` that `math.real.riemann-
  integral` has NO authored Educational Brain entry — the same wrong-corpus pattern noted in
  Batches 107 and 111 (checking the Blueprint corpus, not the EB corpus this campaign builds).
  This entry uses INDEPENDENCE mode instead, treating the Blueprint's own Dirichlet-function
  transfer probe as self-contained. All other fields (requires `math.meas.simple-function`,
  unlocks `math.meas.convergence-theorems`/`math.meas.lp-space`, cross_links `math.real.
  riemann-integral`, expert/apply, mastery_threshold 0.85, estimated_hours 7) matched exactly.

## Version History
- 2026-09-19 (Batch 115): authored. First entry this batch, completing `math.meas`'s core
  integration-building-block chain (sigma-algebra → measure → measurable-function →
  simple-function → lebesgue-integral). Companion batch concept: `math.prob.discrete-rv`.
