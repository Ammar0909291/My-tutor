# First Law of Thermodynamics — `phys.therm.first-law`

## Identity

- **Concept ID**: `phys.therm.first-law` (canonical physics KG)
- **Curriculum location**: physics / thermodynamics — dependency level 7.
- **Prerequisites**: `phys.therm.internal-energy` (the load-bearing part:
  the law's ΔU term is exactly the already-secure internal energy concept)
  and `phys.mech.work` (the law's W term is the already-secure mechanical
  work concept, generalized to include gas expansion/compression work).
- **Unlocks** (from KG): `phys.therm.thermodynamic-processes`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) state the first law of thermodynamics, ΔU = Q − W
(or ΔU = Q + W depending on sign convention for work), and correctly
explain it as a statement of energy conservation applied to a
thermodynamic system: heat added increases internal energy or is used to
do work, with no energy created or destroyed; (2) correctly apply the law
to specific processes (isothermal, adiabatic, isobaric, isochoric),
correctly identifying which terms are zero or simplified in each case;
(3) correctly explain that "adiabatic" means NO HEAT TRANSFER (Q = 0), NOT
constant temperature, correctly distinguishing an adiabatic process
(which can and typically does change temperature) from an isothermal one.

## Core Understanding

The first law of thermodynamics, ΔU = Q − W (heat added minus work done
BY the system, using the physics convention), is simply conservation of
energy applied to a thermodynamic system: any energy added as heat either
increases the system's internal energy or is spent doing work on the
surroundings (or both), with the books always balancing exactly — no
energy is created or destroyed in the process. Work here is not limited to
mechanical work in the narrow F·d sense already known — it explicitly
includes work done BY or ON a gas as it expands or is compressed (W = ∫P dV
for a gas), a direct generalization of the already-secure mechanical work
concept to a new context (a gas pushing a piston, or being pushed). A
critical, frequently confused term is "adiabatic," which specifically
means NO HEAT TRANSFER occurs (Q = 0) — an adiabatic process can and
typically DOES change temperature (compress a gas adiabatically and it
heats up, purely from the work done on it, with zero heat exchanged with
the surroundings) — this is fundamentally different from an ISOTHERMAL
process (constant temperature, which instead requires Q ≠ 0 to compensate
for any work done, keeping ΔU = 0 throughout).

## Mental Models

**Beginner**: "Adiabatic means the temperature stays constant." Upgrade
trigger: a bicycle pump heating up as it's compressed (in a well-insulated,
i.e. near-adiabatic sense) with no heat added from outside directly
confronts this — temperature clearly changed despite (near) zero heat
transfer.

**Intermediate**: "ΔU = Q − W is energy conservation; adiabatic means
Q = 0 (temperature CAN and usually does change); isothermal means constant
T (ΔU = 0 for an ideal gas, so Q = W)." This model correctly distinguishes
adiabatic from isothermal, but sometimes still treats "work" as limited to
simple mechanical F·d rather than recognizing gas expansion/compression
work (∫P dV) as the same underlying concept in a new context.

**Advanced**: "Work done BY an expanding gas is W = ∫P dV — a direct
extension of F·d work to a system where the 'distance' is volume change
and the 'force-equivalent' is pressure; recognizing this connects gas
thermodynamics directly back to already-secure mechanics."

**Expert**: the first law's differential form, dU = δQ − δW, with Q and W
being path-dependent (not state functions, unlike U) — a subtlety
underlying why the SAME ΔU can be achieved via many different Q/W
combinations depending on the specific process path — not required for
mastery but a natural extension for a ready student.

## Why Students Fail

The dominant failure is the adiabatic/isothermal conflation, treating
"adiabatic" (no heat transfer) as if it meant "no temperature change,"
because both terms evoke "nothing happening thermally" in casual,
undifferentiated intuition.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.therm.first-law.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE**: adiabatic conflated with
  isothermal, assuming no heat transfer implies no temperature change.
  **Birth type**: language contamination (Type 3) — both terms describe a
  restricted/special thermodynamic process without clearly differentiated
  everyday vocabulary cues, inviting conflation. Probe: "A gas is
  compressed adiabatically (perfectly insulated, no heat enters or
  leaves). Does its temperature change?"
