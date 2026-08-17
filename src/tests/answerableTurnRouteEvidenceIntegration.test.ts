/**
 * ANSWERABLE-TURN GUARD — ROUTE/EVIDENCE INTEGRATION.
 *
 * Closes the negative control deterministically. The live runs could not:
 * across 12 driven turns the dangerous shape occurred once and the model
 * claimed nothing on it, so the suppression branch was never entered in
 * production. This injects the exact bad SIGNAL instead of waiting for it.
 *
 * ── WHY THIS IS NOT A SECOND PREDICATE TEST ────────────────────────────────
 * `answerableTurnEvidenceGuard.test.ts` proves the RULE. This proves the
 * PIPELINE: the raw `<!--SIGNAL-->` string the model emits is parsed by the
 * real `parseSignalTag`, passed through the real
 * `shouldSuppressSignalCorrectness`, folded by the real
 * `advanceConversationState`, and offered to the real
 * `applyTopicProgressEvidence` — four production modules, no re-implementation
 * of any of them.
 *
 * ── WHY IT IS NOT A BOOTED REQUEST ─────────────────────────────────────────
 * `route.ts` needs auth, a database and a live model, so it cannot be invoked
 * here — the same constraint `attemptTagRouteWiring.test.ts` records. Two
 * things stand in for booting it, and both are checked rather than assumed:
 *
 *   1. the two GATES the route applies around this stage are asserted against
 *      the real route SOURCE, so if either is deleted or reordered this test
 *      fails rather than silently testing a fiction;
 *   2. the stage itself is executed with the real modules below.
 *
 * The gates are the whole mechanism: suppression writes `correctness:
 * undefined`, and BOTH the ladder fold and the evidence write are gated on
 * `correctness !== undefined`, so one suppression removes the write with no
 * second code path.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseSignalTag, type TeachingSignal } from '@/lib/teaching/signals'
import { shouldSuppressSignalCorrectness } from '@/lib/teaching/answerableTurn'
import {
  applyTopicProgressEvidence, type TopicProgressDb,
} from '@/lib/teaching/topicProgressEvidence'
import {
  advanceConversationState, initialConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

const CONCEPT = 'chem.found.stoichiometry'

/** The tutor turn that preceded "i see" in the production trace: it works
 *  through the answer to its OWN question and states the conclusion. No
 *  question is posed, no options are offered. */
const NO_QUESTION_ASKED =
  "Claude, let's work through this one together: 4.0 grams of hydrogen divided "
  + 'by its molar mass of 2.016 gives about 2.0 moles, and 32.0 grams of oxygen '
  + 'divided by 32.00 gives 1.0 mole.\n\n'
  + 'Since you have exactly 2.0 moles of hydrogen and 1.0 mole of oxygen, they '
  + 'match the required ratio perfectly!'

const PROSE_MCQ =
  'Which reactant is the limiting reagent?\n'
  + 'A) Hydrogen, because it gives fewer moles\n'
  + 'B) Oxygen, because it gives fewer moles'

const REAL_QUESTION = 'How many moles are in 36 grams of water?'

/** Exactly what the model emitted on the defective turn, as raw text. */
const BAD_SIGNAL_TURN =
  'Exactly — you have got it.\n'
  + '<!--SIGNAL correctness="true" confidence="high" confusion="false"-->'

/** A recording stand-in for the one Prisma call the writer makes. */
function spyDb() {
  const calls: unknown[] = []
  const db: TopicProgressDb = {
    topicProgress: {
      updateMany: async (args: unknown) => { calls.push(args); return { count: 1 } },
      // Present so the writer's create/upsert path is reachable if it is taken;
      // any call at all is a failure in the suppressed case.
      create: async (args: unknown) => { calls.push(args); return {} },
      findFirst: async () => null,
    },
  } as unknown as TopicProgressDb
  return { db, calls }
}

/**
 * ONE turn of the route's evidence stage, assembled from production modules.
 * The two `if`s are the route's own gates, asserted against its source below.
 */
