# math.alg.coefficient

## Identity
- **KG ID**: `math.alg.coefficient`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.term` — load-bearing part: the ability to isolate a single term first. A coefficient is a property *of a term*, so a learner who cannot bound the term cannot extract its coefficient.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5 — the highest threshold in the domain)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.alg.coefficient.md` (reused by reference throughout)

## Learning Objective
- The learner can name the coefficient of any term, separating the numerical factor from the variable factor cleanly.
- The learner can supply the implied coefficient 1 in x and −1 in −x.
- The learner can attach the term's sign to the coefficient, reading −4y as coefficient −4.
- The learner can recognise that a term with coefficient 0 is indistinguishable from an absent term.

## Core Understanding
Every term factors into a numerical part and a symbolic part, and the coefficient is the numerical part — *all* of it and *only* it. In 3x² the coefficient is 3 and the variable part is x²; in −4y the coefficient is −4, with the sign included, because the sign is part of the number and not a separate operator; in x the coefficient is 1 and in −x it is −1, both invisible in the notation and both real. The extraction is a factorisation, not a reading: the coefficient is what remains when the symbols are removed, which is why 5y³ yields 5 rather than 5y. One edge case matters more than its size suggests: a coefficient of 0 makes the term vanish from the written expression entirely, so 3x³ + 0x² + 5 is written 3x³ + 5, and the x² term is present with coefficient zero even though nothing is on the page. That fact is what makes polynomial degree, long division and the remainder theorem work later.

## Mental Models
1. **Beginner — the number in front.** Look at the front of the term; that is the coefficient. *Upgrade trigger*: a term with nothing in front. *Shelf life*: short, and it is the direct cause of the "no coefficient" answer.
2. **Intermediate — the numerical factor.** The term is a product; the coefficient is its numerical factor, which is 1 when no number is written because multiplying by 1 changes nothing. *Upgrade trigger*: a negative term, where the sign must be captured. This is the model to install; it makes the invisible 1 a consequence rather than a rule to memorise.
3. **Advanced — coefficient as a slot.** Every term has a coefficient slot, always filled, sometimes by 1, sometimes by −1, sometimes by 0 (in which case the term is invisible). *Upgrade trigger*: polynomial long division, where the zero slots must be written in.
4. **Expert — coefficients as the data.** A polynomial *is* its coefficient list; everything computational about it — degree, roots, division, differentiation — is an operation on that list. *Shelf life*: forward pointer; install when `math.alg.polynomial-division` is reached.

## Why Students Fail
The notation is deliberately economical and the economies are exactly the failure points. Mathematics writes x rather than 1x and −x rather than −1x because the shorter form is easier to read, and the cost is that two of the four things a learner must know are never on the page. No amount of exposure surfaces an invisible symbol; it has to be taught explicitly and rehearsed. The second failure — reading −4y's coefficient as 4 — comes from years of treating − as an operation between numbers, which is correct in 7 − 4 and wrong in the term −4y. The third, giving 5y for the coefficient of 5y³, is an incomplete factorisation: the learner has removed *some* of the symbols and stopped, usually because they are reading rather than factoring.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry, with birth-type classification added.

- **MC-1 — COEFFICIENT-IS-VARIABLE** (FOUNDATIONAL)
  - **Birth type**: Type 3, language contamination. "Coefficient" is an opaque, unfamiliar word carrying no clue about which part of the term it names, so the learner attaches it to whichever part is most salient — usually the variable, which is the *new* thing the lesson is about.
  - **Characteristic phrase**: shown 3x², "the coefficient is x²."
  - **Detection probe** (verbatim): "In 3x², what is the coefficient?"
  - **Repair**: Blueprint Repair Action B01 — split the term physically into number and symbol and label both. Naming the *other* part (the variable part) at the same time is what fixes it; a learner given only one label attaches it by guess.
  - **Verification of death**: the learner names both the coefficient and the variable part of a novel term, unprompted.

- **MC-2 — IMPLIED-COEFFICIENT-MISSING** (foundational)
  - **Birth type**: Type 4, notation-induced, in the purest form found in this domain — the symbol is genuinely not written. This is not an inference error; the information is absent from the page.
  - **Characteristic phrase**: shown x, "there isn't one."
  - **Detection probe**: "What is the coefficient of x? Of −x?" Both halves are needed; a learner may supply 1 and still miss −1.
  - **Repair**: Blueprint Repair Action B02 — derive rather than assert: x = 1·x because multiplying by 1 changes nothing, so the coefficient is 1 and it is simply not written. A derived fact survives; a stipulated one does not.
  - **Verification of death**: the learner combines 3x + x to 4x without pausing, which is the operational test and the reason the fact matters.

