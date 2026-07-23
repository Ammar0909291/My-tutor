# The p-n Junction — `phys.mod.pn-junction`

## Identity

- **Concept ID**: `phys.mod.pn-junction` (canonical physics KG)
- **Curriculum location**: physics / modern physics (semiconductor
  physics extension) — dependency level 23.
- **Prerequisites**: `phys.mod.extrinsic-semiconductors` (n-type and
  p-type material properties this concept joins).
- **Unlocks** (from KG): `phys.mod.diode-rectification`.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**:
  0.70 · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that the depletion region and
built-in potential form spontaneously the instant a p-n junction is
created, with no external voltage source required; (2) correctly explain
why carrier diffusion across the junction is self-limiting — reaching a
stable equilibrium rather than continuing until complete mixing — because
exposed fixed dopant ions generate an opposing electric field; (3)
correctly state that the built-in potential, while genuinely real, cannot
be directly measured with an ordinary voltmeter, since the measurement
leads introduce their own canceling contact potentials.

## Core Understanding

At the interface between p-type and n-type semiconductor regions,
diffusion of majority carriers across the junction forms a depletion
region (emptied of mobile carriers) and a built-in electric potential
that opposes further net carrier flow once equilibrium is reached.
Simply pressing a p-type and n-type region together triggers a genuine
physical process: majority carriers diffuse across the junction into the
region where they're scarce, driven purely by the concentration
gradient — but this diffusion is self-limiting, since carriers leave
behind fixed, oppositely-charged dopant ions that create an opposing
built-in field. A first persistent error believes the depletion region
and built-in potential require an external battery or voltage source to
form, missing that they arise spontaneously the instant the junction is
created, purely from diffusion physics. A second error assumes diffusion
continues indefinitely toward complete mixing (like dye in water),
missing the self-limiting opposing field that a neutral-medium diffusion
process never develops. A third error believes the built-in potential can
be directly measured with an ordinary voltmeter, missing that the
measurement leads' own contact potentials exactly cancel the reading in
a closed loop.

## Mental Models

