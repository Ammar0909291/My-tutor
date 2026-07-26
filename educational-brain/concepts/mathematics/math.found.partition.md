# Partition — `math.found.partition`

## Identity

- **Concept ID**: `math.found.partition` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-theory`)
- **Prerequisites**: `math.found.subset` — a partition's "blocks" are
  themselves subsets of A, built directly from the ⊆ relation.
- **Unlocks**: `math.found.equivalence-relation` (Blueprint already
  authored; Educational Brain entry not yet authored in this program —
  see Curriculum Feedback for the production-order note).
- **Related** (from KG): `math.found.equivalence-relation`,
  `math.found.equivalence-class`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.found.partition.md`
  (PACKAGE_READY).

## Learning Objective

The learner can: define a partition of A as a collection of subsets
("blocks") satisfying three simultaneous conditions — every block
nonempty, every pair of distinct blocks pairwise disjoint, and the
union of all blocks equal to A exactly — and verify a given collection
by checking all three; correctly identify a collection failing EACH
condition separately, recognizing these as genuinely different failure
modes; and recognize that checking pairwise disjointness means checking
EVERY pair of distinct blocks, connecting directly to
`math.found.equivalence-relation`'s own Partition Theorem, which uses
this exact three-condition definition.

## Core Understanding

A partition of a set A is a collection of subsets ("blocks") satisfying
ALL THREE conditions at once: every block is nonempty, every two
distinct blocks are disjoint (share no elements), and the union of all
blocks equals A exactly (every element of A belongs to some block).
Verifying a partition means checking all three — no single condition
implies the others, and a collection can satisfy any two while failing
the third. In particular, COVERING is not the same as PARTITIONING: a
collection's union can equal A entirely (every element is covered by
some block) while two blocks still overlap, disqualifying it as a
partition despite full coverage — covering and disjointness are
genuinely independent requirements. Checking disjointness rigorously
means checking EVERY pair among the blocks, not merely a convenient
few: with n blocks there are C(n,2) distinct pairs to verify, and a
single overlapping pair anywhere, even one missed among many checked,
disqualifies the whole collection.

## Mental Models

- **Beginner model — "a partition is just a bunch of subsets that cover
  everything"**: the learner checks only the union condition, missing
  the independent disjointness and nonemptiness requirements. Shelf-life
  warning: this model passes on the simplest textbook examples (where
  the given blocks happen to be disjoint by construction) and fails the
  moment an overlapping-but-covering collection is presented.
- **Intermediate model — "a partition needs coverage AND no overlaps,
  checked as two separate passes"**: the learner correctly checks both
  conditions but may still stop disjointness-checking early once "most"
  pairs look fine, or may not yet flag an explicit empty block as
  automatically disqualifying. Upgrade trigger: being asked to verify
  disjointness for a collection with 4+ blocks, where checking "a few"
  pairs is insufficient and an unchecked pair conceals the failure.
- **Advanced model — "all three conditions must hold simultaneously,
  verified by systematically checking every pair"**: the learner treats
  partition verification as a complete, systematic three-condition
  procedure — nonemptiness for every block, all C(n,2) pairs checked for
  disjointness, and coverage confirmed — with no shortcuts taken.
  Upgrade trigger: being asked how many pairs must be checked for a
  collection of n blocks, and why checking fewer is insufficient.
- **Do not upgrade early**: a learner who has not yet internalized that
  covering and disjointness are independent (intermediate model, still
  developing) should not be pushed toward the equivalence-relation
  Partition Theorem (an application requiring fluent partition
  verification as a prerequisite skill) before all three conditions are
  independently secure on concrete examples.

## Why Students Fail

The dominant failure is conflating covering with partitioning — a
collection whose union genuinely equals A "feels" complete, and the
independent disjointness requirement is easy to overlook since many
introductory examples happen to be disjoint by design. A second failure
is treating an explicit empty block as a harmless inclusion ("it
doesn't hurt anything, since it contributes no elements"), missing that
nonemptiness is a strict, unconditional requirement with no exceptions.
A third failure is sampling rather than exhaustively checking pairwise
disjointness — confirming a FEW pairs don't overlap and concluding the
whole collection is pairwise disjoint, when an unchecked pair
elsewhere in the collection may conceal exactly the overlap that
disqualifies it.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 6), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — COVERING-CONFLATED-WITH-PARTITIONING (Foundational severity;
Type 1, overgeneralization — "the blocks cover everything" feels like
the complete definition, since coverage is the most visually salient
property of a correct partition)**
- *Trigger*: asked whether a union-covering collection of subsets is
  automatically a partition, the learner answers "yes."
