# math.real.series-rigorous

## Identity
- **KG id**: `math.real.series-rigorous`
- **Domain**: math.real
- **Requires**: `math.real.convergence-sequences`, `math.seq.series`
- **Unlocks**: `math.real.absolute-convergence`
- **Cross-links**: `math.seq.comparison-test` (KG-declared and Blueprint-claimed as "not yet
  authored" — correct when written, but NOW actually authored — verified via `ls`; genuine
  cross-link probe used instead, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
State the CAUCHY CRITERION for series ($\sum a_n$ converges iff its partial sums $\{S_n\}$ form a
Cauchy sequence), introducing NO new convergence notion; prove ABSOLUTE convergence
($\sum|a_n|<\infty$) implies (ordinary) convergence via a direct triangle-inequality bound, as a
SUFFICIENT but never necessary condition; and distinguish absolute convergence's
REARRANGEMENT-INVARIANCE from conditional convergence's REARRANGEMENT-SENSITIVITY (the Riemann
Rearrangement Theorem).

## Core Understanding
SERIES CONVERGENCE IS CAUCHY-SEQUENCE CONVERGENCE OF THE PARTIAL SUMS — NO NEW MACHINERY: for
$\sum_{n=1}^\infty\frac1{2^n}$: $S_n=1-\frac1{2^n}$, and for $m>n$: $|S_m-S_n|<\frac1{2^n}$. Given
$\varepsilon>0$, choosing $N=\lceil\log_2(1/\varepsilon)\rceil$ gives $|S_m-S_n|<\varepsilon$ for
$m>n>N$ — confirming $\{S_n\}$ is Cauchy using EXACTLY the same $\varepsilon$-$N$ reasoning
already mastered for ordinary sequences. The Cauchy criterion for series is a direct application
of `math.real.convergence-sequences`'s own Cauchy $\Leftrightarrow$ convergent equivalence to one
specific sequence — the partial sums — never a separate theory.

ABSOLUTE CONVERGENCE IMPLIES CONVERGENCE, BUT NEVER THE REVERSE: if $\sum|a_n|$ converges, its
partial sums are Cauchy, so $|\sum_{k=n+1}^ma_k|\le\sum_{k=n+1}^m|a_k|<\varepsilon$ — the ACTUAL
partial sums inherit the Cauchy property via the triangle inequality, so $\sum a_n$ converges too.
But the alternating harmonic series $\sum\frac{(-1)^{n+1}}n=1-\frac12+\frac13-\cdots$ CONVERGES
(to $\ln2$), while $\sum|\frac{(-1)^{n+1}}n|=\sum\frac1n$ (the harmonic series) DIVERGES — a
convergent series that is NOT absolutely convergent, directly refuting the converse.

REARRANGEMENT IS INVARIANT FOR ABSOLUTE CONVERGENCE, DANGEROUSLY SENSITIVE FOR CONDITIONAL
CONVERGENCE: the finite-sum intuition ("reordering never changes a sum") carries over safely to
ABSOLUTELY convergent series — $\sum1/2^n$'s sum stays fixed at 1 under ANY rearrangement. But the
alternating harmonic series's positive terms ($1+\frac13+\frac15+\cdots$) and negative terms
($\frac12+\frac14+\cdots$) EACH diverge to $+\infty$ individually — a fact specific to conditional
convergence — so by the RIEMANN REARRANGEMENT THEOREM, the series can be reordered to converge to
$1$ instead of $\ln2$, to any other target, or to diverge entirely. The finite-sum intuition
genuinely FAILS for conditionally convergent series.

## Mental Models
- **"A series converges exactly when its tail sums shrink to nothing — the identical Cauchy
  machinery, applied to one specific sequence: the partial sums."**
- **"Absolute convergence buys you rearrangement safety; conditional convergence buys you nothing
  of the sort — the Riemann Rearrangement Theorem can send the sum anywhere."**

## Why Students Fail

### MC-1: SERIES-CONVERGENCE-AS-NEW-NOTION
- **Surface form**: believes the Cauchy criterion for series introduces a genuinely new type of
  convergence, distinct from ordinary sequence convergence.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — a
  new-looking criterion stated with new notation ($\sum a_k$ tail sums) obscures that it's the
  same underlying machinery).
- **Repair**: re-walk the direct $\varepsilon$-$N$ verification for $\sum1/2^n$, re-anchoring on
  the identical Cauchy-sequence machinery applied to the partial sums.

### MC-2: CONVERGENCE-ASSUMED-TO-IMPLY-ABSOLUTE-CONVERGENCE
- **Surface form**: believes every convergent series must also be absolutely convergent.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the proven direction (absolute $\Rightarrow$ ordinary) is easy to over-read as a biconditional).
- **Repair**: re-walk the alternating harmonic series's convergent-but-not-absolutely-convergent
  status.

### MC-3: REARRANGEMENT-ASSUMED-UNIVERSALLY-INVARIANT
- **Surface form**: believes every convergent series' sum is unaffected by reordering its terms,
  as with a finite sum.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Moderate severity — the
  finite-sum intuition is deeply ingrained and rarely challenged before this concept).
- **Repair**: re-walk the alternating harmonic series's rearrangement to a different target sum.

## Misconceptions

### MC-1: SERIES-CONVERGENCE-AS-NEW-NOTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: CONVERGENCE-ASSUMED-TO-IMPLY-ABSOLUTE-CONVERGENCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: REARRANGEMENT-ASSUMED-UNIVERSALLY-INVARIANT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A series is Cauchy exactly when its distant tail sums shrink to nothing — no new idea, just
  the ordinary Cauchy test aimed at one particular sequence."**
