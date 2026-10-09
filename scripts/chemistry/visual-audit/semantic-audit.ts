/**
 * CHEMISTRY SEMANTIC AUDIT — runs the pure validators in
 * `src/lib/teaching/visual/chemistryFigureAudit.pure.ts` over every chemistry visual it can enumerate.
 *
 *   npx tsx scripts/chemistry/visual-audit/semantic-audit.ts                      # enumerate directly
 *   npx tsx scripts/chemistry/visual-audit/semantic-audit.ts --manifest <file>    # also consume Worker A's chem-manifest.json
 *   npx tsx scripts/chemistry/visual-audit/semantic-audit.ts --out <file.json>    # write the full per-figure result
 *   npx tsx scripts/chemistry/visual-audit/semantic-audit.ts --verbose            # print every finding
 *   npx tsx scripts/chemistry/visual-audit/semantic-audit.ts --prose-corpus       # false-positive measurement on the seed prose
 *
 * SOURCES ENUMERATED (all offline: no DB, no network, no AI call):
 *   manifest   every entry of a chem-manifest.json (`--manifest`, or $SCRATCH/chem-manifest.json when it exists)
 *   registry   what `resolveVisual` returns for each of the 186 canonical chemistry concepts (scene / spec / card)
 *   authored   every `CONCEPT_SCENES` chem.* entry
 *   param      every choice of every chemistry parametric kind (molecule ×6, lattice ×3, electron_shells ×Z1–20,
 *              periodic_trends ×all ordered pairs the UI offers) at the control values a learner can reach
 *   sweep      generator parameter sweeps that exercise the chemistry generators beyond the shipped canon
 *              (system types, first-law sign combinations, cis/trans complexes, negative-EMF cells …)
 * Figures are de-duplicated by content hash; the first source to produce a figure names it.
 *
 * The script READS the live registry and generators and writes nothing unless `--out` is given.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, resolve } from 'node:path'

import { getKnowledgeGraph, getAllNodes } from '../../../src/lib/curriculum/knowledgeGraph'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '../../../src/lib/teaching/visual/conceptSceneParams'
import { PARAMETRIC_SCENES, rebuildScene, variablesFor } from '../../../src/lib/teaching/visual/parametricScenes'
import { buildSystemBoundaryScene, buildFirstLawScene } from '../../../src/lib/teaching/sceneGenerators/chemistrySystemScenes'
import { buildCoordinationComplexScene } from '../../../src/lib/teaching/sceneGenerators/coordinationComplex'
import { buildElectrochemicalCellScene } from '../../../src/lib/teaching/sceneGenerators/electrochemicalCell'
import { buildEnergyCycleScene } from '../../../src/lib/teaching/sceneGenerators/energyCycle'
import { buildStatisticsBarChartScene } from '../../../src/lib/teaching/sceneGenerators/statisticsBarChart.pure'
import { ELEMENTS as TREND_ELEMENTS } from '../../../src/lib/teaching/sceneGenerators/periodicTrends.pure'
import { lookupElement } from '../../../src/lib/teaching/sceneGenerators/electronShells.pure'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'
import {
  auditChemistryPayload, auditChemistryScene, auditManifestEntry, ELEMENTS_TABLE, placementOf,
  scanLearnerText, validateNotation, validateReactionSchemes, type AuditFinding, type FigureAuditResult, type TextItem,
} from '../../../src/lib/teaching/visual/chemistryFigureAudit.pure'

const argv = process.argv.slice(2)
const flag = (name: string): boolean => argv.includes(name)
const opt = (name: string): string | undefined => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined }

const SCRATCH = process.env.SCRATCH ?? '/tmp/claude-0/-home-user-My-tutor/09fa8e34-f76e-567c-8b55-32bfd558911b/scratchpad'

interface Instance {
  id: string
  source: 'manifest' | 'registry' | 'authored' | 'param' | 'sweep'
  conceptIds: string[]
  hash: string
  result: FigureAuditResult
}

const hashOf = (v: unknown): string => createHash('sha1').update(JSON.stringify(v)).digest('hex').slice(0, 12)

// ───────────────────────────────────────────────────────────────────────────
// Reference-data audit: the generators' own element tables against the table derived from Z.
// ───────────────────────────────────────────────────────────────────────────
function auditReferenceTables(): AuditFinding[] {
  const out: AuditFinding[] = []
  for (const e of TREND_ELEMENTS) {
    const real = ELEMENTS_TABLE.find((x) => x.symbol === e.symbol)
    const p = real ? placementOf(real.z) : null
    if (!real || !p) { out.push({ code: 'I-SYMBOL-Z-NAME', severity: 'FAIL', detail: `periodicTrends table has unknown symbol ${e.symbol}`, where: 'periodicTrends.pure.ts ELEMENTS' }); continue }
    if (real.name.replace('Aluminium', 'Aluminium') !== e.name && !(real.name === 'Sulfur' && e.name === 'Sulfur')) {
      out.push({ code: 'I-SYMBOL-Z-NAME', severity: 'FAIL', detail: `${e.symbol}: table name "${e.name}" vs "${real.name}"`, where: 'periodicTrends.pure.ts ELEMENTS' })
    }
    if (p.period !== e.period || p.group !== e.group) {
      out.push({ code: 'I-PLACEMENT', severity: 'FAIL', detail: `${e.symbol}: table says period ${e.period} group ${e.group}; Z=${real.z} is period ${p.period} group ${p.group}`, where: 'periodicTrends.pure.ts ELEMENTS' })
    }
  }
  // Monotonic trend sanity inside the table (radius falls / EN rises across a period; reverse down a group).
  const byPeriod = new Map<number, typeof TREND_ELEMENTS>()
  for (const e of TREND_ELEMENTS) byPeriod.set(e.period, [...(byPeriod.get(e.period) ?? []), e])
  for (const [period, els] of byPeriod) {
    const sorted = [...els].sort((a, b) => a.group - b.group)
    for (let i = 1; i < sorted.length; i++) {
      if (!(sorted[i].atomicRadiusPm < sorted[i - 1].atomicRadiusPm)) out.push({ code: 'I-TREND-CLAIM', severity: 'REVIEW', detail: `period ${period}: radius ${sorted[i - 1].symbol} ${sorted[i - 1].atomicRadiusPm} → ${sorted[i].symbol} ${sorted[i].atomicRadiusPm} does not fall`, where: 'periodicTrends.pure.ts ELEMENTS' })
      if (!(sorted[i].electronegativity > sorted[i - 1].electronegativity)) out.push({ code: 'I-TREND-CLAIM', severity: 'REVIEW', detail: `period ${period}: EN ${sorted[i - 1].symbol} ${sorted[i - 1].electronegativity} → ${sorted[i].symbol} ${sorted[i].electronegativity} does not rise`, where: 'periodicTrends.pure.ts ELEMENTS' })
    }
  }
  const byGroup = new Map<number, typeof TREND_ELEMENTS>()
  for (const e of TREND_ELEMENTS) byGroup.set(e.group, [...(byGroup.get(e.group) ?? []), e])
  for (const [group, els] of byGroup) {
    const sorted = [...els].sort((a, b) => a.period - b.period)
    for (let i = 1; i < sorted.length; i++) {
      if (!(sorted[i].atomicRadiusPm > sorted[i - 1].atomicRadiusPm)) out.push({ code: 'I-TREND-CLAIM', severity: 'REVIEW', detail: `group ${group}: radius ${sorted[i - 1].symbol} → ${sorted[i].symbol} does not grow`, where: 'periodicTrends.pure.ts ELEMENTS' })
      if (!(sorted[i].electronegativity < sorted[i - 1].electronegativity)) out.push({ code: 'I-TREND-CLAIM', severity: 'REVIEW', detail: `group ${group}: EN ${sorted[i - 1].symbol} ${sorted[i - 1].electronegativity} → ${sorted[i].symbol} ${sorted[i].electronegativity} does not fall`, where: 'periodicTrends.pure.ts ELEMENTS' })
    }
  }
  return out
}

// ───────────────────────────────────────────────────────────────────────────
// Enumeration
// ───────────────────────────────────────────────────────────────────────────
const seen = new Map<string, Instance>()

/** The learner-facing `effect` claims of the parametric kind a scene was built from (the figure must support them). */
function effectsOf(scene: unknown): string[] | undefined {
  const kind = (scene as { parametric?: { kind?: string } } | null)?.parametric?.kind
  return kind ? variablesFor(kind).map((v) => v.effect) : undefined
}

