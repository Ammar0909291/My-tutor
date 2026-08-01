/**
 * ADR 15 — Rendered Reality Model (RRM).
 *
 * Server-authoritative, per-session append-only log of rendered visual
 * state.  Closes the perception loop: the LLM knows what the learner
 * sees because the same code that selects the visual writes the RRM
 * entry, which is injected into the system prompt on the next turn.
 *
 * Single-writer invariant: only the Conversation Runtime (route.ts)
 * writes entries.  The LLM, client UI, and Educational Brain never
 * write.
 *
 * Pure module — no DB, no I/O, no LLM calls.
 */

import { VISUAL_META, type VisualType } from '@/lib/school/visuals/visualTypes'

import type { VisualIntent } from './visualIntent'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type VisualSourcePipeline =
  | 'responseVisual'
  | 'detectedVisualSpec'
  | 'detectedSceneSpec'
  | 'dynamicVisualizationCode'

export interface RRMEntry {
  visualIdentity: string
  visualSemantics: string
  sourcePipeline: VisualSourcePipeline
  matchedConcept: string | null
  turnPosition: number
  /** WP-7 / handoff VH-4 — "RRM records the VisualIntent that produced each
   *  rendered visual, not only the visual" (Phase 2 §8.2).
   *
   *  Without this, the log answers "what was shown" but not "why", so a
   *  later turn cannot tell a repeat of the same CLAIM from a repeat of the
   *  same PICTURE — which is the distinction VD-7's fallback and VS5's
   *  history exclusion both need.
   *
   *  OPTIONAL: nothing forms an intent yet (VD-1/VD-2/VD-3 are stages V3/V5),
   *  so every entry written today omits it, exactly as before. Absent means
   *  "no intent was recorded", never "no intent existed". */
  visualIntent?: VisualIntent
}

export type RRMLog = RRMEntry[]

// ---------------------------------------------------------------------------
// Read / Write helpers (contextSnapshot integration)
// ---------------------------------------------------------------------------

export function readRRM(snapshot: Record<string, unknown> | null): RRMLog {
  if (!snapshot) return []
  const raw = snapshot.renderedRealityLog
  if (!Array.isArray(raw)) return []
  return raw.filter(isValidEntry)
}

function isValidEntry(v: unknown): v is RRMEntry {
  if (!v || typeof v !== 'object') return false
  const e = v as Record<string, unknown>
  return (
    typeof e.visualIdentity === 'string' &&
    typeof e.visualSemantics === 'string' &&
    typeof e.sourcePipeline === 'string' &&
    typeof e.turnPosition === 'number'
  )
}

export function buildRRMSnapshotDelta(log: RRMLog): Record<string, unknown> {
  return { renderedRealityLog: log }
}

// ---------------------------------------------------------------------------
// Entry creation (sole writer path)
// ---------------------------------------------------------------------------

export interface CreateEntryInput {
  visualType: string | null
  visualSpec: unknown | null
  sceneSpec: unknown | null
  dynamicVisualizationCode: string | null
  responseVisual: string | null
  matchedConcept: string | null
  turnNumber: number
  /** WP-7 / VH-4. Optional and unsupplied by every current caller, so entries
   *  are shape-identical to before. */
  visualIntent?: VisualIntent
}

export function createRRMEntry(input: CreateEntryInput): RRMEntry | null {
  const pipeline = resolveSourcePipeline(input)
  if (!pipeline) return null

  const identity = resolveVisualIdentity(input, pipeline)
  const semantics = resolveVisualSemantics(input, pipeline)

  return {
    visualIdentity: identity,
    visualSemantics: semantics,
    sourcePipeline: pipeline,
    matchedConcept: input.matchedConcept,
    turnPosition: input.turnNumber,
    // Spread only when supplied, so an entry from a caller that forms no
    // intent is byte-identical to a pre-WP-7 entry.
    ...(input.visualIntent !== undefined && { visualIntent: input.visualIntent }),
  }
}

/** VH-4's payoff, as a query the log could not previously answer: has this
 *  CLAIM already been made visually, regardless of which picture made it?
 *  Returns false while no entry carries an intent — absent is not a match. */
export function hasClaimBeenRendered(log: RRMLog, claim: string): boolean {
  const needle = claim.trim().toLowerCase()
  if (needle === '') return false
  return log.some((e) => e.visualIntent?.claim.trim().toLowerCase() === needle)
}

function resolveSourcePipeline(input: CreateEntryInput): VisualSourcePipeline | null {
  if (input.visualSpec) return 'detectedVisualSpec'
  if (input.sceneSpec) return 'detectedSceneSpec'
  if (input.dynamicVisualizationCode) return 'dynamicVisualizationCode'
  if (input.responseVisual) return 'responseVisual'
  return null
}

function resolveVisualIdentity(input: CreateEntryInput, pipeline: VisualSourcePipeline): string {
  switch (pipeline) {
    case 'detectedVisualSpec':
      return describeVisualSpecIdentity(input.visualSpec)
    case 'detectedSceneSpec':
      return describeSceneSpecIdentity(input.sceneSpec)
    case 'dynamicVisualizationCode':
      return 'dynamic_visualization'
    case 'responseVisual':
      return input.responseVisual ?? 'unknown_visual'
  }
}

