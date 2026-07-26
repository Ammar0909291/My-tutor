# Proper Subset — `math.found.proper-subset`

## Identity

- **Concept ID**: `math.found.proper-subset` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent: `math.found.subset`)
- **Prerequisites**: `math.found.subset` — proper subset is subset PLUS
  an inequality condition, so the learner needs ⊆ itself already secure
  (including the vacuous-truth and reflexive special cases) before
  adding the extra "and not equal" clause on top of it.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG, not a `requires`/`unlocks` edge): `math.found.subset`.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.9 · **Est. hours**: 1
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "strict subset", "⊂".

## Learning Objective

The learner can: state that A is a proper subset of B (written A⊊B,
sometimes A⊂B) exactly when A⊆B AND A≠B; correctly verify proper
subset-hood by checking BOTH conditions, not just the first; correctly
identify that A is never a proper subset of itself (A⊊A is always
false, unlike A⊆A which is always true); and correctly navigate the
notation ambiguity between texts that use ⊂ for "subset" (non-strict,
same as ⊆) versus texts that use ⊂ specifically for "proper subset."

## Core Understanding

Proper subset takes `math.found.subset`'s ⊆ relation and adds exactly
one extra requirement: the two sets must be genuinely different. A⊊B
means every element of A is in B (the ⊆ part, already fully defined by
`math.found.subset`) AND B has at least one element that A does not
have (the "not equal" part, made concrete rather than left abstract).
This second clause is not a separate check invented from scratch — it
follows directly from what `math.found.set-equality` will formalize as
A=B iff A⊆B and B⊆A: if A⊆B but NOT B⊆A, then A and B cannot be equal,
and A is a PROPER subset. The concept's entire content is this single
added constraint, deliberately kept minimal since `math.found.subset`
already owns the harder work of defining containment itself.

## Mental Models

- **Beginner model — "proper subset just means subset"**: the learner
  uses ⊂ and ⊆ interchangeably, unaware a distinction exists. Shelf-life
  warning: this model works fine until a problem specifically asks
  whether A⊊A holds, at which point the collapse becomes visible.
- **Intermediate model — "proper subset is subset but not equal, checked
  as two separate steps"**: the learner correctly checks ⊆ first, then
  separately confirms the sets differ, sometimes as two disconnected
  procedures rather than one integrated definition. Upgrade trigger:
  being asked to identify, in one pass, ALL proper subsets of a specific
  small set (forcing integration of both checks at once, and specifically
  excluding the set itself).
- **Advanced model — "A⊊B strengthens A⊆B by exactly the exclusion of
  A=B"**: the learner treats proper subset as a genuine refinement of
  subset — every A⊊B is automatically also A⊆B (proper subset is a
  SPECIAL kind of subset, not a different relation), but not conversely.
  Upgrade trigger: being asked whether every proper subset relationship
  is also a subset relationship (yes) and whether the reverse holds
  (no — A⊆A is a counterexample).
- **Do not upgrade early**: a learner still treating ⊂ and ⊆ as
  synonyms (beginner model) should not be pushed into notation-ambiguity
  discussions (which convention a given textbook uses) before the
  substantive "and not equal" distinction is secure — notation is a
  surface issue layered on top of a conceptual one.

## Why Students Fail

The dominant failure is direct carryover from `math.found.subset`:
having just learned ⊆ (which is reflexive, A⊆A always), learners
default to treating ⊂ the same way, missing that the entire point of
"proper" is to REMOVE the reflexive case. A second, independent failure
is notational: some textbooks and courses use ⊂ to mean exactly what
⊆ means (non-strict subset), reserving ⊊ for the strict/proper version,
while others use ⊂ specifically for the strict version — a genuine
convention conflict across sources that `math.found.subset`'s own MC-3
already registers from the subset side; this entry addresses it from
the proper-subset side.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "A⊊A is true, since A⊆A is true and proper subset is just
subset" (Type 1, overgeneralization from the immediately preceding
`math.found.subset` lesson, where A⊆A being true is a headline result)**
- *Why*: the freshly-learned fact "A⊆A always" is strong and salient;
  learners extend it to the new relation without registering that
  "proper" specifically negates the equality case.
- *Symptom*: answering "yes" when asked whether a set is a proper subset
  of itself.
- *Detection probe*: ask directly whether A⊊A holds for a concrete set A.
- *Recovery*: return to the two-part definition explicitly: "A⊊B needs
  A⊆B AND A≠B. For A⊊A, is A≠A true? No — a set always equals itself.
  So A⊊A is always false, no matter what A is."
