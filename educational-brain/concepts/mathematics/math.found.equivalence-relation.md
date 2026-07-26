# Equivalence Relation — `math.found.equivalence-relation`

## Identity

- **Concept ID**: `math.found.equivalence-relation` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.relation`; child in KG: `math.found.equivalence-class`,
  not yet authored)
- **Prerequisites**: `math.found.reflexive-relation`,
  `math.found.symmetric-relation`, `math.found.transitive-relation` —
  all three authored this program's Wave 7; this concept directly
  combines them.
- **Unlocks**: `math.found.equivalence-class`, `math.abst.quotient-group`,
  `math.nt.congruence`.
- **Related** (from KG): `math.found.partial-order`.
- **Difficulty**: developing · **Bloom**: analyze · **Mastery
  threshold**: 0.8 · **Est. hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.found.equivalence-relation.md`
  (cross-links checked, neither authored → independence mode).

## Learning Objective

The learner can: define an equivalence relation as one satisfying ALL
THREE of reflexivity, symmetry, and transitivity simultaneously,
verifying each by directly reusing each prerequisite's own established
checking procedure; state the Partition Theorem in both directions (an
equivalence relation partitions its set into disjoint equivalence
classes, and conversely any partition defines a valid equivalence
relation); and recognize that missing even one of the three required
properties breaks the entire structure, including the guarantee that
classes are cleanly disjoint or identical.

## Core Understanding

