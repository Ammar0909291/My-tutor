/**
 * EOS v2 Capability Model — the runtime owner of operational skills.
 *
 * Implements the frozen specification, not a new design:
 *   EOS_V2_ARCHITECTURE.md §4.2   (the model, states, attribution, legality)
 *   EOS_V2_RUNTIME_SPECIFICATION  §3.2 CapabilityState, §4.11 the lattice
 *   CAPABILITY_MODEL_DESIGN.md    §2 vocabulary, §3 storage, §4 evidence rules
 *   EOS_IMPLEMENTATION_MASTERPLAN K2
 *
 * ── What a capability is, and what it is NOT ─────────────────────────────
 * A capability is a small, subject-agnostic, TESTABLE OPERATION. It is not a
 * curriculum concept and never becomes one. The boundary (arch §4.2 critique,
 * verbatim ruling): if it lives in a curriculum KG and is TAUGHT, it is a
 * concept; its OPERATIONAL FLUENCY is the capability. Mastering the concept
 * `math.arith.multiplication` promotes the capability `multiply`; the two are
 * linked and never merged, because concepts are subject-scoped while
 * capabilities are learner-scoped and portable. `multiply: OBSERVED_NO`
 * learned in physics protects the learner in chemistry.
 *
 * ── Ownership, and why this is not a second mastery system ───────────────
 * Concept mastery is owned by masteryGate/TopicProgress and is untouched here.
 * This module owns operational skills only. The lattice itself is NOT
 * redefined: `foldCapability` is imported from the evidence spine, which
 * already implements RS §4.11. The split is:
 *
 *   evidence-spine/fold.ts   the lattice + the durable, replayable projection
 *   capabilityModel.ts       vocabulary · prerequisite DAG · concept binding ·
 *                            legality · stated-inability detection ·
 *                            the session-tier working set
 *
 * Storage adds no tables (design §3): the session tier lives on the existing
 * `contextSnapshot.capabilities`, folded by the existing Library snapshot
 * persist. Durable evidence is the spine's CapabilityObserved event, which was
 * already defined and, until now, never emitted.
 *
 * ── Admission rule (arch §4.2) ───────────────────────────────────────────
 * A capability exists only if at least one policy rule branches on it. The
 * vocabulary below is deliberately small; growing it requires a consumer.
 */

import { foldCapability, type CapabilityStatus } from '@/lib/evidence-spine/fold'

export type { CapabilityStatus }

// ── The vocabulary (versioned constant in code, never per-subject data) ─────

export const CAPABILITY_CLUSTERS = {
  numeric: [
    'count', 'compare', 'estimate', 'add-subtract', 'multiply', 'divide',
    'fractions', 'percentage', 'negative-numbers', 'square', 'root',
    'proportional-reasoning',
  ],
  symbolic: [
    'read-notation', 'substitute-into-formula', 'rearrange-equation',
    'solve-linear-equation', 'dimensional-analysis', 'balance-equation',
  ],
  spatial: [
    'identify-direction', 'visualize-vectors', 'decompose-vectors',
    'interpret-diagram',
  ],
  graphical: ['read-axes', 'read-simple-graph', 'interpret-slope', 'read-table'],
  verbal: ['restate-in-own-words', 'follow-two-step-instruction', 'compare-two-claims'],
  experimental: ['predict-outcome', 'control-variables'],
  procedural: ['read-code', 'trace-execution', 'reason-about-loops'],
} as const

export type CapabilityId =
  (typeof CAPABILITY_CLUSTERS)[keyof typeof CAPABILITY_CLUSTERS][number]

export const CAPABILITY_VOCABULARY: readonly CapabilityId[] =
  Object.values(CAPABILITY_CLUSTERS).flat() as CapabilityId[]

const VOCAB_SET = new Set<string>(CAPABILITY_VOCABULARY)
export function isCapabilityId(id: string): id is CapabilityId { return VOCAB_SET.has(id) }

/** Human-readable, for the turn directive and recovery copy. Never shown to
 *  the learner as a label — used inside instructions to the renderer. */
