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
      { onSegmentStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
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
      { onSegmentStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
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
      { onSegmentStart: () => {}, onEnded: () => { endedCount++ }, onError: () => {} },
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
      { onSegmentStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
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
      { onSegmentStart: (i) => started.push(i), onEnded: () => {}, onError: () => {} },
    )
    engine.start(0)
    for (let i = 0; i < 10; i++) { engine.pause(); engine.resume() }
    expect(started).toEqual([0]) // still exactly one utterance in flight
    expect(synth.utterances).toHaveLength(1)
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

  it('A/D/E — segment index tracks the real currentTime via an injected clock, not a fake wall timer', async () => {
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
      { onSegmentStart: (i) => started.push(i), onEnded: () => {}, onError: () => {}, onProgress: () => {} },
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

  it('B — pause()/resume() use the native HTMLAudioElement calls, which preserve currentTime by construction', async () => {
    const { FakeAudio, instances } = makeFakeAudioCtor()
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob()) })
    const engine = createServerAudioEngine(
      buildNarrationSegments('One. Two.', 'x'),
      { lang: 'ru', voice: 'male', fetchImpl: fakeFetch as unknown as typeof fetch, AudioCtor: FakeAudio as unknown as typeof Audio, createObjectURL: () => 'blob:fake', revokeObjectURL: () => {}, scheduleTick: () => () => {} },
      { onSegmentStart: () => {}, onEnded: () => {}, onError: () => {}, onProgress: () => {} },
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
      { onSegmentStart: () => {}, onEnded: () => {}, onError: () => {}, onProgress: () => {} },
    )
    engine.start(0)
    await flushAsyncWork()
    const audio = instances[0] as unknown as { pauseCalls: number }
    engine.dispose()
    expect(stopped).toBe(true)
    expect(audio.pauseCalls).toBeGreaterThanOrEqual(1)
  })
})
