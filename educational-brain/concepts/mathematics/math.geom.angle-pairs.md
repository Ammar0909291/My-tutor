# math.geom.angle-pairs

## Identity
- **KG ID**: `math.geom.angle-pairs`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.angle`
- **Unlocks**: `math.geom.parallel-lines`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.geom.angle-pairs.md` (reused by reference throughout this entry).

## Learning Objective
The student will define complementary (sum 90°) and supplementary (sum 180°) angle pairs and compute a missing partner angle, identify vertical angles (opposite, always equal) and linear pairs (adjacent, always supplementary) from a two-intersecting-lines diagram, and correctly distinguish "linear pair" as a stricter geometric configuration than merely "supplementary."

## Core Understanding
Per the Blueprint's Component 3: two angles are complementary if their measures sum to exactly 90°, and supplementary if their measures sum to exactly 180° — neither relationship requires the angles to be physically adjacent; both describe a purely numerical relationship between two measures. When two straight lines cross, they form four angles; the two angles directly opposite each other across the intersection (sharing only the vertex, not a side) are vertical angles, always equal — a consequence of each being supplementary to the same adjacent angle. A linear pair is two adjacent angles (sharing a vertex and one side) whose non-shared sides form a straight line; a linear pair is always supplementary, but supplementary is the broader, purely numerical category — a linear pair additionally requires the specific adjacent, straight-line configuration, so not every supplementary pair is a linear pair.

## Mental Models
1. **The numerical-relationship model** (Blueprint TA-A01, P11): complementary and supplementary describe only the SUM of two measures — the angles need not be drawn anywhere near each other for the relationship to hold.
2. **The one-diagram-four-relationships model** (Blueprint TA-A02, P11): a single two-intersecting-lines diagram simultaneously displays two pairs of vertical angles (opposite, equal) and four linear pairs (adjacent, supplementary) — all read off the same figure.
3. **The stricter-condition model** (Blueprint TA-A03, P06): every linear pair is supplementary, but supplementary is the broader category — linear pair additionally requires adjacency and a straight-line configuration, which a merely-supplementary pair may lack entirely.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is treating "supplementary" and "linear pair" as interchangeable, missing that a linear pair requires the additional adjacency/straight-line arrangement beyond just summing to 180°. A second failure is misidentifying which pair of angles at an intersection are vertical (opposite, equal) versus adjacent/linear-pair (next to each other, supplementary). A third failure is mixing up which relationship — complementary or supplementary — corresponds to which target sum, 90° or 180°.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — SUPPLEMENTARY-CONFLATED-WITH-LINEAR-PAIR** (Foundational)
  - **Blueprint description**: treating "supplementary" and "linear pair" as interchangeable terms, missing that linear pair requires the additional adjacency/straight-line configuration beyond just summing to 180°.
  - **Birth type**: Type 3, language contamination — both terms are introduced together and both involve "180°," so the everyday habit of using near-synonyms interchangeably carries over to two terms that are genuinely non-equivalent (one broader, one stricter).
  - **Repair approach**: Blueprint Repair Action B01 — the direct contrast between Example 3's disconnected supplementary angles (not a linear pair) and Example 2's genuinely adjacent linear pair (also supplementary), re-anchoring on the additional adjacency requirement.

- **MC-2 — VERTICAL-ANGLES-CONFUSED-WITH-ADJACENT-ANGLES** (Foundational)
  - **Blueprint description**: misidentifying which pair of angles formed by two intersecting lines are vertical (opposite, equal) versus adjacent/linear-pair (next to each other, supplementary).
  - **Birth type**: Type 1, overgeneralization — "the angles right next to my given angle" is over-applied as the answer to "find the equal angle," when equality actually belongs to the angle directly opposite, not the adjacent one.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking the explicit diagram labeling, anchoring on "vertical = directly across, no shared side" versus "adjacent/linear-pair = next to each other, sharing a side."

- **MC-3 — COMPLEMENTARY-AND-SUPPLEMENTARY-SUMS-CONFUSED** (Moderate)
  - **Blueprint description**: mixing up which relationship (complementary vs. supplementary) corresponds to which target sum (90° vs. 180°).
  - **Birth type**: Type 4, notation-induced — two similarly-spelled vocabulary words are arbitrarily paired with two specific numbers, with no inherent connection between the word and its number for a learner to anchor on.
  - **Repair approach**: Blueprint Repair Action B03 — a memorable mnemonic distinction ("complementary: C comes before S alphabetically, and 90 comes before 180"), re-verified against direct computation.

## Analogies
- **The carpenter's-corner-cut analogy** (Blueprint Component 5, P76): a straight cut across two pieces of molding meeting a corner produces two angles that are a linear pair (adjacent, supplementary) — directly distinguishable from a second, unrelated corner elsewhere in the room where two separately-cut angles might merely happen to be supplementary.

## Demonstrations
- Computing both the complement and supplement of the same 37° angle, showing they are genuinely different partner angles depending on which relationship is specified (Blueprint TA-A01, Example 1).
- Reading all four angle relationships (two vertical pairs, four linear pairs) off one two-intersecting-lines diagram (Blueprint TA-A02, Example 2).
- Contrasting two disconnected supplementary angles (not a linear pair) against the same diagram's genuinely adjacent linear pair (Blueprint TA-A03, Example 3), targeting MC-1.

## Discovery Questions
1. "Do two angles have to be drawn touching each other to be called supplementary?"
2. "When two lines cross, which pair of the four angles are equal — the ones next to each other, or the ones directly across?"
3. "If two angles sum to 180°, must they form a linear pair?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (complementary/supplementary as a numerical relationship) → A02 (vertical angles and linear pairs read off one diagram) → A03 (linear pair as stricter than merely supplementary, MC-1 hook) → A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — complementary/supplementary as a purely numerical sum relationship, independent of physical adjacency (Blueprint A01).
- **SHOW: Demonstration** — labeling all four angle relationships on one intersecting-lines diagram (Blueprint A02).
- **TEST-THINKING: Error Analysis** — the disconnected-supplementary-vs.-linear-pair contrast (Blueprint A03), targeting MC-1.
- **DO: Worked Example** — computing the complement and supplement of the same starting angle (Blueprint A01, Example 1), targeting MC-3.

## Voice Teaching Notes
When a student calls two angles "a linear pair," ask "are they actually drawn next to each other, sharing a side?" as a standing check directly targeting MC-1's conflation with mere supplementary.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 0 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A04 — the carpenter's-molding scenario distinguishing a genuine linear-pair cut from a separately-cut, merely supplementary pair elsewhere in the room.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to check for adjacency (shared vertex, shared side, no overlap) explicitly before ever applying the label "linear pair," even after confirming the sum is 180°, until the two-part check becomes automatic.

## Memory Hooks
- "Complementary and supplementary only care about the sum — the angles don't need to touch."
- "Vertical angles are directly across; linear-pair angles are right next to each other."
- "Every linear pair is supplementary, but not every supplementary pair is a linear pair."

## Transfer Connections
- `math.geom.parallel-lines` (unlocks) builds the angle-pair relationships formed when a transversal crosses parallel lines directly on vertical angles and linear pairs established here.
- `math.geom.angle` (requires) supplies the angle definition and degree measurement this concept's pair relationships are built on.

## Cross-Subject Connections
- Physics: reflection and refraction diagrams routinely rely on vertical-angle and linear-pair reasoning to relate incident and reflected/refracted angle measures.

## Blueprint References
`docs/curriculum/blueprints/math.geom.angle-pairs.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 5.
