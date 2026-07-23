# Particle Classification: Hadrons and Leptons — `phys.particle.particle-classification`

## Identity

- **Concept ID**: `phys.particle.particle-classification` (canonical
  physics KG)
- **Curriculum location**: physics / particle physics — dependency
  level 17.
- **Prerequisites**: `phys.particle.four-forces` — the classification
  test ("does it feel the strong force?") directly depends on the
  four-force scorecard already established.
- **Unlocks** (from KG): `phys.particle.antimatter`, `phys.particle.
  quarks`, `phys.particle.leptons`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 3

## Learning Objective

The learner can: (1) correctly explain that protons and neutrons are NOT
fundamental particles despite being taught early as basic atomic
building blocks — they are hadrons, composite particles built from three
quarks each, as directly demonstrated by 1968 deep inelastic scattering
experiments revealing internal structure; (2) correctly explain that
"hadron" and "baryon" are NOT synonyms — hadron is the umbrella category
for any strong-force-feeling particle, with baryon (3 quarks, like the
proton) and meson (quark-antiquark pair, like the pion) as its two
subtypes; (3) correctly explain that mass does NOT determine hadron-
versus-lepton classification — the tau lepton (~1777 MeV/c²) is heavier
than the proton (~938 MeV/c², a hadron), yet remains unambiguously a
lepton, since the sole classification criterion is whether the particle
feels the strong force, never mass or size.

## Core Understanding

Every particle that experiences the strong force is a hadron (a
composite particle built from quarks); every particle that does not is
a lepton (a fundamental particle, like the electron). A first persistent
error, from early atomic-structure education presenting protons,
neutrons, and electrons as the three "fundamental" particles, assumes
protons and neutrons remain fundamental at the particle-physics level —
but 1968 deep inelastic scattering experiments (firing high-energy
electrons at protons) revealed point-like internal constituents
(quarks), exactly paralleling how Rutherford's gold-foil experiment
revealed the atom's internal nuclear structure decades earlier; protons
and neutrons are hadrons, composite and NOT fundamental, despite being
foundational to atomic structure at a different level of description. A
second error, since baryons (proton, neutron) are the hadrons most
commonly discussed in introductory nuclear physics, treats "hadron" and
"baryon" as interchangeable — but hadron is the UMBRELLA term for any
strong-force-feeling particle, encompassing BOTH baryons (three-quark
combinations) and mesons (quark-antiquark pairs, like the pion, which
feels the strong force yet has none of the properties defining a
baryon). A third error, generalizing from the familiar proton (heavy) vs.
electron (light) contrast, assumes mass determines the hadron-lepton
split — but the tau lepton (~1777 MeV/c²) is nearly twice as massive as
the proton (~938 MeV/c², a hadron), while the pion (a hadron, ~140
MeV/c²) is far lighter than the tau; classification depends SOLELY on
whether the particle feels the strong force, entirely independent of
mass, size, or historical familiarity.

## Mental Models

**Beginner**: "Protons and neutrons are fundamental building blocks of
matter; hadron and baryon mean the same thing; heavier particles are
hadrons, lighter ones are leptons." Upgrade trigger: learning about the
1968 deep inelastic scattering experiment (protons scatter high-energy
electrons off internal point-like constituents, exactly like Rutherford's
gold-foil result one layer deeper) directly confronts the protons-are-
fundamental assumption; placing the pion (a meson, not a baryon, yet
still a hadron) into the classification scheme directly confronts the
hadron-equals-baryon assumption.

**Intermediate**: "Protons/neutrons are composite hadrons, not
fundamental particles — deep inelastic scattering proved this; hadron is
the umbrella term, with baryon and meson as its two subtypes; the sole
classification test is 'does it feel the strong force,' entirely
independent of mass." This model correctly captures all three points but
may still need to explicitly apply the strong-force test (rather than
rely on familiarity or mass) when classifying an unfamiliar particle.

**Advanced**: "Always apply the single strong-force test to classify any
particle as hadron or lepton, never relying on mass, familiarity, or
whether it's traditionally taught as 'fundamental' to atomic structure."

