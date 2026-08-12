# Teaching Blueprint: Rationalizing Denominators (`math.alg.rationalizing-denominators`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rationalizing-denominators` |
| name | Rationalizing Denominators |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.simplifying-radicals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Eliminating radicals from the denominator of a fraction by multiplying numerator and denominator by the conjugate or appropriate radical.

 |

## Component 1 — Learning Objectives

- LO1: Rationalize a denominator containing a SINGLE radical term by multiplying numerator and denominator by that SAME radical.
- LO2: Rationalize a denominator containing a BINOMIAL with a radical (e.g. $a+\sqrt b$) by multiplying numerator and denominator by its CONJUGATE ($a-\sqrt b$), using the difference-of-squares pattern to eliminate the radical.
- LO3: Recognize that multiplying by "the same thing over itself" (radical/radical or conjugate/conjugate) is equivalent to multiplying by 1, preserving the fraction's value while changing its FORM.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.simplifying-radicals` (radical manipulation this technique relies on).

## Component 3 — Core Explanation

**Rationalizing a denominator** eliminates radicals from the denominator of a fraction, producing an equivalent fraction with a RATIONAL (radical-free) denominator. For a SINGLE radical term denominator, multiply numerator and denominator by that SAME radical: $\frac{a}{\sqrt b}\times\frac{\sqrt b}{\sqrt b}=\frac{a\sqrt b}{b}$ (since $\sqrt b\times\sqrt b=b$).

For a BINOMIAL denominator containing a radical (e.g. $a+\sqrt b$), multiply by its CONJUGATE $a-\sqrt b$ instead: $(a+\sqrt b)(a-\sqrt b)=a^2-b$ (a difference of squares, per `math.alg.factoring-special`), eliminating the radical entirely from the denominator.

In BOTH cases, the technique works because multiplying by (radical/radical) or (conjugate/conjugate) is equivalent to multiplying by $1$ — the fraction's VALUE is unchanged, only its algebraic FORM.

## Component 4 — Worked Examples

**Example 1 (LO1 — single radical term, breaking MC-1)**: Rationalize $\frac{3}{\sqrt5}$. Multiply by $\frac{\sqrt5}{\sqrt5}$: $\frac{3\sqrt5}{\sqrt5\times\sqrt5}=\frac{3\sqrt5}{5}$. A common error multiplies by the WRONG radical (e.g. multiplying by $\sqrt3$ instead of $\sqrt5$, using the numerator's value rather than the denominator's radical) — the multiplier must always MATCH the denominator's own radical, not any other number in the expression.

**Example 2 (LO2 — conjugate for a binomial denominator, breaking MC-2)**: Rationalize $\frac{2}{3+\sqrt2}$. Multiply by the conjugate $\frac{3-\sqrt2}{3-\sqrt2}$: $\frac{2(3-\sqrt2)}{(3+\sqrt2)(3-\sqrt2)}=\frac{6-2\sqrt2}{9-2}=\frac{6-2\sqrt2}{7}$. A common error attempts to multiply by the radical alone (e.g. $\sqrt2/\sqrt2$) rather than the full conjugate, which does NOT eliminate the radical from a binomial denominator — only the conjugate's difference-of-squares structure accomplishes this.

**Example 3 (LO3 — verifying the value is unchanged)**: Verify $\frac{3}{\sqrt5}=\frac{3\sqrt5}{5}$ represent the SAME value numerically: $\frac{3}{\sqrt5}\approx\frac{3}{2.236}\approx1.342$; $\frac{3\sqrt5}{5}\approx\frac{3\times2.236}{5}\approx\frac{6.708}{5}\approx1.342$ — matching, confirming the rationalized form is genuinely EQUIVALENT, just rewritten with a rational denominator.

## Component 5 — Teaching Actions

### Teaching Action A01 — Single Radical: Multiply by That Same Radical Over Itself (Primitive P64: Conceptual Shift)

Work Example 1, explicitly identifying the denominator's radical and multiplying numerator/denominator by exactly that radical, reinforcing that the multiplier must match the denominator specifically.

