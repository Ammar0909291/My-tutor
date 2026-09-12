# math.calc.derivative-exponential

## Identity
- **KG ID**: `math.calc.derivative-exponential`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.chain-rule` — load-bearing part: whenever the exponent is a function of $x$ rather than plain $x$, the derivative of the exponential requires the Chain Rule's outer-inner structure.
  - `math.func.exponential-function` — load-bearing part: the concept being differentiated is the already-established exponential function class, including its growth/decay classification.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.calc.derivative-exponential.md` (reused by reference throughout)

## Learning Objective
- The learner can state the special property $\frac{d}{dx}e^x=e^x$ — $e^x$ is its own derivative, unlike every other exponential base.
- The learner can state the general rule $\frac{d}{dx}a^x=a^x\ln a$ for any base $a>0$, and recognize $e^x$ as the special case where $\ln e=1$ makes the extra factor vanish.
- The learner can apply the Chain Rule when the exponent is itself a function of $x$: $\frac{d}{dx}e^{g(x)}=e^{g(x)}\cdot g'(x)$, never omitting the inner-derivative factor $g'(x)$.

## Core Understanding
The exponential function $e^x$ has a genuinely unique property among all exponential bases: $\frac{d}{dx}e^x=e^x$ — it is its own derivative, which is exactly the defining property that singles out $e$ as a base in the first place. For a GENERAL base $a>0$, the rule is $\frac{d}{dx}a^x=a^x\ln a$ — an extra multiplicative factor of $\ln a$ appears, and this extra factor is NOT optional or a stylistic choice; it is mathematically required for every base other than $e$. The connection is direct: since $\ln e=1$, substituting $a=e$ into the general rule gives $e^x\cdot1=e^x$, recovering the simpler special case exactly. When the EXPONENT is itself a function of $x$ (not bare $x$), the Chain Rule applies on top of this: $\frac{d}{dx}e^{g(x)}=e^{g(x)}\cdot g'(x)$ — the exponential function's value stays structurally the same, multiplied by the derivative of whatever is in the exponent, and this inner-derivative factor $g'(x)$ is `math.calc.chain-rule`'s own required second factor, applied here in the specific context of an exponential outer function.

