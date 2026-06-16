'use client'
import { useEffect, useState } from 'react'
import { X, Loader2, Award, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'

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
      <div style={{
        width: '100%', maxWidth: 560, maxHeight: '88vh',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 16,
        overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{
          flexShrink: 0, padding: '14px 16px',
          background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
            🏆 {t('final_assessment_title')}: {subjectName}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex', width: 26, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: 6, flexShrink: 0 }}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {(phase === 'checking' || phase === 'loading') && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 12 }}>
              <Loader2 size={26} style={{ animation: 'spin 1s linear infinite', color: 'var(--coral)' }} />
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t('final_assessment_loading')}</p>
            </div>
          )}

          {phase === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 12 }}>
              <p style={{ fontSize: 12, color: 'var(--red)', textAlign: 'center' }}>{errorMsg}</p>
              <button onClick={generate} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', background: 'rgba(247,129,102,0.12)', color: 'var(--coral)', border: '1px solid rgba(247,129,102,0.3)', fontWeight: 600 }}>
                <RotateCcw size={11} /> {t('final_assessment_retry')}
              </button>
            </div>
          )}

          {(phase === 'questions' || phase === 'submitting') && questions.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 14, padding: 12, borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                {qi + 1} / {questions.length}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10, fontWeight: 500 }}>
                {q.question}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi
                  return (
                    <button key={oi} disabled={phase === 'submitting'}
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      style={{
                        textAlign: 'left', padding: '7px 10px', borderRadius: 8, fontSize: 12,
                        cursor: phase === 'submitting' ? 'default' : 'pointer',
                        background: selected ? 'rgba(247,129,102,0.15)' : 'var(--bg-base)',
                        border: `1px solid ${selected ? 'rgba(247,129,102,0.5)' : 'var(--border-subtle)'}`,
                        color: 'var(--text-primary)',
                      }}>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {phase === 'results' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 14, textAlign: 'center' }}>
              <Award size={40} color={passed ? '#56D364' : '#F59E0B'} />
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {passed ? t('final_assessment_passed') : t('final_assessment_failed')}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {t('final_assessment_score')}: <strong style={{ color: 'var(--text-primary)' }}>{scorePct}%</strong> ({score}/{total})
              </p>
              {passed && certificateCode && (
                <a href={`/certificates/${certificateCode}`} className="btn-primary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: 12, fontWeight: 700 }}>
                  {t('final_assessment_view_cert')}
                </a>
              )}
              {!passed && (
                <button onClick={generate} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', background: 'rgba(247,129,102,0.12)', color: 'var(--coral)', border: '1px solid rgba(247,129,102,0.3)', fontWeight: 700 }}>
                  <RotateCcw size={12} /> {t('final_assessment_retry')}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {phase === 'questions' && (
          <div style={{ flexShrink: 0, padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
            <button onClick={handleSubmit} disabled={!allAnswered}
              style={{
                width: '100%', padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                cursor: allAnswered ? 'pointer' : 'default',
                background: allAnswered ? 'var(--coral)' : 'var(--bg-elevated)',
                color: allAnswered ? '#fff' : 'var(--text-dim)',
                border: 'none',
              }}>
              {t('final_assessment_submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
