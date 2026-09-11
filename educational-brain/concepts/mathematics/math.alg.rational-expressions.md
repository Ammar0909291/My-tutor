# math.alg.rational-expressions

## Identity
- **KG ID**: `math.alg.rational-expressions`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.polynomial` — load-bearing part: a rational expression is by definition a ratio of
    two polynomials p(x)/q(x); without the polynomial vocabulary (degree, terms, coefficients)
    already secure, "numerator" and "denominator" here have no structured object to refer to.
  - `math.alg.factoring` — load-bearing part: simplifying a rational expression and finding a
    common denominator for addition/subtraction both depend directly on the ability to fully
    factor a polynomial; without that skill already secure, neither the cancellation step nor the
    LCD-building step has a starting point.
- **Unlocks**: `math.alg.rational-equations`, `math.func.rational-function`
- **Cross-links**: `math.func.rational-function` (not yet authored — verified against the live EB
  directory; P76 mode = independence per the Blueprint's own verification)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.alg.rational-expressions.md` (reused by reference
  throughout)
- **KG children** (not yet authored — `math.alg.rational-expressions-addition`,
  `math.alg.rational-expressions-multiplication`): this entry teaches all four arithmetic
  operations together per the Blueprint's own compression strategy (one direct contrast with
  numeric-fraction arithmetic covers both operation pairs); when those child nodes are authored,
  they specialise one operation-pair each from this entry's already-established framework.

## Learning Objective
- The learner can define a rational expression as p(x)/q(x) with p, q polynomials and q(x)≠0, and
  can correctly determine its domain restriction — the values of x that make the ORIGINAL
  denominator zero — before any simplification is performed.
- The learner can simplify a rational expression by fully factoring numerator and denominator and
  cancelling only genuinely shared multiplicative factors, while correctly recognising that
  cancelling a factor does NOT remove the domain restriction that factor created — the simplified
  form is equivalent to the original only away from the excluded values.
- The learner can perform all four arithmetic operations on rational expressions (+, −, ×, ÷) by
  applying the identical procedures already fluent for numeric fractions (common denominators for
  addition/subtraction, multiply-straight-across-then-simplify for multiplication,
  multiply-by-reciprocal for division), with polynomial factoring replacing integer factoring
  throughout.

