/**
 * VisualSpec — Visual Learning Sprint B (Math Graph Engine MVP).
 *
 * A single, deterministic, zod-validated contract that flows from a producer
 * (a demo page now; an AI tag or builder later) to the <VisualRenderer />.
 * Sprint B implements ONLY two members of the union: `graph` and `number_line`.
 * Future renderers (geometry, process_flow, timeline, …) extend the union here
 * and add a branch in VisualRenderer — nothing else changes.
 *
 * No AI dependency. No database dependency. Pure data + validation.
 */

import { z } from 'zod'

// ── graph ──────────────────────────────────────────────────────────────────
// equation is a single-variable (x) expression; Sprint B targets linear
// (y = mx + b) and quadratic (y = ax^2 + bx + c). It is evaluated by the safe
// parser in ./mathParser.ts — never eval().
export const graphSpecSchema = z.object({
  type: z.literal('graph'),
  equation: z.string().min(1).max(120),
  title: z.string().max(80).optional(),
  // Optional initial visible x-range; the renderer is pan/zoomable regardless.
  domain: z.tuple([z.number(), z.number()]).optional(),
  // Sprint F: opt-in drag interaction (draggable slope/intercept for linear
  // equations). Omitted/false renders exactly as Sprint B — purely additive.
  interactive: z.boolean().optional(),
})

// ── number_line ─────────────────────────────────────────────────────────────
export const numberLineSpecSchema = z.object({
  type: z.literal('number_line'),
  start: z.number(),
  end: z.number(),
  // Points to mark on the line. Non-integers are allowed (basic fraction
  // support, e.g. 0.5, -1.5) and rendered with simple-fraction labels.
  highlight: z.array(z.number()).max(60).optional(),
  // Optional tick spacing; defaults to a sensible value derived from range.
  step: z.number().positive().max(1000).optional(),
  title: z.string().max(80).optional(),
  // Sprint F: opt-in drag interaction (draggable highlighted points).
  interactive: z.boolean().optional(),
})

// ── process_flow ─────────────────────────────────────────────────────────────
// Sprint E: a reusable diagram for sequential scientific processes
// (photosynthesis, water cycle, digestion, food chain, ...). Every step is
// plain text — no expression evaluation, no external diagram library.
// Accepts either a bare string per step (the sprint brief's own example
// shape) or a richer { title, note? } object; preprocess normalizes both to
// the object form so the renderer always has a stable shape to annotate.
const processFlowStepSchema = z.preprocess(
  (v) => (typeof v === 'string' ? { title: v } : v),
  z.object({
    title: z.string().min(1).max(60),
    note: z.string().max(140).optional(),
  })
)

export const processFlowSpecSchema = z.object({
  type: z.literal('process_flow'),
  title: z.string().min(1).max(80),
  steps: z.array(processFlowStepSchema).min(2).max(12),
  // 'auto' (default) picks vertical/horizontal based on the rendered
  // container width; callers may force a layout explicitly.
  orientation: z.enum(['vertical', 'horizontal', 'auto']).optional(),
  // Sprint F: opt-in reorder mode (drag/Up-Down to fix a shuffled sequence).
  interactive: z.boolean().optional(),
})

// ── geometry ─────────────────────────────────────────────────────────────────
// Sprint D: closed-form coordinate-geometry shapes only — no equation
// strings, no parser, no external geometry engine. Every numeric prop is
// validated directly by zod, so there is no expression-evaluation attack
// surface the way graph's `equation` string requires one (see mathParser.ts).
// Each shape is its own ZodObject sharing the literal `type: 'geometry'` plus
// a `shape` discriminant; geometrySpecSchema is a nested discriminatedUnion
// on `shape` (kept separate from the outer union below because
// discriminatedUnion requires unique discriminant *values* per member, and
// every geometry shape shares `type: 'geometry'`).
// Sprint F: opt-in drag interaction (vertex/handle dragging with live
// area/perimeter/circumference/angle updates). Omitted/false renders
// exactly as Sprint D — purely additive on every shape below.
const pointSpecSchema = z.object({
  type: z.literal('geometry'),
  shape: z.literal('point'),
  title: z.string().max(80).optional(),
  interactive: z.boolean().optional(),
})

