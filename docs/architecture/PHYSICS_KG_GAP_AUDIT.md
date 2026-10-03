# Physics knowledge-graph gap audit (2026-10-03)

**Status: proposal for owner approval.** Nothing in `docs/physics/kg/graph.json` was changed.

## Why this exists

- **Owner decision, 2026-10-03:** no board or exam mapping. Instead, each subject's knowledge
  graph is enhanced until it covers the whole subject.
- **Checklists used, only to find gaps (none of them is stored in the product):**
  - NCERT science and physics, Classes 6–12;
  - the JEE/NEET physics topic lists;
  - A-level, AP and IB physics;
  - first-year university physics.
- **Rule change this needs:** CLAUDE.md names the external Curriculum Production Pipeline as the
  only authority over KGs. Adding these concepts needs the owner's recorded exception. The
  precedent is the 2026-07-22 physics extension.

## Method (reproducible)

1. **Inventory.**
   - 238 concepts in 12 domains: meas 8, mech 60, therm 18, wave 17, opt 15, em 35, mod 21,
     qm 19, rel 8, stat 15, astro 6, particle 16.
2. **Topic checklist.**
   - 90 topics, each with keyword patterns: 19 school, 41 Class 11–12, 30 advanced.
3. **Matching, in three passes.**
   - **Pass 1:** concept name and description. The descriptions are one line each, so this pass
     misses topics taught inside a parent, and also produces false hits (e.g. "density" matched
     `density-matrix`).
   - **Pass 2:** the physics Educational Brain entries (`educational-brain/concepts/physics/*.md`,
     238 files) and the authored seed assets.
   - **Pass 3:** each candidate was read in context in its likely parent entry, to tell *taught*
     (a learning objective, a worked example or a probe) apart from *mentioned*.
4. **Classification.**
   - **NEW:** no taught home anywhere, so a node is needed.
   - **THIN:** taught in passing inside a parent. Enrich the parent's EB entry and probes; no new
     node.
   - **COVERED:** taught.
   - **ELSEWHERE:** belongs to another subject's KG.

## Result

| Outcome | Count |
| --- | --- |
| Checklist topics examined | 90 |
| **New concepts proposed (§A + §B)** | **47**: 31 core (school to JEE/NEET), 16 advanced |
| Enrichments to existing concepts (§C) | 15 |
| Topics found already taught (§D) | 31 |
| Belongs to another KG or out of scope (§E) | 2 |

- Outcomes are not a clean split of the 90 topics. Some topics become two nodes (LCR → impedance
  and AC power). Some are split for teaching (density / mass and weight). A few nodes cover
  checklist topics jointly.

After approval, physics would grow from 238 to 285 concepts. The work follows the biology
extension pattern:
- KG nodes;
- an EB entry per concept, in prerequisite order;
- seed content: explanations plus the 3-probe contract;
- production convergence;
- QA.

### A. New concepts — core tier (school to Class 12, JEE/NEET). 31 nodes, recommended first

Format: proposed id · name · difficulty · requires (existing ids) · evidence.

**Measurement**
1. `phys.meas.density` · Density and Relative Density · foundational · `phys.meas.units` · used
   in buoyancy, never taught.
2. `phys.meas.measuring-instruments` · Vernier Calipers and Screw Gauge · developing ·
   `phys.meas.errors` · named once in `errors`, never taught.
3. `phys.meas.experimental-graphs` · Graphs, Linearisation and Uncertainty Propagation ·
   proficient · `phys.meas.errors`, `phys.meas.significant-figures` · not taught.

**Mechanics**
4. `phys.mech.mass-and-weight` · Mass, Weight and Free Fall · foundational · `phys.mech.force` ·
   only implicit.
5. `phys.mech.simple-machines` · Simple Machines and Mechanical Advantage · developing ·
   `phys.mech.torque`, `phys.mech.work` · "mechanical advantage" 0 hits.
6. `phys.mech.constraint-motion` · Connected Bodies, Pulleys and Constraint Relations ·
   proficient · `phys.mech.tension`, `phys.mech.newtons-second-law` · `tension` covers one pulley
   case only.
7. `phys.mech.non-inertial-frames` · Non-inertial Frames and Pseudo Forces · proficient ·
   `phys.mech.relative-motion`, `phys.mech.newtons-second-law` · named only as a "gateway".
8. `phys.mech.variation-of-g` · Variation of g and Weightlessness · proficient ·
   `phys.mech.gravitational-field` · 1 mention.
9. `phys.mech.fluid-flow` · Equation of Continuity, Streamline and Turbulent Flow ·
   proficient · `phys.mech.pressure-fluids` · "continuity" 0 hits. `bernoulli` should then
   require it.
10. `phys.mech.terminal-velocity` · Drag and Terminal Velocity · proficient ·
    `phys.mech.viscosity`, `phys.mech.newtons-second-law` · 0 hits in `viscosity`.

**Thermal**
11. `phys.therm.newtons-law-of-cooling` · Newton's Law of Cooling · proficient ·
    `phys.therm.heat-transfer` · one line only.
