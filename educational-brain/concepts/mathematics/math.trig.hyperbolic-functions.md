# math.trig.hyperbolic-functions — Hyperbolic Functions

## Identity
- **KG id**: `math.trig.hyperbolic-functions`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.alg.exponential-function`, `math.trig.trig-functions`
- **Unlocks**: `math.calc.hyperbolic-derivatives`
- **Cross-links**: `math.calc.hyperbolic-derivatives` (not yet authored — independence mode)
- **Difficulty**: advanced · **Bloom level**: understand
- **Mastery threshold**: 0.7 · **Estimated hours**: 5

## Learning Objective
The learner defines $\sinh x=\frac{e^x-e^{-x}}{2}$, $\cosh x=\frac{e^x+e^{-x}}{2}$, and $\tanh x=\frac{\sinh x}{\cosh x}$ directly from `math.alg.exponential-function`'s own $e^x$, verifies each is odd or even from its definition, derives the identity $\cosh^2x-\sinh^2x=1$ and connects it to the unit hyperbola $x^2-y^2=1$ (in genuine contrast to the unit circle $x^2+y^2=1$ that `math.trig.trig-functions` is built on), and previews — without deriving — that the hyperbolic derivatives do NOT mirror the trigonometric sign pattern.

## Core Understanding
`math.alg.exponential-function` already owns $e^x$ itself (growth, decay, the function's defining properties), and `math.trig.trig-functions` already owns ordinary $\sin x,\cos x$ (built from the unit circle). This concept does not re-teach either — it defines a NEW pair of functions built directly from $e^x$, uses the ALREADY-familiar trig functions as a constant point of CONTRAST throughout (never as a loose intuition pump), and treats the parallel structure and the genuine differences with equal weight.

**The definitions come straight from $e^x$, split into even and odd parts**: $\cosh x=\frac{e^x+e^{-x}}{2}$ (the EVEN part of $e^x$: replacing $x\to-x$ leaves it unchanged, since the two terms simply swap) and $\sinh x=\frac{e^x-e^{-x}}{2}$ (the ODD part: replacing $x\to-x$ flips the sign, since the two terms swap and the subtraction reverses). Adding the two definitions recovers $e^x=\cosh x+\sinh x$ — confirming these two functions together decompose $e^x$ into its even and odd halves, exactly the way any function can be split. $\tanh x=\frac{\sinh x}{\cosh x}=\frac{e^x-e^{-x}}{e^x+e^{-x}}$ follows directly as their ratio.

**The Pythagorean-style identity comes from direct expansion, and the sign is forced, not chosen**: $\cosh^2x-\sinh^2x=\left(\frac{e^x+e^{-x}}{2}\right)^2-\left(\frac{e^x-e^{-x}}{2}\right)^2=\frac{(e^x+e^{-x})^2-(e^x-e^{-x})^2}{4}$. Expanding both squares: $(e^x+e^{-x})^2=e^{2x}+2+e^{-2x}$ and $(e^x-e^{-x})^2=e^{2x}-2+e^{-2x}$. Subtracting, the $e^{2x}$ and $e^{-2x}$ terms cancel entirely, leaving $\frac{2-(-2)}{4}=\frac{4}{4}=1$. So $\cosh^2x-\sinh^2x=1$ — a MINUS sign, not the trig identity's plus sign, and this minus sign is not a stylistic choice but falls directly out of the algebra of squaring a sum versus a difference.

**The identity's minus sign is exactly why these are called "hyperbolic"**: parametrizing $(x,y)=(\cos\theta,\sin\theta)$ traces the unit CIRCLE $x^2+y^2=1$, because $\cos^2\theta+\sin^2\theta=1$. Parametrizing $(x,y)=(\cosh t,\sinh t)$ traces the right branch of the unit HYPERBOLA $x^2-y^2=1$, because $\cosh^2t-\sinh^2t=1$ — the identical algebraic role (a Pythagorean-style relationship enabling a parametrization of a conic section), but the sign difference changes an ellipse into a hyperbola.

**The derivative preview is stated but deliberately NOT derived here**: it is a genuine, verifiable fact (deferred to `math.calc.hyperbolic-derivatives`, which requires calculus not yet available at this concept's own point in the sequence) that $\frac{d}{dx}[\sinh x]=\cosh x$ — matching the trig pattern $\frac{d}{dx}[\sin x]=\cos x$ exactly — but $\frac{d}{dx}[\cosh x]=\sinh x$, WITHOUT the minus sign that appears in $\frac{d}{dx}[\cos x]=-\sin x$. This asymmetry (one derivative matches the trig sign pattern, the other does not) is stated here as an orientation-level fact to prevent a later false assumption, not proven.

## Mental Models
- **Split $e^x$ into even and odd halves.** $\cosh x$ and $\sinh x$ are simply the even part and odd part of $e^x$ — adding them back together recovers $e^x$ exactly.
- **Same identity shape, opposite sign, different curve.** $\cos^2\theta+\sin^2\theta=1$ traces a circle; $\cosh^2t-\sinh^2t=1$ traces a hyperbola. The structural role is identical; the sign is what changes the geometry.
- **The trig analogy is a constant CONTRAST tool, not a shortcut.** Every hyperbolic fact should be checked against its trig counterpart explicitly — sometimes the pattern matches (the derivative of $\sinh$), sometimes it doesn't (the derivative of $\cosh$, the sign in the Pythagorean-style identity) — and both outcomes must be verified, never assumed.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 6 (analogy overextension)**: the name "hyperbolic functions" and the strong parallel structure with sin/cos naturally invite the assumption that $\sinh$ and $\cosh$ are ALSO angle-based, defined via some geometric angle on the hyperbola the way $\sin\theta,\cos\theta$ are defined via the angle $\theta$ on the unit circle — when in fact they are defined purely algebraically from $e^x$, with no angle involved at all (the parameter $t$ in $(\cosh t,\sinh t)$ is related to hyperbolic SECTOR AREA, not an angle).
- **MC-2** is a **Type 6 (analogy overextension)**: having just learned $\cos^2\theta+\sin^2\theta=1$ as a fixed pattern, a learner naturally copies the PLUS sign into the hyperbolic case, producing the false identity $\cosh^2x+\sinh^2x=1$ instead of correctly re-deriving the sign from the actual algebra.
- **MC-3** is a **Type 6 (analogy overextension)**: extending the same copy-the-trig-pattern habit one step further, into a DIFFERENT fact (derivatives) that has not even been derived yet at this concept's own point in the curriculum — assuming $\frac{d}{dx}[\cosh x]=-\sinh x$ by analogy with $\frac{d}{dx}[\cos x]=-\sin x$, when the correct (later-derived) result has no minus sign.

## Misconceptions
**MC-1 — HYPERBOLIC-DEFINED-VIA-ANGLE** *(Foundational)*
- Surface form: attempting to define $\sinh\theta,\cosh\theta$ via some angle $\theta$ on the hyperbola the way $\sin\theta,\cos\theta$ are defined via the unit circle's angle, rather than via the exponential formulas.
- Root cause: the strong naming and notational parallel ("hyperbolic sine," "hyperbolic cosine") invites treating the entire trig framework — including the angle-based definition — as transplantable wholesale.
- Repair: state the definitions explicitly and exclusively in terms of $e^x$: $\cosh x=\frac{e^x+e^{-x}}{2}$, $\sinh x=\frac{e^x-e^{-x}}{2}$ — there is no angle anywhere in these formulas; $x$ is simply a real-number input to the exponential function.

**MC-2 — HYPERBOLIC-IDENTITY-SIGN-COPIED-FROM-TRIG** *(High)*
- Surface form: stating $\cosh^2x+\sinh^2x=1$ (copying the trig identity's plus sign) instead of the correct $\cosh^2x-\sinh^2x=1$.
- Root cause: the trig Pythagorean identity's plus sign is deeply memorized as a fixed pattern, and the hyperbolic identity's superficial resemblance invites direct sign transfer without re-derivation.
- Repair: re-expand $\left(\frac{e^x+e^{-x}}{2}\right)^2-\left(\frac{e^x-e^{-x}}{2}\right)^2$ from scratch, showing the $e^{2x}$ and $e^{-2x}$ cross terms cancel and leave $\frac{2-(-2)}{4}=1$ — the minus sign is the direct, forced consequence of squaring a SUM versus a DIFFERENCE, not an arbitrary convention.

**MC-3 — HYPERBOLIC-DERIVATIVES-ASSUMED-TO-MIRROR-TRIG-SIGNS** *(Moderate)*
- Surface form: assuming $\frac{d}{dx}[\cosh x]=-\sinh x$ (copying the trig pattern $\frac{d}{dx}[\cos x]=-\sin x$) rather than the correct, sign-free $\frac{d}{dx}[\cosh x]=\sinh x$.
- Root cause: after seeing the derivative of $\sinh x$ correctly match $\cos x$'s pattern (both give the "cofunction" with a plus sign), it is natural to assume the pattern continues symmetrically for $\cosh x$'s derivative as well.
- Repair: state plainly, as an orientation-level fact to be VERIFIED later (in `math.calc.hyperbolic-derivatives`, once the derivative rules are available): one hyperbolic derivative matches the trig sign pattern and one does not — neither can be assumed from the other without deriving it.

## Analogies
- **The even/odd decomposition analogy**: exactly as any function $f(x)$ can be split into an even part $\frac{f(x)+f(-x)}{2}$ and an odd part $\frac{f(x)-f(-x)}{2}$, $\cosh x$ and $\sinh x$ are precisely this decomposition applied to $e^x$ — a general technique, not a special hyperbolic trick.
- **Anti-analogy — the hyperbolic functions are NOT angle-based, despite the name.** This is MC-1's exact error: unlike $\sin\theta,\cos\theta$, whose definitions genuinely require an angle $\theta$ swept on the unit circle, $\sinh x,\cosh x$ are defined purely algebraically from $e^x$ with no geometric angle anywhere in the formula.

## Demonstrations
1. **The even/odd verification**: compute $\sinh(0)=\frac{e^0-e^0}{2}=0$, $\cosh(0)=\frac{e^0+e^0}{2}=1$, then verify $\sinh(-x)=-\sinh(x)$ and $\cosh(-x)=\cosh(x)$ directly from the definitions by substituting $-x$ — directly breaking MC-1 by keeping the derivation exclusively exponential, no angle involved.
2. **The forced-sign identity derivation**: expand $\cosh^2x-\sinh^2x$ term by term from the exponential definitions, showing the $e^{2x}$ and $e^{-2x}$ terms cancel and force the result to $1$ — directly breaking MC-2.
3. **The circle-versus-hyperbola parametrization contrast**: plot $(\cos\theta,\sin\theta)$ tracing the unit circle $x^2+y^2=1$ beside $(\cosh t,\sinh t)$ tracing the right branch of $x^2-y^2=1$, making the sign's geometric consequence visible — reinforcing that the difference is structural, not cosmetic, and setting up (without resolving) the derivative-sign question flagged by MC-3.

## Discovery Questions
1. "If $\cosh x=\frac{e^x+e^{-x}}{2}$ and $\sinh x=\frac{e^x-e^{-x}}{2}$, what do you get if you ADD $\cosh x$ and $\sinh x$ together?"
2. "You know $\cos^2\theta+\sin^2\theta=1$. If you expand $\cosh^2x-\sinh^2x$ directly from the exponential definitions, do you get a plus sign or a minus sign — and why?"
3. "The curve $(\cos\theta,\sin\theta)$ traces a circle. What curve do you think $(\cosh t,\sinh t)$ traces, given the identity you just derived?"

## Teaching Sequence
1. **Anchor in `math.alg.exponential-function` and `math.trig.trig-functions`**: state directly, "you know $e^x$ and you know $\sin,\cos$ — today you build a NEW pair of functions from $e^x$ that echo $\sin,\cos$'s structure, but you must check every echo, never assume it."
2. **Representation shift (breaks MC-1)**: define $\sinh,\cosh,\tanh$ purely from $e^x$, verify $\sinh(0)=0,\cosh(0)=1$, and the odd/even properties by direct substitution — no angle anywhere.
3. **Conflict evidence (breaks MC-2)**: the forced-sign derivation of $\cosh^2x-\sinh^2x=1$ from direct expansion.
4. **Contrast demonstration**: the circle-versus-hyperbola parametrization, connecting the sign to the geometric shape.
5. **Orientation preview (addresses MC-3 directly, without full derivation)**: state that $\frac{d}{dx}[\sinh x]=\cosh x$ matches the trig pattern but $\frac{d}{dx}[\cosh x]=\sinh x$ does not carry a minus sign — flagged explicitly as "verify this later, do not assume it now."
6. **Mastery gate**: 4-item problem set (verify $\sinh(0)=0,\cosh(0)=1$ and odd/even properties from the definitions; derive $\cosh^2x-\sinh^2x=1$ by direct expansion; compute $\tanh x$ at a given $x$ from the exponential definitions; state which of the two derivative facts matches the trig pattern and which does not) plus 1 independence-mode transfer probe (the catenary curve $y=\cosh(x/a)$, contrasted with $\cos(x/a)$'s very different large-$x$ behavior).

## Tutor Actions
- **Representation shift**: the purely exponential definitions of $\sinh,\cosh,\tanh$, with the odd/even verification by direct substitution.
- **Conflict evidence**: the forced-sign derivation of the Pythagorean-style hyperbolic identity.
- **Contrast demonstration**: the circle-versus-hyperbola parametrization, plus the derivative-sign orientation preview.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring the catenary application and an explicit trig-versus-hyperbolic contrast.

## Voice Teaching Notes
- Open with the explicit contrast framing: "these functions echo sin and cos in structure, but you have to check every property yourself — never assume it transfers," setting the standing discipline for the whole concept.
- For MC-1, whenever a hyperbolic value is needed, insist on the exponential formula: "there is no angle here — write $\frac{e^x\pm e^{-x}}{2}$ and compute."
- For MC-2, before accepting any hyperbolic identity, ask "is this the trig identity with the sign copied, or did you re-derive it?" as a standing check.
- For MC-3, explicitly name the asymmetry when it comes up: "one hyperbolic derivative matches the trig sign pattern, one doesn't — which is which is something you verify later, not something you guess now."

## Assessment Signals
- **Early warning for MC-1**: attempting to describe $\sinh,\cosh$ in terms of an angle or a geometric sweep rather than the exponential formula.
- **Early warning for MC-2**: stating $\cosh^2x+\sinh^2x=1$ (plus sign) without re-deriving.
- **Early warning for MC-3**: asserting $\frac{d}{dx}[\cosh x]=-\sinh x$ before that derivative has actually been derived.
- **Mastery evidence**: correctly deriving $\cosh^2x-\sinh^2x=1$ from the exponential definitions on a fresh prompt, and correctly identifying that the hyperbolic derivative facts must be independently verified rather than assumed from the trig pattern.

## Tutor Recovery Strategy
- On MC-1: return to the pure exponential definitions and require the learner to compute $\sinh$ and $\cosh$ at a specific numeric $x$ using only $e^x$ and $e^{-x}$ — no angle language permitted in the answer.
- On MC-2: re-expand the identity from scratch with the learner performing each algebraic step aloud, isolating exactly where the cancellation forces the minus sign.
- On MC-3: explicitly separate "what has been PROVEN in this concept" (the algebraic identity, the odd/even properties) from "what has been STATED but not yet proven" (the derivative facts), and require the learner to name which category a given claim belongs to.
- If a learner masters the definitions and identity but cannot articulate WHY the hyperbolic functions are named after the hyperbola, revisit the circle-versus-hyperbola parametrization contrast before proceeding.

## Memory Hooks
- "Even part plus odd part gives back $e^x$" — the definitional decomposition.
- "Squares subtract, sign flips, circle becomes hyperbola" — for MC-2.
- "Check, don't copy" — the standing discipline against MC-1 and MC-3 alike.

## Transfer Connections
- **`math.alg.exponential-function`** (prerequisite, already authored): supplies $e^x$ itself, the sole building block from which every hyperbolic definition in this concept is constructed.
- **`math.trig.trig-functions`** (prerequisite, already authored): supplies the ordinary $\sin,\cos$ this concept uses as a constant point of structural contrast — both the successful parallel (definitions built from a more primitive object; a Pythagorean-style identity; a parametrization of a conic section) and the genuine differences (algebraic vs. angle-based definition; sign of the identity; sign asymmetry in the as-yet-unproven derivatives).
- **`math.calc.hyperbolic-derivatives`** (unlocked and cross-linked, not yet authored): this concept's own MC-3 orientation preview (one derivative matches the trig sign, one does not) is exactly the fact that entry will formally derive and confirm.

## Cross-Subject Connections
- The Blueprint's own transfer probe uses the catenary curve $y=\cosh(x/a)$ (the real physical shape a hanging chain or cable forms under gravity) as the application vehicle, contrasted explicitly against $\cos(x/a)$'s oscillating behavior — a genuine physics/engineering application, though not a formal KG cross-link (the KG lists `cross_links: ['math.calc.hyperbolic-derivatives']`, itself a mathematics concept).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.hyperbolic-functions.md`. All three worked examples (verifying $\sinh(0)=0,\cosh(0)=1$ and the odd/even properties; deriving $\cosh^2x-\sinh^2x=1$ by direct expansion; stating without deriving the derivative sign pattern), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.calc.hyperbolic-derivatives`, `cross_links: ['math.calc.hyperbolic-derivatives']`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**, including on the cross-link's own unauthored status (the Blueprint's own `P76_mode: independence` correctly identifies `math.calc.hyperbolic-derivatives` as not yet authored — confirmed via directory listing).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the catenary curve $y=\cosh(x/a)$, comparing its behavior to $\cos(x/a)$'s at large $x$, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`), including confirmation that the Blueprint's own claim that `math.calc.hyperbolic-derivatives` is unauthored (justifying `P76_mode: independence`) is accurate.
- This entry, along with `math.trig.product-to-sum` authored the same batch, deliberately targets reopening the currently-blocked `math.calc` domain — `math.calc.hyperbolic-derivatives` needs only this concept as its `math.trig` prerequisite (its other prerequisite, `math.calc.derivative-rules`, is already authored), per the forward-planning note left in Batch 58's own ROADMAP entry.

## Version History
- **2026-09-13 (Batch 59)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by `math.alg.exponential-function` and `math.trig.trig-functions` (both already authored). One of four concepts authored this batch (companions: `math.trig.product-to-sum`, `math.seq.partial-sums`, `math.seq.geometric-series`). `math.trig` moves from 17/25 toward 19/25 this batch. Deliberately selected, alongside `product-to-sum`, to reopen the `math.calc` domain's frontier per Batch 58's forward-planning note.
