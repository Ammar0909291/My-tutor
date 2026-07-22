# Cartesian Product — `math.found.cartesian-product`

## Identity

- **Concept ID**: `math.found.cartesian-product` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.set` — the Cartesian product is a set
  (of ordered pairs) built from two other sets, so the learner needs the
  well-defined/unordered/no-repetition definition of a set already
  secure before combining two of them.
- **Unlocks** (from KG): `math.found.relation`, `math.func.function-
  concept` — a relation from A to B is defined as any subset of A × B;
  a function is a specific kind of relation (a subset of A × B
  satisfying uniqueness) — both depend directly on A × B as their
  starting universe.
- **Related** (from KG, not a `requires`/`unlocks` edge):
  `math.found.relation`, `math.found.ordered-pair`.
- **Cross-links** (from KG): `math.linalg.vector-space` — ℝ² = ℝ × ℝ is
  the coordinate plane, the concrete foundation vector spaces build on.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 3

## Learning Objective

The learner can: define A × B as the set of all ordered pairs (a, b)
with a ∈ A and b ∈ B; compute |A × B| = |A| · |B| for finite sets;
correctly recognize that A × B ≠ B × A in general (non-commutativity);
and correctly determine that A × ∅ = ∅ × B = ∅ for any A, B (a product
with the empty set is always empty, never the non-empty factor itself).

## Core Understanding

The Cartesian product A × B is not a symmetric "combination" of two
sets — it is the set of every ORDERED pair (a, b) drawn with a from A
and b from B, and because ordered pairs care about position, A × B and
B × A are, in general, entirely different sets: (a, b) with a ∈ A, b ∈ B
is a different object from (b, a) with b ∈ B, a ∈ A unless A = B and the
elements happen to coincide. This single fact — position in the pair
matters — is also what makes the empty-set case work correctly: since
∅ has no elements at all, there is no way to choose a second coordinate
from it, so no pair (a, b) with b ∈ ∅ can ever be formed, regardless of
how large A is — A × ∅ = ∅, never A itself.

## Mental Models

- **Beginner model — "the Cartesian product just combines all the
  elements of A and B together"**: the learner treats × as producing an
  unordered combination, similar in spirit to a union or a "pick one
  from each" listing without positional structure. Shelf-life warning:
  "this gets the SIZE right by accident sometimes, but not the actual
  pairs, and definitely not which pairs come from A × B versus B × A."
- **Intermediate model — "A × B is specifically the set of ORDERED
  pairs (a, b), and swapping the factor order generally changes the
  set"**: the learner correctly constructs A × B by pairing each element
  of A with each element of B in the correct position, and recognizes
  A × B ≠ B × A as the normal case. Upgrade trigger: a side-by-side
  listing of A × B and B × A for the same two sets, showing the pairs
  are genuinely different objects.
- **Advanced model — "the empty set's product is always empty, by the
  same ordered-pair logic, not as a special exception"**: the learner
  derives A × ∅ = ∅ directly from the definition (no b ∈ ∅ exists to
  complete any pair) rather than memorizing it as an isolated rule.
  Upgrade trigger: being asked to justify A × ∅ = ∅ from the formal
  definition rather than by analogy to multiplication.
- **Expert model — "the Cartesian product is the raw material relations
  and functions are carved from"**: the learner recognizes that a
  relation is any subset of A × B, and a function is a subset of A × B
  satisfying a uniqueness condition — treating A × B as the universal
  "space of all possible pairings" that later concepts selectively
  restrict, and connects ℝ × ℝ = ℝ² to the coordinate plane as the
  concrete, familiar instance of this abstraction.
- **Do not upgrade early**: a learner who still treats × as an
  unordered combination (beginner model) should not be pushed into
  relations/functions (expert model) before non-commutativity is secure
  — per the Blueprint's own MAMR, MC-1 (commutativity assumed) is
  cleared before MC-2 and MC-3, addressed FIFO after.

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, comes from over-applying the symmetry of set union and
intersection (both genuinely commutative, already familiar from
`math.found.set-theory`) onto the Cartesian product, which is not.
A second, related failure conflates an ordered pair with an unordered
two-element set, since both use similar-looking notation with two
symbols inside a bracket — the learner has not yet firmly separated
`math.found.ordered-pair`'s position-sensitive equality rule from a
set's order-blind one.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Register (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "The Cartesian product is commutative: A × B = B × A"
  (Foundational; Type 1, overgeneralization from set union/intersection,
  both genuinely commutative)**: student claims {1,2}×{x,y} = {x,y}×{1,2},
  or writes (2,x) and (x,2) as the same pair. Full trigger/root-cause/
  error-pattern: Blueprint Component 2, MC-1.
- **MC-2 — "Cartesian product lists all combinations, but (a,b) and
  (b,a) are the same pair" (Type 6, analogy/prior-experience
  overextension — conflating the Cartesian product with an unordered
  combinatorial selection, like choosing 2 items from a bag)**: student
  lists pairs but counts (1,x) and (x,1) as duplicates. Full content:
  Blueprint Component 2, MC-2.
- **MC-3 — "A × ∅ = A (the empty set 'disappears')" (Type 6,
  analogy/prior-experience overextension — analogizing with
  multiplication where n × 1 = n, or misreading "product" as an
  additive/multiplicative identity operation)**: student claims
  {1,2} × ∅ = {1,2} or ∅ × A = A. Full content: Blueprint Component 2,
  MC-3.

## Analogies

- **Best analogy — a restaurant's menu combinations, ordered as
  (starter, main)**: choosing a starter from list A and a main from
  list B produces combinations written in a fixed order (starter first,
  main second) — (soup, pasta) is a different order slip than
  (pasta, soup) would be if the menu format were reversed. Breaking
  point: real menu combinations are often treated as interchangeable in
  casual conversation ("I'll have the soup-pasta combo"), so the analogy
  needs the formal ORDER convention stated explicitly, not left implicit.
- **Alternative — coordinates on a grid, (column, row)**: (3, 5) and
  (5, 3) name different grid squares — the same two numbers, in swapped
  positions, that are genuinely different locations. Breaking point:
  grids are typically 2D and finite in a lesson context; the Cartesian
  product generalizes to any two sets, not just numeric coordinate
  ranges.
- **ANTI-ANALOGY — do NOT say "A × B is just all the ways to pick one
  item from A and one from B"**: "ways to pick" suggests an unordered
  combinatorial count, directly reinforcing MC-2 — the correct framing
  is "all ORDERED pairs, with the first coordinate always from A and the
  second always from B," not a symmetric pick-one-from-each combination.

## Demonstrations

- **A×B vs. B×A side-by-side listing**: {1,2}×{x} = {(1,x),(2,x)} shown
  next to {x}×{1,2} = {(x,1),(x,2)} — directly confronting MC-1 with the
  Blueprint's own non-commutativity property.
- **Ordered-pair-card demonstration** (Protocol B-01): physical or
  written cards labeled with a first and second position, swapped to
  show (a,b) and (b,a) are different objects when a≠b — directly targets
  MC-2.
- **Empty-set-product demonstration**: attempting to form a pair (a, b)
  with b drawn from ∅ and finding no such b exists, for any a ∈ A,
  however large A is — directly targets MC-3.

## Discovery Questions

**Need** — given {1,2}×{x,y} and {x,y}×{1,2} listed out, the learner
notices the pairs look "the same information, just written differently"
and is asked whether the two sets are equal. **Playground** — the
learner checks each pair from one list against the other set,
element by element. **Invention** — the learner proposes that maybe
which set comes first actually matters for what counts as a valid pair.
**Collision** — shown (2,x) and (x,2) side by side and asked whether
they're the same ordered pair — directly confronting MC-2 via
`math.found.ordered-pair`'s own equality rule. **Formalization** —
naming A × B's definition explicitly: all ordered pairs (a,b) with a∈A,
b∈B, position fixed. **Compression** — computing a fresh A × B (and
B × A) for two small sets, and correctly determining A × ∅.

## Teaching Sequence

MC-1 (commutativity assumed) is repaired first, per the Blueprint's own
MAMR ordering, since it is the most foundational and most consequential
— every downstream relation/function concept depends on A × B and B × A
being recognized as generally different. MC-2 (unordered-combination
conflation) and MC-3 (empty-set product) are then addressed in FIFO
order once MC-1 is cleared.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the A×B-vs-B×A
side-by-side listing, the primary action for MC-1) → **Contrast
Pair / Physical Card Demonstration** (the ordered-pair-card comparison,
targeting MC-2) → **Worked Example** (the empty-set-product derivation,
targeting MC-3). **What doesn't fit**: introducing relations and
functions in full — this concept only needs to establish A × B as the
universe those later concepts carve subsets from, not their own
uniqueness/domain machinery.

## Voice Teaching Notes

Listen for "well it's the same two things either way" applied to A × B
and B × A — this is MC-1's clearest verbal signature. A learner who
says "but (1,x) and (x,1) both just have a 1 and an x in them" is
showing MC-2 directly. The load-bearing sentence: "position in the pair
is part of what the pair IS — swap the positions and, in general, you
get a genuinely different pair, and a genuinely different product set."

## Assessment Signals

The Blueprint's own Assessment Item Bank (Component 8) and mastery gate
(MAMR: MC-1 cleared first, MC-2/MC-3 FIFO) are the concrete item bank —
not re-authored here. Diagnostic interpretation this entry adds: a
learner who correctly computes A × B ≠ B × A (MC-1 cleared) but still
claims A × ∅ = A (MC-3 still latent) shows that "recognizing
non-commutativity" and "correctly handling the empty-set boundary case"
are separable skills requiring independent verification.

## Tutor Recovery Strategy

Likeliest utterance: "but they're made of the same numbers, so isn't it
the same set either way?" facing A × B vs. B × A — the concept-specific
smaller question: "is the pair (1, x) — first coordinate 1, second
coordinate x — the identical object as (x, 1) — first coordinate x,
second coordinate 1?" reframes the confusion from "same ingredients" to
"same ordered structure," directly isolating MC-1's commutativity
assumption using the already-secured ordered-pair equality rule.

## Memory Hooks

**Type**: concept (a structural-construction skill: building A × B
correctly with position preserved, independent of the specific sets
used). Review form: fresh pairs of small sets, computing both A × B and
B × A and comparing, plus at least one empty-set boundary case each
review cycle, never rote recall of one fixed example. Interleaving
partners: `math.found.ordered-pair` (the equality rule this concept's
pairs obey) and `math.found.set` (the empty-set boundary case) —
practicing across all three sharpens the shared "position and
membership matter" skill.

## Transfer Connections

- **Near**: computing A × B and B × A for a fresh pair of small sets,
  and correctly evaluating any product involving ∅.
- **Far**: recognizing the Cartesian product as the foundation of the
  coordinate plane (ℝ × ℝ = ℝ²) and of database "join" operations
  (combining rows from two tables as ordered pairs of records).
- **Real-world**: recognizing when a real-world "combination" (e.g. a
  seating chart labeled (row, seat)) is genuinely order-sensitive rather
  than a symmetric pairing.
- **Expert transfer**: the learner, meeting an unfamiliar relation or
  function definition, spontaneously recognizes it as a subset of some
  underlying Cartesian product, and checks which direction (A × B vs.
  B × A) is actually intended.

## Cross-Subject Connections

Via KG `cross_links`: `math.linalg.vector-space` — ℝ² = ℝ × ℝ as the
Cartesian coordinate plane is the concrete foundation vector spaces are
built on (per the Blueprint's own P76 cross-link bridge). This is a
same-subject (mathematics, linear algebra) cross-link per the KG, not a
cross-subject one; not fabricated beyond what the KG states.

## Blueprint References

`docs/curriculum/blueprints/math.found.cartesian-product.md` — Status
PACKAGE_READY (577 lines; authored 2026-07-11). This entry reuses by
reference: the full Misconception Register (Component 2, MC-1–MC-3) and
the Transfer Probe documentation (Component 6, the vector-space
cross-link). Not restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite, two-item unlocks list, and
single cross-link to `math.linalg.vector-space` all match the
Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 5). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.
