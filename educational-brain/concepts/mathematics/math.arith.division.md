# Division — `math.arith.division`

## Identity

- **Concept ID**: `math.arith.division` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; children: `math.arith.long-division`, `math.arith.remainder`,
  `math.arith.divisor-dividend`
- **Prerequisites**: `math.arith.multiplication` (division is defined
  as multiplication's inverse).
- **Unlocks**: `math.arith.fractions`, `math.nt.divisibility`.
- **Related** (from KG): `math.arith.multiplication`, `math.arith.
  fractions`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.9 · **Est. hours**: 12
- **Blueprint**: `docs/curriculum/blueprints/math.arith.division.md`
  (PACKAGE_READY; MAMR: MC-1 DIVISION-COMMUTATIVE is FOUNDATIONAL;
  P76_mode cross-link probe, cross_links=[math.nt.divisibility
  (Tier 1)]).
- **Aliases** (from KG): "÷", "quotient", "sharing equally",
  "grouping".

## Learning Objective

The learner can: compute a÷b as the inverse of multiplication (a÷b=c
iff c×b=a), verifying by multiplying back; correctly compute both
exact division (remainder 0) and division with a nonzero remainder,
treating the remainder as a required part of the answer, not an
error; recognize division is NOT commutative (a÷b≠b÷a in general);
and correctly recognize division by zero as UNDEFINED, since no c
satisfies c×0=a for a≠0.

## Core Understanding

Division is the inverse operation of multiplication: a÷b=c if and
only if c×b=a (with b≠0). Two equivalent models: PARTITIVE (share a
equally among b groups, each gets c) and QUOTITIVE (how many groups of
b fit into a?). For natural numbers, division may leave a REMAINDER:
a=b×q+r with 0≤r<b — when r=0, b divides a exactly; when r>0, the
complete answer is "q remainder r," not q alone (dropping the
remainder silently changes the answer). Division is NOT commutative
(a÷b≠b÷a in general) — the dividend (what is being shared) and divisor
(how many groups) play non-interchangeable roles, exactly as
subtraction's minuend and subtrahend do. DIVISION BY ZERO is
UNDEFINED: the defining equation c×0=a has NO solution when a≠0 (since
c×0=0 for every c) — this is not "the answer is zero" or "the answer is
a," it is that the question itself has no valid answer.

## Mental Models

- **Beginner model — "division always works the same order, a÷b is
  the same as b÷a"**: the learner over-generalizes multiplication's
  commutativity onto division, claiming a÷b=b÷a. Shelf-life warning:
  this model can produce correct answers by coincidence when a=b,
  delaying detection until genuinely asymmetric cases are tested.
- **Intermediate model — "I correctly recognize division isn't
  commutative, and I compute exact division reliably, but I sometimes
  drop the remainder when division isn't exact, or assign a value to
  division by zero"**: the learner has cleared MC-1 but hasn't fully
  internalized that a nonzero remainder is a REQUIRED part of the
  answer, or that division by zero has no answer at all (rather than a
  special value like 0). Upgrade trigger: being asked to verify a
  division result using the division algorithm (a=b×q+r) and to
  explain why c×0=a has no solution for nonzero a.
- **Advanced model — "division is multiplication's inverse, verified
  by a=b×q+r; a nonzero remainder is always part of the complete
  answer; division is never commutative; and division by zero is
  undefined because the defining equation has no solution, not because
  the answer is unknown"**: the learner fluently computes and verifies
  both exact and remainder division, correctly explains
  non-commutativity, and correctly reasons about why division by zero
  is undefined rather than assigning it any value. Upgrade trigger:
  being asked to connect exact division (remainder 0) to the concept
  of divisibility in number theory.
- **Do not upgrade early**: a learner who still believes a÷b=b÷a
  (beginner model, MC-1) should not be pushed toward remainder-handling
  or division-by-zero reasoning (intermediate/advanced models) before
  non-commutativity is fully secure — MC-1 is FOUNDATIONAL per the
  Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure claims a÷b=b÷a, over-generalizing
multiplication's commutative law onto division, where the dividend
and divisor play fundamentally different, non-interchangeable roles —
"12 apples shared among 4 friends" and "4 apples shared among 12
friends" are genuinely different situations with different answers. A
second failure computes a÷0 as 0 or as a, pattern-matching from
a×0=0 or a÷a=1 without grasping that no inverse actually exists when
dividing by zero — the defining equation c×0=a simply has no solution
for a≠0. A third failure writes 13÷4=3, silently dropping the
remainder 1, since only exact-division examples were practiced early
on, making a nonzero remainder feel like an error rather than a
required, complete part of the answer.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: DIVISION-COMMUTATIVE (Foundational; Type 1 — overgeneralization)
**Trigger**: claims a÷b=b÷a, over-generalizing multiplication's
commutative law (just mastered) onto division, where it does not
hold.
**Repair**: in a÷b, the DIVIDEND (what's being shared) and DIVISOR
(how many groups) play non-interchangeable roles — "12 apples shared
among 4" and "4 apples shared among 12" are different situations;
compute both 20÷5=4 and 5÷20=0 remainder 5 to confirm they differ.
**MAMR**: FOUNDATIONAL — every later division skill depends on
correctly respecting the fixed dividend-then-divisor order; must
clear before MC-2 or MC-3.

### MC-2: DIVISION-BY-ZERO-DEFINED (Moderate; Type 6 — analogy overextension)
**Trigger**: computes a÷0 as 0 or as a — pattern-matches from a×0=0
or a÷a=1 without grasping that no valid c satisfies c×0=a for a≠0.
**Repair**: division is defined by the inverse — a÷b=c requires
c×b=a; when b=0, this becomes c×0=a, but c×0=0 for EVERY c, so if
a≠0, no solution exists at all — the operation is genuinely
undefined, not assigned any particular value.

### MC-3: REMAINDER-IGNORED (Moderate; Type 5 — instruction-induced)
**Trigger**: writes 13÷4=3, silently dropping the remainder 1 — only
exact-division examples were typically practiced first, making a
nonzero remainder feel like an unwanted leftover rather than part of
the answer.
**Repair**: verify via the division algorithm — does 3×4=13? No,
3×4=12, and 13-12=1 is the remainder; the complete answer is q=3,
r=1, and dropping r produces an answer that fails the multiplication
check.

## Analogies

**Primary — sharing apples among friends (Blueprint's own opening
analogy)**: 12 apples shared equally among 4 friends — partitive
model: distribute one apple at a time to each friend in turn, each
gets 3; quotitive model: pack apples in groups of 4, count the bags
(3 bags). Both give 12÷4=3, verified by 3×4=12.

**Anti-analogy to retire**: "Division just undoes multiplication, so
it works the same in either order, like multiplication does." This
directly invites MC-1 by suggesting the inverse relationship implies
symmetry, when the dividend/divisor roles remain fixed and
non-interchangeable.

## Demonstrations

**Exact vs. remainder division (Blueprint's own worked example
pair)**: 56÷8 — 8×7=56, so 56÷8=7 remainder 0 (exact). 47÷5 — 5×9=45≤47,
5×10=50>47, so quotient 9, remainder 47-45=2; 47÷5=9 remainder 2,
verified 5×9+2=47.

**Non-commutativity contrast (Blueprint's own contrast pair)**: 12÷4=3
(share 12 among 4) versus 4÷12=0 remainder 4 (share 4 among 12, less
than 1 each) — genuinely different situations, genuinely different
answers.

**Division-by-zero pattern (Blueprint's own pattern induction)**:
12÷4=3 solves c×4=12; 12÷2=6 solves c×2=12; 12÷1=12 solves c×1=12;
12÷0=? would need to solve c×0=12 — but c×0=0 for every c, so NO
solution exists; division by zero is undefined, not zero or twelve.

## Discovery Questions

Present "share 4 apples among 12 friends" and ask the learner to
predict whether this gives the same answer as "share 12 apples among 4
friends" before any non-commutativity rule is stated — the learner
discovers the two scenarios are genuinely different (one gives 3 whole
apples each, the other gives less than 1 each), directly motivating why
division isn't commutative from a concrete, relatable contrast.
Recommendation: guided discovery for the non-commutativity observation
(directly experiential from the apple-sharing contrast); direct
instruction for why division by zero is undefined (MC-2's repair),
since the "no solution exists" reasoning is not independently
rediscoverable without walking through the defining equation
explicitly.

## Teaching Sequence

Per the Blueprint's own MAMR: MC-1 (division commutative) is
FOUNDATIONAL and cleared first — respecting the fixed dividend/divisor
order underlies every later division skill. MC-2 (division by zero
defined) and MC-3 (remainder ignored) follow FIFO, addressed via the
inverse-equation reasoning and the division-algorithm verification
respectively.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (division commutative) | DEMONSTRATION: 12÷4-vs-4÷12 non-commutativity contrast | Teaching Actions: SHOW §3 |
| MC-2 active (division by zero defined) | DEMONSTRATION: division-by-zero "no solution exists" pattern induction | Teaching Actions: SHOW §3 |
| MC-3 active (remainder ignored) | WORKED EXAMPLE: exact-vs-remainder division pair with explicit verification | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: connect exact division (remainder 0) to divisibility notation b\|a (Blueprint P76, cross-link) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the dividend and divisor are not interchangeable"
whenever introducing a division problem — naming the fixed roles
explicitly is load-bearing and directly guards against MC-1.

**Wait-time**: After presenting "share 4 apples among 12 friends,"
give extended wait-time before revealing the remainder-0 answer — let
the learner work through the sharing scenario and notice each friend
gets less than one apple.

**Load-bearing sentences**:
- "Division is not commutative — the dividend and divisor play
  different roles."
- "A remainder is part of the answer, not something to drop."
- "Division by zero has no answer at all — the question itself has no
  solution."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
cross-link transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): compute 56÷8. Pass: 7, remainder 0.

**Gate 2** (Blueprint Problem 2): compute 47÷5 with quotient and
remainder. Pass: 9 remainder 2.

**Gate 3** (Blueprint Problem 3): true/false — 36÷4=4÷36. Pass: false.

**Gate 4** (Blueprint Problem 4): verify Problem 2's result using the
division algorithm a=b×q+r. Pass: 47=5×9+2 confirmed.

**Gate 5** (Blueprint P76, cross-link probe to `math.nt.
divisibility`): does 4|28 (via 28÷4)? Does 6|25 (via 25÷6)? Does 4|28
imply 28|4? Pass: yes (28÷4=7 R0); no (25÷6=4 R1); no (4÷28=0 R4,
divisibility is not symmetric).

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.9 (⌈0.9×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I thought a÷b and b÷a should give the same
answer, since multiplication doesn't care about order" — the
concept-specific smaller question: "in a÷b, which number is being
shared, and which number tells you how many groups?" directly surfaces
MC-1 by pointing the learner at the fixed, non-interchangeable roles
the dividend and divisor play, converting a plausible-sounding
generalization into a checkable structural distinction.

## Memory Hooks

**Type**: procedural (computing and verifying exact and remainder
division via the division algorithm) + declarative (non-
commutativity; division by zero is undefined). Review form: fresh
division problems mixing exact and remainder cases, periodically
paired with a "is this commutative?" and a "what about dividing by
zero?" spot-check to keep MC-1 and MC-2's guard-rails active.
Interleaving partner: `math.arith.multiplication` (the operation
division inverts, used for verification).

## Transfer Connections

**Near transfer**:
- `math.arith.fractions` (per KG `unlocks`; a÷b becomes the fraction
  a/b exactly when b does not divide a exactly)
- `math.nt.divisibility` (per KG `unlocks`, Tier 1 cross-link; exact
  division, remainder 0, is precisely the bridge to divisibility
  notation b|a)

**Far transfer**:
- `math.arith.long-division` (KG child concept; the full column
  procedure for computing quotient and remainder on larger numbers)
- `math.arith.remainder` (KG child concept; the remainder concept
  developed in full depth)

## Cross-Subject Connections

Per KG `cross_links` [`math.nt.divisibility`], Tier 1: P76_mode is
cross-link probe per the Blueprint's own GR-9 determination. The
transfer probe extends exact division (remainder 0) directly to the
divisibility relation b|a, requiring no prior number-theory notation
knowledge beyond what's given inline (per the Blueprint's own Teaching
Notes).

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.division.md`
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
(`math.arith.multiplication`) and two unlocks (`math.arith.fractions`,
`math.nt.divisibility`) match the Blueprint's own Component 7 exactly.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 6 part 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
