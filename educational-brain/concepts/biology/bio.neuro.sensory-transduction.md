# bio.neuro.sensory-transduction — Sensory Transduction

## Identity
- **Concept ID**: `bio.neuro.sensory-transduction`
- **Subject**: Biology
- **Domain**: Neuroscience (`bio.neuro`)
- **Prerequisites**: `bio.physio.nervous-system`
- **Unlocks**: `bio.neuro.vision-visual-system`, `bio.neuro.audition-vestibular-system`
- **Cross-links (KG)**: (none)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can correctly explain sensory transduction as converting a stimulus into a
GRADED receptor potential (not directly into an all-or-nothing action potential),
correctly explain sensory ADAPTATION as a genuine, functional reduction in receptor
responsiveness to a CONSTANT stimulus (not a failure or malfunction of the sensory
system), and correctly explain that stimulus INTENSITY is coded by action-potential
FREQUENCY (rate of firing), not by the size or amplitude of individual action
potentials.

## Core Understanding
**Sensory transduction** is the GENERAL process by which a sensory receptor cell
converts a physical or chemical STIMULUS into an electrical signal the nervous system
can process — specifically, a GRADED **receptor potential** (a local change in
membrane voltage whose SIZE varies continuously with stimulus strength), rather than
directly producing an all-or-nothing action potential. This receptor potential must
subsequently reach a threshold (directly, or via a connected neuron) to trigger actual
action potentials for transmission along an axon.

Four major RECEPTOR CATEGORIES cover the great majority of sensory transduction:
**photoreceptors** (respond to light, e.g., rod and cone cells in the retina);
**mechanoreceptors** (respond to physical deformation — pressure, stretch, vibration,
e.g., touch receptors and hair cells); **chemoreceptors** (respond to specific chemical
molecules, e.g., taste and smell receptors); and **thermoreceptors** (respond to
temperature change). Despite transducing very different PHYSICAL stimulus types, all
four categories share the same GENERAL logic: a stimulus-specific mechanism (e.g., a
light-sensitive pigment, a stretch-sensitive ion channel, a chemical-binding receptor
protein) converts the stimulus into a graded change in membrane potential.

Two further general principles apply across nearly all sensory systems. **Sensory
adaptation** describes a genuine, functional REDUCTION in a receptor's responsiveness
when a stimulus remains CONSTANT over time — this is not a malfunction or a "wearing
out" of the receptor; it is a useful, adaptive feature that allows the sensory system to
prioritise detecting CHANGES in stimulation (which are usually more behaviourally
relevant) over continuously signalling an unchanging background condition (e.g.,
noticing when you first put on a piece of clothing, then no longer consciously feeling
it against your skin). **Coding of stimulus intensity**: a STRONGER stimulus is
represented in the nervous system specifically by a HIGHER FREQUENCY of action
potentials (more action potentials per second) firing along the sensory neuron —
crucially, it is NOT represented by a LARGER individual action potential, since action
potentials are all-or-nothing events of essentially FIXED size once triggered; intensity
information is carried entirely in the RATE (frequency) of firing, not the amplitude of
any single spike.

## Mental Models
- **A dimmer switch (graded) feeding into an on/off relay (spike)**: a receptor
  potential is like a dimmer switch whose brightness setting continuously tracks
  stimulus strength — but the SIGNAL that actually travels down the axon is more like a
  relay that either fires (on) or doesn't (off), with the DIMMER's setting determining
  how OFTEN that relay fires, not how bright any single flash is.
- **Adaptation as "tell me when something changes, not what's already true"**: sensory
  adaptation is like a smoke detector that alerts you the MOMENT smoke starts, but
  doesn't keep blaring at the same volume indefinitely once you're already aware and the
  smoke level has stabilised — the system is optimised to flag CHANGE, not to endlessly
  restate an unchanging status.

## Why Students Fail
1. They assume a sensory stimulus is converted DIRECTLY into an action potential,
   missing the intermediate GRADED receptor-potential step whose SIZE (not an
   all-or-nothing spike) initially tracks stimulus strength.
2. They interpret sensory adaptation as the receptor "wearing out," failing, or
   malfunctioning under sustained stimulation, missing that it is a genuine, USEFUL,
   adaptive feature that shifts sensory priority toward detecting change.
