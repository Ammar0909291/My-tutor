/**
 * Regression tests — TTS text normalization (src/lib/tts-cleaner.ts).
 *
 * The bugs these tests pin down (Tutor Max Review — Conversation 1,
 * findings 4/5): the speech engine used to read raw markdown/UI formatting
 * literally — "+" always became the word "plus" even when it was a
 * decorative separator ("Welcome + Lesson 3"), several common bullet/
 * checkmark symbols (✓, ▸, and friends) were never stripped, numbered
 * lists lost all structure instead of reading as natural ordinals, and
 * markdown links/tables were read as raw syntax.
 */
import { describe, it, expect } from 'vitest'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

describe('decorative symbols never meant to be spoken', () => {
  it.each([
    ['✓ Correct', 'Correct'],
    ['▸ Next step', 'Next step'],
    ['✗ Wrong answer', 'Wrong answer'],
    ['✔ Done', 'Done'],
    ['● Point one', 'Point one'],
    ['★ Featured', 'Featured'],
  ])('strips %j down to %j', (input, expected) => {
    expect(cleanTextForTTS(input)).toBe(expected)
  })
})

describe('"+" is arithmetic/chemical only in context, otherwise a pause', () => {
  it('reads a plain arithmetic sum as "plus"', () => {
    expect(cleanTextForTTS('2 + 3 = 5')).toBe('2 plus 3 equals 5')
  })

  it('reads a three-term arithmetic chain as "plus" throughout', () => {
    expect(cleanTextForTTS('2 + 3 + 4 = 9')).toBe('2 plus 3 plus 4 equals 9')
  })

  it('reads a chemical equation\'s "+" as "plus", formulas spoken by name', () => {
    expect(cleanTextForTTS('2H2 + O2 leads to water')).toContain('plus')
    expect(cleanTextForTTS('H2 + O2')).toBe('hydrogen plus oxygen')
  })

  it('does NOT read a decorative UI "+" as the word "plus"', () => {
    const out = cleanTextForTTS('Welcome + Lesson 3')
    expect(out).not.toMatch(/\bplus\b/)
    expect(out).toBe('Welcome, Lesson 3')
  })
})

describe('arrows read as a natural connective, not a literal symbol', () => {
  it('renders → as "leads to"', () => {
    expect(cleanTextForTTS('Step 1 → Step 2')).toBe('Step 1 leads to Step 2')
  })
})

describe('numbered lists become natural spoken ordinals', () => {
  it('converts "1." / "2." / "3." to First/Second/Third', () => {
    const input = '1. Read the problem\n2. Identify the variables\n3. Solve for x'
    const out = cleanTextForTTS(input)
    expect(out).toContain('First, Read the problem')
    expect(out).toContain('Second, Identify the variables')
    expect(out).toContain('Third, Solve for x')
  })

  it('falls back to "Next" beyond the tenth item', () => {
    expect(cleanTextForTTS('11. Eleventh item')).toContain('Next, Eleventh item')
  })
})

describe('markdown links and tables are read as content, not syntax', () => {
  it('reads a markdown link as its visible text only', () => {
    expect(cleanTextForTTS('See [the textbook](https://example.com/book) for more.'))
      .toBe('See the textbook for more.')
  })

  it('reads a table row as comma-separated cells, no pipes', () => {
    const out = cleanTextForTTS('| Name | Score |\n|---|---|\n| Alex | 90 |')
    expect(out).not.toContain('|')
    expect(out).toContain('Name, Score')
    expect(out).toContain('Alex, 90')
  })
})

describe('pre-existing behavior is preserved', () => {
  it('still expands chemistry formulas by name', () => {
    expect(cleanTextForTTS('H2O is water')).toBe('water is water')
  })

  it('still expands units', () => {
    expect(cleanTextForTTS('a 5m rope')).toBe('a 5 meters rope')
  })

  it('still reads superscripts naturally', () => {
    expect(cleanTextForTTS('x² + y²')).toBe('x squared plus y squared')
  })

  it('still strips code blocks entirely', () => {
    expect(cleanTextForTTS('Here: ```const x = 1```done')).toBe('Here: done')
  })

  it('still strips markdown bold/italic markers', () => {
    expect(cleanTextForTTS('**important** and *emphasis*')).toBe('important and emphasis')
  })
})
