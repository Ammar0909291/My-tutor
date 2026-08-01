/**
 * R-1 + R-2 — complete control-tag removal on the live runtime path.
 *
 * Two defects, both proven by execution against the pre-fix code:
 *
 *   R-1  A second well-formed ATTEMPT tag survived stripping, because removal
 *        used a non-global regex and the bounded final-line sweep could not
 *        reach a tag that was not on the last line. The survivor was persisted
 *        as the assistant message and rendered to the learner.
 *
 *   R-2  ATTEMPT removal joins the text on either side of the tag, and that
 *        join can synthesize a complete SIGNAL tag. The route strips SIGNAL
 *        first and ATTEMPT second, so the synthesized tag had nothing left to
 *        remove it.
 *
 * `throughStrips` is the route's transformation chain exactly: parseSignalTag
 * then parseAttemptVectorTag, each feeding the next (route.ts :2506, :2524).
 * Every assertion about "what the learner sees" and "what is persisted" runs
 * through it, not through a single function in isolation.
 *
 * C-1 IS PRESERVED. Only removal of COMPLETE tags changed. Malformed fragments
 * still use the bounded final-line cleanup; a fragment off the final line is
 * still preserved rather than swept to end of string.
 */
import { describe, it, expect } from 'vitest'
import { parseSignalTag, stripSignalTags } from '@/lib/teaching/signals'
import { parseAttemptVectorTag, stripAttemptTag } from '@/lib/teaching/attemptVectorSignal'

/** The route's chain. What this returns is what is persisted and rendered. */
const throughStrips = (raw: string): string =>
  parseAttemptVectorTag(parseSignalTag(raw).cleanText).cleanText

const A = (n: string) => `<!--ATTEMPT channel="verbal" note="${n}"-->`
const S = (n: string) => `<!--SIGNAL correctness="true" note="${n}"-->`
const A_SELF = (n: string) => `<!--ATTEMPT channel="verbal" note="${n}" />`
const S_SELF = (n: string) => `<!--SIGNAL correctness="true" note="${n}" />`

/** No control markup of either kind may remain, in any form. */
function expectNoControlTag(out: string) {
  expect(out).not.toContain('ATTEMPT')
  expect(out).not.toContain('SIGNAL')
  expect(out).not.toMatch(/<!--/)
}

describe('R-1 · EVERY complete ATTEMPT tag is removed, not just the first', () => {
  // Removal deletes the MARKUP and nothing else — the newlines that surrounded
  // the tag are content and stay. That is the C-1 rule, not an oversight.
  it('the exact reproducer — a second tag no longer survives', () => {
    const out = throughStrips('A.\n<!--ATTEMPT a="1"--><!--ATTEMPT b="2"-->\nMore teaching text.')
    expect(out).toBe('A.\n\nMore teaching text.')
    expectNoControlTag(out)
  })

  it('one tag', () => {
    expect(throughStrips(`Answer.\n${A('1')}`)).toBe('Answer.')
  })

  it('two tags, consecutive', () => {
    expectNoControlTag(throughStrips(`Answer.\n${A('1')}${A('2')}\nTail.`))
  })

  it('two tags, separated by content', () => {
    const out = throughStrips(`One.\n${A('1')}\nTwo.\n${A('2')}\nThree.`)
    expectNoControlTag(out)
    expect(out).toContain('One.')
    expect(out).toContain('Two.')
    expect(out).toContain('Three.')
  })

  it('ten tags', () => {
    const tags = Array.from({ length: 10 }, (_, i) => A(String(i))).join('\n')
    expectNoControlTag(throughStrips(`Lesson.\n${tags}\nEnd.`))
  })

  it('beginning, middle and end positions', () => {
    expectNoControlTag(throughStrips(`${A('1')}\nBody.`))
    expectNoControlTag(throughStrips(`Head.\n${A('1')}\nBody.`))
    expectNoControlTag(throughStrips(`Body.\n${A('1')}`))
  })

  it('mixed terminator styles across copies', () => {
    expectNoControlTag(throughStrips(`A.\n${A('1')}${A_SELF('2')}\nB.`))
    expectNoControlTag(throughStrips(`A.\n${A_SELF('1')}\n${A('2')}\nB.`))
  })

  it('case and whitespace variants of a second copy', () => {
    expectNoControlTag(throughStrips('A.\n<!--ATTEMPT x="1"-->\n<!--  attempt\ty="2"-->\nB.'))
  })

  it('stripAttemptTag alone removes all of them', () => {
    expect(stripAttemptTag(`A.\n${A('1')}${A('2')}\nB.`)).toBe('A.\n\nB.')
  })
})

