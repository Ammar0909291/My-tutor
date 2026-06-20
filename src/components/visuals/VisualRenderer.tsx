'use client'
/**
 * VisualRenderer — Visual Learning Sprint B.
 *
 * Single entry point: takes a VisualSpec (already validated, or validated here
 * if `validate` is passed an unknown) and dispatches to the correct renderer.
 * Wrapped in VisualErrorBoundary so a bad visual never breaks the host surface.
 *
 * Extensibility: to add a future renderer, add a member to the VisualSpec union
 * (visualSpec.ts) and one `case` below. No other call site changes.
 */
import { VisualErrorBoundary } from './VisualErrorBoundary'
import { GraphRenderer } from './GraphRenderer'
import { NumberLineRenderer } from './NumberLineRenderer'
import { GeometryRenderer } from './GeometryRenderer'
import { ProcessFlowRenderer } from './ProcessFlowRenderer'
import { parseVisualSpec, type VisualSpec } from '@/lib/visuals/visualSpec'
import type { VisualMasteryContext, VisualMasterySignal } from '@/lib/visuals/visualMastery'

interface VisualRendererProps {
  /** A pre-validated spec… */
  spec?: VisualSpec
  /** …or arbitrary unknown input to validate here (fail-safe → renders null). */
  raw?: unknown
  /**
   * Sprint L (Visual Mastery activation) — fully optional pass-through to
   * whichever renderer `dispatch()` selects. Omitting it leaves every
   * existing caller (Learn, VisualDemo, and any caller predating this
   * sprint) byte-identical to before.
   */
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

function dispatch(
  spec: VisualSpec,
  onMasteryEvent?: (signal: VisualMasterySignal) => void,
  masteryContext?: VisualMasteryContext
) {
  switch (spec.type) {
    case 'graph':
      return <GraphRenderer spec={spec} onMasteryEvent={onMasteryEvent} masteryContext={masteryContext} />
    case 'number_line':
      return <NumberLineRenderer spec={spec} onMasteryEvent={onMasteryEvent} masteryContext={masteryContext} />
    case 'geometry':
      return <GeometryRenderer spec={spec} onMasteryEvent={onMasteryEvent} masteryContext={masteryContext} />
    case 'process_flow':
      return <ProcessFlowRenderer spec={spec} onMasteryEvent={onMasteryEvent} masteryContext={masteryContext} />
    default: {
      // Exhaustiveness guard: a new union member without a case is a type error.
      const _never: never = spec
      return _never
    }
  }
}

export function VisualRenderer({ spec, raw, onMasteryEvent, masteryContext }: VisualRendererProps) {
  const resolved = spec ?? (raw !== undefined ? parseVisualSpec(raw) : null)
  if (!resolved) return null
  return <VisualErrorBoundary>{dispatch(resolved, onMasteryEvent, masteryContext)}</VisualErrorBoundary>
}
