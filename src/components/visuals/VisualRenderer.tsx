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
import { parseVisualSpec, type VisualSpec } from '@/lib/visuals/visualSpec'

interface VisualRendererProps {
  /** A pre-validated spec… */
  spec?: VisualSpec
  /** …or arbitrary unknown input to validate here (fail-safe → renders null). */
  raw?: unknown
}

function dispatch(spec: VisualSpec) {
  switch (spec.type) {
    case 'graph':
      return <GraphRenderer spec={spec} />
    case 'number_line':
      return <NumberLineRenderer spec={spec} />
    default: {
      // Exhaustiveness guard: a new union member without a case is a type error.
      const _never: never = spec
      return _never
    }
  }
}

export function VisualRenderer({ spec, raw }: VisualRendererProps) {
  const resolved = spec ?? (raw !== undefined ? parseVisualSpec(raw) : null)
  if (!resolved) return null
  return <VisualErrorBoundary>{dispatch(resolved)}</VisualErrorBoundary>
}
