/**
 * ENGLISH VISUAL VALIDATION (verdicts for the envelope audit). Reads what renderAudit.ts measured and applies the SAME pure rules the other subjects use
 * (`figureAudit.ts` structure / readability / contrast / layout). There is deliberately NO semantic dimension: the fixtures are synthetic wording, not
 * authored figures, so nothing here claims the content is right — only that English-shaped process-flow text renders legibly at every viewport/theme.
 *
 *   npx tsx scripts/qa/englishVisual/validate.ts --in tmp/english-visual-audit [--out dir]
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { auditRenderedState, rollup, type Finding, type Verdict } from '../../../src/lib/teaching/visual/figureAudit'
import { fixtureFingerprints } from './fingerprint'
import { buildFixtures } from './buildFixtures'
import type { RenderRecord, ViewportName, ThemeName } from '../physicsVisual/render'

const args = process.argv.slice(2)
const arg = (n: string, d?: string) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d }
const inDir = resolve(arg('in', 'tmp/english-visual-audit')!)
const outDir = resolve(arg('out', inDir)!)

const records = new Map<string, RenderRecord[]>()
for (const f of readdirSync(resolve(inDir, 'results'))) {
  if (!f.endsWith('.json')) continue
  const r: RenderRecord = JSON.parse(readFileSync(resolve(inDir, 'results', f), 'utf8'))
  ;(records.get(r.conceptId) ?? records.set(r.conceptId, []).get(r.conceptId)!).push(r)
}
const wantedVps = arg('viewports', 'mobile,desktop,desktop-column')!.split(',') as ViewportName[]
const wantedThemes = arg('themes', 'dark,light')!.split(',') as ThemeName[]
const lightVps = arg('light-viewports', 'mobile')!.split(',')
const DIMS = ['structural', 'readability', 'contrast', 'layout'] as const

const rows = buildFixtures().map((fx) => {
  const recs = records.get(fx.id) ?? []
  const findings: Array<Finding & { viewport?: string; theme?: string }> = []
  const missing: string[] = []
  for (const vp of wantedVps) for (const th of wantedThemes) {
    if (th === 'light' && !lightVps.includes(vp)) continue
    if (!recs.find((r) => r.viewport === vp && r.theme === th)) missing.push(`${vp}/${th}`)
  }
  let states = 0
  for (const r of recs) {
    if (!r.ok) { findings.push({ id: 'RN-01', dimension: 'structural', severity: 'FAIL', message: `render failed: ${r.error}`, viewport: r.viewport, theme: r.theme }); continue }
    for (const st of r.states) { states++; for (const f of auditRenderedState(st, { expectsScene: false })) findings.push({ ...f, viewport: r.viewport, theme: r.theme }) }
  }
  const dims: Record<string, Verdict> = Object.fromEntries(DIMS.map((d) => [d, rollup(findings.filter((f) => f.dimension === d))]))
  const byViewport: Record<string, Verdict> = Object.fromEntries(wantedVps.map((vp) => [vp, rollup(findings.filter((f) => f.viewport === vp))]))
  return {
    id: fx.id, kind: fx.kind, verdict: rollup(findings), dims, byViewport, states, missing,
    fail: findings.filter((f) => f.severity === 'FAIL').length,
    review: [...new Set(findings.filter((f) => f.severity === 'REVIEW').map((f) => `${f.id}: ${f.message}`))].slice(0, 4),
    failures: [...new Set(findings.filter((f) => f.severity === 'FAIL').map((f) => `${f.id}: ${f.message}`))].slice(0, 4),
  }
})
const tally = (key: (r: (typeof rows)[number]) => string) => rows.reduce<Record<string, number>>((m, r) => { const k = key(r); m[k] = (m[k] ?? 0) + 1; return m }, {})
const { fingerprint, fingerprints } = fixtureFingerprints()
const summary = {
  fixtures: rows.length, verdicts: tally((r) => r.verdict),
  byViewport: Object.fromEntries(wantedVps.map((vp) => [vp, tally((r) => r.byViewport[vp])])),
  byDimension: Object.fromEntries(DIMS.map((d) => [d, tally((r) => r.dims[d])])),
  withMissingRenders: rows.filter((r) => r.missing.length).length,
  renders: rows.reduce((n, r) => n + r.states, 0),
}
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'audit-summary.json'), JSON.stringify({ generatedAt: new Date().toISOString(), renderScope: 'lesson' /* the real lesson page's token scope (.learnCandy), see renderAudit.ts */, fingerprint, fingerprints, viewports: wantedVps, themes: wantedThemes, summary, concepts: rows.map(({ failures: _f, ...r }) => r) }, null, 1))
writeFileSync(resolve(outDir, 'failures.json'), JSON.stringify(rows.filter((r) => r.fail).map((r) => ({ id: r.id, failures: r.failures })), null, 1))
console.log(JSON.stringify(summary, null, 2))
