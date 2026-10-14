/**
 * CLICKING TTS MUST NOT CHANGE HOW A LESSON MESSAGE IS DRAWN — in a real browser.
 *
 * THE DEFECT (reported with screenshots, 2026-10-14). Before Play the card showed formatted prose and mathematics; after
 * Play the same card showed `**predicate**`, `\forall`, `\exists`, `\[...\]` and `\(...\)` as raw characters.
 * ROOT CAUSE: LessonScreen rendered
 *     narration.status === 'IDLE' ? <MessageContent text={displayText}/> : <NarratedText segments={narration.segments} …/>
 * i.e. a SECOND renderer for every non-IDLE state. NarratedText draws `segment.renderedWords` — plain word tokens cut
 * from the RAW message source by the speech segmenter — so the Markdown/KaTeX renderer was bypassed for the whole of
 * LOADING / PLAYING / PAUSED / COMPLETED / ERROR.
 *
 * This suite mounts the REAL components the lesson screen mounts — useNarrationPlayback (through TutorNarratedMessage),
 * the real browser-speech engine, NarratedPlaybackControls, TutorMessageText/MessageContent and the real
 * narratedMessageText display/narration split — in real Chromium with a controllable speechSynthesis, clicks the real
 * Play button, and reads the formatted result. LessonScreen itself needs a signed-in session and a model, so its wiring
 * to these components is pinned in `ttsDisplaySourceSeparation.test.ts`.
 *
 * A NEGATIVE CONTROL mounts the pre-fix composition (the status fork above) and asserts the defect IS visible in it —
 * proof that this harness can see the bug, not just that the fixed composition passes.
 *
 * Chromium is located via PW_CHROMIUM_PATH, /opt/pw-browsers/chromium, or Playwright's own install; without one the
 * suite is SKIPPED with a warning unless REQUIRE_BROWSER_TESTS=1 makes a missing browser a failure.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { build } from 'esbuild'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { chromium, type Browser, type Page } from 'playwright'
import { findChromium, REQUIRE_BROWSER } from './helpers/chromiumPath'

const CHROMIUM = findChromium()
const REQUIRED = REQUIRE_BROWSER
if (!CHROMIUM) console.warn(`[ttsMarkdownLatexBrowser] no Chromium found — ${REQUIRED ? 'FAILING' : 'skipping'} the browser suite`)
const suite = CHROMIUM || REQUIRED ? describe : describe.skip

const ROOT = process.cwd()
const KATEX_CSS = readFileSync(join(ROOT, 'node_modules/katex/dist/katex.min.css'), 'utf8')
const TOKENS = readFileSync(join(ROOT, 'src/styles/tokens.css'), 'utf8')

/** The lesson text from the report: Markdown emphasis, inline and display mathematics, a list, several sentences. */
const FULL = [
  'A **predicate** is a statement about \\(x\\) that becomes true or false once you pick a value, like \\(T(x,y)\\) meaning "x teaches y".',
  '',
  'The order of the quantifiers matters:',
  '',
  '\\[\\forall x \\exists y\\, T(y,x)\\]',
  '',
  'reads "everyone is taught by someone", while',
  '',
  '\\[\\exists y \\forall x\\, T(y,x)\\]',
  '',
  'reads "one person teaches everyone".',
  '',
  '- *Italic* items and **bold** items keep their formatting.',
  '1. First step uses \\(x_1 + x_2\\).',
  '',
  'Does the order change the meaning of the sentence? Think about it.',
].join('\n')
/** The collapsed Read-More preview: the first paragraph only (what LessonScreen's truncate() would give). */
const PREVIEW = FULL.split('\n')[0]

