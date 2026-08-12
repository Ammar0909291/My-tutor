# math.alg.polynomial

## Identity
- **KG ID**: `math.alg.polynomial`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.expression` — load-bearing part: terms, coefficients, and the fact that an expression is a quantity rather than a question. A polynomial is a *restricted kind* of expression, and the restriction is only meaningful if the general class is understood first.
  - `math.arith.exponent-rules` — load-bearing part: what an exponent is and which exponents are integers. The polynomial restriction is stated entirely in terms of exponent type.
- **Unlocks**: `math.alg.factoring`, `math.alg.polynomial-roots`, `math.func.polynomial-function`
- **Cross-links**: `math.func.polynomial-function`, `math.abst.polynomial-ring` (neither yet authored in this corpus)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.alg.polynomial.md` (reused by reference throughout)

## Learning Objective
- The learner can classify an expression as a polynomial or not, applying the non-negative-integer-exponent restriction.
- The learner can write a polynomial in standard form and read off its degree and leading coefficient.
- The learner can state that a monomial is a polynomial, and that the mono/bi/tri prefixes count terms rather than determine membership.
- The learner can state that degree bounds the number of roots and governs end behaviour.

## Core Understanding
A polynomial is an expression of the form aₙxⁿ + ⋯ + a₁x + a₀ where every exponent is a **non-negative integer**. That single restriction is the entire definition, and everything else follows from it. Membership is decided by exponent *type*, not by term count — 7x³ is a polynomial, and so is 4, and so is a four-term expression — so the mono/bi/tri/poly prefixes are descriptive vocabulary counting terms, not a membership test. The degree is the highest exponent (for a single-variable polynomial), and it is a property of the *exponents*, never of the coefficients: in 10x² + 2x³ the degree is 3, not 10. Degree is load-bearing well beyond naming: it bounds the number of roots at n, it determines end behaviour (for large |x| the graph of p(x) looks like the graph of its leading term aₙxⁿ), and it is what makes polynomial division terminate. Standard form — descending exponents — is not cosmetic; it makes degree and leading term readable by inspection, which is why every downstream procedure begins by imposing it.

## Mental Models
1. **Beginner — a sum of power-of-x terms.** Each term is a number times x to a whole-number power. *Upgrade trigger*: meeting 3x⁻¹ + 2 and having to decide. *Shelf life*: correct and sufficient for classification, which is most of this concept.
2. **Intermediate — standard form as the canonical view.** Rewrite descending, and degree and leading term become visible without thought. *Upgrade trigger*: polynomial division, where missing terms must be written in with coefficient 0. This is the habit the Blueprint's Teaching Notes ask to be trained explicitly.
3. **Advanced — degree as the controlling parameter.** Degree bounds root count, sets end behaviour, and determines how many conditions pin a polynomial down. *Upgrade trigger*: the Factor Theorem, where each root supplies one factor and the count becomes a theorem rather than an observation.
4. **Expert — polynomials as a ring.** They add, subtract and multiply to give polynomials again but do not in general divide, which is exactly ℤ's situation and is why polynomial arithmetic looks like integer arithmetic. *Shelf life*: forward pointer to `math.abst.polynomial-ring`; install only when reached.

## Why Students Fail
The word does the damage twice. "Poly" means many, so a learner reasoning etymologically excludes single-term expressions — and etymological reasoning is normally a *good* habit that has served them in every other technical vocabulary. Meanwhile "degree" is an unfamiliar word attached to an expression full of numbers, and the most visually salient number is usually the largest coefficient, so degree attaches there. Neither error involves faulty reasoning; both involve reasonable inference from insufficient information, which is why both are repaired by making the definition's *criterion* explicit rather than by explaining harder. The third failure — admitting negative or fractional exponents — is a boundary the learner has no reason to suspect exists: they know the expression is algebraic, and nothing in "polynomial" announces a restriction.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry, with birth-type classification added.

