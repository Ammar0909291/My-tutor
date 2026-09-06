import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { decideExcursion, type ExcursionState } from '@/lib/teaching/excursion'
import { classifyKnowledgeGap } from '@/lib/teaching/knowledgeGap'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { MAX_EXCURSION_TURNS } from '@/lib/teaching/visual/session'

/**
 * E2 — asking about a term the CURRENT lesson's own definition already uses is
 * not a trip away from the lesson.
 *
 * This closes the P1 that `topicResolutionP0P1.test.ts`'s F4 block
 * CHARACTERIZED as surviving. That block is updated there, not here; this file
 * owns the positive behaviour.
 *
 * The rule is three conditions (see `lessonOwnsTheTerm`): the phrase is a
 * NON-HEAD component of the candidate's title, NO concept anywhere is
 * head-named by the phrase, and the lesson's own KG description uses it.
 * Condition 2 is what preserves every legitimate request — including every
 * cross-subject one — so it gets the most coverage below.
 */

const ZEROTH = 'phys.therm.zeroth-law'
const NO_EXCURSION: ExcursionState = {
  active: false, targetConceptId: null, targetTopicTitle: null,
  returnToConceptId: null, turns: 0,
}

function gapFor(message: string, lesson: string) {
  return classifyKnowledgeGap({
    failureState: 'dont_know',
    resolvedConceptId: resolveRequestedConceptId(message, lesson, null),
    lessonConceptId: lesson,
    lessonPrerequisites: getKGNode(lesson)?.prerequisites ?? [],
  })
}

