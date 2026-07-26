# Proof by Contrapositive — `math.found.proof-by-contrapositive`

## Identity

- **Concept ID**: `math.found.proof-by-contrapositive` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.proof`, `math.found.logical-connectives`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.direct-proof`,
  `math.found.proof-by-contradiction`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 5
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "contrapositive proof".

## Learning Objective

The learner can: form the contrapositive of a conditional statement P→Q
correctly as ¬Q→¬P; explain WHY proving the contrapositive establishes
the original statement, citing `math.found.logical-equivalence`'s own
truth-table verification that P→Q≡¬Q→¬P; correctly distinguish the
contrapositive from the converse (Q→P) and the inverse (¬P→¬Q), neither
of which is logically equivalent to the original; and select
contrapositive proof when the hypothesis P resists direct unpacking but
the negated conclusion ¬Q unpacks cleanly.

## Core Understanding

A proof by contrapositive proves P→Q by instead proving ¬Q→¬P,
exploiting the logical equivalence of a conditional and its
contrapositive — a fact `math.found.logical-equivalence` already
establishes via truth table (P→Q and ¬Q→¬P agree on every row). This
means proving ¬Q→¬P is a fully legitimate, complete proof of P→Q; no
additional step is needed once the contrapositive itself is
established. The strategic value of contrapositive proof is specific:
it is chosen precisely when P itself does not unpack cleanly (e.g. "n²
is even" doesn't directly hand you a usable form for n), but the
NEGATED CONCLUSION ¬Q unpacks cleanly instead (e.g. "n is not even" —
n is odd — DOES hand you the usable form n=2k+1). Proving "if n² is
even, then n is even" directly is awkward; proving its contrapositive
"if n is not even (odd), then n² is not even (odd)" is a direct proof
in its own right, starting from n=2k+1, a form that unpacks immediately.
Two distinct related transformations of P→Q must be kept separate from
the contrapositive: the CONVERSE, Q→P, and the INVERSE, ¬P→¬Q — neither
is logically equivalent to the original conditional, and proving either
one does NOT establish P→Q.

## Mental Models

- **Beginner model — "contrapositive means flip and negate, and it's
  basically the same statement"**: the learner mechanically applies a
  flip-and-negate transformation without distinguishing WHICH of the
  three related transformations (contrapositive, converse, inverse)
  they've produced. Shelf-life warning: this model cannot reliably
  distinguish the one equivalent transformation (contrapositive) from
  the two non-equivalent ones (converse, inverse).
- **Intermediate model — "contrapositive is ¬Q→¬P specifically, and
  it's logically equivalent to P→Q, verified by truth table"**: the
  learner correctly forms the contrapositive and can verify its
  equivalence via truth table, but may still confuse the converse or
  inverse with the contrapositive under time pressure. Upgrade trigger:
  being asked to form and label all three transformations (converse,
  inverse, contrapositive) of the same conditional side by side.
- **Advanced model — "contrapositive is selected strategically when ¬Q
  unpacks more cleanly than P, and converse/inverse are never
  substitutes for it"**: the learner reliably distinguishes all three
  transformations and judges, before writing a single line, whether
  contrapositive proof offers a genuine strategic advantage over direct
  proof. Upgrade trigger: being given a claim and asked to justify
  choosing contrapositive over direct proof specifically because of
  which side (P or ¬Q) unpacks more cleanly.
- **Do not upgrade early**: a learner still conflating contrapositive
  with converse or inverse (beginner model) should not be pushed into
  strategic selection (advanced model) before the three
  transformations are reliably distinguished on paper.

## Why Students Fail

The dominant failure confuses the contrapositive (¬Q→¬P, logically
equivalent to P→Q) with the CONVERSE (Q→P) or the INVERSE (¬P→¬Q),
neither of which is equivalent to the original — this is arguably the
single most common named error in introductory proof-writing, since all
three transformations look superficially similar (some combination of
swapping and negating) and only careful attention to WHICH combination
preserves logical equivalence prevents the mix-up. A second, independent
failure believes proving the contrapositive is merely "supporting
evidence" for the original claim rather than a complete, sufficient
proof of it in its own right — treating contrapositive proof as
somehow less direct or less conclusive than direct proof, when the two
are equally rigorous by the underlying logical equivalence.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "Contrapositive, converse, and inverse are interchangeable"
(Foundational; Type 4, notation-induced — all three involve some
combination of swapping P/Q and negating, and the specific combination
that preserves equivalence is easy to lose track of)**
- *Why*: three related transformations exist (swap only = converse;
  negate only = inverse; swap AND negate = contrapositive), and without
  deliberate practice distinguishing them, students apply "some"
  transformation and assume it's equivalent.
- *Symptom*: proving the converse (Q→P) or inverse (¬P→¬Q) of a claim
  and believing this establishes the original P→Q.
- *Detection probe*: given "if n is divisible by 4, then n is even,"
  ask the learner to state the converse, inverse, and contrapositive,
  and identify which is logically equivalent to the original.
- *Recovery*: verify by truth table (reusing `math.found.logical-
  equivalence`'s own technique) that P→Q and ¬Q→¬P agree on every row,
  while P→Q and Q→P (or ¬P→¬Q) do NOT — for the divisibility example,
  the converse "if n is even, then n is divisible by 4" is FALSE (n=6
  is even but not divisible by 4), a concrete counterexample showing
  converse ≠ original.
- *Verification*: the learner correctly labels all three
  transformations for a fresh conditional and identifies only the
  contrapositive as equivalent.

**MC-2 — "Contrapositive proof is weaker or less direct than direct
proof" (Type 1, overgeneralization — since contrapositive proof
requires an extra conceptual step [recognizing the equivalence] before
any direct argument begins, it can feel like an indirect, hedged
approach)**
- *Why*: because contrapositive proof visibly reasons about a
  DIFFERENT statement (¬Q→¬P) than the one originally asked (P→Q),
  students sometimes doubt whether the argument has genuinely
  established the ORIGINAL claim.
- *Symptom*: after completing a valid contrapositive proof, treating
  the result as needing an additional justification step, or expressing
  uncertainty about whether the original P→Q has truly been proved.
- *Detection probe*: after a learner completes a contrapositive proof,
  ask directly: "have you now proved the original statement P→Q, or
  only the contrapositive?"
- *Recovery*: "P→Q and ¬Q→¬P are logically EQUIVALENT — verified by
  truth table, not by intuition. Proving one is proving the other, in
  full, with no gap and no extra step needed."
- *Verification*: the learner states confidently, without prompting,
  that a completed contrapositive proof fully and completely
  establishes the original conditional.

## Analogies

**Primary — the alarm system**: "If the alarm sounds (P), the building
is being evacuated (Q)" has contrapositive "if the building is NOT
being evacuated (¬Q), the alarm did NOT sound (¬P)" — logically the
SAME guarantee, viewed from the opposite direction: no evacuation
happening rules out the alarm having sounded. Contrast the CONVERSE
("if the building is being evacuated, the alarm sounded" — could be
false, e.g. a fire drill announced by intercom instead) and the INVERSE
("if the alarm doesn't sound, there's no evacuation" — same flaw,
mirrored) — neither carries the original guarantee.

**Anti-analogy to retire**: "Contrapositive is just the reverse of the
original." "Reverse" is imprecise and doesn't specify whether it's
"reverse and negate" (contrapositive, equivalent) or "reverse only"
(converse, not equivalent) — the imprecision directly feeds MC-1.

## Demonstrations

**Direct-proof-resistant claim, made tractable**: "if n² is even, then
n is even" resists direct proof (n² even doesn't unpack toward a usable
form for n). Its contrapositive: "if n is not even (odd), then n² is
not even (odd)" — assume n=2k+1, compute n²=4k²+4k+1=2(2k²+2k)+1, which
is odd. A clean direct proof OF THE CONTRAPOSITIVE, which by the
underlying equivalence fully establishes the original.

