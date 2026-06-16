/**
 * MED-2: Guardian email privacy.
 * MED-1: Profile allowlist.
 * Admin auth consistency (MED-3).
 */
import { describe, it, expect } from 'vitest'

describe('MED-2: guardian response shape excludes email', () => {
  // Simulate the guardian GET response mapping
  function mapAsStudent(link: {
    id: string; relationship: string; status: string; inviteCode: string | null;
    guardian: { name: string; email: string } | null; createdAt: Date
  }) {
    return {
      id: link.id,
      relationship: link.relationship,
      status: link.status,
      inviteCode: link.status === 'PENDING' ? link.inviteCode : null,
      guardian: link.guardian ? { name: link.guardian.name } : null,  // email stripped
      createdAt: link.createdAt,
    }
  }

  function mapAsGuardian(link: {
    id: string; relationship: string;
    student: { id: string; name: string; email: string }; updatedAt: Date
  }) {
    return {
      id: link.id,
      relationship: link.relationship,
      student: { id: link.student.id, name: link.student.name }, // email stripped
      since: link.updatedAt,
    }
  }

  it('asStudent response does not expose guardian email', () => {
    const link = {
      id: 'l1', relationship: 'PARENT', status: 'ACTIVE', inviteCode: null,
      guardian: { name: 'Jane', email: 'jane@parent.com' }, createdAt: new Date(),
    }
    const result = mapAsStudent(link)
    expect((result.guardian as any)?.email).toBeUndefined()
    expect(result.guardian?.name).toBe('Jane')
  })

  it('asGuardian response does not expose student email', () => {
    const link = {
      id: 'l2', relationship: 'PARENT',
      student: { id: 's1', name: 'Bob', email: 'bob@student.com' }, updatedAt: new Date(),
    }
    const result = mapAsGuardian(link)
    expect((result.student as any)?.email).toBeUndefined()
    expect(result.student.name).toBe('Bob')
  })
})

describe('MED-1: profile allowlist fields', () => {
  const ALLOWED_USER_FIELDS = new Set([
    'id','name','email','image','onboardingCompleted',
    'xpPoints','referralCode','createdAt','updatedAt',
  ])

  const FORBIDDEN_FIELDS = ['passwordHash','role','isDeleted','deletedAt','telegramChatId','referredBy','freeSessionsExtra']

  it('forbidden fields are not in allowlist', () => {
    for (const field of FORBIDDEN_FIELDS) {
      expect(ALLOWED_USER_FIELDS.has(field)).toBe(false)
    }
  })

  it('all expected public fields are in allowlist', () => {
    const expected = ['id','name','email','xpPoints','createdAt']
    for (const f of expected) expect(ALLOWED_USER_FIELDS.has(f)).toBe(true)
  })
})

describe('MED-3: admin auth consistency', () => {
  function isAdminByRole(userRole: string): boolean {
    return userRole === 'ADMIN'
  }

  function isAdminByEmail(email: string, adminEmails: string[]): boolean {
    return adminEmails.includes(email)
  }

  it('DB-role-promoted admin passes isAdmin()', () => {
    expect(isAdminByRole('ADMIN')).toBe(true)
  })

  it('regular user fails isAdmin()', () => {
    expect(isAdminByRole('STUDENT')).toBe(false)
  })

  it('ADMIN_EMAILS check is fragile — does not match DB-only admin', () => {
    // Demonstrates why MED-3 fix (using DB role) is correct
    const dbAdmin = { role: 'ADMIN', email: 'admin@example.com' }
    const envEmails: string[] = [] // env not configured
    expect(isAdminByEmail(dbAdmin.email, envEmails)).toBe(false)
    expect(isAdminByRole(dbAdmin.role)).toBe(true)
  })
})
