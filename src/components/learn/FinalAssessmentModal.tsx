'use client'
import { useEffect, useState } from 'react'
import { X, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { Card, CandyButton, Pill, ProgressRing, EagleMascot, useConfetti } from '@/components/ui/candy'

interface Question {
  question: string
  options: string[]
  // correctIndex is intentionally absent: the server never sends it.
  // Grading is done server-side; the client only submits selected indices.
}

interface Props {
  subjectSlug: string
  subjectName: string
  lessonTitles: string[]
  onClose: () => void
  onPassed?: (certificateCode: string) => void
}

type Phase = 'checking' | 'loading' | 'questions' | 'submitting' | 'results' | 'error'

/**
 * Sprint N — TASK 5/6: Final Assessment modal. Generates a 10-question quiz
 * from the subject's lesson titles, scores it client-side (same trust model
 * as /api/quiz/generate), and records the result server-side. A passing
 * score (>=70%) issues a SubjectCertificate.
 */
export function FinalAssessmentModal({ subjectSlug, subjectName, lessonTitles, onClose, onPassed }: Props) {
  const { t, lang } = useLanguage()
  const [phase, setPhase] = useState<Phase>('checking')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [passed, setPassed] = useState(false)
  const [certificateCode, setCertificateCode] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const fireConfetti = useConfetti()

  function generate() {
    setPhase('loading')
    fetch('/api/final-assessment/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectCode: subjectSlug, subjectName, lessonTitles, lang }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.questions?.length) {
          setQuestions(d.questions)
          setAnswers({})
          setPhase('questions')
        } else {
          setErrorMsg(d.error || 'Failed to generate assessment')
          setPhase('error')
        }
      })
      .catch(() => { setErrorMsg('Network error'); setPhase('error') })
  }

  // On open: if the learner already passed, show the existing result instead
  // of re-generating a new quiz.
  useEffect(() => {
    fetch(`/api/final-assessment?subject=${subjectSlug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.result?.passed) {
          setPassed(true)
          setScore(d.result.score)
          setTotal(d.result.totalQuestions)
          setCertificateCode(d.certificate?.certificateCode ?? null)
          setPhase('results')
        } else {
          generate()
        }
      })
      .catch(() => generate())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit() {
    // Send only the selected option indices — the server computes the score
    // against its stored questions. Never send pre-computed score/total.
    const answersArray = Array.from({ length: questions.length }, (_, i) => answers[i] ?? 0)
    setPhase('submitting')
    fetch('/api/final-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectCode: subjectSlug, answers: answersArray }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setScore(d.result.score)
          setTotal(d.result.totalQuestions)
          setPassed(d.passed)
          setCertificateCode(d.certificate?.certificateCode ?? null)
          setPhase('results')
          if (d.passed) fireConfetti()
          if (d.passed && d.certificate?.certificateCode) onPassed?.(d.certificate.certificateCode)
        } else {
          setErrorMsg(d.error || 'Submission failed')
          setPhase('error')
        }
      })
      .catch(() => { setErrorMsg('Network error'); setPhase('error') })
  }

  const allAnswered = questions.length > 0 && questions.every((_, i) => answers[i] !== undefined)
  const scorePct = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 70,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <Card style={{
        width: '100%', maxWidth: 560, maxHeight: '88vh',
        display: 'flex', flexDirection: 'column', padding: 0,
        overflow: 'hidden', boxShadow: '0 4px 0 var(--coral)',
      }}>
        {/* Header */}
        <div style={{
          flexShrink: 0, padding: '14px 16px',
          background: 'var(--bg-surface)', boxShadow: '0 2px 0 var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <EagleMascot variant="logo" size={26} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('final_assessment_title')}: {subjectName}
            </span>
          </div>
          <CandyButton onClick={onClose} depth={2} activeDepth={0} shadowColor="var(--border-subtle)"
            style={{ background: 'var(--bg-elevated)', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexShrink: 0 }}>
            <X size={15} />
          </CandyButton>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {(phase === 'checking' || phase === 'loading') && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 12 }}>
              <EagleMascot variant="hero" size={56} className="animate-pulse" />
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t('final_assessment_loading')}</p>
            </div>
          )}

          {phase === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 12 }}>
              <EagleMascot variant="logo" size={48} />
              <p style={{ fontSize: 12, color: 'var(--red)', textAlign: 'center' }}>{errorMsg}</p>
              <CandyButton onClick={generate} depth={2} shadowColor="var(--coral-hover)"
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '6px 14px', borderRadius: 10, cursor: 'pointer', background: 'var(--coral)', color: '#fff', border: 'none', fontWeight: 700 }}>
                <RotateCcw size={11} /> {t('final_assessment_retry')}
              </CandyButton>
            </div>
          )}

          {(phase === 'questions' || phase === 'submitting') && questions.map((q, qi) => (
            <Card key={qi} style={{ marginBottom: 14, padding: 12, boxShadow: '0 3px 0 var(--border-subtle)' }}>
              <Pill color="var(--bg-elevated)" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                {qi + 1} / {questions.length}
              </Pill>
              <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10, fontWeight: 500 }}>
                {q.question}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi
                  return (
                    <CandyButton key={oi} disabled={phase === 'submitting'}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      depth={2} activeDepth={0} shadowColor={selected ? 'var(--coral-hover)' : 'var(--border-subtle)'}
                      style={{
                        textAlign: 'left', padding: '7px 10px', borderRadius: 10, fontSize: 12, border: 'none',
                        cursor: phase === 'submitting' ? 'default' : 'pointer',
                        background: selected ? 'var(--coral)' : 'var(--bg-elevated)',
                        color: selected ? '#fff' : 'var(--text-primary)',
                      }}>
                      {opt}
                    </CandyButton>
                  )
                })}
              </div>
            </Card>
          ))}

          {phase === 'results' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 14, textAlign: 'center' }}>
              <EagleMascot variant="hero" size={64} />
              <ProgressRing
                percent={scorePct}
                size={96} radius={40} strokeWidth={9}
                gradientFrom={passed ? 'var(--candy-green)' : 'var(--candy-yellow)'}
                gradientTo={passed ? 'var(--candy-green-d)' : 'var(--candy-yellow-d)'}
                trackColor="var(--bg-elevated)"
                label={<span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-baloo2)' }}>{scorePct}%</span>}
              />
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-baloo2)' }}>
                {passed ? t('final_assessment_passed') : t('final_assessment_failed')}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {t('final_assessment_score')}: <strong style={{ color: 'var(--text-primary)' }}>{scorePct}%</strong> ({score}/{total})
              </p>
              {passed && certificateCode && (
                <a href={`/certificates/${certificateCode}`}
                  style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--coral)', borderRadius: 10, boxShadow: '0 3px 0 var(--coral-hover)' }}>
                  {t('final_assessment_view_cert')}
                </a>
              )}
              {!passed && (
                <CandyButton onClick={generate} depth={3} shadowColor="var(--coral-hover)"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '8px 16px', borderRadius: 10, cursor: 'pointer', background: 'var(--coral)', color: '#fff', border: 'none', fontWeight: 700 }}>
                  <RotateCcw size={12} /> {t('final_assessment_retry')}
                </CandyButton>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {phase === 'questions' && (
          <div style={{ flexShrink: 0, padding: '12px 16px', boxShadow: '0 -2px 0 var(--border-subtle)', background: 'var(--bg-surface)' }}>
            <CandyButton onClick={handleSubmit} disabled={!allAnswered}
              depth={3} shadowColor={allAnswered ? 'var(--coral-hover)' : 'var(--border-subtle)'}
              style={{
                width: '100%', padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                cursor: allAnswered ? 'pointer' : 'default',
                background: allAnswered ? 'var(--coral)' : 'var(--bg-elevated)',
                color: allAnswered ? '#fff' : 'var(--text-dim)',
                border: 'none',
              }}>
              {t('final_assessment_submit')}
            </CandyButton>
          </div>
        )}
      </Card>
    </div>
  )
}
