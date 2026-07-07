/**
 * resolveCurriculumSource.test.ts
 *
 * Regression test for the English-curriculum bug: GET /api/curriculum used
 * to check the legacy `Curriculum` DB table (seeded once for c/cpp/python/
 * english by scripts/seed-curriculum.ts) BEFORE the canonical Knowledge
 * Graph, so any pre-existing English rows shadowed the canonical KG
 * entirely regardless of adapter registration. Fixed by making the
 * canonical KG win unconditionally — this test locks that priority in.
 */
import { describe, it, expect } from 'vitest'
import { resolveCurriculumSource } from '@/lib/curriculum/resolveCurriculumSource'

describe('resolveCurriculumSource', () => {
  it('canonical KG wins even when legacy DB rows exist — the exact English bug scenario', () => {
    expect(resolveCurriculumSource(true, 32, true)).toBe('kg')
    expect(resolveCurriculumSource(true, 1, false)).toBe('kg')
  })

  it('canonical KG wins when there are no legacy rows', () => {
    expect(resolveCurriculumSource(true, 0, false)).toBe('kg')
  })

  it('falls back to legacy DB rows only when there is no canonical KG', () => {
    expect(resolveCurriculumSource(false, 21, false)).toBe('legacy-db')
    expect(resolveCurriculumSource(false, 21, true)).toBe('legacy-db')
  })

  it('falls back to the Subject Library catalog when there is neither a KG nor legacy rows', () => {
    expect(resolveCurriculumSource(false, 0, true)).toBe('library-catalog')
  })

  it('resolves to none when nothing is available', () => {
    expect(resolveCurriculumSource(false, 0, false)).toBe('none')
  })
})
