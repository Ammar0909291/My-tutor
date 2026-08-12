import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * Supabase Security Advisor audit, 2026-08-12: public.lesson_attempts was
 * exposed with RLS disabled (created 20260802010000, after the 2026-07-26
 * RLS sweep, missed by process gap). Fixed by a version-controlled migration
 * rather than an ad-hoc production-only change, since `prisma migrate deploy`
 * already runs on every Production build (scripts/ci/vercel-build.sh).
 *
 * This test pins the migration's shape so a future edit can't silently
 * reintroduce a public/permissive policy "to make the warning go away" —
 * the exact anti-pattern the audit was asked to avoid.
 */
const MIGRATION_PATH = path.join(
  __dirname, '..', '..', 'prisma', 'migrations', '20260812120000_lesson_attempts_rls', 'migration.sql',
)

describe('lesson_attempts RLS migration', () => {
  const sql = fs.readFileSync(MIGRATION_PATH, 'utf8')

  it('enables Row Level Security on lesson_attempts', () => {
    expect(sql).toMatch(/ALTER TABLE\s+"lesson_attempts"\s+ENABLE ROW LEVEL SECURITY/i)
  })

  it('does not grant a permissive or public policy just to silence the advisor', () => {
    expect(sql).not.toMatch(/USING\s*\(\s*true\s*\)/i)
    expect(sql).not.toMatch(/WITH CHECK\s*\(\s*true\s*\)/i)
    expect(sql).not.toMatch(/TO\s+public/i)
    expect(sql).not.toMatch(/CREATE POLICY/i) // default-deny: no policy is the least-privilege choice here
  })

  it('does not disable RLS anywhere else in the same file', () => {
    expect(sql).not.toMatch(/DISABLE ROW LEVEL SECURITY/i)
  })
})
