# math.alg.vietas-formulas

## Identity
- **KG ID**: `math.alg.vietas-formulas`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.polynomial-roots` — load-bearing part: Vieta's formulas connect a polynomial's
    COEFFICIENTS directly to symmetric functions of its ROOTS; without the already-secure concept
    of what roots are, and how a polynomial factors into root-based linear factors, the coefficient-
    to-root relationships this concept teaches have no structural anchor.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (MAMR = ⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.vietas-formulas.md` (reused by reference
  throughout)

## Learning Objective
- The learner can, for a quadratic ax²+bx+c, state the sum of roots as −b/a and the product of
  roots as c/a, and use these to answer questions about the roots WITHOUT solving the quadratic
  directly.
- The learner can extend Vieta's formulas to a CUBIC ax³+bx²+cx+d, correctly stating the sum of
  roots, the sum of pairwise products, and the product of all three roots, correctly tracking the
  alternating sign pattern as the degree of the symmetric function increases.
- The learner can use Vieta's formulas in REVERSE — given desired root properties (e.g. a specific
  sum and product), construct a polynomial having those roots.

## Core Understanding
Vieta's formulas relate a polynomial's coefficients directly to symmetric functions of its roots,
without ever needing to find the individual root values. For a QUADRATIC ax²+bx+c=0 with roots
r₁, r₂: sum of roots r₁+r₂=−b/a; product of roots r₁r₂=c/a. For a CUBIC ax³+bx²+cx+d=0 with roots
r₁, r₂, r₃: sum r₁+r₂+r₃=−b/a; sum of pairwise products r₁r₂+r₁r₃+r₂r₃=c/a; product r₁r₂r₃=−d/a —
note the ALTERNATING sign pattern as the degree of the symmetric function increases (sum: minus;
pairwise products: plus; full product: minus, for a cubic). These relationships come directly from
matching coefficients in the expanded factored form: a(x−r₁)(x−r₂)=ax²−a(r₁+r₂)x+ar₁r₂, so
comparing to ax²+bx+c term by term forces b=−a(r₁+r₂) and c=ar₁r₂, giving exactly −b/a and c/a —
the division by a is therefore structurally necessary, not an arbitrary extra step, whenever a≠1.
These relationships allow answering QUESTIONS about roots (sums, products, certain combinations)
directly from the coefficients, with no need to actually solve for the individual root values, and
they also work in REVERSE: given target root properties, a matching polynomial can be constructed
directly by substituting the desired sum and product into the formulas and solving backward for the
coefficients.

## Mental Models
1. **Beginner — for ax²+bx+c, the sum of roots is −b/a and the product is c/a; plug in the
   coefficients to get these values without solving.** *Upgrade trigger*: a non-unit leading
   coefficient (a≠1), where a naive "sum is −b, product is c" shortcut (correct only when a=1)
   silently fails. *Shelf life*: one session.
2. **Intermediate — the division by the leading coefficient a is always required, not optional,
   and becomes visibly necessary the moment a≠1.** *Upgrade trigger*: a cubic, where a THIRD
   symmetric function (the sum of pairwise products) appears, and the sign pattern alternates
   rather than staying fixed. *Shelf life*: durable once the always-divide-by-a habit and the
   sign-alternation awareness are both installed.
3. **Advanced — Vieta's formulas are not independent facts to memorise per degree, but the direct
   consequence of matching coefficients in the expanded factored form — a genuinely derivable
   relationship, not an arbitrary pattern.** *Upgrade trigger*: being asked to construct a
   polynomial from DESIRED root properties (the reverse direction), revealing that the same
   relationship runs both ways.
4. **Expert — Vieta's formulas let root-related questions be answered directly from a polynomial's
   coefficients, and equally let a polynomial be constructed directly from desired root properties,
   without ever performing full root-solving in either direction — a genuinely bidirectional tool,
   not a one-way computation.** *Shelf life*: permanent.

