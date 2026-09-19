# math.prob.linearity-expectation

## Identity
- **KG id**: `math.prob.linearity-expectation`
- **Domain**: math.prob
- **Requires**: `math.prob.expected-value`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 2

## Learning Objective
State and apply LINEARITY OF EXPECTATION $E[aX+bY]=aE[X]+bE[Y]$ for ANY random variables (even
DEPENDENT ones) and constants $a,b$ — NEVER requiring independence; use the INDICATOR VARIABLE
technique to compute $E[X]$ for a sum of indicators by decomposing a complex random variable,
sidestepping the joint distribution entirely; and correctly recognize linearity applies ONLY to
linear functions, never $E[f(X)]=f(E[X])$ for general (non-linear) $f$.

## Core Understanding
LINEARITY OF EXPECTATION HOLDS REGARDLESS OF DEPENDENCE — INDEPENDENCE IS NEVER REQUIRED: $E[X+Y]
=E[X]+E[Y]$ ALWAYS, proven directly from $\sum_x\sum_y(x+y)P(X=x,Y=y)=\sum_x\sum_yxP(X=x,Y=y)+
\sum_x\sum_yyP(X=x,Y=y)=E[X]+E[Y]$ — no independence assumption used anywhere in this derivation.
For a coin flip $X$ (1 if heads, 0 if tails) and $Y=1-X$ (perfectly, negatively DEPENDENT on
$X$): $E[X+Y]=E[1]=1=E[X]+E[Y]=\frac12+\frac12$ — linearity holds even for perfectly dependent
variables.

THE INDICATOR-VARIABLE TECHNIQUE SIDESTEPS THE JOINT DISTRIBUTION ENTIRELY: for the hat-check
problem ($n$ people, hats returned randomly, $X$= number who receive their own hat), letting
$X_i=1$ if person $i$ gets their own hat: $E[X_i]=1/n$, so $E[X]=\sum_iE[X_i]=n\cdot\frac1n=1$ —
regardless of $n$, and regardless of whether the $X_i$ are independent (they are NOT). Linearity
never cares about the joint structure; only the individual expectations matter.

LINEARITY IS SPECIFICALLY ABOUT LINEAR COMBINATIONS — $E[f(X)]=f(E[X])$ IS FALSE FOR GENERAL
$f$: $E[aX+b]=aE[X]+b$ holds because $aX+b$ is LINEAR (degree 1). But $E[X^2]\ne(E[X])^2$ in
general — for $X=0$ or $2$ equally likely: $E[X]=1$, $(E[X])^2=1$, but $E[X^2]=(0+4)/2=2\ne1$.
Jensen's inequality captures the direction for convex $f$ (like $x^2$): $E[f(X)]\ge f(E[X])$, with
the gap $E[X^2]-(E[X])^2$ being EXACTLY $\text{Var}(X)\ge0$ — never zero unless $X$ is constant.

## Mental Models
- **"Plus always distributes through E, no matter how tangled the joint dependence — only times
  needs independence."**
- **"Linearity is a property of LINEAR functions specifically — reaching for E[f(X)]=f(E[X)) with
  a nonlinear f is simply the wrong tool."**

## Why Students Fail

### MC-1: LINEARITY-REQUIRES-INDEPENDENCE
- **Surface form**: refuses to apply $E[X+Y]=E[X]+E[Y]$ when $X$ and $Y$ are dependent, believing
  the formula only holds for independent variables.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — $E[XY]=E[X]E[Y]$
  genuinely DOES require independence, and this requirement is overgeneralized to the additive
  rule, which needs no such condition).
- **Repair**: re-derive $E[X+Y]=E[X]+E[Y]$ directly from the joint-distribution sum, showing no
  independence assumption is used anywhere.

### MC-2: E[XY]=E[X]E[Y]-ALWAYS
- **Surface form**: confuses linearity (always true for sums) with the product rule (true only
  when independent), applying the product rule to dependent variables.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — both rules "look
  like expectation distributes," obscuring the genuine + versus × and dependence distinction).
- **Repair**: re-anchor on the memory rule — plus distributes through $E$ always; times distributes
  through $E$ only when independent.

### MC-3: LINEARITY-APPLIES-TO-NONLINEAR-FUNCTIONS
- **Surface form**: believes $E[f(X)]=f(E[X])$ for general $f$ (e.g. $E[X^2]=(E[X])^2$,
  $E[1/X]=1/E[X]$).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — linearity DOES
  give $E[aX+b]=aE[X]+b$, and this is extended incorrectly to non-linear $f$).
