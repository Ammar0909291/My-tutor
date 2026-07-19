# Teaching Blueprint: Angle Pairs (`math.geom.angle-pairs`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.angle-pairs` |
| name | Angle Pairs |
| domain | Geometry |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.geom.angle` |
| unlocks | `math.geom.parallel-lines` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a diagram of two intersecting lines with all four angles marked, before the formal pair definitions |
| description (KG) | Special pairs of angles: complementary (sum 90°), supplementary (sum 180°), vertical angles (equal across an intersection), and linear pairs (supplementary adjacent). |

## Component 1 — Learning Objectives

- LO1: Define **complementary** angles (two angles summing to $90°$) and **supplementary** angles (two angles summing to $180°$), and compute the missing angle in a pair given one angle's measure.
- LO2: Identify **vertical angles** (the pair of angles directly opposite each other where two lines cross) and verify they are always EQUAL, and identify a **linear pair** (two ADJACENT angles formed on a straight line, which are always supplementary).
- LO3: Distinguish **linear pair** from mere **supplementary**: every linear pair is supplementary, but NOT every pair of supplementary angles is a linear pair — directly refuting the misconception that "supplementary" and "linear pair" are interchangeable terms, when adjacency (sharing a vertex and a side, with no overlap) is an additional requirement for a linear pair specifically.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.angle` (an angle as the figure formed by two rays sharing a vertex, measured in degrees, with classifications acute/right/obtuse/straight/reflex).

## Component 3 — Core Explanation

**Complementary and supplementary pairs**: two angles are **complementary** if their measures sum to exactly $90°$ (together they could form a right angle); two angles are **supplementary** if their measures sum to exactly $180°$ (together they could form a straight angle). Neither definition requires the two angles to be physically adjacent or drawn touching each other at all — the terms describe a purely NUMERICAL relationship between the two measures.

**Vertical angles**: when two straight lines cross at a point, they form FOUR angles. The two angles directly OPPOSITE each other across the intersection point (not sharing a side, but sharing only the vertex) are called **vertical angles**, and they are always EQUAL in measure — a direct geometric consequence of both being supplementary to the SAME adjacent angle (each vertical angle, plus its shared adjacent neighbor, sums to $180°$, forcing the two non-adjacent opposite angles to match).

**Linear pairs**: a **linear pair** is two ADJACENT angles (sharing a vertex and one common side) whose NON-shared sides form a straight line (are opposite rays). A linear pair is ALWAYS supplementary (the two angles together sweep out a full straight angle, $180°$) — but linear pair is a STRICTER, more specific condition than merely "supplementary": it additionally requires the specific adjacency/straight-line configuration, not just a numerical sum.

## Component 4 — Worked Examples

**Example 1 (LO1 — complementary and supplementary, computing the missing angle)**: If one angle measures $37°$ and it is complementary to a second angle, the second angle measures $90°-37°=53°$ (verify: $37°+53°=90°$ ✓). If instead the same $37°$ angle is supplementary to a different angle, that angle measures $180°-37°=143°$ (verify: $37°+143°=180°$ ✓) — the SAME starting angle, paired differently, gives genuinely different "partner" angles depending on which relationship (complementary vs. supplementary) is specified.

**Example 2 (LO2 — vertical angles and a linear pair, identified in one diagram)**: Two lines cross, forming four angles labeled $\angle1,\angle2,\angle3,\angle4$ in order around the intersection point, with $\angle1=70°$. The angle directly OPPOSITE $\angle1$ (i.e. $\angle3$) is a VERTICAL angle to it, so $\angle3=70°$ also (equal, per the vertical-angles property). The angle ADJACENT to $\angle1$ (sharing a side and forming a straight line with it, i.e. $\angle2$) is a LINEAR PAIR with $\angle1$, so $\angle2 = 180°-70°=110°$ (supplementary, per the linear-pair property). By the same reasoning, $\angle4$ (vertical to $\angle2$) is also $110°$.

**Example 3 (LO3 — supplementary but NOT a linear pair, breaking MC-1)**: Consider two angles, $\angle A=60°$ and $\angle B=120°$, that are NOT drawn adjacent to each other at all — perhaps $\angle A$ is part of one triangle in a diagram and $\angle B$ is part of a completely separate, unconnected figure elsewhere on the page. These two angles ARE supplementary (numerically, $60°+120°=180°$) — but they are NOT a linear pair, since they don't share a vertex, don't share a side, and don't form a straight line together at all. Contrast this with Example 2's $\angle1$ and $\angle2$: also supplementary ($70°+110°=180°$), but ADDITIONALLY forming a genuine linear pair, since they're adjacent and their outer sides form a straight line. This proves "supplementary" is the broader, purely numerical category, while "linear pair" is a strictly narrower geometric configuration that happens to also be supplementary.

## Component 5 — Teaching Actions

### Teaching Action A01 — Complementary and Supplementary: A Numerical Relationship (Primitive P11: Representation Shift)

State: "these two terms only care about the SUM — 90° for complementary, 180° for supplementary. The angles don't even need to be drawn near each other." Work Example 1's direct computation of both cases from the same starting angle.

### Teaching Action A02 — Vertical Angles and Linear Pairs, Read Off One Diagram (Primitive P11: Representation Shift)