3. They assume a STRONGER stimulus produces a LARGER individual action potential,
   missing that action potentials are fixed-size, all-or-nothing events, and that
   intensity is instead coded by action-potential FREQUENCY.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "A stronger stimulus produces a bigger action potential" (Type 1: Overgeneralization)
**Statement**: Stimulus intensity is assumed to be encoded by the SIZE or AMPLITUDE of
individual action potentials — a stronger stimulus is expected to produce a larger
action potential, similar to how a stronger graded signal (like the initial receptor
potential) genuinely does vary in size.
**Origin**: Overgeneralizing from the GRADED nature of the earlier receptor-potential
step (where size genuinely DOES vary continuously with stimulus strength) to the LATER
action-potential step, without registering that action potentials are specifically
ALL-OR-NOTHING events of fixed size once a threshold is crossed — a fundamentally
different signalling mode from the graded receptor potential that preceded it.
**Why it persists**: Without an explicit statement that these are two DIFFERENT signal
types with different rules (graded receptor potential varies in size; the resulting
train of action potentials instead varies in FREQUENCY), the "stronger stimulus = bigger
signal" intuition from the receptor-potential stage can simply carry over uncorrected
into the action-potential stage.
**Repair**: State explicitly and separately: the receptor potential's SIZE varies
continuously with stimulus strength (graded); but once that receptor potential triggers
actual action potentials, each individual action potential is a FIXED-SIZE,
all-or-nothing event — intensity information from that point on is carried specifically
by the FREQUENCY (how many action potentials fire per second), not by the amplitude of
any single spike.
**Verification-of-death**: given two stimulus intensities (weak and strong) applied to
the same sensory receptor, the learner correctly predicts that the STRONGER stimulus
produces a HIGHER FREQUENCY of action potentials (not larger individual spikes),
explicitly distinguishing this from the earlier graded receptor-potential stage.

### M2 — "Sensory adaptation means the receptor is failing or wearing out" (Type 2: Perceptual intuition)
**Statement**: A sensory receptor's REDUCED responsiveness to a constant, unchanging
stimulus over time (sensory adaptation) is interpreted as the receptor malfunctioning,
becoming fatigued, or "wearing out," rather than as a genuine, functionally useful
feature of the sensory system.
**Origin**: Drawing on an everyday perceptual intuition (mechanical or biological
systems that respond LESS over time are often assumed to be degrading or failing) and
applying it to sensory adaptation, without recognising that REDUCED responsiveness to
an UNCHANGING stimulus specifically serves a useful function — prioritising detection of
CHANGE over continuous signalling of an already-established, stable condition.
**Why it persists**: The everyday-language association between "reduced response over
time" and "wearing out" or "getting tired" is a reasonable default for many mechanical
systems, and nothing about first encountering sensory adaptation specifically flags that
this particular reduction is a FEATURE rather than a degradation.
**Repair**: State explicitly that sensory adaptation is a genuine, USEFUL,
functionally adaptive property — NOT a malfunction: it allows the sensory system to
prioritise detecting CHANGES in stimulation (typically more behaviourally important)
rather than continuously signalling an unchanging background condition. Use a concrete
example: you notice putting on a piece of clothing, but you stop consciously feeling it
against your skin shortly after — this is adaptation working correctly, not a sensory
failure.
**Verification-of-death**: given a novel sensory-adaptation scenario (e.g., no longer
smelling a persistent odour after some time in a room), the learner correctly explains
this as adaptive, change-prioritising receptor behaviour, rather than describing it as
the olfactory receptors failing or degrading.

## Analogies
- The dimmer-switch-feeding-a-relay model for M1: a receptor potential behaves like a
  dimmer switch whose brightness setting continuously tracks stimulus strength; the
  RESULTING train of action potentials behaves like a relay that clicks on and off at a
  certain RATE determined by that dimmer setting — the relay's individual clicks
  themselves are always the same size, no matter how bright the dimmer is set.
- The change-alarm-not-a-status-broadcast model for adaptation: a sensory receptor
  under adaptation behaves like an alarm system designed to alert you WHEN something
  changes, not like a broadcast system that continuously re-announces an already-known,
  unchanging status — reduced signalling under constant conditions is the alarm doing
  its job correctly, not failing.

