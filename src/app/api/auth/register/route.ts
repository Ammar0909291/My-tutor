import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { checkRateLimit, rateLimitResponse, requestIp } from "@/lib/rateLimit";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  // DEF-EJ-01: cap at 72 — bcrypt silently truncates beyond 72 bytes.
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  try {
    // DEF-EJ-10: throttle signups per IP (10/hour) to curb automated abuse.
    const ip = requestIp(req);
    const { allowed } = await checkRateLimit(`rl:register:ip:${ip}`, 10, 3600);
    if (!allowed) return rateLimitResponse();

    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, email: true, name: true },
    });

    // Create a free subscription record for the new user
    await prisma.subscription.create({ data: { userId: user.id } });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 });
    }
    console.error("[register]", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
