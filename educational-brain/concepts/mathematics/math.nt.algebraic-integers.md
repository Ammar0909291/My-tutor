# math.nt.algebraic-integers

## Identity
- **KG ID**: `math.nt.algebraic-integers`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.algebraic-number-theory` — load-bearing part: that 𝒪_K is the right object to study and *why* (unique factorisation of ideals, the class group). This concept supplies the element-level definition that concept used.
  - `math.abst.ring-theory` — load-bearing part: closure under addition and multiplication as the thing that makes a set a ring, since the central theorem here is exactly a closure claim.
- **Unlocks**: `math.nt.number-fields`
- **Cross-links**: none in the KG
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6 (⌈0.6×5⌉ = 3/5)
- **Estimated hours**: 20
- **Blueprint**: `docs/curriculum/blueprints/math.nt.algebraic-integers.md` (reused by reference throughout)

## Learning Objective
- The learner can define an algebraic integer as an α ∈ ℂ satisfying a *monic* polynomial with integer coefficients, and can distinguish it from an algebraic number.
- The learner can state that the algebraic integers in any field extension form a ring, and can prove that the algebraic integers in ℚ are exactly ℤ.
- The learner can compute norm and trace in a quadratic field — N(a + b√D) = a² − Db², Tr(a + b√D) = 2a — and explain why both are rational integers when α is an algebraic integer.
- The learner can recognise that norms can be negative in real quadratic fields, and connect N(u) = ±1 to the unit group.

## Core Understanding
One word carries the definition: **monic**. An algebraic *number* satisfies any polynomial with rational coefficients; an algebraic *integer* satisfies a polynomial with integer coefficients whose leading coefficient is 1. Drop monic and 3/2 qualifies (2x − 3 = 0); keep it and 3/2 is excluded, because the rational root theorem forces any rational root of a monic integer polynomial to be an integer — so the algebraic integers inside ℚ are exactly ℤ, no more. That single theorem is what licenses the word "integer" in the name. Outside ℚ the class is large: √2, i, ζₙ, (1 + √5)/2, ∛3 are all algebraic integers, none of them ordinary integers. The set is closed under addition and multiplication — non-obvious, since the sum of two roots of monic polynomials has no evident monic polynomial of its own — and that closure is what makes 𝒪_K a ring rather than a mere set. Norm and trace are the two symmetric functions of α's conjugates, N(α) = ∏σ(α) and Tr(α) = ∑σ(α); for α an algebraic integer both are rational and hence, by the same ℚ-theorem, ordinary integers. In a quadratic field N(a + b√D) = a² − Db², which for D < 0 is a squared modulus and always ≥ 0, and for D > 0 is a difference that can be negative — the sign freedom that gives real quadratic fields infinite unit groups via Pell's equation.

## Mental Models
1. **Beginner — integers, but for a bigger number system.** 𝒪_K plays the role in K that ℤ plays in ℚ. *Upgrade trigger*: being asked whether √2 is an integer. *Shelf life*: useful as an orientation and dangerous as a definition — it is exactly the model MC-2 grows from.
2. **Intermediate — the monic test.** Given α, ask: is there a monic integer polynomial killing it? That is the whole membership criterion, and it is checkable. *Upgrade trigger*: needing to decide membership for a sum of two algebraic integers, where no polynomial is evident. This is the model to install hardest.
3. **Advanced — conjugates and their symmetric functions.** α does not travel alone; it comes with its Galois conjugates, and norm and trace are the product and sum of the whole family. Integrality of α forces integrality of both. *Upgrade trigger*: asking what norms are *for* — units, factorisation, ideal size.
4. **Expert — the norm as a measuring instrument.** Norms convert questions about a strange ring into questions about ℤ; irreducibility arguments, unit determinations, and ideal norms all run through them. *Shelf life*: durable, and it is the model that makes the whole subject operational.

## Why Students Fail
The name is the trap, and it is a well-chosen name that nonetheless misleads in two directions at once. "Integer" imports ℤ, so the learner refuses √2 admission; "algebraic" is shared with "algebraic number", so the learner admits 3/2. Both errors come from reading the phrase compositionally, which is normally correct practice, and both survive an explanation that does not force the learner to *test* a specific element. The second failure is that the monic condition looks like fine print. Every other polynomial condition the learner has met — integer coefficients, degree, irreducibility — has been substantive, and a condition on the *leading coefficient alone* reads as normalisation. The third is that the first norms a learner computes are almost always in ℚ(i) or ℚ(√−5), where N(α) = a² + |D|b² is visibly a sum of squares, and positivity is silently absorbed as part of what a norm is.

## Misconceptions
Reused by reference from the Blueprint's misconception registry and its TB-R repair actions; birth types as classified there.

- **MC-1 — ALL-ALGEBRAIC-NUMBERS-ARE-ALGEBRAIC-INTEGERS** (foundational)
  - **Birth type**: Type 3, language contamination. "Algebraic" is shared across the two terms, and "integer" reads as a *value* restriction rather than a *polynomial* restriction — so "algebraic integer" sounds like a subclass defined by the number being integral, which the learner then cannot apply to 3/2 either way. The monic condition is nowhere in the name.
  - **Characteristic phrase**: "3/2 satisfies 2x − 3 = 0, so it's an algebraic integer."
  - **Detection probe** (verbatim): "3/2 is a root of 2x − 3. Is 3/2 an algebraic integer?"
  - **Repair**: Blueprint TB-R01. Two steps and the second is the one that lands: state the monic requirement, then *prove* that no monic integer polynomial has 3/2 as a root — if (p/q)ⁿ + aₙ₋₁(p/q)ⁿ⁻¹ + ⋯ + a₀ = 0 with gcd(p,q) = 1, multiplying by qⁿ gives pⁿ = −q(…), so q | pⁿ, so q = 1. The learner sees that the exclusion is a theorem, not a stipulation.
  - **Verification of death**: given a new rational and a non-monic polynomial it satisfies, the learner rejects it *and* cites the reason.

- **MC-2 — ALGEBRAIC-INTEGER-MEANS-INTEGER** (foundational)
  - **Birth type**: Type 3, language contamination, and the mirror image of MC-1. The word "integer" carries ℤ from every prior use, and no prior use has ever been metaphorical.
  - **Characteristic phrase**: "√2 isn't an integer, so it can't be an algebraic integer."
  - **Detection probe**: "Is √2 an algebraic integer? Is i?"
  - **Repair**: Blueprint TB-R03. Name the analogy explicitly — "integer" here means *plays the role ℤ plays*, not *belongs to ℤ* — then exhibit 𝒪_K for ℚ(√2) and ℚ(i) concretely, and finish with the fact that reconciles both readings: 𝒪_K ∩ ℚ = ℤ. The only algebraic integers that happen to be rational are the ordinary ones, which is precisely why the name is justified and precisely why it misleads.
  - **Verification of death**: the learner classifies √2, 3/2, i, and 1/2 correctly in one pass, giving the polynomial in each case.

- **MC-3 — NORMS-ARE-ALWAYS-POSITIVE** (moderate)
  - **Birth type**: Type 1, overgeneralisation, from a biased sample. In imaginary quadratic fields N(α) = |α|², visibly non-negative, and those are the fields used for the first factorisation examples because they are where UFD failure is cleanest.
  - **Characteristic phrase**: "a norm is a size, so it's positive."
  - **Detection probe**: "Compute N(1 + √2) in ℚ(√2)."  (Answer: 1 − 2 = −1.)
  - **Repair**: Blueprint TB-R02. The norm is a *product of conjugates*, not a modulus; for real embeddings both conjugates are real and their product can be negative. Then the payoff that makes the sign matter: units are exactly the elements with N(u) = ±1, so a² − Db² = ±1 has infinitely many solutions (Pell) and real quadratic fields have infinite unit groups, while a² + |D|b² = 1 pins imaginary ones down to a handful. The sign freedom is not a curiosity; it is the reason the two cases behave completely differently.
  - **Verification of death**: the learner predicts, before computing, whether a given quadratic field's norms can be negative, using only the sign of D.

## Analogies
- **Best — "integer" as a job title, not a passport.** 𝒪_K's elements hold the position ℤ holds in ℚ; the title describes the role, not the origin. *Breaking point*: job titles are assigned, and membership here is determined by a test — so the analogy must hand over to the monic test immediately rather than stand alone.
- **Alternative — the monic test as a door policy.** One condition at the door: leading coefficient 1. 3/2 arrives with 2x − 3 and is turned away, and no other polynomial will admit it. Carries the *checkability* of the definition, which the job-title image does not.
- **Story analogy** — the historical reason the definition is monic at all: it is the condition that makes the set closed under addition and multiplication, and closure is what the subject needed. Worth telling, because it converts the condition from arbitrary to designed.
- **ANTI-ANALOGY — "algebraic integers are the integers of K, so they're whole numbers there."** Installs MC-2, and "whole" is doing damage that "integer" alone does not.
- **ANTI-ANALOGY — "the norm measures how big α is."** Installs MC-3 directly. Norms are products of conjugates; size language should be avoided entirely in real quadratic fields, and if the learner offers it, correct the word rather than letting it pass.

## Demonstrations
- **The four-element classification.** √2, 3/2, i, 1/2 — for each, find a monic integer polynomial or show none exists. *Elicit the prediction first*, all four at once, in writing. The predictions typically split exactly along MC-1 and MC-2, which makes this one demonstration a full diagnostic.
- **The rational-root proof.** Walk the q | pⁿ argument on the board. *Predict first*: "could there be some clever monic polynomial with 3/2 as a root?" — the learner should feel the search is open before it is closed.
- **The sign-of-norm table.** N(a + b√D) for D = −1, −5, 2, 3, with a few sample elements each. *Predict first*: "which of these columns can contain a negative number?" This is MC-3's collision and it costs two minutes.
- **The unit hunt.** Find all α with N(α) = ±1 in ℤ[i], then in ℤ[√2]. The first search finishes (four units); the second does not (1 + √2 and all its powers). *Predict first*: "will this list be finite?"

## Discovery Questions
**Guided discovery works here and should be used for LO1 and LO4** — both are reachable by computation on small examples, and both are exactly where the misconceptions live.
1. **Need**: "Which of these are 'integers' in the way that matters: √2, 3/2, i, 1/2? Decide first, then we'll find a rule."
2. **Playground**: for each, hunt for a polynomial with integer coefficients. All four succeed. So that is not the rule.
3. **Invention**: "What separates the ones you *want* to call integers from the ones you don't?" The learner is looking at 2x − 3 next to x² − 2 and the leading coefficient is the visible difference.
4. **Collision**: "Is that just a convention, or does it do something?" — run the q | pⁿ argument, and the convention turns out to be exactly the condition that makes 𝒪_K ∩ ℚ = ℤ.
5. **Formalisation**: state the definition, and state the closure theorem (asserted here, proven in the ring-theory prerequisite's territory).
6. **Compression**: "Monic is the whole definition. Everything else follows."
For LO4 the same shape works with the norm sign: compute norms in an imaginary field, predict, then compute in a real one. LO2's closure theorem is **direct instruction** — its proof needs symmetric-function or module-finiteness machinery beyond this node — and should be labelled as asserted rather than derived.

## Teaching Sequence
The Blueprint's teaching-action components own the turn-level scripts. The load-bearing ordering constraint is that **MC-1 and MC-2 must be surfaced together, in the same demonstration, before the definition is stated.** They are mirror errors from one cause, and treating them in sequence lets the learner correct one by over-applying the other: a learner who has just been told √2 counts will start admitting 3/2 too, and a learner who has just been told 3/2 does not count will re-exclude √2. The four-element classification handles both at once and is the reason it is the first action. Secondly, **the rational-root proof must follow immediately**, because without it "monic" reads as stipulation and stipulations do not survive a month. Thirdly, **norms come after the definition is secure, and the real quadratic case must appear in the same session as the imaginary one** — MC-3 is a sampling artefact, and it is prevented for free by widening the sample, but only if the widening is not deferred to a later lesson.

## Tutor Actions
- **TEST-THINKING: Prediction** — the four-element classification, taken in writing before any teaching. First action, and it doubles as the diagnostic.
- **DO: Worked Example** — the q | pⁿ rational-root argument.
- **ORGANIZE: Representation Table** — element / polynomial / monic? / algebraic integer? — four rows, and it is the artefact that keeps MC-1 and MC-2 apart afterwards.
- **DO: Demonstration** — the unit hunt in ℤ[i] versus ℤ[√2].
- **TEST-THINKING: Error Analysis** — "a student says norms are always positive because they measure size. Find the field where that fails."
- **Does NOT fit: Game or drill on classification.** Speeded classification would drill the *surface* cue (does it look irrational?) rather than the monic test, and would reinforce exactly the compositional reading that causes both foundational misconceptions.

## Voice Teaching Notes
The load-bearing word is **monic**, and it must be said, not written and glossed over. Make the learner say it too, and say what it means, each of the first several times. Listen for the learner reading a polynomial aloud and skipping its leading coefficient — "two x minus three" said as "x minus three", or read with no stress on the 2 — which is the audible form of treating monic as fine print, and it appears before any wrong classification does. Listen also for "size" or "magnitude" attached to the word norm; that vocabulary choice *is* MC-3, several turns before a negative norm is ever computed. Pronunciation stakes are real here: 𝒪_K, ζₙ, and Tr must be sayable, and √D with D negative should be read carefully enough that the learner does not lose the sign. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Correct on √2, wrong on 3/2** — MC-1 alone. The learner has absorbed that the class is bigger than ℤ and not that it is bounded. Repair with the rational-root proof, not with more examples.
- **Correct on 3/2, wrong on √2** — MC-2 alone. Mirror case, and the repair is different: name the analogy in the word "integer", then 𝒪_K ∩ ℚ = ℤ.
- **Both wrong** — the compositional reading is intact and neither correction has been attempted. Go to the four-element demonstration whole; do not repair one side.
- **Both correct but unable to give the polynomial** — surface pattern-matching on "looks irrational". This passes a classification probe and fails everything downstream, and the gate must require the polynomial.
- **Fast-wrong on N(1 + √2)** — MC-3, dangerous quadrant. Fast and confident because "norms are positive" has never previously failed.
- **Mastery trigger**: the Blueprint's gate at MAMR 3/5, with the added requirement that at least one item require *producing* a monic polynomial rather than recognising one.

## Tutor Recovery Strategy
The likely utterance is "I don't understand what makes something an algebraic integer" — which is honest and specific, and the concept-specific smaller question is unusually clean because the definition is a single test: **"Forget everything else. Here's x² − 2. Is the leading coefficient 1? Are all the coefficients whole numbers? Is √2 a root? Then √2 is an algebraic integer. That's the whole test — try it on i and x² + 1."** Three yes/no checks, one element, thirty seconds. The learner ends the exchange having correctly classified something, which is the objective of the recovery, not the teaching. Rebuild by widening the element set one at a time. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **fact** (the definition) fused with **procedure** (norm and trace computation). The definition should be reviewed by *application* — classify an element — never by recitation, since recitation is exactly what both foundational misconceptions survive.
- Concept-specific deviation: MC-1 and MC-2 are mirror errors, so re-probes must always come in pairs. A single-sided re-probe will read as resolved while the mirror is intact, and worse, correcting one side alone can induce the other.
- Interleaving partners: `math.nt.algebraic-number-theory` (where the norms get used) and `math.found.rational-numbers` (for the ℚ-intersection theorem to stay meaningful). Interleave real and imaginary quadratic fields deliberately, since MC-3 is purely a sampling artefact.

## Transfer Connections
- **Near**: `math.nt.number-fields`, where 𝒪_K is constructed field by field and the discriminant test appears.
- **Far**: any "closure under the operations" argument — the surprise that a sum of two algebraic integers is one is the same surprise as closure results throughout algebra, and naming the pattern pays forward.
- **Real-world**: the norm's role in Pell's equation gives genuine continuity with `math.nt.pells-equation`, itself connected to lattice and approximation problems. Honest but internal to mathematics.
- **Expert transfer**: the reflex of reading a definition's *every* clause as load-bearing until proven otherwise. Monic is the case that teaches it, because dropping it changes the class from ℤ to all of ℚ.

## Cross-Subject Connections
- The KG records no `cross_links` for this concept, and that is an accurate reflection: it is an internal definitional node.
- **Computer science**, weak but real: exact arithmetic in algebraic number fields is implemented in every computer-algebra system, and the monic condition is what makes minimal polynomials a usable canonical representation. Recorded honestly, not asserted as a KG edge.
- No genuine connection to physics, chemistry, biology, or English.

## Blueprint References
`docs/curriculum/blueprints/math.nt.algebraic-integers.md`. Reused by reference, not restated: the misconception registry with its birth-type column, the TB-R01/TB-R02/TB-R03 three-step repair scripts (including the full rational-root proof, the norm-sign treatment, and the unit-group consequence), the learning-objective statement, and the mastery gate item set. This entry adds the mental-model ladder, the two anti-analogies, the finding that MC-1 and MC-2 are mirror errors from one compositional reading and must therefore be probed and repaired *together*, the discovery staging, the ordering constraints, and the recovery shrink-question.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Reinforces the dependency-direction finding recorded in `math.nt.algebraic-number-theory`'s entry: this node is `required by` nothing and `requires` a concept that already presupposes it (algebraic-number-theory's own first learning objective defines 𝒪_K as the algebraic integers in K, which is this node's content). The three-node cluster — algebraic-number-theory, algebraic-integers, number-fields — has a prerequisite ordering that does not match its logical ordering. Recorded for the Curriculum Production Pipeline; not fixed here. This entry is deliberately written to be self-contained enough to be taught first, last, or in the middle.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1).
