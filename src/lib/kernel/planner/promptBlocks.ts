/**
 * K4 — Typed prompt-block builders.
 *
 * Every block is a PURE function from typed inputs → string. This is the
 * seam for prompt retirement (RS §13): as each block moves from ad-hoc
 * string concatenation in route.ts to a typed builder here, its
 * responsibility is DECIDED by the runtime and only RENDERED by the model.
 *
 * K4 v1 owns the small, verifier-friendly blocks:
 *   - TURN DIRECTIVE (already Phase-C/G in code; formalized here as data)
 *   - RECOVERY block (was buildRecoveryBlock; wrapped here so its trigger
 *     and rung selection live in policy, not in the route)
 *   - VOCABULARY BAN block (new — enforces V-VOC-NAME preconditions
 *     ahead of K5's verifier)
 *   - LENGTH BUDGET block
 *
 * Bigger blocks (strategy instructions, action procedure, first-lesson,
 * placement, curriculum context) migrate to typed builders over K4/K5.
 */
import type { EnginePolicyDecision, Budgets } from '../policy/types'

const PHASE_FRAME: Record<string, string> = {
  DIAGNOSE:    'DIAGNOSE — resolve where this learner actually is before teaching.',
  ANCHOR:      'ANCHOR — anchor attention on a concrete, everyday thing. No teaching payload yet.',
  DEMONSTRATE: 'DEMONSTRATE — show the idea working. Explain AFTER showing, never instead.',
  NAME:        'NAME — name the concept and its key term. One new term only.',
  FORMALIZE:   'FORMALIZE — introduce the formula anchored to the plain-words meaning.',
  GUIDED:      'GUIDED — do it WITH the learner: supported steps, fade support gradually.',
  INDEPENDENT: 'INDEPENDENT — the learner works. You watch and react. One problem at a time.',
  REFLECT:     'REFLECT — the learner self-explains. You listen.',
  ASSESS:      'ASSESS — verify the target idea landed. React contentfully to the answer.',
  TRANSFER:    'TRANSFER — apply the idea in a genuinely new context.',
  // Legacy 6-phase
  OBSERVE:     'ANCHOR — anchor attention on a concrete, everyday thing. No teaching payload yet.',
  GUIDE:       'GUIDED — do it WITH the learner: supported steps, fade support gradually.',
  CHECK:       'ASSESS — verify the target idea landed. React contentfully to the answer.',
  PRACTICE:    'INDEPENDENT — the learner works. You watch and react.',
}

const MOVE_LINE: Record<string, string> = {
  RECOVER: 'RECOVER — validate, shrink, bank ONE small win. Ask NO questions this turn.',
  ASK:     'ASK — exactly ONE question, at or below the stage ceiling. Nothing else question-shaped.',
  SHOW:    'SHOW — open with a short demonstration or worked example BEFORE anything else. Ask NO questions.',
  TEACH:   'TEACH — explain or advance the idea. Ask NO questions this turn; end with an invitation, not a question.',
  CELEBRATE: 'CELEBRATE — name a specific thing the learner just did, then continue teaching.',
  CLOSE:   'CLOSE — warm close on a win; queue the follow-up. No new content.',
  WAIT:    'WAIT — the pause is the teaching. Reply with a single warm sentence and stop.',
}

export function buildTurnDirectiveBlock(d: EnginePolicyDecision, phase: string): string {
  const lines: string[] = ['\n\nTURN DIRECTIVE (server-decided — follow exactly; overrides any earlier advisory pacing):']
  lines.push(`- Teaching phase: ${PHASE_FRAME[phase] ?? PHASE_FRAME.ANCHOR}`)
  lines.push(`- Next move: ${MOVE_LINE[d.move] ?? MOVE_LINE.TEACH}`)
  lines.push(`- Question stage ceiling: Stage ${d.stageCeiling} (see QUESTION STAGE POLICY). Never ask above it this turn.`)
  if (d.budgets.maxParagraphs !== null) {
    lines.push(`- Length budget: at most ${d.budgets.maxParagraphs} short paragraphs. If the learner is struggling, shorter is better — never longer.`)
  }
  if (d.budgets.maxNewTerms !== null) {
    lines.push(`- New-term budget: at most ${d.budgets.maxNewTerms} new technical term(s) this response.`)
  }
  if (d.visualClass) {
    lines.push(`- Visual-first: a ${d.visualClass.replace(/_/g, ' ')} teaches this faster than prose — lead with it and keep text around it minimal.`)
  }
  return lines.join('\n')
}

export function buildVocabularyBanBlock(bans: string[]): string {
  if (bans.length === 0) return ''
  return `\n\nVOCABULARY BAN (do NOT use these words or notations this turn — the learner is not ready): ${bans.map((t) => `"${t}"`).join(', ')}. If you would normally introduce one, describe the idea in plain language instead.`
}

export function buildLengthBudgetBlock(b: Budgets): string {
  if (b.maxParagraphs === null) return ''
  return `\n\nLENGTH BUDGET: keep your response to at most ${b.maxParagraphs} short paragraph(s). Fewer is fine.`
}

/** Optional: a fresh-boundary opening reminder. K4 v1 stays minimal; K5
 *  formalizes the full OPEN obligation sequence. */
export function buildOpeningReminderBlock(freshBoundary: boolean, retroWinOwed: boolean, dueReviews: number): string {
  if (!freshBoundary) return ''
  const parts = ['\n\nSESSION OPENING (fresh episode):']
  if (retroWinOwed) parts.push('- Open with an engineered small win before anything else — a previous session ended on a struggle.')
  if (dueReviews > 0) parts.push(`- Weave a brief retrieval of previously-mastered material (${dueReviews} due) BEFORE new content.`)
  parts.push('- One-breath continuity: one short warm sentence, then teaching.')
  return parts.join('\n')
}
