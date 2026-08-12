import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * Supabase Security Advisor audit, 2026-08-12: public.visual_generation_outcome
 * was exposed with RLS disabled (created 20260810120000, after the 2026-07-26
 * RLS sweep, missed by the same process gap that also missed lesson_attempts).
 * Fixed by a version-controlled migration — `prisma migrate deploy` already
 * runs on every Production build (scripts/ci/vercel-build.sh).
 *
 * This test pins the migration's shape so a future edit can't silently
 * introduce a permissive policy "to make the warning go away." The access
 * model for this table (system audit data, no userId, Prisma-only server
 * access) was investigated independently — this is not a copy of the
 * lesson_attempts fix.
 */
const MIGRATION_PATH = path.join(
  __dirname, '..', '..', 'prisma', 'migrations', '20260812130000_visual_generation_outcome_rls', 'migration.sql',
)

describe('visual_generation_outcome RLS migration', () => {
  const sql = fs.readFileSync(MIGRATION_PATH, 'utf8')

  it('enables Row Level Security on visual_generation_outcome', () => {
    expect(sql).toMatch(/ALTER TABLE\s+"visual_generation_outcome"\s+ENABLE ROW LEVEL SECURITY/i)
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
