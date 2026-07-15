/**
 * Regression tests — Mastery Gate (server-authoritative lesson completion).
 *
 * The bug these tests pin down: lesson completion used to be decided by
 * the LLM's [LESSON_COMPLETE] tag, which the prompt instructed it to emit
 * whenever the student SAID "understood"/"done"/"next topic" — so "got
 * it" spam completed lessons and skipped roadmap entries with zero
 * verified learning. Completion authority now lives in
 * src/lib/teaching/masteryGate.ts and is evidence-gated by the
 * conversation state machine's own counters.
 */
import { describe, it, expect } from 'vitest'
import {
  masteryVerified, gateLessonCompletion, isBareAcknowledgement,
  detectLearnerRequest, buildLearnerRequestBlock, buildMasteryGateBlock,
  buildMasterySummary, buildUnreadExplanationBlock,
  MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED,
} from '@/lib/teaching/masteryGate'
import {
  initialConversationState, advanceConversationState, readConversationState,
  PHASE_ORDER, type ConversationState,
} from '@/lib/teaching/conversationState'

function stateWith(overrides: Partial<ConversationState>): ConversationState {
  return { ...initialConversationState('phys.mech.newtons-first-law'), ...overrides }
}

const masteredState = () => stateWith({
  phase: 'TRANSFER', demonstrated: true,
  correctAtCheck: MASTERY_CHECK_REQUIRED,
  correctAtPractice: MASTERY_PRACTICE_REQUIRED,
})

// ── Bug 2: "Got it" is not evidence ──────────────────────────────────────────

describe('acknowledgements are never evidence', () => {
  it.each(['Got it', 'ok', 'OK!', 'okay', 'Next', 'next topic', 'continue', 'go', 'thanks', 'Nice', 'understood', 'makes sense', 'done', '👍', 'понял', 'хорошо'])(
    'detects %j as a bare acknowledgement',
    (msg) => expect(isBareAcknowledgement(msg)).toBe(true),
  )

  it.each([
    'ok, but why does the moon not fall?',
    'got it — so what happens when friction increases?',
    'I think the answer is 12',
    'next question: is force a vector?',
    'The velocity is 3 m/s',
  ])('never matches a real answer/question: %j', (msg) => {
    expect(isBareAcknowledgement(msg)).toBe(false)
  })

  it('a "Got it" turn cannot advance the phase ladder (signal suppressed → null)', () => {
    // Route behavior: bare ack discards the SIGNAL, so the fold sees null.
    const s0 = stateWith({ phase: 'CHECK', demonstrated: true })
    const s1 = advanceConversationState(s0, { askedQuestion: false, signalCorrect: null, recoveryFired: false })
    expect(s1.phase).toBe('CHECK')
    expect(s1.correctAtCheck).toBe(0)
    expect(masteryVerified(s1)).toBe(false)
  })
})

// ── Bug 1/3/12: completion only via MasteryVerified() ────────────────────────

describe('lesson completion gate', () => {
  const TEXT = 'Brilliant work today! [LESSON_COMPLETE]'

  it('strips the tag when mastery is not verified (the "got it" exploit)', () => {
    const gate = gateLessonCompletion(TEXT, stateWith({ phase: 'DEMONSTRATE' }))
    expect(gate.authorized).toBe(false)
    expect(gate.suppressed).toBe(true)
    expect(gate.cleanText).not.toMatch(/LESSON_COMPLETE/i)
    expect(gate.cleanText).toContain('Brilliant work today!')
  })

  it('authorizes the tag when evidence thresholds are met', () => {
    const gate = gateLessonCompletion(TEXT, masteredState())
    expect(gate.authorized).toBe(true)
    expect(gate.suppressed).toBe(false)
    expect(gate.cleanText).toMatch(/\[LESSON_COMPLETE\]/)
  })

  it('fail-closed: a null state can never authorize completion', () => {
    const gate = gateLessonCompletion(TEXT, null)
    expect(gate.authorized).toBe(false)
    expect(gate.suppressed).toBe(true)
  })

  it('no tag → pass-through, nothing authorized', () => {
    const gate = gateLessonCompletion('Keep going, you are close.', masteredState())
    expect(gate.authorized).toBe(false)
    expect(gate.suppressed).toBe(false)
    expect(gate.cleanText).toBe('Keep going, you are close.')
  })

  it('PROOF: no phase, message count, or turn count can authorize without evidence', () => {
    // Sweep every phase with every sub-threshold counter combination —
    // completion is impossible until BOTH thresholds are met, regardless
    // of phase, demonstrated flag, or any turn/question counters.
    for (const phase of PHASE_ORDER) {
      for (let check = 0; check <= MASTERY_CHECK_REQUIRED; check++) {
        for (let practice = 0; practice <= MASTERY_PRACTICE_REQUIRED; practice++) {
          const verified = check >= MASTERY_CHECK_REQUIRED && practice >= MASTERY_PRACTICE_REQUIRED
          const gate = gateLessonCompletion(TEXT, stateWith({
            phase, demonstrated: true,
            correctAtCheck: check, correctAtPractice: practice,
            questionsAskedSinceTeach: 99, teachSegmentsSinceQuestion: 99,
          }))
          expect(gate.authorized).toBe(verified)
          expect(gate.suppressed).toBe(!verified)
        }
      }
    }
  })
})

