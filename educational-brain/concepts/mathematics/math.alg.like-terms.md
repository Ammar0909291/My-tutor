# math.alg.like-terms

## Identity
- **KG ID**: `math.alg.like-terms`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.term` — load-bearing part: that an expression decomposes into terms at the + and − signs, and that the sign travels with the term it precedes. Without a reliable term count there is nothing to compare.
  - `math.alg.coefficient` — load-bearing part: that a term factors into a numerical part and a variable part, and that the numerical part can be invisible (1, −1). This concept is entirely about comparing the variable parts while adding the numerical ones.
- **Unlocks**: `math.alg.simplification`
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.alg.like-terms.md` (reused by reference throughout)

## Learning Objective
- The learner can decide, for any two terms, whether they are like terms, by comparing variable parts symbol-for-symbol and exponent-for-exponent.
- The learner can combine like terms by adding or subtracting only the coefficients, leaving the variable part untouched.
- The learner can state, when two terms are unlike, that the expression is already as simple as it gets, and resist combining them.
- The learner can handle the invisible coefficients: x + x = 2x, and x − x = 0 rather than x.

## Core Understanding
Two terms are *like* when their variable parts are identical — the same variables, each raised to the same exponent. Order does not matter (3xy and 5yx are like), coefficients do not matter (3x and −17x are like), and constants are like each other (4 and 9 are both terms with an empty variable part). Combining like terms is not a new operation: it is the distributive law read backwards. 3x + 5x is (3 + 5)x = 8x, and the reason the x is untouched is that it was factored out, not ignored. This also explains, exactly, why unlike terms cannot be combined: 3x + 5y has no common factor to pull out, so there is nothing to add. The single hardest fact for a learner is that "no further simplification is possible" is a *complete* answer — every prior year of arithmetic has trained them that an expression with an operation in it is an unfinished problem awaiting a single number.

## Mental Models
1. **Beginner — same letter, same shelf.** Group terms by which letter they carry, then add the numbers in each group. *Upgrade trigger*: x and x² appearing in the same expression, where "same letter" gives the wrong grouping. *Shelf life*: about one lesson.
2. **Intermediate — the whole variable part must match, exponents included.** x and x² are as different as x and y. *Upgrade trigger*: 3xy and 5yx, where the parts match but are written in a different order. *Shelf life*: durable through most of school algebra.
3. **Advanced — combining is factoring the variable part out.** 3x² + 5x² = (3 + 5)x² because the distributive law says so. *Upgrade trigger*: needing to justify why unlike terms cannot combine — this model answers it and the earlier ones only assert it.
4. **Expert — terms live in independent slots.** An expression in x is a vector of coefficients, one slot per power; addition happens slot-wise and slots never mix. *Shelf life*: permanent, and it is the model that makes polynomial arithmetic, linear algebra, and series manipulation feel like the same operation.

## Why Students Fail
The dominant failure is not ignorance of the rule but pressure from arithmetic. For eight years, every expression a learner has met resolved to one number, and "3x + 2y" looks unfinished. The urge to produce a single object is enormous, and it is satisfied by any available merge — 5x, 5y, 5xy. The rule "leave it" fights a habit, not a gap, which is why re-explaining the rule rarely fixes it and why the fix has to be a felt collision (substitute numbers, see the merged version give a different answer). The second failure has a different source: the learner correctly learns that the coefficients add, then applies "add the numbers" to the exponents too, producing 3x² + 2x² = 5x⁴. This is not carelessness; it is a rule applied to the wrong part of the term, and it happens because the term was never explicitly split into "the part that changes" and "the part that does not."

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 5 repair actions B01–B03, with birth-type classification added.

- **MC-1 — VARIABLE-PARTS-IGNORED** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation. The arithmetic rule "when you see + between numbers, add them" is carried into an expression where the objects are not numbers. Nothing in the notation signals that the rule's precondition has changed.
  - **Characteristic phrase**: shown 3x + 2y, "5xy" or "5x".
  - **Detection probe** (verbatim): "Simplify 3x + 2y."
  - **Repair**: Blueprint Repair Action B01. Add the collision the arithmetic habit needs: substitute x = 10, y = 1. The true value is 32; the merged answer 5xy gives 50 and 5x gives 50. The learner's own rule produced a false number, which is a stronger argument than any restatement of the rule.
  - **Verification of death**: given 4a + 3b − a, the learner produces 3a + 3b and states explicitly that it cannot be simplified further.

