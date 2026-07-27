# math.geom.area-polygon

## Identity
- **KG ID**: `math.geom.area-polygon`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.area-triangle`
- **Unlocks**: `math.geom.area`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.geom.area-polygon.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute any simple polygon's area by decomposing it into triangles from one vertex, apply the parallelogram (bh) and trapezoid (½(b₁+b₂)h) formulas as derivable shortcuts rather than independent facts, and apply the regular polygon formula ½ap recognizing it as n-triangle decomposition applied to a symmetric case.

## Core Understanding
Per the Blueprint's Component 3: any simple (non-self-intersecting) polygon can be decomposed into triangles by drawing diagonals from a single vertex — the resulting triangles are non-overlapping and their areas sum to exactly the polygon's total area, a fully general technique working for irregular shapes just as well as regular ones. A parallelogram, split by one diagonal, becomes exactly two congruent triangles each with base b and height h, so its total area is bh (not ½bh, which is only one triangle); a trapezoid similarly splits into two triangles sharing height h but with the two parallel sides b₁, b₂ as their bases, summing to ½(b₁+b₂)h. A regular n-gon, connected from its center to every vertex, decomposes into n congruent isosceles triangles each with base equal to one side and height equal to the apothem a; summing all n areas gives ½ap (since n×side=p, the perimeter) — the regular polygon formula is nothing more than n-triangle decomposition applied to a symmetric case.

## Mental Models
1. **The universal-decomposition model** (Blueprint TA-A01, P11): draw diagonals from one vertex, split into triangles, add up their areas — this works for any simple polygon, symmetric or not.
2. **The two-triangles-not-one model** (Blueprint TA-A02, P28): a parallelogram is made of two congruent triangles, not one, so its area is bh (2×½bh), never ½bh.
3. **The shortcuts-are-decomposition-in-disguise model** (Blueprint TA-A03, P06): the regular polygon formula ½ap is exactly what n-triangle decomposition from the center gives — not a separate fact to memorize.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing the parallelogram, trapezoid, and regular-polygon area formulas are three independent facts to memorize separately, missing that they are all derivable from triangle decomposition. A second failure is believing a parallelogram's area is ½×base×height (the triangle formula), missing that a parallelogram is made of two triangles, summing to base×height. A third failure is believing triangle decomposition only works for regular or symmetric polygons, missing that it is a fully general method for any simple polygon.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — POLYGON-AREA-FORMULAS-TREATED-AS-INDEPENDENT-FACTS** (Foundational)
  - **Blueprint description**: believing the parallelogram, trapezoid, and regular-polygon area formulas are three independent facts to memorize separately, missing they are all derivable from triangle decomposition.
  - **Birth type**: Type 5, instruction-induced — each shortcut formula is typically taught and drilled in isolation, per shape, without ever connecting it back to the underlying triangle-decomposition principle.
  - **Repair approach**: Blueprint Repair Action B01 — the exact numeric match between the direct triangle-decomposition sum and the regular-polygon formula, re-anchoring on "every shortcut is triangle decomposition in disguise."

- **MC-2 — PARALLELOGRAM-AREA-MISTAKENLY-USES-TRIANGLE-FORMULA** (Foundational)
  - **Blueprint description**: believing a parallelogram's area is ½×base×height, missing that a parallelogram is made of two triangles, summing to base×height.
  - **Birth type**: Type 6, analogy overextension — the ½bh triangle formula is over-applied directly to a parallelogram because the base and height labels look identical, without accounting for the parallelogram being composed of two triangles rather than one.
  - **Repair approach**: Blueprint Repair Action B02 — the explicit two-triangle decomposition of a parallelogram, re-anchoring on "the formula is base times height, not half of that."

- **MC-3 — TRIANGLE-DECOMPOSITION-ASSUMED-ONLY-FOR-REGULAR-POLYGONS** (Foundational)
  - **Blueprint description**: believing triangle decomposition only works for regular or symmetric polygons, missing that it is a fully general method for any simple polygon.
  - **Birth type**: Type 1, overgeneralization — decomposition is most often demonstrated on regular, symmetric shapes for simplicity, over-generalizing that symmetry is a requirement rather than a convenience.
  - **Repair approach**: Blueprint Repair Action B03 — the fully irregular quadrilateral decomposition, re-anchoring on "decomposition works for ANY simple polygon — regularity isn't required at all."

## Analogies
- **The landscape-architect analogy** (Blueprint Component 5, P76): an architect computing the area of an irregularly-shaped, 6-sided garden plot with no parallel or equal sides must use general triangle decomposition, since none of the standard shortcut formulas apply directly, and even the regular-hexagon formula would be a genuine mistake despite the matching side count.

## Demonstrations
- Decomposing an irregular quadrilateral (no symmetry at all) into two triangles from one diagonal, summing their areas via the coordinate-based triangle-area formula (Blueprint A01, Example 1), targeting MC-3.
- Splitting a parallelogram (base 6, height 4) into two congruent triangles, confirming the total is bh=24, not ½bh=12 (Blueprint A02, Example 2), targeting MC-2.
- Verifying a regular hexagon's area both via direct 6-triangle summation and via the ½ap shortcut formula, both yielding 24√3 (Blueprint A03, Example 3), targeting MC-1.

## Discovery Questions
1. "Does triangle decomposition only work for regular or symmetric polygons?"
2. "Is a parallelogram's area ½×base×height, the same formula as a triangle?"
3. "Are the parallelogram, trapezoid, and regular-polygon formulas three separate facts, or connected somehow?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (decomposition works for any simple polygon) → A02 (parallelogram is two triangles, not one) → A03 (the regular polygon formula is n-triangle decomposition) → A04 (Mastery Gate, P91).

## Tutor Actions
- **DO: Worked Example** — the fully irregular quadrilateral decomposed and its area summed from two triangles (Blueprint A01), targeting MC-3.
- **TEST-THINKING: Error Analysis** — the parallelogram's two-triangle decomposition, confirming bh not ½bh (Blueprint A02), targeting MC-2.
- **ORGANIZE: Concept Map** — the direct match between n-triangle decomposition and the ½ap shortcut for a regular hexagon (Blueprint A03), targeting MC-1.
- **TELL: Explanation** — the general principle that every polygon-area shortcut reduces to triangle decomposition.

## Voice Teaching Notes
When a student states the parallelogram area formula, ask "is a parallelogram one triangle or two?" as a standing check directly targeting MC-2.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A04 — the landscape-architect's irregular 6-sided garden plot scenario, explaining why no shortcut formula applies and why even the regular-hexagon formula would be a mistake.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to re-derive whichever shortcut formula is in question directly from triangle decomposition before using it, for every new shape encountered, until the shortcuts are recognized as consequences rather than independent rules.

## Memory Hooks
- "Diagonals from one vertex, split into triangles, add up the areas — works for any simple polygon."
- "A parallelogram is two triangles — its area is base times height, not half."
- "The regular-polygon formula ½ap is just n triangles from the center, added up."

## Transfer Connections
- `math.geom.area` (unlocks) extends area treatment across shape families, building on this concept's decomposition and shortcut-formula machinery.
- `math.geom.area-triangle` (requires) supplies the ½bh and Heron's formula this concept's decomposition method directly sums.

## Cross-Subject Connections
- Chemistry: computing the cross-sectional area of irregular container or reaction-vessel shapes routinely relies on the same triangle-decomposition principle.

## Blueprint References
`docs/curriculum/blueprints/math.geom.area-polygon.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 7.
