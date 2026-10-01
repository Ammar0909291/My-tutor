# math.stats.nonparametric

## Identity
- **KG id**: `math.stats.nonparametric`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Recognize nonparametric tests make NO assumption about the underlying distribution's shape,
appropriate when normality is genuinely violated, especially for SMALL samples; match the correct
test to its scenario — Wilcoxon signed-rank for PAIRED data, Mann-Whitney U for TWO independent
samples, Kruskal-Wallis for $k$ independent samples — NEVER the wrong structural match; and
recognize these tests are based on RANKS, gaining robustness to outliers at the cost of some
magnitude information.

## Core Understanding
NONPARAMETRIC TESTS ARE PREFERRED FOR SMALL, NON-NORMAL SAMPLES — NEVER A DEFAULT $t$-TEST
REGARDLESS OF SHAPE: for a SMALL sample ($n=8$) with clearly non-normal, heavily skewed data: with
such a small sample, the Central Limit Theorem's normalizing effect on the sample mean hasn't
kicked in strongly enough to reliably compensate for the population's genuine non-normality — a
nonparametric test (making NO distributional assumption) avoids this risk entirely. Defaulting to
the $t$-test REGARDLESS of sample size or apparent distribution shape, without considering a
nonparametric alternative, is WRONG for this specific small, skewed scenario.

THE CORRECT NONPARAMETRIC TEST MUST MATCH THE DATA'S STRUCTURE — NEVER A DEFAULT "TWO-SAMPLE"
CHOICE: a study measures the SAME 12 patients' pain levels BEFORE and AFTER treatment (matched
pairs), with non-normal data. Since the data is PAIRED, the Wilcoxon SIGNED-RANK test is
appropriate — NOT the Mann-Whitney U test, which is designed for TWO INDEPENDENT samples. Applying
Mann-Whitney to genuinely PAIRED data (treating before/after as independent groups) mirrors the
EXACT SAME paired-vs-independent structural mismatch error seen with the parametric $t$-test
variants — the data's actual pairing structure must be matched to the correct nonparametric test,
never defaulted to the "two-sample" version regardless.

RANKS PROVIDE ROBUSTNESS TO OUTLIERS AT THE COST OF MAGNITUDE INFORMATION — THE TRADE-OFF THAT
ENABLES DISTRIBUTION-FREE VALIDITY: converting $\{3,7,50,9\}$ to ranks $\{1,3,4,2\}$: once
converted to ranks, the value $50$'s EXTREME magnitude no longer matters — it simply becomes "the
largest," rank 4, exactly as it would if it had been $10$ instead of $50$; the outlier's
disproportionate influence on the RAW numeric analysis is ELIMINATED by working with ranks instead
of exact values. This is precisely WHY nonparametric tests don't require distributional
assumptions — ranks discard some information about exact magnitudes, but gain ROBUSTNESS to
non-normality and outliers in exchange, never a free improvement with no trade-off.

## Mental Models
- **"When normality is questionable and n is small, reach for a nonparametric test — never a
  reflexive t-test regardless of shape."**
- **"Match the test to the data's structure — paired needs Wilcoxon, independent needs
  Mann-Whitney or Kruskal-Wallis, never the wrong pairing."**
- **"Ranks trade exact magnitude for robustness — an outlier becomes just 'the largest,' never a
  distorting extreme value."**

## Why Students Fail

### MC-1: T-TEST-DEFAULTED-TO-REGARDLESS-OF-SAMPLE-SIZE-OR-DISTRIBUTION-SHAPE
- **Surface form**: defaults to a t-test regardless of sample size or apparent distribution
  shape, without considering a nonparametric alternative when appropriate.
- **Birth type**: Moderate severity (Blueprint's own declared severity — suboptimal but often
  still usable for moderately-sized samples).
- **Repair**: re-examine the sample size and apparent distribution, weighing whether a
  nonparametric alternative is warranted.