- **MC-2 — EXPONENT-ADDS-WHEN-COMBINING** (foundational)
  - **Birth type**: Type 1, overgeneralisation — with a Type 5 contribution. `math.alg.exponent-rules` genuinely says "add the exponents", and that rule is true for *multiplication*. The learner has the right rule and the wrong trigger, and the teaching order (exponent rules before like terms) makes this near-inevitable.
  - **Characteristic phrase**: shown 3x² + 2x², "5x⁴".
  - **Detection probe**: "Simplify 3x² + 2x²." Follow with "and what is 3x² × 2x²?" — a learner holding MC-2 gives the same shape of answer to both, which is the diagnostic.
  - **Repair**: Blueprint Repair Action B02, plus the discriminating pair above. The correction is not "don't add exponents" — it is "adding exponents is the multiplication rule; you are adding, so you are adding coefficients."
  - **Verification of death**: the learner produces 5x² for the sum and 6x⁴ for the product, in the same minute, and can say which rule each used.

- **MC-3 — UNLIKE-TERMS-FORCED** (moderate)
  - **Birth type**: Type 1, overgeneralisation of the beginner "same letter" model, which was correct for every example in which only first powers appeared.
  - **Characteristic phrase**: shown x + x², "2x" or "2x³".
  - **Detection probe**: "Simplify x + x²."
  - **Repair**: Blueprint Repair Action B03. Substitute x = 3: x + x² = 12, while 2x = 6 and 2x³ = 54. Then name the rule at the right resolution: the whole variable part, exponent included, must match.
  - **Verification of death**: the learner sorts 2x, 5x², −x, 3, x², 7 into groups correctly, unprompted, and reports the result as three separate terms.

## Analogies
- **Best — same units.** 3 metres + 2 metres = 5 metres; 3 metres + 2 seconds is not a thing you can add. The variable part is the unit, the coefficient is the amount. This carries the whole rule, including why unlike terms stay unlike, and the learner already believes it in a physical setting.
- **Alternative — the shelf.** Terms with the same variable part go on the same shelf; you can only total what is on one shelf. Blueprint TA-A01 uses exactly this frame; it is good for sorting and weak for justification.
- **Story analogy** — an inventory: 3 apples + 2 oranges cannot be totalled without inventing a category ("5 pieces of fruit") that loses information. The loss of information is the point, and it maps precisely onto why 5xy is wrong.
- **ANTI-ANALOGY — "collect the x's."** The instruction is natural and it directly installs MC-3, because x² also "has an x in it". Say "collect the terms whose variable part is exactly x²" instead. Longer, and it is the version that survives.
- **ANTI-ANALOGY — "simplify means make it shorter."** This is the pressure behind MC-1 given a name and a licence. Simplify means *write the equivalent expression in standard form*; sometimes the input already is one, and the correct output is the input.

## Demonstrations
- **The substitution collision.** Write 3x + 2y and ask for the simplification. *Elicit the prediction first.* Then substitute x = 10, y = 1 in both the original and the learner's answer. The mismatch is the demonstration; the rule is only the label afterwards.
- **The sum-versus-product pair.** Side by side: 3x² + 2x² and 3x² × 2x². *Predict both first, in writing.* This single pair is the whole of MC-2, and it works because the learner can see that two different operations must give two different answers.
- **The sorting tray.** Give twelve terms on cards — 2x, 3, −x, x², 5x², 7, 4xy, y, −2xy, 0.5x, 9, 3y — and ask for them to be grouped before anything is added. *Predict the number of groups first.* Sorting is separable from arithmetic, and doing it first prevents the merge reflex from firing during the sort.

