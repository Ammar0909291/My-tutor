# math.alg.rational-expressions-multiplication

## Identity
- **KG ID**: `math.alg.rational-expressions-multiplication`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.rational-expressions` — load-bearing part: this concept is a focused specialisation
    of that concept's own multiplication/division operation (already introduced there via one
    direct numeric contrast); without factoring-and-cancellation fluency already secure, the
    factor-first efficiency habit and cross-fraction cancellation content here has no foundation to
    extend.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.rational-expressions-multiplication.md`
  (reused by reference throughout)
- **KG note**: this concept's parent in the KG is `math.alg.rational-expressions`, whose own
  Educational Brain entry already introduced multiplication/division via one direct numeric
  contrast; this entry is the dedicated deep-dive the parent entry's own "KG children" note
  anticipated.

## Learning Objective
- The learner can multiply two rational expressions by multiplying numerators together and
  denominators together, THEN simplifying by cancelling common factors — and can state the more
  efficient alternative: factoring every numerator and denominator FIRST, before multiplying, so
  cancellation opportunities are visible immediately.
- The learner can divide two rational expressions by multiplying by the RECIPROCAL of the
  DIVISOR only — correctly identifying which of the two fractions is the divisor (the one after the
  ÷ symbol) and flipping only that one, never the dividend.
- The learner can recognise and cancel a factor that appears in ONE fraction's numerator and the
  OTHER fraction's denominator (a "diagonal" cancellation across the two original fractions), not
  merely factors appearing within a single fraction.

## Core Understanding
Multiplying rational expressions extends the already-fluent numeric-fraction rule directly: A/B ×
C/D = AC/BD — multiply numerators together, multiply denominators together, then simplify by
cancelling any factor common to the resulting numerator and denominator. The most efficient
approach reverses the usual order of operations intuition: rather than multiplying everything out
first and THEN searching for factors to cancel in the (now larger, expanded) result, factor every
numerator and denominator FIRST, while the pieces are still small and the shared factors are easy
to spot — this also reveals a cancellation opportunity that is easy to miss otherwise: a factor
that appears in ONE fraction's numerator can cancel directly with the SAME factor appearing in the
OTHER fraction's denominator, even though the two factors started out in different fractions
entirely, because multiplication combines everything into one shared numerator and one shared
denominator regardless of which original fraction each factor came from. Division follows the
identical numeric-fraction rule: A/B ÷ C/D = A/B × D/C — multiply by the RECIPROCAL of the divisor
(the second fraction, the one after the ÷ symbol), flipping ONLY that one; the dividend (the first
fraction) is never flipped, and flipping the wrong fraction (or both) produces a structurally
different, generally incorrect expression rather than merely an inefficient path to the right
answer.

## Mental Models
1. **Beginner — multiply straight across (tops together, bottoms together), then simplify by
   cancelling.** Directly mirrors already-fluent numeric fraction multiplication. *Upgrade
   trigger*: an expression where multiplying out first produces a large, hard-to-refactor
   polynomial — revealing that order of operations matters for efficiency even when it doesn't
   change the final answer. *Shelf life*: one session.
2. **Intermediate — factor everything FIRST, before multiplying, so cancellation opportunities are
   visible immediately rather than buried inside an expanded product.** Both approaches reach the
   same correct answer; factoring first is simply far more efficient and less error-prone.
   *Upgrade trigger*: a problem where a cancelling factor lives in a DIFFERENT fraction than the
   one it appears to belong to (a numerator-denominator pair split across the two original
   fractions). *Shelf life*: durable once "factor first" becomes the automatic default.
3. **Advanced — cancellation is not restricted to factors within a single fraction; a factor in one
   fraction's numerator can cancel against the identical factor in the OTHER fraction's
   denominator, because multiplication ultimately combines everything into one shared
   numerator/denominator regardless of origin.** *Upgrade trigger*: a chained multiplication of
   three or more rational expressions, where multiple diagonal cancellations must be tracked
   simultaneously.
4. **Expert — division is not a separate operation requiring new rules, but multiplication by a
   specific, correctly identified reciprocal — the entire skill reduces to correctly identifying
   which fraction is the divisor.** *Shelf life*: permanent, and this reduction (division as
   multiplication-by-reciprocal) is the identical principle already fluent from numeric fraction
   arithmetic, carried forward without modification.

