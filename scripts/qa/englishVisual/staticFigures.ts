/**
 * ENGLISH STATIC-FIGURE AUDIT — render + verdicts for the English concepts that serve a figure of their own (2026-10-18).
 *
 * The envelope audit (renderAudit.ts / validate.ts) feeds the real renderer synthetic specs because English serves no static figure. A concept
 * that DOES serve one is audited like a Mathematics figure: the real resolver (subject 'english') + the real renderer on
 * /dev/physics-audit?concept=…&subject=english&scope=lesson at 390 px (dark + light), 1280 px and the 50/50 column (dark), the shared DOM / pixel
 * measurements, then the shared pure rules (`figureAudit.ts`, `figureSemantics.ts`). Semantics: PASS only when a deterministic assertion covers the
 * figure (a `englishStaticFigureContent.test.ts` that names the concept) or an arithmetic chain the checker evaluated.
 *
 *   npx next dev -p 3000     # load one page first: a cold server renders an unstyled page
 *   npx tsx scripts/qa/englishVisual/staticFigures.ts [--out tmp/english-static] [--concepts a,b] [--workers 2] [--base http://localhost:3000]
 *
 * Writes <out>/audit-summary.json; copy it to docs/qa/english-visual-audit/static-figures.json and commit.
 */
import { chromium, type Browser } from 'playwright'
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { servedEnglish, servedStaticFigureIds, staticFigureFingerprints } from './staticFingerprint'
import { auditGraph, auditRenderedState, auditSceneData, rollup, type Finding, type Verdict } from '../../../src/lib/teaching/visual/figureAudit'
import { checkFigureTexts } from '../../../src/lib/teaching/visual/figureSemantics'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'
import { BASE, CHROMIUM_ARGS, VIEWPORT_CONFIG, capture, lap, openContext, settle, type RenderRecord, type ThemeName, type ViewportName } from '../physicsVisual/render'

const args = process.argv.slice(2)
const arg = (name: string, dflt?: string): string | undefined => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : dflt }

const VIEWPORTS: ViewportName[] = ['mobile', 'desktop', 'desktop-column']
const THEMES: ThemeName[] = ['dark', 'light']
const LIGHT_VIEWPORTS = ['mobile']
const ASSERTING = /^englishStaticFigureContent\.test\.ts$/

async function renderOne(browser: Browser, conceptId: string, textObjects: number, vp: ViewportName, theme: ThemeName, outDir: string): Promise<RenderRecord> {
  const t0 = Date.now()
  const cfg = VIEWPORT_CONFIG[vp]
  const ctx = await openContext(browser, vp, theme)
  const page = await ctx.newPage()
  const pixPage = await ctx.newPage()
  await pixPage.goto('about:blank')
  const rec: RenderRecord = { conceptId, viewport: vp, theme, ok: false, renderer: null, provenance: null, elapsedMs: 0, states: [] }
  try {
    let tl = Date.now()
    await page.goto(`${BASE}/dev/physics-audit?concept=${encodeURIComponent(conceptId)}&fw=${cfg.frameW}&subject=english&scope=lesson`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
    tl = lap('goto', tl)
    await page.waitForSelector('[data-audit-frame]', { timeout: 60_000 })
    const renderer = await page.getAttribute('[data-audit-renderer]', 'data-audit-renderer')
    rec.renderer = renderer
    if (renderer === 'scene') await page.waitForSelector('[data-scene-box] canvas', { timeout: 60_000 })
    await settle(page, renderer ?? 'none', renderer === 'scene' && textObjects > 0)
    await page.evaluate(() => document.fonts?.ready)
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))))
    await page.waitForTimeout(500)
    const shotsDir = resolve(outDir, 'shots')
    mkdirSync(shotsDir, { recursive: true })
    const first = await capture(page, pixPage, 'default', {}, resolve(shotsDir, `${conceptId}__${vp}__${theme}.png`))
    rec.provenance = first.measure.provenance
    rec.states.push(first)
    rec.ok = true
  } catch (e) {
    rec.error = (e as Error).message.slice(0, 400)
  } finally {
    rec.elapsedMs = Date.now() - t0
    await ctx.close().catch(() => {})
  }
  return rec
}

