# math.seq.harmonic-series

## Identity
- **KG id**: `math.seq.harmonic-series`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint states
  `math.seq.comparison-test`/`math.seq.absolute-convergence`)
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
Prove that $\sum 1/n$ diverges via Oresme's grouping argument ($S_{2^k}>1+k/2\to\infty$),
explain why the Divergence Test is inconclusive here (necessary, not sufficient), and articulate
that the harmonic series is the exact $p=1$ watershed of the $p$-series family — diverging, but
so slowly (like $\ln n$) that the divergence is easy to mistake for eventual stabilization.

## Core Understanding
`math.seq.series-convergence` and `math.seq.divergence-test` already established that
$a_n\to0$ is NECESSARY but not SUFFICIENT for $\sum a_n$ to converge. The harmonic series
$\sum 1/n$ is the canonical, permanent counterexample proving this distinction matters: its terms
shrink to zero, yet the series diverges — proven directly, not merely asserted, via **Oresme's
grouping argument** (14th century). Group the series by powers of 2:
$1+(1/2)+(1/3+1/4)+(1/5+1/6+1/7+1/8)+\cdots$. Block $k$ has $2^{k-1}$ terms, each at least as
large as $1/2^k$ (the smallest term in the block), so block $k$ contributes at least
$2^{k-1}\times1/2^k=1/2$ — EVERY block, regardless of how far out it is, contributes at least
$1/2$. Formally, $S_{2^k}>1+k/2$ for all $k\ge1$, and since $1+k/2\to\infty$ as $k\to\infty$, the
partial sums are unbounded: $\sum 1/n$ **diverges**.

The partial sums $H_n=\sum_{i=1}^n 1/i$ grow at a precise, very slow rate: $H_n\approx\ln n+
\gamma$, where $\gamma\approx0.5772$ is the Euler–Mascheroni constant. This growth is genuinely
UNBOUNDED — it eventually crosses every finite threshold — but astronomically slowly: reaching
$H_n=100$ requires roughly $n\approx e^{99.42}\approx2\times10^{43}$ terms, far beyond what any
physical computation could ever sum. "Slow growth" is NOT the same claim as "eventual
convergence" — logarithmic growth is still unbounded growth, just at an imperceptible pace.

The harmonic series is also the exact BOUNDARY of the $p$-series family, $\sum 1/n^p$, which
converges if and only if $p>1$. At $p=1$ (harmonic), each block's contribution stays fixed at
$\ge1/2$ forever — enough to diverge, but only just. At $p=1+\varepsilon$ for any $\varepsilon>0$,
the block sums instead form a convergent geometric-type series (ratio $2^{-\varepsilon}<1$),
while at $p=1-\varepsilon$ the blocks grow even faster than at $p=1$. The harmonic series sits at
the precise knife-edge where this balance fails on the divergence side — the slowest possible
divergence, since anything decaying even a little faster (any $p>1$) converges.

## Mental Models
- **"Every block of doubling size contributes at least $1/2$ — forever — so the total grows
  without bound."**
- **"Slow growth is still unbounded growth — logarithmic divergence is divergence."**
- **"$p=1$ is the exact knife-edge: anything shrinking even slightly faster converges."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: the identical mechanism already documented as
  `math.seq.series-convergence`'s own MC-1 and `math.seq.divergence-test`'s own MC-1 —
  "$a_n\to0$, so the series must converge" — recurring here as the almost-universal first
  instinct on the harmonic series specifically, per the Blueprint's own note.
- **MC-2 (Type 2, perceptual intuition)**: the identical mechanism already documented as
  `math.seq.divergence-test`'s own MC-3 (HARMONIC-CONVERGES-SLOWLY) — the visually sluggish
  growth of $H_n$ perceptually suggesting eventual stabilization, recurring here with the
  additional numeric detail of the Euler–Mascheroni approximation.
