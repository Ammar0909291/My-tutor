# math.num.error-analysis

## Identity
- **KG id**: `math.num.error-analysis`
- **Domain**: math.num
- **Requires**: `math.num.floating-point`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Distinguish roundoff error (from floating-point representation) from truncation error (from
stopping an infinite process early) — NEVER conflated as the same thing; recognize a small
relative INPUT error does NOT guarantee a small relative OUTPUT error — the condition number
$\kappa$ can AMPLIFY it dramatically; and recognize backward error analysis is often EASIER than
direct forward-error bounding, NEVER assumed to require inverting the whole computation.

## Core Understanding
ROUNDOFF AND TRUNCATION ARE INDEPENDENT ERROR SOURCES — NEVER THE SAME THING: ROUNDOFF happens at
the arithmetic level — a processor cannot store $\pi$ exactly, so it rounds to the nearest
representable double. TRUNCATION happens at the algorithm level — stopping a Taylor series at
degree 5 instead of infinitely many terms, or stopping Newton's method after 10 iterations. Using
"truncation error" to mean floating-point roundoff (chopping a decimal) is WRONG — these are TWO
completely different sources, produced independently, and must be tracked separately; truncation
error can be REDUCED by taking more terms/iterations, while roundoff error is fixed by the
floating-point system's precision and cannot be reduced without changing precision.

A SMALL RELATIVE INPUT ERROR DOES NOT GUARANTEE A SMALL RELATIVE OUTPUT ERROR — THE CONDITION
NUMBER CAN AMPLIFY IT: a student solves $Ax=b$ with a backward error (residual) of $3\times
10^{-15}$ and reports $\kappa(A)=5\times10^7$. This does NOT mean the solution is accurate to 15
decimal places — the forward error satisfies $\|\tilde x-x\|/\|x\|\le\kappa(A)\cdot\delta$, giving
$5\times10^7\times3\times10^{-15}\approx1.5\times10^{-7}$ — only about 7 significant figures
trustworthy, not 15. Concluding an answer is accurate because the relative error in the input (or
residual) is small, without accounting for ill-conditioning multiplying that error by $\kappa$, is
WRONG — the condition number is the amplification factor that must ALWAYS be checked alongside
the raw error.

BACKWARD ERROR ANALYSIS ASKS A CONCEPTUAL QUESTION, NOT A COMPUTATIONALLY HARDER ONE — NEVER
REQUIRING INVERSION OF THE ALGORITHM: backward error analysis asks "what NEARBY problem does my
algorithm solve EXACTLY?" For Gaussian elimination solving $Ax=b$, the computed $\tilde x$ is the
EXACT solution to $(A+\Delta A)\tilde x=b$ where $\|\Delta A\|\le O(nu)\|A\|$ (Wilkinson's
theorem, proved once and applied to every run) — computable as the normalized residual
$\|A\tilde x-b\|/(\|A\|\cdot\|\tilde x\|)$, requiring ONLY the computed $\tilde x$, $A$, and $b$ —
NEVER the exact solution. Avoiding backward error analysis because it seems to require "running
the algorithm in reverse" is WRONG — for many algorithms the backward error has a simple closed
form and is USUALLY EASIER to compute than bounding the forward error directly.

## Mental Models
- **"Roundoff lives at the storage level; truncation lives at the algorithm level — two
  independent leaks, never one."**
- **"A tiny residual under a huge condition number is still a big forward error — always check
  both, never the residual alone."**
- **"Backward error asks 'what problem did I actually solve exactly?' — often a simple question,
  never requiring you to invert the whole computation."**

## Why Students Fail

### MC-1: TRUNCATION-IS-ROUNDING
- **Surface form**: uses "truncation error" to mean floating-point roundoff (chopping a decimal),
  conflating two distinct error sources.
- **Birth type**: language contamination (Blueprint's own declared birth type — "truncate"
  appears in both "truncate a decimal" and "truncate a Taylor series"; students apply the more
  familiar arithmetic meaning).
- **Repair**: re-derive the sin(x) Taylor-series truncation error separately from the stored
  value's independent roundoff error.

### MC-2: SMALL-RELATIVE-ERROR-MEANS-ACCURATE
- **Surface form**: concludes an answer is accurate because the relative error in the input is
  small; does not account for ill-conditioning multiplying that input error by $\kappa$.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — error propagation is
  introduced via $|\Delta f|\approx|f'||\Delta x|$; $\kappa$'s amplification role is treated as a
  separate advanced topic, not integrated into the initial mental model).
- **Repair**: re-demonstrate the Hilbert-matrix example, showing $\kappa\cdot u$ amplifying a
  tiny input error into a large forward error.

### MC-3: BACKWARD-ERROR-IS-HARDER-TO-COMPUTE
- **Surface form**: avoids backward error analysis, believing it requires inverting the
  computation; does not realize the backward error has a simple closed form for many algorithms.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — "finding what problem
  the algorithm solved exactly" sounds like running the algorithm in reverse; students
  over-interpret this as requiring inversion of a complex chain of operations).
