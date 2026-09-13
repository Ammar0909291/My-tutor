# math.seq.alternating-series

## Identity
- **KG id**: `math.seq.alternating-series`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (per the live KG — see Curriculum Feedback: the Blueprint states
  0.85)
- **Estimated hours**: 5

## Learning Objective
State the Leibniz alternating series test — $\sum(-1)^na_n$ converges if $\{a_n\}$ is POSITIVE,
DECREASING, and tends to $0$ — recognizing it as a SPECIALIZED tool for the alternating-sign
structure specifically, distinct from `math.seq.series-convergence`'s own general convergence
definition; apply the test by verifying all three conditions, recognizing that missing any one
can invalidate the conclusion; and recognize, at orientation level, that a Leibniz-convergent
series's truncation error is bounded by the first omitted term.

## Core Understanding
`math.seq.series-convergence` establishes the general definition (a series converges if its
partial sums converge) and notes that various specialized tests exist for particular series
shapes. The Leibniz test is one such specialized tool, applicable ONLY to series with the
alternating structure $\sum(-1)^na_n$ (strictly alternating signs): if the underlying sequence
$\{a_n\}$ (ignoring sign) is positive, decreasing, and tends to $0$, convergence is GUARANTEED.
This is a SUFFICIENT, not necessary, condition — a series failing one of these three requirements
might still converge by some other means, just not via this particular test.

All three conditions matter for a genuine structural reason, not merely as a checklist: POSITIVE
ensures $a_n$ itself carries no sign confusion before the alternating factor is applied;
DECREASING ensures each partial sum overshoots the true sum by a progressively SHRINKING amount,
so the partial sums squeeze inward toward a limit rather than oscillating with constant or growing
amplitude; TENDS TO $0$ ensures the oscillation's amplitude itself vanishes in the limit, rather
than settling at some persistent nonzero gap. If the DECREASING or TENDS-TO-ZERO condition fails,
the series may genuinely diverge — most strikingly, if $a_n\not\to0$, the alternating series
diverges outright by the more basic divergence (n-th term) test, which is a stronger conclusion
than merely "this particular test is inconclusive."

Perhaps the most striking demonstration of the Leibniz test's specialized nature: the alternating
harmonic series $\sum(-1)^{n+1}\frac{1}{n}=1-\frac12+\frac13-\cdots$ CONVERGES by this test (since
$\frac1n$ is positive, decreasing, and $\to0$), even though the corresponding series of absolute
values, the ordinary harmonic series $\sum\frac1n$, is famously DIVERGENT — proof that this test
captures something genuinely different from any general convergence criterion applicable to
non-alternating series.

**The error bound (orientation level, full derivation deferred)**: for a series satisfying the
Leibniz conditions, truncating after $N$ terms gives a partial sum $S_N$ whose distance from the
true sum $S$ is bounded by $a_{N+1}$ — the size of the first OMITTED term. This follows because
the partial sums alternately overshoot and undershoot $S$, each time by a smaller amount, so the
gap remaining after stopping is no larger than the very next correction that would be applied.

## Mental Models
- **"The Leibniz test is a specialized shortcut for alternating series — not the general
  convergence definition restated."**
- **"Missing even one of the three conditions can mean genuine divergence, not just 'this test
  doesn't apply.'"**
- **"The next omitted term alone already bounds how far off a truncated sum can be — no extra
  computation needed."**

## Why Students Fail

### MC-1: LEIBNIZ-TEST-ASSUMED-GENERAL-CONVERGENCE-DEFINITION
- **Surface form**: believing the Leibniz test is simply `math.seq.series-convergence`'s general
  partial-sum convergence definition restated, applicable the same way to any series.
- **Frequency band**: Foundational.
- **Root cause (Type 1, overgeneralization)**: the general convergence definition is learned
  first and is genuinely broad, so a newly-introduced specialized test is assimilated into that
  same broad framework rather than recognized as a distinct, narrower tool.
- **Repair**: contrast the alternating harmonic series (converges by the Leibniz test) against the
  ordinary harmonic series of absolute values (diverges), showing the specialized test captures
  something the general framework alone does not.

### MC-2: FAILED-CONDITION-ASSUMED-MERELY-INCONCLUSIVE
- **Surface form**: believing a failed Leibniz condition only means the test itself is
  inconclusive, missing that in the specific "terms not tending to zero" failure mode, divergence
  is actually guaranteed by the more basic divergence test.
- **Frequency band**: High.
- **Root cause (Type 5, instruction-induced)**: sufficient-but-not-necessary conditions are
  typically taught with the blanket caveat "failure means inconclusive," which is broadly true for
  many tests but specifically false for the terms-not-tending-to-zero case here.
- **Repair**: present a concrete series failing the tends-to-zero condition and confirm,
  independently via the divergence test, that it genuinely diverges — not merely that the Leibniz
  test fails to apply.

### MC-3: ERROR-BOUND-ASSUMED-TO-NEED-MANY-EXTRA-TERMS
- **Surface form**: believing that estimating a Leibniz-convergent series's truncation error
  requires computing many additional terms beyond where the learner stopped.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: without a specific tool, estimating error typically
  does require additional exploration, so that general expectation is carried over even into the
  case where a SINGLE additional quantity (the next omitted term) already suffices.
