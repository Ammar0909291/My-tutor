# math.stats.hypothesis-testing

## Identity
- **KG id**: `math.stats.hypothesis-testing`
- **Domain**: math.stats
- **Requires**: `math.stats.sampling-distribution`, `math.prob.conditional-probability`
- **Unlocks**: none (terminal node in the current Mathematics Knowledge Graph)
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
State the five-step hypothesis-testing procedure (state $H_0$/$H_1$, collect data, compute a test
statistic, find the p-value, make a decision); interpret the p-value CORRECTLY as
$P(\text{data this extreme}\mid H_0\text{ true})$, NEVER as $P(H_0\text{ true}\mid\text{data})$ —
the same reversed-conditional error `math.prob.conditional-probability` already warns generalizes;
and distinguish Type I error (false positive, rejecting a true $H_0$) from Type II error (false
negative, failing to reject a false $H_0$), recognizing an inherent trade-off between them, never
assuming lowering one automatically lowers the other.

## Core Understanding
THE P-VALUE IS $P(\text{DATA}\mid H_0)$ — NEVER $P(H_0\mid\text{DATA})$: for a website-design test,
$H_0:\mu=45$s, $H_1:\mu>45$s, $n=100$, $\bar x=48$s, $s=15$s: the test statistic is $z=
(48-45)/(15/\sqrt{100})=3/1.5=2$, giving p-value $P(Z\geq2)\approx0.023$. The CORRECT
interpretation: "IF $H_0$ were true (true mean really 45s), there would only be a 2.3% chance of
observing a sample mean this high purely by random variation." The INCORRECT interpretation,
"there's a 2.3% chance $H_0$ is true," REVERSES the conditional entirely — the p-value is computed
BY ASSUMING $H_0$ throughout, so it can NEVER simultaneously report $H_0$'s own probability; this is
EXACTLY the general $P(A\mid B)\neq P(B\mid A)$ error `math.prob.conditional-probability` already
warns against, now appearing in its highest-stakes statistical form.

FAILING TO REJECT $H_0$ MEANS INSUFFICIENT EVIDENCE — NEVER PROOF THAT $H_0$ IS TRUE: a p-value of
$0.08$ against $\alpha=0.05$ leads to "fail to reject $H_0$" — this means the test did NOT find
strong enough evidence against $H_0$ with this sample, NEVER that $H_0$ has been PROVEN true;
absence of evidence is never evidence of absence, and a larger sample or different data could still
reveal a real effect this particular test missed.

TYPE I AND TYPE II ERRORS ARE DISTINCT, TRADING OFF AGAINST EACH OTHER — NEVER BOTH REDUCED BY
ADJUSTING $\alpha$ ALONE: for a medical test, $H_0=$"no disease," $H_1=$"has disease": a Type I
error (rejecting a TRUE $H_0$) means wrongly telling a healthy patient they are sick — a false
positive. A Type II error (failing to reject a FALSE $H_0$) means missing a sick patient entirely —
a false negative. Lowering $\alpha$ (demanding stronger evidence to reject $H_0$) reduces Type I
error risk but INCREASES Type II error risk, all else equal — there is NO way to simultaneously
minimize both by adjusting $\alpha$ alone; only genuinely MORE DATA improves both at once.

## Mental Models
- **"The p-value tells you how surprising your data would be IF the null were true — never how
  likely the null itself is."**
- **"Failing to reject H0 is a shrug, not a verdict — it never proves H0 true, only that this test
  didn't find enough evidence against it."**
- **"Type I and Type II errors are two different mistakes pulling in opposite directions — tightening
  the net against one lets more of the other through."**

## Why Students Fail

### MC-1: P-VALUE-INTERPRETED-AS-PROBABILITY-H0-TRUE
- **Surface form**: believes the p-value directly gives the probability that $H_0$ is true,
  reversing the conditional direction of what the p-value actually computes.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "the single most
  pervasive statistical misinterpretation").
- **Repair**: re-anchor on the precise conditional — the p-value is computed BY ASSUMING $H_0$, so
  it cannot simultaneously report $H_0$'s own probability; connect explicitly to the general
  $P(A\mid B)\neq P(B\mid A)$ lesson.

### MC-2: FAIL-TO-REJECT-INTERPRETED-AS-PROVING-H0
- **Surface form**: believes "fail to reject $H_0$" means $H_0$ has been PROVEN true.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-anchor on "failing to find enough evidence against $H_0$ is not the same as
  proving $H_0$ — it just means this particular test didn't detect a difference strongly enough."

