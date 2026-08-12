# math.alg.negative-exponent

## Identity
- **KG ID**: `math.alg.negative-exponent`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.exponent-rules` — load-bearing part: the quotient rule and the zero-exponent result it produces. The negative-exponent rule is one further step along the same derivation, and it is only cheap if the previous step is already secure.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: `docs/curriculum/blueprints/math.alg.negative-exponent.md` (reused by reference throughout)

## Learning Objective
- The learner can state and derive a⁻ⁿ = 1/aⁿ for a ≠ 0.
- The learner can move a factor between numerator and denominator by flipping the sign of its exponent, in both directions.
- The learner can simplify expressions in which a negative exponent already sits in the denominator, producing a positive-exponent numerator factor.
- The learner can state that the sign of the exponent says nothing about the sign of the value.

## Core Understanding
a⁻ⁿ = 1/aⁿ for every nonzero a, and like the zero case it is forced. a⁰/aⁿ is 1/aⁿ by direct reading; by the quotient rule it is a⁰⁻ⁿ = a⁻ⁿ. Two names for one number. The operational content is that a negative exponent marks a factor as belonging on the *other side of the fraction bar*: x⁻³ in the numerator is x³ in the denominator, and — the half that is usually skipped — x⁻³ in the *denominator* is x³ in the *numerator*, since 1/x⁻³ = 1/(1/x³) = x³. The rule is a position rule, and its most common failure is reading it as a sign rule. Nothing in the derivation touches the value's sign: 2⁻³ = 1/8, which is positive and small; (−2)⁻³ = −1/8, which is negative because the *base* is negative, not because the exponent is. Exponent sign controls position; base sign controls value sign; the two are independent.

## Mental Models
1. **Beginner — the flip.** A negative exponent means "put it downstairs". *Upgrade trigger*: a negative exponent already downstairs. *Shelf life*: adequate for half the cases and it silently fails on the other half, which is exactly MC-1.
2. **Intermediate — the two-way move.** A factor may cross the fraction bar in either direction, flipping its exponent's sign as it goes. *Upgrade trigger*: none required; this is the durable model and it covers every case in one statement.
3. **Advanced — position versus value.** The exponent's sign is bookkeeping about where the factor lives; the value's sign comes from the base. *Upgrade trigger*: meeting (−2)⁻³ and having to explain why it is negative for a reason unrelated to the exponent.
4. **Expert — exponents as integers on a number line.** aᵐ·aⁿ = aᵐ⁺ⁿ holds for all integers m, n, positive and negative, and the negative range is not an extension bolted on but the completion of the pattern. *Shelf life*: durable; it is the model that makes fractional exponents feel like the next obvious step rather than a new topic.

## Why Students Fail
One word does most of the damage: "negative" is overwhelmingly a fact about *value* in the learner's experience — negative numbers, negative temperatures, negative balances — and this is the first place it is a fact about *position*. Nothing in the notation flags the change of role, so the learner transfers the familiar meaning and produces a⁻ⁿ = −aⁿ. The second failure is narrower and more revealing: the rule is almost always taught in one direction only, "negative exponent goes to the bottom", because that is the direction that appears in most simplification exercises. A learner who has only ever moved factors downward is genuinely stuck when the negative exponent is already at the bottom, and will often cancel it away or leave it, because the rule they hold has no reverse gear.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — NEGATIVE-EXPONENT-IN-DENOMINATOR-MISHANDLED** (foundational)
  - **Birth type**: Type 5, instruction-induced. The rule is taught unidirectionally because the exercise diet is unidirectional. The learner's rule is not wrong, it is incomplete, and the incompleteness is a faithful reflection of what they were shown.
  - **Characteristic phrase**: faced with 1/x⁻³, "it's already on the bottom, so… it stays?"
  - **Detection probe** (verbatim): "Simplify 1/x⁻³." Note that a probe using x⁻³ alone cannot detect this at all.
  - **Repair**: Blueprint Repair Action B01 — run it numerically first, with a = 2: 1/2⁻³ = 1/(1/8) = 8 = 2³. The reciprocal-of-a-reciprocal is visible in arithmetic before it is stated in algebra, and the learner sees the exponent come *up*.
  - **Verification of death**: correct simplification of a compound expression with negative exponents in both numerator and denominator, e.g. (x⁻²y³)/(z⁻¹).

- **MC-2 — NEGATIVE-EXPONENT-ASSUMED-TO-PRODUCE-NEGATIVE-VALUE** (foundational)
  - **Birth type**: Type 3, language contamination. "Negative" has meant "less than zero" in every previous encounter; here it means "on the other side of the bar", and the word carries its old meaning across unaided.
  - **Characteristic phrase**: "2⁻³ is negative eight."
  - **Detection probe**: "Is 2⁻³ positive or negative? What is it?" Then: "What about (−2)⁻³?" The pair is necessary — the first alone cannot distinguish a learner who knows the value from one who has separated the two roles of the sign.
  - **Repair**: Blueprint Repair Action B02 — compute 2⁻³ = 1/8 and place it on a number line beside 2³ = 8 and −8. It is small and positive; it is not on the negative side at all. Then contrast (−2)⁻³ = −1/8 and ask *which* sign made it negative.
  - **Verification of death**: the learner predicts the sign of (−3)⁻² correctly (positive, because the exponent is even) — which requires the two roles to be genuinely separated.

## Analogies
- **Best — the fraction bar as a doorway.** A factor can walk through in either direction; its exponent's sign flips as it passes. *Breaking point*: none serious for this concept, which is why it is the primary analogy — but it must be demonstrated in *both* directions on first use, or it reproduces MC-1's unidirectionality.
- **Alternative — the exponent number line.** …, a², a¹, a⁰, a⁻¹, a⁻²  — each step divides by a. Going left multiplies, going right divides, and negative exponents are simply the continuation. Directly prevents MC-2, because the values 8, 4, 2, 1, ½, ¼ are visibly all positive.
- **Story analogy** — none; a two-hour procedural node.
- **ANTI-ANALOGY — "the minus flips the sign."** Two of those words are right and the combination is MC-2 verbatim. Say "flips it over", or better, "moves it across the bar" — position language, never sign language.
- **ANTI-ANALOGY — "a negative exponent means it goes on the bottom."** True, unidirectional, and it is MC-1's exact birth mechanism. Say "a negative exponent means it belongs on the other side", which is symmetric and costs three words.

## Demonstrations
- **The descending powers of 2.** 2³ = 8, 2² = 4, 2¹ = 2, 2⁰ = 1, 2⁻¹ = ½, 2⁻² = ¼. *Elicit the prediction first*: "what comes after 1?" This derives the rule and refutes MC-2 in the same six lines, because every value on the list is positive.
- **The reciprocal-of-a-reciprocal.** 1/2⁻³ computed as 1/(1/8) = 8. *Predict first*: "is this bigger or smaller than 1?" A learner holding MC-1 predicts smaller and watches it come out as 8.
- **The sign-source contrast.** 2⁻³, (−2)⁻³, (−2)⁻², (−3)² side by side. *Predict the sign of each first, in writing.* The pattern that emerges — the exponent's sign never matters to the answer's sign, only the base's sign and the exponent's parity — is the concept's most transferable observation and it cannot be arrived at from a single example.

## Discovery Questions
Guided discovery, and it fits comfortably in the two hours.
1. **Need**: "You know a⁰ = 1. What is a⁰ divided by a³?" (Directly: 1/a³. By the quotient rule: a⁻³.)
2. **Playground**: build the descending powers-of-2 table and continue it past 2⁰.
3. **Invention**: "So what does a negative exponent do?"  Take the answer in the learner's words; if it contains the word "negative" applied to the value, MC-2 is present and visible.
4. **Collision**: "Now: 1/2⁻³. Your rule says the negative exponent goes to the bottom — but it's already there. What happens?" The unidirectional rule fails on the learner's own worked example, which is the cheapest possible repair for MC-1 because it happens before the misconception has been practised.
5. **Formalisation**: a⁻ⁿ = 1/aⁿ, and equivalently 1/a⁻ⁿ = aⁿ, both stated, for a ≠ 0.
6. **Compression**: "The sign of the exponent says which side of the bar. Nothing else."

## Teaching Sequence
The Blueprint's teaching actions own the turn-level scripts. Two constraints are load-bearing. First, **both directions of the move must be taught in the same breath as the rule itself**, not as a later special case. MC-1 is created purely by unidirectional teaching, and the cost of prevention is one extra example at the moment of introduction; the cost of repair is undoing a practised procedure. Second, **the sign-source contrast must use a negative base**, because with positive bases only, the exponent's sign and the value's sign never disagree and MC-2 cannot be detected, let alone corrected. Concretely: (−2)⁻³ must appear inside the lesson. Note also that this concept's derivation depends on `math.alg.zero-exponent`'s result; if that node has been taught, chain from it explicitly rather than re-deriving, and if it has not, derive a⁰ = 1 first — the two-line chain is much stronger than either step alone.

## Tutor Actions
- **TEST-THINKING: Prediction** — sign and value of 2⁻³, taken before teaching. First action; MC-2 appears immediately.
- **DO: Demonstration** — the descending powers-of-2 table.
- **DO: Worked Example** — 1/2⁻³ computed arithmetically, then generalised.
- **ORGANIZE: Representation Table** — expression / equivalent positive-exponent form / value, run in both directions across the bar.
- **TEST-THINKING: Error Analysis** — "a student writes 2⁻³ = −8. Where exactly did the minus sign end up, and where should it have gone?"
- **Does NOT fit: drill before both directions are established.** Speeded practice on downward moves only is precisely how MC-1 is manufactured, and the practice makes it much harder to shift.

## Voice Teaching Notes
The load-bearing sentence is "the sign of the exponent tells you which side of the bar, not whether the answer is negative." Say it whenever a negative exponent appears; it is the whole of MC-2 in one line. Listen for the learner reading x⁻³ aloud as "minus x cubed" rather than "x to the minus three" — the misreading *is* the misconception, it is audible immediately, and correcting the reading is a cheaper intervention than correcting the belief. Listen also for hesitation specifically when the negative exponent is in a denominator; that pause is MC-1 and it is easy to miss because the learner often recovers by guessing correctly. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **2⁻³ = −8** — MC-2 undisguised. Fast and confident; the word "negative" did the work.
- **2⁻³ = 1/8 but hesitation on the sign of (−2)⁻³** — MC-2 partially repaired: the value is memorised for positive bases and the two roles of the sign have not been separated. Only a negative-base probe detects this.
- **Correct on x⁻³, stuck or wrong on 1/x⁻³** — MC-1, and it is invisible to every numerator-only probe. Since numerator-only is the standard exercise form, this misconception routinely survives an entire chapter.
- **Correct simplification with the answer left containing a negative exponent** — not a misconception; a convention gap about what "simplified" requires here. Worth stating rather than marking wrong.
- **Slow-correct with visible re-derivation from a⁰** — the target state. The chain from the zero exponent is what makes the rule recoverable, and its use should be encouraged rather than trained out.
- **Mastery trigger**: the Blueprint's gate at MAMR 5/5, with the added requirement that one item place a negative exponent in a denominator and one use a negative base.

## Tutor Recovery Strategy
The likely utterance is "I keep putting the minus sign in the wrong place" — an accurate self-diagnosis, and one that names the position/value confusion better than most tutors would. The concept-specific smaller question drops out of algebra into arithmetic the learner cannot dispute: **"What is one half? Is it negative?"** No. **"Write it as 2 to a power."** 2⁻¹. **"So there's a minus in the exponent and the number is positive. Where did the minus go?"** Into the position, not the value. Thirty seconds, one number, and the two roles are separated by the learner's own observation rather than by instruction. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure** (`bloom: apply`, correctly) resting on a one-line derivation. Review the procedure speeded, in both directions, and keep the derivation as an explanation-on-demand fallback.
- Concept-specific deviation: MC-2's source — the word "negative" meaning "less than zero" — is reinforced continuously by the rest of mathematics and never retires. Per `../student-state/03`, keep it DORMANT-VERIFIED with a negative-base re-probe rather than marking it resolved.
- Interleaving partners: `math.alg.zero-exponent` (the previous step in the same derivation chain) and `math.alg.fractional-exponent` (the next). Teaching the three as one derivation strategy rather than three rules is worth more than reviewing any of them alone. Also `math.arith.scientific-notation`, where negative exponents are used constantly and where fluency here pays immediately.

## Transfer Connections
- **Near**: `math.alg.fractional-exponent`, `math.alg.rational-expressions`, and every simplification involving division of powers.
- **Far**: reciprocal thinking generally — that dividing by something is multiplying by its inverse, which is the same move in a different notation.
- **Real-world**: scientific notation for small quantities (3 × 10⁻⁹ m), unit prefixes (milli-, micro-, nano-), and inverse-square laws. The nanometre case is a particularly good MC-2 collision: nobody thinks a nanometre is a negative length.
- **Expert transfer**: the recognition that a symbol's role can change with context — the minus sign means one thing in front of a number and another in an exponent — which is a genuine notational-literacy skill and this is an early, clean instance of it.

## Cross-Subject Connections
- **Physics**, genuine and load-bearing: every derived unit uses negative exponents (m·s⁻², kg·m⁻³), and a learner holding MC-2 reads "per second squared" as something negative. `phys.meas.units` depends on this being clean.
- **Chemistry**, genuine: concentrations, pH, and rate constants all use negative powers of ten routinely.
- **Computer science**, genuine: 2⁻ⁿ in floating-point representation and in probability halving arguments.
- The KG records no `cross_links`, which is a genuine omission given how load-bearing this rule is in physics unit notation. Recorded as feedback.

## Blueprint References
`docs/curriculum/blueprints/math.alg.negative-exponent.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1, MC-2) and its repair actions B01–B02, the teaching-action sequence, the spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies (including the identification of "a negative exponent means it goes on the bottom" as MC-1's exact birth mechanism), the finding that MC-1 is undetectable by the numerator-only probes that make up the standard exercise diet, the requirement that a negative *base* appear or MC-2 cannot be detected, the derivation chain from `math.alg.zero-exponent`, and the recovery move through one-half as a positive number with a negative exponent.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Two items. First, `cross_links: []` is a genuine omission here rather than an accurate emptiness: negative exponents are the notation in which every derived physical unit is written, and MC-2 has direct consequences in `phys.meas.units`. A cross-link would give the Teaching Engine a real transfer target and is recommended. Second, this node is the fifth instance of the domain-level pattern first recorded at `math.alg.exponent-rules` — a small child node whose content the parent Blueprint already derives. Here the division is more defensible than elsewhere (`bloom: apply` versus the parent's derivation focus, and the denominator case is genuinely this node's own), but the boundary still is not visible from the KG descriptions. Recorded as part of the same domain-level observation.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
