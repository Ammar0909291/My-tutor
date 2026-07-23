# Conductors, Insulators, and Semiconductors — `phys.mod.semiconductor-classification`

## Identity

- **Concept ID**: `phys.mod.semiconductor-classification` (canonical
  physics KG)
- **Curriculum location**: physics / modern physics (semiconductor
  physics extension) — dependency level 20.
- **Prerequisites**: `phys.mod.energy-bands` (the band-structure
  framework this concept classifies materials within).
- **Unlocks** (from KG): `phys.mod.intrinsic-semiconductors`.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**:
  0.75 · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly explain that a semiconductor's
conductivity is highly variable and condition-dependent (especially with
temperature, and later doping), never a fixed intermediate value the way
"semi-" might suggest; (2) correctly explain that conductors, insulators,
and semiconductors are three regions of ONE continuous band-gap
parameter (plus initial band filling), not three separate physical
mechanisms; (3) correctly explain why semiconductor conductivity
increases with temperature (more thermally-excited carriers) while metal
conductivity typically decreases with temperature (increased lattice-
vibration scattering of already-abundant carriers) — genuinely opposite
mechanisms, not the same effect in different degrees.

## Core Understanding

Materials are classified as conductors, insulators, or semiconductors
according to the size of the band gap between their valence and
conduction bands, and the extent to which the conduction band is already
filled with electrons. A first persistent error treats "semiconductor"
as meaning a fixed, permanent "halfway" conductivity, taking the
everyday sense of "semi-" (partial) too literally — but a silicon
sample's conductivity can change by many orders of magnitude with
temperature (and later, with deliberately introduced impurities), and
this extreme condition-sensitivity is precisely why semiconductors are
valuable for engineered devices. A second error treats conductors,
insulators, and semiconductors as three categorically distinct physical
mechanisms, missing that all three are described by the exact same
band-structure framework, differing only in the magnitude of one
continuous parameter (band gap size, plus whether bands are already
partially filled) — silicon (E_g≈1.1 eV, a semiconductor) and diamond
(E_g≈5.5 eV, an insulator) obey the identical equations with different
numbers plugged in. A third error assumes metals and semiconductors
respond to rising temperature the same way, missing that they are
governed by genuinely opposite dominant mechanisms: in a semiconductor,
heating creates NEW charge carriers by thermally exciting electrons
across the band gap (conductivity rises), while in a metal the carrier
count barely changes but heating increases lattice-vibration scattering
of the already-abundant carriers (conductivity falls).

## Mental Models

**Beginner**: "A semiconductor has a fixed, medium conductivity, always;
conductors, insulators, and semiconductors work by three separate
mechanisms; heating any material should affect conductivity the same
way." Upgrade trigger: observing a silicon sample's conductivity change
by orders of magnitude when warmed directly confronts the
fixed-conductivity assumption; placing real materials (copper, silicon,
diamond) along one continuous band-gap axis directly confronts the
three-separate-mechanisms assumption; contrasting a semiconductor's
resistance dropping when warmed against a metal wire's resistance rising
directly confronts the same-temperature-response assumption.

**Intermediate**: "Semiconductor conductivity is highly variable and
condition-dependent, not fixed; conductor/insulator/semiconductor
classification is one unified band-structure framework with band gap as
the single continuous parameter; semiconductors and metals respond to
heating in opposite directions due to genuinely different dominant
mechanisms (carrier generation vs. scattering)." This model correctly
captures the three core distinctions but may still need practice
classifying unfamiliar materials directly from a given band-gap value
without hesitation.

**Advanced**: always frame classification as reading one continuous
parameter (band gap size, plus initial band filling) rather than
consulting a memorized category list, and always name BOTH the carrier-
generation mechanism (semiconductors) and the scattering mechanism
(metals) when explaining opposite temperature responses.

**Expert**: the connection to why silicon (E_g≈1.1 eV) and germanium
(E_g≈0.67 eV) specifically became the foundation of the electronics
industry — their band gaps sit in a "sweet spot," small enough for
controllable conduction at ordinary temperatures yet large enough to
avoid uncontrollable, always-conducting metallic behavior — not required
for mastery, natural bridge to `phys.mod.intrinsic-semiconductors`.

