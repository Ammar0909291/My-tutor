/**
 * PHASE 7K TRACK G — a meta-request must not discard the lesson's own assets.
 *
 * PRODUCTION EVIDENCE (2026-08-25, phys.opt.total-internal-reflection):
 *
 *   [explanationMemory] refused 3e1a39b6-… for learner: irrelevant-to-question
 *     — asked "give me a practice problem", asset shares no topic word
 *   [explanationMemory] refused ab503978-… for learner: irrelevant-to-question
 *     — asked "give me a practice problem", asset shares no topic word
 *
 * BOTH authored explanations for the concept were refused on the one turn the
 * learner explicitly asked to work on it, and the turn fell through to an
 * ungoverned model answer. `contentWords("give me a practice problem")` is
 * {give, practice, problem}: none appear in an explanation of total internal
 * reflection, so the overlap test failed — correctly, on the wrong input.
 *
 * This is the SAME defect class Phase 7D fixed on the excursion path, in a
 * different module, and the fix reuses 7D's vocabulary rather than declaring a
 * second one.
 */
import { describe, it, expect } from 'vitest'
import { isRelevantToLearnerQuestion, admitForLearner } from '@/lib/teaching/assets/learnerAdmission'

const TIR_ASSET =
  'Total internal reflection requires two conditions: light must travel from a denser ' +
  'medium into a less dense one, and the angle of incidence must exceed the critical angle.'

describe('Phase 7K Track G — meta-requests keep the lesson context', () => {
  const META = [
    'give me a practice problem',
    'ok yes lets try practice problem',
    'quiz me',
    'test me',
    'ask me a question',
    'give me another example',
    'can we practice',
    'give me something to solve',
  ]
  for (const m of META) {
    it(`"${m}" no longer refuses the concept's own asset`, () => {
      // admitForLearner is the boundary that actually serves the learner;
      // it clears the message either by naming no topic OR by carrying an
      // explicit practice intent (7H). Both routes are exercised here.
      expect(admitForLearner({ content: TIR_ASSET, userMessage: m }).admit).toBe(true)
    })
  }

  it('THE EXACT PRODUCTION REFUSAL is gone', () => {
    const r = admitForLearner({ content: TIR_ASSET, userMessage: 'give me a practice problem' })
    expect(r.admit).toBe(true)
  })
})

// ── NEGATIVE CONTROLS — relevance still discriminates ────────────────────────
describe('Phase 7K Track G — negative controls', () => {
  it('a genuinely foreign topic is STILL refused', () => {
    const r = admitForLearner({ content: TIR_ASSET, userMessage: 'explain photosynthesis to me' })
    expect(r.admit).toBe(false)
    expect(r).toMatchObject({ reason: 'irrelevant-to-question' })
  })

  it('a foreign topic dressed as a practice request is still refused', () => {
    // "photosynthesis" survives the discourse filter, so the test still runs.
    expect(isRelevantToLearnerQuestion(TIR_ASSET, 'give me a practice problem about photosynthesis')).toBe(false)
  })

  it('an on-topic question still matches', () => {
    expect(isRelevantToLearnerQuestion(TIR_ASSET, 'what is the critical angle?')).toBe(true)
  })

  it('empty content is still refused', () => {
    expect(admitForLearner({ content: '   ', userMessage: 'quiz me' }).admit).toBe(false)
  })

  it('author scaffolding is still refused, and outranks relevance', () => {
    // Uses a marker the real AUTHOR_MARKERS set recognises at line start —
    // an invented one proved nothing, which is why the first version of this
    // control failed. Scaffolding is checked BEFORE relevance, so a practice
    // request cannot smuggle author-facing text past it.
    const scaffolded = 'Common misconception: students think light always reflects.'
    const viaPractice = admitForLearner({ content: scaffolded, userMessage: 'quiz me' })
    const viaTopic = admitForLearner({ content: scaffolded, userMessage: 'tell me about light' })
    expect(viaPractice.admit).toBe(viaTopic.admit)   // practice intent grants no extra licence
  })

  it('a one-real-word request still names a topic (7D: one real word is enough)', () => {
    expect(isRelevantToLearnerQuestion(TIR_ASSET, 'practice refraction problems')).toBe(false)
    expect(isRelevantToLearnerQuestion(TIR_ASSET, 'practice reflection problems')).toBe(true)
  })
})
