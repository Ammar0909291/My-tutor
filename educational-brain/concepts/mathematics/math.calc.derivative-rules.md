# math.calc.derivative-rules

## Identity
- **KG ID**: `math.calc.derivative-rules`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-definition` — load-bearing part: the power rule and its siblings are DERIVED from the limit definition (this concept's A01 re-derives $d/dx(x^2)=2x$, $d/dx(x^3)=3x^2$ directly from $f'(x)=\lim_{h\to0}[f(x+h)-f(x)]/h$), not stated as arbitrary formulas.
- **Unlocks**: `math.calc.product-rule`, `math.calc.quotient-rule`, `math.calc.chain-rule` (each requires power-rule fluency and explicit awareness of this concept's own scope limits — products and compositions are exactly what these rules do NOT cover).
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.90
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.calc.derivative-rules.md` (reused by reference throughout)

## Learning Objective
- The learner can fluently apply the power rule $d/dx(x^n)=nx^{n-1}$ for any real constant $n$ (positive integer, zero, negative, fractional), the constant multiple rule $d/dx(cf)=cf'$, and the sum/difference rule $d/dx(f\pm g)=f'\pm g'$.
- The learner can rewrite radical and rational expressions as fractional/negative powers BEFORE differentiating, rather than attempting the power rule on the un-rewritten form.
- The learner can correctly identify when these rules do and do NOT apply — distinguishing power functions ($x^n$, variable base) from exponential functions ($a^x$, variable exponent), and recognizing that products of non-simplifiable factors need a rule this concept does not supply.

## Core Understanding
The power rule is not a formula to memorize — it is a PATTERN, visible the moment the limit definition is applied to $x^2$ and $x^3$: $d/dx(x^2)=2x$, $d/dx(x^3)=3x^2$, and the pattern ("bring the exponent down, reduce the power by one") generalizes to $d/dx(x^n)=nx^{n-1}$ for ANY constant $n$, integer or not. Two companion rules extend this to full expressions with no new derivation needed: the constant multiple rule $d/dx(cf)=c\cdot f'$ (the coefficient survives, multiplying the result — it does not vanish, and it does not become part of the exponent), and the sum/difference rule $d/dx(f\pm g)=f'\pm g'$ (differentiate term by term). The single most important SCOPE condition governing all of this: the power rule requires the BASE to be the variable and the EXPONENT to be a constant — $x^3$ qualifies, but $e^x$ and $2^x$ do NOT, since there the roles are reversed (constant base, variable exponent), and applying $nx^{n-1}$-style reasoning to them produces a formula that is simply wrong. A second scope limit: the sum rule's clean term-by-term behavior does NOT extend to products — $d/dx(f\cdot g)\ne f'\cdot g'$ — and when two power functions multiply, the correct move at this level is to SIMPLIFY the product into a single power first ($x^2\cdot x^3=x^5$, then differentiate), not to invent a distributive rule that does not exist.

