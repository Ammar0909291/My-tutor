# Partial Order — `math.found.partial-order`

## Identity

- **Concept ID**: `math.found.partial-order` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.relation`; children in KG: `math.found.total-order`,
  `math.found.hasse-diagram`, neither yet authored)
- **Prerequisites**: `math.found.reflexive-relation`,
  `math.found.transitive-relation` — both authored this program's Wave
  7; this concept adds antisymmetry as new content.
- **Unlocks**: `math.found.total-order`.
- **Related** (from KG): `math.found.equivalence-relation`,
  `math.abst.lattice`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.80 · **Est. hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.found.partial-order.md`
  (PACKAGE_READY, cross_links=[], P76 independence).
- **Aliases** (from KG): "partial ordering", "poset", "⊴".

## Learning Objective

The learner can: define antisymmetry and explain how it differs from
symmetry and asymmetry; state the three properties (reflexive,
antisymmetric, transitive) that define a partial order and verify a
given relation by systematically checking all three; give examples of
standard partial orders (≤ on ℤ, ⊆ on 𝒫(A), divisibility on ℕ) and
identify incomparable elements in each; and distinguish partial orders
from total orders by recognizing that comparable pairs are not required
for every pair.

## Core Understanding

A partial order is a reflexive, antisymmetric, and transitive relation
on a set, providing a generalized notion of ordering where not all
pairs need be comparable. Antisymmetry is the one genuinely new
property here: R on A is antisymmetric if for all a,b∈A, (a,b)∈R AND
(b,a)∈R together imply a=b — equivalently, by contrapositive, a≠b
implies NOT both (a,b) and (b,a) are in R. Antisymmetry captures a "no
mutual domination" rule with an escape hatch for self-pairs: it ALLOWS
self-pairs like (1,1) (unlike asymmetric, which forbids them entirely),
and it only forbids two DISTINCT elements from relating to each other
in BOTH directions simultaneously. Standard partial orders include ≤ on
ℤ, ⊆ on 𝒫(A), and divisibility on ℕ — in each, some pairs are simply
NOT comparable: {1} and {2} are incomparable under ⊆ (neither is a
subset of the other), and 4 and 6 are incomparable under divisibility
(neither divides the other). This incomparability is the defining
feature the word "partial" captures — a TOTAL order additionally
requires every pair to be comparable (for all a,b: a≤b or b≤a), which
≤ on ℤ satisfies but ⊆ on 𝒫(A) and divisibility on ℕ do not.

## Mental Models

- **Beginner model — "antisymmetric means not symmetric"**: the learner
  reads "anti" as simple negation, believing antisymmetry forbids any
  pair from having its reverse present. Shelf-life warning: this is
  actually the definition of ASYMMETRIC, and this model fails the
  moment a reflexive self-pair (which antisymmetry explicitly permits)
  is checked.
- **Intermediate model — "check all three properties systematically,
  antisymmetry only concerns distinct-element pairs"**: the learner
  correctly applies the contrapositive form of antisymmetry (look only
  at pairs where a≠b), but may still expect every pair to be comparable,
  confusing partial order with total order. Upgrade trigger: being
  given ⊆ on a power set and asked to find two incomparable sets.
- **Advanced model — "partial order generalizes total order by dropping
  the comparability requirement, and reflexivity is a deliberate,
  non-strict design choice"**: the learner fluently distinguishes
  partial from total orders via incomparable-pair examples and does not
  mistake the reflexive (non-strict, ≤-like) partial order for its
  strict (irreflexive, <-like) cousin. Upgrade trigger: being asked to
  explain why a≤a being trivially true does not disqualify ≤ from being
  a partial order.
- **Do not upgrade early**: a learner still conflating antisymmetric
  with "not symmetric" (beginner model) should not be pushed into
  incomparable-pair reasoning (intermediate-to-advanced) before the
  contrapositive antisymmetry check (only distinct-element pairs matter)
  is itself reliable.

## Why Students Fail

