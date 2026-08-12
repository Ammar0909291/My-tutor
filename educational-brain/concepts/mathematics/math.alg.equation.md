# math.alg.equation

## Identity
- **KG ID**: `math.alg.equation`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.expression` — load-bearing part: that an expression is a *quantity*, not a question. An equation is two of them joined by a claim, and a learner who still thinks an expression is a question has nothing to join.
- **Unlocks**: `math.alg.linear-equation-1var`, `math.alg.inequality`
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.alg.equation.md` (reused by reference throughout)

## Learning Objective
- The learner can distinguish an equation from an expression and say what the = sign asserts.
- The learner can verify whether a given value is a solution by substituting into both sides.
- The learner can state that solving means finding *all* values making the statement true, and recognise that an equation may have one solution, none, or infinitely many.

## Core Understanding
An equation is a *claim*: LHS = RHS asserts that two expressions name the same quantity. Because it is a claim it has a truth value — and its truth value depends on the variable, which is what makes solving meaningful. A solution is a value that makes the claim true when substituted, and verification is therefore not a checking ritual but the definition itself applied. Crucially the number of solutions is not fixed at one: 2x + 3 = 7 has exactly one, x + 1 = x has none (the claim is false for every value), and x + 3 = x + 3 has all of them (the claim is true for every value). These three outcomes are not exceptions to a one-solution rule; they are the three things a claim about a variable can do. This concept establishes *what solving means*; the techniques for doing it belong to `math.alg.linear-equation-1var` and are deliberately not taught here.

## Mental Models
1. **Beginner — the true/false test.** An equation is a sentence that is either true or false once you fill in x. *Upgrade trigger*: being asked which x makes it true. *Shelf life*: excellent — this is the model that makes all three solution counts unsurprising, and it should be installed before any solving is attempted.
2. **Intermediate — the balance.** Both sides weigh the same; whatever you do to one, do to the other. *Upgrade trigger*: an identity or a contradiction, where nothing is being balanced. This model is powerful for technique and *actively misleading* for solution counts, and the Blueprint's own Teaching Notes flag the limitation.
3. **Advanced — the solution set.** The answer to "solve" is a *set*, which may have one element, none, or infinitely many. *Upgrade trigger*: quadratic equations, where two elements is normal. This is the model that generalises.
4. **Expert — the equation as a condition defining a set.** x + y = 3 does not have "an answer"; it names a line. *Shelf life*: forward pointer to `math.alg.linear-equation-2var`; install only when reached.

## Why Students Fail
The one-solution expectation is manufactured by the curriculum, not by the learner. Essentially every equation in a first algebra course has exactly one solution, because those are the ones that make good practice problems, and after two hundred of them "solve" has come to mean "produce the number". A learner in that state does not merely get identities and contradictions wrong; they conclude they have made an arithmetic error and go back to look for it, which is the correct response to their model and the wrong response to the problem. The second failure is stopping at 2x = 4 — a simplification that *looks* like progress and *feels* like an answer, because it is shorter than what came before and because the learner has no criterion for "done" other than "it looks finished".

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry, with birth-type classification added.

- **MC-1 — EQUATION-IS-EXPRESSION** (FOUNDATIONAL)
  - **Birth type**: Type 5, instruction-induced, and the mirror of `math.alg.expression`'s MC-1. A learner who has just been drilled on evaluating expressions carries that action forward into the next lesson, where the objects look nearly identical.
  - **Characteristic phrase**: given 2x + 3 = 7, "so that's 2x plus 10?"
  - **Detection probe** (verbatim): "Here is 2x + 3 = 7. What would you do with it?"
  - **Repair**: Blueprint Repair Action B01 — count the = signs. The same two-second habit that resolved the previous concept resolves this one in the other direction, which is exactly why it should be trained as a habit rather than as a fact.
  - **Verification of death**: shown a mixed set of expressions and equations, the learner sorts them correctly and names the different action for each.

- **MC-2 — SOLVING-MEANS-SIMPLIFYING** (foundational)
  - **Birth type**: Type 5, instruction-induced. "Simplify" has been the terminal instruction in mathematics for years, and its stopping criterion has always been "when it looks short enough". Solving has a *different* stopping criterion — the variable alone on one side — and nobody has said so.
  - **Characteristic phrase**: "2x = 4, done."
  - **Detection probe**: "Solve 2x + 3 = 7." Watch for the answer 2x = 4 offered as final.
  - **Repair**: Blueprint Repair Action B02 — supply the missing criterion explicitly: solved means *x = something*, one variable, alone, on one side. Then verify by substitution, which is impossible with 2x = 4 and trivial with x = 2, so the criterion is enforced by the check rather than by the tutor.
  - **Verification of death**: the learner stops only at x = ⟨value⟩ and substitutes back without being asked.