- **MC-3 (Type 3, language contamination)**: a mechanism closely related to
  `math.seq.divergence-test`'s own MC-2 (TERM-LIMIT-EQUALS-PARTIAL-SUM-LIMIT) — the shared
  vocabulary around "the $n$-th term" and "the sum so far" blurring the genuinely different
  objects $1/n$ (shrinking) and $H_n$ (growing).

## Misconceptions

### MC-1: HARMONIC-CONVERGES-BECAUSE-TERMS-VANISH
- **Surface form**: "$1/n\to0$, so $\sum1/n$ converges" — applying the Divergence Test in the
  invalid reverse direction specifically to the harmonic series.
- **Frequency band**: Foundational — the Blueprint's own note calls this "nearly universal," the
  most common first instinct on this concept.
- **Root cause (Type 1)**: as described above, the identical mechanism recurring from
  `series-convergence` and `divergence-test`.
- **Repair**: present Oresme's grouping proof directly — every block contributes at least $1/2$
  forever, so $S_{2^k}>1+k/2\to\infty$ — a direct, constructive proof of divergence that requires
  no appeal to the (inconclusive) Divergence Test at all.

### MC-2: HARMONIC-CONVERGES-SLOWLY-TO-FINITE-LIMIT
- **Surface form**: observing that $H_n$ grows very slowly and concluding it must eventually
  stabilize at a finite value.
- **Frequency band**: High.
- **Root cause (Type 2)**: the identical mechanism as `divergence-test`'s own MC-3, recurring
  here.
- **Repair**: show that $H_n$ genuinely crosses every finite threshold given enough terms (e.g.
  $H_n=100$ needs about $2\times10^{43}$ terms) — the growth never stops, it is merely
  imperceptibly slow.

### MC-3: PARTIAL-SUM-GROWS-LIKE-TERM
- **Surface form**: confusing the $n$-th term $1/n$ (which shrinks to 0) with the partial sum
  $H_n$ (which grows like $\ln n$), e.g. estimating $H_{1000}\approx1/1000$.
- **Frequency band**: Moderate.
- **Root cause (Type 3)**: related to `divergence-test`'s own MC-2, the shared "limit"/"sum"
  vocabulary blurring two genuinely different objects.
- **Repair**: compute $H_{1000}\approx7.485$ using $H_n\approx\ln n+\gamma$ and compare directly
  against the tiny $1000$-th term $1/1000=0.001$, making the roughly 7,485-fold difference
  concrete.

## Analogies
- **"A tax that never stops, however small each payment"**: each new term is a smaller and
  smaller payment, but the running total keeps growing without any ceiling — smallness of the
  individual payment says nothing about whether the accumulated total is bounded.
- **Anti-analogy**: the harmonic series' divergence is NOT "eventual convergence in disguise" —
  it is genuine, provable, unbounded growth; its only unusual feature is the RATE, not the fact
  of divergence itself.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: work Oresme's grouping proof directly, computing
  $S_8>2.5$ via the block-sum bound.
- **Demonstration 2 (targets MC-2)**: compute $H_n$ at increasingly large $n$ (10, 1000, $10^6$,
  $e^{100}$), showing the sum genuinely keeps climbing past any fixed threshold.
- **Demonstration 3 (targets MC-3)**: compute $H_{1000}\approx7.485$ and the term
  $1/1000=0.001$ side by side, confirming they differ by roughly 7,485-fold.

## Discovery Questions
1. "If you group the harmonic series' terms into blocks that double in size each time, is there a
   FIXED minimum amount each block must contribute, no matter how far out you go?"
2. "Does 'growing very slowly' mean the same thing as 'never exceeding some fixed value'?"
3. "Is the $1000$th term of the harmonic series the same quantity as the sum of its first 1000
   terms?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s convergence definition, posing the
   naive "terms shrink, so it must converge" reasoning as the trap to be broken.
