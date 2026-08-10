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
  'relevance', 'correctness', 'explanatoryValue', 'grounding', 'rendering',
]

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

  // A figure whose ONLY word is its own title states its name and nothing
  // else: there is nothing for the tutor to explain from it.
  if (texts.length === 1 && figure.kind === 'scene') {
    return { verdict: 'fail', reason: 'the scene is titled but nothing in it is labelled' }
  }
  return { verdict: 'pass', reason: `${texts.length} text elements the tutor can speak from` }
}

/** The deterministic half. Free, and it can only ever reject. */
export function staticChecks(figure: GeneratedFigure) {
  return { rendering: checkRendering(figure), grounding: checkGrounding(figure) }
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

Answer three questions about it. For each: "pass", "fail", or "unsure", and one
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

FAILING IS NORMAL AND EXPECTED. Most generated diagrams are wrong in at least
one of these ways, and saying so is the useful answer. Do not look for a
reading that makes a bad diagram acceptable. If you are genuinely torn, say
"unsure" — that is a real answer, not a cop-out.

Reply with ONLY this JSON:
{"relevance":{"verdict":"pass|fail|unsure","reason":"..."},
 "correctness":{"verdict":"pass|fail|unsure","reason":"..."},
 "explanatoryValue":{"verdict":"pass|fail|unsure","reason":"..."}}`
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
  const staticFailed = dimensions.rendering.verdict === 'fail' || dimensions.grounding.verdict === 'fail'
  if (staticFailed) return finalise(dimensions, false)

  let judged = false
  try {
    const judging = (deps.generate ?? generateJSON)(buildCriticPrompt(figure, ctx), 700)
    const budgetMs = deps.budgetMs ?? JUDGE_BUDGET_MS
    const raw = budgetMs > 0
      ? await Promise.race([
          judging,
          new Promise<null>((resolve) => setTimeout(() => resolve(null), budgetMs)),
        ])
      : await judging
    const obj = raw as Record<string, unknown> | null
    const relevance = readVerdict(obj?.relevance)
    const correctness = readVerdict(obj?.correctness)
    const explanatoryValue = readVerdict(obj?.explanatoryValue)
    if (relevance && correctness && explanatoryValue) {
      dimensions.relevance = relevance
      dimensions.correctness = correctness
      dimensions.explanatoryValue = explanatoryValue
      judged = true
    } else {
      const reason = 'judge replied in an unreadable shape'
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
