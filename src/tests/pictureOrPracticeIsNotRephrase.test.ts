/**
 * A request for a picture or for practice is not "teach me again differently".
 * Production 2026-09-29 (phys.em.kirchhoffs-laws): "i see no arrow in picture.
 * can you give me new question to practice?" was read as REPHRASE_REQUEST and
 * answered with a canned remediation card that addressed neither request.
 */
import { describe, it, expect } from 'vitest'
import { classifyConversation } from '@/lib/teaching/conversationDecision'
import { isRemediationTurn } from '@/lib/teaching/remediationOutputContract'

const base = {
  recoveryKey: null,
  studentIntent: 'requesting_help' as string,
  lastAssistantAskedQuestion: false,
  lastSignalCorrectness: null as boolean | null,
  hedged: false,
  helpRequestKind: null as string | null,
}

describe('picture and practice requests are not remediation turns', () => {
  it.each([
    ['i see no arrow in picture. can you give me new question to practice?', 'diagram'],
    ['show me a diagram please', 'diagram'],
    ['give me a practice question', null],
  ])('%j', (msg, kind) => {
    const d = classifyConversation(msg, { ...base, helpRequestKind: kind })
    expect(d.type).not.toBe('REPHRASE_REQUEST')
    expect(d.type).not.toBe('CONFUSION')
    expect(isRemediationTurn(d.type)).toBe(false)
  })

  it('confusion still wins over a picture request', () => {
    const d = classifyConversation("i don't understand, show me a picture", { ...base, helpRequestKind: 'diagram' })
    expect(d.type).toBe('CONFUSION')
  })

  it('asking for another explanation is still a rephrase', () => {
    const d = classifyConversation('explain it another way', { ...base, helpRequestKind: 'explain_differently' })
    expect(d.type).toBe('REPHRASE_REQUEST')
  })

  it('a real-life-example request keeps its old reading', () => {
    const d = classifyConversation('give me a real life example', { ...base, helpRequestKind: 'real_life_example' })
    expect(d.type).toBe('REPHRASE_REQUEST')
  })
})
