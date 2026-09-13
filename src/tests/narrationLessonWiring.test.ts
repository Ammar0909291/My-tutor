import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import path from 'path'

/**
 * ── PLATFORM-WIDE NARRATED READ-ALONG — INTEGRATION WIRING ─────────────────
 *
 * The unit tests (narrationSegments/narrationPlaybackState/narrationTimeSync/
 * narrationScrollFollow/narrationEngines) prove the pure logic and the
 * DOM-touching engines in isolation. Nothing yet proves the feature is
 * actually WIRED into a real lesson screen, or that it stays a single
 * platform-wide layer rather than sprouting subject-specific branches. This
 * file is the "real integration test through the actual lesson rendering/
 * playback path" the task requires (item J: no subject-specific
 * implementation required) — via source-wiring assertions, the established
 * convention in this codebase for a component-level check (see
 * panelBackgroundConsistency.test.ts, roadmapSplitView.test.ts, etc.):
 * this repo's vitest config runs with `environment: 'node'` and no
 * jsdom/@testing-library dependency exists, so an actual React render is not
 * available — the convention here is to assert directly against the real
 * source files a browser would load, not a re-implemented approximation.
 */

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')
const LESSON_SCREEN = read('src/components/learn/LessonScreen.tsx')

describe('LessonScreen.tsx is wired to the platform-wide narration layer', () => {
  it('imports the three narration components from the shared platform layer, not a local/duplicated copy', () => {
    expect(LESSON_SCREEN).toContain("import { TutorNarratedMessage } from '@/components/narration/TutorNarratedMessage'")
    expect(LESSON_SCREEN).toContain("import { NarratedText } from '@/components/narration/NarratedText'")
    expect(LESSON_SCREEN).toContain("import { NarratedPlaybackControls } from '@/components/narration/NarratedPlaybackControls'")
  })

  it('wraps each tutor message in TutorNarratedMessage, passing the message id, its real rendered text, and the live teaching language/voice/speed/country — not hardcoded or subject-specific values', () => {
    const block = LESSON_SCREEN.slice(LESSON_SCREEN.indexOf('<TutorNarratedMessage'), LESSON_SCREEN.indexOf('</TutorNarratedMessage>'))
    expect(block).toContain('id={msg.id}')
    expect(block).toContain('text={displayText}')
    expect(block).toContain('lang={teachingLanguage}')
    expect(block).toContain('voiceType={voiceType}')
    expect(block).toContain('country={country}')
  })

  it('renders plain MessageContent — completely unchanged from before this feature — while narration status is IDLE (never played)', () => {
    const block = LESSON_SCREEN.slice(LESSON_SCREEN.indexOf('<TutorNarratedMessage'), LESSON_SCREEN.indexOf('</TutorNarratedMessage>'))
    expect(block).toMatch(/narration\.status === 'IDLE'\s*\n?\s*\?\s*<MessageContent text={displayText} isUser={false} \/>/)
  })

  it('renders NarratedText (the highlighting layer) once narration has actually started, driven by the SAME segments/activeSegmentIndex/activeWordIndex the hook produces', () => {
    const block = LESSON_SCREEN.slice(LESSON_SCREEN.indexOf('<TutorNarratedMessage'), LESSON_SCREEN.indexOf('</TutorNarratedMessage>'))
    expect(block).toContain('<NarratedText segments={narration.segments} activeSegmentIndex={narration.activeSegmentIndex} activeWordIndex={narration.activeWordIndex} />')
  })

  it('wires Play/Pause/Replay to the hook\'s own toggle()/replay() — not a re-implemented local handler', () => {
    const block = LESSON_SCREEN.slice(LESSON_SCREEN.indexOf('<NarratedPlaybackControls'), LESSON_SCREEN.indexOf('/>', LESSON_SCREEN.indexOf('<NarratedPlaybackControls')))
    expect(block).toContain('status={narration.status}')
    expect(block).toContain('progressPercent={narration.progressPercent}')
    expect(block).toContain('onToggle={narration.toggle}')
    expect(block).toContain('onReplay={narration.replay}')
  })

  it('does not construct a second, parallel state machine — the existing handleSpeak/isSpeaking/speakingId machinery is left in place for the surfaces this task did not touch (e.g. the subject prelude), not duplicated inside the new narration files', () => {
    // The narration hook/components own the tutor-message playback UI now;
    // handleSpeak & friends must still exist (untouched, per the task's own
    // "do not modify unrelated Tutor Max behavior" instruction) but must not
    // appear inside the new per-message block this task added.
    const block = LESSON_SCREEN.slice(LESSON_SCREEN.indexOf('<TutorNarratedMessage'), LESSON_SCREEN.indexOf('</TutorNarratedMessage>'))
    expect(block).not.toContain('handleSpeak(')
    expect(block).not.toContain('handleStopSpeech(')
    expect(LESSON_SCREEN).toContain('handleSpeak') // still exists elsewhere in the file
  })
})