function verdictFor(conceptId: string, records: RenderRecord[]) {
  const d = servedEnglish(conceptId)
  const findings: Array<Finding & { viewport?: string; theme?: string; state?: string }> = []
  const missing: string[] = []
  for (const vp of VIEWPORTS) for (const th of THEMES) {
    if (th === 'light' && !LIGHT_VIEWPORTS.includes(vp)) continue
    if (!records.find((r) => r.viewport === vp && r.theme === th)) missing.push(`${vp}/${th}`)
  }
  let states = 0
  const scene: SceneSpec | null = d.payload?.renderer === 'scene' ? d.payload.sceneSpec : null
  for (const r of records) {
    if (!r.ok) { findings.push({ id: 'RN-01', dimension: 'structural', severity: 'FAIL', message: `render failed: ${r.error}`, viewport: r.viewport, theme: r.theme }); continue }
    for (const st of r.states) { states++; for (const f of auditRenderedState(st, { expectsScene: scene !== null })) findings.push({ ...f, viewport: r.viewport, theme: r.theme, state: st.state }) }
  }
  let isGraph = false
  let texts: string[] = []
  if (scene) {
    for (const f of auditSceneData(scene)) findings.push(f)
    const g = auditGraph(scene)
    isGraph = g.isGraph
    for (const f of g.findings) findings.push(f)
    texts = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).filter(Boolean)
  }
  const sem = checkFigureTexts(texts)
  const evidence = readdirSync(resolve('src/tests')).filter((f) => ASSERTING.test(f)).filter((f) => {
    const text = readFileSync(resolve('src/tests', f), 'utf8')
    return text.includes(`'${conceptId}'`) || (scene !== null && text.includes(`'${scene.id}'`))
  })
  for (const c of sem.results.flatMap((r) => r.contradictions.map((c) => ({ r, c })))) findings.push({ id: 'SM-01', dimension: 'semantic', severity: 'FAIL', message: `"${c.r.text}": ${c.c.reason}`, evidence: { a: c.c.a, b: c.c.b } })
  let semantic: Verdict
  if (findings.some((f) => f.dimension === 'semantic' && f.severity === 'FAIL')) semantic = 'FAIL'
  else if (evidence.length > 0 || sem.checked > 0) semantic = 'PASS'
  else { semantic = 'REVIEW_REQUIRED'; findings.push({ id: 'SM-02', dimension: 'semantic', severity: 'REVIEW', message: 'no deterministic assertion covers this figure (no englishStaticFigureContent test names it)' }) }
  const byViewport = Object.fromEntries(VIEWPORTS.map((vp) => [vp, rollup(findings.filter((f) => f.viewport === vp))])) as Record<string, Verdict>
  const dims: Record<string, Verdict> = {}
  for (const dim of ['structural', 'readability', 'contrast', 'layout', 'graph', 'semantic'] as const) dims[dim] = dim === 'semantic' ? semantic : rollup(findings.filter((f) => f.dimension === dim))
  return {
    id: conceptId, verdict: rollup(findings), class: d.payload?.renderer ?? 'none', authorship: d.asset?.provenance ?? 'none', scope: d.asset?.scope ?? null, graph: isGraph,
    dims, byViewport, semantic, evidence, states, missing,
    fail: findings.filter((f) => f.severity === 'FAIL').length,
    review: [...new Set(findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id}: ${f.message}`))].slice(0, 4),
    failures: [...new Set(findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id}: ${f.message}`))].slice(0, 4),
  }
}

async function main(): Promise<void> {
  const outDir = resolve(arg('out', 'tmp/english-static')!)
  mkdirSync(resolve(outDir, 'results'), { recursive: true })
  const only = arg('concepts')?.split(',')
  const workers = Number(arg('workers', '2'))
  const ids = servedStaticFigureIds().filter((id) => !only || only.includes(id))
  const tasks: Array<{ id: string; textObjects: number; vp: ViewportName; theme: ThemeName }> = []
  for (const id of ids) {
    const d = servedEnglish(id)
    const textObjects = d.payload?.renderer === 'scene' ? d.payload.sceneSpec.steps.reduce((n, s) => n + s.objects.filter((o) => typeof o.text === 'string' && o.text.trim() !== '').length, 0) : 0
    for (const vp of VIEWPORTS) for (const theme of THEMES) { if (theme === 'light' && !LIGHT_VIEWPORTS.includes(vp)) continue; tasks.push({ id, textObjects, vp, theme }) }
  }
  console.log(`English static figures: ${ids.join(', ') || 'none'}; ${tasks.length} renders, workers ${workers}`)
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
  const records = new Map<string, RenderRecord[]>()
  let next = 0
  async function worker(): Promise<void> {
    while (true) {
      const i = next++
      if (i >= tasks.length) return
      const t = tasks[i]
      const rec = await renderOne(browser, t.id, t.textObjects, t.vp, t.theme, outDir)
      writeFileSync(resolve(outDir, 'results', `${t.id}__${t.vp}__${t.theme}.json`), JSON.stringify(rec))
      ;(records.get(t.id) ?? records.set(t.id, []).get(t.id)!).push(rec)
      if (!rec.ok) console.log(`ERR ${t.id} ${t.vp}/${t.theme}: ${rec.error}`)
    }
  }
  await Promise.all(Array.from({ length: workers }, worker))
  await browser.close()
  const concepts = ids.map((id) => verdictFor(id, records.get(id) ?? []))
  const tally = concepts.reduce<Record<string, number>>((m, c) => { m[c.verdict] = (m[c.verdict] ?? 0) + 1; return m }, {})
  const { fingerprint, fingerprints } = staticFigureFingerprints()
  const out = {
    generatedAt: new Date().toISOString(), renderScope: 'lesson', fingerprint, fingerprints, viewports: VIEWPORTS, themes: THEMES,
    summary: { concepts: concepts.length, verdicts: tally, withMissingRenders: concepts.filter((c) => c.missing.length).length },
    concepts,
  }
  writeFileSync(resolve(outDir, 'audit-summary.json'), JSON.stringify(out, null, 1))
  console.log(JSON.stringify(out.summary))
  for (const c of concepts) console.log(c.id, c.verdict, JSON.stringify(c.byViewport), c.review.join(' | '), c.failures.join(' | '))
}

main().catch((e) => { console.error(e); process.exit(1) })