- **MC-1 — DEGREE-IS-LARGEST-COEFFICIENT** (FOUNDATIONAL — the Blueprint names it the most disruptive error here, because degree propagates into root count, end behaviour and most later theorems)
  - **Birth type**: Type 3, language contamination. "Degree" carries no clue about which number it refers to, and the learner assigns it to the most salient one. The Blueprint's own root-cause analysis identifies exactly this.
  - **Characteristic phrase**: "the degree of 10x² + 2x³ is 10 because 10 is the biggest number."
  - **Detection probe** (verbatim): "What is the degree of 10x² + 2x³?" — the coefficients are deliberately larger than the exponents, which is what makes the probe diagnostic. A probe using 3x⁵ + 2x cannot distinguish the two readings.
  - **Repair**: Blueprint Repair Action TA-B01 — impose standard form first (2x³ + 10x²), which puts the highest-degree term in front and makes the exponent the thing being read. The habit and the repair are the same action, which is why the Blueprint asks for it on every problem.
  - **Verification of death**: correct degree on a polynomial whose largest coefficient is attached to its lowest-degree term.

- **MC-2 — MONOMIAL-IS-NOT-A-POLYNOMIAL** (moderate)
  - **Birth type**: Type 3, language contamination, and specifically etymological over-literalism — "poly" = many. The Blueprint names this precisely.
  - **Characteristic phrase**: "7x³ is a monomial, not a polynomial."
  - **Detection probe**: "Is 7x³ a polynomial? Is 4?"
  - **Repair**: Blueprint Repair Action TA-B02 — the set diagram: {monomials} ⊂ {polynomials}. The prefixes count terms; membership is about exponent type. Naming both facts together is what fixes it, because the learner is not wrong that "mono" means one — they are wrong that it excludes.
  - **Verification of death**: the learner classifies 4, 7x³ and 0 as polynomials and can say what the prefixes actually do.

- **MC-3 — NEGATIVE-EXPONENTS-ALLOWED** (moderate)
  - **Birth type**: Type 1, overgeneralisation. The learner knows the expression is algebraic and has no reason to suspect a narrower class exists inside that one; the restriction was never made salient because most examples satisfy it silently.
  - **Characteristic phrase**: "3x⁻¹ + 2 is a polynomial — it's just x to the minus one."
  - **Detection probe**: "Are these polynomials: 3x⁻¹ + 2, x^(1/2) + 5x, 3x² + 5?"
  - **Repair**: Blueprint Repair Action TA-B03 — state the exponent test as a checklist item and run it on all three. Then give the reason the restriction exists: with a negative exponent the expression is undefined at x = 0 and the whole apparatus of degree, roots and end behaviour stops applying.
  - **Verification of death**: the learner *checks every exponent* before classifying, including on an expression where the offending exponent is not in the leading term.

## Analogies
- **Best — the passport check.** Two questions per term: is the exponent a whole number, and is it non-negative? All terms pass, or it is not a polynomial. Deliberately mechanical, because MC-3 is a failure to check rather than a failure to understand.
- **Alternative — integers and rationals.** Polynomials sit inside algebraic expressions the way ℤ sits inside ℚ: closed under +, −, × but not ÷. This is the honest structural analogy, and it prepares the ring idea without naming it.
- **Story analogy** — none; a ten-hour concept whose difficulty is classification precision does not benefit from narrative. Recording the absence deliberately.
- **ANTI-ANALOGY — "poly means many, so a polynomial has many terms."** This is MC-2's exact birth mechanism, and it is what the word says. It must be pre-empted at the moment the word is introduced, because once the learner has derived it themselves it feels like understanding rather than error.
- **ANTI-ANALOGY — "the degree is the biggest number in it."** A tempting simplification that is *true for most textbook examples*, which is precisely why it survives. Say "the highest exponent" every time, with no shortening.

## Demonstrations
- **The classification set.** 3x² + 5, 7x³, 4, 3x⁻¹ + 2, x^(1/2) + 5x, x² + 1/x. *Elicit predictions first, in writing, all six.* Every misconception appears in one task, and the written record separates a guess from a belief.
- **The degree trap.** 10x² + 2x³, degree asked before standard form is imposed, then again after rewriting as 2x³ + 10x². *Predict first.* The prediction usually changes, and the learner sees that standard form was doing the work.
- **End behaviour by table.** Evaluate 2x³ + 10x² and its leading term 2x³ at x = 10, 100, 1000; the ratio approaches 1. *Predict first*: "at x = 1000, will the x² term matter?" This makes "degree governs end behaviour" a computed fact rather than a stated one, and it is the demonstration that gives degree a purpose beyond naming.

