# Teaching Blueprint: Fraction Addition (`math.arith.fraction-addition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.fraction-addition` |
| name | Fraction Addition |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.arith.fractions`, `math.nt.lcm` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — fraction-bar/area models before symbolic common-denominator addition |
| description (KG) | Adding or subtracting fractions by finding a common denominator and combining numerators; requires knowledge of LCM. |

## Component 1 — Learning Objectives

- LO1: Add (or subtract) two fractions with the SAME denominator by combining numerators directly, keeping the denominator unchanged.
- LO2: Add (or subtract) two fractions with DIFFERENT denominators by first converting both to a common denominator (typically the LCM of the two denominators), then combining numerators.
- LO3: Simplify the resulting sum/difference to lowest terms, and convert an improper result to a mixed number where appropriate.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.fractions` (what a fraction represents) and `math.nt.lcm` (the least common multiple this concept uses to find a common denominator efficiently).

## Component 3 — Core Explanation

Fractions can only be added by combining LIKE parts — pieces of the SAME size (denominator). Adding fractions with the same denominator simply combines numerators: $\frac{a}{d}+\frac{b}{d}=\frac{a+b}{d}$. Adding fractions with DIFFERENT denominators first requires converting both to equivalent fractions sharing a common denominator (the LCM of the original denominators is the most efficient choice, avoiding unnecessarily large numbers), then combining numerators as before. The denominator itself is NEVER added or changed during the numerator-combination step — it only changes during the earlier common-denominator conversion.

## Component 4 — Worked Examples

**Example 1 (LO1 — same denominator)**: Add $\frac25+\frac15$: same denominator, so combine numerators: $\frac{2+1}{5}=\frac35$.

**Example 2 (LO2 — different denominators via LCM, breaking MC-1)**: Add $\frac13+\frac14$. $\text{lcm}(3,4)=12$. Convert: $\frac13=\frac{4}{12}$, $\frac14=\frac{3}{12}$. Add: $\frac{4+3}{12}=\frac{7}{12}$. A common flawed shortcut adds numerators AND denominators directly ("$\frac13+\frac14=\frac{1+1}{3+4}=\frac27$") — this is NOT how fraction addition works; denominators must be MATCHED (via a common denominator), never summed, since $\frac13$ and $\frac14$ are pieces of genuinely different sizes that cannot be combined until re-expressed in the same-size pieces.

**Example 3 (LO3 — simplifying and converting the result)**: Add $\frac56+\frac23$. $\text{lcm}(6,3)=6$. Convert: $\frac56$ stays $\frac56$, $\frac23=\frac46$. Add: $\frac{5+4}{6}=\frac96$. Simplify: $\gcd(9,6)=3$, so $\frac96=\frac32$. Convert to mixed number: $\frac32=1\frac12$. The final answer, fully processed, is $1\frac12$ — stopping at the unsimplified improper fraction $\frac96$ (or even $\frac32$ without the mixed-number conversion, depending on the requested form) leaves the answer incomplete.

## Component 5 — Teaching Actions

### Teaching Action A01 — Same Denominator: Combine Numerators Directly (Primitive P64: Conceptual Shift)

Represent Example 1 with fraction-bar models (two bars each divided into 5ths, shading 2 and 1 respectively), physically combining the shaded pieces to show $3$ out of $5$ total pieces — connecting the visual combination directly to the numerator-only addition.

- **MC-1 hook**: present Example 2's $\frac13+\frac14$ and ask the student to add directly; check whether numerators AND denominators both get summed (revealing MC-1: treating fraction addition like adding two ratios or ordered pairs component-wise, rather than requiring same-size pieces first).

### Teaching Action A02 — Different Denominators Need Converting First (Primitive P06: Contrast Pair)

Contrast the flawed "add both parts directly" shortcut against the correct LCM-based conversion, using fraction-bar models to show WHY $\frac13$ and $\frac14$ genuinely cannot be combined as-is — the bars are divided into different-sized pieces, and only after both are re-drawn with 12 equal pieces can the shaded amounts be meaningfully combined. State the rule: "never add numerators until both denominators match — find a common denominator FIRST."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Add $\frac38+\frac28$ (same denominator).
  2. Add $\frac25+\frac13$, finding the LCM of 5 and 3 as the common denominator.
  3. Subtract $\frac34-\frac16$, converting to a common denominator first.
  4. Add $\frac56+\frac34$, then simplify and convert the result to a mixed number.
- **P76 (Transfer Probe, mode = independence)**: "A recipe requires $\frac23$ cup of flour for the base and $\frac12$ cup of flour for the topping. (a) Find the total amount of flour needed, using a common denominator to add the two fractions. (b) A student computes this as $\frac{2+1}{3+2}=\frac35$ cup — explain precisely why this is incorrect, using the fraction-bar reasoning from this lesson, and give the correct total."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NUMERATORS-AND-DENOMINATORS-BOTH-ADDED | Adding both the numerators and the denominators directly (treating fractions like ordered pairs) instead of finding a common denominator first | Foundational |
| MC-2 | COMMON-DENOMINATOR-FOUND-BUT-NUMERATOR-NOT-RESCALED | Converting the denominator to the common value but forgetting to correspondingly rescale the numerator of one or both fractions | Foundational |
| MC-3 | RESULT-LEFT-UNSIMPLIFIED-OR-AS-IMPROPER-FRACTION | Leaving the final sum in an unsimplified or improper-fraction form without reducing to lowest terms or converting to a mixed number as appropriate | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Numerators and Denominators Both Added") → P41 (detect: present Example 2 and check for a "$\frac{1+1}{3+4}$"-style answer) → P64 (conceptual shift: re-draw both fractions as differently-divided bars, showing they cannot be directly combined until redrawn with matching-size pieces).
- **B02 (targets MC-2)**: P27 ("Common Denominator Found but Numerator Not Rescaled") → P41 (detect: review a submitted conversion where the denominator changes to the LCM but the numerator stays at its original, un-rescaled value) → P64 (conceptual shift: re-derive the equivalent fraction explicitly, e.g. $\frac13=\frac{1\times4}{3\times4}=\frac{4}{12}$, showing the numerator must scale by the SAME factor as the denominator).
- **B03 (targets MC-3)**: P27 ("Result Left Unsimplified") → P41 (detect: review a submitted final answer for an unreduced or improper form) → P64 (re-walk Example 3's full completion sequence — simplify via GCD, then convert improper to mixed — as the required final step, not optional polish).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.fractions`, `math.nt.lcm`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.fraction-simplification` (the final-step reduction this concept's Example 3 relies on).

## Component 8 — Teaching Notes

- estimated_hours = 8 (among the highest in this batch) reflects that fraction addition combines several previously-separate skills (LCM-finding, equivalent-fraction conversion, numerator combination, simplification, mixed-number conversion) into one multi-step procedure, each step being a genuine potential failure point.
- MC-1 was ranked most severe because it represents a complete conceptual failure to recognize why fraction addition differs from ordinary paired-number operations — it produces plausible-looking but numerically meaningless answers (e.g. $\frac27$ for $\frac13+\frac14$, which is not even between $\frac13$ and $\frac14+\frac13$'s true value).
- The recipe transfer probe was deliberately designed to require BOTH the correct procedure (part a) and an explicit critique of the MC-1 shortcut (part b), ensuring the misconception repair transfers to a realistic context rather than only being caught in an abstract symbolic drill.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.fractions`, `math.nt.lcm`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: fraction-bar models before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
