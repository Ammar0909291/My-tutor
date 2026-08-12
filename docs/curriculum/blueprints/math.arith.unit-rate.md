# Teaching Blueprint: Unit Rate (`math.arith.unit-rate`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.unit-rate` |
| name | Unit Rate |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.arith.ratios` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A ratio whose denominator is 1, expressing the amount of one quantity per single unit of another (e.g., km/h, price per kg). |

## Component 1 — Learning Objectives

- LO1: Compute a unit rate by dividing a ratio's first quantity by its second, expressing the result as "amount per one unit."
- LO2: Use unit rates to compare two different-sized options (e.g. two package sizes at different prices) and determine which offers better value.
- LO3: Correctly identify WHICH quantity the unit rate is "per," matching the units precisely (e.g. km/h vs. h/km are reciprocal, not interchangeable, rates).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.ratios` (the general part-to-part or part-to-whole comparison this concept specializes into a "per one unit" form).

## Component 3 — Core Explanation

A **unit rate** is a ratio reduced so its denominator is exactly 1 — expressing "how much of the first quantity corresponds to ONE unit of the second." Computed by dividing: $\text{unit rate}=\frac{\text{first quantity}}{\text{second quantity}}$, giving "first-quantity units per one second-quantity unit" (e.g. $240\text{ km}$ in $4$ hours gives a unit rate of $240\div4=60$ km/h — 60 km per ONE hour).

Unit rates are especially useful for COMPARISON: converting different-sized quantities (e.g. different package sizes) to a common "per unit" basis makes them directly comparable, which the original un-reduced ratios often are not.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic computation)**: A car travels $240$ km in $4$ hours. Unit rate: $240\div4=60$ km/h (60 km per hour).

**Example 2 (LO2 — comparing options via unit rate)**: A 12-oz bottle of juice costs \$3.60; a 20-oz bottle costs \$5.60. Unit rates (price per ounce): $3.60\div12=\$0.30$/oz; $5.60\div20=\$0.28$/oz. The 20-oz bottle has the LOWER unit price, so it is the better value per ounce, even though its total price is higher.

**Example 3 (LO3 — matching the "per" quantity correctly, breaking MC-1)**: A cyclist covers $18$ km in $3$ hours. The SPEED unit rate is $18\div3=6$ km/h (km PER hour). The INVERSE quantity — time per km — is $3\div18=\frac16$ h/km, a genuinely DIFFERENT rate with different units and a different practical meaning ("how long to cover one km" rather than "how far in one hour"). Computing $18\div3$ when the question actually asked for "hours per km" would answer the wrong question entirely, even though the same two numbers are involved.

## Component 5 — Teaching Actions

### Teaching Action A01 — Divide to Get "Per One Unit" (Primitive P64: Conceptual Shift)

Work Example 1, narrating explicitly: "we want to know how far in just ONE hour, so divide the total distance by the total hours" — connecting the division directly to the "per one unit" meaning, not just as an arbitrary operation.

### Teaching Action A02 — Unit Rates Enable Fair Comparison, and the "Per" Direction Matters (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2's two juice bottles, showing the raw totals (\$3.60 vs. \$5.60) don't directly compare value, but the unit rates (per ounce) do — reinforcing WHY unit rates are computed in the first place.

**Contrast 2 (targets MC-1)**: Contrast Example 3's two direction choices — km/h vs. h/km, computed from the SAME two numbers but representing different, non-interchangeable rates. State the rule: "always check which quantity the question wants 'per' — dividing the two numbers in the wrong order answers a different (reciprocal) question."

- **MC-1 hook**: ask for the "time per kilometer" rate immediately after computing Example 3's "km per hour," and check whether the SAME division (rather than its reciprocal) is repeated.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. A runner covers $10$ km in $2$ hours. Find the unit rate in km/h.
  2. Compare two boxes of cereal: 500 g for \$4.00, and 750 g for \$5.25. Determine which has the better (lower) price per gram.
  3. Given a rate of $15$ meters per $3$ seconds, find BOTH the "meters per second" rate and the "seconds per meter" rate, and explain how they differ.
  4. A recipe uses $2$ cups of flour for $8$ servings. Find the unit rate of cups per serving.
- **P76 (Transfer Probe, mode = independence)**: "A printer prints 90 pages in 6 minutes. (a) Compute the unit rate in pages per minute. (b) A colleague instead wants to know 'how many minutes per page' — explain, using Example 3's reciprocal-rate distinction, why simply reusing the same division ($90\div6$) would not answer this second question, and compute the correct minutes-per-page rate instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RECIPROCAL-RATE-DIRECTION-CONFUSED | Computing a rate in the wrong "per" direction (e.g. distance/time instead of the requested time/distance), reusing the same division regardless of which quantity should be the denominator | Foundational |
| MC-2 | LOWER-TOTAL-PRICE-ASSUMED-BETTER-VALUE-WITHOUT-UNIT-RATE | Comparing options by their total price/quantity alone rather than converting to a common unit rate first | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Reciprocal Rate Direction Confused") → P41 (detect: present Example 3's two direction questions and check whether the same division is used for both) → P64 (conceptual shift: explicitly restate which quantity is being asked "per," then set up the division with THAT quantity as the divisor each time).
- **B02 (targets MC-2)**: P27 ("Lower Total Price Assumed Better Value") → P41 (detect: present Example 2's two bottles and check whether the student compares raw prices \$3.60 vs. \$5.60 directly, declaring the cheaper TOTAL price the better deal) → P64 (conceptual shift: re-derive both unit rates explicitly, showing the true per-ounce comparison reverses the naive total-price comparison).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.ratios`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.direct-variation`, `math.arith.inverse-variation` (both later formalize rate-based relationships this concept introduces informally).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that unit rate computation itself is a single division step; the genuine complexity lies in correct setup (LO3) and comparative application (LO2).
- MC-1 was ranked most severe because it silently produces a plausible-looking but WRONG rate — the numbers used are correct, only their roles are swapped, making the error easy to miss without explicit unit-checking.
- Example 2's juice-bottle case was deliberately chosen as the canonical value-comparison example because "bigger package, better deal" is a common but unreliable heuristic in real shopping contexts, directly motivating why unit rates (not raw totals) are the correct comparison tool.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.ratios`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
