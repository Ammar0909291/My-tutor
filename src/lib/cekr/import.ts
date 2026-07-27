/**
 * C3 — importers: Canonical KG and teaching assets → CEKR.
 *
 * ONE-WAY, READ-ONLY, BY CONSTRUCTION. These functions take already-parsed
 * JSON and return records. They open no file, hold no filesystem handle, and
 * have no write path — "zero writes to sources" is not a discipline the
 * caller has to remember, it is a property of the signature. The Curriculum
 * Production Pipeline remains the only authority over `docs/**` (project
 * standing rule), and CEKR §12's one-way-flow rule points the same way.
 *
 * PURE: `importedAt` is injected rather than read from the clock, so
 * re-running an import produces byte-identical records and the
 * content-addressed store treats it as a no-op. An importer that churned the
 * store on every run would make the revision chain meaningless.
 *
 * FAITHFUL: the KG's own field names and values are carried into the body
 * unchanged. Nothing is renamed, defaulted, enriched or "cleaned up" —
 * an importer that improves its input has silently forked the source of truth.
 * Divergences are REPORTED as diagnostics, never repaired.
 */
import { withRevision } from './canonical'
import { makeEntityId, type CekrEdge, type CekrEnvelope, type CekrRecord, type EdgeKind } from './types'

export interface ImportDiagnostic {
  code: 'I-UNRESOLVED' | 'I-ASYMMETRY' | 'I-ORPHAN-ASSET' | 'I-DUPLICATE'
  id: string
  detail: string
}

export interface ImportResult {
  records: CekrRecord[]
  diagnostics: ImportDiagnostic[]
}

export interface ImportOptions {
  /** Source path, recorded as the citation — every entity must be traceable
   *  back to the file it came from (V-1). */
  file: string
  /** Injected for purity. */
  importedAt?: string
  /** Concept ids visible ACROSS the whole import, not just this graph.
   *  Cross-subject cross_links (chemistry → physics) cannot resolve while
   *  importing one subject at a time; a caller importing every subject passes
   *  the union here so those edges are emitted instead of diagnosed. Omitted
   *  ⇒ this graph alone, which is the honest single-subject behaviour. */
  knownConceptIds?: ReadonlySet<string>
}

const EPOCH = '1970-01-01T00:00:00.000Z'

function envelope(opts: ImportOptions) {
  return {
    rev: '',
    schemaVersion: 1,
    status: 'DRAFT' as const,
    provenance: {
      authorType: 'IMPORTED' as const,
      authorRef: opts.file,
      createdAt: opts.importedAt ?? EPOCH,
    },
    citations: [{ file: opts.file }],
    tags: [] as string[],
  }
}

function edge(
  edgeKind: EdgeKind, from: string, to: string,
  attrs: Record<string, unknown>, opts: ImportOptions,
): CekrEdge {
  return withRevision({
    ...envelope(opts),
    // Deterministic id: derived from the triple, not a counter, so two runs
    // agree and re-import is idempotent.
    id: `cekr:Edge/${edgeKind.toLowerCase()}.${from.split('/').pop()}.${to.split('/').pop()}`,
    kind: 'Edge',
    edgeKind, from, to, attrs,
  } as CekrEdge)
}

// ── Canonical KG → Concepts + structural edges ─────────────────────────────

/** The canonical 10-field KG concept, as authored. */
export interface KgConcept {
  id: string
  name?: string
  description?: string
  requires?: string[]
  unlocks?: string[]
  cross_links?: string[]
  difficulty?: string
  bloom?: string
  mastery_threshold?: number
  estimated_hours?: number
  [k: string]: unknown
}

export interface KgGraph {
  name?: string
  version?: string
  concepts: KgConcept[]
  [k: string]: unknown
}

/**
 * Import one subject's graph.json.
 *
 * UNLOCKS is DERIVED from REQUIRES, per CEKR §3 ("derived inverse of
 * REQUIRES, stored materialized for authoring ergonomics; validator enforces
 * symmetry"). The KG's own `unlocks` array is not emitted directly — it is
 * COMPARED against the derived set, and any divergence is reported as
 * I-ASYMMETRY. That keeps V-8 structurally satisfied while still surfacing a
 * real curriculum defect rather than silently papering over it.
 */
