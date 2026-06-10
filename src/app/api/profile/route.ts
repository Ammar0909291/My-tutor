import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

const profileSchema = z.object({
  displayName: z.string().min(2).max(80),
  selfDescription: z.string().min(20).max(2000),
  learningGoals: z.string().max(1000).optional(),
  subjectSlugs: z.array(z.string()).min(1).max(4),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { subjects: { include: { subject: true } } },
  });

  return NextResponse.json({ success: true, data: profile });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { displayName, selfDescription, learningGoals, subjectSlugs } = profileSchema.parse(body);

    const subjects = await prisma.subject.findMany({ where: { slug: { in: subjectSlugs } } });

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: { displayName, selfDescription, learningGoals },
      create: { userId: session.user.id, displayName, selfDescription, learningGoals },
    });

    // Sync subject associations
    await prisma.profileSubject.deleteMany({ where: { profileId: profile.id } });
    await prisma.profileSubject.createMany({
      data: subjects.map((s) => ({ profileId: profile.id, subjectId: s.id })),
    });

    return NextResponse.json({ success: true, data: profile });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 });
    }
    console.error("[profile]", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
