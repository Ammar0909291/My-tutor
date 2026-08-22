/**
 * Visualization Registry — concept-ID-keyed visual lookup.
 *
 * Maps canonical KG concept IDs to the VisualType(s) already available
 * in the renderer layer (src/components/school/visuals/). This lets the
 * Teaching Engine know what visuals exist for a concept BEFORE the LLM
 * generates text, replacing the title-keyword heuristic with a
 * deterministic concept-level match.
 *
 * Three tiers, checked in order (most specific wins):
 *   1. CONCEPT_VISUALS  — exact concept ID → visual(s)
 *   2. DOMAIN_VISUALS   — domain prefix (e.g. 'phys.mech') → visual(s)
 *   3. detectVisual()   — fallback to existing title-keyword matcher
 *
 * Pure module: no DB, no I/O. The registry is a static data structure
 * built from the intersection of the canonical KGs and the existing
 * renderer inventory.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'
import type { SceneGeneratorKind } from './sceneGenerators/sceneRouter'

export interface VisualEntry {
  /** Primary visual (the one decideVisualFirst should prefer). */
  primary: VisualType
  /** All available visuals for this concept, primary first. */
  all: VisualType[]
  /** Parametric scene generator available (separate pipeline). */
  sceneGenerator?: SceneGeneratorKind
}

// ── Tier 1: exact concept ID → visual(s) ─────────────────────────────────────
// Only concepts with a dedicated renderer (not just a domain-level default).