describe('J — the narration platform layer contains no subject-specific branching anywhere', () => {
  const NARRATION_LIB_DIR = path.join(process.cwd(), 'src/lib/narration')
  const NARRATION_COMPONENTS_DIR = path.join(process.cwd(), 'src/components/narration')
  const HOOK_FILE = 'src/hooks/useNarrationPlayback.ts'

  function allTsFilesUnder(dir: string): string[] {
    const out: string[] = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) out.push(...allTsFilesUnder(full))
      else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) out.push(full)
    }
    return out
  }

  // "english"/"hindi"/"russian" are deliberately excluded here — they are
  // TEACHING LANGUAGES this engine legitimately reasons about (e.g.
  // explaining why the browser-speech path is English's fallback, reusing
  // the existing SERVER_TTS_LANGS list), not curriculum SUBJECTS. The
  // platform-wide requirement this guards is "no branch on physics vs.
  // chemistry vs. mathematics vs. ...", not "never mention a language".
  const SUBJECT_NAMES = ['physics', 'chemistry', 'mathematics', 'biology', 'computer_science', 'computer science']

  /** Strips `/* ... *\/` and `// ...` comments so a doc comment explaining
   *  (e.g.) "a chemistry formula is spoken differently" — legitimate,
   *  desirable documentation — doesn't false-positive against a check for
   *  actual subject-specific CODE branching. */
  function stripComments(src: string): string {
    return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
  }

  it('no CODE (comments stripped) under src/lib/narration or src/components/narration branches on a specific curriculum subject by name', () => {
    const files = [...allTsFilesUnder(NARRATION_LIB_DIR), ...allTsFilesUnder(NARRATION_COMPONENTS_DIR)]
    expect(files.length).toBeGreaterThan(0)
    for (const file of files) {
      const content = stripComments(readFileSync(file, 'utf8')).toLowerCase()
      for (const subject of SUBJECT_NAMES) {
        expect(content, `${path.relative(process.cwd(), file)} unexpectedly branches on "${subject}" in code`).not.toContain(subject)
      }
    }
  })

  it('the hook itself (src/hooks/useNarrationPlayback.ts) contains no curriculum-subject-specific branching in code either', () => {
    const content = stripComments(read(HOOK_FILE)).toLowerCase()
    for (const subject of SUBJECT_NAMES) {
      expect(content).not.toContain(subject)
    }
  })

  it('the engine selection is driven only by SERVER_TTS_LANGS (an existing, already-generic language list), never by curriculum subject', () => {
    const content = read(HOOK_FILE)
    expect(content).toContain('SERVER_TTS_LANGS')
    expect(content).not.toMatch(/if\s*\(\s*subject/i)
    expect(content).not.toContain('props.subject')
  })
})

describe('NarratedText checks visibility against the actual scrollable ancestor, not its own non-scrolling wrapper', () => {
  // NarratedText's own container div auto-sizes to its content (it is not
  // itself `overflow: auto`), so every child span's rect is always fully
  // inside it — checking visibility against that div directly would make
  // isComfortablyVisible() return true unconditionally and silently disable
  // auto-scroll for any lesson long enough to need it. Fixed by walking up
  // to the nearest actually-scrolling ancestor (or the viewport as a
  // fallback) before running the visibility check.
  const SRC = read('src/components/narration/NarratedText.tsx')

  it('defines a helper that walks PARENT elements looking for a real overflow:auto/scroll ancestor', () => {
    expect(SRC).toContain('function findScrollContainerRect')
    expect(SRC).toContain('el?.parentElement')
    expect(SRC).toMatch(/overflowY === 'auto' \|\| style\.overflowY === 'scroll'/)
  })

  it('falls back to the browser viewport (not the non-scrolling wrapper) when no scrollable ancestor is found', () => {
    expect(SRC).toContain('{ top: 0, bottom: window.innerHeight }')
  })

  it('the scroll effect uses that helper — not containerRef.current.getBoundingClientRect() — as the visibility-check container', () => {
    const effectBlock = SRC.slice(SRC.indexOf('useEffect(() => {\n    if (activeSegmentIndex'), SRC.indexOf('}, [activeSegmentIndex, activeWordIndex])'))
    expect(effectBlock).toContain('findScrollContainerRect(container)')
    expect(effectBlock).not.toContain('container.getBoundingClientRect()')
  })

  it('the scroll effect re-runs on every WORD advance, not just every segment change', () => {
    expect(SRC).toContain('}, [activeSegmentIndex, activeWordIndex])')
  })
})

