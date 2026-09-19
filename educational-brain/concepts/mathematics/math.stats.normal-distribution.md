# math.stats.normal-distribution

## Identity
- **KG id**: `math.stats.normal-distribution`
- **Domain**: math.stats
- **Requires**: `math.prob.normal-distribution`, `math.stats.descriptive-statistics`
- **Unlocks**: none
- **Cross-links**: `math.prob.normal-distribution`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Apply the 68-95-99.7 rule with the correct percentage-to-standard-deviation PAIRING (never
interchanged); recognize that a Shapiro-Wilk test FAILING TO REJECT normality means only
INSUFFICIENT EVIDENCE against it (never PROOF of normality); and recognize the Central Limit
Theorem guarantees the SAMPLE MEAN becomes approximately normal for large $n$ regardless of the
underlying population's shape.

## Core Understanding
THE 68-95-99.7 PAIRING MUST NOT BE INTERCHANGED: for $\mu=100$, $\sigma=15$: the range containing
approximately 95% of the data is $100\pm2(15)=(70,130)$ — using 2 STANDARD DEVIATIONS, never 1. A
common error computes $100\pm15=(85,115)$ and calls THIS the 95% range, confusing which
percentage pairs with which standard-deviation count. The SPECIFIC pairing (68%↔1SD, 95%↔2SD,
99.7%↔3SD) must be applied EXACTLY as stated, never interchanged.

FAILING TO REJECT NORMALITY IS NEVER PROOF OF NORMALITY: a Shapiro-Wilk test producing $p=0.3$
(failing to reject $H_0$: "data is normal," at $\alpha=0.05$) JUSTIFIES saying "there is
insufficient evidence to conclude the data is NOT normal." It does NOT justify saying "the data
IS PROVEN normal" — a failed rejection NEVER proves the null hypothesis true, only that THIS
particular sample didn't provide strong enough evidence against it. This is the SAME
"absence-of-evidence-isn't-evidence-of-absence" logic that applies to every hypothesis test, never
a special exception for normality testing.