export const CAPABILITY_LABELS: Record<CapabilityId, string> = {
  'count': 'counting', 'compare': 'comparing two quantities',
  'estimate': 'estimating', 'add-subtract': 'adding and subtracting',
  'multiply': 'multiplying', 'divide': 'dividing',
  'fractions': 'working with fractions', 'percentage': 'working with percentages',
  'negative-numbers': 'working with negative numbers',
  'square': 'squaring a number', 'root': 'taking a square root',
  'proportional-reasoning': 'proportional reasoning',
  'read-notation': 'reading symbolic notation',
  'substitute-into-formula': 'substituting values into a formula',
  'rearrange-equation': 'rearranging an equation',
  'solve-linear-equation': 'solving a linear equation',
  'dimensional-analysis': 'reasoning about units',
  'balance-equation': 'balancing an equation',
  'identify-direction': 'identifying direction',
  'visualize-vectors': 'picturing vectors',
  'decompose-vectors': 'resolving a vector into components',
  'interpret-diagram': 'reading a diagram',
  'read-axes': 'reading graph axes', 'read-simple-graph': 'reading a graph',
  'interpret-slope': 'interpreting a slope', 'read-table': 'reading a table',
  'restate-in-own-words': 'restating an idea in their own words',
  'follow-two-step-instruction': 'following a two-step instruction',
  'compare-two-claims': 'comparing two claims',
  'predict-outcome': 'predicting an outcome',
  'control-variables': 'controlling variables',
  'read-code': 'reading code', 'trace-execution': 'tracing execution',
  'reason-about-loops': 'reasoning about loops',
}

// ── The prerequisite DAG (arch §4.2: "a small DAG") ─────────────────────────

/**
 * A capability's own prerequisites. This is what makes the model catch the
 * brief's three examples structurally rather than by lexicon:
 *   vector addition before vectors exist    → decompose-vectors ← visualize-vectors
 *   graph interpretation before graph reading → interpret-slope ← read-axes
 *   dimensional analysis before unit reasoning → dimensional-analysis ← divide, read-notation
 */
export const CAPABILITY_REQUIRES: Partial<Record<CapabilityId, readonly CapabilityId[]>> = {
  'multiply': ['add-subtract'],
  'divide': ['multiply'],
  'fractions': ['divide'],
  'percentage': ['fractions'],
  'proportional-reasoning': ['fractions', 'divide'],
  'square': ['multiply'],
  'root': ['square'],
  'substitute-into-formula': ['read-notation'],
  'rearrange-equation': ['substitute-into-formula', 'divide'],
  'solve-linear-equation': ['rearrange-equation'],
  'dimensional-analysis': ['divide', 'read-notation'],
  'balance-equation': ['count', 'compare'],
  'visualize-vectors': ['identify-direction'],
  'decompose-vectors': ['visualize-vectors', 'multiply'],
  'read-simple-graph': ['read-axes'],
  'interpret-slope': ['read-axes', 'divide'],
  'trace-execution': ['read-code'],
  'reason-about-loops': ['trace-execution'],
  'predict-outcome': ['compare'],
  'control-variables': ['compare'],
}

/** Transitive closure of a capability's prerequisites. Deterministic order
 *  (deepest first), cycle-safe. Pure. */
export function expandPrerequisites(ids: readonly CapabilityId[]): CapabilityId[] {
  const out: CapabilityId[] = []
  const seen = new Set<CapabilityId>()
  const visit = (id: CapabilityId, guard: Set<CapabilityId>) => {
    if (guard.has(id)) return                 // cycle guard — authoring defect
    guard.add(id)
    for (const p of CAPABILITY_REQUIRES[id] ?? []) visit(p, guard)
    if (!seen.has(id)) { seen.add(id); out.push(id) }
  }
  for (const id of ids) visit(id, new Set())
  return out
}

// ── Concept → capability binding ────────────────────────────────────────────

/**
 * Authored bindings, keyed by canonical KG concept id (arch §4.2: "every KG
 * concept carries requiresCapabilities[]; authored in Brain concept entries").
 * Seeded, not exhaustive — `inferCapabilities` is the declared fallback for
 * the ~1,750 uncovered concepts, so the model is useful before authoring
 * completes rather than after.
 */
