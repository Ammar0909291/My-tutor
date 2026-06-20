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
  // Sprint J: optional descriptive title (e.g. coordinate-geometry's
  // "line through (x1,y1) and (x2,y2) — distance ≈ d"). Maps directly onto
  // graphSpecSchema's existing optional `title` field — no schema change.
  title?: string
}

export interface NumberLineConcept {
  kind: 'number_line'
  highlight: number[]
  // Sprint J: optional explicit [start, end] override for concepts with a
  // natural fixed domain (fractions, percentages, ratios, probability),
  // instead of the generic niceBound(maxAbs) default. Maps onto
  // numberLineSpecSchema's existing start/end fields — no schema change.
  bound?: [number, number]
  // Sprint J: optional descriptive title (e.g. a statistics summary).
  // Maps onto numberLineSpecSchema's existing optional `title` field.
  title?: string
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

// Sprint J: keywords/patterns for the six new curriculum-coverage concepts,
// all reusing the existing 'graph'/'number_line' DetectedConcept kinds.
const FRACTION_KEYWORDS = ['fraction', 'numerator', 'denominator']
const PROBABILITY_KEYWORDS = ['probability', 'likelihood', 'chance of', 'chance that', 'odds of']
const STATISTICS_KEYWORDS = ['mean of', 'median of', 'range of', 'average of', 'find the mean', 'find the median', 'find the range']
const COORDINATE_KEYWORDS = ['coordinate', 'coordinates', 'point', 'points', 'plot', 'distance', 'quadrant']

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

// ── Sprint J: Fractions / Ratios / Percentages / Probability / Statistics /
// Coordinate Geometry — all reuse the existing 'graph'/'number_line' kinds
// and the existing engines unchanged. No new DetectedConcept variants, no
// renderer changes, no schema changes (only the two new optional
// GraphConcept/NumberLineConcept fields added above).

/** "1/2", "3/4", "5/8" → [0.5, 0.75, 0.625]. Capped, deduped. */
function extractFractions(text: string): number[] {
  const out: number[] = []
  const re = /(-?\d+)\s*\/\s*(\d+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const num = Number(m[1])
    const den = Number(m[2])
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) out.push(num / den)
  }
  return Array.from(new Set(out)).slice(0, 6)
}

/** "75%", "12.5%" → [75, 12.5] (kept on a 0-100 scale, not converted to decimal). */
function extractPercentages(text: string): number[] {
  const out: number[] = []
  const re = /(-?\d+(?:\.\d+)?)\s*%/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const n = Number(m[1])
    if (Number.isFinite(n)) out.push(n)
  }
  return Array.from(new Set(out)).slice(0, 6)
}

/** First "a:b" ratio pattern in the text, e.g. "2:3" → [2, 3]. */
function extractRatio(text: string): [number, number] | null {
  const m = text.match(/(\d+)\s*:\s*(\d+)/)
  if (!m) return null
  const a = Number(m[1])
  const b = Number(m[2])
  if (!Number.isFinite(a) || !Number.isFinite(b) || a + b === 0) return null
  return [a, b]
}

/** All "(x, y)" coordinate pairs in the text, in order of appearance. */
function extractCoordinatePoints(text: string): [number, number][] {
  const out: [number, number][] = []
  const re = /\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const x = Number(m[1])
    const y = Number(m[2])
    if (Number.isFinite(x) && Number.isFinite(y)) out.push([x, y])
  }
  return out
}

/** All raw numbers in the text (not deduped — duplicates matter for mean/median). */
function extractDataset(text: string): number[] {
  const found = text.match(NUMBER_RE) ?? []
  return found.map(Number).filter((n) => Number.isFinite(n) && Math.abs(n) <= 1000).slice(0, 15)
}

function computeStats(data: number[]): { mean: number; median: number; range: number } {
  const sorted = [...data].sort((a, b) => a - b)
  const round = (n: number) => Math.round(n * 100) / 100
  const mean = round(data.reduce((s, n) => s + n, 0) / data.length)
  const mid = Math.floor(sorted.length / 2)
  const median = round(sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid])
  const range = round(sorted[sorted.length - 1] - sorted[0])
  return { mean, median, range }
}

/** A tight, visually sensible [start, end] bound around a set of fraction-like values. */
function fractionBound(values: number[]): [number, number] {
  const upper = Math.ceil(Math.max(...values, 1))
  const lower = Math.floor(Math.min(...values, 0))
  return [lower, upper]
}

/** Connecting line between two points as a "y = mx + b" string, or null for a vertical line (unsupported by the y=f(x) Graph Engine). */
function formatEquationFromPoints(p1: [number, number], p2: [number, number]): string | null {
  const [x1, y1] = p1
  const [x2, y2] = p2
  if (x1 === x2) return null
  const round = (n: number) => Math.round(n * 1000) / 1000
  const slope = round((y2 - y1) / (x2 - x1))
  const intercept = round(y1 - slope * x1)
  const sign = intercept < 0 ? '-' : '+'
  return `y = ${slope}x ${sign} ${Math.abs(intercept)}`
}

function distanceBetween(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
}

/** Sprint J Task 4: two coordinate points + a coordinate-context keyword → the connecting line, rendered via the existing, unmodified Graph Engine. A single point or a vertical line cannot be represented (no point-marker / no y=f(x) form) — documented as a known gap, not implemented. */
function detectCoordinateLine(content: string, lower: string): GraphConcept | null {
  if (!containsAny(lower, COORDINATE_KEYWORDS)) return null
  const points = extractCoordinatePoints(content)
  if (points.length < 2) return null
  const [p1, p2] = points
  const equation = formatEquationFromPoints(p1, p2)
  if (!equation || !compileExpression(equation)) return null
  const dist = Math.round(distanceBetween(p1, p2) * 100) / 100
  const base = `Line through (${p1[0]}, ${p1[1]}) and (${p2[0]}, ${p2[1]})`
  const withDistance = `${base} — distance ≈ ${dist}`
  const title = withDistance.length <= 80 ? withDistance : base.slice(0, 80)
  return { kind: 'graph', equation, title }
}

