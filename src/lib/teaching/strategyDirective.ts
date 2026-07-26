/**
 * Strategy Directive — generates the LLM prompt block for the selected
 * teaching strategy when "explain differently" cycles through 7 distinct
 * strategies (0-6) instead of repeating the same analogy-style response.
 *
 * The 7 strategies are ordered from lightest to heaviest intervention:
 *   0  Concise explanation (short, direct)
 *   1  Simpler wording (reduce vocabulary complexity)
 *   2  Analogy (concrete comparison)
 *   3  Visual demonstration (describe visually, emit VISUAL tag if available)
 *   4  Physical activity ("Stand up. Walk 3 steps forward...")
 *   5  Guided discovery (lead with questions that build understanding)
 *   6  Prerequisite remediation (go back to prerequisite concept)
 *
 * Pure module — no DB, no I/O, never throws.
 */

/** Human-readable labels for each strategy index (for logging). */
export const STRATEGY_LABELS: string[] = [
  'Concise explanation',
  'Simpler wording',
  'Analogy',
  'Visual demonstration',
  'Physical activity',
  'Guided discovery',
  'Prerequisite remediation',
]

/** Internal directive templates per strategy index. */
const STRATEGY_DIRECTIVES: Array<(conceptId: string | null, visualType: string | null, prerequisiteId: string | null) => string> = [
  // 0 — Concise explanation
  () =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — CONCISE EXPLANATION. ' +
    'Your previous explanation did not land. This time, give the shortest ' +
    'correct explanation possible: one or two sentences, no analogies, no ' +
    'examples, no background. State the core idea directly — nothing else.',

  // 1 — Simpler wording
  () =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — SIMPLER WORDING. ' +
    'The learner did not understand the previous explanation. Restate the ' +
    'same idea using only everyday words a 10-year-old would know. Replace ' +
    'every technical term with a plain-language equivalent (parenthesise ' +
    'the technical term after the plain version). Shorter sentences, no ' +
    'subordinate clauses, no jargon.',

  // 2 — Analogy
  () =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — ANALOGY. ' +
    'The learner needs a concrete comparison. Choose one vivid, ' +
    'physically familiar analogy from everyday life (kitchen, sports, ' +
    'travel — never another academic domain) and map each part of the ' +
    'concept onto a part of the analogy explicitly. End with the one ' +
    'sentence where the analogy breaks — name its limit honestly.',

  // 3 — Visual demonstration
  (_conceptId, visualType) =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — VISUAL DEMONSTRATION. ' +
    'Words have not worked — SHOW it instead. ' +
    (visualType
      ? `A registered visual exists: emit the VISUAL:${visualType} tag ` +
        'first, then at most two short sentences pointing at what to look at.'
      : 'No registered visual exists — build the clearest possible text ' +
        'diagram: a labelled ASCII figure, a numbered step-by-step spatial ' +
        'description ("imagine a horizontal line; on its left end..."), or ' +
        'a structured table showing the relationship.') +
    ' No new prose explanation this turn.',

  // 4 — Physical activity
  () =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — PHYSICAL ACTIVITY. ' +
    'Abstract explanations have not landed. Make the concept PHYSICAL. ' +
    'Ask the student to stand up. Give them a concrete bodily task: ' +
    '"Walk 3 steps forward — that is positive displacement. Now walk ' +
    '2 steps backward — that is negative displacement. Where are you ' +
    'now relative to where you started?" Invent an equivalent physical ' +
    'activity for the current concept using objects the student can see ' +
    'or touch (hands, fingers, steps, coins, cups of water, books on a ' +
    'table). Every instruction must be a concrete action verb: stand, ' +
    'walk, hold, point, stack, pour, fold. No abstract phrasing.',

  // 5 — Guided discovery
  () =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — GUIDED DISCOVERY. ' +
    'Do not explain the concept. Instead, lead the learner to discover ' +
    'it themselves through a sequence of 3-4 small questions, each ' +
    'building on the previous answer. Start from something they already ' +
    'know and is easy ("What happens when...?"), then guide them one ' +
    'step at a time toward the target idea. Wait for an answer after ' +
    'each question — do not answer your own questions. If a question ' +
    'is too hard, break it into a smaller one.',

  // 6 — Prerequisite remediation
  (_conceptId, _visualType, prerequisiteId) =>
    'TEACHING ACTION: CHANGE_REPRESENTATION — PREREQUISITE REMEDIATION. ' +
    'The learner cannot grasp the current concept because a prerequisite ' +
    'is missing or shaky. Step back and teach the prerequisite concept' +
    (prerequisiteId ? ` "${prerequisiteId}"` : '') +
    ' first. Give a brief, self-contained explanation of that ' +
    'prerequisite — just enough for the learner to return to the ' +
    'current concept with the foundation they need. Do not reference ' +
    'the current concept until the prerequisite is established. End ' +
    'by connecting the prerequisite back to the current topic in one ' +
    'sentence.',
]

