/**
 * PHASE 10 — MAKE THE BRAIN'S MANDATORY PROMISES OBSERVABLE.
 *
 * ── THE MEASURED DEFECT (Phase 9) ───────────────────────────────────────────
 * `D0b-CLOSING-PROTECT`, `D0c-FIRST-LESSON-PROTOCOL` and
 * `D0d-SESSION-OPENING-PROTOCOL` each inject a MANDATORY instruction block, and
 * all three route to executor `LLM_OPEN`. `checkBrainCompliance` returned
 * compliant-by-construction for `LLM_OPEN` on the premise that "open escalation
 * has no structural directive" — false for exactly these three.
 *
 * Production, `phys.mech.newtons-first-law`: 8 D0b turns after the affect
 * budget was spent. 7 carried a question mark; the content introduced new
 * scenarios (a spaceship at 5,000 m/s, a crate sliding at 3 m/s) that the close
 * block forbids; the close itself arrived at turn 6 of 8 and teaching resumed
 * after it. Not one turn was flagged.
 *
 * ── WHAT THIS PHASE IS AND IS NOT ───────────────────────────────────────────
 * MEASUREMENT ONLY. Nothing re-renders, re-prompts, replaces output or spends a
 * provider call on a violation. A violating turn reaches the learner exactly as
 * it does today, because an enforcement decision has to follow an honest
 * baseline rather than precede it. These tests pin that as hard as they pin the
 * checks themselves.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import {
  checkProtocolCompliance,
  checkBrainCompliance,
  countSentences,
  type ProtocolContext,
} from '@/lib/understanding/execution'
import type { DispatchPlan } from '@/lib/understanding/dispatcher'
import type { TeachingDecision } from '@/lib/understanding/decisionEngine'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const ROUTE = REPO('src/app/api/learn/chat/route.ts')
const EXEC = REPO('src/lib/understanding/execution.ts')
const SCHEMA = REPO('prisma/schema.prisma')
const MIGRATION = REPO('prisma/migrations/20260817203000_message_protocol_compliance/migration.sql')

const ctx = (over: Partial<ProtocolContext> = {}): ProtocolContext => ({
  mcqAttached: false, isFirstTurnOfEpisode: false, ...over,
})

/** A compliant close, as buildAffectCloseBlock actually specifies it. */
const GOOD_CLOSE =
  'You worked out that a moving object keeps moving when nothing pushes back. ' +
  'Next time we will look at what happens when something does push back.'

describe('D0b — the close contract', () => {
  it('a real two-sentence close with no question passes', () => {
    const r = checkProtocolCompliance('D0b-CLOSING-PROTECT', GOOD_CLOSE, ctx())
    expect(r.status).toBe('PASS')
    expect(r.violation).toBeNull()
  })

  it('a question mark is a violation — the block forbids new questions', () => {
    const r = checkProtocolCompliance('D0b-CLOSING-PROTECT', 'Great work today. What do you think happens next?', ctx())
    expect(r.status).toBe('VIOLATION')
    expect(r.violation).toBe('D0B_QUESTION_PRESENT')
  })

  it('an attached assessment is another attempt, which the block forbids', () => {
    const r = checkProtocolCompliance('D0b-CLOSING-PROTECT', GOOD_CLOSE, ctx({ mcqAttached: true }))
    expect(r.violation).toBe('D0B_NEW_ATTEMPT')
  })

  it('a turn far longer than a two-sentence close is a violation', () => {
    // The closest defensible proxy for "introduced new content" that does not
    // require judging meaning.
    const long = Array.from({ length: 9 }, (_, i) => `This is sentence number ${i}.`).join(' ')
    const r = checkProtocolCompliance('D0b-CLOSING-PROTECT', long, ctx())
    expect(r.violation).toBe('D0B_LENGTH_EXCEEDED')
  })

  it('a slightly verbose but genuine close is NOT called a violation', () => {
    // The ceiling is deliberately loose (6 vs a stated ~2). A check that
    // misfires on correct teaching is worse than no check, because it would be
    // believed.
    const four = 'You got it. That was the tricky one. Tomorrow we build on it. See you then.'
    expect(checkProtocolCompliance('D0b-CLOSING-PROTECT', four, ctx()).status).toBe('PASS')
  })

  it('MULTIPLE violations are joined, never collapsed into one label', () => {
    // Phase 6's lesson, encoded: `confidence_failed` was really the already-read
    // guard, and a shared bucket pointed the next optimization at a matcher that
    // was working.
    const long = Array.from({ length: 9 }, (_, i) => `Sentence ${i}.`).join(' ') + ' Ready?'
    const r = checkProtocolCompliance('D0b-CLOSING-PROTECT', long, ctx({ mcqAttached: true }))
    expect(r.violation).toBe('D0B_QUESTION_PRESENT+D0B_LENGTH_EXCEEDED+D0B_NEW_ATTEMPT')
  })

  it('reproduces the shape of the real production violations', () => {
    // Turn 4 of the measured run: a reaction plus a new scenario, ending in a
    // question. 225 chars, so length alone would NOT have caught it — the
    // question check is what makes this detectable.
    const real = 'Claude, that is spot on! The spaceship maintains its speed of 5,000 metres '
      + 'per second because there is no net force acting to change its motion. How do you '
      + 'think that would change near a planet?'
    const r = checkProtocolCompliance('D0b-CLOSING-PROTECT', real, ctx())
    expect(r.status).toBe('VIOLATION')
    expect(r.violation).toContain('D0B_QUESTION_PRESENT')
  })
})

