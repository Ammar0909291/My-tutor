/**
 * THE LEARNER'S QUESTION OUTRANKS THE LESSON PLAN.
 *
 * Every case here was measured in production (2026-08-11, 20 topics / 60
 * turns) before it was fixed. 33% of all turns steered the learner away from
 * what they had just asked:
 *
 *   "What is entropy?"            -> one sentence, then "now, back to Free
 *                                    Body Diagrams"
 *   "This makes no sense."        -> answered about a book on a table
 *   "I am lost" (hybridisation)   -> answered about ionic crystal structures
 *   ΔG = ΔH − TΔS stated correctly-> redirected three times, never advanced
 *
 * THREE authorities were steering back at once, and none of them could see the
 * excursion lifecycle that is supposed to own the decision:
 *   1. the base tutor prompt        (ai/client.ts)
 *   2. the CONCEPT ANCHOR block     (teaching/conceptAnchor.ts)
 *   3. the excursion directive      (teaching/excursion.ts) — the real owner
 *
 * And underneath all three, the resolver could not NAME the topic, so the
 * excursion never opened in the first place. These tests hold the resolver's
 * recall and the single-authority property together, because either one alone
 * leaves the learner unanswered.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { decideExcursion, NO_EXCURSION, isSatisfactionSignal, buildExcursionDirective, type ExcursionState } from '@/lib/teaching/excursion'
import { buildConceptAnchor, buildConceptAnchorBlock } from '@/lib/teaching/conceptAnchor'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

const PHYS_LESSON = 'phys.mech.free-body-diagram'
const CHEM_LESSON = 'chem.solid.ionic-solids'

const ask = (message: string, lesson: string, subject: string, state: ExcursionState = NO_EXCURSION, lastAsked = false) => {
  const requestedConceptId = resolveRequestedConceptId(message, lesson, subject)
  return {
    requestedConceptId,
    decision: decideExcursion({ state, message, lessonConceptId: lesson, requestedConceptId, lastAssistantAskedQuestion: lastAsked }),
  }
}

describe('the resolver can name what the learner asked about', () => {
  // The corpus-wide ambiguity guard dropped "entropy" because the word appears
  // in more than one title — so the more central an idea is, the less askable
  // it was.
  it('names entropy from the exact production message', () => {
    expect(resolveRequestedConceptId('What is entropy?', PHYS_LESSON, 'physics')).toBe('phys.therm.entropy')
  })

  it('answers entropy from the learner OWN subject', () => {
    expect(resolveRequestedConceptId('What is entropy?', CHEM_LESSON, 'chemistry')).toBe('chem.thermo.entropy')
  })

  it('does not pick the qualified concept over the plain one', () => {
    // "Statistical Definition of Entropy" is about entropy but is not what a
    // learner asking "what is entropy" means.
    expect(resolveRequestedConceptId('Explain entropy', PHYS_LESSON, 'physics')).not.toBe('phys.stat.entropy-statistical')
  })

  it('reads British spelling — the KG says Hybridization', () => {
    expect(resolveRequestedConceptId('What is hybridisation?', CHEM_LESSON, 'chemistry')).toBe('chem.bond.hybridization')
  })

  it('names Gibbs free energy', () => {
    expect(resolveRequestedConceptId('What is Gibbs free energy?', CHEM_LESSON, 'chemistry')).toBe('chem.thermo.gibbs')
  })

  it('still returns null for a topic the curriculum genuinely lacks', () => {
    // There is no Density concept in the physics KG. Null is the honest answer
    // and the off-curriculum path handles it — guessing would be worse.
    expect(resolveRequestedConceptId('What is density?', PHYS_LESSON, 'physics')).toBeNull()
  })

  it('does not turn incidental vocabulary into a request', () => {
    // The guard that made entropy unaskable also stops geometry excursions
    // from ordinary physics sentences. It must still do that.
    const got = resolveRequestedConceptId(
      'draw the free-body diagram of a block on a rough inclined plane', PHYS_LESSON, 'physics')
    expect(got).not.toBe('math.geom.plane')
  })
})

describe('the excursion lifecycle opens, holds and closes on the learner', () => {
  it('OFF-TOPIC QUESTION opens an excursion instead of a redirect', () => {
    const { decision } = ask('What is entropy?', PHYS_LESSON, 'physics')
    expect(decision.state.active).toBe(true)
    expect(decision.targetConceptId).toBe('phys.therm.entropy')
    expect(decision.returnToConceptId).toBe(PHYS_LESSON)
  })

  it('CURRENT-LESSON QUESTION does not open one', () => {
    const { decision } = ask('What is a free body diagram?', PHYS_LESSON, 'physics')
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(PHYS_LESSON)
  })

  it('OFF-TOPIC CONFUSION keeps teaching the thing they are confused about', () => {
    // The exact production failure: "This makes no sense" was answered about
    // the lesson. Confusion must never close a detour.
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision.state
    for (const msg of ['This makes no sense.', "I don't understand.", 'I am lost.', 'Why?']) {
      const { decision } = ask(msg, PHYS_LESSON, 'physics', open, true)
      expect(decision.state.active, msg).toBe(true)
      expect(decision.targetConceptId, msg).toBe('phys.therm.entropy')
    }
  })

  it('REPEATED FOLLOW-UP continues the detour', () => {
    let state = ask('What is entropy?', PHYS_LESSON, 'physics').decision.state
    for (const msg of ['So entropy is just messiness?', 'Explain it again', 'make it simpler']) {
      const d = ask(msg, PHYS_LESSON, 'physics', state, true).decision
      expect(d.targetConceptId, msg).toBe('phys.therm.entropy')
      state = d.state
    }
  })

  it('EXPLICIT VISUALIZATION REQUEST during a detour stays on the detour', () => {
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision.state
    for (const msg of ['Show me a diagram.', 'Draw it.', 'Can you visualize this?']) {
      const { decision } = ask(msg, PHYS_LESSON, 'physics', open, false)
      expect(decision.targetConceptId, msg).toBe('phys.therm.entropy')
    }
  })

  it('WRONG ANSWER during a detour stays on the detour', () => {
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision.state
    const { decision } = ask('So a tidy room has zero entropy.', PHYS_LESSON, 'physics', open, true)
    expect(decision.targetConceptId).toBe('phys.therm.entropy')
  })

  it('A STRONG STUDENT mid-detour is not evicted from it', () => {
    const open = ask('What is Gibbs free energy?', CHEM_LESSON, 'chemistry').decision.state
    const { decision } = ask(
      'I know that delta G equals delta H minus T delta S, and it is spontaneous when delta G is negative.',
      CHEM_LESSON, 'chemistry', open, true)
    expect(decision.state.active).toBe(true)
    expect(decision.targetConceptId).toBe('chem.thermo.gibbs')
  })

  it('SATISFACTION closes it and returns to the lesson', () => {
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision.state
    expect(isSatisfactionSignal('got it, thanks')).toBe(true)
    const { decision } = ask('got it, thanks', PHYS_LESSON, 'physics', open, false)
    expect(decision.state.active).toBe(false)
    expect(decision.justClosed).toBe(true)
    expect(decision.targetConceptId).toBe(PHYS_LESSON)
  })

  it('an EXPLICIT RETURN closes it', () => {
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision.state
    const { decision } = ask("let's get back to the lesson", PHYS_LESSON, 'physics', open, false)
    expect(decision.justClosed).toBe(true)
  })

  it('"got it, but why…" is a doubt wearing an acknowledgement', () => {
    expect(isSatisfactionSignal('got it, but why does temperature matter?')).toBe(false)
  })
})

describe('ONE authority: nothing outside excursion.ts orders a return', () => {
  // Three separate blocks used to carry a steer-back rule. The excursion
  // directive is the only one that knows whether a detour is open, so it is
  // the only one allowed to talk about returning.
  const STEER_BACK = /back to the anchored concept|1[–-]2 sentences\)? and return|answer briefly \(1[–-]2 sentences\)|now, back to/i

  it('the CONCEPT ANCHOR does not order a return', () => {
    const anchor = buildConceptAnchor('phys.mech.free-body-diagram', 'Free Body Diagrams', 'Represent forces as vectors', 'Mechanics')
    const block = buildConceptAnchorBlock(anchor!)
    expect(block).not.toMatch(STEER_BACK)
    // and it explicitly protects the learner's question instead
    expect(block).toMatch(/ANSWER THAT QUESTION/i)
  })

  it('the BASE TUTOR PROMPT does not order a 1–2 sentence brush-off', () => {
    const prompt = buildTutorSystemPrompt('Claude', 'en', null, null, null)
    expect(prompt).not.toMatch(STEER_BACK)
    expect(prompt).toMatch(/OUTRANKS THE LESSON PLAN/i)
  })

  it('the EXCURSION DIRECTIVE is the one that owns the return', () => {
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision
    const directive = buildExcursionDirective({ decision: open, targetTitle: 'Entropy and Disorder', lessonTitle: 'Free Body Diagrams' })
    expect(directive).toMatch(/CONCEPT EXCURSION/)
    expect(directive).toMatch(/CONFUSION DOES NOT END THIS/)
    expect(directive).toMatch(/OVERRIDES every instruction above it/)
  })
})

describe('a check must test understanding, not ask for a self-report', () => {
  const PASSIVE = /any doubts|still have a doubt|is that clear|does that make sense/i

  it('the excursion directive no longer prescribes "any doubts?"', () => {
    const open = ask('What is entropy?', PHYS_LESSON, 'physics').decision
    const directive = buildExcursionDirective({ decision: open, targetTitle: 'Entropy and Disorder', lessonTitle: 'Free Body Diagrams' })
    // It may NAME the phrase in order to ban it, but must not prescribe it.
    expect(directive).toMatch(/Never ask "any doubts\?"/i)
    expect(directive).toMatch(/predict an outcome|apply it to a new case|own words/i)
  })

  it('the base prompt bans the passive check and says what to do instead', () => {
    const prompt = buildTutorSystemPrompt('Claude', 'en', null, null, null)
    expect(prompt).toMatch(/A CHECK MUST TEST SOMETHING/)
    expect(prompt).toMatch(PASSIVE)          // present only inside the ban
    expect(prompt).toMatch(/never end a turn with/i)
  })
})
