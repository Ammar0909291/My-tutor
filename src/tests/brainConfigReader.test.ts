/**
 * WP-8 prerequisite — the BrainConfig runtime reader. Asserts the resolution
 * rules that make it safe: RS §18 is the default, a row overrides it, an
 * ineffective or mis-typed row does not, and nothing throws.
 */
import { describe, it, expect } from 'vitest'
import {
  RS18_DEFAULTS, isEffective, resolveRow, resolveConfig, resolveConfigs,
  type BrainConfigRow, type BrainConfigStore,
} from '@/lib/config/brainConfig'

const NOW = new Date('2026-08-01T00:00:00Z')
const past = new Date('2026-01-01T00:00:00Z')
const future = new Date('2027-01-01T00:00:00Z')

const row = (o: Partial<BrainConfigRow> & { name: string; value: unknown }): BrainConfigRow => ({
  version: 1, effectiveFrom: past, effectiveTo: null, ...o,
})

const storeOf = (rows: BrainConfigRow[]): BrainConfigStore => ({
  async findByNames(names) { return rows.filter((r) => names.includes(r.name)) },
})

const failingStore: BrainConfigStore = {
  async findByNames() { throw new Error('connection refused') },
}

describe('BrainConfig reader · RS §18 is the normative default', () => {
  it('transcribes RS §18 values', () => {
    expect(RS18_DEFAULTS['fluency.count']).toBe(3)
    expect(RS18_DEFAULTS['fluency.latencyFactor']).toBe(1.25)
    expect(RS18_DEFAULTS['conv.maxConsecutiveQuestions']).toBe(2)
    // §18 ships null for the expert paragraph ceiling — a real value, not a gap.
    expect(RS18_DEFAULTS['budgets.paragraphs.expert']).toBeNull()
  })

  it('returns the default when no row exists', async () => {
    const r = await resolveConfig(storeOf([]), 'fluency.count', NOW)
    expect(r.value).toBe(3)
    expect(r.source).toBe('rs18-default')
    expect(r.degradedReason).toBeUndefined()
  })
})

describe('BrainConfig reader · a row overrides the default', () => {
  it('uses an effective row', async () => {
    const r = await resolveConfig(storeOf([row({ name: 'fluency.count', value: 5 })]), 'fluency.count', NOW)
    expect(r.value).toBe(5)
    expect(r.source).toBe('store')
  })

  it('ignores a row that is not yet in force', async () => {
    const r = await resolveConfig(
      storeOf([row({ name: 'fluency.count', value: 9, effectiveFrom: future })]), 'fluency.count', NOW)
    expect(r.value).toBe(3)
    expect(r.source).toBe('rs18-default')
  })

  it('ignores an expired row', async () => {
    const r = await resolveConfig(
      storeOf([row({ name: 'fluency.count', value: 9, effectiveTo: past })]), 'fluency.count', NOW)
    expect(r.source).toBe('rs18-default')
  })

  it('resolves overlapping rows deterministically by version then effectiveFrom', () => {
    const a = row({ name: 'k', value: 1, version: 1 })
    const b = row({ name: 'k', value: 2, version: 3 })
    const c = row({ name: 'k', value: 3, version: 3, effectiveFrom: new Date('2026-06-01T00:00:00Z') })
    expect(resolveRow([a, b, c], NOW)?.value).toBe(3)
    expect(resolveRow([a, b], NOW)?.value).toBe(2)
    expect(resolveRow([], NOW)).toBeNull()
  })
})

describe('BrainConfig reader · fails soft, never silently', () => {
  it('degrades every key to its default when the store throws', async () => {
    const m = await resolveConfigs(failingStore, ['fluency.count', 'stage.capTurns'], NOW)
    expect(m.get('fluency.count')!.value).toBe(3)
    expect(m.get('stage.capTurns')!.value).toBe(3)
    expect(m.get('fluency.count')!.degradedReason).toContain('store unavailable')
  })

  it('rejects a mis-typed row rather than coercing it', async () => {
    const r = await resolveConfig(
      storeOf([row({ name: 'fluency.count', value: '5' })]), 'fluency.count', NOW)
    expect(r.value).toBe(3)                       // the default, not 5 and not '5'
    expect(r.source).toBe('rs18-default')
    expect(r.degradedReason).toContain('does not match RS §18 type')
  })

  it('treats effectiveTo as exclusive and effectiveFrom as inclusive', () => {
    expect(isEffective(row({ name: 'k', value: 1, effectiveFrom: NOW }), NOW)).toBe(true)
    expect(isEffective(row({ name: 'k', value: 1, effectiveTo: NOW }), NOW)).toBe(false)
  })
})
