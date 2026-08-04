import { describe, it, expect } from 'vitest'
import { buildOutputLanguageBlock } from '@/lib/teaching/outputLanguage'
import { buildFirstLessonBlock } from '@/lib/teaching/firstLessonGuard'
import { buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'

describe('buildOutputLanguageBlock', () => {
  it('renders nothing for English — English prompts stay byte-for-byte unchanged', () => {
    expect(buildOutputLanguageBlock('en')).toBe('')
  })

  it('is written in Russian for ru, so the prompt ENDS in the target register', () => {
    const block = buildOutputLanguageBlock('ru')
    expect(block).toMatch(/[Ѐ-ӿ]/)
    expect(block).toMatch(/ТОЛЬКО по-русски/)
  })

  it('neutralizes the override claims of the blocks that precede it (ru)', () => {
    // The defect: buildFirstLessonBlock and buildRecoveryBlock each assert
    // supremacy over "everything above", which includes the base prompt's
    // one and only language instruction.
    expect(buildFirstLessonBlock('physics')).toMatch(/OVERRIDES ANY CONFLICTING GUIDANCE ABOVE/)
    expect(buildRecoveryBlock('dont_know', false, 0)).toMatch(/PREEMPTS EVERYTHING ABOVE/)

    const block = buildOutputLanguageBlock('ru')
    // …so this block must say those blocks govern teaching, never language.
    expect(block).toMatch(/преобладают над всем/)
    expect(block).toMatch(/никогда не .*языком ответа/s)
  })

  it('explains that the English blocks above are machine instructions, not a language example (ru)', () => {
    const block = buildOutputLanguageBlock('ru')
    expect(block).toMatch(/по-английски/)
    expect(block).toMatch(/Не переходи на английский/)
  })

  it('preserves universal notation rather than transliterating it (ru)', () => {
    expect(buildOutputLanguageBlock('ru')).toMatch(/SI, pH/)
  })

  it('keeps the existing explicit-request exception (ru)', () => {
    expect(buildOutputLanguageBlock('ru')).toMatch(/явно попросил другой язык/)
  })

  it('covers Hindi and keeps this app’s technical-terms-in-English contract', () => {
    const block = buildOutputLanguageBlock('hi')
    expect(block).toMatch(/OUTRANKS EVERY INSTRUCTION ABOVE/)
    expect(block).toMatch(/Technical terms English mein rakhein/)
  })

  it('is appendable — every non-empty variant starts with a block separator', () => {
    for (const lang of ['ru', 'hi'] as const) {
      expect(buildOutputLanguageBlock(lang).startsWith('\n\n')).toBe(true)
    }
  })
})
