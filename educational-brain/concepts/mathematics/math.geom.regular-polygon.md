# Regular Polygon (math.geom.regular-polygon)

## Identity
- **Concept ID**: math.geom.regular-polygon
- **Subject**: mathematics
- **Domain**: geometry (math.geom)
- **Grade Band**: intermediate (6–8)
- **Bloom Level**: understand
- **Difficulty**: developing
- **Mastery Threshold**: 0.85
- **Estimated Hours**: 3.0
- **KG Status**: active (NCERT Grade 8, OpenStax Geometry, AoPS Geometry)

## Learning Objective
Students will define a regular polygon as one where all sides are equal AND all interior angles are equal, compute each interior angle using the formula (n−2)×180°/n and each exterior angle using 360°/n, determine the number of sides from a given interior or exterior angle, recognize that a regular n-gon can be inscribed in a circle (all vertices on a circle), and understand intuitively why regular polygons approach a circle as n → ∞.

## Core Understanding
A regular polygon requires BOTH conditions simultaneously: all sides equal (equilateral) AND all angles equal (equiangular). Satisfying only one is not enough — a rhombus is equilateral but not equiangular; a rectangle is equiangular but not equilateral. The interior angle formula follows directly from the polygon angle sum: since the total is (n−2) × 180° and all n angles are equal, each is (n−2) × 180° / n. The exterior angle formula 360°/n follows from the fact that exterior angles of any convex polygon sum to exactly 360°, and for a regular polygon all exterior angles are equal. Key relationship: interior angle + exterior angle = 180° (they form a straight line at each vertex). The circle connection: the n vertices of a regular n-gon lie on a circle (the circumscribed circle); as n grows, the polygon's perimeter approaches the circle's circumference, and the polygon's area approaches the circle's area — the circle is the "limit" of the regular polygon sequence.

## Mental Models
1. **The equilateral-AND-equiangular test**: both conditions must be met simultaneously — a shape that passes one test but not the other is NOT regular; use a checklist: "All sides equal? ✓ All angles equal? ✓ Regular."
2. **The exterior-angle rotation model**: as you travel around a regular n-gon, you turn through each exterior angle once per vertex; after n vertices you have turned exactly 360° (one full revolution), so each exterior angle = 360°/n — the total is fixed, and the polygon decides how to divide it
3. **The center-fan model**: a regular n-gon can be divided into n identical isosceles triangles from the center; each triangle has a central angle of 360°/n; the pattern of perfect symmetry visualizes why every regular polygon has a circumscribed circle

## Why Students Fail
1. **Applying "equal sides OR equal angles" instead of "AND"**: confusing the equilateral-only and equiangular-only cases (rhombus, rectangle) with the regular polygon requires BOTH — students accept one condition as sufficient
2. **Confusing interior and exterior angles**: when computing "the angle of a regular hexagon," students may compute either the interior (120°) or the exterior (60°) depending on their formula use, and they mix them up or apply them to the wrong problem type
3. **Using the wrong formula variant**: attempting to compute the interior angle as 180°/n (forgetting the (n−2) factor), or as (n−2) × 180° without dividing by n (computing the total, not the individual angle)
4. **Not connecting the exterior angle to 360°/n**: the exterior angle formula is often taught separately from its 360° circle-of-rotation intuition, causing students to memorize two formulas that feel unrelated

## Misconceptions
**MC-1: ONE-CONDITION-SUFFICIENT (Type 5, instruction-induced)**
- **Characteristic phrase**: "A rhombus is regular because all its sides are equal" or "A rectangle is regular because all its angles are equal"
- **Mechanism**: "Regular" is taught informally as meaning "nice and symmetric," and some shapes (rhombus, rectangle) feel "regular" even though they satisfy only one of the two conditions; students don't retain the strict AND requirement
- **Evidence signature**: Classifies rhombuses or rectangles as regular polygons; cannot produce a counterexample to "equilateral → regular"
- **Repair path**: "Regular needs BOTH — all sides equal AND all angles equal. A rhombus has equal sides but unequal angles (unless it's a square). A rectangle has equal angles but unequal sides (unless it's a square). Only the square is a regular quadrilateral."

