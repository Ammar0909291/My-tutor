/**
 * A LEARNER MUST BE ABLE TO READ EVERY FORMULA.
 *
 * ── MEASURED ON SCREEN, IN PRODUCTION ───────────────────────────────────────
 * Simple harmonic motion, physics lesson, real learner UI:
 *
 *   "Look at the equation on your screen, $T = 2\pi\sqrt{\frac{L}{g}}$
 *    (T equals two pi times the square root of L over g), where $L$ is the
 *    length in metres and $g$ is the acceleration due to gravity."
 *
 * and, in a kinetic-energy turn, "$KE = \frac{1}{2}mv^2$ … where $m$ is mass".
 * The student read the backslashes.
 *
 * ── THE CAUSE ───────────────────────────────────────────────────────────────
 * Not a missing renderer: KaTeX is installed and LessonScreen already
 * typesets `$$…$$` and `\(…\)`. It deliberately ignores single `$…$` because
 * that collides with currency. Models write inline maths as `$…$`. Two
 * conventions, no translation between them.
 */
import { describe, it, expect } from 'vitest'
import { normalizeMathDelimiters, containsRawLatex } from '@/lib/text/mathDelimiters'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

describe('the exact production strings become typesettable', () => {
  it('the simple-harmonic-motion turn', () => {
    const raw = 'Look at the equation on your screen, $T = 2\\pi\\sqrt{\\frac{L}{g}}$ (T equals two pi times the square root of L over g), where $L$ is the length in metres and $g$ is the acceleration.'
    const out = normalizeMathDelimiters(raw)
    expect(out).toContain('\\(T = 2\\pi\\sqrt{\\frac{L}{g}}\\)')
    expect(out).toContain('\\(L\\)')
    expect(out).toContain('\\(g\\)')
    expect(out).not.toMatch(/\$/)
    expect(containsRawLatex(out)).toBe(false)
  })

  it('the kinetic-energy turn', () => {
    const raw = 'following the formula $KE = \\frac{1}{2}mv^2$ (kinetic energy equals one-half m v-squared), where $m$ is mass and $v$ is velocity.'
    const out = normalizeMathDelimiters(raw)
    expect(out).toContain('\\(KE = \\frac{1}{2}mv^2\\)')
    expect(containsRawLatex(out)).toBe(false)
  })

  it('the electric-field turn', () => {
    const raw = 'a push described by `Force F = q₀E`, where $E$ is the electric field strength.'
    expect(normalizeMathDelimiters(raw)).toContain('\\(E\\)')
  })
})

describe('currency is not mathematics', () => {
  it.each([
    ['a single amount', 'The book costs $5 today.'],
    ['two amounts', 'It costs $5 and $10 depending on size.'],
    ['decimals', 'The total was $10.50 after tax.'],
    ['thousands', 'A budget of $1,000 per year.'],
  ])('leaves %s alone', (_label, raw) => {
    expect(normalizeMathDelimiters(raw)).toBe(raw)
  })
})

describe('display maths is left to the renderer that already handles it', () => {
  it('does not touch $$ … $$', () => {
    const raw = 'Here it is:\n$$E = mc^2$$\nand that is the relation.'
    expect(normalizeMathDelimiters(raw)).toBe(raw)
  })

  it('does not touch already-correct \\( … \\)', () => {
    const raw = 'where \\(v_0\\) is the initial velocity.'
    expect(normalizeMathDelimiters(raw)).toBe(raw)
    expect(containsRawLatex(raw)).toBe(false)
  })
})

describe('the raw-LaTeX guard', () => {
  it.each([
    ['a bare frac', 'The formula is \\frac{1}{2}mv^2 for kinetic energy.'],
    ['a bare sqrt', 'Take \\sqrt{2} of that.'],
    ['a single-dollar span', 'so $T = 2L$ follows.'],
  ])('catches %s', (_label, text) => {
    expect(containsRawLatex(text)).toBe(true)
  })

  it.each([
    ['plain unicode maths', 'KE = ½ m v², so doubling v quadruples the energy.'],
    ['plain words', 'Kinetic energy equals one half times mass times velocity squared.'],
    ['currency', 'It costs $5 and $10.'],
    ['typeset inline', 'where \\(g\\) is gravity.'],
  ])('does not fire on %s', (_label, text) => {
    expect(containsRawLatex(text)).toBe(false)
  })
})

describe('edge cases must not corrupt the turn', () => {
  it('an unmatched dollar is left alone', () => {
    expect(normalizeMathDelimiters('costs $5 or so')).toBe('costs $5 or so')
    expect(normalizeMathDelimiters('a lone $ sign')).toBe('a lone $ sign')
  })

  it('does not span a newline', () => {
    const raw = 'price is $5\nand $10 elsewhere'
    expect(normalizeMathDelimiters(raw)).toBe(raw)
  })

  it('text without any dollar is returned unchanged', () => {
    const raw = 'Ordinary teaching prose with no maths at all.'
    expect(normalizeMathDelimiters(raw)).toBe(raw)
  })
})

describe('the tutor is told which convention to write', () => {
  it('the base prompt forbids single-dollar LaTeX', () => {
    const prompt = buildTutorSystemPrompt('Claude', 'en', null, null, null)
    expect(prompt).toMatch(/WRITE MATHS THE STUDENT CAN READ/)
    expect(prompt).toMatch(/never single \$/)
  })
})
