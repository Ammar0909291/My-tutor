# math.calc.partial-fractions — Partial Fraction Decomposition

## Identity
- **KG id**: `math.calc.partial-fractions`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.trig-substitution`, `math.alg.rational-expressions`, `math.alg.polynomial-roots`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.75 · **Estimated hours**: 8

## Learning Objective
The learner recognizes partial fraction decomposition as `math.alg.rational-expressions`'s own fraction-combining process run in reverse; uses `math.alg.polynomial-roots`'s own factorization of the denominator to determine the exact FORM of the decomposition (one term per linear factor, one term per power for repeated factors, a linear numerator for irreducible quadratic factors); and solves for the unknown constants via the cover-up method or matching coefficients, integrating each resulting piece via already-known techniques.

## Core Understanding
`math.alg.rational-expressions` already owns the process of combining several simple fractions into one, and `math.alg.polynomial-roots` already owns factoring a polynomial into linear and irreducible quadratic factors with multiplicity. This concept does not re-derive either — it runs the combining process BACKWARD, using the factorization to dictate exactly what form the reversed decomposition must take.

**Partial fractions run `math.alg.rational-expressions`'s own combining process in reverse**: that concept teaches combining $\frac{A}{x-a}+\frac{B}{x-b}$ into a single fraction via a common denominator, $\frac{A(x-b)+B(x-a)}{(x-a)(x-b)}$. Partial fraction decomposition starts from the RESULT of this process — a single combined rational function $\frac{p(x)}{q(x)}$ — and works backward to recover the original simple pieces that would combine to produce it. This is the same combining machinery, applied in reverse, with the unknowns being the numerators instead of the final combined numerator.

**The decomposition's form is dictated directly by the denominator's factorization, not guessed**: for each DISTINCT LINEAR factor $(x-a)$ of $q(x)$, the decomposition includes one term $\frac{A}{x-a}$. For each REPEATED linear factor $(x-a)^k$, the decomposition includes $k$ SEPARATE terms, $\frac{A_1}{x-a}+\frac{A_2}{(x-a)^2}+\cdots+\frac{A_k}{(x-a)^k}$ — one term per power up to the multiplicity `math.alg.polynomial-roots`'s own theory already tracks. For each IRREDUCIBLE quadratic factor $(x^2+bx+c)$ (no real roots, per that concept's own classification), the decomposition includes a term $\frac{Bx+C}{x^2+bx+c}$ — a LINEAR, not merely constant, numerator, since a constant alone cannot match every possible numerator arising from that factor type.

**Each resulting piece is integrable via already-known techniques — this is the whole point**: a term $\frac{A}{x-a}$ integrates directly to $A\ln|x-a|+C$. A term $\frac{Bx+C}{x^2+bx+c}$ integrates via completing the square and `math.calc.trig-substitution`'s own arctangent-producing technique, a method that concept already fully develops. Decomposing a complicated rational function into these simple pieces converts an otherwise-intractable integral into a SUM of already-solvable pieces.

## Mental Models
- **Combining, in reverse.** Partial fractions is not a new algebraic operation — it is `math.alg.rational-expressions`'s own combining machinery run backward, recovering the pieces that combined to produce the given fraction.
- **The factorization dictates the form; nothing is guessed.** Every factor of the denominator prescribes exactly one specific term-shape — a repeated factor needs multiple terms, an irreducible quadratic needs a linear numerator — read directly off `math.alg.polynomial-roots`'s own classification.
- **The decomposition exists so each piece becomes integrable.** A single combined rational function often has no obvious antiderivative; its decomposed pieces almost always do, via logarithm and arctangent rules already known.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: without an explicit statement that decomposition is the reverse of an already-known process, a learner may treat it as an entirely new, unrelated algebraic technique to be memorized from scratch.
- **MC-2** is a **Type 1 (overgeneralization)**: the simplest cases (distinct linear factors, one term each) are typically encountered first, so a learner may overgeneralize "one term per factor, constant numerator" as the universal rule, missing the genuinely different requirements for repeated and irreducible-quadratic factors.
- **MC-3** is a **Type 5 (instruction-induced)** gap: if the decomposition technique is practiced in isolation from any integration context, its specific PURPOSE — making each piece directly integrable — is never made explicit, leaving the impression that it is merely an algebraic exercise.

## Misconceptions
**MC-1 — PARTIAL-FRACTIONS-ASSUMED-NEW-OPERATION** *(Foundational)*
- Surface form: treating partial fraction decomposition as a genuinely new algebraic operation, unrelated to anything previously learned.
- Root cause: without the explicit reverse-process framing, the technique appears to arrive from nowhere rather than as the natural inverse of combining fractions.
- Repair: verify a claimed decomposition directly by recombining it via `math.alg.rational-expressions`'s own common-denominator process — e.g. $\frac{4/3}{x-1}+\frac{5/3}{x+2}$ recombines exactly to $\frac{3x+1}{(x-1)(x+2)}$, confirming the reverse relationship concretely.

**MC-2 — DECOMPOSITION-FORM-ASSUMED-ONE-TERM-PER-FACTOR-ALWAYS** *(High)*
- Surface form: assuming every factor contributes exactly one term with a constant numerator, regardless of whether it is repeated or an irreducible quadratic.
- Root cause: overgeneralizing from the simplest case (distinct linear factors) to the entire family of possible denominators.
- Repair: work through $\frac{2x^2+3}{(x-1)^2(x^2+4)}$ explicitly, showing the repeated factor $(x-1)^2$ requires TWO separate terms and the irreducible quadratic $x^2+4$ requires a LINEAR numerator $Cx+D$ — both genuine departures from the naive one-term-constant-numerator guess.

**MC-3 — DECOMPOSITION-PURPOSE-ASSUMED-PURELY-ALGEBRAIC** *(Moderate)*
- Surface form: viewing partial fraction decomposition as an end in itself, disconnected from any integration purpose.
- Root cause: practicing the decomposition technique in isolation, without connecting it back to why it is needed.
- Repair: contrast the original combined fraction $\frac{5x-1}{(x-2)(x+3)}$ (no directly recognizable antiderivative) against its decomposed pieces, each integrable via the basic logarithm rule already known — making the integration-enabling purpose concrete.

## Analogies
- **The reverse-recipe analogy**: exactly as knowing how to combine two ingredients into a mixture lets you reason backward about what two ingredients could have produced a given mixture, knowing how to combine fractions over a common denominator lets you reason backward to the simple fractions that would combine to give the observed one.
- **Anti-analogy — the decomposition's form is NOT a single fixed pattern.** This is MC-2's exact error: unlike a one-size-fits-all template, the form genuinely depends on the specific factorization — repeated factors and irreducible quadratics each demand a structurally different treatment.

## Demonstrations
1. **The direct recombination verification**: given the claimed decomposition $\frac{3x+1}{(x-1)(x+2)}=\frac{4/3}{x-1}+\frac{5/3}{x+2}$, recombining via the common-denominator process to confirm it reconstructs the original fraction exactly — directly breaking MC-1.
2. **The comprehensive form-determination example**: setting up (not solving) the decomposition for $\frac{2x^2+3}{(x-1)^2(x^2+4)}$, showing both the repeated-factor multi-term rule and the irreducible-quadratic linear-numerator rule in one example — directly breaking MC-2.
3. **The cover-up method and full integration**: solving $\frac{5x-1}{(x-2)(x+3)}=\frac{A}{x-2}+\frac{B}{x+3}$ via the cover-up method and integrating each piece to logarithms — directly breaking MC-3 by completing the integration the decomposition was for.

## Discovery Questions
1. "Is partial fraction decomposition a genuinely new algebraic operation, or is it the fraction-combining process you already know, run backward?"
2. "For a REPEATED linear factor $(x-a)^2$, does the decomposition include just one term, or does it need a separate term for each power up to the multiplicity?"
3. "Is the purpose of decomposing a fraction into partial fractions purely algebraic simplification, or does it serve a specific purpose related to integration?"

## Teaching Sequence
1. **Anchor in `math.alg.rational-expressions` and `math.alg.polynomial-roots`**: state directly, "you already know how to combine fractions and how to factor denominators — today you run the combining process backward, guided by the factorization."
2. **Representation shift (breaks MC-1)**: the direct recombination verification, confirming the reverse-process relationship concretely.
3. **Conflict evidence (breaks MC-2)**: the comprehensive form-determination example spanning both a repeated factor and an irreducible quadratic factor.
4. **Contrast pair (breaks MC-3)**: the original combined fraction (no obvious antiderivative) against its decomposed, individually-integrable pieces.
5. **Mastery gate**: 4-item problem set (verifying a recombination; setting up a decomposition form for a complex denominator without solving; solving for constants via the cover-up method; integrating the decomposed result) plus 1 independence-mode transfer probe (a signal-processing engineering scenario requiring form-setup, technique identification for each piece, and an explanation of why the original combined fraction resists direct integration).

## Tutor Actions
- **Representation shift**: the direct recombination verification confirming decomposition's reverse-process relationship.
- **Conflict evidence**: the comprehensive form-determination example spanning repeated and irreducible-quadratic factors.
- **Contrast pair**: the original combined fraction against its decomposed, individually-integrable pieces.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring form-setup, technique identification, and a justification.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "you already know how to combine and how to factor — today's job is running the combining process in reverse, guided entirely by the factorization."
- For MC-1, whenever a decomposition is proposed, ask "can you verify this by recombining it — does it reconstruct the original fraction?"
- For MC-2, before writing any decomposition form, ask "is any factor repeated, or irreducible-quadratic — and if so, what does that require?"
- For MC-3, after any decomposition, ask "why did we do this — what does it let us do next?"

## Assessment Signals
- **Early warning for MC-1**: treating decomposition as an unfamiliar, standalone technique rather than connecting it to already-known combining.
- **Early warning for MC-2**: writing a single constant-numerator term for a repeated or irreducible-quadratic factor.
- **Early warning for MC-3**: being unable to explain why decomposition was performed, beyond "to simplify."
- **Mastery evidence**: correctly verifying a decomposition by recombination on a fresh example, correctly setting up the full decomposition form for a denominator combining multiple factor types, and correctly completing the integration of each piece.

## Tutor Recovery Strategy
- On MC-1: require the learner to recombine a fresh proposed decomposition explicitly, confirming it reconstructs the original.
- On MC-2: present a fresh denominator combining a repeated factor and an irreducible quadratic and require the correct form to be set up before any solving.
- On MC-3: require the learner to state explicitly, before decomposing, what integration technique each resulting piece will use.
- If a learner correctly determines the decomposition form and solves for constants but struggles specifically with the irreducible-quadratic-factor integral, route to dedicated review of `math.calc.trig-substitution`'s own arctangent-producing technique.

## Memory Hooks
- "Combining, in reverse" — for MC-1.
- "The factorization tells you the form — repeated factors need more terms, irreducible quadratics need a linear numerator" — for MC-2.
- "Decompose so each piece becomes integrable" — for MC-3.

## Transfer Connections
- **`math.calc.trig-substitution`** (prerequisite, already authored): supplies the arctangent-producing integration technique this concept's irreducible-quadratic-factor pieces directly reuse, without re-deriving it.
- **`math.alg.rational-expressions`** (prerequisite, already authored): supplies the fraction-combining process this concept's decomposition directly reverses.
- **`math.alg.polynomial-roots`** (prerequisite, already authored): supplies the factorization into linear and irreducible-quadratic factors with multiplicity, which dictates the decomposition's exact form.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a signal-processing engineering context purely as an application vehicle, not a formal cross-subject curriculum link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.partial-fractions.md`. All three worked examples (the direct recombination verification for $\frac{3x+1}{(x-1)(x+2)}$; the comprehensive form-determination for $\frac{2x^2+3}{(x-1)^2(x^2+4)}$; the cover-up-method solution and integration of $\frac{5x-1}{(x-2)(x+3)}$), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the signal-processing engineering scenario requiring form-setup for $\int\frac{4x^2+x+2}{(x-1)(x^2+1)}\,dx$, technique identification for each piece, and an explanation of why the original combined fraction resists direct integration, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- This entry closes math.calc's entire remaining frontier for the third consecutive batch this program has authored a math.calc concept — it is the final concept in the trig-integrals/trig-substitution/partial-fractions chain this campaign opened via the Batch 52 cross-domain excursion.

## Version History
- **2026-09-13 (Batch 62)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.calc.trig-substitution` (Batch 61), `math.alg.rational-expressions` (Batch 8), and `math.alg.polynomial-roots` (Batch 9). One of four concepts authored this batch (companions: `math.trig.trig-equations`, `math.seq.recursive-sequences`, `math.seq.infinite-geometric-series`). `math.calc` moves from 69/76 toward 70/76 this batch.
