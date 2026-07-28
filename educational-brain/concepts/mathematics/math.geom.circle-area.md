# Circle Area (math.geom.circle-area)

## Identity
- **Concept ID**: math.geom.circle-area
- **Subject**: mathematics
- **Domain**: geometry (math.geom)
- **Grade Band**: intermediate (6–8)
- **Bloom Level**: apply
- **Difficulty**: developing
- **Mastery Threshold**: 0.90
- **Estimated Hours**: 3.0
- **KG Status**: active (NCERT Grade 7, Common Core Grade 7, Cambridge IGCSE)

## Learning Objective
Students will compute the area of a circle using A = πr², apply the formula in both forward (given r, find A) and inverse (given A, find r) directions, explain why the formula involves r² rather than r (area is a two-dimensional measurement), use exact symbolic answers and decimal approximations appropriately, and verify answers using the plausibility check that area grows as the square of the radius.

## Core Understanding
The area of a circle is A = πr². The formula can be derived by imagining the circle cut into infinitely thin concentric rings and "unrolling" them into a triangle (base = 2πr = circumference, height = r, area = ½ × 2πr × r = πr²), or by seeing it as the limit of areas of inscribed regular n-gons as n→∞. The key distinction from circumference is the squaring: area scales as r² (doubling the radius quadruples the area), while circumference scales as r (doubling the radius doubles the circumference). The formula uses radius, not diameter — this is the most common source of errors (using d gives an answer 4× too large). An estimation anchor: for a circle of radius r, the area is π times a square of side r, so A ≈ 3r² is the plausibility check.

## Mental Models
1. **The ring-unrolling derivation**: imagine slicing the circle into thin concentric rings and straightening them out — the outer ring unrolls to a rectangle of width dr and length 2πr; summing from r=0 to r=R gives total area πR² — this turns the formula into something derived rather than memorized
2. **The r² square**: picture a square with side r drawn next to the circle; the circle's area is exactly π of those squares — since π ≈ 3.14, the circle's area is just over 3 times the area of the r-square; this makes "3r²" a fast mental plausibility estimate
3. **The scaling intuition**: if you double the radius, the new circle can hold 4 copies of the old one (area quadruples); this makes the r² visible as a scaling property, not just a symbol in a formula

## Why Students Fail
1. **Using diameter instead of radius**: A = πr² requires the radius; students given diameter plug it in directly, computing π(2r)² = 4πr², giving an answer 4 times too large
2. **Confusing circumference and area formulas under pressure**: C = 2πr and A = πr² are both "π times something with r"; students forget which has the exponent, especially when both formulas appear in the same problem set
3. **Forgetting to square the radius**: writing A = π × r (no exponent) for the first computation step, then adding the square only after seeing it "doesn't look right" — the squaring is dropped in mental shortcuts
4. **Not recognising the quadratic scaling**: students believe that if the radius doubles, the area doubles — the linear-thinking bias from working with perimeters transfers to a 2D formula where it is wrong

## Misconceptions
**MC-1: DIAMETER-IN-AREA-FORMULA (Type 5, instruction-induced)**
- **Characteristic phrase**: "A = π × 14² = 615.8 cm²" when the given value is diameter = 14 (should give A = π × 7² = 153.9 cm²)
- **Mechanism**: A = πr² is learned as "pi times the number squared," and the diameter is the most prominent measurement; students insert it without halving, producing an answer 4× too large
- **Evidence signature**: area answers exactly 4 times the correct value; student does not recognise the discrepancy because no plausibility check is applied
- **Repair path**: "A = πr² — r means RADIUS, not diameter. If you're given the diameter, halve it first: r = d/2. Then square the radius. Never square the diameter and call it A = πd²."

**MC-2: AREA-CIRCUMFERENCE-FORMULA-SWAP (Type 1, overgeneralization)**
- **Characteristic phrase**: "The area of a circle with radius 5 is 2π × 5 = 31.4 cm²" (using circumference formula for an area question, or computing πr² for a circumference question)
- **Mechanism**: both formulas involve π and r; students who are still building fluency retrieve the wrong one depending on which was seen more recently
- **Evidence signature**: area answer equals circumference (or vice versa) in magnitude and unit; often a unit mismatch (cm vs. cm²) is the first clue
- **Repair path**: "C = 2πr has one r — it measures length (cm). A = πr² has r² — it measures area (cm²). Units catch the swap: if your answer is in cm, you computed the circumference, not the area."

