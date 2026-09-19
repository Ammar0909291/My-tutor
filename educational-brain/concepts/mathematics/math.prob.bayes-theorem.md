# math.prob.bayes-theorem

## Identity
- **KG id**: `math.prob.bayes-theorem`
- **Domain**: math.prob
- **Requires**: `math.prob.conditional-probability`, `math.prob.total-probability`
- **Unlocks**: `math.prob.bayesian-inference`
- **Cross-links**: `math.stats.bayesian-inference` (KG-declared, but NOT yet authored — verified
  via `ls`; independence mode used, correcting the Blueprint's own claimed cross-link mode, see
  Curriculum Feedback)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
State Bayes' theorem $P(B|A)=P(A|B)P(B)/P(A)$, identifying the PRIOR $P(B)$, LIKELIHOOD $P(A|B)$,
POSTERIOR $P(B|A)$, and normalizing EVIDENCE $P(A)$; compute $P(A)$ via
`math.prob.total-probability`'s own law when needed; and distinguish the POSTERIOR from the
LIKELIHOOD, avoiding the classic inversion $P(D|+)\ne P(+|D)$ — a rare disease's low PRIOR keeps
the posterior far below the test's headline sensitivity.

## Core Understanding
BAYES' THEOREM INVERTS A CONDITIONAL PROBABILITY VIA A TRIVIAL REARRANGEMENT: reusing
`math.prob.conditional-probability`'s own $P(A\cap B)=P(B|A)P(A)=P(A|B)P(B)$ directly, dividing
by $P(A)$ gives $P(B|A)=P(A|B)P(B)/P(A)$. Four named quantities: PRIOR $P(B)$ (belief before
evidence), LIKELIHOOD $P(A|B)$ (probability of the evidence given $B$), POSTERIOR $P(B|A)$
(updated belief), and EVIDENCE $P(A)$ (the normalizing denominator, computed via
`math.prob.total-probability`'s own law when unknown directly).

THE POSTERIOR IS NEVER THE SAME AS THE LIKELIHOOD — THE PRIOR DOES THE HEAVY LIFTING: for a
disease with 1% prevalence, sensitivity $P(+|D)=0.95$, false-positive rate $P(+|D^c)=0.10$:
$P(+)=0.95(0.01)+0.10(0.99)=0.1085$, so $P(D|+)=0.0095/0.1085\approx8.8\%$ — NOT 95%. The 95%
sensitivity is $P(+|D)$; the posterior $P(D|+)$ is a genuinely different quantity, driven heavily
by the small 1% prior — 99% of people don't have the disease, so even a specific test produces
many more false positives than true positives in absolute terms.

BAYES GENERALIZES DIRECTLY TO $n$ HYPOTHESES, NEVER JUST A BINARY PAIR: for a partition
$\{B_1,\dots,B_n\}$, $P(B_i|A)=P(A|B_i)P(B_i)/\sum_jP(A|B_j)P(B_j)$ — the two-hypothesis form
($B,B^c$) is the special case $n=2$, never the limit of the method. For three machines producing
defectives at rates 2%, 5%, 8% with proportions 50%, 30%, 20%: given a defective is found,
$P(\text{machine A}|\text{defective})=0.010/(0.010+0.015+0.016)\approx24\%$ — the identical
structure with $n$ terms in the denominator, not a fundamentally different computation.

## Mental Models
- **"Posterior = Prior × Likelihood ÷ Evidence — the prior is a full input, never a footnote to
  skip."**
- **"A test's headline sensitivity answers a different question than the one you usually want —
  'given a positive, do I have it?' requires the prior, not just the test's own accuracy."**

## Why Students Fail

### MC-1: POSTERIOR-EQUALS-LIKELIHOOD
- **Surface form**: writes $P(B|A)=P(A|B)$, computing $P(\text{disease}|+)=P(+|\text{disease})=$
  sensitivity, ignoring the prior and base rate entirely.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — sensitivity is
  the headline number reported for medical tests, and reversing "P(positive given disease)" into
  "P(disease given positive)" without applying Bayes is a natural but incorrect shortcut).
- **Repair**: re-derive the full Bayes computation, showing the prior $P(D)=0.01$ is what
  produces the dramatically different posterior.

### MC-2: BASE-RATE-NEGLECT
- **Surface form**: focuses only on sensitivity and specificity, ignoring $P(B)$, computing a
  posterior far too high when the prior is very small.
- **Birth type**: Type 3, language contamination (Blueprint's own declared trigger — "the test is
  95% accurate" implies $P(\text{disease}|+)\approx0.95$ in everyday language, conflating test
  accuracy with the posterior).
- **Repair**: re-walk the frequency-table breakdown, showing the prior drives the posterior
  directly (varying prevalence from 1% to 50% to 0.1% changes the posterior dramatically with
  identical sensitivity/specificity).

### MC-3: BAYES-ONLY-WORKS-FOR-TWO-HYPOTHESES
- **Surface form**: applies the formula only when $B$ is binary, not extending to a partition
  $B_1,\dots,B_n$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — all
  introductory examples use exactly two hypotheses, and the general partition form is rarely
  shown).
- **Repair**: re-derive the generalized form directly for a genuine $n$-hypothesis scenario.

## Misconceptions

### MC-1: POSTERIOR-EQUALS-LIKELIHOOD
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: BASE-RATE-NEGLECT
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: BAYES-ONLY-WORKS-FOR-TWO-HYPOTHESES
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The prior is the starting weight on a scale — the likelihood only tips it, never resets it
  to zero and rebuilds from scratch."**
