# math.alg.simplification

## Identity
- **KG ID**: `math.alg.simplification`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.like-terms` — load-bearing part: the closing move of every simplification is collecting like terms; without a reliable same-variable-part test, the expanded form cannot be reduced at all.
  - `math.alg.expression` — load-bearing part: simplification produces an equivalent *expression*, never an equation, and the learner must already hold "expression" as a standalone object (no "=" to solve for) before "simpler form of the same object" makes sense.
- **Unlocks**: `math.alg.equation`
- **Cross-links**: none in the KG
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.simplification.md` (reused by reference throughout)

## Learning Objective
- The learner can expand a bracketed term a(b + c) by multiplying the outside factor into *every* term inside, not just the first.
- The learner can expand a bracket preceded by a negative factor, correctly flipping the sign of every enclosed term.
- The learner can, after expanding, collect like terms exactly as in `math.alg.like-terms`, and can name an expression "already simplified" when no bracket remains and no two terms are alike.
- The learner can hold "expand, then collect" as one procedure with two ordered stages, never merging or reordering them.

## Core Understanding
Algebraic simplification is not a new operation — it is two already-known operations, run in a fixed order, against a bracketed expression. Stage one is the distributive law: a(b + c) = ab + ac, which says every term sheltering inside the brackets must be multiplied by the outside factor, none skipped. Stage two is `math.alg.like-terms`'s own collection rule, applied to whatever the expansion produced. The reason the order is fixed and not interchangeable is structural: like-term collection needs terms to compare, and before expansion the bracket hides how many terms there really are — 3(x + 4) *looks* like one term until it is opened. A negative outside factor is not a special case requiring a new rule; it is ordinary distribution where the outside factor happens to be negative, so −(x − 3) is (−1)(x) + (−1)(−3) = −x + 3 by the identical law, and every sign inside is a consequence of multiplying by −1, not of a separate "sign-flipping" operation the learner must memorise on top of distribution.

## Mental Models
1. **Beginner — every item in the bag gets multiplied.** 3(x + 4) means 3 copies of "x and 4", so multiply the 3 into both. *Upgrade trigger*: a negative outside factor, where "multiply into both" alone does not tell the learner what happens to the signs. *Shelf life*: one lesson.
2. **Intermediate — the outside factor is multiplied by −1's worth of itself when it is negative.** −2(x + 3) is (−2)(x) + (−2)(3); the sign of each product follows ordinary sign-of-a-product rules, not a separate flipping ritual. *Upgrade trigger*: a bracket subtracted from another bracket, e.g. 3(x+2) − 2(x−1), where two expansions must be tracked and then merged. *Shelf life*: durable through most of school algebra.
3. **Advanced — simplification is expand-then-collect, and only that.** Every simplification task decomposes into exactly those two stages, however many brackets are present; there is no third operation hiding anywhere in this concept. *Upgrade trigger*: a bracket multiplied by a bracket (previewed in the KG's own transfer probe, owned properly by later factoring/polynomial concepts) — the same distributive law, applied twice.
4. **Expert — an expression is a function of its variable, and simplification preserves that function while changing its surface form.** 3(2x−1)+2(x+4) and 8x+5 agree at every input, which is the actual definition of "equivalent," and simplification is the search for the shortest expression in that equivalence class. *Shelf life*: permanent; this is the model that later makes "verify by substitution" an obviously correct check rather than a taught trick.

## Why Students Fail
The dominant failure surface is incomplete distribution: the learner multiplies the outside factor into the *first* term inside the bracket and then, having "done the multiplication," simply carries the remaining terms across unchanged — 3(x + 5) becomes 3x + 5 rather than 3x + 15. This is not a guess; it is the natural stopping point of "multiply the outside number by the thing next to it," a habit built from years of a(b) meaning a single multiplication with a single visible product. Brackets with more than one term inside break that habit's implicit assumption without announcing that they have done so. The second major failure is sign-specific: a negative outside factor is read as attaching only to the term it is typographically closest to, so −(x − 3) becomes −x − 3 (the minus sign "belongs" to x, and the −3 inside is read as already negative and left alone) rather than −x + 3. Both failures share a root: the notation a(b + c) gives no visual cue that *every* enclosed term is inside the scope of the outside factor — the cue is purely a rule the learner must supply, not read off the page. A third, later failure appears only after the first two are cleared: having correctly expanded, the learner then over-merges the resulting terms, applying the collection reflex from `math.alg.like-terms` MC-1 to genuinely unlike residual terms (this concept's job is to prevent that reflex from re-triggering on freshly expanded, unfamiliar-looking terms).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 5 repair actions B01–B03, with birth-type classification added.

