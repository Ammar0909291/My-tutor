# Circle Theorems (math.geom.circle-theorems)

## Identity
- **Concept ID**: math.geom.circle-theorems
- **Subject**: mathematics
- **Domain**: geometry (math.geom)
- **Grade Band**: intermediate (6–8)
- **Bloom Level**: apply
- **Difficulty**: proficient
- **Mastery Threshold**: 0.80
- **Estimated Hours**: 10.0
- **KG Status**: active (NCERT Grade 10, IGCSE Extended, AoPS Geometry)

## Learning Objective
Students will state, prove (at least informally), and apply the five core circle theorems — (1) inscribed angle = half the central angle on the same arc; (2) inscribed angles on the same arc are equal; (3) angle in a semicircle is 90°; (4) tangent is perpendicular to the radius at the point of tangency; (5) equal chords are equidistant from the centre — set up and solve angle-chase problems using these theorems in combination, distinguish the conditions under which each theorem applies, and communicate reasoning in the form of a multi-step proof argument.

## Core Understanding
All circle theorems ultimately derive from one foundational fact: the radius to a boundary point and the angle relationships that follow from a circle's definition (all radii equal). The **inscribed angle theorem** (inscribed angle = ½ central angle) is the master theorem from which most others follow: (i) inscribed angles on the same arc are equal (both = ½ same central angle); (ii) the angle in a semicircle is 90° (the central angle on a diameter = 180°, so the inscribed angle = 90°). The **tangent-radius theorem** (tangent ⊥ radius at tangency point) follows from the minimum-distance property: the radius is the shortest distance from the centre to the line, so the line must be perpendicular at the closest point. The **equal-chords theorem** (equal chords equidistant from centre) follows from congruent-triangle arguments on the right triangles formed by the perpendicular from the centre to each chord. Students must track which theorem applies: what arc does the angle subtend? Is the vertex on the circle (inscribed) or at the centre (central)? Is the line a tangent or a secant?

## Mental Models
1. **The arc-as-remote-control model**: the central angle and all inscribed angles over the same arc are "controlled by" the arc — the arc fixes the central angle, and every inscribed angle on that arc is exactly half of it; the arc is the shared object, the angles are derived from it
2. **The isosceles-triangle factory**: every time two radii appear, an isosceles triangle is created (equal sides = radii); these triangles are the raw material for proving inscribed-angle and chord theorems — identifying the hidden isosceles triangle in any circle diagram is the core problem-solving move
3. **The tangent-as-limit model**: a tangent is the limit of a secant whose two intersection points converge to one; the perpendicularity then follows from the symmetry argument (at the tangency point the line is equally far from the centre in both directions, so the only possible angle is 90°)

## Why Students Fail
1. **Confusing central angle and inscribed angle conditions**: applying the "angle = ½ arc" rule without checking whether the vertex is on the circle (inscribed) or at the centre (central) — the central angle equals the arc, not half of it
2. **Failing to spot the isosceles triangle**: the key intermediate step in most proofs is finding two equal radii that form an isosceles triangle; students who do not draw in the radii miss this and cannot construct the proof
3. **Applying the semicircle-angle rule to non-diameters**: believing that any chord, not just the diameter, produces a 90° inscribed angle — the rule only holds when the chord is a diameter
4. **Confusing tangent and secant in problem setups**: misidentifying whether a given line just touches the circle (tangent, one point) or crosses it (secant, two points), and applying the wrong theorem

## Misconceptions
**MC-1: CENTRAL-ANGLE-HALVED-WHEN-NOT-INSCRIBED (Type 5, instruction-induced)**
- **Characteristic phrase**: "The central angle is 60°, so the arc is 30°" (incorrectly halving the central angle to get the arc, instead of recognising central angle = arc directly)
- **Mechanism**: students over-apply the inscribed-angle halving rule to the central angle; the halving only applies when the vertex is ON the circle (inscribed), not when the vertex is at the centre
- **Evidence signature**: arc measures are consistently half of central angle measures; student cannot state the condition under which the ½ factor appears
- **Repair path**: "The ½ factor belongs to the INSCRIBED angle — vertex ON the circle. The CENTRAL angle — vertex AT THE CENTRE — equals the arc directly: central angle = arc. No halving for central angles."

