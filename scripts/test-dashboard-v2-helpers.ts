/**
 * Offline unit harness for the pure presentation helpers in
 * src/lib/dashboard/getDashboardV2Data.ts (exported as part of this task —
 * zero behavior change, same logic as before, just made testable). No DB,
 * no mocking — these are plain functions over plain inputs.
 *
 * Run with:  npx tsx scripts/test-dashboard-v2-helpers.ts
 */
import {
  getLevel,
  dayBucket,
  getISTDayBoundsUTC,
  timeOfDayGreeting,
  heroSubtitle,
  buildPracticeModes,
  buildSchoolSkillPath,
  buildLibrarySkillPath,
} from '../src/lib/dashboard/getDashboardV2Data'
import type { RoadmapChapter } from '../src/lib/school/roadmap/learningRoadmap'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── getLevel ──────────────────────────────────────────────────────────────
check('0 xp is Novice', getLevel(0).name === 'Novice')
check('100 xp is still Novice (boundary below 101)', getLevel(100).name === 'Novice')
check('101 xp is Student (boundary)', getLevel(101).name === 'Student')
check('300 xp is still Student (boundary below 301)', getLevel(300).name === 'Student')
check('301 xp is Practitioner (boundary)', getLevel(301).name === 'Practitioner')
check('601 xp is Expert (boundary)', getLevel(601).name === 'Expert')
check('1001 xp is Master (boundary), next=null', getLevel(1001).name === 'Master' && getLevel(1001).next === null)
check('Novice next-threshold is 101', getLevel(0).next === 101)

// ── dayBucket ─────────────────────────────────────────────────────────────
check('a timestamp from right now buckets as today', dayBucket(new Date()) === 'today')
check('a timestamp from 25 hours ago buckets as yesterday or earlier, not today',
  dayBucket(new Date(Date.now() - 25 * 60 * 60 * 1000)) !== 'today')
check('a timestamp from 10 days ago buckets as earlier',
  dayBucket(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)) === 'earlier')

// ── getISTDayBoundsUTC ────────────────────────────────────────────────────
{
  const { gte, lt } = getISTDayBoundsUTC()
  check('IST day bounds span exactly 24 hours', lt.getTime() - gte.getTime() === 24 * 60 * 60 * 1000)
  check('the lower bound is midnight in IST', new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hourCycle: 'h23' }).format(gte) === '00')
  check('now falls within [gte, lt)', (() => { const now = new Date(); return now >= gte && now < lt })())
}

// ── timeOfDayGreeting ─────────────────────────────────────────────────────
check('greeting includes the given name', timeOfDayGreeting('Asha').includes('Asha'))

// ── heroSubtitle ──────────────────────────────────────────────────────────
check('0-day streak prompts to start a streak', heroSubtitle(0) === "Let's start a streak today!")
check('1-day streak uses singular phrasing', heroSubtitle(1) === "You're on a 1-day streak. Keep it up!")
check('multi-day streak mentions the day count', heroSubtitle(7).includes('7-day streak'))

// ── buildPracticeModes ────────────────────────────────────────────────────
{
  const modes = buildPracticeModes('/learn?subject=algebra')
  check('practice modes includes tutor, quiz, and coach', modes.map((m) => m.id).join(',') === 'tutor,quiz,coach')
  check('tutor mode href uses the passed-in tutorHref', modes.find((m) => m.id === 'tutor')?.href === '/learn?subject=algebra')
}

// ── buildSchoolSkillPath ──────────────────────────────────────────────────
function chapter(id: string, order: number, status: RoadmapChapter['status'], title = `Chapter ${order}`): RoadmapChapter {
  return { id, order, title, status }
}

check('empty chapter list returns an empty skill path', buildSchoolSkillPath([], '⭐').length === 0)

{
  const chapters = [
    chapter('1', 1, 'completed'),
    chapter('2', 2, 'completed'),
    chapter('3', 3, 'current'),
    chapter('4', 4, 'upcoming'),
    chapter('5', 5, 'upcoming'),
  ]
  const path = buildSchoolSkillPath(chapters, '🔥')
  check('current chapter maps to "current" status', path.find((n) => n.id === '3')?.status === 'current')
  check('completed chapter maps to "done" status', path.find((n) => n.id === '1')?.status === 'done')
  check('upcoming chapter maps to "locked" status', path.find((n) => n.id === '4')?.status === 'locked')
  check('current chapter gets the active emoji', path.find((n) => n.id === '3')?.emoji === '🔥')
  check('upcoming chapter gets a lock emoji', path.find((n) => n.id === '4')?.emoji === '🔒')
}

{
  // No 'current' chapter at all (e.g. subject fully completed) → falls back to the last chapter as the window anchor
  const chapters = [chapter('1', 1, 'completed'), chapter('2', 2, 'completed')]
  const path = buildSchoolSkillPath(chapters, '⭐')
  check('with no current chapter, the window still includes the last chapter', path.some((n) => n.id === '2'))
}

// ── buildLibrarySkillPath ─────────────────────────────────────────────────
{
  const path = buildLibrarySkillPath({ currentLesson: 5, completedLessons: [1, 2, 3, 4] }, '🚀')
  check('library skill path centers on the current lesson', path.some((n) => n.id === 'lesson-5' && n.status === 'current'))
  check('lessons before current are marked done', path.find((n) => n.id === 'lesson-4')?.status === 'done')
  check('lessons after current are locked', path.some((n) => n.status === 'locked'))
}

check('undefined progress defaults to lesson 1 as current',
  buildLibrarySkillPath(undefined, '🚀').find((n) => n.id === 'lesson-1')?.status === 'current')

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
