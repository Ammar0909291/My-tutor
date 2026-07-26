# Column Addition — `math.arith.column-addition`

## Identity

- **Concept ID**: `math.arith.column-addition` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.addition` (no children in KG)
- **Prerequisites**: `math.arith.carrying` (the regrouping mechanic
  this written algorithm relies on for column sums ≥ 10).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.addition`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.95 · **Est. hours**: 3
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.column-addition.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "vertical addition", "standard addition
  algorithm".

## Learning Objective

The learner can: correctly write two (or more) multi-digit addends
right-aligned by place value before adding, regardless of differing
digit counts; correctly process columns from RIGHT to LEFT (ones
first, then tens, then hundreds, …), never the reverse; and correctly
treat a "missing" digit in a shorter number as an implicit zero,
rather than misaligning or omitting it.

## Core Understanding

Column addition is the standard WRITTEN LAYOUT and PROCEDURE for
adding multi-digit numbers: write the addends stacked so that digits
of the SAME place value line up in the same column (ones under ones,
tens under tens, …) — this alignment, not merely writing the numbers
one above the other, is what makes column-by-column addition valid.
Processing proceeds from RIGHT to LEFT — starting at the ones column
and moving leftward — because a carry generated in one column must
flow into the NEXT column to its left, and this order ensures every
carry is available before its destination column is processed. When
one addend has fewer digits than another (e.g., 47+238), the shorter
number's "missing" higher-place-value digits are implicitly ZERO —
47 aligns as 047 against 238, not shifted left to occupy the wrong
columns.

## Mental Models

- **Beginner model — "just write the numbers one above the other and
  add"**: the learner stacks the addends without deliberately
  right-aligning them by place value, sometimes left-aligning
  (matching the way text is normally written), causing digits of
  different place values to be summed together. Shelf-life warning:
  this model produces correct results whenever both addends happen to
  have the same number of digits, delaying detection until addends of
  different lengths are combined.
- **Intermediate model — "I correctly right-align addends of different
  lengths, but I sometimes start adding from the left column instead
  of the right"**: the learner has the alignment step secure but
  processes columns in the wrong order, disrupting carry propagation
  (a carry generated on the left has nowhere correct to go, since the
  columns to its right have already been processed). Upgrade trigger:
  being asked to add two numbers that require a carry and explicitly
  justify why the ones column must be computed first.
- **Advanced model — "addends are right-aligned by place value with
  missing digits treated as zero, columns are processed right to
  left so every carry is available before its destination column,
  and I can reliably apply this to addends of any differing lengths"**:
  the learner fluently sets up and executes column addition for
  addends of arbitrary length and digit-count difference. Upgrade
  trigger: being asked to add three or more addends of varying lengths
  in a single column-addition setup.
- **Do not upgrade early**: a learner who still misaligns addends of
  different lengths (beginner model, MC-1) should not be pushed toward
  processing-direction or missing-digit handling (intermediate/
  advanced models) before the right-alignment setup is fully secure —
  MC-1 is FOUNDATIONAL, since an incorrect setup guarantees an
  incorrect result regardless of how carefully the addition itself is
  executed.

## Why Students Fail

The dominant, FOUNDATIONAL failure fails to right-align addends of
different lengths by place value — writing 47 and 238 left-aligned
(matching how text is normally written left to right) rather than
right-aligned, causing the 4 (tens digit of 47) to be summed with the
2 (hundreds digit of 238), a genuine place-value mismatch. A second
failure processes columns from LEFT to right instead of right to
left, disrupting carry propagation — a carry generated while
processing a left column has no correctly-processed column to its
right waiting to receive it, since right-to-left order is precisely
what makes carries flow to their correct destination. A third failure,
when one addend has fewer digits than another, either omits a column
entirely or misaligns the shorter number's digits, rather than
treating every "missing" higher digit as an implicit zero.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: COLUMN-MISALIGNMENT (Foundational; Type 4 — notation-induced)
**Description**: Learner writes multi-digit addends of different
lengths left-aligned (as text is normally written) rather than
right-aligned by place value, causing digits of different place
values to be summed together in the same column.
**Trigger condition**: adding two numbers with a different number of
digits (e.g., 47+238).
**Repair target**: always align addends by their ONES digit (the
rightmost column), never by their leftmost digit — 47 and 238 align
as:
```
  047
+ 238
```
with the 4 correctly falling in the tens column, not the hundreds
column.
**MAMR**: FOUNDATIONAL — an incorrect setup guarantees an incorrect
result no matter how carefully the addition itself is executed; must
clear before MC-2 or MC-3.

