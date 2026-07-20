# Teaching Blueprint: Partial Fraction Decomposition (`math.calc.partial-fractions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.partial-fractions` |
| name | Partial Fraction Decomposition |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.trig-substitution`, `math.alg.rational-expressions`, `math.alg.polynomial-roots` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — advanced learner already simplifies rational expressions by combining fractions; the task is running that process in REVERSE, splitting one complicated fraction into several simple ones specifically to enable integration |
| description (KG) | Decomposing a rational function $p(x)/q(x)$ ($\deg p<\deg q$) into a sum of simpler fractions; enables integration of all rational functions. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize partial fraction decomposition as `math.alg.rational-expressions`'s own fraction-COMBINING process run in REVERSE — that concept teaches combining $\frac{A}{x-a}+\frac{B}{x-b}$ into a SINGLE fraction $\frac{p(x)}{q(x)}$ via a common denominator; this concept starts from the single combined fraction and recovers the individual simple pieces — and correctly verify, for a specific decomposition, that recombining the pieces via `math.alg.rational-expressions`'s own combining process genuinely reconstructs the original fraction.
- LO2: Use `math.alg.polynomial-roots`'s own factorization of the denominator $q(x)$ into linear and irreducible quadratic factors to correctly determine the FORM of the decomposition (one constant per LINEAR factor, a linear numerator per IRREDUCIBLE QUADRATIC factor, with REPEATED factors requiring one term per power up to the multiplicity) — and correctly set up (not necessarily fully solve) the decomposition's general form for a rational function with a specified factored denominator.
- LO3: Solve for the decomposition's unknown constants using either the cover-up method (for distinct linear factors) or matching coefficients, and correctly explain WHY partial fractions make integration possible for rational functions that resist direct integration — each resulting simple piece is directly integrable via already-known techniques (a basic logarithm rule for linear-factor terms, or `math.calc.trig-substitution`'s own arctangent-producing techniques for irreducible-quadratic-factor terms).

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.trig-substitution` (substitutions eliminating square roots, producing arctangent-type antiderivatives for quadratic denominators), `math.alg.rational-expressions` (combining fractions $p(x)/q(x)$ over a common denominator), and `math.alg.polynomial-roots` (factoring a polynomial into linear and irreducible quadratic factors, with multiplicity).

## Component 3 — Core Explanation

**Partial fractions run `math.alg.rational-expressions`'s own combining process in reverse**: `math.alg.rational-expressions` already teaches combining $\frac{A}{x-a}+\frac{B}{x-b}$ into a single fraction via a common denominator: $\frac{A(x-b)+B(x-a)}{(x-a)(x-b)}$. Partial fraction decomposition starts from the RESULT of this process — a single combined rational function $\frac{p(x)}{q(x)}$ — and works BACKWARD to recover the original simple pieces $\frac{A}{x-a},\frac{B}{x-b}$ that would combine to produce it. This is not a new algebraic operation; it is the SAME combining machinery, applied in reverse, with the unknowns being the numerators $A,B$ instead of the final combined numerator.

**The decomposition's FORM is dictated directly by `math.alg.polynomial-roots`'s own factorization of $q(x)$**: for each DISTINCT LINEAR factor $(x-a)$ of $q(x)$, the decomposition includes one term $\frac{A}{x-a}$ (a single unknown constant); for each REPEATED linear factor $(x-a)^k$, the decomposition includes $k$ separate terms $\frac{A_1}{x-a}+\frac{A_2}{(x-a)^2}+\cdots+\frac{A_k}{(x-a)^k}$ (one term per power, up to the multiplicity `math.alg.polynomial-roots`'s own theory already tracks); for each IRREDUCIBLE quadratic factor $(x^2+bx+c)$ (one with no real roots, per that concept's own classification), the decomposition includes a term $\frac{Bx+C}{x^2+bx+c}$ (a LINEAR, not merely constant, numerator — since a constant alone cannot match every possible combined-fraction numerator arising from this factor type).

