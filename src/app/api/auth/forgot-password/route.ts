import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db/prisma'
import { sendPasswordResetEmail } from '@/lib/email'

const TOKEN_IDENTIFIER_PREFIX = 'password-reset:'
const EXPIRY_MS = 60 * 60 * 1000 // 1 hour

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const normalized = email.toLowerCase().trim()

    // Always return success to avoid leaking whether email exists
    const user = await prisma.user.findUnique({ where: { email: normalized } })
    if (!user || !user.passwordHash) {
      // Google-only account or non-existent — still return 200
      return NextResponse.json({ success: true })
    }

    const token = randomBytes(32).toString('hex')
    const identifier = `${TOKEN_IDENTIFIER_PREFIX}${normalized}`
    const expires = new Date(Date.now() + EXPIRY_MS)

    // Remove any existing reset token for this email
    await prisma.verificationToken.deleteMany({ where: { identifier } })

    await prisma.verificationToken.create({
      data: { identifier, token, expires },
    })

    await sendPasswordResetEmail(normalized, token)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[forgot-password]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
