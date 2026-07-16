/**
 * Voice Signal Recovery tests (Claude Recommendation #7): proves
 * extractVoiceTimingSignal correctly recovers timing/confidence metadata
 * from Whisper verbose_json output, degrades gracefully on missing/
 * malformed data (the previous plain-json contract), and is fully
 * deterministic. Follows masteryGate.test.ts's fixture convention.
 */
import { describe, it, expect } from 'vitest'
import {
  extractVoiceTimingSignal,
  type WhisperVerboseTranscription,
  type WhisperVerboseSegment,
} from '@/lib/voice/voiceSignal'

function seg(start: number, end: number, over: Partial<WhisperVerboseSegment> = {}): WhisperVerboseSegment {
  return { start, end, ...over }
}

function transcript(over: Partial<WhisperVerboseTranscription> = {}): WhisperVerboseTranscription {
  return { text: 'hello world', ...over }
}

// ── verbose_json parsing ─────────────────────────────────────────────────────

describe('verbose_json parsing', () => {
  it('reads duration and segment count from a well-formed verbose_json payload', () => {
    const signal = extractVoiceTimingSignal(transcript({
      duration: 5.2,
      segments: [seg(0, 1.5), seg(2, 4.0), seg(4.2, 5.2)],
    }))
    expect(signal.durationMs).toBe(5200)
    expect(signal.segmentCount).toBe(3)
  })

  it('computes avgConfidence from avg_logprob via exp(), clamped to [0,1]', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1, { avg_logprob: 0 }), seg(1, 2, { avg_logprob: -0.5 })],
    }))
    // exp(0) = 1, exp(-0.5) ≈ 0.6065 → mean ≈ 0.80326
    expect(signal.avgConfidence).not.toBeNull()
    expect(signal.avgConfidence!).toBeCloseTo((1 + Math.exp(-0.5)) / 2, 6)
  })

  it('ignores no_speech_prob (not used for confidence in this heuristic) without crashing', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1, { no_speech_prob: 0.9 })],
    }))
    expect(signal.segmentCount).toBe(1)
  })
})

// ── Backward compatibility ───────────────────────────────────────────────────

describe('backward compatibility', () => {
  it('a bare { text } payload (the previous plain-json contract) yields an all-null/zero signal, never throws', () => {
    const signal = extractVoiceTimingSignal(transcript())
    expect(signal).toEqual({
      durationMs: null,
      speechDurationMs: null,
      silenceDurationMs: null,
      segmentCount: 0,
      pauseCount: 0,
      totalPauseMs: 0,
      longestPauseMs: 0,
      avgConfidence: null,
    })
  })

  it('missing duration but present segments still yields a speech duration (durationMs stays null)', () => {
    const signal = extractVoiceTimingSignal(transcript({ segments: [seg(0, 1)] }))
    expect(signal.durationMs).toBeNull()
    expect(signal.speechDurationMs).toBe(1000)
    expect(signal.silenceDurationMs).toBeNull()
  })

  it('non-array segments field degrades to zero segments rather than throwing', () => {
    const signal = extractVoiceTimingSignal({ text: 'x', segments: 'not-an-array' as unknown as WhisperVerboseSegment[] })
    expect(signal.segmentCount).toBe(0)
  })

  it('malformed segment entries (non-finite/NaN start or end) are excluded, not fatal', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1), seg(NaN, 2), seg(3, Infinity), { start: 4, end: 3 }],
    }))
    // Only seg(0,1) is valid: NaN start invalid, Infinity end invalid, end<start invalid.
    expect(signal.speechDurationMs).toBe(1000)
  })
})

// ── Timing extraction ────────────────────────────────────────────────────────

