import { NextResponse } from 'next/server'
import { loadFailureAnalyticsDashboard } from '@/lib/teaching/dashboard/failureAnalyticsDashboard'
import { captureError } from '@/lib/monitoring'

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  // Deny if CRON_SECRET is not configured — never allow unauthenticated access in production
  if (!secret) return false
  return req.headers.get('authorization') === `Bearer ${secret}`
}

/**
 * Scheduled activation of the Evidence Loop's read side (Failure Analytics
 * Dashboard). Reuses loadFailureAnalyticsDashboard() — already built and
 * tested — as the only analytics computation; this route adds nothing new
 * beyond a scheduled trigger and a structured log line, following the
 * exact CRON_SECRET-bearer-auth convention already established by
 * /api/cron/reminders. No new telemetry, no new tables: the report is
 * computed fresh from existing evidence on every run and logged for the
 * platform logger to capture, never persisted.
 */
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dashboard = await loadFailureAnalyticsDashboard()

    console.log('[cron/evidence-report]', JSON.stringify({
      generatedAt: dashboard.generatedFrom,
      mostFailedConcepts: dashboard.mostFailedConcepts.slice(0, 5),
      topAuthoringPriorities: dashboard.authoringPriorities.slice(0, 5),
      reviewQueueStats: dashboard.reviewQueueStats,
    }))

    return NextResponse.json({
      success: true,
      generatedFrom: dashboard.generatedFrom,
      authoringPrioritiesCount: dashboard.authoringPriorities.length,
      mostFailedConceptsCount: dashboard.mostFailedConcepts.length,
    })
  } catch (err) {
    console.error('[cron/evidence-report]', err)
    captureError(err, { route: 'api/cron/evidence-report' })
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
