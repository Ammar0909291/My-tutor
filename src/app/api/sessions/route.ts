import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { setSessionState, setUserActiveSession } from "@/lib/redis/client";
import type { RedisSessionState } from "@/types";

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

  const sessions = await prisma.learnSession.findMany({
    where: { userId: session.user.id },
    orderBy: { startedAt: "desc" },
    take: 20,
    include: { subject: { select: { name: true, slug: true } }, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  return NextResponse.json({ success: true, data: sessions });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { subjectSlug, memoryContext, schoolChapterId } = createSchema.parse(body);


    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } });
    if (!subject) return NextResponse.json({ success: false, error: "Subject not found" }, { status: 404 });

    // Resume an existing ACTIVE session from within the last 24 hours instead of
    // creating a new one — this preserves the conversation across page refreshes.
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingSession = await prisma.learnSession.findFirst({
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
    });

    if (existingSession) {
      return NextResponse.json({ success: true, data: existingSession, resumed: true }, { status: 200 });
    }

    // Close any stale ACTIVE sessions older than 24h (sendBeacon may not have fired
    // on mobile or after a crash). This prevents orphaned ACTIVE rows accumulating.
    await prisma.learnSession.updateMany({
      where: {
        userId: session.user.id,
        subjectId: subject.id,
        status: "ACTIVE",
        startedAt: { lt: cutoff },
      },
      data: { status: "COMPLETED", endedAt: new Date() },
    }).catch(() => {}); // best-effort — never block session creation

    const [profile, activePath] = await Promise.all([
      prisma.profile.findUnique({ where: { userId: session.user.id } }),
      prisma.learningPath.findFirst({
        where: { userId: session.user.id, subjectId: subject.id, isActive: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const learnSession = await prisma.learnSession.create({
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
    });

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
