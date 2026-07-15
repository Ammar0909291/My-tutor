/**
 * K3 — Pipeline integration tests: end-to-end run, ordering invariants,
 * error containment, replay determinism (RS T-4), golden transcript shape.
 */
import { describe, it, expect } from 'vitest'
import {
  runPipeline, pipelineModeFromEnv, ingestStage, senseStage, commit1Stage,
  foldStage, interruptScanStage, scheduleStage, tsmStepStage, policyStage,
  resolveStage, planStage, renderStage, verifyStage, passthroughVerifier,
  commit2Stage, persistStage, postStage, makeTurnContext, initialState,
  type FoldAdapters, type ScheduleAdapters, type TsmAdapters,
  type PolicyAdapters, type ResolveAdapters, type PlanAdapters,
} from '@/lib/kernel'
import { runShadowPipeline } from '@/lib/kernel/shadow'

const CTX = {
  learnerId: 'L1', sessionId: 'S1', subjectSlug: 'physics',
  messageLength: 20, isSchoolMode: false,
}
const FOLD: FoldAdapters = {
  contentRegister: 'beginner', profileLevel: 'beginner',
  sessionFailureCount: 0, currentConceptId: 'c1',
  hasVerifiedPlacement: false, pendingPlacementProbe: null,
  isFirstLessonContext: true,
}
const SCHED: ScheduleAdapters = { freshBoundary: false, boundaryGapMs: null, retroWinOwed: false, dueReviewCount: 0 }
const TSM: TsmAdapters = { phase: 'OBSERVE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0 }
const POL: PolicyAdapters = {
  move: 'ASK', actionClass: 'INTERACTIVE_QUESTIONING',
  maxQuestions: 1, maxParagraphs: 4, maxNewTerms: 1,
  visualClass: null, vocabularyBans: [], provenance: ['turn-directive'],
}
const RES: ResolveAdapters = { objective: 'observe' }
const PLN: PlanAdapters = { systemPrompt: 'You are a tutor.', history: [{ role: 'user', content: 'hi' }] }

function fullPipeline(msg: string, over: Partial<{ tsm: TsmAdapters; policy: PolicyAdapters }> = {}) {
  const stub = { render: async () => ({ text: 'reply', provider: 'stub', latencyMs: 1 }) }
  return [
    ingestStage,
    senseStage({ message: msg }),
    commit1Stage,
    foldStage(FOLD),
    interruptScanStage,
    scheduleStage(SCHED),
    tsmStepStage(over.tsm ?? TSM),
    policyStage(over.policy ?? POL),
    resolveStage(RES),
    planStage(PLN),
    renderStage(stub),
    verifyStage(passthroughVerifier),
    commit2Stage({ assistantMessageId: 'msg1', cleanText: 'reply' }),
    persistStage({ snapshotUpdated: true, progressUpdated: true }),
    postStage({ spineEmitted: true, evidenceEventsQueued: 3 }),
  ]
}

describe('pipeline — end-to-end', () => {
  it('threads all 15 stages and populates every artifact', async () => {
    const r = await runPipeline(initialState(makeTurnContext(CTX)), fullPipeline('hi'), { mode: 'primary', quiet: true })
    expect(r.error).toBeUndefined()
    expect(r.trace.map((t) => t.stage)).toEqual([
      'INGEST', 'SENSE', 'COMMIT-1', 'FOLD', 'INTERRUPT-SCAN', 'SCHEDULE',
      'TSM-STEP', 'POLICY', 'RESOLVE', 'PLAN', 'RENDER', 'VERIFY',
      'COMMIT-2', 'PERSIST', 'POST',
    ])
    const s = r.finalState
    expect(s.candidates).toBeDefined()
    expect(s.committed).toBeDefined()
    expect(s.view).toBeDefined()
    expect(s.interrupt).toBeDefined()
    expect(s.agenda).toBeDefined()
    expect(s.teachingState).toBeDefined()
    expect(s.policy).toBeDefined()
    expect(s.action).toBeDefined()
    expect(s.plan).toBeDefined()
    expect(s.draft).toBeDefined()
    expect(s.verification).toBeDefined()
    expect(s.committedTurn).toBeDefined()
    expect(s.persistReceipt).toBeDefined()
    expect(s.postReceipt).toBeDefined()
  })

  it('provenance chain is intact end-to-end', async () => {
    const r = await runPipeline(initialState(makeTurnContext(CTX)), fullPipeline('hi'), { mode: 'primary', quiet: true })
    const { context, policy, action, plan, draft, committedTurn } = r.finalState
    expect(policy?.turnId).toBe(context.turnId)
    expect(action?.turnId).toBe(context.turnId)
    expect(plan?.turnId).toBe(context.turnId)
    expect(draft?.turnId).toBe(context.turnId)
    expect(committedTurn?.turnId).toBe(context.turnId)
  })

  it('rejects out-of-order stages (architecture invariant)', async () => {
    await expect(runPipeline(
      initialState(makeTurnContext(CTX)),
      [ingestStage, commit1Stage, senseStage({ message: 'x' })],  // COMMIT-1 before SENSE — illegal
      { mode: 'primary', quiet: true },
    )).rejects.toThrow(/out of order|COMMIT/i)
  })

  it('contains stage errors — trace stops at the failing stage', async () => {
    const bomb = {
      name: 'FOLD' as const,
      run: async () => { throw new Error('boom') },
    }
    const r = await runPipeline(
      initialState(makeTurnContext(CTX)),
      [ingestStage, senseStage({ message: 'x' }), commit1Stage, bomb],
      { mode: 'primary', quiet: true },
    )
    expect(r.error?.stage).toBe('FOLD')
    expect(r.error?.message).toBe('boom')
    expect(r.trace.map((t) => t.stage)).toEqual(['INGEST', 'SENSE', 'COMMIT-1'])
  })
})

describe('pipeline — determinism (RS T-4)', () => {
  it('two runs with identical inputs + fixed turnId produce identical decision artifacts', async () => {
    const run = async () => {
      const ctx = makeTurnContext({ ...CTX, turnId: 'fixed', receivedAtMs: 0 })
      const r = await runPipeline(initialState(ctx), fullPipeline("I don't know"), { mode: 'primary', quiet: true })
      // Mask nondeterministic-by-design ids (decisionId, actionId, planId,
      // draftId, latencyMs from the stub). Decision CONTENT must be identical.
      const p = r.finalState.policy!
      return {
        move: p.move, actionClass: p.actionClass, budgets: p.budgets,
        stageCeiling: p.stageCeiling, vocabularyBans: p.vocabularyBans,
        provenance: p.provenance, prngSeed: p.prngSeed,
      }
    }
    expect(await run()).toEqual(await run())
  })

  it('the trace stage order is stable across runs', async () => {
    const a = await runPipeline(initialState(makeTurnContext(CTX)), fullPipeline('x'), { mode: 'primary', quiet: true })
    const b = await runPipeline(initialState(makeTurnContext(CTX)), fullPipeline('x'), { mode: 'primary', quiet: true })
    expect(a.trace.map((t) => t.stage)).toEqual(b.trace.map((t) => t.stage))
  })
})

describe('golden transcript replay (K3 harness)', () => {
  // The golden transcript = a fixed input → the pipeline's canonical
  // decision artifact. If the pipeline stays behavior-preserving, this
  // snapshot never changes.
  it('recovery-utterance transcript produces the expected decision shape', async () => {
    const r = await runPipeline(
      initialState(makeTurnContext({ ...CTX, turnId: 'golden-1', receivedAtMs: 0 })),
      fullPipeline("I don't know", { policy: POL }),
      { mode: 'primary', quiet: true },
    )
    expect(r.finalState.interrupt?.active).toBe(true)
    expect(r.finalState.interrupt?.failureStateKey).toBe('dont_know')
    expect(r.finalState.policy?.move).toBe('RECOVER')   // interrupt preempts
    expect(r.finalState.policy?.provenance).toContain('recovery:dont_know')
  })

  it('normal-turn transcript produces the expected decision shape', async () => {
    const r = await runPipeline(
      initialState(makeTurnContext({ ...CTX, turnId: 'golden-2', receivedAtMs: 0 })),
      fullPipeline('the answer might be 5'),
      { mode: 'primary', quiet: true },
    )
    expect(r.finalState.interrupt?.active).toBe(false)
    expect(r.finalState.policy?.move).toBe('ASK')
    expect(r.finalState.policy?.budgets.maxQuestions).toBe(1)
  })

  it('autonomy-request transcript records the signal', async () => {
    const r = await runPipeline(
      initialState(makeTurnContext({ ...CTX, turnId: 'golden-3', receivedAtMs: 0 })),
      fullPipeline("let's move on"),
      { mode: 'primary', quiet: true },
    )
    expect(r.finalState.interrupt?.autonomyRequested).toBe(true)
    expect(r.finalState.policy?.provenance).toContain('autonomy')
  })
})

describe('shadow-mode adapter', () => {
  it('is off when the flag is unset (route.ts default)', async () => {
    const prev = process.env.ENABLE_KERNEL_PIPELINE
    delete process.env.ENABLE_KERNEL_PIPELINE
    try {
      const r = await runShadowPipeline({
        learnerId: 'L1', sessionId: 'S1', subjectSlug: 'physics',
        message: 'hi', isSchoolMode: false,
        fold: FOLD, schedule: SCHED, tsm: TSM, policy: POL, resolve: RES, plan: PLN,
      })
      expect(r.invoked).toBe(false)
      expect(r.mode).toBe('off')
    } finally {
      if (prev !== undefined) process.env.ENABLE_KERNEL_PIPELINE = prev
    }
  })

  it('runs stages 1–10 (INGEST..PLAN) in shadow mode without touching DB/response', async () => {
    process.env.ENABLE_KERNEL_PIPELINE = '1'
    try {
      const r = await runShadowPipeline({
        learnerId: 'L1', sessionId: 'S1', subjectSlug: 'physics',
        message: "I don't know", isSchoolMode: false,
        fold: FOLD, schedule: SCHED, tsm: TSM, policy: POL, resolve: RES, plan: PLN,
      })
      expect(r.invoked).toBe(true)
      expect(r.mode).toBe('shadow')
      expect(r.state?.policy?.move).toBe('RECOVER')
      expect(r.state?.draft).toBeUndefined()          // no render in shadow
      expect(r.state?.verification).toBeUndefined()   // no verify in shadow
      expect(r.state?.committedTurn).toBeUndefined()  // no DB writes in shadow
      // Ordered trace, ending at PLAN.
      const stages = r.trace!.map((t) => t.stage)
      expect(stages[stages.length - 1]).toBe('PLAN')
      expect(stages).not.toContain('RENDER')
    } finally {
      delete process.env.ENABLE_KERNEL_PIPELINE
    }
  })

  it('is inert in School Mode (K3 scope: Library only)', async () => {
    process.env.ENABLE_KERNEL_PIPELINE = '1'
    try {
      const r = await runShadowPipeline({
        learnerId: 'L1', sessionId: 'S1', subjectSlug: 'mathematics',
        message: 'hi', isSchoolMode: true,
        fold: FOLD, schedule: SCHED, tsm: TSM, policy: POL, resolve: RES, plan: PLN,
      })
      expect(r.invoked).toBe(false)
    } finally {
      delete process.env.ENABLE_KERNEL_PIPELINE
    }
  })
})

describe('pipeline mode from env', () => {
  it.each([
    [undefined, 'off'],
    ['0', 'off'],
    ['1', 'shadow'],
    ['shadow', 'shadow'],
    ['2', 'primary'],
    ['primary', 'primary'],
  ])('ENABLE_KERNEL_PIPELINE=%s → %s', (env, expected) => {
    const prev = process.env.ENABLE_KERNEL_PIPELINE
    if (env === undefined) delete process.env.ENABLE_KERNEL_PIPELINE
    else process.env.ENABLE_KERNEL_PIPELINE = env
    try { expect(pipelineModeFromEnv()).toBe(expected) }
    finally {
      if (prev !== undefined) process.env.ENABLE_KERNEL_PIPELINE = prev
      else delete process.env.ENABLE_KERNEL_PIPELINE
    }
  })
})