## Discovery Questions
Guided discovery earns its place here, in the short 6-step form, because the rule is genuinely derivable rather than conventional.
1. **Need** — "Simplify 3x + 5x. Now simplify 3x + 5y." The second one has no obvious answer, which is the need.
2. **Playground** — substitute several values of x into 3x + 5x and into 8x; they always agree. Try to find a value making 3x + 5y agree with 8xy; they never do.
3. **Invention** — "What has to be true about two terms before you're allowed to add them?" Let the learner state a rule in their own words.
4. **Collision** — hand them x + x². Their rule, if it says "same letter", fails immediately under substitution.
5. **Formalisation** — the variable part must be *identical*: same variables, same exponents. Then the distributive-law justification: 3x + 5x = (3 + 5)x.
6. **Compression** — "Only the coefficients move. The variable part never changes."

## Teaching Sequence
Two ordering constraints matter, and both are about which failure gets to fire first. **The sort must precede the sum.** If the learner is asked to simplify before being asked to group, the merge reflex fires and the lesson becomes a correction; if grouping comes first as its own task, the reflex has nothing to act on and the rule is installed on clean ground. Blueprint TA-A01 is exactly this sorting step and it should not be skipped as "obvious". **The x-versus-x² case must appear before practice, not after.** A learner drilled on 3x + 5x, 2y + 7y, 4a − a automates the beginner "same letter" model, and MC-3 is then being unlearned rather than prevented. The turn-level scripts are owned by the Blueprint's Component 4 (TA-A01, TA-A02, and the MAMR gate in TA-A03) and are not restated here. This concept must not drift into distribution or bracket expansion — `math.alg.simplification` owns those, and pulling them in early is what makes that concept's MC-3 (combining unlike residual terms after expanding) harder later.

## Tutor Actions
- **TEST-THINKING: Prediction** — "Simplify 3x + 2y" before any rule is given. First action; MC-1 surfaces in one turn.
- **ORGANIZE: Sorting / Categorisation** — the card tray. The concept's single highest-value action, because it separates the judgement from the arithmetic.
- **DO: Demonstration** — the substitution collision, run on the learner's own wrong answer rather than a hypothetical one.
- **TEST-THINKING: Error Analysis** — "A student wrote 3x² + 2x² = 5x⁴. Which rule were they using, and when *is* that rule right?" This is stronger than marking it wrong, because MC-2's rule is a real rule.
- **Does NOT fit: extended fluency practice before the x/x² case.** It automates the wrong grouping criterion.
- **Does NOT fit: a mnemonic.** Every mnemonic for this ("like terms are twins") compresses to the same-letter model, which is the misconception.

## Voice Teaching Notes
The load-bearing sentence is "the variable part has to be *exactly* the same — same letters, same powers." Slow down on "exactly", every time. Listen for how the learner reads a mixed expression aloud: "three x plus two y" said as one breath signals they are still parsing it as a single unfinished sum, while a pause between the terms signals the list reading has landed. Listen for the hesitation before saying "it can't be simplified" — that hesitation is the arithmetic pressure, and the right response is confirmation rather than explanation: "That's the full answer. Say it again." A learner who states the non-answer confidently has crossed the real threshold of this concept. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong 5xy or 5x on 3x + 2y** — MC-1, and the speed is the diagnostic: the merge is a reflex, not a decision. Route to the substitution collision, never to a re-explanation.
- **5x⁴ on 3x² + 2x²** — MC-2. Check the product immediately; if the learner gives 6x⁴ for the product, the two rules are present and only the trigger is crossed, which is a much shorter repair.
- **2x on x + x²** — MC-3, the same-letter model still live.
- **Slow-correct with visible grouping** — the intended intermediate state. Do not hurry it; the sorting step is meant to be deliberate for several sessions before it collapses into fluency.
- **Correct combination, then an attempt to combine the result with a constant** — the learner has the like-term rule for variables and has not extended "empty variable part" to constants. Narrow gap, not a misconception.
- **Mastery trigger**: the Blueprint's TA-A03 gate. The 0.85 threshold is correct and the gate must include at least one item whose honest answer is "already simplified" — a gate made only of combinable items certifies the merge reflex rather than the rule.

