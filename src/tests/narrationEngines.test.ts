import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createBrowserSpeechEngine } from '@/lib/narration/engines/browserSpeechEngine'
import { createServerAudioEngine } from '@/lib/narration/engines/serverAudioEngine'
import { buildNarrationSegments } from '@/lib/narration/segments'

/**
 * Real behavioral tests of the two DOM-touching engines, using injected FAKE
 * Web Speech / Audio globals rather than jsdom (this project's vitest
 * environment is 'node' — see vitest.config.ts — and no jsdom/testing-
 * library dependency exists; every engine here accepts its browser API as a
 * constructor parameter specifically so it can be driven with a plain JS
 * double, the same technique VoicePlaybackManager's PlaybackSource already
 * uses for testability). This is the closest thing to an integration test
 * the trickiest logic in this feature has — real pause()/resume() call
 * sequences against a controllable fake, not just the abstract state
 * transitions covered in narrationPlaybackState.test.ts.
 *
 * `onWordStart(segmentIndex, wordIndex)` is the shared callback both engines
 * report through. In this top describe block every segment is exactly one
 * rendered word ("One.", "Two.", "Three."), so the tests only ever assert on
 * the SEGMENT index (the callback's first argument) — genuine word-level
 * behavior (present for the server engine, deliberately absent for the
 * browser engine — see browserSpeechEngine.ts's own header for why) is
 * covered in the two dedicated describe blocks further down.
 */

class FakeUtterance {
  text: string
  lang = ''
  pitch = 1
  rate = 1
  volume = 1
  voice: unknown
  onstart: (() => void) | null = null
  onend: (() => void) | null = null
  onerror: (() => void) | null = null
  onboundary: ((event: { charIndex: number }) => void) | null = null
  constructor(text: string) { this.text = text }
}

function makeFakeSynth() {
  const utterances: FakeUtterance[] = []
  return {
    utterances,
    pauseCalls: 0,
    resumeCalls: 0,
    cancelCalls: 0,
    getVoices: () => [] as SpeechSynthesisVoice[],
    speak(u: FakeUtterance) { utterances.push(u); u.onstart?.() },
    pause() { this.pauseCalls++ },
    resume() { this.resumeCalls++ },
    cancel() { this.cancelCalls++ },
  }
}

describe('browser speech engine — real pause()/resume() call sequences', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  const segments = buildNarrationSegments('First sentence. Second sentence. Third sentence.', 'msg')

  it('B/A — pausing MID-UTTERANCE and resuming reuses the SAME utterance (native pause/resume), never restarts it', () => {
    const synth = makeFakeSynth()
    const started: number[] = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    expect(started).toEqual([0])
    expect(synth.utterances).toHaveLength(1)

    engine.pause()
    expect(synth.pauseCalls).toBe(1)
    engine.resume()
    expect(synth.resumeCalls).toBe(1)
    // No new utterance was created — the SAME (paused) one continued.
    expect(synth.utterances).toHaveLength(1)
  })

  it('pause during the GAP BETWEEN segments defers the next segment instead of letting an already-scheduled timer fire', () => {
    const synth = makeFakeSynth()
    const started: number[] = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    // Segment 0 ends -> engine schedules segment 1 after the breathing pause.
    synth.utterances[0].onend?.()
    expect(started).toEqual([0]) // segment 1 not started yet — still in the gap

    // Pause DURING the gap, before the scheduled timer fires.
    engine.pause()
    vi.advanceTimersByTime(10_000) // even a huge amount of "real" time...
    expect(started).toEqual([0]) // ...must NOT start segment 1 while paused

    // Resume: segment 1 starts immediately, from the deferred index — not
    // segment 0 again, and not waiting for a timer that will never fire.
    engine.resume()
    expect(started).toEqual([0, 1])
    expect(synth.utterances).toHaveLength(2)
  })

  it('C — reaching the end of the last segment calls onEnded exactly once', () => {
    const synth = makeFakeSynth()
    let endedCount = 0
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: () => {}, onEnded: () => { endedCount++ }, onError: () => {} },
    )
    engine.start(0)
    synth.utterances[0].onend?.()
    vi.runAllTimers()
    synth.utterances[1].onend?.()
    vi.runAllTimers()
    synth.utterances[2].onend?.() // last segment
    expect(endedCount).toBe(1)
  })

  it('I — dispose() cancels the underlying speech and clears any pending gap timer (no leaked timer, no late segment start)', () => {
    const synth = makeFakeSynth()
    const started: number[] = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    synth.utterances[0].onend?.() // schedules segment 1 after a gap
    engine.dispose()
    expect(synth.cancelCalls).toBe(1)
    vi.runAllTimers()
    expect(started).toEqual([0]) // segment 1 never started — the timer was cleared
  })

  it('rapid Play/Pause (many toggles back to back) never desyncs pause state or double-starts a segment', () => {
    const synth = makeFakeSynth()
    const started: number[] = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    for (let i = 0; i < 10; i++) { engine.pause(); engine.resume() }
    expect(started).toEqual([0]) // still exactly one utterance in flight
    expect(synth.utterances).toHaveLength(1)
  })
})

