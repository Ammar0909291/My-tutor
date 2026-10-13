/**
 * THE SHARED 2D LEGIBILITY PASS, IN A REAL BROWSER.
 *
 * The defect (production, 2026-10-12): `useFigureLegibility` lifts figure text to 4.5:1 by finding each label's
 * backdrop with `document.elementsFromPoint`, which only hits what is inside the viewport. A card mounted
 * outside the viewport — every older figure of a restored lesson, because history is lesson-scoped — got NO
 * lift (authored 3.6-4.0:1 dark, 3.1-3.4:1 light), and nothing re-ran the pass when it was scrolled into view.
 *
 * Neither jsdom nor a pure unit test has a viewport, hit testing or an IntersectionObserver, so this drives the
 * REAL module (`attachFigureLegibility`, bundled with esbuild, the same code the React hook calls) in real
 * Chromium on cards that carry the figure palette (#22A06B / #3B82F6 / #FF6B5E / #8B5CF6) on the card surface.
 *
 * Chromium is located via PW_CHROMIUM_PATH, /opt/pw-browsers/chromium, or Playwright's own install. Without one
 * the suite is SKIPPED (with a warning) so a machine with no browser does not fail unrelated work — set
 * REQUIRE_BROWSER_TESTS=1 to make a missing browser a failure instead (this repo's QA runs do).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { build } from 'esbuild'
import { resolve } from 'node:path'
import { chromium, type Browser, type Page } from 'playwright'
import { contrastRatio } from '@/lib/teaching/visual/figureAudit'
import { findChromium, REQUIRE_BROWSER } from './helpers/chromiumPath'

const CHROMIUM = findChromium()
const REQUIRED = REQUIRE_BROWSER
if (!CHROMIUM) console.warn(`[figureLegibilityBrowser] no Chromium found — ${REQUIRED ? 'FAILING' : 'skipping'} the browser suite`)
const suite = CHROMIUM || REQUIRED ? describe : describe.skip

const BUNDLE_ENTRY = resolve(__dirname, '../components/school/visuals/useFigureLegibility.ts')

const PAGE = `<!doctype html><html data-theme="dark"><head><meta name="viewport" content="width=390">
<style>
  html[data-theme=dark]  { --bg-surface:#243329; --bg-elevated:#2e4034; --text:#f1ede2; }
  html[data-theme=light] { --bg-surface:#fbf8f0; --bg-elevated:#ffffff; --text:#1d2a22; }
  body { margin:0; background:#101812; color:var(--text); font:14px system-ui, sans-serif; }
  html[data-theme=light] body { background:#efe9d8; }
  .card { margin:0 12px 24px; padding:10px 12px; border-radius:12px; background:var(--bg-surface); border:1px solid rgba(128,128,128,.3); }
  .card svg { width:100%; display:block; }
  #header { position:fixed; top:0; left:0; right:0; height:48px; background:#ff00aa; z-index:50; display:none; }
</style></head><body><div id="header"></div><div id="spacer-top" style="height:0"></div><div id="cards"></div></body></html>`

/** ForceDiagram's palette and geometry (labels over the card surface; "Object" over an elevated rect). */
const SVG = (hue = { applied: '#22A06B', friction: '#3B82F6', weight: '#FF6B5E', normal: '#8B5CF6' }) => `
<svg viewBox="0 0 300 170" aria-hidden="true">
  <rect x="120" y="60" width="60" height="40" rx="4" fill="var(--bg-elevated)" stroke="#FF6B5E" stroke-width="2"/>
  <text x="150" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">Object</text>
  <text data-k="applied"  x="203" y="68" text-anchor="middle" font-size="10" font-weight="600" fill="${hue.applied}">Applied</text>
  <text data-k="friction" x="97"  y="68" text-anchor="middle" font-size="10" font-weight="600" fill="${hue.friction}">Friction</text>
  <text data-k="weight"   x="194" y="148" text-anchor="middle" font-size="10" font-weight="600" fill="${hue.weight}">Weight (W=mg)</text>
  <text data-k="normal"   x="172" y="42" text-anchor="middle" font-size="10" font-weight="600" fill="${hue.normal}">Normal (N)</text>
</svg>`

type LabelState = { k: string; fill: string; inline: string; bg: string }
type CardState = { unmeasured: string | null; attached: boolean; labels: LabelState[] }

