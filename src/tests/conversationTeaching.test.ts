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
  isPriorKnowledgeProbe,
  detectAutonomyRequest,
  buildAutonomyBlock,
  buildTurnDirective,
  decideVisualFirst,
  PHASE_MAX_QUESTION_STAGE,
  PHASE_ORDER,
  isLowSignalAcknowledgement,
  detectFillerTurn,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { detectFailureState, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

// ── helpers ───────────────────────────────────────────────────────────────────

/** Fold a sequence of turns into the state machine. */
function playTurns(
  start: ConversationState,
  turns: Array<{ asked: boolean; correct: boolean | null; recovery?: boolean; priorKnowledgeProbe?: boolean }>,
): ConversationState {
  return turns.reduce(
    (s, t) => advanceConversationState(s, {
      askedQuestion: t.asked,
      signalCorrect: t.correct,
      recoveryFired: t.recovery ?? false,
      isPriorKnowledgeProbe: t.priorKnowledgeProbe ?? false,
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

// ── Scenario 9: semantic question loop (P0-4) ────────────────────────────────

describe('scenario 9 — semantic question loop (paraphrased, not exact wording)', () => {
  it.each([
    'Have you seen a pulley before?',
    'Have you heard of photosynthesis?',
    'Can you think of an example of a lever?',
    'What comes to mind when you think of momentum?',
    'Do you know what osmosis is?',
    'Do you recall what we covered about fractions?',
  ])('%s → classified as a prior-knowledge probe', (text) => {
    expect(isPriorKnowledgeProbe(text)).toBe(true)
  })

  it.each([
    'What is the value of x in this equation?',
    'Can you solve for y?',
    'Here is the idea. Try it when ready.',
    'Why does the ball fall faster than the feather?',
  ])('%s → NOT a prior-knowledge probe (a real content question, or none)', (text) => {
    expect(isPriorKnowledgeProbe(text)).toBe(false)
  })

  it('question marks inside code fences do not count (reuses the repliesWithQuestion convention)', () => {
    expect(isPriorKnowledgeProbe('Look:\n```py\n# have you seen this pattern before?\nx = 1\n```\nDone.')).toBe(false)
  })

  it('two consecutive probes in DIFFERENT WORDS force SHOW on the third turn', () => {
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: true, correct: null, priorKnowledgeProbe: true },  // "Have you seen X?"
      { asked: true, correct: null, priorKnowledgeProbe: true },  // "Can you think of X?"
    ])
    expect(s.consecutivePriorKnowledgeProbes).toBe(2)
    const move = decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })
    expect(move).toBe('show')
  })

  it('a single probe does not yet force the break', () => {
    // Updated 2026-07-27 (questionLegality.ts QL-1): the original version of
    // this test opened with a probe on a virgin state and asserted 'ask'. That
    // is now structurally illegal — a question needs a source to answer from —
    // so the setup teaches first. The test's actual subject is unchanged: the
    // semantic-loop counter alone must not fire at 1.
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: false, correct: null },                             // give: a source now exists
      { asked: true, correct: null, priorKnowledgeProbe: true },    // one probe
    ])
    expect(s.consecutivePriorKnowledgeProbes).toBe(1)
    expect(decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })).toBe('ask')
  })

  it('a genuine content question in between resets the counter (not a loop)', () => {
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: true, correct: null, priorKnowledgeProbe: true },
      { asked: true, correct: true, priorKnowledgeProbe: false }, // different, real question
    ])
    expect(s.consecutivePriorKnowledgeProbes).toBe(0)
  })

  it('fires BEFORE the generic 2-question budget would even matter — a more specific, earlier signal', () => {
    // Two probe-type questions also trip the generic questionsAskedSinceTeach
    // cap at the same count — this test pins that the semantic reason is
    // available (consecutivePriorKnowledgeProbes), not just the generic one.
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: true, correct: null, priorKnowledgeProbe: true },
      { asked: true, correct: null, priorKnowledgeProbe: true },
    ])
    expect(s.questionsAskedSinceTeach).toBe(2)
    expect(s.consecutivePriorKnowledgeProbes).toBe(2)
  })

  it('totalKnowledgeProbes never resets — permanent gate fires even after an abbreviated probe resets CPK', () => {
    // Simulates the failing transcript: formal probes → abbreviated probe (CPK resets) →
    // must still be blocked from asking. The LLM uses "GPS?" instead of
    // "Have you seen GPS?" after the TURN DIRECTIVE suppresses formal probes;
    // CPK would drop to 0 for "GPS?" (regex miss) but totalKnowledgeProbes
    // holds the high-water mark and the permanent gate keeps firing 'show'.
    let s = initialConversationState('c')
    // Turn 1 & 2: formal probes — CPK=2, total=2
    s = playTurns(s, [
      { asked: true, correct: null, priorKnowledgeProbe: true },  // "Have you seen vectors?"
      { asked: true, correct: null, priorKnowledgeProbe: true },  // "Have you seen forces?"
    ])
    expect(s.consecutivePriorKnowledgeProbes).toBe(2)
    expect(s.totalKnowledgeProbes).toBe(2)
    expect(decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })).toBe('show')

    // Turn 3: abbreviated probe ("GPS?") — CPK resets to 0 (regex miss), but total stays at 2
    s = playTurns(s, [{ asked: true, correct: null, priorKnowledgeProbe: false }])
    expect(s.consecutivePriorKnowledgeProbes).toBe(0)
    expect(s.totalKnowledgeProbes).toBe(2)  // never decremented

    // Permanent gate still fires — abbreviated probes cannot erase it
    expect(decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })).toBe('show')
  })

  it('the turn directive names the semantic loop specifically when it is what forced SHOW', () => {
    let s = initialConversationState('c')
    s = playTurns(s, [
      { asked: true, correct: null, priorKnowledgeProbe: true },
      { asked: true, correct: null, priorKnowledgeProbe: true },
    ])
    const move = decideNextMove(s, { recoveryTurn: false, workedExampleFirst: false })
    const block = buildTurnDirective({ state: s, nextMove: move, maxParagraphs: null, workedExampleFirst: false, visualType: null })
    expect(block).toMatch(/Semantic loop detected/i)
    expect(block).toMatch(/do NOT ask a third rephrased version/i)
  })

  it('the semantic-loop line does not appear on an ordinary SHOW (worked-example-first only)', () => {
    const s = initialConversationState('c')
    const block = buildTurnDirective({ state: s, nextMove: 'show', maxParagraphs: null, workedExampleFirst: true, visualType: null })
    expect(block).not.toMatch(/Semantic loop detected/i)
    expect(block).toMatch(/Demonstrate first/i)
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

  it('OBSERVE frame forbids prior-knowledge probing (show anchor first)', () => {
    const s = initialConversationState('c')
    const d = buildTurnDirective({ state: s, nextMove: 'ask', maxParagraphs: 4, workedExampleFirst: false, visualType: null })
    expect(d).toContain('NOT prior-knowledge probing')
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

// ── Pacing/deflection/misconception-repair fixes (Tutor Max transcript review) ──

describe('example ceiling + explicit topic-understanding (Principle 11)', () => {
  const prompt = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'en', null, undefined, 'beginner')

  it('caps examples per sub-concept at two, as a ceiling not a requirement', () => {
    expect(prompt).toContain('EXAMPLE CEILING')
    expect(prompt).toMatch(/AT MOST TWO examples/i)
    expect(prompt).toMatch(/ceiling, not a requirement/i)
  })

  it('an explicit "I got this topic" claim moves on immediately, not another example', () => {
    expect(prompt).toMatch(/I got this topic/i)
    expect(prompt).toMatch(/move to the next sub-concept IMMEDIATELY/i)
  })
})

describe('bare acknowledgment is not an answer, capped at one retry (Principle 12)', () => {
  const prompt = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'en', null, undefined, 'beginner')

  it('states the one-retry-then-accept rule', () => {
    expect(prompt).toContain('A CLAIM IS NOT AN ANSWER')
    expect(prompt).toMatch(/Re-ask that SAME question ONCE/i)
    expect(prompt).toMatch(/do not ask a third time/i)
  })
})

describe('misconception repair re-probes the original question (Principle 4 strengthened)', () => {
  const prompt = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'en', null, undefined, 'beginner')

  it('requires re-asking the original question after a correction, not just a nicer explanation', () => {
    expect(prompt).toMatch(/re-ask the same original question/i)
    expect(prompt).toMatch(/confirm the corrected understanding actually landed/i)
  })
})

describe('navigation rule does not misfire on within-lesson pacing requests', () => {
  const prompt = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'en', null, undefined, 'beginner')

  it('lists "I got this topic move to next" as a continuation, not a lesson-switch', () => {
    const navSection = prompt.slice(prompt.indexOf('NAVIGATION RULE'))
    expect(navSection).toContain('I got this topic move to next')
    expect(navSection).toMatch(/continue teaching/i)
  })

  it('still treats explicit lesson-switch phrases as navigation commands', () => {
    expect(prompt).toContain('next lesson')
    expect(prompt).toContain('Use the lesson navigation panel')
  })
})

