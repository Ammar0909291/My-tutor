# math.alg.expression

## Identity
- **KG ID**: `math.alg.expression`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.found.variable` — load-bearing part: that a variable is a symbol standing for a quantity that can *vary*, not a fixed unknown awaiting discovery. This is the exact belief MC-2 attacks, and it must arrive already correct or the concept has to repair its own prerequisite.
  - `math.arith.order-of-operations` — load-bearing part: PEMDAS applied to a numerical expression. Substitution turns an algebraic expression into an arithmetic one, and every evaluation error downstream is an order-of-operations error wearing algebra's clothes.
- **Unlocks**: `math.alg.equation`, `math.alg.polynomial`
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.expression.md` (reused by reference throughout)

## Learning Objective
- The learner can distinguish an algebraic expression from an equation by the presence or absence of an = sign, and can say why that mark changes what the object *is*.
- The learner can evaluate an expression at a given value of the variable, applying order of operations correctly after substitution.
- The learner can simplify an expression by combining like terms, and can say why 3x + 2y cannot be combined.

## Core Understanding
An algebraic expression is a *quantity*, built from constants, variables and operations. It makes no claim, so it has no truth value, so there is nothing in it to solve — it can only be evaluated (substitute a number, compute) or simplified (rewrite it as a shorter expression naming the same quantity). The = sign is the entire watershed: without it you have a quantity, with it you have a statement. A variable inside an expression is not a hidden number waiting to be found; it is a placeholder that admits any value, and the expression is really a *rule* for producing a number once a value is supplied. Simplification is licensed only between like terms — same variable, same power — because 3x + 2x is 5x for the same reason 3 of anything plus 2 of the same thing is 5 of it, and 3x + 2y is not 5xy because they are not the same thing.

## Mental Models
1. **Beginner — the recipe.** The expression tells you what to do to a number once you have one. 3x + 2: triple it, add two. *Upgrade trigger*: being handed two different values for x and noticing the recipe is unchanged. *Shelf life*: excellent, and it is the model that makes MC-2 impossible.
2. **Intermediate — the quantity with a hole in it.** The expression names a number; the variable is the hole, and filling the hole names a specific number. *Upgrade trigger*: meeting an equation and needing to say what changed. This is the model to install hardest, because it is the one that survives contact with the = sign.
3. **Advanced — the same quantity, written differently.** 3x + 2x and 5x are two names for one thing, and simplification is renaming, not solving. *Upgrade trigger*: being asked to *verify* a simplification by substituting a value into both forms.
4. **Expert — the expression as a function in waiting.** 3x + 2 is what f(x) = 3x + 2 is *made of*; this is the bridge to `math.func.function-concept`. *Shelf life*: install as a forward pointer only.

## Why Students Fail
Every prior mathematical object the learner has met has demanded an answer. Arithmetic problems have answers; word problems have answers; even a fraction to simplify resolves to a single reduced form. An expression demands nothing, and a learner whose entire experience of mathematics is "produce the number" will supply one anyway — by inventing an equals sign, or by insisting x must be solved first. The failure is not carelessness; it is a correct generalisation from a training set that contained no counterexamples. The second failure, combining unlike terms, is genuinely cognitively natural: 3 apples + 2 oranges = 5 fruit is a *reasonable* operation in the world, and the learner is applying an intuition that works everywhere except here.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry, with birth-type classification added.

- **MC-1 — EXPRESSION-IS-EQUATION** (FOUNDATIONAL)
  - **Birth type**: Type 5, instruction-induced. Years of mathematics in which every object had an answer, and none of it flagged the pattern as contingent. The learner was never shown a mathematical object that is not a question.
  - **Characteristic phrase**: "so what does x equal?"
  - **Detection probe** (verbatim): "Here is 3x + 2. What would you do with it?" Any answer beginning "solve" is the misconception; the correct answers are "evaluate it, if you give me an x" or "simplify it".
  - **Repair**: Blueprint Repair Action B01 — the = sign count. Put an expression and an equation side by side and ask a single question of each: how many = signs? The distinction becomes a two-second observation rather than a judgement.
  - **Verification of death**: shown a novel expression, the learner *asks for a value of x* rather than trying to find one.

- **MC-2 — VARIABLE-IS-FIXED** (foundational)
  - **Birth type**: Type 3, language contamination — from the word "unknown", which is how variables are almost universally introduced ("x is the unknown"). An unknown is a definite thing you do not yet know. A variable is not.
  - **Characteristic phrase**: "but I don't know what x is yet."
  - **Detection probe**: "Evaluate 3x + 2 when x = 4. Now when x = 10." Watch whether the second instruction causes distress.
  - **Repair**: Blueprint Repair Action B02 — evaluate the *same* expression at three different values in a row and tabulate. Three different answers from one expression makes "x has a value" untenable without a word of argument.
  - **Verification of death**: the learner produces a table of values for a new expression unprompted, or says "it depends on x" without hesitation.