THE CLT MAKES THE SAMPLE MEAN APPROXIMATELY NORMAL REGARDLESS OF THE POPULATION'S SHAPE: for a
researcher with raw data from a clearly SKEWED population but a LARGE sample size ($n=500$):
methods relying on the sample mean's normality (like a $t$-test) remain reasonably TRUSTED here
BECAUSE the Central Limit Theorem guarantees the SAMPLE MEAN's own sampling distribution becomes
approximately normal for large $n$, REGARDLESS of the underlying population's shape — even though
the RAW individual data points are skewed, the $t$-test (which depends on the sample mean's
behavior, never the raw data's individual distribution) remains valid, thanks to the large sample
size alone.

## Mental Models
- **"68-95-99.7 pairs percentages to standard-deviation counts in a fixed order — never swap
  which percentage goes with which count."**
- **"Failing to reject normality is a shrug, not a certificate — it never certifies the data IS
  normal, only that this sample didn't rule it out."**
- **"The CLT rescues the sample MEAN's normality even when the raw data itself is skewed —
  large n is the key ingredient, not the shape of the underlying population."**

## Why Students Fail

### MC-1: PERCENTAGE-TO-STANDARD-DEVIATION-PAIRING-CONFUSED-IN-THE-68-95-99-7-RULE
- **Surface form**: confuses which percentage (68%, 95%, 99.7%) pairs with which number of
  standard deviations (1, 2, 3).
- **Birth type**: Foundational severity (Blueprint's own declared severity — three memorized
  pairings without a firm anchor are easy to scramble).
- **Repair**: re-state the rule explicitly in order — 1SD=68%, 2SD=95%, 3SD=99.7% — before
  applying.

### MC-2: FAILING-TO-REJECT-NORMALITY-TREATED-AS-PROOF-OF-NORMALITY
- **Surface form**: treats a non-significant Shapiro-Wilk test result as definitive proof of
  normality, rather than recognizing it only means insufficient evidence against it.
- **Birth type**: Foundational severity (Blueprint's own declared severity — this is a
  fundamentally incorrect logical conclusion, not merely a computational slip).
- **Repair**: re-apply the general hypothesis-testing logic — failing to reject never proves the
  null hypothesis true.

## Misconceptions

### MC-1: PERCENTAGE-TO-STANDARD-DEVIATION-PAIRING-CONFUSED-IN-THE-68-95-99-7-RULE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: FAILING-TO-REJECT-NORMALITY-TREATED-AS-PROOF-OF-NORMALITY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"68-95-99.7 is a fixed lookup table — 1, 2, 3 standard deviations map to exactly one
  percentage each, never interchangeably."**
- **Anti-analogy**: a Shapiro-Wilk test that fails to reject normality is not a passing grade
  certifying normality — it's simply "no strong objection raised," which is a very different
  claim.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\mu=100,\sigma=15$ 95%-range computation, contrasted
  with the incorrect 1-SD version.
- **Demonstration 2 (targets MC-2)**: the Shapiro-Wilk $p=0.3$ result, contrasting the justified
  and unjustified conclusions.
- **Demonstration 3**: the skewed-population, large-$n$ CLT justification for trusting a
  $t$-test's validity.

## Discovery Questions
1. "Does 95% of a normal distribution's data fall within 1 or 2 standard deviations of the
   mean?"
2. "Does a non-significant Shapiro-Wilk test result prove the data is normally distributed?"
3. "Why can normal-based methods like the t-test remain valid even when raw data isn't normal?"

## Teaching Sequence
1. **Conceptual shift**: the correct 68-95-99.7 pairing applied to a specific example, working
   Demonstration 1, isolating MC-1.
2. **Contrast pair**: the justified-versus-unjustified Shapiro-Wilk conclusion, working
   Demonstration 2, isolating MC-2.
3. **Procedure reuse**: the CLT's role in justifying normal-based methods for large samples from
   non-normal populations, working Demonstration 3.
4. **Mastery gate**: require a correct 68-95-99.7 range computation, a correct statement of what
   a Shapiro-Wilk result does and does not justify, and a correct explanation of the CLT's role,
   at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the 68-95-99.7 percentage-to-standard-deviation pairing applied incorrectly.
- Never accept a non-significant Shapiro-Wilk result treated as proof of normality.
- Never accept the Central Limit Theorem's guarantee misapplied to the raw data itself rather
  than the sample mean.

## Voice Teaching Notes
- Say "which standard-deviation count goes with which percentage here?" whenever the 68-95-99.7
  rule is applied.
- Ask "does failing to reject the null hypothesis prove it true?" whenever a Shapiro-Wilk result
  is interpreted.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a range from the 68-95-99.7 rule.
- **Rung 2 (application)**: learner correctly states what a Shapiro-Wilk test result does and
  does not justify.
- **Rung 3 (transfer)**: learner correctly explains why the CLT justifies normal-based methods
  for large samples from non-normal populations.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the 68-95-99.7 pairing explicitly in order.
- If MC-2 recurs, re-apply the general hypothesis-testing logic.

## Memory Hooks
- "1SD=68%, 2SD=95%, 3SD=99.7% — fixed, never swapped."
- "Failing to reject normality proves nothing — only that this sample raised no strong
  objection."
- "The CLT saves the sample mean's normality, not the raw data's shape."

## Transfer Connections
- `math.prob.normal-distribution` (already authored, certified domain, genuine cross-link):
  supplies the mathematical $N(\mu,\sigma^2)$ distribution this concept's statistical application
  is built directly on.
- `math.stats.descriptive-statistics` (already authored, certified domain): supplies the broader
  statistical context (mean, standard deviation) this distribution underpins.

## Cross-Subject Connections
- Quality control and manufacturing: flagging products outside a normal-distribution-based
  tolerance range, a direct application of the 68-95-99.7 rule.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.normal-distribution.md`, reused by
  reference for its 68-95-99.7 rule application, its Shapiro-Wilk logic contrast, its CLT
  justification example, and its two-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on a factory's quality-control
  flagging range and a Shapiro-Wilk normality caution.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.normal-distribution`/`math.stats.descriptive-statistics`, unlocks none, cross_links
  `math.prob.normal-distribution`, proficient/apply, mastery_threshold 0.9, estimated_hours 4)
  was directly verified against the live KG and matches exactly. `math.prob.normal-distribution`
  independently re-confirmed authored.

## Version History
- 2026-09-19 (Batch 195): authored. First entry this batch. Companion batch concept:
  `math.stats.percentile`.
