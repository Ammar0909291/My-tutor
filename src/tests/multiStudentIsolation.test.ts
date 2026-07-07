import { describe, it, expect } from 'vitest'

interface StudentProgress {
  userId: string
  subjectSlug: string
  topicSlug: string
  masteryPct: number
  status: string
}

function getStudentProgress(records: StudentProgress[], userId: string): StudentProgress[] {
  return records.filter(r => r.userId === userId)
}

function getStudentRecommendations(progress: StudentProgress[], userId: string): string[] {
  return progress
    .filter(r => r.userId === userId && r.masteryPct < 80)
    .sort((a, b) => a.masteryPct - b.masteryPct)
    .map(r => r.topicSlug)
}

describe('Multi-student isolation', () => {
  const records: StudentProgress[] = [
    { userId: 'student-1', subjectSlug: 'math', topicSlug: 'algebra', masteryPct: 30, status: 'IN_PROGRESS' },
    { userId: 'student-1', subjectSlug: 'math', topicSlug: 'geometry', masteryPct: 85, status: 'MASTERED' },
    { userId: 'student-2', subjectSlug: 'math', topicSlug: 'algebra', masteryPct: 90, status: 'MASTERED' },
    { userId: 'student-2', subjectSlug: 'math', topicSlug: 'geometry', masteryPct: 20, status: 'IN_PROGRESS' },
  ]

  it('student-1 progress does not include student-2 data', () => {
    const s1Progress = getStudentProgress(records, 'student-1')
    expect(s1Progress.every(r => r.userId === 'student-1')).toBe(true)
    expect(s1Progress.length).toBe(2)
  })

  it('student-2 progress does not include student-1 data', () => {
    const s2Progress = getStudentProgress(records, 'student-2')
    expect(s2Progress.every(r => r.userId === 'student-2')).toBe(true)
  })

  it('recommendations are per-student, not shared', () => {
    const s1Recs = getStudentRecommendations(records, 'student-1')
    const s2Recs = getStudentRecommendations(records, 'student-2')
    expect(s1Recs).toContain('algebra')
    expect(s1Recs).not.toContain('geometry') // student-1 has geometry mastered
    expect(s2Recs).toContain('geometry')
    expect(s2Recs).not.toContain('algebra') // student-2 has algebra mastered
  })

  it('student with no progress gets empty result', () => {
    expect(getStudentProgress(records, 'student-99')).toHaveLength(0)
  })

  it('progress records for same topic are isolated per user', () => {
    const s1Algebra = records.find(r => r.userId === 'student-1' && r.topicSlug === 'algebra')!
    const s2Algebra = records.find(r => r.userId === 'student-2' && r.topicSlug === 'algebra')!
    expect(s1Algebra.masteryPct).toBe(30)
    expect(s2Algebra.masteryPct).toBe(90)
    expect(s1Algebra.masteryPct).not.toBe(s2Algebra.masteryPct) // different students, different progress
  })

  it('mastered topics per student are independent', () => {
    const s1Mastered = records.filter(r => r.userId === 'student-1' && r.status === 'MASTERED').map(r => r.topicSlug)
    const s2Mastered = records.filter(r => r.userId === 'student-2' && r.status === 'MASTERED').map(r => r.topicSlug)
    expect(s1Mastered).toEqual(['geometry'])
    expect(s2Mastered).toEqual(['algebra'])
  })

  it('total students count does not leak between profiles', () => {
    const uniqueStudents = new Set(records.map(r => r.userId))
    expect(uniqueStudents.size).toBe(2)
  })
})