describe('Hindi and Russian prompts carry the same fixes (mirrored, not English-only)', () => {
  it('Hindi: example ceiling + claim-is-not-an-answer + re-probe + nav exception', () => {
    const hi = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'hi', null, undefined, 'beginner')
    expect(hi).toMatch(/EXAMPLE CEILING/i)
    expect(hi).toMatch(/I got this topic/i)
    expect(hi).toContain('EK CLAIM ANSWER NAHI HAI')
    expect(hi).toMatch(/dobara.*poochein.*confirm/i)
    expect(hi).toContain('I got this topic move to next')
  })

  it('Russian: example ceiling + claim-is-not-an-answer + re-probe + nav exception', () => {
    const ru = buildTutorSystemPrompt('physics', 'Sam', 'beginner', 'learn basics', null, 'ru', null, undefined, 'beginner')
    expect(ru).toContain('ПОТОЛОК ПРИМЕРОВ')
    expect(ru).toContain('УТВЕРЖДЕНИЕ — ЭТО НЕ ОТВЕТ')
    expect(ru).toMatch(/тот же исходный вопрос ещё раз/i)
    expect(ru).toContain('ИСКЛЮЧЕНИЕ')
  })
})

// Loop 4: bare acknowledgements must not reset confusion counters
describe('Loop 4 — preserve confusion state across acknowledgements', () => {
  it('consecutiveDontKnows survives a bare acknowledgement (no signal)', () => {
    let state = initialConversationState('c1')
    // Turn 1: "I don't know"
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: true, dontKnowSignal: true,
    })
    expect(state.consecutiveDontKnows).toBe(1)

    // Turn 2: "ok" — no signal, no recovery (bare acknowledgement)
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, dontKnowSignal: false,
    })
    expect(state.consecutiveDontKnows).toBe(1) // NOT reset to 0

    // Turn 3: "I still don't know"
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: true, dontKnowSignal: true,
    })
    expect(state.consecutiveDontKnows).toBe(2) // correctly reaches the Hard Rule 1 threshold
  })

  it('consecutiveDontKnows resets on a genuine correct answer', () => {
    let state = initialConversationState('c1')
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: true, dontKnowSignal: true,
    })
    expect(state.consecutiveDontKnows).toBe(1)

    // Correct answer resets the chain
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false, dontKnowSignal: false,
    })
    expect(state.consecutiveDontKnows).toBe(0)
  })

  it('consecutiveDontKnows does NOT reset on a wrong answer (non-recovery failure)', () => {
    let state = initialConversationState('c1')
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: true, dontKnowSignal: true,
    })
    expect(state.consecutiveDontKnows).toBe(1)

    // Wrong answer without a recovery utterance — confusion is still present
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: false, recoveryFired: false, dontKnowSignal: false,
    })
    expect(state.consecutiveDontKnows).toBe(1) // preserved
  })
})

