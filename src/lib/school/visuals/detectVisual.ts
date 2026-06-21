/**
 * Visual detection for Sprint BW.
 * Deterministic keyword match — no AI, no network call.
 * Returns the most relevant VisualType for a given topic context, or null.
 */

import type { VisualType } from './visualTypes'
import { VISUAL_SUBJECTS } from './visualTypes'

interface DetectVisualOptions {
  subjectSlug: string
  chapterTitle: string
  /** Optional: current lesson/node title for finer matching */
  lessonTitle?: string
}

type MatchRule = { keywords: string[]; visual: VisualType }

// Math rules — ordered by specificity (more specific first)
const MATH_RULES: MatchRule[] = [
  { keywords: ['fraction', 'fractions', 'numerator', 'denominator', 'rational number', 'part of a whole'], visual: 'fraction_bar' },
  { keywords: ['percent', 'percentage', 'per cent', 'profit and loss', 'discount', 'interest'], visual: 'percentage_grid' },
  { keywords: ['coordinate', 'cartesian', 'x-axis', 'y-axis', 'plot', 'graph', 'linear equation', 'straight line', 'slope', 'straight lines'], visual: 'coordinate_plane' },
  { keywords: ['number line', 'integers', 'negative number', 'rational number on number line', 'real number'], visual: 'number_line' },
  { keywords: ['triangle', 'quadrilateral', 'circle', 'polygon', 'angle', 'geometry', 'shape', 'area', 'perimeter', 'symmetry', 'congruence', 'similarity'], visual: 'geometry_shape' },
]

// Science rules
const SCIENCE_RULES: MatchRule[] = [
  { keywords: ['food chain', 'food web', 'producer', 'consumer', 'decomposer', 'ecosystem', 'trophic level', 'energy flow', 'herbivore', 'carnivore'], visual: 'food_chain' },
  { keywords: ['water cycle', 'evaporation', 'condensation', 'precipitation', 'transpiration', 'hydrological cycle', 'water vapor'], visual: 'water_cycle' },
  { keywords: ['solar system', 'planet', 'orbit', 'sun', 'earth moon', 'celestial', 'revolution', 'rotation of earth'], visual: 'solar_system' },
  { keywords: ['force', 'motion', 'newton', 'friction', 'acceleration', 'velocity', 'speed', 'displacement', 'laws of motion', 'momentum'], visual: 'force_diagram' },
  { keywords: ['electric circuit', 'circuit', 'current electricity', 'resistance', 'ohm', 'voltage', 'battery', 'bulb', 'conductor', 'series', 'parallel'], visual: 'circuit_diagram' },
]

// Quantum Physics rules (Visual Expansion Sprint) — ordered most-specific first.
const QUANTUM_RULES: MatchRule[] = [
  { keywords: ['double slit', 'double-slit', 'two slit', 'interference pattern', 'which-path', 'which path'], visual: 'double_slit' },
  { keywords: ['bloch sphere', 'qubit', 'single-qubit', 'superposition state', 'quantum gate', 'quantum computing', 'quantum computer'], visual: 'bloch_sphere' },
  { keywords: ['tunnel', 'tunneling', 'tunnelling', 'barrier penetration', 'potential barrier', 'transmission probability'], visual: 'quantum_tunneling' },
  { keywords: ['square well', 'potential well', 'infinite well', 'energy level', 'energy levels', 'quantized energy', 'stationary state', 'bound state'], visual: 'potential_well' },
  { keywords: ['wavefunction', 'wave function', 'born rule', 'probability density', 'probability amplitude', 'psi', '|ψ|', 'schrödinger', 'schrodinger'], visual: 'wave_function' },
]

function matchRules(text: string, rules: MatchRule[]): VisualType | null {
  const lower = text.toLowerCase()
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) return rule.visual
  }
  return null
}

/**
 * Determine which visual (if any) best supports the current chapter/lesson context.
 * Returns null when no visual would meaningfully help.
 */
export function detectVisual(opts: DetectVisualOptions): VisualType | null {
  if (!VISUAL_SUBJECTS.has(opts.subjectSlug)) return null

  const combined = [opts.chapterTitle, opts.lessonTitle ?? ''].join(' ')

  // Mathematics
  if (opts.subjectSlug === 'mathematics') {
    return matchRules(combined, MATH_RULES)
  }

  // Science (physics, chemistry, biology — all under 'science' slug)
  if (opts.subjectSlug === 'science') {
    return matchRules(combined, SCIENCE_RULES)
  }

  // Quantum Physics (Subject Library) — Phase 1 quantum visual set
  if (opts.subjectSlug === 'quantum_physics') {
    return matchRules(combined, QUANTUM_RULES)
  }

  return null
}

/**
 * Parse a VISUAL:<type> tag from tutor response text.
 * Returns { visual, cleanText } — visual is null if no tag found.
 */
export function parseVisualTag(text: string): { visual: VisualType | null; cleanText: string } {
  const match = text.match(/\bVISUAL:\s*(\w+)\b/i)
  if (!match) return { visual: null, cleanText: text }
  const candidate = match[1].toLowerCase() as VisualType
  const VALID: Set<string> = new Set([
    'number_line', 'fraction_bar', 'percentage_grid', 'coordinate_plane',
    'geometry_shape', 'food_chain', 'water_cycle', 'solar_system',
    'force_diagram', 'circuit_diagram',
  ])
  const visual = VALID.has(candidate) ? candidate as VisualType : null
  const cleanText = text.replace(/\bVISUAL:\s*\w+\b\n?/i, '').trim()
  return { visual, cleanText }
}

/** System prompt block added to school-mode tutor context */
export function buildVisualsSystemBlock(availableVisual: VisualType | null): string {
  if (!availableVisual) return ''
  const all = [
    'number_line', 'fraction_bar', 'percentage_grid', 'coordinate_plane',
    'geometry_shape', 'food_chain', 'water_cycle', 'solar_system',
    'force_diagram', 'circuit_diagram',
  ]
  return `\n\nVISUAL LEARNING AID: A visual diagram is available for this topic. When your response contains an explanation where a diagram would genuinely help the student visualise the concept (e.g. showing a number line when explaining integers, a fraction bar when explaining fractions, a circuit when explaining electricity), add the following tag on its own line at the END of your response:
VISUAL: ${availableVisual}
Available types: ${all.join(', ')}
Rules:
- Add at most ONE VISUAL tag per response.
- Only add it when the explanation DIRECTLY benefits from the visual — not for every response.
- Never mention "the diagram" in your explanation text — the student sees it automatically.
- Do not add VISUAL if your response is a question, correction, or short reply.`
}
