/**
 * THE STUB REPAIR THREW AWAY ITS TEACHING WITH ITS QUESTION.
 *
 * 2026-10-02 learner baseline (real account, chemistry Pure Substances, turn 1
 * "ok, continue"). Production log:
 *   gate-contract: reply was only "What do you notice about that arrow …?"
 *                  beside an authored card → withheld, 224 → 37 chars
 *   stub-repair:   source gate-contract, retry 496 chars, repaired:false,
 *                  reason repair-asked-a-question-beside-the-card
 * The learner got "Let me check your thinking with this." plus "Study it while
 * I explain." and no explanation. CL-1b (de205b61) discarded the whole retry
 * when it asked a question; its teaching sentences went with it.
 *
 * Now the retry's question sentences (and any home-made option lines) are
 * dropped and what is left is used when it is a real reply. The repair
 * instruction also names the right cause for a gate-contract cut.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { dropQuestionSentences, needsRepair, buildConfirmBackRepairAppendix } from '@/lib/teaching/confirmBackRepair'

const RETRY =
  'A pure substance has only one kind of particle, like an element or a single compound. ' +
  'A mixture has two or more substances that are not chemically joined. ' +
  'The figure shows the steps: first decide the mixture type, then pick a way to separate it. ' +
  'What do you think the first step tells you?'

describe('dropQuestionSentences', () => {
  it('keeps the teaching and removes the question', () => {
    const out = dropQuestionSentences(RETRY)
    expect(out).not.toContain('?')
    expect(out).toContain('A pure substance has only one kind of particle')
    expect(out).toContain('then pick a way to separate it.')
    expect(needsRepair(out)).toBe(false)
  })

  it('removes home-made option lines with the question', () => {
    const out = dropQuestionSentences('Salt water is a mixture of two substances that stay unchanged.\n\nWhich is pure?\nA) Air\nB) Water')
    expect(out).toBe('Salt water is a mixture of two substances that stay unchanged.')
  })

  it('a reply that is only a question leaves a stub', () => {
    expect(needsRepair(dropQuestionSentences('What do you notice about the arrow in the figure?'))).toBe(true)
  })

  it('text with no question is unchanged', () => {
    const t = 'Distillation separates water from salt. The water boils off and is collected.'
    expect(dropQuestionSentences(t)).toBe(t)
  })
})

describe('the repair instruction names the real cause', () => {
  it('a gate-contract cut is not described as a confirm-back', () => {
    const a = buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null, questionFollows: true, cause: 'question-cut' })
    expect(a).not.toMatch(/restated the learner/i)
    expect(a).toMatch(/question card/i)
  })

  it('the confirm-back wording is unchanged', () => {
    const a = buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null })
    expect(a).toMatch(/restated the learner/i)
  })
})

describe('route wiring', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  const body = ROUTE.slice(ROUTE.indexOf('const repairStubReply = async'), ROUTE.indexOf('const merged = mergeRepair(stub, retryText)'))

  it('a retry with a question beside the card is trimmed, not discarded outright', () => {
    expect(body).toContain('dropQuestionSentences(retryText)')
  })

  it('the gate-contract source asks with its own cause', () => {
    expect(body).toMatch(/cause: source === 'gate-contract' \? 'question-cut' : 'confirm-back'/)
  })
})
