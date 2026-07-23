# Kirchhoff's Current and Voltage Laws — `phys.em.kirchhoffs-laws`

## Identity

- **Concept ID**: `phys.em.kirchhoffs-laws` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 8.
- **Prerequisites**: `phys.em.dc-circuits` — Kirchhoff's laws generalize
  the already-secure series/parallel analysis to ARBITRARY circuit
  topologies (KCL as charge conservation at junctions, KVL as energy
  conservation around loops).
- **Unlocks** (from KG): `phys.em.potentiometer`, `phys.em.rc-circuits`,
  `phys.em.wheatstone-bridge` — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly apply Kirchhoff's Voltage Law (KVL) to
ANY closed loop in ANY circuit, however complex (multiple batteries,
multiple resistors, shared branches carrying different currents),
explaining that KVL is a universal statement of energy conservation, not
restricted to simple single-battery, single-resistor loops; (2) correctly
apply the resistor sign convention when traversing a loop: SUBTRACT IR
(a voltage drop) when traversing in the direction of assumed current,
ADD IR (a voltage rise) when traversing against it — never defaulting to
addition regardless of direction.

## Core Understanding

Kirchhoff's Voltage Law (the sum of voltage changes around any closed
loop is zero) is a direct statement of energy conservation, and holds
UNIVERSALLY for any closed path through any circuit, no matter how
complex — multiple batteries, multiple resistors, shared branches
carrying several different currents from different loops simultaneously.
There is no "simple loop only" restriction: the underlying physics
(energy gained/lost as a unit charge traverses the loop must sum to
zero) doesn't care how many other branches or components exist elsewhere
in the circuit; the ALGEBRA of applying KVL to a complex network can
become involved (more unknowns, more simultaneous equations), but the LAW
itself remains exactly as valid as in the simplest single-loop case. A
critical, easily-reversed detail in applying KVL is the sign convention
for resistors: when traversing a resistor in the SAME direction as the
assumed current flow, the charge is moving from higher to lower
potential (a voltage DROP, since current flows from high to low
potential through a resistor by definition) — this contributes -IR to
the KVL sum; traversing AGAINST the assumed current direction means
moving from lower to higher potential (a voltage RISE) — contributing
+IR instead. Using the wrong sign (or defaulting to always adding IR
regardless of traversal direction) produces a systematically incorrect
KVL equation.

## Mental Models

**Beginner**: "KVL only really works for simple loops — one battery, one
resistor; when I traverse a resistor, I just add IR to my equation."
Upgrade trigger: successfully applying KVL to a genuinely complex
multi-battery, multi-branch loop (confirming the sum still equals zero)
directly confronts the simple-loops-only restriction; comparing traversal
WITH vs. AGAINST the assumed current direction (opposite signs) directly
confronts the always-add assumption.

**Intermediate**: "KVL applies to ANY closed loop, however complex;
traversing WITH current direction through a resistor means -IR
(drop), traversing AGAINST means +IR (rise)." This model correctly
captures both distinctions, but sometimes still makes sign errors under
time pressure in genuinely complex, multi-loop circuits.

**Advanced**: "Before writing any KVL equation, explicitly assign a
traversal direction to the loop AND a current direction to each branch,
then check each resistor's sign systematically against BOTH assumed
directions — never trusting memorized sign shortcuts in a complex,
unfamiliar topology."

**Expert**: Kirchhoff's laws as the discrete-circuit-theory
specializations of Maxwell's equations (KCL from charge conservation/
Gauss's law, KVL from the curl-free electrostatic field in the DC
limit) — a natural consolidation, not required for mastery.

## Why Students Fail

