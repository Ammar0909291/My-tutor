# Geometric Constructions (math.geom.geometric-constructions)

## Identity
- **Concept ID**: math.geom.geometric-constructions
- **Subject**: mathematics
- **Domain**: geometry (math.geom)
- **Grade Band**: intermediate (6–8)
- **Bloom Level**: apply
- **Difficulty**: proficient
- **Mastery Threshold**: 0.75
- **Estimated Hours**: 10.0
- **KG Status**: active (NCERT Grade 9, IGCSE, AoPS Geometry; cross-link: math.abst.galois-theory)

## Learning Objective
Students will perform the six fundamental compass-and-straightedge constructions — (1) perpendicular bisector of a segment, (2) angle bisector, (3) perpendicular from a point to a line, (4) perpendicular at a point on a line, (5) a regular hexagon inscribed in a circle, (6) a regular triangle inscribed in a circle — justify each construction step using circle and congruence properties, and understand (without formal proof) the classical impossibility results: trisecting an arbitrary angle, squaring the circle, and doubling the cube cannot be achieved with compass and straightedge alone.

## Core Understanding
Compass-and-straightedge constructions are constrained to two operations: drawing a line through two given points (straightedge), and drawing a circle with a given centre and radius (compass). The power of these constructions lies in the intersection of circles and lines — each intersection point is a new "constructed point." The perpendicular bisector construction exploits the fact that all points equidistant from two fixed points (the two arcs) lie on the perpendicular bisector — the definition of the bisector. The angle bisector construction creates two congruent triangles (SSS), whose equal angles prove the bisector property. Every valid construction has a geometric proof; a construction without a proof is just a drawing. The impossibility results (Gauss-Wantzel theorem, Galois-theory level) establish that certain geometric operations — trisecting an angle, constructing √[3]{2}, constructing π — require cube roots or transcendental numbers, neither of which is constructible from compass-and-straightedge operations over ℚ.

## Mental Models
1. **The "new-point-from-intersection" model**: constructions are computed by finding intersection points of circles and lines; every construction step creates at most one new meaningful intersection; following which intersections are "new" versus "given" is the cognitive map of the construction
2. **The equidistance model for bisectors**: the perpendicular bisector is the locus of all points equidistant from two given points — the two arcs (radii equal from each endpoint) trace this locus; the intersection of the arcs IS the bisector, by definition of equidistance
3. **The SSS-congruence model for angle bisector**: the construction draws two congruent triangles sharing the bisector as a common side; the two equal arcs from the angle's vertex (equal radii) and the two equal arcs from the arc-intersection points (equal radii) create SSS-congruent triangles, proving the two halves of the angle are equal

## Why Students Fail
1. **Drawing instead of constructing**: students use the ruler to measure lengths or a protractor to measure angles, rather than relying only on the compass for equal lengths and the straightedge (unmarked) for lines — conflating measurement tools with construction tools
2. **Not leaving construction arcs visible**: erasing the arcs after completing the figure, destroying the evidence that proves the construction is valid — without the arcs, the construction cannot be verified or marked correct
3. **Compass-width drift**: not fixing the compass width carefully between arcs, so arcs intended to have equal radii end up with different radii — invalidating the construction's logic
4. **No justification**: executing the mechanical steps without understanding why they work — students cannot explain what property is guaranteed by each arc intersection, so they cannot reconstruct the method if they forget a step

## Misconceptions
**MC-1: MEASUREMENT-AS-CONSTRUCTION (Type 5, instruction-induced)**
- **Characteristic phrase**: "I used a ruler to measure 5 cm and mark the midpoint at 2.5 cm" — claiming this is a geometric construction
- **Mechanism**: in everyday geometry, rulers are used freely; the restriction to unmarked straightedge is a non-obvious additional constraint; students conflate "I can use these tools" with "I can use these tools in any way I choose"
- **Evidence signature**: student produces correct geometric figures but uses the ruler's scale or a protractor; construction arcs are absent from the diagram
- **Repair path**: "A construction uses the straightedge ONLY for drawing lines between known points — no measuring the scale. The COMPASS does all the equal-length work. If you measured with a ruler, you drew a figure, not a construction."

