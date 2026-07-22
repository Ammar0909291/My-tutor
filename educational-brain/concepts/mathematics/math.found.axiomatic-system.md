# Axiomatic System — `math.found.axiomatic-system`

## Identity

- **Concept ID**: `math.found.axiomatic-system` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.axiom`, `math.found.logic` — an
  axiomatic system is precisely the combination of a set of axioms (the
  foundational, unproven starting assumptions) with the deductive rules
  of logic that allow theorems to be derived from them.
- **Unlocks** (from KG): `math.found.set-theory-axiomatic` — the
  Zermelo-Fraenkel axioms (ZFC) are the canonical worked instance of an
  axiomatic system, applying this concept's framework concretely to set
  theory.
- **Related** (from KG, not a `requires`/`unlocks` edge):
  `math.abst.formal-systems`, `math.found.axiom`.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 6

## Learning Objective

The learner can: define an axiomatic system as axioms PLUS the rules of
logic working together, recognizing that a list of axioms alone, with
no accompanying deduction system, cannot generate any theorems;
distinguish consistency (no derivable contradiction), completeness
(every true statement is provable), and independence (no axiom is
derivable from the others) as three genuinely different properties,
checked separately; and explain why changing a system's axioms produces
a genuinely different, not wrong, axiomatic system — there is no single
"correct" system for a given subject.

## Core Understanding

An axiomatic system is not simply a list of axioms — it is that list
TOGETHER WITH the rules of logic that allow theorems to be derived from
it step by step. Axioms alone are inert; without a deduction system
already mastered (`math.found.logic`'s modus ponens, substitution, and
other inference rules), no theorem can be produced from them at all.
Once a system exists, it can be evaluated along three independent axes
— consistency, completeness, and independence — each a genuinely
separate question that must be checked on its own terms, since a system
can hold any combination of them. And because axioms are STIPULATED
rather than discovered (per `math.found.axiom`), replacing even one
produces a genuinely different, equally legitimate theory — Euclidean
and hyperbolic geometry, differing only in the parallel postulate, are
the canonical example: both consistent, both legitimate, and yet
provably disagreeing about whether a triangle's angles sum to exactly
180°.

## Mental Models

- **Beginner model — "an axiomatic system is just its list of
  axioms"**: the learner treats the axioms themselves as the whole
  system, missing that the deductive machinery generating theorems from
  them is an equally essential, separate ingredient. Shelf-life warning:
  "the axioms are the raw material — you still need the rules of logic
  as the machine that turns them into theorems."
- **Intermediate model — "axioms plus logic together generate
  theorems, and a system can be judged along several separate
  dimensions"**: the learner recognizes both ingredients are necessary
  and begins checking consistency, completeness, and independence as
  distinct questions rather than one undifferentiated notion of
  "goodness." Upgrade trigger: a worked example where a system is
  consistent yet incomplete, showing the properties genuinely diverge.
- **Advanced model — "different axiom choices are not competing for
  one 'correct' answer — they define different structures"**: the
  learner treats axiom selection as a deliberate design choice defining
  which mathematical structure is being studied, comparing Euclidean and
  non-Euclidean geometry as siblings rather than a correct theory and
  an error. Upgrade trigger: the Euclidean/hyperbolic triangle-angle-sum
  contrast, both provably consistent, both provably disagreeing.
- **Expert model — "an axiomatic system is itself an object of study,
  evaluated by its meta-properties, not by its content's plausibility"**:
  the learner reasons about axiomatic systems the way a logician does —
  asking what can be proven ABOUT the system (is it consistent? complete?
  independent?) as a separate activity from proving things WITHIN it,
  and recognizes this meta-level view as what makes formal logic and
  metamathematics possible.
- **Do not upgrade early**: a learner who has not yet stabilized "axioms
  need logic to generate theorems" (beginner→intermediate) should not be
  pushed into comparing axiom CHOICES across whole systems (advanced) —
  per the Blueprint's own Protocol ordering, MC-1 (axioms-alone) is
  cleared before MC-2 (properties conflated) and MC-3 (unique-system
  assumption) are addressed.

## Why Students Fail

The dominant failure comes from `math.found.axiom` correctly teaching
that axioms are the foundational starting points of a mathematical
system — which learners then over-simplify into treating the axiom
LIST itself as the entire system, missing that the deductive rules of
logic are an equally essential, separate component supplying the
machinery that actually derives new statements. A second failure
follows from ordinary language use of "good" or "correct": learners
default to treating consistency, completeness, and independence as
near-synonyms for "a well-built system" rather than three logically
independent properties that must be verified one at a time.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "AXIOMATIC-SYSTEM-AS-AXIOMS-ALONE" (Foundational; Type 1,
  overgeneralization — the learner's correct understanding of an
  individual axiom is extended to assume the axiom LIST alone suffices,
  missing the deductive-rules component)**: believing a list of axioms
  alone, without rules of logic, constitutes a functioning axiomatic
  system. Full trigger/root-cause/error-pattern: Blueprint Component 6,
  MC-1.
- **MC-2 — "CONSISTENCY-COMPLETENESS-INDEPENDENCE-CONFLATED" (Type 3,
  language contamination — ordinary language's single vague notion of
  "a good system" is imported onto three technically distinct,
  independent properties)**: believing consistency, completeness, and
  independence are interchangeable notions of "a good system." Full
  content: Blueprint Component 6, MC-2.
- **MC-3 — "UNIQUE-CORRECT-AXIOMATIC-SYSTEM-ASSUMED" (Type 1,
  overgeneralization — extending the reasonable expectation that most
  everyday and early-mathematical questions have one correct answer to
  axiom systems, which do not)**: believing there is exactly one
  "correct" axiomatic system for a given subject. Full content:
  Blueprint Component 6, MC-3.

## Analogies

- **Best analogy — a rulebook and a game engine, working together**: a
  game's rulebook (the axioms) does nothing on its own — a game engine
  applying those rules (the deductive machinery) is what actually
  produces game states (theorems) from them. Neither the rulebook alone
  nor an engine with no rules produces anything. Breaking point: a game
  engine can run many different rulebooks unchanged; the deductive rules
  of logic, by contrast, are the SAME across virtually all axiomatic
  systems — what varies between systems is almost always the axioms, not
  the logic.
- **Alternative — a building's foundation and its construction
  crew**: the foundation (axioms) alone is just concrete; a construction
  crew following building codes (the deductive rules) is what actually
  builds the structure (theorems) on top of it. Breaking point: a
  building has one final, complete state; an axiomatic system's theorems
  are, in general, an open-ended, potentially infinite set — the
  building analogy suggests a finished product in a way theorem
  generation does not.
- **ANTI-ANALOGY — do NOT say "an axiomatic system is just a bigger
  version of a single axiom"**: this collapses the crucial distinction
  this concept exists to teach — a system is axioms COMBINED WITH logic,
  a structurally different kind of object than a single stipulated
  starting assumption, and describing it as merely "more axioms" directly
  reinforces MC-1.

## Demonstrations

- **Peano-arithmetic-without-logic demonstration**: presenting Peano's
  axioms alone and asking whether "2+2=4" can be derived with zero
  inference rules applied — it cannot — directly confronting MC-1 with
  the Blueprint's own Example 1.
- **Toy-system three-properties demonstration**: the Blueprint's own
  minimal two-axiom system {P, P→Q}, checked separately for consistency
  (yes), completeness with respect to a broader language (no), and
  independence (yes) — then contrasted with the redundant {P, P, P→Q}
  (fails independence) — directly confronting MC-2.
- **Euclidean-vs-hyperbolic demonstration**: both geometries shown
  consistent (via models) yet provably disagreeing on triangle
  angle-sums — directly confronting MC-3.

## Discovery Questions

**Need** — given Peano's bare axioms and asked to derive "2+2=4," the
learner attempts to combine the statements directly and finds nothing
happens without applying an inference rule. **Playground** — the
learner is shown modus ponens and substitution applied step by step to
the axioms, watching a derivation actually unfold. **Invention** — the
learner proposes that the axioms alone were never going to be enough —
something has to DO the deriving. **Collision** — presented with the
toy system {P, P→Q} and asked whether "consistent" automatically means
"complete," and shown a case where it is consistent but not complete
with respect to a wider language — directly targeting MC-2. **Formalization**
— naming the three properties explicitly and separately: consistency,
completeness, independence — each with its own test. **Compression** —
given a fresh small axiom set, checking all three properties
independently and reporting each result on its own terms.

## Teaching Sequence

MC-1 (axioms-alone) is repaired first, per the Blueprint's own MAMR
ordering, since a learner who thinks the axiom list alone constitutes
the system has not yet grasped what an axiomatic system even IS — the
prerequisite for meaningfully discussing its properties (MC-2) or
comparing different systems (MC-3). MC-2 and MC-3 are then addressed in
FIFO order once MC-1 is cleared.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the Peano-arithmetic-
without-logic demonstration, the primary action for MC-1) → **Contrast
Pair / Error Analysis** (the toy-system three-properties check,
targeting MC-2) → **Demonstration** (the Euclidean-vs-hyperbolic
triangle-angle-sum contrast, targeting MC-3). **What doesn't fit**: a
full formal proof of ZFC's consistency or independence results (e.g.
Gödel's incompleteness theorems) — this foundational concept only needs
the three-property FRAMEWORK, not a deep dive into metamathematical
results about specific systems, which belongs to more advanced logic
concepts.

## Voice Teaching Notes

Listen for "well obviously the axioms alone tell you everything" applied
to a bare axiom list with no inference step — this is MC-1's clearest
verbal signature. A learner who says "so if it's consistent, it must
also be complete, right?" is showing MC-2 directly. The load-bearing
sentence: "axioms are the raw material; the rules of logic are the
machine — you need both, and even then, consistency, completeness, and
independence are three separate report cards, not one grade."

## Assessment Signals

The Blueprint's own P77 problem set, P76 transfer probe (an independent
logician-designing-a-system scenario), and mastery gate (MAMR = 4/5) are
the concrete item bank — not re-authored here. Diagnostic interpretation
this entry adds: a learner who correctly identifies that axioms alone
generate nothing (MC-1 cleared) but still treats a verified-consistent
system as automatically complete (MC-2 still latent) shows that
"recognizing the two-ingredient structure" and "verifying each
meta-property independently" are separable skills requiring separate
checks.

## Tutor Recovery Strategy

Likeliest utterance: "but if the axioms are all true, doesn't that
automatically prove everything true follows from them?" — the
concept-specific smaller question: "is 'the axioms are true' the same
claim as 'the axioms plus the rules of logic can derive every true
statement'?" reframes the confusion from an intuitive leap (true axioms
should yield "all truth") to the precise, checkable claim
(completeness) that this leap silently assumes without verification —
directly isolating MC-2's conflation.

## Memory Hooks

**Type**: concept (a structural-analysis skill: recognizing the
two-ingredient composition of an axiomatic system and checking its
three meta-properties independently, not recall of any specific
system's axioms). Review form: fresh small axiom sets, checked for all
three properties from scratch, never rote recall of Peano's or ZFC's
specific axioms. Interleaving partners: `math.found.axiom` (the
single-axiom concept this one builds on, deliberately not re-taught
here per the Blueprint's own division-of-labor note) and, once
available, `math.found.theorem` — mixed practice distinguishing "what an
axiom is," "what an axiomatic system is," and "what a theorem is"
sharpens all three categories.

## Transfer Connections

- **Near**: checking a fresh small axiom set for consistency,
  completeness, and independence, and identifying whether it depends on
  logic to generate its theorems.
- **Far**: recognizing analogous "foundational rules plus an operating
  mechanism" structures in other formal systems (a legal code plus its
  courts' interpretive procedures; a programming language's grammar plus
  its compiler).
- **Real-world**: recognizing when a disagreement between two positions
  actually reflects two different, individually coherent starting
  assumptions (axiom-like), rather than one side being simply wrong.
- **Expert transfer**: the learner, meeting an unfamiliar formal theory,
  spontaneously asks not just "what are its axioms" but "is this system
  consistent, complete, and independent — and could a different, equally
  legitimate axiom choice describe a different structure instead?"

## Cross-Subject Connections

None via KG `cross_links` (empty for this node, confirmed against the
Blueprint's own Component 7 check). Not fabricated beyond what the KG
states.

## Blueprint References

`docs/curriculum/blueprints/math.found.axiomatic-system.md` — Status
PACKAGE_READY (132 lines; V-1 through V-20 all PASS). This entry reuses
by reference: the full Misconception Registry (Component 6, MC-1–MC-3)
and the three Worked Examples (Component 4, Peano/toy-system/Euclidean-
hyperbolic). Not restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two prerequisites, one-item unlocks list, and
empty cross-links all match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 4). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.
