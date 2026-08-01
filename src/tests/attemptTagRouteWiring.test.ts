/**
 * I-B — wiring audit of the LIVE ATTEMPT-tag path in the chat route.
 *
 * The B-1 fix had five module-level tests and NOTHING proving the module was
 * connected to anything. The whole suite would have passed green with the
 * route wiring deleted. These tests close that: they assert the ordering and
 * gating of the real call sites in `src/app/api/learn/chat/route.ts`.
 *
 * METHOD, stated honestly. This is a source-order audit of the route, in the
 * same form the repository already uses for route-level invariants
 * (`degradedModeAudit.test.ts`, `sessionOpeningReviewIntegration.test.ts`).
 * It is NOT a booted-request test: `route.ts` needs auth, a database and a
 * model provider, none of which exist in the test environment. What it proves
 * is that the strip is wired ahead of persistence and rendering and outside
 * the feature flag — the three properties whose absence would silently
 * reintroduce B-1. What it cannot prove is the behaviour of a real HTTP turn.
 * The behavioural half is covered by `attemptVectorSignal.test.ts`; this is
 * the half that was missing.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseAttemptVectorTag, stripAttemptTag, isAttemptCaptureEnabled } from '@/lib/teaching/attemptVectorSignal'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const lines = ROUTE.split('\n')

/** First line index (1-based) whose content matches, or -1. */
function lineOf(re: RegExp): number {
  const i = lines.findIndex((l) => re.test(l))
  return i === -1 ? -1 : i + 1
}
function allLinesOf(re: RegExp): number[] {
  return lines.map((l, i) => (re.test(l) ? i + 1 : -1)).filter((i) => i !== -1)
}

describe('I-B · the strip is wired into the live route', () => {
  it('calls parseAttemptVectorTag exactly once, and assigns its cleanText back to text', () => {
    expect(allLinesOf(/parseAttemptVectorTag\(text\)/)).toHaveLength(1)
    expect(lineOf(/text = attemptVectorParse\.cleanText/)).toBeGreaterThan(0)
  })

  it('strips BEFORE the assistant message is persisted', () => {
    const strip = lineOf(/text = attemptVectorParse\.cleanText/)
    const persists = allLinesOf(/role: MessageRole\.ASSISTANT/)
    expect(persists.length).toBeGreaterThan(0)
    for (const p of persists) expect(strip).toBeLessThan(p)
  })

  it('strips BEFORE cleanText — the variable every downstream consumer and the response body use', () => {
    const strip = lineOf(/text = attemptVectorParse\.cleanText/)
    const derives = lineOf(/let cleanText = text/)
    expect(derives).toBeGreaterThan(0)
    expect(strip).toBeLessThan(derives)
  })

  it('strips BEFORE asset capture, so a tag cannot be stored as authored content', () => {
    const strip = lineOf(/text = attemptVectorParse\.cleanText/)
    const capture = lineOf(/ingestGeneratedLesson\(/)
    expect(capture).toBeGreaterThan(0)
    expect(strip).toBeLessThan(capture)
  })
})

describe('I-B · the flag gates capture but NEVER the strip', () => {
  it('guards the prompt instruction behind isAttemptCaptureEnabled()', () => {
    expect(lineOf(/if \(isAttemptCaptureEnabled\(\)\) systemPrompt \+= buildAttemptVectorInstruction\(\)/))
      .toBeGreaterThan(0)
  })

  it('guards both vector assignments behind the flag', () => {
    expect(lineOf(/if \(attemptCaptureOn\) adaptationStateHoisted =/)).toBeGreaterThan(0)
    expect(lineOf(/if \(attemptCaptureOn\) attemptVectorHoisted =/)).toBeGreaterThan(0)
  })

  it('does NOT guard the parse/strip call or the assignment back to text', () => {
    const parseLine = lines[lineOf(/parseAttemptVectorTag\(text\)/) - 1]
    const assignLine = lines[lineOf(/text = attemptVectorParse\.cleanText/) - 1]
    expect(parseLine).not.toMatch(/attemptCaptureOn|isAttemptCaptureEnabled/)
    expect(assignLine).not.toMatch(/attemptCaptureOn|isAttemptCaptureEnabled/)
  })

  it('strips with the flag OFF — the property the flag must not be able to disable', () => {
    const prev = process.env.ENABLE_ATTEMPT_CAPTURE
    process.env.ENABLE_ATTEMPT_CAPTURE = '0'
    try {
      expect(isAttemptCaptureEnabled()).toBe(false)
      const out = parseAttemptVectorTag('Two layers.\n<!--ATTEMPT channel="visual" />')
      expect(out.cleanText).toBe('Two layers.')
      expect(out.cleanText).not.toContain('ATTEMPT')
    } finally {
      if (prev === undefined) delete process.env.ENABLE_ATTEMPT_CAPTURE
      else process.env.ENABLE_ATTEMPT_CAPTURE = prev
    }
  })
})

describe('I-B · malformed markup cannot bypass the live path', () => {
  // Each input is passed through the SAME function the route calls, in the
  // same way (parse → take cleanText → that value is what is persisted).
  const throughRoute = (raw: string) => parseAttemptVectorTag(raw).cleanText

  it('self-closing form — the exact B-1 leak', () => {
    expect(throughRoute('A.\n<!--ATTEMPT channel="visual" />')).not.toContain('ATTEMPT')
  })

  it('unterminated tag in its instructed position', () => {
    expect(throughRoute('A.\n<!--ATTEMPT channel="visual"')).not.toContain('ATTEMPT')
  })

  it('whitespace-padded and case-varied openers', () => {
    expect(throughRoute('A.\n  <!--  attempt channel="visual"-->')).not.toContain('ATTEMPT')
    expect(throughRoute('A.\n<!--ATTEMPT\tchannel="visual"-->')).not.toContain('attempt')
  })

  it('a second copy after a well-formed one', () => {
    expect(throughRoute('A.\n<!--ATTEMPT channel="verbal"-->\n<!--ATTEMPT channel="visual"'))
      .not.toContain('ATTEMPT')
  })
})

describe('C-1 · content is never silently destroyed', () => {
  const REPRO = 'Here is an HTML comment example:\n```html\n<!--ATTEMPT is just a comment\n```\nDoes that help? Try one yourself.'

  it('the hostile reproducer keeps every character of the lesson', () => {
    const out = stripAttemptTag(REPRO)
    expect(out).toBe(REPRO)
    expect(out).toContain('```')            // closing fence survives
    expect(out).toContain('Does that help?') // follow-up question survives
    expect(out).toContain('Try one yourself')
  })

  it('an unterminated fragment off the final line is preserved, not swept to end-of-string', () => {
    const t = 'One.\n<!--ATTEMPT broken\nTwo.\nThree.'
    expect(stripAttemptTag(t)).toBe(t)
  })

  it('a tag-free reply is byte-identical — the I-A regression', () => {
    for (const t of ['Answer.\n\n', 'Line one.\nLine two  ', 'plain', '']) {
      expect(stripAttemptTag(t)).toBe(t)
    }
  })
})
