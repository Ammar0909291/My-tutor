/**
 * WHAT COUNTS AS A DEFECT IN ONE TUTOR TURN — checked from the outside.
 *
 * Pure. Every check reads only the reply the learner received, what the
 * synthetic student sent, and the authored answer key; nothing reads the
 * database. Each check is a defect this project has already seen in
 * production, so a finding here is something a real learner would have met.
 *
 * Severity:
 *   critical — the learner is told something false about their answer, their
 *              progress or the answer itself, or the lesson cannot move
 *   major    — the lesson degrades (repeats, ungradeable or invented
 *              questions, markup or phantom figures)
 *   minor    — worth counting, not worth blocking a topic on
 */
import { dropAnswerLeaks } from '../../../src/lib/teaching/gateAssessment'
import { claimsCompletionInProse } from '../../../src/lib/teaching/stanceEnforcement'
import { askedAnswerableQuestion } from '../../../src/lib/teaching/answerableTurn'
import type { LearnerAct } from './personas'

export type Severity = 'critical' | 'major' | 'minor'
export interface Finding { code: string; severity: Severity; turn: number; detail: string }

export interface ReplyMastery {
  phase?: string; verified?: boolean
  checkCorrect?: number; practiceCorrect?: number
  verifiedCheckCorrect?: number; verifiedPracticeCorrect?: number
}
export interface TutorReply {
  text: string
  provider: string | null
  mcq: { question: string; options: string[] } | null
  figure: boolean
  mastery: ReplyMastery | null
  lessonComplete: { complete?: boolean; fullyMastered?: boolean } | null
}
export interface TurnRecord {
  index: number
  act: LearnerAct | { kind: 'open' }
  reply: TutorReply
  /** Index of the correct option in `reply.mcq.options`, when the corpus knows it. */
  replyKeyCorrectIndex: number | null
}

const GATE_PHASES = new Set(['CHECK', 'PRACTICE'])
const PHASE_ORDER = ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']
const rank = (phase: string | null | undefined) => (phase ? PHASE_ORDER.indexOf(phase) : -1)
/** The learner asked to be given a question. */
export const ASKS_FOR_QUESTION_RE = /\b(?:test|quiz|check) me\b|\b(?:give|ask) me (?:a |an |another |one |some )?(?:question|problem)|\bnext question\b|\bquestion please\b/i
const ANNOUNCED_CHECK_RE = /\bquick check\b|\blet'?s (?:do a |jump right in with a |try a )?(?:quick )?(?:check|question)\b|\bhere(?: is|'s) (?:your next|a quick|a|the next) question\b/i
// "Whenever you're ready, let me know and we can try a quick check" offers a
// check; it does not announce one (after-run 2, beginner, velocity).
const CHECK_OFFER_LEAD_RE = /\b(?:whenever|when|if) you(?:'|’)?re ready\b|\blet me know\b|\bif you(?:'d| would) like\b/i

/** An announced check with no question after it — an offer, or an announcement
 *  followed by a question the model wrote itself, is not this defect. */
