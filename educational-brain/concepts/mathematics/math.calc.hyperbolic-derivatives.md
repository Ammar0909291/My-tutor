# math.calc.hyperbolic-derivatives — Derivatives of Hyperbolic Functions

## Identity
- **KG id**: `math.calc.hyperbolic-derivatives`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.trig.hyperbolic-functions`, `math.calc.derivative-exponential`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.7 · **Estimated hours**: 3

## Learning Objective
The learner states $\frac{d}{dx}\sinh x=\cosh x$ and $\frac{d}{dx}\cosh x=\sinh x$, recognizing the crucial difference from ordinary trig derivatives that NEITHER formula carries a negative sign; derives both formulas directly from the exponential definitions using `math.calc.derivative-exponential`; and applies the chain rule when the hyperbolic function's argument is itself a function of $x$.

## Core Understanding
`math.trig.hyperbolic-functions` already defined $\sinh x,\cosh x,\tanh x$ from $e^x$ and previewed — without deriving — that the hyperbolic derivatives do not uniformly mirror the trig sign pattern. This concept supplies the deferred derivation and its precise consequence: one sign difference from trig, at exactly one of the two formulas.

**The formulas are derived directly from the exponential definitions**: $\sinh x=\frac{e^x-e^{-x}}{2}$, so $\frac{d}{dx}\sinh x=\frac{d}{dx}\left(\frac{e^x-e^{-x}}{2}\right)=\frac{e^x-(-e^{-x})}{2}=\frac{e^x+e^{-x}}{2}=\cosh x$ — using `math.calc.derivative-exponential`'s chain rule on $e^{-x}$, where the inner derivative $-1$ flips the sign of that term, producing a PLUS between the two exponential terms. Similarly, $\frac{d}{dx}\cosh x=\frac{d}{dx}\left(\frac{e^x+e^{-x}}{2}\right)=\frac{e^x-e^{-x}}{2}=\sinh x$ — here the chain-rule sign flip on $e^{-x}$'s derivative produces a MINUS, which combined with the original PLUS in $\cosh x$'s definition gives back exactly $\sinh x$'s definition.

**Neither formula has a negative sign — the one place hyperbolic functions genuinely differ from trig**: $\frac{d}{dx}\sinh x=\cosh x$ and $\frac{d}{dx}\cosh x=\sinh x$ are structurally similar to $\frac{d}{dx}\sin x=\cos x$ and $\frac{d}{dx}\cos x=-\sin x$, but $\cos x$'s derivative carries a negative sign while $\cosh x$'s does not. This is not a memorization quirk — the exponential derivation above shows exactly why: the two chain-rule sign flips on $e^{-x}$'s derivative (one for each of $\sinh$'s and $\cosh$'s own definitions) work out so that neither final formula picks up an overall minus.

**The chain rule applies exactly as with any other differentiable function**: when the argument is a function $g(x)$, $\frac{d}{dx}\sinh(g(x))=\cosh(g(x))\cdot g'(x)$ — the same multiplication-by-the-inner-derivative rule already familiar from trig and exponential differentiation.

## Mental Models
- **Two exponential terms, two sign flips, one plus and one minus.** The exponential derivation is the whole story — $\sinh$'s derivative gains a sign flip that turns a minus into a plus; $\cosh$'s gains one that turns a plus into a minus that then cancels back to $\sinh$'s own form.
- **One difference from trig, not a wholesale one.** The hyperbolic derivatives echo the trig pattern structurally (each function's derivative is the "partner" function) but drop trig's alternating sign — a single, precise exception, not a general "hyperbolic functions are backwards" rule.
- **The chain rule is unchanged.** Nothing about hyperbolic functions alters how the chain rule itself works — the inner-derivative multiplication is the same discipline as everywhere else.

## Why Students Fail
Neither of this Blueprint's two misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 6 (analogy overextension)**: having just learned $\frac{d}{dx}\cos x=-\sin x$, the superficial notational and structural similarity between $\cosh$ and $\cos$ invites carrying the negative sign over by analogy, extending the exact same overextension pattern `math.trig.hyperbolic-functions` already flagged for the identity's sign and the definition itself.
- **MC-2** is a **Type 1 (overgeneralization)**: once a learner has correctly stated the base derivative formulas $\frac{d}{dx}\sinh x=\cosh x$, it is natural to apply them directly to a plain-$x$ argument, overgeneralizing the base-case formula to composite arguments and omitting the chain-rule factor $g'(x)$ — an error common to every differentiation rule the first time a composite argument appears.

## Misconceptions
**MC-1 — TRIG-SIGN-FLIP-PATTERN-INCORRECTLY-APPLIED-TO-HYPERBOLIC-FUNCTIONS** *(Foundational)*
- Surface form: writing $\frac{d}{dx}\cosh x=-\sinh x$ (copying $\cos x$'s negative-sign pattern) instead of the correct, sign-free $\frac{d}{dx}\cosh x=\sinh x$.
- Root cause: the strong notational parallel to trig functions invites transplanting the entire sign behavior, including the one place it genuinely does not carry over.
- Repair: re-derive $\frac{d}{dx}\cosh x$ directly from $\cosh x=\frac{e^x+e^{-x}}{2}$, showing the chain-rule sign flip on $e^{-x}$'s derivative produces $\frac{e^x-e^{-x}}{2}=\sinh x$ exactly — no overall minus sign appears anywhere in the computation.

**MC-2 — CHAIN-RULE-FACTOR-OMITTED-FOR-HYPERBOLIC-FUNCTION-OF-A-FUNCTION** *(Foundational)*
- Surface form: differentiating $h(x)=\cosh(3x^2)$ as $h'(x)=\sinh(3x^2)$, omitting the chain-rule factor $g'(x)=6x$.
- Root cause: the base-case formula $\frac{d}{dx}\cosh x=\sinh x$ is applied directly to a composite argument without recognizing the argument is not plain $x$.
- Repair: explicitly identify $g(x)=3x^2$ and $g'(x)=6x$ BEFORE differentiating, then apply $\frac{d}{dx}\cosh(g(x))=\sinh(g(x))\cdot g'(x)=6x\sinh(3x^2)$ — the same "identify the inner function first" discipline used for every other chain-rule application.

## Analogies
- **The exponential-derivation analogy**: exactly as `math.calc.derivative-exponential` already establishes $\frac{d}{dx}e^{kx}=ke^{kx}$ via the chain rule on a linear inner function, this concept's own derivation of $\frac{d}{dx}\sinh x$ and $\frac{d}{dx}\cosh x$ is the SAME chain-rule mechanism applied twice within one combined definition.
- **Anti-analogy — the hyperbolic sign pattern is NOT a mirror of the trig sign pattern.** This is MC-1's exact error: unlike $\sin/\cos$'s alternating-sign derivative pair, $\sinh/\cosh$'s derivative pair has NO sign change at all — the resemblance in name and notation does not extend to this one property.

## Demonstrations
1. **The contrast demonstration**: stating $\frac{d}{dx}\cosh x=\sinh x$ (no negative sign) directly beside $\frac{d}{dx}\cos x=-\sin x$ (has a negative sign) — directly breaking MC-1 by making the single point of difference explicit and visible.
2. **The exponential derivation, worked in full**: differentiating $\sinh x=\frac{e^x-e^{-x}}{2}$ term by term, including the chain-rule sign flip on $e^{-x}$, to arrive at $\cosh x$ — showing the sign-free result is a forced consequence of the algebra, not an arbitrary rule.
3. **The chain-rule application**: differentiating $h(x)=\cosh(3x^2)$ by first identifying $g(x)=3x^2$, $g'(x)=6x$, then computing $h'(x)=6x\sinh(3x^2)$ — directly breaking MC-2 by making the inner-function identification an explicit, separate step before differentiating.

## Discovery Questions
1. "You know $\frac{d}{dx}\cos x=-\sin x$. If $\cosh x$ looks similar to $\cos x$, does $\frac{d}{dx}\cosh x$ also have a negative sign? Derive it from the exponential definition and check."
2. "When you differentiate $\sinh x=\frac{e^x-e^{-x}}{2}$ term by term, what happens to the sign of the $e^{-x}$ term under the chain rule?"
3. "For $h(x)=\cosh(3x^2)$, what is $g(x)$ and what is $g'(x)$ — and does your answer for $h'(x)$ include both pieces?"

## Teaching Sequence
1. **Anchor in `math.trig.hyperbolic-functions` and `math.calc.derivative-exponential`**: state directly, "you know these functions and you know how to differentiate exponentials — today you combine them to get the hyperbolic derivatives, and you'll see exactly where they differ from trig."
2. **Contrast pair (breaks MC-1)**: $\frac{d}{dx}\cosh x=\sinh x$ stated directly beside $\frac{d}{dx}\cos x=-\sin x$, making the sign difference the first thing seen.
3. **Conceptual shift (derivation)**: the full exponential-definition derivation of both formulas, showing the sign behavior is forced by the algebra.
4. **Reused procedure (breaks MC-2)**: the chain-rule application to $h(x)=\cosh(3x^2)$, with $g(x)$ and $g'(x)$ identified explicitly before differentiating.
5. **Mastery gate**: 4-item problem set (state both base formulas and explain the absent sign; derive $\frac{d}{dx}\cosh x$ from the exponential definition; differentiate $\sinh(4x)$; differentiate $\cosh(x^2+1)$) plus 1 independence-mode transfer probe (the catenary cable-slope scenario connecting the sign-free property to a real physical model).

## Tutor Actions
- **Contrast pair**: the sign-free hyperbolic derivatives stated directly beside the sign-flipping trig derivatives.
- **Conceptual shift**: the full exponential-definition derivation of both formulas.
- **Reused procedure**: the chain-rule application with explicit inner-function identification.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring the catenary cable-slope derivative and an explanation of the sign-free property.

## Voice Teaching Notes
- Open with the explicit contrast framing: "these look like trig derivatives, but there's exactly one difference — no sign flip — and you'll see why from the algebra."
- For MC-1, whenever a hyperbolic derivative is stated, ask "does this one have a negative sign, or not — and why?"
- For MC-2, before differentiating any hyperbolic function of a composite argument, require the learner to state $g(x)$ and $g'(x)$ explicitly first.

## Assessment Signals
- **Early warning for MC-1**: stating $\frac{d}{dx}\cosh x=-\sinh x$ (with the incorrect negative sign).
- **Early warning for MC-2**: differentiating a composite-argument hyperbolic function and omitting the chain-rule factor $g'(x)$.
- **Mastery evidence**: correctly stating both base derivative formulas with the correct (absent) sign, and correctly applying the chain rule to a fresh composite-argument hyperbolic function.

## Tutor Recovery Strategy
- On MC-1: re-derive $\frac{d}{dx}\cosh x$ from the exponential definition with the learner performing each differentiation step aloud, isolating exactly where the sign resolves to positive.
- On MC-2: rework a FRESH composite-argument example (different $g(x)$ than already seen) requiring the learner to state $g(x)$ and $g'(x)$ before differentiating.
- If a learner correctly states both base formulas and applies the chain rule but cannot articulate WHY hyperbolic derivatives lack the trig sign flip, revisit the exponential-derivation demonstration before proceeding.

## Memory Hooks
- "No flip — hyperbolic derivatives never pick up a minus sign" — for MC-1.
- "Name $g$, find $g'$, then multiply" — for MC-2, the standing chain-rule discipline.

## Transfer Connections
- **`math.trig.hyperbolic-functions`** (prerequisite, already authored): supplies the exponential definitions of $\sinh,\cosh,\tanh$ this concept's derivation starts from, and had already previewed at orientation level that the derivative sign pattern would need independent verification — this concept resolves that preview precisely.
- **`math.calc.derivative-exponential`** (prerequisite, already authored): supplies the exponential differentiation rule and chain-rule mechanism this concept's own derivation applies twice, once for each hyperbolic function's definition.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses the catenary curve $y=a\cosh(x/a)$ (a hanging cable's real physical shape) as the application vehicle, connecting the sign-free derivative property to genuine physical and historical significance, though not a formal KG cross-link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.hyperbolic-derivatives.md`. All three worked examples (the sign contrast between $\cosh x$ and $\cos x$'s derivatives; the exponential-definition derivation of $\frac{d}{dx}\sinh x=\cosh x$; the chain-rule application to $h(x)=\cosh(3x^2)$), the complete misconception registry (MC-1 Foundational, MC-2 Foundational, neither carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the catenary cable-slope scenario, differentiating $y(x)=a\cosh(x/a)$ via the chain rule and explaining the absence of a sign change, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- This entry, along with `math.calc.trig-integrals` authored the same batch, is the second of the two concepts Batch 58's own forward-planning note identified as the exact blockers on `math.calc`'s remaining frontier — authoring `math.trig.hyperbolic-functions` (Batch 59) specifically unblocked this concept, since its other prerequisite, `math.calc.derivative-exponential`, was already authored.

## Version History
- **2026-09-13 (Batch 60)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.hyperbolic-functions` (Batch 59) and `math.calc.derivative-exponential`. One of four concepts authored this batch (companions: `math.calc.trig-integrals`, `math.trig.double-angle-formulas`, `math.seq.divergent-sequence`). `math.calc` moves from 66/76 toward 68/76 this batch.
