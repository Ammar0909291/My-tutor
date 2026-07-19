# Teaching Blueprint: Confidence Interval (`math.stats.confidence-interval`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.confidence-interval` |
| name | Confidence Interval |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.stats.sampling-distribution`, `math.prob.normal-distribution` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — constructing one specific 95% CI for a given sample before naming the general formula and its repeated-sampling interpretation |
| description (KG) | An interval $[L,U]$ such that $P(L\le\theta\le U)=1-\alpha$ (confidence level). The 95% CI for $\mu$ with known $\sigma$: $\bar x\pm1.96\sigma/\sqrt n$. Interpretation: in repeated sampling, 95% of such intervals contain $\theta$. |

## Component 1 — Learning Objectives

- LO1: Construct the $95\%$ confidence interval for $\mu$ (known $\sigma$) as $\bar x\pm1.96\dfrac{\sigma}{\sqrt n}$, recognizing $1.96$ as the specific $z$-value from `math.prob.normal-distribution`'s standard normal that captures the middle $95\%$ of area, and $\dfrac{\sigma}{\sqrt n}$ as `math.stats.sampling-distribution`'s own standard error of $\bar X$.
- LO2: Interpret the confidence interval CORRECTLY via the repeated-sampling frequentist interpretation: BEFORE data is collected, $95\%$ of intervals constructed this way (across many hypothetical samples) would contain $\theta$ — and recognize that this is NOT the same as "there is a $95\%$ probability $\theta$ lies in THIS particular already-computed interval."
- LO3 (orientation level — full unknown-$\sigma$ theory deferred): recognize, without full derivation, that when $\sigma$ is UNKNOWN (the realistic case), the CI formula requires substituting the sample standard deviation $s$ and using a $t$-distribution critical value instead of $z=1.96$, since this substitution introduces extra uncertainty the normal-based formula does not account for.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.sampling-distribution` (the distribution of $\bar X$ across samples, with $E[\bar X]=\mu$ and standard error $\sigma/\sqrt n$, approximately normal for large $n$ by the CLT) and `math.prob.normal-distribution` (the normal density, standard normal $Z$, and area/probability computations).

## Component 3 — Core Explanation

**The CI formula assembles two already-known pieces**: $\bar x\pm1.96\dfrac{\sigma}{\sqrt n}$ combines TWO facts already established: `math.stats.sampling-distribution`'s claim that $\bar X$ is approximately NORMAL with mean $\mu$ and standard error $\sigma/\sqrt n$, and `math.prob.normal-distribution`'s fact that the middle $95\%$ of area under ANY normal curve lies within $\pm1.96$ standard deviations of the mean (a standard-normal fact, found from $Z=(\bar X-\mu)/(\sigma/\sqrt n)$). Combining these: since $\bar X$ falls within $1.96$ standard errors of $\mu$ about $95\%$ of the time, the interval $\bar x\pm1.96\sigma/\sqrt n$ — built AROUND the observed $\bar x$ — will contain $\mu$ about $95\%$ of the time.

**The repeated-sampling interpretation is about the PROCEDURE, not this one interval**: the "$95\%$ confidence" describes the LONG-RUN behavior of the interval-CONSTRUCTION PROCEDURE, applied across many hypothetical samples — not a probability statement about $\theta$'s location relative to one already-computed, fixed interval. Once a SPECIFIC interval $[L,U]$ has been calculated from a SPECIFIC sample, $\theta$ either IS or IS NOT in that fixed interval (there's no more randomness left to assign a probability to) — the $95\%$ describes how often the PROCEDURE succeeds across repeated sampling, before any particular sample is drawn.

**Unknown $\sigma$ requires extra care (orientation level)**: in practice, $\sigma$ is rarely known and must be ESTIMATED by the sample standard deviation $s$. Substituting $s$ for $\sigma$ introduces additional uncertainty beyond what the normal-based $z=1.96$ formula accounts for — the correct adjustment replaces $z=1.96$ with a critical value from the $t$-distribution (which has heavier tails, giving a WIDER interval to compensate for the extra uncertainty from estimating $\sigma$). Full development of the $t$-distribution and its degrees-of-freedom dependence is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the 95% CI from its two known components, breaking MC-1)**: for a sample of $n=25$ with $\bar x=52$ and KNOWN $\sigma=10$: the standard error is $\sigma/\sqrt n=10/\sqrt{25}=10/5=2$ (directly from `math.stats.sampling-distribution`). The $95\%$ CI is $\bar x\pm1.96(2)=52\pm3.92$, i.e. $[48.08,55.92]$. The value $1.96$ was not chosen arbitrarily — it is EXACTLY the standard normal's $z$-value marking the boundary of the middle $95\%$ of area, a fact already established in `math.prob.normal-distribution`.

