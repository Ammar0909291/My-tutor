/**
 * Ecological (energy) pyramid scene generator (23rd parametric generator),
 * closing the "Ecology (energy pyramid, nutrient cycles)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Builds a trophic-level energy pyramid
 * from a list of trophic-level labels and the producer-level energy input,
 * deriving every level's available energy by formula (the 10% law — only
 * ~10% of energy transfers to the next trophic level, never invented). Same
 * architecture as the other generators: extractEcologicalPyramidParams (LLM,
 * isolated) → validateEcologicalPyramidParams (pure) →
 * buildEcologicalPyramidScene (pure, deterministic pyramid) →
 * checkEcologicalPyramidConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface EcologicalPyramidParams {
  /** Ordered trophic levels, producer first, e.g. ["Producers", "Herbivores", "Carnivores"]. 2-5 levels. */
  trophicLevels: string[]
  /** Energy available at the producer (first) level, in kcal/m²/year (or any consistent unit). Must be a positive finite number. */
  baseEnergy: number
}

export function validateEcologicalPyramidParams(raw: unknown): EcologicalPyramidParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (!Array.isArray(o.trophicLevels)) return null
  const trophicLevels = o.trophicLevels.map((l) => String(l).trim()).filter((l) => l.length > 0)
  if (trophicLevels.length < 2 || trophicLevels.length > 5) return null

  const baseEnergy = strictNumber(o.baseEnergy)
  if (!Number.isFinite(baseEnergy) || baseEnergy <= 0) return null

  return { trophicLevels, baseEnergy }
}

// ── Deterministic ecology (the 10% law; never LLM-generated) ─────────────────

const TRANSFER_EFFICIENCY = 0.1

/** Energy available at each trophic level: level i = baseEnergy * 0.1^i. */
function computeLevelEnergies(p: EcologicalPyramidParams): number[] {
  return p.trophicLevels.map((_, i) => round(p.baseEnergy * TRANSFER_EFFICIENCY ** i, 4))
}

const LEVEL_HEIGHT = 4
const BASE_WIDTH = 16

/** Build a per-level-step ecological-pyramid SceneSpec: each trophic level's bar, then the 10% law summary. */
export function buildEcologicalPyramidScene(params: EcologicalPyramidParams): SceneSpec {
  const energies = computeLevelEnergies(params)
  const n = params.trophicLevels.length
  const colors = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#a855f7']

  const steps = params.trophicLevels.map((label, i) => {
    // Each level narrower than the one below it — a stacked pyramid, producer at the bottom.
    const width = round(BASE_WIDTH * (1 - i / n))
    const y = round(i * LEVEL_HEIGHT)
    const bar: SceneObject = {
      type: 'bar',
      id: `level-${i}`,
      position: [0, y, 0],
      text: `${label}: ${energies[i]}`,
      color: colors[i % colors.length],
      size: width,
    }
    const narration =
      i === 0
        ? `At the base, ${label} capture ${energies[i]} units of energy from the sun.`
        : `Only ${TRANSFER_EFFICIENCY * 100}% of the energy from the level below transfers up, so ${label} have ${energies[i]} units available.`
    return { narration, objects: [bar] }
  })

  steps.push({
    narration: `This is the 10% law: at every step up the pyramid, about 90% of energy is lost as heat, so each trophic level has roughly one-tenth the energy of the level below it.`,
    objects: [
      { type: 'label', id: 'law-summary', position: [0, round(n * LEVEL_HEIGHT), 0], text: '10% Law', color: '#ef4444' },
    ],
  })

  return {
    id: `ecological-pyramid-${params.trophicLevels.join('-')}`,
    title: `Ecological Pyramid: ${params.trophicLevels.join(' → ')}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how available energy decreases by roughly 90% at each successive trophic level (the 10% law).',
    cameraDistance: BASE_WIDTH * 3,
    ariaLabel: `An ecological energy pyramid with ${n} trophic levels: ${params.trophicLevels.join(', ')}, each holding about one-tenth the energy of the level below.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkEcologicalPyramidConsistency(spec: SceneSpec, params: EcologicalPyramidParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const energies = computeLevelEnergies(params)

  params.trophicLevels.forEach((label, i) => {
    const bar = objs.find((o) => o.id === `level-${i}`)
    if (!bar) {
      errors.push(`missing level-${i}`)
      return
    }
    const expectedText = `${label}: ${energies[i]}`
    if (bar.text !== expectedText) {
      errors.push(`level-${i} text "${bar.text}" does not match re-derived "${expectedText}"`)
    }
  })

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the trophic-level energy pyramid being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isEcologicalPyramid": true|false, "trophicLevels": [<2 to 5 strings, producer level first>], "baseEnergy": <positive number>}
- isEcologicalPyramid is false if the text is not about an energy pyramid / trophic levels / food chain energy flow.
- trophicLevels must be ordered starting from the producer level (e.g. ["Producers","Herbivores","Carnivores"]).
- baseEnergy is the energy value stated for the producer (first) level; use the number actually stated in the text, do not invent one.`
}

/**
 * Extract validated ecological-pyramid parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractEcologicalPyramidParams(text: string): Promise<EcologicalPyramidParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isEcologicalPyramid !== true) return null
  return validateEcologicalPyramidParams(raw)
}
