# Reflexive Relation — `math.found.reflexive-relation`

## Identity

- **Concept ID**: `math.found.reflexive-relation` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.relation`)
- **Prerequisites**: `math.found.relation` — reflexivity is a property
  OF a relation R⊆A×A; the learner needs to already know what a
  relation is and how to read its matrix representation.
- **Unlocks**: `math.found.equivalence-relation` (Blueprint already
  authored; Educational Brain entry not yet authored in this program —
  reflexivity is one of its three defining components alongside
  symmetry and transitivity, both authored this same batch).
- **Related** (from KG): `math.found.symmetric-relation`,
  `math.found.transitive-relation`.
- **Difficulty**: developing · **Bloom**: remember · **Mastery
  threshold**: 0.9 · **Est. hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.found.reflexive-relation.md`
  (PACKAGE_READY, cross_links=[], P76 independence).

## Learning Objective

The learner can: state the definition of a reflexive relation (R on A
is reflexive iff (a,a)∈R for every a∈A); identify whether a given
relation is reflexive by checking ALL required self-pairs, not just
some; recognize the diagonal-all-ones signature of reflexivity in a
relation matrix (M[i][i]=1 for every i); and correctly distinguish
reflexivity from symmetry as two fully independent properties — a
relation can be reflexive-only, symmetric-only, both, or neither.

## Core Understanding

