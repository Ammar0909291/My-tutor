# math.stats.two-way-anova

## Identity
- **KG id**: `math.stats.two-way-anova`
- **Domain**: math.stats
- **Requires**: `math.stats.anova`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Extend one-way ANOVA to TWO categorical factors, testing THREE distinct hypotheses — main effect
of A, main effect of B, and the A-by-B interaction — NEVER a single combined "does anything
matter" test; interpret a significant interaction as CHANGING how main effects must be read,
NEVER reported alone when the interaction is significant; and distinguish BLOCKING (controlling
noise) from a genuine research-interest factor — NEVER conflated.

## Core Understanding
TWO-WAY ANOVA TESTS THREE SEPARATE HYPOTHESES — NEVER ONE COMBINED "DOES ANYTHING MATTER" TEST:
for a study testing BOTH "fertilizer type" (Factor A) and "watering frequency" (Factor B) on
plant growth: THREE distinct hypotheses are tested — (1) main effect of fertilizer type (averaged
across watering frequencies), (2) main effect of watering frequency (averaged across fertilizer
types), (3) the fertilizer-by-watering INTERACTION (does fertilizer's effect depend on watering
frequency?). Treating two-way ANOVA as testing only ONE combined hypothesis misses that it
decomposes into THREE separate, individually-testable effects, each with its OWN $F$-statistic
and its OWN conclusion.

A SIGNIFICANT INTERACTION CAN MASK OR INVALIDATE A NAIVE MAIN-EFFECT READING — NEVER REPORTED
AWAY: a study finds a SIGNIFICANT interaction between "drug dosage" and "patient age group,"
where the drug HELPS young patients but HARMS elderly patients (opposite effects), yet the
"average" main effect of dosage appears roughly ZERO (the opposite effects cancel out). Reporting
"dosage has no significant main effect" ALONE is MISLEADING — the zero-looking main effect masks
a genuinely important, STRONG interaction; the drug's TRUE effect varies dramatically by age
group. When an interaction is significant, it must be examined and reported explicitly — it can
FUNDAMENTALLY change or invalidate a naive main-effect-only interpretation, never safely ignored.

BLOCKING CONTROLS NOISE — IT IS NEVER THE SAME AS A GENUINE RESEARCH-INTEREST FACTOR: an
agricultural experiment tests fertilizer types across plots on FIVE different days, including
"day" as a BLOCKING factor to account for day-to-day weather variation. "Fertilizer type" is the
genuine RESEARCH-INTEREST factor — the actual scientific question. "Day" is included specifically
to ACCOUNT FOR AND REMOVE day-to-day noise from the residual variance, improving the fertilizer
comparison's precision — the researcher does NOT fundamentally care about "which day was best,"
only about controlling for its nuisance variability; conflating a blocking factor with a genuine
research factor misreads WHY it was included in the design.

## Mental Models
- **"Two-way ANOVA is three separate questions in one design — never one combined verdict."**
- **"A significant interaction can hide behind a null-looking main effect — never trust the
  average without checking for one."**
- **"Blocking controls the noise you don't care about — never the question you're actually
  asking."**

## Why Students Fail

### MC-1: TWO-WAY-ANOVA-TREATED-AS-TESTING-ONE-COMBINED-HYPOTHESIS-RATHER-THAN-THREE-SEPARATE-EFFECTS
- **Surface form**: treats two-way ANOVA as testing a single combined "does anything matter"
  hypothesis, rather than recognizing it decomposes into three separately-testable effects.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-list each of the three effects explicitly, with its own null hypothesis.

### MC-2: SIGNIFICANT-INTERACTION-OVERLOOKED-WHILE-ONLY-MAIN-EFFECTS-ARE-REPORTED
- **Surface form**: reports and interprets only the main effects while overlooking or downplaying
  a significant interaction that changes the correct interpretation.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-examine the interaction plot/pattern explicitly, confirming it changes the
  correct interpretation of the main effects.

## Misconceptions