export const CONCEPT_CAPABILITIES: Record<string, readonly CapabilityId[]> = {
  'phys.mech.newtons-second-law': ['multiply', 'divide', 'rearrange-equation', 'decompose-vectors'],
  'phys.mech.newtons-first-law': ['identify-direction', 'interpret-diagram'],
  'phys.meas.units': ['dimensional-analysis', 'read-notation'],
  'phys.kin.vectors': ['visualize-vectors', 'identify-direction'],
  'chem.sol.solubility': ['proportional-reasoning', 'read-notation', 'substitute-into-formula'],
  'chem.react.balancing': ['balance-equation', 'count'],
  'math.arith.fractions': ['divide', 'multiply'],
  'math.arith.percentages': ['percentage', 'fractions'],
  'cs.prog.loops': ['reason-about-loops', 'trace-execution'],
}

/**
 * Deterministic fallback for uncovered concepts (arch §4.2: "inferable
 * fallback from domain+difficulty"). Matches on canonical-id segments only —
 * no LLM, no natural-language guessing, no per-subject table. Subject
 * independence is the point: `*.vector*` implies the same operations whether
 * the prefix is `phys.` or `math.`.
 */
const ID_SEGMENT_CAPABILITIES: ReadonlyArray<[RegExp, readonly CapabilityId[]]> = [
  [/vector/, ['visualize-vectors', 'identify-direction']],
  [/graph|plot|chart/, ['read-axes', 'read-simple-graph']],
  [/slope|gradient|rate-of-change/, ['interpret-slope']],
  [/unit|dimension|measurement/, ['dimensional-analysis']],
  [/fraction|ratio|proportion/, ['fractions', 'proportional-reasoning']],
  [/percent/, ['percentage']],
  [/equation|formula|law\b/, ['read-notation', 'substitute-into-formula']],
  [/solv(e|ing)|rearrang|isolat/, ['rearrange-equation']],
  [/balanc/, ['balance-equation']],
  [/loop|iteration|recursion/, ['reason-about-loops']],
  [/code|program|algorithm/, ['read-code']],
  [/diagram|structure|geometry/, ['interpret-diagram']],
  [/experiment|variable|hypothesis/, ['control-variables', 'predict-outcome']],
  [/square|power|exponent/, ['square']],
  [/root|radical/, ['root']],
]

export function inferCapabilities(conceptId: string): CapabilityId[] {
  const id = conceptId.toLowerCase()
  const out = new Set<CapabilityId>()
  for (const [re, caps] of ID_SEGMENT_CAPABILITIES) {
    if (re.test(id)) for (const c of caps) out.add(c)
  }
  return [...out]
}

/** The single resolution entry point. Authored binding wins outright
 *  (retrieval beats derivation — arch §6.1 Band 3's principle applied here);
 *  otherwise infer. Always returns the transitive closure, because a lesson
 *  needing `interpret-slope` needs `read-axes` just as truly. */
export function requiredCapabilities(conceptId: string | null | undefined): CapabilityId[] {
  if (!conceptId) return []
  const authored = CONCEPT_CAPABILITIES[conceptId]
  const direct = authored ?? inferCapabilities(conceptId)
  return expandPrerequisites(direct)
}

// ── State (session tier — design §3.1, contextSnapshot.capabilities) ────────

export interface CapabilityRecord {
  status: CapabilityStatus
  succ: number
  fail: number
  diagnosticSucc: number
  /** Turn index of the last evidence — drives staleness, never demotion
   *  (RS §4.11: "decay NEVER demotes; stale → probe"). */
  lastSeenTurn?: number
}

export type CapabilityState = Record<string, CapabilityRecord>

export function initialCapabilityState(): CapabilityState { return {} }

