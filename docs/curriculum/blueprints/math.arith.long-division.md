# Teaching Blueprint: Long Division (`math.arith.long-division`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.long-division` |
| name | Long Division |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.arith.division`, `math.arith.long-multiplication` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — grouped-sharing models before the fully symbolic algorithm |
| description (KG) | The step-by-step algorithm for dividing multi-digit numbers, producing a quotient and remainder.

 |

## Component 1 — Learning Objectives

- LO1: Execute the standard long-division algorithm (divide, multiply, subtract, bring down, repeat) for a multi-digit dividend and single- or multi-digit divisor.
- LO2: Correctly handle a division that leaves a nonzero remainder, reporting it precisely (as "remainder $r$" or continuing into decimal places, per what's requested).
- LO3: Verify a long-division result by checking $\text{divisor}\times\text{quotient}+\text{remainder}=\text{dividend}$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.division` (what division computes) and `math.arith.long-multiplication` (needed within each step to compute divisor × trial-digit, and to verify the final answer).

## Component 3 — Core Explanation

**Long division** divides a multi-digit dividend by a divisor through a repeating four-step cycle, working from the dividend's highest place value down: **(1) Divide** — how many times does the divisor go into the current portion of the dividend (at least once, but not overshooting)? **(2) Multiply** — divisor times that trial digit. **(3) Subtract** — current portion minus that product. **(4) Bring down** — bring down the next digit of the dividend, appending it to the remainder, and repeat from step 1. When no more digits remain to bring down, the final subtraction result is the REMAINDER, and the digits found in each "divide" step form the QUOTIENT.

Every completed long division can be verified via $\text{divisor}\times\text{quotient}+\text{remainder}=\text{dividend}$ — this identity must hold exactly, providing a reliable self-check.

## Component 4 — Worked Examples

