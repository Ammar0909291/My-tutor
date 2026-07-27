import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { MessageRole } from '@prisma/client'
import { parseSignalTag } from '@/lib/teaching/signals'

/**
 * ISS-14 — read-time control-markup strip (masterplan P0).
 *
 * Assistant messages are tag-stripped at WRITE time today, but rows written
 * before each stripper existed can still carry control markup — the
 * `<!--SIGNAL-->` block above all (it can quote the learner's own phrasing
 * verbatim, ISS-18 territory). Stripping at read time makes the guarantee
 * hold for the whole table without a backfill migration.
 *
 * Reuses the tag owners rather than restating their grammars: parseSignalTag
 * is THE signal grammar; the remaining patterns are the literal tag tokens
 * the route strips at write time (worked-example / lesson markers), kept to
 * exact-token matches so prose that merely mentions a tag name is untouched.
 */
function stripControlMarkup<T extends { content: string }>(m: T): T {
  let content = parseSignalTag(m.content).cleanText
  content = content.replace(/\[(?:\/)?(?:WE|LESSON|HINT|INLINE_PRACTICE)\]/g, '')
    .replace(/\[LESSON_COMPLETE\]/g, '')
    .trimEnd()
  return content === m.content ? m : { ...m, content }
}

/**
 * Recent conversation history for a subject — WhatsApp-style.
 *
 * Returns the most recent HISTORY_DISPLAY_LIMIT messages for this learner
 * and subject, across ALL sessions (active and completed), in chronological
 * order. This feeds the UI ONLY: the AI context window is built independently
 * inside /api/learn/chat (capped at 30) and is never affected by this limit.
 *
 * The cap prevents multi-second load times for active learners who have
 * accumulated hundreds of sessions. Old messages remain in the DB and can be
 * fetched with pagination if needed.
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
  // Cap at the 200 most recent messages for display. AI context is built
  // independently in /api/learn/chat (capped at 30) — this limit only
  // affects the visible conversation window, not teaching quality.
  // Fetching unbounded history blocks mount for active learners with
  // hundreds of sessions (each message is a full @db.Text column).
  const HISTORY_DISPLAY_LIMIT = 200

  try {
    // Fetch newest-first so `take` keeps the most-recent end, then reverse
    // to restore chronological order for the UI.
    const raw = await withRetry(() => prisma.message.findMany({
      where,
      orderBy: [{ createdAt: 'desc' as const }, { id: 'desc' as const }],
      take: HISTORY_DISPLAY_LIMIT,
      select: { id: true, role: true, content: true, createdAt: true, sessionId: true, provider: true },
    }))
    const messages = raw.reverse().map(stripControlMarkup)

    return NextResponse.json({ success: true, data: { messages } })
  } catch (err) {
    // The WhatsApp-style history restore is core functionality — it must
    // never fail because of the AI-badge column (P2022 "column does not
    // exist" if a deploy's Prisma Client ever runs ahead of an unapplied
    // migration). Retry without `provider` before giving up; those
    // messages simply render with no badge, which is the correct fallback.
    console.error('[sessions/history GET] query with provider failed, retrying without it:', err)
    try {
      const rawFallback = await withRetry(() => prisma.message.findMany({
        where,
        orderBy: [{ createdAt: 'desc' as const }, { id: 'desc' as const }],
        take: HISTORY_DISPLAY_LIMIT,
        select: { id: true, role: true, content: true, createdAt: true, sessionId: true },
      }))
      const messages = rawFallback.reverse().map(stripControlMarkup)
      return NextResponse.json({ success: true, data: { messages } })
    } catch (fallbackErr) {
      console.error('[sessions/history GET]', fallbackErr)
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
}
