'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react'
import type { PracticeResult, QuestionReview } from '@/lib/school/practice/practiceTypes'
import type { LearningNavigatorAction } from '@/lib/school/navigation/navigatorTypes'
import { NavigatorActionCard } from '@/components/school/NavigatorActionCard'
import { Card, CandyButton, Pill, ProgressBar, ProgressRing, EagleMascot, useConfetti } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'
import { planVisualTeaching } from '@/lib/visuals/teachingStrategy'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { useVisualMastery } from '@/hooks/useVisualMastery'
import { VisualMasteryDevSummary } from '@/components/visuals/VisualMasteryDevSummary'

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
  /** Sprint CQ: pre-fetched Navigator action for post-completion next step. */
  navigatorAction?: LearningNavigatorAction | null
}

type Phase = 'loading' | 'quiz' | 'submitting' | 'results'

const MASTERY_LABELS: Record<string, { label: string; color: string }> = {
  mastered:       { label: 'Mastered',       color: 'var(--candy-green)' },
  good_progress:  { label: 'Good Progress',  color: 'var(--candy-blue)' },
  needs_practice: { label: 'Needs Practice', color: 'var(--candy-red)' },
}

export function PracticeQuiz({ subjectSlug, chapterId, chapterTitle, navigatorAction }: PracticeQuizProps) {
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
  const fireConfetti = useConfetti()
  // Sprint L: visual mastery collection only — never read by submitAnswers/scoring.
  const { recordMasteryEvent, summary } = useVisualMastery()

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
      if (data.accuracyPercent >= 50) fireConfetti()
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

  function Shell({ children, showBack = true, backLabel = 'Back' }: { children: React.ReactNode; showBack?: boolean; backLabel?: string }) {
    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
        {showBack && (
          <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
            <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center' }}>
              <a href={backHref} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
                <ArrowLeft size={15} /> {backLabel}
              </a>
            </div>
          </nav>
        )}
        <main style={{ maxWidth: 768, margin: '0 auto', padding: '32px 20px' }}>
          {children}
        </main>
      </div>
    )
  }

  // ─── Error ───
  if (error) {
    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--candy-bg)', padding: '0 20px' }}>
        <Card style={{ padding: 32, textAlign: 'center', maxWidth: 380, width: '100%' }}>
          <EagleMascot variant="logo" size={48} />
          <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--candy-ink)', margin: '14px 0 18px', fontFamily: 'var(--font-baloo2)' }}>{error}</p>
          <CandyButton
            onClick={() => { setError(null); setPhase('loading') }}
            shadowColor="var(--candy-red)"
            style={{ width: '100%', padding: '12px 0', borderRadius: 14, background: 'var(--candy-red)', color: '#fff', fontWeight: 800 }}
          >
            Try again
          </CandyButton>
        </Card>
      </div>
    )
  }

  // ─── Loading ───
  if (phase === 'loading' || phase === 'submitting') {
    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--candy-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <EagleMascot variant="hero" size={56} className="animate-pulse" />
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--candy-ink-soft)', marginTop: 14 }}>
            {phase === 'loading' ? 'Preparing questions…' : 'Scoring your answers…'}
          </p>
        </div>
      </div>
    )
  }

  // ─── Pre-start screen ───
  if (phase === 'quiz' && !started) {
    return (
      <Shell>
        <Card style={{ padding: 32, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 16px', background: 'rgba(255,75,75,0.12)' }}>🎯</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', margin: '0 0 6px' }}>
            Chapter Practice
          </h1>
          <p style={{ fontSize: 14, color: 'var(--candy-ink-soft)', margin: '0 0 24px', fontWeight: 600 }}>{chapterTitle}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginBottom: 28 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', margin: 0 }}>{questions.length}</p>
              <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 700, margin: 0 }}>Questions</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', margin: 0 }}>~{estimatedMinutes}</p>
              <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 700, margin: 0 }}>Minutes</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', margin: 0 }}>80%</p>
              <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 700, margin: 0 }}>To master</p>
            </div>
          </div>
          <CandyButton
            onClick={() => setStarted(true)}
            shadowColor="var(--candy-red)"
            style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: 'var(--candy-red)', color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            Start Practice <ArrowRight size={16} />
          </CandyButton>
        </Card>
      </Shell>
    )
  }

  // ─── Quiz ───
  if (phase === 'quiz' && started) {
    const q = questions[currentIdx]
    const answered = q.id in answers
    const isLast = currentIdx === questions.length - 1
    const progressPercent = ((currentIdx + 1) / questions.length) * 100
    // Sprint I: same deterministic Teaching Strategy pipeline as Learn — additive,
    // read-only, never affects grading. Absent on every question with nothing
    // detected, so existing practice sessions render exactly as before.
    const visualSpec = planVisualTeaching(q.question).spec

    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
          <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href={backHref} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </a>
            <Pill color="var(--candy-shadow)" style={{ color: 'var(--candy-ink-soft)', fontFamily: 'monospace' }}>
              {currentIdx + 1} / {questions.length}
            </Pill>
          </div>
          <div style={{ padding: '0 20px 10px', maxWidth: 768, margin: '0 auto' }}>
            <ProgressBar percent={progressPercent} height={8} fillColor="var(--candy-red)" animated={false} />
          </div>
        </nav>

        <main style={{ maxWidth: 768, margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Question */}
          <Card style={{ padding: 22 }}>
            <Pill color="var(--candy-red)" style={{ marginBottom: 10 }}>
              Question {currentIdx + 1} · {q.type === 'mcq' ? 'Multiple Choice' : q.type === 'true_false' ? 'True / False' : 'Short Answer'}
            </Pill>
            <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: 'var(--candy-ink)', margin: 0 }}>{q.question}</p>
            {visualSpec && (
              <div style={{ marginTop: 14 }}>
                <VisualRenderer
                  spec={visualSpec}
                  onMasteryEvent={recordMasteryEvent}
                  masteryContext={{ source: 'practice', subjectSlug, sessionId }}
                />
              </div>
            )}
          </Card>
          <VisualMasteryDevSummary summary={summary} />

          {/* Answer area */}
          {q.type === 'mcq' && q.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i
                return (
                  <CandyButton
                    key={i}
                    onClick={() => handleAnswer(q.id, i)}
                    shadowColor={selected ? 'var(--candy-red)' : 'var(--candy-shadow)'}
                    style={{
                      width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 16px', borderRadius: 16,
                      background: selected ? 'rgba(255,75,75,0.10)' : 'var(--candy-card)',
                      border: `2px solid ${selected ? 'var(--candy-red)' : 'var(--candy-shadow)'}`,
                    }}
                  >
                    <span style={{
                      width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, flexShrink: 0,
                      background: selected ? 'var(--candy-red)' : 'var(--candy-shadow)',
                      color: selected ? '#fff' : 'var(--candy-ink-soft)',
                    }}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--candy-ink)' }}>{opt}</span>
                  </CandyButton>
                )
              })}
            </div>
          )}

          {q.type === 'true_false' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {([true, false] as const).map((val) => {
                const selected = answers[q.id] === val
                return (
                  <CandyButton
                    key={String(val)}
                    onClick={() => handleAnswer(q.id, val)}
                    shadowColor={selected ? 'var(--candy-red)' : 'var(--candy-shadow)'}
                    style={{
                      padding: '20px 0', borderRadius: 16, fontSize: 14, fontWeight: 800,
                      background: selected ? 'rgba(255,75,75,0.10)' : 'var(--candy-card)',
                      border: `2px solid ${selected ? 'var(--candy-red)' : 'var(--candy-shadow)'}`,
                      color: selected ? 'var(--candy-red)' : 'var(--candy-ink)',
                    }}
                  >
                    {val ? 'True ✓' : 'False ✗'}
                  </CandyButton>
                )
              })}
            </div>
          )}

          {q.type === 'short_answer' && (
            <Card style={{ padding: 0 }}>
              <textarea
                placeholder="Write your answer here…"
                value={(answers[q.id] as string) ?? ''}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                rows={4}
                style={{ width: '100%', padding: 16, fontSize: 14, borderRadius: 16, resize: 'none', outline: 'none', background: 'transparent', color: 'var(--candy-ink)', border: 'none', fontFamily: 'inherit' }}
              />
            </Card>
          )}

          {/* Next / Submit */}
          <CandyButton
            onClick={handleNext}
            disabled={!answered}
            shadowColor="var(--candy-red)"
            style={{
              width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 15, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: 'var(--candy-red)', color: '#fff', opacity: answered ? 1 : 0.4,
            }}
          >
            {isLast ? 'Submit' : 'Next'} <ArrowRight size={16} />
          </CandyButton>
        </main>
      </div>
    )
  }

  // ─── Results ───
  if (phase === 'results' && result) {
    const mastery = MASTERY_LABELS[result.masteryStatus] ?? MASTERY_LABELS.needs_practice

    return (
      <Shell backLabel="Back to chapter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Score card */}
          <Card style={{ padding: 28, textAlign: 'center' }}>
            <Pill color="var(--candy-shadow)" style={{ color: 'var(--candy-ink-soft)', marginBottom: 12 }}>Chapter Practice Complete</Pill>
            <ProgressRing
              percent={result.accuracyPercent}
              size={104} radius={44} strokeWidth={9}
              gradientFrom={result.accuracyPercent >= 50 ? 'var(--candy-green)' : 'var(--candy-red)'}
              gradientTo={result.accuracyPercent >= 50 ? 'var(--candy-green-d)' : 'var(--candy-red)'}
              trackColor="var(--candy-shadow)"
              className="mx-auto"
              label={
                <span style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-baloo2)', color: result.accuracyPercent >= 50 ? 'var(--candy-green)' : 'var(--candy-red)' }}>
                  {result.accuracyPercent}%
                </span>
              }
            />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', margin: '14px 0 12px' }}>
              {result.correctCount} correct · {result.totalCount - result.correctCount} incorrect
            </p>
            <Pill color={mastery.color} style={{ color: '#fff' }}>{mastery.label}</Pill>
          </Card>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Card style={{ padding: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-baloo2)', color: 'var(--candy-green)', margin: 0 }}>{result.correctCount}</p>
              <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 700, marginTop: 4 }}>Correct</p>
            </Card>
            <Card style={{ padding: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-baloo2)', color: 'var(--candy-red)', margin: 0 }}>{result.totalCount - result.correctCount}</p>
              <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 700, marginTop: 4 }}>Incorrect</p>
            </Card>
          </div>

          {/* Weak areas */}
          {result.weakNodeIds.length > 0 && (
            <Card style={{ padding: 20 }}>
              <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-ink-soft)', margin: '0 0 12px' }}>Weak Areas</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
                {result.weakNodeIds.map((id) => (
                  <li key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--candy-ink)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: 'var(--candy-red)' }} />
                    <span style={{ fontWeight: 600 }}>{id.replace(/-/g, ' ').replace(/_/g, ' ')}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Sprint CQ: Navigator next step — replaces the dead-end after practice */}
          {navigatorAction && (
            <NavigatorActionCard action={navigatorAction} heading="🎯 What to do next" compact />
          )}

          {/* Review */}
          <CandyButton
            onClick={() => setShowReview((v) => !v)}
            shadowColor="var(--candy-shadow)"
            style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 14, fontWeight: 800, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}
          >
            {showReview ? 'Hide Review' : 'Review Answers'}
          </CandyButton>

          {showReview && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {result.review.map((r: QuestionReview, i: number) => (
                <Card key={r.questionId} style={{ padding: 16, border: `1.5px solid ${r.isCorrect ? 'var(--candy-green)' : 'var(--candy-red)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    {r.isCorrect ? <CheckCircle size={16} style={{ flexShrink: 0, color: 'var(--candy-green)' }} /> : <XCircle size={16} style={{ flexShrink: 0, color: 'var(--candy-red)' }} />}
                    <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: r.isCorrect ? 'var(--candy-green)' : 'var(--candy-red)', margin: 0 }}>
                      Q{i + 1} — {r.isCorrect ? 'Correct' : 'Incorrect'}
                    </p>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--candy-ink)', margin: '0 0 8px' }}>{r.question}</p>
                  {r.explanation && <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', margin: 0 }}>{r.explanation}</p>}
                  {r.sampleAnswer && <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', margin: '4px 0 0' }}>Sample: {r.sampleAnswer}</p>}
                </Card>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
            <CandyButton
              onClick={restartPractice}
              shadowColor="var(--candy-shadow)"
              style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}
            >
              <RotateCcw size={15} /> Practice Again
            </CandyButton>
            <a href={backHref} style={{ textDecoration: 'none' }}>
              <CandyButton
                shadowColor="var(--candy-red)"
                style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--candy-red)', color: '#fff' }}
              >
                Back to Chapter <ArrowRight size={16} />
              </CandyButton>
            </a>
          </div>
        </div>
      </Shell>
    )
  }

  return null
}