### MC-3: TYPE-I-AND-TYPE-II-ERROR-CONFLATED
- **Surface form**: confuses which error (Type I vs. Type II) corresponds to which mistake, or
  believes reducing one automatically reduces the other.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-derive using the medical-test scenario — Type I = wrongly rejecting a TRUE $H_0$
  (false alarm); Type II = wrongly failing to reject a FALSE $H_0$ (missed detection).

## Misconceptions

### MC-1: P-VALUE-INTERPRETED-AS-PROBABILITY-H0-TRUE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: FAIL-TO-REJECT-INTERPRETED-AS-PROVING-H0
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: TYPE-I-AND-TYPE-II-ERROR-CONFLATED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The p-value is a smoke detector reading assuming there's no fire — never a direct readout of
  whether there's actually a fire."**
- **Anti-analogy**: "fail to reject H0" is not a checkmark of innocence — a jury's "not guilty" is
  not the same as "proven innocent," it only means the evidence presented wasn't enough to convict.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full five-step website-design test, computing $z=2$,
  p-value $\approx0.023$, and the correct-versus-incorrect interpretation contrast.
- **Demonstration 2 (targets MC-3)**: the medical-test Type I/Type II labeling and the
  $\alpha$-tightening trade-off.

## Discovery Questions
1. "If a p-value is 0.023, does that mean there's a 2.3% chance the null hypothesis is true?"
2. "If a test fails to reject $H_0$, has $H_0$ been proven true?"
3. "If you lower the significance level $\alpha$ to reduce false positives, does that also reduce
   false negatives?"

## Teaching Sequence
1. **Representation shift**: the five-step procedure and precise p-value conditional, working
   Demonstration 1, isolating MC-1.
2. **Conceptual shift**: the fail-to-reject-is-not-proof clarification, isolating MC-2.
3. **Contrast pair**: the Type I/Type II medical-test trade-off, working Demonstration 2, isolating
   MC-3.
4. **Mastery gate**: require correct hypothesis formulation, a correct p-value interpretation, and
   a correct Type I/Type II distinction with trade-off explanation, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept a p-value stated as "the probability $H_0$ is true."
- Never accept "fail to reject $H_0$" interpreted as proving $H_0$ true.
- Never accept Type I and Type II errors used interchangeably, or a claim that lowering $\alpha$
  reduces both simultaneously.

## Voice Teaching Notes
- Say "is that the probability of the data given H0, or the probability of H0 given the data?"
  whenever a p-value is stated.
- Ask "does failing to reject mean H0 is proven, or just that this test didn't find enough
  evidence?" whenever a non-significant result is reported.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the five-step procedure and formulates
  $H_0$/$H_1$ for a given research question.
- **Rung 2 (application)**: learner correctly interprets a given p-value using the precise
  conditional-probability definition.
- **Rung 3 (transfer)**: learner correctly identifies Type I versus Type II error in a novel
  scenario and justifies an $\alpha$ choice using the error trade-off.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the precise conditional and its link to $P(A\mid B)\neq P(B\mid A)$.
- If MC-2 recurs, re-anchor on "insufficient evidence, never proof."
- If MC-3 recurs, re-derive Type I/Type II via the concrete medical-test scenario.

## Memory Hooks
- "P-value: probability of the data given H0 — never probability of H0 given the data."
- "Fail to reject is a shrug, never a proof."
- "Type I is a false alarm, Type II is a missed detection — tightening one loosens the other."

## Transfer Connections
- `math.stats.sampling-distribution` (already authored, certified domain): supplies the
  distribution of $\bar X$ under repeated sampling, needed to compute the test statistic and
  p-value.
- `math.prob.conditional-probability` (already authored, certified domain): supplies the
  $P(A\mid B)$ notation and the general reversed-conditional warning this concept's central
  misconception is a specific instance of.

## Cross-Subject Connections
- Scientific research and journalism: p-value misreporting (treating $p=0.03$ as "97% certain")
  is a genuine, common, real-world error directly traceable to MC-1.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.hypothesis-testing.md`, reused by
  reference for its five-step procedure example, its p-value interpretation contrast, its
  medical-test Type I/Type II trade-off scenario, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a pharmaceutical clinical trial,
  correcting a news headline's "97% certain" misinterpretation, and justifying a stricter
  $\alpha=0.01$ threshold via the error trade-off.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sampling-distribution`/`math.prob.conditional-probability`, unlocks none — correctly
  matching this concept's terminal-node status in the current KG, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 6) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 201): authored. Second entry this batch. Companion batch concept:
  `math.stats.confidence-interval`.
