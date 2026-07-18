import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

/**
 * POST /api/learn/nav-event
 * Receives lesson navigation events for analytics/observability.
 * Logs server-side; extend to persist to a DB table when telemetry
 * infra is ready without a schema change here.
 */
export async function POST(req: Request) {
  try {
    const session = await auth()
    const body = await req.json().catch(() => ({}))
    // Structured log — picked up by any log aggregator pointed at stdout
    console.log('[nav-event]', JSON.stringify({ userId: session?.user?.id ?? 'anonymous', ...body }))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
