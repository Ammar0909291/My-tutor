# math.calc.derivative-ln

## Identity
- **KG ID**: `math.calc.derivative-ln`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.chain-rule` — load-bearing part: whenever the logarithm's argument is a function of $x$ rather than plain $x$, the derivative requires the Chain Rule's outer-inner structure.
  - `math.func.logarithmic-function` — load-bearing part: the concept being differentiated is the already-established logarithmic function class, including the base-change relationship.
- **Unlocks**: none in the KG (the Blueprint notes a genuinely uncounted child, `math.calc.logarithmic-differentiation`, which builds directly on this concept's own LO3 but is not itself listed in the KG's `unlocks` field for this concept).
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.derivative-ln.md` (reused by reference throughout)

## Learning Objective
- The learner can state $\frac{d}{dx}\ln x=\frac{1}{x}$ (for $x>0$) and the general-base rule $\frac{d}{dx}\log_a x=\frac{1}{x\ln a}$, recognizing $\ln x$ as the special case where $\ln a=\ln e=1$.
- The learner can apply the Chain Rule when the logarithm's argument is a function of $x$: $\frac{d}{dx}\ln(g(x))=\frac{g'(x)}{g(x)}$ — never simply $\frac{1}{g(x)}$, which omits the required chain-rule factor.
- The learner can recognize logarithmic differentiation as a technique for simplifying products, quotients, and variable powers by taking $\ln$ of both sides first, then differentiating implicitly.

## Core Understanding
The natural logarithm's derivative, $\frac{d}{dx}\ln x=\frac{1}{x}$ (for $x>0$), extends to a general base as $\frac{d}{dx}\log_a x=\frac{1}{x\ln a}$ — the SAME base-$e$-exception structure already established for `math.calc.derivative-exponential`, where the natural log is the special case where $a=e$ makes $\ln a=1$, recovering the simpler $1/x$. When the logarithm's ARGUMENT is a function of $x$ rather than bare $x$, the Chain Rule applies: $\frac{d}{dx}\ln(g(x))=\frac{1}{g(x)}\cdot g'(x)=\frac{g'(x)}{g(x)}$ — the reciprocal of the inside function, multiplied by the inside function's own derivative, exactly the same required second factor already established for the Chain Rule generally. A distinct and powerful technique built on this rule is **logarithmic differentiation**: for an expression too complicated to differentiate directly (a product, quotient, or an expression raised to a VARIABLE power, like $x^x$), taking $\ln$ of BOTH sides first converts products into sums, quotients into differences, and powers into products — via the standard log rules — making the resulting expression tractable to differentiate implicitly, before solving back for the original derivative.

## Mental Models
1. **Beginner — "$\ln x$'s derivative is $1/x$; other log bases need an extra $\ln a$ in the denominator."** Two separate rules memorized, mirroring the exponential case's own beginner model. *Upgrade trigger*: needing to differentiate a logarithm whose argument is a function of $x$, not bare $x$.
2. **Intermediate — "$\frac{d}{dx}\log_a x=\frac{1}{x\ln a}$ is the GENERAL rule; $\ln x$ is the special case where $a=e$."** The connection to `math.calc.derivative-exponential`'s own base-exception structure is now explicit. *Upgrade trigger*: encountering an expression too complicated to differentiate with the ordinary product/quotient/power rules directly (a variable power, like $x^x$).
3. **Advanced — "taking $\ln$ of both sides converts products/quotients/powers into sums/differences/products, making otherwise-intractable expressions differentiable via implicit differentiation."** Logarithmic differentiation is now recognized as a genuine representation-shift technique, not merely an application of the basic log-derivative rule. *Upgrade trigger*: needing to justify WHY this technique works, rather than merely execute it.
4. **Expert — recognizing $\ln x$'s derivative, the general-base rule, the Chain Rule extension, and logarithmic differentiation as ONE coherent family, all flowing from $\frac{d}{dx}\ln x=\frac{1}{x}$ combined with the log-rule algebra and implicit differentiation.** The learner moves fluently between direct differentiation and logarithmic differentiation, choosing whichever is more efficient for a given expression. *Shelf life*: permanent.

