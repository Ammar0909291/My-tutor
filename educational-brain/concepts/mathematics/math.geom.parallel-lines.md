# math.geom.parallel-lines

## Identity
- **KG ID**: `math.geom.parallel-lines`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.angle-pairs`, `math.geom.line`
- **Unlocks**: `math.geom.quadrilateral`, `math.geom.geometric-proof`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.geom.parallel-lines.md` (reused by reference throughout this entry).

## Learning Objective
The student will define parallel lines and identify a transversal's eight angles, derive the three transversal-angle relationships (corresponding equal, alternate interior equal, co-interior supplementary) from already-known vertical-angle and linear-pair facts rather than as three independent rules, and apply the converse — using an observed angle relationship to conclude two lines are parallel.

## Core Understanding
Per the Blueprint's Component 3: two lines in the same plane are parallel if they never intersect, no matter how far extended; a transversal is a third line crossing both, creating eight angles total (four at each intersection). Three relationships hold whenever the crossed lines are genuinely parallel: corresponding angles (same relative position at each intersection) are equal; alternate interior angles (between the lines, opposite sides of the transversal) are equal; co-interior angles (between the lines, same side) are supplementary. These are not three independent facts — corresponding angles equal is the foundational fact; alternate interior angles equal follows by combining a corresponding angle with its vertical angle; co-interior angles supplementary follows by combining an alternate interior angle with its linear-pair partner. Each relationship is genuinely reversible: observing equal corresponding angles (or equal alternate interior angles, or supplementary co-interior angles) is itself sufficient to conclude the two lines are parallel, without needing to already know they are parallel — this converse direction is exactly what formal proofs of parallelism use.

## Mental Models
1. **The two-clusters-of-four model** (Blueprint TA-A01, P11): a transversal crossing two lines creates two separate intersection points, each with the same clock-position layout of four angles — eight angles total, systematically identifiable.
2. **The one-new-fact-plus-two-known-facts model** (Blueprint TA-A02, P11): corresponding angles equal is the only genuinely new fact; alternate interior angles equal and co-interior angles supplementary both follow by combining it with already-known vertical-angle and linear-pair facts.
3. **The both-directions model** (Blueprint TA-A03, P28): the angle relationships work in both directions — parallel lines guarantee the angle facts, and observing the angle facts guarantees the lines are parallel.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing the angle relationships can only be used to deduce angles from known-parallel lines, missing that the converse allows concluding parallelism from observed angle relationships. A second failure is memorizing corresponding, alternate-interior, and co-interior as three unrelated rules rather than recognizing two of them are directly derivable from the third plus already-known vertical-angle and linear-pair facts. A third failure is confusing which specific pair of the eight angles counts as corresponding, alternate interior, or co-interior, especially when the transversal is drawn at an unusual angle.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — ANGLE-RELATIONSHIPS-TREATED-AS-ONE-DIRECTIONAL** (FOUNDATIONAL)
  - **Blueprint description**: believing the angle relationships can only be used to deduce angles from known-parallel lines, missing the converse's reverse direction.
  - **Birth type**: Type 5, instruction-induced — these relationships are almost always first taught and practiced in the forward direction (given parallel lines, find an angle), so the reverse (converse) use goes unpracticed and unnoticed.
  - **Repair approach**: Blueprint Repair Action B01 — the direct converse application, re-anchoring on "the relationship works in both directions."

- **MC-2 — THREE-ANGLE-RELATIONSHIPS-TREATED-AS-INDEPENDENT-FACTS** (Foundational)
  - **Blueprint description**: memorizing the three relationships as unrelated rules rather than recognizing two are derivable from the third plus already-known facts.
  - **Birth type**: Type 5, instruction-induced — the three relationships are frequently presented as a flat list of names to memorize, without the derivation chain connecting them to already-known vertical-angle and linear-pair facts.
  - **Repair approach**: Blueprint Repair Action B02 — the explicit derivation chain (corresponding → vertical angles → alternate interior → linear pairs → co-interior).

