/**
 * REMAP STORED LESSON ORDER NUMBERS AFTER A KG INSERTION.
 *
 * WHY THIS EXISTS (measured 2026-10-03). For a KG-backed subject a lesson's
 * order number is its position in `graph.modules.flatMap(...)` — domains in
 * order of first appearance in graph.json, concepts in file order within each
 * domain (`/api/curriculum`, `groupIntoModules`). Two tables store those numbers:
 *
 *   student_progress.currentLesson / completedLessons
 *   lesson_bookmarks.lessonOrder
 *
 * Inserting a concept anywhere but the very end shifts every later lesson by one,
 * so a stored "21" would silently point at a different lesson. The coverage-
 * driven KG extension inserts concepts next to their prerequisites, so every
 * extension push that lands on main must be paired with this remap, run once.
 * (`activeLessonSlug` and lesson-attempt keys use slugs and need nothing.)
 *
 * WHAT IT DOES. Reads the OLD graph from git (`--from <ref>`, the commit the
 * production rows were written against) and the NEW graph from disk, derives
 * old order -> slug -> new order, and prints ONE SQL transaction that rewrites
 * both tables for the subject. It never connects to a database: the SQL is
 * reviewed and run separately, after owner approval, exactly once.
 *
 *   npx tsx scripts/physics/remap-lesson-orders.ts --from <ref> [--subject physics]
 *
 * The ordering is recomputed here from the raw graph files, and checked against
 * the runtime's own `getKnowledgeGraph()` on the new graph before any SQL is
 * printed — if the two disagree the script refuses.
 */
import { execFileSync } from 'child_process'
import { readFileSync } from 'fs'
import { getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'

const arg = (name: string, dflt?: string) => {
  const i = process.argv.indexOf(`--${name}`)
  return i >= 0 ? process.argv[i + 1] : dflt
}
const subject = arg('subject', 'physics')!
const from = arg('from')
const KG_DIR: Record<string, string> = { physics: 'docs/physics/kg/graph.json' }
const kgPath = KG_DIR[subject]
if (!from || !kgPath) {
  console.error('usage: --from <git-ref> [--subject physics]')
  process.exit(1)
}

/** Lesson order as /api/curriculum numbers it: domain of first appearance, then file order. */
export function lessonOrder(conceptIds: string[]): string[] {
  const byDomain = new Map<string, string[]>()
  for (const id of conceptIds) {
    const parts = id.split('.')
    const key = parts.slice(0, 2).join('.')
    if (!byDomain.has(key)) byDomain.set(key, [])
    byDomain.get(key)!.push(id)
  }
  return [...byDomain.values()].flat()
}

const ids = (json: string): string[] => JSON.parse(json).concepts.map((c: { id: string }) => c.id)
const oldOrder = lessonOrder(ids(execFileSync('git', ['show', `${from}:${kgPath}`], { encoding: 'utf8', maxBuffer: 64 << 20 })))
const newOrder = lessonOrder(ids(readFileSync(kgPath, 'utf8')))

const runtime = getKnowledgeGraph(subject)!.modules.flatMap((m) => m.nodes.map((n) => n.slug))
if (runtime.join('\n') !== newOrder.join('\n')) {
  console.error('REFUSING: the recomputed order disagrees with getKnowledgeGraph() on the new graph.')
  process.exit(2)
}

const newIndex = new Map(newOrder.map((s, i) => [s, i + 1]))
const pairs: Array<[number, number]> = []
const removed: string[] = []
oldOrder.forEach((slug, i) => {
  const n = newIndex.get(slug)
  if (n === undefined) removed.push(slug)
  else pairs.push([i + 1, n])
})
if (removed.length) {
  console.error(`REFUSING: ${removed.length} lesson(s) in the old graph are gone from the new one: ${removed.join(', ')}`)
  process.exit(3)
}
const moved = pairs.filter(([o, n]) => o !== n)
const added = newOrder.filter((s) => !oldOrder.includes(s))

console.error(`subject ${subject}: ${oldOrder.length} -> ${newOrder.length} lessons; ${added.length} added (${added.join(', ')}); ${moved.length} stored order numbers move.`)
if (!moved.length) {
  console.error('Nothing to remap.')
  process.exit(0)
}

const values = moved.map(([o, n]) => `(${o}, ${n})`).join(', ')
const map = (col: string) => `COALESCE((SELECT m.new_order FROM remap m WHERE m.old_order = ${col}), ${col})`
const sql = `-- Lesson-order remap for ${subject}: graph ${from} -> working tree (${oldOrder.length} -> ${newOrder.length} lessons).
-- Run ONCE, right after the deploy that ships the new graph. Not idempotent.
BEGIN;
CREATE TEMP TABLE remap (old_order int PRIMARY KEY, new_order int NOT NULL) ON COMMIT DROP;
INSERT INTO remap (old_order, new_order) VALUES ${values};
UPDATE student_progress sp SET
  "currentLesson" = ${map('sp."currentLesson"')},
  "completedLessons" = ARRAY(SELECT ${map('u.x')} FROM unnest(sp."completedLessons") WITH ORDINALITY AS u(x, i) ORDER BY u.i)
WHERE sp."subjectCode" = '${subject}';
-- Bookmarks are unique per (user, subject, order): park on negatives first so no row collides mid-update.
UPDATE lesson_bookmarks b SET "lessonOrder" = -${map('b."lessonOrder"')} WHERE b."subjectCode" = '${subject}';
UPDATE lesson_bookmarks b SET "lessonOrder" = -b."lessonOrder" WHERE b."subjectCode" = '${subject}' AND b."lessonOrder" < 0;
COMMIT;
`
process.stdout.write(sql)