function add(source: Instance['source'], id: string, conceptIds: string[], scene: SceneSpec | null, ctxEffects?: string[]): void {
  if (!scene) return
  const hash = hashOf(scene)
  const prev = seen.get(hash)
  if (prev) { for (const c of conceptIds) if (!prev.conceptIds.includes(c)) prev.conceptIds.push(c); return }
  seen.set(hash, { id, source, conceptIds: [...conceptIds], hash, result: auditChemistryScene(scene, { conceptId: conceptIds[0], parametricEffects: ctxEffects ?? effectsOf(scene) }) })
}

function enumerate(): { manifestCount: number; nullBuilds: string[] } {
  const nullBuilds: string[] = []
  let manifestCount = 0

  // 1. manifest (Worker A) — preferred when present.
  const manifestPath = opt('--manifest') ?? (existsSync(join(SCRATCH, 'chem-manifest.json')) ? join(SCRATCH, 'chem-manifest.json') : undefined)
  if (manifestPath && existsSync(manifestPath)) {
    const m = JSON.parse(readFileSync(resolve(manifestPath), 'utf8')) as Array<{ instanceId: string; conceptIds?: string[]; payload?: { field?: string; value?: unknown } }>
    for (const e of m) {
      const hash = hashOf(e.payload?.value ?? e.instanceId)
      if (seen.has(hash)) continue
      seen.set(hash, { id: e.instanceId, source: 'manifest', conceptIds: e.conceptIds ?? [], hash, result: auditManifestEntry(e, { conceptId: e.conceptIds?.[0], parametricEffects: effectsOf(e.payload?.value) }) })
      manifestCount++
    }
  }

  // 2. authored concept scenes
  for (const id of CONCEPT_SCENE_OVERRIDES.filter((c) => c.startsWith('chem.'))) add('authored', `authored:${id}`, [id], buildCanonicalScene(null, id))

  // 3. registry-resolved (what a learner is actually handed), incl. kind defaults and cards
  const g = getKnowledgeGraph('chemistry')
  for (const n of g ? getAllNodes(g) : []) {
    const d = resolveVisual({ message: 'explain with a diagram', lessonConceptId: n.id, subject: 'chemistry', learnerRequest: 'diagram' } as never)
    const p = d.payload
    if (!p) continue
    if (p.renderer === 'scene') add('registry', `registry:${n.id}`, [n.id], p.sceneSpec)
    else {
      const key = p.renderer === 'card' ? `card:${p.visualType}` : `spec:${hashOf(p)}`
      const hash = hashOf(key)
      const prev = seen.get(hash)
      if (prev) { if (!prev.conceptIds.includes(n.id)) prev.conceptIds.push(n.id); continue }
      seen.set(hash, { id: `registry:${key}`, source: 'registry', conceptIds: [n.id], hash, result: auditChemistryPayload(p as never, { conceptId: n.id }) })
    }
  }

  // 4. parametric chemistry kinds: every choice a learner can reach
  const kindChoices = (kind: string, key: string): string[] => variablesFor(kind).filter((v) => v.key === key).flatMap((v) => (v.kind === 'choice' ? v.options.map((o) => o.value) : []))
  const effects = (kind: string): string[] => variablesFor(kind).map((v) => v.effect)
  for (const mol of kindChoices('molecule', 'molecule')) add('param', `param:molecule:${mol}`, [], rebuildScene('molecule', { molecule: mol }), effects('molecule'))
  for (const lat of kindChoices('lattice', 'lattice')) add('param', `param:lattice:${lat}`, [], rebuildScene('lattice', { lattice: lat }), effects('lattice'))
  const symbols = new Set<string>([...kindChoices('electron_shells', 'element'), ...ELEMENTS_TABLE.slice(0, 20).map((e) => e.symbol)])
  for (const sym of symbols) {
    if (!lookupElement(sym)) continue
    add('param', `param:electron_shells:${sym}`, [], rebuildScene('electron_shells', { element: sym }), effects('electron_shells'))
  }
  const offered = kindChoices('periodic_trends', 'element1Symbol')
  for (const a of offered) for (const b of offered) {
    if (a === b) continue
    const s = rebuildScene('periodic_trends', { element1Symbol: a, element2Symbol: b })
    if (!s) nullBuilds.push(`periodic_trends ${a} vs ${b}`)
    add('param', `param:periodic_trends:${a}-${b}`, [], s, effects('periodic_trends'))
  }
  void PARAMETRIC_SCENES

  // 5. generator sweeps
  for (const t of ['open', 'closed', 'isolated'] as const) add('sweep', `sweep:system:${t}`, [], buildSystemBoundaryScene(t))
  for (const [q, w] of [[100, -40], [-50, 20], [80, 30], [-60, -25], [10, -10]]) add('sweep', `sweep:first-law:${q},${w}`, [], buildFirstLawScene(q, w))
  add('sweep', 'sweep:coord:octahedral-homoleptic', [], buildCoordinationComplexScene({ name: 'Hexaaquairon(III) ion', centralMetal: 'Fe', charge: '3+', geometry: 'octahedral', ligands: [{ formula: 'H2O', count: 6 }], coordinationNumber: 6 }))
  add('sweep', 'sweep:coord:octahedral-cis', [], buildCoordinationComplexScene({ name: 'Tetraamminedichlorocobalt(III) ion', centralMetal: 'Co', charge: '1+', geometry: 'octahedral', ligands: [{ formula: 'NH3', count: 4 }, { formula: 'Cl', count: 2 }], isomer: 'cis', coordinationNumber: 6 }))
  add('sweep', 'sweep:coord:octahedral-trans', [], buildCoordinationComplexScene({ name: 'Tetraamminedichlorocobalt(III) ion', centralMetal: 'Co', charge: '1+', geometry: 'octahedral', ligands: [{ formula: 'NH3', count: 4 }, { formula: 'Cl', count: 2 }], isomer: 'trans', coordinationNumber: 6 }))
  add('sweep', 'sweep:coord:square-trans', [], buildCoordinationComplexScene({ name: 'Cisplatin', centralMetal: 'Pt', charge: '', geometry: 'square_planar', ligands: [{ formula: 'NH3', count: 2 }, { formula: 'Cl', count: 2 }], isomer: 'trans', coordinationNumber: 4 }))
  add('sweep', 'sweep:coord:square-homoleptic', [], buildCoordinationComplexScene({ name: 'Tetrachloroplatinate(II) ion', centralMetal: 'Pt', charge: '2-', geometry: 'square_planar', ligands: [{ formula: 'Cl', count: 4 }], coordinationNumber: 4 }))
  const cell = (cellType: 'galvanic' | 'electrolytic', a: Record<string, unknown>, c: Record<string, unknown>, extra: Record<string, unknown> = {}, name = 'Test cell'): SceneSpec =>
    buildElectrochemicalCellScene({ cellType, anode: a, cathode: c, electronsTransferred: 2, name, ...extra } as never)
  add('sweep', 'sweep:cell:negative-emf', [], cell('galvanic', { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 }, { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 }, {}, 'Reversed Daniell Cell'))
  add('sweep', 'sweep:cell:nernst-extreme', [], cell('galvanic', { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76, concentration: 1e-6 }, { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 5 }, {}, 'Extreme Nernst Cell'))
  add('sweep', 'sweep:cell:electrolytic-emf', [], cell('electrolytic', { material: 'Pt', ion: 'Cl-', standardPotential: 1.36 }, { material: 'Pt', ion: 'Na+', standardPotential: -2.71 }, { externalVoltage: 5 }, 'Aqueous NaCl Electrolysis'))
  add('sweep', 'sweep:energy:hess-3step', [], buildEnergyCycleScene({
    title: 'Hess test', startLabel: 'N2(g) + 2O2(g)', unit: 'kJ/mol',
    paths: [{ name: 'Direct', steps: [{ label: '2NO2(g)', delta: 66.4, deltaLabel: 'ΔH = +66.4 kJ/mol' }] },
      { name: 'Via NO', steps: [{ label: '2NO(g) + O2(g)', delta: 180.6, deltaLabel: 'ΔH1 = +180.6 kJ/mol' }, { label: '2NO2(g)', delta: -114.2, deltaLabel: 'ΔH2 = −114.2 kJ/mol' }] }],
  }))
  add('sweep', 'sweep:bar:counts', [], buildStatisticsBarChartScene({ chartTitle: 'Marks scored', bars: [{ label: '0-10', frequency: 2 }, { label: '10-20', frequency: 5 }] }))
  return { manifestCount, nullBuilds }
}