describe('D0c — first-lesson contract', () => {
  it('a two-sentence burst passes', () => {
    expect(checkProtocolCompliance('D0c-FIRST-LESSON-PROTOCOL', 'Watch this. Now you try.', ctx()).status).toBe('PASS')
  })

  it('a long burst violates the 2-sentence limit', () => {
    const long = Array.from({ length: 7 }, (_, i) => `Line ${i}.`).join(' ')
    expect(checkProtocolCompliance('D0c-FIRST-LESSON-PROTOCOL', long, ctx()).violation).toBe('D0C_BURST_TOO_LONG')
  })

  it('opening lesson one with a quiz is a violation', () => {
    // "NEVER open with a quiz or a knowledge check."
    const r = checkProtocolCompliance('D0c-FIRST-LESSON-PROTOCOL', 'Hello! Try this.', ctx({ isFirstTurnOfEpisode: true, mcqAttached: true }))
    expect(r.violation).toBe('D0C_OPENED_WITH_QUIZ')
  })

  it('an assessment later in lesson one is NOT the opening violation', () => {
    expect(checkProtocolCompliance('D0c-FIRST-LESSON-PROTOCOL', 'Nice. Try this one.', ctx({ mcqAttached: true })).status).toBe('PASS')
  })

  it('D0b checks are NOT applied to D0c — each rule gets its own contract', () => {
    // A question in lesson one is expected (the protocol allows up to 6);
    // mechanically reusing D0b's check here would manufacture violations.
    expect(checkProtocolCompliance('D0c-FIRST-LESSON-PROTOCOL', 'Can you say it back?', ctx()).status).toBe('PASS')
  })
})

describe('D0d — honestly unmeasurable', () => {
  it('is reported NOT_MEASURABLE, not PASS and not VIOLATION', () => {
    // Every requirement in buildOpeningBlock is ordering and presence of
    // meaning. Inventing a structural signature would manufacture a rate
    // rather than measure one.
    const r = checkProtocolCompliance('D0d-SESSION-OPENING-PROTOCOL', 'Welcome back! Ready?', ctx())
    expect(r.status).toBe('NOT_CHECKED')
    expect(r.violation).toBe('NOT_MEASURABLE')
  })

  it('an unverifiable PROTOCOL stays distinguishable from no protocol at all', () => {
    const none = checkProtocolCompliance('D8-LLM-FLOOR', 'anything', ctx())
    expect(none.status).toBe('NOT_CHECKED')
    expect(none.violation).toBeNull()
  })

  it('a missing rule is NOT_CHECKED, never silently PASS', () => {
    expect(checkProtocolCompliance(null, 'x', ctx()).status).toBe('NOT_CHECKED')
  })
})

