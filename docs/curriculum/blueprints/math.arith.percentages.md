# Teaching Blueprint: Percentages (`math.arith.percentages`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.percentages` |
| name | Percentages |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.arith.fractions`, `math.arith.decimals` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — converting one specific percentage to a fraction and a decimal, and computing one specific "percent of" problem, before naming the general rule |
| description (KG) | A way of expressing a number as a fraction of 100 (per centum); $x\%=x/100$, widely used in everyday contexts such as interest rates and proportions. |

## Component 1 — Learning Objectives

- LO1: Define $x\%=\dfrac{x}{100}$, recognizing a percentage as SIMPLY `math.arith.fractions`'s own $p/q$ notation with the denominator FIXED at $100$ — not a new kind of number, just a fraction with a standardized denominator — and convert freely between percentage, fraction, and `math.arith.decimals`'s decimal notation for the same value.
- LO2: Compute "$x\%$ of $N$" by MULTIPLYING $N$ by the fraction $x/100$ (equivalently, the decimal $x/100$), and apply this to solve everyday percentage problems (discounts, interest, proportions).
- LO3 (orientation level — full percentage-change theory deferred): recognize, without full derivation, that percentage INCREASE/DECREASE problems (e.g. "a price increases by 20%, then decreases by 20%") do NOT simply cancel, because each percentage change is computed relative to a DIFFERENT base value — previewing the general percent-change formula.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.fractions` ($p/q$ as a ratio of integers) and `math.arith.decimals` (place-value notation extending to the right of the decimal point).

## Component 3 — Core Explanation

