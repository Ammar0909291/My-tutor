'use client'

import { useState, useEffect, useRef } from 'react'
import { t as i18n } from '@/lib/i18n'
import { CandyPage, Card, CandyButton, Pill, ProgressBar, EagleMascot, useConfetti } from '@/components/ui/candy'

interface Question {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface Props {
  subject: string
  lang: 'ru' | 'en' | 'hi'
}

export default function QuizClient({ subject, lang }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fireConfetti = useConfetti()

  useEffect(() => {
    fetchQuestions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (finished && questions.length > 0 && score >= Math.ceil(questions.length * 0.6)) {
      fireConfetti()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  async function fetchQuestions() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, lang }),
      })
      const data = await res.json()
      if (data.success && data.questions?.length) {
        setQuestions(data.questions)
        startTimer()
      } else {
        setError(i18n(lang, 'quiz_error_load'))
      }
    } catch {
      setError(i18n(lang, 'quiz_error_network'))
    } finally {
      setLoading(false)
    }
  }

  function startTimer() {
    setTimeLeft(30)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          handleSelect(-1)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  function handleSelect(idx: number) {
    if (selected !== null) return
    if (timerRef.current) clearInterval(timerRef.current)
    setSelected(idx)
    if (idx === questions[current].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      startTimer()
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setQuestions([])
    setLoading(true)
    fetchQuestions()
  }

  if (loading) {
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <EagleMascot variant="hero" size={72} />
        <p style={{ color: 'var(--candy-ink-soft)', fontSize: 16, fontWeight: 600 }}>{i18n(lang, 'quiz_loading')}</p>
      </CandyPage>
    )
  }

  if (error) {
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <EagleMascot variant="hero" size={72} />
        <p style={{ color: 'var(--candy-red)', fontSize: 16, fontWeight: 700 }}>{error}</p>
        <CandyButton onClick={restart} style={{ padding: '10px 20px', borderRadius: 14, background: 'var(--candy-orange)', color: '#fff', fontWeight: 800 }}>
          {i18n(lang, 'quiz_retry')}
        </CandyButton>
        <a href="/dashboard" style={{ color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>{i18n(lang, 'quiz_back')}</a>
      </CandyPage>
    )
  }

  if (finished) {
    const emoji = score === 5 ? '🏆' : score >= 3 ? '💪' : '📚'
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 40, maxWidth: 400 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <EagleMascot variant="hero" size={80} />
          </div>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{emoji}</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--candy-ink)', marginBottom: 8, fontFamily: 'var(--font-baloo2)' }}>
            {score} / {questions.length} {i18n(lang, 'quiz_finish')}
          </h2>
          <p style={{ color: 'var(--candy-ink-soft)', marginBottom: 32, fontSize: 15, fontWeight: 600 }}>
            {score === 5
              ? i18n(lang, 'quiz_perfect')
              : score >= 3
              ? i18n(lang, 'quiz_good')
              : i18n(lang, 'quiz_retry_msg')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CandyButton onClick={restart} style={{ padding: '12px 24px', borderRadius: 14, background: 'var(--candy-orange)', color: '#fff', fontWeight: 800, fontSize: 14 }}>
              {i18n(lang, 'quiz_retry')}
            </CandyButton>
            <a href="/dashboard" style={{ padding: '12px 24px', borderRadius: 14, background: 'var(--candy-card)', color: 'var(--candy-ink)', textDecoration: 'none', fontWeight: 800, fontSize: 14, display: 'inline-block', boxShadow: '0 4px 0 var(--candy-shadow)' }}>
              {i18n(lang, 'quiz_back')}
            </a>
          </div>
        </div>
      </CandyPage>
    )
  }

  const q = questions[current]
  const timerPct = (timeLeft / 30) * 100

  return (
    <CandyPage style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>{i18n(lang, 'quiz_back')}</a>
        <span style={{ fontSize: 20 }}>🎮</span>
        <span style={{ fontWeight: 800, color: 'var(--candy-ink)', fontSize: 16, fontFamily: 'var(--font-baloo2)' }}>{i18n(lang, 'quiz_title')}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--candy-ink-soft)', fontSize: 13, fontWeight: 600 }}>
          {current + 1} / {questions.length}
        </span>
      </div>

      <div style={{ flex: 1, maxWidth: 700, margin: '40px auto', padding: '0 20px', width: '100%' }}>
        {/* Timer bar */}
        <div style={{ marginBottom: 8 }}>
          <ProgressBar
            percent={timerPct}
            height={8}
            fillColor={timeLeft <= 10 ? 'var(--candy-red)' : 'var(--candy-green)'}
            animated={false}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <Pill color="var(--candy-bg)" style={{ color: timeLeft <= 10 ? 'var(--candy-red)' : 'var(--candy-ink-soft)', border: '1px solid var(--candy-shadow)' }}>
            ⏱ {timeLeft}{i18n(lang, 'quiz_seconds_suffix')}
          </Pill>
        </div>

        {/* Question */}
        <Card style={{ padding: '24px', marginBottom: 20 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--candy-ink)', lineHeight: 1.5 }}>{q.question}</p>
        </Card>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, idx) => {
            let bg = 'var(--candy-card)'
            let color = 'var(--candy-ink)'
            let shadowColor = 'var(--candy-shadow)'
            if (selected !== null) {
              if (idx === q.correctIndex) { bg = 'rgba(88,204,2,0.16)'; color = '#46A302'; shadowColor = 'rgba(88,204,2,0.3)' }
              else if (idx === selected) { bg = 'rgba(255,75,75,0.16)'; color = '#FF4B4B'; shadowColor = 'rgba(255,75,75,0.3)' }
            }
            return (
              <CandyButton
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                shadowColor={shadowColor}
                style={{
                  padding: '14px 20px',
                  borderRadius: 16,
                  background: bg,
                  color,
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </CandyButton>
            )
          })}
        </div>

        {/* Explanation + Next */}
        {selected !== null && (
          <div style={{ marginTop: 20 }}>
            <Card style={{ padding: '16px', background: 'rgba(59,158,255,0.08)', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--candy-blue)', lineHeight: 1.6, fontWeight: 600 }}>💡 {q.explanation}</p>
            </Card>
            <CandyButton onClick={nextQuestion} style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'var(--candy-orange)', color: '#fff', fontWeight: 800, fontSize: 15 }}>
              {current + 1 < questions.length ? i18n(lang, 'quiz_next') : i18n(lang, 'quiz_finish')}
            </CandyButton>
          </div>
        )}
      </div>
    </CandyPage>
  )
}
