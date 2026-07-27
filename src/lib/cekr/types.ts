/**
 * C1 — CEKR envelope, kind registry and edge registry.
 *
 * Implements CEKR_CANONICAL_EDUCATIONAL_KNOWLEDGE_REPRESENTATION.md §2-§3
 * exactly; it designs nothing. The registries are CLOSED SETS: adding a kind
 * or an edge kind is a spec version event (CEKR §14), never an ad-hoc
 * extension, so both are frozen `as const` and the types derive from them.
 *
 * ── What C1 types, and what it deliberately does not ─────────────────────
 * The envelope, identity, lifecycle, provenance, citations and the edge model
 * are typed here in full, because they are what the STORE and the VALIDATOR
 * operate on. The 31 kind-specific BODY schemas are NOT typed here: bodies
 * arrive with their producers — BrainScript (C2) and the importers (C3) —
 * and C1's own Definition of Done is "the seed concept entries round-trip
 * losslessly", which is an envelope-and-store property. Typing 31 bodies
 * ahead of the code that produces them would be speculative architecture.
 *
 * Bodies are therefore `CekrBody = Record<string, unknown>`, validated
 * structurally (V-2 checks schemaVersion registration and body presence) and
 * carried losslessly through canonicalisation. C2/C3 narrow them per kind.
 *
 * Location note: the masterplan names `packages/cekr-validate`. This
 * repository has no workspace/package layout — every subsystem lives under
 * `src/lib/<name>` (kernel, brain-compiler, evidence-spine, teaching). Adding
 * a package workspace would be new build infrastructure, not CEKR. Following
 * the repo's existing convention is the smaller correct change.
 */

// ── Kind registry — CEKR §2.2, 31 kinds in 6 families (closed set) ──────────

export const KIND_FAMILIES = {
  /** S — Structural: what exists to be learned. */
  structural: [
    'Concept', 'Skill', 'Capability', 'LearningObjective',
    'MasteryCondition', 'TransferCondition',
  ],
  /** E — Explanatory: how it is conveyed. */
  explanatory: [
    'Explanation', 'Analogy', 'MentalModel', 'Intuition', 'WorkedExample',
    'Definition', 'Term', 'FormulaIntroduction', 'ProofOrDerivation',
    'Counterexample',
  ],
  /** D — Diagnostic: what goes wrong and how it is seen. */
  diagnostic: [
    'Misconception', 'CommonMistake', 'AssessmentItem', 'DiagnosticProbe',
    'MasteryProofSpec',
  ],
  /** P — Procedural: what the tutor does. */
  procedural: ['TeachingAction', 'HintSpec', 'RecoveryScript', 'PracticeSet'],
  /** X — Contextual: where it applies. */
  contextual: ['Context', 'RegisterProfile', 'LocaleProfile'],
  /** M — Meta: governance over the corpus itself. */
  meta: ['Attestation', 'Conflict', 'Vocabulary'],
} as const

export type KindFamily = keyof typeof KIND_FAMILIES
export type Kind = (typeof KIND_FAMILIES)[KindFamily][number]

export const KINDS: readonly Kind[] =
  Object.values(KIND_FAMILIES).flat() as Kind[]

const KIND_SET = new Set<string>(KINDS)
export function isKind(k: string): k is Kind { return KIND_SET.has(k) }

/** Reverse index: which family owns a kind. Built once, not restated. */
export const FAMILY_OF: Readonly<Record<Kind, KindFamily>> = (() => {
  const out = {} as Record<Kind, KindFamily>
  for (const [family, kinds] of Object.entries(KIND_FAMILIES)) {
    for (const k of kinds) out[k as Kind] = family as KindFamily
  }
  return out
})()

// ── Edge registry — CEKR §3 (closed set) ───────────────────────────────────

export const EDGE_KINDS = [
  // Structural claims
  'REQUIRES', 'REQUIRES_CAPABILITY', 'UNLOCKS', 'REFINES', 'REALIZES',
  'PART_OF', 'CROSS_LINK',
  // Explanatory attachments
  'EXPLAINS', 'GROUNDS', 'CONTRASTS', 'USES_TERM',
  // Diagnostic attachments
  'TARGETS', 'SIGNALS', 'ASSESSES', 'CERTIFIES', 'BREEDS',
  // Procedural attachments
  'DISPATCHES', 'REPAIRS', 'PRACTICES', 'HINTS_AT',
  // Contextual / meta
  'APPLIES_IN', 'ATTESTS', 'CONFLICTS_WITH', 'SUPERSEDES',
] as const

export type EdgeKind = (typeof EDGE_KINDS)[number]
const EDGE_SET = new Set<string>(EDGE_KINDS)
export function isEdgeKind(k: string): k is EdgeKind { return EDGE_SET.has(k) }

/**
 * Per-edge typing (CEKR §3): which kinds may sit at each end. `null` means
 * "any kind" where the spec does not constrain it. V-3 enforces this.
 */
