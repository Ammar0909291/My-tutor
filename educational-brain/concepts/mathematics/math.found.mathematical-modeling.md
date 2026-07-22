# Mathematical Modeling — `math.found.mathematical-modeling`

## Identity

- **Concept ID**: `math.found.mathematical-modeling` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.problem-solving` (the load-bearing
  part: the four named strategies and, especially, strategy selection —
  modeling routinely requires choosing and combining them) and
  `math.found.abstraction` (the load-bearing part: identifying which
  real-world features are mathematically essential and which are
  irrelevant noise to discard when building a model).
- **Unlocks**: none directly in the KG (`unlocks: []`), but `related:
  math.stats.statistical-modeling`, `math.opt.formulation` — modeling is
  a general skill that both of those more specialized downstream areas
  apply in their own domains.
- **Difficulty**: developing · **Bloom**: create (the first "create"-
  level Bloom target encountered in this domain so far — see Assessment
  Signals) · **Mastery threshold**: 0.70 · **Est. hours**: 12 (tied with
  `math.found.logic` for the longest estimated-hours figure in
  math.found so far)
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node.

## Learning Objective

The learner can: translate a real-world situation into precise
mathematical language (variables, relationships, constraints); solve the
resulting mathematical problem using appropriate tools; and — the step
most often skipped — interpret the mathematical solution back in the
context of the original situation, checking whether it makes sense and
revising the model if it doesn't. A learner who can solve a pre-formulated
word problem but cannot themselves formulate a model from an
unstructured real-world description has not achieved mastery — the
KG's `bloom: create` level specifically targets the FORMULATION step,
not just downstream solving.

## Core Understanding

Mathematical modeling is a three-stage cycle, not a single step:
translate a real situation into mathematics (choosing which real
features become variables, which relationships become equations, and —
critically — which real complexity is deliberately IGNORED as irrelevant
to the question being asked); solve the resulting mathematical problem
using whatever tools fit; and interpret the mathematical answer back in
real terms, checking it against reality and revising the model if the
answer doesn't make sense. The formulation and interpretation stages are
where genuine modeling skill lives — solving an already-formulated
equation is a different, narrower skill (`math.found.problem-solving`'s
territory) that modeling merely calls upon partway through its own,
larger cycle.

## Mental Models

- **Beginner model — "modeling is translating word problems into
  equations"**: the learner treats modeling as a fixed, mechanical
  translation exercise (this word problem always becomes this equation
  form). Useful as an entry point but incomplete — it omits the
  DELIBERATE SIMPLIFICATION step (deciding what to leave out) and the
  interpretation/validation step entirely. Shelf-life warning: "word
  problems are pre-simplified for you — real modeling starts with a
  messy situation where YOU decide what matters."
- **Intermediate model — "translate → solve → interpret, as three
  distinct stages"**: the learner explicitly separates the three stages
  and recognizes that a mathematically correct solution to stage 2 can
  still be a bad ANSWER if stage 3 (interpretation, checking against
  reality) is skipped. Upgrade trigger: a model whose mathematically
  correct solution is a physically or contextually absurd answer (e.g.
  a negative population, a fractional number of buses) that the learner
  must catch and address.
- **Advanced model — "modeling requires deliberate simplification,
  chosen for the question being asked"**: the learner actively decides
  which real-world complexity to include and which to discard, and
  recognizes that the SAME real situation may warrant different models
  depending on what question is being asked of it.
- **Expert model — "models are revised, not just built once"**: the
  learner treats a model's interpretation stage as feedback that may
  require returning to formulation — refining which variables and
  relationships were included — rather than treating modeling as a
  one-pass pipeline.
- **Do not upgrade early**: a learner who still treats modeling as fixed
  word-problem translation (beginner model) should not be pushed into
  choosing among multiple valid simplification strategies (advanced
  model) — the three-stage cycle (intermediate model) must be secure
  first, including genuinely experiencing an interpretation-stage
  catch, before simplification CHOICES become a meaningful skill to
  practice.

## Why Students Fail

The dominant failure is treating modeling as ending at the mathematical
solution — learners trained heavily on word problems (which are
PRE-FORMULATED and whose answers are rarely checked against real-world
sense) never build the habit of interpreting a solution back in context,
so a model that outputs "the number of buses needed is 4.3" is accepted
as a final answer rather than recognized as requiring rounding
UP (not to the nearest value) because buses are discrete and you cannot
run a fraction of one. A second, distinct failure is at the formulation
stage: learners given a genuinely unstructured real situation (not a
pre-packaged word problem) often don't know where to start, because they
have never had to DECIDE what to include and exclude — every prior
"modeling" experience already made that decision for them.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet:

**MC-1 — "The mathematical solution IS the final answer" (Type 5,
instruction-induced — years of word problems whose stated numeric
answer was always accepted without a reality check)**
- *Why*: word-problem pedagogy overwhelmingly rewards reaching the
  correct number, rarely requiring or even permitting a "this doesn't
  make sense in context" response.
- *Symptom / phrase*: a learner reports "4.3 buses" as a final answer
  without comment, or accepts a negative time or population value
  without flagging it as impossible.
- *Detection probe*: "Your model gives 4.3 buses needed. Is 4.3 a valid
  final answer to 'how many buses should we rent'? What should you
  actually report?"
- *Recovery*: explicitly name the missing third stage — "solving the
  math is only step 2 of 3; step 3 is asking whether the number makes
  sense back in the real situation, and fixing it if it doesn't (here:
  round UP, since a fraction of a bus can't be rented)."
- *Verification*: given a fresh model whose raw mathematical solution
  needs contextual adjustment (rounding direction, sign, units), the
  learner correctly identifies and makes the adjustment unprompted.

**MC-2 — "There is one correct model for a given real situation" (Type
5, instruction-induced — every word problem the learner has seen has
exactly one intended equation)**
- *Why*: assessment-driven word-problem practice almost always has a
  single accepted formulation, training the expectation that modeling
  has one right answer the way arithmetic does.
- *Symptom*: a learner presented with two different, both-reasonable
  models of the same situation (e.g. a linear vs. an exponential growth
  model for early-stage population data) insists one must be "wrong."
- *Detection probe*: "Two people modeled the same situation differently
  and got different equations. Can they both be doing correct
  modeling?"
- *Recovery*: present a genuine real situation with two legitimate
  models answering slightly different implicit questions (or making
  different, both-reasonable simplifying assumptions), and ask what
  assumption each model is making that the other isn't.
- *Verification*: given a fresh real situation, the learner proposes
  more than one reasonable model and articulates what simplifying
  assumption distinguishes them.

**MC-3 — "A more complicated/detailed model is always a better model"
(Type 1, overgeneralization — "more accurate/detailed = better" is
correct in many contexts and overextended here)**
- *Why*: in most other academic contexts, adding detail and precision is
  rewarded; modeling is one of the few contexts where a simpler model
  that answers the actual question is often genuinely BETTER than a more
  detailed one that's harder to solve or interpret and doesn't improve
  the answer to the question being asked.
- *Symptom*: a learner insists on adding variables or complexity to a
  model that already adequately answers the question, or resists a
  simplifying assumption ("but that's not exactly true in real life")
  even when the simplification doesn't materially affect the answer
  needed.
- *Detection probe*: "Would adding [extra detail] change the answer to
  the specific question being asked? If not, does it belong in this
  model?"
- *Recovery*: contrast two models of the same situation, one
  appropriately simple and one needlessly complex, both giving the same
  answer to the actual question — the complexity bought nothing.
- *Verification*: given a situation with an obviously unnecessary
  potential complication, the learner deliberately excludes it and can
  justify the exclusion by reference to the actual question being
  asked.

## Analogies

- **Best analogy — a map, not a photograph**: a good map deliberately
  OMITS most real detail (building heights, exact colors, trees) to
  highlight what matters for navigation — a subway map's straightened,
  evenly-spaced lines are "wrong" geometrically but exactly right for
  the question ("which train do I take"). A mathematical model is the
  same kind of deliberate, purposeful simplification, not a failed
  attempt at a complete photograph. Breaking point: a map is fixed once
  drawn; a model is revised iteratively based on how well its answer
  performs against reality (the advanced model's territory).
- **Alternative — a recipe vs. the full chemistry of cooking**: a recipe
  models cooking with just enough precision to reliably produce the
  dish, deliberately omitting the full physical chemistry involved.
  Breaking point: recipes are rarely "wrong" in the way an
  under-formulated mathematical model can produce a genuinely misleading
  numeric answer.
- **ANTI-ANALOGY — do NOT say "a model is a simplified, slightly
  inaccurate version of the truth"**: "inaccurate" implies a defect,
  reinforcing MC-3 (more detail = better, closer to the "real truth").
  A well-chosen simplification is not a compromise or an inaccuracy
  relative to the modeling GOAL — it is the correct choice for that
  purpose, even though a more detailed model would also be
  "more accurate" in an unhelpful, purpose-blind sense.

## Demonstrations

- **The fractional-buses demonstration**: a real staffing/transport
  scenario producing a non-integer mathematical answer, requiring the
  learner to determine (and justify) the correct real-world rounding
  direction — the canonical MC-1 collision.
- **The two-legitimate-models demonstration**: the same growth data
  modeled both linearly and exponentially over a short window (both fit
  reasonably), with the learner asked what assumption distinguishes
  them and what additional data would help choose between them — the
  canonical MC-2 collision.
- **The unnecessary-complexity demonstration**: two models of the same
  situation, one simple and sufficient, one needlessly elaborate,
  producing identical answers to the actual question — the canonical
  MC-3 collision.

## Discovery Questions

**Need** — given a genuinely unstructured real situation (not a
pre-formulated word problem) and a specific question to answer, the
learner must decide where to even start. **Playground** — the learner
identifies candidate variables and relationships, deliberately
choosing what to include. **Invention** — the learner proposes a first
model (an equation or relationship) and solves it. **Collision** — the
mathematical solution doesn't obviously make sense in context (e.g. a
fractional count of a discrete real object), forcing the learner back to
the interpretation stage. **Formalization** — naming the three-stage
cycle (translate, solve, interpret) explicitly, with interpretation as
a genuinely separate, non-skippable stage. **Compression** — a fresh
unstructured situation, worked through all three stages independently.

## Teaching Sequence

The three-stage cycle (MC-1's territory: interpretation as a real,
non-skippable stage) must be secure before simplification-choice
practice (MC-2, MC-3) begins — a learner who doesn't yet expect to
interpret and validate a solution has no reason to care whether their
formulation choices were reasonable, since they're not yet checking
outcomes against reality at all. MC-2 (multiple valid models) and MC-3
(simpler is often better) are introduced together, since both concern
the SAME formulation-stage skill (deliberate, purposeful simplification)
from two directions — accepting that alternatives exist, and accepting
that less detail can be the better choice.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (an unstructured
real situation worked through all three stages, think-aloud) →
**Prediction** (before solving, predict what KIND of answer to expect,
so an absurd result is noticeable) → **Thought Experiment** (the
two-legitimate-models comparison) → **Error Analysis** (a model with an
unjustified unnecessary complexity, or a model that skipped
interpretation, examined for its specific flaw). **What doesn't fit**:
pure equation-solving practice as the primary activity — this concept's
distinct, higher-Bloom-level target (create) is formulation and
interpretation, not solving, which is `math.found.problem-solving`'s
territory and already assumed secure.

## Voice Teaching Notes

Listen for a learner reporting a raw mathematical answer without comment
when it's contextually absurd (e.g. stating "4.3 buses" flatly) — this
is MC-1's clearest behavioral signature, often silent rather than
verbal. A learner who says "but that's not exactly how it really works"
while resisting an appropriate simplification is showing MC-3. The
load-bearing sentence: "solving the equation is step two of three — the
real question is whether the number makes sense back in the world it
came from."

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. A learner who correctly formulates a model and
solves it but never spontaneously checks the answer against context
(without being prompted "does this make sense?") is showing MC-1
behaviorally even if, when directly asked, they can identify the
problem — the gap is in spontaneous habit, not conceptual understanding,
and should be assessed by withholding the prompt on at least one item
per the Blueprint-authoring-time item bank's design.

## Tutor Recovery Strategy

Likeliest utterance: "I don't know how to start" facing an unstructured
real situation — the concept-specific smaller question: "what's the ONE
number the question is actually asking for, and what real quantities
would you need to know to compute it?" — shrinks the formulation task to
identifying the target variable first, before worrying about the full
model.

## Memory Hooks

**Type**: procedure (the three-stage cycle) with an embedded evaluative
skill (simplification judgment) — review form is fresh, genuinely
unstructured real situations, never pre-formulated word problems (which
would only exercise the solving stage this concept assumes is already
secure). Interleaving partners: `math.found.problem-solving` (the
solving-stage tool it calls on) and `math.found.abstraction` (the
essential-vs-irrelevant judgment it applies at the formulation stage) —
mixed practice distinguishing "this is a solving step" from "this is a
formulation/simplification decision" sharpens the boundary between this
concept and its two prerequisites.

## Transfer Connections

- **Near**: a fresh unstructured real situation modeled through all
  three stages.
- **Far**: statistical modeling and optimization formulation (the KG's
  own `related` links, `math.stats.statistical-modeling` and
  `math.opt.formulation`) — both are modeling applied within a more
  specialized mathematical toolkit.
- **Real-world**: everyday quantitative decisions (should I buy in bulk,
  which route is faster) treated explicitly as small modeling exercises
  — translate, compute, then check whether the computed answer actually
  matches lived experience.
- **Expert transfer**: the learner spontaneously proposes a
  simplification and justifies it by reference to the specific question
  being asked, rather than by reference to "accuracy" in the abstract —
  direct evidence the advanced model has replaced MC-3.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), though `related`
entries (`math.stats.statistical-modeling`, `math.opt.formulation`) show
this is a hub concept within mathematics feeding two more specialized
areas. Mathematical modeling is also a core method throughout physics,
economics, and engineering, but this is not KG-encoded as a
cross-subject link for this node; not fabricated here.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.mathematical-modeling.md` — stated explicitly per Gate 2, not
omitted.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two-item prerequisite list is correct; the empty
`unlocks` combined with two `related` entries is a legitimate pattern
(this concept feeds two more specialized downstream areas thematically,
without being a strict prerequisite gate for either) — not a defect.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 2). No Blueprint existed to ground this entry;
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure.
