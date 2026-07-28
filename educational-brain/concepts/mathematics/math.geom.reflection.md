## Identity

- **KG ID**: `math.geom.reflection`
- **Name**: Reflection
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3
- **Requires**: `math.geom.transformations`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Blueprint**: none — not yet produced by the Curriculum Production Pipeline as of 2026-07-28

## Learning Objective

Apply reflections over the x-axis, y-axis, the lines y = x and y = −x, and a general vertical or horizontal line; find the image of a given figure under a named reflection; identify the line of reflection given a pre-image and its image; and distinguish reflection (orientation-reversing) from the orientation-preserving transformations (translation, rotation, dilation).

## Core Understanding

A reflection flips a figure over a **line of reflection** (the mirror line). Each point P maps to a point P′ such that the line of reflection is the perpendicular bisector of PP′. The result is a mirror image — congruent to the original, with distances preserved, but with **orientation reversed** (clockwise becomes counterclockwise).

**Standard reflection rules** (coordinate formulas):

| Line of reflection | Rule |
|---|---|
| x-axis | (x, y) → (x, −y) |
| y-axis | (x, y) → (−x, y) |
| y = x | (x, y) → (y, x) |
| y = −x | (x, y) → (−y, −x) |
| x = a (vertical) | (x, y) → (2a − x, y) |
| y = b (horizontal) | (x, y) → (x, 2b − y) |

**Key properties**:
- Isometry: distances and angles preserved
- Orientation reversed (this distinguishes reflection from translation, rotation, and dilation)
- The line of reflection consists of all fixed points
- A reflection composed with itself is the identity

**Finding the line of reflection**: the line of reflection is the perpendicular bisector of the segment joining any pre-image point to its image. Equivalently, the midpoint of PP′ lies on the mirror line, and PP′ is perpendicular to the mirror line.

## Mental Models

- **The mirror**: place a mirror along the line of reflection. The image is what you see in the mirror — congruent, same distance from the mirror, but flipped.
- **Equal perpendicular distance**: every point is the same distance from the mirror line as its image, measured perpendicularly. The mirror line is the equidistant dividing line.
- **Orientation flip — the handedness test**: trace a figure with a clockwise path. After reflection, the equivalent path is counterclockwise. An asymmetric figure (like a letter R) becomes its mirror twin (the backwards R, Я) — no rotation can turn one into the other.

## Why Students Fail

Reflections over the lines y = x and y = −x are the most error-prone because the rules (swap coordinates; swap and negate) are less intuitively grounded than the axis reflections. Students who have memorized the x-axis and y-axis rules by pattern often do not know where to start with y = x. The perpendicular-distance property (equal distance, perpendicular to the mirror line) is underused; students often reflect graphically by "eyeballing" and produce points that are collinear with the mirror line rather than equidistant on the other side. Finally, reflection is the only one of the four rigid motions that reverses orientation — students who have not solidified this property may confuse reflection with rotation when an asymmetric figure appears "flipped" due to a large rotation angle.

## Misconceptions

### MC-1 — Y-EQUALS-X-REFLECTION-NEGATES-COORDINATES
**Birth type**: Type 5 (instruction-induced — the y = −x rule negates and swaps, while the y = x rule only swaps; students who have learned both rules simultaneously often confuse which rule applies to which line)
**Mechanism**: The student confuses the reflection rule for y = x (swap x and y) with the rule for y = −x (swap x and y AND negate both). When asked to reflect over y = x, they apply (x,y) → (−y, −x) — the y = −x rule — rather than (x,y) → (y, x).
**Diagnostic probe**: "Reflect (3, 5) over the line y = x." Watch for (−5, −3) rather than (5, 3).
**Characteristic phrases**: "I swap and negate" (on a y=x problem) / applying the y=−x rule when y=x is the mirror.

### MC-2 — PERPENDICULAR-DISTANCE-NOT-MAINTAINED
**Birth type**: Type 2 (perceptual intuition — when reflecting graphically, students estimate the image location by sliding the point "across the line" without ensuring the distance is measured perpendicularly to the mirror line; on non-axis mirror lines this is especially prone to error)
**Mechanism**: The student attempts to reflect a point over a diagonal line by visually placing the image "on the other side" without computing or drawing the perpendicular from the point to the line and measuring equal distance on the other side. The image ends up at the wrong location — typically close to correct but shifted along the mirror line rather than straight across it.
**Diagnostic probe**: "Reflect (1, 5) over the line y = x + 2." Watch for the student placing the image near the line without drawing the perpendicular construction.
**Characteristic phrases**: "I just moved it to the other side" / image placed at a point that is not equidistant from the mirror line.

