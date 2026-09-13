# math.trig.law-of-cosines — Law of Cosines

## Identity
- **KG id**: `math.trig.law-of-cosines`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.right-triangle-trig`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 5

## Learning Objective
The learner identifies SAS and SSS as the Law of Cosines configurations, applies $c^2=a^2+b^2-2ab\cos C$ to find a missing side, rearranges it to $\cos C=\frac{a^2+b^2-c^2}{2ab}$ to find a missing angle, and correctly selects between the Law of Cosines and `math.trig.law-of-sines` based on the given configuration.

## Core Understanding
The Law of Cosines is a **corrected Pythagorean theorem** — `math.trig.right-triangle-trig`'s own $c^2=a^2+b^2$ generalized to triangles that are not right triangles. The derivation makes the correction visible: draw an altitude $h$ from one vertex, splitting the opposite side into two segments; applying the Pythagorean theorem to each of the two resulting right triangles and combining the two equations (using $x=c\cos A$ to relate the projection to the known angle) yields $c^2=a^2+b^2-2ab\cos C$.

The $-2ab\cos C$ term is precisely the correction the Pythagorean theorem is missing when the included angle $C$ is not $90°$: when $C=90°$, $\cos C=0$ and the formula collapses exactly to $c^2=a^2+b^2$, confirming the Pythagorean theorem as the special case. For an acute angle ($\cos C>0$), the correction SHORTENS $c$ below the Pythagorean prediction; for an obtuse angle ($\cos C<0$), it LENGTHENS $c$ beyond it.

Rearranged as $\cos C=\frac{a^2+b^2-c^2}{2ab}$, the same formula finds a missing angle from three known sides (SSS). Unlike `math.trig.law-of-sines`'s own SSA ambiguous case, the Law of Cosines **never** produces an ambiguous result: $\arccos$ returns a unique value in $[0°,180°]$ for any input in $[-1,1]$, so whatever value it produces IS the correct angle — including an obtuse one, when $\cos C$ comes out negative.

The concept's second central skill is **law selection**: SAS (two sides and their included angle) and SSS (all three sides) require the Law of Cosines, since neither configuration contains a complete angle-side opposite pair that `math.trig.law-of-sines` needs; AAS and ASA, by contrast, are solved faster by the Law of Sines.

## Mental Models
- **The formula is Pythagoras plus a correction term.** Setting $C=90°$ recovers the ordinary Pythagorean theorem exactly, confirming the sign and structure of the $-2ab\cos C$ term rather than requiring it to be memorized in isolation.
- **arccos never has an ambiguous case.** Unlike arcsin, which discards one of two valid solutions by convention, arccos's own domain restriction to $[0°,180°]$ covers the ENTIRE range of possible triangle angles — so there is nothing left to check for a second solution.
- **Configuration determines the law, not preference.** SSS and SAS (Cosines) versus AAS and ASA (Sines) is a structural fact about which pieces of information are given, not a matter of which formula a learner happens to remember first.

## Why Students Fail
This Blueprint supplies a "Trigger" column rather than an explicit birth-type classification, so each misconception is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: the visually similar Pythagorean theorem has an unbroken plus sign ($a^2+b^2$), and without the derivation's explicit correction-term framing, the minus sign in the Law of Cosines is easy to drop or misremember as a plus, especially under exam pressure.
- **MC-2** is a **Type 6 (analogy overextension)**, and the Blueprint's own designated Foundational misconception: a learner who has just learned `math.trig.law-of-sines`'s own genuinely ambiguous SSA case may overextend that same "watch for a second solution" caution onto the Law of Cosines, where no such ambiguity exists — or, in the opposite direction, may import an unrelated "arccos only gives acute angles" assumption from an entirely different context (e.g. a first exposure to inverse trig functions on a restricted domain) without checking that arccos's true range is the full $[0°,180°]$.
- **MC-3** is a **Type 1 (overgeneralization)**: having just learned two triangle-solving laws in sequence, a learner may apply whichever one was seen most recently to every new problem, rather than checking the given configuration each time.

## Misconceptions
**MC-1 — COSINE-SIGN-ERROR** *(High)*
- Surface form: writing $c^2=a^2+b^2+2ab\cos C$ (a plus sign), dropping the required minus.
- Root cause: overgeneralizing the visually similar Pythagorean theorem's unbroken plus-sign structure onto this formula.
- Repair: set $C=90°$ in the correct formula — $\cos90°=0$, so $c^2=a^2+b^2-0=a^2+b^2$, exactly recovering the Pythagorean theorem; a plus sign would instead give $c^2=a^2+b^2+2ab$, which is NOT the Pythagorean theorem and is structurally wrong for a right angle.

**MC-2 — ARCCOS-ACUTE-ONLY** *(Foundational)*
- Surface form: expecting $\arccos$ to return only an acute angle, and misidentifying an angle as acute when it should genuinely be obtuse.
- Root cause: overextending an unrelated ambiguous-case caution (from the Law of Sines) or an unrelated restricted-domain assumption onto a function that has no such restriction here.
- Repair: given $\cos C=-0.5$ from an SSS problem, compute $\arccos(-0.5)=120°$ directly — a negative cosine value means the angle IS between $90°$ and $180°$, and arccos reports this directly with no second solution to check, unlike the Law of Sines' own SSA case.

**MC-3 — WRONG-LAW-SELECTION** *(Moderate)*
- Surface form: applying the Law of Cosines to an AAS or ASA configuration where the Law of Sines would apply directly and more simply.
- Root cause: overgeneralizing whichever law was most recently practiced onto every new problem, rather than re-checking the given configuration each time.
- Repair: given $A=50°,B=70°,a=12$ (AAS), ask "do I have a complete side-angle-opposite pair?" — yes ($a$ and $A$) — so the Law of Sines applies directly; the Law of Cosines would require first finding a third piece of information unnecessarily.

## Analogies
- **The corrected-Pythagoras analogy**: the entire formula is `math.trig.right-triangle-trig`'s own Pythagorean theorem with one additional term that vanishes exactly at $90°$ — never a separate, unrelated fact.
- **Anti-analogy — the Law of Cosines' arccos step does NOT need a second-solution check the way the Law of Sines' arcsin step does.** This is MC-2's exact error, worth naming explicitly: the two inverse functions behave differently on the domain $[0°,180°]$ specifically because arccos's own principal range already spans that entire interval, while arcsin's does not.

## Demonstrations
1. **Altitude derivation with the Pythagorean special case**: derive $c^2=a^2+b^2-2ab\cos C$ from two right triangles created by an altitude, then immediately verify $C=90°$ collapses it to the ordinary Pythagorean theorem — directly breaking MC-1 by grounding the sign in a checkable special case.
2. **SAS/SSS gallery with an obtuse-angle result**: work an SSS example where $\cos C$ comes out negative (e.g. sides 5, 7, 9 giving $C\approx95.7°$), explicitly stating "arccos gives this directly — no second solution to check" — directly breaking MC-2.
3. **Side-by-side law-selection table**: SSS/SAS (Cosines) versus AAS/ASA (Sines), worked through one problem of each type with the identical decision question asked both times — directly breaking MC-3.

## Discovery Questions
1. "Set $C=90°$ in the Law of Cosines formula. What do you get? Does it match a formula you already know?"
2. "If $\cos C=-0.5$ from an SSS problem, is there more than one possible value of $C$ between $0°$ and $180°$, the way there can be for the Law of Sines?"
3. "You know two angles and a side. Do you actually need the Law of Cosines here, or would the Law of Sines work directly and more simply?"

## Teaching Sequence
1. **Anchor in `math.trig.right-triangle-trig`**: restate the Pythagorean theorem as the special case this concept's formula reduces to at $C=90°$.
2. **Representation shift**: the full altitude derivation ending in the stated formula and its angle-finding rearrangement, with the $C=90°$ check performed immediately — directly countering MC-1.
3. **Pattern induction (breaks MC-2)**: the SAS/SSS gallery, explicitly including at least one obtuse-angle SSS result, stating "arccos never has an ambiguous case" as a standing rule.
4. **Contrast pair (breaks MC-3)**: the SSS/SAS-versus-AAS/ASA selection table, worked through one problem of each configuration with the identical "what's given, which law fits" decision process.
5. **Mastery gate**: 4-item problem set (an SAS side-finding problem, an SSS all-angles problem, a second SAS problem, a bearing/navigation SAS-shaped word problem) plus 1 independence-mode transfer probe (a radio-tower triangulation problem with an embedded epistemic claim-evaluation task targeting MC-2).

## Tutor Actions
- **Representation shift**: the altitude derivation with the immediate $C=90°$ Pythagorean-theorem check.
- **Pattern induction**: the SAS/SSS gallery including an explicit obtuse-angle SSS case.
- **Contrast pair** (MC-3): the SSS/SAS-versus-AAS/ASA law-selection table.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded epistemic claim-evaluation task.

## Voice Teaching Notes
- When first stating the formula, immediately follow with "let's check: what happens if $C$ is $90°$?" before moving on — making the Pythagorean special case a spoken verification step rather than an afterthought, directly targeting MC-1.
- For MC-2, use a fixed spoken phrase whenever an SSS angle comes out with a negative cosine: "negative cosine, obtuse angle — arccos gives it to us directly, nothing more to check," distinguishing this explicitly from the Law of Sines' own two-solution caution.
- For MC-3, ask "what configuration is this — SSS, SAS, AAS, or ASA?" as the FIRST spoken question on every new triangle problem, before any formula is invoked.

## Assessment Signals
- **Early warning for MC-1**: writing the formula with a plus sign, or being unable to state what the formula reduces to when $C=90°$.
- **Early warning for MC-2**: reporting an angle as acute (via a reference-angle-style calculation) when the correct arccos result is genuinely obtuse.
- **Early warning for MC-3**: applying the Law of Cosines to an AAS or ASA configuration, or vice versa, without first checking what information is actually given.
- **Mastery evidence**: correctly deriving or verifying the Pythagorean special case unprompted, correctly reporting an obtuse angle from a negative cosine without hesitation, and correctly selecting between the two laws on a fresh, unseen configuration.

## Tutor Recovery Strategy
- On MC-1: re-verify the $C=90°$ special case with the learner performing the substitution themselves, rather than simply restating the correct sign — the misconception is about a missing anchor check, not a missing formula.
- On MC-2: rework a fresh SSS example with a genuinely obtuse angle (different numbers than already seen), explicitly contrasting it against the Law of Sines' own ambiguous case to make the structural difference between the two inverse functions concrete.
- On MC-3: return to the four-configuration classification question ("what's given?") on a fresh problem, rather than re-explaining either formula individually — the misconception is a selection error, not a computation error within either law.
- If a learner correctly computes with the Law of Cosines when told which law to use but fails to select it independently, treat this as a distinct classification-skill gap and route to fresh mixed-configuration practice rather than more single-law drilling.

## Memory Hooks
- "Set $C=90°$ — you get Pythagoras back" — for MC-1.
- "Negative cosine means obtuse — arccos just tells you, no second check" — for MC-2.
- "SSS and SAS need Cosines; AAS and ASA need Sines" — for MC-3.

## Transfer Connections
- **`math.trig.right-triangle-trig`** (prerequisite, already authored): the Pythagorean theorem this concept's formula generalizes, and the special-case check ($C=90°$) that directly confirms it.
- **`math.trig.law-of-sines`** (sibling, authored this same batch): the companion law for AAS/ASA configurations, and the explicit contrast point for MC-2 (arcsin's genuine ambiguity versus arccos's lack of one) and MC-3 (law selection).
- **`math.trig.basic-ratios`** (sibling, authored this same batch): the SOH-CAH-TOA foundation both this concept and `law-of-sines` extend from a single right triangle to a general one.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a radio-tower triangulation context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.law-of-cosines.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the altitude derivation with the $C=90°$ check, the SAS/SSS gallery including the obtuse-angle SSS case, the SSS/SAS-versus-AAS/ASA selection table), the complete misconception registry (MC-1 High, MC-2 Foundational, MC-3 Moderate), and the radio-tower transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero technical discrepancy** (the Blueprint's own "Unlocks" prose is descriptive, naming no specific concept id, and does not contradict the KG's empty `unlocks` field).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "Two radio towers A and B are 50 km apart. A receiver at point C detects signals from both. The distance from A to C is 35 km and from B to C is 40 km. (a) Find angle ACB (the angle at C in triangle ABC). (b) A technician claims the triangle must be acute because 'all distances are less than 50 km.' Evaluate this claim." *(Expected: (a) $\cos(ACB)=\frac{35^2+40^2-50^2}{2\cdot35\cdot40}=\frac{325}{2800}\approx0.1161$, so $ACB=\arccos(0.1161)\approx83.3°$. (b) The claim's REASONING is wrong even though its conclusion happens to hold here — the largest angle is opposite the largest side, and arccos produces the correct result in $[0°,180°]$ regardless of how the side lengths compare to some arbitrary bound; a differently-proportioned triangle with the same "all sides under 50" property could still yield an obtuse angle.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero technical Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). The Blueprint's Component 7/completion-note "Unlocks" text ("Heron's formula; navigation/surveying applications," "Triangle area via Heron's formula; surveying and navigation applications") is descriptive prose naming no specific concept id, matching this batch's own `math.trig.law-of-sines` finding — not counted as a metadata mismatch, distinct from `math.trig.basic-ratios`' own genuine discrepancy this same batch.

## Version History
- **2026-09-12 (Batch 56)**: authored as part of the Mathematics Educational Brain completion campaign. One of three `math.trig` concepts authored this batch (companions: `math.trig.basic-ratios`, `math.trig.law-of-sines`), all three unblocked by the already-authored `math.trig.right-triangle-trig` (Batch 52). `math.trig` moves from 10/25 to 11/25 this batch.
