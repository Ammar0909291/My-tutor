/**
 * VisualConceptDetector — Visual Learning Sprint C.
 *
 * Deterministic, rule-based detection of visualizable math concepts in a
 * block of lesson/tutor text. No AI reasoning, no LLM call — plain regex and
 * keyword rules, mirroring the existing pattern in
 * src/lib/school/visuals/detectVisual.ts.
 *
 * Input: a tutor response's plain text. Output: a DetectedConcept describing
 * what to visualize (graph | number_line), or null when nothing qualifies.
 * Building/validating the actual VisualSpec is VisualSpecBuilder's job.
 */
import { compileExpression } from './mathParser'

export interface GraphConcept {
  kind: 'graph'
  equation: string
}

export interface NumberLineConcept {
  kind: 'number_line'
  highlight: number[]
}

export type DetectedConcept = GraphConcept | NumberLineConcept

// Keywords that confirm a graph-worthy concept is being discussed (linear
// equations, quadratic equations, coordinate systems). Matched only to
// corroborate an equation extraction — never sufficient on their own.
const GRAPH_KEYWORDS = [
  'linear equation', 'quadratic equation', 'coordinate plane', 'coordinate system',
  'cartesian', 'x-axis', 'y-axis', 'slope', 'parabola', 'straight line', 'graph',
]

// Keywords that confirm a number-line-worthy concept (positive/negative
// numbers, integer comparison).
const NUMBER_LINE_KEYWORDS = [
  'number line', 'positive number', 'negative number', 'integer', 'integers',
  'compare', 'comparison',
]

// y = <expression containing x>, e.g. "y = x + 2", "y=-2x+1", "y = x^2 - 2x - 3"
const EQUATION_RE = /\by\s*=\s*[-+0-9x^*/.()\s]*x[-+0-9x^*/.()\s]*/gi

/** Pull the first equation substring that both matches the pattern and actually compiles. */
function extractEquation(text: string): string | null {
  const matches = text.match(EQUATION_RE)
  if (!matches) return null
  for (const raw of matches) {
    const candidate = raw.trim().replace(/[.,;:]+$/, '')
    if (compileExpression(candidate)) return candidate
  }
  return null
}

// Standalone signed integers/decimals, e.g. "-5", "3", "0.5" — used to find
// points to highlight on a number line when the concept is detected.
const NUMBER_RE = /-?\d+(?:\.\d+)?/g

function extractHighlightNumbers(text: string): number[] {
  const found = text.match(NUMBER_RE) ?? []
  const nums = found.map(Number).filter((n) => Number.isFinite(n) && Math.abs(n) <= 1000)
  // de-dupe, cap at 10 points to keep the rendered line readable
  return Array.from(new Set(nums)).slice(0, 10)
}

function containsAny(lower: string, keywords: string[]): boolean {
  return keywords.some((kw) => lower.includes(kw))
}

/**
 * Detect a visualizable concept in lesson content. Pure, synchronous,
 * deterministic. Returns null when no rule matches — callers must treat
 * that as "render the lesson normally, no visual."
 */
export function detectVisualConcept(content: string): DetectedConcept | null {
  if (!content || content.length > 4000) return null
  const lower = content.toLowerCase()

  // Graph takes priority: only fires when an equation is both present and
  // valid (parses via the safe math parser), not merely on keyword mention.
  const equation = extractEquation(content)
  if (equation && containsAny(lower, GRAPH_KEYWORDS)) {
    return { kind: 'graph', equation }
  }
  // An equation alone (even without an explicit keyword) is still a strong,
  // unambiguous signal — "y = x + 2" is graph-worthy on its own.
  if (equation) {
    return { kind: 'graph', equation }
  }

  if (containsAny(lower, NUMBER_LINE_KEYWORDS)) {
    const highlight = extractHighlightNumbers(content)
    if (highlight.length > 0) {
      return { kind: 'number_line', highlight }
    }
  }

  return null
}
