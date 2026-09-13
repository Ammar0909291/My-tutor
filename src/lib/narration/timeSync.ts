/**
 * Narrated Read-Along — audio-time to segment mapping (server-TTS path).
 *
 * Pure, DOM-free. No TTS provider in this platform returns per-segment
 * timestamps (see /api/tts — Sarvam and Yandex both return raw audio bytes
 * only, no timing metadata), so there is no authoritative boundary table to
 * read. What IS authoritative is the audio element's own `currentTime`; this
 * module only decides which precomputed segment window that real time falls
 * into. The boundary table itself (`buildSegmentTimeWindows`) is a
 * character-length-weighted ESTIMATE of where each sentence starts and
 * ends inside the total spoken audio — stated plainly, not hidden, because
 * it is the one piece of this feature that is an approximation rather than
 * a measurement. Every consumer of this module still drives from the real
 * `audio.currentTime` on every tick; nothing here runs its own clock.
 */
import type { NarrationSegment } from './types'

export interface SegmentTimeWindow {
  segmentIndex: number
  startTime: number
  endTime: number
}

/**
 * A single RENDERED word's estimated time window within the whole audio,
 * for the server-TTS path — the word-level extension of `SegmentTimeWindow`
 * above, subdividing each segment's window proportionally by its rendered
 * words' own character lengths. This is a SECOND layer of estimate on top
 * of the segment-level one (itself already an estimate): no provider this
 * platform integrates with (Sarvam, Yandex) returns word timestamps, so
 * there is no measured correspondence to refine toward. Every consumer
 * still drives from the real `audio.currentTime` on every tick; nothing
 * here runs its own clock.
 */
export interface WordTimeWindow {
  segmentIndex: number
  /** 0-based index into that segment's `renderedWords` (word-kind tokens only). */
  wordIndex: number
  startTime: number
  endTime: number
}

/**
 * Splits `totalDuration` seconds across `segments` in proportion to each
 * segment's spoken-text length. A segment with no characters at all (should
 * not occur — buildNarrationSegments filters empty rendered text) gets a
 * zero-width window rather than dividing by zero.
 */
export function buildSegmentTimeWindows(segments: NarrationSegment[], totalDuration: number): SegmentTimeWindow[] {
  if (segments.length === 0 || totalDuration <= 0) return []
  const lengths = segments.map((s) => Math.max(s.spokenText.length, 1))
  const totalLength = lengths.reduce((a, b) => a + b, 0)
  let cursor = 0
  return segments.map((s, i) => {
    const startTime = (cursor / totalLength) * totalDuration
    cursor += lengths[i]
    const endTime = (cursor / totalLength) * totalDuration
    return { segmentIndex: s.index, startTime, endTime }
  })
}

/**
 * The segment whose window contains `currentTime` (the REAL, authoritative
 * audio position). Clamps to the last segment once past the final window's
 * end, so a trailing rounding gap never leaves nothing highlighted right
 * before `onended` fires.
 */
export function segmentIndexForTime(windows: SegmentTimeWindow[], currentTime: number): number | null {
  if (windows.length === 0) return null
  if (currentTime <= windows[0].startTime) return windows[0].segmentIndex
  for (const w of windows) {
    if (currentTime >= w.startTime && currentTime < w.endTime) return w.segmentIndex
  }
  return windows[windows.length - 1].segmentIndex
}

export function progressPercentForTime(currentTime: number, totalDuration: number): number {
  if (totalDuration <= 0) return 0
  return Math.min(Math.max((currentTime / totalDuration) * 100, 0), 100)
}

/**
 * Subdivides each segment's own time window (from `buildSegmentTimeWindows`)
 * proportionally across its RENDERED words' character lengths — word-level
 * highlighting for the server-audio path, built entirely from information
 * already on hand (no second rendered/spoken word-count reconciliation is
 * needed here, unlike the browser-speech path, because this subdivides the
 * segment's window directly by its RENDERED words rather than by anything
 * derived from the spoken audio). A segment with zero rendered words (should
 * not occur) contributes no word windows.
 */
export function buildWordTimeWindows(segments: NarrationSegment[], totalDuration: number): WordTimeWindow[] {
  const segmentWindows = buildSegmentTimeWindows(segments, totalDuration)
  const result: WordTimeWindow[] = []
  for (let i = 0; i < segmentWindows.length; i++) {
    const segmentWindow = segmentWindows[i]
    const segment = segments[i]
    if (!segment) continue
    const words = segment.renderedWords.filter((t) => t.kind === 'word')
    if (words.length === 0) continue
    const lengths = words.map((w) => Math.max(w.text.length, 1))
    const totalLength = lengths.reduce((a, b) => a + b, 0)
    const segmentDuration = segmentWindow.endTime - segmentWindow.startTime
    let cursor = 0
    for (let w = 0; w < words.length; w++) {
      const startTime = segmentWindow.startTime + (cursor / totalLength) * segmentDuration
      cursor += lengths[w]
      const endTime = segmentWindow.startTime + (cursor / totalLength) * segmentDuration
      result.push({ segmentIndex: segment.index, wordIndex: words[w].wordIndex as number, startTime, endTime })
    }
  }
  return result
}

/**
 * The word window whose range contains `currentTime` (the REAL,
 * authoritative audio position) — the word-level analog of
 * `segmentIndexForTime`. Clamps to the first/last word the same way.
 */
export function wordIndexForTime(
  windows: WordTimeWindow[],
  currentTime: number,
): { segmentIndex: number; wordIndex: number } | null {
  if (windows.length === 0) return null
  if (currentTime <= windows[0].startTime) {
    return { segmentIndex: windows[0].segmentIndex, wordIndex: windows[0].wordIndex }
  }
  for (const w of windows) {
    if (currentTime >= w.startTime && currentTime < w.endTime) {
      return { segmentIndex: w.segmentIndex, wordIndex: w.wordIndex }
    }
  }
  const last = windows[windows.length - 1]
  return { segmentIndex: last.segmentIndex, wordIndex: last.wordIndex }
}