**Beginner**: "The depletion region only forms once you connect a
voltage source to the junction; diffusion should keep going until
everything evens out completely, like dye eventually spreading evenly
through water; you should be able to just hook up a voltmeter and read
the built-in potential directly." Upgrade trigger: the direct statement
("this diode, sitting here disconnected from anything — does it have a
depletion region right now? Yes.") directly confronts the external-
voltage assumption; the explicit dye-vs-junction contrast (does an
opposing force develop? no vs. yes) directly confronts the continues-
forever assumption; the voltmeter-thought-experiment walkthrough directly
confronts the direct-measurement assumption.

**Intermediate**: "The depletion region and built-in potential are
intrinsic, spontaneous properties of any p-n junction, forming
immediately upon junction creation, independent of any external circuit;
p-n junction diffusion is self-limiting via the built-in field it
generates, reaching a stable, permanent equilibrium; the built-in
potential is real but not directly measurable by simple external
voltmeter connection, due to canceling contact potentials introduced by
the measurement leads." This model correctly captures the three core
distinctions but may still need practice narrating the full diffusion-
to-equilibrium sequence fluently without prompting.

**Advanced**: always state the equilibrium condition precisely (diffusion
current exactly balances drift current for both carrier types
simultaneously) rather than describing equilibrium as a static absence of
motion, and always cite the specific built-in potential value (~0.6–0.7
V for silicon) when discussing the equilibrium state.

**Expert**: the connection to solar cell physics (photon-generated
electron-hole pairs separated by the built-in field), LED physics
(carrier recombination releasing photons rather than heat), and
transistor physics (carefully arranged combinations of p-n junctions as
the essential building block of semiconductor electronics) — not
required for mastery, natural bridge to `phys.mod.diode-rectification`.

## Why Students Fail

The dominant failure is believing the depletion region and built-in
potential require an external voltage source to form, missing that they
arise spontaneously from diffusion physics alone; a closely related
failure assumes carrier diffusion continues indefinitely toward complete
mixing, missing the self-limiting opposing field that develops uniquely
in the charged, structured p-n junction case; a further failure believes
the built-in potential can be directly measured with an ordinary
voltmeter, missing that the measurement leads' own contact potentials
cancel it in a closed loop; a final failure conflates the depletion
region (a spatial feature) with the built-in potential (a voltage
quantity) as though they were the same single concept.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.pn-junction.md`, Section
4 Misconception Library) documents three; reused by reference with
birth-type added.

- **MC-1 ("the depletion region and built-in potential require an
  external battery or voltage source to form")**: believing "the
  depletion region only forms once you connect a voltage source to the
  junction." **Birth type**: language contamination (Type 3) — "potential"
  and "voltage" are terms usually associated with batteries and external
  circuits. Probe: "Does a p-n junction need to be connected to a
  battery or power source before a depletion region and built-in
  potential exist, or do these form on their own?"
- **MC-2 ("diffusion across the junction continues forever, eventually
  completely mixing the n-type and p-type regions")**: believing
  "diffusion should keep going until everything evens out completely,
  like dye eventually spreading evenly through an entire glass of
  water." **Birth type**: overgeneralization (Type 1) — over-generalizing
  from simple diffusion examples without accounting for the self-limiting
  electric field unique to the charged p-n junction case. Probe: "Does
  the diffusion of electrons and holes across a p-n junction ever stop,
  or does it continue indefinitely until the regions completely merge?"
- **MC-3 ("the built-in potential can be directly measured by connecting
  an ordinary voltmeter across the junction")**: believing "just hook up
  a voltmeter and you should read the built-in potential directly."
  **Birth type**: analogy overextension (Type 6) — analogizing directly
  and uncritically to measuring a battery's terminal voltage, without
  considering the measurement leads' own contact potentials. Probe:
  "Could you directly measure a p-n junction's built-in potential just
  by connecting an ordinary voltmeter across its two terminals?"

## Analogies

**Best**: two adjoining rooms, one filled with red balloons (electrons,
n-side) and one with blue balloons (holes, p-side); remove the dividing
wall and balloons of each color drift into the other room — but every
balloon that crosses leaves behind a small, fixed anchor of its own
color nailed to the floor exactly where it started. As more balloons
cross, more anchors accumulate, creating an increasingly strong "pull-
back" effect (the built-in field) that eventually exactly balances the
outward drift. Explicitly breaks down at one point: real anchored
balloons don't generate an actual physical electric-field-like force;
the analogy captures the "diffusion creates its own opposing,
self-limiting effect" structure but the underlying mechanism
(electrostatic attraction from exposed ionic charge) requires the more
technical electric-field framing to be physically accurate.

**Anti-analogy**: do NOT say "the p-n junction just needs time to fully
mix, like stirring cream into coffee" — this directly reinforces MC-2;
the depletion region reaches a stable, permanent equilibrium precisely
because it is unlike simple, unopposed diffusion in a neutral medium.

## Demonstrations

Worked-example: perform (or describe) the classic dye-diffusion-in-water
demonstration, then explicitly contrast it against the p-n junction
diagram, asking the learner to identify what's different (the growing
opposing field) that makes the junction case self-limiting — directly
targets MC-2. Worked-example: present the "why can't you just measure
the built-in potential directly" puzzle explicitly, walking through why
the measurement leads' own contact potentials cancel the reading —
directly targets MC-3.

## Discovery Questions

Discovery-style: "Take a piece of n-type silicon and a piece of p-type
silicon, and simply press them together — no battery, no external
circuit, nothing else connected. What do you think happens right at the
boundary where they touch?" — learner discovers (through the
diffusion-exposed-ions-equilibrium sequence) that a genuine, self-
limiting physical process happens entirely on its own, directly
confronting MC-1.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (5 actions,
session cap 5: diffusion/exposed-ions/equilibrium explanation alongside
the depletion-region diagram build directly probing MC-1 →
dye-in-water-contrasted demonstration directly confronting MC-2 →
voltmeter-thought-experiment directly confronting MC-3 → transfer to
solar cell and LED applications → consolidation exercise narrating the
full sequence without prompting). MC-1 is addressed first via the
spontaneous-formation emphasis, before MC-2 via the dye contrast, before
MC-3 via the voltmeter thought experiment.

## Tutor Actions

EXPLAIN + DEMONSTRATE (diffusion, exposed ions, equilibrium explanation
alongside the depletion-region diagram build, directly probing MC-1);
DEMONSTRATE + CHALLENGE (dye-in-water diffusion contrasted against the
junction, directly confronting MC-2); CHALLENGE (voltmeter-measurement
thought experiment, directly confronting MC-3); TRANSFER (connection to
solar cell and LED applications, previewing the built-in field's
exploitation in real devices); SYNTHESIS (consolidation exercise:
narrate the full sequence from separate doped materials to stable
equilibrium, without prompting).

## Voice Teaching Notes

Listen for "the depletion region only forms with a voltage source
connected," "diffusion should keep going until everything's mixed," or
"just hook up a voltmeter and read the built-in potential" — the three
most frequent misconception tells. Load-bearing sentence: "Simply
pressing two doped semiconductor pieces together triggers a genuine,
self-limiting physical process — diffusion, exposed charge, an opposing
field, and a stable equilibrium — entirely on its own, with nothing
plugged in." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming the depletion region requires an external voltage
source signals MC-1 (full repair via the direct "nothing connected, yet
it forms" statement). A learner assuming diffusion continues toward
complete mixing signals MC-2 (full repair via the dye-vs-junction
contrast). A learner assuming the built-in potential is directly
voltmeter-measurable signals MC-3 (full repair via the voltmeter thought
experiment). Mastery trigger: correctly narrating the diffusion-to-
equilibrium mechanism, correctly explaining the self-limiting nature,
and correctly stating that no external voltage is required for
formation. Blueprint's Section 11 Assessment (FA-1 through FA-4) cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "do two adjoining rooms of different air pressure,
connected by an open door, spontaneously reach their own stable pressure
difference without any external fan or pump needed?" (isolating the
spontaneous-self-limiting-equilibrium pattern before re-applying it
specifically to the p-n junction's depletion region and built-in
potential). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (the depletion region and built-in potential as spontaneous,
self-limiting consequences of majority-carrier diffusion; the opposing
built-in field generated by exposed fixed dopant ions; the built-in
potential's genuine reality despite being unmeasurable by ordinary
voltmeter) bound to procedure (narrating the diffusion → exposed-ions →
opposing-field → equilibrium sequence; contrasting self-limiting
junction diffusion against unopposed neutral-medium diffusion).
Interleave with `phys.mod.extrinsic-semiconductors` (prerequisite —
n-type and p-type material properties this concept joins) and
`phys.mod.diode-rectification` (successor — how an externally applied
voltage disturbs this equilibrium).

## Transfer Connections

Near: applying the same diffusion-exposed-ion-equilibrium reasoning to
understanding how an externally applied voltage disturbs this
equilibrium, directly setting up diode rectification behavior. Far:
electrochemistry (analogous self-limiting equilibria at electrode-
electrolyte interfaces, governed by similar diffusion-versus-opposing-
field balance) and the general physics principle of self-limiting
equilibrium processes (also seen in osmotic pressure equilibrium and
capacitor charging). Real-world: solar cell physics (photon-generated
carriers separated by the built-in field) and LED physics (carrier
recombination releasing photons). Expert: the general principle that a
diffusion-driven process can be genuinely self-limiting when the
diffusing quantity itself generates an opposing effect.

## Cross-Subject Connections

KG `cross_links` not separately checked this batch (not required by the
Blueprint's Section 15 Curriculum Feedback, which records no open
issues); the electrochemistry parallel (self-limiting diffusion-vs-
opposing-field equilibria at electrode-electrolyte interfaces) is the
primary cross-subject bridge, already covered under Transfer Connections
above.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.pn-junction.md`,
numbered-Section format). Reuses: Section 4 Misconception Library by
reference. Not restated: Section 0 Concept Metadata, Section 1 Concept
Spine full formula derivations, Section 5 Explanation Library, Section 7
Demonstration Library full walkthroughs, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisite adequacy
(`phys.mod.extrinsic-semiconductors`) and unlock readiness
(`phys.mod.diode-rectification`, directly depending on the equilibrium
depletion region and built-in potential established here) are both
internally consistent with the Blueprint's own Section 15 findings,
continuing the six-concept semiconductor-physics extension of the
Modern Physics domain toward its final concept.

## Version History

- 2026-07-23 (physics EB Wave 23): initial authoring.
