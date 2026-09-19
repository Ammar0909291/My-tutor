# math.de.fourier-convergence

## Identity
- **KG id**: `math.de.fourier-convergence`
- **Domain**: math.de
- **Requires**: `math.de.fourier-series`, `math.seq.series-convergence`
- **Unlocks**: none
- **Cross-links**: `math.real.pointwise-convergence`
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Recognize Fourier series convergence as `math.seq.series-convergence`'s own partial-sum question
applied to this specific series (never a new, unrelated concept); state Dirichlet's theorem
precisely — converges to $f(x)$ at continuity points, to $\frac{f(x^+)+f(x^-)}{2}$ at jump
discontinuities (never assumed to equal either one-sided limit alone); and recognize the Gibbs
phenomenon's ~9% overshoot near a jump PERSISTS in height as more terms are added (migrating in
location toward the jump, but never shrinking), consistent with pointwise but not uniform
convergence.

## Core Understanding
FOURIER CONVERGENCE IS THE SAME PARTIAL-SUM QUESTION ALREADY ASKED FOR ANY SERIES — NEVER A NEW
CONCEPT: `math.seq.series-convergence` asks whether $S_N=\sum_{n=1}^Na_n\to L$ as $N\to\infty$.
A Fourier series' partial sum $S_N(x)=\frac{a_0}{2}+\sum_{n=1}^N(a_n\cos\frac{n\pi x}{L}+
b_n\sin\frac{n\pi x}{L})$ is EXACTLY this same object, evaluated at a fixed $x$ — asking whether
$S_N(x)\to f(x)$ is the identical partial-sum convergence question, never a fundamentally different
kind of limit requiring new machinery.

AT A JUMP, THE SERIES CONVERGES TO THE AVERAGE OF THE TWO ONE-SIDED LIMITS — NEVER TO EITHER LIMIT
ALONE: for the square wave $f(x)=1$ on $(0,\pi)$, $f(x)=-1$ on $(-\pi,0)$: at $x=0$, $f(0^+)=1$ and
$f(0^-)=-1$. Dirichlet's theorem gives convergence to $\frac{1+(-1)}{2}=0$ — NEITHER the value just
to the right NOR just to the left, but their average. A student assuming the series converges to
$f(0^+)=1$ (matching "the function value nearby") misses that the series has NO way to distinguish
approaching from the right versus the left at the jump itself, and symmetrically averages both.

THE GIBBS OVERSHOOT NEVER SHRINKS IN HEIGHT AS $N\to\infty$ — IT MIGRATES TOWARD THE JUMP: for the
square wave's partial sums near $x=0^+$, each $S_N$ overshoots the target value of $1$ by
approximately $9\%$ (peaking near $\frac{4}{\pi}\int_0^\pi\text{sinc}(u)\,du/2\approx1.179$,
consistently, for EVERY sufficiently large $N$) — the overshoot's LOCATION moves closer to $x=0$ as
$N$ grows, but its HEIGHT stays near $9\%$ indefinitely. This is not a defect that "more terms
fixes" — it is the direct, permanent signature of pointwise (not uniform) convergence at a jump: at
each FIXED $x\ne0$, $S_N(x)\to f(x)$, but the convergence is not uniform across a neighborhood of
the jump, so the overshoot's location merely tracks the jump without vanishing.

## Mental Models
- **"Fourier convergence is not a new kind of limit — it's the exact same partial-sum question
  `math.seq.series-convergence` already asks, just for this specific series."**
- **"At a jump, the series lands exactly halfway between the two one-sided limits — never favoring
  either side."**
- **"The Gibbs overshoot is a permanent ~9% signature of the jump, not a finite-N artifact — it
  moves toward the jump but never shrinks in height."**

## Why Students Fail

### MC-1: FOURIER-CONVERGENCE-ASSUMED-NEW-CONCEPT
- **Surface form**: treats Fourier series convergence as a fundamentally new topic, disconnected
  from the general partial-sum convergence already learned for series.
- **Birth type**: Foundational severity (Blueprint's own declared severity — Fourier series is
  introduced with enough new notation and machinery that its convergence question feels separate
  from ordinary series convergence).
- **Repair**: re-walk the direct identification of $S_N(x)$ as an ordinary partial sum evaluated at
  a fixed point.

### MC-2: JUMP-VALUE-ASSUMED-TO-MATCH-ONE-SIDE
- **Surface form**: believes the series converges at a jump to one of the one-sided limits (often
  whichever matches a nearby sampled value) rather than their average.
- **Birth type**: High severity (Blueprint's own declared severity — "the series converges to the
  function" is the default expectation, and a jump is the one place this needs a precise
  correction).
- **Repair**: re-derive the square wave's convergence to $0$ at $x=0$, the average of $\pm1$.

### MC-3: GIBBS-OVERSHOOT-ASSUMED-TO-SHRINK-WITH-MORE-TERMS
- **Surface form**: believes adding more terms to the partial sum will eventually eliminate the
  overshoot near a jump.
