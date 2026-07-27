/**
 * C1 — the fixture museum, the V-code battery, and the round-trip DoD.
 *
 * Masterplan C1 Definition of Done: "fixture museum passes; the seed concept
 * entries hand-encoded as CEKR round-trip losslessly." Both are asserted here.
 */
import { describe, it, expect } from 'vitest'
import {
  KINDS, KIND_FAMILIES, EDGE_KINDS, EDGE_TYPING, FAMILY_OF, ACYCLIC_EDGE_KINDS,
  CURRENT_SCHEMA_VERSION, isKind, isEdgeKind, makeEntityId, parseEntityId,
  type CekrEnvelope, type CekrEdge, type Kind,
} from '@/lib/cekr/types'
import {
  revisionHash, revisionBasis, revisionMatches, withRevision,
  serialize, deserialize, roundTrips, canonicalize,
} from '@/lib/cekr/canonical'
import { validateRecord, validateCorpus, isValid, type Corpus } from '@/lib/cekr/validate'
import { CekrStore, memoryFs, revisionPath, HEAD_PATH } from '@/lib/cekr/store'

// ── fixtures ────────────────────────────────────────────────────────────────

const entity = (over: Partial<CekrEnvelope> = {}): CekrEnvelope => withRevision({
  id: makeEntityId('Concept', 'phys.mech.newtons-second-law'),
  kind: 'Concept',
  rev: '',
  schemaVersion: 1,
  status: 'DRAFT',
  provenance: { authorType: 'HUMAN', authorRef: 'author@example.test', createdAt: '2026-07-27T00:00:00.000Z' },
  citations: [{ file: 'educational-brain/concepts/physics/newtons-second-law.md', heading: 'Identity' }],
  tags: [],
  body: { title: "Newton's Second Law", prereqsComplete: true },
  ...over,
} as CekrEnvelope)

const edge = (over: Partial<CekrEdge> = {}): CekrEdge => withRevision({
  id: 'cekr:Edge/req-1',
  kind: 'Edge',
  edgeKind: 'REQUIRES',
  rev: '',
  schemaVersion: 1,
  status: 'DRAFT',
  provenance: { authorType: 'HUMAN', authorRef: 'a@b.test', createdAt: '2026-07-27T00:00:00.000Z' },
  citations: [{ file: 'x.md' }],
  tags: [],
  from: makeEntityId('Concept', 'a'),
  to: makeEntityId('Concept', 'b'),
  attrs: { strength: 'HARD' },
  ...over,
} as CekrEdge)

// ── REGISTRIES (CEKR §2.2, §3) ──────────────────────────────────────────────

describe('registries are closed sets', () => {
  it('declares 31 kinds across 6 families', () => {
    expect(KINDS).toHaveLength(31)
    expect(Object.keys(KIND_FAMILIES)).toHaveLength(6)
    expect(new Set(KINDS).size).toBe(31)          // no duplicates
  })

  it('every kind has exactly one family', () => {
    for (const k of KINDS) expect(FAMILY_OF[k]).toBeDefined()
    expect(Object.keys(FAMILY_OF)).toHaveLength(31)
  })

  it('declares 24 edge kinds, each with typing', () => {
    expect(EDGE_KINDS).toHaveLength(24)
    for (const e of EDGE_KINDS) expect(EDGE_TYPING[e]).toBeDefined()
  })

  it('every typed endpoint names a REAL kind — no dangling registry entries', () => {
    for (const e of EDGE_KINDS) {
      for (const side of ['from', 'to'] as const) {
        for (const k of EDGE_TYPING[e][side] ?? []) expect(isKind(k)).toBe(true)
      }
    }
  })

  it('acyclic edge kinds are all registered', () => {
    for (const e of ACYCLIC_EDGE_KINDS) expect(isEdgeKind(e)).toBe(true)
  })

  it('every kind has a registered schemaVersion', () => {
    for (const k of KINDS) expect(CURRENT_SCHEMA_VERSION[k]).toBeGreaterThanOrEqual(1)
  })

  it('the id grammar round-trips', () => {
    for (const k of KINDS) {
      const id = makeEntityId(k, 'some.slug-1')
      expect(parseEntityId(id)).toEqual({ kind: k, slug: 'some.slug-1' })
    }
    expect(parseEntityId('not-an-id')).toBeNull()
    expect(parseEntityId('cekr:Concept/Bad Slug')).toBeNull()
  })
})

// ── IDENTITY (CEKR §10) ─────────────────────────────────────────────────────

