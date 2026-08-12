# math.alg.exponent-rules

## Identity
- **KG ID**: `math.alg.exponent-rules`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.arith.exponent-rules` — load-bearing part: the integer laws (product, quotient, power-of-a-power) verified numerically. This concept extends them to variable bases and to zero, negative and rational exponents; the arithmetic versions must be secure enough to serve as the *derivation base*.
  - `math.alg.expression` — load-bearing part: that a variable base is a placeholder, so a rule verified for 2 holds for x. Without it the learner treats variable-base rules as a separate memorisation task.
- **Unlocks**: `math.alg.radicals`, `math.alg.exponential-function`
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.alg.exponent-rules.md` (reused by reference throughout)

## Learning Objective
- The learner can apply the product, quotient and power rules to expressions with variable bases.
- The learner can *derive* x⁰ = 1 and x⁻ⁿ = 1/xⁿ from the quotient rule rather than recalling them as separate facts.
- The learner can interpret a fractional exponent as a root, and can simplify composite expressions mixing all three extensions.
- The learner can state that (a + b)ⁿ ≠ aⁿ + bⁿ and say why the distribution rule applies to products and not sums.

## Core Understanding
All of the exponent laws are consequences of one thing: xⁿ means n copies of x multiplied together, and the laws are what happens when you count copies. xᵃ·xᵇ = xᵃ⁺ᵇ because you have a copies and b copies; xᵃ/xᵇ = xᵃ⁻ᵇ because you cancel; (xᵃ)ᵇ = xᵃᵇ because you take b groups of a. The extensions are not new rules but the same rules pushed past their original range: xⁿ/xⁿ = 1 and also = x⁰, so x⁰ = 1; x⁰/xⁿ = x⁻ⁿ and also = 1/xⁿ, so x⁻ⁿ = 1/xⁿ; x^(1/2)·x^(1/2) = x¹ = x, so x^(1/2) must be the square root. Each extension is *forced* if the rules are to keep working — none is a convention. The one thing exponents do not do is distribute over addition: (ab)ⁿ = aⁿbⁿ holds because multiplication is what exponentiation counts, and (a + b)ⁿ ≠ aⁿ + bⁿ because addition is not.

## Mental Models
1. **Beginner — counting copies.** xⁿ is n x's multiplied; every rule is bookkeeping on the count. *Upgrade trigger*: a zero or negative exponent, where "count the copies" has no reading. *Shelf life*: excellent for the integer laws and it must be explicitly retired for the extensions, or the learner concludes the extensions are nonsense.
2. **Intermediate — the pattern must continue.** x³, x², x¹ divide by x each step; continuing gives x⁰ = 1 and x⁻¹ = 1/x. The extensions are the only values that keep the pattern consistent. *Upgrade trigger*: fractional exponents, where dividing does not generate them. This is the model that makes the extensions inevitable rather than arbitrary.
3. **Advanced — the rules define the extension.** Whatever x⁰ and x^(1/2) mean, they must satisfy the product rule; that requirement determines them uniquely. *Upgrade trigger*: irrational exponents, or the exponential function. This is the model the Blueprint's own Teaching Notes single out as the highest-leverage move in the concept.
4. **Expert — exponentiation as a homomorphism.** x^(a+b) = xᵃ·xᵇ turns addition into multiplication, which is the whole content of logarithms and of the exponential function. *Shelf life*: forward pointer to `math.alg.logarithm`.

## Why Students Fail
The Blueprint's own analysis is exactly right and worth recording as this entry's central finding: the three misconceptions here are not independent errors to patch one at a time — they share one root cause, which is treating exponent notation as a set of arbitrary transformation rules rather than as a coherent extension of repeated multiplication. A learner who memorised "a⁰ = 1" has no fallback when the base is an expression rather than a number, no way to check a half-remembered sign, and no reason to doubt that the same transformation machinery distributes over a sum. A learner who can *derive* x⁰ = 1 in one line can reconstruct every rule under pressure. The teaching implication is direct: the derivation is not enrichment, it is the load-bearing content, and the memorised rules are the failure mode.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry, with birth-type classification added.