12. `phys.therm.blackbody-radiation` · Blackbody Radiation: Stefan–Boltzmann and Wien ·
    proficient · `phys.therm.heat-transfer` · Wien 0 hits, blackbody 0 hits.
13. `phys.therm.specific-heats-of-gases` · Cp, Cv, Mayer's Relation and γ · proficient ·
    `phys.therm.first-law`, `phys.therm.kinetic-theory` · 0 hits.
14. `phys.therm.energy-resources` · Sources of Energy and Efficiency · foundational ·
    `phys.mech.power` · not taught (school chapter).

**Waves and sound**
15. `phys.wave.echo-and-sonar` · Echo, SONAR and Uses of Ultrasound · developing ·
    `phys.wave.sound-waves`, `phys.opt.reflection` · echo 1 mention, SONAR 0.

**Optics**
16. `phys.opt.rectilinear-propagation` · Light Sources, Shadows, Eclipses, Pinhole Camera ·
    foundational · (none) · a middle-school entry point. `nature-of-light` is proficient.
17. `phys.opt.human-eye` · The Human Eye and Defects of Vision · developing · `phys.opt.lenses`,
    `phys.opt.lens-power` · partial in `optical-instruments` (hypermetropia 0, near point 0).
18. `phys.opt.scattering-of-light` · Scattering of Light: Blue Sky, Red Sunset, Tyndall ·
    developing · `phys.opt.nature-of-light` · 0 hits.
19. `phys.opt.thin-film-interference` · Thin-film Interference · advanced ·
    `phys.opt.youngs-experiment`, `phys.opt.refraction` · not taught.
20. `phys.opt.diffraction-grating` · Diffraction Grating and Spectra · advanced ·
    `phys.opt.diffraction` · "grating" 0 hits.
21. `phys.opt.resolving-power` · Resolving Power of Optical Instruments · advanced ·
    `phys.opt.diffraction`, `phys.opt.optical-instruments` · 0 hits.

**Electricity and magnetism**
22. `phys.em.electrostatic-potential-energy` · Potential Energy of a System of Charges ·
    proficient · `phys.em.electric-potential` · 0 hits.
23. `phys.em.conductors-electrostatics` · Conductors, Shielding and Van de Graaff · advanced ·
    `phys.em.gauss-law`, `phys.em.electric-potential` · not taught.
24. `phys.em.cells-combination` · Cells in Series and Parallel · proficient · `phys.em.emf`,
    `phys.em.dc-circuits` · 0 hits.
25. `phys.em.moving-coil-galvanometer` · Galvanometer, Ammeter and Voltmeter Conversion ·
    proficient · `phys.em.magnetic-force`, `phys.mech.torque` · "galvanometer" 0, "shunt" 0.
26. `phys.em.lcr-circuits` · Series LCR Circuit: Impedance, Resonance, Q factor · advanced ·
    `phys.em.ac-basics`, `phys.em.self-inductance`, `phys.em.capacitance` · LCR 0 hits;
    impedance only as an "expert" aside.
27. `phys.em.ac-power` · Power in AC Circuits, Power Factor and Wattless Current · advanced ·
    `phys.em.lcr-circuits` · 0 hits.
28. `phys.em.motors-and-generators` · Electric Motor and Generator · developing ·
    `phys.em.magnetic-force`, `phys.em.faradays-law` · a passing mention only (school chapter).
29. `phys.em.domestic-electricity` · Household Circuits, Fuses, Earthing and Safety ·
    developing · `phys.em.electrical-power` · fuse 0, earthing 0.

**Modern physics**
30. `phys.mod.atomic-models` · Thomson and Rutherford Models, Alpha Scattering · proficient ·
    `phys.em.coulombs-law` · Rutherford 0, Thomson 0. `bohr-model` should then require it.
31. `phys.mod.nucleus-size-and-force` · Nuclear Composition, Size, Density and Nuclear Force ·
    proficient · `phys.mod.atomic-models` · 0 hits.

### B. New concepts — advanced tier (A-level, IB, university). 16 nodes

32. `phys.mod.special-diodes` · Zener, LED, Photodiode, Solar Cell · expert ·
    `phys.mod.pn-junction` (Zener 0 hits).
33. `phys.mod.transistors` · Bipolar Junction Transistor: Amplifier and Switch · expert ·
    `phys.mod.pn-junction` (1 mention).
34. `phys.mod.logic-gates` · Logic Gates and Digital Electronics · proficient ·
    `phys.mod.transistors` (0 hits).
35. `phys.mod.communication-systems` · Modulation and Signal Propagation · proficient ·
    `phys.em.electromagnetic-waves` (0 hits).
36. `phys.mod.lasers` · Lasers: Stimulated Emission and Population Inversion · advanced ·
    `phys.mod.atomic-spectra`, `phys.mod.photons` ("stimulated" 0 hits).
