# Teaching Blueprint: Two-Way ANOVA (`math.stats.two-way-anova`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.two-way-anova` |
| name | Two-Way ANOVA |
| domain | Statistics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.stats.anova` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Extends one-way ANOVA to two categorical factors and their interaction. Tests main effects of each factor and the interaction effect. Allows for blocked designs to reduce residual variance.

 |

## Component 1 — Learning Objectives

- LO1: Extend one-way `math.stats.anova` to TWO categorical FACTORS simultaneously, testing THREE distinct effects: the MAIN EFFECT of Factor A, the MAIN EFFECT of Factor B, and the INTERACTION effect between A and B — these are THREE SEPARATE hypotheses, each with its own test.
- LO2: Interpret an INTERACTION effect — an interaction exists when the effect of ONE factor DEPENDS on the LEVEL of the OTHER factor (e.g. a drug's effectiveness differs by patient age group) — and recognize a SIGNIFICANT interaction changes how the MAIN EFFECTS themselves should be interpreted (a main effect's "average" impact can be MISLEADING if a strong interaction exists, since the effect may go in different directions across different subgroups).
- LO3: Recognize BLOCKING as a design technique to REDUCE RESIDUAL (unexplained) variance by GROUPING similar experimental units together (e.g. blocking by "day of experiment" to account for day-to-day variability) — distinct from testing a genuine factor of scientific interest; a BLOCKING variable is included to control noise, not because its own effect is the research question.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.anova` (one-way ANOVA, the direct predecessor this concept extends).

## Component 3 — Core Explanation

**Two-Way ANOVA** extends one-way ANOVA to handle TWO categorical factors SIMULTANEOUSLY, testing THREE distinct hypotheses: the MAIN EFFECT of Factor A (does A's level affect the outcome, averaged across B?), the MAIN EFFECT of Factor B (does B's level affect the outcome, averaged across A?), and the INTERACTION effect (does the EFFECT of A depend on WHICH level of B is present, or vice versa?) — these are THREE genuinely separate questions, each with its own $F$-test.

An **interaction** effect is present when the impact of one factor genuinely CHANGES depending on the level of the other factor — e.g. a fertilizer's effectiveness might differ substantially between two soil types (a fertilizer-by-soil-type interaction). When a SIGNIFICANT interaction exists, interpreting the MAIN EFFECTS alone can be MISLEADING — an "average" main effect might mask the fact that the true effect runs in OPPOSITE directions for different subgroups, cancelling out in the overall average.

**Blocking** is a design technique that GROUPS similar experimental units together (e.g. running an experiment across several different days, treating "day" as a blocking factor) to REDUCE RESIDUAL (unexplained) variance — this REFINES the analysis's precision but is conceptually DIFFERENT from a genuine research-interest factor: a blocking variable is included specifically to CONTROL for a known source of noise, not because the researcher cares about its own effect scientifically.

## Component 4 — Worked Examples