describe('revision identity', () => {
  it('is deterministic and content-addressed', () => {
    const a = entity(), b = entity()
    expect(revisionHash(a)).toBe(revisionHash(b))
    expect(revisionHash(a)).toMatch(/^sha256:[0-9a-f]{64}$/)
  })

  it('changes when the BODY changes', () => {
    expect(revisionHash(entity())).not.toBe(revisionHash(entity({ body: { title: 'Other' } })))
  })

  it('does NOT change when lifecycle metadata changes', () => {
    // A status move must not mint a new revision, or review would invalidate
    // every reference to the entity.
    const base = entity()
    for (const patch of [
      { status: 'ACTIVE' as const },
      { tags: ['anything'] },
      { citations: [{ file: 'elsewhere.md' }] },
      { provenance: { authorType: 'IMPORTED' as const, authorRef: 'x', createdAt: '2020-01-01T00:00:00.000Z' } },
    ]) {
      expect(revisionHash({ ...base, ...patch } as CekrEnvelope)).toBe(revisionHash(base))
    }
  })

  it('the basis excludes rev itself (no self-reference)', () => {
    expect(Object.keys(revisionBasis(entity()))).not.toContain('rev')
  })

  it('detects a tampered rev', () => {
    expect(revisionMatches(entity())).toBe(true)
    expect(revisionMatches({ ...entity(), rev: 'sha256:' + '0'.repeat(64) })).toBe(false)
  })

  it('edges are content-addressed on their endpoints', () => {
    expect(revisionHash(edge())).not.toBe(revisionHash(edge({ to: makeEntityId('Concept', 'c') })))
  })

  it('canonicalisation is key-order independent', () => {
    expect(canonicalize({ b: 1, a: 2 })).toBe(canonicalize({ a: 2, b: 1 }))
  })
})

// ── ROUND-TRIP (the C1 DoD) ─────────────────────────────────────────────────

describe('round-trip — the C1 Definition of Done', () => {
  it('a hand-encoded seed concept round-trips losslessly', () => {
    const seed = entity({
      body: {
        title: "Newton's Second Law", prereqsComplete: true,
        core: { claim: 'Acceleration is proportional to net force and inversely proportional to mass.' },
        estimatedHours: 3, unicode: 'F = ma · Δv/Δt · ≈ · 日本語',
      },
    })
    expect(roundTrips(seed)).toBe(true)
    const back = deserialize(serialize(seed))!
    expect(back).toEqual(seed)
    expect(revisionHash(back)).toBe(revisionHash(seed))
  })

  it('edges round-trip losslessly', () => {
    expect(roundTrips(edge())).toBe(true)
  })

  it('serialisation is newline-terminated and diffable', () => {
    expect(serialize(entity()).endsWith('\n')).toBe(true)
  })

  it('deserialize is total — garbage returns null, never throws', () => {
    for (const junk of ['', 'not json', '[]', 'null', '3']) {
      expect(deserialize(junk)).toBeNull()
    }
  })
})

// ── THE V-CODE BATTERY (CEKR §11) ───────────────────────────────────────────

const corpus = (over: Partial<Corpus> = {}): Corpus => ({ entities: [], edges: [], ...over })

describe('V-1 envelope completeness', () => {
  it('passes a complete envelope', () => {
    expect(validateRecord(entity()).filter((f) => f.code === 'V-1')).toEqual([])
  })
  it.each([
    ['no citations', { citations: [] }],
    ['bad status', { status: 'PUBLISHED' as never }],
    ['bad id', { id: 'nope' }],
    ['missing authorRef', { provenance: { authorType: 'HUMAN' as const, authorRef: '', createdAt: '2026-01-01T00:00:00Z' } }],
    ['bad createdAt', { provenance: { authorType: 'HUMAN' as const, authorRef: 'a', createdAt: 'yesterday' } }],
  ])('rejects: %s', (_label, patch) => {
    const findings = validateRecord({ ...entity(), ...patch } as CekrEnvelope)
    expect(findings.some((f) => f.code === 'V-1')).toBe(true)
  })
})

describe('V-2 schema validity and revision integrity', () => {
  it('rejects an unknown kind', () => {
    expect(validateRecord({ ...entity(), kind: 'Nonsense' } as never).some((f) => f.code === 'V-2')).toBe(true)
  })
  it('REFUSES a newer schemaVersion rather than guessing', () => {
    const f = validateRecord({ ...entity(), schemaVersion: 99 } as CekrEnvelope)
    expect(f.some((x) => x.code === 'V-2' && /newer than this reader/.test(x.detail))).toBe(true)
  })
  it("rejects an id whose kind segment disagrees with `kind`", () => {
    const bad = { ...entity(), id: makeEntityId('Skill', 'x') } as CekrEnvelope
    expect(validateRecord(bad).some((f) => f.code === 'V-2' && /disagrees/.test(f.detail))).toBe(true)
  })
  it('rejects a tampered rev', () => {
    const bad = { ...entity(), rev: 'sha256:' + 'f'.repeat(64) } as CekrEnvelope
    expect(validateRecord(bad).some((f) => f.code === 'V-2')).toBe(true)
  })
})