- **MC-3 — COEFFICIENT-INCLUDES-VARIABLE** (moderate)
  - **Birth type**: Type 1, overgeneralisation — partial extraction generalised as complete. The learner has correctly separated something and has no criterion for how far to go.
  - **Characteristic phrase**: shown 5y³, "the coefficient is 5y."
  - **Detection probe**: "In 5y³, what is the coefficient?"
  - **Repair**: Blueprint Repair Action B03 — state the criterion: the coefficient contains *no letters at all*. A one-line test, checkable by inspection, replacing a judgement with a rule.
  - **Verification of death**: the learner extracts the coefficient from a term with several variables (−7ab²) correctly, which requires the rule rather than the pattern.

## Analogies
- **Best — how many, of what.** Every term answers two questions: how many (the coefficient) and of what (the variable part). 3x² is "three of the x-squareds"; x is "one of the x's"; −4y is "negative four of the y's". This single framing prevents MC-1 and derives MC-2's invisible 1 for free, because "no x's at all" would be 0, not "no coefficient".
- **Alternative — the price tag.** The number is the quantity, the symbol is the item. *Breaking point*: quantities in shops are never negative and never 1-by-omission, so the analogy must be extended explicitly to both cases rather than left to carry them.
- **Story analogy** — none. This is a one-hour vocabulary concept and a narrative would add load without clarity; recording the absence deliberately rather than inventing one.
- **ANTI-ANALOGY — "the coefficient is the number in front."** Almost right, and it is the reason MC-2 exists: when there is nothing in front, this definition says there is no coefficient, which the learner then reports honestly. Say "the numerical factor" and the invisible 1 follows from multiplication rather than contradicting the definition.
- **ANTI-ANALOGY — "ignore the sign, just take the number."** Sometimes said to simplify extraction, and it manufactures sign errors that surface far downstream in factoring and solving, where they are extremely hard to trace back here.

## Demonstrations
- **The four-term extraction.** 3x², x, −x, −4y — name coefficient and variable part for each. *Elicit predictions first, in writing, all four.* Every misconception in the concept appears in one thirty-second task, and the written record is what distinguishes a guess from a belief.
- **The 1·x derivation.** Write x, then write 1·x beside it, and ask whether they are the same number. They are. So the coefficient is 1. *Predict first*: "does x have a coefficient?" The derivation converts the answer from a rule into a consequence.
- **The zero-coefficient reveal.** Write 3x³ + 5, then ask what the coefficient of x² is. *Predict first.* The answer (0) is genuinely surprising and it is the Blueprint's own P76 probe; it is also the fact that makes polynomial long division work, so it is worth planting here even though it will not be used for several concepts.

## Discovery Questions
**Direct instruction wins, and the argument is the same as for `math.alg.term`**: "coefficient" is a naming convention, and conventions are not discoverable. What is genuinely worth eliciting is the invisible 1 — "is x the same number as 1 times x?" is a real question with a checkable answer, and a learner who derives the implied coefficient from it holds it far more durably than one who is told. So: state the definition and the no-letters test directly, then run the 1·x elicitation as the one discovery step, then exercise against the four-term set with predictions taken first. Staging a full six-step discovery for a one-hour vocabulary node would consume the concept's entire time budget on theatre.

## Teaching Sequence
The Blueprint's Component 4 owns the turn-level scripts and is deliberately lean (2 teaching actions plus the gate). The load-bearing ordering constraint is that **the coefficient and the variable part must be named together, in the same breath, from the first example** — MC-1 is a mis-attachment of a single label, and it simply cannot form if both labels are present. Second, **the negative case must appear before practice begins, not after**: the sign convention is the one that produces untraceable errors later, and a learner who has drilled twenty positive coefficients has automated a rule that drops signs. The zero-coefficient case comes last and is planted rather than mastered — it will be genuinely needed at `math.alg.polynomial-division`, and meeting it once here means it is recognised rather than discovered under load there.

## Tutor Actions
- **TEST-THINKING: Prediction** — the four-term extraction, in writing, before any teaching. First action; it is a complete diagnostic in half a minute.
- **ORGANIZE: Representation Table** — term / coefficient / variable part, with 3x², x, −x, −4y, 5y³ and −7ab² as rows. This one table is the concept.
- **DO: Worked Example** — the 1·x derivation.
- **TEST-THINKING: Error Analysis** — "a student says the coefficient of 5y³ is 5y. What test would have caught that?"
- **Does NOT fit: extended drill.** At one estimated hour with a definitional target, drill past fluency wastes the budget; the threshold of 0.95 is met by precision on the edge cases, not by volume on the easy ones.
- **Does NOT fit: Game.** The chocolate-covered-broccoli guard applies: a speeded coefficient-spotting game rewards the "number in front" heuristic, which is exactly the model that fails on x and −x.