Draw the two-intersecting-lines diagram from Example 2, labeling all four angles. State: "angles directly across from each other are vertical — always equal. Angles right next to each other, forming a straight line together, are a linear pair — always supplementary." Work through identifying all four relationships in the diagram.

### Teaching Action A03 — Linear Pair Is Stricter Than Merely Supplementary (Primitive P06: Contrast Pair)

**Contrast** Example 3's two disconnected supplementary angles (no shared vertex, not a linear pair) against Example 2's genuinely adjacent linear pair (also supplementary, but additionally meeting the adjacency/straight-line requirement). State: "every linear pair IS supplementary — but plenty of supplementary pairs are NOT linear pairs. Linear pair requires the specific adjacent, straight-line arrangement; supplementary only requires the sum to work out."

- **MC-1 hook**: ask "if two angles are supplementary, must they form a linear pair?" — a "yes" answer reveals MC-1 (treating "supplementary" and "linear pair" as interchangeable, missing that linear pair requires the additional adjacency/straight-line configuration).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. An angle measures $28°$. Find its complement and its supplement, showing both separately.
  2. Two lines intersect, forming four angles. One angle measures $105°$. Find the measures of the other three angles, identifying which are vertical to it and which form a linear pair with it.
  3. Give an example (described in words, no drawing required) of two supplementary angles that are NOT a linear pair.
  4. Explain, in your own words, why every linear pair is supplementary, but not every supplementary pair is a linear pair.
- **P76 (Transfer Probe, mode = independence)**: "A carpenter is cutting a piece of molding to fit into a corner where two walls meet, forming an angle of $118°$ on one side of the cut. (a) If the carpenter needs the OTHER piece of molding (on the other side of the same straight cut line) to fit exactly into the remaining space to complete a straight edge, explain what angle that other piece needs, and whether this relationship is complementary, supplementary, or a linear pair specifically. (b) Now suppose the carpenter, working on an entirely different, unrelated corner elsewhere in the room, needs a separate piece cut to $62°$. Explain whether this $62°$ angle and the original $118°$ angle are supplementary, and whether they form a linear pair, justifying your answer using the adjacency requirement from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUPPLEMENTARY-CONFLATED-WITH-LINEAR-PAIR | Treating "supplementary" and "linear pair" as interchangeable terms, missing that linear pair requires the additional adjacency/straight-line configuration beyond just summing to 180° | Foundational |
| MC-2 | VERTICAL-ANGLES-CONFUSED-WITH-ADJACENT-ANGLES | Misidentifying which pair of angles formed by two intersecting lines are "vertical" (opposite, equal) versus "adjacent"/linear-pair (next to each other, supplementary) | Foundational |
| MC-3 | COMPLEMENTARY-AND-SUPPLEMENTARY-SUMS-CONFUSED | Mixing up which relationship (complementary vs. supplementary) corresponds to which target sum (90° vs. 180°) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Supplementary-Linear-Pair Conflation") → P41 (detect: present Example 3's two disconnected supplementary angles and ask whether they form a linear pair) → P64 (conceptual shift: re-walk the direct contrast between Example 2 (genuine linear pair) and Example 3 (supplementary but not adjacent), re-anchoring on "linear pair needs BOTH the 180° sum AND the specific adjacent, straight-line arrangement").
- **B02 (targets MC-2)**: P27 (name it: "Vertical-Adjacent Angle Confusion") → P41 (detect: present the two-intersecting-lines diagram and ask a student to identify the vertical angle to a given one, checking for confusion with the adjacent angle instead) → P64 (conceptual shift: re-walk Example 2's explicit labeling, re-anchoring on "vertical angles are directly ACROSS the intersection — no shared side; adjacent/linear-pair angles are NEXT TO each other, sharing a side").
- **B03 (targets MC-3)**: P27 (name it: "Complementary-Supplementary Sum Confusion") → P41 (detect: ask a student to find the complement of a given angle and check whether they compute using 180° instead of 90°) → P64 (conceptual shift: re-anchor on a memorable distinction — "complementary: C comes before S in the alphabet, and 90 comes before 180" or similar, then re-verify with Example 1's direct computation of both).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.angle` (the angle definition and degree measurement this concept's pair relationships are built on).
- **Unlocks**: `math.geom.parallel-lines` (the angle-pair relationships formed when a transversal crosses parallel lines directly build on vertical angles and linear pairs established here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a foundational/understand tag places this at a "3 TAs + gate" tier — A01 (complementary/supplementary), A02 (vertical angles/linear pairs), and A03 (linear pair vs. mere supplementary) each target a distinct LO, appropriate for a foundational vocabulary-building concept with one genuinely subtle terminological distinction (MC-1).
- MC-1 (supplementary vs. linear pair) was given the most teaching weight because it is the single most common source of imprecise language in this topic — students correctly compute that two angles sum to 180° and then incorrectly assume this alone justifies calling them "a linear pair," missing the additional geometric requirement.
- Example 3 was deliberately constructed with two angles from ENTIRELY UNRELATED figures (not just non-adjacent angles in the same diagram) to make the "not a linear pair" case as unambiguous as possible — removing any visual proximity that might make a student mistakenly assume adjacency.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: two intersecting lines with all four angles marked before formal definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
