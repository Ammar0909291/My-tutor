# Nuclear Models: Shell Model — `phys.mod.nuclear-models`

## Identity

- **Concept ID**: `phys.mod.nuclear-models` (canonical physics KG)
- **Curriculum location**: physics / modern physics (nuclear physics) —
  dependency level 17.
- **Prerequisites**: `phys.mod.binding-energy` — the shell model explains
  deviations (residuals) from the SEMF's bulk binding-energy trend
  already established.
- **Unlocks** (from KG): none — leaf node.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that nuclear energy levels do
NOT follow the same order as atomic electron levels — the nuclear
Woods-Saxon potential and much stronger spin-orbit coupling produce a
genuinely different level structure and magic numbers (2, 8, 20, 28, 50,
82, 126), not the atomic sequence; (2) correctly explain that nuclear
spin-orbit coupling has the OPPOSITE sign from atomic spin-orbit
coupling — j=l+½ is LOWER in energy in nuclei (not higher, as in atoms),
and this sign is exactly what produces the correct magic numbers;
(3) correctly explain that protons and neutrons fill their shell
structures INDEPENDENTLY — the shell model runs two separate filling
sequences, not one combined sequence, which is why both Z and N
independently reaching a magic number (doubly magic nuclei) confers
extra stability; (4) correctly explain that "magic number" means
exceptional STABILITY (measured via separation energies, excitation
energies, and decay half-lives), NOT cosmic abundance — the most
abundant nucleus in the universe (⁵⁶Fe) is not doubly magic, while
doubly magic ²⁰⁸Pb is stable but not especially abundant.

## Core Understanding

Nucleons occupy quantized energy shells inside the nucleus; magic
numbers (2, 8, 20, 28, 50, 82, 126) mark closed shells of exceptional
stability, with spin-orbit coupling splitting otherwise-degenerate
levels to produce exactly these numbers. A first persistent error
transfers the familiar atomic level order (1s, 2s, 2p...) directly to
nuclei — but binding-energy data contradicts this: an atomic-analog
prediction would place magic numbers at 2, 10, 18 (like noble gases),
yet ¹⁸O is not especially stable while ¹⁶O (N=8) is doubly magic; the
nuclear potential (Woods-Saxon, not Coulomb) and vastly stronger
spin-orbit coupling (~20-50× atomic strength) produce a genuinely
different level sequence: 1s₁/₂, 1p₃/₂, 1p₁/₂ (→magic 8), 1d₅/₂, 2s₁/₂,
1d₃/₂ (→magic 20). A second error, transferring atomic fine-structure
intuition, assumes j=l+½ is HIGHER in energy as in atoms — but nuclear
spin-orbit coupling is a strong-force effect with the OPPOSITE sign:
j=l+½ is LOWER, and this sign reversal is exactly what produces magic
number 28 (filling the low 1f₇/₂ sub-level, 8 states, atop the prior
magic 20) rather than the wrong prediction of magic 40 an atomic-sign
convention would give. A third error treats the nucleus as one combined
system, filling a single sequence for all nucleons together — but
protons and neutrons are different fermion species obeying Pauli
exclusion INDEPENDENTLY of each other, so the shell model runs two
separate filling diagrams; ¹⁶O (Z=8, N=8) is doubly magic precisely
because BOTH independently reach magic 8, not because 16 total nucleons
means anything special. A fourth error conflates "magic" with "cosmically
common" — but magic numbers indicate stability signatures (sharp drops
in two-nucleon separation energy, anomalously high first-excited-state
energies, near-zero quadrupole moments, anomalously long decay
half-lives), which is independent of stellar-nucleosynthesis-driven
cosmic abundance; ⁵⁶Fe is the most abundant nucleus (peak of stellar
fusion pathways) without being doubly magic, while lead (doubly magic
²⁰⁸Pb) has only 4 stable isotopes.

## Mental Models

**Beginner**: "Nuclear energy levels fill in the same order as atomic
levels (1s,2s,2p...); j=l+½ should be higher energy, like in atoms;
protons and neutrons fill one combined sequence; magic-number nuclei
should be the most common in nature." Upgrade trigger: comparing
binding-energy data for ¹⁶O (doubly magic, N=Z=8) against an atomic-
analog prediction of magic-at-10 (finding ¹⁸O is NOT especially stable)
directly confronts the atomic-level-order assumption; computing the 1f
shell split (1f₇/₂ lower, 8 states → magic 28) and verifying it against
²⁷Al/²⁸Si stability data directly confronts the atomic-sign assumption.

