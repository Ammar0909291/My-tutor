import { describe, it, expect } from 'vitest'
import { EDUCATIONAL_BRAIN_SUBJECTS, isEduBrainEnabled } from '@/lib/curriculum/subjectRollout'
import { VISIBLE_SUBJECT_LIBRARY, SUBJECT_LIBRARY, findLibrarySubject } from '@/lib/curriculum/subjectCatalog'

/**
 * Biology subject-list rollout (2026-09-23). Content (KG/Educational
 * Brain/asset-contract) was already complete; the only gap was that
 * `biology` was missing from EDUCATIONAL_BRAIN_SUBJECTS, the single source
 * of truth every visibility surface reads from. This file pins that it is
 * now included, and — just as importantly — that nothing else moved: no
 * other still-hidden subject became visible, and every previously-visible
 * subject stayed visible.
 */

describe('EDUCATIONAL_BRAIN_SUBJECTS — biology rollout', () => {
  it('includes biology', () => {
    expect(EDUCATIONAL_BRAIN_SUBJECTS.has('biology')).toBe(true)
    expect(isEduBrainEnabled('biology')).toBe(true)
  })

  it('still includes every subject that was rolled out before this change', () => {
    for (const slug of ['mathematics', 'physics', 'english', 'chemistry']) {
      expect(EDUCATIONAL_BRAIN_SUBJECTS.has(slug)).toBe(true)
      expect(isEduBrainEnabled(slug)).toBe(true)
    }
  })

  it('does not roll out any subject beyond the intended five', () => {
    expect([...EDUCATIONAL_BRAIN_SUBJECTS].sort()).toEqual(
      ['biology', 'chemistry', 'english', 'mathematics', 'physics'].sort(),
    )
  })

  it('leaves other catalog subjects hidden — rollout did not widen beyond biology', () => {
    // Subjects that exist in the catalog but are deliberately not yet
    // rolled out. If this ever fails because one of these subjects SHOULD
    // now be visible, update this list deliberately — it must never pass
    // by accident.
    for (const slug of ['computer_science', 'data_science', 'ai']) {
      expect(isEduBrainEnabled(slug)).toBe(false)
    }
  })
})

describe('VISIBLE_SUBJECT_LIBRARY — the actual UI-facing gate', () => {
  it('now includes the biology entry from the catalog', () => {
    const biology = VISIBLE_SUBJECT_LIBRARY.find((s) => s.slug === 'biology')
    expect(biology).toBeDefined()
    expect(biology?.name).toBe('Biology')
    expect(biology?.category).toBe('biology')
    expect(biology?.visible).not.toBe(false)
  })

  it('still includes every previously-visible subject, unchanged', () => {
    const visibleSlugs = new Set(VISIBLE_SUBJECT_LIBRARY.map((s) => s.slug))
    for (const slug of ['mathematics', 'physics', 'english', 'chemistry']) {
      expect(visibleSlugs.has(slug)).toBe(true)
    }
  })

  it('still excludes a not-yet-rolled-out catalog subject', () => {
    // computer_science exists in the full catalog but is not in
    // EDUCATIONAL_BRAIN_SUBJECTS — confirms the filter is still doing real
    // work, not just passing everything through.
    expect(SUBJECT_LIBRARY.some((s) => s.slug === 'computer_science')).toBe(true)
    expect(VISIBLE_SUBJECT_LIBRARY.some((s) => s.slug === 'computer_science')).toBe(false)
  })

  it('every visible subject is actually enabled by the rollout set (no drift between the two gates)', () => {
    for (const s of VISIBLE_SUBJECT_LIBRARY) {
      expect(isEduBrainEnabled(s.slug)).toBe(true)
    }
  })
})

describe('findLibrarySubject — the enroll-route lookup, unaffected by this change', () => {
  it('resolves biology (it already did, by design — enroll never gated on rollout)', () => {
    const s = findLibrarySubject('biology')
    expect(s).toBeDefined()
    expect(s?.slug).toBe('biology')
    expect(s?.visible).not.toBe(false)
  })

  it('still resolves a hidden-from-rollout subject too — findLibrarySubject searches everything', () => {
    // This is intentional existing behavior (see its own doc comment) — a
    // learner already enrolled in a hidden subject must keep working.
    // Asserting it here so a future change to this rollout doesn't
    // accidentally couple the two mechanisms.
    expect(findLibrarySubject('computer_science')).toBeDefined()
  })
})