describe('the LLM_OPEN blind spot is closed at the single existing authority', () => {
  const plan = (executor: DispatchPlan['executor']): DispatchPlan => ({
    version: 1, decision: 'ESCALATE_TO_LLM', ruleId: 'D0b-CLOSING-PROTECT',
    executor, engine: 'x', groqRequired: true, note: 'x',
  })
  const decision = (ruleId: string) => ({ ruleId, decision: 'ESCALATE_TO_LLM' } as unknown as TeachingDecision)

  it('THE DEFECT: a violating close on LLM_OPEN is no longer auto-compliant', () => {
    const r = checkBrainCompliance('Nice work! What is next?', plan('LLM_OPEN'), decision('D0b-CLOSING-PROTECT'), false, ctx())
    expect(r.compliant).toBe(false)
    expect(r.status).toBe('VIOLATION')
  })

  it('a non-protocol LLM_OPEN turn keeps the original behaviour', () => {
    const r = checkBrainCompliance('anything at all?', plan('LLM_OPEN'), decision('D8-LLM-FLOOR'), false, ctx())
    expect(r.compliant).toBe(true)
    expect(r.status).toBe('NOT_CHECKED')
  })

  it('omitting the context leaves every pre-existing check byte-for-byte unchanged', () => {
    // The parameter is optional so no existing caller changes meaning.
    const r = checkBrainCompliance('Nice work! What is next?', plan('LLM_OPEN'), decision('D0b-CLOSING-PROTECT'), false)
    expect(r.compliant).toBe(true)
    expect(r.reason).toContain('open escalation')
  })

  it('there is exactly ONE compliance authority — no parallel checker', () => {
    expect((EXEC.match(/export function checkBrainCompliance/g) ?? []).length).toBe(1)
    expect(ROUTE).toContain('const complianceResult = checkBrainCompliance(')
  })
})

describe('MEASUREMENT ONLY — no remedy, no provider call', () => {
  it('the checker is pure: no fetch, no provider, no prisma', () => {
    for (const forbidden of ['routeAI', 'fetch(', 'prisma', 'rerender']) {
      expect(EXEC).not.toContain(forbidden)
    }
  })

  it('the route adds NO provider call for compliance', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })

  it('nothing branches on the violation to change what the learner is served', () => {
    // The two variables may only be READ into the telemetry object. If a
    // future edit makes serving conditional on them, this fails.
    for (const v of ['protocolComplianceStatus', 'protocolComplianceViolation']) {
      const uses = [...ROUTE.matchAll(new RegExp(`if\\s*\\([^)]*${v}`, 'g'))]
      expect(uses.length).toBe(0)
    }
  })

  it('the verdict is persisted with the existing telemetry, one write', () => {
    expect(ROUTE).toContain('teachingComplianceStatus: protocolComplianceStatus,')
    expect(ROUTE).toContain('teachingComplianceViolation: protocolComplianceViolation,')
    const obj = ROUTE.slice(
      ROUTE.indexOf('const dependencyInstrumentation = {'),
      ROUTE.indexOf('llmCallCount,', ROUTE.indexOf('const dependencyInstrumentation = {')) + 20,
    )
    expect(obj).toContain('teachingComplianceStatus:')
    expect(obj).toContain('teachingRuleId:')
  })
})

describe('additive, nullable, no backfill', () => {
  it('both columns are optional', () => {
    expect(SCHEMA).toMatch(/teachingComplianceStatus\s+String\?/)
    expect(SCHEMA).toMatch(/teachingComplianceViolation\s+String\?/)
  })

  it('the migration only ADDs nullable columns and backfills nothing', () => {
    const ddl = MIGRATION.replace(/^\s*--.*$/gm, '')
    const alter = ddl.split('\n').filter((l) => /ALTER TABLE/.test(l)).join('\n')
    expect(alter).not.toMatch(/NOT NULL|DEFAULT /)
    expect(ddl).not.toMatch(/DROP |ALTER COLUMN|UPDATE |INSERT /i)
  })
})

describe('countSentences is only ever used against stated sentence limits', () => {
  it('counts plain sentences', () => {
    expect(countSentences('One. Two! Three?')).toBe(3)
    expect(countSentences('Just one')).toBe(1)
  })

  it('ignores code fences and hidden tags', () => {
    expect(countSentences('One. ```a. b. c.``` Two.')).toBe(2)
    expect(countSentences('One. <!--MCQ a. b.--> Two.')).toBe(2)
  })

  it('does not count decimals as sentence ends in a way that inflates a close', () => {
    // "5,000 metres per second" style prose must not be shredded into a false
    // LENGTH_EXCEEDED.
    expect(countSentences('The speed is 5.5 metres per second and it stays there.')).toBeLessThanOrEqual(2)
  })
})
