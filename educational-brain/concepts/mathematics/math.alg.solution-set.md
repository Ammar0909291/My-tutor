# math.alg.solution-set

## Identity
- **KG ID**: `math.alg.solution-set`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.equation` — load-bearing part: that a solution is a value making the statement true, verified by substitution. The solution set is exactly the collection of those values, so the definition here is one step from that one.
- **Unlocks**: none in the KG
- **Cross-links**: `math.func.zero-of-function` (not yet authored in this corpus)
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: `docs/curriculum/blueprints/math.alg.solution-set.md` (reused by reference throughout)

## Learning Objective
- The learner can state the solution set of an equation or inequality as a *set*, using set notation, and can say that it may be empty, finite, or infinite.
- The learner can distinguish an "always true" outcome (solution set = ℝ) from a "never true" outcome (solution set = ∅) when the variable cancels.
- The learner can recognise that finding one solution does not complete the task, and can check for others.

## Core Understanding
The answer to "solve" is a *set*, not a number. Writing x = 2 is shorthand for {2}; writing "no solution" is shorthand for ∅; writing "all reals" is shorthand for ℝ. Making the set explicit costs nothing and buys two things the number-shaped answer cannot express. First, it makes the three outcomes commensurable: ∅, {2}, {2, −2} and ℝ are all sets, differing in size, rather than one of them being an answer and the other two being failures. Second, it makes the completeness obligation visible — a set is not reported until it is known to contain everything, so "I found 2" is not an answer until "and nothing else" is established. The specific confusion worth naming is what happens when the variable cancels: 2x + 3 = 2x + 3 reduces to 3 = 3, which is true, so *every* value works and the set is ℝ; 2x + 3 = 2x + 5 reduces to 3 = 5, which is false, so *no* value works and the set is ∅. Both look identical in the moment the x disappears, and they are opposite answers.

## Mental Models
1. **Beginner — the answer might be more than one thing.** *Upgrade trigger*: an equation with two solutions or none. *Shelf life*: a necessary loosening of the one-answer expectation and not yet a model.
2. **Intermediate — the set of everything that works.** Solve means: collect every value making the statement true. *Upgrade trigger*: an equation where that collection is infinite. This is the model to install; it makes ∅ and ℝ ordinary rather than exceptional.
3. **Advanced — the truth-value partition.** Every real number is either in the set or out of it; solving is describing the boundary between them. *Upgrade trigger*: inequalities, where the set is an interval and the boundary is a point rather than a list.
4. **Expert — the solution set as the object of interest.** For x² + y² = 1 the solution set is a circle and no list is possible; the *set* was always the answer and the single number was a special case. *Shelf life*: forward pointer to `math.func.zero-of-function` and to `math.alg.linear-equation-2var`.

## Why Students Fail
Both failures come from the same source, which is that "solve" has been taught as a race to a number. When the variable cancels, the learner has no number and therefore believes they have no answer — and, critically, the two opposite outcomes present identically at that moment: the x's vanish in both cases, and only the *remaining statement* distinguishes them. A learner who is watching for the variable rather than reading the residue cannot tell them apart, so they either guess or report failure. The second failure, stopping at the first solution, is a direct consequence of a number-shaped answer format: once a number has been produced the task *looks* finished, and nothing in the answer's shape says "is that all of them?" The set format asks that question structurally, which is the strongest argument for teaching it.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — ALL-REALS-SOLUTION-SET-CONFUSED-WITH-EMPTY-SET** (foundational)
  - **Birth type**: Type 5, instruction-induced. Both cases are almost always introduced together, in one lesson, as "the two weird cases", and taught by the shared surface feature (the variable cancels) rather than by the distinguishing one (what the residue says). Grouping them by their similarity is what makes them interchangeable.
  - **Characteristic phrase**: "the x's cancelled, so there's no solution" — offered for an identity.
  - **Detection probe** (verbatim): "Solve 2x + 3 = 2x + 3. Now solve 2x + 3 = 2x + 5. What are the solution sets?" Both are needed; either alone can be answered correctly by coin flip.
  - **Repair**: Blueprint Repair Action B01 — stop reading the variable and read the residue. 3 = 3 is a true statement, so every x works: ℝ. 3 = 5 is a false statement, so no x works: ∅. The rule is one question — "is what's left true or false?" — and it is decidable by inspection.
  - **Verification of death**: the learner meets a cancelling equation and *reads the leftover statement aloud* before answering, rather than reacting to the disappearance.

- **MC-2 — SINGLE-FOUND-SOLUTION-REPORTED-AS-COMPLETE-ANSWER** (foundational)
  - **Birth type**: Type 5, instruction-induced by the answer format. Years of one-solution equations, and an answer line shaped "x = ___", which has room for exactly one value and asks no further question.
  - **Characteristic phrase**: "x = 3" for x² = 9.
  - **Detection probe**: "Solve x² = 9. Give the solution set."
  - **Repair**: Blueprint Repair Action B02 — require the set notation, which makes incompleteness visible: {3} is a claim that 3 is the *only* one, and it is checkable by substituting −3 and finding it also works. The format does the teaching.
  - **Verification of death**: the learner asks "are there others?" unprompted on a novel equation, or verifies a candidate they did not find by the main method.

## Analogies
- **Best — the guest list.** Solving is producing the list of everyone admitted. The list may have one name, several, nobody, or everybody, and a list is not finished until you can say nobody is missing. This carries both misconceptions' corrections at once: it makes ∅ and ℝ ordinary list outcomes, and it makes completeness an obvious property of lists.
- **Alternative — the sieve.** Every real number is poured in; the equation is the mesh; the solution set is what remains. Cleanest carrier of the truth-value partition, and it makes ℝ (nothing filtered) and ∅ (everything filtered) the two natural extremes rather than anomalies.
- **Story analogy** — none; a two-hour node with a clean formal target.
- **ANTI-ANALOGY — "the x's cancelled, so it doesn't work."** MC-1 in one sentence, and it is the natural thing to say out loud at the moment the variable vanishes. Replace it with "the x's cancelled — so what's left, and is it true?"
- **ANTI-ANALOGY — "the answer is x = something."** Not false, but the format presupposes exactly one value and it is MC-2's birth mechanism. Write solution sets from the first lesson and the presupposition never forms.

## Demonstrations
- **The cancelling pair.** 2x + 3 = 2x + 3 and 2x + 3 = 2x + 5, worked side by side to the point where x disappears in both. *Elicit the prediction first*: "these will behave the same way — true or false?" Most learners predict the same behaviour, and watching one become ℝ and the other ∅ is the concept's central moment.
- **The substitution sweep.** For each of those two equations, try x = 0, 1, 100. In the first all three work; in the second none does. *Predict first.* This converts the residue rule from a stated procedure into an observation about what is actually happening.
- **The missed root.** x² = 9, solved by square-rooting, answer 3. Then substitute −3. *Predict first*: "is 3 the only one?" The learner's own method missed a solution their own check finds, which is a far stronger argument for completeness than a warning.

## Discovery Questions
Guided discovery, and the cancelling pair is genuinely discoverable rather than announced.
1. **Need**: "Solve 2x + 3 = 2x + 3." (The learner works and the x's vanish. Something has to be said about that, and the learner does not yet have a way to say it.)
2. **Playground**: "Before deciding what happened, just try some values. x = 0. x = 1. x = 100."
3. **Invention**: "So which values are solutions?" — all of them, discovered by test rather than by rule.
4. **Collision**: "Now do exactly the same with 2x + 3 = 2x + 5." Same cancellation, opposite answer. The learner cannot explain both with a rule about the variable vanishing, and must look at the residue.
5. **Formalisation**: solution set notation; ∅ and ℝ named; the residue rule stated as "read what's left".
6. **Compression**: "When the x goes, read the leftover. True means everything; false means nothing."

## Teaching Sequence
The Blueprint's teaching actions own the turn-level scripts. Two constraints matter. First, **the two cancelling cases must be worked as a contrast pair, never separately.** MC-1 is created precisely by teaching them as one topic ("the special cases") identified by their shared surface feature; taught as a discriminating pair, the difference is the lesson rather than a footnote. Second, **set notation should be required from the first answer written**, not introduced after the number-shaped format is established: MC-2's cause is the answer format, and changing the format is a cheaper intervention than warning learners to check for extra solutions. Note the boundary with `math.alg.equation`, which per its own Blueprint introduces the three solution counts proactively — this node's job is not to re-teach that but to make the *set* the object and to own the ℝ/∅ discrimination specifically.

## Tutor Actions
- **TEST-THINKING: Prediction** — "will these two equations behave the same way?", asked of the cancelling pair before either is worked. First action, and the single most diagnostic question in the concept.
- **DO: Demonstration** — the substitution sweep across both equations.
- **ORGANIZE: Representation Table** — equation / what's left after cancelling / true or false / solution set. Four columns, and the third is the one doing the work.
- **TEST-THINKING: Error Analysis** — "a student says x² = 9 has solution set {3}. Test their claim."
- **Does NOT fit: teaching solving techniques.** Owned by `math.alg.linear-equation-1var`; this node is about the shape of the answer, and technique here would let procedure substitute for the completeness habit.

## Voice Teaching Notes
The load-bearing question is "so what's left, and is it true?" — asked every time a variable cancels, until the learner asks it themselves. Listen for the tone of the sentence "the x's cancelled": delivered as an apology or a confession, it signals the learner reads the cancellation as failure, which is MC-1's precondition and appears before any wrong answer. Listen also for a final answer given as a bare number where a set was asked for; the format slip is MC-2's visible edge, and it is worth correcting every time rather than treating as shorthand, because the shorthand is the thing that hides the completeness question. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **"No solution" for an identity** — MC-1. Fast, and typically delivered with relief at having found *an* answer. Note a learner has a 50% chance of being right by guessing, so a single cancelling probe measures very little.
- **Correct on one cancelling case, wrong on the other** — MC-1 confirmed, and this is the pattern the paired probe exists to expose.
- **{3} for x² = 9** — MC-2. Also note the milder form: correct {3, −3} on a quadratic, but no checking behaviour on an unfamiliar equation. The habit is the target, not the particular answer.
- **Correct sets, no set notation** — a format gap rather than a misconception, and worth distinguishing: the learner may hold the concept and write shorthand. Ask them to state whether their answer means "only" and the distinction resolves.
- **Slow-correct with visible substitution testing** — exactly the intended behaviour. Testing values *is* the definition being applied, and it should be encouraged rather than optimised away.
- **Mastery trigger**: the Blueprint's gate at MAMR 5/5, with the added requirement that both cancelling cases appear and that one item have more than one solution.

## Tutor Recovery Strategy
The likely utterance is "the x disappeared and now I don't know what to do" — precisely accurate, and it names a real gap rather than a confusion. The concept-specific smaller question ignores the algebra entirely: **"Forget the x. Just read me what's left on the page."** Three equals three. **"Is that true?"** Yes. **"Then every number works."** The learner has the answer in two questions, neither of which required any technique, and the rule they just used is the rule. Repeat once with the false residue and the discrimination is installed. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept**, with an embedded **habit** (check for completeness). Review by presenting a cancelling equation and by presenting a multi-solution equation; reviewing one-solution equations tests nothing this concept teaches.
- Concept-specific deviation: MC-2 regrows continuously because the practice diet remains dominated by single-solution problems, and the answer format in most materials remains "x = ___". Keep a multi-solution item in permanent rotation, and prefer set notation in every review item.
- Interleaving partners: `math.alg.equation` (which owns the three solution counts — interleave rather than re-teach) and `math.alg.inequality`, where the solution set is an interval and the set framing pays off immediately.

## Transfer Connections
- **Near**: `math.alg.inequality` and `math.alg.inequality-1var`, where solution sets are intervals; `math.alg.quadratic-equation`, where two solutions is the norm; `math.func.zero-of-function`, the KG's own cross-link.
- **Far**: the general discipline of asking "have I found all of them?" — which is the difference between an example and a proof, and this is the first place a learner meets it operationally.
- **Real-world**: any constraint problem where the answer is a range rather than a value — acceptable dosages, tolerance bands, feasible budgets. Reporting a single satisfying value where a range was needed is a real and costly error outside mathematics.
- **Expert transfer**: the reframe from "find the answer" to "characterise the set of answers", which is the shape of essentially every advanced mathematical question.

## Cross-Subject Connections
- The KG lists `math.func.zero-of-function` as a cross-link; unauthored in this corpus, so no probe can be built against it yet. The connection is genuine — the zero set of a function *is* the solution set of f(x) = 0.
- **Computer science**, genuine: a database query returns a result set that may be empty, and the empty-result-versus-error distinction is exactly MC-1's discrimination in another notation. A learner who codes has a ready model.
- **Chemistry**, weak but real: equilibrium problems where a computed root must be rejected as non-physical are cases where the mathematical solution set is larger than the admissible one — a genuinely useful contrast, though the KG encodes no edge.

## Blueprint References
`docs/curriculum/blueprints/math.alg.solution-set.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1, MC-2) and its repair actions, the teaching-action sequence, the spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification (including the finding that MC-1 is caused by teaching the two cancelling cases *together as one topic*, grouped by their shared surface feature), the mental-model ladder, the two anti-analogies, the argument that requiring set notation from the first answer is a cheaper MC-2 intervention than warning learners to check, the observation that a single cancelling probe is near-worthless because guessing succeeds half the time, and the recovery move of reading the residue aloud.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Sixth instance of the domain-level pattern recorded through this batch, and the clearest one to state precisely: `math.alg.equation`'s Blueprint teaches the three solution counts proactively (its own MC-3 and TA-A04), and this node then owns the ℝ-versus-∅ discrimination and the set formalism. The division is genuine and defensible, but neither KG description mentions the other, so the two nodes read as overlapping. Across this batch the same shape has now appeared six times in `math.alg` — small child nodes carving out material their parent's Blueprint already covers. The Blueprints handle it consistently and well; the KG descriptions do not surface it at all. Recommended to the Curriculum Production Pipeline as a domain-wide description review rather than as six separate defects.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
