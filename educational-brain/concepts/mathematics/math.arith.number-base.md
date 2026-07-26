# Number Base — `math.arith.number-base`

## Identity

- **Concept ID**: `math.arith.number-base` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent or
  children in KG
- **Prerequisites**: `math.arith.place-value` (the positional principle
  this concept generalizes to bases other than 10).
- **Unlocks**: `math.disc.boolean-circuits`.
- **Related** (from KG): `math.arith.place-value`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.8 · **Est. hours**: 4
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.number-base.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "base-n notation", "binary", "hexadecimal",
  "positional numeral system".

## Learning Objective

The learner can: state that a base-b positional numeral system uses b
distinct digit symbols (0 through b-1) with each position representing
a power of b; correctly convert numbers between base 10 and another
base (particularly base 2/binary, base 16/hexadecimal); and correctly
read a number in a non-base-10 system without importing base-10
reading conventions.

## Core Understanding

`math.arith.place-value` established that base 10 uses ten digit
symbols (0-9) with each position representing a power of 10. A
GENERAL positional numeral system generalizes this: a base-b system
uses exactly b distinct digit symbols (0 through b-1) with each
position representing a power of b instead of 10. Binary (base 2) uses
only the digits 0 and 1, with positions representing powers of 2:
binary 101 means 1×2²+0×2¹+1×2⁰=4+0+1=5 in base 10. Hexadecimal (base
16) needs 16 distinct symbols, so digits 0-9 are supplemented with
letters A-F standing for the values 10 through 15 — hex "A3" means
10×16¹+3×16⁰=160+3=163 in base 10. The SAME positional principle
(digit × base^position, summed) applies universally; only the base
value and the set of digit symbols change.

## Mental Models

- **Beginner model — "all number systems use the digits 0-9, no matter
  what 'base' means"**: the learner has learned the WORD "base" but
  treats every positional system as if it still used ten digit symbols,
  producing invalid strings like "binary 12" (12 is not a valid binary
  digit at all). Shelf-life warning: this model produces plausible-
  looking but meaningless output that isn't immediately flagged as
  wrong without an explicit valid-digit check.
