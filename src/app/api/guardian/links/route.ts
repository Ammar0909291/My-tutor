import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

/**
 * Sprint G, Part 3/4 — Guardian links (parent/teacher ↔ student).
 * A student creates a short invite code; a parent or teacher redeems it
 * (POST /api/guardian/redeem) to form an ACTIVE, read-only link. Students can
 * revoke at any time. This is the ONLY write surface guardians touch — they
 * never get access to edit learning data, only to view aggregated reports.
 */
function generateInviteCode(): string {
  // 8-char, human-friendly (no ambiguous chars)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  const bytes = crypto.randomBytes(8)
  for (let i = 0; i < 8; i++) code += alphabet[bytes[i] % alphabet.length]
  return code
}

const createSchema = z.object({ relationship: z.enum(['PARENT', 'TEACHER']) })

/** GET — list links in both directions: guardians I've granted access to, and students who've granted me access. */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  try {
    const [asStudent, asGuardian] = await Promise.all([
      withRetry(() => prisma.guardianLink.findMany({
        where: { studentId: userId },
        orderBy: { createdAt: 'desc' },
        include: { guardian: { select: { name: true, email: true } } },
      })),
      withRetry(() => prisma.guardianLink.findMany({
        where: { guardianId: userId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        include: { student: { select: { id: true, name: true, email: true } } },
      })),
    ])

    return NextResponse.json({
      asStudent: asStudent.map((l) => ({
        id: l.id,
        relationship: l.relationship,
        status: l.status,
        inviteCode: l.status === 'PENDING' ? l.inviteCode : null,
        guardian: l.guardian ? { name: l.guardian.name, email: l.guardian.email } : null,
        createdAt: l.createdAt,
      })),
      asGuardian: asGuardian.map((l) => ({
        id: l.id,
        relationship: l.relationship,
        student: { id: l.student.id, name: l.student.name, email: l.student.email },
        since: l.updatedAt,
      })),
    })
  } catch (err) {
    console.error('[guardian/links GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/** POST — student generates an invite code for a parent or teacher to redeem. */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body
  try {
    body = createSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  let inviteCode = generateInviteCode()
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await withRetry(() => prisma.guardianLink.findUnique({ where: { inviteCode } }))
    if (!existing) break
    inviteCode = generateInviteCode()
  }

  const link = await withRetry(() => prisma.guardianLink.create({
    data: { studentId: session.user.id, relationship: body.relationship, inviteCode, status: 'PENDING' },
  }))

  return NextResponse.json({ id: link.id, inviteCode: link.inviteCode, relationship: link.relationship })
}

const patchSchema = z.object({ id: z.string(), action: z.literal('revoke') })

/** PATCH — student revokes a guardian's access (their own link only). */
export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body
  try {
    body = patchSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const result = await withRetry(() => prisma.guardianLink.updateMany({
    where: { id: body.id, studentId: session.user.id },
    data: { status: 'REVOKED', guardianId: null },
  }))
  if (result.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
