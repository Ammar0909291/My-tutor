import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { stripDuplicatedOptionLetter } from '@/lib/teaching/duplicatedOptionLetterGuard'

// Byte-for-byte the real reply captured on a live account, 2026-09-20,
// chem.* Pericyclic Reactions, asked for "a fresh multiple-choice practice
// question on this" — see the module's own header for the full reproduction.
const PERICYCLIC_MCQ =
  'Here is a question to check your understanding:\n\n' +
  'Which of the following reactions is thermally allowed by Woodward–Hoffmann rules?\n\n' +
  'A) A [2+2] cycloaddition of two alkenes\n' +
  'B) B Diels–Alder reaction of cyclopentadiene with maleic anhydride\n' +
  'C) C Electrocyclic ring opening of cyclobutene to butadiene\n' +
  'D) D Sigmatropic [1,3] shift of a hydrogen in 1,3-butadiene'

describe('the real reproduced case', () => {
  it('strips the redundant leading letter from every option, leaving the real text intact', () => {
    const result = stripDuplicatedOptionLetter(PERICYCLIC_MCQ)
    expect(result.stripped).toBe(true)
    expect(result.text).toContain('A) [2+2] cycloaddition of two alkenes')
    expect(result.text).toContain('B) Diels–Alder reaction of cyclopentadiene with maleic anhydride')
    expect(result.text).toContain('C) Electrocyclic ring opening of cyclobutene to butadiene')
    expect(result.text).toContain('D) Sigmatropic [1,3] shift of a hydrogen in 1,3-butadiene')
    // The question and its lead-in survive untouched.
    expect(result.text).toContain('Which of the following reactions is thermally allowed')
    expect(result.text).toContain('Here is a question to check your understanding:')
  })
})

describe('false-positive checks — a single matching option is never enough', () => {
  it('an option legitimately starting with the article "A" is left alone when the others do not match', () => {
    const text =
      'A) A cyclic diene reacts fastest\n' +
      'B) An open-chain diene reacts fastest\n' +
      'C) Neither reacts\n' +
      'D) Both react equally'
    expect(stripDuplicatedOptionLetter(text)).toEqual({ text, stripped: false })
  })

  it('a real chemistry option starting with its own letter as content (not a label artifact) is left alone', () => {
    const text =
      'A) Addition of HBr\n' +
      'B) Bromination with Br2\n' +
      'C) Chlorination with Cl2\n' +
      'D) Dehydration with H2SO4'
    // None of these repeat their letter as a standalone token ("Addition" and
    // "Bromination" fail the \b check), so nothing should fire.
    expect(stripDuplicatedOptionLetter(text)).toEqual({ text, stripped: false })
  })

  it('only one option matching (three do not) is left alone entirely', () => {
    const text =
      'A) A [2+2] cycloaddition of two alkenes\n' +
      'B) Diels–Alder reaction of cyclopentadiene with maleic anhydride\n' +
      'C) Electrocyclic ring opening of cyclobutene to butadiene\n' +
      'D) Sigmatropic [1,3] shift of a hydrogen in 1,3-butadiene'
    expect(stripDuplicatedOptionLetter(text)).toEqual({ text, stripped: false })
  })

  it('a single lettered line with no sibling options is never touched', () => {
    const text = 'A) A quick note on notation'
    expect(stripDuplicatedOptionLetter(text)).toEqual({ text, stripped: false })
  })

  it('text with no lettered options at all is untouched', () => {
    const text = 'Just an ordinary paragraph of teaching prose, no options here.'
    expect(stripDuplicatedOptionLetter(text)).toEqual({ text, stripped: false })
  })

  it('is a total function — never throws on empty input', () => {
    expect(() => stripDuplicatedOptionLetter('')).not.toThrow()
    expect(stripDuplicatedOptionLetter('')).toEqual({ text: '', stripped: false })
  })
})

describe('two-option case (short-answer-style MCQs still get the same protection)', () => {
  it('fires with just two options when both repeat their letter', () => {
    const text = 'A) A true statement\nB) B false statement'
    const result = stripDuplicatedOptionLetter(text)
    expect(result.stripped).toBe(true)
    expect(result.text).toBe('A) true statement\nB) false statement')
  })
})

describe('route.ts wiring', () => {
  const route = fs.readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('is called on cleanText after the duplicated-prose-question guard, in the same repair section', () => {
    const dupProseAt = route.indexOf('dropDuplicatedMcqProse(cleanText, mcqForProseStrip)')
    const at = route.indexOf('stripDuplicatedOptionLetter(cleanText)')
    expect(dupProseAt).toBeGreaterThan(-1)
    expect(at).toBeGreaterThan(-1)
    expect(dupProseAt).toBeLessThan(at)
  })

  it('writes cleanText from the result — the shipping text path, not merely imported', () => {
    const at = route.indexOf('stripDuplicatedOptionLetter(cleanText)')
    const block = route.slice(at, at + 300)
    expect(block).toMatch(/cleanText = \w+\.text/)
  })
})
