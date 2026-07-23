# Quantum Treatment of Hydrogen Atom — `phys.qm.hydrogen-atom-qm`

## Identity

- **Concept ID**: `phys.qm.hydrogen-atom-qm` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 16.
- **Prerequisites**: `phys.qm.schrodinger-equation`, `phys.qm.operators`
  — solving the 3D TISE with the angular-momentum operator machinery
  already established.
- **Unlocks** (from KG): `phys.qm.perturbation-theory`, `phys.qm.
  selection-rules`, `phys.qm.variational-method`, `phys.qm.angular-
  momentum-addition` — a major hub feeding four downstream branches.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 12

## Learning Objective

The learner can: (1) correctly explain that the electron does NOT orbit
the nucleus at a definite radius like a planet — the Bohr radius a₀ is
the MOST PROBABLE radius of a probability distribution, not a fixed
orbit, and treating it as definite would violate the uncertainty
principle; (2) correctly explain that the orbital angular momentum
quantum number l is constrained to l≤n−1 (never l=n) — a mathematical
necessity for a normalizable radial solution, not an arbitrary rule;
(3) correctly explain that an orbital's visualized shape represents a
directional PROBABILITY DENSITY map, not a container holding the
electron — the electron has nonzero probability outside any drawn
boundary; (4) correctly explain that computing the TOTAL number of
states for a given n requires summing (2l+1) over ALL allowed l values
(giving n²), not just counting the states within a single subshell.

## Core Understanding

Solving the 3D Schrödinger equation for an electron in a Coulomb
potential yields exact wave functions ψ_nlm(r,θ,φ)=R_nl(r)·Y_l^m(θ,φ) and
energy levels Eₙ=−13.6 eV/n², with the three quantum numbers (n,l,m)
arising as boundary-condition integers from separation of variables — not
as postulates. A first persistent error carries over the Bohr planetary
picture, imagining the electron following a definite circular orbit at
the Bohr radius — but if the electron had a definite trajectory, position
and momentum could be simultaneously known precisely, violating
ΔxΔp≥ℏ/2; the Bohr radius a₀ is instead the PEAK of the radial probability
distribution r²|R₁₀|², with the electron genuinely spread across a range
of radii. A second error writes l up to n (e.g., l=0,1,2,3 for n=3) — but
the radial equation produces a polynomial of degree n−l−1, which fails to
terminate into a normalizable solution unless l≤n−1; this is a
mathematical necessity, not an arbitrary convention. A third error treats
the visualized p-orbital "dumbbell" shape as literally containing the
electron in its two lobes — but the shape is a 3D surface enclosing (say)
90% of the probability density |ψ|², with nonzero probability existing
outside the boundary too; the shape encodes DIRECTIONAL preference, not a
container. A fourth error counts only the m-values within one subshell
(e.g., three m-values for l=1) when asked for the TOTAL states at a given
n, forgetting to sum over all allowed l — the correct total is
Σ_{l=0}^{n-1}(2l+1)=n², so n=2 has 4 states (1 from l=0, 3 from l=1), not
just 3.

## Mental Models

**Beginner**: "The electron orbits at the Bohr radius like a planet; l
can range from 0 up to n; the orbital shape shows where the electron
literally is; n=2 has three states, one per p orbital." Upgrade trigger:
plotting the radial probability distribution for 1s and computing
P(r<a₀)≈32% (finding the electron genuinely spread, not fixed at a₀)
directly confronts the planetary-orbit assumption; building the full
(n,l,m) table for n=2 and finding 4 states (2s plus three 2p states, not
just three) directly confronts the undercounting assumption.

**Intermediate**: "The Bohr radius is the most probable radius of a
probability distribution, not a fixed orbit; l is constrained to
0,...,n−1 by normalizability; orbital shapes are directional probability
maps, not containers; total states at level n require summing (2l+1)
over all allowed l, giving n²." This model correctly captures all four
points but may still need to explicitly rebuild the (n,l,m) table for an
unfamiliar n rather than assuming a memorized count transfers.

**Advanced**: "Always distinguish the most-probable-radius (a peak in a
distribution) from a definite classical orbit, always verify l≤n−1
before listing allowed states, and always sum over ALL allowed l (not
just one subshell) when counting total degeneracy."

