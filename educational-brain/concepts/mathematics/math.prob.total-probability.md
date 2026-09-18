# math.prob.total-probability

## Identity
- **KG id**: `math.prob.total-probability`
- **Domain**: math.prob
- **Requires**: `math.prob.conditional-probability`
- **Unlocks**: `math.prob.bayes-theorem`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State the LAW OF TOTAL PROBABILITY: if $\{B_1,\dots,B_n\}$ PARTITIONS $\Omega$ (mutually
exclusive AND exhaustive), then $P(A)=\sum_iP(A|B_i)P(B_i)$ — a WEIGHTED average by the base
rates $P(B_i)$, never a simple unweighted average; verify a candidate $\{B_i\}$ is a genuine
partition (BOTH conditions checked, never just one) before applying the law; and extend it beyond
two cases to $n$ partition elements and the continuous case.

## Core Understanding
THE LAW IS A WEIGHTED AVERAGE BY BASE RATES, NEVER A SIMPLE AVERAGE: reusing
`math.prob.conditional-probability`'s own machinery directly,
$A=A\cap\Omega=A\cap(B_1\cup\cdots\cup B_n)=(A\cap B_1)\cup\cdots\cup(A\cap B_n)$; since the
$A\cap B_i$ pieces are mutually exclusive, $P(A)=\sum P(A\cap B_i)=\sum P(A|B_i)P(B_i)$. For a
disease test with $P(D)=0.01,P(D^c)=0.99$, sensitivity $P(+|D)=0.95$, false-positive rate
$P(+|D^c)=0.10$: $P(+)=0.95(0.01)+0.10(0.99)=0.1085$ — the RARE case $D$ ($P(D)=0.01$)
contributes proportionally little, exactly as its small weight demands; a naive unweighted
average $(0.95+0.10)/2=0.525$ would be badly wrong.

A PARTITION REQUIRES BOTH MUTUAL EXCLUSIVITY AND EXHAUSTIVENESS — NEITHER ALONE SUFFICES: applying
the law to a collection that isn't genuinely a partition gives incorrect results. $\{$heads,
tails$\}$ IS a valid partition of a coin flip (mutually exclusive AND exhaustive); $\{$heads,
even$\}$ for a die is NOT (neither mutually exclusive with other outcomes as intended, nor
exhaustive — odd numbers besides matching "heads" concept don't even apply). For ANY event $B$,
$\{B,B^c\}$ is always a valid 2-element partition — the simplest reliable construction.

THE LAW EXTENDS BEYOND TWO CASES TO ANY PARTITION SIZE, INCLUDING CONTINUOUS CONDITIONING:
generalizing the two-case $P(A)=P(A|B)P(B)+P(A|B^c)P(B^c)$ to $n$ cases,
$P(A)=\sum_{i=1}^nP(A|B_i)P(B_i)$, and further to a continuous conditioning variable $Y$:
$P(A)=\int P(A|Y=y)f_Y(y)\,dy$. The same tower-property structure applies to expectation:
$E[X]=\sum_iE[X|B_i]P(B_i)$ — recursive problems like Gambler's ruin use exactly this structure
by conditioning on the first step.

## Mental Models
- **"P(A) is a weighted average across every way A can happen — each case's contribution is
  scaled by how likely that case is, never treated equally."**
- **"A partition needs BOTH properties checked — mutually exclusive AND exhaustive — missing
  either one breaks the law."**

## Why Students Fail

### MC-1: TOTAL-PROBABILITY-AVERAGES-PROBABILITIES
- **Surface form**: computes $P(A)=[P(A|B_1)+P(A|B_2)]/2$ (a simple average) instead of the
  weighted average $\sum P(A|B_i)P(B_i)$, ignoring the base-rate weights.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger — "averaging
  cases" feels intuitive when the $B_i$'s relative likelihoods aren't explicitly considered).
- **Repair**: re-compute using an extreme-weight example, showing the weighted and simple
  averages diverge sharply when the $B_i$'s probabilities are very unequal.

### MC-2: PARTITION-IS-OPTIONAL
- **Surface form**: applies the law to events $B_1,B_2$ that are not a genuine partition (either
  not exhaustive or not mutually exclusive).
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — "condition on
  cases" is vague, and "partition" demands both properties, often only one of which gets
  checked).
- **Repair**: re-verify both conditions explicitly — mutual exclusivity AND exhaustiveness —
  before applying the law.

### MC-3: TOTAL-PROBABILITY-IS-ONLY-FOR-TWO-CASES
- **Surface form**: uses only the two-case form $P(A)=P(A|B)P(B)+P(A|B^c)P(B^c)$ and cannot
  extend to $n>2$ partition elements.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — first examples
  are always two-case, and the generalization to arbitrary partition size is never explicitly
  exercised).
