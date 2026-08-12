# math.alg.inequality

## Identity
- **KG ID**: `math.alg.inequality`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.equation` — load-bearing part: that a relation between two expressions is a *claim* with a truth value, verified by substitution, and that solving means finding the values making it true. An inequality is the same object with a different relation, and every part of that sentence transfers except the shape of the answer.
- **Unlocks**: `math.alg.inequality-1var`
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.alg.inequality.md` (reused by reference throughout)

## Learning Objective
- The learner can read <, >, ≤, ≥ as claims and verify whether a given value satisfies one.
- The learner can state that an inequality's solution set is an interval or region rather than an isolated point.
- The learner can state and justify the sign-flip rule: multiplying or dividing both sides by a negative number reverses the direction.
- The learner can distinguish strict from non-strict inequalities by whether the boundary point is included.

## Core Understanding
An inequality is a claim, exactly as an equation is, and everything about verification carries over unchanged: substitute, evaluate both sides, check whether the claim holds. What changes is the *shape of the answer*. An equation's solution set is typically a scattering of isolated points; an inequality's is typically an interval — x > 3 is satisfied by 3.1, 4, 1000 and everything between, and no list can express it, only a boundary and a direction. The one rule that has no equation analogue is the sign flip: multiplying or dividing both sides by a negative reverses the relation, because multiplying by a negative reflects the number line and reflection swaps which of two numbers is larger. It is not a convention to memorise; it is what reflection does, and it can be checked in two seconds on any concrete pair (2 < 5, but −2 > −5). Finally, strict and non-strict differ by exactly one point: x > 3 excludes 3, x ≥ 3 includes it, and that single point is the difference between an open and a closed boundary — trivial in size and decisive in every applied constraint.

## Mental Models
1. **Beginner — the equation with a different sign.** Everything transfers; only the symbol changed. *Upgrade trigger*: the answer turning out to be a range. *Shelf life*: a useful bridge that becomes MC-1 if it is not upgraded promptly — and it is *mostly* right, which is what makes it durable.
2. **Intermediate — the boundary and the side.** Solving finds a boundary point and says which side of it works. *Upgrade trigger*: needing to say whether the boundary itself is in. This is the model to install; it makes the number line the natural answer format.
3. **Advanced — the region on the line.** The solution set is a subset of ℝ, drawn as a shaded ray or segment with an open or filled endpoint. *Upgrade trigger*: two-variable inequalities, where the region is in the plane.
4. **Expert — order as structure.** ≤ is an order relation with its own rules, some shared with equality (add anything to both sides) and one not (multiplying by a negative reverses it). *Shelf life*: forward pointer to `math.alg.inequality-1var` and to `math.found.partial-order`, which the learner may already have met.

## Why Students Fail
The transfer from equations is *mostly* correct, which is the problem. Adding to both sides, subtracting, simplifying, substituting to check — all of it carries over, so the learner receives continuous confirmation that inequalities are equations with a different symbol. The one exception is buried and rarely triggered: most textbook inequalities are arranged so that no negative multiplication is needed, so a learner can complete a whole exercise set with the sign-flip rule absent and never notice. The second failure is that "the answer" has meant a number for years; a range does not look like an answer, so learners routinely solve x > 3 correctly and then report "x = 3", converting a correct interval into the nearest number-shaped thing. The third is a genuine invisibility: ≤ and < differ by one point out of infinitely many, and nothing about the notation makes that point feel consequential until a constraint problem turns on it.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — INEQUALITY-SOLUTION-AS-SINGLE-POINT** (foundational)
  - **Birth type**: Type 1, overgeneralisation from equations, reinforced by the answer format. Every solving task the learner has done has terminated in a number, and the manipulation steps for inequalities look identical, so the terminal step is assumed identical too.
  - **Characteristic phrase**: solving 2x > 6, "so x = 3."
  - **Detection probe** (verbatim): "Solve 2x > 6. Is x = 5 a solution? Is x = 3?"  The second question is the diagnostic — a learner holding MC-1 says yes to 3.
  - **Repair**: Blueprint Repair Action B01 — substitution testing across several values, then the number line. Test 3 (fails, 6 is not greater than 6), 3.1 (works), 5 (works), 100 (works). The set is visibly not a point, and the learner establishes it themselves.
  - **Verification of death**: the learner draws or describes a range unprompted, and correctly excludes the boundary for a strict inequality.

