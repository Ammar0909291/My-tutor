# Direct Proof — `math.found.direct-proof`

## Identity

- **Concept ID**: `math.found.direct-proof` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.proof` (already establishes the
  general justified-chain structure and a fully-worked direct-proof
  example this entry deepens), `math.found.rules-of-inference`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.proof-by-contradiction`,
  `math.found.proof-by-contrapositive`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 6
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node, reusing `math.found.proof`'s own
  Blueprint-grounded treatment by reference where content already
  exists there.
- **Aliases** (from KG): "proof by construction", "constructive proof".

## Learning Objective

The learner can: recognize direct proof as the proof structure that
assumes the hypothesis P and derives the conclusion Q through a forward
chain of justified steps, with no assumption of Q's negation anywhere
in the argument; select direct proof as a strategy when the hypothesis
naturally unpacks (via definitions) into the tools needed to reach the
conclusion; and write a complete, multi-step direct proof for a fresh
claim, citing a justification for every line.

## Core Understanding

A direct proof derives the conclusion directly from the hypothesis
through a chain of logical deductions, without requiring assumptions of
the negation — this is the proof structure `math.found.proof` already
introduces and fully works through (n even ⟹ n² even). What this entry
adds is direct proof's identity AS A NAMED STRATEGY, chosen deliberately
among the alternatives (contradiction, contrapositive, cases): direct
proof is the natural first choice whenever unpacking the hypothesis's
definition hands you, more or less immediately, the algebraic or
logical material the conclusion needs — proving "if n is even, n² is
even" directly works because n=2k substitutes cleanly into n² and
produces exactly the even-form the conclusion requires. Direct proof
does still involve assumptions — it assumes the HYPOTHESIS is true (as
a given, not something to prove) and reasons forward from there; "direct"
describes the FORWARD direction of the reasoning (hypothesis → chain →
conclusion), not an absence of assumptions altogether. A single proof
may need to chain through several intermediate lemmas or prior results,
each cited as its own justification, before reaching the final
conclusion — direct proof is not limited to single-step derivations.

## Mental Models

- **Beginner model — "direct proof means no assumptions at all, just
  pure calculation"**: the learner believes direct proof avoids
  assuming anything, confusing "direct" with "assumption-free." Shelf-
  life warning: this model cannot make sense of the very first step of
  any direct proof, which always assumes the hypothesis.
- **Intermediate model — "direct proof assumes P, then chains forward
  through definitions and prior results to reach Q"**: the learner
  correctly executes forward-chaining proofs from a stated hypothesis,
  but may not yet recognize direct proof as a deliberate STRATEGY
  choice among several available ones. Upgrade trigger: being asked
  why a specific claim is more naturally proved directly than by
  contradiction.
- **Advanced model — "direct proof is chosen when the hypothesis's
  definition unpacks into exactly what the conclusion needs"**: the
  learner recognizes, before writing a single line, whether a claim's
  structure favors direct proof over the alternatives, and can justify
  that strategic choice explicitly. Upgrade trigger: being given a
  claim where direct proof is awkward (e.g. a claim more naturally
  proved by contradiction) and correctly identifying that a different
  strategy would serve better.
- **Do not upgrade early**: a learner who still resists assuming the
  hypothesis (beginner model) should not be pushed into strategy
  selection (advanced model) before basic forward-chaining execution is
  itself fully reliable on single-lemma proofs.

## Why Students Fail

The dominant failure misreads "direct" as "assumption-free," resisting
or omitting the foundational first step (assume the hypothesis P),
since "assuming something" can feel like it undermines the proof's
rigor — when in fact assuming the given hypothesis is both necessary
and entirely legitimate; what direct proof avoids is assuming the
NEGATION of the conclusion, not assuming the hypothesis itself. A
second, independent failure treats any sequence of correct calculations
as automatically constituting a direct proof, omitting the definitional
grounding (citing WHICH definition licenses each algebraic move) that
`math.found.proof`'s own MC-3 (algebra without justification) already
identifies as a general proof-writing failure, here specifically
manifesting as skipped definitional unpacking at the START of the
chain.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "Direct proof means making no assumptions" (Type 3,
notation/language contamination — the word "direct" is read as
"assumption-free" rather than "forward-reasoning")**
- *Why*: "direct" colloquially suggests bypassing intermediate steps or
  assumptions, and this everyday sense is imported into the proof-
  technique name.
- *Symptom*: hesitating to write "assume n is even" as a first step, or
  treating the assumption itself as a logical weakness to apologize
  for.
