# Problem-Solving Strategies — `math.found.problem-solving-strategies`

## Identity

- **Concept ID**: `math.found.problem-solving-strategies` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.problem-solving` — the load-bearing
  part is the entire prior concept: the four named strategies (working
  backwards, drawing a diagram, reducing to a simpler case, systematic
  trial) and, especially, the strategy-selection skill. This concept is
  explicitly the EXPANSION of that repertoire to a wider set of named
  heuristics (per its KG description: "drawing diagrams, working
  backwards, finding a simpler related problem, looking for symmetry,
  and exhaustive case analysis") — some heuristics repeat by name from
  the prerequisite, and the new ones (symmetry-seeking, extended
  exhaustive case analysis) build directly on the selection judgment
  already established there.
- **Unlocks**: none directly in the KG (`unlocks: []`), but `related:
  math.found.proof` — a rich strategy repertoire is what a learner draws
  on when facing an unfamiliar problem that will eventually require
  proof, before any formal proof technique is available.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery threshold**:
  0.70 · **Est. hours**: 6
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.
- **Relationship to `math.found.problem-solving`**: this is the direct
  sequel concept, not a duplicate — the prerequisite concept establishes
  FOUR specific strategies and the selection judgment between them; this
  concept expands the REPERTOIRE (adding symmetry-seeking and a deeper
  treatment of systematic/exhaustive case analysis) and shifts the
  target from "execute a named strategy correctly" (bloom: apply, shared
  with the prerequisite) to a broader fluency across a larger toolkit —
  consistent with its position as `math.found.problem-solving`'s KG
  `parent`.

## Learning Objective

The learner can: apply symmetry-seeking (recognizing and exploiting a
problem's inherent symmetry to reduce the work required, or to rule out
certain cases) as a distinct strategy alongside the four already known;
apply exhaustive case analysis rigorously (partitioning a problem into a
provably complete set of cases and checking each, as opposed to the
narrower "systematic trial" of searching among candidate answers); and —
consistent with the prerequisite concept's own core skill — select the
best-fitting strategy or combination from the now-larger repertoire for
a genuinely novel problem.

## Core Understanding

This concept is the second stage of a two-stage repertoire-building arc:
`math.found.problem-solving` establishes four core strategies and the
foundational skill of choosing between them; this concept extends the
toolkit with symmetry-seeking (spotting a structural symmetry in a
problem that lets one part of the reasoning stand in for several) and
deepens exhaustive case analysis (requiring the cases considered to be
PROVABLY complete — covering every possibility with no gaps — rather
than merely "checking several plausible candidates," which is
systematic trial's weaker standard). A learner with a larger strategy
repertoire faces a correspondingly harder selection problem: more tools
means the selection judgment itself must become more discriminating, not
just the execution of each individual tool.

## Mental Models

- **Beginner model — "more strategies to try when stuck"**: the learner
  treats symmetry-seeking and exhaustive case analysis as additional
  items to attempt if the original four don't work, without a clear
  sense of which SHAPE of problem calls for which addition. Shelf-life
  warning: "these two new tools aren't backup options for when the first
  four fail — they fit specific problem shapes just as precisely as the
  first four did."
- **Intermediate model — "symmetry reduces work; exhaustive analysis
  requires provable completeness"**: the learner can execute both new
  strategies correctly when told which to use, and specifically
  understands that exhaustive case analysis is a STRONGER standard than
  systematic trial (every case, provably, not just several plausible
  ones). Upgrade trigger: a problem where an incomplete case analysis
  (missing a case) produces a wrong conclusion, revealing that
  "I checked several cases" and "I checked ALL the cases, provably" are
  different claims.
- **Advanced model — "a six-tool selection judgment"**: the learner
  selects the best-fitting strategy (or combination) from the full
  six-item repertoire (the original four plus symmetry-seeking and
  rigorous exhaustive analysis) for a genuinely novel problem, without
  being told which category of strategy to use.
- **Expert model — "strategies compound and a completeness argument is
  itself checkable"**: the learner combines multiple strategies within
  one solution AND can explicitly justify why a given case analysis is
  complete (e.g. "these three cases cover all possibilities because
  every integer is either negative, zero, or positive") rather than
  merely asserting completeness.
- **Do not upgrade early**: a learner who cannot yet execute symmetry-
  seeking or rigorous exhaustive analysis correctly in isolation
  (intermediate model not secure) should not be pushed into six-way
  selection practice (advanced model) — matching the same ordering
  discipline `math.found.problem-solving`'s own Teaching Sequence
  established for its four-strategy repertoire.

## Why Students Fail

Two distinct failure modes, extending the pattern already identified for
the prerequisite concept. First, "exhaustive case analysis" is
frequently confused with the WEAKER standard of "checking several
plausible cases" (systematic trial) — a learner who has successfully
used systematic trial before assumes checking a handful of cases counts
as exhaustive, without verifying that the cases considered actually
cover every logical possibility, producing conclusions that silently
depend on an incomplete case split. Second, symmetry-seeking is
frequently invisible to learners who have not been trained to actively
look for it — unlike the other strategies, which have an obvious
"trigger" (a clear end state suggests working backwards; a bounded
candidate set suggests trial), symmetry must often be actively sought
and recognized rather than being announced by the problem's surface
structure, so learners simply never consider it as an option.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet:

**MC-1 — "Checking several representative cases is the same as
exhaustive case analysis" (Type 1, overgeneralization from
`math.found.problem-solving`'s systematic trial, a genuinely successful
but weaker standard, extended past where it holds)**
- *Why*: systematic trial (checking candidates in an organized way) and
  exhaustive case analysis (proving every possibility is covered) look
  similar on the surface — both involve checking multiple cases in an
  organized manner — but only the latter requires a PROOF of
  completeness.
- *Symptom / phrase*: "I checked the main cases and they all worked, so
  it's true," without stating why those cases are ALL the cases.
- *Detection probe*: "How do you know these are ALL the possible cases —
  could there be one you haven't considered?"
- *Recovery*: present a problem where an incomplete case split (e.g.
  considering only "positive and negative" while forgetting "zero")
  produces a wrong or incomplete conclusion, making the gap concrete and
  consequential rather than abstract.
- *Verification*: given a fresh problem, the learner explicitly states
  WHY their case split is complete (e.g. "every integer is negative,
  zero, or positive — no other possibility exists") before proceeding,
  unprompted.

**MC-2 — "Symmetry-seeking isn't a real strategy, just noticing
something nice" (Type 2, perceptual — symmetry, when spotted, feels like
an aesthetic observation rather than a deliberate, targetable
problem-solving move, because the learner has never been shown it
DELIBERATELY sought out rather than stumbled upon)**
- *Why*: the other four/five strategies have clear procedural triggers a
  learner can deliberately apply; symmetry-seeking requires an active,
  trained habit of asking "does this problem have a symmetry I could
  exploit?" which nothing in the problem statement explicitly announces.
- *Symptom*: a learner solves a symmetric problem the "hard way" (full
  case-by-case work) even when a much shorter symmetry-based argument
  was available, and doesn't recognize the missed opportunity even when
  shown it afterward.
- *Detection probe*: presented with a problem exhibiting an obvious
  symmetry (e.g. summing $1+2+\dots+100$ via first+last pairing), ask
  "before solving, does anything about this problem's STRUCTURE look
  balanced or repeated?"
- *Recovery*: explicitly teach the trigger question ("does this problem
  look the same from more than one angle — could I pair, reflect, or
  relabel parts of it?") as a deliberate first-pass check, the same way
  "is there a clear end state?" is the trigger question for working
  backwards.
- *Verification*: given a fresh problem with exploitable symmetry, the
  learner asks the trigger question unprompted and finds the shorter
  argument.

## Analogies

- **Best analogy — a complete alibi vs. a plausible one** (for
  exhaustive case analysis vs. systematic trial): a detective who checks
  the three most likely suspects and finds no evidence against them has
  NOT proven the case is unsolvable — only a genuinely exhaustive
  elimination of every possible suspect would. Breaking point: real
  investigations rarely achieve true exhaustiveness; mathematical case
  analysis, on a genuinely finite or well-partitioned problem, CAN and
  must.
- **Alternative — folding a paper in half to solve half the problem**
  (for symmetry-seeking): if a shape or arrangement is symmetric,
  solving (or understanding) HALF of it, by the fold line, tells you the
  other half for free — a physical, tangible instance of the strategy.
  Breaking point: not every symmetric problem literally involves a
  fold-able physical object; the strategy generalizes to relabeling,
  pairing, and other symmetry types beyond literal reflection.
- **ANTI-ANALOGY — do NOT say "exhaustive case analysis just means
  trying a lot of cases"**: "a lot" is precisely the standard MC-1
  mistakes for the actual requirement (a PROVABLY complete set,
  regardless of how many or few cases that turns out to be — sometimes
  as few as two or three, if they're proven exhaustive).

## Demonstrations

- **The incomplete-case-split demonstration**: a problem solved via a
  case split that silently omits a case (e.g. forgetting "zero" when
  splitting integers into positive/negative), producing a visibly wrong
  or incomplete conclusion when the missing case is revealed — the
  canonical MC-1 collision.
- **The Gauss pairing demonstration** (a canonical symmetry example):
  summing $1+2+\dots+100$ the hard way (direct addition) alongside the
  first-plus-last pairing shortcut ($1+100=101$, $2+99=101$, ...,
  yielding $50\times101$), making the time saved by symmetry-seeking
  vivid — the canonical MC-2 collision.
- **Trigger-question practice**: a set of problem statements, some
  symmetric and some not, with the learner asked to state the trigger
  question's answer BEFORE attempting to solve, building the habit
  MC-2's repair targets.

## Discovery Questions

**Need** — given a problem seemingly requiring 100 individual additions
(the Gauss sum), the learner is asked if there's a faster way before
starting. **Playground** — the learner examines the list of numbers
1 through 100 for any noticeable structure. **Invention** — the learner
(with scaffolding if needed) proposes pairing the first and last
numbers. **Collision** — computing a few pairs (1+100, 2+99) reveals
each pair sums to the same value (101), a striking, checkable regularity.
**Formalization** — naming "symmetry-seeking" as a deliberate strategy
with its own trigger question. **Compression** — a fresh problem with a
different, non-obvious symmetry (e.g. a geometric arrangement), the
learner applying the trigger question independently.

## Teaching Sequence

MC-1 (exhaustive vs. representative case analysis) is addressed first,
since it corrects and sharpens a strategy the learner already partially
has (systematic trial, from the prerequisite concept) — a smaller
conceptual step than MC-2, which introduces a genuinely new kind of
strategy the learner has likely never deliberately practiced.
Symmetry-seeking (MC-2's territory) is introduced only after the
existing four-strategy selection judgment (from the prerequisite) is
confirmed secure, since adding a fifth/sixth tool to an unstable
selection process would compound rather than build on existing skill.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the Gauss pairing
demonstration, think-aloud) → **Error Analysis** (the incomplete-case-
split problem, examined for the missing case) → **Classification/
Sorting** (a mixed problem set sorted by which of the now six strategies
best fits each, extending the prerequisite concept's own core selection-
practice format). **What doesn't fit**: introducing symmetry-seeking via
abstract definition before the Gauss-style worked demonstration — this
strategy in particular depends on a felt "aha, that's so much faster"
moment to motivate the trigger-question habit; stating the definition
first would produce inert, undeployed knowledge.

## Voice Teaching Notes

Listen for a learner asserting a conclusion holds "for all cases" right
after checking only two or three, without stating why those cases
exhaust the possibilities — this is MC-1's clearest verbal signature. A
learner who, shown a symmetric problem after the fact, says "oh, I never
would have thought to look for that" is revealing MC-2's core mechanism
(symmetry genuinely isn't salient without training) rather than a
one-off oversight — worth noting as a standing habit to build, not a
single missed instance to correct.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. A learner who correctly executes exhaustive case
analysis when EXPLICITLY told "prove your cases are complete" but
reverts to representative-case reasoning when not prompted has a
real but shallower gap than MC-1 fully active — the completeness-
justification habit needs to become spontaneous, not just producible
on demand, before certifying mastery at this concept's `bloom: apply`
target.

## Tutor Recovery Strategy

Likeliest utterance: "I don't see anything special about this problem"
when a symmetry is present but unnoticed — the concept-specific smaller
question: "if you flip, mirror, or relabel part of this problem, does it
look the same as another part?" — a direct operationalization of the
trigger question, more concrete than asking generically "is there a
symmetry?"

## Memory Hooks

**Type**: procedure (two new named strategies) with an overlaid
selection skill (extending the prerequisite concept's own selection
judgment to a larger repertoire). Review form: mixed, unlabeled problem
sets spanning the FULL six-strategy repertoire (the original four plus
these two), never drilled as a strategy pair in isolation once
individually secure — matching the same interleaving discipline
established for the prerequisite concept, now simply extended in scope.
Interleaving partners: `math.found.problem-solving` directly (the two
concepts should be reviewed together as one unified six-strategy
toolkit, not as sequential, separately-reviewed units, once both are
mastered).

## Transfer Connections

- **Near**: a fresh problem solvable via symmetry-seeking or requiring a
  genuinely exhaustive case analysis.
- **Far**: proof by exhaustive cases (a real, later proof technique) —
  this concept's exhaustive-case-analysis skill is a direct precursor,
  minus the formal proof-writing apparatus.
- **Real-world**: any planning or auditing task requiring a genuinely
  complete case check (e.g. "have we covered every possible failure
  mode," not just the likely ones) as an exhaustive-case-analysis
  transfer target.
- **Expert transfer**: the learner spontaneously asks the symmetry
  trigger question on an unfamiliar problem in any context (not just
  mathematics) — e.g. noticing a symmetric structure in a scheduling or
  logistics problem outside a classroom setting.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Symmetry-seeking has an
obvious, strong informal connection to physics and art (both fields
where symmetry is a load-bearing organizing concept), but this is not
KG-encoded as a cross-subject link for this node; not fabricated here.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.problem-solving-strategies.md` — stated explicitly per
Gate 2, not omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found beyond the relationship note already discussed under
Identity above (this concept correctly extends, rather than duplicates,
`math.found.problem-solving` — the KG's `parent` field confirms the
intended relationship, and the two concepts' misconception registries
target genuinely distinct failure modes).

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 2). No Blueprint existed to ground this entry;
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure.
