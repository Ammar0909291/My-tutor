/**
 * THE QA INSTRUMENT MUST NOT SEND INPUT NO HUMAN WOULD TYPE.
 *
 * Seven times in this repository an instrument has been on the verge of
 * condemning working code. The `cedd8cc` repair fixed one half of this
 * generator — it stopped STRIPPING characters, so `v = ωr` no longer became
 * `v 2 r`. It left the other half: TRUNCATION. Cutting an option at a word
 * boundary still produces fragments, and the clean Phase E run sent two:
 *
 *     "maybe 1 khz × (1 +"
 *     "i think it is from the same side as the"
 *
 * The first graded WRONG on a turn the harness intended to answer CORRECTLY,
 * which cost the learner a rung and made that lesson unmeasurable.
 *
 * These tests define what a real weak learner's echo may look like. They are
 * written against the generator as it stands (a verbatim copy of cedd8cc's) and
 * FAIL on it — the malformed-fragment cases are the ones that fail.
 *
 * QA-only. No production code is involved.
 */
import { describe, it, expect } from 'vitest'
import {
  echoOption, weakCorrectAnswer, weakWrongAnswer,
} from '../../scripts/qa/weakLearnerAnswers'

/** Real option strings, taken verbatim from live Phase D/E transcripts. */
const REAL_OPTIONS: string[] = [
  'v = ωr',
  '2.0',
  '1 kHz × (1 + v/c)',
  'from the same side as the leaving group',
  "MgO's ions carry a higher charge",
  '3.1 m/s',
  'Trigonal pyramidal',
  '10.96 MHz',
  '120 kJ mol^-1',
  'x = L/3',
  'The equilibrium shifts toward N₂ and H₂',
  'τ = r × F × sin θ',
  '480 Hz',
  'Linear',
  'A backside attack that inverts the stereocentre',
  'ψ_n(x) = √(2/L) · sin(nπx/L)',
  'Both increase together',
  '0.5',
]

// ── the contract a generated answer must satisfy ────────────────────────────

const OPENERS = /^(i think it is|maybe|sir i think|[A-D]\.)\s*/i
const TRAILING_HEDGE = /\s*(sir|but sir i not fully sure)\s*$/i

/** The learner's own words, with the hedge stripped — what they echoed. */
function echoedPart(answer: string): string {
  return answer.replace(OPENERS, '').replace(TRAILING_HEDGE, '').trim()
}

function bracketsBalanced(s: string): boolean {
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  const stack: string[] = []
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch)
    else if (ch in pairs) { if (stack.pop() !== pairs[ch]) return false }
  }
  return stack.length === 0
}

/** Ends on something that obviously has more to come. */
const DANGLING_END =
  /(?:[+\-×*/=^±·√]|\b(?:the|a|an|of|to|from|as|and|or|is|are|was|were|with|for|in|on|at|by|than|that|this|these|those|same|its|it|which|who|when|while|but|so|if|into|onto|per|over|under)\b)\s*$/i

function malformedReason(answer: string): string | null {
  const echo = echoedPart(answer)
  if (!echo) return null                       // a bare letter answer — fine
  if (!bracketsBalanced(echo)) return `unbalanced brackets: "${echo}"`
  if (DANGLING_END.test(echo)) return `dangles mid-thought: "${echo}"`
  return null
}