**Example 2 (LO2 — the correct repeated-sampling interpretation, breaking MC-2)**: for Example 1's interval $[48.08,55.92]$: the CORRECT interpretation is "if we repeated this entire sampling-and-interval-construction procedure many times (drawing a new sample of $n=25$ each time), approximately $95\%$ of the resulting intervals would contain the true $\mu$." The INCORRECT interpretation, "there is a $95\%$ probability that $\mu$ is between $48.08$ and $55.92$," treats $\mu$ (a FIXED, unknown constant) as if it were random and this ONE interval as if it had a $95\%$ chance of containing it — but $\mu$ either is or isn't in $[48.08,55.92]$, with no remaining randomness once this specific interval is fixed; the $95\%$ describes the PROCEDURE's long-run success rate, not this single outcome.

**Example 3 (LO3, orientation level — unknown $\sigma$ requiring the $t$-distribution, breaking MC-3)**: suppose instead $\sigma$ is UNKNOWN, and the same sample ($n=25$, $\bar x=52$) has sample standard deviation $s=10$. Naively reusing $z=1.96$ with $s$ substituted for $\sigma$ ($52\pm1.96(10/5)=52\pm3.92$) UNDERSTATES the true uncertainty, because it ignores that $s$ ITSELF is an estimate, subject to its own sampling variability. The correct approach uses a $t$-distribution critical value with $n-1=24$ degrees of freedom (larger than $1.96$, e.g. approximately $2.064$ for a $95\%$ CI with $24$ df), giving a WIDER interval $52\pm2.064(2)=52\pm4.128$ — genuinely wider than the naive z-based interval, correctly reflecting the extra uncertainty from not knowing $\sigma$ exactly.

## Component 5 — Teaching Actions

### Teaching Action A01 — The CI Formula Assembles Two Facts You Already Know (Primitive P11: Representation Shift)

State: "$1.96$ and $\sigma/\sqrt n$ aren't new mysterious constants — $1.96$ is the standard normal's own $95\%$-area boundary from `math.prob.normal-distribution`, and $\sigma/\sqrt n$ is `math.stats.sampling-distribution`'s own standard error." Walk Example 1's direct assembly of the interval from these two known pieces.

