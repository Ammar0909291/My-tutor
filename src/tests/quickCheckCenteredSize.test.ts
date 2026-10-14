/**
 * THE QUICK CHECK PANEL OPENS IN THE MIDDLE OF TUTOR MAX, 1cm LARGER (owner request, 2026-10-13).
 *
 * It used to sit low — 88px above the composer, 440px wide. Now: centred on both axes of the Tutor Max window
 * (`top: 50%` + the matching `-50%` Y translate in the inline transform that also carries the drag offset), 1cm wider
 * (`calc(440px + 1cm)`) and 1cm taller (0.5cm more padding top and bottom). Minimized keeps the old low place so the
 * chat it exists to uncover stays uncovered.
 *
 * Source pins hold the contract; the Chromium suite applies the REAL stylesheet and the REAL inline style values (parsed
 * out of LessonScreen.tsx, so a change there shows up here) and measures the centre and the size.
 * Chromium is located via PW_CHROMIUM_PATH, /opt/pw-browsers/chromium, or Playwright's own install; without one the
 * browser suite is SKIPPED with a warning unless REQUIRE_BROWSER_TESTS=1.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium, type Browser } from 'playwright'
import { findChromium, REQUIRE_BROWSER } from './helpers/chromiumPath'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const SRC = read('src/components/learn/LessonScreen.tsx')
const CSS = read('src/components/learn/LessonScreen.module.css')
const TOKENS = read('src/styles/tokens.css')

const ruleOf = (selector: string, from = 0) => {
  const i = CSS.indexOf(`${selector} {`, from)
  return i < 0 ? '' : CSS.slice(i, CSS.indexOf('}', i) + 1)
}
const PANEL = SRC.slice(SRC.indexOf('ref={quickCheckPanelRef}'), SRC.indexOf('{/* DRAG HANDLE'))
const CM = 96 / 2.54 // one CSS centimetre in px

describe('Quick Check panel — centred and 1cm larger (source contract)', () => {
  const floating = ruleOf('.quickCheckFloating')

  it('is anchored at the vertical middle of its container, not 88px above the composer', () => {
    expect(floating).toContain('top: 50%')
    expect(floating).toContain('left: 50%')
    expect(floating).toContain('bottom: auto')
    expect(floating).not.toContain('bottom: 88px')
  })

  it('is exactly 1cm wider than the 440px it was (and still never wider than the window minus its gutter)', () => {
    expect(floating).toContain('width: min(calc(440px + 1cm), calc(100% - 24px))')
  })

  it('may be 1cm taller too, and can never be taller than the window it is centred in', () => {
    expect(floating).toContain('max-height: min(calc(100% - 24px), calc(420px + 1cm))')
  })

  it('on a phone the width stays the whole viewport minus a gutter (only the height grows) and the max-height is relative to the window', () => {
    const mobile = CSS.slice(CSS.indexOf('@media (max-width: 640px)'), CSS.indexOf('@media (max-width: 900px)'))
    expect(mobile).toContain('width: calc(100% - 16px)')
    expect(mobile).toContain('max-height: min(calc(100% - 16px), calc(62% + 1cm))')
    expect(mobile).not.toContain('bottom: 78px')
  })

  it('the expanded panel is centred on BOTH axes in the inline transform, with the drag offset layered on top', () => {
    expect(PANEL).toContain('`translate(calc(-50% + ${quickCheckDragOffset.x}px), calc(-50% + ${quickCheckDragOffset.y}px))`')
  })

  it('the expanded panel is 1cm taller: 0.5cm of extra padding above and below', () => {
    expect(PANEL).toContain("'calc(12px + 0.5cm) 14px calc(14px + 0.5cm)'")
  })

  it('MINIMIZED keeps its old low place: Y centring dropped, class puts it back above the composer, compact padding', () => {
    expect(PANEL).toContain('? `translate(calc(-50% + ${quickCheckDragOffset.x}px), ${quickCheckDragOffset.y}px)`')
    expect(PANEL).toContain("quickCheckMode === 'minimized' ? '12px 14px 14px'")
    const min = ruleOf('.quickCheckMinimized')
    expect(min).toContain('top: auto')
    expect(min).toContain('bottom: 88px')
    expect(CSS.slice(CSS.lastIndexOf('@media (max-width: 640px)'))).toContain('.quickCheckMinimized { bottom: 78px; }')
  })

  it('nothing about answering changed: same class, same options handler, window controls and drag clamp intact', () => {
    expect(PANEL).toContain('styles.quickCheckFloating')
    expect(SRC).toContain('void sendMessage(sessionId, option)')
    expect(SRC).toContain('clampDragOffset(proposed, drag.naturalRect, { width: window.innerWidth, height: window.innerHeight })')
  })
})

const CHROMIUM = findChromium()
const REQUIRED = REQUIRE_BROWSER
if (!CHROMIUM) console.warn(`[quickCheckCenteredSize] no Chromium found — ${REQUIRED ? 'FAILING' : 'skipping'} the browser suite`)
const suite = CHROMIUM || REQUIRED ? describe : describe.skip

/** The inline style values LessonScreen.tsx actually sets, read out of the source. */
const inlinePadding = (mode: 'expanded' | 'minimized') => {
  const m = /padding: quickCheckMode === 'minimized' \? '([^']+)' : '([^']+)'/.exec(PANEL)!
  return mode === 'minimized' ? m[1] : m[2]
}
const inlineTransform = (mode: 'expanded' | 'minimized', x: number, y: number) => {
  const m = /\? `(translate\([^`]+)`\s*:\s*`(translate\([^`]+)`/.exec(PANEL.replace(/\n\s*/g, ' '))!
  return (mode === 'minimized' ? m[1] : m[2]).replace(/\$\{quickCheckDragOffset\.x\}/g, String(x)).replace(/\$\{quickCheckDragOffset\.y\}/g, String(y))
}

suite('Quick Check panel — measured in real Chromium with the real stylesheet', { timeout: 120_000 }, () => {
  let browser: Browser
  beforeAll(async () => {
    browser = await chromium.launch({ executablePath: CHROMIUM ?? undefined, args: ['--no-sandbox'] })
  }, 120_000)
  afterAll(async () => { await browser?.close() })

  const QUESTION = 'A car travels 100 m in 20 s. What is its average speed?'
  const OPTIONS = ['2 m/s', '5 m/s', '20 m/s', '100 m/s']

  async function measure(opts: { width: number; height: number; mode: 'expanded' | 'minimized'; theme?: 'dark' | 'light'; padding?: string; drag?: [number, number] }) {
    const page = await (await browser.newContext({ viewport: { width: opts.width, height: opts.height } })).newPage()
    const [dx, dy] = opts.drag ?? [0, 0]
    const cls = opts.mode === 'minimized' ? 'quickCheckFloating quickCheckMinimized' : 'quickCheckFloating'
    const buttons = OPTIONS.map((o, i) => `<button style="text-align:left;padding:9px 12px;border-radius:10px;border:1px solid var(--border-subtle);background:var(--bg-card);color:var(--text-primary);font-size:15.6px;font-weight:600"><span style="font-weight:800;margin-right:8px">${String.fromCharCode(65 + i)}</span>${o}</button>`).join('')
    await page.setContent(`<!doctype html><html data-theme="${opts.theme ?? 'dark'}"><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${TOKENS}\n${CSS}
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } /* the app's own reset, src/app/globals.css */
      body { background:var(--bg-void); font:15px/1.4 system-ui, sans-serif; }
      #win { position:relative; width:100vw; height:100vh; overflow:hidden; }
    </style></head><body><div id="win"><div id="panel" class="${cls}" style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:${opts.padding ?? inlinePadding(opts.mode)};display:flex;flex-direction:column;gap:8px;transform:${inlineTransform(opts.mode, dx, dy)}">
      <div style="display:flex;align-items:center;gap:6px"><span style="font-size:10.8px">QUICK CHECK</span><span style="flex:1"></span><button class="quickCheckControl">–</button><button class="quickCheckControl">×</button></div>
      ${opts.mode === 'minimized' ? '' : `<div style="font-size:15.6px;font-weight:600">${QUESTION}</div>${buttons}`}
    </div></div></body></html>`)
    const r = await page.evaluate(() => {
      const win = document.getElementById('win')!.getBoundingClientRect()
      const p = document.getElementById('panel')!.getBoundingClientRect()
      return { win: { w: win.width, h: win.height, cx: win.left + win.width / 2, cy: win.top + win.height / 2 }, panel: { w: p.width, h: p.height, cx: p.left + p.width / 2, cy: p.top + p.height / 2, top: p.top, bottom: p.bottom, left: p.left, right: p.right } }
    })
    await page.context().close()
    return r
  }

  for (const [label, width, height] of [['desktop 1280x800', 1280, 800], ['laptop 1024x700', 1024, 700], ['phone 390x800', 390, 800]] as const) {
    for (const theme of ['dark', 'light'] as const) {
      it(`${label} / ${theme}: the expanded panel is centred on both axes of the window`, async () => {
        const r = await measure({ width, height, mode: 'expanded', theme })
        expect(Math.abs(r.panel.cx - r.win.cx)).toBeLessThanOrEqual(1)
        expect(Math.abs(r.panel.cy - r.win.cy)).toBeLessThanOrEqual(1)
        // fully inside the window
        expect(r.panel.top).toBeGreaterThanOrEqual(0)
        expect(r.panel.bottom).toBeLessThanOrEqual(r.win.h)
        expect(r.panel.left).toBeGreaterThanOrEqual(0)
        expect(r.panel.right).toBeLessThanOrEqual(r.win.w)
      })
    }
  }

  it('desktop: the panel is 1cm wider than the 440px it was', async () => {
    const r = await measure({ width: 1280, height: 800, mode: 'expanded' })
    expect(r.panel.w).toBeGreaterThanOrEqual(440 + CM - 1)
    expect(r.panel.w).toBeLessThanOrEqual(440 + CM + 1)
  })

  it('the panel is 1cm taller than it was: the same content with the OLD padding is exactly 1cm shorter', async () => {
    const now = await measure({ width: 1280, height: 800, mode: 'expanded' })
    const before = await measure({ width: 1280, height: 800, mode: 'expanded', padding: '12px 14px 14px' })
    expect(now.panel.h - before.panel.h).toBeGreaterThanOrEqual(CM - 1)
    expect(now.panel.h - before.panel.h).toBeLessThanOrEqual(CM + 1)
  })

  it('phone: the width is the viewport minus the 16px gutter (it cannot grow past the screen), the height still grows', async () => {
    const r = await measure({ width: 390, height: 800, mode: 'expanded' })
    expect(r.panel.w).toBeCloseTo(390 - 16, 0)
    const before = await measure({ width: 390, height: 800, mode: 'expanded', padding: '12px 14px 14px' })
    expect(r.panel.h).toBeGreaterThan(before.panel.h + CM - 2)
  })

  it('a short window never lets the centred panel spill out: it is capped to the window height', async () => {
    const r = await measure({ width: 390, height: 360, mode: 'expanded' })
    expect(r.panel.h).toBeLessThanOrEqual(360)
    expect(r.panel.top).toBeGreaterThanOrEqual(0)
    expect(r.panel.bottom).toBeLessThanOrEqual(360)
  })

  it('dragging still composes with the centre: a (+40,-30) offset moves the panel exactly that far from the centred position', async () => {
    const base = await measure({ width: 1280, height: 800, mode: 'expanded' })
    const dragged = await measure({ width: 1280, height: 800, mode: 'expanded', drag: [40, -30] })
    expect(dragged.panel.cx - base.panel.cx).toBeCloseTo(40, 0)
    expect(dragged.panel.cy - base.panel.cy).toBeCloseTo(-30, 0)
  })

  it('MINIMIZED parks the compact bar above the composer (88px from the bottom), centred across — not in the middle of the chat', async () => {
    const r = await measure({ width: 1280, height: 800, mode: 'minimized' })
    expect(Math.abs(r.panel.cx - r.win.cx)).toBeLessThanOrEqual(1)
    expect(r.win.h - r.panel.bottom).toBeCloseTo(88, 0)
    expect(r.panel.cy).toBeGreaterThan(r.win.cy)
    // and it is the compact bar, far smaller than the expanded panel
    const expanded = await measure({ width: 1280, height: 800, mode: 'expanded' })
    expect(r.panel.h).toBeLessThan(expanded.panel.h / 2)
  })

  it('MINIMIZED on a phone sits 78px above the bottom', async () => {
    const r = await measure({ width: 390, height: 800, mode: 'minimized' })
    expect(r.win.h - r.panel.bottom).toBeCloseTo(78, 0)
  })
})
