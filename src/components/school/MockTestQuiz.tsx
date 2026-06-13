'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react'
import type { QuestionReview } from '@/lib/school/practice/practiceTypes'
import { MOCK_TEST_CONFIG, type MockTestResult, type MockTestType } from '@/lib/school/exams/mockTestTypes'

interface ClientQuestion {
  id: string
  type: 'mcq' | 'true_false' | 'short_answer'
  nodeId: string
  question: string
  options?: string[]
}

interface MockTestQuizProps {
  subjectSlug: string
  subjectLabel: string
  backHref: string
}

type Phase = 'select' | 'loading' | 'quiz' | 'submitting' | 'results'

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function MockTestQuiz({ subjectSlug, subjectLabel, backHref }: MockTestQuizProps) {
  const [phase, setPhase] = useState<Phase>('select')
  const [error, setError] = useState<string | null>(null)
  const [testType, setTestType] = useState<MockTestType>('standard')
  const [sessionId, setSessionId] = useState('')
  const [questions, setQuestions] = useState<ClientQuestion[]>([])
  const [estimatedMinutes, setEstimatedMinutes] = useState(25)
  const [label, setLabel] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | boolean | string>>({})
  const [result, setResult] = useState<MockTestResult | null>(null)
  const [showReview, setShowReview] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startedAtRef = useRef<Date | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === 'quiz') {
      startedAtRef.current = new Date()
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  async function startMock() {
    setPhase('loading')
    setError(null)
    setAnswers({})
    setCurrentIdx(0)
    setElapsed(0)
    try {
      const r = await fetch('/api/school/mock/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug, testType }),
      })
      const data = await r.json()
      if (data.error) { setError(data.error); setPhase('select'); return }
      setSessionId(data.sessionId)
      setQuestions(data.questions)
      setEstimatedMinutes(data.estimatedMinutes ?? 25)
      setLabel(data.label ?? MOCK_TEST_CONFIG[testType].label)
      setPhase('quiz')
    } catch {
      setError('Failed to generate test. Please try again.')
      setPhase('select')
    }
  }

  async function submitAnswers() {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('submitting')
    const payload = Object.entries(answers).map(([questionId, value]) => ({ questionId, value }))
    try {
      const r = await fetch('/api/school/mock/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          answers: payload,
          startedAt: startedAtRef.current?.toISOString(),
        }),
      })
      const data = await r.json()
      if (data.error) { setError(data.error); setPhase('quiz'); return }
      setResult(data)
      setPhase('results')
    } catch {
      setError('Submission failed. Please try again.')
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

  // ── Type selector ──────────────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <nav className="sticky top-0 z-50" style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
          <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center">
            <a href={backHref} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </a>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-5 py-12">
          <div className="rounded-2xl p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: 'var(--blue-muted)' }}>🎓</div>
              <h1 className="text-xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Mock Test</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{subjectLabel} — questions drawn from across all chapters</p>
            </div>

            {error && (
              <div className="rounded-xl p-3 mb-6 text-sm" style={{ background: 'var(--coral-muted)', color: 'var(--coral)', border: '1px solid var(--coral)' }}>
                {error}
              </div>
            )}

            <div className="space-y-3 mb-8">
              {(Object.entries(MOCK_TEST_CONFIG) as [MockTestType, typeof MOCK_TEST_CONFIG[MockTestType]][]).map(([type, cfg]) => (
                <button
                  key={type}
                  onClick={() => setTestType(type)}
                  className="w-full rounded-xl p-4 text-left transition-all"
                  style={{
                    background: testType === type ? 'var(--blue-muted)' : 'var(--bg-elevated)',
                    border: `2px solid ${testType === type ? 'var(--blue)' : 'var(--border-default)'}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{cfg.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>~{cfg.estimatedMinutes} minutes</p>
                    </div>
                    {testType === type && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--blue)', color: 'white' }}>Selected</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={startMock}
              className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--coral)', boxShadow: 'var(--coral-glow)' }}
            >
              Start Mock Test <ArrowRight size={16} />
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Loading / Submitting ───────────────────────────────────────────────────
  if (phase === 'loading' || phase === 'submitting') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--coral)', borderTopColor: 'transparent' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {phase === 'loading' ? 'Preparing your mock test…' : 'Scoring your test…'}
          </p>
        </div>
      </div>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = questions[currentIdx]
    const answered = q.id in answers
    const isLast = currentIdx === questions.length - 1

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <nav className="sticky top-0 z-50" style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
          <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
            <a href={backHref} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Exit
            </a>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                <Clock size={11} /> {formatTime(elapsed)}
              </span>
              <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-secondary)' }}>
                {currentIdx + 1} / {questions.length}
              </span>
            </div>
          </div>
          <div className="h-1" style={{ background: 'var(--bg-elevated)' }}>
            <div className="h-full" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%`, background: 'var(--blue)', transition: 'width .3s' }} />
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-5 py-8">
          <div className="rounded-2xl p-6 space-y-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: 'var(--blue-muted)', color: 'var(--blue)' }}>
              {q.type === 'mcq' ? 'Multiple Choice' : q.type === 'true_false' ? 'True / False' : 'Short Answer'}
            </span>
            <p className="text-base font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{q.question}</p>

            {q.type === 'mcq' && q.options && (
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(q.id, i)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                    style={{
                      background: answers[q.id] === i ? 'var(--blue-muted)' : 'var(--bg-elevated)',
                      border: `2px solid ${answers[q.id] === i ? 'var(--blue)' : 'var(--border-default)'}`,
                      color: 'var(--text-primary)',
                    }}>
                    <span className="font-bold mr-2" style={{ color: 'var(--text-dim)' }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'true_false' && (
              <div className="flex gap-3">
                {([true, false] as const).map((val) => (
                  <button key={String(val)} onClick={() => handleAnswer(q.id, val)}
                    className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: answers[q.id] === val ? 'var(--blue-muted)' : 'var(--bg-elevated)',
                      border: `2px solid ${answers[q.id] === val ? 'var(--blue)' : 'var(--border-default)'}`,
                      color: 'var(--text-primary)',
                    }}>
                    {val ? 'True' : 'False'}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'short_answer' && (
              <textarea
                rows={3}
                value={String(answers[q.id] ?? '')}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                placeholder="Type your answer here…"
                className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '2px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            )}

            <button
              onClick={handleNext}
              disabled={!answered}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
              style={{ background: 'var(--coral)' }}
            >
              {isLast ? 'Submit Test' : 'Next'} <ArrowRight size={16} />
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (phase === 'results' && result) {
    const scoreColor = result.score >= 85 ? 'var(--green)' : result.score >= 70 ? 'var(--blue)' : result.score >= 40 ? 'var(--yellow)' : 'var(--coral)'
    const reviewToShow: QuestionReview[] = result.review ?? []

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <nav className="sticky top-0 z-50" style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
          <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
            <a href={backHref} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </a>
            <span className="text-xs font-bold" style={{ color: 'var(--text-dim)' }}>Mock Results</span>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-5 py-8 space-y-5">
          {/* Score card */}
          <div className="rounded-2xl p-7 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>{label}</p>
            <div className="text-6xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: scoreColor }}>{result.score}%</div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {result.correctCount} / {result.totalQuestions} correct · {formatTime(result.timeTakenSeconds)}
            </p>
            {result.updatedReadinessPercent !== undefined && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'var(--blue-muted)', color: 'var(--blue)', border: '1px solid var(--blue)' }}>
                Exam Readiness updated: {result.updatedReadinessPercent}%
              </div>
            )}
          </div>

          {/* Strong / Weak */}
          <div className="grid grid-cols-2 gap-3">
            {result.strongTopicTitles.length > 0 && (
              <div className="rounded-2xl p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--green)' }}>✓ Strong</p>
                <ul className="space-y-1">
                  {result.strongTopicTitles.slice(0, 4).map((t) => (
                    <li key={t} className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.weakTopicTitles.length > 0 && (
              <div className="rounded-2xl p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--coral)' }}>⚠ Needs Work</p>
                <ul className="space-y-1">
                  {result.weakTopicTitles.slice(0, 4).map((t) => (
                    <li key={t} className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Chapter breakdown */}
          {result.chapterBreakdown.length > 1 && (
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-dim)' }}>Chapter Breakdown</p>
              <div className="space-y-2">
                {result.chapterBreakdown.map((b) => {
                  const pct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0
                  const c = pct >= 70 ? 'var(--green)' : pct >= 40 ? 'var(--yellow)' : 'var(--coral)'
                  return (
                    <div key={b.chapterId} className="flex items-center gap-3">
                      <span className="text-xs flex-1 truncate" style={{ color: 'var(--text-secondary)' }}>{b.chapterTitle}</span>
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
                      </div>
                      <span className="text-[11px] font-mono font-bold w-8 text-right shrink-0" style={{ color: c }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Review toggle */}
          <button
            onClick={() => setShowReview((v) => !v)}
            className="w-full py-3 rounded-xl text-sm font-bold"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
          >
            {showReview ? 'Hide Review' : 'Review Answers'}
          </button>

          {showReview && reviewToShow.map((r, i) => (
            <div key={r.questionId} className="rounded-2xl p-5 space-y-2"
              style={{ background: 'var(--bg-surface)', border: `1px solid ${r.isCorrect ? 'var(--green)' : 'var(--coral)'}` }}>
              <div className="flex items-start gap-2">
                {r.isCorrect ? <CheckCircle size={16} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} /> : <XCircle size={16} style={{ color: 'var(--coral)', flexShrink: 0, marginTop: 2 }} />}
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Q{i + 1}. {r.question}</p>
              </div>
              {r.explanation && <p className="text-xs pl-6" style={{ color: 'var(--text-secondary)' }}>{r.explanation}</p>}
              {r.sampleAnswer && <p className="text-xs pl-6 italic" style={{ color: 'var(--text-dim)' }}>Sample: {r.sampleAnswer}</p>}
            </div>
          ))}

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={() => { setPhase('select'); setResult(null); setShowReview(false) }}
              className="flex-1 py-3 rounded-xl text-sm font-bold"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
            >
              Try Again
            </button>
            <a
              href={backHref}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-center text-white"
              style={{ background: 'var(--coral)', textDecoration: 'none' }}
            >
              Back to Subject
            </a>
          </div>
        </main>
      </div>
    )
  }

  return null
}
