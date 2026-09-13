# math.func.rational-function

## Identity
- **KG ID**: `math.func.rational-function`
- **Domain**: math.func (Functions)
- **Requires**: `math.alg.rational-expressions`, `math.func.polynomial-function`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 4
- **CPA stage**: Concrete (analyzing one specific rational function's domain and asymptotic behavior before naming the general classification)

## Learning Objective
By the end of this concept, the learner can:
1. Define a rational function $f(x)=p(x)/q(x)$ (with $p,q$ polynomial functions from `math.func.polynomial-function`) and determine its DOMAIN by finding the zeros of $q(x)$, recognizing the domain restriction as inherited directly from division being undefined at zero, not an arbitrary new rule.
2. Distinguish a vertical asymptote (a zero of $q(x)$ that is NOT also a zero of $p(x)$, or survives after `math.alg.rational-expressions`'s own cancellation of common factors) from a hole (a zero of $q(x)$ that IS cancelled against a matching factor of $p(x)$) — recognizing these as genuinely different behaviors at superficially similar-looking excluded points.
3. Recognize, at orientation level, that a rational function's behavior as $x\to\pm\infty$ is governed by comparing the DEGREES of $p$ and $q$ (full derivation deferred beyond this concept's core scope).

## Core Understanding
A rational function is simply one polynomial function divided by another, $f(x)=p(x)/q(x)$ — and every distinctive feature of a rational function's behavior (its domain restrictions, its holes, its vertical asymptotes, its long-run trend) follows directly from combining what `math.func.polynomial-function` already established about polynomials with the single new fact that DIVISION introduces an exclusion wherever the denominator vanishes.

**DOMAIN EXCLUSION IS JUST "NO DIVISION BY ZERO," APPLIED TO A FUNCTION.** Since $f(x)=p(x)/q(x)$ literally requires dividing by $q(x)$, and division by zero is undefined, the domain of $f$ is automatically all reals EXCEPT wherever $q(x)=0$. This is not a special new rule invented for rational functions specifically — it is the identical "can't divide by zero" fact already true for any expression, now simply applied at the function level by finding where the denominator's polynomial vanishes.

**A ZERO OF THE DENOMINATOR IS NOT AUTOMATICALLY AN ASYMPTOTE — IT DEPENDS ON WHETHER IT CANCELS.** `math.alg.rational-expressions` already established that common factors of $p(x)$ and $q(x)$ can be cancelled. If $x=a$ is a zero of $q(x)$ that ALSO cancels against a matching factor of $p(x)$, the simplified function is well-defined and continuous near $x=a$ except for one missing point — a HOLE: the function approaches a finite value there, it is simply undefined at that exact point. If $x=a$ is a zero of $q(x)$ that does NOT cancel (survives in the denominator after simplification), the function's magnitude grows without bound near $x=a$ — a VERTICAL ASYMPTOTE. Both start from the identical fact "a zero of $q(x)$," but the presence or absence of a matching factor in $p(x)$ determines which of these two genuinely different behaviors actually occurs.

**END BEHAVIOR COMES FROM COMPARING DEGREES, AT ORIENTATION LEVEL.** As $x\to\pm\infty$, comparing $\deg(p)$ and $\deg(q)$ determines the function's large-scale trend: if $\deg(p)<\deg(q)$, $f(x)\to0$ (horizontal asymptote at $y=0$); if $\deg(p)=\deg(q)$, $f(x)\to$ the ratio of leading coefficients (a horizontal asymptote at that constant); if $\deg(p)=\deg(q)+1$, there is a slant (oblique) asymptote; if $\deg(p)>\deg(q)+1$, neither a horizontal nor slant asymptote captures the behavior. This is the same "leading term dominance" idea from `math.func.end-behavior`, applied to a RATIO of two polynomials rather than a single one — full derivation of each case is deliberately deferred beyond this concept's core scope, kept orientation-level here.

## Mental Models
1. **Rung 1 — Division inherits its restriction, it doesn't invent one.** A rational function's domain rule is the SAME rule as "$1/0$ is undefined," never a new fact to memorize — only the specific location of the exclusion changes from function to function.
2. **Rung 2 — Cancellation decides the excluded point's fate.** The same zero of the denominator can be either a hole (mild, a single missing point) or a vertical asymptote (severe, unbounded blow-up) depending entirely on one extra check: does the matching factor exist in the numerator too?
3. **Rung 3 — The whole function's long-run trend is a tug-of-war between two degrees.** Whichever polynomial (numerator or denominator) has the higher degree "wins" as $x$ grows large, and the exact margin of victory (equal, one more, more than one more) determines which of the three end-behavior cases applies.

## Why Students Fail
MC-1 happens because rational functions are often introduced with domain-restriction language that sounds like a NEW special procedure specific to this function family, rather than being explicitly tied back to the single already-familiar fact that division by zero is undefined — so a learner treats "find the domain of a rational function" as its own memorized rule rather than an application of something they already know. MC-2 happens because a zero of the denominator LOOKS identical on the surface regardless of whether it cancels — the algebraic form $q(a)=0$ gives no visual signal about the numerator, so without deliberately checking for a matching factor, a learner defaults to treating every denominator zero the same way (as an asymptote), since that is the more commonly emphasized and more dramatic-looking case. MC-3 happens because a learner who has only seen "numerator over denominator, both polynomials" has no reason yet to expect the DEGREES specifically to matter — "it's a polynomial over a polynomial" feels like a complete description of the function's type, and the idea that a hidden comparison (degree of $p$ vs. degree of $q$) governs three qualitatively different long-run behaviors is not obvious until directly demonstrated with a controlled contrast.

## Misconceptions

### MC-1: DOMAIN-RESTRICTION-ASSUMED-SPECIAL-RULE
- **Birth type**: Type 5 — Instruction-induced (independently classified; this Blueprint's Misconception Registry table does not carry an explicit birth-type column, matching the same gap found in `math.func.polynomial-function`'s Blueprint earlier this campaign — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner believes determining a rational function's domain is a special new procedure distinct from the ordinary "division by zero is undefined" fact, missing that it is inherited directly from that fact, applied by finding the denominator's zeros.
- **Why this birth type**: Rational functions are commonly introduced with domain-restriction language framed as a property specific to this function family (a new topic heading, a new rule to state), rather than being explicitly connected back to the single prior fact the learner already holds — the instructional framing, not any false intuition, is what manufactures the sense of novelty.
- **Detection probe**: "Is determining a rational function's domain a special new procedure distinct from the ordinary 'division by zero is undefined' fact?" — a learner holding this misconception answers yes.
- **Repair**: Walk the direct factoring and zero-finding for $f(x)=(x+1)/(x^2-4)$: the denominator $x^2-4=(x-2)(x+2)$ has zeros at $x=2,-2$, so the domain excludes exactly those two points — no separate rule was needed beyond "division by zero is undefined," applied by finding where $q(x)$ vanishes.
- **Verification of death**: Given a new rational function, the learner states the domain rule as "wherever the denominator's polynomial equals zero" without treating it as a distinct memorized fact from ordinary division-by-zero.

### MC-2: DENOMINATOR-ZERO-ASSUMED-TO-ALWAYS-BE-ASYMPTOTE
- **Birth type**: Type 2 — Perceptual intuition (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner believes every zero of the denominator automatically produces a vertical asymptote, missing that a cancelling factor produces a hole instead.
- **Why this birth type**: A zero of the denominator looks algebraically identical whether or not it cancels — the surface appearance of "$q(a)=0$" carries no visible signal distinguishing the two cases, so the perceptual default (treat every denominator zero the same, dramatic way) persists until the numerator is explicitly checked for a matching factor.
- **Detection probe**: "For $f(x)=\dfrac{(x-2)(x+1)}{(x-2)(x-3)}$, is $x=2$ a vertical asymptote?" — a learner holding this misconception says yes, without checking that $(x-2)$ cancels.
- **Repair**: Directly contrast $x=2$ (the factor $(x-2)$ appears in BOTH numerator and denominator, cancelling to leave $f$ simplified as $(x+1)/(x-3)$ near $x=2$, approaching a finite value $-3$ — a hole) against $x=3$ (the factor $(x-3)$ has no matching numerator factor, so $f$ genuinely blows up there — a vertical asymptote). Both start as "a zero of the denominator," but only one is a genuine asymptote.
- **Verification of death**: Given any rational function, the learner checks EACH zero of the denominator individually for a cancelling numerator factor before classifying it as a hole or a vertical asymptote — never applying a blanket rule to all of them at once.

### MC-3: END-BEHAVIOR-ASSUMED-INDEPENDENT-OF-DEGREE
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner believes a rational function's end behavior depends only on both parts being polynomials, missing that comparing $\deg(p)$ to $\deg(q)$ determines horizontal-, slant-, or no-asymptote behavior.
- **Why this birth type**: Having only seen "polynomial over polynomial" as the defining feature of the function family, the learner over-generalizes that shared type-membership into a claim of shared long-run behavior, since no earlier experience has yet demonstrated that the RELATIVE degrees (not the mere fact of being polynomials) is what actually varies the outcome.
- **Detection probe**: "$f(x)=\dfrac{1}{x^2-4}$ and $g(x)=\dfrac{x^3+1}{x^2-4}$ share the same denominator. Do they have the same end behavior?" — a learner holding this misconception says yes, since "both are polynomial over polynomial."
- **Repair**: Compute all three degree-comparison cases on the SAME denominator $x^2-4$: $1/(x^2-4)\to0$ ($\deg(p)=0<\deg(q)=2$); $(2x^2+1)/(x^2-4)\to2$ ($\deg(p)=\deg(q)=2$, ratio of leading coefficients); $(x^3+1)/(x^2-4)$ has a slant asymptote ($\deg(p)=3=\deg(q)+1$). Holding the denominator fixed isolates the numerator's degree as the single variable determining which case applies.
- **Verification of death**: Given two rational functions sharing a denominator but differing numerator degrees, the learner correctly predicts they have DIFFERENT end behaviors before computing either, citing the degree comparison as the reason.

## Analogies
1. **The borrowed rule, not a new one (for MC-1)**: needing to avoid a denominator of zero is like needing to avoid a locked door on ANY hallway you walk down — rational functions don't introduce a new kind of locked door, they simply have a specific, findable location for where that (already-familiar) locked door happens to be.
2. **The disguised twin (for MC-2)**: a hole and a vertical asymptote at first glance are identical twins — both start from "the denominator is zero here." The cancellation check is the one distinguishing feature (like a hidden birthmark) that tells them apart, and skipping that check means mistaking one twin for the other.
3. **The tug-of-war with an unequal number of players (for MC-3)**: numerator and denominator are two teams pulling on a rope; whichever team has the higher-degree "anchor player" wins as $x$ grows large, and exactly how MUCH bigger their anchor is (equal, one degree ahead, more than one degree ahead) determines whether the rope settles at zero, at a fixed ratio, or keeps sliding without bound.

## Demonstrations
1. **D1 — Domain from a familiar fact.** Factor the denominator of a rational function live, find its zeros, and state the domain — narrating explicitly that no new rule was invoked beyond "division by zero is undefined."
2. **D2 — The disguised-twin contrast.** Present a single rational function with one cancelling and one non-cancelling denominator zero in the SAME expression, classifying each live and showing the cancellation check is the only distinguishing move.
3. **D3 — Same denominator, three end behaviors.** Hold the denominator fixed across three numerators of increasing degree, computing each end behavior live to isolate degree comparison as the deciding variable.

## Discovery Questions
1. "Is finding a rational function's domain really a brand-new rule, or is it the same 'no dividing by zero' fact you already know, just applied by factoring the denominator?"
2. "Two rational functions have the exact same denominator. Could they still have completely different behavior as $x$ grows very large? What would have to differ between them?"
3. "A zero of the denominator can be either a hole or a vertical asymptote. What ONE thing about the numerator determines which it is?"

## Teaching Sequence
Entry stage: Concrete (analyzing one specific rational function's domain and asymptotic behavior directly, before naming the general classification).
1. Domain from a familiar fact (D1) — pre-empting MC-1 by tying the domain rule directly back to ordinary division-by-zero.
2. The disguised-twin contrast (D2) — directly confronting MC-2 with a single worked example containing both cases.
3. Same denominator, three end behaviors (D3) — isolating degree comparison as the deciding variable, pre-empting MC-3.
4. Transfer probe (P76, independence mode): a cost-per-unit economic model with a cancelling and a non-cancelling excluded point, plus a degree-comparison prediction of the model's long-run behavior as production scales up.

## Tutor Actions
1. Before stating a rational function's domain, ask the learner to name the exact prior fact they're applying ("division by zero is undefined") rather than accepting a domain answer produced from a memorized rule with no stated justification.
2. Whenever the denominator has a zero, require the learner to check the numerator for a matching factor BEFORE classifying it as a hole or an asymptote — never let "it's a denominator zero" alone stand as a complete classification.
3. When comparing two rational functions' end behavior, ask the learner to state the degree of each numerator and denominator explicitly before predicting the outcome, rather than reasoning from "they're both rational functions" alone.

## Voice Teaching Notes
- **Register**: proficient/understand — this concept combines two already-mastered pieces (`math.alg.rational-expressions`'s cancellation and `math.func.polynomial-function`'s function view) rather than introducing deep new machinery; language should emphasize the combination, not present the content as wholly novel.
- **Load-bearing sentence**: "A rational function's domain excludes wherever the denominator is zero — that's it, the same rule you already know. Whether that zero is a hole or an asymptote depends on one thing: does it cancel?"
- **Wait time note**: after presenting a rational function with a denominator zero, pause long enough for the learner to attempt checking the numerator for a matching factor unprompted — this is the single most diagnostic moment for catching MC-2 before it hardens into a blanket rule.

## Assessment Signals
1. Correctly finds the domain of a rational function by factoring the denominator and locating its zeros, citing division-by-zero as the justification.
2. Correctly classifies a given denominator zero as a hole (cancelling factor present) or a vertical asymptote (no cancelling factor), with explicit justification via the numerator check.
3. Given two rational functions sharing a denominator but differing numerator degree, correctly predicts different end behaviors before computing either.
4. Correctly states, at orientation level, which of the three degree-comparison cases (horizontal at 0, horizontal at a ratio, or slant) applies to a given rational function.
5. **P76 Transfer Probe** (independence mode): given a cost-per-unit economic model with both a cancelling and a non-cancelling excluded point, correctly classifies each and predicts the model's long-run behavior via degree comparison, interpreting the result economically.

## Tutor Recovery Strategy
If a learner defaults to "every denominator zero is an asymptote" (MC-2) even after correction, do not simply restate the rule — return to the disguised-twin demonstration and have the learner physically factor BOTH numerator and denominator of a fresh example, checking for a shared factor before making any classification claim. If a learner correctly classifies a hole versus an asymptote but then claims the rational function is "not really defined" at a hole in some deeper sense beyond the single missing point, clarify that a hole means the function IS well-defined and continuous immediately around that point — only the single exact input is excluded.

## Memory Hooks
1. "No dividing by zero — find where the denominator vanishes, and that's your domain exclusion."
2. "Same zero, two possible fates — check for a cancelling factor to know which one you've got."
3. "Compare the degrees to see who wins the tug-of-war as $x$ grows large."

## Transfer Connections
- `math.alg.rational-expressions` — this concept's own prerequisite; its factoring-and-cancellation machinery is directly reused here to distinguish holes from vertical asymptotes.
- `math.func.polynomial-function` — this concept's own prerequisite; the polynomial functions $p,q$ this concept combines via division.
- `math.func.end-behavior` — that concept's own orientation-level rational-function extension (degree comparison producing horizontal/slant asymptotes) is the direct forward continuation this entry's LO3 sets up; the full case analysis lives there as a transfer probe on the polynomial side, and here as core content on the rational-function side.

## Cross-Subject Connections
- Physics: concentration or intensity models that fall off as $1/r^2$ or similar ratio forms are rational functions whose domain exclusion (undefined at $r=0$) and end behavior (approaching zero at large distance) both directly apply this concept's reasoning.
- Economics: a cost-per-unit function is a canonical rational-function model, and this concept's own transfer probe uses exactly that framing — the excluded-point classification and long-run degree-comparison trend both carry direct economic interpretations (an undefined production level, or cost stabilizing versus growing without bound).

## Blueprint References
- `docs/curriculum/blueprints/math.func.rational-function.md` — fully reused by reference. This Blueprint's Misconception Registry table does NOT include an explicit birth-type column (matching `math.func.polynomial-function`'s Blueprint from an earlier batch in this campaign, and distinct from the two other Blueprints read this batch, `math.func.end-behavior` and `math.func.rational-root`, both of which do carry explicit classifications). All 3 misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 5, MC-2 Type 2, MC-3 Type 1), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration). The recurring process-level finding continues: this is the second Blueprint in this campaign (after `math.func.polynomial-function`) whose Misconception Registry table lacks the explicit birth-type column present in most other Blueprints — worth flagging to the Curriculum Production Pipeline as a possible authoring-pass gap affecting a subset of Blueprints, though it does not affect this entry's completeness.

## Version History
- **Batch 34** (2026-09-13): initial authoring, part 2 of 3 this batch (with `math.func.end-behavior`, `math.func.rational-root`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions independently classified (MC-1 Type 5, MC-2 Type 2, MC-3 Type 1) since this Blueprint's Misconception Registry lacks an explicit birth-type column.