## Why Students Fail
The single most frequent failure, ranked foundational, is forgetting to divide by the leading
coefficient a — computing the sum and product as simply −b and c directly, rather than −b/a and
c/a; this error is especially insidious because it produces the CORRECT answer whenever a=1
(a common case in early practice), then silently fails once a non-unit leading coefficient
appears, producing a classic "worked until it didn't" pattern where the underlying misconception
was never surfaced by earlier, apparently-successful practice. The second failure occurs
specifically with the cubic case: misapplying the alternating sign pattern — for instance, using a
fixed negative sign for the product-of-three-roots term regardless of the polynomial's ACTUAL
coefficient signs, rather than correctly tracking −d/a's sign based on d and a's genuine values;
this reveals the sign pattern was memorised as a rote rule ("cubic products are negative") rather
than understood as a direct consequence of the specific coefficients involved. The third failure is
not recognising that Vieta's formulas can be used in REVERSE — given desired root properties (e.g.
"construct a quadratic whose roots sum to 5 and multiply to 6"), attempting a full root-solving
approach (guessing candidate polynomials and checking their roots) rather than directly substituting
the given sum and product into the formulas and solving backward for b and c — missing that the
SAME relationship that lets coefficients determine root properties also lets root properties
determine coefficients.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — LEADING-COEFFICIENT-DIVISION-OMITTED-IN-VIETAS-FORMULAS** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — practice on monic (a=1) examples, where −b and −b/a
    are numerically identical, generalises "sum is −b" as the rule, silently dropping the division
    by a that only becomes visible (and necessary) once a≠1.
  - **Characteristic phrase**: for 2x²−7x+3=0, computing the sum of roots as simply 7 (or −b=7)
    instead of the correct 7/2, omitting the division by a=2.
  - **Detection probe** (verbatim, Blueprint): presenting Example 1 and checking whether a is
    included in the division — omission confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-derive the formulas from the factored form
    a(x−r₁)(x−r₂)=ax²−a(r₁+r₂)x+ar₁r₂, matching coefficients explicitly to show WHY the division by
    a is structurally necessary, not an arbitrary extra step.
  - **Verification of death**: given several quadratics with non-unit leading coefficients, the
    learner correctly divides by a every time, without needing to be reminded.