/** Total: never throws; tolerates a legacy or partial stored shape. */
export function readCapabilityState(raw: unknown): CapabilityState {
  if (!raw || typeof raw !== 'object') return {}
  const out: CapabilityState = {}
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!isCapabilityId(k) || !v || typeof v !== 'object') continue
    const r = v as Partial<CapabilityRecord>
    out[k] = {
      status: (r.status ?? 'UNKNOWN') as CapabilityStatus,
      succ: r.succ ?? 0, fail: r.fail ?? 0, diagnosticSucc: r.diagnosticSucc ?? 0,
      ...(r.lastSeenTurn !== undefined ? { lastSeenTurn: r.lastSeenTurn } : {}),
    }
  }
  return out
}

/**
 * Durable → session tier. Maps the evidence spine's CapabilityProjection onto
 * the session working set, so a returning learner starts with everything the
 * spine already knows.
 *
 * This is a PROJECTION COPY, not a second fold: the spine produced those
 * statuses by running foldCapability over the durable event log, so hydrating
 * cannot diverge from replay and cannot double-count. It is called only when
 * the session cache is cold (design §3.2's "copied forward ... lazily on next
 * session open"), which is what keeps the two tiers consistent within a
 * session without a reconciliation step.
 */
export function hydrateFromProjection(
  projection: { capabilities: Record<string, { status: CapabilityStatus; succ: number; fail: number; diagnosticSucc: number }> } | null | undefined,
): CapabilityState {
  if (!projection?.capabilities) return {}
  const out: CapabilityState = {}
  for (const [id, rec] of Object.entries(projection.capabilities)) {
    if (!isCapabilityId(id)) continue
    out[id] = { status: rec.status, succ: rec.succ, fail: rec.fail, diagnosticSucc: rec.diagnosticSucc }
  }
  return out
}

export function statusOf(state: CapabilityState, id: CapabilityId): CapabilityStatus {
  return state[id]?.status ?? 'UNKNOWN'
}

export interface CapabilityObservation {
  capabilityId: CapabilityId
  direction: 'success' | 'failure' | 'stated_no'
  /** RS attribution rule: only DIAGNOSTIC items — those isolating a single
   *  capability — update strongly. A compound item's FAILURE must not be
   *  emitted at all (failure proves the conjunction failed, not which
   *  conjunct), which `observationsFromTurn` enforces at the writer. */
  diagnostic: boolean
  turnIndex?: number
}

/** Fold observations into the session-tier state. The lattice transition is
 *  delegated to the spine's `foldCapability` — this module never re-implements
 *  it. Pure. */
export function foldCapabilityState(
  prev: CapabilityState | undefined,
  observations: readonly CapabilityObservation[],
): CapabilityState {
  const next: CapabilityState = { ...readCapabilityState(prev) }
  for (const o of observations) {
    if (!isCapabilityId(o.capabilityId)) continue
    const folded = foldCapability(next[o.capabilityId], o.direction, o.diagnostic)
    next[o.capabilityId] = {
      ...folded,
      ...(o.turnIndex !== undefined ? { lastSeenTurn: o.turnIndex } : {}),
    }
  }
  return next
}

/**
 * The writer-side attribution rule, in one place (arch §4.2).
 *
 *   success on a single-capability item  → strong, diagnostic
 *   success on a compound item           → weak, non-diagnostic (proves all)
 *   failure on a single-capability item  → emitted, diagnostic
 *   failure on a compound item           → EMITTED FOR NOTHING. Failure proves
 *                                          the conjunction failed, not which
 *                                          conjunct. Guessing would corrupt
 *                                          every downstream legality check.
 */
export function observationsFromTurn(input: {
  requiredCapabilities: readonly CapabilityId[]
  correct: boolean | null
  turnIndex?: number
}): CapabilityObservation[] {
  const caps = input.requiredCapabilities
  if (caps.length === 0 || input.correct === null) return []
  const isSingle = caps.length === 1
  if (input.correct) {
    return caps.map((capabilityId) => ({
      capabilityId, direction: 'success' as const,
      diagnostic: isSingle, turnIndex: input.turnIndex,
    }))
  }
  if (!isSingle) return []          // the attribution rule, enforced at the writer
  return [{ capabilityId: caps[0], direction: 'failure', diagnostic: true, turnIndex: input.turnIndex }]
}