describe('timing extraction', () => {
  it('sums (end - start) across segments for speechDurationMs', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1), seg(1.5, 3)], // 1s + 1.5s = 2.5s
    }))
    expect(signal.speechDurationMs).toBe(2500)
  })

  it('computes silenceDurationMs as durationMs - speechDurationMs when both known', () => {
    const signal = extractVoiceTimingSignal(transcript({
      duration: 4,
      segments: [seg(0, 1), seg(2, 3)], // 2s speech out of 4s total
    }))
    expect(signal.silenceDurationMs).toBe(2000)
  })

  it('clamps silenceDurationMs at 0 rather than going negative', () => {
    const signal = extractVoiceTimingSignal(transcript({
      duration: 1, // shorter than the segments imply — shouldn't happen, but must not crash/go negative
      segments: [seg(0, 2)],
    }))
    expect(signal.silenceDurationMs).toBe(0)
  })

  it('counts a gap at or above the 300ms pause threshold as a pause', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1), seg(1.3, 2)], // exactly 300ms gap
    }))
    expect(signal.pauseCount).toBe(1)
    expect(signal.totalPauseMs).toBe(300)
    expect(signal.longestPauseMs).toBe(300)
  })

  it('does not count a gap below the pause threshold', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1), seg(1.1, 2)], // 100ms gap
    }))
    expect(signal.pauseCount).toBe(0)
    expect(signal.totalPauseMs).toBe(0)
  })

  it('accumulates multiple pauses and tracks the longest one', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1), seg(1.5, 2), seg(3, 3.5), seg(4.5, 5)],
      // gaps: 500ms, 1000ms, 1000ms — all pauses
    }))
    expect(signal.pauseCount).toBe(3)
    expect(signal.totalPauseMs).toBe(2500)
    expect(signal.longestPauseMs).toBe(1000)
  })

  it('a single segment has zero pauses (no gap to measure)', () => {
    const signal = extractVoiceTimingSignal(transcript({ segments: [seg(0, 1)] }))
    expect(signal.pauseCount).toBe(0)
    expect(signal.longestPauseMs).toBe(0)
  })

  it('zero segments yields zero pauses and a null speech duration', () => {
    const signal = extractVoiceTimingSignal(transcript({ segments: [] }))
    expect(signal.pauseCount).toBe(0)
    expect(signal.speechDurationMs).toBeNull()
  })
})

// ── Deterministic signal generation ──────────────────────────────────────────

describe('deterministic signal generation', () => {
  it('identical input always yields an identical signal (pure function, no clock/randomness)', () => {
    const t = transcript({
      duration: 6,
      segments: [seg(0, 1, { avg_logprob: -0.2 }), seg(1.5, 3, { avg_logprob: -0.1 }), seg(4, 5.5, { avg_logprob: -0.3 })],
    })
    const a = extractVoiceTimingSignal(t)
    const b = extractVoiceTimingSignal(t)
    expect(a).toEqual(b)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('does not mutate the input transcription object', () => {
    const t = transcript({ duration: 2, segments: [seg(0, 1)] })
    const before = JSON.stringify(t)
    extractVoiceTimingSignal(t)
    expect(JSON.stringify(t)).toBe(before)
  })

  it('200 repeated calls on the same input produce byte-identical output', () => {
    const t = transcript({
      duration: 3.3,
      segments: [seg(0, 1.1, { avg_logprob: -0.05 }), seg(1.4, 3.3, { avg_logprob: -0.4 })],
    })
    const results = Array.from({ length: 200 }, () => JSON.stringify(extractVoiceTimingSignal(t)))
    expect(new Set(results).size).toBe(1)
  })
})

// ── Regression ────────────────────────────────────────────────────────────────

describe('regression', () => {
  it('a completely empty transcription object beyond text never throws', () => {
    expect(() => extractVoiceTimingSignal({ text: '' })).not.toThrow()
  })

  it('avgConfidence is null (not NaN or 0) when no segment carries avg_logprob', () => {
    const signal = extractVoiceTimingSignal(transcript({ segments: [seg(0, 1), seg(1.5, 2)] }))
    expect(signal.avgConfidence).toBeNull()
  })

  it('avgConfidence only averages segments that do carry avg_logprob, skipping ones that do not', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1, { avg_logprob: 0 }), seg(1.5, 2)], // second segment has no avg_logprob
    }))
    expect(signal.avgConfidence).toBeCloseTo(1, 6) // exp(0) = 1, averaged over just the one valid entry
  })

  it('segmentCount reflects the raw segment array length even when some entries are invalid', () => {
    const signal = extractVoiceTimingSignal(transcript({
      segments: [seg(0, 1), { start: 5, end: 3 }], // second is invalid (end < start)
    }))
    expect(signal.segmentCount).toBe(2)
    expect(signal.speechDurationMs).toBe(1000) // only the valid one counted
  })

  it('rounds millisecond fields to whole numbers (no floating-point noise leaks into evidence)', () => {
    const signal = extractVoiceTimingSignal(transcript({
      duration: 1.23456,
      segments: [seg(0, 0.100001)],
    }))
    expect(Number.isInteger(signal.durationMs)).toBe(true)
    expect(Number.isInteger(signal.speechDurationMs!)).toBe(true)
  })
})
