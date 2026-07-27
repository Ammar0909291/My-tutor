/**
 * C1 — the validation library, V-1 … V-16 (CEKR §11).
 *
 * The division of labour is the spec's own and is load-bearing:
 *   CEKR validation = "is this element well-formed and honestly claimed"
 *   EBC validation  = "is this subject shippable" (coverage, release mode)
 * So nothing here checks coverage. A skeleton constellation (D15 instrumented
 * skeletons) is VALID CEKR and an unshippable subject — those are different
 * findings with different owners, and collapsing them would make honest
 * partial authoring impossible.
 *
 * Every rule is pure and total. Validation returns findings; it never throws
 * and never repairs — a validator that silently fixes its input cannot be
 * trusted to report what the corpus actually contains.
 */
import {
  ACYCLIC_EDGE_KINDS, CURRENT_SCHEMA_VERSION, EDGE_SCHEMA_VERSION, EDGE_TYPING,
  STATUSES, AUTHOR_TYPES, isEdge, isEdgeKind, isKind, parseEntityId,
  type CekrEdge, type CekrEnvelope, type CekrRecord, type EdgeKind, type Kind,
} from './types'
import { revisionMatches } from './canonical'

export type VCode =
  | 'V-1' | 'V-2' | 'V-3' | 'V-4' | 'V-5' | 'V-6' | 'V-7' | 'V-8'
  | 'V-9' | 'V-10' | 'V-11' | 'V-12' | 'V-13' | 'V-14' | 'V-15' | 'V-16'

export interface Finding {
  code: VCode
  /** The record the finding is about; '' for corpus-level findings. */
  id: string
  detail: string
}

export interface Corpus {
  entities: readonly CekrEnvelope[]
  edges: readonly CekrEdge[]
  /** Previous revisions by id, for the monotonicity check (V-15). Optional:
   *  a fresh corpus has no history and V-15 is vacuously satisfied. */
  previousStatus?: Readonly<Record<string, string>>
}

const isStr = (v: unknown): v is string => typeof v === 'string' && v.length > 0

// ── V-1 · envelope completeness ────────────────────────────────────────────
function v1(r: CekrRecord): Finding[] {
  const f: Finding[] = []
  const add = (detail: string) => f.push({ code: 'V-1', id: r.id ?? '', detail })
  if (!isStr(r.id) || parseEntityId(r.id) === null) add('id missing or not `cekr:<Kind>/<slug>`')
  if (!(STATUSES as readonly string[]).includes(r.status)) add(`status '${r.status}' not in the closed set`)
  const p = r.provenance
  if (!p || !(AUTHOR_TYPES as readonly string[]).includes(p.authorType)) add('provenance.authorType missing or invalid')
  else {
    if (!isStr(p.authorRef)) add('provenance.authorRef missing')
    if (!isStr(p.createdAt) || Number.isNaN(Date.parse(p.createdAt))) add('provenance.createdAt not an ISO-8601 instant')
  }
  if (!Array.isArray(r.citations) || r.citations.length < 1) add('at least one citation is required')
  else if (r.citations.some((c) => !isStr(c?.file))) add('every citation needs a file')
  if (!Array.isArray(r.tags)) add('tags must be an array (may be empty)')
  return f
}

// ── V-2 · schema validity + revision integrity ─────────────────────────────
function v2(r: CekrRecord): Finding[] {
  const f: Finding[] = []
  const add = (detail: string) => f.push({ code: 'V-2', id: r.id ?? '', detail })
  if (isEdge(r)) {
    if (!isEdgeKind(r.edgeKind)) add(`unknown edgeKind '${r.edgeKind}'`)
    if (r.schemaVersion !== EDGE_SCHEMA_VERSION) add(`edge schemaVersion ${r.schemaVersion} != ${EDGE_SCHEMA_VERSION}`)
    if (typeof r.attrs !== 'object' || r.attrs === null) add('attrs must be an object (may be empty)')
  } else {
    const e = r as CekrEnvelope
    if (!isKind(e.kind)) { add(`unknown kind '${e.kind}'`); return f }
    const current = CURRENT_SCHEMA_VERSION[e.kind as Kind]
    if (!Number.isInteger(e.schemaVersion) || e.schemaVersion < 1) add('schemaVersion must be a positive integer')
    // A HIGHER version must be refused, never guessed at.
    else if (e.schemaVersion > current) add(`schemaVersion ${e.schemaVersion} is newer than this reader knows (${current})`)
    if (typeof e.body !== 'object' || e.body === null || Array.isArray(e.body)) add('body must be an object')
    // The id's kind segment must agree with the declared kind.
    const parsed = parseEntityId(e.id ?? '')
    if (parsed && parsed.kind !== e.kind) add(`id kind '${parsed.kind}' disagrees with kind '${e.kind}'`)
  }
  if (isStr(r.rev) && !revisionMatches(r)) add('rev does not match the content hash')
  if (!isStr(r.rev)) add('rev missing')
  return f
}