- *Verification*: the learner states, unprompted, that no set is a
  proper subset of itself.

**MC-2 — "Checking A⊆B is enough; if that holds, A⊊B holds too" (Type 1,
overgeneralization — collapsing proper subset back into ordinary
subset by dropping the second clause entirely)**
- *Why*: the ⊆ check is the harder, more memorable procedure (element-
  by-element verification); the "and not equal" clause is a single
  short phrase that is easy to read past or forget to apply.
- *Symptom*: correctly performing the ⊆ check but never verifying the
  sets differ, especially when A and B happen to be presented as equal
  sets written differently (e.g. {1,2,3} and {3,2,1}).
- *Detection probe*: present A={1,2,3} and B={3,2,1} (the same set,
  different order) and ask whether A⊊B.
- *Recovery*: "A and B contain exactly the same elements — {1,2,3} and
  {3,2,1} are the SAME set, just listed in different order. A⊆B holds,
  but A=B also holds, so A⊊B is FALSE. Order of listing never makes two
  sets different."
- *Verification*: the learner correctly rejects A⊊B for two differently-
  ordered listings of the same set.

**MC-3 — "⊂ always means proper subset, everywhere, in every text"
(Type 3, notation-induced — reused by reference from `math.found.subset`'s
own MC-3, which registers the identical convention conflict from the
other direction, not re-derived here)**: assuming the symbol ⊂ has one
universal meaning across all sources. Full trigger/root-cause/error-
pattern already established in `math.found.subset`'s Misconceptions
section — this entry's own contribution is MC-1 and MC-2 above, which
that entry does not cover (since they only make sense once proper
subset itself is on the table).

## Analogies

- **Best analogy — a strictly smaller team roster**: if team A's roster
  is a proper subset of team B's roster, then every player on A also
  plays for B, AND B has at least one player A doesn't have — B is
  GENUINELY bigger, not just "the same roster listed differently."
  Breaking point: rosters are finite and countable, which makes "at
  least one extra player" easy to picture; the analogy strains less
  cleanly for infinite sets, where "genuinely bigger" needs a more
  careful cardinality argument (`math.found.cardinality`, later).
- **Alternative — a photo and a cropped copy**: a cropped photo (A) is
  contained entirely within the original (B) — every pixel of the crop
  matches the original — and as long as the crop is smaller than the
  full photo, it's a PROPER subset of the original's pixels. If someone
  "crops" the photo to its exact original size, the result equals the
  original, and the relationship is subset but not proper subset.
  Breaking point: photos have obvious "bigger/smaller" framing that sets
  don't inherently carry — the analogy shouldn't be read as claiming
  proper subsets are always "physically smaller" in a spatial sense.
- **ANTI-ANALOGY — do NOT say "proper subset just means subset, but with
  a fancier symbol"**: this directly invites MC-1/MC-2 by suggesting the
  "not equal" clause is decorative rather than a genuine, load-bearing
  second condition that must be checked every time.

## Demonstrations

- **A⊊A-is-always-false demonstration**: for a concrete set A={1,2},
  directly check both clauses of A⊊A: is A⊆A? Yes. Is A≠A? No — A
  always equals itself. Conclusion: A⊊A fails on the second clause,
  always, for every set — directly targets MC-1.
- **Reordered-listing demonstration**: for A={1,2,3} and B={3,1,2},
  confirm A=B first (same elements), then show A⊊B must therefore be
  false regardless of how the ⊆ check goes — directly targets MC-2.
- **Complete listing demonstration**: for A={1,2,3}, list every proper
  subset (∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}) and explicitly confirm
  {1,2,3} itself is EXCLUDED from this list — contrasting directly with
  `math.found.power-set`'s complete subset listing, which WOULD include
  {1,2,3}.

## Discovery Questions

**Need** — asked to list "all the sets smaller than A={1,2,3} that fit
entirely inside it," the learner naturally excludes A itself, since
"smaller than" implicitly rules out equality. **Playground** — the
learner tests A⊊A for several concrete sets, consistently finding it
false. **Invention** — the learner proposes the two-clause definition
(⊆ and ≠) as the formal version of their own "smaller than" intuition.
**Collision** — presented with two differently-ordered listings of the
same set and asked whether one is a proper subset of the other, the
learner must reconcile their ⊆-check instinct with the equality check —
directly targeting MC-2. **Formalization** — naming the two-clause
definition explicitly: A⊊B iff A⊆B and A≠B. **Compression** — given a
fresh pair of sets, correctly determining proper-subset status by
checking both clauses without prompting.

