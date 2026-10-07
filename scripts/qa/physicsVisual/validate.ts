/**
 * PHYSICS VISUAL VALIDATION (Phase 2/3 verdicts).
 *
 * Reads the measurements `render.ts` wrote, applies the pure rules in
 * `src/lib/teaching/visual/figureAudit.ts` / `figureSemantics.ts`, and rolls
 * every learner-facing physics figure up to PASS / FAIL / REVIEW_REQUIRED, with
 * the failure clusters (rule × region) that decide what to fix.
 *
 *   npx tsx scripts/qa/physicsVisual/validate.ts --in <dir> [--out <dir>] [--md]
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { buildInventory, type InventoryRow } from './inventory'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'
import { auditGraph, auditRenderedState, auditSceneData, rollup, type Finding, type Verdict } from '../../../src/lib/teaching/visual/figureAudit'
import { checkFigureTexts } from '../../../src/lib/teaching/visual/figureSemantics'
import { servedFingerprint } from './fingerprint'
import { CHECKED_KINDS, checkKind, type KindReport } from './kindChecks'
import type { RenderRecord, ViewportName, ThemeName } from './render'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'

const args = process.argv.slice(2)
const arg = (n: string, d?: string) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d }
const inDir = resolve(arg('in', 'tmp/physics-visual-audit')!)
const outDir = resolve(arg('out', inDir)!)

/** Test files whose assertions are about the PHYSICS a physics figure draws. */
const PHYSICS_ASSERTING = /^(physicsCoreScenesBatch\d+|physicsExtensionBatch\d+|physicsVisualPilot|physicsCoverageEnrichment|newtonSecondLawSimulation|pendulumPeriodSimulation|electricDipoleScene|parametricSceneInteraction)\.test\.ts$/

/** Per-kind parameter-domain sweep, run once. */
const kindReports = new Map<string, KindReport>()
function kindReport(kind: string): KindReport | null {
  if (!CHECKED_KINDS[kind]) return null
  if (!kindReports.has(kind)) kindReports.set(kind, checkKind(kind))
  return kindReports.get(kind)!
}

/** Time-stepped simulations are verified by their own deterministic suites. */
const SIMULATION_TESTS: Record<string, string> = {
  newton_second_law: 'newtonSecondLawSimulation.test.ts',
  pendulum_period: 'pendulumPeriodSimulation.test.ts',
}

function physicsEvidence(row: InventoryRow, sceneId: string | null): string[] {
  const dir = resolve('src/tests')
  const hits: string[] = []
  for (const f of readdirSync(dir)) {
    if (!PHYSICS_ASSERTING.test(f)) continue
    const t = readFileSync(resolve(dir, f), 'utf8')
    if (t.includes(`'${row.conceptId}'`) || t.includes(`"${row.conceptId}"`) || (sceneId && (t.includes(`'${sceneId}'`) || t.includes(`"${sceneId}"`)))) hits.push(f)
  }
  return hits
}

export interface ConceptReport {
  conceptId: string
  title: string
  figureClass: string
  authorship: string
  scope: string | null
  interactive: boolean
  isGraph: boolean
  verdict: Verdict
  byViewport: Record<string, Verdict>
  dimensions: Record<string, Verdict>
  semantic: { verdict: Verdict; evidence: string[]; arithmeticChecked: number; contradictions: number }
  findings: Array<Finding & { viewport?: string; theme?: string; state?: string }>
  renderedStates: number
  missingRenders: string[]
}

function dedupe(f: Array<Finding & { viewport?: string; theme?: string; state?: string }>) {
  const seen = new Set<string>()
  const out: typeof f = []
  for (const x of f) {
    const k = `${x.id}|${x.viewport}|${x.theme}|${x.state}|${x.message}`
    if (seen.has(k)) continue
    seen.add(k)
    out.push(x)
  }
  return out
}

