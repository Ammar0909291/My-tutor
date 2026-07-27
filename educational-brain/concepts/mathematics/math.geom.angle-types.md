# math.geom.angle-types

## Identity
- **KG ID**: `math.geom.angle-types`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.angle`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG (P76_mode = independence)
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: none exists (`docs/curriculum/blueprints/math.geom.angle-types.md` not on disk); misconceptions below authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/`).

## Learning Objective
The student will classify any angle by its measure — acute (between 0° and 90°), right (exactly 90°), obtuse (between 90° and 180°), straight (exactly 180°), reflex (between 180° and 360°) — from either a stated measure or a drawn figure, regardless of the angle's orientation on the page.

## Core Understanding
Angle classification is a partition of the measure line from 0° to 360° into named bands: the classification depends only on the number of degrees, never on how the angle is drawn, which way it opens, or how long its arms are. Two of the five names are exact values (right = exactly 90°, straight = exactly 180°) and three are open ranges between them (acute strictly below 90°, obtuse strictly between 90° and 180°, reflex strictly between 180° and 360°). Because the boundaries are exact, 90° is not "a big acute angle" and 89.9° is not "almost right, so right" — the bands do not blur. A straight angle genuinely is an angle (its arms form a straight line through the vertex), and every angle drawn between two rays has both a "small side" and a "large side" reading — the reflex angle is the large-side measure of the same figure, so naming an angle requires knowing which of the two openings is meant.

## Mental Models
1. **The clock-face model**: the two arms are clock hands; the classification reads how far the hands have swept apart — a little (acute), a quarter turn (right), between a quarter and half turn (obtuse), exactly half (straight), more than half (reflex).
2. **The measure-band model**: a number line from 0° to 360° painted in five bands with hard edges at 90° and 180° — classifying is just locating the measure on the painted line.
3. **The two-openings model**: any two rays from a vertex create two angles that sum to 360° — the smaller opening and its reflex partner — and a classification names one opening, not the figure.

## Why Students Fail
Classification errors here are almost never measurement errors — they are reading the drawing instead of the measure: judging by the length of the arms or the rotation of the figure on the page, blurring the exact 90°/180° boundaries into fuzzy zones, or failing to see straight and reflex angles as angles at all because they don't look like the prototype "corner."

## Misconceptions
Authored via the birth-taxonomy diagnostic procedure:

- **MC-1 — CLASSIFICATION-READ-FROM-ARM-LENGTH-OR-ORIENTATION** (Foundational)
  - **Description**: judging an angle's type from the drawing's surface features — longer arms read as "bigger angle," or a tilted right angle not recognized as right because it isn't drawn as an upright corner.
  - **Birth type**: Type 2, perceptual intuition — the visual size of the drawn figure (ink, area between arms, upright orientation) is perceptually salient, while the rotational opening the measure actually tracks is not; the prototype right angle is always drawn axis-aligned, so tilted instances fail the learned visual template.
  - **Repair approach**: contrast pairs holding measure constant while varying arm length and rotation (a 40° angle with long arms vs a 70° angle with short arms; a 90° angle tilted 30° off vertical), forcing classification from measure alone; then the collide step — measure both with a protractor and let the numbers override the picture.

- **MC-2 — BOUNDARY-VALUES-ABSORBED-INTO-RANGES** (High)
  - **Description**: classifying 90° as acute or obtuse ("it's about that size"), or treating "right" as a range ("anything close to 90° is right") — the exact boundaries blur into the neighboring bands.
  - **Birth type**: Type 5, instruction-induced — early teaching presents one prototype per name ("this pointy one is acute, this corner is right") without ever stating the boundary rule, so the categories are learned as fuzzy visual families rather than exact measure bands.
  - **Repair approach**: state the partition explicitly with the two exact values called out, then probe directly at the boundaries: "Is 90° acute? Is 90.5° right? Is 180° obtuse?" — commit, collide with the definition, re-probe with 89.9°/90°/90.1° as a triple.

- **MC-3 — STRAIGHT-AND-REFLEX-NOT-COUNTED-AS-ANGLES** (Moderate)
  - **Description**: denying that a straight line through a vertex is an angle ("that's just a line"), or being unable to name the 250° opening of a figure because only the 110° side "looks like the angle."
  - **Birth type**: Type 1, overgeneralization — the prototype "angle = a corner smaller than a half turn" is over-applied as the definition, excluding the legitimate cases at and beyond 180° that the actual definition (rotation between two rays) includes.
  - **Repair approach**: return to the `math.geom.angle` definition (an angle is the rotation between two rays from a common vertex), then physically sweep one clock hand past 180° and keep counting degrees — the rotation doesn't stop existing at the half turn.

