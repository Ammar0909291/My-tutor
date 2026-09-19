# math.stats.z-test

## Identity
- **KG id**: `math.stats.z-test`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`, `math.prob.standard-normal`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Apply the $z$-test for $H_0:\mu=\mu_0$ when $\sigma$ is GENUINELY KNOWN, computing $Z=(\bar
X-\mu_0)/(\sigma/\sqrt n)\sim N(0,1)$ under $H_0$; compare $Z$ to the CORRECT critical value —
$z_{\alpha/2}$ for two-tailed, $z_\alpha$ for one-tailed — NEVER using one when the other applies;
and recognize the $z$-test's known-$\sigma$ requirement is a RARE practical situation — NEVER
substituting the sample standard deviation $s$ for $\sigma$ without switching to `math.stats.
t-test` instead.

## Core Understanding
THE Z-TEST REQUIRES $\sigma$ GENUINELY KNOWN — NEVER $s$ SILENTLY SUBSTITUTED: testing
$H_0:\mu=100$, $H_a:\mu\ne100$, with $\bar x=104$, KNOWN $\sigma=8$, $n=64$: $Z=(104-100)/
(8/\sqrt{64})=4/1=4$. This calculation is valid ONLY because $\sigma$ is genuinely known — the
z-test's normal-distribution reference is specifically justified by that assumption. Using the
SAMPLE standard deviation $s$ in place of $\sigma$ without recognizing this changes the test's
validity requirements introduces unaccounted-for extra uncertainty; that scenario calls for
`math.stats.t-test` instead.

ONE-TAILED AND TWO-TAILED TESTS USE DIFFERENT CRITICAL VALUES — NEVER THE SAME ONE REGARDLESS OF
STRUCTURE: for $Z=1.75$ at $\alpha=0.05$: a TWO-tailed test ($H_a:\mu\ne\mu_0$) compares
$|Z|=1.75$ against $z_{0.025}\approx1.96$ — since $1.75<1.96$, FAIL TO REJECT. A ONE-tailed test
($H_a:\mu>\mu_0$) compares $Z=1.75$ against $z_{0.05}\approx1.645$ — since $1.75>1.645$, REJECT.
The IDENTICAL observed $Z$ value leads to OPPOSITE decisions depending on which critical value —
and hence which alternative-hypothesis structure — is appropriate; using the same critical value
regardless of tail structure can REVERSE the correct decision.

RECOGNIZING WHEN THE Z-TEST DOESN'T APPLY IS PART OF USING IT CORRECTLY — NEVER ASSUMED
UNCONDITIONALLY VALID: given sample data with sample standard deviation $s=6$ computed FROM the
data, with no independently-known population $\sigma$: the $z$-test's core requirement (genuinely
known $\sigma$) is NOT met here — `math.stats.t-test` (using the $t$-distribution with $n-1$
degrees of freedom) is the appropriate choice, correctly accounting for the extra uncertainty from
ESTIMATING $\sigma$. The known-$\sigma$ z-test scenario is comparatively RARE in practice — most
real analyses estimate $\sigma$ from the sample.

## Mental Models
- **"The z-test only works when σ is a fact you already know — never a number you computed from
  this same sample."**
- **"One-tailed and two-tailed tests use different thresholds — the same Z value can flip from
  'not significant' to 'significant' depending on which one applies."**
- **"Genuinely known σ is the rare case — most real data calls for the t-test instead."**

## Why Students Fail

### MC-1: SAMPLE-STANDARD-DEVIATION-SUBSTITUTED-FOR-KNOWN-SIGMA-WITHOUT-SWITCHING-TO-T-TEST
- **Surface form**: substitutes the sample standard deviation $s$ for $\sigma$ in the z-test
  formula without recognizing this requires switching to the t-test instead.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-verify the known/unknown status of $\sigma$, switching to the t-test if
  estimated.

### MC-2: SAME-CRITICAL-VALUE-USED-REGARDLESS-OF-ONE-TAILED-OR-TWO-TAILED-STRUCTURE
- **Surface form**: uses the same critical value regardless of whether the test is one-tailed or
  two-tailed, potentially reversing the correct decision.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-identify the alternative hypothesis's directionality explicitly, selecting the
  matching critical value.

## Misconceptions

### MC-1: SAMPLE-STANDARD-DEVIATION-SUBSTITUTED-FOR-KNOWN-SIGMA-WITHOUT-SWITCHING-TO-T-TEST
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SAME-CRITICAL-VALUE-USED-REGARDLESS-OF-ONE-TAILED-OR-TWO-TAILED-STRUCTURE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"σ known is a fact handed to you from outside; s is a fact you just measured yourself — never
  interchangeable in the z-test's formula."**
- **Anti-analogy**: using a two-tailed threshold on a genuinely one-tailed question isn't
  "conservative" — it can actively flip the decision, not just make it stricter.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $Z=4$ computation with genuinely known $\sigma=8$,
  contrasted with the invalid $s$-substitution scenario.
- **Demonstration 2 (targets MC-2)**: the $Z=1.75$ two-tailed-versus-one-tailed opposite-decision
  contrast.
- **Demonstration 3**: the $s=6$-with-no-known-$\sigma$ scenario requiring the t-test instead.

## Discovery Questions
1. "Is σ in this problem a fact given from outside, or a number computed from this same sample?"
2. "Does the same critical value apply whether the test is one-tailed or two-tailed?"
3. "If only the sample standard deviation is available, is the z-test still the right choice?"

## Teaching Sequence
1. **Conceptual shift**: the genuinely-known-$\sigma$ requirement, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the one-tailed-versus-two-tailed opposite-decision comparison, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: recognizing when the z-test's assumption fails, working Demonstration 3.
4. **Mastery gate**: require a correct z-test computation with genuinely known $\sigma$, a correct
   critical-value selection for the stated tail structure, and a correct identification of when
   the t-test should be used instead, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the sample standard deviation $s$ substituted for $\sigma$ in the z-test formula.
- Never accept a critical value applied without confirming the test's tail structure.
- Never accept the z-test applied when $\sigma$ is not genuinely known.

## Voice Teaching Notes
- Say "is that σ a known fact, or something you calculated from this sample?" whenever the z-test
  formula is applied.
- Ask "is this a one-tailed or two-tailed test — and does your critical value match?" whenever a
  decision is being made from a $Z$ value.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $Z$ given a genuinely known $\sigma$.
- **Rung 2 (application)**: learner correctly selects the matching critical value for a stated
  one-tailed or two-tailed alternative.
- **Rung 3 (transfer)**: learner correctly identifies a manufacturing quality-control scenario as
  z-test-appropriate (historically known $\sigma$) versus recognizing when it is not.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the known/unknown status of $\sigma$.
- If MC-2 recurs, re-identify the alternative hypothesis's directionality explicitly.

## Memory Hooks
- "σ known means genuinely known — never s in disguise."
- "One-tailed and two-tailed use different thresholds — the same Z can flip the decision."
- "Known σ is rare — most real data needs the t-test."

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  general five-step framework this concept applies with a specific known-$\sigma$ test statistic.
- `math.prob.standard-normal` (already authored, certified domain): supplies the $N(0,1)$
  reference distribution the $Z$ statistic follows under $H_0$.
- `math.stats.t-test` (companion batch concept, this batch): the appropriate alternative whenever
  $\sigma$ is unknown rather than known.

## Cross-Subject Connections
- Manufacturing quality control: a historically well-established process standard deviation (from
  decades of production records) is one of the few realistic scenarios where the z-test's
  known-$\sigma$ assumption genuinely holds.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.z-test.md`, reused by reference for
  its known-$\sigma$ computation example, its one-tailed-versus-two-tailed critical-value
  contrast, its assumption-failure recognition example, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a manufacturing process with a
  historically known $\sigma=0.02$mm, testing a batch's mean diameter against a target
  specification.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`/`math.prob.standard-normal`, unlocks none, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 205): authored. First entry this batch. Companion batch concept:
  `math.stats.t-test`.
