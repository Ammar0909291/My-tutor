# Teaching Blueprint: Experimental Design (`math.stats.experimental-design`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.experimental-design` |
| name | Experimental Design |
| domain | Statistics |
| difficulty | expert |
| bloom | evaluate |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.stats.sampling`, `math.stats.anova` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Principles: randomization (assign treatments randomly), replication (sufficient sample size), blocking (group similar units to reduce noise). Key designs: CRD, RCBD, factorial. Controls for confounding; enables causal inference.

 |

## Component 1 — Learning Objectives

- LO1: Apply the THREE core principles of experimental design — RANDOMIZATION (assigning treatments to units RANDOMLY, not by any systematic or convenient rule), REPLICATION (using SUFFICIENT sample size to distinguish real effects from random noise), and BLOCKING (grouping similar units together to REDUCE noise, from `math.stats.two-way-anova`'s treatment of blocking).
- LO2: Recognize RANDOMIZATION specifically as the tool that CONTROLS FOR CONFOUNDING and enables CAUSAL inference — by randomly assigning treatments, any OTHER variable (known or unknown) is, on average, equally distributed across treatment groups, ruling out systematic confounding as an alternative explanation for observed differences.
- LO3: Distinguish the KEY DESIGN TYPES — Completely Randomized Design (CRD, simplest, no blocking), Randomized Complete Block Design (RCBD, incorporates blocking), and Factorial designs (multiple factors tested simultaneously, connecting to `math.stats.two-way-anova`) — and recognize each addresses a DIFFERENT practical concern (simplicity vs. noise reduction vs. studying multiple factors' effects and interactions).

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.sampling` (the broader data-collection context) and `math.stats.anova` (the analysis framework these designs typically feed into).

## Component 3 — Core Explanation

**Experimental design** rests on THREE core principles. **Randomization** means assigning treatments to experimental units RANDOMLY (e.g. by coin flip or random number generator), NOT by any convenient or systematic rule (like "first 10 subjects get treatment A"). **Replication** means using a SUFFICIENT sample size, so that genuine treatment effects can be statistically distinguished from ordinary random noise. **Blocking** means grouping SIMILAR experimental units together (e.g. by known source of variability, like "day of experiment" or "patient age group") to REDUCE the residual noise obscuring the treatment comparison.

RANDOMIZATION specifically is what enables valid CAUSAL inference and controls for CONFOUNDING: by assigning treatments randomly, any OTHER variable — measured OR unmeasured — is, on AVERAGE, distributed EQUALLY across the treatment groups, ruling out the possibility that some systematic difference between groups (rather than the treatment itself) explains an observed effect. This is precisely why well-designed RANDOMIZED experiments can support causal claims that mere observational correlational studies (`math.stats.correlation`) cannot.

Key DESIGN TYPES include the **Completely Randomized Design (CRD)** (the simplest — units randomly assigned to treatments with no blocking structure), the **Randomized Complete Block Design (RCBD)** (incorporating blocking to reduce noise from a known nuisance source), and **Factorial designs** (testing MULTIPLE factors simultaneously, directly connecting to `math.stats.two-way-anova`'s main-effects-and-interaction framework). Each addresses a DIFFERENT practical need: CRD for simplicity when no obvious blocking variable exists; RCBD when a known nuisance source (like day-to-day variation) should be controlled; factorial designs when multiple factors' individual AND joint effects are of scientific interest.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — randomization enables causal inference, breaking MC-1)**: A researcher wants to test a new fertilizer's effect on crop yield, and RANDOMLY assigns half of 100 plots to receive the fertilizer and half to receive none. Explain why this random assignment allows a CAUSAL conclusion (fertilizer causes higher yield) rather than merely a CORRELATIONAL one. Since treatment assignment is RANDOM, any other factor that might affect yield (soil quality, sunlight exposure, etc.) is, on AVERAGE, equally distributed between the fertilizer and no-fertilizer groups — ruling out these factors as SYSTEMATIC alternative explanations for any observed yield difference, which is precisely what licenses the causal claim. A common error assumes an OBSERVATIONAL study (where farmers CHOOSE whether to use the fertilizer themselves, not randomly assigned) would support the SAME causal conclusion — without random assignment, farmers who CHOOSE to use the fertilizer might systematically differ in other ways (e.g. more attentive farming practices overall) that would CONFOUND the fertilizer's true effect, making a causal claim unjustified from observational data alone.

**Example 2 (LO3 — CRD vs. RCBD, breaking MC-2)**: For an experiment run across FIVE distinctly different greenhouse locations (each with its own microclimate), determine whether a CRD or RCBD is more appropriate, and explain why. An RCBD (treating "greenhouse location" as a BLOCKING factor) is more appropriate — since the greenhouses' microclimates are a KNOWN source of variability, blocking by greenhouse REMOVES this noise from the residual variance, making the treatment comparison more PRECISE than a simple CRD (which would just randomly scatter treatments across greenhouses without accounting for this known noise source). A common error uses a simple CRD (ignoring the greenhouse structure entirely) even when a KNOWN, exploitable source of variability (the distinct greenhouse microclimates) is available to block on — missing this opportunity to improve precision.