**MC-2: ARCS-ERASED (Type 5, instruction-induced)**
- **Characteristic phrase**: "I erased the arcs to make it look cleaner"
- **Mechanism**: students are accustomed to "clean" final diagrams in other subjects; the construction arcs look like "scratch work" and are deleted; they do not understand that the arcs ARE the proof
- **Evidence signature**: final diagram shows only the completed figure (bisector, perpendicular, etc.) with no arc traces; cannot reconstruct the method from the diagram
- **Repair path**: "The arcs are NOT scratch work — they are the PROOF. Without the arcs, there is no evidence that your bisector is truly equidistant from both endpoints. Always keep arcs in the final answer; in exams, missing arcs lose marks."

**MC-3: WRONG-JUSTIFICATION-FOR-BISECTOR (Type 1, overgeneralization)**
- **Characteristic phrase**: "The perpendicular bisector works because the arcs cross in the middle" — giving a spatial/visual justification without invoking equidistance or the property of equal radii
- **Mechanism**: students see the arcs crossing "in the middle" of the segment and read the result as "visually obvious" rather than tracing the logical chain: equal radii → equidistance → locus definition of perpendicular bisector
- **Evidence signature**: cannot explain why the arcs crossing anywhere guarantees the bisector property; cannot re-derive the construction if they forget which arcs to draw
- **Repair path**: "Every arc from centre A with radius r gives you a point exactly r from A. When both arcs (from A and from B) have the SAME radius, their intersection is equally far from A and from B — that IS the perpendicular bisector by definition."

**MC-4: IMPOSSIBILITY-RESULTS-DISBELIEVED (Type 6, analogy overextension)**
- **Characteristic phrase**: "If I'm careful enough with the compass, I can trisect any angle" — believing the impossibility is a practical limitation, not a proven mathematical fact
- **Mechanism**: trisecting looks geometrically similar to bisecting; since bisecting is constructible, students expect trisecting to be merely harder but not impossible; they confuse "difficult" with "impossible" and treat the impossibility as a claim about human precision rather than mathematical logic
- **Evidence signature**: student attempts to construct a trisection by bisecting repeatedly or by trial-and-error adjustment; cannot accept that no finite sequence of valid construction steps can produce an exact trisection for an arbitrary angle
- **Repair path**: "The impossibility is MATHEMATICAL, not practical. It has nothing to do with how steady your hand is. It means: no matter how many legal construction steps you take — any finite number — the exact trisection of an arbitrary angle is NOT among the reachable points. This was proved by Galois theory in the 1800s."

## Analogies
1. **The compass-as-equal-distance-machine**: the compass doesn't "draw circles" in the sense of showing roundness — it guarantees that every point on the arc is exactly the same distance from the centre; this is its only function, and every construction step exploits it for exactly one equidistance fact
2. **Construction as a proof in action**: a construction is a constructive existence proof — by building the object step by step using only the two allowed operations, you prove it exists; "drawing" proves nothing

## Demonstrations
1. **Live perpendicular bisector**: compass-and-straightedge construction on a whiteboard with each step narrated: "I open the compass to more than half the segment length — this ensures the arcs from both endpoints intersect. I draw an arc from A, same opening from B. The two intersections P and Q are each equidistant from A and B. The line PQ is the perpendicular bisector."
2. **Compass-width test**: after each major arc, set the compass to the "same" width and deliberately vary it slightly — show how the intersection point shifts; then reset precisely and show the construction works; this makes compass-width discipline tangible

## Discovery Questions
1. Construct the perpendicular bisector of segment AB where A = (0,0) and B = (6,0). What is the midpoint, and where does the bisector cross the segment?
2. You need to find the circumcenter of a triangle using only compass and straightedge. Which constructions do you need, and why?
3. Explain why the angle bisector construction works. Which property of circles guarantees that the intersection point is equidistant from both sides of the angle?
4. A regular hexagon is inscribed in a circle of radius r. What is the side length of the hexagon? Why can it be constructed using only compass and straightedge?
5. Research (or prove informally): why can a regular pentagon be constructed but a regular heptagon (7 sides) cannot?

