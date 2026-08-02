import { describe, it, expect, vi } from 'vitest'
import { VoicePlaybackManager, voicePlayback, type PlaybackSource } from '@/lib/voice/playbackManager'

/** A controllable source that records lifecycle, standing in for either the
 *  speechSynthesis path or the server-TTS <audio> path. */
function makeSource() {
  const calls = { started: 0, disposed: 0 }
  let cb: { onEnded: () => void; onError: () => void } | null = null
  const source: PlaybackSource = {
    start(callbacks) {
      calls.started += 1
      cb = callbacks
      return () => { calls.disposed += 1 }
    },
  }
  return {
    source, calls,
    end: () => cb?.onEnded(),
    fail: () => cb?.onError(),
    get live() { return calls.started - calls.disposed },
  }
}

describe('single playback instance', () => {
  it('starts one playback and reports it', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.start('a', a.source)
    expect(m.isPlaying('a')).toBe(true)
    expect(a.calls.started).toBe(1)
  })

  it('NEVER leaves two sources live at once', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource(); const b = makeSource(); const c = makeSource()
    m.start('a', a.source)
    m.start('b', b.source)
    m.start('c', c.source)
    expect(a.live).toBe(0)
    expect(b.live).toBe(0)
    expect(c.live).toBe(1)
    expect(m.isPlaying('c')).toBe(true)
  })

  it('a new response replaces the old playback (stop before start)', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource(); const b = makeSource()
    m.start('a', a.source)
    m.start('b', b.source)
    // The old one was disposed BEFORE the new one started.
    expect(a.calls.disposed).toBe(1)
    expect(m.isPlaying('a')).toBe(false)
  })
})

describe('interaction stops playback', () => {
  it('stop() halts immediately and synchronously', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.start('a', a.source)
    m.stop()
    expect(a.calls.disposed).toBe(1)
    expect(m.getState().playingId).toBeNull()
  })

  it('double stop is safe (send + enter key both firing)', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.start('a', a.source)
    m.stop(); m.stop(); m.stop()
    expect(a.calls.disposed).toBe(1)
    expect(m.getState().playingId).toBeNull()
  })

  it('stopping while idle is a harmless no-op', () => {
    const m = new VoicePlaybackManager()
    expect(() => m.stop()).not.toThrow()
    expect(m.getState().playingId).toBeNull()
  })
})

describe('race conditions — newest request always wins', () => {
  it('invalidates an in-flight generation on a newer start (MCQ double tap)', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    const gen = m.start('a', a.source)
    const b = makeSource()
    m.start('b', b.source)
    expect(m.isCurrent(gen)).toBe(false)
  })

  it('a stop invalidates an in-flight fetch generation', () => {
    const m = new VoicePlaybackManager()
    const gen = m.start('a', makeSource().source)
    m.stop()
    expect(m.isCurrent(gen)).toBe(false)
  })

  it('a LATE onEnded from a superseded playback cannot clear the new one', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource(); const b = makeSource()
    m.start('a', a.source)
    m.start('b', b.source)
    a.end() // stale completion arrives after the switch
    expect(m.isPlaying('b')).toBe(true)
  })

  it('disposes a source that was superseded DURING its own start()', () => {
    // Models: playback begins while an older disposal/teardown is still running.
    const m = new VoicePlaybackManager()
    let disposed = 0
    const reentrant: PlaybackSource = {
      start: () => { m.stop(); return () => { disposed += 1 } },
    }
    m.start('x', reentrant)
    expect(disposed).toBe(1)          // not leaked
    expect(m.getState().playingId).toBeNull()
  })

  it('rapid clicks leave exactly one live source', () => {
    const m = new VoicePlaybackManager()
    const sources = Array.from({ length: 25 }, () => makeSource())
    sources.forEach((s, i) => m.start(`id${i}`, s.source))
    expect(sources.filter((s) => s.live === 1)).toHaveLength(1)
    expect(sources[sources.length - 1].live).toBe(1)
  })
})

