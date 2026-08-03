# Teaching Blueprint: Terminating Decimals (`math.arith.terminating-decimals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.terminating-decimals` |
| name | Terminating Decimals |
| domain | Arithmetic |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 4/5 |
| estimated_hours | 2 |
| requires | `math.arith.decimals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A decimal whose digits end after finitely many places; corresponds exactly to fractions whose denominators have only 2 and 5 as prime factors. |

## Component 1 — Learning Objectives

- LO1: Identify a decimal as terminating (digits end after finitely many places) by direct inspection or by long division reaching a remainder of 0.
- LO2: Determine, WITHOUT performing the division, whether a fraction $\frac{a}{b}$ (in lowest terms) will produce a terminating decimal, by checking whether $b$'s only prime factors are 2 and/or 5.
- LO3: Convert a fraction known to terminate into its exact decimal form using the denominator's prime factorization (e.g. by multiplying to reach a power of 10).

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.decimals` (the place-value decimal representation this concept classifies).

## Component 3 — Core Explanation

A decimal **terminates** if its digits end after finitely many places (e.g. $0.75$, $0.125$). A fraction $\frac{a}{b}$ in LOWEST TERMS produces a terminating decimal if and only if the denominator $b$'s only prime factors are 2 and/or 5 — because only such denominators can be scaled (by multiplying numerator and denominator by the same factor) into a power of 10 ($10=2\times5$), which is exactly what a terminating decimal represents (a fraction over $10^n$).

This criterion applies to the fraction in LOWEST TERMS — an unreduced fraction can misleadingly appear to have "other" prime factors in its denominator that actually cancel with the numerator.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — direct classification)**: Does $\frac38$ terminate? $8=2^3$ — only prime factor 2 — so YES, it terminates. Confirm by division: $3\div8=0.375$, ending after 3 places.

**Example 2 (LO2 — the lowest-terms requirement, breaking MC-1)**: Does $\frac{6}{15}$ terminate? Its denominator $15=3\times5$ includes the prime factor 3, which might suggest NO — but $\frac{6}{15}$ is NOT in lowest terms; simplifying first, $\frac{6}{15}=\frac25$ (dividing by $\gcd=3$), whose denominator $5$ has ONLY the prime factor 5 — so it DOES terminate ($\frac25=0.4$). Checking the denominator's prime factors BEFORE simplifying to lowest terms can give a wrong answer, since factors that will cancel with the numerator are irrelevant to the true classification.

**Example 3 (LO3 — converting via power of 10)**: Convert $\frac{7}{25}$ to a decimal directly (without long division). $25=5^2$; multiply numerator and denominator by $4$ (since $5^2\times2^2=10^2=100$): $\frac{7}{25}=\frac{7\times4}{25\times4}=\frac{28}{100}=0.28$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Only Denominators of 2s and 5s Terminate (Primitive P64: Conceptual Shift)

Work Example 1's classification, explicitly factoring the denominator into primes and checking against the "only 2s and/or 5s" rule, then verify by direct long division.

- **MC-1 hook**: present Example 2's $\frac{6}{15}$ (unreduced) and ask whether it terminates by checking the denominator 15's factors directly (revealing MC-1: applying the prime-factor test to an UNREDUCED fraction, missing that a factor shared with the numerator will cancel upon simplification).

### Teaching Action A02 — Simplify to Lowest Terms Before Testing (Primitive P06: Contrast Pair)

Contrast testing $\frac{6}{15}$'s denominator directly (misleadingly suggesting non-termination due to the factor 3) against testing its SIMPLIFIED form $\frac25$ (denominator purely a power of 5, correctly terminating). State the rule: "always reduce to lowest terms FIRST — only the reduced denominator's prime factors determine termination."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Determine whether $\frac{5}{16}$ terminates, showing the denominator's prime factorization.
  2. Determine whether $\frac{9}{12}$ terminates, first simplifying to lowest terms.
  3. Convert $\frac{3}{20}$ to its exact decimal form by scaling to a power of 10 (without long division).
  4. Explain, in one sentence, why $\frac{1}{6}$ does NOT terminate, citing its prime factorization.
- **P76 (Transfer Probe, mode = independence)**: "A student claims that $\frac{4}{10}$ does not terminate because 10 has the prime factor... actually, checking, $10=2\times5$ only — so the student is confused about a DIFFERENT fraction, $\frac{4}{14}$, and wants to know if IT terminates. (a) Determine whether $\frac{4}{14}$ terminates, being careful to simplify first. (b) Explain, using this lesson's lowest-terms rule, why checking $14=2\times7$'s factors directly (before simplifying) could have been misleading here specifically."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TERMINATION-TESTED-ON-UNREDUCED-DENOMINATOR | Checking the prime factors of a fraction's denominator BEFORE simplifying to lowest terms, potentially misclassifying termination | Foundational |
| MC-2 | TERMINATION-CRITERION-MISREMEMBERED-AS-EVEN-DENOMINATORS-ONLY | Believing only denominators that are powers of 2 (not also 5, or combinations of 2 and 5) permit termination | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Termination Tested on Unreduced Denominator") → P41 (detect: present Example 2's $\frac{6}{15}$ and check whether the student simplifies before testing) → P64 (conceptual shift: re-walk the simplification step explicitly, showing the factor of 3 cancels, leaving only a power of 5 in the reduced denominator).
- **B02 (targets MC-2)**: P27 ("Termination Criterion Misremembered as Powers of 2 Only") → P41 (detect: present $\frac{1}{5}$ or $\frac{3}{20}$ and ask whether it terminates; check for an incorrect "no" based on the presence of 5 as a factor) → P64 (conceptual shift: re-derive Example 3's $\frac{7}{25}$ conversion, explicitly showing 5's role alongside 2 in reaching a power of 10).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.decimals`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.repeating-decimals` (the complementary classification for non-terminating rational decimals).

## Component 8 — Teaching Notes

- estimated_hours = 2 and bloom = understand reflect that this concept is primarily a CLASSIFICATION skill (recognizing which fractions terminate, and why) rather than a new computational procedure.
- MC-1 was ranked most severe because it is the single most common way to reach a wrong classification despite correctly knowing and applying the underlying "2s and 5s" rule — the failure is in the SETUP (testing the wrong, unreduced denominator), not the rule itself.
- Example 2's deliberately "tricky" unreduced case ($\frac{6}{15}$) was chosen specifically because textbook examples often only use already-reduced fractions, which can leave the lowest-terms requirement untested and this misconception undetected until a genuinely unreduced case is encountered.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.decimals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