**Example 1 (LO1 — three distinct effects, breaking MC-1)**: For a study testing the effect of BOTH "fertilizer type" (Factor A) and "watering frequency" (Factor B) on plant growth, list the three hypotheses tested. (1) Main effect of fertilizer type (averaged across watering frequencies); (2) main effect of watering frequency (averaged across fertilizer types); (3) fertilizer-by-watering INTERACTION (does fertilizer's effect depend on watering frequency?). A common error treats a two-way ANOVA as testing only ONE combined "does anything matter" hypothesis, rather than recognizing it decomposes into THREE separate, individually-testable effects — each with its own $F$-statistic and its own conclusion.

**Example 2 (LO2 — interpreting a significant interaction, breaking MC-2)**: A study finds a SIGNIFICANT interaction between "drug dosage" and "patient age group," where the drug HELPS young patients but HARMS elderly patients (opposite effects in different subgroups), yet the "average" main effect of dosage (across both age groups) appears to be roughly ZERO (the opposite effects cancel out). Explain why reporting "dosage has no significant main effect" alone would be MISLEADING. The zero-looking main effect masks a genuinely important, STRONG interaction — the drug's TRUE effect varies dramatically by age group, and reporting only the (misleadingly null) main effect would hide this crucial, clinically important pattern. A common error reports and interprets ONLY the main effects, overlooking or downplaying a significant interaction — when an interaction is significant, it must be examined and reported explicitly, since it can fundamentally change (or invalidate) a naive main-effect-only interpretation.

**Example 3 (LO3 — blocking vs. a genuine research factor)**: An agricultural experiment tests different fertilizer types across plots on FIVE different days (with day-to-day weather variation being a known nuisance source), including "day" as a BLOCKING factor. Explain why "day" is treated differently from "fertilizer type" in this design. "Fertilizer type" is the genuine RESEARCH-INTEREST factor (the actual scientific question). "Day" is included as a BLOCKING factor specifically to ACCOUNT FOR AND REMOVE day-to-day noise from the residual variance, improving the precision of the fertilizer comparison — the researcher doesn't fundamentally care about "which day was best," only about controlling for its nuisance variability.

## Component 5 — Teaching Actions

### Teaching Action A01 — Two-Way ANOVA Tests Three Separate Hypotheses (Primitive P64: Conceptual Shift)

Work Example 1, explicitly listing and distinguishing the three separate hypotheses.

- **MC-1 hook**: check whether all three distinct effects (two main effects, one interaction) are correctly identified as separate hypotheses.

### Teaching Action A02 — A Significant Interaction Can Mask or Complicate Main Effect Interpretation (Primitive P06: Contrast Pair)

Work Example 2, explicitly showing how a null-looking main effect can hide a genuinely important interaction.

- **MC-2 hook**: this directly targets MC-2 (reporting only main effects while overlooking or downplaying a significant interaction).

### Teaching Action A03 — Blocking Controls Noise, Not a Genuine Research Factor (reused procedure)

Work Example 3, explicitly distinguishing the blocking factor's purpose from the research-interest factor's purpose.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For a study on "teaching method" and "class size" affecting test scores, list the three hypotheses a two-way ANOVA would test.
  2. Explain what a significant interaction between two factors means, in your own words.
  3. Explain why interpreting only the main effects can be misleading when a significant interaction is present.
  4. Explain the difference between a blocking factor and a genuine research-interest factor in an experimental design.
- **P76 (Transfer Probe, mode = independence)**: "A company tests whether a new employee training program (Factor A: trained vs. untrained) and work shift (Factor B: morning vs. evening) affect productivity, and finds a significant interaction — the training program boosts productivity substantially for morning-shift workers but has almost no effect for evening-shift workers. (a) Explain why simply reporting 'training has a significant main effect' (averaged across both shifts) would misrepresent this finding. (b) Explain what practical recommendation the company should make, given this specific interaction pattern, rather than a blanket 'roll out training to everyone' recommendation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TWO-WAY-ANOVA-TREATED-AS-TESTING-ONE-COMBINED-HYPOTHESIS-RATHER-THAN-THREE-SEPARATE-EFFECTS | Treating two-way ANOVA as testing a single combined "does anything matter" hypothesis, rather than recognizing it decomposes into three separately-testable effects | Foundational |
| MC-2 | SIGNIFICANT-INTERACTION-OVERLOOKED-WHILE-ONLY-MAIN-EFFECTS-ARE-REPORTED | Reporting and interpreting only the main effects while overlooking or downplaying a significant interaction that changes the correct interpretation | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Two-Way ANOVA Treated as Testing One Combined Hypothesis Rather Than Three Separate Effects") → P41 (detect: present Example 1 and check whether all three distinct hypotheses are identified) → P64 (conceptual shift: re-list each of the three effects explicitly, with its own null hypothesis).
- **B02 (targets MC-2)**: P27 ("Significant Interaction Overlooked While Only Main Effects Are Reported") → P41 (detect: present Example 2 and check whether the interaction's importance is (incorrectly) overlooked) → P64 (conceptual shift: re-examine the interaction plot/pattern explicitly, confirming it changes the correct interpretation of the main effects).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.anova`.
- **Unlocks**: none recorded in the KG.
- **Parent**: `math.stats.anova`.

## Component 8 — Teaching Notes

- difficulty = expert and estimated_hours = 6 reflect the genuine conceptual complexity of tracking three separate effects and their interpretive interplay.
- Both misconceptions were ranked Foundational because each leads to a genuinely incomplete or misleading interpretation of the study's actual findings.
- The training-program-by-shift transfer probe was deliberately chosen because a genuinely differential effect across subgroups is a realistic, high-stakes business scenario where overlooking the interaction could lead to a poorly-targeted (or wasteful) intervention decision.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.anova`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
