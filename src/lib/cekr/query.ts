/**
 * C5 — the Brain language service core (SDK-M3 references, SDK-M4 lenses).
 *
 * SCOPE, AND WHY IT STOPS WHERE IT DOES. C5 is specified as "VSCode extension
 * first — LSP + webviews; a hosted web IDE later REUSING THE SAME LSP". The
 * durable asset in that sentence is the language service; the editor shell is
 * the disposable half, and a second one is planned already.
 *
 * So this module is the service and nothing else — pure queries over a CEKR
 * corpus, no editor protocol, no webview, no VSCode dependency. It ships with
 * a consumer that exists today (the `brain` CLI), because a language service
 * with no caller would be the same inert-mechanism mistake this codebase has
 * repeatedly had to undo. An LSP server or a webview can be added later
 * without changing a line here.
 *
 * Every query is pure and deterministic: same corpus in, same answer out,
 * ordering included. Nothing reads a clock, a filesystem or a database.
 */
import { isEdge, type CekrEdge, type CekrEnvelope, type CekrRecord, type EdgeKind } from './types'

/** An indexed corpus. Built once, queried many times — the LSP shape, where
 *  one parse serves every keystroke. */
export interface CekrIndex {
  entities: Map<string, CekrEnvelope>
  /** entity id → edges leaving it. */
  out: Map<string, CekrEdge[]>
  /** entity id → edges arriving at it. */
  in: Map<string, CekrEdge[]>
  edges: CekrEdge[]
}

export function buildIndex(records: readonly CekrRecord[]): CekrIndex {
  const entities = new Map<string, CekrEnvelope>()
  const out = new Map<string, CekrEdge[]>()
  const inn = new Map<string, CekrEdge[]>()
  const edges: CekrEdge[] = []
  for (const r of records) {
    if (isEdge(r)) { edges.push(r as CekrEdge) } else { entities.set(r.id, r as CekrEnvelope) }
  }
  // Stable adjacency order: edges sorted by (kind, target id) so every query
  // that walks them returns the same answer twice.
  for (const e of [...edges].sort((a, b) =>
    a.edgeKind.localeCompare(b.edgeKind) || a.from.localeCompare(b.from) || a.to.localeCompare(b.to))) {
    if (!out.has(e.from)) out.set(e.from, [])
    if (!inn.has(e.to)) inn.set(e.to, [])
    out.get(e.from)!.push(e)
    inn.get(e.to)!.push(e)
  }
  return { entities, out, in: inn, edges }
}

/**
 * Resolve what an AUTHOR types to a CEKR entity id.
 *
 * Entity ids are `cekr:<Kind>/<slug>` (types.makeEntityId), but an author
 * thinks in KG slugs — `phys.meas.units`, not `cekr:Concept/phys.meas.units`.
 * A language service that only accepted the internal form would be answering
 * a question nobody asks; the first draft of this module did exactly that and
 * reported every real slug as unknown.
 *
 * Exact entity id wins, then a unique slug match. An AMBIGUOUS slug (the same
 * slug under two kinds) returns null rather than guessing — silently picking
 * one would make "find references" quietly incomplete, which is worse than
 * saying so.
 */
export function resolveId(index: CekrIndex, input: string): string | null {
  if (index.entities.has(input)) return input
  const matches: string[] = []
  for (const id of index.entities.keys()) {
    const slash = id.indexOf('/')
    if (slash >= 0 && id.slice(slash + 1) === input) matches.push(id)
  }
  return matches.length === 1 ? matches[0] : null
}

// ── SDK-M3 · go-to-definition and find-references ───────────────────────────

export interface EntityCard {
  id: string
  kind: string
  status: string
  /** The file the entity was authored/imported from — the "definition". */
  citation: string | null
  /** Counts by edge kind, both directions. The hover card's summary line. */
  degree: { out: Record<string, number>; in: Record<string, number> }
}

/** The hover card / go-to-definition answer. `null` for an unknown id, which
 *  is a legitimate query (an author typing a reference that does not exist
 *  yet) and not an error. */