// The harness page script: mounts the real components and exposes a tiny control surface to the test.
const ENTRY = `
import { createElement as h, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { TutorNarratedMessage } from '@/components/narration/TutorNarratedMessage'
import { NarratedPlaybackControls } from '@/components/narration/NarratedPlaybackControls'
import { NarratedText } from '@/components/narration/NarratedText'
import { MessageContent, TutorMessageText } from '@/components/learn/MessageContent'
import { displayText as deriveDisplayText, narrationText as deriveNarrationText } from '@/lib/learn/narratedMessageText'

function Msg({ mode, full, preview }) {
  const [expanded, setExpanded] = useState(false)
  const cached = { full, preview, hasMore: preview !== full }
  const display = deriveDisplayText(cached, expanded, null)
  const narrationSource = deriveNarrationText(cached, null)
  return h(TutorNarratedMessage, { id: 'm1', text: narrationSource, lang: 'en', voiceType: 'warm', speed: 1 },
    (n) => h('div', { id: 'msg', 'data-status': n.status },
      mode === 'fixed'
        ? h(TutorMessageText, { displayText: display })
        // NEGATIVE CONTROL — the composition LessonScreen had before the fix.
        : h('div', { className: 'animate-message' },
            n.status === 'IDLE'
              ? h(MessageContent, { text: display, isUser: false })
              : h(NarratedText, { segments: n.segments, activeSegmentIndex: n.activeSegmentIndex, activeWordIndex: n.activeWordIndex })),
      cached.hasMore && h('button', { id: 'more', onClick: () => setExpanded((e) => !e) }, expanded ? 'Collapse' : 'Read more'),
      h(NarratedPlaybackControls, { status: n.status, progressPercent: n.progressPercent, onToggle: n.toggle, onReplay: n.replay,
        playLabel: 'Play', pauseLabel: 'Pause', replayLabel: 'Replay', loadingLabel: 'Loading', errorLabel: 'Error' })))
}

window.mountMessage = (opts) => {
  const host = document.getElementById('root')
  window.__root?.unmount()
  window.__root = createRoot(host)
  window.__root.render(h(Msg, opts))
}
`

/** A controllable speechSynthesis: nothing happens until the test says so, so every status can be held and inspected. */
const SPEECH_STUB = `
(() => {
  const utterances = []
  class Utter { constructor(text) { this.text = text } }
  const synth = {
    speaking: false, paused: false,
    speak(u) { utterances.push(u); synth.speaking = true },
    cancel() { synth.speaking = false },
    pause() { synth.paused = true }, resume() { synth.paused = false },
    getVoices() { return [] },
    addEventListener() {}, removeEventListener() {},
  }
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true })
  window.SpeechSynthesisUtterance = Utter
  window.__speech = {
    count: () => utterances.length,
    texts: () => utterances.map((u) => u.text),
    start: () => utterances[utterances.length - 1].onstart?.(),
    end: () => utterances[utterances.length - 1].onend?.(),
    fail: () => utterances[utterances.length - 1].onerror?.(),
  }
})()
`

type Snapshot = {
  status: string
  katex: number
  katexDisplay: number
  strong: number
  em: number
  listMarkers: number
  /** Text of every node OUTSIDE rendered KaTeX output — where raw syntax would show up. */
  plainText: string
  /** True while the very element tagged before narration began is still the one in the document. */
  sameParagraph: boolean
  moreLabel: string | null
}

const RAW = [/\*\*/, /\\forall/, /\\exists/, /\\\[/, /\\\]/, /\\\(/, /\\\)/, /\\,/, /x_1/]