- **Repair**: re-derive the concrete counterexample $E[X^2]\ne(E[X])^2$, re-anchoring on Jensen's
  inequality for the correct direction.

## Misconceptions

### MC-1: LINEARITY-REQUIRES-INDEPENDENCE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: E[XY]=E[X]E[Y]-ALWAYS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: LINEARITY-APPLIES-TO-NONLINEAR-FUNCTIONS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Linearity of expectation is a universal accounting rule — sum up individual expected
  contributions regardless of how tangled their joint dependence is; the total never needs to know
  the joint structure."**
- **Anti-analogy**: $E[f(X)]$ is NOT generally $f(E[X])$ — only for linear $f$ does pulling $E$
  inside the function work; for $x^2$, $1/x$, or any nonlinear function, the two quantities
  genuinely differ.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $X$ and $Y=1-X$ (perfectly dependent): $E[X+Y]=1=E[X]+E[Y]$,
  confirmed despite total dependence.
- **Demonstration 2 (targets MC-2/indicator technique)**: the hat-check problem's $E[X]=\sum
  E[X_i]=n\cdot\frac1n=1$, regardless of the (non-independent) joint structure of the $X_i$.
- **Demonstration 3 (targets MC-3)**: $X=0$ or 2 equally likely: $E[X^2]=2\ne1=(E[X])^2$, with the
  gap equal to $\text{Var}(X)=1$.

## Discovery Questions
1. "Does E[X+Y]=E[X]+E[Y] require X and Y to be independent?"
2. "Is E[XY]=E[X]E[Y] always true, the same way E[X+Y]=E[X]+E[Y] is?"
3. "Does E[X²]=(E[X])² for any random variable X?"

## Teaching Sequence
1. **Representation shift**: state linearity directly with its proof sketch, working
   Demonstration 1's dependent-variable verification, isolating MC-1.
2. **Misconception detector**: contrast the additive rule against the product rule (indepedence-
   requiring), isolating MC-2 via the memory rule.
3. **Conceptual gate**: Demonstration 3's nonlinear-function counterexample, isolating MC-3 via
   Jensen's inequality.
4. **Mastery gate**: require a correct linearity application to a dependent-variable scenario, a
   correct indicator-variable decomposition for a combinatorial expectation, and a correct
   rejection of $E[f(X)]=f(E[X])$ for a nonlinear $f$ with the correct Jensen direction stated, at
   the Blueprint's own stated MAMR of 5/5 (⌈0.95×5⌉).

## Tutor Actions
- Never accept linearity of expectation withheld because random variables are dependent.
- Never accept the product rule $E[XY]=E[X]E[Y]$ applied without independence verified.
- Never accept $E[f(X)]=f(E[X])$ claimed for a nonlinear $f$.

## Voice Teaching Notes
- Say "does this rule actually require independence, or is that the product rule you're thinking
  of?" whenever linearity is questioned for dependent variables.
- When a nonlinear function is applied inside E[·], ask "is that linear, or does Jensen's
  inequality apply instead?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies linearity to a sum of dependent random
  variables.
- **Rung 2 (application)**: learner correctly decomposes a combinatorial random variable into
  indicators and computes its expectation via linearity.
- **Rung 3 (transfer)**: learner correctly solves the coupon-collector problem via indicator
  decomposition, explicitly noting independence is irrelevant to the computation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive $E[X+Y]=E[X]+E[Y]$ directly from the joint-distribution sum.
- If MC-2 recurs, re-anchor on the plus-versus-times memory rule.
- If MC-3 recurs, re-derive the $E[X^2]\ne(E[X])^2$ counterexample and Jensen's inequality.

## Memory Hooks
- "Plus distributes through E always — dependence is irrelevant."
- "Times distributes through E only when independent — never assume otherwise."
- "E[f(X)]=f(E[X]) only for linear f — Jensen's inequality governs every other case."

## Transfer Connections
- `math.prob.expected-value` (already authored, this campaign, Batch 122): supplies the $E[X]$
  definition and computation machinery this concept's linearity rule directly generalizes to sums
  of random variables.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.linearity-expectation.md`, reused by
  reference for its dependence-free proof sketch, its hat-check indicator-variable application,
  its nonlinear-function counterexample and Jensen's-inequality connection, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, solving the coupon-collector
  problem via indicator decomposition and computing the expected number of draws for $n=4$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.expected-
  value`, unlocks none, cross_links none, proficient/apply, mastery_threshold 0.95,
  estimated_hours 2) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 124): authored. First entry this batch. Companion batch concept:
  `math.real.metric-space`.