**MC-2: SEMICIRCLE-RULE-OVERGENERALISED (Type 1, overgeneralization)**
- **Characteristic phrase**: "The angle in a triangle inscribed in a circle is always 90°" — believing the rule applies to any chord, not just the diameter
- **Mechanism**: the 90° result is so striking that students remember it without the specific condition (the chord must be the diameter); they apply it to any inscribed triangle
- **Evidence signature**: labels inscribed angles as 90° when the opposite chord is not the diameter; cannot explain why the semicircle specifically produces 90°
- **Repair path**: "The 90° rule only works when the chord is the DIAMETER (a semicircle = half the full circle). The central angle on the diameter = 180°, so the inscribed angle = 90°. For any other chord, the inscribed angle is not 90°."

**MC-3: MISSING-THE-ISOSCELES-TRIANGLE (Type 2, perceptual intuition)**
- **Characteristic phrase**: "I don't know where to start with this proof" — diagram shows a circle with two radii and an inscribed angle, but the student does not see the isosceles triangles
- **Mechanism**: students visually read the circle diagram as a whole rather than decomposing it; the radii are drawn but not perceived as sides of triangles; the key move of "draw in the radii to create isosceles triangles" does not spontaneously occur
- **Evidence signature**: cannot begin proofs that require the isosceles argument; leaves the diagram blank without adding auxiliary lines
- **Repair path**: "In any circle proof, the first move is always to draw in ALL the radii you can. Every pair of radii creates an isosceles triangle (equal sides). Once you see the isosceles triangles, the equal base angles give you your equations."

**MC-4: TANGENT-SECANT-CONFUSION (Type 4, notation-induced)**
- **Characteristic phrase**: calls a line that crosses the circle at two points a "tangent" because it "touches" it (it touches at two points, not one)
- **Mechanism**: the word "tangent" in informal English means "touching lightly"; students apply this colloquially to any line that intersects the circle, not just the single-point case; the formal definition (exactly one common point) is not retained under retrieval pressure
- **Evidence signature**: applies tangent-radius perpendicularity to a secant (which is wrong); cannot distinguish the diagrams without labels
- **Repair path**: "A tangent touches the circle at EXACTLY ONE point — then leaves, never crossing inside. A secant crosses the circle at TWO points. If a line enters the interior, it is a secant, not a tangent. Count the intersection points."

## Analogies
1. **The "shadow puppet" analogy for inscribed angles**: hold a flashlight (the arc) and see how the shadow (angle) changes — moving the flashlight to a different inscribed angle position keeps the shadow the same because the arc (light source) didn't change; the arc is the "source" that controls all inscribed angles on it
2. **The tangent as a "just-grazing" line**: picture a ball rolling along the ground and touching a circular post at exactly one point — the post's radius points directly at that contact point, perpendicular to the ball's path; the tangent is the line of the ball's direction, always at 90° to the radius

## Demonstrations
1. **Dynamic inscribed angle demo**: draw a circle with a fixed arc AB; mark several different points C, D, E on the major arc; measure angle ACB, ADB, AEB — confirm they are all equal; then mark a point F on the minor arc (supplementary position) — the angle there is 180° − the others; visualising the constancy makes the theorem memorable
2. **Tangent-perpendicularity proof by construction**: draw a circle, mark a tangency point T, draw the radius OT; ask students to measure the angle between OT and the tangent line — it should be 90° for any circle they draw, establishing the theorem empirically before it is proved

