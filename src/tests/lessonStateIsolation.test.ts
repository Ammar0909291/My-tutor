/**
 * PHASE B — LESSON-STATE ISOLATION.
 *
 * THE ACCEPTANCE CRITERION, and every test below exists to hold one half of it:
 *
 *   No learner action in Lesson B may be interpreted using transient state
 *   belonging to Lesson A, while legitimate resume state for Lesson A remains
 *   intact.
 *
 * The two halves pull against each other, so the negative controls at the
 * bottom are not decoration — a fix that clears everything on every turn would
 * satisfy the first half and destroy the product.
 *
 * THE P0 REPRODUCED. `contextSnapshot.pendingMcq` stored a question with no
 * lesson identity, and lesson-init's delta did not include it, so a question
 * asked in lesson A graded the learner's FIRST MESSAGE in lesson B. The first
 * describe block below runs the real `readPendingQuestion` and the real
 * `gradeMcqAnswer` against the real snapshot shape and shows the grade
 * happening without the guard and refused with it.
 *
 * Every module under test is pure, so these run with no database, no provider
 * and no network — the same discipline the rest of this suite uses.
 */
import { describe, it, expect } from 'vitest'

import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'
import {
  readPendingQuestion, writePendingQuestion, clearPendingQuestionForNewAttempt,
} from '@/lib/teaching/pendingQuestion'
import {
  clearTransientStateForNewAttempt, NEW_ATTEMPT_CLEARED_KEYS,
} from '@/lib/teaching/attemptIsolation'
import {
  readConversationState, initialConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import { readTeachingHistory, selectNextStrategy, hasAskedMcq, memoryFingerprint } from '@/lib/teaching/teachingHistory'
import { readNarrativeState, advanceNarrativeState, narrativeComplete } from '@/lib/teaching/narrativeTracker'
import { readObjectiveState, isObjectiveLockedFromAssessment } from '@/lib/teaching/objectiveModel'
import { decideExcursion, NO_EXCURSION, type ExcursionState } from '@/lib/teaching/excursion'
import { parseVisualSession, clearVisualSessionForNewClientView } from '@/lib/teaching/visual/session'
import { clearEpisodeForLessonOpen, deriveEpisode } from '@/lib/teaching/sessionLifecycle'

// ── The two lessons, and the identities the runtime gives them ───────────────
const LESSON_A = 'phys.wave.interference'
const LESSON_B = 'phys.opt.lenses'

/** The question lesson A left pending — the shape route.ts persists. */
const A_MCQ: TutorMCQ = {
  question: 'When two waves meet crest to crest, what happens to the amplitude?',
  options: ['It doubles', 'It cancels', 'It stays the same'],
  correctIndex: 0,
}

/** Models writeSnapshotDelta's atomic JSONB merge: a key absent from the delta
 *  survives, a key set to null is retired. This is how the column really
 *  behaves (snapshotWrite.ts), so a test that merges any other way is testing
 *  a fiction. */
function merge(
  snapshot: Record<string, unknown>,
  ...deltas: Record<string, unknown>[]
): Record<string, unknown> {
  return Object.assign({}, snapshot, ...deltas)
}

/** What lesson-init writes when it OPENS an attempt (restart / review / first
 *  start) — the three composed clears, exactly as the route spreads them. */
function lessonInitOpeningAttempt(snapshot: Record<string, unknown>) {
  return merge(
    snapshot,
    clearEpisodeForLessonOpen(),
    clearVisualSessionForNewClientView(),
    clearTransientStateForNewAttempt(),
  )
}

/** What lesson-init writes when it opens NO attempt — a resume, or a `next`
 *  onto a lesson that already has an IN_PROGRESS row. */
function lessonInitWithoutOpeningAttempt(snapshot: Record<string, unknown>) {
  return merge(
    snapshot,
    clearEpisodeForLessonOpen(),
    clearVisualSessionForNewClientView(),
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. Lesson A's pending MCQ cannot grade Lesson B's message
// ═══════════════════════════════════════════════════════════════════════════
describe('P0 — a pending MCQ cannot survive into another lesson', () => {
  it('REPRODUCES IT: the pre-Phase-B shape grades lesson B against lesson A', () => {
    // The value as it was stored before this change: no lesson identity at all.
    const legacyRow = {
      question: A_MCQ.question, options: A_MCQ.options, correctIndex: A_MCQ.correctIndex,
    }
    // The old inline read (route.ts before Phase B) validated shape and nothing
    // else, so it handed the grader lesson A's question on lesson B's turn.
    const oldRead = (raw: Record<string, unknown>): TutorMCQ =>
      ({ question: raw.question as string, options: raw.options as string[], correctIndex: raw.correctIndex as number })
    const learnersFirstMessageInLessonB = 'It doubles I think'
    const grade = gradeMcqAnswer(learnersFirstMessageInLessonB, oldRead(legacyRow))
    // A grade was produced — evidence for phys.opt.lenses, from a
    // phys.wave.interference question the learner never saw in this lesson.
    expect(grade.correct).not.toBeNull()
  })

  it('FIXES IT: with the lesson stamped, lesson B refuses to read it', () => {
    const stored = writePendingQuestion(A_MCQ, LESSON_A)
    expect(readPendingQuestion(stored, LESSON_B)).toBeNull()
  })

  it('the guard fires however the learner phrases their first message', () => {
    const stored = writePendingQuestion(A_MCQ, LESSON_A)
    for (const msg of [
      'It doubles', 'a', 'A.', 'i think it doubles', 'hello', 'can we start?',
      'the first one', 'It cancels',
    ]) {
      const pending = readPendingQuestion(stored, LESSON_B)
      expect(pending, `message: ${msg}`).toBeNull()
      // And with nothing pending there is nothing to grade — the turn is
      // treated exactly as a turn on which the tutor asked nothing, which is
      // the truth about lesson B.
    }
  })

  it('the SAME lesson still grades — the guard is identity, not a blanket ban', () => {
    const stored = writePendingQuestion(A_MCQ, LESSON_A)
    const pending = readPendingQuestion(stored, LESSON_A)
    expect(pending).not.toBeNull()
    expect(gradeMcqAnswer('It doubles', pending!).correct).toBe(true)
  })

  it('a turn that asked nothing still retires the key, as before', () => {
    expect(writePendingQuestion(null, LESSON_A)).toBeNull()
  })

  it('null on one side only is a change of identity, not a match', () => {
    // School Mode has no lesson key. A question asked there must not grade a
    // Library lesson's reply, and vice versa.
    expect(readPendingQuestion(writePendingQuestion(A_MCQ, null), LESSON_B)).toBeNull()
    expect(readPendingQuestion(writePendingQuestion(A_MCQ, LESSON_A), null)).toBeNull()
    // Null on BOTH sides is School Mode continuing — unchanged behaviour.
    expect(readPendingQuestion(writePendingQuestion(A_MCQ, null), null)).not.toBeNull()
  })

  it('a malformed or corrupt row is still refused, exactly as before', () => {
    for (const bad of [
      null, undefined, 'x', 42, {},
      { question: 'q', options: ['a'], correctIndex: 5 },       // index out of range
      { question: 'q', options: 'a,b', correctIndex: 0 },        // options not an array
      { question: 'q', options: ['a', 2], correctIndex: 0 },     // non-string option
      { question: 7, options: ['a', 'b'], correctIndex: 0 },     // non-string question
      { question: 'q', options: ['a', 'b'], correctIndex: -1 },  // negative index
    ]) {
      expect(readPendingQuestion(bad, LESSON_A), JSON.stringify(bad)).toBeNull()
    }
  })

  it('a legacy row (written before the key existed) still grades — and self-heals', () => {
    // Behaviour for a session already in flight is byte-identical to before.
    const legacy = { question: A_MCQ.question, options: A_MCQ.options, correctIndex: A_MCQ.correctIndex }
    expect(readPendingQuestion(legacy, LESSON_B)).not.toBeNull()
    // The genuine cross-lesson path is closed by the attempt reset, and the
    // route rewrites this key unconditionally every turn, so the window is one
    // turn per session.
    const healed = merge({ pendingMcq: legacy }, { pendingMcq: writePendingQuestion(A_MCQ, LESSON_A) })
    expect(readPendingQuestion(healed.pendingMcq, LESSON_B)).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2 & 9. Lesson A's authored probe / attempt-transient state and a new lesson
// ═══════════════════════════════════════════════════════════════════════════
describe('an authored probe cannot follow the learner into another lesson', () => {
  it('the probe reaches the next turn as pendingMcq — so the identity guard covers it', () => {
    // Authored probes are not a second store: the selected probe becomes the
    // turn's MCQ and is persisted through this one key. Closing the key closes
    // the probe.
    const authoredProbe: TutorMCQ = {
      question: 'Which statement about constructive interference is correct?',
      options: ['Amplitudes add', 'Amplitudes cancel'],
      correctIndex: 0,
    }
    const stored = writePendingQuestion(authoredProbe, LESSON_A)
    expect(readPendingQuestion(stored, LESSON_B)).toBeNull()
    expect(readPendingQuestion(stored, LESSON_A)).not.toBeNull()
  })

  it('the spent-probe ledger is concept-keyed, so lesson B sees an unspent pool', () => {
    const spent = {
      ...readTeachingHistory(null, LESSON_A),
      mcqAsked: [memoryFingerprint('Which statement about constructive interference is correct?')],
      explanationsServed: ['asset-a1'],
      visualsShown: ['fig-a1'],
      strategiesUsed: [0, 1, 2, 3, 4, 5, 6],
    }
    const inLessonB = readTeachingHistory(spent, LESSON_B)
    expect(inLessonB.mcqAsked).toEqual([])
    expect(inLessonB.explanationsServed).toEqual([])
    expect(inLessonB.visualsShown).toEqual([])
    expect(selectNextStrategy(inLessonB)).toBe(0)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. Lesson A's excursion cannot block Lesson B
// ═══════════════════════════════════════════════════════════════════════════
describe('an excursion cannot follow the learner into another lesson', () => {
  const openExcursion: ExcursionState = {
    active: true,
    targetConceptId: 'phys.mech.viscosity',
    targetTopicTitle: null,
    returnToConceptId: LESSON_A,
    turns: 2,
  }

  it('the lesson moving underneath it closes it on lesson B turn one', () => {
    const d = decideExcursion({
      state: openExcursion,
      message: 'ok lets go',
      lessonConceptId: LESSON_B,
      requestedConceptId: null,
      requestedTopicTitle: null,
    })
    expect(d.transition).toBe('closed-lesson-changed')
    expect(d.state.active).toBe(false)
    expect(d.targetConceptId).toBe(LESSON_B)   // the new lesson is what is taught
  })

  it('an UNRESOLVED-topic excursion closes the same way', () => {
    const d = decideExcursion({
      state: { ...openExcursion, targetConceptId: null, targetTopicTitle: 'Kubernetes pod scheduling' },
      message: 'ok',
      lessonConceptId: LESSON_B,
      requestedConceptId: null,
      requestedTopicTitle: null,
    })
    expect(d.transition).toBe('closed-lesson-changed')
    expect(d.state.active).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. Lesson A's visual cannot contaminate Lesson B
// ═══════════════════════════════════════════════════════════════════════════
describe('a held figure cannot follow the learner into another lesson', () => {
  it('lesson-init retires visualSession on EVERY open, attempt or not', () => {
    const held = {
      visualSession: {
        conceptId: LESSON_A, representation: 'graph', renderer: 'plot',
        returnToConceptId: null, turns: 4,
      },
    }
    // Both paths — the boundary here is "a new client view", which is wider
    // than "a new attempt", because a freshly opened view renders nothing
    // whatever the server remembers.
    expect(parseVisualSession(lessonInitOpeningAttempt(held).visualSession)).toBeNull()
    expect(parseVisualSession(lessonInitWithoutOpeningAttempt(held).visualSession)).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. Lesson A's ladder cannot contaminate Lesson B
// ═══════════════════════════════════════════════════════════════════════════
describe('the concept ladder cannot follow the learner into another lesson', () => {
  const masteredInA: ConversationState = {
    ...initialConversationState(LESSON_A),
    phase: 'TRANSFER',
    demonstrated: true,
    correctAtCheck: 1,
    correctAtPractice: 2,
    verifiedCorrectAtCheck: 1,
    verifiedCorrectAtPractice: 2,
    turnsOnConcept: 14,
  }

  it('reads as a fresh ladder under lesson B, with zero mastery evidence', () => {
    const s = readConversationState(masteredInA, LESSON_B)
    expect(s.phase).toBe('OBSERVE')
    expect(s.conceptId).toBe(LESSON_B)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.verifiedCorrectAtPractice).toBe(0)
    expect(s.demonstrated).toBe(false)
    expect(s.turnsOnConcept).toBe(0)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 6 & 10. Restarting Lesson A (including a completed one) is a fresh attempt
// ═══════════════════════════════════════════════════════════════════════════
describe('restarting a lesson gives a genuinely fresh attempt', () => {
  /** Everything lesson A's previous attempt spent, in one snapshot. */
  const spentAttempt: Record<string, unknown> = {
    conversationState: {
      ...initialConversationState(LESSON_A),
      phase: 'TRANSFER', demonstrated: true,
      correctAtCheck: 1, correctAtPractice: 2, turnsOnConcept: 18,
      consecutiveFailures: 3, remediationCount: 2,
    },
    pendingMcq: writePendingQuestion(A_MCQ, LESSON_A),
    teachingHistory: {
      ...readTeachingHistory(null, LESSON_A),
      strategiesUsed: [0, 1, 2, 3, 4, 5, 6],
      mcqAsked: [memoryFingerprint(A_MCQ.question)],
      explanationsServed: ['asset-a1'],
      visualsShown: ['fig-a1'],
    },
    excursion: {
      active: true, targetConceptId: 'phys.mech.viscosity', targetTopicTitle: null,
      returnToConceptId: LESSON_A, turns: 3,
    },
    objectiveState: {
      objectiveId: LESSON_A, attemptCount: 9, assessmentCount: 4,
      completedAt: '2026-08-25T04:28:34.795Z', turnsSinceProgress: 5,
    },
    narrativeState: { conceptId: LESSON_A, hookDelivered: true, coreTaught: true, hookResolved: true },
    // Not per-attempt — asserted untouched further down.
    memoryContext: 'the learner prefers worked examples',
    placementVerification: { bracket: 'at', failures: 1 },
    questionLedger: { fingerprints: ['fp1'], recent: ['what do you notice?'] },
  }

  const after = lessonInitOpeningAttempt(spentAttempt)

  it('the ladder starts at OBSERVE with no mastery and no failure debt', () => {
    const s = readConversationState(after.conversationState, LESSON_A)
    expect(s.phase).toBe('OBSERVE')
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.turnsOnConcept).toBe(0)
    expect(s.consecutiveFailures).toBe(0)
    expect(s.remediationCount).toBe(0)
  })

  it('nothing is pending — the previous attempt\'s question cannot grade turn one', () => {
    expect(readPendingQuestion(after.pendingMcq, LESSON_A)).toBeNull()
  })

  it('the teaching is unspent: strategy 0 is available and the probe pool is fresh', () => {
    const h = readTeachingHistory(after.teachingHistory, LESSON_A)
    expect(selectNextStrategy(h)).toBe(0)
    expect(hasAskedMcq(h, A_MCQ.question)).toBe(false)
    expect(h.explanationsServed).toEqual([])
    expect(h.visualsShown).toEqual([])
  })

  it('the attempt does not begin mid-excursion on a side topic', () => {
    const d = decideExcursion({
      state: (after.excursion as ExcursionState | null) ?? NO_EXCURSION,
      message: 'ok teach me',
      lessonConceptId: LESSON_A,
      requestedConceptId: null,
      requestedTopicTitle: null,
    })
    expect(d.state.active).toBe(false)
    expect(d.targetConceptId).toBe(LESSON_A)
  })

  it('the objective has completed nothing and is not locked from assessment', () => {
    const o = readObjectiveState(after.objectiveState, LESSON_A)
    expect(o.completedAt).toBeNull()
    expect(o.attemptCount).toBe(0)
    expect(isObjectiveLockedFromAssessment(o)).toBe(false)
  })

  it('the narrative arc re-opens, so the fresh attempt delivers its own hook', () => {
    const n = readNarrativeState(after.narrativeState, LESSON_A)
    expect(n.hookDelivered).toBe(false)
    expect(narrativeComplete(n)).toBe(false)
  })

  it('the episode restarts at OPENING with the failure budget restored', () => {
    expect(after.sessionEpisode).toBeNull()
    expect(after.sessionFailureCount).toBe(0)
    expect(deriveEpisode(null, false, Date.now(), null).phase).toBe('OPENING')
  })

  it('a COMPLETED lesson reopened for restart is identical — the path is the same', () => {
    // lesson-init opens an attempt for `latest.status === 'COMPLETED' &&
    // (restart|review)`, which is the same `openedNewAttempt` branch this
    // whole block exercises. There is no second code path to diverge.
    const reopened = lessonInitOpeningAttempt({
      ...spentAttempt,
      conversationState: {
        ...initialConversationState(LESSON_A),
        phase: 'TRANSFER', demonstrated: true,
        correctAtCheck: 3, correctAtPractice: 5, turnsOnConcept: 30,
      },
    })
    const s = readConversationState(reopened.conversationState, LESSON_A)
    expect(s.phase).toBe('OBSERVE')
    expect(s.correctAtCheck).toBe(0)
    expect(readPendingQuestion(reopened.pendingMcq, LESSON_A)).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 8. A concept switch clears concept-specific state (no caller cooperation)
// ═══════════════════════════════════════════════════════════════════════════
describe('a concept switch clears concept-specific state by itself', () => {
  it('every concept-keyed reader resets on a different concept', () => {
    expect(readConversationState({ ...initialConversationState(LESSON_A), phase: 'CHECK' }, LESSON_B).phase)
      .toBe('OBSERVE')
    expect(readTeachingHistory({ ...readTeachingHistory(null, LESSON_A), strategiesUsed: [0, 1] }, LESSON_B).strategiesUsed)
      .toEqual([])
    expect(readObjectiveState({ objectiveId: LESSON_A, attemptCount: 4, assessmentCount: 1, completedAt: 'x', turnsSinceProgress: 0 }, LESSON_B).completedAt)
      .toBeNull()
  })

  it('the narrative arc resets too — the Phase B keying defect', () => {
    const arcFromA = advanceNarrativeState(
      readNarrativeState(null, LESSON_A),
      { deliveredHook: true, taughtCore: true, resolvedHook: true },
    )
    expect(narrativeComplete(arcFromA)).toBe(true)          // finished, in lesson A
    expect(narrativeComplete(readNarrativeState(arcFromA, LESSON_B))).toBe(false)
    expect(readNarrativeState(arcFromA, LESSON_B).hookDelivered).toBe(false)
  })

  it('REPRODUCES the pre-Phase-B keying defect: an unkeyed arc leaked', () => {
    // The shape as it was stored before the key existed.
    const unkeyed = { hookDelivered: true, coreTaught: true, hookResolved: true }
    // Old read (no key argument at all) returned it verbatim for any lesson.
    expect(narrativeComplete({ conceptId: null, ...unkeyed })).toBe(true)
    // Now the missing key is a mismatch, so the arc resets once and is
    // re-earned from the next turn's evidence.
    expect(narrativeComplete(readNarrativeState(unkeyed, LESSON_B))).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// The boundary itself
// ═══════════════════════════════════════════════════════════════════════════
describe('the new-attempt boundary is exactly what it says it is', () => {
  it('clears the six per-attempt keys and nothing else', () => {
    const delta = clearTransientStateForNewAttempt()
    expect(Object.keys(delta).sort()).toEqual([...NEW_ATTEMPT_CLEARED_KEYS])
    for (const k of NEW_ATTEMPT_CLEARED_KEYS) expect(delta[k]).toBeNull()
  })

  it('does NOT clear the keys that belong to other boundaries', () => {
    const delta = clearTransientStateForNewAttempt()
    for (const foreign of [
      'memoryContext', 'placementVerification', 'pendingPlacementProbe',
      'questionLedger', 'sessionEpisode', 'sessionFailureCount',
      'visualSession', 'currentConceptNodeId', 'teachingHistory_v2',
      'turnHistory', 'progressionMetrics', 'renderedRealityLog', 'capabilities',
      'frustration', 'lastSignal', 'lessonStageProgress',
    ]) {
      expect(delta, foreign).not.toHaveProperty(foreign)
    }
  })

  it('takes no snapshot argument, so it cannot rewrite the column', () => {
    expect(clearTransientStateForNewAttempt.length).toBe(0)
  })

  it('retires each key with an explicit null — writeSnapshotDelta MERGES', () => {
    // A delta that omitted a key would leave the stale value in place; a delta
    // that used `undefined` would be dropped by JSON.stringify before the SQL
    // ever ran. Both are silent failures, so the null is the assertion.
    const json = JSON.parse(JSON.stringify(clearTransientStateForNewAttempt()))
    expect(Object.keys(json).sort()).toEqual([...NEW_ATTEMPT_CLEARED_KEYS])
  })

  it('each key is retired by the module that OWNS it', () => {
    // Not a style point: a central list that re-declares another module's key
    // is a second owner and drifts the moment that module renames it.
    expect(clearPendingQuestionForNewAttempt()).toEqual({ pendingMcq: null })
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// NEGATIVE CONTROLS — 7, 11-15. Legitimate state must NOT be destroyed.
// ═══════════════════════════════════════════════════════════════════════════
describe('NEGATIVE CONTROL — a resume keeps everything it has earned', () => {
  const midLesson: Record<string, unknown> = {
    conversationState: {
      ...initialConversationState(LESSON_A),
      phase: 'PRACTICE', demonstrated: true,
      correctAtCheck: 1, correctAtPractice: 1,
      verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 1,
      turnsOnConcept: 9, taughtThisSession: true,
    },
    pendingMcq: writePendingQuestion(A_MCQ, LESSON_A),
    teachingHistory: {
      ...readTeachingHistory(null, LESSON_A),
      strategiesUsed: [0, 1], explanationsServed: ['asset-a1'],
    },
    excursion: {
      active: true, targetConceptId: 'phys.mech.viscosity', targetTopicTitle: null,
      returnToConceptId: LESSON_A, turns: 1,
    },
    narrativeState: { conceptId: LESSON_A, hookDelivered: true, coreTaught: false, hookResolved: false },
    objectiveState: { objectiveId: LESSON_A, attemptCount: 3, assessmentCount: 2, completedAt: null, turnsSinceProgress: 0 },
    memoryContext: 'the learner prefers worked examples',
  }

  // A refresh: lesson-init with mode 'resume' opens no attempt.
  const resumed = lessonInitWithoutOpeningAttempt(midLesson)

  it('the MCQ still on screen still grades — this is the whole reason for the scope', () => {
    const pending = readPendingQuestion(resumed.pendingMcq, LESSON_A)
    expect(pending).not.toBeNull()
    expect(gradeMcqAnswer('It doubles', pending!).correct).toBe(true)
  })

  it('mid-lesson mastery evidence survives a refresh', () => {
    const s = readConversationState(resumed.conversationState, LESSON_A)
    expect(s.phase).toBe('PRACTICE')
    expect(s.correctAtCheck).toBe(1)
    expect(s.correctAtPractice).toBe(1)
    expect(s.verifiedCorrectAtPractice).toBe(1)
    expect(s.turnsOnConcept).toBe(9)
    expect(s.demonstrated).toBe(true)
  })

  it('the teaching ledger survives — strategies are not silently re-offered', () => {
    const h = readTeachingHistory(resumed.teachingHistory, LESSON_A)
    expect(h.strategiesUsed).toEqual([0, 1])
    expect(selectNextStrategy(h)).toBe(2)
    expect(h.explanationsServed).toEqual(['asset-a1'])
  })

  it('an open excursion survives a refresh and still owes its return', () => {
    const d = decideExcursion({
      state: resumed.excursion as ExcursionState,
      message: 'so why does that happen?',
      lessonConceptId: LESSON_A,
      requestedConceptId: null,
      requestedTopicTitle: null,
    })
    expect(d.state.active).toBe(true)
    expect(d.returnToConceptId).toBe(LESSON_A)
  })

  it('the narrative arc keeps the hook it already delivered', () => {
    expect(readNarrativeState(resumed.narrativeState, LESSON_A).hookDelivered).toBe(true)
  })

  it('cross-session learner memory is never touched by any of these boundaries', () => {
    expect(resumed.memoryContext).toBe('the learner prefers worked examples')
    expect(lessonInitOpeningAttempt(midLesson).memoryContext)
      .toBe('the learner prefers worked examples')
  })

  it('an ordinary chat turn clears nothing — no reset fires on a turn boundary', () => {
    // Nothing in this change is wired to "a new turn happened". The only
    // per-turn write to pendingMcq is the one that has always existed.
    const nextTurn = merge(midLesson, { pendingMcq: writePendingQuestion(A_MCQ, LESSON_A) })
    expect(readConversationState(nextTurn.conversationState, LESSON_A).phase).toBe('PRACTICE')
    expect(readPendingQuestion(nextTurn.pendingMcq, LESSON_A)).not.toBeNull()
    expect((nextTurn.excursion as ExcursionState).active).toBe(true)
  })
})

describe('NEGATIVE CONTROL — mastery evidence cannot be invented or carried', () => {
  it('a fresh attempt reports zero verified evidence, so nothing can complete on turn one', () => {
    const after = lessonInitOpeningAttempt({
      conversationState: {
        ...initialConversationState(LESSON_A),
        phase: 'TRANSFER', correctAtCheck: 2, correctAtPractice: 3,
        verifiedCorrectAtCheck: 2, verifiedCorrectAtPractice: 3,
      },
    })
    const s = readConversationState(after.conversationState, LESSON_A)
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.verifiedCorrectAtPractice).toBe(0)
  })

  it('a cleared boundary GRANTS no evidence — every counter lands at zero, never above', () => {
    const s = readConversationState(clearTransientStateForNewAttempt().conversationState, LESSON_B)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.verifiedCorrectAtPractice).toBe(0)
    expect(s.demonstrated).toBe(false)
    expect(s.taughtThisSession).toBe(false)
  })

  it('lesson B cannot inherit lesson A\'s verified counters by any route', () => {
    const fromA = {
      ...initialConversationState(LESSON_A),
      phase: 'TRANSFER' as const, verifiedCorrectAtCheck: 1, verifiedCorrectAtPractice: 2,
    }
    // Neither by a plain concept switch...
    expect(readConversationState(fromA, LESSON_B).verifiedCorrectAtPractice).toBe(0)
    // ...nor through a lesson-init that opened an attempt.
    expect(readConversationState(
      lessonInitOpeningAttempt({ conversationState: fromA }).conversationState, LESSON_B,
    ).verifiedCorrectAtPractice).toBe(0)
  })
})
