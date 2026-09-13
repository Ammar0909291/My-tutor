# math.trig.double-angle-formulas — Double-Angle Formulas

## Identity
- **KG id**: `math.trig.double-angle-formulas`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.sum-difference-formulas`
- **Unlocks**: `math.trig.half-angle-formulas`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 4

## Learning Objective
The learner derives $\sin2\theta=2\sin\theta\cos\theta$ and the three equivalent forms of $\cos2\theta$ from the sum formulas by setting $A=B=\theta$, derives $\tan2\theta=\frac{2\tan\theta}{1-\tan^2\theta}$ the same way, selects the most efficient form of $\cos2\theta$ based on what is given, and derives the power-reducing identities $\sin^2\theta=\frac{1-\cos2\theta}{2}$ and $\cos^2\theta=\frac{1+\cos2\theta}{2}$ by rearrangement.

## Core Understanding
`math.trig.sum-difference-formulas` already derived the four sum/difference identities as its own capstone content. This concept does not re-derive those — it applies them at the single specific substitution $A=B=\theta$, showing that the double-angle formulas are not a new fact family but a direct special case of what is already known.

**The double-angle formulas fall out of setting $A=B=\theta$ in the already-known sum formulas**: starting from $\sin(A+B)=\sin A\cos B+\cos A\sin B$ and setting $A=B=\theta$: $\sin(\theta+\theta)=\sin\theta\cos\theta+\cos\theta\sin\theta=2\sin\theta\cos\theta$. So $\sin2\theta=2\sin\theta\cos\theta$ — a PRODUCT, not $2\times\sin\theta$; the formula's whole content is that doubling the angle is NOT the same as doubling the function's output.

**Three equivalent forms of $\cos2\theta$ exist, each optimal for a different situation**: starting from $\cos(A+B)=\cos A\cos B-\sin A\sin B$ with $A=B=\theta$: $\cos2\theta=\cos^2\theta-\sin^2\theta$ (Form 1, needs both). Substituting the Pythagorean identity $\sin^2\theta=1-\cos^2\theta$: $\cos2\theta=2\cos^2\theta-1$ (Form 2, needs only $\cos\theta$). Substituting $\cos^2\theta=1-\sin^2\theta$ instead: $\cos2\theta=1-2\sin^2\theta$ (Form 3, needs only $\sin\theta$). The three forms are algebraically identical — the choice among them is purely about which minimizes computational steps given what is available.

**$\tan2\theta$ follows the same substitution pattern**: from $\tan(A+B)=\frac{\tan A+\tan B}{1-\tan A\tan B}$ with $A=B=\theta$: $\tan2\theta=\frac{2\tan\theta}{1-\tan^2\theta}$ — the DENOMINATOR is essential, not decorative: it becomes zero exactly when $2\theta=90°+n\cdot180°$, correctly signaling that $\tan2\theta$ is undefined there.

**The power-reducing identities are simply Forms 2 and 3 solved for the squared terms**: rearranging $\cos2\theta=2\cos^2\theta-1$ gives $\cos^2\theta=\frac{1+\cos2\theta}{2}$; rearranging $\cos2\theta=1-2\sin^2\theta$ gives $\sin^2\theta=\frac{1-\cos2\theta}{2}$ — these are the standard tools for integrating $\sin^2x$ and $\cos^2x$ in calculus (the exact mechanism `math.calc.trig-integrals`'s own LO2 uses to reduce both-even-power trig integrals).

## Mental Models
- **Double-angle is one substitution away, not a new fact.** Setting $A=B=\theta$ in an already-mastered sum formula produces every double-angle formula — nothing here needs separate memorization if the sum formulas are solid.
- **Three forms, one identity, pick the cheapest.** $\cos2\theta$'s three forms are algebraically the same statement; the only question is which one avoids an extra step given what you're handed.
- **The denominator in $\tan2\theta$ is not optional.** $1-\tan^2\theta=0$ exactly where $\tan2\theta$ genuinely IS undefined — dropping the denominator produces a formula that lies about where the function is defined.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: the notation "$2\theta$" looks like "twice the input to $\sin$," and everyday linear intuition (doubling an input doubles a linear function's output) overgeneralizes onto $\sin$, which is not linear — $\sin(2\theta)\ne2\sin(\theta)$.
- **MC-2** is a **Type 5 (instruction-induced)** gap: if only one form of $\cos2\theta$ (typically Form 1, $\cos^2\theta-\sin^2\theta$) is emphasized in practice, a learner never develops the habit of selecting the form that matches what is actually given, defaulting to the memorized one even when it requires an unnecessary extra step.
- **MC-3** is a **Type 4 (notation-induced)** gap: the visual similarity between $\tan2\theta$ and "$2\tan\theta$" (both start with "2 tan") invites dropping the denominator entirely, treating the formula as if it were simply the numerator.

## Misconceptions
**MC-1 — DOUBLE-ANGLE-SCALING** *(Foundational)*
- Surface form: writing $\sin2\theta=2\sin\theta$, treating $2\theta$ as a scalar multiplication on the function's output.
- Root cause: everyday linear intuition (doubling the input doubles the output) overgeneralizes onto $\sin$, which is not a linear function.
- Repair: derive $\sin2\theta$ from the sum formula directly — $\sin(\theta+\theta)=\sin\theta\cos\theta+\cos\theta\sin\theta=2\sin\theta\cos\theta$ — a PRODUCT involving both $\sin\theta$ and $\cos\theta$, never just $2\sin\theta$.

**MC-2 — WRONG-COS-DOUBLE-FORM**
- Surface form: using $\cos^2\theta-\sin^2\theta$ (Form 1) when only $\cos\theta$ is given, requiring an unnecessary extra step to find $\sin\theta$ first.
- Root cause: only one form was practiced heavily, so the habit of matching the form to what is given never formed.
- Repair: given $\cos\theta=\frac{3}{5}$ alone, use Form 2 directly: $\cos2\theta=2\left(\frac{3}{5}\right)^2-1=-\frac{7}{25}$ in one line, no need to find $\sin\theta$ at all — contrasted against the two-step route through Form 1.

**MC-3 — TAN-DOUBLE-NO-DENOMINATOR**
- Surface form: writing $\tan2\theta=2\tan\theta$, omitting the $(1-\tan^2\theta)$ denominator.
- Root cause: the visual similarity between "$\tan2\theta$" and "$2\tan\theta$" invites treating the formula as just the numerator.
- Repair: given $\tan\theta=1$, show that $2\tan\theta=2$ is a perfectly ordinary finite number, but the TRUE value $\tan2\theta=\tan90°$ is undefined — the denominator $1-\tan^2\theta=1-1=0$ is exactly what correctly signals this, and dropping it produces a formula that is silently wrong at every point where the real function is undefined.

## Analogies
- **The one-substitution analogy**: exactly as `math.trig.sum-difference-formulas` itself derives cofunction identities as a pure special case of the difference formula (setting $A=90°$), this concept derives every double-angle formula as the special case $A=B=\theta$ of the same sum formulas — no new geometric argument required either time.
- **Anti-analogy — $\sin2\theta$ is NOT "twice $\sin\theta$."** This is MC-1's exact error: unlike a linear function, where doubling the input genuinely doubles the output, $\sin$ is not linear, and its double-angle formula is a PRODUCT of two different values, not a scalar multiple of one.

## Demonstrations
1. **The full sum-formula-to-double-angle derivation**: setting $A=B=\theta$ in $\sin(A+B)$, $\cos(A+B)$, and $\tan(A+B)$ to obtain all three double-angle formulas, plus the three equivalent $\cos2\theta$ forms via Pythagorean substitution — directly breaking MC-1 by showing the product structure explicitly.
2. **The form-selection efficiency contrast**: given $\sin\theta=\frac{5}{13}$ alone, computing $\cos2\theta$ via Form 3 in one step versus Form 1's two-step route through finding $\cos\theta$ first — directly breaking MC-2.
3. **The undefined-tangent verification**: given $\tan\theta=1$, showing $2\tan\theta=2$ is finite while the correct $\tan2\theta=\tan90°$ is genuinely undefined, matching the denominator $1-\tan^2\theta=0$ exactly — directly breaking MC-3.

## Discovery Questions
1. "If $\sin(A+B)=\sin A\cos B+\cos A\sin B$, what do you get when you set $A=B=\theta$? Is it $2\sin\theta$, or something else?"
2. "If you're only given $\cos\theta$, which of the three forms of $\cos2\theta$ lets you answer in one step, without finding $\sin\theta$ first?"
3. "If $\tan\theta=1$, is $\tan2\theta$ a finite number or undefined? Check both $2\tan\theta$ and the full formula $\frac{2\tan\theta}{1-\tan^2\theta}$."

## Teaching Sequence
1. **Anchor in `math.trig.sum-difference-formulas`**: state directly, "you already have every formula you need — today you plug in one specific substitution, $A=B=\theta$, and read off the double-angle formulas."
2. **Representation shift (breaks MC-1)**: the full derivation of $\sin2\theta$, $\cos2\theta$ (all three forms), and $\tan2\theta$ from the sum formulas.
3. **Pattern induction**: a gallery of exact-value computations, building fluency in choosing the fastest form.
4. **Contrast pair (breaks MC-2)**: the one-step-versus-two-step comparison for computing $\cos2\theta$ from $\sin\theta$ alone.
5. **Mastery gate**: 4-item problem set (compute $\sin2\theta,\cos2\theta,\tan2\theta$ given $\sin\theta=\frac{3}{5}$; verify $\sin60°$ via the double-angle formula from $\sin30°,\cos30°$; simplify $2\sin(x/2)\cos(x/2)$; compute $\tan2\theta$ given $\tan\theta=2$) plus 1 independence-mode transfer probe (projectile-range optimization using $R=\frac{v_0^2}{g}\sin2\theta$).

## Tutor Actions
- **Representation shift**: the full sum-formula-to-double-angle derivation for all three functions.
- **Pattern induction**: a gallery of exact-value computations automating form selection.
- **Contrast pair**: the one-step-versus-two-step efficiency comparison for $\cos2\theta$.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring the projectile-range optimization and a ratio computation.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "no new formulas today — just one substitution into what you already know."
- For MC-1, before accepting any double-angle value, ask "is that a product of two things, or did you just double one value?"
- For MC-2, before computing $\cos2\theta$, ask "what are you given — cos alone, sin alone, or both — and which form matches that?"
- For MC-3, whenever $\tan2\theta$ is computed, require the denominator $(1-\tan^2\theta)$ to be stated and evaluated explicitly, never skipped.

## Assessment Signals
- **Early warning for MC-1**: writing $\sin2\theta=2\sin\theta$ without the accompanying $\cos\theta$ factor.
- **Early warning for MC-2**: using the two-known-values form ($\cos^2\theta-\sin^2\theta$) when only one value is given, requiring an unnecessary extra step.
- **Early warning for MC-3**: writing $\tan2\theta=2\tan\theta$ with no denominator.
- **Mastery evidence**: correctly re-deriving any double-angle formula from the sum formulas on a fresh prompt, correctly selecting the most efficient $\cos2\theta$ form given what's provided, and correctly including the tangent denominator, including recognizing where it produces an undefined result.

## Tutor Recovery Strategy
- On MC-1: re-derive $\sin2\theta$ from the sum formula with the learner performing the substitution $A=B=\theta$ themselves, emphasizing the resulting product structure.
- On MC-2: present a FRESH single-value scenario (different value than already seen) and require the learner to identify the matching form before computing.
- On MC-3: present a fresh $\tan\theta$ value that makes $1-\tan^2\theta=0$ and require the learner to recognize the undefined result BEFORE computing $2\tan\theta$ alone.
- If a learner correctly derives all three double-angle formulas but cannot select the efficient $\cos2\theta$ form under time pressure, treat this as a distinct fluency gap and route to dedicated form-selection drill.

## Memory Hooks
- "A product, not a double" — for $\sin2\theta=2\sin\theta\cos\theta$, MC-1.
- "Match the form to what you're given" — for MC-2's three-forms selection.
- "The denominator isn't decorative — it marks where the function breaks" — for MC-3.

## Transfer Connections
- **`math.trig.sum-difference-formulas`** (prerequisite, already authored): supplies every sum/difference formula this concept specializes at $A=B=\theta$ — no new derivation technique is introduced, only a specific substitution.
- **`math.trig.half-angle-formulas`** (unlocked, not yet authored): derives directly from this concept's own power-reducing identities ($\sin^2\theta=\frac{1-\cos2\theta}{2}$, $\cos^2\theta=\frac{1+\cos2\theta}{2}$), rearranged and square-rooted.
- **`math.calc.trig-integrals`** (sibling, authored this same batch): the power-reducing identities this concept derives are the EXACT tool that entry's own LO2 uses to reduce both-even-power trig integrals (e.g. $\sin^2x=\frac{1-\cos2x}{2}$) before integrating.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a projectile-motion physics context (range optimization via $R=\frac{v_0^2}{g}\sin2\theta$) purely as an application vehicle, not a formal cross-subject curriculum link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.double-angle-formulas.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the full derivation of $\sin2\theta$, $\cos2\theta$'s three forms, $\tan2\theta$, and the power-reducing identities; the exact-value gallery; the form-selection efficiency contrast; the undefined-tangent verification), the complete misconception registry (MC-1 Foundational, MC-2, MC-3, none carrying an explicit birth-type column), and the mastery-gate transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.trig.half-angle-formulas`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "The range of a projectile launched at angle $\theta$ is $R=\frac{v_0^2}{g}\sin2\theta$. (a) Show that maximum range occurs at $\theta=45°$. (b) Find the ratio $R(30°)/R(45°)$." *(Expected: (a) $\sin2\theta$ is maximized when $2\theta=90°$, i.e. $\theta=45°$. (b) $R(30°)/R(45°)=\sin60°/\sin90°=\frac{\sqrt3}{2}\approx0.866$.)*, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- This entry closes the content-overlap risk `math.trig.sum-difference-formulas`'s own Curriculum Feedback (Batch 57) flagged as forward guidance for whoever authored this concept: `trig-identities`'s own LO3 already derives double-angle formulas as an application of the sum formulas, and per that guidance, this entry's own value-add is the RIGOROUS, systematic three-form derivation and efficiency-based form selection, rather than re-teaching the basic substitution already shown informally in `trig-identities`.

## Version History
- **2026-09-13 (Batch 60)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.sum-difference-formulas` (Batch 57). One of four concepts authored this batch (companions: `math.calc.trig-integrals`, `math.calc.hyperbolic-derivatives`, `math.seq.divergent-sequence`). `math.trig` moves from 19/25 toward 20/25 this batch.
