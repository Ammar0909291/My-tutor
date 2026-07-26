# Writing Mathematics — `math.found.writing-mathematics`

## Identity

- **Concept ID**: `math.found.writing-mathematics` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.reading-mathematics`, `math.found.proof`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.reading-mathematics`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.7 · **Est. hours**: 8
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Aliases** (from KG): "mathematical writing", "proof writing style".

## Learning Objective

The learner can: write mathematical arguments using complete sentences
and connective prose, not bare symbol strings, so a human reader can
follow the logical flow without reconstructing it; use symbolic
notation where it genuinely aids precision and prose where it aids
readability, choosing deliberately rather than defaulting to either
extreme; and state quantifiers, hypotheses, and logical connectives
EXPLICITLY rather than relying on the reader to infer them from
context.

## Core Understanding

Writing mathematics is the craft of expressing mathematical reasoning
clearly, precisely, and in standard notation, balancing rigor with
readability. A mathematical proof is not merely a sequence of true
symbolic statements — it is a piece of WRITING intended to convince and
inform a human reader, and every step `math.found.proof` already
requires to be individually justified must also be COMMUNICATED clearly
enough that the justification is actually legible to that reader. Good
mathematical writing uses complete sentences connecting each step to
the next ("since n=2k, it follows that..." rather than a bare
equation), states quantifiers and hypotheses explicitly rather than
leaving them implicit ("for every integer n" rather than assuming the
reader infers the domain), and chooses between symbolic notation and
prose deliberately: symbols excel at precision for compact algebraic or
logical relationships, while prose excels at conveying the REASONING
connecting those relationships — neither should dominate to the
exclusion of the other. The craft is genuinely a BALANCE: over-
symbolizing produces a technically-correct but unreadable wall of
notation; under-symbolizing produces vague, imprecise prose that fails
to pin down exactly what is being claimed.

## Mental Models

- **Beginner model — "more symbols and notation means more rigorous and
  more mathematical"**: the learner believes maximizing symbolic
  density demonstrates mastery, avoiding prose wherever a symbol could
  substitute. Shelf-life warning: this model produces proofs that are
  technically parseable but genuinely unreadable, and readers (including
  graders) frequently cannot verify correctness without unreasonable
  effort.
- **Intermediate model — "connect steps with prose, use symbols for
  compact relationships, and state quantifiers explicitly"**: the
  learner produces genuinely readable proofs balancing prose and
  notation, but may still occasionally omit a quantifier or hypothesis
  the reader is expected to infer. Upgrade trigger: being asked to
  identify, in their own writing, any place a reader would need to
  guess an unstated assumption.
- **Advanced model — "writing is a deliberate craft serving the reader,
  and every logical element (quantifiers, hypotheses, connectives) is
  stated, never assumed"**: the learner writes with the reader's
  verification burden explicitly in mind, leaving no logical step to
  inference. Upgrade trigger: being asked to rewrite a dense, symbol-
  heavy proof into a genuinely readable one without losing any rigor.
- **Do not upgrade early**: a learner who still over-symbolizes
  (beginner model) should not be pushed into advanced reader-awareness
  judgments (advanced model) before basic prose-connective habits are
  themselves reliable.

## Why Students Fail

The dominant failure believes that maximizing symbolic notation
demonstrates greater mathematical sophistication, producing proofs that
chain equations and symbols with no connecting prose explaining WHY one
step follows from the previous — directly compounding `math.found.
proof`'s own MC-3 (algebra without justification) at the level of
WRITING STYLE rather than logical content. A second, independent
failure omits quantifiers, hypotheses, or logical connectives that the
writer considers "obvious from context," leaving the reader to infer
critical logical structure — a habit that works fine for the WRITER
(who already knows what they mean) but fails the READER, who cannot
verify an argument whose logical scaffolding is left unstated.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "More symbols means more rigorous" (Type 1, overgeneralization
— symbolic notation genuinely IS more precise in some contexts, over-
extended to mean it's always preferable)**
- *Why*: symbolic notation IS more precise than prose for certain
  compact relationships, and this genuine advantage is over-generalized
  into "symbols are always better," ignoring that rigor lives in the
  LOGICAL VALIDITY of an argument, not in how densely it's symbolized.
- *Symptom*: writing an entire proof as a chain of symbolic equations
  and inequalities with no connecting sentences, leaving the reader to
  reconstruct why each line follows from the last.
- *Detection probe*: present a symbol-only proof fragment and ask
  another learner (or the author themselves, after a delay) to explain
  what justifies the third line.
- *Recovery*: "rigor comes from every step being logically justified —
  which a reader needs to be able to VERIFY. A wall of symbols with no
  connecting reasoning is not more rigorous, it's less legible, even if
  every individual symbol is correct. Add the sentence explaining WHY."
- *Verification*: the learner's own proof includes a connecting
  sentence or phrase for every non-trivial logical step, not just
  correct symbols.

**MC-2 — "Quantifiers and hypotheses can be left implicit if they're
obvious" (Type 5, instruction-induced — many worked examples in
textbooks compress notation once an audience is assumed expert, and
students imitate the compression without imitating the audience
assumption)**
- *Why*: expert mathematical writing sometimes DOES compress notation
  for an expert audience who can reliably fill gaps — students imitate
  the compressed SURFACE FORM without recognizing this relies on shared
  context they, as learners, do not yet have with their own readers
  (graders, peers).
- *Symptom*: writing "for n even, n² is even" without stating the
  universal quantifier ("for every integer n that is even..."), or
  omitting the domain a variable ranges over.
- *Detection probe*: present the learner's own proof and ask them to
  point out exactly which values of n the claim is meant to cover.