### MC-3 — REFLECTION-PRESERVES-ORIENTATION
**Birth type**: Type 1 (overgeneralization — translation, rotation, and dilation all preserve orientation; students generalize this property to all rigid motions, missing that reflection is the exception)
**Mechanism**: The student incorrectly states that a reflection "doesn't change the figure" or "keeps it the same orientation," failing to recognize that reflection reverses orientation (turns a right-handed figure into a left-handed one). This matters in problems asking to identify which transformation maps a figure to its image, or in problems about chirality.
**Diagnostic probe**: use an asymmetric figure (letter R). Show the reflected image (backwards R). Ask: "can you rotate the original R to match the reflected image?" A student with MC-3 will say yes, or will not notice the orientation reversal.
**Characteristic phrases**: "A reflection just moves the figure to the other side" / "it's still the same shape and orientation" / not identifying the flip.

### MC-4 — REFLECTION-OVER-Y-AXIS-NEGATES-Y-COORDINATE
**Birth type**: Type 5 (instruction-induced — the x-axis rule negates y, and the y-axis rule negates x; students frequently swap which coordinate is negated when they have been introduced to both rules by rote simultaneously)
**Mechanism**: When reflecting over the y-axis, the student applies the x-axis rule — negating y instead of x — giving (x, −y) instead of (−x, y).
**Diagnostic probe**: "Reflect (4, 3) over the y-axis." Watch for (4, −3) (the x-axis reflection) rather than (−4, 3).
**Characteristic phrases**: "The y-axis reflection changes the y" / (4,3) → (4,−3) when the y-axis is the mirror.

## Analogies

- **Bathroom mirror**: stand in front of a mirror. Your left hand appears as the mirror image's right hand. You cannot rotate yourself into your mirror image — no matter how you turn, your left hand is always where it starts. Reflection introduces a fundamental "handedness" change that no rotation can undo.
- **Folding paper**: fold a piece of paper along a line. A dot on the paper corresponds to its image directly beneath it on the other layer. Unfold: the two dots are equidistant from the fold line, and the fold line is perpendicular to the segment connecting them.

## Demonstrations

1. **Axis reflections with coordinates**: plot triangle (1,2), (4,2), (3,5). Reflect over x-axis: (1,−2), (4,−2), (3,−5). Reflect over y-axis: (−1,2), (−4,2), (−3,5). Confirm perpendicular distance from each vertex to the mirror axis is the same before and after.
2. **y = x reflection via swapping**: plot (2, 5). The y = x line runs through (0,0) at 45°. Image is (5, 2) — x and y coordinates swapped. Verify: midpoint of (2,5) and (5,2) is (3.5, 3.5), which lies on y = x (since 3.5 = 3.5 ✓). Segment from (2,5) to (5,2) has slope −1, perpendicular to y = x (slope +1) ✓.
3. **Orientation reversal with letter F**: draw the letter F. Reflect it over the y-axis. The reflected image is an "F" facing the wrong way (mirrored). Ask: can you rotate the original F to match? No — you would need to "turn it through the page." The reflected image is a mirror letter that no rotation produces.

## Discovery Questions

- "If I reflect a figure over a line and then reflect again over the same line, what happens? Why?"
- "How do you find the line of reflection if someone gives you a figure and its image but doesn't tell you the line?"
- "Reflection reverses orientation. Is there any way to get the same result using only translations and rotations?"

## Teaching Sequence

1. Review `math.geom.transformations` — isometries and the concept of orientation.
2. Introduce reflection over the x-axis: (x,y) → (x,−y). Verify with coordinates and a graph.
3. Reflection over the y-axis: (x,y) → (−x,y). Stress: this negates x, not y.
4. Reflection over y = x: (x,y) → (y,x). Derive by verifying the perpendicular bisector property.
5. Reflection over y = −x: (x,y) → (−y,−x). Contrast with y = x rule explicitly.
6. General lines (x = a, y = b): use the equal-perpendicular-distance principle.
7. Orientation reversal: asymmetric figure demo. Confirm reflection is the only rigid motion that reverses orientation.
8. Finding the mirror line: perpendicular bisector of PP′ for any vertex pair.
9. Assessment gate.

## Tutor Actions

