/**
 * PHASE 0 — TURN DECISION PROVENANCE.
 *
 * The architecture audit found no artefact recording what a learner turn MEANS,
 * which is why 28 text writers can disagree with no way to see it. This is the
 * record. These tests pin the two properties that make it worth migrating on:
 *
 *   1. it reflects the CURRENT decisions, taken from where they are already made
 *   2. it changes nothing — no state, no text, no transition
 *
 * A field that was never decided must stay null. A guessed field would be worse
 * than a missing one here, because the entire point is to be trustworthy.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  detectDecisionDivergence, formatTurnDecisionLog,
  type TurnDecision, type TurnObservation,
} from '@/lib/teaching/turnDecision'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

const decided = (over: Partial<TurnDecision> = {}): TurnDecision => ({
  conceptId: 'phys.opt.lenses',
  teachingAct: 'teach',
  representation: null,
  probeId: null,
  figureId: null,
  lifecycle: 'CORE',
  granularity: 'COMPLETE',
  reason: 'registry:phys.opt.lenses',
  ...over,
})
const observed = (over: Partial<TurnObservation> = {}): TurnObservation => ({
  mcqAttached: false, figureAttached: false, figureConceptId: null,
  textAsksAQuestion: false, ...over,
})

describe('the record reflects the decision, and nothing more', () => {
  it('an undecided field stays null — never reconstructed', () => {
    const d = decided({ probeId: null, figureId: null, representation: null })
    expect(d.probeId).toBeNull()
    expect(d.figureId).toBeNull()
    expect(d.representation).toBeNull()
    // And a null decision with a clean turn produces no findings at all.
    expect(detectDecisionDivergence(d, observed())).toEqual([])
  })

  it('is exactly the eight audited fields — the cap is the point', () => {
    expect(Object.keys(decided()).sort()).toEqual([
      'conceptId', 'figureId', 'granularity', 'lifecycle',
      'probeId', 'reason', 'representation', 'teachingAct',
    ])
  })
})

describe('divergence is DETECTED, and only detected', () => {
  it('a held figure narrated as the current concept', () => {
    const v = detectDecisionDivergence(
      decided({ conceptId: 'phys.opt.lenses' }),
      observed({ figureAttached: true, figureConceptId: 'phys.em.electric-field' }),
    )
    expect(v.map((x) => x.code)).toEqual(['FIGURE_CONCEPT_MISMATCH'])
    expect(v[0].detail).toContain('phys.em.electric-field')
  })

  it('the same figure on the same concept is NOT a divergence', () => {
    expect(detectDecisionDivergence(
      decided({ conceptId: 'phys.opt.lenses' }),
      observed({ figureAttached: true, figureConceptId: 'phys.opt.lenses' }),
    )).toEqual([])
  })

  it('a selected probe that never shipped', () => {
    expect(detectDecisionDivergence(decided({ probeId: 'asset-1' }), observed())
      .map((x) => x.code)).toContain('PROBE_DECIDED_NOT_SHIPPED')
  })

  it('a gradeable question the gate never selected', () => {
    expect(detectDecisionDivergence(decided({ probeId: null }), observed({ mcqAttached: true }))
      .map((x) => x.code)).toContain('QUESTION_SHIPPED_WITHOUT_PROBE')
  })

  it('a question on a closing turn, by either channel', () => {
    expect(detectDecisionDivergence(decided({ lifecycle: 'CLOSING' }), observed({ textAsksAQuestion: true }))
      .map((x) => x.code)).toContain('QUESTION_ON_CLOSING_TURN')
    expect(detectDecisionDivergence(decided({ lifecycle: 'CLOSING', probeId: 'a' }), observed({ mcqAttached: true }))
      .map((x) => x.code)).toContain('QUESTION_ON_CLOSING_TURN')
  })

  it('detection is PURE — the inputs are not mutated', () => {
    const d = decided({ probeId: 'asset-1' })
    const o = observed({ figureAttached: true, figureConceptId: 'other' })
    const dBefore = JSON.stringify(d), oBefore = JSON.stringify(o)
    detectDecisionDivergence(d, o)
    expect(JSON.stringify(d)).toBe(dBefore)
    expect(JSON.stringify(o)).toBe(oBefore)
  })

  it('the log line is one parseable record on the existing console channel', () => {
    const line = formatTurnDecisionLog(decided(), observed(), [])
    expect(line.startsWith('[turn-decision] ')).toBe(true)
    const parsed = JSON.parse(line.slice('[turn-decision] '.length))
    expect(parsed.decision.conceptId).toBe('phys.opt.lenses')
    expect(parsed.divergences).toEqual([])
  })
})

describe('the route wiring is observation only', () => {
  it('records at the latest point — after the close replacement, before the response', () => {
    const record = ROUTE.indexOf('[turn-decision] provenance line skipped')
    const closeReplace = ROUTE.lastIndexOf('cleanText = buildLessonCloseText')
    const respond = ROUTE.indexOf('success: true, text: cleanText, provider,')
    expect(closeReplace).toBeGreaterThan(-1)
    expect(record).toBeGreaterThan(closeReplace)
    expect(record).toBeLessThan(respond)
  })

  it('the provenance block assigns nothing the turn reads', () => {
    const start = ROUTE.indexOf('// ── PHASE 0: TURN DECISION PROVENANCE')
    const end = ROUTE.indexOf('success: true, text: cleanText, provider,')
    const block = ROUTE.slice(start, end)
    // No writes to any hoisted turn variable, no persistence, no state update.
    expect(block).not.toMatch(/\bcleanText\s*=[^=]/)
    expect(block).not.toMatch(/\bmcqHoisted\s*=[^=]/)
    expect(block).not.toMatch(/conversationStateUpdate|prisma\.|await withRetry/)
    // It only READS and logs.
    expect(block).toContain('console.log(formatTurnDecisionLog(')
  })

  it('the three captures copy existing values and decide nothing', () => {
    // Each capture is a plain assignment from a value the turn already had.
    expect(ROUTE).toContain('decisionConceptIdHoisted = teachingTargetConceptId')
    expect(ROUTE).toContain('decisionProbeIdHoisted = probe?.assetId ?? null')
    // Granularity is captured in place so evaluation order is untouched: the
    // property still receives the same expression's value.
    expect(ROUTE).toContain('granularity: (decisionGranularityHoisted = decideTeachingGranularity({')
  })

  it('provenance failure cannot cost the learner the turn', () => {
    const start = ROUTE.indexOf('// ── PHASE 0: TURN DECISION PROVENANCE')
    const end = ROUTE.indexOf('success: true, text: cleanText, provider,')
    expect(ROUTE.slice(start, end)).toMatch(/catch \(err\)[\s\S]*console\.warn\('\[turn-decision\]/)
  })
})
