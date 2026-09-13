# math.alg.factor-theorem

## Identity
- **KG ID**: `math.alg.factor-theorem`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.remainder-theorem` — load-bearing part: the Factor Theorem is not a new fact but the Remainder Theorem's own r=0 special case, made explicit; without the general statement (remainder = p(a)) already secure, "p(a)=0 means (x−a) is a factor" is an isolated rule rather than a direct, obvious corollary.
- **Unlocks**: `math.alg.polynomial-roots`
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (MAMR = ⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.alg.factor-theorem.md` (reused by reference throughout)

## Learning Objective
- The learner can test whether (x − a) is a factor of a polynomial by evaluating p(a), correctly deriving a by solving the divisor equal to zero, rather than reading its sign directly off the divisor.
- The learner can, after finding one factor, deflate the polynomial by dividing by that factor to obtain a lower-degree quotient, and continue applying the theorem to the quotient rather than treating the first factor found as the complete factorisation.
- The learner can use the Rational Root candidates — divisors of the constant term over divisors of the leading coefficient — as a systematic, finite search strategy rather than testing values without a plan.

## Core Understanding
The Factor Theorem states that (x − a) is a factor of a polynomial p(x) if and only if p(a) = 0, and this is not a second fact to learn alongside the Remainder Theorem — it is the Remainder Theorem's own logic examined at exactly one special value of the remainder. Since the Remainder Theorem already establishes that dividing p(x) by (x − a) leaves a remainder of p(a), and a divisor genuinely *divides evenly* (is a true factor) precisely when that remainder is zero, "p(a) = 0 implies (x − a) is a factor" follows immediately with no new machinery required — the Factor Theorem is what the Remainder Theorem says at the one input value that matters most for factoring. The theorem's real power is not in testing a single candidate but in iterating: once a genuine factor (x − a) is confirmed, dividing p(x) by it (via synthetic division, already known from `math.alg.polynomial-division`) produces a quotient of one lower degree, to which the identical theorem can be applied again — this deflation step is what turns a one-shot factor test into a complete factorisation procedure, and treating the first successful test as the finished answer stops the process before a cubic (or higher) polynomial's remaining factors have been found. Because testing arbitrary values for a is unbounded and inefficient, the Rational Root candidates — every value of the form (a divisor of the constant term) divided by (a divisor of the leading coefficient) — narrow the search to a small, finite, checkable list for any polynomial with integer coefficients, turning "guess and check forever" into "check this specific short list, in order."

## Mental Models
1. **Beginner — test a value; if it gives zero, that's a factor.** For p(x)=x³−7x+6, testing p(2)=0 confirms (x−2) is a factor. *Upgrade trigger*: a cubic or higher-degree polynomial, where finding one factor is not the same as finishing the factorisation. *Shelf life*: one session.
2. **Intermediate — after finding a factor, divide it out and keep going.** (x−2) found → divide p(x) by (x−2) synthetically → get a quotient of lower degree → apply the theorem again to THAT quotient. *Upgrade trigger*: a polynomial where random guessing at candidate values wastes significant time or misses a root — motivating a systematic search. *Shelf life*: durable and remains correct permanently, once the deflation habit is installed.
3. **Advanced — the Rational Root candidates bound the search to a short, finite list, derived directly from the polynomial's own constant and leading coefficients.** No guessing is needed once the candidate list is written down; testing proceeds through a known, ordered set. *Upgrade trigger*: a polynomial whose real roots are not rational at all (e.g. involving surds), where the Rational Root list correctly finds NO candidates that work, and a different technique (the quadratic formula, applied to the final deflated quotient) is needed to finish.
4. **Expert — the Factor Theorem, the Remainder Theorem, and root-finding are three views of a single algebraic identity, and complete factorisation is simply "apply the theorem, deflate, repeat" until nothing further can be factored over the reals.** *Shelf life*: permanent, and it is the model this concept's own unlock (`math.alg.polynomial-roots`, covering multiplicity and Vieta's formulas) is designed to deepen further.

