# math.calc.product-rule

## Identity
- **KG ID**: `math.calc.product-rule`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-rules` — load-bearing part: this concept resolves the QUESTION that entry deliberately deferred — that entry's own MC-3 explicitly flagged $\frac{d}{dx}[f(x)g(x)]\ne f'(x)g'(x)$ as wrong, without yet supplying the correct rule; this concept supplies it.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.product-rule.md` (reused by reference throughout)

## Learning Objective
- The learner can state and apply the Product Rule, $(fg)'=f'g+fg'$ — TWO terms, each pairing one function's derivative with the OTHER function's original value — directly resolving `math.calc.derivative-rules`'s own flagged open misconception.
- The learner can identify when the Product Rule is genuinely necessary (a product that cannot be easily simplified into a single term first) versus when direct simplification is simpler, treating the rule as a tool of last resort for products, not a mandatory first step.
- The learner can apply the Product Rule to products of MORE than two factors, by grouping factors together and applying the two-factor rule more than once.

## Core Understanding
`math.calc.derivative-rules` already flagged that $(fg)'\ne f'g'$ without supplying the correct alternative — this concept answers that exact question: $(fg)'(x)=f'(x)g(x)+f(x)g'(x)$, TWO terms, each pairing one function's DERIVATIVE with the OTHER function's ORIGINAL (undifferentiated) value, added together. Not every product-shaped expression needs this rule, though: many products SIMPLIFY into a single term before differentiating is even necessary — $x^2\cdot x^3=x^5$ needs only the power rule, with no benefit from the (still valid, but unnecessarily laborious) Product Rule. The rule becomes genuinely NECESSARY when the two factors cannot be algebraically combined into one simpler expression — a polynomial times a trigonometric function, for instance, where no simplification collapses the product. The rule also extends beyond exactly two named factors: for three factors $fgh$, GROUP the last two together as a single "chunk" $G=gh$, apply the two-factor rule once to $f\cdot G$, then apply the SAME rule again inside $G$ itself when its own derivative is needed — the rule never actually needs more than two pieces at a time, however many factors are genuinely present, because grouping reduces any larger product to a sequence of two-factor applications.

