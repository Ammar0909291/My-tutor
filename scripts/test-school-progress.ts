/**
 * Offline unit harness for src/lib/school/schoolProgress.ts.
 *
 * Only deriveCompletedOrders is pure/deterministic — every other export
 * (getSchoolSubjectProgress, getSchoolProgressForSubjects,
 * getChapterProgressDetails) makes live prisma calls with no injectable
 * client param, so they're out of scope for an offline harness.
 *
 * Run with:  npx tsx scripts/test-school-progress.ts
 */
import { deriveCompletedOrders } from '../src/lib/school/schoolProgress'
import type { Chapter } from '@/lib/education'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function chapter(order: number, kgNodeIds: string[]): Chapter {
  return { id: `c${order}`, title: `Chapter ${order}`, order, kgNodeIds } as Chapter
}

async function run() {
  // ── Empty chapters array → returns explicit orders unchanged ───────────
  {
    const result = deriveCompletedOrders([], [1, 2], new Set())
    check('empty chapters → explicit orders preserved', result.size === 2 && result.has(1) && result.has(2))
  }

  // ── Empty explicit orders, no mastery → empty result ────────────────────
  {
    const chapters = [chapter(1, ['n1']), chapter(2, ['n2'])]
    const result = deriveCompletedOrders(chapters, [], new Set())
    check('no explicit orders, no mastery → empty set', result.size === 0)
  }

  // ── Single chapter, all KG nodes mastered → auto-completed ──────────────
  {
    const chapters = [chapter(1, ['n1', 'n2'])]
    const result = deriveCompletedOrders(chapters, [], new Set(['n1', 'n2']))
    check('fully mastered chapter → added to completed', result.has(1))
  }

  // ── Single chapter, partial mastery → not completed ─────────────────────
  {
    const chapters = [chapter(1, ['n1', 'n2'])]
    const result = deriveCompletedOrders(chapters, [], new Set(['n1']))
    check('partially mastered chapter → not added', !result.has(1))
  }

  // ── Chapter with empty kgNodeIds → never auto-completed ─────────────────
  {
    const chapters = [chapter(1, [])]
    const result = deriveCompletedOrders(chapters, [], new Set())
    check('empty kgNodeIds chapter → not auto-completed', !result.has(1))
  }

  // ── Chapter with empty kgNodeIds, but explicitly marked → still completed
  {
    const chapters = [chapter(1, [])]
    const result = deriveCompletedOrders(chapters, [1], new Set())
    check('empty kgNodeIds chapter, explicit mark → completed', result.has(1))
  }

  // ── Chapter already in explicitOrders → no duplicate processing issue ───
  {
    const chapters = [chapter(1, ['n1'])]
    const result = deriveCompletedOrders(chapters, [1], new Set())
    check('chapter already explicit → stays completed, set size 1', result.has(1) && result.size === 1)
  }

  // ── Mastered node ids also satisfy an already-explicit chapter (no-op) ──
  {
    const chapters = [chapter(1, ['n1'])]
    const result = deriveCompletedOrders(chapters, [1], new Set(['n1']))
    check('explicit + mastered overlap → still just one entry', result.size === 1 && result.has(1))
  }

  // ── Mixed chapters: one explicit, one mastered, one neither ─────────────
  {
    const chapters = [chapter(1, ['n1']), chapter(2, ['n2']), chapter(3, ['n3', 'n4'])]
    const result = deriveCompletedOrders(chapters, [1], new Set(['n2']))
    check('mixed: explicit ch1 completed', result.has(1))
    check('mixed: mastered ch2 completed', result.has(2))
    check('mixed: untouched ch3 not completed', !result.has(3))
    check('mixed: result size is exactly 2', result.size === 2)
  }

  // ── masteredNodeIds containing ids unrelated to any chapter → no effect ──
  {
    const chapters = [chapter(1, ['n1'])]
    const result = deriveCompletedOrders(chapters, [], new Set(['unrelated-id', 'another-unrelated']))
    check('unrelated mastered ids → no false completion', !result.has(1) && result.size === 0)
  }

  // ── Explicit order referencing a chapter not present in the list ────────
  {
    const chapters = [chapter(1, ['n1'])]
    const result = deriveCompletedOrders(chapters, [99], new Set())
    check('explicit order with no matching chapter → still kept (defensive merge)', result.has(99))
  }

  // ── Chapter requiring ALL nodes mastered — missing even one blocks it ────
  {
    const chapters = [chapter(1, ['n1', 'n2', 'n3'])]
    const result = deriveCompletedOrders(chapters, [], new Set(['n1', 'n2']))
    check('missing one of three nodes → chapter not completed', !result.has(1))
  }

  // ── Result is a genuine Set instance ─────────────────────────────────────
  {
    const result = deriveCompletedOrders([], [], new Set())
    check('return value is a Set instance', result instanceof Set)
  }

  // ── Does not mutate the input explicitOrders array ───────────────────────
  {
    const explicitOrders = [1, 2]
    const chapters = [chapter(3, ['n1'])]
    deriveCompletedOrders(chapters, explicitOrders, new Set(['n1']))
    check('input explicitOrders array left untouched', explicitOrders.length === 2 && explicitOrders[0] === 1 && explicitOrders[1] === 2)
  }

  // ── Duplicate values in explicitOrders collapse via Set semantics ───────
  {
    const result = deriveCompletedOrders([], [5, 5, 5], new Set())
    check('duplicate explicit orders collapse to one entry', result.size === 1 && result.has(5))
  }

  console.log(`\n=== ${passed} passed, ${failed} failed ===`)
  process.exit(failed ? 1 : 0)
}

run()
