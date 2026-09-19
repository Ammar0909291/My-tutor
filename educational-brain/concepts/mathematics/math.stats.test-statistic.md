# math.stats.test-statistic

## Identity
- **KG id**: `math.stats.test-statistic`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define a test statistic as a function of the sample data measuring evidence against $H_0$, NEVER
a bare number meaningful on its own; recognize that under $H_0$ the test statistic has a KNOWN
reference distribution ($z$, $t$, $\chi^2$, or $F$) — the fact that MAKES a p-value computable in
the first place; and correctly apply the INVERSE relationship between statistic extremity and
p-value — a MORE extreme statistic gives a SMALLER p-value, NEVER a larger one.

## Core Understanding
A TEST STATISTIC'S VALUE ONLY CARRIES MEANING THROUGH ITS POSITION RELATIVE TO THE NULL
DISTRIBUTION — NEVER AS A BARE NUMBER: comparing $z=2.5$ against $z=0.3$: $z=2.5$ is FAR into the
tail of the standard normal (unusual, unlikely under $H_0$), while $z=0.3$ sits near the CENTER
(typical, unremarkable under $H_0$). The LARGER magnitude indicates the data would be more
SURPRISING if $H_0$ were true — hence stronger evidence against it. Treating "$z=2.5$" as simply
"a computed number," without connecting its MAGNITUDE to how unusual that value is under the null
distribution, misses the entire point of a test statistic.

DIFFERENT TESTS USE DIFFERENT KNOWN REFERENCE DISTRIBUTIONS — NEVER ONE-SIZE-FITS-ALL: a
one-sample mean test with KNOWN $\sigma$ uses the $z$-distribution; the SAME test with UNKNOWN
$\sigma$ (estimated by $s$) uses the $t$-distribution (with $n-1$ degrees of freedom); a
chi-squared goodness-of-fit test uses the $\chi^2$-distribution. This KNOWN reference distribution
under $H_0$ is EXACTLY what makes a p-value computable — without it, there would be no basis for
judging whether an observed value is surprising.

MORE EXTREME STATISTIC MEANS SMALLER P-VALUE — NEVER A LARGER ONE: a test statistic in the extreme
tail of the null distribution has a SMALLER p-value than one near the center, because the p-value
is DEFINED as the tail probability of observing something at least as extreme — and there is LESS
tail area beyond a MORE extreme point. Assuming "bigger statistic = bigger p-value" mistakenly
generalizes "bigger number = bigger probability" without accounting for the tail-probability
definition; the relationship is genuinely INVERSE, a direct mathematical consequence of how
p-values are defined, never an arbitrary convention.

## Mental Models
- **"A test statistic's number means nothing by itself — its evidential weight comes entirely from
  where it sits on the null distribution's curve."**
- **"Different tests borrow different known reference distributions (z, t, χ², F) — never a single
  universal one."**
- **"More extreme means less tail area beyond it, which means a smaller p-value — never bigger
  statistic, bigger p-value."**

## Why Students Fail

### MC-1: TEST-STATISTIC-VALUE-TREATED-AS-A-BARE-NUMBER-DISCONNECTED-FROM-THE-NULL-DISTRIBUTION
- **Surface form**: treats the test statistic's numeric value as meaningful on its own, without
  connecting its magnitude to its position relative to the known null distribution.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-visualize the test statistic's position on the null distribution's curve
  explicitly, using the $z=2.5$-versus-$z=0.3$ contrast.

### MC-2: LARGER-TEST-STATISTIC-ASSUMED-TO-CORRESPOND-TO-LARGER-P-VALUE
- **Surface form**: assumes a larger test statistic magnitude corresponds to a larger p-value,
  rather than the correct inverse relationship.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive the p-value's tail-probability definition explicitly, confirming more
  extreme values have less tail area beyond them.

## Misconceptions

### MC-1: TEST-STATISTIC-VALUE-TREATED-AS-A-BARE-NUMBER-DISCONNECTED-FROM-THE-NULL-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: LARGER-TEST-STATISTIC-ASSUMED-TO-CORRESPOND-TO-LARGER-P-VALUE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A test statistic is a distance from home base — the number alone tells you nothing until you
  know how far 'usual' distances typically are."**
- **Anti-analogy**: a bigger test statistic is not "a bigger probability" any more than a farther
  archery shot from the target center is "closer" — extremity and probability move in OPPOSITE
  directions here.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $z=2.5$-versus-$z=0.3$ evidential-strength comparison.
- **Demonstration 2**: matching test types (known-$\sigma$ mean test, unknown-$\sigma$ mean test,
  goodness-of-fit test) to their reference distributions ($z$, $t$, $\chi^2$).
- **Demonstration 3 (targets MC-2)**: the extreme-tail-versus-center statistic p-value comparison.

## Discovery Questions
1. "Does the number '2.5' by itself tell you anything about the strength of evidence against H0,
   without knowing what distribution it's being compared against?"
2. "Does a one-sample mean test with known σ use the same reference distribution as one with
   unknown σ?"
3. "If one test statistic is more extreme (farther into the tail) than another, does it have a
   larger or smaller p-value?"

## Teaching Sequence
1. **Conceptual shift**: the evidential-position-on-the-null-distribution framing, working
   Demonstration 1, isolating MC-1.
2. **Reused procedure**: matching test types to reference distributions, working Demonstration 2.
3. **Contrast pair**: the extreme-versus-central statistic p-value comparison, working
   Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct evidential interpretation of a test statistic's magnitude, a
   correct reference-distribution match, and a correct statement of the inverse
   extremity/p-value relationship, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a test statistic's value interpreted without reference to its null distribution.
- Never accept a claim that a larger test statistic implies a larger p-value.
- Never accept a reference distribution matched incorrectly to its test type without correction.

## Voice Teaching Notes
- Say "where does that value sit on the null distribution — near the center, or out in the tail?"
  whenever a test statistic is reported without interpretation.
- Ask "is a more extreme statistic more or less likely under H0 — and what does that do to the
  p-value?" whenever the extremity/p-value relationship is stated.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why a larger-magnitude test statistic
  indicates stronger evidence against $H_0$.
- **Rung 2 (application)**: learner correctly matches a test scenario to its appropriate reference
  distribution.
- **Rung 3 (transfer)**: learner correctly compares evidence strength across two studies using
  their test statistics' positions relative to their null distributions.

## Tutor Recovery Strategy
- If MC-1 recurs, re-visualize the test statistic's position on the null distribution's curve.
- If MC-2 recurs, re-derive the tail-probability definition of the p-value explicitly.

## Memory Hooks
- "A test statistic's meaning comes from where it sits on the null curve — never from the bare
  number."
- "z, t, χ², F — different tests borrow different known distributions."
- "More extreme means less tail area beyond it — a smaller p-value, never a larger one."

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  broader five-step procedure this concept's test statistic is the central computational tool
  within, and the p-value definition this concept's inverse relationship directly depends on.

## Cross-Subject Connections
- Clinical trial reporting: comparing test statistics across studies (e.g. $t=4.1$ versus $t=0.8$)
  to judge relative evidence strength is a routine task in evaluating competing research findings.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.test-statistic.md`, reused by
  reference for its $z=2.5$-versus-$z=0.3$ evidential comparison, its reference-distribution
  matching examples, its extreme-versus-central statistic contrast, and its two-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe comparing a clinical trial's $t=4.1$
  against another's $t=0.8$, explaining why an uninterpreted bare statistic value is meaningless
  as evidence.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 203): authored. First entry this batch. Companion batch concept:
  `math.stats.type-errors`.