- **MC-1 — EXPONENT-DISTRIBUTES-OVER-ADDITION** (FOUNDATIONAL — the Blueprint names it the single most damaging exponent error in all of algebra)
  - **Birth type**: Type 1, overgeneralisation, and structurally unlike the other two: exponents genuinely *do* distribute over multiplication and division, so the learner is applying a correct rule to the wrong operation rather than inventing a rule. That is why it is so durable — it is supported by real evidence in every case except this one.
  - **Characteristic phrase**: "(a + b)² = a² + b²."
  - **Detection probe** (verbatim): "Expand (a + b)². Now check your answer with a = 3, b = 4."
  - **Repair**: Blueprint Repair Action B01. The numerical collision is decisive and takes ten seconds: (3 + 4)² = 49; 3² + 4² = 25. The learner's rule fails arithmetically, and no authority is invoked. Then show where the missing 24 comes from — 2ab — which converts a refutation into an explanation.
  - **Verification of death**: given (a − b)² or (a + b)³, the learner *checks numerically before answering* rather than transforming by pattern.

- **MC-2 — ZERO-NEGATIVE-EXPONENTS-ARBITRARY** (foundational)
  - **Birth type**: Type 5, instruction-induced. x⁰ = 1 and x⁻ⁿ = 1/xⁿ are almost universally *stated* as facts to memorise rather than derived, and a memorised fact has no error-correction: the learner who half-remembers it produces x⁻ⁿ = −xⁿ and has no way to notice.
  - **Characteristic phrase**: "a⁻² is negative, isn't it?"
  - **Detection probe**: "Why is x⁰ equal to 1?" A learner who answers "it just is" or "that's the rule" has the misconception even though their factual answer is correct — this is the probe that catches it, and a probe asking *what* x⁰ equals will not.
  - **Repair**: Blueprint Repair Action B02 — derive both from the quotient rule in two lines, per the Blueprint's identification of this as the highest-leverage move in the concept. xⁿ/xⁿ is obviously 1 and is also x⁰. x⁰/xⁿ is obviously 1/xⁿ and is also x⁻ⁿ.
  - **Verification of death**: the learner re-derives x⁰ = 1 on request, and applies x⁻ⁿ correctly when the base is a compound expression like (2y)⁻³.

- **MC-3 — FRACTIONAL-EXPONENT-AS-DIVISION** (moderate)
  - **Birth type**: Type 4, notation-induced. The glyph 1/n appears in the exponent position and the learner reads the fraction bar as division applied to the base, because that is what a fraction bar has always meant.
  - **Characteristic phrase**: "a^(1/2) is a over 2."
  - **Detection probe**: "What is 9^(1/2)? What is 9 ÷ 2?" The two answers differ (3 versus 4.5) and the learner must commit to one.
  - **Repair**: Blueprint Repair Action B03 — the product-rule derivation: x^(1/2)·x^(1/2) = x¹ = x, and the thing that gives x when multiplied by itself is √x. The exponent's meaning is *forced* by the rule rather than defined by decree.
  - **Verification of death**: the learner converts freely between radical and exponent notation in both directions, including x^(2/3) = ∛(x²).

## Analogies
- **Best — the pattern that has to continue.** Write x³ = x·x·x, x² = x·x, x¹ = x, each step dividing by x. What must x⁰ be? What must x⁻¹ be? The learner supplies both. This is not decoration — it is the derivation in a form that can be run in the head.
- **Alternative — the ledger of copies.** Positive exponents are copies owned, negative exponents are copies owed; multiplying combines the ledgers and x⁰ is a balanced book. *Breaking point*: the ledger gives no reading for fractional exponents at all, so it must be retired before MC-3 is addressed rather than stretched.
- **Story analogy** — none needed; the pattern-continuation demonstration is more compelling than any narrative and costs less time.
- **ANTI-ANALOGY — "the exponent distributes over everything inside the bracket."** This is MC-1 promoted to a rule, and it is a natural summary of (ab)ⁿ = aⁿbⁿ. Say "over products" explicitly, every time, and the overgeneralisation has no room to form.
- **ANTI-ANALOGY — "a negative exponent flips the sign."** Two words, both nearly right, and together they produce a⁻ⁿ = −aⁿ. It flips the *position* — numerator to denominator — not the sign. Say "flips it over" rather than "flips the sign".

## Demonstrations
- **The (3 + 4)² collision.** Two numbers, two computations, ten seconds. *Elicit the prediction first*: "what is (a + b)²?" and take the answer in writing before any numbers appear. This is the highest-value thirty seconds in the concept.
- **The descending-pattern derivation.** x³, x², x¹, x⁰, x⁻¹, x⁻², each obtained by dividing the previous by x, written as a column. *Predict first*: "what comes after x¹?" The learner derives x⁰ = 1 themselves, which is the difference between a fact and a tool.
- **The x^(1/2) squaring test.** "Whatever x^(1/2) is, what happens when you multiply it by itself?" — the product rule gives x, so it is the square root. *Predict first*: "what do you think the one-half power means?" The wrong prediction (divide by two) is then refuted by the learner's own rule rather than by the tutor.
- **The composite simplification.** The Blueprint's Component 4 A03 problem, built so that a shortcut on *any* single rule produces a visibly different answer. This is a genuine diagnostic rather than a repetition, and it should be used as one.

