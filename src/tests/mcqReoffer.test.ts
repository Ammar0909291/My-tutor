/**
 * A RE-OFFERED KEYED MCQ MUST NOT SILENTLY IGNORE AN UNGRADEABLE ANSWER ATTEMPT.
 *
 * I1, reproduced live on the real account 2026-09-02 (phys.particle.gauge-bosons
 * and phys.qm.angular-momentum-addition). With a keyed MCQ pending, a learner who
 * TYPES an answer instead of tapping — the move a weak-English learner actually
 * makes, and the chat box is left enabled beside the options — can produce text
 * that `resolveMcqChoice` cannot confidently map to an option. `gradeMcqAnswer`
 * then returns `correct: null` DELIBERATELY (a false grade writes permanent false
 * evidence — the Phase 7P class), so nothing is graded, the mastery gate does not
 * move, and the identical MCQ re-offers next turn with no sign the attempt was
 * seen. The learner reads it as being ignored and repeated at.
 *
 * Option A (route.ts, immediately before the empty-with-probe backstop): make the
 * re-offer NON-SILENT with one deterministic lead-in. It does NOT loosen grading —
 * the answer stays ungraded by design; it only tells the learner their typed
 * answer could not be matched and to tap a choice. It fires ONLY on a genuine,
 * un-mappable ANSWER ATTEMPT: a probe being re-offered (served, none freshly
 * attached this turn), and a message that is not a bare acknowledgement, not a
 * practice request, and not a question.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `mcqToServe`, the real `MCQ_REOFFER_DISAMBIGUATION`, the real
 * `gradeMcqAnswer`, the real `isBareAcknowledgement`, the real `readTurnIntent`,
 * and the real `detectLearnerQuestion` — the guard is mirrored so the same
 * predicates the route runs decide every case here. The route wiring itself is
 * pinned by source assertions at the bottom.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  mcqToServe,
  gradeMcqAnswer,
  MCQ_REOFFER_DISAMBIGUATION,
  type TutorMCQ,
} from '@/lib/teaching/mcq'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { detectLearnerQuestion } from '@/lib/teaching/conversationState'

type Grade = { chosenIndex: number | null; correct: boolean | null } | null

/** The exact guard, mirrored so the reproduction runs the REAL predicates. */
function reofferGuard(
  cleanText: string,
  mcqHoisted: TutorMCQ | null,
  pending: TutorMCQ | null,
  grade: Grade,
  message: string,
): string {
  const served = mcqToServe(mcqHoisted, pending, grade)
  const isReoffer = served !== null && mcqHoisted === null
  const genuineUnmappedAttempt =
    isReoffer
    && grade === null
    && message.trim() !== ''
    && !isBareAcknowledgement(message)
    && !readTurnIntent(message, null).wantsPractice
    && !detectLearnerQuestion(message)
  if (genuineUnmappedAttempt && !cleanText.includes(MCQ_REOFFER_DISAMBIGUATION)) {
    return cleanText.trim() ? `${MCQ_REOFFER_DISAMBIGUATION}\n\n${cleanText}` : MCQ_REOFFER_DISAMBIGUATION
  }
  return cleanText
}

const PENDING: TutorMCQ = {
  question: 'Which particle carries electromagnetism?',
  options: ['Photon', 'Gluon', 'W boson', 'Z boson'],
  correctIndex: 0,
}
/** A real answer attempt that resolveMcqChoice cannot map to an option. */
const UNMAPPED = 'i think it is the one that carries the electric force between charges'

describe('the ungradeable-answer-attempt fixtures are what the test claims', () => {
  it('the attempt genuinely does not grade against the pending probe', () => {
    // If this ever starts grading, the guard would not fire (a graded answer
    // consumes the probe) and the test below would be exercising nothing.
    expect(gradeMcqAnswer(UNMAPPED, PENDING).correct).toBeNull()
    expect(isBareAcknowledgement(UNMAPPED)).toBe(false)
    expect(readTurnIntent(UNMAPPED, null).wantsPractice).toBe(false)
    expect(detectLearnerQuestion(UNMAPPED)).toBe(false)
  })
})

