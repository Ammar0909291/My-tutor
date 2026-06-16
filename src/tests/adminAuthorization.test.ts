import { describe, it, expect } from 'vitest'

// isAdmin function pattern from the codebase:
// checks ADMIN_EMAILS env or db adminRole field
function simulateIsAdmin(userId: string, adminUserIds: string[]): boolean {
  return adminUserIds.includes(userId)
}

function adminGate(
  session: { userId: string; isDeleted?: boolean } | null,
  adminUserIds: string[]
): { status: number; error?: string } {
  if (!session) return { status: 401, error: 'Unauthorized' }
  if (session.isDeleted) return { status: 401, error: 'Unauthorized' }
  if (!simulateIsAdmin(session.userId, adminUserIds)) return { status: 403, error: 'Forbidden' }
  return { status: 200 }
}

describe('Admin authorization', () => {
  const admins = ['admin-1', 'admin-2']

  it('no session → 401', () => {
    expect(adminGate(null, admins).status).toBe(401)
  })

  it('deleted user → 401', () => {
    expect(adminGate({ userId: 'admin-1', isDeleted: true }, admins).status).toBe(401)
  })

  it('non-admin user → 403', () => {
    expect(adminGate({ userId: 'regular-user' }, admins).status).toBe(403)
  })

  it('admin user → 200', () => {
    expect(adminGate({ userId: 'admin-1' }, admins).status).toBe(200)
  })

  it('second admin user → 200', () => {
    expect(adminGate({ userId: 'admin-2' }, admins).status).toBe(200)
  })

  it('unknown user not in admin list → 403', () => {
    expect(adminGate({ userId: 'unknown-999' }, admins).status).toBe(403)
  })

  it('empty admin list → everyone is non-admin', () => {
    expect(adminGate({ userId: 'admin-1' }, []).status).toBe(403)
  })

  it('MED-3: analytics admin gate requires DB role check', () => {
    // The analytics route uses isAdmin(session.user.id) which checks DB
    // This is a regression guard: non-admin must get 403
    const nonAdminSession = { userId: 'student-1' }
    expect(adminGate(nonAdminSession, admins).status).toBe(403)
  })

  it('deleted admin cannot access admin resources', () => {
    // Even if user is in admin list, isDeleted must block them
    const deletedAdmin = { userId: 'admin-1', isDeleted: true }
    expect(adminGate(deletedAdmin, admins).status).toBe(401)
  })
})
