import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { MessageRole } from '@prisma/client'

/**
 * Full conversation history for a subject — WhatsApp-style.
 *
 * Returns EVERY user/assistant message this learner has ever exchanged in
 * this subject, across ALL sessions (active and completed), in chronological
 * order, with no limit. This feeds the UI ONLY: the AI context window is
 * built independently inside /api/learn/chat (HISTORY_LIMIT there is
 * deliberately untouched), so restoring the complete visible history never
 * changes prompt size or token usage.
 *
 * Rows are never archived or trimmed anywhere in the app, so this endpoint
 * is the single source of truth for "nothing was ever lost".
 */
export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const subjectSlug = searchParams.get('subject')
  if (!subjectSlug) {
    return NextResponse.json({ success: false, error: 'subject is required' }, { status: 400 })
  }

  const where = {
    role: { in: [MessageRole.USER, MessageRole.ASSISTANT] },
    session: {
      userId: session.user.id,
      subject: { slug: subjectSlug },
    },
  }
  // Secondary key keeps same-millisecond pairs (user turn + fast reply) in
  // stable order.
  const orderBy = [{ createdAt: 'asc' as const }, { id: 'asc' as const }]

  try {
    const messages = await withRetry(() => prisma.message.findMany({
      where,
      orderBy,
      select: { id: true, role: true, content: true, createdAt: true, sessionId: true, provider: true },
    }))

    return NextResponse.json({ success: true, data: { messages } })
  } catch (err) {
    // The WhatsApp-style history restore is core functionality — it must
    // never fail because of the AI-badge column (P2022 "column does not
    // exist" if a deploy's Prisma Client ever runs ahead of an unapplied
    // migration). Retry without `provider` before giving up; those
    // messages simply render with no badge, which is the correct fallback.
    console.error('[sessions/history GET] query with provider failed, retrying without it:', err)
    try {
      const messages = await withRetry(() => prisma.message.findMany({
        where,
        orderBy,
        select: { id: true, role: true, content: true, createdAt: true, sessionId: true },
      }))
      return NextResponse.json({ success: true, data: { messages } })
    } catch (fallbackErr) {
      console.error('[sessions/history GET]', fallbackErr)
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
}