/** Sprint J Task 2: fraction placement/comparison on the existing Number Line Engine. Two-or-more fraction matches are a strong enough signal on their own (mirrors equation-alone detection); a single match still needs a corroborating keyword to avoid misfiring on date-like "3/4" text. */
function detectFractionConcept(content: string, lower: string): NumberLineConcept | null {
  const values = extractFractions(content)
  if (values.length === 0) return null
  const strongSignal = values.length >= 2 || containsAny(lower, FRACTION_KEYWORDS) || containsAny(lower, NUMBER_LINE_KEYWORDS)
  if (!strongSignal) return null
  return {
    kind: 'number_line',
    highlight: values,
    bound: fractionBound(values),
    title: values.length > 1 ? 'Comparing Fractions' : 'Fraction on a Number Line',
  }
}

/** Sprint J Task 3: percentage placement/comparison on a fixed 0-100 scale. The literal "%" sign is an unambiguous signal on its own. */
function detectPercentageConcept(content: string): NumberLineConcept | null {
  const values = extractPercentages(content)
  if (values.length === 0) return null
  return {
    kind: 'number_line',
    highlight: values,
    bound: [0, 100],
    title: values.length > 1 ? 'Comparing Percentages' : 'Percentage on a Scale of 100',
  }
}

/** Sprint J Task 3: a ratio "a:b" shown as its two parts-of-a-whole on a 0-1 Number Line. Requires the explicit word "ratio" — a bare "a:b" pattern alone is too ambiguous (time, reference, etc.) to fire on. */
function detectRatioConcept(content: string, lower: string): NumberLineConcept | null {
  if (!lower.includes('ratio')) return null
  const ratio = extractRatio(content)
  if (!ratio) return null
  const [a, b] = ratio
  const total = a + b
  const round = (n: number) => Math.round(n * 1000) / 1000
  return {
    kind: 'number_line',
    highlight: [round(a / total), round(b / total)],
    bound: [0, 1],
    title: `Ratio ${a}:${b} as Parts of a Whole`,
  }
}

/** Sprint J Task 6: a probability value (fraction, percentage, or bare 0-1 decimal) placed on a fixed 0-1 probability scale. Requires an explicit probability/likelihood/chance keyword. */
function detectProbabilityConcept(content: string, lower: string): NumberLineConcept | null {
  if (!containsAny(lower, PROBABILITY_KEYWORDS)) return null
  const fractions = extractFractions(content)
  const percents = extractPercentages(content).map((p) => p / 100)
  // True decimals only (requires a "."), not extractHighlightNumbers() —
  // that would also match the bare integer components of an already-handled
  // "1/6" fraction pattern (e.g. the standalone "1") and double-count them.
  const decimals = (content.match(/-?\d+\.\d+/g) ?? []).map(Number).filter((n) => n >= 0 && n <= 1)
  const values = Array.from(new Set([...fractions, ...percents, ...decimals])).slice(0, 4)
  if (values.length === 0) return null
  return {
    kind: 'number_line',
    highlight: values,
    bound: [0, 1],
    title: values.length > 1 ? 'Comparing Probabilities' : 'Probability Scale',
  }
}

/** Sprint J Task 5: mean/median/range of a dataset, shown as the data points plus the mean highlighted on the existing Number Line Engine — the only one of the four existing engines that can plot a literal set of numeric data points (the Graph Engine only plots y=f(x); building a dedicated chart engine is explicitly out of scope). Requires an explicit "mean of"/"median of"/"range of"/"average of" phrase, since bare "mean"/"range" are too common in non-statistical text (e.g. "mountain range"). */
function detectStatisticsConcept(content: string, lower: string): NumberLineConcept | null {
  if (!containsAny(lower, STATISTICS_KEYWORDS)) return null
  const data = extractDataset(content)
  if (data.length < 2) return null
  const { mean, median, range } = computeStats(data)
  return {
    kind: 'number_line',
    highlight: Array.from(new Set([...data, mean])),
    title: `Mean = ${mean}, Median = ${median}, Range = ${range}`,
  }
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

  // Sprint J: coordinate geometry — two points reused as a line through the
  // existing Graph Engine. Comes before the fraction/number-line branches
  // since it's still 'graph'-kind, mirroring the equation checks above.
  const coordLine = detectCoordinateLine(content, lower)
  if (coordLine) return coordLine

  // Sprint J: fractions/percentages/ratios/probability/statistics all run
  // before the generic NUMBER_LINE_KEYWORDS branch below, so their more
  // specific number parsing (fraction strings, "%", "a:b") wins instead of
  // being swallowed by extractHighlightNumbers()'s plain-integer extraction.
  const fraction = detectFractionConcept(content, lower)
  if (fraction) return fraction

  // Probability checked before plain percentage so "the probability of rain
  // is 30%" is tagged as a probability scale, not a generic percentage scale
  // — probability's own extraction already understands percent values too.
  const probability = detectProbabilityConcept(content, lower)
  if (probability) return probability

  const percentage = detectPercentageConcept(content)
  if (percentage) return percentage

  const ratio = detectRatioConcept(content, lower)
  if (ratio) return ratio

  const statistics = detectStatisticsConcept(content, lower)
  if (statistics) return statistics

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
