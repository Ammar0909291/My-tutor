# Teaching Blueprint: Vieta's Formulas (`math.alg.vietas-formulas`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.vietas-formulas` |
| name | Vieta's Formulas |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.polynomial-roots` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Relationships between the coefficients of a polynomial and symmetric functions of its roots; e.g., for ax²+bx+c, the sum of roots is −b/a and product is c/a.

 |

## Component 1 — Learning Objectives

- LO1: For a quadratic $ax^2+bx+c$, state the sum of roots as $-b/a$ and the product of roots as $c/a$, and use these to answer questions about the roots WITHOUT solving the quadratic directly.
- LO2: Extend Vieta's formulas to a CUBIC $ax^3+bx^2+cx+d$, correctly stating the sum of roots, sum of pairwise products, and product of all three roots.
- LO3: Use Vieta's formulas in REVERSE — given desired root properties (e.g. a specific sum and product), construct a polynomial having those roots.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial-roots` (what roots are) — Vieta's formulas connect a polynomial's COEFFICIENTS directly to symmetric functions of its roots, without needing to find the roots individually.

## Component 3 — Core Explanation

**Vieta's formulas** relate a polynomial's coefficients to symmetric functions of its roots. For a QUADRATIC $ax^2+bx+c=0$ with roots $r_1,r_2$: sum of roots $r_1+r_2=-\frac{b}{a}$; product of roots $r_1r_2=\frac{c}{a}$.

For a CUBIC $ax^3+bx^2+cx+d=0$ with roots $r_1,r_2,r_3$: sum $r_1+r_2+r_3=-\frac{b}{a}$; sum of pairwise products $r_1r_2+r_1r_3+r_2r_3=\frac{c}{a}$; product $r_1r_2r_3=-\frac{d}{a}$. Note the ALTERNATING sign pattern as the degree of the symmetric function increases.

These relationships allow answering QUESTIONS about roots (sums, products, certain combinations) directly from the coefficients — no need to actually SOLVE for the individual root values. They also work in REVERSE: given target root properties, a matching polynomial can be constructed.

## Component 4 — Worked Examples

**Example 1 (LO1 — quadratic case, breaking MC-1)**: For $2x^2-7x+3=0$: sum of roots $=-\frac{-7}{2}=\frac{7}{2}$; product of roots $=\frac{3}{2}$. A common error drops or mishandles the leading coefficient $a$, computing the sum as simply $-b=7$ (forgetting to divide by $a=2$) or the product as simply $c=3$ — BOTH formulas require dividing by $a$, not just using $b$ and $c$ directly, especially when $a\ne1$.

**Example 2 (LO2 — cubic case with sign pattern, breaking MC-2)**: For $x^3-6x^2+11x-6=0$ (with $a=1$): sum of roots $=-\frac{-6}{1}=6$; sum of pairwise products $=\frac{11}{1}=11$; product of roots $=-\frac{-6}{1}=6$. (Verify: this factors as $(x-1)(x-2)(x-3)=0$, roots $1,2,3$: sum $=1+2+3=6$ ✓, pairwise products $=1\times2+1\times3+2\times3=2+3+6=11$ ✓, product $=1\times2\times3=6$ ✓.) A common error misapplies the alternating sign pattern, e.g. using a NEGATIVE sign for the product of three roots regardless of the actual coefficient signs, rather than correctly tracking $-\frac{d}{a}$'s sign based on $d$ and $a$'s actual values.

**Example 3 (LO3 — constructing a polynomial from desired root properties)**: Construct a quadratic whose roots sum to $5$ and multiply to $6$. Using Vieta's formulas in reverse: if sum $=-\frac{b}{a}=5$ and product $=\frac{c}{a}=6$, choosing $a=1$ for simplicity: $b=-5$, $c=6$, giving $x^2-5x+6=0$ (verify: factors as $(x-2)(x-3)$, roots $2,3$: sum $=5$ ✓, product $=6$ ✓).

## Component 5 — Teaching Actions

### Teaching Action A01 — Quadratic Formulas: Always Divide by a (Primitive P06: Contrast Pair)

Work Example 1's correct computation ($\frac72$ and $\frac32$) against the flawed version that forgets to divide by $a$ ($7$ and $3$), showing the discrepancy directly. State the rule: "sum of roots is $-b/a$, product is $c/a$ — ALWAYS divide by the leading coefficient, especially when $a\ne1$."

