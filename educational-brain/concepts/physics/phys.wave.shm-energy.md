# Energy in Simple Harmonic Motion — `phys.wave.shm-energy`

## Identity

- **Concept ID**: `phys.wave.shm-energy` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 8.
- **Prerequisites**: `phys.wave.shm` — energy analysis directly applies
  the already-secure SHM position/velocity relationships (v = ω√(A²-x²))
  to compute KE and PE as functions of position.
- **Unlocks** (from KG): `phys.wave.damped-oscillations` — a genuine hub
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that KE in SHM is NOT constant —
it varies as KE = ½mω²(A²-x²), maximum at the equilibrium position (x=0)
and zero at the extremes (x=±A), directly because speed itself varies
throughout the motion; (2) correctly compute total mechanical energy
E = KE + PE = ½mω²A² and correctly verify it is CONSTANT at every
position throughout the oscillation, recognizing an apparent
position-dependent total as a calculation error (usually in the PE term),
not a real physical result.

## Core Understanding

Kinetic energy in SHM is NOT constant, despite the motion being periodic
and regular — since speed itself varies continuously (maximum at the
equilibrium position x=0, zero at the extremes x=±A, established already
in the prerequisite SHM velocity relationship), KE = ½mv² = ½mω²(A²-x²)
must vary correspondingly: maximum (½mω²A²) at x=0 and exactly zero at
x=±A, where the particle is momentarily at rest. What IS constant is the
TOTAL mechanical energy, E = KE + PE = ½mω²(A²-x²) + ½mω²x² = ½mω²A² —
the x² terms cancel exactly in this sum, leaving a position-independent
constant equal to ½kA² (using k=mω²). This means energy continuously
trades between kinetic and potential forms as the particle oscillates
(all potential at the extremes, all kinetic at equilibrium, a mix in
between) while the TOTAL remains exactly the same at every instant and
every position — if a computation of KE+PE at some specific position
gives a different total than at another position, this signals a
calculation ERROR (most often an incorrectly computed PE term at a
non-equilibrium position), not a genuine physical variation in total
energy for ideal, undamped SHM.

## Mental Models

**Beginner**: "The particle in SHM moves at constant speed, so its
kinetic energy doesn't change; total energy might vary from position to
position depending on how you calculate it." Upgrade trigger: computing
KE directly at x=0 and x=±A/2 using the actual SHM velocity relationship
(showing genuinely different, nonzero-varying values) directly confronts
the constant-speed assumption; computing KE+PE at several different
positions, finding the identical total every time, directly confronts
the position-dependent-total assumption.

**Intermediate**: "KE varies with position (max at x=0, zero at x=±A);
total E=KE+PE=½mω²A² is constant at every position — the x² terms cancel
exactly." This model correctly captures both core results, but sometimes
still makes an arithmetic slip in the PE term at non-equilibrium
positions, producing an apparently non-constant total that should
instead prompt rechecking the calculation.

**Advanced**: "Whenever KE+PE at some position doesn't match the expected
½mω²A², the physics (energy conservation in undamped SHM) is not in
question — the arithmetic is; recompute PE = ½mω²x² carefully at that
specific x before concluding anything unusual is happening."

**Expert**: the SHM energy relationship as a specific instance of the
general conservation-of-mechanical-energy principle applied to a
quadratic (parabolic) potential well — a natural consolidation directly
connecting to `phys.mech.conservation-of-energy`, not required for
mastery.

## Why Students Fail

The dominant failure is assuming SHM's periodic, regular motion implies
constant speed (and hence constant KE), rather than recognizing speed
itself varies continuously between maximum (at equilibrium) and zero (at
the extremes); a second, distinct failure is computing different total
energies at different positions and concluding total energy genuinely
varies, rather than recognizing this as a computational error in the PE
term.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.wave.shm-energy.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-SHM-ENERGY-CONSTANT-KE**: believing kinetic energy in SHM is
  constant, or that the particle moves at constant speed. **Birth type**:
  overgeneralization (Type 1) — SHM's periodic, "regular" appearance is
  loosely associated with "constant" properties generally, incorrectly
  extended to speed/KE specifically, which the prerequisite SHM velocity
  relationship already establishes as position-dependent. Probe: "In
  SHM, is the particle's kinetic energy the same at the equilibrium
  position (x=0) as it is at the extreme position (x=A)?"
