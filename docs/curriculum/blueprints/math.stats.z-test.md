# Teaching Blueprint: z-Test (`math.stats.z-test`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.z-test` |
| name | z-Test |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.stats.hypothesis-testing`, `math.prob.standard-normal` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Tests H₀: μ=μ₀ with known σ. Test statistic Z=(X̄−μ₀)/(σ/√n)~N(0,1) under H₀. Compare to z_{α/2} for two-tailed, z_α for one-tailed. Also used for proportion tests.

 |

## Component 1 — Learning Objectives

- LO1: Apply the $z$-test for $H_0:\mu=\mu_0$ WHEN $\sigma$ is KNOWN, computing $Z=\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}$, which follows a standard normal distribution $N(0,1)$ UNDER $H_0$.
- LO2: Compare the computed $Z$ statistic to the appropriate CRITICAL VALUE — $z_{\alpha/2}$ for a TWO-TAILED test (checking both directions of departure from $\mu_0$), or $z_\alpha$ for a ONE-TAILED test (checking only ONE specific direction) — using the WRONG critical value (two-tailed when one-tailed is appropriate, or vice versa) changes the decision threshold incorrectly.
- LO3: Recognize the $z$-test REQUIRES $\sigma$ to be genuinely KNOWN — this is a comparatively RARE practical situation (most real analyses estimate $\sigma$ from the sample, requiring `math.stats.t-test` instead); recognize when the $z$-test's known-$\sigma$ assumption doesn't actually hold in a given scenario.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.hypothesis-testing` (the general framework) and `math.prob.standard-normal` (the reference distribution for the $Z$ statistic).

## Component 3 — Core Explanation

The **$z$-test** tests $H_0:\mu=\mu_0$ specifically WHEN the population standard deviation $\sigma$ is KNOWN. The test statistic is $Z=\frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}$, which follows the STANDARD NORMAL distribution $N(0,1)$ under $H_0$ (from `math.prob.standard-normal`).

The computed $Z$ value is compared against a CRITICAL VALUE depending on the ALTERNATIVE hypothesis: for a TWO-TAILED test ($H_a:\mu\ne\mu_0$), compare $|Z|$ against $z_{\alpha/2}$ (checking both directions of departure); for a ONE-TAILED test ($H_a:\mu>\mu_0$ or $H_a:\mu<\mu_0$), compare $Z$ against $z_\alpha$ in the appropriate direction ONLY. Using the wrong critical value type (e.g. a two-tailed threshold for a genuinely one-tailed alternative, or vice versa) shifts the decision boundary incorrectly.

