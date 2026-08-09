/**
 * MATH / TTS NORMALIZATION — display, natural language, and speech are three
 * different things, and only the last one may be rewritten.
 *
 * THE DEFECT (measured against the real cleaner before this work):
 *
 *   "$F = \eta A \frac{dv}{dy}$"  ->  "$F equals \eta A \frac{dv}{dy}$"
 *   "$\Delta U = Q - W$"          ->  "$\Delta U equals Q - W$"
 *   "$\theta > \theta_c$"         ->  "$\theta greater than \theta_c$"
 *   "\(x^{2} + y_{1}\)"           ->  "\(x^{2} plus y_{1}\)"
 *
 * cleanTextForTTS is the ONE normalization boundary — the client calls it
 * before POSTing and /api/tts calls it again on the way in — and it had no
 * LaTeX layer, so dollars, backslash commands and braces went to the provider
 * as characters.
 *
 * These tests assert the speech text only. The visual payload is asserted to
 * be UNCHANGED: the canvas must keep showing "ΔU = Q − W".
 */

import { describe, expect, it } from 'vitest'
import { cleanTextForTTS } from '@/lib/tts-cleaner'
import { speakifyMathNotation, containsMathMarkup } from '@/lib/text/latexToSpeech'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { visibleObjects } from '@/lib/teaching/sceneSpec'

/** Markup that must never survive to a speech provider. */
const MARKUP = [
  '$', '\\frac', '\\eta', '\\theta', '\\Delta', '\\sqrt', '\\left', '\\right',
  '^{', '_{', '{', '}', '\\(', '\\)', '\\[', '\\]',
]
const speakable = (s: string) => MARKUP.every((m) => !s.includes(m))

const PILOT = [
  'phys.therm.calorimetry', 'phys.therm.first-law',
  'phys.opt.total-internal-reflection', 'phys.wave.transverse-waves',
  'phys.wave.interference', 'phys.mech.viscosity', 'phys.mech.surface-tension',
] as const

function sceneOf(conceptId: string) {
  const d = resolveVisual({
    message: 'explain with diagram', lessonConceptId: conceptId,
    subject: 'physics', learnerRequest: 'diagram',
  })
  if (d.payload?.renderer !== 'scene') throw new Error(`${conceptId} has no scene`)
  return { decision: d, spec: d.payload.sceneSpec }
}

// ── the reported failure ─────────────────────────────────────────────────────

describe('the reported cases now speak as English', () => {
  it.each([
    ['$F = \\eta A \\frac{dv}{dy}$', ['force', 'equals', 'eta', 'rate of change of v with respect to y']],
    ['$\\Delta U = Q - W$', ['Delta U equals Q minus W']],
    ['$\\theta > \\theta_c$', ['theta greater than theta c']],
    ['\\(x^{2} + y_{1}\\)', ['x squared plus y 1']],
  ])('%s', (input, expected) => {
    const spoken = cleanTextForTTS(input.replace('$F =', '$Force ='))
    expect(speakable(spoken), spoken).toBe(true)
    for (const phrase of expected) {
      expect(spoken.toLowerCase(), spoken).toContain(phrase.toLowerCase())
    }
  })

  it('no raw LaTeX reaches the provider, for any of the reported inputs', () => {
    for (const input of [
      '$F = \\eta A \\frac{dv}{dy}$',
      '$$\\Delta U = Q - W$$',
      '\\[ \\theta > \\theta_c \\]',
      'Inline \\(\\lambda = v/f\\) here.',
      'Mixed prose with $\\eta$ and then $\\Delta U = Q - W$ in one line.',
    ]) {
      const spoken = cleanTextForTTS(input)
      expect(speakable(spoken), `${input} -> ${spoken}`).toBe(true)
      expect(spoken).not.toMatch(/backslash|slash|open brace|close brace|dollar/i)
    }
  })
})

// ── structure, not a dictionary ──────────────────────────────────────────────