**MC-2: INTERIOR-EXTERIOR-ANGLE-SWAP (Type 4, notation-induced)**
- **Characteristic phrase**: computes "the angle of a regular hexagon" as 60° (the exterior angle) when asked for the interior angle, or vice versa
- **Mechanism**: The two formulas (n−2)×180°/n and 360°/n are often introduced in sequence; under recall pressure, students misapply the simpler-looking formula (360°/n) to the interior angle question rather than the exterior angle question, or confuse which supplement they need
- **Evidence signature**: Systematic 180° errors (interior = 180° − computed value) on angle problems; cannot state which formula gives which type of angle without prompting
- **Repair path**: Anchor the formulas to their origins: "360°/n is for EXTERIOR angles — the total rotation around the outside is 360°. (n−2)×180°/n is for INTERIOR angles — the total interior angle sum is (n−2)×180°." Always draw the angle being computed and label it "interior" or "exterior" before applying a formula

**MC-3: INTERIOR-ANGLE-AS-180/n (Type 5, instruction-induced)**
- **Characteristic phrase**: "The interior angle of a pentagon is 180°/5 = 36°" (wrong — each interior angle is 108°)
- **Mechanism**: The formula (n−2)×180°/n is cognitively cumbersome; students simplify it to 180°/n by dropping the (n−2) factor, effectively treating the polygon as if its angle sum were 180° (a triangle) regardless of n
- **Evidence signature**: All interior angle answers are between 0° and 180°/3 = 60° (for n≥3), all far too small; triangle (n=3) gives the only correct answer by coincidence (180°/3 = 60° = (3−2)×180°/3)
- **Repair path**: "The total interior angle sum is (n−2)×180°, NOT 180°. You divide that TOTAL by n to get each angle. Let's do it step by step: total for a pentagon = (5−2)×180° = 540°. Now divide by 5: 540°/5 = 108°."

**MC-4: EXTERIOR-ANGLE-NOT-SEEN-AS-SUPPLEMENT (Type 1, overgeneralization)**
- **Characteristic phrase**: "The exterior angle is 360°/n and the interior angle is (n−2)×180°/n — they're two different things" (correct, but student cannot connect them via the supplementary relationship at each vertex)
- **Mechanism**: Taught as two separate formulas, students don't recognize that exterior angle = 180° − interior angle at each vertex; this supplementary relationship provides a powerful check and a way to solve for n from either angle
- **Evidence signature**: Cannot compute n from a given interior angle (would require solving interior formula algebraically), but CAN compute n from an exterior angle (360°/n is simpler); more critically, cannot verify their answer by checking that interior + exterior = 180°
- **Repair path**: "At each vertex, the interior and exterior angles are supplementary — they share a straight line, so they must sum to 180°. So exterior angle = 180° − interior angle. Let's verify: for the regular hexagon, interior = 120°, exterior = 60°, sum = 180°. ✓"

## Analogies
1. **The clock face**: a regular 12-gon is like a clock face — 12 equal segments, 12 equal angles, the whole thing fits in a circle; as you add more hours (more sides), the clock face approaches a perfect circle
2. **Equal-slice pizza**: cutting a pizza into n equal slices by cuts through the center — each slice is an isosceles triangle, each central angle is 360°/n, the crust arc represents one side of the circumscribed circle. A "regular n-gon" is the shape of n-slice pizza's outer edge

## Demonstrations
1. **Build-from-exterior-angle**: start with the rotation model — walk along the edges of a regular polygon drawn on the floor, turning exactly 360°/n at each corner; count the turns (corners = sides = n) to verify the total rotation is 360°; this viscerally connects the exterior angle formula to the full-rotation reality
2. **Side-by-side rhombus/rectangle/square**: draw all three quadrilaterals; confirm the rhombus has equal sides but unequal angles; confirm the rectangle has equal angles but unequal sides; confirm the square has both — the only regular quadrilateral — making MC-1's counterexamples visible
3. **Regular polygon to circle limit**: draw regular 3, 4, 6, 8, 12 polygons inscribed in the same circle; observe the polygon increasingly approaching the circle as n grows — making the "limit as n→∞" concept concrete without calculus

## Discovery Questions
1. A rhombus has four equal sides. Is it a regular polygon? What additional condition would make it regular?
2. For a regular polygon, compute both the interior and exterior angle for n = 3, 4, 5, 6. What pattern do you notice as n increases?
3. If each exterior angle of a regular polygon is 24°, how many sides does it have? What formula did you use?
4. Can a regular polygon have an interior angle of 90°? Of 150°? Of 170°? How many sides would each require?
5. As the number of sides of a regular polygon grows without bound, what shape does it approach? Can you see why from the exterior-angle formula?

