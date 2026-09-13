/**
 * Narrated Read-Along — text segmentation.
 *
 * Pure, DOM-free, subject-agnostic. Splits lesson text into the same
 * sentence-sized units the platform's own TTS engine already speaks in
 * (reusing `splitIntoSpeechSegments`, the exact function `speakText` in
 * tts.ts uses to chain SpeechSynthesisUtterances) — so "the segment
 * currently highlighted" and "the segment currently being spoken" can
 * never drift out of sentence-level sync with each other.
 *
 * RENDERED vs. SPOKEN TEXT: `cleanTextForTTS` rewrites tokens before
 * speech (e.g. a chemistry formula "H2O" is spoken as "water"), so the
 * string TTS speaks is not always the string on screen. Segmenting BOTH
 * the raw and the cleaned text with the identical sentence-boundary rule
 * and pairing them by INDEX keeps the correct rendered sentence
 * highlighted even when its spoken form differs token-for-token — a
 * character-offset mapping between the two strings would not survive that
 * substitution.
 */
import { splitIntoSpeechSegments } from '../tts'
import { cleanTextForTTS } from '../tts-cleaner'
import type { NarrationSegment } from './types'

/**
 * Builds the ordered segment list for one narration session. `sessionId`
 * seeds stable segment ids (e.g. the message id) so re-running this for the
 * same text always produces identical ids — required for React keys and for
 * "the same segment stays highlighted across a re-render."
 */
export function buildNarrationSegments(text: string, sessionId: string): NarrationSegment[] {
  const rendered = splitIntoSpeechSegments(text)
  const spoken = splitIntoSpeechSegments(cleanTextForTTS(text))
  // The two splits can legitimately differ in COUNT (cleanTextForTTS may
  // collapse or expand punctuation in a way that shifts a sentence
  // boundary). Rather than mis-pair segments 1:1 past a divergence, fall
  // back to speaking the SAME rendered text for any segment beyond the
  // shorter list's length — still correct, if less precisely cleaned for
  // that tail.
  const count = Math.max(rendered.length, spoken.length)
  const segments: NarrationSegment[] = []
  for (let i = 0; i < count; i++) {
    const renderedText = rendered[i] ?? ''
    if (!renderedText) continue
    segments.push({
      id: `${sessionId}-seg-${i}`,
      text: renderedText,
      spokenText: spoken[i] ?? renderedText,
      index: segments.length,
    })
  }
  return segments
}

/** The text actually sent to TTS for the whole narration, segment by
 *  segment, in order — the exact sequence a browser-speech chain or a
 *  single server-TTS request should speak. */
export function spokenSequence(segments: NarrationSegment[]): string[] {
  return segments.map((s) => s.spokenText)
}
