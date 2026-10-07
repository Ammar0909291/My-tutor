/**
 * PHYSICS VISUAL RENDER AUDIT RUNNER (Phases 1–2).
 *
 * For every physics concept in the inventory, for each viewport × theme:
 *   1. open /dev/physics-audit?concept=… (the REAL resolver + the REAL renderer)
 *   2. wait until the figure has settled (labels placed, card playback done)
 *   3. MEASURE the DOM (every visible text node, controls, scene box)
 *   4. hide all text, screenshot → the pixels BEHIND each label → real contrast,
 *      ink-under-label, scene ink / edge-clipping
 *   5. screenshot the figure as the learner sees it (evidence)
 *   6. for a figure with sliders: drive them to min / default / max / combinations
 *      and measure every state the same way
 *
 * It writes raw measurements only. `validate.ts` turns them into verdicts, so a
 * changed threshold never needs a re-render.
 *
 *   npx tsx scripts/qa/physicsVisual/render.ts --out <dir> [--concepts a,b] [--viewports mobile,desktop]
 *        [--themes dark,light] [--workers 3] [--no-states] [--base http://localhost:3000]
 *
 * Requires a dev server (NODE_ENV!=production): see the header of
 * src/app/dev/physics-audit/page.tsx.
 */
import { chromium, type Browser, type Page } from 'playwright'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { buildInventory, type InventoryRow } from './inventory'

export type ViewportName = 'mobile' | 'desktop' | 'desktop-column'
export type ThemeName = 'dark' | 'light'

/**
 * The lesson surface at each width. `frameW` is the figure FRAME (a card with
 * 34px of its own padding/border), so canvas host = frameW − 34:
 *   mobile          390px phone      → host 282  (layout.ts VIEWPORTS, measured)
 *   desktop         1280px           → host 992  (layout.ts VIEWPORTS, measured)
 *   desktop-column  1280px, canvas   → host 566  (the figure is "roughly half the
 *                   mode 50/50 split    window on a desktop": ExplainerFigure.module.css)
 * Heights are realistic phone/laptop heights because the scene height budget is
 * a `vh` term (`--fig-scene-h: clamp(240px, 46vh, 460px)`).
 */
export const VIEWPORT_CONFIG: Record<ViewportName, { width: number; height: number; frameW: number }> = {
  mobile: { width: 390, height: 844, frameW: 316 },
  desktop: { width: 1280, height: 800, frameW: 1026 },
  'desktop-column': { width: 1280, height: 800, frameW: 600 },
}

export interface TextEntry {
  text: string; region: 'scene-label' | 'svg-text' | 'chrome'; tag: string; cls: string
  box: { x: number; y: number; w: number; h: number }
  lines: Array<{ x: number; y: number; w: number; h: number }>
  visibleLines: Array<{ x: number; y: number; w: number; h: number }>
  inControl: boolean; inDisabled: boolean
  fontPx: number; weight: string; family: string; color: string; opacity: number; shadow: string
  visibleFraction: number; outsideViewportX: boolean; truncated: boolean
}
export interface Measure {
  error?: string
  viewport: { w: number; h: number; dpr: number }
  theme: string | null
  docScrollW: number; docClientW: number; horizontalOverflow: boolean
  frameRect: { x: number; y: number; w: number; h: number }
  figureRect: { x: number; y: number; w: number; h: number }
  sceneRect: { x: number; y: number; w: number; h: number } | null
  canvasRect: { x: number; y: number; w: number; h: number } | null
  sceneBg: string | null
  renderer: string | null; provenance: string | null; noFigure: boolean
  svgCount: number; hasCanvas: boolean
  texts: TextEntry[]
  controls: Array<{ tag: string; type: string; name: string; box: { x: number; y: number; w: number; h: number }; disabled: boolean }>
  emptyBadges: number
  overflowing: Array<{ tag: string; cls: string; box: { x: number; y: number; w: number; h: number } }>
  sliders: number
}
export interface PixelText { bgMedian: number[]; fgEffective: number[]; contrast: number; contrastWorst: number; inkFraction: number; area: number }
export interface PixelResult {
  texts: Array<PixelText | null>
  scene: { w: number; h: number; inkFraction: number; edgeInkFraction: number; edgeInkPx: number; inkBox: { x: number; y: number; w: number; h: number } | null; meanInkContrast: number } | null
}
export interface StateRecord {
  /** 'default' or a description of the driven state, e.g. "force=min". */
  state: string
  params: Record<string, string>
  measure: Measure
  pixels: PixelResult
  missingGlyphs: string[]
  shot: string | null
}
export interface RenderRecord {
  conceptId: string
  viewport: ViewportName
  theme: ThemeName
  ok: boolean
  error?: string
  renderer: string | null
  provenance: string | null
  elapsedMs: number
  states: StateRecord[]
}