## Why Students Fail
The single most frequent failure is an exact carry-over from `math.alg.remainder-theorem`'s own MC-1: for a divisor written (x + c), the learner tests p(c) rather than the correct p(−c) — reading the visible constant's sign directly rather than solving (x + c) = 0 for x — producing a false negative (concluding a genuine factor is not one) or, less often, a false positive. The second major failure is stopping too early: having found one value a for which p(a) = 0, the learner writes (x − a) as if it were the *complete* factorisation of a degree-3-or-higher polynomial, never performing the deflation step (dividing p(x) by the confirmed factor) that would reveal the remaining, lower-degree quotient still waiting to be factored — the theorem is understood as "detect a factor," not "detect a factor and then continue," so a cubic with three genuine linear factors gets reported with only one. The third failure is strategic rather than conceptual: without connecting the Rational Root candidates (divisors of the constant term over divisors of the leading coefficient) to the factor-testing process, the learner tries values with no organizing principle — sometimes missing a genuine integer root by never trying it, sometimes wasting substantial effort testing values (including fractions or large numbers) that could never have worked, because the finite, checkable candidate list was never constructed in the first place.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its repair actions B01–B03, with birth-type classification added.

- **MC-1 — SUBSTITUTE-WRONG-SIGN** (FOUNDATIONAL)
  - **Birth type**: Type 4, notation-induced — identical in mechanism to `math.alg.remainder-theorem`'s own MC-1: the divisor's visible constant is pattern-matched directly as the test value, rather than being derived by solving the divisor equal to zero.
  - **Characteristic phrase**: for divisor (x+3), testing p(3) rather than the correct p(−3), producing a false conclusion about whether the divisor is a factor.
  - **Detection probe** (verbatim, Blueprint P41): "For divisor (x+5), which value of a do you test: a=5, or a=−5?" — choosing a=5 confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — restate the derivation rule with no exceptions: write the divisor in the form (x − □); whatever fills □ is a. For (x+5) = (x − (−5)): □ = −5.
  - **Verification of death**: given a mixed set of (x−k) and (x+k) divisors, the learner derives the correct test value for each by solving, not by reading the visible sign.

- **MC-2 — FACTOR-FOUND-MEANS-DONE** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the theorem's own name ("Factor Theorem," find a factor) is read as the whole task, with no separate step ever demonstrated for what happens after a factor is confirmed, so "find one" is mistaken for "finish factoring."
  - **Characteristic phrase**: finding p(2)=0 for a cubic and reporting "(x−2)" alone as the complete factorisation, leaving the remaining quadratic factor unaddressed.
  - **Detection probe** (verbatim, Blueprint P41): given a confirmed factor of a cubic, ask whether the factorisation is now complete — answering yes confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — make deflation an explicit second step attached to every successful factor test: divide p(x) by the confirmed factor via synthetic division to obtain a quotient one degree lower, then apply the theorem again to that quotient.
  - **Verification of death**: given a cubic polynomial, the learner finds the first factor, divides to obtain the quadratic quotient, and factors that quotient too, without being prompted to continue.

- **MC-3 — RATIONAL-ROOT-NOT-NEEDED** (moderate)
  - **Birth type**: Type 5, instruction-induced — the Rational Root Theorem's connection to the Factor Theorem's own search process is often left implicit, so the finite candidate list is never constructed and testing degenerates into open-ended, unstructured guessing.
  - **Characteristic phrase**: trying arbitrary values (5, 7, −4, …) with no organizing list, giving up after several failures on a polynomial that does have integer roots.
  - **Detection probe** (verbatim, Blueprint P41): for a given monic cubic, ask which values are valid rational-root candidates — choosing "any integer" rather than the specific divisors of the constant term confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — restate the Rational Root Theorem's restriction explicitly: for integer-coefficient polynomials, rational roots p/q (lowest terms) satisfy p divides the constant term and q divides the leading coefficient; build the finite candidate list from this rule before testing anything.
  - **Verification of death**: given a new polynomial, the learner lists the correct, finite set of rational-root candidates before testing any value, unprompted.