const lineSpecSchema = z.object({
  type: z.literal('geometry'),
  shape: z.literal('line'),
  length: z.number().positive().max(1000),
  title: z.string().max(80).optional(),
  interactive: z.boolean().optional(),
})

const angleSpecSchema = z.object({
  type: z.literal('geometry'),
  shape: z.literal('angle'),
  angle: z.number().min(0).max(360),
  title: z.string().max(80).optional(),
  interactive: z.boolean().optional(),
})

const trianglePropsSchema = z.object({
  type: z.literal('geometry'),
  shape: z.literal('triangle'),
  base: z.number().positive().max(1000),
  height: z.number().positive().max(1000),
  title: z.string().max(80).optional(),
  interactive: z.boolean().optional(),
})

const rectanglePropsSchema = z.object({
  type: z.literal('geometry'),
  shape: z.literal('rectangle'),
  width: z.number().positive().max(1000),
  height: z.number().positive().max(1000),
  title: z.string().max(80).optional(),
  interactive: z.boolean().optional(),
})

const circlePropsSchema = z.object({
  type: z.literal('geometry'),
  shape: z.literal('circle'),
  radius: z.number().positive().max(1000),
  title: z.string().max(80).optional(),
  interactive: z.boolean().optional(),
})

export const geometrySpecSchema = z.discriminatedUnion('shape', [
  pointSpecSchema,
  lineSpecSchema,
  angleSpecSchema,
  trianglePropsSchema,
  rectanglePropsSchema,
  circlePropsSchema,
])

// ── union ────────────────────────────────────────────────────────────────────
// Members must be plain ZodObjects for discriminatedUnion; cross-field checks
// (e.g. number_line end > start) go on a union-level superRefine below.
// geometrySpecSchema is itself a (nested) discriminated union, not a plain
// ZodObject, so the outer union is a plain z.union rather than a
// discriminatedUnion — `type` still narrows correctly at the TypeScript
// level for switch/case dispatch, zod just validates each branch in order.
const mathSpecUnion = z.discriminatedUnion('type', [
  graphSpecSchema,
  numberLineSpecSchema,
  processFlowSpecSchema,
])

const visualSpecUnion = z.union([mathSpecUnion, geometrySpecSchema])

export const visualSpecSchema = visualSpecUnion.superRefine((s, ctx) => {
  if (s.type === 'number_line' && s.end <= s.start) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'number_line: end must be greater than start', path: ['end'] })
  }
})

export type GraphSpec = z.infer<typeof graphSpecSchema>
export type NumberLineSpec = z.infer<typeof numberLineSpecSchema>
export type ProcessFlowSpec = z.infer<typeof processFlowSpecSchema>
export type PointSpec = z.infer<typeof pointSpecSchema>
export type LineSpec = z.infer<typeof lineSpecSchema>
export type AngleSpec = z.infer<typeof angleSpecSchema>
export type TriangleSpec = z.infer<typeof trianglePropsSchema>
export type RectangleSpec = z.infer<typeof rectanglePropsSchema>
export type CircleSpec = z.infer<typeof circlePropsSchema>
export type GeometrySpec = z.infer<typeof geometrySpecSchema>
export type VisualSpec = z.infer<typeof visualSpecUnion>

/** All visual `type` values implemented this sprint (for docs/tests). */
export const SUPPORTED_VISUAL_TYPES = ['graph', 'number_line', 'geometry', 'process_flow'] as const

/**
 * Validate unknown input into a VisualSpec. Fail-safe: returns null on any
 * invalid/missing data so callers can silently fall back to text-only.
 */
export function parseVisualSpec(input: unknown): VisualSpec | null {
  const result = visualSpecSchema.safeParse(input)
  return result.success ? result.data : null
}
