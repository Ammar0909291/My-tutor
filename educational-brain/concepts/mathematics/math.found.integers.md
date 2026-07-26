# Integers — `math.found.integers`

## Identity

- **Concept ID**: `math.found.integers` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (no parent in KG;
  no children in KG)
- **Prerequisites**: `math.found.natural-numbers` (ℕ, Peano axioms,
  well-ordering, successor, recursive arithmetic — ℤ extends ℕ).
- **Unlocks**: `math.arith.negative-numbers`, `math.nt.divisibility`.
- **Related** (from KG): `math.found.natural-numbers`, `math.found.
  rational-numbers`.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.9 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.found.integers.md`
  (PACKAGE_READY; MAMR: MC-1 NEGATIVE-AS-SUBTRACTION is FOUNDATIONAL,
  cleared before MC-2 or MC-3 in all repair routing; P76 cross-link mode
  active, cross_links=[math.arith.negative-numbers]).
- **Aliases** (from KG): "ℤ", "whole numbers", "positive and negative
  integers".

## Learning Objective

The learner can: state that ℤ extends ℕ by adjoining additive inverses,
accepting negative integers as standalone ELEMENTS of ℤ rather than
merely results of subtraction; state the ring properties of ⟨ℤ,+,×⟩
(closed under + and ×, additive identity 0, additive inverses exist,
NOT closed under ÷); explain why ℤ is NOT well-ordered, contrasting
directly with ℕ; and compute with absolute value, sign, and the total
order on ℤ.

## Core Understanding

`math.found.natural-numbers` already establishes ℕ={0,1,2,…} with
Peano axioms, well-ordering, and recursive arithmetic. ℤ is the
smallest set containing ℕ and closed under additive inverses:
ℤ=ℕ∪{−n:n∈ℕ,n≠0}={…,−2,−1,0,1,2,…}. For every n∈ℕ, there is a UNIQUE
−n∈ℤ such that n+(−n)=0 — −n is an ELEMENT of ℤ with this defining
property, not a subtraction OPERATION. ⟨ℤ,+,×⟩ forms a **ring**:
closed under + and ×, + is commutative and associative, additive
identity 0 exists, additive inverses exist for every element, and ×
distributes over +. Division is NOT always possible in ℤ (e.g.,
1÷3∉ℤ) — this gap is the direct motivation for `math.found.
rational-numbers`, though ℚ itself is not taught here. Critically, ℤ is
**NOT well-ordered**: the subset {…,−3,−2,−1}⊂ℤ has no least element,
since it extends infinitely in the negative direction — this is the key
structural difference from ℕ, and means proof by induction, which
directly relies on ℕ's well-ordering, does not apply to all of ℤ
(though it applies to ℤ≥k for any fixed k, by a simple shift).
**Absolute value** |n|=n if n≥0, |n|=−n if n<0 (the distance from 0 on
the number line); **sign** sgn(n)=+1 if n>0, 0 if n=0, −1 if n<0. The
total **order** on ℤ (m<n iff n−m∈ℤ⁺) extends the order on ℕ, but,
critically, does not inherit well-ordering.

## Mental Models

- **Beginner model — "negative numbers are what you get when you
  subtract a bigger number from a smaller one"**: the learner treats
  every negative integer as fundamentally the RESULT of a subtraction
  operation, with no independent identity. Shelf-life warning: this
  model cannot make sense of −3 appearing as a standalone quantity (a
  temperature, a bank balance) with no subtraction visibly performed.
- **Intermediate model — "ℤ extends ℕ by adding additive inverses; each
  −n is a genuine element satisfying n+(−n)=0, and subtraction is just
  one way to produce it"**: the learner correctly separates the element
  from the operation, but may still assume ℤ inherits ALL of ℕ's
  structural properties (in particular, well-ordering) simply because
  it extends ℕ. Upgrade trigger: being asked whether {…,−3,−2,−1}⊂ℤ has
  a least element.
- **Advanced model — "ℤ is a ring with additive inverses but NOT
  well-ordered, and division is only sometimes possible — the
  extension from ℕ to ℤ is a genuine trade: additive inverses gained,
  well-ordering lost"**: the learner fluently reasons about which of
  ℕ's properties survive the extension to ℤ and which do not, and
  correctly distinguishes ring closure under +/× from the failure of
  closure under ÷. Upgrade trigger: being asked to name one property ℕ
  has that ℤ lacks, and one property ℤ has that ℕ lacks.
- **Do not upgrade early**: a learner still treating negative integers
  as subtraction results rather than standalone elements (beginner
  model, directly triggering MC-1) should not be pushed toward
  reasoning about ring properties or well-ordering loss (advanced
  model) before −n's independent identity is fully secure — MC-1 is
  FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats −3 as meaning "take away 3" —
an operation rather than a standalone element of ℤ with its own
defining property (3+(−3)=0) — making it hard to accept −3 as a
quantity that can simply BE, with no subtraction ever performed (a
temperature reading, a debt). A second failure over-generalizes from
ℕ's closure properties, believing ℤ is closed under division, or
assuming ℤ has "the same properties as ℕ just with negatives added,"
missing specifically that ℤ loses well-ordering in the very same
extension that gains it additive inverses. A third failure treats ℤ as
simply {positive integers}∪{negative integers}, missing 0 as the
additive identity and a genuine, included member of ℤ — leading to
claims like "every integer is either positive or negative," silently
excluding 0.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: NEGATIVE-AS-SUBTRACTION (Foundational; Type 4 — notation-induced)
**Trigger**: "−3 means 'take away 3'" or "negative numbers are just
subtraction results."
**Diagnostic note**: classified Type 4 (notation-induced) rather than
Type 1 overgeneralization — the "−" symbol is genuinely overloaded in
standard notation, serving both as a binary subtraction operator (a−b)
and as a unary sign marker (−n as an element), and the learner has only
ever encountered it in the first, operational role before meeting ℤ.
**Repair**: −3 is an ELEMENT of ℤ — the unique number such that
3+(−3)=0. This is not a subtraction operation; it is an element with a
defining property. Verify: the additive inverse of 7 is −7; 7+(−7)=0.
An elevator starting at floor 3 and descending 7 floors lands at
3+(−7)=−4 — the subtraction 3−7 is a PROCEDURE that produces the
ELEMENT −4, which then exists independently as an integer.

### MC-2: RING-CONFUSION (Moderate; Type 1 — overgeneralization)
**Trigger**: "ℤ is closed under division" OR "ℤ has the same properties
as ℕ just with negatives added."
**Repair**: 7÷3=7/3∉ℤ, but (−6)÷2=−3∈ℤ — division is SOMETIMES, not
always, closed in ℤ. And critically: is the set {…,−3,−2,−1}⊂ℤ
well-ordered? No — it has no minimum, unlike any nonempty subset of ℕ.
ℤ shares closure under + and × with ℕ, gains additive inverses, but
loses well-ordering and never gains closure under ÷.

### MC-3: ZERO-ASYMMETRY (Moderate; Type 1 — overgeneralization)
**Trigger**: "0 is not really in ℤ because it's not positive or
negative" or "0 is its own separate category."
**Repair**: 0 IS in ℤ — it is the ADDITIVE IDENTITY, satisfying n+0=n
for all n∈ℤ. The partition ℤ=ℤ⁻∪{0}∪ℤ⁺ explicitly includes 0. How many
integers satisfy |n|<2? Three: {−1,0,1} — 0 is included.

## Analogies

**Primary — a two-armed balance**: ℕ is a one-armed balance — you can
add weight to the right side (positive) but you can't add weight to the
left. ℤ is a two-armed balance: you can add weight on either side, and
the left-side weight of n is exactly −n, which perfectly cancels n on
the right (n+(−n)=0). This captures both the additive-inverse gain and
the fact that −n is a genuine WEIGHT (element), not an instruction to
remove something.

**Anti-analogy to retire**: "Negative numbers are just numbers with a
minus sign stuck on the front, meaning 'less than nothing happened.'"
This directly invites MC-1 by framing "−" as an event or operation
marker rather than naming a standalone element with a precise algebraic
defining property.

## Demonstrations

**Additive inverse verification**: the additive inverse of 7 is −7;
7+(−7)=0 ✓. −0=0, since 0's own unique additive inverse is itself
(0+0=0).

**Ring property table** (reusing the Blueprint's own comparison): +
closed in both ℕ and ℤ; × closed in both; additive inverses exist in ℤ
but not ℕ; ÷ closed in neither; well-ordered in ℕ but NOT in ℤ.

**ℤ is not well-ordered**: S={n∈ℤ:n<5}={…,−3,−2,−1,0,1,2,3,4} has no
minimum, since it extends leftward infinitely — contrasted directly
with S∩ℕ={0,1,2,3,4}, which IS well-ordered.

**Absolute value and order**: |−4|+|3|−|−2|=4+3−2=5. Ordering
−4,7,0,−10,3 from least to greatest: −10<−4<0<3<7.

## Discovery Questions

Present a number line extending both directions from 0 and ask the
learner what number, added to 5, gives exactly 0 — the learner
discovers −5 as a specific point on the line satisfying this property,
directly experiencing the additive-inverse definition before it's
named abstractly. Recommendation: guided discovery for the
additive-inverse-as-element insight (directly experiential from the
number-line search); direct instruction for the well-ordering-loss
contrast (MC-2's repair) and the ring-property table, since both
require an already-established ℕ baseline to contrast against rather
than being independently rediscoverable.

## Teaching Sequence

MC-1 (negative-as-subtraction) is addressed first and is FOUNDATIONAL
per the Blueprint's own MAMR — it must be cleared before either MC-2 or
MC-3, since every subsequent ring-structure or well-ordering discussion
presupposes negative integers are accepted as standalone elements. MC-2
(ring confusion) and MC-3 (zero-asymmetry) are addressed FIFO after
MC-1 clears (per the Blueprint's Component 3 MAMR Enforcement): if both
are active, MC-2 is addressed before MC-3.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (negative as subtraction) | WORKED EXAMPLE: additive-inverse defining property + two-armed-balance analogy | Teaching Actions: SHOW §1 |
| MC-2 active (ring confusion / well-ordering overgeneralized) | CONTRAST PAIR: ring-property table across ℕ and ℤ | Teaching Actions: SHOW §2 |
| MC-3 active (zero-asymmetry) | WORKED EXAMPLE: |n|<2 enumeration including 0 | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: bank-account overdraft sequence (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Distinguish the ELEMENT −n from the subtraction
OPERATION a−b explicitly and repeatedly — never let "−3" appear without
first anchoring it as an additive-inverse element, since that ambiguity
is exactly what MC-1 exploits.

**Wait-time**: After posing the well-ordering question for
{…,−3,−2,−1}, give extended wait-time before revealing there's no
minimum — let the learner search for a smallest element and discover
the search never terminates.

**Load-bearing sentences**:
- "−5 is a number — a specific element of ℤ satisfying 5+(−5)=0 — not
  an instruction to subtract."
- "Extending ℕ to ℤ is a trade: you gain additive inverses, but you
  lose well-ordering."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own TA-A06 mastery-gate item bank
(Q1-Q5 plus the P76 cross-link transfer probe), not restated in full —
cite by reference:

**Gate 1** (Blueprint Q1): find the additive inverse of −5 and verify
it satisfies the defining property. Pass: 5; (−5)+5=0.

**Gate 2** (Blueprint Q2): state whether ℤ is closed under division,
with a counterexample if false. Pass: FALSE; e.g., 3÷2=1.5∉ℤ.

**Gate 3** (Blueprint Q3): determine whether A={n∈ℤ:n≤0} is
well-ordered. Pass: NOT well-ordered; extends to −∞, no minimum.

**Gate 4** (Blueprint Q4): compute |−8|−|3|+|−1|, then order −8,3,−1
least to greatest. Pass: 6; −8<−1<3.

**Gate 5** (Blueprint Q5): write ℤ in set-builder notation using ℕ as
the base set. Pass: ℤ={n−m:n,m∈ℕ} or ℤ=ℕ∪{−n:n∈ℕ,n≠0}.

**Gate 6** (Blueprint P76, cross-link transfer probe): given a bank
account with successive withdrawals leading to an overdraft, express
each balance as an integer and state which property of ℤ guarantees the
overdraft can be represented. Pass: correct arithmetic; correctly cites
additive inverses as the enabling property, absent in ℕ.

**Mastery criterion**: 6/6 on the full Blueprint item bank (Q1-Q5 +
P76), consistent with KG mastery_threshold 0.9 (⌈0.90×6⌉=6).

## Tutor Recovery Strategy

Likeliest utterance: "how can a number just BE negative — isn't −5 what
happens when you subtract 5 from something?" — the concept-specific
smaller question: "if I told you the temperature outside is −5°C right
now, with no subtraction happening anywhere, does that number still
make sense?" reframes the confusion from "negative numbers only arise
FROM an operation" (MC-1's notation-induced root) to "negative numbers
are quantities that can simply exist," directly isolating MC-1 using a
context with no visible subtraction at all.

## Memory Hooks

**Type**: declarative (the additive-inverse defining property, the ring
property table, the well-ordering-loss fact) + procedural (absolute
value and order computations, directly extending `math.found.
natural-numbers`'s own order machinery). Review form: fresh
additive-inverse verification prompts paired with a well-ordering
contrast question, periodically paired with a ring-closure true/false
set to keep MC-2's guard-rail active. Interleaving partner:
`math.found.natural-numbers` (the base structure this concept's
extension and its property-by-property contrast both directly build
on).

## Transfer Connections

**Near transfer**:
- `math.found.rational-numbers` (currently unauthored; the division gap
  in ℤ is this concept's direct motivation, per the Blueprint's own
  Teaching Notes)
- `math.found.natural-numbers` (the base structure this concept both
  extends and repeatedly contrasts against)

**Far transfer**:
- `math.arith.negative-numbers` (practical applications of additive
  inverses — debt, temperature, elevation — per KG `cross_links`)
- `math.nt.divisibility` (divisibility extended to ℤ, including sign,
  per KG `unlocks`)
- Computer science: signed-integer representations and overflow
  behavior directly model the ℤ-as-extension-of-ℕ structure

## Cross-Subject Connections

Per KG `cross_links` [`math.arith.negative-numbers`]: ℤ provides the
formal structure (additive inverse), and `math.arith.negative-numbers`
supplies concrete real-world contexts (debt, temperature, elevation)
that instantiate it — per the Blueprint's own explicit P76 cross-link
declaration, not fabricated beyond what the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.integers.md`
(PACKAGE_READY, V-1 through V-20 PASS, AIR PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A06), Protocol B
repair chains (TA-B01 through TA-B03), and the P89 spaced-repetition
schedule reused by reference above and not restated in full; the
Misconception Registry (MC-1 through MC-3) and the TA-A06 mastery-gate
item bank (Q1-Q5 + P76) cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.found.natural-numbers`) is exactly sufficient to state ℤ as an
extension of ℕ. Its two `unlocks` (`math.arith.negative-numbers`,
`math.nt.divisibility`) match the Blueprint's own Component 7 Output
Unlocks table exactly. Estimated hours (3) and mastery threshold (0.9)
are appropriate for a foundational concept whose central move (accept
negatives as elements, then track exactly which ℕ properties survive
the extension) is conceptually compact but easily undermined by
notation-induced MC-1.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 12, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