- **MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION**: computing different total
  mechanical energies (KE+PE) at different positions in a SHM cycle.
  **Birth type**: instruction-induced (Type 5) — this typically arises
  from an arithmetic slip in computing PE at a non-equilibrium position
  (forgetting to evaluate PE = ½mω²x² correctly for that specific x),
  producing an apparently varying total that is actually a calculation
  artifact, not a genuine physical result. Probe: "You compute KE+PE at
  x=0 and get a different total than at x=3cm (with amplitude 5cm). Is
  total energy actually changing, or is something else going on?"

## Analogies

**Best**: a roller coaster car on a smooth hill — its speed (and hence
KE) clearly changes continuously (fast at the bottom, momentarily zero at
the peak), while its TOTAL mechanical energy stays constant throughout —
directly targets MC-SHM-ENERGY-CONSTANT-KE by giving a familiar,
visually intuitive image of varying KE alongside constant total energy.

**Anti-analogy**: do NOT say "SHM is periodic, so its energy stays the
same" without specifying WHICH energy (total, not kinetic alone) — this
ambiguous phrasing directly risks installing
MC-SHM-ENERGY-CONSTANT-KE by conflating "total energy constant" with "KE
constant."

## Demonstrations

Physical/conceptual: compute KE = ½mω²(A²-x²) at x=0, x=A/2, and x=A,
showing KE genuinely varies from maximum to zero — directly targets
MC-SHM-ENERGY-CONSTANT-KE. Worked-example: compute KE+PE at several
different x values (0, A/2, A), showing the total is identically ½mω²A²
every time, with any discrepancy traced to a PE calculation error —
directly targets MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION.

## Discovery Questions

Discovery-style: "at the exact center of its swing, is a SHM particle
moving faster or slower than at the extreme end of its motion — and what
does that mean for its kinetic energy at each point?" — learner reasons
through the velocity relationship, directly confronting
MC-SHM-ENERGY-CONSTANT-KE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-SHM-ENERGY-CONSTANT-KE is addressed first (establishing KE's genuine
position-dependence), before MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION,
since correctly computing KE and PE separately as functions of position
is the prerequisite skill for then verifying (or debugging) their sum's
constancy.

## Tutor Actions

WORKED-EXAMPLE (KE and PE computed at multiple positions, total verified
constant); ERROR-ANALYSIS (a solution with an incorrect PE calculation
producing an apparently non-constant total); DEMONSTRATION (roller
coaster energy trade-off analogy mapped explicitly onto SHM).

## Voice Teaching Notes

Listen for "constant speed" claims about SHM, or a computed total energy
that varies by position without the learner questioning the arithmetic —
the two direct misconception tells. Load-bearing sentence: "kinetic
energy changes throughout the swing — fastest at the center, zero at the
ends — but KE plus PE together never changes." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming constant KE or constant speed in SHM signals
MC-SHM-ENERGY-CONSTANT-KE (MISCONCEIVING, full repair via the
position-by-position KE computation). A learner computing different
totals at different positions without suspecting an arithmetic error
signals MC-SHM-TOTAL-ENERGY-DEPENDS-ON-POSITION (full repair via the
recomputation demonstration). Mastery trigger: correctly computing KE as
a function of position showing genuine variation, AND correctly
verifying the KE+PE total is constant at every position. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the total for a second — at the very
extreme point of the swing (x=A), is the particle moving at all?"
(isolating the zero-speed-at-extremes fact before building the full KE
profile). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (KE's position-dependence; total-energy conservation) bound to
procedure (KE/PE/total-energy calculation at a given position).
Interleave with `phys.wave.shm` and, once authored,
`phys.wave.damped-oscillations` (the direct KG unlock, where total energy
genuinely does decrease over time, a deliberate contrast).

## Transfer Connections

Near: any SHM energy-calculation problem, including spring-mass and
pendulum systems. Far: molecular vibration analysis (diatomic molecules
modeled as SHM oscillators with the same energy-trade-off structure) and
mechanical resonance engineering. Real-world: understanding how a
playground swing continuously trades speed for height and back, with
total energy (ignoring friction) unchanged. Expert: the SHM
energy relationship as a specific case of conservation of mechanical
energy in a quadratic potential well.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 8): initial authoring.
