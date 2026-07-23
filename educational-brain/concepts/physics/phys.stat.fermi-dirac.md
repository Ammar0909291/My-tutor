# Fermi-Dirac Statistics — `phys.stat.fermi-dirac`

## Identity

- **Concept ID**: `phys.stat.fermi-dirac` (canonical physics KG)
- **Curriculum location**: physics / statistical physics — dependency
  level 18.
- **Prerequisites**: `phys.stat.partition-function` (the grand-canonical
  formalism the Fermi-Dirac distribution is derived from),
  `phys.qm.pauli-exclusion` (the constraint of at most one fermion per
  state that produces the +1 in the denominator).
- **Unlocks** (from KG): `phys.mod.energy-bands`.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that Fermi-Dirac statistics
remain essential for electrons in metals at essentially all reasonable
temperatures — since the Fermi temperature T_F=E_F/k_B for typical
metals (~80,000 K) vastly exceeds room temperature, Maxwell-Boltzmann
statistics fail by many orders of magnitude near the Fermi energy, not
just slightly; (2) correctly state that f(E_F)=1/2 for any T>0 (not
f=1), with the sharp step function only emerging exactly at T=0; (3)
correctly derive why electronic heat capacity of metals is far smaller
than the classical equipartition prediction — only the fraction ~k_BT/E_F
of electrons near the Fermi energy have accessible empty states to
absorb thermal energy, since Pauli exclusion blocks all deeper electrons
from moving into already-occupied states.

## Core Understanding

Fermi-Dirac statistics describe the thermal occupation of quantum states
by fermions subject to Pauli exclusion: mean occupation
f(E)=1/(e^((E−μ)/k_BT)+1), where the +1 in the denominator (versus −1 for
bosons) enforces at most one fermion per state. A first persistent error
assumes Maxwell-Boltzmann statistics are adequate for electrons in metals
at "reasonably low" room temperature, missing that the relevant
comparison is T against the Fermi temperature T_F=E_F/k_B (~80,000 K for
copper) — at T=300 K, k_BT/E_F is under half a percent, so the electron
gas is deeply degenerate and the two distributions differ by over a
hundred orders of magnitude near E_F, not by a small correction. A second
error assumes f(E_F)=1 always, generalizing from the T=0 step function
where E_F is "the highest occupied level" — but f(μ)=1/2 exactly for any
T>0, a clean symmetry point independent of temperature; only at T=0 does
the distribution sharpen into a genuine step. A third error applies the
classical equipartition result (C_V=3/2 Nk_B) to the electron gas in
metals, missing that Pauli exclusion blocks all but a thin shell of
electrons near E_F (fraction ~k_BT/E_F) from having any accessible empty
state to absorb thermal energy — electrons deep in the Fermi sea are
completely thermally inert, since every state they could jump to is
already occupied.

## Mental Models

**Beginner**: "Room temperature is low enough that classical statistics
should work fine for electrons; the Fermi energy is the maximum electron
energy at all times; heat capacity should follow ordinary equipartition
per electron." Upgrade trigger: computing T_F for copper (~80,000 K) and
comparing it to 300 K directly confronts the "room temperature is low
enough" assumption; plotting f(E) at finite T and finding electrons above
E_F directly confronts the maximum-energy misreading of E_F.

**Intermediate**: "Fermi-Dirac statistics are required whenever T≪T_F;
f(μ)=1/2 for all T>0, sharpening to a step only at T=0; electronic heat
capacity is suppressed by the factor k_BT/E_F because Pauli exclusion
blocks deep electrons from absorbing thermal energy." This model
correctly captures the core physics but may still need practice
computing E_F from the density-of-states integral for an unfamiliar
material.

**Advanced**: always compute T_F=E_F/k_B before assuming classical
statistics apply, and always identify μ (not E_F) as the temperature-
dependent chemical potential at finite T even when μ≈E_F numerically for
metals.

**Expert**: the connection to Sommerfeld's 1927 resolution of the
historical electronic-heat-capacity puzzle (a genuine triumph of applying
quantum statistics to solve a then-unexplained experimental discrepancy)
and the generalization to semiconductors where μ can sit inside the band
gap with no electrons actually at that energy — not required for
mastery, natural bridge to `phys.mod.energy-bands`.

## Why Students Fail

