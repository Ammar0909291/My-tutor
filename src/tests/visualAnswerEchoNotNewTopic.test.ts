import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { resolveVisualTarget } from '@/lib/teaching/visual/resolveVisualTarget'
import { engagesPendingOptions } from '@/lib/teaching/mcq'

/**
 * ANSWER-ECHO WRONG VISUAL — root-cause finding 3 from the live
 * phys.qm.perturbation-theory professor-perspective audit (2026-09-19).
 *
 * `resolveVisualTarget`'s step 2 (a direct KG-title match found inside the
 * learner's raw message, `origin: 'learner-request'`) is guarded by
 * `requestTargetsSomethingElse` ONLY on the fallback path (step 3). Step 2
 * itself has no protection against the message being an ANSWER to a pending
 * probe rather than a genuine new topic request.
 *
 * Reproduced live: an MCQ option read "...because the electric field..."; the
 * learner's answer text echoed that phrase ("i think it's because the
 * electric field does work on it"); "the electric field" is an exact KG
 * concept title (`phys.em.electric-field`), so step 2 fired and introduced
 * that concept's figure mid-explanation of an unrelated dipole lesson.
 *
 * The fix reuses `engagesPendingOptions` (mcq.ts) — the same
 * discriminating-vocabulary detector the MCQ-answer disambiguation guard
 * already trusts — to discard a learner-request match when the message is
 * actually engaging the options just offered.
 */

const LESSON = 'phys.qm.perturbation-theory'

describe('an answer that echoes MCQ-option vocabulary does not introduce a new figure', () => {
  const OFFERED_OPTIONS = [
    'Because the electric field does work on the charge as it moves',
    'Because the magnetic field exerts a force perpendicular to velocity',
    'Because energy is never conserved in this system',
  ]
  const ANSWER = "i think it's because the electric field does work on it"

  it('sanity: the raw target resolver DOES match a real KG concept from the answer text alone', () => {
    // Establishes the defect actually exists before proving the fix — without
    // this, the guard below could be vacuously passing on the wrong premise.
    const target = resolveVisualTarget(ANSWER, LESSON, 'physics')
    expect(target?.origin).toBe('learner-request')
    expect(target?.conceptId).toBe('phys.em.electric-field')
  })

  it('sanity: engagesPendingOptions recognises this answer as engaging the offered options', () => {
    expect(
      engagesPendingOptions(ANSWER, { question: '', options: OFFERED_OPTIONS, correctIndex: 0 }),
    ).toBe(true)
  })

  it('resolveVisual does not switch to the echoed concept when offeredMcqOptions is present and engaged', () => {
    const decision = resolveVisual({
      message: ANSWER,
      lessonConceptId: LESSON,
      subject: 'physics',
      offeredMcqOptions: OFFERED_OPTIONS,
    })
    // Whatever the decision resolves to (hold / lesson concept / no figure),
    // it must never be the echoed, unrelated concept.
    expect(decision.conceptId).not.toBe('phys.em.electric-field')
  })

  it('without a pending MCQ, the same words are still free to name a real new topic (guard is narrow)', () => {
    const decision = resolveVisual({
      message: ANSWER,
      lessonConceptId: LESSON,
      subject: 'physics',
      offeredMcqOptions: null,
    })
    // No pending probe to be "answering" — the guard must not fire here, so
    // behaviour for a genuine unprompted mention is unchanged by this fix.
    expect(decision.conceptId).toBe('phys.em.electric-field')
  })

  it('a message that merely contains an option-shaped word but does not engage the options is unaffected', () => {
    // "field" alone, with no other discriminating overlap, must not trip the
    // guard into suppressing a genuinely different topic request.
    const target = resolveVisualTarget(
      'can you show me a diagram of a magnetic field instead',
      LESSON,
      'physics',
    )
    expect(target?.origin).toBe('learner-request')
  })
})