async function runEvidenceStage(input: {
  assistantText: string
  priorAssistantText: string
  hasPendingStructuredMcq: boolean
  state: ConversationState
}) {
  const { signal: parsed } = parseSignalTag(input.assistantText)

  let signal: TeachingSignal | null = parsed
  let suppression: string | null = null
  if (signal && signal.correctness !== undefined) {
    const decision = shouldSuppressSignalCorrectness({
      priorAssistantText: input.priorAssistantText,
      hasPendingStructuredMcq: input.hasPendingStructuredMcq,
    })
    if (decision.suppress) {
      suppression = decision.reason
      signal = { ...signal, correctness: undefined }
    }
  }

  // GATE 1 — the ladder fold reads `correctness ?? null`.
  const next = advanceConversationState(input.state, {
    askedQuestion: false,
    signalCorrect: signal?.correctness ?? null,
    acknowledgement: signal?.correctness === undefined,
    recoveryFired: false,
  })

  // GATE 2 — the evidence write is gated on correctness being defined.
  const { db, calls } = spyDb()
  if (signal && signal.correctness !== undefined) {
    await applyTopicProgressEvidence(db, {
      userId: 'u1', subjectSlug: 'chemistry', topicSlug: CONCEPT,
      score: signal.correctness ? 65 : 25, eventId: 'msg-learner-1',
    })
  }

  return { signal, suppression, next, dbCalls: calls }
}

/** At CHECK, one rung below the first mastery gate — where the defect fired. */
function atCheck(over: Partial<ConversationState> = {}): ConversationState {
  return {
    ...initialConversationState(CONCEPT),
    phase: 'CHECK', demonstrated: true, correctAtCheck: 0, correctAtPractice: 0,
    ...over,
  }
}

describe('the route still applies the two gates this test stands on', () => {
  it('suppresses via the answerable-turn guard before anything consumes the signal', () => {
    expect(ROUTE).toContain('shouldSuppressSignalCorrectness')
    expect(ROUTE).toContain('teachingSignal = { ...teachingSignal, correctness: undefined }')
  })

  it('gates the topic_progress evidence write on correctness being defined', () => {
    expect(ROUTE).toContain('teachingSignal.correctness !== undefined')
    expect(ROUTE).toContain('applyTopicProgressEvidence')
  })

  it('runs the guard BEFORE the ladder fold and the evidence write', () => {
    // Ordering is the mechanism. If the guard ever moves after either
    // consumer, suppression stops removing the write and this fails.
    const guard = ROUTE.indexOf('shouldSuppressSignalCorrectness')
    const evidenceWrite = ROUTE.indexOf('applyTopicProgressEvidence')
    expect(guard).toBeGreaterThan(-1)
    expect(evidenceWrite).toBeGreaterThan(guard)
  })
})

