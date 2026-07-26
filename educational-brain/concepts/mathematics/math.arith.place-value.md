# Place Value — `math.arith.place-value`

## Identity

- **Concept ID**: `math.arith.place-value` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent in KG;
  children: `math.arith.ones-tens-hundreds`, `math.arith.expanded-form`
- **Prerequisites**: `math.arith.counting` (counting establishes the
  natural number n=|S|; place value is how that number is WRITTEN in
  base-10 positional notation).
- **Unlocks**: `math.arith.addition`, `math.arith.subtraction`,
  `math.arith.rounding`.
- **Related** (from KG): `math.arith.number-base`.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.9 · **Est. hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.arith.place-value.md`
  (PACKAGE_READY; MAMR: MC-1 DIGIT-IS-VALUE is FOUNDATIONAL; P76_mode
  independence, cross_links=[math.arith.number-base], not Tier 1).
- **Aliases** (from KG): "positional notation", "base-10 system",
  "decimal place value".

## Learning Objective

The learner can: state that in base-10 positional notation, the value
of a digit equals the digit (face value) multiplied by the power of
ten corresponding to its position; correctly compute the value of any
digit in a multi-digit numeral; write any number in expanded form as a
SUM of positional terms, including terms where the digit is zero;
explain why a zero digit acts as a placeholder that cannot be dropped
without changing every other digit's position and value; and correctly
compare and order multi-digit numbers (including decimals) by scanning
place-value columns left to right.

## Core Understanding

`math.arith.counting` establishes that a set has a definite cardinality
n. Place value is the SYSTEM for WRITING n using the ten symbols 0-9
positioned left to right, where each position represents a fixed power
of 10: ones (10⁰), tens (10¹), hundreds (10²), thousands (10³), and so
on, extending rightward past a decimal point into tenths (10⁻¹),
hundredths (10⁻²), and beyond. The value contributed by any digit d at
position p is d×10^p — so the SAME digit symbol contributes wildly
different amounts depending purely on where it sits (3 in the ones
place contributes 3; the identical symbol 3 in the thousands place
contributes 3,000). Expanded form makes this explicit as a SUM:
4,307 = 4×10³ + 3×10² + 0×10¹ + 7×10⁰. The zero term is not omitted —
it is the placeholder that keeps every other digit in its correct
column; dropping it (4,307 → 437) silently shifts every remaining
digit one column to the right, producing an entirely different number.

## Mental Models

- **Beginner model — "a digit's value is just the digit itself"**: the
  learner names digits independently (reading "3,482" as the digits
  three, four, eight, two) without multiplying by the digit's
  positional power, so the digit '3' is always treated as worth "3,"
  regardless of whether it sits in the ones or thousands column.
  Shelf-life warning: this model can coexist with fluent reading of
  large numbers aloud, since correct pronunciation does not require
  correct positional-value computation.
- **Intermediate model — "value = digit × place, and I can compute this
  for any position, but I sometimes drop zero terms when writing
  expanded form"**: the learner correctly multiplies digit by
  positional power but treats a zero-valued term as contributing
  nothing worth writing down, missing that the zero term's PRESENCE
  (not its numeric contribution) is what confirms every other digit's
  column assignment. Upgrade trigger: being asked to compare two
  numbers that differ only by an internal zero (4,307 vs. 437) and
  explain why removing a zero changes every subsequent digit's value.
- **Advanced model — "the positional system is a continuous scale of
  powers of 10, crossing the decimal point without any special-case
  break, and zero is a first-class placeholder digit exactly as
  meaningful as any nonzero digit for confirming column position"**:
  the learner fluently writes full expanded form (including all zero
  terms) for numbers with internal and decimal zeros, and explains
  place value on either side of the decimal point using the identical
  underlying rule (each position is exactly ten times the position to
  its right). Upgrade trigger: comparing two decimals that differ only
  in a middle zero-vs-nonzero digit (e.g., 8.025 vs. 8.052) and
  correctly identifying the first differing column.
- **Do not upgrade early**: a learner who still treats digit value as
  face-value-only (beginner model, directly triggering MC-1) should not
  be pushed toward decimal place value (advanced model) before the
  core digit×place multiplication is fully secure — MC-1 is
  FOUNDATIONAL per the Blueprint's own MAMR and must clear before MC-2
  or MC-3.

## Why Students Fail

The dominant, FOUNDATIONAL failure reads a digit's symbol as its full
value, ignoring the multiplying effect of its column position entirely
(the '3' in 3,482 is treated as worth 3, not 3,000) — digit
recognition is typically taught before positional value, so students
practice naming digits independently long before learning that
position multiplies. A second failure treats "expanded form" as a
multiplication of the digits together (3,482 written as 3×4×8×2)
rather than a SUM of positional terms, likely because the visually
adjacent digit string invites a multiplication reading once the word
"expanded" is introduced. A third failure believes internal zeros can
be silently dropped (treating 4,307 as equivalent to 437), not
recognizing that a zero digit holds every subsequent column in its
correct position — removing it shifts every remaining digit one column
over, producing a genuinely different number.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: DIGIT-IS-VALUE (Foundational; Type 5 — instruction-induced)
**Trigger**: asked the value of the digit 3 in 3,482, learner answers
"3" instead of "3,000" — digit recognition (taught first, in
isolation) precedes place-value instruction, so students practice
naming digits independently before learning that position multiplies.
**Repair**: explicitly multiply — digit × place value = 3 × 1000 =
3,000 — using physical base-10 blocks (one 1000-cube per thousand) to
make the multiplication concrete.
**MAMR**: FOUNDATIONAL — every arithmetic operation (addition,
subtraction, comparison) depends on correctly knowing what each digit
contributes; must clear before MC-2 or MC-3.

### MC-2: EXPANDED-FORM-ADDITIVE-CONFUSION (Moderate; Type 4 — notation-induced)
**Trigger**: asked to write 3,482 in expanded form, learner writes
3×482 or 3×4×8×2 — the visually adjacent string of digits, combined
with the word "expanded," invites a multiplication reading of the
notation itself.
**Repair**: expanded form is a SUM (+), not a product (×), of terms —
each TERM is itself a multiplication (digit × place value), but the
terms are added: 3,000 + 400 + 80 + 2.

### MC-3: ZERO-PLACEHOLDER-INVISIBLE (Moderate; Type 1 — overgeneralization)
**Trigger**: asked to compare 4,307 and 437, learner treats them as
equal or is confused — over-generalizing from everyday number sense
where a leading or trailing zero often "adds nothing," to internal
zeros, which instead HOLD a column position.
**Repair**: build the place-value chart and demonstrate that removing
the internal zero collapses the entire grid — every digit to the left
of the removed zero shifts one column to the right, changing its
value.

## Analogies

**Primary — the house address (Blueprint's own analogy)**: the same
digit means different things depending on its position in an address —
the '3' in "300 Main St." is the hundreds digit of the building
number; the '3' in "3 Oak Ave." is the ones digit. Same digit,
completely different value, because of position. Place value works
identically: a '3' in the thousands column means 3,000; the same '3'
in the ones column means 3 — the digit alone tells you nothing without
its position.

**Anti-analogy to retire**: "Reading a number is just reading its
digits in order, left to right." This directly invites MC-1 by
suggesting each digit contributes its face value independently,
without multiplying by position.

## Demonstrations

**Digit-vs-value contrast (Blueprint's own contrast pair)**: for
3,482 — reading by position: thousands digit 3 × 1000 = 3,000;
hundreds digit 4 × 100 = 400; tens digit 8 × 10 = 80; ones digit 2 × 1
= 2; total 3,482 ✓. Reading by face value only: 3 → 3, 4 → 4, 8 → 8,
2 → 2 (unjustified "total" of 3,482 with no positional reasoning).

**Zero-collapse demonstration (Blueprint's own repair exercise)**:
4,307 with columns [4|Th][3|H][0|T][7|O] = 4,000+300+0+7 = 4,307.
Removing the internal 0 collapses to 437 with columns [4|H][3|T][7|O]
= 400+30+7 = 437 — a completely different number, since every digit to
the left of the removed zero shifted one column to the right.

**Decimal continuity (Blueprint's own pattern induction)**: the
positional scale extends unbroken across the decimal point — 10³, 10²,
10¹, 10⁰, then 10⁻¹, 10⁻², 10⁻³ — each position exactly ten times the
position to its right, with no special-case break at the decimal
point itself.

## Discovery Questions

Present the pair 4,307 and 437 and ask the learner to determine, using
base-10 blocks, whether they represent the same quantity — the learner
discovers firsthand that the block counts differ (and by how much)
before the placeholder-zero rule is stated formally. Recommendation:
guided discovery for the zero-collapse observation (directly
experiential from physically building both numbers with blocks);
direct instruction for the formal digit×place-value multiplication
rule (MC-1's repair), since the multiplicative relationship is not
independently rediscoverable without being told the rule.

## Teaching Sequence

Per the Blueprint's own MAMR policy: MC-1 (DIGIT-IS-VALUE) is
FOUNDATIONAL and cleared first — until face value and positional value
are distinguished, expanded form and the zero-placeholder rule cannot
be taught reliably. MC-2 (expanded-form-additive-confusion) and MC-3
(zero-placeholder-invisible) follow FIFO after MC-1 clears.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (digit is value) | WORKED EXAMPLE: digit-vs-value contrast with base-10 block build | Teaching Actions: SHOW §1 |
| MC-2 active (expanded form as multiplication) | WORKED EXAMPLE: expanded-form-as-sum contrast, term-by-term construction | Teaching Actions: SHOW §1 |
| MC-3 active (zero placeholder dropped) | DEMONSTRATION: zero-collapse column-shift demonstration | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: binary (base-2) place-value decoding using the same positional principle (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the VALUE of the digit" rather than just "the
digit" — the distinction between face value (the symbol) and
positional value (digit × place) is load-bearing and directly guards
against MC-1.

**Wait-time**: After presenting the 4,307-vs-437 comparison, give
extended wait-time before revealing the column-shift explanation — let
the learner locate, using blocks or a chart, where the numbers actually
differ.

**Load-bearing sentences**:
- "The value of a digit is the digit times its place value — never the
  digit alone."
- "A zero digit isn't nothing — it holds every other digit in its
  correct column."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): write 508,070 in expanded form; state
the value of digit 5. Pass: correct expanded form with all zero terms
included; 5 → 500,000.

**Gate 2** (Blueprint Problem 2): evaluate a student's claim that
2,005 = 2×10³ + 5×10⁰ is complete expanded form. Pass: correctly
identifies the missing zero terms (0×10² and 0×10¹) and explains why
they are necessary.

**Gate 3** (Blueprint Problem 3): order 8.025, 8.205, 8.250, 8.052 from
least to greatest, identifying the first distinguishing position. Pass:
correct ordering with tenths-place reasoning stated.

**Gate 4** (Blueprint Problem 4): construct the 6-digit number with
specified nonzero digits in the ten-thousands, hundreds, and ones
places and zero elsewhere. Pass: 040,703 → 40,703, correctly written.

**Gate 5** (Blueprint P76, independence transfer probe): decode a
binary (base-2) number using the same positional principle applied to
base 10; explain place value in one sentence without referencing "base
10" specifically. Pass: correct binary-to-decimal conversion and a
base-agnostic definition of place value.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.9 (⌈0.9×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I thought 4,307 and 437 were basically the same
number, just written differently — aren't the digits all there?" — the
concept-specific smaller question: "how many 1000-blocks does each
number need?" reframes the confusion from an assumed notational
equivalence into a directly countable, concrete difference (4 vs. 0
thousand-blocks), using evidence the learner can verify themselves
rather than an asserted rule.

## Memory Hooks

**Type**: procedural (constructing and verifying digit×place-value
computations, expanded form, and column-aligned comparisons) +
declarative (the positional powers-of-10 table, the placeholder-zero
rule). Review form: fresh "value of this digit" and "expanded form of
this number" prompts across increasingly large and decimal-extended
numbers, periodically paired with a zero-collapse spotting exercise to
keep MC-3's guard-rail active. Interleaving partner:
`math.arith.counting` (the cardinality this system exists to write
down).

## Transfer Connections

**Near transfer**:
- `math.arith.addition` (per KG `unlocks`; column addition requires
  knowing which place-value columns to add together)
- `math.arith.subtraction` (per KG `unlocks`; borrowing/regrouping
  requires understanding that 1 ten = 10 ones, a direct place-value
  exchange)
- `math.arith.rounding` (per KG `unlocks`; rounding requires
  identifying a target position and inspecting the adjacent position)

**Far transfer**:
- `math.arith.number-base` (per KG `cross_links`, not Tier 1;
  generalizes the identical positional principle to bases other than
  10 — binary, hexadecimal — per the Blueprint's own transfer probe)
- Computer science: binary and hexadecimal number representations
  directly reuse the positional-power structure with a different base

## Cross-Subject Connections

Per KG `cross_links` [`math.arith.number-base`]: not Tier 1 per the
Blueprint's own GR-9 determination, so the P76 transfer probe uses
independence mode (a self-contained binary-decoding exercise) rather
than a genuine cross-link probe requiring prior mastery of
`math.arith.number-base`. Not fabricated beyond what the KG and
Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.place-value.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A04/mastery
gate), Protocol B repair chains (B-1 through B-3), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.counting`) and its three unlocks (`math.arith.addition`,
`math.arith.subtraction`, `math.arith.rounding`) match the Blueprint's
own Component 7 exactly. Its relatively high estimated hours (10,
tied for the highest so far in `math.arith`) is appropriate given the
concept's genuine breadth — whole-number, expanded-form, zero-
placeholder, and decimal place value are all covered under one KG node.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 3, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
