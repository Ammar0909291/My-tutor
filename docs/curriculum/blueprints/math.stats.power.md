# Teaching Blueprint: Power of a Test (`math.stats.power`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.power` |
| name | Power of a Test |
| domain | Statistics |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.stats.type-errors` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Power = P(reject H₀ | H₁ true) = 1−β. Increases with sample size, effect size, and α. Power analysis used for sample size determination before collecting data.

 |

## Component 1 — Learning Objectives

- LO1: Define POWER $=P(\text{reject }H_0\mid H_1\text{ true})=1-\beta$ — the PROBABILITY of correctly detecting a real effect when one genuinely exists — and recognize this is DIRECTLY related to $\beta$ (Type II error rate), NOT a separate, independent quantity.
- LO2: Identify the THREE factors that INCREASE power — larger SAMPLE SIZE, larger EFFECT SIZE (the true difference being detected), and larger $\alpha$ (a more lenient significance threshold) — and recognize each factor's increase comes with its OWN tradeoff (larger $n$ costs resources; effect size isn't researcher-controlled; larger $\alpha$ increases Type I error risk).
- LO3: Apply POWER ANALYSIS conceptually — determining the REQUIRED sample size BEFORE collecting data, to ensure adequate power for detecting a meaningfully-sized effect — recognizing this is a PLANNING tool used PRIOR to a study, not a post-hoc justification computed after already seeing the results.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.type-errors` — power is directly defined in terms of the Type II error rate $\beta$.

## Component 3 — Core Explanation

The **power** of a hypothesis test is $P(\text{reject }H_0\mid H_1\text{ true})=1-\beta$ — the probability of CORRECTLY detecting a genuine effect (rejecting $H_0$) when the alternative $H_1$ is actually TRUE. Power is directly tied to `math.stats.type-errors`'s $\beta$ (Type II error rate, the probability of FAILING to detect a genuine effect) — power is simply $1$ MINUS this failure rate, not an independent quantity requiring separate derivation.

THREE factors increase power: a larger SAMPLE SIZE $n$ (more data provides more precise estimates, making real effects easier to detect); a larger EFFECT SIZE (a bigger TRUE difference is inherently easier to detect than a subtle one); and a larger $\alpha$ (a more lenient significance threshold makes rejecting $H_0$ easier overall — including when $H_1$ is true). Each factor's increase carries its OWN tradeoff: larger $n$ costs more time/money/resources to collect; effect size is a property of REALITY, not something the researcher can simply choose to increase; and a larger $\alpha$ directly increases the Type I error RATE (more false positives).

**Power analysis** is the practice of determining the REQUIRED sample size BEFORE conducting a study, to ensure adequate power (commonly targeting 80% or higher) for detecting a meaningfully-sized effect. This is fundamentally a PLANNING tool, used PRIOR to data collection — computing "power" AFTER already seeing the results (a so-called "post-hoc power analysis") is a widely-criticized practice that doesn't provide the same genuine planning value.

## Component 4 — Worked Examples

**Example 1 (LO1 — power as 1-β, breaking MC-1)**: Given $\beta=0.2$ for a specific test scenario, find the power. Power $=1-0.2=0.8$ (80%). A common error treats power and $\beta$ as UNRELATED quantities requiring separate independent computation, rather than recognizing power is DEFINED as $1-\beta$ — once one is known, the other follows immediately by this direct relationship, with no separate calculation needed.

**Example 2 (LO2 — the three power-increasing factors and their tradeoffs, breaking MC-2)**: A researcher wants to increase a study's power. Identify three ways to do this, and the tradeoff each involves. (1) Increase sample size — costs more resources/time. (2) [Effect size isn't researcher-controllable, so this isn't a genuine "action" the researcher can take — it's a fact about reality]. (3) Increase $\alpha$ (e.g. from 0.05 to 0.10) — increases the Type I error rate (more false positives). A common error assumes increasing power is a UNIVERSALLY GOOD, cost-free improvement (e.g. simply recommending "increase $\alpha$" without noting the corresponding rise in false-positive risk) — every power-increasing lever comes with a genuine tradeoff that must be weighed, not a free lunch.

