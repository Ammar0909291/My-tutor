/**
 * THE CRITIC — whether a generated figure is fit to show a learner.
 *
 * THE PROBLEM THIS EXISTS FOR. The engine's own validation answers "is this a
 * well-formed figure that mentions this concept's words". Measured against the
 * first real cohort, that is not enough by a wide margin: all eight figures
 * passed it, and three of them were confidently wrong — the seven SI base units
 * drawn as an ordered process, matter's taxonomy drawn as a sequence, the
 * characteristics of life drawn as steps that happen one after another. Every
 * one was structurally valid and lexically anchored. The gap is not structure.
 * It is whether the picture is TRUE, whether it TEACHES, and whether it will
 * actually RENDER.
 *
 * ── TWO LAYERS, CHEAPEST FIRST ──────────────────────────────────────────────
 * STATIC   deterministic, free, no model. Rendering and grounding are facts
 *          about the payload, and a figure that cannot render or cannot be
 *          spoken about is rejected before anything expensive happens.
 * JUDGED   one model call, and only for figures that survived STATIC. Relevance,
 *          correctness and explanatory value are claims about the world, and no
 *          amount of schema checking reaches them.
 *
 * ── THE JUDGE DID NOT WRITE THE FIGURE ──────────────────────────────────────
 * It is a separate call with a separate prompt that is never shown the
 * generation instructions. A model asked "is your answer good" agrees with
 * itself; a model asked "here is a figure and here is a concept, do they match"
 * has nothing to defend.
 *
 * ── UNSURE IS NOT PASS ──────────────────────────────────────────────────────
 * Three outcomes, and the middle one is the important one:
 *   promote  every dimension passed — the figure may become ACTIVE
 *   hold     anything was uncertain — stays DRAFT, no learner sees it
 *   reject   anything failed outright
 * Uncertainty resolves to HOLD, never to promote. The cost of holding a good
 * figure is that a learner reads text; the cost of promoting a wrong one is
 * that a learner is taught something false by something that looks
 * authoritative. Those are not comparable, and the asymmetry is the whole
 * design.
 *
 * THE CRITIC NEVER REPAIRS. It has no path that edits, retries or downgrades a
 * figure into a passing one — that would make it a second author.
 */

import { compileExpression } from '@/lib/visuals/mathParser'
import { isLayoutSafe, checkSceneLayoutAllViewports } from './layout'
import { generateJSON } from '@/lib/ai/client'
import type { ArchetypeContext } from './archetypes'
import type { GeneratedFigure } from './visualEngine'
import type { VisualSpec } from '@/lib/visuals/visualSpec'

export type CriticDimension =
  /** Is this a figure OF this concept? */
  | 'relevance'
  /** Is everything it asserts true? */
  | 'correctness'
  /** Would a learner understand the concept better for having seen it? */
  | 'explanatoryValue'
  /** Can the tutor speak about it from what it carries? */
  | 'grounding'
  /** Will it survive being drawn, at every viewport? */
  | 'rendering'
  /**
   * Does the figure CONTAIN what its own words promise?
   *
   * A title is a claim about the picture. "Tangent vs Secant Approximations"
   * asserts two lines are drawn; a graph spec draws exactly one curve and no
   * annotations, so that title is false about its own payload no matter how
   * correct the curve is. Measured on a random 30-topic cohort: that exact
   * figure passed relevance, correctness AND explanatory value, because each
   * of those asks about the CONCEPT and none asks whether the words match the
   * drawing. A learner would then hear the tutor describe two lines that are
   * not on their screen.
   */
  | 'claimSupport'

export type DimensionVerdict = 'pass' | 'fail' | 'unsure'

export interface CriticReport {
  dimensions: Record<CriticDimension, { verdict: DimensionVerdict; reason: string }>
  /** promote → may become ACTIVE · hold → stays DRAFT · reject → not kept. */
  decision: 'promote' | 'hold' | 'reject'
  /** Fraction of dimensions that passed outright. Reported, never thresholded. */
  confidence: number
  /** True when the model judge ran; false when STATIC alone decided. */
  judged: boolean
}

/**
 * The judge's share of a turn. Generation already has its own budget; this
 * bounds the second call so the worst case a learner can experience is both
 * budgets, not an open-ended wait.
 */
const JUDGE_BUDGET_MS = 5000