A relation R on A is an equivalence relation exactly when it is
reflexive AND symmetric AND transitive, all at once — verifying it
means running each prerequisite's own established procedure in turn
(every element has its self-pair; every pair has its mirror; every
chain closes up), with nothing new invented for the checking process
itself. The only new idea is that all three must hold together for the
SAME relation. Given an equivalence relation ∼ on A, the equivalence
class of a is [a] = {x∈A : x∼a} — every element related to a. A
foundational consequence of the three properties together is that any
two equivalence classes [a] and [b] are either completely IDENTICAL (if
a∼b) or completely DISJOINT (if not a∼b) — partial overlap is
impossible: if some z were in both [a] and [b], then z∼a and z∼b, so by
symmetry a∼z, and by transitivity a∼z∼b forces a∼b, making the classes
fully identical after all. Collecting the distinct classes therefore
genuinely partitions A into disjoint, exhaustive blocks (per
`math.found.partition`'s own three-condition definition). The CONVERSE
also holds: given any partition of A, declaring x∼y exactly when x and
y lie in the same block automatically produces a genuine equivalence
relation — reflexivity, symmetry, and transitivity all follow
immediately from "same block as." Equivalence relations and partitions
are two views of the exact same structure. Missing even one of the
three properties breaks everything: a relation satisfying only two is
not "close to" an equivalence relation — it simply is not one, and its
would-be classes need not behave consistently, since the disjoint-or-
identical guarantee itself relied on all three properties holding
together.

## Mental Models

- **Beginner model — "an equivalence relation is a relation that's kind
  of like equality"**: the learner has an intuitive but unverified
  sense of the concept, without a systematic three-property check.
  Shelf-life warning: this model cannot distinguish a genuine
  equivalence relation from one that superficially resembles equality
  but fails one property.
- **Intermediate model — "check reflexive, symmetric, and transitive in
  turn, all must pass"**: the learner correctly runs all three checks
  using each prerequisite's own procedure, but may still believe classes
  could partially overlap, or that only the relation-to-partition
  direction of the correspondence holds. Upgrade trigger: being asked
  whether two equivalence classes could share only SOME elements.
- **Advanced model — "classes are identical-or-disjoint by a direct
  symmetry+transitivity argument, and the relation-partition
  correspondence runs both directions"**: the learner derives the
  disjoint-or-identical property from the three defining conditions and
  fluently moves between a relation and its induced partition in either
  direction. Upgrade trigger: being handed a partition (not a relation)
  and asked to construct the equivalence relation it defines.
- **Do not upgrade early**: a learner who has not yet made the combined
  three-property check itself fully reliable (beginner-to-intermediate)
  should not be pushed into the Partition Theorem's bidirectional
  correspondence (advanced model) — the theorem's proof directly
  depends on all three properties being available to invoke together.

## Why Students Fail

The dominant failure treats the three-property requirement as a matter
of degree — believing a relation satisfying two of the three properties
is "basically" an equivalence relation, when in fact all three are
simultaneously and unconditionally required, with no partial credit. A
second, closely related failure believes two equivalence classes could
share some but not all elements, missing that the combination of
symmetry and transitivity forces any shared element to make the classes
FULLY identical, not partially overlapping. A third failure assumes only
the relation-to-partition direction of the correspondence holds,
missing that any partition handed to you — with no relation given at
all — automatically defines a valid equivalence relation via "same
block as," with reflexivity, symmetry, and transitivity all following
immediately from that definition.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: PARTIAL-PROPERTY-SET-ASSUMED-SUFFICIENT (Foundational; Type 1 — overgeneralization)
**Trigger**: asked whether a relation reflexive and symmetric but not
quite transitive is "still basically an equivalence relation," the
learner answers "yes."
**Repair**: for A={1,2,3}, R'={(1,1),(2,2),(3,3),(1,2),(2,1),(2,3),(3,2)}
— reflexive ✓, symmetric ✓, but transitive check on (1,2),(2,3)
requires (1,3)∈R', which is absent — transitivity FAILS. R' satisfies 2
of 3 properties yet is NOT an equivalence relation, and its attempted
"class of 1" cannot consistently include both 2 and 3 the way a genuine
equivalence class would. "Two out of three properties is not 'almost an
equivalence relation' — it's simply not one."

### MC-2: EQUIVALENCE-CLASSES-ASSUMED-CAN-PARTIALLY-OVERLAP (Foundational; Type 1 — overgeneralization)
**Trigger**: asked whether two equivalence classes could share some but
not all elements, the learner answers "yes."
**Repair**: for A={1,2,3,4}, R = "same parity" — [1]={1,3}=[3]; [2]=
{2,4}=[4]; [1]∩[2]=∅. Any shared element z between [a] and [b] forces
z∼a and z∼b, so by symmetry a∼z, and by transitivity a∼z∼b gives a∼b —
making [a] and [b] fully identical. "Equivalence classes never partially
overlap — they're either the same class or entirely separate ones."

### MC-3: PARTITION-CORRESPONDENCE-ASSUMED-ONE-DIRECTIONAL (Moderate; Type 1 — overgeneralization from only having practiced one direction)
**Trigger**: asked whether being handed a partition (with no relation
given) automatically yields a valid equivalence relation, the learner
answers "no, that direction doesn't automatically work."
**Repair**: starting from the partition {{1,3},{2,4}} of {1,2,3,4} and
defining "same block," the relation {(1,1),(1,3),(3,1),(3,3),(2,2),
(2,4),(4,2),(4,4)} is recovered exactly, with reflexivity/symmetry/
transitivity all automatic from "same block as." "Relations and
partitions are two views of the same structure, and the correspondence
runs both ways."

## Analogies

**Primary — sorting into study groups by same-course-load**: A
university group is "equivalent" if declared equivalent when enrolled
in the exact same set of courses this semester. Verifying reflexivity,
symmetry, and transitivity for "same course set" is immediate — each
follows from equality of sets itself. Two students' classes could never
partially overlap (share some but not all members), since "same course
set as" is fully transitive: sharing that relationship with a third
student forces identical enrollment.

**Anti-analogy to retire**: "An equivalence relation is basically the
same as equality, just a bit looser." This framing invites MC-1 by
suggesting near-misses to full equality (missing one property) still
count — they do not.

## Demonstrations

**Full three-property verification**: A={1,2,3,4}, R={(a,b): a,b have
the same parity}. Reflexive: (1,1),(2,2),(3,3),(4,4) all present ✓.
Symmetric: (1,3)&(3,1) ✓, (2,4)&(4,2) ✓. Transitive: (1,3),(3,1)⟹(1,1)
✓; (2,4),(4,2)⟹(2,2) ✓. All three hold — R is a genuine equivalence
relation.

**Classes are identical-or-disjoint, and the converse recovers R
exactly**: for the same R, [1]={1,3}=[3]; [2]={2,4}=[4]; [1]∩[2]=∅ —
completely disjoint. A partitions into exactly {1,3} and {2,4}. Starting
FROM this partition and defining "same block" recovers R exactly.

**Missing transitivity breaks everything**: R'={(1,1),(2,2),(3,3),
(1,2),(2,1),(2,3),(3,2)} on {1,2,3} — reflexive and symmetric hold, but
(1,2),(2,3) requires (1,3)∈R', which is absent. R' satisfies 2 of 3
properties yet is not an equivalence relation, and element 1 cannot be
cleanly grouped with both 2 and 3 the way a consistent class would
require.

## Discovery Questions

Present a specific relation (same-parity on {1,2,3,4}) and ask the
learner to verify each of the three already-known properties in turn —
this is direct reuse, not new discovery, appropriate given the CPA
entry stage is Concrete verification of a specific relation before the
general theorem. Once verified, ask: "group the elements by who they're
related to — what do you notice about the groups?" The learner
discovers the disjoint-or-identical pattern before it is named.
Recommendation: guided verification for the combined three-property
check (reusing prior skills); direct instruction for the Partition
Theorem itself and its converse direction, since the bidirectional
correspondence is a genuinely new, non-obvious result.

## Teaching Sequence