## Why Students Fail

The dominant failure is treating "semiconductor" as naming a fixed,
permanent intermediate conductivity value, missing that its defining
property is extreme condition-sensitivity (especially to temperature); a
closely related failure treats the three material categories as
separate physical mechanisms, missing that they are all explained by one
continuous band-gap parameter within the same framework; a further
failure assumes metals and semiconductors respond identically to rising
temperature, missing their genuinely opposite dominant mechanisms
(carrier generation versus lattice-vibration scattering).

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.semiconductor-
classification.md`, Section 4 Misconception Library) documents three;
reused by reference with birth-type added.

- **MC-1 (semiconductor conductivity is a fixed, unchanging "medium"
  value)**: believing "a semiconductor just conducts electricity a
  medium amount, always." **Birth type**: language contamination
  (Type 3) — the everyday meaning of "semi-" (halfway, partial) suggests
  a fixed intermediate value, missing that semiconductor conductivity is
  highly variable and condition-dependent. Probe: "Does a semiconductor
  always have the exact same, fixed conductivity value?"
- **MC-2 (conductors, insulators, and semiconductors are three separate
  mechanisms)**: believing "each type of material works by a totally
  different physical mechanism." **Birth type**: notation-induced
  (Type 4) — learning the three categories as separately-named terms in
  different textbook sections obscures that they share one identical
  band-structure framework. Probe: "Are conductors, insulators, and
  semiconductors explained by three entirely different physical
  mechanisms, or by one single underlying framework?"
- **MC-3 (metals and semiconductors respond to heating the same way)**:
  believing "heating any material should affect its conductivity the
  same basic way." **Birth type**: overgeneralization (Type 1) —
  without explicit contrast, temperature effects are assumed to
  generalize uniformly across all conductive materials, missing the two
  genuinely distinct, competing mechanisms at work. Probe: "If you heat
  both a metal wire and a piece of silicon, does their electrical
  conductivity change in the same direction, or in opposite directions?"

## Analogies

**Best**: three heights of wall a person (an electron) must climb to
reach the far side (the conduction band) — a very tall wall (insulator)
is essentially unclimbable, a medium wall (semiconductor) is genuinely
climbable but only by those with enough energy that day (thermal
excitation, more succeed at higher temperature), and a wall already
knocked down (conductor) lets everyone cross freely regardless of
energy; directly targets MC-2 by placing all three categories on one
continuous "wall height" (band gap) parameter rather than three separate
mechanisms.

**Anti-analogy**: do NOT say "a semiconductor conducts electricity about
half as well as a metal, all the time" — this directly reinforces MC-1;
always emphasize the strong, condition-dependent variability of
semiconductor conductivity rather than framing it as a fixed
intermediate value.

## Demonstrations

Worked-example: build a band-gap-versus-conductivity chart placing real
materials (copper as conductor, glass/diamond as insulators, silicon/
germanium as semiconductors) along one continuous band-gap axis —
directly targets MC-2 by showing there is no sharp physical boundary
between categories, just a continuous parameter with conventionally
labeled regions. Worked-example: present the direct experimental
contrast — a semiconductor sample's resistance measurably decreasing
when warmed alongside a metal wire's resistance measurably increasing
when warmed — directly targets MC-3 by making the opposite-direction
claim a checkable, concrete observation.

## Discovery Questions

Discovery-style: "Copper conducts electricity extremely well. Glass
conducts almost not at all. Silicon does something in between — but
here's the twist: warm up a piece of silicon, and it conducts noticeably
better. Warm up a copper wire, and it actually conducts slightly worse.
Why would heating have opposite effects on two different materials?" —
learner discovers (through the carrier-generation-versus-scattering
explanation) that two genuinely different mechanisms are responsible,
directly confronting MC-3's implicit assumption that heating must
affect all materials the same way.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (4 actions,
session_cap 4: one-framework explanation with the band-gap chart
directly probing MC-2 → wall-height classification exercise for hands-on
practice → opposite-temperature-response demonstration directly
confronting MC-3 → silicon/germanium "sweet spot" transfer directly
probing MC-1). MC-2 is addressed first via the band-gap chart, before
MC-3 via the opposite-temperature-response demonstration, before MC-1 via
the silicon/germanium transfer discussion.

## Tutor Actions

WORKED-EXAMPLE (band-gap-versus-conductivity chart placing real
materials along one continuous axis); WORKED-EXAMPLE (opposite
temperature-response comparison between a semiconductor sample and a
metal wire); DEMONSTRATE (wall-height classification exercise applied to
five hypothetical materials from band-gap values alone); ANALOGY (three
heights of wall representing one continuous climbability parameter).

## Voice Teaching Notes

Listen for "a semiconductor conducts a medium amount, always" or "each
material type works by a different mechanism" or "heating should affect
all materials the same way" — the three most frequent misconception
tells. Load-bearing sentence: "'semiconductor' doesn't mean a fixed,
medium conductivity — it means a material whose conductivity is
exquisitely sensitive to temperature and impurities; conductors,
insulators, and semiconductors are one single framework, just different
values of one number, the band gap; and semiconductors get MORE
conductive when warmed because heating creates new carriers, while
metals get slightly LESS conductive when warmed because heating just
scatters the carriers that were already there." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing semiconductor conductivity as fixed or permanent
signals MC-1 (full repair via the silicon-conductivity-change-with-
temperature demonstration). A learner treating the three categories as
separate mechanisms signals MC-2 (full repair via the band-gap-versus-
conductivity chart). A learner assuming metals and semiconductors
respond identically to heating signals MC-3 (full repair via the
opposite-temperature-response demonstration). Mastery trigger: correctly
classifying a material as conductor, insulator, or semiconductor from
band-structure information, correctly explaining the opposite
temperature responses, and correctly rejecting the fixed-conductivity
misconception. Blueprint's Section 11 Assessment (FA-1 through FA-4)
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if classifying weather as 'freezing,' 'cold,'
'mild,' or 'hot' uses one single continuous parameter — temperature —
with different labeled ranges, would it make sense to think each weather
category involves an entirely different physical process?" (isolating
the one-continuous-parameter-many-labels pattern before reapplying it
specifically to conductor/insulator/semiconductor classification). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (semiconductor conductivity is highly variable, not fixed; one
unified band-structure framework, band gap as the single continuous
parameter; semiconductors and metals respond oppositely to temperature
via distinct mechanisms) bound to procedure (classifying a material from
its band-gap value; identifying which mechanism — carrier generation or
scattering — dominates a given material's temperature response).
Interleave with `phys.mod.energy-bands` and `phys.mod.intrinsic-
semiconductors`.

## Transfer Connections

Near: applying the same band-gap-based classification to newly
encountered materials, including wide-band-gap semiconductors used in
high-power electronics. Far: materials engineering and device design
(choosing semiconductor materials for specific temperature ranges or
applications) and thermal sensor design (thermistors directly exploit
the strong temperature-dependence established here). Real-world: every
semiconductor device (diodes, transistors, solar cells, LEDs) developed
in the remaining concepts of this domain extension exploits this
band-gap-based classification. Expert: the general scientific principle
that one continuous physical parameter can produce categorically
distinct, conventionally-labeled behavior — the same pattern recurring in
stellar spectral classification and earthquake-magnitude classification.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified beyond the general one-continuous-parameter classification
pattern already covered under Transfer Connections — recorded honestly
as a null finding for KG-level cross-links specifically, not fixed (no
KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.semiconductor-
classification.md`, numbered-Section format). Reuses: Section 4
Misconception Library by reference. Not restated: Section 0 Concept
Metadata, Section 1 Concept Spine full formula derivations, Section 5
Explanation Library, Section 7 Demonstration Library full walkthroughs,
Section 8 Discovery Lesson full sequence, Section 11 Assessment full
item text, Section 12 Recovery Notes, Section 13 Memory and Review
schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
second entry in the six-concept semiconductor-physics extension of the
Modern Physics domain, directly setting up intrinsic-semiconductor
carrier generation.

## Version History

- 2026-07-23 (physics EB Wave 20): initial authoring.
