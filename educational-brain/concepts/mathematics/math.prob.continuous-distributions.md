# math.prob.continuous-distributions

## Identity
- **KG id**: `math.prob.continuous-distributions`
- **Domain**: math.prob
- **Requires**: `math.prob.continuous-rv`, `math.prob.pdf`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 10

## Learning Objective
State the PDF, CDF, mean, and variance of UNIFORM $U(a,b)$ and EXPONENTIAL $\text{Exp}(\lambda)$;
compute probabilities via density-times-width (never treating the density value itself as a
probability); apply the EXPONENTIAL's MEMORYLESS property $P(X>s+t\mid X>s)=P(X>t)$, contrasting
it with Uniform's genuinely non-memoryless behavior; and identify the Normal distribution by name
and role (Central Limit Theorem) without computing its integrals directly.

## Core Understanding
UNIFORM'S DENSITY VALUE IS NEVER A PROBABILITY — PROBABILITY IS ALWAYS DENSITY TIMES WIDTH: for
$X\sim U(0,4)$, $f(2)=1/4$ is NOT $P(X=2)$ (which is 0, as always for continuous RVs) — it's the
density. $P(1\le X\le2)=(2-1)\times\frac14=\frac14$ genuinely uses the interval's WIDTH. General
formula: $P(c\le X\le d)=\frac{d-c}{b-a}$ for $U(a,b)$ — always multiply density by interval
length, never read the density value as a probability directly.

$\lambda$ IS THE RATE, $1/\lambda$ IS THE MEAN — RECIPROCALS, NEVER THE SAME NUMBER: for
$\text{Exp}(\lambda)$ with $\lambda=3$ (events per minute): $E[X]=1/3$ minute — NOT 3 minutes. A
HIGH rate means a SHORT mean wait; confusing $\lambda$ with $E[X]$ inverts this relationship
entirely. $P(X>t)=e^{-\lambda t}$ (easy exponential-decay form); $\text{Var}(X)=1/\lambda^2$.

THE MEMORYLESS PROPERTY IS EXPONENTIAL'S DEFINING FEATURE — UNIFORM GENUINELY LACKS IT: for
$\text{Exp}(\lambda)$, $P(X>s+t\mid X>s)=P(X>t)$ — having already waited $s$ with no event, the
REMAINING wait is distributed IDENTICALLY to starting fresh; past elapsed time is irrelevant. For
$U(0,T)$: $P(X>s+t\mid X>s)=\frac{T-s-t}{T-s}$, which GENUINELY DEPENDS on $s$ — if a friend
promised arrival in $U(0,30)$ and hasn't shown by minute 20, the remaining wait is now
$U(20,30)$ (truncated), NOT the same as starting fresh. Recomputing this from the full CDF instead
of recognizing the memoryless shortcut wastes effort for Exponential, but for Uniform the direct
computation is the ONLY correct route — there is no shortcut to skip.

## Mental Models
- **"Density times width equals probability — never read a bare density value as a probability
  by itself, for Uniform or any continuous distribution."**
- **"Lambda is the rate; 1/lambda is the wait — a high rate always means a short mean wait,
  because they're reciprocals."**

## Why Students Fail

### MC-1: DENSITY-AS-PROBABILITY
- **Surface form**: treats $f(x)=1/(b-a)$ as the probability of a single point for Uniform,
  writing $P(X=3)=1/(b-a)$ rather than computing interval length times density.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — a
  persistent error carried over from the continuous-rv prerequisite, where density and probability
  are easily conflated).
- **Repair**: re-anchor on $P(X=x)=0$ always, and $P(c\le X\le d)=(d-c)\times f(x)$ for the
  constant Uniform density.

### MC-2: LAMBDA-IS-MEAN
- **Surface form**: uses $\lambda$ as $E[X]$ for $\text{Exp}(\lambda)$ instead of $1/\lambda$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity — "$\lambda$"
  and "the mean" are both single numbers describing the distribution, inviting the wrong one to be
  read off directly).
- **Repair**: re-derive $E[X]=1/\lambda$ directly, using the rate-versus-wait mnemonic.

### MC-3: MEMORYLESS-IGNORED
- **Surface form**: recomputes $P(X>s+t)$ from the full CDF instead of recognizing
  $P(X>s+t\mid X>s)=P(X>t)$ for Exponential.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — the memoryless
  property is often stated as a name-only fact without numeric verification, inviting it to be
  ignored under time pressure).
- **Repair**: re-verify numerically that the shortcut and the full conditional-probability
  computation agree, then re-apply the shortcut directly.