// Loop 5: turn directive includes "already answered" guard when questions
// have been answered correctly, preventing re-interrogation of resolved moments
describe('Loop 5 — never re-interrogate resolved moments', () => {
  it('turn directive includes already-answered count when asking after correct answers', () => {
    const state = {
      ...initialConversationState('c1'),
      phase: 'PRACTICE' as const,
      correctAtCheck: 1,
      correctAtPractice: 1,
      demonstrated: true,
    }
    const directive = buildTurnDirective({
      state,
      nextMove: 'ask',
      maxParagraphs: 4,
      workedExampleFirst: false,
      visualType: null,
    })
    expect(directive).toContain('already answered 2 question(s) correctly')
    expect(directive).toContain('DIFFERENT question')
  })

  it('turn directive omits the guard when no correct answers yet', () => {
    const state = {
      ...initialConversationState('c1'),
      phase: 'OBSERVE' as const,
    }
    const directive = buildTurnDirective({
      state,
      nextMove: 'ask',
      maxParagraphs: 4,
      workedExampleFirst: false,
      visualType: null,
    })
    expect(directive).not.toContain('already answered')
  })

  it('turn directive omits the guard on teach/show moves (no question to re-ask)', () => {
    const state = {
      ...initialConversationState('c1'),
      phase: 'GUIDE' as const,
      correctAtCheck: 1,
      demonstrated: true,
    }
    const directive = buildTurnDirective({
      state,
      nextMove: 'teach',
      maxParagraphs: 4,
      workedExampleFirst: false,
      visualType: null,
    })
    expect(directive).not.toContain('already answered')
  })
})