## Discovery Questions
Guided discovery works for the restriction and for end behaviour; the definition itself is a convention and is stated.
1. **Need**: "Sort these six expressions into two piles, any way that seems natural to you." (Learners typically sort by term count — which produces MC-2 in visible form, on the table, ready to be examined.)
2. **Playground**: try evaluating each at x = 0. Two of them fail.
3. **Invention**: "What do the ones that failed have in common?" — the learner locates the negative and fractional exponents themselves.
4. **Collision**: "So is 7x³, with one term, in the same pile as 3x⁻¹ + 2, with two?" The term-count sort and the exponent sort disagree, and the learner must choose which one the definition should use.
5. **Formalisation**: polynomial = every exponent a non-negative integer. Term count is descriptive only.
6. **Compression**: "Check the exponents, not the term count."
End behaviour gets its own short discovery via the evaluation table. Degree is *stated* — it is a naming convention — but the standard-form habit that makes it readable is trained rather than told.

## Teaching Sequence
The Blueprint's Component 4 owns the turn-level scripts. Three constraints matter. First, **standard form must be imposed before degree is ever asked for**, on every problem, permanently — the Blueprint's Teaching Notes call for training this as an explicit habit, and the reason is that it converts MC-1 from a misconception into a non-event: with 2x³ + 10x² written down, the highest exponent is at the front and there is nothing to misread. Second, **MC-2 must be pre-empted at the moment the word "polynomial" is first spoken**, not repaired afterwards, because the etymological inference is immediate and feels like comprehension. Third, **the degree trap probe must use a polynomial whose largest coefficient sits on a lower-degree term**; every other example is silently non-diagnostic, and a teaching sequence built on 3x⁵ + 2x will certify MC-1 intact. The at-most-n-roots intuition is planted here without proof, per the Blueprint's note, with the proof deferred to `math.alg.polynomial-roots`.

## Tutor Actions
- **TEST-THINKING: Prediction** — the six-expression sort, in writing, before teaching. First action; it surfaces all three misconceptions and it also surfaces the learner's spontaneous sorting principle, which is itself diagnostic.
- **ORGANIZE: Representation Table** — expression / exponents / all non-negative integers? / polynomial? This makes the test mechanical.
- **DO: Worked Example** — rewriting into standard form and reading degree and leading coefficient off the front.
- **TEST-THINKING: Error Analysis** — "a student says the degree of 10x² + 2x³ is 10. What are they reading?"
- **DO: Demonstration** — the end-behaviour evaluation table.
- **SHOW: Concept Map** — {monomials} ⊂ {binomials, trinomials, …} ⊂ {polynomials} ⊂ {algebraic expressions}, with the membership criterion written on the polynomial boundary.
- **Does NOT fit: drill on classification before the exponent test is explicit.** It automates whichever sorting principle the learner brought, which is usually term count.

## Voice Teaching Notes
The load-bearing sentence is "the degree is the highest exponent" — never shortened to "the highest number", which is the anti-analogy and is what the learner will remember. Listen for the learner saying "the big number" when reasoning about degree; that phrase is MC-1 several turns before a wrong answer appears. Listen for hesitation on single-term expressions during classification: a pause before "is 7x³ a polynomial?" is MC-2 even when the eventual answer is yes, because the learner is overriding an inference rather than applying a test. Reading polynomials aloud in standard form ("two x cubed plus ten x squared") should be modelled and asked for, since the spoken order reinforces the written habit that prevents MC-1. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Degree given as a coefficient** — MC-1, and it is only detectable on a probe where coefficient and exponent disagree in size. Fast and confident; treat as misconception.
- **Correct degree, but only after visible rewriting** — the standard-form habit is doing its job. This is the target state, not a slowness problem.
- **7x³ rejected as a polynomial** — MC-2. Note it often coexists with completely correct degree work, so a degree-focused gate will miss it entirely.
- **3x⁻¹ + 2 accepted** — MC-3. Also note the harder variant: a learner may reject 3x⁻¹ + 2 (where the offending term is obvious) and accept 3x² + 5x + 2x⁻¹, where it is buried. The probe set needs the buried case.
- **Correct classification with no stated criterion** — pattern-matching on appearance. Passes classification probes and fails the first unfamiliar form; the gate must ask for the test, not just the verdict.
- **Mastery trigger**: the Blueprint's Component 4 gate at MAMR 5/5, with the added requirement that the degree item be of the coefficient-larger-than-exponent form and the classification item include a buried non-integer exponent.