## Mental Models
1. **Beginner — bring down the exponent, subtract one.** A mechanical recipe applied to $x^n$ terms. *Upgrade trigger*: an expression written as a radical or fraction ($\sqrt x$, $1/x^2$) that doesn't visibly have an exponent to "bring down" yet. *Shelf life*: about one lesson — the moment rewriting is required, the bare recipe alone is insufficient.
2. **Intermediate — rewrite first, then apply the rules.** Any radical or rational expression is first converted to power-of-$x$ form ($\sqrt x\to x^{1/2}$, $1/x^2\to x^{-2}$), and only then differentiated. *Upgrade trigger*: an expression built from $e^x$ or $a^x$, where rewriting doesn't help because the base, not the exponent, is the issue.
3. **Advanced — check the scope condition before applying any rule.** Ask explicitly: "is the base the variable, and the exponent a constant?" Only if yes does the power rule apply; products of non-simplifiable factors and compositions need rules this concept does not supply. *Upgrade trigger*: needing to differentiate a genuine product like $x^2\cdot e^x$ or $x^2\cdot\sin(x)$, which requires the (not-yet-available) product rule.
4. **Expert — these are the base cases of a linear differentiation operator on the vector space of power-function combinations.** $d/dx$ is linear (constant multiple + sum rule = linearity), and the power rule supplies its action on the basis elements $x^n$; product, quotient, and chain rules extend the SAME operator to a wider function class. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a category error licensed by surface similarity: $e^x$ and $x^3$ both "look like" powers, but in $x^3$ the variable is the BASE and the exponent is fixed, while in $e^x$ the variable is the EXPONENT and the base is fixed — applying $nx^{n-1}$-style reasoning to $e^x$ (giving the false $xe^{x-1}$) is an overgeneralization of a rule past the exact structural condition that makes it valid (MC-1, POWER-RULE-FOR-EXPONENTIAL). A second failure is a scope confusion between two superficially similar rules: $d/dx(c)=0$ (a bare constant vanishes) is easily conflated with $d/dx(cf(x))$ (a constant MULTIPLYING a variable expression), so a learner correctly recalling "constants disappear under differentiation" wrongly drops the coefficient $3$ in $d/dx(3x^2)$ rather than carrying it through as a multiplier (MC-2, COEFFICIENT-MULTIPLICATION-OMITTED). The third failure extends the sum rule's genuine term-by-term behavior to products, where it does not hold — $d/dx(f\cdot g)\ne f'\cdot g'$, a distributive-looking shortcut that happens to be false, verifiable numerically the moment it is tested against a case where $f\cdot g$ can be independently simplified (MC-3, DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 5 repair actions B-MC1–B-MC3. **The Blueprint's Misconception Registry carries no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — POWER-RULE-FOR-EXPONENTIAL** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. The power rule's SURFACE pattern (a base raised to a power) is extended past its structural precondition (variable base, constant exponent) to a case where the roles are reversed (constant base, variable exponent).
  - **Characteristic phrase**: $d/dx(e^x)=xe^{x-1}$ or $d/dx(2^x)=x\cdot2^{x-1}$.
  - **Detection probe** (verbatim, Blueprint's A03 P49 item ii / B-MC1 P41): "Apply the proposed rule $d/dx(e^x)=xe^{x-1}$ and check it at $x=1$" against the true value from the limit definition.
  - **Repair**: Blueprint Repair Action B-MC1 — the two-question scope check, "is the base the variable? Is the exponent a constant?"; if either answer is no, the power rule does not apply, full stop.
  - **Verification of death**: given a mixed expression containing both a power term and $e^x$ or $a^x$, the learner differentiates the power term with the power rule and explicitly flags the exponential term as needing a different (not-yet-available) rule, rather than applying the power rule to both.

- **MC-2 — COEFFICIENT-MULTIPLICATION-OMITTED**
  - **Birth type**: Type 1, overgeneralization — specifically, over-applying $d/dx(c)=0$ (constants vanish) to a coefficient that MULTIPLIES a variable expression rather than standing alone, a scope confusion between two rules that share the word "constant."
  - **Characteristic phrase**: $d/dx(3x^2)=2x$.
  - **Detection probe** (verbatim, Blueprint's B-MC2 P41): numerically verify $f(x)=3x^2$'s slope at $x=2$ against the proposed answer $2x=4$ versus the correct $6x=12$.
  - **Repair**: Blueprint Repair Action B-MC2 — think of $3x^2$ as $3\cdot(x^2)$, a fixed vertical stretch by $3$; stretching the function by $3$ stretches its rate of change by $3$ too, so the coefficient multiplies the derivative rather than vanishing.
  - **Verification of death**: given a fresh coefficient-bearing power term, the learner carries the coefficient through as a multiplier without being prompted.

- **MC-3 — DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS**
  - **Birth type**: Type 1, overgeneralization of the sum rule's genuine term-by-term distributivity ($d/dx(f+g)=f'+g'$) into multiplication, where the analogous distributive-looking rule $d/dx(f\cdot g)=f'\cdot g'$ is simply false.
  - **Characteristic phrase**: $d/dx(x^2\cdot x^3)=2x\cdot3x^2$ (instead of simplifying to $x^5$ first, giving $5x^4$).
  - **Detection probe** (verbatim, Blueprint's B-MC3 P41): compare $d/dx(x^2)\cdot d/dx(x^3)=2x\cdot3x^2=6x^3$ against the correct $d/dx(x^5)=5x^4$, numerically at $x=2$: $48$ versus $80$.
  - **Repair**: Blueprint Repair Action B-MC3 — when both factors are power functions of $x$, combine them into a single power FIRST (using $x^a\cdot x^b=x^{a+b}$), then differentiate; the sum rule's linearity is a special property that does not extend to products, and the genuine fix for non-simplifiable products (the Product Rule) is a future concept.
  - **Verification of death**: given a fresh product of two power functions, the learner combines them into a single power before differentiating, without being prompted.

## Analogies
- **Best — a vertical stretch scales the slope by the same factor.** Stretching $x^2$ vertically by $3$ (giving $3x^2$) stretches every tangent slope by $3$ too — the coefficient survives into the derivative exactly because it survives into the function's own shape (directly counters MC-2).
- **Alternative — the power rule's two-question checklist as a gate, not a formula.** "Is the base the variable? Is the exponent a constant?" is a YES/NO gate that must be passed before the formula is even attempted — treating it as a gate, rather than a formula to apply everywhere, is what prevents MC-1.
- **ANTI-ANALOGY — "the power rule works on anything with an exponent."** This is the exact phrasing that licenses MC-1: $e^x$ and $2^x$ both visually "have an exponent," but the exponent there is the VARIABLE, not a fixed number. Say "the power rule needs a FIXED exponent — check which part is changing" instead.

## Demonstrations
- **The numerical-slope check for the dropped coefficient.** Compute $f(2)$ and $f(2.001)$ for $f(x)=3x^2$ directly, estimate the slope, and compare against both $2x=4$ and $6x=12$ at $x=2$. *Predict which matches before computing.* The numerical match with $12$, not $4$, is the demonstration for MC-2.
- **The product-vs-simplify-first contrast.** Compute $d/dx(x^2)\cdot d/dx(x^3)$ and $d/dx(x^2\cdot x^3)$ side by side, numerically at $x=2$ ($48$ vs. $80$). *Predict whether they'll match first.* The mismatch is the demonstration for MC-3.
- **The limit-definition check on the proposed exponential rule.** Apply the FALSE proposed rule $d/dx(e^x)=xe^{x-1}$ at $x=1$ (giving $1$) against the true value from the definition ($e\approx2.718$). The numeric gap is the demonstration for MC-1.

## Discovery Questions
Guided discovery is used for deriving the power rule itself — a learner can compute $d/dx(x^2)$ and $d/dx(x^3)$ from the definition (already familiar from `math.calc.derivative-definition`) and notice the pattern directly; the scope conditions (constant-exponent, non-product) are stated directly, as they are conventions about rule applicability rather than derivable facts.
1. **Need** — "Compute $f'(x)$ for $f(x)=x^2$ and $f(x)=x^3$ using the limit definition you already know." Two answers: $2x$, $3x^2$.
2. **Playground** — compute $d/dx(x^4)$ the same way (or predict it) and check the prediction against the definition.
3. **Invention** — "What's the pattern connecting $x^n$ to its derivative?" Let the learner state it in their own words before naming it.
4. **Collision** — ask "does this pattern work for $e^x$ too?" and check the proposed answer against the limit definition directly.
5. **Formalisation** — state the power rule precisely, with its scope condition (constant exponent, variable base).
6. **Compression** — "Bring the exponent down, reduce the power by one — but only when the base is the variable and the exponent is fixed."

## Teaching Sequence
The power rule must be DERIVED from the limit definition (A01) before it is stated as a formula — a learner who only ever sees $nx^{n-1}$ asserted has no felt reason to check the scope condition later, since the rule reads as an arbitrary fact rather than a consequence of a specific algebraic structure. The rewrite-first discipline (targeting radical/rational expressions in A02) should be modeled as a MANDATORY visible step, not an optional shortcut, per the Blueprint's own Teaching Notes — skipping it is exactly how sign errors on $d/dx(1/x)$ and reduce-power errors on $d/dx(\sqrt x)$ arise. The scope-limits contrast (A03, power vs. exponential; sum vs. product) should come LAST, once the learner is fluent with the rules themselves, so the boundary reads as "here's where this powerful tool stops," not "here's another exception to memorize before you've even used the tool." Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the power-rule derivation for $x^2$ and $x^3$ from the limit definition, run with the learner computing the algebra themselves. First action; anchors "discovered, not memorized."
- **DO: Worked Example** — WE2's rewrite-first procedure ($\sqrt x+3/x^2\to x^{1/2}+3x^{-2}$), modeled with the rewriting step made explicit and visible.
- **TEST-THINKING: Prediction** — "Will $d/dx(x^2)\cdot d/dx(x^3)$ equal $d/dx(x^2\cdot x^3)$?" asked BEFORE computing either side. Surfaces MC-3 in one turn.
- **TEST-THINKING: Error Analysis** — "A student wrote $d/dx(e^x)=xe^{x-1}$. What's wrong?" targets MC-1 directly, using the numerical check as the resolution.
- **Does NOT fit: introducing the product/quotient/chain rules before the scope-limits contrast (A03) is solid.** Those concepts own that content explicitly; introducing them early removes the motivation for A03's "simplify first" discipline.

## Voice Teaching Notes
The load-bearing sentence is "check first: is the base the variable, and the exponent a fixed number?" Say it every time a new differentiation target is introduced, not just the first. Listen for a learner reaching immediately for $nx^{n-1}$-style reasoning on an expression containing $e$ or a numeric base raised to $x$ — fast, unhesitating application there, more than a careful pause to check, is the tell that MC-1 is operating as a reflex. Listen for a dropped coefficient spoken aloud ("the derivative of $3x^2$ is $2x$") without any verbal acknowledgment of the $3$ — the silence around the coefficient is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Applies $nx^{n-1}$-style reasoning to $e^x$ or $a^x$** — MC-1. Route to the limit-definition numerical check, on the exact exponential expression in question.
- **Drops a leading coefficient when differentiating $cf(x)$** — MC-2. Route to the numerical-slope check, never to a bare restatement of the constant multiple rule.
- **Multiplies the derivatives of two factors instead of simplifying the product first** — MC-3. Route to the product-vs-simplify-first contrast, on the exact product in question.
- **Rewrites radicals/rationals to power form before differentiating, checks the base/exponent scope condition before applying the power rule, and simplifies products before differentiating** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.90×5⌉ — the highest MAMR bar in this campaign's math.calc entries so far, reflecting this concept's high-stakes downstream role). The 4-item P77 set plus the P76 independence-mode transfer probe (a projectile-motion velocity problem including an explicit power-vs-exponential discrimination item) must include at least one item testing the base/exponent scope condition explicitly — a gate made only of clean polynomial differentiation certifies fluency without certifying the scope awareness the concept's own bloom=apply/mastery_threshold=0.9 demand.

## Tutor Recovery Strategy
The likely utterance here is "but $e^x$ has an exponent too — why doesn't the power rule work on it?" — a reasonable question given the surface resemblance. The concept-specific smaller question drops the calculus and asks about the STRUCTURE: **"In $x^3$, which part is the letter and which part is the fixed number? Now look at $e^x$ — which part is the letter there?"** The learner correctly identifies that the roles have swapped (base vs. exponent), on ground they already own from reading the expressions. Then return: "the power rule only works when the VARIABLE is the base — here it's the exponent, so a different rule is needed." If the frustration is instead about the dropped-coefficient error recurring, shrink to the bare check: **"If I stretch a photo to be 3 times taller, does every slope in the photo also get 3 times steeper, or does it stay the same?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded scope check** (the power/constant-multiple/sum rules are procedures; recognizing when they do NOT apply is a conceptual judgment). Review by *differentiating a MIXED set including at least one exponential-shaped distractor*, not a pure power-function set, since a pure power-function review lets MC-1's shortcut pass undetected.
- Concept-specific deviation: keep at least one un-simplified product of power functions permanently in the review rotation — a review that only ever presents already-simplified expressions never re-exercises the simplify-first discipline, and MC-3 regrows once fluency in the basic rules sets in.
- Interleaving partners: `math.calc.derivative-definition` (the discriminating partner for MC-1 — the limit-definition numerical check is the ultimate arbiter whenever a proposed rule is in doubt) and the upcoming `math.calc.product-rule`, which this concept's own A03 explicitly previews as the genuine fix for non-simplifiable products.

## Transfer Connections
- **Near**: `math.calc.product-rule`, `math.calc.quotient-rule`, `math.calc.chain-rule` — each extends the SAME linear-operator idea (constant multiple + sum rule = linearity) to a wider function class this concept's own scope limits explicitly flag as uncovered.
- **Far**: exponential and trigonometric differentiation rules (met later), which are the genuine fix for MC-1's territory — $d/dx(e^x)=e^x$, $d/dx(a^x)=a^x\ln a$ — deliberately deferred beyond this concept's scope.
- **Real-world**: any rate-of-change computation from a power-law model — projectile height, area/volume scaling, power-law growth in biology or economics — computed directly from these rules.
- **Expert transfer**: recognizing an operator's DOMAIN of validity before applying it — the same discipline recurs whenever a formula (a Taylor series, a numerical method, a physical law) has a stated range of applicability that a superficially similar-looking case falls outside of.

## Cross-Subject Connections
- **Physics**, genuine and central: the projectile-motion transfer probe (velocity from a power-law height function) is not a metaphor — it is the literal computation a physics course performs using exactly these rules.
- **Engineering**, real: power-law scaling laws (stress vs. dimension, drag vs. velocity) differentiated directly with these rules to find rates of change.
- **Economics**, real: marginal cost/revenue from a polynomial cost/revenue function, computed term-by-term exactly as in this concept's worked examples.
- The KG records `cross_links: []`. No cross-subject connection here is strong enough to warrant a standing curriculum omission finding — the physics connection, while genuine, is a general application of the rules rather than a structural dependency this concept's own content requires.

## Blueprint References
`docs/curriculum/blueprints/math.calc.derivative-rules.md`. Reused by reference, not restated: the Component 1 Cognitive Map, the Component 2 Misconception Registry (MC-1..MC-3), the Component 4 teaching actions (A01 P11 the definition-to-pattern derivation, A02 P07 the polynomial and radical/rational worked-example pair, A03 P06 the power-vs-exponential and sum-vs-product contrast, A04 P91 mastery gate at MAMR 5/5), the P77 four-item problem set, and the P76 independence-mode transfer probe (projectile motion). This entry adds independent birth-type classification for all three misconceptions (the Blueprint carries no explicit birth-type column), the mental-model ladder, the anti-analogy, the argued guided-discovery-for-the-power-rule / direct-statement-for-the-scope-conditions split, and the ordering constraint placing derivation before rewrite-discipline before scope-limits.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.product-rule`, `math.calc.quotient-rule`, `math.calc.chain-rule`) and empty cross_links match the live KG's own fields exactly, confirmed by direct query against `docs/mathematics/kg/graph.json`.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 39).
