/**
 * ENGLISH VISUAL RENDER AUDIT RUNNER (envelope audit) — the English twin of scripts/qa/englishVisual/renderAudit.ts.
 *
 * For every English fixture (see buildFixtures.ts: one process_flow per English concept + worst-case envelope specs), for each viewport × theme: open
 * /dev/physics-audit?fixture=… (the REAL renderer fed the fixture spec), wait until the figure has settled, MEASURE the DOM, screenshot the pixels behind each label (real
 * contrast, ink under labels, scene edge clipping), screenshot the figure as the learner sees it (evidence), and — for a figure with sliders —
 * drive them to min / max / combinations. Raw measurements only: `validate.ts` turns them into verdicts, so a changed threshold never
 * needs a re-render. All the browser machinery (contexts, the settle loop, the capture, the in-page auditor) is shared with Physics.
 *
 *   npx tsx scripts/qa/englishVisual/renderAudit.ts --out <dir> [--concepts a,b] [--viewports mobile,desktop,desktop-column]
 *        [--themes dark,light] [--light-viewports mobile] [--workers 3] [--shard i/n] [--redo] [--base http://localhost:3000]
 *
 * Needs a dev server (NODE_ENV != production): `npx next dev -p 3000`. Never run `playwright install`.
 */
import { chromium, type Browser } from 'playwright'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { readFileSync as readFx } from 'node:fs'
import type { Fixture } from './buildFixtures'
type InventoryRow = { conceptId: string; textObjects: number; graphical: true }
import { BASE, CHROMIUM_ARGS, VIEWPORT_CONFIG, capture, lap, openContext, readSliders, settle, setSlider, type RenderRecord, type ThemeName, type ViewportName } from '../physicsVisual/render'

const args = process.argv.slice(2)
const arg = (name: string, dflt?: string): string | undefined => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : dflt }
const flag = (name: string) => args.includes(`--${name}`)

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
    await page.goto(`${BASE}/dev/physics-audit?fixture=${encodeURIComponent(row.conceptId)}&fw=${cfg.frameW}&scope=lesson`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
    tl = lap('goto', tl)
    await page.waitForSelector('[data-audit-frame]', { timeout: 60_000 })
    const renderer = await page.getAttribute('[data-audit-renderer]', 'data-audit-renderer')
    rec.renderer = renderer
    if (renderer === 'scene') await page.waitForSelector('[data-scene-box] canvas', { timeout: 60_000 })
    await settle(page, renderer ?? 'none', renderer === 'scene' && row.textObjects > 0)
    await page.evaluate(() => document.fonts?.ready)
    // Let every CSS transition / animation finish (a theme or first-paint colour transition caught half way gave one-off contrast failures: the same figure
    // failed in one view of one run and passed in the next), then settle once more.
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))))
    await page.waitForTimeout(500)
    const shotsDir = resolve(outDir, 'shots')
    mkdirSync(shotsDir, { recursive: true })
    const first = await capture(page, pixPage, 'default', {}, resolve(shotsDir, `${tag}.png`))
    rec.provenance = first.measure.provenance
    rec.states.push(first)
    if (withStates && first.measure.sliders > 0) {
      const sliders = await readSliders(page)
      const plan: Array<{ name: string; set: Array<[number, number]> }> = []
      for (const s of sliders) { plan.push({ name: `${s.label}=min`, set: [[s.index, s.min]] }); plan.push({ name: `${s.label}=max`, set: [[s.index, s.max]] }) }
      plan.push({ name: 'all=min', set: sliders.map((s) => [s.index, s.min] as [number, number]) })
      plan.push({ name: 'all=max', set: sliders.map((s) => [s.index, s.max] as [number, number]) })
      let n = 0
      for (const step of plan) {
        for (const s of sliders) await setSlider(page, s.index, s.value)
        for (const [i, v] of step.set) await setSlider(page, i, v)
        await settle(page, 'scene', row.textObjects > 0)
        const params: Record<string, string> = {}
        for (const s of await readSliders(page)) params[s.label] = String(s.value)
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
  const outDir = resolve(arg('out', 'tmp/english-visual-audit')!)
  mkdirSync(resolve(outDir, 'results'), { recursive: true })
  const vps = arg('viewports', 'mobile,desktop,desktop-column')!.split(',') as ViewportName[]
  const themes = arg('themes', 'dark,light')!.split(',') as ThemeName[]
  const only = arg('concepts')?.split(',')
  const shard = arg('shard')
  const workers = Number(arg('workers', '3'))
  const stateThemes = arg('state-themes', 'dark')!.split(',')
  const skipDone = !flag('redo')
  let rows: InventoryRow[] = (JSON.parse(readFx('scripts/qa/englishVisual/fixtures.json', 'utf8')) as Fixture[]).map((f) => ({ conceptId: f.id, textObjects: 0, graphical: true as const }))
  if (only) rows = rows.filter((r) => only.includes(r.conceptId))
  if (shard) { const [i, n] = shard.split('/').map(Number); rows = rows.filter((_, idx) => idx % n === i) }
  const lightVps = arg('light-viewports', 'mobile')!.split(',')
  const tasks: Array<{ row: InventoryRow; vp: ViewportName; theme: ThemeName; file: string }> = []
  for (const row of rows) for (const vp of vps) for (const theme of themes) {
    if (theme === 'light' && !lightVps.includes(vp)) continue
    const file = resolve(outDir, 'results', `${row.conceptId}__${vp}__${theme}.json`)
    if (skipDone && existsSync(file)) continue
    tasks.push({ row, vp, theme, file })
  }
  const prio = (t: { vp: ViewportName; theme: ThemeName }) => (t.theme === 'dark' ? 0 : 10) + ['mobile', 'desktop', 'desktop-column'].indexOf(t.vp)
  tasks.sort((a, b) => prio(a) - prio(b))
  console.log(`tasks: ${tasks.length} (concepts ${rows.length}, viewports ${vps.join('/')}, themes ${themes.join('/')}), workers ${workers}`)
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
  let next = 0, done = 0, failed = 0
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
      if (done % 20 === 0 || !rec.ok) console.log(`[${done}/${tasks.length}] ${rec.conceptId} ${rec.viewport}/${rec.theme} ${rec.ok ? 'ok' : 'ERR ' + rec.error} (${(rec.elapsedMs / 1000).toFixed(1)}s, ${((Date.now() - t0) / 1000 / done).toFixed(1)}s avg)`)
    }
  }
  await Promise.all(Array.from({ length: workers }, worker))
  await browser.close()
  console.log(`done ${done}, render errors ${failed}, ${((Date.now() - t0) / 1000).toFixed(0)}s`)
}

main().catch((e) => { console.error(e); process.exit(1) })
