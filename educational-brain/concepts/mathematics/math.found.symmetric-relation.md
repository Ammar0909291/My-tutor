# Symmetric Relation — `math.found.symmetric-relation`

## Identity

- **Concept ID**: `math.found.symmetric-relation` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.relation`)
- **Prerequisites**: `math.found.relation` — symmetry is a property OF
  a relation R⊆A×A, reusing the matrix representation directly.
- **Unlocks**: `math.found.equivalence-relation` (Blueprint already
  authored; Educational Brain entry not yet authored in this program —
  symmetry is one of its three defining components alongside
  reflexivity and transitivity, both authored this same batch).
- **Related** (from KG): `math.found.reflexive-relation`,
  `math.found.transitive-relation`.
- **Difficulty**: developing · **Bloom**: remember · **Mastery
  threshold**: 0.9 · **Est. hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.found.symmetric-relation.md`
  (cross_links=[], P76 independence).

## Learning Objective

The learner can: define a symmetric relation (R on A is symmetric iff
(a,b)∈R implies (b,a)∈R for all a,b∈A) and verify symmetry for a given
finite relation by checking, for EVERY listed pair, that its mirror
pair is also present; recognize the matrix signature of symmetry
(M[i][j]=M[j][i] for every pair of indices, checked position by
position); and correctly handle the two edge cases the "for all"
definition implies — a self-loops-only relation is symmetric, and the
empty relation is vacuously symmetric — while recognizing a single
missing mirror pair anywhere disproves symmetry entirely.

## Core Understanding

Symmetry is a universal ("for all") mirror-pair condition: R on A is
symmetric exactly when, for EVERY pair (a,b) in R, the reversed pair
(b,a) is ALSO in R — examined pair by pair with no exceptions allowed.
In matrix terms, using `math.found.relation`'s matrix M, symmetry
translates to M[i][j]=M[j][i] for every pair of indices — checked
ENTRY BY ENTRY at specific positions, never by comparing whole rows to
whole columns as unordered lists. Two edge cases follow directly from
the definition's own logical structure: a relation containing only
self-loop pairs like {(1,1),(2,2)} is symmetric (each pair trivially
mirrors itself), and the empty relation is vacuously symmetric (there
are no pairs at all for the "for all (a,b)∈R" condition to fail on).
On the other side, symmetry is fragile in a specific way: a SINGLE pair
anywhere in R missing its mirror is enough, by itself, to make the
entire relation not symmetric — there is no partial credit for having
most pairs correctly mirrored.

## Mental Models

- **Beginner model — "symmetric means most pairs have their reverse
  too"**: the learner treats symmetry as a matter of degree, judging a
  relation with mostly-mirrored pairs as "basically symmetric." Shelf-
  life warning: this model fails the instant a single counterexample
  pair is presented, since real symmetry admits no exceptions.
- **Intermediate model — "every single pair needs its mirror, checked
  one at a time"**: the learner correctly applies the exhaustive
  pair-by-pair check on explicit listings, but may still compare matrix
  rows to columns as whole unordered lists rather than checking specific
  mirrored positions. Upgrade trigger: being asked to verify symmetry
  directly from a relation matrix rather than a pair listing.
- **Advanced model — "M[i][j]=M[j][i] checked position by position, and
  the empty/self-loop edge cases are genuinely symmetric, not
  exceptions"**: the learner applies the precise entry-by-entry matrix
  check and correctly classifies boundary cases (self-loops-only, empty
  relation) as symmetric without hesitation. Upgrade trigger: being
  asked whether the empty relation is symmetric and being able to
  justify the answer via vacuous truth rather than by rote memorization
  of "yes."
- **Do not upgrade early**: a learner still treating symmetry as a
  matter of degree (beginner model) should not be pushed into the
  matrix-position check (intermediate-to-advanced) before the
  all-or-nothing, no-partial-credit nature of the definition is fully
  secure — the matrix check is a different REPRESENTATION of the same
  exhaustive requirement, not a shortcut around it.

## Why Students Fail

The dominant failure treats symmetry as approximate — a relation with
most, but not all, pairs correctly mirrored is judged "basically
symmetric," missing that symmetry is a strict universal claim where a
single counterexample is a complete disproof. A second, independent
failure occurs when reading a relation's matrix: learners compare the
overall list of a row's entries to the overall list of a column's
entries as unordered collections, rather than checking the SPECIFIC
positions M[i][j] and M[j][i] against each other. A third failure is
denying that boundary-case relations (self-loops only, or the empty
relation) can be symmetric at all, missing that both trivially or
vacuously satisfy the universal condition.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 6), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — SINGLE-COUNTEREXAMPLE-SUFFICIENT-OVERLOOKED (Foundational
severity; Type 1, overgeneralization — treating a "mostly mirrored"
relation as close enough, since partial credit is a familiar and
reasonable norm in many other contexts)**
- *Trigger*: asked whether a relation with most pairs mirrored is
  "basically symmetric," the learner answers "yes."
