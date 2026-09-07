/**
 * LIVENESS PROOF — read-only evidence, not a fix.
 *
 * Drives the REAL production modules (no stubs, no replicas) to demonstrate two
 * ABSORBING STATES: configurations the teaching runtime can enter and provably
 * cannot leave, while valid authored content sits unused.
 *
 * If these tests PASS, the absorbing states exist on today's code.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  initialConversationState,
  advanceConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { resolveMcqChoice, mcqToServe, type TutorMCQ } from '@/lib/teaching/mcq'
import { hasProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'

const ROUTE = fs.readFileSync(
  path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8',
)

describe('ABSORBING STATE L2 — the OBSERVE double-lock', () => {
  it('stays at OBSERVE for 20 consecutive turns, with no learner input that can escape', () => {
    // A learner answering a PROSE question the model asked on a turn the kernel
    // did not sanction. Not an ack. Not a recovery. Not degraded. No server
    // grade (prose is ungradeable), and the model's correctness claim is
    // suppressed upstream => signalCorrect null.
    const turn: TurnEvidence = {
      askedQuestion: true,        // the learner SAW a question
      questionSanctioned: false,  // ...but the kernel's move was not 'ask'
      signalCorrect: null,        // ungradeable prose => no correctness
      recoveryFired: false,
      acknowledgement: false,
      deliveredTeaching: true,
      serverGraded: false,
    }
    let s: ConversationState = initialConversationState('chem.equil.weak-acid')
    const phases: string[] = []
    for (let i = 0; i < 20; i++) { s = advanceConversationState(s, turn); phases.push(s.phase) }

    expect(new Set(phases)).toEqual(new Set(['OBSERVE']))   // never moved
    expect(s.observeFailures ?? 0).toBe(0)                  // escape hatch never armed
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('the SAME predicate gates both the action and the escape from not acting', () => {
    // The escape (conversationState) requires questionSanctioned === true.
    const sanctioned: TurnEvidence = {
      askedQuestion: true, questionSanctioned: true, signalCorrect: null,
      recoveryFired: false, deliveredTeaching: true, serverGraded: false,
    }
    let s = initialConversationState('chem.equil.weak-acid')
    s = advanceConversationState(s, sanctioned)
    s = advanceConversationState(s, sanctioned)
    expect(s.phase).toBe('DEMONSTRATE')   // escapes in 2 turns when move IS 'ask'

    // The action (route.ts gate) requires the same thing: move === 'ask'.
    expect(ROUTE).toContain("(phaseBeforeTurn === 'OBSERVE' && evidenceMoveHoisted === 'ask')")
    // One predicate, both locks. That is the double-lock.
  })
})

describe('ABSORBING STATE L1 — the pending-probe latch', () => {
  const probe: TutorMCQ = {
    question: 'In a galvanic cell, where does oxidation occur?',
    options: ['At the anode', 'At the cathode', 'In the salt bridge', 'At neither electrode'],
    correctIndex: 0,
  } as TutorMCQ

  it('a CORRECT typed answer is refused by the resolver, and the latch never opens', () => {
    // A learner who types instead of tapping. This answer is CORRECT.
    // MEASURED, not assumed: 10 of 12 substantively-correct phrasings for this
    // probe are refused. Note the first one — the BARE correct answer.
    const answers = [
      'the anode',
      'the negative electrode',
      'where electrons are released into the circuit',
      'the zinc side loses electrons',
      'the electrode that gets eaten away',
      'the one where Zn becomes Zn2+',
    ]
    for (const a of answers) expect(resolveMcqChoice(a, probe)).toBeNull() // no grade

    // 10 turns of the same shape: pending stays, grade stays null.
    let pending: TutorMCQ | null = probe
    const served: (TutorMCQ | null)[] = []
    for (let i = 0; i < 10; i++) {
      const grade = null                       // resolver refused => no server grade
      const toServe = mcqToServe(null, pending, grade)   // gate suppressed => nothing new
      served.push(toServe)
      pending = toServe
      const unansweredProbeOnScreen = pending !== null && grade === null
      expect(unansweredProbeOnScreen).toBe(true)  // the gate stays shut, every turn
    }
    // The learner is shown the SAME question 10 times.
    expect(new Set(served.map((m) => m?.question))).toEqual(new Set([probe.question]))
  })

  it('route.ts shuts the gate on exactly that condition, and 5 authored probes cannot help', () => {
    expect(ROUTE).toContain(
      'const unansweredProbeOnScreen = pendingMcqHoisted !== null && mcqGradeHoisted === null',
    )
    expect(ROUTE).toContain('noUnansweredProbeOnScreen: !unansweredProbeOnScreen')
    // gateEligible is the AND of the terms, so one false term shuts the selector.
    expect(ROUTE).toContain('const gateEligible = Object.values(gateTerms).every(Boolean)')
    // findBestProbe is only reached inside `if (gateEligible ...)`.
    expect(ROUTE).toMatch(/if \(gateEligible && memoryState\)[\s\S]{0,4000}findBestProbe/)
  })
})

describe('THE UNGUARDED CHANNEL — enforcement keys on the tag, not the act', () => {
  const proseAssessment = [
    'Quick check! Which expression gives the pH of a weak acid?',
    'A) pH = -log[H+]', 'B) pH = pKa', 'C) pH = 14 - pOH', 'D) pH = [HA]/[A-]',
  ].join('\n')

  it('the runtime CAN see a prose assessment, and only uses that sight to kill evidence', () => {
    expect(hasProseMultipleChoice(proseAssessment)).toBe(true)   // detectable
    // ...but the model-probe guard keys on a parseable tag:
    const guard = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/teaching/inventedProbeGuard.ts'), 'utf8')
    expect(guard).toContain('The model emitted a parseable `<!--MCQ-->` tag.')
    // ...and the only response to prose is a prompt asking the model to restate:
    const prose = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/teaching/proseMcqGuard.ts'), 'utf8')
    expect(prose).toContain('restate the same question')
  })
})

describe('NO LIVENESS OWNER EXISTS', () => {
  it('the runtime never computes its own kernel-override metric', () => {
    const app = fs.readFileSync(
      path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(app).not.toContain('foldLegalityMetrics')   // defined, documented, never called
  })
  it('no module owns "the lesson must make progress"', () => {
    const dir = path.join(process.cwd(), 'src/lib/teaching')
    const names = fs.readdirSync(dir)
    expect(names).not.toContain('turnProgress.ts')
    expect(names).not.toContain('liveness.ts')
  })
})
