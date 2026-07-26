# Carrying (Regrouping) — `math.arith.carrying`

## Identity

- **Concept ID**: `math.arith.carrying` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.addition` (no children in KG)
- **Prerequisites**: `math.arith.addition` (the operation carrying is
  a mechanical step within), `math.arith.ones-tens-hundreds` (the
  concrete first-three-positions grouping carrying regroups between).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.borrowing`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.9 · **Est. hours**: 4
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.carrying.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "regrouping", "carrying over".

## Learning Objective

The learner can: identify, within a specific column of a multi-digit
addition, exactly which digit is "carried" and which digit remains
when that column's sum reaches 10 or more; correctly propagate a carry
through a CHAIN of consecutive columns (including columns whose own
sum, before the incoming carry, is itself 9); and correctly add a
carried digit into the immediately adjacent column, never a column
further away.

## Core Understanding

`math.arith.addition` and `math.arith.ones-tens-hundreds` already
establish WHY carrying is necessary (ten ones genuinely regroup into
one ten) and roughly HOW it works. This concept is the dedicated
procedural-execution skill: given a column sum of, say, 17, the digit
that STAYS in the current column is the ONES digit of that sum (7),
and the digit that CARRIES is the TENS digit of that sum (1) — never
the reverse. When several consecutive columns each individually sum to
9 and a carry arrives from the right, the carry must PROPAGATE through
every one of those 9-columns in turn (each becoming 10, carrying
further left) until it reaches a column that doesn't sum to exactly 9.
A carried digit is always added into the column IMMEDIATELY to the
left of where it was generated — never skipped ahead to a column
further away.

## Mental Models

- **Beginner model — "when a column sum is a two-digit number, I write
  down the whole thing or just pick a digit that seems right"**: the
  learner has not yet fixed a reliable rule for which digit of a
  two-digit column sum stays and which carries, sometimes carrying the
  ones digit instead of the tens digit. Shelf-life warning: this model
  can produce correct answers by chance on symmetric sums (e.g., 11,
  which "looks the same" carried either way in terms of digit value,
  though the position is still wrong), delaying detection.
- **Intermediate model — "I correctly identify which digit carries and
  which stays for a single carry, and I add the carry into the next
  column over, but I sometimes lose track when several 9-columns in a
  row all need to carry"**: the learner has the single-carry mechanics
  secure but hasn't practiced chains of cascading carries, sometimes
  stopping the propagation early. Upgrade trigger: being asked to
  add a number to 999 (or another all-9s number) and trace every
  carry explicitly.
- **Advanced model — "the tens digit of a column sum is always what
  carries, the ones digit always stays, the carry always lands in the
  immediately adjacent column, and this propagates through as many
  consecutive columns as needed"**: the learner fluently executes
  multi-column addition with any number of cascading carries,
  including through several consecutive 9s. Upgrade trigger: being
  asked to predict, before computing, how many total carries a
  specific multi-digit addition will require.
- **Do not upgrade early**: a learner who still miscomputes which
  digit of a column sum carries (beginner model, MC-1) should not be
  pushed toward carry-chain propagation (intermediate/advanced models)
  before the single-carry mechanics are fully secure — MC-1 is
  FOUNDATIONAL, since every later skill in this concept depends on
  correctly identifying carry vs. stay digits.

## Why Students Fail

The dominant, FOUNDATIONAL failure confuses which digit of a two-digit
column sum carries and which stays — given a column sum of 14, writing
down the 1 (which should carry) instead of the 4 (which should stay),
or vice versa, since a two-digit sum doesn't visually signal which part
plays which role. A second failure breaks down when several
consecutive columns each individually sum to 9 (or would sum to 9
before an incoming carry) — the carry is correctly generated for the
first such column but the propagation stops there, since practice
typically emphasizes single, isolated carries rather than chains. A
third failure correctly identifies that a carry is needed but adds it
into the wrong column — skipping ahead by more than one position,
particularly in longer numbers where column alignment is easy to lose
track of.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: CARRY-VALUE-CONFUSED-WITH-COLUMN-SUM (Foundational; Type 4 — notation-induced)
**Description**: Learner confuses which digit of a two-digit column sum
carries and which stays — given a column sum of 14, writing the 1
(the carry) in the current column instead of the 4 (which should
stay), or writing 4 in the next column instead of carrying the 1 —
the two-digit sum's visual form doesn't distinguish which part is
which.
**Trigger condition**: any column sum reaching 10 or more, especially
when the ones-digit-of-the-sum and the tens-digit-of-the-sum are both
plausible-looking single digits.
**Repair target**: state the rule explicitly and consistently — the
ONES digit of the column sum always STAYS in the current column; the
TENS digit of the column sum always CARRIES to the next column. For a
sum of 14: the 4 stays, the 1 carries — never the reverse.
**MAMR**: FOUNDATIONAL — every later carrying skill (chain
propagation, correct column placement) depends on first correctly
splitting the column sum into its "stays" and "carries" parts.

