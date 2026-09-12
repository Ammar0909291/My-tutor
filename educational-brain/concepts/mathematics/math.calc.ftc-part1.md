# math.calc.ftc-part1

## Identity
- **KG ID**: `math.calc.ftc-part1`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.definite-integral` — load-bearing part: the accumulation function $G(x)=\int_a^xf(t)\,dt$ is a definite integral with a VARIABLE upper limit, directly reusing the Riemann-sum-limit definition and signed-area interpretation.
  - `math.calc.continuity` — load-bearing part: continuity of $f$ on $[a,b]$ is the theorem's HYPOTHESIS; the geometric argument (a thin strip's area is approximately $f(x)\Delta x$) requires continuity to ensure $f$ doesn't jump near $x$, making the approximation exact in the limit.
- **Unlocks**: `math.calc.ftc-part2` (the companion theorem, evaluating definite integrals via antiderivatives).
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.ftc-part1.md` (reused by reference throughout)

## Learning Objective
- The learner can state and apply FTC Part 1: for $f$ continuous on $[a,b]$ and $G(x)=\int_a^xf(t)\,dt$, $G'(x)=f(x)$ for every $x$ in $(a,b)$ — differentiation and integration as INVERSE operations.
- The learner can correctly identify $t$ as a dummy integration variable that disappears entirely upon differentiation, with the output correctly expressed in $x$, never $t$.
- The learner can extend FTC1 via the Chain Rule when the upper limit is a composite function $u(x)$: $\frac{d}{dx}\left[\int_a^{u(x)}f(t)\,dt\right]=f(u(x))\cdot u'(x)$, never omitting the $u'(x)$ factor.

## Core Understanding
FTC Part 1 is the precise statement that differentiation and integration UNDO each other: if $f$ is continuous on $[a,b]$ and $G(x)=\int_a^xf(t)\,dt$ is the "accumulation function" (the running total of area swept out as the upper limit $x$ increases), then $G'(x)=f(x)$ — differentiating the accumulation function simply RECOVERS the original integrand, evaluated at the current upper limit. The geometric intuition makes this concrete: as $x$ increases by a tiny $\Delta x$, the newly-added sliver of area is approximately $f(x)\cdot\Delta x$ (height $f(x)$, width $\Delta x$), so $G'(x)=\lim_{\Delta x\to0}\frac{\Delta G}{\Delta x}=f(x)$ — and CONTINUITY is exactly what guarantees this approximation becomes exact in the limit, since a continuous $f$ cannot jump near $x$. A crucial notational point: the symbol $t$ inside $\int_a^xf(t)\,dt$ is a DUMMY variable — a placeholder name with no meaning outside the integral, exactly like a loop index in programming — and it vanishes entirely upon differentiation, replaced by the upper limit $x$ in the output: $G'(x)=f(x)$, never $f(t)$. The lower limit $a$, being a fixed constant, has NO effect on the derivative at all — it only shifts $G(x)$ by a constant, which differentiates to zero. When the upper limit is itself a composite function $u(x)$ rather than bare $x$, the Chain Rule supplies an extra factor: $\frac{d}{dx}\left[\int_a^{u(x)}f(t)\,dt\right]=f(u(x))\cdot u'(x)$ — evaluate the integrand at $u(x)$, THEN multiply by $u'(x)$, a factor that is never optional whenever the upper limit is anything other than bare $x$.