### MC-2: DIRECTION-REVERSED (Moderate; Type 5 — instruction-induced)
**Description**: Learner begins processing columns from the LEFT
(highest place value) rather than the RIGHT (ones place) — natural
left-to-right reading direction conflicts with the algorithm's
required right-to-left processing order.
**Trigger condition**: any multi-digit column addition requiring at
least one carry.
**Repair target**: state explicitly and consistently — column
addition ALWAYS starts at the ones column (rightmost) and proceeds
leftward, because a carry generated in one column must be available
to add into the NEXT column before that column is processed; starting
from the left leaves no correct place for a later-generated carry to
go.

### MC-3: MISSING-DIGIT-MISHANDLED (Moderate; Type 1 — overgeneralization)
**Description**: When one addend has fewer digits than another,
learner either omits a column entirely or misaligns the shorter
number's digits, rather than treating every missing higher-place-value
digit as an implicit zero.
**Trigger condition**: adding numbers with substantially different
digit counts (e.g., 6+1,234).
**Repair target**: explicitly pad the shorter number with leading
zeros to match the longer number's length before aligning — 6 becomes
0006 when added to 1,234, making every column's addition explicit
(0+1, 0+2, 0+3, 6+4).

## Analogies

**Primary — lining up coins by denomination (a place-value alignment
framing)**: sorting and stacking coins requires grouping ones with
ones, tens with tens, hundreds with hundreds — mixing a ten-coin into
the ones-coin stack would miscount the total. Column addition's
right-alignment rule does exactly this: each column is reserved for
one specific place value, and only digits of that SAME place value may
occupy it.

**Anti-analogy to retire**: "Just line the numbers up like you'd
naturally write them, left to right." This directly invites MC-1 by
suggesting ordinary left-to-right writing conventions apply to
column-addition alignment, when place-value alignment actually
requires right-alignment instead.

## Demonstrations

**Right-alignment contrast (targets MC-1)**: 47+238 written correctly
right-aligned (047 under 238, so 4 falls in the tens column, 2 falls
in the hundreds column) versus incorrectly left-aligned (47 shifted to
occupy the hundreds/tens columns, misaligning entirely with 238's
columns) — only the right-aligned version produces the correct sum,
285.

**Direction demonstration (targets MC-2)**: 58+74 processed correctly
right-to-left (ones: 8+4=12, write 2, carry 1; tens: 5+7+1=13, write
13) versus attempted left-to-right (tens: 5+7=12 processed first, with
no way to incorporate the ones-column carry that hasn't been computed
yet) — the right-to-left order is what makes carry propagation
possible at all.

**Missing-digit padding (targets MC-3)**: 6+1,234 explicitly padded as
0006+1234 — every column has a defined addition (0+1=1, 0+2=2, 0+3=3,
6+4=10, write 0 carry 1, then the padded 0+0+1=1) — giving 1,240.

## Discovery Questions

