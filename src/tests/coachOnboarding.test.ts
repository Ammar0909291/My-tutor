import { describe, it, expect } from 'vitest'
import {
  COACH_QUESTIONS, COACH_QUESTION_ORDER, GOAL_VALUES, EXPERIENCE_VALUES,
  STUDY_TIME_VALUES, LEARNING_STYLE_VALUES, CONFIDENCE_VALUES, SUBJECT_VALUES,
  getCoachQuestion, isValidAnswer, isAnswered, nextCoachQuestion,
  isInterviewComplete, interviewProgress, type CoachAnswers,
} from '@/lib/coach/onboardingInterview'
import {
  buildLearnerProfile, normalizeExperience, buildCoachAdaptationBlock, describeFromAnswers,
} from '@/lib/coach/learnerProfile'

const COMPLETE: CoachAnswers = {
  goal: 'competitive_exams',
  experience: 'some_knowledge',
  studyTime: '60',
  learningStyle: 'examples_first',
  confidence: 'unsure',
  subjects: ['mathematics', 'physics'],
}

describe('interview definition', () => {
  it('asks exactly the six required questions in order', () => {
    expect(COACH_QUESTION_ORDER).toEqual([
      'goal', 'experience', 'studyTime', 'learningStyle', 'confidence', 'subjects',
    ])
  })

  it('only the subjects question is multi-select', () => {
    for (const q of COACH_QUESTIONS) {
      expect(q.multi).toBe(q.id === 'subjects')
    }
  })

  it('every question offers options — none is open-ended', () => {
    for (const q of COACH_QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      for (const o of q.options) {
        expect(o.value.trim()).not.toBe('')
        expect(o.label.trim()).not.toBe('')
      }
    }
  })

  it('option values match the exported value lists (single source of truth)', () => {
    const byId = (id: string) => getCoachQuestion(id as never)!.options.map((o) => o.value)
    expect(byId('goal')).toEqual([...GOAL_VALUES])
    expect(byId('experience')).toEqual([...EXPERIENCE_VALUES])
    expect(byId('studyTime')).toEqual([...STUDY_TIME_VALUES])
    expect(byId('learningStyle')).toEqual([...LEARNING_STYLE_VALUES])
    expect(byId('confidence')).toEqual([...CONFIDENCE_VALUES])
    expect(byId('subjects')).toEqual([...SUBJECT_VALUES])
  })

  it('has no duplicate option values within a question', () => {
    for (const q of COACH_QUESTIONS) {
      expect(new Set(q.options.map((o) => o.value)).size).toBe(q.options.length)
    }
  })
})

describe('answer validation', () => {
  const goal = getCoachQuestion('goal')!
  const subjects = getCoachQuestion('subjects')!

  it('accepts a legal single answer and rejects anything else', () => {
    expect(isValidAnswer(goal, 'career')).toBe(true)
    expect(isValidAnswer(goal, 'not_an_option')).toBe(false)
    expect(isValidAnswer(goal, ['career'])).toBe(false)
    expect(isValidAnswer(goal, undefined)).toBe(false)
  })

  it('requires a non-empty, duplicate-free array for multi-select', () => {
    expect(isValidAnswer(subjects, ['mathematics'])).toBe(true)
    expect(isValidAnswer(subjects, [])).toBe(false)
    expect(isValidAnswer(subjects, ['mathematics', 'mathematics'])).toBe(false)
    expect(isValidAnswer(subjects, ['mathematics', 'astrology'])).toBe(false)
    expect(isValidAnswer(subjects, 'mathematics')).toBe(false)
  })
})