## Teaching Sequence
1. **Activation (3 min)**: Show pictures of an equilateral triangle, a square, a regular hexagon alongside a rhombus and a rectangle. Ask: "Which ones look 'perfectly symmetric'? What makes some of these more symmetric than others?"
2. **Definition: both conditions (5 min)**: Introduce "all sides equal AND all angles equal." Explicitly test the rhombus (equal sides, unequal angles) and rectangle (equal angles, unequal sides) to establish MC-1 counterexamples at the start
3. **Interior angle formula (8 min)**: Recall the polygon angle sum (n−2)×180° from prior knowledge (`math.geom.polygon-angle-sum`, if authored, or introduce the sum now). Divide by n. Work examples: triangle 60°, square 90°, pentagon 108°, hexagon 120°. Address MC-3 explicitly — show the incorrect 180°/n alongside the correct formula and confirm they give different answers
4. **Exterior angle formula (5 min)**: Rotation model — total rotation around any convex polygon is 360°; for regular, all equal, so each is 360°/n. Verify: hexagon exterior = 60° = 180° − 120°. Connect to interior angle via supplementary relationship (MC-4 repair)
5. **Circle connection (5 min)**: Inscribed regular polygon demo. "All vertices lie on a circle — as n grows, the polygon fills the circle." No formula required; visualization only
6. **Practice (7 min)**: Given n, find interior and exterior angles; given an exterior angle, find n; given an interior angle, find n (using interior = 180° − 360°/n rearranged)

## Tutor Actions
- **Always test BOTH conditions**: whenever "regular polygon?" is asked, insist on checking sides AND angles separately before concluding
- **Label which angle**: before every formula application, ask "which angle — interior or exterior?" and draw a labeled diagram
- **Connect the two formulas via 180°**: after computing one angle, always compute the other from supplementary sum as a check
- **Use the rotation walk for exterior angles**: make students verbally trace the walk-and-turn model for at least one polygon to internalize the 360°/n formula

## Voice Teaching Notes
- **Emphasis markers**: stress "AND — both conditions at once" when defining regular polygon; stress "TOTAL sum first, THEN divide by n" for the interior angle formula
- **Hesitation-recovery moves**: if a student is unsure which formula gives interior vs. exterior, ask "which one has the 360°? That's the exterior one — the full rotation around the outside"
- **Load-bearing sentences**:
  - "Regular = all sides equal AND all angles equal — not just one of the two"
  - "Interior angle total is (n−2)×180°; divide by n for each angle"
  - "Exterior angles sum to 360° — divide by n for each one; interior + exterior = 180° at each vertex"
  - "As n grows, a regular n-gon approaches a circle"
- **Register notes**: "equilateral" (all sides equal) and "equiangular" (all angles equal) are formal terms worth teaching so students understand that "regular" means both at once

## Assessment Signals
- **Correctly states the AND condition, applies both formulas correctly, connects interior and exterior via 180°** = AUTOMATIC
- **Classifies rhombus or rectangle as regular** = MC-1 active (AND-condition drill with the rhombus/rectangle counterexample pair)
- **Swaps interior and exterior angle formulas** = MC-2 active (rotation-walk origin story for exterior; polygon-sum origin story for interior; labeling habit)
- **Uses 180°/n for interior angle** = MC-3 active (step-by-step derivation — total first, then divide — with a Pentagon worked example)
- **Cannot check answer with interior+exterior=180°** = MC-4 active (supplementary relationship at each vertex; verify every answer by summing to 180°)

## Tutor Recovery Strategy
**Immediate tier (right-now, same turn)**:
1. If MC-1 (one condition sufficient): "Quick test: equal sides? Yes. Equal angles? [check]. If both — regular. If only one — not regular. A rhombus: equal sides? Yes. Equal angles? No (unless it's a square). NOT regular."
2. If MC-2 (formula swap): "Which has the 360°? 360°/n is for the EXTERIOR angle — the full rotation. (n−2)×180°/n is for the INTERIOR. Which type did the problem ask for?"
3. If MC-3 (180°/n error): "Write out the polygon angle SUM first: (n−2)×180°. Now divide by n. Two steps — sum, then divide. Don't skip the (n−2) factor."
4. If MC-4 (supplementary not seen): "Interior angle + exterior angle = 180° at every vertex — they share a straight line. If you know one, you always know the other by subtraction."