- *Repair*: for R'={(1,2),(2,1),(1,3)} on {1,2,3} — 2 of 3 pairs
  correctly mirrored, but (1,3)∈R' while its mirror (3,1)∉R'. "Symmetry
  is a 'for all' claim — a single counterexample anywhere disproves it
  completely, exactly like disproving any other universal statement."

**MC-2 — SYMMETRIC-MATRIX-CHECK-MISAPPLIED (Moderate severity; Type 4,
notation-induced — the visual layout of a matrix invites comparing
whole rows to whole columns as if they were interchangeable lists,
rather than checking specific mirrored cells)**
- *Trigger*: asked whether comparing the list of numbers in each row to
  the list of numbers in each column is sufficient to check matrix
  symmetry, the learner answers "yes."
- *Repair*: for the matrix of R={(1,2),(2,1),(1,3),(3,1)} on {1,2,3},
  check M[1][2]=1=M[2][1]✓, M[1][3]=1=M[3][1]✓, M[2][3]=0=M[3][2]✓ —
  entry by entry, at SPECIFIC positions. "Compare M[i][j] to M[j][i] at
  each specific position — never compare whole rows to whole columns as
  unordered lists."

**MC-3 — VACUOUS-OR-SELF-LOOP-SYMMETRY-DENIED (Foundational severity;
Type 2, perceptual intuition — "nothing to check" or "only self-pairs"
intuitively feels like it should disqualify a relation rather than
trivially satisfy the condition)**
- *Trigger*: asked whether the empty relation or a self-loops-only
  relation is symmetric, the learner answers "no."
- *Repair*: for R''={(1,1),(2,2)}, each pair trivially mirrors itself
  ((1,1)⟹(1,1)), so R'' IS symmetric; for the empty relation ∅, there
  are no pairs in R to violate the "for all (a,b)∈R..." condition, so
  it holds vacuously. "'(a,a)⇒(a,a)' trivially holds, and 'for all pairs
  in an empty set' is vacuously true — both are genuinely symmetric, not
  exceptions to worry about."

## Analogies

- **Best analogy — mutual-friendship social network**: if a platform
  requires friendship to always be mutual (if a friends b, b
  automatically friends a too), the friendship relation is symmetric —
  but a different platform's one-way "follows" relationship, where even
  a SINGLE user follows someone who doesn't follow back, fails symmetry
  entirely for the whole network, no matter how many other users do
  follow each other back. Breaking point: real social platforms often
  describe partial mutuality informally ("mostly mutual") in a way
  mathematics never permits — the analogy's value is precisely in
  contrasting that informal tolerance with symmetry's strict
  all-or-nothing requirement.
- **ANTI-ANALOGY — do NOT say "symmetric basically means it goes both
  ways most of the time"**: "most of the time" directly reinforces
  MC-1 by suggesting symmetry admits degrees rather than being a strict
  universal condition.

## Demonstrations

- **Complete-mirror-check demonstration**: for R={(1,2),(2,1),(1,3),(3,1)}
  on {1,2,3}, check every pair's mirror explicitly (both present) —
  establishes the positive baseline.
- **Single-missing-mirror demonstration**: for R'={(1,2),(2,1),(1,3)},
  nearly identical to the baseline but missing (3,1) — one failure is
  sufficient to disqualify the whole relation — directly targets MC-1.
- **Matrix-entry-by-entry demonstration**: for the baseline R, walk the
  matrix check M[1][2]=M[2][1], M[1][3]=M[3][1], M[2][3]=M[3][2]
  position by position, then separately confirm the self-loops-only and
  empty-relation edge cases are symmetric — directly targets MC-2 and
  MC-3.

## Discovery Questions

**Need** — asked whether a platform's mutual-friendship policy is
correctly enforced given a specific friend list, the learner naturally
checks each pair's reverse. **Playground** — the learner checks several
relations for symmetry, discovering that finding "most" pairs mirrored
still fails the check if even one is missing. **Invention** — the
learner proposes the exhaustive "check every pair's mirror" procedure
as the formal test. **Collision** — asked whether the empty relation is
symmetric, the learner's "nothing to check, so it can't qualify"
instinct collides with the vacuous-truth resolution — targeting MC-3.
**Formalization** — naming the universal mirror-pair condition and the
matrix M[i][j]=M[j][i] signature explicitly. **Compression** — given a
fresh relation (as a listing or matrix), correctly determining symmetry
by exhaustive, position-specific checking without prompting.