- **MC-1 — DISTRIBUTES-INCORRECTLY** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation of single-term multiplication a(b) = ab, where there is only ever one product to compute. The learner has never had to ask "how many products should this produce?" because the answer was always one.
  - **Characteristic phrase**: shown 3(x + 5), "3x + 5" (the +5 carried across unmultiplied).
  - **Detection probe** (verbatim, Blueprint P49): "Expand 4(3x − 2)." A response of 12x − 2 is diagnostic.
  - **Repair**: Blueprint Repair Action B01 — count the terms inside the brackets, then count the products; a mismatch names the missed multiplication directly, without re-explaining the law from scratch.
  - **Verification of death**: given 2(3a + b − 4), the learner produces all three products (6a, 2b, −8) unprompted and states the count check themselves.

- **MC-2 — SIGN-FLIPS-MISSED** (foundational)
  - **Birth type**: Type 4, notation-induced. The minus sign sits typographically beside one term (the first, or the term right after the outside factor) and is read as belonging only to it, rather than as the sign of the whole outside factor's multiplication.
  - **Characteristic phrase**: shown −(x − 3), "−x − 3" (the interior minus was not itself negated).
  - **Detection probe** (verbatim, Blueprint P41): "Expand −(x − 3)." A response of −x − 3 confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — reframe the negative outside factor explicitly as multiplication by −1, then apply MC-1's own count-the-products check to confirm every sign, not just the first, changed.
  - **Verification of death**: given −3(2x − 5), the learner produces −6x + 15 and can state, unprompted, why the second term became positive.

- **MC-3 — UNLIKE-TERMS-COMBINED-AFTER-EXPANSION** (moderate)
  - **Birth type**: Type 1, overgeneralisation — specifically the resurfacing of `math.alg.like-terms` MC-1 (VARIABLE-PARTS-IGNORED) once expansion has produced several terms that look, superficially, like a single unfinished sum again.
  - **Characteristic phrase**: given 3(x + 2) − 2x expanded to 3x + 6 − 2x, an answer that further merges 3x and 6, or 6 and x, into one term.
  - **Detection probe** (verbatim, Blueprint P41): "Simplify 3(x + 2) − 2x." An answer other than x + 6 that shows the x-term and constant merged is diagnostic.
  - **Repair**: Blueprint Repair Action B03 — apply the already-secured `math.alg.like-terms` grouping test to the post-expansion terms explicitly, one group for the variable part, one for constants.
  - **Verification of death**: the learner expands 4(a + 1) − 2a + 3 to 4a + 4 − 2a + 3 unprompted, then groups and reports 2a + 7 without attempting to merge 2a with 7.

## Analogies
- **Best — the shopping-pack receipt.** Buying 3 packs, each holding 2 pens and 4 erasers, gives 3×2 pens and 3×4 erasers — every item in the pack is multiplied by the number of packs, none skipped. This is the Blueprint's own P03 analogy and it carries MC-1's repair directly: "how many items were in the pack? how many products did you compute?"
- **Alternative — the debt reversal.** Owing "the negative of" a bundle of things (2x² − x + 4) means every component of the bundle reverses sign, not just the first one named. This targets MC-2 specifically, because "the negative of a whole bundle" is exactly the operation a lone minus sign in front of a bracket performs.
- **Story analogy** — a delivery driver given "3 boxes, each with a book and a pen" delivers 3 books and 3 pens, not 3 books and 1 pen; forgetting to multiply the second item is a delivery error, and the learner can be asked to spot it as one.
- **ANTI-ANALOGY — "distribute the sign, then simplify separately."** Treating sign-distribution and term-collection as two independent, order-free tasks invites the learner to collect too early, before every sign is settled, reintroducing MC-3 on an incompletely-expanded expression.
- **ANTI-ANALOGY — "the bracket is basically one big term."** This is the exact intuition MC-1 acts on; brackets are not compressed terms, they are groups awaiting distribution, and naming them that way licenses skipping the multiplication into every member.