describe('completion and failure', () => {
  it('clears state when playback ends naturally', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.start('a', a.source)
    a.end()
    expect(m.getState().playingId).toBeNull()
  })

  it('clears state on playback error — no hanging loading state', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.start('a', a.source)
    a.fail()
    expect(m.getState().playingId).toBeNull()
  })

  it('a source that THROWS on start leaves no zombie player', () => {
    const m = new VoicePlaybackManager()
    const broken: PlaybackSource = { start: () => { throw new Error('tts failed') } }
    expect(() => m.start('bad', broken)).not.toThrow()
    expect(m.getState().playingId).toBeNull()
  })

  it('the next playback still works after a failure', () => {
    const m = new VoicePlaybackManager()
    m.start('bad', { start: () => { throw new Error('tts failed') } })
    const good = makeSource()
    m.start('good', good.source)
    expect(m.isPlaying('good')).toBe(true)
    expect(good.live).toBe(1)
  })

  it('a throwing disposer does not wedge the manager', () => {
    const m = new VoicePlaybackManager()
    m.start('a', { start: () => () => { throw new Error('dispose failed') } })
    expect(() => m.stop()).not.toThrow()
    const good = makeSource()
    m.start('b', good.source)
    expect(m.isPlaying('b')).toBe(true)
  })

  it('double end is safe', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.start('a', a.source)
    a.end(); a.end()
    expect(m.getState().playingId).toBeNull()
  })
})

describe('memory — no leaks', () => {
  it('unsubscribing removes the listener', () => {
    const m = new VoicePlaybackManager()
    const off = m.subscribe(() => {})
    expect(m.listenerCount()).toBe(1)
    off()
    expect(m.listenerCount()).toBe(0)
  })

  it('unsubscribing twice is safe', () => {
    const m = new VoicePlaybackManager()
    const off = m.subscribe(() => {})
    off(); off()
    expect(m.listenerCount()).toBe(0)
  })

  it('destroy() stops playback and drops every listener', () => {
    const m = new VoicePlaybackManager()
    const a = makeSource()
    m.subscribe(() => {}); m.subscribe(() => {})
    m.start('a', a.source)
    m.destroy()
    expect(a.calls.disposed).toBe(1)
    expect(m.listenerCount()).toBe(0)
    expect(m.getState().playingId).toBeNull()
  })

  it('every started source is eventually disposed across a long session', () => {
    const m = new VoicePlaybackManager()
    const all = Array.from({ length: 50 }, () => makeSource())
    all.forEach((s, i) => m.start(`m${i}`, s.source))
    m.stop()
    expect(all.every((s) => s.live === 0)).toBe(true)
  })

  it('a listener removed during emit is not called again', () => {
    const m = new VoicePlaybackManager()
    const seen: string[] = []
    const off = m.subscribe(() => { seen.push('x'); off() })
    m.start('a', makeSource().source)
    m.stop()
    expect(seen).toHaveLength(1)
  })
})

describe('subscribers observe transitions', () => {
  it('notifies on start and on stop', () => {
    const m = new VoicePlaybackManager()
    const spy = vi.fn()
    m.subscribe(spy)
    m.start('a', makeSource().source)
    m.stop()
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy.mock.calls[0][0].playingId).toBe('a')
    expect(spy.mock.calls[1][0].playingId).toBeNull()
  })
})

describe('lesson switch / navigation semantics', () => {
  it('nothing from lesson A survives into lesson B', () => {
    const m = new VoicePlaybackManager()
    const lessonA = makeSource()
    m.start('lessonA-msg1', lessonA.source)
    // Lesson change calls stop() — queued/loading work is invalidated too.
    const genA = m.getState().generation
    m.stop()
    expect(lessonA.live).toBe(0)
    expect(m.isCurrent(genA)).toBe(false)
    const lessonB = makeSource()
    m.start('lessonB-msg1', lessonB.source)
    expect(m.isPlaying('lessonB-msg1')).toBe(true)
    expect(lessonA.live).toBe(0)
  })
})

describe('the shared singleton', () => {
  it('is one instance, so only one voice can play app-wide', () => {
    voicePlayback.stop()
    const a = makeSource()
    voicePlayback.start('shared-a', a.source)
    expect(voicePlayback.isPlaying('shared-a')).toBe(true)
    const b = makeSource()
    voicePlayback.start('shared-b', b.source)
    expect(a.live).toBe(0)
    expect(b.live).toBe(1)
    voicePlayback.stop()
    expect(b.live).toBe(0)
  })
})
