# Electron Spin and the Stern-Gerlach Experiment — `phys.qm.spin`

## Identity

- **Concept ID**: `phys.qm.spin` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 16.
- **Prerequisites**: `phys.qm.operators` — spin reuses the general
  angular-momentum commutation algebra already established, represented
  in a 2D spinor space via Pauli matrices.
- **Unlocks** (from KG): `phys.qm.pauli-exclusion`, `phys.qm.angular-
  momentum-addition`, `phys.qm.density-matrix`.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that electron spin is NOT a
literal physical rotation of a charged sphere — a mechanical spin model
would require the electron's surface to move faster than light, so spin
is a purely quantum-mechanical internal degree of freedom with no
classical mechanical origin; (2) correctly explain that "spin-½" gives
the MAXIMUM z-COMPONENT (S_z=±ℏ/2), not the total spin MAGNITUDE — the
magnitude |S⃗|=√(s(s+1))ℏ=(√3/2)ℏ is strictly larger than ℏ/2;
(3) correctly explain that the Stern-Gerlach apparatus MEASURES a
pre-existing quantized S_z, it does not CREATE the two discrete outcomes
— the discreteness is intrinsic to spin-½ particles, not imposed by the
device; (4) correctly explain that measuring S_z as definite (spin-up)
leaves S_x and S_y COMPLETELY UNDETERMINED (maximally uncertain), not
also "pointing up" — a subsequent S_x measurement gives ±ℏ/2 with equal
probability, never a value consistent with the spin vector being locked
along z.

## Core Understanding

Electrons carry an intrinsic angular momentum called spin, with quantum
number s=½; unlike orbital angular momentum, spin has no classical
analog, and its z-component takes only two values m_s=±½ (in units of
ℏ). A first persistent error pictures the electron as a literal spinning
charged ball — but for the electron's known radius (~10⁻¹⁷ m or less) to
produce angular momentum ℏ/2 via mechanical rotation, its surface would
need to move at roughly 30× the speed of light, an impossibility; spin
instead emerges from the relativistic Dirac equation, with no spatial-
rotation origin. A second error conflates the label "spin-½" with the
total spin magnitude, expecting |S⃗|=ℏ/2 — but |S⃗|²=s(s+1)ℏ²=(3/4)ℏ²
gives |S⃗|=(√3/2)ℏ≈0.866ℏ, strictly LARGER than the maximum
z-component ℏ/2 (exactly analogous to orbital angular momentum, where
l=1 gives |L⃗|=√2 ℏ, not ℏ). A third error imagines the Stern-Gerlach
apparatus as CREATING the two spin groups by sorting a pre-existing
classical distribution — but a classical random orientation would
produce a continuous smear on the detector; the sharp two-spot result is
direct evidence that S_z is intrinsically quantized BEFORE measurement,
with the apparatus merely revealing (not imposing) this quantization. A
fourth error assumes that after measuring S_z=+ℏ/2 ("spin-up"), the spin
vector is "locked" pointing along z, so a subsequent S_x measurement
should also read a definite, consistent value — but [Ŝ_x,Ŝ_z]≠0 means
S_x and S_z cannot be simultaneously determined; the spin-up state is an
EQUAL SUPERPOSITION of S_x eigenstates, so measuring S_x afterward gives
±ℏ/2 with 50/50 probability, confirmed experimentally by sequential
Stern-Gerlach devices.

## Mental Models

**Beginner**: "The electron is literally spinning on its axis like a
top; spin-½ means the total spin magnitude is ℏ/2; the Stern-Gerlach
magnet sorts atoms into two pre-existing classical groups; once
measured spin-up along z, the spin vector points along z for all
purposes." Upgrade trigger: computing the required surface velocity for
a mechanical spin model (finding it exceeds the speed of light) directly
confronts the literal-rotation assumption; running the sequential
Stern-Gerlach thought experiment (SG-z → SG-x → SG-z, finding the second
SG-z gives 50/50 again, not confirmed spin-up) directly confronts the
locked-spin-vector assumption.

**Intermediate**: "Spin is a purely quantum-mechanical internal degree of
freedom with no classical rotational origin; |S⃗|=(√3/2)ℏ is the
magnitude, distinct from the ±ℏ/2 z-component; Stern-Gerlach reveals a
pre-existing intrinsic quantization, not something the device creates;
measuring S_z as definite leaves S_x maximally uncertain." This model
correctly captures all four points but may still need to explicitly
recompute ⟨S_x⟩ via Pauli matrices for an unfamiliar spin state rather
than assuming the result transfers.

