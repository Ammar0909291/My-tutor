# Addition — `math.arith.addition`

## Identity

- **Concept ID**: `math.arith.addition` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; children: `math.arith.carrying`, `math.arith.column-addition`,
  `math.arith.mental-addition`
- **Prerequisites**: `math.arith.counting` (cardinality is well-defined
  and independent of labeling order), `math.arith.place-value` (each
  digit's value = digit × 10^position, enabling column-by-column
  computation).
- **Unlocks**: `math.arith.subtraction`, `math.arith.multiplication`.
- **Related** (from KG): `math.arith.subtraction`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.95 · **Est. hours**: 12
- **Blueprint**: `docs/curriculum/blueprints/math.arith.addition.md`
  (PACKAGE_READY; MAMR: MC-1 CARRYING-BREAKDOWN is FOUNDATIONAL;
  P76_mode cross-link probe, cross_links=[math.linalg.vector-addition
  (Tier 1), math.abst.group-operation (not Tier 1)]).
- **Aliases** (from KG): "summation", "plus", "sum".

## Learning Objective

The learner can: compute the sum of two disjoint collections as the
total cardinality of their union, |A∪B| = |A|+|B|; correctly execute
multi-digit column addition with carrying, understanding a column sum
of 10 or more must regroup one unit into the next column rather than
being written whole; state and apply the commutative law (a+b=b+a),
recognizing the combined collection's size doesn't depend on which
pile is counted first; and correctly compute a+0=0+a=a, distinguishing
addition's identity element (zero adds nothing) from multiplication's
annihilator (zero times anything is zero).

## Core Understanding

Addition is the binary operation computing the total cardinality of
two DISJOINT sets: given A and B with |A|=a, |B|=b, A∩B=∅, then
a+b=|A∪B| — reusing `math.arith.counting`'s own bijection-based
cardinality definition directly. Positional notation (`math.arith.
place-value`) makes addition computable column by column: when a
column's digit sum reaches 10 or more, exactly ten units of that
column's place value regroup into one unit of the NEXT column — this
"carrying" is not an arbitrary procedural rule but a direct consequence
of place-value's own structure (a column holds exactly one digit,
0-9). Addition is COMMUTATIVE (a+b=b+a) because it measures the size
of the SAME combined collection regardless of which pile is counted
first — order of combination is a measurement convenience, not part of
the operation itself. Zero is addition's IDENTITY element (a+0=a,
combining with an empty collection leaves the total unchanged) — a
fundamentally different role than zero's ANNIHILATING role in
multiplication (a×0=0).

## Mental Models

- **Beginner model — "addition is combining two piles, and each
  column's digits are added and written down directly"**: the learner
  correctly grasps addition as combination but has not yet internalized
  that a column sum of 10 or more cannot simply be written in that
  column — producing errors like 47+35→"712" (writing the full "12" in
  the ones position). Shelf-life warning: this model produces correct
  answers whenever no column sum reaches 10, delaying detection of the
  carrying gap until multi-digit problems with larger digits appear.
- **Intermediate model — "I carry correctly whenever a column sum
  reaches 10 or more, and I understand a+b=b+a, but I'm not fully
  confident that adding zero never changes the value once
  multiplication is also in play"**: the learner reliably executes
  carrying and commutes addends but, having seen a×0=0, occasionally
  extends that annihilating behavior to a+0 as well. Upgrade trigger:
  being asked to explicitly contrast a+0 against a×0 side by side and
  articulate why they differ.
- **Advanced model — "addition is the cardinality of a disjoint union;
  carrying is base-10 regrouping, not an arbitrary rule; commutativity
  and the zero identity both follow directly from what 'combining
  collections' actually means; and this SAME operation generalizes
  to vectors and abstract groups"**: the learner fluently executes
  multi-digit addition with any number of carries, correctly explains
  commutativity and the zero identity from the underlying
  set-combination definition, and recognizes addition's structure
  extending to component-wise vector addition. Upgrade trigger: being
  asked to compute vector addition component-wise and confirm
  commutativity holds there too, using the identical binary operation.
- **Do not upgrade early**: a learner who still writes column sums
  without carrying (beginner model, MC-1) should not be pushed toward
  commutativity or the zero identity (intermediate/advanced models)
  before carrying is fully secure — MC-1 is FOUNDATIONAL per the
  Blueprint's own MAMR and must clear first.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats each column independently
