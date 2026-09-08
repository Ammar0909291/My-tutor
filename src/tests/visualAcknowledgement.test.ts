/**
 * See visualAcknowledgement.ts's module docblock for the measured defect:
 * a requested diagram sometimes appeared with the reply carrying no
 * reference to it at all.
 */
import { describe, it, expect } from 'vitest'
import { ensureVisualAcknowledged } from '@/lib/teaching/visual/visualAcknowledgement'
import { makeVisualAsset } from '@/lib/teaching/visual/asset'
import type { VisualDecision } from '@/lib/teaching/visual/types'

function decisionFor(overrides: {
  scope: 'concept' | 'domain'
  purpose?: VisualDecision['purpose']
} = { scope: 'concept' }): VisualDecision {
  const provenance = overrides.scope === 'domain' ? 'domain-default' : 'curated'
  const asset = makeVisualAsset({
    assetId: 'test-asset',
    conceptId: 'phys.mech.newtons-first-law',
    conceptTitle: "Newton's First Law",
    representation: 'free_body_diagram',
    payload: { renderer: 'card', visualType: 'number_line' },
    provenance,
  })
  return {
    purpose: overrides.purpose ?? 'explain',
    representation: asset.representation,
    payload: asset.payload,
    asset,
    graphical: true,
    source: 'registry',
    provenance: `registry:${asset.conceptId}`,
    conceptId: asset.conceptId,
    conceptTitle: asset.conceptTitle,
    excursion: false,
    allowed: null,
    session: null,
    continuityReason: 'new-figure',
  }
}

describe('a newly-introduced figure with no acknowledgement gets one appended', () => {
  it('appends a pointer sentence naming the concept, for a concept-scoped asset', () => {
    const r = ensureVisualAcknowledged('Great, glad that makes sense!', decisionFor({ scope: 'concept' }), true)
    expect(r.appended).toBe(true)
    expect(r.text).toContain('Great, glad that makes sense!')
    expect(r.text).toContain('free body diagram')
    expect(r.text).toContain("Newton's First Law")
  })

  it('never claims a domain-scoped asset "shows" the concept — respects the M3-B/B4 scope rule', () => {
    const r = ensureVisualAcknowledged('Great, glad that makes sense!', decisionFor({ scope: 'domain' }), true)
    expect(r.appended).toBe(true)
    expect(r.text).not.toContain('it shows')
    expect(r.text).toContain('general illustration')
  })

  it('the purpose clause varies with the decision purpose', () => {
    const r1 = ensureVisualAcknowledged('ok', decisionFor({ scope: 'concept', purpose: 'demonstrate' }), true)
    expect(r1.text).toContain('Follow it step by step.')

    const r2 = ensureVisualAcknowledged('ok', decisionFor({ scope: 'concept', purpose: 'review' }), true)
    expect(r2.text).toContain("Use it to recall what you've already learned.")
  })
})

describe('a genuine reference is left alone', () => {
  const cases = [
    'Look at the diagram — the forces are balanced.',
    "Here's the picture showing the two forces.",
    'Notice how the arrows in the figure point in opposite directions.',
    'The graph on your screen shows the relationship.',
  ]
  for (const text of cases) {
    it(`does not append when the text already says: "${text}"`, () => {
      const r = ensureVisualAcknowledged(text, decisionFor(), true)
      expect(r.appended).toBe(false)
      expect(r.text).toBe(text)
    })
  }
})

describe('scoping — only the turn that actually introduces the figure', () => {
  it('does nothing on a held/continuity turn, even with zero reference', () => {
    const r = ensureVisualAcknowledged('Great work, keep going!', decisionFor(), false)
    expect(r.appended).toBe(false)
    expect(r.text).toBe('Great work, keep going!')
  })
})

describe('no fabrication when there is nothing to attach to', () => {
  it('a NO-FIGURE decision (graphical false) never appends', () => {
    const noFigure: VisualDecision = {
      purpose: 'explain',
      representation: null,
      payload: null,
      asset: null,
      graphical: false,
      source: 'none',
      provenance: 'no-figure:below-asset-contract',
      conceptId: null,
      conceptTitle: null,
      excursion: false,
      allowed: null,
      session: null,
      continuityReason: 'no-figure',
    }
    const r = ensureVisualAcknowledged('Some teaching text.', noFigure, true)
    expect(r.appended).toBe(false)
    expect(r.text).toBe('Some teaching text.')
  })

  it('a null decision never appends', () => {
    const r = ensureVisualAcknowledged('Some teaching text.', null, true)
    expect(r.appended).toBe(false)
  })
})

describe('a repair may never break a turn', () => {
  it('empty text is left alone rather than producing a standalone pointer', () => {
    const r = ensureVisualAcknowledged('', decisionFor(), true)
    expect(r.appended).toBe(false)
    expect(r.text).toBe('')
  })

  it('malformed input never throws', () => {
    expect(() => ensureVisualAcknowledged(null as unknown as string, decisionFor(), true)).not.toThrow()
    expect(() => ensureVisualAcknowledged(undefined as unknown as string, decisionFor(), true)).not.toThrow()
  })
})

describe('the route actually wires this in, scoped to a newly-introduced figure', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('calls ensureVisualAcknowledged with figureIntroducedThisTurn && visualFired', () => {
    expect(ROUTE).toMatch(/ensureVisualAcknowledged\(cleanText, visualDecisionHoisted, figureIntroducedThisTurn && visualFired\)/)
  })
})
