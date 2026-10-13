/**
 * CHEMISTRY VISUAL AUDIT — the final, committed record.
 *
 *   npx tsx scripts/chemistry/visual-audit/final-audit.ts \
 *       --tier01 <dir>  --tier23 <dir>  [--base <audit-summary.json>] [--out docs/qa/chemistry-visual-audit]
 *
 *   --tier01 <dir>   the output of `inventory.ts --out` + `semantic-audit.ts --out <dir>/semantic.json` + `render-measure.mjs --out`
 *                    (chem-manifest.json, chem-concepts.json, semantic.json, render-results.json)
 *   --tier23 <dir>   the output of `tier23-resolve.ts --out` + `render-measure.mjs --out`
 *                    (tier23-manifest.json, tier23-resolution.json, render-results.json)
 *   --base <file>    a previous audit-summary.json: any instance this run did not render is carried over from it, UNLESS its
 *                    fingerprint changed (then it is re-rendered or the run fails). This is the partial re-audit.
 *
 * It writes two files into --out:
 *
 *   audit-summary.json   per CONCEPT (186): the R12 category, what the resolver serves for it and that figure's fingerprint, the instance
 *                        that draws it, and the verdict; per INSTANCE: fingerprint, origin, render counts per status, finding codes,
 *                        minimum font and contrast, the semantic-audit verdict. `src/tests/chemistryVisualAudit.test.ts` recomputes the
 *                        fingerprints from the resolver on every CI run and fails, naming the concepts, when the committed record is stale.
 *   render-states.json   the per-state manifest: one compact row per (instance x viewport x theme x control state).
 *
 * A machine PASS is never promoted past what a machine can decide: an instance whose semantic audit is REVIEW_REQUIRED stays
 * REVIEW_REQUIRED here, and the human answer lives in `semantic-review.json` (see `chemistrySemanticReview.test.ts`).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const arg = (n: string): string | undefined => { const i = process.argv.indexOf(`--${n}`); return i >= 0 ? process.argv[i + 1] : undefined }
const need = (n: string): string => { const v = arg(n); if (!v) { console.error(`missing --${n}`); process.exit(2) } return v }
const readJson = <T>(p: string): T => JSON.parse(readFileSync(p, 'utf8')) as T

interface RenderRow {
  instanceId: string; level: string | null; viewport: string; theme: string; state: string; order: number
  status: 'PASS' | 'REVIEW_REQUIRED' | 'FAIL'
  findings: Array<{ code: string; severity: string; detail?: string }>
  metrics?: { minFontPx?: number | null; contrastMin?: number | null; collisions?: number; clipped?: number; overflowX?: number; textCount?: number }
}
interface ManifestEntry { instanceId: string; conceptIds: string[]; tier: number; origin: string; reachability: string; interactive: boolean; fingerprint: string; kind?: string; rendererKind?: string }
interface SemanticInstance { id: string; verdict: 'PASS' | 'REVIEW_REQUIRED' | 'FAIL'; family?: string; findings?: Array<{ code: string; severity: string }> }
interface ConceptRow { conceptId: string; outcome: string; tier: number | null; origin: string; provenance: string | null; instanceId: string | null; fingerprint: string | null }
interface Tier23Concept { conceptId: string; category: string; snapshot: { hasCachedFigure: boolean; verdict: string | null; declined: boolean; tier2: boolean }; asked: { graphical: boolean; provenance: string | null; fingerprint: string | null }; shadowedCachedFigure: boolean }

type Verdict = 'PASS' | 'REVIEW_REQUIRED' | 'FAIL'
const RANK: Record<Verdict, number> = { PASS: 0, REVIEW_REQUIRED: 1, FAIL: 2 }
const worst = (a: Verdict, b: Verdict): Verdict => (RANK[a] >= RANK[b] ? a : b)

/** The R12 taxonomy. */
export const TAXONOMY = {
  A: 'intentionally no figure: the generator recorded a deliberate decline (no suitable form) and no faithful figure is authored',
  B: 'should have a figure and does not: no figure and no recorded decision, or the only figure was retired as wrong and has no replacement yet',
  C: 'a figure exists in the code or the production cache but the resolver cannot reach it (a curated tier shadows it)',
  D: 'generated and rejected: a Tier-3 figure exists but the critic, a gate or a retirement refuses it, so none is served',
  E: 'reachable and displayed: the resolver serves a figure (Tier 0/1 curated or authored, Tier 2 approved, Tier 3 generated)',
} as const