export const EDGE_TYPING: Readonly<Record<EdgeKind, { from: readonly Kind[] | null; to: readonly Kind[] | null }>> = {
  REQUIRES: { from: ['Concept', 'Skill'], to: ['Concept', 'Skill'] },
  REQUIRES_CAPABILITY: { from: ['Concept', 'Skill', 'AssessmentItem', 'HintSpec'], to: ['Capability'] },
  UNLOCKS: { from: ['Concept', 'Skill'], to: ['Concept', 'Skill'] },
  REFINES: { from: ['Concept'], to: ['Concept'] },
  REALIZES: { from: ['Skill'], to: ['Concept'] },
  PART_OF: { from: ['Concept'], to: ['Concept'] },
  CROSS_LINK: { from: ['Concept'], to: ['Concept'] },
  EXPLAINS: {
    from: ['Explanation', 'Analogy', 'MentalModel', 'Intuition', 'WorkedExample',
           'Definition', 'FormulaIntroduction', 'ProofOrDerivation'],
    to: ['Concept', 'Skill'],
  },
  GROUNDS: { from: ['Intuition', 'Analogy'], to: ['MentalModel'] },
  CONTRASTS: { from: ['Counterexample'], to: ['MentalModel', 'Misconception', 'Analogy'] },
  USES_TERM: { from: null, to: ['Term'] },
  TARGETS: { from: ['Misconception', 'CommonMistake'], to: ['Concept', 'Skill'] },
  SIGNALS: { from: ['AssessmentItem'], to: ['Misconception'] },
  ASSESSES: { from: ['AssessmentItem', 'DiagnosticProbe'], to: ['Concept', 'Skill', 'Capability'] },
  CERTIFIES: { from: ['MasteryProofSpec'], to: ['MasteryCondition'] },
  BREEDS: { from: ['Analogy'], to: ['Misconception'] },
  DISPATCHES: { from: ['TeachingAction'], to: ['Concept', 'Skill'] },
  REPAIRS: { from: ['RecoveryScript', 'TeachingAction'], to: ['Misconception'] },
  PRACTICES: { from: ['PracticeSet'], to: ['Concept', 'Skill'] },
  HINTS_AT: { from: ['HintSpec'], to: ['Concept', 'Skill', 'AssessmentItem'] },
  APPLIES_IN: { from: null, to: ['Context', 'RegisterProfile', 'LocaleProfile'] },
  ATTESTS: { from: ['Attestation'], to: null },
  CONFLICTS_WITH: { from: ['Conflict'], to: null },
  SUPERSEDES: { from: null, to: null },
}

/** Edge kinds that MUST be acyclic (CEKR §4 / V-4). */
export const ACYCLIC_EDGE_KINDS: readonly EdgeKind[] = [
  'REQUIRES', 'REFINES', 'PART_OF', 'SUPERSEDES',
]

// ── Envelope — CEKR §2.1 ───────────────────────────────────────────────────

export const STATUSES = ['DRAFT', 'REVIEW', 'ACTIVE', 'DEPRECATED', 'RETIRED'] as const
export type Status = (typeof STATUSES)[number]

export const AUTHOR_TYPES = ['HUMAN', 'HUMAN_CURATOR', 'AI_ASSISTED', 'IMPORTED'] as const
export type AuthorType = (typeof AUTHOR_TYPES)[number]

export interface Provenance {
  authorType: AuthorType
  authorRef: string
  createdAt: string          // ISO-8601
  basis?: string[]
}

/** Where the authored origin lives — file/heading/line (CEKR §2.1). */
export interface SourceSpan {
  file: string
  heading?: string
  line?: number
}

export type EntityId = string          // `cekr:<kind>/<slug-or-ulid>`
export type RevisionHash = string      // `sha256:<hex>` — see canonical.ts

export type CekrBody = Record<string, unknown>

export interface CekrEnvelope {
  id: EntityId
  kind: Kind
  /** Content hash of the canonical body+identity. Assigned by canonical.ts;
   *  never authored by hand, never trusted from input (V-2 recomputes it). */
  rev: RevisionHash
  schemaVersion: number
  status: Status
  provenance: Provenance
  citations: SourceSpan[]     // ≥1 (V-1)
  tags: string[]
  body: CekrBody
}

export interface CekrEdge extends Omit<CekrEnvelope, 'kind' | 'body'> {
  kind: 'Edge'
  edgeKind: EdgeKind
  from: EntityId
  to: EntityId
  attrs: Record<string, unknown>
}

export type CekrRecord = CekrEnvelope | CekrEdge

export function isEdge(r: CekrRecord): r is CekrEdge {
  return (r as CekrEdge).kind === 'Edge'
}

/** The id grammar, CEKR §2.1: `cekr:<kind>/<slug>`. */
export const ENTITY_ID_RE = /^cekr:([A-Za-z]+)\/([a-z0-9][a-z0-9._-]*)$/

export function parseEntityId(id: string): { kind: string; slug: string } | null {
  const m = ENTITY_ID_RE.exec(id)
  return m ? { kind: m[1], slug: m[2] } : null
}

export function makeEntityId(kind: Kind, slug: string): EntityId {
  return `cekr:${kind}/${slug}`
}

/**
 * The inverse of makeEntityId: recover the authored slug from an entity id.
 *
 * Lives beside its inverse deliberately. The id shape is one decision, and a
 * consumer that re-derives the slug by its own string surgery is a second
 * owner of it — which is exactly how the compiler came to guard Band-3 rules
 * on `cekr:Concept/x` for hand-authored concepts while the runtime matched on
 * `x`, producing rules that compiled, loaded and could never fire.
 *
 * Returns the input unchanged when it is not a CEKR id, so callers holding
 * either form can pass it straight through.
 */
export function slugOf(entityId: string): string {
  if (!entityId.startsWith('cekr:')) return entityId
  const slash = entityId.indexOf('/')
  return slash >= 0 ? entityId.slice(slash + 1) : entityId
}

// ── Schema-version registry (V-2) ──────────────────────────────────────────

/** Current schemaVersion per kind. A decode encountering a HIGHER version
 *  must refuse rather than guess (CEKR §14 / RS E-5 discipline). */
export const CURRENT_SCHEMA_VERSION: Readonly<Record<Kind, number>> = (() => {
  const out = {} as Record<Kind, number>
  for (const k of KINDS) out[k] = 1
  return out
})()

export const EDGE_SCHEMA_VERSION = 1