## Analogies
- **The clock face**: hands sweeping apart, with the quarter-turn (3:00) and half-turn (6:00) positions as the two exact landmarks the whole classification hangs on.
- **The door**: slightly ajar (acute), open square to the wall (right), open wide (obtuse), flat against the wall (straight) — and the reflex angle as measuring around the back of the door instead.

## Demonstrations
- The constant-measure contrast: the same 65° angle drawn with short arms, long arms, and three different rotations — all acute, targeting MC-1.
- The boundary triple: 89.9°, 90°, 90.1° drawn near-identically, classified acute/right/obtuse purely by measure, targeting MC-2.
- The two-openings sweep: two rays at 110°, naming both the 110° obtuse opening and the 250° reflex opening of the same figure, targeting MC-3.

## Discovery Questions
1. "Here are two angles — one with long arms, one with short. Which is bigger? What would you measure to be sure?"
2. "Is 90° an acute angle, an obtuse angle, or neither? Where exactly does acute end?"
3. "Two rays make a 110° angle. What's the measure of the other opening between them — and is that an angle too?"

## Teaching Sequence
1. Reactivate `math.geom.angle` (angle as rotation between rays, measured in degrees) and sweep a single arm from 0° upward, naming each band as the sweep crosses into it — the classification arrives as landmarks on one continuous motion, not five separate facts.
2. Fix the two exact boundaries (90°, 180°) with physical referents (square corner, straight line) before naming the ranges between them.
3. Run the constant-measure contrasts (MC-1) and boundary probes (MC-2).
4. Extend the sweep past 180° for straight and reflex (MC-3), closing with the two-openings reading of a single figure.
5. Mastery gate (below).

## Tutor Actions
- **SHOW: Demonstration** — the continuous sweep through all five bands on one figure (clock hand or door).
- **TEST-THINKING: Matching** — matching measures to names and names to measure ranges, both directions (the bidirectional-translation diagnostic).
- **TEST-THINKING: Error Analysis** — a worked classification that judged by arm length; the student finds and names the error, targeting MC-1.
- **DO: Drawing** — the student draws one example of each of the five types, including a tilted right angle and a reflex angle, targeting MC-1 and MC-3.

## Voice Teaching Notes
This is a bloom=remember concept for foundational learners — keep bursts short and probes concrete. When a student misclassifies, don't correct the label; ask "what's the measure?" first, so the measure-then-name habit forms. Never accept "it looks acute" as a justification, even when the answer is right.

## Assessment Signals
- **P76 (transfer probe, independence mode)**: "A skateboard ramp article says 'the ramp meets the ground at a gentle 12° angle, but the pro version is nearly three times steeper.' Classify both ramp angles, and explain whether tripling an acute angle always yields an acute angle — if not, at what starting measure does the classification change?" (12° acute; 36° acute; no — tripling changes classification once the start exceeds 30°, crossing 90°.)
- **P77 (mastery gate)**: 4 items — (1) classify 37°, 90°, 143°, 180°, 305°; (2) a tilted right angle and a long-armed 50° angle drawn: classify both from measure marks; (3) true/false: "89° is a right angle because it's close to 90°"; (4) two rays form a 130° angle — name and classify the other opening. Plus P76; MAMR 5/5 per the 0.95 threshold.

## Tutor Recovery Strategy
If MC-1 persists, remove drawings entirely for one round — classify from stated measures only — then reintroduce figures one at a time with the protractor mandatory. If boundary errors (MC-2) recur, have the student recite the partition with its two exact values before each classification until the hard edges are automatic.

## Memory Hooks
- "Classify the measure, not the drawing — arms lie, degrees don't."
- "Two exact landmarks: 90° is right, 180° is straight; everything else is a range between landmarks."
- "Past half a turn, the angle is reflex — the sweep doesn't stop existing at 180°."
- "Every pair of rays makes two angles; the two openings sum to 360°."

## Transfer Connections
- `math.geom.angle` (requires) supplies the rotation-between-rays definition and degree measure this classification partitions.
- `math.geom.triangle-types` (sibling, this wave) reuses the acute/right/obtuse vocabulary as its angle-based triangle classification — errors here propagate directly there.
- `math.geom.angle-pairs` and `math.geom.angle-measurement` (already-authored EB siblings) supply the measuring and pairing machinery these named bands are read from.

## Cross-Subject Connections
- Physics/engineering: incline angles, launch angles, and field-of-view specifications all assume fluent acute/obtuse/reflex reading of stated measures.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date. This entry is the primary authored teaching source; a future Blueprint should reuse (not re-derive) the misconception registry above.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time. (The KG's empty `unlocks` is a deliberate granularity choice — consumers like `triangle-types` gate on `math.geom.triangle`/`math.geom.angle` rather than on this classification node.)

## Version History
- v1.0 (2026-07-27): Initial authoring, Domain Certification Mode, math.geom Wave 10 part 1.