## Why Students Fail
The dominant failure directly mirrors `math.calc.derivative-exponential`'s own MC-1: having learned that $\ln x$'s derivative is the simple $1/x$, a learner applies that same simplicity to every logarithm base, omitting the $\ln a$ factor that every base other than $e$ genuinely requires — an overgeneralization of a special-case simplification to the general rule (MC-1, GENERAL-BASE-LOG-DERIVATIVE-MISSING-LN-A-FACTOR). A second, distinct failure is the same Chain-Rule transplant already documented for `math.calc.derivative-exponential`'s own MC-2 and `math.calc.chain-rule`'s own foundational MC-1: when the logarithm's argument is a function of $x$ rather than bare $x$, a learner correctly recognizes the logarithmic structure but omits the multiplicative inner-derivative factor $g'(x)$, stopping after $\frac{1}{g(x)}$ alone (MC-2, CHAIN-RULE-FACTOR-OMITTED-FOR-LOG-OF-A-FUNCTION).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — GENERAL-BASE-LOG-DERIVATIVE-MISSING-LN-A-FACTOR** (the Blueprint's own "Foundational" misconception — the identical mechanism as `math.calc.derivative-exponential`'s own MC-1, mirrored across the inverse function)
  - **Birth type**: Type 1, overgeneralization of $\ln x$'s own unique special-case simplicity (no extra factor) into every logarithm base, where the $\ln a$ factor is genuinely required for any $a\ne e$.
  - **Characteristic phrase**: writing $\frac{d}{dx}\log_5x=\frac{1}{x}$ (with no $\ln5$ factor in the denominator), applying $\ln x$'s simple rule wholesale.
  - **Detection probe** (Blueprint's B01 P41): present Example 1's $\log_5x$ case and check whether $\ln5$ is included.
  - **Repair**: Blueprint Repair Action B01 — re-derive $\log_ax=\frac{\ln x}{\ln a}$ via the change-of-base formula and differentiate that quotient directly, showing algebraically WHERE the $\ln a$ factor originates.
  - **Verification of death**: given a fresh non-$e$ base, the learner includes the correct $\ln a$ factor in the denominator without prompting.

- **MC-2 — CHAIN-RULE-FACTOR-OMITTED-FOR-LOG-OF-A-FUNCTION** (the Blueprint's own second "Foundational" misconception — the identical mechanism as `math.calc.derivative-exponential`'s own MC-2 and `math.calc.chain-rule`'s own foundational MC-1, recurring a third time across this closely related concept family)
  - **Birth type**: Type 1, direct transplant/overgeneralization of `math.calc.chain-rule`'s own INNER-DERIVATIVE-MISSING misconception — the identical "stop after the outer piece" error, here specifically with a logarithmic outer function.
  - **Characteristic phrase**: writing $\frac{d}{dx}\ln(x^2+1)=\frac{1}{x^2+1}$ alone, omitting the inner-derivative factor $2x$ entirely.
  - **Detection probe** (Blueprint's B02 P41): present Example 2 and check whether $g'(x)=2x$ is included.
  - **Repair**: Blueprint Repair Action B02 — re-identify $g(x)$ explicitly and re-multiply by $g'(x)$, exactly the same repair pattern already established for `math.calc.derivative-exponential`'s own MC-2.
  - **Verification of death**: given a fresh composite logarithm, the learner writes both the reciprocal factor AND the inner-derivative factor as visibly separate pieces before multiplying.

## Analogies
- **Best — the same "one true base" story as `math.calc.derivative-exponential`, seen from the inverse side.** Just as $e^x$ is the one exponential that needs no extra factor, $\ln x$ is the one logarithm that needs no extra factor — they are inverse functions sharing the identical "naturalness" property, for the identical reason ($\ln e=1$).
- **Alternative — a converter plug that's unnecessary at home, but required abroad.** $\ln x$ needs no "converter" (extra factor); every other log base needs the $\ln a$ conversion factor to translate back into natural-log terms — exactly mirroring the exponential case's translator analogy.
- **ANTI-ANALOGY — "taking $\ln$ of both sides is a trick for hard problems, unrelated to the basic $1/x$ rule."** This vague phrasing licenses treating logarithmic differentiation as a disconnected special trick rather than a direct application of the SAME derivative rule already learned, combined with implicit differentiation. Say "logarithmic differentiation is the basic $1/x$ rule, applied to BOTH sides of an equation, then solved implicitly" instead.

## Demonstrations
- **The base-comparison contrast.** Differentiate $\ln x$ and $\log_5x$ side by side, showing the derivative of $\log_5x$ genuinely includes a $\frac{1}{\ln5}$ factor, visibly different from $1$. *Predict whether the two derivatives will have the same form before computing.* Getting a DIFFERENT denominator factor for $\log_5x$ is the demonstration for MC-1.
- **The missing-inner-factor numerical check.** Compute the derivative of $\ln(x^2+1)$ at $x=1$ both with and without the chain-rule factor $2x$. *Predict whether omitting the factor changes the numerical answer before computing both.* Getting visibly different numbers is the demonstration for MC-2.
- **The unreachable-directly expression.** Attempt to differentiate $y=x^x$ using the power rule alone (fails, since the exponent isn't constant) and the exponential rule alone (fails, since the base isn't constant), then successfully differentiate it via logarithmic differentiation. *Predict whether either ordinary rule will work before attempting both.* Neither working, while logarithmic differentiation succeeds, is the demonstration motivating the technique's genuine necessity.

## Discovery Questions
Direct instruction is the argued call for $\ln x$'s own basic derivative rule (it is established via the definition of $e$ and the inverse-function relationship, not independently rediscoverable at this level), but the general-base factor (MC-1) and the logarithmic-differentiation technique's necessity (LO3) are both genuinely discoverable by direct comparison.
1. **Need** — "If $\ln x$ differentiates to $1/x$, does $\log_5x$ also differentiate to $1/x$? Estimate the derivative of $\log_5x$ numerically at $x=1$ and compare to $1$." A numeric estimate reveals a value close to $1/\ln5\approx0.621$, not $1$.
2. **Playground** — try the same numeric-estimate comparison for a couple more log bases.
3. **Invention** — "Why would different log bases give different divisors, all while $\ln x$ alone needs none?" Let the learner connect it to $\ln a$ measuring "how far" a base is from $e$, mirroring the exponential case.
4. **Collision** — confront a learner who applied $\ln x$'s simple rule to $\log_5x$ with the numeric mismatch.
5. **Formalisation** — state the general rule $\frac{d}{dx}\log_ax=\frac{1}{x\ln a}$ explicitly, with $\ln x$ as the $\ln a=1$ special case.
6. **Compression** — "Natural log, no extra factor — any other base, divide by $\ln$ of that base."

## Teaching Sequence
The base-$e$-versus-general-base distinction (MC-1) must be established FIRST, per the Blueprint's own A01, directly mirroring `math.calc.derivative-exponential`'s own sequencing — since it is the identical structural pattern, this concept's teaching benefits from EXPLICITLY invoking that already-learned parallel rather than re-deriving the pattern from scratch. The Chain Rule extension (MC-2) follows, per the Blueprint's own A02. The logarithmic-differentiation technique (LO3) is introduced LAST, per the Blueprint's own A03, since it is a genuinely NEW capability (not merely a repetition of the base-rule/chain-rule pattern) that depends on both prior pieces being fluent. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the base-comparison contrast ($\ln x$ versus $\log_5x$), with the learner predicting whether the two derivatives will look identical BEFORE either is computed. First action; anchors the base-$e$ exception concretely, explicitly invoking the parallel with `math.calc.derivative-exponential`.
- **TEST-THINKING: Prediction** — "Will differentiating $\ln(x^2+1)$ give just $\frac{1}{x^2+1}$, or does something extra need to be multiplied in?" asked BEFORE computing. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the unreachable-directly expression ($y=x^x$, failing both the power rule and the exponential rule alone, succeeding via logarithmic differentiation), run with the learner attempting the ordinary rules first before the technique is introduced.
- **TEST-THINKING: Error Analysis** — "A student computed the derivative of $\log_2x$ as $\frac{1}{x}$. What's missing?" targets MC-1 directly.
- **Does NOT fit: re-teaching the base-$e$-exception structure from scratch, as if it were unrelated to `math.calc.derivative-exponential`'s own identical pattern.** This concept should be introduced explicitly as the inverse-function mirror of that already-learned structure, not as an independent new rule.

## Voice Teaching Notes
The load-bearing sentence is "natural log needs no extra factor — any other base divides by $\ln a$, and if the argument is a function, multiply by its derivative too." Say it every time a new logarithm base is differentiated, not just the first. Listen for a learner who applies $\ln x$'s "no extra factor" rule to a different base without hesitation — that unreflective transfer is the tell for MC-1, identical to the tell already documented for `math.calc.derivative-exponential`'s own MC-1. Listen for a learner who writes a composite logarithm's derivative confidently and quickly, with no mention of a second multiplied factor — that fluent-but-incomplete confidence is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Omits the $\ln a$ factor for a log base other than $e$** — MC-1. Route to the base-comparison contrast, on the exact base in question.
- **Omits the inner-derivative factor $g'(x)$ when the logarithm's argument is a function of $x$** — MC-2. Route to the missing-inner-factor numerical check, on the exact composite logarithm in question.
- **Correctly includes the $\ln a$ factor for non-natural bases and the chain-rule factor for function arguments, and applies logarithmic differentiation when appropriate** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set (including two items requiring logarithmic differentiation) plus the P76 independence-mode transfer probe (a chemistry reaction-rate-constant expression combining a product, a quotient, and a variable power, requiring the learner to explain WHY logarithmic differentiation is the practical strategy) must include at least one item requiring the learner to justify WHY logarithmic differentiation is chosen over direct differentiation, not merely execute the technique mechanically — a gate made only of correct-computation items risks certifying procedure-following without certifying the underlying strategic judgment.

## Tutor Recovery Strategy
The likely utterance here is "why does $\log_5x$ need an extra $\ln5$, but $\ln x$ doesn't need anything?" — a reasonable question given how recently the identical pattern was seen for exponentials. The concept-specific smaller question returns to the already-established parallel: **"Remember with $e^x$ and $3^x$ — which one needed the extra factor? Now for logs: which base is the 'natural' one here?"** The learner recalls the exponential case's answer and transfers the reasoning. Then return: "exactly the same story, just for logs — $\ln x$ is the natural one, needing nothing extra; every other base needs to divide by $\ln a$." If the frustration is instead about logarithmic differentiation feeling like an unrelated trick, shrink to the bare check: **"Could you differentiate $x^x$ with the power rule alone, or the exponential rule alone? Try each — what goes wrong?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with two embedded precision requirements, plus one distinct strategic technique** (the base-dependent $\ln a$ factor and the chain-rule inner-derivative factor are mandatory precision points; logarithmic differentiation is a separate strategic-choice skill, not a precision point). Review by *requiring the learner to state, before computing, whether the base is $e$ (no extra factor) or something else (needs $\ln a$), AND whether the argument is bare $x$ or a function* — mirroring the identical diagnostic discipline established for `math.calc.derivative-exponential`.
- Concept-specific deviation: keep at least one expression in the review rotation that is a genuine VARIABLE POWER (like $x^{\sin x}$, not merely a product or quotient), since these are the cases where logarithmic differentiation is not merely convenient but strictly necessary, and this necessity is easy to forget once the technique feels routine.
- Interleaving partners: `math.calc.derivative-exponential` (the direct structural sibling and discriminating partner — both concepts' base-exception patterns should be reviewed together, not in isolation) and `math.calc.implicit-differentiation` (the technique logarithmic differentiation's final step directly depends on).

## Transfer Connections
- **Near**: `math.calc.implicit-differentiation` (logarithmic differentiation's final "solve implicitly for $y'$" step is a direct application of that concept's own technique).
- **Far**: `math.calc.derivative-exponential` (the inverse-function mirror image, sharing the identical base-exception structure and Chain Rule extension pattern).
- **Real-world**: the Blueprint's own transfer probe — a chemical reaction rate constant expressed as a messy product/quotient/power — is a direct, literal chemistry/kinetics application where logarithmic differentiation is the practical strategy of choice.
- **Expert transfer**: recognizing that taking logarithms is a general REPRESENTATION-SHIFT strategy for converting a multiplicative structure (products, quotients, powers) into an additive one (sums, differences, constant multiples) — the same "logs turn multiplication into addition" principle recurs across statistics (log-likelihood), information theory (bits), and numerical computation (log-scale stability).

## Cross-Subject Connections
- **Chemistry**, real: the Blueprint's own transfer probe (a reaction-rate-constant expression) is a standard, literal application of logarithmic differentiation in chemical kinetics.
- **Biology/ecology**, real: the natural log's derivative appears directly in models of relative growth rates ($\frac{d}{dt}\ln P=\frac{P'}{P}$, the per-capita growth rate), sharing the identical mathematical structure this concept develops.
- **Statistics**, real: log-likelihood functions, differentiated to find maximum-likelihood estimates, use this exact derivative rule as their computational foundation.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the chemistry connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.derivative-ln.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the base contrast breaking MC-1, Example 2 the chain-rule extension breaking MC-2, Example 3 the logarithmic-differentiation technique applied to $y=x^x$), the Component 5 Teaching Actions (A01 P06 contrast pair, A02 P64 conceptual shift, A03 P11 representation shift, A04 P91 mastery gate at MAMR 5/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the reaction-rate-constant expression). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and explicitly cross-references both misconceptions to their identical counterparts already documented in `math.calc.derivative-exponential`.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.chain-rule`, `math.func.logarithmic-function`), cross_links (none), difficulty, bloom, mastery_threshold (0.85), and estimated_hours (4) all match the live KG's own fields exactly, confirmed by direct query. The Blueprint's Component 7 notes an "unlocks" child, `math.calc.logarithmic-differentiation`, as informational context ("child... builds directly on LO3") rather than claiming it appears in the KG's own `unlocks` field for this concept — the live KG's `unlocks` for this concept is genuinely `[]`, matching the Blueprint's own literal statement ("none recorded in the KG"). No discrepancy.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 43).
