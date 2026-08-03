# Teaching Blueprint: Conjugate Prior (`math.stats.conjugate-prior`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.conjugate-prior` |
| name | Conjugate Prior |
| domain | Statistics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.stats.bayesian-inference` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A prior family closed under Bayesian updating: when likelihood is from the conjugate family, the posterior has the same distributional form as the prior with updated parameters. E.g., Beta prior + Binomial likelihood → Beta posterior.

 |

## Component 1 — Learning Objectives

- LO1: Define a CONJUGATE PRIOR as a prior distribution FAMILY that is CLOSED under Bayesian updating — when the likelihood comes from the MATCHING conjugate family, the POSTERIOR has the SAME distributional FORM as the prior, just with UPDATED parameters.
- LO2: Apply the classic Beta-Binomial conjugacy — a Beta$(\alpha,\beta)$ prior combined with a Binomial likelihood (observing $k$ successes in $n$ trials) produces a Beta$(\alpha+k,\beta+n-k)$ POSTERIOR — recognizing the UPDATE RULE (add successes to $\alpha$, add failures to $\beta$) rather than re-deriving the full posterior computation from scratch each time.
- LO3: Recognize the PRACTICAL VALUE of conjugacy — it avoids needing to numerically integrate or approximate the posterior (which can be analytically INTRACTABLE for non-conjugate prior/likelihood pairs) — conjugate priors are chosen partly for MATHEMATICAL CONVENIENCE, not necessarily because they represent the "most accurate" possible prior belief.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.bayesian-inference` — conjugate priors are a specific, computationally convenient technique within that general framework.

## Component 3 — Core Explanation

A **conjugate prior** is a prior distribution FAMILY with a special property: it's CLOSED under Bayesian updating — when combined with a MATCHING likelihood family, the resulting POSTERIOR distribution has the SAME functional FORM as the prior, just with its PARAMETERS updated to reflect the new data. This means you don't need to perform complicated integration or numerical approximation to find the posterior — you can just look up the UPDATE RULE.

The classic example: Beta-Binomial conjugacy. A Beta$(\alpha,\beta)$ PRIOR on a proportion $p$, combined with a BINOMIAL likelihood (observing $k$ successes out of $n$ trials), produces a Beta$(\alpha+k,\beta+n-k)$ POSTERIOR — the update rule simply ADDS the observed successes $k$ to $\alpha$, and adds the observed FAILURES ($n-k$) to $\beta$. This is a direct, mechanical update, requiring no fresh integration each time new data arrives.

The PRACTICAL value of conjugacy: for many prior/likelihood COMBINATIONS, computing the true posterior analytically is genuinely INTRACTABLE (requiring numerical integration or simulation methods like MCMC) — conjugate priors sidestep this entirely, providing a closed-form posterior. However, conjugate priors are often chosen partly for this MATHEMATICAL CONVENIENCE, NOT necessarily because they represent the single "most accurate" or "most honest" possible representation of genuine prior belief — this is a real, acknowledged tradeoff in Bayesian practice.

## Component 4 — Worked Examples

**Example 1 (LO2 — applying the Beta-Binomial update rule, breaking MC-1)**: For a Beta$(2,3)$ prior on a proportion $p$, and an observed 7 successes out of 10 trials, find the posterior. Posterior: Beta$(2+7,3+(10-7))=$ Beta$(9,6)$. A common error adds the TOTAL number of trials $n$ (rather than specifically the FAILURES, $n-k$) to $\beta$ — e.g. computing Beta$(2+7,3+10)=$Beta$(9,13)$ instead of the correct Beta$(9,6)$ — the update rule specifically requires adding SUCCESSES to $\alpha$ and FAILURES (not total trials) to $\beta$.

**Example 2 (LO1 — recognizing the "same family, updated parameters" structure)**: Confirm that the posterior in Example 1 (Beta$(9,6)$) is genuinely the SAME distributional FAMILY (Beta) as the prior (Beta$(2,3)$), just with DIFFERENT parameters. This is exactly what "conjugate" means — the mathematical FORM stays Beta throughout, with only the parameters shifting to reflect the newly observed data, which is precisely why no fresh integration was needed to derive this result.

