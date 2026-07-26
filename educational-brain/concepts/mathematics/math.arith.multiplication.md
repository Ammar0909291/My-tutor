# Multiplication — `math.arith.multiplication`

## Identity

- **Concept ID**: `math.arith.multiplication` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; children: `math.arith.multiplication-table`, `math.arith.
  long-multiplication`, `math.arith.mental-multiplication`
- **Prerequisites**: `math.arith.addition` (multiplication is defined
  as iterated addition; long multiplication uses column addition for
  partial products).
- **Unlocks**: `math.arith.division`, `math.arith.exponentiation`,
  `math.nt.divisibility`.
- **Related** (from KG): `math.arith.division`, `math.arith.addition`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.95 · **Est. hours**: 15
- **Blueprint**: `docs/curriculum/blueprints/
  math.arith.multiplication.md` (PACKAGE_READY; MAMR: MC-1
  ADDITION-CONFUSION is FOUNDATIONAL; P76_mode cross-link probe,
  cross_links=[math.linalg.matrix-multiplication (Tier 1), math.abst.
  ring-theory (Tier 1)]).
- **Aliases** (from KG): "times", "product", "repeated addition".

## Learning Objective

The learner can: compute a×b as repeated addition (a summed b times,
equivalently the total cells in an a-row-by-b-column rectangular
array); correctly execute multi-digit long multiplication via
partial products (the distributive law); state and apply
commutativity (a×b=b×a); and correctly distinguish 1's role as
multiplication's identity (a×1=a) from 0's role as multiplication's
annihilator (a×0=0), never confusing either with addition's own
identity (a+0=a).

## Core Understanding

Multiplication is repeated addition: a×b is the sum of b copies of a
(equivalently, a rows of b objects in a rectangular array = b×a total
cells). The RECTANGULAR ARRAY model grounds commutativity directly:
rotating an a-row-by-b-column array 90° gives a b-row-by-a-column
array with the identical cell count, so a×b=b×a — the physical
"grouping stories" differ (3 groups of 4 vs. 4 groups of 3) but the
total is invariant under rotation. The DISTRIBUTIVE LAW,
a×(b+c)=a×b+a×c, is the engine behind long multiplication: splitting
an array into two sub-arrays and summing their cell counts. Key
identity/annihilator roles: 1 is multiplication's IDENTITY (a×1=a, one
copy of a is a); 0 is multiplication's ANNIHILATOR (a×0=0, zero copies
of anything is nothing) — a genuinely different role from 0's identity
role in addition (a+0=a); the two operations pair 0 and 1 with
opposite roles.

## Mental Models

- **Beginner model — "× means do addition one more time, or roughly
  combine the two numbers"**: the learner has not yet distinguished
  multiplication from repeated addition at the operational level,
  sometimes computing 3×4 as 3+4=7 or as "add one more copy" rather
  than genuinely summing b copies of a. Shelf-life warning: this model
  can produce correct answers for small, memorized products (e.g. 2×2)
  by coincidence or rote memorization, delaying detection until larger
  or less-practiced products are asked.
- **Intermediate model — "multiplication is genuinely repeated
  addition, and I correctly execute long multiplication via partial
  products, but I still sometimes think a×b and b×a must differ since
  the grouping stories feel physically different"**: the learner has
  cleared the repeated-addition confusion but hasn't fully
  internalized that rotating the array preserves the total, still
  occasionally doubting commutativity when the two "groups of" framings
  feel qualitatively different. Upgrade trigger: being asked to
  physically rotate a drawn array and confirm the cell count is
  unchanged.
- **Advanced model — "multiplication is repeated addition, grounded in
  the rectangular array model, which directly explains both
  commutativity (rotation) and the distributive law (splitting into
  sub-arrays); 1 is the identity and 0 is the annihilator, roles
  opposite to addition's own 0-as-identity"**: the learner fluently
  executes multi-digit long multiplication via explicit partial
  products, correctly explains commutativity and the identity/
  annihilator distinction, and recognizes multiplication's structure
  extending to matrix multiplication and ring theory. Upgrade trigger:
  being asked to compute a matrix product entry using the identical
  scalar-multiply-then-add structure just mastered.
- **Do not upgrade early**: a learner who still confuses multiplication
  with addition (beginner model, MC-1) should not be pushed toward
  commutativity or the identity/annihilator distinction
  (intermediate/advanced models) before the repeated-addition
  structure is fully secure — MC-1 is FOUNDATIONAL per the Blueprint's
  own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure applies addition where