- **MC-2 — SIGN-FLIP-RULE-OMITTED** (foundational)
  - **Birth type**: Type 1, overgeneralisation, and unusually well-supported: every other operation genuinely does transfer from equations. The learner is applying a rule that is correct for addition, subtraction, and multiplication by positives — three out of four cases.
  - **Characteristic phrase**: from −2x > 6, "x > −3."
  - **Detection probe**: "Solve −2x > 6. Then check your answer with x = −4."
  - **Repair**: Blueprint Repair Action B02 — the concrete reflection. 2 < 5. Multiply both by −1: −2 and −5. Which is larger now? The relation reversed, on numbers the learner cannot dispute, with no algebra present. Then apply it to the general rule.
  - **Verification of death**: the learner *checks* after any negative multiplication, and can explain the flip by reference to reflection rather than by citing a rule.

- **MC-3 — STRICT-NON-STRICT-CONFLATED** (moderate)
  - **Birth type**: Type 4, notation-induced. The extra bar under the symbol is visually minor and semantically decisive, and in most exercises the difference does not change the mark.
  - **Characteristic phrase**: "≤ and < are basically the same."
  - **Detection probe**: "Is x = 3 a solution of x > 3? Of x ≥ 3?"
  - **Repair**: Blueprint Repair Action B03 — an applied constraint where the boundary matters: a lift rated "up to and including 400 kg" versus "under 400 kg", with a load of exactly 400 kg. One point, and it decides the outcome. Then the open-versus-filled circle convention on the number line, which makes the distinction visible rather than diacritical.
  - **Verification of death**: the learner draws the correct endpoint style without prompting and can say what the boundary point's status is.

## Analogies
- **Best — the number line with a fence.** Solving puts a fence at the boundary and shades one side; the strict/non-strict distinction is whether the fence post itself is inside. This single image carries MC-1 and MC-3's corrections together, which is why it should be the standard answer format rather than an occasional illustration.
- **Alternative — the mirror.** Multiplying by a negative reflects the line; reflection swaps left and right, so it swaps larger and smaller. Cleanest available justification for the sign flip, and it makes the rule a consequence rather than an exception.
- **Story analogy** — the height requirement at a fairground ride: "you must be at least 1.2 m" is a non-strict inequality with a genuine boundary case, and everybody has an intuition about the person who is exactly 1.2 m tall. Useful precisely because the boundary matters in the story.
- **ANTI-ANALOGY — "an inequality is just an equation with a different sign."** Almost entirely true, and it is MC-1 and MC-2's shared birth mechanism: it licenses transferring *everything*, including the one thing that does not transfer. Say "same claim, same checking, different answer shape, and one extra rule".
- **ANTI-ANALOGY — "flip the sign when you multiply by a negative."** The word "sign" here means the *direction of the relation*, but the learner has just been multiplying by a negative and is thinking about the sign of a *number*. Say "reverse the direction" and the ambiguity disappears.

## Demonstrations
- **The substitution sweep.** 2x > 6, tested at x = 2, 3, 3.1, 5, 100. *Elicit the prediction first*: "what's the answer to this?" Take it in writing; MC-1 shows up as "3", and the sweep then shows 3 failing while 3.1 and everything above succeed.
- **The reflection.** 2 < 5, both multiplied by −1, relation checked. *Predict first*: "will −2 still be less than −5?" This is the whole of MC-2's repair, on two numbers, in ten seconds, with no algebra.
- **The boundary case.** A weight limit of exactly 400 kg under "up to and including" versus "under". *Predict first*: "does the 400 kg load go?" The answer differs, and the learner sees one point decide it.
- **Number-line drawing.** Every solution drawn, every time, with open or filled endpoints. Not a demonstration so much as the required answer format, and it is what makes MC-1 and MC-3 structurally hard to hold.