function announcedButNotAsked(text: string): string | null {
  const m = ANNOUNCED_CHECK_RE.exec(text)
  if (!m) return null
  const sentenceStart = Math.max(text.lastIndexOf('\n', m.index), ...['.', '!', '?'].map((c) => text.lastIndexOf(c, m.index - 1)))
  if (CHECK_OFFER_LEAD_RE.test(text.slice(sentenceStart + 1, m.index))) return null
  if (/\?/.test(text.slice(m.index))) return null
  return m[0]
}
const EMPTY_OPENER_RE = /^(?:i hear you|got it|okay|ok|sure|alright|let's keep)\b/i
const normText = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const firstSentence = (s: string) => (s.trim().split(/(?<=[.!?])\s+|\n/)[0] ?? '').trim()
const verifiedTotal = (m: ReplyMastery | null) => (m?.verifiedCheckCorrect ?? 0) + (m?.verifiedPracticeCorrect ?? 0)

const PRAISE_RE = /^\W*(?:that'?s (?:right|correct|it)\b|correct\b|exactly\b|yes\b|well done|great (?:job|work)|nice (?:work|job)|spot on|perfect\b|good job)/i
const CORRECTION_RE = /^\W*(?:not quite|that'?s not (?:quite |exactly )?(?:right|correct)|(?:that|this) isn'?t (?:quite )?(?:right|correct)|incorrect\b|no[,.!]\s|close,? but|unfortunately)/i
const FIGURE_CLAIM_RE = /\b(?:in|on|from) the (?:diagram|figure|picture|animation|simulation|graph)\b|\b(?:diagram|figure|picture|animation|simulation) (?:above|below|shows|on (?:your|the) screen)\b/i
const TEXT_DEFECTS: Array<[string, RegExp, Severity]> = [
  ['content-free-hold', /^Let's stay with this idea for a moment\.?$/m, 'major'],
  ['machine-tag-leak', /<!--|\[(?:MCQ|SIGNAL|VISUAL|HINT|ASSESSMENT_RESULT)[:\]\s]/, 'major'],
  ['ascii-art', /-{3,}\[|\[[A-Za-z ]+\]-{2,}|```[\s\S]*?(\+-{3,}|\|[- ]{3,}\|)/, 'major'],
  ['options-promised', /\b(?:pick|choose) (?:the best|an?) (?:answer|option)\b|which option you choose/i, 'major'],
]

/** Findings for one turn. `history` holds every earlier turn of the same lesson. */
export function checkTurn(cur: TurnRecord, history: readonly TurnRecord[], opts: { conceptTitle?: string | null } = {}): Finding[] {
  const out: Finding[] = []
  const f = (code: string, severity: Severity, detail: string) => out.push({ code, severity, turn: cur.index, detail: detail.slice(0, 240) })
  const prev = history.length ? history[history.length - 1] : null
  const text = cur.reply.text ?? ''
  const phaseBefore = prev?.reply.mastery?.phase ?? null

  // ── the verdict on the learner's answer ────────────────────────────────────
  if (cur.act.kind === 'answer' && cur.act.intendedCorrect !== null) {
    const opening = firstSentence(text)
    if (!cur.act.intendedCorrect && PRAISE_RE.test(opening)) f('false-praise', 'critical', `wrong answer "${cur.act.message}" met with: ${opening}`)
    if (cur.act.intendedCorrect && CORRECTION_RE.test(opening)) f('false-correction', 'critical', `right answer "${cur.act.message}" met with: ${opening}`)
    // A right answer to an authored question at a counting phase must move a verified counter.
    if (cur.act.intendedCorrect && phaseBefore && GATE_PHASES.has(phaseBefore)
      && verifiedTotal(cur.reply.mastery) <= verifiedTotal(prev?.reply.mastery ?? null)) {
      f('correct-not-credited', 'major', `right answer "${cur.act.message}" at ${phaseBefore}; verified ${verifiedTotal(prev?.reply.mastery ?? null)} -> ${verifiedTotal(cur.reply.mastery)}`)
    }
  }

  // ── the lesson's direction ────────────────────────────────────────────────
  // Moving DOWN the ladder is the tutor's response to a wrong answer or to
  // distress. After a right answer, or when the learner asked for a question,
  // it is a demotion the learner did nothing to earn (smoke run, 2026-09-24:
  // three right answers, then "give me a question" x6 took CHECK -> DEMONSTRATE).
  const askedForQuestion = cur.act.kind === 'say' && ASKS_FOR_QUESTION_RE.test(cur.act.message)
  const answeredRight = cur.act.kind === 'answer' && cur.act.intendedCorrect === true
  if ((askedForQuestion || answeredRight) && rank(cur.reply.mastery?.phase) >= 0 && rank(cur.reply.mastery?.phase) < rank(phaseBefore)) {
    f('demoted-without-wrong-answer', 'critical', `${phaseBefore} -> ${cur.reply.mastery?.phase} after "${cur.act.kind === 'open' ? '' : cur.act.message}"`)
  }
  // The first message is exempt: teaching before the first question is by design.
  if (askedForQuestion && !cur.reply.mcq && cur.index > 1) f('question-request-ignored', 'major', `"${cur.act.kind === 'say' ? cur.act.message : ''}" -> no question`)
  const announced = cur.reply.mcq ? null : announcedButNotAsked(text)
  if (announced) f('announced-not-asked', 'major', announced)
  if (cur.act.kind === 'answer' && /^here(?: is|'s) your next question\.?$/i.test(firstSentence(text))) {
    f('no-feedback-on-answer', 'major', `answer "${cur.act.message}" met with: ${firstSentence(text)}`)
  }
  if (!cur.reply.mcq && !cur.reply.figure && text.trim().length > 0 && text.trim().length < 80 && EMPTY_OPENER_RE.test(text.trim()) && !/\?\s*$/.test(text.trim())) {
    f('content-free-reply', 'major', text.trim())
  }

  // ── the question served this turn ──────────────────────────────────────────
  const q = cur.reply.mcq
  if (q && cur.replyKeyCorrectIndex !== null) {
    const leak = dropAnswerLeaks(text, { question: q.question, options: q.options, correctIndex: cur.replyKeyCorrectIndex }, opts.conceptTitle ?? null)
    if (leak.dropped.length > 0) f('answer-leak', 'critical', `answer "${q.options[cur.replyKeyCorrectIndex]}" stated before the question: ${leak.dropped[0]}`)
  }
  if (q && cur.replyKeyCorrectIndex === null && phaseBefore && GATE_PHASES.has(phaseBefore)) {
    f('invented-question-at-gate', 'major', `unauthored question at ${phaseBefore}: ${q.question}`)
  }
  if (q) {
    const key = normText(q.question)
    const earlier = history.filter((t) => t.reply.mcq && normText(t.reply.mcq.question) === key)
    // One re-ask of a missed question is allowed (owner-approved); a third
    // showing, or re-showing one answered right, is a repeat.
    const answeredRight = history.some((t) => t.act.kind === 'answer' && normText(t.act.question) === key && t.act.intendedCorrect === true)
    if (earlier.length >= 2 || (earlier.length >= 1 && answeredRight)) f('repeated-question', 'major', q.question)
  }
  // The production detector, not "ends in ?": "…let's do 2 practice questions
  // together — ready?" and "…have I got that right?" ask nothing gradeable
  // (readiness run 2026-09-25, Newton's 2nd/3rd law).
  if (!q && cur.reply.mastery?.phase && GATE_PHASES.has(cur.reply.mastery.phase) && /\?\s*$/.test(text.trim()) && askedAnswerableQuestion(text)) {
    f('ungradeable-question', 'minor', `question asked in prose at ${cur.reply.mastery.phase}: ${text.trim().slice(-120)}`)
  }

  // ── the text itself ────────────────────────────────────────────────────────
  if (cur.reply.provider === 'degraded' || (!text.trim() && !q)) f('degraded-turn', 'major', `provider=${cur.reply.provider}`)
  const norm = normText(text)
  if (norm.length > 80 && history.some((t) => normText(t.reply.text ?? '') === norm)) f('repeated-reply', 'major', text.slice(0, 120))
  for (const [code, re, sev] of TEXT_DEFECTS) if (re.test(text)) f(code, sev, text.match(re)?.[0] ?? code)
  const figureSoFar = cur.reply.figure || history.some((t) => t.reply.figure)
  if (!figureSoFar && FIGURE_CLAIM_RE.test(text)) f('phantom-figure', 'major', text.match(FIGURE_CLAIM_RE)?.[0] ?? '')

  // ── progress claims ────────────────────────────────────────────────────────
  const verified = cur.reply.mastery?.verified === true
  if (cur.reply.lessonComplete?.fullyMastered === true && !verified) f('false-completion', 'critical', 'fullyMastered while mastery.verified is false')
  if (!verified && claimsCompletionInProse(text)) f('false-completion-claim', 'critical', firstSentence(text))
  // Closing a lesson "for another look later" on a learner who never answered
  // wrong is a verdict the evidence does not support.
  if (cur.reply.lessonComplete?.complete && !verified) {
    const answers = [...history, cur].flatMap((t) => (t.act.kind === 'answer' ? [t.act] : []))
    // An unkeyed answer (the student guessed at a question the model wrote
    // itself) may have been graded wrong by the model's own key, so "none
    // wrong" cannot be claimed (tension/friction run, 2026-09-25).
    if (answers.some((a) => a.intendedCorrect === true) && !answers.some((a) => a.intendedCorrect === false || a.intendedCorrect === null)) {
      f('unfair-close', 'critical', `closed unmastered after ${answers.length} answer(s), none wrong: ${firstSentence(text)}`)
    }
  }
  return out
}

/** A lesson that stops moving: this many turns in a row with no question, no phase change and no credit. */
export const STUCK_AFTER_TURNS = 6

export function checkLesson(turns: readonly TurnRecord[]): Finding[] {
  const out: Finding[] = []
  let run = 0
  for (let i = 1; i < turns.length; i++) {
    const a = turns[i - 1].reply, b = turns[i].reply
    const moved = Boolean(b.mcq) || a.mastery?.phase !== b.mastery?.phase || verifiedTotal(b.mastery) !== verifiedTotal(a.mastery)
    run = moved ? 0 : run + 1
    if (run === STUCK_AFTER_TURNS) {
      out.push({ code: 'stuck', severity: 'critical', turn: turns[i].index, detail: `${STUCK_AFTER_TURNS} turns with no question, no phase change and no credit (phase ${b.mastery?.phase ?? '?'})` })
    }
  }
  return out
}

export function reachedMastery(m: ReplyMastery | null): boolean {
  return m?.verified === true || ((m?.verifiedCheckCorrect ?? 0) >= 1 && (m?.verifiedPracticeCorrect ?? 0) >= 2)
}
