import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { withRetry } from "@/lib/db/withRetry";
import { setSessionState, setUserActiveSession } from "@/lib/redis/client";
import type { RedisSessionState } from "@/types";

const createSchema = z.object({ subjectSlug: z.string(), memoryContext: z.string().optional(), userId: z.string().optional() });

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });


  const sessions = await withRetry(() => prisma.learnSession.findMany({
    where: { userId: session.user.id },
    orderBy: { startedAt: "desc" },
    take: 20,
    include: { subject: { select: { name: true, slug: true } }, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
  }));

  return NextResponse.json({ success: true, data: sessions });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subjectSlug, memoryContext, userId: bodyUserId } = createSchema.parse(body);

    // Prefer userId from body; fall back to server session
    let userId = bodyUserId
    if (!userId) {
      const session = await auth()
      userId = session?.user?.id
    }
    if (!userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    // No lesson limits — all users have full access
    const subject = await withRetry(() => prisma.subject.findUnique({ where: { slug: subjectSlug } }));
    if (!subject) return NextResponse.json({ success: false, error: "Subject not found" }, { status: 404 });

    const [profile, activePath] = await Promise.all([
      withRetry(() => prisma.profile.findUnique({ where: { userId: userId! } })),
      withRetry(() => prisma.learningPath.findFirst({
        where: { userId: userId!, subjectId: subject.id, isActive: true },
        orderBy: { createdAt: "desc" },
      })),
    ]);

    // Ensure user row exists — handles stale JWT after DB reset
    await withRetry(() => prisma.user.upsert({
      where: { id: userId! },
      update: {},
      create: { id: userId!, email: `${userId}@mytutor.local`, name: 'Student' },
    }))

    const learnSession = await withRetry(() => prisma.learnSession.create({
      data: {
        userId: userId!,
        subjectId: subject.id,
        title: `${subject.name} — ${new Date().toLocaleDateString("ru-RU", { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
        contextSnapshot: {
          profileLevel: profile?.currentLevel,
          learningPathId: activePath?.id,
          currentStep: activePath?.currentStep,
          memoryContext: memoryContext ?? null,
        },
      },
    }));

    // Warm up Redis state (best-effort — Redis may not be running)
    const state: RedisSessionState = {
      userId,
      subjectId: subject.id,
      subjectSlug: subject.slug,
      learningPathId: activePath?.id,
      currentStep: activePath?.currentStep,
      messageCount: 0,
      lastActivity: new Date().toISOString(),
    };
    await Promise.allSettled([
      setSessionState(learnSession.id, state),
      setUserActiveSession(userId, learnSession.id),
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
