# math.calc.derivative-inverse-trig — Derivatives of Inverse Trig Functions

## Identity
- **KG id**: `math.calc.derivative-inverse-trig`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.derivative-trig`, `math.trig.inverse-trig`, `math.calc.implicit-differentiation`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 4

## Learning Objective
The learner states $\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}}$ and $\frac{d}{dx}\arctan x=\frac{1}{1+x^2}$, derives both via implicit differentiation of the inverse relation, and correctly applies the chain rule when the argument is a function of $x$.

## Core Understanding
These derivatives are not new facts requiring separate memorization — they fall directly out of `math.calc.implicit-differentiation`'s own technique applied to `math.trig.inverse-trig`'s own defining relations. For $y=\arcsin x$, the DEFINING relation is $\sin y=x$. Differentiating both sides implicitly with respect to $x$: $\cos y\cdot\frac{dy}{dx}=1$ (the chain rule on the left, since $y$ is itself a function of $x$). Solving: $\frac{dy}{dx}=\frac{1}{\cos y}$. Converting back to $x$ uses the Pythagorean identity $\cos y=\sqrt{1-\sin^2y}=\sqrt{1-x^2}$ — taking the **positive** square root specifically because `math.trig.inverse-trig`'s own restricted range for arcsin is $[-\pi/2,\pi/2]$, where $\cos y\ge0$ throughout. This is not an arbitrary sign convention; it is a direct consequence of the range restriction that concept already established.

The analogous derivation for $\arctan x$: $\tan y=x\Rightarrow\sec^2y\cdot y'=1\Rightarrow y'=\frac{1}{\sec^2y}=\frac{1}{1+\tan^2y}=\frac{1}{1+x^2}$ (using $\sec^2y=1+\tan^2y$, `math.trig.trig-identities`'s own derived Pythagorean form).

When the argument is a function $g(x)$ rather than bare $x$, the chain rule applies exactly as `math.calc.chain-rule` requires: $\frac{d}{dx}\arcsin(g(x))=\frac{g'(x)}{\sqrt{1-[g(x)]^2}}$ — **both** substituting $g(x)$ into the denominator's square root **and** multiplying by $g'(x)$. Neither modification alone produces a correct formula.

## Mental Models
- **The formula is a derivation, not a fact to memorize.** Rewrite the inverse function as its defining equation, differentiate implicitly, solve for the derivative, convert back using the Pythagorean identity.
- **The positive square root is not a convention — it is a consequence.** arcsin's range restriction $[-\pi/2,\pi/2]$ is exactly where cosine is non-negative, so the sign is forced, not chosen.
- **Two separate jobs, done together.** Applying the chain rule to an inverse trig function of $g(x)$ requires BOTH the outer-derivative substitution (put $g(x)$ where $x$ was) AND the multiplication by $g'(x)$ — like `math.calc.derivative-exponential`'s and `math.calc.implicit-differentiation`'s own inner-derivative-missing misconception, doing only one of the two produces a plausible-looking but wrong answer.

## Why Students Fail
Neither of this Blueprint's two misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 5 (instruction-induced)** gap: the correct sign is nearly always intuitively "obvious" in practice (positive), so worked examples rarely force the learner to articulate WHY it is positive, and the justification step (arcsin's range restriction) goes unpracticed until it is needed on an unfamiliar case.
- **MC-2** is a **Type 1 (overgeneralization)**, and specifically a THIRD recurrence of the inner-derivative-missing mechanism already documented for `math.calc.derivative-exponential`'s own MC-2 and `math.calc.implicit-differentiation`'s own MC-1: a learner who has internalized "multiply by $g'(x)$" as the whole chain-rule procedure, without also tracking that $g(x)$ itself must replace $x$ everywhere in the outer function's formula, performs only one of the two required modifications.

## Misconceptions
**MC-1 — SQUARE-ROOT-SIGN-CHOSEN-ARBITRARILY-WITHOUT-JUSTIFYING-VIA-RESTRICTED-RANGE** *(Moderate, Type 5)*
- Surface form: choosing the positive (or negative) square root arbitrarily when deriving arcsin's derivative, without justifying it via arcsin's restricted range.
- Root cause: the correct sign is usually intuitively obvious, so the underlying justification (the range restriction forces $\cos y\ge0$) is rarely practiced explicitly.
- Repair: re-derive while explicitly stating "arcsin's range is $[-\pi/2,\pi/2]$, and cosine is non-negative throughout that entire interval — so $\cos y=+\sqrt{1-x^2}$ is the ONLY valid choice, not a convention."

**MC-2 — CHAIN-RULE-MULTIPLICATION-PERFORMED-BUT-DENOMINATOR-SUBSTITUTION-OMITTED-OR-VICE-VERSA** *(Foundational, Type 1)*
- Surface form: differentiating $\arcsin(2x)$ as $\frac{2}{\sqrt{1-x^2}}$ — correctly including the chain-rule factor of 2, but forgetting to substitute $g(x)=2x$ (not just $x$) into the denominator's square root.
- Root cause: overgeneralizing "chain rule = multiply by $g'(x)$" as the complete procedure, without also tracking that $g(x)$ replaces $x$ everywhere in the outer formula.
- Repair: for $f(x)=\arcsin(2x)$, explicitly identify $g(x)=2x$ FIRST, then apply BOTH modifications together: $f'(x)=\frac{g'(x)}{\sqrt{1-[g(x)]^2}}=\frac{2}{\sqrt{1-(2x)^2}}=\frac{2}{\sqrt{1-4x^2}}$ — noting the domain also shrinks to $-\frac12<x<\frac12$ as a direct consequence.

## Analogies
- **The re-derive-don't-memorize analogy**: exactly parallel to how `math.calc.derivative-trig`'s own tan/cot/sec/csc derivatives are derived from sin/cos via the quotient rule rather than memorized independently — here, arcsin/arctan's derivatives are derived from their defining relations via implicit differentiation.
- **Anti-analogy — the sign is NOT a memorized convention.** This is MC-1's exact error, worth naming explicitly: unlike, say, a sign convention chosen for notational tidiness, the positive square root here is FORCED by arcsin's own range restriction — there is no world in which the negative root is equally valid and simply less common.

## Demonstrations
1. **Full implicit-differentiation derivation for arcsin**: work $\sin y=x\Rightarrow\cos y\cdot y'=1\Rightarrow y'=\frac{1}{\sqrt{1-x^2}}$ step by step, explicitly justifying the positive square root via arcsin's range — directly breaking MC-1.
2. **Basic application with domain awareness**: differentiate $f(x)=\arcsin(2x)$, correctly producing $\frac{2}{\sqrt{1-4x^2}}$ and stating the shrunken domain $-\frac12<x<\frac12$ — directly breaking MC-2.
3. **The arctan parallel**: differentiate $f(x)=\arctan(x^2)$, correctly producing $\frac{2x}{1+x^4}$ — reinforcing the identical two-modification pattern on the second standard inverse trig function.

## Discovery Questions
1. "Rewrite $y=\arcsin x$ as $\sin y=x$. Differentiate both sides with respect to $x$. What do you get, and how do you solve for $\frac{dy}{dx}$?"
2. "When you convert $\cos y$ back into terms of $x$, you get $\pm\sqrt{1-x^2}$. Which sign is correct, and why — specifically, what does arcsin's range tell you about the sign of $\cos y$?"
3. "Differentiate $\arcsin(2x)$. Did you multiply by 2? Did you also put $2x$ (not just $x$) inside the square root? Check both."

## Teaching Sequence
1. **Anchor in `math.calc.implicit-differentiation` and `math.trig.inverse-trig`**: restate the implicit-differentiation technique and arcsin/arctan's defining relations and restricted ranges as the two ingredients this concept combines.
2. **Representation shift (breaks MC-1)**: the full arcsin derivation, explicitly justifying the positive square root via the range restriction — never presenting the sign as a memorized rule.
3. **Chain-rule application (breaks MC-2)**: work $\arcsin(2x)$ and $\arctan(x^2)$, explicitly checking both required modifications (multiply by $g'(x)$, substitute $g(x)$ into the denominator) on each.
4. **Mastery gate**: 4-item problem set (differentiate $\arcsin(x/2)$ with domain; differentiate $\arctan(3x)$; explain in one sentence why the positive square root is used; differentiate $\arcsin(x^2-1)$) plus 1 independence-mode transfer probe (surveyor angle-of-elevation rate problem, with a physical sign-interpretation task).

## Tutor Actions
- **Representation shift**: the full implicit-differentiation derivation of arcsin's derivative, sign explicitly justified.
- **Chain-rule application check**: the two-modification verification on $\arcsin(2x)$ and $\arctan(x^2)$.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded physical-interpretation task.

## Voice Teaching Notes
- When first stating the positive-square-root step, pause and ask "why positive, not negative?" before continuing — forcing the range-restriction justification to be spoken rather than skipped, directly targeting MC-1's instruction-induced gap.
- For MC-2, use a fixed two-step spoken checklist every time: "First — what is $g(x)$? Second — did you put $g(x)$ into BOTH places: multiplied out front, AND substituted inside?" — said as two separate questions, never merged into one.
- Note explicitly that this concept's chain-rule check is the third time this exact mistake pattern has appeared (exponential derivatives, implicit differentiation, now inverse trig) — naming the recurring shape helps the learner recognize it as one skill, not three unrelated ones.

## Assessment Signals
- **Early warning for MC-1**: stating the derivative formula with the correct sign but being unable to explain why, or arbitrarily picking a sign when asked to re-derive it.
- **Early warning for MC-2**: differentiating $\arcsin(2x)$ as $\frac{2}{\sqrt{1-x^2}}$ (correct multiplier, wrong denominator) or as $\frac{1}{\sqrt{1-4x^2}}$ (correct denominator, missing multiplier).
- **Mastery evidence**: correctly deriving a fresh inverse-trig derivative from its defining relation without prompting, and correctly applying both chain-rule modifications together on an unseen composite argument.

## Tutor Recovery Strategy
- On MC-1: re-derive using the SAME explicit range-restriction justification rather than simply restating the formula — the misconception is about a missing justification, not a missing formula.
- On MC-2: rework a fresh composite-argument example (different from the one already seen), explicitly identifying $g(x)$ first before applying either modification — since the misconception is doing one modification while forgetting the other, isolating the two-step checklist is the repair, not more repetition of the final formula alone.
- If a learner correctly derives the bare formulas but fails composite-argument problems, treat this as a distinct chain-rule-application gap (not a formula-recall gap) and route to the composite-argument practice specifically.

## Memory Hooks
- "Rewrite, differentiate implicitly, solve, convert back" — the four-step derivation recipe.
- "arcsin's range forces the positive root — it's not a choice" — for MC-1.
- "Identify $g(x)$ first, then do BOTH: multiply by $g'(x)$ AND substitute $g(x)$ in" — for MC-2.

## Transfer Connections
- **`math.calc.implicit-differentiation`** (prerequisite, already authored): the derivation technique this concept applies directly to the arcsin/arctan defining relations.
- **`math.trig.inverse-trig`** (prerequisite, already authored): the restricted domains/ranges this concept's sign-justification argument depends on entirely.
- **`math.calc.derivative-trig`** (prerequisite, already authored): the ordinary trig derivatives ($\sin y$, $\cos y$, $\tan y$, $\sec^2y$) used inside this concept's own implicit-differentiation steps.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a surveying/angle-of-elevation-rate context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.derivative-inverse-trig.md` (mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted). All three worked examples (the full arcsin derivation, the $\arcsin(2x)$ chain-rule application, the $\arctan(x^2)$ parallel), the complete misconception registry (MC-1 Moderate, MC-2 Foundational, neither carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated mode and `cross_links: none`): "A surveyor uses $\theta(x)=\arctan\left(\frac{h}{x}\right)$ to find the angle of elevation to a fixed tower of height $h$, as a function of the surveyor's horizontal distance $x$ from the tower's base. (a) Using the chain rule and the inverse trig derivative formula, find $\frac{d\theta}{dx}$ (treating $h$ as a constant). (b) Explain, in physical terms, why $\frac{d\theta}{dx}$ should be NEGATIVE for $x>0$ — connecting to the fact that the angle of elevation decreases as the surveyor moves farther from the tower." *(Expected: (a) letting $g(x)=h/x$, $\frac{d\theta}{dx}=\frac{-h/x^2}{1+(h/x)^2}=\frac{-h}{x^2+h^2}$. (b) The result is negative for every $x>0$, matching the physical fact that walking away from the tower steadily decreases the angle of elevation — the calculus and the physical intuition agree.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). This is the domain's leaf position on the `math.calc.derivative-trig` → `math.calc.derivative-inverse-trig` chain — the KG genuinely lists no further `math.calc` concept requiring this one.

## Version History
- **2026-09-12 (Batch 56)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.calc.derivative-trig` (Batch 55, itself the payoff of the math.trig/math.seq cross-domain excursion begun Batch 52), `math.trig.inverse-trig` (Batch 55), and `math.calc.implicit-differentiation` (Batch 43) — the fourth (and final currently-ready) `math.calc` concept directly built on that excursion's own outputs. `math.calc` moves from 64/76 to 65/76 this batch.
