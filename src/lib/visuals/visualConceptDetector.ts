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

// Sprint D: geometry concepts. Numeric props come from the text when
// explicitly labelled (e.g. "base 6", "radius 5cm", "45 degrees"); otherwise
// a sensible illustrative default is used so the concept (e.g. "find the
// area of a triangle") still gets a representative, correctly-labelled
// diagram even without specific numbers in the prompt.
export interface TriangleConcept { kind: 'triangle'; base: number; height: number }
export interface RectangleConcept { kind: 'rectangle'; width: number; height: number }
export interface CircleConcept { kind: 'circle'; radius: number }
export interface AngleConcept { kind: 'angle'; angle: number }

// Sprint E: science process concepts. A sequential, ordered list of stages —
// the same shape regardless of subject (biology/chemistry/geography/
// environmental science); see PROCESS_DEFINITIONS below for the fixed,
// deterministic step lists.
export interface ProcessFlowConcept { kind: 'process_flow'; title: string; steps: string[] }

export type DetectedConcept =
  | GraphConcept
  | NumberLineConcept
  | TriangleConcept
  | RectangleConcept
  | CircleConcept
  | AngleConcept
  | ProcessFlowConcept

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

// Sprint D: geometry keywords. Shape keywords identify *which* shape is being
// discussed; task keywords ("area", "perimeter", ...) confirm the discussion
// is asking for a visualizable computation, not just a passing mention.
const TRIANGLE_KEYWORDS = ['triangle']
const RECTANGLE_KEYWORDS = ['rectangle', 'square']
const CIRCLE_KEYWORDS = ['circle', 'circular']
const ANGLE_KEYWORDS = ['angle', 'degrees', 'degree']
const GEOMETRY_TASK_KEYWORDS = ['area', 'perimeter', 'circumference', 'measure']

// Illustrative defaults — directly matching the worked examples a tutor
// would use when no specific numbers are given in the text.
const DEFAULT_TRIANGLE = { base: 6, height: 4 }
const DEFAULT_RECTANGLE = { width: 8, height: 3 }
const DEFAULT_CIRCLE_RADIUS = 5
const DEFAULT_ANGLE = 45

/** Pull a number explicitly labelled with one of the given words, e.g. "base 6", "radius: 5cm", "height = 4". */
function extractLabeled(text: string, labels: string[]): number | null {
  for (const label of labels) {
    const re = new RegExp(`${label}\\s*(?:of|is|=|:)?\\s*(-?\\d+(?:\\.\\d+)?)`, 'i')
    const m = text.match(re)
    if (m) {
      const n = Number(m[1])
      if (Number.isFinite(n)) return n
    }
  }
  return null
}

/** Pull a number followed by "degree(s)" or a bare "°", e.g. "45 degrees", "120°". */
function extractAngleDegrees(text: string): number | null {
  const m = text.match(/(-?\d+(?:\.\d+)?)\s*(?:°|degrees?)/i)
  if (!m) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? n : null
}

// Sprint E: science process flows. Each definition's keywords are
// domain-unambiguous multi-word phrases or single nouns with no everyday
// alternate meaning (e.g. "photosynthesis"), so — unlike geometry's generic
// shape words — a single keyword match is a strong enough signal to fire on
// its own, matching the sprint brief's own one-line examples ("Explain
// photosynthesis" -> ProcessFlowSpec). Steps are fixed, deterministic,
// curriculum-accurate sequences — never generated by an LLM.
interface ProcessDefinition { keywords: string[]; title: string; steps: string[] }