## Discovery Questions
1. A central angle AOB measures 110°. What is the inscribed angle ACB where C is on the major arc? What if C were on the minor arc?
2. Triangle PQR is inscribed in a circle with PR as a diameter. What is angle PQR? Why?
3. A tangent from external point T touches the circle at A. The radius OA is 5 cm and OT is 13 cm. What is the length of TA?
4. Two chords of equal length are drawn in a circle. What can you conclude about their distances from the centre?
5. Angle ACB = 35°, where C is on the circle and AB is a chord. What is the central angle AOB? What is arc AB in degrees?

## Teaching Sequence
1. **Activation (5 min)**: Review central angle = arc (from angle-pairs concept); draw a circle, mark a central angle and the arc it subtends; confirm the equality with the protractor
2. **Inscribed angle theorem (10 min)**: Mark an inscribed angle subtending the same arc; measure both; establish the 2:1 ratio; draw in the radii to the arc's endpoints and prove the theorem using isosceles triangles — making MC-3's "draw the radii" move the first explicit step
3. **Corollaries (8 min)**: Derive (i) inscribed angles on same arc are equal and (ii) angle in semicircle = 90° directly from the inscribed-angle theorem — not as separate memorised facts, but as consequences. Address MC-2 (semicircle condition)
4. **Tangent-radius theorem (5 min)**: State and prove; the Pythagorean-theorem follow-up (tangent length from external point) is a standard application
5. **Equal-chords theorem (4 min)**: Draw two equal chords; drop perpendiculars from centre; prove the right triangles congruent (hypotenuse = radius, one side = half-chord) via SSS; confirm equal perpendicular distances
6. **Angle-chase problems (8 min)**: Multi-step problems requiring 2–3 theorem applications in sequence; teach students to annotate diagrams with theorem names as they use them

## Tutor Actions
- **Always ask "vertex on circle or at centre?"** before any angle theorem is applied — this is the gate that separates the inscribed-angle case from the central-angle case
- **Draw in the radii as the first step** of every circle proof — teach this as a reflex, not a creative step; it produces the isosceles triangles that do the work
- **Demand theorem citations**: when students write an angle value, ask "which theorem gives you that?" — prevents guessing and builds proof communication
- **Name the arc, not just the angle**: reinforce "the inscribed angle subtending arc AB" rather than just "angle ACB" — the arc is the controlling object

## Voice Teaching Notes
- **Emphasis markers**: stress "vertex ON the circle → inscribed → half the arc; vertex AT THE CENTRE → central → equals the arc"; stress "DRAW THE RADII FIRST, always"
- **Hesitation-recovery moves**: if the student is stuck on any circle theorem problem, ask "have you drawn all the radii? Are there any isosceles triangles hiding?" — this unsticks 80% of cases
- **Load-bearing sentences**:
  - "Inscribed angle = ½ central angle on the same arc — the arc controls both"
  - "Draw the radii first — every two radii make an isosceles triangle"
  - "Tangent ⊥ radius at the point of contact — 90°, always"
- **Register notes**: "inscribed angle," "central angle," "arc," "tangent," "secant" are all precise technical terms — avoid informal substitutes

## Assessment Signals
- **States each theorem correctly, applies them in multi-step angle-chases, cites the theorem by name** = AUTOMATIC
- **Halves the central angle to get the arc** = MC-1 active (central-angle-equals-arc restatement; vertex-position check)
- **Labels non-diameter inscribed angle as 90°** = MC-2 active (semicircle condition check: is it a diameter?)
- **Cannot begin proofs, leaves diagram unaugmented** = MC-3 active (draw-the-radii-first reflex installation)
- **Calls a secant a tangent** = MC-4 active (count-the-intersection-points check)

