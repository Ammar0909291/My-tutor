/**
 * statisticsBarChart — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface FrequencyBar {
  /** Category label, e.g. "0-10", "Red", "Monday". */
  label: string
  /** Frequency / count for this category, > 0. */
  frequency: number
}

export interface StatisticsParams {
  /** What the chart is measuring, e.g. "Marks scored", "Favorite color". */
  chartTitle: string
  bars: FrequencyBar[]
}

const MAX_TITLE_LEN = 100
const MAX_LABEL_LEN = 50
const MIN_BARS = 2
const MAX_BARS = 12
const FREQ_BOUND = 100000

function isValidBar(raw: unknown): raw is FrequencyBar {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  if (typeof o.label !== 'string' || !o.label.trim() || o.label.length > MAX_LABEL_LEN) return false
  const frequency = strictNumber(o.frequency)
  if (!Number.isFinite(frequency) || frequency <= 0 || frequency > FREQ_BOUND) return false
  return true
}

export function validateStatisticsParams(raw: unknown): StatisticsParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (typeof o.chartTitle !== 'string' || !o.chartTitle.trim() || o.chartTitle.length > MAX_TITLE_LEN) return null
  if (!Array.isArray(o.bars) || o.bars.length < MIN_BARS || o.bars.length > MAX_BARS) return null
  if (!o.bars.every(isValidBar)) return null

  const bars = (o.bars as FrequencyBar[]).map((b) => ({
    label: b.label.trim(),
    frequency: strictNumber((b as unknown as Record<string, unknown>).frequency),
  }))

  return { chartTitle: o.chartTitle.trim(), bars }
}

// ── Deterministic bar layout & statistics (pure; never LLM-generated) ────────

const BAR_SPACING = 3
const VISUAL_MAX_HEIGHT = 12

interface BarGeometry {
  label: string
  frequency: number
  x: number
  top: number
}

interface StatisticsGeometry {
  scale: number
  bars: BarGeometry[]
  totalFrequency: number
  mean: number
  modeLabel: string
  modeFrequency: number
}

function computeGeometry(p: StatisticsParams): StatisticsGeometry {
  const maxFreq = Math.max(...p.bars.map((b) => b.frequency), 1e-9)
  const scale = VISUAL_MAX_HEIGHT / maxFreq

  const bars: BarGeometry[] = p.bars.map((b, i) => ({
    label: b.label,
    frequency: b.frequency,
    x: round(i * BAR_SPACING),
    top: round(b.frequency * scale),
  }))

  const totalFrequency = p.bars.reduce((sum, b) => sum + b.frequency, 0)
  const weightedSum = p.bars.reduce((sum, b, i) => sum + b.frequency * i, 0)
  const mean = weightedSum / totalFrequency

  let modeIdx = 0
  for (let i = 1; i < p.bars.length; i++) {
    if (p.bars[i].frequency > p.bars[modeIdx].frequency) modeIdx = i
  }

  return { scale, bars, totalFrequency, mean, modeLabel: p.bars[modeIdx].label, modeFrequency: p.bars[modeIdx].frequency }
}

