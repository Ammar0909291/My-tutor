/**
 * /learn?subject=<slug> for a subject the learner is not enrolled in.
 *
 * MEASURED in a real browser against production (2026-09-27): the page fell
 * back SILENTLY to the learner's first subject, so /learn?subject=biology on
 * an account not enrolled in Biology opened a Chemistry lesson with nothing on
 * screen saying why. The page now says so and offers the Library's choices;
 * it never enrolls on its own (a GET that wrote an enrollment would re-add a
 * removed subject from any stale link).
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveLearnSubject, type EnrollmentLike } from '@/lib/subjects/resolveLearnSubject'
import { translations } from '@/lib/i18n'

const row = (slug: string, isActive = true): EnrollmentLike => ({ isActive, subject: { id: `id-${slug}`, slug, name: slug } })
const CHEM_FIRST = [row('chemistry'), row('physics'), row('english')]

describe('resolveLearnSubject', () => {
  it('opens the requested subject when it is enrolled', () => {
    const r = resolveLearnSubject(CHEM_FIRST, 'physics')
    expect(r).toEqual({ kind: 'open', enrollment: CHEM_FIRST[1] })
  })

  it('opens the first enrolled subject when none is requested — unchanged', () => {
    expect(resolveLearnSubject(CHEM_FIRST, undefined)).toEqual({ kind: 'open', enrollment: CHEM_FIRST[0] })
    expect(resolveLearnSubject(CHEM_FIRST, '  ')).toEqual({ kind: 'open', enrollment: CHEM_FIRST[0] })
  })

  it('the measured case: biology requested, not enrolled -> an explicit, enrollable prompt, never chemistry', () => {
    const r = resolveLearnSubject(CHEM_FIRST, 'biology')
    expect(r.kind).toBe('not-enrolled')
    if (r.kind !== 'not-enrolled') return
    expect(r.requestedSlug).toBe('biology')
    expect(r.librarySubject?.slug).toBe('biology')
    expect(r.canEnroll).toBe(true)
    expect(r.fallback).toBe(CHEM_FIRST[0])
  })

  it('a REMOVED subject (isActive = false) is not enrolled — unenroll only flips the flag', () => {
    const rows = [row('chemistry'), row('biology', false)]
    const r = resolveLearnSubject(rows, 'biology')
    expect(r.kind).toBe('not-enrolled')
    if (r.kind === 'not-enrolled') expect(r.canEnroll).toBe(true)
  })

  it('the default skips a removed first subject', () => {
    const rows = [row('biology', false), row('chemistry')]
    expect(resolveLearnSubject(rows, undefined)).toEqual({ kind: 'open', enrollment: rows[1] })
  })

  it('an unknown subject is reported as unavailable, not enrollable', () => {
    const r = resolveLearnSubject(CHEM_FIRST, 'not-a-subject')
    expect(r.kind).toBe('not-enrolled')
    if (r.kind !== 'not-enrolled') return
    expect(r.librarySubject).toBeUndefined()
    expect(r.canEnroll).toBe(false)
  })

  it('canEnroll mirrors the enroll endpoint: a subject hidden from new enrollments is not offered', () => {
    const src = readFileSync(path.join(process.cwd(), 'src/app/api/subjects/enroll/route.ts'), 'utf8')
    expect(src).toContain('librarySubject.visible === false')
    const lib = readFileSync(path.join(process.cwd(), 'src/lib/subjects/resolveLearnSubject.ts'), 'utf8')
    expect(lib).toContain('visible !== false')
  })
})

describe('/learn wiring', () => {
  const page = readFileSync(path.join(process.cwd(), 'src/app/learn/page.tsx'), 'utf8')

  it('resolves through resolveLearnSubject and renders the prompt instead of falling back', () => {
    expect(page).toContain('resolveLearnSubject(')
    expect(page).toContain('<SubjectNotEnrolled')
    // The old silent fallback shape is gone.
    expect(page).not.toMatch(/requestedSubject\s*\?\?\s*profile\?\.subjects\[0\]/)
  })

  it('never enrolls the requested subject during the page render', () => {
    // The only write in the page is the pre-existing auto-heal for a profile
    // with NO subjects at all; the prompt returns before it is reached.
    expect(page).not.toContain('subjects/enroll')
    expect(page.indexOf('<SubjectNotEnrolled')).toBeGreaterThan(0)
    expect(page.indexOf('<SubjectNotEnrolled')).toBeLessThan(page.indexOf('profileSubject.upsert'))
  })

  it('the unavailable message exists in every teaching language', () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const table = translations[lang] as Record<string, string>
      expect(table.learn_subject_unavailable?.length ?? 0).toBeGreaterThan(0)
    }
  })
})
