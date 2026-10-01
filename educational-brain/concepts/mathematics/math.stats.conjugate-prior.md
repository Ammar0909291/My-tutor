# math.stats.conjugate-prior

## Identity
- **KG id**: `math.stats.conjugate-prior`
- **Domain**: math.stats
- **Requires**: `math.stats.bayesian-inference`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Define a conjugate prior as a family CLOSED under Bayesian updating — the posterior has the SAME
form as the prior, just updated parameters; apply the Beta-Binomial update rule, adding
SUCCESSES to $\alpha$ and FAILURES (never total trials) to $\beta$; and recognize conjugacy is
chosen partly for MATHEMATICAL CONVENIENCE, NEVER a methodologically illegitimate shortcut.

## Core Understanding
THE BETA-BINOMIAL UPDATE ADDS SUCCESSES TO $\alpha$ AND FAILURES (NEVER TOTAL TRIALS) TO $\beta$:
for a Beta$(2,3)$ prior on $p$, observing 7 successes out of 10 trials: posterior $=$
Beta$(2+7,3+(10-7))=$Beta$(9,6)$. Adding the TOTAL number of trials $n$ (rather than specifically
the FAILURES, $n-k$) to $\beta$ — computing Beta$(2+7,3+10)=$Beta$(9,13)$ instead — is WRONG; the
update rule specifically requires adding SUCCESSES to $\alpha$ and FAILURES (not total trials) to
$\beta$.

CONJUGATE MEANS SAME FAMILY, UPDATED PARAMETERS — NEVER A DIFFERENT DISTRIBUTIONAL FORM: the
posterior Beta$(9,6)$ from Example 1 is genuinely the SAME distributional FAMILY (Beta) as the
prior Beta$(2,3)$, just with DIFFERENT parameters. This IS exactly what "conjugate" means — the
mathematical FORM stays Beta throughout, with only the parameters shifting to reflect the newly
observed data, which is precisely why NO fresh integration was needed to derive this result.

CHOOSING A CONJUGATE PRIOR FOR CONVENIENCE IS A LEGITIMATE TRADEOFF — NEVER METHODOLOGICALLY
ILLEGITIMATE: a statistician chooses a Beta prior for a proportion PARTLY because of its
mathematical convenience, even though their TRUE prior belief might be better represented by some
other, non-conjugate distribution shape. Conjugate priors offer substantial COMPUTATIONAL
convenience (closed-form posteriors, no numerical integration) — this is a LEGITIMATE, practical
reason for choosing a conjugate family, even when it might not perfectly capture every nuance of
genuine prior belief. Assuming choosing a conjugate prior for computational convenience is
"cheating" or methodologically invalid is WRONG — it is a recognized, well-established practical
tradeoff in Bayesian practice, never an error.

## Mental Models
- **"Beta-Binomial update: successes go to α, failures go to β — never total trials to β."**
- **"Conjugate means the family never changes — only the parameters shift to absorb new data."**
- **"Choosing conjugacy for convenience is a legitimate engineering tradeoff, never a
  methodological shortcut that undermines validity."**

## Why Students Fail

### MC-1: BETA-BINOMIAL-UPDATE-ADDS-TOTAL-TRIALS-INSTEAD-OF-FAILURES-TO-BETA
- **Surface form**: adds the total number of trials $n$ (rather than specifically the failures,
  $n-k$) to the $\beta$ parameter when applying the Beta-Binomial conjugate update rule.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive the update rule explicitly, separating successes ($k$, added to $\alpha$)
  from failures ($n-k$, added to $\beta$).

### MC-2: CONJUGATE-PRIOR-SELECTION-FOR-CONVENIENCE-VIEWED-AS-METHODOLOGICALLY-ILLEGITIMATE
- **Surface form**: views the choice of a conjugate prior for computational convenience as
  methodologically invalid or "cheating," rather than a legitimate, well-established practical
  tradeoff.
- **Birth type**: Minor severity (Blueprint's own declared severity — a framing issue that doesn't
  affect correct computation once the technique is applied).
