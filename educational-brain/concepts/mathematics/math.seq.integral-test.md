# math.seq.integral-test

## Identity
- **KG id**: `math.seq.integral-test`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`, `math.calc.improper-integrals`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint names
  `math.seq.absolute-convergence`)
- **Cross-links**: `math.calc.improper-integrals` (already authored — genuinely incorporated, see
  Transfer Connections)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 5

## Learning Objective
State the Integral Test conditions (a function continuous, positive, and decreasing on
$[N,\infty)$ with $f(n)=a_n$) and its conclusion ($\sum a_n$ and $\int_N^\infty f(x)\,dx$ either
both converge or both diverge); recognize that the integral's numerical VALUE and the series' SUM
are genuinely different quantities, sharing only convergence behavior; and apply the test to
derive the $p$-series result and to handle logarithmic-denominator series that the $p$-series test
and divergence test cannot resolve.

## Core Understanding
`math.seq.series-convergence` and `math.calc.improper-integrals` each independently establish
convergence for their own object — a series' partial sums, and an integral's limiting area. The
Integral Test links the two: if $f$ is continuous, positive, and DECREASING on $[N,\infty)$ with
$f(n)=a_n$, then $\sum a_n$ and $\int_N^\infty f(x)\,dx$ share the identical convergence verdict —
both converge, or both diverge. This follows from an area-bounding argument: since $f$ is
decreasing, $f(n+1)\le\int_n^{n+1}f(x)\,dx\le f(n)$, and summing this over consecutive intervals
shows the partial sums and the integral are trapped by each other, so one being bounded forces the
other to be bounded too.

**The integral's value and the series' sum are NOT the same number** — this is the single most
important warning attached to the test. $\int_1^\infty\frac{1}{x^2}\,dx=1$, while
$\sum\frac{1}{n^2}=\frac{\pi^2}{6}\approx1.6449$ — both converge, genuinely different values. The
test transfers CONVERGENCE information only, never a numerical value; computing an actual sum
requires entirely separate machinery (a closed-form telescoping argument, a Fourier-series
technique, or a specialized proof like the Basel problem's solution for $\sum1/n^2$).

The test's primary payoff is DERIVING the $p$-series result rather than merely asserting it:
for $f(x)=1/x^p$ ($p>0$, continuous/positive/decreasing on $[1,\infty)$),
$\int_1^\infty x^{-p}\,dx$ converges exactly when $p>1$ and diverges when $p\le1$ — reproducing
the familiar $p$-series test as a direct consequence rather than a separately memorized fact. The
test's genuine practical value, however, is reaching series the $p$-series test and divergence test
cannot resolve: $\sum\frac{1}{n\ln n}$ diverges while $\sum\frac{1}{n(\ln n)^2}$ converges — a pair
that a $p$-series or divergence-test approach cannot distinguish, but which the integral test
handles cleanly via the substitution $u=\ln x$, generalizing to $\sum\frac{1}{n(\ln n)^p}$
converging exactly when $p>1$, the identical boundary one logarithmic level deeper.

Two further structural points matter for correct application: MONOTONICITY genuinely matters —
applying the test to a non-decreasing (e.g. oscillating) function invalidates the area-bounding
argument entirely, requiring a different tool (typically comparison) instead; and the STARTING
INDEX $N$ can be chosen freely without affecting whether the series or integral converges —
changing $N$ changes the numerical value of both, but convergence is a property of the TAIL of
a series, unaffected by any finite number of leading terms.

## Mental Models
- **"The integral and the series share convergence — never a value."**
- **"Monotonicity isn't optional — it's what makes the area-bounding argument valid at all."**
- **"Convergence is a tail property — the starting index changes the value, never the verdict."**

## Why Students Fail

### MC-1: INTEGRAL-EQUALS-SERIES-SUM
- **Surface form**: concluding $\sum a_n=\int_N^\infty f(x)\,dx$ — treating the integral's
  computed value as though it were the series' actual sum.
- **Frequency band**: Foundational (the Blueprint's own declared foundational misconception —
  causes the integral's value to be used as a series answer on every application of the test).
- **Root cause (Type 1, overgeneralization)**: the test's own area-bounding proof genuinely relates
  the integral and the partial sums numerically (as bounds, not equalities), and this
  numerical relationship is overgeneralized into an equality.
- **Repair**: contrast $\int_1^\infty1/x^2\,dx=1$ against $\sum1/n^2=\pi^2/6$ directly, side by
  side, for the identical function.

### MC-2: MONOTONE-NOT-REQUIRED
- **Surface form**: applying the integral test to a function that is positive but not eventually
  decreasing, without verifying monotonicity first.
- **Frequency band**: Moderate.
- **Root cause (Type 5, instruction-induced)**: worked examples typically use already-monotone
  functions without explicitly demonstrating the verification step, so the requirement itself is
  under-taught relative to the mechanical area computation.
- **Repair**: present a positive but non-monotone (oscillating) function and show the test's
  area-bounding argument genuinely breaks down, requiring a comparison-based approach instead.

### MC-3: STARTING-INDEX-CHANGES-CONVERGENCE
- **Surface form**: believing that changing the series' or integral's starting index (e.g. from
  $n=1$ to $n=2$) can change whether the series converges or diverges.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: the starting index genuinely changes the numerical
  VALUE of a sum or integral, and this correct observation is overgeneralized to also apply to
  convergence, which it does not.
- **Repair**: explicitly state that convergence is a property of the series' TAIL, and demonstrate
  that removing a single leading term from a divergent series (e.g. the harmonic series) leaves it
  divergent.

## Misconceptions

### MC-1: INTEGRAL-EQUALS-SERIES-SUM
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: MONOTONE-NOT-REQUIRED
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: STARTING-INDEX-CHANGES-CONVERGENCE
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The integral and the series are two different ways of measuring the same growing shape —
  they agree on whether it's finite, but not on its exact size."**
- **Anti-analogy**: the Integral Test is NOT a computational shortcut for finding a series' sum —
  it is a convergence-transfer tool only, entirely silent on numerical value.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute $\int_1^\infty1/x^2\,dx=1$ and state
  $\sum1/n^2=\pi^2/6$ side by side, confirming both converge while differing numerically.
- **Demonstration 2 (targets MC-2)**: show a non-monotone positive function (e.g.
  $(1+\sin x)/x^2$) cannot use the integral test directly, requiring a comparison-based bound
  instead.
- **Demonstration 3 (targets MC-3)**: show $\sum_{n=2}^\infty1/(n\ln n)$ diverges (via
  $u=\ln x$ substitution giving $\ln(\ln t)\to\infty$), and that dropping the $n=2$ term to start
  at $n=3$ leaves the series divergent.

## Discovery Questions
1. "If $\int_1^\infty1/x^2\,dx=1$, does that tell you the exact value of $\sum1/n^2$?"
2. "What would go wrong with the area-bounding argument if $f$ weren't decreasing?"
3. "If a series diverges starting from $n=1$, could starting from $n=1{,}000{,}000$ instead make
   it converge?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.improper-integrals`'s limit definition of an infinite-bound
   integral, framing the Integral Test as linking that machinery to series convergence via
   area-bounding.
