# Existence Proof — `math.found.existence-proof`

## Identity

- **Concept ID**: `math.found.existence-proof` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.proof`, `math.found.quantifiers`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.uniqueness-proof`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 4
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "constructive existence", "nonconstructive
  existence".

## Learning Objective

The learner can: prove ∃x P(x) either constructively, by exhibiting a
specific object and verifying it satisfies P, or non-constructively, by
showing the non-existence of such an object leads to a contradiction;
recognize that an existence proof establishes only that AT LEAST ONE
object satisfies P, saying nothing about how many; and correctly
distinguish an existence proof's scope from a uniqueness proof's, which
answers a genuinely different question.

## Core Understanding

An existence proof establishes that at least one object satisfying a
given property exists, either by explicitly constructing it or by
showing non-existence of the property leads to contradiction. A
CONSTRUCTIVE existence proof directly exhibits a specific object and
verifies it satisfies P — the most transparent and typically preferred
form when available, since it hands the reader a concrete witness. A
NON-CONSTRUCTIVE existence proof instead assumes NO object satisfies P
and derives a contradiction (directly reusing `math.found.proof-by-
contradiction`'s own technique) — this establishes that SOME object
must satisfy P, without ever identifying which one. Both forms are
fully rigorous; non-constructive proofs are sometimes the only
available route (some existence results in mathematics have no known
explicit construction), but they answer a strictly weaker practical
question than a constructive proof does — "something exists" versus
"here it is." An existence proof, by itself, says nothing whatsoever
about UNIQUENESS: proving ∃x P(x) does not address whether there might
be many such x, or exactly one — that separate question belongs to
`math.found.uniqueness-proof`, and the two are often, but not always,
proved together.

## Mental Models

- **Beginner model — "an existence proof means showing an example"**:
  the learner believes every existence proof must construct a specific
  object. Shelf-life warning: this model cannot accommodate genuinely
  non-constructive existence proofs, where no explicit object is ever
  produced.
- **Intermediate model — "existence can be proved either by exhibiting
  an object or by contradiction, and both are equally valid"**: the
  learner correctly recognizes and executes both forms, but may still
  believe an existence proof automatically also establishes uniqueness.
  Upgrade trigger: being asked whether a completed existence proof also
  tells you HOW MANY objects satisfy the property.
- **Advanced model — "existence and uniqueness are genuinely separate
  questions, and constructive vs. non-constructive is a real
  methodological choice with practical consequences"**: the learner
  cleanly separates "does one exist" from "is it the only one," and can
  articulate why a constructive proof, when available, is often more
  useful than a non-constructive one despite both being equally
  rigorous. Upgrade trigger: being asked what practical information a
  non-constructive existence proof withholds that a constructive one
  would provide.
- **Do not upgrade early**: a learner who still believes every existence
  proof must construct an object (beginner model) should not be pushed
  into the existence-versus-uniqueness distinction (advanced model)
  before both proof FORMS (constructive and non-constructive) are
  independently recognized as valid.

## Why Students Fail

The dominant failure believes an existence proof must always construct
a specific object, rejecting or being confused by genuinely non-
constructive proofs, which instead derive a contradiction from
assumed non-existence — an over-generalization from the more intuitive,
more commonly first-encountered constructive form. A second, independent
failure conflates existence with uniqueness, believing that once ∃x P(x)
is established, the proof has also shown there is only one such x —
when existence and uniqueness are logically independent claims that
require separate arguments, even though they are frequently proved
together in the same passage.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "An existence proof must exhibit a specific object" (Type 1,
overgeneralization from the more common, more intuitive constructive
form)**
- *Why*: constructive existence proofs are typically encountered first
  and feel more satisfying and concrete, so the non-constructive
  alternative (proving existence without ever identifying the object)
  can feel like it doesn't actually prove anything.
- *Symptom*: rejecting or expressing confusion at a non-constructive
  existence proof, insisting the argument is incomplete because no
  specific object was named.
- *Detection probe*: present a non-constructive existence proof (e.g.
  assume no prime exists satisfying some property, derive a
  contradiction) and ask whether this genuinely proves such a prime
  exists.
- *Recovery*: "the contradiction shows the ASSUMPTION 'no such object
  exists' is false — so an object satisfying P must exist, even though
  the argument never says which one. This is fully rigorous, directly
  reusing proof by contradiction's own logic: assuming the negation
  (nonexistence) led to an impossibility, so the negation is false,
  meaning existence holds."
- *Verification*: the learner accepts a non-constructive existence
  proof as fully valid and can explain why, without needing an explicit
  witness.

**MC-2 — "Proving existence also proves uniqueness" (Type 1,
overgeneralization — many first-encountered existence proofs happen to
concern objects that ARE unique, like solutions to certain equations,
making the two questions feel bundled together)**
- *Why*: several early examples of existence proofs concern objects
  that also happen to be unique, so the two questions are not clearly
  separated in the learner's experience before this concept makes the
  distinction explicit.
- *Symptom*: after proving ∃x P(x), assuming without further argument
  that x is the ONLY object satisfying P, or being unable to answer
  "could there be more than one?"
- *Detection probe*: ask the learner, after completing an existence
  proof, whether their argument also shows the object found is unique.
- *Recovery*: "existence (∃x P(x)) and uniqueness (at most one x
  satisfies P) are two SEPARATE claims requiring separate arguments —
  proving one says nothing about the other. `math.found.uniqueness-
  proof` handles the second question on its own terms."
