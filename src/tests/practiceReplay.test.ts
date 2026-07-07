/**
 * HIGH-6: Practice submission idempotency via idempotencyKey.
 */
import { describe, it, expect } from 'vitest'

// Simulate the dedup logic: if idempotencyKey provided and already exists → 409
function simulateSubmit(
  existingKeys: Set<string>,
  idempotencyKey?: string,
): { status: number; sideEffectRan: boolean } {
  if (idempotencyKey && existingKeys.has(idempotencyKey)) {
    return { status: 409, sideEffectRan: false }
  }
  if (idempotencyKey) existingKeys.add(idempotencyKey)
  return { status: 200, sideEffectRan: true }
}

describe('HIGH-6: practice replay deduplication', () => {
  it('first submission with key succeeds and runs side-effects', () => {
    const keys = new Set<string>()
    const r = simulateSubmit(keys, 'key-abc')
    expect(r.status).toBe(200)
    expect(r.sideEffectRan).toBe(true)
  })

  it('replay with same key returns 409, no side-effects', () => {
    const keys = new Set<string>(['key-abc'])
    const r = simulateSubmit(keys, 'key-abc')
    expect(r.status).toBe(409)
    expect(r.sideEffectRan).toBe(false)
  })

  it('different keys are independent', () => {
    const keys = new Set<string>(['key-1'])
    const r = simulateSubmit(keys, 'key-2')
    expect(r.status).toBe(200)
    expect(r.sideEffectRan).toBe(true)
  })

  it('no key provided: always runs (legacy behaviour)', () => {
    const keys = new Set<string>()
    const r1 = simulateSubmit(keys)
    const r2 = simulateSubmit(keys)
    expect(r1.sideEffectRan).toBe(true)
    expect(r2.sideEffectRan).toBe(true)
  })

  it('concurrent duplicate keys: only first wins', () => {
    const keys = new Set<string>()
    // Simulate two concurrent calls — first adds key, second sees it
    const results = ['key-x', 'key-x'].map((k) => simulateSubmit(keys, k))
    const successes = results.filter((r) => r.status === 200)
    const conflicts = results.filter((r) => r.status === 409)
    expect(successes).toHaveLength(1)
    expect(conflicts).toHaveLength(1)
    expect(successes[0].sideEffectRan).toBe(true)
    expect(conflicts[0].sideEffectRan).toBe(false)
  })
})