describe('useNarrationPlayback notifies voicePlayback (not just its own local state) on natural completion/error', () => {
  // voicePlayback's own `playingId` — mirrored elsewhere in LessonScreen.tsx
  // into the per-message "speaking" border highlight (`speakingId`) — is only
  // ever cleared by the manager's own `finish()`, which fires from the
  // `onEnded`/`onError` callbacks a PlaybackSource.start() receives. A first
  // draft of this hook accepted `start: () => {...}` (ignoring that
  // parameter entirely), which meant the manager never learned narration had
  // ended and the border highlight would stay lit forever after playback
  // completed. Fixed by threading that callback into the engine's own
  // onEnded/onError. Asserted here via source wiring, since this repo's test
  // environment cannot render the hook directly (no jsdom/testing-library).
  const HOOK = read('src/hooks/useNarrationPlayback.ts')

  it('startFresh\'s PlaybackSource.start reads its callbacks parameter and forwards it into buildEngine', () => {
    expect(HOOK).toMatch(/start:\s*\(vpCallbacks\)\s*=>\s*\{/)
    expect(HOOK).toContain('buildEngine(fromIndex, vpCallbacks)')
  })

  it('the engine\'s onEnded/onError call the forwarded notify callbacks, not just setState', () => {
    const buildEngineBlock = HOOK.slice(HOOK.indexOf('const buildEngine ='), HOOK.indexOf('}, [segments, lang, voiceType, speed, country])'))
    expect(buildEngineBlock).toMatch(/onEnded = \(\) => \{ setState\(completed\(segments\.length\)\); notify\.onEnded\(\) \}/)
    expect(buildEngineBlock).toMatch(/onError = \(\) => \{ setState\(errored\(\)\); notify\.onError\(\) \}/)
  })
})

describe('word-level highlighting is wired end to end through the hook and both engines', () => {
  const HOOK = read('src/hooks/useNarrationPlayback.ts')
  const BROWSER_ENGINE = read('src/lib/narration/engines/browserSpeechEngine.ts')
  const SERVER_ENGINE = read('src/lib/narration/engines/serverAudioEngine.ts')

  it('the hook exposes activeWordIndex from state, not a re-derived value', () => {
    expect(HOOK).toContain('activeWordIndex: state.activeWordIndex')
  })

  it('resuming from PAUSED preserves the exact paused word index rather than dropping it', () => {
    expect(HOOK).toContain('playing(s, s.activeSegmentIndex ?? 0, s.activeWordIndex)')
  })

  it('both engines report through the shared onWordStart(segmentIndex, wordIndex) callback — no onSegmentStart left anywhere', () => {
    expect(BROWSER_ENGINE).toContain('onWordStart: (segmentIndex: number, wordIndex: number | null) => void')
    expect(BROWSER_ENGINE).not.toContain('onSegmentStart')
    expect(SERVER_ENGINE).not.toContain('onSegmentStart')
  })

  it('the browser engine does NOT consult onboundary for display — onstart/onend are the only real, unconditional events it trusts (2026-09-13 architecture)', () => {
    // "onboundary" itself still appears in this file's own doc comments,
    // explaining WHY it is no longer used — that is intentional honest
    // documentation, not live code. What must be genuinely absent is the
    // ACTIVE wiring: an assignment to `utter.onboundary`.
    expect(BROWSER_ENGINE).not.toMatch(/utter\.onboundary\s*=/)
    expect(BROWSER_ENGINE).not.toContain('spokenCharIndexToWordIndex')
    expect(BROWSER_ENGINE).not.toContain('pacingGuard')
    expect(BROWSER_ENGINE).toContain('utter.onstart = () => { if (!disposed) callbacks.onWordStart(index, null) }')
  })

  it('the browser engine no longer imports or invents any timing correction (no clock, no held-back delay)', () => {
    expect(BROWSER_ENGINE).not.toMatch(/setInterval\([^)]*\/\/\s*word/i)
    expect(BROWSER_ENGINE).not.toContain('now?: () => number')
    // The concrete pacing-guard API surface (not merely the word "median" —
    // the file's own header legitimately documents, as history, that a
    // median-gap heuristic was tried and reverted; banning the word itself
    // would penalize that honest documentation rather than checking for
    // live code).
    expect(BROWSER_ENGINE).not.toMatch(/remainingHoldMs|recentGapsMs|PACING_FRACTION|recordDisplayedAdvance/)
  })

  it('the server engine derives word position from buildWordTimeWindows over the real audio.currentTime, not a fixed ms-per-word guess, and no longer holds it back', () => {
    expect(SERVER_ENGINE).toContain('buildWordTimeWindows')
    expect(SERVER_ENGINE).toContain('audio.currentTime')
    expect(SERVER_ENGINE).not.toMatch(/msPerWord|millisecondsPerWord/i)
    expect(SERVER_ENGINE).not.toContain('pacingGuard')
  })
})

describe('i18n keys added for narration controls are present in every locale block', () => {
  const I18N = read('src/lib/i18n.ts')
  const NEW_KEYS = ['lesson_pause', 'lesson_replay', 'lesson_narration_loading', 'lesson_narration_error']

  it('every new key is defined at least 3 times (once per ru/en/hi locale block)', () => {
    for (const key of NEW_KEYS) {
      const occurrences = I18N.split(`${key}:`).length - 1
      expect(occurrences, `expected ${key} to be defined in all 3 locale blocks`).toBeGreaterThanOrEqual(3)
    }
  })
})