/**
 * Build the strategy prompt block for the selected strategy index.
 *
 * Returns the full prompt block string the caller injects into the LLM
 * system prompt. Each strategy produces a structurally different
 * instruction so the LLM behaves differently — not just "try again."
 *
 * @param strategyIndex   0-6 (clamped if out of range)
 * @param conceptId       current concept, or null
 * @param availableVisualType  visual type string if one is registered, or null
 * @param prerequisiteId  prerequisite concept id for strategy 6, or null
 */
export function buildStrategyBlock(
  strategyIndex: number,
  conceptId: string | null,
  availableVisualType: string | null,
  prerequisiteId: string | null,
): string {
  try {
    const idx = Math.max(0, Math.min(STRATEGY_DIRECTIVES.length - 1, Math.floor(strategyIndex)))
    const directive = STRATEGY_DIRECTIVES[idx](conceptId, availableVisualType, prerequisiteId)
    return (
      `\n\nEXPLAIN-DIFFERENTLY STRATEGY ${idx}/${STRATEGY_DIRECTIVES.length - 1}` +
      ` [${STRATEGY_LABELS[idx]}]` +
      (conceptId ? ` — concept: ${conceptId}` : '') +
      `\n${directive}`
    )
  } catch {
    return '' // strategy block must never break a turn
  }
}

/**
 * Build a MINIMAL LLM context block (~150 tokens target) containing only
 * what the model needs to produce a single strategy-directed response.
 *
 * Used for the "minimize LLM context" requirement: when the full system
 * prompt is too large, the caller can substitute this compressed block.
 */
export function buildMinimalContext(params: {
  conceptId: string
  studentConfidence: string
  selectedStrategy: number
  teachingGoal: string
  retrievedSnippet: string
  expectedFormat: string
}): string {
  try {
    const idx = Math.max(0, Math.min(STRATEGY_LABELS.length - 1, Math.floor(params.selectedStrategy)))
    const snippet = params.retrievedSnippet.length > 200
      ? params.retrievedSnippet.slice(0, 200) + '...'
      : params.retrievedSnippet
    return [
      `CONCEPT: ${params.conceptId}`,
      `STUDENT: ${params.studentConfidence}`,
      `STRATEGY: ${STRATEGY_LABELS[idx]} — ${strategyOneLiner(idx)}`,
      `GOAL: ${params.teachingGoal}`,
      `CONTENT: ${snippet}`,
      `FORMAT: ${params.expectedFormat}`,
    ].join('\n')
  } catch {
    return `CONCEPT: ${params.conceptId}\nSTRATEGY: fallback`
  }
}

/** One-line strategy instruction for the minimal context block. */
function strategyOneLiner(idx: number): string {
  switch (idx) {
    case 0: return 'give the shortest correct explanation (1-2 sentences)'
    case 1: return 'restate using only everyday words'
    case 2: return 'use one concrete analogy from everyday life'
    case 3: return 'show it visually (diagram or spatial description)'
    case 4: return 'give a physical activity the student does with their body'
    case 5: return 'ask 3-4 small discovery questions, do not explain'
    case 6: return 'teach the missing prerequisite first'
    default: return 'explain differently'
  }
}
