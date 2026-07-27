# math.geom.surface-area

## Identity
- **KG ID**: `math.geom.surface-area`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.area`, `math.geom.solid-3d`
- **Unlocks**: `math.calc.surface-area-integral` (per the KG; the Blueprint's metadata disagrees — see Curriculum Feedback)
- **Cross-links**: `math.calc.surface-area-integral` (no Blueprint, no Educational Brain entry; P76_mode = independence)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 8 (per the KG; the Blueprint states 5 — see Curriculum Feedback)
- **Blueprint**: `docs/curriculum/blueprints/math.geom.surface-area.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute a solid's total surface area by identifying every face, computing each face's area with ordinary 2D formulas, and summing — including easily-missed faces such as a cylinder's two circular ends — and will recognize (orientation level) that curved solids with no flat faces, like the sphere, require the genuinely different surface-integral technique whose closed-form results (e.g. 4πr²) remain directly usable.

## Core Understanding
Per the Blueprint's Component 3: surface area is 2D area computation applied to every face and summed — no new area-finding technique is needed beyond `math.geom.area`'s own formulas; the new content is applying them once per face (per `math.geom.solid-3d`'s face structure) and combining the results. Every face must be counted: a cylinder has three surfaces (two circular ends plus the curved lateral surface, which unrolls into a rectangle of width 2πr and height h), and omitting any of them produces a systematic undercount — genuinely missing area, not a rounding discrepancy. Solids with no flat faces at all, like the sphere, break the face-summing method entirely: there is no finite face list to sum, and the surface area must come from a surface integral instead. The sphere's 4πr² is the known closed-form result of that integral, usable directly once established — the formula transfers even though the derivation method does not.

## Mental Models
1. **The wrapping-paper model** (Blueprint A01): surface area is how much paper it takes to wrap the solid with no overlap — each flat face gets its own panel of paper, and the total is the sum of the panels.
2. **The unrolling model** (Blueprint Example 2): the cylinder's curved side unrolls flat into a rectangle (circumference × height) — curved-but-developable surfaces reduce to 2D area after unrolling.
3. **The no-faces-to-sum boundary** (Blueprint A03): the face-summing method needs a face list; a sphere has none, marking the exact boundary where elementary methods end and the surface integral begins.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing surface area requires a fundamentally new computational technique rather than repeated 2D area. A second failure treats a forgotten face as a minor error rather than a substantial systematic undercount. A third assumes the sphere can be handled by the same face-summing used for prisms and cylinders.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — SURFACE-AREA-ASSUMED-NEW-TECHNIQUE** (Foundational)
  - **Blueprint description**: believing surface area requires a fundamentally new area-computation technique, missing that it is 2D area computation applied to each face and summed.
  - **Birth type**: Type 5, instruction-induced — surface-area formulas are conventionally taught as one new standalone formula per solid type (box: 2lw+2lh+2wh, cylinder: 2πr²+2πrh, …), which presents the topic as a fresh formula family and hides that every formula is just a pre-summed face list.
  - **Repair approach**: Blueprint Repair B01 — re-walking Example 1's face-by-face computation, re-anchoring on "2D area applied repeatedly and summed."

- **MC-2 — MISSED-FACE-ASSUMED-MINOR-ERROR** (High)
  - **Blueprint description**: believing omitting one face produces only a small, rounding-level error, missing that it produces a substantial, systematic undercount.
  - **Birth type**: Type 2, perceptual intuition — the faces most often dropped (a cylinder's ends, a prism's back or bottom) are exactly the perceptually hidden ones in standard drawings; what isn't visually salient doesn't feel like missing area.
  - **Repair approach**: Blueprint Repair B02 — re-walking Example 2's concrete gap: 42π ≈ 131.9 without the ends versus the correct 60π ≈ 188.5.

- **MC-3 — SPHERE-ASSUMED-COMPUTABLE-BY-FACE-SUMMING** (Moderate)
  - **Blueprint description**: believing a sphere's surface area can be computed by summing flat faces, missing that it has no flat faces and requires a surface integral.
  - **Birth type**: Type 1, overgeneralization — the face-summing technique, correct for every polyhedron and even (via unrolling) the cylinder, is over-applied to a solid with no faces to list.
  - **Repair approach**: Blueprint Repair B03 — re-walking Example 3's no-flat-faces observation, re-anchoring on "a surface integral is required instead, though its result 4πr² is still directly usable."

## Analogies
- **Wrapping a present** (Blueprint A01): each face needs its own panel of wrapping paper — and a forgotten panel leaves bare solid showing, not a slightly-small total.
- **The soup-can label** (Blueprint P76): the lateral surface as the label, the full surface as label-plus-ends — making the total-vs-lateral distinction a physical question about what is actually being covered.

## Demonstrations
- The 5×3×4 box: three congruent face pairs (15, 20, 12), total 2(15)+2(20)+2(12) = 94, every face's area from the ordinary rectangle formula (Blueprint Example 1), targeting MC-1.
- The r=3, h=7 cylinder: ends 18π, unrolled lateral rectangle 42π, total 60π ≈ 188.5 — with the explicit undercount 42π ≈ 131.9 if the ends are dropped (Blueprint Example 2), targeting MC-2.
- The sphere's empty face list and its 4πr² as a surface-integral result rather than a face sum (Blueprint Example 3), targeting MC-3.

## Discovery Questions
1. "Does finding a box's surface area need any area formula you don't already know?"
2. "How many separate surfaces does a cylinder have? What happens to the total if you forget one?"
3. "Can you list a sphere's faces? What does that tell you about summing them?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (surface area as repeated 2D area, not a new technique) → A02 (a missed face is a systematic undercount, with conflict evidence) → A03 (curved solids without flat faces need the surface integral) → A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — physically unfolding a box's net (or unrolling a paper cylinder label) so the face list becomes visible flat 2D shapes (Blueprint CPA Concrete entry).
- **DO: Worked Example** — the cylinder's three-surface computation with each surface named before any arithmetic (Blueprint Example 2).
- **TEST-THINKING: Error Analysis** — presenting the 42π-only cylinder "total" and having the student find the missing 18π, targeting MC-2.
- **TELL: Explanation** — why the sphere's 4πr² can be used but not derived by face-summing, targeting MC-3.

## Voice Teaching Notes
Before accepting any surface-area total, ask "how many faces did you count — and can you name each one?" as the standing MC-2 check. Per the Blueprint's Component 8, the cylinder is the deliberately chosen centerpiece example precisely because its unrolled lateral rectangle and its easily-forgotten ends make MC-1 and MC-2 both concretely testable in one solid.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — the cross-link target `math.calc.surface-area-integral` has no Blueprint)**: reused verbatim from the Blueprint's A04 — the soup-can label problem: computing all three surfaces, articulating total-vs-lateral surface area against the physical question asked, and explaining why hemispherical caps would exceed flat-area formulas.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-2 persists, require a written face inventory ("faces: top circle, bottom circle, lateral") before any computation is allowed to start — the enumeration habit, not the arithmetic, is what's being trained. If MC-1 persists, ban the pre-packaged formulas temporarily and require every total to be assembled face-by-face until the formulas are recognized as summaries rather than new laws.

## Memory Hooks
- "Surface area = every face's 2D area, summed — nothing new, just repeated."
- "Name every face before you compute — a forgotten face is missing area, not a rounding error."
- "A cylinder has three surfaces; its side unrolls into a rectangle."
- "No faces to list? Then face-summing is over — that's surface-integral territory."

## Transfer Connections
- `math.geom.area` (requires) supplies every per-face 2D formula this concept applies repeatedly.
- `math.geom.solid-3d` (requires) supplies the face/edge/vertex structure that determines what gets summed.
- `math.geom.volume` (related, already-authored EB sibling) measures the same solids' interiors — the surface/interior contrast (paint vs. fill) sharpens both concepts.
- `math.calc.surface-area-integral` (unlocks per the KG, cross-link) is the general technique for the curved-surface cases this concept explicitly marks as out of elementary reach.

## Cross-Subject Connections
- Physics/chemistry: surface-area-to-volume ratio governs heat loss, reaction rates, and cell size — the standard scientific payoff of computing surface area and volume for the same solid.

## Blueprint References
`docs/curriculum/blueprints/math.geom.surface-area.md` — all worked examples, teaching actions, repair actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
Two Blueprint/KG metadata divergences found, both resolved in the KG's favor per the standing rule (KG authoritative on any divergence; no Blueprint or KG file modified):
1. **estimated_hours**: Blueprint Component 0 states 5; the KG states 8. This entry records 8.
2. **unlocks**: Blueprint Component 0 and Component 7 state "none"; the KG lists `math.calc.surface-area-integral` in both `unlocks` and `cross_links`. This entry records the KG's unlock. (The Blueprint's P76_mode = independence remains correct either way, since the target has no Blueprint on disk.)

## Version History
- v1.0 (2026-07-27): Initial authoring, Domain Certification Mode, math.geom Wave 9.
