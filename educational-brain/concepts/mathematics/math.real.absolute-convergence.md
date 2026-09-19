# math.real.absolute-convergence

## Identity
- **KG id**: `math.real.absolute-convergence`
- **Domain**: math.real
- **Requires**: `math.real.series-rigorous`
- **Unlocks**: none
- **Cross-links**: `math.seq.absolute-convergence` (KG-declared and Blueprint-claimed as "not yet
  authored" — correct when written, but NOW actually authored — verified via `ls`; genuine
  cross-link probe used instead, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define $\sum a_n$ as ABSOLUTELY CONVERGENT iff $\sum|a_n|$ converges; state absolute convergence
IMPLIES ordinary convergence, distinguishing this from its FALSE converse (conditionally
convergent series exist); and state the REARRANGEMENT DICHOTOMY — absolutely convergent series may
be reordered into ANY sequence without changing the sum, while conditionally convergent series can
be reordered to sum to ANY prescribed value (Riemann Rearrangement Theorem).

## Core Understanding
ABSOLUTE CONVERGENCE IS A SEPARATELY-TESTED PROPERTY, DEFINED VIA $\sum|a_n|$: for $\sum
\frac{(-1)^n}{n^2}$: testing $\sum|\frac{(-1)^n}{n^2}|=\sum\frac1{n^2}$ — a $p$-series with $p=2>
1$ — CONVERGES, so the original series is absolutely convergent, confirmed by testing the
absolute-value series directly, never merely inferred from the original series converging.

ABSOLUTE CONVERGENCE IMPLIES CONVERGENCE, BUT THE CONVERSE IS FALSE — CONDITIONALLY CONVERGENT
SERIES EXIST: the alternating harmonic series $\sum\frac{(-1)^{n+1}}n$ converges (to $\ln2$, via
the alternating series test), but $\sum|\frac{(-1)^{n+1}}n|=\sum\frac1n$ (the harmonic series)
DIVERGES — the series converges WITHOUT converging absolutely, exactly a conditionally convergent
series. "The series converges" alone NEVER implies "the series converges absolutely" — these are
genuinely different, separately-verified properties.

REARRANGEMENT IS SAFE FOR ABSOLUTE CONVERGENCE, DANGEROUSLY UNSAFE FOR CONDITIONAL CONVERGENCE:
for $\sum1/n^2$ (absolutely convergent), ANY reordering — summing even-indexed terms first, then
odd, or any other order — gives the SAME sum $\pi^2/6$. For the conditionally convergent
$\sum(-1)^{n+1}/n$, the RIEMANN REARRANGEMENT THEOREM guarantees SOME reordering sums to 100
instead of $\ln2\approx0.693$, another reordering to a different value entirely, another
diverges — a dramatically different, genuinely order-dependent behavior achieved purely by
reordering the SAME set of terms.

## Mental Models
- **"Absolute convergence is the strictly stronger property — it always buys ordinary
  convergence, but ordinary convergence alone never buys absolute convergence back."**
- **"Rearrangement is unambiguous for absolutely convergent series and secretly order-dependent
  for conditionally convergent ones — not a technicality, but the single most consequential
  difference between the two."**

## Why Students Fail

### MC-1: CONVERGENCE-CONFLATED-WITH-ABSOLUTE-CONVERGENCE
- **Surface form**: believes every convergent series is automatically absolutely convergent,
  missing conditionally convergent series.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the proven direction (absolute $\Rightarrow$ ordinary) invites the false converse
  generalization).
- **Repair**: re-walk the alternating harmonic series's explicit divergent absolute-value series
  despite the original converging.

### MC-2: REARRANGEMENT-ASSUMED-ALWAYS-SAFE
- **Surface form**: believes a series' sum is always independent of term order, regardless of
  absolute or conditional convergence.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the finite-sum reordering intuition is deeply ingrained and rarely challenged).
- **Repair**: re-state the Riemann Rearrangement Theorem and the $\pi^2/6$-versus-100 contrast
  directly.

### MC-3: ABSOLUTE-VALUE-SERIES-TEST-SKIPPED-AS-REDUNDANT
- **Surface form**: believes it's unnecessary to separately test $\sum|a_n|$ once $\sum a_n$'s
  convergence is established.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity —
  absolute convergence's definitional dependence on a SEPARATE series is easy to skip once the
  original series' convergence feels "settled").
- **Repair**: re-anchor on the definition — absolute convergence is DEFINED via $\sum|a_n|$ and
  must be tested as its own series.

## Misconceptions

### MC-1: CONVERGENCE-CONFLATED-WITH-ABSOLUTE-CONVERGENCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: REARRANGEMENT-ASSUMED-ALWAYS-SAFE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ABSOLUTE-VALUE-SERIES-TEST-SKIPPED-AS-REDUNDANT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Absolute convergence is a locked, order-independent container — open it in any order, the
  contents sum the same. Conditional convergence is an unlocked box — the order you tip things
  out in genuinely changes the total."**