export function entityCard(index: CekrIndex, id: string): EntityCard | null {
  const e = index.entities.get(id)
  if (!e) return null
  const tally = (edges: CekrEdge[] | undefined): Record<string, number> => {
    const t: Record<string, number> = {}
    for (const x of edges ?? []) t[x.edgeKind] = (t[x.edgeKind] ?? 0) + 1
    return t
  }
  return {
    id: e.id, kind: e.kind, status: e.status,
    citation: e.citations[0]?.file ?? null,
    degree: { out: tally(index.out.get(id)), in: tally(index.in.get(id)) },
  }
}

export interface Reference {
  edgeKind: EdgeKind
  /** The entity at the OTHER end of the edge. */
  otherId: string
  direction: 'incoming' | 'outgoing'
  citation: string | null
}

/**
 * Every place an id is referenced. Sorted (direction, edgeKind, otherId) so
 * the answer is stable — an unstable reference list is unusable in an editor
 * and untestable anywhere.
 */
export function findReferences(index: CekrIndex, id: string): Reference[] {
  const refs: Reference[] = [
    ...(index.out.get(id) ?? []).map((e): Reference => ({
      edgeKind: e.edgeKind, otherId: e.to, direction: 'outgoing',
      citation: e.citations[0]?.file ?? null,
    })),
    ...(index.in.get(id) ?? []).map((e): Reference => ({
      edgeKind: e.edgeKind, otherId: e.from, direction: 'incoming',
      citation: e.citations[0]?.file ?? null,
    })),
  ]
  return refs.sort((a, b) =>
    a.direction.localeCompare(b.direction) ||
    a.edgeKind.localeCompare(b.edgeKind) ||
    a.otherId.localeCompare(b.otherId))
}

// ── SDK-M4 · the impact lens ("what breaks if I change this") ───────────────

/**
 * Edge kinds along which a change PROPAGATES to the dependent side.
 *
 * Deliberately narrow. `REQUIRES` and `REQUIRES_CAPABILITY` are the load-
 * bearing ones: if concept X changes, everything that requires X may break.
 * `REFINES` and `PART_OF` propagate for the same reason — the refinement or
 * the part is defined in terms of its parent. Explanatory and diagnostic
 * attachments (EXPLAINS, TARGETS, …) are NOT impact edges: rewriting an
 * explanation does not invalidate the concept it explains, and treating
 * every edge as impact would make the answer "everything", which helps
 * nobody.
 */
export const IMPACT_EDGE_KINDS: readonly EdgeKind[] = [
  'REQUIRES', 'REQUIRES_CAPABILITY', 'REFINES', 'PART_OF',
]

export interface ImpactNode {
  id: string
  /** Edges away from the changed entity. 1 = directly dependent. */
  distance: number
  /** How this node was reached — the path's first hop from its parent. */
  via: EdgeKind
}

export interface ImpactReport {
  root: string
  /** Transitively dependent entities, nearest first then alphabetical. */
  impacted: ImpactNode[]
  /** Entities the root itself depends on. Not impacted BY a change here —
   *  listed because an author asking "what breaks" also needs "what am I
   *  standing on". */
  dependsOn: string[]
  truncated: boolean
}

/**
 * EBC §12.4 impact analysis. Breadth-first over IMPACT_EDGE_KINDS, following
 * INCOMING edges: an edge `A REQUIRES B` means a change to B impacts A.
 *
 * `maxNodes` bounds the walk. A concept near the root of a 908-concept graph
 * impacts almost all of it, and an unbounded answer is both slow and useless;
 * `truncated` says so honestly rather than silently returning a prefix.
 */