function main(): void {
  const t01 = resolve(need('tier01'))
  const t23 = resolve(need('tier23'))
  const outDir = resolve(arg('out') ?? 'docs/qa/chemistry-visual-audit')
  const base = arg('base') && existsSync(resolve(arg('base')!)) ? readJson<{ instances: InstanceOut[] }>(resolve(arg('base')!)) : null

  const manifest01 = readJson<ManifestEntry[]>(join(t01, 'chem-manifest.json'))
  const concepts01 = readJson<{ concepts: ConceptRow[] }>(join(t01, 'chem-concepts.json')).concepts
  const semantic = readJson<{ instances: SemanticInstance[] }>(join(t01, 'semantic.json')).instances
  const results01 = readJson<{ results: RenderRow[] }>(join(t01, 'render-results.json')).results
  const manifest23 = readJson<Array<ManifestEntry & { details?: { renderCount?: number } }>>(join(t23, 'tier23-manifest.json'))
  const resolution23 = readJson<{ concepts: Tier23Concept[] }>(join(t23, 'tier23-resolution.json')).concepts
  const results23 = existsSync(join(t23, 'render-results.json')) ? readJson<{ results: RenderRow[] }>(join(t23, 'render-results.json')).results : []

  const semanticById = new Map(semantic.map((s) => [s.id, s]))
  const rowsByInstance = new Map<string, RenderRow[]>()
  for (const r of [...results01, ...results23]) {
    const list = rowsByInstance.get(r.instanceId) ?? []
    list.push(r)
    rowsByInstance.set(r.instanceId, list)
  }

  const instances: InstanceOut[] = []
  const stateRows: Array<Record<string, unknown>> = []

  const addInstance = (m: ManifestEntry, tierLabel: string): void => {
    const rows = (rowsByInstance.get(m.instanceId) ?? []).slice().sort((a, b) => a.order - b.order)
    const carried = base?.instances.find((i) => i.id === m.instanceId && i.fingerprint === m.fingerprint)
    if (rows.length === 0 && carried) { instances.push(carried); return }
    const counts: Record<Verdict, number> = { PASS: 0, REVIEW_REQUIRED: 0, FAIL: 0 }
    const failCodes = new Set<string>()
    const reviewCodes = new Set<string>()
    let minFont: number | null = null
    let minContrast: number | null = null
    let renderVerdict: Verdict = 'PASS'
    for (const r of rows) {
      counts[r.status]++
      renderVerdict = worst(renderVerdict, r.status)
      for (const f of r.findings) {
        if (f.severity === 'fail') failCodes.add(f.code)
        else if (f.severity === 'review') reviewCodes.add(f.code)
      }
      const mf = r.metrics?.minFontPx, cm = r.metrics?.contrastMin
      if (typeof mf === 'number') minFont = minFont === null ? mf : Math.min(minFont, mf)
      if (typeof cm === 'number') minContrast = minContrast === null ? cm : Math.min(minContrast, cm)
      stateRows.push({
        i: m.instanceId, vp: r.viewport, th: r.theme, st: r.state, v: r.status,
        font: r.metrics?.minFontPx ?? null, contrast: r.metrics?.contrastMin ?? null,
        n: (r.metrics?.collisions ?? 0) + (r.metrics?.clipped ?? 0) + (r.metrics?.overflowX ?? 0),
        codes: [...new Set(r.findings.filter((f) => f.severity === 'fail' || f.severity === 'review').map((f) => f.code))],
      })
    }
    const sem = semanticById.get(m.instanceId)
    const semVerdict: Verdict = sem?.verdict ?? 'REVIEW_REQUIRED'
    const viewports = [...new Set(rows.map((r) => r.viewport))].sort()
    const themes = [...new Set(rows.map((r) => r.theme))].sort()
    instances.push({
      id: m.instanceId, tier: tierLabel, origin: m.origin, reachability: m.reachability, interactive: m.interactive,
      conceptIds: m.conceptIds, fingerprint: m.fingerprint,
      verdict: worst(renderVerdict, semVerdict), render: renderVerdict, semantic: semVerdict, semanticFamily: sem?.family ?? null,
      statesMeasured: rows.length, viewports, themes, counts, failCodes: [...failCodes].sort(), reviewCodes: [...reviewCodes].sort(),
      minFontPx: minFont, minContrast,
    })
  }

  for (const m of manifest01) addInstance(m, m.reachability === 'interactive-variant' ? 'variant' : `tier${m.tier}`)
  // Tier 2/3 figures have no entry in the semantic audit (it audits the in-repo payloads), so their semantic verdict is REVIEW_REQUIRED by
  // construction: a generated figure is never PASS on a machine's word, and the human answer is semantic-review.json.
  for (const m of manifest23) addInstance(m, `tier${m.tier}`)

  // ── concepts ────────────────────────────────────────────────────────────
  const instByTier23Concept = new Map<string, InstanceOut>()
  for (const i of instances) if (i.tier === 'tier2' || i.tier === 'tier3') for (const c of i.conceptIds) instByTier23Concept.set(c, i)
  const instById = new Map(instances.map((i) => [i.id, i]))

  const conceptsOut: ConceptOut[] = []
  for (const c of concepts01) {
    const t = resolution23.find((x) => x.conceptId === c.conceptId)!
    const base23 = { shadowedCachedFigure: t.shadowedCachedFigure }
    if (c.outcome === 'figure' && c.instanceId) {
      const inst = instById.get(c.instanceId)
      conceptsOut.push({ id: c.conceptId, category: 'E', source: `tier${c.tier}`, provenance: c.provenance, instanceId: c.instanceId, fingerprint: c.fingerprint, verdict: inst?.verdict ?? 'FAIL', ...base23 })
      continue
    }
    // not served by the synchronous tiers: Tier 2 / 3 / none
    if (t.asked.graphical && t.asked.fingerprint) {
      const inst = instByTier23Concept.get(c.conceptId)
      const tier = t.category.startsWith('E2') ? 'tier2' : 'tier3'
      conceptsOut.push({ id: c.conceptId, category: 'E', source: tier, provenance: t.asked.provenance, instanceId: inst?.id ?? null, fingerprint: t.asked.fingerprint, verdict: inst?.verdict ?? 'FAIL', ...base23 })
      continue
    }
    const cat = t.category.startsWith('A') ? 'A' : t.category.startsWith('D') ? 'D' : 'B'
    conceptsOut.push({
      id: c.conceptId, category: cat, source: 'none', provenance: t.asked.provenance, instanceId: null, fingerprint: null, verdict: 'NO_FIGURE',
      note: t.category.startsWith('X') ? 'retired: every figure on offer was judged wrong; no faithful replacement yet' : undefined, ...base23,
    })
  }

  const unreachable = resolution23.filter((x) => x.shadowedCachedFigure).map((x) => x.conceptId).sort()
  const summary = {
    concepts: conceptsOut.length,
    byCategory: conceptsOut.reduce<Record<string, number>>((m, c) => { m[c.category] = (m[c.category] ?? 0) + 1; return m }, {}),
    served: conceptsOut.filter((c) => c.category === 'E').length,
    bySource: conceptsOut.reduce<Record<string, number>>((m, c) => { m[c.source] = (m[c.source] ?? 0) + 1; return m }, {}),
    instances: instances.length,
    instanceVerdicts: instances.reduce<Record<string, number>>((m, i) => { m[i.verdict] = (m[i.verdict] ?? 0) + 1; return m }, {}),
    servedConceptVerdicts: conceptsOut.filter((c) => c.category === 'E').reduce<Record<string, number>>((m, c) => { m[c.verdict] = (m[c.verdict] ?? 0) + 1; return m }, {}),
    statesMeasured: instances.reduce((n, i) => n + i.statesMeasured, 0),
    categoryCUnreachableCachedFigures: unreachable.length,
    withMissingRenders: instances.filter((i) => i.statesMeasured === 0 || i.viewports.length < 2 || i.themes.length < 2).length,
  }
  const audit = {
    schema: 1,
    generatedOn: new Date().toISOString().slice(0, 10),
    about:
      'The committed result of the Chemistry visual closure audit: every concept classified A-E (taxonomy), every served figure instance rendered in Chromium at 390 and 1280 px in both themes ' +
      'across every control state, and the machine semantic verdict. A REVIEW_REQUIRED here means no deterministic assertion covers the chemistry; the human answer is semantic-review.json. ' +
      'src/tests/chemistryVisualAudit.test.ts recomputes every served fingerprint from the resolver and fails, naming the concepts, when this file is stale.',
    taxonomy: TAXONOMY,
    viewports: ['1280', '390'], themes: ['dark', 'light'],
    snapshot: 'docs/qa/chemistry-visual-audit/tier23-snapshot (production cache read 2026-10-09)',
    categoryCUnreachableCachedFigures: unreachable,
    summary, concepts: conceptsOut, instances,
  }

  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'audit-summary.json'), JSON.stringify(audit, null, 1) + '\n')
  writeFileSync(join(outDir, 'render-states.json'), JSON.stringify({ about: 'One row per rendered state: i=instance vp=viewport th=theme st=control state v=verdict font=min effective px contrast=min WCAG ratio n=collisions+clips+x-overflow codes=fail/review finding codes', rows: stateRows }) + '\n')
  console.log(JSON.stringify(summary, null, 2))
  console.log(`wrote audit-summary.json (${conceptsOut.length} concepts, ${instances.length} instances) and render-states.json (${stateRows.length} states) -> ${outDir}`)
}

interface InstanceOut {
  id: string; tier: string; origin: string; reachability: string; interactive: boolean; conceptIds: string[]; fingerprint: string
  verdict: Verdict; render: Verdict; semantic: Verdict; semanticFamily: string | null
  statesMeasured: number; viewports: string[]; themes: string[]; counts: Record<Verdict, number>
  failCodes: string[]; reviewCodes: string[]; minFontPx: number | null; minContrast: number | null
}
interface ConceptOut {
  id: string; category: string; source: string; provenance: string | null; instanceId: string | null; fingerprint: string | null
  verdict: Verdict | 'NO_FIGURE'; note?: string; shadowedCachedFigure: boolean
}

main()
