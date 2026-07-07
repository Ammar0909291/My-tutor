/**
 * Offline unit harness for src/lib/school/schoolRouting.ts's pure helpers:
 * schoolSubjectCode, getSchoolChapters/isSchoolSubject (real static catalog
 * data, no mocking), getChapterPosition, groupChaptersByUnit,
 * chapterDisplayTitle. These are the building blocks behind chapter
 * progression and the School Mode subject/chapter UI.
 *
 * Run with:  npx tsx scripts/test-school-routing.ts
 */
import {
  schoolSubjectCode,
  getSchoolChapters,
  isSchoolSubject,
  getChapterPosition,
  groupChaptersByUnit,
  chapterDisplayTitle,
} from '../src/lib/school/schoolRouting'
import type { Chapter } from '../src/lib/education'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function chapter(id: string, order: number, title: string): Chapter {
  return { id, order, title, kgNodeIds: [] }
}

// ── schoolSubjectCode ─────────────────────────────────────────────────────
check('subject code is namespaced board:subject:grade',
  schoolSubjectCode('cbse', 'mathematics', 8) === 'cbse:mathematics:8')

// ── getSchoolChapters / isSchoolSubject (real static catalog data) ─────────
{
  const chapters = getSchoolChapters('cbse', 'mathematics', 8)
  check('CBSE grade-8 mathematics has chapters', chapters.length > 0)
  check('chapters come back sorted by order', chapters.every((c, i) => i === 0 || chapters[i - 1].order <= c.order))
}

check('mathematics is a CBSE school subject', isSchoolSubject('cbse', 'mathematics'))
check('a nonsense subject slug is not a school subject', !isSchoolSubject('cbse', 'underwater_basket_weaving'))

check('an unknown board/subject/grade combo returns an empty chapter list',
  getSchoolChapters('cbse', 'underwater_basket_weaving', 8).length === 0)

// ── getChapterPosition ───────────────────────────────────────────────────
check('empty chapter list returns null', getChapterPosition([], []) === null)

{
  const chapters = [chapter('1', 1, 'Ch1'), chapter('2', 2, 'Ch2'), chapter('3', 3, 'Ch3')]
  const pos = getChapterPosition(chapters, [])!
  check('no completions: current is the first chapter', pos.current.id === '1')
  check('no completions: previous is null', pos.previous === null)
  check('no completions: next is the second chapter', pos.next?.id === '2')
  check('no completions: completedCount is 0', pos.completedCount === 0)
  check('no completions: percent is 0', pos.percent === 0)
}

{
  const chapters = [chapter('1', 1, 'Ch1'), chapter('2', 2, 'Ch2'), chapter('3', 3, 'Ch3')]
  const pos = getChapterPosition(chapters, [1])!
  check('chapter 1 completed: current advances to chapter 2', pos.current.id === '2')
  check('chapter 1 completed: previous is chapter 1', pos.previous?.id === '1')
  check('chapter 1 completed: next is chapter 3', pos.next?.id === '3')
  check('chapter 1 completed: completedCount is 1', pos.completedCount === 1)
}

{
  const chapters = [chapter('1', 1, 'Ch1'), chapter('2', 2, 'Ch2'), chapter('3', 3, 'Ch3')]
  const pos = getChapterPosition(chapters, [1, 2, 3])!
  check('all completed: current stays on the last chapter', pos.current.id === '3')
  check('all completed: next is null', pos.next === null)
  check('all completed: percent is 100', pos.percent === 100)
}

// ── groupChaptersByUnit ───────────────────────────────────────────────────
{
  const chapters = [
    chapter('1', 1, '[Theme A] First'),
    chapter('2', 2, '[Theme A] Second'),
    chapter('3', 3, '[Theme B] Third'),
  ]
  const groups = groupChaptersByUnit(chapters)
  check('consecutive same-bracket-unit chapters merge into one group', groups.length === 2)
  check('first group is Theme A with 2 chapters', groups[0].unit === 'Theme A' && groups[0].chapters.length === 2)
  check('second group is Theme B with 1 chapter', groups[1].unit === 'Theme B' && groups[1].chapters.length === 1)
}

{
  const chapters = [chapter('1', 1, 'Romeo and Juliet — Act 1'), chapter('2', 2, 'Romeo and Juliet — Act 2')]
  const groups = groupChaptersByUnit(chapters)
  check('dash-style reader titles group under the text before the dash',
    groups.length === 1 && groups[0].unit === 'Romeo and Juliet')
}

{
  const chapters = [chapter('1', 1, 'Plain Chapter Title')]
  const groups = groupChaptersByUnit(chapters)
  check('untitled/unprefixed chapters fall back to the default "Chapters" unit',
    groups.length === 1 && groups[0].unit === 'Chapters')
}

{
  // Same unit appearing non-consecutively (interleaved) does NOT merge — it's a fresh group each time
  const chapters = [chapter('1', 1, '[Theme A] First'), chapter('2', 2, '[Theme B] Second'), chapter('3', 3, '[Theme A] Third')]
  const groups = groupChaptersByUnit(chapters)
  check('non-consecutive repeats of the same unit form separate groups', groups.length === 3)
}

// ── chapterDisplayTitle ───────────────────────────────────────────────────
check('strips a leading "[Theme]" prefix', chapterDisplayTitle('[Theme A] First Chapter') === 'First Chapter')
check('leaves a title with no bracket prefix unchanged', chapterDisplayTitle('Plain Chapter Title') === 'Plain Chapter Title')
check('leaves a dash-style reader title unchanged (only brackets are stripped)',
  chapterDisplayTitle('Romeo and Juliet — Act 1') === 'Romeo and Juliet — Act 1')

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
