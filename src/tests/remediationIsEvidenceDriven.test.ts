/**
 * PRODUCTION INCIDENT — the tutor behaved like a scripted textbook.
 *
 *   Student: "Oxygen"            (correct)
 *   Tutor:   praise -> large misconception lecture -> worked example -> MCQ
 *
 *   Student: "2 : 1"             (correct)
 *   Tutor:   correct -> immediately another long scripted block
 *
 * ROOT CAUSE — detectMisconceptions() answers "has this learner EVER
 * misconceived anything in this subject": a 30-day lookback across every
 * concept in the subject, with no knowledge of the current turn. The route
 * injected the misconception block (and, for a HIGH-confidence entry, an
 * explicit "run this remediation" strategy) on the strength of that answer
 * alone. So once a learner had made any mistake anywhere in the subject, a
 * remediation lecture was appended to the system prompt on EVERY turn for the
 * rest of the session — no matter how well they were doing.
 *
 * The TURN DIRECTIVE (buildTurnDirective + decideNextMoveDetailed) is the
 * canonical owner of "what should the tutor do after the student answers". The
 * misconception block was a COMPETING owner: it ordered a second, contradictory
 * pedagogical action above the directive, every turn.
 *
 * Remediation is now a response to evidence. Observation is unchanged — the CUE
 * still sees the full misconception history every turn.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { isRemediationWarranted } from '@/lib/school/adaptive/misconceptionEngine'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('a correct answer advances instead of triggering remediation', () => {
  it('the "Oxygen" turn: correct answer, no misconception block', () => {
    expect(isRemediationWarranted({
      lastSignalCorrect: true, lastSignalConfusion: false, sessionFailureCount: 0,
    })).toBe(false)
  })

  it('the "2 : 1" turn: correct answer with prior mistakes on record still advances', () => {
    // The learner HAS misconception history — that is what made this fire
    // before. History alone is no longer an instruction to remediate.
    expect(isRemediationWarranted({
      lastSignalCorrect: true, lastSignalConfusion: false, sessionFailureCount: 1,
    })).toBe(false)
  })

  it('a correct answer is never remediable, whatever else is true', () => {
    expect(isRemediationWarranted({ lastSignalCorrect: true })).toBe(false)
    expect(isRemediationWarranted({ lastSignalCorrect: true, sessionFailureCount: 1 })).toBe(false)
  })
})

describe('a confused or failing learner still receives remediation', () => {
  it('a wrong answer warrants it immediately', () => {
    expect(isRemediationWarranted({ lastSignalCorrect: false })).toBe(true)
  })

  it('expressed confusion warrants it immediately', () => {
    expect(isRemediationWarranted({ lastSignalConfusion: true })).toBe(true)
  })

  it('repeated failure warrants it even with no signal this turn', () => {
    // Same >= 2 threshold the runtime already uses for worked-example-first
    // and FOUNDATION_REBUILD — no new threshold invented.
    expect(isRemediationWarranted({ sessionFailureCount: 2 })).toBe(true)
    expect(isRemediationWarranted({ sessionFailureCount: 5 })).toBe(true)
  })

  it('a single failure alone does not yet escalate to the misconception protocol', () => {
    // "Student partially understands -> short clarification -> continue",
    // not the full protocol.
    expect(isRemediationWarranted({ sessionFailureCount: 1 })).toBe(false)
  })
})

describe('no evidence means no remediation', () => {
  it('an ungraded turn does not inject a lecture', () => {
    expect(isRemediationWarranted({})).toBe(false)
    expect(isRemediationWarranted({ lastSignalCorrect: null, lastSignalConfusion: null })).toBe(false)
  })

  it('is total — malformed counters never throw and never fire', () => {
    expect(isRemediationWarranted({ sessionFailureCount: Number.NaN })).toBe(false)
    expect(isRemediationWarranted({ sessionFailureCount: null })).toBe(false)
    expect(() => isRemediationWarranted({ sessionFailureCount: -1 })).not.toThrow()
    expect(isRemediationWarranted({ sessionFailureCount: -1 })).toBe(false)
  })

  it('is pure — same inputs, same answer', () => {
    for (let i = 0; i < 3; i++) {
      expect(isRemediationWarranted({ lastSignalCorrect: false })).toBe(true)
      expect(isRemediationWarranted({ lastSignalCorrect: true })).toBe(false)
    }
  })
})

describe('the runtime wiring keeps observation separate from action', () => {
  it('the CUE still observes misconceptions on every turn', () => {
    // Only the PROMPT INJECTION is gated. The Decision Engine reads
    // cueObservations.misconceptions and must not go blind.
    const assign = ROUTE.indexOf('cueObservations.misconceptions = misconceptions')
    const gate = ROUTE.indexOf('const remediationWarranted = isRemediationWarranted(')
    expect(assign).toBeGreaterThan(-1)
    expect(gate).toBeGreaterThan(assign) // observation happens first, ungated
  })

  it('the misconception block is built only when remediation is warranted', () => {
    expect(ROUTE).toContain('const block = remediationWarranted ? buildMisconceptionBlock(misconceptions) : null')
  })

  it('the remediation strategy cannot be injected without the block', () => {
    // buildRemediationStrategy sits inside `if (block)`, so gating the block
    // gates the explicit "run this remediation" instruction too.
    const blockAt = ROUTE.indexOf('const block = remediationWarranted ?')
    const strategyAt = ROUTE.indexOf('buildRemediationStrategy(topHighConfidence)', blockAt)
    const between = ROUTE.slice(blockAt, strategyAt)
    expect(between).toContain('if (block) {')
  })
})
