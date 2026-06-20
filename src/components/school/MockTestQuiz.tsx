'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react'
import type { QuestionReview } from '@/lib/school/practice/practiceTypes'
import { MOCK_TEST_CONFIG, type MockTestResult, type MockTestType } from '@/lib/school/exams/mockTestTypes'
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

interface MockTestQuizProps {
  subjectSlug: string
  subjectLabel: string
  backHref: string
  /** Sprint CQ: pre-fetched Navigator action for post-completion next step. */
  navigatorAction?: LearningNavigatorAction | null
}

type Phase = 'select' | 'loading' | 'quiz' | 'submitting' | 'results'

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function MockTestQuiz({ subjectSlug, subjectLabel, backHref, navigatorAction }: MockTestQuizProps) {
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
  const fireConfetti = useConfetti()
  // Sprint L: visual mastery collection only — never read by the timer/scoring.
  const { recordMasteryEvent, summary } = useVisualMastery()

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
      if (data.score >= 70) fireConfetti()
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

  function Shell({ children, navLabel }: { children: React.ReactNode; navLabel?: React.ReactNode }) {
    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
          <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href={backHref} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </a>
            {navLabel}
          </div>
        </nav>
        <main style={{ maxWidth: 768, margin: '0 auto', padding: '32px 20px' }}>
          {children}
        </main>
      </div>
    )
  }

  // ── Type selector (exam instructions) ───────────────────────────────────
  if (phase === 'select') {
    return (
      <Shell>
        <Card style={{ padding: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 16px', background: 'rgba(139,92,246,0.12)' }}>🎓</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', margin: '0 0 6px' }}>Mock Test</h1>
            <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', fontWeight: 600, margin: 0 }}>{subjectLabel} — questions drawn from across all chapters</p>
          </div>

          {error && (
            <Card style={{ padding: 12, marginBottom: 20, border: '1.5px solid var(--candy-red)', background: 'rgba(255,75,75,0.06)' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--candy-red)', margin: 0 }}>{error}</p>
            </Card>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {(Object.entries(MOCK_TEST_CONFIG) as [MockTestType, typeof MOCK_TEST_CONFIG[MockTestType]][]).map(([type, cfg]) => {
              const selected = testType === type
              return (
                <CandyButton
                  key={type}
                  onClick={() => setTestType(type)}
                  shadowColor={selected ? 'var(--candy-purple)' : 'var(--candy-shadow)'}
                  style={{
                    width: '100%', textAlign: 'left', padding: '16px 18px', borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: selected ? 'rgba(139,92,246,0.10)' : 'var(--candy-card)',
                    border: `2px solid ${selected ? 'var(--candy-purple)' : 'var(--candy-shadow)'}`,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>{cfg.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 600, margin: '2px 0 0' }}>~{cfg.estimatedMinutes} minutes</p>
                  </div>
                  {selected && <Pill color="var(--candy-purple)" style={{ color: '#fff' }}>Selected</Pill>}
                </CandyButton>
              )
            })}
          </div>

          <CandyButton
            onClick={startMock}
            shadowColor="var(--candy-purple-d, #7C3AED)"
            style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            Start Mock Test <ArrowRight size={16} />
          </CandyButton>
        </Card>
      </Shell>
    )
  }

  // ── Loading / Submitting ─────────────────────────────────────────────────
  if (phase === 'loading' || phase === 'submitting') {
    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--candy-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <EagleMascot variant="hero" size={56} className="animate-pulse" />
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--candy-ink-soft)', marginTop: 14 }}>
            {phase === 'loading' ? 'Preparing your mock test…' : 'Scoring your test…'}
          </p>
        </div>
      </div>
    )
  }

  // ── Quiz (exam-focused: prominent timer + strong structure) ─────────────
  if (phase === 'quiz') {
    const q = questions[currentIdx]
    const answered = q.id in answers
    const isLast = currentIdx === questions.length - 1
    const progressPercent = ((currentIdx + 1) / questions.length) * 100
    // Sprint I: same deterministic Teaching Strategy pipeline as Learn — additive,
    // read-only, never affects grading or the timer.
    const visualSpec = planVisualTeaching(q.question).spec

    return (
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
          <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href={backHref} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Exit
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pill color="var(--candy-purple)" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'monospace' }}>
                <Clock size={12} /> {formatTime(elapsed)}
              </Pill>
              <Pill color="var(--candy-shadow)" style={{ color: 'var(--candy-ink-soft)', fontFamily: 'monospace' }}>
                {currentIdx + 1} / {questions.length}
              </Pill>
            </div>
          </div>
          <div style={{ padding: '0 20px 10px', maxWidth: 768, margin: '0 auto' }}>
            <ProgressBar percent={progressPercent} height={8} fillColor="var(--candy-purple)" animated={false} />
          </div>
        </nav>

        <main style={{ maxWidth: 768, margin: '0 auto', padding: '28px 20px' }}>
          <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Pill color="var(--candy-purple)" style={{ color: '#fff', alignSelf: 'flex-start' }}>
              {q.type === 'mcq' ? 'Multiple Choice' : q.type === 'true_false' ? 'True / False' : 'Short Answer'}
            </Pill>
            <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: 'var(--candy-ink)', margin: 0 }}>{q.question}</p>
            {visualSpec && (
              <VisualRenderer
                spec={visualSpec}
                onMasteryEvent={recordMasteryEvent}
                masteryContext={{ source: 'mock', subjectSlug, sessionId }}
              />
            )}

            {q.type === 'mcq' && q.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i
                  return (
                    <CandyButton
                      key={i}
                      onClick={() => handleAnswer(q.id, i)}
                      shadowColor={selected ? 'var(--candy-purple)' : 'var(--candy-shadow)'}
                      style={{
                        width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 16, fontSize: 14,
                        background: selected ? 'rgba(139,92,246,0.10)' : 'var(--candy-card)',
                        border: `2px solid ${selected ? 'var(--candy-purple)' : 'var(--candy-shadow)'}`,
                        color: 'var(--candy-ink)',
                      }}
                    >
                      <span style={{ fontWeight: 800, marginRight: 8, color: 'var(--candy-ink-soft)' }}>{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </CandyButton>
                  )
                })}
              </div>
            )}

            {q.type === 'true_false' && (
              <div style={{ display: 'flex', gap: 10 }}>
                {([true, false] as const).map((val) => {
                  const selected = answers[q.id] === val
                  return (
                    <CandyButton
                      key={String(val)}
                      onClick={() => handleAnswer(q.id, val)}
                      shadowColor={selected ? 'var(--candy-purple)' : 'var(--candy-shadow)'}
                      style={{
                        flex: 1, padding: '14px 0', borderRadius: 16, fontSize: 14, fontWeight: 800,
                        background: selected ? 'rgba(139,92,246,0.10)' : 'var(--candy-card)',
                        border: `2px solid ${selected ? 'var(--candy-purple)' : 'var(--candy-shadow)'}`,
                        color: 'var(--candy-ink)',
                      }}
                    >
                      {val ? 'True' : 'False'}
                    </CandyButton>
                  )
                })}
              </div>
            )}

            {q.type === 'short_answer' && (
              <Card style={{ padding: 0 }}>
                <textarea
                  rows={3}
                  value={String(answers[q.id] ?? '')}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  placeholder="Type your answer here…"
                  style={{ width: '100%', padding: 14, fontSize: 14, borderRadius: 16, resize: 'none', outline: 'none', background: 'transparent', color: 'var(--candy-ink)', border: 'none', fontFamily: 'inherit' }}
                />
              </Card>
            )}

            <CandyButton
              onClick={handleNext}
              disabled={!answered}
              shadowColor="var(--candy-purple-d, #7C3AED)"
              style={{
                width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 15, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'var(--candy-purple)', color: '#fff', opacity: answered ? 1 : 0.4,
              }}
            >
              {isLast ? 'Submit Test' : 'Next'} <ArrowRight size={16} />
            </CandyButton>
          </Card>
          <VisualMasteryDevSummary summary={summary} />
        </main>
      </div>
    )
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (phase === 'results' && result) {
    const scoreColor = result.score >= 85 ? 'var(--candy-green)' : result.score >= 70 ? 'var(--candy-blue)' : result.score >= 40 ? 'var(--candy-yellow)' : 'var(--candy-red)'
    const reviewToShow: QuestionReview[] = result.review ?? []

    return (
      <Shell navLabel={<Pill color="var(--candy-shadow)" style={{ color: 'var(--candy-ink-soft)' }}>Mock Results</Pill>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Score card */}
          <Card style={{ padding: 28, textAlign: 'center' }}>
            <Pill color="var(--candy-shadow)" style={{ color: 'var(--candy-ink-soft)', marginBottom: 12 }}>{label}</Pill>
            <ProgressRing
              percent={result.score}
              size={104} radius={44} strokeWidth={9}
              gradientFrom={scoreColor}
              gradientTo={scoreColor}
              trackColor="var(--candy-shadow)"
              className="mx-auto"
              label={
                <span style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-baloo2)', color: scoreColor }}>
                  {result.score}%
                </span>
              }
            />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', margin: '14px 0 12px' }}>
              {result.correctCount} / {result.totalQuestions} correct · {formatTime(result.timeTakenSeconds)}
            </p>
            {result.updatedReadinessPercent !== undefined && (
              <Pill color="var(--candy-blue)" style={{ color: '#fff' }}>
                Exam Readiness updated: {result.updatedReadinessPercent}%
              </Pill>
            )}
          </Card>

          {/* Strong / Weak */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {result.strongTopicTitles.length > 0 && (
              <Card style={{ padding: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-green)', margin: '0 0 8px' }}>✓ Strong</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: 0, padding: 0, listStyle: 'none' }}>
                  {result.strongTopicTitles.slice(0, 4).map((t) => (
                    <li key={t} style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{t}</li>
                  ))}
                </ul>
              </Card>
            )}
            {result.weakTopicTitles.length > 0 && (
              <Card style={{ padding: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-red)', margin: '0 0 8px' }}>⚠ Needs Work</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: 0, padding: 0, listStyle: 'none' }}>
                  {result.weakTopicTitles.slice(0, 4).map((t) => (
                    <li key={t} style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{t}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Chapter breakdown */}
          {result.chapterBreakdown.length > 1 && (
            <Card style={{ padding: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-ink-soft)', margin: '0 0 12px' }}>Chapter Breakdown</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.chapterBreakdown.map((b) => {
                  const pct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0
                  const c = pct >= 70 ? 'var(--candy-green)' : pct >= 40 ? 'var(--candy-yellow)' : 'var(--candy-red)'
                  return (
                    <div key={b.chapterId} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.chapterTitle}</span>
                      <div style={{ width: 80, flexShrink: 0 }}>
                        <ProgressBar percent={pct} height={6} fillColor={c} animated={false} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 800, width: 32, textAlign: 'right', flexShrink: 0, color: c }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {/* Sprint CQ: Navigator next step */}
          {navigatorAction && (
            <NavigatorActionCard action={navigatorAction} heading="🎯 What to do next" compact />
          )}

          {/* Review toggle */}
          <CandyButton
            onClick={() => setShowReview((v) => !v)}
            shadowColor="var(--candy-shadow)"
            style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 14, fontWeight: 800, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}
          >
            {showReview ? 'Hide Review' : 'Review Answers'}
          </CandyButton>

          {showReview && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {reviewToShow.map((r, i) => (
                <Card key={r.questionId} style={{ padding: 16, border: `1.5px solid ${r.isCorrect ? 'var(--candy-green)' : 'var(--candy-red)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    {r.isCorrect ? <CheckCircle size={16} style={{ flexShrink: 0, color: 'var(--candy-green)' }} /> : <XCircle size={16} style={{ flexShrink: 0, color: 'var(--candy-red)' }} />}
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--candy-ink)', margin: 0 }}>Q{i + 1}. {r.question}</p>
                  </div>
                  {r.explanation && <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', margin: '0 0 0 24px' }}>{r.explanation}</p>}
                  {r.sampleAnswer && <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--candy-ink-soft)', margin: '4px 0 0 24px' }}>Sample: {r.sampleAnswer}</p>}
                </Card>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12 }}>
            <CandyButton
              onClick={() => { setPhase('select'); setResult(null); setShowReview(false) }}
              shadowColor="var(--candy-shadow)"
              style={{ flex: 1, padding: '14px 0', borderRadius: 14, fontSize: 14, fontWeight: 800, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}
            >
              Retake Mock Test
            </CandyButton>
            <a href={backHref} style={{ flex: 1, textDecoration: 'none' }}>
              <CandyButton
                shadowColor="var(--candy-purple-d, #7C3AED)"
                style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 14, fontWeight: 800, background: 'var(--candy-purple)', color: '#fff' }}
              >
                Back to Subject
              </CandyButton>
            </a>
          </div>
        </div>
      </Shell>
    )
  }

  return null
}