## Analogies
- **Best — testing small primes to factor an integer.** To factor 147, a systematic search (try 2, then 3, then...) finds 3|147 quickly rather than guessing randomly; the polynomial case has its own systematic candidate list (divisors of the constant term) playing the identical organizing role. This is the Blueprint's own P03 analogy and it directly targets MC-3's unstructured-guessing failure.
- **Alternative — peeling an onion, one layer at a time.** Each confirmed factor removes one degree from the polynomial, exactly as peeling one layer reveals a smaller onion still needing more peeling — stopping after the first peel and calling the onion "finished" is precisely MC-2's error, made visible.
- **Story analogy** — a nested set of Russian dolls, where opening the outermost doll (finding one factor) reveals another, smaller doll still sealed inside (the deflated quotient), continuing until the smallest, unopenable doll (an irreducible quadratic or a linear factor) is reached.
- **ANTI-ANALOGY — "test the number in the divisor directly."** This licenses MC-1 exactly; the correct instruction is always "solve the divisor equals zero first," which coincides with the visible number only for (x−k) form and gives the opposite sign for (x+k).
- **ANTI-ANALOGY — "finding a factor means you're done."** This is precisely MC-2's error stated as an instruction; the theorem's name describes finding *a* factor, one at a time, not the complete factorisation in a single application.

## Demonstrations
- **The sign-derivation drill.** Present several divisors in mixed forms — (x−2), (x+3), (x−0) — and require the test value to be derived by solving each divisor equal to zero, before any polynomial evaluation begins. *Predict the sign of a before solving* — this operationalises Blueprint B01's repair, identical in structure to the parallel demonstration in `math.alg.remainder-theorem`.
- **The stop-and-check-completeness pause.** After confirming a factor for a cubic, pause explicitly and ask "is the factorisation finished?" before allowing the learner to move on — forcing the deflation-or-done judgment into a visible, standing checkpoint rather than an implicit afterthought. *Predict the degree of the remaining quotient before dividing* — this operationalises Blueprint B02's repair.
- **The candidate-list-first drill.** Before testing any value for a given polynomial, require the full Rational Root candidate list to be written down explicitly, then test in order from smallest to largest. This directly operationalises Blueprint B03's repair as a standing pre-testing habit.

## Discovery Questions
Direct instruction wins for the Factor Theorem's own statement — it is a direct, one-line corollary of the already-established Remainder Theorem, and stating it explicitly (with the two-line derivation shown) is more efficient and less error-prone than any discovery path, especially given how directly it follows from content the learner already accepts. What is genuinely discoverable, and worth surfacing as a question, is the deflation-as-completion-criterion insight: (1) **Need** — "You've found that p(2)=0 for a cubic. Is (x−2) the whole answer?" (2) **Playground** — divide the cubic by (x−2) and examine what's left; observe it is itself a factorable quadratic. (3) **Invention** — "How would you know when a factorisation is genuinely complete?" (4) **Collision** — offer a case where stopping after one factor produces an expression that, when expanded, does NOT match the original polynomial (a direct, checkable contradiction). (5) **Formalisation** — a factorisation is complete only when every remaining factor is linear, or is a quadratic with no real roots (negative discriminant); after every successful factor test, deflate and check the quotient's own degree and factorability. (6) **Compression** — "One factor found is one step, not the finish line. Divide it out, then ask the same question again."

## Teaching Sequence
The sign-derivation content (TA-A01, targeting MC-1) is taught first and is deliberately brief, since it is a direct restatement of `math.alg.remainder-theorem`'s own already-secured rule applied in a new context — this concept should not re-derive that rule from scratch, only confirm it transfers. The full factorisation procedure, including deflation (TA-A02, targeting MC-2) and the Rational Root candidate strategy (also TA-A02, targeting MC-3), is deliberately taught together via a complete worked example rather than as two separate lessons, because deflation without a systematic candidate-search strategy produces a correct but inefficient learner, while a candidate-search strategy without deflation produces a learner who correctly finds one factor and incorrectly stops — the two skills must be practiced as one connected procedure from the start. The Blueprint's own Component 4 sequence (TA-A01 sign-derivation via the integer-divisibility analogy bridge, TA-A02 full factorisation worked-example pair combining deflation and systematic candidate search, TA-A03 mastery gate) is reused by reference and not restated turn-by-turn here.

