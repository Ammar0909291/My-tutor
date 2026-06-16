/**
 * HIGH-7: IST streak engine — day boundary correctness.
 * Tests the pure date-helper behaviour by directly controlling Date.now().
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── inline the two pure helpers from streakEngine (they're module-private) ──
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000

function istDateStr(date: Date): string {
  return new Date(date.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10)
}

function istPrevDay(istDay: string): string {
  const d = new Date(istDay + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

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