function main(): void {
  const inv = buildInventory()
  const records = new Map<string, RenderRecord[]>()
  const resDir = resolve(inDir, 'results')
  for (const f of readdirSync(resDir)) {
    if (!f.endsWith('.json')) continue
    const r: RenderRecord = JSON.parse(readFileSync(resolve(resDir, f), 'utf8'))
    ;(records.get(r.conceptId) ?? records.set(r.conceptId, []).get(r.conceptId)!).push(r)
  }
  const reports: ConceptReport[] = []
  const wantedVps = (arg('viewports', 'mobile,desktop,desktop-column')!).split(',') as ViewportName[]
  const wantedThemes = (arg('themes', 'dark,light')!).split(',') as ThemeName[]
  const lightVps = (arg('light-viewports', 'mobile')!).split(',')

  for (const row of inv) {
    const recs = records.get(row.conceptId) ?? []
    const findings: ConceptReport['findings'] = []
    const missing: string[] = []
    for (const vp of wantedVps) for (const th of wantedThemes) {
      // The light theme is rendered where contrast is hardest (see render.ts --light-viewports).
      if (th === 'light' && !lightVps.includes(vp)) continue
      if (!recs.find((r) => r.viewport === vp && r.theme === th && !(r as { variant?: string }).variant)) missing.push(`${vp}/${th}`)
    }
    let renderedStates = 0
    for (const r of recs) {
      if (!r.ok) {
        findings.push({ id: 'RN-01', dimension: 'structural', severity: 'FAIL', message: `render failed: ${r.error}`, viewport: r.viewport, theme: r.theme })
        continue
      }
      for (const st of r.states) {
        renderedStates++
        const fs = auditRenderedState(st, { expectsScene: row.figureClass === 'scene' || Boolean(row.is3dCard) })
        for (const f of fs) findings.push({ ...f, viewport: r.viewport, theme: r.theme, state: st.state })
      }
    }

    // Data-level structure + semantics from the SceneSpec the resolver serves.
    let sceneId: string | null = null
    let isGraph = false
    let texts: string[] = []
    if (row.figureClass === 'scene') {
      const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: row.conceptId, learnerRequest: 'diagram', subject: 'physics' } as never)
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
    const evidence = physicsEvidence(row, sceneId)
    // The independent physics re-derivation, over the whole slider domain.
    const kr = row.parametricKind ? kindReport(row.parametricKind) : null
    if (kr) {
      if (kr.failures.length) {
        for (const f of kr.failures.slice(0, 3)) findings.push({ id: 'SM-03', dimension: 'semantic', severity: 'FAIL', message: `${kr.kind} at ${JSON.stringify(f.params)}: ${f.problems[0]}` })
      } else {
        evidence.push(`kindChecks:${kr.kind} (${kr.built} states re-derived, ${kr.refusedByValidator} refused by the generator's validator)`)
      }
    }
    if (row.parametricKind && SIMULATION_TESTS[row.parametricKind]) evidence.push(SIMULATION_TESTS[row.parametricKind])
    const contradictions = sem.results.flatMap((r) => r.contradictions.map((c) => ({ r, c })))
    for (const { r, c } of contradictions) {
      findings.push({ id: 'SM-01', dimension: 'semantic', severity: 'FAIL', message: `"${r.text}": ${c.reason}`, evidence: { a: c.a, b: c.b } })
    }
    const semFindings: Finding[] = findings.filter((f) => f.dimension === 'semantic')
    let semVerdict: Verdict
    if (semFindings.some((f) => f.severity === 'FAIL')) semVerdict = 'FAIL'
    else if (evidence.length > 0 || sem.checked > 0) semVerdict = 'PASS'
    else {
      semVerdict = 'REVIEW_REQUIRED'
      findings.push({ id: 'SM-02', dimension: 'semantic', severity: 'REVIEW', message: 'no deterministic physics assertion covers this figure (no arithmetic chain, no physics test)' })
    }

    const byViewport: Record<string, Verdict> = {}
    for (const vp of wantedVps) {
      byViewport[vp] = rollup(findings.filter((f) => f.viewport === vp))
    }
    const dims: Record<string, Verdict> = {}
    for (const dim of ['structural', 'readability', 'contrast', 'layout', 'graph', 'semantic', 'interactive'] as const) {
      const fs = findings.filter((f) => f.dimension === dim)
      dims[dim] = dim === 'semantic' ? semVerdict : rollup(fs)
    }
    const dedup = dedupe(findings)
    reports.push({
      conceptId: row.conceptId, title: row.title, figureClass: row.figureClass, authorship: row.authorship,
      scope: row.scope, interactive: row.interactive, isGraph,
      verdict: rollup(dedup), byViewport, dimensions: dims,
      semantic: { verdict: semVerdict, evidence, arithmeticChecked: sem.checked, contradictions: sem.contradictions },
      findings: dedup, renderedStates, missingRenders: missing,
    })
  }

  // ── summary ───────────────────────────────────────────────────────────────
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
    concepts: reports.length,
    verdicts: tally((r) => r.verdict),
    byViewport: Object.fromEntries(wantedVps.map((vp) => [vp, tally((r) => r.byViewport[vp])])),
    byDimension: Object.fromEntries(['structural', 'readability', 'contrast', 'layout', 'graph', 'semantic', 'interactive'].map((d) => [d, tally((r) => r.dimensions[d])])),
    withMissingRenders: reports.filter((r) => r.missingRenders.length).length,
    failureClusters: [...clusters.entries()].sort((a, b) => b[1].concepts.size - a[1].concepts.size).map(([k, v]) => ({ rule: k, findings: v.count, concepts: v.concepts.size, sample: v.sample })),
  }
  mkdirSync(outDir, { recursive: true })
  // The compact, committable record: one row per concept, enough to re-derive every
  // count in the report and to prove (by fingerprint) that it describes what ships.
  const { fingerprint } = servedFingerprint()
  const compact = {
    generatedAt: new Date().toISOString(),
    fingerprint,
    viewports: wantedVps, themes: wantedThemes,
    summary: { concepts: summary.concepts, verdicts: summary.verdicts, byViewport: summary.byViewport, byDimension: summary.byDimension, withMissingRenders: summary.withMissingRenders },
    concepts: reports.map((r) => ({
      id: r.conceptId, verdict: r.verdict, class: r.figureClass, authorship: r.authorship, scope: r.scope,
      interactive: r.interactive, graph: r.isGraph, dims: r.dimensions, byViewport: r.byViewport,
      semantic: r.semantic.verdict, states: r.renderedStates,
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
