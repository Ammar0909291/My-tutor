/**
 * V-AFFIRM — the tutor must not open by agreeing with a definition the
 * LEARNER proposed.
 *
 * Measured twice in production, on the first concept in physics:
 *
 *   learner "is a unit just the name of the thing youre counting"
 *   tutor   "Yes, exactly"
 *   learner "ok so if i count 5 apples the unit is apples right"
 *   tutor   "That is completely right—when you are counting fruit,
 *            'apples' is the unit"
 *
 * A prompt rule was shipped first and MEASURED INSUFFICIENT: it banned
 * "yes / exactly / spot on / that is right", and the model answered "That is
 * correct". Enumerating forbidden phrases teaches which phrases to avoid, not
 * which claims to refuse — so this lives on the output, where it is a total
 * function of the draft.
 */
import { describe, it, expect } from 'vitest'
import { vAffirm } from '@/lib/kernel/verifier/rules'
import type { VerifierContext } from '@/lib/kernel/verifier/types'

const ctx = (learnerText: string): VerifierContext => ({
  move: 'TEACH', budgets: { maxQuestions: 2, maxNewTerms: 3, maxParagraphs: 4 } as never,
  stageCeiling: 9, vocabularyBans: [], vocabularyUnlocked: true, formulaUnlocked: true,
  contentRegister: 'beginner', assessmentActive: false, lessonCompletionAuthorized: false,
  reactMandated: false, affectBand: 'calm', bannedConceptTerms: [], learnerText, legalTags: [],
})

describe('the exact production failures are rejected', () => {
  const CASES: Array<[string, string]> = [
    ['is a unit just the name of the thing youre counting', 'Yes, exactly—a unit gives a number meaning.'],
    ['ok so if i count 5 apples the unit is apples right', 'That is completely right—when you are counting fruit, "apples" is the unit.'],
    // The phrasing that defeated the prompt rule.
    ['is a unit just the name of the thing youre counting', 'That is correct—a unit tells us the specific name of the thing being counted.'],
  ]
  for (const [learner, draft] of CASES) {
    it(`rejects: ${draft.slice(0, 44)}…`, () => {
      const v = vAffirm(draft, ctx(learner))
      expect(v).not.toBeNull()
      expect(v!.code).toBe('V-AFFIRM')
      expect(v!.severity).toBe('REJECT')
    })
  }

  it('catches every bare-agreement opener, not a hand-picked few', () => {
    const learner = 'so it is just the name of the thing right?'
    for (const opener of [
      'Yes,', 'Yeah,', 'Yep,', 'Exactly!', 'Correct.', 'Right,', 'Absolutely.',
      'Precisely.', 'Indeed,', 'Spot on!', 'True,', "That's right,",
      'That is correct—', "You're right,", 'Of course,', 'Perfect!',
    ]) {
      expect(vAffirm(`${opener} a unit is that name.`, ctx(learner)), opener).not.toBeNull()
    }
  })
})

describe('it stays silent where agreeing is fine', () => {
  it('the learner ANSWERED a question — confirming is correct teaching', () => {
    // No proposal shape, so a correct answer may be affirmed normally. This is
    // the case that would make the rule intolerable if it fired.
    expect(vAffirm('Yes, exactly right — 10 metres.', ctx('10 metres'))).toBeNull()
    expect(vAffirm('Correct!', ctx('the metre'))).toBeNull()
  })

  it('an ordinary question is not a proposal', () => {
    expect(vAffirm('Yes, let me explain.', ctx('what is a unit?'))).toBeNull()
    expect(vAffirm('Yes. A unit is a chosen reference.', ctx('can you explain units?'))).toBeNull()
  })

  it('agreement later in the draft is not an opener', () => {
    // The failure is hearing "yes" FIRST. A draft that leads with the
    // correction and later says "yes, that part is right" is fine.
    const draft = 'Not quite. A unit is a chosen reference amount. Yes, the number alone is not enough — but the unit is not the object.'
    expect(vAffirm(draft, ctx('is a unit just the name of the thing?'))).toBeNull()
  })

  it('a proper correction passes', () => {
    const draft = 'Not quite — "apples" is the thing you are counting, not the unit. A unit is an agreed amount you compare against, like the metre.'
    expect(vAffirm(draft, ctx('so the unit is apples right?'))).toBeNull()
  })

  it('no learner text is a no-op', () => {
    expect(vAffirm('Yes, exactly.', ctx(''))).toBeNull()
  })
})

describe('it is deterministic and total', () => {
  it('same input, same answer', () => {
    const l = 'is force just a push right?'
    const d = 'Yes, exactly.'
    expect(vAffirm(d, ctx(l))).toEqual(vAffirm(d, ctx(l)))
  })
  it('does not throw on odd input', () => {
    for (const d of ['', '   ', '```yes```', '?', 'Yes'.repeat(200)]) {
      expect(() => vAffirm(d, ctx('is it just X right?'))).not.toThrow()
    }
  })
})