### MC-2: WRONG-NONPARAMETRIC-TEST-USED-FOR-PAIRED-VS-INDEPENDENT-DATA-STRUCTURE
- **Surface form**: uses the wrong nonparametric test (e.g. Mann-Whitney for genuinely paired
  data) that doesn't match the data's actual paired or independent structure.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-identify whether the data is paired or independent, selecting the matching
  nonparametric test.

## Misconceptions

### MC-1: T-TEST-DEFAULTED-TO-REGARDLESS-OF-SAMPLE-SIZE-OR-DISTRIBUTION-SHAPE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-2: WRONG-NONPARAMETRIC-TEST-USED-FOR-PAIRED-VS-INDEPENDENT-DATA-STRUCTURE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Ranks are like a race's finishing order — you keep who beat whom, never the exact stopwatch
  times, and a photo-finish outlier can't distort the standings."**
- **Anti-analogy**: choosing a nonparametric test isn't "always the safer choice" — it's a
  trade-off that discards magnitude information, appropriate specifically when distributional
  assumptions are genuinely in doubt, never a universal default.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the small-skewed-sample ($n=8$) nonparametric-preferred
  example.
- **Demonstration 2 (targets MC-2)**: the paired-pain-scores Wilcoxon-versus-Mann-Whitney
  mismatch example.
- **Demonstration 3**: the $\{3,7,50,9\}\to\{1,3,4,2\}$ rank-conversion outlier-robustness
  example.

## Discovery Questions
1. "For a small, clearly skewed sample, is the t-test still the right default choice?"
2. "If the same subjects are measured twice, is Mann-Whitney the right test?"
3. "Why does converting to ranks make a test robust to an extreme outlier?"

## Teaching Sequence
1. **Conceptual shift**: the small-sample non-normality reasoning, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the paired-versus-independent test-matching distinction, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the rank-conversion outlier-robustness demonstration, working
   Demonstration 3.
4. **Mastery gate**: require a correct justification for choosing a nonparametric test given
   sample size and shape, a correct test selection for a given data structure, and a correct
   explanation of why ranks provide robustness, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a t-test defaulted to without considering sample size and distribution shape.
- Never accept Mann-Whitney applied to genuinely paired data, or any other structural mismatch.
- Never accept ranks described as a free improvement with no information trade-off.

## Voice Teaching Notes
- Say "is this sample small and skewed enough that a nonparametric test would be safer?" whenever
  a test family is being chosen.
- Ask "is this data paired or independent — and does your chosen test match that structure?"
  whenever a nonparametric test is selected.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why a nonparametric test is preferred for
  a small, skewed sample.
- **Rung 2 (application)**: learner correctly selects the matching nonparametric test for a given
  paired or independent data structure.
- **Rung 3 (transfer)**: learner correctly identifies the appropriate nonparametric test for a
  skewed customer-satisfaction comparison between two independent groups.

## Tutor Recovery Strategy
- If MC-1 recurs, re-examine sample size and distributional shape together.
- If MC-2 recurs, re-identify the data's pairing structure and re-select the matching test.

## Memory Hooks
- "Small and skewed means nonparametric — never a reflexive t-test."
- "Paired needs Wilcoxon, independent needs Mann-Whitney/Kruskal-Wallis — never mismatched."
- "Ranks trade magnitude for robustness — an outlier just becomes 'the largest.'"

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  general hypothesis-testing framework these tests operate as alternative procedures within.

## Cross-Subject Connections
- Customer satisfaction research: skewed rating-scale data (many extreme 1s and 10s) is a
  genuinely realistic scenario motivating nonparametric methods over a default t-test.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.nonparametric.md`, reused by
  reference for its small-skewed-sample example, its paired-pain-scores test-matching example,
  its rank-conversion outlier-robustness example, and its two-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on comparing skewed customer
  satisfaction scores between two independent groups, identifying the appropriate nonparametric
  test.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.75, estimated_hours 5) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 214): authored. Second entry this batch. Companion batch concept:
  `math.stats.multiple-regression`.