export function impactOf(index: CekrIndex, id: string, maxNodes = 200): ImpactReport {
  const impacted: ImpactNode[] = []
  const seen = new Set<string>([id])
  let frontier: Array<{ id: string; via: EdgeKind }> = [{ id, via: 'REQUIRES' }]
  let distance = 0
  let truncated = false

  while (frontier.length > 0 && !truncated) {
    distance += 1
    const next: Array<{ id: string; via: EdgeKind }> = []
    for (const node of frontier) {
      for (const e of index.in.get(node.id) ?? []) {
        if (!IMPACT_EDGE_KINDS.includes(e.edgeKind)) continue
        if (seen.has(e.from)) continue
        seen.add(e.from)
        next.push({ id: e.from, via: e.edgeKind })
      }
    }
    // Deterministic layer order.
    next.sort((a, b) => a.id.localeCompare(b.id))
    for (const n of next) {
      if (impacted.length >= maxNodes) { truncated = true; break }
      impacted.push({ id: n.id, distance, via: n.via })
    }
    frontier = next
  }

  const dependsOn = (index.out.get(id) ?? [])
    .filter((e) => IMPACT_EDGE_KINDS.includes(e.edgeKind))
    .map((e) => e.to)
    .sort()

  return { root: id, impacted, dependsOn: [...new Set(dependsOn)], truncated }
}

// ── SDK-M4 · the neighborhood lens ──────────────────────────────────────────

export interface Neighborhood {
  root: string
  /** Everything within `radius` hops, by hop count. Index 0 is the root. */
  rings: string[][]
  /** Concepts with no authored explanation — the coverage colouring the spec
   *  asks for, reduced to the one fact a CLI can convey. */
  uncovered: string[]
}

/**
 * The prereq/unlock neighborhood of a concept, coverage-annotated. Walks
 * REQUIRES and UNLOCKS in both directions, which is what an author means by
 * "what is around this".
 */
export function neighborhood(index: CekrIndex, id: string, radius = 1): Neighborhood {
  const rings: string[][] = [[id]]
  const seen = new Set<string>([id])
  for (let r = 0; r < radius; r++) {
    const ring: string[] = []
    for (const node of rings[r]) {
      const touching = [...(index.out.get(node) ?? []), ...(index.in.get(node) ?? [])]
      for (const e of touching) {
        if (e.edgeKind !== 'REQUIRES' && e.edgeKind !== 'UNLOCKS') continue
        for (const other of [e.from, e.to]) {
          if (other === node || seen.has(other)) continue
          seen.add(other)
          ring.push(other)
        }
      }
    }
    rings.push(ring.sort())
  }
  const explained = new Set(
    index.edges.filter((e) => e.edgeKind === 'EXPLAINS').map((e) => e.to),
  )
  const uncovered = [...seen]
    .filter((n) => index.entities.get(n)?.kind === 'Concept' && !explained.has(n))
    .sort()
  return { root: id, rings, uncovered }
}

// ── Formatting (the CLI's presentation; the data above stays structured) ────

export function formatCard(card: EntityCard | null, id: string): string {
  if (!card) return `unknown id: ${id}`
  const deg = (t: Record<string, number>) =>
    Object.entries(t).sort().map(([k, n]) => `${k}×${n}`).join(' ') || '—'
  return [
    `${card.id}  [${card.kind}] ${card.status}`,
    `  defined in ${card.citation ?? '(no citation)'}`,
    `  out: ${deg(card.degree.out)}`,
    `  in:  ${deg(card.degree.in)}`,
  ].join('\n')
}

export function formatReferences(refs: readonly Reference[], id: string): string {
  if (refs.length === 0) return `${id}: no references`
  return [`${id}: ${refs.length} reference(s)`, ...refs.map((r) =>
    `  ${r.direction === 'incoming' ? '←' : '→'} ${r.edgeKind.padEnd(20)} ${r.otherId}`)].join('\n')
}

export function formatImpact(rep: ImpactReport): string {
  const lines = [`${rep.root}: ${rep.impacted.length} entit(y|ies) impacted by a change${rep.truncated ? ' (truncated)' : ''}`]
  for (const n of rep.impacted) lines.push(`  d${n.distance} ${n.via.padEnd(20)} ${n.id}`)
  lines.push(`  depends on: ${rep.dependsOn.join(', ') || '—'}`)
  return lines.join('\n')
}

export function formatNeighborhood(n: Neighborhood): string {
  const lines = [`${n.root}: neighborhood`]
  n.rings.forEach((ring, i) => {
    if (i === 0) return
    lines.push(`  hop ${i}: ${ring.join(', ') || '—'}`)
  })
  lines.push(`  concepts with no authored explanation: ${n.uncovered.length}`)
  return lines.join('\n')
}