**Follow-up tier (consolidation)**:
- Build a complete table: for n = 3, 4, 5, 6, 8, 10, 12, compute interior angle, exterior angle, and verify they sum to 180°; this table-building exercise enforces all three formulas simultaneously
- For MC-3, give two problems where the interior angle formula is needed for n > 6 (where 180°/n gives an obviously wrong answer, like "the angle of a regular nonagon is 20°?") to build internal plausibility-checking

## Memory Hooks
- **"Both AND: sides equal AND angles equal"**: the single most critical rule for the definition
- **"Interior = (n−2)×180° ÷ n; Exterior = 360° ÷ n; Interior + Exterior = 180°"**: three formulas as one compact set
- **"More sides → larger interior angle → closer to 180° → closer to a circle"**: the limiting behavior in one sentence

## Transfer Connections
1. **Circle and circumscribed polygon**: the inscribed regular n-gon's perimeter approaches 2πr and its area approaches πr² as n→∞ — a preview of limits and the geometric origin of π, connecting to `math.geom.circle` and `math.geom.circle-circumference`
2. **Polygon angle sum**: the interior angle formula explicitly uses the polygon angle sum result from `math.geom.polygon-angle-sum` (or `math.geom.triangle-angle-sum` with extension) — these concepts are tightly chained
3. **Trigonometry and regular polygon area**: the area of a regular n-gon is ½ × n × s² × cot(π/n) (using the apothem and trigonometry) — a rich application of right-triangle trigonometry and the connection between polygons and circles

## Cross-Subject Connections
- **Architecture and design**: hexagonal tiling (honeycombs, floor tiles) exploits the fact that regular hexagons tile the plane; the 120° interior angles mean three hexagons meet at a point summing exactly to 360°
- **Chemistry (molecular geometry)**: benzene's ring structure is a regular hexagon of carbon atoms; the 120° bond angles correspond to the interior angle of a regular hexagon

## Blueprint References
- **No Blueprint exists for this concept** — no teachable-content database entry in the Curriculum Production Pipeline as of 2026-07-27
- Related content: NCERT Grade 8 Chapter 3 (Understanding Quadrilaterals); OpenStax Geometry (properties of regular polygons); AoPS Introduction to Geometry

## Runtime Asset References
- **Explanation Memory**: No ACTIVE explanation asset exists yet; live LLM generation is used (ADR 14 Phase 1)
- **Probe Assets**: No ACTIVE probe asset exists yet; assessments are live-generated, anchored to the Assessment Signals section above
- **Visualization Assets**: No ACTIVE visual asset exists yet; the polygon-to-circle limit demonstration (Demonstrations section) would benefit from an animated visual asset

## Curriculum Feedback
- **Prerequisite strength**: `math.geom.polygon` is the correct prerequisite; the polygon angle sum theorem (`math.geom.polygon-angle-sum`, if authored, or its content delivered here) is a near-prerequisite in practice — the interior angle formula cannot be derived without it
- **No `unlocks`**: this concept has no downstream `unlocks` in the current KG; natural extensions would include regular polygon area formulas (using apothem), regular polygon inscribed in circles, and the geometric basis of radians
- **Related: `math.geom.circle`**: the KG correctly flags this cross-link — the circumscribed circle and the approach-to-circle limit are conceptually central and should be cross-referenced whenever circles are taught
- **Grade band note**: NCERT places basic regular polygon properties in Grade 8; the interior/exterior angle formulas appear in Grade 9 (NCERT Chapter 10) — the entry's 3-hour estimate covers the Grade 8 recognition plus Grade 9 formula treatment as a unified block

## Version History
- **2026-07-27**: Initial authoring by autonomous curriculum completion program (Batch 54, Wave 10 part 1, eighth concept). No Blueprint exists; all misconceptions diagnosed via birth-taxonomy procedure. Checked against 21-section Educational Brain Standard (EDUCATIONAL_BRAIN_STANDARD.md); Quality Gate 3 verified.