- **MC-3 — TRANSVERSAL-ANGLE-POSITIONS-MISIDENTIFIED** (Moderate)
  - **Blueprint description**: confusing which pair of the eight angles counts as corresponding, alternate interior, or co-interior, especially with an unusually-angled transversal.
  - **Birth type**: Type 2, perceptual intuition — the standard textbook diagram (near-vertical transversal) trains a visual pattern that breaks down once the transversal is drawn at an unusual angle.
  - **Repair approach**: Blueprint Repair Action B03 — the systematic clockwise labeling convention, re-anchoring on "between the parallel lines" and "same/opposite side of the transversal" as the two questions that pin down each relationship's name regardless of the transversal's angle.

## Analogies
- **The surveyor's-boundary-check analogy** (Blueprint Component 5, P76): a surveyor checking whether two property boundary lines are truly parallel by measuring the angles a straight fence line (acting as a transversal) makes when crossing both — directly applying the converse to CONCLUDE parallelism from observed angle measurements, rather than assuming it.

## Demonstrations
- Labeling all eight angles created by a transversal crossing two parallel lines using a systematic clockwise convention (Blueprint TA-A01, Example 1), targeting MC-3.
- The full derivation chain from corresponding angles (70°) through vertical angles to alternate interior angles (70°) (Blueprint TA-A02, Example 2), targeting MC-2.
- The direct converse application: observing equal corresponding angles (55°) with no prior information about the lines, concluding they must be parallel (Blueprint TA-A03, Example 3), targeting MC-1.

## Discovery Questions
1. "If you measure a transversal's corresponding angles and find them equal, but nobody told you the two lines were parallel, can you conclude anything?"
2. "Are corresponding, alternate-interior, and co-interior angles three separate facts, or can two of them be derived from the third?"
3. "Given an unusually-angled transversal, how do you correctly identify which angle is the alternate interior angle to a given one?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (parallel lines and the transversal's eight angles) → A02 (deriving the three relationships from already-known facts) → A03 (the converse: angle relationships prove parallelism) → A04 (Mastery Gate, P91).

## Tutor Actions
- **ORGANIZE: Concept Map** — the systematic eight-angle clockwise labeling at both intersections (Blueprint TA-A01), targeting MC-3.
- **SHOW: Demonstration** — the full derivation chain from corresponding angles to alternate interior to co-interior (Blueprint TA-A02), targeting MC-2.
- **TEST-THINKING: Error Analysis** — the direct converse application from observed equal angles alone (Blueprint TA-A03), targeting MC-1.
- **TELL: Explanation** — the reversibility of all three angle relationships, stated explicitly as a "both directions" rule.

## Voice Teaching Notes
When a student is given an angle measurement with no stated information about the lines, ask "can this alone tell you anything about whether the lines are parallel?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A04 — the surveyor's-boundary-check scenario applying the converse, interpreting a failed co-interior check, and explaining why only one of the three relationships needs verifying.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, present only converse-direction problems (angle measurements given, parallelism unstated) for repeated practice, explicitly forbidding forward-direction shortcuts, until the reverse-direction conclusion is drawn reliably.

## Memory Hooks
- "The angle relationships work both ways — equal angles prove parallel, not just the other way around."
- "One new fact (corresponding angles) plus two known facts (vertical angles, linear pairs) gives you all three relationships."
- "Ask 'between the lines?' and 'same or opposite side?' to pin down any transversal angle's name."

## Transfer Connections
- `math.geom.quadrilateral` (unlocks) relies directly on parallel-line angle relationships for parallelogram properties.
- `math.geom.geometric-proof` (unlocks) uses the converse relationships established here as a standard tool for formally proving lines parallel.
- `math.geom.angle-pairs` and `math.geom.line` (require) supply the vertical-angle/linear-pair facts and the line definition this concept's derivation chain and transversal structure directly build on.

## Cross-Subject Connections
- Physics: light rays reflecting between parallel mirrors, and the angle relationships governing multiple reflections, rely directly on transversal-angle reasoning established here.

## Blueprint References
`docs/curriculum/blueprints/math.geom.parallel-lines.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 7.