## Teaching Sequence

MC-1 (A⊊A assumed true) is addressed first, since it is the most direct
and predictable carryover error from the immediately preceding
`math.found.subset` lesson, and a learner who has not internalized "A⊊A
is always false" cannot reliably apply the definition to any other
case. MC-2 (equal sets in different listings) follows, since it
requires the same two-clause vigilance applied to a less obvious
disguise. MC-3 (notation ambiguity) is addressed last and briefly,
citing `math.found.subset`'s existing treatment rather than re-deriving
it, since it is a surface convention issue rather than a conceptual one.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the A⊊A-always-false
check, the primary action for MC-1) → **Demonstration** (the reordered-
listing check, targeting MC-2) → **Matching** (sort a mixed list of set
pairs into "proper subset," "subset but not proper," and "neither,"
consolidating both clauses at once). **What doesn't fit**: a full
cardinality-based treatment of "genuinely bigger" for infinite sets —
that machinery belongs to `math.found.cardinality`, out of scope for
this foundational, `bloom: understand`-level concept.

## Voice Teaching Notes

Listen for "so ⊂ is basically the same as ⊆, right?" — this is MC-1/
MC-2's clearest verbal signature, and should be met immediately with
the A⊊A counterexample rather than a lengthy re-explanation. A learner
who correctly performs the ⊆ check but never mentions checking
inequality is showing MC-2 silently — prompt directly: "and are the two
sets different?" The load-bearing sentence: "proper subset is subset
PLUS genuinely different — drop either half and it's not proper subset
anymore."

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-2's defining signature is a SKIPPED
step rather than a wrong answer, assessment must specifically require
students to show both checks explicitly (state both A⊆B and A≠B, not
just a final "yes/no"), since a learner who intuitively "feels" two
sets are different without checking can still arrive at a correct
verdict by luck on small, obviously-different examples while MC-2
remains fully latent for edge cases like reordered listings.

## Tutor Recovery Strategy

Likeliest utterance: "isn't every set a proper subset of itself?" —
the concept-specific smaller question: "is A equal to A?" (always yes)
followed directly by "so can A be UNEQUAL to itself?" (never) reframes
the confusion from "proper subset feels the same as subset" to "the
'not equal' clause specifically and permanently rules out A⊊A" —
directly isolating MC-1's missing second-clause check.

## Memory Hooks

**Type**: concept (a two-clause verification skill built directly on
top of the already-typed subset-checking procedure, not a new
standalone fact). Review form: fresh pairs of sets — including at least
one differently-ordered-but-equal pair per review cycle — requiring the
learner to state both clauses explicitly. Interleaving partners:
`math.found.subset` (the ⊆ half of the definition) and
`math.found.set-equality` (the A≠B half, made precise), mixed so proper
subset is never practiced as an isolated new relation but always as a
composition of two already-known checks.

## Transfer Connections

- **Near**: correctly listing all proper subsets of a small concrete
  set, explicitly excluding the set itself.
- **Far**: recognizing the general pattern "strengthen a reflexive
  relation into an irreflexive one by adding a not-equal clause" in
  other ordering contexts (e.g. ≤ versus <, later encountered in
  `math.found.total-order`'s own strict-order variant).
- **Real-world**: distinguishing "at most as much as" claims (subset-
  like, allows equality) from "strictly less than" claims (proper-
  subset-like, excludes equality) in everyday quantitative reasoning.
- **Expert transfer**: the learner, meeting an unfamiliar "strict"
  version of a familiar non-strict relation, automatically checks
  whether the reflexive case has been deliberately excluded rather than
  assuming the two relations behave identically.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.proper-subset.md` — stated explicitly per the established
no-Blueprint convention, not omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is
accurate — no other math.found concept lists this one as a direct
prerequisite; proper subset is consumed conceptually (as a refinement
of subset) rather than as a formal prerequisite edge elsewhere in the
domain. Estimated hours (1) and mastery threshold (0.9) are appropriate
for a concept whose entire content is a single added clause on top of
an already-mastered relation.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). No Blueprint existed to ground this
  entry; MC-1/MC-2 authored directly via the birth-taxonomy diagnostic
  procedure; MC-3 cited by reference from `math.found.subset` rather
  than re-derived.
