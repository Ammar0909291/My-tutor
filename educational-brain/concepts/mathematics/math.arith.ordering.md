# Ordering Numbers — `math.arith.ordering`

## Identity

- **Concept ID**: `math.arith.ordering` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent or
  children in KG
- **Prerequisites**: `math.arith.number-line` (the formal position-based
  ordering rule this concept generalizes and formalizes with symbols).
- **Unlocks**: `math.arith.absolute-value`.
- **Related** (from KG): `math.found.total-order`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.9 · **Est. hours**: 3
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.ordering.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "comparing numbers", "greater than, less
  than".

## Learning Objective

The learner can: correctly use the relations <, >, ≤, ≥ to state the
relative size of two numbers, based on their position on the number
line; correctly distinguish strict relations (<, >, excluding
equality) from non-strict relations (≤, ≥, including equality); and
correctly interpret and construct compound inequalities (such as
2 < x < 5) as a single statement that x lies BETWEEN two bounds,
rather than two unrelated comparisons.

## Core Understanding

`math.arith.number-line` established that for any two numbers a, b,
a<b if and only if a is positioned to the LEFT of b on the number
line. This concept formalizes that rule with explicit symbols: < means
"is less than" (strictly, excluding equality), > means "is greater
than" (strictly), ≤ means "is less than OR EQUAL to," and ≥ means "is
greater than or equal to." The STRICT relations (<, >) exclude the
case where the two values are equal; the NON-STRICT relations (≤, ≥)
include it — 5≤5 is TRUE (equality is permitted), while 5<5 is FALSE
(equality is excluded). A COMPOUND inequality like 2<x<5 is a single
combined statement meaning "x is greater than 2 AND x is less than
5" — x lies strictly between 2 and 5 — not two separate, unrelated
facts to be read independently.

## Mental Models

- **Beginner model — "< and > both mean 'compare these two numbers,'
  and I sometimes mix up which direction each symbol points"**: the
  learner understands ordering conceptually but frequently misreads
  the asymmetric < / > symbols themselves, reading "3<5" backwards as
  "3 is greater than 5" or vice versa. Shelf-life warning: this model
  can coexist with correct number-line reasoning, since the CONCEPT of
  order may be sound while the SYMBOL-to-meaning mapping is unreliable.
- **Intermediate model — "I read < and > correctly and reliably, but I
  treat ≤ and < (or ≥ and >) as basically interchangeable"**: the
  learner has cleared the symbol-direction confusion but doesn't
  consistently track whether equality is included, producing errors on
  boundary cases (e.g., accepting x=5 as satisfying x<5 when it should
  only satisfy x≤5). Upgrade trigger: being asked whether a specific
  boundary value satisfies a strict versus a non-strict inequality,
  and explaining the difference explicitly.
- **Advanced model — "< / > / ≤ / ≥ are four distinct, precisely
  defined relations, and a compound inequality like 2<x<5 is ONE
  statement — x is strictly between 2 and 5 — that I can split into
  and recombine from its two component comparisons at will"**: the
  learner fluently applies all four relations with correct
  equality-inclusion, and correctly interprets/constructs compound
  inequalities as unified betweenness statements. Upgrade trigger:
  being asked to write a compound inequality precisely capturing a
  described range, including whether either endpoint is included.
- **Do not upgrade early**: a learner who still confuses the direction
  of < and > (beginner model, MC-1) should not be pushed toward the
  strict/non-strict distinction or compound inequalities
  (intermediate/advanced models) before basic symbol-direction reading
  is fully secure — MC-1 is FOUNDATIONAL, since every later skill in
  this concept depends on correctly reading which direction each
  symbol points.

## Why Students Fail

The dominant, FOUNDATIONAL failure misreads the direction of the <
and > symbols themselves, interpreting "3<5" backwards as "3 is
greater than 5" — the symbols' visual asymmetry (an arrow-like shape
pointing toward the smaller value) is easy to misread without an
explicit, memorized anchor for which way each symbol points. A second
failure treats ≤ and < (or ≥ and >) as interchangeable, ignoring
whether the boundary value itself is included in the comparison —
producing errors specifically at boundary cases where a value equals
one side of the inequality. A third failure misreads a compound
inequality like 2<x<5 as two separate, unrelated statements rather
than one combined betweenness claim, sometimes evaluating only one of
the two component comparisons and ignoring the other.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: INEQUALITY-SYMBOL-DIRECTION-REVERSED (Foundational; Type 4 — notation-induced)
**Description**: Learner misreads the direction of < or >, interpreting
"3<5" as "3 is greater than 5" or vice versa — the symbols' visual
asymmetry (resembling an arrow or a mouth "opening toward" one side)
is easy to misread without an explicit, reliable anchor for which
direction each symbol points.
**Trigger condition**: any comparison written with the strict
inequality symbols, especially when the symbol's "open" and "point"
ends aren't consciously checked.
**Repair target**: give a reliable, explicit anchor — the symbol's
POINT (narrow end) always faces the SMALLER number, and the OPEN end
(wide end) always faces the LARGER number; verify against a known
example (3<5: the point faces 3, the open end faces 5) before trusting
an unfamiliar comparison.
**MAMR**: FOUNDATIONAL — every later skill in this concept (strict vs.
non-strict, compound inequalities) depends on correctly reading which
direction the base symbols point; must clear before MC-2 or MC-3.

