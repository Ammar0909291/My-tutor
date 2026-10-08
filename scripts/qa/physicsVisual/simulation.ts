/**
 * SIMULATION STATE AUDIT (Phase 2H — interactive visuals).
 *
 * The two time-stepped simulations (ADR 16: Newton's second law, the simple
 * pendulum) change what is drawn with TIME, so a default-state render proves
 * little. This drives each one through its real controls and measures every
 * state with the same pipeline as render.ts:
 *
 *   frame 0 → predicted → running → paused → stepped → reset → finished →
 *   second fair run (runs table + interpretation panel, the widest layout)
 *
 * Learning logic is not changed or bypassed: it only clicks the buttons a
 * learner clicks. Records are written as `<concept>__<vp>__<theme>__sim.json`
 * with `variant: 'sim'` so validate.ts folds them into the same verdicts.
 *
 *   npx tsx scripts/qa/physicsVisual/simulation.ts --out <dir> [--base http://localhost:3001]
 */
import { chromium, type Page } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  BASE, CHROMIUM_ARGS, VIEWPORT_CONFIG, capture, openContext, readSliders, setSlider, settle,
  type RenderRecord, type StateRecord, type ThemeName, type ViewportName,
} from './render'

const args = process.argv.slice(2)
const arg = (n: string, d?: string) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d }

export const SIMULATIONS = ['phys.mech.newtons-second-law', 'phys.wave.pendulum'] as const

async function click(page: Page, name: string | RegExp): Promise<boolean> {
  const b = page.getByRole('button', { name }).first()
  if (!(await b.count()) || (await b.isDisabled())) return false
  await b.click({ timeout: 5000 })
  return true
}

async function phase(page: Page): Promise<string | null> {
  return page.getAttribute('[data-testid="simulation"]', 'data-phase').catch(() => null)
}

async function untilPhase(page: Page, want: string, ms: number): Promise<boolean> {
  const t0 = Date.now()
  while (Date.now() - t0 < ms) {
    if ((await phase(page)) === want) return true
    await page.waitForTimeout(250)
  }
  return false
}

export async function runSimulation(conceptId: string, vp: ViewportName, theme: ThemeName, outDir: string): Promise<RenderRecord & { variant: 'sim' }> {
  const t0 = Date.now()
  const browser = await chromium.launch({
    executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
    args: CHROMIUM_ARGS,
  })
  const ctx = await openContext(browser, vp, theme)
  const page = await ctx.newPage()
  const pix = await ctx.newPage()
  await pix.goto('about:blank')
  const rec: RenderRecord & { variant: 'sim' } = { conceptId, viewport: vp, theme, ok: false, renderer: 'scene', provenance: null, elapsedMs: 0, states: [], variant: 'sim' }
  const shots = resolve(outDir, 'shots')
  mkdirSync(shots, { recursive: true })
  const tag = `${conceptId}__${vp}__${theme}__sim`
  let n = 0
  const grab = async (state: string): Promise<StateRecord> => {
    await settle(page, 'scene', true)
    const st = await capture(page, pix, state, {}, resolve(shots, `${tag}__${n++}.png`))
    rec.states.push(st)
    return st
  }
  try {
    await page.goto(`${BASE}/dev/physics-audit?concept=${encodeURIComponent(conceptId)}&fw=${VIEWPORT_CONFIG[vp].frameW}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
    await page.waitForSelector('[data-scene-box] canvas', { timeout: 60_000 })
    await page.waitForSelector('[data-testid="simulation"]', { timeout: 30_000 })
    await settle(page, 'scene', true)
    rec.provenance = (await page.getAttribute('[data-audit-provenance]', 'data-audit-provenance')) ?? null

    await grab('frame 0 (idle)')

    // A prediction, as a learner would make one.
    const pred = page.getByTestId('prediction').getByRole('button').first()
    if (await pred.count()) { await pred.click(); await grab('prediction made') }

    // Run → mid-run frame → pause → step → reset.
    if (await click(page, 'Run')) {
      await page.waitForTimeout(1500)
      await grab('running')
      if (await click(page, 'Pause')) await grab('paused')
      if (await click(page, /^Step/)) { await click(page, /^Step/); await grab('stepped x2') }
      if (await click(page, 'Reset')) await grab('reset')
    }

    // Run 1 to the end (default values).
    if (await click(page, 'Run')) {
      await untilPhase(page, 'finished', 40_000)
      await grab('finished (run 1)')
    }
    // Run 2 with ONE value changed (a fair test) — brings up the runs table and
    // the interpretation panel, the widest layout this figure has.
    await click(page, 'Reset')
    const sl = await readSliders(page)
    if (sl.length) {
      const target = sl[sl.length > 1 ? 1 : 0]
      await setSlider(page, target.index, Math.min(target.max, Math.max(target.min, target.value * 2)))
      await settle(page, 'scene', true)
      if (await click(page, 'Run')) {
        await untilPhase(page, 'finished', 40_000)
        await grab('finished (run 2, one value doubled)')
      }
      // Extremes at rest.
      await click(page, 'Reset')
      for (const [name, v] of [['min', target.min], ['max', target.max]] as const) {
        await setSlider(page, target.index, v)
        await grab(`${target.label}=${name} (idle)`)
      }
    }
    rec.ok = true
  } catch (e) {
    rec.error = (e as Error).message.slice(0, 400)
  } finally {
    rec.elapsedMs = Date.now() - t0
    await browser.close().catch(() => {})
  }
  return rec
}

async function main(): Promise<void> {
  const outDir = resolve(arg('out', 'tmp/physics-visual-audit')!)
  mkdirSync(resolve(outDir, 'results'), { recursive: true })
  const vps = (arg('viewports', 'mobile,desktop,desktop-column')!).split(',') as ViewportName[]
  const themes = (arg('themes', 'dark,light')!).split(',') as ThemeName[]
  for (const c of SIMULATIONS) for (const vp of vps) for (const th of themes) {
    const rec = await runSimulation(c, vp, th, outDir)
    writeFileSync(resolve(outDir, 'results', `${c}__${vp}__${th}__sim.json`), JSON.stringify(rec))
    console.log(`${c} ${vp}/${th} ${rec.ok ? 'ok' : 'ERR ' + rec.error} states=${rec.states.length} ${(rec.elapsedMs / 1000).toFixed(0)}s`)
  }
}

if (process.argv[1] && process.argv[1].endsWith('simulation.ts')) {
  main().catch((e) => { console.error(e); process.exit(1) })
}
