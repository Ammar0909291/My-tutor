import { describe, it, expect } from 'vitest'

// Tests for AI output schema enforcement and educational consistency.
// All tests use mock AI responses — no real provider calls.

// ── Curriculum schema validation (MED-9) ─────────────────────────────────────
interface Curriculum { steps: unknown[] }

function validateCurriculum(raw: unknown): Curriculum | null {
  if (!raw || typeof raw !== 'object') return null
  const c = raw as Record<string, unknown>
  if (!Array.isArray(c.steps) || c.steps.length === 0) return null
  return { steps: c.steps }
}

// ── Assessment evaluation output ─────────────────────────────────────────────
interface AssessmentEval {
  score: number       // 0-100
  passed: boolean
  feedback: string
}

function validateAssessmentEval(raw: unknown): AssessmentEval | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (typeof r.score !== 'number') return null
  if (r.score < 0 || r.score > 100) return null
  if (typeof r.passed !== 'boolean') return null
  if (typeof r.feedback !== 'string') return null
  return { score: r.score, passed: r.passed, feedback: r.feedback }
}

// ── Exam readiness output ─────────────────────────────────────────────────────
interface ExamReadiness { readinessPct: number; weakTopics: string[] }

function validateExamReadiness(raw: unknown): ExamReadiness | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (typeof r.readinessPct !== 'number') return null
  if (r.readinessPct < 0 || r.readinessPct > 100) return null
  if (!Array.isArray(r.weakTopics)) return null
  return { readinessPct: r.readinessPct, weakTopics: r.weakTopics as string[] }
}

// ── Coach insight output ──────────────────────────────────────────────────────
interface CoachInsight { summary: string; recommendations: string[] }

function validateCoachInsight(raw: unknown): CoachInsight | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (typeof r.summary !== 'string' || !r.summary.trim()) return null
  if (!Array.isArray(r.recommendations)) return null
  return { summary: r.summary, recommendations: r.recommendations as string[] }
}

describe('AI output schema enforcement', () => {
  describe('curriculum validation (MED-9)', () => {
    it('valid curriculum with steps passes', () => {
      expect(validateCurriculum({ steps: ['step1', 'step2'] })).not.toBeNull()
    })

    it('null → null', () => {
      expect(validateCurriculum(null)).toBeNull()
    })

    it('empty steps array → null', () => {
      expect(validateCurriculum({ steps: [] })).toBeNull()
    })

    it('missing steps field → null', () => {
      expect(validateCurriculum({ title: 'Course' })).toBeNull()
    })

    it('steps not array → null', () => {
      expect(validateCurriculum({ steps: 'not-an-array' })).toBeNull()
    })

    it('non-object → null', () => {
      expect(validateCurriculum('string response')).toBeNull()
    })
  })

  describe('assessment evaluation validation', () => {
    it('valid eval passes', () => {
      const r = validateAssessmentEval({ score: 75, passed: true, feedback: 'Good work' })
      expect(r?.score).toBe(75)
    })

    it('score above 100 → null (impossible value)', () => {
      expect(validateAssessmentEval({ score: 110, passed: true, feedback: 'ok' })).toBeNull()
    })

    it('score below 0 → null', () => {
      expect(validateAssessmentEval({ score: -5, passed: false, feedback: 'ok' })).toBeNull()
    })

    it('score 0 boundary → valid', () => {
      expect(validateAssessmentEval({ score: 0, passed: false, feedback: 'try again' })).not.toBeNull()
    })

    it('score 100 boundary → valid', () => {
      expect(validateAssessmentEval({ score: 100, passed: true, feedback: 'perfect' })).not.toBeNull()
    })

    it('missing score → null', () => {
      expect(validateAssessmentEval({ passed: true, feedback: 'ok' })).toBeNull()
    })

    it('missing feedback → null', () => {
      expect(validateAssessmentEval({ score: 70, passed: true })).toBeNull()
    })

    it('null → null', () => {
      expect(validateAssessmentEval(null)).toBeNull()
    })

    it('array response → null', () => {
      expect(validateAssessmentEval([{ score: 70 }])).toBeNull()
    })
  })

  describe('exam readiness validation', () => {
    it('valid readiness passes', () => {
      const r = validateExamReadiness({ readinessPct: 65, weakTopics: ['algebra'] })
      expect(r?.readinessPct).toBe(65)
    })

    it('readiness above 100 → null', () => {
      expect(validateExamReadiness({ readinessPct: 105, weakTopics: [] })).toBeNull()
    })

    it('readiness below 0 → null', () => {
      expect(validateExamReadiness({ readinessPct: -10, weakTopics: [] })).toBeNull()
    })

    it('readiness 0 → valid (not ready)', () => {
      expect(validateExamReadiness({ readinessPct: 0, weakTopics: ['everything'] })).not.toBeNull()
    })

    it('readiness 100 → valid (fully ready)', () => {
      expect(validateExamReadiness({ readinessPct: 100, weakTopics: [] })).not.toBeNull()
    })

    it('missing weakTopics → null', () => {
      expect(validateExamReadiness({ readinessPct: 70 })).toBeNull()
    })

    it('weakTopics not array → null', () => {
      expect(validateExamReadiness({ readinessPct: 70, weakTopics: 'algebra' })).toBeNull()
    })
  })

  describe('coach insight validation', () => {
    it('valid insight passes', () => {
      const r = validateCoachInsight({ summary: 'Student is improving', recommendations: ['Practice algebra'] })
      expect(r?.summary).toBe('Student is improving')
    })

    it('empty summary → null', () => {
      expect(validateCoachInsight({ summary: '', recommendations: [] })).toBeNull()
    })

    it('whitespace-only summary → null', () => {
      expect(validateCoachInsight({ summary: '   ', recommendations: [] })).toBeNull()
    })

    it('missing recommendations → null', () => {
      expect(validateCoachInsight({ summary: 'Good progress' })).toBeNull()
    })

    it('null → null', () => {
      expect(validateCoachInsight(null)).toBeNull()
    })

    it('empty recommendations array → valid (no recommendations needed)', () => {
      expect(validateCoachInsight({ summary: 'Perfect performance', recommendations: [] })).not.toBeNull()
    })
  })
})