**A percentage is a fraction with denominator fixed at $100$, not a new kind of number**: `math.arith.fractions` already established $p/q$ as a general ratio. "Percent" ("per centum," per hundred) simply STANDARDIZES the denominator to $100$: $x\%$ means EXACTLY the fraction $x/100$. This is why every percentage instantly converts to a decimal (via `math.arith.decimals`'s place-value notation — $x/100$ shifts the decimal point two places) and to a fraction in lowest terms (by simplifying $x/100$) — all three notations describe the identical value, differing only in HOW that value is written.

**"$x\%$ of $N$" means multiply $N$ by the fraction $x/100$**: since $x\%=x/100$, computing "$x\%$ of $N$" is literally computing $\dfrac{x}{100}\times N$ — the SAME operation as finding a fraction of a quantity (e.g. "$\frac{1}{4}$ of $N$" means $\frac{1}{4}\times N$), just with the specific fraction $x/100$ substituted in. No new arithmetic operation is being introduced; only the specific fraction being multiplied is new.

**Percentage changes are relative to a base that can SHIFT (orientation level)**: a $20\%$ increase followed by a $20\%$ decrease does NOT return to the original value, because each percentage is computed relative to a DIFFERENT current amount — the increase is $20\%$ of the ORIGINAL value, but the decrease is $20\%$ of the NEW (already-increased) value, a larger base, so the decrease removes MORE in absolute terms than the increase added. Full development of the general percent-change formula ($\text{new}=\text{old}\times(1+r)$ for rate $r$, applied sequentially) is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — converting between percentage, fraction, and decimal, breaking MC-1)**: $35\%=\dfrac{35}{100}=\dfrac{7}{20}$ (simplifying the fraction, dividing numerator and denominator by $5$) $=0.35$ (via `math.arith.decimals`'s place-value shift). All three — $35\%$, $\frac{7}{20}$, $0.35$ — represent the IDENTICAL value; none is more "correct" than another, they are simply three notations for one number.

**Example 2 (LO2 — computing "percent of," breaking MC-2)**: to find $15\%$ of $80$: $15\%=\dfrac{15}{100}=0.15$, so $15\%$ of $80=0.15\times80=12$. Checking via the fraction route: $\dfrac{15}{100}\times80=\dfrac{15\times80}{100}=\dfrac{1200}{100}=12$ — the SAME answer, confirming "percent of" is just multiplication by the corresponding fraction/decimal, computed either way.

**Example 3 (LO3, orientation level — sequential percentage changes don't cancel, breaking MC-3)**: a $\$100$ item increases in price by $20\%$: new price $=100\times1.20=\$120$. It then DECREASES by $20\%$: this $20\%$ is now computed on the NEW base $\$120$, not the original $\$100$: decrease $=120\times0.20=\$24$, giving a final price of $120-24=\$96$ — NOT back to $\$100$. The $20\%$ increase added $\$20$ (relative to the smaller base $100$), while the $20\%$ decrease removed $\$24$ (relative to the larger base $120$) — a genuinely different absolute amount, because the base shifted between the two calculations.

## Component 5 — Teaching Actions

### Teaching Action A01 — Percent Is Just a Fraction With Denominator 100 (Primitive P11: Representation Shift)

State: "you already know fractions — a percentage is nothing more than a fraction where the denominator is standardized to $100$, giving you a common, easy-to-compare format." Walk Example 1's three-way conversion.

- **MC-1 hook**: ask "is a percentage a fundamentally different KIND of number from a fraction or decimal, requiring its own separate arithmetic?" — a "yes" answer reveals MC-1 (missing that $x\%$ IS $x/100$, simply a fraction with a fixed denominator, freely interconvertible with decimals).

### Teaching Action A02 — "Percent Of" Is Just Multiplication By a Fraction (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing "$15\%$ of $80$" via the decimal route ($0.15\times80$) and the fraction route ($\frac{15}{100}\times80$) gave the IDENTICAL answer, $12$. State: "'percent of' isn't a special new procedure — it's exactly the same 'multiply by a fraction' operation you already know, just with the fraction $x/100$."

- **MC-2 hook**: ask "does computing '$x\%$ of $N$' require a genuinely different arithmetic procedure from finding a fraction of a quantity?" — a "yes" answer reveals MC-2 (missing that "percent of" is literally multiplication by the fraction $x/100$, the same operation as any other "fraction of" computation).

### Teaching Action A03 — Sequential Percentage Changes Use Different Bases (Primitive P06: Contrast Pair)

Contrast the naive expectation "$+20\%$ then $-20\%$ returns to the original" against Example 3's actual result ($\$100\to\$120\to\$96$, not back to $\$100$). State: "each percentage change is computed relative to whatever the CURRENT value is at that moment — since the base shifts between the increase and the decrease, they don't simply cancel."

- **MC-3 hook**: ask "does a $20\%$ increase followed by a $20\%$ decrease always return a quantity to its original value?" — a "yes" answer reveals MC-3 (missing that the decrease is computed on a DIFFERENT, larger base than the increase, so the two changes don't cancel).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Convert $60\%$ to a simplified fraction and a decimal.
  2. Compute $25\%$ of $160$ via BOTH the decimal route and the fraction route, confirming both give the same answer.
  3. A $\$50$ item increases in price by $10\%$, then decreases by $10\%$. Compute the final price, and explain why it is not exactly $\$50$.
  4. Explain, in one sentence, why $x\%$ is not a new kind of number distinct from fractions and decimals.
- **P76 (Transfer Probe, mode = independence)**: "A store advertises 'Save 30% today, then take an EXTRA 10% off at checkout!' (a) If an item originally costs $\$200$, compute the price after the first $30\%$ discount. (b) Compute the price after the additional $10\%$ discount is applied to the ALREADY-discounted price. (c) A customer assumes this is 'basically a 40% discount' — evaluate this claim by comparing the actual final price to what a genuine flat $40\%$ discount off the original $\$200$ would give, and explain the discrepancy in terms of which base each percentage was computed against."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERCENT-ASSUMED-DIFFERENT-KIND-OF-NUMBER | Believing a percentage is a fundamentally different kind of number from a fraction or decimal, missing that $x\%$ IS $x/100$, simply a fraction with a fixed denominator | Foundational |
| MC-2 | PERCENT-OF-ASSUMED-SPECIAL-PROCEDURE | Believing "percent of" requires a genuinely different arithmetic procedure, missing that it is literally multiplication by the fraction $x/100$ | High |
| MC-3 | SEQUENTIAL-PERCENT-CHANGES-ASSUMED-TO-CANCEL | Believing a percentage increase followed by an equal percentage decrease returns a quantity to its original value, missing that each change is computed relative to a different (shifting) base | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Percent Assumed Different Kind of Number") → P41 (detect: ask whether a percentage is a fundamentally different kind of number from a fraction or decimal) → P64 (conceptual shift: re-walk Example 1's three-way conversion, re-anchoring on "$x\%$ IS $x/100$, simply a fraction with a fixed denominator").
- **B02 (targets MC-2)**: P27 (name it: "Percent Of Assumed Special Procedure") → P41 (detect: ask whether "percent of" requires a genuinely different arithmetic procedure from finding a fraction of a quantity) → P64 (conceptual shift: re-walk Example 2's dual-route computation, re-anchoring on "'percent of' is literally multiplication by the fraction $x/100$").
- **B03 (targets MC-3)**: P27 (name it: "Sequential Percent Changes Assumed to Cancel") → P41 (detect: ask whether an increase followed by an equal decrease returns a quantity to its original value) → P64 (conceptual shift: re-walk Example 3's shifting-base demonstration, re-anchoring on "each change is computed relative to whatever the CURRENT value is at that moment").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.fractions` ($p/q$ ratio notation, directly generalized here by fixing $q=100$) and `math.arith.decimals` (place-value notation, directly used for percentage-to-decimal conversion).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (three-way conversion and dual-route "percent of" verification) and LO3 kept orientation-level, appropriately surveying sequential percentage changes without deriving the general compound-percentage formula.
- **Division of labor**: `math.arith.fractions` owns the general $p/q$ ratio notation; `math.arith.decimals` owns place-value notation. This concept owns the SPECIFIC standardization to denominator $100$ and its everyday applications — deliberately verifying Example 2's answer via BOTH the decimal and fraction routes so learners see percentage computation as inheriting directly from already-mastered arithmetic, not as a new isolated skill.
- Example 3's deliberate choice of a SYMMETRIC percentage (same $20\%$ for both the increase and decrease) was chosen to make the non-cancellation counterintuitive result as stark and memorable as possible, rather than using two different percentages which might obscure the base-shifting mechanism.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific conversion/computation cases precede the general rule statements) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
