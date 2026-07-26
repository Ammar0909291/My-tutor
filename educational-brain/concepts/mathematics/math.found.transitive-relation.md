# Transitive Relation — `math.found.transitive-relation`

## Identity

- **Concept ID**: `math.found.transitive-relation` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.relation`)
- **Prerequisites**: `math.found.relation` — transitivity is a property
  OF a relation R⊆A×A.
- **Unlocks**: `math.found.equivalence-relation` (Blueprint already
  authored; Educational Brain entry not yet authored in this program —
  transitivity is one of its three defining components alongside
  reflexivity and symmetry, both authored this same batch),
  `math.found.partial-order` (requires reflexivity + transitivity).
- **Related** (from KG): `math.found.reflexive-relation`,
  `math.found.symmetric-relation`.
- **Difficulty**: developing · **Bloom**: remember · **Mastery
  threshold**: 0.9 · **Est. hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.found.transitive-relation.md`
  (PACKAGE_READY, cross_links=[], P76 independence).

## Learning Objective

The learner can: state the definition of a transitive relation ((a,b)∈R
and (b,c)∈R implies (a,c)∈R, for all a,b,c∈A) and verify transitivity
by checking, for every "chained" pair of pairs sharing a middle element,
that the shortcut pair is also present; correctly identify the shared
middle element's required position (second component of the first pair,
first component of the second) rather than matching on the wrong
component; correctly distinguish the implication's direction (chain
implies shortcut, never the reverse); and correctly classify boundary
cases — including the empty relation — as vacuously transitive when no
chain can be formed.

## Core Understanding

Transitivity says: if you can reach c from a in two steps via some
shared middle element b, you must also be able to reach c from a
directly, in one step. Formally, for all a,b,c∈A: (a,b)∈R AND (b,c)∈R
⟹ (a,c)∈R. Verifying transitivity means finding every "chain" — every
pair of pairs (a,b),(b,c) in R where the FIRST pair's second component
equals the SECOND pair's first component — and confirming the shortcut
(a,c) is also present in R; a single chain whose shortcut is missing
disqualifies the whole relation. The implication runs in only one
direction: transitivity requires "chain implies shortcut," never the
reverse — a relation can legitimately contain a pair (a,c) with NO
chain through any b producing it, and this is completely irrelevant to
transitivity, which only imposes requirements on pairs that ARE
chained. Vacuous transitivity is the natural consequence of this
one-directional structure: if a relation contains no two pairs sharing
a middle element in the required chain configuration, the condition
"if chain then shortcut" is never triggered at all, and the relation is
transitive by default — the empty relation on any set is transitive for
exactly this reason.

## Mental Models

- **Beginner model — "transitive means related things connect somehow"**:
  the learner has no systematic chain-finding procedure and judges
  transitivity impressionistically. Shelf-life warning: this model
  produces inconsistent verdicts the moment a relation has more than a
  trivial number of pairs.
- **Intermediate model — "transitivity means chaining pairs where the
  second matches the next pair's first, then checking the shortcut"**:
  the learner correctly identifies chains by matching the shared middle
  element in its correct position, but may still believe the reverse
  direction holds (that every pair (a,c) in R must be explainable by
  some chain) or may deny transitivity for relations with no possible
  chains. Upgrade trigger: being asked whether a relation containing
  (a,c) with no chain through any b is still allowed to be transitive.
- **Advanced model — "transitivity is a one-directional 'chain implies
  shortcut' rule, vacuously satisfied when no chains exist"**: the
  learner correctly reasons about both the implication's direction and
  the vacuous-truth boundary case without hesitation, and can
  distinguish "there's no chain requiring this pair" from "this pair
  violates transitivity" as fundamentally different situations. Upgrade
  trigger: being asked whether the empty relation is transitive and
  being able to justify the answer via the absence of any chain.
- **Do not upgrade early**: a learner still finding chains
  inconsistently (beginner-to-intermediate) should not be pushed into
  the direction-of-implication or vacuous-truth subtleties (advanced)
  before the basic chain-identification procedure — correctly locating
  the shared middle element in its required position — is itself fully
  reliable.

## Why Students Fail

The dominant failure is chain misidentification: pairing (a,b) with
(c,b) — matching on the SAME second component — rather than the
correct chain structure (a,b) then (b,c), where the shared element b
must be the second component of the first pair AND the first component
of the second pair. A second, independent failure inverts the
implication's direction: learners try to EXPLAIN every pair (a,c)∈R by
finding a chain that produces it, and wrongly reject (a,c)∈R if no such
chain exists — when transitivity only ever imposes an obligation in the
forward direction (chain requires shortcut), never the reverse. A
third failure denies that a relation with no chain-able pairs (like the
empty relation, or a relation like {(1,2)} alone) can be transitive,
missing that a universal conditional with no satisfying antecedent is
vacuously true.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 2), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — Chain-direction reversal (Foundational; Type 1,
overgeneralization — confusing the required chain direction, matching
pairs on the SECOND component of both instead of the shared middle
element appearing as second-then-first)**
- *Trigger*: the learner pairs (a,b) with (c,b), matching on the second
  component, instead of correctly identifying that b must be the SECOND
  component of one pair and the FIRST component of the next.
