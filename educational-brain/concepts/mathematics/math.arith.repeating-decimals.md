# Repeating Decimals — `math.arith.repeating-decimals`

## Identity

- **Concept ID**: `math.arith.repeating-decimals` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.decimals` (no children in KG)
- **Prerequisites**: `math.arith.decimals` (a repeating decimal is a
  specific kind of decimal expansion).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.terminating-decimals`, `math.
  found.rational-numbers`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 3
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.repeating-decimals.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "recurring decimals", "0.333...", "bar
  notation".

## Learning Objective

The learner can: state that a repeating decimal is one in which a
block of digits repeats infinitely, and that every rational number has
either a terminating or a repeating decimal expansion (per `math.
arith.terminating-decimals`'s exhaustive complement); correctly read
and write bar notation, identifying exactly which digits fall under
the repeating bar; and recognize a repeating decimal as an EXACT
representation of its value, not an approximation, distinguishing it
from a non-repeating infinite decimal (irrational).

## Core Understanding

A repeating decimal is a decimal in which a block of digits repeats
INFINITELY — 1/3=0.333… (the single digit 3 repeats forever),
1/6=0.1\overline{6} (bar notation: only the 6 repeats, the 1 does
not), 1/7=0.\overline{142857} (a six-digit block repeats). Every
rational number's decimal expansion either TERMINATES (per `math.
arith.terminating-decimals`) or REPEATS — these two cases are
EXHAUSTIVE for rational numbers; there is no third option. The bar
notation precisely marks which digits are part of the repeating
block — everything under the bar repeats forever; digits before the
bar (if any) occur only once. Critically, a repeating decimal is an
EXACT value, not an approximation or a rounding — 0.333… (with the "…"
or bar meaning genuinely infinite repetition) equals 1/3 exactly, with
no error or imprecision at all; this is fundamentally different from a
TRUNCATED decimal like 0.33 (which IS an approximation, stopping the
repetition early). Not every infinite decimal repeats — irrational
numbers (like π=3.14159265…) have infinite decimal expansions that
never settle into a repeating block.

## Mental Models

- **Beginner model — "0.333... is basically 1/3, close enough, since
  it goes on forever and you can't write down all the digits"**: the
  learner treats the "..." as signaling an inherent approximation or
  imprecision, rather than recognizing that genuine infinite repetition
  IS the exact value, with no error at all. Shelf-life warning: this
  model can coexist with correctly computing 1/3=0.333… via long
  division, since the arithmetic can be correct while the
  interpretation of what the result MEANS remains flawed.
- **Intermediate model — "I understand repeating decimals are exact,
  not approximations, but I sometimes misread which digits are under
  the bar in bar notation"**: the learner has cleared the exactness
  confusion but still occasionally includes a non-repeating digit
  under the bar, or excludes a digit that should be included. Upgrade
  trigger: being asked to convert several different repeating decimals
  to bar notation and identify exactly which digits belong under the
  bar in each case.
- **Advanced model — "repeating decimals are exact values (not
  approximations), bar notation precisely marks the repeating block,
  and every rational number falls into exactly one of two exhaustive
  cases (terminating or repeating) — while irrational numbers have
  infinite, non-repeating decimals, a genuinely different category"**:
  the learner fluently reads/writes bar notation, treats repeating
  decimals as exact, and correctly distinguishes them from irrational
  numbers' infinite non-repeating expansions. Upgrade trigger: being
  asked to explain, using the terminating/repeating dichotomy, why π's
  decimal expansion proves it cannot be rational.
- **Do not upgrade early**: a learner who still treats repeating
  decimals as approximations (beginner model, MC-1) should not be
  pushed toward bar-notation precision or the rational/irrational
  distinction (intermediate/advanced models) before the core exactness
  insight is fully secure — MC-1 is FOUNDATIONAL, since it undermines
  confidence that the repeating notation represents a real, precise
  number at all.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats a repeating decimal like
0.333… as merely a close approximation of 1/3, rather than recognizing
that genuine infinite repetition IS the exact value with zero error —
the "…" or bar notation, signaling an infinite process, feels
inherently imprecise even though it precisely and completely
represents the fraction. A second failure misreads which specific
digits fall under the repeating bar in bar notation, either including
a digit that occurs only once (before the repeating block starts) or
excluding a digit that genuinely repeats — the notation's compactness
requires careful, deliberate reading rather than a quick glance. A
third failure assumes any decimal that "goes on forever" must be a
repeating decimal (and therefore rational), missing that irrational
numbers have infinite decimal expansions that NEVER settle into a
repeating pattern — a genuinely different, non-repeating kind of
infinite decimal.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: REPEATING-DECIMAL-ASSUMED-APPROXIMATE-NOT-EXACT (Foundational; Type 3 — language contamination)
**Description**: Learner believes a repeating decimal like 0.333… is
merely an approximation of 1/3, not an exact representation — the
everyday use of "…" (and the informal notion of "goes on forever
without stopping") contaminates the mathematical meaning, which is
genuine, exact infinite repetition, not an unfinished or imprecise
process.
**Trigger condition**: asked whether 0.333… (with genuine infinite
repetition indicated) equals 1/3 exactly or only approximately,
learner says "approximately" or hesitates.
**Repair target**: distinguish TRUNCATED decimals (0.33, which stops
after two digits and IS an approximation, with a small error) from
GENUINELY REPEATING decimals (0.333… with the "…" or bar meaning
infinite, unending repetition, which IS exactly equal to 1/3, with
zero error) — the "…"/bar signals exactness, not imprecision.
**MAMR**: FOUNDATIONAL — undermines confidence that repeating notation
represents a real, precise value at all; must clear before MC-2 or
MC-3.

### MC-2: BAR-NOTATION-SCOPE-MISREAD (Moderate; Type 4 — notation-induced)
**Description**: Learner misreads which digits fall under the
repeating bar — for example, given 0.1\overline{6} (only the 6
repeats), incorrectly treating both the 1 and the 6 as repeating (as
if it were 0.1616161…), or the reverse error of excluding a digit that
genuinely does repeat.
**Trigger condition**: any decimal in bar notation where a non-
repeating digit precedes the repeating block.
**Repair target**: read the bar notation literally and precisely —
only the digit(s) directly under the bar repeat; any digits before the
bar occur exactly once. 0.1\overline{6} means 0.1666… (the 1 occurs
once, only the 6 repeats), NOT 0.161616….

### MC-3: ALL-INFINITE-DECIMALS-ASSUMED-REPEATING (Moderate; Type 1 — overgeneralization)
**Description**: Learner believes any decimal that "goes on forever"
must be a repeating decimal (and therefore represents a rational
number) — over-generalizes from every example encountered so far
(before irrational numbers are introduced) genuinely being repeating.
**Trigger condition**: shown an irrational number's decimal expansion
(e.g., π=3.14159265…) and asked whether it is a repeating decimal.
**Repair target**: an infinite decimal expansion is NECESSARY but not
SUFFICIENT for repeating — π's digits genuinely continue forever but
NEVER settle into a repeating block, which is exactly why π is
irrational (not expressible as a ratio of integers); "infinite" and
"repeating" are not the same property.

## Analogies

**Primary — an infinitely-looping recording vs. a live, never-repeating
broadcast (for the repeating-vs-non-repeating infinite distinction)**:
a song set to loop forever plays the identical block of notes over and
over, endlessly but PREDICTABLY — you can state exactly what plays at
any future moment. A live broadcast that never stops and never repeats
any segment is also infinite in duration, but fundamentally
unpredictable — you cannot state in advance what will happen at any
future moment. Repeating decimals are like the looping recording
(predictable, exact); irrational numbers' decimals are like the
never-repeating broadcast (infinite, but with no repeating pattern to
exploit).

**Anti-analogy to retire**: "The '...' after a decimal just means 'and
so on, roughly.'" This directly invites MC-1 by framing infinite
repetition as vague and approximate rather than a precise, exact
mathematical statement.

## Demonstrations

**Exactness verification (targets MC-1)**: long division of 1÷3 never
terminates and never produces a remainder of 0 — it produces the
identical remainder (1) at every step, forcing the identical digit (3)
to repeat forever; this is EXACTLY what 1/3 equals, verified directly
by the division process itself, not an approximation chosen for
convenience.

**Bar-notation precision (targets MC-2)**: 0.1\overline{6} means
0.1666… — the 1 occurs exactly once, only the 6 repeats. Contrast with
0.\overline{16}, which means 0.161616… — here BOTH digits 1 and 6
repeat as a two-digit block. These are two different decimals from two
different bar placements.

**Infinite-vs-repeating distinction (targets MC-3)**: π=3.14159265…
continues infinitely but never settles into a repeating block (proven
irrational); contrast with 1/7=0.\overline{142857}, which also
continues infinitely but DOES settle into a genuine repeating
six-digit block (rational).

## Discovery Questions

Present long division of 1÷3 step by step and ask the learner to
predict, after seeing the same remainder (1) reappear, what will
happen next — the learner discovers the process will repeat
identically forever, directly motivating why the decimal must repeat
(not merely "go on") from the mechanics of division itself.
Recommendation: guided discovery for WHY the decimal repeats (directly
experiential from tracking the recurring remainder in long division);
direct instruction for reading precise bar notation and for the
irrational-numbers exception (MC-2/MC-3's repairs), since neither the
notation convention nor the existence of non-repeating infinite
decimals is independently rediscoverable without being stated.

## Teaching Sequence

MC-1 (repeating decimal assumed approximate) is addressed first, since
establishing that repeating decimals are exact is the foundational
insight every later skill depends on. MC-2 (bar notation scope
misread) is addressed second, once exactness is established, refining
precise reading of the notation. MC-3 (all infinite decimals assumed
repeating) is addressed last, as it requires the rational/irrational
distinction, a broader scope than this concept's core content.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (assumed approximate, not exact) | DEMONSTRATION: long-division exactness verification (1÷3 recurring remainder) | Teaching Actions: SHOW §3 |
| MC-2 active (bar notation scope misread) | WORKED EXAMPLE: 0.1-bar-6 vs. 0.16-bar precision contrast | Teaching Actions: SHOW §1 |
| MC-3 active (all infinite decimals assumed repeating) | DEMONSTRATION: π vs. 1/7 infinite-but-different-kind contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: explain why π's non-repeating infinite expansion proves it is irrational | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "infinite repetition, exactly" rather than "goes on
forever, roughly" — the exactness framing is load-bearing and directly
guards against MC-1.

**Wait-time**: After presenting the long division of 1÷3 and the
recurring remainder, give extended wait-time before revealing that the
decimal must repeat forever — let the learner predict the pattern
themselves from the repeating remainder.

**Load-bearing sentences**:
- "A repeating decimal is exact, not an approximation — the repetition
  IS the precision."
- "Only the digits under the bar repeat — read the notation
  carefully."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Is 0.666… exactly equal to 2/3, or only approximately equal? Justify.
Pass: exactly equal — verified by long division (2÷3 recurring
remainder 2, forcing digit 6 to repeat forever, with zero error).

### Gate 2 (MC-2 check)
Write out the first 6 digits of 0.2\overline{45} (only 45 repeats).
Pass: 0.245454 (the 2 occurs once, then 45 repeats as a block).

### Gate 3 (MC-3 check)
Is every infinite decimal a repeating decimal? Give a counterexample.
Pass: no; π=3.14159265… is infinite but never repeats, since π is
irrational.

### Gate 4 (application)
Convert 5/11 to a decimal using long division, and express the result
in bar notation. Pass: 0.\overline{45} (the two-digit block 45
repeats).

### Transfer probe (independence mode — no cross_links)
A student claims: "since 1/3=0.333… never terminates, it must be
irrational." Evaluate this claim, using the terminating/repeating
dichotomy for rational numbers. Pass: correctly identifies the claim as
false — 1/3 is rational (it's a ratio of integers) and its decimal
repeats (rather than terminates), which is exactly the SECOND of the
two exhaustive cases every rational number falls into; "does not
terminate" alone does not imply irrational — repeating decimals are
also rational.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.8.

## Tutor Recovery Strategy

Likeliest utterance: "so 0.333... isn't REALLY equal to 1/3, it's just
really really close, right?" — the concept-specific smaller question:
"what happens if you do the long division of 1 divided by 3, step by
step — does it ever actually stop or change?" directly surfaces MC-1 by
walking the learner through the mechanical proof of exactness (the
remainder recurs identically forever), converting an intuitive
"forever means imprecise" feeling into a concrete demonstration of
exact, infinite, predictable repetition.

## Memory Hooks

**Type**: procedural (long division revealing a recurring remainder;
precise bar-notation reading) + declarative (repeating decimals are
exact, not approximate; not every infinite decimal repeats). Review
form: fresh fraction-to-repeating-decimal conversion prompts,
periodically paired with an irrational-number contrast to keep MC-3's
guard-rail active. Interleaving partner: `math.arith.
terminating-decimals` (the complementary, exhaustive case for rational
numbers).

## Transfer Connections

**Near transfer**:
- `math.arith.terminating-decimals` (per KG `related`; the
  complementary case — every rational number's decimal either
  terminates or repeats, exhaustively)

**Far transfer**:
- `math.found.rational-numbers` (per KG `related`; the
  terminating-or-repeating property is precisely what characterizes
  rational numbers' decimal expansions, distinguishing them from
  irrationals)
- Long division's remainder-cycling behavior directly explains WHY
  repetition occurs and predicts the maximum possible repeating-block
  length for a given denominator

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/
math.arith.repeating-decimals.md` (verified via directory listing
before authoring this entry). All misconceptions, demonstrations, and
assessment items above are authored directly for this Educational
Brain entry, not sourced from a Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.decimals`) and empty `unlocks`/`cross_links` are
consistent with its narrow, conceptual, terminal-leaf role in the
domain. Its two `related` links (`math.arith.terminating-decimals`,
`math.found.rational-numbers`) both reflect genuine conceptual
connections — the exhaustive terminating/repeating dichotomy and the
rational-number characterization respectively — neither is a formal KG
prerequisite.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
