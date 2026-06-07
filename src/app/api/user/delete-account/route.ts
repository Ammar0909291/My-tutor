import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, email: true, isDeleted: true } });
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    if (user.isDeleted) return NextResponse.json({ success: true });

    const renamedEmail = `deleted_${Date.now()}_${user.email}`;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        email: renamedEmail,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[user/delete-account]", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