## Mental Models
1. **Beginner — the Product Rule is a new two-term formula: $f'g+fg'$.** Plug in the four pieces, add. *Upgrade trigger*: a product like $x^2\cdot x^3$, which can be simplified directly without the rule at all — this model has no sense of when the rule is even needed. *Shelf life*: about one lesson.
2. **Intermediate — apply the rule when the factors can't be simplified into one term first.** Check for simplification before reaching for the Product Rule. *Upgrade trigger*: a product of THREE or more factors, which doesn't fit the two-named-function template directly.
3. **Advanced — group extra factors into a single "chunk" to reduce any product to two pieces.** The rule only ever needs two factors at a time; more factors are handled by grouping and re-applying. *Upgrade trigger*: needing to justify WHY the rule has this particular two-term form rather than some other combination — this model uses the rule fluently without deriving it.
4. **Expert — the Product Rule is the Leibniz rule for the derivative operator acting on a product, and it generalizes to $n$-fold products and to higher-order derivatives (the general Leibniz formula).** The two-term structure comes directly from the definition of the derivative applied to $f(x)g(x)$, expanded via a strategic add-and-subtract step. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a DIRECT continuation of the error `math.calc.derivative-rules` already flagged as a risk but did not yet resolve: having correctly learned that the sum rule distributes cleanly ($d/dx(f+g)=f'+g'$), a learner extends that same clean distributivity to products, computing $(fg)'=f'g'$ — an overgeneralization that this concept exists specifically to correct with the genuine two-term rule (MC-1, DERIVATIVE-DISTRIBUTED-OVER-PRODUCT). A second failure comes from how the rule is typically first modeled: nearly every introductory example presents EXACTLY two named functions ($f$ and $g$) in the textbook's own template, and a learner reasonably but wrongly concludes the rule is restricted to that exact shape, missing that grouping extra factors together extends it to any number of factors (MC-2, PRODUCT-RULE-RESTRICTED-TO-EXACTLY-TWO-NAMED-FACTORS). A third failure is the opposite instinct — reflexively reaching for the newly-learned, freshly salient Product Rule on EVERY product-shaped expression, even ones that simplify trivially first, a common over-application pattern immediately following the introduction of any new technique (MC-3, PRODUCT-RULE-APPLIED-WHERE-SIMPLIFICATION-IS-SIMPLER).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its Protocol B repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational/Foundational/Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — DERIVATIVE-DISTRIBUTED-OVER-PRODUCT** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization — the IDENTICAL misconception already documented for `math.calc.derivative-rules`'s own MC-3 (DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS), now recurring as this concept's own primary target; the sum rule's genuine distributivity wrongly extended to products.
  - **Characteristic phrase**: $(fg)'=f'g'$.
  - **Detection probe** (verbatim, Blueprint's A01 MC-1 hook): "is $(fg)'$ the same as $f'g'$?" — directly revisiting the exact question `derivative-rules` left open.
  - **Repair**: Blueprint Repair Action B01 — re-walk Example 1's direct side-by-side contrast ($2x\sin x+x^2\cos x$ versus the wrong $2x\cos x$), re-anchoring on "TWO terms, always — one function's derivative times the other's original value, for BOTH orderings, added together."
  - **Verification of death**: given a fresh product of two non-simplifiable factors, the learner writes the correct two-term expression immediately, without proposing $f'g'$ even as a first guess.

- **MC-2 — PRODUCT-RULE-RESTRICTED-TO-EXACTLY-TWO-NAMED-FACTORS**
  - **Birth type**: Type 5, instruction-induced. Nearly every introductory worked example presents exactly two explicitly named functions in the textbook's own template, and no generalization to three-or-more factors is modeled until explicitly taught — the instructional presentation itself narrows the perceived scope.
  - **Characteristic phrase**: believing a product of three factors "can't use the Product Rule" because it doesn't match the two-named-function template.
  - **Detection probe** (verbatim, Blueprint's A03 MC-2 hook): "does the Product Rule only work when you have EXACTLY two functions, written exactly like the textbook formula?"
  - **Repair**: Blueprint Repair Action B02 — re-walk Example 3's grouping strategy: group extra factors into one "chunk," since the rule only ever needs two pieces at a time, however many factors are actually present.
  - **Verification of death**: given a fresh product of three or more factors, the learner groups two together as a single chunk and applies the rule, without treating the extra factor count as a barrier.

- **MC-3 — PRODUCT-RULE-APPLIED-WHERE-SIMPLIFICATION-IS-SIMPLER**
  - **Birth type**: Type 5, instruction-induced — a recency/salience effect: a rule JUST taught becomes the reflexive first tool reached for, even on expressions where a much simpler prior technique (direct simplification) already suffices.
  - **Characteristic phrase**: applying the full Product Rule to $(3x^2)(4x^5)$ instead of first multiplying to $12x^7$ and using the power rule directly.
  - **Detection probe** (verbatim, Blueprint's B03 P41): given $(2x^3)(5x^4)$, checking whether the student immediately reaches for the full Product Rule rather than simplifying first.
  - **Repair**: Blueprint Repair Action B03 — re-walk Example 2's both-methods comparison, confirming both give the identical answer, but re-anchoring on "check whether the product collapses into a single term first — it's not WRONG to use the Product Rule here, but it is more work than necessary."
  - **Verification of death**: given a fresh product of two power functions with combinable exponents, the learner simplifies first, reaching for the Product Rule only when simplification genuinely isn't available.

## Analogies
- **Best — two people building a wall together, one brick at a time.** The wall's total growth rate (the product's derivative) comes from EACH person's own contribution — how fast person A lays bricks TIMES how much wall person B has already built, PLUS how much wall A has already built TIMES how fast B lays bricks — genuinely two additive contributions, never a single multiplied rate.
- **Alternative — a Russian nesting doll for extra factors.** A product of three or more factors is handled by nesting: group the innermost two as one "doll," apply the rule to the outer pair, then open the inner doll and apply the rule again inside it — directly counters MC-2's two-factor-only restriction.
- **ANTI-ANALOGY — "the derivative of a product distributes just like the derivative of a sum."** This is the exact phrasing that licenses MC-1: sums and products are NOT symmetric under differentiation, and treating them as parallel operations is the trap. Say "sums distribute cleanly; products need their own, different rule" instead.

## Demonstrations
- **The two-term-versus-wrong-guess contrast.** Compute the Product Rule's genuine answer for $y=x^2\sin x$ ($2x\sin x+x^2\cos x$) beside the wrong guess $f'g'=2x\cos x$. *Predict whether they'll match before computing.* The mismatch (an entire missing term) is the demonstration for MC-1.
- **The three-factor grouping walkthrough.** Differentiate $y=x\cdot e^x\cdot\sin x$ by grouping the last two factors, applying the rule once, then applying it AGAIN inside the group. *Predict whether the rule can even be applied here first.* Successfully reaching an answer via grouping is the demonstration for MC-2.
- **The both-methods agreement.** Differentiate $(3x^2)(4x^5)$ via the full Product Rule AND via simplify-then-power-rule, confirming both give $84x^6$. *Predict which will take less work before computing both.* The identical answer via less effort is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the rule's own formula (it directly resolves an already-flagged open question from the prerequisite concept, rather than being independently derivable in a guided-discovery format at this level), but the simplify-first judgment (MC-3) is genuinely discoverable by comparing methods.
1. **Need** — "Differentiate $(3x^2)(4x^5)$ using the (just-learned) Product Rule. Now try multiplying the factors together first and differentiating THAT." Both work — but one is faster.
2. **Playground** — try a few more products, checking each time whether simplification is available before reaching for the Product Rule.
3. **Invention** — "When is it worth simplifying first, and when isn't it possible?" Let the learner articulate the distinction.
4. **Collision** — confront a learner who reflexively used the Product Rule everywhere with a case where simplification was clearly faster.
5. **Formalisation** — state explicitly: check for simplification first; use the Product Rule when the factors genuinely can't be combined.
6. **Compression** — "Can this product become one term? If yes, do that. If no, use the rule."

## Teaching Sequence
The correct rule (targeting MC-1) must be established FIRST and explicitly framed as resolving the prerequisite's own deferred question, per the Blueprint's own A01 — a learner who sees this concept as "finally answering the thing we flagged before" experiences the new rule as closing a genuine gap, not as an arbitrary new formula. The simplify-first judgment (MC-3) should follow immediately, using the SAME kind of product (two power functions) the learner has already practiced simplifying in `derivative-rules`, so the comparison lands on familiar ground. The three-or-more-factor extension (MC-2) is best introduced LAST, once the two-factor rule and the simplify-first judgment are both fluent — introducing grouping too early, before the base rule is solid, risks conflating "which two pieces do I group" with "do I even need the rule here" as one confused decision. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the two-term-versus-wrong-guess contrast on $y=x^2\sin x$, explicitly framed as resolving the deferred question from `derivative-rules`. First action; anchors the correct rule against its known wrong alternative.
- **TEST-THINKING: Prediction** — "Can $(3x^2)(4x^5)$ be simplified into one term before differentiating?" asked BEFORE applying either method. Surfaces MC-3 in one turn.
- **DO: Demonstration** — the three-factor grouping walkthrough, run with the learner identifying which two factors to group themselves.
- **TEST-THINKING: Error Analysis** — "A student computed $\frac{d}{dx}[x^4\sin x]$ as $4x^3\cos x$ (multiplying the two individual derivatives). What's wrong?" targets MC-1 directly.
- **Does NOT fit: introducing the Quotient Rule or Chain Rule before the simplify-first judgment (A02) is solid.** Those concepts own their own content explicitly; conflating them here would dilute this concept's own narrow, gap-closing scope.

## Voice Teaching Notes
The load-bearing sentence is "TWO terms, always — one derivative times the other's original value, both ways, added." Say it every time the Product Rule is applied, not just the first. Listen for a learner who, given a product, immediately multiplies the two individual derivatives without pausing — that fast, unhesitating single-term computation is the tell for MC-1. Listen for a learner who, given three factors, says "I don't think the rule applies here" or hesitates specifically about the factor COUNT rather than the algebra itself — that specific hesitation is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Computes $(fg)'$ as $f'g'$** — MC-1. Route to the two-term-versus-wrong-guess contrast, on the exact product in question.
- **Declines to apply the Product Rule to a product of three or more factors, citing the factor count** — MC-2. Route to the three-factor grouping walkthrough.
- **Reflexively applies the full Product Rule to an easily-simplifiable product** — MC-3. Route to the both-methods agreement, on the exact product in question.
- **Checks for simplification first, applies the correct two-term rule when genuinely needed, and groups extra factors fluently when there are more than two** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a time-varying kinetic-energy differentiation, explicitly requiring both a two-factor setup and a discussion of extending to three factors) must include at least one item on a genuinely non-simplifiable product — a gate made only of simplifiable products certifies MC-3's territory without certifying the rule's actual necessity case.

## Tutor Recovery Strategy
The likely utterance here is "why can't I just multiply the two derivatives together, like I do for sums?" — a reasonable question given how cleanly the sum rule behaves. The concept-specific smaller question returns to the wall-building analogy: **"If person A lays bricks twice as fast this hour, and person B has already built half the wall, does the WALL'S total growth rate depend on BOTH of those facts, or just A's speed?"** The learner recognizes it depends on both — A's speed matters relative to how much wall already exists, and vice versa — on ground they already own from the physical picture. Then return: "that's exactly why the Product Rule has TWO terms — each one captures one person's contribution, given where the other person currently stands." If the frustration is instead about the three-factor grouping feeling arbitrary, shrink to the bare check: **"Which two of these three factors can you glue together into one 'thing' first?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded judgment call** (the two-term rule and the grouping extension are procedures; deciding whether to simplify first is a judgment). Review by *presenting BOTH a genuinely non-simplifiable product AND an easily-simplifiable one in the same session*, since a review using only one type lets either MC-1's shortcut (on the non-simplifiable case) or MC-3's over-application (on the simplifiable case) pass undetected.
- Concept-specific deviation: keep at least one three-or-more-factor product permanently in the review rotation — a review that only ever presents two-factor products never re-exercises the grouping extension, and MC-2 regrows once two-factor fluency sets in.
- Interleaving partners: `math.calc.derivative-rules` (the discriminating partner — reviewing the sum rule's own genuine distributivity alongside this concept's product rule keeps the two properly distinguished) and the upcoming Quotient Rule and Chain Rule, which extend the same "resolve a flagged gap with a genuine new rule" pattern this concept establishes.

## Transfer Connections
- **Near**: the Quotient Rule (a direct sibling, handling division the way this concept handles multiplication) and the Chain Rule (handling composition), both extending the same "products/combinations of functions need their own genuine rule" theme.
- **Far**: the general Leibniz rule for the $n$th derivative of a product (met in more advanced treatments), which generalizes this concept's own two-term formula into a full binomial-coefficient expansion.
- **Real-world**: the Blueprint's own transfer probe — kinetic energy $E(t)=\frac12m(t)v(t)^2$ with both mass and velocity varying in time (a rocket burning fuel while accelerating) — is a direct, literal application, not a metaphor.
- **Expert transfer**: recognizing when a combination of two changing quantities requires accounting for BOTH quantities' own rates of change, weighted by the other's current value — the same structural pattern recurs in economics (marginal revenue from price times quantity, both varying) and any bilinear physical relationship.

## Cross-Subject Connections
- **Physics**, genuine and central: the Blueprint's own transfer probe (time-varying mass and velocity in kinetic energy) is a real physical computation, not illustrative fiction — rocket dynamics genuinely require exactly this rule.
- **Economics**, real: total revenue as price times quantity, both varying with time or with each other, differentiated via this exact rule to find marginal revenue.
- **Engineering**, real: power as force times velocity, both potentially time-varying, differentiated via the Product Rule in dynamic systems analysis.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the physics/economics connections, while genuine and central to this concept's own transfer probe, are applications rather than structural KG dependencies.

## Blueprint References
`docs/curriculum/blueprints/math.calc.product-rule.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the correct-rule contrast, Example 2 the simplify-first comparison, Example 3 the three-factor grouping), the Component 5 teaching actions (A01 P28 conflict evidence, A02 P06 contrast pair, A03 P11 representation shift, A04 P91 mastery gate at MAMR 5/5), the Component 6 Misconception Registry (MC-1..MC-3) and repair actions (B01–B03), the P77 four-item problem set, and the P76 independence-mode transfer probe (the time-varying kinetic-energy problem). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, the argued direct-instruction-for-the-rule / guided-discovery-for-the-simplify-judgment split, and the explicit cross-reference naming MC-1's mechanism as the identical misconception already documented for `math.calc.derivative-rules`'s own MC-3.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (none) and cross_links (none) match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38 — this batch's own fourth consecutive zero-discrepancy entry.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 40).