The dominant failure is treating KVL as restricted to simple, familiar
loop shapes, hesitating or refusing to apply it confidently to genuinely
complex multi-branch circuits; a second, distinct failure is a
mechanical sign error — adding IR regardless of traversal direction
relative to the assumed current, rather than checking direction
case-by-case.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.kirchhoffs-laws.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS**: believing KVL only works for
  loops with one battery and one resistor, or hesitating to apply it to
  loops containing other branches' currents. **Birth type**:
  instruction-induced (Type 5) — introductory examples typically use
  simple single-loop circuits, and this restricted scope is incorrectly
  internalized as KVL's actual domain of validity rather than a
  pedagogical simplification. Probe: "Can KVL be applied to a loop
  containing 3 batteries and 5 resistors, with branches shared by
  multiple currents?"
- **MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL**: adding IR (instead of
  subtracting) when traversing a resistor in the direction of assumed
  current, producing sign errors in KVL equations. **Birth type**:
  instruction-induced (Type 5) — the sign convention is easy to state but
  easy to apply mechanically backward under time pressure, without
  re-deriving it from "current flows from high to low potential" each
  time. Probe: "You traverse a resistor in the SAME direction as the
  assumed current I. Do you add IR or subtract IR in your KVL equation?"

## Analogies

**Best**: hiking a closed mountain loop trail — however many peaks and
valleys the trail has (however complex), your total elevation change
returning to the start is always exactly zero — directly targets
MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS by giving a familiar, universally
true conservation precedent regardless of trail complexity.

**Anti-analogy**: do NOT say "just add up the IR drops around the loop"
without specifying the traversal-direction-dependent sign — this vague
phrasing directly invites MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL.

## Demonstrations

Conceptual: apply KVL successfully to a genuinely complex circuit (3
batteries, 5 resistors, shared branches) step by step, confirming the
loop sum is zero — directly targets
MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS. Worked-example: traverse the SAME
resistor once with and once against the assumed current direction,
showing the sign flips (-IR vs. +IR) — directly targets
MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL.

## Discovery Questions

Discovery-style: "does Kirchhoff's Voltage Law still work for a circuit
with several batteries and many shared branches, or does it break down
once things get complicated?" — learner works through a complex example,
directly confronting MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL is addressed first (establishing the
correct sign convention on a simple loop), before
MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS, since a learner confident in the
sign convention is then equipped to tackle progressively more complex
loops without the sign mechanics becoming an additional source of error.

## Tutor Actions

WORKED-EXAMPLE (KVL applied to a genuinely complex multi-battery,
multi-branch circuit; resistor traversed both directions showing sign
flip); THOUGHT-EXPERIMENT (the closed mountain-trail elevation analogy).

## Voice Teaching Notes

Listen for hesitation or refusal to apply KVL to complex circuits, or a
resistor's sign added regardless of traversal direction — the two direct
misconception tells. Load-bearing sentence: "KVL works for ANY closed
loop, no matter how complicated — and the sign always depends on whether
you're going WITH or AGAINST the current." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner hesitating to apply KVL to a complex circuit signals
MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS (MISCONCEIVING, full repair via the
complex-circuit worked example). A learner adding IR regardless of
traversal direction signals MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL (full
repair via the direction-flip demonstration). Mastery trigger: correctly
applying KVL to an arbitrarily complex loop, AND correctly assigning
resistor signs based on traversal direction. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the whole circuit for a second — as you
cross just THIS ONE resistor, are you moving WITH the current or AGAINST
it?" (isolating the single-resistor sign check before tackling the full
loop). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (universal applicability regardless of complexity;
direction-dependent sign convention) bound to procedure (KVL equation
construction for a loop). Interleave with `phys.em.dc-circuits` and, once
authored, `phys.em.wheatstone-bridge`/`phys.em.rc-circuits`/
`phys.em.potentiometer` (the direct KG unlocks).

## Transfer Connections

Near: any multi-loop circuit-analysis problem, including automotive and
household wiring networks. Far: electrical grid power-flow analysis
(Kirchhoff's laws underlying network-scale load-flow calculations) and
electronic circuit design (SPICE simulation software built directly on
Kirchhoff's laws). Real-world: understanding how circuit simulation
software solves arbitrarily complex networks by systematically applying
exactly these two laws. Expert: Kirchhoff's laws as discrete-circuit
specializations of Maxwell's equations.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 8): initial authoring.
