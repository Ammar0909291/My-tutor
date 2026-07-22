# Self-Inductance — `phys.em.self-inductance`

## Identity

- **Concept ID**: `phys.em.self-inductance` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 6.
- **Prerequisites**: `phys.em.faradays-law` — the load-bearing part is
  applying Faraday's law (and, implicitly, Lenz's law's directional
  reasoning) to a coil's OWN changing current and its OWN resulting flux,
  rather than to an external, separate source of changing flux.
- **Unlocks** (from KG): `phys.em.lc-circuits` (inductors paired with
  capacitors in oscillating circuits), `phys.em.mutual-inductance`
  (extending self-inductance's single-coil reasoning to a pair of coupled
  coils).
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) explain that self-inductance describes a coil's own
ability to oppose CHANGES in its own current, via a back-EMF given by
ε = −L dI/dt, and correctly distinguish this from Ohm's-law-style
opposition to current itself (an inductor does not resist steady, unchanging
current at all — only changes in current); (2) correctly explain that a
larger inductance L means a stronger opposition to current CHANGE (a larger
back-EMF for a given rate of current change), and correctly compute back-EMF
given L and dI/dt; (3) correctly explain why energy is stored in an
inductor's magnetic field while current flows, and correctly reason about
what happens to that stored energy when current is abruptly interrupted
(the classic "inductive kick," a large voltage spike, as the inductor
resists the sudden current change); (4) correctly apply Lenz's-law-style
directional reasoning to determine the back-EMF's polarity for both
increasing and decreasing self-current scenarios.

## Core Understanding

Self-inductance, L, is a fixed geometric/material property of a coil (or
any current-carrying loop) describing how strongly that coil generates a
back-EMF opposing CHANGES in its own current, ε = −L dI/dt — the negative
sign is a direct Lenz's-law consequence: the induced back-EMF always acts to
oppose whatever change in current is occurring, whether that change is an
increase (back-EMF opposes the increase, effectively resisting the current
from rising as fast as it otherwise would) or a decrease (back-EMF opposes
the decrease, effectively trying to sustain the current a little longer
than it otherwise would). Critically, self-inductance opposes CHANGE in
current, not current itself — a coil carrying a large, perfectly steady
(DC, unchanging) current experiences zero self-induced back-EMF, since
dI/dt = 0 for steady current, regardless of how large that steady current
is. This is exactly analogous to how mechanical inertia (mass) resists
changes in velocity but exerts no resistance to steady, constant velocity
motion — self-inductance is often described as "electrical inertia" for
precisely this reason. Because a real inductor stores energy in its
magnetic field while current flows (U = ½LI²), abruptly interrupting that
current (e.g., opening a switch in an inductive circuit) forces the stored
magnetic energy to dissipate very quickly through whatever path remains
available, often producing a large voltage spike (the "inductive kick") —
this is not the inductor "resisting" being turned off in some vague sense,
but a direct, quantifiable consequence of the same back-EMF mechanism
trying (unsuccessfully, given typically limited alternative current paths)
to sustain the current through a suddenly much higher effective resistance.

## Mental Models

**Beginner (arriving model)**: "An inductor is a coil that opposes the flow
of current through it, similar to how a resistor does." This model
correctly captures "opposition" but incorrectly extends it to STEADY
current, rather than correctly restricting it to CHANGES in current — a
direct analogy overextension from the already-familiar resistor concept.
Upgrade trigger: asking whether a coil carrying a large, perfectly constant
current experiences any self-induced opposition at all directly confronts
the steady-state overextension.

**Intermediate**: "Self-inductance opposes CHANGES in current (ε = −L dI/dt),
not current itself; a steady current produces zero back-EMF regardless of
its magnitude." This model correctly separates change-opposition from
current-opposition, but often treats the ½LI² stored energy and the
inductive-kick phenomenon as separate, disconnected facts rather than a
single, unified consequence of the same back-EMF mechanism applied to a
sudden (rather than gradual) current change.

**Advanced**: "The inductive kick when a circuit is suddenly opened is not
a separate phenomenon — it is the SAME ε = −L dI/dt back-EMF mechanism,
just evaluated for an extremely large (ideally instantaneous, in practice
very rapid) dI/dt, producing a correspondingly large back-EMF spike as the
stored magnetic energy is forced to dissipate through whatever resistance
remains in the newly-broken circuit." This model unifies the storage
concept (½LI²) and the sudden-interruption phenomenon (inductive kick) as
two views of one underlying mechanism.