**MC-3: RADIUS-NOT-SQUARED (Type 5, instruction-induced)**
- **Characteristic phrase**: "A = π × 6 = 18.85 cm²" (writing π × r with no squaring)
- **Mechanism**: students know "A = πr²" but execute it as "multiply π by r" in the mental computation step, forgetting the exponent — the squaring appears in the formula but disappears in the arithmetic
- **Evidence signature**: area answer exactly equals the circumference divided by 2 (i.e., πr); can be caught with the plausibility check A ≈ 3r²
- **Repair path**: "The formula is A = π × r × r — write the r TWICE on your working line so you can't forget to square it. Don't jump to π × r in one step."

**MC-4: AREA-SCALES-LINEARLY-WITH-RADIUS (Type 1, overgeneralization)**
- **Characteristic phrase**: "If the radius doubles, the area doubles"
- **Mechanism**: students transfer the linear scaling of circumference (double r → double C) to area, without recognising the r² makes scaling quadratic
- **Evidence signature**: consistently off by a factor in comparative-area problems ("the larger circle has twice the area of the smaller one" when it should be four times)
- **Repair path**: "Area uses r². When r is multiplied by 2, the formula gives π(2r)² = π × 4r² = 4 × πr² — the area multiplies by 4, not 2. Square the scale factor to get the area scale factor."

## Analogies
1. **The grid-squares model**: overlay a circle on square grid paper and count the roughly π×r² squares inside — each square has area 1 unit², and the filled squares approximate πr²; this makes "area = number of unit squares" concrete before the formula
2. **The r-square tile**: a square tile with side r has area r²; the circle's area is π ≈ 3.14 of those tiles — so "the circle fits about 3 r-squares and a bit more" as a physical reality, not just a formula

## Demonstrations
1. **Grid-paper estimation**: draw circles of radius 3, 5, and 8 on square grid paper; count the squares; compare to πr² for each — bridging the count-based intuition to the formula, and showing that the formula scales as r²
2. **Doubling the radius**: draw a circle of radius 3 cm and a circle of radius 6 cm; estimate visually how many small circles fit inside the large one (approximately 4); compute both areas to confirm A_large = 4 × A_small — killing MC-4 with direct visual evidence

## Discovery Questions
1. A circle has radius 5 cm. What is its area? What is its circumference? Are the numbers the same? Why or why not?
2. A circular rug has an area of 28.27 m². What is its radius? What is its diameter?
3. If the radius of a pizza is tripled, by what factor does its area increase? By what factor does its circumference increase?
4. A circle has the same numerical area as circumference (both equal the same number). What is its radius?
5. A square has side 6 cm and a circle has radius 3 cm. Which has the larger area? Estimate, then compute.

## Teaching Sequence
1. **Activation (3 min)**: Ask "how would you measure the amount of carpet needed for a circular room?" — surface the idea that area is the relevant quantity, distinct from the border/circumference
2. **Derivation sketch (5 min)**: Show the "unrolling rings" argument (or the inscribed polygon limit) — establishing that A = πr² is derived, not arbitrary; the derivation anchors why r² appears
3. **Formula work — forward direction (6 min)**: Practice A = πr² with 3 problems (r given). Address MC-3 by writing "π × r × r" in full on the first problem; address MC-1 by including one problem where diameter is given (establish the halving step)
4. **Contrast with circumference (4 min)**: Write both formulas side by side; establish the exponent distinction; unit check (cm vs. cm²); address MC-2
5. **Inverse problems (4 min)**: Given A, solve for r (take square root of A/π); include one problem where the answer should be checked by forward-substitution
6. **Quadratic scaling (3 min)**: "What happens when we double the radius?" — work through π(2r)² = 4πr² explicitly; address MC-4

## Tutor Actions
- **Always write "r × r" explicitly** in the first computation for any new student — prevents MC-3 from ever forming
- **State "radius, not diameter" before every computation** — even if r is given, the habit prevents errors when d is given
- **Run the A ≈ 3r² plausibility check**: compute 3r² mentally and confirm the computed answer is close — catches MC-1 (which gives 12r²) and MC-3 (which gives πr ≈ 3.14r)
- **Distinguish units in every answer**: "cm² — that's the area unit; if you wrote cm, you computed a length, not an area"

## Voice Teaching Notes
- **Emphasis markers**: stress "radius SQUARED — the exponent is essential"; stress "area grows four times as fast as the radius doubles — it's quadratic"
- **Hesitation-recovery moves**: if a student hesitates, ask "does the problem ask for the border of the circle or the space inside?" — border → circumference; space inside → area
- **Load-bearing sentences**:
  - "A = πr² — radius, squared, times pi"
  - "Double the radius → quadruple the area: (2r)² = 4r²"
  - "Area is in square units (cm²); circumference is in linear units (cm) — the units tell you which formula you need"
