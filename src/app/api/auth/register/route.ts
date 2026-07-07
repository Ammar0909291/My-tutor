import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendWelcomeEmail } from "@/lib/email";
import { checkRateLimit, rateLimitResponse, getClientIp } from "@/lib/rateLimit";
import { registerSchema } from "@/lib/registerSchema";

export async function POST(req: Request) {
  // Pre-auth endpoint — limit per IP to stop registration spam (Sprint AQ).
  const { allowed } = await checkRateLimit(`rl:register:${getClientIp(req)}`, 5, 900);
  if (!allowed) return rateLimitResponse();

  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);
    const name = parsed.name
    // HIGH-2: canonical email — single identity per mailbox regardless of case.
    const email = parsed.email.trim().toLowerCase()
    const { password, referralCode } = parsed

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Generate unique referral code for new user
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase()

    // Resolve referrer if a code was passed
    let referrerId: string | null = null
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } })
      if (referrer) referrerId = referrer.id
    }

    const newUser = await prisma.user.create({
      data: {
        name, email, passwordHash,
        referralCode: newCode,
        referredBy: referrerId ?? undefined,
        freeSessionsExtra: referrerId ? 1 : 0,
      },
      select: { id: true, email: true, name: true },
    });

    // Create a free subscription record for the new user
    await prisma.subscription.create({ data: { userId: newUser.id } });

    // Send welcome email — non-blocking, never fails signup
    sendWelcomeEmail(newUser.email, newUser.name ?? 'there').catch(() => {})

    // Credit referrer +1 free session and create referral record
    if (referrerId) {
      await Promise.all([
        prisma.user.update({ where: { id: referrerId }, data: { freeSessionsExtra: { increment: 1 } } }),
        prisma.referral.create({
          data: { referrerId, referredId: newUser.id, code: referralCode!, used: true, usedAt: new Date() },
        }),
      ])
    }

    // LOW-2: return only email + name; internal id is not needed by the client.
    return NextResponse.json({ success: true, data: { email: newUser.email, name: newUser.name } }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 });
    }
    console.error("[register]", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
