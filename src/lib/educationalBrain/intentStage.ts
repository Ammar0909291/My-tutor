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
// Maps keyword patterns to EbConcept ids seeded by seed-eb-physics.mjs.
// Only fires for physics sessions (subjectSlug === 'physics').

const PHYSICS_CONCEPT_MAP: { pattern: RegExp; conceptId: string }[] = [
  { pattern: /\b(kinematics|displacement|velocity|acceleration|motion)\b/i, conceptId: 'physics.kinematics.kinematics_intro' },
  { pattern: /\b(projectile|trajectory|range|launch angle)\b/i, conceptId: 'physics.kinematics.projectile_motion' },
  { pattern: /\b(newton'?s (first|second|third)|force|inertia|f\s*=\s*ma)\b/i, conceptId: 'physics.dynamics.newtons_laws' },
  { pattern: /\b(friction|coefficient of friction|static friction|kinetic friction)\b/i, conceptId: 'physics.dynamics.friction' },
  { pattern: /\b(momentum|impulse|collision|conservation of momentum)\b/i, conceptId: 'physics.dynamics.momentum' },
  { pattern: /\b(energy|kinetic energy|potential energy|work done|power|joule)\b/i, conceptId: 'physics.energy.work_energy' },
  { pattern: /\b(gravitation|gravity|gravitational|satellite|orbit|kepler)\b/i, conceptId: 'physics.gravitation.gravitation' },
  { pattern: /\b(pressure|buoyancy|archimedes|pascal|fluid|upthrust)\b/i, conceptId: 'physics.fluids.pressure_buoyancy' },
  { pattern: /\b(oscillation|simple harmonic|pendulum|spring|frequency|period|amplitude)\b/i, conceptId: 'physics.waves.oscillations' },
  { pattern: /\b(wave|wavelength|refraction|reflection|interference|diffraction|sound)\b/i, conceptId: 'physics.waves.wave_properties' },
  { pattern: /\b(electric(ity|al)?|voltage|current|resistance|ohm|circuit|capacitor)\b/i, conceptId: 'physics.electricity.circuits' },
  { pattern: /\b(magnetic|electromagnet|faraday|induction|flux|motor|generator)\b/i, conceptId: 'physics.electricity.magnetism' },
  { pattern: /\b(heat|temperature|thermodynamics|specific heat|conduction|convection|radiation|entropy)\b/i, conceptId: 'physics.thermodynamics.heat_transfer' },
  { pattern: /\b(optics|lens|mirror|focal|image|reflection|refraction|snell|light ray)\b/i, conceptId: 'physics.optics.geometric_optics' },
  { pattern: /\b(atom|nucleus|proton|neutron|electron|radioactiv|decay|half.?life|nuclear)\b/i, conceptId: 'physics.modern.atomic_nuclear' },
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