- **MC-3 — UNLIKE-TERMS-COMBINED** (moderate)
  - **Birth type**: Type 1, overgeneralisation, and unusually defensible: the learner is generalising the perfectly correct 3x + 2x = 5x to 3x + 2y, and the arithmetic analogue (3 + 2 = 5) supports them everywhere they have been before.
  - **Characteristic phrase**: "3x + 2y = 5xy."
  - **Detection probe**: "Simplify 3x + 2y. Now simplify 3x + 2."
  - **Repair**: Blueprint Repair Action B03 — the unit analogy, which the Blueprint's own Teaching Notes single out as the most effective counter because it mirrors rather than contradicts the learner's intuition: 3 metres + 2 metres is 5 metres; 3 metres + 2 seconds is not 5 of anything. Then substitute a value and check numerically, so the correction is arithmetic and not authority.
  - **Verification of death**: the learner *tests* a doubtful combination by substituting numbers, rather than asking whether it is allowed.

## Analogies
- **Best — units.** Like terms are like units. 3x + 2x = 5x; 3x + 2y stays as it is, the way 3 metres + 2 seconds stays as it is. *Breaking point*: real units sometimes combine into new units (metres per second), and terms never do — so the analogy must be capped at addition and must not be extended to multiplication, where 3x · 2y = 6xy is perfectly fine.
- **Alternative — the vending machine.** Put a number in, get a number out; the machine is the expression and it does not change between uses. Carries the variable-as-placeholder idea better than the units analogy and directly prevents MC-2.
- **Story analogy** — a recipe that says "triple the flour and add two cups of water": it is a genuine instruction with no answer, and asking "how much flour?" is a category error rather than a hard question. Useful because it makes the *absence* of an answer feel normal.
- **ANTI-ANALOGY — "x is the unknown."** This single phrase is the entire birth mechanism of MC-2, and it is almost universal. Say "x is a placeholder" or "x can be anything" instead; the cost is two syllables and the saving is a foundational misconception.
- **ANTI-ANALOGY — "3 apples plus 2 oranges is 5 pieces of fruit."** Offered as an explanation of *why* unlike terms combine into something, it installs MC-3 outright — because in that sentence they *do* combine. Use the units version, where they genuinely do not.

## Demonstrations
- **The = sign count.** Four objects on the board: 3x + 2, 3x + 2 = 11, 5y, 2a − 1 = 7. Count the = signs; sort into two piles. *Elicit the prediction first*: "which of these are the same kind of thing?" — the learner's spontaneous sorting reveals whether MC-1 is present before any teaching happens.
- **The evaluation table.** One expression, x = 0, 1, 2, 5, 10. *Predict first*: "will the answer be the same every time?" The prediction is the diagnostic; the table is the correction.
- **Substitution check on a simplification.** Simplify 3x + 2x to 5x, then substitute x = 7 into both and confirm both give 35. Then try it with 3x + 2y → 5xy at x = 1, y = 2: 3 + 4 = 7 versus 5·1·2 = 10. *Predict first*: "will these match?" This makes MC-3 fail arithmetically rather than by decree, which is the only correction that survives.

## Discovery Questions
Guided discovery works well here — every step is computable by the learner, and the concept's difficulty is a belief rather than a technique.
1. **Need**: "Here's 3x + 2. Find x." (The learner tries, and cannot. The absence of enough information *is* the need, and it is felt rather than announced.)
2. **Playground**: "Fine — I'll give you x. x = 4. Now what? x = 10. Now what?"
3. **Invention**: "So what IS this thing, if it isn't a question with an answer?"
4. **Collision**: put 3x + 2 = 11 beside it. "Now find x." This time it works. "What changed?" — the learner locates the = sign themselves, which is worth far more than being shown it.
5. **Formalisation**: expression = quantity, evaluated; equation = statement, solved. Name both.
6. **Compression**: "No equals sign, no question."

## Teaching Sequence
The Blueprint's Component 4 owns the turn-level scripts. Two ordering constraints are load-bearing. First, **the expression/equation distinction must be established before any evaluation is attempted** — the Blueprint's own Teaching Notes make this an explicit gate (confirm TA-A01/A02 before TA-A03), and the reason is that a learner holding MC-1 will read "evaluate" as "solve" and will produce a number by whatever route is available, making their correct answers uninformative. Second, **like-term simplification must come after evaluation is fluent**, because the substitution check is the only non-authoritarian repair available for MC-3, and it requires the learner to be able to substitute without effort. Multi-variable expressions come last, per the Blueprint's own note; introduced early they multiply the load on a learner still deciding what kind of object they are looking at.

## Tutor Actions
- **TEST-THINKING: Prediction** — the four-object sorting, taken before any teaching. First action; it is the diagnostic for MC-1 and it costs thirty seconds.
- **ORGANIZE: Representation Table** — the evaluation table, one expression, several values. This is the artefact that kills MC-2 and it should stay visible.
- **DO: Worked Example** — substitution with full order-of-operations shown, including the parenthesis around a substituted negative value, which is where most arithmetic errors enter.
- **TEST-THINKING: Error Analysis** — 3x + 2y = 5xy, tested numerically and found false by the learner.
- **SHOW: Analogy** — units, delivered *after* the numerical failure rather than before it.
- **Does NOT fit: Drill on simplification.** Speeded practice at this stage automates whatever rule the learner currently holds, which for a learner with MC-3 is the wrong one. Drill after diagnosis, never before.

