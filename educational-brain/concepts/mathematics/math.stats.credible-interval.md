# math.stats.credible-interval

## Identity
- **KG id**: `math.stats.credible-interval`
- **Domain**: math.stats
- **Requires**: `math.stats.bayesian-inference`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: evaluate
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
Define a 95% credible interval $[a,b]$ as $P(\theta\in[a,b]\mid\text{data})=0.95$ — a DIRECT
probability statement about $\theta$, NEVER interpreted with frequentist repeated-sampling
language; contrast this against `math.stats.confidence-interval`'s INDIRECT interpretation —
NEVER treated as meaning the same thing; and recognize the HPD interval as the NARROWEST credible
interval, coinciding with the equal-tailed interval ONLY for symmetric posteriors.

## Core Understanding
A CREDIBLE INTERVAL IS A DIRECT PROBABILITY STATEMENT — NEVER FREQUENTIST PROCEDURAL LANGUAGE: for
a posterior giving a 95% credible interval $[0.3,0.5]$ on a proportion $p$: it means given the
observed data, there is a 95% probability that the TRUE proportion $p$ lies between 0.3 and 0.5.
Interpreting this the SAME way one would (incorrectly) interpret a frequentist confidence interval
— "if we repeated this experiment many times, 95% of such intervals would contain $p$" — is WRONG;
the credible interval's actual meaning is a DIRECT probability statement about $\theta$ itself,
given THIS specific data, never a claim about hypothetical repetitions.

CREDIBLE AND CONFIDENCE INTERVALS ARE GENUINELY DIFFERENT PROBABILITY CLAIMS — NEVER
INTERCHANGEABLE: credible interval: "$P(\theta\in[a,b]\mid\text{data})=0.95$" — directly about
$\theta$'s likely location. Confidence interval: "if this exact procedure were repeated many times
with fresh data, 95% of the resulting intervals would contain the TRUE $\theta$" — a statement
about the PROCEDURE's long-run behavior, NEVER this specific interval. Asserting BOTH intervals
mean the "same thing," just derived via different computational methods, is WRONG — they represent
genuinely DIFFERENT probability claims arising from fundamentally different statistical
philosophies (Bayesian vs. frequentist), even though they sometimes produce numerically similar
bounds.

THE HPD INTERVAL IS THE NARROWEST CREDIBLE INTERVAL, COINCIDING WITH EQUAL-TAILED ONLY FOR
SYMMETRIC POSTERIORS — NEVER ALWAYS: for a SYMMETRIC (unimodal, bell-shaped) posterior, the
highest-density region naturally forms a SYMMETRIC interval around the center — matching the
equal-tailed approach (2.5% probability in each tail) EXACTLY. For a SKEWED posterior, the
highest-density region is NOT symmetric — the HPD interval would be NARROWER than the equal-tailed
interval by deliberately excluding some low-density regions near one tail while including
slightly more of the high-density region near the peak. Assuming the equal-tailed credible
interval is ALWAYS identical to the HPD interval regardless of the posterior's shape is WRONG —
this coincidence is SPECIFIC to symmetric posteriors and does NOT generalize to genuinely skewed
ones.

## Mental Models
- **"A credible interval speaks directly about where θ actually is — never about hypothetical
  repeated experiments."**
- **"Credible and confidence intervals answer different philosophical questions — never the same
  claim in different clothing."**
- **"HPD is the narrowest interval that holds the required probability — equal-tailed only
  matches it when the posterior is symmetric."**

## Why Students Fail

### MC-1: CREDIBLE-INTERVAL-INTERPRETED-USING-FREQUENTIST-PROCEDURAL-LANGUAGE-INSTEAD-OF-DIRECT-PROBABILITY
- **Surface form**: interprets a credible interval using frequentist "repeated sampling"
  procedural language, rather than its correct direct-probability-about-$\theta$ meaning.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-state the direct-probability interpretation explicitly, connecting to the
  posterior distribution it's derived from.

### MC-2: CREDIBLE-AND-CONFIDENCE-INTERVALS-TREATED-AS-INTERCHANGEABLE-MEANING-THE-SAME-THING
- **Surface form**: treats credible intervals and confidence intervals as interchangeable,
  meaning the same underlying probability claim despite arising from different statistical
  philosophies.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-contrast the two interpretations explicitly side by side.

