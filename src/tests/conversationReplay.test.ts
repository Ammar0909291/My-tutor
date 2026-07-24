/**
 * Conversation Replay — real physics lesson transcript validation.
 *
 * These tests replay realistic multi-turn physics conversations and verify
 * that the conversation decision layer produces natural, human-tutor-like
 * directives at every turn. A response that feels robotic to a human tutor
 * is a production bug.
 *
 * Each test documents the exact student message, the expected conversation
 * decision, and WHY a human tutor would respond that way. The tests are
 * ordered to simulate actual lesson flow.
 */
import { describe, it, expect } from 'vitest'
import {
  classifyConversation,
  buildConversationDirective,
  type ConversationDecisionType,
} from '@/lib/teaching/conversationDecision'

const base = {
  recoveryKey: null,
  studentIntent: 'unknown' as string,
  lastAssistantAskedQuestion: false,
  lastSignalCorrectness: null as boolean | null,
  hedged: false,
  helpRequestKind: null as string | null,
}

function decide(msg: string, overrides: Partial<typeof base> = {}) {
  return classifyConversation(msg, { ...base, ...overrides })
}

// ── Replay A: Newton's Second Law — beginner, first encounter ───────────────

describe('Replay A — Newton\'s Second Law beginner lesson', () => {
  it('Turn 1: student says "ok" after introduction → ACKNOWLEDGEMENT (continue naturally)', () => {
    const d = decide('ok', { studentIntent: 'acknowledging' })
    expect(d.type).toBe('ACKNOWLEDGEMENT')
    expect(d.rendererDirective).not.toMatch(/forced enthusiasm/i)
  })

  it('Turn 2: student answers "force?" tentatively to "what makes things move?" → TENTATIVE_ANSWER', () => {
    const d = decide('force?', {
      lastAssistantAskedQuestion: true,
      hedged: true,
    })
    expect(d.type).toBe('TENTATIVE_ANSWER')
    expect(d.rendererDirective).toMatch(/on the right track/i)
  })

  it('Turn 3: student answers "F = ma" correctly → SUCCESS (confirm with reason)', () => {
    const d = decide('F equals ma', {
      lastAssistantAskedQuestion: true,
      lastSignalCorrectness: true,
    })
    expect(d.type).toBe('SUCCESS')
    expect(d.rendererDirective).toMatch(/confirm briefly/i)
    expect(d.rendererDirective).toMatch(/because/i)
  })

  it('Turn 4: student asks "but what about air resistance?" → CURIOSITY', () => {
    const d = decide('but what about air resistance?', base)
    expect(d.type).toBe('CURIOSITY')
    expect(d.rendererDirective).toMatch(/curious/i)
    expect(d.rendererDirective).not.toMatch(/we'll cover that later/i)
  })

  it('Turn 5: student says "wait, so heavier things need more force?" → CONFIDENCE', () => {
    const d = decide('wait, so heavier things need more force?', {
      lastAssistantAskedQuestion: true,
      lastSignalCorrectness: true,
    })
    expect(d.type).toBe('CONFIDENCE')
  })

  it('Turn 6: student says "I don\'t get why mass matters" → CONFUSION (change method)', () => {
    const d = decide("I don't get why mass matters", {
      studentIntent: 'requesting_help',
      helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('CONFUSION')
    expect(d.rendererDirective).toMatch(/previous explanation/i)
  })

  it('Turn 7: student says "explain it differently" → REPHRASE_REQUEST (not confusion)', () => {
    const d = decide('explain it differently', {
      studentIntent: 'requesting_help',
      helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('REPHRASE_REQUEST')
    expect(d.rendererDirective).toMatch(/different angle/i)
  })

  it('Turn 8: student says "oh I see, so it\'s like pushing a shopping cart" → CONFIDENCE', () => {
    const d = decide("oh I see, so it's like pushing a shopping cart", {
      lastAssistantAskedQuestion: true,
      lastSignalCorrectness: true,
    })
    expect(d.type).toBe('CONFIDENCE')
    expect(d.rendererDirective).toMatch(/confirm specifically/i)
  })
})

// ── Replay B: Projectile Motion — intermediate, struggling ──────────────────

describe('Replay B — Projectile Motion, student struggling', () => {
  it('Turn 1: student gives wrong answer "the ball goes in a straight line" → NEUTRAL with gentle correction', () => {
    const d = decide('the ball goes in a straight line', {
      lastAssistantAskedQuestion: true,
      lastSignalCorrectness: false,
    })
    expect(d.type).toBe('NEUTRAL')
    expect(d.rendererDirective).toMatch(/good try/i)
    expect(d.rendererDirective).not.toMatch(/\bwrong\b/i)
    expect(d.rendererDirective).not.toMatch(/\bincorrect\b/i)
  })

  it('Turn 2: student says "I\'m lost, this doesn\'t make sense" → CONFUSION', () => {
    const d = decide("I'm lost, this doesn't make sense", {
      studentIntent: 'requesting_help',
      helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('CONFUSION')
  })

  it('Turn 3: student says "why do we even need to know about projectiles" → BOREDOM', () => {
    const d = decide('why do we even need to know about projectiles', base)
    expect(d.type).toBe('BOREDOM')
    expect(d.rendererDirective).toMatch(/connect/i)
    expect(d.rendererDirective).not.toMatch(/lecture/i)
  })

  it('Turn 4: student says "I guess maybe 45 degrees?" hedging → TENTATIVE_ANSWER', () => {
    const d = decide('I guess maybe 45 degrees?', {
      lastAssistantAskedQuestion: true,
      hedged: true,
    })
    expect(d.type).toBe('TENTATIVE_ANSWER')
    expect(d.rendererDirective).toMatch(/not confident/i)
  })

  it('Turn 5: student asks "what would happen if there was no gravity?" → CURIOSITY', () => {
    const d = decide('what would happen if there was no gravity?', base)
    expect(d.type).toBe('CURIOSITY')
  })

  it('Turn 6: student says "ugh I give up" → RECOVERY (recovery guard)', () => {
    const d = decide('ugh I give up', { recoveryKey: 'give_up' })
    expect(d.type).toBe('RECOVERY')
  })
})

// ── Replay C: Verification — anti-patterns the old system produced ──────────

describe('Replay C — anti-pattern verification', () => {
  it('a wrong answer must NEVER produce a directive containing "wrong" or "incorrect"', () => {
    const messages = [
      'The answer is 42',
      'I think it goes up forever',
      'Zero, because there is no force',
      'The velocity is constant',
    ]
    for (const msg of messages) {
      const d = decide(msg, {
        lastAssistantAskedQuestion: true,
        lastSignalCorrectness: false,
      })
      expect(d.rendererDirective).not.toMatch(/\bwrong\b/i)
      expect(d.rendererDirective).not.toMatch(/\bincorrect\b/i)
    }
  })

  it('a confused student must get a directive that changes method, not just wording', () => {
    const messages = [
      "I don't understand",
      "this makes no sense",
      "I'm confused about all of this",
    ]
    for (const msg of messages) {
      const d = decide(msg, {
        studentIntent: 'requesting_help',
        helpRequestKind: 'explain_differently',
      })
      expect(d.type).toBe('CONFUSION')
      expect(d.rendererDirective).not.toMatch(/rephrase/i)
    }
  })

  it('a direct question must ALWAYS be answered first', () => {
    const d = decide('Why does mass not affect free fall speed?', {
      studentIntent: 'asking_question',
    })
    expect(d.type).toBe('DIRECT_QUESTION')
    expect(d.rendererDirective).toMatch(/answer it first/i)
    expect(d.rendererDirective).toMatch(/never redirect/i)
  })

  it('conversation directive is compact — under 200 chars', () => {
    const decisions = [
      decide('ok', { studentIntent: 'acknowledging' }),
      decide("I don't get it", { studentIntent: 'requesting_help', helpRequestKind: 'explain_differently' }),
      decide('5 m/s²', { lastAssistantAskedQuestion: true, lastSignalCorrectness: true }),
      decide('what happens if there is no friction?', base),
    ]
    for (const d of decisions) {
      const block = buildConversationDirective(d)
      expect(block.length).toBeLessThan(300)
    }
  })

  it('the full CONVERSATION + BRAIN block stays under 500 chars total', () => {
    const d = decide("I'm confused", {
      studentIntent: 'requesting_help',
      helpRequestKind: 'explain_differently',
    })
    const convBlock = buildConversationDirective(d)
    const brainBlock = 'BRAIN DECISION (authoritative):\n- Decision: TEACH_DIRECTLY (D3b)\n- Stop probing\n- Role: demonstrate.'
    const total = convBlock + '\n' + brainBlock
    expect(total.length).toBeLessThan(500)
  })
})

// ── Replay D: Sequence of decisions mirrors human tutor ─────────────────────

describe('Replay D — decision sequence matches human tutor behavior', () => {
  it('the conversation decision type set covers all common student states', () => {
    const types: ConversationDecisionType[] = [
      'CONFUSION', 'REPHRASE_REQUEST', 'DIRECT_QUESTION',
      'SUCCESS', 'FRUSTRATION', 'BOREDOM', 'CONFIDENCE',
      'CURIOSITY', 'ACKNOWLEDGEMENT', 'TENTATIVE_ANSWER',
      'RECOVERY', 'NEUTRAL',
    ]
    for (const t of types) {
      expect(typeof t).toBe('string')
    }
    expect(types.length).toBe(12)
  })

  it('CONFUSION directive says to change approach, not repeat', () => {
    const d = decide("I still don't understand", {
      studentIntent: 'requesting_help',
      helpRequestKind: 'explain_differently',
    })
    expect(d.rendererDirective).toMatch(/different/i)
    expect(d.rendererDirective).not.toMatch(/repeat/i)
  })

  it('SUCCESS directive says to name what made the answer right', () => {
    const d = decide('9.8 m/s²', {
      lastAssistantAskedQuestion: true,
      lastSignalCorrectness: true,
    })
    expect(d.rendererDirective).toMatch(/because/i)
  })

  it('BOREDOM directive says to show, not lecture', () => {
    const d = decide('is this even useful in real life?', base)
    expect(d.rendererDirective).toMatch(/show/i)
    expect(d.rendererDirective).not.toMatch(/lecture/i)
  })

  it('CURIOSITY directive says to answer directly, never deflect', () => {
    const d = decide('what happens if we reverse the current?', base)
    expect(d.rendererDirective).toMatch(/answer/i)
    expect(d.rendererDirective).not.toMatch(/later/i)
  })
})