suite('Tutor message drawn through the real narration components — real Chromium', { timeout: 180_000 }, () => {
  let browser: Browser
  let bundleJs = ''
  let bundleCss = ''

  beforeAll(async () => {
    const out = await build({
      stdin: { contents: ENTRY, resolveDir: ROOT, sourcefile: 'ttsHarness.tsx', loader: 'tsx' },
      bundle: true, write: false, outdir: 'out', format: 'iife', platform: 'browser', jsx: 'automatic',
      alias: { '@': resolve(ROOT, 'src') }, logLevel: 'silent',
      define: { 'process.env.NODE_ENV': '"production"' },
      loader: { '.css': 'css', '.module.css': 'local-css', '.svg': 'dataurl', '.png': 'dataurl' },
    })
    bundleJs = out.outputFiles.find((f) => f.path.endsWith('.js'))!.text
    bundleCss = out.outputFiles.filter((f) => f.path.endsWith('.css')).map((f) => f.text).join('\n')
    browser = await chromium.launch({ executablePath: CHROMIUM ?? undefined, args: ['--no-sandbox'] })
  }, 180_000)
  afterAll(async () => { await browser?.close() })

  async function open(mode: 'fixed' | 'legacy', opts: { full?: string; preview?: string; width?: number; theme?: 'dark' | 'light' } = {}): Promise<Page> {
    const page = await (await browser.newContext({ viewport: { width: opts.width ?? 1000, height: 900 } })).newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    ;(page as unknown as { __errors: string[] }).__errors = errors
    await page.setContent(`<!doctype html><html data-theme="${opts.theme ?? 'dark'}"><head><meta charset="utf-8"><style>${TOKENS}\n${KATEX_CSS}\n${bundleCss}
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; padding: 16px; background: var(--bg-void); color: var(--text-primary); font: 15px/1.5 system-ui, sans-serif; }
    </style></head><body><div id="root"></div></body></html>`)
    await page.addScriptTag({ content: SPEECH_STUB })
    await page.addScriptTag({ content: bundleJs })
    await page.evaluate((o) => (window as unknown as { mountMessage: (x: unknown) => void }).mountMessage(o), { mode, full: opts.full ?? FULL, preview: opts.preview ?? FULL })
    await page.waitForSelector('#msg')
    return page
  }

  /** Tags the first paragraph so a later snapshot can tell a re-render from a remount. */
  const tag = (page: Page) => page.evaluate(() => { const p = document.querySelector('#msg p'); if (p) (p as unknown as { __tag: boolean }).__tag = true })

  const snap = (page: Page): Promise<Snapshot> => page.evaluate(() => {
    const msg = document.getElementById('msg')!
    const walker = document.createTreeWalker(msg, NodeFilter.SHOW_TEXT)
    let plain = ''
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = (n as Text).parentElement
      if (!el || el.closest('.katex')) continue
      if (el.closest('button')) continue
      plain += (n as Text).data
    }
    const p = document.querySelector('#msg p') as (HTMLElement & { __tag?: boolean }) | null
    return {
      status: msg.getAttribute('data-status')!,
      katex: msg.querySelectorAll('.katex').length,
      katexDisplay: msg.querySelectorAll('.katex-display').length,
      strong: msg.querySelectorAll('strong').length,
      em: msg.querySelectorAll('em').length,
      listMarkers: msg.querySelectorAll('.tabular-nums, span[style*="coral"]').length,
      plainText: plain,
      sameParagraph: !!p?.__tag,
      moreLabel: document.getElementById('more')?.textContent ?? null,
    }
  })

  /** Optional evidence: set TTS_SHOT_DIR to keep a PNG of the message at each named step. */
  const shot = async (page: Page, name: string) => {
    const dir = process.env.TTS_SHOT_DIR
    if (dir) await page.locator('#msg').screenshot({ path: join(dir, `${name}.png`) })
  }
  const status = (page: Page) => page.evaluate(() => document.getElementById('msg')!.getAttribute('data-status'))
  const waitStatus = (page: Page, s: string) => page.waitForFunction((x) => document.getElementById('msg')?.getAttribute('data-status') === x, s, { timeout: 8000 })
  const clickPlay = (page: Page) => page.getByRole('button', { name: 'Play' }).click()

  /** The formatted-content invariants that must hold in EVERY narration status. */
  function expectFormatted(s: Snapshot, label: string) {
    for (const re of RAW) expect(s.plainText, `${label}: raw syntax ${re} leaked into the visible text`).not.toMatch(re)
    expect(s.katexDisplay, `${label}: the two display equations`).toBeGreaterThanOrEqual(2)
    expect(s.katex, `${label}: inline + display equations rendered by KaTeX`).toBeGreaterThanOrEqual(5)
    expect(s.strong, `${label}: bold`).toBeGreaterThanOrEqual(1)
    expect(s.em, `${label}: italic`).toBeGreaterThanOrEqual(1)
    expect(s.plainText, `${label}: the prose itself`).toContain('predicate')
  }

  describe('NEGATIVE CONTROL — the pre-fix composition (status fork) really shows the defect', () => {
    it('is formatted while IDLE, then shows raw Markdown/LaTeX as soon as Play is pressed', async () => {
      const page = await open('legacy')
      const idle = await snap(page)
      expect(idle.status).toBe('IDLE')
      expectFormatted(idle, 'legacy/IDLE')
      await shot(page, 'before-fix-1-idle')
      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      await shot(page, 'before-fix-2-after-play')
      const loading = await snap(page)
      expect(loading.katex).toBe(0)
      expect(loading.strong).toBe(0)
      expect(loading.plainText).toMatch(/\*\*predicate\*\*/)
      expect(loading.plainText).toMatch(/\\forall/)
      expect(loading.plainText).toMatch(/\\\(/)
      await page.context().close()
    })
  })

  describe('the fixed composition (TutorMessageText) — Play never changes how the message is drawn', () => {
    it('1. before any TTS activation: Markdown and LaTeX render as formatted output', async () => {
      const page = await open('fixed')
      const s = await snap(page)
      expect(s.status).toBe('IDLE')
      expectFormatted(s, 'IDLE')
      await page.context().close()
    })

    it('2/3. LOADING, PLAYING and PAUSED keep the same formatted DOM — same elements, nothing remounted', async () => {
      const page = await open('fixed')
      await tag(page)
      const before = await snap(page)
      await shot(page, 'after-fix-1-idle')

      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      const loading = await snap(page)
      expectFormatted(loading, 'LOADING')
      expect(loading.sameParagraph, 'LOADING: the paragraph element was replaced').toBe(true)

      await page.evaluate(() => (window as unknown as { __speech: { start: () => void } }).__speech.start())
      await waitStatus(page, 'PLAYING')
      const playing = await snap(page)
      await shot(page, 'after-fix-2-playing')
      expectFormatted(playing, 'PLAYING')
      expect(playing.sameParagraph, 'PLAYING: the paragraph element was replaced').toBe(true)
      expect(playing.plainText).toBe(before.plainText)
      expect(playing.katex).toBe(before.katex)

      await page.getByRole('button', { name: 'Pause' }).click()
      await waitStatus(page, 'PAUSED')
      const paused = await snap(page)
      expectFormatted(paused, 'PAUSED')
      expect(paused.sameParagraph, 'PAUSED: the paragraph element was replaced').toBe(true)
      expect(paused.plainText).toBe(before.plainText)

      // Resume: still formatted, still the same elements.
      await clickPlay(page)
      await waitStatus(page, 'PLAYING')
      const resumed = await snap(page)
      expectFormatted(resumed, 'PLAYING (resumed)')
      expect(resumed.sameParagraph).toBe(true)
      await page.context().close()
    })

    it('4a. COMPLETION leaves the message exactly as it was', async () => {
      const page = await open('fixed', { full: 'A **short** note with \\(x^2\\). Done.', preview: 'A **short** note with \\(x^2\\). Done.' })
      await tag(page)
      const before = await snap(page)
      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      // Drive every segment to its natural end; the next segment is scheduled after a short breathing pause.
      for (let i = 0; i < 6; i++) {
        if ((await status(page)) === 'COMPLETED') break
        await page.evaluate(() => { const s = (window as unknown as { __speech: { start: () => void; end: () => void } }).__speech; s.start(); s.end() })
        await page.waitForTimeout(700)
      }
      await waitStatus(page, 'COMPLETED')
      const done = await snap(page)
      expect(done.plainText).toBe(before.plainText)
      expect(done.katex).toBe(before.katex)
      expect(done.strong).toBe(before.strong)
      expect(done.sameParagraph).toBe(true)
      expect(done.plainText).not.toMatch(/\*\*/)
      await page.context().close()
    })

    it('4b. a speech FAILURE leaves the message exactly as it was', async () => {
      const page = await open('fixed')
      await tag(page)
      const before = await snap(page)
      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      await page.evaluate(() => (window as unknown as { __speech: { fail: () => void } }).__speech.fail())
      await waitStatus(page, 'ERROR')
      const failed = await snap(page)
      expectFormatted(failed, 'ERROR')
      expect(failed.plainText).toBe(before.plainText)
      expect(failed.sameParagraph).toBe(true)
      await page.context().close()
    })

    it('5. Read more / Collapse preserve formatting before, during and after narration, and TTS never resets the expansion', async () => {
      const page = await open('fixed', { preview: PREVIEW })
      // collapsed: only the first paragraph, formatted
      let s = await snap(page)
      expect(s.moreLabel).toBe('Read more')
      expect(s.katexDisplay).toBe(0)
      expect(s.strong).toBe(1)
      expect(s.plainText).not.toMatch(/\*\*|\\\(/)

      await page.locator('#more').click()
      s = await snap(page)
      expect(s.moreLabel).toBe('Collapse')
      expectFormatted(s, 'expanded/IDLE')

      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      await page.evaluate(() => (window as unknown as { __speech: { start: () => void } }).__speech.start())
      await waitStatus(page, 'PLAYING')
      s = await snap(page)
      expect(s.moreLabel, 'TTS must not collapse or expand the message').toBe('Collapse')
      expectFormatted(s, 'expanded/PLAYING')

      // collapse WHILE playing: the preview stays formatted and playback is untouched
      await page.locator('#more').click()
      s = await snap(page)
      expect(s.status).toBe('PLAYING')
      expect(s.moreLabel).toBe('Read more')
      expect(s.katexDisplay).toBe(0)
      expect(s.plainText).not.toMatch(/\*\*|\\\(|\\forall/)
      expect(s.strong).toBe(1)
      await page.locator('#more').click()
      s = await snap(page)
      expectFormatted(s, 're-expanded/PLAYING')
      await page.context().close()
    })

    it('6/7. speech preparation normalises a COPY: the speech text has no Markdown/LaTeX, the displayed source is untouched', async () => {
      const page = await open('fixed')
      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      const spoken = await page.evaluate(() => (window as unknown as { __speech: { texts: () => string[] } }).__speech.texts())
      expect(spoken.length).toBeGreaterThan(0)
      const joined = spoken.join(' ')
      expect(joined).not.toMatch(/\*\*|\\\[|\\\(|\\forall|\\exists/)   // speech-friendly …
      const s = await snap(page)
      expectFormatted(s, 'after speech preparation')                    // … while the display kept its source
      await page.context().close()
    })

    it('does not start a second playback or regenerate speech when the message re-renders', async () => {
      const page = await open('fixed', { preview: PREVIEW })
      await clickPlay(page)
      await waitStatus(page, 'LOADING')
      const count = await page.evaluate(() => (window as unknown as { __speech: { count: () => number } }).__speech.count())
      expect(count).toBe(1)
      await page.locator('#more').click()          // a re-render of the message
      await page.locator('#more').click()
      expect(await page.evaluate(() => (window as unknown as { __speech: { count: () => number } }).__speech.count())).toBe(1)
      expect(await status(page)).toBe('LOADING')
      await page.context().close()
    })

    for (const [label, width, theme] of [['phone 390 dark', 390, 'dark'], ['phone 390 light', 390, 'light'], ['desktop 1280 light', 1280, 'light']] as const) {
      it(`${label}: formatted through the whole lifecycle, no horizontal overflow`, async () => {
        const page = await open('fixed', { width, theme })
        for (const step of ['IDLE', 'LOADING', 'PLAYING'] as const) {
          if (step === 'LOADING') { await clickPlay(page); await waitStatus(page, 'LOADING') }
          if (step === 'PLAYING') { await page.evaluate(() => (window as unknown as { __speech: { start: () => void } }).__speech.start()); await waitStatus(page, 'PLAYING') }
          expectFormatted(await snap(page), `${label}/${step}`)
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
        }
        await page.context().close()
      })
    }
  })
})
