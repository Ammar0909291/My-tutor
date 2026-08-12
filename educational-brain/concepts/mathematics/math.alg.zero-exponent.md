# math.alg.zero-exponent

## Identity
- **KG ID**: `math.alg.zero-exponent`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.exponent-rules` — load-bearing part: the **quotient rule** specifically, xᵃ/xᵇ = xᵃ⁻ᵇ. This concept is a two-line consequence of it, and a learner who holds the quotient rule as a memorised transformation rather than as a counting fact will receive this as a third memorised item instead of as a derivation.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.alg.zero-exponent.md` (reused by reference throughout)

## Learning Objective
- The learner can state that a⁰ = 1 for any nonzero a, and can *derive* it from the quotient rule.
- The learner can apply the rule when the base is a variable, a negative number, or a compound expression such as (3x²y)⁰.
- The learner can state that 0⁰ is a separate case not covered by the rule, and say why.

## Core Understanding
a⁰ = 1 for every a ≠ 0, and it is forced rather than chosen. Take any nonzero a and any n: aⁿ/aⁿ is obviously 1, since anything nonzero divided by itself is 1. The quotient rule says the same expression equals aⁿ⁻ⁿ = a⁰. Two names for one number, so a⁰ = 1. Nothing about the size or sign of a enters the argument, which is why (−7)⁰, (3x²y)⁰ and (½)⁰ are all 1 — the base's identity is irrelevant, only its nonzero-ness matters. And that exclusion is not fussiness: the derivation divides by aⁿ, which is illegitimate when a = 0, so the argument establishes nothing about 0⁰. That case is genuinely separate — it is treated as 1 in most combinatorial and series contexts by convention, and left undefined in analysis, and the honest thing to tell a learner is that it is a case the rule does not reach rather than a case with a hidden answer.

## Mental Models
1. **Beginner — the memorised fact.** a⁰ = 1. *Upgrade trigger*: being asked why, or meeting a compound base. *Shelf life*: short and brittle; it is the state this concept exists to replace, and a learner who leaves in it has not learned anything the previous concept did not already give them.
2. **Intermediate — the cancellation.** aⁿ/aⁿ is 1 and is also a⁰. *Upgrade trigger*: none needed; this is the durable model and it fits in one line.
3. **Advanced — the pattern's endpoint.** Descending a³, a², a¹ by dividing by a each step, the next entry must be 1. Same conclusion by a different route, and worth having both, because the two routes fail differently under pressure.
4. **Expert — the empty product.** a⁰ is the product of no copies of a, and an empty product is 1 for the same reason an empty sum is 0: it is the identity for the operation. *Shelf life*: this is the model that generalises to 0! = 1 and to the empty-set conventions, and it is worth installing for a learner who asks "but why 1 and not 0?".

## Why Students Fail
The answer is counter-intuitive in a specific, nameable way: zero is the annihilator everywhere else the learner has met it. 0 × a = 0, 0 + a = a, and a number "to the power of nothing" therefore sounds like it should be nothing. That is not a reasoning error; it is a well-supported prior about what the symbol 0 does. The rule as usually taught — stated, not derived — offers nothing to displace the prior, so the learner ends up holding two incompatible beliefs and produces whichever is more available. The second failure is subtler and is why the exclusion matters: a learner who has the rule as an unconditional fact applies it to 0⁰ without noticing that the base is the one thing the rule excluded.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry, with birth-type classification added.

- **MC-1 — ZERO-EXPONENT-ASSUMED-TO-PRODUCE-ZERO** (foundational)
  - **Birth type**: Type 1, overgeneralisation, from an unusually strong and otherwise reliable prior: zero annihilates in multiplication, and the learner transfers that behaviour from the exponent position to the output. Not a guess — a generalisation supported by everything else they know about 0.
  - **Characteristic phrase**: "a⁰ is nothing, so 0."
  - **Detection probe** (verbatim): "What is 5⁰? Why?" The *why* is essential — a learner may recall 1 while still holding the prior, and the recall will fail the moment the base is unfamiliar.
  - **Repair**: Blueprint Repair Action B01 — the cancellation derivation, done numerically first: 5³/5³ = 125/125 = 1, and by the quotient rule it is 5⁰. Two computations, one conclusion, and the learner's prior loses to arithmetic rather than to assertion.
  - **Verification of death**: the learner evaluates (−7)⁰ and (3x²y)⁰ correctly and can re-derive the rule on request.

