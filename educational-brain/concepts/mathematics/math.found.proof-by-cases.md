# Proof by Cases — `math.found.proof-by-cases`

## Identity

- **Concept ID**: `math.found.proof-by-cases` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.proof`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.direct-proof`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 4
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "case analysis", "exhaustive proof".

## Learning Objective

The learner can: partition the possible situations relevant to a claim
into a finite set of cases that together cover EVERY possibility
(exhaustiveness); prove the claim separately within each case, using
whatever direct, contrapositive, or contradiction argument fits that
case; and correctly distinguish exhaustiveness (every situation covered
by at least one case) from disjointness (cases not sharing situations),
recognizing that proof by cases requires only the former.

## Core Understanding

A proof by cases partitions all possible situations into finitely many
cases and proves the statement separately for each case — the technique
is valid precisely because if every possible situation is covered by
some case, and the claim holds within each case, the claim holds
universally. The single non-negotiable requirement is EXHAUSTIVENESS:
every possible situation must fall into at least one of the stated
cases, with no gap. A distinction that separates this technique from
`math.found.partition`'s own stricter three-condition definition is
important: proof-by-cases does NOT require the cases to be mutually
exclusive (disjoint) — cases MAY overlap, and the proof remains
perfectly valid as long as every situation is covered by at least one
case, even if some situations fall into more than one case
simultaneously (e.g. "n≤5" and "n is even" as two cases for a claim
about integers overlap at n=2,4, but together with a third case "n>5
and n odd" they can still be exhaustive). Once cases are chosen, each
case is proved on its own terms, using whatever technique (direct,
contrapositive, even contradiction) suits that specific case — the
cases need not all use the same proof strategy internally.

## Mental Models

- **Beginner model — "proof by cases means splitting into a couple of
  convenient situations"**: the learner picks cases that feel natural or
  familiar without verifying they actually cover every possibility.
  Shelf-life warning: this model produces proofs with silent gaps the
  moment a situation outside the chosen cases exists.
- **Intermediate model — "cases must together cover every possibility,
  verified explicitly"**: the learner correctly checks exhaustiveness
  before proceeding, but may believe cases must also be non-overlapping,
  importing `math.found.partition`'s stricter requirement unnecessarily.
  Upgrade trigger: being shown a valid proof-by-cases argument whose
  cases genuinely overlap.
- **Advanced model — "cases need only be exhaustive, never necessarily
  disjoint, and each case may use its own internal proof strategy"**:
  the learner selects cases purely for exhaustive coverage and proof
  convenience, without artificially forcing disjointness. Upgrade
  trigger: being asked to design a case split for a claim where the
  most natural exhaustive split happens to overlap.
- **Do not upgrade early**: a learner who has not yet made
  exhaustiveness-checking a reliable habit (beginner-to-intermediate)
  should not be pushed into deliberately overlapping case designs
  (advanced model) — overlap-tolerance is only safe to exploit once the
  exhaustiveness discipline itself is unshakeable.

## Why Students Fail

The dominant failure omits a case — choosing cases that feel natural or
cover the "obvious" situations without systematically verifying every
possibility is accounted for, leaving a silent gap the proof never
actually addresses. A second, independent failure over-imports
`math.found.partition`'s own stricter requirement (nonempty, pairwise
disjoint, exhaustive) into proof-by-cases, believing cases must be
non-overlapping, when only exhaustiveness is actually required here —
this produces unnecessarily convoluted case designs as students work
hard to avoid overlaps that would have been perfectly fine.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "A 'reasonable-looking' set of cases is automatically
exhaustive" (Foundational; Type 1, overgeneralization — the chosen
cases FEEL like they cover everything without an explicit, systematic
check)**
- *Why*: cases that address the "obvious" or most salient situations
  (e.g. "n is positive" and "n is negative" for a claim about integers)
  feel complete, silently omitting a boundary case (n=0) that doesn't
  fit either label.
- *Symptom*: presenting a two-case proof ("n positive" / "n negative")
  for a claim about all integers, without addressing n=0.
- *Detection probe*: ask the learner to state, explicitly, which
  possible values of the variable are NOT covered by their stated
  cases.
- *Recovery*: force an explicit domain-coverage check: "list the full
  set your variable ranges over, then confirm every element of that set
  falls into at least one case. n=0 is an integer — which of your two
  cases covers it? Neither — add a third case, or adjust the existing
  ones (e.g. 'n≥0' and 'n<0')."
- *Verification*: the learner, given a fresh claim, states cases AND
  explicitly verifies coverage of every boundary/edge value before
  proceeding to prove within each case.

**MC-2 — "Cases must be non-overlapping, like a partition" (Type 1,
overgeneralization from `math.found.partition`'s own stricter three-
condition definition, applied here where it doesn't belong)**
- *Why*: partition (already authored, closely related in name and
  spirit) requires disjointness as one of its three conditions, and
  students who have recently learned that definition import it wholesale
  into proof-by-cases, assuming the same rule applies.
- *Symptom*: rejecting a valid case split because two cases share some
  situations, or contorting a case design specifically to avoid overlap
  when overlap would have been harmless.
- *Detection probe*: present a claim about integers with cases "n≤5"
  and "n is even," and ask whether this is a valid case split despite
  the overlap at n=2,4.
- *Recovery*: "proof by cases only needs EVERY situation covered by AT
  LEAST ONE case — overlap is completely fine, since if a situation
  falls into two cases, it's still been proved (probably twice, which
  costs nothing). Partition's disjointness requirement is a DIFFERENT,
  stricter rule for a different purpose — don't import it here."
