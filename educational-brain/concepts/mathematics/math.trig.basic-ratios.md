# math.trig.basic-ratios — Basic Trigonometric Ratios (SOH-CAH-TOA)

## Identity
- **KG id**: `math.trig.basic-ratios`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.right-triangle-trig`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: remember
- **Mastery threshold**: 0.95 · **Estimated hours**: 4

## Learning Objective
The learner names and applies the three primary trigonometric ratios ($\sin\theta=\text{opposite/hypotenuse}$, $\cos\theta=\text{adjacent/hypotenuse}$, $\tan\theta=\text{opposite/adjacent}$), correctly labels Opposite, Adjacent, and Hypotenuse relative to the reference angle $\theta$ (never the right angle), and applies the Pythagorean theorem to find a missing side before computing a ratio.

## Core Understanding
`math.trig.right-triangle-trig` establishes the general framework: right-triangle geometry, the hypotenuse as the side opposite the right angle, and the similar-triangle invariance that makes a ratio of sides depend only on the angle, not the triangle's size. This concept fixes the **specific labeling procedure** and the **three named ratios** built on that framework.

The labeling procedure is angle-relative, not position-relative: locate the right angle first — the side across from it is **always** the Hypotenuse, regardless of orientation. Then locate the reference angle $\theta$ — the leg directly across from $\theta$ is the **Opposite** side; the remaining leg, the one beside $\theta$ (between $\theta$'s vertex and the right angle), is the **Adjacent** side. From these three labeled sides:

$$\sin\theta=\frac{\text{Opposite}}{\text{Hypotenuse}},\qquad \cos\theta=\frac{\text{Adjacent}}{\text{Hypotenuse}},\qquad \tan\theta=\frac{\text{Opposite}}{\text{Adjacent}}$$

(mnemonic: SOH-CAH-TOA). When a side is missing, the Pythagorean theorem ($a^2+b^2=c^2$) must be applied FIRST to recover it before any ratio can be computed.

The central subtlety this concept targets: **Opposite and Adjacent are defined relative to $\theta$, and they swap when $\theta$ moves to the triangle's other acute vertex** — while the Hypotenuse never changes (it is always the side across from the right angle, independent of which acute angle is chosen as $\theta$).

## Mental Models
- **Stand at $\theta$ and look.** Looking straight across the triangle (not touching your own vertex) — that side is Opposite. Looking beside you (the leg connecting your vertex to the right angle) — that side is Adjacent. This mental movement works regardless of how the triangle is drawn or rotated.
- **The right angle names the Hypotenuse; $\theta$ names Opposite and Adjacent.** Two separate labeling jobs, done in sequence: right-angle position first (fixed forever), then $\theta$'s position (determines which leg is which).
- **SOH-CAH-TOA is a recall tool, not a reasoning tool.** A learner who memorizes the mnemonic without internalizing the O/A/H labeling procedure will fail the moment the triangle is drawn in an unfamiliar orientation.

## Why Students Fail
All three of this Blueprint's misconceptions are independently classified here, since none carries an explicit birth-type column in the corpus's usual sense (though the Blueprint does supply a "Trigger" column, which is distinct from a birth-type classification):
- **MC-1** is a **Type 3 (language contamination)**: "sin" and "cos" are arbitrary labels with no inherent connection to "opposite" or "adjacent" beyond the SOH-CAH-TOA mnemonic itself, so the two labels are easily swapped without a strong independent anchor.
- **MC-2** is a **Type 1 (overgeneralization)**: a learner's first exposure to labeled triangles typically places $\theta$ at a fixed, convenient vertex, so the labeling procedure is learned as "look at THIS vertex" rather than "look at WHICHEVER vertex is $\theta$" — the procedure is over-anchored to one specific configuration.
- **MC-3** is a **Type 2 (perceptual intuition)**: the hypotenuse is usually drawn as the visually longest or most prominent side in a triangle's default orientation, so a learner may identify it by visual salience rather than by its true defining property (opposite the right angle) — a rotated or tilted diagram breaks this false shortcut.

## Misconceptions
**MC-1 — OPPOSITE-ADJACENT-SWAP** *(Foundational)*
- Surface form: reversing sin and cos — writing $\sin\theta=\text{adjacent/hyp}$ and $\cos\theta=\text{opposite/hyp}$.
- Root cause: "sin" and "cos" are arbitrary labels with no inherent link to "opposite"/"adjacent" beyond the mnemonic.
- Repair: anchor on the shared first letters — **S**in and **O**pposite are both "sharp" letters (S-O-H); **C**os and **A**djacent are both "curvy" letters (C-A-H) — reinforced by computing both values in an asymmetric triangle (e.g. 3-4-5) where sin and cos genuinely differ, so a swap produces a checkably wrong answer rather than an accidentally-correct one.

**MC-2 — WRONG-REFERENCE-VERTEX** *(High)*
- Surface form: labeling Opposite and Adjacent relative to the right-angle vertex instead of relative to $\theta$.
- Root cause: overgeneralizing from a fixed early-exposure vertex convention to every configuration.
- Repair: the two-vertex contrast — same triangle (legs 3, 4, hypotenuse 5), $\theta$ first at the vertex opposite leg 3, then at the vertex opposite leg 4 — showing Opposite and Adjacent SWAP while Hypotenuse stays fixed at 5, proving the labeling depends on $\theta$'s position, not the triangle's fixed geometry.

**MC-3 — HYPOTENUSE-BY-POSITION** *(Moderate)*
- Surface form: identifying a different side as the hypotenuse when the triangle is tilted or rotated, rather than always using the side opposite the right angle.
- Root cause: perceptual reliance on visual salience (the "longest-looking" or "bottom" side) rather than the angular definition.
- Repair: present a triangle deliberately tilted so the hypotenuse appears horizontal at the bottom — the hypotenuse is still the side directly across from the right-angle marker, regardless of how the figure is oriented on the page.

## Analogies
- **The stand-and-look analogy**: mentally standing at $\theta$'s vertex and looking across (Opposite) versus beside (Adjacent) makes the labeling procedure a repeatable physical action rather than a static memorized fact.
- **Anti-analogy — SOH-CAH-TOA memorized alone is NOT sufficient.** This is the Blueprint's own explicit teaching-notes warning: a learner who can recite the mnemonic but cannot re-derive the O/A/H labels on a fresh, unfamiliar orientation does not have the actual skill — the mnemonic is a compressed reminder of a procedure, not a substitute for it.

## Demonstrations
1. **Four-stage representation shift**: unlabeled triangle → right angle marked (hypotenuse identified) → $\theta$ marked → sides labeled O/A/H relative to $\theta$ — building the full labeling procedure step by step before stating SOH-CAH-TOA.
2. **Two-vertex contrast**: the same 3-4-5 triangle with $\theta$ at each of its two acute vertices in turn, showing Opposite and Adjacent swap ($3\leftrightarrow4$) while Hypotenuse stays fixed at 5 — directly breaking MC-2.
3. **Tilted-hypotenuse check**: a triangle drawn rotated so the hypotenuse looks like the "bottom" side, correctly identified anyway via the right-angle-opposite rule — directly breaking MC-3.

## Discovery Questions
1. "In a right triangle, is the Opposite side always the same physical side, or does it depend on which angle you call $\theta$?"
2. "If I move $\theta$ to the OTHER acute angle in the same triangle, do Opposite and Adjacent stay the same, or do they swap? What about the Hypotenuse?"
3. "A triangle is drawn tilted so its longest-looking side is at the bottom. Is that side necessarily the hypotenuse? How do you know for sure?"

## Teaching Sequence
1. **Anchor in `math.trig.right-triangle-trig`**: restate the hypotenuse-opposite-the-right-angle fact and similar-triangle ratio invariance as the foundation this concept builds three named ratios on.
2. **Representation shift**: the four-stage diagram (unlabeled → right angle marked → $\theta$ marked → O/A/H labeled), ending in the SOH-CAH-TOA statement — directly countering MC-1 via the shared-letter mnemonic anchor.
3. **Pattern induction**: a gallery of labeled triangles computing all three ratios, extending to missing-side problems via the Pythagorean theorem.
4. **Contrast pair (breaks MC-2)**: the two-vertex swap demonstration on the identical 3-4-5 triangle.
5. **Mastery gate**: 4-item problem set (three direct ratio-computation problems plus a Pythagorean missing-side problem; one item requiring $\cos\theta$ from $\sin\theta=7/25$) plus 1 independence-mode transfer probe (a ladder-against-a-wall problem with an embedded self-error-identification task targeting MC-1).

## Tutor Actions
- **Representation shift**: the four-stage O/A/H labeling diagram, ending in SOH-CAH-TOA.
- **Pattern induction**: the labeled-triangle gallery, extended to Pythagorean missing-side problems.
- **Contrast pair** (MC-2): the two-vertex swap on a fixed 3-4-5 triangle.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded error-identification task.

## Voice Teaching Notes
- Narrate the labeling procedure out loud as a physical action every time: "stand at $\theta$ — look straight across, that's Opposite; look beside you, that's Adjacent" — repeating this exact phrasing rather than varying it, since the procedure's repeatability (not its wording) is the point.
- For MC-1, say the shared-letter pairing explicitly whenever sin/cos are first introduced together: "S goes with O — both sharp letters. C goes with A — both curvy letters." said as one memorable phrase.
- For MC-3, when introducing a tilted or unusual orientation, say "find the right-angle marker first — the hypotenuse is automatic from there" before any other labeling step, making right-angle-first the spoken habit.

## Assessment Signals
- **Early warning for MC-1**: computing sin and cos correctly individually but swapping which value goes with which label when reporting the answer.
- **Early warning for MC-2**: correctly computing ratios for a triangle with $\theta$ at its "usual" vertex but failing when $\theta$ is placed at the other acute vertex of the same triangle.
- **Early warning for MC-3**: identifying the hypotenuse by its visual position (longest-looking, or at the "bottom") in a rotated diagram rather than by the right-angle-opposite rule.
- **Mastery evidence**: correctly labeling O/A/H and computing all three ratios on a triangle in an unfamiliar or rotated orientation, without prompting to check the right angle first.

## Tutor Recovery Strategy
- On MC-1: re-anchor on the shared-letter mnemonic (S-O, C-A) with a FRESH asymmetric triangle, rather than re-stating the ratio definitions abstractly — the misconception is a specific swap, not a missing definition.
- On MC-2: rework the two-vertex contrast with a DIFFERENT triangle than already seen, always asking "which vertex is $\theta$ at THIS time?" as the first diagnostic question before any labeling begins.
- On MC-3: return to the right-angle-first rule explicitly with a freshly rotated diagram — the misconception is a shortcut based on visual position, and needs a genuinely disorienting example to break, not a repetition of the standard-orientation case.
- If a learner correctly computes ratios from a labeled diagram but fails to label an unlabeled one independently, treat this as a distinct labeling-procedure gap (not a ratio-computation gap) and route back to the four-stage representation-shift demonstration.

## Memory Hooks
- "Stand at $\theta$, look across for Opposite, look beside for Adjacent" — the labeling procedure.
- "S goes with O, C goes with A" — for MC-1.
- "Move $\theta$, and O/A swap — but H never changes" — for MC-2.
- "Find the right angle first — the hypotenuse is automatic" — for MC-3.

## Transfer Connections
- **`math.trig.right-triangle-trig`** (prerequisite, already authored): the general right-triangle framework and similar-triangle ratio invariance this concept fixes into three specific named ratios.
- **`math.trig.reciprocal-identities`** (not yet authored): the Blueprint's own Teaching Notes explicitly defer csc/sec/cot to that concept, stating this entry deliberately covers only the three primary ratios.
- **`math.trig.law-of-sines`/`math.trig.law-of-cosines`** (siblings, authored this same batch): both build directly on the sin/cos ratios this concept establishes, extending them from right triangles to general triangles.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a ladder-against-a-wall context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.basic-ratios.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the 3-4-5/5-12-13/7-24-25/8-15-17 gallery, the two-vertex swap table, the tilted-hypotenuse check), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate — the Blueprint's own "Trigger" column reused as diagnostic context, not restated as a birth-type), and the ladder transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below for the one genuine `unlocks` discrepancy found.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "A ladder leans against a wall. The foot of the ladder is 5 m from the base of the wall and the top reaches 12 m up the wall. The angle $\theta$ is formed between the ladder and the ground. (a) Find the length of the ladder. (b) Find $\sin\theta$, $\cos\theta$, and $\tan\theta$. (c) A student writes $\cos\theta=12/13$. What error did the student make?" *(Expected: (a) Ladder $=\sqrt{5^2+12^2}=13$ m. (b) Opposite (wall height) = 12, Adjacent (ground distance) = 5, Hypotenuse (ladder) = 13, so $\sin\theta=12/13$, $\cos\theta=5/13$, $\tan\theta=12/5$. (c) The student confused Opposite and Adjacent for cosine — the value $12/13$ is $\sin\theta$, not $\cos\theta$, since cosine uses the adjacent leg (5), not the opposite leg (12).)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **One genuine `unlocks`-field discrepancy found, resolved toward the KG (not fixed)**: the Blueprint's Component 4/Component 7 sections both state "Unlocks: `math.trig.special-angles`," but the live KG's `unlocks` field for this concept is empty (`[]`). Checked further: `math.trig.special-angles` DOES exist in the live KG and its own `requires` field DOES list `math.trig.basic-ratios` — so the prerequisite relationship is genuinely real in the KG, it is simply not mirrored back onto this concept's own `unlocks` field, a `requires`/`unlocks` asymmetry of the same class already documented in this campaign for `math.alg.exponential-equations`/`math.alg.logarithm` (Batch 16) and `math.alg.inequality-2var` (Batch 4). Not fixed (no KG file modified this batch); this entry's Identity section states `unlocks: none` per the KG, matching this program's standing rule of following the KG on any discrepancy.

## Version History
- **2026-09-12 (Batch 56)**: authored as part of the Mathematics Educational Brain completion campaign. One of three `math.trig` concepts authored this batch (companions: `math.trig.law-of-sines`, `math.trig.law-of-cosines`), all three unblocked by the already-authored `math.trig.right-triangle-trig` (Batch 52). `math.trig` moves from 8/25 to 9/25 this batch.
