# Teaching Blueprint: Discriminant (`math.alg.discriminant`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.discriminant` |
| name | Discriminant |
| domain | Algebra |
| difficulty | proficient |
| bloom | analyze |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.alg.quadratic-formula` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The expression b² − 4ac: positive → two real roots, zero → one repeated root, negative → two complex roots.

 |

## Component 1 — Learning Objectives

- LO1: Compute the discriminant $b^2-4ac$ for a given quadratic $ax^2+bx+c=0$.
- LO2: Use the discriminant's SIGN to determine the NUMBER and TYPE of roots without fully solving the quadratic: positive → two distinct real roots; zero → one repeated real root; negative → two complex conjugate roots.
- LO3: Explain WHY the discriminant's sign determines root type, connecting directly to the quadratic formula's $\sqrt{b^2-4ac}$ term (a real number when non-negative, an imaginary number when negative).

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.quadratic-formula` ($x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$) — the discriminant is precisely the expression under that formula's square root.

## Component 3 — Core Explanation

The **discriminant** $\Delta=b^2-4ac$ of a quadratic $ax^2+bx+c=0$ determines the nature of its roots WITHOUT needing to fully apply the quadratic formula:

- $\Delta>0$: TWO DISTINCT REAL roots (the square root of a positive number is real and nonzero, giving two different values via $\pm$).
- $\Delta=0$: ONE REPEATED real root (the square root of zero is zero, so both $\pm$ branches coincide at the same value, $x=\frac{-b}{2a}$).
- $\Delta<0$: TWO COMPLEX CONJUGATE roots (the square root of a negative number is imaginary, giving a pair of complex roots of the form $p\pm qi$).

This works because the discriminant is EXACTLY the expression under the quadratic formula's radical — its sign directly determines whether that radical produces a real, zero, or imaginary result.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — positive discriminant)**: For $x^2-5x+6=0$: $\Delta=(-5)^2-4(1)(6)=25-24=1>0$ — two distinct real roots (indeed, $x=2,3$).

