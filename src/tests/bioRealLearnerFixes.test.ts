/**
 * BIO-001..BIO-042 fix pass (2026-10-06). Every input below is quoted from
 * docs/qa/BIOLOGY_REAL_LEARNER_DEFECTS.md (biology real-learner run,
 * 2026-10-05).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { parseMcqTag } from '@/lib/teaching/mcq'
import { splitAnswerHeads, isVerdictHead, probeToMcq, enforceQuestionDeliveryContract } from '@/lib/teaching/gateAssessment'
import { toSecondPerson } from '@/lib/text/secondPerson'
import { normalizeMathDelimiters } from '@/lib/text/mathDelimiters'
import { conceptFallbackText } from '@/lib/teaching/conceptFallback'
import { stripMetaTalk, stripEmpathyOpener, usesAnalogy, analogyCapReached } from '@/lib/teaching/reuseCaps'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { deferCloseForRequest, ABSOLUTE_TURN_CEILING, CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'
import { initialConversationState } from '@/lib/teaching/conversationState'
import { flattenPipeTables } from '@/lib/text/plainNotation'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const FB = 'In this lesson on X we will look at y.'

describe('BIO-014 an escaped quote inside a card option', () => {
  it('is part of the option, not a cut with a stray backslash', () => {
    const { mcq } = parseMcqTag('Pick one.\n<!--MCQ q="Which describes a desperate energy state?" a="Secure energy state" b="Risk‑averse: prefers a predictable, lower‑variance food" c="Desperate energy state" d="Risk‑prone: prefers the higher‑variance \\"gamble\\"" correct="D"-->')
    expect(mcq?.options[3]).toBe('Risk‑prone: prefers the higher‑variance "gamble"')
    expect(mcq?.options.join(' ')).not.toMatch(/\\/)
  })
})

describe('BIO-007 "Wrong" / "Correct" cards', () => {
  it('a verdict word is never served alone as the answer head', () => {
    expect(isVerdictHead('Correct')).toBe(true)
    expect(isVerdictHead('Wrong')).toBe(true)
    expect(isVerdictHead('Not necessarily')).toBe(true)
    expect(isVerdictHead('Yes')).toBe(false)
    expect(splitAnswerHeads(['Wrong — biology also explains how living things work', 'Correct — it is mostly memorising names'])?.heads).toEqual(['No, that is wrong', 'Yes, that is correct'])
  })
  it('the card never shows a bare "Wrong" / "Correct"', () => {
    const m = probeToMcq({ stem: 'A student says biology is only memorising names. Is the student right?', choices: [
      { text: 'Wrong — biology explains how living things work, not only what they are called', isCorrect: true },
      { text: 'Correct — biology is mostly learning names', isCorrect: false },
    ] } as never)!
    expect(m.options.some((o) => /^(?:Wrong|Correct)$/.test(o))).toBe(false)
  })
})

describe('BIO-015 feedback in the second person', () => {
  it('the observed sentences', () => {
    expect(toSecondPerson("That's right. The learner correctly recognized that risk preference is not a fixed trait.")).toBe("That's right. You correctly recognized that risk preference is not a fixed trait.")
    expect(toSecondPerson('The student’s claim is inaccurate.')).toBe('Your claim is inaccurate.')
    expect(toSecondPerson('This helps the learner remember.')).toBe('This helps the learner remember.')
  })
  it('route: the final reply and the served assembled text both pass through it', () => {
    expect(ROUTE).toMatch(/cleanText = \(await import\('@\/lib\/text\/secondPerson'\)\)\.toSecondPerson\(cleanText\)/)
    expect(ROUTE).toMatch(/servedText = \(await import\('@\/lib\/text\/secondPerson'\)\)\.toSecondPerson\(servedText\)\n\s+return NextResponse\.json\(\{\n\s+success: true, text: servedText, provider,/)
  })
})

describe('BIO-039 money is not maths', () => {
  it('the observed reply keeps its dollar amounts', () => {
    const t = 'At a market price of $200 per cubic metre, the wetland saves 5 × 100 × 200 = **$100 000 per year**.'
    expect(normalizeMathDelimiters(t)).toBe(t)
  })
  it('real inline maths still converts', () => {
    expect(normalizeMathDelimiters('so $2x + 3 = 7$ and $v_0$')).toBe('so \\(2x + 3 = 7\\) and \\(v_0\\)')
  })
})

describe('BIO-010 a syllabus phrase is never the whole reply', () => {
  it('the observed goal string is framed as what the lesson covers', () => {
    expect(conceptFallbackText('Evidence for Evolution', 'Fossil record, comparative anatomy — homologous and analogous structures, embryology, biogeography and molecular evidence supporting common descent.'))
      .toBe('In this lesson on Evidence for Evolution we will look at fossil record, comparative anatomy — homologous and analogous structures, embryology, biogeography and molecular evidence supporting common descent.')
  })
  it('a description that is a sentence is unchanged', () => {
    expect(conceptFallbackText('Colloids', 'A colloid scatters light.')).toBe('A colloid scatters light.')
  })
})

describe('BIO-005 / BIO-011 / BIO-006 promises with nothing after them', () => {
  it('the observed lines are removed; a reply that is only a promise gets the concept fallback', () => {
    expect(enforceQuestionDeliveryContract('I hear you—it’s okay to feel stuck. Let’s make it easier with a quick choice.', FB)).toBe('I hear you—it’s okay to feel stuck.')
    expect(enforceQuestionDeliveryContract('I hear you’re ready to move forward. When you feel set, just let me know and I’ll present the next question for you.', FB)).toBe('I hear you’re ready to move forward.')
    expect(enforceQuestionDeliveryContract('Sure, let’s walk through the figure together, focusing on one part at a time.', FB)).toBe(FB)
  })
  it('ordinary teaching is untouched', () => {
    expect(enforceQuestionDeliveryContract('Let’s pick up where we left off. Cells divide.', FB)).toBe('Let’s pick up where we left off. Cells divide.')
  })
})

describe('BIO-001 the tutor does not explain its own process', () => {
  it('the observed sentences go; the teaching stays', () => {
    const r = stripMetaTalk('Because the system is set up to avoid repeating the same explanation, we need to give you a fresh, simpler way to look at the idea. Nitrogen moves from the air into soil bacteria, then into plants and animals.')
    expect(r.text).toBe('Nitrogen moves from the air into soil bacteria, then into plants and animals.')
    expect(stripMetaTalk('I understand you’re wondering why I haven’t given an example yet—because I wanted to first acknowledge how you’re feeling and make sure the basic idea is clear before adding more details. Non-coding RNA is RNA that is never made into protein, yet it still controls genes.').removed).toHaveLength(1)
  })
  it('route: stripped on model replies, before the empathy cap', () => {
    expect(ROUTE.indexOf('caps.stripMetaTalk(cleanText)')).toBeGreaterThan(0)
    expect(ROUTE.indexOf('caps.stripMetaTalk(cleanText)')).toBeLessThan(ROUTE.indexOf('caps.stripEmpathyOpener(cleanText'))
  })
})

describe('BIO-003 / BIO-004 empathy openers and analogy loops (CHEM-041/039 caps)', () => {
  it('the observed opener is dropped on "ok"; the analogy cap counts the observed metaphors', () => {
    expect(stripEmpathyOpener('I hear you’re feeling stuck, so let’s slow down and look at it again. Living things grow, reproduce and respond to their surroundings.', 'ok', []).stripped).toBe(true)
    expect(usesAnalogy('Think of a cell like a pizza kitchen.')).toBe(true)
    expect(analogyCapReached(['Imagine a library.', 'Think of it like a kitchen.'])).toBe(true)
  })
})

describe('BIO-022 pipe tables (CHEM-065 rewrite)', () => {
  it('a table becomes plain lines', () => {
    expect(flattenPipeTables('| Exercise | VO2 |\n|---|---|\n| Rest | 3.5 |')).toBe('Exercise · VO2\nRest · 3.5')
  })
})

describe('BIO-017 ecology lessons get their own figure, not the generic food chain', () => {
  // 2026-10-08: the seven bio.eco concepts below were served the same generic food-chain card by the 'bio.eco'
  // domain default (organism-environment, population-ecology, nutrient-cycling, biodiversity-conservation,
  // environmental-issues, community-ecology, global-change-biology); a concept-authored scene outranks it.
  for (const id of ['bio.eco.applied-ecology-ecosystem-services', 'bio.eco.biogeochemistry-advanced', 'bio.eco.landscape-conservation-ecology', 'bio.eco.microbial-ecology', 'bio.eco.population-growth-models-quantitative', 'bio.eco.predator-prey-dynamics',
    'bio.eco.organism-environment', 'bio.eco.population-ecology', 'bio.eco.nutrient-cycling', 'bio.eco.biodiversity-conservation', 'bio.eco.environmental-issues', 'bio.eco.community-ecology', 'bio.eco.global-change-biology']) {
    it(id, () => {
      expect(CONCEPT_SCENE_OVERRIDES).toContain(id)
      const spec = buildCanonicalScene(null, id)
      expect(validateSceneSpec(spec as never).valid).toBe(true)
      expect(JSON.stringify(spec)).not.toMatch(/herbivore|carnivore/i)
    })
  }
})

describe('BIO-002 the budget never closes a lesson on a help request', () => {
  const spent = { ...initialConversationState('bio.mol.noncoding-rna'), conceptId: 'bio.mol.noncoding-rna', turnsOnConcept: CONCEPT_TURN_BUDGET + 6, turnsTotalOnConcept: CONCEPT_TURN_BUDGET + 6 } as never
  it('defers on a request, not on "ok", and never past the ceiling', () => {
    expect(deferCloseForRequest(spent, true)).toBe(true)
    expect(deferCloseForRequest(spent, false)).toBe(false)
    const atCeiling = { ...(spent as object), turnsOnConcept: ABSOLUTE_TURN_CEILING, turnsTotalOnConcept: ABSOLUTE_TURN_CEILING } as never
    expect(deferCloseForRequest(atCeiling, true)).toBe(false)
  })
  it('route: the fold waits when deferred', () => {
    expect(ROUTE).toMatch(/if \(isConceptClosed\(stateForOutcome\) && !resolvedLessonCompleted && !closeDeferred\)/)
  })
})

describe('BIO-020 the stock figure line once per lesson', () => {
  it('route: a figure already shown this lesson is not announced again unless asked for', () => {
    expect(ROUTE).toMatch(/learnerRequestHoisted === 'diagram'\n\s+\|\| !snapshotRRMLog\.some\(/)
  })
})

describe('BIO-013 "what is this?" with a figure on screen', () => {
  it('route: is read as a question about the figure', () => {
    expect(ROUTE).toMatch(/what\\s\+\(\?:is\|'s\)\\s\+\(\?:this\|that\|it\)/)
  })
})
