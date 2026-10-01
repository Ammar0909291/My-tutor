/**
 * `<!--SIGNAL … phrase="…">` (bare `>` close) is still a SIGNAL tag
 * (2026-09-28, physics certification unit 3, phys.opt.single-slit r2 s7: it
 * reached the learner verbatim).
 */
import { describe, it, expect } from 'vitest'
import { parseSignalTag, stripSignalTags } from '@/lib/teaching/signals'

const LEAKED = 'So the secondary bands are dimmer.    <!--SIGNAL correctness="false" confidence="high" confusion="true" phrase="secondary maxima are brighter">'

describe('bare-close SIGNAL tag', () => {
  it('is stripped', () => expect(stripSignalTags(LEAKED).trim()).toBe('So the secondary bands are dimmer.'))
  it('is parsed, last attribute included', () => {
    expect(parseSignalTag(LEAKED).signal).toMatchObject({ correctness: false, confidence: 'high', confusion: true, phrase: 'secondary maxima are brighter' })
  })
  it('the standard forms are unchanged', () => {
    expect(stripSignalTags('A.<!--SIGNAL correctness="true"-->')).toBe('A.')
    expect(stripSignalTags('A.<!--SIGNAL correctness="true"/>')).toBe('A.')
  })
  it('an unrelated ">" in prose after a tag-less quote is untouched', () => {
    const t = 'He said "x" > y.'
    expect(stripSignalTags(t)).toBe(t)
  })
})
