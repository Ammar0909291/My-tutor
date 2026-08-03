# Teaching Blueprint: Mental Addition (`math.arith.mental-addition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.mental-addition` |
| name | Mental Addition |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.arith.addition` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — mental strategies operate on numbers directly, without physical manipulatives |
| description (KG) | Strategies for computing sums in one's head without writing, including making tens, decomposing numbers, and using number bonds. |

## Component 1 — Learning Objectives

- LO1: Apply the **"making tens"** strategy — decompose one addend to complete the other to the nearest ten, then add the remainder.
- LO2: Apply **decomposition** — split numbers into place-value parts (tens and ones), add like parts separately, then recombine.
- LO3: Select the mental strategy best suited to a given pair of addends (e.g. making tens works cleanly when one addend is close to a multiple of ten; decomposition works well for two multi-digit numbers with no near-ten shortcut).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.addition` (the operation itself) — mental addition supplies FASTER strategies for computing the same sums without the written column algorithm.

## Component 3 — Core Explanation

**Mental addition** strategies compute sums without writing, exploiting number structure for speed:

- **Making tens**: to add $8+5$, take $2$ from the $5$ to complete $8$ to $10$, leaving $3$: $8+5 = 10+3 = 13$.
- **Decomposition**: to add $47+35$, split into tens and ones: $(40+30)+(7+5) = 70+12=82$.
- **Number bonds**: recognizing pairs that sum to a "nice" number (e.g. $6+4=10$) as an instantly-retrieved fact, used as a building block within the other strategies.

These are not merely tricks — they are legitimate, general-purpose arithmetic strategies grounded in the same place-value structure as the written algorithm, just applied flexibly rather than mechanically column-by-column.

## Component 4 — Worked Examples

**Example 1 (LO1 — making tens)**: Add $9+6$ mentally: take $1$ from $6$ to make $9$ into $10$, leaving $5$: $9+6=10+5=15$.

**Example 2 (LO2 — decomposition, breaking MC-1)**: Add $28+37$ mentally by decomposing: tens $(20+30=50)$, ones $(8+7=15)$, recombine $50+15=65$. A common error adds tens and ones correctly but then mis-recombines — e.g. writing "$5015$" (concatenating instead of adding) instead of $50+15=65$; the two partial sums must be genuinely ADDED, not just placed side by side.

**Example 3 (LO3 — strategy selection)**: For $48+7$, "making tens" is efficient ($48+2=50$, then $50+5=55$, since $7=2+5$). For $63+58$, neither addend is conveniently close to a multiple of ten in an obvious single step, so decomposition ($60+50=110$, $3+8=11$, $110+11=121$) is the more natural choice. Recognizing which structural cue applies avoids forcing an awkward strategy onto a poorly-suited pair.

## Component 5 — Teaching Actions

### Teaching Action A01 — Making Tens: Borrow to Complete the Nearest Ten (Primitive P64: Conceptual Shift)

Work Example 1 aloud, narrating the two-step logic explicitly: "how much does 9 need to reach 10? Just 1. Take that 1 from the 6, leaving 5. So $9+6$ becomes $10+5=15$." Practice with several near-ten pairs (e.g. $7+5$, $8+9$).

### Teaching Action A02 — Decomposition: Add Tens, Add Ones, Then Combine Correctly (Primitive P06: Contrast Pair)

Work Example 2's decomposition in full, then contrast the CORRECT recombination ($50+15=65$, genuinely adding) against the flawed concatenation ("$5015$" or misreading it as $50$ and $15$ never actually combined). State the rule: "the two partial sums are themselves numbers to be ADDED together, not digits to place side by side."

- **MC-1 hook**: this contrast directly targets MC-1 (recombination-as-concatenation) — check whether the student's own decomposition attempt on a new pair ends in a genuine final addition step.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Add $7+8$ mentally using making tens, narrating each step.
  2. Add $56+29$ mentally using decomposition, showing the tens-sum and ones-sum before the final combination.
  3. Add $19+6$ mentally, selecting and justifying whichever strategy (making tens or decomposition) is more efficient here.
  4. Add $34+27$ mentally using decomposition, being careful the ones-sum ($4+7=11$) itself requires a small carry into the tens total.
- **P76 (Transfer Probe, mode = independence)**: "While shopping without a calculator, a customer mentally adds the cost of three items: \$8, \$17, and \$23. (a) Choose and apply an efficient mental strategy (making tens and/or decomposition) to find the total, narrating your reasoning. (b) Explain why adding \$8 and \$17 by 'making tens' first (rather than starting with \$17 and \$23) might be the smarter order to pick, connecting your answer to Example 3's strategy-selection idea."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DECOMPOSED-PARTIAL-SUMS-CONCATENATED-NOT-ADDED | Placing decomposition's tens-sum and ones-sum side by side as digits (e.g. "5015") instead of genuinely adding them together | Foundational |
| MC-2 | MAKING-TENS-AMOUNT-BORROWED-INCORRECTLY | Miscalculating how much to move from one addend to complete the other to ten (e.g. taking the wrong amount, or taking it from the wrong addend) | Moderate |
| MC-3 | ONES-SUM-CARRY-DROPPED-DURING-DECOMPOSITION | When the ones-place partial sum itself exceeds 9 (e.g. $34+27$'s $4+7=11$), failing to carry that extra ten into the tens total during recombination | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Decomposed Sums Concatenated Not Added") → P41 (detect: present Example 2 and check whether the final answer is $65$ or an incorrect concatenation like $5015$/$515$) → P64 (conceptual shift: re-walk the recombination step explicitly as a genuine addition, $50+15$, using a number line or base-10 blocks to confirm $65$).
- **B02 (targets MC-2)**: P27 ("Making Tens Amount Borrowed Incorrectly") → P41 (detect: present Example 1 and check whether the correct amount (1, to complete 9 to 10) is identified) → P64 (conceptual shift: re-derive the "distance to the next ten" explicitly via subtraction, $10-9=1$, before moving that exact amount).
- **B03 (targets MC-3)**: P27 ("Ones-Sum Carry Dropped During Decomposition") → P41 (detect: present $34+27$ and check whether the ones-sum of 11 is correctly folded into the tens total, giving $60+11=71$ rather than mistakenly $60+1=61$) → P64 (re-walk the recombination, treating the ones-sum of 11 as its own two-digit quantity to be added in full, not truncated to its ones digit).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.addition`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; conceptually parallel to `math.arith.carrying`'s regrouping logic, applied mentally rather than in written columns.

## Component 8 — Teaching Notes

- estimated_hours = 6 (higher than related foundational concepts) reflects that fluent strategy SELECTION (LO3), not just execution of a single named strategy, is the genuinely harder skill this concept targets.
- MC-1 was ranked most severe because it produces an answer that is not just numerically wrong but STRUCTURALLY nonsensical (concatenating digit strings rather than adding numbers) — a telltale sign the underlying place-value meaning of the decomposition was never genuinely grasped, only the mechanical splitting step.
- The shopping-total transfer probe was deliberately designed with an ORDER-of-addition choice embedded in part (b), extending LO3's strategy-selection skill into choosing which PAIR to add first among three addends, not just which strategy to apply to a single fixed pair.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.addition`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: mental strategies act on numbers directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