- **MC-2 — CUBIC-VIETAS-SIGN-PATTERN-MISAPPLIED** (foundational)
  - **Birth type**: Type 5, instruction-induced — the alternating sign pattern is easy to present
    (and memorise) as a fixed rule ("cubic sum is negative, pairwise-product is positive, full
    product is negative") disconnected from its actual source, the specific signs of the
    polynomial's own coefficients d and a.
  - **Characteristic phrase**: applying a fixed sign to the product-of-roots term regardless of the
    actual computed values of d and a.
  - **Detection probe** (verbatim, Blueprint): presenting Example 2 and checking the sign used for
    the product-of-roots term — confirms MC-2 if it doesn't match the actual coefficient values.
  - **Repair**: Blueprint Repair Action B02 — re-verify against the factored/known-root case
    directly, confirming each formula's sign matches the actual computed values.
  - **Verification of death**: given several cubics with varying coefficient signs, the learner
    correctly computes each symmetric function's sign from the actual d and a values, not from a
    memorised fixed pattern.

- **MC-3 — VIETAS-FORMULAS-REVERSE-DIRECTION-NOT-RECOGNIZED** (moderate)
  - **Birth type**: Type 1, overgeneralisation — Vieta's formulas are first encountered as a
    "coefficients → root properties" tool, so their reverse applicability ("root properties →
    coefficients") is not automatically recognised as the same relationship run the other way.
  - **Characteristic phrase**: given a construction task ("build a polynomial with these root
    properties"), attempting a full root-solving or guess-and-check approach rather than direct
    substitution into the formulas.
  - **Detection probe** (verbatim, Blueprint): presenting Example 3's construction task and
    checking whether a full quadratic-formula approach is unnecessarily attempted — confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-derive directly from the reverse relationship,
    substituting the given sum/product values straight into −b/a and c/a.
  - **Verification of death**: given a root-property-to-polynomial construction task, the learner
    substitutes directly into the formulas without attempting an unnecessary root-solving detour.

## Analogies
- **A recipe's ingredient list versus its finished dish, readable in either direction.** Vieta's
  formulas relating coefficients to root properties are like a recipe connecting a finished dish's
  flavour profile to its exact ingredient quantities — you can predict the flavour from the
  ingredients (coefficients → root properties), or, just as validly, work backward from a desired
  flavour to determine the needed ingredient quantities (root properties → coefficients).
  *Where it holds*: the "same relationship, readable in either direction" structure, directly
  targeting MC-3. *Where it breaks*: a recipe's ingredient-to-flavour mapping is often approximate
  or subjective, while Vieta's formulas are an exact algebraic identity — the analogy conveys
  bidirectionality, not the derivability the Advanced mental model requires.
- **A scaled measurement that must be converted back to standard units before comparison.**
  Forgetting to divide by a is like reading a measurement in a non-standard unit (e.g. a scale
  factor of 2) and reporting it as if it were already in standard units — the raw number (−b or d)
  is correct only in the SCALED frame; dividing by a converts it to the frame where the sum/product
  interpretation genuinely holds. *Where it holds*: the "raw value needs a conversion step before
  it means what you think it means" structure, directly targeting MC-1. *Where it breaks*: a unit
  conversion is an external convention; the division by a here is a direct, derivable algebraic
  necessity (shown by matching coefficients), not an arbitrary convention to memorise.

## Demonstrations
1. **The quadratic case with explicit division by a, directly confronting MC-1.** For 2x²−7x+3=0:
   sum of roots=−(−7)/2=7/2; product of roots=3/2. Contrast the flawed shortcut: computing 7 and 3
   directly (dropping the division by a=2) gives the wrong values — verify by comparing against
   the factored-form derivation a(x−r₁)(x−r₂)=ax²−a(r₁+r₂)x+ar₁r₂, which shows the division by a is
   structurally forced by matching coefficients, not optional.
2. **The cubic case with sign-pattern verification against actual roots, directly confronting
   MC-2.** For x³−6x²+11x−6=0 (a=1): sum of roots=−(−6)/1=6; sum of pairwise products=11/1=11;
   product of roots=−(−6)/1=6. Verify directly: this factors as (x−1)(x−2)(x−3)=0, roots 1,2,3:
   sum=1+2+3=6 ✓, pairwise products=1×2+1×3+2×3=2+3+6=11 ✓, product=1×2×3=6 ✓ — every sign
   confirmed against the actual computed root values, not assumed from a fixed pattern.
3. **Working in reverse, directly confronting MC-3.** Construct a quadratic whose roots sum to 5
   and multiply to 6. Using Vieta's formulas in reverse: sum=−b/a=5 and product=c/a=6; choosing
   a=1 for simplicity: b=−5, c=6, giving x²−5x+6=0. Verify: factors as (x−2)(x−3), roots 2,3:
   sum=5 ✓, product=6 ✓ — reached directly by substitution, with no quadratic-formula solving or
   guess-and-check needed at any point.

## Discovery Questions
- "For 2x²−7x+3=0, what's the sum of the roots — just −b, or is there another step?" — surfaces
  MC-1 by requiring the learner to reconsider whether the leading coefficient plays a role.
- "You computed the product of the three roots for this cubic. Did you get that sign from the
  actual coefficients, or from a pattern you remembered?" — surfaces MC-2 by directing attention to
  the source of the sign, actual computation versus memorised rule.
- "You're asked to BUILD a quadratic with roots summing to 5 and multiplying to 6. Do you need to
  solve anything, or can you go directly from these numbers to the coefficients?" — surfaces MC-3
  by inviting the learner to recognise the direct, reverse-substitution route.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure `math.alg.polynomial-roots` — Vieta's
   formulas are a direct coefficient-to-root-property relationship building on that concept's own
   root/factor connection.
2. **Establish the quadratic case with the division-by-a derivation shown explicitly**
   (Demonstration 1), directly pre-empting MC-1 by grounding the division in the factored-form
   derivation, not merely stating it as a rule.
3. **Extend to the cubic case with every sign verified against actual known roots**
   (Demonstration 2), directly pre-empting MC-2 by never presenting the sign pattern as a
   standalone rule to memorise.
4. **Introduce the reverse-direction application explicitly, as its own dedicated focus**
   (Demonstration 3), directly pre-empting MC-3.
5. **Practice mixed problems** deliberately combining non-unit-leading-coefficient quadratics,
   cubics with varying coefficient signs, and reverse-construction tasks, always requiring the
   division by a and the actual-sign verification to be shown.
6. **Bridge forward**: note that these relationships generalise further to higher-degree
   polynomials (the general Vieta's formulas pattern), though this concept's own scope stops at the
   cubic case per its Learning Objectives.

## Tutor Actions
- Before accepting any sum-or-product-of-roots answer, ask "did you divide by the leading
  coefficient?" — this single question directly defends against MC-1.
- Before accepting any cubic sign, ask "is that sign coming from the actual coefficients you
  computed, or from a pattern you're recalling?" — targeting MC-2 directly.
- Before accepting a full root-solving attempt on a construction task, ask "do you actually need to
  solve anything here, or can you substitute directly?" — targeting MC-3 directly.
- Never accept a Vieta's-formula computation without the leading coefficient's role shown
  explicitly, even on problems where a=1 makes the division invisible.

## Voice Teaching Notes
- When stating the sum-of-roots formula aloud, always speak the full fraction: "minus b, OVER a" —
  never "minus b" alone, even when a=1 — the consistent audible fraction reinforces the always-
  divide habit, directly targeting MC-1.
- When stating a cubic sign aloud, narrate the derivation rather than the memorised pattern: "d is
  negative six, a is one, so minus d over a is... positive six" — the audible computation reinforces
  sign-from-actual-values over sign-from-pattern, targeting MC-2.
- When working a reverse-construction problem aloud, state the direction explicitly: "we're going
  BACKWARD — from the root properties TO the coefficients" — targeting MC-3.

## Assessment Signals
- **Correct + fast + always includes the division by a, verifies cubic signs against actual values,
  recognises reverse-construction tasks unprompted** → MASTERED.
- **Sum/product computed without dividing by a** → MC-1 active; needs the factored-form-derivation
  repair.
- **Cubic sign pattern applied by rote rather than from actual coefficient values** → MC-2 active;
  needs the actual-value-verification repair.
- **A reverse-construction task attempted via unnecessary full root-solving** → MC-3 active; needs
  the direct-substitution repair.
- **Cannot connect roots to a polynomial's factored form at all** → prerequisite gap in
  `math.alg.polynomial-roots`, not specific to this concept's coefficient-relationship content;
  route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses surprise that "it worked before," validate
this directly — the shortcut genuinely DOES work when a=1, so its earlier apparent success was not
a mistake to feel bad about; frame the correction as extending a rule that was accidentally too
narrow, not as fixing an error. If MC-2 persists after one correction, avoid simply restating "check
the actual signs" — instead have the learner compute a cubic's roots (or verify a known
factorisation) FIRST, then derive each Vieta sign from those concrete values, before being shown the
general coefficient-based formula, since deriving from a concrete case first is more durable than
being corrected on an abstract pattern.

## Memory Hooks
- "Always over a — never forget the denominator" — the division-by-leading-coefficient rule,
  directly targeting MC-1.
- "The sign comes from the numbers, not a memorised pattern" — the actual-value-verification habit,
  directly targeting MC-2.
- "The same formula runs both ways" — the reverse-direction applicability, directly targeting MC-3.

## Transfer Connections
- **`math.alg.polynomial-roots`** (prerequisite, reused): Vieta's formulas are a direct consequence
  of that concept's own root/factor relationship, viewed through coefficient-matching in the
  expanded factored form.
- **`math.alg.quadratic-equation`**, **`math.alg.quadratic-formula`** (indirect, sibling concepts):
  Vieta's formulas offer a genuine alternative to fully solving a quadratic when only root
  PROPERTIES (not the individual values) are needed — a faster route to certain questions than the
  full formula.
- **`math.alg.factoring-trinomials`** (indirect): the product/sum search procedure that concept
  teaches for factoring a monic trinomial is, in fact, Vieta's formulas' quadratic case applied in
  reverse (given a desired sum and product, find the corresponding roots) — though that concept
  does not name the connection explicitly, since it precedes this one in the domain's authoring
  order.

## Cross-Subject Connections
- **Economics** (`math.` supply-demand modelling): the Blueprint's own transfer probe uses a
  supply-demand equilibrium scenario where Vieta's formulas directly verify whether a given
  quadratic's structure is already consistent with a market constraint, without needing to solve
  for the equilibrium prices individually — a genuine "answer a question about roots without
  finding them" application.
- **Computer science** (`cs.` symbolic computation): computer algebra systems use coefficient-to-
  root relationships like Vieta's formulas as an efficient internal representation for reasoning
  about polynomial roots without numerically solving for them — the identical "properties without
  values" efficiency this concept teaches.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.vietas-formulas.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.75, estimated_hours 5, requires
  [math.alg.polynomial-roots]); Component 6 (Misconception Registry MC-1..MC-3, reused above with
  birth-type classification added); Component 4 (worked examples for 2x²−7x+3=0,
  x³−6x²+11x−6=0, and the sum-5/product-6 construction task, reused directly in the Demonstrations
  above); the P76 transfer probe (an economics supply-demand equilibrium scenario requiring both
  forward verification and reverse-direction reasoning, independence mode) — held in the
  Blueprint's own mastery-gate item bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Genuine unnamed connection identified, recorded not fixed**: `math.alg.factoring-trinomials`'s
  own product/sum search procedure (find two numbers multiplying to c/ac and summing to b) is, in
  substance, Vieta's quadratic-case formulas applied in reverse, though that entry (authored
  earlier in this domain's wave sequence, before this concept existed in the EB tree) does not name
  the connection explicitly. Not fixed (no prior entry modified); recorded here as the
  forward-pointing half of the cross-reference, since this program's convention is to record such
  connections going forward rather than retroactively editing already-certified content.
- No other genuine content-overlap or metadata discrepancy was found against any already-authored
  sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 12 / math.alg Wave 12 part 3 of the Mathematics Educational
  Brain completion campaign). Blueprint reused by reference in full. No KG or Blueprint file
  modified.