**Example 3 (LO3 — factorial design connecting to two-way ANOVA)**: A researcher wants to study BOTH fertilizer type AND irrigation method's effects on crop yield SIMULTANEOUSLY, including whether they interact. Explain why a factorial design (analyzed via two-way ANOVA) is appropriate, rather than running two SEPARATE single-factor experiments. A factorial design allows testing BOTH main effects AND their INTERACTION in ONE combined experiment — running two separate single-factor experiments would MISS any interaction effect entirely (since each experiment would hold the other factor fixed or ignore it), and would generally require MORE total resources to achieve the same statistical precision.

## Component 5 — Teaching Actions

### Teaching Action A01 — Randomization Rules Out Confounding, Enabling Causal Claims (Primitive P64: Conceptual Shift)

Work Example 1, explicitly contrasting the randomized experiment against the confounded observational alternative.

- **MC-1 hook**: this directly targets MC-1 (assuming observational (non-randomized) data supports the same causal conclusions as a randomized experiment).

### Teaching Action A02 — Blocking on a Known Noise Source Improves Precision (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the RCBD (exploiting known structure) against a simpler CRD that misses this opportunity.

- **MC-2 hook**: this directly targets MC-2 (failing to use blocking when a known, exploitable noise source is available).

### Teaching Action A03 — Factorial Designs Capture Interactions That Separate Experiments Would Miss (reused procedure)

Present Example 3, connecting the design choice to `math.stats.two-way-anova`'s interaction-testing capability.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Explain, in one sentence, why random assignment of treatments controls for confounding variables.
  2. Determine whether a CRD or RCBD is more appropriate for an experiment run across 3 different schools with distinct student populations, and justify.
  3. Explain why a factorial design captures information that two separate single-factor experiments would miss.
  4. Explain why an observational (non-randomized) study of an existing behavior (e.g. comparing outcomes for people who already exercise vs. don't) cannot support the same strength of causal conclusion as a randomized experiment.
- **P76 (Transfer Probe, mode = independence)**: "A pharmaceutical company wants to test whether a new drug reduces blood pressure, and is choosing between (a) randomly assigning patients to receive the drug or a placebo, versus (b) simply comparing blood pressure outcomes between patients who happen to already be taking a similar over-the-counter supplement versus those who aren't. (a) Explain why design (a) — the randomized approach — would allow a much stronger causal claim about the drug's effectiveness. (b) Identify a plausible confounding variable that could undermine a causal conclusion drawn from design (b)'s observational comparison."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | OBSERVATIONAL-NON-RANDOMIZED-DATA-ASSUMED-TO-SUPPORT-THE-SAME-CAUSAL-CONCLUSIONS-AS-RANDOMIZED-EXPERIMENTS | Assuming observational (non-randomized) data can support the same strength of causal conclusion as a properly randomized experiment | Foundational |
| MC-2 | BLOCKING-OPPORTUNITY-ON-A-KNOWN-NOISE-SOURCE-MISSED-IN-FAVOR-OF-A-SIMPLER-CRD | Using a simple Completely Randomized Design even when a known, exploitable source of variability is available to block on, missing an opportunity to improve precision | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Observational Non-Randomized Data Assumed to Support the Same Causal Conclusions as Randomized Experiments") → P41 (detect: present Example 1 and check whether observational data is (incorrectly) treated as equally causally conclusive) → P64 (conceptual shift: re-identify the confounding risk present in the observational scenario, contrasting with the randomized design's confounding control).
- **B02 (targets MC-2)**: P27 ("Blocking Opportunity on a Known Noise Source Missed in Favor of a Simpler CRD") → P41 (detect: present Example 2 and check whether a known blocking opportunity is (incorrectly) ignored) → P64 (conceptual shift: re-identify the known nuisance source explicitly and re-design using blocking to control for it).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.sampling`, `math.stats.anova`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- difficulty = expert, bloom = evaluate, and estimated_hours = 6 reflect that this concept requires genuine judgment in weighing design tradeoffs, not just procedural application.
- MC-1 was ranked Foundational because it represents one of the most consequential and common errors in applied statistics (over-claiming causation from observational data), while MC-2 was ranked Moderate as a missed efficiency opportunity rather than a validity-undermining error.
- The randomized-drug-trial-vs-observational-supplement-comparison transfer probe was deliberately chosen because randomized controlled trials versus observational studies is one of the most consequential real-world applications of this distinction, particularly in medicine and public policy.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.sampling`, `math.stats.anova`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