// ── V-3 · reference resolution + target-kind typing ────────────────────────
function v3(c: Corpus): Finding[] {
  const f: Finding[] = []
  const kindOf = new Map<string, Kind>()
  for (const e of c.entities) kindOf.set(e.id, e.kind)
  for (const edge of c.edges) {
    const add = (detail: string) => f.push({ code: 'V-3', id: edge.id, detail })
    const fromKind = kindOf.get(edge.from)
    const toKind = kindOf.get(edge.to)
    if (!fromKind) add(`unresolved from-reference '${edge.from}'`)
    if (!toKind) add(`unresolved to-reference '${edge.to}'`)
    if (!isEdgeKind(edge.edgeKind)) continue
    const typing = EDGE_TYPING[edge.edgeKind]
    if (fromKind && typing.from && !typing.from.includes(fromKind)) {
      add(`${edge.edgeKind} may not originate at ${fromKind}`)
    }
    if (toKind && typing.to && !typing.to.includes(toKind)) {
      add(`${edge.edgeKind} may not point at ${toKind}`)
    }
  }
  return f
}

// ── V-4 · per-edge-kind acyclicity ─────────────────────────────────────────
function v4(c: Corpus): Finding[] {
  const f: Finding[] = []
  for (const kind of ACYCLIC_EDGE_KINDS) {
    const adj = new Map<string, string[]>()
    for (const e of c.edges) {
      if (e.edgeKind !== kind) continue
      const list = adj.get(e.from) ?? []
      list.push(e.to)
      adj.set(e.from, list)
    }
    const WHITE = 0, GREY = 1, BLACK = 2
    const colour = new Map<string, number>()
    const stack: string[] = []
    const visit = (n: string): string[] | null => {
      colour.set(n, GREY); stack.push(n)
      for (const m of adj.get(n) ?? []) {
        const c2 = colour.get(m) ?? WHITE
        if (c2 === GREY) return [...stack.slice(stack.indexOf(m)), m]
        if (c2 === WHITE) { const cyc = visit(m); if (cyc) return cyc }
      }
      colour.set(n, BLACK); stack.pop()
      return null
    }
    for (const n of adj.keys()) {
      if ((colour.get(n) ?? WHITE) !== WHITE) continue
      const cyc = visit(n)
      if (cyc) { f.push({ code: 'V-4', id: '', detail: `${kind} cycle: ${cyc.join(' → ')}` }); break }
    }
  }
  return f
}

// ── V-5 · cardinality ──────────────────────────────────────────────────────
function v5(c: Corpus): Finding[] {
  const f: Finding[] = []
  // A distractor SIGNALS at most one misconception (CEKR §4): a distractor
  // that signals two is not a diagnostic, it is an ambiguity.
  const signalsPerSource = new Map<string, number>()
  for (const e of c.edges) {
    if (e.edgeKind !== 'SIGNALS') continue
    const key = `${e.from}|${String(e.attrs.distractorIndex ?? '')}`
    signalsPerSource.set(key, (signalsPerSource.get(key) ?? 0) + 1)
  }
  for (const [key, n] of signalsPerSource) {
    if (n > 1) f.push({ code: 'V-5', id: key.split('|')[0], detail: `distractor SIGNALS ${n} misconceptions; at most 1` })
  }
  // A Skill REALIZES at least one Concept when it declares any realization.
  return f
}

// ── V-6 · registered-vocabulary membership ─────────────────────────────────
function v6(c: Corpus): Finding[] {
  const f: Finding[] = []
  const vocab = new Set<string>()
  for (const e of c.entities) {
    if (e.kind !== 'Vocabulary') continue
    for (const t of (e.body.terms as string[] | undefined) ?? []) vocab.add(t)
  }
  if (vocab.size === 0) return f          // no vocabulary declared ⇒ vacuous
  for (const e of c.entities) {
    for (const t of e.tags) {
      if (!vocab.has(t)) f.push({ code: 'V-6', id: e.id, detail: `tag '${t}' is not in a registered Vocabulary` })
    }
  }
  return f
}

