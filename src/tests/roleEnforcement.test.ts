import { describe, it, expect } from 'vitest'
import { isAdminEmailMatch } from '@/lib/auth/email'

// NOTE: the Role type and canAccess*() functions below do NOT correspond to
// any current production code — investigated and confirmed via
// prisma/schema.prisma + a repo-wide search: the real PlatformRole enum is
// only STUDENT | ADMIN (src/lib/auth/admin.ts's isAdmin() checks
// `role === 'ADMIN'`), and the only other role enum, OrgMemberRole
// (OWNER | ADMIN | TEACHER | MEMBER), is unrelated and used for org
// membership, not page/route gating. SCHOOL_ADMIN, PLATFORM_ADMIN, and
// every canAccess*() function name below have zero references anywhere in
// src/app or src/lib. This block tests an aspirational/not-yet-built
// four-tier role model, not production behavior — left as-is (extracting
// or "fixing" it would mean implementing new authorization functionality,
// which is out of scope here) but documented so it isn't mistaken for
// replica-drift of something real.
type Role = 'STUDENT' | 'TEACHER' | 'SCHOOL_ADMIN' | 'PLATFORM_ADMIN'

function canAccessAdminDashboard(role: Role): boolean {
  return role === 'PLATFORM_ADMIN'
}

function canAccessSchoolDashboard(role: Role): boolean {
  return role === 'SCHOOL_ADMIN' || role === 'PLATFORM_ADMIN'
}

function canAccessEducatorAnalytics(role: Role): boolean {
  return role === 'TEACHER' || role === 'SCHOOL_ADMIN' || role === 'PLATFORM_ADMIN'
}

function canAccessStudentData(role: Role, requestingUserId: string, targetUserId: string): boolean {
  if (role === 'PLATFORM_ADMIN' || role === 'SCHOOL_ADMIN' || role === 'TEACHER') return true
  return requestingUserId === targetUserId // students can only access own data
}

describe('Role enforcement', () => {
  it('student cannot access admin dashboard', () => {
    expect(canAccessAdminDashboard('STUDENT')).toBe(false)
  })

  it('teacher cannot access admin dashboard', () => {
    expect(canAccessAdminDashboard('TEACHER')).toBe(false)
  })

  it('school admin cannot access platform admin dashboard', () => {
    expect(canAccessAdminDashboard('SCHOOL_ADMIN')).toBe(false)
  })

  it('platform admin can access admin dashboard', () => {
    expect(canAccessAdminDashboard('PLATFORM_ADMIN')).toBe(true)
  })

  it('school admin can access school dashboard', () => {
    expect(canAccessSchoolDashboard('SCHOOL_ADMIN')).toBe(true)
  })

  it('student cannot access school dashboard', () => {
    expect(canAccessSchoolDashboard('STUDENT')).toBe(false)
  })

  it('teacher can access educator analytics', () => {
    expect(canAccessEducatorAnalytics('TEACHER')).toBe(true)
  })

  it('student cannot access educator analytics', () => {
    expect(canAccessEducatorAnalytics('STUDENT')).toBe(false)
  })

  it('student can only access own data', () => {
    expect(canAccessStudentData('STUDENT', 'user-1', 'user-1')).toBe(true)
    expect(canAccessStudentData('STUDENT', 'user-1', 'user-2')).toBe(false)
  })

  it('teacher can access any student data', () => {
    expect(canAccessStudentData('TEACHER', 'teacher-1', 'student-99')).toBe(true)
  })

  it('admin email matching is case-insensitive', () => {
    expect(isAdminEmailMatch('Admin@Test.Com', 'admin@test.com,other@test.com')).toBe(true)
  })

  it('non-admin email not in list → false', () => {
    expect(isAdminEmailMatch('user@test.com', 'admin@test.com')).toBe(false)
  })

  it('empty admin emails list → no one is admin', () => {
    expect(isAdminEmailMatch('admin@test.com', '')).toBe(false)
  })
})
