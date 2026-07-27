/**
 * C3 — importers.
 *
 * Masterplan C3 DoD: "1,734 concepts + 789 assets visible in CEKR with
 * provenance, zero writes to sources." Asserted against the REAL curriculum
 * files, because an importer that only works on fixtures has not been shown
 * to import anything.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { importKg, importAssets, coverage, formatCoverage, type KgGraph } from '@/lib/cekr/import'
import { validateCorpus } from '@/lib/cekr/validate'
import { isEdge, type CekrEdge, type CekrEnvelope, type CekrRecord } from '@/lib/cekr/types'
import { revisionHash } from '@/lib/cekr/canonical'

const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'english']

function loadAll() {
  const graphs = SUBJECTS.flatMap((s) => {
    const file = `docs/${s}/kg/graph.json`
    try { return [{ subject: s, file, graph: JSON.parse(readFileSync(file, 'utf8')) as KgGraph }] }
    catch { return [] }
  })
  const known = new Set<string>(graphs.flatMap(({ graph }) => graph.concepts.map((c) => c.id)))
  const records: CekrRecord[] = []
  const diagnostics: Array<{ code: string; id: string; detail: string }> = []
  for (const { file, graph } of graphs) {
    const r = importKg(graph, { file, knownConceptIds: known })
    records.push(...r.records); diagnostics.push(...r.diagnostics)
  }
  for (const s of SUBJECTS) {
    const file = `docs/${s}/teaching-assets/assets.json`
    try {
      const r = importAssets(JSON.parse(readFileSync(file, 'utf8')), { file, knownConceptIds: known })
      records.push(...r.records); diagnostics.push(...r.diagnostics)
    } catch { /* no assets for this subject */ }
  }
  return { graphs, known, records, diagnostics }
}

const split = (records: readonly CekrRecord[]) => ({
  entities: records.filter((r) => !isEdge(r)) as CekrEnvelope[],
  edges: records.filter(isEdge) as CekrEdge[],
})

// ── THE C3 DEFINITION OF DONE, ON REAL DATA ─────────────────────────────────

