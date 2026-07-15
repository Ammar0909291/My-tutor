/**
 * K3 — stage unit tests. Each stage exercised independently, with typed
 * fixtures; asserts the RS §1 contract (immutable artifacts, no upstream
 * mutation, provenance chain, deterministic outputs).
 */
import { describe, it, expect } from 'vitest'
import {
  ingestStage, senseStage, senseFromMessage, commit1Stage, foldStage,
  interruptScanStage, scheduleStage, tsmStepStage, policyStage,
  resolveStage, planStage, renderStage, verifyStage, passthroughVerifier,
  commit2Stage, persistStage, postStage, makeTurnContext, initialState,
  buildStudentView, type FoldAdapters,
} from '@/lib/kernel'

const CTX_INPUT = {
  learnerId: 'L1', sessionId: 'S1', subjectSlug: 'physics',
  messageLength: 12, isSchoolMode: false,
}
const FOLD: FoldAdapters = {
  contentRegister: 'beginner', profileLevel: 'beginner',
  sessionFailureCount: 0, currentConceptId: 'phys.meas.units',
  hasVerifiedPlacement: false, pendingPlacementProbe: null,
  isFirstLessonContext: true,
}

describe('INGEST', () => {
  it('passes valid context through unchanged', async () => {
    const ctx = makeTurnContext(CTX_INPUT)
    const s = initialState(ctx)
    const out = await ingestStage.run(s)
    expect(out.context).toBe(ctx)                  // reference-equal (immutable)
  })
  it('rejects incomplete context', async () => {
    // @ts-expect-error deliberate contract violation for test
    await expect(ingestStage.run(initialState({ turnId: '', learnerId: '', sessionId: '', subjectSlug: 'x', receivedAtMs: 0, messageLength: 0, isSchoolMode: false }))).rejects.toThrow(/INGEST/)
  })
})

describe('SENSE', () => {
  it('emits message-shape sensor for every message', () => {
    const events = senseFromMessage('what is force?')
    expect(events.find((e) => e.sensorId === 'message-shape')).toBeDefined()
  })
  it("detects utterance-state on 'I don't understand'", () => {
    const events = senseFromMessage("I don't understand")
    expect(events.find((e) => e.sensorId === 'utterance-state')).toBeDefined()
  })
  it("detects autonomy on 'next topic please'", () => {
    const events = senseFromMessage('next topic please')
    expect(events.find((e) => e.sensorId === 'autonomy')).toBeDefined()
  })
  it('emits deterministic candidates in the pipeline', async () => {
    const s = await senseStage({ message: 'I know nothing at all' }).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(s.candidates!.length).toBeGreaterThanOrEqual(2)
    // Re-running produces identical structure (no timestamps, no ids).
    const t = await senseStage({ message: 'I know nothing at all' }).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(JSON.stringify(s.candidates)).toBe(JSON.stringify(t.candidates))
  })
  it('does not mutate the upstream state', async () => {
    const s = initialState(makeTurnContext(CTX_INPUT))
    const before = JSON.stringify(s)
    await senseStage({ message: 'hi' }).run(s)
    expect(JSON.stringify(s)).toBe(before)
  })
})

describe('COMMIT-1', () => {
  it('surfaces candidates as committed', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await senseStage({ message: "I don't know" }).run(s)
    s = await commit1Stage.run(s)
    expect(s.committed).toEqual(s.candidates)
  })
})

describe('FOLD', () => {
  it('composes StudentView from adapters', async () => {
    const s = await foldStage(FOLD).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(s.view?.contentRegister).toBe('beginner')
    expect(s.view?.currentConceptId).toBe('phys.meas.units')
    expect(s.view?.capabilities).toEqual({})    // K3: empty; K7 fills
  })
  it('buildStudentView is pure', () => {
    expect(buildStudentView('L1', FOLD)).toEqual(buildStudentView('L1', FOLD))
  })
})

