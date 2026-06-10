import { auth } from '@/lib/auth'

/**
 * Returns true if the email is in the ADMIN_EMAILS environment variable.
 * ADMIN_EMAILS is a comma-separated list of admin email addresses.
 * Example: ADMIN_EMAILS=alice@example.com,bob@example.com
 */
export function isAdminEmail(email: string): boolean {
  const raw = process.env.ADMIN_EMAILS ?? ''
  if (!raw.trim()) return false
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase())
}

export async function requireAdmin(): Promise<void> {
  const session = await auth()
  if (!session?.user?.email) throw new Error('Unauthorized')
  if (!isAdminEmail(session.user.email)) throw new Error('Forbidden')
}

export async function isAdmin(userId: string): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.email || session.user.id !== userId) return false
  return isAdminEmail(session.user.email)
}
