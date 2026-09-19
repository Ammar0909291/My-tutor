# math.prob.law-of-unconscious

## Identity
- **KG id**: `math.prob.law-of-unconscious`
- **Domain**: math.prob
- **Requires**: `math.prob.expected-value`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
State the Law of the Unconscious Statistician (LOTUS): $E[g(X)]=\sum_xg(x)f_X(x)$ (discrete) or
$\int g(x)f_X(x)\,dx$ (continuous), for any function $g$; apply LOTUS to compute $E[X^2]$,
$E[1/X]$, $E[e^{tX}]$, and other transformed expectations WITHOUT first finding the distribution
of $g(X)$; and explain why LOTUS is "unconscious" — it lets you forget that finding $Y=g(X)$'s own
distribution was ever a step to consider.

## Core Understanding
LOTUS SKIPS FINDING THE DISTRIBUTION OF $Y=g(X)$ ENTIRELY — DIRECTLY USING $X$'S OWN DISTRIBUTION:
for $X\sim\text{Uniform}\{1,\ldots,6\}$ (a die), computing $E[X^2]$ two ways: the HARD route finds
$Y=X^2$'s distribution first, then $E[Y]=\sum yP(Y=y)=(1+4+9+16+25+36)/6=91/6$. LOTUS skips step
one entirely: $E[X^2]=\sum x^2P(X=x)=$ the SAME sum, $91/6$ — computed directly from $X$'s own
PMF, never touching $P(X^2=y)$ at all. "Unconscious" means forgetting that finding $Y$'s
distribution was ever a required step.

$E[g(X)]\ne g(E[X])$ IN GENERAL — ONLY LINEAR $g$ PRESERVES THIS EQUALITY: for
$X\sim\text{Exponential}(\lambda)$, $E[X]=1/\lambda$. Computing $E[X^2]$ via LOTUS:
$\int_0^\infty x^2\lambda e^{-\lambda x}\,dx=2/\lambda^2$ (by parts twice) — NOT $(1/\lambda)^2=
1/\lambda^2$. The gap is exactly $\text{Var}(X)=E[X^2]-(E[X])^2=2/\lambda^2-1/\lambda^2=
1/\lambda^2$. This equality holds ONLY for linear $g(x)=ax+b$ (where $E[aX+b]=aE[X]+b$ is
genuinely valid); for nonlinear $g$, Jensen's inequality governs the direction of the gap instead
(convex $g$: $E[g(X)]\ge g(E[X])$; concave: $\le$).

LOTUS WORKS FOR ANY MEASURABLE $g$ — NEVER REQUIRING MONOTONICITY OR INVERTIBILITY: unlike the
change-of-variable theorem for densities (which genuinely requires $g$ monotone or piecewise
monotone to derive $f_Y$), LOTUS's sum or integral $\sum g(x)f_X(x)$ makes sense for ANY function
$g$ — monotone, non-monotone, even non-invertible. LOTUS bypasses the change-of-variable machinery
entirely, precisely because it never needs $f_Y$ in the first place.

## Mental Models
- **"LOTUS lets you weight g(x) by X's own probabilities directly — you never have to ask what
  distribution g(X) follows."**
- **"Only linear transformations pass straight through expectation — anything curved (squaring,
  exponentiating, inverting) needs the full weighted sum, not a shortcut plug-in."**

## Why Students Fail

### MC-1: E[g(X)]=g(E[X])
- **Surface form**: computes $E[X^2]=(E[X])^2$, $E[e^X]=e^{E[X]}$, $E[1/X]=1/E[X]$, conflating
  expectation with direct function evaluation.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — linearity of
  expectation, $E[aX+b]=aE[X]+b$, IS correct, and students extend it incorrectly to nonlinear
  $g$).
- **Repair**: re-compute $E[X^2]$ via LOTUS directly and compare against $(E[X])^2$, isolating the
  variance gap.

### MC-2: LOTUS-REQUIRES-KNOWING-DISTRIBUTION-OF-Y
- **Surface form**: believes computing $f_Y$ (the distribution of $Y=g(X)$) is a required step
  before applying LOTUS.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the "proper"
  change-of-variable derivation of $E[Y]$ finds $f_Y$ first, and students who learn that method
  first assume it's always necessary).
- **Repair**: re-verify the die example computes $E[X^2]$ with zero reference to $P(X^2=y)$
  anywhere.