/**
 * THE CORE INVARIANT: the browser engine never displays a single word ahead
 * of the voice, because it never claims to know a single word at all — only
 * the whole SEGMENT, reported via `onstart`/`onend`, both real and
 * unconditional per spec (unlike `onboundary`, which the Web Speech API spec
 * only requires browsers to fire on a best-effort "SHOULD" basis — see
 * browserSpeechEngine.ts's header for the full reasoning and the external
 * evidence behind it).
 *
 * This is a STRUCTURAL guarantee, not a statistical one: `onboundary` is not
 * wired into the display path at all anymore, so no volume or pattern of
 * `onboundary` events — a clean, evenly-spaced stream, or a burst of many
 * events arriving with zero elapsed time between them (the exact production
 * symptom that motivated this whole rewrite) — can move the reported word
 * position. The tests below drive both shapes and assert the identical
 * (non-)result, which is the point: the ARCHITECTURE makes the distinction
 * between them irrelevant, rather than trying to detect and compensate for
 * it (which is what the two PRIOR, reverted implementations attempted and
 * failed at).
 */
describe('browser speech engine — onboundary is not consulted for display; only onstart/onend move the reported position (2026-09-13)', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  const segments = buildNarrationSegments('The quick brown fox jumps.', 'boundary-msg')

  it('onstart reports the SEGMENT active with wordIndex null — no single word is claimed', () => {
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    expect(calls).toEqual([[0, null]])
  })

  it('7 — the FIRST segment is marked active with zero delay and zero special-casing, the same as every other segment (closes the prior architecture\'s admitted first-word gap)', () => {
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    // No fake-timer advance at all between start() and the assertion —
    // proving there is no hidden delay, not even a zero-length one, gating
    // the very first report the way the pacing-guard architecture's
    // documented limitation required.
    engine.start(0)
    expect(calls).toEqual([[0, null]])
  })

  it('6/THE REGRESSION CASE — a burst of onboundary events, arriving with ZERO elapsed real time (charIndex for word 0, 1, then 2, all before any real time passes), changes NOTHING — this is the exact reported production symptom', () => {
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    const utter = synth.utterances[0]
    expect(calls).toEqual([[0, null]])

    // "The quick brown fox jumps" -> boundary charIndex for "quick" (4),
    // "brown" (10), "fox" (16) — a real utterance's own boundary offsets —
    // fired back to back with NO advance of the fake clock between them,
    // simulating exactly the burst delivery reported in production.
    utter.onboundary?.({ charIndex: 4 })
    utter.onboundary?.({ charIndex: 10 })
    utter.onboundary?.({ charIndex: 16 })
    // Nothing changed — not even a queued/pending state to flush later.
    expect(calls).toEqual([[0, null]])
    vi.advanceTimersByTime(10_000)
    expect(calls).toEqual([[0, null]])
  })

  it('a normally-paced stream of onboundary events (real gaps between each) ALSO changes nothing — the architecture does not distinguish burst from real pacing, by design', () => {
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    const utter = synth.utterances[0]
    vi.advanceTimersByTime(400)
    utter.onboundary?.({ charIndex: 4 })
    vi.advanceTimersByTime(400)
    utter.onboundary?.({ charIndex: 10 })
    vi.advanceTimersByTime(400)
    utter.onboundary?.({ charIndex: 16 })
    expect(calls).toEqual([[0, null]])
  })

  it('an onboundary event missing a numeric charIndex is harmless — it was never read in the first place', () => {
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    expect(() => synth.utterances[0].onboundary?.({} as { charIndex: number })).not.toThrow()
    expect(calls).toEqual([[0, null]])
  })

  it('onend genuinely advances to the next segment — the one and only way the reported position ever moves within a lesson', () => {
    // Two-sentence text so there genuinely IS a "next segment" to advance to
    // (the burst tests above deliberately use one-sentence text, since they
    // never need a segment 1).
    const twoSegments = buildNarrationSegments('The quick brown fox jumps. Over the lazy dog.', 'advance-msg')
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      twoSegments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    synth.utterances[0].onboundary?.({ charIndex: 4 }) // ignored
    synth.utterances[0].onend?.()
    vi.runAllTimers() // the inter-segment gap
    expect(calls).toEqual([[0, null], [1, null]])
  })

  it('8 — pausing mid-segment (regardless of how many onboundary events fired first) freezes on that same segment; resume does not jump or re-fire it', () => {
    const twoSegments = buildNarrationSegments('The quick brown fox jumps. Over the lazy dog.', 'pause-mid-msg')
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      twoSegments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    const utter = synth.utterances[0]
    utter.onboundary?.({ charIndex: 4 })
    utter.onboundary?.({ charIndex: 10 })
    engine.pause()
    vi.advanceTimersByTime(10_000)
    expect(calls).toEqual([[0, null]]) // still frozen — no independent timer exists to move it
    engine.resume()
    vi.advanceTimersByTime(10_000)
    expect(calls).toEqual([[0, null]]) // native resume() continues the SAME utterance; onend hasn't fired yet
    utter.onend?.()
    vi.runAllTimers()
    expect(calls).toEqual([[0, null], [1, null]])
  })

  it('9 — non-vacuity: this test suite genuinely distinguishes the new architecture from the old one', () => {
    // A structural sanity check, not a live stash/restore (that is performed
    // once for the whole file at commit time — see the commit message).
    // A naive re-introduction of word-level onboundary handling would make
    // this specific call sequence report a non-null wordIndex; this
    // assertion records that the current implementation does not.
    const synth = makeFakeSynth()
    const calls: Array<[number, number | null]> = []
    const engine = createBrowserSpeechEngine(
      segments,
      { lang: 'en', voiceType: 'warm', speed: 1, speechSynthesisImpl: synth as unknown as SpeechSynthesis, UtteranceCtor: FakeUtterance as unknown as typeof SpeechSynthesisUtterance },
      { onWordStart: (seg, word) => calls.push([seg, word]), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    synth.utterances[0].onboundary?.({ charIndex: 10 }) // "brown" — would be word 2 under the old scheme
    expect(calls.some(([, w]) => w !== null)).toBe(false)
  })
})

/**
 * beginFetch()'s promise chain is `doFetch(...).then(res => res.blob()).then(blob => {...})`
 * — the FIRST `.then` returns a thenable (`res.blob()`), so resolving it costs an extra
 * microtask hop beyond what two bare `await Promise.resolve()` ticks flush. A `setTimeout`
 * tick runs only after the ENTIRE microtask queue drains, so it reliably flushes the whole
 * chain regardless of exactly how many `.then` hops the real implementation has.
 */
function flushAsyncWork(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

describe('server audio engine — real currentTime-driven sync + native pause/resume', () => {
  function makeFakeAudioCtor() {
    const instances: Array<{
      currentTime: number; duration: number
      onended: (() => void) | null; onerror: (() => void) | null; onloadedmetadata: (() => void) | null
      play: () => Promise<void>; pause: () => void
    }> = []
    class FakeAudio {
      currentTime = 0
      duration = 60
      onended: (() => void) | null = null
      onerror: (() => void) | null = null
      onloadedmetadata: (() => void) | null = null
      playCalls = 0
      pauseCalls = 0
      constructor(_src: string) { instances.push(this as never) }
      play() { this.playCalls++; return Promise.resolve() }
      pause() { this.pauseCalls++ }
    }
    return { FakeAudio, instances }
  }

  it('A/D/E — word/segment position tracks the real currentTime via an injected clock, not a fake wall timer', async () => {
    const { FakeAudio, instances } = makeFakeAudioCtor()
    let tick: (() => void) | null = null
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob()) })
    const started: number[] = []
    const engine = createServerAudioEngine(
      buildNarrationSegments('One. Two. Three.', 'x'),
      {
        lang: 'hi', voice: 'warm',
        fetchImpl: fakeFetch as unknown as typeof fetch,
        AudioCtor: FakeAudio as unknown as typeof Audio,
        createObjectURL: () => 'blob:fake',
        revokeObjectURL: () => {},
        scheduleTick: (cb) => { tick = cb; return () => { tick = null } },
      },
      { onWordStart: (i) => started.push(i), onEnded: () => {}, onError: () => {}, onProgress: () => {} },
    )
    engine.start(0)
    await flushAsyncWork() // let the fetch/blob promise chain settle

    const audio = instances[0]
    audio.duration = 60
    audio.onloadedmetadata?.()
    audio.currentTime = 0
    tick?.()
    expect(started).toEqual([0])

    // Move the REAL (fake, but authoritative) clock into segment 2's window.
    audio.currentTime = 45
    tick?.()
    expect(started[started.length - 1]).toBe(2)
  })

  it('word-level: a multi-word segment reports increasing word indices as currentTime advances through it', async () => {
    const { FakeAudio, instances } = makeFakeAudioCtor()
    let tick: (() => void) | null = null
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob()) })
    const wordCalls: Array<[number, number]> = []
    const engine = createServerAudioEngine(
      buildNarrationSegments('The quick brown fox jumps.', 'wordy'),
      {
        lang: 'hi', voice: 'warm',
        fetchImpl: fakeFetch as unknown as typeof fetch,
        AudioCtor: FakeAudio as unknown as typeof Audio,
        createObjectURL: () => 'blob:fake',
        revokeObjectURL: () => {},
        scheduleTick: (cb) => { tick = cb; return () => { tick = null } },
      },
      { onWordStart: (seg, word) => wordCalls.push([seg, word as number]), onEnded: () => {}, onError: () => {}, onProgress: () => {} },
    )
    engine.start(0)
    await flushAsyncWork()
    const audio = instances[0]
    audio.duration = 50 // 5 words, 10s each by character-weight-ish
    audio.onloadedmetadata?.()

    audio.currentTime = 0
    tick?.()
    audio.currentTime = 45 // near the end -> last word
    tick?.()

    expect(wordCalls[0]).toEqual([0, 0])
    expect(wordCalls[wordCalls.length - 1]).toEqual([0, 4])
    // Strictly increasing word indices, never a jump backward.
    for (let i = 1; i < wordCalls.length; i++) {
      expect(wordCalls[i][1]).toBeGreaterThanOrEqual(wordCalls[i - 1][1])
    }
  })

  it('REGRESSION — a word is applied the INSTANT the real audio.currentTime reaches its window, with no additional hold of any kind (the pacing-guard hold-back layer was removed — see serverAudioEngine.ts\'s header)', async () => {
    const { FakeAudio, instances } = makeFakeAudioCtor()
    let tick: (() => void) | null = null
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob()) })
    const wordCalls: Array<[number, number]> = []
    const engine = createServerAudioEngine(
      buildNarrationSegments('The quick brown fox jumps.', 'no-hold'),
      {
        lang: 'hi', voice: 'warm',
        fetchImpl: fakeFetch as unknown as typeof fetch,
        AudioCtor: FakeAudio as unknown as typeof Audio,
        createObjectURL: () => 'blob:fake',
        revokeObjectURL: () => {},
        scheduleTick: (cb) => { tick = cb; return () => { tick = null } },
      },
      { onWordStart: (seg, word) => wordCalls.push([seg, word as number]), onEnded: () => {}, onError: () => {}, onProgress: () => {} },
    )
    engine.start(0)
    await flushAsyncWork()
    const audio = instances[0]
    audio.duration = 50 // 5 words
    audio.onloadedmetadata?.()

    audio.currentTime = 0
    tick?.() // word 0
    expect(wordCalls).toEqual([[0, 0]])

    // The real clock jumps straight to word 3's window on the VERY NEXT
    // tick — a real, hardware-backed position, not an estimate of elapsed
    // wall-clock TIME (which the prior pacing-guard layer would have held
    // back). Applied immediately: the position itself is real, so there is
    // nothing left to wait for.
    audio.currentTime = 35
    tick?.()
    expect(wordCalls[wordCalls.length - 1]).toEqual([0, 3])
  })

  it('B — pause()/resume() use the native HTMLAudioElement calls, which preserve currentTime (and therefore word position) by construction', async () => {
    const { FakeAudio, instances } = makeFakeAudioCtor()
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob()) })
    const engine = createServerAudioEngine(
      buildNarrationSegments('One. Two.', 'x'),
      { lang: 'ru', voice: 'male', fetchImpl: fakeFetch as unknown as typeof fetch, AudioCtor: FakeAudio as unknown as typeof Audio, createObjectURL: () => 'blob:fake', revokeObjectURL: () => {}, scheduleTick: () => () => {} },
      { onWordStart: () => {}, onEnded: () => {}, onError: () => {}, onProgress: () => {} },
    )
    engine.start(0)
    await flushAsyncWork()
    const audio = instances[0] as unknown as { currentTime: number; pauseCalls: number; playCalls: number }
    audio.currentTime = 12.5
    engine.pause()
    expect(audio.pauseCalls).toBe(1)
    expect(audio.currentTime).toBe(12.5) // untouched — this IS what "preserves position" means here
    engine.resume()
    expect(audio.playCalls).toBe(2) // one from start(), one from resume()
    expect(audio.currentTime).toBe(12.5)
  })

  it('I — dispose() stops the sync loop and releases the audio element', async () => {
    const { FakeAudio, instances } = makeFakeAudioCtor()
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob()) })
    let stopped = false
    const engine = createServerAudioEngine(
      buildNarrationSegments('One. Two.', 'x'),
      {
        lang: 'hi', voice: 'warm', fetchImpl: fakeFetch as unknown as typeof fetch, AudioCtor: FakeAudio as unknown as typeof Audio,
        createObjectURL: () => 'blob:fake', revokeObjectURL: () => {},
        scheduleTick: () => () => { stopped = true },
      },
      { onWordStart: () => {}, onEnded: () => {}, onError: () => {}, onProgress: () => {} },
    )
    engine.start(0)
    await flushAsyncWork()
    const audio = instances[0] as unknown as { pauseCalls: number }
    engine.dispose()
    expect(stopped).toBe(true)
    expect(audio.pauseCalls).toBeGreaterThanOrEqual(1)
  })
})
