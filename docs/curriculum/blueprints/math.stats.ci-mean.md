# Teaching Blueprint: Confidence Interval for a Mean (`math.stats.ci-mean`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.ci-mean` |
| name | Confidence Interval for a Mean |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.confidence-interval`, `math.prob.continuous-distributions` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Known σ: x̄ ± z_{α/2}·σ/√n (z-interval). Unknown σ, estimated by s: x̄ ± t_{α/2,n-1}·s/√n (t-interval using t-distribution with n−1 df). Width decreases with larger n.

 |

## Component 1 — Learning Objectives

- LO1: Construct a $z$-interval $\bar{x}\pm z_{\alpha/2}\cdot\frac{\sigma}{\sqrt{n}}$ WHEN the population standard deviation $\sigma$ is KNOWN.
- LO2: Construct a $t$-interval $\bar{x}\pm t_{\alpha/2,n-1}\cdot\frac{s}{\sqrt{n}}$ WHEN $\sigma$ is UNKNOWN (estimated by the sample standard deviation $s$) — using the $t$-DISTRIBUTION with $n-1$ DEGREES OF FREEDOM specifically, NOT the normal ($z$) distribution's critical values, since $s$ itself is an estimate carrying extra uncertainty.
- LO3: Recognize the interval's WIDTH decreases as $n$ increases (via the $\sqrt{n}$ in the denominator, mirroring `math.stats.standard-error`'s scaling) — and recognize that a HIGHER confidence level (e.g. 99% vs. 95%) requires a LARGER critical value, producing a WIDER interval, all else equal — confidence level and interval width trade off directly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.confidence-interval` (the general concept) and `math.prob.continuous-distributions` (needed for the $z$ and $t$ distributions' critical values).

## Component 3 — Core Explanation

A **confidence interval for a mean** provides a range of plausible values for the true population mean $\mu$, based on sample data. When the population standard deviation $\sigma$ is KNOWN, use the **$z$-interval**: $\bar{x}\pm z_{\alpha/2}\cdot\frac{\sigma}{\sqrt{n}}$, using the standard NORMAL distribution's critical value $z_{\alpha/2}$.

When $\sigma$ is UNKNOWN (the far more common practical situation) and must be ESTIMATED by the sample standard deviation $s$, use the **$t$-interval**: $\bar{x}\pm t_{\alpha/2,n-1}\cdot\frac{s}{\sqrt{n}}$ — using the $t$-DISTRIBUTION with $n-1$ DEGREES OF FREEDOM, NOT the normal distribution's critical values. The $t$-distribution has FATTER tails than the normal, accounting for the EXTRA uncertainty introduced by estimating $\sigma$ with $s$ rather than knowing it exactly — using $z$-critical-values here would UNDERSTATE the true uncertainty.

The interval's WIDTH shrinks as $n$ INCREASES (via the $\sqrt{n}$ denominator, exactly mirroring the standard error's scaling behavior). Separately, a HIGHER confidence level (e.g. moving from 95% to 99%) requires a LARGER critical value ($z_{\alpha/2}$ or $t_{\alpha/2,n-1}$), producing a WIDER interval for the SAME data — confidence and precision (narrowness) trade off directly against each other.

## Component 4 — Worked Examples

**Example 1 (LO1 — z-interval with known σ, breaking MC-1)**: Construct a 95% confidence interval for $\mu$, given $\bar{x}=50$, $\sigma=8$ (KNOWN), $n=64$. Using $z_{0.025}\approx1.96$: $50\pm1.96\cdot\frac{8}{\sqrt{64}}=50\pm1.96(1)=50\pm1.96$, i.e. $(48.04,51.96)$. A common error uses the $t$-distribution's critical value even though $\sigma$ is GENUINELY KNOWN in this problem — the $z$-interval is the correct (and simpler) choice specifically when $\sigma$ is known; reaching for $t$ automatically, without checking whether $\sigma$ is known or estimated, is an unnecessary (though not always wrong-answer-producing) habit that misses the actual distinguishing condition.

**Example 2 (LO2 — t-interval with unknown σ, breaking MC-2)**: Construct a 95% confidence interval for $\mu$, given $\bar{x}=50$, $s=8$ (ESTIMATED from the sample, $\sigma$ genuinely unknown), $n=16$. Since $\sigma$ is unknown, use the $t$-distribution with $n-1=15$ degrees of freedom: $t_{0.025,15}\approx2.131$. Interval: $50\pm2.131\cdot\frac{8}{\sqrt{16}}=50\pm2.131(2)=50\pm4.262$, i.e. $(45.738,54.262)$ — notably WIDER than if a $z$-critical-value (1.96) had been mistakenly used, since $t_{0.025,15}>z_{0.025}$. A common error uses the $z$-critical-value (1.96) here even though $\sigma$ is UNKNOWN (estimated by $s$) — this UNDERSTATES the true uncertainty, producing an interval that is falsely narrower (and less genuinely "95% confident") than it should be.