## Demonstrations
- **The count check.** Write 3(x + 5), circle the two terms inside, then require two circled products before anything is written as an answer. This directly operationalises Blueprint B01's repair as a first-pass habit rather than an after-the-fact correction.
- **The −1 rewrite.** Write −(x − 3) as (−1)(x − 3), expand as ordinary distribution, and only then compress back to the "shortcut" negative-sign notation. Doing the rewrite explicitly, every time at first, prevents MC-2 from ever needing a "shortcut" it hasn't earned.
- **The two-bracket subtraction, worked live.** 3(x + 2) − 2(x − 1): expand both sides fully before touching a plus or minus sign between them, then collect. *Predict the number of terms after full expansion first* — this is the Blueprint's own worked example 1, restaged as a live demonstration with the learner predicting term-count before computing.

## Discovery Questions
Direct instruction wins here over full guided discovery. The distributive law is not something a learner can plausibly re-derive from first principles in this lesson — it is a *given* structural fact about multiplication over addition, already implicitly used (without being named) throughout `math.arith` — and re-deriving it risks manufacturing exactly MC-1 as a "reasonable-looking" partial rule along the way. What is discoverable, and should be discovered rather than told, is the *count check* itself: shown 3(x + 5) worked incorrectly as 3x + 5, ask "how many things were inside the brackets? how many multiplications happened?" and let the learner state the mismatch and its fix in their own words. This is a short, targeted discovery move nested inside an otherwise direct-instruction concept, matching this concept's own two-stage, procedure-heavy character (developing difficulty, apply-level Bloom, h=5 pacing) rather than the fuller 6-step arc used for concepts whose core rule is genuinely re-derivable, like `math.alg.like-terms`.

## Teaching Sequence
Expansion must be completely secure, including the negative-factor case, before any two-bracket problem is attempted — a learner who has not cleared MC-2 will produce a wrong expanded form, and any collection performed afterward inherits that error invisibly, making the failure look like a collection mistake when it is really an expansion mistake. Within expansion itself, the positive-factor case (TA-A01) must precede the negative case, because MC-1 (incomplete distribution) and MC-2 (sign mishandling) are easiest to tell apart when only one is possible at a time; introducing negative factors before positive distribution is secure conflates two error sources into one confusing signal. Collection (TA-A03's simplified-vs-not-simplified judgment) comes last and deliberately after two-bracket practice, not before — this concept's version of `math.alg.like-terms` MC-3 (unlike terms merged) only reliably surfaces once the learner is handling multi-term expanded output, not single-bracket single-variable-part practice. The Blueprint's Component 4 sequence (TA-A01 → TA-A02 → TA-A03 → mastery gate) is reused by reference and not restated turn-by-turn here.

## Tutor Actions
- **DO: Demonstration** — the count check, run on the learner's own attempt rather than a fresh example, so the mismatch is felt as *their* miscount.
- **TEST-THINKING: Prediction** — "how many products will this bracket produce?" asked before any multiplication is performed, every time, until it is unnecessary.
- **DO: Worked example, paired (correct vs. broken)** — the −1 rewrite alongside a broken "flip only the first sign" attempt, so MC-2's specific failure is visible against the correct method rather than abstractly described.
- **TEST-THINKING: Error Analysis** — "a student wrote 3(x+2) − 2(x−1) = x + 5. What step did they skip or get wrong?" — stronger than direct correction because it requires locating the error inside a full worked chain, exactly the skill needed once brackets stack up in later concepts.
- **Does NOT fit: fluency drilling on single-positive-factor brackets alone.** It leaves MC-2 and MC-3 entirely untested and produces false confidence.
- **Does NOT fit: naming "FOIL" or any bracket-times-bracket shortcut here.** That belongs to `math.alg.polynomial-operations`; this concept is scoped to a numeric or monomial factor times a bracket, and pulling in bracket-times-bracket early blurs where this concept's own mastery gate should stop.

## Voice Teaching Notes
The load-bearing sentence is "every term inside gets multiplied — count them before you start." Slow down on "every." Listen for a learner reading 3(x + 5) aloud as "three times x, plus five" rather than "three times the whole group, x plus five" — the first phrasing is audible evidence the bracket's scope has already collapsed to just the first term, before any arithmetic has even been attempted, and it predicts MC-1 with high reliability. For the negative case, listen for whether the learner reads −(x − 3) as "negative x minus three" (MC-2's signature) versus "negative, times, x minus three" (correct scope). A confident, unhesitating "cannot be simplified further" after a two-bracket subtraction is the strongest positive signal this concept produces — it means the learner trusts their own expansion enough not to keep fidgeting with it. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong 12x − 2 on "expand 4(3x − 2)"** — MC-1, and the speed indicates an automatic partial-distribution reflex rather than a considered error; route to the count check, never to a re-explanation of the law.
- **Wrong sign only on the second-or-later term of a negated bracket** — MC-2, cleanly isolated when the positive-factor case (MC-1) is already clear; route to the −1 rewrite.
- **Correct expansion, then an over-merged final answer** — MC-3; the fault is downstream of expansion and should be diagnosed by asking the learner to re-state which terms are alike in their own expanded work, not by re-teaching expansion.
- **Slow, narrated expansion with visible term-counting** — the intended intermediate state; do not rush it toward fluency before the negative-factor case has independently cleared.
- **Mastery trigger**: the Blueprint's TA-A04 gate, MAMR ⌈0.85×5⌉ = 5/5, including its P76 transfer probe (rectangle perimeter and area) — a gate passed without that transfer item does not certify the ability to apply simplification in an unscaffolded context.