**Expert**: the further subdivision of hadrons by quark content (baryon
number conservation distinguishing baryons from mesons) and the
historical context of the 1950s-60s "particle zoo" that motivated this
classification scheme in the first place — not required for mastery,
natural bridge to `phys.particle.quarks` and `phys.particle.hadron-
quark-model`.

## Why Students Fail

The dominant failure is treating protons and neutrons as fundamental
particles because early education presents them as the basic components
of atoms, missing that they are themselves composite hadrons built from
quarks; closely related failures include conflating the umbrella term
"hadron" with its subtype "baryon," and assuming particle mass
determines hadron-versus-lepton classification rather than the sole
strong-force test.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.particle.particle-
classification.md`, Section 4 Misconception Library) documents three;
reused by reference with birth-type added.

- **MC-1 (protons and neutrons are fundamental particles)**: believing
  "protons and neutrons are the basic building blocks — you can't break
  them down further." **Birth type**: instruction-induced (Type 5) —
  early chemistry and physics education presents protons, neutrons, and
  electrons as the three "fundamental" particles making up atoms and
  never revisits this simplification, missing that 1968 deep inelastic
  scattering revealed protons/neutrons are composite (built from
  quarks). Probe: "Are protons and neutrons fundamental, or are they
  made of something smaller?"
- **MC-2 (hadron and baryon mean the same thing)**: believing "hadrons
  are protons and neutrons — those are the only kinds." **Birth type**:
  overgeneralization (Type 1) — baryons (the hadrons most commonly
  discussed in introductory nuclear physics) are mistaken for the
  entirety of the hadron category, missing that mesons (like the pion,
  a quark-antiquark pair) are also hadrons despite not being baryons.
  Probe: "Is a pion a baryon? Is it a hadron?"
- **MC-3 (mass determines whether a particle is a hadron or a
  lepton)**: believing "heavier particles are hadrons, lighter ones are
  leptons." **Birth type**: overgeneralization (Type 1) — the familiar
  proton-heavy/electron-light contrast is over-generalized into a mass-
  based classification rule, missing that the tau lepton (heavier than
  the proton) remains a lepton while the pion (lighter than the tau)
  remains a hadron — mass is irrelevant to the classification. Probe:
  "The tau lepton is heavier than the proton. Does that mean the tau is
  actually a hadron?"

## Analogies

**Best**: LEGO models versus single LEGO bricks — a hadron is like a
finished LEGO model, built from smaller pieces (quarks) snapped together
and, in principle, findable inside; a lepton is like a single, solid
LEGO brick with nothing smaller inside no matter how you try to take it
apart — directly targets MC-1 by making "composite vs. fundamental" a
concrete, visualizable distinction, with the explicit breaking point
that hadrons cannot actually be taken apart into free quarks (unlike
LEGO models), due to confinement.

**Anti-analogy**: do NOT say "leptons are the smallest possible
particles" — this directly reinforces MC-3 by conflating "no known
substructure" with "smallest in mass or size," which is false (the tau
lepton is more massive than the proton, a hadron).

## Demonstrations

Worked-example: sort ten labeled particle cards (proton, neutron, pion,
kaon, electron, muon, tau, and three neutrinos) into hadron/lepton piles
using only the strong-force test, then verify against the answer key —
directly targets both MC-2 and MC-3 by forcing classification via the
correct single criterion rather than mass or familiarity. Worked-
example: plot all ten particles from the card-sort on a single mass
axis, color-coded by category, and attempt to find a mass-based rule
that perfectly separates the colors (it fails — tau and pion overlap
the "wrong" way) — directly targets MC-3 by making the mass-rule's
failure visually undeniable.

## Discovery Questions

Discovery-style: "Sort proton, neutron, pion, kaon, electron, muon, tau,
and three neutrinos into exactly two groups, using whatever rule seems
best to you — before being told the actual rule." — learner typically
proposes a mass-based or familiarity-based rule first, then discovers
(upon reveal of the true strong-force test and the mass-scatter
demonstration) that their initial rule fails, directly confronting
MC-3 through self-discovered contradiction rather than being told the
answer upfront.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: deliver the one-question test, immediately probing MC-1
since it challenges prior atomic-structure teaching → card-sorting into
the nested-circle diagram, probing MC-2 as the diagram is built →
mass-vs-category scatter plot directly confronting MC-3, closing with
historical particle-zoo context). MC-1 (protons not fundamental) is
addressed first given its direct challenge to prior education, before
MC-2 (hadron≠baryon) during the nested-circle diagram construction,
before MC-3 (mass irrelevance) during the mass-scatter demonstration.

## Tutor Actions

DEMONSTRATION (card-sorting ten particles into hadron/lepton piles using
the strong-force test); DEMONSTRATION (nested-circle diagram: hadron
umbrella containing baryon and meson sub-circles, separate lepton
circle); DEMONSTRATION (mass-vs-category scatter plot showing tau/pion
mass overlap defeats any mass-based rule); ANALOGY (LEGO models vs.
single LEGO bricks for composite vs. fundamental).

## Voice Teaching Notes

Listen for "protons are fundamental," "hadrons are just protons and
neutrons," or "heavier means hadron" — the three direct misconception
tells. Load-bearing sentence: "the proton you learned as a fundamental
building block is actually made of three quarks — we know because in
1968 we scattered electrons off it and found something small and hard
inside; hadron is the umbrella term, baryon and meson are its two
flavors; and mass has nothing to do with the classification — only the
strong-force test does." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner treating protons/neutrons as fundamental signals MC-1 (full
repair via the 1968 deep-inelastic-scattering/Rutherford parallel). A
learner conflating hadron with baryon signals MC-2 (full repair via the
pion's placement in the nested-circle diagram). A learner applying a
mass-based classification rule signals MC-3 (full repair via the tau-
vs-pion mass-scatter demonstration). Mastery trigger: correctly
classifying at least 8 of 10 unfamiliar particles as hadron or lepton
via the strong-force test AND correctly explaining why the proton is
not a fundamental particle despite being foundational to atomic
structure. Blueprint's Section 11 Assessment (FA-1 through FA-4) cited
for the full item bank; mastery gate requires ≥85%.

## Tutor Recovery Strategy

Shrink-to question: "forget particle physics for a second — a brick
wall is a 'fundamental unit' of house-building, but is a single brick
itself made of anything smaller?" (isolating the foundational-to-one-
level-vs-irreducible-at-the-next-level-down distinction before
reapplying it to protons/neutrons specifically). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (protons/neutrons are composite hadrons, not fundamental; hadron
= umbrella term for baryon+meson; classification depends solely on the
strong-force test, never mass) bound to procedure (applying the single
strong-force test to classify any named particle). Interleave with
`phys.particle.four-forces` and, once authored, `phys.particle.quarks`/
`phys.particle.leptons`.

## Transfer Connections

Near: classifying any newly named particle (W boson, gluon, Higgs
boson — none of which are hadrons or leptons, belonging instead to a
third, gauge/scalar-boson category) using the same test-first habit.
Far: any scientific classification scheme using a single, sharp,
testable criterion rather than surface features (biological
classification by genetic lineage rather than appearance; chemical
classification by electron configuration rather than color). Real-
world: nuclear physics (every nuclear process is now describable as
hadron/lepton participants exchanging or transforming via specific
forces) and proton therapy for cancer treatment (relying on the
specific way hadrons like protons deposit energy, differently from
lepton beams). Expert: the baryon-number and lepton-number conservation
laws, defined separately for each family.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
medicine (proton therapy for cancer treatment exploits the specific
hadron-vs-lepton energy-deposition behavior) — recorded honestly as a
Curriculum Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.particle.particle-
classification.md`, numbered-Section format). Reuses: Section 4
Misconception Library by reference. Not restated: Section 0 Concept
Metadata, Section 1 Concept Spine full central relations, Section 5
Explanation Library, Section 7 Demonstration Library full procedures,
Section 8 Discovery Lesson full sequence, Section 11 Assessment full
item text, Section 12 Recovery Notes, Section 13 Memory and Review
schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to medicine
(proton therapy exploiting hadron-specific energy deposition) —
recorded honestly, not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 17): initial authoring.