function excursionFor(message: string, lesson: string) {
  const requested = resolveRequestedConceptId(message, lesson, null)
  return decideExcursion({
    state: NO_EXCURSION,
    message,
    lessonConceptId: lesson,
    requestedConceptId: requested,
    knowledgeGapConceptId: gapFor(message, lesson)?.conceptId ?? null,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
describe('1. the exact P1 regression', () => {
  const ASK = 'sir i dont understand what is thermal equilibrium meaning. '
    + 'my english is weak please explain simple'

  it('the lesson defines the term the learner asked about', () => {
    // The evidence the resolver now reads, asserted so the fixture cannot
    // silently stop being the reason this test passes.
    const desc = getKGNode(ZEROTH)?.description ?? ''
    expect(desc.toLowerCase()).toContain('thermal equilibrium')
    expect(getKGNode(ZEROTH)?.title).not.toContain('Thermal Equilibrium')
  })

  it('names no other concept — the sibling no longer wins', () => {
    expect(resolveRequestedConceptId(ASK, ZEROTH, null)).toBeNull()
  })

  it('opens no knowledge gap', () => {
    expect(gapFor(ASK, ZEROTH)).toBeNull()
  })

  it('opens no excursion, and the teaching target stays on the lesson', () => {
    const decision = excursionFor(ASK, ZEROTH)
    expect(decision.transition).toBe('none')
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(ZEROTH)
  })

  it('10. VISUAL TARGET CONSISTENCY — nothing downstream can resurrect the sibling', () => {
    // The visual layer resolves its target from the SAME function (this
    // module's header states the one-authority invariant), so a null here is
    // a null there. Asserted as behaviour rather than trusted from the docs.
    const decision = excursionFor(ASK, ZEROTH)
    expect(decision.targetConceptId).not.toBe('phys.therm.temperature')
    expect(decision.state.targetConceptId).toBeNull()
    expect(decision.state.targetTopicTitle).toBeNull()
  })
})

describe('2. the same shape in other wordings and other subjects', () => {
  const CASES: ReadonlyArray<readonly [string, string]> = [
    ['what does thermal equilibrium mean sir', ZEROTH],
    ['explain thermal equilibrium please', ZEROTH],
    // A Python learner asking about "range" reached math.func.domain-range.
    ['what is range in python', 'cs.control.loops'],
    // A geometry learner asking about interior angles reached point-set topology.
    ['what is interior angle', 'math.geom.polygon-angle-sum'],
  ]
  for (const [message, lesson] of CASES) {
    it(`"${message}" stays on ${lesson}`, () => {
      expect(resolveRequestedConceptId(message, lesson, null)).toBeNull()
      expect(excursionFor(message, lesson).state.active).toBe(false)
    })
  }
})

describe('3. GENUINE SIBLING REQUEST — a different same-subject concept still resolves', () => {
  const CASES: ReadonlyArray<readonly [string, string, string]> = [
    ['explain eigenvalues', 'math.linalg.diagonalization', 'math.linalg.eigenvalues'],
    ['i dont know about eigenvalues', 'math.de.systems-matrix-method', 'math.linalg.eigenvalues'],
    ['explain benzene', 'chem.alc.phenols', 'chem.hyd.arenes'],
    ['i dont understand mitochondria', 'bio.div.endosymbiotic-theory', 'bio.cell.mitochondria-energy'],
    ['what is entropy', 'phys.mech.free-body-diagram', 'phys.therm.entropy'],
  ]
  for (const [message, lesson, expected] of CASES) {
    it(`"${message}" still reaches ${expected}`, () => {
      expect(resolveRequestedConceptId(message, lesson, null)).toBe(expected)
    })
  }
})

describe('4. GENUINE CROSS-SUBJECT REQUEST — the contract E2 must not break', () => {
  it('"teach me the mole concept" still reaches chemistry from physics', () => {
    expect(resolveRequestedConceptId('teach me the mole concept', 'phys.mech.friction', null))
      .toBe('chem.found.mole-concept')
  })

  it('"i dont know enough about the mole concept" still opens the excursion', () => {
    const decision = excursionFor('i dont know enough about the mole concept', 'phys.wave.beats')
    expect(decision.transition).toBe('started')
    expect(decision.targetConceptId).toBe('chem.found.mole-concept')
  })

  it('"explain photosynthesis" still reaches biology from physics', () => {
    expect(resolveRequestedConceptId('explain photosynthesis', 'phys.wave.beats', null))
      .toBe('bio.plant.photosynthesis')
  })

  it('"explain apoptosis" still reaches biology', () => {
    expect(resolveRequestedConceptId('explain apoptosis', 'bio.plant.photosynthesis', null))
      .toBe('bio.cell.apoptosis')
  })
})

describe('9. NEGATIVE CONTROL — incidental description vocabulary does not suppress a real request', () => {
  it('a plant-respiration lesson NAMES photosynthesis, and the request still travels', () => {
    // This is the case that killed the naive "phrase appears in the lesson
    // description" rule (397 corpus collisions). It survives here for one
    // reason: `bio.plant.photosynthesis` is HEAD-NAMED by the phrase, so
    // condition 2 refuses to fire. Asserted with the description checked, so
    // the test proves the discrimination rather than the absence of overlap.
    const desc = (getKGNode('bio.plant.plant-respiration')?.description ?? '').toLowerCase()
    expect(desc).toContain('photosynthesis')
    expect(
      resolveRequestedConceptId('i dont understand photosynthesis', 'bio.plant.plant-respiration', null),
    ).toBe('bio.plant.photosynthesis')
  })

  it('the head-named condition is what does it — a head phrase is never suppressed', () => {
    // "Mitochondria" heads "Mitochondria and Energy Organelles"; the
    // endosymbiotic-theory lesson describes mitochondria explicitly.
    const desc = (getKGNode('bio.div.endosymbiotic-theory')?.description ?? '').toLowerCase()
    expect(desc).toContain('mitochondria')
    expect(
      resolveRequestedConceptId('i dont understand mitochondria', 'bio.div.endosymbiotic-theory', null),
    ).toBe('bio.cell.mitochondria-energy')
  })
})

describe('5-8. the shipped contracts are unchanged', () => {
  it('5. R3 — restating the lesson concept keeps the lesson, opens nothing', () => {
    expect(resolveRequestedConceptId('explain beats and beat frequency', 'phys.wave.beats', null))
      .toBe('phys.wave.beats')
    const decision = excursionFor('explain beats and beat frequency', 'phys.wave.beats')
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe('phys.wave.beats')
  })

  it('5. R2 — MAX_EXCURSION_TURNS is still 6', () => {
    expect(MAX_EXCURSION_TURNS).toBe(6)
  })

  it('6. E1 — the discourse guard still holds', () => {
    expect(resolveRequestedConceptId('that is what i am asking you', 'phys.wave.beats', null))
      .toBeNull()
  })

  it('7. E3 — the governed-clause rule still holds', () => {
    const P0 = 'i dont know sir. that is what i am asking you. please dont ask me '
      + 'question, please teach me why loud and soft happens'
    expect(resolveRequestedConceptId(P0, 'phys.wave.beats', null)).toBeNull()
  })

  it('E3 stand-down still holds — a topic named before a deictic request survives', () => {
    expect(resolveRequestedConceptId('the mole concept, can you explain it', 'phys.wave.beats', null))
      .toBe('chem.found.mole-concept')
  })
})

describe('the head fallback cannot undo an E2 suppression', () => {
  it('resolveNamedTopicHead does not re-resolve the suppressed phrase', () => {
    // E2 only fires when NO concept is head-named by the phrase, and the head
    // fallback only resolves phrases that ARE a leading conjunct — so they
    // cannot both claim one phrase. Pinned because the fallback runs AFTER
    // the suppression and reads the raw message, not the matched text.
    expect(
      resolveRequestedConceptId('what is thermal equilibrium', ZEROTH, null),
    ).toBeNull()
  })
})
