# Teaching Blueprint: Rational Root Theorem (`math.alg.rational-root-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rational-root-theorem` |
| name | Rational Root Theorem |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.polynomial-roots`, `math.nt.divisibility` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | For a polynomial with integer coefficients, any rational root p/q (in lowest terms) must have p dividing the constant term and q dividing the leading coefficient.

 |

## Component 1 — Learning Objectives

- LO1: List all POSSIBLE rational roots of a given integer-coefficient polynomial using the Rational Root Theorem: $p$ divides the constant term, $q$ divides the leading coefficient, candidates are $\pm p/q$.
- LO2: TEST candidate rational roots (by substitution or synthetic division) to determine which, if any, are ACTUAL roots of the polynomial.
- LO3: Recognize the theorem's LIMITS: it only applies to polynomials with INTEGER coefficients, only lists possible RATIONAL roots (the polynomial may have irrational or complex roots not on this list), and provides candidates to TEST, not guaranteed actual roots.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial-roots` (what a root is) and `math.nt.divisibility` (finding all divisors of the constant term and leading coefficient).

## Component 3 — Core Explanation

The **Rational Root Theorem** states: for a polynomial with INTEGER coefficients, any RATIONAL root, written in lowest terms as $p/q$, must satisfy $p\mid(\text{constant term})$ and $q\mid(\text{leading coefficient})$. This generates a FINITE LIST of candidate rational roots ($\pm$ every combination of a constant-term divisor over a leading-coefficient divisor) — the theorem does NOT guarantee any of these candidates is an actual root; it only narrows the search to a manageable finite set, which must then be TESTED.

Critically, this theorem says nothing about IRRATIONAL or COMPLEX roots — a polynomial may have roots that are neither rational (so absent from this list) — those require different techniques entirely.

## Component 4 — Worked Examples

**Example 1 (LO1 — listing candidates)**: For $2x^3-3x^2-11x+6=0$: constant term $=6$ (divisors $\pm1,\pm2,\pm3,\pm6$), leading coefficient $=2$ (divisors $\pm1,\pm2$). Candidates $p/q$: $\pm1,\pm2,\pm3,\pm6,\pm\frac12,\pm\frac32$ — a list of 12 possible rational roots to test.

**Example 2 (LO2 — testing candidates, breaking MC-1)**: Testing $x=2$ in $2x^3-3x^2-11x+6$: $2(8)-3(4)-11(2)+6=16-12-22+6=-12\ne0$ — NOT a root. Testing $x=3$: $2(27)-3(9)-11(3)+6=54-27-33+6=0$ ✓ — a genuine root. A common error stops testing after the FIRST candidate fails (like $x=2$), incorrectly concluding the polynomial has no rational roots at all, rather than recognizing that EACH candidate must be tested individually — a failed candidate says nothing about the others.

