import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db/prisma'
import { sendPasswordResetEmail } from '@/lib/email'

const TOKEN_IDENTIFIER_PREFIX = 'password-reset:'
const EXPIRY_MS = 60 * 60 * 1000 // 1 hour

const SAFE_RESPONSE = NextResponse.json({
  success: true,
  message: "If that email exists, a link was sent",
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const normalized = email.toLowerCase().trim()

    const user = await prisma.user.findUnique({ where: { email: normalized } })
    if (!user || !user.passwordHash) {
      // Don't reveal whether the email exists
      return SAFE_RESPONSE
    }

    const token = randomBytes(32).toString('hex')
    const identifier = `${TOKEN_IDENTIFIER_PREFIX}${normalized}`
    const expires = new Date(Date.now() + EXPIRY_MS)

    await prisma.verificationToken.deleteMany({ where: { identifier } })
    await prisma.verificationToken.create({
      data: { identifier, token, expires },
    })

    const result = await sendPasswordResetEmail(normalized, token)
    if (!result.success) {
      // SMTP not configured — still return success so the page shows the confirmation state.
      // The reset link is logged to console for local dev.
      return SAFE_RESPONSE
    }

    return SAFE_RESPONSE
  } catch (err) {
    console.error('[forgot-password]', err)
    return SAFE_RESPONSE
  }
}
