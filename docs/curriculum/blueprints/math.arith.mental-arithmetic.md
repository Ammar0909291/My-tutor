# Teaching Blueprint: Mental Arithmetic (`math.arith.mental-arithmetic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.mental-arithmetic` |
| name | Mental Arithmetic |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.arith.mental-addition`, `math.arith.mental-multiplication` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The ability to perform arithmetic computations quickly and accurately without written work, using strategies like decomposition, compensation, and memorized facts.

 |

## Component 1 — Learning Objectives

- LO1: Integrate mental addition and mental multiplication strategies fluently within a single multi-step computation, without resorting to written columns.
- LO2: Apply **compensation** — adjust one number to a convenient value, compute, then correct for the adjustment (e.g. $47+29 = 47+30-1$).
- LO3: Select, among several applicable mental strategies (decomposition, compensation, doubling/halving, memorized facts), whichever is most efficient for the specific numbers at hand.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.mental-addition` and `math.arith.mental-multiplication` (the two operation-specific strategy sets this concept integrates and extends with compensation and multi-step fluency).

## Component 3 — Core Explanation

**Mental arithmetic** is the capstone fluency skill integrating every prior mental-strategy toolkit (making tens, decomposition, doubling/halving, powers-of-10 patterns) PLUS a new technique, **compensation**: round one number to a convenient nearby value, compute with the rounded value, then adjust the result to correct for the rounding. For example, $47+29$: round $29$ up to $30$ (a "nicer" number), compute $47+30=77$, then subtract back the $1$ that was added: $77-1=76$.

The genuinely new skill at this capstone level is not any single strategy in isolation, but fluent, rapid SELECTION among several valid strategies for a given problem, and combining them within multi-step calculations without losing track of intermediate results.

## Component 4 — Worked Examples

**Example 1 (LO2 — compensation, breaking MC-1)**: Compute $58+35$ using compensation: round $58$ up to $60$ (adding $2$), compute $60+35=95$, then CORRECT by subtracting back the $2$ that was added: $95-2=93$. A common error forgets the correction step, reporting $95$ (the rounded computation's result) as the final answer, without adjusting back for the amount originally added to make the rounding convenient.

**Example 2 (LO2 — compensation in subtraction, breaking MC-2)**: Compute $83-29$ using compensation: round $29$ up to $30$ (adding $1$ to the number being subtracted), compute $83-30=53$, then correct: since MORE was subtracted than intended (by rounding 29 up), the correction ADDS back the $1$: $53+1=54$. A common error applies the SAME correction direction as in addition (subtracting the adjustment again), rather than recognizing that rounding the SUBTRAHEND up requires adding the adjustment back, the opposite correction direction from Example 1's addition case.

**Example 3 (LO1, LO3 — integrating strategies in a multi-step problem)**: Compute $6\times19+25$ mentally: first, $6\times19$ via compensation ($6\times20-6=120-6=114$), then add $25$ via making tens ($114+25=114+6+19=120+19=139$, or more directly $114+25=139$ by decomposition). The multiplication and addition strategies are applied in SEQUENCE, with the first result carried forward accurately into the second computation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Compensation: Round, Compute, Correct Back (Primitive P64: Conceptual Shift)

Work Example 1 in full, narrating the three-step structure explicitly: "round to something easier, compute with the rounded number, THEN adjust the result to undo the rounding" — emphasizing the correction step as mandatory, not optional cleanup.

- **MC-1 hook**: this directly targets MC-1 by checking whether the correction step is applied after rounding in Example 1's addition case.

### Teaching Action A02 — Correction Direction Depends on the Operation and What Was Rounded (Primitive P06: Contrast Pair)

Contrast Example 1's addition case (round an ADDEND up → subtract the adjustment back) against Example 2's subtraction case (round the SUBTRAHEND up → ADD the adjustment back), showing the correction direction is not a fixed rule but depends on which operation and which number was adjusted. State the rule: "trace through what rounding UP actually did to the result — if it made the result too big, correct down; if rounding the subtrahend up removed too much, correct up — reason from the specific situation, don't apply the same fix reflexively."

- **MC-2 hook**: this contrast directly targets MC-2 (applying addition's correction direction to a subtraction compensation problem).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $69+27$ using compensation, showing the rounding and correction steps.
  2. Compute $72-38$ using compensation, being careful about the correction direction.
  3. Compute $8\times49$ mentally using compensation ($8\times50$ minus a correction), showing all steps.
  4. Compute $5\times12+18$ mentally, integrating a multiplication strategy and an addition strategy in sequence.
- **P76 (Transfer Probe, mode = independence)**: "A shopper mentally tracks a running total while buying items priced \$19, \$8, and \$23. (a) Compute the running total mentally, choosing an efficient strategy (compensation, making tens, or decomposition) for each addition step, and narrate which strategy you used at each step and why. (b) After buying a fourth item, the shopper needs to compute $7\times19$ for a bulk discount calculation — use compensation to compute this mentally, and explain how the correction step here differs in mechanics from the addition-based corrections used in part (a)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMPENSATION-CORRECTION-STEP-OMITTED | Computing with a rounded number but forgetting to correct the result back for the amount rounded, reporting the rounded-computation's answer as final | Foundational |
| MC-2 | COMPENSATION-CORRECTION-DIRECTION-REVERSED | Applying the wrong direction of correction (adding when subtraction was needed, or vice versa), especially when switching between addition and subtraction contexts | Foundational |
| MC-3 | STRATEGY-NOT-SWITCHED-MID-MULTISTEP-PROBLEM | Continuing to force one single strategy (e.g. only decomposition) across an entire multi-step problem, rather than selecting the most efficient strategy fresh at each individual step | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Compensation Correction Step Omitted") → P41 (detect: present Example 1 and check whether the final answer is $95$ (uncorrected) or $93$ (corrected)) → P64 (conceptual shift: re-verify $95$ against the true sum $58+35=93$ directly, showing the discrepancy the missing correction caused).
- **B02 (targets MC-2)**: P27 ("Compensation Correction Direction Reversed") → P41 (detect: present Example 2 and check whether the correction adds or subtracts the adjustment) → P64 (conceptual shift: re-derive by tracking exactly what rounding the subtrahend UP did to the result — it subtracted MORE than intended, so the correction must ADD back).
- **B03 (targets MC-3)**: P27 ("Strategy Not Switched Mid-Multistep Problem") → P41 (detect: review a submitted multi-step computation for a single strategy forced awkwardly across every step) → P64 (conceptual shift: re-walk Example 3, explicitly re-selecting the best-fit strategy at each individual step rather than committing to one strategy for the whole problem).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.mental-addition`, `math.arith.mental-multiplication`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.estimation` (a closely related but distinct skill — estimation accepts approximate answers, while mental arithmetic here still targets exact results via smart strategy use).

## Component 8 — Teaching Notes

- estimated_hours = 10 (the highest in the entire math.arith domain) reflects this concept's role as the domain's fluency capstone — integrating every prior mental-strategy skill plus the new compensation technique, with genuine multi-step application demanded.
- MC-1 and MC-2 are both ranked foundational because compensation is the single NEW technique this capstone concept introduces, and both misconceptions represent incomplete or backwards application of its correction step — the part of the technique genuinely absent from the prerequisite mental-addition/multiplication concepts.
- The shopping transfer probe was deliberately designed as a genuinely multi-step, mixed-operation scenario (three additions using varied strategies, then a compensation-based multiplication) specifically to test LO3's strategy-selection fluency across a realistic sequence, rather than isolated single-technique drills.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.mental-addition`, `math.arith.mental-multiplication`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: mental strategies act on numbers directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO2, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
