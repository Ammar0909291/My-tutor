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
})

// ── union ────────────────────────────────────────────────────────────────────
// Members must be plain ZodObjects for discriminatedUnion; cross-field checks
// (e.g. number_line end > start) go on a union-level superRefine below.
const visualSpecUnion = z.discriminatedUnion('type', [
  graphSpecSchema,
  numberLineSpecSchema,
])

export const visualSpecSchema = visualSpecUnion.superRefine((s, ctx) => {
  if (s.type === 'number_line' && s.end <= s.start) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'number_line: end must be greater than start', path: ['end'] })
  }
})

export type GraphSpec = z.infer<typeof graphSpecSchema>
export type NumberLineSpec = z.infer<typeof numberLineSpecSchema>
export type VisualSpec = z.infer<typeof visualSpecUnion>

/** All visual `type` values implemented this sprint (for docs/tests). */
export const SUPPORTED_VISUAL_TYPES = ['graph', 'number_line'] as const

/**
 * Validate unknown input into a VisualSpec. Fail-safe: returns null on any
 * invalid/missing data so callers can silently fall back to text-only.
 */
export function parseVisualSpec(input: unknown): VisualSpec | null {
  const result = visualSpecSchema.safeParse(input)
  return result.success ? result.data : null
}