// ── A. NEGATIVE TESTS — the generator may never emit a fragment ─────────────
describe('A. no generated answer is a malformed fragment', () => {
  it.each(REAL_OPTIONS)('correct-answer forms for option %j', (opt) => {
    const options = ['decoy one', opt, 'decoy two']
    for (let variant = 0; variant < 4; variant++) {
      const said = weakCorrectAnswer(options, 1, variant)
      expect(malformedReason(said), `variant ${variant} -> ${said}`).toBeNull()
    }
  })

  it.each(REAL_OPTIONS)('wrong-answer form for option %j', (opt) => {
    const options = [opt, 'the correct one']
    const said = weakWrongAnswer(options, 1)
    expect(malformedReason(said), said).toBeNull()
  })

  it('the two fragments the live run actually sent can no longer be produced', () => {
    const a = weakCorrectAnswer(['decoy', '1 kHz × (1 + v/c)'], 1, 2)
    expect(a).not.toMatch(/\(\s*1\s*\+\s*$/)
    expect(malformedReason(a), a).toBeNull()
    const b = weakWrongAnswer(['from the same side as the leaving group', 'other'], 1)
    expect(b).not.toMatch(/\bas the\s*$/)
    expect(malformedReason(b), b).toBeNull()
  })
})

// ── B. NOTATION AND NUMBERS SURVIVE ─────────────────────────────────────────
describe('B. mathematics and numbers survive intact', () => {
  it('a short formula option is echoed whole', () => {
    for (const opt of ['v = ωr', 'τ = r × F × sin θ', 'x = L/3', '1 kHz × (1 + v/c)']) {
      const said = weakCorrectAnswer(['decoy', opt], 1, 0)
      expect(echoedPart(said).replace(/\s+/g, ' ')).toBe(opt.toLowerCase().replace(/\s+/g, ' '))
    }
  })

  it('a numeric value is never split', () => {
    for (const opt of ['2.0', '3.1 m/s', '10.96 MHz', '480 Hz', '0.5', '120 kJ mol^-1']) {
      const said = weakCorrectAnswer(['decoy', opt], 1, 2)
      // every digit-bearing token in the option appears whole in the answer
      for (const tok of opt.split(/\s+/).filter((t) => /\d/.test(t))) {
        expect(said.toLowerCase()).toContain(tok.toLowerCase())
      }
    }
  })

  it('mathematical symbols are preserved, not stripped', () => {
    const said = weakCorrectAnswer(['decoy', 'ψ_n(x) = √(2/L) · sin(nπx/L)'], 1, 0)
    for (const sym of ['ψ', '√', '·', 'π', '=', '(', ')', '/']) {
      expect(said).toContain(sym)
    }
  })
})

// ── C. NOTHING IS INVENTED ──────────────────────────────────────────────────
describe('C. the learner only echoes what is on screen', () => {
  const HEDGE_WORDS = new Set(['i', 'think', 'it', 'is', 'maybe', 'sir', 'but', 'not', 'fully', 'sure', 'a', 'b', 'c', 'd', 'a.', 'b.', 'c.', 'd.'])
  it.each(REAL_OPTIONS)('every echoed word comes from option %j', (opt) => {
    const inOption = new Set(opt.toLowerCase().split(/\s+/))
    for (let variant = 0; variant < 4; variant++) {
      const said = weakCorrectAnswer(['decoy', opt], 1, variant)
      for (const w of said.toLowerCase().split(/\s+/)) {
        if (HEDGE_WORDS.has(w)) continue
        expect(inOption.has(w), `invented "${w}" in "${said}"`).toBe(true)
      }
    }
  })
})

// ── D. THE PERSONA IS UNCHANGED ─────────────────────────────────────────────
describe('D. it still sounds like the same weak learner', () => {
  it('every form opens the way that learner opens', () => {
    for (let v = 0; v < 4; v++) {
      expect(weakCorrectAnswer(['x', 'Linear'], 1, v)).toMatch(OPENERS)
    }
    expect(weakWrongAnswer(['Linear', 'x'], 1)).toMatch(OPENERS)
  })

  it('prose is lowercase, hedged and unpunctuated the way they type', () => {
    const said = weakCorrectAnswer(['x', 'Trigonal pyramidal'], 1, 0)
    expect(said).toBe('i think it is trigonal pyramidal sir')
  })

  it('the bare-letter forms are untouched', () => {
    expect(weakCorrectAnswer(['x', 'y'], 1, 1)).toBe('B. but sir i not fully sure')
    expect(weakCorrectAnswer(['x', 'y'], 1, 3)).toBe('sir i think B')
  })

  it('the wrong answer still picks a genuinely wrong option', () => {
    const options = ['Linear', 'Trigonal pyramidal']
    expect(weakWrongAnswer(options, 1).toLowerCase()).toContain('linear')
  })
})

// ── E. echoOption ITSELF ────────────────────────────────────────────────────
describe('E. the echo helper', () => {
  it('returns a short option whole rather than truncating it', () => {
    expect(echoOption('1 kHz × (1 + v/c)', 5)).toBe('1 kHz × (1 + v/c)')
  })

  it('when it must shorten, it stops somewhere a person would stop', () => {
    const long = 'a backside attack that inverts the stereocentre and gives inversion of configuration'
    const out = echoOption(long, 6)
    expect(bracketsBalanced(out)).toBe(true)
    expect(DANGLING_END.test(out), `dangles: "${out}"`).toBe(false)
    expect(long.startsWith(out)).toBe(true)   // a prefix, never invented
  })

  it('never returns an empty echo for a non-empty option', () => {
    for (const opt of REAL_OPTIONS) expect(echoOption(opt, 5).length).toBeGreaterThan(0)
  })
})
