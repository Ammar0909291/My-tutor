# Teaching Blueprint: Polynomial Inequalities (`math.alg.polynomial-inequality`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.polynomial-inequality` |
| name | Polynomial Inequalities |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.alg.polynomial-roots`, `math.alg.inequality` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — sign-chart number-line diagrams before symbolic interval notation |
| description (KG) | Inequality p(x) > 0 (or <, ≥, ≤) solved by finding roots, constructing a sign chart, and identifying intervals where the polynomial has the required sign.

 |

## Component 1 — Learning Objectives

- LO1: Solve a polynomial inequality $p(x)>0$ (or $<,\ge,\le$) by finding the polynomial's ROOTS, constructing a SIGN CHART (testing a point in each interval between consecutive roots), and identifying which intervals satisfy the required sign.
- LO2: Correctly determine whether ENDPOINTS (the roots themselves) are INCLUDED or EXCLUDED based on whether the inequality is strict ($<,>$) or non-strict ($\le,\ge$).
- LO3: Handle a REPEATED root correctly — recognizing that the polynomial's sign does NOT change across a root of EVEN multiplicity (it touches zero but stays the same sign on both sides), unlike a root of odd multiplicity (where the sign genuinely flips).

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial-roots` (finding a polynomial's roots) and `math.alg.inequality` (the general inequality relations this concept solves for).

## Component 3 — Core Explanation

A **polynomial inequality** $p(x)>0$ (or $<,\ge,\le$) is solved by: (1) find all ROOTS of $p(x)$ (setting $p(x)=0$); (2) these roots divide the number line into INTERVALS; (3) construct a SIGN CHART by testing one representative point from EACH interval, determining $p(x)$'s sign there; (4) identify which intervals satisfy the required sign, forming the solution set.

**Endpoint inclusion**: for STRICT inequalities ($<,>$), the roots themselves are EXCLUDED (open interval endpoints, since $p(x)=0$ doesn't satisfy $p(x)>0$ or $p(x)<0$). For NON-STRICT inequalities ($\le,\ge$), the roots ARE included (closed endpoints, since $p(x)=0$ does satisfy $p(x)\ge0$ or $p(x)\le0$).

**Multiplicity matters**: at a root of ODD multiplicity (1, 3, 5, ...), the polynomial's sign genuinely FLIPS across that root. At a root of EVEN multiplicity (2, 4, ...), the polynomial TOUCHES zero but does NOT change sign — it stays the same sign on both sides.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — standard sign-chart construction)**: Solve $(x-2)(x+1)>0$. Roots: $x=2,-1$, dividing the line into three intervals: $(-\infty,-1)$, $(-1,2)$, $(2,\infty)$. Test $x=-2$: $(-2-2)(-2+1)=(-4)(-1)=4>0$ ✓. Test $x=0$: $(0-2)(0+1)=(-2)(1)=-2<0$ ✗. Test $x=3$: $(3-2)(3+1)=(1)(4)=4>0$ ✓. Solution: $(-\infty,-1)\cup(2,\infty)$ — strict inequality, so endpoints EXCLUDED (open intervals, matching the parentheses used).

**Example 2 (LO2 — non-strict inequality includes endpoints, breaking MC-1)**: Solve $(x-2)(x+1)\ge0$. Using the same sign chart as Example 1, the solution is $(-\infty,-1]\cup[2,\infty)$ — NOTE the endpoints are now INCLUDED (square brackets), since $x=-1$ and $x=2$ make $(x-2)(x+1)=0$, which DOES satisfy $\ge0$. A common error copies the same open-interval notation used for the strict version regardless of whether the actual inequality is strict or non-strict.

**Example 3 (LO3 — even multiplicity means no sign change, breaking MC-2)**: Solve $(x-3)^2(x+2)>0$. Roots: $x=3$ (multiplicity 2, EVEN) and $x=-2$ (multiplicity 1, odd). Test $x=-3$: $(-3-3)^2(-3+2)=(36)(-1)=-36<0$ ✗. Test $x=0$: $(0-3)^2(0+2)=(9)(2)=18>0$ ✓. Test $x=4$: $(4-3)^2(4+2)=(1)(6)=6>0$ ✓. Notice the sign STAYS POSITIVE across $x=3$ (both the $x=0$ and $x=4$ tests give positive results) — because $x=3$ has EVEN multiplicity, the polynomial touches zero there but doesn't flip sign. Solution: $(-2,3)\cup(3,\infty)$ — note $x=3$ itself is EXCLUDED (strict inequality) even though the sign doesn't change around it. A common error assumes the sign MUST flip at every root, incorrectly splitting the interval $(-2,\infty)$ as if $x=3$ were a genuine sign-change point, when testing both sides confirms it is not.

## Component 5 — Teaching Actions

### Teaching Action A01 — Find Roots, Test Each Interval (Primitive P64: Conceptual Shift)

Work Example 1 in full, constructing the sign chart explicitly with a number line, marking roots, and testing one point per interval — establishing the complete four-step process.

### Teaching Action A02 — Strict vs. Non-Strict Determines Endpoint Inclusion (Primitive P06: Contrast Pair)

Work Example 2 against Example 1, using the SAME sign chart but showing the different endpoint notation required by the non-strict inequality. State the rule: "the sign chart tells you WHICH intervals qualify; the inequality's strictness (< vs. ≤) tells you whether the boundary points themselves are included."

- **MC-1 hook**: this directly targets MC-1 (using the wrong endpoint notation for a non-strict inequality).

### Teaching Action A03 — Even Multiplicity: Sign Doesn't Flip (Primitive P06: Contrast Pair, second pairing)

Work Example 3, explicitly testing BOTH sides of the even-multiplicity root $x=3$ and showing the sign stays the same, contrasting against the odd-multiplicity root $x=-2$ where the sign genuinely flips. State the rule: "always TEST both sides of every root — don't assume the sign automatically flips; even-multiplicity roots are 'touch points,' not genuine sign-change points."

- **MC-2 hook**: this directly targets MC-2 (assuming every root causes a sign flip, regardless of multiplicity).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Solve $(x-4)(x+3)<0$ using a sign chart.
  2. Solve $(x-1)(x-5)\le0$, correctly including or excluding endpoints.
  3. Solve $(x+2)^2(x-1)<0$, correctly handling the even-multiplicity root.
  4. Explain, in one sentence, why a root of even multiplicity doesn't cause the polynomial's sign to flip.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs a beam's stress function $S(x)=(x-5)^2(x-10)$ to be NEGATIVE (indicating a safe compression range) over some range of the load variable $x$. (a) Find the roots of $S(x)$ and construct a sign chart to determine where $S(x)<0$. (b) A colleague assumes the sign must flip at BOTH roots (x=5 and x=10) and proposes an incorrect safe range as a result — explain, using this lesson's multiplicity discussion, why the sign chart around $x=5$ specifically needs closer inspection, and state the correct safe range."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ENDPOINT-INCLUSION-NOT-MATCHED-TO-INEQUALITY-STRICTNESS | Using the wrong open/closed endpoint notation, not matching the actual strictness of the given inequality | Foundational |
| MC-2 | SIGN-ASSUMED-TO-FLIP-AT-EVERY-ROOT-REGARDLESS-OF-MULTIPLICITY | Assuming the polynomial's sign changes at every root, missing that even-multiplicity roots don't cause a sign flip | Foundational |
| MC-3 | SIGN-CHART-TEST-POINT-CHOSEN-ON-A-ROOT | Accidentally choosing a test point that coincides with one of the roots (giving zero, uninformative about the surrounding interval's sign) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Endpoint Inclusion Not Matched to Inequality Strictness") → P41 (detect: present Example 2 and check whether open or closed interval notation is used) → P64 (conceptual shift: re-check whether the root value itself satisfies the ORIGINAL inequality (with equality), directly determining inclusion).
- **B02 (targets MC-2)**: P27 ("Sign Assumed to Flip at Every Root") → P41 (detect: present Example 3 and check whether $x=3$ is treated as a genuine sign-change point) → P64 (conceptual shift: re-test explicit points on both sides of the even-multiplicity root, confirming the sign doesn't actually change).
- **B03 (targets MC-3)**: P27 ("Sign Chart Test Point Chosen on a Root") → P41 (detect: review a submitted sign chart for a test point coinciding with a root) → P64 (conceptual shift: re-select a genuinely interior test point for each interval, strictly between consecutive roots).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial-roots`, `math.alg.inequality`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.rational-inequality` (a sibling concept extending this sign-chart technique to rational expressions).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects that this concept combines root-finding, systematic sign-chart construction, and TWO genuinely separate subtleties (strictness/endpoint-inclusion and multiplicity/sign-flip behavior) into one comprehensive procedure.
- MC-2 was ranked most severe alongside MC-1 because it represents a structural misunderstanding of WHY sign charts work at all (sign changes are tied to ODD-multiplicity crossings specifically, not roots in general) — a student who always assumes sign-flipping will get every even-multiplicity-root problem systematically wrong.
- The engineering transfer probe was deliberately designed with an even-multiplicity root embedded in a realistic stress-function scenario, giving MC-2's correction genuine practical stakes (an incorrect "safe range" conclusion) rather than remaining a purely abstract algebraic subtlety.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.polynomial-roots`, `math.alg.inequality`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