## Discovery Questions
Guided discovery is right here for the extensions and is the concept's central pedagogical move.
1. **Need**: "You know x³·x² = x⁵. What is x³·x⁰?" — the learner cannot answer without knowing x⁰, and the rule they already own is the thing demanding it.
2. **Playground**: run the descending column, dividing by x each time, down to x⁻².
3. **Invention**: "So what does x⁰ have to be, if the pattern is going to hold? What about x⁻¹?"
4. **Collision**: "Is that a rule someone chose, or is it forced?" — test by asking what would break if x⁰ were 0. The product rule fails immediately, which shows the value is not a choice.
5. **Formalisation**: state x⁰ = 1 (a ≠ 0), x⁻ⁿ = 1/xⁿ, x^(m/n) = ⁿ√(xᵐ), each labelled as *derived* rather than *given*.
6. **Compression**: "The extensions are whatever they have to be for the rules to keep working."
MC-1 is handled separately and by refutation rather than by discovery — there is nothing to discover about a false rule except that it is false, and the numerical collision does that in one line.

## Teaching Sequence
The Blueprint's Component 4 owns the turn-level scripts, and its CPA entry stage is C (concrete) — numeric re-verification of the already-known integer rules opens the concept, confirming they survive the shift to variable bases before any new content arrives. Two further constraints are load-bearing. First, **the derivations must come before the statements** for x⁰ and x⁻ⁿ; the Blueprint identifies this as the single highest-leverage move in the concept, and the reason is that a derived rule is reconstructible under exam pressure while a stated one is not. Second, **MC-1 must be collided with numerically before any symbolic expansion is taught**, because (a + b)² = a² + 2ab + b² presented as a formula gives the learner a second thing to memorise alongside the wrong rule they already hold, rather than displacing it. The composite problem comes last and is deliberately built so that a shortcut on any one rule shows up in the final answer.

## Tutor Actions
- **TEST-THINKING: Prediction** — "(a + b)² = ?" in writing, before anything. First action; MC-1 is the domain's most damaging error and this catches it in ten seconds.
- **TEST-THINKING: Error Analysis** — the (3 + 4)² numerical refutation, run by the learner.
- **DO: Worked Example** — the descending-pattern derivation of x⁰ and x⁻ⁿ.
- **ORGANIZE: Representation Table** — exponent form / expanded form / value, run down from x³ to x⁻². This is the artefact that makes the extensions look inevitable.
- **DO: Worked Example** — the composite simplification, used as a diagnostic with each rule's contribution traced.
- **Does NOT fit: rule-list drill.** Speeded practice on a memorised rule list is precisely the state the Blueprint identifies as the root cause of all three misconceptions. Drill *after* the derivations are secure, and drill composite problems rather than isolated rules.

## Voice Teaching Notes
The load-bearing sentence is "over products, not over sums." Say it every single time a bracket with an exponent appears; MC-1 is the most damaging error in the domain and the qualifier is four words. Listen for the learner reading a⁻² aloud as "minus a squared" rather than "a to the minus two" — the reading *is* the misconception, and it appears before any wrong value is produced. Listen for "it just is" or "that's the rule" in answer to a why-question: correct facts delivered with that justification are MC-2 in full health, and a probe that only checks the fact will certify them. Fractional exponents are hard to say cleanly; model "x to the one-half" and never "x to the one over two", which invites MC-3 aurally. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong on (a + b)²** — MC-1, dangerous quadrant, and expect it: the learner is applying a rule that has always worked. Treat as misconception, never as carelessness.
- **Correct x⁰ = 1 with "that's the rule" as justification** — MC-2 intact behind a correct answer. This is the concept's most important diagnostic and it requires a why-probe; every what-probe will pass it.
- **a⁻ⁿ = −aⁿ** — MC-2's characteristic sign error, and the direct consequence of memorisation without derivation. The repair is the derivation, not a sign rule.
- **9^(1/2) = 4.5** — MC-3. Unambiguous, and it will not appear unless a fractional exponent is in the probe set.
- **All isolated rules correct, composite problem wrong** — the rules are held separately and not as a system. This is the state the Blueprint's A03 problem is built to detect, and it is invisible to isolated-rule probes.
- **Slow-correct with visible re-derivation** — the target state at this stage, not a fluency deficit. A learner who re-derives x⁰ each time has the tool; speed follows.
- **Mastery trigger**: the Blueprint's Component 4 gate at MAMR 5/5, with the added requirement that at least one item ask *why* rather than *what*.

