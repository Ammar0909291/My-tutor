# Teaching Blueprint: Rounding (`math.arith.rounding`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.rounding` |
| name | Rounding |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.arith.place-value`, `math.arith.decimals` |
| unlocks | `math.arith.estimation`, `math.arith.significant-figures` |
| cross_links | `math.num.floating-point` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — a number line with tick marks at the two nearest "round" values before the digit-based rule |
| description (KG) | Approximating a number to a specified number of significant figures or decimal places by replacing it with the nearest representable value. |

## Component 1 — Learning Objectives

- LO1: Round a number to a specified **decimal place** (e.g. nearest tenth, hundredth) by examining the digit immediately to the right of the target place: $5$ or greater rounds the target digit UP by one; less than $5$ leaves the target digit unchanged, with all digits to the right dropped (replaced by nothing, since they're past the decimal cutoff).
- LO2: Round a number to a specified **number of significant figures**, correctly identifying which digits count as significant (nonzero digits always count; zeros between significant digits count; leading zeros never count; trailing zeros' significance depends on context) — directly refuting the misconception that "number of significant figures" and "number of decimal places" are the same concept.
- LO3: Recognize that rounding is always a genuine **approximation** — the rounded value is, in general, NOT equal to the original number — and that repeated rounding across a multi-step calculation can **accumulate error**, directly refuting the misconception that rounding intermediate results in a calculation has no effect on the final answer's accuracy.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.place-value` (the value of a digit depends on its position — ones, tens, tenths, hundredths, etc.) and `math.arith.decimals` (decimal notation as place-value extended to the right of the decimal point).

## Component 3 — Core Explanation

**Rounding to a decimal place**: to round a number to a specified place (e.g. the nearest hundredth), look at the digit **immediately to the right** of that place. If that digit is $5,6,7,8,$ or $9$, increase the target place's digit by one (rounding UP); if it is $0,1,2,3,$ or $4$, leave the target digit unchanged (rounding DOWN, i.e. staying the same). In both cases, every digit to the right of the target place is then dropped entirely.

**Rounding to significant figures**: a **significant figure** is a digit that carries genuine precision information. The rules for identifying them: every NONZERO digit is significant; a zero BETWEEN two significant digits is significant (e.g. the $0$ in $205$); LEADING zeros (before the first nonzero digit, e.g. in $0.0034$) are never significant — they only indicate the decimal point's position; TRAILING zeros (after the last nonzero digit) are significant only when there is a decimal point present making their precision explicit (e.g. $3.20$ has 3 significant figures, but plain $320$ is ambiguous without further context on whether the trailing zero was measured precisely). This is a genuinely different counting system from "number of decimal places" — significant figures count from the FIRST nonzero digit, wherever it falls, while decimal places count positions strictly to the right of the decimal point.

**Rounding is a genuine approximation, and error can accumulate**: a rounded value is, except in the rare case where the original number was already exactly at the rounding target, a DIFFERENT number from the original — some information (the dropped digits) is permanently lost. If a calculation involves multiple steps, and each intermediate result is rounded before being used in the next step, the small errors introduced at each rounding can compound, potentially producing a final answer noticeably different from what would result from carrying full precision throughout and rounding only the final answer.

## Component 4 — Worked Examples

**Example 1 (LO1 — rounding to a decimal place)**: Round $3.14159$ to the nearest hundredth (two decimal places). The digit right after the hundredths place (the thousandths digit) is $1$ (from $3.14\underline{1}59$) — since $1<5$, round DOWN, keeping the hundredths digit as $4$ and dropping everything after: $3.14$. Now round $2.678$ to the nearest tenth: the digit right after the tenths place is $7$ (from $2.\underline{6}78$, checking the hundredths digit $7$) — since $7\ge5$, round UP: the tenths digit $6$ becomes $7$, giving $2.7$.

