/**
 * Offline unit harness for src/lib/school/achievements/streakEngine.ts's
 * pure IST date-boundary logic (istDateStr, istPrevDay, computeStreakTransition).
 * No DB needed — updateStudyStreak/getStudyStreak are thin DB wrappers around
 * computeStreakTransition, which is exercised directly here.
 *
 * Run with:  npx tsx scripts/test-streak-engine.ts
 */
import { istDateStr, istPrevDay, computeStreakTransition } from '../src/lib/school/achievements/streakEngine'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── istDateStr / istPrevDay (HIGH-7 IST boundary) ────────────────────────────
{
  // 23:45 IST on 2026-06-27 == 18:15 UTC on 2026-06-27
  const lateNightIST = new Date('2026-06-27T18:15:00.000Z')
  // 00:15 IST on 2026-06-28 == 18:45 UTC on 2026-06-27 (same UTC date!)
  const earlyMorningIST = new Date('2026-06-27T18:45:00.000Z')

  check('23:45 IST and 00:15-next-day IST land on the same UTC calendar date',
    lateNightIST.toISOString().slice(0, 10) === earlyMorningIST.toISOString().slice(0, 10))

  check('istDateStr correctly separates them into different IST days',
    istDateStr(lateNightIST) !== istDateStr(earlyMorningIST))

  check('istDateStr(lateNightIST) is 2026-06-27', istDateStr(lateNightIST) === '2026-06-27')
  check('istDateStr(earlyMorningIST) is 2026-06-28', istDateStr(earlyMorningIST) === '2026-06-28')
}

check('istPrevDay computes the prior calendar date', istPrevDay('2026-06-28') === '2026-06-27')
check('istPrevDay correctly crosses a month boundary', istPrevDay('2026-07-01') === '2026-06-30')
check('istPrevDay correctly crosses a year boundary', istPrevDay('2027-01-01') === '2026-12-31')

// ── computeStreakTransition: first record ────────────────────────────────────
{
  const result = computeStreakTransition(null, new Date('2026-06-28T10:00:00.000Z'))
  check('first-ever record: currentStreak=1', result.currentStreak === 1)
  check('first-ever record: longestStreak=1', result.longestStreak === 1)
  check('first-ever record: totalActiveDays=1', result.totalActiveDays === 1)
  check('first-ever record: isNewDay=true', result.isNewDay === true)
}

// ── computeStreakTransition: already active today (IST) → no-op ─────────────
{
  // lastActiveDate at 09:00 UTC == 14:30 IST same IST day as "now" at 18:00 UTC == 23:30 IST
  const existing = { currentStreak: 5, longestStreak: 9, totalActiveDays: 20, lastActiveDate: new Date('2026-06-28T09:00:00.000Z') }
  const now = new Date('2026-06-28T18:00:00.000Z')
  const result = computeStreakTransition(existing, now)
  check('same IST day: isNewDay=false', result.isNewDay === false)
  check('same IST day: streak unchanged', result.currentStreak === 5 && result.longestStreak === 9 && result.totalActiveDays === 20)
}

// ── computeStreakTransition: consecutive-day increment ───────────────────────
{
  // lastActiveDate yesterday IST, now is today IST
  const existing = { currentStreak: 5, longestStreak: 9, totalActiveDays: 20, lastActiveDate: new Date('2026-06-27T10:00:00.000Z') }
  const now = new Date('2026-06-28T10:00:00.000Z')
  const result = computeStreakTransition(existing, now)
  check('consecutive day: currentStreak increments', result.currentStreak === 6)
  check('consecutive day: longestStreak unchanged when below new streak', result.longestStreak === 9)
  check('consecutive day: totalActiveDays increments', result.totalActiveDays === 21)
  check('consecutive day: isNewDay=true', result.isNewDay === true)
}

// ── computeStreakTransition: consecutive day that beats the longest streak ──
{
  const existing = { currentStreak: 9, longestStreak: 9, totalActiveDays: 20, lastActiveDate: new Date('2026-06-27T10:00:00.000Z') }
  const now = new Date('2026-06-28T10:00:00.000Z')
  const result = computeStreakTransition(existing, now)
  check('new record streak: longestStreak tracks via Math.max', result.currentStreak === 10 && result.longestStreak === 10)
}

// ── computeStreakTransition: gap day resets to 1 ─────────────────────────────
{
  // lastActiveDate 2 days before now → not yesterday → reset
  const existing = { currentStreak: 5, longestStreak: 9, totalActiveDays: 20, lastActiveDate: new Date('2026-06-25T10:00:00.000Z') }
  const now = new Date('2026-06-28T10:00:00.000Z')
  const result = computeStreakTransition(existing, now)
  check('gap day: currentStreak resets to 1', result.currentStreak === 1)
  check('gap day: longestStreak preserved', result.longestStreak === 9)
  check('gap day: totalActiveDays still increments', result.totalActiveDays === 21)
  check('gap day: isNewDay=true', result.isNewDay === true)
}

// ── computeStreakTransition: IST boundary edge case across the no-op/increment line ──
{
  // existing lastActiveDate at 23:45 IST on 2026-06-27 (18:15 UTC)
  // now at 00:15 IST on 2026-06-28 (18:45 UTC same UTC date, but next IST day)
  const existing = { currentStreak: 3, longestStreak: 3, totalActiveDays: 10, lastActiveDate: new Date('2026-06-27T18:15:00.000Z') }
  const now = new Date('2026-06-27T18:45:00.000Z')
  const result = computeStreakTransition(existing, now)
  check('IST boundary: treated as the next IST day despite same UTC date, increments streak',
    result.isNewDay === true && result.currentStreak === 4)
}

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