37. `phys.mod.radiation-safety` · Radiation Dose, Biological Effects and Safety · proficient ·
    `phys.mod.radioactivity` (0 hits).
38. `phys.mod.superconductivity` · Superconductivity · expert ·
    `phys.em.magnetic-materials`, `phys.mod.energy-bands` (1 mention).
39. `phys.em.hall-effect` · The Hall Effect · advanced · `phys.em.magnetic-force` (1 sentence).
40. `phys.em.radiation-and-antennas` · Radiation from Accelerating Charges, Radiation Pressure ·
    expert · `phys.em.electromagnetic-waves`.
41. `phys.em.fields-in-matter` · Fields in Matter: D, H and Boundary Conditions · expert ·
    `phys.em.dielectrics`, `phys.em.magnetic-materials`.
42. `phys.wave.coupled-oscillators` · Coupled Oscillators and Normal Modes · expert ·
    `phys.wave.shm`, `phys.wave.standing-waves`.
43. `phys.mech.nonlinear-dynamics` · Nonlinear Dynamics and Chaos · expert ·
    `phys.wave.forced-oscillations`.
44. `phys.astro.solar-system` · The Solar System, Seasons, Phases, Eclipses and Tides ·
    foundational · `phys.mech.universal-gravitation` (tides: 2 mentions).
45. `phys.astro.stellar-properties` · Luminosity, Magnitude and the HR Diagram · advanced ·
    `phys.therm.blackbody-radiation` (HR: 1 mention).
46. `phys.astro.distance-ladder` · Parallax, Standard Candles and Hubble's Law · advanced ·
    `phys.astro.stellar-properties` (parallax 0 hits).
47. `phys.rel.general-relativity-intro` · Equivalence Principle and Curved Spacetime · expert ·
    `phys.rel.spacetime`, `phys.mech.universal-gravitation` (0 hits).

### C. Thin: enrich the existing concept's EB entry and probes (no new node)

| Topic | Enrich |
| --- | --- |
| Perpendicular-axis theorem, radius of gyration | `phys.mech.moment-of-inertia` |
| Conical pendulum | `phys.mech.circular-motion` |
| Elastic potential energy of a stretched wire | `phys.mech.stress-strain` |
| Barometer, atmospheric pressure | `phys.mech.pressure-fluids` |
| Reynolds number | via new `phys.mech.fluid-flow` |
| Lightning, earthing of charge | `phys.em.electric-charge` |
| Meter bridge | `phys.em.wheatstone-bridge` |
| Colour code of resistors | `phys.em.resistivity` |
| Definition of the ampere | `phys.em.magnetic-force` |
| Reactor moderators, control rods | `phys.mod.nuclear-fission` |
| Twinkling of stars, advance sunrise | `phys.opt.refraction` |
| Timbre and quality of sound | `phys.wave.sound-waves` |
| Relativistic Doppler effect | `phys.rel.lorentz-transform` |
| Entanglement, Bell inequalities | `phys.qm.density-matrix` |
| Mean free path (one line now) | `phys.therm.kinetic-theory` |

### D. Covered (no action)

Pascal's law and hydraulics, banked roads and the vertical circle, the parallel-axis theorem,
Poisson's ratio, rms speed, equipartition and degrees of freedom, the Einstein photoelectric
equation, equipotentials, capacitors in series and parallel, motional EMF, AC generators, eddy
currents, rainbows and minimum deviation, optical fibres and mirages, the cyclotron and
helical motion, hysteresis and susceptibility, organ pipes and strings, wave reflection at a
fixed end, Hubble's law, transformers, Bragg/X-ray crystallography, Fermat's principle,
Poynting vector, pseudo-forces in a lift (via `free-body-diagram`), audible range and
ultrasound, static charging by rubbing and induction, the electroscope, the compass and bar
magnet, density in buoyancy context, kWh billing, v–t graph areas.

### E. Elsewhere / out of scope

- **Electrolysis and electroplating:** already in chemistry (`chem.elect.electrolysis`).
- **Biophysics and geophysics:** out of scope for the physics KG for now. They would be
  cross-links if biology or earth science is added.

## What the owner is asked to decide

1. **Approve the rule exception.** Physics KG extension, owner-authorised, coverage-driven, no
   board mapping. It is recorded in CLAUDE.md as a standing exception, following the 2026-07-22
   precedent.
2. **Approve the scope:**
   - A (31 core), or A+B (47), or a trimmed list;
   - C (15 enrichments to existing EB entries and probes).
3. **Order:** core tier first, in prerequisite order, in batches of 3–4 concepts. Each batch
   goes through the KG validator, tsc, tests, then EB and seed content in the following batches.
   The biology extension pattern.

## Honest limits

- The checklist is a judgement list, so a topic not on it was not checked. Re-run the method with
  an expanded checklist after the core tier lands.
- Pass 3 read the most likely parent entry for each topic, not all 238 entries. A topic taught
  in an unexpected entry could be listed as NEW when it isn't. Each NEW item is re-checked with a
  repo-wide grep at authoring time, before its node is added.