## Tutor Recovery Strategy
The likely utterance is "there are too many rules and I keep mixing them up" — an accurate description of the memorisation state, and the single best diagnostic sentence in the concept, because it names the root cause. The concept-specific move is to reduce the rule count rather than to re-explain any rule: **"There's one rule. x to the n is n copies of x. Write x³ times x². How many copies altogether? That's it — that's the product rule, and every other rule is that one, counted differently."** Then re-derive one extension from it. The learner leaves with one thing instead of six, which is both true and the actual fix. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure** (applying the rules) resting on **concept** (why they extend). Review the procedure speeded and the derivations by explanation-on-demand; the derivations are what make the procedure recoverable after decay, so reviewing only the procedure loses the more valuable half.
- Concept-specific deviation: MC-1 regrows persistently throughout algebra and calculus, because every new context supplies fresh brackets to distribute over. Per `../student-state/03`, keep a (a + b)ⁿ item in the review rotation permanently rather than marking it resolved.
- Interleaving partners: `math.arith.exponent-rules` (the numerical base — interleave so the variable versions never feel like separate rules), and `math.alg.zero-exponent` / `math.alg.negative-exponent` / `math.alg.fractional-exponent`, which are this concept's extensions given their own nodes and are best mixed rather than sequenced.

## Transfer Connections
- **Near**: `math.alg.radicals` and `math.alg.exponential-function`, both unlocked directly; and the three extension nodes.
- **Far**: the general principle that a definition can be *forced* by the requirement that existing rules keep working — the same argument that defines 0! = 1, the empty product, and negative-index sequences.
- **Real-world**: scientific notation, compound interest, half-life and decibel scales all require negative and fractional exponents fluently; the Blueprint's own transfer probe uses radioactive decay specifically because it exercises the negative exponent in a setting where "the exponent is negative" could otherwise be misread as "the quantity is negative".
- **Expert transfer**: the habit of asking whether a rule is a convention or a consequence. Exponent extensions are the clearest early case where the answer is "consequence".

## Cross-Subject Connections
- **Physics**, genuine and load-bearing: `phys.mod.radioactivity`'s decay law and every unit prefix depend on negative exponents being read correctly, and the Blueprint's transfer probe targets exactly this.
- **Chemistry**, genuine: pH is a negative logarithm and concentration notation is exponent-heavy; MC-2's sign confusion surfaces there immediately.
- **Computer science**, genuine: binary magnitudes, complexity classes, and floating-point representation all use the same extensions.
- The KG records no `cross_links` for this concept, which the Blueprint itself notes when explaining why its transfer probe had to be built independently. Recorded as feedback below.

## Blueprint References
`docs/curriculum/blueprints/math.alg.exponent-rules.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3) with its foundational-MC analysis, the Component 5 Protocol B repair actions B01–B03, the Component 4 teaching-action sequence A01–A04 including the composite conflict-evidence problem and its diagnostic design, the radioactive-decay transfer probe, the Component 6 spaced-repetition schedule, and the Component 8 identification of memorisation-over-derivation as the shared root cause. This entry adds birth-type classification (including the finding that MC-1 differs structurally from the other two — a correct rule misapplied rather than a rule invented), the mental-model ladder, the two anti-analogies, the observation that MC-2 is undetectable by any what-probe and requires a why-probe, and the recovery move of reducing the rule count to one.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
The KG records `cross_links: []` for this node, and the Blueprint's Component 8 explicitly notes the absence, having had to construct its transfer probe independently as a result. This is a genuine gap rather than an accurate emptiness: exponent rules are load-bearing in physics (decay, units), chemistry (pH, concentration) and computer science (complexity, binary), and at least one cross-subject link would give the Teaching Engine a real transfer target. Recorded for the Curriculum Production Pipeline. Separately: `math.alg.zero-exponent`, `math.alg.negative-exponent` and `math.alg.fractional-exponent` are all separate KG nodes requiring this one, while this node's own Blueprint teaches all three extensions in full — a genuine overlap. It is workable (this concept derives them, the child nodes drill and edge-case them) but the boundary deserves an explicit note in the KG descriptions.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