**Example 2 (LO2 — significant figures vs. decimal places, breaking MC-1)**: Round $0.004567$ to 2 significant figures. The significant figures start at the first NONZERO digit: $4$ (the leading zeros in $0.00\underline{4}567$ don't count). The first 2 significant figures are $4$ and $5$; the next digit is $6\ge5$, so round up: $0.0046$ — note this has 2 SIGNIFICANT figures ($4,6$) but 4 DECIMAL places. Contrast with rounding the SAME number to 2 DECIMAL places instead: $0.004567$ rounded to 2 decimal places (hundredths) is $0.00$ (since the digit right after the hundredths place, $0$, is less than $5$) — a completely different result and a completely different question, proving "significant figures" and "decimal places" are NOT interchangeable counting systems, even applied to the identical number.

**Example 3 (LO3 — rounding error accumulates across steps, breaking MC-2)**: Compute $\frac{1}{3}+\frac{1}{3}+\frac{1}{3}$ two ways. Exactly: $\frac13+\frac13+\frac13 = 1$ exactly. Now round each $\frac13$ to 2 decimal places FIRST ($0.33$), then add: $0.33+0.33+0.33 = 0.99$ — NOT equal to $1$, a $0.01$ error introduced purely by rounding each term before combining them, even though each individual rounding seemed harmless (only $0.00333\ldots$ off per term). This demonstrates that rounding intermediate values in a multi-step calculation can produce a measurably different final answer than rounding only once, at the very end.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Digit-to-the-Right Rule (Primitive P11: Representation Shift)

Show a number line with tick marks at the two nearest "round" values (e.g. $3.14$ and $3.15$ for rounding $3.14159$ to hundredths), marking where $3.14159$ actually falls between them. State: "look at the very next digit — that single digit decides whether you round up or stay the same." Work Example 1's two cases directly.

### Teaching Action A02 — Significant Figures Count Differently From Decimal Places (Primitive P28: Conflict Evidence)

Present Example 2's direct conflict: rounding $0.004567$ to 2 significant figures gives $0.0046$, while rounding the SAME number to 2 decimal places gives $0.00$ — two very different results from the same starting number, because the two instructions are asking fundamentally different questions. State: "significant figures start counting from the first nonzero digit, wherever that is. Decimal places count position relative to the decimal point, full stop. These are NOT the same rule."

- **MC-1 hook**: ask "if I ask you to round a number to '2 significant figures,' is that asking for the same thing as rounding to '2 decimal places'?" — a "yes" answer reveals MC-1 (conflating the two counting systems, missing that leading zeros are excluded from significant-figure counts but still occupy decimal-place positions).

### Teaching Action A03 — Rounding Error Accumulates Across Steps (Primitive P28: Conflict Evidence)

Present Example 3's direct arithmetic conflict: $\frac13+\frac13+\frac13=1$ exactly, but $0.33+0.33+0.33=0.99$ when each term is rounded first. State: "each individual rounding looked tiny and harmless — but adding several of them together, the small errors DON'T cancel out here, they compound. This is why, in a multi-step calculation, it's generally safer to carry full precision through every intermediate step and round only the final answer."

- **MC-2 hook**: ask "if you round each number in a calculation individually, does that guarantee the final rounded answer is still accurate?" — a "yes" answer reveals MC-2 (assuming rounding intermediate results has no meaningful effect on final accuracy, missing that errors can accumulate across multiple steps).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Round $7.8652$ to the nearest thousandth, and separately to the nearest tenth, showing the digit-to-the-right check for each.
  2. Round $0.020389$ to 3 significant figures, and explain which digits you excluded and why.
  3. For the number $150.0$, state how many significant figures it has, and explain why the trailing zero after the decimal point counts (unlike a bare $150$ without a decimal point).
  4. Compute $\frac{1}{7}+\frac{1}{7}+\frac{1}{7}+\frac{1}{7}+\frac{1}{7}+\frac{1}{7}+\frac{1}{7}$ two ways: (a) exactly, recognizing it equals $1$; (b) by first rounding $1/7\approx0.14$ to 2 decimal places and then summing seven copies. Compare the two results and explain the discrepancy.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.num.floating-point` is not yet authored; a future revision may add a genuine cross-link probe into how computers represent rounded/approximate decimal values once that entry exists)**: "An accountant calculates a company's total quarterly revenue by adding up 90 daily sales figures, each individually rounded to the nearest dollar before being recorded. (a) Explain why the FINAL total, computed by summing these 90 already-rounded daily figures, might differ from the true total that would result from summing the exact (unrounded) daily figures. (b) Using the reasoning from Example 3, explain whether this discrepancy is likely to be larger or smaller with 90 rounded terms compared to just 3, and why. (c) Suggest a change to the accountant's process (referencing Component 3's discussion of when to round) that would reduce this accumulated rounding error, while still allowing individual daily figures to be reported to the nearest dollar for record-keeping."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SIGNIFICANT-FIGURES-CONFLATED-WITH-DECIMAL-PLACES | Treating "round to N significant figures" and "round to N decimal places" as the same instruction, missing that significant figures count from the first nonzero digit while decimal places count from the decimal point | Foundational |
| MC-2 | ROUNDING-INTERMEDIATE-RESULTS-ASSUMED-HARMLESS | Assuming rounding values partway through a multi-step calculation has no meaningful effect on the final answer's accuracy, missing that rounding errors can accumulate across steps | Foundational |
| MC-3 | LEADING-ZEROS-COUNTED-AS-SIGNIFICANT | Incorrectly counting leading zeros (before the first nonzero digit) as significant figures, inflating the apparent precision of a small decimal number | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Significant-Figures-Decimal-Places Conflation") → P41 (detect: ask a student to round $0.004567$ to "2 significant figures" and check whether they instead round to 2 decimal places) → P64 (conceptual shift: re-walk Example 2's direct side-by-side contrast, showing the two instructions produce genuinely different results from the same number, re-anchoring on "significant figures start at the first nonzero digit; decimal places start at the decimal point").
- **B02 (targets MC-2)**: P27 (name it: "Intermediate-Rounding-Is-Harmless Assumption") → P41 (detect: ask a student to compute a multi-step calculation with rounding at each step, and compare against the exact calculation without prompting) → P64 (conceptual shift: re-walk Example 3's $\frac13+\frac13+\frac13$ discrepancy directly, re-anchoring on "small errors from each rounding step can add up rather than cancel — carry full precision until the final answer whenever possible").
- **B03 (targets MC-3)**: P27 (name it: "Leading-Zeros Counted as Significant") → P41 (detect: ask how many significant figures $0.0034$ has, and check whether the student includes the leading zeros in the count) → P64 (conceptual shift: re-anchor on "significant figures begin counting at the FIRST nonzero digit — leading zeros before it only mark the decimal point's position, carrying no precision information of their own").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.place-value` (the positional digit-value system rounding operates on), `math.arith.decimals` (the decimal-point notation rounding is applied within).
- **Unlocks**: `math.arith.estimation` (rounding is the core mechanical tool estimation builds on), `math.arith.significant-figures` (this concept's LO2 previews the significant-figures counting rules that concept formalizes in depth).
- **Cross-link**: KG lists `math.num.floating-point` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.num.floating-point.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into how computers internally represent rounded/approximate decimal values once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/apply tag places this at a "3 TAs + gate" tier — A01 (the digit-to-the-right rule), A02 (significant figures vs. decimal places), and A03 (accumulated rounding error) each target a distinct LO, appropriate for a concept whose difficulty lies in two persistent conceptual confusions (MC-1, MC-2) layered on a simple mechanical rule.
- MC-1 (significant figures vs. decimal places) was given the most teaching weight because the two terms are used almost interchangeably in casual speech ("round to 2 places") despite referring to genuinely different counting systems — Example 2 deliberately applies BOTH instructions to the identical starting number specifically to make the divergence undeniable rather than abstract.
- Example 3's $\frac13$ demonstration was chosen because it produces a clean, easily verified discrepancy ($0.99$ vs. exactly $1$) using numbers simple enough that a student can immediately see the exact answer is wrong without needing a calculator, making the accumulated-error phenomenon concrete rather than merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.num.floating-point not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: number line with nearest round values before the digit rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