describe('the disambiguation lead-in fires on a genuine un-mappable attempt', () => {
  it('prepends the lead-in and PRESERVES the model text (the measured case)', () => {
    const model = 'The photon is the messenger for electromagnetism.'
    const out = reofferGuard(model, null, PENDING, null, UNMAPPED)
    expect(out.startsWith(MCQ_REOFFER_DISAMBIGUATION)).toBe(true)
    expect(out).toContain(model) // teaching is never deleted
  })

  it('stands alone when the model text was stripped to empty', () => {
    expect(reofferGuard('', null, PENDING, null, UNMAPPED)).toBe(MCQ_REOFFER_DISAMBIGUATION)
    expect(reofferGuard('   \n ', null, PENDING, null, UNMAPPED)).toBe(MCQ_REOFFER_DISAMBIGUATION)
  })

  it('is idempotent — never stacks two copies of the lead-in', () => {
    const once = reofferGuard('', null, PENDING, null, UNMAPPED)
    expect(reofferGuard(once, null, PENDING, null, UNMAPPED)).toBe(once)
  })
})

describe('it does NOT fire when the learner was not answering', () => {
  const model = 'Let me say more about that.'

  it('a bare acknowledgement is left alone', () => {
    expect(reofferGuard(model, null, PENDING, null, 'got it')).toBe(model)
  })

  it('a practice request is left alone', () => {
    // A request for another question is not an answer to this one.
    expect(readTurnIntent('can I try another practice question', null).wantsPractice).toBe(true)
    expect(reofferGuard(model, null, PENDING, null, 'can I try another practice question')).toBe(model)
  })

  it('a question is left alone — the model answers it, no "tap a choice"', () => {
    const q = 'why is it the photon and not the gluon?'
    expect(detectLearnerQuestion(q)).toBe(true)
    expect(reofferGuard(model, null, PENDING, null, q)).toBe(model)
  })

  it('an empty learner message is left alone', () => {
    expect(reofferGuard(model, null, PENDING, null, '   ')).toBe(model)
  })
})

describe('it does NOT fire unless a pending probe is actually being re-offered', () => {
  const model = 'Some teaching.'

  it('a graded answer this turn consumes the probe — no re-offer, no lead-in', () => {
    // Correct tap and wrong tap both produce a grade; mcqToServe then returns
    // null, so there is nothing to re-offer and nothing to disambiguate.
    expect(reofferGuard(model, null, PENDING, { chosenIndex: 0, correct: true }, 'Photon')).toBe(model)
    expect(reofferGuard(model, null, PENDING, { chosenIndex: 1, correct: false }, 'Gluon')).toBe(model)
  })

  it('a freshly attached probe this turn is a NEW question, not a re-offer', () => {
    // mcqHoisted !== null means the engine attached a probe THIS turn; the
    // learner has not yet had a chance to answer it, so nothing was ignored.
    expect(reofferGuard(model, PENDING, null, null, UNMAPPED)).toBe(model)
  })

  it('no probe on screen at all — left alone', () => {
    expect(reofferGuard(model, null, null, null, UNMAPPED)).toBe(model)
  })
})

describe('the guard is wired at the response boundary and reuses the shared lead-in', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('imports the single shared lead-in constant from the mcq module', () => {
    expect(ROUTE).toMatch(/MCQ_REOFFER_DISAMBIGUATION\s*\}\s*=\s*await import\('@\/lib\/teaching\/mcq'\)/)
  })

  it('fires only on a re-offer AND a non-ack, non-practice, non-question attempt', () => {
    expect(ROUTE).toContain('const isReoffer = servedReoffer !== null && mcqHoisted === null')
    expect(ROUTE).toMatch(/mcqGradeHoisted === null/)
    expect(ROUTE).toMatch(/!isBareAckHoisted/)
    expect(ROUTE).toMatch(/!turnIntent\.wantsPractice/)
    expect(ROUTE).toMatch(/!detectLearnerQuestion\(message\)/)
  })

  it('prepends when there is model text, stands alone when there is not', () => {
    expect(ROUTE).toMatch(/cleanText\.trim\(\)\s*\n?\s*\?\s*`\$\{MCQ_REOFFER_DISAMBIGUATION\}\\n\\n\$\{cleanText\}`/)
  })
})