suite('useFigureLegibility in real Chromium', { timeout: 120_000 }, () => {
  let browser: Browser
  let bundle = ''

  beforeAll(async () => {
    const out = await build({
      entryPoints: [BUNDLE_ENTRY], bundle: true, write: false, format: 'iife', globalName: 'FL', platform: 'browser',
      alias: { '@': resolve(__dirname, '..') }, define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'silent',
    })
    bundle = out.outputFiles[0].text
    browser = await chromium.launch({ executablePath: CHROMIUM ?? undefined, args: ['--no-sandbox', '--disable-renderer-backgrounding', '--disable-background-timer-throttling'] })
  }, 120_000)
  afterAll(async () => { await browser?.close() })

  /**
   * `scrolled: 'bottom'` mounts the lesson the way a RESTORED session does: every card exists and the page is already
   * at the newest one when the passes first run, so the older cards are mounted off screen.
   */
  async function open(opts: { cards: number; theme?: 'dark' | 'light'; noIO?: boolean; width?: number; height?: number; scrolled?: 'bottom' } = { cards: 1 }): Promise<Page> {
    const page = await (await browser.newContext({ viewport: { width: opts.width ?? 390, height: opts.height ?? 800 } })).newPage()
    await page.setContent(PAGE)
    if (opts.theme) await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), opts.theme)
    if (opts.noIO) await page.evaluate(() => { delete (window as unknown as Record<string, unknown>).IntersectionObserver })
    await page.addScriptTag({ content: bundle })
    await page.evaluate(({ n, svg }) => {
      const host = document.getElementById('cards')!
      for (let i = 0; i < n; i++) {
        const card = document.createElement('div')
        card.className = 'card'; card.id = `card${i}`
        card.innerHTML = `<div style="font-weight:700;margin-bottom:6px">Card ${i}</div>` + svg
        host.appendChild(card)
      }
    }, { n: opts.cards, svg: SVG() })
    if (opts.scrolled === 'bottom') await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.evaluate(() => {
      const w = window as unknown as { FL: { attachFigureLegibility: (n: HTMLElement) => () => void }; cleanups: Record<string, () => void> }
      w.cleanups = {}
      document.querySelectorAll<HTMLElement>('#cards .card').forEach((card) => { w.cleanups[card.id] = w.FL.attachFigureLegibility(card) })
    })
    return page
  }

  const state = (page: Page, id: string): Promise<CardState> => page.evaluate((cardId) => {
    const card = document.getElementById(cardId)!
    const bgOf = (e: Element) => { for (let a: Element | null = e; a; a = a.parentElement) { const c = getComputedStyle(a).backgroundColor; const m = /rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/.exec(c); if (m && (m[4] === undefined || +m[4] > 0.9)) return `rgb(${m[1]}, ${m[2]}, ${m[3]})` } return 'rgb(0, 0, 0)' }
    return {
      unmeasured: card.getAttribute('data-contrast-unmeasured'),
      attached: card.hasAttribute('data-figure-legibility'),
      labels: Array.from(card.querySelectorAll<SVGTextElement>('text[data-k]')).map((t) => ({ k: t.dataset.k!, fill: getComputedStyle(t).fill, inline: t.style.fill, bg: bgOf(card) })),
    }
  }, id)

  const rgb = (s: string): [number, number, number] => { const m = /rgba?\((\d+), (\d+), (\d+)/.exec(s)!; return [+m[1], +m[2], +m[3]] }
  const contrast = (l: LabelState) => contrastRatio(rgb(l.fill), rgb(l.bg))
  const settle = (page: Page, ms = 1700) => page.waitForTimeout(ms) // the pass's own bounded settle is 1.2 s
  const scrollToCard = (page: Page, id: string) => page.evaluate((cid) => { document.getElementById(cid)!.scrollIntoView({ block: 'center' }) }, id)
  const AUTHORED_FAIL = ['applied', 'friction', 'normal']   // the authored hues that miss 4.5:1 on the dark card

  it('SANITY: the authored hues really are below 4.5:1 on the dark card (so a lift is observable)', async () => {
    const page = await open({ cards: 1 })
    // Detach before the pass can lift anything, then read the raw colours.
    await page.evaluate(() => (window as unknown as { cleanups: Record<string, () => void> }).cleanups.card0())
    await page.evaluate(() => document.querySelectorAll<SVGTextElement>('text[data-k]').forEach((t) => { t.style.fill = '' }))
    const s = await state(page, 'card0')
    for (const l of s.labels.filter((x) => AUTHORED_FAIL.includes(x.k))) expect(contrast(l), l.k).toBeLessThan(4.5)
    await page.context().close()
  })

  it('a figure VISIBLE at mount reaches 4.5:1 on every label, and reports nothing unmeasured', async () => {
    const page = await open({ cards: 1 })
    await settle(page)
    const s = await state(page, 'card0')
    expect(s.unmeasured).toBeNull()
    for (const l of s.labels) expect(contrast(l), `${l.k} ${l.fill} on ${l.bg}`).toBeGreaterThanOrEqual(4.5)
    // the hue family survives (the lift mixes toward white, it does not recolour): green stays greener than red
    const applied = rgb(s.labels.find((l) => l.k === 'applied')!.fill)
    expect(applied[1]).toBeGreaterThan(applied[0])
    await page.context().close()
  })

  it('a figure mounted OFF SCREEN is reported unmeasured — never "passed" — and is lifted once scrolled into view', async () => {
    const page = await open({ cards: 8, scrolled: 'bottom' })   // newest in view, card0 far above
    await settle(page)
    const old = await state(page, 'card0')
    expect(old.unmeasured, 'the pass must say it could not measure (all five labels)').toBe('5')
    for (const l of old.labels.filter((x) => AUTHORED_FAIL.includes(x.k))) expect(l.inline, `${l.k} must not claim a lift it never computed`).toBe('')
    await scrollToCard(page, 'card0')
    await settle(page, 600)
    const now = await state(page, 'card0')
    expect(now.unmeasured).toBeNull()
    for (const l of now.labels) expect(contrast(l), `${l.k}`).toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('NEGATIVE CONTROL: without the viewport observer an off-screen figure stays at its authored contrast after scrolling (the production defect)', async () => {
    const page = await open({ cards: 8, noIO: true, scrolled: 'bottom' })
    await settle(page)
    expect((await state(page, 'card0')).unmeasured).toBe('5')
    await scrollToCard(page, 'card0')
    await settle(page, 800)
    const s = await state(page, 'card0')
    const worst = Math.min(...s.labels.map(contrast))
    expect(worst, 'this is what production showed: the figure was never lifted').toBeLessThan(4.5)
    await page.context().close()
  })

  it('multiple cards are handled independently: oldest and newest are measured separately', async () => {
    const page = await open({ cards: 8, scrolled: 'bottom' })
    await settle(page)
    const newest = await state(page, 'card7')
    const oldest = await state(page, 'card0')
    expect(newest.unmeasured).toBeNull()
    expect(oldest.unmeasured).toBe('5')
    for (const l of newest.labels) expect(contrast(l)).toBeGreaterThanOrEqual(4.5)
    // lifting card7 touched nothing in card0
    expect(oldest.labels.every((l) => l.inline === '' || !AUTHORED_FAIL.includes(l.k))).toBe(true)
    await page.context().close()
  })

  it('a card never viewed stays honest after a LATER card was viewed; viewing it then lifts it', async () => {
    const page = await open({ cards: 16, scrolled: 'bottom' })
    await settle(page)
    await scrollToCard(page, 'card2')                        // a jump: cards 5-10 were never on screen
    await settle(page, 600)
    expect((await state(page, 'card2')).unmeasured).toBeNull()
    expect((await state(page, 'card7')).unmeasured, 'card7 was never visible').toBe('5')
    await scrollToCard(page, 'card7')
    await settle(page, 600)
    const s = await state(page, 'card7')
    expect(s.unmeasured).toBeNull()
    for (const l of s.labels) expect(contrast(l)).toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('scrolling away and back repeatedly never loses the lift', async () => {
    const page = await open({ cards: 8 })
    await settle(page)
    for (let i = 0; i < 4; i++) {
      await scrollToCard(page, 'card0'); await settle(page, 500)
      expect((await state(page, 'card0')).labels.every((l) => contrast(l) >= 4.5), `enter ${i}`).toBe(true)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await settle(page, 500)
      const away = await state(page, 'card0')
      expect(away.labels.every((l) => contrast(l) >= 4.5), `while away ${i}: inline styles persist`).toBe(true)
    }
    await page.context().close()
  })

  it('LIGHT theme: the lift goes the other way and reaches 4.5:1', async () => {
    const page = await open({ cards: 1, theme: 'light' })
    await settle(page)
    const s = await state(page, 'card0')
    for (const l of s.labels) expect(contrast(l), `${l.k} ${l.fill} on ${l.bg}`).toBeGreaterThanOrEqual(4.5)
    // toward black: no channel got lighter than authored
    const applied = rgb(s.labels.find((l) => l.k === 'applied')!.fill)
    expect(applied[1]).toBeLessThanOrEqual(0xA0)
    await page.context().close()
  })

  it('a THEME flip re-measures with no node in the figure changing, and a flip while off screen leaves no stale lift', async () => {
    const page = await open({ cards: 8 })
    await settle(page)
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'))
    await settle(page, 700)
    const visible = await state(page, 'card0')
    for (const l of visible.labels) expect(contrast(l), `visible ${l.k} after flip`).toBeGreaterThanOrEqual(4.5)
    // card7 is far off screen: it was lifted for DARK before the flip and must not keep a stale dark-theme colour
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(700)
    await scrollToCard(page, 'card0')
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
    await settle(page, 700)
    const back = await state(page, 'card0')
    for (const l of back.labels) expect(contrast(l), `${l.k} after flipping back`).toBeGreaterThanOrEqual(4.5)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await settle(page, 700)
    const far = await state(page, 'card7')
    for (const l of far.labels) expect(contrast(l), `in-view card after flips ${l.k}`).toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('a viewport resize re-measures (a narrower column changes the type floor, and the labels are re-lifted)', async () => {
    const page = await open({ cards: 2 })
    await settle(page)
    await page.setViewportSize({ width: 320, height: 700 })
    await settle(page, 700)
    const s = await state(page, 'card0')
    for (const l of s.labels) expect(contrast(l), l.k).toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('labels on VARIED backgrounds are judged against what is under them (an svg rect, not the card)', async () => {
    const page = await open({ cards: 1 })
    await settle(page)
    // "Object" sits on the body's rect. Repaint the rect near-white: the cream label (readable on dark) now sits on
    // a LIGHT backdrop and must be lifted toward black against THAT, while its neighbours stay judged on the card.
    await page.evaluate(() => { document.querySelector('#card0 svg rect')!.setAttribute('fill', '#f4f4f4') })
    await settle(page, 800)
    const fill = await page.evaluate(() => getComputedStyle(document.querySelector('#card0 svg text')!).fill)
    expect(contrastRatio(rgb(fill), [0xf4, 0xf4, 0xf4]), 'the "Object" label against the panel it sits on').toBeGreaterThanOrEqual(4.5)
    const friction = await page.evaluate(() => getComputedStyle(document.querySelector('#card0 text[data-k=friction]')!).fill)
    expect(contrastRatio(rgb(friction), rgb('rgb(36, 51, 41)')), 'a neighbour on the card surface is judged on the card').toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('NO FALSE SUCCESS: a label over a gradient / image, or with no box, is reported unmeasured, not lifted against a guess', async () => {
    const page = await open({ cards: 1 })
    await page.evaluate(() => { (document.getElementById('card0') as HTMLElement).style.background = 'linear-gradient(90deg,#ff0 0%,#00f 100%)' })
    await settle(page, 700)
    const g = await state(page, 'card0')
    expect(g.unmeasured, 'four labels sit on the gradient; "Object" sits on an opaque rect').toBe('4')
    await page.evaluate(() => { (document.getElementById('card0') as HTMLElement).style.background = ''; (document.getElementById('card0') as HTMLElement).style.display = 'none' })
    await settle(page, 700)
    expect((await state(page, 'card0')).unmeasured, 'display:none -> no box -> unmeasured').toBe('5')
    await page.context().close()
  })

  it('an overlay covering a label (a sticky header) does not become that label\'s backdrop', async () => {
    const page = await open({ cards: 1 })
    await page.evaluate(() => { document.getElementById('header')!.style.display = 'block'; document.getElementById('card0')!.style.marginTop = '0' })
    await page.evaluate(() => window.scrollTo(0, 0))
    // put the card's labels under the 48px fixed header
    await page.evaluate(() => { document.getElementById('spacer-top')!.style.height = '0'; (document.getElementById('card0') as HTMLElement).style.transform = 'translateY(-24px)' })
    await settle(page)
    const s = await state(page, 'card0')
    for (const l of s.labels) expect(contrast(l), `${l.k} judged on the card, not on the magenta header`).toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('a re-rendered label with a DIFFERENT authored colour is re-read, not lifted from the stale one', async () => {
    const page = await open({ cards: 1 })
    await settle(page)
    const before = rgb((await state(page, 'card0')).labels.find((l) => l.k === 'friction')!.fill)
    await page.evaluate(() => { document.querySelector('#card0 text[data-k=friction]')!.setAttribute('fill', '#FF6B5E') })   // React re-render: a highlighted state
    await settle(page, 700)
    const after = rgb((await state(page, 'card0')).labels.find((l) => l.k === 'friction')!.fill)
    expect(after[0], 'now the red family, not the blue one').toBeGreaterThan(after[2])
    expect(before[2], 'it was the blue family').toBeGreaterThan(before[0])
    await page.context().close()
  })

  it('React REMOUNT: an svg replaced inside the frame is observed and lifted when visible (no detached-node observer)', async () => {
    const page = await open({ cards: 8, scrolled: 'bottom' })
    await settle(page)
    await page.evaluate((svg) => { const c = document.getElementById('card0')!; c.querySelector('svg')!.remove(); c.insertAdjacentHTML('beforeend', svg) }, SVG())
    await settle(page, 600)
    await scrollToCard(page, 'card0')
    await settle(page, 700)
    const s = await state(page, 'card0')
    expect(s.unmeasured).toBeNull()
    for (const l of s.labels) expect(contrast(l), l.k).toBeGreaterThanOrEqual(4.5)
    await page.context().close()
  })

  it('CLEANUP: after the returned cleanup runs nothing is observed — no marker, no later pass, no leaked timer writes', async () => {
    const page = await open({ cards: 8, scrolled: 'bottom' })
    await page.evaluate(() => (window as unknown as { cleanups: Record<string, () => void> }).cleanups.card0())
    expect((await state(page, 'card0')).attached).toBe(false)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await settle(page)
    await scrollToCard(page, 'card0')
    await settle(page, 700)
    const s = await state(page, 'card0')
    expect(s.labels.every((l) => l.inline === ''), 'a detached figure is never touched again').toBe(true)
    expect(s.unmeasured).toBeNull()
    await page.context().close()
  })

  it('NO LOOP: once settled, the figure produces no DOM writes at all (the pass converges)', async () => {
    const page = await open({ cards: 1 })
    await settle(page)
    const writes = await page.evaluate(() => new Promise<number>((done) => {
      let n = 0
      const mo = new MutationObserver((recs) => { n += recs.length })
      mo.observe(document.getElementById('card0')!, { subtree: true, childList: true, attributes: true })
      setTimeout(() => { mo.disconnect(); done(n) }, 2000)
    }))
    expect(writes).toBe(0)
    await page.context().close()
  })

  it('PERFORMANCE: 60 cards (a long restored lesson) attach and settle without a long task over 200 ms', async () => {
    const page = await open({ cards: 60, height: 800 })
    const longest = await page.evaluate(() => new Promise<number>((done) => {
      let worst = 0
      const po = new PerformanceObserver((l) => { for (const e of l.getEntries()) worst = Math.max(worst, e.duration) })
      try { po.observe({ entryTypes: ['longtask'] }) } catch { done(0); return }
      setTimeout(() => { po.disconnect(); done(worst) }, 2500)
    }))
    expect(longest).toBeLessThan(200)
    const s = await state(page, 'card0')
    expect(s.unmeasured, 'card0 is on screen at mount').toBeNull()
    await page.context().close()
  })

  it('UNRELATED text and unattached svgs are never touched', async () => {
    const page = await open({ cards: 1 })
    await page.evaluate((svg) => {
      document.body.insertAdjacentHTML('beforeend', `<p id="plain" style="color:#22A06B">plain paragraph</p><div class="card" id="loose">${svg}</div>`)
    }, SVG())
    await settle(page)
    const touched = await page.evaluate(() => ({
      plain: document.getElementById('plain')!.getAttribute('style'),
      loose: Array.from(document.querySelectorAll('#loose text')).every((t) => (t as SVGTextElement).style.fill === '' && !(t as SVGElement).hasAttribute('data-authored-fill')),
      looseFont: Array.from(document.querySelectorAll('#loose text')).every((t) => (t as SVGTextElement).style.fontSize === ''),
    }))
    expect(touched.plain).toBe('color:#22A06B')
    expect(touched.loose).toBe(true)
    expect(touched.looseFont).toBe(true)
    await page.context().close()
  })

  it('hydration safety: the module touches no browser global at import time (it can be imported on the server)', async () => {
    // The bundle has already been evaluated in Chromium; here, evaluate the same source in a bare Node context.
    const vm = await import('node:vm')
    const out = await build({
      entryPoints: [BUNDLE_ENTRY], bundle: true, write: false, format: 'iife', globalName: 'FL', platform: 'browser',
      alias: { '@': resolve(__dirname, '..') }, define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'silent',
    })
    const ctx = vm.createContext({ console })   // no window, no document, no observers
    expect(() => vm.runInContext(out.outputFiles[0].text, ctx)).not.toThrow()
  })
})