- *Repair*: physical arrow diagram — draw a→b→c as two consecutive
  arrows, where the output of the first arrow (b) becomes the input of
  the second. Now draw a→b and c→b (two arrows pointing TO b) —
  these don't form a path from a to c through b at all. For
  R={(1,2),(2,3),(3,1)}: chain (1,2)+(2,3)→need(1,3); (1,3)∉R — NOT
  transitive.

**MC-2 — Implication direction reversal (Type 1, overgeneralization —
believing every pair (a,c)∈R must be explainable by a chain through
some b, inverting "chain ⟹ shortcut" into "shortcut ⟹ chain exists")**
- *Trigger*: the learner tries to EXPLAIN every pair in R by finding a
  chain that produces it, rejecting a pair if no such chain exists.
- *Repair*: for R={(1,3),(1,1),(3,3)} on {1,2,3}, (1,3)∈R has no chain
  through 2 producing it ((1,2)∉R) — but (1,3) is still perfectly valid
  in R, and transitivity remains satisfied by checking only the actual
  chains present: (1,3)+(3,3)→need(1,3)✓, etc. "Only chains impose
  requirements; existing pairs with no chain behind them are free."

**MC-3 — Vacuous truth confusion (Type 2, perceptual intuition —
"nothing to check" intuitively feels like it should disqualify a
relation from being transitive, rather than trivially satisfy the
condition)**
- *Trigger*: the learner says the empty relation, or a relation like
  {(1,2)} with no possible chain, "is not transitive because there's
  nothing to verify."
- *Repair*: analogy — "all unicorns are pink" is logically TRUE because
  there are no unicorns to serve as a counterexample. Transitivity of
  ∅: "for all (a,b),(b,c)∈∅: (a,c)∈∅" — the premise "(a,b)∈∅" is always
  false, so no counterexample can ever be found, and the statement is
  vacuously TRUE. "If you cannot form a valid chain from the relation's
  pairs, transitivity holds vacuously — a counterexample requires you
  to FIND a chain whose shortcut is missing."

## Analogies

- **Best analogy — course prerequisites**: "must be completed before"
  (the full, transitive-closure relation including indirect
  prerequisites) is transitive — if Math 101 must precede Math 201, and
  Math 201 must precede Math 301, then Math 101 must precede Math 301.
  But "is a DIRECT prerequisite of" is typically NOT transitive — Math
  101 may not be listed as a direct prerequisite of Math 301, only an
  indirect one via Math 201. Breaking point: the direct-prerequisite
  relation's failure to be transitive is itself an important, separate
  lesson (not every everyday "chain-like" relation is transitive) that
  should be drawn out explicitly rather than left implicit.
- **ANTI-ANALOGY — do NOT say "transitive just means things connect in a
  chain, like a family tree"**: family relations like "is the mother of"
  are explicitly NOT transitive (a grandmother is not "the mother of"
  her grandchild) — using an intuitively chain-like but actually
  non-transitive relation as the founding analogy risks planting a false
  positive intuition.

## Demonstrations

- **Chain-and-shortcut demonstration**: for R={(1,2),(2,3),(1,3)} on
  {1,2,3}, identify the one chain (1,2)+(2,3), confirm its shortcut
  (1,3) is present — TRANSITIVE; contrast with R'={(1,2),(2,3)} (same
  chain, but (1,3) missing) — NOT TRANSITIVE.
- **Wrong-direction-chain demonstration**: present R={(a,b),(b,c),(c,a)}
  on {a,b,c} and have the learner attempt (incorrectly) to pair (a,b)
  with (c,b) before correcting to the true chain (b,c)+(c,a)→need(b,a);
  (b,a)∉R — NOT transitive — directly targets MC-1.
- **Vacuous-transitivity demonstration**: for R={(1,2),(3,4)} on
  {1,2,3,4}, confirm no pair in R has its second component matching
  another pair's first component — no chains exist — so the relation is
  transitive vacuously, with nothing to verify — directly targets MC-3.

## Discovery Questions

**Need** — asked whether "must be completed before" (full prerequisite
chains) behaves consistently when chained through multiple courses, the
learner naturally arrives at the chain-implies-shortcut structure.
**Playground** — the learner tests several relations for transitivity,
discovering that pairs with no possible chain never create an
obligation. **Invention** — the learner proposes the "find every chain,
check its shortcut" procedure as the formal test. **Collision** —
presented with the empty relation and asked whether it's transitive,
the learner's "nothing to check, so it must fail" instinct collides
with the vacuous-truth resolution — targeting MC-3. **Formalization** —
naming the chain-implies-shortcut definition and its one-directional
nature explicitly. **Compression** — given a fresh relation, correctly
identifying all chains and verifying their shortcuts without prompting.

