# math.calc.trig-integrals — Trigonometric Integrals

## Identity
- **KG id**: `math.calc.trig-integrals`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.u-substitution`, `math.trig.product-to-sum`
- **Unlocks**: `math.calc.trig-substitution`
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.75 · **Estimated hours**: 8

## Learning Objective
The learner integrates $\int\sin^nx\cos^mx\,dx$ when at least one exponent is odd by peeling off one factor of the odd power, converting the remaining even power via the Pythagorean identity, and applying `math.calc.u-substitution` directly; integrates the same family when both exponents are even by applying the double-angle identities from `math.trig.product-to-sum` to reduce the power before integrating; and recognizes, at an orientation level, that $\int\tan^nx\sec^mx\,dx$ requires its own analogous parity-based case analysis.

## Core Understanding
`math.calc.u-substitution` already owns the general substitution technique, and `math.trig.product-to-sum` already owns the product-to-sum and double-angle formulas. This concept does not re-derive either — it owns the STRATEGY-SELECTION logic: recognizing from the exponents' parities which of the two already-mastered tools actually applies, and diagnosing when the "obvious" substitution attempt will stall.

**An odd exponent is what makes u-substitution work directly**: for $\int\sin^nx\cos^mx\,dx$ with $n$ ODD, write $\sin^nx=\sin^{n-1}x\cdot\sin x$, where $n-1$ is now EVEN. Convert $\sin^{n-1}x$ using $\sin^2x=1-\cos^2x$, leaving the entire integrand as a polynomial in $\cos x$ multiplied by the single leftover factor $\sin x\,dx$ — exactly the $du$ needed for the substitution $u=\cos x$ ($du=-\sin x\,dx$). This technique fundamentally requires an ODD leftover power to isolate that single "du-matching" factor.

**When both exponents are even, the odd-power technique has no leftover factor to isolate, so double-angle reduction is required instead**: there is no single stray factor to peel off — every factor pairs up evenly. Instead, apply $\sin^2x=\frac{1-\cos2x}{2}$ and $\cos^2x=\frac{1+\cos2x}{2}$ (direct consequences of the already-mastered product-to-sum/double-angle family) to rewrite the integrand in terms of $\cos2x$, $\cos4x$, etc. — reducing the power before integrating, a genuinely different strategy from the substitution case.

**$\int\tan^nx\sec^mx\,dx$ requires its own, analogous parity-based case analysis** (orientation level): using $\tan^2x=\sec^2x-1$ and $\frac{d}{dx}\tan x=\sec^2x$, $\frac{d}{dx}\sec x=\sec x\tan x$: if $m$ is EVEN, split off $\sec^2x$ and substitute $u=\tan x$; if $n$ is ODD, split off $\sec x\tan x$ and substitute $u=\sec x$. The SAME parity-driven principle, applied to a different function pair, with the full reduction-formula family (neither $n$ odd nor $m$ even) deliberately left beyond this concept's own scope.

## Mental Models
- **Odd power leaves a matching factor.** Splitting off one factor from an odd exponent always leaves exactly the piece a substitution's $du$ needs — this is the whole mechanism behind LO1.
- **Both even means no stray factor — reduce the power instead.** When every factor pairs up evenly, substitution has nothing to grab onto, and double-angle reduction becomes the only route.
- **Same decision, new function pair.** The parity-check-first discipline transfers directly from sin/cos to tan/sec — check which power lets you isolate a clean substitution factor before choosing a technique.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: having successfully substituted $u=\sin x$ or $u=\cos x$ on one example with a convenient odd exponent, a learner may assume this substitution technique works for ANY $\int\sin^nx\cos^mx\,dx$, missing that it specifically requires an odd leftover power to isolate the matching factor.
- **MC-2** is a **Type 5 (instruction-induced)** gap: if double-angle/product-to-sum reduction is first demonstrated only on DIFFERENT-argument products (like $\sin3x\cos x$, `math.trig.product-to-sum`'s own worked examples), a learner has no signal that the identical technique also resolves the SAME-argument both-even case, since the two uses look superficially unrelated.
- **MC-3** is a **Type 1 (overgeneralization)**: once one technique (say, odd-power substitution) succeeds on several problems, it is natural to assume it is THE universal method for the whole family of trig integrals, missing that the correct strategy is selected by case analysis on the exponents' parities each time.

## Misconceptions
**MC-1 — TRIG-SUBSTITUTION-APPLIED-REGARDLESS-OF-PARITY** *(Foundational)*
- Surface form: attempting $u=\sin x$ or $u=\cos x$ directly on $\int\sin^2x\cos^2x\,dx$ (both exponents even), and getting stuck with no matching $du$ factor available.
- Root cause: overgeneralizing from odd-exponent successes to the whole family, without checking whether an odd leftover power actually exists to isolate.
- Repair: attempt the substitution explicitly and show the stall — after peeling one factor from an EVEN exponent, an odd power remains stranded with no clean pairing for $du$; only an ODD exponent produces a usable leftover factor.

**MC-2 — DOUBLE-ANGLE-REDUCTION-ASSUMED-LIMITED-TO-DIFFERENT-ARGUMENTS** *(Moderate)*
- Surface form: believing double-angle/product-to-sum reduction only applies when the two trig functions have DIFFERENT arguments (like $\sin3x\cos x$), not to same-argument even powers like $\sin^2x\cos^2x$.
- Root cause: the two uses of the identical formula family are introduced in visually distinct settings, with no explicit bridge drawn between them.
- Repair: re-walk $\sin^2x\cos^2x=\frac{(1-\cos2x)(1+\cos2x)}{4}=\frac{1-\cos^22x}{4}=\frac{1-\cos4x}{8}$ step by step, showing the identical double-angle substitution mechanically resolving the same-argument even-power case.

**MC-3 — ONE-UNIVERSAL-TECHNIQUE-ASSUMED-FOR-ALL-TRIG-INTEGRALS** *(Foundational)*
- Surface form: expecting a single fixed method to solve every $\int\sin^nx\cos^mx\,dx$ or $\int\tan^nx\sec^mx\,dx$, regardless of the exponents.
- Root cause: repeated success with one technique on a run of similar problems obscures that the technique's applicability is conditional on the exponents' parities.
- Repair: contrast $\int\sin^3x\cos^2x\,dx$ (odd exponent present, substitution works) against $\int\sin^2x\cos^2x\,dx$ (both even, substitution stalls, double-angle reduction required instead) side by side, making the parity check the first and non-negotiable step.

## Analogies
- **The sorting-before-solving analogy**: exactly like choosing between factoring techniques based on a polynomial's structure before committing to one, choosing between substitution and double-angle reduction requires first inspecting the exponents' parities.
- **Anti-analogy — one success does NOT certify a technique universally.** This is MC-3's exact error: a technique that worked on an odd-exponent example carries no guarantee for an even-exponent one — the parity check must be re-run every time, not assumed from precedent.

## Demonstrations
1. **The odd-power split and substitution**: $\int\sin^3x\cos^2x\,dx=\int(1-\cos^2x)\cos^2x\sin x\,dx\xrightarrow{u=\cos x}-\int(1-u^2)u^2\,du=-\frac{\cos^3x}{3}+\frac{\cos^5x}{5}+C$ — directly breaking MC-1 by showing exactly where the odd exponent supplies the matching $du$ factor.
2. **The both-even double-angle reduction**: $\int\sin^2x\cos^2x\,dx=\int\frac{1-\cos4x}{8}\,dx=\frac{x}{8}-\frac{\sin4x}{32}+C$ — directly breaking MC-2 by applying the same-argument reduction the learner may have thought inapplicable there.
3. **The parity-based decision made explicit, side by side**: contrasting $\int\sin^3x\cos^2x\,dx$ (odd present → substitute) against $\int\sin^2x\cos^2x\,dx$ (both even → reduce) — directly breaking MC-3 by forcing a parity check before any technique is chosen.

## Discovery Questions
1. "For $\int\sin^3x\cos^2x\,dx$, if you split off one factor of $\sin x$, what is left — and is that leftover power even or odd?"
2. "Does the double-angle identity $\sin^2x=\frac{1-\cos2x}{2}$ require the two trig functions to have different arguments, or does it apply to $\sin^2x$ all by itself?"
3. "If substitution worked for $\int\sin^3x\cos^2x\,dx$, will the same substitution work for $\int\sin^2x\cos^2x\,dx$? Try it and see what happens."

## Teaching Sequence
1. **Anchor in `math.calc.u-substitution` and `math.trig.product-to-sum`**: state directly, "you already know how to substitute and you already know the double-angle formulas — today you learn WHICH one to use, and when."
2. **Representation shift (breaks MC-1)**: the full odd-power split, Pythagorean-identity conversion, and substitution for $\int\sin^3x\cos^2x\,dx$.
3. **Conflict evidence (breaks MC-2)**: the direct stall when attempting substitution on $\int\sin^2x\cos^2x\,dx$, followed by the successful double-angle reduction of the SAME integral.
4. **Contrast pair (breaks MC-3)**: the odd-vs-even side-by-side comparison, establishing the parity check as the mandatory first step.
5. **Orientation preview**: the tan/sec family's analogous even-secant/odd-tangent split, stated as the same principle applied to a new function pair, without deriving the full reduction-formula family.
6. **Mastery gate**: 4-item problem set (compute $\int\sin^5x\,dx$ identifying the odd exponent; compute $\int\cos^4x\,dx$ via double-angle reduction; determine without solving which strategy applies to $\int\sin^4x\cos^3x\,dx$; compute $\int\tan^2x\sec^4x\,dx$ via the even-secant split) plus 1 independence-mode transfer probe (an AC-power engineering scenario requiring parity-based strategy selection and diagnosis of a failed substitution attempt).

## Tutor Actions
- **Representation shift**: the odd-power split and substitution for $\int\sin^3x\cos^2x\,dx$.
- **Conflict evidence**: the substitution stall on $\int\sin^2x\cos^2x\,dx$, resolved instead by double-angle reduction.
- **Contrast pair**: the odd-vs-even parity check made explicit and mandatory.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring parity diagnosis and a failed-substitution explanation.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "you know substitution, you know the double-angle formulas — today is entirely about CHOOSING between them correctly."
- For MC-1, before any substitution attempt, ask "which exponent is odd, and what factor does that odd exponent leave you?"
- For MC-2, whenever a same-argument even power appears, ask "does this look like the double-angle case, even though it's not two different arguments multiplied together?"
- For MC-3, after any successful technique, ask "would this SAME technique work if I changed one exponent's parity? Check before assuming."

## Assessment Signals
- **Early warning for MC-1**: attempting $u=\sin x$ or $u=\cos x$ on a both-even integrand without first checking for an odd exponent.
- **Early warning for MC-2**: correctly using double-angle reduction on different-argument products but failing to apply it to same-argument even powers.
- **Early warning for MC-3**: applying the same technique to every trig-integral problem regardless of the exponents, without a parity check.
- **Mastery evidence**: correctly identifying which technique applies to a fresh $\int\sin^nx\cos^mx\,dx$ based purely on the exponents' parities, and correctly diagnosing WHY a mismatched technique would fail.

## Tutor Recovery Strategy
- On MC-1: require the learner to explicitly state the parity of BOTH exponents before attempting any substitution, and show the exact stall point when an even exponent is (incorrectly) split.
- On MC-2: rework a same-argument even-power case with the learner performing the double-angle substitution step by step, connecting it explicitly to the different-argument case they already trust.
- On MC-3: present a fresh pair of integrals differing only in one exponent's parity and require the learner to select and justify the correct technique for each before solving.
- If a learner masters the sin/cos strategy split but cannot transfer the same parity-check discipline to tan/sec, treat this as a distinct transfer gap and route to dedicated tan/sec parity practice.

## Memory Hooks
- "Odd power, one factor left over — that's your $du$" — for LO1/MC-1.
- "Both even, nothing to peel — reduce with double-angle" — for LO2/MC-2.
- "Check the parity before you pick the tool" — for MC-3.

## Transfer Connections
- **`math.calc.u-substitution`** (prerequisite, already authored): supplies the general substitution technique this concept's odd-power case directly applies, without re-deriving it.
- **`math.trig.product-to-sum`** (prerequisite, already authored): supplies the double-angle identities (a direct consequence of that concept's product-to-sum formulas) this concept's both-even case relies on.
- **`math.calc.trig-substitution`** (unlocked, not yet authored): uses trigonometric identities in the REVERSE direction — substituting a trig expression IN to simplify an algebraic integral — building directly on the identity fluency this concept establishes.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses an electrical-engineering context (average AC power via $\int\sin^2(\omega t)\cos^2(\omega t)\,dt$) purely as an application vehicle, not a formal cross-subject curriculum link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.trig-integrals.md`. All three worked examples (the odd-power split and substitution for $\int\sin^3x\cos^2x\,dx$; the both-even double-angle reduction of $\int\sin^2x\cos^2x\,dx$; the orientation-level tan/sec parity split), the complete misconception registry (MC-1 Foundational, MC-2 Moderate, MC-3 Foundational, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.calc.trig-substitution`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the AC-power engineering scenario contrasting the parity-based strategy for $\int\sin^2(\omega t)\cos^2(\omega t)\,dt$ against a failed direct-substitution attempt and the distinct tan/sec technique, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- This entry, along with `math.calc.hyperbolic-derivatives` authored the same batch, is one of the two concepts Batch 58's own forward-planning note identified as the exact blockers on `math.calc`'s remaining frontier — authoring `math.trig.product-to-sum` (Batch 59) specifically unblocked this concept.

## Version History
- **2026-09-13 (Batch 60)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.calc.u-substitution` and `math.trig.product-to-sum` (Batch 59). One of four concepts authored this batch (companions: `math.calc.hyperbolic-derivatives`, `math.trig.double-angle-formulas`, `math.seq.divergent-sequence`). `math.calc` moves from 66/76 toward 68/76 this batch.