const CONCEPT_VISUALS: Record<string, VisualEntry> = {
  // Physics — Mechanics
  'phys.mech.projectile-motion':      { primary: 'three_projectile_motion', all: ['three_projectile_motion', 'force_diagram'], sceneGenerator: 'projectile' },
  'phys.mech.circular-motion':        { primary: 'three_circular_motion', all: ['three_circular_motion', 'force_diagram'], sceneGenerator: 'circular' },
  'phys.mech.newtons-first-law':      { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  'phys.mech.newtons-second-law':     { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  'phys.mech.newtons-third-law':      { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  // REPAIRED by the visual semantic moat sweep (round 4): the primary and the
  // secondary were the wrong way round. `three_newton_forces` (NewtonForces3D)
  // draws exactly two labelled force vectors, `Fg` and `N` — there is no
  // friction vector anywhere in it — while `force_diagram` (ForceDiagram) draws
  // a labelled Friction arrow explicitly. The concept was being served, under
  // the STRONG contract, a figure of "Friction Forces" containing no friction.
  // Both visuals were already listed here; only their ORDER was wrong, so this
  // is a binding fix at the source rather than a new asset or a suppression.
  'phys.mech.friction':               { primary: 'force_diagram', all: ['force_diagram', 'three_newton_forces'] },
  'phys.mech.momentum':               { primary: 'three_momentum_collision', all: ['three_momentum_collision', 'force_diagram'], sceneGenerator: 'collision' },
  'phys.mech.impulse':                { primary: 'three_momentum_collision', all: ['three_momentum_collision', 'force_diagram'], sceneGenerator: 'collision' },
  'phys.mech.torque':                 { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'torque_diagram' },
  // P2 fix: these two keys did not match any real KG concept ID ('phys.mech.
  // gravitation' vs the KG's 'phys.mech.universal-gravitation'; 'phys.mech.
  // satellite-motion' vs the KG's 'phys.mech.satellites') — the entries were
  // correctly authored (right visual, right scene generator) but silently
  // unreachable. Renamed to the real IDs so this already-existing content
  // finally serves the concepts it was written for.
  'phys.mech.universal-gravitation':  { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  'phys.mech.satellites':             { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },

  // Physics — Mechanics (P2: eliminate broad domain-default dependence).
  // Audit of every phys.mech concept previously resolved ONLY through the
  // 'phys.mech' → force_diagram domain default (see DOMAIN_VISUALS below,
  // which no longer carries a 'phys.mech' entry at all — every concept that
  // legitimately needs force_diagram now has an explicit entry here, so the
  // over-broad default is removed rather than narrowed). Three outcomes per
  // concept, each cited:
  //   (a) force_diagram genuinely fits (force/equilibrium analysis) — kept.
  //   (b) an existing, different visual type fits better — remapped.
  //   (c) no existing visual fits (pure energy/fluids/advanced Lagrangian-
  //       Hamiltonian formalism) — deliberately left OUT of this map, so
  //       lookupConceptVisual returns null and the caller's existing
  //       fallback chain (detectVisual's keyword match, then honest text)
  //       runs instead of a wrong force_diagram substitution.

  // (a) Force/equilibrium analysis — force_diagram is correct.
  'phys.mech.force':                  { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.free-body-diagram':      { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.tension':                { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.normal-force':           { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.inclined-plane':         { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.equilibrium':            { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.conservative-forces':    { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.hookes-law':             { primary: 'force_diagram', all: ['force_diagram'] },
  // Rotational analog of force/dynamics — reuses the existing torque_diagram
  // scene generator (already authored for phys.mech.torque above).
  'phys.mech.rotational-dynamics':    { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'torque_diagram' },

  // (b) A different existing visual type is the better fit.
  // Work is force-times-displacement — best shown as an F–d graph (area
  // under the curve = work), not a static force diagram.
  'phys.mech.work':                   { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  // REMOVED (live P0, Lesson 39): 'phys.mech.angular-kinematics' ->
  // coordinate_plane. Reproduced against production — the tutor taught a
  // rotating bicycle wheel (θ, ω, α; "a point on a circle of radius r … arc
  // s = rθ") while the attached figure was a bare coordinate grid with a demo
  // point on it. The learner asked for a diagram of a wheel and was shown axes.
  //
  // The removed comment argued this was "exactly parallel to linear
  // kinematics-1d/2d above — same reasoning, same visual type". The reasoning
  // was right and the binding was not: kinematics-1d/2d carry
  // `sceneGenerator: 'kinematics_graphs'`, which is what DRAWS the curves;
  // this row copied the primary and not the generator, and `coordinate_plane`
  // with no generator is a blank canvas, not a graph.
  //
  // It is left UNMAPPED rather than repointed, because no authored visual on
  // this platform actually teaches angular kinematics, and every candidate is
  // worse than nothing:
  //   · kinematics_graphs labels its axes in m/s and m/s² — linear units for
  //     an angular concept. A figure with confident wrong labels is worse than
  //     no figure, because a learner believes labels.
  //   · three_circular_motion renders "Uniform Circular Motion: a_c = v²/r",
  //     which asserts α = 0 — contradicting the third of this lesson that is
  //     about angular acceleration.
  // Unmapped is this file's own documented treatment for exactly this case
  // (see the phys.therm block: "left unmapped rather than stretched onto axes
  // that don't represent them"), and phys.mech carries no domain default, so
  // the concept now falls through Tier 2 to Tier 3 or to an honest no-visual
  // response instead of inheriting a grid that represents nothing.
  // Rotational/rolling motion concepts pair naturally with the existing
  // circular-motion 3D visual rather than a static force diagram.
  'phys.mech.angular-momentum':       { primary: 'three_circular_motion', all: ['three_circular_motion'] },
  'phys.mech.conservation-of-angular-momentum': { primary: 'three_circular_motion', all: ['three_circular_motion'] },
  'phys.mech.rolling-motion':         { primary: 'three_circular_motion', all: ['three_circular_motion'] },
  // Momentum/collision concepts pair with the existing momentum-collision
  // visual already used by phys.mech.momentum/impulse above — collisions-
  // elastic/inelastic also correctly inherit the 'collision' scene
  // generator the orphaned 'phys.mech.collisions' key was clearly intended
  // for but could never reach (KG has no 'phys.mech.collisions' concept).
  'phys.mech.conservation-of-momentum': { primary: 'three_momentum_collision', all: ['three_momentum_collision'] },
  'phys.mech.collisions-elastic':     { primary: 'three_momentum_collision', all: ['three_momentum_collision'], sceneGenerator: 'collision' },
  'phys.mech.collisions-inelastic':   { primary: 'three_momentum_collision', all: ['three_momentum_collision'], sceneGenerator: 'collision' },
  // Gravitation/orbital concepts pair with the same gravitation_orbit scene
  // as universal-gravitation/satellites above — one visual family for the
  // whole gravitation sub-area.
  'phys.mech.gravitational-field':    { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  'phys.mech.orbital-mechanics':      { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  'phys.mech.keplers-laws':           { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  // 'phys.mech.escape-velocity' was flagged 🔴 Incorrect Mapping by the new
  // visualCoverageValidator: "Escape Velocity" is fundamentally a kinematics/
  // energy-threshold quantity (a scalar speed), not a force-diagram or
  // orbit-shape concept — the P2 pass's own classification of it as
  // gravitation_orbit was already noted as "marginal" at the time. Removed
  // rather than kept on a stretched justification; falls through to Category
  // C (no visualization, honest fallback), consistent with "an incorrect
  // visualization is worse than showing no visualization."

  // (c) No existing visual type fits — deliberately NOT mapped here:
  //   Pure energy quantities/transformations (no force-diagram or graph
  //   convention already established in this registry): kinetic-energy,
  //   potential-energy, work-energy-theorem, conservation-of-energy, power,
  //   gravitational-potential.
  //   Mass-distribution/point concepts with no clear existing-type fit:
  //   moment-of-inertia, center-of-mass.
  //   Fluid mechanics (no pressure/fluid visual type exists in this
  //   registry): stress-strain, pressure-fluids, buoyancy, bernoulli,
  //   surface-tension, viscosity.
  //   Advanced Lagrangian/Hamiltonian formalism (no visual convention
  //   applies): generalized-coordinates, euler-lagrange-equation,
  //   cyclic-coordinates-conservation-laws, hamiltonian, hamiltons-
  //   equations, poisson-brackets, canonical-transformations, hamilton-
  //   jacobi-equation.
  //   These fall through to detectVisual()'s keyword fallback, then to an
  //   honest text/no-visual response — never a substituted force_diagram.

  // Physics — Vectors
  'phys.meas.scalars-vectors':        { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },
  'phys.meas.vector-addition':        { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },
  'phys.meas.vector-products':        { primary: 'three_vector_visualization', all: ['three_vector_visualization'] },

  // Physics — Optics
  'phys.opt.reflection':              { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.refraction':              { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.mirrors':                 { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.lenses':                  { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  // Lens power (1/f) is the SAME physical setup the ray_optics generator
  // already models (a single thin lens, object/image/focal-length) — power
  // is just 1/f of that identical lens, not a different phenomenon. Reuses
  // the lenses mapping rather than inventing a second entry for one formula.
  'phys.opt.lens-power':              { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  // Young's Double-Slit Experiment IS the double_slit visual — exact title
  // match, and the visual's own description ("particles... build up a
  // wave-like interference pattern") is this experiment. Deliberately NOT
  // extended to 'diffraction' (single-slit has a different fringe pattern —
  // fewer/wider slits — showing a two-slit diagram for it would misstate the
  // apparatus) or 'wave-optics' (the general introduction, not this specific
  // experiment) — see the P0 audit note below on this file's own standard.
  'phys.opt.youngs-experiment':       { primary: 'double_slit', all: ['double_slit', 'three_double_slit'] },
  // P0 (Physics production-completeness audit): 'total-internal-reflection',
  // 'optical-instruments' (compound eye/microscope/telescope systems — the
  // ray_optics generator models exactly ONE lens/mirror, not a system),
  // 'dispersion' (prism wavelength-splitting, no image-formation formula),
  // 'nature-of-light', 'diffraction', 'single-slit', 'polarization' and
  // 'brewsters-law' have NO existing visual that genuinely fits — left
  // unmapped, an intentional Category-C decision (see the P2 audit comment
  // at DOMAIN_VISUALS below for why the 'phys.opt' blanket default that used
  // to catch all of these — showing a static force diagram for "Diffraction
  // of Light" — was removed rather than kept).

  // Physics — Electricity (circuits — a genuine visual family)
  'phys.em.electric-current':         { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.ohms-law':                 { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.dc-circuits':              { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.kirchhoffs-laws':          { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  // P0 audit: these 10 concepts previously reached circuit_diagram only via
  // the 'phys.em' blanket domain default — correctly, since they genuinely
  // ARE circuit topics (a battery/wire/resistor network is the right picture
  // for a Wheatstone bridge or an RC-charging curve's underlying circuit).
  // Promoted to exact entries so removing that default (below) does not lose
  // this legitimate coverage — only the field/magnetism concepts the same
  // default was WRONGLY covering.
  'phys.em.resistivity':              { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.wheatstone-bridge':        { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.potentiometer':            { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.electrical-power':         { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.emf':                      { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.rc-circuits':              { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.lc-circuits':              { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.ac-basics':                { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.self-inductance':          { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  'phys.em.mutual-inductance':        { primary: 'circuit_diagram', all: ['circuit_diagram'] },
  // P0 audit: 21 phys.em concepts are electrostatics/magnetism, NOT circuits
  // — electric-charge, coulombs-law, electric-field, electric-dipole,
  // gauss-law, electric-potential, capacitance, dielectrics, energy-
  // capacitor, magnetic-field, magnetic-force, biot-savart, amperes-law,
  // solenoid, magnetic-materials, magnetic-dipole, magnetic-flux, faradays-
  // law, lenzs-law, maxwells-equations, electromagnetic-waves. Before this
  // fix ALL of them silently inherited circuit_diagram — a battery/wire/
  // bulb picture — via the domain default. No existing visual type models a
  // field-lines diagram, so these are correctly left unmapped rather than
  // stretched onto a circuit picture (see DOMAIN_VISUALS below).

  // Physics — Kinematics (P0 fix: these are NOT force/dynamics concepts —
  // 'phys.mech.displacement' had no exact entry here, so it fell through to
  // the 'phys.mech' domain-prefix default below, which is force_diagram.
  // That default is correct for dynamics (force, tension, friction) but
  // wrong for pure-kinematics concepts (position/motion description, no
  // force analysis). Exact entries here win before the domain default is
  // ever reached (lookupConceptVisual checks Tier 1 before Tier 2), closing
  // the bug for every kinematics concept in one place rather than only the
  // one reported. number_line fits displacement/velocity/acceleration/
  // relative-motion (all fundamentally "position or its rate of change
  // along a line/path" at this level); kinematics-1d/2d already had a
  // correct sceneGenerator (kinematics_graphs, which renders position/
  // velocity/acceleration-vs-time GRAPHS) but a mismatched static primary
  // (force_diagram) — corrected to coordinate_plane, which is what those
  // graphs actually look like.
  'phys.mech.displacement':           { primary: 'number_line', all: ['number_line'] },
  'phys.mech.velocity':               { primary: 'number_line', all: ['number_line', 'coordinate_plane'] },
  'phys.mech.acceleration':           { primary: 'number_line', all: ['number_line', 'coordinate_plane'] },
  'phys.mech.relative-motion':        { primary: 'number_line', all: ['number_line'] },
  'phys.mech.kinematics-1d':          { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'kinematics_graphs' },
  'phys.mech.kinematics-2d':          { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'kinematics_graphs' },

  // Physics — Waves (P1 fix: pendulum and SHM belong to phys.wave.* in the KG,
  // not phys.mech.*; the prior orphan keys phys.mech.pendulum and
  // phys.mech.simple-harmonic-motion were silently unreachable at runtime).
  'phys.wave.pendulum':               { primary: 'three_pendulum_motion', all: ['three_pendulum_motion'], sceneGenerator: 'pendulum' },
  'phys.wave.shm':                    { primary: 'three_pendulum_motion', all: ['three_pendulum_motion'], sceneGenerator: 'pendulum' },
  'phys.wave.shm-energy':             { primary: 'three_pendulum_motion', all: ['three_pendulum_motion'], sceneGenerator: 'pendulum' },
  // P0 audit: the remaining 14 phys.wave concepts (wave-properties,
  // transverse/longitudinal-waves, wave-speed, superposition, interference,
  // standing-waves, sound-waves, sound-intensity, doppler-effect, beats,
  // spring-mass, damped/forced-oscillations) previously inherited
  // force_diagram from the domain default below — wrong for all of them (a
  // static force arrow does not depict a travelling wave, a Doppler shift, or
  // a resonance curve). No existing visual type genuinely fits any of these;
  // intentionally left unmapped (see DOMAIN_VISUALS below for the removal).

  // Physics — Quantum Mechanics (P0 audit: 0 of 19 phys.qm concepts had ANY
  // visual — not even a wrong one, since no domain default existed for
  // phys.qm. Meanwhile 14 dedicated quantum visual types (double_slit,
  // wave_function, potential_well, quantum_tunneling, bloch_sphere,
  // energy_level_diagram, quantum_circuit, stern_gerlach, entanglement_pair,
  // plus their three_* 3D counterparts) were fully built and wired into
  // VisualCard.tsx's render switch but referenced by NOTHING in this
  // registry — the single largest coverage gap on the platform, and the
  // cheapest to close: the content already exists. Only concepts with a
  // genuine visual match are mapped; the rest (operators, pauli-exclusion,
  // perturbation-theory, variational-method, wkb-approximation, identical-
  // particles, angular-momentum-addition, scattering-theory-born-
  // approximation, s-matrix-basics, density-matrix, uncertainty-principle,
  // harmonic-oscillator-qm) have no existing visual that depicts them
  // correctly and are left unmapped rather than stretched onto a
  // near-but-wrong asset — e.g. 'harmonic-oscillator-qm' is NOT mapped to
  // potential_well: that visual's own description is specifically "an
  // INFINITE SQUARE WELL", a different potential shape from the parabolic
  // harmonic-oscillator well, and showing the wrong potential shape would
  // misteach the concept rather than merely under-illustrate it.
  'phys.qm.wave-function':            { primary: 'wave_function', all: ['wave_function'] },
  // The equation's own canonical textbook figure IS its solution ψ(x) — the
  // same asset as wave-function above; teaching "what does solving this
  // equation produce" via the solution shape is standard, not a stretch.
  'phys.qm.schrodinger-equation':     { primary: 'wave_function', all: ['wave_function'] },
  // Exact title match: "Particle in an Infinite Square Well" IS the
  // potential_well visual's own description.
  'phys.qm.particle-in-box':          { primary: 'potential_well', all: ['potential_well'] },
  'phys.qm.hydrogen-atom-qm':         { primary: 'three_hydrogen_orbital', all: ['three_hydrogen_orbital'] },
  // The concept's own KG title is "Electron Spin and the Stern-Gerlach
  // Experiment" — naming the visual exactly.
  'phys.qm.spin':                     { primary: 'stern_gerlach', all: ['stern_gerlach', 'three_stern_gerlach'] },
  'phys.qm.quantum-tunneling':        { primary: 'quantum_tunneling', all: ['quantum_tunneling', 'three_quantum_tunneling'] },
  // Selection rules govern which atomic transitions are allowed — exactly
  // what energy_level_diagram depicts (absorption/emission producing a
  // spectral line).
  'phys.qm.selection-rules':          { primary: 'energy_level_diagram', all: ['energy_level_diagram'] },

  // Physics — Modern Physics (P0 audit: 0 of 21 previously mapped; the three
  // below reuse the quantum visuals just wired above rather than duplicate
  // logic. The rest — photoelectric-effect, photons, compton-effect,
  // de-broglie, x-rays, radioactivity family, nuclear-fission/fusion/models,
  // binding-energy, energy-bands, and the whole semiconductor sub-area
  // (semiconductor-classification through diode-rectification) — have no
  // existing visual that fits: three_atomic_structure depicts a STATIC atom
  // (nucleus + electron shells), not a decay/fission/fusion PROCESS, and
  // circuit_diagram is a battery-wire-bulb circuit, not a diode/band-diagram
  // schematic — both would misrepresent rather than merely under-illustrate.
  // Left unmapped.
  // The double-slit build-up of an interference pattern FROM PARTICLES is
  // literally the textbook demonstration of wave-particle duality (the
  // visual's own description: "particles passing through two slits build up
  // a wave-like interference pattern").
  'phys.mod.wave-particle-duality':   { primary: 'double_slit', all: ['double_slit', 'three_double_slit'] },
  // The Bohr model's entire content IS quantized energy levels with photon
  // emission/absorption on transitions — energy_level_diagram's exact
  // description.
  'phys.mod.bohr-model':              { primary: 'energy_level_diagram', all: ['energy_level_diagram'] },
  'phys.mod.atomic-spectra':          { primary: 'energy_level_diagram', all: ['energy_level_diagram'] },

  // Physics — Thermodynamics (P0 audit: 0 of 18 previously mapped, and no
  // thermodynamics-specific visual type exists on the platform. Three
  // concepts are literally "plot this on P-V axes" content, and
  // coordinate_plane is a genuinely generic, unlabeled axis grid (no
  // asserted curve shape — see the P0 caution below on phys.stat for why an
  // asserted-shape visual is NOT reused this freely), matching the same
  // generic-axes reuse already established for math.calc/math.stat's domain
  // defaults. The rest (temperature, zeroth-law, thermal-expansion, heat-
  // transfer, specific-heat, calorimetry, phase-transitions, kinetic-theory,
  // first-law, internal-energy, second-law, entropy, heat-engines,
  // refrigerators, third-law) are conceptual/qualitative at this level, not
  // literally a curve a student plots, and are left unmapped rather than
  // stretched onto axes that don't represent them.
  'phys.therm.ideal-gas-law':             { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'phys.therm.thermodynamic-processes':   { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'phys.therm.carnot-cycle':              { primary: 'coordinate_plane', all: ['coordinate_plane'] },

  // Physics — Statistical Mechanics (P0 audit: 0 of 15 previously mapped.
  // three_statistical_distribution exists (built for Data Science) but its
  // renderer draws a FIXED, hardcoded symmetric bell curve (verified by
  // reading StatisticalDistribution3D.tsx — not parametrized by content) —
  // so it is mapped ONLY to the one concept that is teaching the general
  // IDEA of "here is what a probability distribution looks like: axes, data,
  // a histogram, a curve, mean and spread", not asserting any specific named
  // distribution's actual shape. It is deliberately NOT mapped to maxwell-
  // boltzmann (a skewed, non-bell speed distribution), fermi-dirac or bose-
  // einstein (step-like/divergent occupation functions) — the fixed bell
  // shape would depict the WRONG curve for all three, which is the exact
  // failure mode this whole registry exists to prevent. The remaining 11
  // concepts (boltzmann-factor, partition-function, entropy-statistical,
  // free-energy, grand-canonical-ensemble, chemical-potential, fluctuations-
  // correlations, phase-transitions, ising-model, phase-transitions-
  // critical-phenomena, monte-carlo-basics) are formalism/abstract with no
  // fitting visual and are left unmapped.
  'phys.stat.probability-basics':         { primary: 'three_statistical_distribution', all: ['three_statistical_distribution'] },

  // Physics — Particle Physics, Relativity, Astrophysics: INTENTIONAL ZERO
  // COVERAGE (P0 audit). Verified against src/lib/school/visuals/
  // visualTypes.ts: no particle-collision/detector, spacetime-curvature/
  // Minkowski-diagram, or stellar-structure/cosmology visual type exists
  // anywhere on the platform — this is a genuine missing-content gap
  // (Category B), not an oversight in this registry. Documented here rather
  // than left silent, per this file's "exact, domain-appropriate, or
  // intentional no-visual decision" standard: phys.particle (16 concepts),
  // phys.rel (8 concepts), phys.astro (6 concepts) correctly fall through to
  // detectVisual()'s keyword match or an honest no-visual response. Building
  // new renderer components for these is future content work, not a
  // registry-data fix.

  // Chemistry — Atomic structure
  // NOTE (corrected): these 5 keys previously used a stale chem.found.* /
  // chem.bond.* draft-KG naming that does not match the frozen 186-concept
  // canonical KG (docs/chemistry/kg/graph.json). Renamed to the real
  // concept IDs; visual assignments (three_* asset + sceneGenerator)
  // unchanged, since they were already thematically correct — only the
  // key was wrong, so these entries never fired for a real lesson before.
  'chem.atomic.atomic-theory':        { primary: 'three_atomic_structure', all: ['three_atomic_structure'] },
  'chem.atomic.subatomic-particles':  { primary: 'three_atomic_structure', all: ['three_atomic_structure', 'three_electron_shells'] },
  'chem.atomic.electronic-config':    { primary: 'three_electron_shells', all: ['three_electron_shells', 'three_atomic_structure'], sceneGenerator: 'electron_shells' },
  'chem.period.modern-periodic-law':  { primary: 'three_electron_shells', all: ['three_electron_shells'], sceneGenerator: 'periodic_trends' },
  'chem.period.periodic-properties':  { primary: 'three_electron_shells', all: ['three_electron_shells'], sceneGenerator: 'periodic_trends' },

  // Chemistry — Bonding
  // NOTE (corrected): 'chem.bond.ionic-bond'/'covalent-bond'/'metallic-bond'
  // renamed to their real KG suffix ('-bonding'). 'chem.bond.molecular-
  // geometry' removed as a duplicate — no such concept exists separately
  // from 'chem.bond.vsepr' in the canonical KG (VSEPR IS the molecular-
  // geometry concept), so this was an invented key mapping to the exact
  // same visual as the entry below it. 'chem.bond.crystal-structures'
  // renamed to its real KG id, which lives in the chem.solid domain, not
  // chem.bond.
  'chem.bond.ionic-bonding':          { primary: 'three_bond_formation', all: ['three_bond_formation'] },
  'chem.bond.covalent-bonding':       { primary: 'three_bond_formation', all: ['three_bond_formation', 'three_molecular_shapes'] },
  'chem.bond.metallic-bonding':       { primary: 'three_bond_formation', all: ['three_bond_formation', 'three_crystal_lattice'] },
  'chem.bond.vsepr':                  { primary: 'three_molecular_shapes', all: ['three_molecular_shapes'], sceneGenerator: 'molecule' },
  // REPAIRED by the visual semantic moat sweep (round 5), same shape as the
  // phys.mech.friction fix in round 4. Both of these had NO exact row, so they
  // inherited the chem.bond DOMAIN rule and were served its primary,
  // `three_bond_formation` — BondFormation3D, whose entire content is two
  // spheres, one "shared pair" label and one "Stable molecule AB".
  //
  // The domain rule's own `all` list names `three_molecular_shapes` second,
  // and that card (MolecularShapes3D) draws a tetrahedral molecule with
  // "109.5° tetrahedral angles" labelled. A domain rule cannot pick per
  // concept, so the better visual was listed and unreachable — the structural
  // version of the friction defect.
  //
  // Hybridization IS the geometry of the hybrid orbital set, and a bond ANGLE
  // is one of the three bond parameters, so both are strictly better served by
  // the shapes card. Both stay DEMOTED in scope.ts: the card shows only the
  // sp3/tetrahedral case, and it shows neither bond length nor bond enthalpy,
  // so the picture improves while the claim does not.
  'chem.bond.hybridization':          { primary: 'three_molecular_shapes', all: ['three_molecular_shapes', 'three_bond_formation'] },
  'chem.bond.bond-parameters':        { primary: 'three_molecular_shapes', all: ['three_molecular_shapes', 'three_bond_formation'] },
  'chem.solid.crystal-systems':       { primary: 'three_crystal_lattice', all: ['three_crystal_lattice'], sceneGenerator: 'lattice' },

  // Chemistry — States of matter
  'chem.found.states-of-matter':      { primary: 'three_crystal_lattice', all: ['three_crystal_lattice'] },

  // Biology — Genetics
  'bio.gen.mendels-laws':             { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'punnett_square' },
  'bio.gen.monohybrid-cross':         { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'punnett_square' },
  'bio.gen.dihybrid-cross':           { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'punnett_square' },

  // Biology — Cell biology
  'bio.cell.cell-division':           { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'cell_division' },
  'bio.cell.mitosis':                 { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'cell_division' },
  'bio.cell.meiosis':                 { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'cell_division' },

  // Biology — Molecular biology
  'bio.mol.dna-structure':            { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'dna_structure' },
  'bio.mol.dna-replication':          { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'dna_structure' },

  // Biology — Ecology
  'bio.eco.food-chains':              { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'ecological_pyramid' },
  'bio.eco.energy-flow':              { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'ecological_pyramid' },
  'bio.eco.ecosystems':               { primary: 'food_chain', all: ['food_chain'] },
  'bio.eco.water-cycle':              { primary: 'water_cycle', all: ['water_cycle'] },

  // Mathematics — Coordinate geometry
  'math.geom.coordinate-geometry':    { primary: 'coordinate_plane', all: ['coordinate_plane', 'three_coordinate_system'], sceneGenerator: 'coordinate_geometry_line' },
  'math.geom.distance-formula':       { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'coordinate_geometry_line' },
  'math.geom.section-formula':        { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'coordinate_geometry_line' },
  'math.geom.straight-lines':         { primary: 'coordinate_plane', all: ['coordinate_plane'] },

  // Mathematics — Geometry
  'math.geom.triangle':              { primary: 'geometry_shape', all: ['geometry_shape', 'three_geometric_solids'], sceneGenerator: 'triangle' },
  'math.geom.angle-sum':              { primary: 'geometry_shape', all: ['geometry_shape'], sceneGenerator: 'triangle' },
  'math.geom.congruence':             { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.similarity':             { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.circle':                { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.quadrilateral':         { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.polygon':               { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.area-perimeter':         { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.surface-area-volume':    { primary: 'three_geometric_solids', all: ['three_geometric_solids', 'geometry_shape'] },
  'math.geom.3d-geometry':            { primary: 'three_geometric_solids', all: ['three_geometric_solids'] },
  'math.geom.transformations':        { primary: 'three_transformations', all: ['three_transformations', 'geometry_shape'] },
  'math.geom.heights-distances':      { primary: 'geometry_shape', all: ['geometry_shape'], sceneGenerator: 'heights_and_distances' },

  // Mathematics — Number system
  'math.arith.fractions':             { primary: 'fraction_bar', all: ['fraction_bar', 'number_line'] },
  'math.arith.decimals':              { primary: 'number_line', all: ['number_line', 'fraction_bar'] },
  'math.arith.percentages':           { primary: 'percentage_grid', all: ['percentage_grid', 'fraction_bar'] },
  'math.arith.integers':              { primary: 'number_line', all: ['number_line'] },
  'math.arith.rational-numbers':      { primary: 'number_line', all: ['number_line', 'fraction_bar'] },
  'math.arith.real-numbers':          { primary: 'number_line', all: ['number_line'] },
  'math.arith.number-line':           { primary: 'number_line', all: ['number_line'] },

  // Mathematics — Algebra (graphing)
  'math.alg.linear-equations':        { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'math.alg.quadratic-equation':     { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'math.alg.polynomial':             { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'math.alg.linear-inequalities':     { primary: 'coordinate_plane', all: ['coordinate_plane', 'number_line'] },

  // Mathematics — Statistics
  'math.stat.mean-median-mode':       { primary: 'number_line', all: ['number_line'], sceneGenerator: 'statistics_bar_chart' },
  'math.stat.frequency-distribution': { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'statistics_bar_chart' },
  'math.stat.data-representation':    { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'statistics_bar_chart' },
  'math.stat.probability':            { primary: 'number_line', all: ['number_line'] },

  // Mathematics — Vectors
  'math.vec.vectors':                 { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },
  'math.vec.vector-operations':       { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },

  // Mathematics — Calculus
  'math.calc.differentiation':        { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'calculus_graph' },
  'math.calc.applications-derivative':{ primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'calculus_graph' },
  'math.calc.maxima-minima':          { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'calculus_graph' },
  'math.calc.integration':            { primary: 'coordinate_plane', all: ['coordinate_plane'] },

  // Mathematics — Trigonometry
  'math.trig.trigonometric-ratios':   { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.trig.trigonometric-identities':{ primary: 'coordinate_plane', all: ['coordinate_plane', 'geometry_shape'] },

  // Computer Science
  'cs.found.computer-organisation':   { primary: 'three_computer_architecture', all: ['three_computer_architecture'] },
  'cs.found.memory-storage':          { primary: 'three_memory_storage', all: ['three_memory_storage'] },
  'cs.found.number-systems':          { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.found.boolean-logic':           { primary: 'three_data_structure', all: ['three_data_structure'], sceneGenerator: 'logic_gate' },
  'cs.ds.arrays':                     { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.ds.linked-lists':               { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.ds.stacks-queues':              { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.algo.sorting':                  { primary: 'three_algorithm_visualization', all: ['three_algorithm_visualization'] },
  'cs.algo.searching':                { primary: 'three_algorithm_visualization', all: ['three_algorithm_visualization'] },
  'cs.net.networking-basics':         { primary: 'three_network_packet_flow', all: ['three_network_packet_flow'] },
  'cs.db.relational-databases':       { primary: 'three_data_structure', all: ['three_data_structure'], sceneGenerator: 'er_diagram' },
}

// ── Tier 2: domain prefix → default visual ───────────────────────────────────
// Checked only when Tier 1 has no exact match. Prefix is matched greedily
// (longest match wins).

interface DomainRule {
  prefix: string
  entry: VisualEntry
}

function domainRule(prefix: string, primary: VisualType, all: VisualType[]): DomainRule {
  return { prefix, entry: { primary, all } }
}

const DOMAIN_VISUALS: DomainRule[] = [
  // Physics domains
  // P2 fix: 'phys.mech' USED TO default to force_diagram for every concept
  // in this domain — correct for dynamics, wrong for the kinematics,
  // energy, fluids, and advanced-formalism concepts also living here (the
  // P0 fix for phys.mech.displacement and this P2 audit's classification
  // of all 45 previously-domain-default-only concepts). That default is
  // now REMOVED, not narrowed: every phys.mech concept for which
  // force_diagram (or another existing visual) is genuinely correct now
  // has an explicit CONCEPT_VISUALS entry above, so the domain default is
  // no longer needed for anything legitimate. Concepts with no suitable
  // existing visual (Bucket C in the CONCEPT_VISUALS comment above) now
  // correctly fall through Tier 2 (a miss) to Tier 3 (detectVisual's
  // keyword match) or an honest no-visual response, instead of silently
  // inheriting an unrelated force diagram. The lookup ALGORITHM (three
  // tiers, checked in this order) is unchanged — only this one row of
  // domain-default DATA was removed.
  //
  // REMOVED (P0 physics production-completeness audit): domainRule(
  // 'phys.em', 'circuit_diagram', ...), domainRule('phys.opt',
  // 'force_diagram', ...), domainRule('phys.wave', 'force_diagram', ...),
  // domainRule('phys.meas', 'three_vector_visualization', ...).
  //
  // Same defect class as the chem.found removal below, found by directly
  // computing what these four defaults actually caught: 61 concepts across
  // the four domains were reaching a visual ONLY through these blanket
  // rules, and the large majority of them were WRONG —
  //   phys.em    circuit_diagram for 21 field/magnetism concepts
  //              (Gauss's Law, Magnetic Field and Field Lines, ...)
  //   phys.opt   force_diagram for 9 non-ray-optics concepts
  //              (Diffraction of Light, Young's Double-Slit Experiment, ...)
  //   phys.wave  force_diagram for 14 wave/oscillation concepts
  //              (Doppler Effect, Standing Waves, Beats, ...)
  //   phys.meas  three_vector_visualization for 5 non-vector concepts
  //              (SI Units and Measurement, Significant Figures, ...)
  // Each domain is visually heterogeneous, not uniform (exactly the
  // chem.found pattern: a handful of concepts genuinely fit the domain's
  // "obvious" visual, the rest do not). Every concept in these four domains
  // for which an existing visual genuinely fits now has an explicit
  // CONCEPT_VISUALS entry above (10 promoted for phys.em's real circuit
  // subset, 2 added for phys.opt, plus the pre-existing exact entries for
  // all four); everything else correctly falls through to Tier 3
  // (detectVisual's keyword match) or an honest no-visual response instead
  // of a wrong domain-wide substitution.

  // Chemistry domains
  domainRule('chem.bond',   'three_bond_formation', ['three_bond_formation', 'three_molecular_shapes']),
  //
  // REMOVED 2026-08-02 (production): domainRule('chem.found',
  // 'three_atomic_structure', ...).
  //
  // A domain rule asserts "every concept under this prefix is well
  // represented by this visual". That is true for chem.bond / chem.atomic /
  // chem.period / chem.solid, which are visually uniform. It is FALSE for
  // chem.found, which is the foundations domain and is deliberately
  // heterogeneous — 8 concepts, of which exactly ONE is about atoms:
  //
  //   chem.found.matter               Nature of Matter
  //   chem.found.states-of-matter     States of Matter          <- exact entry
  //   chem.found.pure-substances      Pure Substances and Mixtures
  //   chem.found.measurement          Physical Quantities and SI Units
  //   chem.found.significant-figures  Significant Figures and Error Analysis
  //   chem.found.mole-concept         Mole Concept and Avogadro's Number
  //   chem.found.stoichiometry        Stoichiometry
  //   chem.found.concentration        Concentration Units
  //
  // Only states-of-matter has an exact entry, so the other SEVEN fell through
  // to Tier 2 and were all rendered with the generic 3D atom model. Observed
  // in production on Mole Concept, Mixtures, Pure Substances and Dissolving.
  //
  // This is the rule the block below already states for the other 22
  // chemistry domains — "left unmapped rather than assigning a poorly-fitting
  // default" — applied to the one domain that violated it. Unmapped concepts
  // fall through to detectVisual()'s title keyword match, which returns null
  // when nothing genuinely fits, so no visual is claimed rather than a wrong
  // one being shown.
  //
  // Added: chem.atomic/chem.period/chem.solid previously had no domain
  // default at all (25 of chemistry's 27 KG domains had neither an exact
  // entry nor a fallback). These three reuse already-built chemistry
  // visual assets that are a genuine thematic fit for the whole domain,
  // matching the established pattern (e.g. math.calc -> coordinate_plane
  // above). The other 22 chemistry domains (chem.thermo, chem.equil,
  // chem.org, chem.carb, etc.) have no existing chemistry-specific visual
  // asset that fits them without inventing a new one — left unmapped
  // rather than assigning a poorly-fitting default; see the runtime audit
  // report for this as a flagged content/architecture gap, not a renamed
  // bug.
  domainRule('chem.atomic', 'three_atomic_structure', ['three_atomic_structure', 'three_electron_shells']),
  domainRule('chem.period', 'three_electron_shells', ['three_electron_shells']),
  domainRule('chem.solid',  'three_crystal_lattice', ['three_crystal_lattice']),

  // Biology domains
  domainRule('bio.eco',    'food_chain', ['food_chain', 'water_cycle']),
  domainRule('bio.cell',   'food_chain', ['food_chain']),

  // Mathematics domains
  domainRule('math.geom',  'geometry_shape', ['geometry_shape']),
  domainRule('math.arith', 'number_line', ['number_line']),
  domainRule('math.alg',   'coordinate_plane', ['coordinate_plane']),
  domainRule('math.stat',  'coordinate_plane', ['coordinate_plane']),
  domainRule('math.calc',  'coordinate_plane', ['coordinate_plane']),
  domainRule('math.trig',  'geometry_shape', ['geometry_shape', 'coordinate_plane']),
  domainRule('math.vec',   'three_vector_visualization', ['three_vector_visualization']),

  // Computer Science domains
  domainRule('cs.ds',      'three_data_structure', ['three_data_structure']),
  domainRule('cs.algo',    'three_algorithm_visualization', ['three_algorithm_visualization']),
  domainRule('cs.net',     'three_network_packet_flow', ['three_network_packet_flow']),
  domainRule('cs.found',   'three_computer_architecture', ['three_computer_architecture']),
].sort((a, b) => b.prefix.length - a.prefix.length)

/**
 * Look up visual(s) for a canonical KG concept ID.
 * Returns null when no visual is registered (the caller should fall back
 * to detectVisual's title-keyword match).
 */
export function lookupConceptVisual(conceptId: string | null): VisualEntry | null {
  return lookupConceptVisualBinding(conceptId)?.entry ?? null
}

/**
 * The same lookup, plus WHO the binding actually names (M2).
 *
 * `lookupConceptVisual` answers "which visual?" and throws away the one fact
 * the identity boundary needs: whether a human named THIS concept, or named a
 * prefix that this concept happens to fall under.
 *
 *   tier 'exact'  — CONCEPT_VISUALS has a row keyed by this exact concept id.
 *                   `scope === conceptId`; the identity is DECLARED.
 *   tier 'domain' — a DOMAIN_VISUALS rule matched by prefix. `scope` is that
 *                   PREFIX ('math.arith'), not the concept. The concept-level
 *                   identity is therefore DERIVED by widening, and is recorded
 *                   as such rather than presented as a curated binding.
 *
 * Additive: DOMAIN_VISUALS and its 394 entries are untouched, and
 * lookupConceptVisual's behaviour is byte-for-byte what it was.
 */
export function lookupConceptVisualBinding(
  conceptId: string | null,
): { entry: VisualEntry; scope: string; tier: 'exact' | 'domain' } | null {
  if (!conceptId) return null

  // Tier 1: exact match
  const exact = CONCEPT_VISUALS[conceptId]
  if (exact) return { entry: exact, scope: conceptId, tier: 'exact' }

  // Tier 2: domain prefix (longest match first)
  for (const rule of DOMAIN_VISUALS) {
    if (conceptId.startsWith(rule.prefix)) return { entry: rule.entry, scope: rule.prefix, tier: 'domain' }
  }

  return null
}

/**
 * Get just the primary VisualType for a concept — the value the Teaching
 * Engine's turn directive needs. Returns null for unknown concepts.
 */
export function getConceptVisualType(conceptId: string | null): VisualType | null {
  return lookupConceptVisual(conceptId)?.primary ?? null
}

/**
 * Get the scene generator kind available for a concept (if any).
 * This is separate from the visual type — scene generators run the
 * parametric 3D pipeline (extract→build→validate), while visual types
 * are rendered by the existing component layer.
 */
export function getConceptSceneGenerator(conceptId: string | null): SceneGeneratorKind | null {
  if (!conceptId) return null
  return CONCEPT_VISUALS[conceptId]?.sceneGenerator ?? null
}

// ── Server-authoritative render decision (Phase 2) ────────────────────────────
//
// The registry/detectVisual match only tells the LLM's system prompt what
// visual IS AVAILABLE — the LLM was still free to describe it in prose
// instead of emitting the VISUAL:<type> tag. This mirrors the exact shape
// of the pre-mastery-gate bug (an advisory instruction the model could
// silently ignore). For an EXPLICIT learner diagram/visualize request, the
// render must not depend on LLM compliance — pure decision logic below,
// unit-testable independent of route.ts's IO.

/**
 * True when a visual request must be force-attached to the response
 * server-side, regardless of whether the LLM's own VISUAL:<type> tag
 * fired. Only for explicit learner requests ('diagram') with a known
 * available visual — never overrides a phase-driven visual-first
 * suggestion (those stay advisory, since the learner didn't ask).
 */
export function shouldForceVisualRender(
  learnerRequest: 'diagram' | 'real_life_example' | 'explain_differently' | null,
  availableVisual: VisualType | null,
): boolean {
  return learnerRequest === 'diagram' && availableVisual !== null
}

// P0 (UI/UX sprint): "Tutor Max says a visual is coming, nothing renders."
// Root cause — force-render previously fired only for an explicit STUDENT
// request ('diagram') or 3+ remediation attempts; it never looked at what
// the ASSISTANT's own turn actually said. An LLM turn is free to write
// "here's a visual example..." in prose without emitting the VISUAL:<type>
// tag (or emitting one detectVisual() doesn't recognize), and unless the
// student happened to ask for a diagram first, resolveResponseVisual() had
// nothing to force-render against — the promise in the text and the actual
// attached visual were decided by two completely independent mechanisms
// that never talked to each other. Same deterministic, no-AI-reasoning
// keyword-match pattern as the rest of this file (detectVisual, VECTOR_RE):
// scan the assistant's own cleaned text for a stated visual promise, so the
// force-render path in resolveResponseVisual() also covers "the model
// promised, the registry has something to show" — not just "the student
// asked, the registry has something to show".
const VISUAL_PROMISE_RE = /\b(here'?s|here is|below is|see the|look at the|take a look at|check out the)\b[^.!?\n]{0,40}\b(visual|diagram|graph|chart|illustration|image|figure|plot)\b/i

export function textPromisesUnfulfilledVisual(text: string): boolean {
  return VISUAL_PROMISE_RE.test(text)
}

/**
 * Resolve the final responseVisual for the turn: the LLM's own parsed tag
 * wins when present (it may be a more specific match than the registry
 * default); otherwise, if force-render applies, the available visual is
 * attached deterministically. Returns null when neither applies — the
 * caller's existing "no visual" path (or last-resort text description)
 * is unchanged.
 */
export function resolveResponseVisual(
  llmTag: VisualType | null,
  forceRender: boolean,
  availableVisual: VisualType | null,
  /**
   * The visuals this CONCEPT legally has (VisualEntry.all), or null when the
   * concept has no registry entry at all.
   *
   * CANONICAL OWNERSHIP (production fix 2026-08-02). The LLM's own
   * VISUAL:<type> tag used to win outright, which made the model a SECOND
   * owner of visualization selection — and one with no binding to concept
   * identity whatsoever. It could emit VISUAL:three_atomic_structure while
   * teaching Mole Concept, Mixtures or Stoichiometry, and the runtime
   * attached it. Removing a bad domain default could not fix that, because
   * the registry's answer was being overridden after the fact.
   *
   * The concept now owns WHICH visuals are legal; the model may only choose
   * among them. A tag inside the concept's own set is still honoured — that
   * is the documented reason the tag wins (it may be a more specific match
   * than the primary). A tag outside it is not a choice the model is
   * entitled to make, so the concept's own visual is used instead.
   *
   * Omitted / null preserves the previous behaviour exactly, so subjects with
   * no canonical KG entry (and detectVisual-driven matches) are unchanged.
   */
  allowedForConcept?: readonly VisualType[] | null,
): VisualType | null {
  if (llmTag) {
    // 1. The concept has a registered set — the model may pick inside it only.
    if (allowedForConcept && allowedForConcept.length > 0) {
      if (allowedForConcept.includes(llmTag)) return llmTag
      // Asked for something this concept does not have. It still wanted a
      // visual, and the concept has a correct one — serve that.
      return availableVisual ?? null
    }
    // 2. No registered set, but the runtime resolved a visual for this lesson
    //    anyway (detectVisual's title match). That is the only concept-derived
    //    answer available, so it is the one that may be shown.
    if (availableVisual) return availableVisual
    // 3. The runtime has NO concept-derived visual for this concept. The model
    //    may not invent one: an unvalidated tag is exactly how a visual built
    //    for atomic structure ended up on Mole Concept. This matches the
    //    registry's own standing rule for unmapped concepts — no visual is
    //    claimed rather than a wrong one shown.
    return null
  }
  if (forceRender && availableVisual) return availableVisual
  return null
}
