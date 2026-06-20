/**
 * VisualSpecBuilder — Visual Learning Sprint C.
 *
 * Turns a DetectedConcept (from visualConceptDetector) into a validated
 * VisualSpec, ready for VisualRenderer. Fails safe: any unexpected shape or
 * exception yields null, never a thrown error.
 */
import { detectVisualConcept } from './visualConceptDetector'
import { parseVisualSpec, type VisualSpec } from './visualSpec'

/** Round to a "nice" bound so number-line ranges look intentional, not jagged. */
function niceBound(n: number): number {
  if (n <= 5) return 5
  if (n <= 10) return 10
  if (n <= 20) return 20
  if (n <= 50) return 50
  return 100
}

function buildGraphSpec(equation: string): unknown {
  return { type: 'graph', equation }
}

function buildNumberLineSpec(highlight: number[]): unknown {
  const maxAbs = Math.max(...highlight.map(Math.abs), 5)
  const bound = niceBound(maxAbs)
  return { type: 'number_line', start: -bound, end: bound, highlight }
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

    const raw = concept.kind === 'graph'
      ? buildGraphSpec(concept.equation)
      : buildNumberLineSpec(concept.highlight)

    return parseVisualSpec(raw)
  } catch {
    return null
  }
}
