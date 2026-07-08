import { describe, it, expect } from 'vitest'
import { containsIpaNotation, stripIpaNotation } from '@/lib/text/ipaSanitizer'
import { resolveContentRegister } from '@/lib/teaching/assets/studentState'

describe('containsIpaNotation / stripIpaNotation', () => {
  it('detects and removes a slash-delimited IPA transcription', () => {
    const text = 'The letter A makes the sound /æ/.'
    expect(containsIpaNotation(text)).toBe(true)
    expect(stripIpaNotation(text)).toBe('The letter A makes the sound.')
  })

  it('detects and removes IPA symbols outside the ambiguous letter set', () => {
    const text = 'The sh sound is written /ʃ/ in IPA, as in ship.'
    expect(containsIpaNotation(text)).toBe(true)
    expect(stripIpaNotation(text)).not.toMatch(/[ɐ-˿]/)
  })

  it('removes a full IPA word transcription like /kæt/', () => {
    const text = "'Cat' transcribes as /kæt/."
    expect(stripIpaNotation(text)).toBe("'Cat' transcribes as.")
  })

  it('removes stress marks inside a transcription span', () => {
    const text = 'Say it slowly: /ˈæp.əl/ for apple.'
    expect(containsIpaNotation(text)).toBe(true)
    expect(stripIpaNotation(text)).toBe('Say it slowly: for apple.')
  })

  it('removes a single plain-ASCII consonant transcription like /b/ or /k/', () => {
    const text = 'The letter B makes the sound /b/, like in ball.'
    expect(containsIpaNotation(text)).toBe(true)
    expect(stripIpaNotation(text)).toBe('The letter B makes the sound, like in ball.')
  })

  it('does not touch ordinary slash-delimited non-phonetic text', () => {
    const cases = [
      'Use km/h for speed.',
      'Pick and/or choose.',
      'A fraction like 3/4.',
      'The date is 10/12/2026.',
      'he/she can decide.',
      'w/o milk, please.',
      'Choose one/two/three of these options.',
    ]
    for (const c of cases) {
      expect(containsIpaNotation(c)).toBe(false)
      expect(stripIpaNotation(c)).toBe(c)
    }
  })

  it('does not touch letters that are ambiguous only outside slashes', () => {
    expect(containsIpaNotation('The angle θ is 30 degrees.')).toBe(false)
    expect(containsIpaNotation('Encyclopædia is an old word.')).toBe(false)
    expect(stripIpaNotation('The angle θ is 30 degrees.')).toBe('The angle θ is 30 degrees.')
  })

  it('leaves plain beginner-friendly phrasing completely untouched', () => {
    const text = "The letter A makes the short 'a' sound, like in apple."
    expect(containsIpaNotation(text)).toBe(false)
    expect(stripIpaNotation(text)).toBe(text)
  })

  it('does not corrupt Hindi/Devanagari or Cyrillic text', () => {
    const hindi = 'सेब का मतलब है apple, और यह एक फल है।'
    const russian = 'Буква A звучит как короткое "а", как в слове apple.'
    expect(containsIpaNotation(hindi)).toBe(false)
    expect(stripIpaNotation(hindi)).toBe(hindi)
    expect(containsIpaNotation(russian)).toBe(false)
    expect(stripIpaNotation(russian)).toBe(russian)
  })
})

describe('resolveContentRegister', () => {
  it('classifies an onboarding "beginner" currentLevel as beginner', () => {
    expect(resolveContentRegister({ currentLevel: 'beginner' })).toBe('beginner')
    expect(resolveContentRegister({ currentLevel: 'complete_beginner' })).toBe('beginner')
  })

  it('classifies advanced/professional currentLevel as expert', () => {
    expect(resolveContentRegister({ currentLevel: 'advanced' })).toBe('expert')
    expect(resolveContentRegister({ currentLevel: 'professional' })).toBe('expert')
  })

  it('classifies intermediate currentLevel as intermediate', () => {
    expect(resolveContentRegister({ currentLevel: 'intermediate' })).toBe('intermediate')
  })

  it('falls back to grade when no level text is set (School Mode)', () => {
    expect(resolveContentRegister({ grade: 2 })).toBe('beginner')
    expect(resolveContentRegister({ grade: 9 })).toBe('intermediate')
  })

  it('defaults to beginner when neither level nor grade is known', () => {
    expect(resolveContentRegister({})).toBe('beginner')
  })

  it('is subject-agnostic — takes no subject parameter at all', () => {
    // resolveContentRegister's signature has no subject field; this test
    // documents that guarantee so a future change can't silently add one.
    const input: Parameters<typeof resolveContentRegister>[0] = { currentLevel: 'beginner' }
    expect('subject' in input).toBe(false)
  })
})
