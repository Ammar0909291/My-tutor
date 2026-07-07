/**
 * VisualSpecBuilder — Visual Learning Sprint C.
 *
 * Turns a DetectedConcept (from visualConceptDetector) into a validated
 * VisualSpec, ready for VisualRenderer. Fails safe: any unexpected shape or
 * exception yields null, never a thrown error.
 */
import { detectVisualConcept, type DetectedConcept, type NumberLineConcept } from './visualConceptDetector'
import { parseVisualSpec, type VisualSpec } from './visualSpec'

/** Round to a "nice" bound so number-line ranges look intentional, not jagged. */
function niceBound(n: number): number {
  if (n <= 5) return 5
  if (n <= 10) return 10
  if (n <= 20) return 20
  if (n <= 50) return 50
  return 100
}

function buildGraphSpec(equation: string, title?: string): unknown {
  return { type: 'graph', equation, ...(title ? { title } : {}) }
}

// Sprint J: now takes the full NumberLineConcept (not just `highlight`) so
// fraction/percentage/ratio/probability concepts can carry an explicit
// `bound` (e.g. [0,1], [0,100]) instead of always falling back to
// niceBound(maxAbs); `title` (e.g. a statistics summary) passes through to
// the spec's existing optional title field. No schema change either way.
function buildNumberLineSpec(concept: NumberLineConcept): unknown {
  const { highlight, bound, title } = concept
  let start: number
  let end: number
  if (bound) {
    ;[start, end] = bound
  } else {
    const maxAbs = Math.max(...highlight.map(Math.abs), 5)
    const b = niceBound(maxAbs)
    start = -b
    end = b
  }
  return { type: 'number_line', start, end, highlight, ...(title ? { title } : {}) }
}

// Sprint D: geometry concepts map directly onto a geometry VisualSpec —
// no derived ranges/bounds needed, every prop is already a validated number.
function buildGeometrySpec(concept: Exclude<DetectedConcept, { kind: 'graph' } | { kind: 'number_line' } | { kind: 'process_flow' }>): unknown {
  switch (concept.kind) {
    case 'triangle':
      return { type: 'geometry', shape: 'triangle', base: concept.base, height: concept.height }
    case 'rectangle':
      return { type: 'geometry', shape: 'rectangle', width: concept.width, height: concept.height }
    case 'circle':
      return { type: 'geometry', shape: 'circle', radius: concept.radius }
    case 'angle':
      return { type: 'geometry', shape: 'angle', angle: concept.angle }
  }
}

// Sprint E: science process concepts map directly onto a process_flow
// VisualSpec — steps are already a fixed, curriculum-accurate list.
function buildProcessFlowSpec(title: string, steps: string[]): unknown {
  return { type: 'process_flow', title, steps }
}

/**
 * Detect + build + validate in one call. Input: raw lesson/tutor text.
 * Output: a validated VisualSpec, or null when nothing qualifies or the
 * built object fails zod validation.
 */
export function buildVisualSpec(content: string): VisualSpec | null {
  try {
    const concept = detectVisualConcept(content)
    if (!concept) return null

    let raw: unknown
    switch (concept.kind) {
      case 'graph':
        raw = buildGraphSpec(concept.equation, concept.title)
        break
      case 'number_line':
        raw = buildNumberLineSpec(concept)
        break
      case 'process_flow':
        raw = buildProcessFlowSpec(concept.title, concept.steps)
        break
      default:
        raw = buildGeometrySpec(concept)
    }

    return parseVisualSpec(raw)
  } catch {
    return null
  }
}