- **MC-2 — ZERO-TO-THE-ZERO-ASSUMED-COVERED-BY-THE-RULE** (moderate)
  - **Birth type**: Type 5, instruction-induced. The rule is almost always stated as "anything to the zero is one", with the nonzero condition either omitted or delivered as an aside. The learner heard the sentence they were given.
  - **Characteristic phrase**: "0⁰ = 1, same as everything else."
  - **Detection probe**: "What is 0⁰?" — and then, whichever answer comes: "does the derivation we did work for a = 0?"
  - **Repair**: Blueprint Repair Action B02 — return to the derivation and point at the division step. It divides by aⁿ. With a = 0 that is division by zero, so the argument does not run and establishes nothing. The exclusion is then visibly a *limitation of the proof* rather than an arbitrary exception.
  - **Verification of death**: the learner states the rule *with* its condition unprompted, and can say why the condition is there rather than merely that it is.

## Analogies
- **Best — the cancellation itself.** No analogy outperforms the two-line derivation, and substituting one would replace a checkable argument with a picture. Recording this deliberately: the best "analogy" here is the arithmetic.
- **Alternative — the descending pattern.** 8, 4, 2, … each step halving; the next is 1. For base 2 this is vivid and it gives a learner who distrusts algebra a second, independent route to the same answer.
- **Story analogy** — none; a one-hour concept with a one-line proof.
- **ANTI-ANALOGY — "zero of them, so nothing."** This is MC-1 stated as an explanation, and it is the most natural gloss of the notation. The correct reading is "no copies multiplied together", and the product of no things is 1 because 1 is what leaves a product unchanged — which is exactly the empty-product model and is worth giving to any learner who raises the objection.
- **ANTI-ANALOGY — "anything to the zero is one."** Almost right and it is the sentence that creates MC-2. Say "any nonzero number to the zero is one", always, in full; the extra word is the whole content of the second misconception.

## Demonstrations
- **The numerical cancellation.** 5³/5³ computed two ways: 125/125 = 1, and 5³⁻³ = 5⁰. *Elicit the prediction first*: "what is 5⁰?" Take the answer, then run the two computations. MC-1 dies to arithmetic in thirty seconds.
- **The halving pattern.** 2³ = 8, 2² = 4, 2¹ = 2, 2⁰ = ? *Predict first.* A learner who resisted the algebraic route often accepts this one immediately, which is why both are kept.
- **The compound base.** (3x²y)⁰. *Predict first.* Learners who confidently answer 1 for 5⁰ frequently hesitate here, which reveals that the rule was attached to *numbers* rather than to bases — a gap invisible to any numeric probe.

## Discovery Questions
Guided discovery, and the whole concept fits inside it — this is a one-hour node whose entire content is one derivation the learner can run themselves.
1. **Need**: "What is 5³ divided by 5³? Don't use any rules — just compute it." (125/125 = 1. Uncontroversial.)
2. **Playground**: "Now do the same division using the quotient rule. What exponent do you get?" (5⁰.)
3. **Invention**: "So what must 5⁰ be?"
4. **Collision**: "Try the same argument with a = 0. What goes wrong?" — the learner locates the division by zero themselves, which is the entire content of MC-2's repair and costs one extra question.
5. **Formalisation**: a⁰ = 1 for a ≠ 0; 0⁰ is a separate case the argument does not reach.
6. **Compression**: "Anything nonzero over itself is 1 — that's all a⁰ means."

## Teaching Sequence
The Blueprint's teaching actions own the turn-level scripts. Two constraints matter at this size. First, **the derivation must come before the statement**, without exception: the concept's only justification for existing as a separate node from `math.alg.exponent-rules` is that it converts a memorised fact into a derived one, and a lesson that states a⁰ = 1 and then explains it has already given the learner the memorisable version and will be remembered that way. Second, **the a ≠ 0 condition must be discovered at step 4 rather than appended as a caveat.** Appended, it is inaudible — the learner has the answer and stops listening. Discovered by trying the argument at a = 0 and watching it fail, it becomes part of the derivation itself. The compound-base case comes last and is the only place this concept genuinely extends what `math.alg.exponent-rules` already covered.

## Tutor Actions
- **TEST-THINKING: Prediction** — "what is 5⁰, and why?" First action, and the *why* is the diagnostic half.
- **DO: Worked Example** — the two-way computation of 5³/5³.
- **DO: Demonstration** — the halving pattern, as the second independent route.
- **TEST-THINKING: Prediction** — (3x²y)⁰, which tests whether the rule attached to bases or to numbers.
- **TEST-THINKING: Error Analysis** — "does our derivation work if a = 0? Where exactly does it break?"
- **Does NOT fit: drill.** One hour, one fact, one derivation. Drill would automate recall of the fact, which is the state the concept exists to move the learner *out of*.