- **Repair**: re-frame conjugacy's convenience as a recognized, legitimate practical tradeoff in
  the field.

## Misconceptions

### MC-1: BETA-BINOMIAL-UPDATE-ADDS-TOTAL-TRIALS-INSTEAD-OF-FAILURES-TO-BETA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONJUGATE-PRIOR-SELECTION-FOR-CONVENIENCE-VIEWED-AS-METHODOLOGICALLY-ILLEGITIMATE
- **Surface form**: as described above.
- **Root cause (Minor)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Beta-Binomial update is a ledger — every success is a deposit to α, every failure a
  deposit to β, never the whole trial count dumped into one account."**
- **Anti-analogy**: choosing a conjugate prior for convenience isn't grading on a curve — it's
  choosing the tool that gets an honest answer fast, a legitimate engineering choice, never a
  compromise on correctness.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Beta$(2,3)$-plus-7-successes-out-of-10 update to
  Beta$(9,6)$.
- **Demonstration 2**: the same-family-updated-parameters confirmation for Beta$(2,3)\to
  $Beta$(9,6)$.
- **Demonstration 3 (targets MC-2)**: the legitimate-convenience-tradeoff framing for choosing a
  conjugate prior.

## Discovery Questions
1. "When updating a Beta prior with Binomial data, do you add the total number of trials or just
   the failures to β?"
2. "Does the posterior distribution's family (e.g. Beta) change after updating, or just its
   parameters?"
3. "Is choosing a conjugate prior for computational convenience a legitimate practice, or a
   methodological shortcut?"

## Teaching Sequence
1. **Conceptual shift**: the successes-to-α, failures-to-β update derivation, working
   Demonstration 1, isolating MC-1.
2. **Reused procedure**: the same-family-updated-parameters confirmation, working Demonstration
   2.
3. **Contrast pair**: the legitimate-versus-illegitimate framing of convenience-based prior
   choice, working Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct Beta-Binomial posterior computation, a correct
   identification that the family stays the same, and a correct explanation of conjugacy's
   legitimate practical value, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept total trials added to $\beta$ instead of specifically the failures.
- Never accept a claim that the posterior's distributional family changes after conjugate
  updating.
- Never accept conjugate-prior selection for convenience framed as methodologically illegitimate.

## Voice Teaching Notes
- Say "are you adding the failures, or the total number of trials, to β?" whenever a Beta-Binomial
  update is computed.
- Ask "is choosing this prior for convenience a shortcut that undermines the analysis, or a
  legitimate practical choice?" whenever conjugacy's rationale is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the Beta-Binomial update rule.
- **Rung 2 (application)**: learner correctly confirms the posterior shares the prior's
  distributional family.
- **Rung 3 (transfer)**: learner correctly explains why a Beta-Binomial conjugate setup enables
  instant real-time updates in an A/B testing scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the update rule separating successes from failures explicitly.
- If MC-2 recurs, re-frame conjugacy's convenience as a legitimate practical tradeoff.

## Memory Hooks
- "Successes to α, failures to β — never total trials to β."
- "Conjugate: same family, new parameters — never a different distributional shape."
- "Convenience-based conjugate choice is legitimate — never cheating."

## Transfer Connections
- `math.stats.bayesian-inference` (already authored, this campaign, Batch 215): supplies the
  general prior-times-likelihood posterior framework this concept specializes into a closed-form
  update rule.

## Cross-Subject Connections
- A/B testing platforms: real-time conjugate Bayesian updating of conversion rates as new visitor
  data streams in is one of the most widespread modern applications of this concept.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.conjugate-prior.md`, reused by
  reference for its Beta$(2,3)$-to-Beta$(9,6)$ update example, its same-family confirmation, its
  convenience-tradeoff framing, and its two-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an A/B testing platform updating
  a Beta$(10,10)$ prior with 45 conversions out of 100 visitors.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.bayesian-inference`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.75, estimated_hours 5) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 216): authored. First entry this batch. Companion batch concept:
  `math.stats.credible-interval`.
