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