**Example 3 (LO3 — the theorem's limits, breaking MC-2)**: For $x^2-2=0$, the Rational Root Theorem lists candidates $\pm1,\pm2$ (divisors of the constant term $-2$ over divisors of the leading coefficient $1$). Testing all four: none of $\pm1,\pm2$ satisfy $x^2-2=0$. This does NOT mean the polynomial has no roots at all — it means it has NO RATIONAL roots; its actual roots are $x=\pm\sqrt2$, which are IRRATIONAL and therefore never appear on any Rational Root Theorem candidate list, no matter how the divisors are computed. A common error concludes "no roots exist" when testing exhausts the rational candidate list without success, rather than correctly concluding "no RATIONAL roots exist — the actual roots, if any, must be irrational or complex."

## Component 5 — Teaching Actions

### Teaching Action A01 — Generate All Candidates from Divisors (Primitive P64: Conceptual Shift)

Work Example 1, systematically listing all divisors of the constant term and leading coefficient separately, then forming every $\pm p/q$ combination methodically to avoid missing a candidate.

### Teaching Action A02 — Every Candidate Must Be Individually Tested (Primitive P06: Contrast Pair)

Work Example 2, testing $x=2$ (fails) and $x=3$ (succeeds) as two SEPARATE, independent tests, showing a failure at one candidate provides zero information about any other candidate. State the rule: "the theorem gives you a LIST to check, not a guarantee about any specific candidate — each one must be tested on its own merits, and a failed test doesn't rule out roots elsewhere on the list."

- **MC-1 hook**: this directly targets MC-1 (giving up after one failed candidate).

### Teaching Action A03 — Exhausted Candidates Means No RATIONAL Roots, Not No Roots (Primitive P06: Contrast Pair, second pairing)

Work Example 3's $x^2-2$ case, testing all four candidates and finding none work, then revealing the TRUE irrational roots $\pm\sqrt2$ to show roots genuinely exist despite the rational-candidate search coming up empty. State the rule: "if every candidate on the list fails, the conclusion is 'no RATIONAL roots' — the polynomial can still have irrational or complex roots the theorem simply cannot see."

- **MC-2 hook**: this directly targets MC-2 (concluding "no roots exist" rather than "no rational roots exist" after exhausting the candidate list).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. List all possible rational roots of $x^3+2x^2-5x-6=0$ using the theorem.
  2. Test the candidates from problem 1 to find all actual rational roots.
  3. List all possible rational roots of $3x^2-2x-8=0$, and determine which (if any) are actual roots.
  4. Explain, in one sentence, why finding that all candidates fail for a given polynomial does not prove the polynomial has no roots at all.
- **P76 (Transfer Probe, mode = independence)**: "An engineer has a cubic polynomial $x^3-x-1=0$ modeling a design constraint and wants to know if there's a 'nice' rational value of $x$ satisfying it. (a) Use the Rational Root Theorem to list all possible rational root candidates, and test each one. (b) After finding no rational roots work, explain to a colleague — using this lesson's theorem-limits idea — what this result does and does NOT tell them about whether the equation has ANY real solution at all, and what kind of number that solution (if it exists) might be."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CANDIDATE-TESTING-ABANDONED-AFTER-ONE-FAILURE | Stopping the candidate-testing process after the first candidate fails, incorrectly concluding no rational roots exist without testing the remaining candidates | Foundational |
| MC-2 | NO-RATIONAL-ROOTS-CONCLUDED-AS-NO-ROOTS-AT-ALL | Concluding a polynomial has no roots whatsoever after exhausting the rational candidate list without success, rather than correctly concluding only that no RATIONAL roots exist | Foundational |
| MC-3 | DIVISOR-LIST-INCOMPLETE | Missing one or more divisors of the constant term or leading coefficient when generating the candidate list, producing an incomplete set of candidates to test | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Candidate Testing Abandoned After One Failure") → P41 (detect: present Example 2 and check whether testing stops after $x=2$ fails) → P64 (conceptual shift: re-state that each candidate is an independent test, requiring the FULL list to be checked before any "no rational roots" conclusion).
- **B02 (targets MC-2)**: P27 ("No Rational Roots Concluded as No Roots at All") → P41 (detect: present Example 3's exhausted-candidates case and check whether "no roots" or the correct "no rational roots" is concluded) → P64 (conceptual shift: reveal the true irrational roots $\pm\sqrt2$, demonstrating roots exist despite the rational search failing).
- **B03 (targets MC-3)**: P27 ("Divisor List Incomplete") → P41 (detect: review a submitted candidate list against the full, correct divisor set) → P64 (conceptual shift: re-derive the divisors systematically — checking every integer from 1 up to the value itself for exact division — rather than listing them from memory or incompletely).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial-roots`, `math.nt.divisibility`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.complex-polynomial-roots` (a sibling concept addressing the non-real roots this theorem cannot detect).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept combines a divisor-generation step (reusing `math.nt.divisibility`) with a genuinely separate testing/verification phase, plus the conceptually demanding limits (LO3) of what the theorem can and cannot conclude.
- MC-1 and MC-2 are both ranked foundational because each represents premature or overreaching conclusion-drawing — stopping too early (MC-1) or overstating the theorem's scope (MC-2) — both undermining the theorem's actual, more modest guarantee (a finite candidate list, nothing more).
- The engineering transfer probe's cubic $x^3-x-1=0$ was deliberately chosen as a genuine example with NO rational roots (its real root is irrational), directly testing whether MC-2's correction transfers to a case where the "disappointing" exhausted-candidates outcome is the realistic, expected result rather than an artificial teaching device.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.polynomial-roots`, `math.nt.divisibility`) |
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