The dominant failure is assuming classical Maxwell-Boltzmann statistics
are adequate for electrons in metals at "ordinary" temperatures without
comparing T against the Fermi temperature, missing that the electron gas
in a typical metal is deeply quantum-degenerate even at room temperature;
a closely related failure treats the Fermi energy as the electron gas's
maximum energy at all temperatures rather than the T=0 chemical
potential, missing that thermal excitation above E_F is precisely what
happens at any T>0; a further failure applies classical equipartition
directly to the electronic heat capacity, missing that Pauli exclusion
restricts thermal activity to a thin shell of electrons near E_F.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.stat.fermi-dirac.md`, Section
4 Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (Maxwell-Boltzmann is fine for metals at room temperature)**:
  believing "room temperature is low, so Maxwell-Boltzmann is fine."
  **Birth type**: overgeneralization (Type 1) — classical statistics
  work well for ordinary gases at room temperature, and this success is
  extended without qualification to the electron gas in metals, missing
  that the relevant criterion is T versus T_F, not T versus some absolute
  "low" threshold. Probe: "At what energy does Fermi-Dirac differ
  significantly from Maxwell-Boltzmann for electrons in copper at
  T=300 K?"
- **MC-2 (f(E_F)=1 at T=0)**: believing "f(E_F)=1 because E_F is the
  highest occupied state." **Birth type**: language contamination
  (Type 3) — the common phrase "highest occupied energy level" is
  interpreted as implying full occupation exactly at that level, missing
  that E_F is technically the level below which states are full and above
  which they are empty, with f(μ)=1/2 exactly at any T>0. Probe: "What is
  f(E) for E slightly above E_F at T=0? For E slightly below E_F?"
- **MC-3 (electronic heat capacity should follow classical
  equipartition)**: believing "each electron contributes 3/2 k_B (
  equipartition)." **Birth type**: overgeneralization (Type 1) — the
  equipartition theorem, correct for classical ideal gases, is applied
  without modification to a highly quantum-degenerate electron gas,
  missing that Pauli exclusion blocks the vast majority of electrons from
  any thermally accessible state. Probe: "What is the classical
  prediction for electronic heat capacity, and what does Fermi-Dirac
  statistics give?"
- **MC-4 (Fermi energy is the maximum electron energy)**: believing "E_F
  is the maximum electron energy." **Birth type**: overgeneralization
  (Type 1) — the T=0 picture (E_F as the top of the filled states) is
  generalized to all temperatures and all fermion systems, missing that
  at T>0 some electrons are thermally excited above E_F, and in
  semiconductors E_F may lie in the band gap where no electrons exist at
  all. Probe: "Is the Fermi energy always equal to the energy of the
  fastest electron in the system?"

## Analogies

**Best**: a parking garage where each space (quantum state) holds exactly
one car (fermion) — at T=0, every space from the ground floor to E_F is
full and everything above is empty; at room temperature, only cars on the
very top occupied floors (within ~k_BT of E_F) can move to the next empty
floor, since cars deep in the garage are blocked by other cars occupying
every space above them — directly targets MC-3 by making the small
active fraction (~k_BT/E_F) a concrete, countable image rather than an
abstract ratio.

**Anti-analogy**: do NOT say "Fermi-Dirac is just Maxwell-Boltzmann with
a sharp cutoff at E_F" — the distribution is a smooth sigmoid at any
finite T, not a sharp step; this vague framing directly feeds MC-2 and
MC-4 by implying a hard boundary at E_F rather than a temperature-
dependent symmetric crossover.

## Demonstrations

Worked-example: compute the Fermi temperature for copper
(E_F≈7 eV → T_F≈81,000 K) and compare directly to room temperature
(300 K, ~0.4% of T_F) — directly targets MC-1 by quantifying exactly how
deeply degenerate the electron gas is, rather than asserting "quantum
effects matter." Worked-example: Sommerfeld electronic heat capacity
C_V=(π²/2)Nk_B(k_BT/E_F) computed for copper at 300 K (≈0.02 Nk_B) versus
the classical 3/2 Nk_B prediction (a ~75× discrepancy) — directly targets
MC-3 by making the suppression factor a concrete numerical result matched
against real experimental data (the linear-in-T Sommerfeld coefficient γ).

## Discovery Questions

Discovery-style: "Metals contain ~10²⁸ free electrons per cubic meter.
Classical theory predicts these should contribute 3/2 Nk_B to the heat
capacity — but measurements show the electronic heat capacity is about
100× smaller. Compute the fraction of electrons within k_BT of E_F for
copper at 300 K, and see if that fraction alone can explain the
discrepancy." — learner discovers the fraction ~k_BT/E_F≈0.4% closely
tracks the observed heat-capacity suppression, directly confronting MC-3
by deriving the resolution rather than being told it.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (4 actions,
session_cap 4: grand-partition-function derivation of f(E) → Fermi-
energy and heat-capacity calculations for copper → MC-1/MC-3 diagnostic
probes quantifying the T_F comparison and the heat-capacity discrepancy
→ transfer to semiconductors, white dwarfs, and Pauli paramagnetism).
MC-2 and MC-4 (both concerning the meaning of E_F at finite T) are
addressed during the f(E) derivation and plotting exercise, before MC-1
and MC-3 are addressed via the T_F and heat-capacity calculations.

## Tutor Actions

DERIVATION (grand partition function for a single fermion state, giving
f(E)=1/(e^(β(E−μ))+1) from the two-occupancy-state structure); WORKED-
EXAMPLE (Fermi energy and Fermi temperature calculation for copper);
WORKED-EXAMPLE (Sommerfeld electronic heat capacity versus classical
equipartition, quantified discrepancy); ANALOGY (parking garage with one
car per space, only top-floor cars thermally mobile).

## Voice Teaching Notes

Listen for "room temperature is low so classical statistics should be
fine" or "E_F is the maximum electron energy" — the two most frequent
misconception tells. Load-bearing sentence: "the question is never
whether room temperature is 'low' in some absolute sense — it's whether
room temperature is low compared to the Fermi temperature, which for a
metal is tens of thousands of kelvin, so the electron gas is deeply
quantum even at room temperature; and f at the Fermi energy is always
one-half at any nonzero temperature, not one — some electrons are always
thermally excited above it." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner applying Maxwell-Boltzmann statistics to metal electrons at
room temperature signals MC-1 (full repair via the T_F-versus-300K
comparison). A learner stating f(E_F)=1 signals MC-2 (full repair via
plotting f(E) at finite T showing f(μ)=1/2). A learner predicting
classical equipartition heat capacity for the electron gas signals MC-3
(full repair via the Sommerfeld calculation and its match to the
active-fraction discovery exercise). A learner treating E_F as an
absolute energy ceiling signals MC-4 (full repair via identifying
thermally-excited electrons above E_F at finite T). Mastery trigger:
correctly deriving f(E) from the grand partition function, correctly
computing E_F and the Sommerfeld heat capacity for a given electron
density, and correctly explaining the physical reason for the small
electronic heat capacity. Blueprint's Section 11 Assessment (FA-1 through
FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a filing cabinet only has empty drawers near the
very top, which files can actually be moved to a new drawer — the ones
near the top, or the ones buried at the bottom?" (isolating the blocked-
by-occupied-neighbors mechanism before reapplying it to why only
electrons near E_F are thermally active). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (f(E)=1/(e^(β(E−μ))+1) from the Pauli +1; f(μ)=1/2 at any T>0;
T_F sets the real quantum-versus-classical threshold, not an absolute
temperature scale; electronic heat capacity suppressed by ~k_BT/E_F)
bound to procedure (computing E_F from electron density via the
density-of-states integral; computing T_F and comparing to the actual
temperature before choosing a statistical treatment). Interleave with
`phys.stat.partition-function`, `phys.qm.pauli-exclusion`, and
`phys.mod.energy-bands`.

## Transfer Connections

Near: metallic electrical and thermal conductivity (Sommerfeld free
electron model), Pauli paramagnetism (only electrons near E_F can flip
spin, suppressing magnetic susceptibility below the classical Curie
value). Far: semiconductor physics (Fermi level position in the band
gap governing carrier concentration and conductivity) and astrophysical
degeneracy pressure (white dwarf stars supported against gravitational
collapse by electron degeneracy pressure, up to the Chandrasekhar limit).
Real-world: the historical resolution of the metallic-heat-capacity
puzzle (Sommerfeld, 1927) as a landmark early success of applying
quantum statistics to solid-state physics. Expert: the nuclear shell
model and neutron-star degeneracy pressure as structurally identical
applications of Fermi-Dirac statistics to a different fermion species.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified beyond the general fermion-degeneracy pattern recurring across
condensed-matter and astrophysical contexts already covered under
Transfer Connections — recorded honestly as a null finding for KG-level
cross-links specifically, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.stat.fermi-dirac.md`,
numbered-Section format). Reuses: Section 4 Misconception Library by
reference. Not restated: Section 0 Concept Metadata, Section 1 Concept
Spine full formula derivations, Section 5 Explanation Library, Section 7
Demonstration Library full numeric walkthroughs, Section 8 Discovery
Lesson full sequence, Section 11 Assessment full item text, Section 12
Recovery Notes, Section 13 Memory and Review schedule, Section 14
Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
fermion counterpart to Bose-Einstein statistics and the direct
prerequisite for band-structure physics.

## Version History

- 2026-07-23 (physics EB Wave 18): initial authoring.