export function importKg(graph: KgGraph, opts: ImportOptions): ImportResult {
  const records: CekrRecord[] = []
  const diagnostics: ImportDiagnostic[] = []
  const local = new Set(graph.concepts.map((c) => c.id))
  const known = opts.knownConceptIds ?? local
  const seen = new Set<string>()

  for (const c of graph.concepts) {
    if (seen.has(c.id)) {
      diagnostics.push({ code: 'I-DUPLICATE', id: c.id, detail: 'concept id appears more than once' })
      continue
    }
    seen.add(c.id)

    const { id: _id, requires, unlocks, cross_links, ...rest } = c
    records.push(withRevision({
      ...envelope(opts),
      id: makeEntityId('Concept', c.id),
      kind: 'Concept',
      body: {
        ...rest,
        kgId: c.id,
        // The closed-world attestation V-16 demands is NOT invented here: an
        // imported concept is DRAFT, and V-16 only binds ACTIVE concepts.
        // Claiming completeness on the importer's behalf would be a lie.
      },
    } as CekrEnvelope))

    for (const req of requires ?? []) {
      if (!known.has(req)) {
        diagnostics.push({ code: 'I-UNRESOLVED', id: c.id, detail: `requires '${req}', which is not in this graph` })
        continue
      }
      records.push(edge('REQUIRES', makeEntityId('Concept', c.id), makeEntityId('Concept', req), {}, opts))
      // The derived mirror (CEKR §3).
      records.push(edge('UNLOCKS', makeEntityId('Concept', req), makeEntityId('Concept', c.id), { derived: true }, opts))
    }

    for (const link of cross_links ?? []) {
      if (!known.has(link)) {
        // Cross-subject links are expected and are NOT defects — they resolve
        // when subjects are imported together. Reported so a single-subject
        // import is honest about what it could not resolve.
        diagnostics.push({ code: 'I-UNRESOLVED', id: c.id, detail: `cross_link '${link}' is outside this graph` })
        continue
      }
      records.push(edge('CROSS_LINK', makeEntityId('Concept', c.id), makeEntityId('Concept', link), {}, opts))
    }
  }

  // Report, never repair: does the KG's own `unlocks` agree with the mirror?
  const derived = new Set<string>()
  for (const c of graph.concepts) for (const r of c.requires ?? []) derived.add(`${r}|${c.id}`)
  for (const c of graph.concepts) {
    for (const u of c.unlocks ?? []) {
      if (!derived.has(`${c.id}|${u}`)) {
        diagnostics.push({
          code: 'I-ASYMMETRY', id: c.id,
          detail: `declares unlocks '${u}' but '${u}' does not declare it as a prerequisite`,
        })
      }
    }
  }

  return { records, diagnostics }
}

// ── Teaching assets → E/D-family entities ──────────────────────────────────

export interface TeachingAsset {
  id: string
  concept_id: string
  status?: string
  learning_objective?: string
  concept_summary?: string
  common_misconceptions?: unknown[]
  [k: string]: unknown
}

export interface AssetsFile { assets: TeachingAsset[]; [k: string]: unknown }

/**
 * Import one subject's teaching-assets file.
 *
 * Each asset becomes an `Explanation` (its summary + objective) plus one
 * `Misconception` per authored misconception, joined by edges. The mapping is
 * conservative on purpose: the pipeline's blueprint fields (worked-example,
 * practice, assessment) are carried into the Explanation body verbatim rather
 * than being split into WorkedExample/AssessmentItem entities, because doing
 * that split requires per-kind body schemas that do not exist yet (C1's stated
 * deferral). Carrying them losslessly keeps the door open; inventing a
 * structure for them now would not.
 */