## Tutor Recovery Strategy
The likely utterance is "I keep getting the degree wrong" — a precise self-report, and the fix is procedural rather than conceptual. The concept-specific smaller question hands over the habit rather than the explanation: **"Don't answer yet. First just rewrite it with the biggest power at the front. Now what's the first exponent you see?"** Two steps, both mechanical, and the learner produces the right answer by a route they can repeat. Do not re-explain what degree means; the learner usually knows and is failing to *locate* it, and re-explaining a known definition reads as not being listened to. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept** (the membership criterion) fused with **procedure** (standard form, degree extraction). Review both; classification decays as a criterion while standard form persists as a habit, so a learner can look fluent while the definition has gone.
- Concept-specific deviation: MC-1 is re-triggered whenever a polynomial appears with unusually large coefficients, which is common in applied contexts. Keep a large-coefficient, low-degree item in the review rotation.
- Interleaving partners: `math.alg.degree` (the immediate child node, and effectively this concept's MC-1 given its own home — interleave rather than sequence), `math.alg.expression` (the superset, for boundary discrimination), and later `math.alg.factoring`.

## Transfer Connections
- **Near**: `math.alg.degree`, `math.alg.factoring`, `math.alg.polynomial-roots`, `math.alg.polynomial-operations` — this node is the gateway to roughly a third of the domain.
- **Far**: end behaviour is the first instance of "for large inputs, only the dominant term matters", which recurs as asymptotic analysis in calculus and as complexity classes in computing.
- **Real-world**: any model fitted as a curve — trajectory, cost, growth — is a polynomial, and the degree is the modelling choice being made.
- **Expert transfer**: the recognition that a *restriction* can be what makes a class useful. Polynomials are interesting precisely because the exponent restriction buys degree, root bounds and termination of division; a learner who sees restrictions as limitations rather than as sources of structure will not generalise this.

## Cross-Subject Connections
- The KG lists `math.func.polynomial-function` and `math.abst.polynomial-ring` as cross-links; neither is authored in this corpus yet, so no probe can be built against either. Both are genuine and load-bearing rather than lateral.
- **Computer science**, genuine: polynomial time complexity, and polynomial interpolation as the basis of error-correcting codes and secret sharing. The degree-bounds-roots fact is exactly what makes Shamir's scheme work.
- **Physics**, genuine: kinematic equations are degree-2 polynomials in t, and reading their degree is what tells the learner how many times a trajectory can cross a given height.

## Blueprint References
`docs/curriculum/blueprints/math.alg.polynomial.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3) with its root-cause analysis and surface forms, the Component 5 repair actions TA-B01..TA-B03, the Component 4 teaching-action sequence, the Component 6 spaced-repetition schedule, and the Component 8 notes on standard-form discipline, monomial membership, end behaviour as a named rule, and the deferral of the at-most-n-roots proof. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies, the finding that a degree probe is non-diagnostic unless the largest coefficient sits on a lower-degree term, the buried-exponent variant of MC-3 that ordinary probes miss, and the recovery move of handing over the standard-form habit rather than re-explaining degree.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
`math.alg.degree` is a separate KG node requiring this one, with `estimated_hours: 1`, while this node's own Blueprint teaches degree in full as part of MC-1's repair — a genuine overlap of the same kind noted at `math.alg.exponent-rules` and its three extension nodes. The overlap is workable (this concept establishes degree for single-variable polynomials; the child node owns multivariable degree and the root-count bound) but the boundary is not visible from the KG descriptions alone. Recorded for the Curriculum Production Pipeline as part of a recurring pattern in this domain: several one-hour child nodes carve out material their ten-hour parent already teaches. Not fixed here.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
