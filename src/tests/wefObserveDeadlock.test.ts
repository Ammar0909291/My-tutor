/**
 * PHASE E — THE WORKED-EXAMPLE-FIRST GATE MUST NOT DEADLOCK AT OBSERVE.
 *
 * ── THE DEFECT, MEASURED ────────────────────────────────────────────────────
 *   conversationState.ts  if (ctx.workedExampleFirst && !state.demonstrated) return 'show'
 *   conversationState.ts  if (prev.phase !== 'OBSERVE') next.demonstrated = true
 *
 * `demonstrated` is BY CONSTRUCTION unsettable while phase === OBSERVE — the
 * OBSERVE give is an "anchor", which the fold deliberately excludes from
 * counting as a demonstration. The gate was active at OBSERVE anyway. So the
 * gate's own release condition was walled off by the gate:
 *
 *   gate fires -> move 'show' -> a show asks nothing -> no answer, no SIGNAL
 *   -> `succeeded` never true -> phase cannot advance -> demonstrated stays
 *   false -> gate fires again, forever.
 *
 * Measured against the real modules before the fix: twelve consecutive SHOW
 * moves, phase pinned at OBSERVE, demonstrated false throughout. With
 * workedExampleFirst=false the same sequence asks from turn two.
 *
 * IT REACHED EVERY BEGINNER, not a struggling subset. `foundationBias` is true
 * at `computeFoundationConfidence >= 0.4`, and `profileLevel === 'beginner'`
 * alone scores exactly 0.4 — so FOUNDATION_REBUILD, and therefore
 * workedExampleFirst, is the DEFAULT on turn one with zero failures.
 *
 * ── WHY SCOPING TO OBSERVE IS THE WHOLE FIX ─────────────────────────────────
 * The gate's stated purpose ("Lead with a worked example before theory",
 * teachingStrategy.ts) is already delivered by two other rules, which is why
 * removing it at OBSERVE costs nothing:
 *
 *   turn 1       QL-1 blocks ASK (nothing taught yet) -> SHOW, with
 *                blockedReason QL1_NO_ANSWERABLE_SOURCE
 *   DEMONSTRATE  the phase switch returns SHOW on its own
 *
 * Test 2 and test 3 below pin exactly those two, by MECHANISM rather than by
 * outcome — otherwise they would keep passing for the wrong reason and stop
 * being guards.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, readConversationState, decideNextMove,
  decideNextMoveDetailed, advanceConversationState,
  type ConversationState, type NextMoveContext, type TeachingPhase,
} from '@/lib/teaching/conversationState'

const wef = (over: Partial<NextMoveContext> = {}): NextMoveContext => ({
  recoveryTurn: false, workedExampleFirst: true,
  legality: { hasEvidencedPriorKnowledge: false }, ...over,
})
const S = (over: Partial<ConversationState> = {}): ConversationState =>
  ({ ...initialConversationState('c'), ...over })

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE DEADLOCK
// ═══════════════════════════════════════════════════════════════════════════
describe('1 — OBSERVE cannot become an infinite SHOW loop', () => {
  it('twelve turns with no acknowledgement and no grade are not twelve SHOWs', () => {
    // The exact production condition: a beginner (WEF=true) who never says
    // "ok" and is never asked a gradeable question. "ok" is what masked this
    // in the live run, so it is deliberately absent here.
    let s = initialConversationState('c')
    const moves: string[] = []
    for (let i = 0; i < 12; i++) {
      moves.push(decideNextMove(s, wef()))
      s = advanceConversationState(s, {
        askedQuestion: false, deliveredTeaching: true,
        acknowledgement: false, degradedTurn: false,
      } as never)
    }
    expect(moves.every((m) => m === 'show'), moves.join(' ')).toBe(false)
    expect(moves).toContain('ask')
  })

  it('the OBSERVE observation question is reachable at all', () => {
    // OBSERVE exists to ask exactly one observation question. With the gate
    // active there it could never be asked.
    const s = S({ phase: 'OBSERVE', taughtThisSession: true, teachSegmentsSinceQuestion: 2 })
    expect(decideNextMove(s, wef())).toBe('ask')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2 & 3. WHAT MUST NOT CHANGE — pinned by MECHANISM, not by outcome
// ═══════════════════════════════════════════════════════════════════════════
describe('2 — the first turn is still a worked example', () => {
  it('turn one is SHOW, and QL-1 is the reason', () => {
    // If this ever starts passing because of the WEF gate again, the
    // blockedReason assertion is what will notice.
    const d = decideNextMoveDetailed(initialConversationState('c'), wef())
    expect(d.move).toBe('show')
    expect(d.blockedReason).toBe('QL1_NO_ANSWERABLE_SOURCE')
  })

  it('and it is SHOW with the gate off too — the gate was never what did it', () => {
    const d = decideNextMoveDetailed(initialConversationState('c'), wef({ workedExampleFirst: false }))
    expect(d.move).toBe('show')
    expect(d.blockedReason).toBe('QL1_NO_ANSWERABLE_SOURCE')
  })
})

describe('3 — DEMONSTRATE still demonstrates', () => {
  it('returns SHOW with WEF=true and demonstrated=false', () => {
    const s = S({ phase: 'DEMONSTRATE', taughtThisSession: true, demonstrated: false })
    expect(decideNextMove(s, wef())).toBe('show')
  })

  it('and the phase switch returns SHOW there without the gate at all', () => {
    const s = S({ phase: 'DEMONSTRATE', taughtThisSession: true, demonstrated: false })
    expect(decideNextMove(s, wef({ workedExampleFirst: false }))).toBe('show')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. G-1 IS UNTOUCHED
// ═══════════════════════════════════════════════════════════════════════════
describe('4 — G-1 still sets demonstrated and moves DEMONSTRATE -> GUIDE', () => {
  it('on a give', () => {
    const s = S({ phase: 'DEMONSTRATE', taughtThisSession: true, demonstrated: false })
    const n = advanceConversationState(s, {
      askedQuestion: false, deliveredTeaching: true, degradedTurn: false,
    } as never)
    expect(n.demonstrated).toBe(true)
    expect(n.phase).toBe('GUIDE')
  })

  it('on a correct answer', () => {
    const s = S({ phase: 'DEMONSTRATE', taughtThisSession: true, demonstrated: false })
    const n = advanceConversationState(s, {
      signalCorrect: true, askedQuestion: true, deliveredTeaching: false, degradedTurn: false,
    } as never)
    expect(n.demonstrated).toBe(true)
    expect(n.phase).toBe('GUIDE')
  })

  it('but a degraded outage turn still demonstrates nothing', () => {
    const s = S({ phase: 'DEMONSTRATE', taughtThisSession: true, demonstrated: false })
    const n = advanceConversationState(s, {
      askedQuestion: false, deliveredTeaching: true, degradedTurn: true,
    } as never)
    expect(n.demonstrated).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. THE REACHABILITY INVARIANT — why CHECK/PRACTICE cannot be starved
// ═══════════════════════════════════════════════════════════════════════════
describe('5 — no reachable state has phase >= CHECK with demonstrated=false', () => {
  it('exhaustive forward search over the real fold', () => {
    // This is the property that makes the WEF gate harmless at the mastery
    // gates: both transitions into CHECK are gated on `demonstrated`, and
    // phaseDown only ever lowers a phase. If a future change breaks that, the
    // WEF gate could suppress a mastery question — so the invariant is pinned
    // here rather than assumed.
    const EV: Record<string, unknown>[] = [
      { signalCorrect: true, askedQuestion: true, deliveredTeaching: false },
      { signalCorrect: true, askedQuestion: false, deliveredTeaching: true },
      { signalCorrect: false, askedQuestion: true, deliveredTeaching: false },
      { signalCorrect: false, askedQuestion: false, deliveredTeaching: true },
      { acknowledgement: true, askedQuestion: false, deliveredTeaching: true },
      { acknowledgement: true, askedQuestion: true, deliveredTeaching: false },
      { dontKnowSignal: true, askedQuestion: false, deliveredTeaching: true },
      { recoveryFired: true, askedQuestion: false, deliveredTeaching: true },
      { degradedTurn: true, askedQuestion: false, deliveredTeaching: false },
      { askedQuestion: true, deliveredTeaching: true },
    ]
    const key = (s: ConversationState) =>
      [s.phase, s.demonstrated, s.taughtThisSession, s.correctAtCheck, s.correctAtPractice,
        s.consecutiveFailures, s.observeFailures, s.consecutiveDontKnows,
        Math.min(s.teachSegmentsSinceQuestion ?? 0, 3),
        Math.min(s.questionsAskedSinceTeach ?? 0, 3),
        s.totalKnowledgeProbes, s.consecutivePriorKnowledgeProbes].join('|')

    const seen = new Set<string>()
    const queue: ConversationState[] = [initialConversationState('c')]
    seen.add(key(queue[0]))
    const violations: string[] = []
    const GATED: TeachingPhase[] = ['CHECK', 'PRACTICE', 'TRANSFER']
    while (queue.length) {
      const s = queue.shift()!
      for (const ev of EV) {
        const n = advanceConversationState(s, { degradedTurn: false, ...ev } as never)
        const k = key(n)
        if (seen.has(k)) continue
        seen.add(k)
        if (GATED.includes(n.phase) && !n.demonstrated) violations.push(`${n.phase} via ${JSON.stringify(ev)}`)
        if (seen.size < 100_000) queue.push(n)
      }
    }
    expect(seen.size).toBeGreaterThan(10_000)   // the search really ran
    expect(violations).toEqual([])
  }, 60_000)
})

// ═══════════════════════════════════════════════════════════════════════════
// 6. THE ONE PATH INTO THOSE CELLS — restore — self-heals
// ═══════════════════════════════════════════════════════════════════════════
describe('6 — a snapshot missing `demonstrated` self-heals without losing mastery', () => {
  it('restores at CHECK with demonstrated=false and recovers in one turn', () => {
    // readConversationState spreads initialConversationState first, so a row
    // written before the field existed restores demonstrated=false while
    // keeping its phase. This is the only live route into the dead cells.
    const legacy = {
      conceptId: 'c', phase: 'CHECK', correctAtCheck: 0, correctAtPractice: 0,
      taughtThisSession: true, teachSegmentsSinceQuestion: 2,
    }
    const restored = readConversationState(legacy, 'c')
    expect(restored.phase).toBe('CHECK')
    expect(restored.demonstrated).toBe(false)

    // One give repairs the flag, and no mastery counter moves while it does.
    const after = advanceConversationState(restored, {
      askedQuestion: false, deliveredTeaching: true, degradedTurn: false,
    } as never)
    expect(after.demonstrated).toBe(true)
    expect(after.correctAtCheck).toBe(0)
    expect(after.correctAtPractice).toBe(0)

    // And from then on the mastery question is asked.
    expect(decideNextMove({ ...after, teachSegmentsSinceQuestion: 2 }, wef())).toBe('ask')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 7-11. EVERYTHING ELSE THE FIX MUST NOT MOVE
// ═══════════════════════════════════════════════════════════════════════════
describe('7 — remediation is unchanged', () => {
  it('>= 2 consecutive failures still forces SHOW', () => {
    const s = S({ phase: 'GUIDE', taughtThisSession: true, demonstrated: true,
      consecutiveFailures: 2, teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(s, wef())).toBe('show')
    expect(decideNextMove(s, wef({ workedExampleFirst: false }))).toBe('show')
  })

  it('two "I don\'t know"s still force a give', () => {
    const s = S({ phase: 'OBSERVE', taughtThisSession: true,
      consecutiveDontKnows: 2, teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(s, wef())).not.toBe('ask')
  })

  it('the OBSERVE-failure escape still forces SHOW at OBSERVE', () => {
    // Scoped to OBSERVE by design — and it must survive a fix that changes
    // what else happens at OBSERVE.
    const s = S({ phase: 'OBSERVE', taughtThisSession: true,
      observeFailures: 2, teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(s, wef())).toBe('show')
  })

  it('recovery still preempts everything', () => {
    const s = S({ phase: 'OBSERVE', taughtThisSession: true })
    expect(decideNextMove(s, wef({ recoveryTurn: true }))).toBe('teach')
  })
})

describe('8 — an explicit practice request at GUIDE still asks', () => {
  it('with demonstrated=true', () => {
    const s = S({ phase: 'GUIDE', taughtThisSession: true, demonstrated: true,
      teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(s, wef({ practiceRequested: true }))).toBe('ask')
  })
})

describe('9/10/11 — mastery semantics are untouched', () => {
  it('the mastery gates still ask once demonstrated', () => {
    for (const phase of ['CHECK', 'PRACTICE', 'TRANSFER'] as TeachingPhase[]) {
      const s = S({ phase, taughtThisSession: true, demonstrated: true, teachSegmentsSinceQuestion: 2 })
      expect(decideNextMove(s, wef()), phase).toBe('ask')
    }
  })

  it('a correct answer at CHECK increments correctAtCheck and moves to PRACTICE', () => {
    const s = S({ phase: 'CHECK', taughtThisSession: true, demonstrated: true })
    const n = advanceConversationState(s, {
      signalCorrect: true, askedQuestion: true, deliveredTeaching: false, degradedTurn: false,
    } as never)
    expect(n.correctAtCheck).toBe(1)
    expect(n.phase).toBe('PRACTICE')
  })

  it('two correct at PRACTICE reach TRANSFER, and not before', () => {
    let s = S({ phase: 'PRACTICE', taughtThisSession: true, demonstrated: true })
    const ev = { signalCorrect: true, askedQuestion: true, deliveredTeaching: false, degradedTurn: false }
    s = advanceConversationState(s, ev as never)
    expect(s.correctAtPractice).toBe(1)
    expect(s.phase).toBe('PRACTICE')
    s = advanceConversationState(s, ev as never)
    expect(s.correctAtPractice).toBe(2)
    expect(s.phase).toBe('TRANSFER')
  })

  it('an acknowledgement never moves a mastery counter', () => {
    for (const phase of ['CHECK', 'PRACTICE', 'TRANSFER'] as TeachingPhase[]) {
      const s = S({ phase, taughtThisSession: true, demonstrated: true })
      const n = advanceConversationState(s, {
        acknowledgement: true, askedQuestion: false, deliveredTeaching: true, degradedTurn: false,
      } as never)
      expect(n.correctAtCheck, phase).toBe(0)
      expect(n.correctAtPractice, phase).toBe(0)
      expect(n.phase, phase).toBe(phase)
    }
  })
})