## Discovery Questions
Guided discovery works well for all three of this concept's difficulties.
1. **Need**: "Solve 2x > 6." (The learner produces x > 3 or x = 3; either way, something needs settling about what the answer *is*.)
2. **Playground**: "Test some values. Is 3 a solution? 3.1? 5? 100? 2?"
3. **Invention**: "Describe everything that works." The learner produces a range in their own words and then meets the notation as a way of writing what they already said.
4. **Collision, for the sign flip**: "Now solve −2x > 6 the same way you'd solve an equation. Then test your answer." The learner's answer fails its own check, which is a far better teacher than a warning, and it fails *because* the one non-transferring rule was needed.
5. **Formalisation**: interval solutions; the sign-flip rule justified by reflection; open versus closed endpoints.
6. **Compression**: "Same as an equation, except the answer is a range and a negative multiplier turns the sign around."

## Teaching Sequence
The Blueprint's teaching actions own the turn-level scripts. Three constraints matter. First, **the answer's shape must be established before any manipulation is taught** — MC-1 is about what an answer *is*, and a learner who is manipulating before that is settled will produce correct algebra terminating in a wrong-shaped answer, which looks like a careless slip and is not. Second, **a negative-coefficient inequality must appear inside this concept**, and preferably be discovered failing its own check: most exercise sets avoid them, and a learner can otherwise complete the topic without ever meeting the one rule that distinguishes it. Third, **the number line must be the required answer format from the first solution onward**, not an optional illustration — it makes MC-1 impossible to write down and makes MC-3's distinction visible as a drawing rather than as a diacritic. Note the boundary with `math.alg.inequality-1var`, which owns the solving *techniques*; this concept owns what an inequality claims and what its answer looks like.

## Tutor Actions
- **TEST-THINKING: Prediction** — "solve 2x > 6", answer taken in writing before any teaching. First action; MC-1 appears immediately and unambiguously.
- **DO: Demonstration** — the substitution sweep.
- **DO: Worked Example** — the reflection of 2 < 5 under multiplication by −1.
- **TEST-THINKING: Error Analysis** — the learner's own unflipped answer to −2x > 6, checked and found wrong by them.
- **ORGANIZE: Representation Table** — inequality / boundary / direction / endpoint included? / number-line sketch. The fifth column is the one that does the work.
- **Does NOT fit: symbolic drill before the number line is habitual.** It automates manipulation while leaving the answer's shape unsettled, which is the exact profile of a learner who solves correctly and reports wrongly.

## Voice Teaching Notes
The load-bearing sentence is "the answer is a range, not a number." Say it before the first solution is written and after it. Listen for the learner announcing an answer as "x equals three" when they have solved an inequality — the verb is the misconception, and it is audible while their written work is still correct. Listen for the sign-flip rule being cited without justification ("you flip it, right?"): a rule held as a remembered move is applied inconsistently, and the tell is the rising question intonation. Reading ≤ aloud as "less than" rather than "less than or equal to" is worth correcting every time; the dropped clause in speech becomes the dropped boundary point in the answer. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **"x = 3" for 2x > 6** — MC-1. Note the algebra was correct; only the answer's shape is wrong, which means a marking scheme focused on method will pass it.
- **"x > −3" for −2x > 6** — MC-2. Fast and confident, because three of the four transferable rules genuinely do transfer. Undetectable on any inequality with a positive coefficient, which is most of them.
- **Correct interval, wrong endpoint style** — MC-3. The mildest signal here and the one with the largest applied consequence; do not let it pass as cosmetic.
- **Correct answers with no number line drawn** — not itself an error, but the format that hides MC-1 and MC-3. Requiring the sketch is diagnostic as well as pedagogic.
- **Slow-correct with visible value-testing** — the intended behaviour at this stage. Testing values is the definition being applied and it should be encouraged rather than optimised away.
- **Mastery trigger**: the Blueprint's gate at MAMR 5/5, with the added requirement that one item have a negative coefficient and one turn on a boundary point.

