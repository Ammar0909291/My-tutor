import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { loadReviewQueue } from '@/lib/teaching/retrieval/spacedRetrievalScheduler'

/**
 * Read-only surface for the Spaced Retrieval Scheduler (Claude
 * Recommendation #8) — the backend has existed since it was wired into
 * route.ts, but had no student-facing view of "what's due for review."
 * This route changes nothing about the scheduler itself: it calls the
 * existing `loadReviewQueue(userId)` loader verbatim and shapes the
 * response for the dashboard widget. No new decisions, no new schema.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const queue = await loadReviewQueue(session.user.id)
    const toDto = (r: (typeof queue.all)[number]) => ({
      conceptId: r.conceptId,
      subject: r.subject,
      forgettingRisk: r.forgettingRisk,
      overdue: r.overdue,
      daysOverdue: r.daysOverdue,
      maintenanceStatus: r.maintenanceStatus,
      hasActiveMisconception: r.hasActiveMisconception,
    })
    return NextResponse.json({
      overdue: queue.overdue.map(toDto),
      dueToday: queue.dueToday.map(toDto),
      totalDue: queue.overdue.length + queue.dueToday.length,
    })
  } catch {
    // Read-only, best-effort widget — a scheduler failure never breaks the
    // dashboard. Empty queue degrades to "nothing due" rather than an error.
    return NextResponse.json({ overdue: [], dueToday: [], totalDue: 0 })
  }
}