- **MC-3 — SOLUTION-IS-UNIQUE-ALWAYS** (moderate but consequential)
  - **Birth type**: Type 5, instruction-induced, by sampling. Every practice equation had one solution. The learner generalised correctly from a biased sample.
  - **Characteristic phrase**: "I must have made a mistake — the x's cancelled."
  - **Detection probe**: "Solve x + 3 = x + 3. Now solve x + 1 = x."
  - **Repair**: Blueprint Repair Action B03 — return to the true/false model, which handles all three cases with no new machinery: try a few values. For x + 3 = x + 3 every value makes it true; for x + 1 = x none does. The disappearing variable is then a *result*, not an error.
  - **Verification of death**: the learner meets a vanishing variable and asks "is it always true or never true?" rather than checking their arithmetic.

## Analogies
- **Best — the claim.** "This is a sentence that says something, and it might be right or wrong depending on x." Deliberately plain, and it is the only model that covers all three solution counts without amendment.
- **Alternative — the balance scale.** Genuinely useful for technique and explicitly limited: it models one-solution equations well and identities and contradictions not at all, since nothing is being balanced when both sides are already identical. Per the Blueprint's own note, use it *with* the true/false model rather than instead of it.
- **Story analogy** — a courtroom claim: "the defendant was in Paris on Tuesday" is true, false, or (if the claim is "the defendant was somewhere") trivially true of everyone. Three outcomes, familiar from ordinary life.
- **ANTI-ANALOGY — "solve means get x on its own."** This is a technique described as a definition, and it silently endorses MC-3: an identity has no x to get on its own, so a learner holding this definition concludes the problem is broken. Say "find every value that makes it true" and the technique follows as a method rather than as the meaning.
- **ANTI-ANALOGY — "the equals sign means here comes the answer."** Imported wholesale from arithmetic, where 3 + 4 = 7 really does work that way. It makes 2x + 3 = 7 unreadable, because the answer is on the wrong side.

## Demonstrations
- **The verification demonstration.** Give x = 2 and the equation 2x + 3 = 7; substitute into the left side, get 7, compare to the right side. Then try x = 5: get 13, which is not 7. *Elicit the prediction first*: "is 5 a solution?" This defines solution by *doing* rather than by stating, and it makes MC-2's stopping criterion visible as a requirement rather than a rule.
- **The three equations.** 2x + 3 = 7, x + 3 = x + 3, x + 1 = x, side by side. Try x = 0, 1, 5 in each. *Predict first*: "how many solutions will each of these have?" Record the predictions; MC-3 shows up in the answer "one" given three times.
- **The sorting task.** Six objects, mixed expressions and equations. *Predict first*, then count = signs.

## Discovery Questions
Guided discovery is right here, and the third solution count is genuinely discoverable rather than announced.
1. **Need**: "Is x = 2 a solution of 2x + 3 = 7? How would you check?" (The learner invents substitution, which is the definition.)
2. **Playground**: check several values against several equations. Build the habit before the vocabulary.
3. **Invention**: "So what is a solution?" — the learner states it, in their own words, from what they have been doing.
4. **Collision**: hand over x + 3 = x + 3 and ask for its solution. The learner tries values; they all work. Then x + 1 = x; none works. The one-solution belief breaks against two counterexamples the learner produced themselves.
5. **Formalisation**: an equation is a claim; solving means finding every value that makes it true; the answer is a set, which may have one, none, or infinitely many members.
6. **Compression**: "Solve means: which values make this true?"
Solving *techniques* are deliberately excluded — they belong to `math.alg.linear-equation-1var`, and introducing them here would let procedure substitute for meaning, which is exactly how MC-2 forms.

## Teaching Sequence
The Blueprint's Component 4 owns the turn-level scripts. Three constraints matter. First, **verification by substitution must be established before solving is discussed at all** — it is the operational definition of "solution", and a learner who meets solving first will treat substitution as an optional check rather than as the meaning, which leaves MC-2 with nothing to collide with. Second, **the true/false model must precede the balance-scale model**, because the balance model cannot represent an identity or a contradiction and a learner who acquires it first has to un-learn it at exactly the moment MC-3 needs breaking. Third, **the three solution counts must be introduced proactively, in this concept**, not deferred to `math.alg.linear-equation-1var`; the Blueprint's own Teaching Notes are explicit on this, and the reason is that the biased sample which creates MC-3 accumulates during the solving practice that follows, so the inoculation has to arrive first.

## Tutor Actions
- **TEST-THINKING: Prediction** — "how many solutions?" asked of all three equations before any is solved. First action, and the only reliable MC-3 detector.
- **DO: Worked Example** — verification by substitution, both sides computed separately and compared.
- **ORGANIZE: Representation Table** — equation × candidate value → true / false. This is the artefact that makes solution-hood observable.
- **TEST-THINKING: Error Analysis** — "a student says x + 3 = x + 3 has no solution because the x's cancelled. What actually happened?"
- **SHOW: Analogy** — the balance scale, introduced late and explicitly limited.
- **Does NOT fit: teaching solving technique.** Out of scope by the Blueprint's own boundary, and pedagogically harmful here: technique offers a way to produce answers without holding the meaning, which is precisely MC-2's mechanism.