## Tutor Recovery Strategy
The likely utterance is "I don't know when I'm supposed to flip it" — an accurate report of holding the rule without its justification, and the fix is to supply the justification rather than the trigger condition. The concept-specific smaller question uses two numbers and no algebra: **"Two is less than five. Agreed? Now multiply both by minus one. Which is bigger, minus two or minus five?"** Minus two. **"So the direction turned around. That's the whole rule — it happens whenever you multiply by a negative, and you can check it with two numbers any time you're unsure."** The learner leaves with a self-check rather than a memorised trigger, which is the durable version. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept** (what an inequality claims, what its answer looks like) with one embedded **rule** (the sign flip). Review both; the sign flip decays as an isolated fact and is recoverable from the reflection argument, so review the argument rather than the rule.
- Concept-specific deviation: MC-2 is *undetectable* by any review item with a positive leading coefficient, and positive coefficients dominate naturally occurring practice. A negative-coefficient item must be deliberately kept in permanent rotation or the misconception will regrow unobserved.
- Interleaving partners: `math.alg.equation` — deliberate discrimination is the point, since MC-1 and MC-2 are both over-transfers from it. Later `math.alg.inequality-1var` and `math.alg.inequality-2var`.

## Transfer Connections
- **Near**: `math.alg.inequality-1var` (techniques), `math.alg.inequality-2var` (regions in the plane), `math.alg.solution-set` (where the interval answer format is formalised).
- **Far**: the general habit of specifying a *range* of acceptable values rather than a single target — tolerance, error bounds, confidence intervals.
- **Real-world**: essentially every constraint in ordinary life is an inequality — budgets, speed limits, dosages, height requirements, capacity ratings — and the strict/non-strict distinction is load-bearing in all of them. This is one of the few algebra concepts where the applied case is more vivid than the abstract one, and it should be used.
- **Expert transfer**: order relations as objects with their own rules, some inherited from equality and some not, which is the first genuine instance of a structure that is *almost* like another and differs in one decisive respect.

## Cross-Subject Connections
- **Chemistry / physics**, genuine: tolerance bands, significant-figure ranges, and every "must exceed" or "must not exceed" condition in experimental design are inequalities with real boundary consequences.
- **Computer science**, genuine and sharp: `<` versus `<=` is the classic off-by-one bug, and a learner who codes has direct, painful experience of MC-3 mattering. Worth invoking explicitly if available — it is the strongest available argument that one point out of infinitely many can decide everything.
- The KG records no `cross_links`, which given how universal inequality constraints are is a genuine omission. Recorded as feedback.

## Blueprint References
`docs/curriculum/blueprints/math.alg.inequality.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1..MC-3) and its repair actions B01–B03, the teaching-action sequence, the spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies (including the finding that "an inequality is just an equation with a different sign" is the shared birth mechanism of both foundational misconceptions, because it licenses transferring the one rule that does not transfer), the reflection justification for the sign flip, the observation that MC-2 is undetectable on positive-coefficient items and that those dominate naturally occurring practice, the argument for the number line as a required answer format rather than an illustration, and the recovery move that replaces a memorised trigger with a two-number self-check.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
`cross_links: []` is a genuine omission for this node. Inequalities are the notation for every constraint in physics, chemistry and computing, and the strict/non-strict distinction has a direct, well-known analogue in the off-by-one bug class — a cross-link toward `cs.prog.*` would give the Teaching Engine an unusually strong transfer target for MC-3 specifically. Recorded for the Curriculum Production Pipeline. Separately, this node and `math.alg.inequality-1var` reproduce the parent/child pattern recorded six times already in this batch, though here the split (claim and answer shape versus solving technique) is stated cleanly in both Blueprints and is the least ambiguous instance of it.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