// ───────────────────────────────────────────────────────────────────────────
// Prose corpus: false-positive measurement of the notation/equation scanner
// ───────────────────────────────────────────────────────────────────────────
async function proseCorpus(): Promise<void> {
  const { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } = await import('../../../src/lib/teaching/assets/chemistrySeedAssets')
  const items: TextItem[] = []
  CHEMISTRY_EXPLANATIONS.forEach((e, i) => items.push({ text: e.content, where: `${e.conceptId}#expl${i}`, kind: 'narration' }))
  CHEMISTRY_PROBES.forEach((p, i) => {
    items.push({ text: p.stem, where: `${p.conceptId}#probe${i}.stem`, kind: 'narration' })
    ;(p.choices ?? []).forEach((c, j) => items.push({ text: c.text, where: `${p.conceptId}#probe${i}.choice${j}`, kind: 'label' }))
  })
  const counts = new Map<string, number>()
  const samples = new Map<string, AuditFinding[]>()
  const bump = (f: AuditFinding): void => {
    const k = `${f.severity} ${f.code}`
    counts.set(k, (counts.get(k) ?? 0) + 1)
    samples.set(k, [...(samples.get(k) ?? []), f])
  }
  let eqs = 0
  for (const it of items) {
    // Per-string, so one badly-written string cannot hide another.
    for (const f of validateNotation([it]).findings) bump(f)
    const r = validateReactionSchemes([it])
    eqs += r.equations
    for (const f of r.findings) bump(f)
    for (const f of scanLearnerText(it)) bump(f)
  }
  console.log(`\nPROSE CORPUS — ${items.length} strings (${CHEMISTRY_EXPLANATIONS.length} explanations, ${CHEMISTRY_PROBES.length} probes), ${eqs} equations recognised`)
  for (const [k, n] of [...counts.entries()].sort()) console.log(`  ${String(n).padStart(5)}  ${k}`)
  const limit = Number(opt('--samples') ?? 6)
  for (const [k, list] of samples) {
    if (k.startsWith('INFO')) continue
    console.log(`\n── ${k} (${list.length}) ──`)
    for (const f of list.slice(0, limit)) console.log(`   ${f.where}: ${f.detail}`)
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Report
// ───────────────────────────────────────────────────────────────────────────
function report(instances: Instance[], extra: { manifestCount: number; nullBuilds: string[] }, refFindings: AuditFinding[]): void {
  const verbose = flag('--verbose')
  const tally = (key: (i: Instance) => string): Map<string, number> => {
    const m = new Map<string, number>()
    for (const i of instances) m.set(key(i), (m.get(key(i)) ?? 0) + 1)
    return m
  }
  console.log(`\nCHEMISTRY SEMANTIC AUDIT — ${instances.length} unique visuals (${extra.manifestCount} from manifest)`)
  const v = tally((i) => i.result.verdict)
  console.log(`  verdicts: PASS ${v.get('PASS') ?? 0} · REVIEW_REQUIRED ${v.get('REVIEW_REQUIRED') ?? 0} · FAIL ${v.get('FAIL') ?? 0}`)
  console.log('\n  by source:')
  for (const [k, n] of [...tally((i) => i.source)]) console.log(`    ${k.padEnd(10)} ${n}`)
  console.log('\n  by family × verdict:')
  const fam = new Map<string, Record<string, number>>()
  for (const i of instances) {
    const r = fam.get(i.result.family) ?? { PASS: 0, REVIEW_REQUIRED: 0, FAIL: 0 }
    r[i.result.verdict]++
    fam.set(i.result.family, r)
  }
  for (const [f, r] of [...fam].sort()) console.log(`    ${f.padEnd(24)} PASS ${String(r.PASS).padStart(3)}  REVIEW ${String(r.REVIEW_REQUIRED).padStart(3)}  FAIL ${String(r.FAIL).padStart(3)}`)

  const codes = new Map<string, { sev: string; n: number; figs: Set<string> }>()
  for (const i of instances) for (const f of i.result.findings) {
    const k = `${f.severity} ${f.code}`
    const e = codes.get(k) ?? { sev: f.severity, n: 0, figs: new Set<string>() }
    e.n++; e.figs.add(i.hash)
    codes.set(k, e)
  }
  console.log('\n  findings by code (count / distinct figures):')
  for (const [k, e] of [...codes].sort((a, b) => (a[1].sev === b[1].sev ? b[1].n - a[1].n : a[1].sev.localeCompare(b[1].sev)))) console.log(`    ${k.padEnd(40)} ${String(e.n).padStart(5)} / ${e.figs.size}`)

  console.log('\n  FAIL details (one line per figure+finding):')
  for (const i of instances) for (const f of i.result.findings.filter((x) => x.severity === 'FAIL')) {
    console.log(`    [${i.source}] ${i.id} {${i.conceptIds.slice(0, 2).join(',')}${i.conceptIds.length > 2 ? '…' : ''}}  ${f.code} @ ${f.where}: ${f.detail}`)
  }
  if (verbose) {
    console.log('\n  REVIEW / INFO details:')
    for (const i of instances) for (const f of i.result.findings.filter((x) => x.severity !== 'FAIL')) console.log(`    [${i.source}] ${i.id}  ${f.severity} ${f.code} @ ${f.where}: ${f.detail}`)
    console.log('\n  per-figure verdicts:')
    for (const i of instances) console.log(`    ${i.result.verdict.padEnd(15)} ${i.result.family.padEnd(22)} ${i.id}  verified=${i.result.verified.length} unverified=${i.result.unverified.length}`)
  }
  console.log('\n  PASS figures (what was verified, by family):')
  const passByFam = new Map<string, Instance[]>()
  for (const i of instances.filter((x) => x.result.verdict === 'PASS')) passByFam.set(i.result.family, [...(passByFam.get(i.result.family) ?? []), i])
  for (const [f, list] of passByFam) console.log(`    ${f.padEnd(22)} ×${String(list.length).padStart(3)}  e.g. ${list[0].id}  verified: ${list[0].result.verified.join(', ')}`)
  console.log('\n  why figures are REVIEW_REQUIRED (unverified claim classes, by family):')
  const why = new Map<string, Map<string, number>>()
  for (const i of instances.filter((x) => x.result.verdict === 'REVIEW_REQUIRED')) {
    const m = why.get(i.result.family) ?? new Map<string, number>()
    for (const u of i.result.unverified) m.set(u, (m.get(u) ?? 0) + 1)
    for (const f of i.result.findings.filter((x) => x.severity === 'REVIEW')) m.set(`finding ${f.code}`, (m.get(`finding ${f.code}`) ?? 0) + 1)
    why.set(i.result.family, m)
  }
  for (const [f, m] of why) for (const [u, n] of m) console.log(`    ${f.padEnd(22)} ×${String(n).padStart(3)}  ${u.slice(0, 150)}`)

  if (extra.nullBuilds.length) {
    console.log(`\n  CONTROLS THAT BUILD NOTHING (parametric option offered to a learner, generator returns null): ${extra.nullBuilds.length}`)
    console.log('    ' + extra.nullBuilds.slice(0, 12).join('; ') + (extra.nullBuilds.length > 12 ? ' …' : ''))
  }
  if (refFindings.length) {
    console.log(`\n  REFERENCE-TABLE AUDIT: ${refFindings.length} finding(s)`)
    for (const f of refFindings) console.log(`    ${f.severity} ${f.code}: ${f.detail}`)
  } else console.log('\n  REFERENCE-TABLE AUDIT: periodicTrends.pure.ts table agrees with the placement derived from Z, and its radius / electronegativity series are monotone across periods and down groups.')
}

async function main(): Promise<void> {
  if (flag('--prose-corpus')) { await proseCorpus(); return }
  const extra = enumerate()
  const instances = [...seen.values()]
  const refFindings = auditReferenceTables()
  report(instances, extra, refFindings)
  const out = opt('--out')
  if (out) {
    writeFileSync(resolve(out), JSON.stringify({ summary: { total: instances.length }, instances: instances.map((i) => ({ id: i.id, source: i.source, conceptIds: i.conceptIds, hash: i.hash, ...i.result })), referenceTableFindings: refFindings, controlsThatBuildNothing: extra.nullBuilds }, null, 1))
    console.log(`\nwrote ${out}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