const args = process.argv.slice(2)
const arg = (name: string, dflt?: string): string | undefined => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : dflt
}
const flag = (name: string) => args.includes(`--${name}`)

/**
 * Software WebGL, and NO background throttling: with several contexts open
 * Chromium otherwise treats all but one as backgrounded and stops their
 * animation frames, so a figure never finishes placing its labels.
 */
export const CHROMIUM_ARGS = [
  '--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist',
  '--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows',
]

const TRACE = process.env.AUDIT_TRACE === '1'
export function lap(label: string, t0: number): number {
  const now = Date.now()
  if (TRACE) console.log(`   ${label.padEnd(18)} ${((now - t0) / 1000).toFixed(2)}s`)
  return now
}

export const INPAGE = readFileSync(resolve(__dirname, 'inpage.js'), 'utf8')
export const BASE = arg('base', 'http://localhost:3000')!

async function inject(page: Page): Promise<void> {
  await page.addInitScript(INPAGE)
}

/** A browser context for one viewport/theme, with the in-page auditor and the animation-clock cap installed. */
export async function openContext(browser: Browser, vp: ViewportName, theme: ThemeName) {
  const cfg = VIEWPORT_CONFIG[vp]
  const ctx = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height }, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
  await ctx.addInitScript((th: string) => { try { localStorage.setItem('mytutor_theme', th) } catch { /* ignore */ } }, theme)
  await ctx.addInitScript(INPAGE)
  // Software GL repainting at 60fps is what makes a render slow, not the work
  // being measured. Cap the animation clock at ~8fps: layout, label placement
  // and every painted pixel are identical, only the idle repaint rate changes.
  // Plain string, not a function: tsx/esbuild wraps named functions in a `__name`
  // helper that does not exist inside the page (same reason inpage.js is JS).
  await ctx.addInitScript({
    content: `
      (function () {
        var raf = window.requestAnimationFrame.bind(window);
        window.requestAnimationFrame = function (cb) { return window.setTimeout(function () { raf(cb); }, 120); };
        // Frame counter: drei <Html> re-places every label on the render loop, so a
        // measurement is only valid once REAL frames have run since the last change.
        window.__frames = 0;
        function tick() { window.__frames++; window.requestAnimationFrame(tick); }
        window.requestAnimationFrame(tick);
      })();
    `,
  })
  return ctx
}

export async function settle(page: Page, renderer: string, expectLabels = false): Promise<void> {
  // A scene's labels are placed by a solver that runs after the canvas has a
  // size; a card animates through its steps. Both are "settled" when the text
  // boxes stop moving for three consecutive looks.
  const deadline = Date.now() + 40_000
  let prev = ''
  let stable = 0
  if (renderer === 'card') await page.waitForTimeout(3000)
  while (Date.now() < deadline) {
    // Let real frames run between looks (see the counter in openContext).
    const f0 = await page.evaluate(() => (window as unknown as { __frames?: number }).__frames ?? 0)
    await page.waitForFunction((n) => ((window as unknown as { __frames?: number }).__frames ?? 0) >= n, f0 + 3, { timeout: 10_000 }).catch(() => undefined)
    const sig = await page.evaluate(() => {
      const m = (window as unknown as { __audit: { measure: () => Measure } }).__audit.measure()
      if (m.error) return 'err'
      return JSON.stringify([
        m.texts.map((t) => [t.text, Math.round(t.box.x), Math.round(t.box.y)]),
        m.canvasRect ? [Math.round(m.canvasRect.w), Math.round(m.canvasRect.h)] : null,
        m.hasCanvas, m.svgCount,
      ])
    })
    // A scene that declares text is not settled until its label layer has
    // painted at least one label: the solver runs after the canvas has a size.
    const labelsIn = expectLabels ? await page.evaluate(() => document.querySelectorAll('[data-scene-box] span').length) : 1
    if (sig !== 'err' && sig === prev && labelsIn > 0) stable++
    else stable = 0
    prev = sig
    // One equal pair of looks, each preceded by >= 3 real frames, is settled.
    if (stable >= 1) return
    await page.waitForTimeout(100)
  }
}