describe('INTERRUPT-SCAN', () => {
  it('activates on utterance-state event, preempts policy', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await senseStage({ message: "I don't know" }).run(s)
    s = await commit1Stage.run(s)
    s = await interruptScanStage.run(s)
    expect(s.interrupt?.active).toBe(true)
    expect(s.interrupt?.preemptsPolicy).toBe(true)
    expect(s.interrupt?.failureStateKey).toBe('dont_know')
  })
  it('is inert on ordinary messages', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await senseStage({ message: 'the answer is 42' }).run(s)
    s = await commit1Stage.run(s)
    s = await interruptScanStage.run(s)
    expect(s.interrupt?.active).toBe(false)
  })
})

describe('SCHEDULE', () => {
  it('records episode type from freshBoundary', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await foldStage(FOLD).run(s)
    s = await scheduleStage({ freshBoundary: true, boundaryGapMs: 60000, retroWinOwed: false, dueReviewCount: 0 }).run(s)
    expect(s.agenda?.episodeType).toBe('RESUMPTION')
    expect(s.agenda?.activeConceptId).toBe('phys.meas.units')
  })
})

describe('TSM-STEP', () => {
  it('records transition direction when phase changes', async () => {
    const s = await tsmStepStage({
      phase: 'DEMONSTRATE', stageCeiling: 2, demonstrated: true, consecutiveFailures: 0,
      previousPhase: 'OBSERVE',
    }).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(s.teachingState?.transitionThisTurn.direction).toBe('up')
  })
})

