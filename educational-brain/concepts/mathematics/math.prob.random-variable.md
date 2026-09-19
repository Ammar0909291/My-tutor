# math.prob.random-variable

## Identity
- **KG id**: `math.prob.random-variable`
- **Domain**: math.prob
- **Requires**: `math.prob.probability-axioms`, `math.func.function-concept`
- **Unlocks**: `math.prob.distribution`, `math.prob.expected-value`
- **Cross-links**: `math.meas.measurable-function` (KG-declared; Blueprint treated cross_links as
  empty under a "not Tier 1" rationale predating that concept's authoring — NOW authored (Batch
  111), used here as a GENUINE cross-link probe instead, see Curriculum Feedback)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define a RANDOM VARIABLE $X$ as a FUNCTION $X:\Omega\to\mathbb R$ assigning a real number to
every outcome — NEVER a fixed number itself; distinguish $X$ (the function) from $X(\omega)$ (a
value) from $P(X=x)$ (a probability); and classify a random variable as DISCRETE (countable
range) versus CONTINUOUS (uncountable range) by the cardinality criterion alone, never by
apparent "size."

## Core Understanding
A RANDOM VARIABLE IS A FUNCTION, NEVER A FIXED NUMBER: for a die roll, $\Omega=\{1,\ldots,6\}$
and $X(\omega)=\omega$ defines $X$ as the RULE mapping every outcome to a number — $X(4)=4$ is a
VALUE, $P(X=4)=P(\{4\})=1/6$ is a PROBABILITY, but $X$ ITSELF is the entire function, never
reducible to any single output. Writing "$X=4$" says nothing about what happens when $\omega=1,2,
3,5,6$ — only "$X:\{1,\ldots,6\}\to\mathbb R,\ X(\omega)=\omega$ for all $\omega$" fully defines
the random variable.

THE EVENT $\{X=x\}$ IS A PREIMAGE, COMPUTED FROM THE FUNCTION, NEVER THE FUNCTION ITSELF: for two
dice with $S(i,j)=i+j$, $\{S=7\}=\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$ — the SET of outcomes
mapping to 7 under $S$ — giving $P(S=7)=6/36=1/6$. The random variable $S$ (the function) and its
DISTRIBUTION (the table of probabilities $P(S=x)$ for each $x$) are genuinely DIFFERENT objects:
$S$ comes first, the distribution is DERIVED by computing $P(\{\omega:S(\omega)=x\})$ for each
$x$ — never the reverse.

DISCRETE VERSUS CONTINUOUS IS DECIDED BY CARDINALITY OF THE RANGE, NEVER BY "SIZE": a die roll's
range $\{1,\ldots,6\}$ is finite hence DISCRETE; the number of heads in infinite flips has range
$\{0,1,2,\ldots\}$, countably infinite, still DISCRETE; a randomly chosen person's height has an
UNCOUNTABLE range (an interval), hence CONTINUOUS — even though $\{0,1,\ldots,10000\}$ is a much
"bigger-looking" set than $[0,1]$, the countable set is discrete and the small interval is
continuous. Countability decides the classification, never apparent magnitude.

## Mental Models
- **"X is the machine that turns outcomes into numbers — X(ω) is one output, P(X=x) is how likely
  that output is, but X itself is the whole machine."**
- **"Discrete versus continuous is a counting question, never a size question — you can list a
  discrete range's values one by one; you genuinely cannot for a continuous one."**

## Why Students Fail

### MC-1: RV-IS-FIXED-VALUE
- **Surface form**: writes "$X=4$" as if $X$ is a constant, treating the random variable like an
  ordinary algebraic variable.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Foundational severity —
  everyday speech says "the random variable X is 4," directly conflating the function with one
  realized value).
- **Repair**: re-derive the full mapping $X(\omega)$ for every outcome, distinguishing $X$ (the
  function) from $X(4)=4$ (a value).

### MC-2: RV-IS-DISTRIBUTION
- **Surface form**: says "X is the probability distribution," conflating the function $X:\Omega
  \to\mathbb R$ with the induced probability measure on $\mathbb R$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Secondary severity — the
  distribution table is often what's actually USED in calculations, making it feel like "the"
  random variable itself).
- **Repair**: re-anchor on the derivation direction — $X$ (the function) comes first; the
  distribution is COMPUTED from it via $P(X=x)$.

### MC-3: DISCRETE-MEANS-SMALL
- **Surface form**: calls a random variable discrete because it has "few" values, or continuous
  because it seems "large" or "complex."
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Secondary severity —
  "discrete" and "continuous" sound like everyday size descriptors rather than formal cardinality
  terms).
- **Repair**: re-anchor on the countability criterion directly, contrasting a large countable set
  against a small uncountable interval.

## Misconceptions

### MC-1: RV-IS-FIXED-VALUE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: RV-IS-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: DISCRETE-MEANS-SMALL
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A random variable is a vending machine: you feed in an outcome, it dispenses a number — the
  machine itself is never any single dispensed number."**
- **Anti-analogy**: a "large-looking" countable set (like $\{0,1,\ldots,10000\}$) is NOT
  continuous, and a "small-looking" uncountable interval (like $[0,1]$) is NOT discrete —
  countability, never apparent size, decides the classification.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $X(1)=1,\ldots,X(6)=6$ for a die roll — the full mapping,
  never a single value, defines $X$.
