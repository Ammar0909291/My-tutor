# Mathematical Problem Solving — `math.found.problem-solving`

## Identity

- **Concept ID**: `math.found.problem-solving` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.mathematical-thinking` — the
  load-bearing part is the general disposition to reason deliberately
  about a problem's structure; this concept applies that disposition
  through four specific, NAMEABLE strategies (working backwards, drawing
  a diagram, reducing to a simpler case, systematic trial), so the
  learner needs to already accept that mathematics is a process before
  learning that the process has identifiable, reusable moves.
- **Unlocks** (from KG/Blueprint): `math.found.proof` — problem-solving
  strategies are what a learner reaches for BEFORE a proof's logical
  structure is available; systematic trial and reduction-to-simpler-case
  in particular are common entry points into inductive reasoning.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery threshold**:
  0.70 · **Est. hours**: 10

## Learning Objective

The learner can: apply working backwards (starting from the goal state
and reasoning about what must precede it) to a problem where the forward
path isn't obvious; apply drawing a diagram and reducing to a simpler
case as needed; apply systematic trial (organized, non-random,
constraint-narrowing case-checking); and — critically — correctly SELECT
which strategy (or combination) fits a GIVEN problem's structure, since
different problems call for different strategies and no single strategy
is universal.

## Core Understanding

Problem solving in mathematics is not one skill but a small toolkit of
distinct strategies, each suited to a different problem SHAPE: working
backwards fits problems with a clearly specified end state and an
unclear path to it; diagramming fits problems whose relationships are
easier to see visually than verbally; reduction to a simpler case fits
problems that generalize a pattern found in a smaller instance; and
systematic trial fits problems with a bounded, checkable set of
candidates. The deepest skill this concept teaches is not any one
strategy but STRATEGY SELECTION — recognizing which tool fits a novel
problem's structure — because a learner with all four strategies
memorized but no selection judgment will still stall on problems whose
shape doesn't match their default strategy.

## Mental Models

- **Beginner model — "try things until something works"**: problem
  solving means attempting whatever comes to mind. Correct as a
  starting instinct but unsystematic — this is the arriving model most
  learners bring, and the concept's job is to discipline it, not replace
  it outright. Shelf-life warning: "trying things is the right
  instinct — we're going to make your trying organized and give it three
  more tools besides."
- **Intermediate model — "four named strategies"**: the learner can
  recall and apply each of the four strategies individually when
  explicitly told which one to use. Upgrade trigger: given a problem
  with NO strategy named, and having to choose.
- **Advanced model — "strategy fits problem shape"**: the learner
  recognizes surface features of a problem (a clear end-goal → working
  backwards; a bounded candidate set → systematic trial; visual/spatial
  relationships → diagram; a hard general case → reduce and generalize)
  and selects accordingly, without being told which strategy to use.
- **Expert model — "strategies combine"**: the learner recognizes that
  real problems often require combining strategies (e.g. reduce to a
  simpler case, THEN work backwards within that simpler case) rather
  than choosing exactly one.
- **Do not upgrade early**: a learner who cannot yet correctly execute
  even one strategy in isolation (e.g. makes reversal errors in working
  backwards) should not be pushed into strategy-selection practice — per
  the Blueprint's own misconception registry, execution errors within a
  single strategy (MC-3) are a distinct, prior gap from selection errors
  (MC-2).

## Why Students Fail

Two separable failure modes. First, learners raised on procedural
"apply the formula" mathematics often treat systematic trial as random,
untracked guessing rather than an organized search — they try candidates
with no record of what's been tried or why, so they either loop
indefinitely or give up, concluding "trial and error doesn't work" when
in fact they never tried the SYSTEMATIC version. Second, learners who
have internalized exactly one strategy (often whichever was taught most
recently or drilled hardest) default to it regardless of fit — a learner
who has just practiced ten working-backwards problems will attempt
working backwards on a problem that structurally demands systematic
trial, and the mismatch, not any deficiency in the strategy itself,
causes the stall.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "Systematic trial = random guessing" (Type 3, language
  contamination — the everyday phrase "trial and error" implies
  haphazard attempts, colliding with the mathematical sense of an
  organized, constraint-narrowing search)**: full content: Blueprint
  Component 6, MC-1.
- **MC-2 — "Single strategy applied regardless of problem structure"
  (Type 1, overgeneralization — a genuinely successful strategy
  over-applied past problems it fits)**: full content: Blueprint
  Component 6, MC-2.
- **MC-3 — "Working-backwards operation-reversal error" (a procedural
  execution error, not a conceptual misconception — e.g. reversing
  "add 7" by adding instead of subtracting, or forgetting a squaring
  step has two possible roots)**: full content: Blueprint Component 6,
  MC-3. This is qualitatively different from MC-1/MC-2 — it is a
  step-level arithmetic slip within a correctly SELECTED strategy, not
  a belief about what problem solving is; treat as a procedural
  checkpoint (verify each reversal explicitly), not a conceptual
  repair.

## Analogies

- **Best analogy — undoing a set of nested wrappings (for working
  backwards)**: to find what's inside a gift wrapped in three layers,
  you remove the OUTERMOST wrapping first, working from the visible
  end state inward — the Blueprint's own worked example (double, add 7,
  divide by 3, result 5 → undo divide, undo add, undo double, in that
  reverse order) is exactly this structure. Breaking point: not every
  "undo" is a simple inverse operation (squaring's inverse has two
  branches) — this is precisely MC-3's territory, and the analogy should
  be paired with an explicit warning at that step type.
- **Alternative — a detective narrowing suspects (for systematic
  trial)**: each check eliminates a group of candidates via a
  constraint, not just one candidate at a time — captures the
  "organized, narrowing" character that distinguishes systematic trial
  from random guessing. Breaking point: over-applied, can make trial
  feel falsely fast — some systematic trials genuinely require checking
  many candidates one by one when no eliminating constraint is
  available.
- **ANTI-ANALOGY — do NOT call systematic trial "brute force"**: the
  term "brute force" (borrowed from computing) reinforces MC-1 by
  framing trial as unintelligent exhaustive checking rather than an
  organized, constraint-guided search — if a learner uses the term
  unprompted, redirect explicitly: "it's organized trial, not brute
  force — every check should narrow what's left."

## Demonstrations

- **Worked demonstration (working backwards)**: the Blueprint's
  Example 1 — "a number is doubled, then 7 is added, then divided by 3,
  giving 5; find the original number" — solved by undoing each operation
  in reverse order, then verified forward.
- **Diagram demonstration**: converting a verbal relationship problem
  into a number line or drawn arrangement, showing a hidden constraint
  become visible.
- **Systematic-trial demonstration**: a bounded candidate problem
  (e.g. a small Diophantine-style puzzle) solved by organized,
  constraint-narrowing checking with an explicit record of what's been
  tried and why each elimination is valid — deliberately contrasted with
  an unorganized "just guessing" attempt on the same problem to make the
  MC-1 distinction experiential.

## Discovery Questions

**Need** — presented with a problem whose forward path isn't obvious but
whose end state IS clearly given (the "double, add 7, divide by 3, gives
5" problem), the learner is stuck trying to work forward from unknowns.
**Playground** — the learner is asked "what do you know for CERTAIN?"
(the end result, 5) and "what's the LAST thing that happened before
that?" **Invention** — the learner proposes undoing the division first.
**Collision** — a learner who undoes operations in the wrong order (e.g.
undoing "add 7" before "divide by 3") gets a wrong original number;
forward-verification catches the error. **Formalization** — naming
"working backwards" as starting from the goal and reversing each step in
strict reverse order. **Compression** — a fresh problem with a different
operation chain.

## Teaching Sequence

Each of the four strategies must be individually secure (correctly
executable when explicitly named) before mixed, unlabeled strategy-
selection practice begins — per the Why Students Fail analysis above,
introducing selection practice too early (before any strategy is
reliably executable) conflates two distinct skills and makes it
impossible to tell whether a stall is a selection error or an execution
error. Working backwards is introduced first among the four (per the
Blueprint's own example ordering) since it has the clearest single
worked demonstration; systematic trial is introduced last since its
"organized, non-random" character is hardest to convey without the
learner having already felt the contrast between undirected guessing and
a directed search in an earlier strategy.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the double/add-7/
divide-by-3 problem, think-aloud) → **Demonstration** with **Prediction**
(a diagramming task where the learner predicts what the picture will
reveal before drawing it) → **Classification/Sorting** (given several
short problem statements with no instructions, the learner sorts them by
which strategy fits, before attempting to solve any) — this last action
is the concept's core skill (strategy selection) made into a standalone,
lower-stakes practice format. **What doesn't fit**: teaching all four
strategies in strict sequence without ever mixing them — per the
Blueprint's own MC-2 finding, sequential single-strategy drilling is
exactly what produces the single-favored-strategy misconception; mixed,
unlabeled practice sets are necessary once each strategy is individually
secure.

## Voice Teaching Notes

Listen for a learner narrating trial attempts with no memory of what was
already tried ("let me just try some more numbers") — this is MC-1's
behavioral signature, audible even without a formal probe. A learner who
attempts the SAME strategy on a second, structurally different problem
without pausing to reconsider fit is showing MC-2 — the pause itself (or
its absence) is the signal, independent of whether the attempt succeeds.
The load-bearing sentence for working-backwards: "what do you know for
certain, and what's the last step before that?" — repeated at each
reversal to catch MC-3 execution errors as they happen, not after.

## Assessment Signals

The Blueprint's worked examples (Component 4) are the concrete item
bank per objective — not re-authored here. Diagnostic interpretation
this entry adds: presenting a problem with NO strategy named and
observing which strategy the learner reaches for FIRST is itself a
higher-value diagnostic than asking "which strategy would you use" as a
separate meta-question — the first genuinely reveals selection behavior,
the second only reveals stated preference, which the Blueprint's own
strategy-selection learning objective (LO3) targets as the harder,
higher-value skill.

## Tutor Recovery Strategy

Likeliest utterance: "I don't know where to start" on a problem with no
strategy named — the concept-specific smaller question: "what's the very
LAST piece of information you're given — the goal, or a constraint?" —
this single question routes the learner toward whichever of the four
strategies actually fits, without the tutor naming it outright (working
backwards if there's a clear end state; systematic trial if there's a
bounded candidate set implied by the constraint).

## Memory Hooks

**Type**: procedure (four distinct, executable strategies) with an
overlaid concept (strategy selection). Review form: mixed, unlabeled
problem sets requiring both correct execution AND correct strategy
choice — never drilled one strategy at a time in isolation once each is
individually secure, per the Why Students Fail mechanism above.
Interleaving partners: `math.found.proof` (once available) — reduction
to a simpler case and systematic trial are common on-ramps into
inductive proof structure, and mixing early proof tasks with pure
problem-solving tasks helps the learner feel the boundary between
"solving this instance" and "proving it for all instances."

## Transfer Connections

- **Near**: a fresh problem solvable by the same strategy just practiced.
- **Far**: a problem requiring a DIFFERENT one of the four strategies
  than the one most recently practiced — the direct test of selection
  skill, not just execution.
- **Real-world**: everyday planning problems with a clear end goal
  (e.g. "I need to leave by 8am — working backwards from that, when do I
  need to start each step") as working-backwards transfer.
- **Expert transfer**: the learner combines two strategies unprompted
  (e.g. reduces a hard general problem to a simpler case, THEN works
  backwards within that simpler case) — evidence the advanced model
  (strategies combine) has been reached, not just the four strategies
  memorized individually.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). The four strategies
(especially diagramming and systematic trial) have obvious informal
analogues in engineering and computer-science debugging, but the KG does
not encode this as a formal cross-subject link; not fabricated here.

## Blueprint References

`docs/curriculum/blueprints/math.found.problem-solving.md` — read in
full. This entry reuses by reference the worked examples (Component 4)
and Misconception Registry (Component 6, MC-1–MC-3); it does not restate
the Blueprint's full worked derivations.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept as of this entry's authoring — this entry does
not create any.

## Curriculum Feedback

None found. The KG's single prerequisite and single-item unlocks list
(`math.found.proof`) match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program, math.found
  domain batch 1). Anchored to the live KG node and the existing
  Blueprint; all 3 misconceptions reused by reference.
