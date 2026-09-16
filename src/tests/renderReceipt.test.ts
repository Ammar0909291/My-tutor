/**
 * Typed Turn Contract, I2 (render receipt) — Batch 1, shadow-only.
 *
 * Pins `checkRenderReceipt` and `deriveRenderId` against the invariants
 * their own headers claim: the id is deterministic (same content -> same
 * id, from independently-computed objects), it never encodes the answer
 * key, an absent client field is never treated as evidence of anything, and
 * a mismatch is detected only when the client genuinely claims something
 * different from what the server believes is pending.
 */
import { describe, it, expect } from 'vitest'
import { deriveRenderId, mcqForClient, type TutorMCQ } from '@/lib/teaching/mcq'
import { checkRenderReceipt } from '@/lib/teaching/renderReceipt'

const AUTHORED: TutorMCQ = {
  question: 'What is velocity?',
  options: ['Speed', 'Displacement over time'],
  correctIndex: 1,
  assetId: 'asset-abc',
}

const ANONYMOUS: TutorMCQ = {
  question: 'What is force?',
  options: ['Mass times acceleration', 'A vector quantity'],
  correctIndex: 0,
}

describe('deriveRenderId', () => {
  it('is deterministic across independently-created objects with identical content', () => {
    const a = { ...AUTHORED }
    const b = { ...AUTHORED }
    expect(a).not.toBe(b) // genuinely different objects, same content
    expect(deriveRenderId(a)).toBe(deriveRenderId(b))
  })

  it('differs when the question differs', () => {
    expect(deriveRenderId(AUTHORED)).not.toBe(deriveRenderId(ANONYMOUS))
  })

  it('differs when assetId differs but question/options are otherwise identical', () => {
    const same = { ...AUTHORED, assetId: 'asset-xyz' }
    expect(deriveRenderId(AUTHORED)).not.toBe(deriveRenderId(same))
  })

  it('never encodes correctIndex — flipping the key alone does not change the id', () => {
    const flipped = { ...AUTHORED, correctIndex: 0 }
    expect(deriveRenderId(AUTHORED)).toBe(deriveRenderId(flipped))
  })

  it('handles the anonymous (no assetId) case identically across two objects', () => {
    expect(deriveRenderId({ ...ANONYMOUS })).toBe(deriveRenderId({ ...ANONYMOUS }))
  })
})

describe('mcqForClient carries the render id but never the key', () => {
  it('the id it sends matches what checkRenderReceipt expects back', () => {
    const wire = mcqForClient(AUTHORED)!
    expect(wire.renderId).toBe(deriveRenderId(AUTHORED))
    expect('correctIndex' in wire).toBe(false)
  })
})

describe('checkRenderReceipt', () => {
  it('no pending probe — always consistent, regardless of what the client sends', () => {
    expect(checkRenderReceipt(null, null)).toEqual({ consistent: true, reason: 'no-pending-probe' })
    expect(checkRenderReceipt(null, 'anything')).toEqual({ consistent: true, reason: 'no-pending-probe' })
    expect(checkRenderReceipt(null, undefined)).toEqual({ consistent: true, reason: 'no-pending-probe' })
  })

  it('field absent (undefined) — never treated as evidence, always consistent', () => {
    expect(checkRenderReceipt(AUTHORED, undefined)).toEqual({ consistent: true, reason: 'client-not-upgraded' })
  })

  it('client explicitly reports nothing displayed while server has a pending probe — mismatch', () => {
    expect(checkRenderReceipt(AUTHORED, null)).toEqual({ consistent: false, reason: 'receipt-missing' })
  })

  it('matching id — consistent', () => {
    const id = deriveRenderId(AUTHORED)
    expect(checkRenderReceipt(AUTHORED, id)).toEqual({ consistent: true, reason: 'receipt-matches' })
  })

  it('matches by CONTENT, not object identity — a re-hydrated copy from a persisted snapshot still agrees', () => {
    const persisted: TutorMCQ = { question: AUTHORED.question, options: [...AUTHORED.options], correctIndex: AUTHORED.correctIndex, assetId: AUTHORED.assetId }
    const id = deriveRenderId(AUTHORED)
    expect(checkRenderReceipt(persisted, id).consistent).toBe(true)
  })

  it('genuine mismatch — the client claims a DIFFERENT question than the server has pending', () => {
    const wrongId = deriveRenderId(ANONYMOUS)
    expect(checkRenderReceipt(AUTHORED, wrongId)).toEqual({ consistent: false, reason: 'receipt-mismatch' })
  })

  it('an arbitrary/garbage string never accidentally matches', () => {
    expect(checkRenderReceipt(AUTHORED, 'not-a-real-hash').consistent).toBe(false)
  })
})