- MC-1 intervention: write the two rules side by side (y=x: swap only; y=−x: swap and negate) and present a problem targeting each. Practice until the student can articulate which rule goes with which line without looking.
- MC-2 intervention: draw the perpendicular construction explicitly — drop a perpendicular from the point to the mirror line, mark the foot, then measure the same distance on the other side. Make this a required drawing step, not an estimation.
- MC-3 intervention: asymmetric letter demo (letter F or R). Confirm the orientation reversal by asking whether a rotation can produce the reflected image — the answer is always no for a reflection.
- MC-4 intervention: at the start of each axis-reflection problem, state the verbal rule aloud: "reflecting over the y-axis means crossing the y-axis — x changes sign, y stays." Connect "which axis you cross" to "which coordinate changes."

## Voice Teaching Notes

- "Flip it over like a pancake" — the pancake lands on the mirror line and the bottom side faces up. Use this for orientation reversal.
- When a student applies the wrong rule for y = x: "Let's check — is the midpoint of the original and image on the y = x line?" Walk through the verification rather than simply restating the rule.
- Latency signal: a long pause on y = x or y = −x suggests the student is trying to recall rather than apply a grounded rule — redirect to the equal-distance construction and let the coordinate formula emerge from that.

## Assessment Signals

- **x-axis and y-axis probes**: reflect a given point over each axis; confirm correct coordinate negation.
- **y = x probe**: reflect a given point; verify by checking the midpoint lies on y = x and the segment is perpendicular to it.
- **Orientation probe**: show a pre-image and image of an asymmetric figure; ask whether orientation was preserved or reversed; identify the transformation type.
- **Line-finding probe**: given A(1,4) and A′(4,1), find the line of reflection. (Answer: perpendicular bisector of AA′ is y = x.)
- **MC-4 probe**: "reflect (5, 2) over the y-axis" — watch for (5, −2) vs (−5, 2).

## Tutor Recovery Strategy

- **MC-1**: drill the y = x rule with the perpendicular-bisector verification for three examples until the rule is grounded in the geometric property, not just memorized.
- **MC-2**: make the perpendicular construction mandatory drawing practice before the coordinate rule is applied; then show how the rule is a shortcut for the construction, not a replacement.
- **MC-3**: repeat the asymmetric letter exercise; ask the student to physically try rotating a cut-out of the figure to match the reflected image. The physical impossibility of achieving the reflection via rotation makes the orientation reversal undeniable.
- **MC-4**: create a memory anchor — "the y-axis is vertical; to cross the y-axis, your x-value changes sign; y stays put." Write this as a rule the student generates rather than receives.

## Memory Hooks

- **x-axis reflection**: "negate y — flip up-down."
- **y-axis reflection**: "negate x — flip left-right."
- **y = x reflection**: "swap x and y — diagonally across."
- **y = −x reflection**: "swap and negate — the anti-diagonal."
- **Orientation**: "reflection is the only rigid motion that produces a mirror image — the other three preserve handedness."

## Transfer Connections

- `math.geom.transformations`: reflection is one of the four rigid motions introduced at the parent entry.
- `math.geom.translation`, `math.geom.rotation`, `math.geom.dilation`: contrast with reflection — all three preserve orientation; only reflection reverses it.
- `math.geom.congruent-triangles`: two triangles that are mirror images of each other are congruent (a reflection maps one to the other), but no sequence of rotations and translations can accomplish this.
- `math.geom.geometric-proof`: proof that the perpendicular bisector of PP′ is the line of reflection is a foundational proof using isometry properties.

## Cross-Subject Connections

- Physics: optical reflection (angle of incidence = angle of reflection); mirror images in optics are reflections in the geometric sense.
- Chemistry: chirality — left-handed and right-handed molecules (enantiomers) are reflection images of each other that cannot be superimposed. The orientation-reversal property of reflection is the mathematical basis for chirality.

## Blueprint References

- No Blueprint file exists for `math.geom.reflection` as of 2026-07-28.
- Misconceptions authored directly via the birth-taxonomy diagnostic procedure (EDUCATIONAL_BRAIN_STANDARD.md §4.2).

## Runtime Asset References

- Explanation assets: `math.geom.reflection:EXPLANATION:en` (DRAFT, live-capture path)
- Probe assets: `math.geom.reflection:PROBE:en` (DRAFT, live-capture)

## Curriculum Feedback

- The KG description "flips every point over a line of reflection, reversing orientation" is accurate and precisely encapsulates the two defining properties: the flip (isometry) and orientation reversal. The description correctly distinguishes reflection from the other rigid motions.
- The KG has no unlocks — reflection is a terminal node in the math.geom domain at this level, though it feeds into symmetry and group theory at higher levels.

## Version History

- v1.0 (2026-07-28): Initial entry. No Blueprint. 4 misconceptions authored via birth-taxonomy diagnostic.
