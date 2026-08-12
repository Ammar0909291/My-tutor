# Teaching Blueprint: Estimation (`math.arith.estimation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.estimation` |
| name | Estimation |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.arith.rounding` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The process of finding an approximate value for a calculation using rounding or simplified numbers, emphasizing reasonableness of answers.

 |

## Component 1 — Learning Objectives

- LO1: Estimate the result of a calculation by rounding each number to a convenient place value before computing.
- LO2: Use an estimate to check whether an EXACT computed answer is reasonable, catching gross errors (e.g. a misplaced decimal point or a dropped digit).
- LO3: Choose a rounding precision appropriate to the situation — overly coarse rounding can make an estimate uselessly imprecise, while overly fine rounding defeats the purpose of quick estimation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.rounding` (approximating a number to a given place value) — estimation applies rounding strategically BEFORE computing, to get a fast approximate result.

## Component 3 — Core Explanation

**Estimation** finds an approximate answer by rounding the numbers involved to convenient values FIRST, then computing with the simplified numbers — trading small precision loss for large speed gain. Estimation serves two main purposes: producing a quick approximate answer when exact precision isn't needed, and providing a REASONABLENESS CHECK against an exact computed answer (if the exact answer differs wildly from a sound estimate, something likely went wrong in the exact computation).

Choosing the rounding precision matters: rounding too coarsely (e.g. to the nearest thousand for numbers around 50) discards too much information to be useful; rounding too finely provides little speed benefit over just computing exactly.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic estimation)**: Estimate $387\times21$. Round: $387\approx400$, $21\approx20$. Estimate: $400\times20=8{,}000$. (Exact answer: $8{,}127$ — the estimate is close and was much faster to compute.)

**Example 2 (LO2 — catching a computation error via estimate, breaking MC-1)**: A student computes $58\times32$ and gets $1{,}856$ by long multiplication with an arithmetic slip, actually arriving at $18{,}560$ (a misplaced digit). Estimating first: $58\approx60$, $32\approx30$, estimate $=60\times30=1{,}800$. Since $18{,}560$ is wildly different from the $1{,}800$ estimate (roughly 10× too large — a misplaced-digit-scale error), the estimate flags that something is likely wrong, prompting a recheck — SKIPPING the estimation step entirely (just trusting the exact computation) would miss this error-detection opportunity.

**Example 3 (LO3 — choosing appropriate precision, breaking MC-2)**: Estimating $19\times21$ by rounding to the nearest TEN ($19\approx20$, $21\approx20$, giving $400$) is a reasonable, useful approximation (true value $399$). Rounding to the nearest HUNDRED instead ($19\approx0$, $21\approx0$, giving $0$) is technically valid rounding but produces a USELESS estimate — the precision level chosen must retain enough of each number's actual size to be informative for the specific calculation at hand.

## Component 5 — Teaching Actions

### Teaching Action A01 — Round First, Then Compute Quickly (Primitive P64: Conceptual Shift)

Work Example 1, narrating the two-step process explicitly: "round each number to something easy to multiply mentally, THEN multiply the simplified numbers" — emphasizing the estimate is meant to be fast, not a substitute for eventual exact computation when precision is actually needed.

### Teaching Action A02 — Estimates Catch Gross Errors, and Precision Must Match the Numbers (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's error-catching scenario, showing the estimate (1,800) and the flawed exact answer (18,560) side by side, highlighting the roughly 10× mismatch as a clear red flag. State the rule: "always sanity-check an exact answer against a quick estimate — a huge mismatch usually means a computational slip, not that the estimate was wrong."

**Contrast 2 (targets MC-2)**: Contrast Example 3's two rounding precisions (nearest ten vs. nearest hundred) for the same $19\times21$ problem, showing one gives a useful estimate (400) and the other a useless one (0). State the rule: "round to a precision that still reflects the numbers' actual size — rounding away all meaningful digits defeats the purpose."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Estimate $412+689$ by rounding each number to the nearest hundred.
  2. Estimate $73\times48$ by rounding to the nearest ten, then compare against the exact value $3{,}504$ to assess reasonableness.
  3. Given an exact computed answer that differs drastically from a sound quick estimate, explain what this discrepancy suggests and what should be done next.
  4. For estimating $8\times12$, explain why rounding both numbers to the nearest ten (giving $10\times10=100$) is reasonable, while rounding to the nearest hundred (giving $0\times0=0$) is not, despite both being "valid" rounding operations.
- **P76 (Transfer Probe, mode = independence)**: "A cashier's till shows a total of \$1{,}245.00 for a customer's cart of 3 items priced at approximately \$8, \$15, and \$22. (a) Use estimation (rounding each price appropriately) to quickly assess whether \$1{,}245.00 is a plausible total for this cart. (b) Explain, using this lesson's error-catching idea, what the huge discrepancy between your estimate and the till's total most likely indicates, and what precision of rounding made this discrepancy easy to spot quickly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ESTIMATION-SKIPPED-AS-A-REASONABLENESS-CHECK | Trusting an exact computed answer without ever comparing it against a quick estimate, missing an opportunity to catch gross computational errors | Moderate |
| MC-2 | ROUNDING-PRECISION-CHOSEN-WITHOUT-REGARD-TO-USEFULNESS | Rounding to an arbitrary or habitual place value (e.g. always "nearest hundred") regardless of whether it preserves enough information to be a useful estimate for the numbers involved | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Estimation Skipped as Reasonableness Check") → P41 (detect: present Example 2's error scenario and ask whether the student would have caught the mistake without an estimate) → P64 (conceptual shift: model the habit explicitly — "before accepting any final computed answer, quickly estimate first and compare" — using Example 2's dramatic mismatch as the motivating case).
- **B02 (targets MC-2)**: P27 ("Rounding Precision Chosen Without Regard to Usefulness") → P41 (detect: present Example 3's two rounding choices and check whether the student recognizes the hundred-based rounding as useless here) → P64 (conceptual shift: re-derive both estimates side by side, showing the useless one collapses the numbers to zero, and requiring the precision choice to retain at least the numbers' leading significant digit).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.rounding`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that estimation is a JUDGMENT skill layered on top of rounding mechanics — deciding WHEN and HOW PRECISELY to round for a given purpose is harder to teach than the rounding operation itself.
- MC-1 was ranked significant because skipping the reasonableness-check habit forfeits estimation's single most practically valuable use — as an error-detection tool — reducing the concept to a purely academic exercise rather than a genuinely useful arithmetic practice.
- The till/cart transfer probe was deliberately designed with a dramatically wrong total (\$1,245 for a roughly \$45 cart) to make the error-detection payoff of estimation unmistakably concrete and motivating, rather than testing estimation in isolation from its practical error-catching purpose.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.rounding`) |
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