const PROCESS_DEFINITIONS: ProcessDefinition[] = [
  // ── Biology ──────────────────────────────────────────────────────────────
  {
    keywords: ['photosynthesis'],
    title: 'Photosynthesis',
    steps: ['Sunlight', 'Water', 'Carbon Dioxide', 'Glucose', 'Oxygen'],
  },
  {
    keywords: ['respiration', 'cellular respiration', 'aerobic respiration'],
    title: 'Respiration',
    steps: ['Glucose', 'Oxygen', 'Carbon Dioxide', 'Water', 'Energy (ATP)'],
  },
  {
    keywords: ['digestion', 'digestive system'],
    title: 'Digestion',
    steps: ['Mouth', 'Stomach', 'Small Intestine', 'Large Intestine', 'Absorption'],
  },
  {
    keywords: ['food chain', 'food web'],
    title: 'Food Chain',
    steps: ['Sun', 'Producer', 'Primary Consumer', 'Secondary Consumer', 'Decomposer'],
  },
  {
    keywords: ['ecosystem flow', 'energy flow'],
    title: 'Energy Flow in an Ecosystem',
    steps: ['Sun', 'Producers', 'Consumers', 'Decomposers', 'Nutrients Returned to Soil'],
  },
  // ── Chemistry ────────────────────────────────────────────────────────────
  {
    keywords: ['chemical reaction'],
    title: 'Chemical Reaction Process',
    steps: ['Reactants', 'Activation Energy', 'Bond Breaking', 'Bond Formation', 'Products'],
  },
  {
    keywords: ['states of matter', 'state change', 'changes of state'],
    title: 'Changes in States of Matter',
    steps: ['Solid', 'Melting', 'Liquid', 'Evaporation', 'Gas'],
  },
  // ── Geography ────────────────────────────────────────────────────────────
  {
    keywords: ['water cycle', 'hydrological cycle'],
    title: 'Water Cycle',
    steps: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
  },
  {
    keywords: ['rock cycle'],
    title: 'Rock Cycle',
    steps: ['Magma', 'Igneous Rock', 'Weathering and Erosion', 'Sediment', 'Sedimentary Rock', 'Heat and Pressure', 'Metamorphic Rock', 'Melting'],
  },
  // ── Environmental Science ───────────────────────────────────────────────
  {
    keywords: ['carbon cycle'],
    title: 'Carbon Cycle',
    steps: ['Atmospheric CO2', 'Absorbed by Plants (Photosynthesis)', 'Respiration and Decomposition', 'Combustion of Fossil Fuels', 'Released Back to Atmosphere'],
  },
]

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

  // Geometry: a shape keyword alone is too ambiguous (a shape can be
  // mentioned in passing); require it alongside a task keyword (area,
  // perimeter, ...) or an explicit labelled dimension before firing.
  const hasTaskSignal = containsAny(lower, GEOMETRY_TASK_KEYWORDS)

  if (containsAny(lower, TRIANGLE_KEYWORDS)) {
    const base = extractLabeled(content, ['base'])
    const height = extractLabeled(content, ['height'])
    if (hasTaskSignal || base !== null || height !== null) {
      return { kind: 'triangle', base: base ?? DEFAULT_TRIANGLE.base, height: height ?? DEFAULT_TRIANGLE.height }
    }
  }

  if (containsAny(lower, CIRCLE_KEYWORDS)) {
    const radius = extractLabeled(content, ['radius']) ?? (() => {
      const d = extractLabeled(content, ['diameter'])
      return d !== null ? d / 2 : null
    })()
    if (hasTaskSignal || radius !== null) {
      return { kind: 'circle', radius: radius ?? DEFAULT_CIRCLE_RADIUS }
    }
  }

  if (containsAny(lower, RECTANGLE_KEYWORDS)) {
    const width = extractLabeled(content, ['width', 'length'])
    const height = extractLabeled(content, ['height'])
    if (hasTaskSignal || width !== null || height !== null) {
      return { kind: 'rectangle', width: width ?? DEFAULT_RECTANGLE.width, height: height ?? DEFAULT_RECTANGLE.height }
    }
  }

  if (containsAny(lower, ANGLE_KEYWORDS)) {
    const angle = extractAngleDegrees(content) ?? extractLabeled(content, ['angle'])
    if (angle !== null || hasTaskSignal) {
      return { kind: 'angle', angle: angle ?? DEFAULT_ANGLE }
    }
  }

  // Science process flows: a single domain-specific phrase match is enough
  // (see PROCESS_DEFINITIONS comment) — first definition matched wins, since
  // the keyword phrases themselves are mutually exclusive.
  for (const def of PROCESS_DEFINITIONS) {
    if (containsAny(lower, def.keywords)) {
      return { kind: 'process_flow', title: def.title, steps: def.steps }
    }
  }

  return null
}