- *Verification*: the learner accepts a genuinely overlapping but
  exhaustive case split as valid without hesitation.

## Analogies

**Primary — every possible weather forecast**: To prove "the airport
never fully shuts down," a case analysis might cover "clear weather,"
"rain," and "snow" — together exhaustive (every day has some weather
condition) even if "rain" and "snow" could, at a stretch, overlap during
sleet; the proof works case by case regardless. What matters is that no
possible day is left uncovered by all three cases, not that the three
categories never touch.

**Anti-analogy to retire**: "Cases work just like sorting things into
separate bins." "Separate bins" implies disjointness, directly
reinforcing MC-2 by suggesting cases must never share content.

## Demonstrations

**Exhaustiveness-gap example**: for a claim about "for every integer n,
n²≥0," cases "n>0" and "n<0" look complete but omit n=0 — direct
demonstration that 0²=0≥0 still needs its own case (or a case
redefinition to "n≥0" and "n<0") to be genuinely exhaustive.

**Overlapping-but-valid case split**: for a claim about integers,
cases "n is a multiple of 2" and "n is a multiple of 3" together do NOT
cover every integer (e.g. n=5 is in neither) — this failed example is
contrasted with a genuinely exhaustive but overlapping pair like "n≤10"
and "n≥5" (every integer is in at least one; n=5 through 10 are in
both), confirming overlap itself is not the problem — incomplete
coverage is.

## Discovery Questions

Present a claim and ask the learner to propose a case split, then
systematically test boundary and edge values (0, negative numbers,
very large numbers) against the proposed cases to discover any gaps
themselves — this directly surfaces MC-1 through self-testing rather
than being told. Recommendation: guided discovery for the exhaustiveness-
checking habit (a testable, verifiable process); direct instruction for
the overlap-is-fine correction (MC-2), since it requires an explicit
contrast against the already-learned, stricter partition definition.

## Teaching Sequence

MC-1 (exhaustiveness gaps) is addressed first and given the most
weight, as the FOUNDATIONAL misconception — an inexhaustive case split
produces an invalid proof regardless of how well each individual case
is argued. MC-2 (overlap assumed forbidden) is addressed second, once
exhaustiveness-checking is a reliable habit, since it is a separate,
lower-stakes issue (over-caution rather than an actual gap) that mainly
costs unnecessary effort rather than producing invalid proofs.

## Tutor Actions

From `../../teaching-actions/`: **Error Analysis** (spot the missing
boundary case in a near-complete case split, the primary action
targeting MC-1) → **Demonstration** (the overlapping-but-exhaustive
case-split example, targeting MC-2) → **Drill** (rapid exhaustiveness-
checking across varied claims, always requiring explicit boundary-value
testing). **What doesn't fit**: a full re-derivation of `math.found.
partition`'s own three-condition definition — cited by contrast, not
re-taught.

## Voice Teaching Notes

**Register**: Systematic and checklist-driven — always ask "what value
falls through the cracks?" before accepting a case split as complete.

**Wait-time**: After a learner proposes cases, pause and ask them to
test at least one boundary value themselves before confirming
exhaustiveness — surfaces MC-1 directly.

**Load-bearing sentences**:
- "Every possible situation needs a home in at least one case — check
  the edges."
- "Overlap between cases is fine — missing coverage is the only real
  problem."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is a
plausible-looking but genuinely incomplete case split, assessment
should include at least one claim with a subtle boundary value (zero,
a shared value between natural categories) that a "reasonable-looking"
case split would miss. Because MC-2's defining signature is
unnecessary over-caution rather than a wrong answer, assessment should
include a genuinely overlapping but valid case split and ask the
learner to judge its validity directly.

## Tutor Recovery Strategy

Likeliest utterance: "I think I covered everything, is that enough?" —
the concept-specific smaller question: "pick a boundary value — zero,
or the edge between your cases — which case does it fall into?"
reframes the confusion from "it feels complete" to "every specific
value must be traceable to at least one stated case" — directly
isolating MC-1's unverified exhaustiveness assumption.

## Memory Hooks

**Type**: procedural (exhaustiveness-verification, plus per-case
argument construction directly reusing `math.found.direct-proof`'s and
sibling entries' own techniques within each case). Review form: fresh
claims requiring explicit boundary-value testing before any case-by-
case proof begins, keeping MC-1's guard-rail active. Interleaving
partners: `math.found.partition` (the concept whose stricter
disjointness requirement this entry explicitly does NOT inherit,
per MC-2) and `math.found.direct-proof` (the technique typically
applied within each individual case).

## Transfer Connections

- **Near**: `math.found.direct-proof`, `math.found.proof-by-
  contradiction`, `math.found.proof-by-contrapositive` — any of which
  may be used to prove an individual case.
- **Far**: computer science's exhaustive case analysis in algorithm
  correctness proofs and switch-statement completeness checking (a
  switch statement with a missing case is exactly this concept's MC-1,
  in code); combinatorial proofs that partition a counting problem into
  cases.
- **Real-world**: insurance policy terms that must specify coverage for
  every possible claim scenario, with no gap left unaddressed; legal
  statutes attempting exhaustive enumeration of covered situations.
- **Expert transfer**: the learner, facing an unfamiliar claim requiring
  case analysis, automatically tests boundary and edge values against
  proposed cases before trusting the split is complete.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.proof-by-cases.md` — stated explicitly per the established
no-Blueprint convention, not omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (4) and mastery threshold (0.75) are appropriate for a
concept whose core content is a single verification discipline
(exhaustiveness) plus one important corrective distinction from
`math.found.partition`.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
