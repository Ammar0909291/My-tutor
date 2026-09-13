# math.calc.derivative-trig — Derivatives of Trigonometric Functions

## Identity
- **KG id**: `math.calc.derivative-trig`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.derivative-rules`, `math.trig.trig-functions`, `math.calc.squeeze-theorem`
- **Unlocks**: `math.calc.derivative-inverse-trig`
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.85 · **Estimated hours**: 6

## Learning Objective
The learner states the six trigonometric derivatives (with cosine's derivative's negative sign preserved), recognizes that sin and cos's derivatives are the foundational pair from which tan/cot/sec/csc are derived via the quotient rule, and correctly applies the chain-rule factor whenever a trig function's argument is itself a function.

## Core Understanding
This concept closes the exact chain this program's math.trig cross-domain excursion — begun in Batch 52 with `math.trig.angle-measure` and `math.trig.right-triangle-trig` — was always aimed at: differentiating the trigonometric functions `math.trig.trig-functions` established as globally-defined periodic functions of a real variable.

The six trigonometric derivatives are:
$$\frac{d}{dx}\sin x=\cos x,\quad \frac{d}{dx}\cos x=-\sin x,\quad \frac{d}{dx}\tan x=\sec^2x,\quad \frac{d}{dx}\cot x=-\csc^2x,\quad \frac{d}{dx}\sec x=\sec x\tan x,\quad \frac{d}{dx}\csc x=-\csc x\cot x$$
These are not six independent facts. The **foundational pair** — $\sin$ and $\cos$'s derivatives — come directly from the derivative's limit definition combined with `math.calc.squeeze-theorem`'s own result $\lim_{h\to0}\frac{\sin h}{h}=1$ (and the related $\lim_{h\to0}\frac{\cos h-1}{h}=0$). The remaining four are then **derived**, not independently re-established, by applying `math.calc.derivative-rules`' quotient rule to $\tan x=\sin x/\cos x$, $\cot x=\cos x/\sin x$, $\sec x=1/\cos x$, $\csc x=1/\sin x$ — building directly on the sin/cos derivatives just proven.

When the trig function's argument is a function $g(x)$ rather than plain $x$, the chain rule applies: $\frac{d}{dx}\sin(g(x))=\cos(g(x))\cdot g'(x)$ — the outer trig-derivative rule, multiplied by the inside function's own derivative, exactly as `math.calc.chain-rule` established generically.

## Mental Models
- **Two derivatives, four derivations.** Sin and cos's derivatives are the only genuinely new facts here; tan, cot, sec, and csc's derivatives are quotient-rule *consequences* of those two, worth deriving on demand rather than memorizing independently.
- **The sign is a graph fact, checkable at a glance.** $\cos x$ is decreasing on $(0,\pi/2)$ (from $1$ down toward $0$), so its derivative there must be negative — a one-second graphical sanity check that immediately flags a dropped negative sign.
- **"Plain $x$" vs. "a function of $x$" is the chain-rule trigger.** Whenever the material inside sin/cos/tan is anything other than the bare variable, an extra multiplication by that inner function's own derivative is mandatory — never optional.

## Why Students Fail
Both of this Blueprint's misconceptions are ranked Foundational and neither carries an explicit birth-type column (consistent with virtually every math.calc Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: sin's derivative ($\cos x$, no sign change) is memorized first and more prominently, and the learner extends "differentiating a trig function just swaps to its cofunction" onto cos without separately encoding the sign flip that genuinely distinguishes it.
- **MC-2** is a **Type 1 (overgeneralization)**, a direct instance of the same chain-rule-factor-omission mechanism already documented for other differentiation concepts in this domain (e.g. `math.calc.derivative-exponential`'s own MC-2, `math.calc.implicit-differentiation`'s own MC-1): once the basic trig-derivative rule ($\sin\to\cos$, etc.) becomes automatic, applying it to a composed argument without the accompanying inner-derivative multiplication is the single most common differentiation slip in this campaign's entire calculus domain.

## Misconceptions
**MC-1 — NEGATIVE-SIGN-DROPPED-FROM-COSINES-DERIVATIVE** *(Foundational, Type 1)*
- Surface form: writing $\frac{d}{dx}\cos x=\sin x$, omitting the required negative sign.
- Root cause: overgeneralizing sin's own sign-preserving derivative pattern onto cos, without separately tracking that cos's derivative genuinely flips sign.
- Repair: a graphical sanity check — $\cos x$ is strictly decreasing on $(0,\pi/2)$ (from $\cos(0)=1$ down toward $\cos(\pi/2)=0$), so its derivative there must be negative; $\sin x$ is positive on that interval, so $-\sin x$ correctly predicts a negative derivative while the unsigned $\sin x$ would wrongly predict a positive one — a direct contradiction the dropped-sign version cannot survive.

**MC-2 — CHAIN-RULE-FACTOR-OMITTED-FOR-TRIG-FUNCTION-OF-A-FUNCTION** *(Foundational, Type 1)*
- Surface form: differentiating $h(x)=\sin(3x^2)$ as $h'(x)=\cos(3x^2)$, omitting the chain-rule factor from the inner function $g(x)=3x^2$.
- Root cause: the basic trig-derivative rule becomes automatic before the chain-rule-trigger condition ("is the argument plain $x$, or a function of $x$?") is checked as a separate, mandatory step.
- Repair: work the correct derivation explicitly — $g(x)=3x^2$, $g'(x)=6x$, so $h'(x)=\cos(3x^2)\cdot6x=6x\cos(3x^2)$ — and contrast directly against the incomplete $\cos(3x^2)$ alone, naming the missing factor by number ($6x$) so the omission is concrete, not abstract.

## Analogies
- **The outer-rule-times-inner-derivative recipe**, reused directly from `math.calc.chain-rule`'s own framing: apply the trig derivative to the *outside*, then multiply by the *inside*'s own derivative — the identical two-step recipe already established there, now specialized to a trig outer function.
- **Anti-analogy — cos's derivative is NOT "the same swap pattern as sin's, just with cos written instead."** Sin and cos are cofunctions of each other under differentiation, but the transformation is not symmetric: $\sin\to\cos$ (no sign change) while $\cos\to-\sin$ (sign change) — treating the pair as interchangeable "just swap the function name" is exactly MC-1's error.

## Demonstrations
1. **Sign-check via monotonicity**: graph $\cos x$ on $(0,\pi/2)$, observe it decreasing, and confirm $-\sin x$ (not $\sin x$) is the only sign-consistent derivative candidate.
2. **Tan's derivative derived, not memorized**: apply the quotient rule to $\tan x=\sin x/\cos x$ using the already-established sin/cos derivatives, arriving at $\sec^2x$ — proving the "four derived facts" framing concretely.
3. **Chain-rule contrast pair**: differentiate $h(x)=\sin(3x^2)$ correctly ($6x\cos(3x^2)$) side by side with the incomplete attempt ($\cos(3x^2)$ alone), naming the specific missing factor.

## Discovery Questions
1. "$\cos x$ is decreasing on $(0,\pi/2)$. If someone tells you $\frac{d}{dx}\cos x=\sin x$, is that consistent with a decreasing function? What sign should the derivative have there?"
2. "Given $\frac{d}{dx}\sin x=\cos x$ and $\frac{d}{dx}\cos x=-\sin x$, can you derive $\frac{d}{dx}\tan x$ using the quotient rule on $\tan x=\sin x/\cos x$, without looking up the answer?"
3. "Differentiate $h(x)=\sin(3x^2)$. Is the argument $3x^2$ 'plain $x$,' or a function of $x$? What does that tell you about whether an extra factor is needed?"

## Teaching Sequence
1. **Anchor in `math.trig.trig-functions`, `math.calc.derivative-rules`, and `math.calc.squeeze-theorem`**: restate the squeeze-theorem result $\lim_{h\to0}\frac{\sin h}{h}=1$ as the key limit underlying the foundational sin/cos derivatives, established via the derivative's own limit definition.
2. **Conceptual shift (breaks MC-1)**: the cos-derivative sign-check demonstration, ending with the explicit statement "cos's derivative flips sign; sin's does not — they are not interchangeable under differentiation."
3. **Representation shift**: derive tan's derivative (and, by the same method, cot/sec/csc's) from the sin/cos derivatives via the quotient rule — reinforcing "two facts, four derivations."
4. **Contrast pair (breaks MC-2)**: the $\sin(3x^2)$ correct-vs-incomplete chain-rule demonstration, ending with "whenever the argument isn't plain $x$, the chain-rule factor is mandatory."
5. **Mastery gate**: 4-item problem set (differentiate $\sin x+\cos x$; derive $\sec x$'s derivative via the quotient rule; differentiate $\cos(5x)$; differentiate $\tan(x^2+1)$) plus 1 independence-mode transfer probe (a pendulum-velocity problem embedding both misconceptions' physical consequences).

## Tutor Actions
- **Conceptual shift** (MC-1): the cos-derivative sign-check via monotonicity.
- **Representation shift**: deriving the four non-foundational derivatives from sin/cos via the quotient rule.
- **Contrast pair** (MC-2): the correct-vs-incomplete chain-rule application on $\sin(3x^2)$.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded physical-consequence explanation task.

## Voice Teaching Notes
- State the sign asymmetry aloud every time both derivatives are mentioned together: "sine's derivative keeps its sign; cosine's flips" — reinforcing the asymmetry verbally, not just symbolically, to counter MC-1's swap-pattern overgeneralization.
- For chain-rule applications, ask the trigger question aloud before differentiating: "is the inside plain $x$, or something else?" — building this as a mandatory first step rather than an afterthought.
- When deriving tan/cot/sec/csc's derivatives, narrate the quotient-rule application as "building on what we already proved" rather than "a new fact to learn" — reinforcing the two-foundational-facts structure.

## Assessment Signals
- **Early warning for MC-1**: any instance of $\frac{d}{dx}\cos x$ written without a negative sign, independent of context.
- **Early warning for MC-2**: a trig derivative computed for a composed argument (anything other than plain $x$) that omits the inner-function's own derivative factor.
- **Mastery evidence**: correctly deriving one of tan/cot/sec/csc's derivatives from the sin/cos foundational pair via the quotient rule (rather than reciting it from memory), and correctly applying the chain rule to a fresh composed trig argument.

## Tutor Recovery Strategy
- On MC-1: use the monotonicity sign-check every time, not a bare restatement of "remember the negative sign" — the repair works by contradiction with the graph's own visible behavior, not by rote correction.
- On MC-2: re-identify the inner function $g(x)$ explicitly and re-multiply by $g'(x)$ as a separate, named step — the misconception persists when the chain-rule factor is treated as an afterthought rather than a distinct required action.
- If a learner correctly states all six derivatives but cannot re-derive tan/cot/sec/csc from sin/cos via the quotient rule, treat this as a distinct gap in *understanding the derivation* (LO2) separate from *correctly stating the results* (LO1), per the Blueprint's own three-way objective split.

## Memory Hooks
- "Sine keeps its sign; cosine flips" — for MC-1.
- "Two facts, four derivations — tan/cot/sec/csc come from the quotient rule" — for the foundational-pair structure.
- "Plain $x$, or a function of $x$? — check before you differentiate" — for MC-2, the chain-rule trigger question.

## Transfer Connections
- **`math.calc.derivative-inverse-trig`** (unlocked, not yet authored): differentiating arcsin, arccos, arctan via implicit differentiation of the original trig equation requires exactly the six derivatives established here as its starting toolkit.
- **`math.calc.squeeze-theorem`** (prerequisite, already authored): the limit $\lim_{h\to0}\frac{\sin h}{h}=1$ established there is the single load-bearing fact this concept's own foundational sin/cos derivations are built on — not re-derived here, reused by direct citation.
- **`math.calc.derivative-rules`** (prerequisite, already authored): the quotient rule from that concept is applied here, without re-derivation, to obtain tan/cot/sec/csc's derivatives from the sin/cos pair.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a physics-flavored pendulum context (simple harmonic motion, $y(t)=A\cos(\omega t)$) purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.derivative-trig.md` (a mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted per the corpus's own established convention). Both worked examples (the cos-sign-check, the tan-derivative quotient-rule derivation, the chain-rule contrast pair), the complete misconception registry (MC-1/MC-2, both Foundational, neither carrying an explicit birth-type column), and the mastery-gate problem set are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` and `cross_links: []`): "An engineer models the vertical displacement of a swinging pendulum as $y(t)=A\cos(\omega t)$ (amplitude $A$, angular frequency $\omega$), and needs the pendulum's instantaneous velocity $y'(t)$ at any moment. (a) Differentiate $y(t)$ with respect to time, being careful with both the negative sign on cosine's derivative AND the chain-rule factor from the $\omega t$ argument. (b) Explain what would go physically wrong (in terms of predicting the wrong direction of motion) if the negative sign were accidentally dropped from the derivative." *(Expected: (a) $y'(t)=-A\omega\sin(\omega t)$. (b) Dropping the negative sign would predict the pendulum moving in the opposite direction from its actual motion at any given instant — a concrete, checkable physical consequence of the sign error.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- **This concept closes the original motivating goal of this program's math.trig cross-domain excursion**, begun in Batch 52 specifically to eventually unblock this exact concept. All three of its prerequisites (`math.calc.derivative-rules`, `math.trig.trig-functions`, `math.calc.squeeze-theorem`) were already authored before this batch, so no additional excursion work was needed to reach it.

## Version History
- **2026-09-12 (Batch 55)**: authored as part of the Mathematics Educational Brain completion campaign. Closes the original motivating goal of this program's math.trig cross-domain excursion (begun Batch 52). `math.calc` moves from 63/76 to 64/76. Unlocks `math.calc.derivative-inverse-trig` (not yet authored).
