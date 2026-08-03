# Teaching Blueprint: Rational Inequalities (`math.alg.rational-inequality`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rational-inequality` |
| name | Rational Inequalities |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.alg.rational-expressions`, `math.alg.polynomial-inequality` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — sign-chart number-line diagrams before symbolic interval notation |
| description (KG) | Inequality of the form p(x)/q(x) > 0 (with q ≠ 0); solved using a sign chart based on zeros of p and q.

 |

## Component 1 — Learning Objectives

- LO1: Solve a rational inequality $\frac{p(x)}{q(x)}>0$ (or $<,\ge,\le$) by finding the zeros of BOTH the numerator $p(x)$ AND the denominator $q(x)$, constructing a sign chart using ALL these critical points.
- LO2: Correctly determine endpoint inclusion: numerator zeros MAY be included (if the inequality is non-strict), but denominator zeros are ALWAYS EXCLUDED (undefined there), regardless of the inequality's strictness.
- LO3: Recognize that a rational inequality generally CANNOT be solved by simply cross-multiplying by the denominator (as one might with an equation), since the denominator's SIGN (unknown, since it depends on $x$) would need to be known to determine whether the inequality direction flips.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.rational-expressions` (what a rational expression is, and its domain restrictions) and `math.alg.polynomial-inequality` (the sign-chart technique this concept extends to include the denominator's zeros).

## Component 3 — Core Explanation

A **rational inequality** $\frac{p(x)}{q(x)}>0$ (or $<,\ge,\le$) is solved by: (1) find the zeros of BOTH $p(x)$ (numerator) and $q(x)$ (denominator) — together, these are the CRITICAL POINTS dividing the number line into intervals; (2) construct a sign chart testing a point in each interval, determining the SIGN of the full rational expression there; (3) identify intervals satisfying the required sign.

**Endpoint inclusion differs by source**: a NUMERATOR zero makes the expression equal ZERO — included for non-strict inequalities ($\le,\ge$), excluded for strict ones ($<,>$), just like polynomial inequalities. A DENOMINATOR zero makes the expression UNDEFINED — ALWAYS excluded, regardless of the inequality's strictness (an undefined expression can never satisfy any inequality).

Critically, rational inequalities generally CANNOT be solved by cross-multiplying the denominator to the other side (as with equations), because the denominator's SIGN is unknown (it depends on $x$) — multiplying an inequality by a negative quantity FLIPS its direction, and without knowing the denominator's sign in advance, this step is unsafe.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard case)**: Solve $\frac{x-3}{x+2}>0$. Critical points: numerator zero at $x=3$, denominator zero at $x=-2$. Test $x=-3$: $\frac{-3-3}{-3+2}=\frac{-6}{-1}=6>0$ ✓. Test $x=0$: $\frac{0-3}{0+2}=\frac{-3}{2}<0$ ✗. Test $x=4$: $\frac{4-3}{4+2}=\frac{1}{6}>0$ ✓. Solution: $(-\infty,-2)\cup(3,\infty)$ — note $x=-2$ is EXCLUDED (denominator zero, undefined) and $x=3$ is also EXCLUDED (strict inequality).

**Example 2 (LO2 — denominator zero always excluded, even for non-strict inequalities, breaking MC-1)**: Solve $\frac{x-3}{x+2}\ge0$. Using the same sign chart as Example 1: solution is $(-\infty,-2)\cup[3,\infty)$ — note $x=3$ is NOW INCLUDED (non-strict inequality, numerator zero), but $x=-2$ remains EXCLUDED regardless — the denominator zero can NEVER be included, no matter how the inequality's strictness changes. A common error treats the non-strict symbol ($\ge$) as if it includes BOTH critical points, incorrectly including $x=-2$ as well.

**Example 3 (LO3 — cross-multiplication trap, breaking MC-2)**: Solve $\frac{x+1}{x-2}>1$. A common FLAWED approach cross-multiplies directly: "$x+1>x-2$" (treating the denominator as if it were safely positive), simplifying to "$1>-2$" — always true, incorrectly suggesting ALL $x\ne2$ work. This is WRONG because $(x-2)$'s sign is unknown — if $x-2<0$, multiplying by it would need to FLIP the inequality direction, which this approach ignores. The CORRECT approach instead moves everything to one side first: $\frac{x+1}{x-2}-1>0\Rightarrow\frac{x+1-(x-2)}{x-2}>0\Rightarrow\frac{3}{x-2}>0$ — now a proper rational inequality solvable by the sign-chart method: since the numerator (3) is always positive, this holds exactly when $x-2>0$, i.e. $x>2$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Find Critical Points from BOTH Numerator and Denominator (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly identifying zeros from both $p(x)$ and $q(x)$ before constructing the sign chart, reinforcing that BOTH sources of critical points matter.

