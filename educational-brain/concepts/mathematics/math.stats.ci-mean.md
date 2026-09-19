# math.stats.ci-mean

## Identity
- **KG id**: `math.stats.ci-mean`
- **Domain**: math.stats
- **Requires**: `math.stats.confidence-interval`, `math.prob.continuous-distributions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Construct the $z$-interval $\bar x\pm z_{\alpha/2}\cdot\sigma/\sqrt n$ when $\sigma$ is genuinely
KNOWN; construct the $t$-interval $\bar x\pm t_{\alpha/2,n-1}\cdot s/\sqrt n$ when $\sigma$ is
UNKNOWN, NEVER using $z$'s critical value in that case; and recognize interval width shrinks as
$n$ grows but GROWS with higher confidence level — width and confidence trade off directly, NEVER
independently.

## Core Understanding
USE $z$ ONLY WHEN $\sigma$ IS GENUINELY KNOWN — NEVER REACHING FOR $t$ OUT OF HABIT WHEN $z$
APPLIES: for $\bar x=50$, KNOWN $\sigma=8$, $n=64$: using $z_{0.025}\approx1.96$:
$50\pm1.96\cdot8/\sqrt{64}=50\pm1.96(1)=50\pm1.96$, giving $(48.04,51.96)$. Using the
$t$-distribution's critical value here — even though $\sigma$ is GENUINELY known — is an
unnecessary habit that misses the actual distinguishing condition (though it still produces a
valid, if overly conservative, interval); the $z$-interval is the correct and simpler choice
specifically when $\sigma$ is known.

USE $t$ WITH $n-1$ DEGREES OF FREEDOM WHEN $\sigma$ IS ESTIMATED — NEVER $z$'S CRITICAL VALUE:
for $\bar x=50$, ESTIMATED $s=8$, $n=16$: since $\sigma$ is UNKNOWN, use $t_{0.025,15}\approx
2.131$: $50\pm2.131\cdot8/\sqrt{16}=50\pm2.131(2)=50\pm4.262$, giving $(45.738,54.262)$ — notably
WIDER than if $z=1.96$ had been mistakenly used, since $t_{0.025,15}>z_{0.025}$. Using $z=1.96$
here UNDERSTATES the true uncertainty, producing an interval that is falsely NARROWER (and less
genuinely "95% confident") than it should be — a genuinely wrong, overconfident result, never a
merely conservative one.

WIDTH SHRINKS WITH LARGER $n$ BUT GROWS WITH HIGHER CONFIDENCE — TWO SEPARATE, NEVER CONFLATED,
EFFECTS: comparing a 95% interval ($z\approx1.96$) against a 99% interval ($z\approx2.576$) for
the SAME data ($\bar x=50$, $\sigma=8$, $n=64$): the 99% interval is WIDER, using the larger
critical value — greater confidence requires a wider range to maintain that higher guarantee. This
is a genuinely SEPARATE effect from the $\sqrt n$-driven width shrinkage as sample size grows —
never the same lever.

## Mental Models
- **"σ known means z — never reach for t as a reflex when z genuinely applies."**
- **"σ estimated means t with n−1 degrees of freedom — never z's critical value, which understates
  the true uncertainty."**
- **"More data narrows the interval; more confidence widens it — two separate dials, never one."**

## Why Students Fail

### MC-1: T-DISTRIBUTION-USED-EVEN-WHEN-SIGMA-IS-GENUINELY-KNOWN
- **Surface form**: reaches for the $t$-distribution's critical value out of habit even when the
  population standard deviation $\sigma$ is genuinely known, missing the actual distinguishing
  condition.
- **Birth type**: Minor severity (Blueprint's own declared severity — still produces a valid, if
  slightly conservative, interval).
- **Repair**: re-confirm whether $\sigma$ is given directly (use $z$) or estimated by $s$ (use $t$)
  before proceeding.

### MC-2: Z-CRITICAL-VALUE-USED-WHEN-SIGMA-IS-UNKNOWN-AND-ESTIMATED-BY-S
- **Surface form**: uses the normal distribution's $z$-critical-value when $\sigma$ is actually
  unknown and estimated by $s$, understating the true uncertainty and producing a falsely narrow
  interval.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-identify that $\sigma$ is unknown here, switching to the $t$-distribution with
  $n-1$ degrees of freedom.

## Misconceptions

### MC-1: T-DISTRIBUTION-USED-EVEN-WHEN-SIGMA-IS-GENUINELY-KNOWN
- **Surface form**: as described above.
- **Root cause (Minor)**: as described above.
- **Repair**: as described above.

### MC-2: Z-CRITICAL-VALUE-USED-WHEN-SIGMA-IS-UNKNOWN-AND-ESTIMATED-BY-S
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Reaching for t when σ is known is like wearing a raincoat on a clear day — harmless
  over-caution, never actually wrong."**
- **Anti-analogy**: using z when σ is estimated is not harmless caution the other direction — it's
  reporting a narrower range than the evidence actually supports, a genuinely overconfident
  claim.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the known-$\sigma$ $z$-interval computation, confirming $z$
  is the correct, simpler choice.
- **Demonstration 2 (targets MC-2)**: the unknown-$\sigma$ $t$-interval computation, contrasted
  with the falsely-narrower $z$-based interval.
- **Demonstration 3**: the 95%-versus-99% width comparison on identical data.

## Discovery Questions
1. "Is σ genuinely known here, or would using t be a harmless (if unnecessary) habit?"
2. "If σ is estimated by s, does using z's critical value give a valid interval, or does it
   understate the uncertainty?"
3. "Does a higher confidence level make the interval narrower or wider, for the same data?"

## Teaching Sequence
1. **Reused procedure**: the known-$\sigma$ $z$-interval construction, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the unknown-$\sigma$ $t$-interval versus the incorrect $z$-based shortcut,
   working Demonstration 2, isolating MC-2.
3. **Conceptual shift**: the confidence-level-versus-width tradeoff, working Demonstration 3.
4. **Mastery gate**: require a correct $z$-interval construction, a correct $t$-interval
   construction, and a correct explanation of the width/confidence-level tradeoff, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never treat using $t$ when $z$ suffices as a genuine error, only an unnecessary habit.
- Never accept $z$'s critical value used when $\sigma$ is estimated rather than known.
- Never accept a claim that interval width is unaffected by the chosen confidence level.

## Voice Teaching Notes
- Say "is σ given to you directly, or did you compute s from the sample?" whenever a mean
  confidence interval is constructed.
- Ask "would a higher confidence level make this interval narrower or wider?" whenever confidence
  level and width are being compared.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a $z$-interval given known $\sigma$.
- **Rung 2 (application)**: learner correctly constructs a $t$-interval given estimated $s$, using
  $n-1$ degrees of freedom.
- **Rung 3 (transfer)**: learner correctly identifies why a pharmaceutical trial with only
  sample-estimated variability requires the $t$-distribution, and constructs the resulting
  interval.

## Tutor Recovery Strategy
- If MC-1 recurs, re-confirm whether $\sigma$ is known or estimated before selecting the
  distribution.
- If MC-2 recurs, re-identify that $\sigma$ is unknown and switch to the $t$-distribution.

## Memory Hooks
- "σ known → z. σ estimated → t with n−1 df — never the reverse."
- "Using z when σ is estimated understates uncertainty — never a harmless shortcut."
- "More data narrows; more confidence widens — two separate effects."

## Transfer Connections
- `math.stats.confidence-interval` (already authored, this campaign, Batch 201): supplies the
  general CI framework and repeated-sampling interpretation this concept specializes to the mean.
- `math.prob.continuous-distributions` (already authored, certified domain): supplies the $z$ and
  $t$ distributions' critical values used directly.

## Cross-Subject Connections
- Clinical trial reporting: reporting a mean treatment effect's confidence interval using
  sample-estimated variability (requiring the $t$-distribution) is the standard, realistic default
  in medical research.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.ci-mean.md`, reused by reference for
  its known-$\sigma$ $z$-interval example, its unknown-$\sigma$ $t$-interval example, its
  confidence-level-versus-width comparison, and its two-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a pharmaceutical researcher's
  blood-pressure-reduction study, using sample-estimated variability to construct a $t$-based
  interval.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.confidence-interval`/`math.prob.continuous-distributions`, unlocks none,
  cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours 4) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 209): authored. First entry this batch. Companion batch concept:
  `math.stats.ci-proportion`.