**Example 3 (LO3 — power analysis as pre-study planning, breaking MC-3-merged)**: A researcher runs a study, finds a NON-significant result, and THEN computes "post-hoc power" using the observed effect size from THIS study, arguing "our power was low, so the non-significant result doesn't mean much." Explain why this reasoning is methodologically suspect. Post-hoc power computed using the OBSERVED (already collected) effect size is mathematically nearly a DIRECT function of the $p$-value itself, providing NO genuinely new information beyond what the $p$-value already conveyed — genuine power analysis is a PLANNING tool, conducted BEFORE data collection using an ASSUMED (not yet observed) effect size, to determine an appropriate sample size in advance; computing it retrospectively from the SAME data doesn't serve this planning purpose and is widely regarded as statistically uninformative or even misleading.

## Component 5 — Teaching Actions

### Teaching Action A01 — Power Is Directly 1 Minus Beta, Not a Separately Computed Quantity (Primitive P64: Conceptual Shift)

Work Example 1, explicitly deriving power directly from $\beta$.

- **MC-1 hook**: check whether power is correctly computed as $1-\beta$, not treated as an unrelated quantity.

### Teaching Action A02 — Every Power-Increasing Factor Has a Genuine Tradeoff (Primitive P06: Contrast Pair)

Work Example 2, explicitly identifying each factor's associated cost or tradeoff.

- **MC-2 hook**: this directly targets MC-2 (treating a power-increasing action as universally beneficial without recognizing its tradeoff).

### Teaching Action A03 — Power Analysis Is a Pre-Study Planning Tool, Not a Post-Hoc Justification (reused procedure)

Present Example 3, explicitly explaining why post-hoc power analysis is methodologically suspect.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given $\beta=0.35$, find the power.
  2. List the three factors that increase a test's power.
  3. Explain the tradeoff involved in increasing power by raising $\alpha$.
  4. Explain why power analysis should be conducted before data collection, rather than after seeing non-significant results.
- **P76 (Transfer Probe, mode = independence)**: "A clinical trial is being planned to test a new medication, and the research team needs to determine how many patients to enroll to have adequate power (80%) to detect a clinically meaningful improvement, before the trial begins. (a) Explain why conducting this power analysis BEFORE the trial (using an assumed effect size from prior research) is the appropriate approach, rather than waiting to see the trial's results first. (b) Explain how increasing the planned sample size would affect the trial's power, and what practical tradeoff this involves for the research team."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POWER-AND-BETA-TREATED-AS-UNRELATED-QUANTITIES-REQUIRING-SEPARATE-COMPUTATION | Treating power and β (Type II error rate) as independent, separately-computed quantities rather than recognizing power is directly 1 minus β | Foundational |
| MC-2 | POWER-INCREASING-ACTIONS-ASSUMED-COST-FREE-WITHOUT-RECOGNIZING-THEIR-TRADEOFFS | Assuming a power-increasing action (like raising α or sample size) is a universally beneficial improvement with no accompanying cost or tradeoff | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Power and Beta Treated as Unrelated Quantities Requiring Separate Computation") → P41 (detect: present Example 1 and check whether power is derived directly from $\beta$) → P64 (conceptual shift: re-state the defining relationship $\text{power}=1-\beta$ explicitly).
- **B02 (targets MC-2)**: P27 ("Power Increasing Actions Assumed Cost Free Without Recognizing Their Tradeoffs") → P41 (detect: present Example 2 and check whether the tradeoff for each factor is identified) → P64 (conceptual shift: re-examine each power-increasing factor explicitly, naming its associated cost).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.type-errors`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.hypothesis-testing`.

## Component 8 — Teaching Notes

- bloom = analyze reflects that this concept requires genuine tradeoff-weighing analysis, not just formula application.
- Both misconceptions were ranked Foundational because each reflects a genuine misunderstanding of power's core defining relationship or its cost structure, with real practical consequences for study design.
- The clinical-trial-sample-size-planning transfer probe was deliberately chosen because a priori power analysis for sample size determination is one of the most consequential, genuinely required real-world applications of this concept in medical and scientific research.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.type-errors`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
