# Theorem — `math.found.theorem`

## Identity

- **Concept ID**: `math.found.theorem` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (top-level, no
  parent in KG)
- **Prerequisites**: `math.found.axiom`, `math.found.proof`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.axiom`, `math.found.conjecture`,
  `math.found.lemma`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 3
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "proposition", "lemma", "corollary".

## Learning Objective

The learner can: define a theorem as a mathematical statement rigorously
proved true from axioms and previously established theorems; correctly
distinguish "theorem," "lemma," "proposition," and "corollary" as
different EXPOSITORY ROLES a proved statement can play (based on its
significance and relationship to surrounding results), not different
LEVELS of truth or rigor; and correctly reject calling an unproven,
even widely-believed, statement a theorem — that is a conjecture,
regardless of how much evidence supports it.

## Core Understanding

A theorem is a mathematical statement that has been rigorously proved
to be true from axioms and previously established theorems — proof, in
the sense `math.found.proof` already defines, is the ENTIRE and
non-negotiable requirement; a statement with overwhelming supporting
evidence but no completed proof is not a theorem, no matter how widely
believed. The KG's own aliases for this concept — "proposition,"
"lemma," "corollary" — name a family of closely related terms that
differ in EXPOSITORY ROLE, not in the standard of truth each must meet:
all are equally, fully proven; the terms simply signal how a given
result functions within a larger body of work. A LEMMA is typically a
smaller, supporting result proved specifically to be used as a stepping
stone toward a more significant theorem. A COROLLARY is a result that
follows quickly and directly from an already-proven theorem, usually
with little additional argument. A PROPOSITION is often used for a
result considered less central or less difficult than a "theorem"
proper, though this distinction is a matter of authorial judgment about
significance, not a different logical category. None of these
distinctions affects whether a statement counts as PROVEN — they are
all, without exception, statements that have met the full standard of
mathematical proof.

## Mental Models

- **Beginner model — "theorem, lemma, proposition, and corollary are
  different levels of how 'true' or 'certain' something is"**: the
  learner treats the naming choice as signaling differing DEGREES of
  rigor or confidence. Shelf-life warning: this model cannot explain why
  a "mere" lemma is just as rigorously proven as the "important"
  theorem it supports.
- **Intermediate model — "all four terms name equally-proven
  statements; they differ in their EXPOSITORY role within a body of
  work"**: the learner correctly treats all four as equally rigorous,
  but may not yet reliably distinguish WHICH role fits a given
  situation (is this a lemma or a corollary?). Upgrade trigger: being
  given an unfamiliar mathematical text and asked to explain why a
  specific result was labeled "lemma" rather than "theorem."
- **Advanced model — "the choice of label reflects an author's
  judgment about a result's significance and its relationship to
  surrounding results, entirely independent of its proof standard"**:
  the learner fluently reads mathematical exposition and understands
  why authors make these labeling choices, while never mistaking the
  choice for a statement about rigor. Upgrade trigger: being asked
  whether a specific "corollary" could, in principle, have been labeled
  a "theorem" instead, and why an author might choose one over the
  other.
- **Do not upgrade early**: a learner who still treats these labels as
  signaling different truth-levels (beginner model) should not be
  pushed into authorial-judgment reasoning (advanced model) before the
  "equally proven, differently named" foundation is itself secure.

## Why Students Fail

The dominant failure treats "theorem," "lemma," "proposition," and
"corollary" as a hierarchy of CERTAINTY or RIGOR — assuming a
"theorem" is somehow more solidly established than a "lemma," when in
fact both have met the identical proof standard; the labels distinguish
EXPOSITORY significance and role, not truth-value or rigor. A second,
closely related failure is willing to call a statement a "theorem"
before it has actually been proven, on the strength of strong
supporting evidence or wide belief — directly echoing `math.found.
proof`'s own MC-1 (proof-by-example) at the level of terminology: a
statement supported by extensive but incomplete evidence is a
conjecture, never a theorem, regardless of how confident the
mathematical community is that it will eventually be proven.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "Theorem, lemma, proposition, and corollary form a hierarchy
of certainty" (Type 1, overgeneralization — the terms genuinely differ
in something [significance], and this real difference is
over-generalized into a difference in truth-standard)**
- *Why*: since "theorem" often gets used for the "big," headline
  results and "lemma" for smaller supporting ones, it's natural to
  assume the smaller-sounding term signals less certainty, when in fact
  significance and certainty are entirely independent properties.
- *Symptom*: describing a lemma as "not fully proven yet, just a
  stepping stone," or treating a corollary as somehow less trustworthy
  than the theorem it follows from.
- *Detection probe*: ask the learner whether a lemma used to prove a
  major theorem is proven with the SAME rigor as the theorem itself.
- *Recovery*: "a lemma is fully, completely proven — exactly as
  rigorously as any theorem. The ONLY difference is that a lemma's role
  is to support a larger result, while a theorem is usually considered
  significant in its own right. Neither label says anything about how
  certain or rigorous the proof is — both must be, fully, without
  exception."
- *Verification*: the learner states, unprompted, that a lemma and the
  theorem it supports are equally rigorously proven.

**MC-2 — "A widely-believed but unproven statement can be called a
theorem" (Type 1, overgeneralization from `math.found.proof`'s own
MC-1, proof-by-example, applied here at the terminology level)**
- *Why*: strong supporting evidence (many checked cases, wide
  mathematical consensus) can feel like it should "count" as
  established, especially for statements that have resisted proof for
  a long time despite apparently overwhelming support.
- *Symptom*: calling a well-known open problem (e.g. before its
  eventual proof) a "theorem" because it is widely believed to be true.
- *Detection probe*: ask the learner whether a statement with strong
  but incomplete supporting evidence, not yet proven, should be called
  a theorem.
- *Recovery*: "no — that's a conjecture, by definition, until a
  complete proof exists, no matter how much evidence supports it or how
  confident mathematicians are. The moment a proof is found, and only
  then, it becomes a theorem. Belief and proof are entirely different
  standards."
- *Verification*: the learner correctly labels an unproven-but-
  believed statement as a conjecture, not a theorem, without
  hesitation.

## Analogies

**Primary — job titles versus job performance**: "Theorem," "lemma,"
"proposition," and "corollary" are like different JOB TITLES within an
organization — a "senior" title signals a role's significance, not that
the person holding it works harder or more competently than someone
with a "junior" title; both are fully qualified professionals. Every
labeled result here has fully "qualified" — passed the complete proof
standard — regardless of which title it's given.

**Anti-analogy to retire**: "A lemma is like a rough draft of a
theorem." "Rough draft" implies incompleteness, directly reinforcing
MC-1 by suggesting a lemma is somehow less finished or less rigorous
than a full theorem.

## Demonstrations

**Equally-rigorous lemma-and-theorem pair**: present a genuine
mathematical example where a specific lemma (proven with full rigor) is
then used, by name, as one step within a larger theorem's proof — both
proofs use identical logical standards; the lemma's proof is not
abbreviated or less careful merely because it supports something else.

**Conjecture-vs-theorem contrast**: present a statement that was
famously conjectured (widely believed, extensively checked) for a long
period before eventually being proven — before the proof, correctly
called a conjecture regardless of confidence; after the proof, and only
then, correctly re-labeled a theorem.

## Discovery Questions

Present a real proof that uses a named lemma as one of its steps, and
ask the learner: "was the lemma 'less proven' than the main result, or
just proven for a more narrow purpose?" — guiding discovery of the
role/rigor distinction through direct textual evidence. Recommendation:
guided discovery for the role-versus-rigor distinction (directly
observable in real mathematical exposition); direct instruction for the
conjecture-versus-theorem boundary (MC-2), since it is a precise,
non-negotiable definitional line better stated explicitly.

## Teaching Sequence

MC-1 (labels treated as a certainty hierarchy) is addressed first,
since it concerns the internal structure of already-proven results,
foundational to understanding how proven mathematics is organized. MC-2
(unproven statements mislabeled as theorems) is addressed second, as
the sharper, higher-stakes boundary question — since MC-2 concerns
whether something belongs in the "proven" category AT ALL, it is best
addressed once the learner is fluent with what "proven" organizational
labels even mean.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the equally-
rigorous lemma-and-theorem pair, the primary action targeting MC-1) →
**Error Analysis** (spot the mislabeled conjecture-called-a-theorem,
targeting MC-2) → **Thought Experiment** ("could this corollary have
been labeled a theorem instead? What would that choice signal?"
reinforcing the authorial-judgment framing). **What doesn't fit**: a
survey of famous historical conjectures-turned-theorems — engaging and
motivating but beyond this concept's own compact scope (3 hours,
`understand`-level).

## Voice Teaching Notes

**Register**: Matter-of-fact about the equal-rigor point — state it
directly and repeat it, since MC-1 is a persistent, intuitive-feeling
error that benefits from direct repetition rather than subtle
implication.

**Wait-time**: After introducing a lemma used within a larger proof,
pause and ask whether the lemma is "as proven" as the theorem it
supports — surfaces MC-1 directly.

**Load-bearing sentences**:
- "Lemma, corollary, proposition, theorem — all equally, fully proven.
  The label is about role, never about rigor."
- "No proof, no theorem — no matter how strongly believed."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is an unstated
assumption about relative rigor, assessment should explicitly ask
"is this lemma as rigorously proven as the main theorem?" rather than
only testing terminology recall. Because MC-2's defining signature is
mislabeling an unproven statement, assessment should include at least
one currently-unproven-but-widely-believed example (a genuine open
problem, or a historically resolved one presented at its pre-proof
stage) and require correct "conjecture" labeling.

## Tutor Recovery Strategy

Likeliest utterance: "so a lemma is kind of a mini-theorem, not fully
proven yet?" — the concept-specific smaller question: "is the lemma's
own proof complete, or still in progress?" reframes the confusion from
"lemma means partial" to "lemma is a role label for a fully complete
proof, just one intended to support something else" — directly
isolating MC-1's role-versus-rigor conflation.

## Memory Hooks

**Type**: declarative (the theorem/lemma/proposition/corollary role
taxonomy, plus the non-negotiable proof requirement). Review form: fresh
examples from real mathematical exposition, asking the learner to
identify why a given result received its specific label, keeping the
role-versus-rigor distinction from decaying into a hierarchy assumption.
Interleaving partners: `math.found.proof` (the non-negotiable standard
all four labels equally require) and `math.found.conjecture` (the
sibling entry defining the pre-proof category these labels never
apply to).

## Transfer Connections

- **Near**: `math.found.axiom` (the starting points theorems are
  ultimately built from), `math.found.conjecture` (the pre-proof
  category a statement occupies until it earns theorem status).
- **Far**: scientific hypothesis-versus-established-theory distinctions
  (a loose but instructive parallel: strong support is not the same as
  proof/confirmation, though scientific "theory" and mathematical
  "theorem" use the word very differently and should not be conflated
  carelessly).
- **Real-world**: organizational documentation practices that
  distinguish "draft," "reviewed," and "approved" status — a rough
  parallel to how mathematical exposition signals a result's role
  without ever compromising on the underlying proof requirement.
- **Expert transfer**: the learner, reading unfamiliar mathematical
  exposition, automatically interprets theorem/lemma/proposition/
  corollary labeling as a map of the text's own internal logical
  architecture, never as a rigor signal.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.theorem.md` — stated explicitly per the established
no-Blueprint convention, not omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's KG `parent: null` (a
top-level node, unlike its proof-family siblings which are all children
of `math.found.proof`) is correctly reflected — theorem is a
freestanding concept about mathematical STATEMENTS and their
organizational role, distinct from the proof-family concepts
(direct-proof, proof-by-contradiction, etc.) which are about proof
TECHNIQUES. Estimated hours (3) and mastery threshold (0.8) are
appropriate for a concept whose core content is a single, precisely-
stated terminological and definitional distinction.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