## Tutor Recovery Strategy
The likely utterance is "I don't know which one to multiply first" or a frozen stare at a bracket with a negative sign in front. The concept-specific smaller question drops straight to the count check on the simplest possible case: **"3(x + 1) — how many things are inside the brackets? How many times do you need to multiply?"** This isolates the one structural fact (count-the-terms, count-the-products) from any sign complexity. If the freeze is specifically at a negative outside factor, shrink further: **"What is (−1) times 5? Now what is (−1) times (−3)?"** — two bare numeric facts the learner already owns, assembled afterward into the rewritten bracket. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure**, two ordered stages. Review by *application on mixed input* that includes at least one negative-factor item and at least one two-bracket item every cycle — a review set of only positive single-bracket items certifies a procedure the learner has not actually finished learning.
- Concept-specific deviation: keep the −1 rewrite available as a fallback move in review even once the shortcut (direct sign distribution) is fluent; a learner who loses the shortcut under pressure should be able to fall back to the explicit rewrite rather than guess.
- Interleaving partners: `math.alg.like-terms` (the collection stage this concept depends on and can silently erode if not reviewed together) and `math.alg.exponent-rules` (needed the moment a bracket contains a term like x² or the outside factor is itself a power).

## Transfer Connections
- **Near**: `math.alg.equation` (every equation-solving step that starts "first simplify this side" is a direct application), `math.alg.polynomial-operations` (bracket-times-bracket is this concept's distributive law applied twice, not a new law).
- **Far**: any formula manipulation in physics or chemistry that starts with an unexpanded bracketed expression — force/energy formulas routinely arrive bracketed and must be expanded before terms can be compared or combined.
- **Real-world**: computing a total cost or total quantity across several identical groups before combining with a separate, already-simplified quantity — the shopping-pack analogy is not decorative, it is the literal shape of the task.
- **Expert transfer**: the habit of never trusting a compound expression's "final form" until every grouping operator has been resolved — the same discipline that prevents order-of-operations errors in any symbolic system, not only algebra.

## Cross-Subject Connections
- **Physics**, genuine: force and energy expressions (e.g. expanding a bracketed term in a kinematics or circuit formula) require exactly this two-stage expand-then-collect procedure before further algebraic work is possible.
- **Computer science**, real but weak: expression simplification in a compiler's constant-folding pass performs the identical distribute-then-combine-like-terms operation over symbolic expressions.
- The KG records `cross_links: []`. No physics-formula cross-link is recorded as a probable omission here (unlike `math.alg.like-terms`'s stronger, more specific units case) because the transfer is procedural rather than conceptual — noted for completeness, not flagged as a missing edge.

## Blueprint References
`docs/curriculum/blueprints/math.alg.simplification.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3), the Component 5 repair actions B01–B03, the Component 4 teaching-action sequence (TA-A01 bracket expansion, TA-A02 full expand-then-collect worked pair, TA-A03 simplified-vs-not-simplified contrast, TA-A04 mastery gate with its P76 perimeter/area transfer probe), and the Component 6 spaced-repetition schedule. This entry adds birth-type classification, the mental-model ladder, the two anti-analogies, the argued direct-instruction call (with one nested discovery move on the count check), the ordering rationale linking MC-1/MC-2 isolation to teaching sequence, and the recovery-strategy shrink-to-numeric-fact move.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
None found specific to this concept beyond what `math.alg.like-terms`'s own entry already recorded about that concept's `cross_links: []`. This concept's `cross_links: []` is a reasonable reflection of its genuinely procedural (rather than deeply cross-subject-conceptual) character — recorded as "none found," not a silent omission.

## Version History
- v1.0 (2026-09-11): Initial authoring. Domain Certification Mode, math.alg Wave 3.
