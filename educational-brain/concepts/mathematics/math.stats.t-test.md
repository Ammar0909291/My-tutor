# math.stats.t-test

## Identity
- **KG id**: `math.stats.t-test`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Apply the one-sample $t$-test for $H_0:\mu=\mu_0$ when $\sigma$ is UNKNOWN, computing
$T=(\bar X-\mu_0)/(S/\sqrt n)\sim t(n-1)$, NEVER using the normal distribution's critical value in
its place; distinguish the three variants — one-sample, two-sample, and PAIRED (which analyzes
WITHIN-PAIR differences, never treated as two independent groups); and recognize robustness to
non-normality is a LARGE-sample property, NEVER assumed automatically for small samples.

## Core Understanding
UNKNOWN $\sigma$ REQUIRES THE $t$-DISTRIBUTION'S CRITICAL VALUE — NEVER THE NORMAL DISTRIBUTION'S:
testing $H_0:\mu=20$, $H_a:\mu\ne20$, with $\bar x=22$, ESTIMATED $s=4$, $n=25$:
$T=(22-20)/(4/\sqrt{25})=2/0.8=2.5$, compared against $t_{0.025,24}\approx2.064$ — since
$2.5>2.064$, REJECT $H_0$. Using the NORMAL distribution's critical value ($1.96$) instead is
WRONG here — since $\sigma$ is ESTIMATED (not known), the $t$-distribution's fatter tails, which
account for the extra estimation uncertainty, are the correct reference, never the normal.

PAIRED DATA REQUIRES THE PAIRED $t$-TEST — NEVER TREATED AS TWO INDEPENDENT GROUPS: for 15
patients' blood pressure measured BEFORE and AFTER treatment (the SAME patients, matched pairs):
since the before/after values are NATURALLY CORRELATED (each patient is their own baseline), the
PAIRED test correctly analyzes the WITHIN-PATIENT DIFFERENCES directly — first computing each
pair's difference, then running an ordinary ONE-SAMPLE test on those differences. Treating "before"
and "after" as two INDEPENDENT groups (a two-sample test) IGNORES the pairing structure entirely,
discarding valuable information and typically producing a LESS POWERFUL or misleading result.

ROBUSTNESS TO NON-NORMALITY IS A LARGE-SAMPLE PROPERTY — NEVER A UNIVERSAL GUARANTEE: for a large
sample ($n=200$) from a SKEWED population, the Central Limit Theorem ensures $\bar X$'s sampling
distribution is approximately normal REGARDLESS of the underlying population's shape, making the
$t$-test reasonably robust. For a SMALL sample ($n=8$) from an equally skewed population, there is
NOT enough data for the CLT's approximation to reliably kick in, so the population's genuine
non-normality CAN meaningfully distort the test's validity — robustness is earned by sample size,
never assumed automatically regardless of $n$.

## Mental Models
- **"Unknown σ means fatter tails — the t-distribution's critical value, never the normal's."**
- **"Paired data measures the same subject twice — analyze the within-pair difference, never
  treat the two sets as strangers."**
- **"The t-test's tolerance for non-normal data is something large samples earn — never a free
  pass at any sample size."**

## Why Students Fail

### MC-1: NORMAL-DISTRIBUTION-CRITICAL-VALUE-USED-INSTEAD-OF-T-DISTRIBUTION
- **Surface form**: uses the normal distribution's critical value instead of the t-distribution's
  (with $n-1$ degrees of freedom), when $\sigma$ is estimated rather than known.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-confirm $\sigma$ is unknown/estimated, then re-select the $t$-distribution with
  $n-1$ degrees of freedom.

### MC-2: MATCHED-PAIR-DATA-TREATED-AS-TWO-INDEPENDENT-GROUPS-IGNORING-THE-PAIRING-STRUCTURE
- **Surface form**: analyzes matched-pair data as if it were two independent groups, discarding
  the valuable pairing information a paired $t$-test would exploit.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-identify the matched-pair structure explicitly, computing within-pair differences
  before running a one-sample test.

## Misconceptions