**Example 3 (LO3 — width vs. confidence level tradeoff)**: For the same data as Example 1 ($\bar{x}=50$, $\sigma=8$, $n=64$), compare the 95% interval (width using $z\approx1.96$) against a 99% interval (using $z\approx2.576$). The 99% interval is WIDER (using the larger critical value 2.576 instead of 1.96), reflecting the tradeoff: greater confidence requires a wider range to maintain that higher confidence guarantee.

## Component 5 — Teaching Actions

### Teaching Action A01 — Use z When σ Is Genuinely Known (reused procedure)

Work Example 1, explicitly confirming $\sigma$ is known before selecting the $z$-interval.

- **MC-1 hook**: check whether the $z$-interval is correctly used specifically because $\sigma$ is known here.

### Teaching Action A02 — Use t (with n-1 df) When σ Is Estimated by s (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the correct $t$-interval against the incorrect $z$-interval shortcut, showing the resulting width difference.

- **MC-2 hook**: this directly targets MC-2 (using $z$-critical-values when $\sigma$ is actually unknown and estimated by $s$).

### Teaching Action A03 — Higher Confidence Requires a Wider Interval (Primitive P64: Conceptual Shift)

Work Example 3, explicitly comparing 95% and 99% interval widths for the same data.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Construct a 95% $z$-interval for $\mu$ given $\bar{x}=30$, $\sigma=5$ (known), $n=100$.
  2. Construct a 95% $t$-interval for $\mu$ given $\bar{x}=30$, $s=5$ (estimated), $n=20$.
  3. Explain, in one sentence, why the $t$-interval uses a critical value from a distribution with fatter tails than the normal.
  4. Explain why a 99% confidence interval is wider than a 95% confidence interval for the same data.
- **P76 (Transfer Probe, mode = independence)**: "A pharmaceutical researcher measures the average reduction in blood pressure from a new drug across 25 patients, finding a sample mean reduction of 12 mmHg and a SAMPLE standard deviation (not a known population value) of 4 mmHg. (a) Explain why the researcher must use the $t$-distribution (not the normal/z distribution) to construct a confidence interval here. (b) Construct a 95% confidence interval for the true mean blood pressure reduction, using $t_{0.025,24}\approx2.064$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | T-DISTRIBUTION-USED-EVEN-WHEN-SIGMA-IS-GENUINELY-KNOWN | Reaching for the t-distribution's critical value out of habit even when the population standard deviation σ is genuinely known, missing the actual distinguishing condition | Minor |
| MC-2 | Z-CRITICAL-VALUE-USED-WHEN-SIGMA-IS-UNKNOWN-AND-ESTIMATED-BY-S | Using the normal distribution's z-critical-value when σ is actually unknown and estimated by s, understating the true uncertainty and producing a falsely narrow interval | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("T-Distribution Used Even When Sigma Is Genuinely Known") → P41 (detect: check whether $\sigma$'s known/unknown status is verified before selecting the distribution) → P64 (conceptual shift: re-confirm whether $\sigma$ is given directly (use z) or estimated by $s$ (use t) before proceeding).
- **B02 (targets MC-2)**: P27 ("Z-Critical-Value Used When Sigma Is Unknown and Estimated by S") → P41 (detect: present Example 2 and check whether $z$ is (incorrectly) used instead of $t$) → P64 (conceptual shift: re-identify that $\sigma$ is unknown here, switching to the $t$-distribution with $n-1$ degrees of freedom).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.confidence-interval`, `math.prob.continuous-distributions`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.confidence-interval`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this is one of the most frequently-applied statistical procedures, warranting near-automatic correct execution.
- MC-2 was ranked Foundational because it produces a genuinely UNDERCONFIDENT (falsely narrow) interval with real practical consequences, while MC-1 was ranked Minor since using $t$ when $z$ would suffice still produces a valid (if slightly conservative) interval.
- The pharmaceutical-trial transfer probe was deliberately chosen because using sample-estimated variability (requiring $t$, not $z$) is the realistic default scenario in genuine research settings, reinforcing the correct distribution choice under real conditions.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.confidence-interval`, `math.prob.continuous-distributions`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