**Three-transformations side-by-side, with a counterexample**: for "if
n is divisible by 4, then n is even" — contrapositive: "if n is not
even, then n is not divisible by 4" (true, equivalent). Converse: "if n
is even, then n is divisible by 4" (FALSE — n=6 is a direct
counterexample). Inverse: "if n is not divisible by 4, then n is not
even" (FALSE — same n=6 counterexample, since inverse and converse are
themselves logically equivalent to each other, though neither to the
original).

## Discovery Questions

Present "if n² is even, then n is even" and ask the learner to attempt
a direct proof, letting them discover the unpacking difficulty
themselves — then ask "what if, instead, you assumed n is ODD — what
could you show?" guiding discovery of the contrapositive's strategic
advantage before the term is formally introduced. Recommendation:
guided discovery for the strategic MOTIVATION (direct proof resists,
contrapositive doesn't); direct instruction for the precise
contrapositive/converse/inverse distinction, since MC-1 is a notation
trap best defused explicitly with a truth-table verification rather
than discovered.

## Teaching Sequence

MC-1 (contrapositive/converse/inverse conflation) is addressed first
and given the most weight, as the single most consequential error — a
learner who proves the converse or inverse has not proved anything
about the original claim at all, not merely proved it less elegantly.
MC-2 (contrapositive treated as weaker) is addressed second, once the
three transformations are reliably distinguished, since it concerns
confidence in an already-correctly-executed proof rather than execution
itself.

## Tutor Actions

From `../../teaching-actions/`: **Matching** (sort three
transformations of a conditional into converse/inverse/contrapositive
piles, the primary action targeting MC-1) → **Error Analysis** (present
a "proof of the converse" mistaken for a proof of the original,
targeting MC-1 from a different angle) → **Worked Example** (the n²-
even claim proved via its contrapositive, targeting MC-2 by
demonstrating the technique's full sufficiency). **What doesn't fit**:
a full treatment of logical equivalence's truth-table machinery — that
belongs to `math.found.logical-equivalence`'s own scope and is reused
here only as a verification tool, not re-derived.

## Voice Teaching Notes

**Register**: Precise about which transformation is which — always say
"contrapositive" with its full form "¬Q→¬P" attached, never abbreviated
to "the reverse" or "the flip."

**Wait-time**: After forming a contrapositive, pause and ask "is this
the converse, the inverse, or the contrapositive?" before proceeding —
directly surfaces MC-1.

**Load-bearing sentences**:
- "Contrapositive: swap AND negate. That's the one that's logically
  equivalent — the other two combinations are not."
- "Proving the contrapositive fully proves the original — no gap, no
  extra step."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is a
plausible-looking but WRONG transformation mistaken for the
contrapositive, assessment should require the learner to produce all
three transformations (converse, inverse, contrapositive) for the same
conditional and label each, not just produce one.

## Tutor Recovery Strategy

Likeliest utterance: "so I just flip it around, right?" — the concept-
specific smaller question: "flip AND negate, or just flip? Which one
did you just do?" reframes the confusion from "any rearrangement works"
to "exactly one specific combination (swap and negate) preserves the
logical guarantee" — directly isolating MC-1's imprecise transformation.

## Memory Hooks

**Type**: procedural (form-the-contrapositive-then-direct-proof-it,
directly reusing `math.found.direct-proof`'s own execution skill on a
transformed statement) + declarative (the three-transformation
distinction). Review form: fresh conditionals requiring all three
transformations produced and labeled together, keeping MC-1's
distinction from decaying into "some rearrangement." Interleaving
partners: `math.found.logical-equivalence` (the truth-table
verification tool) and `math.found.direct-proof` (the technique applied
to the transformed statement).

## Transfer Connections

- **Near**: `math.found.direct-proof` (contrapositive proof IS a direct
  proof, applied to a transformed statement), `math.found.proof-by-
  contradiction` (a related but distinct negation-based strategy).
- **Far**: computer science's contrapositive-style reasoning in
  correctness arguments ("if the output is wrong, the input must have
  violated a precondition"); everyday risk analysis ("if not safe, then
  not approved" as the operative guarantee, distinct from its converse).
- **Real-world**: "if you don't have a ticket, you can't board" (a
  contrapositive-shaped rule) versus its non-equivalent converse ("if
  you have a ticket, you can board" — not guaranteed, e.g. the flight
  could be full).
- **Expert transfer**: the learner, facing an unfamiliar conditional
  claim resistant to direct proof, automatically checks whether the
  negated conclusion unpacks more cleanly before committing to
  contrapositive as the strategy.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.proof-by-contrapositive.md` — stated explicitly per the
established no-Blueprint convention, not omitted. This entry reuses
`math.found.logical-equivalence`'s own truth-table verification
technique by reference for confirming P→Q≡¬Q→¬P, not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (5) and mastery threshold (0.75) are appropriate given
the concept's genuinely high-stakes single misconception (MC-1) which
this program's Chief Architect Review process would flag as needing
disproportionate teaching weight relative to its modest hour count.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