**Intermediate**: "Nuclear levels follow a Woods-Saxon-plus-spin-orbit
structure genuinely different from atomic levels, with j=l+½ LOWER in
energy; protons and neutrons fill independent sequences, so doubly
magic nuclei require BOTH Z and N to independently close a shell; magic
numbers signal stability (separation energies, excitation energies),
not cosmic abundance." This model correctly captures all four points but
may still need to explicitly re-derive a specific shell-splitting
sequence (e.g. the 1f shell → magic 28) for an unfamiliar magic number
rather than assuming a memorized list transfers.

**Advanced**: "Always construct the nuclear level diagram from the
Woods-Saxon potential plus nucleus-specific spin-orbit sign before
predicting magic numbers, and always run separate proton/neutron
filling sequences, never a single combined one."

**Expert**: the four independent experimental signatures of magic
numbers (separation-energy drops, high excitation energies, near-zero
quadrupole moments, anomalous decay half-lives) converging on the same
number set, and the complementary relationship between the liquid-drop/
SEMF model (bulk trends) and the shell model (residual corrections) —
not required for mastery, natural bridge to nuclear structure research.

## Why Students Fail

The dominant failure is transferring the familiar atomic electron-shell
level order and spin-orbit sign directly to nuclei, missing that the
nuclear potential shape and much stronger, oppositely-signed spin-orbit
coupling produce a genuinely different structure; closely related
failures include treating the nucleus as filling one combined proton-
neutron sequence rather than two independent ones, and conflating "magic"
(a stability signature) with "cosmically abundant" (a nucleosynthesis
outcome).

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.nuclear-models.md`,
Section 4 Misconception Library) documents four; reused by reference
with birth-type added.

- **MC-1 (nuclear levels are the same as atomic levels)**: believing
  "1s, 2s, 2p — just like in atoms." **Birth type**: analogy
  overextension (Type 6) — the well-learned atomic shell structure is
  transferred wholesale to nuclei, missing that the different potential
  shape (Woods-Saxon vs. Coulomb/Hartree-Fock) and vastly stronger
  spin-orbit coupling produce a different level sequence and different
  magic numbers. Probe: "What is the order of nuclear energy levels?"
- **MC-2 (spin-orbit in nuclei has the same sign as in atoms)**:
  believing "j=l+½ is higher, like in atoms." **Birth type**: analogy
  overextension (Type 6) — atomic fine-structure sign convention is
  carried over uncritically, missing that nuclear spin-orbit coupling is
  a strong-force effect with the opposite sign, essential for producing
  the correct magic numbers (28, 50, 82, 126). Probe: "Which j level is
  lower — j=l+½ or j=l−½?"
- **MC-3 (one combined level filling for protons and neutrons)**:
  believing "eight total [nucleons fill the first two shells]." **Birth
  type**: overgeneralization (Type 1) — the nucleus is treated as a
  single system rather than two independent fermion populations, missing
  that protons and neutrons obey Pauli exclusion independently, requiring
  two separate filling diagrams. Probe: "How many nucleons fill the
  first two shells?"
- **MC-4 (magic numbers mean "most common isotopes")**: believing "magic
  nuclei must occur most in nature." **Birth type**: language
  contamination (Type 3) — the word "magic" (evoking special or
  privileged status) is conflated with abundance rather than stability,
  missing that cosmic abundance depends on stellar nucleosynthesis
  pathways (favoring ⁵⁶Fe, not a magic nucleus) while magic numbers
  specifically signal separation-energy/excitation-energy/decay-rate
  anomalies. Probe: "Does a magic number nucleus have the most
  isotopes?"

## Analogies

**Best**: electron shells in atoms (same quantum-number logic, same
Pauli-exclusion-driven shell-filling, same extra-stability-of-closed-
shells concept) as the primary analogy, paired explicitly with its four
named breaking points (spin-orbit sign reversal; two independent filling
sequences; different potential shape; pairing energy with no atomic
analog) — directly targets all four misconceptions by making clear
exactly WHERE the atomic analogy holds and where it fails, rather than
letting students assume it transfers completely.

**Anti-analogy**: do NOT treat the liquid-drop model (uniform-fluid
nucleus, no internal structure) as competing with or replacing the shell
model — they are complementary: the liquid drop explains bulk binding-
energy trends (SEMF), the shell model explains magic-number residuals
and spin/parity; treating them as rivals installs confusion about which
model to use when.

## Demonstrations

Worked-example: plot two-neutron separation energy S₂ₙ vs. N for tin
isotopes, identifying the sharp drop after N=50 — directly targets MC-4
by grounding "magic" in a measurable stability signature rather than an
abundance claim. Worked-example: construct the 1f-shell splitting
(1f₇/₂ lower, 8 states; 1f₅/₂ higher, 6 states) step by step, showing
magic 28 emerges from filling 1f₇/₂ atop the prior magic 20 — directly
targets MC-2 by deriving the sign convention's consequence explicitly.

## Discovery Questions

Discovery-style: "Plot S₂ₙ vs. N for tin (Z=50) isotopes from N=60 to
90. At what N does the largest drop occur? What does a sharp drop tell
you about how tightly the last two neutrons were bound compared to the
next ones?" — learner discovers the magic number 82 empirically from
data rather than being told, directly reinforcing that magic numbers are
evidence-based, measurable stability signatures (countering MC-4).

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: draw the nuclear level diagram with spin-orbit splitting
→ plot S₂ₙ vs. N data around N=50 or 82 → run separate proton/neutron
filling diagrams for ¹⁶O and ⁴⁰Ca). MC-1 (atomic-level transfer) and
MC-2 (spin-orbit sign) are addressed together during the level-diagram
construction, before MC-3 (combined vs. independent filling) during the
separate-diagram exercise, with MC-4 (magic ≠ abundant) addressed via the
S₂ₙ-data discussion.

## Tutor Actions

WORKED-EXAMPLE (S₂ₙ vs. N plotted for tin isotopes, sharp drop at
N=50); WORKED-EXAMPLE (1f shell splitting derived step by step, magic 28
explained); THOUGHT-EXPERIMENT (separate proton/neutron filling
diagrams constructed for ¹⁶O, ground-state spin/parity J^π=0⁺ predicted
correctly only by the doubly-closed-shell picture); ANALOGY (atomic
electron shells, with explicit breaking points named).

## Voice Teaching Notes

Listen for "nuclear levels fill like atomic levels," "j=l+½ should be
higher, like atoms," "count all nucleons together," or "magic nuclei
must be the most common" — the four direct misconception tells. Load-
bearing sentence: "nuclear levels are NOT atomic levels in disguise —
different potential, different spin-orbit sign, and protons and neutrons
fill their own separate ladders; and magic means exceptionally stable,
not exceptionally common." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner transferring atomic level order to nuclei signals MC-1 (full
repair via the ¹⁶O vs. atomic-analog-prediction contrast). A learner
assuming atomic spin-orbit sign signals MC-2 (full repair via the 1f-
shell-splitting derivation). A learner treating the nucleus as one
combined filling sequence signals MC-3 (full repair via the separate
proton/neutron diagrams for oxygen). A learner conflating magic with
abundant signals MC-4 (full repair via the S₂ₙ-vs-N data plot). Mastery
trigger: correctly constructing a level diagram with spin-orbit
splitting AND correctly explaining at least 3 magic numbers from level
closures AND correctly citing experimental signatures distinguishing
stability from abundance. Blueprint's Section 11 Assessment (FA-1
through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget nuclei for a second — if you learned one
filing system for organizing files (atomic shells), and now someone
hands you a DIFFERENT filing cabinet with different-sized drawers (the
nuclear potential), would you expect the same drawer sizes to still
apply?" (isolating the reasonable-but-wrong assumption that a familiar
structure transfers unchanged before reapplying it to nuclear vs. atomic
shells specifically). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (nuclear levels ≠ atomic levels — different potential, reversed
spin-orbit sign; protons and neutrons fill independently; magic = stable,
not abundant) bound to procedure (constructing the level diagram with
correct spin-orbit splitting; running separate Z/N filling sequences;
reading S₂ₙ-vs-N plots for magic-number evidence). Interleave with
`phys.mod.binding-energy`, `phys.qm.operators`, and `phys.mod.nuclear-
reactions`.

## Transfer Connections

Near: any ground-state spin/parity prediction or magic-number
identification problem. Far: electron shell structure in atoms (same
formalism, different potential and spin-orbit sign) and metallic-cluster
electron shells (analogous magic-number stability in a different
many-fermion system). Real-world: predicting which isotopes are
especially stable or unstable, informing nuclear medicine isotope
selection and reactor fuel-cycle design. Expert: the universal pattern
of shell structure appearing in any many-fermion quantum system with
anomalous stability at specific counts.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (electron shell structure and the periodic table share the
identical mathematical formalism, differing only in potential shape and
spin-orbit sign) — recorded honestly as a Curriculum Feedback item, not
fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.nuclear-
models.md`, numbered-Section format). Reuses: Section 4 Misconception
Library by reference. Not restated: Section 0 Concept Metadata, Section
1 Concept Spine full formula set, Section 5 Explanation Library, Section
7 Demonstration Library full procedures, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to chemistry
(shared quantum-number/shell-filling formalism with atomic electron
structure) — recorded honestly, not fixed (no KG or Blueprint file
modified).

## Version History

- 2026-07-23 (physics EB Wave 17): initial authoring.