### MC-1: TWO-WAY-ANOVA-TREATED-AS-TESTING-ONE-COMBINED-HYPOTHESIS-RATHER-THAN-THREE-SEPARATE-EFFECTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SIGNIFICANT-INTERACTION-OVERLOOKED-WHILE-ONLY-MAIN-EFFECTS-ARE-REPORTED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two-way ANOVA is like checking three separate gauges on a dashboard — never one dial that
  tells you everything at once."**
- **Anti-analogy**: a null-looking average effect isn't proof of "no effect" — like two equal and
  opposite forces cancelling to zero net motion, a real, strong effect can hide entirely behind a
  misleading average.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the fertilizer-type-and-watering-frequency three-hypothesis
  listing.
- **Demonstration 2 (targets MC-2)**: the drug-dosage-by-age-group opposite-effects-cancel-to-
  zero example.
- **Demonstration 3**: the fertilizer-versus-day blocking-factor distinction.

## Discovery Questions
1. "Does a two-way ANOVA test one combined hypothesis, or three separate ones?"
2. "Could a main effect look like zero on average, even when the true effect is strong but
   opposite in different subgroups?"
3. "Is a blocking factor included because the researcher cares about its own effect, or to
   control for noise?"

## Teaching Sequence
1. **Conceptual shift**: the three-separate-hypotheses listing, working Demonstration 1, isolating
   MC-1.
2. **Contrast pair**: the interaction-masks-main-effect example, working Demonstration 2,
   isolating MC-2.
3. **Reused procedure**: the blocking-versus-research-factor distinction, working Demonstration 3.
4. **Mastery gate**: require a correct listing of the three tested hypotheses, a correct
   explanation of why a significant interaction must be reported and examined, and a correct
   distinction between a blocking factor and a research-interest factor, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept two-way ANOVA described as testing one combined hypothesis rather than three
  separate effects.
- Never accept a significant interaction overlooked while only main effects are reported.
- Never accept a blocking factor conflated with a genuine research-interest factor.

## Voice Teaching Notes
- Say "which of the three effects — main A, main B, or the interaction — are you talking about?"
  whenever a two-way ANOVA result is discussed.
- Ask "is the interaction significant, and if so, have you checked whether it changes how the
  main effects should be read?" whenever main effects alone are reported.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly lists the three hypotheses a two-way ANOVA tests for
  a given scenario.
- **Rung 2 (application)**: learner correctly explains why a significant interaction can make a
  null-looking main effect misleading.
- **Rung 3 (transfer)**: learner correctly interprets a training-program-by-shift interaction and
  proposes a targeted recommendation rather than a blanket one.

## Tutor Recovery Strategy
- If MC-1 recurs, re-list each of the three effects explicitly with its own null hypothesis.
- If MC-2 recurs, re-examine the interaction pattern explicitly.

## Memory Hooks
- "Two-way ANOVA: three hypotheses, never one."
- "A significant interaction can hide behind a null-looking average — always check it."
- "Blocking controls noise, never the question you're actually studying."

## Transfer Connections
- `math.stats.anova` (already authored, this campaign, Batch 211): supplies the one-way ANOVA
  framework (variance partition, F-test, significance-doesn't-pinpoint-pairs caution) this
  concept directly extends to two factors.

## Cross-Subject Connections
- Business and organizational research: testing whether a training program's effect differs by
  work shift is a realistic, high-stakes scenario where overlooking an interaction could lead to
  a poorly-targeted intervention decision.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.two-way-anova.md`, reused by
  reference for its three-hypothesis fertilizer/watering example, its drug-dosage-by-age-group
  interaction example, its fertilizer-versus-day blocking example, and its two-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a company's training-program-by-
  work-shift interaction, evaluating a blanket rollout recommendation against the specific
  interaction pattern.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.stats.anova`,
  unlocks none, cross_links none, expert/apply, mastery_threshold 0.75, estimated_hours 6) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 212): authored. Second entry this batch. Companion batch concept:
  `math.stats.correlation`.
