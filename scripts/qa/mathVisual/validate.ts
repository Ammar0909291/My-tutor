/**
 * MATHEMATICS VISUAL VALIDATION (verdicts) — the Mathematics twin of scripts/qa/physicsVisual/validate.ts.
 *
 * Reads the measurements `renderAudit.ts` wrote, applies the pure rules in `src/lib/teaching/visual/figureAudit.ts` / `figureSemantics.ts`,
 * and rolls every learner-facing Mathematics figure up to PASS / FAIL / REVIEW_REQUIRED, with the failure clusters (rule × region) that decide
 * what to fix. Semantics: a scene figure is PASS only when a deterministic assertion covers it — a `mathCoreScenesBatch<N>.test.ts` that names
 * the concept or the scene id (those tests re-derive every number the figure states from its drawn coordinates) or an arithmetic chain the
 * checker evaluated; a card / domain-fallback figure has no such assertion and stays REVIEW_REQUIRED (the queued semantic review decides).
 *
 *   npx tsx scripts/qa/mathVisual/validate.ts --in <dir> [--out <dir>]
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { buildInventory, MATH_SUBJECT } from './inventory'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'
import { auditGraph, auditRenderedState, auditSceneData, rollup, type Finding, type Verdict } from '../../../src/lib/teaching/visual/figureAudit'
import { checkFigureTexts } from '../../../src/lib/teaching/visual/figureSemantics'
import { servedFingerprints } from './fingerprint'
import type { RenderRecord, ViewportName, ThemeName } from '../physicsVisual/render'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'
import type { InventoryRow } from '../physicsVisual/inventory'

const args = process.argv.slice(2)
const arg = (n: string, d?: string) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d }
const inDir = resolve(arg('in', 'tmp/math-visual-audit')!)
const outDir = resolve(arg('out', inDir)!)

/** Test files whose assertions are about the MATHEMATICS a Mathematics figure draws (each re-derives its numbers from the drawn coordinates). */
const MATH_ASSERTING = /^mathCoreScenesBatch\d+\.test\.ts$/

let testSources: Array<{ file: string; text: string }> | null = null
function mathEvidence(row: InventoryRow, sceneId: string | null): string[] {
  if (!testSources) testSources = readdirSync(resolve('src/tests')).filter((f) => MATH_ASSERTING.test(f)).map((file) => ({ file, text: readFileSync(resolve('src/tests', file), 'utf8') }))
  return testSources
    .filter(({ text }) => text.includes(`'${row.conceptId}'`) || text.includes(`"${row.conceptId}"`) || (sceneId !== null && (text.includes(`'${sceneId}'`) || text.includes(`"${sceneId}"`))))
    .map((t) => t.file)
}

export interface ConceptReport {
  conceptId: string; title: string; figureClass: string; authorship: string; scope: string | null; interactive: boolean; isGraph: boolean
  verdict: Verdict; byViewport: Record<string, Verdict>; dimensions: Record<string, Verdict>
  semantic: { verdict: Verdict; evidence: string[]; arithmeticChecked: number; contradictions: number }
  findings: Array<Finding & { viewport?: string; theme?: string; state?: string }>
  renderedStates: number; missingRenders: string[]
}

function dedupe(f: ConceptReport['findings']) {
  const seen = new Set<string>()
  return f.filter((x) => { const k = `${x.id}|${x.viewport}|${x.theme}|${x.state}|${x.message}`; if (seen.has(k)) return false; seen.add(k); return true })
}

