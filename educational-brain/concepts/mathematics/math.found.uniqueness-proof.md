# Uniqueness Proof — `math.found.uniqueness-proof`

## Identity

- **Concept ID**: `math.found.uniqueness-proof` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.existence-proof` (already establishes
  that existence and uniqueness are separate questions requiring
  separate arguments — this entry supplies the uniqueness half).
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.existence-proof`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 4
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "proof of uniqueness".

## Learning Objective

The learner can: prove that AT MOST ONE object satisfies a given
property, typically by assuming two objects x and y both satisfy it and
deriving x=y; correctly combine a uniqueness proof with a separate
existence proof to establish "exactly one" object satisfies the
property, never conflating the two arguments into one; and recognize
that a uniqueness proof, by itself, says nothing about whether any
object satisfying the property exists at all.

## Core Understanding

A uniqueness proof demonstrates that at most one object satisfies a
given property, typically by assuming two such objects exist and
showing they must be equal — the standard technique is: assume x and y
both satisfy the property, then derive x=y using the property's own
defining conditions and whatever algebraic or logical machinery
applies. This is a DIRECT PROOF in its own right (per `math.found.
direct-proof`), just with a distinctive opening move (assume TWO
objects, not one). Crucially, `math.found.existence-proof` already
establishes that existence ("at least one") and uniqueness ("at most
one") are logically independent claims — this entry's own uniqueness
technique proves ONLY the "at most one" half, and says absolutely
nothing about whether any object satisfying the property exists at
all. The two halves are typically COMBINED to establish "exactly one"
object satisfies a property: an existence proof (showing at least one
exists) plus a uniqueness proof (showing at most one exists) together
give "exactly one" — but each half requires its own complete, separate
argument, and neither substitutes for the other.

## Mental Models

- **Beginner model — "uniqueness proof means showing there's only one
  answer, by finding it"**: the learner conflates uniqueness with
  existence, believing that exhibiting one object automatically also
  proves no others exist. Shelf-life warning: this model cannot
  distinguish "I found one" (existence) from "there could be only this
  one" (uniqueness), and fails the moment a property with multiple
  satisfying objects is presented.
- **Intermediate model — "uniqueness means assuming two objects satisfy
  the property and showing they must be equal"**: the learner correctly
  executes the assume-two-derive-equal technique, but may still treat a
  completed uniqueness proof as if it also establishes existence.
  Upgrade trigger: being asked whether a uniqueness proof alone tells
  you anything satisfies the property at all.
- **Advanced model — "existence and uniqueness are two fully separate
  arguments, combined only when both are independently established"**:
  the learner cleanly separates the two claims in both directions and
  recognizes "exactly one" as requiring both halves, neither
  substitutable for the other. Upgrade trigger: being given a property
  with NO satisfying object and asked whether a uniqueness proof for
  that property could still be valid (yes — "at most one" is vacuously
  true when there are zero).
- **Do not upgrade early**: a learner who still conflates uniqueness
  with existence (beginner model) should not be pushed into the vacuous-
  truth edge case (advanced model) before the assume-two-derive-equal
  technique is itself reliably executed on its own terms.

## Why Students Fail

The dominant failure conflates uniqueness with existence — believing
that finding or exhibiting one object satisfying a property
automatically also proves no other object could, when in fact these are
two entirely separate claims requiring two separate arguments; finding
ONE object establishes existence, not uniqueness. A second, independent
failure, once the assume-two-objects technique is learned, forgets that
a uniqueness proof alone establishes only "at most one," never
addressing whether even one object exists — a uniqueness proof for a
property with NO satisfying object at all is still perfectly valid (the
"assume two objects, derive equality" argument is vacuously satisfied
when there are zero objects to begin with), a subtlety students rarely
consider without direct prompting.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "Finding one object also proves uniqueness" (Foundational;
Type 1, overgeneralization — direct extension of `math.found.
existence-proof`'s own MC-2, existence conflated with uniqueness, from
the existence side to the uniqueness side)**
- *Why*: once a learner successfully exhibits one object satisfying a
  property, it FEELS like the search is complete and no others could
  exist — but "I found one and stopped looking" is not the same as "no
  other one could possibly exist."
- *Symptom*: after a successful existence proof (exhibiting a specific
  object), treating the problem as fully solved without attempting any
  separate uniqueness argument.
- *Detection probe*: after a learner exhibits a solution x=2 to x²=4,
  ask whether they have also shown x=2 is the ONLY solution.
- *Recovery*: "exhibiting x=2 shows a solution EXISTS — it says nothing
  about whether another solution could also work. Check directly: is
  x=-2 also a solution? (Yes — (-2)²=4 too.) This equation has TWO
  solutions, so uniqueness genuinely fails here, even though existence
  succeeded."
- *Verification*: the learner, after any existence proof, explicitly
  states that uniqueness is a separate, unaddressed question requiring
  its own argument.

**MC-2 — "A uniqueness proof also proves existence" (Type 1,
overgeneralization — the reverse conflation, believing the assume-two-
objects technique somehow also guarantees at least one object exists)**
- *Why*: the uniqueness technique's opening move ("assume x and y both
  satisfy the property") can feel like it presupposes at least one
  object already exists, blurring the boundary between "IF objects
  exist, they must be equal" (uniqueness) and "an object DOES exist"
  (existence).
- *Symptom*: presenting only a uniqueness argument (assume x,y satisfy
  P, derive x=y) as if it also establishes that some object satisfying
  P actually exists.
- *Detection probe*: ask the learner whether their completed uniqueness
  proof, by itself, tells them anything satisfies the property at all.
- *Recovery*: "the uniqueness argument is conditional: IF two objects
  satisfy P, THEN they're equal. This says nothing about whether ANY
  object satisfies P — that requires a completely separate existence
  argument. In fact, a uniqueness proof can be perfectly valid even when
  NO object satisfies the property at all — 'at most one' is vacuously
  true when there are zero."
- *Verification*: the learner correctly states, after a uniqueness
  proof alone, that existence has not been established and requires a
  separate argument.

## Analogies

**Primary — the only child versus an only child who might not exist**:
Proving "if this family has a child, they are the family's only child"
(uniqueness) is a completely different claim from "this family has a
child" (existence) — the uniqueness claim can be TRUE even for a
childless family (vacuously — there's no pair of children to
contradict the claim), while confirming a specific child's existence
requires separately checking the family records.

**Anti-analogy to retire**: "Uniqueness proof means proving there's
exactly one." "Exactly one" bundles existence and uniqueness together,
directly inviting MC-1/MC-2's conflation — the uniqueness technique on
its own proves only the "at most one" half.

## Demonstrations

**Existence without uniqueness, made explicit**: for x²=4, exhibit x=2
(existence), then explicitly check whether uniqueness also holds —
x=-2 satisfies the same equation, so uniqueness FAILS here, directly
demonstrating that existence alone establishes nothing about how many
solutions there are.

**Assume-two-derive-equal technique**: prove "if a real number x
satisfies x+5=8, then x is unique" by assuming x₁ and x₂ both satisfy
x+5=8, so x₁+5=8=x₂+5, hence x₁=x₂ — a complete uniqueness proof, using
only algebra, that never once asks whether such an x actually exists
(a separate, trivial existence check: x=3 works).

**Vacuous uniqueness**: for the property "x is a real number satisfying
x²=-1" (no real solution exists), the uniqueness argument "assume x₁,x₂
both satisfy x²=-1 and derive x₁=x₂" is still perfectly valid
(vacuously, since the premise is never satisfiable) — demonstrating
uniqueness can hold even when existence completely fails.

## Discovery Questions

Present x²=4 and ask the learner to find a solution, then ask "is that
the ONLY solution, or could there be another?" — motivating the search
for a second solution and the eventual discovery that uniqueness fails
here, directly experiencing the existence/uniqueness split.
Recommendation: guided discovery for the existence-versus-uniqueness
split itself (directly experiential via a property with multiple
solutions); direct instruction for the assume-two-derive-equal
technique and the vacuous-uniqueness edge case, since both require
precise logical framing not naturally rediscovered.

## Teaching Sequence

MC-1 (existence mistaken for also proving uniqueness) is addressed
first, since it is the more common direction of conflation — learners
more often stop after finding one object than they attempt uniqueness
prematurely. MC-2 (uniqueness mistaken for also proving existence) is
addressed second, once the assume-two-objects technique is itself
executed reliably, since it concerns a subtler logical scope question
about what that technique does and does not establish.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the x²=4 existence-
without-uniqueness case, the primary action targeting MC-1) → **Worked
Example** (the assume-two-derive-equal technique on x+5=8, targeting the
core skill) → **Thought Experiment** (the vacuous-uniqueness case for
x²=-1, targeting MC-2). **What doesn't fit**: a full treatment of
`math.found.existence-proof`'s own constructive/non-constructive
distinction — cited by reference, not re-derived, since this entry's
own scope is specifically the uniqueness half.

