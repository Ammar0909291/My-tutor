# Teaching Blueprint: Fraction Simplification (`math.arith.fraction-simplification`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.fraction-simplification` |
| name | Fraction Simplification |
| domain | Arithmetic |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.arith.fraction-equivalence`, `math.nt.gcd` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — equivalent-fraction area models before symbolic GCD division |
| description (KG) | Writing a fraction in its simplest (lowest) form by dividing numerator and denominator by their greatest common divisor. |

## Component 1 — Learning Objectives

- LO1: Simplify a fraction to lowest terms by dividing both numerator and denominator by their greatest common divisor (GCD).
- LO2: Verify a fraction is FULLY simplified by confirming its numerator and denominator have GCD $=1$ (are coprime).
- LO3: Recognize that dividing numerator and denominator by any COMMON factor (not necessarily the full GCD) produces an equivalent, but not necessarily fully simplified, fraction — and that repeating the process (or finding the true GCD directly) completes the simplification.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.fraction-equivalence` (dividing numerator and denominator by the same number preserves the fraction's value) and `math.nt.gcd` (the greatest common divisor computation this concept applies).

## Component 3 — Core Explanation

**Fraction simplification** rewrites a fraction $\frac{a}{b}$ in its lowest terms by dividing both $a$ and $b$ by $\gcd(a,b)$: $\frac{a}{b} = \frac{a\div\gcd(a,b)}{b\div\gcd(a,b)}$. The result is equivalent in value to the original (by `math.arith.fraction-equivalence`'s principle) but has numerator and denominator with no common factor greater than 1 (i.e. they are coprime, $\gcd=1$) — this is the definition of "fully simplified" or "in lowest terms."

Dividing by a common factor SMALLER than the full GCD still produces a valid, equivalent fraction, just not yet fully reduced — the process may need to repeat, or the GCD should be found directly to simplify in one step.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct GCD simplification)**: Simplify $\frac{18}{24}$. $\gcd(18,24)=6$. Divide both by 6: $\frac{18\div6}{24\div6}=\frac{3}{4}$. Check: $\gcd(3,4)=1$, so $\frac34$ is fully simplified.

**Example 2 (LO3 — partial simplification requiring a second pass, breaking MC-1)**: Simplify $\frac{36}{48}$ by dividing both by the common factor 2 (not yet the full GCD): $\frac{18}{24}$ — a valid, equivalent fraction, but NOT yet fully simplified, since $\gcd(18,24)=6\ne1$. A second division by 6 (or by 2, then 3) is needed: $\frac{18\div6}{24\div6}=\frac34$. Stopping after the first division and calling $\frac{18}{24}$ "simplified" is the common error — any common factor works for a valid step, but full simplification requires reaching $\gcd=1$, checked explicitly, not assumed after one division.

**Example 3 (LO2 — verifying full simplification)**: Given $\frac{15}{28}$, verify it is fully simplified by checking $\gcd(15,28)$: $15=3\times5$, $28=2^2\times7$ — no shared prime factors, so $\gcd(15,28)=1$, confirming $\frac{15}{28}$ is already in lowest terms and needs no further reduction.

## Component 5 — Teaching Actions

### Teaching Action A01 — Divide Numerator and Denominator by the GCD (Primitive P64: Conceptual Shift)

Work Example 1 in full: compute $\gcd(18,24)$ explicitly (e.g. via prime factorization or the Euclidean algorithm, per `math.nt.gcd`), then divide both parts by it in one step, verifying the result is coprime.

- **MC-1 hook**: present Example 2's $\frac{36}{48}$ and observe whether the student stops after one division by a smaller common factor, declaring $\frac{18}{24}$ "done" (revealing MC-1: mistaking ANY valid equivalent-fraction reduction step for full simplification, without checking the result's own GCD).

### Teaching Action A02 — Checking GCD = 1 Confirms Full Simplification (Primitive P06: Contrast Pair)

Contrast Example 2's INCOMPLETE reduction (stopped at $\frac{18}{24}$, GCD still 6) against Example 3's ALREADY-complete case ($\frac{15}{28}$, GCD verified as 1 directly). State the rule explicitly: "after any simplification step, check whether the new numerator and denominator still share a common factor — if they do, simplify again; a fraction is only DONE once its GCD is exactly 1."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Simplify $\frac{20}{35}$ to lowest terms, showing the GCD used.
  2. Given a partial simplification of $\frac{60}{72}$ down to $\frac{30}{36}$ (divided by 2 only), continue simplifying to lowest terms and verify the final result is coprime.
  3. Verify whether $\frac{22}{35}$ is already fully simplified, showing the GCD computation.
  4. Simplify $\frac{100}{45}$ (an improper fraction) to lowest terms.
- **P76 (Transfer Probe, mode = independence)**: "A recipe calls for $\frac{16}{40}$ of a cup of an ingredient. (a) Simplify this fraction to lowest terms to express the amount more simply. (b) A cook simplifies it in two steps, first dividing by 4 to get $\frac{4}{10}$, then stopping — explain, using this lesson's GCD-verification idea, why $\frac{4}{10}$ is not yet the final simplified answer, and complete the simplification."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARTIAL-REDUCTION-MISTAKEN-FOR-FULL-SIMPLIFICATION | Stopping after dividing by any common factor smaller than the true GCD, without checking whether the result can be reduced further | Foundational |
| MC-2 | GCD-COMPUTED-INCORRECTLY | Miscomputing the greatest common divisor itself (e.g. finding a common factor that isn't the GREATEST one, or an incorrect factor entirely) | Moderate |
| MC-3 | NUMERATOR-AND-DENOMINATOR-DIVIDED-BY-DIFFERENT-NUMBERS | Dividing the numerator and denominator by two DIFFERENT numbers rather than the same common factor, breaking the fraction's equivalence entirely | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Partial Reduction Mistaken for Full Simplification") → P41 (detect: present Example 2's stopped-at-$\frac{18}{24}$ case and ask whether it's fully simplified) → P64 (conceptual shift: re-check the GCD of the intermediate result explicitly, showing it is not yet 1, then complete the reduction).
- **B02 (targets MC-2)**: P27 ("GCD Computed Incorrectly") → P41 (detect: review a submitted GCD computation for an error, e.g. finding a common factor that is not the largest one) → P64 (conceptual shift: re-derive the GCD via prime factorization, listing all shared prime factors explicitly per `math.nt.gcd`'s method).
- **B03 (targets MC-3)**: P27 ("Numerator/Denominator Divided by Different Numbers") → P41 (detect: review a submitted simplification for mismatched divisors applied to numerator vs. denominator) → P64 (conceptual shift: re-state the equivalence rule — the SAME number must divide both parts — grounded in `math.arith.fraction-equivalence`).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.fraction-equivalence`, `math.nt.gcd`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept combines two already-mastered prerequisites (equivalence, GCD) into a single applied procedure, rather than introducing substantial new conceptual content.
- MC-1 was ranked most severe because it is the single most common real-world error in fraction simplification — students frequently know HOW to divide by a common factor but stop before reaching the true lowest terms, submitting a technically-equivalent but incompletely-reduced answer.
- Example 2 was deliberately structured as a two-step reduction (rather than jumping straight to the correct GCD) because this mirrors how students naturally simplify in practice — spotting an easy factor like 2 first — making the "check again after each step" habit the actual skill being trained, not just GCD computation in isolation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.fraction-equivalence`, `math.nt.gcd`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: area models before symbolic GCD division) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
