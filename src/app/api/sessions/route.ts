import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { withRetry } from "@/lib/db/withRetry";
import { withTimeout } from "@/lib/net/timeout";
import { setSessionState, setUserActiveSession } from "@/lib/redis/client";
import type { RedisSessionState } from "@/types";

// P0: this route's every DB call is on the blocking path the client's very
// first "start lesson" request makes (LessonScreen.tsx's startLesson ->
// POST /api/sessions, guarded client-side by a 15s fetchWithTimeout, tried
// twice). Every call here was previously unguarded — the same hang class
// already fixed for the NextAuth callbacks (auth/config.ts) and the
// dashboard (dashboard/page.tsx): a stalled/pool-exhausted Postgres
// connection can hang without throwing, so an unguarded await here just
// sits until the client's own two 15s attempts both expire and the student
// sees "Unable to connect to Tutor Max." Bounding each call server-side
// converts a hang into a normal thrown 500 well inside the client's
// timeout, which the existing setInitError('connect_failed') retry UI
// already handles correctly.
//
// P0 follow-up ("network hiccup" on lesson start): a timeout alone still
// fails the WHOLE request on a Neon cold start — the first query after
// compute auto-suspend dies instantly with P1001/P1017, the route 500s,
// and the student lands on the hiccup screen even though the very next
// attempt would succeed. Each blocking call is therefore also wrapped in
// withRetry (connection-class errors only, short backoff), the same
// pattern the other write-heavy routes here already use. One retry keeps
// the worst hang-case inside the client's 15s window; the common
// fast-fail cold start heals in under a second.
const SESSION_DB_TIMEOUT_MS = 10000;
const dbCall = <T>(label: string, fn: () => Promise<T>): Promise<T> =>
  withRetry(() => withTimeout(fn(), SESSION_DB_TIMEOUT_MS, label), 2, 800);