## Voice Teaching Notes
The load-bearing sentence is "which values make this true?" — it is the definition of solving, it is short, and it should replace "get x on its own" in the tutor's vocabulary entirely for this concept. Listen for the learner reading an equation aloud as a *command* ("two x plus three... equals... seven") versus as a *claim* ("two x plus three is seven") — the reading is diagnostic of the model, and the claim-reading is worth explicitly modelling. Listen also for "I think I did it wrong" when a variable cancels: that sentence is MC-3, and it will be delivered as an admission rather than as a question, so it can pass without being examined. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Given 2x + 3 = 7, produces 2x + 10** — MC-1, carried forward from the previous concept. Fast and confident; the learner has applied the action they were most recently rewarded for.
- **Stops at 2x = 4** — MC-2. Note the answer is *correct as far as it goes*, which means a marking scheme that awards partial credit reinforces the misconception. The gate must require substitutability.
- **"One" given as the solution count for all three equations** — MC-3, and it is invisible to any probe set containing only one-solution equations, which describes most of them.
- **Correct verification, cannot solve** — entirely acceptable at this concept; solving is the next concept's job. Do not treat as a gap.
- **Slow-correct on the three-equation prediction** — the learner is testing values rather than recognising the forms, which is exactly the intended behaviour at this stage. Do not push toward pattern recognition yet.
- **Mastery trigger**: the Blueprint's Component 4 gate at MAMR 5/5, with the added requirement that the item set include one identity and one contradiction. A gate composed only of one-solution equations certifies MC-3 intact.

## Tutor Recovery Strategy
The likely utterance is "I got x's on both sides and now I'm stuck" — a genuine dead end for a learner holding MC-3, because their model says this state should not exist. The concept-specific smaller question steps out of technique entirely: **"Forget solving for a second. Try x = 1 in that equation. Is it true or false? Now try x = 2."** Two substitutions, both arithmetic, and the pattern (both true, or both false) answers the original question without any manipulation. The learner ends up having solved it by the definition rather than by a method, which is the better outcome anyway. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept** (what an equation claims) with one embedded **procedure** (verification by substitution). Review the procedure speeded and the meaning by explanation; the meaning decays faster and is the one that matters here.
- Concept-specific deviation: MC-3 regrows continuously throughout the rest of algebra, because the practice diet remains dominated by one-solution problems. Per `../student-state/03`, keep an identity or contradiction in the review rotation indefinitely rather than marking it resolved.
- Interleaving partners: `math.alg.expression` — mixed sorting items are worth more than either concept reviewed alone, since MC-1 in both concepts is a single discrimination failure seen from two sides. Later, `math.alg.solution-set` and `math.alg.inequality`.

## Transfer Connections
- **Near**: `math.alg.linear-equation-1var` (the techniques), `math.alg.inequality` (the same claim structure with a different relation), `math.alg.solution-set` (the answer as a set, made explicit).
- **Far**: reading any conditional statement and asking what makes it true — the same move underlies logical statements and database queries.
- **Real-world**: any "how much do I need so that…" question. "How many hours at £9 to reach £180?" is an equation, and the learner's everyday reasoning already handles the verification step correctly.
- **Expert transfer**: the recognition that the answer to a question can legitimately be "all of them" or "none". That is a genuine intellectual move and this is the first place a learner meets it.

## Cross-Subject Connections
- **Computer science**, genuine and sharp: `=` and `==` are different operators precisely because assignment and claim are different acts, and a learner who codes has a ready-made vocabulary for the distinction this concept teaches. Worth using explicitly if available.
- **Chemistry**, genuine: a balanced chemical equation asserts an equality of atom counts and is checked by verification, not solved — a useful contrast that reinforces "an equation is a claim".
- The KG records no `cross_links` for this concept; both connections above are recorded as feedback rather than asserted as KG facts.

## Blueprint References
`docs/curriculum/blueprints/math.alg.equation.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3) and the Component 5 Protocol B repair actions B01–B03, the Component 4 teaching-action sequence TA-A01..TA-A04 including the proactive solution-count treatment, the Component 6 spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies (including the finding that "solve means get x on its own" silently endorses MC-3), the observation that partial credit for 2x = 4 reinforces MC-2, the ordering argument for true/false before balance-scale, and the recovery shrink-question.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
None as a defect. One observation for the Curriculum Production Pipeline: `math.alg.solution-set` is a separate KG node requiring this one, yet the solution-count material (one / none / infinitely many) is taught *here* per this Blueprint's own Teaching Notes, and `solution-set`'s registry then owns the closely related all-reals-versus-empty confusion. The two nodes overlap on the same idea approached from two directions. This is workable and the Blueprints handle it, but the boundary is worth an explicit note in the KG descriptions.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