## Demonstrations
- Present two stimulus-intensity scenarios (weak touch, strong touch) on the same
  mechanoreceptor and ask the student to predict what changes in the resulting action
  potential train — testing whether they predict frequency change (correct) or
  amplitude change (M1).
- Walk the clothing-on-skin or persistent-odour scenario explicitly, asking the student
  to explain why conscious awareness of the stimulus fades over time despite the
  stimulus itself remaining present and unchanged.

## Discovery Questions
- "If a stronger stimulus doesn't produce a BIGGER action potential (since action
  potentials are all-or-nothing and fixed in size), how else could the nervous system
  represent stimulus strength?"
- "You stop noticing a piece of clothing against your skin shortly after putting it on,
  even though it's still touching you. Has your touch receptor stopped working, or is
  something else going on?"
- "A receptor potential's SIZE varies with stimulus strength, but an action potential's
  size does not. What does the nervous system use INSTEAD of size to represent
  intensity, once the signal becomes a train of action potentials?"

## Teaching Sequence
1. Introduce the general transduction process (stimulus → receptor potential) and the
   four receptor categories before discussing action-potential-level coding.
2. Directly correct the bigger-stimulus-bigger-spike misconception, contrasting the
   graded receptor potential against the fixed-size, frequency-coded action potential
   train.
3. Introduce sensory adaptation, directly correcting the wearing-out misconception using
   the clothing/odour examples.
4. Close by connecting adaptation and frequency coding together: a sustained,
   unchanging stimulus produces a DECREASING firing frequency over time specifically
   because of adaptation, reinforcing both principles in one combined picture.

## Tutor Actions
- If a student predicts a bigger action potential from a stronger stimulus: ask them to
  state what SPECIFICALLY varies in an all-or-nothing signal, redirecting toward
  frequency.
- If a student describes sensory adaptation as a malfunction: ask them what USEFUL
  function reduced responsiveness to an unchanging stimulus might serve.
- If a student conflates the graded receptor potential and the resulting action
  potential train: ask them to state, separately, what varies at each of the two
  stages.

## Voice Teaching Notes
Say "frequency, not size" whenever stimulus-intensity coding comes up, to keep the
rate-based coding explicit. Say "a feature, not a failure" whenever sensory adaptation
comes up, to keep the functional, adaptive framing distinct from a malfunction reading.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M1, once
probes exist: a learner who correctly predicts a HIGHER firing frequency (not larger
spikes) for a stronger stimulus shows the repaired model; a learner who predicts larger
individual action potentials is showing M1 in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, do not simply restate "frequency codes intensity" — ask the student to state
what specifically makes an action potential "all-or-nothing" (a fixed threshold and
fixed maximum size once triggered), then ask what CAN still vary given that constraint,
walking them to frequency as the remaining variable themselves. For M2, present a
NOVEL adaptation scenario (not clothing or odour) and ask the student to explain the
reduced response using the change-detection-priority framing, testing whether it has
actually transferred.

## Memory Hooks
- "Receptor potentials are dimmers; action potentials are fixed clicks — intensity
  lives in how OFTEN they click."
- "Adaptation is the alarm doing its job — flagging change, not failing at a constant."
- "Stronger stimulus, faster firing — never a bigger spike."

## Transfer Connections
- `bio.physio.nervous-system` (prerequisite): supplies the action-potential and
  synaptic-transmission mechanisms this concept extends into the specific sensory
  transduction context.
- `bio.neuro.vision-visual-system` (unlocks): applies the photoreceptor category and
  general transduction principles introduced here to the specific visual system.
- `bio.neuro.audition-vestibular-system` (unlocks): applies the mechanoreceptor
  category and general transduction principles introduced here to hearing and balance.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.found.scientific-method-in-biology` and
`bio.found.unifying-themes-in-biology`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (general transduction principle converting a
stimulus into a graded receptor potential; major receptor categories including
photoreceptors, mechanoreceptors, chemoreceptors, thermoreceptors; sensory adaptation;
coding of stimulus intensity by action-potential frequency) are all covered in this EB
entry directly from first principles, since no seed content exists to check against. No
additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-20: Initial authoring (thirty-fourth recomputed topological frontier, batch of
  3 with `bio.sys.synthetic-biology` — seed-content-backed — and
  `bio.cell.cytoskeleton-motility`, a further first-principles entry), EB concept
  118/199.