function resolveVisualSemantics(input: CreateEntryInput, pipeline: VisualSourcePipeline): string {
  switch (pipeline) {
    case 'responseVisual': {
      const meta = VISUAL_META[input.responseVisual as VisualType]
      if (meta) return `${meta.title}: ${meta.description}`
      return `Visual type: ${input.responseVisual}`
    }
    case 'detectedVisualSpec':
      return describeVisualSpec(input.visualSpec)
    case 'detectedSceneSpec':
      return describeSceneSpec(input.sceneSpec)
    case 'dynamicVisualizationCode':
      return 'A dynamically generated interactive visualization'
  }
}

// ---------------------------------------------------------------------------
// VisualSpec semantic description
// ---------------------------------------------------------------------------

function describeVisualSpecIdentity(spec: unknown): string {
  if (!spec || typeof spec !== 'object') return 'visual_spec'
  const s = spec as Record<string, unknown>
  if (typeof s.type === 'string') return s.type
  return 'visual_spec'
}

function describeVisualSpec(spec: unknown): string {
  if (!spec || typeof spec !== 'object') return 'A data-driven 2D visual'
  const s = spec as Record<string, unknown>
  const type = typeof s.type === 'string' ? s.type : 'unknown'

  switch (type) {
    case 'graph': {
      const eq = typeof s.equation === 'string' ? s.equation : 'an equation'
      const title = typeof s.title === 'string' ? ` titled "${s.title}"` : ''
      return `A graph plotting ${eq}${title}`
    }
    case 'number_line': {
      const start = typeof s.start === 'number' ? s.start : '?'
      const end = typeof s.end === 'number' ? s.end : '?'
      const highlights = Array.isArray(s.highlight) ? s.highlight.join(', ') : ''
      const title = typeof s.title === 'string' ? ` (${s.title})` : ''
      return `A number line from ${start} to ${end}${highlights ? ` with highlighted points at ${highlights}` : ''}${title}`
    }
    case 'geometry': {
      const shape = typeof s.shape === 'string' ? s.shape : 'shape'
      return `A geometry diagram showing a ${shape}`
    }
    case 'process_flow': {
      const steps = Array.isArray(s.steps) ? s.steps.length : 0
      return `A process flow diagram with ${steps} steps`
    }
    default:
      return `A 2D visual of type "${type}"`
  }
}

// ---------------------------------------------------------------------------
// SceneSpec semantic description
// ---------------------------------------------------------------------------

function describeSceneSpecIdentity(spec: unknown): string {
  if (!spec || typeof spec !== 'object') return 'scene_spec'
  const s = spec as Record<string, unknown>
  if (typeof s.id === 'string') return s.id
  return 'scene_spec'
}

function describeSceneSpec(spec: unknown): string {
  if (!spec || typeof spec !== 'object') return 'A 3D scene'
  const s = spec as Record<string, unknown>
  const id = typeof s.id === 'string' ? s.id : null
  const title = typeof s.title === 'string' ? s.title : null

  if (title) return `A 3D scene: ${title}`
  if (id) return `A 3D scene (${id})`
  return 'A 3D scene'
}

// ---------------------------------------------------------------------------
// "alreadyShown" ground-truth replacement (ADR 15 §6 — Decision Engine reads)
// ---------------------------------------------------------------------------

export function hasVisualBeenRendered(
  log: RRMLog,
  visualType: string | null,
): boolean {
  if (!visualType) return false
  return log.some((e) => e.visualIdentity === visualType)
}

export function currentRenderedVisual(log: RRMLog): RRMEntry | null {
  if (log.length === 0) return null
  return log[log.length - 1]
}

// ---------------------------------------------------------------------------
// System prompt injection (ADR 15 §6 — RENDERED REALITY block)
// ---------------------------------------------------------------------------

const MAX_HISTORY_ENTRIES = 3

export function buildRenderedRealityBlock(log: RRMLog): string {
  if (log.length === 0) {
    return `

RENDERED REALITY:
- No visual is currently displayed on the learner's screen.
- You may NOT describe, reference, or ask questions about any diagram, chart, graph, or visual.
- If a visual would help your explanation, say so in words ("Imagine a diagram showing...") but do NOT claim one is visible.`
  }

  const current = log[log.length - 1]
  const history = log.slice(0, -1).slice(-MAX_HISTORY_ENTRIES)

  let block = `

RENDERED REALITY (ground truth — what the learner's screen shows):

CURRENT VISUAL (turn ${current.turnPosition}):
- Type: ${current.visualIdentity}
- Shows: ${current.visualSemantics}${current.matchedConcept ? `\n- Matched concept: ${current.matchedConcept}` : ''}

RULES:
- You may ONLY reference visual elements described above. Do NOT invent, assume, or describe visual elements not listed.
- When referencing the visual, use specific details from "Shows" above — never generic phrases like "the diagram."
- If the learner describes something different from what is listed above, acknowledge the discrepancy rather than agreeing with a description that contradicts the rendered reality.`

  if (history.length > 0) {
    block += `\n\nPREVIOUS VISUALS THIS SESSION:`
    for (const entry of history) {
      block += `\n- Turn ${entry.turnPosition}: ${entry.visualIdentity} — ${entry.visualSemantics}`
    }
  }

  return block
}