describe('POLICY', () => {
  it('records a decision with provenance and a seeded PRNG', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await interruptScanStage.run({ ...s, committed: [] })
    s = await tsmStepStage({ phase: 'OBSERVE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0 }).run(s)
    s = await policyStage({
      move: 'ASK', actionClass: 'INTERACTIVE_QUESTIONING',
      maxQuestions: 1, maxParagraphs: 4, maxNewTerms: 1,
      visualClass: null, vocabularyBans: [], provenance: ['turn-directive'],
    }).run(s)
    expect(s.policy?.move).toBe('ASK')
    expect(s.policy?.budgets.maxQuestions).toBe(1)
    expect(s.policy?.prngSeed).toBeGreaterThan(0)
    expect(s.policy?.fallbackChain.length).toBeGreaterThanOrEqual(1)
  })
  it('interrupt preempts move → RECOVER', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await senseStage({ message: "I don't know" }).run(s)
    s = await commit1Stage.run(s)
    s = await interruptScanStage.run(s)
    s = await tsmStepStage({ phase: 'OBSERVE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 1 }).run(s)
    s = await policyStage({
      move: 'ASK', actionClass: null, maxQuestions: 1, maxParagraphs: 4,
      maxNewTerms: 1, visualClass: null, vocabularyBans: [], provenance: [],
    }).run(s)
    expect(s.policy?.move).toBe('RECOVER')
  })
  it('is deterministic given identical inputs', async () => {
    const build = async () => {
      let s = initialState(makeTurnContext({ ...CTX_INPUT, turnId: 'fixed', receivedAtMs: 0 }))
      s = await tsmStepStage({ phase: 'OBSERVE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0 }).run(s)
      s = await policyStage({
        move: 'TEACH', actionClass: null, maxQuestions: 0, maxParagraphs: 3,
        maxNewTerms: 1, visualClass: null, vocabularyBans: [], provenance: ['x'],
      }).run(s)
      return { ...s.policy!, decisionId: 'DETERMINISTIC_MASK' }
    }
    expect(await build()).toEqual(await build())
  })
})

describe('RESOLVE', () => {
  it('binds visual_and_text when a visual class is set', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await tsmStepStage({ phase: 'DEMONSTRATE', stageCeiling: 2, demonstrated: true, consecutiveFailures: 0 }).run(s)
    s = await policyStage({
      move: 'SHOW', actionClass: 'DEMONSTRATION', maxQuestions: 0, maxParagraphs: null,
      maxNewTerms: 1, visualClass: 'number_line', vocabularyBans: [], provenance: [],
    }).run(s)
    s = await resolveStage({ objective: 'anchor the concept' }).run(s)
    expect(s.action?.presentationMode).toBe('visual_and_text')
    expect(s.action?.visualClass).toBe('number_line')
  })
})

describe('PLAN', () => {
  it('carries budgets and vocabulary bans from policy', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await tsmStepStage({ phase: 'OBSERVE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0 }).run(s)
    s = await policyStage({
      move: 'ASK', actionClass: null, maxQuestions: 1, maxParagraphs: 4,
      maxNewTerms: 1, visualClass: null,
      vocabularyBans: ['SI', 'metric system'], provenance: ['first-lesson'],
    }).run(s)
    s = await resolveStage({ objective: '' }).run(s)
    s = await planStage({ systemPrompt: 'You are a tutor.', history: [{ role: 'user', content: 'hi' }] }).run(s)
    expect(s.plan?.vocabularyBans).toEqual(['SI', 'metric system'])
    expect(s.plan?.budgets.maxQuestions).toBe(1)
    expect(s.plan?.history).toHaveLength(1)
  })
})

describe('RENDER (with stub driver)', () => {
  it('produces a draft carrying the turnId (provenance)', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await planStage({ systemPrompt: 'sys', history: [] }).run(s)
    const stub = { render: async () => ({ text: 'hello', provider: 'stub', latencyMs: 5 }) }
    s = await renderStage(stub).run(s)
    expect(s.draft?.turnId).toBe(s.context.turnId)
    expect(s.draft?.provider).toBe('stub')
  })
  it('throws if plan is missing (kernel invariant)', async () => {
    const s = initialState(makeTurnContext(CTX_INPUT))
    const stub = { render: async () => ({ text: '', provider: 'stub', latencyMs: 0 }) }
    await expect(renderStage(stub).run(s)).rejects.toThrow(/plan/)
  })
})

describe('VERIFY (K3: pass-through)', () => {
  it('always passes and records passthrough resolution', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await planStage({ systemPrompt: '', history: [] }).run(s)
    const stub = { render: async () => ({ text: 'ok', provider: 'stub', latencyMs: 0 }) }
    s = await renderStage(stub).run(s)
    s = await verifyStage(passthroughVerifier).run(s)
    expect(s.verification?.verdict).toBe('PASS')
    expect(s.verification?.resolution).toBe('passthrough')
    expect(s.verification?.violations).toHaveLength(0)
  })
  it('honors an injected spy verifier (K5 seam)', async () => {
    let s = initialState(makeTurnContext(CTX_INPUT))
    s = await planStage({ systemPrompt: '', history: [] }).run(s)
    const stub = { render: async () => ({ text: 'ok', provider: 'stub', latencyMs: 0 }) }
    s = await renderStage(stub).run(s)
    let called = 0
    const spy = { verify: async () => { called++; return { verdict: 'PASS' as const, violations: [], attempt: 1 as const, resolution: 'passthrough' as const } } }
    await verifyStage(spy).run(s)
    expect(called).toBe(1)
  })
})

describe('COMMIT-2 / PERSIST / POST', () => {
  it('COMMIT-2 records assistant message id + clean text', async () => {
    const s = await commit2Stage({ assistantMessageId: 'msg1', cleanText: 'clean' }).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(s.committedTurn?.assistantMessageId).toBe('msg1')
  })
  it('PERSIST records receipt', async () => {
    const s = await persistStage({ snapshotUpdated: true, progressUpdated: false }).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(s.persistReceipt?.snapshotUpdated).toBe(true)
  })
  it('POST records spine emission receipt', async () => {
    const s = await postStage({ spineEmitted: true, evidenceEventsQueued: 3 }).run(initialState(makeTurnContext(CTX_INPUT)))
    expect(s.postReceipt?.evidenceEventsQueued).toBe(3)
  })
})