### MC-2: STRICT-VS-NONSTRICT-CONFLATION (Moderate; Type 1 — overgeneralization)
**Description**: Learner treats ≤ and < (or ≥ and >) as basically
interchangeable, over-generalizing from everyday "roughly compares
size" language, where the distinction between "less than" and "less
than or equal to" often isn't emphasized in casual speech.
**Trigger condition**: any boundary-case comparison where the value
being tested exactly equals one side of the inequality (e.g., does
x=5 satisfy x<5? does it satisfy x≤5?).
**Repair target**: explicitly test the boundary value against BOTH
forms side by side — 5<5 is FALSE (5 is not strictly less than
itself), while 5≤5 is TRUE (5 is less than OR equal to itself) —
the symbols genuinely disagree exactly at the boundary, which is the
whole reason both forms exist.

### MC-3: COMPOUND-INEQUALITY-MISREAD-AS-SEPARATE (Moderate; Type 4 — notation-induced)
**Description**: Learner reads a compound inequality like 2<x<5 as two
disconnected statements rather than one combined betweenness claim —
the notation's linear, side-by-side written form doesn't visually
signal that both comparisons must hold simultaneously about the SAME
value x.
**Trigger condition**: any compound inequality task, especially
evaluating whether a specific value satisfies it or constructing one
from a verbal description.
**Repair target**: explicitly translate the compound form into its
"AND" meaning — 2<x<5 means "x>2 AND x<5, both at once" — checking a
candidate value requires verifying BOTH component comparisons hold
for that same value, not just one.

## Analogies

**Primary — the alligator's mouth (a widely-used, effective mnemonic
directly targeting MC-1)**: the inequality symbol's open, wide end is
like an alligator's open mouth, which always "eats" the BIGGER
number — the alligator's mouth (open end) faces the larger value, and
its pointed snout faces the smaller value. In 3<5, the wide-open end
faces 5 (the bigger number the alligator "wants to eat"), and the
point faces 3.

**Anti-analogy to retire**: "< and > just mean 'this side is smaller,
that side is bigger' — you can usually tell which is which from
context." This directly invites MC-1 by offering no reliable, explicit
rule for reading the symbol's direction, leaving the learner to guess
each time.

## Demonstrations

**Symbol-direction anchor (targets MC-1)**: 3<5 — the point (narrow
end) faces 3 (the smaller number), the open end faces 5 (the larger
number); contrasted against 5>3 — the same relationship, symbol
flipped, point still facing the smaller number (3), open end still
facing the larger (5).

**Boundary-case contrast (targets MC-2)**: testing x=5 against x<5
(FALSE — 5 is not strictly less than itself) and against x≤5 (TRUE —
5 equals 5, satisfying the "or equal to" clause) — the two forms
genuinely disagree exactly at this boundary value, which is precisely
why both symbols exist as distinct tools.

**Compound-inequality translation (targets MC-3)**: 2<x<5 translated
explicitly as "x>2 AND x<5" — testing x=3: is 3>2? yes. Is 3<5? yes.
Both hold, so x=3 satisfies the compound inequality. Testing x=6: is
6>2? yes. Is 6<5? no. Since one component fails, x=6 does NOT satisfy
the compound inequality, even though the first comparison alone looked
fine.

## Discovery Questions

