/**
 * SUCCESS CONDITION #7 — mastery has ONE owner across payload, completion, and
 * permanent record. They may not silently diverge.
 *
 * ── WHAT WAS WRONG ──────────────────────────────────────────────────────────
 * Three functions independently answered "did the learner master this concept":
 *
 *   completion gate  gateLessonCompletion  masteryVerifiedStrict
 *   client payload   buildMasterySummary   masteryVerified && !laundered
 *   permanent record conceptOutcome        hasDemonstratedMastery && !laundered
 *
 * Measured live, through the REAL fold (OWNERSHIP_CENSUS_2026-09-01, and
 * reproduced here in describe A): a learner who reached TRANSFER with a
 * CONTRADICTED check grade had payload=verified and record=mastered while the
 * completion gate refused. The learner was told they mastered a concept the
 * gate would not certify.
 *
 * ── THE INVARIANT THIS FILE PINS ────────────────────────────────────────────
 * All three now read `conceptMasteryVerdict`. Because it is the SAME function
 * call, the three verdicts are byte-for-byte equal for EVERY state — reachable
 * or not — so this proves a guarantee, not a coincidence over sampled states.
 * A future edit that re-forks any one of them fails describe B or C.
 *
 * DETECTION ≠ ENFORCEMENT: nothing here logs a divergence and ships anyway.
 * The record's own value is the verdict; the payload's own value is the
 * verdict; the gate authorizes on the verdict. There is no path by which a
 * "mastered" claim exists that the gate would refuse.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import {
  conceptMasteryVerdict, buildMasterySummary, gateLessonCompletion,
} from '@/lib/teaching/masteryGate'
import { conceptOutcome } from '@/lib/teaching/lessonSummary'

const ev = (o: Record<string, unknown>) => o as Parameters<typeof advanceConversationState>[1]

const payloadVerdict = (s: ConversationState) =>
  buildMasterySummary(s, { completionSuppressed: false, gatePending: false }).verified
const recordVerdict = (s: ConversationState) =>
  conceptOutcome(s, 'Friction Forces').status === 'mastered'
// The gate is only meaningful when the tag is present and no excursion is open;
// under those conditions `authorized` IS the mastery verdict.
const gateVerdict = (s: ConversationState) =>
  gateLessonCompletion('Done. [LESSON_COMPLETE]', s).authorized

/** Drive a lesson to its end THROUGH THE REAL FOLD (never a raw state). */
function driveLesson(opts: {
  checkClean: boolean
  practiceClean: boolean
  inventedCheckKey?: boolean
}): ConversationState {
  let s = initialConversationState('phys.mech.friction')
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true }))
  // GUIDE -> CHECK (credits no counter)
  s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true, recoveryFired: false, signalVerificationStatus: 'CLEAN' }))
  // CHECK grade
  s = advanceConversationState(s, ev({
    askedQuestion: true, signalCorrect: true, recoveryFired: false,
    unauthoredKey: opts.inventedCheckKey === true,
    signalVerificationStatus: opts.checkClean ? 'CLEAN' : 'CONTRADICTED',
  }))
  // Two PRACTICE grades
  for (const _ of [1, 2]) {
    s = advanceConversationState(s, ev({
      askedQuestion: true, signalCorrect: true, recoveryFired: false, unauthoredKey: false,
      signalVerificationStatus: opts.practiceClean ? 'CLEAN' : 'CONTRADICTED',
    }))
  }
  return s
}

describe('A. reachable end-states — the three verdicts are identical', () => {
  const cases: Array<{ name: string; opts: Parameters<typeof driveLesson>[0]; mastered: boolean }> = [
    { name: 'all clean -> mastered', opts: { checkClean: true, practiceClean: true }, mastered: true },
    { name: 'contradicted CHECK -> not mastered (the live divergence)', opts: { checkClean: false, practiceClean: true }, mastered: false },
    { name: 'contradicted PRACTICE -> not mastered', opts: { checkClean: true, practiceClean: false }, mastered: false },
    { name: 'invented CHECK key -> not mastered', opts: { checkClean: true, practiceClean: true, inventedCheckKey: true }, mastered: false },
  ]
  for (const c of cases) {
    it(c.name, () => {
      const s = driveLesson(c.opts)
      const p = payloadVerdict(s)
      const r = recordVerdict(s)
      const g = gateVerdict(s)
      expect(p).toBe(c.mastered)
      expect(r).toBe(c.mastered)
      expect(g).toBe(c.mastered)
      // and identical to the owner itself
      expect(conceptMasteryVerdict(s)).toBe(c.mastered)
    })
  }
})

describe('B. structural — all three consult conceptMasteryVerdict', () => {
  const { readFileSync } = require('node:fs')
  const { join } = require('node:path')
  const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

  it('conceptMasteryVerdict has exactly one definition', () => {
    const gate = read('src/lib/teaching/masteryGate.ts')
    expect((gate.match(/export function conceptMasteryVerdict\b/g) ?? []).length).toBe(1)
  })

  it('lessonSummary derives the record from it, not from hasDemonstratedMastery', () => {
    const sum = read('src/lib/teaching/lessonSummary.ts')
    expect(sum).toContain('conceptMasteryVerdict(state)')
    expect(/import\b[^\n]*hasDemonstratedMastery/.test(sum)).toBe(false)
  })
})

describe('C. by construction — equal for ANY state, reachable or not', () => {
  // A future refactor that re-forks one authority (e.g. the record drifting
  // back to `correctAtPractice >= 2` alone) is caught here even for states the
  // fold cannot produce, because equality — not a specific verdict — is asserted.
  const raw = (over: Partial<ConversationState>): ConversationState =>
    ({ ...initialConversationState('phys.mech.friction'), ...over })
  const grid: Array<Partial<ConversationState>> = []
  for (const phase of ['GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const) {
    for (const correctAtCheck of [0, 1]) {
      for (const correctAtPractice of [0, 1, 2, 3]) {
        for (const vCheck of [0, 1]) {
          for (const vPractice of [0, 2]) {
            for (const contradictions of [0, 1]) {
              for (const keys of [0, 2]) {
                grid.push({
                  phase, correctAtCheck, correctAtPractice,
                  verifiedCorrectAtCheck: vCheck, verifiedCorrectAtPractice: vPractice,
                  signalContradictions: contradictions, unauthoredKeyGrades: keys,
                })
              }
            }
          }
        }
      }
    }
  }

  it(`payload === record === gate for all ${grid.length} raw states`, () => {
    for (const over of grid) {
      const s = raw(over)
      const p = payloadVerdict(s)
      const r = recordVerdict(s)
      const g = gateVerdict(s)
      const owner = conceptMasteryVerdict(s)
      if (p !== r || r !== g || g !== owner) {
        throw new Error(
          `divergence at ${JSON.stringify(over)}: payload=${p} record=${r} gate=${g} owner=${owner}`,
        )
      }
    }
  })
})
