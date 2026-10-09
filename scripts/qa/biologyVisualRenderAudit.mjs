/**
 * Biology visual RENDER audit (dev harness, read-only).
 *
 * Opens the REAL learner figure (`/dev/visual-demo/simulation/served?concept=<id>` — the production
 * `resolveVisual` decision rendered through SceneSpecFigure → ExplainerFigure, the component the
 * lesson uses) in headless Chromium with WebGL, at DESKTOP (1280) and MOBILE (390), in several
 * interaction states, and records DOM measurements + a screenshot for every state.
 *
 *   node scripts/qa/biologyVisualRenderAudit.mjs <outDir> [--ids a,b,c | --file ids.txt] [--base http://localhost:3000] [--theme dark|light]
 *
 * Writes <outDir>/<conceptId>/<viewport>-<state>.png and <outDir>/results-<shard>.json.
 * It measures; it does not judge — judgment (PASS/FAIL/REVIEW_REQUIRED) is made by inspecting the
 * screenshots and the measurements together.
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const outDir = args[0]
const opt = (name, dflt) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : dflt }
const base = opt('--base', 'http://localhost:3000')
const theme = opt('--theme', null)
const shard = opt('--shard', 'all')
let ids = []
if (opt('--ids', null)) ids = opt('--ids').split(',')
else if (opt('--file', null)) ids = fs.readFileSync(opt('--file'), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean)
if (!outDir || ids.length === 0) { console.error('usage: <outDir> --ids a,b | --file ids.txt'); process.exit(2) }
fs.mkdirSync(outDir, { recursive: true })

const VIEWPORTS = { desktop: { width: 1280, height: 900 }, mobile: { width: 390, height: 844 } }

const MEASURE = () => {
  const fig = document.querySelector('figure[role="figure"]')
  if (!fig) return { error: 'no-figure' }
  const canvas = fig.querySelector('canvas')
  const cr = canvas ? canvas.getBoundingClientRect() : null
  // drei <Html> mounts each label as div[style*=translate3d] > span, inside the canvas container
  // (the canvas's GRANDparent), not beside the canvas — so select by that wrapper.
  const spans = [...fig.querySelectorAll('div[style*="translate3d"] span')].filter((s) => s.textContent && s.textContent.trim())
  const labels = spans.map((s) => {
    const r = s.getBoundingClientRect()
    const cs = getComputedStyle(s)
    return { text: s.textContent.trim(), x: r.x, y: r.y, w: r.width, h: r.height, fs: parseFloat(cs.fontSize), color: cs.color }
  }).filter((l) => l.w > 0 && l.h > 0)
  const overlaps = []
  for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) {
    const a = labels[i], b = labels[j]
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
    if (ox > 1 && oy > 1) overlaps.push({ a: a.text, b: b.text, area: Math.round(ox * oy) })
  }
  const outside = cr ? labels.filter((l) => l.x < cr.x - 1 || l.y < cr.y - 1 || l.x + l.w > cr.x + cr.width + 1 || l.y + l.h > cr.y + cr.height + 1)
    .map((l) => ({ text: l.text, x: Math.round(l.x - cr.x), y: Math.round(l.y - cr.y), w: Math.round(l.w), h: Math.round(l.h) })) : []
  const text = fig.innerText
  const leaks = (text.match(/\b(undefined|NaN|null|\[object|spoke-line|cell-hub-|cell-pathway-|stage-\d|group-\d|TODO|lorem)\b/gi) || [])
  return {
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    figure: (() => { const r = fig.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), scrollW: fig.scrollWidth, clientW: fig.clientWidth } })(),
    canvas: cr ? { w: Math.round(cr.width), h: Math.round(cr.height) } : null,
    labelCount: labels.length,
    labels: (() => { const fr = fig.getBoundingClientRect(); return labels.map((l) => ({ text: l.text, x: Math.round(l.x - fr.x), y: Math.round(l.y - fr.y), w: Math.round(l.w), h: Math.round(l.h), fs: l.fs, color: l.color })) })(),
    minLabelFont: labels.length ? Math.min(...labels.map((l) => l.fs)) : null,
    overlaps,
    outside,
    leaks,
    title: fig.querySelector('h3')?.textContent ?? null,
    figureText: text.slice(0, 4000),
    buttons: [...fig.querySelectorAll('button')].map((b) => b.getAttribute('aria-label') || b.textContent.trim()).filter(Boolean),
    legend: [...fig.querySelectorAll('[aria-label="What the colours mean"] li, [aria-label="What the colours mean"] > *')].map((e) => e.textContent.trim()).slice(0, 20),
  }
}

async function shot(page, file) {
  const fig = page.locator('figure[role="figure"]').first()
  await fig.screenshot({ path: file })
}

const results = []
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
})
try {
  for (const id of ids) {
    const rec = { conceptId: id, viewports: {} }
    const idDir = path.join(outDir, id)
    fs.mkdirSync(idDir, { recursive: true })
    for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, ...(theme ? { colorScheme: theme } : {}) })
      // The app reads its theme from localStorage (`mytutor_theme`), not from prefers-color-scheme.
      if (theme) await ctx.addInitScript((t) => { try { localStorage.setItem('mytutor_theme', t) } catch {} }, theme)
      const page = await ctx.newPage()
      const errors = []
      page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`.slice(0, 300)))
      page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`.slice(0, 300)) })
      const v = { states: {}, errors }
      try {
        await page.goto(`${base}/dev/visual-demo/simulation/served?concept=${encodeURIComponent(id)}`, { waitUntil: 'domcontentloaded', timeout: 120000 })
        await page.waitForSelector('figure[role="figure"] canvas', { timeout: 60000 }).catch(() => {})
        // The canvas is created at the browser default (300×150) and only takes its real size after
        // layout; a capture taken before that is a blank figure. Wait for the real first render.
        await page.waitForFunction(() => { const c = document.querySelector('figure[role="figure"] canvas'); return !!c && !(c.width === 300 && c.height === 150) }, null, { timeout: 60000 }).catch(() => {})
        await page.waitForTimeout(1300)
        v.provenance = await page.locator('[data-testid="served-provenance"]').textContent().catch(() => null)
        v.renderer = await page.locator('[data-testid="served-renderer"]').textContent().catch(() => null)
        v.hasWebGLCanvas = (await page.locator('figure[role="figure"] canvas').count()) > 0

        // state: initial
        v.states.initial = await page.evaluate(MEASURE)
        await shot(page, path.join(idDir, `${vpName}-initial.png`))
        // 'initial' IS the all-stages view (the stepper starts un-walked): same pixels, so reuse them.
        fs.copyFileSync(path.join(idDir, `${vpName}-initial.png`), path.join(idDir, `${vpName}-all.png`))
        v.states.all = v.states.initial

        // walk stages
        const next = page.getByRole('button', { name: 'Next stage' })
        if (await next.count()) {
          await next.first().click(); await page.waitForTimeout(450)
          v.states.stage1 = await page.evaluate(MEASURE)
          await shot(page, path.join(idDir, `${vpName}-stage1.png`))
          let guard = 0
          while (guard++ < 14 && (await next.first().isEnabled().catch(() => false))) { await next.first().click(); await page.waitForTimeout(150) }
          await page.waitForTimeout(450)
          v.states.last = await page.evaluate(MEASURE)
          await shot(page, path.join(idDir, `${vpName}-last.png`))
        }
        // full page (beyond the figure) for mobile overflow context
        if (vpName === 'mobile') await page.screenshot({ path: path.join(idDir, `${vpName}-page.png`), fullPage: true })
      } catch (e) {
        v.fatal = String(e).slice(0, 400)
      }
      rec.viewports[vpName] = v
      await ctx.close()
    }
    results.push(rec)
    fs.writeFileSync(path.join(outDir, `results-${shard}.json`), JSON.stringify(results, null, 1))
    process.stdout.write(`${id} ok\n`)
  }
} finally {
  await browser.close()
}