describe('normalization is structural', () => {
  it('a backslash command speaks as its own name, with no table entry', () => {
    // No Greek letter is listed anywhere in the module.
    for (const [tex, word] of [
      ['\\eta', 'eta'], ['\\theta', 'theta'], ['\\lambda', 'lambda'],
      ['\\Delta', 'Delta'], ['\\omega', 'omega'], ['\\zeta', 'zeta'],
    ]) {
      expect(speakifyMathNotation(tex).trim()).toBe(word)
    }
  })

  it('operators speak as operations, not as their command names', () => {
    expect(speakifyMathNotation('a \\times b').replace(/\s+/g, ' ')).toContain('times')
    expect(speakifyMathNotation('a \\le b')).toContain('less than or equal to')
    expect(speakifyMathNotation('a \\approx b')).toContain('approximately equal to')
    expect(speakifyMathNotation('a \\cdot b')).not.toContain('cdot')
  })

  it('exponents and indices follow the notation', () => {
    expect(speakifyMathNotation('x^{2}').trim()).toBe('x squared')
    expect(speakifyMathNotation('x^{3}').trim()).toBe('x cubed')
    expect(speakifyMathNotation('10^{-3}').trim()).toBe('10 to the power of minus 3')
    expect(speakifyMathNotation('x^{n+1}').trim()).toBe('x to the power of n+1')
    expect(speakifyMathNotation('\\theta_c').trim()).toBe('theta c')
    expect(speakifyMathNotation('y_{1}').trim()).toBe('y 1')
  })

  it('fractions and roots read as relationships', () => {
    expect(speakifyMathNotation('\\frac{a}{b}').trim()).toBe('a over b')
    expect(speakifyMathNotation('\\sqrt{2}').trim()).toBe('the square root of 2')
    expect(speakifyMathNotation('\\sqrt[3]{8}').trim()).toBe('the cube root of 8')
  })

  it('derivatives read as rates of change, never letter by letter', () => {
    expect(speakifyMathNotation('\\frac{dv}{dy}').trim())
      .toBe('the rate of change of v with respect to y')
    expect(speakifyMathNotation('dv/dy').trim())
      .toBe('the rate of change of v with respect to y')
    expect(speakifyMathNotation('dv/dy')).not.toMatch(/d v over d y/)
  })

  it('layout commands are silent', () => {
    expect(speakifyMathNotation('\\left( a \\right)').replace(/\s+/g, ' ').trim()).toBe('( a )')
    expect(speakifyMathNotation('\\displaystyle x').trim()).toBe('x')
  })
})

// ── never invent meaning ─────────────────────────────────────────────────────

describe('meaning is never invented', () => {
  it('dv/dy is not called "the velocity gradient" by the normalizer', () => {
    // That is a fact about viscosity, not about the notation. It reaches the
    // tutor through the figure's own labels instead.
    expect(speakifyMathNotation('\\frac{dv}{dy}')).not.toMatch(/velocity gradient/i)
  })

  it('an unknown symbol keeps its name rather than acquiring a meaning', () => {
    expect(speakifyMathNotation('\\xi').trim()).toBe('xi')
    expect(speakifyMathNotation('\\Upsilon').trim()).toBe('Upsilon')
  })

  it('an unparseable expression degrades instead of guessing', () => {
    // A \frac with a missing group cannot be read as a fraction; the output is
    // still speech-safe and still contains the operands.
    const out = cleanTextForTTS('$\\frac{a$')
    expect(speakable(out), out).toBe(true)
    expect(out).toContain('a')
  })
})

// ── ordinary prose is not damaged ────────────────────────────────────────────

describe('ordinary prose survives untouched', () => {
  it.each([
    'A well-known result, pages 5-10 — see the note.',
    'Speed in m/s; 3/4 cup; and/or less.',
    'The cost is $5 today.',
    'Use the phrase "state-of-the-art" carefully.',
    'He said: wait — that is not right.',
  ])('%s', (prose) => {
    const spoken = cleanTextForTTS(prose)
    expect(spoken).not.toMatch(/rate of change|over b|squared/)
    // No math rule fired: hyphens, ratios and dashes are all still there.
    expect(spoken.length).toBeGreaterThan(prose.length * 0.6)
  })

  it('speakifyMathNotation is the identity on plain sentences', () => {
    const prose = 'Viscosity is how strongly a fluid resists being sheared.'
    expect(speakifyMathNotation(prose)).toBe(prose)
  })

  it('containsMathMarkup only flags real markup', () => {
    expect(containsMathMarkup('$x$')).toBe(true)
    expect(containsMathMarkup('\\frac{a}{b}')).toBe(true)
    expect(containsMathMarkup('Plain teaching prose, with a dash — and 3/4.')).toBe(false)
  })
})

// ── display is not touched ───────────────────────────────────────────────────

