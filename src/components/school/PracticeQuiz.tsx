'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react'
import type { PracticeResult, QuestionReview } from '@/lib/school/practice/practiceTypes'

interface ClientQuestion {
  id: string
  type: 'mcq' | 'true_false' | 'short_answer'
  nodeId: string
  question: string
  options?: string[]
}

interface PracticeQuizProps {
  subjectSlug: string
  chapterId: string
  chapterTitle: string
}

type Phase = 'loading' | 'quiz' | 'submitting' | 'results'

const MASTERY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  mastered:       { label: 'Mastered',       color: 'var(--green)',  bg: 'var(--green-muted)' },
  good_progress:  { label: 'Good Progress',  color: 'var(--blue)',   bg: 'var(--blue-muted)' },
  needs_practice: { label: 'Needs Practice', color: 'var(--coral)',  bg: 'var(--coral-muted)' },
}

export function PracticeQuiz({ subjectSlug, chapterId, chapterTitle }: PracticeQuizProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('loading')
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState('')
  const [questions, setQuestions] = useState<ClientQuestion[]>([])
  const [estimatedMinutes, setEstimatedMinutes] = useState(10)
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | boolean | string>>({})
  const [result, setResult] = useState<PracticeResult | null>(null)
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    fetch('/api/school/practice/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, chapterId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setSessionId(data.sessionId)
        setQuestions(data.questions)
        setEstimatedMinutes(data.estimatedMinutes ?? 10)
        setPhase('quiz')
      })
      .catch(() => setError('Failed to load questions. Please try again.'))
  }, [subjectSlug, chapterId])

  async function submitAnswers() {
    setPhase('submitting')
    const payload = Object.entries(answers).map(([questionId, value]) => ({ questionId, value }))
    try {
      const r = await fetch('/api/school/practice/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answers: payload }),
      })
      const data = await r.json()
      if (data.error) { setError(data.error); return }
      setResult(data)
      setPhase('results')
    } catch {
      setError('Failed to submit. Please try again.')
      setPhase('quiz')
    }
  }

  function handleAnswer(qId: string, value: number | boolean | string) {
    setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  function handleNext() {
    if (currentIdx < questions.length - 1) setCurrentIdx((i) => i + 1)
    else submitAnswers()
  }

  function restartPractice() {
    setPhase('loading')
    setAnswers({})
    setCurrentIdx(0)
    setStarted(false)
    setResult(null)
    setShowReview(false)
    setError(null)
    fetch('/api/school/practice/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, chapterId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setSessionId(data.sessionId)
        setQuestions(data.questions)
        setEstimatedMinutes(data.estimatedMinutes ?? 10)
        setPhase('quiz')
      })
      .catch(() => setError('Failed to load questions. Please try again.'))
  }

  const backHref = `/school/${subjectSlug}/chapter/${encodeURIComponent(chapterId)}`

  // ─── Error ───
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg-base)' }}>
        <div className="rounded-2xl p-8 text-center max-w-sm w-full" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
          <p className="text-2xl mb-3">😕</p>
          <p className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>{error}</p>
          <button onClick={() => { setError(null); setPhase('loading') }}
            className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: 'var(--coral)' }}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  // ─── Loading ───
  if (phase === 'loading' || phase === 'submitting') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--coral)', borderTopColor: 'transparent' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {phase === 'loading' ? 'Preparing questions…' : 'Scoring your answers…'}
          </p>
        </div>
      </div>
    )
  }

  // ─── Pre-start screen ───
  if (phase === 'quiz' && !started) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <nav className="sticky top-0 z-50"
          style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
          <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center">
            <a href={backHref} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </a>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-5 py-12">
          <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: 'var(--coral-muted)' }}>🎯</div>
            <h1 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Chapter Practice
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{chapterTitle}</p>
            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{questions.length}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>~{estimatedMinutes}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Minutes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>80%</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>To master</p>
              </div>
            </div>
            <button onClick={() => setStarted(true)}
              className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--coral)', boxShadow: 'var(--coral-glow)' }}>
              Start Practice <ArrowRight size={16} />
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ─── Quiz ───
  if (phase === 'quiz' && started) {
    const q = questions[currentIdx]
    const answered = q.id in answers
    const isLast = currentIdx === questions.length - 1

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <nav className="sticky top-0 z-50"
          style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
          <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
            <a href={backHref} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </a>
            <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-secondary)' }}>
              {currentIdx + 1} / {questions.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1" style={{ background: 'var(--bg-elevated)' }}>
            <div className="h-full transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%`, background: 'var(--coral)' }} />
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-5 py-8 space-y-6">
          {/* Question */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
              Question {currentIdx + 1} · {q.type === 'mcq' ? 'Multiple Choice' : q.type === 'true_false' ? 'True / False' : 'Short Answer'}
            </p>
            <p className="text-base font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
          </div>

          {/* Answer area */}
          {q.type === 'mcq' && q.options && (
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i
                return (
                  <button key={i} onClick={() => handleAnswer(q.id, i)}
                    className="w-full text-left rounded-2xl p-4 flex items-center gap-3 transition-all"
                    style={{
                      background: selected ? 'var(--coral-muted)' : 'var(--bg-surface)',
                      border: `2px solid ${selected ? 'var(--coral)' : 'var(--border-default)'}`,
                    }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: selected ? 'var(--coral)' : 'var(--bg-elevated)', color: selected ? '#fff' : 'var(--text-secondary)' }}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</span>
                  </button>
                )
              })}
            </div>
          )}

          {q.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-3">
              {([true, false] as const).map((val) => {
                const selected = answers[q.id] === val
                return (
                  <button key={String(val)} onClick={() => handleAnswer(q.id, val)}
                    className="rounded-2xl py-5 text-sm font-bold transition-all"
                    style={{
                      background: selected ? 'var(--coral-muted)' : 'var(--bg-surface)',
                      border: `2px solid ${selected ? 'var(--coral)' : 'var(--border-default)'}`,
                      color: selected ? 'var(--coral)' : 'var(--text-primary)',
                    }}>
                    {val ? 'True ✓' : 'False ✗'}
                  </button>
                )
              })}
            </div>
          )}

          {q.type === 'short_answer' && (
            <div className="rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <textarea
                placeholder="Write your answer here…"
                value={(answers[q.id] as string) ?? ''}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                rows={4}
                className="w-full p-4 text-sm rounded-2xl resize-none focus:outline-none"
                style={{ background: 'transparent', color: 'var(--text-primary)' }}
              />
            </div>
          )}

          {/* Next / Submit */}
          <button
            onClick={handleNext}
            disabled={!answered}
            className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{ background: 'var(--coral)', boxShadow: answered ? 'var(--coral-glow)' : 'none' }}>
            {isLast ? 'Submit' : 'Next'} <ArrowRight size={16} />
          </button>
        </main>
      </div>
    )
  }

  // ─── Results ───
  if (phase === 'results' && result) {
    const mastery = MASTERY_LABELS[result.masteryStatus] ?? MASTERY_LABELS.needs_practice

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <nav className="sticky top-0 z-50"
          style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
          <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center">
            <a href={backHref} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back to chapter
            </a>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-5 py-8 space-y-5">
          {/* Score card */}
          <div className="rounded-2xl p-6 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>Chapter Practice Complete</p>
            <div className="text-5xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {result.accuracyPercent}%
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {result.correctCount} correct · {result.totalCount - result.correctCount} incorrect
            </p>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: mastery.bg, color: mastery.color, border: `1px solid ${mastery.color}` }}>
              {mastery.label}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--green)' }}>{result.correctCount}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Correct</p>
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--coral)' }}>{result.totalCount - result.correctCount}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Incorrect</p>
            </div>
          </div>

          {/* Weak areas */}
          {result.weakNodeIds.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <h3 className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>Weak Areas</h3>
              <ul className="space-y-1.5">
                {result.weakNodeIds.map((id) => (
                  <li key={id} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--coral)' }} />
                    <span className="font-medium">{id.replace(/-/g, ' ').replace(/_/g, ' ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Review */}
          <button onClick={() => setShowReview((v) => !v)}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}>
            {showReview ? 'Hide Review' : 'Review Answers'}
          </button>

          {showReview && (
            <div className="space-y-4">
              {result.review.map((r: QuestionReview, i: number) => (
                <div key={r.questionId} className="rounded-2xl p-4" style={{ background: 'var(--bg-surface)', border: `1px solid ${r.isCorrect ? 'var(--green)' : 'var(--coral)'}` }}>
                  <div className="flex items-start gap-2 mb-2">
                    {r.isCorrect ? <CheckCircle size={16} className="shrink-0" style={{ color: 'var(--green)' }} /> : <XCircle size={16} className="shrink-0" style={{ color: 'var(--coral)' }} />}
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: r.isCorrect ? 'var(--green)' : 'var(--coral)' }}>Q{i + 1} — {r.isCorrect ? 'Correct' : 'Incorrect'}</p>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{r.question}</p>
                  {r.explanation && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{r.explanation}</p>}
                  {r.sampleAnswer && <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Sample: {r.sampleAnswer}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <button onClick={restartPractice}
              className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}>
              <RotateCcw size={15} /> Practice Again
            </button>
            <a href={backHref}
              className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--coral)', textDecoration: 'none', boxShadow: 'var(--coral-glow)' }}>
              Back to Chapter <ArrowRight size={16} />
            </a>
          </div>
        </main>
      </div>
    )
  }

  return null
}
