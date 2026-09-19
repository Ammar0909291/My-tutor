# math.stats.sufficient-statistic

## Identity
- **KG id**: `math.stats.sufficient-statistic`
- **Domain**: math.stats
- **Requires**: `math.stats.estimator`, `math.prob.conditional-distribution`
- **Unlocks**: `math.stats.rao-blackwell`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
Define a sufficient statistic $T(X)$: the conditional distribution of the full sample $X$ given
$T(X)=t$ does NOT depend on $\theta$ — NEVER a claim about any specific estimator's accuracy;
apply the factorization criterion $f(x\mid\theta)=g(T(x)\mid\theta)\cdot h(x)$ to verify
sufficiency WITHOUT computing the conditional distribution directly — NEVER assuming the direct
conditional-distribution computation is the only available test; and recognize (orientation level)
sufficiency has genuine practical consequence — an estimator based on $T(X)$ can improve on one
using less information — NEVER merely a theoretical label.

## Core Understanding
SUFFICIENCY MEANS THE LEFTOVER DETAIL TELLS YOU NOTHING MORE ABOUT $\theta$ — NEVER A STATEMENT
ABOUT ESTIMATOR ACCURACY: for $n$ independent Bernoulli$(\theta)$ trials, let $T=\sum X_i$ (total
successes). Given $T=t$, EVERY specific sequence with exactly $t$ successes is EQUALLY LIKELY —
the conditional distribution of $(X_1,\dots,X_n)$ given $T=t$ is uniform over all $\binom{n}{t}$
such sequences, probability $1/\binom{n}{t}$ each, and this probability does NOT involve $\theta$
at all. This CONFIRMS $T$ is sufficient: once the total count $t$ is known, WHICH specific
sequence occurred adds NOTHING further about $\theta$ — sufficiency is defined purely by whether
$\theta$ drops out of this conditional distribution, unrelated to any specific estimator's
accuracy.

THE FACTORIZATION CRITERION VERIFIES SUFFICIENCY WITHOUT EVER COMPUTING THE CONDITIONAL
DISTRIBUTION — NEVER THE ONLY AVAILABLE TEST: for the SAME Bernoulli sample, the joint PMF is
$f(x\mid\theta)=\theta^t(1-\theta)^{n-t}$ where $t=\sum x_i$. Writing this as $g(T(x)\mid\theta)
\cdot h(x)$ with $g(t\mid\theta)=\theta^t(1-\theta)^{n-t}$ (depending on $x$ ONLY through $t$) and
$h(x)=1$ (never involving $\theta$): the factorization holds EXACTLY, confirming $T=\sum X_i$ is
sufficient — obtained WITHOUT computing the uniform conditional distribution Example 1's direct
route required. This is a computationally EASIER equivalent test, never the only path to
verifying sufficiency.

SUFFICIENCY HAS GENUINE PRACTICAL CONSEQUENCE — NEVER MERELY A THEORETICAL LABEL: suppose an
estimator $\hat\theta_1=X_1$ (using only the FIRST observation) is proposed for $\theta$ in the
Bernoulli setting. Since $T=\sum X_i$ is sufficient, conditioning $\hat\theta_1$ on $T$ — computing
$E[X_1\mid T=t]$ — produces a NEW estimator (working out to $t/n$, the sample proportion) that uses
the FULL sample's information, with strictly SMALLER variance than $\hat\theta_1=X_1$ alone for
$n>1$. Basing an estimator only on the sufficient statistic (rather than throwing away information
by using only part of the sample) genuinely IMPROVES estimation quality — the Rao-Blackwell idea,
never a purely classificatory exercise.

## Mental Models
- **"Sufficiency asks whether θ has vanished from the leftover conditional distribution — never
  whether some particular estimator built from T is accurate."**
- **"Factorization is a shortcut door into sufficiency — you never have to walk through the
  conditional-distribution room to get there."**
- **"A sufficient statistic isn't just a label — building an estimator from it can genuinely beat
  one that throws information away."**

## Why Students Fail

### MC-1: SUFFICIENCY-ASSUMED-ABOUT-ESTIMATOR-ACCURACY
- **Surface form**: believes sufficiency verification involves checking an estimator's accuracy,
  missing that it is purely about whether $\theta$ drops out of the conditional distribution given
  $T(X)$.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the uniform-conditional-distribution verification, re-anchoring on
  "sufficiency is about whether $\theta$ drops out of the conditional distribution."

### MC-2: CONDITIONAL-DISTRIBUTION-ASSUMED-ONLY-SUFFICIENCY-TEST
- **Surface form**: believes the conditional distribution must always be computed directly to
  verify sufficiency, missing that the factorization criterion is an equivalent, often easier
  test.
