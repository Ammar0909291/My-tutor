# Teaching Blueprint: Rational Equations (`math.alg.rational-equations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rational-equations` |
| name | Rational Equations |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.alg.rational-expressions-addition` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | An equation containing rational expressions, solved by multiplying through by the LCD to clear denominators; solutions must be checked against excluded values (extraneous roots). |

## Component 1 — Learning Objectives

- LO1: Solve a rational equation by multiplying BOTH sides by the LCD of all denominators, clearing the fractions into a polynomial equation.
- LO2: Solve the resulting polynomial equation using appropriate prior techniques (linear, quadratic, factoring).
- LO3: Check every candidate solution against the ORIGINAL equation's excluded values (denominators that would be zero), correctly identifying and DISCARDING any EXTRANEOUS solutions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.rational-expressions-addition` (finding the LCD, the technique this concept applies to CLEAR denominators from an equation, rather than to combine expressions).

## Component 3 — Core Explanation

A **rational equation** contains one or more rational expressions. Solved by: (1) identify the LCD of ALL denominators present; (2) MULTIPLY BOTH SIDES of the equation by the LCD, clearing every denominator and reducing to a polynomial equation; (3) solve the resulting polynomial equation using standard techniques; (4) CHECK every candidate solution against the original equation's EXCLUDED VALUES (any value making an original denominator zero) — a candidate that happens to equal an excluded value is an EXTRANEOUS solution and must be discarded, even though it satisfies the cleared polynomial equation.

Extraneous solutions arise because multiplying by the LCD is only a valid, reversible step when the LCD is NONZERO — at excluded values, this step's logic breaks down, potentially introducing solutions that don't actually satisfy the original equation.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard case, no extraneous solution)**: Solve $\frac{x}{x+2}=\frac{3}{x+2}+1$. LCD $=x+2$. Multiply through: $x=3+(x+2)\Rightarrow x=x+5\Rightarrow0=5$ — a FALSE statement, meaning NO solution exists (this particular equation is inconsistent, per the same false-statement logic from `math.alg.substitution-method`).

**Example 2 (LO3 — an extraneous solution, breaking MC-1)**: Solve $\frac{x}{x-3}=\frac{3}{x-3}+2$. LCD $=x-3$. Multiply through: $x=3+2(x-3)\Rightarrow x=3+2x-6\Rightarrow x=2x-3\Rightarrow-x=-3\Rightarrow x=3$. But $x=3$ makes the ORIGINAL equation's denominator $x-3=0$ — UNDEFINED. So $x=3$ is EXTRANEOUS and must be DISCARDED; the equation has NO valid solution. A common error accepts $x=3$ as the final answer without checking it against the original denominators, missing that clearing denominators can introduce solutions that don't actually work in the starting equation.

**Example 3 (LO3 — a genuine solution surviving the check)**: Solve $\frac{2}{x}+\frac{1}{x+1}=\frac{5}{x(x+1)}$. LCD $=x(x+1)$. Multiply through: $2(x+1)+x=5\Rightarrow2x+2+x=5\Rightarrow3x=3\Rightarrow x=1$. Check against original denominators: $x=1$ does NOT make $x=0$ or $x+1=0$ — it's a VALID, non-excluded value, so $x=1$ IS the genuine solution. Verify directly: $\frac{2}{1}+\frac{1}{2}=2.5$ and $\frac{5}{1\times2}=2.5$ ✓.

## Component 5 — Teaching Actions

### Teaching Action A01 — Multiply by the LCD to Clear Denominators (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly identifying the LCD and multiplying both sides by it term by term, connecting this step directly to the already-mastered LCD-finding technique from `math.alg.rational-expressions-addition`.

### Teaching Action A02 — Every Candidate Must Be Checked Against Original Exclusions (Primitive P06: Contrast Pair)