**Expert**: "Self-inductance is the 'electrical inertia' term in the full
circuit differential equation (analogous to mass in F = ma), and its
presence is what makes RL and LC circuits exhibit exponential or
oscillatory time-domain behavior rather than instantaneous switching — the
same mathematical structure (a first- or second-order linear differential
equation with a characteristic time constant) recurs across mechanical,
electrical, and thermal systems wherever an 'inertia-like' term opposes
rapid change." Not required for mastery, but worth flagging as the deep
mathematical-structure connection for a student ready for it.

## Why Students Fail

The dominant failure mode is resistor-analogy overextension: because
self-inductance is introduced using language ("opposition," "resists
current") that closely echoes resistance, and because inductors are
physically wired into circuits the same way resistors are, students
frequently import the "opposes current itself" model wholesale from
resistors, missing the single most important distinguishing fact — that
inductive opposition depends entirely on the RATE OF CHANGE of current, not
the current's magnitude, and vanishes completely for steady current no
matter how large.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.em.self-inductance.md`,
Component 3 — Misconception Engine) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-INDUCTOR-OPPOSES-CURRENT-FLOW**: the belief that an inductor
  opposes/resists current flow in general, the way a resistor does,
  including steady, unchanging current, rather than correctly
  understanding that inductive opposition applies ONLY to changes in
  current (dI/dt), with zero opposition to steady current regardless of
  magnitude. **Birth type**: analogy overextension (Type 6) — the already-
  secure resistor concept (opposition to current itself) is directly, but
  incorrectly, transferred to the inductor, since both are wired into
  circuits similarly and both are described using "opposition" language,
  without registering that the underlying physical mechanism (and
  therefore what specifically triggers the opposition) is entirely
  different. Detection probe: "A coil (inductor) carries a large, perfectly
  steady, unchanging current of 10 amps. Is there a back-EMF opposing this
  current right now?" An answer of "yes, since it's a large current" reveals
  this misconception (the correct answer is no back-EMF at all, since
  dI/dt = 0).
- **MC-LARGER-L-MEANS-MORE-ENERGY-STORED-AT-ALL-TIMES**: the belief that a
  larger inductance L always means more energy is currently stored in the
  inductor, regardless of the actual current flowing through it at that
  moment — failing to recognize that stored energy, U = ½LI², depends on
  BOTH L and the current I (specifically, I squared), so a large-L inductor
  carrying very little current can store LESS energy than a small-L
  inductor carrying a large current. **Birth type**: overgeneralization
  (Type 1) — "bigger property value should mean bigger stored quantity" is
  a broadly reasonable heuristic (bigger capacitance often correlates with
  more practical charge storage in typical circuit contexts) incorrectly
  extended to inductive energy storage without accounting for the current-
  dependence, which is actually the dominant (squared) factor in the
  formula. Detection probe: "Inductor A has twice the inductance of
  Inductor B, but Inductor A currently carries only 1 amp while Inductor B
  carries 10 amps. Which inductor is currently storing more energy?" An
  answer of "Inductor A, since it has more inductance" reveals this
  misconception (Inductor B, despite lower L, stores far more energy due to
  its much larger current, squared).

## Analogies

**Best analogy — a heavy flywheel (mechanical inertia).** A heavy flywheel
resists CHANGES in its rotational speed (it's hard to speed up or slow
down) but, once spinning at a constant speed, requires no ongoing force at
all to maintain that steady rotation (ignoring friction) — directly
paralleling self-inductance's resistance to changing current while offering
zero opposition to steady current. This directly targets
MC-INDUCTOR-OPPOSES-CURRENT-FLOW by anchoring "opposition to change, not to
the steady state itself" in an already-intuitive mechanical experience.
**Breaking point**: a flywheel's stored kinetic energy (½Iω², rotational
inertia times angular velocity squared) is mathematically identical in
FORM to an inductor's stored energy (½LI²) — this is a genuine, deep
structural parallel, not just a loose metaphor, and can be extended
explicitly to reinforce the energy-storage formula's structure as well.

**Alternative analogy — a large, heavy ship's momentum.** A massive
container ship moving at constant speed requires no force to maintain that
speed, but changing its speed (starting or stopping) requires enormous,
sustained force precisely because of its large mass/inertia — again
directly countering "opposition = resists existing state" in favor of
"opposition = resists change in state."

**Story analogy**: the discovery and early engineering harnessing of
self-inductance (Joseph Henry's independent, roughly contemporaneous
discoveries alongside Faraday, and the SI unit "henry" named in his honor)
is a worthwhile brief historical note.

**Visual analogy**: a graph showing steady DC current (a flat horizontal
line) alongside the corresponding back-EMF (a flat line AT ZERO, since
dI/dt = 0 throughout), directly contrasted with a graph showing current
being suddenly switched off (a near-vertical drop) alongside the resulting
back-EMF (a large, brief spike) — this pair of graphs directly and visually
counters MC-INDUCTOR-OPPOSES-CURRENT-FLOW by showing back-EMF is exactly
zero during steady current and nonzero only during the actual transition.

**Anti-analogy**: do NOT describe an inductor as "a resistor that also
stores some energy" — this framing directly installs
MC-INDUCTOR-OPPOSES-CURRENT-FLOW by suggesting inductive opposition is a
resistor-like, current-magnitude-dependent phenomenon rather than a
purely rate-of-change-dependent one.

## Demonstrations

**Physical**: build a simple RL circuit with a switch, an inductor, a
resistor, and an LED (or neon bulb) wired to visibly flash when the switch
is opened (demonstrating the inductive kick — a voltage spike well above
the driving battery's own voltage, sufficient to briefly light an LED wired
in the "wrong" polarity relative to the battery alone) — a dramatic,
memorable demonstration of stored magnetic energy being forced to dissipate
suddenly.

**Digital/interactive**: a circuit simulator showing an RL circuit's
current and back-EMF over time as a switch is closed (gradual current rise,
with back-EMF present only during the rise) and later opened (abrupt
current interruption, with a large back-EMF spike) — letting the learner
directly observe that back-EMF tracks dI/dt, not I itself.

**Teacher-demo with elicited prediction**: before switching off the RL
demonstration circuit, ask "will there be any voltage spike when I open
this switch, given that the current was perfectly steady just before I did
it?" — directly surfacing MC-INDUCTOR-OPPOSES-CURRENT-FLOW (a student
holding this misconception might predict a spike proportional to the
STEADY current alone, rather than correctly attributing the spike to the
sudden RATE of change).

## Discovery Questions

**Argued call: a genuine discovery design fits well here.** Need: "does a
coil resist current the same way a resistor does, or is something
different going on?" Playground: the learner (via the RL circuit
demonstration or simulator) observes current and back-EMF during three
distinct phases — switch-closing (rising current), steady-state (constant
current), and switch-opening (abrupt current interruption) — recording
back-EMF behavior in each phase. Invention: the learner is guided to notice
that back-EMF is present during the rising and falling phases but exactly
zero during the steady phase, proposing that the opposition must depend on
CHANGE, not the current's magnitude itself. Collision: present the
steady-large-current probe directly as a test of the learner's own
proposed rule ("is there back-EMF for a large STEADY current?"). Formalization:
name self-inductance and ε = −L dI/dt explicitly, connecting the formula's
dI/dt term to what the learner already observed. Compression: "an inductor
opposes CHANGE in current, not current itself — zero opposition to any
steady current, however large."

## Teaching Sequence

This concept's Blueprint (Component 6 — Session Flow Script) provides the
turn-by-turn script; cited by reference. The concept-specific sequencing
logic this entry adds: MC-INDUCTOR-OPPOSES-CURRENT-FLOW must be surfaced
and repaired FIRST, using the three-phase RL circuit demonstration
(rising/steady/falling), before the ½LI² energy-storage formula is
introduced — a student who believes inductors oppose current itself will
misinterpret the energy-storage formula as somehow representing "resistance
work" analogous to resistive heating, rather than correctly understanding
it as magnetic field energy that is fully recoverable (in an ideal
inductor), not dissipated. MC-LARGER-L-MEANS-MORE-ENERGY-STORED-AT-ALL-TIMES
should be addressed once the ½LI² formula itself is introduced, using a
direct side-by-side numeric comparison (Detection probe scenario) as the
repair mechanism, since this misconception is a straightforward formula-
weighting error rather than a deeper conceptual confusion.

## Tutor Actions

From `../teaching-actions/*`: DEMONSTRATION (the RL circuit inductive-kick
demonstration, run through all three current phases) is the best-fit
action for MC-INDUCTOR-OPPOSES-CURRENT-FLOW. ANALOGY (the flywheel/ship
inertia framing) fits well as a conceptual anchor before or alongside the
demonstration. WORKED-EXAMPLE (computing stored energy for pairs of
inductors with different L and I values, deliberately including cases where
the larger-L inductor stores LESS energy) directly targets
MC-LARGER-L-MEANS-MORE-ENERGY-STORED-AT-ALL-TIMES. ERROR-ANALYSIS
(presenting a worked comparison that ranks stored energy by L alone,
ignoring I) directly confronts the same misconception.

## Voice Teaching Notes

Listen for a learner describing an inductor as something current "has to
push through" or "fights against" in the same breath as describing steady
current — this conflated language is the verbal tell for
MC-INDUCTOR-OPPOSES-CURRENT-FLOW. The load-bearing sentence to slow down on
is the precise scope statement — "an inductor opposes CHANGE in current;
steady current, however large, produces zero opposition" — since any looser
paraphrase (e.g., simply "inductors oppose current") reintroduces exactly
the ambiguity this concept must resolve. General channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident "yes, back-EMF is present" answer to the steady-large-
current probe signals MC-INDUCTOR-OPPOSES-CURRENT-FLOW firmly held
(MISCONCEIVING quadrant, full repair via the three-phase demonstration
required). A hesitant or self-correcting answer suggests the distinction is
present but fragile. Mastery-certification trigger: the learner correctly
states that steady current produces zero self-induced back-EMF regardless
of magnitude, correctly computes back-EMF from a given dI/dt, and correctly
ranks stored energy for at least one pair of inductors where the
larger-L inductor stores LESS energy (due to a sufficiently smaller
current), without external cueing. This concept's Blueprint (Component 4 —
Assessment Probes) contains the full item bank; check there before
authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "so does the coil resist the
current or not?" expressed as genuine confusion after the steady-state
probe contradicts an initial resistor-based assumption — the concept-
specific shrink-to question is "forget the coil for a second — think of a
heavy flywheel spinning at a totally constant speed. Does anything need to
keep pushing it to KEEP it at that speed?" (isolating the inertia/steady-
state-no-opposition intuition mechanically before re-introducing the
electrical case). See `../foundations/01-recovery-engine.md` for generic
engine mechanics.

## Memory Hooks

Concept type: concept (the change-vs-magnitude opposition distinction)
bound to a procedure (back-EMF and stored-energy calculation) — review
should always test a steady-current scenario alongside a changing-current
scenario in the same session, specifically because MC-INDUCTOR-OPPOSES-CURRENT-FLOW
is most likely to resurface silently if only changing-current problems are
practiced. Interleaving partners: `phys.em.faradays-law` (the general
induction mechanism this concept specializes to a coil's own current) and,
once authored, `phys.em.lc-circuits` and `phys.em.mutual-inductance` (both
of which require this concept's change-vs-magnitude distinction as a
working tool, not a topic to re-derive from scratch).

## Transfer Connections

**Near transfer**: any RL or LC circuit transient-analysis problem,
including the inductive-kick phenomenon in relay and solenoid-switching
circuits (a genuine, practically important engineering concern — flyback
diodes are specifically added to circuits to safely manage this
phenomenon). **Far transfer**: transformer and power-supply design (both
rely on controlled, deliberate exploitation of inductive behavior) and
automotive ignition coil systems (which deliberately exploit a large,
rapid current interruption to generate the very high voltage needed for a
spark plug, a direct engineering application of the inductive kick).
**Real-world transfer**: understanding why a spark can occur when
unplugging a device with a motor or coil while it's running (the inductive
kick from the sudden current interruption) as a genuine, sometimes
noticeable everyday phenomenon. **Expert-transfer**: recognizing
self-inductance as the electrical instance of the general "inertia-like
opposition to rate of change" mathematical pattern that recurs across
mechanical (mass), electrical (inductance), and thermal (thermal mass)
systems.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. A genuine,
KG-unencoded connection exists to mathematics (differential equations,
specifically the first-order linear ODE structure governing RL circuit
transient behavior) — not currently captured as a cross_link. Recorded as
Curriculum Feedback below.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.em.self-inductance.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Engine** (both misconceptions, birth-type classification
added, not re-derived), **Component 6 — Session Flow Script** (cited in
Teaching Sequence), and **Component 4 — Assessment Probes** (cited in
Assessment Signals). Not restated here: Component 0 (Concept Identity),
Component 1 (Concept Explanation Blocks), Component 2 (Worked Examples),
Component 5 (Retrieval & Spacing Schedule), Component 7 (Adaptive
Branching), Component 8 (Visualisation Specification).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

The KG's `cross_links` field is empty despite a genuine, direct connection
to mathematics' differential equations content (the RL circuit's governing
equation). Flagged for the Curriculum Production Pipeline's own backlog,
not fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
