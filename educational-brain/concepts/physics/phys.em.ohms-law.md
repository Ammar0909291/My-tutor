# Ohm's Law and Resistance — `phys.em.ohms-law`

## Identity

- **Concept ID**: `phys.em.ohms-law` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 6,
  the entry point into circuit analysis proper.
- **Prerequisites**: `phys.em.electric-current` and `phys.em.electric-potential`
  — the load-bearing parts are current as charge flow rate and potential
  difference as the "push" driving that flow; Ohm's law is the specific,
  empirical relationship connecting these two already-secure quantities via
  resistance.
- **Unlocks** (from KG): `phys.em.ac-basics`, `phys.em.dc-circuits`,
  `phys.em.electrical-power`, `phys.em.resistivity` — this concept is a
  genuine hub, with four direct downstream dependents.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state Ohm's law, V = IR, and correctly identify it as
an empirical relationship holding for many but not all conductors (an
"ohmic" material), not a universal law of nature true for every circuit
element under all conditions; (2) correctly compute any one of voltage,
current, or resistance given the other two, for a simple resistive circuit
element; (3) correctly explain what resistance physically represents (a
material and geometric property describing how strongly a conductor
opposes current flow for a given voltage) and correctly distinguish it from
voltage and current themselves, which are not fixed properties of a
component but rather depend on the specific circuit conditions applied;
(4) correctly identify at least one non-ohmic device (e.g., a diode, a
lightbulb filament at varying temperature) and explain why V = IR does not
hold as a fixed, constant-resistance relationship for such devices.

## Core Understanding

Ohm's law, V = IR, is an empirical relationship — discovered by careful
measurement, not derived from a more fundamental principle in the way
F = ma follows from Newton's definitions — describing that for many
conductors (called "ohmic" materials, most metals under normal conditions
being good examples), the current through the conductor is directly
proportional to the voltage applied across it, with the constant of
proportionality (resistance, R) remaining fixed regardless of the specific
voltage or current values involved. Resistance itself is a genuine physical
property of the conductor (depending on its material, length, and
cross-sectional area, formalized fully in `phys.em.resistivity`), analogous
to how a narrow pipe resists water flow more than a wide one — it is a fixed
characteristic of the conductor, not something that changes from one
measurement to the next for an ohmic material. Critically, Ohm's law is not
universally true: many important devices (diodes, transistors, lightbulb
filaments whose resistance changes significantly with temperature) are
non-ohmic, meaning their V-I relationship is nonlinear — R is not constant,
but itself depends on V or I — and for these devices, "resistance" at a
given operating point (V/I at that specific point) is still a meaningful,
computable number, but it is not a fixed material constant the way it is
for an ohmic resistor.

## Mental Models

**Beginner (arriving model)**: "Ohm's law, V = IR, is THE equation for any
circuit — plug in two known values, solve for the third." This model treats
V = IR as an unconditionally applicable formula, with no awareness that it
is an empirical approximation valid only for a specific class of materials
under specific conditions. Upgrade trigger: presenting a genuinely
non-ohmic device's measured V-I data (a curve, not a straight line through
the origin) and asking whether a single, fixed R value can describe it
directly confronts the "always applicable" assumption.

**Intermediate**: "Ohm's law holds for ohmic materials, where resistance is
a fixed constant, but not for non-ohmic devices, where the V-I relationship
is nonlinear." This model correctly registers the boundary of the law's
validity, but often still treats current and voltage as interchangeable
"whichever one you're not solving for" quantities without a clear sense
that voltage is the driving cause and current the resulting effect
(resistance mediating between them) — a subtlety that matters once circuit
analysis moves beyond single-element problems.

**Advanced**: "Voltage is the cause (the potential difference driving
charge flow); current is the effect (the resulting flow rate); resistance
is the fixed proportionality constant relating them FOR OHMIC MATERIALS
ONLY — for non-ohmic devices, 'resistance' at a given point (V/I there) is
still computable but is not predictive of behavior at other points." This
model explicitly establishes the causal direction (voltage drives current,
mediated by resistance) and the precise scope-limiting condition for when
a single R value is genuinely predictive versus merely descriptive at one
operating point.