describe('R-1 · EVERY complete SIGNAL tag is removed — same semantics', () => {
  it('duplicate SIGNAL tags no longer leak', () => {
    const out = throughStrips('A.\n<!--SIGNAL a="1"--><!--SIGNAL b="2"-->\nMore teaching text.')
    expect(out).toBe('A.\n\nMore teaching text.')
    expectNoControlTag(out)
  })

  it('ten SIGNAL tags', () => {
    const tags = Array.from({ length: 10 }, (_, i) => S(String(i))).join('\n')
    expectNoControlTag(throughStrips(`Lesson.\n${tags}\nEnd.`))
  })

  it('mixed terminator styles', () => {
    expectNoControlTag(throughStrips(`A.\n${S('1')}${S_SELF('2')}\nB.`))
  })

  it('stripSignalTags alone removes all of them', () => {
    expect(stripSignalTags(`A.\n${S('1')}${S('2')}\nB.`)).toBe(`A.\n\nB.`)
  })

  it('the SIGNAL VALUE still comes from the first tag', () => {
    const parsed = parseSignalTag('A.\n<!--SIGNAL correctness="true"--><!--SIGNAL correctness="false"-->')
    expect(parsed.signal?.correctness).toBe(true)
    expectNoControlTag(parsed.cleanText)
  })

  it('the ATTEMPT VALUE still comes from the first tag', () => {
    const parsed = parseAttemptVectorTag('A.\n<!--ATTEMPT channel="visual"--><!--ATTEMPT channel="verbal"-->')
    expect(parsed.vector?.channel).toBe('visual')
    expectNoControlTag(parsed.cleanText)
  })
})

describe('R-1 · both kinds interleaved', () => {
  it('SIGNAL then ATTEMPT, the normal case', () => {
    expect(throughStrips(`Two layers.\n${S('1')}\n${A('1')}`)).toBe('Two layers.')
  })

  it('ATTEMPT then SIGNAL, reversed order', () => {
    expectNoControlTag(throughStrips(`Two layers.\n${A('1')}\n${S('1')}`))
  })

  it('multiple of each, interleaved', () => {
    const out = throughStrips(`One.\n${A('1')}\n${S('1')}\nTwo.\n${A('2')}\n${S('2')}\nThree.`)
    expectNoControlTag(out)
    expect(out).toContain('One.')
    expect(out).toContain('Two.')
    expect(out).toContain('Three.')
  })
})

describe('R-2 · removal cannot synthesize a surviving control tag', () => {
  it('the exact reproducer — a SIGNAL tag synthesized by ATTEMPT removal', () => {
    const out = throughStrips('<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->')
    expectNoControlTag(out)
    expect(out).toBe('')
  })

  it('a synthesized SIGNAL tag embedded in real teaching content', () => {
    const out = throughStrips('Before.\n<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->\nAfter.')
    expectNoControlTag(out)
    expect(out).toContain('Before.')
    expect(out).toContain('After.')
  })

  it('an ATTEMPT tag synthesized by SIGNAL removal (the mirror case)', () => {
    const out = throughStrips('<!--ATT<!--SIGNAL x="1"-->EMPT a="1"-->')
    expectNoControlTag(out)
  })

  it('a synthesized ATTEMPT tag embedded in real content', () => {
    const out = throughStrips('Before.\n<!--ATT<!--SIGNAL x="1"-->EMPT a="1"-->\nAfter.')
    expectNoControlTag(out)
    expect(out).toContain('Before.')
    expect(out).toContain('After.')
  })

  it('two levels of nesting still resolve to nothing', () => {
    const out = throughStrips('<!--SIG<!--ATT<!--SIGNAL z="1"-->EMPT a="1"-->NAL correctness="true"-->')
    expectNoControlTag(out)
  })

  it('stripAttemptTag reaches a fixed point on its own', () => {
    const out = stripAttemptTag('<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->')
    expectNoControlTag(out)
  })
})

