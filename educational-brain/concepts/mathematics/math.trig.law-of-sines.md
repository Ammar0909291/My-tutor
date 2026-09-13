# math.trig.law-of-sines — Law of Sines

## Identity
- **KG id**: `math.trig.law-of-sines`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.right-triangle-trig`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 6

## Learning Objective
The learner states and applies the Law of Sines ($\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}$), identifies AAS and ASA as the configurations where it applies, and recognizes and resolves the ambiguous case (SSA) — determining whether 0, 1, or 2 triangles exist and finding all valid solutions when two are possible.

## Core Understanding
`math.trig.right-triangle-trig` establishes sine as opposite/hypotenuse within a single right triangle. The Law of Sines EXTENDS this relationship to any triangle, general or oblique, by a direct derivation: drop an altitude $h$ from one vertex, creating two right triangles that share $h$. In one right triangle, $\sin A=h/c$, so $h=c\sin A$; in the other, $\sin C=h/a$, so $h=a\sin C$. Setting these equal: $c\sin A=a\sin C\Rightarrow\frac{a}{\sin A}=\frac{c}{\sin C}$. Repeating with a different altitude gives the full three-way relationship $\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}$ — each side paired with the angle directly opposite it.

The law applies when a full **angle-side pair** (a side and the angle directly opposite it) is known alongside enough further information to set up a proportion — concretely, **AAS** (two angles plus a non-included side) or **ASA** (two angles plus the included side, where the third angle is found first via the angle sum). It does NOT apply directly to **SAS** or **SSS**, since neither configuration supplies a complete opposite-pair (`math.trig.law-of-cosines` handles those instead).

The concept's central subtlety is the **ambiguous case (SSA)**: given angle $A$, its opposite side $a$, and an adjacent side $b$, the height $h=b\sin A$ determines how many triangles exist — 0 if $a<h$, exactly 1 (a right triangle) if $a=h$, exactly 2 if $h<a<b$, and exactly 1 (the acute solution only) if $a\ge b$. When two triangles are possible, $\sin B=\frac{b\sin A}{a}$ has TWO valid solutions in $[0°,180°)$: $B_1=\arcsin\left(\frac{b\sin A}{a}\right)$ and its supplement $B_2=180°-B_1$ — because arcsin, by convention, returns only the first-quadrant value, discarding the equally valid obtuse angle with the same sine.

## Mental Models
- **The law is a derived consequence of right-triangle trig, not a new independent fact.** Drop an altitude, get two right triangles, equate the two expressions for the shared height — the whole law falls out.
- **Side-angle pairing, always.** In the ratio $\frac{a}{\sin A}$, side $a$ must be the side directly ACROSS from angle $A$ — never a side merely near or beside $A$.
- **arcsin only tells half the story in a triangle.** The function $\arcsin$ is restricted by convention to return values in $[-90°,90°]$, but an angle in a triangle can be obtuse — so whenever the SSA configuration arises, BOTH $B_1$ and its supplement $180°-B_1$ must be checked for validity, never just the one arcsin hands back.

## Why Students Fail
This Blueprint supplies a "Trigger" column rather than an explicit birth-type classification, so each misconception is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: having just learned one universal-looking proportion, a learner reasonably extends "this formula works for any triangle" to configurations (SAS, SSS) where it structurally cannot be applied, since the necessary opposite-pair information is missing.
- **MC-2** is a **Type 5 (instruction-induced)** gap, and the Blueprint's own designated Foundational misconception: arcsin's calculator convention silently discards the obtuse solution, and unless the SSA ambiguous case is EXPLICITLY taught as requiring a mandatory two-solution check, a learner has no natural reason to suspect a second answer exists.
- **MC-3** is a **Type 4 (notation-induced)**: the convention that lowercase $a$ pairs with uppercase $A$ is a labeling convention rather than a visually obvious geometric fact, so it is easy to pair a side with an adjacent (rather than opposite) angle when the notation itself gives no visual cue about "opposite."

## Misconceptions
**MC-1 — SINE-RULE-FOR-ALL** *(High)*
- Surface form: applying the Law of Sines to SAS or SSS configurations, where it cannot directly find the missing piece.
- Root cause: overgeneralizing a single powerful proportion to every triangle-solving scenario, without checking whether a complete angle-side pair is actually available.
- Repair: given sides $a=7,b=9$ and included angle $C=120°$, explicitly check — $C$ is BETWEEN the two known sides, not opposite either of them, so no ratio $\frac{\text{side}}{\sin(\text{its own angle})}$ has both parts known; the Law of Cosines is required instead.

**MC-2 — AMBIGUOUS-CASE-BLINDNESS** *(Foundational)*
- Surface form: in an SSA problem, finding only the acute solution for the unknown angle (the bare arcsin result) and never considering the obtuse supplement.
- Root cause: arcsin's calculator convention returns only the first-quadrant value by default, so the second, equally valid, obtuse solution is invisible unless explicitly sought.
- Repair: given $\sin B=3/4$, state BOTH solutions in $[0°,180°)$ — $B_1\approx48.59°$ and $B_2\approx131.41°$ — then check triangle validity for each ($A+B<180°$) before discarding either.

**MC-3 — ANGLE-SIDE-PAIRING** *(Moderate)*
- Surface form: writing $\frac{a}{\sin B}$ or $\frac{b}{\sin A}$ — pairing a side with the wrong angle in the proportion.
- Root cause: the lowercase-uppercase pairing convention is a notational rule, not a visually self-evident fact.
- Repair: for every side, ask "which vertex does NOT touch this side?" — that vertex's angle is the one it pairs with; side $b$ (connecting $A$ and $C$) does not touch vertex $B$, so it pairs with angle $B$.

## Analogies
- **The shared-altitude analogy**: dropping an altitude splits one oblique triangle into two right triangles that SHARE that altitude as a common side — equating the two expressions for that shared side is the entire derivation, directly reusing `math.trig.right-triangle-trig`'s own $\sin=\text{opp/hyp}$ definition twice.
- **Anti-analogy — arcsin does NOT tell you every angle with that sine.** This is MC-2's exact error, worth naming explicitly: the calculator's arcsin button is a convenience convention (return one representative value), not a claim that no other angle shares that sine value.

## Demonstrations
1. **Altitude derivation**: drop an altitude in a general triangle, derive $\frac{a}{\sin A}=\frac{c}{\sin C}$ from the two resulting right triangles' shared height, then extend to the full three-way relationship — grounding the law in already-mastered right-triangle trig.
2. **AAS/ASA gallery**: a sequence of angle-side-pair problems (e.g. $A=40°,B=70°,a=15\Rightarrow b\approx21.95$), emphasizing "find the third angle first" for ASA.
3. **The three-scenario SSA contrast**: side by side, $a<h$ (no triangle), $a=h$ (exactly one right triangle), $h<a<b$ (two triangles), and $a\ge b$ (exactly one, acute) — directly breaking MC-2 by making all four outcomes visible at once, not just the common two-triangle case.

## Discovery Questions
1. "Given $A=40°,B=70°,a=15$, can you find $b$ directly from a ratio, or do you need more information first?"
2. "If $\sin B=3/4$, is $B$ definitely acute? What other angle between $0°$ and $180°$ also has sine equal to $3/4$?"
3. "In the ratio $\frac{a}{\sin A}$, does side $a$ touch vertex $A$, or is it the side across from it?"

## Teaching Sequence
1. **Anchor in `math.trig.right-triangle-trig`**: restate $\sin=\text{opposite/hypotenuse}$ as the single fact this concept's altitude-splitting derivation reuses twice.
2. **Representation shift**: the full altitude derivation, ending in the stated law and an explicit "when to use / when NOT to use alone" summary — directly countering MC-1 and MC-3 by grounding the pairing in the derivation's own labeled diagram.
3. **Pattern induction**: the AAS/ASA gallery, with the "find the third angle first" rule stated explicitly for ASA.
4. **Contrast pair (breaks MC-2)**: the four-scenario SSA table (0/1/1/2 triangles), worked through a concrete two-triangle example showing both $B_1$ and $B_2$ checked for validity.
5. **Mastery gate**: 4-item problem set (an AAS side-finding problem, an ASA problem requiring the third angle first, an SSA ambiguous-case count-and-solve problem, an SAS-disguised-as-a-trap problem requiring $C$'s finding) plus 1 independence-mode transfer probe (a river-crossing surveying triangulation problem).

## Tutor Actions
- **Representation shift**: the altitude-derivation of the law from right-triangle trig, with explicit when-to-use/when-not guidance.
- **Pattern induction**: the AAS/ASA proportion-setup gallery.
- **Contrast pair** (MC-2): the four-scenario SSA table, worked through a concrete two-solution example.
- **Mastery gate**, 4-item problem set plus 1 transfer probe.

## Voice Teaching Notes
- When first stating the law, say explicitly "this comes straight from opposite-over-hypotenuse — we're just applying it twice and equating the shared height," front-loading the derivation-not-a-new-fact framing before the formula itself.
- For MC-2, use a fixed spoken checklist every time SSA arises: "First — is this SSA? Second — compute both $B_1$ and $180°-B_1$. Third — check which ones keep the angle sum under $180°$." — never skip stating all three steps aloud.
- For MC-3, ask "which vertex does this side skip?" as a standing verification question before finalizing any proportion setup.

## Assessment Signals
- **Early warning for MC-1**: attempting to set up a direct sine ratio when given SAS or SSS, without recognizing that no complete opposite-pair is available.
- **Early warning for MC-2**: reporting only the arcsin result for an SSA angle without checking or mentioning the supplementary angle.
- **Early warning for MC-3**: writing a proportion that pairs a side with an angle it does not sit opposite.
- **Mastery evidence**: correctly identifying whether the Law of Sines applies to a fresh, unseen configuration, and correctly finding BOTH solutions (when two exist) on a fresh SSA problem without prompting.

## Tutor Recovery Strategy
- On MC-1: re-check the given configuration against the AAS/ASA/SAS/SSS classification explicitly, rather than re-stating the law's formula — the misconception is a scope-overextension, not a formula-recall gap.
- On MC-2: rework a fresh SSA example (different numbers) requiring the full two-solution check, always stating the height test ($a<h$, $a=h$, $h<a<b$, $a\ge b$) explicitly before computing anything — since the misconception is a systematically missing step, not an arithmetic error.
- On MC-3: return to the "which vertex does this side skip?" question with a relabeled or rotated triangle, since the misconception is about the pairing convention losing its meaning outside the standard orientation.
- If a learner correctly applies the law to AAS/ASA but fails every SSA problem, treat the ambiguous case as a genuinely distinct sub-skill (not a minor variant) and dedicate focused practice specifically to the height-test-then-both-solutions procedure.

## Memory Hooks
- "Drop an altitude, get two right triangles, equate the shared height" — the derivation.
- "Side opposite the angle, always" — for MC-3.
- "arcsin gives you one answer — check the supplement too" — for MC-2.
- "SAS and SSS need Cosines, not Sines" — for MC-1.

## Transfer Connections
- **`math.trig.right-triangle-trig`** (prerequisite, already authored): the $\sin=\text{opposite/hypotenuse}$ definition this concept's altitude derivation applies twice.
- **`math.trig.law-of-cosines`** (sibling, authored this same batch): the companion law for SAS/SSS configurations this concept's own MC-1 repair explicitly points toward.
- **`math.trig.basic-ratios`** (sibling, authored this same batch): the same SOH-CAH-TOA labeling discipline (opposite/adjacent relative to the reference angle) generalizes here to opposite-side-relative-to-angle across a full triangle rather than just a right triangle.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a river-crossing surveying context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.law-of-sines.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the altitude derivation, the AAS/ASA gallery, the four-scenario SSA table with the $A=30°,a=8,b=12$ two-triangle worked case), the complete misconception registry (MC-1 High, MC-2 Foundational, MC-3 Moderate), and the surveying transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero technical discrepancy** (the Blueprint's own "Unlocks" prose is descriptive, naming no specific concept id, and does not contradict the KG's empty `unlocks` field).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "A surveyor at point A sights a landmark C across a river. The line of sight makes 35° with the riverbank AB. From point B, 100 m downstream from A, the sighting angle to C is 55° (measured from the bank on the same side). Find the distance AC." *(Expected: angle at A = 35°, angle at B = $180°-55°=125°$, angle at C = $180°-35°-125°=20°$. By the Law of Sines, $AC/\sin B=AB/\sin C\Rightarrow AC=100\cdot\sin125°/\sin20°\approx239.5$ m.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero technical Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). The Blueprint's Component 7/completion-note "Unlocks" text ("Combined law of sines/cosines applications; surveying and navigation problems," "Navigation and surveying applications; combined law problems") is descriptive prose naming no specific concept id, unlike `math.trig.basic-ratios`' own genuine `math.trig.special-angles` discrepancy (this batch's own companion entry) — so this is not counted as a metadata mismatch.

## Version History
- **2026-09-12 (Batch 56)**: authored as part of the Mathematics Educational Brain completion campaign. One of three `math.trig` concepts authored this batch (companions: `math.trig.basic-ratios`, `math.trig.law-of-cosines`), all three unblocked by the already-authored `math.trig.right-triangle-trig` (Batch 52). `math.trig` moves from 9/25 to 10/25 this batch.
