# math.seq.comparison-test

## Identity
- **KG id**: `math.seq.comparison-test`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint states
  `ratio-test`, `root-test`, `integral-test`)
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Apply the Direct Comparison Test (DCT) — if $0\le a_n\le b_n$, then $\sum b_n$ convergent implies
$\sum a_n$ convergent, and $\sum a_n$ divergent implies $\sum b_n$ divergent — using the correct
direction only; apply the Limit Comparison Test (LCT) — if $\lim(a_n/b_n)=L$ with $0<L<\infty$,
then $\sum a_n$ and $\sum b_n$ share the same convergence behavior — including the one-sided
partial conclusions available at the $L=0$ and $L=\infty$ boundary cases; and select a benchmark
series (p-series or geometric) that genuinely matches the target series's asymptotic order.

## Core Understanding
`math.seq.series-convergence` establishes the general convergence definition and names the
p-series and geometric series as known reference points. The comparison tests extend this by
letting a series of UNKNOWN convergence behavior be judged AGAINST one of KNOWN behavior.

The Direct Comparison Test states: if $0\le a_n\le b_n$ for all sufficiently large $n$, then
$\sum b_n$ converging forces $\sum a_n$ to converge (a smaller series is "squeezed" beneath a
convergent bound), and $\sum a_n$ diverging forces $\sum b_n$ to diverge (a larger series must
absorb at least as much as a divergent lower bound). Crucially, the REVERSE directions are
INVALID: knowing the smaller series converges says nothing about the larger one (it might still
diverge), and knowing the larger series diverges says nothing about the smaller one (it might
still converge) — only two of the four possible direction/outcome combinations license a
conclusion.

The Limit Comparison Test handles cases where a direct inequality is hard to establish, using the
RATIO $L=\lim_{n\to\infty}(a_n/b_n)$ instead: if $0<L<\infty$, the two series share the identical
fate (both converge or both diverge), since for large $n$, $a_n$ is sandwiched between constant
multiples of $b_n$, and DCT applies to both sandwiching inequalities at once. The boundary cases
$L=0$ and $L=\infty$ give only PARTIAL, one-sided information — $L=0$ means $a_n$ is asymptotically
negligible compared to $b_n$, so a CONVERGENT benchmark forces $a_n$'s series to converge too, but
a divergent benchmark tells you nothing; $L=\infty$ mirrors this in the other direction.

Selecting a good benchmark is itself a skill, not a guess: for a rational or "messy rational"
expression, the benchmark should match the DOMINANT (leading-order) term of the numerator and
denominator — e.g. $(3n+2)/(n^3+5n+1)$ behaves asymptotically like $3n/n^3=3/n^2$, so $\sum1/n^2$
is the natural benchmark. A benchmark of the wrong asymptotic order produces an $L=0$ or
$L=\infty$ boundary case that yields only partial information, rather than the clean, fully
conclusive $0<L<\infty$ result a correctly-matched benchmark gives.

## Mental Models
- **"DCT direction: squeeze DOWN to conclude convergence, or get squeezed OUT to conclude
  divergence — the other two directions prove nothing."**
- **"LCT with a well-matched benchmark gives a clean, fully conclusive answer; a mismatched
  benchmark gives only a partial one."**
- **"Benchmark selection is about matching the DOMINANT term's order, not picking any familiar
  series."**

## Why Students Fail

### MC-1: COMPARISON-WRONG-DIRECTION
- **Surface form**: given $0\le a_n\le b_n$, concluding "$b_n$ diverges implies $a_n$ diverges"
  or "$a_n$ converges implies $b_n$ converges" — reversing the two VALID DCT implications.
- **Frequency band**: Foundational (the Blueprint names this the single most consequential
  misconception — every DCT application otherwise has roughly even odds of going the wrong way).
- **Root cause (Type 1, overgeneralization)**: an intuitive but incorrect symmetry assumption —
  that any true statement about an inequality between two series should hold "in both directions"
  — is applied to a relationship that is genuinely asymmetric.
- **Repair**: use the "leaky bucket inside a full bucket" framing — a full (convergent) bucket
  bounds a leaky (smaller) one, and an overflowing (divergent) leaky bucket forces the full one to
  overflow too, but the reverse claims carry no such guarantee — paired with the explicit
  direction map (which of the four combinations are valid, which are not).

### MC-2: LIMIT-COMPARISON-L-BOUNDARY
- **Surface form**: applying the finite-nonzero LCT conclusion (both series share the same fate)
  directly to the boundary cases $L=0$ or $L=\infty$, rather than recognizing these give only
  one-sided partial information.
- **Frequency band**: High.
- **Root cause (Type 1, overgeneralization)**: the clean, symmetric $0<L<\infty$ rule is the one
  most heavily practiced, so it is over-applied to boundary cases that in fact require different,
  asymmetric reasoning.
- **Repair**: work through a specific $L=0$ case explicitly, showing the one-sided conclusion
  (convergent benchmark forces convergence; divergent benchmark gives no information) rather than
  the full same-fate conclusion.

### MC-3: BENCHMARK-SELECTION-ARBITRARY
- **Surface form**: choosing a benchmark series without verifying it shares the target series's
  asymptotic order, producing an $L=0$ or $L=\infty$ boundary case that yields only partial
  information where a correctly-matched benchmark would have given a clean, conclusive result.
- **Frequency band**: Moderate.
- **Root cause (Type 5, instruction-induced)**: benchmark selection is often demonstrated with
  the correct choice already made, without explicitly teaching the dominant-term-matching
  procedure that produces it.
- **Repair**: explicitly extract the dominant term of a given series' numerator and denominator,
  cancel to the matching leading-order benchmark, and confirm the resulting $L$ lands in
  $(0,\infty)$.

