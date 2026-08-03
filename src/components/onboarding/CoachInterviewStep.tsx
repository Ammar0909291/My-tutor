'use client'

/**
 * P5 — the Coach interview, rendered as a guided multiple-choice wizard.
 *
 * One question, one answer, continue. No free text, no conversation, no
 * re-introductions: the question set and their progression come from
 * onboardingInterview.ts, which is the same source the API's zod schema and
 * the persisted profile read from.
 *
 * Scope note: subjects and experience are collected by the surrounding
 * OnboardingWizard steps that already existed (and already map onto
 * ProfileSubject / Profile.currentLevel), so this component walks only the
 * four questions that had no prior home. It is driven entirely by
 * nextCoachQuestion(), so it cannot disagree with the server about which
 * question comes next.
 */

import {
  type CoachAnswers, type CoachQuestionId, nextCoachQuestion,
} from '@/lib/coach/onboardingInterview'
import { useLanguage } from '@/components/ui/LanguageToggle'
import type { TranslationKey } from '@/lib/i18n'

/** The questions this step owns — the surrounding wizard owns the other two. */
const STEP_QUESTIONS: CoachQuestionId[] = ['goal', 'studyTime', 'learningStyle', 'confidence']

export function CoachInterviewStep({
  answers,
  onAnswer,
  onBack,
  onComplete,
}: {
  answers: CoachAnswers
  onAnswer: (id: CoachQuestionId, value: string) => void
  onBack: () => void
  onComplete: () => void
}) {
  const { t } = useLanguage()

  // Look up a localized question prompt by question id (e.g. 'goal' → 'coach_goal_prompt')
  const localizedPrompt = (questionId: string) =>
    t(('coach_' + questionId.toLowerCase() + '_prompt') as TranslationKey)

  // Look up a localized option label (e.g. 'goal' + 'school_exams' → 'coach_goal_school_exams')
  const localizedOption = (questionId: string, optionValue: string) =>
    t(('coach_' + questionId.toLowerCase() + '_' + optionValue) as TranslationKey)

  // Only consider this step's questions when deciding what to show, by
  // treating the wizard-owned answers as already satisfied.
  const scoped: CoachAnswers = {
    ...answers,
    experience: answers.experience ?? 'complete_beginner',
    subjects: answers.subjects && answers.subjects.length > 0 ? answers.subjects : ['mathematics'],
  }
  const question = nextCoachQuestion(scoped)
  const answeredCount = STEP_QUESTIONS.filter((id) => (answers as Record<string, unknown>)[id]).length

  // Every question in this step is answered — hand control back.
  if (!question || !STEP_QUESTIONS.includes(question.id)) {
    return (
      <div className="animate-scale-in">
        <h1
          className="text-2xl md:text-3xl font-black mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          {t('coach_done_title')}
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('coach_done_sub')}
        </p>
        <div className="flex gap-3">
          <button onClick={onBack} className="btn-ghost flex-1 py-3">{t('ob_back')}</button>
          <button onClick={onComplete} className="btn-primary flex-1 py-3 font-bold">{t('coach_done_continue')}</button>
        </div>
      </div>
    )
  }

  const goBack = () => {
    // Step back to the previous question in this step by clearing it; the
    // renderer re-derives position from the answers, so clearing IS the
    // back action. Before the first question, leave the step entirely.
    const idx = STEP_QUESTIONS.indexOf(question.id)
    if (idx <= 0) { onBack(); return }
    onAnswer(STEP_QUESTIONS[idx - 1], '')
  }

  return (
    <div className="animate-scale-in">
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>
        {t('coach_q_progress')
          .replace('{n}', String(answeredCount + 1))
          .replace('{total}', String(STEP_QUESTIONS.length))}
      </p>
      <h1
        className="text-2xl md:text-3xl font-black mb-6"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        {localizedPrompt(question.id) || question.prompt}
      </h1>

      <div className="flex flex-col gap-2.5 mb-6">
        {question.options.map((option) => {
          const selected = (answers as Record<string, unknown>)[question.id] === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(question.id, option.value)}
              className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: selected ? 'rgba(247,129,102,0.12)' : 'var(--bg-elevated)',
                border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                color: 'var(--text-primary)',
              }}
            >
              {localizedOption(question.id, option.value) || option.label}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={goBack} className="btn-ghost flex-1 py-3">{t('ob_back')}</button>
      </div>
    </div>
  )
}
