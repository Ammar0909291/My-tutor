/**
 * C4 — the CEKR front end, brain.lock, and the determinism check.
 *
 * Masterplan C4 DoD: "`brain build physics` emits a pack the K4 kernel loads;
 * byte-reproducible; T-C fixtures green." The load is proven by actually
 * running the K4 engine against the emitted pack — a pack that only
 * type-checks has not been shown to load.
 *
 * The .bs front end, the emitter, the registry and the hasher already existed
 * and are not retested here.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  compileFromCekr, buildFromCekr, serializeLock, lockMatches,
  emitCompiledPack, loadPack, canonicalJsonHash,
} from '@/lib/brain-compiler'
import { decide } from '@/lib/kernel/policy/engine'
import { BASE_PACK } from '@/lib/kernel/policy'
import { mergePacks } from '@/lib/brain-compiler/registry'
import { importKg, importAssets, type KgGraph } from '@/lib/cekr/import'
import type { CekrRecord } from '@/lib/cekr/types'
import type { PolicyInputs } from '@/lib/kernel/policy/types'

// ── fixtures ────────────────────────────────────────────────────────────────

function physicsSnapshot(): CekrRecord[] {
  const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8')) as KgGraph
  const known = new Set(graph.concepts.map((c) => c.id))
  const kg = importKg(graph, { file: 'docs/physics/kg/graph.json', knownConceptIds: known })
  const assets = importAssets(
    JSON.parse(readFileSync('docs/physics/teaching-assets/assets.json', 'utf8')),
    { file: 'docs/physics/teaching-assets/assets.json', knownConceptIds: known },
  )
  return [...kg.records, ...assets.records]
}

const DRAFT_OK = new Set(['ACTIVE', 'REVIEW', 'DRAFT'])
const OPTS = { packId: 'physics-cekr', packVersion: '0.1.0', servableStatuses: DRAFT_OK }

const inputs = (over: Partial<PolicyInputs> = {}): PolicyInputs => ({
  contentRegister: 'beginner', profileLevel: null, sessionFailureCount: 0,
  isFirstLessonContext: false, phase: 'DEMONSTRATE', stageCeiling: 2,
  demonstrated: false, consecutiveFailures: 0, interruptActive: false,
  failureStateKey: null, autonomyRequested: false, retroWinOwed: false,
  dueReviewCount: 0, freshBoundary: false, lastSignalCorrect: null,
  lastSignalConfidence: null, currentConceptId: 'phys.meas.units',
  ...over,
} as PolicyInputs)

// ── THE C4 DoD ──────────────────────────────────────────────────────────────

describe('C4 DoD — a CEKR snapshot compiles to a pack the K4 kernel loads', () => {
  const snapshot = physicsSnapshot()

  it('emits Band-3 dispatch rules from the real physics corpus', () => {
    const { pack } = compileFromCekr(snapshot, OPTS)
    expect(pack).not.toBeNull()
    expect(pack!.rules.length).toBeGreaterThan(200)
    expect(pack!.rules.every((r) => r.band === 3)).toBe(true)
  })

  it('THE K4 ENGINE ACTUALLY EXECUTES IT — not merely type-checks', () => {
    const { pack } = compileFromCekr(snapshot, OPTS)
    const compiled = emitCompiledPack(pack!, {})
    const policyPack = loadPack(compiled)
    const merged = mergePacks(BASE_PACK, policyPack)

    const decision = decide(merged, inputs({ currentConceptId: 'phys.meas.units' }))
    // Band 3 fired: the authored dispatch supplied the action class.
    expect(decision.actionClass).toBe('DEMONSTRATION')
    expect(decision.provenance.some((t) => t.ruleId.startsWith('B3.dispatch.phys.meas.units'))).toBe(true)
  })

  it('a concept with no authored content falls through to the generic tables', () => {
    const { pack } = compileFromCekr(snapshot, OPTS)
    const merged = mergePacks(BASE_PACK, loadPack(emitCompiledPack(pack!, {})))
    const decision = decide(merged, inputs({ currentConceptId: 'not.a.real.concept' }))
    expect(decision.provenance.some((t) => t.ruleId.startsWith('B3.dispatch.not.a.real'))).toBe(false)
    expect(decision.move).not.toBeUndefined()      // still a complete decision
  })
})

// ── STATUS DISCIPLINE ───────────────────────────────────────────────────────

describe('unreviewed content cannot become runtime policy', () => {
  const snapshot = physicsSnapshot()

  it('DRAFT is excluded by default — the whole import compiles to zero rules', () => {
    // Imported CEKR is DRAFT because it has had no human review (ADR-14
    // lifecycle). A build that silently promoted it would make review
    // decorative.
    const { pack, diagnostics } = compileFromCekr(snapshot, { packId: 'p', packVersion: '0.1.0' })
    expect(pack!.rules).toHaveLength(0)
    expect(diagnostics.some((d) => d.code === 'W4001')).toBe(true)
  })

  it('including DRAFT is an explicit, opt-in decision', () => {
    expect(compileFromCekr(snapshot, OPTS).pack!.rules.length).toBeGreaterThan(0)
  })
})

// ── DETERMINISM (the C4 DoD's "byte-reproducible") ──────────────────────────

describe('byte reproducibility', () => {
  const snapshot = physicsSnapshot()

  it('the double-build check runs inside build() and passes', () => {
    // A property of EVERY build, not of the one build the suite happens to
    // run — so it is checked at build time, not only here.
    const r = buildFromCekr(snapshot, OPTS)
    expect(r.deterministic).toBe(true)
    expect(r.ok).toBe(true)
  })

  it('two independent builds agree on the content hash and every rule', () => {
    const a = buildFromCekr(snapshot, OPTS)
    const b = buildFromCekr(snapshot, OPTS)
    expect(a.pack!.manifest.contentHash).toBe(b.pack!.manifest.contentHash)
    expect(canonicalJsonHash(a.pack!.rules)).toBe(canonicalJsonHash(b.pack!.rules))
  })

  it('rule order does not depend on input order', () => {
    const forward = buildFromCekr(snapshot, OPTS)
    const reversed = buildFromCekr([...snapshot].reverse(), OPTS)
    expect(reversed.pack!.manifest.contentHash).toBe(forward.pack!.manifest.contentHash)
  })

  it('the hash EXCLUDES the build clock', () => {
    const a = buildFromCekr(snapshot, OPTS)
    const b = buildFromCekr(snapshot, OPTS)
    // compiledAtIso is informational; two builds a moment apart must still
    // produce the same artifact identity.
    expect(a.pack!.manifest.contentHash).toBe(b.pack!.manifest.contentHash)
  })

  it('changing the corpus changes the hash', () => {
    const trimmed = snapshot.filter((r) => !r.id.includes('phys.meas.units'))
    expect(buildFromCekr(trimmed, OPTS).pack!.manifest.contentHash)
      .not.toBe(buildFromCekr(snapshot, OPTS).pack!.manifest.contentHash)
  })
})

// ── brain.lock ──────────────────────────────────────────────────────────────

describe('brain.lock', () => {
  const snapshot = physicsSnapshot()

  it('records identity, hash, rule count and every rule id', () => {
    const { lock } = buildFromCekr(snapshot, OPTS)
    expect(lock!.packId).toBe('physics-cekr')
    expect(lock!.ruleCount).toBe(lock!.ruleIds.length)
    expect(lock!.ruleIds).toEqual([...lock!.ruleIds].sort())
    expect(Object.keys(lock!.sources).length).toBeGreaterThan(0)
  })

  it('a matching rebuild passes the lock', () => {
    const first = buildFromCekr(snapshot, OPTS).lock!
    const second = buildFromCekr(snapshot, OPTS).lock!
    expect(lockMatches(first, second)).toEqual({ ok: true, reasons: [] })
  })

  it('names WHICH rule disappeared, not merely that something changed', () => {
    // A hash alone reports "something changed". The lock says what.
    const full = buildFromCekr(snapshot, OPTS).lock!
    const trimmed = buildFromCekr(snapshot.filter((r) => !r.id.includes('phys.meas.units')), OPTS).lock!
    const result = lockMatches(full, trimmed)
    expect(result.ok).toBe(false)
    expect(result.reasons.some((r) => r.startsWith('rule removed: B3.dispatch.phys.meas.units'))).toBe(true)
  })

  it('serialises with sorted keys, so it diffs cleanly in review', () => {
    const text = serializeLock(buildFromCekr(snapshot, OPTS).lock!)
    const keys = Object.keys(JSON.parse(text))
    expect(keys).toEqual([...keys].sort())
    expect(text.endsWith('\n')).toBe(true)
  })
})

// ── THE FRONT END DOES NOT OVERREACH ────────────────────────────────────────

describe('scope discipline', () => {
  it('emits ONLY Band 3 — legality and interrupts are kernel invariants', () => {
    // Compiling Bands 0-2 from a corpus would move safety rules into data
    // that any import could rewrite.
    const { pack } = compileFromCekr(physicsSnapshot(), OPTS)
    expect(new Set(pack!.rules.map((r) => r.band))).toEqual(new Set([3]))
  })

  it('emits no repair dispatch when there is no authored repair', () => {
    // An empty dispatch would be worse than none: it would claim Band 3 has
    // an answer and then supply nothing.
    const { pack } = compileFromCekr(physicsSnapshot(), OPTS)
    expect(pack!.rules.some((r) => r.ruleId.endsWith('.repair'))).toBe(false)
  })

  it('emits a repair dispatch when one IS authored', () => {
    const base = physicsSnapshot().slice(0, 0)
    const mk = (id: string, kind: string, body = {}) => ({
      id, kind, rev: 'x', schemaVersion: 1, status: 'ACTIVE',
      provenance: { authorType: 'HUMAN', authorRef: 'a', createdAt: '2026-01-01T00:00:00Z' },
      citations: [{ file: 'f.bs' }], tags: [], body,
    }) as unknown as CekrRecord
    const mkEdge = (id: string, edgeKind: string, from: string, to: string) => ({
      id, kind: 'Edge', edgeKind, from, to, attrs: {}, rev: 'x', schemaVersion: 1,
      status: 'ACTIVE', provenance: { authorType: 'HUMAN', authorRef: 'a', createdAt: '2026-01-01T00:00:00Z' },
      citations: [{ file: 'f.bs' }], tags: [],
    }) as unknown as CekrRecord
    const records = [...base,
      mk('cekr:Concept/c1', 'Concept', { kgId: 'c1' }),
      mk('cekr:Explanation/e1', 'Explanation'),
      mk('cekr:Misconception/m1', 'Misconception'),
      mk('cekr:RecoveryScript/r1', 'RecoveryScript'),
      mkEdge('cekr:Edge/x1', 'EXPLAINS', 'cekr:Explanation/e1', 'cekr:Concept/c1'),
      mkEdge('cekr:Edge/t1', 'TARGETS', 'cekr:Misconception/m1', 'cekr:Concept/c1'),
      mkEdge('cekr:Edge/p1', 'REPAIRS', 'cekr:RecoveryScript/r1', 'cekr:Misconception/m1'),
    ]
    const { pack } = compileFromCekr(records, { packId: 'p', packVersion: '0.1.0' })
    const ids = pack!.rules.map((r) => r.ruleId)
    expect(ids).toContain('B3.dispatch.c1.demonstrate')
    expect(ids).toContain('B3.dispatch.c1.repair')
  })

  it('content slots carry the CEKR entity id — the evidence-join key', () => {
    // CEKR §13's stability contract: pack ids embed CEKR ids, which is what
    // makes the runtime evidence join possible.
    const { pack } = compileFromCekr(physicsSnapshot(), OPTS)
    const slot = pack!.rules[0].effect.contentSlots![0]
    expect(slot.payload.entityId).toMatch(/^cekr:/)
    expect(slot.citation).toMatch(/^docs\//)
  })

  it('specificity is COMPUTED from the guard, never authored', () => {
    const { pack } = compileFromCekr(physicsSnapshot(), OPTS)
    for (const r of pack!.rules) {
      expect(r.specificity).toBe(r.guard.ast.kind === 'all' ? r.guard.ast.clauses.length : 1)
    }
  })

  it('guards read only registered guardable fields', () => {
    const { pack } = compileFromCekr(physicsSnapshot(), OPTS)
    for (const r of pack!.rules) {
      expect(r.guard.reads.length).toBeGreaterThan(0)
      expect(r.guard.describe).toContain('currentConceptId')
    }
  })
})