**Example 3 (LO3 — conjugacy as computational convenience, not necessarily "most honest" belief, breaking MC-2)**: A statistician chooses a Beta prior for a proportion PARTLY because of its mathematical convenience (Beta-Binomial conjugacy), even though their TRUE prior belief about the proportion might be better represented by some other, non-conjugate distribution shape. Explain why this is a genuine, acknowledged tradeoff in Bayesian practice, not a methodological error. Conjugate priors offer substantial COMPUTATIONAL convenience (closed-form posteriors, no numerical integration needed) — this convenience is a LEGITIMATE, practical reason for choosing a conjugate family, even when it might not perfectly capture every nuance of one's genuine prior belief; modern computational methods (like MCMC) can handle non-conjugate cases when the convenience tradeoff isn't acceptable, but conjugacy remains valuable especially for simpler models or real-time updating. A common error assumes choosing a conjugate prior for computational convenience is somehow "cheating" or methodologically invalid, rather than recognizing it as a legitimate, well-established practical tradeoff in the field.

## Component 5 — Teaching Actions

### Teaching Action A01 — Beta-Binomial Update: Add Successes to α, Failures (Not Total Trials) to β (Primitive P64: Conceptual Shift)

Work Example 1, explicitly separating successes and failures before applying the update rule.

- **MC-1 hook**: check whether failures (not total trials) are correctly added to $\beta$.

### Teaching Action A02 — Same Family, Updated Parameters — What "Conjugate" Means (reused procedure)

Present Example 2, explicitly confirming the prior and posterior share the same distributional family.

### Teaching Action A03 — Conjugacy Is a Legitimate Computational Convenience Tradeoff (Primitive P06: Contrast Pair)

Work Example 3, explicitly contrasting the legitimate convenience-based choice against the mistaken "cheating" framing.

- **MC-2 hook**: this directly targets MC-2 (viewing conjugate-prior selection for computational convenience as methodologically illegitimate).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For a Beta$(1,1)$ prior and 4 successes out of 6 trials, find the posterior.
  2. For a Beta$(5,2)$ prior and 3 successes out of 8 trials, find the posterior.
  3. Explain, in one sentence, what it means for a prior/likelihood pair to be "conjugate."
  4. Explain why conjugate priors are practically valuable, connecting to the alternative of numerical integration for non-conjugate cases.
- **P76 (Transfer Probe, mode = independence)**: "An A/B testing platform continuously updates its belief about a website variant's true conversion rate as new visitor data streams in throughout the day, using a Beta prior updated with each new batch of Binomial (success/failure) conversion data. (a) Explain why using a Beta-Binomial conjugate setup allows the platform to update its belief instantly with each new data batch, without complex recomputation. (b) If the prior starts as Beta(10,10) and the first day's data shows 45 conversions out of 100 visitors, find the updated posterior."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BETA-BINOMIAL-UPDATE-ADDS-TOTAL-TRIALS-INSTEAD-OF-FAILURES-TO-BETA | Adding the total number of trials n (rather than specifically the failures, n-k) to the β parameter when applying the Beta-Binomial conjugate update rule | Foundational |
| MC-2 | CONJUGATE-PRIOR-SELECTION-FOR-CONVENIENCE-VIEWED-AS-METHODOLOGICALLY-ILLEGITIMATE | Viewing the choice of a conjugate prior for computational convenience as methodologically invalid or "cheating," rather than a legitimate, well-established practical tradeoff | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Beta-Binomial Update Adds Total Trials Instead of Failures to Beta") → P41 (detect: present Example 1 and check whether failures specifically (not total trials) are added to $\beta$) → P64 (conceptual shift: re-derive the update rule explicitly, separating successes ($k$, added to $\alpha$) from failures ($n-k$, added to $\beta$)).
- **B02 (targets MC-2)**: P27 ("Conjugate Prior Selection for Convenience Viewed as Methodologically Illegitimate") → P41 (detect: ask whether choosing a conjugate prior for convenience is viewed as invalid) → P64 (conceptual shift: re-frame conjugacy's convenience as a recognized, legitimate practical tradeoff in the field, not a shortcut that undermines validity).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.bayesian-inference`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.bayesian-inference`.

## Component 8 — Teaching Notes

- difficulty = expert reflects that this concept requires genuine comfort with the broader Bayesian framework before this specific computational technique makes sense.
- MC-1 was ranked Foundational because it produces a genuinely wrong posterior distribution, while MC-2 was ranked Minor as a philosophical/practical framing issue that doesn't affect correct computation once the technique is applied.
- The A/B-testing streaming-update transfer probe was deliberately chosen because real-time conjugate Bayesian updating is one of the most widespread and practically important modern applications of this concept in tech industry experimentation platforms.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.bayesian-inference`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