### MC-2: CARRY-CHAIN-BROKEN (Moderate; Type 5 — instruction-induced)
**Description**: When several consecutive columns each sum to 9 (or
would, before an incoming carry) and a carry arrives from the right,
learner correctly processes the first such column but fails to
propagate the resulting new carry through the remaining 9-columns —
typical practice emphasizes single, isolated carries, leaving
cascading multi-column chains under-practiced.
**Trigger condition**: adding a number to 999 (or any number with
several consecutive 9s) where a single incoming carry must cascade
through multiple columns.
**Repair target**: process one column at a time, always checking
whether THIS column's own sum (including any newly-arrived carry) now
also reaches 10 — treat each column's carry-check as a fresh,
independent question, repeated as many times as needed until a column
doesn't produce a new carry.

### MC-3: CARRY-ADDED-TO-WRONG-COLUMN (Moderate; Type 4 — notation-induced)
**Description**: Learner correctly identifies that a carry is needed
but adds it into a column other than the immediately adjacent one
(e.g., skipping two columns to the left instead of one) — column
misalignment in longer multi-digit numbers makes it easy to lose track
of exactly which column comes "next."
**Trigger condition**: multi-digit addition problems with 4 or more
digits, where column alignment requires careful tracking.
**Repair target**: explicitly label or point to the column immediately
to the left of the one generating the carry before writing anything —
a carry NEVER skips a column, it always lands in the very next one
over.

## Analogies

**Primary — passing a full box of ten to the next shelf (extending the
Blueprint-family coin-bag analogy from `math.arith.
ones-tens-hundreds`)**: imagine sorting loose items into boxes of ten.
When a shelf accumulates 10 or more loose items, exactly one full box
of ten is passed up to the NEXT shelf (never skipped further), and
only the leftover loose items (fewer than ten) stay on the current
shelf. If the next shelf ALSO now has 10 or more boxes after receiving
this one, it passes ITS OWN full ten-of-boxes up again — one shelf at a
time, never skipping ahead.

**Anti-analogy to retire**: "When a column adds up to two digits, just
write the whole two-digit number down and carry on." This directly
invites MC-1 by failing to specify which single digit of the sum stays
and which single digit carries.

## Demonstrations

**Single-carry mechanics (targets MC-1)**: column sum 17 — the 7
(ones digit of 17) stays in the current column; the 1 (tens digit of
17) carries to the next column. Contrast with a wrongly-swapped
version (writing 1 in the current column, carrying 7) to make the
correct split explicit and checkable.

**Carry-chain propagation (targets MC-2)**: adding 1 to 999 — ones
column: 9+1=10, write 0, carry 1; tens column: 9+1(carried)=10, write
0, carry 1 AGAIN; hundreds column: 9+1(carried)=10, write 0, carry 1
once more; a new thousands column receives this final carry: 0+1=1.
Result: 1000 — three consecutive carries in a row, each processed as
its own fresh check.

**Column-placement check (targets MC-3)**: in a 4-digit addition like
2,847+1,963, explicitly point to each column in turn (ones, tens,
hundreds, thousands) before writing any carry, confirming the carry
from one column always lands in the column drawn directly to its
left.

## Discovery Questions

Present "add 1 to 999" and ask the learner to predict, before
computing, how many times they think they'll need to carry — the
learner discovers the answer requires three consecutive carries (one
per digit), directly motivating the "process one column at a time,
re-check every time" discipline from a concrete, surprising case.
Recommendation: guided discovery for the carry-chain-length prediction
(directly experiential from working through 999+1 column by column);
direct instruction for the stays-vs-carries digit-splitting rule
(MC-1's repair), since this specific convention (ones digit stays,
tens digit carries) is not independently rediscoverable without being
stated.

