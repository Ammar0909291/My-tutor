# math.arith.borrowing

## Identity
- **KG ID**: `math.arith.borrowing`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.subtraction`, `math.arith.ones-tens-hundreds`
- **Unlocks**: (none in current KG)
- **Related**: `math.arith.carrying` (the corresponding addition-side regrouping procedure)
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.borrowing.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will correctly execute multi-digit column subtraction requiring regrouping (borrowing) from one or more place-value columns, including chains of consecutive zeros, by decomposing a higher place-value unit into ten of the next-lower unit and reflecting that decomposition consistently across every affected column.

## Core Understanding
Borrowing is not "taking a 1 from the neighbor" as an isolated symbolic move — it is a physical re-expression of the same total quantity using a different combination of place-value units. When a column's top digit is smaller than its bottom digit, the minuend genuinely does not have enough of that unit to subtract directly; one unit of the next-higher place is decomposed into ten units of the current place (e.g., 1 ten = 10 ones), added into the current column, and the higher column's digit is reduced by one to reflect that it gave a unit away. The total value of the number is unchanged throughout — decomposition redistributes quantity across columns without creating or destroying it. When the neighboring column itself has a 0, it cannot give away a unit either, so the decomposition must propagate leftward through every consecutive zero until a nonzero column is reached, at which point that column gives up one of its own units, which becomes 10 in the next column, which becomes 10 in the next column, and so on back down to the original column.

## Mental Models
1. **The exchange-booth model**: place-value columns are booths that exchange currency 1-for-10 with their left neighbor (1 ten becomes 10 ones, 1 hundred becomes 10 tens). Borrowing is walking left asking each booth in turn "can you break this into 10 of the next size down?" until one can, then carrying the broken-down units back to the right.
2. **The zero-relay model**: a chain of zero columns is a relay race with no runners currently at any handoff point — the borrow request must travel all the way to the nearest nonzero column before any unit exists to relay back down the chain.
3. **The conservation-of-value model**: at every intermediate step of borrowing, the number's total value is identical to its starting value — only its place-value representation has temporarily changed shape.

## Why Students Fail
Borrowing fails predominantly at the *procedural* layer rather than the conceptual layer: students who understand regrouping with two-digit numbers still break down when a chain of zeros is involved, because the single-step "borrow from the neighbor" script has no next move when the neighbor is 0. A second common failure is losing track of which decomposition has already happened partway through a multi-column subtraction, especially under time pressure, leading to a digit being used in its original (not yet reduced) value in one column while already reduced in another.

## Misconceptions
- **MC-1 — BORROW-CHAIN-THROUGH-ZEROS-BROKEN** (FOUNDATIONAL)
  - **Statement**: When the immediate neighboring column is 0, the student treats the borrow as impossible or invents an ungrounded shortcut (e.g., "put a 9, move on") without correctly propagating the decomposition to the nearest nonzero column and reflecting the change through every intermediate zero.
  - **Birth type**: Type 5, instruction-induced — often traceable to a memorized "when you see a zero, change it to 9 and borrow from the next one" rule taught as a standalone trick disconnected from why it works, which collapses the moment the chain is longer than one zero (e.g., 1,000 − 6) or the student forgets which zeros have already been converted.
  - **Diagnostic probe**: "Compute 3,004 − 1,876. Show every column." A student exhibiting MC-1 either stalls at the first zero, converts only one zero to 9 and leaves the rest untouched, or produces a result whose check-by-addition fails.
  - **Repair approach**: Make the relay explicit and physical before returning to the algorithm — using a mental or drawn place-value chart, walk the "ask the next booth" model of Mental Model 1 one column at a time, narrating aloud: "the ones need to borrow, but the tens have 0 tens — the tens ask the hundreds; the hundreds have 0 hundreds too — the hundreds ask the thousands; the thousands have 3, so they give 1 (now 2 thousands), which becomes 10 hundreds, which give 1 to the tens... which becomes 10 tens, which gives 1 to the ones." Only after this narration succeeds without shortcuts should the compressed "cross out and rewrite as 9s" recording convention be reintroduced, explicitly labeled as shorthand for the walked-through relay, never as the starting explanation.

- **MC-2 — BORROWED-TEN-MISCOMPUTED**
  - **Statement**: After correctly identifying that a column needs to borrow, the student adds the borrowed 10 incorrectly (e.g., adds 10 to the wrong digit, or forgets to reduce the neighbor's digit by 1 even though the ten was used).
  - **Birth type**: Type 1, overgeneralization — the student has internalized "borrowing means write a bigger number in this column" without the paired second half of the rule, "and reduce the neighbor," effectively treating borrowing as a one-sided quantity gift rather than a two-sided transfer that must conserve total value.
  - **Diagnostic probe**: Ask the student to check their subtraction answer by adding it back to the number they subtracted; if MC-2 is present, the check-sum will not match the original minuend, and asking "did every column that gave away a unit actually go down by 1?" often surfaces the skipped reduction directly.
  - **Repair approach**: Reinforce the conservation framing (Mental Model 3) with an explicit two-part rule stated as a single inseparable unit: "the column that borrows gains 10; the column that lent it loses 1 — every borrow is exactly these two changes together, never just one." Use addition-based verification as the standing self-check habit for every borrowing subtraction until the paired update becomes automatic.

- **MC-3 — BORROW-SOURCE-COLUMN-MISIDENTIFIED**
  - **Statement**: The student borrows from a column further away than necessary, or from the wrong side entirely (e.g., attempting to borrow from a column to the right, which holds smaller-value units and cannot supply a larger unit), producing a structurally invalid regrouping.
  - **Birth type**: Type 4, notation-induced — written subtraction's left-to-right visual layout (with the larger place values physically positioned to the left) is not automatically connected by every student to the semantic fact that "left = larger unit, so borrowing must always look leftward, never rightward."
  1  - **Diagnostic probe**: Present a subtraction where the tens digit of the minuend is smaller than the tens digit of the subtrahend, but with an ones-column difference that could tempt an incorrect rightward glance; ask the student to explain, in words, from which column they borrowed and why that direction makes sense.
  - **Repair approach**: Anchor the leftward-only rule to the place-value chart's physical arrangement (Mental Model 1's exchange booths are laid out in a fixed order, left = bigger units) rather than to a memorized directional rule in isolation, and have the student state the reasoning "I need more of THIS unit, so I go to the NEXT BIGGER unit, which is always to my left" before executing any borrow.

## Analogies
- **Making change analogy**: borrowing is like a cashier who is out of $1 coins but has $10 bills — they break a $10 bill into ten $1 coins to make change, and the till's total value doesn't change, only which denominations it holds.
- **Non-analogy warning**: avoid an analogy that frames borrowing as "asking a favor" or "stealing," which can inadvertently prime MC-2's one-sided-gift misconception by emphasizing only the receiving column's gain and not the paired reduction.

## Demonstrations
- Physical or drawn base-ten blocks: show a hundreds flat, tens rods, and ones units; when a subtraction needs more ones than are present, physically break a tens rod into 10 ones units in front of the student, then repeat one level up when a tens rod itself is unavailable (breaking a hundreds flat into 10 tens rods) to make the zero-chain relay (MC-1) visually concrete rather than symbolic.
- A running place-value chart where each column's digit is crossed out and rewritten as the borrow propagates, paired with a live running total shown alongside to reinforce that the total value shown never changes mid-borrow (Mental Model 3).

## Discovery Questions
1. "If a column doesn't have enough to subtract, and its neighbor also has nothing to give, where does the extra amount actually have to come from?"
2. "When you break a $10 bill into ten $1 coins, did the amount of money on the table change? What's the equivalent move in a subtraction column?"
3. "Why does borrowing always look to the left and never to the right?"

## Teaching Sequence
1. Confirm the prerequisite is solid: single-borrow subtraction (no zero chains) from `math.arith.subtraction`, and place-value column identity from `math.arith.ones-tens-hundreds`.
2. Introduce the exchange-booth model (Mental Model 1) with concrete manipulatives on a simple two-column example (e.g., 32 − 15).
3. Extend to a single-zero neighbor (e.g., 304 − 178) and narrate the relay explicitly.
4. Extend to a multi-zero chain (e.g., 3,004 − 1,876) — this is the FOUNDATIONAL misconception's target case; do not skip ahead until this is fluent.
5. Introduce the addition-based self-check habit to catch MC-2 automatically.
6. Practice mixed problems (no borrow / single borrow / zero-chain borrow) interleaved, not blocked, so the student must first diagnose which case applies before executing.

## Tutor Actions
- **SHOW: Demonstration** — physical/drawn base-ten regrouping (see Demonstrations).
- **DO: Worked Example** — a fully narrated zero-chain borrow, one column at a time.
- **TEST-THINKING: Error Analysis** — present a solved-but-wrong zero-chain example (with MC-1 or MC-2 baked in) and ask the student to find the error.
- **ORGANIZE: Matching** — match a borrow step to its correct "gain 10 / lose 1" paired description, to directly target MC-2.

## Voice Teaching Notes
Narrate the relay aloud, one column at a time, in short bursts ("the ones need help... the tens have zero... the tens ask the hundreds..."), pausing after each column so the load stays manageable — this is a multi-step chain and rushing the narration is a common way the zero-chain misconception (MC-1) gets reinforced rather than repaired. Never drop to a bare "borrow, borrow, borrow" chant without the paired reasoning, since that chant is exactly the ungrounded shortcut MC-1 describes.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (no Blueprint exists for a natural cross-link target at this KG position; the probe is self-contained). Present 4,002 − 2,587 and require the student to narrate the borrow chain aloud or in writing before giving the final answer, so the reasoning — not just the digit — is assessed.
- **P77 (mastery gate)**: 5/5 correct across a mixed set (no-borrow, single-borrow, double-nonadjacent-borrow, zero-chain-borrow) with at least one zero-chain item; a wrong answer on the zero-chain item alone should not fail the whole gate on the first attempt, but must be re-probed before certifying mastery, since MC-1 is the FOUNDATIONAL failure mode.

## Tutor Recovery Strategy
If the zero-chain relay (MC-1) persists after the physical demonstration, regress one step further to a "chain of empty exchange booths" story problem entirely without digits (e.g., empty jars needing refills passed hand to hand) to isolate the propagation logic from the arithmetic notation, then reintroduce digits only once the propagation idea alone is solid.

## Memory Hooks
- "Can't give what you don't have — ask your neighbor, and if THEY don't have it either, keep asking left until someone does."
- The paired-change chant: "gain ten here, lose one there — every borrow, everywhere."

## Transfer Connections
- Multi-digit subtraction with decimals (`math.arith.decimal-operations`) reuses the identical borrowing logic across a decimal point.
- Polynomial subtraction (algebra, later domain) reuses the "borrow from the next higher place/degree" structure conceptually, though not part of this KG's immediate unlocks.

## Cross-Subject Connections
No direct cross-subject connections identified for this concept at this time; borrowing is a pure arithmetic-procedure skill with its primary transfer value inside mathematics (decimals, later polynomial arithmetic).

## Blueprint References
None — no Blueprint exists for `math.arith.borrowing` (verified via directory listing of `docs/curriculum/blueprints/`).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
This concept's misconceptions are deliberately scoped to the ZERO-CHAIN RELAY and the PAIRED-CHANGE mechanics of borrowing specifically, avoiding duplication with `math.arith.subtraction`'s own registry (which covers the conceptual meaning of subtraction itself) and `math.arith.carrying`'s registry (the addition-side mirror procedure, whose misconceptions concern place-value overflow going the opposite direction). No KG or Blueprint file was modified in authoring this entry.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 6 part 2.
