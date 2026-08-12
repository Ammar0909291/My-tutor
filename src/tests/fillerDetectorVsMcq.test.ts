/**
 * A TURN CARRYING AN MCQ IS NOT CONTENT-FREE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit Topic 3, `phys.meas.errors`, real production, real learner
 * account. Twice, BYTE-IDENTICALLY, the learner saw:
 *
 *   "Let me ask you something concrete about Measurement Errors and
 *    Uncertainty: what's one thing you notice or find surprising about what we
 *    just covered?"
 *
 * while a tappable MCQ sat beside it asking something completely different and
 * concrete:
 *
 *   "You measure the length of a pencil with a ruler whose smallest division
 *    is one millimetre. Can you eliminate all error if you are extremely
 *    careful and steady?"
 *
 * Two questions in one turn, mismatched, and the one written in prose is the
 * vaguest thing a tutor can ask.
 *
 * ── TWO RULES THAT CONTRADICT EACH OTHER ────────────────────────────────────
 * `buildMcqInstruction` tells the model, in capitals:
 *
 *   "Write the question ONCE: put it in the tag, and do NOT also re-type the
 *    question and its options in your visible message — the app renders them
 *    as tappable buttons from the tag."
 *
 * A model that OBEYS puts the question in the tag and writes a short lead-in
 * around it. The tag is parsed and STRIPPED long before the filler detector
 * runs, so what the detector sees is short, question-free prose — and if that
 * prose happens to carry a softening phrase ("take your time", "whenever
 * you're ready"), it matches `FILLER_PHRASE_RE` and the whole turn is
 * overwritten.
 *
 * WHAT I ACTUALLY OBSERVED, stated precisely: the replacement text appeared,
 * twice, on turns that ALSO carried a well-formed MCQ. I did not capture the
 * raw pre-replacement prose, so the exact phrase that tripped the detector is
 * not known — and the first draft of this file guessed at it and was wrong,
 * which is why the fixture below uses a lead-in verified to trip it.
 *
 * The detector is not wrong about TEXT. It is wrong about SCOPE: the turn's
 * question lives in the `mcq` field the client renders as buttons, so the turn
 * was never content-free, and replacing it handed the learner two different
 * questions at once.
 */
import { describe, it, expect } from 'vitest'
import { detectFillerTurn } from '@/lib/teaching/conversationState'

/** The route's guard, mirrored exactly: `if (!assembled && !mcqHoisted)`. */
function wouldReplaceWithFiller(input: {
  assembled: boolean
  mcq: unknown | null
  cleanText: string
}): boolean {
  if (input.assembled || input.mcq) return false
  return detectFillerTurn(input.cleanText)
}

/**
 * A lead-in of the shape a compliant MCQ turn leaves behind once the tag is
 * stripped — VERIFIED to trip `detectFillerTurn`, so these tests exercise the
 * real path rather than a shape that was never detected in the first place.
 */
const COMPLIANT_LEAD_IN = 'Have a look at the options below and take your time.'
const MCQ = { question: 'Can you eliminate all error?', options: ['Yes', 'No'], correctIndex: 1 }

describe('the production failure', () => {
  it('a compliant MCQ turn is no longer overwritten', () => {
    expect(wouldReplaceWithFiller({ assembled: false, mcq: MCQ, cleanText: COMPLIANT_LEAD_IN })).toBe(false)
  })

  it('and the detector still reads that prose as filler on its own', () => {
    // The point is not that the detector is wrong about the TEXT — it is
    // right. The turn simply was not text-only. Pinned so the fix reads as a
    // scope correction rather than a weakening, and so the fixture is proven
    // to exercise the detecting path.
    expect(detectFillerTurn(COMPLIANT_LEAD_IN)).toBe(true)
  })
})

describe('the detector still protects turns that really are empty', () => {
  it('a filler turn with NO mcq is still replaced', () => {
    expect(wouldReplaceWithFiller({ assembled: false, mcq: null, cleanText: COMPLIANT_LEAD_IN })).toBe(true)
  })

  it('a real explanation is never filler, mcq or not', () => {
    const real =
      'An error is not a mistake you made. Every measuring tool has a smallest division, and a ' +
      'reading that falls between two marks cannot be pinned down exactly however careful you are.'
    expect(detectFillerTurn(real)).toBe(false)
    expect(wouldReplaceWithFiller({ assembled: false, mcq: null, cleanText: real })).toBe(false)
  })

  it('an assembled turn is still exempt, as before', () => {
    expect(wouldReplaceWithFiller({ assembled: true, mcq: null, cleanText: COMPLIANT_LEAD_IN })).toBe(false)
  })
})

describe('the learner never gets two different questions in one turn', () => {
  it('prose question + mcq is the shape that must not ship', () => {
    // The defect was not merely "filler" — it was a MISMATCH. The generic
    // question and the MCQ asked about different things, so whichever the
    // learner answered, the other was left dangling.
    const replaced = wouldReplaceWithFiller({ assembled: false, mcq: MCQ, cleanText: COMPLIANT_LEAD_IN })
    expect(replaced).toBe(false)
  })
})
