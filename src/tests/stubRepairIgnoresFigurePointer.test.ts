/**
 * A FIGURE POINTER IS NOT A REPLY.
 *
 * MEASURED (production, 2026-10-02, math.trig.unit-circle, weak-learner QA,
 * Vercel log 19:02:18): the repeat guard dropped the turn's only paragraph
 * (276 → 97 chars, "emptied": false) and the learner's whole reply to "can you
 * ask me a question?" was the appended pointer "Take a look at the figure beside
 * this message — it's a general illustration related to the topic." Its 16
 * words passed the 12-word stub threshold, so neither the one regeneration nor
 * the empty-reply fallback ran. See splitVisualPointer.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { ensureVisualAcknowledged, splitVisualPointer } from '@/lib/teaching/visual/visualAcknowledgement'
import { needsRepair } from '@/lib/teaching/confirmBackRepair'
import { makeVisualAsset } from '@/lib/teaching/visual/asset'
import type { VisualDecision } from '@/lib/teaching/visual/types'

function decision(scope: 'concept' | 'domain'): VisualDecision {
  const asset = makeVisualAsset({
    assetId: 'test-asset',
    conceptId: 'math.trig.unit-circle',
    conceptTitle: 'Unit Circle',
    representation: 'geometry_shape',
    payload: { renderer: 'card', visualType: 'number_line' },
    provenance: scope === 'domain' ? 'domain-default' : 'curated',
  })
  return {
    purpose: 'explain', representation: asset.representation, payload: asset.payload, asset,
    graphical: true, source: 'registry', provenance: `registry:${asset.conceptId}`,
    conceptId: asset.conceptId, conceptTitle: asset.conceptTitle, excursion: false,
    allowed: null, session: null, continuityReason: 'new-figure',
  }
}

const MEASURED = "Take a look at the figure beside this message — it's a general illustration related to the topic."

describe('splitVisualPointer', () => {
  it('the measured reply is a pointer and nothing else', () => {
    expect(splitVisualPointer(MEASURED)).toEqual({ body: '', pointer: MEASURED })
    expect(needsRepair(MEASURED)).toBe(false) // the defect: the pointer alone passed
    expect(needsRepair(splitVisualPointer(MEASURED).body)).toBe(true)
  })

  it('splits every pointer ensureVisualAcknowledged can append, both scopes', () => {
    for (const scope of ['concept', 'domain'] as const) {
      const body = 'A radian is the angle that cuts off an arc as long as the radius.'
      const ack = ensureVisualAcknowledged(body, decision(scope), true)
      expect(ack.appended).toBe(true)
      const split = splitVisualPointer(ack.text)
      expect(split.body).toBe(body)
      expect(split.pointer.length).toBeGreaterThan(0)
      expect(ack.text.endsWith(split.pointer)).toBe(true)
    }
  })

  it('leaves a reply without an appended pointer alone', () => {
    const own = 'Take a look at the unit circle: the point at 90° is (0, 1).'
    expect(splitVisualPointer(own)).toEqual({ body: own, pointer: '' })
    expect(splitVisualPointer('')).toEqual({ body: '', pointer: '' })
  })
})

describe('the chat route judges a stub without the pointer and keeps the pointer', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')
  const repair = ROUTE.slice(ROUTE.indexOf('const repairStubReply = async'), ROUTE.indexOf("// ── THE CONFIRM-BACK, WHEREVER IT SITS"))

  it('repairStubReply tests the body and re-appends the pointer to a repair', () => {
    expect(repair).toMatch(/splitVisualPointer\(stub\)/)
    expect(repair).toMatch(/if \(!needsRepair\(stubBody\) \|\| serveLessonComplete\) return null/)
    expect(repair).toMatch(/mergeRepair\(stubBody, retryText\)/)
    expect(repair).toMatch(/stubPointer \? `\$\{merged\}\\n\\n\$\{stubPointer\}` : merged/)
  })

  it('the confirm-back and repeat-guard fallbacks treat a pointer alone as empty', () => {
    expect(ROUTE).toMatch(/if \(!cbPointer\.body\.trim\(\)\) \{/)
    expect(ROUTE).toMatch(/if \(!rgPointer\.body\.trim\(\)\) \{/)
    expect(ROUTE).toMatch(/if \(cbPointer\.pointer\) next = `\$\{next\}\\n\\n\$\{cbPointer\.pointer\}`/)
    expect(ROUTE).toMatch(/if \(rgPointer\.pointer\) next = `\$\{next\}\\n\\n\$\{rgPointer\.pointer\}`/)
  })
})