- *Detection probe*: ask the learner to identify the very first step of
  a direct proof of "if n is even, then n² is even."
- *Recovery*: "direct proof assumes the HYPOTHESIS — that's given,
  not something you're sneaking in. What direct proof avoids is
  assuming the NEGATION of the conclusion, which is what proof by
  contradiction does instead. Every proof assumes something; the
  difference is what."
- *Verification*: the learner confidently states "assume [hypothesis]"
  as step one without hesitation, distinguishing it from assuming the
  conclusion's negation.

**MC-2 — "Definitional grounding is optional if the algebra is
correct" (Type 5, instruction-induced — cited by reference from
`math.found.proof`'s own MC-3, algebra-without-justification, applied
here specifically to the START of a direct-proof chain)**: writing
correct algebraic steps (e.g. n²=4k²=2(2k²)) without first citing the
definition that produced the starting form (n=2k, by definition of
even). Full trigger/root-cause/repair pattern already established in
`math.found.proof`'s Misconceptions section — this entry's own
contribution is MC-1 and MC-3, which that entry does not cover.

**MC-3 — "Any claim should be proved directly first, regardless of
structure" (Type 1, overgeneralization — direct proof is taught first
and becomes the default strategy tried on everything)**
- *Why*: direct proof is the first proof technique most learners
  encounter, and without exposure to the alternatives (contradiction,
  contrapositive, cases), it becomes the only tool reached for,
  regardless of whether the claim's structure actually favors it.
- *Symptom*: attempting a direct proof of a claim that resists forward
  unpacking (e.g. "if n² is even, then n is even" — direct proof from
  n² even doesn't cleanly hand you a form for n), producing a stuck or
  circuitous attempt rather than switching strategy.
- *Detection probe*: present "if n² is even, then n is even" and ask
  the learner to attempt a direct proof, then ask whether another
  strategy might work better.
- *Recovery*: "n² even doesn't directly tell you n=2k for some
  integer k — you'd have to work backward from n² to n, which is
  awkward. Try the CONTRAPOSITIVE instead: if n is NOT even (n is odd),
  show n² is NOT even (n² is odd) — this direction unpacks cleanly from
  n=2k+1."
- *Verification*: the learner, given a claim resistant to direct
  unpacking, proposes trying contrapositive or contradiction instead of
  forcing a direct attempt.

## Analogies

**Primary — following a recipe forward**: A direct proof is like
following a recipe from the listed ingredients (the hypothesis)
straight through to the finished dish (the conclusion) — each step uses
what you already have (definitions, prior results) to produce the next
intermediate state, moving strictly forward, never assuming you've
already got the finished dish to work backward from.

**Anti-analogy to retire**: "Direct proof is the 'honest' proof, and
contradiction is a trick." This framing implies contradiction is
somehow less legitimate, when both are equally rigorous, equally
"honest" proof techniques — the choice between them is strategic, not
a matter of proof integrity.

## Demonstrations

**Reusing `math.found.proof`'s own worked example**: the direct proof
that "if n is even, then n² is even" (n=2k ⟹ n²=4k²=2(2k²) ⟹ n² even)
is not restated in full here — see that entry's Core Understanding and
Demonstrations sections. This entry's own contribution: narrate the
SAME proof while explicitly labeling each move's role — "assume
hypothesis" (step 1), "unpack via definition" (step 2), "algebraic
transformation" (step 3), "recognize the target form" (steps 4-5),
"invoke the definition again to conclude" (step 6) — making the direct-
proof STRUCTURE, not just the specific proof, the object of study.

**Strategy-selection contrast**: present "if n is even, then n² is
even" (direct proof unpacks cleanly) side by side with "if n² is even,
then n is even" (direct proof from n² doesn't unpack cleanly toward n)
— the learner attempts both, discovering the second resists direct
treatment and motivates a strategy switch (to contrapositive, covered
in its own entry).

## Discovery Questions

Present a claim whose hypothesis, once unpacked by definition, hands
the learner almost exactly what's needed for the conclusion (e.g. "if a
and b are both multiples of 5, then a+b is a multiple of 5") and ask the
learner to find a path from hypothesis to conclusion. The forward-
chaining structure emerges naturally before "direct proof" is named.
Recommendation: guided discovery for the forward-chaining structure
itself (a natural extension of the informal reasoning already present
in everyday problem-solving); direct instruction for the MC-1
correction (assumption legitimacy) and the strategy-selection judgment
(MC-3), since both require explicit contrast with alternatives not yet
covered.

## Teaching Sequence

MC-1 (assumption resistance) is addressed first, since it blocks even
the first line of any direct proof attempt. MC-2 (definitional grounding
skipped) is addressed second, re-anchoring `math.found.proof`'s own
existing repair, applied specifically to the chain's starting point.
MC-3 (direct proof over-applied regardless of structure) is addressed
last, since strategic judgment about WHEN to use direct proof is only
meaningful once the technique itself is executed reliably.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the labeled-
structure re-narration of `math.found.proof`'s own example, the primary
action targeting MC-1) → **Error Analysis** (spot the missing
definitional citation, targeting MC-2) → **Thought Experiment** (the
strategy-selection contrast between the two related claims, targeting
MC-3). **What doesn't fit**: a full catalog of every proof strategy —
that comparative treatment belongs collectively to this entry's sibling
concepts (`proof-by-contradiction`, `proof-by-contrapositive`,
`proof-by-cases`), each authored to stand on its own with cross-
references, not duplicated here.

