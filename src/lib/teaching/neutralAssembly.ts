/**
 * TURN ASSEMBLY for a tap on a MODEL-WRITTEN card (no authored key).
 *
 * MEASURED since serve (2026-10-03): 2 graded taps in mathematics got only
 * "Here is your next question." / "Quick check. Think it through before you
 * choose." Their cards matched 0 authored probes, so the graded assembler
 * (authored keys only) never ran, and the unauthored-key repair stripped the
 * model's opening verdict — deliberately: an invented key can be wrong
 * (inventedProbeGuard.ts, phys.mech.friction), so the server must not assert
 * it. What was left was a stub.
 *
 * This keeps that rule and still gives the learner a reason. One slot call,
 * the same call site and JSON shape as the graded assembler, asks only for the
 * idea the question tests. Validation rejects any verdict word (N1) and any
 * option text (N2): naming an option would assert the unverified key by
 * another route. The turn is then the reason, plus the neutral lead-in when a
 * card follows. Nothing here grades; grading and evidence are untouched.
 */
import { type TurnSlots, validateSlots } from './turnAssembly'

export interface NeutralTurnFacts {
  question: string
  options: string[]
  chosenIndex: number
  conceptTitle?: string | null
}

export function buildNeutralSlotSystemPrompt(f: NeutralTurnFacts): string {
  const lines = [
    'You are a patient tutor. The learner has just answered a multiple-choice question.',
    'Nobody has checked the answer key, so you must not judge the answer.',
    f.conceptTitle ? `Lesson topic: ${f.conceptTitle}.` : '',
    `Question: ${f.question}`,
    `The learner chose: ${f.options[f.chosenIndex] ?? ''}`,
    '',
    'Return ONLY a JSON object, no markdown, with exactly these keys:',
    '{"feedback": string, "teaching": null}',
    '- feedback: 2 or 3 short sentences explaining the idea this question tests, so the learner can check their own reasoning.',
    '- Do not say whether the learner is right or wrong. Do not use the words correct, right, wrong, incorrect, exactly, or "not quite".',
    '- Do not quote, name or point to any of the answer options, and do not say which one is the answer.',
    '- No question and no question mark. Do not set a problem or list options.',
    '- Use easy words and short sentences.',
  ]
  return lines.filter((l) => l !== '').join('\n')
}

// "right" only as a verdict: not "right angle", "right-hand rule", "right side".
const VERDICT = /\b(correct(?:ly)?|incorrect|right(?![-\s](?:angle|angled|hand|handed|side|triangle|half|end))|wrong|exactly|not quite|well done|spot on|good job|great job|nice work)\b/i

/** The graded rules that apply (V1–V4), plus N1 (verdict) and N2 (names an option). */
export function validateNeutralSlots(s: TurnSlots, f: NeutralTurnFacts): string[] {
  const codes = new Set(
    validateSlots(s, { question: f.question, options: f.options, chosenIndex: f.chosenIndex, correctIndex: f.chosenIndex, correct: true })
      .filter((c) => !c.startsWith('V6')),
  )
  for (const [name, text] of [['feedback', s.feedback], ['teaching', s.teaching]] as const) {
    if (!text) continue
    const plain = text.replace(/[‘’]/g, "'")
    if (VERDICT.test(plain)) codes.add(`N1-${name}-verdict`)
    const lower = plain.toLowerCase()
    if (f.options.some((o) => o.trim().length >= 4 && lower.includes(o.trim().toLowerCase()))) codes.add(`N2-${name}-names-option`)
  }
  return [...codes]
}

export function assembleNeutralTurn(a: { feedback: string; leadIn: string | null }): string {
  return [a.feedback.trim(), a.leadIn?.trim() ?? ''].filter(Boolean).join('\n\n')
}

/**
 * Whether the neutral turn replaces the live reply. Only a stub is replaced
 * (K1: under 12 words — production: "Here is your next question.", the gate
 * contract's fallback lead-in after the model's own option list was cut); any
 * other live reply is the model's teaching, already stripped of its verdict.
 */
export function neutralServeDecision(a: {
  mode: 'off' | 'shadow' | 'serve'
  liveText: string
  cardOnScreen: boolean
  codes: string[]
  feedback: string | null
  leadIn: string | null
}): { assembled: string | null; liveStub: boolean; serve: boolean } {
  const words = (t: string) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
  const liveStub = words(a.liveText ?? '') < 12
  const assembled = a.codes.length === 0 && a.feedback ? assembleNeutralTurn({ feedback: a.feedback, leadIn: a.leadIn }) : null
  const serve = a.mode === 'serve' && liveStub && assembled !== null && words(assembled) >= 12
  return { assembled, liveStub, serve }
}