- **MC-1 hook**: ask "is the confidence interval formula $\bar x\pm1.96\sigma/\sqrt n$ built from a genuinely new, independent constant $1.96$, unrelated to anything already learned about the normal distribution?" — a "yes" answer reveals MC-1 (missing that $1.96$ is exactly the standard normal's $95\%$-area $z$-value, and $\sigma/\sqrt n$ is the already-known standard error).

### Teaching Action A02 — "95% Confidence" Describes the Procedure, Not This One Interval (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: contrasting the correct (procedure-level, repeated-sampling) interpretation against the incorrect (this-specific-interval) interpretation, and explaining why $\mu$'s fixed, non-random status makes the second interpretation meaningless once the interval is computed. State: "the $95\%$ describes how often the CONSTRUCTION METHOD succeeds across many hypothetical samples — not a probability attached to this one already-computed interval."

- **MC-2 hook**: ask "does '95% confidence interval' mean there is a 95% probability that $\theta$ falls within this SPECIFIC, already-computed interval?" — a "yes" answer reveals MC-2 (missing that the 95% describes the long-run success rate of the construction PROCEDURE across repeated sampling, not a probability about this fixed interval).

### Teaching Action A03 — Not Knowing $\sigma$ Genuinely Widens the Interval (Primitive P06: Contrast Pair)

Contrast Example 1's known-$\sigma$ interval ($\pm3.92$) against Example 3's unknown-$\sigma$ interval using the correct $t$-based approach ($\pm4.128$) — genuinely wider, not merely a formality. State: "substituting $s$ for $\sigma$ without adjusting the critical value UNDERSTATES your true uncertainty — the wider $t$-based interval is the honest reflection of not knowing $\sigma$ exactly."

- **MC-3 hook**: ask "when $\sigma$ is unknown and estimated by $s$, can you simply substitute $s$ for $\sigma$ in the same formula with $z=1.96$, without any other adjustment?" — a "yes" answer reveals MC-3 (missing that this substitution requires switching to the wider $t$-distribution critical value to correctly account for the extra uncertainty from estimating $\sigma$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the $95\%$ CI for $\mu$ given $n=36$, $\bar x=100$, known $\sigma=12$.
  2. State, in your own words, the CORRECT repeated-sampling interpretation of your answer to problem 1, and explain in one sentence why "95% probability $\mu$ is in this interval" is not the right interpretation.
  3. Explain why substituting the sample standard deviation $s$ for $\sigma$ (with no other change) would understate the interval's true uncertainty.
  4. Without computing exact values, explain qualitatively why a $t$-based CI (unknown $\sigma$) is wider than a $z$-based CI (known $\sigma$) for the same sample.
- **P76 (Transfer Probe, mode = independence)**: "A researcher measures the mean reaction time of $n=49$ subjects, getting $\bar x=250$ms with KNOWN population standard deviation $\sigma=35$ms. (a) Construct the $95\%$ confidence interval, identifying which of its two components comes from `math.prob.normal-distribution` and which from `math.stats.sampling-distribution`. (b) A colleague reports the interval and states 'there's a 95% chance the true mean reaction time is in this range' — correct this statement using the proper repeated-sampling interpretation. (c) Suppose instead $\sigma$ were unknown and had to be estimated from the sample as $s=35$ms — explain what would need to change about the interval construction, and whether the resulting interval would be wider, narrower, or the same width as the known-$\sigma$ interval from part (a)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CI-FORMULA-ASSUMED-NEW-INDEPENDENT-CONSTANTS | Believing the CI formula's $1.96$ and $\sigma/\sqrt n$ are new, independent constants, missing that they are exactly the standard normal's 95%-area z-value and the already-known standard error | Foundational |
| MC-2 | CONFIDENCE-LEVEL-ASSUMED-PROBABILITY-OF-THIS-INTERVAL | Believing "95% confidence" means a 95% probability that $\theta$ is in this specific, already-computed interval, missing that it describes the long-run success rate of the construction procedure | High |
| MC-3 | UNKNOWN-SIGMA-ASSUMED-TO-NEED-NO-ADJUSTMENT | Believing substituting $s$ for unknown $\sigma$ requires no other change to the CI formula, missing that this requires switching to a wider $t$-distribution critical value | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "CI Formula Assumed New Independent Constants") → P41 (detect: ask whether $1.96$ and $\sigma/\sqrt n$ are new, independent constants unrelated to prior material) → P64 (conceptual shift: re-walk Example 1's direct assembly from the standard normal's z-value and the standard error, re-anchoring on "both pieces are already-known facts, simply combined").
- **B02 (targets MC-2)**: P27 (name it: "Confidence Level Assumed Probability of This Interval") → P41 (detect: ask whether 95% confidence means a 95% probability θ is in this specific interval) → P64 (conceptual shift: re-walk Example 2's procedure-versus-this-interval contrast, re-anchoring on "95% describes the construction procedure's long-run success rate").
- **B03 (targets MC-3)**: P27 (name it: "Unknown Sigma Assumed to Need No Adjustment") → P41 (detect: ask whether substituting $s$ for unknown $\sigma$ requires no other formula change) → P64 (conceptual shift: re-walk Example 3's z-versus-t width comparison, re-anchoring on "estimating $\sigma$ requires the wider t-distribution critical value").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.sampling-distribution` (the distribution of $\bar X$, its mean $\mu$, and standard error $\sigma/\sqrt n$, directly assembled into the CI) and `math.prob.normal-distribution` (the standard normal's $95\%$-area $z$-value $1.96$, and the CLT-based normality of $\bar X$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational and conceptual depth (the formula assembly and the correct interpretation contrast) and LO3 kept orientation-level, appropriately previewing the unknown-$\sigma$/$t$-distribution adjustment without deriving the $t$-distribution's density or degrees-of-freedom theory.
- **Division of labor**: `math.stats.sampling-distribution` owns $\bar X$'s distribution and standard error; `math.prob.normal-distribution` owns the standard normal's area/z-value facts. This concept owns COMBINING these into the CI formula and its correct interpretation — deliberately reusing the SAME sample ($n=25$, $\bar x=52$) across Examples 1 and 3 so the known-$\sigma$ and unknown-$\sigma$ intervals are directly comparable in width on identical underlying data.
- Example 2's deliberate choice to state BOTH the correct and incorrect interpretations explicitly, side by side, was chosen because MC-2 is a notoriously persistent and widespread misconception in introductory statistics, warranting direct contrastive treatment rather than only stating the correct interpretation in isolation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: one specific 95% CI construction precedes the general formula and interpretation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