**Example 2 (LO2 — zero discriminant, breaking MC-1)**: For $x^2-6x+9=0$: $\Delta=(-6)^2-4(1)(9)=36-36=0$ — ONE repeated real root ($x=3$, appearing twice). A common error treats $\Delta=0$ as meaning "no solution" (confusing it with the negative-discriminant case's non-real-root implication), when in fact zero discriminant means exactly one REAL root (just repeated), a genuinely different outcome from "no real roots at all."

**Example 3 (LO2, LO3 — negative discriminant, breaking MC-2)**: For $x^2+2x+5=0$: $\Delta=(2)^2-4(1)(5)=4-20=-16<0$ — two complex conjugate roots, NOT "no solution." A common error concludes "no solution exists" for a negative discriminant, when in fact solutions DO exist — they are simply COMPLEX (non-real) rather than real numbers: $x=\frac{-2\pm\sqrt{-16}}{2}=\frac{-2\pm4i}{2}=-1\pm2i$. Whether "no solution" is even a meaningful phrase depends entirely on whether the problem is restricted to real numbers only.

## Component 5 — Teaching Actions

### Teaching Action A01 — Compute the Discriminant, Read Off the Root Type (Primitive P64: Conceptual Shift)

Work Example 1, computing $\Delta$ explicitly and connecting its positive sign directly to the "two distinct real roots" conclusion, before verifying by actually solving via the quadratic formula.

### Teaching Action A02 — Zero Discriminant Means One REAL (Repeated) Root, Not "No Solution" (Primitive P06: Contrast Pair)

Work Example 2, explicitly solving via the quadratic formula to show the repeated root $x=3$ genuinely exists (twice), directly countering any "no solution" misreading. State the rule: "$\Delta=0$ means the square root term vanishes, collapsing the $\pm$ into a SINGLE real value — this is a genuine solution, just a repeated one, not an absence of solutions."

- **MC-1 hook**: this directly targets MC-1 (confusing zero discriminant with "no solution").

### Teaching Action A03 — Negative Discriminant Means Complex Roots, Not "No Solution" (Primitive P06: Contrast Pair, second pairing)

Work Example 3's full derivation of the complex roots $-1\pm2i$, explicitly showing solutions DO exist (just not real ones). State the rule: "a negative discriminant means the roots are complex, not that no roots exist at all — 'no real solution' and 'no solution' are different claims; always specify which number system you're solving within."

- **MC-2 hook**: this directly targets MC-2 (concluding "no solution" for a negative discriminant instead of "no REAL solution").

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute the discriminant of $2x^2+7x-4=0$ and state the number/type of roots.
  2. Compute the discriminant of $x^2-8x+16=0$ and state the number/type of roots, then solve to verify.
  3. Compute the discriminant of $x^2+x+3=0$ and state the number/type of roots, then find the complex roots explicitly.
  4. Explain, in one sentence, why a negative discriminant does not mean "no solution" but rather "no REAL solution."
- **P76 (Transfer Probe, mode = independence)**: "A physicist models a projectile's height with $h(t)=-5t^2+10t+c$ (where $c$ is the launch height) and wants to know whether the projectile EVER reaches a height of exactly 20 meters, i.e. whether $-5t^2+10t+c=20$ has a real solution for $t$. (a) Rewrite this as a standard quadratic equal to zero, and compute its discriminant in terms of $c$. (b) Explain, using this lesson's discriminant-sign rules, what it would mean PHYSICALLY (in terms of whether the projectile reaches 20m) if the discriminant turns out to be negative for a specific value of $c$, connecting the abstract 'no real solution' result to the concrete physical scenario."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ZERO-DISCRIMINANT-CONFUSED-WITH-NO-SOLUTION | Believing $\Delta=0$ means the quadratic has no solution, rather than exactly one real (repeated) solution | Foundational |
| MC-2 | NEGATIVE-DISCRIMINANT-CONCLUDED-AS-NO-SOLUTION-RATHER-THAN-COMPLEX | Concluding "no solution" for a negative discriminant instead of correctly identifying two complex conjugate solutions | Foundational |
| MC-3 | DISCRIMINANT-FORMULA-SIGN-ERROR | Miscomputing $b^2-4ac$ due to a sign error, especially when $b$ or $c$ is itself negative | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Zero Discriminant Confused with No Solution") → P41 (detect: present Example 2 and check whether "no solution" is concluded from $\Delta=0$) → P64 (conceptual shift: re-solve via the quadratic formula explicitly, showing the repeated real root $x=3$ genuinely exists).
- **B02 (targets MC-2)**: P27 ("Negative Discriminant Concluded as No Solution") → P41 (detect: present Example 3 and check whether "no solution" (rather than "no real solution, but complex solutions exist") is concluded) → P64 (conceptual shift: re-derive the complex roots explicitly via the quadratic formula, showing solutions genuinely exist in the complex numbers).
- **B03 (targets MC-3)**: P27 ("Discriminant Formula Sign Error") → P41 (detect: review a submitted discriminant computation for a sign error, especially with negative $b$ or $c$) → P64 (conceptual shift: re-substitute values carefully into $b^2-4ac$, explicitly parenthesizing negative values before squaring or multiplying).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.quadratic-formula`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 3 and bloom = analyze reflect that this concept requires genuine interpretive reasoning (connecting a sign to a root-type conclusion) beyond the arithmetic computation of $\Delta$ itself.
- MC-1 and MC-2 are both ranked foundational because each represents the SAME underlying confusion from different angles — conflating "the discriminant's special-case values" with "no solution exists," when both special cases (zero and negative) actually correspond to solutions that DO exist, just of a specific different character (repeated real, or complex).
- The projectile transfer probe was deliberately designed to require interpreting a NEGATIVE discriminant's PHYSICAL meaning (the target height is never reached) rather than just its algebraic classification, testing whether the real-vs-complex distinction transfers to a genuine applied reasoning context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.quadratic-formula`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
