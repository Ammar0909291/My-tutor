/**
 * TWO ASSESSMENT CHANGES, OWNER-APPROVED (G2, 2026-09-24), from a real-account
 * session on chem.found.stoichiometry (driven turn by turn as a student).
 *
 *  A. ONE WRONG ANSWER MUST NOT MAKE MASTERY UNREACHABLE. After one miss at
 *     PRACTICE the learner dropped to CHECK, spent the rest of the pool there,
 *     and at PRACTICE 2/0 no gradeable question existed. Now, once every unasked
 *     authored question is spent, a question the learner got WRONG is asked one
 *     more time (options rotated). Each authored question still yields at most
 *     one correct answer — the reason re-asking was rejected before.
 *
 *  B. THE REPLY MUST NOT ANSWER THE GRADED QUESTION IT IS ABOUT TO ASK. The
 *     model was shown the question and worked it first ("… you can produce
 *     **3.0 mol of water**", then "how many moles of water form from 3.0 mol of
 *     hydrogen?"), and defined "limiting reactant" right above a blank asking
 *     for "limiting". The model no longer sees the question, and sentences that
 *     state the correct option are removed. Texts below are the production text.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GradeBand } from '@prisma/client'

const findMany = vi.fn()
vi.mock('@/lib/db/prisma', () => ({ prisma: { assetIdentity: { findMany: (...a: unknown[]) => findMany(...a) } } }))

import { findBestProbe } from '@/lib/teaching/assets/teachingActionRepository'
import {
  initialTeachingHistory, recordMcqAsked, recordMcqOutcome, isMissedAndReaskable, hasAskedMcq,
} from '@/lib/teaching/teachingHistory'
import { dropAnswerLeaks, buildGateAssessmentBlock, probeToMcq } from '@/lib/teaching/gateAssessment'

const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('A — the missed-question ledger', () => {
  const Q = 'The reactant that runs out first is called the ______ reactant.'
  it('a wrong answer makes the question re-askable; a right one does not', () => {
    let h = recordMcqOutcome(recordMcqAsked(initialTeachingHistory('c'), Q), Q, false)
    expect(isMissedAndReaskable(h, Q)).toBe(true)
    h = recordMcqOutcome(recordMcqAsked(initialTeachingHistory('c'), Q), Q, true)
    expect(isMissedAndReaskable(h, Q)).toBe(false)
  })
  it('an unanswered release changes nothing', () => {
    const h = recordMcqOutcome(initialTeachingHistory('c'), Q, null)
    expect(h.mcqMissed).toEqual([])
  })
  it('the re-ask is the last chance, right or wrong', () => {
    const missed = recordMcqOutcome(initialTeachingHistory('c'), Q, false)
    for (const outcome of [true, false, null]) {
      const after = recordMcqOutcome(missed, Q, outcome)
      expect(isMissedAndReaskable(after, Q)).toBe(false)
      expect(recordMcqOutcome(after, Q, false)).toBe(after) // never re-enters
    }
  })
  it('a question never answered wrong stays untouched by any later outcome', () => {
    const h = recordMcqOutcome(initialTeachingHistory('c'), Q, true)
    expect(h.mcqMissed).toEqual([])
    expect(h.mcqReasked).toEqual([])
  })
  it('INVARIANT: every sequence of grades gives one question at most ONE correct answer', () => {
    for (let mask = 0; mask < 16; mask++) {
      let h = initialTeachingHistory('c')
      let correct = 0
      for (let turn = 0; turn < 4; turn++) {
        const askable = !hasAskedMcq(h, Q) || isMissedAndReaskable(h, Q)
        if (!askable) break
        const right = ((mask >> turn) & 1) === 1
        if (right) correct++
        h = recordMcqOutcome(recordMcqAsked(h, Q), Q, right)
      }
      expect(correct, `mask ${mask}`).toBeLessThanOrEqual(1)
    }
  })
})

describe('A — findBestProbe offers a missed question only when nothing unasked is left', () => {
  const CONCEPT = 'chem.found.stoichiometry'
  const stems = ['Q one?', 'Q two?', 'Q three?']
  const rows = stems.map((stem, i) => ({
    assetId: `a${i}`, conceptId: CONCEPT, language: 'en', gradeBand: GradeBand.HIGH,
    status: 'ACTIVE', qualityScore: null, qualityConfidence: null, tags: [], incompatibilities: [],
    probeAsset: { stem, choices: [{ text: 'right', isCorrect: true }, { text: 'wrong', isCorrect: false }], correctValue: null, difficulty: 'CORE' },
  }))
  const STATE = { conceptId: CONCEPT, subjectSlug: 'chemistry', language: 'en', gradeBand: GradeBand.HIGH, userMessage: 'next' }
  beforeEach(() => { findMany.mockReset(); findMany.mockResolvedValue(rows) })

  it('an unasked question wins over a missed one', async () => {
    const got = await findBestProbe(STATE as never, { requireMcq: true, excludeProbeStem: (s) => s !== 'Q three?', allowMissedStem: (s) => s === 'Q one?' })
    expect(got?.stem).toBe('Q three?')
    expect(got?.reask).toBeUndefined()
  })
  it('pool spent -> the missed question is offered as a re-ask, and the pool is not reported exhausted', async () => {
    const spent = vi.fn()
    const got = await findBestProbe(STATE as never, { requireMcq: true, excludeProbeStem: () => true, allowMissedStem: (s) => s === 'Q two?', onAllCandidatesSpent: spent })
    expect(got?.stem).toBe('Q two?')
    expect(got?.reask).toBe(true)
    expect(spent).not.toHaveBeenCalled()
  })
  it('a re-ask comes with its options rotated: the right answer moves, the key moves with it', async () => {
    const got = await findBestProbe(STATE as never, { requireMcq: true, excludeProbeStem: () => true, allowMissedStem: (s) => s === 'Q two?' })
    const mcq = probeToMcq({ stem: got!.stem, choices: got!.choices as never, assetId: got!.assetId })
    expect(mcq?.options).toEqual(['wrong', 'right'])
    expect(mcq?.options[mcq!.correctIndex]).toBe('right')
  })
  it('a first ask keeps the authored order', async () => {
    const got = await findBestProbe(STATE as never, { requireMcq: true, excludeProbeStem: (s) => s !== 'Q one?' })
    expect((got!.choices as Array<{ text: string }>).map((c) => c.text)).toEqual(['right', 'wrong'])
  })
  it('pool spent and nothing missed -> null and exhausted, exactly as before', async () => {
    const spent = vi.fn()
    expect(await findBestProbe(STATE as never, { requireMcq: true, excludeProbeStem: () => true, allowMissedStem: () => false, onAllCandidatesSpent: spent })).toBeNull()
    expect(spent).toHaveBeenCalledTimes(1)
  })
})

describe('A — route wiring', () => {
  it('the gate passes the missed-question predicate, never below GUIDE, never the question graded this turn', () => {
    expect(route).toMatch(/allowMissedStem: history && phaseBeforeTurn !== 'OBSERVE' && phaseBeforeTurn !== 'DEMONSTRATE'/)
    expect(route).toMatch(/return !gradedNow && isMissedAndReaskable\(history, q\)/)
  })
  it('the gate logs each re-ask', () => {
    expect(route).toContain("event: 'missed-probe-reasked'")
  })
  it('the outcome is recorded where the question is spent, and in the rederiver', () => {
    expect(route).toMatch(/memoryHistory = recordMcqOutcome\(memoryHistory, questionToSpend, spentQuestionGrade\)/)
    expect(route).toMatch(/if \(questionToSpend\) rederived = recordMcqOutcome\(rederived, questionToSpend, spentQuestionGrade\)/)
  })
})

describe('B — the model is not shown the graded question', () => {
  it('the gate block no longer quotes the question', () => {
    const q = 'For 2H₂ + O₂ → 2H₂O, how many moles of water form from 3.0 mol of hydrogen with oxygen in excess?'
    const block = buildGateAssessmentBlock({ question: q, options: ['3.0 mol', '1.5 mol'], correctIndex: 0 })
    expect(block).not.toContain(q)
    expect(block).not.toContain('3.0 mol')
    expect(block).toMatch(/Do NOT work a new example or give a new definition/)
  })
})

describe('B — sentences that state the answer are removed (production text)', () => {
  const MOLES = {
    question: 'For 2H₂ + O₂ → 2H₂O, how many moles of water form from 3.0 mol of hydrogen with oxygen in excess?',
    options: ['3.0 mol', '1.5 mol — dividing by the coefficient of 2', '6.0 mol — multiplying by the coefficient of 2', '2.0 mol — the coefficient itself'],
    correctIndex: 0,
  }
  const MOLES_TEXT = 'Let’s see the idea in action with the reaction you’ll be asked about next:\n\n1. **Start with what you have:** 3.0 mol H₂ (oxygen is in excess, so it won’t limit the reaction).\n2. **Apply the mole ratio from the balanced equation** 2 H₂ + O₂ → 2 H₂O.\n3. **Convert using the ratio:** 3.0 mol H₂ × (2 mol H₂O / 2 mol H₂) = 3.0 mol H₂O.\n\nSo, from 3.0 mol of hydrogen you can produce **3.0 mol of water** when oxygen is plentiful. This step corresponds to the “Apply molar mole ratios” box.'

  it('the worked answer goes; the setup that only repeats the question stays', () => {
    const r = dropAnswerLeaks(MOLES_TEXT, MOLES)
    expect(r.dropped).toHaveLength(2)
    expect(r.text).toContain('Start with what you have')
    expect(r.text).not.toMatch(/=\s*3\.0|3\.0\s*mol of water/)
    expect(r.text).not.toMatch(/^3\.$/m) // no orphan list marker
    expect(r.text).toContain('This step corresponds to')
  })

  it('the definition right above the blank goes; the grade feedback stays', () => {
    const t = 'Not quite — the answer is: H₂ — you need 3 mol H₂ per mol N₂ but only have 2, so hydrogen runs out first\n\nHowever, the reactant that determines the maximum amount of product is called the **limiting reactant** – it’s the one that would be completely consumed first.\n\nNow try naming the term that fits the blank in the statement.'
    const r = dropAnswerLeaks(t, { question: 'The reactant that runs out first, and therefore fixes the maximum possible yield, is called the ______ reactant.', options: ['limiting', 'excess', 'catalytic', 'standard'], correctIndex: 0 })
    expect(r.text).toBe('Not quite — the answer is: H₂ — you need 3 mol H₂ per mol N₂ but only have 2, so hydrogen runs out first\n\nNow try naming the term that fits the blank in the statement.')
  })

  it('controls: nothing changes when the answer is not stated', () => {
    const t = 'Coefficients count moles, not grams.\n\nLet’s put that to work.'
    expect(dropAnswerLeaks(t, MOLES)).toEqual({ text: t, dropped: [] })
  })
  it('controls: an answer too short to be distinctive, or also inside a distractor, is never used', () => {
    const t = 'H₂ runs out first here.'
    expect(dropAnswerLeaks(t, { question: 'Which runs out?', options: ['H₂', 'N₂'], correctIndex: 0 }).dropped).toEqual([])
    const u = 'Energy is conserved.'
    expect(dropAnswerLeaks(u, { question: 'What is conserved?', options: ['energy', 'kinetic energy'], correctIndex: 0 }).dropped).toEqual([])
  })

  it('an answer that is the lesson\'s own concept name never strips teaching (after-run 2)', () => {
    const mcq = { question: 'Δx = −8 m. What type of quantity is this?', options: ['Displacement — a vector', 'Distance — a scalar'], correctIndex: 0 }
    const t = 'Where you end up compared with your start is the displacement. Displacement also needs a direction.'
    expect(dropAnswerLeaks(t, mcq, 'Displacement and Distance')).toEqual({ text: t, dropped: [] })
    expect(dropAnswerLeaks(t, mcq, 'Stoichiometry').dropped.length).toBeGreaterThan(0)
  })
  it('route: applied only to the server question attached this turn, logged as [answer-leak]', () => {
    expect(route).toMatch(/if \(mcqHoisted && mcqHoisted === gateMcqHoisted\) \{\s*const \{ dropAnswerLeaks \}/)
    expect(route).toMatch(/dropAnswerLeaks\(text, mcqHoisted, resolvedConceptId \? \(kgNodeForLeak\(resolvedConceptId\)\?\.title \?\? null\) : null\)/)
    expect(route).toContain("console.warn('[answer-leak] '")
  })
})
