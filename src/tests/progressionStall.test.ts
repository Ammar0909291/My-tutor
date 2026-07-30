/**
 * Progression Stall — root-cause evidence + regression tests.
 *
 * Every test in the "EVIDENCE" sections below reproduces a mechanism by
 * which lesson progression can silently stop, using the SAME pure functions
 * the runtime uses. They are written evidence-first (Rule #1: no speculative
 * fixes): each one demonstrates the defect before any production change is
 * justified by it.
 *
 * Root causes proven here:
 *
 *   RC-A  CONCEPT IDENTITY FLAP → TOTAL CONVERSATION-STATE RESET.
 *         readConversationState() resets to initialConversationState() on any
 *         conceptId mismatch — wiping phase, mastery counters, taughtThisSession
 *         and every other counter. The route derives that conceptId, for most
 *         subjects, from a TopicProgress row picked by `.find(status ===
 *         'IN_PROGRESS')` over a query with NO `orderBy`. Postgres returns
 *         unordered rows in unspecified order, and an UPDATE relocates a row
 *         (MVCC writes a new tuple), so the row `.find()` returns can change
 *         between turns for a learner with more than one IN_PROGRESS topic —
 *         which is the normal steady state, since the conversational
 *         checkpoint upsert only ever writes IN_PROGRESS and never COMPLETED.
 *
 *   RC-D  MISSING SIGNAL → NO ADVANCEMENT, SILENTLY.
 *         The phase ladder advances only on signalCorrect === true. The signal
 *         is LLM self-report via a <!--SIGNAL--> comment. When the model omits
 *         it, advanceConversationState receives null and holds the phase
 *         forever, with no error and no detectable difference from a genuine
 *         non-answer turn.
 *
 * The "REGRESSION" sections assert the fixes.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, readConversationState, advanceConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { masteryVerified } from '@/lib/teaching/masteryGate'
import {
  pickCurrentTopicSlug, type TopicProgressRowLike,
} from '@/lib/teaching/progressionIntegrity'

// ── EVIDENCE · RC-A — concept identity flap wipes everything ───────────────

describe('EVIDENCE RC-A — a conceptId change resets the entire ConversationState', () => {
  /** A learner one correct answer away from mastery. */
  function nearMastery(conceptId: string): ConversationState {
    return {
      ...initialConversationState(conceptId),
      phase: 'PRACTICE',
      demonstrated: true,
      taughtThisSession: true,
      correctAtCheck: 1,
      correctAtPractice: 1,
      explanationCount: 4,
    }
  }

  it('a matching conceptId preserves all earned evidence', () => {
    const persisted = nearMastery('phys.qm.quantum-numbers')
    const restored = readConversationState(persisted, 'phys.qm.quantum-numbers')
    expect(restored.phase).toBe('PRACTICE')
    expect(restored.correctAtCheck).toBe(1)
    expect(restored.correctAtPractice).toBe(1)
    expect(restored.taughtThisSession).toBe(true)
  })

  it('PROVEN DEFECT: a DIFFERENT conceptId silently wipes mastery evidence', () => {
    const persisted = nearMastery('phys.qm.quantum-numbers')
    // The next turn resolved a different topic — see pickCurrentTopicSlug's
    // header for how that happened before the fix.
    const restored = readConversationState(persisted, 'phys.qm.pauli-exclusion')

    expect(restored.phase).toBe('OBSERVE')          // lesson restarts
    expect(restored.correctAtCheck).toBe(0)         // earned evidence gone
    expect(restored.correctAtPractice).toBe(0)
    expect(restored.taughtThisSession).toBe(false)  // "nothing taught yet"
    expect(restored.demonstrated).toBe(false)
    expect(restored.explanationCount).toBe(0)
  })

  it('PROVEN CONSEQUENCE: mastery becomes unreachable if the flap recurs', () => {
    // Each flap costs the learner every counter. A learner who flaps once per
    // two turns can answer correctly forever and never satisfy the gate.
    let s: ConversationState = initialConversationState('A')
    for (let turn = 0; turn < 12; turn++) {
      s = advanceConversationState(s, {
        askedQuestion: false, signalCorrect: true, recoveryFired: false,
      })
      // every other turn, the resolver hands back the other IN_PROGRESS topic
      if (turn % 2 === 1) s = readConversationState(s, turn % 4 === 1 ? 'B' : 'A')
    }
    expect(masteryVerified(s)).toBe(false)
  })

  it('PROVEN CONSEQUENCE: the flap re-arms QL-1, so the tutor re-teaches', () => {
    // taughtThisSession=false is what QL-1 reads to mean "nothing to answer
    // from". After a flap the runtime believes it has taught nothing, which
    // is the "repeats explanations" symptom.
    const persisted = { ...initialConversationState('A'), taughtThisSession: true, explanationCount: 3 }
    expect(readConversationState(persisted, 'B').taughtThisSession).toBe(false)
  })
})

