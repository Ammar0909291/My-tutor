# Teaching Blueprint: Zero Exponent (`math.alg.zero-exponent`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.zero-exponent` |
| name | Zero Exponent |
| domain | Algebra |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.alg.exponent-rules` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | For any nonzero base a, a⁰ = 1; follows from the quotient rule aⁿ/aⁿ = a⁰ = 1.

 |

## Component 1 — Learning Objectives

- LO1: State that $a^0=1$ for any NONZERO base $a$, and apply this directly in simplification.
- LO2: Derive WHY $a^0=1$ using the quotient rule $\frac{a^n}{a^n}=a^{n-n}=a^0$, connecting it to the fact that any nonzero number divided by itself equals 1.
- LO3: Recognize that $0^0$ is a special, UNDEFINED (or context-dependent, by convention) case — the rule $a^0=1$ explicitly requires $a\ne0$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.exponent-rules` (the general laws of exponents, including the quotient rule this concept's derivation relies on).

## Component 3 — Core Explanation

For any NONZERO base $a$: $a^0=1$. This is not an arbitrary convention — it follows directly from the QUOTIENT RULE for exponents: $\frac{a^n}{a^n}=a^{n-n}=a^0$. Since $\frac{a^n}{a^n}=1$ (any nonzero number divided by itself is 1), it must be that $a^0=1$ as well, for CONSISTENCY with the quotient rule.

The base being NONZERO matters: $0^0$ is a genuinely special case, often left UNDEFINED in general mathematics (though certain specific contexts, like combinatorics or certain limit conventions, may assign it the value 1 by convention for that context) — this concept's rule $a^0=1$ does not apply to $a=0$.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct application)**: Simplify $7^0$: by the rule, $7^0=1$.

**Example 2 (LO2 — deriving the rule from the quotient rule, breaking MC-1)**: Verify $5^0=1$ using the quotient rule: $\frac{5^3}{5^3}=5^{3-3}=5^0$. Since $\frac{5^3}{5^3}=\frac{125}{125}=1$ (dividing any nonzero number by itself), it follows that $5^0=1$. A common error assumes $a^0=0$ (perhaps by analogy with "anything times zero is zero," or confusing the EXPONENT being zero with the BASE being zero) — the quotient-rule derivation directly shows this is false; $a^0$ equals $1$, not $0$, for any nonzero $a$.

**Example 3 (LO3 — the special $0^0$ case)**: The expression $0^0$ is NOT covered by the rule $a^0=1$, since that rule specifically requires $a\ne0$. Applying the quotient-rule derivation to $a=0$ fails: $\frac{0^n}{0^n}$ is itself undefined (division by zero), so the derivation simply doesn't apply — $0^0$ must be treated as a special case, left undefined in most contexts, rather than automatically assumed to equal 1 by blindly extending this rule.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Quotient Rule Forces a^0 = 1 (Primitive P64: Conceptual Shift)

Work Example 2's derivation explicitly, connecting the "anything nonzero divided by itself is 1" fact directly to the quotient rule's exponent subtraction, showing $a^0=1$ is a NECESSARY consequence, not an arbitrary convention.

- **MC-1 hook**: ask what $6^0$ equals before revealing the rule, checking for a "$0$" answer (revealing MC-1: assuming a zero exponent produces a zero result, confusing exponent value with output value).

### Teaching Action A02 — The Nonzero-Base Requirement: 0^0 Is Special (Primitive P06: Contrast Pair)

Work Example 3, explicitly showing WHY the quotient-rule derivation breaks down for $a=0$ (division by zero), contrasting this against the clean derivation for nonzero $a$. State the rule: "$a^0=1$ requires $a\ne0$ — the case $0^0$ needs separate, careful treatment and should never be assumed to just follow the same rule automatically."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Simplify $12^0$.
  2. Simplify $(-3)^0$.
  3. Derive $8^0=1$ using the quotient rule, showing the intermediate steps.
  4. Explain, in one sentence, why $0^0$ is not automatically covered by the rule $a^0=1$.
- **P76 (Transfer Probe, mode = independence)**: "A scientific formula includes the term $(1+r)^0$ where $r$ represents an interest rate variable that could, in principle, take any value including making the base zero in a special edge case. (a) Evaluate $(1+r)^0$ for a typical nonzero base value like $r=0.05$ (giving base $1.05$), and explain using this lesson's rule why the result is $1$ regardless of the SPECIFIC nonzero value of $1+r$. (b) Explain what would need special attention if $r=-1$ (making the base exactly $1+(-1)=0$), connecting to this lesson's discussion of the $0^0$ special case."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-EXPONENT-ASSUMED-TO-PRODUCE-ZERO | Believing $a^0=0$, confusing the exponent's value (zero) with the resulting output (which is actually 1) | Foundational |
| MC-2 | ZERO-TO-THE-ZERO-ASSUMED-COVERED-BY-THE-RULE | Applying $a^0=1$ to the case $a=0$ without recognizing this specific case requires separate treatment | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Zero Exponent Assumed to Produce Zero") → P41 (detect: ask for $6^0$ and check for a "0" answer) → P64 (conceptual shift: re-derive via the quotient rule, connecting to the "nonzero divided by itself is 1" fact explicitly).
- **B02 (targets MC-2)**: P27 ("Zero to the Zero Assumed Covered by the Rule") → P41 (detect: ask for $0^0$ and check whether "1" is given without qualification) → P64 (conceptual shift: attempt the quotient-rule derivation with $a=0$, showing it breaks down due to division by zero).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.exponent-rules`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.negative-exponent` (a sibling special-case exponent rule, also derivable from the quotient rule).

## Component 8 — Teaching Notes

- estimated_hours = 1 and bloom = remember reflect that this concept is a quick, high-precision fact, though its DERIVATION (LO2) gives it genuine conceptual grounding beyond rote memorization.
- MC-1 was ranked most severe because it produces a completely wrong numerical result that can propagate silently through much larger simplification problems involving zero exponents as sub-terms.
- The interest-rate transfer probe was deliberately designed to connect this abstract rule to a realistic formula context (compound interest calculations commonly involve exponent-zero edge cases), while part (b) tests whether the nonzero-base requirement (MC-2) is recognized as a genuine constraint, not just a footnote.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.exponent-rules`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