## Voice Teaching Notes

**Register**: Forward-moving and confident — narrate direct proofs with
directional language ("and THEN," "which GIVES us," "so NOW we have")
to reinforce the forward-chaining structure.

**Wait-time**: After stating the hypothesis, pause before unpacking its
definition — let the learner attempt the unpacking themselves.

**Load-bearing sentences**:
- "Direct proof assumes the hypothesis — that's given, not smuggled
  in."
- "What direct proof avoids is assuming the conclusion's negation —
  that's a different technique."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is hesitation at
the FIRST line of a proof rather than a wrong final answer, assessment
should specifically ask the learner to state and justify their opening
assumption before proceeding, not just evaluate the completed proof.
Because MC-3's defining signature is forcing an unsuitable strategy,
assessment should include at least one item where direct proof is
genuinely awkward, to see whether the learner recognizes the mismatch.

## Tutor Recovery Strategy

Likeliest utterance: "but doesn't assuming n is even mean I'm just
assuming what I want?" — the concept-specific smaller question: "is 'n
is even' something you're trying to PROVE, or something you're GIVEN as
true?" reframes the confusion from "assuming anything undermines the
proof" to "the hypothesis is a legitimate starting point, given by the
claim itself" — directly isolating MC-1's conflation of hypothesis-
assumption with conclusion-assumption.

## Memory Hooks

**Type**: procedural (forward-chaining construction, directly reusing
`math.found.proof`'s own justified-step-chain skill). Review form: fresh
claims requiring the learner to FIRST judge whether direct proof suits
the structure, THEN execute it, keeping MC-3's strategic judgment
active rather than defaulting automatically. Interleaving partners:
`math.found.proof` (the general chain structure this entry names as a
strategy) and, once authored, `math.found.proof-by-contrapositive` (the
most common alternative when direct proof resists).

## Transfer Connections

- **Near**: `math.found.proof-by-contradiction`, `math.found.proof-by-
  contrapositive`, `math.found.proof-by-cases` — the sibling strategies
  this entry's own MC-3 motivates choosing between.
- **Far**: constructive mathematics and type theory, where "direct"
  (constructive) proofs carry additional computational content beyond
  mere truth, a distinction this concept's own KG alias ("constructive
  proof") gestures toward without developing.
- **Real-world**: any step-by-step justified argument in law,
  engineering, or policy analysis that reasons forward from agreed
  premises to a conclusion.
- **Expert transfer**: the learner, facing an unfamiliar claim to prove,
  automatically checks whether the hypothesis's definition unpacks
  cleanly toward the conclusion before committing to a direct-proof
  attempt.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.direct-proof.md` — stated explicitly per the established
no-Blueprint convention, not omitted. This entry reuses `math.found.
proof`'s own Blueprint-grounded direct-proof worked example (TA-A02 of
that Blueprint) by reference, adding this entry's own strategy-
selection framing and misconceptions not covered there.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate
— direct proof is a named strategy consumed conceptually by later
proof work without being a formal prerequisite edge elsewhere in
math.found. Estimated hours (6) and mastery threshold (0.75) match
`math.found.proof`'s own values, appropriately reflecting this
concept's status as a focused specialization of that already-
substantial parent concept.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; all three misconceptions authored directly via the birth-taxonomy diagnostic procedure; core worked example reused by reference from `math.found.proof`, not restated. |
