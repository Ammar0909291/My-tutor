/**
 * WHEN A SIMULATION IS ON SCREEN, THE TUTOR MUST NOT GIVE AWAY ITS ANSWERS.
 *
 * ── THE DEFECT (real-learner production run, 2026-09-29, P2 pendulum) ────────
 * The pendulum simulation asks the learner to PREDICT ("make the bob heavier —
 * what happens to the time for one swing?") and then find out by running it.
 * The tutor's reply on the same turn said "the mass of the bob does not appear
 * in the formula; the period depends only on the length". The experiment was
 * answered before the learner touched it. Same on Newton's second law. The
 * prompt told the model a figure was attached, but never that the figure was
 * an experiment, or which questions it leaves for the learner to find out.
 *
 * ── WHAT THIS DOES ──────────────────────────────────────────────────────────
 * Reads the served scene's own registry entry (PARAMETRIC_SCENES — the same
 * source the client builds the simulation from) and, only when that kind has a
 * time simulation, adds one prompt block naming its prediction questions and
 * asking the tutor to invite a prediction instead of stating the result. Once
 * the learner has reported a measurement, or asks for the answer directly, the
 * tutor explains it normally. It chooses no figure and changes no grade.
 */
import type { VisualDecision } from './types'
import { simulationFor, type TimeSimulation } from './parametricScenes'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'

/** The time simulation this decision puts on screen, or null. */
export function servedSimulation(decision: VisualDecision | null | undefined): TimeSimulation | null {
  const payload = decision?.graphical ? decision.payload : null
  if (!payload || payload.renderer !== 'scene') return null
  return simulationFor(payload.sceneSpec.parametric?.kind)
}

/** The prompt block, or '' when no simulation is on screen. */
export function buildSimulationBlock(decision: VisualDecision | null | undefined): string {
  const sim = servedSimulation(decision)
  if (!sim || sim.predictions.length === 0) return ''
  const questions = sim.predictions.map((p) => `"${p.question}"`).join(' ')
  return (
    'SIMULATION: the figure is an experiment the learner can run — they change the ' +
    'values, press Run and measure the result. Before running, it asks them to ' +
    `predict: ${questions} ` +
    'Do NOT tell the learner the answers to these questions (whether the result ' +
    'grows, shrinks or stays the same, or by how much) until they have told you ' +
    'what they measured or ask you for the answer directly. Instead, invite them ' +
    'to make a prediction and test it. When they report a result, explain it.'
  )
}

/**
 * THE BACKSTOP. Measured on production after the prompt block above shipped
 * (2026-09-29, phys.wave.pendulum): "the period depends only on the length L
 * … not on how heavy the bob is" — the prompt rule was ignored, as this
 * codebase has measured for advisory rules before. So the sentences that
 * state a prediction's answer are removed after generation, using each
 * prediction's authored `giveaway` patterns.
 *
 * Nothing is removed when the learner's own message raises that variable (they
 * asked, so they get an answer) or reports a measurement (a number: they ran
 * it, so the tutor explains). Pure and additive-safe: when removal would leave
 * almost nothing, the text is returned unchanged.
 */
export function stripSimulationGiveaways(
  text: string,
  decision: VisualDecision | null | undefined,
  learnerMessage: string,
  opts: StripGiveawayOptions = {},
): { text: string; removed: string[] } {
  return stripGiveawaysFor(servedSimulation(decision), text, learnerMessage, opts)
}

export interface StripGiveawayOptions {
  /**
   * The learner's message answered a quiz, whose question is given here.
   *
   * MEASURED 2026-09-30 (learner baseline, P3 pendulum): the tapped option "It
   * increases by a factor of √2" contains a digit, so it read as a reported
   * measurement and the backstop stood down — the reply then narrated both
   * experiments' outcomes (heavier bob: no change; 4× length: twice). A quiz
   * answer is not a measurement. What the QUIZ asked about may be explained
   * (that is its feedback); every other prediction stays the learner's.
   */
  answeredQuiz?: { question: string } | null
}

/** The time simulation a concept's lesson figure is, or null. */
export function simulationForConcept(conceptId: string | null | undefined): TimeSimulation | null {
  return conceptId ? simulationFor(getConceptSceneGenerator(conceptId)) : null
}

/**
 * The backstop over an explicit simulation — the chat turn passes the one on
 * screen; the lesson opening passes the concept's own, because the opening
 * comes before the figure and an answer given there is given before the
 * learner ever predicts (P3: "the mass of the bob and the size of the swing
 * angle … do not affect T" in the very first message).
 */
export function stripGiveawaysFor(
  sim: TimeSimulation | null,
  text: string,
  learnerMessage: string,
  opts: StripGiveawayOptions = {},
): { text: string; removed: string[] } {
  if (!sim || typeof text !== 'string' || !text.trim()) return { text, removed: [] }
  const quiz = opts.answeredQuiz ?? null
  const msg = (learnerMessage ?? '') + (quiz ? ' ' + quiz.question : '')
  if (!quiz && /\d/.test(msg)) return { text, removed: [] }
  const patterns = sim.predictions
    .filter((p) => p.giveaway && !p.giveaway.topic.test(msg))
    .flatMap((p) => p.giveaway!.answer)
  if (patterns.length === 0) return { text, removed: [] }

  const removed: string[] = []
  const lines = text.split('\n').map((line) => {
    const sentences = line.split(/(?<=[.!?])\s+/)
    const kept = sentences.filter((s) => {
      // Normalised for matching only: curly apostrophes ("doesn’t" must match
      // "doesn't", production 2026-09-30), non-breaking spaces, and the
      // non-breaking/typographic hyphens a model writes between words
      // ("square‑root" with U+2011 slipped past "square root of", P3).
      const probe = s
        .replace(/[\u2018\u2019\u02BC]/g, "'")
        .replace(/[\u00A0\u202F]/g, ' ')
        .replace(/(\p{L})[\u2010\u2011\u2012-](?=\p{L})/gu, '$1 ')
      if (patterns.some((re) => re.test(probe))) { removed.push(s.trim()); return false }
      return true
    })
    return kept.join(' ')
  })
  if (removed.length === 0) return { text, removed: [] }
  const out = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  if (out.length < 40) return { text, removed: [] }
  return { text: out, removed }
}