const DIMENSIONS: CriticDimension[] = [
  'relevance', 'correctness', 'explanatoryValue', 'grounding', 'rendering', 'claimSupport',
]

/**
 * WHAT EACH FORM CAN ACTUALLY DRAW, read off the renderers' own schemas.
 *
 * This is the mechanical half of claim support: not an opinion about the
 * topic, but a fact about the payload. A `graph` carries ONE equation and no
 * annotation fields, so it renders one curve — it cannot draw a second
 * function, a tangent, a chord, a shaded region or a marked point, whatever
 * its title says. Counting what a payload can put on screen is therefore
 * enough to catch a title that promises more than one thing.
 */
function drawnElementCount(figure: GeneratedFigure): number {
  if (figure.kind === 'scene') {
    return figure.scene.steps.reduce((n, s) => n + (s.objects?.length ?? 0), 0)
  }
  const spec = figure.spec as VisualSpec & Record<string, unknown>
  switch (spec.type) {
    // One equation, one curve. No annotation layer exists in the schema.
    case 'graph': return 1
    case 'number_line': return Array.isArray(spec.highlight) ? spec.highlight.length : 0
    case 'process_flow': return Array.isArray(spec.steps) ? spec.steps.length : 0
    // One shape with its measurements.
    case 'geometry': return 1
    default: return 0
  }
}

/**
 * Does the title claim MORE THAN ONE thing is drawn?
 *
 * Deliberately narrow. It looks for explicit comparison markers rather than
 * trying to parse English: "A vs B", "A versus B", "A compared with B",
 * "A against B". Those are unambiguous claims that two things are on screen,
 * which is exactly the family the measured failure belongs to, and a rule that
 * fires only on them will not reject a figure for being descriptive.
 */
export function claimsComparison(text: string): boolean {
  return /\b(?:vs\.?|versus|compared\s+(?:to|with)|against)\b/i.test(text)
}

/** The figure's own words, in reading order. */
export function figureText(figure: GeneratedFigure): string[] {
  if (figure.kind === 'scene') {
    const out: string[] = []
    if (figure.scene.title) out.push(figure.scene.title)
    for (const step of figure.scene.steps) {
      if (step.narration) out.push(step.narration)
      for (const o of step.objects) if (o.text) out.push(o.text)
    }
    return out
  }
  const spec = figure.spec as VisualSpec & Record<string, unknown>
  const out: string[] = []
  if (typeof spec.title === 'string') out.push(spec.title)
  if (spec.type === 'graph' && typeof spec.equation === 'string') out.push(spec.equation)
  if (spec.type === 'process_flow' && Array.isArray(spec.steps)) {
    for (const s of spec.steps as Array<{ title?: string; note?: string }>) {
      if (s.title) out.push(s.title)
      if (s.note) out.push(s.note)
    }
  }
  return out
}

/**
 * RENDERING — will the thing survive being drawn?
 *
 * Scenes go through the layout model that already owns this question at every
 * viewport. Specs are checked against the failure each renderer actually has:
 * a graph whose equation does not compile is a blank plot, and a graph that is
 * constant or non-finite across its own domain is a flat line the tutor will
 * describe as a curve.
 */
export function checkRendering(figure: GeneratedFigure): { verdict: DimensionVerdict; reason: string } {
  if (figure.kind === 'scene') {
    if (!isLayoutSafe(figure.scene)) {
      const reports = checkSceneLayoutAllViewports(figure.scene)
      const worst = reports.flatMap((r) => r.violations)[0]
      return { verdict: 'fail', reason: `layout unsafe: ${worst ?? 'unknown violation'}` }
    }
    return { verdict: 'pass', reason: 'layout safe at every viewport' }
  }

  const spec = figure.spec as VisualSpec & Record<string, unknown>

  if (spec.type === 'graph') {
    const compiled = compileExpression(String(spec.equation))
    if (!compiled) return { verdict: 'fail', reason: 'equation does not compile — the plot would be blank' }
    const domain = Array.isArray(spec.domain) ? (spec.domain as [number, number]) : [-10, 10]
    const samples: number[] = []
    for (let i = 0; i <= 40; i++) {
      const x = domain[0] + ((domain[1] - domain[0]) * i) / 40
      const y = compiled.eval(x)
      if (Number.isFinite(y)) samples.push(y)
    }
    if (samples.length < 20) {
      return { verdict: 'fail', reason: 'equation is non-finite across most of its domain' }
    }
    const spread = Math.max(...samples) - Math.min(...samples)
    if (spread === 0) {
      return { verdict: 'fail', reason: 'equation is constant — nothing to see' }
    }
    return { verdict: 'pass', reason: 'equation compiles and varies across its domain' }
  }

  if (spec.type === 'number_line') {
    const start = Number(spec.start), end = Number(spec.end)
    if (!(end > start)) return { verdict: 'fail', reason: 'number line has no positive range' }
    const highlights = Array.isArray(spec.highlight) ? (spec.highlight as number[]) : []
    const outside = highlights.filter((h) => h < start || h > end)
    if (outside.length > 0) {
      return { verdict: 'fail', reason: `highlights outside the line: ${outside.join(', ')}` }
    }
    return { verdict: 'pass', reason: 'range and highlights are drawable' }
  }

  // process_flow and geometry are constrained by their schemas (step count,
  // title length, positive dimensions), which the engine already enforced.
  return { verdict: 'pass', reason: 'schema-constrained renderer' }
}