// Loop 6: analogy world ceiling fires after demonstration + multiple explanations
describe('Loop 6 — analogy control', () => {
  it('analogy ceiling fires when demonstrated and explanationCount >= 2', () => {
    const state = {
      ...initialConversationState('c1'),
      phase: 'GUIDE' as const,
      demonstrated: true,
      explanationCount: 2,
    }
    const directive = buildTurnDirective({
      state,
      nextMove: 'teach',
      maxParagraphs: 4,
      workedExampleFirst: false,
      visualType: null,
    })
    expect(directive).toContain('ANALOGY CEILING')
    expect(directive).toContain('reuse the SAME world')
  })

  it('analogy ceiling does not fire early in the lesson', () => {
    const state = {
      ...initialConversationState('c1'),
      phase: 'OBSERVE' as const,
      demonstrated: false,
      explanationCount: 0,
    }
    const directive = buildTurnDirective({
      state,
      nextMove: 'ask',
      maxParagraphs: 4,
      workedExampleFirst: false,
      visualType: null,
    })
    expect(directive).not.toContain('ANALOGY CEILING')
  })
})

// ── Bug 1: off-topic OBSERVE anchor guard ────────────────────────────────────

describe('Bug 1 — OBSERVE phase anchor must reference the lesson concept', () => {
  const baseState = { ...initialConversationState('c1'), phase: 'OBSERVE' as const }

  it('injects concept-anchor warning when lessonTitle is provided', () => {
    const directive = buildTurnDirective({
      state: baseState, nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
      lessonTitle: 'Molecular Orbital Theory',
    })
    expect(directive).toContain('Molecular Orbital Theory')
    expect(directive).toContain('never open with an example from a different concept')
  })

  it('omits concept-anchor warning when lessonTitle is absent', () => {
    const directive = buildTurnDirective({
      state: baseState, nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
    })
    expect(directive).not.toContain('never open with an example from a different concept')
  })

  it('does NOT inject concept-anchor warning for non-OBSERVE phases', () => {
    for (const phase of ['DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      const st = { ...initialConversationState('c1'), phase }
      const directive = buildTurnDirective({
        state: st, nextMove: 'teach', maxParagraphs: 4,
        workedExampleFirst: false, visualType: null,
        lessonTitle: 'Henry\'s Law',
      })
      expect(directive).not.toContain('never open with an example from a different concept')
    }
  })

  it('first-lesson frame overrides concept-anchor when firstLessonActive', () => {
    const directive = buildTurnDirective({
      state: baseState, nextMove: 'ask', maxParagraphs: 2,
      workedExampleFirst: false, visualType: null,
      lessonTitle: 'Letter-Sound Correspondence', firstLessonActive: true,
    })
    expect(directive).toContain('FIRST LESSON PROTOCOL')
    // concept-anchor language must not double-inject
    expect(directive).not.toContain('never open with an example from a different concept')
  })
})

// ── Bug 2: low-signal acknowledgement detector ───────────────────────────────

describe('Bug 2 — isLowSignalAcknowledgement', () => {
  const LOW_SIGNAL = [
    'Got it', 'got it', 'okay', 'Okay', 'ok', 'OK', 'Ok',
    'I see', 'I understand', 'understood', 'makes sense',
    'alright', 'sure', 'right', 'yep', 'yup', 'yeah', 'cool',
    'I get it', 'Sounds good', 'Fine', 'hmm', 'Uh huh', 'mhm',
    'Got it!', 'Okay.', 'Ok, understood.',
    'yes', 'of course', 'noted', 'no problem',
  ]
  const NOT_LOW_SIGNAL = [
    'Got it, but what does the orbital mean exactly?',
    'okay so the pressure increases because more molecules hit the walls?',
    'I understand, but could you explain the bonding part again?',
    'that makes sense — so Henry\'s law says concentration goes up with pressure',
    'H₂ has two electrons in the bonding orbital',
    'What is Henry\'s law?',
    '',
    'I think I get it but I\'m still confused about the second part',
  ]

  it.each(LOW_SIGNAL)('flags %j as low-signal', (msg) => {
    expect(isLowSignalAcknowledgement(msg)).toBe(true)
  })

  it.each(NOT_LOW_SIGNAL)('does NOT flag %j as low-signal', (msg) => {
    expect(isLowSignalAcknowledgement(msg)).toBe(false)
  })
})

describe('Bug 2 — directive injects LOW-SIGNAL line when flagged', () => {
  const state = { ...initialConversationState('c1'), phase: 'CHECK' as const }

  it('injects LOW-SIGNAL RESPONSE DETECTED when lowSignalAcknowledgement=true', () => {
    const directive = buildTurnDirective({
      state, nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
      lowSignalAcknowledgement: true,
    })
    expect(directive).toContain('LOW-SIGNAL RESPONSE DETECTED')
    expect(directive).toContain('concrete check question')
  })

  it('omits LOW-SIGNAL line when lowSignalAcknowledgement=false', () => {
    const directive = buildTurnDirective({
      state, nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
      lowSignalAcknowledgement: false,
    })
    expect(directive).not.toContain('LOW-SIGNAL RESPONSE DETECTED')
  })
})

// ── Bug 3: stay-on-current-example guard ─────────────────────────────────────

describe('Bug 3 — STAY ON CURRENT EXAMPLE directive in early phases', () => {
  it('is injected in OBSERVE phase when correctAtCheck=0', () => {
    const state = { ...initialConversationState('c1'), phase: 'OBSERVE' as const, correctAtCheck: 0 }
    const directive = buildTurnDirective({
      state, nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
    })
    expect(directive).toContain('STAY ON CURRENT EXAMPLE')
  })

  it('is injected in DEMONSTRATE phase when correctAtCheck=0', () => {
    const state = { ...initialConversationState('c1'), phase: 'DEMONSTRATE' as const, correctAtCheck: 0 }
    const directive = buildTurnDirective({
      state, nextMove: 'show', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
    })
    expect(directive).toContain('STAY ON CURRENT EXAMPLE')
  })

  it('is injected in GUIDE phase when correctAtCheck=0', () => {
    const state = { ...initialConversationState('c1'), phase: 'GUIDE' as const, correctAtCheck: 0 }
    const directive = buildTurnDirective({
      state, nextMove: 'teach', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
    })
    expect(directive).toContain('STAY ON CURRENT EXAMPLE')
  })

  it('is NOT injected once correctAtCheck >= 1', () => {
    const state = { ...initialConversationState('c1'), phase: 'OBSERVE' as const, correctAtCheck: 1 }
    const directive = buildTurnDirective({
      state, nextMove: 'ask', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
    })
    expect(directive).not.toContain('STAY ON CURRENT EXAMPLE')
  })

  it('is NOT injected in CHECK/PRACTICE/TRANSFER phases', () => {
    for (const phase of ['CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      const st = { ...initialConversationState('c1'), phase, correctAtCheck: 0 }
      const directive = buildTurnDirective({
        state: st, nextMove: 'ask', maxParagraphs: 4,
        workedExampleFirst: false, visualType: null,
      })
      expect(directive).not.toContain('STAY ON CURRENT EXAMPLE')
    }
  })
})

// ── Bug 4: filler turn detector ──────────────────────────────────────────────

describe('Bug 4 — detectFillerTurn', () => {
  const FILLER = [
    "Let's take one small step together. We can continue whenever you're ready.",
    "Take your time, no rush.",
    "We can continue whenever you're ready.",
    "Feel free to take a moment.",
    "Let's move forward whenever you're ready.",
    "We'll continue at your own pace.",
  ]
  const NOT_FILLER = [
    "Henry's law states that the concentration of a dissolved gas is proportional to its partial pressure above the liquid.",
    "What happens to gas solubility when you increase pressure?",
    "Let's take one small step: H₂ has two electrons in bonding MOs — what does that tell us about bond order?",
    "That's a great observation. Now let's think about what happens when pressure doubles.",
    "The bond order is calculated as (bonding electrons - antibonding electrons) / 2.",
    "",
    "The answer is 1.5. Does that match what you calculated?",
    "Okay, so the key idea is that when pressure increases, more gas molecules dissolve in the liquid — this is why carbonated drinks go flat when you open them.",
  ]

  it.each(FILLER)('flags %j as filler', (text) => {
    expect(detectFillerTurn(text)).toBe(true)
  })

  it.each(NOT_FILLER)('does NOT flag %j as filler', (text) => {
    expect(detectFillerTurn(text)).toBe(false)
  })
})