Reflexivity is a UNIVERSAL ("for all") claim about a relation R on A:
every single element a∈A must have its own self-pair (a,a) present in
R. This is fundamentally different from an EXISTENTIAL claim ("some
element has a self-pair") — finding one self-pair proves nothing about
the others, and a single missing self-pair, anywhere among A's
elements, is enough to disqualify R from being reflexive entirely, no
matter how many other self-pairs are present. In matrix terms, using
`math.found.relation`'s own matrix representation M, reflexivity
translates to EVERY diagonal entry M[i][i]=1 — checked position by
position across all n diagonal entries, not by a quick glance that
happens to catch a few. Reflexivity and symmetry are completely
independent properties, checking entirely different parts of a
relation: reflexivity concerns only the main diagonal (self-pairs);
symmetry concerns only off-diagonal pairs (a,b) with a≠b and their
mirrors (b,a). A relation can satisfy either, both, or neither, and
knowing one property holds says nothing about the other.

## Mental Models

- **Beginner model — "reflexive means it has some self-pairs"**: the
  learner treats finding one or a few self-pairs as sufficient evidence
  of reflexivity. Shelf-life warning: this model passes on relations
  where a quick glance happens to catch all self-pairs, but fails
  systematically the moment even one element's self-pair is missing.
- **Intermediate model — "reflexive means EVERY element has a self-pair,
  checked systematically"**: the learner correctly applies the
  FOR-EACH-element procedure and reads the matrix diagonal completely,
  but may still conflate reflexivity with symmetry when both properties
  are asked about together. Upgrade trigger: being asked whether a
  reflexive relation must also be symmetric.
- **Advanced model — "reflexivity (diagonal) and symmetry (off-diagonal)
  are fully independent checklists"**: the learner treats the two
  properties as governing entirely disjoint parts of the relation
  matrix and can classify any given relation along both axes
  independently, including edge cases (self-loops-only relations,
  the empty relation). Upgrade trigger: being asked to classify a
  relation as reflexive/symmetric/neither/both, requiring both
  checklists applied side by side.
- **Do not upgrade early**: a learner still checking only SOME self-
  pairs (beginner model) should not be pushed into the reflexivity-
  versus-symmetry independence lesson (intermediate-to-advanced) before
  the universal, exhaustive diagonal check is itself fully secure — the
  independence lesson presupposes reflexivity checking is already
  reliable on its own.

## Why Students Fail

The dominant failure is the existential-versus-universal error: a
student who finds ONE self-pair present concludes the relation is
reflexive, missing that reflexivity is a claim about EVERY element, not
some. A second, closely related failure appears when reading a matrix:
a student who spots SOME diagonal entries equal to 1 declares the
relation reflexive without systematically checking all n diagonal
positions, missing a zero elsewhere on the diagonal. A third,
independent failure is assuming reflexivity implies symmetry (or that
they're the same property under different names) — since both involve
"pairs relating back," it's tempting to conflate a diagonal condition
with an off-diagonal one.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 3), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — PARTIAL-DIAGONAL (Foundational; Type 1, overgeneralization —
conflating "there exists a with (a,a)∈R" [existential] with "for all a,
(a,a)∈R" [universal], a natural error since ordinary language rarely
distinguishes the two forms sharply)**
- *Trigger*: asked "Is R={(1,1),(2,3)} on {1,2,3} reflexive?", the
  learner answers YES because (1,1) is present.
- *Repair*: systematically check EVERY element of {1,2,3}: (1,1)∈R? Yes.
  (2,2)∈R? No — R has no such pair. (3,3)∈R? No. Two of three elements
  are missing their self-pair — R is NOT reflexive, and the one present
  self-pair (1,1) is irrelevant to that verdict.

**MC-2 — REFLEX-SYMM-CONFLATION (Type 1, overgeneralization — believing
a reflexive relation must also be symmetric, "if everything relates to
itself, pairs must go both ways")**
- *Trigger*: given R={(1,1),(2,2),(3,3),(1,2)}, the learner claims "not
  reflexive because (2,1) is missing" — misapplying a symmetry check to
  a reflexivity question.
- *Repair*: contrast pair — R₁={(1,2),(2,1)} on {1,2,3} is symmetric but
  NOT reflexive (all three self-pairs missing); R₂={(1,1),(2,2),(3,3),(1,2)}
  is reflexive (all self-pairs present) but NOT symmetric ((1,2)∈R but
  (2,1)∉R). "Reflexivity is about the main diagonal only. Symmetry is
  about off-diagonal pairs only. They are completely independent."

**MC-3 — DIAGONAL-INCOMPLETE (Type 1, overgeneralization — reading a
matrix and declaring reflexivity from SOME diagonal 1s without checking
all n)**
- *Trigger*: matrix with M[1][1]=1, M[2][2]=0, M[3][3]=1 — the learner
  says "the diagonal has 1s so it's reflexive," missing the 0 at M[2][2].
- *Repair*: physically label each diagonal entry M[1][1], M[2][2],
  M[3][3] with a checkmark or cross, then count the crosses — any cross
  at all means NOT reflexive, regardless of how many checkmarks
  surround it.

**MAMR note (from Blueprint)**: MC-1 is FOUNDATIONAL and must be cleared
first; MC-2 and MC-3 are secondary and cleared FIFO after.

## Analogies

- **Best analogy — roll call**: every student in the class must answer
  "present" for roll call to pass — one absent student fails the whole
  roll call, no matter how many others answered. Reflexivity is exactly
  this: every element of A must have its self-pair "present" in R; one
  missing self-pair fails the whole check. Breaking point: roll call has
  a natural stopping point (the list of names) that maps directly onto
  "every element of A," making the analogy strong specifically for
  MC-1's universal-quantifier lesson, but it doesn't naturally extend to
  illustrate the symmetry-independence lesson (MC-2).
- **ANTI-ANALOGY — do NOT say "reflexive just means the relation relates
  things to themselves, kind of like being symmetric with yourself"**:
  invoking "symmetric" in the explanation of reflexivity directly
  invites MC-2 by verbally blurring the two independent properties
  before either is separately secure.

## Demonstrations

- **Complete-diagonal-check demonstration**: for R={(1,1),(1,2),(2,2),(3,3),(3,1)}
  on {1,2,3}, systematically check all three self-pairs (all present) —
  establishes the positive baseline and the extra off-diagonal pairs'
  irrelevance to the verdict — directly targets MC-1.
- **Single-missing-self-pair demonstration**: for
  R={(1,1),(1,2),(2,3),(3,3)} on {1,2,3}, the systematic check finds
  (2,2)∉R — one missing self-pair is sufficient to disqualify the
  entire relation, despite two of three being present.
- **Reflexivity-vs-symmetry contrast demonstration**: side by side,
  R₁={(1,2),(2,1)} (symmetric, not reflexive) and
  R₂={(1,1),(2,2),(3,3),(1,2)} (reflexive, not symmetric) — directly
  targets MC-2.

## Discovery Questions

**Need** — asked "does every user in an access-control system need to
be able to access their own account page," the learner naturally
arrives at a universal per-element requirement, matching reflexivity's
own structure. **Playground** — the learner checks several relations'
self-pairs systematically, noticing that finding SOME self-pairs
present doesn't settle the question until all are checked. **Invention**
— the learner proposes the FOR-EACH-element procedure explicitly, as
opposed to a spot-check. **Collision** — presented with a relation that
is reflexive but visibly asymmetric (or vice versa), the learner's
instinct that the two properties travel together collides with the
direct counterexample — targeting MC-2. **Formalization** — naming the
universal self-pair requirement and the matrix diagonal signature
explicitly. **Compression** — given a fresh relation (as a listing or a
matrix), correctly determining reflexivity by systematic, complete
checking without prompting.

## Teaching Sequence

MC-1 (partial-diagonal, existential-vs-universal error) is addressed
first and given the most weight, since it is the FOUNDATIONAL
misconception per the Blueprint's own MAMR protocol — a learner who
checks only some self-pairs cannot reliably apply reflexivity to any
relation, including the ones later used to teach MC-2 and MC-3. MC-2
(reflexivity-symmetry conflation) and MC-3 (diagonal-incomplete, the
matrix-reading version of MC-1) are addressed after, cleared FIFO per
the Blueprint's protocol.

## Tutor Actions

From `../../teaching-actions/`: **Analogy Bridge** (the roll-call
analogy paired with the formal definition, the primary action opening
the concept) → **Worked Example** (the complete-diagonal-check and
single-missing-self-pair pair, targeting MC-1) → **Matching** (contrast
pair R₁/R₂, sorting relations by reflexive/symmetric status
independently, targeting MC-2). **What doesn't fit**: counting formulas
for the number of reflexive relations on a set of size n (2^(n²-n)) —
useful enrichment (present in the Blueprint's assessment bank) but
beyond this concept's `bloom: remember` core scope; offered only as
extension for advanced learners, not required for mastery.

## Voice Teaching Notes

Listen for "well, (1,1) is in there, so it's reflexive" stated after
checking only one element — this is MC-1's clearest verbal signature,
and should be met immediately with "and what about every OTHER element
of A — did you check those too?" A learner who says a relation "isn't
reflexive" because an off-diagonal mirror pair is missing is showing
MC-2 — prompt directly: "is that question about self-pairs, or about
pairs going both ways?" The load-bearing sentence: "reflexivity is a
FOR-ALL claim — one missing self-pair anywhere breaks the whole thing,
no partial credit."

## Assessment Signals

Blueprint's item bank (Component 7, 12 items) is a suitable seed for
gate-style checks: verifying reflexivity from an explicit pair listing
with a hidden gap (MC-1 probe); verifying from a matrix with a missing
diagonal 1 (MC-3 probe); producing a reflexive-but-not-symmetric
example and a symmetric-but-not-reflexive example (MC-2 probe); the
boundary cases (empty relation on the empty set — vacuously reflexive;
empty relation on a nonempty set — not reflexive). Because MC-1's
defining signature is a correct-looking verdict reached via incomplete
checking, assessment should require the learner to show the check for
EVERY element, not just state a final yes/no.

## Tutor Recovery Strategy

Likeliest utterance: "isn't (1,1) enough to show it's reflexive?" — the
concept-specific smaller question: "how many elements does A have, and
have you checked a self-pair for each one?" reframes the confusion from
"one confirmed self-pair settles it" to "reflexivity is a claim about
EVERY element, and each one needs its own check" — directly isolating
MC-1's existential-vs-universal gap.

## Memory Hooks

**Type**: procedural (a systematic, exhaustive verification habit —
checking every element's self-pair — not a single fact). Review form:
fresh relations (both as listings and as matrices) requiring complete,
element-by-element reflexivity checks, periodically paired with a
reflexivity-vs-symmetry classification task to keep MC-2's independence
lesson active. Interleaving partners: `math.found.relation` (the matrix
representation this concept's diagonal check directly reuses) and
`math.found.symmetric-relation` (authored this same batch, the property
this concept must stay clearly distinguished from).

## Transfer Connections

- **Near**: `math.found.equivalence-relation` (not yet authored),
  reflexivity is one of its three required components alongside
  symmetry and transitivity, both authored this same batch.
- **Far**: `math.found.partial-order` (reflexive + transitive), a
  different combination of reflexivity with a partner property,
  reinforcing that reflexivity is an independently reusable building
  block rather than tied exclusively to equivalence relations.
- **Real-world**: database self-join semantics ("every row matches
  itself" on a unique key — reflexive), road-network reachability
  ("every city has a trivial zero-length path to itself" — reflexive),
  social-network self-follow policies.
- **Expert transfer**: the learner, meeting an unfamiliar relation
  claimed to have a "closure" or "identity" property, automatically
  checks whether it's being asked to verify a diagonal (reflexivity-
  like) condition versus an off-diagonal (symmetry-like) condition,
  rather than assuming the two are interchangeable.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration. Not fabricated
beyond what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.reflexive-relation.md`.
Key objectives, misconception registry, and MAMR protocol reused by
reference above; the full 12-item assessment bank and P89 spaced-
repetition schedule (Components 7-8) not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The
complete-diagonal-check demonstration and the reflexivity-vs-symmetry
contrast are suitable future Explanation Memory seeds; the Blueprint's
P77 item bank is a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. Estimated hours (1) and mastery
threshold (0.9) are appropriate for a concept whose core content is one
universal-quantifier check plus one independence distinction from a
sibling property, matching the compact scope already established by
this program's other `developing`/`remember`-tier relation-property
entries authored this same batch.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.
