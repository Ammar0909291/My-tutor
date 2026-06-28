/**
 * Stage 1 — Intent.
 * Deterministic regex classification. NO LLM call.
 * Physics-scoped concept surface detection.
 */
import type { TurnContext, QuestionShape, StudentEmotion, IntentClassification } from './types'

// ── Question-shape classifiers ────────────────────────────────────────────────

const DEFINITIONAL_RE = /\b(what is|what are|define|definition of|meaning of|explain what)\b/i
const PROCEDURAL_RE = /\b(how (do|does|can|to)|what (are the )?steps|calculate|solve|find the|derive|prove|show that)\b/i
const WHY_RE = /\b(why|because|reason|cause|explain why|what causes?|how come)\b/i
const META_RE = /\b(i (don'?t|cant|can'?t) understand|confused|help|stuck|lost|not getting|don'?t get it)\b/i

function classifyShape(text: string): QuestionShape {
  if (META_RE.test(text)) return 'meta'
  if (WHY_RE.test(text)) return 'why'
  if (PROCEDURAL_RE.test(text)) return 'procedural'
  if (DEFINITIONAL_RE.test(text)) return 'definitional'
  return 'off_topic'
}

// ── Emotion classifiers ───────────────────────────────────────────────────────

const FRUSTRATED_RE = /\b(frustrated|annoyed|hate this|so hard|don'?t understand|makes no sense|stupid|confusing|lost)\b/i
const CONFIDENT_RE = /\b(easy|got it|understand|makes sense|clear|simple|i see|of course|obviously)\b/i
const CONFUSED_RE = /\b(confused|confusing|unclear|what does that mean|not sure|huh\?|don'?t follow)\b/i
const ENGAGED_RE = /\b(interesting|tell me more|what if|what about|how about|curious|wonder|fascinating)\b/i

function classifyEmotion(text: string): StudentEmotion {
  if (FRUSTRATED_RE.test(text)) return 'frustrated'
  if (CONFUSED_RE.test(text)) return 'confused'
  if (CONFIDENT_RE.test(text)) return 'confident'
  if (ENGAGED_RE.test(text)) return 'engaged'
  return null
}

// ── Physics concept surface detector ─────────────────────────────────────────
// Maps keyword patterns to EbConcept.id values seeded by seed-eb-physics.mjs.
// IDs MUST match the actual seeded IDs from physicsKnowledgeGraph.ts exactly;
// a mismatch causes retrievalStage to return null conceptContext.

const PHYSICS_CONCEPT_MAP: { pattern: RegExp; conceptId: string }[] = [
  // physics.kinematics_1d — 1D motion, equations of motion
  { pattern: /\b(kinematics|displacement|velocity|acceleration|speed)\b|v\s*=\s*u\s*\+\s*at|s\s*=\s*ut|equations?\s+of\s+motion|free\s+fall/i, conceptId: 'physics.kinematics_1d' },
  // physics.kinematics_2d — vectors, projectile, circular motion
  { pattern: /\b(projectile|trajectory|launch angle|scalar|vector|parallelogram law|circular motion|centripetal)\b/i, conceptId: 'physics.kinematics_2d' },
  // physics.laws_of_motion — Newton's laws, friction, impulse, momentum
  { pattern: /\b(newton'?s (first|second|third) law|inertia|f\s*=\s*ma|friction|normal force|free body|impulse|momentum|banking)\b/i, conceptId: 'physics.laws_of_motion' },
  // physics.work_energy — work, energy, collisions
  { pattern: /\b(work done|kinetic energy|potential energy|conservation of energy|power|collision|elastic collision|inelastic|coefficient of restitution)\b/i, conceptId: 'physics.work_energy' },
  // physics.rotation — torque, angular momentum, moment of inertia
  { pattern: /\b(torque|rotational|angular momentum|moment of inertia|angular velocity|rigid body|rolling|centre of mass)\b/i, conceptId: 'physics.rotation' },
  // physics.gravitation
  { pattern: /\b(gravitation|gravity|gravitational (field|potential|force)|satellite|orbit|kepler|escape velocity|geostationary)\b/i, conceptId: 'physics.gravitation' },
  // physics.elasticity — stress, strain, elastic moduli
  { pattern: /\b(stress|strain|elastic moduli?|young'?s modulus|bulk modulus|shear|hooke'?s law)\b/i, conceptId: 'physics.elasticity' },
  // physics.fluids — pressure, buoyancy, Bernoulli
  { pattern: /\b(pressure|buoyancy|archimedes|pascal'?s law|fluid|upthrust|bernoulli|viscosity|surface tension|capillary)\b/i, conceptId: 'physics.fluids' },
  // physics.thermal — heat, temperature, calorimetry
  { pattern: /\b(specific heat|calorimetry|latent heat|thermal expansion|heat (transfer|conduction|convection)|newton'?s law of cooling|blackbody)\b/i, conceptId: 'physics.thermal' },
  // physics.thermodynamics — laws of thermodynamics, entropy, Carnot
  { pattern: /\b(thermodynamics|zeroth law|first law|second law|internal energy|carnot|entropy|heat engine|refrigerator)\b/i, conceptId: 'physics.thermodynamics' },
  // physics.kinetic_theory — ideal gas, kinetic theory, RMS speed
  { pattern: /\b(kinetic theory|ideal gas|rms speed|mean free path|equipartition|degrees of freedom|boltzmann)\b/i, conceptId: 'physics.kinetic_theory' },
  // physics.oscillations — SHM, pendulum, spring
  { pattern: /\b(oscillation|simple harmonic|pendulum|spring.mass|shm|resonance|damped|forced oscillation|amplitude|time period)\b/i, conceptId: 'physics.oscillations' },
  // physics.waves — wave motion, sound, Doppler
  { pattern: /\b(wave|wavelength|frequency|interference|diffraction|sound|doppler|standing wave|beats|superposition)\b/i, conceptId: 'physics.waves' },
  // physics.ray_optics — mirrors, lenses, prism
  { pattern: /\b(ray optics|mirror|lens|focal|prism|snell'?s law|total internal reflection|refraction|magnification|telescope|microscope)\b/i, conceptId: 'physics.ray_optics' },
  // physics.wave_optics — Young's DSE, polarisation
  { pattern: /\b(wave optics|young'?s (double slit|experiment)|huygens|polarisation|polarization|brewster|malus|coherence)\b/i, conceptId: 'physics.wave_optics' },
  // physics.electrostatics — Coulomb, electric field, Gauss
  { pattern: /\b(electrostatics?|coulomb'?s law|electric (field|charge|dipole|flux)|gauss'?s law|charged (sphere|plate))\b/i, conceptId: 'physics.electrostatics' },
  // physics.electric_potential — potential, capacitance, capacitor
  { pattern: /\b(electric potential|capacitor|capacitance|equipotential|dielectric|van de graaff)\b/i, conceptId: 'physics.electric_potential' },
  // physics.current_electricity — Ohm's law, Kirchhoff, circuits
  { pattern: /\b(current|voltage|resistance|ohm'?s law|resistivity|kirchhoff|wheatstone|potentiometer|emf|circuit)\b/i, conceptId: 'physics.current_electricity' },
  // physics.magnetism_matter — bar magnet, earth's magnetism
  { pattern: /\b(bar magnet|earth'?s magnetic|magnetic (field lines|properties|moment)|dia(magnetic)?|para(magnetic)?|ferro(magnetic)?|hysteresis|curie)\b/i, conceptId: 'physics.magnetism_matter' },
  // physics.magnetic_effects — Lorentz, Biot-Savart, solenoid
  { pattern: /\b(lorentz force|biot.savart|ampere'?s law|solenoid|toroid|cyclotron|galvanometer|moving charge|magnetic force)\b/i, conceptId: 'physics.magnetic_effects' },
  // physics.electromagnetic_induction — Faraday, Lenz, inductance
  { pattern: /\b(faraday'?s law|lenz'?s law|electromagnetic induction|motional emf|eddy current|self induction|mutual induction|transformer|inductor)\b/i, conceptId: 'physics.electromagnetic_induction' },
  // physics.ac_circuits — AC, LCR, impedance, resonance
  { pattern: /\b(alternating current|ac circuit|lcr|impedance|phasor|rms|peak value|resonance frequency|power factor|lc oscillation)\b/i, conceptId: 'physics.ac_circuits' },
  // physics.electromagnetic_waves — EM spectrum, Maxwell
  { pattern: /\b(electromagnetic wave|em (wave|spectrum)|maxwell|displacement current|radio wave|microwave|infrared|ultraviolet|x.?ray|gamma)\b/i, conceptId: 'physics.electromagnetic_waves' },
  // physics.dual_nature — photoelectric effect, de Broglie
  { pattern: /\b(photoelectric|work function|photon|de broglie|wave.particle duality|davisson|uncertainty principle)\b/i, conceptId: 'physics.dual_nature' },
  // physics.atoms — Bohr model, hydrogen spectrum
  { pattern: /\b(bohr'?s model|hydrogen spectrum|spectral series|energy level|rutherford|atomic spectra)\b/i, conceptId: 'physics.atoms' },
  // physics.nuclei — radioactivity, fission, fusion
  { pattern: /\b(nucleus|nuclei|proton|neutron|radioactiv|alpha|beta|gamma (decay|ray)|half.?life|nuclear (fission|fusion|reactor)|binding energy|mass defect)\b/i, conceptId: 'physics.nuclei' },
  // physics.semiconductors — diode, transistor, logic gates
  { pattern: /\b(semiconductor|p.?n junction|diode|transistor|bjt|zener|rectifier|logic gate|and gate|or gate|not gate|nand|integrated circuit)\b/i, conceptId: 'physics.semiconductors' },
  // physics.communication — modulation, satellite communication
  { pattern: /\b(communication system|modulation|am |fm |bandwidth|transmitter|receiver|optical fibre|satellite communication)\b/i, conceptId: 'physics.communication' },
  // physics.units_measurement — SI units, dimensional analysis
  { pattern: /\b(si unit|dimension(al)? (analysis|formula)|significant figures?|least count|percentage error|physical quantity|measurement)\b/i, conceptId: 'physics.units_measurement' },
]

function surfaceConcepts(text: string, subjectSlug: string | null): string[] {
  if (subjectSlug !== 'physics') return []
  const matched = new Set<string>()
  for (const { pattern, conceptId } of PHYSICS_CONCEPT_MAP) {
    if (pattern.test(text)) matched.add(conceptId)
  }
  return [...matched]
}

// ── Stage runner ──────────────────────────────────────────────────────────────

export function intentStage(ctx: TurnContext): TurnContext {
  if (ctx.shortCircuit) return ctx
  const start = Date.now()

  const intent: IntentClassification = {
    questionShape: classifyShape(ctx.userMessage),
    topicSurfaces: surfaceConcepts(ctx.userMessage, ctx.subjectSlug),
    studentEmotion: classifyEmotion(ctx.userMessage),
  }

  return {
    ...ctx,
    intent,
    spans: [...ctx.spans, { stage: 'intent', startedAt: start, durationMs: Date.now() - start }],
  }
}
