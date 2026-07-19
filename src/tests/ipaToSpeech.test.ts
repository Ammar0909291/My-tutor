/**
 * Regression tests — IPA-to-speech conversion (src/lib/text/ipaToSpeech.ts).
 *
 * Lesson Flow sprint, item 6: TTS used to DELETE every /.../ IPA
 * transcription (stripIpaNotation), producing silence for pronunciation
 * content. These pin down the replacement: convert to a speakable
 * approximation instead of deleting, using the exact examples from the bug
 * report, and confirm ordinary (non-IPA) slash usage is left untouched.
 */
import { describe, it, expect } from 'vitest'
import { ipaToApproximateSpeech, speakifyIpaNotation } from '@/lib/text/ipaToSpeech'

describe('ipaToApproximateSpeech', () => {
  it('converts a single-word transcription to a speakable spelling', () => {
    expect(ipaToApproximateSpeech('kæt')).toBe('kat')
  })

  it('converts a connected-speech phrase, word boundaries preserved', () => {
    const out = ipaToApproximateSpeech('aɪ æm ˈɡoʊɪŋ tə ðə stɔːr')
    expect(out.split(' ')).toHaveLength(6) // aɪ / æm / ˈɡoʊɪŋ / tə / ðə / stɔːr
    expect(out).not.toMatch(/[ɐ-˿]/) // no raw IPA-block characters survive
  })

  it('never produces empty output for real phonemic content', () => {
    expect(ipaToApproximateSpeech('kæt').length).toBeGreaterThan(0)
    expect(ipaToApproximateSpeech('θɪŋk').length).toBeGreaterThan(0)
  })

  it('drops stress and length marks without leaving them in the output', () => {
    expect(ipaToApproximateSpeech('ˈkæt')).not.toContain('ˈ')
    expect(ipaToApproximateSpeech('kɑːt')).not.toContain('ː')
  })
})

describe('speakifyIpaNotation', () => {
  it('replaces a /.../ span with its speakable approximation, never silence', () => {
    const out = speakifyIpaNotation('The word is /kæt/, say it slowly.')
    expect(out).not.toContain('//')
    expect(out).not.toContain('/kæt/')
    expect(out).toContain('kat')
  })

  it('handles the exact connected-speech example from the bug report', () => {
    const out = speakifyIpaNotation('Connected speech: /aɪ æm ˈɡoʊɪŋ tə ðə stɔːr/')
    expect(out).not.toMatch(/\/[^/]*\//) // no surviving slash-delimited span
    expect(out.length).toBeGreaterThan('Connected speech: '.length)
  })

  it('never strips ordinary non-IPA slash usage', () => {
    expect(speakifyIpaNotation('Pick and/or choose')).toBe('Pick and/or choose')
    expect(speakifyIpaNotation('3/4 cup')).toBe('3/4 cup')
    expect(speakifyIpaNotation('km/h speed')).toBe('km/h speed')
    expect(speakifyIpaNotation('he/she')).toBe('he/she')
    expect(speakifyIpaNotation('10/12/2026')).toBe('10/12/2026')
  })

  it('handles a single-letter IPA consonant span', () => {
    const out = speakifyIpaNotation('The sound /b/ as in bat.')
    expect(out).not.toContain('/b/')
  })
})
