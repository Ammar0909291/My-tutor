# Teaching Blueprint: Divisor and Dividend (`math.arith.divisor-dividend`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.divisor-dividend` |
| name | Divisor and Dividend |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.arith.division` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — pure vocabulary labeling of an already-understood operation |
| description (KG) | In a ÷ b = q, a is the dividend, b is the divisor, and q is the quotient; standard vocabulary for the components of a division expression.

 |

## Component 1 — Learning Objectives

- LO1: Given a division expression $a\div b=q$, correctly name $a$ as the **dividend**, $b$ as the **divisor**, and $q$ as the **quotient**.
- LO2: Correctly identify the dividend and divisor from division written in any standard notation ($a\div b$, $\frac{a}{b}$, or long-division bracket form), where their visual position differs.
- LO3: Use this vocabulary correctly and precisely when describing or discussing a division procedure, without swapping the terms.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.division` (the operation itself) — this concept supplies the standard NAMES for division's components, not new computational content.

## Component 3 — Core Explanation

In the division $a\div b=q$ (read "$a$ divided by $b$ equals $q$"): $a$ is the **dividend** (the quantity being divided up), $b$ is the **divisor** (the quantity dividing it, i.e. the size of each group or the number of groups), and $q$ is the **quotient** (the result). This vocabulary is used consistently across every notation for division, even though the dividend and divisor appear in different visual positions depending on the notation used.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic naming)**: In $20\div4=5$: dividend $=20$, divisor $=4$, quotient $=5$.

**Example 2 (LO2 — notation-independent identification, breaking MC-1)**: The SAME division can be written as $20\div4$, $\frac{20}{4}$, or in long-division bracket form $4\overline{)20}$. In fraction notation $\frac{20}{4}$, the dividend (20) is on TOP and the divisor (4) is on the BOTTOM — the reverse visual position from $20\div4$'s left-to-right order. In long-division bracket form, the divisor (4) sits OUTSIDE the bracket and the dividend (20) sits INSIDE — yet another arrangement. In every case, dividend and divisor refer to the SAME roles (the quantity being split, and the size/count doing the splitting) regardless of where they appear on the page.

**Example 3 (LO3 — precise vocabulary use)**: Describing "$15\div3=5$" precisely: "the dividend, 15, is divided by the divisor, 3, giving a quotient of 5" — NOT "the divisor 15 is divided by the dividend 3," which swaps the two roles and describes a different (and, taken literally, differently-computed) statement.

## Component 5 — Teaching Actions

### Teaching Action A01 — Naming the Three Roles (Primitive P11: Representation Shift)

Present Example 1's expression with each term labeled directly beneath it (dividend, divisor, quotient), then have the student label several new division expressions themselves.

- **MC-1 hook**: present the SAME division in fraction notation ($\frac{20}{4}$) and ask which number is the dividend (revealing MC-1: assuming the dividend is always whichever number appears FIRST or LEFTMOST in whatever notation is shown, rather than tracking the actual role each number plays).

### Teaching Action A02 — The Roles Stay Fixed Across Notations (Primitive P06: Contrast Pair)

Display the same division ($20\div4=5$) in all three notations (÷, fraction, long-division bracket) side by side, with dividend and divisor labeled consistently in each despite their different visual positions. State the rule: "always ask 'which number is being split up?' (dividend) and 'which number tells us how to split it?' (divisor) — never rely on left/right or top/bottom position alone."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. In $48\div6=8$, name the dividend, divisor, and quotient.
  2. In $\frac{35}{7}$, identify the dividend and divisor, noting their position in this notation.
  3. In the long-division bracket form $9\overline{)72}$, identify which number is the divisor and which is the dividend.
  4. Rewrite the statement "the divisor 6 divided by the dividend 42 gives 7" with the terms corrected, and state the correct resulting expression.
- **P76 (Transfer Probe, mode = independence)**: "A recipe book states a ratio as '$\frac{\text{total servings}}{\text{servings per batch}}$ = number of batches needed.' If a chef needs 60 servings and each batch makes 12 servings, (a) identify which of 60 and 12 plays the role of the dividend and which plays the divisor in this calculation, and compute the number of batches. (b) Explain why, even though this problem is phrased with a fraction bar rather than a ÷ symbol, the same dividend/divisor vocabulary from this lesson still applies correctly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIVIDEND-IDENTIFIED-BY-POSITION-NOT-ROLE | Assuming the dividend is always whichever number is leftmost or first-written, rather than tracking which number is actually being divided regardless of notation | Foundational |
| MC-2 | DIVISOR-AND-DIVIDEND-TERMS-SWAPPED-IN-SPEECH | Using "divisor" and "dividend" interchangeably or backwards when verbally or in writing describing a division procedure | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Dividend Identified by Position Not Role") → P41 (detect: present Example 2's fraction-notation case and check whether the TOP or the LEFT-positioned analogy is used to guess the dividend) → P64 (conceptual shift: re-display all three notations side by side, tracing the SAME quantity (20, the one being split) across each visual arrangement).
- **B02 (targets MC-2)**: P27 ("Divisor/Dividend Terms Swapped in Speech") → P41 (detect: ask the student to describe a division procedure aloud or in writing; check for swapped terminology) → P64 (conceptual shift: re-practice Example 3's precise phrasing, explicitly naming "the dividend is the one BEING divided" as the anchor rule).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.division`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 1 and bloom = remember reflect this concept's nature as pure vocabulary standardization — no new computational skill is introduced beyond what `math.arith.division` already established.
- MC-1 was ranked more significant than MC-2 because it can cause a genuine COMPUTATIONAL error (dividing in the wrong direction) if a student later has to set up a division from a word problem or an unfamiliar notation, whereas MC-2 is typically a communication-only slip that doesn't by itself change a computed answer.
- The recipe/batch transfer probe was deliberately chosen to require identifying dividend/divisor roles from a PHRASED ratio relationship rather than a bare arithmetic expression, testing whether the vocabulary transfers to realistic problem setups, not just notation-reading.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.division`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: vocabulary labeling of an understood operation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