## Voice Teaching Notes
The load-bearing phrase is "how many, of what" — used as the standing question for every term, it makes both parts audible and prevents the single-label attachment that is MC-1. Listen for the learner reading −4y aloud as "minus four y" versus "negative four y": the first keeps the sign as an operator and predicts dropped signs later, the second binds it to the number, and the difference is worth correcting explicitly even though both are conventional English. Listen for silence at a bare x — that pause is MC-2 and it is a genuine information gap, so supply "one, because x is one x" rather than probing further. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **"There isn't one" for x** — MC-2. A gap, not a misconception; the learner is reporting the page accurately. Repair by derivation and move on quickly.
- **4 given for −4y** — the sign convention. Fast, confident, and the most consequential error here because it is invisible in this concept and destructive three concepts later. Do not let it pass as a minor slip.
- **x² given for 3x²** — MC-1. Rare once both labels are taught together, which is why the teaching order matters more than the repair.
- **5y given for 5y³** — MC-3, and it usually co-occurs with correct answers elsewhere, so it will not surface unless a multi-symbol term is in the probe set.
- **Correct on all single-variable terms, wrong on −7ab²** — the no-letters rule is absent and a pattern is doing the work. The gate must include a multi-variable term.
- **Mastery trigger**: the Blueprint's Component 4 gate at MAMR 5/5. The 0.95 threshold is the highest in the domain and is correct: this is pure vocabulary that every later concept assumes, and partial fluency here is undiagnosable later.

## Tutor Recovery Strategy
Recovery is rarely needed at this concept — it is short and easy — but when it is, the utterance is usually "wait, which part is it again?", which is MC-1 in the form of honest uncertainty rather than error. The concept-specific smaller question restores both labels at once: **"Three x squared. How many? Three. Of what? X squareds. The 'how many' is the coefficient."** Then hand over a second term and ask the two questions in order. The recovery is thirty seconds and it should not be inflated into a re-teach; treating a small gap as a large one at a one-hour concept is itself a confidence risk. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **fact / vocabulary**. Review by extraction from a novel term, never by definition recall.
- Concept-specific deviation: the implied 1 and −1 remain invisible in notation forever, so no naturally occurring exposure reinforces them. They need a permanent place in the review rotation, and the operational test (does the learner combine 3x + x fluently?) is a better probe than asking for the coefficient directly.
- Interleaving partners: `math.alg.term` — effectively the same material at two resolutions, and mixing them is worth more than reviewing either alone. Later, `math.alg.like-terms`, where coefficient extraction becomes load-bearing rather than nominal.

## Transfer Connections
- **Near**: `math.alg.like-terms` and `math.alg.simplification`, where coefficients are added; `math.alg.degree` and `math.alg.polynomial`, where the coefficient list is the object.
- **Far**: reading any quantity-plus-unit pair, and specifically the habit of noticing that "1" is often omitted rather than absent.
- **Real-world**: unit pricing and recipe scaling — "how many, of what" is exactly how both are read, and the learner already does this correctly outside mathematics.
- **Expert transfer**: the zero-coefficient insight — that something can be present with value zero and therefore invisible — generalises to sparse representations everywhere, and it is the single non-obvious idea in an otherwise routine concept.

## Cross-Subject Connections
- **Chemistry**, genuine and unusually close: the subscript 1 in H₂O's oxygen is invisible for exactly the reason the coefficient 1 in x is, and the stoichiometric coefficient in a balanced equation is the same "how many, of what" reading. A learner who has met `chem.react.*` balancing has the model already.
- **Computer science**, weak but real: sparse data structures omit zeros for the same reason 0x² is not written, and the bug class that follows (assuming absent means undefined rather than zero) is the same error.
- The KG records no `cross_links`, which is accurate for a definitional node, though the chemistry connection above is strong enough to be worth encoding.

## Blueprint References
`docs/curriculum/blueprints/math.alg.coefficient.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3) and the Component 5 Protocol B repair actions B01–B03, the lean Component 4 teaching-action sequence, the Component 6 spaced-repetition schedule, the P76 zero-coefficient probe, and the Component 8 notes on sign ownership and the 0.95 threshold rationale. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies (including the identification of "the number in front" as MC-2's birth mechanism), the "how many, of what" framing that prevents MC-1 structurally, the ordering finding that both labels must be named together, and the operational review test for the implied coefficient.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Same finding as recorded at `math.alg.term`: this node lists `requires: ['math.alg.term']` while `math.alg.term` lists `unlocks: []`, so the requires/unlocks mirror is broken across that edge. Recorded once more here because it is the other end of the same missing edge; not fixed, per this program's never-modify-the-KG constraint. Separately, `estimated_hours: 1` is the smallest value in the mathematics KG and is well judged — the concept genuinely is one hour — but it sits alongside the domain's highest `mastery_threshold` (0.95), which is an unusual and, on inspection, entirely correct combination: short to teach, expensive to get wrong.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