## Why Students Fail
The most common failure, ranked moderate in the Blueprint's own registry because it produces a
correct-but-inefficient result rather than a wrong one, is multiplying numerators and denominators
out fully BEFORE attempting to factor and cancel — for (x²−4)/(x+3) × (x+3)/(x−2), expanding both
products into large polynomials and only then searching for common factors, which works but is far
more error-prone and labour-intensive than factoring each piece first (revealing (x+2)(x−2)/(x+3) ×
(x+3)/(x−2), where the (x+3) and (x−2) factors cancel immediately, without ever needing to expand
anything). The second and most consequential failure, marked foundational in the Blueprint's own
registry because it produces a structurally different — generally wrong — final expression rather
than merely an inefficient one, is flipping the WRONG fraction during division: for
(x+1)/(x−5) ÷ (x+1)/(x+2), incorrectly flipping the first (dividend) fraction, or both fractions,
instead of only the second (divisor) fraction — the rule is exactly as strict as its numeric-
fraction counterpart, where "only the fraction after the ÷ symbol gets flipped" has no exceptions.
The third failure is failing to recognise that a factor in one fraction's numerator can cancel with
the SAME factor in the OTHER fraction's denominator — for 2x/(x²−9) × (x−3)/4, missing that the
(x−3) factor, living in the second fraction's numerator, cancels directly against the (x−3) factor
inside the first fraction's factored denominator (x+3)(x−3), because a learner searching for
cancellation only WITHIN each individual fraction never considers pairing factors that started out
in different fractions.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — MULTIPLIED-BEFORE-FACTORING-INSTEAD-OF-AFTER** (moderate)
  - **Birth type**: Type 5, instruction-induced — the general "multiply straight across" rule for
    rational-expression multiplication is applied literally and immediately, without the
    "factor-first" efficiency habit being explicitly installed as the preferred default ordering of
    operations.
  - **Characteristic phrase**: multiplying (x²−4)(x+3) and (x+3)(x−2) out fully into expanded
    polynomials before attempting to identify and cancel any common factors.
  - **Detection probe**: review a submitted solution for a fully-expanded intermediate step before
    any factoring — confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-work the same problem factoring first, comparing
    the efficiency directly against the expand-first approach on the same problem.
  - **Verification of death**: given a multiplication problem with obvious shared factors, the
    learner factors first, unprompted, before attempting to multiply anything out.

- **MC-2 — WRONG-FRACTION-FLIPPED-DURING-DIVISION** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — "flip a fraction for division" is remembered as
    the operation's defining action without the specific target (only the divisor, never the
    dividend) being retained precisely, so the rule gets applied to whichever fraction is more
    salient rather than specifically the one after the ÷ symbol.
  - **Characteristic phrase**: for (x+1)/(x−5) ÷ (x+1)/(x+2), flipping the FIRST fraction (or both)
    instead of only the second.
  - **Detection probe** (verbatim, Blueprint): present Example 2 and check which fraction gets
    flipped — flipping anything other than the second (divisor) fraction confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-state the rule explicitly: only the DIVISOR, the
    fraction after ÷, gets flipped — connecting directly to the identical, already-fluent numeric-
    fraction division rule.
  - **Verification of death**: given several division problems, the learner correctly identifies
    and flips only the divisor fraction every time, without hesitation.

- **MC-3 — CROSS-FRACTION-CANCELLATION-MISSED** (moderate)
  - **Birth type**: Type 1, overgeneralisation — the valid rule "cancel a factor shared by
    numerator and denominator" is unconsciously scoped to mean "within the same fraction," missing
    that after multiplication combines everything, a factor's original fraction of origin is
    irrelevant to whether it can cancel.
  - **Characteristic phrase**: for 2x/(x+3)(x−3) × (x−3)/4, failing to notice that the (x−3) in the
    second fraction's numerator cancels against the (x−3) inside the first fraction's factored
    denominator.
  - **Detection probe** (verbatim, Blueprint): present Example 3 and check whether the (x−3)
    cancellation across the two fractions is spotted — a missed cancellation confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-combine both fractions into one single fraction
    (numerator×numerator over denominator×denominator) FIRST, making all cancellation
    opportunities visible in one place regardless of which original fraction each factor came from.
  - **Verification of death**: given a multiplication problem with a diagonal cancellation
    opportunity, the learner spots and executes it without being prompted to look across fractions.

## Analogies
- **Merging two separate shopping carts before checking for duplicate items.** Multiplying two
  rational expressions is like combining two separate shopping carts into one before checking for
  items that cancel out (a rebate coupon in one cart matching an item in the OTHER cart) — the
  cancellation opportunity only becomes visible once everything is viewed as one combined cart,
  regardless of which original cart each item came from. *Where it holds*: the "combine first,
  then scan for matches across the whole combined set" structure, directly targeting MC-3. *Where
  it breaks*: shopping carts don't require factoring before the comparison is meaningful — the
  algebraic case specifically needs each piece factored first for the matching items to even be
  visible, which the shopping-cart framing doesn't capture on its own.
