/**
 * Owner decisions of 2026-10-07 (answered in chat while closing the
 * real-learner defect logs): a check pass on replies with numbers, authored
 * cards only, 2-option cards practice-only where verified mastery stays
 * reachable, and stay-until-mastery. Strings are replies the real-learner
 * runs actually received.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { decideModelProbe, AUTHORED_CARDS_ONLY } from '@/lib/teaching/inventedProbeGuard'
import { stripProseMultipleChoice } from '@/lib/teaching/proseMcqGuard'
import { buildMcqInstruction } from '@/lib/teaching/mcq'
import { certifiesMastery, VERIFIED_CREDITS_NEEDED } from '@/lib/teaching/turnContract'
import { effectiveTurnBudget, legacyTurnBudget, ABSOLUTE_TURN_CEILING, CONCEPT_TURN_BUDGET, STAY_UNTIL_MASTERY } from '@/lib/teaching/conceptBudget'
import { initialConversationState } from '@/lib/teaching/conversationState'
import { needsFactCheck, readFactCheckAnswer, runFactCheckPass, WORKED_EXAMPLE_RULES } from '@/lib/teaching/factCheckPass'
import { preferTaughtProbes } from '@/lib/teaching/assets/teachingActionRepository'
import { ensureVisualAcknowledged } from '@/lib/teaching/visual/visualAcknowledgement'
import { makeVisualAsset } from '@/lib/teaching/visual/asset'
import type { VisualDecision } from '@/lib/teaching/visual/types'
import type { ServerGrade } from '@/lib/teaching/turnContract'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const INIT = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')

describe('authored cards only (CHEM-048 / PHYS-020 / MATH-002)', () => {
  it('a model-written card is never served, in any phase, with or without an authored alternative', () => {
    expect(AUTHORED_CARDS_ONLY).toBe(true)
    for (const probeWouldCountThisPhase of [true, false]) {
      for (const authoredProbesExist of [true, false, null]) {
        const d = decideModelProbe({
          authoredCardsOnly: AUTHORED_CARDS_ONLY,
          probeWouldCountThisPhase, gateServedAuthoredProbe: false, modelOfferedProbe: true,
          authoredProbesExist, authoredPoolExhausted: false, gateDeclinedByPolicy: false, modelProbeAlreadyAsked: false,
        } as never)
        expect(d.serve).toBe(false)
        expect(d.reason).toBe('authored-only-policy')
      }
    }
  })
  it('the route applies the policy to every model-offered card', () => {
    expect(ROUTE).toMatch(/decideModelProbe\(\{\s*authoredCardsOnly: AUTHORED_CARDS_ONLY,/)
  })
  it('the prompt tells the model not to write cards or lettered options', () => {
    const instr = buildMcqInstruction({} as never)
    expect(instr).toMatch(/do NOT write multiple-choice questions/)
  })
  it('a prose A) B) C) question is removed and the teaching around it stays', () => {
    const reply = 'Saponification is the base hydrolysis of an ester into soap and glycerol.\n\nWhich product forms the soap?\nA) Glycerol\nB) The carboxylate salt\nC) The alcohol'
    const out = stripProseMultipleChoice(reply)
    expect(out.stripped).toBe(true)
    expect(out.text).toContain('Saponification is the base hydrolysis')
    expect(out.text).not.toMatch(/Which product|A\)|B\)|C\)/)
  })
  it('a reply with no options is untouched', () => {
    const reply = 'A galvanised nail is coated in zinc, which corrodes first.'
    expect(stripProseMultipleChoice(reply)).toEqual({ text: reply, stripped: false })
  })
  it('the chat route strips prose multiple choice before delivery', () => {
    expect(ROUTE).toMatch(/stripProseMultipleChoice\(/)
  })
})

describe('2-option cards practice-only where reachable (CHEM-004 / BIO-019)', () => {
  const graded: ServerGrade = { kind: 'graded', correct: true, keyProvenance: 'authored' } as never
  it('a 2-option card banks no verified credit when 3+ option cards cover the bar', () => {
    expect(certifiesMastery(graded, 2, VERIFIED_CREDITS_NEEDED)).toBe(false)
    expect(certifiesMastery(graded, 2, 10)).toBe(false)
  })
  it('it still counts where the concept cannot reach the bar without it', () => {
    expect(certifiesMastery(graded, 2, 0)).toBe(true)
    expect(certifiesMastery(graded, 2, VERIFIED_CREDITS_NEEDED - 1)).toBe(true)
    expect(certifiesMastery(graded, 2, null)).toBe(true)
  })
  it('3+ option cards and unknown option counts keep the old rule', () => {
    expect(certifiesMastery(graded, 3, 10)).toBe(true)
    expect(certifiesMastery(graded, 4, 0)).toBe(true)
    expect(certifiesMastery(graded, null, 10)).toBe(true)
    expect(certifiesMastery(null, 4, 10)).toBe(false)
  })
  it('both mastery folds use the option-aware rule', () => {
    expect((ROUTE.match(/certifiesMastery\(resolvedGrade, pendingMcqHoisted\?\.options\?\.length \?\? null, threePlusOptionPoolHoisted\)/g) ?? []).length).toBe(1)
    expect((ROUTE.match(/serverGraded: certifiedForMastery,/g) ?? []).length).toBe(3)
  })
})

describe('stay until mastery (MATH-001: 387 of 908 lessons paused unmastered)', () => {
  const s = { ...initialConversationState('math.found.set'), conceptId: 'math.found.set' } as never
  it('the turn allowance is the absolute ceiling; the legacy 12-turn budget is kept for switch-off', () => {
    expect(STAY_UNTIL_MASTERY).toBe(true)
    expect(effectiveTurnBudget(s)).toBe(ABSOLUTE_TURN_CEILING)
    expect(legacyTurnBudget(s)).toBe(CONCEPT_TURN_BUDGET)
  })
})

describe('the check pass (MATH-007 / CHEM-053 / CHEM-059 / BIO-041)', () => {
  const wrong = 'Let\'s solve 4x − 7 = 9. Step 1: subtract 7 from both sides, so 4x = 2. Step 2: divide by 4, so x = 0.5. That is the answer.'
  const right = 'Let\'s solve 4x − 7 = 9. Step 1: add 7 to both sides, so 4x = 16. Step 2: divide by 4, so x = 4. That is the answer.'
  it('replies with numbers, equations or worked examples are checked; plain prose is not', () => {
    expect(needsFactCheck(wrong)).toBe(true)
    expect(needsFactCheck('Sodium has a first ionisation energy of about 496 kJ/mol, much lower than its second.')).toBe(true)
    expect(needsFactCheck('Good question — the idea is that particles keep moving even when the liquid looks still.')).toBe(false)
  })
  it('a corrected copy replaces the reply', async () => {
    const r = await runFactCheckPass({ text: wrong, conceptTitle: 'Linear equations', ask: async () => right })
    expect(r).toMatchObject({ text: right, corrected: true })
  })
  it('OK, meta answers, wildly different lengths, timeouts and errors keep the original', async () => {
    expect(readFactCheckAnswer(wrong, 'OK')).toBeNull()
    expect(readFactCheckAnswer(wrong, 'I corrected the original reply: x = 4.')).toBeNull()
    expect(readFactCheckAnswer(wrong, 'x = 4')).toBeNull()
    // A different reply of about the same length is not a corrected copy.
    expect(readFactCheckAnswer(wrong, "That's right. How did you arrive at that answer? Could you walk me through the steps you used to get there, one by one?")).toBeNull()
    const slow = await runFactCheckPass({ text: wrong, conceptTitle: null, ask: () => new Promise((r) => setTimeout(() => r(right), 50)), timeoutMs: 5 })
    expect(slow).toMatchObject({ text: wrong, corrected: false })
    const err = await runFactCheckPass({ text: wrong, conceptTitle: null, ask: async () => { throw new Error('429') } })
    expect(err).toMatchObject({ text: wrong, corrected: false })
  })
  it('chat and lesson-init both run it, and both carry the worked-example rules', () => {
    expect(ROUTE).toMatch(/runFactCheckPass\(/)
    expect(INIT).toMatch(/runFactCheckPass\(/)
    expect(ROUTE).toMatch(/WORKED_EXAMPLE_RULES/)
    expect(INIT).toMatch(/WORKED_EXAMPLE_RULES/)
    expect(WORKED_EXAMPLE_RULES).toMatch(/substitutes the answer back/)
  })
})

describe('CHEM-005 cards about taught content first', () => {
  const card = (stem: string, right: string) => ({ probeAsset: { stem, choices: [{ text: right, isCorrect: true }, { text: 'other', isCorrect: false }] } })
  const untaught = card('Roughly how many times stronger is chemisorption than physisorption?', 'About ten times')
  const taught = card('Which kind of adsorption forms chemical bonds with the surface?', 'Chemisorption')
  it('a card whose words were already taught is preferred', () => {
    const lesson = 'Adsorption comes in two kinds: physisorption, held by weak forces, and chemisorption, which forms chemical bonds with the surface.'
    expect(preferTaughtProbes([untaught, taught], lesson)).toEqual([taught])
  })
  it('with nothing taught yet, or no card qualifying, every card stays available', () => {
    expect(preferTaughtProbes([untaught, taught], '')).toHaveLength(2)
    expect(preferTaughtProbes([untaught], 'Unrelated opening about catalysts.')).toHaveLength(1)
  })
})

describe('the figure pointer names what is drawn (CHEM-063 / CHEM-034)', () => {
  function decision(scope: 'concept' | 'domain', title: string | null): VisualDecision {
    const asset = makeVisualAsset({
      assetId: 'a', conceptId: 'chem.elect.batteries', conceptTitle: 'Batteries and Fuel Cells',
      representation: 'process_flow',
      payload: (title
        ? { renderer: 'scene', sceneSpec: { id: 's', title, sceneType: 'process', steps: [] } }
        : { renderer: 'card', visualType: 'number_line' }) as never,
      provenance: scope === 'domain' ? 'domain-default' : 'curated',
    })
    return { purpose: 'explain', representation: asset.representation, payload: asset.payload, asset, graphical: true, source: 'registry',
      provenance: 'registry:x', conceptId: asset.conceptId, conceptTitle: asset.conceptTitle, excursion: false, allowed: null, session: null,
      continuityReason: 'new-figure' } as never
  }
  const reply = 'A lead–acid battery stores energy as lead sulfate forms on both plates during discharge.'
  it('a concept figure is introduced by its own title', () => {
    const out = ensureVisualAcknowledged(reply, decision('concept', 'Zinc–Carbon Dry Cell'), true)
    expect(out.text).toContain('it shows Zinc–Carbon Dry Cell')
    expect(out.text).not.toContain('it shows Batteries and Fuel Cells')
  })
  it('a domain figure says what it shows and that it is background', () => {
    const out = ensureVisualAcknowledged(reply, decision('domain', 'Periodic trends'), true)
    expect(out.text).toMatch(/it shows Periodic trends, background for this topic/)
  })
  it('without a figure title the concept title is the fallback', () => {
    const out = ensureVisualAcknowledged(reply, decision('concept', null), true)
    expect(out.text).toContain('it shows Batteries and Fuel Cells')
  })
})
