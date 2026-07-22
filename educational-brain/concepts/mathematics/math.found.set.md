# Set — `math.found.set`

## Identity

- **Concept ID**: `math.found.set` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.set-theory` — set theory establishes
  the general framework (membership as a binary yes/no rule, set
  operations, subset); this concept narrows to the primitive OBJECT
  itself — what precisely qualifies as a set, and its three defining
  properties (well-defined, unordered, no repetition) stated as a single
  compact definition.
- **Unlocks** (from KG): `math.found.set-membership`,
  `math.found.empty-set` — membership (∈/∉) and the empty set are both
  direct elaborations of this concept's own definition.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.90 · **Est. hours**: 2
- **Relationship to `math.found.set-theory`** (important — see
  Curriculum Feedback below): this concept's own KG description ("a
  well-defined, unordered collection of distinct objects called
  elements, the primitive object of set theory") and its Blueprint's
  Misconception Registry overlap substantially with `math.found.set-
  theory`'s own misconceptions (order-matters, duplicates-allowed,
  ∅-vs-{∅}) — both already authored as MC-2/MC-4/MC-1 respectively in
  the `set-theory` entry. This entry treats the distinction as: `set`
  is the narrower, `bloom: remember`-level DEFINITIONAL floor (can the
  learner state and recognize the three defining properties on sight,
  at a 0.90 mastery threshold) that `set-theory` (`bloom: understand`,
  0.80 threshold, 16 estimated hours) builds into full operational
  fluency (membership testing, union/intersection, subset proofs). This
  is a genuine, non-trivial overlap and is flagged honestly as
  Curriculum Feedback, not silently smoothed over.

## Learning Objective

The learner can: state the definition of a set as a well-defined,
unordered collection of distinct objects; correctly identify whether a
given natural-language description is well-defined (has an unambiguous
yes/no membership test) or not; and state, on sight, that {1,2,3},
{3,2,1}, and {1,1,2,3} are all the identical set. A learner who can
recite the definition but still treats {1,1,2} as containing three
elements, or accepts a vague description ("the set of tall people") as
well-defined without applying the membership test, has not achieved
mastery at this concept's 0.90 threshold.

## Core Understanding

A set is defined by exactly three properties holding simultaneously:
well-defined (an unambiguous yes/no answer exists for "is this object a
member?"), unordered (listing sequence carries no meaning), and
distinct-elements-only (repetition is ignored — {a,b,a,c} = {a,b,c}).
This concept's entire content is compressing these three properties into
a single, instantly recognizable definition, contrasted against
neighboring structures that relax exactly one property each: a sequence
or list is ordered AND allows repetition; a multiset is unordered but
DOES allow repetition. Recognizing which of the three properties is
being tested by a given example — order, well-definedness, or
repetition — is the whole of this concept's diagnostic work.

## Mental Models

- **Beginner model — "a set is basically a list of things"**: the
  learner imports ordinary-language list intuitions (order matters, you
  can mention an item more than once) onto set notation, since curly
  braces resemble a list's punctuation without signaling anything about
  order or repetition being discarded. Shelf-life warning: "this works
  for a first glance, but the moment you compare two differently-ordered
  sets, or write an element twice, this model gives the wrong answer."
- **Intermediate model — "a set has exactly three defining properties,
  and violating any one of them means you're describing something
  other than a set"**: the learner checks a candidate collection against
  well-definedness, order-independence, and no-repetition explicitly,
  rather than assuming list-like behavior by default. Upgrade trigger:
  the sequence/multiset/set three-way comparison table, showing exactly
  which property each neighboring structure relaxes.
- **Advanced model — "the empty set and singleton sets are genuine,
  well-defined sets, not edge cases to be suspicious of"**: the learner
  accepts ∅ (containing nothing) and {∅} (containing exactly one
  element, namely the empty set) as fully legitimate, correctly
  computing |∅|=0 and |{∅}|=1 without hesitation. Upgrade trigger: the
  |∅| vs. |{∅}| cardinality-counting exercise.
- **Expert model — "well-definedness is the deepest of the three
  properties, since 'not well-defined' collections (like Russell's
  paradox's self-referential set) reveal genuine limits on naive set
  formation"**: the learner recognizes that ordinary language
  descriptions can fail to define a set at all, not just imprecisely
  define one — a preview of why formal set theory eventually needs
  axiomatic restrictions (`math.found.set-theory-axiomatic`) on which
  descriptions are allowed to form sets.
- **Do not upgrade early**: a learner who has not yet stabilized the
  three-property checklist (intermediate model) should not be pushed
  into well-definedness's deeper paradox-adjacent territory (expert
  model) before order and repetition are secure — per the Blueprint's
  own MAMR, MC-1 (order/repetition) is cleared before MC-2
  (well-definedness) and MC-3 (∅ vs. {∅}), addressed FIFO after.

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, is the identical root cause already named in
`math.found.set-theory`'s own entry: curly-brace notation visually
resembles ordinary list notation, and nothing about the symbol itself
signals that order and repetition are being discarded. A second,
independent failure comes from natural language's tolerance for vague
collective descriptions ("tall people," "nice weather") which sound like
they define a group perfectly well in conversation, but fail the
mathematical test of an unambiguous yes/no membership rule the moment a
borderline case is proposed.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Register (MC-1
through MC-3) by reference, with birth-type classification added. **Note
the direct overlap with `math.found.set-theory`'s own MC-1/MC-2/MC-4,
carried forward as Curriculum Feedback below, not silently merged:**

- **MC-1 — "Sets preserve order and allow repetition, like lists"
  (Foundational; Type 1, overgeneralization from everyday sequential and
  list structures — arrays, sequences)**: student writes {1,2,1} and
  claims 3 elements, or claims {1,2} ≠ {2,1}. Full trigger/root-cause/
  error-pattern: Blueprint Component 2, MC-1.
- **MC-2 — "Any description in language defines a valid set" (Type 3,
  language contamination — natural-language "collections" are
  conflated with formally well-defined mathematical sets)**: accepting
  non-well-defined descriptions ("the set of tall people") as valid
  sets without applying the yes/no membership test. Full content:
  Blueprint Component 2, MC-2.
- **MC-3 — "The empty set is undefined; OR ∅ ∈ ∅; OR {∅} = ∅" (Type 4,
  notation-induced — the visual similarity between ∅ and {} drives
  confusion, compounded by the "zero objects" concept feeling
  meaningless)**: claiming ∅ "doesn't make sense," or counting
  |{∅}| = 0. Full content: Blueprint Component 2, MC-3.

## Analogies

- **Best analogy — a light switch for each candidate element (ON/OFF
  membership), identical to `math.found.set-theory`'s own**: for any
  candidate, the switch is either ON (in) or OFF (not in) — writing it
  twice doesn't flip it twice. Directly targets MC-1's repetition half.
  Breaking point: a light switch is a single binary device; a set's
  well-definedness (MC-2) requires that the switch has a definite
  position for EVERY candidate, which the switch picture alone doesn't
  emphasize.
- **Alternative — a bouncer's guest list with a clear rule, not a
  vibe**: a bouncer checking names against an exact list gives a
  definite yes/no for every person; a bouncer admitting "cool-looking
  people" has no well-defined rule at all — directly targets MC-2.
  Breaking point: a guest list is inherently ordered (written down in
  some sequence) even though the SET of admitted people is not — the
  analogy must be paired with an explicit note that the set itself
  discards the list's order.
- **ANTI-ANALOGY — do NOT say "a set is just a group of things, and you
  know it when you see it"**: "you know it when you see it" is the
  precise failure MC-2 names — well-definedness requires an EXPLICIT,
  checkable yes/no rule, not an intuitive impression of groupness.

## Demonstrations

- **List-vs-set reordering-and-repetition demonstration**: writing
  {1,2,3}, {3,2,1}, and {1,1,2,3} side by side and confirming all three
  are the identical set — directly targets MC-1 (shared with, not
  duplicated from, `math.found.set-theory`'s own equivalent
  demonstration).
- **Well-defined-vs-vague description demonstration**: "the set of even
  numbers less than 10" (well-defined — every number has a definite
  yes/no) contrasted with "the set of tall people" (not well-defined —
  no fixed threshold) — directly targets MC-2.
- **∅-vs-{∅}-cardinality demonstration**: counting |∅| = 0 and |{∅}| = 1
  explicitly, side by side — directly targets MC-3.

## Discovery Questions

**Need** — given "the set of nice restaurants in town," the learner is
asked whether a specific restaurant is a member, and realizes there's no
fixed way to decide. **Playground** — the learner tries several
candidate descriptions (some clearly well-defined, some vague) and
tests each against the yes/no criterion. **Invention** — the learner
proposes that a "real" mathematical set needs some kind of precise
rule, not just a descriptive phrase. **Collision** — shown "the set of
tall people" alongside "the set of people over 180cm" and asked which
one is actually a set — directly targeting MC-2's well-definedness
test. **Formalization** — naming the three defining properties
explicitly: well-defined, unordered, no repetition. **Compression** —
given a fresh mixed list of candidate descriptions, sorting them into
valid sets and non-sets using only the well-definedness test.

## Teaching Sequence

MC-1 (order/repetition) is repaired first, per the Blueprint's own MAMR
ordering, since it is the most common and the most consequential for
downstream set-operation work. MC-2 (well-definedness) and MC-3 (∅ vs.
{∅}) are then addressed in FIFO order once MC-1 is cleared, since
neither depends on the other.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (reordering-and-
repetition, the primary action for MC-1) → **Classification/Sorting**
(well-defined-vs-vague description sorting, targeting MC-2) → **Error
Analysis** (the ∅-vs-{∅} cardinality miscount, targeting MC-3). **What
doesn't fit**: introducing formal axiomatic restrictions on set
formation (Russell's paradox, the axiom schema of separation) — this
foundational, `bloom: remember`-level concept only needs the informal
well-definedness test; the deeper paradox-adjacent territory belongs to
`math.found.set-theory-axiomatic`.

## Voice Teaching Notes

Listen for "well I wrote 1 twice, so doesn't that count twice?" — this
is MC-1's clearest verbal signature, identical to the pattern already
named in `math.found.set-theory`. A learner who defends "the set of
interesting numbers" as a valid set when pressed for a membership test
is showing MC-2 directly. The load-bearing sentence: "a set needs
three things at once — a clear yes/no rule for every candidate, no
caring about order, and no counting anything twice."

## Assessment Signals

The Blueprint's own assessment item bank (Component 8) and mastery gate
(MAMR: MC-1 cleared first, MC-2/MC-3 FIFO) are the concrete item bank —
not re-authored here. Diagnostic interpretation this entry adds: a
learner who correctly rejects reordered/repeated listings as different
sets (MC-1 cleared) but still accepts a vague description as
well-defined (MC-2 still latent) shows that "the no-order/no-repetition
half of the definition" and "the well-definedness half" are separable
skills requiring independent verification — consistent with the
Blueprint's own FIFO routing for MC-2 and MC-3.

## Tutor Recovery Strategy

Likeliest utterance: "but 'tall people' obviously means something —
why isn't that a set?" — the concept-specific smaller question: "if I
described someone who's borderline, could you give me a definite yes or
no using only the phrase 'tall people' — no extra judgment call?"
reframes the confusion from "this phrase has meaning" (true, in
ordinary conversation) to "this phrase gives an unambiguous yes/no for
every candidate" (it does not) — directly isolating MC-2's
well-definedness gap.

## Memory Hooks

**Type**: concept (a definitional-recognition skill: checking a
candidate collection against the three defining properties,
independent of specific content). Review form: fresh mixed candidate
descriptions and listings, sorted by which property — if any — they
violate, never rote recall of a fixed example set. Interleaving
partners: `math.found.set-theory` (the operational-fluency layer this
concept's definitional floor supports) and `math.found.proposition`
(well-definedness is itself a bivalence requirement, per-candidate) —
given this entry's own flagged overlap with `set-theory`, deliberately
mixed review across both may be the most efficient path once both are
introduced.

## Transfer Connections

- **Near**: sorting a fresh mixed list of candidate descriptions into
  well-defined sets and non-sets, and correctly computing cardinality
  for listings with repeated or reordered elements.
- **Far**: recognizing the well-definedness requirement in other formal
  contexts (a database's query filter must have a definite yes/no per
  row; a legal category's membership criteria must be unambiguous to be
  enforceable).
- **Real-world**: noticing when an everyday "group" or "category" (a
  guest list, a genre of music) actually has a precise membership rule
  versus being a matter of vague, contestable judgment.
- **Expert transfer**: the learner, meeting an unfamiliar collection
  description in any context, automatically checks whether it supplies
  an unambiguous per-candidate yes/no test before treating it as a
  well-defined set.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node, confirmed against the
Blueprint's own Component 0: "P76 independence — cross_links = []").
Not fabricated beyond what the KG states.

## Blueprint References

`docs/curriculum/blueprints/math.found.set.md` — Status PACKAGE_READY
(575 lines; authored 2026-07-11). This entry reuses by reference: the
full Misconception Register (Component 2, MC-1–MC-3) and the Protocol
A/B teaching sequence. Not restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

**Genuine finding, recorded honestly per this program's standing
practice of not silently smoothing over real overlaps**: this concept's
Misconception Register (MC-1 order/repetition, MC-3 ∅-vs-{∅}) covers
essentially the same ground as `math.found.set-theory`'s own MC-2
(order), MC-4 (duplicates), and MC-1 (∅ vs. {∅}) — both blueprints were
authored independently but converge on nearly identical trigger
examples ({1,2,1} claimed to have 3 elements; {1,2}≠{2,1}; |{∅}|
miscounted as 0). This entry resolved the distinction as
definitional-recognition-floor (`set`, `bloom: remember`, 0.90
threshold, 2 hours) versus operational-fluency-on-top (`set-theory`,
`bloom: understand`, 0.80 threshold, 16 hours), a defensible split given
the KG's own explicit prerequisite edge (`set` requires `set-theory`),
but the misconception content itself is substantially duplicated rather
than cleanly partitioned. Recorded as Curriculum Feedback for the
Curriculum Production Pipeline to consider whether a future KG/Blueprint
revision should more clearly partition which specific misconceptions
belong to which node (e.g. `set` owns only well-definedness/MC-2, since
order and ∅-vs-{∅} are already fully owned by `set-theory`) — not fixed
or merged here, since no Canonical KG file or Blueprint is modified by
this program.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 4). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference. Flagged
  a genuine misconception-content overlap with the prerequisite concept
  `math.found.set-theory` as Curriculum Feedback rather than silently
  resolving it.