## Teaching Sequence

MC-1 (carry value confused with column sum) is addressed first, since
correctly splitting a column sum into its "stays" and "carries" parts
is the foundational mechanical skill every later step depends on. MC-3
(carry added to wrong column) is addressed second, establishing correct
column placement for a single carry. MC-2 (carry chain broken) is
addressed last, as the most complex skill, requiring the first two to
already be secure before chaining them across multiple columns.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (carry value confused with column sum) | WORKED EXAMPLE: single-carry digit-splitting demonstration (17 → stays 7, carries 1) | Teaching Actions: SHOW §1 |
| MC-3 active (carry added to wrong column) | DEMONSTRATION: explicit column-pointing check in a 4-digit addition | Teaching Actions: SHOW §3 |
| MC-2 active (carry chain broken) | WORKED EXAMPLE: 999+1 three-consecutive-carries walkthrough | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: predict the number of carries required for a given multi-digit addition before computing | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the ones digit stays, the tens digit carries" as a
fixed, repeatable formula whenever a column sum reaches double digits —
naming both halves of the split every time is load-bearing and
directly guards against MC-1.

**Wait-time**: After presenting 999+1, give extended wait-time before
revealing the full three-carry chain — let the learner work through
each column and discover the cascading pattern themselves.

**Load-bearing sentences**:
- "The tens digit of the column sum carries; the ones digit stays —
  never the other way around."
- "A carry always lands in the very next column over, never further."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
A column sums to 16. Which digit stays in the current column, and
which carries? Pass: 6 stays, 1 carries.

### Gate 2 (MC-3 check)
In the addition 3,458+2,779, after computing the ones column, which
column does the resulting carry get added into? Pass: the tens column
(the immediately adjacent column, not skipped).

### Gate 3 (MC-2 check)
Compute 9,999+1, showing every carry explicitly. Pass: 10,000, with
four consecutive carries shown (ones, tens, hundreds, thousands each
individually carrying).

### Gate 4 (application)
Compute 5,748+2,376, showing all carries. Pass: 8,124, with correct
carry placement at each necessary column.

### Transfer probe (independence mode — no cross_links)
Before computing, predict how many carries the addition 6,999+3,005
will require, and explain your reasoning; then compute it and check
your prediction. Pass: correctly predicts based on inspecting which
columns' sums (before carries) are 9 or would reach 10, then verifies
via the actual computation.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.9.

## Tutor Recovery Strategy

Likeliest utterance: "I know I need to carry something here, but I
can't remember which number is supposed to carry and which stays" —
the concept-specific smaller question: "if the column sum is a
two-digit number, which digit is in the ones place of THAT sum?"
directly supplies the disambiguating rule (the ones digit of the sum
always stays; the tens digit always carries) as an on-demand,
mechanical check applicable to any future column sum.

## Memory Hooks

**Type**: procedural (splitting a column sum into stays/carries
digits; propagating a carry through a chain of columns; placing a
carry in the correct adjacent column). Review form: fresh multi-digit
addition prompts with varying carry-chain lengths, periodically
including an all-9s case to keep MC-2's guard-rail active.
Interleaving partner: `math.arith.addition` (the operation this
concept's procedural step is embedded within).

## Transfer Connections

**Near transfer**:
- `math.arith.borrowing` (per KG `related`; the inverse regrouping
  operation, one ten decomposing back into ten ones during
  subtraction)

**Far transfer**:
- Long multiplication and long division both reuse carrying's
  column-by-column regrouping discipline
- Any positional-system arithmetic in a non-base-10 system
  (per `math.arith.number-base`) generalizes this identical carrying
  mechanism to a different base

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.carrying.md`
(verified via directory listing before authoring this entry). All
misconceptions, demonstrations, and assessment items above are
authored directly for this Educational Brain entry, not sourced from a
Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.arith.addition`, `math.arith.ones-tens-hundreds`) and empty
`unlocks`/`cross_links` are consistent with its narrow, procedural,
terminal-leaf role in the domain. Noted honestly: this concept's
misconceptions are deliberately scoped to carrying MECHANICS (which
digit carries, chain propagation, column placement) rather than
re-deriving why carrying is necessary in the first place, which
`math.arith.addition`'s own MC-1 and `math.arith.
ones-tens-hundreds`'s own MC-3 already cover — avoiding duplication of
those concepts' conceptual-justification content.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
