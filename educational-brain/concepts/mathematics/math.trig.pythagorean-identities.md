# math.trig.pythagorean-identities — Pythagorean Identities

## Identity
- **KG id**: `math.trig.pythagorean-identities`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.trig-identities`, `math.trig.unit-circle`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.9 · **Estimated hours**: 3

## Learning Objective
The learner derives $\sin^2\theta+\cos^2\theta=1$ directly from the unit-circle equation, derives $1+\tan^2\theta=\sec^2\theta$ and $1+\cot^2\theta=\csc^2\theta$ from it, selects the appropriate identity form for a given problem, and correctly resolves the $\pm$ sign when solving for an unknown ratio using quadrant information.

## Core Understanding
**Explicit division of labor**: `math.trig.trig-identities` already DERIVES all three Pythagorean forms as a restatement of `math.trig.unit-circle`'s own defining equation ($x^2+y^2=1$ becomes $\sin^2\theta+\cos^2\theta=1$, and dividing by $\cos^2\theta$ or $\sin^2\theta$ gives the other two forms). This concept does **not** re-derive that content — its own value is the APPLICATION skill: selecting the right identity form for a given problem, and correctly resolving the sign ambiguity that arises when solving for an unknown ratio.

**Identity selection**: three equivalent forms exist — $\sin^2\theta+\cos^2\theta=1$ (use when sin/cos appear), $1+\tan^2\theta=\sec^2\theta$ (use when tan/sec appear), $1+\cot^2\theta=\csc^2\theta$ (use when cot/csc appear). Matching the identity to the functions ALREADY in the problem avoids unnecessary intermediate steps — e.g. given $\tan\theta$ and asked for $\sec\theta$, the tan/sec form gives the answer directly in one step, while the fundamental form would require first finding sin and cos separately.

**Sign resolution**: solving $\sin^2\theta=1-\cos^2\theta$ for $\sin\theta$ gives $\pm\sqrt{1-\cos^2\theta}$ — taking the square root of a squared quantity produces $|\sin\theta|$, not $\sin\theta$ itself, so the sign must be recovered SEPARATELY from the given quadrant (via ASTC). This same "square root, then quadrant resolves the sign" pattern from `math.trig.special-angles`' own sign-handling recurs here in a purely algebraic (rather than lookup-table) context, and recurs again later in half-angle formulas.

## Mental Models
- **The identity is a restatement of the unit circle's own equation, not a fact to derive here.** This concept's own contribution is knowing WHICH restatement to reach for and how to resolve the sign — not re-proving what `trig-identities` already established.
- **Match the identity to what's already in the problem.** Scanning for which trig functions appear BEFORE choosing an identity form avoids unnecessary extra steps.
- **A squared root recovers magnitude, not sign.** $\sqrt{x^2}=|x|$ always — the actual sign of the original quantity must come from an independent source (here, the quadrant), never from the square root operation itself.

## Why Students Fail
All three of this Blueprint's misconceptions carry explicit severity ratings but no birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: if a learner's earliest exposure to the Pythagorean relationship is via SOH-CAH-TOA in a right triangle (acute angles only), the identity may be filed as a right-triangle-specific fact rather than a universal one, even after `trig-identities` establishes its unit-circle origin.
- **MC-2** is a **Type 5 (instruction-induced)** gap: if classroom practice disproportionately uses the fundamental form, a learner never develops the habit of scanning for tan/sec or cot/csc as faster alternatives, defaulting to whichever form was practiced most.
- **MC-3** is a **Type 1 (overgeneralization)**: the everyday convention "take the positive square root" (the principal root, as used throughout most of algebra) is reasonably but incorrectly extended here, where the actual sign genuinely depends on external (quadrant) information the square root operation itself cannot supply.

## Misconceptions
**MC-1 — PYTHAGOREAN-AS-GEOMETRIC** *(High)*
- Surface form: believing $\sin^2\theta+\cos^2\theta=1$ requires $\theta$ to be an acute angle in a right triangle, unaware it holds for all real $\theta$.
- Root cause: overgeneralizing from an earliest right-triangle-only exposure to the Pythagorean relationship.
- Repair: verify directly at $\theta=150°$ — $\sin(150°)=\frac12$, $\cos(150°)=-\frac{\sqrt3}2$ — and $\left(\frac12\right)^2+\left(\frac{\sqrt3}2\right)^2=\frac14+\frac34=1$, confirming the identity holds for an obtuse angle with no right triangle in sight, exactly as `trig-identities`' own unit-circle derivation predicts.

**MC-2 — ALWAYS-USE-FUNDAMENTAL** *(Moderate)*
- Surface form: always using $\sin^2\theta+\cos^2\theta=1$ even when $1+\tan^2\theta=\sec^2\theta$ would give the answer directly.
- Root cause: disproportionate practice with the fundamental form, without developing the habit of scanning for a faster alternative.
- Repair: given $\tan\theta=3$, find $\sec^2\theta$ in ONE step via $\sec^2\theta=1+\tan^2\theta=1+9=10$ — contrasted against the longer route of first extracting sin and cos separately from the fundamental form.

**MC-3 — SIGN-LOSS-IN-SOLVING** *(Foundational)*
- Surface form: writing $\sin\theta=\sqrt{1-\cos^2\theta}$ without the $\pm$ symbol, defaulting to the positive root regardless of quadrant.
- Root cause: overgeneralizing the everyday "principal (positive) square root" convention onto a context where the true sign genuinely depends on external quadrant information.
- Repair: given $\cos\theta=\frac45$ with $\theta$ in Q4, $\sin^2\theta=1-\frac{16}{25}=\frac9{25}$ gives $\sin\theta=\pm\frac35$ — but Q4 requires $\sin\theta<0$, so $\sin\theta=-\frac35$, never the bare positive root.

## Analogies
- **The three-forms-one-fact analogy**: exactly as `trig-identities` establishes, all three Pythagorean forms are algebraic restatements of one single geometric fact — this concept's job is knowing when to reach for which restatement, not treating them as three independent facts.
- **Anti-analogy — a square root of a squared quantity is NOT automatically positive.** This is MC-3's exact error, worth naming explicitly: $\sqrt{x^2}=|x|$, and recovering the true sign of $x$ (here, $\sin\theta$ or $\cos\theta$) requires information the square root itself cannot supply.

## Demonstrations
1. **Verification at an obtuse angle**: confirming $\sin^2(150°)+\cos^2(150°)=1$ directly — directly breaking MC-1 by demonstrating the identity holds outside any right-triangle context.
2. **The one-step-versus-many-step contrast**: finding $\sec^2\theta$ from $\tan\theta=3$ via the tan/sec form (one step) versus the fundamental form (requiring sin and cos separately, more steps) — directly breaking MC-2.
3. **The quadrant-resolved sign example**: $\cos\theta=\frac45$ in Q4, correctly concluding $\sin\theta=-\frac35$ (not $+\frac35$) — directly breaking MC-3.

## Discovery Questions
1. "Is $\sin^2(150°)+\cos^2(150°)$ equal to $1$? Does $150°$ live in a right triangle?"
2. "If you know $\tan\theta$ and want $\sec\theta$, is there a faster identity than $\sin^2\theta+\cos^2\theta=1$?"
3. "When you take $\sqrt{1-\cos^2\theta}$, do you get $\sin\theta$, or something else? What extra information do you need to pin down the sign?"

## Teaching Sequence
1. **Anchor in `math.trig.trig-identities` and `math.trig.unit-circle`**: restate the unit-circle-derived Pythagorean identity and its two divided forms as already-established facts this concept builds application skill onto, not re-derives.
2. **Conflict evidence (breaks MC-1)**: verify the identity at an obtuse angle with no right-triangle interpretation available.
3. **Pattern induction and contrast (breaks MC-2)**: the one-step-versus-many-step comparison, ending with an explicit "scan for the functions present, then select the matching form" rule.
4. **Sign-resolution practice (breaks MC-3)**: a gallery of "given one ratio and a quadrant, find another" problems, always requiring the $\pm$ symbol to be written before the quadrant resolves it.
5. **Mastery gate**: 4-item problem set (a full find-cos-and-tan-given-sin-and-quadrant problem; two simplification problems, one favoring each non-fundamental form; a tan-to-sec direct-form problem) plus 1 independence-mode transfer probe (a difference-of-squares factoring proof).

## Tutor Actions
- **Conflict evidence**: verifying the identity at an obtuse angle, outside any right-triangle context.
- **Pattern induction and contrast**: the one-step-versus-many-step form-selection comparison.
- **Sign-resolution practice**: the quadrant-resolved sign gallery, always requiring the $\pm$ symbol explicitly.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring a complete factoring-based proof.

## Voice Teaching Notes
- When first stating the identity, say explicitly "this holds for EVERY angle — obtuse, negative, however large — not just the acute ones in a triangle," pre-empting MC-1 before any practice begins.
- For MC-2, say "scan first: what functions are already in this problem?" as a standing first question before selecting any identity form.
- For MC-3, say "square root, then quadrant" as a fixed two-step phrase every time an unknown ratio is solved for, reusing the identical phrasing already established in `math.trig.special-angles`.

## Assessment Signals
- **Early warning for MC-1**: expressing doubt or confusion when the identity is applied to an angle beyond $90°$ or a negative angle.
- **Early warning for MC-2**: using the fundamental form exclusively even on problems explicitly involving tan/sec or cot/csc.
- **Early warning for MC-3**: reporting only the positive root of a squared trig quantity without checking or mentioning the quadrant.
- **Mastery evidence**: correctly selecting the most efficient identity form on a fresh, unseen problem, and correctly resolving a sign via quadrant information without prompting.

## Tutor Recovery Strategy
- On MC-1: re-verify the identity at a fresh angle beyond $90°$, rather than re-stating the derivation — the misconception is a scope restriction, not a missing proof.
- On MC-2: rework a fresh tan/sec or cot/csc problem, requiring the "scan first" question to be answered explicitly before any computation begins.
- On MC-3: reuse the "square root, then quadrant" checklist (already established in `math.trig.special-angles`) with a fresh ratio-and-quadrant pair — the identical mechanism recurring in a new algebraic context.
- If a learner correctly derives and states all three forms but fails application problems, treat form-selection and sign-resolution as distinct application-skill gaps and route to dedicated mixed practice.

## Memory Hooks
- "Every angle, not just triangle angles" — for MC-1.
- "Scan first: what's already in the problem?" — for MC-2.
- "Square root, then quadrant" — for MC-3 (reused from `special-angles`).

## Transfer Connections
- **`math.trig.trig-identities`** (prerequisite, already authored): the concept that already DERIVES all three Pythagorean forms from the unit-circle equation — this entry's own application/selection skill is built directly on that established content, deliberately not re-deriving it. See Curriculum Feedback below for the genuine content-overlap this creates.
- **`math.trig.unit-circle`** (prerequisite, already authored): the geometric source ($x^2+y^2=1$) both this concept and `trig-identities` trace the Pythagorean identity back to.
- **`math.trig.special-angles`** (sibling, already authored): the identical "square root, then quadrant resolves the sign" pattern, first established there in a lookup-table context, recurring here in a purely algebraic one.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe is a pure algebraic identity proof with no cross-subject application context, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.pythagorean-identities.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the obtuse-angle verification, the one-step-versus-many-step form comparison, the quadrant-resolved sign gallery), the complete misconception registry (MC-1 High, MC-2 Moderate, MC-3 Foundational), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero technical discrepancy**, but a genuine content-overlap finding recorded.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "Prove the identity: $\sin^4\theta-\cos^4\theta=\sin^2\theta-\cos^2\theta$. (Hint: factor the left side as a difference of squares.)" *(Expected: $\sin^4\theta-\cos^4\theta=(\sin^2\theta-\cos^2\theta)(\sin^2\theta+\cos^2\theta)=(\sin^2\theta-\cos^2\theta)\cdot1=\sin^2\theta-\cos^2\theta$, using the Pythagorean identity to collapse the second factor to $1$.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero technical Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- **A genuine content-overlap finding, recorded not fixed**: `math.trig.trig-identities`'s own Core Understanding (Batch 55) already derives all three Pythagorean forms — $\sin^2\theta+\cos^2\theta=1$ from the unit circle, and $1+\tan^2\theta=\sec^2\theta$/$\cot^2\theta+1=\csc^2\theta$ by dividing through — as a stated part of that entry's own content. This concept's Blueprint independently re-derives the identical three forms in its own Component 4 (A01), rather than exclusively citing `trig-identities`' prior derivation. This entry's own text explicitly frames its VALUE-ADD as the identity-selection and sign-resolution APPLICATION skill (following `math.trig.sum-difference-formulas`' own precedent of an explicit division-of-labor statement with a prerequisite), while still faithfully transcribing the Blueprint's own derivation content per this program's standing rule of reusing Blueprints by reference rather than second-guessing their scope.

## Version History
- **2026-09-12 (Batch 58)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.trig-identities` (Batch 55) and `math.trig.unit-circle` (Batch 53). `math.trig` moves from 16/25 to 17/25 this batch.