when a column's digit sum reaches 10 or more, writing the full sum in
that single column rather than recognizing that "10 ones = 1 ten"
forces a carry into the next column — 47+35 becomes "712" instead of
82. A second failure models addition as sequential counting-on, where
the STARTING number determines the result, leading to the belief that
5+3 and 3+5 might genuinely differ — missing that addition measures
the size of a combined collection, which is identical regardless of
which pile is counted first. A third failure over-generalizes
multiplication's zero-annihilation rule (a×0=0) onto addition,
computing a+0 as 0 instead of a — not distinguishing addition's
identity element from multiplication's annihilator, two structurally
opposite roles zero plays in the two operations.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: CARRYING-BREAKDOWN (Foundational; Type 5 — instruction-induced)
**Trigger**: computing 47+35, learner writes the full column sum
without carrying (ones: 7+5=12 → writes "12" directly, giving 712) —
treats each column independently, not yet understanding "10 ones = 1
ten" forces a carry.
**Repair**: each column holds exactly one digit (0-9); when ones sum to
12, that's 1 ten + 2 ones — the 2 ones stay, the 1 ten carries into
the tens column. This is place-value being enforced, not an arbitrary
rule.
**MAMR**: FOUNDATIONAL — carrying must be correct before commutativity
or the zero identity are explored; must clear before MC-2 or MC-3.

### MC-2: COMMUTATIVITY-UNKNOWN (Moderate; Type 2 — perceptual intuition)
**Trigger**: claims 5+3 ≠ 3+5 because "the starting number determines
the result" — models addition as sequential counting-on, where the
FIRST number counted feels like it should matter to the outcome.
**Repair**: represent 5+3 as five squares then three squares, and 3+5
as three squares then five squares — both arrangements contain the
IDENTICAL 8 squares; the collection is the same regardless of which
group is listed first.

### MC-3: ZERO-ANNIHILATES (Moderate; Type 6 — analogy overextension)
**Trigger**: computes a+0 as 0 instead of a — over-extends
multiplication's zero-annihilation rule (a×0=0) onto addition, where
the two operations behave oppositely with zero.
**Repair**: adding zero means combining with an EMPTY pile — the
empty pile contributes nothing, so the original pile is unchanged
(a+0=a). Multiplying by zero means taking ZERO COPIES of a (a×0=0) — a
fundamentally different operation. Contrast the two directly: 5+0=5
(identity) versus 5×0=0 (annihilator).

## Analogies

**Primary — combining two piles of counters (Blueprint's own opening
analogy)**: 47 red counters in one pile, 35 blue counters in another,
pushed together into one big pile — the total doesn't depend on which
pile you start counting, only on how many are in each. Addition is
the shortcut for this combination, using place value to compute the
total efficiently rather than counting all counters one by one.

**Anti-analogy to retire**: "Addition means writing down whatever each
column adds up to." This directly invites MC-1 by suggesting each
column's sum is simply recorded as-is, with no regrouping step when
that sum reaches 10 or more.

## Demonstrations

**Carrying demonstration (Blueprint's own worked example pair)**:
47+35 — ones: 7+5=12, write 2, carry 1 to tens; tens: 4+3=7, plus
carried 1 = 8. Answer: 82. A double-carry case, 376+457: ones 6+7=13
(write 3, carry 1); tens 7+5=12+1=13 (write 3, carry 1); hundreds
3+4=7+1=8. Answer: 833.

**Commutativity by pattern induction (Blueprint's own pattern
set)**: 3+5=8 and 5+3=8; 12+7=19 and 7+12=19; 47+35=82 and 35+47=82 —
a+b=b+a holds for every pair, because both sides measure the size of
the identical combined collection.

**Zero-identity-vs-annihilator contrast (Blueprint's own contrast
pair)**: 5+3=8 (two non-empty piles combine); 5+0=5 (adding an empty
pile — total unchanged); 0+7=7 (zero is the additive identity); versus
5×0=0 (multiplication by zero annihilates — a genuinely different
operation).

## Discovery Questions

Present "6 apples in one basket and 4 in another, combined; now switch
the order — 4 in one and 6 in another, combined" and ask for both
totals before commutativity is stated formally — the learner discovers
both totals agree (10 both times) directly from the physical
combination. Recommendation: guided discovery for the commutativity
observation (directly experiential from combining the same collections
in different orders); direct instruction for the carrying mechanism
and the zero-identity-vs-annihilator distinction (MC-1 and MC-3's
repairs), since neither is independently rediscoverable without being
demonstrated.

## Teaching Sequence

Per the Blueprint's own MAMR policy: MC-1 (carrying breakdown) is
FOUNDATIONAL and must clear first — carrying must be correct before
commutativity or the zero identity are explored. MC-2 (commutativity
unknown) and MC-3 (zero annihilates) follow, addressed via pattern
induction and contrast pair respectively; if both MC-1 and MC-2 trigger
simultaneously, MC-1 is addressed first per the Blueprint's own
explicit note.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (carrying breakdown) | WORKED EXAMPLE: single-carry and double-carry column-addition pair | Teaching Actions: SHOW §1 |
| MC-2 active (commutativity unknown) | DEMONSTRATION: same-collection-different-order pattern induction | Teaching Actions: SHOW §3 |
| MC-3 active (zero annihilates) | DEMONSTRATION: zero-identity-vs-multiplication-annihilator contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: component-wise vector addition confirming commutativity (Blueprint P76, cross-link) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "regroup" or "carry" explicitly and name them as
synonyms rather than assuming familiarity — and always state which
column is being carried INTO, since vague carrying language is where
MC-1 hides longest.

**Wait-time**: After presenting a 3-digit addition requiring two
carries, give extended wait-time before revealing each carry step —
let the learner attempt each column and self-correct if a carry is
missed.

**Load-bearing sentences**:
- "A column holds exactly one digit — ten or more must carry into the
  next column."
- "Adding zero leaves the pile unchanged; multiplying by zero empties
  it. These are opposite effects."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
cross-link transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): compute 385+247. Pass: 632.