## Teaching Sequence

MC-1 (single-counterexample overlooked) is addressed first, as the most
common and highest-impact error, establishing the strict all-or-nothing
nature of the definition before any representational (matrix) machinery
is introduced. MC-2 (matrix check misapplied) is addressed second, once
the underlying "for all" requirement is secure, since the matrix check
is only a different representation of the same requirement. MC-3
(vacuous/self-loop symmetry denied) is addressed last, as the sharpest
test of whether the "for all" definition has been understood precisely
enough to extend correctly to its own boundary cases.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the complete-mirror-
check and single-missing-mirror pair, the primary action targeting
MC-1) → **Demonstration** (the matrix entry-by-entry check, targeting
MC-2) → **Thought Experiment** (the empty-relation and self-loops-only
boundary-case collision, targeting MC-3). **What doesn't fit**: a
formal count of symmetric relations on a set of size n — useful
enrichment but beyond this concept's `bloom: remember` core scope,
offered only as extension for advanced learners.

## Voice Teaching Notes

Listen for "well, most of the pairs match up, so it's basically
symmetric" — this is MC-1's clearest verbal signature, and should be
met immediately with "show me the ONE pair that doesn't have its
mirror — does that count, even just once?" A learner comparing whole
rows to whole columns as lists (rather than specific positions) is
showing MC-2 — prompt directly: "compare THIS specific cell to THAT
specific cell, not the whole row to the whole column." The load-bearing
sentence: "symmetry is 'for all' — one missing mirror anywhere
disproves it completely, no partial credit."

## Assessment Signals

Blueprint's P77/P76 items are suitable seeds for gate-style checks:
verifying symmetry on an explicit pair listing with a single hidden gap
(MC-1 probe); writing out and verifying a matrix entry by entry (MC-2
probe); classifying the empty relation and a self-loops-only relation
(MC-3 probe). Because MC-1's defining signature is a correct-looking
"mostly symmetric" judgment reached without checking every pair,
assessment should require the learner to show every pair's mirror
check explicitly, not just state a final yes/no verdict.

## Tutor Recovery Strategy

Likeliest utterance: "it's symmetric enough, right? most of it matches"
— the concept-specific smaller question: "is there even ONE pair
without its mirror present?" reframes the confusion from "symmetry
tolerates a few gaps" to "a single gap, anywhere, is a complete
disproof" — directly isolating MC-1's missing all-or-nothing
requirement.

## Memory Hooks

**Type**: procedural (an exhaustive, position-specific verification
habit — checking every pair's mirror, or every matrix cell against its
diagonal counterpart — not a single fact). Review form: fresh relations
(both as listings and matrices) requiring complete symmetry checks,
periodically including a boundary case (empty relation, self-loops
only) to keep MC-3's edge-case lesson active. Interleaving partners:
`math.found.relation` (the matrix representation this concept's check
directly reuses) and `math.found.reflexive-relation` (authored this
same batch, the property this concept must stay clearly distinguished
from, per that entry's own MC-2).

## Transfer Connections

- **Near**: `math.found.equivalence-relation` (not yet authored),
  symmetry is one of its three required components alongside
  reflexivity and transitivity, both authored this same batch.
- **Far**: undirected-graph adjacency (an edge between u and v is
  inherently symmetric — if u is adjacent to v, v is adjacent to u), a
  direct structural application of this concept's matrix signature.
- **Real-world**: mutual-relationship policies (friendship, marriage,
  "is a sibling of") versus one-directional relationships (following,
  "is a parent of") — a direct real-world sorting exercise using this
  concept's checklist.
- **Expert transfer**: the learner, meeting an unfamiliar binary
  relation claimed to be "reciprocal" or "mutual," automatically checks
  for a single counterexample pair rather than accepting a "mostly"
  qualitative impression.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.symmetric-relation.md`.
Key objectives and misconception registry reused by reference above;
the P76 social-network transfer probe not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The
complete-mirror-check and single-missing-mirror demonstrations are
suitable future Explanation Memory seeds; the matrix entry-by-entry
check is a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. Estimated hours (1) and mastery
threshold (0.9) match `math.found.reflexive-relation`'s own values
(authored this same batch), appropriately reflecting the two concepts'
parallel scope as sibling relation-property definitions built on the
same prerequisite.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.
