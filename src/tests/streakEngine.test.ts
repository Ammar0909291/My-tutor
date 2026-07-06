/**
 * HIGH-7: IST streak engine — day boundary correctness.
 * Tests the real exported pure functions from streakEngine.ts directly
 * (istDateStr, istPrevDay, computeStreakTransition) rather than a
 * hand-copied replica, so a change to the real IST math cannot silently
 * diverge from what this suite asserts.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { istDateStr, istPrevDay, computeStreakTransition } from '@/lib/school/achievements/streakEngine'

describe('IST date helpers (HIGH-7)', () => {
  it('23:59 IST maps to the correct IST date, not the next UTC date', () => {
    // 23:59 IST = 18:29 UTC (same calendar day in IST, would be next day if UTC+0 rolled over)
    const istNight = new Date('2026-06-16T18:29:00.000Z') // 23:59 IST on Jun 16
    expect(istDateStr(istNight)).toBe('2026-06-16')
  })

  it('00:01 IST maps to the NEW IST date, not the previous UTC date', () => {
    // 00:01 IST on Jun 17 = 18:31 UTC on Jun 16
    const istMidnightPlus1 = new Date('2026-06-16T18:31:00.000Z')
    expect(istDateStr(istMidnightPlus1)).toBe('2026-06-17')
  })

  it('istPrevDay returns the day before', () => {
    expect(istPrevDay('2026-06-17')).toBe('2026-06-16')
    expect(istPrevDay('2026-01-01')).toBe('2025-12-31')
  })

  it('UTC midnight (00:00 UTC) is 05:30 IST — same IST day', () => {
    const utcMidnight = new Date('2026-06-17T00:00:00.000Z') // 05:30 IST Jun 17
    expect(istDateStr(utcMidnight)).toBe('2026-06-17')
  })

  it('18:29 UTC is 23:59 IST — same IST day as 18:30 UTC', () => {
    const before = new Date('2026-06-16T18:29:00.000Z') // 23:59 IST
    const after  = new Date('2026-06-16T18:31:00.000Z') // 00:01 IST next day
    expect(istDateStr(before)).toBe('2026-06-16')
    expect(istDateStr(after)).toBe('2026-06-17')
  })

  it('two IST dates differ when UTC date is the same but IST crossed midnight', () => {
    const beforeMidnightIST = new Date('2026-06-16T18:29:00Z') // 23:59 IST Jun 16
    const afterMidnightIST  = new Date('2026-06-16T18:31:00Z') // 00:01 IST Jun 17
    expect(istDateStr(beforeMidnightIST)).not.toBe(istDateStr(afterMidnightIST))
  })
})

describe('computeStreakTransition (pure decision logic, HIGH-7)', () => {
  it('first ever record starts a streak of 1', () => {
    const now = new Date('2026-06-17T10:00:00Z')
    const result = computeStreakTransition(null, now)
    expect(result).toEqual({ currentStreak: 1, longestStreak: 1, totalActiveDays: 1, isNewDay: true })
  })

  it('consecutive IST day extends the streak and bumps longestStreak', () => {
    const now = new Date('2026-06-16T19:00:00Z') // 00:30 IST Jun 17
    const existing = {
      currentStreak: 3,
      longestStreak: 5,
      totalActiveDays: 10,
      lastActiveDate: new Date('2026-06-15T18:30:00Z'), // 00:00 IST Jun 16 — yesterday
    }
    const result = computeStreakTransition(existing, now)
    expect(result).toEqual({ currentStreak: 4, longestStreak: 5, totalActiveDays: 11, isNewDay: true })
  })

  it('a new streak can overtake the previous longestStreak', () => {
    const now = new Date('2026-06-16T19:00:00Z')
    const existing = {
      currentStreak: 5,
      longestStreak: 5,
      totalActiveDays: 20,
      lastActiveDate: new Date('2026-06-15T18:30:00Z'),
    }
    const result = computeStreakTransition(existing, now)
    expect(result.currentStreak).toBe(6)
    expect(result.longestStreak).toBe(6)
  })

  it('already recorded today (IST) is a no-op — isNewDay false, counts unchanged', () => {
    const now = new Date('2026-06-16T19:00:00Z') // 00:30 IST Jun 17
    const existing = {
      currentStreak: 5,
      longestStreak: 5,
      totalActiveDays: 20,
      lastActiveDate: new Date('2026-06-16T18:40:00Z'), // 00:10 IST Jun 17 — same IST day
    }
    const result = computeStreakTransition(existing, now)
    expect(result).toEqual({ currentStreak: 5, longestStreak: 5, totalActiveDays: 20, isNewDay: false })
  })

  it('a missed IST day resets the streak to 1 but preserves longestStreak', () => {
    const now = new Date('2026-06-17T19:00:00Z') // IST Jun 18
    const existing = {
      currentStreak: 7,
      longestStreak: 10,
      totalActiveDays: 30,
      lastActiveDate: new Date('2026-06-15T18:30:00Z'), // IST Jun 16 — two days ago, gap
    }
    const result = computeStreakTransition(existing, now)
    expect(result.currentStreak).toBe(1)
    expect(result.longestStreak).toBe(10)
    expect(result.isNewDay).toBe(true)
  })
})

describe('updateStudyStreak with mocked prisma (HIGH-7)', () => {
  beforeEach(() => { vi.resetModules() })

  it('counts consecutive IST days as a streak', async () => {
    // yesterday IST = 18:30 UTC yesterday
    const yesterdayUtc = new Date('2026-06-15T18:30:00Z') // 00:00 IST Jun 16

    vi.doMock('@/lib/db/prisma', () => ({
      prisma: {
        studyStreak: {
          findUnique: vi.fn().mockResolvedValue({
            userId: 'u1',
            currentStreak: 3,
            longestStreak: 5,
            totalActiveDays: 10,
            lastActiveDate: yesterdayUtc,
          }),
          update: vi.fn().mockResolvedValue({}),
        },
      },
    }))

    // Pin "now" to 2026-06-16T19:00:00Z = 00:30 IST Jun 17 (next IST day)
    vi.setSystemTime(new Date('2026-06-16T19:00:00Z'))
    const { updateStudyStreak } = await import('@/lib/school/achievements/streakEngine')
    const result = await updateStudyStreak('u1')
    expect(result.currentStreak).toBe(4)
    expect(result.isNewDay).toBe(true)
    vi.useRealTimers()
  })

  it('does NOT extend streak when same IST day is already recorded', async () => {
    const sameIstDay = new Date('2026-06-16T18:40:00Z') // 00:10 IST Jun 17

    vi.doMock('@/lib/db/prisma', () => ({
      prisma: {
        studyStreak: {
          findUnique: vi.fn().mockResolvedValue({
            userId: 'u1',
            currentStreak: 5,
            longestStreak: 5,
            totalActiveDays: 20,
            lastActiveDate: sameIstDay,
          }),
          update: vi.fn().mockResolvedValue({}),
        },
      },
    }))

    vi.setSystemTime(new Date('2026-06-16T19:00:00Z')) // also IST Jun 17
    const { updateStudyStreak } = await import('@/lib/school/achievements/streakEngine')
    const result = await updateStudyStreak('u1')
    expect(result.isNewDay).toBe(false)
    expect(result.currentStreak).toBe(5)
    vi.useRealTimers()
  })
})
