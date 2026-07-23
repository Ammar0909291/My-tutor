# Energy Stored in a Capacitor — `phys.em.energy-capacitor`

## Identity

- **Concept ID**: `phys.em.energy-capacitor` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.capacitance` — the load-bearing part is the
  already-secure C = Q/V relationship, integrated over the charging
  process to derive stored energy.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state the energy stored in a charged capacitor,
U = ½QV = ½CV² = Q²/2C, and correctly explain WHY the factor of ½ appears
— because voltage across the capacitor rises progressively FROM ZERO as
charge accumulates, so the AVERAGE voltage during charging is half the
final voltage, not the final voltage throughout; (2) correctly explain
that this stored energy resides in the ELECTRIC FIELD between the plates,
not "on" the plates/charges themselves as a separate quantity; (3) correctly
explain that a real capacitor does not discharge instantaneously through a
finite resistance — discharge takes a characteristic time (related to
the RC time constant), during which stored energy is progressively
converted to another form (typically heat).

## Core Understanding

The energy stored in a charged capacitor, U = ½QV = ½CV² = Q²/2C, carries
a crucial factor of ½ that distinguishes it from the naive "just multiply
charge by voltage" expectation (which would apply if the FULL voltage V
acted on the FULL charge Q throughout charging) — in reality, charging a
capacitor is a progressive process: at the start, both charge and voltage
are zero, and both rise together (proportionally, via Q = CV) until
reaching their final values, so the AVERAGE voltage experienced by the
charge as it accumulates is exactly V/2, not V, producing energy = (average
voltage) × (total charge) = ½QV. This stored energy is not a property
"attached to" the charges sitting on the plates — it resides in the
ELECTRIC FIELD occupying the space between the plates (a field-energy
perspective directly connecting to the general concept that electric and
magnetic fields themselves store energy, not just the charges/currents
that create them). A real capacitor, connected to a real (nonzero)
resistance, discharges progressively over a characteristic time (the RC
time constant) rather than instantaneously — during this discharge, the
stored electric-field energy converts (typically to heat in the
resistance) at a rate that itself changes over time as the remaining
charge/voltage decreases.

## Mental Models

**Beginner**: "Energy stored = QV" (missing the factor of ½). Upgrade
trigger: asking why the SAME final Q and V don't simply multiply directly,
tracing through the progressive charging process, directly confronts the
missing-factor assumption.

**Intermediate**: "U = ½QV = ½CV², because voltage rises progressively
from zero, averaging V/2 over the whole charging process." This model
correctly derives the factor of ½, but sometimes still imagines the energy
as somehow "stored on" the charges themselves rather than in the
surrounding field.

**Advanced**: "Stored energy resides in the electric field occupying the
space between the plates — this is a general principle (fields themselves
carry energy), not specific to capacitors, and directly parallels how
magnetic fields store energy in an inductor (`phys.em.self-inductance`)."

**Expert**: energy density of the electric field, u = ½ε₀E² (energy per
unit volume), allowing stored energy to be computed by integrating over
the field region directly, rather than via the circuit-level Q/V/C
relationship — not required for mastery but a natural extension.

## Why Students Fail

The dominant failure is the missing-factor-of-½: because Q = CV (no factor
of ½) is the more frequently practiced, more visually similar relationship,
students often write energy = QV directly by pattern-matching, without
tracing through why charging is a progressive (not instantaneous, full-voltage-
throughout) process.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.energy-capacitor.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ENERGY-STORED-ON-THE-PLATES**: stored energy imagined as a property
  attached directly to the charges/plates themselves, rather than residing
  in the surrounding electric field. **Birth type**: perceptual intuition
  (Type 2) — the plates and charges are the visually/conceptually salient
  objects, while the field occupying the space between them is less
  perceptually available as "a thing that can store energy." Probe: "Where
  is a charged capacitor's stored energy actually located — on the metal
  plates themselves, or somewhere else?"
- **MC-CAPACITOR-DISCHARGES-INSTANTLY**: belief a capacitor discharges its
  stored energy instantaneously once a conducting path is provided,
  ignoring the finite RC time constant. **Birth type**: overgeneralization
  (Type 1) — idealized circuit diagrams often omit explicit resistance,
  and "current flows the instant a path exists" is a reasonable but
  incomplete simplification carried over from simpler circuit contexts.
  Probe: "A charged capacitor is connected to a resistor. Does all its
  stored energy discharge in a single instant, or does the process take a
  characteristic amount of time?"

## Analogies

**Best**: filling a water tank from empty to full, then asking "what was
the AVERAGE water level during filling?" — halfway between empty and full,
not full-the-whole-time — directly targets the missing-factor-of-½ by
making the progressive-rise/averaging argument concrete and familiar.

**Anti-analogy**: do NOT say "energy stored = charge times voltage" as a
bare, unqualified formula — omits the essential factor of ½, directly
inviting MC (the missing-factor error), even if not one of the two named
Blueprint misconceptions specifically.

## Demonstrations

Physical: charge a real capacitor through a resistor and discharge it
through an LED or small motor, timing the visible fade/slow-down — directly
targets MC-CAPACITOR-DISCHARGES-INSTANTLY by showing a measurable,
non-instantaneous discharge duration. Conceptual: derive U = ½QV
step-by-step from the progressive-charging (voltage rising from 0 to V)
argument, explicitly computing the average voltage — targets the
missing-factor issue directly.

## Discovery Questions

Discovery-style: "if a capacitor charges from 0 volts up to its final
voltage V, was the FULL voltage V acting on ALL the charge the whole time,
or did voltage rise progressively too?" — learner reasons through the
progressive-charging picture, directly deriving the averaging argument
that produces the factor of ½ before being given the formula.

## Teaching Sequence

Blueprint's practice-set and assessment components cited by reference.
The missing-factor-of-½ derivation is addressed first (establishing the
progressive-charging/averaging argument), before
MC-ENERGY-STORED-ON-THE-PLATES, since trusting the derivation (which
naturally involves integrating over the charging process, an inherently
field-and-process-oriented view) primes the field-location correction
more receptively than introducing it in isolation.
MC-CAPACITOR-DISCHARGES-INSTANTLY is addressed via the timed-discharge
demonstration as its own, largely independent correction.

## Tutor Actions

WORKED-EXAMPLE (deriving U = ½QV from the progressive-charging argument);
DEMONSTRATION (timed capacitor discharge through a resistor/LED);
ANALOGY (water-tank average-fill-level).

## Voice Teaching Notes

Listen for "energy equals charge times voltage" stated without the factor
of ½ — the direct missing-factor tell. Load-bearing sentence: "voltage
rises from zero as the capacitor charges, so the AVERAGE voltage is half
the final value — that's where the ½ comes from." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner computing U = QV (no ½) signals the missing-factor
misconception (fast, confident — MISCONCEIVING, full repair via the
progressive-charging derivation). A learner claiming instantaneous
discharge signals MC-CAPACITOR-DISCHARGES-INSTANTLY (full repair via the
timed-discharge demonstration). Mastery trigger: correctly deriving and
applying U = ½QV = ½CV² = Q²/2C, AND correctly stating discharge through a
resistor takes a characteristic finite time. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the final voltage for a second — what was the
voltage right at the very START of charging?" (isolating the
zero-starting-point before building the averaging argument). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Procedure (U = ½QV derivation and application) bound to a concept
(field-based energy location; finite discharge time). Interleave with
`phys.em.capacitance` and, once authored, `phys.em.dielectrics` (sibling
concept at this same dependency level) and `phys.em.self-inductance`
(the direct energy-storage parallel for inductors, ½LI²).

## Transfer Connections

Near: any capacitor energy-calculation problem, including camera flash
circuits (rapid capacitor discharge for a bright, brief flash). Far:
defibrillator design (medical devices storing and rapidly discharging
capacitor energy through a patient) and power-electronics energy-storage
systems. Real-world: why a camera flash needs a brief recharge time
between shots (RC-time-constant-governed charging) and why capacitors in
electronics can retain a dangerous charge even after power is switched
off. Expert: electric field energy density, u = ½ε₀E², enabling
field-based (rather than circuit-based) energy calculations.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
practice-set/assessment components by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