### MC-1: NORMAL-DISTRIBUTION-CRITICAL-VALUE-USED-INSTEAD-OF-T-DISTRIBUTION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: MATCHED-PAIR-DATA-TREATED-AS-TWO-INDEPENDENT-GROUPS-IGNORING-THE-PAIRING-STRUCTURE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Estimating σ from your own sample is like measuring with a slightly shaky ruler — the
  t-distribution's wider critical value is the honest acknowledgment of that shakiness."**
- **Anti-analogy**: treating before/after measurements on the same patients as two strangers'
  data throws away the very thing that makes paired data powerful — that each pair cancels out
  its own baseline noise.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $T=2.5$-versus-$t_{0.025,24}\approx2.064$ computation,
  contrasted with the incorrect normal-based $1.96$ threshold.
- **Demonstration 2 (targets MC-2)**: the before/after blood-pressure paired-versus-independent
  contrast.
- **Demonstration 3**: the $n=200$-versus-$n=8$ robustness-to-non-normality contrast.

## Discovery Questions
1. "Since σ here is estimated from the sample, should you use the normal distribution's critical
   value, or the t-distribution's?"
2. "If the same subjects are measured twice, should you treat 'before' and 'after' as two
   independent groups?"
3. "Does the t-test's tolerance for non-normal data hold equally well at any sample size?"

## Teaching Sequence
1. **Conceptual shift**: the $t$-distribution-versus-normal critical-value correction, working
   Demonstration 1, isolating MC-1.
2. **Contrast pair**: the paired-versus-independent-groups structure, working Demonstration 2,
   isolating MC-2.
3. **Reused procedure**: the large-sample-versus-small-sample robustness contrast, working
   Demonstration 3.
4. **Mastery gate**: require a correct one-sample $t$-test computation, a correct identification
   of the appropriate $t$-test variant for a matched-pair design, and a correct explanation of why
   robustness depends on sample size, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the normal distribution's critical value used when $\sigma$ is estimated rather
  than known.
- Never accept matched-pair data analyzed as two independent groups.
- Never accept "the t-test is robust to non-normality" stated without a sample-size qualification.

## Voice Teaching Notes
- Say "is σ known here, or estimated — and does your critical value come from the right
  distribution?" whenever a $t$-test computation is performed.
- Ask "are these two independent groups, or the same subjects measured twice?" whenever a
  before/after or matched design is analyzed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a one-sample $t$-statistic and compares it
  to the correct $t$-distribution critical value.
- **Rung 2 (application)**: learner correctly identifies which $t$-test variant (one-sample,
  two-sample, paired) applies to a given study design.
- **Rung 3 (transfer)**: learner correctly explains why a large-sample $t$-test remains reasonably
  valid despite non-normal underlying data, while a small-sample one may not.

## Tutor Recovery Strategy
- If MC-1 recurs, re-confirm $\sigma$'s unknown status and re-select the $t$-distribution.
- If MC-2 recurs, re-identify the matched-pair structure and recompute within-pair differences.

## Memory Hooks
- "Estimated σ means the t-distribution, never the normal's critical value."
- "Paired data: subtract within pairs first, never treat as two strangers."
- "Robustness to non-normality is earned by a large sample, never guaranteed at any size."

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  general five-step framework this concept applies with a specific unknown-$\sigma$ test
  statistic.
- `math.prob.continuous-distributions` (already authored, certified domain): supplies the
  continuous-distribution machinery underlying the $t$-distribution's density.
- `math.stats.z-test` (companion batch concept, this batch): the appropriate alternative
  whenever $\sigma$ is genuinely known rather than estimated.

## Cross-Subject Connections
- Clinical and nutrition research: before/after repeated-measures designs (the same subjects
  measured twice) are extremely common, making the paired-versus-independent distinction a
  routine, high-stakes methodological decision.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.t-test.md`, reused by reference for
  its one-sample $t$-statistic computation, its paired-versus-independent-groups contrast, its
  large-sample-versus-small-sample robustness example, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a before/after diet study
  measuring 30 participants' cholesterol, identifying the correct $t$-test variant and assessing
  robustness at that sample size.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`/`math.prob.continuous-distributions`, unlocks none, cross_links
  none, proficient/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 205): authored. Second entry this batch. Companion batch concept:
  `math.stats.z-test`.
