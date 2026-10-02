/**
 * TURN ASSEMBLY — Phase 1, graded-answer turns (owner G2, 2026-10-02: build
 * behind a flag, run in shadow). Spec: docs/architecture/TURN_ASSEMBLY_PHASE1_SPEC.md.
 *
 * The server decides the facts and writes the verdict line, the lead-in and
 * the card. The model fills two slots only — `feedback` (why the learner's
 * option is right or wrong) and an optional `teaching` paragraph — and both are
 * validated here before anything is assembled. Pure functions; the route owns
 * the model call and the logging.
 *
 * In SHADOW mode nothing here reaches the learner: the route logs the
 * assembled text next to the reply it actually served.
 */
import { DENIES_CORRECT, statesCorrect } from '@/lib/teaching/answerConfirmation'

export type TurnAssemblyMode = 'off' | 'shadow' | 'serve'

/** `TURN_ASSEMBLY_MODE`; anything unrecognised is 'off'. */
export function turnAssemblyMode(env: Record<string, string | undefined> = process.env): TurnAssemblyMode {
  const v = (env.TURN_ASSEMBLY_MODE ?? '').trim().toLowerCase()
  return v === 'shadow' || v === 'serve' ? v : 'off'
}

/**
 * `TURN_ASSEMBLY_SHADOW_RATE` (0..1, default 1): the share of graded turns that
 * get the extra shadow call. Lets the owner cap provider spend if the global
 * AI budget (AI_GLOBAL_RPM) is tight.
 */
export function shadowSampled(env: Record<string, string | undefined> = process.env, roll = Math.random()): boolean {
  const raw = env.TURN_ASSEMBLY_SHADOW_RATE
  const rate = raw === undefined || raw.trim() === '' ? 1 : Number(raw)
  if (!Number.isFinite(rate) || rate <= 0) return false
  return roll < Math.min(1, rate)
}

/** Everything the slots are about. All of it is decided before generation. */
export interface GradedTurnFacts {
  question: string
  options: string[]
  chosenIndex: number
  correctIndex: number
  correct: boolean
  /** Authored working per option, when the probe carries it (TutorMCQ.rationales). */
  rationales?: string[]
  conceptTitle?: string | null
  /** Option texts from EARLIER cards in this session (V5). */
  earlierOptions?: string[]
}

export interface TurnSlots {
  feedback: string | null
  teaching: string | null
}

const MAX_FEEDBACK_WORDS = 80
const MIN_FEEDBACK_WORDS = 8
const MAX_TEACHING_WORDS = 120

const words = (s: string) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length

/** The system prompt for the slot call. The next card is never in it (owner G2, 2026-09-24). */
export function buildSlotSystemPrompt(f: GradedTurnFacts): string {
  const chosen = f.options[f.chosenIndex] ?? ''
  const right = f.options[f.correctIndex] ?? ''
  const why = f.rationales?.[f.correctIndex]?.trim()
  const chosenWhy = f.rationales?.[f.chosenIndex]?.trim()
  const lines = [
    'You are a patient tutor. The learner has just answered a multiple-choice question.',
    f.conceptTitle ? `Lesson topic: ${f.conceptTitle}.` : '',
    `Question: ${f.question}`,
    `Options: ${f.options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join(' | ')}`,
    `The learner chose: ${chosen}`,
    `The correct answer is: ${right}`,
    `Verdict (decided by the server, do not repeat it): ${f.correct ? 'RIGHT' : 'WRONG'}`,
    why ? `Authored explanation of the correct answer: ${why}` : '',
    !f.correct && chosenWhy ? `Authored note on the learner's choice: ${chosenWhy}` : '',
    '',
    'Return ONLY a JSON object, no markdown, with exactly these keys:',
    '{"feedback": string, "teaching": string or null}',
    `- feedback: 1 to 3 short sentences saying WHY the learner's choice is ${f.correct ? 'right' : 'wrong'}, naming the idea. Do not start with "Correct", "Right", "Not quite" or any verdict word — the server writes the verdict.`,
    '- teaching: null, or ONE short paragraph (under 80 words) that takes the lesson one small step further from this idea.',
    '- Neither field may contain a question or a question mark. Do not set a problem or list options. Do not mention any other question.',
    '- Use easy words and short sentences.',
  ]
  return lines.filter((l) => l !== '').join('\n')
}

