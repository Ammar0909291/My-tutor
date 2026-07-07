/**
 * Demographic (population) pyramid scene generator (17th parametric
 * generator), closing the "Population/demographic pyramids" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Lays out age bands as horizontal
 * bars stacked bottom (youngest) to top (oldest), male population extending
 * left of the central axis and female population extending right — the
 * standard population-pyramid layout used in Geography "Population"
 * chapters. Same architecture as the other generators: extractPyramidParams
 * (LLM, isolated) → validatePyramidParams (pure) → buildDemographicPyramidScene
 * (pure, deterministic bar layout) → checkPyramidConsistency (pure,
 * independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface AgeBand {
  /** Age-range label, e.g. "0-14", "65+". */
  label: string
  /** Male share of population for this band (%), 0-100. */
  malePct: number
  /** Female share of population for this band (%), 0-100. */
  femalePct: number
}

export interface PyramidParams {
  regionName: string
  /** Ordered youngest-first (bottom of the pyramid) to oldest-last (top). */
  bands: AgeBand[]
}

const MAX_NAME_LEN = 100
const MIN_BANDS = 2
const MAX_BANDS = 8
const PCT_BOUND = 100

function isValidBand(raw: unknown): raw is AgeBand {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  if (typeof o.label !== 'string' || !o.label.trim() || o.label.length > MAX_NAME_LEN) return false
  const malePct = strictNumber(o.malePct)
  const femalePct = strictNumber(o.femalePct)
  if (!Number.isFinite(malePct) || malePct < 0 || malePct > PCT_BOUND) return false
  if (!Number.isFinite(femalePct) || femalePct < 0 || femalePct > PCT_BOUND) return false
  return true
}

export function validatePyramidParams(raw: unknown): PyramidParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (typeof o.regionName !== 'string' || !o.regionName.trim() || o.regionName.length > MAX_NAME_LEN) return null
  if (!Array.isArray(o.bands) || o.bands.length < MIN_BANDS || o.bands.length > MAX_BANDS) return null
  if (!o.bands.every(isValidBand)) return null

  const bands = (o.bands as AgeBand[]).map((b) => ({
    label: b.label.trim(),
    malePct: strictNumber((b as unknown as Record<string, unknown>).malePct),
    femalePct: strictNumber((b as unknown as Record<string, unknown>).femalePct),
  }))

  return { regionName: o.regionName.trim(), bands }
}

// ── Deterministic bar layout (pure leaf functions; never LLM-generated) ──────

const BAND_HEIGHT = 3
const VISUAL_MAX = 14

function maxPct(bands: AgeBand[]): number {
  return Math.max(...bands.flatMap((b) => [b.malePct, b.femalePct]), 1e-9)
}

interface BandBars {
  label: string
  y: number
  maleBar: { from: Vec3; to: Vec3 }
  femaleBar: { from: Vec3; to: Vec3 }
}

function layoutBands(p: PyramidParams): { bars: BandBars[]; scale: number } {
  const scale = VISUAL_MAX / maxPct(p.bands)
  const bars: BandBars[] = p.bands.map((b, i) => {
    const y = round(i * BAND_HEIGHT)
    return {
      label: b.label,
      y,
      maleBar: { from: [0, y, 0], to: [round(-b.malePct * scale), y, 0] },
      femaleBar: { from: [0, y, 0], to: [round(b.femalePct * scale), y, 0] },
    }
  })
  return { bars, scale }
}

/** Build a 2-step demographic-pyramid SceneSpec: male bars, then female bars. */
export function buildDemographicPyramidScene(params: PyramidParams): SceneSpec {
  const { bars } = layoutBands(params)

  const maleObjects: SceneObject[] = bars.flatMap((b, i) => [
    { type: 'bond', id: `male-${i}`, from: b.maleBar.from, to: b.maleBar.to, color: '#3b82f6' } as SceneObject,
    { type: 'label', id: `label-${i}`, position: [0, b.y, 0], text: b.label, color: '#475569' } as SceneObject,
  ])
  const femaleObjects: SceneObject[] = bars.map(
    (b, i) => ({ type: 'bond', id: `female-${i}`, from: b.femaleBar.from, to: b.femaleBar.to, color: '#ec4899' }) as SceneObject,
  )

  const steps: SceneStep[] = [
    {
      narration: `This population pyramid for ${params.regionName} stacks age bands from youngest at the bottom to oldest at the top. The blue bars on the left show male population share per band.`,
      objects: maleObjects,
    },
    {
      narration: `The pink bars on the right show female population share per band. Comparing the two sides, and how wide the bands are at the bottom versus the top, shows whether ${params.regionName} has a young, growing population or an aging one.`,
      objects: femaleObjects,
    },
  ]

  return {
    id: `pyramid-${params.regionName.replace(/\s+/g, '-')}`,
    title: `Population Pyramid: ${params.regionName}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how male and female population shares are distributed across age bands, and what the overall shape reveals about population growth.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: `A population pyramid for ${params.regionName} with ${params.bands.length} age bands, male population on the left and female population on the right.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkPyramidConsistency(spec: SceneSpec, params: PyramidParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const { bars } = layoutBands(params)
  const tol = VISUAL_MAX * 0.02

  for (let i = 0; i < bars.length; i++) {
    const maleObj = objs.find((o) => o.id === `male-${i}`)
    const femaleObj = objs.find((o) => o.id === `female-${i}`)
    if (!maleObj?.to || !femaleObj?.to) {
      errors.push(`missing male/female bar for band ${i} ("${bars[i].label}")`)
      continue
    }
    if (Math.abs(maleObj.to[0] - bars[i].maleBar.to[0]) > tol) {
      errors.push(`band ${i} male bar end x=${maleObj.to[0]} does not match re-derived ${bars[i].maleBar.to[0]}`)
    }
    if (Math.abs(femaleObj.to[0] - bars[i].femaleBar.to[0]) > tol) {
      errors.push(`band ${i} female bar end x=${femaleObj.to[0]} does not match re-derived ${bars[i].femaleBar.to[0]}`)
    }
    if (maleObj.to[0] > 0) errors.push(`band ${i} male bar must extend left (negative x), got ${maleObj.to[0]}`)
    if (femaleObj.to[0] < 0) errors.push(`band ${i} female bar must extend right (positive x), got ${femaleObj.to[0]}`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the population-pyramid (demographic) data being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isPyramid": true|false, "regionName": <string>, "bands": [{"label": <string>, "malePct": <number>, "femalePct": <number>}, ...]}
- isPyramid is false if the text is not about age/sex population distribution.
- bands must be ordered youngest-first to oldest-last, 2 to 8 bands.
- malePct/femalePct are percentages (0-100) of population in that band; do not invent values not stated in the text.`
}

/**
 * Extract validated demographic-pyramid parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractPyramidParams(text: string): Promise<PyramidParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 400).catch(() => null)
  if (!raw || raw.isPyramid !== true) return null
  return validatePyramidParams(raw)
}
