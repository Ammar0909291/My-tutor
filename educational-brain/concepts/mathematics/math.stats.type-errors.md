# math.stats.type-errors

## Identity
- **KG id**: `math.stats.type-errors`
- **Domain**: math.stats
- **Requires**: `math.stats.hypothesis-testing`
- **Unlocks**: `math.stats.power`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define Type I error (rejecting a TRUE $H_0$, a false positive, rate $\alpha$) and Type II error
(failing to reject a FALSE $H_0$, a false negative, rate $\beta$); correctly match each error to
its EXACT truth/decision combination in the 2×2 outcome table, NEVER swapping or treating them as
interchangeable labels; and recognize the fundamental trade-off — for FIXED $n$, decreasing
$\alpha$ INCREASES $\beta$ — NEVER assuming a stricter $\alpha$ is a cost-free improvement.

## Core Understanding
TYPE I AND TYPE II ERRORS OCCUPY SPECIFIC, NON-INTERCHANGEABLE CELLS IN THE 2×2 TABLE — NEVER
SWAPPED: a medical test rejects $H_0$="no disease" (concluding the patient HAS it), but the
patient actually does NOT have the disease — $H_0$ was TRUE, the decision REJECTED it: this is
EXACTLY a Type I error (false positive), rate $\alpha$. Contrast: the SAME test FAILS to reject
$H_0$ (concluding no disease), but the patient ACTUALLY HAS the disease — $H_0$ was FALSE, the
decision FAILED TO REJECT it: this is EXACTLY a Type II error (false negative), rate $\beta$. The
other two truth/decision combinations (true $H_0$/fail to reject; false $H_0$/reject) are CORRECT
decisions — getting the SPECIFIC pairing right, not just "there are two kinds of errors," is
essential.

DECREASING $\alpha$ INCREASES $\beta$ FOR FIXED $n$ — NEVER A COST-FREE IMPROVEMENT: setting
$\alpha=0.01$ instead of $0.05$ (a stricter threshold) with $n$ held FIXED makes $H_0$ HARDER to
reject — reducing false positives (Type I errors) — but this SAME stricter threshold also makes it
HARDER to correctly reject a truly false $H_0$, INCREASING false negatives (Type II errors,
$\beta$). Assuming a stricter $\alpha$ is an unambiguous improvement with no cost misses this
DIRECT consequence — for FIXED $n$, reducing one error rate ALWAYS raises the other; only
INCREASING the sample size can reduce BOTH simultaneously.

## Mental Models
- **"Type I is a false alarm — rejecting a truth. Type II is a missed detection — failing to
  reject a falsehood. Never the other way around."**
- **"A stricter α doesn't make errors vanish — it just trades false positives for false
  negatives, never eliminating the trade-off for a fixed sample size."**
- **"Only more data lets you shrink both error rates at once — α alone always trades one for the
  other."**

## Why Students Fail

### MC-1: TYPE-I-AND-TYPE-II-ERROR-TRUTH-DECISION-COMBINATIONS-SWAPPED-OR-CONFUSED
- **Surface form**: confuses or swaps which specific truth/decision combination (true $H_0$ +
  reject, vs. false $H_0$ + fail to reject) defines Type I versus Type II error.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-build the 2×2 outcome table explicitly, labeling each cell before naming the
  error types.

### MC-2: REDUCING-ALPHA-ASSUMED-TO-BE-A-COST-FREE-IMPROVEMENT-WITHOUT-INCREASING-BETA
- **Surface form**: assumes decreasing $\alpha$ is an unambiguous improvement, without recognizing
  the corresponding increase in $\beta$ for a fixed sample size.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive the trade-off explicitly, confirming that for fixed $n$, a stricter
  rejection criterion makes false negatives more likely.

## Misconceptions