- **Repair**: re-compute the backward error as the simple normalized residual, using only
  $\tilde x$, $A$, and $b$.

## Misconceptions

### MC-1: TRUNCATION-IS-ROUNDING
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-2: SMALL-RELATIVE-ERROR-MEANS-ACCURATE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: BACKWARD-ERROR-IS-HARDER-TO-COMPUTE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Roundoff and truncation are two separate leaks in the same pipe — plugging one never fixes
  the other."**
- **Anti-analogy**: a tiny residual isn't a certificate of accuracy — under a magnifying glass
  (condition number) of ×10¹⁰, a residual of 10⁻¹⁵ becomes a forward error of 10⁻⁵, never still
  10⁻¹⁵.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the sin(x) Taylor-truncation versus stored-value-roundoff
  independent-error example.
- **Demonstration 2 (targets MC-2)**: the $\kappa(A)=5\times10^7$-with-$10^{-15}$-residual
  forward-error computation.
- **Demonstration 3 (targets MC-3)**: the Gaussian-elimination backward error as a simple
  normalized residual.

## Discovery Questions
1. "Is truncation error the same thing as floating-point roundoff, or a different source
   entirely?"
2. "If the input's relative error is tiny, does that guarantee the output's relative error is
   tiny too?"
3. "Does computing the backward error require inverting the entire algorithm?"

## Teaching Sequence
1. **Representation shift**: the four-error-type comparison table, working Demonstration 1,
   isolating MC-1.
2. **Pattern induction**: the condition-number gallery (scalar subtraction, Hilbert matrix),
   isolating MC-2.
3. **Misconception detector**: the residual-versus-forward-error gate question, working
   Demonstration 2, isolating MC-2.
4. **Reused procedure**: the backward-error-as-simple-residual computation, working
   Demonstration 3, isolating MC-3.
5. **Mastery gate**: require correct classification of error types, a correct forward-error bound
   from a residual and condition number, and a correct backward-error computation, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept truncation error and roundoff error conflated as the same source.
- Never accept a small residual alone treated as proof of an accurate solution, without checking
  the condition number.
- Never accept backward error analysis avoided on the assumption it requires inverting the
  algorithm.

## Voice Teaching Notes
- Say "is that error coming from stopping an infinite process early, or from how the number is
  stored?" whenever an error type is classified.
- Ask "what's the condition number here — because a tiny residual under a huge κ is still a big
  forward error?" whenever accuracy is being assessed from a residual alone.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a given error scenario as roundoff or
  truncation.
- **Rung 2 (application)**: learner correctly computes a forward-error bound from a given
  backward error and condition number.
- **Rung 3 (transfer)**: learner correctly diagnoses ill-conditioning near a singularity (e.g.
  $\ln(\sin(x))$ near $x=\pi$) and proposes a range-split strategy.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the Taylor-truncation and storage-roundoff errors as independent
  sources.
- If MC-2 recurs, re-demonstrate the Hilbert-matrix condition-number amplification.
- If MC-3 recurs, re-compute the backward error as a simple normalized residual.

## Memory Hooks
- "Roundoff is storage-level, truncation is algorithm-level — two independent leaks."
- "A tiny residual under a huge κ is still a big forward error — always check both."
- "Backward error is often a simple residual — never assume it requires inverting the algorithm."

## Transfer Connections
- `math.num.floating-point` (already authored, certified domain): supplies the floating-point
  representation this concept's roundoff-error analysis directly builds on.

## Cross-Subject Connections
- Numerical linear algebra: diagnosing whether a linear system's solution is trustworthy via its
  condition number and residual is a standard, practically essential engineering check.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.error-analysis.md`, reused by reference
  for its four-error-type comparison table, its condition-number gallery (scalar subtraction,
  Hilbert matrix), its residual-versus-forward-error gate question, its backward-error-as-simple-
  residual explanation, and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on $f(x)=\ln(\sin(x))$ near
  $x=\pi$, computing $\kappa_f$ and diagnosing roundoff-versus-truncation dominance near the
  singularity.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata (unlocks field) — corrected using live KG**: the Blueprint's
  Component 0 table states "Unlocks: math.num.newtons-method, math.num.numerical-differentiation,
  math.num.numerical-integration, math.num.lu-factorization, math.num.iterative-linear,
  math.num.euler-method." Direct verification against the live KG shows `unlocks: []` for this
  concept — none of those six concepts list `math.num.error-analysis` as a prerequisite in the
  current KG (confirmed independently for `math.num.newtons-method`, whose own `requires` field
  is `['math.num.root-finding', 'math.calc.derivative-definition']`, not this concept). This EB
  file's Identity section uses the live KG's correct value (unlocks: none), not the Blueprint's
  stale claim. All other fields (requires `math.num.floating-point`, cross_links none,
  proficient/analyze, mastery_threshold 0.85, estimated_hours 4) were directly verified against
  the live KG and match exactly.

## Version History
- 2026-09-19 (Batch 217): authored. Second entry this batch. Companion batch concept:
  `math.prob.conditional-expectation`. Blueprint's stale `unlocks` field corrected against live
  KG (see Curriculum Feedback).
