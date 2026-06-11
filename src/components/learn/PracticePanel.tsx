'use client'

import { useState, useEffect, useCallback } from 'react'
import { t as i18n, type Lang } from '@/lib/i18n'

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
  onComplete?: (score: number | null, evidenceWritten: boolean, topicProgress?: { status: string; masteryPct: number }) => void
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

  const lang: Lang = teachingLanguage === 'ru' ? 'ru' : teachingLanguage === 'hi' ? 'hi' : 'en'

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
      setState('result')
      submitResults(newAnswers, score)
    }
  }

  async function submitResults(correctFlags: boolean[], score: number) {
    if (!subjectSlug || !topicSlug) {
      onComplete?.(score, false)
      return
    }
    try {
      const res = await fetch('/api/practice/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectSlug,
          topicSlug,
          questions: questions.map((q) => ({ question: q.question, correctIndex: q.correctIndex })),
          correct: correctFlags,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        // Practice results change the insights — drop the panel's client cache
        // so the next open shows fresh data (Sprint AP).
        const { invalidateInsightsCache } = await import('@/components/learn/InsightsPanel')
        invalidateInsightsCache()
      }
      onComplete?.(score, !!(res.ok && data.success), data.topicProgress)
    } catch {
      onComplete?.(score, false)
    }
  }

  const q = questions[currentIdx]
  const score = answers.length > 0
    ? Math.round((answers.filter(Boolean).length / answers.length) * 100)
    : 0

  const statusLabel =
    state === 'loading' ? i18n(lang, 'practice_loading')
    : state === 'quiz' ? `${currentIdx + 1} ${i18n(lang, 'practice_q_of')} ${questions.length}`
    : state === 'result' ? i18n(lang, 'practice_completed_n').replace('{n}', String(questions.length))
    : i18n(lang, 'practice_unavailable')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(2,4,8,0.78)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div
        className="w-full max-w-lg overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={i18n(lang, 'practice_knowledge_check')}
        style={{
          background: 'var(--bg-base)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--r-xl)',
          boxShadow: 'var(--shadow-xl), 0 0 0 1px rgba(0,0,0,0.04)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-start gap-3 px-6 py-4"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 40, height: 40, fontSize: 20,
              background: 'var(--coral-muted)',
              border: '1px solid var(--coral-border)',
              borderRadius: 'var(--r-md)',
            }}
          >
            🎯
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="text-[11px] font-bold uppercase"
              style={{ color: 'var(--coral)', letterSpacing: '0.08em' }}
            >
              {i18n(lang, 'practice_knowledge_check')}
            </div>
            <h3
              className="font-bold text-base leading-snug truncate"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
              title={topicTitle ?? topicSlug ?? 'Practice'}
            >
              {topicTitle ?? topicSlug ?? 'Practice'}
            </h3>
            <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>
              {statusLabel}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 flex items-center justify-center transition-colors"
            style={{
              width: 32, height: 32, fontSize: 14,
              color: 'var(--text-primary)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* ── Quiz progress bar ── */}
        {state === 'quiz' && questions.length > 0 && (
          <div style={{ height: 4, background: 'var(--bg-elevated)' }}>
            <div
              style={{
                height: '100%',
                width: `${(currentIdx / questions.length) * 100}%`,
                background: 'var(--coral)',
                transition: 'width 0.3s var(--ease-out)',
              }}
            />
          </div>
        )}

        <div className="p-6">
          {/* ── Loading ── */}
          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center gap-4 py-14">
              <div
                className="w-10 h-10 border-[3px] rounded-full animate-spin"
                style={{ borderColor: 'var(--coral)', borderTopColor: 'transparent' }}
              />
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {i18n(lang, 'practice_loading')}
              </p>
            </div>
          )}

          {/* ── Error / AI unavailable ── */}
          {state === 'error' && (
            <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 64, height: 64, fontSize: 30,
                  background: 'var(--yellow-muted)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--r-full)',
                }}
              >
                ⚠️
              </div>
              <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {i18n(lang, 'practice_unavailable')}
              </h4>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {i18n(lang, 'practice_error_generic')}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {errorMsg || 'Please try again later.'}
              </p>
              <div className="flex gap-3 justify-center mt-3">
                <button
                  onClick={load}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold"
                  style={{ background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  ↻ {i18n(lang, 'quiz_retry')}
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-default)',
                    cursor: 'pointer',
                  }}
                >
                  {i18n(lang, 'practice_close')}
                </button>
              </div>
            </div>
          )}

          {/* ── Quiz ── */}
          {state === 'quiz' && q && (
            <div className="space-y-4">
              <p className="font-semibold text-[15px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let bg = 'var(--bg-surface)'
                  let border = 'var(--border-default)'
                  let color = 'var(--text-primary)'
                  let fontWeight = 500
                  if (selected !== null) {
                    if (i === q.correctIndex) { bg = 'var(--green-muted)'; border = 'var(--green)'; color = 'var(--green)'; fontWeight = 700 }
                    else if (i === selected) { bg = 'var(--red-muted)'; border = 'var(--red)'; color = 'var(--red)'; fontWeight = 700 }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="w-full text-left rounded-xl px-4 py-3 text-sm transition-colors"
                      style={{ background: bg, border: `1.5px solid ${border}`, color, fontWeight, cursor: selected === null ? 'pointer' : 'default' }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {selected !== null && (
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{
                    background: 'var(--blue-muted)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                >
                  💡 {q.explanation}
                </div>
              )}
              <button
                onClick={handleNext}
                disabled={selected === null}
                className="w-full rounded-xl py-3 text-sm font-bold disabled:opacity-40 transition-opacity"
                style={{ background: 'var(--coral)', color: '#fff', border: 'none', cursor: selected === null ? 'default' : 'pointer' }}
              >
                {currentIdx + 1 < questions.length ? i18n(lang, 'quiz_next') : i18n(lang, 'quiz_finish')}
              </button>
            </div>
          )}

          {/* ── Result ── */}
          {state === 'result' && (
            <div className="space-y-4 text-center py-4">
              <div style={{ fontSize: 44 }}>{score >= 80 ? '🏆' : score >= 50 ? '👏' : '💪'}</div>
              <div
                className="text-5xl font-extrabold"
                style={{ color: score >= 50 ? 'var(--green)' : 'var(--coral)', fontFamily: 'var(--font-heading)' }}
              >
                {score}%
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {i18n(lang, 'practice_correct_count').replace('{x}', String(answers.filter(Boolean).length)).replace('{y}', String(questions.length))}
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={load}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold"
                  style={{ background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  {i18n(lang, 'quiz_retry')}
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-default)',
                    cursor: 'pointer',
                  }}
                >
                  {i18n(lang, 'practice_done')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