### MC-3: LOTUS-ONLY-WORKS-FOR-MONOTONE-g
- **Surface form**: believes LOTUS requires $g$ to be invertible or monotone.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the
  change-of-variable theorem for densities DOES require monotonicity, and this requirement gets
  incorrectly attributed to LOTUS too).
- **Repair**: re-anchor on LOTUS's sum/integral making sense for any measurable $g$, monotone or
  not.

## Misconceptions

### MC-1: E[g(X)]=g(E[X])
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: LOTUS-REQUIRES-KNOWING-DISTRIBUTION-OF-Y
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: LOTUS-ONLY-WORKS-FOR-MONOTONE-g
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"LOTUS is like weighing every possible outcome of X by g's value there, all at once — you
  never need to first sort those outcomes into g(X)'s own buckets."**
- **Anti-analogy**: expectation is NOT a function you can just plug the mean into — $E[g(X)]$
  requires weighting $g$ across the ENTIRE distribution, never a single point evaluation at
  $E[X]$.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Exponential distribution's $E[X^2]=2/\lambda^2\ne
  (E[X])^2=1/\lambda^2$, isolating the variance gap.
- **Demonstration 2 (targets MC-2)**: the die example's $E[X^2]=91/6$ computed with zero
  reference to $P(X^2=y)$.
- **Demonstration 3 (targets MC-3)**: LOTUS applied directly to a non-monotone $g$ (e.g.
  $g(x)=x^2$ on a symmetric domain), with no monotonicity check required.

## Discovery Questions
1. "If X~Exponential(λ) with E[X]=1/λ, is E[X²] equal to (1/λ)²?"
2. "Do you need to find the distribution of Y=g(X) before computing E[g(X)] via LOTUS?"
3. "Does LOTUS require g to be invertible or monotone, the way the change-of-variable theorem for
   densities does?"

## Teaching Sequence
1. **Representation shift**: the die example's two routes to $E[X^2]$, working the hard route
   versus LOTUS side by side, isolating MC-2.
2. **Conflict evidence**: the Exponential distribution's $E[X^2]$-versus-$(E[X])^2$ gap, isolating
   MC-1.
3. **Conceptual anchor**: LOTUS applied to a non-monotone function directly, isolating MC-3.
4. **Mastery gate**: require a correct LOTUS computation for a new $g$ and distribution, a correct
   explanation of why $E[g(X)]\ne g(E[X])$ in general, and a correct explanation of why LOTUS
   needs no monotonicity, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $E[g(X)]$ computed as $g(E[X])$ for a nonlinear $g$.
- Never accept a claim that the distribution of $Y=g(X)$ must be found before applying LOTUS.
- Never accept a claim that LOTUS requires $g$ to be monotone or invertible.

## Voice Teaching Notes
- Say "is that plugging the mean into g, or actually weighting g across the whole distribution?"
  whenever $E[g(X)]$ is computed.
- When LOTUS is applied, ask "did you need to find g(X)'s own distribution first, or did you skip
  straight to X's distribution?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies LOTUS to compute $E[X^2]$ for a new
  distribution.
- **Rung 2 (application)**: learner correctly explains why $E[g(X)]\ne g(E[X])$ for a specific
  nonlinear $g$, citing the variance gap or Jensen's inequality.
- **Rung 3 (transfer)**: learner correctly applies LOTUS to derive a moment generating function
  and extracts moments from it via differentiation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute $E[X^2]$ via LOTUS and compare directly against $(E[X])^2$.
- If MC-2 recurs, re-verify the die example needs no reference to $g(X)$'s own distribution.
- If MC-3 recurs, re-apply LOTUS to a non-monotone function directly.

## Memory Hooks
- "LOTUS skips finding g(X)'s distribution entirely — weight g(x) by X's own probabilities."
- "Only linear g passes through expectation — E[g(X)] ≠ g(E[X]) otherwise."
- "LOTUS works for any measurable g — no monotonicity required, unlike the change-of-variable
  theorem."

## Transfer Connections
- `math.prob.expected-value` (already authored, this campaign, Batch 122): supplies $E[X]$
  directly and linearity of expectation, the boundary case where $E[g(X)]=g(E[X])$ genuinely
  holds.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.law-of-unconscious.md`, reused by
  reference for its die-example two-route comparison, its Exponential-distribution variance-gap
  demonstration, and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, deriving the Normal distribution's
  moment generating function via LOTUS and extracting moments through differentiation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.expected-value`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.9, estimated_hours 2) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 138): authored. First entry this batch. Companion batch concept:
  `math.real.implicit-function-theorem`.