**Each resulting piece is integrable via already-known techniques — this is WHY the decomposition matters**: a term $\frac{A}{x-a}$ integrates directly to $A\ln|x-a|+C$ (a basic logarithm rule). A term $\frac{Bx+C}{x^2+bx+c}$ (irreducible quadratic denominator) integrates via completing the square and `math.calc.trig-substitution`'s own arctangent-producing technique (or a direct logarithm/arctangent split), a method THAT concept already fully develops. So decomposing a complicated rational function into these simple pieces converts an otherwise-intractable integral into a SUM of already-solvable pieces — the entire POINT of learning this decomposition technique.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying a decomposition by recombining via `math.alg.rational-expressions`'s own process, breaking MC-1)**: given the CLAIMED decomposition $\frac{3x+1}{(x-1)(x+2)}=\frac{A}{x-1}+\frac{B}{x+2}$ with proposed values $A=\frac43,B=\frac53$ (obtained via a method not yet shown): verifying DIRECTLY by recombining using `math.alg.rational-expressions`'s own common-denominator process: $\frac{4/3}{x-1}+\frac{5/3}{x+2}=\frac{(4/3)(x+2)+(5/3)(x-1)}{(x-1)(x+2)}=\frac{(4/3)x+8/3+(5/3)x-5/3}{(x-1)(x+2)}=\frac{3x+1}{(x-1)(x+2)}$ ✓ — confirming the recombination genuinely reconstructs the original fraction, verifying LO1's claimed reverse-process relationship concretely.

**Example 2 (LO2 — setting up the correct decomposition form from the factored denominator, breaking MC-2)**: for $\frac{2x^2+3}{(x-1)^2(x^2+4)}$: using `math.alg.polynomial-roots`'s own factorization, the denominator has a REPEATED linear factor $(x-1)^2$ and an IRREDUCIBLE quadratic factor $x^2+4$ (no real roots, since $x^2=-4$ has no real solution). The correct decomposition FORM (not yet solved for constants) is $\frac{A}{x-1}+\frac{B}{(x-1)^2}+\frac{Cx+D}{x^2+4}$ — TWO separate terms for the repeated linear factor (one per power up to multiplicity 2), and a LINEAR (not constant) numerator $Cx+D$ for the irreducible quadratic factor — confirming LO2's precise form-determination rule concretely, distinct from the naive guess of a single term per factor.

**Example 3 (LO3 — solving via the cover-up method and integrating each piece, breaking MC-3)**: for $\frac{5x-1}{(x-2)(x+3)}=\frac{A}{x-2}+\frac{B}{x+3}$: using the cover-up method, $A=\left.\frac{5x-1}{x+3}\right|_{x=2}=\frac{9}{5}$, and $B=\left.\frac{5x-1}{x-2}\right|_{x=-3}=\frac{-16}{-5}=\frac{16}{5}$. So $\int\frac{5x-1}{(x-2)(x+3)}\,dx=\int\left(\frac{9/5}{x-2}+\frac{16/5}{x+3}\right)dx=\frac95\ln|x-2|+\frac{16}5\ln|x+3|+C$ — each piece integrated via the BASIC logarithm rule, confirming LO3's claimed integrability-enabling purpose concretely: an integral with NO direct elementary antiderivative recognizable from the original combined form becomes a simple sum of two logarithms once decomposed.

## Component 5 — Teaching Actions

### Teaching Action A01 — Decomposition Is `math.alg.rational-expressions`'s Own Combining Process, Run Backward (Primitive P11: Representation Shift)

State: "you already know how to COMBINE $\frac{A}{x-a}+\frac{B}{x-b}$ into a single fraction — partial fraction decomposition just runs that SAME process backward, starting from the combined fraction and recovering $A,B$." Walk Example 1's direct recombination verification.

- **MC-1 hook**: ask "is partial fraction decomposition a genuinely new algebraic operation, or is it `math.alg.rational-expressions`'s own fraction-combining process applied in reverse?" — a "genuinely new operation" answer reveals MC-1 (missing the direct reverse-process relationship).

### Teaching Action A02 — The Decomposition's Form Is Dictated Precisely by the Factorization — Not a Single Term Per Factor Always (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the repeated factor $(x-1)^2$ requires TWO separate terms (not one), and the irreducible quadratic factor requires a LINEAR numerator $Cx+D$ (not just a constant) — both genuine departures from a naive "one term per factor, always constant numerator" guess. State: "the decomposition's exact FORM isn't guessed — it's dictated precisely by `math.alg.polynomial-roots`'s own factorization: repeated factors need one term per power, and irreducible quadratics need a full linear numerator, not just a constant."

- **MC-2 hook**: ask "for a REPEATED linear factor $(x-a)^2$, does the decomposition include just ONE term $\frac{A}{(x-a)^2}$, or TWO separate terms (one for each power up to the multiplicity)?" — a "just one term" answer reveals MC-2 (missing the one-term-per-power rule for repeated factors).

### Teaching Action A03 — Each Decomposed Piece Is Directly Integrable — That's the Entire Point (Primitive P06: Contrast Pair)

Contrast the ORIGINAL combined fraction $\frac{5x-1}{(x-2)(x+3)}$ (with no directly recognizable antiderivative) against Example 3's decomposed pieces, EACH integrable via the basic logarithm rule already known. State: "the whole reason to decompose is that the individual pieces are integrable via techniques you already have — a single combined rational function often has no obvious antiderivative, but its decomposed pieces almost always do."