## Mental Models
1. **Beginner — differentiating an integral just plugs the upper limit into the integrand.** $\frac{d}{dx}\int_a^xf(t)\,dt=f(x)$, applied mechanically. *Upgrade trigger*: the integrand still using $t$ after differentiation, or an upper limit that isn't bare $x$. *Shelf life*: about one lesson.
2. **Intermediate — $t$ is a dummy variable that disappears; $x$ is the real output variable.** The letter inside the integral is a placeholder, replaced by $x$ in $G'(x)=f(x)$. *Upgrade trigger*: a composite upper limit like $x^2$ or $\sin x$, where the simple substitution alone gives an incomplete answer.
3. **Advanced — a composite upper limit $u(x)$ requires the Chain Rule: evaluate at $u(x)$, then multiply by $u'(x)$.** $\frac{d}{dx}\int_a^{u(x)}f(t)\,dt=f(u(x))\cdot u'(x)$, with the simple case $u(x)=x$ as $u'(x)=1$ folding back into the basic rule. *Upgrade trigger*: needing to distinguish FTC1 (a differentiation tool, producing a FUNCTION) from FTC2 (an evaluation tool, producing a NUMBER) — this model applies FTC1 fluently without yet contrasting it against its companion theorem.
4. **Expert — FTC1 establishes that the definite integral, as a function of its upper limit, is itself an antiderivative of the integrand.** This is the precise sense in which "integration and differentiation are inverse operations" — $G(x)=\int_a^xf(t)\,dt$ is A SPECIFIC antiderivative of $f$ (the one satisfying $G(a)=0$), and FTC1 is the theorem guaranteeing this construction always works whenever $f$ is continuous. *Shelf life*: permanent, and it is the theorem that makes FTC2's evaluation shortcut ($F(b)-F(a)$) provable rather than merely asserted.

## Why Students Fail
The dominant failure is a straightforward notational retention error: having correctly recognized that the integrand is $f(t)$ inside the integral, a learner keeps writing $t$ in the DERIVATIVE's output, producing $G'(x)=f(t)$ instead of $G'(x)=f(x)$ — not recognizing that $t$ is merely a placeholder name that has no independent existence outside the integral, and that the derivative's output must be expressed entirely in terms of the actual variable $x$ (MC-1, VARIABLE-CONFUSION-T-AND-X). A second failure is instruction-induced: because FTC1 is typically first introduced with lower limit $0$ in nearly every worked example, a learner infers the lower limit's specific value is structurally significant, and becomes confused or doubts the theorem applies when a non-zero constant lower limit (like $3$) appears, missing that ANY constant lower limit cancels upon differentiation (MC-2, LOWER-LIMIT-DETERMINES-FTC1). The third failure is an overgeneralization of the simple case's own substitution shortcut: a learner correctly applies FTC1's "evaluate the integrand at the upper limit" step even when that upper limit is a COMPOSITE function $u(x)$, but treats $u(x)$ as though it were simply $x$, omitting the Chain Rule factor $u'(x)$ that composite upper limits genuinely require (MC-3, CHAIN-RULE-OMITTED).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 4/5 repair actions B01–B03. **The Blueprint's Misconception Registry carries no explicit birth-type column** (the older document format, matching `math.calc.limits`/`continuity`/`derivative-intro`/`derivative-definition`/`definite-integral`); all three classifications below are independently assigned here.

