# Potentiometer — `phys.em.potentiometer`

## Identity

- **Concept ID**: `phys.em.potentiometer` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 9.
- **Prerequisites**: `phys.em.kirchhoffs-laws` — the potentiometer's
  null-balance operation is a direct application of the already-secure
  Kirchhoff's laws to a uniform-wire potential-gradient circuit.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly distinguish the PHYSICS potentiometer (a
precision null-balance measurement instrument using a uniform wire and
galvanometer) from the everyday electronics "potentiometer" (a 3-terminal
variable resistor, like a volume knob) — the same name refers to two
genuinely different devices with different operating principles;
(2) correctly explain that the potentiometer measures the TRUE, open-
circuit EMF of a source, NOT its terminal voltage under load — at the
null point (zero galvanometer current), zero current flows FROM the
source under test, so V_terminal=ε-I×r=ε-0=ε exactly, which is precisely
why the potentiometer (unlike an ordinary voltmeter, which always draws
some current) can measure true EMF directly.

## Core Understanding

The word "potentiometer" has two genuinely DIFFERENT meanings depending
on context: in everyday electronics, it refers to a 3-terminal variable
resistor (a "pot," like a volume-control knob) that divides voltage and
always draws current from the circuit; in PHYSICS measurement
instrumentation, it refers to an entirely different device — a
precision null-balance circuit using a uniform resistance wire, a driver
current, and a galvanometer to detect a zero-current balance point. These
are not variations on the same idea — they operate on completely
different principles and serve completely different purposes, and
confusing the two (assuming the physics instrument is "just" a variable
resistor) misses the entire measurement mechanism. The physics
potentiometer's defining, powerful feature is that it measures the TRUE,
open-circuit EMF of a source under test, NOT its terminal voltage under
load — this works because, at the null balance point, the galvanometer
reads exactly zero, meaning ZERO current flows from the source being
measured; with zero current, the source's own internal resistance causes
no voltage drop at all (V_terminal=ε-I×r=ε-0=ε), so the potentiometer
reads the source's genuine EMF directly — a fundamental advantage over
an ordinary voltmeter, which ALWAYS draws at least some small current
(even a "good" voltmeter isn't perfectly zero-current), and therefore
always reads a value slightly LESS than the true EMF.

## Mental Models

**Beginner**: "A potentiometer is just a variable resistor, like a volume
knob; the potentiometer measures the voltage a battery actually
delivers, same as a voltmeter would." Upgrade trigger: comparing the
3-terminal variable-resistor device (which always draws current, divides
voltage) against the physics null-balance instrument (which draws zero
current at balance) directly confronts the same-device assumption;
tracing through what happens at the null point (zero current, hence zero
internal-resistance voltage drop) directly confronts the
terminal-voltage assumption.

**Intermediate**: "Physics potentiometer ≠ electronics 'pot' — a
uniform-wire null-balance instrument, not a variable resistor; at null,
zero current flows from the source, so the reading equals true EMF, not
terminal voltage." This model correctly captures both distinctions, but
sometimes still uses "potentiometer" loosely without specifying which
meaning is intended in a given context.

**Advanced**: "Always clarify context before using the word
'potentiometer' — in a physics measurement setting, it specifically
means the null-balance EMF-measuring instrument; its key advantage over
a voltmeter is drawing exactly zero current from the source at the
measurement point."

**Expert**: the potentiometer as a specific instance of the general
null-measurement principle (also seen in the Wheatstone bridge), where
measurement accuracy is achieved by detecting a zero-signal condition
rather than relying on meter calibration accuracy — a natural
consolidation directly connecting to `phys.em.wheatstone-bridge`, not
required for mastery.

## Why Students Fail

The dominant failure is conflating the physics measurement instrument
with the everyday electronics variable resistor sharing the same name,
missing the entirely different operating principle; a second, distinct
failure is assuming the potentiometer measures terminal voltage (like an
ordinary voltmeter would), missing that its zero-current null condition
specifically yields the true, open-circuit EMF instead.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.potentiometer.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-POTENTIOMETER-IS-JUST-A-VARIABLE-RESISTOR**: confusing the
  precision measurement instrument with a common 3-terminal variable
  resistor also called a "pot" in electronics. **Birth type**: language
  contamination (Type 3) — the identical word "potentiometer" is used for
  two genuinely different devices in different contexts (everyday
  electronics vs. physics instrumentation), and the more commonly
  encountered everyday meaning is incorrectly assumed to apply in the
  physics context. Probe: "Is the physics-lab potentiometer circuit the
  same device as the volume-control 'pot' in a stereo, or are they
  different things that happen to share a name?"
- **MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE**: believing the
  potentiometer measures the voltage the battery delivers under load,
  confusing null-balance EMF measurement with terminal voltage. **Birth
  type**: overgeneralization (Type 1) — the everyday experience of
  measuring voltage with a voltmeter (which reads terminal voltage under
  whatever load is present) is incorrectly extended to the
  potentiometer, whose null condition specifically eliminates current
  draw and hence measures a different quantity (true EMF). Probe: "At
  the potentiometer's null (balance) point, does ANY current flow from
  the source being measured? What does that imply about whether it reads
  EMF or terminal voltage?"

## Analogies

**Best**: two people pushing against each other head-on until neither
moves — at that standstill, no net force (no current) is transmitted
between them, exactly like the potentiometer opposing the source's
voltage exactly at null, transmitting zero current — directly targets
MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE by giving a concrete image of
the zero-current standoff condition.

**Anti-analogy**: do NOT say "a potentiometer adjusts voltage" as an
unqualified description — this vague phrasing, without specifying the
physics measurement context, directly invites
MC-POTENTIOMETER-IS-JUST-A-VARIABLE-RESISTOR.

## Demonstrations

Conceptual: compare the 3-terminal variable-resistor device (always
draws current, divides voltage) side by side with the physics
null-balance instrument (zero current at balance) — directly targets
MC-POTENTIOMETER-IS-JUST-A-VARIABLE-RESISTOR. Worked-example: trace the
circuit at the null point, showing I_from_source=0 implies
V_terminal=ε exactly — directly targets
MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE.

## Discovery Questions

Discovery-style: "at a potentiometer's exact null (balance) point, is any
current at all flowing out of the battery being tested? If not, what
must its terminal voltage equal?" — learner reasons through
V_terminal=ε-Ir with I=0, directly confronting
MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-POTENTIOMETER-IS-JUST-A-VARIABLE-RESISTOR is addressed first
(establishing the physics instrument as a genuinely distinct device from
the electronics component), before
MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE, since correctly
understanding the physics potentiometer's actual null-balance mechanism
is the prerequisite for then correctly reasoning about WHAT quantity
that null condition measures.

## Tutor Actions

WORKED-EXAMPLE (zero-current-at-null circuit analysis, showing
V_terminal=ε); COMPARE-CONTRAST (electronics variable resistor vs.
physics null-balance instrument, side by side); ANALOGY (the
head-on-pushing standoff analogy for the null condition).

## Voice Teaching Notes

Listen for "potentiometer" used as a synonym for a simple variable
resistor, or an assumption it measures terminal (loaded) voltage — the
two direct misconception tells. Load-bearing sentence: "in physics, a
potentiometer is a null-balance instrument, not a volume knob — and at
that null point, zero current flows, so what you're actually reading is
the TRUE EMF, not the voltage under load." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner conflating the physics potentiometer with an electronics
variable resistor signals
MC-POTENTIOMETER-IS-JUST-A-VARIABLE-RESISTOR (MISCONCEIVING, full repair
via the side-by-side comparison). A learner claiming the potentiometer
reads terminal voltage signals
MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE (full repair via the
zero-current circuit analysis). Mastery trigger: correctly distinguishing
the physics instrument from the electronics component, AND correctly
explaining why the null condition yields true EMF. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the wire and galvanometer setup for a
second — at the exact balance point, does the galvanometer read zero
current or some nonzero value?" (isolating the zero-current fact before
reasoning about what it implies). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (distinct-device disambiguation; zero-current null yields true
EMF) bound to procedure (null-point circuit analysis). Interleave with
`phys.em.kirchhoffs-laws`, `phys.em.emf` (the terminal-voltage-vs-EMF
distinction this concept directly exploits), and `phys.em.wheatstone-bridge`
(sibling concept at this same dependency level, another null-measurement
technique).

## Transfer Connections

Near: any EMF-measurement problem requiring the null-balance technique.
Far: electrical metrology (precision voltage-standard measurement
historically relying on potentiometric null methods) and instrumentation
engineering (the general null-measurement principle underlying many
precision sensors). Real-world: understanding why historically,
potentiometers were the gold-standard method for calibrating voltage
references before modern digital voltmeters existed. Expert: the
potentiometer as one instance of the general null-measurement principle
shared with the Wheatstone bridge.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 9): initial authoring.