- **MC-3 hook**: ask "is the purpose of partial fraction decomposition purely algebraic simplification for its own sake, or specifically to make each resulting piece directly integrable via already-known techniques?" — a "purely algebraic simplification, unrelated to integration" answer reveals MC-3 (missing the decomposition's specific integration-enabling purpose).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify, by recombining via a common denominator, that $\frac{2}{x-1}+\frac{3}{x+1}=\frac{5x-1}{(x-1)(x+1)}$.
  2. Set up (without solving) the correct decomposition form for $\frac{x+1}{(x+2)^3(x^2+1)}$, citing the factorization explicitly.
  3. Solve for the constants in $\frac{7x+1}{(x-1)(x+4)}=\frac{A}{x-1}+\frac{B}{x+4}$ using the cover-up method.
  4. Integrate your decomposed result from problem 3.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "An engineer needs to compute $\int\frac{4x^2+x+2}{(x-1)(x^2+1)}\,dx$ for a signal-processing calculation, and the integrand has no directly recognizable antiderivative in its current combined form. (a) Using `math.alg.polynomial-roots`'s own factorization of the denominator (already factored as shown), set up the correct partial fraction decomposition form, being careful about the irreducible quadratic factor's numerator. (b) After solving for the unknown constants (not required here — assume they are found), explain which already-known integration technique handles the linear-factor term, and which handles the irreducible-quadratic-factor term, citing `math.calc.trig-substitution`'s own machinery for the latter. (c) Explain why attempting to integrate the ORIGINAL combined fraction directly, without decomposing, would likely fail to produce a recognizable antiderivative."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARTIAL-FRACTIONS-ASSUMED-NEW-OPERATION | Believing partial fraction decomposition is a genuinely new algebraic operation, missing that it is `math.alg.rational-expressions`'s own combining process run in reverse | Foundational |
| MC-2 | DECOMPOSITION-FORM-ASSUMED-ONE-TERM-PER-FACTOR-ALWAYS | Believing the decomposition always uses exactly one term per denominator factor with a constant numerator, missing that repeated factors need one term per power and irreducible quadratics need a linear numerator | High |
| MC-3 | DECOMPOSITION-PURPOSE-ASSUMED-PURELY-ALGEBRAIC | Believing the purpose of partial fraction decomposition is purely algebraic simplification, missing its specific role enabling integration via already-known techniques | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Partial Fractions Assumed New Operation") → P41 (detect: ask whether decomposition is a new operation or the combining process reversed) → P64 (conceptual shift: re-walk Example 1's direct recombination verification).
- **B02 (targets MC-2)**: P27 (name it: "Decomposition Form Assumed One Term Per Factor Always") → P41 (detect: ask how many terms a repeated linear factor requires) → P64 (conceptual shift: re-walk Example 2's correct form for $(x-1)^2(x^2+4)$).
- **B03 (targets MC-3)**: P27 (name it: "Decomposition Purpose Assumed Purely Algebraic") → P41 (detect: ask why partial fractions are used) → P64 (conceptual shift: re-walk Example 3's direct integration of the decomposed pieces).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.trig-substitution` (the arctangent-producing integration technique this concept's irreducible-quadratic-factor pieces directly reuse), `math.alg.rational-expressions` (the fraction-combining process this concept's decomposition directly reverses), and `math.alg.polynomial-roots` (the factorization into linear/irreducible-quadratic factors with multiplicity, dictating the decomposition's exact form).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 grounding decomposition in the already-known reverse-combining relationship, LO2 given full form-determination depth via a genuinely complex factorization, and LO3 demonstrating the integration-enabling purpose concretely.
- **Division of labor**: `math.alg.rational-expressions` already owns the fraction-combining process itself (verified by grep — no partial-fraction-decomposition content found there); `math.alg.polynomial-roots` already owns the factorization into linear/irreducible-quadratic factors with multiplicity (verified by grep — no partial-fraction content there either); `math.calc.trig-substitution` already owns the arctangent-producing integration technique this concept's quadratic-factor pieces reuse. This concept owns the decomposition technique itself: recognizing it as the reverse of combining, determining the correct form from the factorization, and solving/integrating the resulting pieces.
- Example 2's deliberate choice of a denominator combining BOTH a repeated linear factor AND an irreducible quadratic factor (rather than testing each case separately in isolation) was made to give LO2's form-determination rule a single, comprehensive test case exercising both non-obvious rules (multiple terms per repeated factor; linear numerator for irreducible quadratics) simultaneously.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already combines fractions; task is running the process in reverse for integration) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