- **Birth type**: Moderate severity (Blueprint's own declared severity — for smooth functions, more
  terms always improve the approximation everywhere, and this intuition is wrongly extended to
  jump discontinuities).
- **Repair**: re-walk the fixed ~9% overshoot height persisting across increasing $N$, contrasted
  with its migrating location.

## Misconceptions

### MC-1: FOURIER-CONVERGENCE-ASSUMED-NEW-CONCEPT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: JUMP-VALUE-ASSUMED-TO-MATCH-ONE-SIDE
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: GIBBS-OVERSHOOT-ASSUMED-TO-SHRINK-WITH-MORE-TERMS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"At a jump, the Fourier series 'splits the difference' — landing exactly halfway between the
  two sides, like a vote that ties and settles on the average."**
- **Anti-analogy**: the Gibbs overshoot is NOT a finite-precision artifact that vanishes with more
  computation — it is a permanent structural feature of approximating a jump with smooth sine and
  cosine waves.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct identification of $S_N(x)$ as an ordinary
  partial sum evaluated at a fixed $x$.
- **Demonstration 2 (targets MC-2)**: the square wave's convergence to $0$ at $x=0$, the average of
  its two one-sided limits $\pm1$.
- **Demonstration 3 (targets MC-3)**: the persistent ~9% Gibbs overshoot across increasing $N$,
  with its migrating location but fixed height.

## Discovery Questions
1. "Is asking whether a Fourier series converges at a point a new kind of question, or the same
   partial-sum convergence question already asked for any series?"
2. "At a jump discontinuity, does the Fourier series converge to the value just to the right, just
   to the left, or their average?"
3. "Does adding more terms to a Fourier partial sum eventually eliminate the overshoot near a jump,
   or does the overshoot persist?"

## Teaching Sequence
1. **Representation shift**: identifying $S_N(x)$ as an ordinary series partial sum, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: Dirichlet's theorem and the jump-average rule, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the persistent Gibbs overshoot, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct statement of Dirichlet's theorem, a correct computation of a
   series' value at a jump as the average of one-sided limits, and a correct explanation of why the
   Gibbs overshoot persists rather than shrinking, at the Blueprint's own stated MAMR.

## Tutor Actions
- Never accept Fourier series convergence treated as unrelated to ordinary series partial-sum
  convergence.
- Never accept a jump-point convergence value stated as one one-sided limit rather than their
  average.
- Never accept the Gibbs overshoot described as vanishing with more terms.

## Voice Teaching Notes
- Say "what is $S_N(x)$, really — isn't it just a partial sum evaluated at this $x$?" whenever
  Fourier convergence is introduced.
- At a jump, ask "what are the two one-sided limits here, and what's their average?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies Fourier convergence as an instance of
  ordinary partial-sum convergence.
- **Rung 2 (application)**: learner correctly computes a Fourier series' value at a jump
  discontinuity as the average of the two one-sided limits.
- **Rung 3 (transfer)**: learner correctly explains the Gibbs phenomenon's persistent overshoot in
  terms of pointwise versus uniform convergence.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the partial-sum identification.
- If MC-2 recurs, re-derive the square wave's jump-average convergence.
- If MC-3 recurs, re-walk the persistent Gibbs overshoot across increasing $N$.

## Memory Hooks
- "Fourier convergence is just partial-sum convergence, evaluated at a point."
- "At a jump, the series lands on the average of the two sides — never either side alone."
- "Gibbs overshoot moves toward the jump but never shrinks — about 9%, forever."

## Transfer Connections
- `math.de.fourier-series` (already authored, this campaign, Batch 163): supplies the series
  itself and its coefficient-computation machinery this concept analyzes the convergence of.
- `math.seq.series-convergence` (already authored, certified domain): supplies the general
  partial-sum convergence framework this concept applies to a specific series.
- `math.real.pointwise-convergence` (already authored): supplies the pointwise-versus-uniform
  distinction this concept's Gibbs-phenomenon discussion directly relies on.

## Cross-Subject Connections
- Signal processing: ringing artifacts near sharp transitions when filtering or reconstructing
  signals (a direct engineering manifestation of the Gibbs phenomenon).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.fourier-convergence.md`, reused by
  reference for its square-wave motivating example throughout all three learning objectives, its
  precise statement of Dirichlet's theorem, and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe to `math.real.pointwise-convergence`,
  connecting the Gibbs phenomenon to the general failure of uniform convergence at a discontinuity.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.fourier-series`/`math.seq.series-convergence`, unlocks none, cross_links
  `math.real.pointwise-convergence`, expert/analyze, mastery_threshold 0.75, estimated_hours 5) was
  directly verified against the live KG and matches exactly. `math.real.pointwise-convergence`'s
  authorship was independently re-verified directly against the EDUCATIONAL-BRAIN corpus (not the
  Blueprints directory) and confirmed genuinely authored — the Blueprint's own claim holds up this
  time, unlike the five prior wrong-corpus discrepancies this campaign has caught.

## Version History
- 2026-09-19 (Batch 164): authored. First entry this batch. Companion batch concept:
  `math.de.fourier-sine-cosine`.
