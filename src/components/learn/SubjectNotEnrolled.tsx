'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CandyPage, Card, CandyButton, EagleMascot } from '@/components/ui/candy'

/** Every string on the screen, already translated by the page (same language the Library uses). */
export interface SubjectNotEnrolledCopy {
  title: string
  body?: string
  add?: string
  adding: string
  failed: string
  continueLabel?: string
  library: string
}

/**
 * What /learn shows when `?subject=` names a subject the learner is not
 * enrolled in — instead of silently opening a different subject.
 *
 * MEASURED in a real browser (2026-09-27): /learn?subject=biology on an
 * account not enrolled in Biology opened a Chemistry lesson, with nothing on
 * screen saying why. The learner is now told, and given the Library's own
 * choices: add the subject (the same additive POST /api/subjects/enroll the
 * Library's EnrollButton calls), go back to the subject they would otherwise
 * have landed on, or open the Library.
 *
 * Enrolling is the learner's click, never the page's: a GET render that wrote
 * an enrollment would re-add a removed subject from any stale link.
 */
export function SubjectNotEnrolled({
  subjectSlug, canEnroll, fallbackSlug, copy,
}: {
  subjectSlug: string
  /** The enroll endpoint's own rule: a known subject not hidden from new enrollments. */
  canEnroll: boolean
  /** The subject the learner would otherwise have landed on, offered as a way back. */
  fallbackSlug: string | null
  copy: SubjectNotEnrolledCopy
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function enroll() {
    if (loading) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/subjects/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean }
      if (!res.ok || !data.success) { setError(true); return }
      // The same URL now resolves to the newly enrolled subject's lesson.
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CandyPage className="p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen text-center gap-4">
        <EagleMascot variant="hero" size={96} />
        <Card className="px-6 py-8 flex flex-col items-center gap-3" data-testid="subject-not-enrolled">
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>
            {copy.title}
          </h1>
          {copy.body && (
            <p className="text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
              {copy.body}
            </p>
          )}
          {canEnroll && copy.add && (
            <CandyButton
              onClick={enroll}
              disabled={loading}
              className="px-5 py-3 rounded-2xl text-sm mt-2 w-full"
              style={{ background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, border: 'none' }}
            >
              {loading ? copy.adding : copy.add}
            </CandyButton>
          )}
          {error && (
            <p className="text-xs" role="alert" style={{ color: '#EF4444', fontWeight: 700 }}>
              {copy.failed}
            </p>
          )}
          {fallbackSlug && copy.continueLabel && (
            <Link
              href={`/learn?subject=${encodeURIComponent(fallbackSlug)}`}
              className="text-sm px-5 py-3 rounded-2xl w-full"
              style={{ background: 'var(--candy-bg)', color: 'var(--candy-ink)', fontWeight: 800, textDecoration: 'none' }}
            >
              {copy.continueLabel}
            </Link>
          )}
          <Link href="/library" className="text-xs" style={{ color: 'var(--candy-ink-soft)', fontWeight: 700 }}>
            {copy.library}
          </Link>
        </Card>
      </div>
    </CandyPage>
  )
}