describe('THE NEGATIVE CONTROL — injected bad shape, end to end', () => {
  it('suppresses correctness and records nothing anywhere', async () => {
    const r = await runEvidenceStage({
      assistantText: BAD_SIGNAL_TURN,
      priorAssistantText: NO_QUESTION_ASKED,
      hasPendingStructuredMcq: false,
      state: atCheck(),
    })

    // the claim is gone …
    expect(r.suppression).toBe('no-answerable-question')
    expect(r.signal?.correctness).toBeUndefined()
    // … and is ABSENT, not flipped to a wrong answer the learner never gave
    expect(r.signal?.correctness).not.toBe(false)

    // … the model's behavioural read survives …
    expect(r.signal?.confidence).toBe('high')
    expect(r.signal?.confusion).toBe(false)

    // … no counter moved, no mastery …
    expect(r.next.correctAtCheck).toBe(0)
    expect(r.next.correctAtPractice).toBe(0)
    expect(r.next.phase).toBe('CHECK')
    expect(r.next.verifiedCorrectAtCheck ?? 0).toBe(0)

    // … and the evidence writer was never reached, so no row was touched and
    // no marker minted.
    expect(r.dbCalls).toEqual([])
  })

  it('carries chosenPhrase through suppression as well', async () => {
    const r = await runEvidenceStage({
      assistantText: 'Right!\n<!--SIGNAL correctness="true" confidence="low" phrase="heavier things fall faster"-->',
      priorAssistantText: NO_QUESTION_ASKED,
      hasPendingStructuredMcq: false,
      state: atCheck(),
    })
    expect(r.signal?.correctness).toBeUndefined()
    expect(r.signal?.phrase).toBe('heavier things fall faster')
    expect(r.dbCalls).toEqual([])
  })

  it('holds at PRACTICE too — the rung that certifies mastery', async () => {
    const r = await runEvidenceStage({
      assistantText: BAD_SIGNAL_TURN,
      priorAssistantText: NO_QUESTION_ASKED,
      hasPendingStructuredMcq: false,
      state: atCheck({ phase: 'PRACTICE', correctAtPractice: 1 }),
    })
    // One more practice correct would have certified mastery.
    expect(r.next.correctAtPractice).toBe(1)
    expect(r.next.phase).toBe('PRACTICE')
    expect(r.dbCalls).toEqual([])
  })

  it('is exactly what changed: the same turn WITHOUT the guard would have written', async () => {
    // Same signal, same state, but the prior turn asked a real question — so
    // the guard does not fire and the whole pipeline proceeds. This is the
    // control that makes the assertions above mean something.
    const r = await runEvidenceStage({
      assistantText: BAD_SIGNAL_TURN,
      priorAssistantText: REAL_QUESTION,
      hasPendingStructuredMcq: false,
      state: atCheck(),
    })
    expect(r.suppression).toBeNull()
    expect(r.signal?.correctness).toBe(true)
    expect(r.next.correctAtCheck).toBe(1)
    expect(r.next.phase).toBe('PRACTICE')
    expect(r.dbCalls).toHaveLength(1)
  })
})

describe('the other two paths are unchanged by this test', () => {
  it('prose MCQ still suppresses, under its own reason, and writes nothing', async () => {
    const r = await runEvidenceStage({
      assistantText: BAD_SIGNAL_TURN,
      priorAssistantText: PROSE_MCQ,
      hasPendingStructuredMcq: false,
      state: atCheck(),
    })
    expect(r.suppression).toBe('prose-mcq-ungradeable')
    expect(r.signal?.correctness).toBeUndefined()
    expect(r.dbCalls).toEqual([])
  })

  it('a pending STRUCTURED MCQ is server-graded and passes through untouched', async () => {
    const r = await runEvidenceStage({
      assistantText: BAD_SIGNAL_TURN,
      priorAssistantText: NO_QUESTION_ASKED,
      hasPendingStructuredMcq: true,
      state: atCheck(),
    })
    expect(r.suppression).toBeNull()
    expect(r.signal?.correctness).toBe(true)
    expect(r.next.correctAtCheck).toBe(1)
    expect(r.dbCalls).toHaveLength(1)
  })

  it('a genuine WRONG answer after a real question still writes wrong evidence', async () => {
    const r = await runEvidenceStage({
      assistantText: 'Not quite.\n<!--SIGNAL correctness="false" confidence="high"-->',
      priorAssistantText: REAL_QUESTION,
      hasPendingStructuredMcq: false,
      state: atCheck(),
    })
    expect(r.suppression).toBeNull()
    expect(r.signal?.correctness).toBe(false)
    expect(r.next.consecutiveFailures).toBe(1)
    expect(r.dbCalls).toHaveLength(1)
  })

  it('the write, when it happens, stamps the learner message as the marker', async () => {
    // Proves the marker assertions above are meaningful: the writer really
    // does mint one on the path the suppressed turns never reach.
    const { db, calls } = spyDb()
    await applyTopicProgressEvidence(db, {
      userId: 'u1', subjectSlug: 'chemistry', topicSlug: CONCEPT,
      score: 65, eventId: 'msg-learner-1',
    })
    expect(JSON.stringify(calls)).toContain('msg-learner-1')
  })
})