const createSchema = z.object({
  subjectSlug: z.string(),
  memoryContext: z.string().optional(),
  // School Mode (Sprint BI): catalog chapter id (e.g. "cbse.math.8.ch1") —
  // persisted in contextSnapshot so the chat route can build board-aware context.
  schoolChapterId: z.string().max(64).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const sessions = await dbCall('sessions-list', () => prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: "desc" },
      take: 20,
      include: { subject: { select: { name: true, slug: true } }, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    }))

    return NextResponse.json({ success: true, data: sessions });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load sessions' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { subjectSlug, memoryContext, schoolChapterId } = createSchema.parse(body);


    const subject = await dbCall('sessions-subject-lookup', () => prisma.subject.findUnique({ where: { slug: subjectSlug } }));
    if (!subject) return NextResponse.json({ success: false, error: "Subject not found" }, { status: 404 });

    // Resume an existing ACTIVE session from within the last 24 hours instead of
    // creating a new one — this preserves the conversation across page refreshes.
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingSession = await dbCall('sessions-existing-lookup', () => prisma.learnSession.findFirst({
      where: {
        userId: session.user.id,
        subjectId: subject.id,
        status: "ACTIVE",
        startedAt: { gte: cutoff },
        // Only resume sessions that have at least one assistant message (i.e. the
        // lesson actually started — not a session that was created but never used).
        messages: { some: { role: "ASSISTANT" } },
      },
      orderBy: { startedAt: "desc" },
      include: {
        // Cap to the most-recent 30 messages — matches HISTORY_LIMIT in
        // /api/learn/chat. This is a fallback path only (used when the
        // /api/sessions/history call in LessonScreen fails). Loading every
        // message from a long-running session was the dominant cost here.
        messages: { orderBy: { createdAt: "desc" }, take: 30 },
      },
    }));

    if (existingSession) {
      // ── RESTORE THE FIGURE THAT WAS ON SCREEN ────────────────────────────
      //
      // The payload is never stored: it is delivered once inside the chat
      // response and lives in React state on that message, so a refresh used
      // to restore the words and drop the picture while the tutor was still
      // teaching against it.
      //
      // What IS stored is the figure's IDENTITY, in
      // contextSnapshot.visualSession, and resolveVisual is deterministic —
      // so this re-derives the payload through the same authority and the
      // same admission gate rather than caching or trusting anything. The
      // browser sends nothing and cannot ask for a concept: it receives the
      // result of the server re-running its own resolver.
      //
      // Never throws: a restore failure degrades to no figure, which is the
      // pre-existing behaviour.
      let restoredVisual:
        | { conceptId: string; sceneSpec?: unknown; visual?: string; visualSpec?: unknown }
        | null = null;
      try {
        const { restoreVisualSession, restoreRuntimeTopicSession } =
          await import('@/lib/teaching/visual/resolveVisual');
        const snapshot = existingSession.contextSnapshot as Record<string, unknown> | null;
        // A curriculum figure is RE-DERIVED (deterministic, no I/O). A figure of
        // a topic the curriculum does not contain cannot be — there is nothing
        // to derive from — so it is read back from the cache it was written to,
        // re-validated and re-checked against its stored verdict. Neither path
        // calls a model; a refresh must never cost a generation.
        const decision =
          restoreVisualSession(snapshot?.visualSession) ??
          (await restoreRuntimeTopicSession(snapshot?.visualSession));
        const payload = decision?.payload;
        if (payload && decision?.asset) {
          // One branch per renderer the payload union declares — the client
          // renders each through its own existing component, exactly as it
          // does for a live turn. An unhandled renderer restores nothing
          // rather than guessing a shape.
          const conceptId = decision.asset.conceptId;
          if (payload.renderer === 'scene') {
            restoredVisual = { conceptId, sceneSpec: payload.sceneSpec };
          } else if (payload.renderer === 'card') {
            restoredVisual = { conceptId, visual: payload.visualType };
          } else if (payload.renderer === 'spec') {
            restoredVisual = { conceptId, visualSpec: payload.visualSpec };
          }
        }
      } catch (err) {
        console.warn('[sessions] visual restore skipped:', err);
      }
      // PER-MESSAGE FIGURES, for the messages this resume returns.
      //
      // `restoredVisual` above is the SESSION's current figure — one slot,
      // and the client used to hang it off whichever message happened to be
      // last. This is the record of what each message actually showed, keyed
      // by message id, so nothing is attached by position. Same deterministic
      // authority, still 0 model calls and 0 generation calls.
      let messageVisuals: Record<string, unknown> = {};
      try {
        const { restoreMessageVisuals } = await import('@/lib/teaching/visual/messageVisuals');
        messageVisuals = await restoreMessageVisuals(existingSession.messages ?? []);
      } catch (err) {
        console.warn('[sessions] per-message visual restore skipped:', err);
      }
      return NextResponse.json(
        { success: true, data: existingSession, resumed: true, restoredVisual, messageVisuals },
        { status: 200 },
      );
    }

    // Close any stale ACTIVE sessions older than 24h (sendBeacon may not have fired
    // on mobile or after a crash). This prevents orphaned ACTIVE rows accumulating.
    // Best-effort (errors swallowed) but still timeout-bounded — an unguarded hang
    // here would block session creation even though failures are non-fatal.
    await dbCall('sessions-close-stale', () => prisma.learnSession.updateMany({
      where: {
        userId: session.user.id,
        subjectId: subject.id,
        status: "ACTIVE",
        startedAt: { lt: cutoff },
      },
      data: { status: "COMPLETED", endedAt: new Date() },
    })).catch(() => {});

    const [profile, activePath] = await dbCall('sessions-profile-path', () => Promise.all([
      prisma.profile.findUnique({ where: { userId: session.user.id } }),
      prisma.learningPath.findFirst({
        where: { userId: session.user.id, subjectId: subject.id, isActive: true },
        orderBy: { createdAt: "desc" },
      }),
    ]));

    const learnSession = await dbCall('sessions-create', () => prisma.learnSession.create({
      data: {
        userId: session.user.id,
        subjectId: subject.id,
        title: `${subject.name} — ${new Date().toLocaleDateString("ru-RU", { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
        contextSnapshot: {
          profileLevel: profile?.currentLevel,
          learningPathId: activePath?.id,
          currentStep: activePath?.currentStep,
          memoryContext: memoryContext ?? null,
          schoolChapterId: schoolChapterId ?? null,
        },
      },
    }));

    // Warm up Redis state (best-effort — Redis may not be running)
    const state: RedisSessionState = {
      userId: session.user.id,
      subjectId: subject.id,
      subjectSlug: subject.slug,
      learningPathId: activePath?.id,
      currentStep: activePath?.currentStep,
      messageCount: 0,
      lastActivity: new Date().toISOString(),
    };
    await Promise.allSettled([
      setSessionState(learnSession.id, state),
      setUserActiveSession(session.user.id, learnSession.id),
    ]);

    return NextResponse.json({ success: true, data: learnSession }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 });
    }
    console.error("[sessions/POST]", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
