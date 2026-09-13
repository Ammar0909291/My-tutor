import { describe, it, expect } from 'vitest'
import {
  buildSegmentTimeWindows, progressPercentForTime, segmentIndexForTime,
  buildWordTimeWindows, wordIndexForTime,
} from '@/lib/narration/timeSync'
import { buildNarrationSegments } from '@/lib/narration/segments'

/**
 * D/E — active text is selected from real timing NUMBERS (audio.currentTime
 * and audio.duration), never a wall-clock timer, and only the correct
 * segment is ever selected. No provider gives real per-segment timestamps
 * (see /api/tts — Sarvam/Yandex return raw audio bytes only), so the window
 * table is a character-length-weighted ESTIMATE of where each sentence
 * starts inside the measured duration; what these tests prove is that
 * whatever the real `currentTime` is, it maps to exactly one segment, and
 * that segment is the correct one for that position.
 */

describe('D/E — currentTime maps to exactly the correct segment', () => {
  const segments = buildNarrationSegments('Short. A much longer second sentence here. Mid one.', 'x')
  // Character-weighted lengths roughly: "Short." (6), the long one (~42), "Mid one." (8).
  const windows = buildSegmentTimeWindows(segments, 56) // 56s total, easy arithmetic

  it('builds one window per segment, contiguous and covering the full duration', () => {
    expect(windows).toHaveLength(3)
    expect(windows[0].startTime).toBe(0)
    expect(windows[windows.length - 1].endTime).toBeCloseTo(56, 5)
    for (let i = 1; i < windows.length; i++) {
      expect(windows[i].startTime).toBeCloseTo(windows[i - 1].endTime, 5)
    }
  })

  it('t=0 selects the first segment', () => {
    expect(segmentIndexForTime(windows, 0)).toBe(0)
  })

  it('a time inside the middle segment selects ONLY that segment, not its neighbors', () => {
    const midSegmentTime = (windows[1].startTime + windows[1].endTime) / 2
    expect(segmentIndexForTime(windows, midSegmentTime)).toBe(1)
    // And the neighbors are provably different segments at their own midpoints.
    expect(segmentIndexForTime(windows, windows[0].startTime + 0.01)).toBe(0)
    expect(segmentIndexForTime(windows, windows[2].startTime + 0.01)).toBe(2)
  })

  it('a time past the very end still resolves to the last segment (no gap right before onended)', () => {
    expect(segmentIndexForTime(windows, 999)).toBe(2)
  })

  it('an empty window list (duration not yet known) resolves to null, never a fake index', () => {
    expect(segmentIndexForTime([], 5)).toBeNull()
    expect(buildSegmentTimeWindows(segments, 0)).toEqual([])
  })

  it('progress percent is a direct, authoritative function of currentTime/duration — no timer involved', () => {
    expect(progressPercentForTime(0, 56)).toBe(0)
    expect(progressPercentForTime(28, 56)).toBe(50)
    expect(progressPercentForTime(56, 56)).toBe(100)
    // Clamped, never negative or over 100 from a rounding overshoot.
    expect(progressPercentForTime(999, 56)).toBe(100)
    expect(progressPercentForTime(5, 0)).toBe(0)
  })

  it('a longer sentence gets a proportionally wider time window than a short one', () => {
    const shortWidth = windows[0].endTime - windows[0].startTime
    const longWidth = windows[1].endTime - windows[1].startTime
    expect(longWidth).toBeGreaterThan(shortWidth)
  })
})

describe('word-level server-audio sync — the labeled estimate, driven from the real audio clock', () => {
  const segments = buildNarrationSegments('Short one. A much longer second sentence here.', 'wx')
  const wordWindows = buildWordTimeWindows(segments, 40)

  it('builds one window per RENDERED word across every segment, contiguous and covering the full duration', () => {
    const totalWords = segments.reduce((n, s) => n + s.renderedWords.filter((t) => t.kind === 'word').length, 0)
    expect(wordWindows).toHaveLength(totalWords)
    expect(wordWindows[0].startTime).toBe(0)
    expect(wordWindows[wordWindows.length - 1].endTime).toBeCloseTo(40, 5)
    for (let i = 1; i < wordWindows.length; i++) {
      expect(wordWindows[i].startTime).toBeCloseTo(wordWindows[i - 1].endTime, 5)
    }
  })

  it('t=0 selects the first word of the first segment', () => {
    const hit = wordIndexForTime(wordWindows, 0)
    expect(hit).toEqual({ segmentIndex: 0, wordIndex: 0 })
  })

  it('a time inside a later segment resolves to that segment\'s own word index, not segment 0\'s', () => {
    const lastSegmentFirstWord = wordWindows.find((w) => w.segmentIndex === 1 && w.wordIndex === 0)
    expect(lastSegmentFirstWord).toBeDefined()
    const hit = wordIndexForTime(wordWindows, (lastSegmentFirstWord!.startTime + lastSegmentFirstWord!.endTime) / 2)
    expect(hit).toEqual({ segmentIndex: 1, wordIndex: 0 })
  })

  it('a time past the very end still resolves to the last word (no gap right before onended)', () => {
    const hit = wordIndexForTime(wordWindows, 999)
    const last = wordWindows[wordWindows.length - 1]
    expect(hit).toEqual({ segmentIndex: last.segmentIndex, wordIndex: last.wordIndex })
  })

  it('an empty window list (duration not yet known) resolves to null, never a fake index', () => {
    expect(wordIndexForTime([], 5)).toBeNull()
    expect(buildWordTimeWindows(segments, 0)).toEqual([])
  })

  it('successive words within one segment get non-overlapping, increasing windows', () => {
    const firstSegmentWindows = wordWindows.filter((w) => w.segmentIndex === 0)
    for (let i = 1; i < firstSegmentWindows.length; i++) {
      expect(firstSegmentWindows[i].startTime).toBeCloseTo(firstSegmentWindows[i - 1].endTime, 5)
      expect(firstSegmentWindows[i].wordIndex).toBe(firstSegmentWindows[i - 1].wordIndex + 1)
    }
  })
})