- *Verification*: the learner correctly states, after an existence
  proof, that uniqueness has NOT been established and would require a
  separate argument.

## Analogies

**Primary — the missing-person case**: A detective might prove "the
culprit exists" non-constructively (from the crime's specific pattern,
deduce that SOMEONE must have committed it, without yet knowing who) or
constructively (identify the exact suspect and show they match every
clue). Both are legitimate ways to establish "a culprit exists" — but
neither, by itself, proves there was only ONE person involved; that's a
separate question about uniqueness.

**Anti-analogy to retire**: "An existence proof isn't complete until you
can point to the object." This directly invites MC-1 by treating
constructive proofs as the only legitimate form.

## Demonstrations

**Constructive existence**: prove "there exists an even prime number"
by exhibiting 2 directly and verifying it is both even and prime — a
complete, self-contained constructive proof.

**Non-constructive existence**: prove "there exists an irrational
number r such that r^√2 is rational" by considering √2^√2 — if it's
rational, done (r=√2); if it's irrational, then (√2^√2)^√2=√2^2=2 is
rational, so r=√2^√2 works — EITHER WAY some irrational r with the
property exists, without ever definitively identifying which case holds.

**Existence without uniqueness**: prove "there exists an integer
solution to x²=4" by exhibiting x=2 — but note x=-2 ALSO satisfies the
equation, directly demonstrating that this existence proof said nothing
about uniqueness, and in fact uniqueness fails here.

## Discovery Questions

Present a claim like "some number between 1 and 100 is both prime and
one more than a multiple of 4" and ask the learner to find such a
number (constructive discovery) — then present a claim resistant to
easy construction and ask "must one still exist, even if we can't
easily name it?" — motivating the non-constructive alternative before
naming it. Recommendation: guided discovery for constructive existence
(directly searchable); direct instruction for non-constructive proof
and the existence-versus-uniqueness distinction, since both require
explicit logical framing not naturally rediscovered.

## Teaching Sequence

MC-1 (constructive assumed mandatory) is addressed first, since a
learner who rejects non-constructive proofs cannot engage with an
entire class of legitimate mathematical arguments. MC-2 (existence
conflated with uniqueness) is addressed second, as an independent
scope-clarification issue that becomes relevant once existence proofs
themselves, in either form, are executed reliably.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (constructive vs.
non-constructive proofs of related claims, the primary action targeting
MC-1) → **Worked Example** (the x²=4 existence-without-uniqueness case,
targeting MC-2). **What doesn't fit**: a full treatment of
`math.found.uniqueness-proof`'s own machinery (typically: assume two
distinct objects both satisfy P, derive they must be equal) — that
belongs to that concept's own scope, cited here only by contrast.

## Voice Teaching Notes

**Register**: Careful to separate "does it exist" from "is it the
only one" as two audibly distinct questions, never bundled into one
breath.

**Wait-time**: After a non-constructive existence proof, pause and ask
"do we know WHICH object this is?" — confirming the learner accepts the
proof's validity despite not knowing the answer.

**Load-bearing sentences**:
- "A contradiction from assumed non-existence proves existence — even
  without naming the object."
- "Existence and uniqueness are two different questions — proving one
  says nothing about the other."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is rejecting a
valid non-constructive proof, assessment should include at least one
non-constructive existence item and ask the learner to evaluate its
validity directly. Because MC-2's defining signature is an unstated
assumption, assessment should explicitly ask "does this proof also
establish uniqueness?" after every existence-proof item.

## Tutor Recovery Strategy

Likeliest utterance: "but we don't know what the number actually is —
how is that a proof?" — the concept-specific smaller question: "did the
argument show that NO such number existing leads to something
impossible?" reframes the confusion from "proof requires naming the
object" to "proof requires establishing the claim, by whatever
rigorous route" — directly isolating MC-1's constructive-only
assumption.

## Memory Hooks

**Type**: procedural (constructive witness-exhibition, plus non-
constructive contradiction-based argument, directly reusing
`math.found.proof-by-contradiction`'s own technique) + declarative (the
existence-versus-uniqueness scope distinction). Review form: fresh
claims alternating constructive and non-constructive proof
opportunities, paired with an explicit "does this also prove
uniqueness?" check each time. Interleaving partners: `math.found.proof-
by-contradiction` (the technique non-constructive existence proofs
directly reuse) and `math.found.quantifiers` (the ∃ this entire concept
formalizes).

## Transfer Connections

- **Near**: `math.found.uniqueness-proof` (the paired, genuinely
  separate question this entry's own MC-2 keeps distinct).
- **Far**: computer science's existence results in complexity theory
  (non-constructive proofs that an algorithm or object exists, without
  producing one — e.g. certain pigeonhole-principle arguments);
  economics' existence theorems for equilibria (Nash's theorem proves
  equilibria exist without always constructing them).
- **Real-world**: "somewhere, someone has read this exact combination
  of books" reasoning (pigeonhole-style existence claims without
  identifying the specific person).
- **Expert transfer**: the learner, facing an unfamiliar claim of the
  form "there exists...", automatically checks whether construction is
  feasible before assuming a non-constructive route is necessary, and
  vice versa.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.existence-proof.md` — stated explicitly per the established
no-Blueprint convention, not omitted. This entry reuses `math.found.
proof-by-contradiction`'s own technique by reference for the non-
constructive case, not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (4) and mastery threshold (0.75) are appropriate for a
concept whose core content is two proof forms plus one important scope
distinction from its sibling `math.found.uniqueness-proof`.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
