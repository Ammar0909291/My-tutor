# math.trig.trig-identities — Trigonometric Identities

## Identity
- **KG id**: `math.trig.trig-identities`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.trig-functions`
- **Unlocks**: `math.trig.trig-equations`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 15

## Learning Objective
The learner states and applies the Pythagorean identity (and its two derived forms), the angle-sum and angle-difference formulas, and the double-angle formulas to simplify trigonometric expressions and find missing values — recognizing that a given expression commonly admits more than one valid simplification path.

## Core Understanding
The **Pythagorean identity** $\sin^2\theta+\cos^2\theta=1$ is not a new fact requiring separate proof — it is `math.trig.unit-circle`'s own defining equation ($x^2+y^2=1$ with $(x,y)=(\cos\theta,\sin\theta)$) restated in trigonometric notation. Dividing through by $\cos^2\theta$ gives $1+\tan^2\theta=\sec^2\theta$; dividing by $\sin^2\theta$ gives $\cot^2\theta+1=\csc^2\theta$ — two derived forms from the same single geometric fact.

The **angle-sum and angle-difference formulas**,
$$\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B,\qquad \cos(A\pm B)=\cos A\cos B\mp\sin A\sin B$$
let exact values be computed for angles beyond the standard unit-circle list by decomposing them into sums or differences of known angles (e.g. $75°=45°+30°$).

The **double-angle formulas** follow by setting $B=A$ in the sum formulas: $\sin(2A)=2\sin A\cos A$, and $\cos(2A)$ has **three equivalent forms** — $\cos^2A-\sin^2A$, $2\cos^2A-1$, $1-2\sin^2A$ — each arising from substituting the Pythagorean identity to eliminate one of the two squared terms, useful for different simplification goals depending on what's already present in the expression being worked.

The central skill this concept targets is **strategic identity selection**: a given expression frequently admits more than one valid simplification route, and the goal is recognizing which identity's structure matches what's present — not memorizing a single fixed procedure per problem shape.

## Mental Models
- **The Pythagorean identity is the circle's own equation, not a new memorized fact.** Every identity this concept covers ultimately traces back to the unit circle's defining relationship between $x$, $y$, and radius $1$.
- **Multiple valid roads to the same destination.** A simplification target rarely has exactly one "correct" first move; different identity choices can all reach the same final answer, though some paths are more efficient than others.
- **Structure-matching, not procedure-matching.** Seeing $\sin^2x$ and $\cos^2x$ both present suggests the Pythagorean identity; seeing $\sin(x+y)$ suggests the angle-sum formula — the skill is pattern recognition, applied flexibly, not a memorized decision tree.

## Why Students Fail
All three of this Blueprint's misconceptions are ranked Foundational, and none carries an explicit birth-type column (consistent with virtually every math.trig Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 5 (instruction-induced)** gap: worked examples typically show one clean simplification path per problem, and if the existence of alternative equally-valid paths is never explicitly demonstrated, the learner reasonably concludes each problem has exactly one correct first move.
- **MC-2** is a **Type 5 (instruction-induced)** gap: the reflex "take the positive square root" from earlier algebra work persists unless the quadrant-dependent sign check is explicitly drilled as a mandatory, separate step every time a square root of a squared trig quantity appears.
- **MC-3** is a **Type 1 (overgeneralization)**: linear functions genuinely distribute over addition ($f(a+b)=f(a)+f(b)$ for $f(x)=kx$), and this correct algebraic intuition is over-applied to the genuinely nonlinear trig functions, where no such distribution law holds.

## Misconceptions
**MC-1 — SINGLE-IDENTITY-PATH-ASSUMED** *(Foundational, Type 5)*
- Surface form: believing a simplification problem like $\frac{\sin(2x)}{1+\cos(2x)}$ has exactly one correct identity to apply first.
- Root cause: worked examples typically demonstrate one clean path, never explicitly showing that alternatives exist.
- Repair: work the same simplification two ways — using $\cos(2x)=2\cos^2x-1$ (clean cancellation, reaching $\tan x$ efficiently) versus $\cos(2x)=1-2\sin^2x$ (a messier intermediate path, but still correctly reaching $\tan x$) — proving multiple valid routes exist, with some more efficient than others.

**MC-2 — SIGN-DROPPED-WHEN-TAKING-SQUARE-ROOT** *(Foundational, Type 5)*
- Surface form: solving $\cos^2\theta=16/25$ via the Pythagorean identity and taking only the positive root $\cos\theta=4/5$, without checking the quadrant.
- Root cause: the "take the positive square root" reflex from earlier algebra persists without the quadrant-dependent sign check being drilled as mandatory.
- Repair: given $\sin\theta=3/5$ with $\theta$ in Quadrant II (where cosine is negative), $\cos^2\theta=16/25$ gives $\cos\theta=\pm4/5$ — but the quadrant information forces the negative root, $\cos\theta=-4/5$; every square root of a squared trig quantity requires this explicit quadrant check before finalizing the sign.

**MC-3 — ANGLE-SUM-FORMULA-DISTRIBUTED-LIKE-LINEAR-FUNCTION** *(Foundational, Type 1)*
- Surface form: computing $\sin(A+B)$ as $\sin A+\sin B$, treating sin as if it distributed over addition.
- Root cause: overgeneralizing linear functions' genuine additivity onto a nonlinear function where it does not hold.
- Repair: a direct numerical disproof — $\sin(60°)=\sqrt3/2\approx0.866$, but $\sin(30°)+\sin(30°)=1/2+1/2=1$ — these disagree, proving sin does not distribute over addition and the angle-sum formula is genuinely necessary, not a formality.

## Analogies
- **The unit-circle-as-source-of-truth analogy**: every identity in this concept, however algebraically dressed up, traces back to the same single geometric fact ($x^2+y^2=1$) — treating the identities as a growing list of unrelated facts to memorize misses that they form one connected structure.
- **Anti-analogy — trig functions are NOT linear, and do NOT distribute over addition the way $f(x)=kx$ does.** This is MC-3's exact error, worth naming explicitly as a false analogy rather than merely correcting the resulting arithmetic.

## Demonstrations
1. **Pythagorean identity from the unit circle**: derive $\sin^2\theta+\cos^2\theta=1$ directly from $(\cos\theta,\sin\theta)$'s distance-1 relationship to the origin, then divide through by $\cos^2\theta$ and $\sin^2\theta$ to obtain the two derived forms.
2. **Two-path simplification comparison**: work $\frac{\sin(2x)}{1+\cos(2x)}$ using both valid double-angle-cosine substitutions, showing one path is cleaner but both reach $\tan x$ — directly breaking MC-1.
3. **Quadrant-check worked example**: given $\sin\theta=3/5$ in Quadrant II, correctly select $\cos\theta=-4/5$ over the naive positive root — directly breaking MC-2.
4. **Numerical disproof of linear distribution**: compute $\sin(60°)$ directly versus $\sin(30°)+\sin(30°)$, showing the values disagree — directly breaking MC-3.

## Discovery Questions
1. "Simplify $\frac{\sin(2x)}{1+\cos(2x)}$ using $\cos(2x)=2\cos^2x-1$. Now try it again using $\cos(2x)=1-2\sin^2x$ instead. Do you reach the same final answer both times?"
2. "If $\sin\theta=3/5$ and $\theta$ is in Quadrant II, is $\cos\theta$ positive or negative? Does the Pythagorean identity alone tell you the sign, or do you need more information?"
3. "Compute $\sin(60°)$ directly. Now compute $\sin(30°)+\sin(30°)$. Are they equal?"

## Teaching Sequence
1. **Anchor in `math.trig.trig-functions`**: restate sin, cos, and standard angle values as the base vocabulary every identity here operates on.
2. **Representation shift**: derive the Pythagorean identity from the unit circle (pictorial entry, per the Blueprint's own CPA staging), then state the angle-sum formulas and work a decomposition example (e.g. $\cos(75°)$).
3. **Contrast pair (breaks MC-1)**: the two-path double-angle simplification comparison, ending with "there's no single 'right' first move — the skill is recognizing which form simplifies most cleanly, and trying a different form if your first choice gets messy."
4. **Conflict evidence (breaks MC-2 and MC-3)**: the quadrant-sign-check worked example and the numerical linear-distribution disproof, each ending with the explicit corrected rule.
5. **Composite application**: a multi-identity simplification requiring sequential correct application of two different double-angle substitutions plus algebraic cancellation, preventing single-identity pattern-matching from being sufficient on its own.
6. **Mastery gate**: 4-item problem set (quadrant-dependent value-finding, an angle-difference exact-value computation, a double-angle simplification, a multiple-valid-path simplification) plus 1 independence-mode transfer probe (an AC-circuit power-decomposition problem requiring angle-sum expansion followed by Pythagorean or double-angle simplification, with an explicit invitation to name an alternative valid path).

## Tutor Actions
- **Representation shift**: unit-circle-derived Pythagorean identity, then angle-sum formulas via decomposition.
- **Contrast pair** (MC-1): the two-path double-angle simplification, ending in the "multiple valid routes" lesson.
- **Conflict evidence** (MC-2/MC-3): the quadrant-sign check and the numerical linear-distribution disproof.
- **Composite multi-identity item**: a sequential two-substitution simplification forcing genuine flexibility, not single-pattern matching.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded alternative-path-naming task.

## Voice Teaching Notes
- When first presenting the Pythagorean identity, say explicitly "this isn't a new fact — it's the unit circle's own equation, wearing trig notation" — front-loading the unified-structure framing before any formula memorization begins.
- For MC-1, narrate strategic selection as a live thinking-aloud process: "I see $\sin^2$ and $\cos^2$ both here — that suggests the Pythagorean identity; let me also consider..." — modeling flexible pattern recognition rather than presenting a single fixed algorithm.
- For MC-2, say "square root, then check the quadrant" as a fixed two-step phrase every time a squared trig quantity is solved, making the sign-check a spoken, mandatory habit.

## Assessment Signals
- **Early warning for MC-1**: expressing frustration or confusion when a demonstrated path differs from the learner's own first attempt, or asking "which is the right way" when multiple valid approaches exist.
- **Early warning for MC-2**: stating only the positive root of a squared trig quantity without referencing the angle's quadrant.
- **Early warning for MC-3**: writing $\sin(A+B)=\sin A+\sin B$ or any structurally identical linear-distribution error for cos or tan.
- **Mastery evidence**: successfully simplifying a fresh, unseen expression via a self-selected identity path (not one dictated by the tutor), and correctly justifying a sign choice by explicit reference to the angle's quadrant.

## Tutor Recovery Strategy
- On MC-1: re-walk the two-path comparison for a genuinely different expression than the one already seen, so the learner encounters flexible selection as a repeatable skill, not a memorized one-off demonstration.
- On MC-2: return to the quadrant-sign check explicitly every time, treating "square root, then quadrant check" as inseparable — never re-teach the Pythagorean identity's algebra alone, since the misconception is specifically about the sign step.
- On MC-3: use the numerical disproof again with a fresh pair of angles rather than restating the correct formula abstractly — the misconception is a false analogy and needs a concrete counterexample to unstick.
- If a learner masters single-identity application but fails the composite multi-identity item, treat this as a distinct integration gap (sequencing multiple correct steps) rather than re-drilling any individual identity.

## Memory Hooks
- "The Pythagorean identity is the circle's own equation" — for the unified-structure framing.
- "Multiple roads, some smoother than others" — for MC-1.
- "Square root, then check the quadrant" — for MC-2.
- "$\sin(60°)\ne\sin(30°)+\sin(30°)$ — trig isn't linear" — for MC-3.

## Transfer Connections
- **`math.trig.trig-equations`** (unlocked): solving trigonometric equations routinely requires simplifying via these identities first — this concept is a direct prerequisite skill for isolating a solvable form.
- **`math.trig.unit-circle`** (prerequisite chain, already authored): the Pythagorean identity's derivation from the unit circle's own defining equation is the concrete instance this concept generalizes into an algebraic tool.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses an AC-circuit power context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.trig-identities.md` (a mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted per the corpus's own established convention). All three worked examples (the Quadrant-II sign-check, the $\cos(75°)$ angle-sum decomposition, the two-path double-angle simplification), the complete misconception registry (MC-1/MC-2/MC-3, all Foundational, none carrying an explicit birth-type column), and the composite multi-identity teaching action are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` and `cross_links: none`): "An AC electrical circuit's instantaneous power is modeled by $P(t)=V_0I_0\sin(\omega t)\sin(\omega t+\phi)$ for a phase difference $\phi$ between voltage and current. (a) Using the angle-sum formula, expand $\sin(\omega t+\phi)$ in terms of $\sin(\omega t)$ and $\cos(\omega t)$. (b) Substitute this back into $P(t)$ and use a Pythagorean or double-angle identity to simplify the resulting expression into a form separating a constant (time-averaged) term from an oscillating term. (c) Note that your simplification path is not unique — briefly describe an alternative identity substitution that could have been used at one step." *(Expected: (a) $\sin(\omega t+\phi)=\sin(\omega t)\cos\phi+\cos(\omega t)\sin\phi$. (b) Substituting and simplifying via double-angle identities separates $P(t)$ into a constant "real power" term and an oscillating term — the real AC-power decomposition. (c) Multiple valid identity substitutions exist at the double-angle step, reinforcing the lesson's own point about non-unique simplification routes.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).

## Version History
- **2026-09-12 (Batch 55)**: authored as part of the Mathematics Educational Brain completion campaign. One of two `math.trig` concepts authored this batch (companion: `math.trig.inverse-trig`), both unblocked by the already-authored `math.trig.trig-functions` (Batch 54). `math.trig` moves from 6/25 to 8/25 this batch. Unlocks `math.trig.trig-equations` (not yet authored).
