# math.stats.confidence-interval

## Identity
- **KG id**: `math.stats.confidence-interval`
- **Domain**: math.stats
- **Requires**: `math.stats.sampling-distribution`, `math.prob.normal-distribution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Construct the 95% confidence interval for $\mu$ (known $\sigma$) as $\bar x\pm1.96\sigma/\sqrt n$,
recognizing $1.96$ as the standard normal's own 95%-area $z$-value and $\sigma/\sqrt n$ as the
sampling distribution's own standard error — NEVER new, independent constants; interpret the
interval via the CORRECT repeated-sampling frequentist meaning, NEVER as "95% probability $\theta$
is in THIS interval"; and recognize (orientation level) that unknown $\sigma$ requires a WIDER
$t$-distribution-based interval, never the same $z=1.96$ formula with $s$ silently substituted.

## Core Understanding
THE CI FORMULA ASSEMBLES TWO ALREADY-KNOWN PIECES — NEVER NEW, INDEPENDENT CONSTANTS: for $n=25$,
$\bar x=52$, known $\sigma=10$: the standard error is $\sigma/\sqrt n=10/\sqrt{25}=2$, EXACTLY
`math.stats.sampling-distribution`'s own standard error of $\bar X$. The $1.96$ is EXACTLY
`math.prob.normal-distribution`'s standard normal $z$-value marking the middle 95% of area. The CI
$\bar x\pm1.96(2)=52\pm3.92=[48.08,55.92]$ is a direct ASSEMBLY of two facts already established
elsewhere — never a formula introducing anything genuinely new.

"95% CONFIDENCE" DESCRIBES THE CONSTRUCTION PROCEDURE'S LONG-RUN SUCCESS RATE — NEVER A
PROBABILITY ABOUT THIS ONE FIXED INTERVAL: for the interval $[48.08,55.92]$: the CORRECT
interpretation is "if we repeated this entire sampling-and-construction procedure many times, about
95% of the resulting intervals would contain the true $\mu$." The INCORRECT interpretation, "there
is a 95% probability $\mu$ is between 48.08 and 55.92," treats the FIXED, unknown constant $\mu$ as
if it were random — but once this SPECIFIC interval is computed, $\mu$ either IS or IS NOT in it,
with NO remaining randomness to assign a probability to; the 95% describes the PROCEDURE across
repeated sampling, never this single already-computed outcome.

UNKNOWN $\sigma$ REQUIRES A GENUINELY WIDER INTERVAL VIA THE $t$-DISTRIBUTION — NEVER THE SAME
$z=1.96$ FORMULA WITH $s$ SILENTLY SUBSTITUTED: reusing the same sample ($n=25$, $\bar x=52$, now
with sample standard deviation $s=10$ and $\sigma$ UNKNOWN): naively computing $52\pm1.96(10/5)=
52\pm3.92$ UNDERSTATES the true uncertainty, because $s$ ITSELF is an estimate subject to its own
sampling variability. The correct approach uses a $t$-distribution critical value with $n-1=24$
degrees of freedom (approximately $2.064$, LARGER than $1.96$), giving $52\pm2.064(2)=52\pm4.128$ —
genuinely WIDER than the known-$\sigma$ interval on the SAME underlying data, correctly reflecting
the extra uncertainty from not knowing $\sigma$ exactly.

## Mental Models
- **"The CI formula isn't new magic — 1.96 is the standard normal's own 95%-area boundary, and
  σ/√n is the sampling distribution's own standard error, simply combined."**
- **"95% confidence describes how often the CONSTRUCTION METHOD succeeds across repeated
  sampling — never a probability attached to this one already-computed interval."**
- **"Not knowing σ genuinely widens the interval — substituting s for σ without switching to the
  t-distribution's wider critical value understates your true uncertainty."**

## Why Students Fail

### MC-1: CI-FORMULA-ASSUMED-NEW-INDEPENDENT-CONSTANTS
- **Surface form**: believes the CI formula's $1.96$ and $\sigma/\sqrt n$ are new, independent
  constants unrelated to anything already learned about the normal distribution.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk Example 1's direct assembly from the standard normal's $z$-value and the
  sampling distribution's standard error, re-anchoring on "both pieces are already-known facts,
  simply combined."

### MC-2: CONFIDENCE-LEVEL-ASSUMED-PROBABILITY-OF-THIS-INTERVAL
- **Surface form**: believes "95% confidence" means a 95% probability that $\theta$ is in this
  specific, already-computed interval.
- **Birth type**: High severity (Blueprint's own declared severity).
- **Repair**: re-walk the procedure-versus-this-interval contrast, re-anchoring on "95% describes
  the construction procedure's long-run success rate."

### MC-3: UNKNOWN-SIGMA-ASSUMED-TO-NEED-NO-ADJUSTMENT
- **Surface form**: believes substituting $s$ for unknown $\sigma$ requires no other change to the
  CI formula.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-walk the $z$-versus-$t$ width comparison, re-anchoring on "estimating $\sigma$
  requires the wider $t$-distribution critical value."

## Misconceptions

### MC-1: CI-FORMULA-ASSUMED-NEW-INDEPENDENT-CONSTANTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONFIDENCE-LEVEL-ASSUMED-PROBABILITY-OF-THIS-INTERVAL
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: UNKNOWN-SIGMA-ASSUMED-TO-NEED-NO-ADJUSTMENT
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The CI formula is an assembly of two parts you already own — the z-value from the normal
  distribution, the standard error from the sampling distribution — never a new independent
  ingredient."**
- **Anti-analogy**: "95% confident" is not a property of any one interval sitting on the page — a
  fixed interval either contains $\mu$ or doesn't; the 95% belongs to the repeated-sampling
  procedure that produced it, never to that single frozen outcome.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct assembly of $\bar x\pm1.96\sigma/\sqrt n$ from the
  standard normal's $z$-value and the sampling distribution's standard error.
- **Demonstration 2 (targets MC-2)**: the correct-versus-incorrect interpretation contrast for
  $[48.08,55.92]$.
- **Demonstration 3 (targets MC-3)**: the $z$-based ($\pm3.92$) versus $t$-based ($\pm4.128$)
  width comparison on the identical sample.

## Discovery Questions
1. "Is the confidence interval formula's 1.96 a brand-new, independent constant, or something you
   already know from the normal distribution?"
2. "Does '95% confidence' mean there is a 95% probability that $\theta$ falls within this specific,
   already-computed interval?"
3. "When $\sigma$ is unknown and estimated by $s$, can you simply substitute $s$ into the same
   formula with $z=1.96$, without any other adjustment?"

## Teaching Sequence
1. **Representation shift**: the two-known-facts assembly, working Demonstration 1, isolating
   MC-1.
2. **Conflict evidence**: the correct-versus-incorrect interpretation contrast, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the known-$\sigma$-versus-unknown-$\sigma$ width comparison, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct CI construction, a correct repeated-sampling
   interpretation, and a correct qualitative explanation of why the unknown-$\sigma$ interval is
   wider, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $1.96$ or $\sigma/\sqrt n$ treated as new, unrelated constants.
- Never accept "95% probability $\theta$ is in this interval" as a correct interpretation.
- Never accept $s$ substituted for unknown $\sigma$ with no other formula adjustment.

## Voice Teaching Notes
- Say "where have you already seen that 1.96, and where have you already seen that standard
  error?" whenever the CI formula is introduced.
- Ask "is that a claim about this one interval, or about the procedure across repeated sampling?"
  whenever a confidence-level interpretation is stated.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a 95% CI given $\bar x$, known $\sigma$,
  and $n$.
- **Rung 2 (application)**: learner correctly states the repeated-sampling interpretation and
  rejects the "probability of this interval" misstatement.
- **Rung 3 (transfer)**: learner correctly explains why an unknown-$\sigma$ interval must be wider
  via the $t$-distribution, rather than the same $z$-based formula with $s$ substituted.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the two-known-facts assembly.
- If MC-2 recurs, re-walk the correct-versus-incorrect interpretation contrast.
- If MC-3 recurs, re-walk the $z$-versus-$t$ width comparison.

## Memory Hooks
- "1.96 and σ/√n aren't new — they're the z-value and standard error you already know."
- "95% confidence is about the procedure, never about this one frozen interval."
- "Unknown σ means a wider t-based interval — never the same formula with s slipped in."

## Transfer Connections
- `math.stats.sampling-distribution` (already authored, certified domain): supplies the standard
  error $\sigma/\sqrt n$ directly assembled into the CI formula.
- `math.prob.normal-distribution` (already authored, certified domain): supplies the standard
  normal's $95\%$-area $z$-value $1.96$.

## Cross-Subject Connections
- Survey and clinical research: reported confidence intervals (e.g. "48-56 seconds, 95%
  confidence") rely on this exact repeated-sampling interpretation, routinely misreported in
  media as a probability statement about the single reported interval.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.confidence-interval.md`, reused by
  reference for its two-known-facts assembly example, its correct-versus-incorrect interpretation
  contrast, its $z$-versus-$t$ width comparison, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a reaction-time study,
  identifying the CI's two component sources, correcting a "95% chance" misstatement, and
  comparing known-versus-unknown-$\sigma$ interval widths.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.sampling-distribution`/`math.prob.normal-distribution`, unlocks none, cross_links
  none, proficient/apply, mastery_threshold 0.85, estimated_hours 6) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 201): authored. First entry this batch. Companion batch concept:
  `math.stats.hypothesis-testing`.
