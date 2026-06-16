import { NextRequest, NextResponse } from 'next/server'
import { randomBytes, createHash } from 'crypto'
import { prisma } from '@/lib/db/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import { checkRateLimit, rateLimitResponse, getClientIp } from '@/lib/rateLimit'

const TOKEN_IDENTIFIER_PREFIX = 'password-reset:'
const EXPIRY_MS = 60 * 60 * 1000 // 1 hour

// Must be a function — NextResponse bodies are single-use streams and cannot be shared across requests
function safeResponse() {
  return NextResponse.json({
    success: true,
    message: 'If that email exists, a link was sent',
  })
}

export async function POST(req: NextRequest) {
  // Pre-auth endpoint — limit per IP to stop email-bombing via reset requests
  // (Sprint AQ).
  const { allowed } = await checkRateLimit(`rl:forgot-password:${getClientIp(req)}`, 5, 900)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json().catch(() => ({}))
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const normalized = email.toLowerCase().trim()
    const user = await prisma.user.findUnique({ where: { email: normalized } })
    if (!user || !user.passwordHash) {
      return safeResponse()
    }

    // MED-11: generate raw token (sent to user via email), store only its
    // SHA-256 hash. A DB read gives the attacker the hash, not the raw token,
    // so active reset links cannot be used from a stolen DB snapshot.
    const rawToken = randomBytes(32).toString('hex')
    const tokenHash = createHash('sha256').update(rawToken).digest('hex')
    const identifier = `${TOKEN_IDENTIFIER_PREFIX}${normalized}`
    const expires = new Date(Date.now() + EXPIRY_MS)

    await prisma.verificationToken.deleteMany({ where: { identifier } })
    await prisma.verificationToken.create({
      data: { identifier, token: tokenHash, expires },
    })

    const result = await sendPasswordResetEmail(normalized, rawToken)
    if (!result.success) {
      console.error('[forgot-password] email send failed:', result.error ?? 'unknown')
    }

    return safeResponse()
  } catch (err) {
    console.error('[forgot-password] exception:', err instanceof Error ? err.message : 'unknown')
    return safeResponse()
  }
}