- **Anti-analogy**: a "95% accurate" test does NOT mean 95% of positive results are genuine —
  that conflates the test's own accuracy with the very different quantity Bayes computes.

## Demonstrations
- **Demonstration 1 (targets MC-1, MC-2)**: 1000 people, 10 have the disease, 9 test positive
  (sensitivity), 99 of the 990 healthy people also test positive (false positives) — of the 108
  total positives, only 9 have the disease: $P(D|+)=9/108\approx8.3\%$, dramatically below the
  90% sensitivity.
- **Demonstration 2 (targets MC-2, varying the prior)**: with sensitivity/specificity fixed, a
  50% prevalence gives $P(D|+)\approx64\%$; a 0.1% prevalence gives $P(D|+)\approx0.9\%$ — the
  base rate alone drives large swings in the posterior.
- **Demonstration 3 (targets MC-3)**: three machines (2%, 5%, 8% defect rates; 50%, 30%, 20%
  shares): given a defective, $P(\text{machine A}|\text{defective})=0.010/0.041\approx24\%$ —
  the same structure extended to three hypotheses, not a special two-case-only formula.

## Discovery Questions
1. "If a test has 95% sensitivity, does that mean 95% of people who test positive actually have
   the disease?"
2. "Does changing how common a disease is change the answer to 'given a positive test, do I have
   it,' even if the test itself doesn't change?"
3. "Does Bayes' theorem only apply when there are exactly two possible hypotheses?"

## Teaching Sequence
1. **Representation shift**: derive Bayes' theorem via the trivial rearrangement of
   `math.prob.conditional-probability`'s own formula, worked on the classic medical-testing
   example.
2. **Conceptual shift**: Demonstration 1's frequency-table breakdown, isolating MC-1 and MC-2 by
   requiring the full computation, never the sensitivity alone.
3. **Pattern induction**: Demonstration 2's varying-prior comparison, reinforcing the prior's
   decisive role.
4. **Pattern induction**: Demonstration 3's three-hypothesis generalization, isolating MC-3 by
   extending directly beyond the binary case.
5. **Mastery gate**: require a correctly computed posterior distinguishing it from the
   likelihood, a correct base-rate-sensitive computation across varying priors, and a correct
   $n$-hypothesis generalization, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a posterior computed as equal to the likelihood (sensitivity) alone.
- Never accept Bayes' theorem restricted to exactly two hypotheses without the general partition
  form available.

## Voice Teaching Notes
- Say "is that the likelihood, or did you actually compute the posterior using the prior?"
  whenever a Bayes-style question is answered.
- When a rare-condition scenario is discussed, ask "does the low prior change your answer,
  even with the same test accuracy?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the prior, likelihood, posterior, and
  evidence in a new scenario.
- **Rung 2 (application)**: learner correctly computes a posterior probability using Bayes'
  theorem, distinguishing it from the raw sensitivity/specificity values.
- **Rung 3 (transfer)**: learner correctly applies the generalized $n$-hypothesis form to a NEW
  multi-cause scenario, and correctly performs a sequential Bayesian update using a posterior as
  the next prior.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the full Bayes computation showing the prior's effect.
- If MC-2 recurs, re-walk the varying-prior comparison directly.
- If MC-3 recurs, re-derive the generalized form for a genuine $n$-hypothesis scenario.

## Memory Hooks
- "Posterior needs the prior — sensitivity alone is never the answer to 'given positive, do I
  have it?'"
- "A rare condition keeps the posterior low even with a highly accurate test."
- "Two hypotheses is the simplest case, never the limit — Bayes works for any partition."

## Transfer Connections
- `math.prob.conditional-probability` (already authored, this campaign, Batch 100): supplies the
  $P(A\cap B)=P(B|A)P(A)=P(A|B)P(B)$ rearrangement this concept's formula is derived from
  directly.
- `math.prob.total-probability` (already authored, this campaign, Batch 103): supplies the
  weighted-sum computation this concept's evidence term $P(A)$ uses directly when unknown.
- `math.prob.bayesian-inference` (not yet authored): the KG's declared unlock, extending discrete
  Bayes to continuous parameter estimation.

## Cross-Subject Connections
- None formal (see Curriculum Feedback regarding `math.stats.bayesian-inference`).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.bayes-theorem.md`, reused by
  reference for its medical-testing frequency-table derivation, its varying-prior comparison, its
  three-machine generalized-Bayes example, and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own transfer probe, examining an airport
  security scanner's sensitivity/false-alarm rate against an extremely low weapon-carrying prior,
  a sequential update from a second independent scanner, and the design implication of one
  sensitive scanner versus two moderately sensitive ones.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected**: the Blueprint's own Component 8 states
  "Mode: Cross-link (cross_links = [math.stats.bayesian-inference])" and its P76 probe assumes
  that concept's continuous-Bayes content is already available. Verified via `ls` that
  `math.stats.bayesian-inference` has NO authored Educational Brain entry (the entire `math.stats`
  domain is unstarted in this campaign) — per the established convention (cross-link mode
  requires the target confirmed authored), this entry uses INDEPENDENCE mode instead, treating
  the Blueprint's continuous-Bayes/conjugate-prior/credible-interval content as a self-contained
  transfer probe rather than a verified cross-link. All other fields (requires
  `math.prob.conditional-probability`+`math.prob.total-probability`, unlocks
  `math.prob.bayesian-inference`, proficient/apply, mastery_threshold 0.9, estimated_hours 5)
  matched exactly.

## Version History
- 2026-09-18 (Batch 104): authored. Second entry this batch. Companion batch concept:
  `math.de.systems-ode`. `math.prob` moves 7/49 → **8/49** this batch.