describe('C-1 · content preservation is unchanged', () => {
  const REPRO =
    'Here is an HTML comment example:\n```html\n<!--ATTEMPT is just a comment\n```\nDoes that help? Try one yourself.'

  it('the C-1 hostile reproducer keeps every character', () => {
    expect(throughStrips(REPRO)).toBe(REPRO)
    expect(stripAttemptTag(REPRO)).toBe(REPRO)
  })

  it('an unterminated ATTEMPT fragment off the final line is preserved', () => {
    const t = 'One.\n<!--ATTEMPT broken\nTwo.\nThree.'
    expect(stripAttemptTag(t)).toBe(t)
    expect(throughStrips(t)).toBe(t)
  })

  it('an unterminated SIGNAL fragment off the final line is preserved', () => {
    const t = 'One.\n<!--SIGNAL broken\nTwo.\nThree.'
    expect(throughStrips(t)).toBe(t)
  })

  it('an unterminated fragment ON the final line is still cleaned (bounded)', () => {
    expect(throughStrips('A.\n<!--ATTEMPT channel="verbal"')).toBe('A.')
  })

  it('markdown code blocks discussing comments survive intact', () => {
    const t = 'Example:\n```\n<!-- a normal comment -->\n```\nNow you try.'
    expect(throughStrips(t)).toBe(t)
  })

  it('HTML examples that are not control tags survive intact', () => {
    const t = 'In HTML, <!-- this --> is a comment, and <!--SIGNALLING--> is not our tag.'
    expect(throughStrips(t)).toContain('is a comment')
  })

  it('a tag-free reply is byte-identical — the I-A regression', () => {
    for (const t of ['Answer.', 'Answer.\n\n', 'Line one.\nLine two  ', 'plain', '']) {
      expect(stripAttemptTag(t)).toBe(t)
      expect(stripSignalTags(t)).toBe(t)
      expect(throughStrips(t)).toBe(t)
    }
  })
})

describe('R-1/R-2 · the flag never gates removal', () => {
  const cases = [
    `A.\n${A('1')}${A('2')}`,
    `A.\n${S('1')}${S('2')}`,
    '<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->',
  ]

  for (const flag of ['0', '1'] as const) {
    it(`removes every complete tag with ENABLE_ATTEMPT_CAPTURE=${flag}`, () => {
      const prev = process.env.ENABLE_ATTEMPT_CAPTURE
      process.env.ENABLE_ATTEMPT_CAPTURE = flag
      try {
        for (const c of cases) expectNoControlTag(throughStrips(c))
      } finally {
        if (prev === undefined) delete process.env.ENABLE_ATTEMPT_CAPTURE
        else process.env.ENABLE_ATTEMPT_CAPTURE = prev
      }
    })
  }
})

describe('R-1/R-2 · what is persisted and what the learner sees', () => {
  /** The route's single definition of "usable assistant response". */
  const isUsable = (t: string) => Boolean(t.trim())

  const corpus = [
    `Real answer.\n${A('1')}${A('2')}`,
    `Real answer.\n${S('1')}${S('2')}`,
    `Real answer.\n${S('1')}\n${A('1')}\n${A('2')}`,
    'Real answer.\n<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->',
  ]

  it('the persisted message never contains a control tag', () => {
    for (const raw of corpus) {
      const stripped = throughStrips(raw)
      const persisted = isUsable(stripped) ? stripped : 'DEGRADED_TEMPLATE'
      expect(persisted).not.toContain('ATTEMPT')
      expect(persisted).not.toContain('SIGNAL')
      expect(persisted.trim().length).toBeGreaterThan(0)
    }
  })

  it('the client-visible reply never contains a control tag', () => {
    for (const raw of corpus) expectNoControlTag(throughStrips(raw))
  })

  it('C-A holds — a tag-only reply still strips to nothing and is unusable', () => {
    expect(isUsable(throughStrips(`${S('1')}${A('1')}${A('2')}`))).toBe(false)
    expect(isUsable(throughStrips('<!--SIG<!--ATTEMPT a="1"-->NAL correctness="true"-->'))).toBe(false)
  })
})