Present the boundary case "does x=5 satisfy x<5?" alongside "does x=5
satisfy x≤5?" and ask the learner to evaluate both before any rule is
stated — the learner discovers the two forms genuinely disagree at
this exact value, motivating the strict/non-strict distinction from a
concrete, self-checkable disagreement. Recommendation: guided
discovery for the strict-vs-non-strict boundary distinction (directly
experiential from the x=5 disagreement); direct instruction for the
compound-inequality-as-AND translation (MC-3's repair), since the
"both conditions must hold simultaneously" reading is not
independently rediscoverable without the explicit AND-translation
being demonstrated.

## Teaching Sequence

MC-1 (inequality symbol direction reversed) is addressed first, since
correctly reading the base < and > symbols is the foundation every
later skill (strict/non-strict distinction, compound inequalities)
depends on. MC-2 (strict-vs-nonstrict conflation) is addressed second,
via the explicit boundary-case contrast. MC-3 (compound inequality
misread as separate) is addressed last, as it builds on both prior
skills to correctly interpret a combined statement.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (symbol direction reversed) | DEMONSTRATION: alligator's-mouth symbol-direction anchor | Teaching Actions: SHOW §3 |
| MC-2 active (strict-vs-nonstrict conflation) | DEMONSTRATION: x=5-boundary-case contrast (x<5 vs. x≤5) | Teaching Actions: SHOW §3 |
| MC-3 active (compound inequality misread as separate) | WORKED EXAMPLE: 2<x<5 translated to "AND," tested against x=3 and x=6 | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: construct a compound inequality precisely capturing a described range, including endpoint inclusion | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the point faces the smaller number" as the default
symbol-direction check — this concrete anchor is load-bearing and
directly guards against MC-1.

**Wait-time**: After presenting the x=5 boundary case against both x<5
and x≤5, give extended wait-time before revealing that the two forms
genuinely disagree — let the learner evaluate both independently and
notice the discrepancy themselves.

**Load-bearing sentences**:
- "The point of the symbol always faces the smaller number."
- "A compound inequality means both comparisons must hold at once —
  check them both, for the same value."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Is 7<4 true or false? Pass: false — correctly reads the symbol's
direction (7 is not less than 4).

### Gate 2 (MC-2 check)
Does x=8 satisfy x≥8? Does it satisfy x>8? Pass: satisfies x≥8 (true,
equality included); does not satisfy x>8 (false, strict exclusion).

### Gate 3 (MC-3 check)
Does x=4 satisfy 1<x<4? Does x=3 satisfy 1<x<4? Pass: x=4 does NOT
satisfy it (fails the strict x<4 part); x=3 DOES satisfy it (both
1<3 and 3<4 hold).

### Gate 4 (construction application)
Write a compound inequality stating that y is at least 2 and strictly
less than 10. Pass: 2≤y<10, correctly mixing a non-strict lower bound
with a strict upper bound.

### Transfer probe (independence mode — no cross_links)
A parking garage charges a flat rate for stays of at least 1 hour but
strictly less than 3 hours. Express this rule as a compound inequality
using a variable h for hours, and determine whether stays of exactly
h=1, h=2.5, and h=3 hours qualify for the flat rate. Pass: 1≤h<3;
h=1 qualifies (equality included at the lower bound); h=2.5 qualifies;
h=3 does NOT qualify (excluded by the strict upper bound).

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.9.

## Tutor Recovery Strategy

Likeliest utterance: "I always get < and > backwards, I can't tell
which way they point" — the concept-specific smaller question: "which
end of the symbol is pointy, and which end is wide open?" directly
supplies the alligator's-mouth anchor as an on-demand, checkable rule
the learner can apply to any future comparison, rather than relying on
memory alone.

## Memory Hooks

**Type**: procedural (correctly reading and applying <, >, ≤, ≥ to
compare numbers and evaluate compound inequalities) + declarative (the
strict-vs-non-strict distinction; the AND-meaning of compound
inequalities). Review form: fresh comparison and compound-inequality
prompts periodically including a boundary-case value, paired with an
occasional symbol-direction spot-check to keep MC-1's guard-rail
active. Interleaving partner: `math.arith.number-line` (the
position-based rule this concept formalizes with symbols).

## Transfer Connections

**Near transfer**:
- `math.arith.absolute-value` (per KG `unlocks`; absolute value is
  frequently defined and reasoned about via compound inequalities,
  e.g. |x|<5 meaning -5<x<5)

**Far transfer**:
- `math.found.total-order` (per KG `related`; the four ordering
  relations here are the concrete arithmetic instance of the abstract
  total-order structure)
- Algebra: solving and graphing inequalities directly builds on
  correctly reading and combining these relational symbols

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.ordering.md`
(verified via directory listing before authoring this entry). All
misconceptions, demonstrations, and assessment items above are
authored directly for this Educational Brain entry, not sourced from a
Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.number-line`) and single unlock (`math.arith.
absolute-value`) are coherent — the number line's position-based rule
is exactly what this concept formalizes with explicit relational
symbols, and absolute value is a natural next application (frequently
expressed via compound inequalities of the kind this concept
introduces).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