export function importAssets(file: AssetsFile, opts: ImportOptions): ImportResult {
  const records: CekrRecord[] = []
  const diagnostics: ImportDiagnostic[] = []

  for (const a of file.assets ?? []) {
    if (opts.knownConceptIds && !opts.knownConceptIds.has(a.concept_id)) {
      diagnostics.push({ code: 'I-ORPHAN-ASSET', id: a.id, detail: `concept_id '${a.concept_id}' is not in the graph` })
      continue
    }
    const conceptRef = makeEntityId('Concept', a.concept_id)
    const { id: _id, concept_id: _c, common_misconceptions, ...rest } = a

    const explanationId = makeEntityId('Explanation', a.id)
    records.push(withRevision({
      ...envelope(opts),
      id: explanationId,
      kind: 'Explanation',
      body: { ...rest, sourceAssetId: a.id, conceptId: a.concept_id },
    } as CekrEnvelope))
    records.push(edge('EXPLAINS', explanationId, conceptRef, {}, opts))

    ;(common_misconceptions ?? []).forEach((m, i) => {
      const text = typeof m === 'string' ? m : JSON.stringify(m)
      const mid = makeEntityId('Misconception', `${a.concept_id}.m${i + 1}`)
      records.push(withRevision({
        ...envelope(opts),
        id: mid,
        kind: 'Misconception',
        body: { wrongClaim: text, sourceAssetId: a.id },
      } as CekrEnvelope))
      records.push(edge('TARGETS', mid, conceptRef, {}, opts))
    })
  }

  return { records, diagnostics }
}

// ── Coverage dashboard v1 ──────────────────────────────────────────────────

export interface Coverage {
  totalRecords: number
  entities: number
  edges: number
  byKind: Record<string, number>
  byEdgeKind: Record<string, number>
  byStatus: Record<string, number>
  /** Concepts that have at least one EXPLAINS edge pointing at them. */
  conceptsWithExplanation: number
  conceptsTotal: number
  /** The number the program actually cares about. */
  explanationCoveragePct: number
}

export function coverage(records: readonly CekrRecord[]): Coverage {
  const byKind: Record<string, number> = {}
  const byEdgeKind: Record<string, number> = {}
  const byStatus: Record<string, number> = {}
  const concepts = new Set<string>()
  const explained = new Set<string>()
  let entities = 0, edges = 0

  for (const r of records) {
    byStatus[r.status] = (byStatus[r.status] ?? 0) + 1
    if ((r as CekrEdge).kind === 'Edge') {
      edges++
      const e = r as CekrEdge
      byEdgeKind[e.edgeKind] = (byEdgeKind[e.edgeKind] ?? 0) + 1
      if (e.edgeKind === 'EXPLAINS') explained.add(e.to)
      continue
    }
    entities++
    const n = r as CekrEnvelope
    byKind[n.kind] = (byKind[n.kind] ?? 0) + 1
    if (n.kind === 'Concept') concepts.add(n.id)
  }

  const covered = [...explained].filter((id) => concepts.has(id)).length
  return {
    totalRecords: records.length,
    entities, edges, byKind, byEdgeKind, byStatus,
    conceptsWithExplanation: covered,
    conceptsTotal: concepts.size,
    explanationCoveragePct: concepts.size === 0 ? 0 : Math.round((covered / concepts.size) * 1000) / 10,
  }
}

export function formatCoverage(c: Coverage): string {
  const lines = [
    `records ${c.totalRecords}  (entities ${c.entities}, edges ${c.edges})`,
    `concepts ${c.conceptsTotal}, with an explanation ${c.conceptsWithExplanation} (${c.explanationCoveragePct}%)`,
    'by kind:      ' + Object.entries(c.byKind).sort().map(([k, n]) => `${k}=${n}`).join(' '),
    'by edge kind: ' + Object.entries(c.byEdgeKind).sort().map(([k, n]) => `${k}=${n}`).join(' '),
    'by status:    ' + Object.entries(c.byStatus).sort().map(([k, n]) => `${k}=${n}`).join(' '),
  ]
  return lines.join('\n')
}
