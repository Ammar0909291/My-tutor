/**
 * K4 — the policy gate.
 *
 * The gate is the engine's first production consumer, so the assertions that
 * matter are about CONSUMPTION, not about the engine (policyEngine.test.ts
 * and goldenDecisionGrid.test.ts already own that): does it read the pack the
 * registry says is active, does it read the turn's real artifacts, is it
 * inert when off, and can it take a turn down.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { policyGate, policyInputsFromState, NO_SIGNAL } from '@/lib/eos-runtime/policyGate'
import { readEosFlags } from '@/lib/eos-runtime/flags'
import { packRegistry, emitCompiledPack } from '@/lib/brain-compiler'
import { fieldsRead, describeGuard } from '@/lib/brain-compiler/predicates'
import type { PackAST, GuardClause } from '@/lib/brain-compiler/types'
import type { KernelState } from '@/lib/kernel/types'
import { makeTurnContext, initialState } from '@/lib/kernel/context'

function state(over: Partial<KernelState> = {}): KernelState {
  const base = initialState(makeTurnContext({
    learnerId: 'L1', sessionId: 'S1', subjectSlug: 'physics',
    messageLength: 12, isSchoolMode: false,
  }))
  return {
    ...base,
    view: {
      learnerId: 'L1', contentRegister: 'beginner', profileLevel: 'beginner',
      sessionFailureCount: 0, currentConceptId: 'phys.meas.units',
      hasVerifiedPlacement: false, pendingPlacementProbe: null,
      isFirstLessonContext: false, capabilities: {},
    },
    interrupt: { active: false, failureStateKey: null, autonomyRequested: false, preemptsPolicy: false },
    agenda: {
      activeConceptId: 'phys.meas.units', episodeType: 'NEW', freshBoundary: false,
      boundaryGapMs: null, obligations: { retroWinOwed: false, dueReviewCount: 0 },
    },
    teachingState: {
      phase: 'OBSERVE', scaffoldDial: 0, stageCeiling: 2, demonstrated: false,
      consecutiveFailures: 0, transitionThisTurn: { from: null, to: null, direction: 'none' },
    },
    ...over,
  }
}

const FLAGS = ['ENABLE_EOS_RUNTIME', 'ENABLE_POLICY_PACKS'] as const
let saved: Record<string, string | undefined> = {}

beforeEach(() => {
  saved = Object.fromEntries(FLAGS.map((k) => [k, process.env[k]]))
  for (const k of FLAGS) delete process.env[k]
  packRegistry.clear()
})
afterEach(() => {
  for (const k of FLAGS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
  packRegistry.clear()
})

// ── the two-step ────────────────────────────────────────────────────────────

describe('the policy flag is a two-step, like the verifier', () => {
  it('is off by default — today\'s behaviour is unchanged', () => {
    expect(readEosFlags().policyMode).toBe('off')
    expect(policyGate({ state: state() })).toMatchObject({ ran: false, decision: null })
  })

  it('the master flag implies SHADOW, never PRIMARY', () => {
    // The whole point. ENABLE_EOS_RUNTIME=1 must not be a single switch that
    // hands the teaching decision to an engine whose agreement with the
    // shipping decision-maker has never been measured on a real turn.
    process.env.ENABLE_EOS_RUNTIME = '1'
    expect(readEosFlags().policyMode).toBe('shadow')
  })

  it('primary is reachable only by naming it explicitly', () => {
    process.env.ENABLE_POLICY_PACKS = 'primary'
    expect(readEosFlags().policyMode).toBe('primary')
    process.env.ENABLE_POLICY_PACKS = 'shadow'
    expect(readEosFlags().policyMode).toBe('shadow')
  })

  it('policyPacks stays a boolean for existing callers', () => {
    process.env.ENABLE_POLICY_PACKS = 'shadow'
    expect(readEosFlags().policyPacks).toBe(true)
    delete process.env.ENABLE_POLICY_PACKS
    expect(readEosFlags().policyPacks).toBe(false)
  })
})

// ── input derivation ────────────────────────────────────────────────────────

describe('inputs come from the kernel artifacts, not a second copy', () => {
  it('maps every PolicyInputs field off the state', () => {
    const s = state({
      interrupt: { active: true, failureStateKey: 'dont_know', autonomyRequested: true, preemptsPolicy: true },
      agenda: {
        activeConceptId: 'phys.mech.newton-1', episodeType: 'REVIEW', freshBoundary: true,
        boundaryGapMs: 9e5, obligations: { retroWinOwed: true, dueReviewCount: 4 },
      },
    })
    expect(policyInputsFromState(s, { correct: false, confidence: 'high' })).toMatchObject({
      learnerId: 'L1', sessionId: 'S1',
      contentRegister: 'beginner', profileLevel: 'beginner',
      phase: 'OBSERVE', stageCeiling: 2, consecutiveFailures: 0,
      interruptActive: true, failureStateKey: 'dont_know', autonomyRequested: true,
      retroWinOwed: true, dueReviewCount: 4, freshBoundary: true,
      lastSignalCorrect: false, lastSignalConfidence: 'high',
      currentConceptId: 'phys.mech.newton-1',
    })
  })

  it('is total on an empty state — a missing artifact never takes the turn down', () => {
    const bare = initialState(makeTurnContext({
      learnerId: 'L', sessionId: 'S', subjectSlug: 'physics', messageLength: 1, isSchoolMode: false,
    }))
    const inputs = policyInputsFromState(bare)
    expect(inputs.phase).toBe('OBSERVE')
    expect(inputs.contentRegister).toBe('intermediate')
    expect(policyGate({ state: bare, mode: 'shadow' }).decision).not.toBeNull()
  })

  it('passes the phase VERBATIM rather than translating it', () => {
    // legacyToCanonical maps CHECK→ASSESS, whose canonical ceiling is 6 where
    // the legacy CHECK ceiling is 4. Translating here would silently raise the
    // question-stage ceiling by two — a TSM migration decision, not a gate
    // decision. BASE_PACK's guards accept both vocabularies precisely so this
    // module does not have to choose.
    const s = state({ teachingState: { ...state().teachingState!, phase: 'CHECK' } })
    expect(policyInputsFromState(s).phase).toBe('CHECK')
    expect(policyGate({ state: s, mode: 'shadow' }).decision!.stageCeiling).toBe(4)
  })

  it('does not fabricate a signal when the previous turn produced no answer', () => {
    const inputs = policyInputsFromState(state(), NO_SIGNAL)
    expect(inputs.lastSignalCorrect).toBeNull()
    expect(inputs.lastSignalConfidence).toBeNull()
    // …and the D1-grid rules correctly do not fire.
    const rules = policyGate({ state: state(), mode: 'shadow' }).decision!.provenance.map((t) => t.ruleId)
    expect(rules.some((r) => r.startsWith('B4.d1.'))).toBe(false)
  })
})

// ── it reads the REGISTRY's pack, not BASE_PACK ─────────────────────────────

describe('the gate serves the pack the registry says is active', () => {
  function b3Pack(conceptId: string): PackAST {
    const ast: GuardClause = { kind: 'all', clauses: [{ kind: 'eq', field: 'currentConceptId', value: conceptId }] }
    return {
      packId: 'test-overlay', packVersion: '9.9.9', description: 'test',
      sourceFiles: [], span: { file: 't', startLine: 0, endLine: 0 },
      rules: [{
        ruleId: 'B3.dispatch.test.v1', band: 3, specificity: 1, mandatory: false,
        citation: 'test', guard: { ast, reads: fieldsRead(ast), describe: describeGuard(ast) },
        effect: { actionClass: 'DEMONSTRATION', move: 'SHOW' },
        span: { file: 't', startLine: 0, endLine: 0 },
      }],
    }
  }

  it('an activated overlay reaches the decision', () => {
    // The bug this whole module fixes: before it existed, route.ts loaded
    // compiled packs into the registry and then never consulted the registry.
    const before = policyGate({ state: state(), mode: 'shadow' })
    expect(before.band3Rules).toBe(0)
    expect(before.decision!.actionClass).toBe('OBSERVATION_QUESTION')  // Band-4 default

    packRegistry.activate(emitCompiledPack(b3Pack('phys.meas.units'), {}))

    const after = policyGate({ state: state(), mode: 'shadow' })
    expect(after.band3Rules).toBe(1)
    expect(after.decision!.actionClass).toBe('DEMONSTRATION')
    expect(after.decision!.provenance.map((t) => t.ruleId)).toContain('B3.dispatch.test.v1')
    expect(after.packVersion).toContain('9.9.9')
  })

  it('an overlay whose guard misses leaves the base decision untouched', () => {
    packRegistry.activate(emitCompiledPack(b3Pack('some.other.concept'), {}))
    const g = policyGate({ state: state(), mode: 'shadow' })
    expect(g.band3Rules).toBe(1)                       // loaded…
    expect(g.decision!.actionClass).toBe('OBSERVATION_QUESTION')  // …but did not fire
  })
})

// ── totality ────────────────────────────────────────────────────────────────

describe('the gate can never take a turn down', () => {
  it('returns ran:false with an error instead of throwing', () => {
    const hostile = { get context() { throw new Error('boom') } } as unknown as KernelState
    const g = policyGate({ state: hostile, mode: 'shadow' })
    expect(g.ran).toBe(false)
    expect(g.decision).toBeNull()
    expect(g.error).toContain('boom')
  })

  it('is deterministic — two runs on one state agree byte for byte', () => {
    const s = state()
    const a = policyGate({ state: s, mode: 'shadow' }).decision
    const b = policyGate({ state: s, mode: 'shadow' }).decision
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })
})