## Voice Teaching Notes

**Register**: Consistently pair the two questions out loud — "does one
exist, AND is it the only one?" — never let one question stand in for
the other.

**Wait-time**: After an existence proof, pause and ask "have we also
shown it's unique?" before moving on — surfaces MC-1 directly.

**Load-bearing sentences**:
- "Finding one object proves existence — it says nothing about
  uniqueness."
- "A uniqueness proof only says: IF objects exist, they're equal — it
  never says one actually does."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is stopping
after a successful existence proof, assessment should include at least
one property with multiple satisfying objects (like x²=4) to see
whether the learner spontaneously checks for a second solution. Because
MC-2's defining signature is an unstated assumption, assessment should
explicitly ask "does this uniqueness proof also tell you something
exists?" after every uniqueness-proof item.

## Tutor Recovery Strategy

Likeliest utterance: "I found the answer, so it must be the only one,
right?" — the concept-specific smaller question: "did you CHECK whether
another answer could also work, or did you just stop looking?"
reframes the confusion from "finding one settles it" to "uniqueness
requires its own, separate argument" — directly isolating MC-1's
existence-uniqueness conflation.

## Memory Hooks

**Type**: procedural (the assume-two-derive-equal technique, directly
reusing `math.found.direct-proof`'s own execution skill on a
distinctive opening move) + declarative (the existence/uniqueness
logical independence). Review form: fresh properties requiring the
learner to explicitly address BOTH existence and uniqueness as separate
questions, keeping both MC-1 and MC-2's guard-rails active.
Interleaving partners: `math.found.existence-proof` (the paired,
genuinely separate question) and `math.found.direct-proof` (the
technique this entry's core argument directly reuses).

## Transfer Connections

- **Near**: `math.found.existence-proof` (the paired question this
  entry's every misconception is calibrated against).
- **Far**: computer science's uniqueness arguments for data structures
  (e.g. proving a binary search tree has at most one node with a given
  key); well-definedness proofs in algebra (showing an operation
  produces a unique result regardless of which representative is used).
- **Real-world**: "there's only one correct password matching this
  hash" reasoning (a uniqueness claim distinct from "some password
  matches"); legal arguments establishing a unique rightful claimant to
  an estate.
- **Expert transfer**: the learner, facing an unfamiliar claim of the
  form "there is a unique...", automatically separates it into two
  independent sub-arguments (existence and uniqueness) before
  attempting either.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.uniqueness-proof.md` — stated explicitly per the established
no-Blueprint convention, not omitted. This entry reuses `math.found.
existence-proof`'s own existence/uniqueness scope distinction and
`math.found.direct-proof`'s own technique by reference, not restated in
full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (4) and mastery threshold (0.75) match `math.found.
existence-proof`'s own values, appropriately reflecting this concept's
parallel status as the paired complementary technique.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 10, autonomous loop) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