**Example 1 (LO1 — straightforward long division)**: Divide $936\div4$. Divide: $9\div4=2$ remainder $1$ (write 2 in the quotient's hundreds place). Bring down the next digit (3), forming 13. Divide: $13\div4=3$ remainder $1$ (write 3). Bring down 6, forming 16. Divide: $16\div4=4$ remainder $0$ (write 4). Quotient: $234$, remainder $0$. Verify: $4\times234=936$. ✓

**Example 2 (LO2 — nonzero remainder, breaking MC-1)**: Divide $157\div6$. $15\div6=2$ remainder $3$. Bring down 7, forming 37. $37\div6=6$ remainder $1$. Quotient: $26$, remainder $1$. Report as "$157\div6=26$ remainder $1$." A common error either drops the remainder entirely (reporting just "26," silently discarding the leftover 1) or reports the LAST subtraction's intermediate value incorrectly as the remainder instead of tracking it through to the very end.

**Example 3 (LO3 — verifying the result catches an error, breaking MC-2)**: A flawed long division of $483\div7$ yields a reported quotient of $68$ remainder $7$. Verify: $7\times68+7=476+7=483$ — this actually checks out arithmetically, so this reported answer would PASS verification... but note the remainder ($7$) is NOT smaller than the divisor ($7$) — a remainder must always be strictly LESS than the divisor, or the division wasn't carried far enough (here, $68$ remainder $7$ should actually be $69$ remainder $0$, since one more full divisor fits into the remainder). The identity check alone is necessary but not sufficient — the remainder-less-than-divisor condition must ALSO be checked.

## Component 5 — Teaching Actions

### Teaching Action A01 — Divide, Multiply, Subtract, Bring Down (Primitive P64: Conceptual Shift)

Work Example 1 step by step, narrating each of the four repeating steps explicitly and connecting "multiply" back to `math.arith.long-multiplication`'s already-mastered procedure (here just single-digit × single-digit, a simple case of that skill).

- **MC-1 hook**: present Example 2's nonzero-remainder division and check whether the final remainder is reported at all, and correctly (revealing MC-1: dropping the remainder entirely, or losing track of it through the bring-down steps).

### Teaching Action A02 — Verify with the Divisor × Quotient + Remainder Identity, and Check the Remainder Bound (Primitive P06: Contrast Pair)

Work Example 3's case, showing the verification identity alone gives a false sense of confidence (it technically balances) while the remainder-less-than-divisor check reveals the division was actually incomplete. State the rule: "always check TWO things: does divisor×quotient+remainder equal the dividend, AND is the remainder strictly smaller than the divisor? Both must hold."

- **MC-2 hook**: this directly targets MC-2 (accepting an invalid remainder that happens to still satisfy the additive identity).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Divide $728\div8$ using long division, verifying the result.
  2. Divide $845\div9$, reporting the quotient and remainder precisely.
  3. Given a completed division reporting quotient $34$ remainder $12$ for a divisor of $9$, identify why this result is invalid (checking the remainder-less-than-divisor rule) and find the corrected result.
  4. Divide $3{,}142\div7$ using long division, showing every step of the divide-multiply-subtract-bring-down cycle.
- **P76 (Transfer Probe, mode = independence)**: "A teacher wants to distribute 517 pencils equally among 8 students, giving out as many whole pencils as possible and setting aside any leftover. (a) Use long division to find how many pencils each student receives and how many are left over. (b) Verify your answer using BOTH checks from this lesson — the divisor×quotient+remainder identity, and the remainder-less-than-divisor bound — explaining why checking only the first would not be sufficient to catch every possible error."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REMAINDER-DROPPED-OR-LOST-DURING-BRING-DOWN | Losing track of or entirely omitting the remainder, especially across multiple bring-down cycles | Foundational |
| MC-2 | REMAINDER-NOT-CHECKED-AGAINST-DIVISOR-BOUND | Accepting a final remainder that is greater than or equal to the divisor, missing that the division was not carried far enough | Foundational |
| MC-3 | TRIAL-DIGIT-OVERESTIMATED-OR-UNDERESTIMATED | Choosing a "divide" step's trial digit too large (making the subsequent subtraction negative) or too small (leaving a remainder still large enough for another full divisor), without adjusting | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Remainder Dropped During Bring-Down") → P41 (detect: present Example 2 and check whether the final remainder is correctly identified) → P64 (conceptual shift: re-walk the full cycle, explicitly labeling the running remainder at each bring-down step).
- **B02 (targets MC-2)**: P27 ("Remainder Not Checked Against Divisor Bound") → P41 (detect: present Example 3's invalid-but-additively-consistent result and check whether the bound violation is caught) → P64 (conceptual shift: re-derive the corrected division, showing one more full divisor fits into the flawed remainder).
- **B03 (targets MC-3)**: P27 ("Trial Digit Over/Underestimated") → P41 (detect: review a submitted division for a negative subtraction result or an unnecessarily large remaining value at a "divide" step) → P64 (conceptual shift: re-try the trial digit one step up or down, re-verifying the subtraction stays non-negative and minimal).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.division`, `math.arith.long-multiplication`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.remainder` (the specific quantity this algorithm produces and must correctly track).

## Component 8 — Teaching Notes

- estimated_hours = 8 (the highest in this batch alongside fraction-addition) reflects that long division is widely regarded as the most procedurally demanding of the four standard written algorithms, combining trial-and-error digit selection with multiplication and subtraction at every step.
- MC-1 and MC-2 are both ranked foundational because each concerns the REMAINDER specifically — the component of long division most often mishandled, since the quotient digits alone can look "complete" even when the remainder is wrong or missing.
- Example 3 was deliberately constructed so the flawed result PASSES the additive verification identity, specifically to prevent students from treating that single check as sufficient — reinforcing that genuine verification requires the conjunction of both conditions, not either alone.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.division`, `math.arith.long-multiplication`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: grouped-sharing models before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