## Core Understanding
A rational expression p(x)/q(x), where p and q are polynomials and q(x)≠0, is the direct algebraic
generalisation of a numeric fraction — every rule already fluent for numbers (simplify by
factoring and cancelling; the four arithmetic operations) applies here with polynomial factoring
standing in for integer factoring. The one genuinely new idea, with no numeric-fraction
counterpart, is the DOMAIN RESTRICTION: because division by zero is undefined, every value of x
making the ORIGINAL denominator zero must be permanently excluded from the expression's domain —
and this exclusion is a property of the original expression as GIVEN, not of whatever simplified
form it eventually takes. When a rational expression is simplified by factoring numerator and
denominator completely and cancelling a shared factor, the cancelled factor's excluded value does
NOT reappear in the domain merely because it no longer appears syntactically in the simplified
denominator — the simplified expression is only a faithful stand-in for the original away from
that excluded point, which is now an invisible "hole" rather than a visible restriction. The four
arithmetic operations mirror numeric fraction rules exactly: multiplication multiplies straight
across then simplifies; division multiplies by the reciprocal; addition and subtraction require a
genuine common denominator (typically the LCD built from each denominator's factored form) — never
combining numerators and denominators independently, which is not a valid operation for fractions
of any kind, numeric or algebraic.

## Mental Models
1. **Beginner — a rational expression is just a fraction with polynomials instead of numbers; the
   same rules apply.** Factor, cancel, simplify — exactly like 18/24 reducing to 3/4.
   *Upgrade trigger*: a request to state the DOMAIN of a rational expression, which has no
   equivalent question for a plain numeric fraction. *Shelf life*: one session.
2. **Intermediate — a rational expression carries an invisible domain restriction that survives
   simplification, even when the simplified form no longer displays it.** The original
   denominator's zeros are permanently excluded; cancellation changes appearance, never the
   underlying domain. *Upgrade trigger*: a multi-step problem (e.g. multiplying two rational
   expressions) where an excluded value from ONE original factor must be carried through the
   entire computation to the final answer. *Shelf life*: durable once "check the ORIGINAL
   denominator, always" becomes a reflex independent of how far simplification has progressed.
3. **Advanced — cancelling a factor creates a genuine mathematical distinction between the original
   and simplified expressions (they are equal only on a restricted domain), not merely a cosmetic
   shortening.** The simplified form and the original are technically different functions that
   happen to agree everywhere except at the cancelled point. *Upgrade trigger*: this concept's own
   unlock, `math.func.rational-function`, where this exact distinction becomes the formal
   hole-versus-vertical-asymptote classification.
4. **Expert — rational expressions, their domain restrictions, and their arithmetic are the direct
   algebraic scaffolding for rational FUNCTIONS, where the same cancelled-factor logic reappears as
   the removable-hole/vertical-asymptote distinction.** *Shelf life*: permanent, and it is exactly
   the connection this concept's own Blueprint names as future cross-link work once
   `math.func.rational-function` is authored.

## Why Students Fail
The single most frequent and consequential failure, ranked FOUNDATIONAL ahead of the arithmetic-
operation misconceptions in the Blueprint's own registry, is determining a rational expression's
domain restriction from the SIMPLIFIED expression's denominator rather than the ORIGINAL,
pre-cancellation denominator — for (x²−9)/(x²+x−12), correctly factoring to (x−3)(x+3)/[(x+4)(x−3)]
and correctly cancelling (x−3) to reach (x+3)/(x+4), but then stating the domain restriction as
merely "x≠−4" (reading only the simplified denominator) instead of the full, correct "x≠−4, 3" —
this error is especially dangerous because the resulting answer LOOKS entirely correct on visual
inspection of the final simplified form, and only a deliberate check against the original
expression reveals the missing excluded value. The second failure is attempting to cancel a term
that is ADDED, not multiplied, within the numerator or denominator, treating it as though it were a
shared multiplicative factor — for an expression like (x+3)/x, incorrectly "cancelling" the x terms
to reach 3, when cancellation is only valid for a factor that divides the ENTIRE numerator and the
ENTIRE denominator, never for a term that is merely present as an addend inside a larger sum. The
third failure is adding or subtracting rational expressions by combining numerators and
denominators independently — a/b + c/d treated as (a+c)/(b+d) — which is not a valid operation for
fractions of any kind; this exact error, demonstrated on plain numbers (1/4 + 1/6 ≠ 2/10 = 1/5,
since the correct answer is 5/12), makes the invalidity immediately concrete even before any
polynomial is involved, confirming the rational-expression case inherits the identical requirement
for a genuine common denominator that numeric fractions have always required.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — DOMAIN-FROM-SIMPLIFIED-FORM-ONLY** (FOUNDATIONAL)
  - **Birth type**: Type 4, notation-induced — the simplified expression's denominator is the only
    denominator visibly present after cancellation, so the domain-restriction rule (find zeros of
    the denominator) is applied to what is literally written on the page rather than to the
    original expression the notation has silently replaced.
  - **Characteristic phrase**: for (x²−9)/(x²+x−12) simplified to (x+3)/(x+4), stating the domain
    restriction as "x≠−4" only, omitting the x=3 restriction that was present before cancellation.
  - **Detection probe**: ask for the domain of a simplified rational expression whose original
    denominator had a now-cancelled factor — an incomplete answer (missing the cancelled value)
    confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-anchor explicitly: the domain is a property of the
    ORIGINAL expression as given; simplification changes the expression's appearance, never its
    domain. Always determine the domain restriction from the original, pre-cancellation
    denominator, before or independently of simplifying.
  - **Verification of death**: given several simplification problems each involving a cancelled
    factor, the learner correctly states the FULL domain restriction (including the cancelled
    value) every time, checked against the original denominator rather than the simplified one.

- **MC-2 — CANCELING-ADDED-TERMS** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the valid rule "cancel a factor shared by
    numerator and denominator" is overextended to any visually matching symbol, regardless of
    whether that symbol is a genuine multiplicative factor of the WHOLE numerator/denominator or
    merely one addend within a larger sum.
  - **Characteristic phrase**: for (x+3)/x, incorrectly "cancelling" the x terms to reach 3 (or
    equivalently 3/1), treating x as if it divided the entire numerator.
  - **Detection probe**: present (x+3)/x and ask whether the x terms cancel to give 3 — an
    incorrect "yes" confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-derive from the numeric analogy: no one would
    claim (7+3)/7 = 3 by "cancelling the 7s," because 7 is not a factor of the WHOLE numerator
    7+3=10. The same restriction — only cancel true multiplicative factors of the entire
    numerator/denominator — applies identically here.
  - **Verification of death**: given a mixed set of expressions where a symbol is sometimes a
    genuine shared factor and sometimes merely an addend, the learner correctly distinguishes the
    two cases every time before attempting any cancellation.

- **MC-3 — ADD-NUMERATORS-AND-DENOMINATORS-SEPARATELY** (moderate)
  - **Birth type**: Type 1, overgeneralisation — the correct multiplication rule (multiply
    numerators together, multiply denominators together) is overextended to addition/subtraction,
    where the analogous "combine straight across" operation is not valid.
  - **Characteristic phrase**: computing a/b + c/d as (a+c)/(b+d) instead of finding a genuine
    common denominator.
  - **Detection probe**: ask the learner to add two rational expressions with different
    denominators and check whether numerators and denominators are combined independently rather
    than via an LCD — independent combination confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-derive from the numeric counterexample
    1/4 + 1/6 ≠ 2/10 = 1/5 (the correct answer is 5/12), confirming the LCD procedure is required,
    not optional, for both numeric and rational-expression addition.
  - **Verification of death**: given several rational-expression addition/subtraction problems,
    the learner correctly builds the LCD from the factored form of each denominator every time,
    without attempting the independent-combination shortcut.

## Analogies
- **Converting between currencies with a fixed, invisible exchange restriction.** Simplifying a
  rational expression is like converting a price to a simpler-looking currency display, but certain
  original transaction amounts remain permanently flagged as invalid (the domain restriction)
  regardless of how the display is later simplified — the flag travels with the ORIGINAL
  transaction, not with whatever display format is currently shown. *Where it holds*: the
  "restriction survives reformatting" structure of MC-1's repair. *Where it breaks*: a currency
  conversion has no equivalent of "cancelling a shared factor," so this analogy should be paired
  with, not substituted for, the direct fraction-simplification demonstration below.
- **A shared recipe scaled by a common multiplier.** Adding two fractions with different
  denominators is like combining two recipes measured in different-sized cups — you cannot simply
  add "3 cups" and "5 spoons" directly; both must first be converted to a shared unit (the LCD)
  before combining. *Where it holds*: the "must share a common unit before combining" requirement,
  directly targeting MC-3. *Where it breaks*: recipe units convert via a single fixed ratio, while
  building an LCD from polynomial denominators requires factoring each one first — the analogy
  illustrates the necessity of a common unit, not the polynomial-factoring mechanics required to
  find it.

## Demonstrations
1. **The bridge from numeric to symbolic simplification, establishing the shared procedure.**
   Simplify 18/24 by factoring (2·3²)/(2³·3) and cancelling common factors (one 2, one 3), landing
   on 3/4. State: "the exact same idea — factor completely, cancel what's shared — applies when
   numerator and denominator are polynomials instead of integers."
2. **Simplification with full domain-restriction tracking, directly confronting MC-1.** Simplify
   (x²−9)/(x²+x−12) and state the domain restriction. Factor: [(x−3)(x+3)]/[(x+4)(x−3)]. Cancel
   (x−3): result (x+3)/(x+4). Domain restriction: the ORIGINAL denominator is zero at x=−4 AND
   x=3 — both excluded, even though the simplified form only visibly shows x≠−4. Full correct
   domain statement: x≠−4, 3.
3. **Multiplication contrasted directly with its numeric analogue, directly confronting MC-2.**
   Numeric: 2/3 × 5/4 = 10/12 = 5/6 (multiply straight across, THEN simplify — never cancel before
   fully multiplying out or across unrelated numerator/denominator pairs). Rational: (x+2)/(x−1) ×
   (x²−1)/(x²−4) = [(x+2)(x−1)(x+1)]/[(x−1)(x−2)(x+2)] (factoring x²−1=(x−1)(x+1),
   x²−4=(x−2)(x+2)). Cancel (x+2) and (x−1): result (x+1)/(x−2). State explicitly: you can only
   cancel a factor that is truly a MULTIPLIED factor of both the whole numerator and the whole
   denominator, never a term inside a sum.
4. **Addition via a genuine LCD, contrasted directly with the invalid shortcut, directly confronting
   MC-3.** Numeric: 1/4 + 1/6, LCD=12, correct result 3/12+2/12=5/12 (NOT (1+1)/(4+6)=2/10=1/5).
   Rational: 3/(x−2) + 5/(x+1), LCD=(x−2)(x+1). Rewrite: [3(x+1)]/[(x−2)(x+1)] +
   [5(x−2)]/[(x−2)(x+1)] = [3(x+1)+5(x−2)]/[(x−2)(x+1)] = (3x+3+5x−10)/[(x−2)(x+1)] =
   (8x−7)/[(x−2)(x+1)]. Same identical LCD-building process in both the numeric and rational case.

## Discovery Questions
- "You simplified (x²−9)/(x²+x−12) to (x+3)/(x+4). Before you look at the simplified form, go back
  to the ORIGINAL expression — what values of x make the original denominator zero?" — surfaces
  MC-1 by forcing attention back to the pre-cancellation expression.
- "In (x+3)/x, is the x on top being MULTIPLIED by something, or ADDED to something? Does that
  change whether you can cancel it with the x on the bottom?" — surfaces MC-2 by requiring the
  learner to classify the structural role of the term before attempting cancellation.
- "Try adding 1/4 + 1/6 by just adding the tops and adding the bottoms: (1+1)/(4+6). Now compute
  1/4 + 1/6 the way you know is correct. Do the two answers match?" — surfaces MC-3 using a
  concrete numeric counterexample before any polynomial is involved.

## Teaching Sequence
1. **Anchor**: connect explicitly to already-fluent numeric fraction simplification and arithmetic
   — every rule here is the identical numeric-fraction rule with polynomial factoring standing in
   for integer factoring.
2. **Introduce the domain restriction as the one genuinely new idea**, stated BEFORE simplification
   is taught: "before you simplify, ask what values of x make the ORIGINAL denominator zero — those
   are permanently excluded, and cancelling a factor doesn't bring them back."
3. **Teach simplification with the domain-restriction check built in from the first example**
   (Demonstration 2), directly pre-empting MC-1 by making the two-step habit (factor-and-cancel,
   THEN separately confirm the domain against the original) automatic from the start.
4. **Teach multiplication/division via direct numeric contrast** (Demonstration 3), explicitly
   stating the "only cancel a true multiplicative factor of the WHOLE numerator/denominator" rule,
   pre-empting MC-2.
5. **Teach addition/subtraction via direct numeric contrast with the invalid shortcut shown
   failing** (Demonstration 4), pre-empting MC-3 by making the wrongness of the independent-
   combination approach concrete on plain numbers first.
6. **Practice mixed problems** deliberately combining simplification-with-domain-tracking and all
   four arithmetic operations, always requiring the domain restriction to be stated from the
   original expression regardless of how far simplification has progressed.
7. **Bridge forward**: state explicitly that the exact "cancelled factor vs. surviving factor"
   distinction taught here reappears, formalised, in `math.func.rational-function` as the
   removable-hole-versus-vertical-asymptote distinction.

## Tutor Actions
- Before accepting any simplified rational expression's domain statement, ask "what was the
  ORIGINAL denominator, before you cancelled anything?" — this single question directly defends
  against MC-1 by forcing the check back to the correct source.
- Before accepting any cancellation, ask "is this symbol multiplied by everything else in the
  numerator/denominator, or is it added to something?" — targeting MC-2 at the exact moment the
  error would be made.
- Before accepting any addition/subtraction result, ask "did you find a genuine common
  denominator, or did you combine the tops and bottoms separately?" — targeting MC-3 directly.
- Never accept a domain-restriction answer without an explicit reference back to the original,
  pre-simplification denominator shown in the work — even when the final answer happens to be
  correct, the source of the answer matters for building the durable habit.

## Voice Teaching Notes
- When stating the domain-restriction rule aloud, place clear verbal emphasis on "ORIGINAL": "go
  back to the ORIGINAL denominator" — spoken emphasis reinforces that this is the one non-negotiable
  anchor point, directly countering MC-1's tendency to default to whatever is currently visible.
- When demonstrating cancellation, narrate the structural check aloud before performing it:
  "is this a MULTIPLIED factor... or is it just sitting there ADDED?" — voicing the question models
  it as a habitual check, targeting MC-2.
- When demonstrating addition, speak the numeric counterexample with genuine surprise or emphasis
  at the mismatch: "one-fifth? Let's check — does that actually equal one quarter plus one sixth?"
  — the audible moment of discovering the mismatch reinforces MC-3's repair more durably than a
  flatly stated correction.

## Assessment Signals
- **Correct + fast + states the domain from the original denominator unprompted** → MASTERED;
  ready for `math.alg.rational-equations` and, eventually, `math.func.rational-function`.
- **Simplification correct, domain restriction incomplete (missing the cancelled value)** → MC-1
  active; needs the original-denominator-anchoring repair before advancing.
- **Cancels an added term as if it were a multiplicative factor** → MC-2 active; needs the
  numeric-counterexample repair.
- **Adds/subtracts by combining numerators and denominators independently** → MC-3 active; needs
  the LCD-procedure repair, reinforced with the numeric counterexample.
- **Cannot factor the numerator or denominator at all** → prerequisite gap in `math.alg.factoring`,
  not a rational-expressions-specific misconception; route back to that concept rather than
  re-teaching this concept's domain/arithmetic content on top of an unstable factoring foundation.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration that "the simplified answer
was right, so why does the domain matter," directly validate that the SIMPLIFIED EXPRESSION is
indeed correct — the error is specifically in the domain STATEMENT, not in the algebra performed;
separate the two explicitly so the correction doesn't feel like their whole answer was wrong when
only one follow-up claim was incomplete. If a learner continues to attempt cancelling added terms
(MC-2) after one correction, do not simply repeat the rule — instead present a deliberately absurd
numeric parallel (e.g. "does 7 cancel in (7+3)/7?") and let the learner compute both sides
independently, since an abstract restated rule is less durable than a concrete self-checked
counterexample for this specific error.

## Memory Hooks
- "The original denominator never forgets" — the domain-restriction persistence rule, directly
  targeting MC-1.
- "Only cancel what's multiplied, never what's added" — the cancellation-validity rule, directly
  targeting MC-2.
- "Same bottom before you add the tops" — the LCD-first rule for addition/subtraction, directly
  targeting MC-3.
- "Factor first, always" — reused deliberately from `math.alg.factoring-gcf`'s own opening habit,
  since every operation in this concept (simplification, LCD-building) genuinely depends on
  factoring being performed first.

## Transfer Connections
- **`math.alg.rational-equations`** (direct unlock): solving equations involving rational
  expressions builds directly on this concept's domain-restriction awareness (an equation's
  solution set must exclude any value that makes a denominator zero) and simplification skill.