- *Repair*: for A={1,...,6}, {1,2,3},{3,4,5},{5,6}: the union genuinely
  covers A, but {1,2,3}∩{3,4,5}={3}≠∅ — an overlap. "Covering every
  element and being pairwise disjoint are two SEPARATE conditions —
  satisfying one tells you nothing about the other."

**MC-2 — EMPTY-BLOCK-ASSUMED-ALLOWED-IN-PARTITION (Foundational
severity; Type 1, overgeneralization — an empty block "contributes
nothing," so it feels harmless to include rather than strictly
forbidden)**
- *Trigger*: asked whether a partition could include an empty subset as
  one of its blocks, the learner answers "yes."
- *Repair*: for A={1,2,3,4}, {1,2},{3,4},∅: the first two blocks are
  fine, but ∅ is not nonempty — the collection fails outright,
  regardless of how the other two conditions behave. "An empty block is
  never allowed, no matter how the rest of the collection looks."

**MC-3 — PAIRWISE-DISJOINTNESS-CHECKED-BY-SAMPLING-PAIRS (Foundational
severity; Type 1, overgeneralization from checking "enough" pairs in
small examples to assuming partial checking generalizes safely to
larger collections)**
- *Trigger*: asked to verify pairwise disjointness for a collection, the
  learner checks only some pairs and concludes disjointness holds.
- *Repair*: for A={1,...,6}, {1,2},{3,4},{4,5,6}: checking
  ({1,2},{3,4}) and ({1,2},{4,5,6}) both give disjoint — but the THIRD
  pair, ({3,4},{4,5,6}), shares element 4, an overlap never checked.
  "'Checked most pairs, found no overlap' is not the same as 'checked
  every pair.'"

## Analogies

- **Best analogy — university course sections**: a course's students
  are partitioned into sections when (i) no section is empty, (ii) no
  student is enrolled in two sections of the same course simultaneously
  (pairwise disjoint), and (iii) every enrolled student is assigned to
  some section (union equals the enrolled population) — an
  administrative error placing one student on two rosters violates
  disjointness even though coverage is untouched, and a newly
  transferred student not yet assigned to any section violates coverage
  even though disjointness is untouched. Breaking point: real
  administrative systems sometimes tolerate temporary inconsistencies
  (a student "pending" assignment) that a strict mathematical partition
  never allows — the analogy should not be read as license for
  temporary partial partitions.
- **ANTI-ANALOGY — do NOT say "a partition is basically just splitting a
  set into groups"**: "splitting into groups" doesn't convey that ALL
  THREE conditions are simultaneously mandatory — casual "grouping"
  language invites exactly MC-1's covering-only reading.

## Demonstrations

- **Genuine-partition demonstration**: for A={1,...,6},
  {1,2},{3,4},{5,6}: check all three conditions explicitly (nonempty,
  all C(3,2)=3 pairs disjoint, union equals A) — establishes the
  positive baseline case.
- **Covers-but-overlaps demonstration**: for the same A,
  {1,2,3},{3,4,5},{5,6}: union covers A, but pairwise checking reveals
  an overlap — directly targets MC-1.
- **Empty-block-and-missed-pair demonstration**: two sub-cases —
  {1,2},{3,4},∅ (fails nonemptiness outright) and {1,2},{3,4},{4,5,6}
  (2 of 3 pairs checked look fine, but the third pair conceals overlap
  at element 4) — directly targets MC-2 and MC-3 together.

## Discovery Questions

**Need** — asked to split a class of students into study groups such
that "everyone is in exactly one group," the learner naturally arrives
at the three conditions (no one left out, no one double-counted, no
empty groups) as the precise formalization of "exactly one group each."
**Playground** — the learner checks several candidate splittings against
the three conditions, finding some pass and some fail on different
grounds. **Invention** — the learner proposes checking coverage and
disjointness as two genuinely separate tests, rather than one combined
"looks complete" judgment. **Collision** — presented with a collection
where only some pairs have been checked, and later shown an unchecked
pair conceals an overlap, the learner confronts the insufficiency of
partial checking directly — targeting MC-3. **Formalization** — naming
all three conditions explicitly as jointly necessary. **Compression** —
given a fresh collection, correctly verifying or refuting partition
status by checking all three conditions systematically, without
prompting.

## Teaching Sequence