## Tutor Actions
- **DO: Demonstration** — the sign-derivation drill, run briefly since it is largely a transfer check from `math.alg.remainder-theorem` rather than new content.
- **DO: Worked example, the stop-and-check-completeness pause** — inserted as a mandatory checkpoint after every successful factor test throughout instruction, not only in the first worked example, so it becomes a standing habit rather than a one-time demonstration.
- **ORGANIZE: The candidate-list-first drill** — building the full Rational Root candidate list as a discrete, visible artifact before any testing begins, this concept's highest-value action for preventing MC-3's unstructured guessing.
- **TEST-THINKING: Error Analysis** — "a student found (x−1) is a factor of a cubic and stopped. What's the correct next step, and why isn't the factorisation finished?" — stronger than direct correction because it requires the learner to state the completeness criterion explicitly.
- **Does NOT fit: testing only quadratics or already-fully-reduced examples.** This never exercises the deflation step at all, since a quadratic factor test, if successful, leaves only a linear (trivially "done") remainder — MC-2 needs at least a cubic to surface meaningfully.
- **Does NOT fit: presenting the Rational Root Theorem as a separate, later topic disconnected from this concept's own factor-testing practice.** Per the Blueprint's own Teaching Notes, the candidate list IS this concept's search strategy, not an optional add-on.