// ── EVIDENCE · RC-D — a missing SIGNAL holds the machine forever ───────────

describe('EVIDENCE RC-D — an omitted SIGNAL silently freezes progression', () => {
  it('PROVEN DEFECT: a null signal advances nothing, indefinitely', () => {
    let s: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK', demonstrated: true, taughtThisSession: true,
    }
    for (let i = 0; i < 20; i++) {
      s = advanceConversationState(s, {
        askedQuestion: true, signalCorrect: null, recoveryFired: false,
      })
    }
    expect(s.phase).toBe('CHECK')                 // 20 turns, zero movement
    expect(s.correctAtCheck).toBe(0)
    expect(masteryVerified(s)).toBe(false)
  })

  it('is indistinguishable from a genuine non-answer turn (why it is silent)', () => {
    const base: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK', demonstrated: true, taughtThisSession: true,
    }
    const omittedSignal = advanceConversationState(base, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    })
    const genuineNonAnswer = advanceConversationState(base, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    })
    expect(omittedSignal).toEqual(genuineNonAnswer)
  })

  it('one real signal is all it takes — the machine itself is not broken', () => {
    const s: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK', demonstrated: true, taughtThisSession: true,
    }
    expect(advanceConversationState(s, {
      askedQuestion: false, signalCorrect: true, recoveryFired: false,
    }).phase).toBe('PRACTICE')
  })
})

// ── REGRESSION · pickCurrentTopicSlug is deterministic ────────────────────

describe('REGRESSION — pickCurrentTopicSlug never flaps on equivalent input', () => {
  const rows: TopicProgressRowLike[] = [
    { topicSlug: 'a', status: 'IN_PROGRESS', updatedAt: new Date('2026-01-01T00:00:00Z') },
    { topicSlug: 'b', status: 'IN_PROGRESS', updatedAt: new Date('2026-03-01T00:00:00Z') },
    { topicSlug: 'c', status: 'COMPLETED',   updatedAt: new Date('2026-04-01T00:00:00Z') },
  ]

  it('picks the most recently updated IN_PROGRESS topic', () => {
    expect(pickCurrentTopicSlug(rows)).toBe('b')
  })

  it('is invariant to row order — the exact defect that caused RC-A', () => {
    const permutations = [
      [rows[0], rows[1], rows[2]],
      [rows[2], rows[1], rows[0]],
      [rows[1], rows[0], rows[2]],
      [rows[2], rows[0], rows[1]],
    ]
    for (const p of permutations) {
      expect(pickCurrentTopicSlug(p)).toBe('b')
    }
  })

  it('breaks ties on identical timestamps deterministically (slug order)', () => {
    const t = new Date('2026-01-01T00:00:00Z')
    const tied: TopicProgressRowLike[] = [
      { topicSlug: 'zebra', status: 'IN_PROGRESS', updatedAt: t },
      { topicSlug: 'apple', status: 'IN_PROGRESS', updatedAt: t },
    ]
    expect(pickCurrentTopicSlug(tied)).toBe('apple')
    expect(pickCurrentTopicSlug([...tied].reverse())).toBe('apple')
  })

  it('ignores COMPLETED/MASTERED rows entirely', () => {
    expect(pickCurrentTopicSlug([
      { topicSlug: 'done', status: 'COMPLETED', updatedAt: new Date('2027-01-01Z'.replace('Z', 'T00:00:00Z')) },
      { topicSlug: 'live', status: 'IN_PROGRESS', updatedAt: new Date('2020-01-01T00:00:00Z') },
    ])).toBe('live')
  })

  it('returns null when there is no in-progress topic (no invented identity)', () => {
    expect(pickCurrentTopicSlug([])).toBeNull()
    expect(pickCurrentTopicSlug([
      { topicSlug: 'x', status: 'COMPLETED', updatedAt: new Date() },
    ])).toBeNull()
  })

  it('tolerates missing/invalid updatedAt without throwing or flapping', () => {
    const messy = [
      { topicSlug: 'b', status: 'IN_PROGRESS', updatedAt: undefined },
      { topicSlug: 'a', status: 'IN_PROGRESS', updatedAt: null },
    ] as unknown as TopicProgressRowLike[]
    expect(pickCurrentTopicSlug(messy)).toBe('a')       // falls back to slug order
    expect(pickCurrentTopicSlug([...messy].reverse())).toBe('a')
  })
})
