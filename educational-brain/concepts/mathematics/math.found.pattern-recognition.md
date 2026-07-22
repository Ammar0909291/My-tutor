# Pattern Recognition — `math.found.pattern-recognition`

## Identity

- **Concept ID**: `math.found.pattern-recognition` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.mathematical-thinking` — the
  load-bearing part is the "Notice" move specifically; pattern
  recognition is that single move (Notice) developed into a full,
  systematic process (observe → conjecture a rule → verify → predict),
  not a new disposition on top of it.
- **Unlocks** (from KG/Blueprint): `math.found.generalization`,
  `math.seq.arithmetic-sequence`, `math.arith.counting` — generalization
  is literally the act of stating a pattern's rule for all cases;
  arithmetic sequences are patterns with a specific, named structure.
- **Difficulty**: foundational · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 5

## Learning Objective

The learner can: apply a 4-step pattern-recognition process (observe
instances → propose a rule → verify on unseen instances → predict well
beyond the given examples) to numerical, geometric, and logical
sequences; state a rule in both recursive and closed forms where
possible; recognize that a finite set of initial terms can be generated
by more than one rule; and detect structural patterns outside pure
number lists, including combinatorial contexts. A learner who correctly
guesses the next term of a familiar sequence without stating the
underlying rule has not achieved mastery.

## Core Understanding

Pattern recognition is the systematic search for a rule that explains
every given instance and predicts unseen ones — it is not the same as
noticing that something repeats, and it is not complete until the rule
is STATED, not merely sensed. Critically, a finite list of terms never
uniquely determines a single "correct" pattern: 1, 2, 4 could continue
8, 16, 32 (doubling) or 7, 11, 16 (add one more each time) or infinitely
many other rules — mathematical pattern recognition therefore always
carries the implicit qualifier "the SIMPLEST rule consistent with the
data," and mastery includes knowing that qualifier is there, not
believing the pattern is a fact waiting to be discovered.

## Mental Models

- **Beginner model — "what comes next"**: pattern recognition means
  correctly guessing the next term by noticing what changed between
  consecutive terms. Runnable and useful for simple arithmetic
  sequences. Shelf-life warning: "guessing the next number is a great
  start — soon we'll also ask WHY, and whether there's more than one
  right answer."
- **Intermediate model — "a rule that generates every term"**: the
  learner states an explicit rule (recursive: "add 4 to the previous
  term"; or closed-form: "4n − 3") rather than only predicting the
  immediate next value. Upgrade trigger: asked to predict a term far
  beyond the given list (e.g. the 50th term) — pure "what comes next"
  guessing cannot answer this; a stated rule can.
- **Advanced model — "patterns are underdetermined by finite data"**:
  the learner actively considers that more than one rule fits the same
  finite terms, and treats "the" pattern as a claim about the simplest
  consistent rule, not a fact.
- **Expert model — "structural pattern recognition across domains"**: the
  learner detects the same kind of regularity in geometric arrangements,
  logical sequences, and combinatorial counts (e.g. recognizing Pascal's
  triangle's row-sum doubling as the same kind of pattern as an
  arithmetic sequence's constant difference), not only in lists of
  numbers.
- **Do not upgrade early**: a learner still unreliable at stating even
  one explicit rule for a simple numeric sequence should not be pushed
  into combinatorial or logical pattern detection — the Blueprint's own
  CPA-C (concrete) entry stage and 7-TA Protocol A session cap reflect a
  deliberately paced build from concrete sequences to structural
  transfer.

## Why Students Fail

Two distinct failure mechanisms, both address in the Blueprint's
Misconception Registry: first, many learners treat pattern recognition
as recall — they memorize that "this specific sequence continues this
specific way" rather than extracting a portable rule, so a superficially
similar but numerically different sequence defeats them completely.
Second, learners who have only ever seen pattern-recognition exercises
with one "correct" answer key conclude that every sequence has exactly
one true pattern, and become confused or resistant when shown that
1, 2, 4 legitimately admits multiple valid continuations — the exercise
format itself (single expected answer) trains a false certainty the
mathematics doesn't actually have.

## Misconceptions

Reused from the Blueprint's Component 3 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "Pattern = memorization" (Type 1, overgeneralization from
  drilled sequence-completion exercises that never required stating a
  rule)**: MAMR-foundational — a learner who treats pattern recognition
  as recall will never extract a structural rule, making MC-2/MC-3
  repair inaccessible. Full content: Blueprint Component 3, MC-1.
- **MC-2 — "One sequence, one pattern" (Type 5, instruction-induced —
  answer-key-driven exercises that present exactly one accepted
  continuation)**: full content: Blueprint Component 3, MC-2.
- **MC-3 — "Patterns only exist in number lists" (Type 1,
  overgeneralization — correctly learned pattern-spotting in arithmetic,
  never extended to geometric/logical/combinatorial contexts)**: full
  content: Blueprint Component 3, MC-3.

## Analogies

- **Best analogy — the "what comes next" puzzle has more than one honest
  answer**: two people can both legitimately continue 1, 2, 4 differently
  (doubling vs. adding-one-more) and both be doing real mathematics, the
  same way two witnesses can both accurately describe different true
  aspects of the same event. Breaking point: unlike witness testimony,
  mathematical rules can be RANKED by simplicity (Occam's-razor-style),
  so "more than one answer" doesn't mean "anything goes" — must be
  paired with the simplest-consistent-rule qualifier.
- **Alternative — a detective's working theory**: a pattern rule is a
  working theory consistent with the evidence so far, always open to
  revision by a new instance that breaks it (a genuine counterexample).
  Breaking point: over-applied, this can make a learner distrust every
  pattern permanently rather than trusting a well-tested one
  provisionally.
- **ANTI-ANALOGY — do NOT say "finding a pattern is like solving a
  puzzle with one right answer"**: this directly installs MC-2. Even
  though "puzzle" framing is natural and often used to motivate pattern
  tasks, the "one right answer" framing must never be paired with it at
  this concept.

## Demonstrations

- **Concrete/predict-first**: a numeric sequence (e.g. 1, 4, 9, 16 —
  perfect squares) with the learner asked to predict the 5th and 10th
  terms before being shown the rule.
- **Multiple-rules demonstration**: presenting 1, 2, 4 and eliciting at
  least two distinct, both-correct continuations from the learner (or
  offering a second one if the learner only proposes doubling) — the
  single most direct way to defeat MC-2 experientially rather than by
  assertion.
- **Cross-domain demonstration**: a geometric pattern (e.g. the number of
  regions created by adding chords to a circle) alongside a numeric one
  with the same growth structure, to defeat MC-3.

## Discovery Questions

**Need** — "what's the next number after 1, 4, 9, 16?" **Playground** —
the learner tries differences (3, 5, 7 — themselves an arithmetic
pattern) or direct recognition (perfect squares). **Invention** — the
learner proposes 25 with a stated reason. **Collision** — offered a
DIFFERENT valid continuation for a shorter, more ambiguous sequence
(1, 2, 4), the learner's assumption of a single correct answer breaks.
**Formalization** — naming the rule explicitly in both recursive and
closed forms, and naming the "simplest consistent rule" qualifier.
**Compression** — immediate application to a fresh sequence with a
similarly ambiguous short prefix.

## Teaching Sequence

Simple, single-valid-rule sequences must be secure before ambiguous,
multiple-valid-rule sequences are introduced — a learner who cannot yet
reliably state one explicit rule for 1, 4, 9, 16 will not productively
engage with "1, 2, 4 has more than one honest continuation"; the
ambiguity lesson requires a secure baseline to be surprising rather than
confusing. Cross-domain pattern detection (geometric, logical,
combinatorial) is deliberately sequenced AFTER numeric fluency, per the
Blueprint's CPA-C entry stage and MC-3's own repair design (Component 3),
since MC-3 (patterns only in number lists) can only be productively
confronted once the learner has a working numeric pattern-recognition
process to extend.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (predict-first on a
concrete numeric sequence) → **Prediction** (attached throughout) →
**Thought Experiment** (multiple-valid-continuations for 1, 2, 4) →
**Classification/Sorting** (numeric vs. geometric vs. logical pattern
instances) → **Worked Example** (recursive-vs-closed-form derivation).
**What doesn't fit**: pure drill-style "complete the sequence" exercises
as a primary teaching move — these are exactly the format that produces
MC-1 and MC-2 in the first place; useful only as diagnostic probes, never
as the core instructional activity.

## Voice Teaching Notes

Listen for a learner stating a next-term prediction with no accompanying
reason ("it's just 25") — this is MC-1's signature (recall without a
rule), distinguishable from a learner who states "25, because it's
n-squared" (rule-based). A confident, fast, unqualified "the pattern is
X" on an ambiguous short sequence (like 1, 2, 4) is the strongest MC-2
signal — the D1 grid's dangerous quadrant applies directly here.

## Assessment Signals

The Blueprint's own diagnostic and mastery-gate items are the concrete
item bank — not re-authored here. Diagnostic interpretation this entry
adds: a learner who correctly states a rule but cannot verify it on an
UNSEEN instance (only re-confirms it on the given terms) has extracted a
plausible-looking rule without genuinely testing it — this is a distinct,
narrower gap than MC-1 (no rule at all) and should route to a
verification-specific follow-up ("does your rule also work for the
7th term?"), not a full misconception repair.

## Tutor Recovery Strategy

Likeliest utterance: "I don't see a pattern" on a sequence the learner
has stared at without a systematic method — the concept-specific smaller
question: "just look at ONE pair — how did we get from the first term to
the second?" — shrinks pattern-hunting to a single, checkable step rather
than demanding the whole rule at once.

## Memory Hooks

**Type**: concept with an embedded procedural skill (the 4-step
observe-propose-verify-predict cycle, which benefits from repeated
practice to become fluent rather than effortful). Review form: fresh
sequences of increasing structural variety (arithmetic → geometric →
logical → combinatorial), matching the Blueprint's own domain-spanning
scope. Interleaving partners: `math.found.abstraction` (pattern
recognition finds the regularity; abstraction states what's essential
about it — practice items that require the learner to say which of the
two they just did prevent the concepts blurring together).

## Transfer Connections

- **Near**: a fresh numeric sequence requiring the same 4-step process.
- **Far**: geometric growth patterns (e.g. regions formed by chords in a
  circle) and logical/combinatorial regularities (Pascal's triangle row
  structure).
- **Real-world**: noticing a regularity in a non-mathematical routine
  (e.g. a recurring schedule) and testing whether it's exact or
  coincidental.
- **Expert transfer**: the learner spontaneously proposes MORE THAN ONE
  candidate rule for an ambiguous short sequence unprompted, and ranks
  them by simplicity — direct evidence MC-2 (one sequence, one pattern)
  has been replaced, not merely suppressed.

## Cross-Subject Connections

Via KG `cross_links`: `math.disc.combinatorics` — the Blueprint's own
scope explicitly includes combinatorial pattern detection (e.g. Pascal's
triangle structure) as part of mastery, matching this cross-link
directly. No non-mathematics cross-subject connection is KG-encoded for
this node; not fabricated here.

## Blueprint References

`docs/curriculum/blueprints/math.found.pattern-recognition.md` — read in
full (Components 0-9). This entry reuses by reference the Student State
Protocol library, the Misconception Registry (MC-1–MC-3), and the
mastery-gate structure; it does not restate the Blueprint's specific
worked sequences or P49 checkpoint JSON.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept as of this entry's authoring — this entry does
not create any.

## Curriculum Feedback

None found. The KG's single prerequisite and three-item unlocks list
match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program, math.found
  domain batch 1). Anchored to the live KG node and the existing
  Blueprint; all 3 misconceptions reused by reference.