The dominant failure misreads the prefix "anti" as "opposite of"
(symmetric's opposite = no symmetric pairs at all) rather than its
correct logical meaning — a conditional stating that both directions
together force equality — conflating antisymmetry with the genuinely
different property of asymmetry, which forbids self-pairs entirely. A
second, independent failure imports the dominant template from ≤ on the
real numbers (a total order, where every pair IS comparable) into every
partial order, leading students to reject genuine partial orders (like
⊆ on a power set) as invalid the moment an incomparable pair is found,
when incomparability is expected and normal for a partial order. A
third failure confuses the reflexive (non-strict) partial order with
its irreflexive, strict cousin (based on <), believing a partial order
should exclude self-pairs the way < excludes a<a, when the standard
"partial order" is by convention the reflexive version.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: ANTISYMM-NOT-NONSYMM (Foundational; Type 4 — notation-induced by the "anti" prefix's ordinary-language reading)
**Trigger**: given R={(1,1),(2,2),(3,3),(1,2)} on {1,2,3}, the learner
correctly says R is antisymmetric but for the wrong reason — believing
antisymmetric means "no pair and its reverse coexist," which would
wrongly flag R as antisymmetric only because (2,1) happens to be
absent, not because of the correct conditional definition.
**Repair**: Contrast three distinct concepts directly. Antisymmetric:
(a,b) AND (b,a) ⟹ a=b — R₁={(1,1),(2,2),(3,3),(1,2)} qualifies (no
distinct pair violates the conditional). "Not symmetric": ∃(a,b)∈R with
(b,a)∉R — a much weaker, different property. Asymmetric: (a,b)∈R ⟹
(b,a)∉R — FORBIDS self-pairs entirely, unlike antisymmetric. "The
equality relation = is antisymmetric (and symmetric!) but NOT
asymmetric — antisymmetric ALLOWS self-pairs; asymmetric FORBIDS them."

### MC-2: TOTAL-ORDER-CONFUSION (Type 6 — analogy overextension from ≤ on ℝ)
**Trigger**: given (𝒫({a,b}), ⊆), the learner says "{a} and {b} are
incomparable so ⊆ can't be a partial order."
**Repair**: A partial order does NOT require every pair comparable —
that is the DEFINING extra requirement of a TOTAL order. {a} and {b}
being incomparable under ⊆ is expected and normal; ⊆ remains a
perfectly valid partial order. "The word 'partial' captures exactly
this — not every pair needs to be comparable."

### MC-3: STRICT-ORDERING (Type 6 — analogy overextension from < rather than ≤)
**Trigger**: given (ℤ, ≤), the learner says "but ≤ can't be a partial
order because a≤a is trivial and a partial order should only order
distinct elements."
**Repair**: Contrast the reflexive (non-strict, ≤-based) partial order,
which explicitly REQUIRES a≤a for every a, against the strict partial
order (irreflexive+antisymmetric+transitive, <-based), which explicitly
EXCLUDES self-pairs. Both are valid, named structures, but the default
"partial order" (this concept) is the reflexive version — reflexivity
is one of its three DEFINING properties, not an accidental triviality
to exclude.

## Analogies

**Primary — a ranking with no mutual domination**: Think of a ranking
where "A outranks B" means B cannot simultaneously outrank A — unless
they are the same person. Antisymmetry captures this: if both "a beats
b" and "b beats a" hold simultaneously, then a and b must be the same
entity. It's the no-mutual-domination rule, with the escape hatch that
an entity can dominate itself.

**Anti-analogy to retire**: "A partial order is like ≤, just for
sets/other objects instead of numbers." This invites MC-2 by implicitly
assuming every pair will be comparable, the way every pair of numbers
is comparable under ≤ — most partial orders genuinely are not total.

## Demonstrations

**Three-concept contrast table**: Antisymmetric: {(1,1),(2,2),(3,3),
(1,2)} — has (1,2) but not (2,1); self-pairs fine, condition holds.
"Not symmetric": {(1,1),(1,2)} — (1,2) present, (2,1) absent, a weaker
observation about one pair. Asymmetric: {(1,2),(2,3)} — no pair and its
reverse coexist, AND no self-pairs at all.

**Pattern induction on antisymmetry**: R₁={(1,1),(2,2),(3,3),(1,2),
(2,3),(1,3)} on {1,2,3} — check only distinct-element pairs: (1,2) vs.
(2,1)? absent. (2,3) vs. (3,2)? absent. (1,3) vs. (3,1)? absent. No
mutual pair → ANTISYMMETRIC. R₂={(1,1),(2,2),(3,3),(1,2),(2,1)} —
(1,2) AND (2,1) both present, 1≠2 → NOT ANTISYMMETRIC. R₃={(1,1),(2,2),
(3,3)} — only self-pairs, condition holds vacuously → ANTISYMMETRIC.

**Incomparable elements in 𝒫({a,b})**: ⊆ on {∅,{a},{b},{a,b}} — {a} and
{b} are incomparable (neither ⊆ the other), while {a}⊆{a,b} and ∅⊆
everything. Divisibility on {2,3,4,6,12}: 4 and 6 are incomparable
(neither divides the other), while 2 divides both.

## Discovery Questions

Present ⊆ on the power set of a small set and ask the learner to find
two sets where neither contains the other — the learner discovers
incomparability directly through search, before the term is named.
Then contrast with ≤ on a set of numbers, where no such pair can be
found. Recommendation: guided discovery for incomparability (searchable,
concrete); direct instruction for the antisymmetry definition itself
and its contrast with asymmetric/not-symmetric, since the "anti" prefix
misreading (MC-1) is a notation trap best defused explicitly rather than
discovered.

## Teaching Sequence

MC-1 (antisymmetric misread as "not symmetric") is addressed first and
given the most weight, as the FOUNDATIONAL misconception per the
Blueprint's own MAMR protocol — a learner who cannot correctly apply
the contrapositive antisymmetry check cannot reliably verify any
subsequent example. MC-2 (total-order confusion) and MC-3 (strict-
ordering confusion) are addressed after, cleared FIFO, since both
concern which STANDARD example set the learner is over-generalizing
from (ℝ under ≤ for MC-2; < itself for MC-3) rather than the core
antisymmetry definition.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (antisymmetric misread) | MATCHING: sort relations into antisymmetric / not-symmetric / asymmetric categories | Teaching Actions: ORGANIZE §3 |
| MC-2 active (expects total comparability) | DEMONSTRATION: find incomparable elements in ⊆ on a power set | Teaching Actions: SHOW §3 |
| MC-3 active (expects irreflexivity) | DIRECT INSTRUCTION: contrast reflexive vs. strict partial order explicitly | Teaching Actions: TELL §1 |
| Ready for transfer | WORKED EXAMPLE: verify all three properties for divisibility on a finite set | Teaching Actions: SHOW §1 |

## Voice Teaching Notes

**Register**: Precise about prefixes and named contrasts — "anti,"
"total," and "strict" are all words this concept must disambiguate
explicitly, not leave to intuition.

**Wait-time**: After presenting a candidate partial order with an
incomparable pair, wait for the learner's own verdict before confirming
— MC-2 surfaces exactly at this pause.

**Load-bearing sentences**:
- "Antisymmetric allows self-pairs; asymmetric forbids them — do not
  conflate the two."
- "Partial means not every pair needs to be comparable — that's the
  whole point of the word."
- "The reflexive partial order REQUIRES a≤a for every a — that is not a
  triviality to exclude, it's one of the three defining properties."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1 (ANTISYMMETRY DEFINITION)**: Given R={(1,1),(2,2),(3,3),
(1,2),(2,1)} on {1,2,3}, is R antisymmetric? Pass: NO — (1,2) and (2,1)
both present with 1≠2, violating the conditional.

**Gate 2 (THREE-PROPERTY CHECK)**: Verify that divisibility on
{1,2,3,4,6,12} is a partial order (reflexive, antisymmetric,
transitive). Pass: all three verified correctly.

**Gate 3 (INCOMPARABLE ELEMENTS)**: Find two incomparable elements in
(𝒫({a,b,c}), ⊆). Pass: identifies a genuinely incomparable pair, e.g.
{a} and {b}.

**Gate 4 (TOTAL vs PARTIAL)**: Explain why divisibility on ℕ is a
partial order but not a total order. Pass: identifies at least one
incomparable pair (e.g. 2 and 3) as the reason total-order comparability
fails.

**Mastery criterion**: score ≥4/5, consistent with KG mastery_threshold
0.80.

## Tutor Recovery Strategy

**If Gate 1 fails**: MC-1 is active. Return to the three-concept
contrast table and have the learner explicitly classify the SAME
relation under all three definitions (antisymmetric, not-symmetric,
asymmetric) side by side.

**If Gate 3 fails**: MC-2 is active. Direct the learner to systematically
list all pairs of the power set's elements and check each for ⊆ in
either direction — the incomparable pair will surface from the
systematic search.

**If Gate 4 fails**: Return to the divisibility example and ask
directly: "does 4 divide 6, or does 6 divide 4?" — neither, which is
the concrete incomparability the abstract question is asking about.

## Memory Hooks

**Memory type**: Declarative (three-property definition) + procedural
(the contrapositive antisymmetry check, and incomparable-pair search).

**Forgetting profile**: The antisymmetry definition is fragile against
the "anti = opposite" misreading and benefits from periodic re-contrast
against asymmetric and not-symmetric. The incomparability concept, once
found concretely in one example (⊆ or divisibility), tends to transfer
well to new examples.

**Spaced retrieval targets**:
- Session +1: Classify three relations as antisymmetric, asymmetric, or
  neither.
- Session +7: Find an incomparable pair in a fresh partial order.
- Session +21: Distinguish a partial order from a total order for an
  unfamiliar relation.

## Transfer Connections

**Near transfer**:
- `math.found.total-order` (adds the comparability-for-every-pair
  requirement this concept explicitly does NOT have)
- `math.found.hasse-diagram` (the standard pictorial representation of
  a partial order's comparability structure, not yet authored)

**Far transfer**:
- `math.abst.lattice` (lattices are partial orders with additional
  join/meet structure)
- Task-scheduling and dependency graphs (a "must happen before"
  relation is typically a partial order — some tasks are simply
  unordered relative to each other)
- Version-control branching (commit ancestry is a partial order; not
  every two commits are comparable)

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration. Not fabricated
beyond what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.partial-order.md`.

Key teaching objectives and misconception registry reused by reference
above; the full assessment item bank and P89 spaced-repetition schedule
not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The three-
concept contrast table and the incomparable-elements demonstration are
suitable future Explanation Memory seeds; Gate 1 is a suitable future
Probe asset seed.

## Curriculum Feedback

No structural KG issues found. This concept correctly reuses two
already-authored prerequisites (reflexivity, transitivity, both Wave 7)
and introduces exactly one genuinely new property (antisymmetry),
matching its `developing`/`understand` classification. Estimated hours
(5) is appropriate given the three-concept disambiguation work
(antisymmetric/asymmetric/not-symmetric) required beyond the core
three-property check.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 8) | Initial entry, grounded in the existing Blueprint. |