- **Repair**: re-derive the sum form directly for a genuine $n$-element partition.

## Misconceptions

### MC-1: TOTAL-PROBABILITY-AVERAGES-PROBABILITIES
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: PARTITION-IS-OPTIONAL
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: TOTAL-PROBABILITY-IS-ONLY-FOR-TWO-CASES
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Total probability is a poll weighted by turnout — a case that almost never happens can't
  swing the result as much as one that dominates, no matter how extreme its own conditional
  probability."**
- **Anti-analogy**: a collection of "cases" that overlap or leaves gaps is NOT a partition — the
  law's proof itself depends on both properties holding simultaneously.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: with $P(B_1)=0.001,P(B_2)=0.999,P(A|B_1)=1,P(A|B_2)=0$: the
  WRONG simple average gives $0.5$; the CORRECT weighted average gives $1(0.001)+0(0.999)=0.001$
  — the rare case contributes negligibly, exactly as its tiny weight demands.
- **Demonstration 2 (targets MC-2)**: $\{$heads, tails$\}$ is a valid partition of a coin flip;
  $\{$heads, even$\}$ for a die fails both properties simultaneously — neither mutually exclusive
  in the intended sense nor exhaustive.
- **Demonstration 3 (targets MC-3)**: a bag of coins with biases $p_1,\dots,p_{10}$, each equally
  likely to be picked, gives $P(H)=\sum(p_i/10)$ — the AVERAGE bias, generalizing directly beyond
  the two-case disease-test example.

## Discovery Questions
1. "If one case is far more likely than another, should it contribute equally to $P(A)$ in the
   total-probability computation?"
2. "Is $\{$heads, even$\}$ a valid partition of a die roll's outcomes?"
3. "Does the law of total probability only work for exactly two conditioning cases?"

## Teaching Sequence
1. **Representation shift**: derive the law directly from `math.prob.conditional-probability`'s
   own machinery via the disjoint-decomposition proof, worked on the classic disease-test
   example.
2. **Conceptual shift**: Demonstration 1's extreme-weight contrast, isolating MC-1 by exposing
   the sharp divergence between weighted and simple averages.
3. **Pattern induction**: Demonstration 2's partition-versus-non-partition check, isolating MC-2
   by requiring both conditions verified explicitly.
4. **Pattern induction**: Demonstration 3's $n$-case generalization, isolating MC-3 by extending
   directly beyond the two-case form.
5. **Mastery gate**: require a correctly weighted total-probability computation, a correct
   partition verification, and a correct $n$-case or continuous extension, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept a total-probability computation that uses a simple, unweighted average.
- Never accept the law applied to a collection without both mutual-exclusivity and
  exhaustiveness explicitly verified.

## Voice Teaching Notes
- Say "did you weight each conditional probability by how likely that case actually is, or just
  average them?" whenever the law is applied.
- When a partition is proposed, ask "does it cover everything, and do the pieces overlap
  anywhere?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies whether a given collection is a genuine
  partition.
- **Rung 2 (application)**: learner correctly computes $P(A)$ via the weighted sum for a new
  multi-case scenario.
- **Rung 3 (transfer)**: learner correctly extends the law to a NEW $n$-case or continuous
  scenario, and correctly applies the analogous tower-property structure to expectation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-compute using an extreme-weight example exposing the divergence.
- If MC-2 recurs, re-verify both partition conditions explicitly.
- If MC-3 recurs, re-derive the sum form directly for a genuine $n$-element partition.

## Memory Hooks
- "Weighted, not simple — each case counts in proportion to how likely it is."
- "A partition needs both: no overlap, and nothing left out."
- "Two cases is the simplest example, never the limit — the law works for any partition size."

## Transfer Connections
- `math.prob.conditional-probability` (already authored, this campaign, Batch 100): supplies the
  $P(A\cap B)=P(A|B)P(B)$ rearrangement this concept's proof and computation are built from
  directly.
- `math.prob.bayes-theorem` (not yet authored): the KG's declared unlock, using this concept's
  weighted sum as its own denominator (the normalizing constant).

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.total-probability.md`, reused by
  reference for its disjoint-decomposition proof, its disease-test worked example, its
  partition-validity check, its $n$-case coin-bag generalization, and its three-misconception
  registry (birth types adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining the
  law of total variance's within-group/between-group decomposition, applied to a
  Poisson-Gamma hierarchical model yielding the negative binomial variance.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.conditional-probability`, unlocks `math.prob.bayes-theorem`, cross_links none,
  proficient/apply, mastery_threshold 0.9, estimated_hours 3) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 103): authored. Second entry this batch. Companion batch concept:
  `math.de.second-order-ode`. `math.prob` moves 6/49 → **7/49** this batch.
