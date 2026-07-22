# Ordered Pair — `math.found.ordered-pair`

## Identity

- **Concept ID**: `math.found.ordered-pair` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-theory`)
- **Prerequisites**: `math.found.set` — an ordered pair is defined by
  deliberately breaking one of a set's defining properties (order-
  blindness), so the learner needs the set's unordered, no-duplicates
  definition already secure as the exact thing being contrasted against.
- **Unlocks** (from KG): `math.found.cartesian-product` — the Cartesian
  product A × B is defined as the set of ALL ordered pairs (a, b) with
  a ∈ A, b ∈ B; this concept's equality rule is the Cartesian product's
  entire building block.
- **Related** (from KG, not a `requires`/`unlocks` edge):
  `math.found.cartesian-product`.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.90 · **Est. hours**: 1

## Learning Objective

The learner can: state the precise equality rule for ordered pairs,
(a,b) = (c,d) if and only if a = c AND b = d; correctly contrast an
ordered pair (a,b) with the unordered set {a,b}, determining that
(a,b) ≠ (b,a) in general while {a,b} = {b,a} always; and correctly
conclude non-equality whenever even one coordinate position fails to
match, never treating a partial (single-coordinate) match as sufficient.

## Core Understanding

An ordered pair (a, b) is not simply "two elements together" — it is
two elements in FIXED, LABELED POSITIONS (first coordinate, second
coordinate), and its entire identity depends on both positions
simultaneously. The equality rule, (a,b) = (c,d) iff a = c AND b = d,
is a CONJUNCTION: both conditions must hold together, not either one
alone — a pair matching in only its first coordinate (or only its
second) is not equal, full stop. This is the deliberate, structural
opposite of `math.found.set`'s unordered {a,b} = {b,a}: the same two
numbers, arranged as a set, ignore order entirely; arranged as an
ordered pair, order becomes the single most load-bearing fact about the
object.

## Mental Models

- **Beginner model — "an ordered pair is basically a two-element set,
  just written with parentheses instead of braces"**: the learner
  imports the set's order-blindness onto the ordered pair, since both
  notations bundle two symbols together and differ only in bracket
  style. Shelf-life warning: "the bracket style isn't decorative — it's
  signaling a completely different equality rule underneath."
- **Intermediate model — "an ordered pair's two positions are both
  necessary and both must match for equality"**: the learner correctly
  applies the AND-conjunction equality rule, checking both coordinates
  independently before concluding equality. Upgrade trigger: a pair
  matching in exactly one coordinate, testing whether the learner
  correctly withholds an equality judgment.
- **Advanced model — "ordered pairs are the deliberate structural
  opposite of sets, and recognizing which one a situation calls for is
  the transferable skill"**: the learner fluently distinguishes contexts
  where order matters (coordinates, sequences, database records) from
  contexts where it doesn't (memberships, unordered groupings), treating
  this as a general pattern rather than a fact specific to this one
  concept.
- **Expert model — "ordered pairs are the atomic building block the
  Cartesian product, relations, and functions are all constructed
  from"**: the learner recognizes that everything downstream —
  A × B, relations as subsets of A × B, functions as relations with a
  uniqueness condition — inherits its entire notion of "order matters"
  from this one concept's equality rule.
- **Do not upgrade early**: a learner who still treats (a,b) and (b,a)
  as interchangeable (beginner model) should not be pushed toward the
  Cartesian product or relations (expert model) before the AND-
  conjunction equality rule (intermediate model) is fully secure — per
  the Blueprint's own teaching sequence, MC-1 (ordered-pair-as-set) is
  addressed before MC-2 (partial-match sufficiency) and MC-3
  (AND-misread-as-OR).

## Why Students Fail

The dominant failure comes directly from `math.found.set`'s own,
correctly-learned order-blindness being over-applied: since {a,b} and
{b,a} genuinely are the same set (a fact the learner has just secured),
and ordered-pair notation looks superficially similar (two symbols
bundled together, separated by a comma), it is a natural but incorrect
inference that (a,b) and (b,a) work the same way. A second, more subtle
failure comes from the equality rule's precise logical structure — "a=c
AND b=d" — being misread as a looser "a=c OR b=d," exactly the kind of
careful conjunction-parsing `math.found.logical-connectives` and
`math.found.proposition` are separately building as a general skill.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "ORDERED-PAIR-TREATED-AS-SET" (Foundational; Type 1,
  overgeneralization from the just-secured, genuinely correct
  order-blindness of sets)**: believing (a,b) = (b,a) always, treating
  ordered pairs like unordered sets. Full trigger/root-cause/error-
  pattern: Blueprint Component 6, MC-1.
- **MC-2 — "PARTIAL-COORDINATE-MATCH-ASSUMED-SUFFICIENT" (Foundational;
  Type 1, overgeneralization — a single matching feature is often
  enough for informal "similarity" judgments, extended incorrectly to
  formal equality)**: believing a match in ONE coordinate position
  (while the other differs) is enough to conclude two ordered pairs are
  equal. Full content: Blueprint Component 6, MC-2.
- **MC-3 — "EQUALITY-CONDITION-TREATED-AS-OR-RATHER-THAN-AND" (Type 3,
  language contamination — everyday use of "and" sometimes carries a
  weaker, list-like sense closer to "or" in casual speech)**: misreading
  the equality rule as "a=c OR b=d" rather than the correct "a=c AND
  b=d." Full content: Blueprint Component 6, MC-3.

## Analogies

- **Best analogy — a treasure map's directions, (east-steps,
  north-steps)**: "(3 steps east, 5 steps north)" is a completely
  different destination from "(5 steps east, 3 steps north)" — the same
  two numbers, in swapped positions, that lead somewhere else entirely.
  Breaking point: a treasure map's two directions are conceptually
  distinct (east vs. north); an ordered pair's two coordinates can be
  drawn from the identical domain (e.g. both numbers), so the analogy's
  built-in distinctness is stronger than the general concept requires.
- **Alternative — a locker combination read in a fixed order**: "3, then
  7" opens a specific locker; "7, then 3" is a different attempted
  combination entirely, even though both use the numbers 3 and 7.
  Breaking point: locker combinations often have more than two digits
  and no natural set-notation counterpart to contrast against, so this
  analogy supports MC-1's repair less directly than the treasure-map one.
- **ANTI-ANALOGY — do NOT say "an ordered pair is just a set where you
  remember which one came first"**: "remember which one came first"
  suggests the underlying object is still fundamentally a set with some
  extra bookkeeping — the correct framing is that an ordered pair is a
  STRUCTURALLY DIFFERENT kind of object with its own equality rule, not
  a set plus an add-on.

## Demonstrations

- **Set-vs-ordered-pair contrast demonstration**: {4,9} = {9,4} (true,
  sets) shown directly against (4,9) ≠ (9,4) (true, ordered pairs) for
  the identical two numbers — directly targets MC-1 with the Blueprint's
  own Example 2.
- **Partial-match demonstration**: (7,3) vs. (7,9), matching only in the
  first coordinate, checked explicitly against the AND-conjunction rule
  and found unequal — directly targets MC-2 with the Blueprint's own
  Example 3.
- **Equality-rule-parsing demonstration**: the rule "(a,b)=(c,d) iff a=c
  AND b=d" read aloud and tested against a pair matching in exactly one
  position, confirming AND (not OR) governs the outcome — directly
  targets MC-3.

## Discovery Questions

**Need** — given (4,9) and (9,4), the learner is asked whether these
name the same object, having just confirmed {4,9} = {9,4} as sets.
**Playground** — the learner tests several ordered pairs against their
coordinate-swapped versions. **Invention** — the learner proposes that
ordered pairs might follow a different rule than sets, since the
notation itself (parentheses vs. braces) seems to be signaling
something. **Collision** — shown (7,3) and (7,9), matching in exactly
one coordinate, and asked directly whether they're equal — directly
targeting MC-2. **Formalization** — naming the equality rule explicitly:
both coordinates must match, in their respective positions,
simultaneously. **Compression** — given a fresh pair of ordered pairs,
correctly determining equality by checking both coordinates.

## Teaching Sequence

MC-1 (ordered-pair-as-set) is repaired first, since a learner who
believes (a,b) = (b,a) always has no coherent basis for evaluating
partial matches (MC-2) or parsing the conjunction (MC-3) — both
presuppose that position already matters, which is exactly what MC-1
denies. MC-2 and MC-3 are then addressed together, since both concern
correctly applying the AND-conjunction once position-sensitivity is
accepted.

## Tutor Actions

From `../../teaching-actions/`: **Representation Shift** (the
treasure-map analogy bridging concrete directions to abstract
coordinates, the primary action for MC-1) → **Contrast Pair** (the
set-vs-ordered-pair and partial-match demonstrations, targeting MC-1
and MC-2 together). **What doesn't fit**: introducing the Cartesian
product's full definition here — this concept only needs to establish
the ordered pair as a standalone object with its own equality rule;
A × B as "the set of all such pairs" is `math.found.cartesian-
product`'s own territory.

## Voice Teaching Notes

Listen for "well it's the same two numbers either way" applied to a
swapped pair — this is MC-1's clearest verbal signature. A learner who
says "the first ones match, so aren't they basically equal?" facing a
partial match is showing MC-2 directly. The load-bearing sentence:
"both positions have to agree at the same time — matching in one spot
says nothing about the other."

## Assessment Signals

The Blueprint's own 4-item P77 problem set and P76 game-board/player-
link transfer probe (pass criterion MAMR 5/5) are the concrete item
bank — not re-authored here. Diagnostic interpretation this entry adds:
a learner who correctly rejects (4,9) = (9,4) (MC-1 cleared) but still
accepts a partial coordinate match as sufficient (MC-2 still latent)
shows that "position matters at all" and "BOTH positions must
simultaneously match" are separable understandings requiring
independent verification.

## Tutor Recovery Strategy

Likeliest utterance: "but {4,9} and {9,4} were the same — why isn't
(4,9) the same as (9,4)?" — the concept-specific smaller question: "are
we talking about a SET right now, or an ORDERED PAIR — and does the
notation (parentheses vs. braces) tell us which rule applies?" reframes
the confusion from "these look like the same kind of question" to
"these are two different kinds of objects with two different rules" —
directly isolating MC-1's set/ordered-pair conflation.

## Memory Hooks

**Type**: concept (a position-sensitivity recognition skill: applying
the correct equality rule based on object type, independent of the
specific values involved). Review form: fresh mixed pairs of sets and
ordered pairs, sorted by whether reordering changes equality, never
rote recall of one fixed example pair. Interleaving partners:
`math.found.set` (the order-blind object this concept deliberately
contrasts against) and `math.found.cartesian-product` (this concept's
own direct KG unlock) — mixed practice sharpens the shared "does order
matter here" judgment.

## Transfer Connections

- **Near**: correctly determining equality for a fresh pair of ordered
  pairs, and correctly contrasting the same values as a set.
- **Far**: recognizing order-sensitive structures elsewhere (a database
  record's field order, a function's argument order, a vector's
  component order) as the same underlying pattern.
- **Real-world**: recognizing when a real-world "pair" of values is
  genuinely order-sensitive (a map coordinate, a recipe's ratio "2 parts
  flour to 1 part sugar") versus when order is irrelevant (a guest list
  of two names).
- **Expert transfer**: the learner, meeting an unfamiliar notation
  bundling two or more values, automatically asks whether position is
  meant to be load-bearing before assuming order-blindness or
  order-sensitivity by default.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node, confirmed against the
Blueprint's own Component 7 check). Not fabricated beyond what the KG
states.

## Blueprint References

`docs/curriculum/blueprints/math.found.ordered-pair.md` — Status
verified present (128 lines; V-1 through V-20 all PASS). This entry
reuses by reference: the full Misconception Registry (Component 6,
MC-1–MC-3) and the P76 game-board/player-link transfer probe (Component
5, Teaching Action A03). Not restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite, one-item unlocks list, and
empty cross-links all match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 5). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.