## Mental Models
1. **Beginner — "$e^x$'s derivative is itself; other bases need an extra $\ln a$."** Two separate rules memorized, without yet connecting WHY $e$ is special. *Upgrade trigger*: needing to differentiate a base other than $e$ or $10$ and being unsure whether the extra factor applies.
2. **Intermediate — "$\frac{d}{dx}a^x=a^x\ln a$ is the GENERAL rule; $e^x$ is just the special case where $\ln a=1$."** The two rules are now understood as one rule with a special-case simplification, not two independent facts. *Upgrade trigger*: encountering an exponent that is itself a function of $x$, requiring the Chain Rule on top of the base rule.
3. **Advanced — "the exponent being a function of $x$ triggers the Chain Rule exactly as it would for any other outer function; the exponential base rule and the Chain Rule combine, never substitute for each other."** Both factors (the $\ln a$ base factor and the $g'(x)$ chain-rule factor) are tracked simultaneously when both apply. *Upgrade trigger*: needing to differentiate the INVERSE relationship, $\ln x$ and $\log_a x$, and noticing the structural parallel.
4. **Expert — recognizing that $a^x=e^{x\ln a}$ makes the general-base rule itself a direct Chain Rule application to the base-$e$ special case, unifying both rules into one.** The "extra $\ln a$ factor" is now understood as a DERIVED consequence of the Chain Rule, not a separately memorized fact. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a straightforward overgeneralization of $e^x$'s own uniquely simple property: having learned that $e^x$ differentiates to itself with no extra factor, a learner applies that SAME simplicity to every exponential base, omitting the $\ln a$ factor that every base other than $e$ genuinely requires — treating a special-case simplification as if it were the general rule (MC-1, GENERAL-BASE-EXPONENTIAL-DERIVATIVE-MISSING-LN-A-FACTOR). A second, distinct failure is a direct transplant of `math.calc.chain-rule`'s own foundational misconception (INNER-DERIVATIVE-MISSING) into this new context: when the exponent is a function of $x$ rather than bare $x$, a learner correctly recognizes the exponential structure but omits the multiplicative inner-derivative factor $g'(x)$, exactly the same "stop after the outer piece" error already documented for the general Chain Rule (MC-2, CHAIN-RULE-FACTOR-OMITTED-WHEN-EXPONENT-IS-A-FUNCTION).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — GENERAL-BASE-EXPONENTIAL-DERIVATIVE-MISSING-LN-A-FACTOR** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization of $e^x$'s own unique special-case simplicity (no extra factor) into every exponential base, where the $\ln a$ factor is genuinely required for any $a\ne e$.
  - **Characteristic phrase**: writing $\frac{d}{dx}3^x=3^x$ (with no $\ln3$ factor), applying $e^x$'s simple rule wholesale.
  - **Detection probe** (Blueprint's B01 P41): present Example 1's $3^x$ case and check whether $\ln3$ is included.
  - **Repair**: Blueprint Repair Action B01 — re-derive $a^x=e^{x\ln a}$ and apply the Chain Rule directly, showing algebraically WHERE the $\ln a$ factor originates, rather than presenting it as an arbitrary extra rule to memorize.
  - **Verification of death**: given a fresh non-$e$ base, the learner includes the correct $\ln a$ factor without prompting, and can explain (if asked) why $e^x$ alone is the exception.

- **MC-2 — CHAIN-RULE-FACTOR-OMITTED-WHEN-EXPONENT-IS-A-FUNCTION** (the Blueprint's own second "Foundational" misconception — the identical mechanism as `math.calc.chain-rule`'s own foundational MC-1, INNER-DERIVATIVE-MISSING, recurring in this specific outer-function context)
  - **Birth type**: Type 1, direct transplant/overgeneralization of `math.calc.chain-rule`'s own INNER-DERIVATIVE-MISSING misconception — the identical "stop after the outer piece" error, here specifically with an exponential outer function.
  - **Characteristic phrase**: writing $\frac{d}{dx}e^{3x^2}=e^{3x^2}$ alone, omitting the inner-derivative factor $6x$ entirely.
  - **Detection probe** (Blueprint's B02 P41): present Example 2 and check whether $g'(x)=6x$ is included.
  - **Repair**: Blueprint Repair Action B02 — re-identify $g(x)$ explicitly and re-multiply by $g'(x)$, exactly the same repair pattern already established for `math.calc.chain-rule`'s own MC-1.
  - **Verification of death**: given a fresh composite exponential, the learner writes both the exponential factor AND the inner-derivative factor as visibly separate pieces before multiplying.

## Analogies
- **Best — a single, uniquely balanced seesaw among a family of unevenly weighted ones.** $e^x$ is the one exponential base where the "balance point" ($\ln a$) is exactly $1$, so it contributes nothing extra; every other base's seesaw is unevenly weighted, contributing a genuine $\ln a$ tilt to the derivative.
- **Alternative — a translator that adds one extra word for every language except the "home" language.** $e^x$'s derivative needs no translation (it IS its own derivative); every other base's derivative needs the $\ln a$ "translation factor" to convert it back into base-$e$ terms.
- **ANTI-ANALOGY — "every exponential function differentiates to itself, just with different letters."** This vague phrasing licenses MC-1 directly, since it implies $e^x$'s simplicity generalizes universally. Say "ONLY $e^x$ differentiates to itself; every other base needs an extra $\ln a$ factor, because only $e$ satisfies $\ln e=1$" instead.

## Demonstrations
- **The base-comparison contrast.** Differentiate $e^x$ and $3^x$ side by side, showing the derivative of $3^x$ genuinely includes $\ln3\approx1.099$, a factor visibly different from $1$. *Predict whether the two derivatives will have the same "shape" before computing.* Getting a DIFFERENT multiplicative factor for $3^x$ is the demonstration for MC-1.
- **The missing-inner-factor numerical check.** Compute the derivative of $e^{3x^2}$ at $x=1$ both with and without the chain-rule factor $6x$. *Predict whether omitting the factor changes the numerical answer before computing both.* Getting visibly different numbers is the demonstration for MC-2.
- **The unifying re-derivation.** Rewrite $3^x$ as $e^{x\ln3}$ and differentiate via the Chain Rule directly, recovering $3^x\ln3$ without treating the base rule as a separate fact. *Predict whether this Chain-Rule-based derivation will match the memorized general-base formula before computing.*

## Discovery Questions
Direct instruction is the argued call for $e^x$'s own self-derivative property (it is the defining characteristic of $e$, not independently rediscoverable at this level), but the general-base factor (MC-1) and the chain-rule extension (MC-2) are both genuinely discoverable by direct comparison and numeric check.
1. **Need** — "If $e^x$ differentiates to itself, does $3^x$ also differentiate to itself? Estimate the derivative of $3^x$ numerically at $x=0$ and compare to $3^0=1$." A numeric estimate reveals a slope close to $\ln3\approx1.099$, not $1$.
2. **Playground** — try the same numeric-estimate comparison for a couple more bases.
3. **Invention** — "Why would different bases give different multiplicative factors, all while $e^x$ alone needs none?" Let the learner connect it to $\ln a$ measuring "how far" a base is from $e$.
4. **Collision** — confront a learner who applied $e^x$'s simple rule to $3^x$ with the numeric mismatch.
5. **Formalisation** — state the general rule $\frac{d}{dx}a^x=a^x\ln a$ explicitly, with $e^x$ as the $\ln a=1$ special case.
6. **Compression** — "Same base, self-derivative — different base, multiply by $\ln$ of that base."

## Teaching Sequence
The base-$e$-versus-general-base distinction (MC-1) must be established FIRST, since the Chain Rule extension (MC-2) applies identically whether the base is $e$ or general, and introducing both distinctions simultaneously risks conflating "which base" with "is the exponent a function" as one confused question. Per the Blueprint's own A01/A02 ordering, Example 1's base contrast precedes Example 2's chain-rule extension, and Example 3 deliberately combines both factors only once each has been established independently. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the base-comparison contrast ($e^x$ versus $3^x$), with the learner predicting whether the two derivatives will look identical BEFORE either is computed. First action; anchors the base-$e$ exception concretely.
- **TEST-THINKING: Prediction** — "Will differentiating $e^{6x}$ give just $e^{6x}$, or does something extra need to be multiplied in?" asked BEFORE computing, using the Chain Rule's own already-established inner-derivative requirement as the point of reference. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the unifying re-derivation ($3^x=e^{x\ln3}$, differentiated via the Chain Rule directly), run with the learner verifying the result matches the memorized general-base formula.
- **TEST-THINKING: Error Analysis** — "A student computed the derivative of $5^x$ as $5^x$. What's missing?" targets MC-1 directly.
- **Does NOT fit: introducing logarithmic differentiation or the derivative of $\ln x$ here.** This concept covers exponential derivatives only; `math.calc.derivative-ln`'s own content (a closely parallel structure) is a separate, sibling concept.

## Voice Teaching Notes
The load-bearing sentence is "ONLY $e^x$ is its own derivative — every other base needs the extra $\ln a$ factor, and if the exponent is a function, multiply by its derivative too." Say it every time a new exponential base is differentiated, not just the first. Listen for a learner who applies $e^x$'s "no extra factor" rule to a different base without hesitation — that unreflective transfer is the tell for MC-1. Listen for a learner who writes a composite exponential's derivative confidently and quickly, with no mention of a second multiplied factor — that fluent-but-incomplete confidence is the tell for MC-2, echoing the identical tell already documented for `math.calc.chain-rule`'s own MC-1. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Omits the $\ln a$ factor for a base other than $e$** — MC-1. Route to the base-comparison contrast, on the exact base in question.
- **Omits the inner-derivative factor $g'(x)$ when the exponent is a function of $x$** — MC-2. Route to the missing-inner-factor numerical check, on the exact composite exponential in question.
- **Correctly includes the $\ln a$ factor for non-$e$ bases and the chain-rule factor for function exponents** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a bacterial-population-growth problem contrasting a base-$e$ model against a competing base-$2$ model, requiring the learner to correctly differentiate BOTH and explain why the rates differ) must include at least one item requiring the learner to justify the base-$e$-versus-general-base distinction, not merely differentiate correctly — a gate made only of correct-computation items risks certifying mechanical pattern-matching without certifying the underlying conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "why does $3^x$ need an extra $\ln 3$, but $e^x$ doesn't need anything?" — a reasonable question given how simple $e^x$'s own rule is. The concept-specific smaller question returns to the defining relationship: **"What is $\ln e$? Now, using the general rule $a^x\ln a$, what happens when $a=e$?"** The learner computes $\ln e=1$ themselves and sees the factor become $1$, vanishing from view. Then return: "that's exactly why $e$ is special — it's the ONE base where this factor equals $1$." If the frustration is instead about the chain-rule extension, shrink to the bare check: **"Is the exponent here just $x$, or is it something ELSE, like $3x^2$? If it's something else, that something else has its own derivative you need to multiply in."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with two embedded precision requirements** (the base-dependent $\ln a$ factor and, when applicable, the chain-rule inner-derivative factor are both mandatory multiplicative pieces, never optional). Review by *requiring the learner to state, before computing, whether the base is $e$ (no extra factor) or something else (needs $\ln a$), AND whether the exponent is bare $x$ or a function (needs the chain-rule factor)* — two independent yes/no diagnostic questions, checked explicitly rather than pattern-matched.
- Concept-specific deviation: keep at least one problem in the review rotation combining BOTH factors simultaneously (a non-$e$ base with a function exponent, as in Example 3), since testing the two factors only separately lets a learner who handles each in isolation still fail when both are needed together.
- Interleaving partners: `math.calc.derivative-ln` (the direct structural sibling — the inverse function's derivative, sharing the identical base-exception pattern) and `math.calc.chain-rule` (the discriminating partner for MC-2, since this concept's chain-rule factor is a direct instance of that concept's own general rule).

## Transfer Connections
- **Near**: `math.calc.derivative-ln` (the inverse function's derivative, derived via a closely parallel base-exception structure).
- **Far**: differential equations describing exponential growth/decay ($y'=ky$), where this concept's own derivative rule is the computational foundation for verifying and solving such equations.
- **Real-world**: the Blueprint's own transfer probe — comparing a base-$e$ bacterial growth model against a base-$2$ alternative — is a direct, literal biology/population-modeling application.
- **Expert transfer**: recognizing that a "natural" base (here $e$, elsewhere radians for angles) is the one that eliminates an otherwise-unavoidable conversion factor from a formula — the same "choose the natural unit to simplify the mathematics" principle recurs across applied mathematics and physics.

## Cross-Subject Connections
- **Biology/ecology**, real: the Blueprint's own transfer probe (bacterial population growth, base-$e$ versus base-$2$ models) is a standard, literal application in population biology.
- **Finance/economics**, real: continuously compounded interest and exponential discounting are modeled with base-$e$ exponentials specifically because of this concept's own self-derivative property, avoiding an extra conversion factor.
- **Physics**, real: radioactive decay and other exponential-rate processes are modeled and differentiated using this exact rule.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the biology connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.derivative-exponential.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the base contrast breaking MC-1, Example 2 the chain-rule extension breaking MC-2, Example 3 combining both factors), the Component 5 Teaching Actions (A01 P06 contrast pair, A02 P64 conceptual shift, A03 reused procedure, A04 P91 mastery gate at MAMR 5/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the bacterial-growth-model comparison). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and explicitly cross-references MC-2 to `math.calc.chain-rule`'s own foundational MC-1 as the identical mechanism transplanted into this context.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.chain-rule`, `math.func.exponential-function`), unlocks (none), cross_links (none), difficulty, bloom, mastery_threshold (0.85), and estimated_hours (3) all match the live KG's own fields exactly, confirmed by direct query. This is the first of four zero-discrepancy concepts in this batch, starting a fresh streak after `math.calc.arc-length` (Batch 42) broke the prior five-consecutive-zero streak.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 43).