/**
 * Raw LaTeX in text a renderer draws as plain characters.
 *
 * Found by running the real pipeline, not by reading code: a kinetic-energy
 * graph came back titled `Kinetic Energy ($E_k = \frac{1}{2}mv^2$ for $m=2$
 * kg)`. The figure was correct; the title would have been drawn to a learner
 * verbatim, backslashes and all. The critic's judge passed it, because it reads
 * the source and can see what the notation MEANS — which is exactly the class of
 * defect a deterministic check catches better than a model does.
 */
const LATEX_MARKERS = /\\(?:frac|sqrt|cdot|times|alpha|beta|gamma|theta|pi|mu|Delta|sum|int)\b|\$[^$]+\$|\\\(|\\\[/

export function containsRawLatex(text: string): boolean {
  return LATEX_MARKERS.test(text)
}

/**
 * GROUNDING — can the tutor talk about this figure from what it carries?
 *
 * The visual contract hands the model the figure's own words and forbids
 * claiming anything the figure does not itself show. A figure that carries no
 * words leaves the tutor nothing to be faithful TO, which is the condition
 * under which it starts inventing — so an unlabelled figure is not a quiet
 * failure, it is the specific one that produces confident nonsense.
 */
export function checkGrounding(
  figure: GeneratedFigure,
): { verdict: DimensionVerdict; reason: string } {
  const texts = figureText(figure).map((t) => t.trim()).filter(Boolean)
  if (texts.length === 0) return { verdict: 'fail', reason: 'the figure carries no words at all' }

  // These renderers draw text as text. LaTeX in a label is not typeset, it is
  // printed — and the tutor is told to speak the figure's own words, so the
  // markup reaches the learner twice.
  const latex = texts.find(containsRawLatex)
  if (latex) return { verdict: 'fail', reason: `raw LaTeX would be drawn literally: ${latex.slice(0, 60)}` }

  // A figure whose ONLY word is its own title states its name and nothing
  // else: there is nothing for the tutor to explain from it.
  if (texts.length === 1 && figure.kind === 'scene') {
    return { verdict: 'fail', reason: 'the scene is titled but nothing in it is labelled' }
  }
  return { verdict: 'pass', reason: `${texts.length} text elements the tutor can speak from` }
}

/**
 * CLAIM SUPPORT, mechanically.
 *
 * Only the part that the payload settles on its own. A comparison claim needs
 * at least two drawn elements; a figure that draws one cannot be showing two
 * things side by side. Everything subtler — a title naming a specific object
 * that is simply absent — is left to the judge, because deciding it needs to
 * know what the words MEAN and this layer deliberately does not.
 */
export function checkClaimSupport(
  figure: GeneratedFigure,
): { verdict: DimensionVerdict; reason: string } {
  const title = figureText(figure)[0] ?? ''
  const drawn = drawnElementCount(figure)

  if (claimsComparison(title) && drawn < 2) {
    return {
      verdict: 'fail',
      reason: `the title compares two things but the figure draws ${drawn} — the comparison is not on screen`,
    }
  }
  // Not proven supported, only not proven false. The judge decides the rest.
  return { verdict: 'pass', reason: 'no unsupported multiplicity claim in the title' }
}

/** The deterministic half. Free, and it can only ever reject. */
export function staticChecks(figure: GeneratedFigure) {
  return {
    rendering: checkRendering(figure),
    grounding: checkGrounding(figure),
    claimSupport: checkClaimSupport(figure),
  }
}

/**
 * The judge's prompt.
 *
 * It is shown the concept and the figure and NOTHING about how the figure was
 * produced or what forms were available — a judge that knows the author's
 * constraints starts excusing them. Rejection is stated as ordinary and
 * expected, for the same reason the generator needed an explicit way to
 * decline: without it, a model asked to grade fills in a pass.
 */
export function buildCriticPrompt(figure: GeneratedFigure, ctx: ArchetypeContext): string {
  const payload = figure.kind === 'scene' ? figure.scene : figure.spec
  return `You are checking whether a diagram is fit to show a student. You did not make it.

THE CONCEPT THE STUDENT IS LEARNING
  name: ${ctx.title}
  description: ${ctx.description || '(none given)'}

THE DIAGRAM, as data
${JSON.stringify(payload, null, 1)}

Answer four questions about it. For each: "pass", "fail", or "unsure", and one
short sentence of reason.

1. relevance         Is this a diagram OF that concept — not of its topic, not
                     of a neighbouring idea, not of one example of it?
2. correctness       Is EVERYTHING it asserts true? Look especially at what its
                     SHAPE claims. Boxes with arrows between them claim an
                     ORDER: that step 2 follows step 1. If the items merely
                     coexist (a list of units, a set of properties) or are a
                     classification (X divides into Y and Z), the arrows are a
                     lie even when every label is correct.
3. explanatoryValue  Would a student understand the concept BETTER for seeing
                     this, or does it only name things they would have to
                     already understand? A diagram that restates the title in
                     boxes teaches nothing.
4. claimSupport      Does the diagram CONTAIN everything its own words promise?
                     Read the title, labels and annotations as CLAIMS ABOUT THE
                     PICTURE, then check the data for each one. If the title
                     names an object, a curve, a line, a region, a relationship,
                     a comparison or a process stage, that thing must actually
                     be in the data. A title saying "X and Y" when only X is
                     drawn fails. A title promising a tangent, an intersection,
                     a shaded area or a second quantity fails when the data
                     contains only one curve. The words being TRUE about the
                     subject is not enough — they must be true about THIS
                     DIAGRAM. Judge only what the data shows; do not imagine a
                     renderer adding anything the data does not specify.

FAILING IS NORMAL AND EXPECTED. Most generated diagrams are wrong in at least
one of these ways, and saying so is the useful answer. Do not look for a
reading that makes a bad diagram acceptable. If you are genuinely torn, say
"unsure" — that is a real answer, not a cop-out.

Reply with ONLY this JSON:
{"relevance":{"verdict":"pass|fail|unsure","reason":"..."},
 "correctness":{"verdict":"pass|fail|unsure","reason":"..."},
 "explanatoryValue":{"verdict":"pass|fail|unsure","reason":"..."},
 "claimSupport":{"verdict":"pass|fail|unsure","reason":"..."}}`
}

function readVerdict(raw: unknown): { verdict: DimensionVerdict; reason: string } | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as { verdict?: unknown; reason?: unknown }
  if (r.verdict !== 'pass' && r.verdict !== 'fail' && r.verdict !== 'unsure') return null
  return { verdict: r.verdict, reason: typeof r.reason === 'string' ? r.reason : '' }
}

/**
 * Judge a figure end to end.
 *
 * A judge that cannot be reached, or that answers in a shape this cannot read,
 * yields UNSURE — never pass. An unavailable critic must not become an
 * automatic approval, which is the failure mode that turns a safety gate into
 * a formality the first time a provider has a bad day.
 */
export async function criticiseFigure(
  figure: GeneratedFigure,
  ctx: ArchetypeContext,
  deps: {
    generate?: (prompt: string, maxTokens?: number) => Promise<unknown>
    /**
     * How long to wait for the judge. A learner is on the other end of this on
     * the live path, and a judge that never answers must not hold a lesson
     * open — it times out into UNSURE, which is HOLD, which is no figure.
     * 0 disables the clock, which is what the offline vetting pass wants.
     */
    budgetMs?: number
  } = {},
): Promise<CriticReport> {
  const dimensions = {
    relevance: { verdict: 'unsure' as DimensionVerdict, reason: 'not judged' },
    correctness: { verdict: 'unsure' as DimensionVerdict, reason: 'not judged' },
    explanatoryValue: { verdict: 'unsure' as DimensionVerdict, reason: 'not judged' },
    ...staticChecks(figure),
  }

  // STATIC can reject on its own, and when it does the model is never called:
  // a figure that will not render is not made acceptable by being relevant.
  // A claim the payload mechanically contradicts is as terminal as a figure
  // that cannot render: no reading of the concept makes a title true about a
  // picture that does not contain what it names.
  const staticFailed =
    dimensions.rendering.verdict === 'fail' ||
    dimensions.grounding.verdict === 'fail' ||
    dimensions.claimSupport.verdict === 'fail'
  if (staticFailed) return finalise(dimensions, false)

  let judged = false
  try {
    const judging = (deps.generate ?? generateJSON)(buildCriticPrompt(figure, ctx), 700)
    const budgetMs = deps.budgetMs ?? JUDGE_BUDGET_MS
    // A TIMEOUT AND A BAD ANSWER ARE DIFFERENT FAILURES, and reporting both as
    // "unreadable shape" made the calibration corpus unreadable in turn: four
    // of twenty judged cases showed it, and re-running them one at a time
    // produced clean verdicts, so most were the clock and not the model. Both
    // still resolve to UNSURE — the behaviour is unchanged and safe — but the
    // audit now says which happened.
    const TIMED_OUT = Symbol('judge-timeout')
    const raw = budgetMs > 0
      ? await Promise.race([
          judging,
          new Promise<typeof TIMED_OUT>((resolve) => setTimeout(() => resolve(TIMED_OUT), budgetMs)),
        ])
      : await judging
    const timedOut = raw === TIMED_OUT
    const obj = timedOut ? null : (raw as Record<string, unknown> | null)
    const relevance = readVerdict(obj?.relevance)
    const correctness = readVerdict(obj?.correctness)
    const explanatoryValue = readVerdict(obj?.explanatoryValue)
    const claimSupport = readVerdict(obj?.claimSupport)
    if (relevance && correctness && explanatoryValue && claimSupport) {
      dimensions.relevance = relevance
      dimensions.correctness = correctness
      dimensions.explanatoryValue = explanatoryValue
      // The deterministic check can only ever REJECT; where it passed, the
      // judge's reading is what decides, so a judged fail must not be
      // overwritten by the mechanical "nothing proven false".
      if (dimensions.claimSupport.verdict === 'pass') dimensions.claimSupport = claimSupport
      judged = true
    } else {
      const reason = timedOut
        ? `judge did not answer within ${budgetMs}ms`
        : 'judge replied in an unreadable shape'
      dimensions.relevance = { verdict: 'unsure', reason }
      dimensions.correctness = { verdict: 'unsure', reason }
      dimensions.explanatoryValue = { verdict: 'unsure', reason }
    }
  } catch {
    const reason = 'judge unreachable'
    dimensions.relevance = { verdict: 'unsure', reason }
    dimensions.correctness = { verdict: 'unsure', reason }
    dimensions.explanatoryValue = { verdict: 'unsure', reason }
  }

  return finalise(dimensions, judged)
}

function finalise(
  dimensions: CriticReport['dimensions'],
  judged: boolean,
): CriticReport {
  const verdicts = DIMENSIONS.map((d) => dimensions[d].verdict)
  const passed = verdicts.filter((v) => v === 'pass').length
  const decision: CriticReport['decision'] =
    verdicts.includes('fail') ? 'reject'
    : verdicts.includes('unsure') ? 'hold'
    : 'promote'
  return { dimensions, decision, confidence: passed / DIMENSIONS.length, judged }
}

/** One line per figure, for an operator reading a long pass. */
export function describeCritique(report: CriticReport): string {
  const failed = DIMENSIONS
    .filter((d) => report.dimensions[d].verdict !== 'pass')
    .map((d) => `${d}=${report.dimensions[d].verdict} (${report.dimensions[d].reason})`)
  return `${report.decision.toUpperCase()} ${(report.confidence * 100).toFixed(0)}%` +
    (failed.length > 0 ? ` — ${failed.join('; ')}` : '')
}
