# Subtraction — `math.arith.subtraction`

## Identity

- **Concept ID**: `math.arith.subtraction` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; child: `math.arith.borrowing`
- **Prerequisites**: `math.arith.addition` (subtraction is defined as
  addition's inverse operation).
- **Unlocks**: `math.arith.negative-numbers`, `math.arith.
  multiplication`.
- **Related** (from KG): `math.arith.addition`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.95 · **Est. hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.arith.subtraction.md`
  (PACKAGE_READY; MAMR: MC-1 SMALLER-FROM-LARGER is FOUNDATIONAL;
  P76_mode independence, cross_links=[]).
- **Aliases** (from KG): "minus", "difference", "taking away".

## Learning Objective

The learner can: compute a-b as the inverse of addition (a-b=c iff
c+b=a), verifying results by adding back; correctly execute multi-digit
column subtraction with borrowing, regrouping one unit from the next
column when the current column's top digit is smaller than the
bottom; recognize subtraction is NOT commutative (a-b≠b-a in general);
and correctly apply the zero rules a-0=a and a-a=0.

## Core Understanding

Subtraction is the inverse operation of addition: a-b=c if and only if
c+b=a — this reuses `math.arith.addition`'s own machinery directly,
since verifying a subtraction is exactly adding back. Two equivalent
models: TAKE-AWAY (remove b objects from a) and DIFFERENCE (how far
apart are a and b on the number line) — both give the same answer.
Column subtraction with BORROWING enforces place-value: when a
minuend digit is smaller than the corresponding subtrahend digit, one
unit is regrouped from the next column to the left — this is a
two-step operation (the current column gains 10; the donor column
loses 1), not a one-step "gain 10 for free." Subtraction is NOT
commutative (a-b≠b-a in general, unlike addition) — the minuend
(what you start with) and subtrahend (what you remove) play
non-interchangeable roles. Two zero rules: a-0=a (removing nothing
leaves the number unchanged) and a-a=0 (removing everything leaves
nothing).

## Mental Models

- **Beginner model — "subtraction means take the smaller digit from
  the bigger digit, column by column"**: the learner, when a column's
  top digit is smaller than the bottom digit, flips the subtraction
  within that column (computing bottom-minus-top) rather than
  borrowing — avoiding negative single-column results by silently
  changing the problem. Shelf-life warning: this model produces
  numerically plausible-looking (though wrong) answers, since flipping
  a single column's subtraction still yields a valid digit 0-9,
  masking the error's presence.
- **Intermediate model — "I borrow correctly when a column's top digit
  is too small, and I verify by adding back, but I still sometimes
  think a-b should equal b-a like addition does"**: the learner has
  cleared the borrowing mechanics but hasn't fully internalized that
  subtraction's minuend/subtrahend roles are non-interchangeable,
  occasionally claiming symmetric equality that doesn't hold. Upgrade
  trigger: being asked to explain, using a concrete take-away scenario,
  why 8-3 and 3-8 describe genuinely different (and not both possible,
  over the natural numbers) situations.
- **Advanced model — "borrowing is a genuine two-step regrouping (gain
  10 in the current column, lose 1 from the donor column), verified by
  adding back; subtraction is never commutative; and the zero rules
  a-0=a, a-a=0 both follow directly from the take-away model"**: the
  learner fluently executes multi-digit borrowing across multiple
  columns (including borrowing through an intermediate zero column),
  correctly explains non-commutativity, and recognizes subtraction's
  distance interpretation as the bridge to negative numbers. Upgrade
  trigger: being asked to interpret 999-1,001 (over the integers) as a
  movement in the opposite direction from 1,001-999.
- **Do not upgrade early**: a learner who still flips a column's
  subtraction instead of borrowing (beginner model, MC-1) should not be
  pushed toward non-commutativity or the zero rules
  (intermediate/advanced models) before borrowing is fully secure —
  MC-1 is FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure, when a column's top digit is
smaller than the bottom digit, subtracts the smaller digit from the
larger regardless of position (53-28's ones column computed as 8-3=5
instead of borrowing), treating each column as independent and
avoiding negative single-column results by silently reversing that
column's subtraction. A second failure over-generalizes addition's
commutative law onto subtraction, claiming a-b=b-a — 3-8 written as
equal to 8-3=5, missing that the minuend and subtrahend play
fundamentally non-interchangeable roles. A third failure correctly
borrows for the current column (adding 10) but forgets to reduce the
donor column by 1, treating the borrow as "free" rather than a
two-step loan that must be repaid to the column it came from.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: SMALLER-FROM-LARGER (Foundational; Type 1 — overgeneralization)
**Trigger**: computing 53-28, learner subtracts the smaller ones-column
digit from the larger regardless of position (8-3=5, giving the
incorrect answer 35) — skips borrowing entirely, treating each column
as independent and avoiding negative digits by reversing that
column's subtraction.
**Repair**: when the top digit is smaller than the bottom digit,
borrow 1 unit from the next column to the left — that unit equals 10
in the current column; ones becomes 10+3=13, then 13-8=5; the tens
column pays for this (5-1=4), then 4-2=2. Flipping (8-3) silently
changes the problem being solved.
**MAMR**: FOUNDATIONAL — correct borrowing direction underlies every
multi-digit subtraction; must clear before MC-2 or MC-3.

### MC-2: COMMUTATIVITY-ASSUMED (Moderate; Type 1 — overgeneralization)
**Trigger**: claims a-b=b-a, over-generalizing addition's commutative
law (just mastered in `math.arith.addition`) onto subtraction, where
it does not hold.
**Repair**: in a-b, a is the minuend (what you start with) and b is the
subtrahend (what you remove) — these roles are not interchangeable;
8-3=5 (start with 8, remove 3) but 3-8 would require starting with 3
and removing 8, which is impossible over the natural numbers (or -5
over the integers) — not equal to 5.

### MC-3: BORROW-NOT-REDUCED (Moderate; Type 5 — instruction-induced)
**Trigger**: correctly adds 10 to the current column when borrowing but
forgets to subtract 1 from the donor column — the borrowing procedure
is often demonstrated with emphasis on the "gain 10" step, leaving the
"donor column loses 1" step under-practiced.
**Repair**: borrowing is a two-step operation — (1) add 10 to the
current column (the loan); (2) subtract 1 from the next column (repay
the loan). Skipping step 2 overcounts the total; think of it as moving
1 ten from tens to ones — the total is unchanged, only the column
representation changes.

## Analogies

**Primary — spending coins and checking your change (Blueprint's own
opening analogy)**: you have 53 coins, spend 28 — take-away asks "how
many remain?"; difference asks "how far apart are 53 and 28?" Both
give 25. Verification: does 25+28=53? Yes — subtraction's answer plus
the subtracted number must equal the original; this check always
works.

**Anti-analogy to retire**: "Subtraction just means always take the
smaller number away from the bigger one in each column." This directly
invites MC-1 by suggesting column-independence and same-direction
subtraction regardless of which digit is on top.

## Demonstrations

**Borrowing mechanics (Blueprint's own worked example pair)**: 53-28 —
ones: 3<8, borrow 1 ten (tens becomes 4, ones becomes 13), 13-8=5;
tens: 4-2=2; answer 25, verified 25+28=53. A double-borrow case,
401-167: ones 1<7, borrow — but tens is 0, so first borrow from
hundreds (4→3, tens 0→10), then borrow 1 ten for ones (tens→9,
ones→11), 11-7=4; tens 9-6=3; hundreds 3-1=2; answer 234, verified
234+167=401.

**Non-commutativity contrast (Blueprint's own contrast pair)**: 8-3=5
versus 3-8 (negative, or undefined over ℕ) — taking 3 away from 8
leaves 5; taking 8 away from 3 means running out of objects — order
matters, unlike addition.

**Zero-rules pattern (Blueprint's own pattern induction)**: 7-0=7,
15-0=15, 100-0=100 (subtracting nothing leaves the number unchanged);
7-7=0, 53-53=0 (removing all copies leaves zero).

## Discovery Questions

Present "you have 37 coins and owe 100 — can you pay?" and ask the
learner to compute 37-100 before any non-commutativity rule is
stated — the learner discovers this scenario has no valid natural-number
answer (you can't pay), directly motivating why a-b≠b-a from a
concrete, relatable impossibility. Recommendation: guided discovery for
the non-commutativity observation (directly experiential from the
"can't pay" scenario); direct instruction for the two-step borrowing
mechanism (MC-1/MC-3's repair), since the "gain 10, donor loses 1"
procedure is not independently rediscoverable without being
demonstrated.

## Teaching Sequence

Per the Blueprint's own MAMR: MC-1 (smaller from larger) is
FOUNDATIONAL and cleared first — correct borrowing direction underlies
every multi-digit subtraction. MC-2 (commutativity assumed) and MC-3
(borrow not reduced) follow, addressed via the non-commutativity
contrast and the two-step borrowing demonstration respectively.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (smaller from larger) | WORKED EXAMPLE: single-borrow and double-borrow column-subtraction pair | Teaching Actions: SHOW §1 |
| MC-2 active (commutativity assumed) | DEMONSTRATION: 8-3-vs-3-8 non-commutativity contrast | Teaching Actions: SHOW §3 |
| MC-3 active (borrow not reduced) | WORKED EXAMPLE: explicit two-step borrowing (gain 10, donor loses 1) | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: 1,001-999 via column subtraction and via number-line distance, verified by adding back (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "borrow means the current column gains 10 AND the
donor column loses 1" as a single, inseparable two-step statement —
naming both halves together is load-bearing and directly guards
against MC-3.

**Wait-time**: After presenting the "37 coins, owe 100" scenario, give
extended wait-time before revealing the non-commutativity conclusion —
let the learner sit with the concrete impossibility themselves.

**Load-bearing sentences**:
- "When the top digit is too small, borrow — don't flip the
  subtraction."
- "The minuend and subtrahend are not interchangeable — order matters."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): compute 73-48, showing borrowing.
Pass: 25.

**Gate 2** (Blueprint Problem 2): compute 503-278. Pass: 225.

**Gate 3** (Blueprint Problem 3): a bookshop had 824 books, sold 367 —
how many remain? Pass: 457.

**Gate 4** (Blueprint Problem 4): true/false — 500-200=200-500, naming
the property. Pass: false; non-commutativity.

**Gate 5** (Blueprint P76, independence transfer probe): compute
1,001-999 via column subtraction and via number-line distance,
confirm both agree, verify via addition. Pass: 2 by both methods;
2+999=1,001 confirmed.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.95 (⌈0.95×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I subtracted the smaller from the bigger in that
column and got an answer, but you're saying it's wrong?" — the
concept-specific smaller question: "is the top digit at least as big as
the bottom digit in that column?" directly surfaces MC-1 by pointing
the learner at the specific column where flipping occurred, converting
a plausible-looking answer into a locatable, self-checkable error.

## Memory Hooks

**Type**: procedural (column-by-column subtraction with two-step
borrowing, verified by adding back) + declarative (non-commutativity;
the two zero rules). Review form: fresh multi-digit subtraction
problems with varying numbers of borrows (including borrowing through
an intermediate zero column), periodically paired with a "does order
matter here?" spot-check to keep MC-2's guard-rail active.
Interleaving partner: `math.arith.addition` (subtraction's inverse
operation, used for verification).

## Transfer Connections

**Near transfer**:
- `math.arith.negative-numbers` (per KG `unlocks`; subtraction
  extended to b>a via additive inverses)
- `math.arith.multiplication` (per KG `unlocks`; long division uses
  subtraction as multiplication's own inverse)

**Far transfer**:
- `math.arith.borrowing` (KG child concept; the regrouping mechanism
  this concept introduces, developed in full depth)
- The distance interpretation of subtraction previewed here (Blueprint
  P76) is the direct conceptual bridge to negative numbers

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept, consistent with the Blueprint's own Component 7. Not
fabricated beyond what the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.subtraction.md`
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
(`math.arith.addition`) and two unlocks (`math.arith.
negative-numbers`, `math.arith.multiplication`) match the Blueprint's
own Component 7 exactly.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