- **Intermediate model — "each base has its own valid set of digit
  symbols, and I read a base-b numeral's positions as powers of b, but
  I still sometimes default to reading the DIGITS themselves as if
  they were base-10 quantities"**: the learner correctly restricts
  digit symbols to the valid set for a given base but occasionally
  misreads the overall MAGNITUDE of a base-b numeral using base-10
  intuition (e.g., glancing at binary "101" and thinking "one hundred
  one" before converting). Upgrade trigger: being asked to convert a
  multi-digit binary number to base 10 and explicitly compute each
  position's power-of-2 contribution.
- **Advanced model — "positional value is digit × base^position,
  computed identically regardless of base, and I fluently convert
  between any two bases by applying this one formula, including
  hexadecimal's letter digits"**: the learner fluently converts among
  base 10, base 2, and base 16, correctly treating hex letters A-F as
  single digit symbols worth 10-15, not as algebraic variables. Upgrade
  trigger: being asked to convert a number directly between base 2 and
  base 16 (via grouping bits) without passing through base 10 as an
  intermediate step.
- **Do not upgrade early**: a learner who still assumes all bases use
  digits 0-9 (beginner model, MC-1) should not be pushed toward direct
  base-to-base conversion (advanced model) before the valid-digit-set
  restriction and the power-of-b positional rule are both secure —
  MC-1 is FOUNDATIONAL, since every subsequent conversion skill
  depends on correctly restricting to the base's own digit set.

## Why Students Fail

The dominant, FOUNDATIONAL failure assumes every positional numeral
system uses the familiar ten digit symbols (0-9), producing invalid or
meaningless strings in a different base (treating "12" as a valid
binary numeral, when binary permits only 0 and 1) — years of exclusive
base-10 experience make the ten-symbol assumption feel universal
rather than base-10-specific. A second failure reads a base-b
numeral's overall magnitude using base-10 reading conventions,
misinterpreting binary 101 as "one hundred one" rather than computing
its actual base-10 value (5) via powers of 2 — importing the WRONG
base's positional-value convention onto a numeral written in a
different base. A third failure treats hexadecimal's letter digits
(A-F) as algebraic variables rather than single digit symbols standing
for fixed numeric values (10 through 15), since letters normally
signal "unknown quantity" throughout the rest of mathematics.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: BASE-10-DIGITS-ASSUMED-UNIVERSAL (Foundational; Type 1 — overgeneralization)
**Description**: Learner assumes every positional system uses the ten
familiar digit symbols (0-9), producing invalid numerals in a
different base — e.g., treating "12" as valid binary, when binary's
digit set is restricted to {0,1}.
**Trigger condition**: asked to identify whether a given string is a
valid numeral in a specified base, especially binary or another
low-base system.
**Repair target**: state explicitly that a base-b system uses EXACTLY
b digit symbols (0 through b-1) — binary permits only 0,1; base 8
(octal) permits only 0-7; verify a numeral's validity by checking every
digit against the base's own valid range before doing anything else
with it.
**MAMR**: FOUNDATIONAL — every later conversion or reading skill
depends on first restricting to the correct digit set; must clear
before MC-2 or MC-3.

### MC-2: POSITIONAL-VALUE-STAYS-POWERS-OF-TEN (Moderate; Type 6 — analogy overextension)
**Description**: Learner reads a base-b numeral's magnitude using
base-10 positional conventions — misreading binary 101 as "one hundred
one" — over-extending base-10's own powers-of-10 reading habit onto a
numeral that is actually structured with powers of a DIFFERENT base.
**Trigger condition**: asked for the base-10 value of a multi-digit
numeral written in a different base, without first being reminded
which base governs it.
**Repair target**: explicitly recompute using powers of the CORRECT
base — binary 101 = 1×2²+0×2¹+1×2⁰=4+0+1=5, not "one hundred one";
always identify which base's powers apply before evaluating a
positional numeral.

### MC-3: HEXADECIMAL-LETTERS-AS-VARIABLES (Moderate; Type 3 — language contamination)
**Description**: Learner treats hexadecimal's letter digits (A-F) as
algebraic unknowns rather than fixed digit symbols standing for 10
through 15 — the everyday mathematical convention that letters signal
"unknown quantity" contaminates their role as ordinary, fixed-value
digit symbols in hex.
**Trigger condition**: asked to evaluate or convert a hexadecimal
numeral containing a letter digit (e.g., hex "A3" or "1F").
**Repair target**: state explicitly that in hexadecimal, A, B, C, D, E,
F are simply the NAMES given to the fixed values 10, 11, 12, 13, 14, 15
— no different in kind from how "9" names the fixed value nine; they
are not variables to solve for.

## Analogies

**Primary — a 12-hour and 24-hour clock as different "bases" for time
(a familiar dual-system contrast)**: a 12-hour clock cycles through 12
distinct hour-labels before repeating; a 24-hour clock cycles through
24 before repeating — the SAME underlying time is represented with
different symbol sets and cycle lengths depending on which clock
convention is used. Number bases work identically: the same quantity
(a count of things) is represented with different digit-symbol sets
and cycle lengths (2 symbols cycling for binary, 10 for decimal, 16
for hex) depending on which base is chosen.

**Anti-analogy to retire**: "A different base just means writing
numbers with fewer or more digits, but the digits themselves work the
same." This directly invites MC-1 by suggesting the SET of valid
digit symbols doesn't actually change between bases.

## Demonstrations

**Valid-digit-set contrast (targets MC-1)**: binary permits only {0,1}
— "binary 12" is invalid (2 isn't a valid binary digit) the same way
"decimal number using the symbol Ж" would be invalid in base 10; octal
(base 8) permits {0-7} — "octal 8" is invalid, since 8 isn't a valid
octal digit.

**Powers-of-the-correct-base contrast (targets MC-2)**: binary 101
evaluated with base-10 reading habits ("one hundred one," WRONG) versus
evaluated correctly with powers of 2: 1×2²+0×2¹+1×2⁰=4+0+1=5 (base-10
value 5).

**Hex-letters-as-fixed-digits contrast (targets MC-3)**: hex "A3"
evaluated correctly as 10×16¹+3×16⁰=160+3=163 (A is simply the FIXED
value 10, not an unknown to solve for) — contrasted against an actual
algebraic expression like "a3" (a variable times 3), which IS solved
for an unknown, a genuinely different kind of symbol use entirely.

## Discovery Questions

Present the binary string "12" and ask the learner whether it's a
valid binary numeral before any rule is stated — the learner discovers,
by attempting to interpret the digit "2" within a system that (once
told) only permits 0 and 1, that something is structurally wrong,
motivating the valid-digit-set rule from a concrete puzzle.
Recommendation: guided discovery for the valid-digit-set boundary
(directly experiential from the "12"-in-binary puzzle); direct
instruction for computing positional value in a non-base-10 system
(MC-2's repair), since the powers-of-b computation is not
independently rediscoverable without being demonstrated.

## Teaching Sequence

MC-1 (base-10 digits assumed universal) is addressed first, since
restricting to a base's valid digit set is the foundational check
every later reading or conversion step depends on. MC-2 (positional
value stays powers of ten) is addressed second, once valid-digit
recognition is secure. MC-3 (hexadecimal letters as variables) is
addressed last, as a narrower, hex-specific confusion rather than a
general base-system misunderstanding.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (base-10 digits assumed universal) | DEMONSTRATION: valid-digit-set contrast ("binary 12" puzzle) | Teaching Actions: SHOW §3 |
| MC-2 active (positional value stays powers of ten) | WORKED EXAMPLE: binary-101-evaluated-correctly-via-powers-of-2 | Teaching Actions: SHOW §1 |
| MC-3 active (hex letters as variables) | DEMONSTRATION: hex-A3-vs-algebraic-a3 contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: convert a number directly between binary and hexadecimal by grouping bits | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "which base's powers apply here?" as the default
opening question for any positional-value task — naming the base
explicitly is load-bearing and directly guards against MC-2.

**Wait-time**: After presenting "binary 12," give extended wait-time
before revealing the invalidity — let the learner attempt to make
sense of a digit that doesn't belong to the stated base's valid set.

**Load-bearing sentences**:
- "A base-b system has exactly b valid digit symbols — no more, no
  fewer."
- "Hex letters are fixed values, not unknowns to solve for."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Is "203" a valid numeral in base 3? Pass: no — base 3 permits only
{0,1,2}; the digit "3" itself is invalid.

### Gate 2 (MC-2 check)
Convert binary 1101 to base 10. Pass: 1×2³+1×2²+0×2¹+1×2⁰=8+4+0+1=13.

### Gate 3 (MC-3 check)
Convert hexadecimal "2F" to base 10. Pass:
2×16¹+15×16⁰=32+15=47, correctly treating F as the fixed value 15.

### Gate 4 (conversion application)
Convert the base-10 number 26 to binary. Pass: 11010
(16+8+0+2+0=26).

### Transfer probe (independence mode — no cross_links beyond
`math.disc.boolean-circuits`, which this concept unlocks rather than
requires)
A computer's memory address is often shown in hexadecimal for
compactness, though the underlying hardware operates in binary.
Convert hexadecimal "1F" directly to binary by converting each hex
digit to its 4-bit binary equivalent (1→0001, F→1111), then verify by
also converting "1F" to base 10 and that base-10 value's binary
equivalent independently, confirming both paths agree. Pass: 1F →
binary 00011111; base-10 value 31; 31 in binary independently computed
as 11111 (with the leading zero from the 4-bit grouping optionally
dropped) — both paths agree.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.8.

## Tutor Recovery Strategy

Likeliest utterance: "I saw '101' and just read it as one hundred one
— why is that wrong?" — the concept-specific smaller question: "which
base is this number written in?" directly surfaces MC-2 by forcing the
learner to check which base's powers actually apply before assigning
any magnitude to the numeral, converting an automatic base-10 habit
into a deliberate, checkable first step.

## Memory Hooks

**Type**: procedural (converting between bases via the powers-of-b
computation) + declarative (the valid-digit-set restriction per base;
hex letters as fixed digit values). Review form: fresh conversion
prompts mixing binary, hex, and base-10, periodically paired with a
"is this a valid numeral in this base?" spot-check to keep MC-1's
guard-rail active. Interleaving partner: `math.arith.place-value` (the
positional principle this concept generalizes).

## Transfer Connections

**Near transfer**:
- `math.disc.boolean-circuits` (per KG `unlocks`; binary place value is
  the direct numeric foundation for boolean/digital-circuit
  representations)

**Far transfer**:
- Computer science: memory addressing, color codes (hexadecimal), and
  low-level data representation all directly rely on non-base-10
  positional systems
- `math.arith.place-value` (per KG `related`; the general positional
  principle this concept is a direct generalization of)

## Cross-Subject Connections

Per KG `cross_links` [`math.disc.boolean-circuits`]: this is the same
concept as the KG's `unlocks` field, reflecting that number-base
understanding is the numeric foundation boolean-circuit representation
directly builds on, rather than a separate lateral connection. No
Educational Brain entry yet exists for `math.disc.boolean-circuits`
(verified via directory listing) — the transfer probe above is
constructed in independence mode, self-contained without requiring
prior boolean-circuit knowledge, consistent with this program's
established convention for un-authored cross-link targets.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.number-base.md`
(verified via directory listing before authoring this entry). All
misconceptions, demonstrations, and assessment items above are
authored directly for this Educational Brain entry, not sourced from a
Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.place-value`) and single unlock (`math.disc.
boolean-circuits`) are coherent — place value is the exact positional
principle this concept generalizes, and boolean circuits are the
direct downstream application of binary place value.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