## Teaching Sequence
1. **Activation (4 min)**: Ask students to find the midpoint of a segment using only a compass and straightedge (no ruler measurements) — surface the conceptual challenge; establish what "construction" means vs. "drawing"
2. **Perpendicular bisector (8 min)**: Demonstrate step-by-step; narrate each step as an equidistance fact; prove the result (equal-radii → equidistance → bisector property); address MC-2 (show that erasing arcs loses the proof); address MC-3 (trace the logic chain explicitly)
3. **Angle bisector (6 min)**: Draw an angle; construct the bisector; prove via SSS congruence; connect to the perpendicular bisector logic (both exploit equal radii to establish equidistance)
4. **Perpendiculars (4 min)**: Briefly cover perpendicular from a point and perpendicular at a point as applications of the bisector idea; note these are variations, not new principles
5. **Regular hexagon and triangle inscribed in a circle (5 min)**: Regular hexagon side = radius (key fact); construct using only the compass set to the radius; confirm 6 equal arcs; derive equilateral triangle from alternating vertices
6. **Impossibility results (3 min)**: State (without proof) the three impossibility theorems; connect to Galois theory (cross-link `math.abst.galois-theory`); address MC-4

## Tutor Actions
- **Narrate every step as an equidistance claim**: "I draw an arc from A with radius r — every point on this arc is exactly r from A. I draw an arc from B with the same radius r — every point is exactly r from B. Their intersection is r from BOTH."
- **Never erase arcs in demonstrations**: model the arc-preservation habit explicitly; say "I am keeping these arcs because they are the proof, not the scratch work"
- **Require written justification for each construction**: after each construction, ask "why does this work?" and accept only answers that invoke the specific geometric property (equidistance, congruent triangles, etc.)
- **Distinguish construction from measurement explicitly**: at the start of every construction session, confirm "straightedge has no scale marks; compass only sets equal lengths"

## Voice Teaching Notes
- **Emphasis markers**: stress "arcs are the PROOF — never erase them"; stress "equal radius → equidistant → bisector, every time"
- **Hesitation-recovery moves**: if a student is unsure of the next step, ask "what property do you need to establish? Which tool creates equal lengths (compass) or passes through two points (straightedge)?"
- **Load-bearing sentences**:
  - "Equal radius arcs from two centres → the intersection is equidistant from both centres"
  - "Arcs are the proof; straightedge is for the line through known points"
  - "Impossible means mathematically impossible — not 'hard to do by hand'"
- **Register notes**: "compass and straightedge" is the standard formal terminology; "ruler and compass" is acceptable in informal contexts but "ruler" should be immediately clarified as "an unmarked straightedge"

## Assessment Signals
- **Produces each of the six constructions with visible arcs and a correct verbal justification** = AUTOMATIC
- **Uses ruler measurements or protractor** = MC-1 active (constraint restatement: compass for equal length, unmarked straightedge for lines only)
- **Erases arcs in final answer** = MC-2 active (arcs-are-the-proof explanation; exam-marks reminder)
- **Cannot explain why the perpendicular bisector works** = MC-3 active (equidistance chain: equal radii → intersection equidistant from both → definition of bisector)
- **Claims careful enough trisection is achievable** = MC-4 active (impossibility-is-mathematical-not-practical statement; Galois theory cross-reference)

## Tutor Recovery Strategy
**Immediate tier (right-now, same turn)**:
1. If MC-1 (measurement used): "Erase the measurement marks. You have two tools: compass (equal lengths) and a straightedge with NO scale. Redo using only arc intersections to find points."
2. If MC-2 (arcs erased): "In exams, arcs must be visible — they prove the construction. Draw the construction again, keeping every arc. Arcs are not scratch work."
3. If MC-3 (visual/spatial justification only): "You said the arcs 'cross in the middle' — but why does 'in the middle' follow from the arcs? The reason: both arcs have the SAME radius from their respective centres, so their intersection is EQUALLY FAR from both centres. That equal distance is the definition of a point on the perpendicular bisector."
4. If MC-4 (impossibility disbelieved): "This is not about hand steadiness. No matter how many steps you take, angle trisection for an arbitrary angle is not reachable by legal construction steps. The proof uses field theory — cube roots are not expressible by square roots, which is all constructions can do. It's settled mathematics."

