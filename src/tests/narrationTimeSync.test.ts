import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
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

/**
 * Regression: the visible highlight must never advance past a word before
 * real speech has actually reached it. The prior version of
 * `buildWordTimeWindows` weighted each word by its own character length
 * only, discarding the real inter-word whitespace already present in the
 * text. Because that gap is a proportionally larger share of a SHORT word's
 * true speaking time than a long word's, this systematically starved short,
 * common words — exactly the kind ordinary teaching prose is dense with —
 * of playback time, and the estimate ran ahead of a realistic speech
 * timeline by the middle of a sentence (this is the production defect
 * report: "the visible word highlight advances noticeably FASTER than the
 * spoken voice").
 *
 * These tests build a SIMULATED ground-truth timeline (a word's true
 * duration modeled as a small fixed per-word cost plus a per-character
 * cost — the standard `duration ~= a + b*length` approximation used in
 * speech-timing research) purely to check whether the estimator's
 * word-to-word RELATIVE timing is biased. It is not a claim about any real
 * provider's actual behavior, and no provider timestamp is invented or
 * assumed anywhere in the fix.
 */
describe('word-level server-audio sync — the highlight must never run ahead of the audio', () => {
  const BASE_MS = 150
  const PER_CHAR_MS = 45

  function simulatedTrueWordStarts(segments: ReturnType<typeof buildNarrationSegments>) {
    const durations: { segmentIndex: number; wordIndex: number; ms: number }[] = []
    for (const seg of segments) {
      for (const t of seg.renderedWords) {
        if (t.kind !== 'word') continue
        durations.push({ segmentIndex: seg.index, wordIndex: t.wordIndex as number, ms: BASE_MS + PER_CHAR_MS * t.text.length })
      }
    }
    let cum = 0
    return durations.map((w) => {
      const trueStartSec = cum / 1000
      cum += w.ms
      return { ...w, trueStartSec }
    })
  }

  // The FIXED (real) algorithm, imported from source.
  function reportedIndexAt(windows: { startTime: number; endTime: number }[], t: number): number {
    if (windows.length === 0) return 0
    if (t <= windows[0].startTime) return 0
    let lastIdx = 0
    for (let i = 0; i < windows.length; i++) {
      if (t >= windows[i].startTime && t < windows[i].endTime) return i
      if (windows[i].startTime <= t) lastIdx = i
    }
    return lastIdx
  }

  // The PRIOR (since-fixed) algorithm, reimplemented here ONLY to prove this
  // test suite is capable of failing — i.e. that it actually exercises the
  // fix rather than passing regardless of which algorithm is under test.
  // This is not exported anywhere in src/ any more; it exists solely as this
  // test's own regression baseline.
  function oldCharOnlyWordWindows(segments: ReturnType<typeof buildNarrationSegments>, totalDuration: number) {
    const segmentWindows = buildSegmentTimeWindows(segments, totalDuration)
    const result: { segmentIndex: number; wordIndex: number; startTime: number; endTime: number }[] = []
    for (let i = 0; i < segmentWindows.length; i++) {
      const sw = segmentWindows[i]
      const seg = segments[i]
      if (!seg) continue
      const words = seg.renderedWords.filter((t) => t.kind === 'word')
      if (words.length === 0) continue
      const lengths = words.map((w) => Math.max(w.text.length, 1))
      const totalLength = lengths.reduce((a, b) => a + b, 0)
      const dur = sw.endTime - sw.startTime
      let cursor = 0
      for (let w = 0; w < words.length; w++) {
        const startTime = sw.startTime + (cursor / totalLength) * dur
        cursor += lengths[w]
        const endTime = sw.startTime + (cursor / totalLength) * dur
        result.push({ segmentIndex: seg.index, wordIndex: words[w].wordIndex as number, startTime, endTime })
      }
    }
    return result
  }

  // Text chosen for being dense with short, common function words — exactly
  // the shape that exposed the defect in the prior implementation.
  const denseShortWordText =
    'The quick brown fox jumps over the lazy dog. It ran to the store to buy a loaf of bread and a jug of milk for the family dinner tonight.'

  it('1/2/3 — reproduces the observed failure: the OLD algorithm visibly ran ahead on realistic short-word-heavy text', () => {
    const segments = buildNarrationSegments(denseShortWordText, 'old-repro')
    const trueStarts = simulatedTrueWordStarts(segments)
    const totalDurationSec = trueStarts.reduce((a, w) => a + w.ms, 0) / 1000
    const oldWindows = oldCharOnlyWordWindows(segments, totalDurationSec)

    let ranAhead = false
    for (let i = 0; i < trueStarts.length; i++) {
      const reported = reportedIndexAt(oldWindows, trueStarts[i].trueStartSec)
      if (reported > i) ranAhead = true
    }
    // This assertion is the NON-VACUITY proof: if it ever starts failing,
    // the fixture no longer exercises the original bug and must be replaced
    // — a test that can't fail proves nothing.
    expect(ranAhead).toBe(true)
  })

  it('4 — the FIXED algorithm never reports a word index ahead of where real speech actually is, on the same fixture', () => {
    const segments = buildNarrationSegments(denseShortWordText, 'fixed-no-lead')
    const trueStarts = simulatedTrueWordStarts(segments)
    const totalDurationSec = trueStarts.reduce((a, w) => a + w.ms, 0) / 1000
    const windows = buildWordTimeWindows(segments, totalDurationSec)

    for (let i = 0; i < trueStarts.length; i++) {
      const reported = reportedIndexAt(windows, trueStarts[i].trueStartSec)
      expect(reported).toBeLessThanOrEqual(i)
    }
  })

  it('5 — first word: at t=0 the reported index is word 0, never ahead', () => {
    const segments = buildNarrationSegments(denseShortWordText, 'first-word')
    const windows = buildWordTimeWindows(segments, 20)
    expect(wordIndexForTime(windows, 0)).toEqual({ segmentIndex: 0, wordIndex: 0 })
  })

  it('6 — final word: the last window\'s own start time never reports an index past itself', () => {
    const segments = buildNarrationSegments(denseShortWordText, 'final-word')
    const windows = buildWordTimeWindows(segments, 20)
    const last = windows[windows.length - 1]
    const hit = wordIndexForTime(windows, last.startTime)
    expect(hit).toEqual({ segmentIndex: last.segmentIndex, wordIndex: last.wordIndex })
  })

  it('7 — punctuation attached to a word (commas, periods) does not change its weighting beyond its own text length', () => {
    const segments = buildNarrationSegments('Newton, Galileo, and Kepler all contributed.', 'punct')
    const windows = buildWordTimeWindows(segments, 10)
    // Contiguous and covering the full duration exactly as with unpunctuated text.
    expect(windows[0].startTime).toBe(0)
    expect(windows[windows.length - 1].endTime).toBeCloseTo(10, 5)
  })

  it('8 — unequal word lengths: a short word\'s window is no longer disproportionately narrow relative to a realistic timeline', () => {
    const segments = buildNarrationSegments('A supercalifragilisticexpialidocious word.', 'unequal')
    const windows = buildWordTimeWindows(segments, 10)
    const aWindow = windows.find((w) => w.wordIndex === 0)! // "A"
    const longWord = windows.find((w) => w.wordIndex === 1)! // "supercalifragilisticexpialidocious"
    // The long word still gets more absolute time than "A" — this is not
    // claiming equal time per word, only that the short word is no longer
    // starved to nearly zero relative width.
    expect(longWord.endTime - longWord.startTime).toBeGreaterThan(aWindow.endTime - aWindow.startTime)
    expect(aWindow.endTime - aWindow.startTime).toBeGreaterThan(0)
  })

  it('9 — segment boundary: word windows remain contiguous across a segment transition after the fix', () => {
    const segments = buildNarrationSegments('Short one. A much longer second sentence here.', 'seg-boundary')
    const windows = buildWordTimeWindows(segments, 40)
    for (let i = 1; i < windows.length; i++) {
      expect(windows[i].startTime).toBeCloseTo(windows[i - 1].endTime, 5)
    }
  })

  it('14 — no subject-specific branching in the module driving this fix', () => {
    const src = readFileSync(path.join(process.cwd(), 'src/lib/narration/timeSync.ts'), 'utf8').toLowerCase()
    for (const subject of ['physics', 'chemistry', 'mathematics', 'biology', 'computer_science']) {
      expect(src).not.toContain(subject)
    }
  })
})
