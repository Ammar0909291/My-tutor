# Teaching Blueprint: Significant Figures (`math.arith.significant-figures`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.significant-figures` |
| name | Significant Figures |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.arith.rounding`, `math.arith.decimals` |
| unlocks | `math.num.floating-point` |
| cross_links | `math.num.floating-point` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — multiplying two measured lengths of differing precision, before the general propagation rules |
| description (KG) | The meaningful digits in a number that carry information about its precision, used in scientific measurement and numerical computation. |

## Component 1 — Learning Objectives

- LO1: Apply the **multiplication/division rule**: when multiplying or dividing measured quantities, the result should be rounded to the SAME NUMBER of significant figures as the LEAST precise (fewest-significant-figure) input — directly reusing `math.arith.rounding`'s own sig-fig-counting rules (already mastered) as the tool for identifying "least precise."
- LO2: Apply the **addition/subtraction rule**: when adding or subtracting measured quantities, the result should be rounded to the SAME NUMBER OF DECIMAL PLACES as the least precise input (not the same number of SIGNIFICANT FIGURES) — directly refuting the misconception that the multiplication/division rule (matching sig-fig count) also applies to addition and subtraction.
- LO3: Explain WHY these propagation rules exist: a calculated result **cannot be more precise than its least precise input** — recognizing that a calculator's many displayed digits do not manufacture genuine precision, and correctly rounding a final computed answer to reflect the true, honestly-supportable precision of the original measurements.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.rounding` (the rounding procedure, and — critically — that concept's own already-established rules for COUNTING significant figures in a single number: nonzero digits always count, zeros between significant digits count, leading zeros never count, trailing zeros' significance depends on decimal-point context) and `math.arith.decimals` (decimal notation).

## Component 3 — Core Explanation

**Division of labor with `math.arith.rounding`**: that prerequisite concept already fully teaches how to COUNT the significant figures in a single given number (its own LO2, with the complete leading/trailing-zero rules). This concept does NOT re-teach that counting procedure — it assumes it and moves directly to the genuinely new content: how significant figures determine the appropriate PRECISION of a CALCULATED result, when combining multiple measured quantities via arithmetic.

**The multiplication/division rule**: when multiplying or dividing measured numbers, round the result to the SAME NUMBER OF SIGNIFICANT FIGURES as whichever input has the FEWEST significant figures (the "least precise" input) — using the already-mastered sig-fig-counting rules to identify which input that is.