## Tutor Recovery Strategy
**Immediate tier (right-now, same turn)**:
1. If MC-1 (halved central angle): "Stop. The vertex is at the CENTRE — that is a central angle. Central angle = the arc directly. No halving. Only inscribed angles (vertex on the circle) get halved."
2. If MC-2 (90° overgeneralised): "Is the opposite chord the diameter? If not, the angle is NOT 90°. The 90° rule only fires when the chord passes through the centre — a diameter, giving a semicircle."
3. If MC-3 (can't start a proof): "First move in every circle proof: draw a line from the centre to each named point on the circle. Now what triangles do you see? Isosceles triangles — two equal radii as sides. Start from those."
4. If MC-4 (tangent/secant confusion): "Count how many points this line shares with the circle. One point → tangent. Two points → secant. If it enters the interior at all, it is a secant."

**Follow-up tier (consolidation)**:
- Five-theorem identification drill: 10 diagrams, each clearly showing exactly one theorem's conditions — student identifies the theorem, states the conclusion, and cites the condition that made it apply
- For MC-3: structured proof-starter exercise where the first line is always provided as "Draw radii OA and OB" — students must complete the argument from there; the faded scaffold is removed after 3 successful proofs

## Memory Hooks
- **"Inscribed = half; Central = whole"**: the core ratio distinction in four words
- **"Same arc → same inscribed angle"**: the equal-inscribed-angles corollary
- **"Diameter chord → 90° angle"**: the semicircle angle theorem
- **"Tangent ⊥ radius at touch point"**: the tangent-radius theorem in six words

## Transfer Connections
1. **Angle pairs** (`math.geom.angle-pairs`): supplementary inscribed angles (on major vs. minor arc) and vertically opposite angles inside circles all depend on the angle-pair relationships already established in the prerequisite concept
2. **Geometric proof** (`math.geom.geometric-proof`): circle theorem problems are a primary arena for multi-step geometric proof; the proof structure (given → theorem citations → conclusion) established there is applied here
3. **Trigonometry** (advanced): the inscribed angle theorem underlies the unit circle's angle representations; the tangent-radius perpendicularity is central to trigonometric proofs about the sine/cosine functions

## Cross-Subject Connections
- **Physics (optics)**: the tangent-and-radius relationship appears in Snell's Law derivations and in the geometry of reflection off curved mirrors — the angle of incidence is measured from the normal (perpendicular), which is the radius at the tangency point
- **Engineering (gear design)**: involute gears use tangent-to-circle constructions; the tangent line's perpendicularity to the radius is the geometric foundation for gear tooth profiles

## Blueprint References
- **No Blueprint exists for this concept** — no `docs/curriculum/blueprints/math.geom.circle-theorems.md` file exists in this repository. References: NCERT Grade 10 Chapter 10 (Circles), IGCSE Mathematics Extended (circle theorems), AoPS Introduction to Geometry (circle theorem chapter).

## Runtime Asset References
- **Explanation Memory**: No ACTIVE explanation asset exists yet; live LLM generation is used (ADR 14 Phase 1)
- **Probe Assets**: No ACTIVE probe asset exists yet; assessments are live-generated, anchored to the Assessment Signals section above
- **Visualization Assets**: No ACTIVE visual asset exists yet; dynamic GeoGebra-style visualisations of the inscribed-angle theorem (moving the vertex along the arc) and the tangent-perpendicularity would be the highest-value assets for this concept

## Curriculum Feedback
- **Prerequisite fit**: `math.geom.circle` and `math.geom.angle-pairs` are both correct prerequisites; `math.geom.geometric-proof` would be a natural co-prerequisite for the proof-communication goal but is not listed — this creates a minor gap for the proof-writing dimension of the learning objective
- **No `unlocks`**: this concept has no downstream `unlocks` in the current KG; natural extensions include the power of a point (secant-secant, tangent-secant, tangent-tangent lengths), cyclic quadrilateral theorems, and trigonometric applications
- **Grade band note**: NCERT places circle theorems at Grade 10 (Chapter 10); IGCSE covers them in Extended Mathematics; the 10-hour estimate reflects the significant proof-communication demand alongside the five-theorem content load

## Version History
- **2026-07-28**: Initial authoring by autonomous curriculum completion program (Batch 55, Wave 10 part 1, fourth concept). No Blueprint exists; all misconceptions diagnosed via birth-taxonomy procedure. Checked against 21-section Educational Brain Standard (EDUCATIONAL_BRAIN_STANDARD.md); Quality Gate 3 verified.