MC-1 (partial-property-set assumed sufficient) is addressed first and
given the most weight, since it undermines the entire concept's premise
— a learner who accepts 2-of-3 as sufficient cannot meaningfully verify
any subsequent example. MC-2 (classes assumed to partially overlap) is
addressed second, once the three-property check is secure, since the
disjoint-or-identical proof directly invokes symmetry and transitivity
together. MC-3 (partition correspondence assumed one-directional) is
addressed last, as the most conceptually demanding piece, requiring
both prior misconceptions resolved before the bidirectional theorem can
be appreciated.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (partial credit assumed) | ERROR ANALYSIS: reflexive+symmetric relation that fails transitivity, classes become inconsistent | Teaching Actions: TEST-THINKING §5 |
| MC-2 active (classes overlap partially) | WORKED EXAMPLE: symmetry+transitivity argument forcing shared-element classes to be identical | Teaching Actions: SHOW §1 |
| MC-3 active (one-directional correspondence) | WORKED EXAMPLE: construct the relation from a given partition, verify it matches the original | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: university same-course-load grouping, both directions | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Synthesis-oriented — remind the learner explicitly that
each of the three checks is a skill they already have; this concept
combines, not reinvents.

**Wait-time**: After presenting a relation for the combined three-
property check, wait for the learner to run all three independently
before confirming — resist supplying the verdict of any single property
early.

**Load-bearing sentences**:
- "All three, together, or it isn't an equivalence relation at all."
- "Identical or disjoint — never partial, and here's exactly why the
  three properties force that."
- "Relations and partitions are two views of the same structure — the
  correspondence runs both ways."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1 (VERIFICATION)**: For A={1,...,6} and R={(a,b): a≡b (mod 3)},
verify all three properties and identify R's equivalence classes. Pass:
all three verified; classes {1,4},{2,5},{3,6} identified.

**Gate 2 (PARTITION CHECK)**: Confirm the classes from Gate 1 are
pairwise disjoint and their union is all of A. Pass: correct
verification.

**Gate 3 (CONVERSE)**: Given the partition {{1,4},{2,5},{3,6}} of
{1,...,6}, construct the equivalence relation it defines and verify it
matches Gate 1's relation. Pass: correct construction and match.

**Gate 4 (MISCONCEPTION probe)**: A relation on {1,2,3} is reflexive and
transitive but NOT symmetric. Explain why it is not an equivalence
relation, and why its "classes" would not behave consistently. Pass:
identifies the missing property and the resulting breakdown.

**Mastery criterion**: score ≥4/5, consistent with KG mastery_threshold
0.8.

## Tutor Recovery Strategy

**If Gate 1 fails on any single property**: Return to that property's
own prerequisite entry (`math.found.reflexive-relation`,
`math.found.symmetric-relation`, or `math.found.transitive-relation`)
and re-verify the individual skill before returning to the combined
check.

**If Gate 3 fails**: MC-3 is active. Walk the converse construction
explicitly, step by step: "same block" defines the relation; verify
each of the three properties follows automatically from that
definition, without re-deriving anything new.

**If Gate 4 fails**: MC-1 is active. Return to the transitivity-missing
demonstration and have the learner attempt to assign a consistent class
to element 1 — the inconsistency is the repair.

## Memory Hooks

**Memory type**: Declarative (the combined definition) + structural
(the Partition Theorem as a bidirectional correspondence).

**Forgetting profile**: The combined three-property check is durable
once each individual property-check is itself durable. The disjoint-or-
identical guarantee and the converse direction are more fragile and
benefit from periodic re-derivation rather than passive recall.

**Spaced retrieval targets**:
- Session +1: Verify all three properties for a fresh relation and
  identify its classes.
- Session +7: Construct the relation defined by a given partition.
- Session +21: State, unprompted, why classes can never partially
  overlap.

## Transfer Connections

**Near transfer**:
- `math.found.equivalence-class` (a dedicated deeper treatment of the
  class construction previewed here)
- `math.found.partition`'s own three-condition definition, directly
  invoked by the Partition Theorem

**Far transfer**:
- `math.nt.congruence` (congruence mod n is the canonical number-
  theoretic equivalence relation, previewed via the same-parity example)
- `math.abst.quotient-group` (quotient structures in group theory are
  built directly from an equivalence relation's classes)

## Cross-Subject Connections

KG lists `math.nt.congruence` and `math.abst.quotient-group` as cross-
links; confirmed via directory listing that neither has a Blueprint yet
authored, matching the Blueprint's own independence-mode declaration.
The same-parity worked example throughout this entry was deliberately
chosen to preview `math.nt.congruence`'s own "same remainder" idea in
miniature, without fabricating a cross-link connection beyond what the
KG currently supports.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.equivalence-relation.md`.

Key teaching objectives and misconception registry reused by reference
above; the P76 university-course-load transfer probe (three parts,
covering verification, class interpretation, and the converse
direction) not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The full
three-property verification and the classes-are-identical-or-disjoint
demonstrations are suitable future Explanation Memory seeds; Gate 4 is
a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. This concept directly synthesizes three
already-authored prerequisites (Wave 7) into one combined structure plus
one genuinely new theorem (the class/partition correspondence),
appropriate for its `developing`/`analyze` classification. Cross-link
verification (both `math.nt.congruence` and `math.abst.quotient-group`
unauthored) reconfirmed current as of this entry's authoring date.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 8) | Initial entry, grounded in the existing Blueprint. |