- **Birth type**: High severity (Blueprint's own declared severity).
- **Repair**: re-walk the factorization shortcut, re-anchoring on "the factorization criterion is
  an equivalent, easier test."

### MC-3: SUFFICIENCY-ASSUMED-MERELY-THEORETICAL-LABEL
- **Surface form**: believes sufficiency is only a theoretical classification with no practical
  consequence, missing that it enables genuine estimator improvement.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-walk the estimator-improvement demonstration, re-anchoring on "sufficiency
  enables genuine, measurable estimator improvement."

## Misconceptions

### MC-1: SUFFICIENCY-ASSUMED-ABOUT-ESTIMATOR-ACCURACY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONDITIONAL-DISTRIBUTION-ASSUMED-ONLY-SUFFICIENCY-TEST
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: SUFFICIENCY-ASSUMED-MERELY-THEORETICAL-LABEL
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A sufficient statistic is a compressed file that loses nothing about θ — unzipping the
  original sample gives you no extra clue about θ beyond what the compressed summary already
  told you."**
- **Anti-analogy**: recording every individual defective item's identity isn't "more informative"
  than the total defect count for estimating a defect rate — once you have the total, the specific
  identities carry zero extra signal about θ.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Bernoulli uniform-conditional-distribution verification
  for $T=\sum X_i$.
- **Demonstration 2 (targets MC-2)**: the factorization $\theta^t(1-\theta)^{n-t}\cdot1$ shortcut
  for the same sample.
- **Demonstration 3 (targets MC-3)**: the $X_1$-versus-$T/n$ estimator variance-improvement
  contrast.

## Discovery Questions
1. "Does verifying sufficiency mean checking an estimator's accuracy, or checking whether θ
   affects the leftover conditional distribution?"
2. "Is computing the conditional distribution directly the only way to verify sufficiency?"
3. "Does labeling a statistic 'sufficient' have any practical consequence for how good an
   estimator built from it actually is?"

## Teaching Sequence
1. **Representation shift**: the leftover-conditional-distribution framing, working Demonstration
   1, isolating MC-1.
2. **Conflict evidence**: the factorization shortcut, working Demonstration 2, isolating MC-2.
3. **Contrast pair**: the $X_1$-versus-$T/n$ variance-improvement comparison, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct sufficiency definition, a correct factorization
   verification, and a correct qualitative estimator-improvement explanation, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept sufficiency verification framed as checking an estimator's accuracy.
- Never accept a claim that the conditional distribution must always be computed directly to
  verify sufficiency.
- Never accept sufficiency treated as a purely theoretical label with no practical consequence.

## Voice Teaching Notes
- Say "does θ still show up in the leftover conditional distribution, or has it dropped out?"
  whenever sufficiency is being verified.
- Ask "could the factorization criterion get you there faster?" whenever a direct
  conditional-distribution computation is attempted for sufficiency.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains what sufficiency means structurally.
- **Rung 2 (application)**: learner correctly applies the factorization criterion to verify a
  proposed statistic is sufficient.
- **Rung 3 (transfer)**: learner correctly evaluates a quality-control scenario's proposed
  sufficient statistic and explains the resulting estimator-improvement consequence.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the uniform-conditional-distribution verification.
- If MC-2 recurs, re-walk the factorization shortcut.
- If MC-3 recurs, re-walk the estimator-improvement demonstration.

## Memory Hooks
- "Sufficiency: does θ drop out of the leftover conditional distribution — never about estimator
  accuracy."
- "Factorization is the shortcut — never the only test."
- "Sufficiency has teeth — it genuinely improves estimators, never just a label."

## Transfer Connections
- `math.stats.estimator` (already authored, this campaign, Batch 200): supplies the general
  estimator/accuracy framework the Rao-Blackwell-idea preview directly uses.
- `math.prob.conditional-distribution` (already authored, certified domain): supplies the
  conditional-distribution machinery this concept's sufficiency definition directly invokes.
- `math.stats.rao-blackwell` (unlocked by this concept, not yet authored): will derive the full
  variance-reduction proof this concept's Example 3 previews qualitatively.

## Cross-Subject Connections
- Quality control engineering: summarizing a sample of inspected items by a single sufficient
  statistic (like total defect count) rather than the full sequence of individual results is a
  routine, practically motivated data-reduction technique.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.sufficient-statistic.md`, reused by
  reference for its Bernoulli direct-verification example, its factorization-criterion shortcut,
  its estimator-improvement demonstration, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a quality-control engineer
  verifying $T=\sum X_i$ as sufficient via factorization and evaluating a colleague's claim about
  preserving "more information."

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.estimator`/`math.prob.conditional-distribution`, unlocks `math.stats.rao-blackwell`,
  cross_links none, expert/analyze, mastery_threshold 0.75, estimated_hours 6) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 206): authored. Second entry this batch. Companion batch concept:
  `math.stats.mle`.