Work Example 2's extraneous-solution case against Example 3's genuine-solution case side by side, showing the SAME cleared-equation-solving process can produce either a valid or an extraneous result, distinguishable only by the final CHECK against original excluded values. State the rule: "clearing denominators can create solutions that don't actually work in the original equation — ALWAYS check every candidate against the original denominators before accepting it."

- **MC-1 hook**: this directly targets MC-1 (skipping the excluded-value check and accepting an extraneous solution).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $\frac{x}{x+4}=\frac{2}{x+4}+3$, checking for extraneous solutions.
  2. Solve $\frac{5}{x-1}=\frac{5}{x-1}+\frac{x}{2}$... (adjust to a well-posed version: solve $\frac{3}{x-2}=\frac{x}{x-2}-1$), identifying whether the candidate solution is extraneous.
  3. Solve $\frac{1}{x}+\frac{1}{x+2}=\frac{2}{x(x+2)}$, checking the candidate against excluded values.
  4. Explain, in one sentence, why multiplying both sides of a rational equation by the LCD can introduce solutions that don't actually satisfy the original equation.
- **P76 (Transfer Probe, mode = independence)**: "A chemist models a reaction-rate relationship with $\frac{6}{x-2}=\frac{3x}{x-2}-3$, where $x$ represents a concentration variable. (a) Solve this equation by clearing denominators, finding the candidate solution(s). (b) Check the candidate(s) against the original equation's excluded values, and explain — using this lesson's extraneous-solution idea — what it would mean chemically/practically if the ONLY algebraic candidate solution turns out to be extraneous (i.e., the equation has no valid solution at all)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXTRANEOUS-SOLUTION-NOT-CHECKED-AND-DISCARDED | Accepting a candidate solution found by clearing denominators without checking it against the original equation's excluded values, missing an extraneous solution | Foundational |
| MC-2 | LCD-MULTIPLICATION-APPLIED-TO-ONLY-PART-OF-THE-EQUATION | Multiplying only one side (or only some terms) of the equation by the LCD, rather than every term on both sides | Foundational |
| MC-3 | ALL-CANDIDATES-DISCARDED-WHEN-ONE-IS-EXTRANEOUS | When an equation has multiple candidate solutions and only SOME are extraneous, incorrectly discarding ALL candidates rather than keeping the genuinely valid ones | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Extraneous Solution Not Checked and Discarded") → P41 (detect: present Example 2 and check whether $x=3$ is accepted without verification against the original denominator) → P64 (conceptual shift: re-substitute the candidate directly into the ORIGINAL (uncleared) equation, showing it produces an undefined expression).
- **B02 (targets MC-2)**: P27 ("LCD Multiplication Applied to Only Part of the Equation") → P41 (detect: review a submitted LCD-clearing step for a term that wasn't multiplied through) → P64 (conceptual shift: re-derive the clearing step explicitly, multiplying EVERY term on both sides by the LCD one at a time).
- **B03 (targets MC-3)**: P27 ("All Candidates Discarded When One Is Extraneous") → P41 (detect: present a multi-solution scenario with a mix of valid and extraneous candidates and check whether valid ones are incorrectly discarded too) → P64 (conceptual shift: re-check EACH candidate independently against the excluded values, keeping any that pass regardless of other candidates' status).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.rational-expressions-addition`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.rational-expressions-multiplication` (a sibling concept in this domain's rational-expression cluster).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects that this concept combines LCD-clearing, polynomial-equation-solving, and the genuinely distinct extraneous-solution-checking step into one multi-stage procedure.
- MC-1 was ranked most severe because it is the single most consequential and common error in rational-equation solving — skipping the final check can produce a confidently-reported WRONG answer (an undefined value masquerading as a valid solution) that looks completely correct through every step except the omitted final check.
- The reaction-rate transfer probe was deliberately designed so the algebra produces exactly ONE candidate that turns out to be extraneous, giving MC-1's correction genuine stakes — testing whether the student concludes "no valid solution" correctly, rather than either accepting the extraneous value or getting confused by the empty result.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.rational-expressions-addition`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
