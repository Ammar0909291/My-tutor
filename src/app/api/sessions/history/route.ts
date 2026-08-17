import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { MessageRole } from '@prisma/client'
import { parseSignalTag } from '@/lib/teaching/signals'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { olderThan } from '@/lib/db/cursorPage'

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

  // ISS-19a — rate limit. This endpoint runs an indexed scan over a table of
  // full @db.Text columns and returns up to HISTORY_DISPLAY_LIMIT of them, so
  // it is the most expensive read a signed-in user can issue in a loop. Keyed
  // per user (not per IP): the cost is driven by whose history is fetched, and
  // an IP key would throttle a whole school behind one NAT.
  const rl = await checkRateLimit(`rl:history:${session.user.id}`, 30, 60)
  if (!rl.allowed) return rateLimitResponse()

  const { searchParams } = new URL(req.url)
  const subjectSlug = searchParams.get('subject')
  if (!subjectSlug) {
    return NextResponse.json({ success: false, error: 'subject is required' }, { status: 400 })
  }

  // LESSON ISOLATION — the root-cause fix for cross-lesson history leaking.
  //
  // This endpoint used to scope only by (userId, subject): every message the
  // learner had ever written in this SUBJECT, across every lesson, came back
  // as one undifferentiated thread. LearnSession cannot narrow this — it is
  // (learner x chat session) and can span several lessons in either
  // direction — so scoping instead by the same authoritative fact
  // /api/curriculum already reads: StudentProgress.currentLesson.
  //
  // Resolved HERE, server-side, from the DB row — never from a client-
  // supplied value. The client's OWN copy of "which lesson am I on"
  // (curriculumProgress) is fetched by a separate effect on a separate
  // timer, so trusting a client param would race it; a fresh, cheap,
  // indexed lookup here has no such race and cannot be spoofed.
  //
  // `lessonKeyFor()` reused verbatim from lessonAttempt.ts — the same
  // identity LessonAttempt already keys by — not a second lesson-identity
  // scheme. If no StudentProgress row exists yet (a genuinely new learner,
  // who by definition has no lesson history to leak), lessonKey stays null
  // and the query falls back to the pre-existing subject-wide scope: there
  // is nothing to narrow correctly, and narrowing to a fabricated key would
  // hide the little history that DOES exist rather than protect anything.
  // `activeLessonSlug` takes priority over `currentLesson` — same order
  // selectCurrentLesson() applies everywhere else this pair is read
  // together. `activeLessonSlug` is the "explicit navigation" fact
  // (lesson-init writes it on every open: next/restart/review/resume
  // alike), so it always names whichever lesson the learner most recently
  // actually opened — including a REVIEW of an earlier lesson, where
  // `currentLesson` (the monotonic furthest-progress counter) legitimately
  // stays ahead of what is on screen. Falling back to `currentLesson` only
  // covers subjects with no topicSlug grain, where `activeLessonSlug` is
  // never written at all.
  let lessonKey: string | null = null
  try {
    const sp = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode: subjectSlug } },
      select: { currentLesson: true, activeLessonSlug: true },
    })
    if (sp) {
      const { lessonKeyFor } = await import('@/lib/teaching/lessonAttempt')
      lessonKey = lessonKeyFor({ topicSlug: sp.activeLessonSlug, lessonOrder: sp.currentLesson })
    }
  } catch (err) {
    console.warn('[sessions/history GET] lesson-key resolution skipped:', err)
  }

  // ISS-19a — cursor pagination. `before` is a message id: the page returned
  // is the newest HISTORY_DISPLAY_LIMIT messages STRICTLY OLDER than it, so a
  // client can walk backwards through history without ever re-fetching what it
  // already holds. Absent ⇒ the newest page, byte-identical to the previous
  // behaviour, so existing clients are unaffected.
  const before = searchParams.get('before')
  // Scoped to the SUBJECT as well as the user. Without the subject clause a
  // cursor from one subject resolved against another and produced a page of
  // subject B's messages older than subject A's timestamp — a silently wrong
  // page rather than an error. Not a leak (the user clause always held), but
  // wrong is wrong.
  const cursorRow = before
    ? await prisma.message.findFirst({
        where: {
          id: before,
          session: { userId: session.user.id, subject: { slug: subjectSlug } },
        },
        select: { createdAt: true, id: true },
      })
    : null
  // An unknown/foreign cursor is ignored rather than 400'd: it is
  // indistinguishable from a message the learner deleted, and failing a
  // history restore over it would be worse than serving the newest page.

  const where = {
    role: { in: [MessageRole.USER, MessageRole.ASSISTANT] },
    session: {
      userId: session.user.id,
      subject: { slug: subjectSlug },
    },
    // Scopes to the resolved lesson when one exists — see the resolution
    // block above. Omitted (not `lessonKey: null`) when unresolvable, so an
    // unscoped learner keeps seeing the pre-existing subject-wide behaviour
    // rather than an artificially empty page.
    ...(lessonKey ? { lessonKey } : {}),
    // Matches the (createdAt desc, id desc) ordering below, so pages never
    // skip or repeat a row when timestamps collide — see lib/db/cursorPage.
    ...olderThan(cursorRow),
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
      // llmCallCount is selected for PROVENANCE, not analytics: the badge must
      // reflect what the turn actually spent, and `provider` has been measured
      // reporting 'memory' on turns an LLM re-rendered. Without this column a
      // restored transcript would keep showing the old, wrong badge forever.
      select: { id: true, role: true, content: true, createdAt: true, sessionId: true, provider: true, llmCallCount: true, visualSession: true },
    }))
    const messages = raw.reverse().map(stripControlMarkup)

    // THE FIGURES THIS HISTORY SHOWED, restored per message.
    //
    // Identity in, payload out, through the same deterministic resolver and
    // admission gate the live turns cleared: 0 model calls, 0 generation
    // calls. Keyed by message id so each figure returns to the message that
    // actually displayed it — the client must never re-attach one by
    // position. See messageVisuals.ts.
    const { restoreMessageVisuals } = await import('@/lib/teaching/visual/messageVisuals')
    const visuals = await restoreMessageVisuals(raw)
    // The raw identity stays server-side. The client receives the restored,
    // already-admitted payload and cannot ask for a concept — same rule the
    // resume path follows.
    const wire = messages.map(({ visualSession: _identity, ...m }) => m)

    return NextResponse.json({
      success: true,
      data: {
        messages: wire,
        visuals,
        // The cursor for the NEXT (older) page, or null at the beginning of
        // history. Derived from the raw page, never from the stripped copy.
        nextCursor: raw.length === HISTORY_DISPLAY_LIMIT ? messages[0]?.id ?? null : null,
        hasMore: raw.length === HISTORY_DISPLAY_LIMIT,
      },
    })
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
      // No `visuals` key would leave the client unable to tell "this history
      // has no figures" from "this response predates the feature". An empty
      // map says the former, which is the correct degradation: history still
      // renders, without pictures.
      return NextResponse.json({
        success: true,
        data: {
          messages,
          visuals: {},
          nextCursor: rawFallback.length === HISTORY_DISPLAY_LIMIT ? messages[0]?.id ?? null : null,
          hasMore: rawFallback.length === HISTORY_DISPLAY_LIMIT,
        },
      })
    } catch (fallbackErr) {
      console.error('[sessions/history GET]', fallbackErr)
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
}