describe('wizard progression', () => {
  it('starts at the first question', () => {
    expect(nextCoachQuestion({})!.id).toBe('goal')
  })

  it('walks the questions in order, one at a time', () => {
    const answers: CoachAnswers = {}
    const seen: string[] = []
    for (let i = 0; i < COACH_QUESTION_ORDER.length; i++) {
      const q = nextCoachQuestion(answers)!
      seen.push(q.id)
      const value = q.multi ? [q.options[0].value] : q.options[0].value
      ;(answers as Record<string, unknown>)[q.id] = value
    }
    expect(seen).toEqual(COACH_QUESTION_ORDER)
    expect(nextCoachQuestion(answers)).toBeNull()
  })

  it('re-asks a question whose stored answer is invalid', () => {
    expect(nextCoachQuestion({ ...COMPLETE, studyTime: 'bogus' })!.id).toBe('studyTime')
  })

  it('skips ahead when earlier answers already exist', () => {
    expect(nextCoachQuestion({ goal: 'career', experience: 'advanced' })!.id).toBe('studyTime')
  })

  it('reports completion and progress', () => {
    expect(isInterviewComplete(COMPLETE)).toBe(true)
    expect(isInterviewComplete({})).toBe(false)
    expect(interviewProgress(COMPLETE)).toEqual({ answered: 6, total: 6 })
    expect(interviewProgress({ goal: 'career' })).toEqual({ answered: 1, total: 6 })
  })

  it('isAnswered rejects an unknown question id', () => {
    expect(isAnswered(COMPLETE, 'nope' as never)).toBe(false)
  })
})

describe('normalizeExperience — reuses the 3 canonical tiers', () => {
  it('collapses the four interview answers onto three tiers', () => {
    expect(normalizeExperience('complete_beginner')).toBe('beginner')
    expect(normalizeExperience('some_knowledge')).toBe('intermediate')
    expect(normalizeExperience('comfortable')).toBe('intermediate')
    expect(normalizeExperience('advanced')).toBe('advanced')
  })

  it('only ever produces a canonical tier', () => {
    for (const e of EXPERIENCE_VALUES) {
      expect(['beginner', 'intermediate', 'advanced']).toContain(normalizeExperience(e))
    }
  })
})

describe('buildLearnerProfile', () => {
  it('builds a complete profile from a complete interview', () => {
    expect(buildLearnerProfile(COMPLETE)).toEqual({
      goalCategory: 'competitive_exams',
      currentLevel: 'intermediate',
      experience: 'some_knowledge',
      dailyStudyMinutes: 60,
      learningStyle: 'examples_first',
      confidenceBaseline: 'unsure',
      subjects: ['mathematics', 'physics'],
    })
  })

  it('refuses to build from an incomplete interview', () => {
    for (const id of COACH_QUESTION_ORDER) {
      const partial = { ...COMPLETE }
      delete (partial as Record<string, unknown>)[id]
      expect(buildLearnerProfile(partial)).toBeNull()
    }
  })

  it('retains the finer experience answer alongside the canonical tier', () => {
    const comfortable = buildLearnerProfile({ ...COMPLETE, experience: 'comfortable' })!
    expect(comfortable.currentLevel).toBe('intermediate')
    expect(comfortable.experience).toBe('comfortable')
  })

  it('does not alias the caller’s subjects array', () => {
    const answers: CoachAnswers = { ...COMPLETE, subjects: ['mathematics'] }
    const profile = buildLearnerProfile(answers)!
    answers.subjects!.push('physics')
    expect(profile.subjects).toEqual(['mathematics'])
  })
})