### Teaching Action A02 — Denominator Zeros Are Always Excluded (Primitive P06: Contrast Pair)

Work Example 2, contrasting the numerator zero's inclusion-dependent-on-strictness against the denominator zero's UNCONDITIONAL exclusion, explicitly re-checking both endpoints for the non-strict version. State the rule: "a numerator zero's inclusion depends on the inequality symbol; a denominator zero is NEVER included — the expression is simply undefined there, full stop."

- **MC-1 hook**: this directly targets MC-1 (including a denominator zero for a non-strict inequality).

### Teaching Action A03 — Never Cross-Multiply an Inequality by an Unknown-Sign Denominator (Primitive P06: Contrast Pair, second pairing)

Work Example 3's flawed cross-multiplication attempt against the correct move-everything-to-one-side approach, showing the flawed method produces a nonsensical "always true" result that doesn't match the actual, more restrictive solution. State the rule: "NEVER cross-multiply a rational inequality by its denominator directly — instead, move everything to one side, combine into a single fraction, and use a sign chart on the WHOLE rational expression."

- **MC-2 hook**: this directly targets MC-2 (cross-multiplying a rational inequality as if solving an equation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $\frac{x+4}{x-1}<0$ using a sign chart.
  2. Solve $\frac{x-5}{x+3}\le0$, correctly handling both endpoints.
  3. Solve $\frac{2}{x-3}>1$, first moving everything to one side (do NOT cross-multiply directly).
  4. Explain, in one sentence, why cross-multiplying a rational inequality by its denominator directly is unsafe.
- **P76 (Transfer Probe, mode = independence)**: "A chemistry concentration ratio is modeled by $\frac{x-4}{x+1}\ge2$, where $x$ represents a reagent quantity. (a) Move everything to one side, combine into a single rational expression, and solve using a sign chart — do NOT cross-multiply directly. (b) A lab technician instead cross-multiplies directly, writing 'x-4 ≥ 2(x+1)' and solving from there — explain, using this lesson's cross-multiplication trap, why this shortcut could give a wrong final answer, and what specifically about the denominator makes this risky."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DENOMINATOR-ZERO-INCLUDED-FOR-NON-STRICT-INEQUALITY | Including a denominator zero as a valid solution point when the inequality is non-strict, rather than recognizing it must always be excluded (undefined) | Foundational |
| MC-2 | RATIONAL-INEQUALITY-CROSS-MULTIPLIED-DIRECTLY | Cross-multiplying a rational inequality by its denominator as if solving an equation, ignoring that the denominator's unknown sign could flip the inequality direction | Foundational |
| MC-3 | SIGN-CHART-CRITICAL-POINTS-MISSING-DENOMINATOR-ZEROS | Constructing a sign chart using only the numerator's zeros, missing the denominator's zeros as additional required critical points | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Denominator Zero Included for Non-Strict Inequality") → P41 (detect: present Example 2 and check whether $x=-2$ is incorrectly included) → P64 (conceptual shift: re-check that the expression is genuinely UNDEFINED (not just zero) at the denominator's zero, confirming it can never satisfy any inequality).
- **B02 (targets MC-2)**: P27 ("Rational Inequality Cross-Multiplied Directly") → P41 (detect: present Example 3 and check whether direct cross-multiplication is attempted) → P64 (conceptual shift: re-derive using the move-to-one-side approach, comparing the (wrong) cross-multiplied result against the (correct) sign-chart result to show the discrepancy).
- **B03 (targets MC-3)**: P27 ("Sign Chart Critical Points Missing Denominator Zeros") → P41 (detect: review a submitted sign chart for missing denominator-zero critical points) → P64 (conceptual shift: re-derive the full critical-point list explicitly, checking BOTH $p(x)=0$ and $q(x)=0$ separately before constructing the chart).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.rational-expressions`, `math.alg.polynomial-inequality`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.rational-equations` (the equation counterpart, where cross-multiplication IS safe after appropriate domain checks).

## Component 8 — Teaching Notes

- estimated_hours = 6 (the highest in Wave 2) reflects that this concept combines `math.alg.polynomial-inequality`'s sign-chart technique with genuinely new complications (denominator zeros, the cross-multiplication trap) specific to rational expressions.
- MC-2 was ranked most severe because it represents a dangerous OVER-GENERALIZATION from equation-solving (where cross-multiplication is safe) to inequality-solving (where it generally is not) — a natural but consequential error given how similar the two contexts superficially look.
- The chemistry transfer probe's part (b) was deliberately designed to require explaining WHY the cross-multiplication shortcut is risky (not just identifying it as wrong), testing genuine understanding of the underlying sign-uncertainty issue rather than rote avoidance of a flagged technique.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.rational-expressions`, `math.alg.polynomial-inequality`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: sign-chart diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