Present 47+238 written left-aligned (as ordinary text) and ask the
learner to add column by column before the alignment rule is stated —
the learner discovers the columns don't correspond to matching place
values, producing an obviously wrong result, directly motivating the
right-alignment rule from a concrete, self-checkable failure.
Recommendation: guided discovery for the right-alignment necessity
(directly experiential from the left-aligned failure); direct
instruction for the right-to-left processing order (MC-2's repair),
since the carry-propagation justification for this specific order is
not independently rediscoverable without being demonstrated.

## Teaching Sequence

MC-1 (column misalignment) is addressed first, since correct
right-alignment is the foundational setup step every later addition
depends on. MC-2 (direction reversed) is addressed second, establishing
the correct right-to-left processing order essential for carry
propagation. MC-3 (missing digit mishandled) is addressed last, as a
refinement handling the specific case of addends with differing
lengths.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (column misalignment) | DEMONSTRATION: right-aligned-vs-left-aligned contrast (47+238) | Teaching Actions: SHOW §3 |
| MC-2 active (direction reversed) | DEMONSTRATION: right-to-left carry-propagation necessity (58+74) | Teaching Actions: SHOW §3 |
| MC-3 active (missing digit mishandled) | WORKED EXAMPLE: explicit zero-padding for differing addend lengths (6+1,234) | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: set up and add three addends of substantially different lengths in one column-addition problem | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "line up by place value, starting from the ones
column" as the default setup instruction — naming both the alignment
basis and the starting column is load-bearing and directly guards
against MC-1 and MC-2 together.

**Wait-time**: After presenting 47+238 left-aligned, give extended
wait-time before revealing why the result is wrong — let the learner
attempt the column-by-column addition and notice the mismatch
themselves.

**Load-bearing sentences**:
- "Line up the ones digits first — everything else follows from
  there."
- "Always start at the rightmost column and work left."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Set up 6+123 for column addition, showing the correct alignment. Pass:
006 aligned under 123, ones under ones.

### Gate 2 (MC-2 check)
Explain why column addition must start at the ones column rather than
the leftmost column. Pass: correctly explains that a carry generated
in one column must be available before its destination column
(the next one to the left) is processed.

### Gate 3 (MC-3 check)
Add 8+2,945 using column addition, explicitly padding the shorter
number. Pass: 0008 aligned under 2945, giving 2,953.

### Gate 4 (application)
Compute 356+29 using column addition, showing all carries. Pass: 385,
with the setup and carry correctly shown.

### Transfer probe (independence mode — no cross_links)
Set up and compute 7+64+938 (three addends of different lengths) using
column addition. Pass: correctly right-aligns all three addends
(padding 7 to 007 and 64 to 064), processes right to left, and arrives
at 1,009.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.95.

## Tutor Recovery Strategy

Likeliest utterance: "I lined up my numbers the way I normally write
them, but my answer keeps coming out wrong" — the concept-specific
smaller question: "are the ones digits of both numbers in the same
column?" directly surfaces MC-1 by pointing the learner at the
specific alignment check that resolves the setup error, rather than
the addition steps themselves.

## Memory Hooks

**Type**: procedural (right-aligning addends by place value; processing
columns right to left; padding shorter addends with implicit zeros).
Review form: fresh multi-digit addition setups with varying digit-count
differences between addends, periodically paired with a "which
direction do we process?" spot-check to keep MC-2's guard-rail active.
Interleaving partner: `math.arith.carrying` (the regrouping mechanic
this written algorithm depends on for column sums reaching 10 or
more).

## Transfer Connections

**Near transfer**:
- `math.arith.addition` (per KG `related`; column addition is the
  standard written procedure for computing sums that concept defines
  conceptually)

**Far transfer**:
- Column subtraction (via `math.arith.borrowing`) reuses the identical
  right-to-left, place-value-aligned setup discipline
- Long multiplication and long division both build on the same
  column-alignment convention established here

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.
column-addition.md` (verified via directory listing before authoring
this entry). All misconceptions, demonstrations, and assessment items
above are authored directly for this Educational Brain entry, not
sourced from a Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.carrying`) and empty `unlocks`/`cross_links` are
consistent with its narrow, procedural, terminal-leaf role in the
domain. Noted honestly: this concept's misconceptions are deliberately
scoped to the WRITTEN-LAYOUT and PROCESSING-ORDER setup (alignment,
direction, missing digits) rather than re-deriving carrying's own
regrouping mechanics, already covered by `math.arith.carrying`'s own
registry — avoiding duplication of that concept's scope.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 6 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
