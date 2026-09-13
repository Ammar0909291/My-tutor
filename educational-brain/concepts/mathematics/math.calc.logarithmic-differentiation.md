# math.calc.logarithmic-differentiation

## Identity
- **KG ID**: `math.calc.logarithmic-differentiation`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-ln` — load-bearing part: this concept directly reuses that concept's own LO3 (the logarithmic-differentiation technique previewed there), now practiced as a complete, standalone procedure.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.calc.logarithmic-differentiation.md` (reused by reference throughout)

## Learning Objective
- The learner can recognize when logarithmic differentiation is REQUIRED — specifically for variable-base-AND-variable-exponent forms like $y=x^{\sin x}$, where neither the power rule nor the exponential-derivative rule applies directly.
- The learner can execute the full procedure: take $\ln$ of both sides, expand via log rules, differentiate implicitly (since $\frac{d}{dx}\ln y=\frac{1}{y}y'$), solve for $y'$, and substitute the ORIGINAL expression back in for $y$.
- The learner recognizes the final back-substitution step as essential, never leaving the answer expressed in terms of $y$ instead of $x$.

## Core Understanding
Logarithmic differentiation is required specifically for expressions where BOTH the base AND the exponent are functions of $x$ simultaneously, like $y=x^{\sin x}$ — here, neither the power rule (which needs a CONSTANT exponent) nor `math.calc.derivative-exponential`'s own rule (which needs a CONSTANT base) applies directly, since neither rule's precondition is satisfied. The procedure resolves this by first taking $\ln$ of BOTH sides, converting the troublesome variable exponent into a coefficient via the log rule $\ln(u^v)=v\ln u$; differentiating implicitly (since $y$ is itself a function of $x$, $\frac{d}{dx}\ln y=\frac{1}{y}\cdot y'$ by the chain rule — exactly `math.calc.implicit-differentiation`'s own machinery); solving algebraically for $y'$; and finally SUBSTITUTING the original expression back in for $y$, since the intermediate label $y$ was only ever a convenience during the implicit-differentiation step, and the final derivative must be expressed purely in terms of $x$. The technique has a SECOND, distinct use case beyond variable exponents: taking logs first also simplifies complicated products, quotients, and powers by converting them into sums, differences, and constant multiples — a genuine dual utility, not two unrelated tricks that happen to share a name.

## Mental Models
1. **Beginner — "take $\ln$ of both sides, differentiate, solve for $y'$."** A mechanical recipe applied without yet distinguishing WHEN it's genuinely necessary versus when a simpler rule would work. *Upgrade trigger*: applying the technique to a case where the exponent is actually constant, taking far more steps than the direct power rule would require.
2. **Intermediate — "logarithmic differentiation is needed specifically when BOTH the base and exponent vary with $x$ — check this before reaching for the technique."** The applicability condition is now explicit, avoiding needless overuse. *Upgrade trigger*: forgetting the final substitution step, leaving the answer expressed in terms of $y$ rather than $x$.
3. **Advanced — "the procedure ends with substituting the ORIGINAL expression back in for $y$ — $y$ was never the target variable, just a convenient label during the implicit-differentiation step."** The full five-step procedure (log, expand, differentiate implicitly, solve, substitute back) is now complete and fluent. *Upgrade trigger*: recognizing the technique's second use case, for complicated products/quotients/powers, distinct from the variable-exponent motivation.
4. **Expert — recognizing logarithmic differentiation as a general REPRESENTATION-SHIFT strategy (convert a multiplicative structure into an additive one via logs, then use implicit differentiation), applicable both to variable-exponent forms and to structurally complicated products/quotients.** The learner chooses the technique strategically, not merely when explicitly told the exponent is variable. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a straightforward overgeneralization of the technique's own power: having learned a genuinely versatile new tool, a learner applies it even to SIMPLE constant-exponent cases where the ordinary power rule would suffice far more directly, without first checking whether the exponent genuinely depends on $x$ — mistaking a powerful special-purpose technique for a universal substitute for simpler, already-known rules (MC-1, LOGARITHMIC-DIFFERENTIATION-USED-UNNECESSARILY-FOR-A-CONSTANT-EXPONENT-CASE). A second, distinct failure echoes the same "additional completion step is easy to skip" mechanism already documented for `math.calc.implicit-differentiation`'s own MC-2: because every earlier differentiation task ended the moment the derivative was symbolically found, a learner solves for $y'$ correctly but stops there, leaving the final answer expressed in terms of the intermediate label $y$ rather than substituting the original expression for $y$ back in — an incomplete derivative, since $y'$ must ultimately be a function of $x$ alone (MC-2, FINAL-SUBSTITUTION-STEP-OMITTED-LEAVING-THE-ANSWER-IN-TERMS-OF-Y).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (Moderate, Foundational) but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — LOGARITHMIC-DIFFERENTIATION-USED-UNNECESSARILY-FOR-A-CONSTANT-EXPONENT-CASE** (the Blueprint's own "Moderate" severity misconception — typically still produces a correct, if needlessly roundabout, result)
  - **Birth type**: Type 1, overgeneralization of the technique's genuine power (handling variable exponents) into a universal substitute for simpler rules, applied even where the exponent is constant.
  - **Characteristic phrase**: applying the full log-both-sides procedure to $y=x^5$ (a constant exponent), rather than the direct power rule.
  - **Detection probe** (Blueprint's B01 P41): present Example 1 and check whether logarithmic differentiation is (unnecessarily) applied to the constant-exponent case.
  - **Repair**: Blueprint Repair Action B01 — explicitly examine the exponent FIRST, confirming whether it genuinely depends on $x$, before choosing a differentiation technique at all.
  - **Verification of death**: given a fresh expression, the learner states explicitly whether the exponent is constant or variable BEFORE choosing between the power rule and logarithmic differentiation.

- **MC-2 — FINAL-SUBSTITUTION-STEP-OMITTED-LEAVING-THE-ANSWER-IN-TERMS-OF-Y** (the Blueprint's own "Foundational" misconception — an incomplete final answer fails the basic requirement of a derivative expressed in the independent variable)
  - **Birth type**: Type 5, instruction-induced — the identical mechanism already documented for `math.calc.implicit-differentiation`'s own MC-2 (DY-DX-TERMS-NOT-COLLECTED-AND-ISOLATED): every SIMPLER differentiation task ends the moment the derivative is symbolically found, so the genuinely NEW requirement (substitute the intermediate label back to the original expression) is easy to treat as optional, since no prior context ever demanded it.
  - **Characteristic phrase**: reporting $y'=y\left(\cos x\ln x+\frac{\sin x}{x}\right)$ as the final answer, without substituting $y=x^{\sin x}$ back in.
  - **Detection probe** (Blueprint's B02 P41): present Example 2 and check whether the final substitution is performed.
  - **Repair**: Blueprint Repair Action B02 — re-identify the original expression for $y$ explicitly and substitute it into the solved-for $y'$, treating this as a mandatory, non-optional final step.
  - **Verification of death**: given a fresh problem, the learner's final answer is expressed entirely in terms of $x$, with no lingering $y$ symbol, without prompting.

## Analogies
- **Best — using a translator to have a conversation, then translating the conclusion back into your own language before reporting it.** Taking $\ln$ of both sides is the "translation" into a more tractable language (sums instead of products, coefficients instead of exponents); the final substitution is translating the CONCLUSION back into the original language ($x$-terms), which is not optional if the answer needs to be usable by someone who doesn't speak the intermediate language.
- **Alternative — a specialized tool reserved for a specific job, not a universal replacement for simpler tools.** A power drill is powerful, but a simple screwdriver is still the right choice for a single screw — logarithmic differentiation is the "power tool" reserved for genuinely variable-base-and-exponent cases, not a wholesale replacement for the power rule.
- **ANTI-ANALOGY — "logarithmic differentiation is the modern, better way to differentiate any exponential-looking expression."** This vague phrasing licenses MC-1 directly, implying universal superiority. Say "logarithmic differentiation solves a SPECIFIC problem (variable base AND exponent together) that no simpler rule can — for everything else, the simpler rule is still the right, faster choice" instead.

## Demonstrations
- **The unnecessary-detour comparison.** Differentiate $y=x^5$ via the direct power rule ($y'=5x^4$, one line) side by side with the full logarithmic-differentiation procedure applied to the SAME function. *Predict which will take fewer steps before doing both.* Getting the identical answer via a visibly longer route with logarithmic differentiation is the demonstration for MC-1.
- **The stuck-in-terms-of-y reveal.** Solve $y'=y\left(\cos x\ln x+\frac{\sin x}{x}\right)$ for $y=x^{\sin x}$ and ask "is this the final answer?" *Predict whether this expression, as written, is usable as a standalone derivative before substituting.* Realizing $y$ is not itself a known function of $x$ in this form (it's a placeholder) is the demonstration for MC-2.
- **The dual-use reveal.** Apply logarithmic differentiation to a genuinely complicated product/quotient expression (no variable exponent at all) and confirm it still simplifies the differentiation, connecting back to `math.calc.derivative-ln`'s own LO3 preview.

## Discovery Questions
Direct instruction is the argued call for the full procedure itself (it is a specific, multi-step technique that benefits from explicit walkthrough), but the applicability condition (MC-1) and the necessity of the final substitution (MC-2) are both genuinely discoverable by direct comparison.
1. **Need** — "Could you differentiate $y=x^5$ using the power rule directly? Now try logarithmic differentiation on the same function — which was faster?" The learner discovers the power rule wins decisively.
2. **Playground** — try the same speed comparison on one or two more constant-exponent functions.
3. **Invention** — "For which kinds of expressions would the power rule NOT work at all?" Let the learner connect it to both the base and exponent varying simultaneously.
4. **Collision** — confront a learner who applied logarithmic differentiation to a simple case with the direct step-count comparison.
5. **Formalisation** — state the applicability condition explicitly: use logarithmic differentiation only when the ordinary power rule and exponential rule both fail.
6. **Compression** — "Both base and exponent vary — log first, differentiate, solve, then substitute $y$ back."

## Teaching Sequence
The applicability check (MC-1) must be established FIRST, per the Blueprint's own A01, since introducing the full procedure before establishing WHEN it's needed risks the learner applying it indiscriminately from the very first example. The final-substitution discipline (MC-2) follows directly, per the Blueprint's own A02, using the full worked derivation as the vehicle. The technique's second use case (complicated products/quotients, not variable exponents) is introduced LAST, per the Blueprint's own A03, since it is a genuine extension of the SAME mechanical procedure to a different motivating context, best appreciated once the core mechanics and completion discipline are both fluent. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the unnecessary-detour comparison (power rule versus logarithmic differentiation on $y=x^5$), with the learner predicting which route is faster BEFORE doing either. First action; anchors the applicability check concretely.
- **TEST-THINKING: Prediction** — "Does BOTH the base and the exponent of this expression depend on $x$?" asked on a fresh expression, BEFORE choosing a differentiation technique. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the stuck-in-terms-of-y reveal, run with the learner attempting to state the derivative's numerical value at a specific $x$ using only the $y$-expression, discovering it's unusable without substitution.
- **TEST-THINKING: Error Analysis** — "A student solved for $y'$ and reported $y'=y\left(\cos x\ln x+\frac{\sin x}{x}\right)$ as their final answer. What's missing?" targets MC-2 directly.
- **Does NOT fit: re-deriving the basic $\frac{d}{dx}\ln x=1/x$ rule or the implicit-differentiation machinery from scratch here.** Both are already-mastered prerequisites (`math.calc.derivative-ln`, `math.calc.implicit-differentiation`); this concept assumes and reuses them.

## Voice Teaching Notes
The load-bearing sentence is "both base and exponent varying — log first, differentiate, solve, then substitute $y$ back to $x$." Say it every time a new logarithmic-differentiation problem is set up, not just the first. Listen for a learner who reaches for logarithmic differentiation immediately, without first checking whether the exponent is constant — that reflexive overuse is the tell for MC-1. Listen for a learner who states "$y'=y(\ldots)$" and calls it done — that premature stopping point is the tell for MC-2, echoing the identical tell already documented for `math.calc.implicit-differentiation`'s own MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Applies logarithmic differentiation to a constant-exponent case where the power rule would suffice** — MC-1. Route to the unnecessary-detour comparison, on the exact function in question.
- **Leaves the final answer expressed in terms of $y$ rather than substituting the original expression back in** — MC-2. Route to the stuck-in-terms-of-y reveal, on the exact problem in question.
- **Correctly diagnoses when the technique is needed and completes the final substitution** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.75×5⌉). The 4-item P77 set (including one item explicitly requiring the learner to JUSTIFY whether the technique is needed) plus the P76 independence-mode transfer probe (a financial compound-growth model with an unusual time-scaled exponent, $A(t)=P\cdot t^{rt}$) must include at least one item requiring the learner to explain WHY neither simpler rule applies, not merely execute the mechanics — a gate made only of correct-computation items risks certifying procedure-following without certifying the underlying applicability judgment against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "wait, my answer still has a $y$ in it — is that OK?" — a reasonable moment of noticing something feels unfinished. The concept-specific smaller question returns to the concrete substitution itself: **"What does $y$ actually EQUAL, in terms of $x$? Write that expression down, then replace $y$ with it everywhere it appears."** The learner performs the substitution themselves on their own solved-for expression. Then return: "$y$ was just a shorthand label while we worked through implicit differentiation — the final answer always needs to be in terms of $x$ alone." If the frustration is instead about when to use the technique at all, shrink to the bare check: **"Is the EXPONENT here a fixed number, or does it contain an $x$?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded applicability gate plus one completion-discipline requirement** (checking whether the technique is needed at all is a genuine go/no-go decision, distinct from the mandatory final-substitution completion step). Review by *requiring the learner to state, before starting, whether BOTH the base and exponent depend on $x$*, and *requiring the final answer to be checked for any lingering $y$ symbol before it is accepted as complete*.
- Concept-specific deviation: keep at least one problem in the review rotation that is a genuine PRODUCT/QUOTIENT case rather than a variable-exponent case, since testing only variable-exponent examples lets a learner's understanding of the technique's SECOND use case (simplifying complicated products) atrophy unnoticed.
- Interleaving partners: `math.calc.derivative-ln` (the direct prerequisite whose own LO3 preview this concept fully develops) and `math.calc.implicit-differentiation` (the discriminating partner for MC-2, since the final-substitution discipline mirrors that concept's own collect-and-isolate completion requirement).

## Transfer Connections
- **Near**: `math.calc.derivative-ln` (the direct prerequisite, whose LO3 this concept develops into a complete standalone procedure) and `math.calc.implicit-differentiation` (the machinery this concept's "differentiate $\ln y$" step directly reuses).
- **Far**: statistical maximum-likelihood estimation, where log-likelihood functions are routinely differentiated using this exact "take logs first" strategy to simplify products of probabilities into sums.
- **Real-world**: the Blueprint's own transfer probe — a financial model with a time-scaled compounding exponent — is a direct, literal finance application where the technique's necessity is genuinely motivated.
- **Expert transfer**: recognizing "take logs first" as a general representation-shift strategy that converts multiplicative complexity into additive simplicity — the same strategic move recurs whenever a problem's structure (products, quotients, variable powers) resists direct manipulation but yields readily under a logarithmic transformation.

## Cross-Subject Connections
- **Finance/economics**, real: the Blueprint's own transfer probe (a time-scaled compound-growth model) is a standard, literal application of logarithmic differentiation in financial modeling.
- **Statistics**, real: maximum-likelihood estimation routinely differentiates log-likelihood functions, using this exact "take logs first" strategy to convert a product of probabilities into a tractable sum.
- **Physics/engineering**, real: expressions combining multiple multiplied and divided physical quantities raised to various powers (common in dimensional-analysis-heavy formulas) are frequently differentiated via this technique.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the finance connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.logarithmic-differentiation.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the applicability contrast breaking MC-1, Example 2 the full procedure breaking MC-2, Example 3 the product/quotient dual-use case), the Component 5 Teaching Actions (A01 P06 contrast pair, A02 P64 conceptual shift, A03 reused procedure, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the time-scaled compound-growth model). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and explicitly cross-references MC-2 to `math.calc.implicit-differentiation`'s own MC-2 as the identical "skip the new completion step" mechanism.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.derivative-ln`), unlocks (none), cross_links (none), difficulty, bloom, mastery_threshold (0.75), and estimated_hours (3) all match the live KG's own fields exactly, confirmed by direct query. This is the first of four zero-discrepancy concepts in this batch, continuing the fresh streak begun in Batch 43.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 44).