/** V1: the model's reply as slots, or null when it is not the agreed JSON. */
export function parseSlots(raw: string | null | undefined): TurnSlots | null {
  if (typeof raw !== 'string') return null
  const clean = raw.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
  const match = clean.match(/\{[\s\S]*\}/)
  if (!match) return null
  let obj: unknown
  try {
    obj = JSON.parse(match[0])
  } catch {
    // A literal line break inside a string is invalid JSON and a common model
    // slip. Between tokens it is only whitespace, so a space is safe there too.
    try { obj = JSON.parse(match[0].replace(/\r?\n/g, ' ')) } catch { return null }
  }
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return null
  const o = obj as Record<string, unknown>
  const keys = Object.keys(o)
  if (!keys.includes('feedback') || keys.some((k) => k !== 'feedback' && k !== 'teaching')) return null
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim().replace(/\s{2,}/g, ' ') : null)
  if (o.feedback !== null && typeof o.feedback !== 'string') return null
  if (o.teaching !== undefined && o.teaching !== null && typeof o.teaching !== 'string') return null
  return { feedback: str(o.feedback), teaching: str(o.teaching) }
}

const OPTION_LINE = /(^|\n)\s*(?:[A-D][).:]|\([A-D]\))\s/
const INLINE_OPTION_RUN = /\bA\)\s.+\bB\)\s/

/** V2–V6. Empty array = valid. Codes are logged so each rate is measurable. */
export function validateSlots(s: TurnSlots, f: GradedTurnFacts): string[] {
  const codes = new Set<string>()
  const fields: Array<[string, string]> = []
  if (s.feedback) fields.push(['feedback', s.feedback])
  if (s.teaching) fields.push(['teaching', s.teaching])
  if (!s.feedback) codes.add('V4-feedback-missing')
  for (const [name, text] of fields) {
    if (text.includes('?')) codes.add(`V2-${name}-question`)
    if (OPTION_LINE.test(text) || INLINE_OPTION_RUN.test(text)) codes.add(`V3-${name}-options`)
    const lower = text.toLowerCase()
    const current = new Set(f.options.map((o) => o.trim().toLowerCase()))
    for (const o of f.earlierOptions ?? []) {
      const t = o.trim().toLowerCase()
      if (t.length >= 4 && !current.has(t) && lower.includes(t)) { codes.add(`V5-${name}-earlier-item`); break }
    }
    // V6 — a verdict word that contradicts the server's grade.
    if (f.correct && DENIES_CORRECT.test(text)) codes.add(`V6-${name}-denies-correct`)
    if (!f.correct && statesCorrect(text)) codes.add(`V6-${name}-affirms-wrong`)
  }
  if (s.feedback) {
    const n = words(s.feedback)
    if (n < MIN_FEEDBACK_WORDS || n > MAX_FEEDBACK_WORDS) codes.add('V4-feedback-length')
  }
  if (s.teaching && words(s.teaching) > MAX_TEACHING_WORDS) codes.add('V4-teaching-length')
  return [...codes]
}

/**
 * The feedback when the model's slot cannot be used: the authored working for
 * the option the learner chose (wrong) or for the key (right). Null when the
 * probe carries none — the verdict line then stands alone, with no invented why.
 */
export function fallbackFeedback(f: GradedTurnFacts): string | null {
  // WRONG: nothing. A distractor's authored continuation is part of the wrong
  // answer ("fungi are simply non-green plants"), never an explanation of it —
  // rejoined, it states the misconception as fact (shadow sample, biology,
  // 2026-10-02). The verdict line already carries the correct answer and its why.
  if (!f.correct) return null
  const i = f.correctIndex
  const r = f.rationales?.[i]?.trim()
  if (!r) return null
  // Authored rationales are the working AFTER the answer head ("— fixed
  // composition, one formula"), not sentences. MEASURED in shadow (2026-10-02,
  // chem.found.pure-substances): served bare, the fallback read as a fragment.
  // Rejoin it to its option, as the authored choice was written.
  const head = f.options[i]?.trim()
  const joined = head ? `${head} — ${r.replace(/^[—–-]\s*/, '')}` : r
  return /[.!]$/.test(joined) ? joined : `${joined}.`
}