## Voice Teaching Notes
The load-bearing sentence is "there's no equals sign, so there's nothing to solve." Say it every time an expression appears, for several sessions; it is short enough to become a reflex and it is the whole concept. Listen for the learner saying "the answer" about an expression — that noun is MC-1 in one word, and it appears long before any wrong work does. Listen also for hesitation *after* substitution and *before* computing: that is order-of-operations load, not algebra trouble, and the right response is to supply the arithmetic rather than re-explain the concept. When reading expressions aloud, model "three x plus two", not "three x two", and insist the learner does the same — a dropped operator in speech becomes a dropped operator on paper. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong: "solve 3x + 2"** — MC-1 at DOMINANT strength. Do not treat as a reading error; it is a category belief, and it is the single most common state a learner arrives in.
- **Correct evaluation at x = 4, distress at x = 10** — MC-2. The first answer was correct and told you nothing; only the second value is diagnostic, which means a single-value probe cannot detect this misconception at all.
- **Fast-wrong: 3x + 2 = 5x** — MC-3, dangerous quadrant. Fast, confident, and structurally identical to a correct like-term combination, which is why it feels right.
- **Slow-correct on simplification** — the learner is checking like-ness deliberately each time. Healthy and expected at this stage; it consolidates into fluency and should not be rushed.
- **Correct simplification with no ability to justify it** — pattern-matched from examples. Passes any simplification probe and fails the first unfamiliar term pair. The gate must include a "why can't these combine?" item.
- **Mastery trigger**: the Blueprint's Component 4 gate at MAMR 5/5 — a high bar, appropriate for a concept every later algebra concept depends on, and it should be held rather than softened.

## Tutor Recovery Strategy
The likely utterance is "I don't know what I'm supposed to do with it" — which is honest and, given MC-1, entirely reasonable: the learner genuinely has not been told what one does with an object that asks nothing. The concept-specific smaller question supplies the missing instruction rather than re-explaining: **"You don't have to do anything with it yet. I'll give you a number. x is 2. What's 3x + 2?"** That is arithmetic, the learner can do it, and it demonstrates the concept's whole operating mode without naming it. Repeat with a second number before saying a single word about expressions. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept** (the expression/equation distinction) fused with **procedure** (evaluation, simplification). Review must cover both; a learner who is fluent at substitution can still have lost the distinction, and vice versa.
- Concept-specific deviation: MC-1 is re-triggered every time a new *kind* of expression appears (rational, radical, exponential), because the learner meets an unfamiliar object and reaches for the familiar response. Expect and plan for re-probes at each of those downstream concepts rather than treating it as settled here.
- Interleaving partners: `math.alg.equation` — the discrimination that matters most, and the two should be mixed deliberately rather than taught and tested separately. Also `math.arith.order-of-operations`, to keep substitution clean.

## Transfer Connections
- **Near**: `math.alg.equation` (the same objects with one mark added) and `math.alg.term` (the parts of what was just built).
- **Far**: reading any formula as a rule rather than a question — the same move that makes a physics equation usable rather than intimidating.
- **Real-world**: any pricing rule, conversion, or per-unit cost — "£3 per item plus £2 delivery" *is* 3x + 2, and it obviously has no single answer, which is worth showing the learner because their everyday reasoning already handles this correctly.
- **Expert transfer**: the habit of asking what *kind* of object is in front of you before deciding what to do with it. This is the reflex that later distinguishes an identity from an equation from a definition.

## Cross-Subject Connections
- **Physics**, genuine: every formula the learner will meet is an expression until a value is supplied, and the `phys.meas.*` material depends on evaluating them fluently. The KG encodes no edge, but the dependency is real in practice.
- **Computer science**, genuine and close: an expression in code is exactly this object, and a variable there is unambiguously a placeholder rather than an unknown — which makes programming an unusually effective venue for repairing MC-2 in a learner who codes.
- The KG records no `cross_links` for this concept; both connections above are recorded as feedback rather than asserted as KG facts.

## Blueprint References
`docs/curriculum/blueprints/math.alg.expression.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3) and the Component 5 Protocol B repair actions B01–B03 including the unit analogy, the Component 4 teaching-action sequence TA-A01..TA-A04 with its evaluation gate, the Component 6 spaced-repetition schedule, and the mastery gate item set. This entry adds birth-type classification, the mental-model ladder, the "x is the unknown" anti-analogy (identified here as MC-2's actual birth mechanism), the finding that a single-value evaluation probe cannot detect MC-2, and the recovery shrink-question.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
None. The KG node is clean: `requires` are both genuinely load-bearing, `unlocks` are correct, difficulty and Bloom level match the target behaviour, and `mastery_threshold: 0.85` on a gateway concept is appropriately strict. One observation for the Curriculum Production Pipeline rather than a defect: this node has no `cross_links` despite being the single most cross-applicable concept in early algebra (every physics formula, every spreadsheet cell, every line of code). A `cross_links` entry toward `cs.prog.*` variables would carry real teaching value.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.alg Wave 1 (Phase 2, batch 2).