2. **Conflict evidence**: the $\int1/x^2\,dx=1$ versus $\sum1/n^2=\pi^2/6$ contrast.
3. **Contrast pair**: a monotone function (test applies) versus a non-monotone one (test fails,
   comparison needed instead).
4. **Mastery gate**: require verifying all three conditions, deriving the $p$-series result via
   the test, and correctly resolving a logarithmic-denominator series.

## Tutor Actions
- Never accept a claimed series sum derived directly from an integral's computed value.
- Before applying the Integral Test, require the learner to explicitly verify continuity,
  positivity, AND monotonicity — not just positivity alone.

## Voice Teaching Notes
- Say "same verdict, different value" whenever relating the integral to the series, to keep the
  distinction audible.
- When a learner skips the monotonicity check, ask "have you confirmed this function is actually
  decreasing, or just positive?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the three Integral Test conditions and its
  shared-convergence (not shared-value) conclusion.
- **Rung 2 (application)**: learner correctly derives the $p$-series result via the Integral Test.
- **Rung 3 (transfer)**: learner correctly resolves a logarithmic-denominator series (e.g.
  $\sum1/(n(\ln n)^p)$) that the $p$-series and divergence tests cannot distinguish.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the integral-value-versus-series-sum contrast.
- If MC-2 recurs, re-run the monotone-versus-non-monotone contrast.
- If MC-3 recurs, re-run the starting-index-invariance demonstration.

## Memory Hooks
- "Same convergence, different value — never confuse the two."
- "Continuous, positive, AND decreasing — all three, or the test doesn't apply."
- "Convergence is a tail property — the starting index never changes the verdict."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the general convergence definition
  this test links to integral convergence.
- `math.calc.improper-integrals` (already authored): supplies the limit definition of an
  infinite-bound integral this test's area-bounding argument directly depends on — this
  cross-link is genuinely incorporated as this concept's mechanical foundation, per the
  Blueprint's own cross-link-probe mode (the target EB entry exists).

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.integral-test.md`, reused by reference
  for its area-bounding proof sketch, its $\int1/x^2$-versus-$\sum1/n^2$ contrast, its
  logarithmic-denominator family derivation, and its three-misconception registry
  (independently birth-type-classified above from the Blueprint's own trigger/description
  language).
- Transfer probe cited by reference: the Blueprint's own cross-link-probe-mode transfer probe
  (applying the Integral Test to $\sum1/(n\ln n)$ using the limit definition of an improper
  integral from `math.calc.improper-integrals`).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint's own
  Component 7 states `Unlocks: math.seq.absolute-convergence`, but direct KG query confirms
  `unlocks: []` for this concept in the live KG. This entry's Identity section uses the KG's
  value.

## Version History
- 2026-09-13 (Batch 67): authored. Unblocked by `math.seq.series-convergence` (Batch 63) and
  `math.calc.improper-integrals` (already authored). Companion batch concepts:
  `math.seq.absolute-convergence`, `math.seq.ratio-test`, `math.seq.root-test`. `math.seq`
  moves toward **19/21** this batch (all 4 math.seq concepts authored).
