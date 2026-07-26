# Set Difference — `math.found.set-difference`

## Identity

- **Concept ID**: `math.found.set-difference` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-operations`)
- **Prerequisites**: `math.found.set-operations` — set difference is one
  of the four operations that concept already introduces at a survey
  level; this entry supplies its own dedicated, deeper treatment.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.complement`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.9 · **Est. hours**: 1
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node, reusing `math.found.set-operations`'s own
  treatment by reference where content already exists there.

## Learning Objective

The learner can: compute A\B = {x : x∈A and x∉B} for concrete sets,
correctly removing exactly B's elements from A and nothing else;
recognize that set difference is NOT commutative (A\B≠B\A in general);
and connect set difference to complement, recognizing A\B = A∩Bᶜ once a
universal set is available.

## Core Understanding

The set difference A\B (also written A−B) consists of all elements in A
that are NOT in B — formally A\B = {x : x∈A and x∉B}. `math.found.set-
operations` already establishes this as one of four standard operations
and already demonstrates, via its own worked example, that difference is
order-dependent: A\B and B\A are generally different sets (A\B removes
B's elements FROM A, keeping only what's left of A; B\A does the
reverse, removing A's elements from B). This entry's own contribution
beyond that survey is set difference's relationship to the OTHER
operations: A\B = A∩Bᶜ (removing B's elements from A is exactly the same
as keeping only the elements of A that are also outside B — an
intersection with B's complement), a connection that only becomes
meaningful once a universal set is fixed (per `math.found.complement`).
Set difference also has special-case behavior worth naming explicitly:
A\∅=A (removing nothing changes nothing), A\A=∅ (removing everything in
A from itself leaves nothing), and ∅\A=∅ (there is nothing in the empty
set to keep in the first place, regardless of what's removed).

## Mental Models

- **Beginner model — "set difference is like union or intersection, just
  with a different symbol"**: the learner has not yet distinguished
  difference's directional, order-sensitive nature from union/
  intersection's commutative behavior. Shelf-life warning: this model
  fails the instant A\B and B\A are computed side by side and turn out
  different.
- **Intermediate model — "A\B removes B's elements from A, and order
  matters"**: the learner correctly computes A\B and recognizes A\B≠B\A
  in general, but may not yet connect difference to complement.
  Upgrade trigger: being asked to express A\B using complement notation
  once a universal set is available.
- **Advanced model — "A\B = A∩Bᶜ, and difference's asymmetry follows
  directly from this equivalence"**: the learner fluently translates
  between the direct definition and the complement-based one, and uses
  whichever form is more convenient for a given proof or computation.
  Upgrade trigger: being asked to prove A\B = A∩Bᶜ directly from the
  definitions of difference, intersection, and complement.
- **Do not upgrade early**: a learner still expecting A\B=B\A (beginner
  model) should not be pushed into the A\B=A∩Bᶜ equivalence (advanced
  model) before the basic asymmetric-removal computation is itself
  secure on concrete, non-symmetric examples.

## Why Students Fail

The dominant failure over-generalizes from union and intersection's
genuine commutativity (A∪B=B∪A and A∩B=B∩A both hold) to assume set
difference shares this property, when in fact A\B and B\A are, in
general, entirely different sets — this misconception is explicitly
registered as `math.found.set-operations`'s own MC-3 and is not
re-derived here, only re-anchored in this concept's own dedicated
treatment. A second, independent failure treats set difference as an
operation unrelated to complement, missing that A\B is precisely A
intersected with B's complement — a connection that becomes genuinely
useful once proofs or simplifications need to move fluidly between
"remove B from A" and "keep only what's outside B" framings.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "A\B and B\A give the same result" (Type 1, overgeneralization
from union/intersection's genuine commutativity — cited by reference
from `math.found.set-operations`'s own MC-3, not re-derived here)**:
believing set difference is symmetric like the other two operations.
Full trigger/root-cause/repair pattern already established in
`math.found.set-operations`'s Misconceptions section — this entry's own
contribution is MC-2 below, which that entry does not cover.

**MC-2 — "Set difference is unrelated to complement" (Type 1,
overgeneralization from treating each of the four operations as an
independent, disconnected rule rather than recognizing algebraic
relationships between them)**
- *Why*: the four set operations (union, intersection, difference,
  complement) are typically introduced as a checklist of separate
  procedures, with no explicit connective tissue shown between them
  until the relationships are pointed out directly.
- *Symptom*: being unable to rewrite A\B using intersection and
  complement, or treating "remove B from A" and "keep only what's
  outside B" as two unrelated ideas rather than the same computation
  described two ways.
- *Detection probe*: given A={1,2,3,4}, B={3,4,5,6}, U={1,...,10}, ask
  the learner to compute A\B directly, then separately compute A∩Bᶜ,
  and ask whether the two results should match.
- *Recovery*: compute both side by side: A\B={1,2} (A's elements not in
  B). Bᶜ (relative to U)={1,2,7,8,9,10} (everything except B). A∩Bᶜ =
  {1,2,3,4}∩{1,2,7,8,9,10}={1,2} — identical to A\B. "Removing B's
  elements from A is exactly the same operation as keeping only A's
  elements that are also outside B."
- *Verification*: the learner correctly rewrites a fresh A\B expression
  as A∩Bᶜ and confirms both computations agree.

## Analogies

**Primary — the guest list minus the no-shows**: If A is the full
invited guest list and B is the list of people who cancelled, A\B is
exactly who actually shows up — everyone invited, minus everyone who
cancelled. Note the direction matters: "invited minus cancelled" (A\B)
is a completely different, and more useful, list than "cancelled minus
invited" (B\A, which would only make sense if some cancellations came
from people never invited in the first place).

**Anti-analogy to retire**: "Set difference is just subtraction for
sets." Ordinary numerical subtraction can produce negative numbers and
has its own algebraic structure; set difference always produces a
subset of A (never "negative" elements) and does not share number
subtraction's algebraic laws (e.g. (A\B)\C ≠ A\(B\C) in general, unlike
some numeric subtraction regroupings).

## Demonstrations

**Asymmetry, side by side**: A={1,2,3,4}, B={3,4,5,6}. A\B={1,2} (A's
elements not in B). B\A={5,6} (B's elements not in A). Genuinely
different sets, computed from the identical starting pair.

**Difference-as-intersection-with-complement**: A={1,2,3,4}, B={3,4,5,6},
U={1,...,10}. Direct computation: A\B={1,2}. Via complement:
Bᶜ={1,2,7,8,9,10}; A∩Bᶜ={1,2}. Identical result, two routes.

**Special cases**: A\∅=A (nothing removed); A\A=∅ (everything removed);
∅\A=∅ (nothing was there to keep).

## Discovery Questions

Present the guest-list-minus-cancellations scenario and ask the learner
to compute "who actually shows up," then separately ask "who cancelled
but wasn't invited in the first place" — the learner discovers these are
different, order-sensitive questions before the notation A\B and B\A is
introduced. Recommendation: brief discovery for the asymmetry itself
(directly experiential via the guest-list framing); direct instruction
for the A\B=A∩Bᶜ algebraic connection, since it requires the complement
operation to already be available and is not independently
rediscoverable without that prerequisite.

## Teaching Sequence

MC-1 (symmetry assumed) is addressed first, re-anchoring `math.found.
set-operations`'s own existing repair rather than re-deriving it, since
it is the more foundational and higher-frequency error. MC-2 (difference
unrelated to complement) is addressed second, once the asymmetric
computation itself is secure, since the complement connection is an
enrichment on top of already-correct computation, not a prerequisite to
it.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the asymmetry side-
by-side computation, the primary action reinforcing `math.found.set-
operations`'s own MC-3 repair) → **Worked Example** (the difference-as-
intersection-with-complement equivalence, targeting MC-2) → **Drill**
(rapid A\B computations on varied set pairs, always paired with a B\A
computation to keep the asymmetry lesson active). **What doesn't fit**:
mixed-operation grouping sensitivity beyond the A\B=A∩Bᶜ equivalence
itself — that broader content belongs to `math.found.set-operations`'s
own treatment.

## Voice Teaching Notes

**Register**: Directional — consistently narrate "FROM A, remove B's
elements" (never just "A and B, differenced") to keep the asymmetry
audible in every example.

**Wait-time rule**: After computing A\B, pause before asking for B\A —
let the learner predict whether the two will match before computing,
surfacing MC-1 if it's still active.

**Load-bearing sentences**:
- "A\B removes B's elements FROM A — the direction is part of the
  answer."
- "Removing B from A is the same as keeping only what's in A and
  outside B — that's the complement connection."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is computing A\B
and B\A as if identical, assessment should always pair a set-difference
item with its reverse-order counterpart, requiring both to be computed
and compared explicitly rather than testing only one direction.

## Tutor Recovery Strategy

Likeliest utterance: "isn't A minus B the same as B minus A?" — the
concept-specific smaller question: "which set are we removing elements
FROM?" reframes the confusion from "difference is symmetric like the
other operations" to "difference has a starting set and a
removed-from-it set, and swapping them changes the question entirely"
— directly isolating MC-1's missing directionality.

## Memory Hooks

**Memory type**: procedural (a directional removal computation, plus
one algebraic equivalence connecting it to complement). Review form:
fresh set pairs always requiring BOTH A\B and B\A computed together, to
keep the asymmetry from decaying into assumed symmetry; periodic
inclusion of the A∩Bᶜ rewrite to keep MC-2's connection active.
Interleaving partners: `math.found.complement` (the operation set
difference directly reduces to, once a universal set exists) and
`math.found.set-operations` (the umbrella treatment this entry
specializes).

## Transfer Connections

- **Near**: `math.found.complement` (A\B = A∩Bᶜ, the direct algebraic
  connection this entry establishes); `math.found.venn-diagram` (set
  difference's standard pictorial "crescent" region).
- **Far**: database query EXCEPT/MINUS operators (directly mirror A\B's
  removal semantics); list-processing "filter out" operations in
  programming (removing all elements matching a second collection).
- **Real-world**: "which invited guests did NOT cancel" (the guest-list
  analogy); inventory remaining after items sold; students who took a
  course but did NOT pass an exam.
- **Expert transfer**: the learner, meeting an unfamiliar "remove"
  operation in a new mathematical or computational context,
  automatically checks whether the operation is order-sensitive before
  assuming commutativity.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.set-difference.md` — stated explicitly per the established
no-Blueprint convention, not omitted. This entry reuses `math.found.
set-operations`'s own Blueprint-grounded MC-3 (difference asymmetry) by
reference, adding only the complement-connection misconception (MC-2)
and depth not covered there.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (1) and mastery threshold (0.9) are appropriate for a
concept whose dedicated content beyond the existing set-operations
survey is genuinely compact — the asymmetry re-anchor plus one new
algebraic connection to complement.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 8) | No Blueprint existed to ground this entry; MC-1 cited by reference from `math.found.set-operations`'s own MC-3, not re-derived; MC-2 authored directly via the birth-taxonomy diagnostic procedure. |
