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
): { text: string; removed: string[] } {
  const sim = servedSimulation(decision)
  if (!sim || typeof text !== 'string' || !text.trim()) return { text, removed: [] }
  const msg = learnerMessage ?? ''
  if (/\d/.test(msg)) return { text, removed: [] }
  const patterns = sim.predictions
    .filter((p) => p.giveaway && !p.giveaway.topic.test(msg))
    .flatMap((p) => p.giveaway!.answer)
  if (patterns.length === 0) return { text, removed: [] }

  const removed: string[] = []
  const lines = text.split('\n').map((line) => {
    const sentences = line.split(/(?<=[.!?])\s+/)
    const kept = sentences.filter((s) => {
      if (patterns.some((re) => re.test(s))) { removed.push(s.trim()); return false }
      return true
    })
    return kept.join(' ')
  })
  if (removed.length === 0) return { text, removed: [] }
  const out = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  if (out.length < 40) return { text, removed: [] }
  return { text: out, removed }
}
