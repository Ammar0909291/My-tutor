# math.geom.transformations

## Identity
- **KG ID**: `math.geom.transformations`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.coordinate-plane`
- **Unlocks**: `math.linalg.linear-map`
- **Cross-links**: `math.linalg.linear-map`, `math.abst.group-action` (both Blueprints now exist on disk, though neither has an Educational Brain entry yet; the Blueprint's own P76_mode = independence — see Curriculum Feedback).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 12
- **Blueprint**: `docs/curriculum/blueprints/math.geom.transformations.md` (reused by reference throughout this entry).

## Learning Objective
The student will apply the coordinate rules for the four basic transformations — translation, rotation about the origin, reflection across an axis, and dilation from the origin — to points and shapes; classify translations, rotations, and reflections as distance-preserving isometries (image congruent to original) versus dilations (similar, not congruent, unless |k| = 1); and compose transformations in a specified order, recognizing that composition is generally not commutative.

## Core Understanding
Per the Blueprint's Component 3: a geometric transformation is a function mapping every point of the plane to a point of the plane. Translation by (a,b) sends (x,y) to (x+a, y+b); rotation by θ about the origin sends it to (x cos θ − y sin θ, x sin θ + y cos θ); reflection across the x-axis to (x, −y) and across the y-axis to (−x, y); dilation by factor k from the origin to (kx, ky). Translations, rotations, and reflections are isometries — they preserve every pairwise distance, so images are congruent to originals. Dilations scale every distance by |k|, producing similar but (for k ≠ ±1) not congruent images; all four types preserve angles. Composition order matters structurally: applying T₁ then T₂ generally differs from T₂ then T₁ — reflect-then-rotate and rotate-then-reflect on the same point land on genuinely different images. The standard rotation formula assumes the center is the origin; rotating about any other point requires translate-to-origin, rotate, translate-back.

## Mental Models
1. **The tracing-paper model** (Blueprint TA-A01, P11): slide the traced shape (translation), spin it around a pin (rotation), flip it like a pancake (reflection — orientation reverses), photocopy at a different zoom (dilation) — each physical motion maps to one coordinate rule.
2. **The distance-audit model** (Blueprint TA-A02, Contrast 1): to classify a transformation, audit one pairwise distance before and after — preserved exactly means isometry/congruent; scaled by |k| means dilation/similar.
3. **The assembly-line-order model** (Blueprint TA-A02, Contrast 2): transformations are processing stations on an assembly line — routing a part through station A then B generally produces a different result than B then A; order is part of the specification, not a stylistic choice.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failures are believing every transformation (including dilation) preserves congruence, and assuming composition is commutative like ordinary addition. A third failure applies the origin-centered rotation formula unchanged to rotations centered elsewhere.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — ALL-TRANSFORMATIONS-PRESERVE-CONGRUENCE** (Foundational)
  - **Blueprint description**: believing every geometric transformation (including dilation) preserves congruence/distance, not distinguishing isometries from scaling transformations.
  - **Birth type**: Type 1, overgeneralization — the true property of the three isometries (which dominate early examples) is over-applied to the whole category "transformation," absorbing dilation into a rule it genuinely violates.
  - **Repair approach**: Blueprint Repair B01 — the direct distance computation of Example 2: reflection preserves |AB| = 5 exactly while dilation by 2 doubles it to 10.

- **MC-2 — COMPOSITION-ASSUMED-COMMUTATIVE** (Foundational)
  - **Blueprint description**: assuming that applying two transformations in either order produces the same final result.
  - **Birth type**: Type 6, analogy overextension — the deep familiarity of commutative arithmetic ("order never matters when adding") is carried over to transformation composition, where it genuinely fails; the Blueprint's own A02 script names ordinary number addition as the contaminating analogy.
  - **Repair approach**: Blueprint Repair B02 — Example 3's explicit counterexample: reflect-then-rotate sends (1,1) to (1,1) while rotate-then-reflect sends it to (−1,−1).

- **MC-3 — ROTATION-CENTER-ASSUMED-ORIGIN** (Moderate)
  - **Blueprint description**: applying the standard rotation-about-the-origin formula to a rotation centered at some other point without adjusting for the different center.
  - **Birth type**: Type 5, instruction-induced — every taught rotation formula and worked example is origin-centered, so the formula's hidden precondition (center = origin) is never surfaced and silently drops out of the learned rule.
  - **Repair approach**: Blueprint Repair B03 — re-anchoring on the three-step procedure: translate the center to the origin, rotate, translate back.

## Analogies
- **The photocopier zoom** (Blueprint TA-A01): dilation as photocopying at a different percentage — same shape, different size — making "similar but not congruent" tangible before any distance computation.
- **The game-engine render pipeline** (Blueprint P76): a sprite renderer applying reflect-rotate-translate in fixed order every frame; swapping the order is a visible rendering bug — non-commutativity with an observable consequence.

## Demonstrations
- All four transformations applied to the single point P = (3,2), including the 90° CCW rotation via the trigonometric rule giving (−2,3) (Blueprint Example 1), targeting the coordinate rules of LO1.
- The distance audit: reflection preserves |AB| = 5; dilation by 2 yields 10 (Blueprint Example 2), targeting MC-1.
- The order counterexample on P = (1,1): reflect-then-rotate → (1,1) versus rotate-then-reflect → (−1,−1) (Blueprint Example 3), targeting MC-2.
- The three-transformation chain on a triangle (reflect across y-axis, translate by (4,1), dilate by ½) with cumulative congruence-vs-similarity tracking (Blueprint TA-A03, P28).

## Discovery Questions
1. "A shape is dilated by factor 2. Is the image congruent to the original? How would you check with an actual distance?"
2. "Reflect a point, then rotate it. Now rotate first, then reflect. Do you expect the same final position? Test it."
3. "The rotation formula you know — what does it silently assume about where the center of rotation is?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (the four types via physical tracing-paper motion, shifted to coordinate rules) → A02 (isometry-vs-dilation contrast and composition-order contrast) → A03 (composite three-transformation chained problem) → A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — the tracing-paper motions performed physically before any coordinate rule (Blueprint A01, CPA Concrete entry).
- **DO: Worked Example** — the chained three-transformation triangle problem with per-step coordinate tracking (Blueprint A03).
- **TEST-THINKING: Prediction** — asking the student to predict, before computing, whether swapping two transformations' order changes the result (Blueprint B02's P41), targeting MC-2.
- **TEST-THINKING: Error Analysis** — presenting an origin-formula rotation applied to a center at (2,3) and having the student locate the missing translate-rotate-translate-back steps, targeting MC-3.

## Voice Teaching Notes
When a student calls a dilated image "congruent," don't correct verbally — ask for one pairwise distance before and after, and let the doubled number do the puncturing (Blueprint A02's evidence-first approach). The rotation formula is the most symbolically unfamiliar of the four rules; per the Blueprint's Component 8, present it as "how much of the original x and y mix together, based on the turn angle" rather than deriving it, with the derivation explicitly deferred to `math.linalg.linear-map`.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 0 declaration)**: reused verbatim from the Blueprint's A04 — the game-engine bug scenario, demonstrating on the sprite's nose point (1,0) that translation-then-rotation-then-reflection lands somewhere different from the intended reflect-rotate-translate order.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set — including item 4's genuinely subtle case that dilation by k = −1 IS an isometry (a point reflection), verified by direct distance check — plus P76 (A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-2 persists after B02, have the student personally construct a second counterexample with a different transformation pair rather than re-walking the given one — commutativity assumptions yield to self-generated counterevidence faster than to demonstrated ones. If the rotation formula itself keeps failing, drop back to the 90°/180°/270° special cases (where cos/sin are 0 and ±1) before returning to the general trigonometric form.

## Memory Hooks
- "Slide, spin, flip preserve size — zoom doesn't."
- "Isometry = distance audit passes exactly."
- "Transformations are not addition: order is part of the instruction."
- "The rotation formula lives at the origin — translate there and back for any other center."

## Transfer Connections
- `math.geom.coordinate-plane` (requires) supplies the ordered-pair representation every transformation rule operates on.
- `math.linalg.linear-map` (unlocks, cross-link) reframes origin-centered rotations, reflections, and dilations as exactly the linear maps of the plane, each a 2×2 matrix — this concept is its concrete precursor.
- `math.abst.group-action` (cross-link) frames the isometries as a group acting on the plane — composition non-commutativity here is the concrete seed of non-abelian group structure there.
- `math.geom.congruent-triangles` and `math.geom.similar-triangles` (already-authored EB siblings) supply the congruence/similarity vocabulary this concept's isometry-vs-dilation split maps onto.

## Cross-Subject Connections
- Computer science/graphics: sprite and 3D-model rendering pipelines are literal transformation compositions applied in fixed order — the P76 probe's scenario is real engine architecture, not a contrived dressing.
- Physics: reference-frame changes (translations, rotations) as distance-preserving coordinate transformations.

## Blueprint References
`docs/curriculum/blueprints/math.geom.transformations.md` — all worked examples, teaching actions, repair actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
The Blueprint's Component 0 and Component 7 state that the `math.linalg.linear-map` and `math.abst.group-action` Blueprints do not exist ("both not yet authored — verified via ls") and set P76_mode = independence on that basis. Both Blueprints NOW exist on disk (`docs/curriculum/blueprints/math.linalg.linear-map.md`, `docs/curriculum/blueprints/math.abst.group-action.md`) — the check was accurate when authored but is stale today. The Blueprint's own Component 7 anticipates exactly this: "a future revision, once either target is authored, may add a genuine cross-link probe." Recorded honestly, not fixed — no Blueprint file modified by this program; this entry follows the Blueprint's declared independence mode as written.

## Version History
- v1.0 (2026-07-27): Initial authoring, Domain Certification Mode, math.geom Wave 9.