- **MC-WORK-IS-ONLY-MECHANICAL**: failing to recognize gas expansion/
  compression work (∫P dV) as a genuine instance of "work," expecting only
  literal F·d mechanical work to count in the first law. **Birth type**:
  overgeneralization (Type 1) — "work" was first learned in the narrow
  F·d mechanical context, and its generalization to P dV for a gas is not
  automatically recognized as the same concept. Probe: "A gas expands,
  pushing a piston outward. Is the gas doing 'work' in the same physics
  sense as a person pushing a box?"

## Analogies

**Best**: a sealed, perfectly insulated thermos being shaken vigorously —
no heat enters or leaves (adiabatic, Q = 0), yet the liquid's temperature
rises purely from the mechanical work of shaking being converted to
internal energy. Directly targets MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE
by showing temperature change with zero heat transfer.

**Anti-analogy**: do NOT say "adiabatic means nothing changes thermally"
— directly installs MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE; always
specify "no HEAT transfer, though temperature and internal energy can
absolutely still change via work."

## Demonstrations

Physical: a bicycle pump with the outlet blocked, compressed rapidly (near-
adiabatic, minimal time for heat exchange) — the pump barrel noticeably
warms, directly demonstrating temperature rise with negligible heat
transfer, targeting MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE. Diagram: a
gas-filled cylinder with a piston, explicitly labeling the piston's
displacement and the gas pressure, computing W = ∫P dV alongside a
familiar F·d mechanical work diagram side by side — targets
MC-WORK-IS-ONLY-MECHANICAL.

## Discovery Questions

Discovery-style: "if a gas is compressed in a perfectly sealed, insulated
container (no heat can escape), does its temperature stay the same?" —
learner predicts, then the bicycle-pump demonstration resolves it, directly
confronting MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE.

## Teaching Sequence

Blueprint's teaching-action component cited by reference.
MC-WORK-IS-ONLY-MECHANICAL repaired first (establishing gas expansion/
compression work as genuine work, generalizing the already-secure F·d
concept), before MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE, since correctly
recognizing work as a real energy-transfer term makes "temperature can
change via work alone, with zero heat" a natural consequence of ΔU = Q − W
rather than a special, memorized exception.

## Tutor Actions

DEMONSTRATION (bicycle pump warming); WORKED-EXAMPLE (ΔU = Q − W applied
across isothermal, adiabatic, isobaric, isochoric processes side by side);
ERROR-ANALYSIS (a solution assuming adiabatic implies constant
temperature).

## Voice Teaching Notes

Listen for "adiabatic" and "isothermal" used interchangeably or reasoned
about identically — the direct MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE
tell. Load-bearing sentence: "adiabatic means no HEAT transfer — the
temperature can still change, through work." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner stating an adiabatically-compressed gas's temperature "stays the
same" signals MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE (MISCONCEIVING,
full repair via the bicycle-pump demonstration). Mastery trigger: correctly
applying ΔU = Q − W across all four standard process types, AND correctly
explaining why adiabatic compression raises temperature despite zero heat
transfer. Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget heat for a second — is any WORK being done on
or by this gas right now?" (isolating the work term before reintroducing
the full ΔU = Q − W balance). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (adiabatic vs. isothermal distinction) bound to procedure
(ΔU = Q − W applied per process type). Interleave with
`phys.therm.internal-energy` and `phys.mech.work`, and, once authored,
`phys.therm.thermodynamic-processes`.

## Transfer Connections

Near: any heat-engine-cycle problem, including refrigeration and
combustion engine analysis. Far: meteorology (adiabatic cooling/warming of
rising/descending air parcels, directly using this concept's exact
definition) and engine engineering (compression-ignition diesel engines
rely on adiabatic-compression heating). Real-world: why a can of
compressed air spray feels cold when used (rapid, near-adiabatic
expansion cools the remaining gas) and why a bicycle pump barrel warms
during use. Expert: the first law's differential, path-dependent form
distinguishing Q and W from the state function U.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to chemistry
(thermochemistry, enthalpy, and the first law's application to chemical
reaction energy balances) not currently captured as a cross_link —
recorded as Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
teaching-action/assessment components by reference. Not restated: Concept
Identity, Explanation Blocks, Worked Examples, Retrieval & Spacing
Schedule, Adaptive Branching, Visualisation Specification, Validation
Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine connection to chemistry's
thermochemistry content. Flagged for the Curriculum Production Pipeline's
backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