describe('V-3 reference resolution and edge typing', () => {
  it('flags an unresolved reference', () => {
    const c = corpus({ entities: [entity({ id: makeEntityId('Concept', 'a') })], edges: [edge()] })
    expect(validateCorpus(c).some((f) => f.code === 'V-3' && /unresolved to-reference/.test(f.detail))).toBe(true)
  })
  it('flags an illegally typed endpoint', () => {
    const term = entity({ id: makeEntityId('Term', 't'), kind: 'Term' })
    const a = entity({ id: makeEntityId('Concept', 'a') })
    const bad = edge({ from: term.id, to: a.id })         // REQUIRES from a Term
    expect(validateCorpus(corpus({ entities: [term, a], edges: [bad] }))
      .some((f) => f.code === 'V-3' && /may not originate/.test(f.detail))).toBe(true)
  })
})

describe('V-4 acyclicity', () => {
  it('detects a REQUIRES cycle and names it', () => {
    const a = entity({ id: makeEntityId('Concept', 'a') })
    const b = entity({ id: makeEntityId('Concept', 'b') })
    const c = corpus({
      entities: [a, b],
      edges: [
        edge({ id: 'cekr:Edge/e1', from: a.id, to: b.id }),
        edge({ id: 'cekr:Edge/e2', from: b.id, to: a.id }),
      ],
    })
    const f = validateCorpus(c).filter((x) => x.code === 'V-4')
    expect(f).toHaveLength(1)
    expect(f[0].detail).toMatch(/REQUIRES cycle/)
  })
  it('accepts a DAG', () => {
    const a = entity({ id: makeEntityId('Concept', 'a') })
    const b = entity({ id: makeEntityId('Concept', 'b') })
    const c = corpus({ entities: [a, b], edges: [edge({ from: a.id, to: b.id })] })
    expect(validateCorpus(c).filter((x) => x.code === 'V-4')).toEqual([])
  })
})

describe('V-8 REQUIRES/UNLOCKS symmetry', () => {
  const a = entity({ id: makeEntityId('Concept', 'a') })
  const b = entity({ id: makeEntityId('Concept', 'b') })
  it('flags an unmirrored REQUIRES', () => {
    const c = corpus({ entities: [a, b], edges: [edge({ from: a.id, to: b.id })] })
    expect(validateCorpus(c).some((f) => f.code === 'V-8')).toBe(true)
  })
  it('accepts a mirrored pair', () => {
    const c = corpus({
      entities: [a, b],
      edges: [
        edge({ id: 'cekr:Edge/r', from: a.id, to: b.id, edgeKind: 'REQUIRES' }),
        edge({ id: 'cekr:Edge/u', from: b.id, to: a.id, edgeKind: 'UNLOCKS' }),
      ],
    })
    expect(validateCorpus(c).filter((f) => f.code === 'V-8')).toEqual([])
  })
})

describe('V-11 analogy discipline', () => {
  const analogy = (body: Record<string, unknown>) =>
    entity({ id: makeEntityId('Analogy', 'water-circuit'), kind: 'Analogy', body })

  it('requires a retirement boundary', () => {
    const c = corpus({ entities: [analogy({ carries: ['flow'], doesNotCarry: [], breedsNoneAttested: true })] })
    expect(validateCorpus(c).some((f) => f.code === 'V-11' && /retirementBoundary/.test(f.detail))).toBe(true)
  })
  it('rejects carries ∩ doesNotCarry', () => {
    const c = corpus({ entities: [analogy({
      carries: ['flow'], doesNotCarry: ['flow'], retirementBoundary: 'at capacitance',
      breedsNoneAttested: true,
    })] })
    expect(validateCorpus(c).some((f) => f.code === 'V-11' && /∩/.test(f.detail))).toBe(true)
  })
  it('requires the anti-analogy claim to be explicit', () => {
    const c = corpus({ entities: [analogy({ carries: [], doesNotCarry: [], retirementBoundary: 'x' })] })
    expect(validateCorpus(c).some((f) => f.code === 'V-11' && /breedsNoneAttested/.test(f.detail))).toBe(true)
  })
  it('accepts a disciplined analogy', () => {
    const c = corpus({ entities: [analogy({
      carries: ['flow'], doesNotCarry: ['storage'], retirementBoundary: 'at capacitance',
      breedsNoneAttested: true,
    })] })
    expect(validateCorpus(c).filter((f) => f.code === 'V-11')).toEqual([])
  })
})

