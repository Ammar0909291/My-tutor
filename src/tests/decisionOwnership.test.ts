/**
 * ONE READING OF THE TURN, CONSUMED — NOT RE-DERIVED. (Phase 3.)
 *
 * ── WHAT THE PHASE 3 AUDIT ACTUALLY FOUND ───────────────────────────────────
 * The runtime's educational decisions are already single-owner PER CONCERN:
 *
 *   learner intent      turnIntent.readTurnIntent        (Phase 1)
 *   teaching context    excursion.decideExcursion        (Phase 2)
 *   attribution         excursion.turnCountsForLesson
 *   completion          masteryGate.gateLessonCompletion (server-side; the
 *                       model's [LESSON_COMPLETE] tag is STRIPPED, not obeyed)
 *   teaching action     understanding/decisionEngine.decideTeaching, routed by
 *                       dispatcher.planDispatch, with the legacy Teaching
 *                       Engine's prompt block suppressed by
 *                       legacyDecisionBlocksSuppressed()
 *
 * That is a coherent architecture, and it is deliberately NOT one object — a
 * single "EducationalDecision" god object would merge concerns that are
 * genuinely different truths (evidence is not intent; visual selection is not
 * visual rendering; provider output is not educational state).
 *
 * ONE component broke the pattern. `readConversation` (the CUE's conversation
 * reader) CONSUMED `recoveryKey` — correctly, because the route already
 * computed it — while RE-DERIVING two other readings of the same message from
 * the raw text: `isGenuineQuestion()` and `detectLearnerRequest()`. Its own
 * comment acknowledged the risk and mitigated it by convention ("kept
 * identical ... so the two cannot silently drift"), enforced by nothing.
 *
 * ── WHY CONVENTION STOPPED BEING ENOUGH AT PHASE 2 ──────────────────────────
 * While `turnIntent` was a pure hoist, calling the same detector twice gave a
 * value identical in both VALUE and MEANING. Phase 2 ended that: `turnIntent`
 * now carries `ambiguous`, a property of the whole turn that no single
 * detector can see and that governs whether the turn may change the teaching
 * context. A reader that re-derives from raw text is reading a turn the rest
 * of the runtime has already interpreted, and cannot be told so.
 *
 * ── WHAT THESE TESTS PROVE ──────────────────────────────────────────────────
 * OWNERSHIP, not line coverage. The values are identical today, so a test that
 * merely checks the output would pass before and after and prove nothing. Each
 * test below supplies a reading that CONTRADICTS what the raw message would
 * produce, and asserts the supplied one wins — which is only possible if the
 * value is genuinely consumed.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { readConversation, isGenuineQuestion } from '@/lib/understanding/readers/conversationReader'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

const base = {
  message: '',
  history: [] as Array<{ role: 'user' | 'assistant'; content: string }>,
  recoveryKey: null,
  lastSignal: null,
  episode: null,
  freshBoundary: false,
  firstLessonActive: false,
  consecutivePriorKnowledgeProbes: 0,
}

const src = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

describe('Phase 3 — the CUE consumes the authoritative reading', () => {
  it('A — a supplied isQuestion OUTRANKS what the raw message would say', () => {
    // The raw message is unmistakably a question; the caller says it is not.
    const m = 'why does light bend?'
    expect(isGenuineQuestion(m)).toBe(true)
    const out = readConversation({ ...base, message: m, isQuestion: false })
    expect(out.conversationSummary.currentMessageIsQuestion).toBe(false)
    // And the intent ladder must follow the consumed value, not the text.
    expect(out.studentIntent.value).not.toBe('asking_question')
  })

  it('B — and in the other direction, so this is consumption, not suppression', () => {
    const m = 'the answer is twelve'
    expect(isGenuineQuestion(m)).toBe(false)
    const out = readConversation({ ...base, message: m, isQuestion: true })
    expect(out.conversationSummary.currentMessageIsQuestion).toBe(true)
    expect(out.studentIntent.value).toBe('asking_question')
  })

  it('C — a supplied helpRequestKind OUTRANKS the raw message', () => {
    const m = 'show me a diagram'
    expect(detectLearnerRequest(m)).not.toBeNull()
    const out = readConversation({ ...base, message: m, helpRequestKind: null })
    expect(out.conversationSummary.helpRequestKind).toBeNull()
    expect(out.studentIntent.value).not.toBe('requesting_help')
  })

  it('D — and in the other direction', () => {
    const m = 'twelve'
    expect(detectLearnerRequest(m)).toBeNull()
    const out = readConversation({ ...base, message: m, helpRequestKind: 'diagram' })
    expect(out.conversationSummary.helpRequestKind).toBe('diagram')
    expect(out.studentIntent.value).toBe('requesting_help')
  })

  it('E — omitting both is EXACTLY the previous behaviour (back-compat)', () => {
    for (const m of [
      'why does light bend?', 'show me a diagram', 'the answer is twelve',
      'explain it differently', '', 'ok',
    ]) {
      const out = readConversation({ ...base, message: m })
      expect(out.conversationSummary.currentMessageIsQuestion, m).toBe(isGenuineQuestion(m))
      expect(out.conversationSummary.helpRequestKind, m).toBe(detectLearnerRequest(m))
    }
  })

  it('F — what the route supplies is what turnIntent read, for real messages', () => {
    for (const m of ['why does light bend?', 'show me a diagram', 'twelve', 'I am lost']) {
      const ti = readTurnIntent(m, null)
      const out = readConversation({
        ...base, message: m, isQuestion: ti.isQuestion, helpRequestKind: ti.learnerRequest,
      })
      expect(out.conversationSummary.currentMessageIsQuestion, m).toBe(ti.isQuestion)
      expect(out.conversationSummary.helpRequestKind, m).toBe(ti.learnerRequest)
    }
  })

  it('G — recoveryKey still outranks everything (unchanged ladder priority)', () => {
    const out = readConversation({
      ...base, message: 'show me a diagram', recoveryKey: 'confused',
      isQuestion: true, helpRequestKind: 'diagram',
    })
    expect(out.studentIntent.value).toBe('expressing_distress')
  })
})

describe('Phase 3 — the wiring exists (structural, not behavioural)', () => {
  const reader = src('src/lib/understanding/readers/conversationReader.ts')
  const index = src('src/lib/understanding/index.ts')
  const route = src('src/app/api/learn/chat/route.ts')

  it('H — the reader no longer re-derives either value unconditionally', () => {
    expect(reader).toContain('input.isQuestion ?? isGenuineQuestion(trimmed)')
    expect(reader).toContain('input.helpRequestKind !== undefined')
    // The ONLY remaining detectLearnerRequest call is the documented fallback.
    const calls = reader.match(/detectLearnerRequest\(message\)/g) ?? []
    expect(calls.length).toBe(1)
  })

  it('I — understandStudentTurn forwards both to the reader', () => {
    expect(index).toContain('isQuestion: inputs.isQuestion')
    expect(index).toContain('helpRequestKind: inputs.helpRequestKind')
  })

  it('J — the route supplies them FROM turnIntent, not from a second read', () => {
    expect(route).toContain('isQuestion: turnIntent.isQuestion')
    expect(route).toContain('helpRequestKind: turnIntent.learnerRequest')
    // No component outside turnIntent.ts may call these on the raw message.
    // (conversationReader's single documented fallback is the one exception.)
    expect(route).not.toMatch(/isGenuineQuestion\(message\)/)
    expect(route).not.toMatch(/detectLearnerRequest\(message\)/)
  })

  it('K — Phase 1 and Phase 2 boundaries are still the only readers', () => {
    const turnIntent = src('src/lib/teaching/turnIntent.ts')
    expect(turnIntent).toContain('isGenuineQuestion(message)')
    expect(turnIntent).toContain('detectLearnerRequest(message)')
    // Phase 2's guard is untouched by this phase.
    expect(src('src/lib/teaching/excursion.ts')).toContain('if (input.ambiguous)')
  })
})