/** Build a 3-step statistics-bar-chart SceneSpec: bars, then mode highlight, then mean label. */
export function buildStatisticsBarChartScene(params: StatisticsParams): SceneSpec {
  const geo = computeGeometry(params)
  const labelPos: Vec3 = [round((geo.bars.length - 1) * BAR_SPACING * 0.5), -2.5, 0]

  const barObjects: SceneObject[] = geo.bars.flatMap((b, i) => [
    { type: 'bond', id: `bar-${i}`, from: [b.x, 0, 0], to: [b.x, b.top, 0], color: '#3b82f6' } as SceneObject,
    { type: 'label', id: `cat-${i}`, position: [b.x, -0.8, 0], text: b.label, color: '#475569' } as SceneObject,
  ])

  const modeIdx = geo.bars.findIndex((b) => b.label === geo.modeLabel)

  const steps: SceneStep[] = [
    {
      narration: `This bar chart shows the frequency distribution for "${params.chartTitle}", with one bar per category.`,
      objects: barObjects,
    },
    {
      narration: `The tallest bar, "${geo.modeLabel}" with a frequency of ${geo.modeFrequency}, is the mode — the most frequently occurring category.`,
      objects: [
        { type: 'label', id: 'modeLabel', position: [geo.bars[modeIdx].x, geo.bars[modeIdx].top + 1.2, 0], text: `mode: ${geo.modeLabel}`, color: '#f59e0b', properties: { modeLabel: geo.modeLabel, modeFrequency: geo.modeFrequency } },
      ],
    },
    {
      narration: `The mean category index is ${round(geo.mean, 2)} (out of ${params.bars.length} categories), found by Σ(index×frequency) / Σfrequency over all ${geo.totalFrequency} observations.`,
      objects: [
        { type: 'label', id: 'meanLabel', position: labelPos, text: `mean index ≈ ${round(geo.mean, 2)}, total = ${geo.totalFrequency}`, color: '#ef4444', properties: { mean: round(geo.mean, 6), totalFrequency: geo.totalFrequency } },
      ],
    },
  ]

  return {
    id: `statistics-${params.chartTitle.replace(/\s+/g, '-')}`,
    title: `Frequency Distribution: ${params.chartTitle}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how a frequency distribution is visualized as a bar chart, and how the mean and mode are derived from the underlying frequencies.',
    cameraDistance: VISUAL_MAX_HEIGHT * 3,
    ariaLabel: `A bar chart titled "${params.chartTitle}" with ${params.bars.length} categories, mode "${geo.modeLabel}" and total frequency ${geo.totalFrequency}.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkStatisticsConsistency(spec: SceneSpec, params: StatisticsParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const geo = computeGeometry(params)
  const tol = VISUAL_MAX_HEIGHT * 0.02

  for (let i = 0; i < geo.bars.length; i++) {
    const barObj = objs.find((o) => o.id === `bar-${i}`)
    if (!barObj?.to) {
      errors.push(`missing bar-${i}`)
      continue
    }
    if (Math.abs(barObj.to[1] - geo.bars[i].top) > tol) {
      errors.push(`bar-${i} top y=${barObj.to[1]} does not match re-derived ${geo.bars[i].top}`)
    }
  }

  const modeLabelObj = objs.find((o) => o.id === 'modeLabel')
  const meanLabelObj = objs.find((o) => o.id === 'meanLabel')
  if (!modeLabelObj || !meanLabelObj) {
    return { ok: false, errors: [...errors, 'missing modeLabel/meanLabel'] }
  }

  const modeProps = modeLabelObj.properties as Record<string, unknown> | undefined
  if (modeProps?.modeLabel !== geo.modeLabel) {
    errors.push(`mode label "${modeProps?.modeLabel}" does not match re-derived "${geo.modeLabel}"`)
  }
  if (Number(modeProps?.modeFrequency) !== geo.modeFrequency) {
    errors.push(`mode frequency ${modeProps?.modeFrequency} does not match re-derived ${geo.modeFrequency}`)
  }

  const meanProps = meanLabelObj.properties as Record<string, unknown> | undefined
  const labelledMean = Number(meanProps?.mean)
  if (!Number.isFinite(labelledMean) || Math.abs(labelledMean - geo.mean) > 0.001) {
    errors.push(`mean ${labelledMean} != re-derived Σ(index×freq)/Σfreq ${round(geo.mean, 6)}`)
  }
  const labelledTotal = Number(meanProps?.totalFrequency)
  if (labelledTotal !== geo.totalFrequency) {
    errors.push(`total frequency ${labelledTotal} != re-derived ${geo.totalFrequency}`)
  }

  return { ok: errors.length === 0, errors }
}