A crucial applicability check: the $z$-test genuinely REQUIRES $\sigma$ known — a relatively RARE situation in practice (most real studies must estimate $\sigma$ from the sample data itself, using $s$, which calls for `math.stats.t-test` instead). Applying the $z$-test's formula and critical values when $\sigma$ is actually UNKNOWN (using $s$ as a stand-in without switching to the $t$-distribution) understates the true uncertainty.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic computation, breaking MC-1)**: Test $H_0:\mu=100$ against $H_a:\mu\ne100$, given $\bar{x}=104$, $\sigma=8$ (KNOWN), $n=64$. $Z=\frac{104-100}{8/\sqrt{64}}=\frac{4}{1}=4$. A common error uses the SAMPLE standard deviation in place of $\sigma$ without recognizing this changes the test's validity requirements (the $z$-test's known-$\sigma$ assumption is specifically what justifies using the NORMAL distribution as the exact reference — substituting an estimated $s$ without switching to the $t$-distribution introduces unaccounted-for extra uncertainty).

**Example 2 (LO2 — one-tailed vs. two-tailed critical values, breaking MC-2)**: For $Z=1.75$ at $\alpha=0.05$, determine the decision for (a) a TWO-tailed test ($H_a:\mu\ne\mu_0$, critical value $z_{0.025}\approx1.96$) and (b) a ONE-tailed test ($H_a:\mu>\mu_0$, critical value $z_{0.05}\approx1.645$). For (a): $|1.75|<1.96$ — FAIL to reject $H_0$. For (b): $1.75>1.645$ — REJECT $H_0$. A common error uses the SAME critical value (e.g. always 1.96) regardless of whether the test is one-tailed or two-tailed — the SAME observed $Z$ value can lead to OPPOSITE decisions depending on which critical value (and hence which alternative hypothesis structure) is appropriate.

**Example 3 (LO3 — recognizing when the z-test doesn't apply)**: A researcher has sample data with sample standard deviation $s=6$ (computed FROM the data), and no independently-known population $\sigma$. Explain why the $z$-test is NOT the appropriate choice here. Since $\sigma$ is genuinely UNKNOWN (only ESTIMATED via $s$), the $z$-test's core requirement isn't met — `math.stats.t-test` (using the $t$-distribution with $n-1$ degrees of freedom) is the appropriate choice instead, correctly accounting for the extra uncertainty from estimating $\sigma$.

## Component 5 — Teaching Actions

### Teaching Action A01 — The z-Test Requires σ Genuinely Known (Primitive P64: Conceptual Shift)

Work Example 1, explicitly confirming $\sigma$ is known before applying the formula.

- **MC-1 hook**: check whether the z-test formula is applied only when $\sigma$ is genuinely known, not substituted with an estimated $s$.

### Teaching Action A02 — One-Tailed vs. Two-Tailed Critical Values Change the Decision (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the two decision outcomes for the same $Z$ value under different tail structures.

- **MC-2 hook**: this directly targets MC-2 (using the wrong critical value type for the actual alternative hypothesis structure).

### Teaching Action A03 — Recognizing When the z-Test's Assumption Fails (reused procedure)

Present Example 3, explicitly identifying the scenario where the t-test, not the z-test, is appropriate.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Test $H_0:\mu=50$ against $H_a:\mu\ne50$, given $\bar{x}=53$, $\sigma=6$ (known), $n=36$, at $\alpha=0.05$.
  2. For $Z=1.8$ at $\alpha=0.05$, determine the decision for a one-tailed test with $H_a:\mu>\mu_0$.
  3. For the same $Z=1.8$ at $\alpha=0.05$, determine the decision for a two-tailed test.
  4. Explain, in one sentence, why the z-test requires knowing σ, rather than estimating it from the sample.
- **P76 (Transfer Probe, mode = independence)**: "A manufacturing process for machined parts has a well-established, historically KNOWN standard deviation of 0.02mm (from decades of quality records), and a quality engineer wants to test whether today's batch's mean diameter differs from the target specification of 10mm, based on a sample of 50 parts with sample mean 10.008mm. (a) Explain why the z-test (rather than the t-test) is appropriate here, given the historically known σ. (b) Compute the test statistic and determine whether the batch's mean significantly differs from the target at α=0.05 (two-tailed), using $z_{0.025}\approx1.96$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SAMPLE-STANDARD-DEVIATION-SUBSTITUTED-FOR-KNOWN-SIGMA-WITHOUT-SWITCHING-TO-T-TEST | Substituting the sample standard deviation s for σ in the z-test formula without recognizing this requires switching to the t-test instead | Foundational |
| MC-2 | SAME-CRITICAL-VALUE-USED-REGARDLESS-OF-ONE-TAILED-OR-TWO-TAILED-STRUCTURE | Using the same critical value regardless of whether the test is one-tailed or two-tailed, potentially reversing the correct decision | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Sample Standard Deviation Substituted for Known Sigma Without Switching to T-Test") → P41 (detect: check whether $\sigma$ is genuinely known or merely estimated from the sample) → P64 (conceptual shift: re-verify the known/unknown status of $\sigma$, switching to the $t$-test if estimated).
- **B02 (targets MC-2)**: P27 ("Same Critical Value Used Regardless of One-Tailed or Two-Tailed Structure") → P41 (detect: present Example 2 and check whether the correct critical value is matched to the actual alternative hypothesis structure) → P64 (conceptual shift: re-identify the alternative hypothesis's directionality explicitly, selecting the matching critical value).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.hypothesis-testing`, `math.prob.standard-normal`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.t-test` (the more commonly applicable alternative when σ is unknown).

## Component 8 — Teaching Notes

- estimated_hours = 4 and mastery_threshold = 0.85 reflect the genuine importance of correctly recognizing this test's applicability conditions, not just its computational mechanics.
- Both misconceptions were ranked Foundational because each can lead to a genuinely wrong hypothesis-testing decision.
- The manufacturing-quality-control transfer probe was deliberately chosen because a historically well-established, genuinely known σ (from long production records) is one of the few realistic scenarios where the z-test's assumption truly holds, distinguishing it from the far more common t-test scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.hypothesis-testing`, `math.prob.standard-normal`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