// ── Stated inability (design §2.1: trusted instantly, cheapest to overturn) ──

const STATED_INABILITY_PATTERNS: ReadonlyArray<[RegExp, CapabilityId]> = [
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+(do\s+)?(multiplication|multiply(ing)?)\b/i, 'multiply'],
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+(do\s+)?(division|divid(e|ing))\b/i, 'divide'],
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+(do\s+)?(fractions?)\b/i, 'fractions'],
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+(do\s+)?(percentages?)\b/i, 'percentage'],
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+read\s+(a\s+)?graph/i, 'read-simple-graph'],
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+(do\s+)?(algebra|rearrange)/i, 'rearrange-equation'],
  [/\bi\s+(can'?t|cannot|don'?t\s+know\s+how\s+to)\s+(do\s+)?vectors?\b/i, 'visualize-vectors'],
  [/\bi'?m\s+(really\s+)?bad\s+at\s+(multiplication|multiplying|times\s+tables)\b/i, 'multiply'],
  [/\bi'?m\s+(really\s+)?bad\s+at\s+fractions?\b/i, 'fractions'],
  [/\bi\s+never\s+learned\s+(long\s+)?division\b/i, 'divide'],
]

/** Server-detected, never LLM-detected (design goal: no LLM-owned capability
 *  state). Returns every capability the learner explicitly disclaimed. */
export function detectStatedInability(message: string): CapabilityId[] {
  const out = new Set<CapabilityId>()
  for (const [re, id] of STATED_INABILITY_PATTERNS) {
    if (re.test(message)) out.add(id)
  }
  return [...out]
}

// ── Legality (arch §6.1 Band 2 — the Capability Legality Filter) ────────────

export type CapabilityBlockKind = 'observed_no' | 'stated_no'

export interface CapabilityVerdict {
  legal: boolean
  /** Capabilities in a NO state that this lesson demands. */
  blocking: Array<{ id: CapabilityId; kind: CapabilityBlockKind }>
  /** Demanded but never observed. NOT illegal — arch §4.2 routes UNKNOWN to a
   *  one-item micro-probe or a capability-first teaching insert, because at
   *  cold start every capability is UNKNOWN and treating that as illegal would
   *  block the first lesson of every learner's life. */
  unknown: CapabilityId[]
  rationale: string | null
}

export function capabilityLegality(
  state: CapabilityState,
  required: readonly CapabilityId[],
): CapabilityVerdict {
  const blocking: CapabilityVerdict['blocking'] = []
  const unknown: CapabilityId[] = []
  for (const id of required) {
    const s = statusOf(state, id)
    if (s === 'OBSERVED_NO') blocking.push({ id, kind: 'observed_no' })
    else if (s === 'STATED_NO') blocking.push({ id, kind: 'stated_no' })
    else if (s === 'UNKNOWN') unknown.push(id)
  }
  if (blocking.length === 0) {
    return { legal: true, blocking, unknown, rationale: null }
  }
  const names = blocking.map((b) => CAPABILITY_LABELS[b.id]).join(' and ')
  const stated = blocking.some((b) => b.kind === 'stated_no')
  return {
    legal: false,
    blocking,
    unknown,
    rationale:
      `This step requires ${names}, which this learner ` +
      (stated ? 'has told you they cannot do' : 'has attempted and not been able to do') +
      '. Do not ask them to perform it. Either teach that operation first, or ' +
      'do that part FOR them and let them do the rest.',
  }
}

/** Capabilities currently in a NO state — the list the Output Verifier's
 *  V-CAP scans for. Single source, so the verifier never re-derives it. */
export function noCapabilities(state: CapabilityState): CapabilityId[] {
  return CAPABILITY_VOCABULARY.filter((id) => {
    const s = statusOf(state, id)
    return s === 'OBSERVED_NO' || s === 'STATED_NO'
  })
}

/**
 * Operation-demand patterns, per capability. Owned here (single owner of
 * capability semantics) and imported by the verifier so there is no second
 * lexicon. Matches the IMPERATIVE form — asking the learner to DO the
 * operation — not a mention of it, so "multiplication is repeated addition"
 * is legal teaching while "multiply 6 by 7" is a demand.
 */
export const CAPABILITY_DEMAND_PATTERNS: Partial<Record<CapabilityId, RegExp>> = {
  'multiply': /\b(multiply|times)\s+(it|them|this|that|these|the|\d|[a-z]\b)/i,
  'divide': /\b(divide|split)\s+(it|them|this|that|the|\d|[a-z]\b)/i,
  'fractions': /\b(simplify|reduce|add)\s+(the\s+)?fractions?\b/i,
  'percentage': /\b(work\s+out|calculate|find)\s+(the\s+)?percentage\b/i,
  'square': /\b(square|find\s+the\s+square\s+of)\s+(it|this|that|\d|[a-z]\b)/i,
  'root': /\b(take|find)\s+the\s+(square\s+)?root\b/i,
  'rearrange-equation': /\b(rearrange|make\s+\w+\s+the\s+subject|isolate)\b/i,
  'solve-linear-equation': /\bsolve\s+(the\s+)?(equation|for\s+[a-z]\b)/i,
  'substitute-into-formula': /\b(substitute|plug\s+(it|them|these|the\s+\w+)\s+in(to)?)\b/i,
  'dimensional-analysis': /\b(check|work\s+out|convert)\s+the\s+units\b/i,
  'balance-equation': /\bbalance\s+(the\s+)?(equation|reaction)\b/i,
  'decompose-vectors': /\b(resolve|decompose|split|break)\s+(it|this|that|them|the\s+\w+)?\s*(down\s+)?(in)?to\s+(its\s+|the\s+)?components?\b/i,
  'read-simple-graph': /\b(read|look\s+at)\s+(the\s+)?graph\s+and\b/i,
  'interpret-slope': /\b(work\s+out|find|calculate)\s+the\s+(slope|gradient)\b/i,
  'trace-execution': /\b(trace|step\s+through)\s+(the\s+)?(code|program|loop)\b/i,
  'proportional-reasoning': /\b(scale|set\s+up)\s+(it|the\s+)?(ratio|proportion)\b/i,
}

// ── Recovery routing (the concept-vs-operation distinction) ─────────────────

export type FailureKind = 'capability_missing' | 'concept_missing'

/**
 * The distinction the brief asks for, and it changes the teaching action
 * completely:
 *
 *   concept_missing     the learner does not yet hold the idea →
 *                       teach the concept (Recovery Engine, normal path)
 *   capability_missing  the learner holds the idea but cannot perform an
 *                       operation the task demands → teaching the concept
 *                       AGAIN will not help. Repair the operation, or remove
 *                       it from the task and let them do the conceptual part.
 *
 * Mis-routing here is the "harder than the lesson" bug: a learner who
 * understands Newton's Second Law perfectly and cannot divide looks, on a
 * score, exactly like a learner who does not understand the law.
 */
export function classifyFailure(
  state: CapabilityState,
  required: readonly CapabilityId[],
): { kind: FailureKind; blockingCapabilities: CapabilityId[] } {
  const verdict = capabilityLegality(state, required)
  if (!verdict.legal) {
    return { kind: 'capability_missing', blockingCapabilities: verdict.blocking.map((b) => b.id) }
  }
  return { kind: 'concept_missing', blockingCapabilities: [] }
}

/** The one-line directive addition for a capability-missing turn. Shapes HOW
 *  the renderer speaks; decides nothing. */
export function buildCapabilityRepairLine(blocking: readonly CapabilityId[]): string {
  const names = blocking.map((id) => CAPABILITY_LABELS[id]).join(' and ')
  return (
    `- CAPABILITY GAP: the learner is not stuck on the idea — they cannot yet perform ${names}. ` +
    'Re-explaining the concept will not help. Either do that operation for them out loud ' +
    'so the concept still lands, or switch to teaching that operation directly. ' +
    'Never imply they should already be able to do it.'
  )
}