**The addition/subtraction rule — a DIFFERENT rule, based on decimal places, not sig-fig count**: when adding or subtracting measured numbers, round the result to the SAME NUMBER OF DECIMAL PLACES as whichever input has the FEWEST decimal places — a genuinely DIFFERENT counting basis than the multiplication/division rule. This distinction matters: a number like $120$ (2 sig figs, assuming the trailing zero isn't significant, but $0$ decimal places) combined by addition with $3.45$ (3 sig figs, $2$ decimal places) is governed by DECIMAL PLACES ($0$, from $120$), not by sig-fig count — the two rules use fundamentally different counting systems, applied to different operations.

**Why the rules exist — precision cannot be manufactured**: a calculated result is only as precise as the LEAST precise measurement that went into it — performing more arithmetic, or a calculator displaying ten digits, does not create genuine additional precision out of nowhere. Reporting a calculated answer with MORE significant figures than the input data can honestly support is a form of overstating precision — implying a level of measurement confidence the original data never actually had.

## Component 4 — Worked Examples

**Example 1 (LO1 — multiplication/division, matching the fewest sig figs)**: A rectangle measures $12.5$ cm (3 sig figs) by $7.34$ cm (3 sig figs)... now consider $12.5$ cm (3 sig figs) by $7.3$ cm (2 sig figs, the LESS precise measurement). Raw product: $12.5\times7.3 = 91.25$. Since the least precise input ($7.3$) has only 2 significant figures, round the answer to 2 sig figs: $91$ cm². Reporting the full calculator output ($91.25$) would falsely imply a precision the $7.3$ measurement never actually had.

**Example 2 (LO2 — addition/subtraction, matching decimal places NOT sig figs, breaking MC-1)**: Add $24.7$ (1 decimal place, 3 sig figs) and $3.28$ (2 decimal places, 3 sig figs). Raw sum: $24.7+3.28=27.98$. Applying the CORRECT rule (decimal places, not sig-fig count): the least precise input, $24.7$, has only 1 decimal place, so round the answer to 1 decimal place: $28.0$. A student who mistakenly applied the multiplication rule (match sig figs — both inputs have 3) might report $28.0$ ALSO having 3 sig figs by coincidence here, but check a case where the rules genuinely diverge: add $120$ (0 decimal places, ambiguous/2-3 sig figs) and $3.45$ (2 decimal places, 3 sig figs): raw sum $123.45$; applying the addition rule correctly (match the FEWEST decimal places, which is $0$ from $120$): round to $123$ — NOT determined by matching sig-fig counts at all, proving addition/subtraction genuinely uses a different counting basis than multiplication/division.

**Example 3 (LO3 — precision cannot be manufactured, a physical justification)**: A student measures a room's length as $4.2$ m (2 sig figs — the tape measure only reads to the nearest tenth) and width as $3.7$ m (2 sig figs). A calculator computes the area as $4.2\times3.7=15.54$ m². Reporting "$15.54$ m²" implies confidence down to the hundredths place — but the original measurements were only trustworthy to the TENTHS place; the calculator's extra digits are mathematically real but PHYSICALLY MEANINGLESS, since no measurement contributing to this calculation was ever precise enough to justify them. Correctly rounding to 2 sig figs (matching the least precise input): $16$ m² — an honest reflection of what the original measurements can actually support.

## Component 5 — Teaching Actions

### Teaching Action A01 — Multiplication/Division: Match the Fewest Sig Figs (Primitive P11: Representation Shift)

State: "when you multiply or divide, your answer can only be as precise as your LEAST precise input — round to match whichever input has the fewest significant figures." Work Example 1's direct computation, explicitly identifying which input is least precise using the already-known counting rules.

### Teaching Action A02 — Addition/Subtraction Uses a DIFFERENT Rule: Decimal Places (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the $120+3.45$ case, where the correct rounding (to $123$, matching decimal places) has NOTHING to do with matching sig-fig counts. State: "addition and subtraction use a COMPLETELY different counting system — decimal places, not significant figures. Don't apply the multiplication rule here."

- **MC-1 hook**: ask "does the same rule (match significant figures) apply to both multiplication/division AND addition/subtraction?" — a "yes" answer reveals MC-1 (applying the multiplication/division sig-fig-matching rule to addition/subtraction, missing that the latter uses decimal-place matching instead).

### Teaching Action A03 — Precision Cannot Be Manufactured by Calculation (Primitive P11: Representation Shift)

Present Example 3's direct physical justification: a calculator's extra digits are real numbers but meaningless precision, given the original measurements' actual limits. State: "rounding your final answer to the right number of sig figs isn't just a formatting rule — it's honestly reporting how much you actually know, no more and no less."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Multiply $8.3$ (2 sig figs) by $2.456$ (4 sig figs), and round the result to the correct number of significant figures.
  2. Add $56.2$ (1 decimal place) and $8.75$ (2 decimal places), and round the result to the correct number of decimal places.
  3. A student computes $\frac{15.0}{3.14159}$ and reports the calculator's full output, $4.774485...$. Round this to the correct number of significant figures, given $15.0$ has 3 sig figs.
  4. Explain, in your own words, why the addition/subtraction rule uses decimal places while the multiplication/division rule uses significant figures — these are genuinely different counting systems, not the same rule applied twice.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.num.floating-point` is not yet authored; a future revision may add a genuine cross-link probe into how computers represent and propagate rounding/precision limits in floating-point arithmetic once that entry exists)**: "A chemist measures the mass of a sample as $12.34$ g and its volume as $5.6$ mL, and needs to compute its density (mass ÷ volume) to report in a lab notebook. (a) Determine how many significant figures the reported density should have, and explain which measurement determines this. (b) Compute the density and round it correctly. (c) If the chemist instead needed to compute the TOTAL mass of two samples, $12.34$ g and $5.6$ g, explain why the correct rounding rule for THIS operation (addition) is different from the density calculation's rule, and compute the correctly-rounded total mass."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ADDITION-SUBTRACTION-RULE-CONFLATED-WITH-MULTIPLICATION-RULE | Applying the multiplication/division rule (match significant figures) to addition/subtraction, missing that addition/subtraction instead matches decimal places | Foundational |
| MC-2 | CALCULATOR-OUTPUT-REPORTED-WITHOUT-ROUNDING | Reporting a calculated result with all the digits a calculator displays, without rounding to the appropriate number of significant figures based on the input precision | Foundational |
| MC-3 | LEAST-PRECISE-INPUT-MISIDENTIFIED | Incorrectly identifying which input is "least precise" (fewest sig figs, or fewest decimal places, depending on the operation), often by miscounting sig figs using rules already established in `math.arith.rounding` | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Addition-Rule-Conflated-with-Multiplication-Rule") → P41 (detect: ask a student to round the sum $120+3.45$ and check whether they attempt to match significant figures rather than decimal places) → P64 (conceptual shift: re-walk Example 2's direct demonstration that the two rules use genuinely different counting bases, re-anchoring on "multiplication/division: match sig figs. Addition/subtraction: match decimal places. Never swap them").
- **B02 (targets MC-2)**: P27 (name it: "Unrounded Calculator Output Reported") → P41 (detect: ask a student to compute a product of two measurements and check whether they report the calculator's full unrounded output) → P64 (conceptual shift: re-walk Example 3's physical justification, re-anchoring on "extra calculator digits are not extra real-world precision — always round to match your least precise input").
- **B03 (targets MC-3)**: P27 (name it: "Least-Precise-Input Misidentification") → P41 (detect: ask a student to identify which of two given measurements is "least precise" and check whether they miscount significant figures, especially with tricky trailing zeros) → P64 (conceptual shift: re-apply `math.arith.rounding`'s own already-established sig-fig-counting rules explicitly, step by step, to each input before comparing).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.rounding` (the sig-fig-counting rules this concept directly reuses, without re-teaching, to identify the "least precise" input in a calculation), `math.arith.decimals` (the decimal notation these propagation rules are applied within).
- **Unlocks**: `math.num.floating-point` (computer floating-point representation has its own precision limits, directly analogous to the significant-figure precision-tracking established here).
- **Cross-link**: KG lists `math.num.floating-point` as both a requires-target relationship AND a cross-link (the KG lists it identically in both fields) — that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.num.floating-point.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into computer floating-point precision limits once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/apply tag places this at a "3 TAs + gate" tier — A01 (multiplication/division rule), A02 (addition/subtraction's different rule), and A03 (why precision can't be manufactured) each target a distinct LO, appropriate for a compact concept building directly on `math.arith.rounding`'s already-mastered counting rules.
- **Explicit division of labor with `math.arith.rounding`** (stated directly in Component 3): that concept owns COUNTING significant figures in a single number (nonzero/between/leading/trailing zero rules); this concept owns PROPAGATING precision through arithmetic OPERATIONS (multiplication/division vs. addition/subtraction), genuinely new content that concept never addresses.
- MC-1 (conflating the two propagation rules) was given the most teaching weight because it is the single most common error once a student has correctly learned the multiplication/division rule — the natural (but incorrect) assumption is that "the sig-fig rule" is universal, when in fact addition/subtraction requires switching to an entirely different counting basis (decimal places).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.num.floating-point not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: multiplying two measured lengths of differing precision before the general rules) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