**Advanced**: "Always treat spin as an abstract 2D internal degree of
freedom obeying angular-momentum algebra, never a mechanical rotation,
and always distinguish the spin MAGNITUDE from any single component's
maximum value before quoting a number for |S⃗|."

**Expert**: the Dirac equation's natural prediction of g=2 and s=½
(spin emerging directly from relativistic quantum mechanics, not
postulated), and the spin-orbit coupling term Ĥ_SO=λL⃗·S⃗ producing
fine-structure doublets in atomic spectra (e.g. the sodium D-line) — not
required for mastery, natural bridge to `phys.qm.hydrogen-atom-qm`'s fine
structure and `phys.qm.pauli-exclusion`.

## Why Students Fail

The dominant failure is picturing spin as a literal mechanical rotation
of a charged sphere; closely related failures include conflating the
spin-½ label with the total spin magnitude rather than its maximum
z-component, believing the Stern-Gerlach apparatus creates rather than
reveals the two-valued quantization, and assuming a definite S_z
measurement locks the spin vector along that axis for all subsequent
measurements.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.spin.md`, Section 4
Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (electron spin is literal rotation)**: believing "the electron
  is spinning on its axis like a top." **Birth type**: language
  contamination (Type 3) — the word "spin" itself, chosen historically
  by analogy to classical rotation, is taken literally, missing that the
  required surface velocity for a physical electron would exceed the
  speed of light. Probe: "What is electron spin physically?"
- **MC-2 (spin-½ means |S⃗|=ℏ/2)**: believing "it's ℏ/2 because spin
  quantum number is ½." **Birth type**: notation-induced (Type 4) — the
  quantum-number LABEL (s=½) is conflated with a physical MAGNITUDE,
  missing that |S⃗|²=s(s+1)ℏ² gives a magnitude strictly exceeding the
  maximum single-component value, exactly paralleling orbital angular
  momentum. Probe: "What is the magnitude of the electron's spin angular
  momentum?"
- **MC-3 (the Stern-Gerlach apparatus creates the two spin states)**:
  believing "the magnetic field separates the atoms into two groups"
  from a pre-existing classical distribution. **Birth type**:
  perceptual intuition (Type 2) — the apparatus's visible sorting action
  is read as CREATING the outcome categories, missing that a continuous
  classical distribution would produce a smear, not two discrete spots
  — the discreteness must be intrinsic, pre-existing quantization.
  Probe: "Why does the Stern-Gerlach experiment produce exactly two
  spots?"
- **MC-4 (spin states are fixed in space, e.g. spin-up along z means
  locked along z)**: believing "still +ℏ/2 [for S_x] because the spin is
  pointing up." **Birth type**: overgeneralization (Type 1) — the
  classical intuition that a definite direction determines all other
  spatial components is extended to quantum spin, missing that
  [Ŝ_x,Ŝ_z]≠0 forces S_x to be maximally uncertain whenever S_z is
  definite. Probe: "If I measure S_z and get +ℏ/2, then immediately
  measure S_x, what do I get?"

## Analogies

**Best**: a coin that can only be heads or tails when observed — before
observation it exists in superposition (like a spinning coin in
midair); when the Stern-Gerlach magnet "looks," it forces the electron
to declare spin-up or spin-down — directly targets MC-3 by framing
measurement as revealing/collapsing a superposition rather than the
device manufacturing the two outcomes, with the explicit breaking point
that a classical spinning coin has a definite (if unknown) side, while
quantum spin genuinely has no definite value until measured.

**Anti-analogy**: do NOT say "electron spin is like the Earth rotating
on its axis" — this directly installs MC-1 by suggesting a continuous
axis direction, adjustable magnitude, and a classical limit, none of
which spin has; the word "spin" is the only genuine similarity.

## Demonstrations

Worked-example: compute the required surface velocity for a classical
spinning-electron model to produce angular momentum ℏ/2 (finding it
~30× the speed of light) — directly targets MC-1. Worked-example: run
the sequential Stern-Gerlach thought experiment (SG-z selects |↑_z⟩ →
100% pass a second SG-z; but insert an SG-x device between them → 50/50
split in ±x → selecting |↑_x⟩ and passing through a final SG-z gives
50/50 again, NOT confirmed up) — directly targets MC-4 by showing the
S_x measurement "erases" the prior z-information.

## Discovery Questions

Discovery-style: "If spin-½ particles give 2 spots in a Stern-Gerlach
experiment, how many spots would a spin-1 particle give? What's the
general rule?" — learner derives the 2s+1 formula from the specific
spin-½ case, generalizing beyond memorized facts and reinforcing that
the number of outcomes is a direct consequence of the quantum number s,
not an apparatus artifact (further countering MC-3).

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: sequential Stern-Gerlach thought experiment → compute
|S⃗|=(√3/2)ℏ from s(s+1)ℏ² → apply Pauli matrices to find ⟨S_x⟩ for
|↑_z⟩). MC-3 (apparatus creates outcomes) and MC-4 (locked spin vector)
are addressed together first via the sequential Stern-Gerlach exercise,
before MC-2 (magnitude vs. component) during the |S⃗| calculation,
with MC-1 (literal rotation) addressed via the surface-velocity
calculation woven into the opening explanation.

## Tutor Actions

WORKED-EXAMPLE (surface velocity required for mechanical spin,
exceeding light speed); WORKED-EXAMPLE (sequential Stern-Gerlach SG-z →
SG-x → SG-z showing information erasure); WORKED-EXAMPLE (⟨S_x⟩=0
computed via Pauli matrices for |↑_z⟩); ANALOGY (spinning coin in
midair for pre-measurement superposition).

## Voice Teaching Notes

Listen for "it's literally spinning," "the magnitude is ℏ/2," "the
magnet sorts pre-existing groups," or "spin-up means locked along z" —
the four direct misconception tells. Load-bearing sentence: "spin isn't
a tiny ball rotating — it's a purely quantum property; the magnitude is
bigger than ℏ/2, that's just the biggest single component; the two spots
were always going to be there, the magnet just reveals them; and knowing
S_z exactly means S_x is totally up for grabs." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing spin as literal rotation signals MC-1 (full repair
via the surface-velocity calculation). A learner equating spin-½ with
|S⃗|=ℏ/2 signals MC-2 (full repair via the s(s+1)ℏ² magnitude
calculation). A learner describing the apparatus as creating the
outcomes signals MC-3 (full repair via the classical-smear-vs-discrete-
spots contrast). A learner assuming a locked spin vector signals MC-4
(full repair via the sequential Stern-Gerlach thought experiment).
Mastery trigger: correctly explaining the Stern-Gerlach result AND
correctly calculating eigenvalues and matrix elements using Pauli
matrices AND correctly distinguishing spin magnitude from z-component.
Blueprint's Section 11 Assessment (FA-1 through FA-4) cited for the
full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget spin for a second — if two things don't
commute, like putting on socks then shoes versus shoes then socks, does
doing one first change what the second one 'means'? Now: does measuring
S_z first change what a subsequent S_x measurement can tell you?"
(isolating the non-commutativity intuition before reapplying it to spin
components specifically). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (spin = purely quantum, no classical rotation; magnitude
(√3/2)ℏ ≠ maximum component ℏ/2; Stern-Gerlach reveals, doesn't create,
intrinsic quantization; definite S_z means maximally uncertain S_x) bound
to procedure (applying Pauli matrices to compute eigenvalues,
expectation values, and probabilities for spin states). Interleave with
`phys.qm.operators` and, once authored, `phys.qm.pauli-exclusion`.

## Transfer Connections

Near: any spin-state probability, eigenvalue, or Pauli-matrix
calculation. Far: nuclear magnetic resonance (proton spins precessing in
a magnetic field, RF pulses at the Larmor frequency flipping spins — the
basis of MRI) and quantum computing (spin-½ as the physical realization
of a qubit, Pauli matrices as single-qubit gate operators). Real-world:
MRI medical imaging and the sodium D-line spectral doublet (direct
spectroscopic evidence of spin-orbit coupling). Expert: the Dirac
equation's relativistic derivation of spin and g=2.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
biology/medicine (MRI, a direct clinical application of nuclear spin
resonance) — recorded honestly as a Curriculum Feedback item, not fixed
(no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.spin.md`,
numbered-Section format). Reuses: Section 4 Misconception Library by
reference. Not restated: Section 0 Concept Metadata, Section 1 Concept
Spine full formula set, Section 5 Explanation Library, Section 7
Demonstration Library full procedures, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to biology/
medicine (MRI as a direct clinical application of nuclear spin
resonance) — recorded honestly, not fixed (no KG or Blueprint file
modified).

## Version History

- 2026-07-23 (physics EB Wave 16): initial authoring.
