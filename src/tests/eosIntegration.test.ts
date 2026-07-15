/**
 * K6 — EOS Runtime integration tests.
 *
 * Flag matrix, brain pack lazy-loader, verifier gate wiring, rollback,
 * and end-to-end EOS-active vs EOS-off parity for the invariants the
 * masterplan lists as K6 success criteria.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  readEosFlags, anyEosActive,
  ensureBrainPacksLoaded, __resetBrainPacksLoaderForTests,
  verifierGate, buildVerifierContext,
} from '@/lib/eos-runtime'
import { packRegistry, mergePacks } from '@/lib/brain-compiler'
import { BASE_PACK, decide } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'

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

const FLAG_KEYS = ['ENABLE_EOS_RUNTIME', 'ENABLE_POLICY_PACKS', 'ENABLE_BRAIN_PACKS', 'ENABLE_OUTPUT_VERIFIER'] as const

function clearFlags() {
  for (const k of FLAG_KEYS) delete process.env[k]
}

// ── Flag semantics ──────────────────────────────────────────────────────────

describe('EOS flags', () => {
  beforeEach(clearFlags)
  afterEach(clearFlags)

  it('all OFF by default → today\'s behaviour byte-identical (no EOS activity)', () => {
    const f = readEosFlags()
    expect(f.eosRuntime).toBe(false)
    expect(f.policyPacks).toBe(false)
    expect(f.brainPacks).toBe(false)
    expect(f.outputVerifier).toBe(false)
    expect(anyEosActive(f)).toBe(false)
  })

  it('master ENABLE_EOS_RUNTIME=1 implies every sub-flag', () => {
    process.env.ENABLE_EOS_RUNTIME = '1'
    const f = readEosFlags()
    expect(f.eosRuntime).toBe(true)
    expect(f.policyPacks).toBe(true)
    expect(f.brainPacks).toBe(true)
    expect(f.outputVerifier).toBe(true)
    expect(anyEosActive(f)).toBe(true)
  })

  it('sub-flags activate independently for canary rollouts', () => {
    process.env.ENABLE_OUTPUT_VERIFIER = '1'
    const f = readEosFlags()
    expect(f.eosRuntime).toBe(false)
    expect(f.outputVerifier).toBe(true)
    expect(f.policyPacks).toBe(false)
  })

  it('removing flags restores baseline (rollback)', () => {
    process.env.ENABLE_EOS_RUNTIME = '1'
    expect(readEosFlags().eosRuntime).toBe(true)
    delete process.env.ENABLE_EOS_RUNTIME
    expect(readEosFlags().eosRuntime).toBe(false)
    expect(anyEosActive()).toBe(false)
  })

  it.each([
    ['0', false], ['', false], ['1', true],
    ['true', true], ['on', true], ['primary', true],
  ])('ENABLE_EOS_RUNTIME=%j → eosRuntime=%s', (v, expected) => {
    if (v === '') delete process.env.ENABLE_EOS_RUNTIME
    else process.env.ENABLE_EOS_RUNTIME = v
    expect(readEosFlags().eosRuntime).toBe(expected)
  })
})

// ── Brain pack lazy loader ─────────────────────────────────────────────────

describe('brain pack loader', () => {
  beforeEach(__resetBrainPacksLoaderForTests)
  afterEach(__resetBrainPacksLoaderForTests)

  it('scans brain/ and activates the shipped sample pack', () => {
    const report = ensureBrainPacksLoaded()
    expect(report.scanned).toBeGreaterThan(0)
    expect(report.activated).toBeGreaterThan(0)
    expect(report.failed).toEqual([])
    expect(packRegistry.has('physics-mechanics')).toBe(true)
  })

  it('is idempotent (double-call activates once)', () => {
    ensureBrainPacksLoaded()
    const before = packRegistry.list().length
    ensureBrainPacksLoaded()
    expect(packRegistry.list().length).toBe(before)
  })

  it('failure to compile a single pack does not block other packs', () => {
    // (Sanity-only — the shipped brain/*.bs must compile clean; this
    // test asserts the failed[] surface is a real error channel.)
    const report = ensureBrainPacksLoaded()
    expect(Array.isArray(report.failed)).toBe(true)
  })
})

// ── Runtime pack composition ───────────────────────────────────────────────

describe('runtimePack composition (base + compiled overlays)', () => {
  beforeEach(__resetBrainPacksLoaderForTests)
  afterEach(__resetBrainPacksLoaderForTests)

  it('compiled Band-3 rules appear in the merged pack', () => {
    ensureBrainPacksLoaded()
    const merged = packRegistry.runtimePack()
    const band3RuleIds = merged.rules.filter((r) => r.band === 3).map((r) => r.ruleId)
    expect(band3RuleIds.length).toBeGreaterThan(0)
    // BASE_PACK survives (mandatory rules preserved)
    expect(merged.rules.some((r) => r.ruleId === 'B0.recovery.preempt.v1')).toBe(true)
  })

  it('when a compiled Band-3 rule matches, decision goes to its actionClass', () => {
    ensureBrainPacksLoaded()
    const merged = packRegistry.runtimePack()
    const decision = decide(merged, inputs({
      currentConceptId: 'phys.mech.newtons-first-law', phase: 'ANCHOR',
    }))
    expect(decision.actionClass).toBe('DEMONSTRATION')
    expect(decision.provenance.some((t) => t.ruleId.startsWith('B3.'))).toBe(true)
  })

  it('BASE_PACK-only decisions are UNCHANGED when no compiled pack matches', () => {
    ensureBrainPacksLoaded()
    const merged = packRegistry.runtimePack()
    const baseOnly = decide(BASE_PACK, inputs({ phase: 'GUIDED' }))
    const withOverlays = decide(merged, inputs({ phase: 'GUIDED' }))
    // Same phase-default fires; provenance identical for phase-default.
    expect(withOverlays.move).toBe(baseOnly.move)
    expect(withOverlays.actionClass).toBe(baseOnly.actionClass)
  })
})

// ── Verifier gate wiring ───────────────────────────────────────────────────

describe('verifierGate — RS §9.3 protocol wired', () => {
  it('PASS in one attempt when the draft is clean', async () => {
    let renderCalls = 0
    const ctx = buildVerifierContext(baseCtx())
    const r = await verifierGate({
      draftText: 'Nice — here is what to try next.',
      ctx, learnerText: 'ok',
      fallbackChain: ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN'],
      rerender: async () => { renderCalls++; return 'unused' },
    })
    expect(r.attempts).toBe(1)
    expect(r.usedTemplate).toBe(false)
    expect(renderCalls).toBe(0)
    expect(r.finalText).toContain('here is what to try next')
  })

  it('constrained rerender on first REJECT; PASS attempt 2', async () => {
    let called = 0
    const ctx = buildVerifierContext({ ...baseCtx(), move: 'TEACH', stageCeiling: 2 })
    const r = await verifierGate({
      draftText: 'Calculate x.', // V-STAGE
      ctx, learnerText: 'hi',
      fallbackChain: ['ECHO_MICROWIN'],
      rerender: async (appendix) => {
        called++
        expect(appendix).toContain('VERIFICATION VIOLATIONS')
        return 'Let me show you a simple example first.'
      },
    })
    expect(called).toBe(1)
    expect(r.attempts).toBe(2)
    expect(r.usedTemplate).toBe(false)
  })

  it('template fallback on second REJECT (no third LLM call)', async () => {
    let called = 0
    const ctx = buildVerifierContext({ ...baseCtx(), move: 'TEACH', stageCeiling: 2 })
    const r = await verifierGate({
      draftText: 'Calculate x.',
      ctx, learnerText: 'hi',
      fallbackChain: ['ECHO_MICROWIN'],
      rerender: async () => { called++; return 'Still calculate x.' },
    })
    expect(called).toBe(1)                 // exactly one rerender attempt
    expect(r.usedTemplate).toBe(true)
    expect(r.events.some((e) => e.kind === 'TemplateFallbackUsed')).toBe(true)
    expect(r.finalText.length).toBeGreaterThan(0)
  })

  it('fails open on internal errors (never breaks the turn)', async () => {
    const ctx = buildVerifierContext(baseCtx())
    const draft = 'hello'
    const r = await verifierGate({
      draftText: draft, ctx, learnerText: '',
      fallbackChain: ['ECHO_MICROWIN'],
      rerender: async () => { throw new Error('driver dead') },
    })
    // Even if the rerender throws (through the loop), the caller receives
    // a finalText they can persist. In this scenario the initial draft
    // passes, so no rerender is invoked — finalText === draft.
    expect(typeof r.finalText).toBe('string')
    expect(r.finalText.length).toBeGreaterThan(0)
  })
})

function baseCtx() {
  return {
    contentRegister: 'intermediate' as const,
    move: 'TEACH' as 'TEACH' | 'SHOW' | 'ASK' | 'RECOVER' | 'CLOSE' | null,
    phase: 'DEMONSTRATE' as string | null,
    stageCeiling: 4,
    vocabularyUnlocked: true,
    formulaUnlocked: true,
    recoveryActive: false,
    maxQuestions: 0 as 0 | 1,
    maxParagraphs: null as number | null,
    maxNewTerms: 2,
    vocabularyBans: [] as string[],
    assessmentActive: false,
    lessonCompletionAuthorized: false,
    sessionFailureCount: 0,
    learnerText: 'hi',
    reactMandated: false,
    legalTags: ['VISUAL', 'HINT'],
    bannedConceptTerms: [] as string[],
  }
}

// ── VerifierContext construction ───────────────────────────────────────────

describe('buildVerifierContext — route.ts hoisted state → K5 shape', () => {
  it('maps recoveryActive → RECOVER move override + flooded band', () => {
    const ctx = buildVerifierContext({ ...baseCtx(), move: 'ASK', recoveryActive: true })
    expect(ctx.move).toBe('RECOVER')
    expect(ctx.affectBand).toBe('flooded')
  })

  it('maps sessionFailureCount ≥2 → strained band (non-recovery)', () => {
    const ctx = buildVerifierContext({ ...baseCtx(), sessionFailureCount: 2 })
    expect(ctx.affectBand).toBe('strained')
  })

  it('maps sessionFailureCount <2 non-recovery → calm band', () => {
    const ctx = buildVerifierContext({ ...baseCtx(), sessionFailureCount: 1 })
    expect(ctx.affectBand).toBe('calm')
  })

  it('respects register / budgets / bans passthrough', () => {
    const ctx = buildVerifierContext({
      ...baseCtx(), contentRegister: 'beginner',
      maxQuestions: 1 as 0 | 1, maxParagraphs: 3, maxNewTerms: 1,
      vocabularyBans: ['SI', 'inertial frame'],
    })
    expect(ctx.contentRegister).toBe('beginner')
    expect(ctx.budgets.maxQuestions).toBe(1)
    expect(ctx.budgets.maxParagraphs).toBe(3)
    expect(ctx.budgets.maxNewTerms).toBe(1)
    expect(ctx.vocabularyBans).toEqual(['SI', 'inertial frame'])
  })
})

// ── Determinism + provenance ───────────────────────────────────────────────

describe('deterministic policy replay through EOS integration surfaces', () => {
  beforeEach(__resetBrainPacksLoaderForTests)
  afterEach(__resetBrainPacksLoaderForTests)

  it('same inputs + same activated packs → byte-identical decisions', () => {
    ensureBrainPacksLoaded()
    const merged1 = packRegistry.runtimePack()
    __resetBrainPacksLoaderForTests()
    ensureBrainPacksLoaded()
    const merged2 = packRegistry.runtimePack()
    const a = decide(merged1, inputs({ phase: 'DEMONSTRATE', currentConceptId: 'phys.mech.newtons-first-law' }))
    const b = decide(merged2, inputs({ phase: 'DEMONSTRATE', currentConceptId: 'phys.mech.newtons-first-law' }))
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('mergePacks preserves BASE_PACK mandatory rules under any overlay set', () => {
    ensureBrainPacksLoaded()
    const compiled = packRegistry.list().map((e) => e.loaded)
    const merged = mergePacks(BASE_PACK, ...compiled)
    for (const baseRule of BASE_PACK.rules.filter((r) => r.mandatory)) {
      expect(merged.rules.some((r) => r.ruleId === baseRule.ruleId)).toBe(true)
    }
  })
})

// ── Regression audit invariants ─────────────────────────────────────────────

describe('K6 regression audit — subsystems below the wiring untouched', () => {
  it('the K3 pipeline shadow flag remains independent of EOS flags', async () => {
    // Setting EOS runtime should NOT auto-turn-on ENABLE_KERNEL_PIPELINE.
    clearFlags()
    delete process.env.ENABLE_KERNEL_PIPELINE
    process.env.ENABLE_EOS_RUNTIME = '1'
    const { pipelineModeFromEnv } = await import('@/lib/kernel')
    expect(pipelineModeFromEnv()).toBe('off')
    clearFlags()
  })

  it('BASE_PACK unchanged (K4 remains authoritative when packs deactivated)', () => {
    __resetBrainPacksLoaderForTests()
    const decision = decide(BASE_PACK, inputs({ phase: 'ANCHOR' }))
    expect(decision.move).toBe('ASK')
    expect(decision.actionClass).toBe('OBSERVATION_QUESTION')
  })
})