async function glyphCheck(page: Page, m: Measure): Promise<string[]> {
  const chars = new Set<string>()
  for (const t of m.texts) for (const ch of t.text) if (ch.codePointAt(0)! > 0x7e && !/\s/.test(ch)) chars.add(ch)
  if (chars.size === 0) return []
  const font = m.texts.find((t) => t.region === 'scene-label')?.family ?? m.texts[0]?.family ?? 'sans-serif'
  return page.evaluate(
    ({ list, fontCss }) => (window as unknown as { __audit: { missingGlyphs: (c: string[], f: string) => string[] } }).__audit.missingGlyphs(list, `700 16px ${fontCss}`),
    { list: [...chars], fontCss: font },
  )
}

/** Measure the current state: DOM, then the background pixels behind the text. */
export async function capture(page: Page, pixPage: Page, state: string, params: Record<string, string>, shotPath: string | null): Promise<StateRecord> {
  const measure: Measure = await page.evaluate(() => (window as unknown as { __audit: { measure: () => Measure } }).__audit.measure())
  const missing = await glyphCheck(page, measure)

  // Evidence: what the learner sees.
  let shot: string | null = null
  const f = measure.frameRect
  const clip = { x: 0, y: Math.max(0, f.y - 4), width: measure.viewport.w, height: f.h + 8 }
  if (shotPath) {
    await page.screenshot({ path: shotPath, fullPage: true, clip, animations: 'disabled' })
    shot = shotPath
  }

  // Background-only capture → pixels behind every text node.
  await page.evaluate(() => (window as unknown as { __audit: { hideText: (on: boolean) => void } }).__audit.hideText(true))
  await page.waitForTimeout(120)
  const bg = await page.screenshot({ fullPage: true, clip, animations: 'disabled' })
  await page.evaluate(() => (window as unknown as { __audit: { hideText: (on: boolean) => void } }).__audit.hideText(false))

  const surface = await page.evaluate((c) => (window as unknown as { __audit: { parseColor: (s: string) => number[] } }).__audit.parseColor(c ?? '#000'), measure.sceneBg)
  const pixels: PixelResult = await pixPage.evaluate(
    ({ png, spec }) => (window as unknown as { __audit: { pixels: (p: string, s: unknown) => Promise<PixelResult> } }).__audit.pixels(png, spec),
    {
      png: bg.toString('base64'),
      spec: {
        clip: { x: clip.x, y: clip.y, w: clip.width, h: clip.height },
        bg: surface.slice(0, 3),
        sceneRect: measure.sceneRect,
        texts: measure.texts.map((t) => {
          // Sample behind the PAINTED part only; a fully clipped text has no pixels to judge.
          const v = t.visibleLines
          if (!v.length) return { box: { x: 0, y: 0, w: 0, h: 0 }, color: t.color, opacity: t.opacity }
          const x0 = Math.min(...v.map((l) => l.x)), y0 = Math.min(...v.map((l) => l.y))
          const x1 = Math.max(...v.map((l) => l.x + l.w)), y1 = Math.max(...v.map((l) => l.y + l.h))
          return { box: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, color: t.color, opacity: t.opacity }
        }),
      },
    },
  )
  return { state, params, measure, pixels, missingGlyphs: missing, shot }
}

