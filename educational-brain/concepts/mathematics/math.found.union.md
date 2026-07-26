# Union — `math.found.union`

## Identity

- **Concept ID**: `math.found.union` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-operations`)
- **Prerequisites**: `math.found.set-operations` — union is one of the
  four operations that concept already introduces at a survey level;
  this entry supplies its own dedicated, deeper treatment.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.intersection`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.9 · **Est. hours**: 1
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node, reusing `math.found.set-operations`'s own
  treatment by reference where content already exists there.

## Learning Objective

The learner can: compute A∪B = {x : x∈A or x∈B} for concrete sets,
correctly including elements present in EITHER set (including those in
both, counted once); recognize union as commutative and associative;
and correctly distinguish "or" in the mathematical (inclusive) sense
from any implied "one or the other but not both" reading.

## Core Understanding

The union of A and B, written A∪B, is the set of all elements belonging
to A, to B, or to both — formally A∪B = {x : x∈A or x∈B}, using the
INCLUSIVE "or" (an element in both A and B still belongs to A∪B, listed
only once, since sets never record repetition). `math.found.set-
operations` already establishes union as one of four standard
operations and that union alone is associative — (A∪B)∪C = A∪(B∪C) —
so repeated union never requires attention to grouping, unlike mixed
expressions combining union with intersection. This entry's own
contribution beyond that survey is the specific, dedicated treatment of
union's inclusive-or semantics and its behavior on special cases:
A∪∅=A (the empty set contributes nothing), A∪A=A (idempotent — union
with itself adds nothing new), and A∪B=B∪A (commutative, since "in A or
B" and "in B or A" describe the identical condition).

## Mental Models

- **Beginner model — "union means the sets combined, roughly like
  addition"**: the learner treats ∪ as literally adding element counts
  together. Shelf-life warning: this model produces a wrong cardinality
  the moment A and B share any element, since |A∪B| ≠ |A|+|B| in
  general (shared elements are not double-counted).
- **Intermediate model — "union collects every element that's in EITHER
  set, with shared elements listed once"**: the learner correctly
  computes A∪B by listing all distinct elements from both sets. Upgrade
  trigger: being asked whether "or" in "x∈A or x∈B" excludes elements in
  both — the inclusive/exclusive-or distinction.
- **Advanced model — "∪ is the inclusive-or set operation, commutative
  and associative, with ∅ and self as clean special cases"**: the
  learner fluently applies A∪∅=A and A∪A=A without hesitation and
  correctly explains why "or" here never means "one but not the other."
  Upgrade trigger: being asked to justify, from the definition itself,
  why an element in both A and B still belongs to A∪B exactly once.
- **Do not upgrade early**: a learner still treating union as additive
  counting (beginner model) should not be pushed into the special-case
  reasoning (advanced model) before the basic "collect all distinct
  elements from either set" procedure is itself reliable on sets with
  genuine overlap.

## Why Students Fail

The dominant failure treats union as a counting/addition operation,
computing |A∪B| as |A|+|B| regardless of overlap — a natural but
incorrect carryover from everyday "combining two groups" language,
which in ordinary experience often does mean simple addition (e.g.
combining two disjoint piles of objects). A second, independent failure
reads "or" exclusively (as in "coffee or tea," implying a choice between
alternatives, not both), leading students to wrongly EXCLUDE elements
present in both A and B from A∪B, when mathematical "or" is inclusive by
convention.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "Union adds the sizes: |A∪B| = |A|+|B|" (Type 1,
overgeneralization from combining disjoint everyday collections, where
addition genuinely is correct)**
- *Why*: many everyday "combine two groups" experiences involve
  genuinely disjoint collections (a bag of red marbles combined with a
  bag of blue marbles), where addition is the correct count — the
  learner has not yet encountered a case where the groups overlap.
- *Symptom*: computing |A∪B| by adding |A| and |B| even when A and B
  share elements, producing an inflated count.
- *Detection probe*: for A={1,2,3}, B={2,3,4}, ask for |A∪B|.
- *Recovery*: list A∪B explicitly: {1,2,3,4} — 4 elements, not
  |A|+|B|=6. "2 and 3 are shared — they get listed once in the union,
  not twice. Addition only works when the two sets share nothing."
- *Verification*: the learner correctly computes |A∪B| for sets with
  partial overlap, without defaulting to addition.

**MC-2 — "Union means 'in both,' like everyday 'and'" (Type 3,
notation/language contamination — confusing union's own name with the
DIFFERENT operation intersection, whose meaning students sometimes
learn first or more vividly)**
- *Why*: "union" (joining together) and "intersection" (overlap) are
  introduced closely together, and students sometimes swap which
  symbol/name goes with which meaning, especially under time pressure.
- *Symptom*: computing A∪B by keeping only shared elements — actually
  computing A∩B while labeling it "union."
- *Detection probe*: ask the learner to compute A∪B for A={1,2}, B=
  {2,3}, and separately name what A∩B would be.
- *Recovery*: anchor union to its everyday meaning first: "union" means
  JOINED TOGETHER, like a labor union bringing members together — A∪B
  is everything from EITHER set, a bigger or equal-sized result, never
  smaller than either A or B alone.
- *Verification*: the learner correctly computes |A∪B|≥max(|A|,|B|) and
  distinguishes it from intersection without hesitation.

## Analogies

**Primary — combining two guest lists for one party**: If list A
invites {Alice, Bob, Carol} and list B invites {Bob, Dana}, the combined
guest list (union) is {Alice, Bob, Carol, Dana} — Bob is invited once,
not twice, even though he appeared on both original lists.

**Anti-analogy to retire**: "Union is like addition — combine the
counts." This directly invites MC-1 by suggesting element counts simply
sum, ignoring overlap.

## Demonstrations

**Overlapping-sets union**: A={1,2,3,4}, B={3,4,5,6}. A∪B={1,2,3,4,5,6}
— six distinct elements, not eight (|A|+|B|=8), since 3 and 4 are
shared and counted once.

**Special cases**: A∪∅=A (nothing added); A∪A=A (idempotent — listing A
with itself adds nothing new); A∪B=B∪A directly verified by listing
both orders and confirming identical results.

## Discovery Questions

Present two overlapping guest lists and ask the learner to produce "the
complete list of everyone invited, with no one listed twice." The
learner naturally constructs the union procedure (list everyone,
remove duplicates) before the term is introduced. Recommendation: brief
discovery for the "combine and deduplicate" procedure; direct
instruction for the inclusive-or reading of the formal definition,
since exclusive-or is the more common everyday default and needs
explicit correction.

## Teaching Sequence

MC-1 (additive miscounting) is addressed first, since it produces a
concrete, checkable wrong answer (cardinality) that is easy to detect
and correct directly. MC-2 (union/intersection swap) is addressed
second, as a naming/notation issue best resolved once the correct
COMPUTATION procedure (MC-1's fix) is already secure.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the overlapping-sets
union computation, the primary action targeting MC-1) → **Matching**
(sort expressions/results into "union" vs. "intersection" piles,
targeting MC-2) → **Drill** (rapid union computations on varied,
partially-overlapping set pairs). **What doesn't fit**: mixed-operation
grouping sensitivity (union combined with intersection) — that content
belongs to `math.found.set-operations`'s own treatment and is not
re-derived here, since union alone is associative and needs no grouping
caveat.

## Voice Teaching Notes

**Register**: Concrete and count-focused — always ground union in an
explicit listing before discussing cardinality, since the additive
miscounting error (MC-1) is specifically a cardinality error.

**Wait-time rule**: After presenting two overlapping sets, pause before
revealing A∪B — ask the learner to predict the SIZE of the union first,
surfacing MC-1 before the correct listing is shown.

**Load-bearing sentences**:
- "Union is everyone from either list, each person counted once."
- "Shared elements don't get counted twice — that's the whole reason
  union isn't just addition."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is a numerically
WRONG but structurally plausible answer, assessment should specifically
include at least one item with genuine overlap between A and B (not
disjoint sets), since disjoint-set examples cannot distinguish correct
union computation from additive miscounting — the two produce the same
answer when A∩B=∅.

## Tutor Recovery Strategy

Likeliest utterance: "so union just means add them together?" — the
concept-specific smaller question: "does anything appear in BOTH lists?
If so, how many times should it appear in the combined list?" reframes
the confusion from "combining means adding" to "combining means listing
each qualifying element exactly once" — directly isolating MC-1's
missing deduplication step.

## Memory Hooks

**Memory type**: procedural (a listing-and-deduplication computation,
directly reusing the containment facility from `math.found.subset`).
Review form: fresh set pairs with genuine overlap, requiring explicit
cardinality computation (not just the listed result), to keep MC-1's
guard-rail active. Interleaving partners: `math.found.intersection`
(the operation most often confused with union, per MC-2) and
`math.found.set-operations` (the umbrella treatment this entry
specializes).

## Transfer Connections

- **Near**: `math.found.intersection` (the paired, contrasting
  operation); `math.found.venn-diagram` (union's standard pictorial
  region).
- **Far**: database query UNION operators (SQL's UNION explicitly
  deduplicates by default, directly mirroring this concept's own
  no-double-counting rule); logical OR in propositional logic (the
  inclusive-or semantics union directly inherits).
- **Real-world**: merging two contact lists, invite lists, or mailing
  lists without duplicate entries.
- **Expert transfer**: the learner, meeting an unfamiliar "combine"
  operation on a new mathematical structure, automatically checks
  whether shared elements are handled additively or by deduplication
  before assuming either.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.union.md` — stated explicitly per the established no-
Blueprint convention, not omitted. This entry reuses
`math.found.set-operations`'s own Blueprint-grounded treatment of union
(Component 3/4 of that Blueprint) by reference for the shared survey
content (the four-operations overview, mixed-grouping sensitivity),
adding only union-specific misconceptions and depth not covered there.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate
— no other math.found concept lists union as a direct prerequisite,
consistent with `math.found.set-operations` already serving as the
umbrella node other concepts depend on. Estimated hours (1) and mastery
threshold (0.9) are appropriate for a concept whose dedicated content
(beyond the survey already in set-operations) is genuinely compact —
one computation procedure plus two common miscomputation patterns.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 8) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure; shared survey content reused by reference from `math.found.set-operations`, not restated. |
