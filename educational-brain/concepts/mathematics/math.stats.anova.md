# math.stats.anova

## Identity
- **KG id**: `math.stats.anova`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`
- **Unlocks**: `math.stats.two-way-anova`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
State ANOVA's hypothesis setup ($H_0$: all $k$ group means equal, $H_1$: at least one differs) as
ONE combined test, NEVER equivalent to running separate pairwise comparisons; compute the exact
variance partition $SS_{Total}=SS_{Between}+SS_{Within}$ and $F=MS_{Between}/MS_{Within}$,
recognizing this decomposition as a guaranteed algebraic IDENTITY, NEVER a coincidental
relationship; and interpret a significant $F$ as proving AT LEAST ONE group differs, NEVER
identifying which specific pair(s) — while recognizing ANOVA's assumptions must be CHECKED, never
assumed automatically.

## Core Understanding
ANOVA IS ONE COMBINED TEST CONTROLLING THE OVERALL ERROR RATE — NEVER EQUIVALENT TO REPEATED
PAIRWISE T-TESTS: testing three fertilizer types for equal mean crop yield, $H_0:\mu_A=\mu_B=
\mu_C$: running three SEPARATE pairwise t-tests instead, each at $\alpha=0.05$, inflates the
OVERALL chance of at least one false positive to roughly $1-(0.95)^3\approx14.3\%$ — noticeably
higher than the intended 5%. ANOVA's single combined $F$-test avoids this inflation, testing all
three means at once while controlling the overall error rate at the stated $\alpha$ — NEVER a
mere shortcut for running several t-tests.

THE VARIANCE PARTITION IS A GUARANTEED ALGEBRAIC IDENTITY — NEVER A COINCIDENTAL RELATIONSHIP: for
Group A: $2,4$; Group B: $6,8$; Group C: $10,12$ (grand mean $7$): $SS_{Total}=25+9+1+1+9+25=70$,
$SS_{Between}=2(16)+2(0)+2(16)=64$, $SS_{Within}=2+2+2=6$. Check: $64+6=70=SS_{Total}$ EXACTLY —
this is guaranteed by construction, never a coincidence to verify after the fact. $F=
\frac{64/2}{6/3}=\frac{32}{2}=16$, a large value; treating $SS_{Between}$ and $SS_{Within}$ as two
independently-computed numbers that merely happen to relate misses that they ALWAYS sum to
$SS_{Total}$ exactly.

A SIGNIFICANT $F$ PROVES ONLY THAT SOME DIFFERENCE EXISTS — NEVER WHICH SPECIFIC PAIR(S): for the
same data, $F=16$ is large, strong evidence against $H_0$ — SOME group's mean genuinely differs.
But despite the sample means ($3,7,11$) LOOKING like every pair differs, this ANOVA result ALONE
does not formally establish whether it's $A\ne B$, $A\ne C$, $B\ne C$, or all three — pinpointing
which specific pair(s) requires a SEPARATE post-hoc test (e.g. Tukey's HSD), never part of the
ANOVA $F$-test itself. Separately, ANOVA's validity depends on its stated assumptions
(approximately equal variances, approximate normality) genuinely holding — the $F(k-1,N-k)$
comparison is not automatically trustworthy if these are badly violated, never assumed by default.

## Mental Models
- **"ANOVA answers 'does ANY group differ?' in one controlled step — never the same thing as
  running a t-test on every pair."**
- **"SS_Total = SS_Between + SS_Within is guaranteed algebra — never a lucky coincidence to
  double-check."**
- **"A significant F is an existence claim, never a map — it says something differs, not which
  pair, and it assumes equal variances and normality actually hold."**

## Why Students Fail

### MC-1: ANOVA-CONFLATED-WITH-REPEATED-PAIRWISE-TESTS
- **Surface form**: believes ANOVA is essentially the same as running a separate pairwise t-test
  for every pair of groups, missing the overall-error-rate control a single combined test
  provides.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the inflated overall-error-rate computation, re-anchoring on "ANOVA is a
  single test controlling the overall false-positive risk — repeated pairwise testing does not."

### MC-2: SS-DECOMPOSITION-TREATED-AS-COINCIDENTAL
- **Surface form**: treats $SS_{Between}$ and $SS_{Within}$ as independently computed quantities
  that happen to relate, rather than an exact, guaranteed algebraic decomposition of $SS_{Total}$.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the exact numerical verification ($64+6=70$), re-anchoring on "this is an
  algebraic identity — it holds exactly, every time, by construction."

### MC-3: SIGNIFICANT-F-ASSUMED-TO-IDENTIFY-WHICH-GROUPS-DIFFER
- **Surface form**: believes a significant ANOVA F-test identifies specifically which groups
  differ from each other, missing that it only establishes that at least one difference exists
  somewhere.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the discussion, re-anchoring on "a significant F is an existence claim
  only — pinpointing which pair(s) differ needs a separate post-hoc test."

## Misconceptions

### MC-1: ANOVA-CONFLATED-WITH-REPEATED-PAIRWISE-TESTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SS-DECOMPOSITION-TREATED-AS-COINCIDENTAL
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: SIGNIFICANT-F-ASSUMED-TO-IDENTIFY-WHICH-GROUPS-DIFFER
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"ANOVA is one smoke detector covering the whole building, never three separate detectors each
  with their own chance of a false alarm stacking up."**
- **Anti-analogy**: a significant F-test is like a smoke alarm going off — it tells you smoke
  exists SOMEWHERE, never which specific room it's in; finding the room needs a separate,
  targeted check (a post-hoc test).

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the three-pairwise-tests inflated-error-rate computation
  ($\approx14.3\%$) versus ANOVA's controlled $\alpha$.
- **Demonstration 2 (targets MC-2)**: the exact $64+6=70$ variance-partition verification.
- **Demonstration 3 (targets MC-3)**: the significant-$F=16$-doesn't-pinpoint-pairs discussion,
  plus the equal-variances assumption caution.

## Discovery Questions
1. "Is running ANOVA basically the same as running a pairwise t-test for every pair of groups?"
2. "Are SS_Between and SS_Within just two separately computed numbers that happen to be related,
   or are they guaranteed to add up to SS_Total exactly?"
3. "If ANOVA's F-test is significant, does that tell you specifically which groups differ from
   each other?"

## Teaching Sequence
1. **Conflict evidence**: the inflated-pairwise-error-rate demonstration, working Demonstration 1,
   isolating MC-1.
2. **Representation shift**: the exact variance-partition identity, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the significant-F-versus-pinpointing-pairs distinction plus the
   assumption-violation caution, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct hypothesis statement, a correct variance-partition and $F$
   computation with identity verification, and a correct explanation of what a significant $F$
   does and does not establish, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept ANOVA described as equivalent to running separate pairwise t-tests.
- Never accept the SS decomposition treated as coincidental rather than guaranteed.
- Never accept a significant F-test claimed to identify which specific groups differ.

## Voice Teaching Notes
- Say "would running several separate t-tests here inflate your overall error rate?" whenever
  ANOVA versus pairwise testing is being compared.
- Ask "does a significant F tell you which pair differs, or just that some difference exists?"
  whenever an ANOVA result is being interpreted.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states ANOVA's combined hypothesis setup.
- **Rung 2 (application)**: learner correctly computes the variance partition and $F$ statistic,
  verifying the decomposition identity.
- **Rung 3 (transfer)**: learner correctly explains what a significant $F$ does and does not
  establish in a novel dosage-comparison scenario, and identifies the assumption-violation risk.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the inflated overall-error-rate computation.
- If MC-2 recurs, re-walk the exact numerical variance-partition verification.
- If MC-3 recurs, re-walk the significant-F-is-an-existence-claim discussion.

## Memory Hooks
- "ANOVA is one test controlling the overall error rate — never the same as many pairwise tests."
- "SS_Total = SS_Between + SS_Within is guaranteed algebra — never a coincidence."
- "A significant F says something differs — never which pair, and never without checked
  assumptions."

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  five-step procedure and p-value interpretation this concept's F-test directly follows.
- `math.prob.continuous-distributions` (already authored, certified domain): supplies the
  named-continuous-distribution framework the $F(k-1,N-k)$ distribution instantiates.
- `math.stats.two-way-anova` (unlocked by this concept, not yet authored): will extend this
  concept's single-factor variance partition to two simultaneous grouping factors.

## Cross-Subject Connections
- Agricultural and pharmaceutical research: comparing mean outcomes (crop yield, blood pressure
  reduction) across several treatment groups is a standard, realistic ANOVA application.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.anova.md`, reused by reference for
  its inflated-pairwise-error-rate example, its exact variance-partition computation, its
  significant-F-interpretation caution, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a pharmaceutical researcher
  comparing four drug dosages, explaining what a significant F establishes and the risk of
  unequal variances across groups.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`/`math.prob.continuous-distributions`, unlocks
  `math.stats.two-way-anova`, cross_links none, expert/apply, mastery_threshold 0.8,
  estimated_hours 6) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 211): authored. First entry this batch. Companion batch concept:
  `math.prob.correlation`.