- **Anti-analogy**: reordering terms is NOT always harmless — for a conditionally convergent
  series, it's a hidden lever that can move the sum to literally any target value.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $\sum1/2^n$'s direct Cauchy verification via
  $N=\lceil\log_2(1/\varepsilon)\rceil$.
- **Demonstration 2 (targets MC-2)**: the alternating harmonic series converges (to $\ln2$) while
  its absolute-value series (the harmonic series) diverges.
- **Demonstration 3 (targets MC-3)**: the alternating harmonic series's positive/negative terms
  each diverging individually, enabling rearrangement to any target via the Riemann Rearrangement
  Theorem — contrasted with $\sum1/2^n$'s rearrangement-invariant sum.

## Discovery Questions
1. "Is the Cauchy criterion for series a genuinely new type of convergence, distinct from ordinary
   sequence convergence?"
2. "Does a convergent series always converge absolutely as well?"
3. "Can a convergent series' terms always be reordered without changing the sum, just as with a
   finite sum?"

## Teaching Sequence
1. **Representation shift**: state the Cauchy criterion directly, working Demonstration 1's
   $\varepsilon$-$N$ verification, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's alternating-harmonic-series counterexample, isolating
   MC-2 by requiring the converse's failure acknowledged.
3. **Contrast pair**: Demonstration 3's rearrangement dichotomy, isolating MC-3 by requiring the
   conditional-convergence exception stated precisely.
4. **Mastery gate**: require a correct Cauchy-criterion verification for a new series, a correct
   classification of a new series as absolutely convergent, conditionally convergent, or
   divergent, and a correct explanation of why rearrangement-invariance fails for conditional
   convergence, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept the Cauchy criterion for series treated as a genuinely new convergence notion.
- Never accept "convergent implies absolutely convergent" stated without the alternating-
  harmonic-series counterexample addressed.
- Never accept rearrangement assumed harmless for every convergent series.

## Voice Teaching Notes
- Say "is that a new kind of convergence, or the same Cauchy test applied to the partial sums?"
  whenever the Cauchy criterion for series is introduced.
- When rearrangement is discussed, ask "is this series absolutely or only conditionally
  convergent — does that change anything?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies the Cauchy criterion directly for a new
  series.
- **Rung 2 (application)**: learner correctly classifies a new series as absolutely convergent,
  conditionally convergent, or divergent.
- **Rung 3 (transfer)**: learner correctly explains why a conditionally convergent series
  reordered to a different value indicates no calculation error, citing the Riemann Rearrangement
  Theorem.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct $\varepsilon$-$N$ verification for $\sum1/2^n$.
- If MC-2 recurs, re-walk the alternating harmonic series's status.
- If MC-3 recurs, re-walk the rearrangement-to-a-different-target demonstration.

## Memory Hooks
- "Series convergence is Cauchy-sequence convergence of the partial sums — nothing new."
- "Absolute convergence implies convergence — never the reverse."
- "Rearrangement is safe for absolute convergence, dangerous for conditional convergence."

## Transfer Connections
- `math.real.convergence-sequences` (already authored, this campaign, Batch 112): supplies the
  $\varepsilon$-$N$ definition and Cauchy $\Leftrightarrow$ convergent equivalence this concept
  applies directly to partial sums.
- `math.seq.series` (already authored, certified domain): supplies the partial-sum convergence
  definition this concept restates via the Cauchy criterion.
- `math.seq.comparison-test` (already authored, certified domain): the GENUINE cross-link
  target — its Direct/Limit Comparison Tests provide the practical term-by-term bounding technique
  this concept's absolute-convergence sufficiency argument (the triangle-inequality bound
  $|\sum a_k|\le\sum|a_k|$) directly generalizes.
- `math.real.absolute-convergence` (not yet authored): the KG's declared unlock, extending this
  concept's LO2/LO3 distinction into a full theory of convergence tests.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.series-rigorous.md`, reused by
  reference for its Cauchy-criterion direct verification, its alternating-harmonic-series
  conditional-convergence example, its rearrangement dichotomy, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own probe, examining a perturbation series
  whose conditional convergence permits rearrangement to a genuinely different value, now used as
  a GENUINE cross-link probe against `math.seq.comparison-test`, connecting the comparison test's
  term-by-term bounding technique to this concept's absolute-convergence sufficiency proof (see
  Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (reverse direction, second occurrence
  after Batch 112's `convergence-sequences`)**: the Blueprint's own Component 7 states
  `math.seq.comparison-test` "checked via `ls docs/curriculum/blueprints/`" and confirmed NOT yet
  authored, setting independence mode — correct at the time the Blueprint was written. Verified
  via `ls educational-brain/concepts/mathematics/` that `math.seq.comparison-test` IS now
  authored (part of the certified `math.seq` domain). This entry uses a GENUINE CROSS-LINK PROBE
  instead, directly connecting this concept's triangle-inequality absolute-convergence argument to
  the comparison test's own bounding technique (which the Blueprint's own Component 7 explicitly
  anticipated a "future revision" might add). All other fields (requires `math.real.convergence-
  sequences`/`math.seq.series`, unlocks `math.real.absolute-convergence`, cross_links `math.seq.
  comparison-test`, expert/analyze, mastery_threshold 0.85, estimated_hours 6) matched the live KG
  exactly.

## Version History
- 2026-09-19 (Batch 122): authored. Second entry this batch. Companion batch concept:
  `math.prob.expected-value`.