## Misconceptions

### MC-1: CREDIBLE-INTERVAL-INTERPRETED-USING-FREQUENTIST-PROCEDURAL-LANGUAGE-INSTEAD-OF-DIRECT-PROBABILITY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CREDIBLE-AND-CONFIDENCE-INTERVALS-TREATED-AS-INTERCHANGEABLE-MEANING-THE-SAME-THING
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A credible interval is a weather forecaster saying '95% chance of rain tomorrow' — a direct
  claim about tomorrow. A confidence interval is more like 'our forecasting method is right 95%
  of the time across many forecasts' — a claim about the method, never about this one forecast."**
- **Anti-analogy**: HPD and equal-tailed intervals aren't automatically the same shape wearing
  different names — for a skewed posterior they genuinely diverge, like two different-shaped nets
  cast to catch the same 95% of fish.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct-probability interpretation of a $[0.3,0.5]$
  credible interval.
- **Demonstration 2 (targets MC-2)**: the side-by-side credible-versus-confidence-interval
  interpretation contrast.
- **Demonstration 3**: the symmetric-posterior-HPD-coincides-with-equal-tailed versus
  skewed-posterior-HPD-diverges comparison.

## Discovery Questions
1. "Does a 95% credible interval describe this specific interval directly, or hypothetical
   repeated experiments?"
2. "Do a credible interval and a confidence interval make the same probability claim?"
3. "Does the HPD interval always coincide with the equal-tailed credible interval, regardless of
   the posterior's shape?"

## Teaching Sequence
1. **Conceptual shift**: the direct-probability interpretation, working Demonstration 1, isolating
   MC-1.
2. **Contrast pair**: the credible-versus-confidence-interval side-by-side comparison, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the symmetric-versus-skewed HPD comparison, working Demonstration 3.
4. **Mastery gate**: require a correct direct-probability interpretation of a credible interval, a
   correct explanation of the credible-versus-confidence-interval distinction, and a correct
   explanation of when HPD and equal-tailed intervals coincide, at the Blueprint's own stated
   MAMR of 4/5.

## Tutor Actions
- Never accept a credible interval interpreted with frequentist repeated-sampling language.
- Never accept credible and confidence intervals treated as making the same probability claim.
- Never accept a claim that HPD and equal-tailed intervals always coincide regardless of the
  posterior's shape.

## Voice Teaching Notes
- Say "is that a direct claim about θ, or a claim about repeated hypothetical experiments?"
  whenever a credible interval is interpreted.
- Ask "is the posterior symmetric here — because that's the only case where HPD matches
  equal-tailed?" whenever HPD intervals are discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the direct-probability interpretation of a
  given credible interval.
- **Rung 2 (application)**: learner correctly contrasts a credible interval's interpretation
  against a confidence interval's.
- **Rung 3 (transfer)**: learner correctly explains why an HPD interval would be narrower than an
  equal-tailed interval for a skewed posterior, in a population-growth-rate scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the direct-probability interpretation explicitly.
- If MC-2 recurs, re-contrast the two interpretations explicitly side by side.

## Memory Hooks
- "Credible interval speaks directly about θ — never about repeated experiments."
- "Credible and confidence intervals are different philosophies — never the same claim."
- "HPD matches equal-tailed only when the posterior is symmetric — never in general."

## Transfer Connections
- `math.stats.bayesian-inference` (already authored, this campaign, Batch 215): supplies the
  posterior distribution this concept's credible interval is constructed directly from, and the
  credible-versus-confidence philosophical contrast this concept elaborates.

## Cross-Subject Connections
- Ecology and population biology: reporting a skewed posterior for a population growth rate
  (naturally bounded below by zero) is a realistic scenario where the HPD-versus-equal-tailed
  distinction becomes practically consequential.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.credible-interval.md`, reused by
  reference for its direct-probability interpretation example, its credible-versus-confidence
  contrast, its symmetric-versus-skewed HPD comparison, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a biologist's skewed posterior
  for a species' population growth rate, comparing HPD and equal-tailed intervals.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.bayesian-inference`, unlocks none, cross_links none, expert/evaluate,
  mastery_threshold 0.75, estimated_hours 4) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 216): authored. Second entry this batch. Companion batch concept:
  `math.stats.conjugate-prior`.