**Expert**: the full separation-of-variables derivation showing each of
the three ordinary differential equations (radial, polar, azimuthal)
independently produces one quantum number as a normalizability/single-
valuedness requirement, and the direct connection to multi-electron
atoms via the Pauli exclusion principle (same quantum numbers per
electron, building the periodic table's block structure) — not required
for mastery, natural bridge to `phys.qm.spin` and the periodic table.

## Why Students Fail

The dominant failure is carrying over the Bohr planetary-orbit picture
rather than recognizing a₀ as the peak of a probability distribution;
closely related failures include forgetting the l≤n−1 constraint,
treating orbital shapes as literal electron containers rather than
directional probability maps, and undercounting total degeneracy by
summing only within one subshell rather than across all allowed l.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.hydrogen-atom-qm.md`,
Section 4 Misconception Library) documents four; reused by reference
with birth-type added.

- **MC-1 (electrons orbit the nucleus like planets)**: believing "it
  orbits at the Bohr radius, like a planet." **Birth type**: analogy
  overextension (Type 6) — the historically-taught Bohr model's vivid
  planetary picture is carried forward into the full quantum treatment,
  missing that a definite trajectory would violate the uncertainty
  principle and that the Bohr radius is only the most probable, not a
  fixed, radius. Probe: "Where is the electron in the ground state of
  hydrogen?"
- **MC-2 (l can equal n)**: believing "l=0,1,2,3" for n=3, forgetting the
  l≤n−1 constraint. **Birth type**: overgeneralization (Type 1) — a
  natural but incorrect assumption that l ranges up to and including n
  (mirroring how n itself starts at 1), missing that the radial
  equation's normalizability requirement mathematically forces
  l≤n−1. Probe: "What are the allowed l values for n=3?"
- **MC-3 (the orbital shape shows where the electron literally is)**:
  believing "the electron is in the two lobes" of a p-orbital's dumbbell
  shape. **Birth type**: perceptual intuition (Type 2) — a 3D visual
  drawn as a bounded shape is intuitively read as a container, missing
  that it represents a probability-density surface with nonzero
  probability existing outside the drawn boundary too. Probe: "What does
  the p_x orbital dumbbell shape mean?"
- **MC-4 (n=1 has three states — or more generally, total states are
  undercounted by summing only one subshell)**: believing "n=2 has
  three states, one for each p orbital," forgetting the 2s state. **Birth
  type**: overgeneralization (Type 1) — attention narrows to the most
  visually memorable subshell (p orbitals with their 3 states) while
  forgetting to include the s subshell, missing that the correct total
  sums (2l+1) over ALL allowed l. Probe: "How many distinct quantum
  states does n=2 have (ignoring spin)?"

## Analogies

**Best**: standing waves on a spherical balloon, where only certain wave
patterns "fit" without discontinuity — the quantum numbers n, l, m label
these standing-wave modes, and energy quantization is the condition that
the wave closes on itself smoothly — directly targets MC-1 by replacing
a definite-orbit picture with a distributed-wave picture from the start.

**Anti-analogy**: do NOT say "the hydrogen atom is basically the Bohr
model with some quantum corrections" — this directly reinforces MC-1;
the Bohr model gets Eₙ right by coincidence but is wrong about electron
location, wrong about angular momentum quantization (Bohr: L=nℏ; QM:
L=√(l(l+1))ℏ), and even predicts nonzero angular momentum for the ground
state where QM correctly gives L=0 (since 1s has l=0).

## Demonstrations

Worked-example: plot the 1s radial probability distribution r²|R₁₀|² and
compute P(r<a₀)≈32%, showing the electron has a genuine SPREAD around
the peak at a₀, not a fixed orbit — directly targets MC-1. Worked-
example: build the full (n,l,m) table for n=1,2,3 and verify the counts
1, 4, 9 (=n²) — directly targets MC-2 and MC-4 simultaneously by forcing
correct l-range enumeration and complete summation across subshells.

## Discovery Questions

Discovery-style: "The Balmer formula 1/λ=R_H(1/4−1/n²) was known from
spectroscopy in 1885, decades before quantum mechanics. Given that photon
energy hν=Eₙ₂−Eₙ₁, what functional form must Eₙ have to produce this
formula?" — learner derives Eₙ∝−1/n² themselves, connecting the abstract
quantum-number machinery to a pre-existing experimental result, reframing
quantization as an EXPLANATION of known data rather than an arbitrary
postulate.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: plot 1s radial probability showing the peak-not-definite
nature of a₀ → build the (n,l,m) table for n=3 verifying n²=9 → calculate
the Balmer Hα wavelength from Eₙ=−13.6/n² eV). MC-1 (planetary orbit) is
addressed first via the radial-probability plot, before MC-2/MC-4
(quantum-number constraints and counting) during the (n,l,m) table
construction, with MC-3 (orbital-shape-as-container) addressed
alongside the orbital-shape discussion embedded in the same session.

## Tutor Actions

WORKED-EXAMPLE (1s radial probability distribution plotted, P(r<a₀)≈32%
computed); WORKED-EXAMPLE (full (n,l,m) table built for n=1,2,3,
verifying counts 1,4,9); THOUGHT-EXPERIMENT (deriving Eₙ∝−1/n² from the
pre-existing Balmer formula); ANALOGY (standing waves on a spherical
balloon for quantized orbital modes).

## Voice Teaching Notes

Listen for "it orbits at the Bohr radius," "l goes up to n," "the
electron is in the lobes," or undercounting states by subshell alone —
the four direct misconception tells. Load-bearing sentence: "the Bohr
radius is where the electron is MOST LIKELY to be, not a fixed orbit;
l only goes up to n minus one; the orbital shape is a probability map,
not a box; and you have to add up every allowed l to get the true
count." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing a definite electron orbit signals MC-1 (full repair
via the radial-probability-distribution plot). A learner listing l up to
n signals MC-2 (full repair via the (n,l,m) table construction showing
non-normalizable solutions for l=n). A learner treating the orbital shape
as a container signals MC-3 (full repair via the |ψ_2pz|² angular-
dependence calculation). A learner undercounting total states by
subshell alone signals MC-4 (full repair via the complete n²-summation
table). Mastery trigger: correctly writing quantum numbers for any given
state AND correctly computing energy from Eₙ=−13.6/n² AND correctly
calculating spectral-line wavelengths AND correctly counting degeneracy
via the full n² summation. Blueprint's Section 11 Assessment (FA-1
through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the hydrogen atom for a second — if I hand
you a coin-flip probability distribution with a peak at 'heads more
often,' does that mean every single flip MUST be heads? What does 'most
probable' actually mean?" (isolating the peak-of-a-distribution-vs-
guaranteed-outcome distinction before reapplying it to the Bohr radius
specifically). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Bohr radius = peak of a distribution, not a fixed orbit; l
constrained to 0,...,n−1 by normalizability; orbital shapes = probability
maps, not containers; total states = Σ(2l+1) over all allowed l = n²)
bound to procedure (solving the separated radial/angular equations;
building the complete (n,l,m) enumeration table; computing spectral
transition energies). Interleave with `phys.qm.schrodinger-equation`,
`phys.qm.operators`, and, once authored, `phys.qm.spin`.

## Transfer Connections

Near: any hydrogen-atom quantum-number, energy-level, or spectral-line
problem. Far: multi-electron atoms (same quantum-number structure,
approximate solutions with electron-electron repulsion and shielding)
and the periodic table (the s/p/d/f block structure directly reflects
l=0,1,2,3 subshells combined with the Pauli exclusion principle).
Real-world: understanding atomic emission/absorption spectra (Lyman,
Balmer, Paschen series) used in astronomical spectroscopy and chemical
identification. Expert: hydrogen-like ions (He⁺, Li²⁺) and the nuclear
shell model, both reusing the same spherically-symmetric separation-of-
variables pattern.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (atomic orbital theory, the periodic table's block structure,
molecular orbital theory built directly on this quantum-number
framework) — recorded honestly as a Curriculum Feedback item, not fixed
(no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.hydrogen-atom-
qm.md`, numbered-Section format). Reuses: Section 4 Misconception
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
(atomic/molecular orbital theory, periodic table structure directly
built on this concept's quantum-number framework) — recorded honestly,
not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 16): initial authoring.