## Teaching Sequence

MC-1 (chain-direction reversal) is addressed first, since correct chain
identification is the prerequisite skill every subsequent check depends
on — a learner who cannot reliably locate the shared middle element in
its correct position cannot verify transitivity at all. MC-2
(implication-direction reversal) is addressed second, once chains can
be found correctly, since it concerns what to do with pairs that are
NOT part of any chain. MC-3 (vacuous truth) is addressed last, as the
boundary-case stress test of whether the one-directional "chain implies
shortcut" structure has been understood precisely enough to extend to
the case of no chains at all.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the chain-and-
shortcut baseline, the primary action establishing the checking
procedure) → **Error Analysis** (the wrong-direction-chain case,
targeting MC-1, using the physical arrow-diagram correction) →
**Thought Experiment** (the vacuous-transitivity boundary case,
targeting MC-3). **What doesn't fit**: matrix-multiplication-based
transitivity checking (M² and Boolean matrix product) — mentioned in
the Blueprint as a more advanced representation, but this concept's
`bloom: remember` scope targets direct pair-by-pair chain checking as
the primary, required procedure, with manual matrix scanning as the
representational bridge, not full Boolean matrix arithmetic.

## Voice Teaching Notes

Listen for a learner pairing (a,b) with (c,b) rather than (b,c) — this
is MC-1's clearest verbal signature, and should be met with "which
element is SHARED between your two pairs, and is it in the right
position in each?" A learner who rejects a valid pair (a,c) because "no
chain explains it" is showing MC-2 — prompt directly: "does
transitivity ever require you to find a REASON for a pair that's
already there, or only to check chains that ALREADY exist?" The
load-bearing sentence: "if you can't form a chain, there's nothing to
violate — vacuously transitive."

## Assessment Signals

Blueprint's P77/P76 items are suitable seeds for gate-style checks:
verifying transitivity on an explicit pair listing requiring multiple
chain checks; classifying a relation with a wrong-direction-chain trap
(MC-1 probe); classifying a relation containing an "unexplained" pair
with no chain behind it (MC-2 probe); classifying the empty relation
and a no-chain-possible relation (MC-3 probe). Because MC-1's defining
signature is a systematically wrong chain-matching procedure rather
than a single wrong answer, assessment should require the learner to
show which specific pairs were chained, not just state a final verdict.

## Tutor Recovery Strategy

Likeliest utterance: "there's nothing to check, so it can't be
transitive, right?" — the concept-specific smaller question: "to break
transitivity, you need to FIND a chain whose shortcut is missing — can
you find even one chain in this relation at all?" reframes the
confusion from "no evidence means it fails" to "no evidence means
nothing was ever asked of it, so it passes by default" — directly
isolating MC-3's missing vacuous-truth step.

## Memory Hooks

**Type**: procedural (a systematic chain-identification-and-
verification habit, not a single fact). Review form: fresh relations
requiring the learner to explicitly list every chain found and its
corresponding shortcut check, periodically including a no-chain-
possible relation to keep MC-3's boundary-case lesson active.
Interleaving partners: `math.found.reflexive-relation` and
`math.found.symmetric-relation` (both authored this same batch, the two
sibling relation properties transitivity is most often combined with in
`math.found.equivalence-relation` and `math.found.partial-order`).

## Transfer Connections

- **Near**: `math.found.equivalence-relation` (not yet authored) and
  `math.found.partial-order` (not yet authored), both of which include
  transitivity as one of their required components.
- **Far**: directed-graph reachability (if there's a path from a to b
  and from b to c, there's a path from a to c — the transitive closure
  of a graph's edge relation is exactly this concept generalized).
- **Real-world**: comparison relations in ordinary reasoning ("taller
  than," "more expensive than," "ancestor of") as intuitively transitive
  examples, contrasted with genuinely non-transitive everyday relations
  ("is a sibling of," "is one step away from" on a social network).
- **Expert transfer**: the learner, meeting an unfamiliar relation
  described as forming "chains" or "paths," automatically checks
  whether the SHORTCUT (not just the chain itself) is guaranteed to
  exist, rather than assuming chain-formation alone implies
  transitivity.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration. Not fabricated
beyond what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.transitive-relation.md`.
Key objectives, misconception registry, and the course-prerequisite
transfer probe reused by reference above; the full P77/Protocol C mixed-
practice item bank not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The chain-
and-shortcut and vacuous-transitivity demonstrations are suitable
future Explanation Memory seeds; the wrong-direction-chain error-
analysis item is a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. This concept's KG `unlocks` correctly
lists both `math.found.equivalence-relation` and
`math.found.partial-order` — both genuinely require transitivity as a
component, confirmed against each node's own `requires` field.
Estimated hours (1) and mastery threshold (0.9) match
`math.found.reflexive-relation`'s and `math.found.symmetric-relation`'s
own values (both authored this same batch), appropriately reflecting
the three concepts' parallel scope as sibling relation-property
definitions.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.