- **Register notes**: "area" and "circumference" should be sharply distinguished in every sentence — never say "the size of the circle" when you mean either one specifically

## Assessment Signals
- **Correctly computes A from r and d, solves inverse for r, applies quadratic scaling** = AUTOMATIC
- **Answer is 4× too large (diameter inserted directly)** = MC-1 active (halving drill + plausibility check)
- **Answer matches circumference value** = MC-2 active (formula-pair side-by-side + unit check)
- **Answer equals πr (no squaring)** = MC-3 active (write r × r explicitly in working)
- **Believes area doubles when radius doubles** = MC-4 active (scale-factor squaring demonstration)

## Tutor Recovery Strategy
**Immediate tier (right-now, same turn)**:
1. If MC-1 (diameter plugged in): "You used r = 14, but 14 is the diameter. The radius is 14/2 = 7. A = π × 7² = 49π ≈ 153.9 cm². Your answer of ~616 cm² is exactly 4 times too large — the tell-sign of this error."
2. If MC-2 (circumference formula used): "You computed 2πr — that is the circumference (the border). For area you need πr². Units: your answer should be in cm², not cm."
3. If MC-3 (forgot to square): "Write your working line as A = π × r × r, not A = π × r. Two r's. Now substitute: A = π × 5 × 5 = 25π."
4. If MC-4 (linear scaling): "Area has r². Scale r by 2: A = π(2r)² = 4πr². The area multiplied by 4, not 2. Squaring the scale factor is the rule: if r multiplies by k, area multiplies by k²."

**Follow-up tier (consolidation)**:
- Dual-question drill: for each of 4 circles (different radii), compute BOTH the area AND the circumference in one session — forces formula selection on each problem and prevents context-driven guessing
- For MC-4: give a set of comparative-area problems (radius doubled, tripled, halved) with the student computing both areas to confirm the k² scaling rule

## Memory Hooks
- **"A = πr² — area has an r-squared"**: the single distinguishing feature from the circumference formula
- **"Double the radius, quadruple the area"**: the scaling rule as a memorable phrase
- **"Area ≈ 3r² — a quick sanity check"**: the estimation anchor for plausibility

## Transfer Connections
1. **Circle circumference** (`math.geom.circle-circumference`): C = 2πr and A = πr² are a pair — each feeds into the other's plausibility check; the radius/diameter confusion (MC-1 here) is exactly parallel to the same error in circumference problems
2. **Circle parts** (`math.geom.circle-parts`): the sector area A_sector = (θ/360°) × πr² is a direct application of the full-circle area formula scaled by the sector's fraction of the circle
3. **Regular polygon to circle limit** (`math.geom.regular-polygon`): the area of an inscribed regular n-gon approaches πr² as n→∞ — this is the geometric basis for the area formula itself

## Cross-Subject Connections
- **Physics (pressure)**: pressure = force/area; for a circular piston of radius r, the area is πr² — the area formula appears directly in hydraulic and pneumatic calculations
- **Architecture and design**: calculating the floor area of a circular room, the area of a circular window, or the amount of material for a circular dome all use A = πr² directly

## Blueprint References
- **No Blueprint exists for this concept** — no `docs/curriculum/blueprints/math.geom.circle-area.md` file exists in this repository. References: NCERT Grade 7 Chapter 11 (Perimeter and Area), Common Core Grade 7 (Geometry: area of a circle), Cambridge IGCSE Mathematics (area of a circle).

## Runtime Asset References
- **Explanation Memory**: No ACTIVE explanation asset exists yet; live LLM generation is used (ADR 14 Phase 1)
- **Probe Assets**: No ACTIVE probe asset exists yet; assessments are live-generated, anchored to the Assessment Signals section above
- **Visualization Assets**: No ACTIVE visual asset exists yet; an animated "ring-unrolling" derivation would be the highest-value visual for this concept

## Curriculum Feedback
- **Prerequisite fit**: `math.geom.circle` and `math.geom.area` (the general polygon area concept) are both correct prerequisites — the latter ensures students already understand area as "square units inside a region"
- **No `unlocks`**: this concept has no downstream `unlocks` in the current KG; natural extensions include sector area, annulus area, and surface area of spheres/cylinders
- **Grade band note**: NCERT introduces A = πr² at Grade 7 alongside circumference; the 3-hour estimate covers the full range from forward computation to inverse and scaling at the developing level

## Version History
- **2026-07-28**: Initial authoring by autonomous curriculum completion program (Batch 55, Wave 10 part 1, third concept). No Blueprint exists; all misconceptions diagnosed via birth-taxonomy procedure. Checked against 21-section Educational Brain Standard (EDUCATIONAL_BRAIN_STANDARD.md); Quality Gate 3 verified.
