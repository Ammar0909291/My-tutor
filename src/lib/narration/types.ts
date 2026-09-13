/**
 * Narrated Read-Along — platform-wide types.
 *
 * Subject-agnostic on purpose: nothing here references physics, chemistry,
 * or any other subject. Any narrated lesson text, in any subject, produces
 * the same shape — a list of segments plus a playback state machine — and
 * is rendered/controlled by the same generic components
 * (src/components/narration/*) via the same hook (useNarrationPlayback).
 */

import type { WordToken } from './words'
export type { WordToken }

/** One sentence-sized unit of narrated text, in spoken order. */
export interface NarrationSegment {
  /** Stable within one narration session — `${sessionId}-seg-${index}`. */
  id: string
  /** The RENDERED text for this segment (what the learner reads on screen —
   *  not necessarily what TTS speaks; see `spokenText`). */
  text: string
  /** The text actually sent to the TTS engine for this segment (post
   *  cleanTextForTTS — e.g. "H2O" may render as "H2O" but speak as "water").
   *  Segments are paired by INDEX between the rendered and spoken text
   *  (both are split with the identical sentence-boundary rule), which is
   *  what makes "highlight the exact segment being spoken" correct even
   *  though the two strings can differ token-for-token. */
  spokenText: string
  /** 0-based order within the narration. */
  index: number
  /** `text` tokenized into words + whitespace separators — what NarratedText
   *  actually renders and highlights word-by-word. Concatenating every
   *  token's own text reproduces `text` exactly. */
  renderedWords: WordToken[]
  /** Word count of `spokenText` — used to map a spoken-text word position
   *  (from a browser boundary event, or a server-audio time estimate) onto
   *  the corresponding rendered word when the two counts differ. See
   *  words.ts for why/when they can differ. */
  spokenWordCount: number
}

export type NarrationPlaybackStatus =
  | 'IDLE'
  | 'LOADING'
  | 'PLAYING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ERROR'

export interface NarrationPlaybackState {
  status: NarrationPlaybackStatus
  /** Index into the segment list, or null when nothing has started yet. */
  activeSegmentIndex: number | null
  /** Index into `segments[activeSegmentIndex].renderedWords` (word-kind
   *  tokens only) — the single word currently being spoken. Null whenever
   *  activeSegmentIndex is null, and always null on COMPLETED/ERROR (nothing
   *  stays highlighted once narration is done). */
  activeWordIndex: number | null
  /** 0-100. For the browser-speech path this is segment-count based (no
   *  sub-segment audio clock exists); for the server-audio path it is
   *  audio.currentTime / audio.duration. */
  progressPercent: number
}

export const INITIAL_NARRATION_STATE: NarrationPlaybackState = {
  status: 'IDLE',
  activeSegmentIndex: null,
  activeWordIndex: null,
  progressPercent: 0,
}
