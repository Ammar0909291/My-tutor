# math.prob.conditional-probability

## Identity
- **KG id**: `math.prob.conditional-probability`
- **Domain**: math.prob
- **Requires**: `math.prob.probability-axioms`
- **Unlocks**: `math.prob.independence`, `math.prob.bayes-theorem`, `math.prob.total-probability`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Compute $P(A|B)=P(A\cap B)/P(B)$ for $P(B)>0$, never omitting the division by $P(B)$; apply the
multiplication rule $P(A\cap B)=P(A|B)\cdot P(B)=P(B|A)\cdot P(A)$; recognize the ASYMMETRY
$P(A|B)\ne P(B|A)$ in general, identifying the condition (the denominator) correctly in each
direction; and verify $P(B)>0$ before computing, since $P(A|B)$ is UNDEFINED when $P(B)=0$.

## Core Understanding
CONDITIONING RESTRICTS THE SAMPLE SPACE, AND THE DIVISION RESCALES IT: reusing
`math.prob.probability-axioms`'s own $P(A\cap B)$ notation directly, $P(A|B)=P(A\cap B)/P(B)$ —
knowing $B$ occurred shrinks the relevant world from $\Omega$ down to $B$, and dividing by $P(B)$
rescales probabilities so $P(B|B)=P(B)/P(B)=1$ (certain, inside the restricted world). Drawing a
card told to be red: before, $P(\text{heart})=13/52=1/4$; after, only 26 red cards remain, 13
hearts among them, giving $P(\text{heart}|\text{red})=13/26=1/2$ — matching the formula
$(13/52)/(26/52)=13/26$ exactly.

THE CONDITION IS ALWAYS THE DENOMINATOR — $P(A|B)\ne P(B|A)$ IN GENERAL: for a fair die,
$A=\{6\}$ ($P(A)=1/6$) and $B=\{\text{even}\}=\{2,4,6\}$ ($P(B)=1/2$), $A\cap B=\{6\}$: $P(A|B)=
(1/6)/(1/2)=1/3$ ("given even, is it 6?") while $P(B|A)=(1/6)/(1/6)=1$ ("given it's 6, is it
even?" — always true). These genuinely DIFFER: the denominator is always the probability of the
event AFTER the "$|$" — never the numerator's own event, and never symmetric by default.

$P(A|B)$ IS UNDEFINED WHEN $P(B)=0$, NEVER COMPUTED BY IGNORING THE ZERO: if $P(B)=0$, event $B$
never occurs, so "given $B$" describes an impossible condition with no probabilistic meaning —
$P(A\cap B)/P(B)$ would require dividing by zero. Verifying $P(B)>0$ is a required first step,
never an optional afterthought, before applying the formula.

## Mental Models
- **"Conditioning shrinks the universe to B, and dividing by P(B) rescales what remains so it
  still sums to 1 — never skip that rescaling step."**
- **"The denominator always belongs to whatever comes after the bar — swap the events, and the
  denominator swaps too, usually changing the answer."**

## Why Students Fail

### MC-1: CONDITIONAL-IS-JOINT
- **Surface form**: writes $P(A|B)=P(A\cap B)$ without dividing by $P(B)$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared FOUNDATIONAL severity
  — "probability of A given B" is read as "probability of A and B," missing the rescaling step
  entirely).
- **Repair**: re-anchor on the counting analogy (a card example), showing the restricted sample
  space forces a division by $P(B)$.

### MC-2: REVERSING-CONDITIONING
- **Surface form**: writes $P(A|B)=P(B|A)$ always, confusing which event is the condition.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity — "given" and
  "of" are treated as symmetric, with no awareness that swapping the condition changes the value).
- **Repair**: re-compute both $P(A|B)$ and $P(B|A)$ side by side on a genuinely asymmetric
  example, confirming they differ.

### MC-3: ZERO-DENOMINATOR-IGNORED
- **Surface form**: computes $P(A|B)$ without verifying $P(B)>0$, dividing by zero without
  flagging it.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — no habit of
  checking the denominator's validity before applying the formula).
- **Repair**: re-anchor on checking $P(B)>0$ as a required first step before any computation.

## Misconceptions

### MC-1: CONDITIONAL-IS-JOINT
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: REVERSING-CONDITIONING
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: ZERO-DENOMINATOR-IGNORED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Conditioning is like moving into a smaller room and re-measuring everything relative to
  that room's own total floor space — never the original building's."**