**Expert**: "Ohm's law, at the microscopic level, follows from a simple
model of electron motion in a conductor (the Drude model) where a constant
drift velocity proportional to applied field arises from frequent
collisions with the lattice — this microscopic picture also explains WHY
some materials (with more complex, field- or temperature-dependent
scattering mechanisms) fail to be ohmic." Not required for mastery, but
worth flagging as the "there's a physical mechanism underneath this
empirical law" fact for a student ready for it.

## Why Students Fail

The dominant failure mode is over-universalization: because Ohm's law is
introduced very early and used constantly in simple circuit problems,
students rarely encounter an explicit counterexample until much later, by
which point V = IR has become so automatic that many students genuinely
believe it is a universal law (comparable to conservation of energy) rather
than an empirical, material-dependent approximation — leading to confusion
or outright incorrect reasoning the first time they meet a diode or other
manifestly nonlinear device.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.em.ohms-law.md`,
Component 3 — Misconception Profiles) documents two misconceptions in
full; reused by reference with birth-type classification added.

- **MC-OHMS-LAW-IS-UNIVERSAL**: the belief that V = IR holds for every
  circuit element under all conditions, with resistance always a fixed,
  constant property. **Birth type**: overgeneralization (Type 1) — Ohm's
  law is taught early, practiced almost exclusively on ohmic resistors, and
  never explicitly bounded until a non-ohmic device is introduced (often
  much later), so the formula's universal-seeming applicability in every
  early example generalizes into an assumed universal law. Detection probe:
  "Does a lightbulb filament, or a diode, have a truly constant resistance
  no matter what voltage is applied, the same way an ideal resistor does?"
  An answer of "yes, always" reveals this misconception.
- **MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE**: the belief that current
  and voltage are simply two equivalent ways of describing "how strong" an
  electrical effect is, with no clear causal distinction — i.e., failing to
  recognize that voltage is the driving potential difference (the "push")
  while current is the resulting flow rate (the "response"), mediated by
  resistance. **Birth type**: language contamination (Type 3) — everyday
  language often uses "electricity," "power," and "voltage" loosely and
  interchangeably (e.g., describing a shock as "high voltage" and a
  dangerous current as also just "electricity"), without the causal
  voltage-drives-current-via-resistance structure being made explicit.
  Detection probe: "In a circuit, is voltage the CAUSE of current flowing,
  or are voltage and current just two different names for the same thing?"
  An answer treating them as interchangeable/undifferentiated reveals this
  misconception.

## Analogies

**Best analogy — water pressure, flow rate, and pipe resistance.** Voltage
is like water pressure (the driving push), current is like the flow rate
of water (gallons per minute, the resulting effect), and resistance is like
how narrow or clogged the pipe is (a fixed property of the pipe itself, for
an "ohmic" pipe) — pressure drives flow, mediated by the pipe's resistance
to flow, directly establishing the causal voltage→current relationship
mediated by resistance, targeting MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE.
**Breaking point**: real pipes can behave nonlinearly too (turbulent flow
at high pressure doesn't follow a simple proportional relationship), which
can actually be turned into an ASSET here — a pipe that becomes more
resistant to flow at very high pressure is itself a rough analog for a
non-ohmic device, useful for the elastic-limit-style boundary-condition
point (MC-OHMS-LAW-IS-UNIVERSAL) if the analogy is extended deliberately.

**Alternative analogy — a crowd funneling through a doorway.** The "push"
of a crowd trying to get through a door (voltage) determines how many
people per second squeeze through (current), and the doorway's width
(resistance) determines how much push is needed for a given flow rate — a
narrower doorway (higher resistance) needs more push (higher voltage) for
the same flow (current).

**Story analogy**: Georg Ohm's own 1827 publication, initially poorly
received and even professionally damaging to his career (some contemporary
physicists dismissed his systematic, careful measurements as unnecessarily
mathematical for a physical phenomenon), yet ultimately vindicated and named
after him — a worthwhile brief historical note on how genuinely careful
empirical measurement can face initial resistance (no pun intended) before
being recognized as foundational.

**Visual analogy**: a V-I graph showing a straight line through the origin
for an ohmic resistor, directly contrasted with a curved, non-straight-line
V-I graph for a diode or lightbulb filament on the same axes — this single
diagram directly and visually counters MC-OHMS-LAW-IS-UNIVERSAL by making
the boundary between ohmic and non-ohmic behavior graphically explicit.

**Anti-analogy**: do NOT describe resistance as "how much voltage a
component uses up" — this framing conflates resistance (a material
property) with voltage drop (a circuit-specific outcome depending on both
resistance AND current), and can reinforce confusion between the cause
(voltage/resistance) and effect (current) relationship this concept
depends on keeping distinct.

## Demonstrations

**Physical**: measure current through a fixed resistor at several different
applied voltages, plotting V vs. I to show the resulting straight line
(verifying Ohm's law directly), then repeat with an LED or diode, showing
the resulting nonlinear curve — directly targets MC-OHMS-LAW-IS-UNIVERSAL
with side-by-side observable contrast.

**Digital/interactive**: a circuit simulator allowing the learner to build
simple resistive circuits and directly manipulate voltage, observing the
resulting current, with a toggle to swap in a non-ohmic device (diode
model) for direct comparison.

**Teacher-demo with elicited prediction**: before revealing the diode's
V-I curve, ask "will this diode's resistance (V divided by I) stay the same
at every voltage, the way this resistor's does, or will it change?" —
directly surfacing MC-OHMS-LAW-IS-UNIVERSAL for diagnosis before the
demonstration provides the answer.

## Discovery Questions

**Argued call: a genuine discovery design fits well here.** Need: "is there
a fixed, predictable relationship between voltage and current for EVERY
electrical component, or does it depend on what the component is?"
Playground: the learner measures (or uses simulated data for) several
different components' V-I behavior — a resistor, a lightbulb filament, a
diode — recording the resulting data for each. Invention: the learner is
guided to notice that the resistor's data forms a clean straight line
(constant R = V/I at every point) while the diode's data does not (V/I
changes depending on where you measure), proposing that some components
have "constant resistance" and some don't. Collision: present the
lightbulb-filament data (nonlinear, since a hot filament has significantly
higher resistance than a cold one) as an intermediate test case, since a
lightbulb intuitively "feels" like a normal, everyday resistive device
despite being measurably non-ohmic. Formalization: name Ohm's law
explicitly as the specific, empirical relationship holding for ohmic
materials, and name resistance as the (only-for-ohmic-materials) constant
proportionality factor. Compression: "V = IR is a genuine, useful, and
common relationship — but it's a description of SOME materials' behavior,
not a universal law every device must obey."

## Teaching Sequence

This concept's Blueprint (Component 5 — Lesson Composition Grammar)
provides the turn-by-turn script; cited by reference. The concept-specific
sequencing logic this entry adds: MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE
should be surfaced and repaired FIRST, before any V = IR calculation
practice, since a student who has not internalized the causal
voltage-drives-current structure will treat V = IR as an arbitrary,
un-interpretable algebra formula ("solve for whichever letter is missing")
rather than a meaningful physical relationship, making later
non-ohmic-device reasoning (which depends on understanding WHY the ratio
V/I can change) much harder to teach. MC-OHMS-LAW-IS-UNIVERSAL should be
addressed only once basic V = IR fluency (with ohmic resistors) is fully
secure — introducing non-ohmic exceptions too early, before the rule itself
is trusted, risks the learner concluding the whole relationship is
unreliable rather than understanding it as valid-for-a-specific-material-class.

## Tutor Actions

From `../teaching-actions/*`: ANALOGY (the water-pressure/flow/pipe-resistance
framing) fits well as an opening move for
MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE. WORKED-EXAMPLE (computing V, I,
or R from the other two for several ohmic-resistor scenarios) fits the core
computational objective. DEMONSTRATION (the resistor-vs-diode V-I
measurement contrast) is the best-fit action for MC-OHMS-LAW-IS-UNIVERSAL,
since direct observed nonlinearity is more convincing than verbal
description alone. GAME does not fit especially well here — the core
content is a specific empirical relationship and its scope boundary, best
served by direct measurement/calculation practice.

## Voice Teaching Notes

Listen for a learner treating V = IR purely as "an equation with three
letters, solve for whichever one's missing" with no reference to which
quantity is the cause and which is the effect — this pattern (correct
algebra, absent physical reasoning) is the tell for
MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE, distinct from a computational
error. The load-bearing sentence to slow down on is the empirical-scope
statement itself — "this relationship holds for MANY but not ALL
materials" — since compressing this into a rushed aside is exactly how the
universal-law misconception persists unchallenged through years of
exclusively-ohmic practice problems. General channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident "yes, always constant" answer to the non-ohmic-device
probe signals MC-OHMS-LAW-IS-UNIVERSAL firmly held (MISCONCEIVING
quadrant, full repair via the resistor-vs-diode demonstration required). A
correct answer delivered with visible uncertainty suggests the boundary
concept is present but not yet confidently held. Mastery-certification
trigger: the learner correctly computes any one of V, I, R from the other
two for an ohmic scenario, AND correctly identifies at least one real
non-ohmic device while explaining why its resistance is not a fixed
constant, without external cueing. This concept's Blueprint (Component 6 —
Assessment Items) contains the full item bank; check there before
authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "I don't know which value goes
where" expressed when a learner struggles to set up a V = IR calculation —
this is usually a symptom of MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE
rather than pure algebra difficulty, and the concept-specific shrink-to
question is "forget the formula for a second — if you push harder
(more voltage), does more or less current flow?" (isolating the causal
direction before re-introducing the specific algebraic rearrangement). See
`../foundations/01-recovery-engine.md` for generic engine mechanics.

## Memory Hooks

Concept type: procedure (the V = IR calculation) bound to a concept (the
causal voltage→current relationship and the ohmic/non-ohmic scope
boundary) — review should alternate between quick calculation retrieval and
a conceptual check ("name a device where Ohm's law does not hold, and
explain why"), since a learner can be fluent at the arithmetic while still
holding MC-OHMS-LAW-IS-UNIVERSAL underneath. Interleaving partners:
`phys.em.electric-current` and `phys.em.electric-potential` (the two
already-secure quantities this concept relates) and, once authored,
`phys.em.resistivity` (the deeper material/geometric basis of resistance
itself).

## Transfer Connections

**Near transfer**: any single-element or simple-network resistive circuit
problem, directly building toward `phys.em.dc-circuits`' series/parallel
resistor networks. **Far transfer**: electronics design broadly, where
correctly distinguishing ohmic components (resistors) from non-ohmic ones
(diodes, transistors, LEDs) is a foundational, everyday professional
distinction. **Real-world transfer**: understanding why a lightbulb draws
much more current the instant it's switched on (when its filament is cold
and has lower resistance) than once it's glowing hot (higher resistance) —
a direct, observable non-ohmic phenomenon in a familiar household device.
**Expert-transfer**: recognizing Ohm's law as an empirical, material-
dependent relationship rather than a fundamental law — a template for how
to evaluate ANY "law" encountered in physics for its actual scope of
validity, rather than assuming universal applicability by default.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. A genuine,
KG-unencoded connection exists to computer science (digital circuit design
and semiconductor device behavior, both of which depend directly on
understanding ohmic vs. non-ohmic components) — not currently captured as a
cross_link. Recorded as Curriculum Feedback below.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.em.ohms-law.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Profiles** (both misconceptions, birth-type classification
added, not re-derived), **Component 5 — Lesson Composition Grammar** (cited
in Teaching Sequence), and **Component 6 — Assessment Items** (cited in
Assessment Signals). Not restated here: Component 0 (Concept Identity &
Metadata), Component 1 (Concept Explanation Multi-Tier), Component 2
(Worked Examples), Component 4 (Practice Set), Component 7 (Retrieval
Spacing Schedule), Component 8 (Prerequisite & Unlock Map).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

The KG's `cross_links` field is empty despite a genuine, pedagogically
useful connection to computer science's digital/semiconductor circuit
content. Flagged for the Curriculum Production Pipeline's own backlog, not
fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
