/**
 * Historical timeline scene generator (11th parametric generator).
 *
 * Lays out a set of dated events along a horizontal axis, positioned
 * proportionally within the events' year range, with labels alternating
 * above/below the axis so they don't overlap. Same architecture as the other
 * generators: extractTimelineParams (LLM, isolated) → validateTimelineParams
 * (pure) → buildTimelineScene (pure, deterministic layout) →
 * checkTimelineConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface TimelineEvent {
  year: number
  event: string
}

export interface TimelineParams {
  events: TimelineEvent[]
}

export const MIN_EVENTS = 2
export const MAX_EVENTS = 8
const VISUAL_MAX = 16
const MIN_HISTORICAL_YEAR = -10000
const MAX_HISTORICAL_YEAR = 3000

function isValidEvent(raw: unknown): raw is TimelineEvent {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  const year = strictNumber(o.year)
  if (!Number.isFinite(year) || !Number.isInteger(year)) return false
  if (year < MIN_HISTORICAL_YEAR || year > MAX_HISTORICAL_YEAR) return false
  return typeof o.event === 'string' && o.event.trim().length > 0
}

export function validateTimelineParams(raw: unknown): TimelineParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (!Array.isArray(o.events)) return null
  if (o.events.length < MIN_EVENTS || o.events.length > MAX_EVENTS) return null
  if (!o.events.every(isValidEvent)) return null
  const events: TimelineEvent[] = o.events.map((e: TimelineEvent) => ({
    year: strictNumber(e.year),
    event: e.event.trim(),
  }))
  return { events }
}

// ── Deterministic geometry (sort + proportional layout; never LLM-generated) ─

interface PlacedEvent extends TimelineEvent {
  x: number
  above: boolean
}

interface TimelineGeometry {
  sorted: TimelineEvent[]
  placed: PlacedEvent[]
  minYear: number
  maxYear: number
}

/**
 * Always sorts events by year ascending before laying out, regardless of the
 * order the LLM extracted them in, so the displayed timeline is guaranteed
 * chronological.
 */
function computeGeometry(p: TimelineParams): TimelineGeometry {
  const sorted = [...p.events].sort((a, b) => a.year - b.year)
  const minYear = sorted[0].year
  const maxYear = sorted[sorted.length - 1].year
  const span = Math.max(maxYear - minYear, 1) // guard divide-by-zero when all years coincide

  const placed: PlacedEvent[] = sorted.map((e, i) => ({
    ...e,
    x: round(((e.year - minYear) / span) * (2 * VISUAL_MAX) - VISUAL_MAX),
    above: i % 2 === 0,
  }))

  return { sorted, placed, minYear, maxYear }
}

/** Build a timeline SceneSpec: the axis in step 1, each event revealed in chronological order after. */
export function buildTimelineScene(params: TimelineParams): SceneSpec {
  const geo = computeGeometry(params)

  const axisStep = {
    narration: `A timeline spanning ${geo.minYear} to ${geo.maxYear}.`,
    objects: [
      { type: 'path' as const, id: 'axis', points: [[-VISUAL_MAX, 0, 0], [VISUAL_MAX, 0, 0]] as Vec3[], color: '#94a3b8' },
    ],
  }

  const eventSteps = geo.placed.map((e, i) => {
    const labelY = e.above ? 2.5 : -2.5
    return {
      narration: `${e.year}: ${e.event}`,
      objects: [
        { type: 'point' as const, id: `event-${i}`, position: [e.x, 0, 0] as Vec3, color: '#3b82f6', radius: 0.3, properties: { year: e.year, index: i, above: e.above } },
        { type: 'label' as const, id: `event-label-${i}`, position: [e.x, labelY, 0] as Vec3, text: `${e.year}: ${e.event}`, color: '#22c55e', properties: { year: e.year, index: i, above: e.above } },
      ],
    }
  })

  return {
    id: `timeline-${geo.minYear}-${geo.maxYear}-${geo.placed.length}`,
    title: `Timeline: ${geo.minYear} to ${geo.maxYear} (${geo.placed.length} events)`,
    sceneType: 'diagram',
    teachingGoal: 'Show a sequence of historical events in chronological order, spaced proportionally by year.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: `A timeline with ${geo.placed.length} events from ${geo.minYear} to ${geo.maxYear}.`,
    steps: [axisStep, ...eventSteps],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkTimelineConsistency(spec: SceneSpec, params: TimelineParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  // Independently re-sort and re-lay-out from params — never reuse buildTimelineScene's geometry.
  const sorted = [...params.events].sort((a, b) => a.year - b.year)
  const minYear = sorted[0].year
  const maxYear = sorted[sorted.length - 1].year
  const span = Math.max(maxYear - minYear, 1)
  const tol = VISUAL_MAX * 0.02

  for (const e of params.events) {
    if (!Number.isFinite(e.year) || !Number.isInteger(e.year)) {
      errors.push(`event "${e.event}" has a non-finite or non-integer year: ${e.year}`)
    }
  }

  let prevX = -Infinity
  for (let i = 0; i < sorted.length; i++) {
    const point = objs.find((o) => o.properties && (o.properties as Record<string, unknown>).year === sorted[i].year && (o.type === 'point'))
    if (!point || !point.position) {
      errors.push(`missing scene point for event year ${sorted[i].year}`)
      continue
    }
    const expectedX = round(((sorted[i].year - minYear) / span) * (2 * VISUAL_MAX) - VISUAL_MAX)
    if (Math.abs(point.position[0] - expectedX) > tol) {
      errors.push(`event year ${sorted[i].year} x-position ${point.position[0]} does not match re-derived ${expectedX}`)
    }
    if (point.position[0] < prevX - tol) {
      errors.push(`event year ${sorted[i].year} is not in chronological x-order (x=${point.position[0]} precedes ${prevX})`)
    }
    prevX = point.position[0]
  }

  if (sorted.length !== params.events.length) {
    errors.push(`sorted event count ${sorted.length} does not match input event count ${params.events.length}`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the dated historical events being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isTimeline": true|false, "events": [{"year": <integer, use negative for BCE>, "event": "<short description>"}, ...]}
- isTimeline is false if the text does not describe a sequence of at least 2 dated events.
- Include at least 2 and at most 8 events; do not invent events or years not stated in the text.
- Use negative integers for BCE years (e.g. -3000 for 3000 BCE) and positive integers for CE years.`
}

/**
 * Extract validated timeline events from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractTimelineParams(text: string): Promise<TimelineParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 400).catch(() => null)
  if (!raw || raw.isTimeline !== true) return null
  return validateTimelineParams(raw)
}
