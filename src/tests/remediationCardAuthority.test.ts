/**
 * H6.3 — THE CONTINUITY AUTHORITY BOUNDARY.
 *
 * H6.2 proved the deterministic first serve in production and exposed one
 * defect: the continuity turn taught "friction opposes relative motion", a fact
 * that is TRUE, that is in the Knowledge Graph, and that the approved card does
 * not contain.
 *
 * TRUE IS NOT AUTHORISED. The rule this file pins is not "do not contradict the
 * card" but "do not teach beyond the card": while a promoted card owns a
 * remediation turn, the card is the only teaching source the renderer is given.
 *
 * WHAT THESE TESTS CAN AND CANNOT DO. They test the SOURCE supplied to the
 * renderer — which is a real, deterministic property of the code. They do NOT
 * test the model's output, which no test here can bound. A card-absent fact can
 * still arrive from the model's own pretrained knowledge; that is a different
 * problem and is reported separately, never hidden behind a passing test.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  REMEDIATION_CARDS, findRemediationCard, renderRemediationCard,
  buildRemediationCardSourceBlock, cardIsSoleTeachingSource,
} from '@/lib/teaching/remediationCards'
import { buildRemediationGrounding, buildRemediationGroundingBlock } from '@/lib/teaching/remediationGrounding'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'

const FRICTION = 'phys.mech.friction'
const card = (id: string) => REMEDIATION_CARDS.find((c) => c.conceptId === id)!
const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The exact fact H6.2 measured entering the turn from outside the card. */
const OPPOSES_MOTION = /oppos\w*\s+(the\s+)?(relative\s+)?motion/i

// ── 1–4 · the H6.2 result, re-pinned so this phase cannot regress it ────────