- **MC-1 — VARIABLE-CONFUSION-T-AND-X** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 4, notation-induced. The letter $t$ genuinely appears, visually, inside the integral's own written formula — and that visual persistence is carried, incorrectly, into the derivative's output, where the notation convention (replace the dummy variable with the upper limit) is easy to overlook.
  - **Characteristic phrase**: $G(x)=\int_0^x\sin(t)\,dt$, so $G'(x)=\sin(t)$.
  - **Detection probe** (verbatim, Blueprint's B01 P41): "evaluate $\int_0^x\sin(t)\,dt$ and differentiate with respect to $x$. Should $t$ appear in $G'(x)$?"
  - **Repair**: Blueprint Repair Action B01 — the symbol $t$ is a "dummy name," like a loop index in programming; $\int_0^x\sin(t)\,dt=\int_0^x\sin(u)\,du$, identically — after differentiation, the output is a function of the upper limit $x$, and $t$ is replaced by $x$: $G'(x)=\sin(x)$.
  - **Verification of death**: given a fresh accumulation function, the learner writes $G'(x)$ entirely in terms of $x$, with no trace of the dummy variable, without being prompted.

- **MC-2 — LOWER-LIMIT-DETERMINES-FTC1**
  - **Birth type**: Type 5, instruction-induced. FTC1 is typically first introduced with lower limit $0$ in the overwhelming majority of examples, so the learner infers the specific value $0$ is structurally necessary rather than an arbitrary fixed constant.
  - **Characteristic phrase**: "$G(x)=\int_3^xt^2\,dt$ — but the lower limit is $3$, not $0$, so $G'(x)\ne t^2$" (or a claimed offset).
  - **Detection probe** (verbatim, Blueprint's B02 P41): compute $G(x)=\int_3^xt\,dt$ directly ($G(x)=x^2/2-9/2$), differentiate ($G'(x)=x$), and compare against the FTC1 prediction.
  - **Repair**: Blueprint Repair Action B02 — via additivity, $\int_a^xf(t)\,dt=\int_0^xf(t)\,dt-\int_0^af(t)\,dt$; the second piece is a CONSTANT (no $x$), so it differentiates to zero — the lower limit's value shifts $G(x)$'s VALUE but never its RATE of change.
  - **Verification of death**: given a fresh accumulation function with a non-zero constant lower limit, the learner applies FTC1 directly without hesitation or claimed offset.

- **MC-3 — CHAIN-RULE-OMITTED**
  - **Birth type**: Type 1, overgeneralization of the simple-case substitution shortcut (evaluate the integrand at the upper limit) into composite upper limits, where the upper limit itself is a function of $x$ requiring its own differentiation via the Chain Rule.
  - **Characteristic phrase**: $\frac{d}{dx}\left[\int_0^{x^2}\cos(t)\,dt\right]=\cos(x^2)$, omitting the factor $2x$.
  - **Detection probe** (verbatim, Blueprint's A02 P49): "find $\frac{d}{dx}\left[\int_0^{x^2}\cos(t)\,dt\right]$."
  - **Repair**: Blueprint Repair Action B03 — view $H(x)=\int_0^{x^2}\cos(t)\,dt$ as $G(u)$ with $u=x^2$; by the Chain Rule, $dH/dx=dG/du\cdot du/dx=\cos(x^2)\cdot2x$ — the $u'(x)$ factor is never optional whenever the upper limit is anything other than bare $x$.
  - **Verification of death**: given a fresh composite upper limit, the learner identifies $u(x)$, computes $u'(x)$ separately, and multiplies it into the final answer, without being prompted.

## Analogies
- **Best — a loop variable in a program.** `for t in range(...)`: the letter `t` has no meaning outside the loop — renaming it to `u` or `s` changes nothing about what the code does. The integral's dummy variable $t$ works identically, directly countering MC-1.
- **Alternative — a car's odometer starting from different mile markers.** Two odometers, one zeroed at mile $0$ and one zeroed at mile $3$, both report the exact same SPEED (rate of change) at any given moment — only their displayed totals differ by a fixed offset. This is exactly why the lower limit cancels upon differentiation, directly countering MC-2.
- **ANTI-ANALOGY — "differentiating an integral is just substituting the upper limit into the integrand."** This is true ONLY when the upper limit is bare $x$; stated without qualification, it licenses MC-3 directly. Say "substitute the upper limit into the integrand, THEN multiply by that upper limit's own derivative" instead.

## Demonstrations
- **The dummy-variable renaming check.** Compute $\int_0^x\sin(t)\,dt$, $\int_0^x\sin(u)\,du$, and $\int_0^x\sin(s)\,ds$ side by side. *Predict whether they're the same integral before comparing.* Confirming they're identical, regardless of the inner letter, is the demonstration for MC-1.
- **The offset-cancellation check.** Compute $G(x)=\int_3^xt\,dt=x^2/2-9/2$ directly, then differentiate, getting $G'(x)=x$ — matching the bare FTC1 prediction exactly. *Predict whether the lower limit $3$ will show up in the derivative first.* Its complete disappearance is the demonstration for MC-2.
- **The composite-upper-limit chain-rule check.** Compute $\int_0^{x^2}t\,dt=x^4/2$ directly (via antiderivative evaluation), then differentiate to get $2x^3$; compare against the FTC1-plus-chain-rule shortcut $f(x^2)\cdot2x=x^2\cdot2x=2x^3$. *Predict whether the shortcut without the chain-rule factor ($x^2$ alone) would match first.* The mismatch (missing the factor of $2x$) is the demonstration for MC-3.

## Discovery Questions
Guided discovery is used for the core theorem's plausibility (the thin-strip argument is directly observable geometrically), while the dummy-variable convention and the lower-limit-cancellation fact are best stated directly as conventions/derivable algebraic consequences.
1. **Need** — "$G(x)=\int_0^xv(t)\,dt$ is a car's position, given velocity $v(t)$. How fast is the car's position changing at time $x$?" The answer is intuitively "at rate $v(x)$" — its current velocity.
2. **Playground** — check this intuition on a specific $v(t)$, computing $G(x)$ directly via antiderivative evaluation and differentiating to confirm it matches $v(x)$.
3. **Invention** — "Why would differentiating an accumulated total always give back the current rate?" Let the learner connect it to the thin-strip/rate-of-accumulation picture.
4. **Collision** — confront a learner unsure whether this holds for EVERY continuous $f$ (not just the one example) with a second, different function, confirming the pattern repeats.
5. **Formalisation** — state FTC1 precisely, including the continuity hypothesis and the dummy-variable convention.
6. **Compression** — "The rate the total is growing, right now, is just the current height of the curve."

## Teaching Sequence
The dummy-variable convention (MC-1) must be resolved FIRST and explicitly, per the Blueprint's own Teaching Notes ranking it the single most frequent error and the one that "blocks all further progress" — a learner who cannot reliably output $G'(x)=f(x)$ rather than $f(t)$ has no stable foundation for anything that follows. The simple-upper-limit case (no Chain Rule) must be FULLY mastered before composite upper limits are introduced, per the Blueprint's own explicit sequencing note — presenting both simultaneously is named as a direct trigger for MC-3 in learners who haven't yet automated the basic substitution. The lower-limit-cancellation fact (MC-2) and the Chain-Rule extension (MC-3) can be sequenced in either order relative to each other, since they address independent failure modes, but MC-3 should follow the basic case's mastery specifically, not merely follow MC-2's resolution. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the position-velocity concrete anchor (A01's own representation), establishing $G'(x)=v(x)$ through physical intuition before any formal notation. First action; anchors the theorem's plausibility.
- **TEST-THINKING: Prediction** — "Should $t$ appear in $G'(x)$, or only $x$?" asked BEFORE differentiating a fresh accumulation function. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the offset-cancellation check on $G(x)=\int_3^xt\,dt$, run with the learner computing both the direct antiderivative route and the FTC1 shortcut themselves.
- **TEST-THINKING: Error Analysis** — "A student wrote $\frac{d}{dx}\left[\int_0^{x^3}t\,dt\right]=x^3$. What's missing?" targets MC-3 directly.
- **Does NOT fit: introducing FTC2's antiderivative-evaluation shortcut before FTC1's own dummy-variable and chain-rule mechanics are solid.** `math.calc.ftc-part2` owns that explicitly; the Blueprint's own Teaching Notes warn that learners commonly reach for FTC2 (antiderivative computation) when asked to differentiate an integral, and this concept's entire point is that FTC1 BYPASSES that need entirely.

## Voice Teaching Notes
The load-bearing sentence is "the dummy variable disappears — the output is always in terms of $x$." Say it every time an accumulation function is differentiated, not just the first. Listen for a learner who, asked to state $G'(x)$, says "sine of tee" instead of "sine of ex" — that specific slip, even a verbal one, is the tell for MC-1. Listen for a learner who hesitates or objects specifically because a lower limit isn't $0$ — that particular hesitation, distinct from any other kind of confusion, is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Retains $t$ in the derivative's output instead of substituting $x$** — MC-1. Route to the dummy-variable renaming check, on the exact accumulation function in question.
- **Doubts or misapplies FTC1 when the lower limit is a non-zero constant** — MC-2. Route to the offset-cancellation check, on the exact lower limit in question.
- **Omits the $u'(x)$ factor for a composite upper limit** — MC-3. Route to the composite-upper-limit chain-rule check, on the exact upper limit in question.
- **Correctly expresses $G'(x)$ entirely in $x$, applies FTC1 regardless of the lower limit's specific value, and includes the chain-rule factor for composite upper limits automatically** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (two items spanning both the simple and composite-upper-limit cases) must include at least one item with a genuinely non-zero lower limit AND at least one with a composite upper limit — a gate made only of $a=0$, bare-$x$-upper-limit items certifies the basic substitution without certifying either MC-2's or MC-3's specific discrimination.

## Tutor Recovery Strategy
The likely utterance here is "why did the $t$ disappear — shouldn't the answer still have $t$ in it, since that's what's inside the integral?" — a reasonable question given how visually persistent $t$ is in the written formula. The concept-specific smaller question returns to the loop-variable analogy: **"If I write a loop that adds up numbers using a variable called `i`, does the FINAL TOTAL depend on what I named that loop variable?"** The learner recognizes the total is the same regardless of the loop variable's name, on ground they already own from programming or basic reasoning. Then return: "$t$ is exactly that — a name used only INSIDE the integral. Once you're done, only $x$ (the upper limit) matters for the output." If the frustration is instead about the Chain Rule factor feeling optional, shrink to the bare check: **"Compute $\frac{d}{dx}[x^2]$ directly. Does that number belong somewhere in your answer?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded notational discipline** (the FTC1 substitution and chain-rule extension are procedures; correctly handling the dummy variable is a notational judgment). Review by *requiring the derivative's output to be checked for any stray $t$*, and by *including at least one composite-upper-limit item in every review set*, since a review using only bare-$x$ upper limits never re-exercises the chain-rule discipline MC-3 targets.
- Concept-specific deviation: keep at least one non-zero constant lower limit permanently in the review rotation — a review that only ever uses lower limit $0$ never re-exercises the cancellation argument MC-2 targets.
- Interleaving partners: `math.calc.definite-integral` (the source of the Riemann-sum-limit definition this concept differentiates) and the upcoming `math.calc.ftc-part2`, whose own antiderivative-evaluation shortcut this concept's own Teaching Notes explicitly warn against reaching for prematurely.

## Transfer Connections
- **Near**: `math.calc.ftc-part2` (the companion theorem, evaluating definite integrals via antiderivatives — a NUMBER-producing counterpart to this concept's FUNCTION-producing FTC1).
- **Far**: the general theory of parameter-dependent integrals (met in more advanced analysis), where differentiating under the integral sign with respect to a parameter generalizes this concept's own upper-limit differentiation.
- **Real-world**: the Blueprint's own primary anchor — recovering instantaneous velocity by differentiating an accumulated-position function — is a direct, literal physical application, not a metaphor.
- **Expert transfer**: recognizing when two operations are genuinely INVERSE to each other (differentiation and integration here) — the same discipline of proving, not merely asserting, an inverse relationship recurs across mathematics (e.g. proving logarithms and exponentials are inverse, or that matrix inversion undoes multiplication).

## Cross-Subject Connections
- **Physics**, genuine and central: the Blueprint's own primary representation (position as the accumulation of velocity, with FTC1 recovering velocity by differentiating position) is not illustrative fiction — kinematics performs exactly this computation.
- **Engineering**, real: recovering an instantaneous rate (e.g. instantaneous power) from an accumulated total (e.g. total energy delivered) by differentiating an accumulation function uses this exact theorem.
- **Economics**, real: recovering marginal cost from a cumulative-cost accumulation function via FTC1, connecting directly back to `math.calc.antiderivatives`' own initial-value-problem framing in reverse.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the physics connection, while genuine and central to this concept's own primary teaching representation, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.ftc-part1.md`. Reused by reference, not restated: the Component 1 Cognitive Map, the Component 2 Misconception Registry (MC-1..MC-3), the Component 4 teaching actions (A01 P11 the position-velocity representation shift, A02 P04 the pattern-induction sequence from simple to composite upper limits, A03 P06 the FTC1-vs-FTC2 and simple-vs-composite contrast, A04 P91 mastery gate at MAMR 4/5), the P77 four-item problem set, and the P76 independence-mode transfer probe (the two-part simple-and-composite differentiation). This entry adds independent birth-type classification for all three misconceptions (the Blueprint carries no explicit birth-type column, matching the older-document-format gap already found across `math.calc.limits`/`continuity`/`derivative-intro`/`derivative-definition`/`definite-integral`), the mental-model ladder, the anti-analogy, and the argued guided-discovery-for-plausibility / direct-instruction-for-convention split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.ftc-part2`) and empty cross_links match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38 — this batch's fifth consecutive zero-discrepancy entry, closing out Batch 41 with a full 5-batch streak.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 41).