function main(): void {
  const inv = buildInventory().filter((r) => r.graphical)
  const records = new Map<string, RenderRecord[]>()
  const resDir = resolve(inDir, 'results')
  for (const f of readdirSync(resDir)) {
    if (!f.endsWith('.json')) continue
    const r: RenderRecord = JSON.parse(readFileSync(resolve(resDir, f), 'utf8'))
    ;(records.get(r.conceptId) ?? records.set(r.conceptId, []).get(r.conceptId)!).push(r)
  }
  const wantedVps = arg('viewports', 'mobile,desktop,desktop-column')!.split(',') as ViewportName[]
  const wantedThemes = arg('themes', 'dark,light')!.split(',') as ThemeName[]
  const lightVps = arg('light-viewports', 'mobile')!.split(',')
  const reports: ConceptReport[] = []

  for (const row of inv) {
    const recs = records.get(row.conceptId) ?? []
    const findings: ConceptReport['findings'] = []
    const missing: string[] = []
    for (const vp of wantedVps) for (const th of wantedThemes) {
      if (th === 'light' && !lightVps.includes(vp)) continue
      if (!recs.find((r) => r.viewport === vp && r.theme === th)) missing.push(`${vp}/${th}`)
    }
    let renderedStates = 0
    for (const r of recs) {
      if (!r.ok) { findings.push({ id: 'RN-01', dimension: 'structural', severity: 'FAIL', message: `render failed: ${r.error}`, viewport: r.viewport, theme: r.theme }); continue }
      for (const st of r.states) {
        renderedStates++
        for (const f of auditRenderedState(st, { expectsScene: row.figureClass === 'scene' || Boolean(row.is3dCard) })) findings.push({ ...f, viewport: r.viewport, theme: r.theme, state: st.state })
      }
    }
    let sceneId: string | null = null
    let isGraph = false
    let texts: string[] = []
    if (row.figureClass === 'scene') {
      const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: row.conceptId, learnerRequest: 'diagram', subject: MATH_SUBJECT } as never)
      if (d.payload?.renderer === 'scene') {
        const spec: SceneSpec = d.payload.sceneSpec
        sceneId = spec.id
        for (const f of auditSceneData(spec)) findings.push(f)
        const g = auditGraph(spec)
        isGraph = g.isGraph
        for (const f of g.findings) findings.push(f)
        texts = spec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).filter(Boolean)
      }
    }
    const sem = checkFigureTexts(texts)
    const evidence = row.figureClass === 'scene' ? mathEvidence(row, sceneId) : []
    for (const c of sem.results.flatMap((r) => r.contradictions.map((c) => ({ r, c })))) findings.push({ id: 'SM-01', dimension: 'semantic', severity: 'FAIL', message: `"${c.r.text}": ${c.c.reason}`, evidence: { a: c.c.a, b: c.c.b } })
    let semVerdict: Verdict
    if (findings.some((f) => f.dimension === 'semantic' && f.severity === 'FAIL')) semVerdict = 'FAIL'
    else if (evidence.length > 0 || sem.checked > 0) semVerdict = 'PASS'
    else {
      semVerdict = 'REVIEW_REQUIRED'
      findings.push({ id: 'SM-02', dimension: 'semantic', severity: 'REVIEW', message: 'no deterministic mathematics assertion covers this figure (no arithmetic chain, no mathCoreScenesBatch test naming it)' })
    }
    const byViewport: Record<string, Verdict> = {}
    for (const vp of wantedVps) byViewport[vp] = rollup(findings.filter((f) => f.viewport === vp))
    const dims: Record<string, Verdict> = {}
    for (const dim of ['structural', 'readability', 'contrast', 'layout', 'graph', 'semantic', 'interactive'] as const) {
      dims[dim] = dim === 'semantic' ? semVerdict : dim === 'interactive' ? rollup(findings.filter((f) => f.state && f.state !== 'default')) : rollup(findings.filter((f) => f.dimension === dim))
    }
    const dedup = dedupe(findings)
    reports.push({
      conceptId: row.conceptId, title: row.title, figureClass: row.figureClass, authorship: row.authorship, scope: row.scope, interactive: row.interactive, isGraph,
      verdict: rollup(dedup), byViewport, dimensions: dims,
      semantic: { verdict: semVerdict, evidence, arithmeticChecked: sem.checked, contradictions: sem.contradictions },
      findings: dedup, renderedStates, missingRenders: missing,
    })
  }

  const tally = (key: (r: ConceptReport) => string) => reports.reduce<Record<string, number>>((m, r) => { const k = key(r); m[k] = (m[k] ?? 0) + 1; return m }, {})
  const clusters = new Map<string, { count: number; concepts: Set<string>; sample: string }>()
  for (const r of reports) for (const f of r.findings) {
    if (f.severity !== 'FAIL') continue
    const region = (f.evidence as { region?: string } | undefined)?.region ?? ''
    const k = `${f.id}${region ? ' [' + region + ']' : ''}`
    const c = clusters.get(k) ?? { count: 0, concepts: new Set(), sample: f.message }
    c.count++; c.concepts.add(r.conceptId)
    clusters.set(k, c)
  }
  const summary = {
    concepts: reports.length, verdicts: tally((r) => r.verdict),
    byViewport: Object.fromEntries(wantedVps.map((vp) => [vp, tally((r) => r.byViewport[vp])])),
    byDimension: Object.fromEntries(['structural', 'readability', 'contrast', 'layout', 'graph', 'semantic', 'interactive'].map((d) => [d, tally((r) => r.dimensions[d])])),
    withMissingRenders: reports.filter((r) => r.missingRenders.length).length,
    failureClusters: [...clusters.entries()].sort((a, b) => b[1].concepts.size - a[1].concepts.size).map(([k, v]) => ({ rule: k, findings: v.count, concepts: v.concepts.size, sample: v.sample })),
  }
  mkdirSync(outDir, { recursive: true })
  const { fingerprint, fingerprints } = servedFingerprints()
  const compact = {
    generatedAt: new Date().toISOString(), fingerprint, fingerprints, viewports: wantedVps, themes: wantedThemes,
    summary: { concepts: summary.concepts, verdicts: summary.verdicts, byViewport: summary.byViewport, byDimension: summary.byDimension, withMissingRenders: summary.withMissingRenders },
    concepts: reports.map((r) => ({
      id: r.conceptId, verdict: r.verdict, class: r.figureClass, authorship: r.authorship, scope: r.scope, interactive: r.interactive, graph: r.isGraph,
      dims: r.dimensions, byViewport: r.byViewport, semantic: r.semantic.verdict, states: r.renderedStates,
      fail: r.findings.filter((f) => f.severity === 'FAIL').length,
      review: [...new Set(r.findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id}: ${f.message}`))].slice(0, 4),
    })),
  }
  writeFileSync(resolve(outDir, 'audit-summary.json'), JSON.stringify(compact, null, 1))
  writeFileSync(resolve(outDir, 'verdicts.json'), JSON.stringify(reports, null, 1))
  writeFileSync(resolve(outDir, 'verdict-summary.json'), JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary, null, 2))
}

if (process.argv[1] && process.argv[1].endsWith('validate.ts')) main()