multiplication is required (3×4 computed as 3+4=7, or as "4 done one
more time" rather than three genuine copies of 4 summed) —
multiplication is not yet distinguished from repeated addition at the
operational level. A second failure claims a×b≠b×a because "3 groups
of 4" and "4 groups of 3" describe physically different arrangements —
correctly noticing the physical stories differ, but incorrectly
concluding the TOTALS must therefore differ, missing that rotating a
rectangular array changes its orientation, not its cell count. A third
failure over-generalizes addition's own additive identity (a+0=a) onto
multiplication, computing a×0=a instead of a×0=0, not recognizing that
zero plays an opposite (annihilating, not identity-preserving) role in
multiplication.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: ADDITION-CONFUSION (Foundational; Type 1 — overgeneralization)
**Trigger**: computes 3×4 as 7 (adds) or as "3×4 = 4+3+1" (partially
repeats then adds one more) — has not yet distinguished multiplication
from repeated addition at the operational level.
**Repair**: 3×4 means 4 added to itself exactly 3 times: 4+4+4=12 — ×
tells you HOW MANY COPIES, not "do it one more time"; the rectangular
array (3 rows of 4 cells = 12 cells) makes this a genuinely different
counting process from 3+4=7 (putting 3 and 4 together in one group).
**MAMR**: FOUNDATIONAL — a student who adds instead of multiplies
cannot meaningfully work on commutativity or identity/annihilator
rules; must clear before MC-2 or MC-3.

### MC-2: COMMUTATIVITY-FALSE (Moderate; Type 2 — perceptual intuition)
**Trigger**: claims 3×4≠4×3 because "3 groups of 4" and "4 groups of
3" are physically different arrangements — correctly perceives the
groupings differ, incorrectly concludes the totals must differ too.
**Repair**: draw a 3×4 grid (3 rows, 4 columns) = 12 cells; rotate 90°:
becomes a 4×3 grid (4 rows, 3 columns) — still 12 cells. Same physical
array, two orientations, same count: a×b=b×a.

### MC-3: ZERO-IDENTITY-CONFUSION (Moderate; Type 6 — analogy overextension)
**Trigger**: computes a×0=a instead of a×0=0 — over-extends addition's
additive identity rule (a+0=a) onto multiplication, where zero plays
the opposite (annihilating) role.
**Repair**: 0 copies of anything is nothing (a×0=0, the multiplicative
annihilator) — a genuinely different role than addition's a+0=a
(the additive identity). 1 copy of a is a (a×1=a, the multiplicative
identity) — 1 and 0 play opposite roles across the two operations.

## Analogies

**Primary — arranging chairs in rows (Blueprint's own opening
analogy)**: 4 rows with 6 chairs each — repeated addition gives
6+6+6+6=24; multiplication gives 4×6=24 as a shorthand for "4 groups of
6." The rectangular array (4 rows × 6 columns) doesn't change its
total cell count when rotated to 6 rows × 4 columns — multiplication
is fast repeated addition, and rotation-invariance is exactly
commutativity.

**Anti-analogy to retire**: "Multiplication is basically a fancier way
to add two numbers together." This directly invites MC-1 by suggesting
multiplication combines exactly two quantities the way addition does,
rather than repeating one quantity a specified number of times.

## Demonstrations

**Long-multiplication via partial products (Blueprint's own worked
example pair)**: 24×6 via distributive law (24=20+4): 6×4=24 (write 4,
carry 2), 6×2=12+2=14 (write 14) — answer 144, verified 24+24+24+
24+24+24=144. A two-digit-multiplier case, 47×23=47×(20+3): 47×3=141,
47×20=940, total 1,081.

**Commutativity via array rotation (Blueprint's own contrast pair)**:
3×4=12 and 4×3=12 (3 rows of 4 cells vs. 4 rows of 3 cells, same
array rotated 90°); 100×99=99×100=9,900.

**Identity-vs-annihilator contrast (Blueprint's own contrast pair)**:
a×1=a (1 copy of a=a, multiplicative identity); a×0=0 (0 copies of
a=nothing, multiplicative annihilator); a+0=a (adding nothing=
unchanged, additive identity) — three genuinely different roles, not
interchangeable across operations.

## Discovery Questions

Present "compute 3×7 by thinking of 3 groups of 7, then compute 7×3 by
thinking of 7 groups of 3" and ask whether the results agree before any
commutativity rule is stated — the learner discovers both give 21
directly from the two computations. Recommendation: guided discovery
for the commutativity observation (directly experiential from
computing both orderings); direct instruction for the array-rotation
justification (MC-2's repair), since the rotation argument for WHY the
totals must agree is not independently rediscoverable without being
demonstrated.

## Teaching Sequence

Per the Blueprint's own MAMR: MC-1 (addition confusion) is
FOUNDATIONAL and cleared first — a student who adds instead of
multiplies cannot meaningfully work on any later property. MC-2
(commutativity false) and MC-3 (zero-identity confusion) follow FIFO,
addressed via array rotation and the identity/annihilator contrast
respectively.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (addition confusion) | WORKED EXAMPLE: repeated-addition-vs-array-count contrast (3×4 written out as 4+4+4) | Teaching Actions: SHOW §1 |
| MC-2 active (commutativity false) | DEMONSTRATION: array-rotation contrast (3×4 grid rotated to 4×3) | Teaching Actions: SHOW §3 |
| MC-3 active (zero-identity confusion) | DEMONSTRATION: identity-vs-annihilator-vs-additive-identity three-way contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: compute a matrix product entry via row-times-column scalar multiplication and addition (Blueprint P76, cross-link) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "how many copies" rather than "combine" when
introducing a multiplication problem — naming the repeated-addition
structure explicitly is load-bearing and directly guards against MC-1.

**Wait-time**: After presenting the 3×4-vs-4×3 array-rotation
demonstration, give extended wait-time before revealing that the cell
count is unchanged — let the learner predict, then verify by counting.

**Load-bearing sentences**:
- "Multiplication means how many copies, added together — not one more
  addition."
- "Zero is the annihilator in multiplication, not the identity — that
  role belongs to addition."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
cross-link transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): compute 7×8. Pass: 56.

**Gate 2** (Blueprint Problem 2): compute 24×6. Pass: 144.

**Gate 3** (Blueprint Problem 3): compute 47×23. Pass: 1,081.

**Gate 4** (Blueprint Problem 4): verify the distributive law —
compute 5×(3+4) both as 5×7 and as 5×3+5×4, confirming agreement.
Pass: both equal 35.

**Gate 5** (Blueprint P76, cross-link probe to `math.linalg.
matrix-multiplication`): compute [3 1 2]×[4;0;5] and [5 2 1]×[3;4;2]
using scalar multiplication and addition of the terms. Pass: 22 and
25 respectively.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.95 (⌈0.95×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I keep getting confused about whether I'm
supposed to add or multiply here" — the concept-specific smaller
question: "how many copies of the number are being combined?" directly
surfaces MC-1 by forcing the learner to identify whether the task is
"put two different quantities together" (addition) or "repeat one
quantity a given number of times" (multiplication), converting a vague
operation-choice confusion into a concrete, checkable distinction.

## Memory Hooks

**Type**: procedural (long multiplication via explicit partial
products) + declarative (commutativity via array rotation; the
identity/annihilator distinction). Review form: fresh single-digit
and multi-digit product prompts, periodically paired with a "does
order matter here?" and a "what does multiplying/adding by
zero/one do?" spot-check to keep MC-2 and MC-3's guard-rails active.
Interleaving partner: `math.arith.addition` (the operation
multiplication is built from, and whose own zero-identity rule
provides the contrast for MC-3).

## Transfer Connections

**Near transfer**:
- `math.arith.division` (per KG `unlocks`; division is
  multiplication's inverse, a×b=c iff c÷b=a)
- `math.arith.exponentiation` (per KG `unlocks`; repeated
  multiplication, aⁿ=a×a×…×a, n times)

**Far transfer**:
- `math.nt.divisibility` (per KG `unlocks`; b divides a iff a=b×k for
  some integer k)
- `math.linalg.matrix-multiplication` (per KG `cross_links`, Tier 1;
  matrix product entries computed via scalar multiplication + addition,
  the row-times-column structure)
- `math.abst.ring-theory` (per KG `cross_links`, Tier 1; multiplication
  is the second binary operation in every ring, and the distributive
  law is a ring axiom)

## Cross-Subject Connections

Per KG `cross_links` [`math.linalg.matrix-multiplication`, `math.abst.
ring-theory`], both Tier 1: P76_mode is cross-link probe per the
Blueprint's own GR-9 determination. The transfer probe extends
multiplication's scalar structure directly to computing a matrix
product entry, requiring no prior matrix knowledge beyond the rule
given inline (per the Blueprint's own Teaching Notes).

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.multiplication.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A05/mastery
gate), Protocol B repair chains (B01 through B03), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.addition`) and three unlocks (`math.arith.division`,
`math.arith.exponentiation`, `math.nt.divisibility`) match the
Blueprint's own Component 7 exactly. Its high estimated hours (15, the
highest in `math.arith` so far) is appropriate given the concept's
genuine breadth (repeated-addition foundation, times-table fluency,
long multiplication, commutativity, identity/annihilator rules) under
one KG node.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
