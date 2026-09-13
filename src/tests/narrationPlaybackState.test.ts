import { describe, it, expect } from 'vitest'
import {
  idle, loading, playing, paused, completed, errored, restarted,
  isActivelyPlaying, needsFreshStart, segmentIndexForProgress,
} from '@/lib/narration/playbackState'
import { buildNarrationSegments } from '@/lib/narration/segments'
import type { NarrationPlaybackState } from '@/lib/narration/types'

/**
 * Pure, DOM-free tests of the playback state machine — no audio, no timers,
 * no React. This is where "pause preserves position" (segment AND word),
 * "resume begins at that exact position," and "completion is handled
 * cleanly" are proven, independent of which engine (browser speech or
 * server audio) drives them.
 */

describe('A/B — pause preserves position, resume begins exactly there', () => {
  it('pause() carries the active segment, word, and progress forward unchanged', () => {
    const s1 = playing(idle(), 3, null, 42)
    const s2 = paused(s1)
    expect(s2.status).toBe('PAUSED')
    expect(s2.activeSegmentIndex).toBe(3)
    expect(s2.progressPercent).toBe(42)
  })

  it('resuming (playing() called again with the SAME index the pause left) does not change position', () => {
    const s1 = playing(idle(), 5, null, 61)
    const s2 = paused(s1)
    const s3 = playing(s2, s2.activeSegmentIndex ?? 0)
    expect(s3.status).toBe('PLAYING')
    expect(s3.activeSegmentIndex).toBe(5)
  })

  it('multiple pause/resume cycles never drift the position', () => {
    let s: NarrationPlaybackState = playing(idle(), 2)
    for (let i = 0; i < 5; i++) {
      s = paused(s)
      expect(s.activeSegmentIndex).toBe(2)
      s = playing(s, s.activeSegmentIndex ?? 0)
      expect(s.activeSegmentIndex).toBe(2)
    }
  })

  it('pause mid-sentence (an arbitrary segment, not segment 0) still preserves exactly that segment', () => {
    const s = paused(playing(idle(), 7, null, 88))
    expect(s.activeSegmentIndex).toBe(7)
    expect(s.progressPercent).toBe(88)
  })

  it('rapid play/pause (many toggles in a row) still ends on the last-set position, never resets to 0', () => {
    let s: NarrationPlaybackState = idle()
    const indices = [0, 1, 1, 2, 2, 2, 3]
    for (const i of indices) {
      s = playing(s, i)
      s = paused(s)
    }
    expect(s.activeSegmentIndex).toBe(3)
  })
})

describe('word-level position: pause freezes the active word, resume/replay treat it correctly', () => {
  it('pause() freezes the exact active WORD, not just the segment', () => {
    const s1 = playing(idle(), 2, 5)
    const s2 = paused(s1)
    expect(s2.status).toBe('PAUSED')
    expect(s2.activeSegmentIndex).toBe(2)
    expect(s2.activeWordIndex).toBe(5)
  })

  it('resume (playing() called again with the paused segment AND word) preserves the exact word — never restarts the segment at word 0', () => {
    const paused1 = paused(playing(idle(), 2, 5))
    const resumed = playing(paused1, paused1.activeSegmentIndex ?? 0, paused1.activeWordIndex)
    expect(resumed.status).toBe('PLAYING')
    expect(resumed.activeSegmentIndex).toBe(2)
    expect(resumed.activeWordIndex).toBe(5)
  })

  it('a fresh playing() call with no word index defaults to null (segment just started, no word signal yet)', () => {
    const s = playing(idle(), 0)
    expect(s.activeWordIndex).toBeNull()
  })

  it('advancing through several words in one segment via repeated playing() calls updates only the word index', () => {
    let s: NarrationPlaybackState = playing(idle(), 4, 0)
    for (const w of [1, 2, 3, 4]) {
      s = playing(s, 4, w)
      expect(s.activeSegmentIndex).toBe(4)
      expect(s.activeWordIndex).toBe(w)
    }
  })

  it('replay (restarted()) resets to word 0, the ONLY transition allowed to do so', () => {
    const midWord = paused(playing(idle(), 3, 9))
    expect(midWord.activeWordIndex).toBe(9)
    const replayed = restarted()
    expect(replayed.activeSegmentIndex).toBe(0)
    expect(replayed.activeWordIndex).toBe(0)
  })
})

describe('C — completion is handled cleanly', () => {
  it('completed() lands on the LAST segment, at 100%, status COMPLETED, with NO word highlighted', () => {
    const s = completed(6)
    expect(s).toEqual({ status: 'COMPLETED', activeSegmentIndex: 5, activeWordIndex: null, progressPercent: 100 })
  })

  it('completing with zero segments never claims an out-of-range index', () => {
    const s = completed(0)
    expect(s.activeSegmentIndex).toBeNull()
    expect(s.activeWordIndex).toBeNull()
  })

  it('needsFreshStart is true after completion — pressing Play again must start over, not "resume" nowhere', () => {
    expect(needsFreshStart(completed(4))).toBe(true)
  })

  it('replay after completion is the ONE case allowed to jump back to the start (segment 0, word 0)', () => {
    const afterCompletion = completed(4)
    expect(needsFreshStart(afterCompletion)).toBe(true)
    const replayed = restarted()
    expect(replayed).toEqual({ status: 'PLAYING', activeSegmentIndex: 0, activeWordIndex: 0, progressPercent: 0 })
  })

  it('an audio/network error clears position (segment AND word) and requires a fresh start too — never a hanging LOADING state', () => {
    const s = errored()
    expect(s.status).toBe('ERROR')
    expect(s.activeWordIndex).toBeNull()
    expect(needsFreshStart(s)).toBe(true)
  })

  it('idle() and loading() both carry no active word', () => {
    expect(idle().activeWordIndex).toBeNull()
    expect(loading().activeWordIndex).toBeNull()
  })
})

describe('state predicates used by the UI to decide Play vs Pause vs Replay', () => {
  it('isActivelyPlaying is true only in PLAYING', () => {
    expect(isActivelyPlaying(playing(idle(), 0))).toBe(true)
    expect(isActivelyPlaying(paused(playing(idle(), 0)))).toBe(false)
    expect(isActivelyPlaying(loading())).toBe(false)
    expect(isActivelyPlaying(idle())).toBe(false)
  })

  it('needsFreshStart is false while PAUSED or PLAYING (there IS something to resume/is already going)', () => {
    expect(needsFreshStart(playing(idle(), 0))).toBe(false)
    expect(needsFreshStart(paused(playing(idle(), 0)))).toBe(false)
  })

  it('needsFreshStart is true for IDLE (never started)', () => {
    expect(needsFreshStart(idle())).toBe(true)
  })
})

describe('segmentIndexForProgress — the server-audio path\'s coarse position readout', () => {
  const segments = buildNarrationSegments('One. Two. Three. Four.', 'x')

  it('maps 0% to the first segment and ~100% to the last', () => {
    expect(segmentIndexForProgress(segments, 0)).toBe(0)
    expect(segmentIndexForProgress(segments, 99.9)).toBe(3)
  })

  it('never returns an out-of-range index for an empty segment list', () => {
    expect(segmentIndexForProgress([], 50)).toBeNull()
  })
})
