import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { isAdminEmailMatch } from '@/lib/auth/email'

// ─── DB-role check ────────────────────────────────────────────────────────────

export async function isAdmin(userId?: string | null): Promise<boolean> {
  if (!userId) return false
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } })
    return user?.role === 'ADMIN'
  } catch {
    return false
  }
}

export async function requireAdmin(): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const ok = await isAdmin(session.user.id)
  if (!ok) throw new Error('Forbidden')
}

// ─── ADMIN_EMAILS bootstrap ───────────────────────────────────────────────────
// Used at registration/login to promote the first admin account from env config.
// Once a user is ADMIN in the DB, the env var is no longer needed for that user.

export function isAdminEmail(email: string): boolean {
  return isAdminEmailMatch(email, process.env.ADMIN_EMAILS ?? '')
}

// Promote a user to ADMIN if their email is in ADMIN_EMAILS. Call after login.
export async function maybeBootstrapAdmin(userId: string, email: string): Promise<void> {
  if (!isAdminEmail(email)) return
  try {
    await prisma.user.update({
      where: { id: userId, role: 'STUDENT' },
      data: { role: 'ADMIN' },
    })
  } catch {
    // User already ADMIN or update raced — no-op
  }
}
