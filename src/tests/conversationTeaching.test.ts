/**
 * Phase H (2026-07-14): automated conversation tests for the teaching-
 * quality runtime — the conversation state machine (Phases C–G), the
 * recovery guard escalation (P2), autonomy detection (P3), and the base
 * prompt laws (Phase A). Each scenario simulates the deterministic parts
 * of a real conversation and asserts the invariants the runtime must
 * enforce regardless of what the LLM would prefer to do.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  readConversationState,
  advanceConversationState,
  decideNextMove,
  responseBudget,
  repliesWithQuestion,
  detectAutonomyRequest,
  buildAutonomyBlock,
  buildTurnDirective,
  decideVisualFirst,
  PHASE_MAX_QUESTION_STAGE,
  PHASE_ORDER,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { detectFailureState, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

// ── helpers ───────────────────────────────────────────────────────────────────

/** Fold a sequence of turns into the state machine. */
function playTurns(
  start: ConversationState,
  turns: Array<{ asked: boolean; correct: boolean | null; recovery?: boolean }>,
): ConversationState {
  return turns.reduce(
    (s, t) => advanceConversationState(s, {
      askedQuestion: t.asked,
      signalCorrect: t.correct,
      recoveryFired: t.recovery ?? false,
    }),
    start,
  )
}

// ── Scenario 1: absolute beginner ─────────────────────────────────────────────

describe('scenario 1 — absolute beginner', () => {
  it('starts in OBSERVE with a Stage-2 question ceiling (no early calculation)', () => {
    const s = initialConversationState('phys.meas.units')
    expect(s.phase).toBe('OBSERVE')
    expect(PHASE_MAX_QUESTION_STAGE[s.phase]).toBeLessThanOrEqual(2)
  })

  it('never allows a calculation question (Stage 6) before PRACTICE', () => {
    for (const phase of PHASE_ORDER) {
      if (phase === 'PRACTICE' || phase === 'TRANSFER') continue
      expect(PHASE_MAX_QUESTION_STAGE[phase]).toBeLessThan(6)
    }
  })

  it('beginner response budget is 2–5 short paragraphs', () => {
    const fresh = responseBudget('beginner', 0)
    const struggling = responseBudget('beginner', 2)
    expect(fresh).toBeGreaterThanOrEqual(2)
    expect(fresh).toBeLessThanOrEqual(5)
    // Struggle makes responses SHORTER, not longer.
    expect(struggling!).toBeLessThan(fresh!)
  })

  it('reaching calculation-legal PRACTICE requires the full evidence ladder', () => {
    let s = initialConversationState('c')
    // success at OBSERVE → DEMONSTRATE (recognition evidence)
    s = playTurns(s, [{ asked: true, correct: true }])
    expect(s.phase).toBe('DEMONSTRATE')
    // teacher demonstrates (no-question turn), learner succeeds → GUIDE
    s = playTurns(s, [{ asked: false, correct: true }])
    expect(s.phase).toBe('GUIDE')
    expect(s.demonstrated).toBe(true)
    // supported step succeeds → CHECK, then check succeeds → PRACTICE
    s = playTurns(s, [{ asked: true, correct: true }, { asked: true, correct: true }])
    expect(s.phase).toBe('PRACTICE')
    expect(PHASE_MAX_QUESTION_STAGE[s.phase]).toBe(6)
  })
})

// ── Scenario 2: "I know nothing" ──────────────────────────────────────────────

describe('scenario 2 — "I know nothing"', () => {
  it.each([
    'I know nothing about physics at all',
    'I know absolutely nothing',
    'I know nothing',
    'I have no idea',
    'no clue',
    'How would I know?',
  ])('detects failure state for %j', (msg) => {
    expect(detectFailureState(msg)).not.toBeNull()
  })
})

// ── Scenario 3: "I don't know" ────────────────────────────────────────────────