describe('buildCoachAdaptationBlock — the Tutor Max handoff', () => {
  const persisted = {
    goalCategory: 'competitive_exams',
    currentLevel: 'intermediate',
    dailyStudyMinutes: 60,
    learningStyle: 'examples_first',
    confidenceBaseline: 'unsure',
  }

  it('covers all five required adaptations', () => {
    const block = buildCoachAdaptationBlock(persisted)
    expect(block).toMatch(/Goal:/)
    expect(block).toMatch(/Explanations and examples:/)
    expect(block).toMatch(/Pacing:/)
    expect(block).toMatch(/Questioning difficulty:/)
    expect(block).toMatch(/Confidence:/)
  })

  it('renders nothing for a learner who predates the interview (no regression)', () => {
    expect(buildCoachAdaptationBlock(null)).toBe('')
    expect(buildCoachAdaptationBlock(undefined)).toBe('')
    expect(buildCoachAdaptationBlock({})).toBe('')
  })

  it('ignores unrecognised stored values rather than emitting junk', () => {
    const block = buildCoachAdaptationBlock({
      goalCategory: 'nonsense', learningStyle: 'nonsense', confidenceBaseline: 'nonsense',
      currentLevel: 'nonsense', dailyStudyMinutes: 0,
    })
    expect(block).toBe('')
  })

  it('emits a partial block when only some answers exist', () => {
    const block = buildCoachAdaptationBlock({ goalCategory: 'hobby' })
    expect(block).toMatch(/Goal:/)
    expect(block).not.toMatch(/Pacing:/)
  })

  it('scales pacing to the session budget', () => {
    expect(buildCoachAdaptationBlock({ dailyStudyMinutes: 15 })).toMatch(/ONE concept per session/)
    expect(buildCoachAdaptationBlock({ dailyStudyMinutes: 180 })).toMatch(/multiple concepts/)
  })

  it('sets questioning difficulty from the canonical tier', () => {
    expect(buildCoachAdaptationBlock({ currentLevel: 'beginner' })).toMatch(/recognition/)
    expect(buildCoachAdaptationBlock({ currentLevel: 'advanced' })).toMatch(/transfer/)
  })

  it('treats a nervous learner and a confident one differently', () => {
    const nervous = buildCoachAdaptationBlock({ confidenceBaseline: 'very_nervous' })
    const confident = buildCoachAdaptationBlock({ confidenceBaseline: 'confident' })
    expect(nervous).toMatch(/certain win/)
    expect(confident).toMatch(/over-report|Do not over-praise/)
    expect(nervous).not.toBe(confident)
  })

  it('produces a distinct directive for every legal value', () => {
    const goals = new Set(GOAL_VALUES.map((g) => buildCoachAdaptationBlock({ goalCategory: g })))
    expect(goals.size).toBe(GOAL_VALUES.length)
    const styles = new Set(LEARNING_STYLE_VALUES.map((s) => buildCoachAdaptationBlock({ learningStyle: s })))
    expect(styles.size).toBe(LEARNING_STYLE_VALUES.length)
    const confidences = new Set(CONFIDENCE_VALUES.map((c) => buildCoachAdaptationBlock({ confidenceBaseline: c })))
    expect(confidences.size).toBe(CONFIDENCE_VALUES.length)
  })

  it('instructs the tutor to adapt, not to recite the profile back', () => {
    expect(buildCoachAdaptationBlock(persisted)).toMatch(/never recite it back/)
  })
})

describe('describeFromAnswers — derives the free-text description', () => {
  it('summarises a complete interview using the interview labels', () => {
    const text = describeFromAnswers(COMPLETE, ['Mathematics', 'Physics'])
    expect(text).toContain('Mathematics, Physics')
    expect(text).toContain('Competitive exams')
    expect(text).toContain('Some knowledge')
    expect(text).toContain('1 hour')
    expect(text).toContain('Examples first')
    expect(text).toContain('Unsure')
  })

  it('satisfies the API minimum length the free-text box used to enforce', () => {
    // The onboarding schema requires selfDescription >= 10 chars; removing the
    // open-ended question must not start failing that validation.
    expect(describeFromAnswers(COMPLETE, ['Mathematics']).length).toBeGreaterThanOrEqual(10)
    expect(describeFromAnswers({}, []).length).toBeGreaterThanOrEqual(10)
  })

  it('degrades gracefully when answers are missing', () => {
    const text = describeFromAnswers({ goal: 'hobby' }, ['Biology'])
    expect(text).toContain('Biology')
    expect(text).toContain('Hobby')
    expect(text).not.toContain('undefined')
    expect(text).not.toContain('null')
  })

  it('falls back when no subjects are supplied', () => {
    expect(describeFromAnswers(COMPLETE, [])).toContain('their chosen subjects')
  })

  it('ignores an unrecognised stored value rather than printing it raw', () => {
    expect(describeFromAnswers({ goal: 'bogus' }, ['Physics'])).not.toContain('bogus')
  })
})
