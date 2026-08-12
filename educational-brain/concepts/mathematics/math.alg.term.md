# math.alg.term

## Identity
- **KG ID**: `math.alg.term`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.expression` — load-bearing part: that an expression is built from parts joined by + and −, and that those signs are *joiners*. This concept's entire content is reading that structure precisely.
- **Unlocks**: none directly in the KG (but `math.alg.coefficient` requires it)
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: `docs/curriculum/blueprints/math.alg.term.md` (reused by reference throughout)

## Learning Objective
- The learner can identify and count the terms in any algebraic expression, using + and − as separators.
- The learner can name the coefficient and the variable part of any specified term, including the implied 1 in x and −1 in −x.
- The learner can recognise a constant as a legitimate term.
- The learner can attach a leading − sign to the term that follows it rather than treating it as a floating operator.

## Core Understanding
A term is one chunk of an expression: a single number, a single variable, or a product of numbers and variables. Terms are separated by + and −, and the separator is not part of any term — except that a leading − *is* absorbed into the following term's coefficient. In 3x − 2y + 5 there are three terms: 3x, −2y, and 5, with coefficients 3, −2 and 5. Each term has a numerical factor (the coefficient) and a symbolic factor (the variable part), and either may be invisible: x has coefficient 1, −x has coefficient −1, and 5 has variable part "nothing", which is why it is still a term. The whole concept is vocabulary precision, and the reason it earns a node of its own is that every downstream operation — combining like terms, factoring, polynomial arithmetic, differentiation — is stated in terms of terms, and a learner who miscounts them makes structurally invisible errors afterward.

## Mental Models
1. **Beginner — chunks between the plus and minus signs.** Scan left to right; each + or − ends a chunk. *Upgrade trigger*: an expression beginning with a minus. *Shelf life*: adequate until signs matter, which is immediately.
2. **Intermediate — the term carries its own sign.** The − belongs to what follows it, so 3x − 2y is 3x and −2y, not "3x, minus, 2y". *Upgrade trigger*: rearranging terms, where the sign must travel with the term. This is the model to install hardest; it is what prevents the sign errors that dominate later algebra.
3. **Advanced — coefficient × variable part.** Every term factors into a number and a symbol, and either can be implicit. *Upgrade trigger*: needing to add 3x and x, which requires seeing x as 1x.
4. **Expert — terms as the atoms of expression manipulation.** Every algebraic operation is described as an action on terms; reading an expression *as a list of terms* rather than as a string of symbols is what makes complicated expressions tractable. *Shelf life*: durable, and it is the real payoff of this small concept.

## Why Students Fail
The failures here are all consequences of reading an expression as a *sentence* rather than as a *list*. Read left to right as prose, 3x − 2y is "three x, take away two y", in which the minus is an instruction sitting between two objects — and that reading is not wrong, it is just the wrong level of description for algebra, and it detaches the sign from the term. The constant-is-not-a-term error has a different source: "term" is being learned in a lesson full of variables, so the learner infers that a term is a *variable* thing, which nobody said and everything implied. The third error, splitting 5y³ into 5 and y³, comes from the same list-reading habit applied one level too deep — the learner has correctly learned to break things apart and has no criterion for where to stop.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry, with birth-type classification added.

- **MC-1 — TERM-INCLUDES-OPERATIONS** (FOUNDATIONAL)
  - **Birth type**: Type 5, instruction-induced. The word "term" is introduced without a stated boundary rule, and the learner supplies one from the visual grouping of the expression rather than from the + / − separator.
  - **Characteristic phrase**: shown 3x + 2y, "that's one term."
  - **Detection probe** (verbatim): "How many terms are in 3x + 2y?"
  - **Repair**: Blueprint Repair Action B01 — the separator rule, applied physically: draw a vertical line through every + and − and count the pieces. It converts an ambiguous judgement into a mechanical action.
  - **Verification of death**: the learner counts terms correctly in an expression with five terms and mixed signs, without hesitating.

- **MC-2 — CONSTANT-NOT-A-TERM** (foundational)
  - **Birth type**: Type 1, overgeneralisation from a biased sample. Every term shown during teaching contained a variable, because the lesson is about algebra. The learner inferred a requirement nobody stated.
  - **Characteristic phrase**: shown 4x² − 3x + 7, "two terms."
  - **Detection probe**: "How many terms are in 4x² − 3x + 7?" The answer 2 is diagnostic and the answer 3 is not — a learner may say 3 by counting separators without believing 7 is a term, so follow with "name them."
  - **Repair**: Blueprint Repair Action B02 — apply the separator rule mechanically, which produces 7 whether or not the learner believes it should, then name it: a constant term, coefficient 7, variable part empty.
  - **Verification of death**: the learner names the constant term and its coefficient unprompted.

- **MC-3 — COEFFICIENT-AS-SEPARATE-TERM** (moderate)
  - **Birth type**: Type 1, overgeneralisation of the decomposition habit. The learner has been rewarded for breaking expressions apart and applies it one level too far, splitting a product.
  - **Characteristic phrase**: shown 5y³, "5 and y³ — two terms."
  - **Detection probe**: "How many terms in 5y³?"
  - **Repair**: Blueprint Repair Action B03 — return to the separator rule and note the absence: there is no + or − inside 5y³, so there is nothing to split. Multiplication holds a term together; addition and subtraction break it apart.
  - **Verification of death**: the learner correctly counts 1 term in 5y³ and 2 in 5 + y³, and can say what makes the difference.

## Analogies
- **Best — the shopping list.** Each line is a term; the + and − are the line breaks. Reading it as a list rather than a sentence is the whole skill, and lists are an object the learner already handles correctly.
- **Alternative — signed items.** Each term arrives with its own sign attached, the way a bank statement entry is −£20 rather than "minus, then twenty pounds". This is the cleanest carrier of the leading-sign rule, and it comes from a domain where the learner already gets it right.
- **Story analogy** — none needed; this is a two-hour vocabulary concept and a story would add load without adding clarity. Recording the absence deliberately rather than inventing one.
- **ANTI-ANALOGY — "the minus means take away."** Perfectly true in arithmetic and it is exactly what detaches the sign from the term. Say "the minus belongs to the two-y" instead; the reading is unfamiliar and it is the one that survives into rearrangement and factoring.
- **ANTI-ANALOGY — "a term is a bit with a letter in it."** Nobody says this out loud, and the example diet says it continuously. It is MC-2's entire birth mechanism, and it is prevented for free by including a constant in the *first* expression shown.

## Demonstrations
- **The vertical-line count.** Write 4x² − 3x + 7 and draw a line through each + and −. Three pieces. *Elicit the prediction first*: "how many terms?" — the prediction is the diagnostic and the lines are the correction, and the whole demonstration takes under a minute.
- **The sign-travels demonstration.** Rewrite 3x − 2y as −2y + 3x and confirm they are equal by substituting x = 1, y = 1 (both give 1). *Predict first*: "if I move the 2y to the front, does it keep the minus?" A learner holding MC-1's detached reading predicts wrongly and sees it fail numerically.
- **The implied-coefficient set.** x, −x, 5, −5y, y/2 — name the coefficient of each. *Predict first, in writing.* This is the demonstration where the invisible 1 and −1 become visible, and it should be revisited, because they stay invisible in notation forever.

## Discovery Questions
**Direct instruction wins here, and it should be argued rather than defaulted to.** This is a definitional, `bloom: remember`, two-hour concept: "term" is a *convention*, and no sequence of questions leads a learner to the convention mathematicians happened to adopt. Staging discovery for a naming convention teaches the learner that conventions are discoverable, which is false and unhelpful. What *should* happen instead is that the definition is stated, immediately made mechanical (the separator rule), and then exercised against edge cases the learner predicts on first. The one genuinely discoverable element is the sign-travel rule, and it is worth eliciting: "if I write these terms in a different order, what has to move with them?" — because the answer is checkable by substitution rather than by authority.

## Teaching Sequence
The Blueprint's Component 4 owns the turn-level scripts, and it is deliberately lean (2 main teaching actions plus the gate) because the concept is definitional. Two ordering constraints matter. First, **the very first expression shown must contain a constant term and a leading negative** — MC-2 and the sign-detachment error are both caused by a clean example diet, and both are prevented at zero cost by choosing 4x² − 3x + 7 rather than 3x + 2y as the opening object. Second, **the implied coefficients of x and −x must be taught explicitly, not left to be inferred**, per the Blueprint's own Teaching Notes: they are invisible in the notation, so no amount of exposure will surface them, and the first place their absence bites is combining 3x + x, which happens in the very next lesson. This concept sharpens vocabulary that `math.alg.expression` already used operationally; it must not re-teach like-term combination, which that concept owns.

## Tutor Actions
- **TEST-THINKING: Prediction** — term count, taken before the separator rule is given. First action; all three misconceptions show up in a single prediction.
- **DO: Demonstration** — the vertical-line count.
- **ORGANIZE: Representation Table** — term / coefficient / variable part, one row per term, run on an expression with a constant, a leading negative, and a bare x. This single table exercises every edge case in the concept.
- **TEST-THINKING: Error Analysis** — "a student says 5y³ is two terms. What rule are they using, and where does it fail?"
- **Does NOT fit: Analogy-heavy teaching.** The concept is a convention with a mechanical test; analogy adds a layer to relate rather than a rule to apply. The shopping-list image is worth one sentence and no more.
- **Does NOT fit: extended practice before the edge cases.** Drilling term-counting on clean examples automates a rule that has not yet met a constant or a negative.

## Voice Teaching Notes
The load-bearing sentence is "the minus belongs to the term after it." Say it while pointing, every time a negative term appears, for as long as it takes. Listen for how the learner *reads* an expression aloud: "three x, minus, two y" versus "three x, and negative two y" — the first is the detached reading and it predicts sign errors weeks before they appear, and the second is worth explicitly modelling and asking for. Listen also for the learner going silent at a bare x when asked for its coefficient; the pause is the invisible-1 gap, and it is better met by supplying "one" and moving on than by a re-explanation, because the fact is a convention rather than a reasoning step. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Term count too low on an expression with a constant** — MC-2. Distinguish from a counting slip by asking the learner to *name* the terms; MC-2 names two and stops confidently.
- **Term count too high on a product** — MC-3. Rare compared to the other two, and it usually co-occurs with an over-eager decomposition habit visible elsewhere.
- **Correct count, wrong signs** — the separator rule is installed and the sign-travel rule is not. This is the most consequential state to catch, because term counting will look fluent while every subsequent rearrangement introduces errors.
- **"No coefficient" for x** — the implied 1. Fast and confident, and it is a genuine gap rather than a misconception: nobody told them.
- **Slow-correct throughout** — the learner is applying the separator rule deliberately. Exactly right at this stage; it automates with exposure and should not be hurried.
- **Mastery trigger**: the Blueprint's Component 4 gate at MAMR 5/5. The high threshold is correct — this is vocabulary that every later concept assumes, and partial fluency here surfaces as unexplainable errors much later.

## Tutor Recovery Strategy
The likely utterance is "I don't see why this matters" rather than confusion — the concept is easy and its purpose is invisible, and a learner who has just done something interesting with expressions can find term-naming a step backwards. That is a drive state rather than a cognitive one. The concept-specific move is to make the payoff immediate: **"Simplify 3x + 5 + 2x − 1. To do that you have to know which pieces are allowed to combine — that's all terms are for."** Then let them do it. If the utterance is genuine confusion instead, the smaller question is mechanical: **"Just draw a line through every plus and minus in 4x² − 3x + 7. How many pieces?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **fact / vocabulary**. Review by *application* — count and name terms in a novel expression — never by asking for the definition, which can be recited by a learner who miscounts.
- Concept-specific deviation: the implied coefficients (1 and −1) decay faster than everything else here, because they are invisible in every expression the learner reads. Keep a bare x and a bare −x in the review rotation permanently.
- Interleaving partners: `math.alg.coefficient` (the next node, and effectively the same material at higher resolution — interleave rather than teach separately) and `math.alg.expression`'s like-term work, which is where term identification is actually used.

## Transfer Connections
- **Near**: `math.alg.coefficient`, `math.alg.polynomial` (whose degree and standard form are stated per term), and every simplification the learner will do.
- **Far**: reading any structured notation as a list of components rather than as a linear string — the same skill that makes a chemical formula or a line of code parseable.
- **Real-world**: itemised bills and bank statements, where each line carries its own sign and the reading habit is already correct.
- **Expert transfer**: the reflex of decomposing an unfamiliar expression into its parts before attempting anything with it. This tiny concept installs it, and it never stops paying.

## Cross-Subject Connections
- **Computer science**, genuine: tokenising an expression into terms is literally what a parser does, and a learner who codes has a concrete model for why the separator rule must be mechanical rather than judged.
- **Chemistry**, weak but real: reading a formula as a list of element-count pairs is the same parsing move, and the invisible subscript 1 in H₂O's O is exactly the invisible coefficient 1 in x.
- The KG records no `cross_links`, which is accurate for a definitional node.

## Blueprint References
`docs/curriculum/blueprints/math.alg.term.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3) and the Component 5 Protocol B repair actions B01–B03, the lean Component 4 teaching-action sequence (TA-A01, TA-A02, gate), the Component 6 spaced-repetition schedule, the Component 8 notes on the leading sign and the implied coefficient of 1, and the explicit scope boundary against `math.alg.expression`'s like-term material. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies (including the identification of "a term is a bit with a letter in it" as MC-2's unstated birth mechanism), the argued case for direct instruction over discovery, the finding that the opening example's composition prevents two of the three misconceptions for free, and the drive-state recovery diagnosis.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
The KG records `unlocks: []` for this node, yet `math.alg.coefficient` lists `requires: ['math.alg.term']` — so the reverse edge exists and the forward one is missing. Every other node in this domain checked so far maintains the requires/unlocks mirror. Recorded for the Curriculum Production Pipeline as a probable omission; not fixed here, since no KG file may be modified by this program. Separately, `estimated_hours: 2` and `bloom: remember` are well matched to the content, and the `mastery_threshold: 0.9` is justified by how much downstream work assumes this vocabulary.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
