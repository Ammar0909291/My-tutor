'use client'

import { useState, useEffect, useCallback } from 'react'

interface Question {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface Props {
  subjectSlug?: string
  topicSlug?: string
  topicTitle?: string
  lessonGoal?: string
  teachingLanguage?: string
  difficulty?: number
  focusCategories?: string[]
  onClose?: () => void
  onComplete?: (score: number | null, evidenceWritten: boolean) => void
  onViewInsights?: () => void
}

type State = 'loading' | 'quiz' | 'result' | 'error'

export function PracticePanel({
  subjectSlug,
  topicSlug,
  topicTitle,
  teachingLanguage,
  onClose,
  onComplete,
}: Props) {
  const [state, setState] = useState<State>('loading')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  const lang = teachingLanguage === 'ru' ? 'ru' : teachingLanguage === 'hi' ? 'hi' : 'en'

  const load = useCallback(async () => {
    setState('loading')
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subjectSlug ?? topicSlug ?? 'general', topic: topicSlug, lang }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Could not generate quiz')
        setState('error')
        return
      }
      if (!data.questions?.length) {
        setErrorMsg('AI is not configured — no questions available.')
        setState('error')
        return
      }
      setQuestions(data.questions)
      setCurrentIdx(0)
      setAnswers([])
      setSelected(null)
      setState('quiz')
    } catch {
      setErrorMsg('Network error — please try again.')
      setState('error')
    }
  }, [subjectSlug, topicSlug, lang])

  useEffect(() => { load() }, [load])

  function handleSelect(idx: number) {
    if (selected !== null) return
    setSelected(idx)
  }

  function handleNext() {
    if (selected === null) return
    const correct = selected === questions[currentIdx].correctIndex
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)
    setSelected(null)
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1)
    } else {
      const score = Math.round((newAnswers.filter(Boolean).length / questions.length) * 100)
      setAnswers(newAnswers)
      setState('result')
      onComplete?.(score, false)
    }
  }

  const q = questions[currentIdx]
  const score = answers.length > 0
    ? Math.round((answers.filter(Boolean).length / answers.length) * 100)
    : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6 space-y-4"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            {topicTitle ?? topicSlug ?? 'Practice'}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            ✕
          </button>
        </div>

        {/* Loading */}
        {state === 'loading' && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }} />
          </div>
        )}

        {/* Error */}
        {state === 'error' && (
          <div className="space-y-4">
            <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>
              {errorMsg}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={load}
                className="rounded-lg px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--accent-primary)', color: '#fff' }}
              >
                Retry
              </button>
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Quiz */}
        {state === 'quiz' && q && (
          <div className="space-y-4">
            <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span>Question {currentIdx + 1} of {questions.length}</span>
            </div>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let bg = 'var(--bg-base)'
                let border = 'var(--border-subtle)'
                let color = 'var(--text-primary)'
                if (selected !== null) {
                  if (i === q.correctIndex) { bg = '#16a34a22'; border = '#16a34a'; color = '#16a34a' }
                  else if (i === selected) { bg = '#dc262622'; border = '#dc2626'; color = '#dc2626' }
                } else if (selected === i) {
                  bg = 'var(--accent-primary)22'; border = 'var(--accent-primary)'
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="w-full text-left rounded-xl px-4 py-3 text-sm transition-colors"
                    style={{ background: bg, border: `1px solid ${border}`, color }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {selected !== null && (
              <p className="text-xs italic" style={{ color: 'var(--text-secondary)' }}>
                {q.explanation}
              </p>
            )}
            <button
              onClick={handleNext}
              disabled={selected === null}
              className="w-full rounded-xl py-2.5 text-sm font-medium disabled:opacity-40 transition-opacity"
              style={{ background: 'var(--accent-primary)', color: '#fff' }}
            >
              {currentIdx + 1 < questions.length ? 'Next' : 'Finish'}
            </button>
          </div>
        )}

        {/* Result */}
        {state === 'result' && (
          <div className="space-y-4 text-center">
            <div className="text-4xl font-bold" style={{ color: 'var(--accent-primary)' }}>
              {score}%
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {answers.filter(Boolean).length} / {questions.length} correct
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={load}
                className="rounded-lg px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--accent-primary)', color: '#fff' }}
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