## Tutor Recovery Strategy
The likely utterance here is "but that's not an answer" or "I don't get what I'm supposed to do" — a confusion born of the arithmetic contract being broken, not of the material's difficulty. The concept-specific smaller question drops the algebra entirely: **"3 metres plus 2 metres is what? And 3 metres plus 2 seconds is what?"** The learner answers both correctly in seconds, including the second one, which they will say "you can't" to — and that is the rule, in their own voice, on ground they already own. Then return: "x is a unit. y is a different unit." If the utterance is frustration after repeated merge errors rather than confusion, shrink to a pure sort with no addition at all: **"Don't simplify anything. Just tell me which of these three belong together: 2x, 5, 7x."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure**, with a decision at its head. Review by *application on mixed input* — a review item that contains only combinable terms tests nothing, because the merge reflex passes it.
- Concept-specific deviation: keep at least one already-simplified expression permanently in the review rotation. The "leave it" response decays faster than the combining procedure, because every review that rewards combining strengthens the reflex that fights it.
- Interleaving partners: `math.alg.exponent-rules` (the discriminating partner for MC-2 — the sum/product pair should recur in review, not just in teaching) and `math.alg.term`/`math.alg.coefficient`, which supply the vocabulary this concept operates on.

## Transfer Connections
- **Near**: `math.alg.simplification` (which is this concept plus distribution), `math.alg.polynomial-operations` (polynomial addition *is* like-term collection, organised by degree), and every equation-solving step that begins by tidying a side.
- **Far**: dimensional analysis in physics — adding quantities only when their units match is literally the same check, and a learner who has this concept has already met the rule that catches most physics arithmetic errors.
- **Real-world**: any total computed over a mixed inventory — you total by category, and the category is the variable part.
- **Expert transfer**: the reflex of asking "are these the same kind of object?" before applying an operation. It is the habit underneath type-checking, unit-checking, and knowing when a formula does not apply.

## Cross-Subject Connections
- **Physics**, genuine and strong: adding only like units. 3 m + 2 m works, 3 m + 2 s does not, and 3 m + 2 m/s does not either. This is the best available anchor for the concept and it is not recorded as a KG `cross_links` edge.
- **Chemistry**, real: balancing equations requires totalling atoms per element separately — element is the variable part, count is the coefficient, and the word "coefficient" is even shared.
- **Computer science**, weak but real: type-compatible addition — a language that refuses `3 + "x"` is enforcing this rule.
- The KG records `cross_links: []`. Recorded in Curriculum Feedback below as a probable omission, since the physics units link is strong, standard, and pedagogically load-bearing.

## Blueprint References
`docs/curriculum/blueprints/math.alg.like-terms.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3), the Component 5 Protocol B repair actions B01–B03, the Component 4 teaching-action sequence (TA-A01 "Same Item, Same Shelf", TA-A02 combining in practice, TA-A03 the mastery gate), the Component 6 spaced-repetition schedule, and the Component 8 teaching notes. This entry adds birth-type classification (including the finding that MC-2 is partly instruction-induced by the exponent-rules-before-like-terms teaching order), the mental-model ladder, the two anti-analogies, the units analogy as the primary carrier, the argued case for guided discovery, the substitution-collision demonstration as the repair engine for MC-1 and MC-3, the sort-before-sum ordering constraint, and the requirement that the mastery gate include an already-simplified item.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
`cross_links: []` understates this node. The physics link (adding like units) is standard, pedagogically load-bearing, and is the analogy most likely to carry the concept for a struggling learner; a `cross_links` edge toward the physics measurement/units material would be well-founded. Recorded for the Curriculum Production Pipeline; not fixed here, since no KG file may be modified by this program. Separately, `estimated_hours: 3` is tight for a concept whose main work is unlearning an eight-year-old arithmetic habit — the rule takes minutes and the reflex takes weeks — but since the spaced-repetition tail is owned by the Blueprint's Component 6 rather than by the hours field, this is noted rather than disputed.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 2 (Phase 2, batch 3).