- **Demonstration 2 (targets MC-2)**: for a fair coin, $X(H)=1,X(T)=0$ is the function; $P(X=0)=
  P(X=1)=0.5$ is the DERIVED distribution — genuinely different objects.
- **Demonstration 3 (targets MC-3)**: $\{0,1,\ldots,10000\}$ (large, countable, DISCRETE) versus
  $[0,1]$ (small, uncountable, CONTINUOUS) — size is irrelevant to the classification.

## Discovery Questions
1. "Does writing 'X = 4' fully define the random variable X for a die roll?"
2. "Is the random variable X the same object as its probability distribution?"
3. "Does a random variable's discreteness depend on how many values it has, or on something
   else?"

## Teaching Sequence
1. **Analogy bridge + representation shift**: the outcome-to-number machine, working
   Demonstration 1's full mapping, isolating MC-1 by requiring $X$ defined for every outcome.
2. **Contrast pair**: Demonstration 2's function-versus-distribution derivation direction,
   isolating MC-2 by requiring $X$ distinguished from $P(X=x)$.
3. **Contrast pair**: Demonstration 3's large-countable-versus-small-uncountable pair, isolating
   MC-3 by requiring the cardinality criterion applied, not apparent size.
4. **Mastery gate**: require a correct full mapping $X(\omega)$ for a new sample space, a correct
   preimage-based event probability computation, and a correct discrete-versus-continuous
   classification for two new scenarios, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept "X = [specific value]" as a complete definition of a random variable.
- Never accept "discrete" or "continuous" justified by apparent size rather than countability.

## Voice Teaching Notes
- Say "is that the whole function X, or just one value X(ω)?" whenever a random variable is
  defined.
- When discrete/continuous is classified, ask "is that decided by countability, or by how big the
  set looks?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes the full mapping $X(\omega)$ for every
  outcome in a new sample space.
- **Rung 2 (application)**: learner correctly computes $P(X=x)$ via the preimage
  $\{\omega:X(\omega)=x\}$ for a new random variable.
- **Rung 3 (transfer)**: learner correctly classifies a new random variable as discrete or
  continuous using the cardinality criterion, and correctly distinguishes $X$ from its derived
  distribution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the full mapping for every outcome.
- If MC-2 recurs, re-anchor on the derivation direction — function first, distribution computed
  from it.
- If MC-3 recurs, re-anchor on the countability criterion via the large-countable/small-
  uncountable contrast.

## Memory Hooks
- "X is the machine, X(ω) is one output, P(X=x) is how likely that output is."
- "The function comes first; the distribution is derived from it, never the reverse."
- "Countability decides discrete versus continuous — never apparent size."

## Transfer Connections
- `math.prob.probability-axioms` (already authored, certified domain): supplies the sample space,
  events, and probability measure this concept's $P(X=x)$ notation is built on.
- `math.func.function-concept` (already authored, certified domain): supplies the domain/
  codomain/rule vocabulary this concept's $X:\Omega\to\mathbb R$ definition directly instantiates.
- `math.meas.measurable-function` (already authored, this campaign, Batch 111): the GENUINE
  cross-link target — supplies the precise MEASURABILITY condition ($X^{-1}(E)$ must be an event
  for every Borel set $E$) that formally completes this concept's own function-based definition,
  directly closing that concept's own Batch 111 transfer probe.
- `math.prob.distribution` (not yet authored): the KG's declared unlock, studying the probability
  measure induced by $X$ on $\mathbb R$.
- `math.prob.expected-value` (not yet authored): the KG's declared unlock, computing
  $E[X]=\sum xP(X=x)$ directly from this concept's probability-of-preimage machinery.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.random-variable.md`, reused by
  reference for its outcome-to-number-machine analogy, its function-versus-value-versus-
  probability distinction, its discrete-versus-continuous cardinality criterion, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: GENUINE cross-link probe against `math.meas.measurable-function` (confirmed
  authored via `ls` this batch) — directly reusing that concept's own preimage-based measurability
  definition ($X^{-1}(E)\in\mathcal F$ for every Borel $E$) to state precisely what additional
  condition, beyond "being a function," formally qualifies $X$ as a random variable, and why this
  condition is automatically satisfied (invisible) for the finite/countable sample spaces this
  concept's own examples used (see Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (SEVENTH occurrence this campaign, second
  in the "went stale as the corpus grew" direction)**: the Blueprint's Component 0 sets P76_MODE
  to Independence with the rationale "math.meas.measurable-function is NOT a Tier 1 concept; treat
  cross_links as empty" — a design decision made when that concept was unauthored. Verified via
  `ls educational-brain/concepts/mathematics/` that `math.meas.measurable-function` IS now
  authored (Batch 111, this same campaign) and its own KG description was updated to read "A
  measurable function X:Ω→ℝ..." — directly naming the cross-link target's own content. This entry
  uses a GENUINE CROSS-LINK PROBE instead, directly closing the loop `measurable-function`'s own
  Batch 111 entry explicitly anticipated ("this campaign's... closing of that exact deferred
  loop"). All other fields (requires `math.prob.probability-axioms`/`math.func.function-concept`,
  unlocks `math.prob.distribution`/`math.prob.expected-value`, cross_links `math.meas.measurable-
  function`, proficient/understand, mastery_threshold 0.9, estimated_hours 4) matched the live KG
  exactly.

## Version History
- 2026-09-19 (Batch 113): authored. Second entry this batch. Companion batch concept:
  `math.meas.measure-zero`.