describe('V-12 distractor discipline', () => {
  const item = (distractors: unknown[]) =>
    entity({ id: makeEntityId('AssessmentItem', 'i1'), kind: 'AssessmentItem', body: { distractors } })

  it('rejects a meaningless wrong answer', () => {
    expect(validateCorpus(corpus({ entities: [item([{ text: '7' }])] }))
      .some((f) => f.code === 'V-12')).toBe(true)
  })
  it('accepts a declared plausible slip', () => {
    expect(validateCorpus(corpus({ entities: [item([{ text: '7', distractorBasis: 'PLAUSIBLE_SLIP' }])] }))
      .filter((f) => f.code === 'V-12')).toEqual([])
  })
  it('accepts a distractor that SIGNALS a misconception', () => {
    const i = item([{ text: '7' }])
    const m = entity({ id: makeEntityId('Misconception', 'm1'), kind: 'Misconception', body: {} })
    const sig = edge({ id: 'cekr:Edge/s', edgeKind: 'SIGNALS', from: i.id, to: m.id, attrs: { distractorIndex: 0 } })
    expect(validateCorpus(corpus({ entities: [i, m], edges: [sig] })).filter((f) => f.code === 'V-12')).toEqual([])
  })
})

describe('V-10 · V-13 · V-14 · V-15 · V-16', () => {
  it('V-10 requires gate+retention+transfer or a stated lighter rationale', () => {
    const mc = (body: Record<string, unknown>) =>
      entity({ id: makeEntityId('MasteryCondition', 'mc'), kind: 'MasteryCondition', body })
    expect(validateCorpus(corpus({ entities: [mc({ proofKinds: ['GATE'] })] }))
      .some((f) => f.code === 'V-10')).toBe(true)
    expect(validateCorpus(corpus({ entities: [mc({ proofKinds: ['GATE'], lighterRationale: 'low-stakes vocabulary' })] }))
      .filter((f) => f.code === 'V-10')).toEqual([])
  })

  it('V-13 keeps renderable markup out of cores', () => {
    const e = entity({ body: { core: { claim: 'Force is **mass** times acceleration' }, prereqsComplete: true } })
    expect(validateCorpus(corpus({ entities: [e] })).some((f) => f.code === 'V-13')).toBe(true)
  })

  it('V-14 forbids ACTIVE under an OPEN conflict', () => {
    const target = entity({ status: 'ACTIVE' })
    const conflict = entity({ id: makeEntityId('Conflict', 'c1'), kind: 'Conflict', body: { state: 'OPEN' } })
    const link = edge({ id: 'cekr:Edge/cf', edgeKind: 'CONFLICTS_WITH', from: conflict.id, to: target.id })
    expect(validateCorpus(corpus({ entities: [target, conflict], edges: [link] }))
      .some((f) => f.code === 'V-14')).toBe(true)
  })

  it('V-15 forbids RETIRED → anything', () => {
    const e = entity({ status: 'ACTIVE' })
    const c = corpus({ entities: [e], previousStatus: { [e.id]: 'RETIRED' } })
    expect(validateCorpus(c).some((f) => f.code === 'V-15')).toBe(true)
  })

  it('V-16 requires a closed-world attestation on ACTIVE Concepts', () => {
    const e = entity({ status: 'ACTIVE', body: { title: 'x' } })
    expect(validateCorpus(corpus({ entities: [e] })).some((f) => f.code === 'V-16')).toBe(true)
  })
})

describe('CEKR permits incomplete constellations (the division of labour)', () => {
  it('a skeleton concept with no explanation or assessment is VALID', () => {
    // Coverage is the COMPILER's release check (EBC §8). CEKR asks only
    // "well-formed and honestly claimed" — collapsing the two would make
    // honest partial authoring (D15 instrumented skeletons) impossible.
    expect(isValid(corpus({ entities: [entity()] }))).toBe(true)
  })
})

describe('findings are stable and diffable', () => {
  it('two runs over the same corpus produce identical output', () => {
    const c = corpus({ entities: [entity({ status: 'ACTIVE', body: { title: 'x' } })], edges: [edge()] })
    expect(validateCorpus(c)).toEqual(validateCorpus(c))
  })
  it('validation never repairs its input', () => {
    const e = entity()
    const snap = JSON.stringify(e)
    validateCorpus(corpus({ entities: [e] }))
    expect(JSON.stringify(e)).toBe(snap)
  })
})