// ── Bug 3: mastery requires real correct answers, built turn by turn ─────────

describe('mastery evidence accumulation', () => {
  it('mastery is reached only through graded correct answers (1 CHECK + 2 PRACTICE)', () => {
    let s = stateWith({ phase: 'CHECK', demonstrated: true })
    const correct = { askedQuestion: true, signalCorrect: true as boolean | null, recoveryFired: false }
    s = advanceConversationState(s, correct)   // CHECK success → PRACTICE
    expect(s.phase).toBe('PRACTICE')
    expect(masteryVerified(s)).toBe(false)     // 1/1 check, 0/2 practice
    s = advanceConversationState(s, correct)   // practice success 1
    expect(masteryVerified(s)).toBe(false)
    s = advanceConversationState(s, correct)   // practice success 2 → TRANSFER
    expect(s.phase).toBe('TRANSFER')
    expect(masteryVerified(s)).toBe(true)
  })

  it('a failed quiz answer starts remediation (phase drops), evidence high-water kept', () => {
    const s0 = stateWith({ phase: 'PRACTICE', demonstrated: true, correctAtCheck: 1, correctAtPractice: 1 })
    const s1 = advanceConversationState(s0, { askedQuestion: true, signalCorrect: false, recoveryFired: false })
    expect(s1.phase).toBe('CHECK')             // moved DOWN — remediation
    expect(s1.consecutiveFailures).toBe(1)
    expect(s1.correctAtCheck).toBe(1)          // earned evidence never erased
  })
})

// ── Bug 4: Next Topic before mastery → explicit choice, never silent ─────────

describe('autonomy request before mastery', () => {
  it('unmastered state → the gate block is used, which forbids the completion tag', () => {
    expect(masteryVerified(stateWith({ phase: 'GUIDE' }))).toBe(false)
    const block = buildMasteryGateBlock()
    expect(block).toMatch(/Do NOT emit \[LESSON_COMPLETE\]/)
    expect(block).toContain('Continue Learning')
    expect(block).toContain('Skip Anyway')
  })

  it('even if the model ignores the block, the response gate strips the tag', () => {
    const gate = gateLessonCompletion('Sure, moving on! [LESSON_COMPLETE]', stateWith({ phase: 'GUIDE' }))
    expect(gate.suppressed).toBe(true)
  })

  it('gate summary tells the client to render the Continue/Skip choice', () => {
    const summary = buildMasterySummary(stateWith({ phase: 'GUIDE' }), { completionSuppressed: true, gatePending: true })
    expect(summary.verified).toBe(false)
    expect(summary.gatePending).toBe(true)
    expect(summary.completionSuppressed).toBe(true)
  })
})

// ── Bugs 5/6: diagram and real-life requests select the matching action ──────