// ── V-7 · variant semantic equality ────────────────────────────────────────
function v7(c: Corpus): Finding[] {
  const f: Finding[] = []
  // Variants declare the entity they vary. Variants must agree on the claim
  // they make; they may differ only in language/register (CEKR §8.2).
  const byVariantOf = new Map<string, CekrEnvelope[]>()
  for (const e of c.entities) {
    const of = e.body.variantOf
    if (typeof of !== 'string') continue
    byVariantOf.set(of, [...(byVariantOf.get(of) ?? []), e])
  }
  for (const [base, variants] of byVariantOf) {
    const claims = new Set(variants.map((v) => String(v.body.semanticClaim ?? '')))
    if (claims.size > 1) {
      f.push({ code: 'V-7', id: base, detail: `variants disagree on semanticClaim (${claims.size} distinct)` })
    }
  }
  return f
}

// ── V-8 · REQUIRES/UNLOCKS symmetry ────────────────────────────────────────
function v8(c: Corpus): Finding[] {
  const f: Finding[] = []
  const req = new Set<string>()
  const unl = new Set<string>()
  for (const e of c.edges) {
    if (e.edgeKind === 'REQUIRES') req.add(`${e.from}|${e.to}`)
    if (e.edgeKind === 'UNLOCKS') unl.add(`${e.to}|${e.from}`)   // inverse
  }
  for (const k of req) if (!unl.has(k)) {
    const [from, to] = k.split('|')
    f.push({ code: 'V-8', id: from, detail: `REQUIRES ${to} has no mirrored UNLOCKS` })
  }
  for (const k of unl) if (!req.has(k)) {
    const [from, to] = k.split('|')
    f.push({ code: 'V-8', id: to, detail: `UNLOCKS ${from} has no mirrored REQUIRES` })
  }
  return f
}

// ── V-9 · hint easier-than metadata ────────────────────────────────────────
function v9(c: Corpus): Finding[] {
  const f: Finding[] = []
  const stageOf = new Map<string, number>()
  const capsOf = new Map<string, Set<string>>()
  for (const e of c.entities) {
    if (typeof e.body.stage === 'number') stageOf.set(e.id, e.body.stage)
  }
  for (const e of c.edges) {
    if (e.edgeKind !== 'REQUIRES_CAPABILITY') continue
    capsOf.set(e.from, new Set([...(capsOf.get(e.from) ?? []), e.to]))
  }
  for (const e of c.entities) {
    if (e.kind !== 'HintSpec') continue
    const target = typeof e.body.targetItem === 'string' ? e.body.targetItem : null
    if (!target) continue
    const hs = stageOf.get(e.id), ts = stageOf.get(target)
    if (hs !== undefined && ts !== undefined && hs > ts - 1) {
      f.push({ code: 'V-9', id: e.id, detail: `hint stage ${hs} must be ≤ target stage ${ts} − 1` })
    }
    const hc = capsOf.get(e.id) ?? new Set<string>()
    const tc = capsOf.get(target) ?? new Set<string>()
    for (const cap of hc) if (!tc.has(cap)) {
      f.push({ code: 'V-9', id: e.id, detail: `hint demands capability '${cap}' the target does not` })
    }
  }
  return f
}

// ── V-10 · MasteryCondition completeness ───────────────────────────────────
function v10(c: Corpus): Finding[] {
  const f: Finding[] = []
  for (const e of c.entities) {
    if (e.kind !== 'MasteryCondition') continue
    const proofs = new Set(((e.body.proofKinds as string[] | undefined) ?? []))
    const attested = isStr(e.body.lighterRationale as string)
    const missing = ['GATE', 'RETENTION', 'TRANSFER'].filter((p) => !proofs.has(p))
    if (missing.length > 0 && !attested) {
      f.push({ code: 'V-10', id: e.id, detail: `missing proof kinds ${missing.join(', ')} with no lighterRationale` })
    }
  }
  return f
}

// ── V-11 · analogy discipline ──────────────────────────────────────────────
function v11(c: Corpus): Finding[] {
  const f: Finding[] = []
  const breeds = new Set(c.edges.filter((e) => e.edgeKind === 'BREEDS').map((e) => e.from))
  for (const e of c.entities) {
    if (e.kind !== 'Analogy') continue
    const carries = new Set(((e.body.carries as string[] | undefined) ?? []))
    const doesNot = ((e.body.doesNotCarry as string[] | undefined) ?? [])
    const overlap = doesNot.filter((d) => carries.has(d))
    if (overlap.length > 0) f.push({ code: 'V-11', id: e.id, detail: `carries ∩ doesNotCarry = {${overlap.join(', ')}}` })
    if (!isStr(e.body.retirementBoundary as string)) {
      f.push({ code: 'V-11', id: e.id, detail: 'retirementBoundary is required — an analogy without one is a scheduled misconception' })
    }
    if (!breeds.has(e.id) && e.body.breedsNoneAttested !== true) {
      f.push({ code: 'V-11', id: e.id, detail: 'no BREEDS edge and no breedsNoneAttested — the anti-analogy claim must be explicit' })
    }
  }
  return f
}

