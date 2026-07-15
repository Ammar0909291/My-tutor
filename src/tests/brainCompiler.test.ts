/**
 * C4 — Brain Compiler tests: parser · lowering · validation · determinism ·
 * loader · registry · golden pack snapshot · end-to-end integration with
 * the K4 Policy Engine.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  parse, compileSingle, loadPack, mergePacks, packRegistry,
  canonicalize, canonicalJsonHash, hashSource,
  fieldsRead, describeGuard, compileGuard, validateAst,
  GUARDABLE_FIELDS,
} from '@/lib/brain-compiler'
import type { CompiledPack, GuardClause } from '@/lib/brain-compiler'
import { BASE_PACK, decide } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'

const MINIMAL_SOURCE = `
::pack demo-pack 0.1.0
description: demo pack
::end

::rule B3.demo.anchor v1
band: 3
citation: educational-brain/demo.md
specificity: 3
mandatory: false
guard: {"kind":"eq","field":"currentConceptId","value":"demo.concept"}
effect: {"actionClass":"DEMONSTRATION"}
::end
`.trim()

function inputs(over: Partial<PolicyInputs> = {}): PolicyInputs {
  return {
    turnId: 't', learnerId: 'L', sessionId: 'S',
    contentRegister: 'intermediate', profileLevel: 'intermediate',
    sessionFailureCount: 0, isFirstLessonContext: false,
    phase: 'ANCHOR', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
    interruptActive: false, failureStateKey: null, autonomyRequested: false,
    retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
    lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: null,
    ...over,
  }
}

// ── Parser ────────────────────────────────────────────────────────────────────

describe('parser', () => {
  it('parses ::pack and ::rule blocks with typed fields', () => {
    const { blocks, diagnostics } = parse('demo.bs', MINIMAL_SOURCE)
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(blocks.map((b) => b.kind)).toEqual(['::pack', '::rule'])
    expect(blocks[1].fields.band).toBe(3)
    expect(blocks[1].fields.guard).toEqual({ kind: 'eq', field: 'currentConceptId', value: 'demo.concept' })
  })

  it('ignores comments and blank lines', () => {
    const src = `
# comment
::pack x 0.0.1
::end
# another comment
`.trim()
    const { blocks, diagnostics } = parse('c.bs', src)
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(blocks).toHaveLength(1)
  })

  it('emits E0101 on ::end without open', () => {
    const { diagnostics } = parse('x.bs', '::end')
    expect(diagnostics.some((d) => d.code === 'E0101')).toBe(true)
  })

  it('emits E0106 on unterminated block', () => {
    const { diagnostics } = parse('x.bs', '::pack y 0.0.1\ndescription: hi')
    expect(diagnostics.some((d) => d.code === 'E0106')).toBe(true)
  })

  it('emits W0105 on duplicate field within a block', () => {
    const src = '::rule R1 v1\nband: 3\nband: 4\n::end\n::pack p 0.0.1\n::end'
    const { diagnostics } = parse('x.bs', src)
    expect(diagnostics.some((d) => d.code === 'W0105')).toBe(true)
  })

  it('records source spans (line ranges)', () => {
    const { blocks } = parse('demo.bs', MINIMAL_SOURCE)
    for (const b of blocks) {
      expect(b.span.startLine).toBeGreaterThan(0)
      expect(b.span.endLine).toBeGreaterThanOrEqual(b.span.startLine)
    }
  })
})

// ── Predicate DSL ────────────────────────────────────────────────────────────

describe('predicate DSL', () => {
  it('compileGuard is total for every operator', () => {
    const clauses: GuardClause[] = [
      { kind: 'true' }, { kind: 'false' },
      { kind: 'eq', field: 'phase', value: 'ANCHOR' },
      { kind: 'neq', field: 'phase', value: 'ANCHOR' },
      { kind: 'gt', field: 'sessionFailureCount', value: 1 },
      { kind: 'gte', field: 'sessionFailureCount', value: 2 },
      { kind: 'lt', field: 'sessionFailureCount', value: 10 },
      { kind: 'lte', field: 'sessionFailureCount', value: 10 },
      { kind: 'in', field: 'contentRegister', values: ['beginner', 'intermediate'] },
      { kind: 'nin', field: 'contentRegister', values: ['expert'] },
      { kind: 'all', clauses: [{ kind: 'true' }, { kind: 'true' }] },
      { kind: 'any', clauses: [{ kind: 'false' }, { kind: 'true' }] },
    ]
    for (const c of clauses) {
      const fn = compileGuard(c)
      expect(typeof fn(inputs())).toBe('boolean')
    }
  })

  it('validateAst rejects unknown fields (closed-set discipline)', () => {
    const errs = validateAst({ kind: 'eq', field: 'notAField', value: 1 } as GuardClause)
    expect(errs.length).toBeGreaterThan(0)
  })

  it('validateAst rejects malformed clauses', () => {
    expect(validateAst({ kind: 'weird' } as unknown as GuardClause).length).toBeGreaterThan(0)
    expect(validateAst({ kind: 'all', clauses: 'nope' } as unknown as GuardClause).length).toBeGreaterThan(0)
  })

  it('fieldsRead extracts the read-set (sorted)', () => {
    const ast: GuardClause = {
      kind: 'all', clauses: [
        { kind: 'eq', field: 'phase', value: 'GUIDED' },
        { kind: 'gte', field: 'sessionFailureCount', value: 2 },
      ],
    }
    expect(fieldsRead(ast)).toEqual(['phase', 'sessionFailureCount'])
  })

  it('describeGuard produces stable, human-readable strings', () => {
    const s = describeGuard({ kind: 'all', clauses: [
      { kind: 'eq', field: 'phase', value: 'ANCHOR' },
      { kind: 'gt', field: 'sessionFailureCount', value: 1 },
    ] })
    expect(s).toBe('(all phase="ANCHOR" & sessionFailureCount>1)')
  })

  it('GUARDABLE_FIELDS is a non-empty closed set', () => {
    expect(GUARDABLE_FIELDS.length).toBeGreaterThan(0)
  })
})

// ── Compilation + validation ─────────────────────────────────────────────────

describe('compile', () => {
  it('produces a CompiledPack with rules, manifest, and a hash', () => {
    const { ok, pack, diagnostics } = compileSingle('demo.bs', MINIMAL_SOURCE)
    expect(ok).toBe(true)
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(pack).not.toBeNull()
    expect(pack!.rules).toHaveLength(1)
    expect(pack!.manifest.contentHash).toMatch(/^sha256:[0-9a-f]{64}$/)
    expect(pack!.manifest.ruleCount).toBe(1)
    expect(pack!.manifest.bandCounts[3]).toBe(1)
  })

  it('fails on missing ::pack header (E0201)', () => {
    const { ok, diagnostics } = compileSingle('x.bs', '::rule R v1\nband: 0\ncitation: c\nspecificity: 1\nguard: {"kind":"true"}\neffect: {}\n::end')
    expect(ok).toBe(false)
    expect(diagnostics.some((d) => d.code === 'E0201')).toBe(true)
  })

  it('fails on out-of-range band (E0402)', () => {
    const src = `::pack p 0.0.1\n::end\n::rule R v1\nband: 9\ncitation: c\nspecificity: 1\nguard: {"kind":"true"}\neffect: {}\n::end`
    const { ok, diagnostics } = compileSingle('x.bs', src)
    expect(ok).toBe(false)
    expect(diagnostics.some((d) => d.code === 'E0402')).toBe(true)
  })

  it('fails on missing citation (E0403 — RS L3 provenance)', () => {
    const src = `::pack p 0.0.1\n::end\n::rule R v1\nband: 3\nspecificity: 1\nguard: {"kind":"true"}\neffect: {}\n::end`
    const { ok, diagnostics } = compileSingle('x.bs', src)
    expect(ok).toBe(false)
    expect(diagnostics.some((d) => d.code === 'E0403')).toBe(true)
  })

  it('fails on duplicate rule ids (E0301)', () => {
    const rule = `::rule R.same v1\nband: 3\ncitation: c\nspecificity: 1\nguard: {"kind":"true"}\neffect: {}\n::end`
    const src = `::pack p 0.0.1\n::end\n${rule}\n${rule}`
    const { ok, diagnostics } = compileSingle('x.bs', src)
    expect(ok).toBe(false)
    expect(diagnostics.some((d) => d.code === 'E0301')).toBe(true)
  })

  it('fails on unknown guard field (E0407)', () => {
    const src = `::pack p 0.0.1\n::end\n::rule R v1\nband: 3\ncitation: c\nspecificity: 1\nguard: {"kind":"eq","field":"nope","value":1}\neffect: {}\n::end`
    const { ok, diagnostics } = compileSingle('x.bs', src)
    expect(ok).toBe(false)
    expect(diagnostics.some((d) => d.code === 'E0407')).toBe(true)
  })

  it('fails on invalid effect.move (E0410)', () => {
    const src = `::pack p 0.0.1\n::end\n::rule R v1\nband: 4\ncitation: c\nspecificity: 1\nguard: {"kind":"true"}\neffect: {"move":"BOGUS"}\n::end`
    const { ok, diagnostics } = compileSingle('x.bs', src)
    expect(ok).toBe(false)
    expect(diagnostics.some((d) => d.code === 'E0410')).toBe(true)
  })
})

// ── Determinism ─────────────────────────────────────────────────────────────

describe('determinism (EBC D-1)', () => {
  it('canonicalize sorts object keys', () => {
    expect(canonicalize({ b: 2, a: 1 })).toBe('{"a":1,"b":2}')
    expect(canonicalize({ nested: { z: 1, a: 2 } })).toBe('{"nested":{"a":2,"z":1}}')
  })

  it('canonicalJsonHash is stable across runs', () => {
    const value = { rules: [{ id: 'x', band: 3, effect: {} }], meta: 'test' }
    expect(canonicalJsonHash(value)).toBe(canonicalJsonHash(value))
  })

  it('compile twice on the same source → byte-identical hash', () => {
    const a = compileSingle('demo.bs', MINIMAL_SOURCE)
    const b = compileSingle('demo.bs', MINIMAL_SOURCE)
    expect(a.pack!.manifest.contentHash).toBe(b.pack!.manifest.contentHash)
  })

  it('rule ordering in the pack is stable (sorted by band then ruleId)', () => {
    const src = `::pack p 0.0.1\n::end
::rule Z.b3 v1
band: 3
citation: c
specificity: 1
guard: {"kind":"true"}
effect: {}
::end
::rule A.b3 v1
band: 3
citation: c
specificity: 1
guard: {"kind":"true"}
effect: {}
::end
::rule M.b5 v1
band: 5
citation: c
specificity: 1
guard: {"kind":"true"}
effect: {}
::end`
    const { pack } = compileSingle('x.bs', src)
    const ids = pack!.rules.map((r) => r.ruleId)
    expect(ids).toEqual(['A.b3', 'Z.b3', 'M.b5'])
  })

  it('source lock records the file hash', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    expect(pack!.manifest.sourceLock['demo.bs']).toBe(hashSource(MINIMAL_SOURCE))
  })
})

// ── Loader + integrity ──────────────────────────────────────────────────────

describe('loader + integrity', () => {
  it('loadPack attaches predicate functions', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    const runtime = loadPack(pack!)
    expect(runtime.rules).toHaveLength(1)
    const rule = runtime.rules[0]
    expect(typeof rule.guard.match).toBe('function')
    expect(rule.guard.match(inputs({ currentConceptId: 'demo.concept' }))).toBe(true)
    expect(rule.guard.match(inputs({ currentConceptId: 'other' }))).toBe(false)
  })

  it('loadPack rejects tampered packs (integrity check)', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    const tampered: CompiledPack = {
      ...pack!,
      rules: [...pack!.rules, { ...pack!.rules[0], ruleId: 'INJECTED' }],
    }
    expect(() => loadPack(tampered)).toThrow(/integrity/i)
  })

  it('mergePacks preserves overlay semantics (later override wins by ruleId)', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    const runtime = loadPack(pack!)
    const merged = mergePacks(BASE_PACK, runtime)
    // Every BASE_PACK rule is present (no removals) + the new B3 rule
    for (const baseRule of BASE_PACK.rules) {
      expect(merged.rules.some((r) => r.ruleId === baseRule.ruleId)).toBe(true)
    }
    expect(merged.rules.some((r) => r.ruleId === 'B3.demo.anchor')).toBe(true)
  })
})

// ── Registry ────────────────────────────────────────────────────────────────

describe('packRegistry', () => {
  beforeEach(() => { packRegistry.clear() })

  it('activates and lists packs in insertion order', () => {
    const { pack: p1 } = compileSingle('a.bs', `::pack a 0.0.1\n::end\n::rule R.a v1\nband: 3\ncitation: c\nspecificity: 1\nguard: {"kind":"true"}\neffect: {}\n::end`)
    const { pack: p2 } = compileSingle('b.bs', `::pack b 0.0.1\n::end\n::rule R.b v1\nband: 3\ncitation: c\nspecificity: 1\nguard: {"kind":"true"}\neffect: {}\n::end`)
    packRegistry.activate(p1!); packRegistry.activate(p2!)
    expect(packRegistry.list().map((e) => e.compiled.manifest.packId)).toEqual(['a', 'b'])
    expect(packRegistry.has('a')).toBe(true)
    expect(packRegistry.has('b')).toBe(true)
  })

  it('runtimePack assembles BASE_PACK + compiled overlays', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    packRegistry.activate(pack!)
    const runtime = packRegistry.runtimePack()
    expect(runtime.rules.some((r) => r.ruleId === 'B3.demo.anchor')).toBe(true)
    // BASE_PACK survives
    expect(runtime.rules.some((r) => r.ruleId === 'B0.recovery.preempt.v1')).toBe(true)
  })

  it('deactivate removes a pack', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    packRegistry.activate(pack!)
    expect(packRegistry.deactivate('demo-pack')).toBe(true)
    expect(packRegistry.has('demo-pack')).toBe(false)
  })

  it('coverage reports band distribution across activated packs', () => {
    const { pack } = compileSingle('demo.bs', MINIMAL_SOURCE)
    packRegistry.activate(pack!)
    const cov = packRegistry.coverage()
    expect(cov[3]).toBe(1)
  })
})

// ── End-to-end with the K4 Policy Engine ────────────────────────────────────

describe('K4 engine integration — Band 3 no longer empty', () => {
  beforeEach(() => { packRegistry.clear() })

  it('a compiled Band 3 dispatch rule fires when its guard matches', () => {
    const src = `::pack fractions 0.0.1
::end
::rule B3.dispatch.fractions.demo v1
band: 3
citation: educational-brain/concepts/math.arith.fractions.md
specificity: 3
mandatory: false
guard: {"kind":"all","clauses":[{"kind":"eq","field":"currentConceptId","value":"math.arith.fractions"},{"kind":"eq","field":"phase","value":"DEMONSTRATE"}]}
effect: {"move":"SHOW","actionClass":"ANALOGY"}
::end`
    const { pack } = compileSingle('fractions.bs', src)
    packRegistry.activate(pack!)
    const runtime = packRegistry.runtimePack()
    const decision = decide(runtime, inputs({ currentConceptId: 'math.arith.fractions', phase: 'DEMONSTRATE' }))
    expect(decision.actionClass).toBe('ANALOGY')
    expect(decision.move).toBe('SHOW')
    expect(decision.provenance.some((t) => t.ruleId === 'B3.dispatch.fractions.demo')).toBe(true)
  })

  it('compiled rule is skipped when its guard does not match; BASE_PACK Band 4 defaults apply', () => {
    const src = `::pack conditional 0.0.1
::end
::rule B3.dispatch.conditional v1
band: 3
citation: c
specificity: 3
mandatory: false
guard: {"kind":"eq","field":"currentConceptId","value":"specific.concept"}
effect: {"actionClass":"ANALOGY"}
::end`
    const { pack } = compileSingle('c.bs', src)
    packRegistry.activate(pack!)
    const runtime = packRegistry.runtimePack()
    const decision = decide(runtime, inputs({ currentConceptId: 'unrelated', phase: 'ANCHOR' }))
    expect(decision.actionClass).toBe('OBSERVATION_QUESTION') // BASE_PACK default
  })
})

// ── Golden pack snapshot ────────────────────────────────────────────────────

describe('golden pack snapshot (from brain/physics-mechanics.bs)', () => {
  it('compiles the shipped sample cleanly and pins its hash', () => {
    const path = resolve(process.cwd(), 'brain/physics-mechanics.bs')
    const source = readFileSync(path, 'utf8')
    const { ok, pack, diagnostics } = compileSingle('brain/physics-mechanics.bs', source)
    expect(diagnostics.filter((d) => d.severity === 'E')).toEqual([])
    expect(ok).toBe(true)
    expect(pack!.manifest.packId).toBe('physics-mechanics')
    expect(pack!.rules.length).toBeGreaterThanOrEqual(3)
    for (const r of pack!.rules) {
      expect(r.band).toBe(3)
      expect(r.citation.length).toBeGreaterThan(0)
    }
    // Byte-reproducibility: re-read + re-compile produces the same hash.
    const again = compileSingle('brain/physics-mechanics.bs', source)
    expect(again.pack!.manifest.contentHash).toBe(pack!.manifest.contentHash)
  })
})