MC-1 (covering conflated with partitioning) is addressed first, as the
single most common and highest-impact error, since a learner who
believes coverage alone suffices will systematically misjudge any
overlapping-but-covering collection. MC-2 (empty block allowed) and
MC-3 (sampling pairs) are addressed together next, via the combined
empty-block-and-missed-pair demonstration, since both stem from the
same underlying habit — treating the three-condition check as
approximate rather than exhaustive.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the genuine-partition
baseline, the primary action establishing the three-condition
procedure) → **Error Analysis** (the covers-but-overlaps case, targeting
MC-1) → **Worked Example** (the empty-block-and-missed-pair case,
targeting MC-2 and MC-3 together). **What doesn't fit**: a full
treatment of the equivalence-relation Partition Theorem (the two-
directional correspondence between partitions and equivalence
relations) — that belongs entirely to `math.found.equivalence-relation`'s
own scope; this concept supplies only the precise three-condition
definition that theorem's "partition" side assumes.

## Voice Teaching Notes

Listen for "well, everything's covered, so it should be a partition,
right?" — this is MC-1's clearest verbal signature, and should be met
with "covered by WHICH blocks — do any two of them share an element?"
A learner who stops checking pairs after finding "a few" clear is
showing MC-3 — prompt directly: "how many total pairs are there among
these blocks, and have you checked every single one?" The load-bearing
sentence: "a partition needs all three — nonempty blocks, every pair
disjoint, and the union equal to the whole set — drop any one and it's
not a partition anymore."

## Assessment Signals

Blueprint's P77/P76 items are suitable seeds for gate-style checks:
verifying a genuine partition against all three conditions; identifying
which SPECIFIC condition a flawed collection fails; determining how
many pairs must be checked for a given number of blocks and explaining
why fewer is insufficient. Because MC-3's defining signature is
STOPPING EARLY rather than a wrong final verdict, assessment should
specifically require the learner to show every pair checked (not just
state a conclusion), since a learner who happens to check the "right"
pairs by luck on a small example can appear competent while MC-3
remains latent for larger collections.

## Tutor Recovery Strategy

Likeliest utterance: "but every element is in some group, so isn't that
enough?" — the concept-specific smaller question: "are any of those
groups sharing an element with each other?" reframes the confusion from
"complete coverage is the whole definition" to "coverage is only ONE of
three independent conditions, and this collection may still fail on a
different one" — directly isolating MC-1's missing disjointness check.

## Memory Hooks

**Type**: concept (a three-condition verification procedure built
directly on the already-typed subset relation, not a single fact to
recall). Review form: fresh candidate collections mixing genuine
partitions with each of the three specific failure modes (covering-
only, empty-block, sampled-pairs), so no single failure mode is
practiced in isolation. Interleaving partners: `math.found.subset` (the
relation blocks are built from) and, once its own content is reviewed
alongside this one, `math.found.equivalence-relation` (this concept's
direct successor and primary application).

## Transfer Connections

- **Near**: `math.found.equivalence-relation`'s own Partition Theorem,
  which uses exactly this three-condition definition on its "partition"
  side — this concept supplies the precise checklist that theorem's
  informal treatment assumed.
- **Far**: partitioning arguments throughout combinatorics and
  probability (e.g. the law of total probability partitions a sample
  space into disjoint, exhaustive events — structurally identical to
  this concept's three conditions).
- **Real-world**: any allocation system requiring "everyone assigned to
  exactly one category" — course sections, tax brackets, shipping
  zones — each a direct instance of the three-condition check.
- **Expert transfer**: the learner, meeting an unfamiliar claim that a
  collection "partitions" some set, automatically verifies all three
  conditions independently rather than accepting the label at face
  value.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.partition.md`.
Key objectives and misconception registry reused by reference above;
the P76 university-sections transfer probe not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The
genuine-partition and covers-but-overlaps demonstrations are suitable
future Explanation Memory seeds; the empty-block-and-missed-pair
demonstration is a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. **Production-order note** (clarified
from the Blueprint's own Component 7, which refers to the separate
Blueprint corpus, not this Educational Brain corpus — the two
production pipelines run independently with their own batch numbering):
the BLUEPRINT for `math.found.equivalence-relation` was authored
earlier in the Blueprint corpus than this concept's own Blueprint,
despite being this concept's KG `unlocks` target — Blueprint production
order follows its own ROI-ranked topological schedule gated only by
`requires`, not `unlocks` order. The EDUCATIONAL BRAIN entry for
`math.found.equivalence-relation` has NOT yet been authored in this
program as of this entry's authoring date (this program's own
`requires`-gated topological order has not yet reached it — it depends
on `math.found.reflexive-relation`, `math.found.symmetric-relation`,
and `math.found.transitive-relation`, all three authored this same
Wave 7 batch, plus `math.found.partition` itself). This concept's own
content (the precise three-condition definition) is written to stand
independently and to be ready for `math.found.equivalence-relation`'s
own Educational Brain entry to cite by reference once authored, per
this program's established reuse-by-reference convention.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.