## Voice Teaching Notes
The load-bearing phrase is "any **nonzero** number to the zero" — said in full every time, because the omitted word is the entire second misconception and it is omitted almost universally. Listen for the learner answering "one" quickly and then going quiet when asked why: fast-correct with no justification is MC-1 held underneath a recalled answer, and it will fail at the first unfamiliar base. Listen also for "nothing" as a synonym for zero in the learner's own speech ("it's to the power of nothing, so it's nothing") — that sentence contains both the misconception and its cause, and it is worth quoting back and unpicking rather than simply contradicting. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **"0" for 5⁰** — MC-1 undisguised. Fast and confident; it is supported by a strong prior, not by carelessness.
- **"1" with no reason available** — MC-1 surviving underneath a correct recall. This is the concept's most important signal and it requires a why-probe; any what-probe passes it, and the learner will then fail on (3x²y)⁰ or under exam pressure with no idea why.
- **Correct on numeric bases, hesitant on compound bases** — the rule attached to numbers. A genuine gap, cheaply closed, and invisible to a numeric-only probe set.
- **"0⁰ = 1" stated confidently** — MC-2. Note it is *not* simply wrong (the convention is common in combinatorics), so the correction is about scope and justification rather than about the value: the rule as derived does not cover it.
- **Slow-correct with visible re-derivation** — the target state. At a `bloom: remember` concept the tempting reading is that slowness indicates weak recall; here it indicates the learner has the tool rather than the fact, which is better.
- **Mastery trigger**: the Blueprint's gate at MAMR 5/5, with the added requirement that one item ask *why* and one use a non-numeric base.

## Tutor Recovery Strategy
The likely utterance is "but that doesn't make any sense" — and it is worth agreeing with, because the learner is right that it conflicts with everything else they know about zero. Contradicting the intuition head-on wastes the strongest available move, which is to grant it and then out-compute it. The concept-specific smaller question is: **"You're right that it's strange. Forget exponents. What's 125 divided by 125?"** One, obviously. **"That's 5³ over 5³. What does the quotient rule say the exponent is?"** The learner reaches 5⁰ = 1 by two steps they cannot object to, having had their objection acknowledged rather than overruled. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **fact** whose value depends entirely on being **derivable**. Review by asking for the derivation, never for the value — the value survives decay as a bare recall and is worth almost nothing in that form.
- Concept-specific deviation: MC-1's underlying prior (zero annihilates) is never retired, because it remains true everywhere else in mathematics. Per `../student-state/03`, treat it as DORMANT-VERIFIED rather than resolved, and re-probe with a *why* question rather than a *what* question at each interval.
- Interleaving partners: `math.alg.negative-exponent` and `math.alg.fractional-exponent` — the three extensions share one derivation strategy, and mixing them teaches the strategy rather than three facts. Also `math.alg.exponent-rules`, the parent that supplies the quotient rule.

## Transfer Connections
- **Near**: `math.alg.negative-exponent` (the same derivation, one step further), and every simplification where a variable cancels completely.
- **Far**: the empty-product principle — 0! = 1, the empty sum being 0, the identity element as the answer to "none of them". This is the genuinely valuable transfer and it is available cheaply from this concept.
- **Real-world**: scientific notation with exponent 0, and any scaling factor of 10⁰ = 1 in unit conversion. Modest, and honest to say so.
- **Expert transfer**: the recognition that a definition can be *forced* by requiring existing rules to remain consistent. This is the same argument that fixes negative and fractional exponents, and later 0! and z⁰ for complex z.

## Cross-Subject Connections
- **Computer science**, genuine: an empty product returning 1 (and an empty sum returning 0) is a standard fold identity, and a learner who codes has a concrete instance of the empty-product reasoning that answers "why 1 and not 0?" better than any purely mathematical framing.
- **Chemistry / physics**, weak: exponent-0 terms in unit prefixes and dimensionless quantities. Real but thin, and not worth building a probe on.
- The KG records no `cross_links`, which is accurate for a node this small.

## Blueprint References
`docs/curriculum/blueprints/math.alg.zero-exponent.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1, MC-2) and its repair actions B01–B02, the teaching-action sequence, the spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification (including the observation that MC-1 rests on a prior that is correct everywhere else, which is why it survives being told the answer), the mental-model ladder with the empty-product model for learners who object, the two anti-analogies, the ordering finding that the a ≠ 0 condition must be *discovered* at the failing division step rather than appended as a caveat, the compound-base probe that detects a rule attached to numbers rather than bases, and the recovery move of granting the intuition before out-computing it.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Fourth instance of the domain-level pattern first recorded at `math.alg.exponent-rules`: this is a one-hour child node whose content the parent's own Blueprint already derives in full as the repair for its foundational misconception. The workable division — parent derives, child owns the 0⁰ edge case and non-numeric bases — is real but invisible from the KG descriptions, and a reader of the KG alone would judge this node redundant. Recorded as part of the same domain-level observation rather than as a new finding. Separately, the KG description for this node states the rule with the "for any nonzero base a" condition correctly, which is better than most textbook statements and is worth noting as a positive.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