- **Anti-analogy**: a series converging is NOT by itself evidence it converges absolutely — the
  alternating harmonic series is the standing counterexample.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: $\sum(-1)^n/n^2$: testing $\sum1/n^2$ (a $p$-series,
  $p=2>1$) directly confirms absolute convergence.
- **Demonstration 2 (targets MC-1)**: the alternating harmonic series converges to $\ln2$, but
  its absolute-value series (harmonic series) diverges.
- **Demonstration 3 (targets MC-2)**: $\sum1/n^2$'s sum $\pi^2/6$ is rearrangement-invariant;
  $\sum(-1)^{n+1}/n$ can be rearranged to sum to 100 via the Riemann Rearrangement Theorem.

## Discovery Questions
1. "If a series converges, does that automatically mean it converges absolutely too?"
2. "Is the sum of a series always independent of the order you add its terms?"
3. "Once you know a series converges, is it still necessary to separately test its absolute-value
   series?"

## Teaching Sequence
1. **Representation shift**: state the definition directly, working Demonstration 1's $p$-series
   test, isolating MC-3 by requiring the separate test performed.
2. **Representation shift/conflict evidence**: Demonstration 2's alternating-harmonic-series gap,
   isolating MC-1 by requiring the converse's failure acknowledged.
3. **Contrast pair**: Demonstration 3's rearrangement dichotomy, isolating MC-2 by requiring the
   order-dependence of conditional convergence stated precisely.
4. **Mastery gate**: require a correct absolute/conditional/divergent classification for a new
   series, a correct explanation of why absolute convergence implies convergence, and a correct
   application of the rearrangement dichotomy to a new practical scenario, at the Blueprint's own
   stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "convergent implies absolutely convergent" stated without the alternating-harmonic-
  series counterexample addressed.
- Never accept rearrangement assumed safe for a series without first classifying it as absolutely
  or conditionally convergent.

## Voice Teaching Notes
- Say "did you test the absolute-value series separately, or just assume it from the original
  converging?" whenever absolute convergence is claimed.
- When rearrangement is discussed, ask "is this series absolutely or only conditionally
  convergent — does that change the answer?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a new series as absolutely convergent,
  conditionally convergent, or divergent.
- **Rung 2 (application)**: learner correctly explains the Cauchy-criterion argument for why
  absolute convergence implies convergence.
- **Rung 3 (transfer)**: learner correctly explains why power series may be freely rearranged and
  term-by-term differentiated STRICTLY INSIDE their radius of convergence (where convergence is
  absolute), but not necessarily at the boundary (where convergence may only be conditional).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the alternating harmonic series's explicit gap.
- If MC-2 recurs, re-state the Riemann Rearrangement Theorem and the concrete contrast.
- If MC-3 recurs, re-anchor on the definitional requirement to test $\sum|a_n|$ separately.

## Memory Hooks
- "Absolute convergence is strictly stronger — it always implies ordinary convergence, never the
  reverse."
- "Rearrangement is safe only for absolute convergence — conditional convergence can send the sum
  anywhere."
- "Absolute convergence is defined via a separate series — always test it directly, never infer
  it."

## Transfer Connections
- `math.real.series-rigorous` (already authored, this campaign, Batch 122): supplies the
  $\varepsilon$-$N$/Cauchy-criterion framework this concept's absolute-convergence-implies-
  convergence proof is built on directly.
- `math.seq.absolute-convergence` (already authored, certified domain): the GENUINE cross-link
  target — its own two-step classification pipeline (test $\sum|a_n|$ first, then $\sum a_n$
  directly only if that fails) directly formalizes this concept's LO1/LO2 classification
  procedure.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.absolute-convergence.md`, reused by
  reference for its $p$-series absolute-convergence test, its alternating-harmonic-series
  conditional-convergence gap, its $\pi^2/6$-versus-100 rearrangement contrast, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own probe, connecting absolute convergence
  inside a power series' radius of convergence to safe term-by-term rearrangement/differentiation,
  now used as a GENUINE cross-link probe against `math.seq.absolute-convergence`'s own two-step
  classification pipeline (see Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (reverse direction, THIRD occurrence after
  Batches 112 and 122)**: the Blueprint's own Component 7 states `math.seq.absolute-convergence`
  was "checked via `ls docs/curriculum/blueprints/`" and confirmed NOT yet authored — correct at
  the time the Blueprint was written. Verified via `ls educational-brain/concepts/mathematics/`
  that `math.seq.absolute-convergence` IS now authored (part of the certified `math.seq` domain).
  This entry uses a GENUINE CROSS-LINK PROBE instead, directly connecting this concept's
  classification procedure to that concept's own two-step pipeline. All other fields (requires
  `math.real.series-rigorous`, unlocks none, cross_links `math.seq.absolute-convergence`,
  expert/understand, mastery_threshold 0.85, estimated_hours 3) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 123): authored. Second entry this batch. Companion batch concept:
  `math.prob.variance`.
