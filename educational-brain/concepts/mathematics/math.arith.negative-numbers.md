# Negative Numbers — `math.arith.negative-numbers`

## Identity

- **Concept ID**: `math.arith.negative-numbers` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic — no parent or
  children in KG
- **Prerequisites**: `math.arith.subtraction` (extended here to allow
  operands and results below zero), `math.found.integers` (the set ℤ
  this concept's arithmetic operates within, including the
  additive-inverse structure).
- **Unlocks**: `math.arith.integer-arithmetic`, `math.arith.
  number-line`.
- **Related** (from KG): `math.arith.number-line`, `math.found.
  integers`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/
  math.arith.negative-numbers.md` (MAMR: MC-1
  DOUBLE-NEGATIVE-STAYS-NEGATIVE is FOUNDATIONAL; P76_mode
  independence, cross_links=[]).
- **Aliases** (from KG): "integers below zero", "signed numbers",
  "additive inverse".

## Learning Objective

The learner can: correctly compute a-(-b) as a+b, recognizing that
subtracting a negative number flips the operation to addition; apply
the multiplication sign rule correctly, recognizing that a negative
times a negative gives a POSITIVE result; and correctly recognize
that the notation -x does not always represent a negative number — it
represents the additive inverse of x, which is positive whenever x
itself is negative.

## Core Understanding

This concept extends `math.arith.subtraction` to allow operands and
results below zero, within `math.found.integers`'s set ℤ. Subtracting
a NEGATIVE number flips the operation entirely to addition: a-(-b)=a+b
— the two negative signals (the subtraction operator, and the
number's own negative sign) combine into a single plus. The
MULTIPLICATION SIGN RULE: a negative times a negative gives a
POSITIVE result — (-a)×(-b)=ab — this is not an arbitrary convention
but is FORCED by requiring multiplication to behave consistently as
one factor crosses from positive into negative territory (extending a
known pattern). The notation -x means "the ADDITIVE INVERSE of x," not
"a negative number" as a blanket rule — if x itself is already
negative (e.g. x=-7), then -x=-(-7)=7, a POSITIVE number; -x's actual
sign depends entirely on x's own sign, never fixed in advance by the
minus sign alone.

## Mental Models

- **Beginner model — "subtracting a negative works the same as
  subtracting a positive"**: the learner computes a-(-b) as a-b,
  failing to recognize that the number's own negative sign, combined
  with the subtraction operator, flips the operation to addition.
  Shelf-life warning: this model produces a plausible-looking (though
  systematically undercounted-by-2b) wrong answer, since the result is
  still a valid number, just the wrong one.
- **Intermediate model — "I correctly flip subtraction-of-a-negative to
  addition, but I still sometimes compute a negative-times-negative
  product as negative, or assume -x is always negative"**: the learner
  has cleared MC-1 but hasn't fully internalized the multiplication
  sign rule or the additive-inverse meaning of -x. Upgrade trigger:
  being asked to prove the negative×negative=positive rule by
  extending a known multiplication pattern, and to evaluate -x for a
  negative x specifically.
- **Advanced model — "subtracting a negative always flips to addition,
  two negative factors always multiply to a positive result (both
  provable by extending consistent patterns), and -x means the
  additive inverse of x — positive when x is negative, negative when x
  is positive, never fixed by the surface notation alone"**: the
  learner fluently applies all three rules together in composite
  expressions. Upgrade trigger: being asked to evaluate a composite
  expression combining subtraction-of-a-negative, multiplication of
  negatives, and a -x evaluation in one problem.
- **Do not upgrade early**: a learner who still computes a-(-b) as a-b
  (beginner model, MC-1) should not be pushed toward the multiplication
  sign rule or -x evaluation (intermediate/advanced models) before
  double-negative subtraction is fully secure — MC-1 is FOUNDATIONAL
  per the Blueprint's own MAMR, since it directly compounds with MC-2
  (both involve correctly tracking how negative signs combine) and
  sets up MC-3's deeper confusion about what "-x" fundamentally means.

## Why Students Fail

The dominant, FOUNDATIONAL failure computes a-(-b) as a-b, failing to
recognize that subtracting a negative number requires correctly
combining TWO separate negative signals (the subtraction operator
itself, and the number's own negative sign) into a single flip to
addition — a genuinely different cognitive demand from ordinary
sign-tracking that resists intuition without an explicit model to
anchor it. A second failure computes a product of two negative numbers
as negative, rather than positive, since "two negatives feel like more
negativity" rather than a genuine sign-cancellation rule requiring
justification. A third failure assumes the notation -x always
represents a negative number, missing that -x is positive whenever x
itself is negative — the minus sign in "-x" names an operation
(negation/additive-inverse), not a guaranteed negative outcome.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: DOUBLE-NEGATIVE-STAYS-NEGATIVE (Foundational; Type 2 — perceptual intuition)
**Trigger**: computing a-(-b) as a-b, failing to flip the operation to
addition — the two minus signs don't visually or intuitively suggest
"becomes a plus" without an explicit model.
**Repair**: use the number-line turn-around model — subtraction
normally faces you toward the negative direction, but the number
itself being negative triggers a "turn around" (facing positive), so
you step forward in that new direction instead: 7-(-3) lands at 10,
not 4.
**MAMR**: FOUNDATIONAL — subtracting a negative is the single most
common sign-arithmetic error, and this error directly compounds with
MC-2 and sets up MC-3's deeper confusion; must clear before MC-2 or
MC-3.

### MC-2: NEGATIVE-TIMES-NEGATIVE-IS-NEGATIVE (Moderate; Type 2 — perceptual intuition)
**Trigger**: computes a product of two negative numbers as negative
rather than positive — "two negatives feel like more negativity."
**Repair**: build a pattern using known multiplication facts,
decreasing one factor by 1 each row (3×(-2)=-6, 2×(-2)=-4, 1×(-2)=-2,
0×(-2)=0) — each step INCREASES the result by 2; continuing
consistently, -1×(-2) should be 0+2=2, POSITIVE — the sign rule is
FORCED by requiring multiplication to behave consistently, not an
arbitrary convention.

### MC-3: MINUS-X-IS-ALWAYS-NEGATIVE (Moderate; Type 4 — notation-induced)
**Trigger**: assumes -x always represents a negative number, missing
that -x is positive whenever x itself is negative — the surface
appearance of a minus sign suggests "negative" regardless of what
x's own value actually is.
**Repair**: evaluate -x directly for x=-5: -x=-(-5). Applying the
double-negative rule (or the additive-inverse definition: -x is the
number that, added to x, gives 0), -x=5 — POSITIVE, despite the "-x"
notation looking like it should be negative. -x's sign depends
entirely on x's own sign, never fixed in advance.

## Analogies

**Primary — the number-line turn-around (Blueprint's own opening
model)**: ordinary subtraction 7-3 means "face left (subtraction),
step forward 3" landing at 4. Subtracting a NEGATIVE, 7-(-3), means
the number itself being negative triggers a "turn around" (now facing
right instead), stepping forward 3 FROM THAT NEW FACING, landing at
10 — the two negative signals (subtraction, and the number's own sign)
combine to reverse the direction entirely.

**Anti-analogy to retire**: "Two negatives just cancel out, so
subtracting a negative is basically the same as regular subtraction."
This directly invites MC-1 by vaguely suggesting cancellation without
specifying that the operation itself flips to addition.

## Demonstrations

**Turn-around verification (Blueprint's own worked example)**:
12-(-5) via the turn-around model (at 12, face left for subtraction,
but the number -5 is itself negative, so turn around and face right,
step 5, landing at 17) matches the formal rule 12-(-5)=12+5=17.

**Sign-rule pattern proof (Blueprint's own Contrast 1)**: 3×(-2)=-6,
2×(-2)=-4, 1×(-2)=-2, 0×(-2)=0 — each step down by 1 in the first
factor increases the result by 2; continuing consistently,
-1×(-2)=0+2=2, proving negative×negative=positive by extending the
pattern, not asserting it.

**-x evaluation for positive and negative x (Blueprint's own Contrast
2)**: for x=5 (positive), -x=-5 (negative, matching the naive
expectation); for x=-5 (negative), -x=-(-5)=5 (POSITIVE, contradicting
the naive expectation) — -x's sign genuinely depends on x's own sign.

## Discovery Questions

Present 12-(-5) and ask the learner to compute it using the turn-around
model before the formal rule is stated — the learner discovers,
through the physical "turn around" action on the number line, that the
answer is 17, not 7, directly motivating the double-negative-flips-to-
addition rule from a concrete spatial demonstration. Recommendation:
guided discovery for the turn-around observation (directly
experiential from working the number line); direct instruction for the
sign-rule pattern proof and the -x additive-inverse definition
(MC-2/MC-3's repairs), since neither the extend-the-pattern argument
nor the additive-inverse framing is independently rediscoverable
without being demonstrated.

## Teaching Sequence

Per the Blueprint's own MAMR: MC-1 (double-negative stays negative) is
FOUNDATIONAL and cleared first — subtracting a negative number is the
single most common sign-arithmetic error and directly compounds with
MC-2. MC-2 (negative times negative is negative) and MC-3 (minus-x is
always negative) follow FIFO, addressed via the pattern proof and the
additive-inverse evaluation respectively.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (double-negative stays negative) | DEMONSTRATION: number-line turn-around model for subtracting a negative | Teaching Actions: SHOW §3 |
| MC-2 active (negative times negative is negative) | DEMONSTRATION: multiplication sign-rule pattern proof | Teaching Actions: SHOW §3 |
| MC-3 active (minus-x is always negative) | WORKED EXAMPLE: -x evaluated for both a positive and a negative x | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: submarine depth-tracking scenario combining all three rules (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the number's own negative sign turns you around"
when explaining subtraction of a negative — the turn-around framing is
load-bearing and directly guards against MC-1.

**Wait-time**: After presenting the multiplication sign-rule pattern
(3×(-2), 2×(-2), 1×(-2), 0×(-2)), give extended wait-time before
revealing the next row — let the learner predict -1×(-2) from the
established pattern themselves.

**Load-bearing sentences**:
- "Subtracting a negative flips the whole operation to addition."
- "The sign of -x depends on x's own sign — it's never automatically
  negative."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): compute 9-(-6). Pass: 15.

**Gate 2** (Blueprint Problem 2): compute (-7)×(-8). Pass: 56
(positive).

**Gate 3** (Blueprint Problem 3): if m=-11, what is -m? Pass: 11
(positive).

**Gate 4** (Blueprint Problem 4): true/false — "-y is always a
negative number," correcting if false. Pass: false; counterexample
with y negative giving -y positive.

**Gate 5** (Blueprint P76, independence transfer probe): a submarine
depth-tracking scenario computing d-(-150) (cancelling a planned
descent), evaluating -x for a negative planned-descent value, and
assessing whether double-negative subtraction has genuine practical
meaning. Pass: correct depth calculation, correct sign interpretation,
correct rebuttal of the "just a notation trick" claim.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.85 (⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "wait, why does subtracting a negative number turn
into addition — that seems backwards" — the concept-specific smaller
question: "on the number line, which direction does subtraction
normally face you, and what does the number's OWN negative sign do to
that facing?" directly walks the learner through the turn-around
mechanism step by step, converting an abstract rule into a concrete,
traceable spatial action.

## Memory Hooks

**Type**: procedural (applying the turn-around model to subtraction of
negatives; applying the multiplication sign rule) + declarative (-x
means additive inverse, sign depends on x). Review form: fresh
double-negative subtraction and sign-rule prompts, periodically paired
with a -x evaluation using a negative x to keep MC-3's guard-rail
active. Interleaving partner: `math.arith.subtraction` (the operation
this concept extends to allow negative operands and results).

## Transfer Connections

**Near transfer**:
- `math.arith.integer-arithmetic` (per KG `unlocks`; the general
  arithmetic of ℤ combining all four operations builds directly on
  the sign rules established here)
- `math.arith.number-line` (per KG `unlocks`; the number line's
  leftward extension is exactly where these numbers are given their
  geometric position)

**Far transfer**:
- `math.found.integers` (per KG `related`; the set ℤ this concept's
  arithmetic operates within, including the additive-inverse
  structure)
- Algebra: solving equations involving negative coefficients and
  constants directly reuses these sign rules

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept, consistent with the Blueprint's own Component 7
GR-9 determination (P76_mode independence). Not fabricated beyond what
the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.negative-numbers.md`
(all structural/grammar/content/AIR checks PASS).

Full Teaching Actions (A01 through A04/mastery gate) and Protocol B
repair actions (B01 through B03) reused by reference above and not
restated in full; the Misconception Registry (MC-1 through MC-3) and
the P77/P76 mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.arith.subtraction`, `math.found.integers`) and two unlocks
(`math.arith.integer-arithmetic`, `math.arith.number-line`) match the
Blueprint's own Component 7 exactly.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 6 part 1, autonomous loop) | Initial entry, grounded in the existing Blueprint. |