2. **Representation shift**: Oresme's grouping proof, shifting from individual terms to
   fixed-size blocks.
3. **Pattern induction**: the Euler–Mascheroni approximation $H_n\approx\ln n+\gamma$, building
   intuition for "very slow but unbounded."
4. **Contrast pair**: the harmonic series ($p=1$, diverges) against $p$-series just above and
   below the boundary.
5. **Mastery gate**: require completing the grouping proof, explaining why a slightly larger
   exponent changes convergence, estimating $H_n$ via the approximation formula, and identifying
   errors in a flawed comparison argument.

## Tutor Actions
- Never accept "$1/n\to0$, so it converges" without immediately presenting Oresme's grouping
  counterexample.
- When "slow convergence" language appears, correct it immediately to "slow divergence — it never
  stops growing."
- When a learner reports a term value as if it were the partial sum, ask which quantity they
  actually computed.

## Voice Teaching Notes
- Introduce Oresme's proof as a DRAWING exercise — sketch the blocks doubling in size while the
  minimum term per block halves, so the "these cancel exactly" fact is seen, not just asserted.
- When a learner is surprised by the astronomical term count needed to reach a modest sum, lean
  into that surprise deliberately — it is the strongest available intuition-builder for genuine,
  if imperceptible, divergence.

## Assessment Signals
- **Rung 1 (recognition)**: learner states that $1/n\to0$ does not imply $\sum1/n$ converges,
  citing Oresme's proof.
- **Rung 2 (application)**: learner correctly completes the grouping-proof inequality and
  correctly estimates $H_n$ using the Euler–Mascheroni approximation.
- **Rung 3 (transfer)**: learner correctly explains why $p=1$ is the exact watershed of the
  $p$-series family and correctly identifies errors in a flawed magnitude-comparison argument.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk Oresme's grouping proof step by step with the learner's own numbers.
- If MC-2 recurs, re-present the astronomical-term-count fact for a fresh target threshold.
- If MC-3 recurs, re-compute both the term and the partial sum side by side for a fresh $n$.

## Memory Hooks
- "Every doubling block contributes at least $1/2$ — forever."
- "Slow growth is still unbounded growth."
- "The term shrinks; the partial sum never stops climbing."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the convergence definition this
  concept's counterexample is built against.
- `math.seq.divergence-test` (already authored, Batch 64): shares the IDENTICAL MC-1 mechanism
  (terms-to-zero-implies-convergence) and the IDENTICAL MC-3 mechanism (harmonic-converges-
  slowly), both cross-referenced above — this entry develops the harmonic series' own full proof
  and growth-rate analysis in depth.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.harmonic-series.md`, reused by
  reference for its Oresme grouping proof, its Euler–Mascheroni growth-rate table, its $p$-series
  boundary analysis, and its three-misconception registry (independently birth-type-classified
  above, since the Blueprint carries severity labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (determining all
  $p$ for which $\sum1/n^p$ converges, using the harmonic series as the reference boundary case).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint
  states `Unlocks: math.seq.comparison-test, math.seq.absolute-convergence`, but direct KG query
  confirms `unlocks: []` (empty) for this concept. This entry's Identity section uses the KG's
  value. The Blueprint's named forward relationships remain plausible future teaching
  connections, simply not reflected in the KG's own `unlocks` field.
- Genuine content-overlap recorded (not fixed, intentional depth): this entry's own MC-1 and
  MC-2 are the identical mechanisms as `math.seq.series-convergence`'s own MC-1 and
  `math.seq.divergence-test`'s own MC-1/MC-3, now cross-referenced across all three entries.

## Version History
- 2026-09-13 (Batch 65): authored. Unblocked by `math.seq.series-convergence` (Batch 63).
  Companion batch concepts: `math.calc.taylor-series`, `math.graph.shortest-path`,
  `math.disc.stirling-numbers`. `math.seq` moves from **14/21** toward **15/21** this batch.