## Misconceptions

### MC-1: COMPARISON-WRONG-DIRECTION
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: LIMIT-COMPARISON-L-BOUNDARY
- **Surface form**: as described above.
- **Frequency band**: High.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: BENCHMARK-SELECTION-ARBITRARY
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A leaky bucket inside a full bucket"**: if the full (bigger) bucket holds a finite amount, so
  must the leaky (smaller) one; if the leaky one overflows, the full one certainly overflows too —
  but a leaky bucket holding a finite amount says nothing about whether the bigger bucket also
  does.
- **Anti-analogy**: comparison is NOT a symmetric "these two series behave alike because one is
  bigger or smaller" claim — only two of the four direction/outcome pairings are valid, and the
  other two prove nothing whatsoever.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: show $\sum1/(n^2+1)$ converges via $1/(n^2+1)<1/n^2$ and
  $\sum1/n^2$ converging (valid direction), then show that knowing $\sum1/n^2$ converges says
  NOTHING about whether the larger $\sum1/n$ converges (it happens to diverge, but not because of
  this comparison).
- **Demonstration 2 (targets MC-2)**: for $\sum\sin(1/n^2)$ compared against the divergent
  $\sum1/n$, compute $L=0$ and show this is genuinely INCONCLUSIVE (not "both diverge"), then
  re-benchmark against the convergent $\sum1/n^2$ to get $L=1$ and a clean conclusion.
- **Demonstration 3 (targets MC-3)**: for $\sum(3n+2)/(n^3+5n+1)$, extract the dominant term
  ($3n/n^3=3/n^2$), select $\sum1/n^2$ as the benchmark, and compute $L=3\in(0,\infty)$ for a
  clean, fully conclusive result.

## Discovery Questions
1. "If $0\le a_n\le b_n$ and you know $\sum a_n$ converges, does that tell you anything at all
   about $\sum b_n$?"
2. "If $L=\lim(a_n/b_n)=0$ and the benchmark $\sum b_n$ diverges, what — if anything — can you
   conclude about $\sum a_n$?"
3. "For $(3n+2)/(n^3+5n+1)$, which term dominates as $n$ grows large, and what benchmark series
   would that suggest?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s named benchmarks (p-series, geometric
   series), framing comparison as judging an unknown series against a known one.
2. **Conflict evidence**: the two invalid DCT directions, shown to genuinely prove nothing via a
   counterexample.
3. **Contrast pair**: a correctly dominant-term-matched benchmark (clean $0<L<\infty$ result)
   versus a mismatched one (an inconclusive $L=0$ or $L=\infty$ boundary case).
4. **Mastery gate**: require applying DCT with the correct direction, applying LCT including
   boundary-case reasoning, and selecting a correctly-matched benchmark.

## Tutor Actions
- Never accept a DCT conclusion without the learner stating which of the two valid directions is
  being used.
- When $L=0$ or $L=\infty$ arises, require the learner to state the one-sided conclusion
  explicitly rather than defaulting to the same-fate rule.
- When a benchmark is proposed, ask the learner to identify the dominant term justifying that
  choice before accepting it.

## Voice Teaching Notes
- Say "squeeze down or squeeze out — the other two directions prove nothing" whenever stating DCT,
  to keep the asymmetry audible.
- When a learner reaches $L=0$ or $L=\infty$, ask "is this the full same-fate rule, or a one-sided
  case?" before accepting their conclusion.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies which DCT direction, if any, applies to
  a given inequality and outcome.
- **Rung 2 (application)**: learner correctly applies LCT with a correctly dominant-term-matched
  benchmark to reach a clean conclusion.
- **Rung 3 (transfer)**: learner correctly reasons through an $L=0$ or $L=\infty$ boundary case,
  stating the one-sided conclusion (or correctly re-benchmarking when the case is inconclusive).

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the leaky-bucket direction-map contrast.
- If MC-2 recurs, re-run the $L=0$ boundary-case reasoning with a concrete series.
- If MC-3 recurs, re-run the dominant-term-extraction procedure explicitly.

## Memory Hooks
- "Squeeze down for convergence, squeeze out for divergence — the reverse directions prove
  nothing."
- "$L=0$ or $L=\infty$: one-sided information only, not the full same-fate rule."
- "Match the dominant term — that's what makes $L$ land in $(0,\infty)$."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the general convergence definition
  and the p-series/geometric-series benchmarks this concept's tests compare against.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.comparison-test.md`, reused by
  reference for its DCT direction map, its LCT dominant-term-matching examples, its $L=0$
  boundary-case walkthrough, and its three-misconception registry (birth types independently
  assigned above where the Blueprint gave no explicit column, using its own severity/trigger
  descriptions as the basis).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe
  ($\sum1/(n^2+\sin^2n)$, requiring benchmark selection and the squeeze theorem to compute $L$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint's
  own Component 7 states `Unlocks: math.seq.ratio-test, math.seq.root-test,
  math.seq.integral-test`, but direct KG query confirms `unlocks: []` for this concept in the live
  KG. This entry's Identity section uses the KG's value; the named forward relationships may still
  hold informally (all three do in fact require `math.seq.series-convergence`, this concept's own
  sibling, per the earlier frontier computation), but are not mirrored in this concept's own
  `unlocks` field.

## Version History
- 2026-09-13 (Batch 66): authored. Unblocked by `math.seq.series-convergence` (Batch 63).
  Companion batch concepts: `math.calc.maclaurin-series`, `math.calc.taylor-remainder`,
  `math.seq.alternating-series`. `math.seq` moves toward **17/21** this batch (both math.seq
  concepts authored).