/** The figure's value sliders, with their ranges, read from the live DOM. */
export async function readSliders(page: Page): Promise<Array<{ index: number; label: string; min: number; max: number; step: number; value: number }>> {
  return page.evaluate(() => {
    const frame = document.querySelector('[data-audit-frame]')!
    return Array.from(frame.querySelectorAll('input[type="range"]')).map((el, index) => {
      const i = el as HTMLInputElement
      return {
        index,
        label: i.getAttribute('aria-label') || (i.labels?.[0]?.textContent ?? '') || `slider${index}`,
        min: Number(i.min), max: Number(i.max), step: Number(i.step) || 1, value: Number(i.value),
      }
    })
  })
}

export async function setSlider(page: Page, index: number, value: number): Promise<void> {
  await page.evaluate(({ index: i, value: v }) => {
    const frame = document.querySelector('[data-audit-frame]')!
    const el = frame.querySelectorAll('input[type="range"]')[i] as HTMLInputElement
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
    setter.call(el, String(v))
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('change', { bubbles: true }))
  }, { index, value })
}

/** Choice controls (radio / select / segmented chips) are driven by their own captions. */
async function renderOne(browser: Browser, row: InventoryRow, vp: ViewportName, theme: ThemeName, outDir: string, withStates: boolean): Promise<RenderRecord> {
  const t0 = Date.now()
  const cfg = VIEWPORT_CONFIG[vp]
  const ctx = await openContext(browser, vp, theme)
  const page = await ctx.newPage()
  const pixPage = await ctx.newPage()
  await pixPage.goto('about:blank')
  const rec: RenderRecord = { conceptId: row.conceptId, viewport: vp, theme, ok: false, renderer: null, provenance: null, elapsedMs: 0, states: [] }
  const tag = `${row.conceptId}__${vp}__${theme}`
  try {
    let tl = Date.now()
    await page.goto(`${BASE}/dev/physics-audit?concept=${encodeURIComponent(row.conceptId)}&fw=${cfg.frameW}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
    tl = lap('goto', tl)
    await page.waitForSelector('[data-audit-frame]', { timeout: 60_000 })
    tl = lap('frame', tl)
    const renderer = await page.getAttribute('[data-audit-renderer]', 'data-audit-renderer')
    rec.renderer = renderer
    if (renderer === 'scene') await page.waitForSelector('[data-scene-box] canvas', { timeout: 60_000 })
    tl = lap('canvas', tl)
    await settle(page, renderer ?? 'none', renderer === 'scene' && row.textObjects > 0)
    tl = lap('settle', tl)
    // Make sure webfonts are in before measuring text.
    await page.evaluate(() => document.fonts?.ready)
    await page.waitForTimeout(300)

    const shotsDir = resolve(outDir, 'shots')
    mkdirSync(shotsDir, { recursive: true })
    const first = await capture(page, pixPage, 'default', {}, resolve(shotsDir, `${tag}.png`))
    tl = lap('capture', tl)
    rec.provenance = first.measure.provenance
    rec.states.push(first)

    if (withStates && first.measure.sliders > 0) {
      const sliders = await readSliders(page)
      const plan: Array<{ name: string; set: Array<[number, number]> }> = []
      for (const s of sliders) {
        plan.push({ name: `${s.label}=min`, set: [[s.index, s.min]] })
        plan.push({ name: `${s.label}=max`, set: [[s.index, s.max]] })
      }
      plan.push({ name: 'all=min', set: sliders.map((s) => [s.index, s.min] as [number, number]) })
      plan.push({ name: 'all=max', set: sliders.map((s) => [s.index, s.max] as [number, number]) })
      plan.push({ name: 'min/max alternating', set: sliders.map((s, i) => [s.index, i % 2 ? s.max : s.min] as [number, number]) })
      plan.push({ name: 'max/min alternating', set: sliders.map((s, i) => [s.index, i % 2 ? s.min : s.max] as [number, number]) })
      let n = 0
      for (const step of plan) {
        // Restore defaults between states so every state is a clean combination.
        for (const s of sliders) await setSlider(page, s.index, s.value)
        for (const [i, v] of step.set) await setSlider(page, i, v)
        await settle(page, 'scene', row.textObjects > 0)
        const params: Record<string, string> = {}
        const now = await readSliders(page)
        for (const s of now) params[s.label] = String(s.value)
        rec.states.push(await capture(page, pixPage, step.name, params, resolve(shotsDir, `${tag}__s${n++}.png`)))
      }
    }
    rec.ok = true
  } catch (e) {
    rec.error = (e as Error).message.slice(0, 400)
  } finally {
    rec.elapsedMs = Date.now() - t0
    await ctx.close().catch(() => {})
  }
  return rec
}

async function main(): Promise<void> {
  const outDir = resolve(arg('out', 'tmp/physics-visual-audit')!)
  mkdirSync(resolve(outDir, 'results'), { recursive: true })
  const vps = (arg('viewports', 'mobile,desktop,desktop-column')!.split(',') as ViewportName[])
  const themes = (arg('themes', 'dark,light')!.split(',') as ThemeName[])
  const only = arg('concepts')?.split(',')
  const shard = arg('shard') // "i/n"
  const workers = Number(arg('workers', '3'))
  // Slider/state sweeps change geometry, not colour, so they run in one theme.
  const stateThemes = arg('state-themes', 'dark')!.split(',')
  const skipDone = !flag('redo')
  let rows = buildInventory().filter((r) => r.graphical)
  if (only) rows = rows.filter((r) => only.includes(r.conceptId))
  if (shard) {
    const [i, n] = shard.split('/').map(Number)
    rows = rows.filter((_, idx) => idx % n === i)
  }
  const tasks: Array<{ row: InventoryRow; vp: ViewportName; theme: ThemeName; file: string }> = []
  // Geometry, label placement and overlap do not depend on the theme; only colour
  // does. The light theme is therefore rendered where contrast is hardest (the
  // phone), not at every width.
  const lightVps = (arg('light-viewports', 'mobile')!).split(',')
  for (const row of rows) for (const vp of vps) for (const theme of themes) {
    if (theme === 'light' && !lightVps.includes(vp)) continue
    const file = resolve(outDir, 'results', `${row.conceptId}__${vp}__${theme}.json`)
    if (skipDone && existsSync(file)) continue
    tasks.push({ row, vp, theme, file })
  }
  // Hardest first (phone, dark), so an early read of the results is the worst case.
  const prio = (t: { vp: ViewportName; theme: ThemeName }) => (t.theme === 'dark' ? 0 : 10) + ['mobile', 'desktop', 'desktop-column'].indexOf(t.vp)
  tasks.sort((a, b) => prio(a) - prio(b))
  console.log(`tasks: ${tasks.length} (concepts ${rows.length}, viewports ${vps.join('/')}, themes ${themes.join('/')}), workers ${workers}`)

  const browser = await chromium.launch({
    executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
    args: CHROMIUM_ARGS,
  })
  let next = 0
  let done = 0
  let failed = 0
  const t0 = Date.now()
  async function worker(): Promise<void> {
    while (true) {
      const i = next++
      if (i >= tasks.length) return
      const t = tasks[i]
      const rec = await renderOne(browser, t.row, t.vp, t.theme, outDir, !flag('no-states') && stateThemes.includes(t.theme))
      writeFileSync(t.file, JSON.stringify(rec))
      done++
      if (!rec.ok) failed++
      if (done % 10 === 0 || !rec.ok) {
        const el = (Date.now() - t0) / 1000
        console.log(`[${done}/${tasks.length}] ${rec.conceptId} ${rec.viewport}/${rec.theme} ${rec.ok ? 'ok' : 'ERR ' + rec.error} (${(rec.elapsedMs / 1000).toFixed(1)}s, ${(el / done).toFixed(1)}s avg)`)
      }
    }
  }
  await Promise.all(Array.from({ length: workers }, worker))
  await browser.close()
  console.log(`done ${done}, render errors ${failed}, ${((Date.now() - t0) / 1000).toFixed(0)}s`)
}

if (process.argv[1] && process.argv[1].endsWith('render.ts')) {
  main().catch((e) => { console.error(e); process.exit(1) })
}