- **A dance partner swap where only one dancer changes position.** Division as multiply-by-
  reciprocal is like a dance instruction where only ONE specific partner (the divisor) is told to
  swap positions — the other partner (the dividend) stays exactly where they are. *Where it holds*:
  the "only one specific, identified party changes" structure, directly targeting MC-2. *Where it
  breaks*: a dance swap is a physical, visually obvious action; identifying which fraction is
  actually "the divisor" (the one after ÷) requires a specific notational reading skill the dance
  analogy doesn't teach on its own.

## Demonstrations
1. **Factor-first multiplication, directly confronting MC-1.** Multiply (x²−4)/(x+3) × (x+3)/(x−2).
   Factor first: [(x+2)(x−2)]/(x+3) × (x+3)/(x−2). Cancel (x+3) and (x−2) immediately: result =
   x+2. Contrast: multiplying out first would require expanding (x²−4)(x+3) and (x+3)(x−2)
   separately, then re-factoring the large results to find the identical cancellation — far more
   work for the same answer.
2. **Division via the correctly-identified reciprocal, directly confronting MC-2.** Divide
   (x+1)/(x−5) ÷ (x+1)/(x+2). Flip the SECOND fraction only: (x+1)/(x−5) × (x+2)/(x+1). Cancel
   (x+1): result = (x+2)/(x−5). Note explicitly: the dividend, (x+1)/(x−5), was never touched.
3. **Diagonal cancellation across two fractions, directly confronting MC-3.** Multiply 2x/(x²−9) ×
   (x−3)/4. Factor: 2x/[(x+3)(x−3)] × (x−3)/4. The factor (x−3) appears in the FIRST fraction's
   denominator and the SECOND fraction's numerator — cancel it even though it started in different
   fractions, since after multiplying, all numerators and all denominators combine into one shared
   fraction anyway. Result: 2x/[(x+3)×4] = 2x/[4(x+3)] = x/[2(x+3)] (further simplifying the
   numeric factor of 2).

## Discovery Questions
- "You're about to multiply out (x²−4)(x+3) fully before looking for anything to cancel. What if
  you factored first instead — would that reveal any shortcuts?" — surfaces MC-1 by inviting the
  learner to compare the two approaches directly.
- "For (x+1)/(x−5) ÷ (x+1)/(x+2), which fraction comes right after the division sign? Is that the
  one you flipped?" — surfaces MC-2 by requiring the learner to locate the divisor precisely before
  checking their own work.
- "Look at the denominator of your first fraction, factored. Now look at the numerator of your
  second fraction. Do any of those factors match, even though they're in different fractions?" —
  surfaces MC-3 by directing attention explicitly across the fraction boundary.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure multiplication/division content already
   introduced in `math.alg.rational-expressions` — this concept deepens that introduction into a
   full, dedicated procedure with the factor-first efficiency habit and diagonal-cancellation
   awareness.
2. **Establish factor-first as the default from the very first example** (Demonstration 1),
   contrasted directly against the less-efficient expand-first approach, directly pre-empting MC-1.
3. **Teach division as multiplication by a precisely identified reciprocal** (Demonstration 2),
   with explicit emphasis on locating the divisor before flipping anything, directly pre-empting
   MC-2.
4. **Introduce diagonal cancellation explicitly, as its own named skill** (Demonstration 3), not
   left for the learner to discover unassisted, directly pre-empting MC-3.
5. **Practice mixed problems** deliberately combining straightforward within-fraction cancellation,
   diagonal cancellation, and division, always requiring factor-first as the standing default
   approach.
6. **Bridge forward**: state explicitly that both this concept's factor-first discipline and its
   sibling `math.alg.rational-expressions-addition`'s LCD-building discipline share the same
   underlying habit (factor before combining), reinforcing the general strategy rather than two
   unrelated procedures.

## Tutor Actions
- Before accepting any multiplication attempt, ask "have you factored every numerator and
  denominator yet, or are you about to multiply things out first?" — targeting MC-1 directly,
  before the less efficient path is taken.
- Before accepting any division setup, ask "which fraction is the divisor — the one right after the
  division sign? Is that the one you flipped?" — targeting MC-2 directly, at the exact setup step
  where the error would occur.
- After any multiplication with no obvious within-fraction cancellation, ask "look across BOTH
  fractions — does any factor in one fraction's numerator match a factor in the OTHER fraction's
  denominator?" — targeting MC-3 directly.
