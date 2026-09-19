# math.stats.experimental-design

## Identity
- **KG id**: `math.stats.experimental-design`
- **Domain**: math.stats
- **Requires**: `math.stats.sampling`, `math.stats.anova`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: evaluate
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Apply the three core principles — randomization, replication, blocking; recognize randomization
specifically as what CONTROLS FOR CONFOUNDING and enables CAUSAL inference, NEVER something
observational data can substitute for; and distinguish CRD, RCBD, and factorial designs, each
addressing a DIFFERENT practical concern — NEVER interchangeable choices.

## Core Understanding
RANDOMIZATION IS WHAT ENABLES CAUSAL CLAIMS — NEVER SOMETHING OBSERVATIONAL DATA CAN SUBSTITUTE
FOR: a researcher testing a new fertilizer RANDOMLY assigns half of 100 plots to receive it. Since
assignment is RANDOM, any other factor affecting yield (soil quality, sunlight) is, on AVERAGE,
equally distributed between groups — ruling out these factors as SYSTEMATIC alternative
explanations, which is precisely what licenses the causal claim. Assuming an OBSERVATIONAL study
(where farmers CHOOSE whether to use the fertilizer themselves) would support the SAME causal
conclusion is WRONG — without random assignment, farmers who CHOOSE the fertilizer might
systematically differ in other ways (e.g. more attentive farming overall) that CONFOUND the
fertilizer's true effect, making a causal claim unjustified from observational data alone.

BLOCKING ON A KNOWN NOISE SOURCE IMPROVES PRECISION — NEVER AN OPPORTUNITY TO SKIP WHEN AVAILABLE:
for an experiment run across FIVE distinct greenhouse locations (each with its own microclimate):
an RCBD (treating "greenhouse location" as a BLOCKING factor) is more appropriate than a simple
CRD — since the microclimates are a KNOWN source of variability, blocking by greenhouse REMOVES
this noise from the residual variance, making the treatment comparison more PRECISE. Using a
simple CRD (ignoring the greenhouse structure entirely) even when a KNOWN, exploitable source of
variability is available misses this opportunity to improve precision.

FACTORIAL DESIGNS CAPTURE INTERACTIONS THAT SEPARATE EXPERIMENTS WOULD MISS — NEVER
INTERCHANGEABLE WITH RUNNING TWO SINGLE-FACTOR STUDIES: for studying BOTH fertilizer type AND
irrigation method's effects on crop yield SIMULTANEOUSLY, including whether they interact: a
factorial design (analyzed via two-way ANOVA) allows testing BOTH main effects AND their
INTERACTION in ONE combined experiment — running two SEPARATE single-factor experiments would
MISS any interaction effect entirely (each experiment holds the other factor fixed or ignores it)
and would generally require MORE total resources to achieve the same statistical precision.

## Mental Models
- **"Randomization is what earns you the right to say 'causes' — observational data, no matter
  how large, never earns that on its own."**
- **"A known noise source you don't block on is precision left on the table — never a neutral
  choice."**
- **"A factorial design answers three questions at once — never the same as two separate
  one-question experiments."**

## Why Students Fail

### MC-1: OBSERVATIONAL-NON-RANDOMIZED-DATA-ASSUMED-TO-SUPPORT-THE-SAME-CAUSAL-CONCLUSIONS-AS-RANDOMIZED-EXPERIMENTS
- **Surface form**: assumes observational (non-randomized) data can support the same strength of
  causal conclusion as a properly randomized experiment.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-identify the confounding risk present in the observational scenario, contrasting
  with the randomized design's confounding control.

### MC-2: BLOCKING-OPPORTUNITY-ON-A-KNOWN-NOISE-SOURCE-MISSED-IN-FAVOR-OF-A-SIMPLER-CRD
- **Surface form**: uses a simple Completely Randomized Design even when a known, exploitable
  source of variability is available to block on, missing an opportunity to improve precision.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-identify the known nuisance source explicitly and re-design using blocking to
  control for it.

## Misconceptions

