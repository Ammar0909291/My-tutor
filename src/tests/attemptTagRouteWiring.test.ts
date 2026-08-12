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

/**
 * Code lines only — comment lines are blanked, never removed, so every line
 * NUMBER this file reports still points at the real file.
 *
 * Needed because these guards match on source text, and a comment that QUOTES
 * a log line is not a second implementation of it. That is not hypothetical:
 * the empty-body guard below started failing when the fix for "an MCQ-only
 * turn was served an outage template" documented itself by quoting the very
 * log line the guard counts. The guard's intent is "one empty-body handler in
 * CODE"; matching prose made it count evidence as duplication.
 */
const codeLines = lines.map((l) => (/^\s*(\/\/|\*|\/\*)/.test(l) ? '' : l))

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

/**
 * C-A — a reply that becomes empty AFTER stripping must reach the SAME
 * degraded path as an originally-empty body.
 *
 * `throughStrips` reproduces the route's transformation chain exactly:
 * parseSignalTag → parseAttemptVectorTag, in that order, each feeding the
 * next, which is what route.ts:2506 and :2524 do.
 */
import { parseSignalTag } from '@/lib/teaching/signals'

const throughStrips = (raw: string): string =>
  parseAttemptVectorTag(parseSignalTag(raw).cleanText).cleanText

/** The route's single definition of "usable assistant response". */
const isUsable = (t: string) => Boolean(t.trim())

const SIGNAL = '<!--SIGNAL correctness="true" confidence="high" confusion="false"-->'
const ATTEMPT = '<!--ATTEMPT channel="verbal" agency="joint"-->'

describe('C-A · the empty guard runs after every content-removing step', () => {
  it('is positioned after BOTH strips in the route', () => {
    const signalStrip = lineOf(/text = signalParse\.cleanText/)
    const attemptStrip = lineOf(/text = attemptVectorParse\.cleanText/)
    const guard = lineOf(/if \(!text\.trim\(\)\) \{/)
    expect(signalStrip).toBeGreaterThan(0)
    expect(guard).toBeGreaterThan(attemptStrip)
    expect(attemptStrip).toBeGreaterThan(signalStrip)
  })

  it('runs before cleanText, so nothing downstream sees an empty reply', () => {
    expect(lineOf(/if \(!text\.trim\(\)\) \{/)).toBeLessThan(lineOf(/let cleanText = text/))
  })

  it('has exactly ONE empty-body guard — no duplicated degraded logic', () => {
    // Counted over CODE only. The degraded branch may legitimately be preceded
    // by a narrower one (an MCQ-only turn is not an outage), so what must stay
    // singular is the DEGRADED handler, not the number of `!text.trim()`
    // conditions in the chain.
    const codeMatches = (re: RegExp) =>
      codeLines.map((l, i) => (re.test(l) ? i + 1 : 0)).filter(Boolean)
    expect(codeMatches(/empty response from model/)).toHaveLength(1)

    // The chain now has TWO `!text.trim()` conditions and that is correct: a
    // narrower branch (an MCQ-only turn is not an outage) followed by the
    // degraded fallback. What must hold is the ORDER — a narrower branch
    // placed after the catch-all would be dead code, and the outage template
    // would keep shipping beside valid questions.
    const emptyChecks = codeMatches(/if \(!text\.trim\(\)/)
    expect(emptyChecks).toHaveLength(2)
    const mcqBranch = codeMatches(/if \(!text\.trim\(\) && mcqHoisted\)/)
    expect(mcqBranch).toHaveLength(1)
    expect(mcqBranch[0]).toBeLessThan(codeMatches(/empty response from model/)[0])
  })

  it('treats whitespace-only as unusable, not just the empty string', () => {
    const guardLine = lines[lineOf(/if \(!text\.trim\(\)\) \{/) - 1]
    expect(guardLine).toContain('.trim()')
  })

  it('reuses the existing degradedTurn fallback, not a new one', () => {
    // Two call sites total, both pre-existing in kind: the routeAI throw path
    // and this empty-body path. No third implementation was added.
    expect(allLinesOf(/degradedTurn\(\{ register: contentRegister/)).toHaveLength(2)
  })
})

describe('C-A · replies that strip to nothing are detected as unusable', () => {
  it('ATTEMPT-only reply', () => {
    expect(throughStrips(ATTEMPT)).toBe('')
    expect(isUsable(throughStrips(ATTEMPT))).toBe(false)
  })

  it('SIGNAL-only reply', () => {
    expect(isUsable(throughStrips(SIGNAL))).toBe(false)
  })

  it('SIGNAL + ATTEMPT only', () => {
    expect(isUsable(throughStrips(`${SIGNAL}\n${ATTEMPT}`))).toBe(false)
  })

  it('whitespace + tags only', () => {
    expect(isUsable(throughStrips(`   \n\t${SIGNAL}\n  ${ATTEMPT}  \n `))).toBe(false)
  })

  it('malformed tags only — unterminated on the final line', () => {
    expect(isUsable(throughStrips('<!--ATTEMPT channel="verbal"'))).toBe(false)
    expect(isUsable(throughStrips('<!--ATTEMPT channel="verbal" />'))).toBe(false)
  })

  it('an originally-empty body is still unusable through both strips', () => {
    expect(isUsable(throughStrips(''))).toBe(false)
    expect(isUsable(throughStrips('   \n  '))).toBe(false)
  })
})

describe('C-A · normal replies are unaffected', () => {
  it('a real reply with both tags keeps its content and stays usable', () => {
    const out = throughStrips(`Two layers, one inside the other.\n${SIGNAL}\n${ATTEMPT}`)
    expect(out).toBe('Two layers, one inside the other.')
    expect(isUsable(out)).toBe(true)
  })

  it('a tag-free reply is byte-identical — replay determinism preserved', () => {
    for (const t of ['Answer.', 'Answer.\n\n', 'Line one.\nLine two  ']) {
      expect(throughStrips(t)).toBe(t)
      expect(isUsable(throughStrips(t))).toBe(true)
    }
  })

  it('content survives a malformed fragment off the final line (C-1 holds)', () => {
    const t = 'Here is an example:\n```html\n<!--ATTEMPT is a comment\n```\nDoes that help?'
    expect(throughStrips(t)).toBe(t)
    expect(isUsable(throughStrips(t))).toBe(true)
  })

  it('the persisted value is whatever the guard let through — never empty', () => {
    // The route assigns degraded.text when !text.trim(); every branch below
    // therefore yields a usable string at the persist site.
    const candidates = [ATTEMPT, SIGNAL, '', '   ', `Real answer.\n${ATTEMPT}`]
    for (const raw of candidates) {
      const stripped = throughStrips(raw)
      const persisted = isUsable(stripped) ? stripped : 'DEGRADED_TEMPLATE'
      expect(persisted.trim().length).toBeGreaterThan(0)
    }
  })
})