// ── V-12 · distractor discipline ───────────────────────────────────────────
function v12(c: Corpus): Finding[] {
  const f: Finding[] = []
  const signalled = new Set(
    c.edges.filter((e) => e.edgeKind === 'SIGNALS')
      .map((e) => `${e.from}|${String(e.attrs.distractorIndex ?? '')}`),
  )
  for (const e of c.entities) {
    if (e.kind !== 'AssessmentItem') continue
    const distractors = (e.body.distractors as Array<Record<string, unknown>> | undefined) ?? []
    distractors.forEach((d, i) => {
      const hasSignal = signalled.has(`${e.id}|${i}`)
      if (!hasSignal && d.distractorBasis !== 'PLAUSIBLE_SLIP') {
        f.push({ code: 'V-12', id: e.id, detail: `distractor ${i} neither SIGNALS a misconception nor declares PLAUSIBLE_SLIP` })
      }
    })
  }
  return f
}

// ── V-13 · NeutralText purity in cores ─────────────────────────────────────
const RENDERABLE_MARKUP = /<[a-z][^>]*>|\*\*|\[[A-Z_]+\]|\\n/
function v13(c: Corpus): Finding[] {
  const f: Finding[] = []
  const scan = (id: string, path: string, v: unknown) => {
    if (typeof v === 'string') {
      if (RENDERABLE_MARKUP.test(v)) f.push({ code: 'V-13', id, detail: `renderable markup leaked into core field '${path}'` })
      return
    }
    if (Array.isArray(v)) return v.forEach((x, i) => scan(id, `${path}[${i}]`, x))
    if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) scan(id, path ? `${path}.${k}` : k, x)
    }
  }
  for (const e of c.entities) {
    const core = e.body.core
    if (core !== undefined) scan(e.id, 'core', core)
  }
  return f
}

// ── V-14 · no OPEN Conflict on ACTIVE entities ─────────────────────────────
function v14(c: Corpus): Finding[] {
  const f: Finding[] = []
  const openConflicts = new Set(
    c.entities.filter((e) => e.kind === 'Conflict' && e.body.state === 'OPEN').map((e) => e.id),
  )
  if (openConflicts.size === 0) return f
  const active = new Set(c.entities.filter((e) => e.status === 'ACTIVE').map((e) => e.id))
  for (const e of c.edges) {
    if (e.edgeKind !== 'CONFLICTS_WITH' || !openConflicts.has(e.from)) continue
    if (active.has(e.to)) f.push({ code: 'V-14', id: e.to, detail: `ACTIVE while OPEN conflict ${e.from} targets it` })
  }
  return f
}

// ── V-15 · status monotonicity ─────────────────────────────────────────────
function v15(c: Corpus): Finding[] {
  const f: Finding[] = []
  if (!c.previousStatus) return f
  for (const r of [...c.entities, ...c.edges]) {
    if (c.previousStatus[r.id] === 'RETIRED' && r.status !== 'RETIRED') {
      f.push({ code: 'V-15', id: r.id, detail: `RETIRED → ${r.status}; a retired entity never reactivates` })
    }
  }
  return f
}

// ── V-16 · prereqsComplete attestation on ACTIVE Concepts ──────────────────
function v16(c: Corpus): Finding[] {
  const f: Finding[] = []
  for (const e of c.entities) {
    if (e.kind !== 'Concept' || e.status !== 'ACTIVE') continue
    if (e.body.prereqsComplete !== true) {
      f.push({ code: 'V-16', id: e.id, detail: 'ACTIVE Concept without a prereqsComplete closed-world attestation' })
    }
  }
  return f
}

// ── The entry points ───────────────────────────────────────────────────────

/** Per-record rules (V-1, V-2). Pure. */
export function validateRecord(r: CekrRecord): Finding[] {
  return [...v1(r), ...v2(r)]
}

/** The whole corpus: per-record rules plus every graph-level rule. Findings
 *  are returned in stable V-code order so two runs diff cleanly. */
export function validateCorpus(c: Corpus): Finding[] {
  const perRecord = [...c.entities, ...c.edges].flatMap(validateRecord)
  const graph = [
    ...v3(c), ...v4(c), ...v5(c), ...v6(c), ...v7(c), ...v8(c), ...v9(c),
    ...v10(c), ...v11(c), ...v12(c), ...v13(c), ...v14(c), ...v15(c), ...v16(c),
  ]
  return [...perRecord, ...graph].sort((a, b) =>
    a.code.localeCompare(b.code, undefined, { numeric: true }) || a.id.localeCompare(b.id))
}

export function isValid(c: Corpus): boolean {
  return validateCorpus(c).length === 0
}