describe('scenario 3 — "I don\'t know"', () => {
  it('detects dont_know and forces a TEACH move (no counter-question)', () => {
    expect(detectFailureState("I don't know")).toBe('dont_know')
    const s = initialConversationState('c')
    const move = decideNextMove(s, { recoveryTurn: true, workedExampleFirst: false })
    expect(move).toBe('teach')
  })

  it('recovery turns count as failures and hold/drop the phase', () => {
    let s = initialConversationState('c')
    s = playTurns(s, [{ asked: true, correct: true }])       // → DEMONSTRATE
    s = playTurns(s, [{ asked: false, correct: null, recovery: true }])
    expect(s.consecutiveFailures).toBe(1)
    // The recovery script is itself a give (demonstrated=true), so the
    // floor is DEMONSTRATE — re-show, never further back than that.
    expect(s.phase).toBe('DEMONSTRATE')
    // A failure from CHECK drops back to GUIDE territory, never forward.
    let c = { ...initialConversationState('c'), phase: 'CHECK' as const, demonstrated: true }
    c = playTurns(c, [{ asked: true, correct: false }])
    expect(c.phase).toBe('GUIDE')
  })
})

// ── Scenario 4: "Really confusing" ────────────────────────────────────────────

describe('scenario 4 — "Really confusing"', () => {
  it('detects the confused state', () => {
    expect(detectFailureState('Really confusing')).toBe('confused')
    expect(detectFailureState('this is confusing')).toBe('confused')
  })
})

// ── Scenario 5: "Next topic" ──────────────────────────────────────────────────

describe('scenario 5 — learner autonomy', () => {
  it.each(['next topic', 'next lesson please', "let's move on", 'can we move on', 'skip this'])(
    'detects autonomy request %j', (msg) => {
      expect(detectAutonomyRequest(msg)).toBe(true)
    },
  )
  it('does not fire on ordinary answers', () => {
    expect(detectAutonomyRequest('the next number is 12')).toBe(false)
  })
  it('the autonomy block advances the lesson', () => {
    expect(buildAutonomyBlock()).toContain('[LESSON_COMPLETE]')
  })
})

// ── Scenario 6: student refuses to answer ─────────────────────────────────────

describe('scenario 6 — refusal / silence', () => {
  it('after two unanswered questions the server stops asking', () => {
    let s = initialConversationState('c')
    // two assistant question turns, learner never produces a signal
    s = playTurns(s, [
      { asked: true, correct: null },
      { asked: true, correct: null },
    ])
    expect(s.questionsAskedSinceTeach).toBe(2)
    const move = decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })
    expect(move).not.toBe('ask')
  })

  it('a teach turn resets the question counter', () => {
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: true, correct: null },
      { asked: true, correct: null },
      { asked: false, correct: null },
    ])
    expect(s.questionsAskedSinceTeach).toBe(0)
  })
})

// ── Scenario 7: student cannot calculate ──────────────────────────────────────

describe('scenario 7 — cannot calculate', () => {
  it('detects the stated inability', () => {
    expect(detectFailureState("I can't do this")).toBe('cant')
    expect(detectFailureState("I just can't do maths")).toBe('cant')
  })

  it('repeated failure keeps the stage ceiling below calculation', () => {
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: true, correct: false },
      { asked: true, correct: false },
    ])
    expect(PHASE_MAX_QUESTION_STAGE[s.phase]).toBeLessThan(6)
    // and the next move is SHOW — demonstrate, don't interrogate (Phase F)
    const move = decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })
    expect(move).toBe('show')
  })

  it('worked-example-first forces SHOW before anything has been demonstrated', () => {
    const s = initialConversationState('c')
    const move = decideNextMove(s, { recoveryTurn: false, workedExampleFirst: true })
    expect(move).toBe('show')
  })
})

// ── Scenario 8: repeated "I don't understand" ────────────────────────────────

