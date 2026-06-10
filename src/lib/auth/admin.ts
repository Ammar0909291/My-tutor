import { auth } from '@/lib/auth'

export async function requireAdmin(): Promise<void> {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
}

export async function isAdmin(userId: string): Promise<boolean> {
  void userId
  return false
}

export function isAdminEmail(email: string): boolean {
  void email
  return false
}