**Gate 2** (Blueprint Problem 2): compute 1,594+2,786. Pass: 4,380.

**Gate 3** (Blueprint Problem 3): a shop has 439 red pens and 361 blue
pens — total? Pass: 800.

**Gate 4** (Blueprint Problem 4): true/false — 999,999+0=0+999,999=
999,999, naming both laws illustrated. Pass: true; identity and
commutative laws named.

**Gate 5** (Blueprint P76, cross-link probe to `math.linalg.
vector-addition`): compute u+(12,47), v=(8,53) component-wise both
orders, confirm equality, name the law. Pass: (20,100) both orders;
commutative law identified.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.95 (⌈0.95×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I added the columns but my answer looks way too
big — like 712 instead of something smaller" — the concept-specific
smaller question: "does a single column ever hold two digits?"
directly surfaces MC-1 by pointing the learner at the specific column
where "12" was written whole, converting a vague sense that "something
is off" into a locatable, self-correctable error.

## Memory Hooks

**Type**: procedural (column-by-column addition with carrying) +
declarative (the commutative law; the zero identity vs. the
multiplicative annihilator). Review form: fresh multi-digit addition
problems with varying numbers of carries, periodically paired with a
"does order matter here?" and a "what does adding/multiplying by zero
do?" spot-check to keep MC-2 and MC-3's guard-rails active.
Interleaving partner: `math.arith.place-value` (the column-value
system carrying depends on).

## Transfer Connections

**Near transfer**:
- `math.arith.subtraction` (per KG `unlocks`; subtraction is
  addition's inverse, a-b=c iff c+b=a)
- `math.arith.multiplication` (per KG `unlocks`; multiplication is
  repeated addition, a×b=a+a+…+a, b times)

**Far transfer**:
- `math.linalg.vector-addition` (per KG `cross_links`, Tier 1;
  component-wise addition is the identical binary operation applied
  to each coordinate of ℝⁿ)
- `math.abst.group-operation` (per KG `cross_links`, not Tier 1;
  addition is the canonical abelian group operation on ℤ)

## Cross-Subject Connections

Per KG `cross_links` [`math.linalg.vector-addition` (Tier 1), `math.
abst.group-operation` (not Tier 1)]: P76_mode is cross-link probe per
the Blueprint's own GR-9 determination. The transfer probe extends
addition's commutative law directly to component-wise vector addition,
requiring no prior knowledge of vectors beyond the rule given inline
(per the Blueprint's own Teaching Notes).

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.addition.md`
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

No structural KG issues found. This concept's two prerequisites
(`math.arith.counting`, `math.arith.place-value`) and two unlocks
(`math.arith.subtraction`, `math.arith.multiplication`) match the
Blueprint's own Component 7 exactly. Its relatively high estimated
hours (12, the highest in `math.arith` so far) is appropriate given
the concept's genuine three-cluster scope (carrying mechanics,
commutativity, zero identity) explicitly acknowledged in the
Blueprint's own Teaching Notes as warranting an extended (5-TA)
structure.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
