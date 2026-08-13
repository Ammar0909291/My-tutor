import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { appendMcqToHistoryText, parseMcqTag, type TutorMCQ } from '@/lib/teaching/mcq'

/**
 * PART C — MCQ QUESTIONS MUST SURVIVE HISTORY RECONSTRUCTION.
 *
 * ── THE DEFECT ───────────────────────────────────────────────────────────────
 * `parseMcqTag` strips the raw `<!--MCQ q="..." a="..." ...-->` control tag
 * out of the tutor's text — correctly: a learner must never see the machine
 * tag. But the parsed question and options then lived ONLY in that one
 * turn's JSON `mcq` field, which route.ts never persisted anywhere — not on
 * the Message row, not in a second table. `Message.content` got the
 * tag-stripped prose and nothing else. A learner who answered a question and
 * later refreshed (or logged back in) saw the tutor's message with the
 * actual question simply missing — the exact "second channel that never
 * reaches durable storage" shape as the diagram-persistence bug, on a
 * different field.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────────
 * `appendMcqToHistoryText` bakes a plain-text rendering of the question and
 * its options onto what route.ts WRITES to `content`, reusing the one
 * existing conversation-history mechanism (per the standing "no parallel
 * MCQ persistence path" rule) instead of adding a new column or table. The
 * live JSON response the client renders this turn is built from the
 * un-appended clean text directly, so the tappable wizard a learner sees in
 * the moment is unaffected — only a later reload of `content` ever shows
 * this text.
 */

const OPT = ['1/4', '3/4', '2/6', '1/6']
const mcq: TutorMCQ = { question: 'What is 1/2 + 1/4?', options: OPT, correctIndex: 1 }

describe('appendMcqToHistoryText', () => {
  it('a turn with no MCQ is returned unchanged', () => {
    expect(appendMcqToHistoryText('Here is the explanation.', null)).toBe('Here is the explanation.')
  })

  it('appends the question and every option, in order, after an MCQ turn', () => {
    const out = appendMcqToHistoryText('Let’s check your understanding.', mcq)
    // Anti-vacuity: the exact literal text, not merely "is longer" or
    // "contains something".
    expect(out).toBe(
      'Let’s check your understanding.\n\nWhat is 1/2 + 1/4?\nA) 1/4\nB) 3/4\nC) 2/6\nD) 1/6',
    )
  })

  it('the original clean prose is preserved verbatim as a prefix', () => {
    const prose = 'A worked example, then the check.'
    const out = appendMcqToHistoryText(prose, mcq)
    expect(out.startsWith(prose)).toBe(true)
  })

  it('every option text is present and none is dropped or reordered', () => {
    const out = appendMcqToHistoryText('x', mcq)
    OPT.forEach((opt, i) => {
      expect(out).toContain(`${String.fromCharCode(65 + i)}) ${opt}`)
    })
  })

  it('the question text itself is present', () => {
    const out = appendMcqToHistoryText('x', mcq)
    expect(out).toContain(mcq.question)
  })

  it('does not reveal which option is correct', () => {
    const out = appendMcqToHistoryText('x', mcq)
    // The correct index (1, i.e. "B") must not be marked in any way a plain
    // reader could pick out — no asterisk, no "(correct)", no leading marker
    // distinguishing B's line from the others.
    expect(out).not.toMatch(/correct/i)
    expect(out).not.toMatch(/\*\s*B\)/)
    expect(out).not.toMatch(/B\).*[✓✔]/)
  })

  it('a two-option MCQ (true/false shape) appends exactly two lines', () => {
    const twoOption: TutorMCQ = { question: 'Is 7 prime?', options: ['Yes', 'No'], correctIndex: 0 }
    const out = appendMcqToHistoryText('x', twoOption)
    expect(out).toBe('x\n\nIs 7 prime?\nA) Yes\nB) No')
  })

  it('composes correctly with the real parser: parse, strip, then re-append', () => {
    const raw = 'Nice work.\n<!--MCQ q="What is 2+2?" a="3" b="4" c="5" correct="B"-->'
    const { mcq: parsed, cleanText } = parseMcqTag(raw)
    expect(parsed).not.toBeNull()
    // The tag must be gone from the clean text (unaffected by this fix).
    expect(cleanText).not.toMatch(/<!--\s*MCQ/i)
    const persisted = appendMcqToHistoryText(cleanText, parsed)
    expect(persisted).toContain('What is 2+2?')
    expect(persisted).toContain('A) 3')
    expect(persisted).toContain('B) 4')
    expect(persisted).toContain('C) 5')
  })

  it('idempotent shape: appending twice would be visibly wrong, and the function never does it on its own', () => {
    // appendMcqToHistoryText has no internal state — calling it once per
    // turn (as route.ts does) can never double-append. This pins that a
    // single call produces exactly one occurrence of the question.
    const out = appendMcqToHistoryText('x', mcq)
    const occurrences = out.split(mcq.question).length - 1
    expect(occurrences).toBe(1)
  })
})

// ── SOURCE ASSERTION — route.ts actually persists this, and the LIVE
// response is unaffected ──────────────────────────────────────────────────
const ROUTE = path.join(process.cwd(), 'src/app/api/learn/chat/route.ts')
const routeSrc = readFileSync(ROUTE, 'utf8')

describe('route.ts wiring: appendMcqToHistoryText persisted, live response untouched', () => {
  it('imports and calls appendMcqToHistoryText to build what gets written', () => {
    expect(routeSrc).toMatch(/appendMcqToHistoryText\(cleanText, mcqHoisted\)/)
  })

  it('the message.create write uses the appended content, not the bare clean text', () => {
    expect(routeSrc).toMatch(/content: contentForHistory, provider/)
    expect(routeSrc).toMatch(/data: \{ sessionId, role: MessageRole\.ASSISTANT, content: contentForHistory \}/)
  })

  it('the JSON response to the client still sends the clean (un-appended) text — the live wizard is unaffected', () => {
    expect(routeSrc).toMatch(/success: true, text: cleanText, provider/)
  })
})