describe('learner-request → forced TeachingAction', () => {
  it.each(['show me a diagram', 'can you visualize this?', 'draw it please', 'show me a picture', 'graph it'])(
    'diagram request detected: %j', (msg) => expect(detectLearnerRequest(msg)).toBe('diagram'),
  )

  it.each(['give me a real-life example', 'real world application?', 'tell me a story about this', 'where is this used in everyday life'])(
    'real-life example request detected: %j', (msg) => expect(detectLearnerRequest(msg)).toBe('real_life_example'),
  )

  it('diagram action forbids another prose paragraph and leads with the visual', () => {
    const block = buildLearnerRequestBlock('diagram', 'number_line')
    expect(block).toContain('TEACHING ACTION: DIAGRAM')
    expect(block).toMatch(/Do NOT reply with another prose paragraph/i)
    expect(block).toContain('VISUAL:number_line')
  })

  it('diagram action without a renderer still draws (text diagram), never re-explains', () => {
    const block = buildLearnerRequestBlock('diagram', null)
    expect(block).toContain('TEACHING ACTION: DIAGRAM')
    expect(block).toMatch(/ASCII|visual description/i)
    expect(block).toMatch(/No new abstract explanation/i)
  })

  it('real-life action forbids re-explaining theory', () => {
    const block = buildLearnerRequestBlock('real_life_example', null)
    expect(block).toContain('TEACHING ACTION: REAL_LIFE_EXAMPLE')
    expect(block).toMatch(/Do NOT re-explain the theory/i)
  })

  it('request counters accumulate in the student state (Bug 11)', () => {
    let s = stateWith({})
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'diagram' })
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'real_life_example' })
    expect(s.diagramRequests).toBe(1)
    expect(s.exampleRequests).toBe(1)
  })
})

// ── Bug 7: "explain differently" changes strategy, drops confidence ──────────

describe('explain-differently remediation', () => {
  it.each(['explain differently', 'explain it another way', "I don't understand", "i'm confused", 'that makes no sense', "didn't get it", 'explain more simply'])(
    'detected as explain_differently: %j', (msg) => expect(detectLearnerRequest(msg)).toBe('explain_differently'),
  )

  it('confusion outranks the medium it mentions ("I don\'t understand the diagram")', () => {
    expect(detectLearnerRequest("I don't understand the diagram")).toBe('explain_differently')
  })

  it('directive forbids repeating similar wording and forces a new channel', () => {
    const block = buildLearnerRequestBlock('explain_differently', null)
    expect(block).toMatch(/repeating similar wording is forbidden/i)
    expect(block).toMatch(/DIFFERENT channel/i)
  })

  it('fold: remediation count up, confidence down, phase re-shows, never advances', () => {
    const s0 = stateWith({ phase: 'CHECK', demonstrated: true, correctAtCheck: 1 })
    const s1 = advanceConversationState(s0, {
      askedQuestion: false, signalCorrect: true /* stray signal must not advance */,
      recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(s1.remediationCount).toBe(1)
    expect(s1.consecutiveFailures).toBe(1)
    expect(s1.phase).toBe('GUIDE')            // down one — re-show
    expect(s1.correctAtCheck).toBe(1)         // high-water kept
  })
})

// ── Bug 8: unread explanations are never assumed read ────────────────────────

describe('read-state directive', () => {
  it('tells the engine not to build on unexpanded text', () => {
    const block = buildUnreadExplanationBlock()
    expect(block).toMatch(/did NOT expand/i)
    expect(block).toMatch(/not fully read/i)
  })
})

// ── Bug 9/15: refresh/restore keeps lesson state; roadmap cannot skip ────────

describe('state persistence and restore', () => {
  it('round-trips through JSON (contextSnapshot ride) without losing counters', () => {
    const s = stateWith({
      phase: 'PRACTICE', demonstrated: true, correctAtCheck: 1, correctAtPractice: 1,
      remediationCount: 2, diagramRequests: 1, exampleRequests: 3,
    })
    const restored = readConversationState(JSON.parse(JSON.stringify(s)), 'phys.mech.newtons-first-law')
    expect(restored).toEqual(s)
    expect(masteryVerified(restored)).toBe(false)   // exact same gate answer after refresh
  })

  it('pre-rework snapshots (no counters) restore with safe defaults, not NaN', () => {
    const legacy = {
      phase: 'CHECK', conceptId: 'math.arith.fractions',
      questionsAskedSinceTeach: 1, teachSegmentsSinceQuestion: 0,
      consecutiveFailures: 0, demonstrated: true, correctAtCheck: 0, correctAtPractice: 0,
    }
    const restored = readConversationState(legacy, 'math.arith.fractions')
    expect(restored.remediationCount).toBe(0)
    expect(restored.diagramRequests).toBe(0)
    expect(restored.exampleRequests).toBe(0)
    expect(masteryVerified(restored)).toBe(false)
  })

  it('a concept change resets the machine — mastery never leaks across lessons', () => {
    const restored = readConversationState(masteredState(), 'a.different.concept')
    expect(masteryVerified(restored)).toBe(false)
    expect(restored.phase).toBe('OBSERVE')
  })
})