- **`math.func.rational-function`** (direct unlock, not yet authored): the function-theoretic
  treatment of rational expressions — vertical asymptotes, removable holes, end behaviour — is a
  direct formalisation of the exact "cancelled factor vs. surviving factor" distinction this
  concept's MC-1 repair already establishes; a cancelled factor becomes a removable hole, a
  surviving denominator factor becomes a vertical asymptote.
- **`math.alg.factoring`** (prerequisite, reused): every simplification and every LCD-building step
  in this concept depends directly on the general factoring decision tree already being fluent.

## Cross-Subject Connections
- **Physics** (`phys.` optics, circuits): the thin-lens equation and parallel-resistor formulas
  both involve rational expressions requiring exactly this simplification and domain-restriction
  awareness (a resistor value of zero, or a focal length making a denominator vanish, has direct
  physical meaning tied to the algebraic domain restriction).
- **Chemistry** (`chem.` equilibrium, rate laws): equilibrium expressions and rate-law ratios are
  rational expressions in the reactant/product concentrations — simplifying them and correctly
  tracking which concentration values are physically/algebraically excluded (e.g. a zero
  concentration making a rate expression undefined) reuses this concept's domain-restriction
  reasoning directly.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.rational-expressions.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.8, estimated_hours 10, requires
  [math.alg.polynomial, math.alg.factoring], unlocks [math.alg.rational-equations,
  math.func.rational-function]); Component 6 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for (x²−9)/(x²+x−12),
  (x+2)/(x−1)×(x²−1)/(x²−4), 3/(x−2)+5/(x+1), reused directly in the Demonstrations above); the P76
  transfer probe (a pharmacology dose-ratio scenario requiring simplification, multiplication, and
  domain-restriction-persistence reasoning, independence mode since `math.func.rational-function` is
  not yet authored) — held in the Blueprint's own mastery-gate item bank, not restated here per the
  Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. The Blueprint's own Component 7 already documents its
  cross-link to `math.func.rational-function` as deferred (independence mode) pending that
  concept's own future authoring — recorded as a standing forward-work note, not a defect.

## Version History
- 2026-09-11 — Initial authoring (Batch 6 / math.alg Wave 8 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