- **MC-1 hook**: this directly targets MC-1 (forgetting to divide by the leading coefficient $a$).

### Teaching Action A02 — Cubic Case: Track the Alternating Sign Pattern Carefully (Primitive P64: Conceptual Shift)

Work Example 2 in full, explicitly verifying each Vieta formula against the polynomial's actual factored roots, grounding the sign pattern in a concrete, checkable case rather than asking for blind memorization.

- **MC-2 hook**: this directly targets MC-2 (misapplying the alternating sign pattern based on a fixed rule rather than the actual coefficient values).

### Teaching Action A03 — Working in Reverse: From Root Properties to a Polynomial (Primitive P11: Representation Shift)

Work Example 3, explicitly reversing the direction of Vieta's formulas — starting from desired sum/product values and solving BACKWARD for the coefficients — reinforcing that the relationship works both ways.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For $3x^2+5x-2=0$, find the sum and product of roots using Vieta's formulas.
  2. For $x^3+2x^2-5x-6=0$, find the sum of roots, sum of pairwise products, and product of roots.
  3. Construct a quadratic whose roots sum to $-4$ and multiply to $3$.
  4. Given that a quadratic's roots have sum $10$ and product $21$, determine the roots WITHOUT using the quadratic formula (hint: find two numbers with this sum and product directly).
- **P76 (Transfer Probe, mode = independence)**: "An economist models a supply-demand equilibrium with a quadratic $2x^2-9x+k=0$ where $x$ represents price and $k$ is an unknown market parameter. Market research indicates the two equilibrium prices should sum to exactly 4.5. (a) Use Vieta's formulas to verify whether the given quadratic's structure (specifically, its $a$ and $b$ coefficients) is ALREADY consistent with this sum requirement, without needing to know $k$. (b) If the economist ALSO learns the product of the two equilibrium prices should be 5, use this information to solve for the unknown parameter $k$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEADING-COEFFICIENT-DIVISION-OMITTED-IN-VIETAS-FORMULAS | Computing sum/product of roots as $-b$ and $c$ directly, forgetting to divide by the leading coefficient $a$ | Foundational |
| MC-2 | CUBIC-VIETAS-SIGN-PATTERN-MISAPPLIED | Applying the alternating sign pattern of cubic Vieta's formulas incorrectly, not tracking the actual signs of the coefficients involved | Foundational |
| MC-3 | VIETAS-FORMULAS-REVERSE-DIRECTION-NOT-RECOGNIZED | Not recognizing that Vieta's formulas can be used in reverse (from desired root properties to constructing a matching polynomial), attempting a full root-solving approach unnecessarily | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Leading Coefficient Division Omitted") → P41 (detect: present Example 1 and check whether $a$ is included in the division) → P64 (conceptual shift: re-derive the formulas from the factored form $a(x-r_1)(x-r_2)=ax^2-a(r_1+r_2)x+ar_1r_2$, matching coefficients explicitly to show WHY the division by $a$ is structurally necessary).
- **B02 (targets MC-2)**: P27 ("Cubic Vieta's Sign Pattern Misapplied") → P41 (detect: present Example 2 and check the sign used for the product-of-roots term) → P64 (conceptual shift: re-verify against the factored/known-root case directly, confirming each formula's sign matches the actual computed values).
- **B03 (targets MC-3)**: P27 ("Vieta's Formulas Reverse Direction Not Recognized") → P41 (detect: present Example 3's construction task and check whether a full quadratic-formula approach is unnecessarily attempted) → P64 (conceptual shift: re-derive directly from the reverse relationship, substituting the given sum/product values straight into $-b/a$ and $c/a$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial-roots`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept spans both the quadratic and cubic cases, plus the genuinely distinct reverse-direction application (LO3), each requiring separate practice.
- MC-1 was ranked most severe because it produces a wrong answer that's especially easy to make when $a=1$ happens to work in earlier practice problems, then silently fails once a non-unit leading coefficient appears — a classic "worked until it didn't" pattern.
- The economics transfer probe was deliberately structured with TWO parts requiring different directions of Vieta's-formula reasoning (verification in part (a), reverse-construction in part (b)) to test both directions of the relationship within one coherent applied scenario.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.polynomial-roots`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