**Follow-up tier (consolidation)**:
- Construction portfolio: student performs all six constructions in one session on fresh paper, with each construction annotated with its justification; marks given only for arcs present AND justification correct
- For MC-4: brief history discussion of Wantzel (1837) proving trisection impossible — making the impossibility feel like a real mathematical event, not a teacher claim

## Memory Hooks
- **"Equal radii → equidistant → bisector"**: the logic chain for both major bisector constructions
- **"Arcs stay — they're the proof"**: the single most important diagram habit
- **"Trisection is impossible: it's math, not skill"**: the impossibility reminder

## Transfer Connections
1. **Circle** (`math.geom.circle`): every construction arc is a portion of a circle; the intersection logic exploits the circle's definition (all points at a fixed distance from the centre) — the circle is the foundational object of every construction
2. **Triangle** (`math.geom.triangle`): the perpendicular bisector construction is how to locate a triangle's circumcenter (intersection of all three perpendicular bisectors); the angle bisector construction locates the incenter — every classical triangle centre is reachable by construction
3. **Galois theory** (`math.abst.galois-theory`): the impossibility results for trisection, cube-doubling, and circle-squaring are theorems in abstract algebra — specifically, they require that the relevant lengths are not in the constructible field (the closure of ℚ under square roots); this is the KG's cross_link and the deepest mathematical consequence of this concept

## Cross-Subject Connections
- **Computer graphics (computational geometry)**: the perpendicular bisector and angle bisector constructions appear in Voronoi diagram computation; Delaunay triangulation algorithms are the modern descendants of classical geometric construction theory
- **Architecture and design**: classical architectural proportions (golden ratio constructions, square inscriptions, circle-inscribed-polygon tiling) all trace back to compass-and-straightedge construction traditions

## Blueprint References
- **No Blueprint exists for this concept** — no `docs/curriculum/blueprints/math.geom.geometric-constructions.md` file exists in this repository. References: NCERT Grade 9 Chapter 11 (Constructions), IGCSE Mathematics (geometric constructions), AoPS Introduction to Geometry (chapter on constructions and impossibility).

## Runtime Asset References
- **Explanation Memory**: No ACTIVE explanation asset exists yet; live LLM generation is used (ADR 14 Phase 1)
- **Probe Assets**: No ACTIVE probe asset exists yet; assessments are live-generated, anchored to the Assessment Signals section above
- **Visualization Assets**: No ACTIVE visual asset exists yet; step-by-step animated compass-and-straightedge demonstrations for each of the six constructions would be the highest-value visual assets for this concept

## Curriculum Feedback
- **Prerequisite fit**: `math.geom.triangle` and `math.geom.circle` are both correct prerequisites — the construction proofs invoke triangle congruence (SSS) and circle properties (equal radii) directly
- **Cross-link noted**: `math.abst.galois-theory` is the correct cross-link for the impossibility results; this is an advanced connection that should be mentioned at the close of instruction (as a "why it's impossible" pointer) and expanded only for students pursuing the proof
- **No `unlocks`**: this concept has no downstream `unlocks` in the current KG; natural extensions include classical construction problems (constructing a regular pentagon, trisecting specific angles), locus problems, and the algebraic theory of constructible numbers
- **Grade band note**: NCERT places basic constructions (perpendicular bisector, angle bisector) at Grade 9; the impossibility results are not formally in the NCERT syllabus but are worth flagging as intellectual context; the 10-hour estimate reflects the combined procedural skill (6 constructions × ~1 hour practice each) plus justification and impossibility discussion

## Version History
- **2026-07-28**: Initial authoring by autonomous curriculum completion program (Batch 55, Wave 10 part 1, seventh and final concept). No Blueprint exists; all misconceptions diagnosed via birth-taxonomy procedure. Checked against 21-section Educational Brain Standard (EDUCATIONAL_BRAIN_STANDARD.md); Quality Gate 3 verified.
