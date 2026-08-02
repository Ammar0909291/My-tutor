/**
 * PRODUCTION INCIDENT 2026-08-02T17:27:45Z — a recovery-shaped utterance
 * re-opened a CLOSED lesson.
 *
 * Runtime evidence, one session, chemistry lesson:1:
 *
 *   17:26:13  CUE decision={"decision":"SERVE_LESSON_COMPLETE",
 *                           "ruleId":"D0a-LESSON-ALREADY-COMPLETE"}
 *             RESPONSE provider=deterministic reason=lesson_already_complete
 *   17:27:11  (identical — the gate was holding)
 *   17:27:45  CUE decision={"decision":"ESCALATE_TO_LLM",
 *                           "ruleId":"D0-RECOVERY-PREEMPT"}
 *             CUE dispatch={"executor":"LLM_OPEN"}
 *             RESPONSE provider=gemini resolvedConceptId=chem.found.matter
 *                      chars=814
 *
 * The SAME understanding snapshot on the 17:27:45 turn carried
 * lessonCompleted:{"value":true}. The completion gate was correct; a rule
 * ORDERED ABOVE it took the turn.
 *
 * This is NOT the previously-fixed completion-ordering bug: that one was about
 * the turn that FINALISES a lesson. Here the lesson was already CLOSED, the
 * gate was true, and two deterministic closes had already been served — then a
 * later turn escalated to an OPEN llm turn that carried no lesson-complete
 * constraint, and the tutor taught the finished concept again.
 *
 * Scope: this file covers ONLY the D0/D-0a precedence. Lesson identity,
 * transition and completion-finality coverage live in their own suites and are
 * untouched.
 */
import { describe, it, expect } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'
import { planDispatch } from '@/lib/understanding/dispatcher'

function decide(overrides: Partial<UnderstandingInputs> = {}): TeachingDecision {
  return decideTeaching(understandStudentTurn({ message: 'ok', ...overrides } as UnderstandingInputs))
}

/** The recovery utterances the runtime's own guard recognises. */
const RECOVERY_KEYS = ['i_am_stupid', 'i_dont_understand', 'i_am_scared', 'i_give_up'] as const

describe('a closed lesson cannot be re-opened by a recovery utterance', () => {
  it('reproduces the incident turn: recovery + lessonCompleted -> deterministic close', () => {
    const d = decide({
      lessonCompleted: true,
      recoveryKey: 'i_dont_understand',
      message: "I don't understand, explain differently",
    })
    expect(d.decision).toBe('SERVE_LESSON_COMPLETE')
    expect(d.ruleId).toBe('D0a-LESSON-ALREADY-COMPLETE')
    // The defect signature: never ESCALATE_TO_LLM / LLM_OPEN on a closed lesson.
    expect(d.decision).not.toBe('ESCALATE_TO_LLM')
  })

  it('holds for every recovery utterance the guard recognises', () => {
    for (const key of RECOVERY_KEYS) {
      const d = decide({ lessonCompleted: true, recoveryKey: key, message: 'help' })
      expect(d.decision, `recoveryKey=${key}`).toBe('SERVE_LESSON_COMPLETE')
    }
  })

  it('holds for expressed distress with no recovery key', () => {
    const d = decide({ lessonCompleted: true, message: 'I feel stupid and I hate this' })
    expect(d.decision).toBe('SERVE_LESSON_COMPLETE')
  })

  it('is stable across repeated post-completion recovery turns', () => {
    // The incident showed two correct closes and then a regression on the
    // third turn. Repetition must not change the answer.
    for (let i = 0; i < 6; i++) {
      const d = decide({ lessonCompleted: true, recoveryKey: 'i_dont_understand', message: 'still lost' })
      expect(d.decision, `turn ${i + 1}`).toBe('SERVE_LESSON_COMPLETE')
    }
  })

  it('the closed-lesson decision never routes to a model', () => {
    const d = decide({ lessonCompleted: true, recoveryKey: 'i_am_stupid', message: 'I feel stupid' })
    const plan = planDispatch(d, { assembledAvailable: false })
    expect(plan.executor).toBe('LESSON_COMPLETE')
    expect(plan.groqRequired).toBe(false) // no provider call at all
  })
})

describe('the affect band is narrowed ONLY for a closed lesson', () => {
  it('recovery still preempts everything during an ACTIVE lesson', () => {
    for (const key of RECOVERY_KEYS) {
      const d = decide({ lessonCompleted: false, recoveryKey: key, message: 'help' })
      expect(d.decision, `recoveryKey=${key}`).toBe('ESCALATE_TO_LLM')
      expect(d.ruleId).toBe('D0-RECOVERY-PREEMPT')
    }
  })

  it('recovery still preempts when completion is simply unknown', () => {
    const d = decide({ recoveryKey: 'i_am_stupid', message: 'I feel stupid' })
    expect(d.ruleId).toBe('D0-RECOVERY-PREEMPT')
  })

  it('recovery becomes reachable again as soon as the next lesson opens', () => {
    const closed = decide({ lessonCompleted: true, recoveryKey: 'i_am_stupid', message: 'I feel stupid' })
    const reopened = decide({ lessonCompleted: false, recoveryKey: 'i_am_stupid', message: 'I feel stupid' })
    expect(closed.ruleId).toBe('D0a-LESSON-ALREADY-COMPLETE')
    expect(reopened.ruleId).toBe('D0-RECOVERY-PREEMPT')
  })

  it('a non-recovery turn on an ACTIVE lesson is completely unaffected', () => {
    const withFlag = decide({ lessonCompleted: false, sessionFailureCount: 2 })
    const without = decide({ sessionFailureCount: 2 })
    expect(withFlag.decision).toBe(without.decision)
    expect(withFlag.ruleId).toBe(without.ruleId)
  })
})
