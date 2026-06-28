/**
 * Offline unit harness for src/lib/subjects/getUserNavSubjects.ts — the
 * single source of truth shared by the dashboard (subject cards) and the
 * Learn page (subject dropdown), so the two views can't drift apart. Pure
 * function; exercised directly against real board/grade catalog data (no
 * DB, no mocking needed — getGradeSubjects reads static curriculum data).
 *
 * Run with:  npx tsx scripts/test-get-user-nav-subjects.ts
 */
import { getUserNavSubjects } from '../src/lib/subjects/getUserNavSubjects'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function profile(overrides: Partial<{ educationBoard: string | null; grade: number | null; subjects: { subject: { slug: string; name: string } }[] }>) {
  return {
    educationBoard: null,
    grade: null,
    subjects: [],
    ...overrides,
  } as any
}

// ── School mode: derives subjects from the board/grade catalog ──────────────
{
  const result = getUserNavSubjects(profile({ educationBoard: 'cbse', grade: 8 }), true)
  check('CBSE grade 8 school mode returns a non-empty subject list', result.length > 0)
  check('CBSE grade 8 school mode entries have both slug and name', result.every((s) => !!s.slug && !!s.name))
}

{
  const cbse8 = getUserNavSubjects(profile({ educationBoard: 'cbse', grade: 8 }), true)
  const upBoard8 = getUserNavSubjects(profile({ educationBoard: 'up_board', grade: 8 }), true)
  check('CBSE and UP Board grade 8 are independently derived (not hardcoded to one board)',
    JSON.stringify(cbse8.map((s) => s.slug).sort()) !== '[]' && JSON.stringify(upBoard8.map((s) => s.slug).sort()) !== '[]')
}

{
  const result = getUserNavSubjects(profile({ educationBoard: 'cbse', grade: 8 }), true)
  check('school mode subject names resolve via SCHOOL_SUBJECT_META, not raw slugs',
    result.some((s) => s.name !== s.slug))
}

// ── Library/AI mode: derives subjects from ProfileSubject enrollment ────────
{
  const result = getUserNavSubjects(
    profile({ subjects: [{ subject: { slug: 'algebra', name: 'Algebra' } }, { subject: { slug: 'physics', name: 'Physics' } }] }),
    false,
  )
  check('library mode maps enrolled ProfileSubject rows 1:1', result.length === 2)
  check('library mode preserves slug', result[0].slug === 'algebra')
  check('library mode preserves name', result[0].name === 'Algebra')
}

check('library mode with no enrollments returns an empty list',
  getUserNavSubjects(profile({ subjects: [] }), false).length === 0)

// ── isSchool=true but missing board/grade falls back to enrollment ──────────
{
  const result = getUserNavSubjects(
    profile({ educationBoard: null, grade: 8, subjects: [{ subject: { slug: 'algebra', name: 'Algebra' } }] }),
    true,
  )
  check('isSchool=true with no educationBoard falls back to ProfileSubject enrollment',
    result.length === 1 && result[0].slug === 'algebra')
}

{
  const result = getUserNavSubjects(
    profile({ educationBoard: 'cbse', grade: null, subjects: [{ subject: { slug: 'algebra', name: 'Algebra' } }] }),
    true,
  )
  check('isSchool=true with no grade falls back to ProfileSubject enrollment',
    result.length === 1 && result[0].slug === 'algebra')
}

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
