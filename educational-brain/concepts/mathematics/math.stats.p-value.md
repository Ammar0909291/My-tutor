# math.stats.p-value

## Identity
- **KG id**: `math.stats.p-value`
- **Domain**: math.stats
- **Requires**: `math.stats.test-statistic`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: evaluate
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define the p-value as $P(\text{test statistic}\ge\text{observed}\mid H_0)$ — the probability,
ASSUMING $H_0$ is true, of data at least this extreme; apply the decision rule "reject $H_0$ when
$p<\alpha$," recognizing a large p-value NEVER proves $H_0$ true, only that evidence against it
was insufficient; and reject the single most critical misinterpretation — the p-value is NEVER
$P(H_0\text{ true})$, a fundamentally different (Bayesian) quantity the frequentist p-value
framework does not compute.

## Core Understanding
THE P-VALUE CONDITIONS ON $H_0$, COMPUTING A PROBABILITY ABOUT THE DATA — NEVER THE REVERSE: for
$p=0.03$: this means "ASSUMING $H_0$ is true, the probability of observing a test statistic at
least this extreme is 0.03" — a conditional probability about the DATA, given $H_0$. Stating "the
probability that $H_0$ is true is 0.03" REVERSES the conditioning entirely: the p-value conditions
ON $H_0$ (computing something about the data), while that incorrect claim would require
conditioning ON the data to compute something about $H_0$ — an entirely different Bayesian
calculation the p-value simply never performs.

A LARGE P-VALUE MEANS INSUFFICIENT EVIDENCE — NEVER PROOF THAT $H_0$ IS TRUE: for $p=0.08$ against
$\alpha=0.05$: since $0.08>0.05$, FAIL TO REJECT $H_0$ — this does NOT mean $H_0$ has been proven
true, only that this particular data doesn't provide sufficiently strong evidence against it at
the chosen threshold. Interpreting "fail to reject" as "$H_0$ is confirmed true" or "there is no
effect" overstates what the test actually established; genuine uncertainty remains, never
confirmed truth.

THE P-VALUE IS NEVER $P(H_0\text{ TRUE})$ — A FUNDAMENTALLY DIFFERENT, BAYESIAN QUANTITY: for
$p=0.03$, the WRONG interpretation "there's a 3% chance $H_0$ is true" treats the p-value as a
probability ABOUT $H_0$, which frequentist statistics does not compute — that would require a
PRIOR probability on $H_0$ and Bayes' theorem, tools the p-value framework simply doesn't use. The
CORRECT interpretation: "IF $H_0$ were true, there would be only a 3% chance of observing data
this extreme (or more extreme)" — a statement about how SURPRISING the DATA would be under $H_0$,
NEVER a direct probability statement about $H_0$ itself.

## Mental Models
- **"The p-value asks 'how surprising is my data, assuming the null is true?' — never 'how likely
  is the null, given my data?'"**
- **"Failing to reject is a shrug of insufficient evidence, never a certificate proving H0 true."**
- **"P-value and P(H0 true) are two entirely different quantities — one frequentist, one
  Bayesian — never interchangeable."**

## Why Students Fail

### MC-1: P-VALUE-DEFINITION-CONDITIONING-REVERSED
- **Surface form**: states the p-value's definition with the conditioning reversed — as a
  probability about $H_0$ given the data, rather than a probability about the data given $H_0$.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-state the definition explicitly, emphasizing the probability is computed
  ASSUMING $H_0$ true, about the data.

### MC-2: P-VALUE-INTERPRETED-AS-THE-PROBABILITY-THAT-H0-IS-TRUE
- **Surface form**: interprets the p-value as directly equal to the probability that the null
  hypothesis is true, conflating a frequentist quantity with a Bayesian one.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-contrast the correct and incorrect interpretations explicitly, side by side.

## Misconceptions

### MC-1: P-VALUE-DEFINITION-CONDITIONING-REVERSED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: P-VALUE-INTERPRETED-AS-THE-PROBABILITY-THAT-H0-IS-TRUE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The p-value is a smoke-detector reading computed assuming there's no fire — never a direct
  readout of whether there's actually a fire."**
- **Anti-analogy**: "fail to reject" is not a verdict of innocence — a "not guilty" jury verdict
  means the evidence didn't clear the bar for conviction, never that innocence was proven.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the precise conditional restatement of $p=0.03$.
- **Demonstration 2**: the $p=0.08$-versus-$\alpha=0.05$ decision and its cautious, non-
  confirmatory interpretation.
- **Demonstration 3 (targets MC-2)**: the "3% chance $H_0$ is true" WRONG-versus-CORRECT
  interpretation contrast.

## Discovery Questions
1. "Does a p-value of 0.03 describe a probability about the data, or a probability about H0?"
2. "If p=0.08 and α=0.05, does failing to reject H0 mean H0 has been proven true?"
3. "Is 'there's a 3% chance H0 is true' a correct way to describe p=0.03?"

## Teaching Sequence
1. **Conceptual shift**: the precise conditional definition, working Demonstration 1, isolating
   MC-1.
2. **Reused procedure**: the cautious large-p-value interpretation, working Demonstration 2.
3. **Contrast pair**: the WRONG-versus-CORRECT interpretation of $p=0.03$, working Demonstration 3,
   isolating MC-2.
4. **Mastery gate**: require a correct precise definition, a correct decision-rule application,
   and a correct rejection of the "$P(H_0\text{ true})$" misinterpretation, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept the p-value's conditioning stated in reverse.
- Never accept "fail to reject" interpreted as proof that $H_0$ is true.
- Never accept the p-value equated with $P(H_0\text{ true})$.

## Voice Teaching Notes
- Say "is that a probability about the data given H0, or about H0 given the data?" whenever the
  p-value's definition is stated.
- Ask "does failing to reject prove H0, or just mean the evidence wasn't strong enough?" whenever
  a large p-value is interpreted.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the p-value's precise conditional definition.
- **Rung 2 (application)**: learner correctly applies the reject/fail-to-reject decision rule and
  gives the cautious, non-confirmatory interpretation of a large p-value.
- **Rung 3 (transfer)**: learner correctly identifies and corrects a p-value misinterpretation in
  a news report or research claim.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the definition explicitly, emphasizing what is being conditioned on.
- If MC-2 recurs, re-contrast the correct and incorrect interpretations side by side.

## Memory Hooks
- "P-value: probability of the data given H0 — never probability of H0 given the data."
- "Fail to reject is a shrug, never a proof."
- "P-value ≠ P(H0 true) — one is frequentist, the other Bayesian."

## Transfer Connections
- `math.stats.test-statistic` (already authored, this campaign, Batch 203): supplies the test
  statistic and its null distribution the p-value is computed directly from.

## Cross-Subject Connections
- Science journalism: "97% certain" or "2% chance the drug doesn't work" headlines are common,
  real-world instances of MC-2, directly correctable using this concept's precise definition.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.p-value.md`, reused by reference for
  its precise conditional-definition example, its decision-rule example, its WRONG-versus-CORRECT
  interpretation contrast, and its two-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe correcting a misleading news
  headline's "2% chance the drug doesn't work" misinterpretation of $p=0.02$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.test-statistic`, unlocks none, cross_links none, proficient/evaluate,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 204): authored. First entry this batch. Companion batch concept:
  `math.stats.power`.
