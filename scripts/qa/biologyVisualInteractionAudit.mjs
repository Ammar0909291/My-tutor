/**
 * Biology visual INTERACTION audit (dev harness, read-only).
 *
 * The render audit (biologyVisualRenderAudit.mjs) covers every concept's initial, first-stage and
 * last-stage states. This one drives the controls a Biology figure actually offers — Play the stages,
 * the Situation/Diagram view, Expand, the legend pins, the Explain / Test me / Predict / Practice
 * modes — and checks the states they produce, plus reduced-motion behaviour, at desktop and mobile.
 *
 *   node scripts/qa/biologyVisualInteractionAudit.mjs <outDir> --ids a,b | --file ids.txt [--base http://localhost:3000]
 *
 * Writes <outDir>/<id>/<viewport>-<state>.png and <outDir>/interaction-<shard>.json.
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const outDir = args[0]
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d }
const base = opt('--base', 'http://localhost:3000')
const shard = opt('--shard', 'all')
let ids = []
if (opt('--ids', null)) ids = opt('--ids').split(',')
else if (opt('--file', null)) ids = fs.readFileSync(opt('--file'), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean)
if (!outDir || !ids.length) { console.error('usage: <outDir> --ids a,b | --file ids.txt'); process.exit(2) }
fs.mkdirSync(outDir, { recursive: true })

const VIEWPORTS = { desktop: { width: 1280, height: 900 }, mobile: { width: 390, height: 844 } }
const FIG = 'figure[role="figure"]'

const snapshot = () => {
  const fig = document.querySelector('figure[role="figure"]')
  if (!fig) return { error: 'no-figure' }
  const labels = [...fig.querySelectorAll('div[style*="translate3d"] span')].map((s) => s.textContent.trim()).filter(Boolean)
  const fr = fig.getBoundingClientRect()
  const canvas = fig.querySelector('canvas')?.getBoundingClientRect()
  return {
    labels,
    labelCount: labels.length,
    figureW: Math.round(fr.width),
    figureH: Math.round(fr.height),
    canvasW: canvas ? Math.round(canvas.width) : null,
    canvasH: canvas ? Math.round(canvas.height) : null,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    buttons: [...fig.querySelectorAll('button')].map((b) => ({ name: b.getAttribute('aria-label') || b.textContent.trim(), pressed: b.getAttribute('aria-pressed') })).filter((b) => b.name),
    stageMeta: fig.querySelector('[class*="stageMeta"]')?.textContent ?? null,
    panelText: [...fig.querySelectorAll('[role="status"]')].map((e) => e.textContent.trim()).join(' | ').slice(0, 600),
  }
}
const same = (a, b) => JSON.stringify(a.labels) === JSON.stringify(b.labels)

async function shot(page, file) { await page.locator(FIG).first().screenshot({ path: file }) }
async function click(page, name, exact = true) {
  const b = page.getByRole('button', { name, exact }).first()
  if (!(await b.count())) return false
  await b.click(); return true
}

const results = []
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
})
try {
  for (const id of ids) {
    const rec = { conceptId: id, viewports: {} }
    const dir = path.join(outDir, id); fs.mkdirSync(dir, { recursive: true })
    for (const [vp, size] of Object.entries(VIEWPORTS)) {
      const v = { checks: {}, errors: [] }
      const ctx = await browser.newContext({ viewport: size })
      const page = await ctx.newPage()
      page.on('pageerror', (e) => v.errors.push(`pageerror: ${e.message}`.slice(0, 200)))
      try {
        await page.goto(`${base}/dev/visual-demo/simulation/served?concept=${encodeURIComponent(id)}`, { waitUntil: 'domcontentloaded', timeout: 120000 })
        await page.waitForSelector(`${FIG} canvas`, { timeout: 60000 })
        await page.waitForFunction(() => { const c = document.querySelector('figure[role="figure"] canvas'); return !!c && !(c.width === 300 && c.height === 150) }, null, { timeout: 60000 }).catch(() => {})
        await page.waitForTimeout(1300)
        const initial = await page.evaluate(snapshot)
        v.initial = { labelCount: initial.labelCount, buttons: initial.buttons.map((b) => b.name) }

        // ── ANIMATION: Play the stages → mid-play → end ────────────────────────────────────────
        // Playing opens a "Position in …" slider (0–1) that advances with the animation, so the
        // slider's value is the progress signal: sample it until it reaches the end (or loops/stalls).
        if (await click(page, 'Play the stages')) {
          const slider = page.locator(`${FIG} input[type="range"][aria-label^="Position in"]`).first()
          const values = []
          let midShot = false
          for (let i = 0; i < 40; i++) {
            await page.waitForTimeout(500)
            const val = (await slider.count()) ? Number(await slider.inputValue()) : null
            values.push(val)
            if (!midShot && val !== null && val >= 0.35) { midShot = true; await shot(page, path.join(dir, `${vp}-play-mid.png`)) }
            if (val !== null && val >= 0.99) break
            if (val === null && i > 2) break
          }
          if (!midShot) await shot(page, path.join(dir, `${vp}-play-mid.png`))
          await page.waitForTimeout(400)
          const end = await page.evaluate(snapshot)
          await shot(page, path.join(dir, `${vp}-play-end.png`))
          const numeric = values.filter((x) => x !== null)
          // Playback LOOPS (the position wraps back toward 0), so "reached the end" is read from the
          // maximum and the wrap rather than from stopping; clicking the control again must stop it.
          await click(page, 'Play the stages')
          await page.waitForTimeout(800)
          const a1 = (await slider.count()) ? Number(await slider.inputValue()) : null
          await page.waitForTimeout(800)
          const a2 = (await slider.count()) ? Number(await slider.inputValue()) : null
          v.checks.playToggleStops = { panelClosedOrFrozen: a1 === null || a1 === a2 }
          v.checks.play = {
            max: numeric.length ? Math.max(...numeric) : null,
            looped: numeric.some((x, i) => i > 0 && x < numeric[i - 1] - 0.05),
            samples: numeric.length,
            startedAt: numeric[0] ?? null,
            endLabelCount: end.labelCount,
            initialLabelCount: initial.labelCount,
            panelText: end.panelText.slice(0, 160),
          }
        } else v.checks.play = 'no-play-control'

        // ── RESET: stepping then Show all returns to the all-stages view ─────────────────────────
        await page.reload({ waitUntil: 'domcontentloaded' })
        await page.waitForSelector(`${FIG} canvas`)
        await page.waitForFunction(() => { const c = document.querySelector('figure[role="figure"] canvas'); return !!c && !(c.width === 300 && c.height === 150) }, null, { timeout: 60000 }).catch(() => {})
        await page.waitForTimeout(1200)
        const base0 = await page.evaluate(snapshot)
        if (await click(page, 'Next stage')) {
          await page.waitForTimeout(500)
          const one = await page.evaluate(snapshot)
          const showAll = await click(page, 'Show all', false)
          await page.waitForTimeout(500)
          const back = await page.evaluate(snapshot)
          v.checks.reset = { stage1Labels: one.labelCount, showAllPresent: showAll, restoredToInitial: same(base0, back) }
        }

        // ── VIEWS: Situation / Diagram, and any other representation chip ────────────────────────
        for (const name of ['Diagram', 'Situation']) {
          if (await click(page, name)) {
            await page.waitForTimeout(600)
            await shot(page, path.join(dir, `${vp}-view-${name.toLowerCase()}.png`))
            const s = await page.evaluate(snapshot)
            v.checks[`view${name}`] = { labelCount: s.labelCount, hScroll: s.hScroll, canvas: [s.canvasW, s.canvasH] }
          }
        }

        // ── MODES: Explain / Test me / Predict / Practice (answer must not leak) ────────────────
        const modeNames = (await page.evaluate(snapshot)).buttons.map((b) => b.name).filter((n) => ['Explain', 'Test me', 'Predict', 'Practice'].includes(n))
        if (modeNames.length) {
          v.checks.modes = {}
          const explain = await (async () => { if (await click(page, 'Explain')) { await page.waitForTimeout(500) } return page.evaluate(snapshot) })()
          for (const m of modeNames) {
            if (m === 'Explain') continue
            if (await click(page, m)) {
              await page.waitForTimeout(700)
              const s = await page.evaluate(snapshot)
              await shot(page, path.join(dir, `${vp}-mode-${m.replace(/\W+/g, '').toLowerCase()}.png`))
              v.checks.modes[m] = { labelCount: s.labelCount, labelsHiddenVsExplain: explain.labels.filter((l) => !s.labels.includes(l)).slice(0, 12), panel: s.panelText.slice(0, 200) }
            }
          }
          await click(page, 'Explain'); await page.waitForTimeout(400)
        }

        // ── LEGEND pin (first legend chip, if any) ───────────────────────────────────────────────
        const legendBtn = page.locator(`${FIG} [aria-label="What the colours mean"] button`).first()
        if (await legendBtn.count()) {
          await legendBtn.click(); await page.waitForTimeout(500)
          await shot(page, path.join(dir, `${vp}-legend-pinned.png`))
          v.checks.legendPin = { ok: true }
          await legendBtn.click().catch(() => {})
        }

        // ── EXPAND → Return ──────────────────────────────────────────────────────────────────────
        if (await click(page, 'Expand the figure')) {
          await page.waitForTimeout(900)
          const ex = await page.evaluate(snapshot)
          await shot(page, path.join(dir, `${vp}-expanded.png`))
          const ret = page.getByRole('button', { name: 'Return the figure to the lesson' }).first()
          const hasReturn = (await ret.count()) > 0
          if (hasReturn) await ret.click(); else await page.keyboard.press('Escape')
          await page.waitForTimeout(700)
          const after = await page.evaluate(snapshot)
          v.checks.expand = { expandedCanvas: [ex.canvasW, ex.canvasH], expandedLabels: ex.labelCount, returnControl: hasReturn, restoredCanvas: [after.canvasW, after.canvasH], hScrollWhenExpanded: ex.hScroll }
        }
      } catch (e) { v.fatal = String(e).slice(0, 300) }
      await ctx.close()

      // ── REDUCED MOTION: nothing may animate on its own ────────────────────────────────────────
      const rctx = await browser.newContext({ viewport: size, reducedMotion: 'reduce' })
      const rp = await rctx.newPage()
      try {
        await rp.goto(`${base}/dev/visual-demo/simulation/served?concept=${encodeURIComponent(id)}`, { waitUntil: 'domcontentloaded', timeout: 120000 })
        await rp.waitForSelector(`${FIG} canvas`, { timeout: 60000 })
        await rp.waitForFunction(() => { const c = document.querySelector('figure[role="figure"] canvas'); return !!c && !(c.width === 300 && c.height === 150) }, null, { timeout: 60000 }).catch(() => {})
        await rp.waitForTimeout(1300)
        const a = await rp.locator(FIG).first().screenshot()
        await rp.waitForTimeout(1500)
        const b = await rp.locator(FIG).first().screenshot()
        v.checks.reducedMotion = { stableWithoutInteraction: Buffer.compare(a, b) === 0 }
      } catch (e) { v.checks.reducedMotion = { error: String(e).slice(0, 120) } }
      await rctx.close()
      rec.viewports[vp] = v
    }
    results.push(rec)
    fs.writeFileSync(path.join(outDir, `interaction-${shard}.json`), JSON.stringify(results, null, 1))
    process.stdout.write(`${id} ok\n`)
  }
} finally { await browser.close() }