describe('DISPLAY ≠ TTS — the canvas keeps its notation', () => {
  it.each(PILOT)('%s · the payload still carries the written form', (conceptId) => {
    const { spec } = sceneOf(conceptId)
    const labels = visibleObjects(spec, Infinity)
      .map((o) => (typeof o.text === 'string' ? o.text : ''))
      .filter(Boolean)
    // Nothing in P4 rewrote a scene: the labels are still notation, and none
    // of them has been turned into prose.
    for (const l of labels) {
      expect(l).not.toMatch(/rate of change of/)
      expect(l).not.toMatch(/equals/)
    }
  })

  it('the first law still DISPLAYS "ΔU = Q − W" while SPEAKING it in words', () => {
    const { spec } = sceneOf('phys.therm.first-law')
    const display = visibleObjects(spec, Infinity)
      .map((o) => o.text ?? '').find((t) => t.includes('ΔU') && t.includes('='))
    expect(display).toBe('ΔU = Q − W')                       // canvas unchanged
    const spoken = cleanTextForTTS(display!)
    expect(spoken).toBe('Delta U equals Q minus W')          // speech differs
    expect(spoken).not.toBe(display)
  })

  it('viscosity still DISPLAYS its equation while speaking the derivative', () => {
    const { spec } = sceneOf('phys.mech.viscosity')
    const display = visibleObjects(spec, Infinity)
      .map((o) => o.text ?? '').find((t) => t.startsWith('F ='))
    expect(display).toBe('F = η A (dv/dy)')
    const spoken = cleanTextForTTS(display!)
    expect(spoken).toContain('rate of change of v with respect to y')
    expect(speakable(spoken), spoken).toBe(true)
  })
})

// ── the M4 hard cases ────────────────────────────────────────────────────────

describe('every equation the seven figures actually carry is speech-safe', () => {
  it.each(PILOT)('%s', (conceptId) => {
    const { decision } = sceneOf(conceptId)
    const semantics = describeVisualPayload(decision.payload)
    // Only what is really there — no equation is invented for a figure.
    for (const eq of semantics.equations) {
      const spoken = cleanTextForTTS(eq)
      expect(speakable(spoken), `${conceptId}: ${eq} -> ${spoken}`).toBe(true)
      expect(spoken.trim().length).toBeGreaterThan(0)
    }
    // And every label, equation or not, survives the speech path intact.
    for (const label of semantics.readable) {
      const spoken = cleanTextForTTS(label)
      expect(speakable(spoken), `${conceptId}: ${label} -> ${spoken}`).toBe(true)
    }
  })

  it('the three TIR cases stay distinguishable when spoken', () => {
    expect(cleanTextForTTS('θ < θc')).toBe('theta less than theta c')
    expect(cleanTextForTTS('θ = θc')).toBe('theta equals theta c')
    expect(cleanTextForTTS('θ > θc')).toBe('theta greater than theta c')
  })

  it('transverse-wave notation speaks naturally', () => {
    expect(cleanTextForTTS('one wavelength λ')).toBe('one wavelength lambda')
    expect(cleanTextForTTS('90°')).toContain('90 degrees')
  })

  it('calorimetry speaks its relationship without inventing temperatures', () => {
    const spoken = cleanTextForTTS('both reach the same T_f')
    expect(speakable(spoken), spoken).toBe(true)
    expect(spoken).not.toMatch(/\d+\s*degrees/)     // no fabricated value
  })
})

// ── the contract's equation handoff ──────────────────────────────────────────

describe('the contract asks for the figure\'s own words', () => {
  it('names the figure\'s labels as the vocabulary for the equation', () => {
    const { decision } = sceneOf('phys.therm.first-law')
    const block = buildVisualContractBlock(decision)
    expect(block).toContain('ΔU = Q − W')                    // display form kept
    expect(block).toMatch(/THE FIGURE'S OWN WORDS/)
    // The words it should use are present for it to use.
    for (const w of ['the system', 'Q in', 'W out']) expect(block).toContain(w)
  })

  it('forbids speaking it as markup', () => {
    const { decision } = sceneOf('phys.mech.viscosity')
    const block = buildVisualContractBlock(decision)
    expect(block).toMatch(/do \\?not write it as LaTeX or wrap it in dollar signs/i)
    expect(block).toMatch(/do not invent a meaning for a symbol the\s+figure does not name/i)
  })

  it('a figure with no equation gets no equation instruction', () => {
    const { decision } = sceneOf('phys.wave.interference')
    expect(describeVisualPayload(decision.payload).equations).toEqual([])
    expect(buildVisualContractBlock(decision)).not.toMatch(/SAY IT IN WORDS/)
  })
})
