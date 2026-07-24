import { describe, it, expect } from 'vitest'
import {
  classifyConversation,
  buildConversationDirective,
  type ConversationDecision,
} from '@/lib/teaching/conversationDecision'

const base = {
  recoveryKey: null,
  studentIntent: 'unknown' as string,
  lastAssistantAskedQuestion: false,
  lastSignalCorrectness: null as boolean | null,
  hedged: false,
  helpRequestKind: null as string | null,
}

describe('conversation decision classification', () => {
  it('recovery key → RECOVERY', () => {
    const d = classifyConversation('I give up', { ...base, recoveryKey: 'give_up' })
    expect(d.type).toBe('RECOVERY')
  })

  it('distress intent → FRUSTRATION', () => {
    const d = classifyConversation('ugh this is so annoying', {
      ...base, studentIntent: 'expressing_distress',
    })
    expect(d.type).toBe('FRUSTRATION')
  })

  it.each([
    "I don't understand this at all",
    "I'm confused",
    "this makes no sense",
    "huh?",
  ])('confusion detected: %j', (msg) => {
    const d = classifyConversation(msg, {
      ...base, studentIntent: 'requesting_help', helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('CONFUSION')
  })

  it('explain_differently without confusion → REPHRASE_REQUEST', () => {
    const d = classifyConversation('explain it another way', {
      ...base, studentIntent: 'requesting_help', helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('REPHRASE_REQUEST')
  })

  it.each([
    'this is boring',
    'why do I need to learn this?',
    'is this even useful?',
    "what's the point of this?",
  ])('boredom detected: %j', (msg) => {
    const d = classifyConversation(msg, base)
    expect(d.type).toBe('BOREDOM')
  })

  it.each([
    'what happens if we increase the force?',
    'what about friction?',
    'does this also apply to fluids?',
    'can you show how this relates to energy?',
  ])('curiosity detected: %j', (msg) => {
    const d = classifyConversation(msg, base)
    expect(d.type).toBe('CURIOSITY')
  })

  it('correct answer + confidence phrase → CONFIDENCE', () => {
    const d = classifyConversation('oh I see, so it\'s basically F=ma', {
      ...base, lastAssistantAskedQuestion: true, lastSignalCorrectness: true,
    })
    expect(d.type).toBe('CONFIDENCE')
  })

  it('correct answer without confidence phrase → SUCCESS', () => {
    const d = classifyConversation('The acceleration is 5 m/s²', {
      ...base, lastAssistantAskedQuestion: true, lastSignalCorrectness: true,
    })
    expect(d.type).toBe('SUCCESS')
  })

  it('hedged answer → TENTATIVE_ANSWER', () => {
    const d = classifyConversation('maybe 12?', {
      ...base, lastAssistantAskedQuestion: true, hedged: true,
    })
    expect(d.type).toBe('TENTATIVE_ANSWER')
  })

  it('wrong answer → NEUTRAL with correction guidance', () => {
    const d = classifyConversation('The force is 20', {
      ...base, lastAssistantAskedQuestion: true, lastSignalCorrectness: false,
    })
    expect(d.type).toBe('NEUTRAL')
    expect(d.rendererDirective).toMatch(/good try/i)
  })

  it('direct question → DIRECT_QUESTION', () => {
    const d = classifyConversation('Why does gravity pull things down?', {
      ...base, studentIntent: 'asking_question',
    })
    expect(d.type).toBe('DIRECT_QUESTION')
  })

  it('bare acknowledgement → ACKNOWLEDGEMENT', () => {
    const d = classifyConversation('ok', {
      ...base, studentIntent: 'acknowledging',
    })
    expect(d.type).toBe('ACKNOWLEDGEMENT')
  })

  it('neutral message → NEUTRAL', () => {
    const d = classifyConversation('Let me think about that', base)
    expect(d.type).toBe('NEUTRAL')
  })
})

describe('conversation directive format', () => {
  it('produces a compact single-line directive', () => {
    const d: ConversationDecision = {
      type: 'CONFUSION',
      rendererDirective: 'The previous explanation did not land.',
    }
    const block = buildConversationDirective(d)
    expect(block).toContain('CONVERSATION')
    expect(block).toContain('CONFUSION')
    expect(block).toContain('respond to the student FIRST')
  })

  it('RECOVERY is excluded from the directive (recovery guard handles it)', () => {
    const d: ConversationDecision = {
      type: 'RECOVERY',
      rendererDirective: 'Recovery guard handles this turn.',
    }
    const block = buildConversationDirective(d)
    expect(block).toContain('RECOVERY')
  })
})

describe('real physics conversation replay', () => {
  it('student says "I don\'t get it" after an explanation → CONFUSION, not NEUTRAL', () => {
    const d = classifyConversation("I don't get it", {
      ...base, studentIntent: 'requesting_help', helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('CONFUSION')
    expect(d.rendererDirective).toMatch(/previous explanation/i)
    expect(d.rendererDirective).not.toMatch(/repeat/i)
  })

  it('student says "wait, so it\'s like pushing a cart?" → CONFIDENCE', () => {
    const d = classifyConversation("wait, so it's like pushing a cart?", {
      ...base, lastAssistantAskedQuestion: true, lastSignalCorrectness: true,
    })
    expect(d.type).toBe('CONFIDENCE')
  })

  it('student says "is it 9.8?" hesitantly → TENTATIVE_ANSWER', () => {
    const d = classifyConversation('is it 9.8?', {
      ...base, lastAssistantAskedQuestion: true, hedged: true,
    })
    expect(d.type).toBe('TENTATIVE_ANSWER')
    expect(d.rendererDirective).toMatch(/on the right track/i)
  })

  it('student says "what happens if there\'s no friction?" → CURIOSITY', () => {
    const d = classifyConversation("what happens if there's no friction?", base)
    expect(d.type).toBe('CURIOSITY')
    expect(d.rendererDirective).toMatch(/curious/i)
  })

  it('student says "why do I need to know about vectors?" → BOREDOM', () => {
    const d = classifyConversation('why do I need to know about vectors?', base)
    expect(d.type).toBe('BOREDOM')
  })

  it('student says "5 m/s²" correctly → SUCCESS with specific confirmation', () => {
    const d = classifyConversation('5 m/s²', {
      ...base, lastAssistantAskedQuestion: true, lastSignalCorrectness: true,
    })
    expect(d.type).toBe('SUCCESS')
    expect(d.rendererDirective).toMatch(/confirm briefly/i)
    expect(d.rendererDirective).toMatch(/because/i)
  })

  it('student asks "but why does mass not affect free fall?" → DIRECT_QUESTION', () => {
    const d = classifyConversation('but why does mass not affect free fall?', {
      ...base, studentIntent: 'asking_question',
    })
    expect(d.type).toBe('DIRECT_QUESTION')
    expect(d.rendererDirective).toMatch(/answer it first/i)
  })

  it('confusion + wrong answer → CONFUSION takes priority over wrong-answer NEUTRAL', () => {
    const d = classifyConversation("I don't understand, maybe 3?", {
      ...base,
      lastAssistantAskedQuestion: true,
      lastSignalCorrectness: false,
      studentIntent: 'requesting_help',
      helpRequestKind: 'explain_differently',
    })
    expect(d.type).toBe('CONFUSION')
  })

  it('the directive never says "wrong" or "incorrect"', () => {
    const d = classifyConversation('The answer is definitely 42', {
      ...base, lastAssistantAskedQuestion: true, lastSignalCorrectness: false,
    })
    expect(d.rendererDirective).not.toMatch(/\bwrong\b/i)
    expect(d.rendererDirective).not.toMatch(/\bincorrect\b/i)
  })
})