- **Anti-analogy**: $P(A|B)$ and $P(B|A)$ are NOT interchangeable — asking "given even, is it 6?"
  is a genuinely different question from "given it's 6, is it even?"

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $P(A)=0.3,P(B)=0.5,P(A\cap B)=0.1$: the WRONG answer
  $P(A|B)=0.1$ (forgetting to divide) versus the CORRECT $P(A|B)=0.1/0.5=0.2$.
- **Demonstration 2 (targets MC-2)**: for $A=\{6\},B=\{\text{even}\}$ on a fair die: $P(A|B)=1/3$
  ("given even, is it 6?") while $P(B|A)=1$ ("given it's 6, is it even?" — always true) —
  genuinely different values.
- **Demonstration 3 (targets MC-3)**: $P(B)=0.5>0$ gives a defined $P(A|B)=0.1/0.5=0.2$; $P(B)=0$
  makes $P(A|B)$ UNDEFINED — dividing by zero is never valid, and the condition must be checked
  first.

## Discovery Questions
1. "If $P(A\cap B)=0.1$ and $P(B)=0.5$, is $P(A|B)=0.1$, or does it need another step?"
2. "Is $P(A|B)$ always equal to $P(B|A)$, or could they genuinely differ?"
3. "If $P(B)=0$, can you still compute $P(A|B)$ using the formula?"

## Teaching Sequence
1. **Anchor**: connect to `math.prob.probability-axioms`'s own $P(A\cap B)$ notation, framing
   conditioning as a restriction of the sample space to $B$.
2. **Representation shift**: the card-drawing counting analogy, establishing the rescaling
   discipline from the start.
3. **Conceptual shift**: Demonstration 1's missing-division error, isolating MC-1 by requiring
   the explicit division by $P(B)$.
4. **Contrast pair**: Demonstration 2's asymmetric die example, isolating MC-2 by requiring the
   correct denominator identified for each direction.
5. **Contrast pair**: Demonstration 3's zero-denominator case, isolating MC-3 by requiring
   $P(B)>0$ checked before any computation.
6. **Mastery gate**: require a correctly computed conditional probability, a correctly applied
   multiplication rule, and a correct asymmetry/undefined-case determination, at the Blueprint's
   own stated pass criterion of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept $P(A|B)=P(A\cap B)$ without the division by $P(B)$.
- Never accept a computed $P(A|B)$ without $P(B)>0$ having been checked first.

## Voice Teaching Notes
- Say "did you divide by P(B), or does that answer look like just the intersection?" whenever a
  conditional probability is computed.
- When two conditionals are compared, ask "which event is actually the condition in each one —
  are the denominators the same?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $P(A|B)$ from given $P(A\cap B)$ and
  $P(B)$.
- **Rung 2 (application)**: learner correctly applies the multiplication rule to find $P(A\cap
  B)$ from a conditional probability.
- **Rung 3 (transfer)**: learner correctly computes both $P(A|B)$ and $P(B|A)$ for a NEW
  asymmetric scenario, confirming they differ and correctly checking $P(B)>0$ throughout a
  multi-step draw-without-replacement problem.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the counting analogy showing the restricted sample space.
- If MC-2 recurs, re-compute both directions side by side on an asymmetric example.
- If MC-3 recurs, re-anchor on checking $P(B)>0$ as a required first step.

## Memory Hooks
- "Given B" means divide by P(B) — never just the intersection alone.
- "The bar's right side is always the denominator — swap it, and the answer usually changes."
- "No P(B), no P(A|B) — check the denominator before dividing."

## Transfer Connections
- `math.prob.probability-axioms` (already authored, this campaign): supplies the $P(A\cap B)$
  notation and probability-measure structure this concept's formula is built from directly.
- `math.prob.independence`, `math.prob.bayes-theorem`, `math.prob.total-probability` (not yet
  authored): the KG's declared unlocks, all built directly on this concept's formula and
  multiplication rule.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.conditional-probability.md`, reused by
  reference for its card-drawing restricted-sample-space analogy, its asymmetric die example, its
  zero-denominator contrast, and its three-misconception registry (severity levels and root
  causes both adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  draw-without-replacement chip experiment, its two directional conditionals, their inequality
  (implying non-independence), and the multiplication rule applied to find $P(\text{both red})$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.probability-axioms`, unlocks `math.prob.independence`+`math.prob.bayes-theorem`+
  `math.prob.total-probability`, cross_links none, proficient/apply, mastery_threshold 0.9,
  estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 100): authored. First entry this batch. Companion batch concept:
  `math.de.ode-order`. `math.prob` moves 4/49 → **5/49** this batch.
