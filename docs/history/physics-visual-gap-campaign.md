# Physics visual gap campaign (2026-09-30, owner instruction: "Keep running physics concepts. Check visuals and missing visuals. Fix everything in visuals and in concepts if any defects")

## The audit (local, no production traffic, no DB egress)

`resolveVisual` over all 238 physics KG concepts, on an ordinary turn and on "show me a diagram".

| Class | Count (before) | Meaning |
|---|---|---|
| CONCEPT | 43 | An own figure, served as a figure OF the concept |
| GENERAL | 32 | Only a "general illustration" (scope.ts INSUFFICIENT_FOR_CONCEPT) of something related |
| NONE | 163 | No deterministic figure; relies on Tier-3 live generation, often declined or critic-rejected |

GENERAL includes displacement/velocity/acceleration (number line), newtons-third-law, tension,
inclined-plane, work, momentum/impulse (a collision), angular momentum, universal-gravitation and
gravitational-field (an orbit), hookes-law, ideal-gas/thermodynamic-processes/carnot (an empty
coordinate plane), shm and shm-energy (a pendulum), ohms-law/electric-current/dc-circuits (a series
circuit).

NONE includes, among core school topics: units/dimensions/errors, kinetic and potential energy,
work-energy, conservation of energy, power, centre of mass, moment of inertia, pressure,
buoyancy, Bernoulli, temperature, thermal expansion, heat transfer, specific heat, phase changes,
kinetic theory, spring-mass, damped/forced oscillation, wave properties, longitudinal waves,
superposition, standing waves, sound, Doppler, beats, reflection, dispersion, diffraction,
polarization, charge, Coulomb's law, electric field, Gauss, potential, capacitance, magnetic field,
Lorentz force, Biot-Savart, Ampère, solenoid, Faraday, Lenz, AC, EM waves, photoelectric effect,
radioactivity, nuclear reactions, semiconductors and p-n junction. Advanced topics (Hamiltonian
mechanics, QM formalism, statistical mechanics, particle physics, relativity) are also NONE.

## Batch 1 — ten authored figures (physicsCoreScenes.ts)

Each figure is grounded in its KG description and draws what that description defines. Numbers are
computed, not eyeballed. Each was rendered in Chromium at 1280 px and checked by eye.

| Concept | Figure |
|---|---|
| phys.opt.reflection | Flat mirror, normal, incident and reflected rays at 35°, θi = θr. **Left the retired register** (its old concave-mirror image diagram had none of these), following the 18 bio.cell rows removed on 2026-09-24; registry row no longer names ray_optics. |
| phys.em.coulombs-law | Two like charges at r with equal and opposite forces; the same pair at 2r with arrows ¼ as long (1/r²). |
| phys.em.electric-field | Field arrows out of +q, into −q; a test charge with E = F/q₀. |
| phys.em.magnetic-field | Bar magnet, loops leaving N and entering S, direction marks, "lines crowd: strong field". |
| phys.wave.standing-waves | 3rd harmonic, both extreme shapes, 4 nodes incl. both ends, antinodes midway, λ = 2L/3. |
| phys.wave.doppler-effect | Wavefronts centred on the source's past positions (vs = 0.5 vw): bunched ahead, spread behind. |
| phys.mech.conservation-of-energy | Falling ball at three heights with PE/KE bars that always sum to the same total. |
| phys.therm.heat-transfer | Conduction rod, convection loop in a pan, radiation waves. |
| phys.mech.buoyancy | Floating block, displaced water marked, buoyant force = weight (equilibrium). |
| phys.mech.hookes-law | Spring at natural length and stretched by x; restoring force opposite to x, F = −kx. Removed from INSUFFICIENT_FOR_CONCEPT. |

Tests: `physicsCoreScenesBatch1.test.ts`. It checks each figure's physics, not just its presence:
- equal angles for reflection;
- F/4 at 2r for Coulomb's law;
- field direction for the electric field;
- N→S for the magnetic field;
- the node positions for standing waves;
- the wavefront centres for Doppler;
- the constant PE + KE total;
- equal forces for buoyancy;
- the restoring-force direction for Hooke's law.

It also checks that everything stays inside ±5 and that each concept is served at concept scope.
Retired register 25 → 24; INSUFFICIENT_FOR_CONCEPT 46 → 45. The tests that used reflection as
their "retired" example now use phys.em.potentiometer, which is still retired.

## Concept defect fixed in the same batch: authoring notes shown to learners

Production (2026-09-30, refraction) served "RETRIEVAL PRACTICE (P-3b style, lateral shift): For the
glass slab above (…)" through the Quick check prose path. Two causes:
1. `stripAuthoringLabel` knew DIAGNOSTIC/FORMATIVE/… but not RETRIEVAL PRACTICE, TRANSFER or MASTERY
   GATE — 384 authored stems. The Quick check prose path (`formatProbeAsFollowUp`) did not call it
   at all.
2. 125 stems end with a grader's note, "Pass criterion (5-probe bank, 4/5 at threshold 0.80): …".
Fixed at presentation: all labels plus the trailing note are stripped, on both paths.
`dependsOnEarlierItem` keeps the two follow-ups written for an earlier item ("For the glass slab
above", "For the two-loop circuit above") from being served on their own. `authoringLabelCoverage.test.ts`
runs every stem in the corpus through the strip.

## Next batches (queue, most-taught first)

- Mechanics: kinetic/potential energy, work-energy, power, pressure, Bernoulli, centre of mass,
  moment of inertia, newtons-third-law, inclined-plane, tension, work (F-d area),
  momentum/impulse (force-time).
- Thermal: thermal expansion, phase changes (heating curve), kinetic theory, ideal-gas
  (P-V isotherm), Carnot (P-V cycle).
- Waves: wave properties (labelled wave), longitudinal waves, superposition, sound, beats,
  spring-mass, damped oscillations.
- Optics and E&M: dispersion (prism), diffraction/single slit, polarization, capacitance,
  Lorentz force, solenoid, Faraday/Lenz, AC sine.
- Modern: photoelectric effect, radioactive decay curve, p-n junction.