- **MC-1 hook**: check whether the correct radical (matching the denominator, not any other number in the problem) is chosen as the multiplier.

### Teaching Action A02 — Binomial Denominator Needs the Conjugate, Not the Radical Alone (Primitive P06: Contrast Pair)

Work Example 2, contrasting the correct conjugate-multiplication approach against the flawed "multiply by the radical alone" attempt (which, when tried, would leave a radical STILL present in the denominator — demonstrable by direct attempt). State the rule: "for a binomial denominator with a radical term, ALWAYS use the conjugate — flipping the sign between the two terms — never just the radical alone."

- **MC-2 hook**: this directly targets MC-2 (attempting single-radical multiplication on a binomial denominator instead of using the conjugate).

### Teaching Action A03 — Verify: Multiplying by a Form of 1 Preserves Value (Primitive P11: Representation Shift)

Work Example 3's numerical verification, confirming the rationalized and original forms represent the identical value, grounding WHY this technique is valid (not just a formal manipulation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Rationalize $\frac{7}{\sqrt3}$.
  2. Rationalize $\frac{5}{2+\sqrt3}$ using the conjugate.
  3. Rationalize $\frac{4}{\sqrt7-1}$ using the conjugate.
  4. Explain, in one sentence, why multiplying numerator and denominator by the same quantity doesn't change the fraction's value.
- **P76 (Transfer Probe, mode = independence)**: "A physics formula for a wave's amplitude ratio includes the expression $\frac{1}{\sqrt2-1}$. (a) Rationalize this denominator using the conjugate. (b) A colleague instead tries multiplying numerator and denominator by $\sqrt2$ alone (not the full conjugate) — show what result this produces, and explain, using this lesson's distinction, why this attempt fails to fully rationalize the denominator."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | WRONG-RADICAL-USED-AS-MULTIPLIER | Multiplying by a radical that doesn't match the denominator's own radical, failing to properly rationalize | Foundational |
| MC-2 | CONJUGATE-NOT-USED-FOR-BINOMIAL-RADICAL-DENOMINATOR | Attempting to rationalize a binomial radical denominator by multiplying by the radical alone rather than the full conjugate | Foundational |
| MC-3 | CONJUGATE-SIGN-NOT-FLIPPED-CORRECTLY | When forming a conjugate, failing to flip only the sign between the two terms (e.g. flipping both signs, or the wrong one) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Wrong Radical Used as Multiplier") → P41 (detect: present Example 1 and check whether the multiplier matches the denominator's radical) → P64 (conceptual shift: re-identify the denominator's exact radical first, then multiply numerator and denominator by precisely that same radical).
- **B02 (targets MC-2)**: P27 ("Conjugate Not Used for Binomial Radical Denominator") → P41 (detect: present Example 2 and check whether the radical alone or the full conjugate is used) → P64 (conceptual shift: attempt the radical-alone approach directly, showing the radical remains in the denominator, then re-derive using the conjugate to show it disappears).
- **B03 (targets MC-3)**: P27 ("Conjugate Sign Not Flipped Correctly") → P41 (detect: review a submitted conjugate for an incorrect sign flip) → P64 (conceptual shift: re-state the conjugate rule precisely — "flip only the sign BETWEEN the two terms, keep each term's own value the same" — and re-derive).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.simplifying-radicals`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.factoring-special` (the difference-of-squares pattern this technique's conjugate step relies on).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept combines a straightforward single-radical case with a genuinely more demanding conjugate-based binomial case.
- MC-2 was ranked most severe alongside MC-1 because it represents a genuine misapplication of technique choice — the conjugate method exists SPECIFICALLY because the simpler single-radical multiplication doesn't work for binomial denominators, and recognizing this scope boundary is the concept's central skill.
- The wave-amplitude transfer probe's part (b) was deliberately designed to require DEMONSTRATING the failure of the wrong approach (not just avoiding it), directly testing whether the student understands WHY the conjugate is necessary, not merely that it's the "correct" memorized technique.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.simplifying-radicals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