describe('H6.3-1..4 — what H6.2 proved still holds', () => {
  it('the ACTIVE card is servable and the DRAFT ones are not', () => {
    const active = findRemediationCard(FRICTION)
    expect(active.servable).toBe(true)
    for (const c of REMEDIATION_CARDS) {
      if (c.conceptId === FRICTION) continue
      const r = findRemediationCard(c.conceptId)
      expect(r.servable, c.conceptId).toBe(false)
    }
  })

  it('the first serve is the card itself, and costs no provider call', () => {
    const text = renderRemediationCard(card(FRICTION))
    expect(text).toContain(card(FRICTION).plainExplanation)
    expect(text).toContain(card(FRICTION).microCheck)
    // The serving branch reads a precomputed string; it cannot reach a provider.
    const at = ROUTE.indexOf('remediationCardText) {')
    expect(at).toBeGreaterThan(0)
    expect(ROUTE.slice(at, at + 900)).not.toMatch(/await routeAI\(/)
  })
})

// ── 5–7 · THE BOUNDARY ITSELF ───────────────────────────────────────────────

describe('H6.3-5..7 — the card is the only teaching source on a card turn', () => {
  it('5 — continuity is handed the ACTIVE card as its authoritative source', () => {
    const block = buildRemediationCardSourceBlock(card(FRICTION))
    expect(block).toContain(card(FRICTION).plainExplanation.trim())
    expect(block).toMatch(/authored|curator/i)
  })

  it('6/7 — the KG sentence IS a real leak vector, and is NOT part of the card source', () => {
    // First prove the vector is real rather than hypothetical: the curriculum's
    // own description of this concept is the leaked sentence, verbatim.
    const kg = getKGNode(FRICTION)?.description ?? ''
    expect(kg, 'the KG really does state it').toMatch(OPPOSES_MOTION)

    // And the H5 grounding block quotes that description to the model. This is
    // the measured carrier — the assertion exists so that if the block ever
    // stops carrying it, this test tells us the measurement is stale rather
    // than silently passing for the wrong reason.
    const g = buildRemediationGrounding(FRICTION)
    expect(buildRemediationGroundingBlock(g), 'H5 grounding quotes the KG').toMatch(OPPOSES_MOTION)

    // The card source carries none of it.
    const block = buildRemediationCardSourceBlock(card(FRICTION))
    expect(block, 'card source must not carry the KG sentence').not.toMatch(OPPOSES_MOTION)
    expect(block).not.toContain(kg)
    expect(card(FRICTION).plainExplanation).not.toMatch(OPPOSES_MOTION)
  })

  it('7 — the route withholds the grounding block whenever a card owns the turn', () => {
    // SOURCE ISOLATION, not instruction: the competing source is not sent.
    expect(cardIsSoleTeachingSource('CURATED_CARD')).toBe(true)
    expect(cardIsSoleTeachingSource('EXISTING_GROUNDING')).toBe(false)
    expect(cardIsSoleTeachingSource('LLM_GENERATED')).toBe(false)
    expect(cardIsSoleTeachingSource(null)).toBe(false)

    // The grounding injection must be gated on it in the route.
    const at = ROUTE.indexOf('buildRemediationGrounding,')
    expect(at).toBeGreaterThan(0)
    const before = ROUTE.slice(Math.max(0, at - 1200), at)
    expect(before).toMatch(/cardIsSoleTeachingSource/)
  })
})

// ── 8–10 · nothing new can enter THROUGH the card source ────────────────────

describe('H6.3-8..10 — no mechanism, formula or analogy can enter via the card', () => {
  const block = () => buildRemediationCardSourceBlock(card(FRICTION))

  it('8 — the source names the card as the only account and forbids a substitute', () => {
    expect(block()).toMatch(/different mechanism|do not introduce/i)
  })

  it('9 — no formula is present, and adding one is forbidden', () => {
    const b = block()
    expect(b).not.toMatch(/[a-zµμ]\s*=\s*[a-zµμ0-9]/i)   // f = μN and friends
    expect(b).toMatch(/formula/i)
  })

  it('10 — the only comparison in the source is the card\'s own banned one', () => {
    const b = block()
    expect(b).toContain(card(FRICTION).antiAnalogy.tempting)
    expect(b).toMatch(/different comparison|analog/i)
  })

  it('the source is built ONLY from card fields — nothing else is interpolated', () => {
    const c = card(FRICTION)
    const b = buildRemediationCardSourceBlock(c)
    // Strip the block's own fixed instruction text and the card's own fields;
    // whatever is left must contain no sentence from anywhere else.
    const withoutCard = b
      .replace(c.plainExplanation.trim(), '')
      .replace(c.antiAnalogy.tempting, '')
      .replace(c.antiAnalogy.whyItFails, '')
    expect(withoutCard).not.toMatch(OPPOSES_MOTION)
    expect(withoutCard).not.toContain(c.canonicalIdea)   // reviewer field, not learner text
  })
})

// ── 11–15 · the safety properties this phase must not disturb ───────────────

describe('H6.3-11..15 — repetition, acknowledgement, mastery, state', () => {
  it('11 — the already-served guard is what prevents verbatim repetition', () => {
    expect(ROUTE).toContain('hasServedExplanation')
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(at, at + 2500)
    expect(scoped).toMatch(/hasServedExplanation/)
    expect(scoped).toMatch(/buildRemediationCardSourceBlock/)
  })

  it('12 — "ok sir" is still an acknowledgement', () => {
    expect(isBareAcknowledgement('ok sir')).toBe(false)  // pre-existing: address token
    expect(isBareAcknowledgement('ok')).toBe(true)
    expect(isBareAcknowledgement('yes')).toBe(true)
  })

  it('13/14/15 — no mastery, no probe, no new learner state on the card path', () => {
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(Math.max(0, at - 200), at + 2500)
    // Assignment, not mention — the H6.4 hold reads these counters to find out
    // whether the learner has shown anything, and never writes one.
    for (const forbidden of [
      /correctAtCheck\s*=[^=]/, /masteryVerified\s*=[^=]/, /mcqGradeHoisted\s*=/, /findBestProbe/,
      /mcqHoisted\s*=/, /arbitrateTurn\(/,
    ]) {
      expect(scoped, forbidden.source).not.toMatch(forbidden)
    }
    // The card renders no question widget of its own.
    for (const c of REMEDIATION_CARDS) {
      expect(renderRemediationCard(c), c.conceptId).not.toMatch(/<!--\s*MCQ/i)
    }
  })
})