// ── THE STORE (CEKR §9, §10) ────────────────────────────────────────────────

describe('content-addressed store', () => {
  it('commits, reads back, and indexes HEAD', async () => {
    const fs = memoryFs()
    const store = new CekrStore(fs, 'cekr')
    const e = entity()
    const { rev, created } = await store.commit(e)
    expect(created).toBe(true)
    expect(rev).toBe(revisionHash(e))
    expect(await store.read(e.id)).toEqual({ ...e, rev })
    const head = await store.readHead()
    expect(head[e.id].rev).toBe(rev)
    expect(head[e.id].previousRev).toBeNull()
  })

  it('re-committing identical content is a NO-OP', async () => {
    const store = new CekrStore(memoryFs(), 'cekr')
    const e = entity()
    await store.commit(e)
    const second = await store.commit(e)
    expect(second.created).toBe(false)
    expect(second.rev).toBe(revisionHash(e))
  })

  it('a new revision chains to its predecessor', async () => {
    const store = new CekrStore(memoryFs(), 'cekr')
    const v1 = entity()
    const v2 = withRevision({ ...v1, body: { title: 'Revised', prereqsComplete: true } })
    const r1 = await store.commit(v1)
    const r2 = await store.commit(v2)
    expect(r2.rev).not.toBe(r1.rev)
    const head = await store.readHead()
    expect(head[v1.id].previousRev).toBe(r1.rev)
    // The OLD revision is still readable — revisions are immutable.
    expect(await store.read(v1.id, r1.rev)).toEqual({ ...v1, rev: r1.rev })
  })

  it('never rewrites a revision file', async () => {
    const fs = memoryFs()
    const store = new CekrStore(fs, 'cekr')
    const e = entity()
    const { rev } = await store.commit(e)
    const path = `cekr/${revisionPath(e, rev)}`
    const before = fs.files.get(path)
    await store.commit(e)
    expect(fs.files.get(path)).toBe(before)
  })

  it('HEAD.json is sorted, so diffs are reviewable', async () => {
    const store = new CekrStore(memoryFs(), 'cekr')
    await store.commit(entity({ id: makeEntityId('Concept', 'zebra') }))
    await store.commit(entity({ id: makeEntityId('Concept', 'apple') }))
    const raw = (await new CekrStore(
      (store as unknown as { fs: ReturnType<typeof memoryFs> }).fs, 'cekr',
    ).readHead())
    expect(Object.keys(raw)).toEqual([...Object.keys(raw)].sort())
  })

  it('a status move keeps the revision but updates HEAD', async () => {
    const store = new CekrStore(memoryFs(), 'cekr')
    const draft = entity({ status: 'DRAFT' })
    const { rev } = await store.commit(draft)
    await store.commit({ ...draft, status: 'ACTIVE' })
    const head = await store.readHead()
    expect(head[draft.id].status).toBe('ACTIVE')
    expect(head[draft.id].rev).toBe(rev)          // identity unchanged
  })

  it('snapshot returns the whole corpus in stable order', async () => {
    const store = new CekrStore(memoryFs(), 'cekr')
    await store.commit(entity({ id: makeEntityId('Concept', 'b') }))
    await store.commit(entity({ id: makeEntityId('Concept', 'a') }))
    const snap = await store.snapshot()
    expect(snap.map((r) => r.id)).toEqual([
      makeEntityId('Concept', 'a'), makeEntityId('Concept', 'b'),
    ])
  })

  it('reads nothing for an unknown id', async () => {
    expect(await new CekrStore(memoryFs(), 'cekr').read('cekr:Concept/ghost')).toBeNull()
  })

  it('an empty store has an empty HEAD', async () => {
    expect(await new CekrStore(memoryFs(), 'cekr').readHead()).toEqual({})
    expect(HEAD_PATH).toBe('HEAD.json')
  })

  it('a corrupt HEAD degrades to empty rather than throwing', async () => {
    const store = new CekrStore(memoryFs({ 'cekr/HEAD.json': 'not json' }), 'cekr')
    expect(await store.readHead()).toEqual({})
  })

  it('stored records still validate after a round-trip through the store', async () => {
    const store = new CekrStore(memoryFs(), 'cekr')
    const e = entity()
    await store.commit(e)
    const back = await store.read(e.id)
    expect(validateRecord(back!)).toEqual([])
  })
})