### MC-1: OBSERVATIONAL-NON-RANDOMIZED-DATA-ASSUMED-TO-SUPPORT-THE-SAME-CAUSAL-CONCLUSIONS-AS-RANDOMIZED-EXPERIMENTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: BLOCKING-OPPORTUNITY-ON-A-KNOWN-NOISE-SOURCE-MISSED-IN-FAVOR-OF-A-SIMPLER-CRD
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Random assignment is a lottery that evens out every other advantage between groups — an
  observational comparison never runs that lottery, so hidden advantages can stay stacked on one
  side."**
- **Anti-analogy**: ignoring a known blocking opportunity isn't "keeping things simple" — it's
  leaving a genuinely available precision gain unused, like refusing to use a known shortcut on a
  map.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the randomized-fertilizer-trial versus farmer-choice
  observational-comparison contrast.
- **Demonstration 2 (targets MC-2)**: the five-greenhouse RCBD-versus-CRD precision comparison.
- **Demonstration 3**: the fertilizer-and-irrigation factorial-versus-two-separate-experiments
  comparison.

## Discovery Questions
1. "Does an observational study, where subjects choose their own treatment, support the same
   causal conclusion as a randomized experiment?"
2. "If you know experimental units differ by a specific known factor, should you ignore that and
   use a simple CRD anyway?"
3. "Does running two separate single-factor experiments give you the same information as one
   factorial design?"

## Teaching Sequence
1. **Conceptual shift**: the randomized-versus-observational confounding contrast, working
   Demonstration 1, isolating MC-1.
2. **Contrast pair**: the RCBD-versus-CRD precision comparison, working Demonstration 2, isolating
   MC-2.
3. **Reused procedure**: the factorial-versus-separate-experiments comparison, working
   Demonstration 3.
4. **Mastery gate**: require a correct explanation of why randomization controls confounding, a
   correct CRD-versus-RCBD design choice for a given scenario, and a correct explanation of why a
   factorial design captures interactions separate experiments would miss, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept observational data claimed to support the same causal strength as a randomized
  experiment.
- Never accept a simple CRD chosen when a known, exploitable blocking opportunity is available.
- Never accept two separate single-factor experiments claimed to be equivalent to one factorial
  design.

## Voice Teaching Notes
- Say "were treatments assigned randomly, or did subjects choose for themselves?" whenever a
  causal claim is being evaluated.
- Ask "is there a known source of variability here you could block on?" whenever an experimental
  design is being chosen.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why random assignment controls for
  confounding.
- **Rung 2 (application)**: learner correctly chooses between a CRD and RCBD for a given
  experimental scenario.
- **Rung 3 (transfer)**: learner correctly identifies a confounding variable undermining an
  observational comparison in a pharmaceutical scenario, favoring the randomized alternative.

## Tutor Recovery Strategy
- If MC-1 recurs, re-identify the confounding risk in the observational scenario.
- If MC-2 recurs, re-identify the known nuisance source and re-design using blocking.

## Memory Hooks
- "Randomization earns causal claims — observational data never does on its own."
- "A known noise source left unblocked is precision left on the table."
- "A factorial design answers three questions — never the same as two separate experiments."

## Transfer Connections
- `math.stats.sampling` (already authored, certified domain): supplies the broader
  data-collection context experimental design operates within.
- `math.stats.anova` (already authored, this campaign, Batch 211): supplies the analysis
  framework these designs typically feed into.
- `math.stats.two-way-anova` (already authored, this campaign, Batch 212): supplies the
  main-effects-and-interaction framework factorial designs directly connect to.

## Cross-Subject Connections
- Medicine and public policy: randomized controlled trials versus observational studies is one of
  the most consequential real-world applications of the randomization-enables-causation
  principle.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.experimental-design.md`, reused by
  reference for its randomized-fertilizer-trial example, its five-greenhouse RCBD example, its
  fertilizer-and-irrigation factorial example, and its two-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a pharmaceutical company
  choosing between a randomized drug trial and an observational supplement comparison, identifying
  a plausible confounding variable.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sampling`/`math.stats.anova`, unlocks none, cross_links none, expert/evaluate,
  mastery_threshold 0.75, estimated_hours 6) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 213): authored. Second entry this batch. Companion batch concept:
  `math.stats.linear-regression`.
