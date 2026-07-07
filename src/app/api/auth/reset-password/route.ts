import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { checkRateLimit, rateLimitResponse, getClientIp } from '@/lib/rateLimit'
import { hashResetToken, isPasswordLengthValid } from '@/lib/auth/resetToken'

const TOKEN_IDENTIFIER_PREFIX = 'password-reset:'

export async function POST(req: NextRequest) {
  // Pre-auth endpoint — limit per IP to slow token brute-forcing (Sprint AQ).
  const { allowed } = await checkRateLimit(`rl:reset-password:${getClientIp(req)}`, 10, 900)
  if (!allowed) return rateLimitResponse()

  try {
    const { token, password } = await req.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }
    // MED-12: bcrypt silently truncates at 72 bytes; cap at 72 to make this explicit.
    if (!isPasswordLengthValid(password)) {
      return NextResponse.json({ error: 'Password must be between 8 and 72 characters' }, { status: 400 })
    }

    // MED-11: the DB stores the SHA-256 hash of the token; hash the incoming
    // raw token before lookup so a stolen DB snapshot cannot be used directly.
    const tokenHash = hashResetToken(token)
    const record = await prisma.verificationToken.findUnique({ where: { token: tokenHash } })

    if (!record || !record.identifier.startsWith(TOKEN_IDENTIFIER_PREFIX)) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }
    if (record.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token: tokenHash } })
      return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 })
    }

    const email = record.identifier.slice(TOKEN_IDENTIFIER_PREFIX.length)
    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.$transaction([
      prisma.user.update({ where: { email }, data: { passwordHash } }),
      prisma.verificationToken.delete({ where: { token: tokenHash } }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[reset-password]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