## Voice Teaching Notes
The load-bearing sentence is "one factor found is one step — keep going." Slow down on "keep going," every time a factor test succeeds. Listen for a learner who states a confirmed factor and then pauses expectantly, waiting for confirmation that the task is complete, versus one who moves directly to dividing it out — the expectant pause after a single success predicts MC-2 reliably. For the candidate-search strategy, listen for whether the learner states the candidate list aloud before testing anything ("so the candidates are plus or minus 1, 2, 3, 6") versus reaching for an arbitrary first guess — the stated list is the audible signature of MC-3's repair having taken hold. A confident, unprompted "let me divide this out and see what's left" after any successful factor test is the strongest positive signal this concept produces. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **A substitution using the divisor's visible sign directly rather than its derived root (e.g. p(3) for divisor (x+3))** — MC-1; route to the sign-derivation drill, never to a bare restatement of "solve for the root."
- **A single confirmed factor reported as the complete factorisation of a cubic or higher-degree polynomial** — MC-2, cleanly diagnostic; route to the stop-and-check-completeness pause and the deflation step specifically.
- **Values tested with no visible organizing list, especially non-candidate fractions or large numbers tried before small integer divisors of the constant term** — MC-3; route to the candidate-list-first drill before any further testing is attempted.
- **A confirmed factor immediately followed by unprompted synthetic division and continued testing of the quotient** — the strongest positive signal available, indicating the deflation habit (MC-2's repair) has genuinely taken hold.
- **Mastery trigger**: the Blueprint's TA-A03 gate, MAMR ⌈0.85×5⌉ = 5/5, including its P76 transfer probe requiring a factor test, a synthetic-division quotient, and a complete factorisation in sequence — a gate passed without all three stages does not certify the full deflation-plus-search procedure, only isolated fragments of it.

## Tutor Recovery Strategy
The likely utterance is "I found a factor, now what?" — a genuinely well-posed question naming exactly the MC-2 boundary. The concept-specific smaller question redirects to the already-secured division skill: **"You know (x−2) divides evenly. What tool do you already have for actually performing that division and seeing what's left?"** — pointing back to `math.alg.polynomial-division`'s synthetic division rather than introducing anything new. If the freeze is specifically at building the candidate list, shrink to the constant term alone: **"Just look at the last number in the polynomial. What are ALL the whole numbers that divide it evenly?"** — isolating the list-construction step from any testing. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure**, with an embedded completeness judgment (deflate and continue, or stop?) and a search-strategy component (which candidates to test) layered on top of a single-test mechanical skill already secured in `math.alg.remainder-theorem`. Review by *application on mixed input* every cycle, including at least one cubic-or-higher item requiring genuine deflation, not merely a single factor test.
- Concept-specific deviation: keep the candidate-list-writing step in active rotation even once factor-testing itself is fluent — MC-3 is easy to silently regress into once a learner becomes confident enough to "just try a few values," and an explicit list remains the cheapest guard against wasted effort.
- Interleaving partners: `math.alg.remainder-theorem` (the sign-derivation rule and the theorem's own general statement this concept specialises) and `math.alg.polynomial-division` (the synthetic division mechanics every deflation step depends on).

## Transfer Connections
- **Near**: `math.alg.polynomial-roots` (this concept's own unlock — multiplicity of roots, the relationship between a polynomial's roots and its coefficients via Vieta's formulas, both direct extensions of complete factorisation).
- **Far**: any search problem bounded by a finite, derivable candidate set rather than unbounded guessing — the Rational Root Theorem's own structure (candidates derived from the problem's own coefficients) is a specific instance of a general "constrain the search space before searching" strategy.
- **Real-world**: root-finding in applied polynomial models (e.g. finding break-even points, equilibrium values) where a systematic, bounded search is far more efficient than trial and error, especially by hand.
- **Expert transfer**: the general algebraic habit of recognising a special case of an already-proven general theorem (the Factor Theorem from the Remainder Theorem) rather than treating every new-sounding named result as independent content requiring separate proof or memorisation from scratch.

## Cross-Subject Connections
- **Computer science**, genuine: root-finding and polynomial factorisation algorithms (used in symbolic computation and control-systems analysis) directly implement this theorem's deflate-and-repeat structure, often paired with the Rational Root strategy for integer/rational cases before switching to numerical methods.
- **Physics/Engineering, forward-looking**: locating the roots of a characteristic polynomial (e.g. in vibration or stability analysis) is a direct downstream application of the factorisation skill this concept builds.
- The KG records `cross_links: []`. No specific missing edge is flagged as a probable omission — the computer-science and engineering transfers, while genuine, are specialised applications rather than broadly-taught adjacent concepts currently present in this KG's scope.

## Blueprint References
`docs/curriculum/blueprints/math.alg.factor-theorem.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3), the Component 5 repair actions B01–B03, the Component 4 teaching-action sequence (TA-A01 sign-derivation via the integer-divisibility analogy bridge, TA-A02 full factorisation worked-example pair combining deflation and the Rational Root search strategy, TA-A03 mastery gate with its P76 factor-test-through-complete-factorisation transfer probe), and the Component 6 spaced-repetition schedule (including its Day 30 geometric-sum proof extension, xⁿ−aⁿ divisible by (x−a)). This entry adds birth-type classification (including the finding that MC-1 directly carries over `math.alg.remainder-theorem`'s own notation-induced error, and MC-3 is instruction-induced by the Rational Root connection being left implicit), the mental-model ladder culminating in the unified Remainder/Factor Theorem/root-finding view, the two anti-analogies, the argued direct-instruction call for the theorem statement itself with one nested discovery arc for the deflation-as-completion-criterion insight specifically, the sequencing rationale for teaching deflation and the candidate-search strategy together rather than separately, and the recovery-strategy shrink-to-already-secured-tool moves for both misconception classes.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
None found. `cross_links: []` is a reasonable reflection of this concept's primary cross-subject transfer (computer science root-finding algorithms, physics/engineering characteristic-polynomial analysis) being specialised applications rather than broadly-taught adjacent KG concepts currently present.

## Version History
- v1.0 (2026-09-11): Initial authoring. Domain Certification Mode, math.alg Wave 6.
