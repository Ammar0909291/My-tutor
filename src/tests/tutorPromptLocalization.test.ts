import { describe, it, expect } from 'vitest'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

/**
 * The base tutor prompt is fully localized prose. Any English sentence
 * embedded in it lands mid-paragraph in the learner's own language — a
 * different defect class from the route's separately-appended English
 * teaching blocks, which are machine instructions and stay English.
 */
const build = (lang: 'ru' | 'en' | 'hi', register: 'beginner' | 'intermediate' | 'expert') =>
  buildTutorSystemPrompt('Physics', 'Иван', 'beginner', 'learn physics', null, lang, null, undefined, register)

describe('base tutor prompt — beginner tuning is localized', () => {
  it('injects the beginner sentence in Russian, not English, for a Russian beginner', () => {
    const prompt = build('ru', 'beginner')
    expect(prompt).toMatch(/Этот студент — новичок/)
    expect(prompt).not.toMatch(/This student is a beginner/)
  })

  it('injects the beginner sentence in Hinglish, not English, for a Hindi beginner', () => {
    const prompt = build('hi', 'beginner')
    expect(prompt).toMatch(/Yeh student beginner hai/)
    expect(prompt).not.toMatch(/This student is a beginner/)
  })

  it('keeps the original English wording for English learners', () => {
    expect(build('en', 'beginner')).toMatch(/This student is a beginner: start at Stage 1/)
  })

  it('omits the sentence entirely above beginner register, in every language', () => {
    for (const lang of ['ru', 'en', 'hi'] as const) {
      for (const register of ['intermediate', 'expert'] as const) {
        const prompt = build(lang, register)
        expect(prompt).not.toMatch(/This student is a beginner/)
        expect(prompt).not.toMatch(/Этот студент — новичок/)
        expect(prompt).not.toMatch(/Yeh student beginner hai/)
      }
    }
  })

  it('still states the Russian output-language contract in the base prompt', () => {
    expect(build('ru', 'beginner')).toMatch(/ТОЛЬКО на русском языке/)
  })
})