### MC-1: TYPE-I-AND-TYPE-II-ERROR-TRUTH-DECISION-COMBINATIONS-SWAPPED-OR-CONFUSED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: REDUCING-ALPHA-ASSUMED-TO-BE-A-COST-FREE-IMPROVEMENT-WITHOUT-INCREASING-BETA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Type I is convicting an innocent person; Type II is letting a guilty one go free — two
  distinct failures of the same justice system, never the same mistake."**
- **Anti-analogy**: tightening a metal detector's sensitivity doesn't eliminate both missed
  weapons and false alarms at once — it trades one risk for the other, exactly like α and β,
  unless you add a genuinely better detector (more data).

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the medical-test Type I (true $H_0$, rejected) versus Type
  II (false $H_0$, not rejected) side-by-side matching.
- **Demonstration 2 (targets MC-2)**: the $\alpha=0.01$-versus-$0.05$ trade-off derivation for
  fixed $n$.

## Discovery Questions
1. "If H0 is actually true but the test rejects it, is that a Type I or a Type II error?"
2. "If H0 is actually false but the test fails to reject it, is that a Type I or a Type II error?"
3. "If you make α stricter without changing the sample size, does that reduce both types of
   errors, or just one at the cost of the other?"

## Teaching Sequence
1. **Conceptual shift**: the paired truth/decision matching for Examples 1 and 2, isolating MC-1.
2. **Contrast pair**: the α-decrease-increases-β derivation, isolating MC-2.
3. **Mastery gate**: require correct error-type identification from a truth/decision scenario and
   a correct explanation of the α/β trade-off, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept Type I and Type II error labels swapped or used interchangeably.
- Never accept "decreasing α is a free improvement" without the corresponding β increase named.
- Never accept a claim that adjusting α alone can reduce both error rates simultaneously.

## Voice Teaching Notes
- Say "was H0 actually true or false, and did the test reject it or not — now which cell of the
  table is that?" whenever an error type is being identified.
- Ask "what happens to β when you make α stricter, assuming the sample size doesn't change?"
  whenever a stricter significance level is proposed as a pure improvement.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies Type I versus Type II error from a given
  truth/decision scenario.
- **Rung 2 (application)**: learner correctly explains why decreasing $\alpha$ for fixed $n$
  increases $\beta$.
- **Rung 3 (transfer)**: learner correctly analyzes a spam-filter scenario's Type I/Type II
  trade-off and identifies that increasing sample size (data) is the only way to reduce both
  simultaneously.

## Tutor Recovery Strategy
- If MC-1 recurs, re-build the 2×2 outcome table explicitly.
- If MC-2 recurs, re-derive the α/β trade-off for fixed $n$.

## Memory Hooks
- "True H0 + reject = Type I. False H0 + fail to reject = Type II — never swapped."
- "Stricter α trades false positives for false negatives — never a free lunch."
- "Only more data shrinks both error rates at once."

## Transfer Connections
- `math.stats.hypothesis-testing` (already authored, this campaign, Batch 201): supplies the
  decision framework (reject/fail-to-reject at significance level $\alpha$) these two error types
  describe the failure modes of.
- `math.stats.power` (unlocked by this concept, not yet authored): will build directly on $\beta$
  by defining power as $1-\beta$, the probability of correctly rejecting a false $H_0$.

## Cross-Subject Connections
- Spam filtering and medical screening: both are everyday systems where the Type I/Type II
  trade-off has immediately understandable real consequences (legitimate mail lost vs. spam
  admitted; healthy patient worried vs. sick patient missed).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.type-errors.md`, reused by reference
  for its medical-test truth/decision matching examples, its α/β trade-off derivation, and its
  two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a spam-email filter, describing
  Type I/Type II consequences and the effect of a stricter detection threshold.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.hypothesis-testing`, unlocks `math.stats.power`, cross_links none,
  proficient/analyze, mastery_threshold 0.85, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 203): authored. Second entry this batch. Companion batch concept:
  `math.stats.test-statistic`.