describe('scenario 8 — repeated "I don\'t understand"', () => {
  it('detects the state', () => {
    expect(detectFailureState("I don't understand")).toBe('dont_understand')
  })

  it('recovery escalates instead of repeating the same script', () => {
    const first = buildRecoveryBlock('dont_understand', false, 0)
    const second = buildRecoveryBlock('dont_understand', false, 2)
    const exhausted = buildRecoveryBlock('dont_understand', false, 4)
    expect(first).not.toContain('REPEATED STRUGGLE')
    expect(second).toContain('Stop ALL questions')
    expect(exhausted).toContain('AFFECT BUDGET EXHAUSTED')
  })

  it('responses get SHORTER under repeated struggle, at every register', () => {
    for (const reg of ['beginner', 'intermediate'] as const) {
      const fresh = responseBudget(reg, 0)!
      const struggling = responseBudget(reg, 3)!
      expect(struggling).toBeLessThan(fresh)
    }
    expect(responseBudget('expert', 0)).toBeNull()          // advanced: unlimited
    expect(responseBudget('expert', 2)).not.toBeNull()      // …until they struggle
  })
})

// ── Cross-cutting invariants ─────────────────────────────────────────────────

describe('turn directive invariants', () => {
  it('an ASK directive allows exactly one question; SHOW/TEACH allow none', () => {
    const s = initialConversationState('c')
    const ask = buildTurnDirective({ state: s, nextMove: 'ask', maxParagraphs: 4, workedExampleFirst: false, visualType: null })
    expect(ask).toContain('exactly ONE question')
    const show = buildTurnDirective({ state: s, nextMove: 'show', maxParagraphs: 4, workedExampleFirst: true, visualType: null })
    expect(show).toContain('Ask NO questions')
    const teach = buildTurnDirective({ state: s, nextMove: 'teach', maxParagraphs: 4, workedExampleFirst: false, visualType: null })
    expect(teach).toContain('Ask NO questions')
  })

  it('OBSERVE frame forbids vocabulary (no terminology before concrete)', () => {
    const s = initialConversationState('c')
    const d = buildTurnDirective({ state: s, nextMove: 'ask', maxParagraphs: 4, workedExampleFirst: false, visualType: null })
    expect(d).toContain('no vocabulary')
    expect(d).toContain('Stage 2')
  })

  it('visual-first fires for showing phases, never for asking turns', () => {
    const s = initialConversationState('c')
    expect(decideVisualFirst('number_line', s, 'show')).toBe('number_line')
    expect(decideVisualFirst('number_line', s, 'ask')).toBeNull()
    expect(decideVisualFirst(null, s, 'show')).toBeNull()
    const practice: ConversationState = { ...s, phase: 'PRACTICE' }
    expect(decideVisualFirst('number_line', practice, 'teach')).toBeNull()
  })

  it('question detection ignores code fences', () => {
    expect(repliesWithQuestion('What do you notice?')).toBe(true)
    expect(repliesWithQuestion('Here is the idea. Try it when ready.')).toBe(false)
    expect(repliesWithQuestion('Look:\n```py\nx = a if b else c # ok?\n```\nDone.')).toBe(false)
  })

  it('state resets when the concept changes and survives when it does not', () => {
    const persisted = { ...initialConversationState('a'), phase: 'CHECK' as const, demonstrated: true }
    expect(readConversationState(persisted, 'a').phase).toBe('CHECK')
    expect(readConversationState(persisted, 'b').phase).toBe('OBSERVE')
    expect(readConversationState('garbage', 'a').phase).toBe('OBSERVE')
  })
})

describe('base prompt laws (Phase A regression)', () => {
  const prompt = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'en', null, undefined, 'beginner')

  it('the old unconditional comprehension-question principle is gone', () => {
    expect(prompt).not.toContain('After each explanation, ask a comprehension question')
  })
  it('explanation order and question stages are the standing laws', () => {
    expect(prompt).toContain('EXPLANATION SEQUENCING LAW')
    expect(prompt).toContain('QUESTION STAGE POLICY')
    expect(prompt).toContain('never open with a definition')
  })
  it('beginner register tunes the laws in place (one question, one term)', () => {
    expect(prompt).toContain('ONE question per response')
    const expert = buildTutorSystemPrompt('physics', 'Sam', 'expert', 'g', null, 'en', null, undefined, 'expert')
    expect(expert).not.toContain('ONE question per response')
  })
  it('the turn directive owns pacing when present', () => {
    expect(prompt).toContain('TURN DIRECTIVE is present')
  })
})