describe('C3 DoD — the real curriculum imports cleanly', () => {
  const { records, known } = loadAll()

  it('imports every concept in every subject', () => {
    const concepts = split(records).entities.filter((e) => e.kind === 'Concept')
    expect(concepts).toHaveLength(known.size)
    expect(concepts.length).toBeGreaterThanOrEqual(1734)      // masterplan floor
  })

  it('imports the teaching assets as Explanations', () => {
    const explanations = split(records).entities.filter((e) => e.kind === 'Explanation')
    expect(explanations.length).toBeGreaterThanOrEqual(789)   // masterplan floor
  })

  it('produces ZERO V-code findings over the whole corpus', () => {
    // 21k records through V-1…V-16. This is the real assertion: the importer
    // cannot emit CEKR that its own validator rejects.
    expect(validateCorpus(split(records))).toEqual([])
  })

  it('every record carries IMPORTED provenance and a citation (V-1)', () => {
    for (const r of records) {
      expect(r.provenance.authorType).toBe('IMPORTED')
      expect(r.citations.length).toBeGreaterThanOrEqual(1)
      expect(r.citations[0].file).toMatch(/^docs\//)
    }
  })

  it('nothing is imported as ACTIVE — imported content has had no review', () => {
    expect(records.every((r) => r.status === 'DRAFT')).toBe(true)
  })
})

// ── ZERO WRITES TO SOURCES ──────────────────────────────────────────────────

describe('zero writes to sources', () => {
  it('is a property of the signature, not a discipline', () => {
    // importKg/importAssets take PARSED JSON and return records. There is no
    // path, no handle, no fs import in the module — the guarantee cannot be
    // forgotten by a caller.
    const src = readFileSync('src/lib/cekr/import.ts', 'utf8')
    expect(src).not.toMatch(/from 'node:fs'|require\('fs'\)|writeFileSync/)
  })

  it('the source files are byte-identical after a full import', () => {
    const before = SUBJECTS.map((s) => {
      try { return readFileSync(`docs/${s}/kg/graph.json`, 'utf8') } catch { return '' }
    })
    loadAll()
    const after = SUBJECTS.map((s) => {
      try { return readFileSync(`docs/${s}/kg/graph.json`, 'utf8') } catch { return '' }
    })
    expect(after).toEqual(before)
  })
})

// ── PURITY / IDEMPOTENCE ────────────────────────────────────────────────────

describe('purity', () => {
  const graph: KgGraph = { concepts: [
    { id: 'a', name: 'A', requires: [] },
    { id: 'b', name: 'B', requires: ['a'] },
  ] }

  it('does not read the clock — two runs are byte-identical', () => {
    const one = importKg(graph, { file: 'g.json' }).records
    const two = importKg(graph, { file: 'g.json' }).records
    expect(JSON.stringify(one)).toBe(JSON.stringify(two))
    expect(one.map(revisionHash)).toEqual(two.map(revisionHash))
  })

  it('edge ids are derived from the triple, not a counter', () => {
    // A counter would make re-import churn the content-addressed store.
    const one = importKg(graph, { file: 'g.json' }).records.map((r) => r.id)
    const two = importKg({ concepts: [...graph.concepts].reverse() }, { file: 'g.json' })
      .records.map((r) => r.id)
    expect(new Set(one)).toEqual(new Set(two))
  })

  it('never mutates the input graph', () => {
    const snap = JSON.stringify(graph)
    importKg(graph, { file: 'g.json' })
    expect(JSON.stringify(graph)).toBe(snap)
  })
})

// ── FAITHFULNESS ────────────────────────────────────────────────────────────

describe('faithfulness — report, never repair', () => {
  it('carries KG fields into the body unchanged', () => {
    const { records } = importKg({ concepts: [{
      id: 'x', name: 'X', description: 'd', difficulty: 'foundational',
      bloom: 'remember', mastery_threshold: 0.75, estimated_hours: 2,
    }] }, { file: 'g.json' })
    const body = (records[0] as CekrEnvelope).body
    expect(body).toMatchObject({
      name: 'X', description: 'd', difficulty: 'foundational',
      bloom: 'remember', mastery_threshold: 0.75, estimated_hours: 2, kgId: 'x',
    })
  })

  it('derives UNLOCKS from REQUIRES (CEKR §3) so V-8 holds by construction', () => {
    const { records } = importKg({ concepts: [{ id: 'a' }, { id: 'b', requires: ['a'] }] }, { file: 'g.json' })
    const edges = records.filter(isEdge) as CekrEdge[]
    expect(edges.filter((e) => e.edgeKind === 'REQUIRES')).toHaveLength(1)
    expect(edges.filter((e) => e.edgeKind === 'UNLOCKS')).toHaveLength(1)
    expect(validateCorpus(split(records)).filter((f) => f.code === 'V-8')).toEqual([])
  })

  it('REPORTS an unlocks/requires asymmetry rather than silently fixing it', () => {
    const { diagnostics } = importKg({ concepts: [
      { id: 'a', unlocks: ['b'] },       // a claims to unlock b…
      { id: 'b', requires: [] },         // …but b does not require a
    ] }, { file: 'g.json' })
    expect(diagnostics.some((d) => d.code === 'I-ASYMMETRY')).toBe(true)
  })

  it('does NOT invent the V-16 attestation on the importer\'s behalf', () => {
    const { records } = importKg({ concepts: [{ id: 'a' }] }, { file: 'g.json' })
    expect((records[0] as CekrEnvelope).body.prereqsComplete).toBeUndefined()
  })

  it('diagnoses a duplicate concept id', () => {
    const { diagnostics, records } = importKg({ concepts: [{ id: 'a' }, { id: 'a' }] }, { file: 'g.json' })
    expect(diagnostics.some((d) => d.code === 'I-DUPLICATE')).toBe(true)
    expect(records.filter((r) => !isEdge(r))).toHaveLength(1)
  })

  it('diagnoses an orphan asset rather than importing a dangling explanation', () => {
    const { diagnostics, records } = importAssets(
      { assets: [{ id: 'x', concept_id: 'ghost' }] },
      { file: 'a.json', knownConceptIds: new Set(['real']) },
    )
    expect(diagnostics.some((d) => d.code === 'I-ORPHAN-ASSET')).toBe(true)
    expect(records).toEqual([])
  })
})

// ── CROSS-SUBJECT RESOLUTION ────────────────────────────────────────────────

describe('cross-subject links', () => {
  it('resolve when subjects are imported together, and are diagnosed when not', () => {
    const chem: KgGraph = { concepts: [{ id: 'chem.x', cross_links: ['phys.y'] }] }
    const alone = importKg(chem, { file: 'c.json' })
    expect(alone.diagnostics.some((d) => d.code === 'I-UNRESOLVED')).toBe(true)

    const together = importKg(chem, { file: 'c.json', knownConceptIds: new Set(['chem.x', 'phys.y']) })
    expect(together.diagnostics).toEqual([])
    expect((together.records.filter(isEdge) as CekrEdge[]).some((e) => e.edgeKind === 'CROSS_LINK')).toBe(true)
  })

  it('exactly two cross-links survive the full union — both previously recorded', () => {
    // Independent corroboration of an earlier audit (CLAUDE.md records "2
    // unresolvable KG cross-links: one aspirational placeholder, one genuine").
    // The importer reproduces that finding from the data alone.
    const { diagnostics } = loadAll()
    const unresolved = diagnostics.filter((d) => d.code === 'I-UNRESOLVED')
    expect(unresolved).toHaveLength(2)
    expect(unresolved.map((d) => d.id).sort()).toEqual([
      'chem.atomic.electromagnetic-radiation', 'math.de.ode',
    ])
  })
})

// ── COVERAGE DASHBOARD v1 ───────────────────────────────────────────────────

describe('coverage', () => {
  it('counts entities, edges and explanation coverage over the real corpus', () => {
    const c = coverage(loadAll().records)
    expect(c.entities + c.edges).toBe(c.totalRecords)
    expect(c.conceptsTotal).toBeGreaterThanOrEqual(1734)
    expect(c.explanationCoveragePct).toBeGreaterThan(90)
    expect(c.byStatus.DRAFT).toBe(c.totalRecords)
  })

  it('is empty-safe', () => {
    const c = coverage([])
    expect(c.totalRecords).toBe(0)
    expect(c.explanationCoveragePct).toBe(0)
  })

  it('formats a stable report', () => {
    const records = loadAll().records
    expect(formatCoverage(coverage(records))).toBe(formatCoverage(coverage(records)))
    expect(formatCoverage(coverage(records))).toMatch(/concepts \d+, with an explanation/)
  })
})