- **Repair**: numerically verify, on a specific series, that the actual error is genuinely bounded
  by the single next omitted term, with no further terms needed.

## Misconceptions

### MC-1: LEIBNIZ-TEST-ASSUMED-GENERAL-CONVERGENCE-DEFINITION
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: FAILED-CONDITION-ASSUMED-MERELY-INCONCLUSIVE
- **Surface form**: as described above.
- **Frequency band**: High.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: ERROR-BOUND-ASSUMED-TO-NEED-MANY-EXTRA-TERMS
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Partial sums squeeze toward the limit like a pendulum settling — each swing smaller than the
  last."**
- **Anti-analogy**: a decreasing-in-absolute-value sequence is NOT automatically an alternating
  series that converges — the alternating SIGN structure and all three Leibniz conditions must
  genuinely hold together, not just the "shrinking" intuition alone.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: verify all three conditions for the alternating harmonic
  series $\sum(-1)^{n+1}\frac1n$ (converges by Leibniz) while noting $\sum\frac1n$ itself
  diverges.
- **Demonstration 2 (targets MC-2)**: for $\sum(-1)^n\frac{n}{n+1}$, show the terms tend to $1$,
  not $0$ — the third condition fails — and confirm independently via the divergence test that
  the series genuinely diverges.
- **Demonstration 3 (targets MC-3)**: for the alternating harmonic series truncated at $N=4$
  ($S_4=\frac{7}{12}\approx0.5833$, true sum $\ln2\approx0.6931$), verify the actual error
  ($\approx0.1098$) is indeed bounded by the next omitted term $a_5=\frac15=0.2$.

## Discovery Questions
1. "The alternating harmonic series converges, but the ordinary harmonic series (all positive
   terms) diverges. What does the alternating sign structure actually change?"
2. "If a series's terms don't tend to zero at all, can it still converge — alternating or not?"
3. "Without knowing the true infinite sum, how far off could your truncated estimate possibly be?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s general convergence definition, framing
   the Leibniz test as one specialized tool among the "various tests" it mentions.
2. **Conflict evidence**: the alternating harmonic series converging while its absolute-value
   counterpart diverges.
3. **Contrast pair**: a series satisfying all three conditions (genuine convergence) versus one
   failing the tends-to-zero condition (genuine divergence, confirmed independently).
4. **Mastery gate**: require verifying all three Leibniz conditions, correctly identifying a
   genuine failure case as divergence (not merely "inconclusive"), and applying the error bound.

## Tutor Actions
- Never accept "the Leibniz test applies" without the learner explicitly verifying all three
  conditions, not just the alternating sign.
- When a Leibniz condition fails because terms don't tend to zero, confirm the resulting
  divergence via the more basic divergence test rather than leaving the conclusion as merely
  "inconclusive."

## Voice Teaching Notes
- Say "positive, decreasing, and tends to zero — all three" as a fixed phrase whenever stating the
  test, to keep the three-condition requirement audible.
- When a learner treats a failed condition as inconclusive, ask "does this specific series's terms
  actually go to zero at all?" before accepting that framing.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states all three Leibniz conditions.
- **Rung 2 (application)**: learner correctly verifies (or identifies a failure of) all three
  conditions for a given series and states the correct conclusion.
- **Rung 3 (transfer)**: learner correctly applies the error bound to determine the accuracy of a
  truncated partial sum without knowing the true infinite sum.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the alternating-versus-ordinary-harmonic-series contrast.
- If MC-2 recurs, re-run the genuine-divergence confirmation for a tends-to-zero failure.
- If MC-3 recurs, re-run the numeric error-bound verification.

## Memory Hooks
- "Positive, decreasing, tends to zero — all three, or the guarantee is off."
- "Terms not tending to zero means genuine divergence — not 'test inconclusive.'"
- "The next omitted term alone bounds the error — nothing more to compute."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the general partial-sum convergence
  definition and the notion of specialized tests this concept's Leibniz test exemplifies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.alternating-series.md`, reused by
  reference for its alternating harmonic series example, its $\frac{n}{n+1}$ genuine-divergence
  example, its numeric error-bound verification, and its three-misconception registry
  (birth-type classifications independently assigned above, since the Blueprint carries severity
  labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an engineer
  approximating $\pi/4$ via the Leibniz series for $\pi$, bounding the truncation error).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint's
  own metadata table states `mastery_threshold: 0.85` (MAMR ⌈0.85×5⌉=5/5), but direct KG query
  confirms `mastery_threshold: 0.75`. This entry's Identity section uses the KG's value.

## Version History
- 2026-09-13 (Batch 66): authored. Unblocked by `math.seq.series-convergence` (Batch 63).
  Companion batch concepts: `math.calc.maclaurin-series`, `math.calc.taylor-remainder`,
  `math.seq.comparison-test`. `math.seq` moves from **15/21** toward **16/21** this batch.