- *Recovery*: "state the quantifier explicitly, every time, even when
  it feels obvious: 'for every integer n such that n is even.' Your
  reader is not you — they don't already know what you mean; the
  writing has to carry that information completely."
- *Verification*: the learner's own proofs consistently state
  quantifiers and variable domains explicitly, without omission.

## Analogies

**Primary — writing a recipe for a stranger**: A recipe written only in
shorthand ("2c flr, 1t s, bake 350") assumes the cook already knows
what's being made and why each step matters. A recipe written for a
genuine beginner spells out quantities, explains WHY each step matters
("fold gently to keep air in the batter"), and never assumes unstated
context. Mathematical writing is the same: write for a reader who
doesn't already know your intended argument, not for yourself.

**Anti-analogy to retire**: "Good mathematical writing is as compressed
as possible." Compression optimizes for the WRITER's effort, not the
READER's — good writing optimizes for the reader's ability to verify
the argument, which sometimes requires MORE words, not fewer.

## Demonstrations

**Over-symbolized vs. readable rewrite**: present a proof fragment
written as bare symbolic chains, then rewrite it with connecting prose
("since n=2k for some integer k, substituting gives n²=4k²=2(2k²), and
since 2k² is itself an integer, n² is even by definition") — the
logical content is IDENTICAL, but the readable version's reasoning is
now legible without reconstruction.

**Quantifier-omission repair**: present "n even implies n² even"
(implicit quantifier) alongside "for every integer n, if n is even,
then n² is even" (explicit) — both are ABOUT the same mathematical
fact, but only the second fully specifies the claim being made without
requiring the reader to guess the intended domain.

## Discovery Questions

Present a symbol-heavy proof fragment to the learner and, after a
delay, ask them to explain a middle step without looking back at their
own reasoning — the difficulty of reconstruction (even for the
original author) surfaces MC-1's cost directly. Recommendation: guided
discovery for the reader's-verification-burden insight (directly
experiential via the delayed self-explanation exercise); direct
instruction for the specific quantifier-explicitness habit (MC-2),
since it is a precise stylistic rule better stated than independently
discovered.

## Teaching Sequence

MC-1 (over-symbolization) is addressed first, since it is the more
consequential failure — an unreadable proof fails its communicative
purpose regardless of correctness. MC-2 (implicit quantifiers) is
addressed second, as a more specific, checkable habit that becomes
relevant once the general prose-balance principle is established.

## Tutor Actions

From `../../teaching-actions/`: **Error Analysis** (the delayed self-
explanation exercise on the learner's own symbol-heavy writing, the
primary action targeting MC-1) → **Worked Example** (the over-
symbolized-vs-readable side-by-side rewrite) → **Drill** (rewriting
implicit-quantifier claims into fully explicit form, targeting MC-2).
**What doesn't fit**: a full style guide covering notation conventions
across different mathematical subfields — this concept's scope is the
underlying craft principles (readability, explicitness), not a
comprehensive reference of field-specific notational conventions.

## Voice Teaching Notes

**Register**: Reader-centered — consistently ask "would a reader who
doesn't already know your argument follow this?" rather than "is this
technically correct?"

**Wait-time**: After the learner writes a proof step, pause and ask
them to read it aloud as if explaining to someone unfamiliar with the
problem — this alone often surfaces MC-1 and MC-2 without further
prompting.

**Load-bearing sentences**:
- "Write for a reader who doesn't already know what you mean."
- "State the quantifier every time — 'obvious' to you is not obvious to
  your reader."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is technically-
correct-but-unreadable writing rather than a wrong answer, assessment
should have a second person (peer or tutor) attempt to follow the
learner's own proof and flag any step requiring reconstruction. Because
MC-2's defining signature is an omission rather than an error,
assessment should specifically check for explicit quantifiers and
domain statements, not just correct final claims.

## Tutor Recovery Strategy

Likeliest utterance: "but the math is right, isn't that enough?" — the
concept-specific smaller question: "could someone who's never seen this
problem before follow your reasoning from what's written, without
guessing?" reframes the confusion from "correctness is sufficient" to
"correctness plus legibility is the actual goal of mathematical
writing" — directly isolating MC-1's writer-centered (rather than
reader-centered) standard.

## Memory Hooks

**Type**: procedural (a writing-craft habit — connecting prose,
explicit quantifiers — directly applied on top of `math.found.proof`'s
own logical-content requirements). Review form: fresh proofs the
learner writes and then re-reads as an unfamiliar reader would, keeping
both MC-1 and MC-2's guard-rails active through repeated self-review
practice. Interleaving partners: `math.found.reading-mathematics` (the
paired receptive skill) and `math.found.proof` (the logical content
this concept's writing craft serves).

## Transfer Connections

- **Near**: `math.found.reading-mathematics` (writing and reading
  mathematics are closely paired skills — writing FOR a reader requires
  understanding what makes mathematical text readable in the first
  place).
- **Far**: technical writing generally (documentation, scientific
  papers) shares this concept's core tension between precision and
  readability; legal drafting similarly must state scope and conditions
  explicitly rather than relying on inferred context.
- **Real-world**: writing clear instructions, explanations, or
  arguments for any audience that doesn't share the writer's full
  context.
- **Expert transfer**: the learner, writing any technical argument,
  automatically checks whether an unfamiliar reader could follow it
  without reconstruction, applying this concept's reader-centered
  standard beyond mathematics specifically.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.writing-mathematics.md` — stated explicitly per the
established no-Blueprint convention, not omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (8) and the notably lower mastery threshold (0.7,
compared to 0.75-0.85 for this program's other proof-family concepts)
appropriately reflect this concept's nature as a genuinely open-ended
craft skill rather than a binary correct/incorrect procedure — writing
quality admits gradation in a way logical validity does not.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; both misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