- Never accept a "cannot simplify further" claim without an explicit check for diagonal
  cancellation shown, even when the within-fraction cancellation has already been correctly
  identified.

## Voice Teaching Notes
- When demonstrating factor-first multiplication aloud, narrate the ordering explicitly: "factor
  everything first... NOW multiply" — audible emphasis on the sequence, targeting MC-1.
- When setting up a division problem aloud, say the divisor-identification step before naming any
  flip: "which one comes after the division sign... that's the one that flips" — targeting MC-2
  directly.
- When scanning for cancellation aloud, explicitly narrate looking across both fractions: "check
  this fraction's bottom... now check the OTHER fraction's top... any matches?" — modelling the
  diagonal-scan habit audibly, targeting MC-3.

## Assessment Signals
- **Correct + fast + factors before multiplying unprompted, including diagonal cancellations** →
  MASTERED.
- **Correct answer reached but via expand-then-factor rather than factor-first** → MC-1 active;
  efficiency repair, not a correctness repair — reinforce the factor-first default without implying
  the prior answer was wrong.
- **Division setup flips the dividend instead of (or in addition to) the divisor** → MC-2 active;
  needs the divisor-identification repair.
- **Correctly cancels within-fraction factors but misses a cross-fraction (diagonal) cancellation**
  → MC-3 active; needs the combine-into-one-fraction repair.
- **Cannot factor the numerators/denominators at all** → prerequisite gap in `math.alg.factoring`
  or `math.alg.rational-expressions`, not specific to this concept's multiplication/division
  content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and their answer was, in fact, correct, be explicit that
this is an EFFICIENCY correction, not a correctness correction — praise the correct final answer
genuinely before introducing the more efficient approach, since conflating "your method was
inefficient" with "your answer was wrong" risks undermining confidence unnecessarily. If MC-2
(the division flip) persists after one correction, avoid simply restating the rule a second time —
instead have the learner explicitly circle or underline the divisor fraction (the one after ÷)
before attempting anything else, since a concrete identification step performed before the flip is
more durable than a verbal rule alone for this specific, high-stakes setup error.

## Memory Hooks
- "Factor first, always" — reused deliberately from `math.alg.factoring-gcf`'s and
  `math.alg.rational-expressions`'s established opening habit, directly targeting MC-1.
- "Only the one after the sign flips" — the precise divisor-identification rule, directly targeting
  MC-2.
- "Check across, not just within" — the diagonal-cancellation reminder, directly targeting MC-3.

## Transfer Connections
- **`math.alg.rational-expressions`** (prerequisite, reused): this concept deepens that concept's
  own compressed introduction to multiplication/division into a full, dedicated procedure.
- **`math.alg.rational-expressions-addition`** (sibling, this same wave): both concepts share the
  identical "factor before combining" discipline, applied to different operations (LCD-building for
  addition; diagonal cancellation for multiplication).
- **`math.alg.rational-equations`** (indirect, via the sibling concept): the factor-first discipline
  installed here reinforces the same habit needed when clearing denominators in rational equations.

## Cross-Subject Connections
- **Physics** (`phys.` rates, combined-motion problems): a combined-speed or combined-rate
  calculation expressed as a product or quotient of rational expressions in distance/time variables
  reuses this concept's factor-first and reciprocal-division discipline directly — the Blueprint's
  own transfer probe uses exactly this scenario.
- **Chemistry** (`chem.` dosage/concentration ratios): multiplying two concentration ratios (e.g.
  combining a dilution factor with a rate expression) is a direct application of this concept's
  factor-first multiplication procedure.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.rational-expressions-multiplication.md` — Component 0
  (metadata: difficulty proficient, bloom apply, mastery_threshold 0.80, estimated_hours 5,
  requires [math.alg.rational-expressions]); Component 6 (Misconception Registry MC-1..MC-3,
  reused above with birth-type classification added); Component 4 (worked examples for
  (x²−4)/(x+3)×(x+3)/(x−2), (x+1)/(x−5)÷(x+1)/(x+2), 2x/(x²−9)×(x−3)/4, reused directly in the
  Demonstrations above); the P76 transfer probe (a rate-problem combined-speed scenario requiring
  correct reciprocal identification and factor-first cancellation, independence mode) — held in the
  Blueprint's own mastery-gate item bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. (The genuine KG/Blueprint prerequisite discrepancy found this
  wave concerns `math.alg.rational-equations` and `math.alg.rational-expressions-addition`, not
  this concept — recorded in those two entries.)

## Version History
- 2026-09-11 — Initial authoring (Batch 7 / math.alg Wave 9 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