/** Drop a slot that failed only on its own field; a failing feedback falls back. */
export function usableSlots(s: TurnSlots | null, codes: string[], f: GradedTurnFacts): { slots: TurnSlots; fallback: boolean } {
  const feedbackBad = !s || !s.feedback || codes.some((c) => c.startsWith('V1') || c.includes('-feedback-'))
  const teachingBad = !s || codes.some((c) => c.includes('-teaching-'))
  const feedback = feedbackBad ? fallbackFeedback(f) : s!.feedback
  return { slots: { feedback, teaching: teachingBad ? null : (s?.teaching ?? null) }, fallback: feedbackBad }
}

export interface AssembleInput {
  /** confirmCorrectAnswer / stateCorrectionForWrongAnswer output for this grade. */
  verdictLine: string
  slots: TurnSlots
  /** A neutral bridge for the next card, when one follows. */
  leadIn: string | null
  /** The lesson close, when this answer completes the lesson. Replaces teaching + lead-in. */
  closeText: string | null
}

export function assembleGradedTurn(a: AssembleInput): string {
  const parts = [a.verdictLine.trim()]
  // The authored correction already carries the authored why; do not repeat it.
  if (a.slots.feedback && !a.verdictLine.includes(a.slots.feedback.trim())) parts.push(a.slots.feedback.trim())
  if (a.closeText) {
    parts.push(a.closeText.trim())
  } else {
    if (a.slots.teaching) parts.push(a.slots.teaching.trim())
    if (a.leadIn) parts.push(a.leadIn.trim())
  }
  return parts.filter(Boolean).join('\n\n')
}

/**
 * V5's input: the options of the card shown BEFORE the one just graded. The
 * defect is quoting the previous item's answer (R2: "How did you arrive at
 * 2.50 dm³?" on the next item). Every earlier card was too broad — cards in one
 * lesson share the concept's vocabulary (shadow sample, biology, 2026-10-02:
 * 6 false V5 hits in 16 turns).
 */
export function previousCardOptions(contents: string[]): string[] {
  const cards = contents.map((c) => optionsFromHistory([c])).filter((o) => o.length > 0)
  return cards.length >= 2 ? cards[cards.length - 2] : []
}

/** Option texts written as "A) …" lines in earlier tutor messages. */
export function optionsFromHistory(contents: string[]): string[] {
  const out: string[] = []
  for (const c of contents) {
    for (const m of (c ?? '').matchAll(/(?:^|\n)\s*[A-D]\)\s+([^\n]+)/g)) out.push(m[1].trim())
  }
  return out
}

/** The Phase-0 checks, on any reply prose: K1 stub, K2 question beside a card. */
export function turnChecks(prose: string, cardAttached: boolean): { k1Stub: boolean; k2QuestionBesideCard: boolean } {
  return { k1Stub: words(prose ?? '') < 12, k2QuestionBesideCard: cardAttached && /\?/.test(prose ?? '') }
}

const CODE_REASON: Record<string, string> = {
  V1: 'it was not the agreed JSON object with the keys "feedback" and "teaching"',
  V2: 'it contained a question or a question mark',
  V3: 'it contained answer options',
  V4: 'the feedback was missing, too short or too long',
  V5: "it mentioned another question's answer",
  V6: "its verdict contradicted the server's grade",
}

/** The one regeneration's instruction (spec §4), naming what failed. */
export function retryInstruction(codes: string[]): string {
  const reasons = [...new Set(codes.map((c) => CODE_REASON[c.slice(0, 2)]).filter(Boolean))]
  return '\n\nYOUR PREVIOUS ANSWER WAS REJECTED because ' + (reasons.join('; ') || 'it failed validation') +
    '. Return the JSON object again, following every rule above.'
}
