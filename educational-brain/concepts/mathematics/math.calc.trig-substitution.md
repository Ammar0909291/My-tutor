# math.calc.trig-substitution — Trigonometric Substitution

## Identity
- **KG id**: `math.calc.trig-substitution`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.trig-integrals`, `math.trig.trig-identities`
- **Unlocks**: `math.calc.partial-fractions`
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.7 · **Estimated hours**: 8

## Learning Objective
The learner substitutes $x=a\sin\theta$ for integrands containing $\sqrt{a^2-x^2}$, using $1-\sin^2\theta=\cos^2\theta$ and back-substituting via a right-triangle reference diagram; distinguishes and correctly selects among $x=a\tan\theta$ for $\sqrt{a^2+x^2}$ and $x=a\sec\theta$ for $\sqrt{x^2-a^2}$ based on the radical's algebraic shape; and recognizes, at an orientation level, that converting definite-integral bounds directly into $\theta$-values avoids back-substitution entirely.

## Core Understanding
`math.calc.trig-integrals` already owns the parity/structure-driven strategy-selection PRINCIPLE — checking a structural feature of the integrand before choosing a technique — and `math.trig.trig-identities` already owns the three Pythagorean-family identities. This concept does not re-derive either; it applies the SAME "check structure first" principle to a new, analogous three-way selection, driven by the algebraic sign pattern under a square root rather than an exponent's parity.

**Matching the radical's shape to the correct substitution is the whole strategy**: exactly one of the three Pythagorean-family identities eliminates each radical shape. $1-\sin^2\theta=\cos^2\theta$ turns $a^2-x^2$ (via $x=a\sin\theta$) into $a^2\cos^2\theta$, a perfect square. $1+\tan^2\theta=\sec^2\theta$ turns $a^2+x^2$ (via $x=a\tan\theta$) into $a^2\sec^2\theta$. $\sec^2\theta-1=\tan^2\theta$ turns $x^2-a^2$ (via $x=a\sec\theta$) into $a^2\tan^2\theta$. The choice among the three substitutions is dictated entirely by which shape is under the root — not by preference or habit.

**The substitution is a package deal — $x$ and $dx$ both change together**: just as ordinary $u$-substitution requires replacing BOTH the inner expression and the differential, trig substitution requires substituting $dx$ (e.g. $dx=a\cos\theta\,d\theta$ for $x=a\sin\theta$) at the same time as $x$ itself. Leaving $dx$ unconverted breaks the integral's internal consistency exactly as surely as forgetting $du$ would in ordinary substitution.

**Back-substitution via a right triangle, and the definite-integral shortcut that skips it**: after integrating in $\theta$, an INDEFINITE integral's answer must be converted back into $x$ — done by building a right triangle encoding the substitution (e.g. for $x=a\sin\theta$: opposite $=x$, hypotenuse $=a$, adjacent $=\sqrt{a^2-x^2}$) and reading off whichever trig ratio of $\theta$ appears in the antiderivative. For a DEFINITE integral, converting the BOUNDS themselves into $\theta$-values at the outset (solving $\theta=\arcsin(x/a)$, etc., at each bound) lets the entire evaluation happen in $\theta$, skipping the triangle-based back-substitution — a genuine shortcut, but one that only works because bounds exist to convert; it does NOT extend to indefinite integrals, which have no bounds at all.

## Mental Models
- **The sign under the root picks the substitution, not preference.** $a^2-x^2$, $a^2+x^2$, and $x^2-a^2$ each have exactly one matching Pythagorean identity — checking the sign pattern first is mandatory, not optional.
- **Variable and differential travel together.** Exactly as $u$-substitution never leaves $du$ behind, trig substitution never leaves $dx$ unconverted — both change as one package.
- **The bound-conversion shortcut only exists because bounds exist.** Skipping back-substitution on a definite integral works precisely because there ARE numeric bounds to convert into $\theta$-values — an indefinite integral has none, so the triangle step remains mandatory there.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: once a learner successfully applies $x=a\sin\theta$ to one radical, it is natural to assume the same substitution handles any square root of a quadratic, missing that the algebraic sign pattern under the root determines which of the three substitutions is actually required.
- **MC-2** is a **Type 1 (overgeneralization)** carried over from a DIFFERENT source than `math.calc.trig-integrals`' own analogous discipline: having correctly substituted $x$ for $\theta$, a learner may treat the substitution as complete without recognizing $dx$ requires the same treatment — this is the identical "package deal" oversight already documented for ordinary $u$-substitution.
- **MC-3** is a **Type 5 (instruction-induced)** gap: seeing the definite-integral bound-conversion shortcut work cleanly in one example, without an explicit statement of WHY it works (because bounds exist to convert), invites extending it to indefinite integrals where no such bounds are available.

## Misconceptions
**MC-1 — SINGLE-SUBSTITUTION-FOR-ANY-RADICAL** *(Foundational)*
- Surface form: attempting $x=2\sin\theta$ on $\sqrt{x^2-4}$ (an $x^2-a^2$ shape), the same substitution that correctly handles $\sqrt{4-x^2}$ (an $a^2-x^2$ shape).
- Root cause: overgeneralizing from one successful application to the whole family of square-root integrands, without checking the sign pattern under the root.
- Repair: attempt the mismatched substitution explicitly and show the failure — $x=2\sin\theta$ on $\sqrt{x^2-4}$ gives $\sqrt{4\sin^2\theta-4}=\sqrt{-4\cos^2\theta}$, a negative quantity under a root, proving the wrong choice does not merely produce extra work, it literally breaks.

**MC-2 — DIFFERENTIAL-LEFT-UNSUBSTITUTED** *(High)*
- Surface form: substituting $x=2\sin\theta$ into the integrand but leaving $dx$ as bare $dx$ rather than converting it to $2\cos\theta\,d\theta$.
- Root cause: treating $x$'s replacement as the entire substitution, missing that the differential must transform alongside it.
- Repair: re-walk the full substitution explicitly, showing $dx=2\cos\theta\,d\theta$ is derived and multiplied in at the SAME step as $x=2\sin\theta$ — never one without the other, exactly as $u$ and $du$ travel together in ordinary substitution.

**MC-3 — BOUND-SHORTCUT-OVERGENERALIZED-TO-INDEFINITE** *(Moderate)*
- Surface form: attempting to skip back-substitution on an INDEFINITE integral, believing the same shortcut that worked for a definite integral applies universally.
- Root cause: the shortcut's dependence on having numeric bounds to convert is not made explicit, so its scope is overgeneralized past that condition.
- Repair: state directly that the shortcut worked ONLY because specific $x$-bounds were converted into $\theta$-bounds at the start — an indefinite integral has no bounds at all, so its final answer must be expressed in terms of $x$, and the triangle-based back-substitution is the only route there.

## Analogies
- **The u-substitution-parallel analogy**: exactly as ordinary $u$-substitution requires both $u$ and $du$ to change together, trig substitution requires both $x$ and $dx$ to change together — the same "package deal" discipline, applied to a trigonometric replacement instead of an algebraic one.
- **Anti-analogy — one substitution does NOT fit every radical.** This is MC-1's exact error: unlike a single tool that works everywhere, each of the three radical shapes has exactly one matching substitution, and applying the wrong one produces an outright algebraic breakdown (a negative number under a square root), not merely an inefficient path.

## Demonstrations
1. **The full sine-substitution derivation with triangle back-substitution**: $\int\frac{dx}{x^2\sqrt{4-x^2}}$, substituting $x=2\sin\theta$, $dx=2\cos\theta\,d\theta$, integrating to $-\frac14\cot\theta+C$, then back-substituting via the triangle to $-\frac{\sqrt{4-x^2}}{4x}+C$ — directly breaking MC-2 by making the $dx$ conversion an explicit, visible step.
2. **The paired tan/sec contrast, including an explicit failure**: computing $\int\frac{dx}{\sqrt{x^2+4}}$ (tan substitution) beside $\int\frac{dx}{\sqrt{x^2-4}}$ (sec substitution), then showing $x=2\sin\theta$ applied to the second produces $\sqrt{-4\cos^2\theta}$ — directly breaking MC-1.
3. **The definite-integral bound-conversion shortcut**: $\int_0^{\sqrt3}\frac{dx}{\sqrt{4-x^2}}$ evaluated entirely in $\theta$ by converting the bounds first (yielding $\pi/3$), contrasted against the same result obtained via full back-substitution to $\arcsin(x/2)$ — directly breaking MC-3 by naming exactly why the shortcut works only when bounds exist.

## Discovery Questions
1. "Can $\sqrt{x^2-9}$ and $\sqrt{9-x^2}$ both be handled with the substitution $x=3\sin\theta$? Try applying it to both and see what happens."
2. "When substituting $x=2\sin\theta$ into an integral, is it acceptable to replace $x$ but leave $dx$ unchanged?"
3. "The bound-conversion shortcut let you skip back-substitution on a definite integral. Would that same shortcut work on an indefinite integral, which has no bounds at all?"

## Teaching Sequence
1. **Anchor in `math.calc.trig-integrals` and `math.trig.trig-identities`**: state directly, "you already know to check structure before choosing a technique, and you already know the three Pythagorean identities — today you apply both to a new three-way choice, driven by what's under a square root."
2. **Representation shift (breaks MC-1)**: matching each of the three radical shapes to its one correct substitution, including the paired tan/sec contrast and the explicit failure of the wrong choice.
3. **Conflict evidence (breaks MC-2)**: the full sine-substitution worked example, with the $dx$ conversion made an explicit, non-skippable step.
4. **Contrast pair (breaks MC-3)**: the definite-integral bound-conversion shortcut contrasted against the mandatory triangle back-substitution for indefinite integrals.
5. **Mastery gate**: 4-item problem set (full sine-substitution with back-substitution; tan-substitution to the $\ln|\sec\theta+\tan\theta|$ form with back-substitution; explaining why $x=3\sin\theta$ fails on $1/\sqrt{x^2-9}$; setting up the substitution for $\int x^3\sqrt{x^2-4}\,dx$ without full evaluation) plus 1 independence-mode transfer probe (a cable-tension engineering scenario covering all three teaching points: substitution setup, differential conversion, and the definite-integral shortcut).

## Tutor Actions
- **Representation shift**: matching each radical shape to its one correct substitution, with an explicit demonstrated failure of a mismatched choice.
- **Conflict evidence**: the full sine-substitution derivation, with the $dx$ conversion made explicit.
- **Contrast pair**: the definite-integral shortcut against the mandatory indefinite-integral back-substitution.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring substitution setup, differential conversion, and the bound-conversion shortcut.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "you already know to check structure first and you already know the three Pythagorean identities — today's whole job is matching the RIGHT radical shape to the right substitution."
- For MC-1, before any substitution, ask "what's the sign pattern under the root — minus, plus, or reversed minus — and which substitution does that require?"
- For MC-2, immediately after any $x$-substitution, ask "what does $dx$ become?" before continuing.
- For MC-3, whenever a shortcut is applied, ask "are there numeric bounds here to convert, or is this an indefinite integral?"

## Assessment Signals
- **Early warning for MC-1**: applying the same substitution to radicals with different sign patterns under the root.
- **Early warning for MC-2**: substituting $x$ but leaving $dx$ unconverted in the integral.
- **Early warning for MC-3**: attempting to skip back-substitution on an indefinite integral.
- **Mastery evidence**: correctly identifying which of the three substitutions applies to a fresh radical based on its sign pattern, correctly converting both $x$ and $dx$ together, and correctly distinguishing when the bound-conversion shortcut applies versus when full back-substitution is mandatory.

## Tutor Recovery Strategy
- On MC-1: require the learner to state the sign pattern under the root explicitly BEFORE choosing a substitution, and show the algebraic failure when a mismatched substitution is attempted.
- On MC-2: rework a fresh substitution with the learner writing $dx$'s converted form immediately after $x$'s, never as an afterthought.
- On MC-3: present a fresh indefinite integral immediately after a definite-integral shortcut example and require the learner to explain why the shortcut cannot apply there.
- If a learner correctly selects and executes all three substitutions but cannot perform the triangle-based back-substitution, treat this as a distinct diagram-construction gap and route to dedicated right-triangle-labeling practice.

## Memory Hooks
- "Match the sign under the root to the one substitution that fits" — for MC-1.
- "x and dx change together, always" — for MC-2.
- "No bounds, no shortcut — back-substitute" — for MC-3.

## Transfer Connections
- **`math.calc.trig-integrals`** (prerequisite, already authored): supplies the parity/structure-driven strategy-selection PRINCIPLE this concept directly extends to a three-way radical-shape selection, reusing the "check structure before acting" framing rather than re-deriving it.
- **`math.trig.trig-identities`** (prerequisite, already authored): supplies the three Pythagorean-family identities, each of which eliminates exactly one of this concept's three radical shapes.
- **`math.calc.partial-fractions`** (unlocked, not yet authored): a further integration-technique-selection concept, continuing the same "identify structure, choose the matching technique" discipline this concept and `trig-integrals` both establish.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a cable-tension engineering context ($\int dx/\sqrt{x^2+9}$) purely as an application vehicle, not a formal cross-subject curriculum link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.trig-substitution.md`. All three worked examples (the full sine substitution with triangle back-substitution for $\int dx/(x^2\sqrt{4-x^2})$; the paired tan/sec contrast for $\sqrt{x^2+4}$ vs. $\sqrt{x^2-4}$, including the explicit failure of the mismatched substitution; the definite-integral bound-conversion shortcut for $\int_0^{\sqrt3}dx/\sqrt{4-x^2}$), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.calc.partial-fractions`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the cable-tension engineering scenario requiring shape identification, full substitution including the differential, triangle-based back-substitution reasoning, and the definite-integral shortcut, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- This entry closes math.calc's frontier at the time of authoring — it is the sole concept unblocked by Batch 60's completion of both `trig-integrals` and (indirectly, via `math.trig.trig-identities`, already long-authored) its own second prerequisite.

## Version History
- **2026-09-13 (Batch 61)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.calc.trig-integrals` (Batch 60) and `math.trig.trig-identities` (Batch 55). One of four concepts authored this batch (companions: `math.trig.half-angle-formulas`, `math.seq.arithmetic-series`, `math.seq.telescoping-series`). `math.calc` moves from 68/76 toward 69/76 this batch.