## Misconceptions

### MC-1: DENSITY-AS-PROBABILITY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: LAMBDA-IS-MEAN
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: MEMORYLESS-IGNORED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Exponential waiting has no memory — like a coin that doesn't remember how many times it's
  already been flipped; Uniform waiting genuinely does remember, since the remaining window
  shrinks as time passes."**
- **Anti-analogy**: $\lambda$ is NOT the mean wait — it's the rate; a bus arriving every 4 minutes
  on average has $\lambda=1/4$ (per minute), and the mean wait $E[X]=1/\lambda=4$ minutes recovers
  the intuitive number, but only via the reciprocal.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $X\sim U(0,4)$: $P(X=2)=0$ (always, for continuous RVs);
  $P(1\le X\le2)=(2-1)\times\frac14=\frac14$ genuinely uses interval width.
- **Demonstration 2 (targets MC-2)**: emails at rate $\lambda=4$/hour: mean inter-arrival time
  $E[X]=1/4$ hour = 15 minutes, not 4 hours.
- **Demonstration 3 (targets MC-3)**: $\text{Exp}(\lambda=2)$: $P(X>1.5\mid X>1)=P(X>0.5)=e^{-1}$
  via the memoryless shortcut, verified to match the full conditional-probability computation.

## Discovery Questions
1. "Does $f(x)=1/(b-a)$ represent the probability of $X$ equaling a specific value?"
2. "For $\text{Exp}(\lambda)$, is $E[X]$ equal to $\lambda$, or to $1/\lambda$?"
3. "Does Uniform, like Exponential, have the memoryless property?"

## Teaching Sequence
1. **Analogy bridge**: the discrete-to-continuous density-curve introduction, working
   Demonstration 1's density-versus-probability contrast, isolating MC-1.
2. **Worked example pair**: a full Exponential and Uniform computation (probabilities, mean,
   variance, memoryless application), reinforcing Demonstration 2's rate-mean reciprocal relation,
   isolating MC-2.
3. **Contrast pair**: the Uniform-versus-Exponential properties table and memoryless-versus-non-
   memoryless contrast, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require correct Uniform and Exponential probability/mean/variance
   computations, a correct memoryless-property application for Exponential, and a correct direct
   (non-memoryless) conditional computation for Uniform, at the Blueprint's own stated MAMR of
   5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a Uniform density value $f(x)$ reported as a probability.
- Never accept $\lambda$ used directly as $E[X]$ for an Exponential random variable.
- Never accept the memoryless shortcut applied to a Uniform random variable.

## Voice Teaching Notes
- Say "is that the density, or did you multiply by an interval width?" whenever a Uniform
  probability is computed.
- When Exponential's mean is discussed, ask "is that the rate, or its reciprocal?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Uniform interval probability via
  density times width.
- **Rung 2 (application)**: learner correctly computes an Exponential probability, mean, and
  variance, and applies the memoryless property.
- **Rung 3 (transfer)**: learner correctly justifies choosing Exponential over Uniform for a new
  waiting-time scenario, and correctly computes Uniform's genuinely non-memoryless conditional
  probability directly.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on $P(X=x)=0$ and the density-times-width formula.
- If MC-2 recurs, re-derive $E[X]=1/\lambda$ via the rate-versus-wait mnemonic.
- If MC-3 recurs, re-verify the memoryless shortcut numerically against the full computation.

## Memory Hooks
- "Density times width equals probability — never the density alone."
- "Lambda is the rate; 1/lambda is the wait — reciprocals, always."
- "Exponential forgets the past; Uniform genuinely remembers it."

## Transfer Connections
- `math.prob.continuous-rv` (already authored, this campaign, Batch 118): supplies the
  probability-as-area framework this concept applies to two specific named families.
- `math.prob.pdf` (already authored, this campaign, Batch 119): supplies the PDF validity,
  expectation, and variance machinery this concept applies to Uniform and Exponential.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.continuous-distributions.md`, reused by
  reference for its Uniform/Exponential density-curve analogy, its worked bus/friend-arrival
  examples, its memoryless-versus-non-memoryless contrast table, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, modeling call-center resolution
  times as Exponential, applying the memoryless property, and justifying the choice over Uniform.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.continuous-
  rv`/`math.prob.pdf`, unlocks none, cross_links none, proficient/apply, mastery_threshold 0.9,
  estimated_hours 10) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 121): authored. First entry this batch. Companion batch concept:
  `math.real.pointwise-convergence`.
