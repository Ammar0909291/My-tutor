# Ones, Tens, Hundreds — `math.arith.ones-tens-hundreds`

## Identity

- **Concept ID**: `math.arith.ones-tens-hundreds` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.place-value` (no children in KG)
- **Prerequisites**: `math.arith.place-value` (the general positional
  system, of which ones/tens/hundreds are the first three concrete
  positions).
- **Unlocks**: `math.arith.carrying`, `math.arith.borrowing` (per the
  live KG — see Curriculum Feedback for a Blueprint/KG discrepancy
  noted honestly below).
- **Related** (from KG): `math.arith.expanded-form`.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.9 · **Est. hours**: 4 (KG value; Blueprint metadata
  independently states 3 — see Curriculum Feedback)
- **Blueprint**: `docs/curriculum/blueprints/
  math.arith.ones-tens-hundreds.md` (MAMR: MC-1
  ONES-TENS-HUNDREDS-ASSUMED-SEPARATE-CONCEPTS is FOUNDATIONAL;
  P76_mode independence, cross_links=[] per Blueprint).
- **Aliases** (from KG): "units, tens, hundreds", "positional
  grouping".

## Learning Objective

The learner can: identify the ones, tens, and hundreds columns as the
first three positions of `math.arith.place-value`'s general positional
system, representing 10⁰=1, 10¹=10, and 10²=100 respectively;
decompose a 3-digit number into its ones/tens/hundreds parts and
conversely reconstruct a number from given column counts, including
when a column's count is zero; and recognize, at an orientation level,
that carrying in addition is a direct consequence of ten ones
genuinely regrouping into one ten — the same base-10 grouping fact
this concept's columns are built on.

## Core Understanding

Ones, tens, and hundreds are not three separate ideas to learn
independently — they are simply the first three concrete instances of
the single general positional pattern `math.arith.place-value` already
established: the rightmost position is 10⁰=1 (ones), the next is
10¹=10 (tens), the next is 10²=100 (hundreds), continuing to thousands
(10³) and beyond. A number decomposes into (and reconstructs from) its
column counts: 347 means exactly 3 hundreds, 4 tens, and 7 ones,
written 347 = 3×100 + 4×10 + 7×1 = 300+40+7 — and this works in
reverse too, "2 hundreds, 5 tens, 9 ones" reconstructs to 259. Every
column's count must be explicitly accounted for, EVEN WHEN IT IS ZERO —
"6 hundreds, 0 tens, 9 ones" reconstructs to 609, not 69; omitting the
zero-tens column silently changes the number. At an orientation level,
carrying previews this same structure: when adding digits in the ones
column produces 10 or more (8+7=15), those 15 ones regroup into 1 ten
and 5 ones, since exactly ten ones make one ten — the 1 ten "carries"
into the tens column, and the identical regrouping principle applies
when the tens column itself reaches 10 or more.

## Mental Models

- **Beginner model — "ones, tens, and hundreds are three separate
  things I have to learn about, each with its own rules"**: the
  learner treats each column as an independent topic rather than
  recognizing all three as the same positional pattern applied at
  different scales. Shelf-life warning: this model can coexist with
  correctly reading individual numbers, since fluency with one column
  at a time doesn't require recognizing the underlying unity.
- **Intermediate model — "I understand ones/tens/hundreds are one
  pattern, and I can decompose and reconstruct numbers correctly, but I
  sometimes drop a zero-count column when reconstructing"**: the
  learner correctly unifies the three positions conceptually but
  treats a zero-valued column as safely omittable, missing that its
  PRESENCE (not its numeric contribution) is what confirms every other
  digit's column assignment. Upgrade trigger: being asked to
  reconstruct a number with an internal zero column and explain why
  omitting it produces a genuinely different number.
- **Advanced model — "carrying between ones/tens/hundreds is not an
  arbitrary rule — it is the direct, necessary consequence of ten ones
  genuinely equaling one ten, the very grouping fact the whole
  positional system is built on"**: the learner explains why a
  column sum of 10 or more MUST regroup into the next column, using
  the base-10 grouping fact itself as the justification, not a
  memorized procedural step. Upgrade trigger: being asked to predict,
  before computing, how many total carries a specific multi-digit
  addition will require, based on inspecting which column sums reach
  10 or more.
- **Do not upgrade early**: a learner who still treats ones/tens/
  hundreds as three separate topics (beginner model, MC-1) should not
  be pushed toward the carrying-as-regrouping insight (advanced model,
  MC-3) before the unified positional pattern is fully secure — MC-1 is
  FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats ones, tens, and hundreds as
three separate, unrelated concepts requiring independent understanding,
missing that they are simply the first three instances of the single
general place-value pattern already established in `math.arith.
place-value`. A second failure believes a column with a count of zero
can be safely left out when reconstructing a number from its column
counts, not recognizing that omitting a zero column changes the
number's actual value — "6 hundreds, 0 tens, 9 ones" is 609, not the
incorrectly-abbreviated 69. A third, orientation-level failure treats
carrying in addition as an arbitrary procedural rule to memorize,
missing that it is the direct, necessary consequence of ten ones
genuinely equaling one ten — the identical base-10 grouping fact the
ones/tens/hundreds columns themselves are built on.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: ONES-TENS-HUNDREDS-ASSUMED-SEPARATE-CONCEPTS (Foundational; Type 1 — overgeneralization)
**Trigger**: asked whether ones, tens, and hundreds are three separate,
unrelated concepts each requiring its own independent understanding,
learner answers yes — over-generalizing from being taught the three
column NAMES in sequence to believing they are three distinct topics
rather than one repeated pattern.
**Repair**: re-walk the column-identification example — the digit in
256's ones place (6×10⁰=6), tens place (5×10¹=50), and hundreds place
(2×10²=200) are simply the same positional-value computation applied
at the first three positions, the identical pattern that continues to
thousands and beyond.
**MAMR**: FOUNDATIONAL — every arithmetic operation on multi-digit
numbers depends on recognizing ones/tens/hundreds as one unified
pattern; must clear before MC-2 or MC-3.

### MC-2: ZERO-COLUMN-ASSUMED-OMITTABLE (High; Type 1 — overgeneralization)
**Trigger**: reconstructing "6 hundreds, 0 tens, 9 ones," learner
omits the zero-tens column and writes 69 instead of 609 —
over-generalizing from everyday number sense where zero often "adds
nothing," to internal zero columns, which instead HOLD a position.
**Repair**: re-walk the 609-versus-69 contrast directly — every
column's count, including zero, determines the number's actual value;
omitting a zero column collapses every digit to its left one position.

### MC-3: CARRYING-ASSUMED-ARBITRARY-RULE (Moderate; Type 5 — instruction-induced)
**Trigger**: asked whether carrying in addition is an arbitrary
procedural rule disconnected from what the columns represent, learner
answers yes — carrying is often taught as a memorized step ("write the
one, carry the one") before the underlying regrouping fact is made
explicit.
**Repair**: re-walk the 28+17 regrouping demonstration — 8+7=15 ones,
which genuinely regroups into 1 ten + 5 ones because ten ones make one
ten by the base-10 structure itself; the carry is a direct consequence
of this fact, not an arbitrary rule.

## Analogies

**Primary — the coin-bag exchange (Blueprint's own shopkeeper
scenario)**: a shopkeeper has 4 bags of 100 coins, 6 bags of 10 coins,
and 8 loose coins — the total is directly the 3-digit number 468,
reading hundreds/tens/ones straight off the bag counts. If instead the
shopkeeper had 4 bags of 100, ZERO bags of 10, and 8 loose coins, the
total is 408 — not "48," since the zero bags-of-10 still occupy the
tens position and must be accounted for.

**Anti-analogy to retire**: "Ones, tens, and hundreds are three
different kinds of numbers to learn." This directly invites MC-1 by
framing the three positions as distinct topics rather than one
positional pattern applied at three scales.

## Demonstrations

**Column-identification contrast (Blueprint's own Example 1, targets
MC-1)**: for 256, the digit 6 is in the ones place (6×10⁰=6), 5 is in
the tens place (5×10¹=50), 2 is in the hundreds place (2×10²=200) —
the same "digit × position's power of 10" computation for all three,
not three separate rules.

**Zero-column contrast (Blueprint's own Example 2, targets MC-2)**:
"6 hundreds, 0 tens, 9 ones" reconstructs to 6×100+0×10+9×1=609;
omitting the zero and writing "69" gives an entirely different,
incorrect number.

**Regrouping demonstration (Blueprint's own Example 3, targets MC-3)**:
28+17 — ones column 8+7=15, which is more than 9 ones, so it regroups:
15 ones = 1 ten + 5 ones. Write the 5 ones, carry the 1 ten into the
tens column: 2+1+1=4 tens + 5 ones = 45.

## Discovery Questions

Present the reconstruction task "6 hundreds, 0 tens, 9 ones" and ask
the learner to write the number before any rule about zero columns is
stated — the learner discovers, by attempting to write "69" and then
checking it against 6×100+0×10+9×1, that the two don't match, directly
motivating the zero-placeholder rule. Recommendation: guided discovery
for the zero-column observation (directly experiential from the
mismatch); direct instruction for the carrying-as-regrouping
justification (MC-3's repair), since the base-10 grouping argument is
not independently rediscoverable without being demonstrated.

## Teaching Sequence

MC-1 (ones/tens/hundreds assumed separate) is addressed first, since
recognizing the unified positional pattern is the conceptual
foundation both the decomposition/reconstruction skill (LO2) and the
carrying preview (LO3) depend on. MC-2 (zero column omittable) is
addressed second, via the direct 609-vs-69 numerical contrast. MC-3
(carrying assumed arbitrary) is addressed last, as an orientation-level
preview rather than the concept's core scope.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (ones/tens/hundreds assumed separate) | WORKED EXAMPLE: unified column-identification demonstration (256's three digits) | Teaching Actions: SHOW §1 |
| MC-2 active (zero column omittable) | DEMONSTRATION: 609-vs-69 zero-column contrast | Teaching Actions: SHOW §3 |
| MC-3 active (carrying assumed arbitrary) | DEMONSTRATION: 28+17 explicit regrouping demonstration | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: shopkeeper's coin-bag scenario with a zero-count column and a regrouping addition (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the first three positions of one pattern" rather
than "ones, tens, and hundreds" as if naming three separate topics —
the unifying frame is load-bearing and directly guards against MC-1.

**Wait-time**: After presenting the zero-column reconstruction task
("6 hundreds, 0 tens, 9 ones"), give extended wait-time before
revealing the correct answer — let the learner attempt to write the
number and discover the mismatch themselves.

**Load-bearing sentences**:
- "Ones, tens, and hundreds are just the first three positions of the
  same pattern — not three separate ideas."
- "Every column counts, even a column with zero in it."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): identify the ones, tens, and hundreds
digits of 739 and state each one's positional value. Pass: 9→9,
3→30, 7→700.

**Gate 2** (Blueprint Problem 2): decompose 508 into hundreds/tens/ones
parts, handling the zero carefully. Pass: 5×100+0×10+8×1.

**Gate 3** (Blueprint Problem 3): reconstruct "3 hundreds, 0 tens, 4
ones" and explain why the zero cannot be omitted. Pass: 304, with a
correct explanation.

**Gate 4** (Blueprint Problem 4): add 36+29 using explicit regrouping,
showing the carry. Pass: 65, with the carry step shown.

**Gate 5** (Blueprint P76, independence transfer probe): the
shopkeeper's coin-bag scenario — total from 4 bags of 100, 6 bags of
10, 8 loose coins (a); explain why a zero-bags-of-10 variant isn't "48"
(b); explain the regrouping effect of adding 7 more loose coins to the
original count (c). Pass: correct total (468), correct zero-column
explanation, correct regrouping explanation.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.9 (⌈0.9×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I wrote '6 hundreds, 0 tens, 9 ones' as 69, but
that's not right?" — the concept-specific smaller question: "how many
hundreds does 69 have?" directly surfaces the mismatch (69 has zero
hundreds, but the intended number has 6), converting an abstract rule
about zero-columns into a concrete, self-checkable discrepancy the
learner can verify themselves.

## Memory Hooks

**Type**: procedural (decomposing and reconstructing numbers from
column counts, including zero columns) + declarative (the unified
ones/tens/hundreds-as-one-pattern insight; the carrying-as-regrouping
fact). Review form: fresh decomposition/reconstruction prompts
periodically including a zero-count column, paired with an occasional
regrouping-addition spot-check to keep MC-3's guard-rail active.
Interleaving partner: `math.arith.place-value` (the general system
this concept's first three positions instantiate).

## Transfer Connections

**Near transfer**:
- `math.arith.carrying` (per KG `unlocks`; the orientation-level
  regrouping preview here becomes the full carrying procedure there)
- `math.arith.borrowing` (per KG `unlocks`; borrowing is the inverse
  regrouping operation, one ten decomposing back into ten ones)

**Far transfer**:
- `math.arith.expanded-form` (per KG `related`; expanded form
  generalizes this concept's decomposition to any number of digits)
- `math.arith.addition` (the full column-addition procedure this
  concept's carrying preview directly anticipates)

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept, consistent with the Blueprint's own Component 7. Not
fabricated beyond what the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/
math.arith.ones-tens-hundreds.md` (all structural/grammar/content/AIR
checks PASS).

Full Teaching Actions (A01 through A04/mastery gate) and Protocol B
repair actions (B01 through B03) reused by reference above and not
restated in full; the Misconception Registry (MC-1 through MC-3) and
the P77/P76 mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

Two genuine Blueprint/KG discrepancies found, recorded honestly, not
fixed (no KG or Blueprint file modified this batch): (1) the live KG
lists `unlocks: [math.arith.carrying, math.arith.borrowing]` for this
concept, while the Blueprint's own Component 0 metadata table and
Component 7 both state "unlocks: none listed in the KG" — this entry
follows the KG as authoritative per this program's standing rule
(KG authoritative on any divergence), listing both unlocks in Identity
above. (2) the KG's `estimated_hours` is 4, while the Blueprint's own
Component 0 states `estimated_hours: 3` — a minor numeric mismatch,
also resolved in favor of the KG value. Neither discrepancy affects
the Blueprint's pedagogical content (Teaching Actions, Misconception
Registry, mastery gate), only its own self-reported metadata fields.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 1, autonomous loop) | Initial entry, grounded in the existing Blueprint. Two Blueprint/KG metadata discrepancies found and recorded (unlocks list, estimated_hours), resolved in favor of the KG per standing rule. |
